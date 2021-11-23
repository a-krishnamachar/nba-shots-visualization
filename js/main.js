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

    //create court title + other
    document.getElementById('courtTitle').innerHTML = "Court Shot Distribution + Heatmap";
    document.getElementById('courtTooltipClearText').innerHTML = " i ";
    document.getElementById('courtTooltipText').innerHTML = "This chart displays a player's shots." +
    " Black = scored; red = missed.";

    document.getElementById('lineGraphTitle').innerHTML = "Accuracy (%) v. Distance from Hoop (ft)";
    document.getElementById('lineTooltipClearText').innerHTML = " i ";
    document.getElementById('lineTooltipText').innerHTML = "This chart displays a player's shot accuracy the further they get from the hoop."
    ///Instantiate visualization objects here
    court = new CourtChart("court-area",shotData);

    distanceChart = new DistanceChart("distance-chart-area", shotData);

}

function searchFunc() {
  //player names array load from json
  d3.json("data/playerdata1.json").then(function(jsonData) {
  //console.log(jsonData);

  var listElements = document.getElementById('playerList');

  var li;
  var ul;
  playerVal = document.getElementById('playerHeading').innerHTML;
  playerfirstInput = document.getElementById('playerfirstSearch').value;
  playerlastInput = document.getElementById('playerlastSearch').value;

  var node = document.createElement("li");
  var textNode = document.createTextNode(playerfirstInput + " " + playerlastInput);
  node.appendChild(textNode);

  for (var i=0; i<jsonData.length; i++) {
    if (jsonData[i].last_name == (playerlastInput) && (jsonData[i].first_name == (playerfirstInput))) {
      document.getElementById('playerHeading').innerHTML = playerfirstInput + " " + playerlastInput + " | 2021-22";
      loadData(playerfirstInput, playerlastInput);

    }
  }

})

}
function toolTip() {
  var element = document.getElementById('chartTitle');

}
