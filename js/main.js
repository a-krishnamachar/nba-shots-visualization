var courtSvg;

var widthCourt = 500;
var heightCourt = 500;
var court;

allData = [];

$.getJSON("data/playerdata1.json", function (jsonData) {

  console.log(jsonData);

  const searchBar = document.getElementById('searchBar');

  //display updated names as user types
  searchBar.addEventListener('keyup', (e) => {
    console.log(e.target.value)
    const searchString = e.target.value;

    const filteredPlayers = jsonData.filter((player) => {

      return (
        player.full_name.includes(searchString)
      );
    });

    const playersSlice = filteredPlayers.slice(0, 12);

    displayResults(playersSlice);
  });
  //display sample names on click
  searchBar.addEventListener('click', (e) => {
    const searchString = e.target.value;
    const filteredPlayers = jsonData.filter((player) => {
    return (player.full_name.includes(searchString));
    });
    const playersSlice = filteredPlayers.slice(0, 12);
    displayResults(playersSlice);
  });

});

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

  loadData(player.id, player.innerHTML);
  player.style.backgroundColor = "#eb3bb9";
};


function loadData(playerId, playerName) {

  //manually call player json file from specific year
  let fileName = playerId;
  document.getElementById('playerHeading').innerHTML = playerName+ " | 2020-21";

  d3.json("data/player_data/" + fileName + ".json").then(function (jsonData) {
    shotData = jsonData;

    courtVis();
    loadPlayerCard(playerId, playerName);
    })
}

//create player card on popup
function loadPlayerCard(playerId, playerName) {
  let fileName = playerId;
  d3.json("data/player_background/" + fileName + ".json").then(function (backgroundData) {
    playerInfoData = backgroundData;
    console.log(playerInfoData);



    //document.getElementById('playerCard').innerHTML = "Player Information"
     document.getElementById('courtTooltipClearText').innerHTML = " Player Information ";
     document.getElementById('courtTooltipText').append
    // document.getElementById('lineTooltipText').innerHTML = "This chart displays a player's shot accuracy the further they get from the hoop."


  })
}

function courtVis() {

  //clear court so there aren't duplicates
  d3.selectAll("svg").remove();
  d3.selectAll("select").remove();
  d3.selectAll("input").remove();


  //create all graph titles
  document.getElementById('courtTitle').innerHTML = "Court Shot Distribution + Heatmap";

  document.getElementById('courtLegend').innerHTML = "This chart displays a player's shot map. Each black dot is a made shot; and each red dot is a missed shot.";
  document.getElementById('distanceLegend').innerHTML = "This chart displays a player's shot accuracy the further they get from the hoop.";

  document.getElementById('lineGraphTitle').innerHTML = "Accuracy (%) v. Distance from Hoop (ft)";
  // document.getElementById('lineTooltipClearText').innerHTML = " i ";
  // document.getElementById('lineTooltipText').innerHTML = "This chart displays a player's shot accuracy the further they get from the hoop."

  document.getElementById('pieChartTitle').innerHTML = "Field Goal % | 2-Pointers v 3-Pointers";
  // document.getElementById('pieTooltipClearText').innerHTML = " i ";
  // document.getElementById('pieTooltipText').innerHTML = "These pie charts represent the differences in 2-pointers and 3-pointers taken." +
  //   "The blue slices represent the portion of shots made and the red slices the portion of shots missed.";


  ///Instantiate visualization objects here
  court = new CourtChart("court-area", shotData);

  distanceChart = new DistanceChart("distance-chart-area", shotData);

  shotPieChart = new ShotPieChart("shot-pie-chart-area", shotData);

}


function toolTip() {
  var element = document.getElementById('chartTitle');

}
