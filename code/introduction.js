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

titleText = titleContainer.append("text")
    .attr("x", titleWidth/2)
    .attr("y", titleHeight/10)
    .attr("font-size", "50px")
    .attr("text-anchor", "middle")
    .text("Electric Vehicle Data Visualization")
    .attr("font-family", "serif")
    .style("opacity", 0)

titleText.transition()
    .duration(1000) // Animation duration of 1 second
    .style("opacity", 1);


// intro paragraph
introParagraph = svg.append("g")
    .attr("width", titleWidth + titleMargin.left + titleMargin.right)
    .attr("height", titleHeight + titleMargin.top + titleMargin.bottom)
    .attr("transform", `translate(${titleMargin.left*2.4}, ${titleMargin.top})`)
    

textContainer = introParagraph.append("text")
    .attr("x", titleWidth/3)
    .attr("y", titleHeight/7)
    .attr("font-size", "20px")
    .attr("font-family", "serif")
    .style("opacity", 0)

textContainer.append("tspan")
    .attr("x", titleWidth/4)
    .attr("y", titleHeight/5)
    .text("Nowadays, driven by growing environmental concerns and consumers’ shifting")

textContainer.append("tspan")
    .attr("x", titleWidth/4)
    .attr("dy", "1.5em")
    .text("preference, electric vehicles (EV) have become more and more popular in recent")

textContainer.append("tspan")
    .attr("x", titleWidth/4)
    .attr("dy", "1.5em")
    .text("years resulting in an increase in potential buyers. As a developing market with")

textContainer.append("tspan")
    .attr("x", titleWidth/4)
    .attr("dy", "1.5em")
    .text("many companies with growing technology, there are many choices for new buyers.")

textContainer.append("tspan")
    .attr("x", titleWidth/4)
    .attr("dy", "1.5em")
    .attr("font-size", "40px")
    .text("WHY ")

textContainer.append("tspan")
    .attr("x", titleWidth/4+100)
    .text("people choose EV?")

textContainer.transition()
    .duration(2000) // Animation duration of 1 second
    .style("opacity", 1);


reason1 = svg.append("g")
    .attr("width", titleWidth + titleMargin.left + titleMargin.right)
    .attr("height", titleHeight + titleMargin.top + titleMargin.bottom)
    .attr("transform", `translate(${titleMargin.left}, ${titleMargin.top})`)

reason2 = svg.append("g")
    .attr("width", titleWidth + titleMargin.left + titleMargin.right)
    .attr("height", titleHeight + titleMargin.top + titleMargin.bottom)
    .attr("transform", `translate(${titleMargin.left}, ${titleMargin.top})`)

reason3 = svg.append("g")
    .attr("width", titleWidth + titleMargin.left + titleMargin.right)
    .attr("height", titleHeight + titleMargin.top + titleMargin.bottom)
    .attr("transform", `translate(${titleMargin.left}, ${titleMargin.top})`)


// first reason
reason1Container = reason1.append("text")
    .attr("x", width/10*2)
    .attr("y", height/2)
    .attr("font-size", "20px")
    .attr("font-family", "serif")
    .style("text-anchor", "middle")
    .style("opacity", 0)

reason1Container.append("tspan")
    .text("Environmental Friendly")

reason1Container.transition()
    .duration(3000) // Animation duration of 1 second
    .style("opacity", 1);


// second reason
reason2Container = reason2.append("text")
    .attr("x", width/10*4.5)
    .attr("y", height/2)
    .attr("font-size", "20px")
    .attr("font-family", "serif")
    .style("text-anchor", "middle")
    .style("opacity", 0)

reason2Container.append("tspan")
    .text("Federal Incentives from Government")



reason2Container.transition()
    .duration(3000) // Animation duration of 1 second
    .style("opacity", 1);


// third reason
reason3Container = reason3.append("text")
    .attr("x", width/10*7)
    .attr("y", height/2)
    .attr("font-size", "20px")
    .attr("font-family", "serif")
    .style("text-anchor", "middle")
    .style("opacity", 0)

reason3Container.append("tspan")
    .text("State Goals for EV")


reason3Container.transition()
    .duration(3000) // Animation duration of 1 second
    .style("opacity", 1);


background = svg.append("defs");
background.append("pattern")
.attr("id", "background")
    .attr("patternUnits", "userSpaceOnUse")
    .attr("width", width)
    .attr("height", height)
    .append("image")
        .attr("xlink:href", "../img/introBackground.webp")
        .attr("width", width)
        .attr("height", height)
        .attr("x", 0)
        .attr("y", 0);


// graph 1
graph1Container = svg.append("defs");
graph1Container.append("pattern")
.attr("id", "graph1")
    .attr("patternUnits", "userSpaceOnUse")
    .attr("width", width)
    .attr("height", height)
    .append("image")
        .attr("xlink:href", "../img/introGraph1.png")
        .attr("width", width/4)
        .attr("height", height/3)
        .attr("x", 0)
        .attr("y", 0);

graph1Rect = svg.insert("rect")
    .attr("width", width/4)
    .attr("height", height/3)
    .attr("fill", "url(#graph1)")
    .attr("transform", `translate(${width/9}, ${height/1.7})`)
    .style("opacity", 0)

graph1Rect.transition()
    .duration(4000) // Animation duration of 1 second
    .style("opacity", 1);


// graph 2 hyperlink
hyperLinkContainer = svg.append("a")
    .attr("xlink:href", "https://www.irs.gov/credits-deductions/credits-for-new-clean-vehicles-purchased-in-2023-or-after")
    .append("text")
        .text("IRS tax Incentives")
        .attr("font-family", "serif")
        .style("text-anchor", "middle")
        .style("text-decoration","underline")
        .style("fill", "blue")
        .attr("font-size", "20px")
        .attr("x", width/2.05)
        .attr("y", height/1.5)
        .attr("height", 100)
        .attr("width", 200)
        .style("opacity", 0)

hyperLinkContainer.transition()
    .duration(4000) // Animation duration of 1 second
    .style("opacity", 1);


// graph 3
graph3Container = svg.append("defs");
graph3Container.append("pattern")
.attr("id", "graph3")
    .attr("patternUnits", "userSpaceOnUse")
    .attr("width", width)
    .attr("height", height)
    .append("image")
        .attr("xlink:href", "../img/introGraph3.png")
        .attr("width", width/3)
        .attr("height", height/3)
        .attr("x", 0)
        .attr("y", 0);

graph3Rect = svg.insert("rect")
    .attr("width", width/3)
    .attr("height", height/3)
    .attr("fill", "url(#graph3)")
    .attr("transform", `translate(${width/10*6}, ${height/1.7})`)
    .style("opacity", 0)

graph3Rect.transition()
    .duration(4000) // Animation duration of 1 second
    .style("opacity", 1);

// hyper link for 3
// graph 2 hyperlink
hyperLinkContainer2 = svg.append("a")
    .attr("xlink:href", "https://ww2.arb.ca.gov/news/california-moves-accelerate-100-new-zero-emission-vehicle-sales-2035")
    .append("text")
        .text("California Goal")
        .attr("font-family", "serif")
        .style("text-anchor", "middle")
        .style("text-decoration","underline")
        .style("fill", "blue")
        .attr("font-size", "20px")
        .attr("x", width/1.075)
        .attr("y", height/1.5)
        .attr("height", 100)
        .attr("width", 200)
        .style("opacity", 0)

hyperLinkContainer2.transition()
    .duration(4000) // Animation duration of 1 second
    .style("opacity", 1);

hyperLinkContainer3 = svg.append("a")
    .attr("xlink:href", "https://afdc.energy.gov/laws/all?state=AL#State%20Incentives")
    .append("text")
        .text("Alabama Goal")
        .attr("font-family", "serif")
        .style("text-anchor", "middle")
        .style("text-decoration","underline")
        .style("fill", "blue")
        .attr("font-size", "20px")
        .attr("x", width/1.075)
        .attr("y", height/1.25)
        .attr("height", 100)
        .attr("width", 200)
        .style("opacity", 0)

hyperLinkContainer3.transition()
    .duration(4000)
    .style("opacity", 1);


// background
backgroundGraph = svg.insert("rect", ":first-child")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "url(#background)")
    .style("opacity", 0)

backgroundGraph.transition()
    .duration(2000) // Animation duration of 1 second
    .style("opacity", 0.1);
