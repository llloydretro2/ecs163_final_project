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
            countyInfo[d.County] ++;
        }
    });
    return [carInfo, countyInfo];
}

d3.csv("../data/processed_data/general/Electric_Vehicle_Population_Data.csv").then(rawData => {
    // Initialize variables
    let allMakes = [],
        allCities = [];
    let carInfo = [],
        countyInfo = [];
    // Proess data
    [allMakes, allCities, rawData] = processDataOne(rawData);
    [carInfo, countyInfo] = processDataTwo(rawData);

});