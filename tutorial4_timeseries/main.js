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
// let countsByBorough = d3.nest()
//   .key(d => d.borugh)
//   .rollup(v => v.length)
//   .entries(data);
// console.log(countsByBorough);

const tParse = d3.timeParse("%m/Y"); // Trying to use this to format date

/* APPLICATION STATE */
let state = {
  data: [],
  selection: "All", // + YOUR FILTER SELECTION
};

/* LOAD DATA */
// + SET YOUR DATA PATH
d3.csv('../data/nyc_dca_charges_final_cleaned_processed.csv', (d) => {
  return {
  date: new Date(d.violation_date),
  borough: d.borough,
  count_charges: d.count_violation_by_date_borough
  }
})

  .then(import_data => {
    console.log("loaded data:", import_data);
    state.data = import_data;
    init();

});

  /* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
function init() {
  // + SCALES
  xScale = d3.scaleLinear()
    .domain(d3.extent(state.data, d => d.date))
    .range([margin.left, width - margin.right])
  
  yScale = d3.scaleLinear()
    .domain(d3.extent(state.data, d => d.count_violation_by_date_borough))
    .range([height - margin.bottom, margin.bottom])

  // + AXES
  const xAxis = d3.axisBottom(xScale)
  const yAxis = d3.axisLeft(yScale)

  // + UI ELEMENT SETUP
  const dropdown = d3.select("#dropdown")

  // add in dropdown options from the unique values in the data
  dropdown.selectAll("options")
    .data (Array.from(new Set(state.data.map(d => d.borough))).sort())  // you can't sort a set, but you can sort an array
    .join("option")
    .attr("value", d => d)
    .text(d => d)
  // + SET SELECT ELEMENT'S DEFAULT VALUE (optional)

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
      .tickFormat(d3.timeFormat("%m-%Y"))
      .ticks(12))
  
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
    .attr("x", -30)
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

  // + UPDATE SCALE(S), if needed

  // + UPDATE AXIS/AXES, if needed

  // + DRAW CIRCLES/LABEL GROUPS, if you decide to

  // + DEFINE LINE GENERATOR FUNCTION

  // + DRAW LINE AND/OR AREA
}
