/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 },
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
d3.csv('../data/nyc_dca_charges_final_cleaned_processed.csv', d3.autoType).then(import_data => {
    console.log("loaded data:", import_data);
    state.data = import_data;
    init();

});

  /* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
function init() {
  // + SCALES

  // + AXES

  // + UI ELEMENT SETUP

  // add in dropdown options from the unique values in the data

  // + SET SELECT ELEMENT'S DEFAULT VALUE (optional)

  // + CREATE SVG ELEMENT

  // + CALL AXES

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
