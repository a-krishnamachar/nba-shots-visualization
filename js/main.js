var courtSvg;

var widthCourt = 400;
var heightCourt = 400;
var court;

allData = [0,0,0,0,0];


function createVis() {

    ///Instantiate visualization objects here
    console.log("help");
    court = new CourtChart("court-area",allData);

}

createVis();

// function loadChart() {
//   //console.log(data);
//
// //https://stackoverflow.com/questions/28443229/using-d3-to-fill-an-svg-with-a-background-image
//
//   var courtBackgroundURL = "data/court.jpg";
//         courtSvg.append("svg:defs")
//         .append("svg:pattern")
//         .attr("id", "court-background")
//         .attr('patternUnits', 'userSpaceOnUse')
//         .attr("width", widthCourt)
//         .attr("height", heightCourt)
//         .append("svg:image")
//         .attr("id","image-url")
//         .attr("xlink:href", courtBackgroundURL)
//         .attr("width", widthCourt)
//         .attr("height", heightCourt);
//
//         courtSvg.append("rect")
//           .attr("width", widthCourt)
//           .attr("height", heightCourt)
//           .attr("x", "0")
//           .attr("y", "0")
//
//           .attr("fill", "url(#court-background)");
//
//       d3.selectAll('dot').remove();
//
//
//        //var points = svg.selectAll("dot").data(playerData)
//        //.enter()
//
//        //(0,0) in our svg is at the top left
//        //(0,0) in the NBA api is at the center of the hoop => (200,340)
//        //x+200, y+340
//
//        courtSvg.append("circle")
//        .attr("r", 4)
//        .attr("cx", 200)
//        .attr("cy",340)
//
// }

// loadChart();
