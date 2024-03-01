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
