var courtSvg;

var widthCourt = 400;
var heightCourt = 400;
var court;

allData = [];
var playerArray = ["LeBron James", "Kyrie Irving", "Steph Curry", "Kevin Durant"];


function loadData(playerInput, yearInput) {
  //manually call player json file from specific year
  //d3.json("data/" + playerInput + yearInput + ".json")
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

  var listElements = document.getElementById('playerList');
  //listElements.parentNode.removeChild(listElements);
  var li;
  var ul;
  playerVal = document.getElementById('playerHeading').innerHTML;
  playerInput = document.getElementById('playerSearch').value;
  yearInput = document.getElementById('yearSearch').value;

  var node = document.createElement("li");
  var textNode = document.createTextNode(playerInput + ", " + yearInput);
  node.appendChild(textNode);
  console.log(playerInput);

  if(playerArray.includes(playerInput)) {
      console.log('success');
      //document.getElementById('playerList').appendChild(node);
      document.getElementById('playerHeading').innerHTML = playerInput + ", " + yearInput;
      loadData(playerInput, yearInput);
  }

}
