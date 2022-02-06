function ctof(c) {
  return +c * 1.8 + 32;
}

let height = 200;

let temperatureScale = d3
  .scaleLinear()
  .domain([10, 30])
  .range([75, height]);

let normalizedTemperatureScale = d3
  .scaleLinear()
  .domain([10, 30])
  .range([0, 1])
  .clamp(true);

let vocScale = d3
  .scaleLinear()
  .domain([3.5, 7])
  .range([0, 30]);

let normalizedVocScale = d3
  .scaleLinear()
  .domain([3.5, 7])
  .range([0, 1]);

let humidityScale = d3
  .scaleLinear()
  .domain([5, 16])
  .range([0, 20]);

let normalizedHumidityScale = d3
  .scaleLinear()
  .domain([5, 16])
  .range([0, 1]);

let depthScale = d3
  .scaleLinear()
  .domain([2, 12])
  .range([0, height]);

let normalizedDepthScale = d3
  .scaleLinear()
  .domain([2, 12])
  .range([0, 1])
  .clamp(true);

let turbidityScale = d3
  .scaleLinear()
  .domain([0, 1])
  .range([0, height]);

let colorScheme = v => d3.interpolateYlGnBu(0.15 + v / 4);
let colorScheme2 = v => d3.interpolateSpectral(0.5 - v / 4);
let colorScheme3 = v => d3.interpolateMagma(0.35 + v / 2);

let row_data = [];
let updateData, updateDisplay;

d3.csv("./cleaned_up_rows.csv").then(data => {
  row_data = data.filter(d => d.water_temperature && d.air_temperature);
  let start = Math.round(Math.random() * (row_data.length - 72));
  let subdata = row_data.slice(start, start + 72);

  let g = d3
    .select("svg")
    .append("g")
    .attr("transform", "translate(200, 200)");

  let circle = g
    .append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 0)
    .classed("depth", true);

  let turbcircle = g
    .append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 0)
    .classed("depth", true);

  for (let r = 50; r <= 200; r += 50) {
    g.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", r)
      .classed("scale", true);
  }

  let gs = g
    .selectAll("g")
    .data(subdata)
    .enter()
    .append("g");

  gs.attr("transform", (d, i) => "rotate(" + i * 5 + ")");
  gs.append("path");

  gs.append("line");

  gs.append("circle");

  updateData = data => {
    gs.data(data);

    gs.select("line")
      .attr("x1", 0)
      .attr("x2", 0)
      .attr("y1", d => temperatureScale(d["air_temperature"]))
      .attr("y2", d => {
        let f = 1;
        if (+d["water_temperature"] > +d["air_temperature"]) f = -1;
        return (
          temperatureScale(d["water_temperature"]) +
          f * humidityScale(d["absolute_humidity"])
        );
      })
      .style("stroke", d =>
        colorScheme3(normalizedTemperatureScale(d["air_temperature"]))
      )
      .style(
        "stroke-opacity",
        d => 0.2 + 0.6 * normalizedTemperatureScale(d.air_temperature)
      );

    gs.select("circle")
      .attr("cx", 0)
      .attr("cy", d => temperatureScale(d["air_temperature"]))
      .attr("r", 3)
      .style("fill", d =>
        colorScheme3(normalizedTemperatureScale(d["air_temperature"]))
      )
      .style(
        "fill-opacity",
        d => 0.2 + 0.6 * normalizedTemperatureScale(d.air_temperature)
      );

    gs.select("path")
      .attr("d", d => {
        let f = -1;
        if (+d["water_temperature"] > +d["air_temperature"]) f = 1;
        return `M${-vocScale(d["log_gas"])} ${temperatureScale(
          d["water_temperature"]
        ) +
          f * humidityScale(d["absolute_humidity"])} L${vocScale(
          d["log_gas"]
        )} ${temperatureScale(d["water_temperature"]) +
          f * humidityScale(d["absolute_humidity"])} L0 ${temperatureScale(
          d["water_temperature"]
        ) -
          f * humidityScale(d["absolute_humidity"])} L${-vocScale(
          d["log_gas"]
        )} ${temperatureScale(d["water_temperature"]) +
          f * humidityScale(d["absolute_humidity"])}`;
      })
      .style("fill", d => colorScheme2(normalizedVocScale(d.log_gas)));

    data[data.length - 1].depth
      ? circle
          .transition()
          .duration(30)
          .attr("r", depthScale(data[data.length - 1].depth))
          .style(
            "fill",
            colorScheme(normalizedDepthScale(data[data.length - 1].depth))
          )
          .style(
            "fill-opacity",
            Math.pow(
              1 -
                Math.min(
                  1,
                  Math.max(0, normalizedDepthScale(data[data.length - 1].depth))
                ),
              1.7
            ) *
              0.9 +
              0.1
          )
      : null;

    turbcircle
      .transition()
      .duration(30)
      .attr("r", turbidityScale(data[data.length - 1].turbidity))
      .style("fill", colorScheme(data[data.length - 1].turbidity))
      .style(
        "fill-opacity",
        Math.pow(
          1 - Math.min(1, Math.max(0, data[data.length - 1].turbidity)),
          1.7
        ) *
          0.9 +
          0.1
      );
  };

  updateDisplay = d => {
    // let date = d3.select("#date");

    d3.select(".datevalue").html(
      moment(d.time).format("h:mm a dddd MMMM Do, YYYY")
    );

    d3.select(".airt")
      .transition()
      .duration(200)
      .style(
        "background-color",
        d3
          .color(colorScheme3(normalizedTemperatureScale(d.air_temperature)))
          .copy({ opacity: 0.5 })
      );

    d3.select(".airt .inner").html(ctof(d.air_temperature).toFixed(1) + "°F");

    d3.select(".airh")
      .transition()
      .duration(200)
      .style(
        "background-color",
        colorScheme2(normalizedHumidityScale(+d.absolute_humidity))
      );

    d3.select(".airh .inner").html((+d.humidity).toFixed(0) + "%");

    d3.select(".airv")
      .transition()
      .duration(200)
      .style("background-color", colorScheme2(normalizedVocScale(+d.log_gas)));

    d3.select(".airv .inner").html((+d.log_gas).toFixed(1));

    d3.select(".watert")
      .transition()
      .duration(200)
      .style(
        "background-color",
        d3
          .color(colorScheme3(normalizedTemperatureScale(d.water_temperature)))
          .copy({ opacity: 0.5 })
      );

    d3.select(".watert .inner").html(
      ctof(d.water_temperature).toFixed(1) + "°F"
    );

    d3.select(".waterd")
      .transition()
      .duration(200)
      .style("background-color", colorScheme(normalizedDepthScale(d.depth)));

    d3.select(".waterd .inner").html((+d.depth).toFixed(1) + " in");

    d3.select(".wateru")
      .transition()
      .duration(200)
      .style("background-color", colorScheme(d.turbidity));

    d3.select(".wateru .inner").html((+d.turbidity).toFixed(1));
  };
  
  const images = {
    "shifting-baseline": "./images/glenecho-loop.gif",
    "california-breathing": "./images/california_air_loop_big.gif",
    "earth-breathing": "./images/earth-breathing-nadieh.gif",
    measuring: "./images/measure.jpg",
    seasons: "./images/towhee_v_small.gif",
    flood: "./images/DSCF0001.jpg",
    floodbroken: "./images/IMG_8975.jpg",
    "block-diagram": "./images/diagram.png",
    map: "./images/map.png",
    road: "./images/DSCF2548.jpg",
    "historic-map": "./images/historic-map.jpg",
    autumn: "./images/DSCF8611.jpg",
    raccoon: "./images/raccoon.mp4",
    sunfish: "./images/sunfish_cropped.mp4",
    otter: "./images/otter.mp4",
    "wetland-loss": "./images/wetland_loss.png",
    grizzly: "./images/grizzly.jpeg",
    "earth-churn": "./images/earth-churn.gif",
    spacelapse: "./images/spacelapse.jpg"
  };
  
  let startMode = 0;
  let autoAdvance;
  let pos;
  window.addEventListener("scroll", updateScroll);
  
  function updateScroll(e) {
    if (row_data.length == 0 || startMode == 0) {
      startMode = Math.random() * row_data.length;
    }
  
    pos = Math.round(
      (window.scrollY * 0.5 + startMode) % Math.max(1, row_data.length - 72)
    );
  
    if (pos < 0) pos = 0;
  
    subdata = row_data.slice(pos, pos + 72);
    updateData(subdata);
  
    d3.select("svg")
      .select("g")
      .attr("transform", "translate(200, 200) rotate(" + pos * 4.8 + ")");
  
    let d = subdata[71];
    updateDisplay(d);
  }
  
  let loadingInterval;
  loadingInterval = window.setInterval(() => {
    updateScroll();
    if (row_data.length > 0 && startMode > 0) {
      window.clearInterval(loadingInterval);
    }
  }, 100);
  
  function getVideoSize() {
    let width = window.innerWidth;
    let height = window.innerHeight;
  
    let ratio = width / height;
  
    let size = "25%";
  
    if (ratio <= 1.3) {
      size = "50%";
    } else if (ratio <= 1.8) {
      size = "33.3333333%";
    }
  
    return size;
  }
  
  function startVideoPlay() {
    let size = getVideoSize();
    let vs = [];
    for (let i = 0; i < 12; i++) {
      vs.push(i);
    }
  
    let vm = d3.select("#videomatrix");
  
    let videos = vm
      .selectAll("div")
      .data(vs)
      .enter()
      .append("div")
  
      .style("width", size)
      .style("height", "auto")
      .append("video")
      .style("width", "100%")
      .style("height", "auto")
      .attr("id", d => "video" + d)
      .attr("muted", "")
      .attr("autoplay", "")
      .property("muted", true)
      .attr("playsinline", "")
      .on("ended", d => {
        let el = d3.select("#video" + d);
  
        el.select("source").attr(
          "src",
          "./mp4s/" + Math.floor(Math.random() * 499) + ".mp4"
        );
  
        el.node().load();
        el.node().play();
      });
  
    videos
      .append("source")
      .attr("src", d => "./mp4s/" + d + ".mp4")
      .attr("type", "video/mp4");
  
    d3.select("#image").style("display", "none");
  
    d3.select("svg")
      .style("background-color", "#fff")
      .style("max-width", "400px")
      .style("max-height", "400px")
      .style("border-radius", "200px")
      .style("transform", "scale(0.8)");
  
    d3.select("#viz")
      .style("top", "1em")
      .style("left", "-1em");
  
    d3.select("#date .air").style("opacity", 0.0);
    d3.select("#date .water").style("opacity", 0.0);
    d3.select("#date .date").style("margin-top", "110px");
    d3.select("#date .date").style("max-width", "110px");
    d3.select("#date").style("background-color", "rgba(255,255,255,0)");
  
    d3.select(".date").style("color", "white");
    // d3.select("#vizcontainer").style("opacity", 0);
    autoAdvance = window.setInterval(() => {
      pos += 1;
  
      if (pos + 72 > row_data.length) {
        pos = 0;
      }
  
      subdata = row_data.slice(pos, pos + 72);
      updateData(subdata);
  
      d3.select("svg")
        .select("g")
        .attr("transform", "translate(200, 200) rotate(" + pos * 4.8 + ")");
  
      updateDisplay(subdata[71]);
    }, 150);
  }
  
  function endVideoPlay() {
    d3.select("#videomatrix")
      .selectAll("*")
      .remove();
  
    d3.select("svg")
      .style("background-color", null)
      .style("max-width", null)
      .style("max-height", null)
      .style("border-radius", null)
      .style("transform", null);
  
    d3.select("#viz")
      .style("top", null)
      .style("left", null);
  
    d3.select(".date").style("color", null);
  
    d3.select("#date .air").style("opacity", null);
    d3.select("#date .water").style("opacity", null);
    d3.select("#date .date").style("margin-top", null);
    d3.select("#date .date").style("max-width", null);
    d3.select("#date").style("background-color", null);
  
    window.clearInterval(autoAdvance);
  }
  
  // instantiate the scrollama
  const scroller = scrollama();
  
  // setup the instance, pass callback functions
  scroller
    .setup({
      step: ".block",
      offset: 0.6
    })
    .onStepEnter(response => {
      let key = response.element.getAttribute("step-data");
      if (response.element.getAttribute("step-end")) {
        startVideoPlay();
      }
  
      if (key) {
        d3.select("#image")
          .style("display", "flex")
          .selectAll("*")
          .remove();
  
        if (response.element.getAttribute("step-data-type") === "video") {
          d3.select("#image")
            .append("video")
            .attr("autoplay", "")
            .attr("muted", "")
            .property("muted", true)
            .attr("playsinline", "")
            .append("source")
            .attr("src", images[key])
            .attr("type", "video/mp4");
  
          d3.select("#vizcontainer").style("bottom", "1em");
        } else if (response.element.getAttribute("step-data-type") === "viz") {
          d3.select("#vizcontainer").style("bottom", "calc(50% - 180px)");
  
          if (key !== "anywhere") {
            key = +key;
            let pos = Math.round(
              (window.scrollY * 0.5 + startMode) % Math.max(1, row_data.length - 72)
            );
  
            startMode += key - pos;
          }
        } else {
          d3.select("#image")
            .append("img")
            .attr("src", images[key]);
          d3.select("#vizcontainer").style("bottom", "1em");
        }
  
        if (response.element.getAttribute("step-credit")) {
          d3.select("#image")
            .append("div")
            .attr("class", "credit citation")
            .html(response.element.getAttribute("step-credit"));
        }
      } else {
        d3.select("#image").style("display", "none");
      }
      // { element, index, direction }
    })
    .onStepExit(response => {
      // { element, index, direction }
      if (response.element.getAttribute("step-end")) {
        endVideoPlay();
      }
    });
  
  window.onresize = () => {
    d3.select("#videomatrix")
      .selectAll("div")
      .style("width", getVideoSize());
  
    scroller.resize();
  };
  
});
