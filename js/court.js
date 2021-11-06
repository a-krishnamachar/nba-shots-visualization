
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

  vis.svg = d3.select("#" + vis.parentElement).append("svg")
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

       vis.svg.append("circle")
       .attr("r", 4)
       .attr("cx", 200)
       .attr("cy",340)

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
