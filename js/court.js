
function Court (_parentElement, _data) {
  this.parentElement = _parentElement;
  this.data = _data;
  this.displayData = []; // see data wrangling

    // DEBUG RAW DATA
  console.log(this.data);

  this.initVis();
}

Court.prototype.initVis = function() {
  var vis = this;

  vis.margin = { top: 50, right: 20, bottom: 50, left: 20 };

	vis.width = 440 - vis.margin.left - vis.margin.right,
  vis.height = 500 - vis.margin.top - vis.margin.bottom;

  var courtBackgroundURL = "data/court.jpg";
        vis.courtSvg.append("svg:defs")
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

        vis.courtSvg.append("rect")
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

       courtSvg.append("circle")
       .attr("r", 4)
       .attr("cx", 200)
       .attr("cy",340)

}
