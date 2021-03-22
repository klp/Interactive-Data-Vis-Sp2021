/**
 * CONSTANTS AND GLOBALS
 * */
const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 };

let svg;
let tooltip;

/**
 * APPLICATION STATE
 * */
let state = {
  // + INITIALIZE STATE
  data: null,
  hover: null
};

/**
 * LOAD DATA
 * */
d3.json("../../data/flare.json", d3.autotype).then(data => {
  state.data = data;
  init();
});

/**
 * INITIALIZING FUNCTION
 * this will be run *one time* when the data finishes loading in
 * */
function init() {
  const colorScale = d3.scaleOrdinal(d3.schemeTableau10);
  const container = d3.select("#d3-container").style("position", "relative");
  

  svg = container
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // + INITIALIZE TOOLTIP IN YOUR CONTAINER ELEMENT

  // + CREATE YOUR ROOT HIERARCHY NODE
  const root = d3.hierarchy(state.data)
    .sum(d => d.value)
    .sort((x, y) => y.value - x.value);

  // + CREATE YOUR LAYOUT GENERATOR
  const treeLayout = d3.treemap()
    .size(
      [ width - margin.left - margin.right,
        height - margin.top - margin.bottom
      ]
    )
    .round(true)
  
    // + CALL YOUR LAYOUT FUNCTION ON YOUR ROOT DATA
  const tree = treeLayout(root)
  const leaves = tree.leaves()
 
  // + CREATE YOUR GRAPHICAL ELEMENTS
  const groups = svg 
      .selectAll(".leaf")
      .data(leaves)
      .join("g")
      .attr("class", "leaf")
      .attr("transform", d => `translate(${d.x0}, ${d.y0})`)

  // append shapes
  groups.append("rect")
      .attr("height", d => d.y1 - d.y0)
      .attr("width", d => d.x1 - d.x0)
      .attr("fill", d => {
        const previousAncestor = d.ancestors().find(d => d.depth === 1);
        return colorScale(previousAncestor.data.name);
        }
      )


  draw(); // calls the draw function
}

/**
 * DRAW FUNCTION
 * we call this everytime there is an update to the data/state
 * */
function draw() {
  // + UPDATE TOOLTIP
}
