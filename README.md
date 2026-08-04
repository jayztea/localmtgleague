# Local Magic League 

**localmagicleague.com**

A full stack, web application for tracking Magic: The Gathering Commander games with your local "commander league", player statistics, and league rankings. 

## Technology Stack

Frontend:
- React
- TypeScript

Backend:
- Node.js
- Express

Database:
- MySQL

## Project Structure

/frontend - React frontend
/backend - API backend
/database - SQL scripts

## Feature Backlog

Upcoming in prioritized order:
- Player Stats V1
- Defect: Update node.js for depricated package, causing git actions to fail
- Defect: Missing commander data
  - Consider calling scryfall rest API with commander flag instead of
    - Need to determine if there is a difference between scryfall ID
    - Need to determine if duplicate commander cards exist for the difference in Commander
  -  If rest API will not work, then need to update logic for identifying commanders
-  Defect: "Record Match" button in the step 5 of recording match can be selected many times, causing duplicated records being created
-  Defect: Investigate if the same commander can be added to a players decks mmore than once. Then resolve if this is an issue.
-  Investigate: Players are "creating match" before they complete their match. The "created match" will disappear after a certain amount of time, and token might not have forever persistence. Maybe we need a better workflow.
- Feature: Add an edit and delete match features, so that users can edit and delete matches that have already been recorded. We need to restrict to either person who recorded match, or only allow for people within the match, or only allow for league admin. What is the best experience? What is the most secure experience. Can we add notification to users who's matches have been edited/deleted and is that a requirement before we add edit and delete? Should delete be soft delete only? Do we need to add modified date to the tables?
- Reset Password finish
- Defect: Make league leaderboard more mobile friendly, currently getting cutoff
- Player Stats V2
  - 🏆 Achievement badges
  - 📈 Win streaks
  - 🔥 Current streak
  - 📊 Lifetime trends
  - ⭐ Favorite opponents
  - 🎯 Nemesis (lowest win % against)
  - 👑 MVP Commander
  - 💀 Most Eliminations
  - ❤️ Most Played Partner
  - 📅 Activity calendar (GitHub-style heatmap)
- Global Navigation
- Submit feedback form
- Setup AIDLC
- Player Admin Settings
    - Update name
- Life counter/redesign of record match feature
- Update League feature
  - Update name
  - Update image, that updates dashboard
  - Season start/end date
- Add Tournaments
- Trends, year over year


