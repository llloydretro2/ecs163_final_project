// title dimension
let mapLeft = (1/5) * width, mapTop = (4/5) * height;
// Assuming 'width' and 'height' are defined somewhere in your code
let mapMargin = {top: 10, right: 30, bottom: 30, left: 60},
    mapWidth = width - mapMargin.left - mapMargin.right,
    mapHeight = height - mapMargin.top - mapMargin.bottom;

// Load the TopoJSON data asynchronously
// d3.json('https://d3js.org/us-10m.v2.json').then(function(us) {
//     // Now 'us' is available and can be used
//     let data = topojson.feature(us, us.objects.states).features;

//     // Continue with your map drawing logic here, using 'data'
//     // For example, appending paths for each state feature to the SVG
//     const svg = d3.select("#svg2")

//     const projection = d3.geoAlbersUsa()
//         .translate([mapWidth / 2, mapHeight / 2])
//         .scale([mapWidth]); // Adjust scale according to your needs

//     const path = d3.geoPath()
//         .projection(projection);

//     svg.selectAll("path")
//         .data(data)
//         .enter().append("path")
//         .attr("d", path)
//         .attr("fill", "#ccc")
//         .attr("stroke", "#333")
//         .attr("stroke-width", "0.5");
// }).catch(function(error) {
//     console.log(error);
// });

// Setting up the svg element for D3 to draw in

map = d3.select("#svg2")
    .attr("width", width)
    .attr("height", height)

// A projection tells D3 how to orient the GeoJSON features
let usaProjection = d3.geoAlbersUsa()
  .scale(1000)
  .translate([width/2, height/2])
let europeProjection = d3.geoMercator()
  .center([ 13, 52 ])
  .scale([ width / 1.5 ])
  .translate([ width / 2, height / 2 ])

// The path generator uses the projection to convert the GeoJSON
// geometry to a set of coordinates that D3 can understand
let pathGenerator = null

// URL to the GeoJSON itself
let geoJsonUrl = ''

let usa = true // Change to false to render Europe instead

if (usa) {
  pathGenerator = d3.geoPath().projection(usaProjection)
  geoJsonUrl = "https://gist.githubusercontent.com/spiker830/e0d1b7950ced31369c903bed0cead7b1/raw/702c72e0ca5a1be95f84a50a58cfa6d4d6400f3f/us_features.json"
} else {
  pathGenerator = d3.geoPath().projection(europeProjection)
  geoJsonUrl = "https://gist.githubusercontent.com/spiker830/3eab0cb407031bf9f2286f98b9d0558a/raw/7edae936285e77be675366550e20f9166bed0ed5/europe_features.json"
}


d3.csv('../data/processed_data/general/state_counts_sorted.csv').then(data => {

  let statesArray = [];
  let stationCountByState = {};

  data.forEach(d => {
      stationCountByState[d.state] = +d.number;
      statesArray.push(d.state)
  });

  console.log(stationCountByState)
  console.log(statesArray)

  let colorScale = d3.scaleSequential(d3.interpolateBlues)
      .domain(d3.extent(data, d => +d.number)); // Use the extent of station numbers for domain

  d3.json(geoJsonUrl).then(geojson => {
    map.selectAll("path")
          .data(geojson.features)
          .enter()
          .append("path")
          .attr("d", pathGenerator)
          .attr("stroke", "grey")
          .attr("fill", d => {
              let count = stationCountByState[d.id];
              return count ? colorScale(count) : "white"; // Default to white if no data
          })
          .on("click", function(event, d) {
            
            // let stateName = d.properties.id;
            console.log(statesArray[d])
            console.log(stationCountByState[statesArray[d]])


            map.select("text").remove();

              // Append new text element at the mouse position
            map.append("text")
                .attr("x", 50)
                .attr("y", 100)
                .attr("class", "info-text") // Add a class for styling if needed
                .text('number: ' + stationCountByState[statesArray[d]])
                .attr("fill", "black") // Set the text color
                .style("font-size", "16px")
                .style("pointer-events", "none");
            
        });
  });
});
