var courtSvg;

var widthCourt = 400;
var heightCourt = 400;
var court;

allData = [];
var playerArray = ["LeBron James", "Kyrie Irving", "Stephen Curry", "Kevin Durant"];


function loadData(playerfirstInput, playerlastInput) {

  // if (/\s/.test(playerInput)) {
  //
  // }

  //manually call player json file from specific year
  //d3.json("data/player_data/" + playerfirstInput + "_" + playerlastInput + ".json").then(function(jsonData1) {
  let fileName = playerfirstInput + "_" + playerlastInput;
  console.log(fileName);

  d3.json("data/player_data/" + fileName + ".json").then(function(jsonData) {
      shotData = jsonData;
      courtVis();
  })
  
  // d3.csv("sample_lebrondata.csv").then(function(jsonData1){
  //   d3.json("data/sample1.json").then(function(jsonData2) {
  //     shotData = jsonData1;
  //     regionData = jsonData2;
  //     courtVis();

  //   })

  // });
}

function courtVis() {

    //clear court so there aren't duplicates
    d3.selectAll("svg").remove();

    ///Instantiate visualization objects here
    court = new CourtChart("court-area",shotData);

    distanceChart = new DistanceChart("distance-chart-area", shotData);

}

function searchFunc() {
  //sample player names array -- this will have ALL past allstars from 5/10 years

  var listElements = document.getElementById('playerList');
  //listElements.parentNode.removeChild(listElements);
  var li;
  var ul;
  playerVal = document.getElementById('playerHeading').innerHTML;
  playerfirstInput = document.getElementById('playerSearch').value;
  playerlastInput = document.getElementById('yearSearch').value;

  var node = document.createElement("li");
  var textNode = document.createTextNode(playerfirstInput + " " + playerlastInput);
  node.appendChild(textNode);
  console.log(playerfirstInput);

  if(playerArray.includes(playerfirstInput + " " + playerlastInput)) {
      console.log('success');
      //document.getElementById('playerList').appendChild(node);
      document.getElementById('playerHeading').innerHTML = playerfirstInput + " " + playerlastInput;
      loadData(playerfirstInput, playerlastInput);
  }

}
