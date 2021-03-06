/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 60, left: 200, right: 40 },
  radius = 5;

// these variables allow us to access anything we manipulate in init() but need access to in draw().
// All these variables are empty before we assign something to them.
let svg;
let xScale;
let yScale;
let xAxisGroup;
let yAxisGroup;
let colorScale = d3.scaleOrdinal(d3.schemeTableau10); 

/* APPLICATION STATE */
let state = {
  data: [],
  selection: "All" // + YOUR FILTER SELECTION
};

/* LOAD DATA */
// + SET YOUR DATA PATH
d3.csv('../data/nyc_dca_charges_cleaned_processed.csv', d => {
  return {
  year: new Date(+d.violation_year, 0, 1),
  borough: d.borough,
  count_charges: +d.count_violation_by_date_borough
  }
})
  .then(data => {
    console.log("loaded data:", data);
    state.data = data;
    init();
  });

  /* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
function init() {
  // + SCALES
  xScale = d3.scaleLinear()
    .domain(d3.extent(state.data, d => d.year))
    .range([margin.left, width - margin.right])
  
  yScale = d3.scaleLinear()
    .domain(d3.extent(state.data, d => d.count_charges))
    .range([height - margin.bottom, margin.bottom])

  // + AXES
  const xAxis = d3.axisBottom(xScale)
  const yAxis = d3.axisLeft(yScale)

  // + UI ELEMENT SETUP
  const dropdown = d3.select("#dropdown")

  // add in dropdown options from the unique values in the data
  dropdown.selectAll("option")
    .data ([
      "Select a borough",
      ...Array.from(new Set(state.data.map(d => d.borough))).sort()
    ])  // you can't sort a set, but you can sort an array
    .join("option")
    .attr("value", d => d)
    .text(d => d)
  // + SET SELECT ELEMENT'S DEFAULT VALUE (optional)
  dropdown.on("change", event => {
    state.selection = event.target.value
    console.log('state updated to: ', state) // to track what's going on
    draw();
  });

  // + CREATE SVG ELEMENT
  svg = d3.select("#d3-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  // + CALL AXES
  const xAxisGroup = svg.append("g")
    .attr("class", 'xAxis')
    .attr("transform", `translate(${0}, ${height - margin.bottom})`)
    .call(xAxis
      .tickFormat(d3.timeFormat("%Y"))
      .ticks(7))
  
  const yAxisGroup = svg.append("g")
    .attr("class", 'yAxis')
    .attr("transform", `translate(${margin.left}, ${0})`) 
    .call(yAxis)

  xAxisGroup.append("text")
    .attr("class", 'axis-title')
    .attr("x", width / 2)
    .attr("y", 40)
    .attr("text-anchor", "middle")
    .text("Date of Violation")
  
  yAxisGroup.append("text")
    .attr("class", 'axis_title')
    .attr("x", -40)
    .attr("y", height / 2)
    .attr("writing-mode", "vertical-lr")
    .attr("text-archor", "middle")
    .text("# of Charges")

  draw(); // calls the draw function
}

/* DRAW FUNCTION */
// we call this everytime there is an update to the data/state
function draw() {
  // + FILTER DATA BASED ON STATE
  const filteredByBorough = state.data
    .filter(d => d.borough === state.selection)

  // + UPDATE SCALE(S), if needed

  // + UPDATE AXIS/AXES, if needed

  // + DRAW CIRCLES/LABEL GROUPS, if you decide to
  const dots = svg 
    .selectAll(".dot")
    .data(filteredByBorough, d => d.year)
    .join(
      enter => enter.append("g")
        .attr("class", "dot")
        .attr("transform", d => `translate(${xScale(d.year)}, ${yScale(d.count_charges)})`),
      update => update.transition()
        .call(update => update.transition()
          .duration(900)
          .attr("transform", d => `translate(${xScale(d.year)}, ${yScale(d.count_charges)})`)
      ),
      exit => exit.remove()
    );

  dots.selectAll("circle")
      .data(d => [d]) // pass data to child
      .join("circle")
      .attr("r", radius)

  // + DEFINE AREA GENERATOR FUNCTION
  const area = d3.area()
    .x(d => x(d.year))
    .y1(d => y(d.count_charges))
    .y0(y(0));

  // + DRAW LINE AND/OR AREA
  svg.selectAll(".area")
  .data([filteredData]) // data needs to take an []
  .join("path")
  .attr("class", 'area')
  .attr("fill", d => colorScale(d.borough))
  .attr("stroke", "black")
  .transition()
  .duration(1000)
  .attr("d", d => lineGen(d))
}
