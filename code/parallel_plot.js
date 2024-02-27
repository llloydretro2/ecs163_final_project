// Dimensions for Parallel Plot
let parallelLeft = (1/5) * width, parallelTop = (1/5) * height;
let parallelMargin = {top: 10, right: 30, bottom: 30, left: 60},
    parallelWidth = (1/2) * width - parallelMargin.left - parallelMargin.right,
    parallelHeight = (1/2) * height - parallelMargin.top - parallelMargin.bottom;

let svg3 = d3.select("#svg3");

function processParallelData(rawData) {
    let processedData = [];
    rawData.forEach(d => {
        if (!(d["FastCharge_KmH"] === "-")) {
            processedData.push(d);
        }
    });
    return processedData;
}

d3.csv("../data/processed_data/general/Electric_Vehicle_Specification_Data.csv").then(rawData =>{

    let processedData = processParallelData(rawData);

    const g1 = svg3.append("g")
                .attr("width", parallelWidth + parallelMargin.left + parallelMargin.right)
                .attr("height", parallelHeight + parallelMargin.top + parallelMargin.bottom)
                .attr("transform", `translate(${parallelMargin.left}, ${height - (parallelHeight + parallelMargin.top + parallelMargin.bottom)})`);

    // For the parallel plot, we only care about these attributes
    let dimensions = ["AccelSec","TopSpeed_KmH", "Range_Km", "Efficiency_WhKm", "FastCharge_KmH", "Seats", "PriceDollar"];

    // store y objects
    const y = {};
    for (let i in dimensions) {
        let name = dimensions[i];
        y[name] = d3.scaleLinear()
        .domain( d3.extent(processedData, function(d) { return +d[name]; }))
        .range([parallelHeight, 0]);
    }

    // Build the X scale -> it find the best position for each Y axis
    const x = d3.scalePoint()
        .range([0, parallelWidth])
        .padding(1)
        .domain(dimensions);

    function path(d) {
        return d3.line()(dimensions.map(function(p) { return [x(p), y[p](d[p])]; }));
    }
        

    // Draw paths
    g1.selectAll("myPath")
        .data(processedData)
        .join("path")
        .attr("class", function (d) { return "line " + d.Model } )
        .attr("d",  path)
        .style("fill", "none")
        .style("stroke", "#69b3a2")
        .style("opacity", 1)

    // Draw the axis:
    g1.selectAll("myAxis")
        // For each dimension of the dataset I add a 'g' element:
        .data(dimensions).enter()
        .append("g")
        // I translate this element to its right position on the x axis
        .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
        // And I build the axis with the call function
        .each(function(d) { d3.select(this).call(d3.axisLeft().scale(y[d])); })
        // Add axis title
        .append("text")
            .style("text-anchor", "middle")
            .attr("y", -9)
            .text(function(d) { return d; })
            .style("fill", "black")

}).catch(function(error){
    console.log(error);
});
