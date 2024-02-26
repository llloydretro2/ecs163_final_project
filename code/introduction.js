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

titleContainer.append("text")
    .attr("x", titleWidth/2)
    .attr("y", titleHeight/7)
    .attr("font-size", "50px")
    .attr("text-anchor", "middle")
    .text("TITLE HOLDER XXX")
    .attr("font-family", "serif")


// intro paragraph
introParagraph = svg.append("g")
    .attr("width", titleWidth + titleMargin.left + titleMargin.right)
    .attr("height", titleHeight + titleMargin.top + titleMargin.bottom)
    .attr("transform", `translate(${titleMargin.left}, ${titleMargin.top})`)
    

textContainer = introParagraph.append("text")
    .attr("x", titleWidth/50)
    .attr("y", titleHeight/4)
    .attr("font-size", "20px")
    .attr("font-family", "serif")
    .style("opacity", 0)

textContainer.append("tspan")
    .attr("x", titleWidth/50)
    .attr("y", titleHeight/4)
    .text("Nowadays, driven by growing environmental concerns and consumers’ shifting preference,")

textContainer.append("tspan")
    .attr("x", titleWidth/50)
    .attr("dy", "1.5em")
    .text("electric vehicles (EV) have become more and more popular in recent years resulting ")

textContainer.append("tspan")
    .attr("x", titleWidth/50)
    .attr("dy", "1.5em")
    .text("in an increase in potential buyers. As a developing market with many companies ")

textContainer.append("tspan")
    .attr("x", titleWidth/50)
    .attr("dy", "1.5em")
    .text("with growing technology, there are many choices for new buyers. However, at the same time ")

textContainer.append("tspan")
    .attr("x", titleWidth/50)
    .attr("dy", "1.5em")
    .text("the great complexity of the market can confuse potential buyers which makes it ")

textContainer.append("tspan")
    .attr("x", titleWidth/50)
    .attr("dy", "1.5em")
    .text("increasingly hard to make decisions. Therefore, our goal is to analyze the data regarding ")

textContainer.append("tspan")
    .attr("x", titleWidth/50)
    .attr("dy", "1.5em")
    .text("EVs and provide informative visualizations to guide users to understand the market ")

textContainer.append("tspan")
    .attr("x", titleWidth/50)
    .attr("dy", "1.5em")
    .text("so that they can make informed decisions based on their needs.")

textContainer.transition()
    .duration(2000) // Animation duration of 1 second
    .style("opacity", 1);



background = svg.append("defs");
background.append("pattern")
.attr("id", "background-gif")
    .attr("patternUnits", "userSpaceOnUse")
    .attr("width", width)
    .attr("height", height)
    .append("image")
        .attr("xlink:href", "../img/test.gif")
        .attr("width", width)
        .attr("height", height)
        .attr("x", 0)
        .attr("y", 0);


graph = svg.insert("rect", ":first-child") // Ensure the background is behind all other elements
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "url(#background-gif)")
    .style("opacity", 0)

graph.transition()
    .duration(2000) // Animation duration of 1 second
    .style("opacity", 0.2);
