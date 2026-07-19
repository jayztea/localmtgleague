import * as dashboardRepository
    from "../repositories/dashboardRepository";

import * as playerRepository
    from "../repositories/playerRepository";

import * as leaguePlayerRepository
    from "../repositories/leaguePlayerRepository";

import {
    NotFoundError
}
from "../errors/NotFoundError";

import {
    UnauthorizedError
}
from "../errors/UnauthorizedError";



export async function getDashboard(
    userId:number
) {

    const player =
        await playerRepository.findByUserId(
            userId
        );

    if (!player) {

        throw new NotFoundError(
            "Player profile not found."
        );

    }

    const summary =
        await dashboardRepository.findPlayerDashboardSummary(
            player.player_id
        );

    const recentGames =
        await dashboardRepository.findRecentGames(
            player.player_id
        );

    const leagues =
        await dashboardRepository.findPlayerLeagues(
            player.player_id
        );

    return {

        player: {

            player_id:
                player.player_id,

            display_name:
                player.display_name

        },

        summary,

        recent_games:
            recentGames,

        leagues

    };

}



export async function getLeagueDashboard(
    userId:number,
    leagueId:number
) {

    const player =
        await playerRepository.findByUserId(
            userId
        );

    if (!player) {

        throw new NotFoundError(
            "Player profile not found."
        );

    }

    const membership =
        await leaguePlayerRepository.findActiveMembership(
            leagueId,
            player.player_id
        );

    if (!membership) {

        throw new UnauthorizedError(
            "You are not a member of this league."
        );

    }

    const leaderboard =
        await dashboardRepository.findLeagueLeaderboard(
            leagueId
        );

    const recentGames =
        await dashboardRepository.findLeagueRecentGames(
            leagueId
        );

    const playerStats =
        await dashboardRepository.findLeaguePlayerSummary(
            leagueId,
            player.player_id
        );

    return {

        league_id:
            leagueId,

        player_summary:
            playerStats,

        leaderboard,

        recent_games:
            recentGames

    };

}