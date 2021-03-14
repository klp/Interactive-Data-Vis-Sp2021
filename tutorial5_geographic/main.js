/**
 * CONSTANTS AND GLOBALS
 * */
const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 };

/** these variables allow us to access anything we manipulate in
 * init() but need access to in draw().
 * All these variables are empty before we assign something to them.*/
let svg;

/**
 * APPLICATION STATE
 * */
let state = {
  // + SET UP STATE
  geojson: null,
  points: null,
  hover: {
    screenPosition: null, // will be array with x/y coorindates when covering?
    mapPosition: null,    // array of long and lat
    visible: false,       // we're just setting these up to be manipulated later
  },
  
};

/**
 * LOAD DATA
 * Using a Promise.all([]), we can load more than one dataset at a time
 * */
Promise.all([
  d3.json("../data/usState.json"),
  d3.csv("../data/usHeatExtremes.csv", d3.autoType),
]).then(([geojson, data]) => {
  // + SET STATE WITH DATA
  state.geojson = geojson
  state.points = data
  console.log("state: ", state);
  init();
});

/**
 * INITIALIZING FUNCTION
 * this will be run *one time* when the data finishes loading in
 * */
function init() {
  // create an svg element in our main `d3-container` element
  svg = d3
    .select("#d3-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // + SET UP PROJECTION...this is like setting the scale with domain/range
  const project = d3.geoAlbersUsa()
    .fitSize ([
      width-margin.left - margin.right,
      height - margin.top - margin.bottom
    ], state.geojson)
  // + SET UP GEOPATH
  const path = d3.geoPath(project)

  // + DRAW BASE MAP PATH
  const states = svg.selectAll("path.states")
    .data(state.geojson.features)
    .join("path")
    .attr("class", 'states')
    .attr("stroke", "darkgrey")
    .attr("fill", "transparent")
    .attr ("d", path)

  // + Draw points on map
  const dot = svg 
  .selectAll("circle.point")
  .data(state.data)
  .join("circle")
  .attr("fill", "green")
  .attr("r", 5)
  .attr("transform", d => {
    const [x, y] = project([d.Long, d.Lat])
    return `translate(${x}, ${y})`
  })
  // + ADD EVENT LISTENERS (if you want)


  draw(); // calls the draw function
}

/**
 * DRAW FUNCTION
 * we call this everytime there is an update to the data/state
 * */
function draw() {
  d3.select("#d3-container")
    .selectAll('div.tooltip')
    .data[state.hover]
    .attr("class", 'tooltip')
    .classed("visible", d => d.visible)
    .style("transform")
    .style("position", 'absolute')
}
