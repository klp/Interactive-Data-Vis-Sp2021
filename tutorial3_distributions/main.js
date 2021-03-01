/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.8,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 60, left: 200, right: 40 },
  radius = 4;

// these variables allow us to access anything we manipulate in init() but need access to in draw().
// All these variables are empty before we assign something to them.
let svg;
let xScale;
let yScale;
let colorScale;

/* APPLICATION STATE */
let state = {
  data: [],
  selectedSubreddit: "All" // + YOUR INITIAL FILTER SELECTION
};

/* LOAD DATA */
d3.csv("../data/reddit_gamespot_wallstreet_posts.csv", d3.autoType).then(raw_data => {
  // + SET YOUR DATA PATH
  console.log("data", raw_data); // just in case that's helpful
  state.data = raw_data;
  init();
});

/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
function init() {
  // + SCALES
  xScale = d3.scaleLinear()
    .domain(d3.extent(state.data, d => d.comments))
    .range([margin.left, width - margin.right])

  yScale = d3.scaleLinear()
    .domain(d3.extent(state.data, d => d.score))
    .range([height - margin.bottom, margin.bottom])

  colorScale = d3.scaleOrdinal()
    .domain(["investing", "stocks", "wallstreetbets"])
    .range(["green", "pink", "purple"])

  // + AXES
  const xAxis = d3.axisBottom(xScale)
  const yAxis = d3.axisLeft(yScale)

  // + UI ELEMENT SETUP
  const selectElement = d3.select("#dropdown") // select drowpdown element index.html

  selectElement
    .selectAll("option")
    .data([ 
      { key: "All", label: "All" },
      { key: "investing",       label: "Investing" },
      { key: "stocks",          label: "Stocks" },
      { key: "wallstreetbets",  label: "Wallstreet" }])
    .join("option")
    .attr("value", d => d.key) // this feels kinda magical
    .text(d => d.label); 

  // set up our event listener
  selectElement.on("change", event => {
    console.log("New filter value is", event.target.value);
    state.selectedSubreddit = event.target.value
    console.log("NEW STATE:", state);
    draw(); // re-draw the graph based on this new selection
  });

  svg = d3.select("#d3-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  // calling axes
  const xAxisGroup = svg.append("g")
    .attr("class", 'xAxis')
    .attr("transform", `translate(${0}, ${height - margin.bottom})`) 
    .call(xAxis)

  const yAxisGroup = svg.append("g")
    .attr("class", 'yAxis')
    .attr("transform", `translate(${margin.left}, ${0})`) 
    .call(yAxis)

  // add labels - xAxis
  xAxisGroup.append("text")
    .attr("class", 'axis-title')
    .attr("x", width / 2)
    .attr("y", 40)
    .attr("text-anchor", "middle")
    .text("# of Comments")

  // add labels - yAxis
  yAxisGroup.append("text")
    .attr("class", 'axis-title')
    .attr("x", -90)
    .attr("y", height / 2)
    .attr("writing-mode", "vertical-lr")
    .attr("text-anchor", "middle")
    .text("# of Upvotes")

  draw(); 
}

/* DRAW FUNCTION */
function draw() {

  // + FILTER DATA BASED ON STATE
  const filteredData = state.data
    .filter(d => state.selectedSubreddit === "All" || state.selectedSubreddit === d.subreddit)

  const dot = svg
    .selectAll("circle")
    .data(filteredData, d => d.id)
    .join(
      // + HANDLE ENTER SELECTION
      enter => enter.append("circle")
        .attr("r", radius)
        .attr("fill", d => colorScale(d.subreddit))
        .attr("cx", d => xScale(d.comments)) // start dots on the left
        .attr("cy", height - margin.bottom)
        .call(sel => sel.transition()
          .duration(1500)
          .attr("cy", d => yScale(d.score)) // transition to correct position
        ),

      // + HANDLE UPDATE SELECTION
      update => update
        .call(sel => sel
          .transition()
          .duration(250)
          .attr("r", radius * 1.2) 
          .transition()
          .duration(500)
          .attr("r", radius * 1) 
        ),

      // + HANDLE EXIT SELECTION
      exit => exit
        .call(sel => sel
          .attr("opacity", 1)
          .transition()
          .duration(500)
          .attr("opacity", 0)
          .remove()
        )
    );
}