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
      .html(ctof(d.air_temperature).toFixed(1) + "°F")
      .transition()
      .duration(200)
      .style(
        "background-color",
        d3
          .color(colorScheme3(normalizedTemperatureScale(d.air_temperature)))
          .copy({ opacity: 0.5 })
      );

    d3.select(".airh")
      .html((+d.humidity).toFixed(0) + "% RH")
      .transition()
      .duration(200)
      .style(
        "background-color",
        colorScheme2(normalizedHumidityScale(+d.absolute_humidity))
      );

    d3.select(".airv")
      .html((+d.log_gas).toFixed(1))
      .transition()
      .duration(200)
      .style("background-color", colorScheme2(normalizedVocScale(+d.log_gas)));

    d3.select(".watert")
      .html(ctof(d.water_temperature).toFixed(1) + "°F")
      .transition()
      .duration(200)
      .style(
        "background-color",
        d3
          .color(colorScheme3(normalizedTemperatureScale(d.water_temperature)))
          .copy({ opacity: 0.5 })
      );

    d3.select(".waterd")
      .html((+d.depth).toFixed(1) + " in")
      .transition()
      .duration(200)
      .style("background-color", colorScheme(normalizedDepthScale(d.depth)));

    d3.select(".wateru")
      .html((+d.turbidity).toFixed(1))
      .transition()
      .duration(200)
      .style("background-color", colorScheme(d.turbidity));
  };
});
