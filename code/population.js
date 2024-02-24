// Overall dimension of the canvas
const width = window.innerWidth;
const height = window.innerHeight;

// Dimensions for Stream Graph
let streamLeft = (1/5) * width, streamTop = (1/5) * height;
let streamMargin = {top: 10, right: 30, bottom: 30, left: 60},
    streamWidth = (1/2) * width - streamMargin.left - streamMargin.right,
    streamHeight = height - streamMargin.top - streamMargin.bottom;

// Dimensions for Pie Chart
let pieLeft = (1/5) * width, pieTop = (1/5) * height;
let pieMargin = {top: 10, right: 30, bottom: 30, left: 60},
    pieWidth = (1/2) * width - pieMargin.left - pieMargin.right,
    pieHeight = height - pieMargin.top - pieMargin.bottom;

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