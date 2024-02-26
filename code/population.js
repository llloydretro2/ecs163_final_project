// Overall dimension of the canvas
const width = window.innerWidth;
const height = window.innerHeight;

// Dimensions for Stream Graph
let streamLeft = (1/5) * width, streamTop = (1/5) * height;
let streamMargin = {top: 10, right: 30, bottom: 30, left: 60},
    streamWidth = (1/2) * width - streamMargin.left - streamMargin.right,
    streamHeight = (1/2) * height - streamMargin.top - streamMargin.bottom;

// Dimensions for Pie Chart
let pieLeft = (1/5) * width, pieTop = (1/5) * height;
let pieMargin = {top: 10, right: 30, bottom: 30, left: 60},
    pieWidth = (1/2) * width - pieMargin.left - pieMargin.right,
    pieHeight = height - pieMargin.top - pieMargin.bottom;

// Initialize variables
let allMakes = [],
    allCities = [];
let carInfo = [],
    countyInfo = {},
    overallCarCount = {};

// Preliminary data processing
function processDataOne(rawData) {
    // Record all car makes
    let allMakes = [];
    // Record all Cities
    let allCities = [];
    // Process the data and convert ordinal numbers to number type
    rawData.forEach(d => {
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
    let carInfo = {};
    let countyInfo = {};
    let overallCarCount = {};

    data.forEach(d => {
        if (!carInfo[d.Make]) {
            carInfo[d.Make] = {};
        }
        if (!carInfo[d.Make][d.Model_Year]) {
            carInfo[d.Make][d.Model_Year] = 0;
        }
        carInfo[d.Make][d.Model_Year]++;
        if (!countyInfo[d.County]) {
            countyInfo[d.County] = 1;
        } else {
            countyInfo[d.County]++;
        }

        // Increment overall car count for the brand from 2018
        if (d.Model_Year >= 2018) {
            if (!overallCarCount[d.Make]) {
                overallCarCount[d.Make] = 1;
            } else {
                overallCarCount[d.Make]++;
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

    return [cumulativeCarInfo, countyInfo, overallCarCount];
}

// Call to process initial data
d3.csv("../data/processed_data/general/Electric_Vehicle_Population_Data.csv").then(rawData => {
    // Initialize variables
    let allMakes = [],
        allCities = [];
    let carInfo = [],
        countyInfo = {},
        overallCarCount = {};
    // Proess data
    [allMakes, allCities, rawData] = processDataOne(rawData);
    [carInfo, countyInfo, overallCarCount] = processDataTwo(rawData);

});

d3.csv("../data/processed_data/general/Electric_Vehicle_Population_Count.csv").then(rawData => {
// d3.csv("../data/unprocessed_data/Electric_Vehicle_Population_Count.csv").then(rawData => {  
    const carManufacturers = rawData.columns.slice(1);
    // const carManufacturers = ['VOLVO', 'TESLA', 'AUDI', 'FORD', 'BMW', 'KIA', 'HYUNDAI', 'PORSCHE', 'CHEVROLET', 'NISSAN'];
    console.log(carManufacturers)
    // Select svg4 element using D3
    const svg = d3.select("#svg4");

    const g1 = svg.append("g")
                .attr("width", (1/2) * width)
                .attr("height", height)
                // .attr("transform", `translate(${streamLeft}, ${streamMargin.top})`);  

    // Add X axis
    var x = d3.scaleLinear()
        .domain(d3.extent(rawData, function(d) { return d.Model_Year; }))
        .range([ streamMargin.left, streamWidth ]);
    g1.append("g")
        .attr("transform", "translate(0," + streamHeight + ")")
        .call(d3.axisBottom(x).ticks(5));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([-4000, 4000])
        .range([streamHeight, streamMargin.top]);

    g1.append("g")
        .attr("transform", "translate(" + streamMargin.left + ",0)")
        .call(d3.axisLeft(y));

    // Define the range of colors you want to use
    var colorRange = [
        "#1f78b4", // VOLVO
        "#33a02c", // TESLA
        "#e31a1c", // AUDI
        "#ff7f00", // FORD
        "#6a3d9a", // BMW
        "#b15928", // KIA
        "#a6cee3", // HYUNDAI
        "#fdbf6f", // PORSCHE
        "#fb9a99", // CHEVROLET
        "#cab2d6"  // NISSAN
    ];

    // Create a color scale
    var color = d3.scaleOrdinal()
        .domain(carManufacturers)
        .range(colorRange);

    // stack the data
    var stackedData = d3.stack()
        .keys(carManufacturers)
        .offset(d3.stackOffsetSilhouette)(rawData.map(d => ({
        Model_Year: +d.Model_Year, // Convert to number
        ...d // Spread the rest of the object properties
    })));

    // Show the areas
    g1
        .selectAll("mylayers")
        .data(stackedData)
        .enter()
        .append("path")
            .style("fill", function(d) { return color(d.key); })
            .attr("d", d3.area()
            .x(function(d, i) { return x(d.data.Model_Year); })
            .y0(function(d) { return y(d[0]); })
            .y1(function(d) { return y(d[1]); })
    )       

});