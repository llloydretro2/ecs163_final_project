const marginTop =  50;
const marginRight = 50;
const marginBottom = 50;
const marginLeft = 50;

const x_start = 1/2 * width;
const x_end = width - marginRight;

const y_start = 2/5 * height;
const y_end = marginTop;

let titleLinLeft = (2/10) * width, titleLinTop = (1/3) * height;

const x = d3.scaleUtc().range([x_start, x_end]);
const y = d3.scaleLinear().range([y_start, y_end]);

const x_axis = d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0);
const y_axis = d3.axisLeft(y).ticks(height / 40);

function highlight(brand, color) {
    svg3.selectAll(".parallelLine")
        .transition().duration(200)
        .style("stroke", function() {
            if (d3.select(this).attr("class") === (brand)) {
                return color;
            } else {
                return "lightgrey"; 
            }
        })
        .style("opacity", function() {
            if (d3.select(this).attr("class") === (brand)) {
                return "1"; 
            } else {
                return "0.2";
            }
        });
}

function reset_highlight() {
    d3.selectAll(".parallelLine")
            .transition().duration(200).delay(1000)
            .style("stroke", "#69b3a2")
            .style("opacity", "1")
}

d3.csv("../data/processed_data/stock/TSLA.csv").then(tsla_data =>{
    
    const parseDate = d3.timeParse("%Y-%m-%d");
    tsla_data.forEach(d => {
        d.Date = parseDate(d.Date);
        d.Close = +d.Close;
    });

    x.domain(d3.extent(tsla_data, d => d.Date));
    y.domain([0, d3.max(tsla_data, d => d.Close)]);

    // Declare the line generator.
    const line = d3.line()
        .x(d => x(d.Date))
        .y(d => y(d.Close));

    // Add the x-axis.
   svg3.append("g")
   .attr("transform", `translate(0,${y_start})`)
   .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
    // Add axis title
    .append("text")
        .style("text-anchor", "middle")
        .attr("transform", `translate(${x_end}, ${0})`)
        .attr("y", 20)
        .text("Year")
        .style("fill", "black");

    // Add the y-axis, remove the domain line, add grid lines and a label.
    svg3.append("g")
   .attr("transform", `translate(${x_start},0)`)
   .call(d3.axisLeft(y).ticks(height / 40))
   .call(g => g.select(".domain").remove())
   .call(g => g.selectAll(".tick line").clone()
       .attr("x2", x_start)
       .attr("stroke-opacity", 0.1))
        .call(g => g.append("text")
       .attr("x", -marginLeft)
       .attr("y", y_end - 5)
       .attr("fill", "currentColor")
       .attr("text-anchor", "start")
       .text("↑ Daily close ($)"));

    // Adding title to line graph
    svg3.append("text")
        .attr("x", (x_start + x_end) / 2)
        .attr("y", y_end - 10)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text("Electric Vehicle Manufacturers Stock Data");

    // Append a path for the line.
    svg3.append("path")
        .attr("fill", "none")
        .attr("stroke", "#cc0000")
        .attr("stroke-width", 1.5)
        .attr("d", line(tsla_data))
        .on("mouseover", function() {
            highlight("parallelLine Tesla ", "#cc0000");
        })
        .on("mouseout", function() {
            reset_highlight();
        });

}).catch(function(error){
    console.log(error);
});

d3.csv("../data/processed_data/stock/F.csv").then(F_data =>{

    const parseDate = d3.timeParse("%Y-%m-%d");
    F_data.forEach(d => {
        d.Date = parseDate(d.Date);
        d.Close = +d.Close;
    });

    // Declare the line generator.
    const line = d3.line()
        .x(d => x(d.Date))
        .y(d => y(d.Close));


    // Append a path for the line.
    svg3.append("path")
        .attr("fill", "none")
        .attr("stroke", "#133A7C")
        .attr("stroke-width", 1.5)
        .attr("d", line(F_data))
        .on("mouseover", function() {
            highlight("parallelLine Ford ", "#133A7C");
        })
        .on("mouseout", function() {
            reset_highlight();
        });

}).catch(function(error){
    console.log(error);
});

d3.csv("../data/processed_data/stock/NSANY.csv").then(NSANY_data =>{

    const parseDate = d3.timeParse("%Y-%m-%d");
    NSANY_data.forEach(d => {
        d.Date = parseDate(d.Date);
        d.Close = +d.Close;
    });

    // Declare the line generator.
    const line = d3.line()
        .x(d => x(d.Date))
        .y(d => y(d.Close));


    // Append a path for the line.
    svg3.append("path")
        .attr("fill", "none")
        .attr("stroke", "#cab2d6")
        .attr("stroke-width", 1.5)
        .attr("d", line(NSANY_data))
        .on("mouseover", function() {
            highlight("parallelLine Nissan ", "#cab2d6");
        })
        .on("mouseout", function() {
            reset_highlight();
        });

}).catch(function(error){
    console.log(error);
});

d3.csv("../data/processed_data/stock/HMC.csv").then(HMC_data =>{

    const parseDate = d3.timeParse("%Y-%m-%d");
    HMC_data.forEach(d => {
        d.Date = parseDate(d.Date);
        d.Close = +d.Close;
    });

    // Declare the line generator.
    const line = d3.line()
        .x(d => x(d.Date))
        .y(d => y(d.Close));


    // Append a path for the line.
    svg3.append("path")
        .attr("fill", "none")
        .attr("stroke", "#fc0384")
        .attr("stroke-width", 1.5)
        .attr("d", line(HMC_data))
        .on("mouseover", function() {
            highlight("parallelLine Honda ", "#fc0384");
        })
        .on("mouseout", function() {
            reset_highlight();
        });

}).catch(function(error){
    console.log(error);
});

d3.csv("../data/processed_data/stock/GM.csv").then(GM_data =>{

    const parseDate = d3.timeParse("%Y-%m-%d");
    GM_data.forEach(d => {
        d.Date = parseDate(d.Date);
        d.Close = +d.Close;
    });

    // Declare the line generator.
    const line = d3.line()
        .x(d => x(d.Date))
        .y(d => y(d.Close));


    // Append a path for the line.
    svg3.append("path")
        .attr("fill", "none")
        .attr("stroke", "#3283a8")
        .attr("stroke-width", 1.5)
        .attr("d", line(GM_data));

    }).catch(function(error){
        console.log(error);
    });

// Enter items for legend
const line_colors = ["#cc0000", "#133A7C", "#cab2d6", "#fc0384", "#3283a8"];
const line_names = ["Tesla", "Ford", "Nissan", "Honda", "General Motors"];

// Create legend with chosen items 
const legend = svg3.append("g")
    .attr("class", "legend")
    .attr("transform", `translate(${x_start - 150}, ${y_start - 100})`);

line_names.forEach((n, i) => {
    const legend_item = legend.append("g")
        .attr("transform", `translate(0, ${i * 20})`);
        
    legend_item.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", line_colors[i]);

    legend_item.append("text")
        .attr("x", 15)
        .attr("y", 6)
        .attr("dy", "0.35em")
        .text(n);

// Create Title Page
svg3.append("text")
    .attr("x", titleLinLeft)
    .attr("y", titleLinTop)
    .attr("text-anchor", "middle")
    .attr("font-family", "serif")
    .style("font-size", "36px")
    .text("EV Specifications and the Stock Market");

svg3.append("text")
    .attr("x", titleLinLeft)
    .attr("y", titleLinTop + space) 
    .attr("text-anchor", "middle")
    .attr("font-family", "serif")
    .style("font-size", "24px")
    .text("The top of the line EV specifications are from Tesla.");

// Add another line of text
svg3.append("text")
    .attr("x", titleLinLeft)
    .attr("y", titleLinTop + space * 2)
    .attr("text-anchor", "middle")
    .attr("font-family", "serif")
    .style("font-size", "24px")
    .text("Furthermore, the stock price reflects this, Tesla ");

// Add another line of text
svg3.append("text")
    .attr("x", titleLinLeft)
    .attr("y", titleLinTop + space * 3)
    .attr("text-anchor", "middle")
    .attr("font-family", "serif")
    .style("font-size", "24px")
    .text("outclassing every other EV manufacturer by a wide margin.");

});
