// title dimension
let mapLeft = (1/5) * width, mapTop = (4/5) * height;
// Assuming 'width' and 'height' are defined somewhere in your code
let mapMargin = {top: 10, right: 30, bottom: 30, left: 60},
    mapWidth = width - mapMargin.left - mapMargin.right,
    mapHeight = height - mapMargin.top - mapMargin.bottom;

// Load the TopoJSON data asynchronously
d3.json('https://d3js.org/us-10m.v2.json').then(function(us) {
    // Now 'us' is available and can be used
    let data = topojson.feature(us, us.objects.states).features;

    // Continue with your map drawing logic here, using 'data'
    // For example, appending paths for each state feature to the SVG
    const svg = d3.select("#svg2")

    const projection = d3.geoAlbersUsa()
        .translate([mapWidth / 2, mapHeight / 2])
        .scale([mapWidth]); // Adjust scale according to your needs

    const path = d3.geoPath()
        .projection(projection);

    svg.selectAll("path")
        .data(data)
        .enter().append("path")
        .attr("d", path)
        .attr("fill", "#ccc")
        .attr("stroke", "#333")
        .attr("stroke-width", "0.5");
}).catch(function(error) {
    console.log(error);
});
