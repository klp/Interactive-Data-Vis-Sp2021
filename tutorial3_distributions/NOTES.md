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

## Order of operations

1. Import data I found to make scatterplot, added unique_id to each row, and processed timestamp as date (MM/DD/YYYY).
2. Build out init() with xScale, yScale, svg, call axes and create labels

## Issues

1. Had some trouble with the axis drawing. I think I skipped to trying to refactor into reusable consts too early, so defined them with a appends to svg. It turns out I wasn't passing in an array (i.e. using square brackets)
2. Wish I could have gotten the top axis label to be on the left. I abandoned that to complete the brief. Oh well.
3. Really strugged for a while, probably based on scope and executing each function. I'm too used to a complier or interpreter to catch bugs, though vscode and the console are somewhat helpful
4. I ended up riffing on the demo branch for what I'm submitting...

## Post submission changes

1. Changed scales to be logrhythmic...need to think about how these get labeled...