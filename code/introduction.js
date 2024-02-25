// title dimension
let titleLeft = (1/5) * width, titleTop = (1/5) * height;
let titleMargin = {top: 10, right: 30, bottom: 30, left: 60},
    titleWidth = width - titleMargin.left - titleMargin.right,
    titleHeight = height - titleMargin.top - titleMargin.bottom;

const svg = d3.select('svg')

// title
titleContainer = svg.append("g")
    .attr("width", titleWidth + titleMargin.left + titleMargin.right)
    .attr("height", titleHeight + titleMargin.top + titleMargin.bottom)
    .attr("transform", `translate(${titleMargin.left}, ${titleMargin.top})`)

console.log(height)

titleContainer.append("text")
    .attr("x", titleWidth/2)
    .attr("y", titleHeight/7)
    .attr("font-size", "50px")
    .attr("text-anchor", "middle")
    .text("TITLE HOLDER XXX")
    .attr("font-family", "serif")


// intro paragraph