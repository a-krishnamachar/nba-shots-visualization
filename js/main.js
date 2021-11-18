var courtSvg;

var widthCourt = 400;
var heightCourt = 400;
var court;

allData = [];
var playerArray = ["LeBron James", "Kyrie Irving", "Steph Curry", "Kevin Durant"];

loadData();

function loadData() {
  d3.csv("sample_lebrondata.csv").then(function(csvData){
    d3.json("data/sample1.json").then(function(jsonData) {
      shotData = csvData;
      regionData = jsonData;
      courtVis();

    })

  });
}

function courtVis() {

    ///Instantiate visualization objects here
    console.log("help");
    court = new CourtChart("court-area",shotData,regionData);
    distanceChart = new DistanceChart("distance-chart-area", shotData);

}

function searchFunc() {
  //sample player names array -- this will have ALL past allstars from 5/10 years
  var li;
  var ul;
  input = document.getElementById('playerSearch').value;
  var node = document.createElement("li");
  var textNode = document.createTextNode(input);
  node.appendChild(textNode);
  console.log(input);
  // for (var i=0; playerArray.length; i++) {
  if(playerArray.includes(input)) {
      console.log('success');
      // if(document.getElementById('playerList').contains(input)) {
      //   console.log('already added');
      // }
      document.getElementById('playerList').appendChild(node);
  }


  // }

}
