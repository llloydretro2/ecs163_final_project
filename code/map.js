// title dimension
let mapLeft = (1/5) * width, mapTop = (4/5) * height;
// Assuming 'width' and 'height' are defined somewhere in your code
let mapMargin = {top: 10, right: 30, bottom: 30, left: 60},
    mapWidth = width - mapMargin.left - mapMargin.right,
    mapHeight = height - mapMargin.top - mapMargin.bottom;

// Setting up the svg element for D3 to draw in
map = d3.select("#svg2")
  .attr("width", width)
  .attr("height", height)

// A projection tells D3 how to orient the GeoJSON features
let usaProjection = d3.geoAlbersUsa()
  .scale(1100)
  .translate([width/3*2, height/2])


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

graphTitle = map.append("text")
    .attr("x", width / 3*2)
    .attr("y", height/7)
    .attr("text-anchor", "middle")
    .style("font-size", "24px")
    .attr("class", "map-title")
    .attr("font-family", "serif")
    .text("Interactive Map of Charging Station Counts in the USA");

description = map.append("text")
  .attr("x", width/5)
  .attr("y", height/3)
  .attr("font-size", "36px")
  .attr("class", "map-title")
  .attr("text-anchor", "middle")
  .text("Number of EV Charging Station in All States.")
  .attr("font-family", "serif")

description.append("tspan")
  .attr("x", width/5)
  .attr("dy", "2em")
  .attr("font-size", "24px")
  .text("The number of charging stations of USA in 2024 Feb.")

description.append("tspan")
  .attr("x", width/5)
  .attr("dy", "2em")
  .attr("font-size", "24px")
  .text("California has the most charging stations, 18501.")

description.append("tspan")
  .attr("x", width/5)
  .attr("dy", "2em")
  .attr("font-size", "24px")
  .text("Alaska has the least charging stations, 70.")


d3.csv('../data/processed_data/general/state_counts_sorted.csv').then(data => {

  let statesArray = [];
  let stationCountByState = {};

  data.forEach(d => {
      stationCountByState[d.state] = +d.number;
      statesArray.push(d.state)
  });

  let colorScale = d3.scaleSequential(d3.interpolateBlues)
      .domain(d3.extent(data, d => +d.number)); // Use the extent of station numbers for domain
  
  const legendWidth = 300, legendHeight = 20, legendMargin = {top: 20, right: 20, bottom: 20, left: 20};

  // Create a legend container
  let legend = map.append("g")
    .attr("class", "color-legend")
    .attr("transform", `translate(${width /3*2}, ${height/8*7})`);

  // Create a gradient for the legend
  const gradient = legend.append("defs")
    .append("linearGradient")
    .attr("id", "gradient")
    .attr("x1", "0%")
    .attr("x2", "100%")
    .attr("y1", "0%")
    .attr("y2", "0%");

  colorScale.ticks().forEach((t, i, n) => {
    gradient.append("stop")
      .attr("offset", `${(i/n.length) * 100}%`)
      .attr("stop-color", colorScale(t));
  });

  // Add the gradient bar
  legend.append("rect")
    .attr("width", legendWidth)
    .attr("height", legendHeight)
    .style("fill", "url(#gradient)");

  // Add legend labels
  legend.append("text")
    .attr("class", "legend-text")
    .attr("x", 0)
    .attr("class", "map-title")
    .attr("y", legendHeight + legendMargin.bottom)
    .text(d3.min(colorScale.domain()));

  legend.append("text")
    .attr("class", "legend-text")
    .attr("x", legendWidth)
    .attr("class", "map-title")
    .attr("y", legendHeight + legendMargin.bottom)
    .attr("text-anchor", "end")
    .text(d3.max(colorScale.domain()));

    const smallStates = ["RI", "DE"];
    const textOffset = 50;

  d3.json(geoJsonUrl).then(geojson => {
    map.selectAll("path")
          .data(geojson.features)
          .enter()
          .append("path")
          .attr("d", pathGenerator)
          .attr("stroke", "grey")
          .attr("fill", d => {
              let count = stationCountByState[d.id];
              return count ? colorScale(count) : "white";
          })
          .on("click", function(event, d) {
        
            map.select("text:not(.map-title)").remove();
            map.selectAll("path")
              .attr("stroke-width", 1)
              .attr("stroke", "gray")
            
            d3.select(this)
            .attr("stroke-width", 3) // Increase stroke width to highlight
            .attr("stroke", "red");

              // Append new text element at the mouse position
            mapText = map.append("text")
                .attr("fill", "black")
                .style("font-size", "16px")
                .attr("font-family", "serif")
                .style("pointer-events", "none")
                
            mapText.append("tspan")
              .attr("x", width/2)
              .attr("y", height/8*7)
                .text('State: ' + statesArray[d])
            
            mapText.append("tspan")
                .attr("x", width/2)
                .attr("y", height/8*7 + 20)
                .text('Number: ' + stationCountByState[statesArray[d]])
        });
        
        map.selectAll(".state-name")
          .data(geojson.features.filter(d => !smallStates.includes(d.id)))
          .enter()
          .append("text")
          .attr("class", "map-title")
          .attr("font-family", "serif")
          .attr("transform", function(d) {
            let centroid = pathGenerator.centroid(d);
            if (d.id === "LA") {
                centroid[0] -= 10;
            }
            if (d.id === "HI") {
              centroid[0] += 10;
              centroid[1] += 10;
            }
            if (d.id === "FL") {
              centroid[0] += 10;
            }
            return `translate(${centroid})`;
        })
          .attr("text-anchor", "middle")
          .attr("alignment-baseline", "middle")
          .style("font-size", "10px")
          .style("fill", "orange")
          .text(d => d.id);

        geojson.features.forEach(feature => {
          if (smallStates.includes(feature.id)) { // Adjust the condition based on your needs
            const centroid = pathGenerator.centroid(feature);
      
            // Calculate text position; this is a simplistic approach
            const textPosition = [centroid[0] + textOffset, centroid[1]];
      
            // Draw line from centroid to text position
            map.append("line")
              .attr("x1", centroid[0])
              .attr("y1", centroid[1])
              .attr("x2", textPosition[0])
              .attr("y2", textPosition[1])
              .attr("stroke", "black")
              .style("stroke-dasharray", ("3, 3"));
      
            // Add text at textPosition
            map.append("text")
              .attr("x", textPosition[0]+ 2)
              .attr("y", textPosition[1]+2)
              .attr("class", "map-title")
              .attr("text-anchor", "start")
              .style("font-size", "8px")
              .style("fill", "orange")
              .text(feature.id);
          }
        });
  });
});
