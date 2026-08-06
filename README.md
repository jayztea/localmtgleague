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

## Feature Release w/ date available
- Feature: Edit and delete match on match details page for league owner and player who created match - **08/05/2026**
- Feature: Player profile details and stats. Select from player list on league page. Select personal stats from Player Icon in top left of Dashboard - **08/03/2026** 

## Feature Backlog

**Upcoming in prioritized order:*

- Defect: Missing commander data
  - Consider calling scryfall rest API with commander flag instead of
    - Need to determine if there is a difference between scryfall ID
    - Need to determine if duplicate commander cards exist for the difference in Commander
  -  If rest API will not work, then need to update logic for identifying commanders
- Defect: Update node.js for deprecated package, causing git actions to fail
- Defect: Same commander can be added for a user more than 1 time, need to only allow for a user to add the commander once.
- Feature: Tournaments/non-league
- Defect: "Record Match" button in the step 5 of recording match can be selected many times, causing duplicated records being created
- Feature: Add Average position finish to the leaderboard and make leaderboard sortable.
  - Dropdown to choose view type on leaderboard
  - Defect: Make league leaderboard more mobile friendly, currently getting cutoff in mobile app
- Defect: Player Statistics
  - Highlights: Best Commander, Best Color, Worst Color all not working. (only when 10 or more games played maybe?)
  - Commander Statistics, Color Statistics, Recent Match History are all not mobile friendly tables/views
- Feature: Add ability to have backgrounds & partner commanders
- User Behavior: Players are "creating match" before they complete their match. The "created match" will disappear after a certain amount of time, and token might not have forever persistence. Maybe we need a better workflow.
- User Behavior: User creating leagues when league already available. More documentation on what purpose of league versus match is.
- Feature: Complete reset password
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
- Feature: Global Navigation & Hamburger menu
  - When user navigates back from page it takes them to the page they were previously on. Currently not working for back when selecting player match from dashboard page
- Feature: Notifications
-   Match edited or deleted
-   Match added
-   Badge earned
- Feature: Submit feedback form
- Player Admin Settings
    - Update name
- Feature: Life counter/redesign of record match feature
- Feature: Update League feature
  - Update name
  - Update image, that updates dashboard
  - Season start/end date
- Feature: Tournaments
- Feature: Trends, year over year
- Feature: Email Verification
- AIDLC? DevOps? Vulnerabilities?
- Feature: Display audit/match history on record pages.


