
function CourtChart(_parentElement, _data) {
  this.parentElement = _parentElement;
  this.shotData = _data;
  this.displayData = [];


  this.initVis();
}


CourtChart.prototype.initVis = function () {
  var vis = this;

  vis.margin = { top: 50, right: 20, bottom: 50, left: 20 };

  vis.width = 440 - vis.margin.left - vis.margin.right,
    vis.height = 500 - vis.margin.top - vis.margin.bottom;

  vis.svg = d3.select("#court-area").append("svg")
    .attr("viewBox", '0 0 600 600')
    .append("g")

  var courtBackgroundURL = "data/nba_court.jpeg";

  vis.svg.append("svg:defs")
    .append("svg:pattern")
    .attr("id", "court-background")
    .attr('patternUnits', 'userSpaceOnUse')
    .attr("width", widthCourt)
    .attr("height", heightCourt)
    .append("svg:image")
    .attr("id", "image-url")
    .attr("xlink:href", courtBackgroundURL)
    .attr("width", widthCourt)
    .attr("height", heightCourt);

  vis.svg.append("rect")
    .attr("width", widthCourt)
    .attr("height", heightCourt)
    .attr("x", "0")
    .attr("y", "0")
    .attr("fill", "url(#court-background)");

  vis.updateVis();



}

CourtChart.prototype.updateVis = function () {
  var vis = this;

  //populate data
  // SHOT POINT DYNAMIC CREATION PLUS PROPER SCALES

  let delayRandomizer = d3.scaleLinear()
    .domain([0, 1])
    .range([0, 10000]);

  var xLocationScale = d3.scaleLinear()
    .domain([-250, 250])
    .range([0, vis.width]);

  var yLocationScale = d3.scaleLinear()
    .domain([-70, 440])
    .range([0, vis.height]);

  // var colorScale = d3.scaleLinear()
  //   .range(["white", "red"])
  //   .domain([0, 100]);

  // var shotHeat = vis.svg.selectAll(".shot-heat")
  //   .data(vis.shotData);

  // shotHeat.enter().append("circle")
  //   .merge(shotHeat)
  //   .attr("class", "shot-heat")
  //   .attr("cx", function (d, i) {
  //     return xLocationScale(parseFloat(d[17]));
  //   })
  //   .attr("cy", function (d, i) {
  //     return vis.height - yLocationScale(parseFloat(d[18]));
  //   })
  //   .attr("r", 50)
  //   .style("fill", function (d, i) {
  //     if (d[10] == "Missed Shot") { return "white"; }
  //     else { return "red"; }
  //   })
  //   .style("opacity", 0.2);

  // shotHeat.exit().remove();

  var shotPoint = vis.svg.selectAll(".shot-point")
    .data(vis.shotData);

  shotPoint.enter().append("circle")
    .merge(shotPoint)
    .attr("class", "shot-point")
    .attr('cx', function (d, i) {
      return xLocationScale(parseFloat(d[17]));
    })
    .attr('cy', function (d, i) {
      return vis.height - yLocationScale(parseFloat(d[18]));
    })
    .attr("r", 2)
    .style("fill", function (d, i) {
      if (d[10] == "Missed Shot") { return "red"; }
      else { return "black"; }
    })
    .attr("visibility", "hidden")
    .on("mouseover", shotMouseOver)
    .on("mouseout", shotMouseOut)
    .transition()
    .delay(function () {
      return delayRandomizer(Math.random());
    })
    .attr("visibility", "visible");

  shotPoint.exit().remove();

  // END SHOT POINT DYNAMIC CREATION


  function shotMouseOver(d, i) {
    console.log("Here");
    console.log(i[10]);
    console.log(i[12]);
    console.log(i[13]);
    console.log(i[14])
  }

  function shotMouseOut(d) {

  }

  // GRID HEATMAP CREATION

  

}
