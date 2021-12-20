function DistanceChart(_parentElement, _data) {
    this.parentElement = _parentElement;
    this.shotData = _data;
    this.initVis();
}

DistanceChart.prototype.initVis = function () {
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

DistanceChart.prototype.updateVis = function () {
    var vis = this;

    vis.shotData.sort(function (a, b) {
        return parseFloat(b[16]) - parseFloat(a[16]);
    })
    var maxDistance = parseFloat(vis.shotData[0][16]);
    vis.shotData.sort(function (a, b) {
        return parseFloat(a[16]) - parseFloat(b[16]);
    })
    var minDistance = parseFloat(vis.shotData[0][16]);

    var distanceStatistics = [];

    for (var i = minDistance; i <= maxDistance; i++) {
        var filteredShotData = vis.shotData.filter(function (value) {
            return (parseFloat(value[18]) == i);
        })
        var madeShots = d3.sum(filteredShotData, d => d[20]);
        var takenShots = d3.sum(filteredShotData, d => d[19]);
        var shootingPercentage = 0;
        if (takenShots != 0) {
            shootingPercentage = madeShots / takenShots;
        }
        var stats = {
            distance: i,
            percentage: shootingPercentage
        };
        distanceStatistics.push(stats);
    }

    var xScale = d3.scaleLinear()
        .domain([0, maxDistance])
        .range([0, vis.width]);


    vis.svg.append("g")
        .attr("transform", "translate(0," + vis.height + ")")
        .call(d3.axisBottom(xScale));

    vis.svg.append("text")
        .attr("x", vis.width / 2)
        .attr("y", vis.height + vis.margin.top + vis.margin.bottom / 3)
        .style("text-anchor", "middle")
        .text("Distance from Hoop (ft.)");

    var yScale = d3.scaleLinear()
        .domain([0, 1])
        .range([vis.height, 0]);

    vis.svg.append("g")
        .call(d3.axisLeft(yScale));

    console.log("before make brush");

    vis.xContext = d3.scaleLinear()
        .range([0, vis.width])
        .domain(d3.extent(vis.shotData, function (d) { return d[16]; }));
    // vis.xContext = d3.scaleTime()
    // .range([0, vis.width])
    // .domain(d3.extent(vis.displayData, function (d) { return d.Year; }));

    var brush = d3.brushX()
        .extent([[0, 0], [vis.width, vis.height]])
        .on("brush", brushed);

    // Append brush component
    vis.svg.append("g")
        .attr("class", "x-brush")
        .call(brush)
        .selectAll("rect")
        .attr("y", -6)
        .attr("height", vis.height + 7);

    console.log("after make brush");


    vis.svg.append("text")
        .style("text-anchor", "middle")
        .attr("transform", "rotate(90)")
        .attr("x", 0)
        .attr("y", vis.height / 2)
        .text("Shooting %");

    vis.svg.append("path")
        .datum(distanceStatistics)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function (d) { return xScale(d.distance); })
            .y(function (d) { return yScale(d.percentage); })
        );

    var brush_button = d3.select("#distance-chart-area");

    brush_button.enter().append("button")
        .merge(brush_button)
        .append("button")
        .attr("class", "brush-button")
        .attr("type", "submit")
        .text("Clear brush")
        .on("click", undoBrush);

    brush_button.exit().remove();

    function brushed({ selection }) {

        var distanceMax = distanceChart.xContext.domain()[1];
        var rangeMax = distanceChart.width;
        var distanceScale = d3.scaleLinear()
            .domain([0, rangeMax])
            .range([0, distanceMax]);

        var selectedDistanceMin = (distanceScale(selection[0]) + 1).toFixed(0);
        var selectedDistanceMax = (distanceScale(selection[1]) + 1).toFixed(0);
        console.log("[" + selectedDistanceMin + ", " + selectedDistanceMax + "]");
        // updating
        var heatmap_on;
        if (d3.select('#heatmap-checkbox').property('checked')) {
            console.log("heatmap on");
            heatmap_on = true;
        }
        else {
            console.log("heatmap off");
            heatmap_on = false;
        }
        var first_load = false;
        var shots_displayed = d3.select('#shot-select').property('value');
        console.log(shots_displayed);
        d3.select("#shot-select").remove();
        d3.select("#heatmap-checkbox").remove();
        d3.select("#toggle-text").remove();
        d3.select(".the-court").select("circle").remove();
        d3.select(".the-court").select("g").remove();
        d3.select(".the-court").remove();
        court = new CourtChart("court-area", vis.shotData, first_load, heatmap_on, shots_displayed, selectedDistanceMin, selectedDistanceMax);

    }

    function undoBrush() {

        // updating
        var heatmap_on;
        if (d3.select('#heatmap-checkbox').property('checked')) {
            console.log("heatmap on");
            heatmap_on = true;
        }
        else {
            console.log("heatmap off");
            heatmap_on = false;
        }
        var first_load = false;
        var shots_displayed = d3.select('#shot-select').property('value');
        console.log(shots_displayed);
        d3.select("#shot-select").remove();
        d3.select("#heatmap-checkbox").remove();
        d3.select("#toggle-text").remove();
        d3.select(".the-court").select("circle").remove();
        d3.select(".the-court").select("g").remove();
        d3.select(".the-court").remove();
        // d3.select(".x-brush").remove();
        court = new CourtChart("court-area", vis.shotData, first_load, heatmap_on, shots_displayed, null, null);
    }

}
