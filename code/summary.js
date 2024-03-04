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
    .attr("transform", `translate(${summaryTitleMargin.right}, ${summaryTitleMargin.top})`)

summaryTitle.append("text")
    .attr("x", summaryTitleWidth/2)
    .attr("y", summaryTitleHeight/7)
    .attr("font-size", "50px")
    .attr("text-anchor", "middle")
    .text("Visualization Summary")
    .attr("font-family", "serif")


// Define the data for the rectangles
const rectData = [
    { x: width / 4, y: height / 2 },
    { x: width / 2, y: height / 2 },
    { x: (3 / 4) * width, y: height / 2 }
  ];
  
// Create a group for the rectangles
const rectsGroup = svg5.append("g");

const boxName = ["Charging Station", "Specifications", "Population"];  
const pages = [2,3,4];

// Draw the rectangles with text labels
const rectangles = rectsGroup
    .selectAll("rect")
    .data(rectData)
    .enter()
    .append("g")
    .attr("class", "rectangle-group")
    .attr("transform", d => `translate(${d.x - 50}, ${d.y - 50})`);

rectangles
    .append("rect")
    .attr("width", 150)
    .attr("height", 100)
    .attr("fill", "steelblue")
    .attr("cursor", "pointer");

rectangles
    .append("text")
    .attr("x", 60)
    .attr("y", -10)
    .attr("dy", "0.35em")
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .attr("fill", "black")
    .text((d, i) => boxName[i]);

// Add click event listener to the rectangles
rectangles.on("click", handleClick);

// Function to handle click event
function handleClick(d, i) {
    const pageNumber = i + 2;
    console.log("Click " + pageNumber)
    const sectionID = `page${pageNumber}`;

    const section = document.getElementById(sectionID);

    if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}


// Draw the line
svg5
    .append("line")
    .attr("x1", rectData[0].x)
    .attr("y1", rectData[0].y)
    .attr("x2", rectData[2].x)
    .attr("y2", rectData[2].y)
    .attr("stroke", "black")
    .attr("stroke-width", 2);
