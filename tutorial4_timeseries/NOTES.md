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
1. As always fetch upstream, then merge upstream/main into local main branch.
2. After a bit of cleaning, load the data ([original source](https://data.cityofnewyork.us/Business/Charges/5fn4-dr26) for reference later.
3. I tried to do some wrangling, but got caught up in errors...decided I would preprocess the data to make headway, and maybe create a branch with my attempts at wrangling and aggregating.
4. After preprocessing the data, I wanted to get to a point where the svg element is defined, and axes drawn, to see if the scaling is right

## Questions and comments
1. I need to aggregate some of my data for this to work as a line graph. I'm thinking of doing a count of Borough (i.e. number of charges
per borough), then have an x-axis equal to date or maybe month. Wondering if I should do the aggregation in d3. 
2. Is there a reason why we use single quotes when calling the axes attributes?
3. 