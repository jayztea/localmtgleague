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

## Feature Release & Date
- Feature: Player Statistics - **08/13/2026**
  - Highlights: Best Commander, Best Color, Worst Color. Change to require minimum 2 games in each category instead of 5.
  - Commander Statistics, Color Statistics, Recent Match History created mobile friendly view
- Feature: Add additional views to the league leaderboard, with a dropdown selector. League leaderboard to use card view when in mobile. - **08/10/2026**
- Defect: "Record Match" button in the step 5 of recording match can be selected many times, causing duplicated records being created - **08/07/2026**
- Defect: Update commander data to include missing Spacecraft and "can be you commander" cards - **08/06/2026**
- Feature: League Owner to add players to a league when player is not a registered user - **08/06/2026**
- Feature: Edit and delete match on match details page for league owner and player who created match - **08/05/2026**
- Feature: Player profile details and stats. Select from player list on league page. Select personal stats from Player Icon in top left of Dashboard - **08/03/2026** 

## Feature Backlog

**Upcoming in prioritized order:*

- Feature: Global Navigation & Hamburger menu
  - When user navigates back from page it takes them to the page they were previously on. Currently not working for back when selecting player match from dashboard page
- Feature: Submit feedback form
- Feature: Add ability to have backgrounds & partner commanders
- Feature: Add in season feature for league, default all existing matches in a league to S1
- User Behavior: User creating leagues when league already available. More documentation on what purpose of league versus match is.
- Feature: League Statistics is a bit confusing, it is majorly favorite commander * favorite color. I think it needs to be updated.
- Feature: Complete reset password
- Feature: QR for joining league
- Player Stats V2
  - Achievement badges
  - Win streaks
  - Current streak
  - Lifetime trends
  - Favorite opponents
  - Nemesis (lowest win % against)
  - MVP Commander
  - Most Eliminations
  - Activity calendar (GitHub-style heatmap)
- Feature: Notifications
-   Match edited or deleted
-   Match added
-   Badge earned
- Feature: Admin/League Owner responsibilities
  - Feature: User to claim an unregistered player account from a league
  - Add league owners to a league
- Player Settings
    - Update name
    - Update profile picture
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


