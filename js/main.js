var courtSvg;

var widthCourt = 400;
var heightCourt = 400;
var court;

allData = [];

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
