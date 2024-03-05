const marginTop =  20;
const marginRight = 50;
const marginBottom = 50;
const marginLeft = 50;

const x_start = 1/2 * width;
const x_end = width - marginRight;

const y_start = 2/5 * height;
const y_end = marginTop;

const x = d3.scaleUtc().range([x_start, x_end]);
const y = d3.scaleLinear().range([y_start, y_end]);

const x_axis = d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0);
const y_axis = d3.axisLeft(y).ticks(height / 40);


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
   .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

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
       .attr("y", 15)
       .attr("fill", "currentColor")
       .attr("text-anchor", "start")
       .text("↑ Daily close ($)"));

// Append a path for the line.
svg3.append("path")
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", line(tsla_data));

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
    .attr("stroke", "black")
    .attr("stroke-width", 1.5)
    .attr("d", line(F_data));

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
    .attr("stroke", "green")
    .attr("stroke-width", 1.5)
    .attr("d", line(NSANY_data));

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
    .attr("stroke", "yellow")
    .attr("stroke-width", 1.5)
    .attr("d", line(HMC_data));

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
    .attr("stroke", "red")
    .attr("stroke-width", 1.5)
    .attr("d", line(GM_data));

}).catch(function(error){
    console.log(error);
});
