

d3.csv('../data/count_top_wines_by_country.csv', d3.autoType) // load data
.then(data => {
    console.log("data", data)


// setting constants
const width = window.innerWidth * .9;
const height = window.innerHeight / 2;
const margins = {top: 30, right: 10, bottom: 30, left: 20};

// variables
var colorGradient = d3.scaleOrdinal(d3.schemeBlues[8]);     // blue color gradient 

// Vertical barchart

// setting our scale
const xScale = d3.scaleBand()           // scaleBand method sets categorical/ordinal
    .range([0, width])      // setting min and max
    .domain(data.map(d => d.country))   // set domain to list of values in country field
    .paddingInner(.4)
    .paddingOuter(1.1)

const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)])    // start at 0, take the max value in data
    .range([height, 0])             // starts from upper righthand corner

// container holding the chart we're drawing
const svg = d3.select("#vchart-container")        // selecting div element
    .append("svg")                      // adding an element in index.html        
    .attr("width", width + margins.left + margins.right)               // second argument needs to be equal to max
    .attr("height", height + margins.top + margins.bottom)             // of x and y scale range

// drawing bars - select, join, draw/style elements
svg.selectAll("rect")                   // select all rect elements
    .data(data)
    .join("rect")                       // create a rect for each data elements; 26
    .attr("width", xScale.bandwidth())
    .attr("height", d => height - yScale(d.count))
    .attr("x", d => xScale(d.country)) 
    .attr("y", d => yScale(d.count))
    .attr("fill", d => colorGradient(d.count))

svg.append("g")
    .attr("transform", "translate(100, 0)")
    .call(d3.axisLeft(yScale))

// draw horizontal chart labels
svg.selectAll("text.country")
    .data(data)
    .join("text")
    .attr("class", 'country')
    .attr("x", d => xScale(d.country) + (xScale.bandwidth() / 2))
    .attr("y", height)
    .attr("dy", "3.5em")
    .attr("text-anchor", 'middle')
    .text(d => d.country)

// draw vertical chart labels
svg.selectAll("text.count")
    .data(data)
    .join("text")
    .attr("class", 'count')
    .attr("x", d => xScale(d.country) + xScale.bandwidth() / 2)
    .attr("y", d => yScale(d.count))
    .attr("dy", "3em")
    .attr("text-anchor", "middle")
    .text(d => d3.format(",")(d.count))

svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("x",  margins.top - 250)      // I'd love not to hard code this...
    .attr("y", - margins.left + 50)
    .text("Number of Wines")

// Horizontal version

// const xScaleH = d3.scaleLinear()
//     .domain([0, d3.max(data, d => d.count)])
//     .range([0, width])
    
// const yScaleH = d3.scaleBand()
//     .domain(data.map(d => d.country))
//     .range(height, 0)

// svg.selectAll("rect")
//     .data(data)
//     .join("rect")                       // create a rect for each data elements; 26
//     .attr("width", xScaleH.bandwidth())
//     .attr("height", d => height - yScaleH(d.count))
//     .attr("x", d => xScaleH(d.country)) 
//     .attr("y", d => yScaleH(d.count))
//     .attr("fill", d => colorGradient(d.count))

})

