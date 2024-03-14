const svg5 = d3.select("#svg5");
// title dimension
let summaryTitleLeft = (1/5) * width, summaryTitleTop = (1/5) * height;
let summaryTitleMargin = {top: 10, right: 30, bottom: 30, left: 60},
    summaryTitleWidth = width - summaryTitleMargin.left - summaryTitleMargin.right,
    summaryTitleHeight = height - summaryTitleMargin.top - summaryTitleMargin.bottom;

// Summary Title
let summaryTitle = svg5.append("g")
    .attr("width", summaryTitleWidth + summaryTitleMargin.left + summaryTitleMargin.right)
    .attr("height", summaryTitleHeight + summaryTitleMargin.top + summaryTitleMargin.bottom)
    .attr("transform", `translate(${summaryTitleMargin.right}, ${summaryTitleMargin.top})`);

summaryTitle.append("text")
    .attr("x", summaryTitleWidth/2)
    .attr("y", summaryTitleHeight/7)
    .attr("font-size", "50px")
    .attr("text-anchor", "middle")
    .text("Visualization Navigation")
    .attr("font-family", "serif");


// Define the data for the images
const imageFiles = ["chargingStationSymbol.jpg", "evSpecifications.jpg", "evPopulation.jpg"];
const rectData = [
    { x: width / 5, y: height / 2 },
    { x: width / 2, y: height / 2 },
    { x: (4 / 5) * width, y: height / 2 }
];
  
// Create a group for the images
const imagesGroup = svg5.append("g");

const pages = [2,3,4];
const boxName = ["Charging Station", "Specifications", "Population"];  

// Draw the images with text labels
const images = imagesGroup
    .selectAll("image")
    .data(rectData)
    .enter()
    .append("g")
    .attr("class", "image-group")
    .attr("transform", (d, i) => `translate(${d.x - (1/5) * width / 2}, ${d.y - 50})`);

images
    .append("svg:image")
    .attr('xlink:href', (d, i) => `../img/${imageFiles[i]}`)
    .attr("width", (1/5) * width)
    .attr("height", (1/3) * height)
    .attr("cursor", "pointer");

images
    .append("text")
    .attr("x", 60)
    .attr("y", -20)
    .style("font-size", "20px")
    .attr("fill", "black")
    .text((d, i) => boxName[i]);

// Add click event listener to the images
images.on("click", handleClick);

// Function to handle click event
function handleClick(d, i) {
    const pageNumber = i + 2;

    const sectionID = `page${pageNumber}`;

    const section = document.getElementById(sectionID);

    if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}
