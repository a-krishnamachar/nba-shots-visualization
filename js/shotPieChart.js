function ShotPieChart(_parentElement, _data) {
    this.parentElement = _parentElement;
    this.shotData = _data;
    this.initVis();
}

ShotPieChart.prototype.initVis = function () {
    var vis = this;

    vis.margin = 20;
    vis.width = 300;
    vis.height = 300;

    vis.svg = d3.select("#shot-pie-chart-area").append("svg")
        .attr("width", vis.width)
        .attr("height", vis.height)
        .append("g")
        .attr("transform", "translate(" + vis.width / 2 + "," + vis.height / 2 + ")");

    vis.svg2 = d3.select("#shot-pie-chart-area").append("svg")
        .attr("width", vis.width)
        .attr("height", vis.height)
        .append("g")
        .attr("transform", "translate(" + vis.width / 2 + "," + vis.height / 2 + ")");

    this.updateVis();
}

ShotPieChart.prototype.updateVis = function () {
    var vis = this;

    var div = d3.select("#pie-chart-tooltip").append("div")
    .attr("class", "pie-tooltip")
    .style("opacity", 0);

    var totalShots = vis.shotData.length;
    console.log("total shots: " + totalShots);
    var twoPointers = vis.shotData.filter(function (value, index) {
        return value[12] == "2PT Field Goal";
    });
    var threePointers = vis.shotData.filter(function (value, index) {
        return value[12] == "3PT Field Goal";
    });
    var total_twoPointers = twoPointers.length;
    var total_threePointers = threePointers.length;
    var madeTwoPointers = twoPointers.filter(function (value, index) {
        return value[10] == "Made Shot";
    })
    var madeThreePointers = threePointers.filter(function (value, index) {
        return value[10] == "Made Shot";
    })
    console.log("here");
    console.log(madeTwoPointers);
    console.log(madeThreePointers);
    var madeTwosCount = madeTwoPointers.length;
    var madeThreesCount = madeThreePointers.length;
    var twoPointPercentage = madeTwosCount / total_twoPointers;
    var threePointPercentage = madeThreesCount / total_threePointers;
    var twoPointData = { "twos made": twoPointPercentage, "twos missed": 1 - twoPointPercentage };
    var threePointData = { "threes made": threePointPercentage, "threes missed": 1 - threePointPercentage };

    var colorScale = d3.scaleOrdinal()
        .range(["black", "red"]);

    var radiusScale = d3.scaleLinear()
        .domain([0, 1])
        .range([0, vis.height / 2 - vis.margin]);

    var pie2 = d3.pie()
        .value(function (d) { return d[1]; });
    var pie2_ready = pie2(Object.entries(twoPointData));

    var pie3 = d3.pie()
        .value(function (d) { return d[1]; });
    var pie3_ready = pie3(Object.entries(threePointData));

    vis.svg.selectAll('slices')
        .data(pie2_ready)
        .enter()
        .append('path')
        .attr('d', d3.arc()
            .innerRadius(0)
            .outerRadius(radiusScale(total_twoPointers / totalShots))
        )
        .attr('fill', function (d) { return colorScale(d.data[1]) })
        .attr('stroke', 'black')
        .style('stroke-width', '2px')
        .style('opacity', 0.7)
        .on("mouseover", function(d,i) {
            console.log(i)
            div.transition().duration(200)
              .style("opacity", .8);
              div	.html((i.data[1]*100).toFixed(2) + "% of " + i.data[0]
          );
          })
          .on("mouseout", function(d) {
            div.transition().duration(300)
              .style("opacity", 0);
          });

    // vis.svg.selectAll('slices')
    //     .data(pie2_ready)
    //     .enter()
    //     .append('text')
    //     .text(function(d) {
    //         console.log(d);
    //         return (100*d.data[1]).toFixed(2) + "%";
    //     })
    //     .attr("transform", function(d) {
    //         return "translate(" + d3.arc().innerRadius(0).outerRadius(radiusScale(total_twoPointers / totalShots)).centroid(d) + ")";
    //     })
    //     .style("fill", "blue")
    //     .style("text-anchor", "middle")
    //     .style("opacity", 0.7);

    vis.svg.append("text")
        .text("2-PT FGs (" + total_twoPointers + " attempted)")
        .attr("transform", "translate(" + 0 + "," + (vis.height/(-2) + vis.margin) + ")")
        .style("text-anchor", "middle");

    vis.svg2.selectAll('slices')
        .data(pie3_ready)
        .enter()
        .append('path')
        .attr('d', d3.arc()
            .innerRadius(0)
            .outerRadius(radiusScale(total_threePointers / totalShots))
        )
        .attr('fill', function (d) { return colorScale(d.data[1]) })
        .attr('stroke', 'black')
        .style('stroke-width', '2px')
        .style('opacity', 0.7)
        .on("mouseover", function(d,i) {
            console.log(i)
            div.transition().duration(200)
              .style("opacity", .8);
              div	.html((i.data[1]*100).toFixed(2) + "% of " + i.data[0]
          );
          })
          .on("mouseout", function(d) {
            div.transition().duration(300)
              .style("opacity", 0);
          });

        // vis.svg2.selectAll('slices')
        // .data(pie3_ready)
        // .enter()
        // .append('text')
        // .text(function(d) {
        //     console.log(d);
        //     return (100*d.data[1]).toFixed(2) + "%";
        // })
        // .attr("transform", function(d) {
        //     return "translate(" + d3.arc().innerRadius(0).outerRadius(radiusScale(total_threePointers / totalShots)).centroid(d) + ")";
        // })
        // .style("fill", "blue")
        // .style("text-anchor", "middle")
        // .style("opacity", 0.7);

        vis.svg2.append("text")
        .text("3-PT FGs (" + total_threePointers + " attempted)")
        .attr("transform", "translate(" + 0 + "," + (vis.height/(-2) + vis.margin) + ")")
        .style("text-anchor", "middle");


}
