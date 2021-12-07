function DistanceChart (_parentElement, _data) {
    this.parentElement = _parentElement;
    this.shotData = _data;
    this.initVis();
}

DistanceChart.prototype.initVis = function() {
    var vis = this;

    vis.margin = { top: 20, right: 20, bottom: 40, left: 50 };
    vis.width = 600 - vis.margin.left - vis.margin.right;
    vis.height = 300 - vis.margin.top - vis.margin.bottom;

    vis.svg = d3.select("#distance-chart-area").append("svg")
    // vis.svg = d3.select("#chart-area").append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
            .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");
    console.log("im' here!!!");
    this.updateVis();
}

DistanceChart.prototype.updateVis = function() {
    var vis = this;

    vis.shotData.sort(function (a,b) {
        return parseFloat(b[16]) - parseFloat(a[16]);
    })
    var maxDistance = parseFloat(vis.shotData[0][16]);
    vis.shotData.sort(function (a,b) {
        return parseFloat(a[16]) - parseFloat(b[16]);
    })
    var minDistance = parseFloat(vis.shotData[0][16]);

    var distanceStatistics = [];

    for (var i = minDistance; i <= maxDistance; i++) {
       var filteredShotData = vis.shotData.filter(function(value) {
           return (parseFloat(value[18]) == i);
       })
       var madeShots = d3.sum(filteredShotData, d => d[20]);
       var takenShots = d3.sum(filteredShotData, d => d[19]);
       var shootingPercentage = 0;
       if (takenShots != 0) {
           shootingPercentage = madeShots/takenShots;
       }
       var stats = {
           distance: i,
           percentage: shootingPercentage
       };
       distanceStatistics.push(stats);
    }

    var xScale = d3.scaleLinear()
        .domain([0, maxDistance])
        .range([0,vis.width]);

    vis.svg.append("g")
        .attr("transform", "translate(0," + vis.height + ")")
        .call(d3.axisBottom(xScale));

    vis.svg.append("text")
        .attr("x", vis.width/2)
        .attr("y", vis.height + vis.margin.top + vis.margin.bottom/3)
        .style("text-anchor", "middle")
        .text("Distance from Hoop (ft.)");

    var yScale = d3.scaleLinear()
        .domain([0,1])
        .range([vis.height, 0]);

    vis.svg.append("g")
        .call(d3.axisLeft(yScale));

    vis.svg.append("text")
        .style("text-anchor", "middle")
        .attr("transform", "rotate(90)")
        .attr("x", 0)
        .attr("y", vis.height/2)
        .text("Shooting %");

    vis.svg.append("path")
        .datum(distanceStatistics)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function(d) { return xScale(d.distance);})
            .y(function(d) { return yScale(d.percentage); })
            );
}
