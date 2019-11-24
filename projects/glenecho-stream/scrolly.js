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

let start = 0;
let autoAdvance;
let pos;
window.addEventListener("scroll", updateScroll);

function updateScroll(e) {
  if (row_data.length == 0 || start == 0) {
    start = Math.random() * row_data.length;
  }

  pos = Math.round(
    (window.scrollY * 0.5 + start) % Math.max(1, row_data.length - 72)
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
  if (row_data.length > 0 && start > 0) {
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
    .property("muted", true)
    .property("autoplay", true)
    .property("playsinline", true)
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
          .property("autoplay", true)
          .property("muted", true)
          .append("source")
          .attr("src", images[key])
          .attr("type", "video/mp4");

        d3.select("#vizcontainer").style("bottom", "1em");
      } else if (response.element.getAttribute("step-data-type") === "viz") {
        d3.select("#vizcontainer").style("bottom", "calc(50% - 180px)");

        if (key !== "anywhere") {
          key = +key;
          let pos = Math.round(
            (window.scrollY * 0.5 + start) % Math.max(1, row_data.length - 72)
          );

          start += key - pos;
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
