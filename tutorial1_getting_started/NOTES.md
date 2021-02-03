## NOTES
<!--->
-----------
INSTRUCTIONS:
Use this markdown file to keep track of open questions/challenges from this week's assignment.
- What did you have trouble solving?
- What went easier than expected?
- What, if anything, is currently blocking you?

Sometimes it helps to formulate what you understood and where you got stuck in order to move forward. Feel free to include `code snippets`, `screenshots`, and `error message text` here as well.

If you find you're not able complete this week's assignment, reflecting on where you are getting stuck here will help you get full credit for this week's tutorial

------------

--->

### Remember that you're not fetching a specific branch from upstream

I keep issuing the command `git fetch upstream/main`, and getting confused :) 
Need to use `git fetch upstream`, and specify branch when merging.

I haven't had had to use an upstream remote in a professional setting, so this
is new to me.

### PRs in upstream model

In a similar vein, my typical workflow is to branch from main/master for a
feature or bug fix. However, when I tried to PR while working on my fork,
it appears I'm PR'ing the upstream repo. Need to research why. 
