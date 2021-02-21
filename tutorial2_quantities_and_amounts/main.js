

d3.csv('../data/count_top_wines_by_country.csv', d3.autoType) // load data
.then(data => {
    console.log("data", data)


// setting constants
const width = window.innerWidth * .9;
const height = window.innerHeight / 2;


// setting our scale
const xScale = d3.scaleBand()           // scaleBand method sets categorical/ordinal
    .range([0, width])      // setting min and max
    .domain(data.map(d => d.country))   // set domain to list of values in country field
    .paddingInner(.5)

const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)])    // start at 0, take the max value in data
    .range([height, 0])             // starts from upper righthand corner

// holding the chart we're drawing
const svg = d3.select("#vchart")        // selecting div element
    .append("svg")                      // adding an element in index.html        
    .attr("width", width)               // second argument needs to be equal to max
    .attr("height", height)             // of x and y scale range

// drawing bars - select, join, draw/style elements
svg.selectAll("rect")                   // select all rect elements
    .data(data)
    .join("rect")                       // create a rect for each data elements; 26
    .attr("width", xScale.bandwidth())
    .attr("height", d => height - yScale(d.count))
    .attr("x", d => xScale(d.country)) 
    .attr("y", d => yScale(d.count))

})