
function CourtChart(_parentElement, _data) {
  this.parentElement = _parentElement;
  this.shotData = _data;
  this.displayData = [];


  this.initVis();

}


CourtChart.prototype.initVis = function () {
  var vis = this;

  vis.margin = { top: 50, right: 20, bottom: 50, left: 20 };

  vis.width = widthCourt - vis.margin.left - vis.margin.right,
    vis.height = heightCourt - vis.margin.top - vis.margin.bottom;

  vis.svg = d3.select("#court-area").append("svg")
    .attr("viewBox", '0 0 500 500')
    // .attr("width", "50%")
    //.attr("width", widthCourt)
    //.attr("height", heightCourt)
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

function CellStats(width_index, height_index, cell_percentage) {
  this.width_index = width_index;
  this.height_index = height_index;
  this.cell_percentage = cell_percentage;
}

CourtChart.prototype.updateVis = function () {
  var vis = this;
  console.log(vis.shotData);

  vis.shotData.sort(function (a,b) {
    return parseFloat(a[16]) - parseFloat(b[16]);
  });

  var shot_types = ["All Shots", "Made Shots", "Missed Shots"];

  // // FOR TOGGLING - WAIT UNTIL SEARCH IS CORRECTLY SET UP

  var select = d3.select('#select-area').append('select')
    .attr('class', 'shot-select')
    .on('change', onChange);

  var options = select.selectAll('option')
    .data(shot_types).enter()
    .append('option')
    .text(function(d) { return d; });

  var checkbox = d3.select('#select-area').append('input')
    .attr('type', 'checkbox')
    .attr('id', 'heatmap-checkbox')
    .on('change', onChange)
    .text('Toggle heatmap');

  function onChange() {
    var selected_shot = d3.select('select').property('value');
    if (d3.select('#heatmap-checkbox').property('checked')) {
      console.log('heatmap toggled');
    }
    else {
      console.log('heatmap not toggled');
    }
    console.log(selected_shot);
  }

  // END TOGGLING

  let delayRandomizer = d3.scaleLinear()
    .domain([0, 1])
    .range([0, 10000]);

  var xLocationScale = d3.scaleLinear()
    .domain([-250, 250])
    .range([0, vis.width]);

  var yLocationScale = d3.scaleLinear()
    .domain([-70, 440])
    .range([0, vis.height]);

  var opacityScale = d3.scaleLinear()
    .domain([0,1])
    .range([0.2, 0.8]);

  var colorScale = d3.scaleSequential()
  .interpolator(d3.interpolateRdBu)
  .domain([1,0]);

  // // GRID HEATMAP CREATION

  // console.log("here now");
  // console.log(vis.shotData);

  // var cellWidth = vis.width / 15;
  // var cellHeight = vis.height / 15;
  // var maxWidthIndex = 0;
  // var maxHeightIndex = 0;
  // console.log("Cell width: " + cellWidth + " Cell height: " + cellHeight);
  // for (let i = 0; i < vis.shotData.length; i++) {
  //   let widthIndex = parseInt(xLocationScale(vis.shotData[i][17]) / cellWidth);
  //   if (widthIndex > maxWidthIndex) {
  //     maxWidthIndex = widthIndex;
  //   }
  //   let heightIndex = parseInt(yLocationScale(vis.shotData[i][18]) / cellHeight);
  //   if (heightIndex > maxHeightIndex) {
  //     maxHeightIndex = heightIndex;
  //   }
  //   console.log(widthIndex + ", " + heightIndex);
  //   vis.shotData[i].width_index = widthIndex;
  //   vis.shotData[i].height_index = heightIndex;

  // }
  // console.log(vis.shotData);
  // console.log("width in cells: " + maxWidthIndex);
  // console.log("height in cells: " + maxHeightIndex);

  // var cellStatistics = [];
  // for (let i = 0; i < maxWidthIndex + 1; i++) {
  //   for (let j = 0; j < maxHeightIndex; j++) {
  //     var filteredShots = vis.shotData.filter(function (value) {
  //       return (value.width_index == i) && (value.height_index == j);
  //     })
  //     var madeShots = d3.sum(filteredShots, d => d[20]);
  //     var totalShots = d3.sum(filteredShots, d => d[19]);
  //     var cellPercentage;
  //     if (totalShots == 0) {
  //       cellPercentage = 0.5;
  //     }
  //     else {
  //       cellPercentage = (madeShots / totalShots).toFixed(3);
  //     }
  //     var newCell = new CellStats(i, j, parseFloat(cellPercentage));
  //     cellStatistics.push(newCell);
  //   }
  // }
  // console.log("cell stats");
  // console.log(cellStatistics);

  // var heatCell = vis.svg.selectAll(".heat-cell")
  //   .data(cellStatistics);

  // heatCell.enter().append("rect")
  //   .merge(heatCell)
  //   .attr("class", "heat-cell")
  //   .attr("x", function (d) {
  //     return cellWidth * d.width_index;
  //   })
  //   .attr("y", function (d) {
  //     return vis.height - 27 - (cellHeight * (d.height_index));
  //   })
  //   .attr("width", cellWidth)
  //   .attr("height", cellHeight)
  //   // .attr("fill", function(d) {
  //   //   return colorScale(d.cell_percentage);
  //   // })
  //   // .style("opacity", 0.4)
  //   .attr("fill", "red")
  //   .style("opacity", function(d) {
  //     return opacityScale(d.cell_percentage);
  //   });

  //  // END HEAT MAP CREATION

  // SHOT POINT DYNAMIC CREATION

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
    .attr("r", 1)
    // .style("fill", "black")
    // .style("opacity", function (d, i) {
    //   if (d[10] == "Missed Shot") { return "0"; }
    //   else { return "1"; }
    // })
    .style("fill", function(d, i) {
      if (d[10] == "Missed Shot") { return "red" }
      else { return "black"}
    })
    .attr("visibility", "hidden")
    .on("mouseover", shotMouseOver)
    .on("mouseout", shotMouseOut)
    .transition()
    // .delay(function () {
    //   return delayRandomizer(Math.random());
    // })
    .delay(function(d,i) {
      return 10*i;
    })
    .attr("visibility", "visible");

  shotPoint.exit().remove();

  // END SHOT POINT DYNAMIC CREATION


  function shotMouseOver(d, i) {
    // console.log("Here");
    // console.log(i[10]);
    // console.log(i[12]);
    // console.log(i[13]);
    // console.log(i[14]);
    // console.log(i[1]);
  }

  function shotMouseOut(d) {

  }


}
