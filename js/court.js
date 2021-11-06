
function CourtChart (_parentElement, _data) {
  this.parentElement = _parentElement;
  this.data = _data;
  this.displayData = [];

  console.log(this.data);

  this.initVis();
}


CourtChart.prototype.initVis = function() {
  var vis = this;

  vis.margin = { top: 50, right: 20, bottom: 50, left: 20 };

	vis.width = 440 - vis.margin.left - vis.margin.right,
  vis.height = 500 - vis.margin.top - vis.margin.bottom;

  vis.svg = d3.select("#court-area").append("svg")

  //vis.svg = d3.select("#" + vis.parentElement).append("svg")
      .attr("viewBox", '0 0 600 600')
	    //.attr("width", vis.width + vis.margin.left + vis.margin.right)
	    //.attr("height", vis.height + vis.margin.top + vis.margin.bottom)
       .append("g")

  var courtBackgroundURL = "data/court.jpg";

        vis.svg.append("svg:defs")
          .append("svg:pattern")
          .attr("id", "court-background")
          .attr('patternUnits', 'userSpaceOnUse')
          .attr("width", widthCourt)
          .attr("height", heightCourt)
          .append("svg:image")
          .attr("id","image-url")
          .attr("xlink:href", courtBackgroundURL)
          .attr("width", widthCourt)
          .attr("height", heightCourt);

        console.log(heightCourt)

        vis.svg.append("rect")
          .attr("width", widthCourt)
          .attr("height", heightCourt)
          .attr("x", "0")
          .attr("y", "0")
          .attr("fill", "url(#court-background)");

      d3.selectAll('dot').remove();


       //var points = svg.selectAll("dot").data(playerData)
       //.enter()

       //(0,0) in our svg is at the top left
       //(0,0) in the NBA api is at the center of the hoop => (200,340)
       //x+200, y+340

       //waiting to populate data from API!! pull datapoints into a points array and then
       //can add them as needed

       //first layer of blocks (closest to hoop)
       vis.svg.append("rect")
        .attr("width", widthCourt/4)
        .attr("height", heightCourt/5)
        .attr("x", 0)
        .attr("y", 308)
        .attr("fill", "white")
        .style("opacity", 0.2)
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut);

        vis.svg.append("rect")
         .attr("width", widthCourt/4)
         .attr("height", heightCourt/5)
         .attr("x", 100)
         .attr("y", 308)
         .attr("fill", "white")
         .style("opacity", 0.2)
         .on("mouseover", handleMouseOver)
         .on("mouseout", handleMouseOut);

         vis.svg.append("rect")
          .attr("width", widthCourt/4)
          .attr("height", heightCourt/5)
          .attr("x", 200)
          .attr("y", 308)
          .attr("fill", "white")
          .style("opacity", 0.2)
          .on("mouseover", handleMouseOver)
          .on("mouseout", handleMouseOut);

          vis.svg.append("rect")
           .attr("width", widthCourt/4)
           .attr("height", heightCourt/5)
           .attr("x", 300)
           .attr("y", 308)
           .attr("fill", "white")
           .style("opacity", 0.2)
           .on("mouseover", handleMouseOver)
           .on("mouseout", handleMouseOut);

           vis.svg.append("rect")
            .attr("width", widthCourt/4)
            .attr("height", heightCourt/5)
            .attr("x", 300)
            .attr("y", 308)
            .attr("fill", "white")
            .style("opacity", 0.2)
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut);

            //second layer of blocks
            vis.svg.append("rect")
             .attr("width", widthCourt/4)
             .attr("height", heightCourt/5)
             .attr("x", 0)
             .attr("y", 228)
             .attr("fill", "white")
             .style("opacity", 0.2)
             .on("mouseover", handleMouseOver)
             .on("mouseout", handleMouseOut);

             vis.svg.append("rect")
              .attr("width", widthCourt/4)
              .attr("height", heightCourt/5)
              .attr("x", 100)
              .attr("y", 228)
              .attr("fill", "white")
              .style("opacity", 0.2)
              .on("mouseover", handleMouseOver)
              .on("mouseout", handleMouseOut);

              vis.svg.append("rect")
               .attr("width", widthCourt/4)
               .attr("height", heightCourt/5)
               .attr("x", 200)
               .attr("y", 228)
               .attr("fill", "white")
               .style("opacity", 0.2)
               .on("mouseover", handleMouseOver)
               .on("mouseout", handleMouseOut);

               vis.svg.append("rect")
                .attr("width", widthCourt/4)
                .attr("height", heightCourt/5)
                .attr("x", 300)
                .attr("y", 228)
                .attr("fill", "white")
                .style("opacity", 0.2)
                .on("mouseover", handleMouseOver)
                .on("mouseout", handleMouseOut);

      function handleMouseOver(d, i) {
        d3.select(this).attr("r", 10).style("fill", "blue").style("opacity",0.7);
      }

      function handleMouseOut(d,i) {
        d3.select(this).attr("r", 5.5).style("fill", "white").style("opacity", 0.2);
      }

       vis.updateVis();

}

CourtChart.prototype.updateVis = function() {
  var vis = this;

  //populate data
  var categories = vis.svg.selectAll(".area")
      .data(vis.displayData);

  categories.enter().append("circle")
    .attr("class", "dots")
    // .style("fill", function(d,i) {
    //   return colorScale();
    // })
    .style("fill", "blue")


  categories.exit().remove();




}
