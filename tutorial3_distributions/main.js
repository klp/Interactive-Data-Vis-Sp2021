/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 60, left: 60, right: 40 },
  radius = 5;

// these variables allow us to access anything we manipulate in init() but need access to in draw().
// All these variables are empty before we assign something to them.
let svg;
let xScale;
let yScale;
let colorScale;

/* APPLICATION STATE */
let state = {
  data: [],
  sub_reddit: "All" // + YOUR INITIAL FILTER SELECTION
};

/* LOAD DATA */
d3.csv("../data/reddit_gamespot_wallstreet_posts.csv", d3.autoType).then(raw_data => {
  // + SET YOUR DATA PATH
  console.log("data", raw_data);
  // save our data to application state
  state.data = raw_data;
  init();
});

/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
function init() {
  xScale = d3.scaleLinear()
    .domain(d3.extent(state.data, d => d.comments))
    .range(margin.left, width - margin.right)

  yScale = d3.scaleLinear()
    .domain(d3.extent(state.data, d => d.score))
    .range(height - margin.bottom, margin.top)

  // + DEFINE AXES
  const xAxis = d3.axisBottom(xScale)
  const yAxis = d3.axisLeft(yScale)

  // + UI ELEMENT SETUP
  // + add dropdown options
  // + add event listener for 'change'

  // + CREATE SVG ELEMENT
  svg = d3.select("#d3-container")
    .append("svg")
    .attr('width', width)
    .attr('height', height)

  // + CREATE AXES
  svg.append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(${0}, ${height - margin.bottom})`)
    .call(xAxis)
    .append("text")
    .text("# of Comments")
    .attr("transform", `translate(${width / 2}, ${40})`)

  svg.append("g")
    .attr("class", "yAxis")
    .attr("transform", `translate(${margin.left}, ${height / 2})`)
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    
    .text("# of Upvotes")

    

  draw(); // calls the draw function
}

/* DRAW FUNCTION */
// we call this everytime there is an update to the data/state
function draw() {

  // + FILTER DATA BASED ON STATE
  const filteredData = state.data // <--- update to filter

  // + DRAW CIRCLES
  const dot = svg
    .selectAll("circle")
    .data(filteredData, d => d.id) // second argument is the unique key for that row
    .join(
      // + HANDLE ENTER SELECTION
      enter => enter.append("circle"),

      // + HANDLE UPDATE SELECTION
      update => update,

      // + HANDLE EXIT SELECTION
      exit => exit.remove()

    );
}
