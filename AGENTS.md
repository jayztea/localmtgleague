# Commander League Tracker

## Overview

This is a Magic: The Gathering Commander league tracking application.

The application tracks:
- Players
- Commanders
- Leagues
- Matches
- Match results
- Player statistics

## Backend

Technology:
- Node.js
- Express
- TypeScript
- MySQL

Architecture:

Controller
    ↓
Service
    ↓
Repository
    ↓
Database


## Coding Rules

Always use TypeScript.

Never use `any`.

Controllers should only handle:
- request validation
- calling services
- returning responses


Services contain:
- business logic
- calculations
- orchestration


Repositories contain:
- SQL queries
- database access


## Database

Use MySQL.

Always parameterize SQL queries.

Never place SQL directly in controllers.

## API

All endpoints should:
- validate input
- return consistent responses
- handle errors properly

## Changes

Before making large changes:
- inspect existing patterns
- follow existing naming conventions
- avoid unnecessary refactoring