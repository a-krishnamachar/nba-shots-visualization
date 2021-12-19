var courtSvg;

var widthCourt = 500;
var heightCourt = 500;
var court;

allData = [];

$.getJSON("data/playerdata1.json", function (jsonData) {

  // console.log(jsonData);
  const recPlayers = [{'id': 201939, 'full_name': 'Stephen Curry', 'first_name': 'Stephen', 'last_name': 'Curry', 'is_active': 'True'},{'id': 203081, 'full_name': 'Damian Lillard', 'first_name': 'Damian', 'last_name': 'Lillard', 'is_active': "True"},{'id': 203954, 'full_name': 'Joel Embiid', 'first_name': 'Joel', 'last_name': 'Embiid', 'is_active': 'True'},{'id': 2544, 'full_name': 'LeBron James', 'first_name': 'LeBron', 'last_name': 'James', 'is_active': 'True'},{'id': 1629130, 'full_name': 'Duncan Robinson', 'first_name': 'Duncan', 'last_name': 'Robinson', 'is_active': 'True'},{'id': 203497, 'full_name': 'Rudy Gobert', 'first_name': 'Rudy', 'last_name': 'Gobert', 'is_active': 'True'},{'id': 203507, 'full_name': 'Giannis Antetokounmpo', 'first_name': 'Giannis', 'last_name': 'Antetokounmpo', 'is_active': 'True'},{'id': 1629029, 'full_name': 'Luka Doncic', 'first_name': 'Luka', 'last_name': 'Doncic', 'is_active': 'True'},{'id': 101108, 'full_name': 'Chris Paul', 'first_name': 'Chris', 'last_name': 'Paul', 'is_active': 'True'},{'id': 202711, 'full_name': 'Bojan Bogdanovic', 'first_name': 'Bojan', 'last_name': 'Bogdanovic', 'is_active': 'True'},{'id': 1627732, 'full_name': 'Ben Simmons', 'first_name': 'Ben', 'last_name': 'Simmons', 'is_active': 'True'},{'id': 1627741, 'full_name': 'Buddy Hield', 'first_name': 'Buddy', 'last_name': 'Hield', 'is_active': 'True'}]

  const searchBar = document.getElementById('searchBar');

  //display updated names as user types
  

  displayResults(recPlayers);

  searchBar.addEventListener('keyup', (e) => {
    // console.log(e.target.value)

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
              <button type="button" id="${players.first_name}_${players.last_name}" onclick="search(this); autoScroll()">${players.full_name}</button>
          </li>
      `;
    }
    )
    .join('');

  playerList.innerHTML = htmlString;
};
var playerHelper = []

svg = d3.selectAll("#introtext")
console.log(svg)
svg.selectAll("#playerHeading").style("color", "#89CFF0");

var search = function(player) {
  if (playerHelper[0] != undefined){
    playerHelper[0].style.backgroundColor = "#eaeaea";
    playerHelper[0] = player
  } else {
    playerHelper[0] = player
  }

  loadData(player.id, player.innerHTML);
  player.style.backgroundColor = "#89CFF0";
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
    var infodata = playerInfoData.resultSets;
    // console.log(playerInfoData.resultSets);
    // console.log(infodata);
    // console.log(infodata.headers[1]);
    // console.log(infodata.rowSet[0][1]);

    //infodata.headers[0] information
    const arrayslots = [11, 12, 14, 19];

    var ul = document.getElementById('playerCard');
    for (var i=3; i<7; i++) {
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(infodata[1].headers[i] + ": " + infodata[1].rowSet[0][i]));
      ul.appendChild(li);
    }
    for (var j in arrayslots) {
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(infodata[0].headers[arrayslots[j]] + ": " + infodata[0].rowSet[0][arrayslots[j]]));
      ul.appendChild(li);
    }

    document.getElementById("playerCard").style.opacity = 1;


    //  document.getElementById('playerCardInfo').innerHTML = " Player asfa ";

  })
}

function courtVis() {

  //clear court so there aren't duplicates
  d3.selectAll("svg").remove();
  d3.selectAll("select").remove();
  d3.selectAll("#heatmap-checkbox").remove();
  d3.selectAll("#toggle-text").remove();
  // d3.selectAll("input").attr("type", "checkbox").remove();


  //create all graph titles
  document.getElementById('courtTitle').innerHTML = "Court Shot Distribution + Heatmap";
  document.getElementById('playerCard').innerHTML = " Player Stats (per game) ";

  document.getElementById('courtLegend').innerHTML = "This chart displays a player's shot map. Each black dot is a made shot; and each red dot is a missed shot."
  + " The heatmap shows shot accuracy at a specific quadrant.";
  document.getElementById('distanceLegend').innerHTML = "This chart displays a player's shot accuracy the further they get from the hoop.";

  document.getElementById('lineGraphTitle').innerHTML = "Accuracy (%) v. Distance from Hoop (ft)";
  // document.getElementById('lineTooltipClearText').innerHTML = " i ";
  // document.getElementById('lineTooltipText').innerHTML = "This chart displays a player's shot accuracy the further they get from the hoop."

  document.getElementById('pieChartTitle').innerHTML = "Field Goal % | 2-Pointers v 3-Pointers";
  // document.getElementById('pieTooltipClearText').innerHTML = " i ";
  // document.getElementById('pieTooltipText').innerHTML = "These pie charts represent the differences in 2-pointers and 3-pointers taken." +
  //   "The blue slices represent the portion of shots made and the red slices the portion of shots missed.";


  ///Instantiate visualization objects here
  first_load = true;
  heatmap_on = false;
  shots_displayed = "All Shots";
  console.log("here first load? " + first_load);
  console.log("here heatmap on? " + heatmap_on);
  console.log("here shots displayed: " + shots_displayed);
  console.log(shotData);
  court = new CourtChart("court-area", shotData, true, false, "All Shots");

  distanceChart = new DistanceChart("distance-chart-area", shotData);

  shotPieChart = new ShotPieChart("shot-pie-chart-area", shotData);

}


function toolTip() {
  var element = document.getElementById('chartTitle');

}
// function mouseover() {
//   document.getElementById("playerCard").style.opacity = 1;
//   document.getElementById("playerHeading").style.color = "#0756ab";
// }
// function mouseout() {
//   document.getElementById("playerCard").style.opacity = 0;
//   document.getElementById("playerHeading").style.color = "black";
//
// }

function autoScroll() {
  console.log("help!!")
    $('html, body').animate({
        scrollTop: $("#playerHeading").offset().top
    }, 500);
}
