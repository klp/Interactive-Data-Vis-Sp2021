/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 60, left: 60, right: 40 },
  radius = 6;

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
  console.log("data", raw_data);
  // save our data to application state
  state.data = raw_data;
  init();
});

/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
function init() {

  // set scales
  xScale = d3.scaleLinear()
    .domain(d3.extent(state.data, d => d.comments))
    .range([margin.left, width - margin.right])

  yScale = d3.scaleLinear()
    .domain(d3.extent(state.data, d => d.score))
    .range([height - margin.bottom, margin.top])

  // set domain and range for colorScale

  colorScale = d3.scaleOrdinal()
  .domain(["investing", "stocks", "wallstreetbets"])
  .range(["green", "blue", "pink"])

  // + DEFINE AXES
  const xAxis = d3.axisBottom(xScale)
  const yAxis = d3.axisLeft(yScale)


  // + UI ELEMENT SETUP
  const dropdown = d3.select("#dropdown")

  dropdown
    .selectAll("options")
    .data([
      { key: "All", label: "All"},
      { key: "investing",     label: "Investing"  },
      { key: "stocks",        label: "Stocks"     },
      { key: "wallstreetbets", label: "Wallstreet" }
      ]
    )
    .join("option")
    .attr("value)", d => d.key)
    .text(d => d.label);

    // event listener
    dropdown.on("change", event => {
      console.log("Filtered value: ", event.target.value)
      state.selectedSubreddit = event.target.value
      console.log("New state:", state);
      draw();
    });

  // + CREATE SVG ELEMENT
  svg = d3.select("#d3-container")
  .append("svg")
  .attr('width', width)
  .attr('height', height)
  
  svg.append("g")
  .attr("class", "xAxis")
  .attr("transform", `translate(${0}, ${height - margin.bottom})`)
  .call(xAxis)
  .append("text")
  .text("# of Comments")
  .attr("transform", `translate(${width / 2}, ${40})`)

  svg.append("g")
    .attr("class", "yAxis")
    .attr("transform", `translate(${margin.left}, ${0})`)
    .call(yAxis)
    .append("text")
    .text("# of Upvotes")

  draw();
}

/* DRAW FUNCTION */
// we call this everytime there is an update to the data/state
function draw() {

  // + FILTER DATA BASED ON STATE
  const filteredData = state.data
    .filter(d => state.selectedSubreddit === "All" || state.selectedSubreddit === d.subreddit)

  // + DRAW CIRCLES
  const dot = svg
    .selectAll("circle")
    .data(filteredData, d => d.id) // second argument is the unique key for that row
    .join(
      // + HANDLE ENTER SELECTION
      enter => enter.append("circle")
      .attr("r", radius)
      .attr("fill", d => colorScale(d.subreddit))
      .attr("cx", 0)
      .attr("cy", d => yScale(d.score))
      .call(sel => sel.transition())
        .duration(500)
        .attr("cx", d => xScale(d.comments))
      ,
        

      // + HANDLE UPDATE SELECTION
      update => update
        .call(sel => sel 
          .transition()
          .duration(250)
          .attr("r", radius * 2)
          .transition()
          .duration(250)
          .attr("r", radius) 
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
    }; 
