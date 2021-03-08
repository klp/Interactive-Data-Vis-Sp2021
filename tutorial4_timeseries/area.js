
// these variables allow us to access anything we manipulate in init() but need access to in draw().
// All these variables are empty before we assign something to them.
let svgA;
let xScaleA;
let yScaleA;
let xAxisGroupA;
let yAxisGroupA;
let colorScaleA = d3.scaleOrdinal(d3.schemeTableau10); 

// Save state
let stateA = {
    data: [],
    selection: "All" // + YOUR FILTER SELECTION
  };

d3.csv('../data/nyc_dca_charges_cleaned_processed.csv', d => {
    return {
    year: new Date(+d.violation_year, 0, 1),
    borough: d.borough,
    count_charges: +d.count_violation_by_date_borough
    }
})
.then(data => {
  console.log("loaded data:", data);
  stateA.data = data;
  initA();
});

// Here comes the init function
function initA() {
    // + SCALES
    xScaleA = d3.scaleLinear()
      .domain(d3.extent(stateA.data, d => d.year))
      .range([margin.left, width - margin.right])
    
    yScaleA = d3.scaleLinear()
      .domain(d3.extent(stateA.data, d => d.count_charges))
      .range([height - margin.bottom, margin.bottom])
  
    // + AXES
    const xAxisA = d3.axisBottom(xScaleA)
    const yAxisA = d3.axisLeft(yScaleA)

    svgA = d3.select("#d3-area")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  // + CALL AXES
    const xAxisGroupA = svgA.append("g")
        .attr("class", 'xAxis')
        .attr("transform", `translate(${0}, ${height - margin.bottom})`)
        .call(xAxisA
        .tickFormat(d3.timeFormat("%Y"))
        .ticks(7))
  
    const yAxisGroupA = svgA.append("g")
        .attr("class", 'yAxis')
        .attr("transform", `translate(${margin.left}, ${0})`) 
        .call(yAxisA)

    xAxisGroupA.append("text")
        .attr("class", 'axis-title')
        .attr("x", width / 2)
        .attr("y", 40)
        .attr("text-anchor", "middle")
        .text("Date of Violation")
    
    yAxisGroupA.append("text")
        .attr("class", 'axis_title')
        .attr("x", -80)
        .attr("y", height / 2)
        .attr("writing-mode", "vertical-lr")
        .attr("text-archor", "middle")
        .text("# of Charges")

    drawA(); // calls the draw function
}

function drawA() {
    const areaFunc = d3.area()
    .x(d => xScaleA(d.year))
    .y0(height - margin.bottom)
    .y1(d => yScaleA(d.count_charges))

svgA.selectAll("path.line")
    .data(stateA.data)
    .join("path")
    .attr("class", 'line')
    .attr("fill", d => colorScaleA(d.borough))
    .attr("stroke", "black")
    .attr("d", areaFunc)
}