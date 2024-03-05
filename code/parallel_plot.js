// Dimensions for Parallel Plot
let parallelLeft = (1/12) * width, parallelTop = (1/5) * height;
let parallelMargin = {top: 10, right: 30, bottom: 50, left: 30},
    parallelWidth = (11/12) * width - parallelMargin.left - parallelMargin.right,
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
                .attr("transform", `translate(${parallelLeft}, ${height - (parallelHeight + parallelMargin.top + parallelMargin.bottom)})`);

    // For the parallel plot, we only care about these attributes
    let dimensions = ["AccelSec","TopSpeed_KmH", "Range_Km", "Efficiency_WhKm", "FastCharge_KmH", "Seats", "PriceDollar"];
    let dimNames = ["Acceleration", "Top Speed (Km/Hr)", "Range (Km)", "Efficiency (Wh/Km)", "Fast Charge", "Number of Seats", "Price (in Dollars)"];
    let dimTitles = ["Acceleration (0 to 100Km/Hr time): ", "Top Speed (Km/Hr): ", "Range (Km): ", "Efficiency (Wh/Km): ", "Fast Charge: ", "Number of Seats: ", "Price (in Dollars): "]

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
        .style("opacity", 1);

    // Add a title to g1
    g1.append("text")
        .attr("x", parallelWidth / 2)
        .attr("y", -30)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text("Electric Vehicle Specifications");

    // Add text element to display selected name
    let selectedNameText = g1.append("text")
        .attr("x", parallelWidth / 2)
        .attr("y", parallelHeight + parallelMargin.bottom - 20)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("fill", "black");

    // Selection
    const lines = g1.selectAll("path");

    // Increases size of line that you are mousing over
    lines.on("mouseover", function(d) {
        // first every group turns grey
        d3.selectAll(".line")
            .transition().duration(200)
            .style("stroke", "lightgrey")
            .style("opacity", "0.2")

        // Second the hovered specie takes its color
        d3.select(this)
            .transition().duration(200)
            .style("stroke", "#69b3a2")
            .style("opacity", "1")
        
        
        selectedNameText.transition().duration(200).text("Selected Car: " + d.Brand + " " + d.Model);    

    });

    // Returns them to original size after done mousing over
    lines.on("mouseout", function(d) {
        d3.selectAll(".line")
            .transition().duration(200).delay(1000)
            .style("stroke", "#69b3a2")
            .style("opacity", "1")
        selectedNameText.transition().duration(200).delay(1000).text("");
    });

    // Draw the axis:
    g1.selectAll("myAxis")
        // For each dimension of the dataset I add a 'g' element:
        .data(dimensions).enter()
        .append("g")
        // I translate this element to its right position on the x axis
        .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
        // And I build the axis with the call function
        .each(function(d) { 
            if (d === "Seats") {
                d3.select(this).call(d3.axisLeft().scale(y[d]).ticks(4));
            } else {
                d3.select(this).call(d3.axisLeft().scale(y[d])); 
            }
        })
        // Add axis title
        .append("text")
            .style("text-anchor", "middle")
            .attr("y", -9)
            .text(function(d, i) { return dimNames[i]; })
            .style("fill", "black")

}).catch(function(error){
    console.log(error);
});
