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
5. Made adjustments after adding trying to add the dropdown selector values:
a. Make sure that I include all columns I wanted to use in the override function when importing the csv
b. Sorted the array created from the set so there was some sense to it.

## Questions and comments
1. I need to aggregate some of my data for this to work as a line graph. I'm thinking of doing a count of Borough (i.e. number of charges
per borough), then have an x-axis equal to date or maybe month. Wondering if I should do the aggregation in d3. 
2. Is there a reason why we use single quotes when calling the axes attributes?
3. When I'm selecting the options for dropdown, these last two bits seem mysterious `.attr("attr", d => d) .text(d => d)`...
4. It occurs to me that I should probably start saving more const and vars over time.
5. See circa 92 or 98 where I'm hardcoding values for the axis-labels. How can I avoid that? 
6. I used the elipses to append the options to the default text in the dropdown. I'm not sure how that works though?
7. Really struggled with the creation of an area graph...
8. Somehow, I blew away my YAxis on the area chart. I think I'll need to resubmit this next week.