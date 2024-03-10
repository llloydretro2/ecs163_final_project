// Overall dimension of the canvas
const width = window.innerWidth;
const height = window.innerHeight;

// Dimensions for Stream Graph
let streamLeft = (3/7) * width, streamTop = (1/10) * height;
let streamMargin = {top: 10, right: 30, bottom: 30, left: 60},
    streamWidth = (1/2) * width - streamMargin.left - streamMargin.right,
    streamHeight = (2/5) * height - streamMargin.top - streamMargin.bottom;

// Dimensions for Pie Chart
let pieLeft = (5/7) * width, pieTop = (3/4) * height;
let pieMargin = {top: 10, right: 30, bottom: 30, left: 60},
    pieWidth = (1/2) * width - pieMargin.left - pieMargin.right,
    pieHeight = height - pieMargin.top - pieMargin.bottom;

// Location for Title Page
let titlePopLeft = (2/9) * width, titlePopTop = (1/3) * height, space = 50;

// Initialize variables
let allMakes = [],
    allCities = [];
let carInfo = [],
    countyInfo = {},
    overallCarCount = {};

let pieRadius = 0;

const carManufacturers = ['VOLVO', 'TESLA', 'AUDI', 'FORD', 'BMW', 'KIA', 'HYUNDAI', 'PORSCHE', 'CHEVROLET', 'NISSAN'];

var colorRange = [
    "#1f78b4", // VOLVO
    "#cc0000", // TESLA
    "#000000", // AUDI
    "#133A7C", // FORD
    "#009ADA", // BMW
    "#7E8083", // KIA
    "#BFBAAF", // HYUNDAI
    "#C29049", // PORSCHE
    "#F2D638", // CHEVROLET
    "#cab2d6"  // NISSAN
];

// Create a color scale
var color = d3.scaleOrdinal()
    .domain(carManufacturers)
    .range(colorRange);

// Preliminary data processing
function processDataOne(rawData) {
    // Record all car makes
    let allMakes = [];
    // Record all Cities
    let allCities = [];
    // Process the data and convert ordinal numbers to number type
    rawData.forEach(d => {;
        d.Make = String(d.Make)
        d.Model_Year = Number(d.Model_Year);
        d.Electric_Range = Number(d.Electric_Range);
        if (!(allMakes.includes(d.Make))) {
            allMakes.push(d.Make);
        }
        if (!(allCities.includes(d.City))) {
            allCities.push(d.City);
        }
    });
    // Drop Non-essential columns
    rawData.forEach(d => {
        delete d.Index;
        delete d.VIN;
        delete d.Postal_Code;
        delete d.DOL_Vehicle_ID;
        delete d.Vehicle_Location;
        delete d.Census_Tract;
    });

    return [allMakes, allCities, rawData];
}

// Final data processing
function processDataTwo(data) {

    data.forEach(d => {
        if (!carInfo[String(d.Make)]) {
            carInfo[String(d.Make)] = {};
        }
        if (!carInfo[String(d.Make)][Number(d.Model_Year)]) {
            carInfo[String(d.Make)][Number(d.Model_Year)] = 0;
        }
        carInfo[String(d.Make)][Number(d.Model_Year)]++;
        if (!countyInfo[d.County]) {
            countyInfo[d.County] = 1;
        } else {
            countyInfo[d.County]++;
        }

        // Increment overall car count for the brand from 2018
        if (d.Model_Year >= 2018) {
            if (!overallCarCount[String(d.Make)]) {
                overallCarCount[String(d.Make)] = 1;
            } else {
                overallCarCount[String(d.Make)]++;
            }
        }
    });

    // Function to calculate cumulative counts for each year from 2018 to 2024
    function calculateCumulativeCounts(data) {
        let cumulativeCounts = {};
        let cumulativeCount = 0;
        for (let year = 2018; year <= 2024; year++) {
            cumulativeCount += data[year] || 0;
            cumulativeCounts[year] = cumulativeCount;
        }
        return cumulativeCounts;
    }
    
    // Array to store results
    let cumulativeCarInfo = [];
    
    // Loop through the dataset
    for (const [brand, data] of Object.entries(carInfo)) {
        // Calculate cumulative counts for the brand from 2018 to 2024
        const cumulativeCounts = calculateCumulativeCounts(data);
        // Add the brand with its cumulative counts to the result array
        cumulativeCarInfo.push({ [brand]: cumulativeCounts });
    }

}

function drawPieChart() {
    let radius = Math.min(pieWidth, pieHeight) / 4;
    pieRadius = radius;
    let svg = d3.select("#svg4");
    let g2 = svg.append("g")
        .attr("transform", "translate(" + pieLeft + "," +  pieTop + ")");

    let processedData = {}
    for (let i = 0; i < carManufacturers.length; i ++) {
        processedData[carManufacturers[i]] = overallCarCount[carManufacturers[i]];
    }

    const pie = d3.pie()
        .value(function(d) {return d[1]})
    const data_ready = pie(Object.entries(processedData))
    var arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(radius)
    g2
        .selectAll('mySlices')
        .data(data_ready)
        .enter()
        .append('path')
          .attr('d', arcGenerator)
          .attr('fill', function(d){ return(color(d.data[0])) })
          .attr("stroke", "black")
          .style("stroke-width", "2px")
          .style("opacity", 0.7)

    g2
        .selectAll('mySlices')
        .data(data_ready)
        .join('text')
        .text(function(d){ return d.data[1]})
        .attr("transform", function(d) { return `translate(${d3.arc().innerRadius(0).outerRadius(radius * 1.5).centroid(d)})`})
        .style("text-anchor", "middle")
        .style("font-size", 16)

    // Add a title to g2
    g2.append("text")
        .attr("x", 0)
        .attr("y", -1 * radius - 20)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text("The Number of EVs Composition in Washington State");

}

// Call to process initial data
d3.csv("../data/processed_data/general/Electric_Vehicle_Population_Data.csv").then(rawData => {
    // Proess data
    [allMakes, allCities, rawData] = processDataOne(rawData);
    processDataTwo(rawData);

});

d3.csv("../data/processed_data/general/Electric_Vehicle_Population_Count.csv").then(rawData => {

    // Select svg4 element using D3
    const svg = d3.select("#svg4");

    const g1 = svg.append("g")
                .attr("width", (1/2) * width)
                .attr("height", height)
                .attr("transform", `translate(${streamLeft}, ${streamTop})`);  

    // Add X axis
    var x = d3.scaleLinear()
        .domain(d3.extent(rawData, function(d) { return Number(d.Model_Year); }))
        .range([ streamMargin.left, streamWidth ]);

    g1.append("g")
        .attr("transform", "translate(0," + streamHeight + ")")
        .call(d3.axisBottom(x).ticks(5))
        // Add axis title
        .append("text")
          .style("text-anchor", "middle")
          .attr("transform", `translate(${streamWidth + 40}, ${0})`)
          .attr("y", 10)
          .style("font-size", "12px")
          .text("Year")
          .style("fill", "black");
      

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 6000])
        .range([streamHeight, streamMargin.top]);

    g1.append("g")
        .attr("id", "y-axis")
        .attr("transform", "translate(" + streamMargin.left + ",0)")
        .call(d3.axisLeft(y))
        // Add axis title
        .append("text")
            .style("text-anchor", "middle")
            .attr("transform", `translate(${0}, ${0})`)
            .attr("y", -9)
            .style("font-size", "12px")
            .text("Number of Cars")
            .style("fill", "black");

    // stack the data
    var stackedData = d3.stack()
        .keys(carManufacturers)
        (rawData);

    // Show the areas
    g1
        .selectAll("mylayers")
        .data(stackedData)
        .enter()
        .append("path")
            .attr("class", function (d) { return "stacked-area" } )
            .style("fill", function(d) { return color(d.key); })
            .attr("d", d3.area()
            .x(function(d, i) { return x(d.data.Model_Year); })
            .y0(function(d) { return y(d[0]); })
            .y1(function(d) { return y(d[1]); })
    )   

    function updateToLine(data) {

        // Parse the data
        data.forEach(function(d) {
            d.Model_Year = parseInt(d.Model_Year);
            carManufacturers.forEach(function(key) {
                d[key] = +d[key];
            });
        });
    
        // Remove stacked area
        g1.selectAll(".stacked-area")
            .transition()
            .duration(1000)
            .style("opacity", 0);
        
        y.domain([0, 1100]);

        // Update the y-axis
        g1.select("#y-axis")
            .transition()
            .call(d3.axisLeft(y));

        // Add the line for each car manufacturer
        carManufacturers.forEach(function(key) {
            g1.append("path")
                .datum(data)
                .attr("class", "line")
                .attr("fill", "none")
                .attr("stroke", color(key))
                .attr("stroke-width", 1.5)
                .attr("d", d3.line()
                    .x(function(d) { return x(d.Model_Year); })
                    .y(function(d) { return y(d[key]); })
                )
                .style("opacity", "0");
        });
        
        g1.selectAll(".line")
            .transition()
            .duration(2000)
            .style("opacity", 1);
    }

    function updateToStack() {

        // Remove lines
        g1.selectAll(".line")
            .transition()
            .duration(1000)
            .style("opacity", 0)
            .remove();

        // Restore stacked area
        g1.selectAll(".stacked-area")
            .transition()
            .duration(2000)
            .style("opacity", 1);
        
        y.domain([0, 6000]);

        // Update the y-axis
        g1.select("#y-axis")
            .transition()
            .call(d3.axisLeft(y));

    }

    const options = ["Stack", "Line"];
    const option_button = g1.append("foreignObject")
        .attr("width", 100)
        .attr("height", 40)
        .attr("x", streamWidth + 10)
        .attr("y", 40)
        .append("xhtml:select")
        .attr("id", "mySelect")

    option_button.selectAll("option")
        .data(options)
        .enter().append("option")
        .text(function (d) { return d; })
        .attr("value", function (d) { return d; })

    d3.select("#mySelect").on("change", function(d) {
        var selected = d3.select(this).node().value;

        if(selected === "Line") {
            updateToLine(rawData);
        } else {
            updateToStack();
        }
    })       

    // Add a title to g1
    g1.append("text")
        .attr("x", streamWidth / 2)
        .attr("y", -20)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text("The Number of EVs in Washington State");
})

d3.csv("../data/processed_data/general/Electric_Vehicle_Population_Data.csv").then(rawData => {

    drawPieChart();

    const svg = d3.select("#svg4");
    // Add a legend to the side of the parallel coordinates plot
    const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${width - 200}, ${pieTop - pieRadius})`);

    const legendRectSize = 26;
    const legendSpacing = 4;

    // Create legend items
    const legendItems = legend.selectAll(".legend-item")
        .data(carManufacturers)
        .enter()
        .append("g")
        .attr("class", "legend-item")
        .attr("transform", function (d, i) { return `translate(0, ${i * (legendRectSize + legendSpacing)})`; });

    // Append rectangles to the legend items
    legendItems.append("rect")
        .attr("width", legendRectSize)
        .attr("height", legendRectSize)
        .style("fill", function (d) { return color(d); });

    // Append text to the legend items
    legendItems.append("text")
        .attr("x", legendRectSize + legendSpacing)
        .attr("y", legendRectSize - legendSpacing)
        .text(function (d) { return d; })
        .style("font-size", 16);

    // Create Title Page
    svg.append("text")
        .attr("x", titlePopLeft)
        .attr("y", titlePopTop)
        .attr("text-anchor", "middle")
        .attr("font-family", "serif")
        .style("font-size", "36px")
        .style("font-weight", "bold")
        .text("EV Populations in Washington State");

    svg.append("text")
        .attr("x", titlePopLeft)
        .attr("y", titlePopTop + space) 
        .attr("text-anchor", "middle")
        .attr("font-family", "serif")
        .style("font-size", "24px")
        .text("The entire EV population soared in 2021 in the state of Washington.");

    // Add another line of text
    svg.append("text")
        .attr("x", titlePopLeft)
        .attr("y", titlePopTop + space * 2)
        .attr("text-anchor", "middle")
        .attr("font-family", "serif")
        .style("font-size", "24px")
        .text("Volvo surpassed Tesla in 2022 in terms of EV number.");

    // Add another line of text
    svg.append("text")
        .attr("x", titlePopLeft)
        .attr("y", titlePopTop + space * 3)
        .attr("text-anchor", "middle")
        .attr("font-family", "serif")
        .style("font-size", "24px")
        .text("Audi and Tesla reached a similar number of EVs in the year 2024.");       

})
