
function CourtChart (_parentElement, _data) {
  this.parentElement = _parentElement;
  this.data = _data;
  this.displayData = [];

  //console.log(this.data);

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

        vis.svg.append("rect")
          .attr("width", widthCourt)
          .attr("height", heightCourt)
          .attr("x", "0")
          .attr("y", "0")
          .attr("fill", "url(#court-background)");

      d3.selectAll('dot').remove();

      var allText =  vis.svg.selectAll("text");

       //var points = svg.selectAll("dot").data(playerData)
       //.enter()

       //(0,0) in our svg is at the top left
       //(0,0) in the NBA api is at the center of the hoop => (200,340)
       //x+200, y+340

       //waiting to populate data from API!! pull datapoints into a points array and then
       //can add them as needed

       //first layer of blocks (closest to hoop)

       //left corner 3
       vis.svg.append("rect")
        .attr("width", widthCourt/4)
        .attr("height", heightCourt/5)
        .attr("x", 0)
        .attr("y", 308)
        .attr("fill", "white")
        .style("opacity", 0.2)
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut);

        //closest to hoop "restricted area"
        vis.svg.append("rect")
         .attr("width", widthCourt/2)
         .attr("height", heightCourt/5)
         .attr("x", 100)
         .attr("y", 308)
         .attr("fill", "white")
         .style("opacity", 0.2)
         .on("mouseover", handleMouseOver)
         .on("mouseout", handleMouseOut);

         //right corner 3
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

            //midrange left
        vis.svg.append("rect")
          .attr("width", widthCourt/4)
          .attr("height", heightCourt/5)
          .attr("x", 0)
          .attr("y", 228)
          .attr("fill", "white")
          .style("opacity", 0.2)
          .on("mouseover", handleMouseOver)
          .on("mouseout", handleMouseOut);

             //in the paint
       vis.svg.append("rect")
          .attr("width", widthCourt/2)
          .attr("height", heightCourt/3)
          .attr("x", 100)
          .attr("y", 168)
          .attr("fill", "white")
          .style("opacity", 0.2)
          .on("mouseover", handleMouseOver)
          .on("mouseout", handleMouseOut);

              //midrange right
       vis.svg.append("rect")
        .attr("width", widthCourt/4)
        .attr("height", heightCourt/5)
          .attr("x", 300)
          .attr("y", 228)
          .attr("fill", "white")
        .style("opacity", 0.2)
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut);

                //third layer of blocks

                // left far
        vis.svg.append("rect")
           .attr("width", widthCourt/4)
           .attr("height", heightCourt/2.5)
           .attr("x", 0)
           .attr("y", 68)
           .attr("fill", "white")
           .style("opacity", 0.2)
           .on("mouseover", handleMouseOver)
           .on("mouseout", handleMouseOut);

                 //top center
       vis.svg.append("rect")
          .attr("width", widthCourt/2)
          .attr("height", heightCourt/4)
          .attr("x", 100)
          .attr("y", 68)
          .attr("fill", "white")
          .style("opacity", 0.2)
          .on("mouseover", handleMouseOver)
          .on("mouseout", handleMouseOut);

                //right far
      vis.svg.append("rect")
        .attr("width", widthCourt/4)
        .attr("height", heightCourt/2.5)
        .attr("x", 300)
        .attr("y", 68)
        .attr("fill", "white")
        .style("opacity", 0.2)
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut);

        //add text to correct areas
      vis.svg.append("text")
        //.data(vis.data)
        //.enter().append("text")
        .attr("x", 0)
        .attr("y", 420)
        .attr("fill", "black");

      console.log("here");
      console.log(vis.data);

      var xLocationScale = d3.scaleLinear()
        .domain([-250, 250])
        .range([0, vis.width]);

      var yLocationScale = d3.scaleLinear()
        .domain([-50, 500])
        .range([0, vis.height]);

      var shotPoint = vis.svg.selectAll(".shot-point")
        .data(vis.data);

      shotPoint.enter().append("circle")
        .merge(shotPoint)
        .attr("class", "shot-point")
        .attr('cx', function(d, i) {
          // console.log(d.LOC_X);
          return xLocationScale(parseFloat(d.LOC_X));
        })
        .attr('cy', function(d, i) {
          return vis.height - yLocationScale(parseFloat(d.LOC_Y));
        })
        .attr("r", 2)
        .style("fill", "black");

      shotPoint.exit().remove();

      function handleMouseOver(d, i) {
        d3.select(this).attr("r", 10).style("fill", "lightblue").style("opacity",0.7);
        vis.svg.append("text")
          .attr("x", 10)
          .attr("y", 420)
          .attr("fill", "black")
          .text(function(d,i) {
            console.log(vis.data.areas[i])
          
            //return area depending on which is highlighted -> get coordinates
            return "Accuracy: " + vis.data.areas[i];
          });

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
    .style("fill", "red")


  categories.exit().remove();




}
