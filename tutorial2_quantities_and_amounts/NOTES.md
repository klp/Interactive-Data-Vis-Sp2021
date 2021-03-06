## NOTES

-----------
INSTRUCTIONS:
Use this markdown file to keep track of open questions/challenges from this week's assignment.
- What did you have trouble solving?
- What went easier than expected?
- What, if anything, is currently blocking you?

Sometimes it helps to formulate what you understood and where you got stuck in order to move forward. Feel free to include `code snippets`, `screenshots`, and `error message text` here as well.

If you find you're not able complete this week's assignment, reflecting on where you are getting stuck here will help you get full credit for this week's tutorial

------------

## Order of approach

This second of notes represents the order of steps by which I approached Tutorial 2: Quantities and Amounts.

### Prep/SCM

1. Fetch upstream `git fetch upstream`, then merge upstream/main into my main branch with `git merge upstream/main`.
1. Start the index with Live Server to see changes as I save files.

### Prepping the data

I downloaded a [csv of top wines from Kaggel](https://www.kaggle.com/zynicide/wine-reviews?select=winemag-data_first150k.csv), and created a simple csv with country and count from that list for simplicity's sake, and not being familiar with how to aggregate with JS.

### Initial design

1. Bring in data with d3
1. Set your x and y scale
1. Create element in which to draw the chart
1. Draw the chart
1. Label the chart

At this point, I kinda jammed, sorting through padding/spacing issues. Forgot to document :( .

## Questions

1. Do data visualizers typically work with aggregated data, or are there JS libraries that can aggregate rawer data without too much of a performance hit?
1. I need to review the labeling a bit to understand it better. I made adjustments from the demo, so I have some sense of how it works, but not enough to explain it.
1. I'm interested in conditionally coloring the count labels based where they show up. In the right most bar (Chile), I have a bit of trouble reading the count value. 
1. I still haven't quite absorbed the box-model