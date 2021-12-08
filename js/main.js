var courtSvg;

var widthCourt = 500;
var heightCourt = 500;
var court;

allData = [];
var playerArray = ["LeBron James", "Kyrie Irving", "Stephen Curry", "Kevin Durant"];



$.getJSON("data/playerdata1.json", function (jsonData) {

  console.log(jsonData)

  // const filtered = jsonData.filter(function(player){
  //   return player.full_name == "LeBron James"
  // })
  // console.log(filtered)
  const searchBar = document.getElementById('searchBar');


  searchBar.addEventListener('keyup', (e) => {
    console.log(e.target.value)
    const searchString = e.target.value;

    const filteredPlayers = jsonData.filter((player) => {

      return (
        player.full_name.includes(searchString)

      );
    });
    console.log(filteredPlayers);

    const playersSlice = filteredPlayers.slice(0, 12);

    displayResults(playersSlice);
  });

});
// const displayResults = (players) => {
//   const htmlString = players
//       .map((players) => {
//           return `
//           <li class="player">
//               <h2>${players.full_name}</h2>
//           </li>
//       `;
//       })
//       .join('');
//   playerList.innerHTML = htmlString;
// };
const displayResults = (players) => {
  const htmlString = players
    .map((players) => {
      return `
          <li class="player">
              <button type="button" id="${players.first_name}_${players.last_name}" onclick="search(this)">${players.full_name}</button>
          </li>
      `;
    }
    )
    .join('');
 
  playerList.innerHTML = htmlString;
};
var playerHelper = []

var search = function(player) {
  if (playerHelper[0] != undefined){
    playerHelper[0].style.backgroundColor = "#eaeaea";
    playerHelper[0] = player
  } else {
    playerHelper[0] = player
  }

  loadData(player.id, player.innerHTML)
  player.style.backgroundColor = "yellow";
};


function loadData(playerId, playerName) {

  // if (/\s/.test(playerInput)) {
  //
  // }

  //manually call player json file from specific year
  //d3.json("data/player_data/" + playerfirstInput + "_" + playerlastInput + ".json").then(function(jsonData1) {
  let fileName = playerId;
  document.getElementById('playerHeading').innerHTML = playerName+ " | 2020-21";

  d3.json("data/player_data/" + fileName + ".json").then(function (jsonData) {
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
  // document.getElementById('courtTooltipClearText').innerHTML = " i ";
  // document.getElementById('courtTooltipClearText').innerHTML = " i ";
  document.getElementById('courtLegend').innerHTML = "This chart displays a player's shot map. Each black dot is a made shot; and each red dot is a missed shot.";
  document.getElementById('distanceLegend').innerHTML = "This chart displays a player's shot accuracy the further they get from the hoop.";

  // document.getElementById('courtTooltipText').innerHTML = "This chart displays a player's shots. Each dot is a made shot. " +
  // "The darker squares represent higher accuracy zones, and the lighter ones lower accuracy.";
  // document.getElementById('courtTooltipText').innerHTML = "This chart displays a player's shots. Each dot is a made shot and each red dot is a missed shot.";

  document.getElementById('lineGraphTitle').innerHTML = "Accuracy (%) v. Distance from Hoop (ft)";
  // document.getElementById('lineTooltipClearText').innerHTML = " i ";
  // document.getElementById('lineTooltipText').innerHTML = "This chart displays a player's shot accuracy the further they get from the hoop."

  document.getElementById('pieChartTitle').innerHTML = "Field Goal Percentage from 2-Point and 3-Point Range";
  // document.getElementById('pieTooltipClearText').innerHTML = " i ";
  // document.getElementById('pieTooltipText').innerHTML = "These pie charts represent the differences in 2-pointers and 3-pointers taken." +
  //   "The blue slices represent the portion of shots made and the red slices the portion of shots missed.";


  ///Instantiate visualization objects here
  court = new CourtChart("court-area", shotData);

  distanceChart = new DistanceChart("distance-chart-area", shotData);

  shotPieChart = new ShotPieChart("shot-pie-chart-area", shotData);

}

// function searchFunc() {
//   //player names array load from json
//   d3.json("data/playerdata1.json").then(function (jsonData) {
//     //console.log(jsonData);

//     var listElements = document.getElementById('playerList');

//     var li;
//     var ul;
//     playerVal = document.getElementById('playerHeading').innerHTML;
//     playerfirstInput = document.getElementById('playerfirstSearch').value;
//     playerlastInput = document.getElementById('playerlastSearch').value;






//     var node = document.createElement("li");
//     var textNode = document.createTextNode(playerfirstInput + " " + playerlastInput);
//     node.appendChild(textNode);

//     for (var i = 0; i < jsonData.length; i++) {
//       if (jsonData[i].last_name == (playerlastInput) && (jsonData[i].first_name == (playerfirstInput))) {
//         document.getElementById('playerHeading').innerHTML = playerfirstInput + " " + playerlastInput + " | 2021-22";
//         loadData(playerfirstInput, playerlastInput);

//       }
//     }

//   })

// }
function toolTip() {
  var element = document.getElementById('chartTitle');

}
