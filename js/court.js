
function CourtChart(_parentElement, _data, _first_load, _heatmap_on, _shots_displayed) {
  this.parentElement = _parentElement;
  this.shotData = _data;
  this.first_load = _first_load;
  this.heatmap_on = _heatmap_on;
  this.shots_displayed = _shots_displayed;
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
  console.log("first load? " + vis.first_load);
  console.log("heatmap on? " + vis.heatmap_on);
  console.log("shots displayed: " + vis.shots_displayed);
  console.log(vis.shotData);

  vis.shotData.sort(function (a,b) {
    return parseFloat(a[16]) - parseFloat(b[16]);
  });

  var shot_types = ["All Shots", "Made Shots", "Missed Shots"];

  // FOR TOGGLING - WAIT UNTIL SEARCH IS CORRECTLY SET UP

  var select = d3.select("#select-area").append('select')
    .attr('id', "shot-select")
    .on("change", onChange);

  var options = select.selectAll('option')
    .data(shot_types).enter()
    .append('option')
    .text(function(d) { return d; })
    .property('selected', function(d) {
      if (d == vis.shots_displayed) {
        return true;
      }
      else { return false; }
    });

  d3.select("#select-area").append('text')
    .attr("id", "toggle-text")
    .text('Toggle heatmap');

  var checkbox = d3.select('#select-area').append('input')
    .attr('type', 'checkbox')
    .attr('id', 'heatmap-checkbox')
    .property('checked', function() {
      console.log("checkingggg heatmap on: " + vis.heatmap_on);
      if (vis.heatmap_on) {
        console.log("nay");
        return true;
      }
      else {
        console.log("yay");
        return false;
      }
    })
    .text('Toggle heatmap')
    .on('change', onChange);

  function onChange() {
    if (d3.select('#heatmap-checkbox').property('checked')) {
      vis.heatmap_on = true;
    }
    else {
      vis.heatmap_on = false;
    }
    vis.first_load = false;
    vis.shots_displayed = d3.select('#shot-select').property('value');
    d3.select("#shot-select").remove();
    d3.select("#heatmap-checkbox").remove();
    d3.select("#toggle-text").remove();
    d3.selectAll("svg").remove();
    court = new CourtChart("court-area", vis.shotData, vis.first_load, vis.heatmap_on, vis.shots_displayed);
    distanceChart = new DistanceChart("distance-chart-area", vis.shotData);

    shotPieChart = new ShotPieChart("shot-pie-chart-area", vis.shotData);

  }

  // END TOGGLING

  let delayRandomizer = d3.scaleLinear()
    .domain([0, 1])
    .range([0, 10000]);

  var xLocationScale = d3.scaleLinear()
    .domain([-250, 250])
    .range([0, widthCourt]);

    var pointYLocationScale = d3.scaleLinear()
    .domain([-70, 440])
    .range([-17, heightCourt - 17]);

  var cellYLocationScale = d3.scaleLinear()
    .domain([-70, 440])
    .range([0, heightCourt]);

  var opacityScale = d3.scaleLinear()
    .domain([0,1])
    .range([0.2, 0.8]);

  var colorScale = d3.scaleSequential()
  .interpolator(d3.interpolateRdBu)
  .domain([1,0]);

  console.log("now i'm here");
  console.log(vis.heatmap_on);

  // GRID HEATMAP CREATION

  if (vis.heatmap_on) {
    console.log("here now");
    console.log(vis.shotData);
  
    var cellWidth = widthCourt / 15;
    var cellHeight = widthCourt / 15;
    var maxWidthIndex = 15;
    var maxHeightIndex = 14;
    console.log("Cell width: " + cellWidth + " Cell height: " + cellHeight);
    for (let i = 0; i < vis.shotData.length; i++) {
      let widthIndex = parseInt(xLocationScale(vis.shotData[i][17]) / cellWidth);
      // if (widthIndex > maxWidthIndex) {
      //   maxWidthIndex = widthIndex;
      // }
      let heightIndex = parseInt(cellYLocationScale(vis.shotData[i][18]) / cellHeight) - 1;
      // if (heightIndex > maxHeightIndex) {
      //   maxHeightIndex = heightIndex;
      // }
      // console.log(widthIndex + ", " + heightIndex);
      vis.shotData[i].width_index = widthIndex;
      vis.shotData[i].height_index = heightIndex;
  
    }
    console.log("right here");
    console.log(vis.shotData);
    console.log("width in cells: " + maxWidthIndex);
    console.log("height in cells: " + maxHeightIndex);

    var cellStatistics = [];
    for (let i = 0; i < maxWidthIndex; i++) {
      for (let j = 0; j < maxHeightIndex; j++) {
        var filteredShots = vis.shotData.filter(function (value) {
          return (value.width_index == i) && (value.height_index == j);
        })
        var madeShots = d3.sum(filteredShots, d => d[20]);
        var totalShots = d3.sum(filteredShots, d => d[19]);
        var cellPercentage;
        if (totalShots == 0) {
          cellPercentage = 0.5;
        }
        else {
          cellPercentage = (madeShots / totalShots).toFixed(3);
        }
        var newCell = new CellStats(i, j, parseFloat(cellPercentage));
        cellStatistics.push(newCell);
      }
    }
    console.log("cell stats");
    console.log(cellStatistics);
  
    var heatCell = vis.svg.selectAll(".heat-cell")
      .data(cellStatistics);
  
    heatCell.enter().append("rect")
      .merge(heatCell)
      .attr("class", "heat-cell")
      .attr("x", function (d) {
        return cellWidth * d.width_index;
      })
      .attr("y", function (d) {
        return heightCourt - 17 - (cellHeight * (d.height_index + 1));
      })
      .attr("width", cellWidth)
      .attr("height", cellHeight)
      // .attr("fill", function(d) {
      //   return colorScale(d.cell_percentage);
      // })
      // .style("opacity", 0.4)
      .attr("fill", "red")
      .style("opacity", function(d) {
        return opacityScale(d.cell_percentage);
      });
  }

   // END HEAT MAP CREATION

  // SHOT POINT DYNAMIC CREATION

  // if (vis.shots_displayed == "Made Shots") {
  //   vis.shotData = vis.shotData.filter(function(value, index) {
  //     return value[10] == "Made Shot";
  //   })
  // }
  // else if (vis.shots_displayed == "Missed Shots") {
  //   vis.shotData = vis.shotData.filter(function(value, index) {
  //     return value[10] == "Missed Shot";
  //   })
  // }
  // console.log(vis.shots_displayed);

  var shotPoint = vis.svg.selectAll(".shot-point")
    .data(vis.shotData);

  shotPoint.enter().append("circle")
    .merge(shotPoint)
    .attr("class", "shot-point")
    .attr('cx', function (d, i) {
      return xLocationScale(parseFloat(d[17]));
    })
    .attr('cy', function (d, i) {
      return vis.height + 100 -pointYLocationScale(parseFloat(d[18]));
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
    .attr("visibility", "hidden"
    )
    .on("mouseover", shotMouseOver)
    .on("mouseout", shotMouseOut)
    .transition()
    // .delay(function () {
    //   return delayRandomizer(Math.random());
    // })
    .delay(function(d,i) {
      if (vis.first_load) {
        return 10*i;
      }
      else { return 1; }
    })
    .attr("visibility", function(d,i) {
      var shot_displayed = vis.shots_displayed.substring(0, vis.shots_displayed.length - 1);
      if ((shot_displayed == d[10]) || vis.shots_displayed == "All Shots") {
        return "visible";
      }
      else {
        return "hidden";
      }
    });

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
