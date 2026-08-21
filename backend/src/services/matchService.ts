import * as matchRepository
from "../repositories/matchRepository";

import * as matchPlayerRepository
from "../repositories/matchPlayerRepository";

import * as playerRepository
from "../repositories/playerRepository";

import * as leaguePlayerRepository
from "../repositories/leaguePlayerRepository";

import * as deckService
from "./deckService";

import {
    CreateMatchDTO
}
from "../dtos/createMatch.dto";

import {
    UpdateMatchDTO
}
from "../dtos/updateMatch.dto";

import {
    UnauthorizedError
}
from "../errors/UnauthorizedError";

import {
    NotFoundError
}
from "../errors/NotFoundError";

import {
    canManageMatch as checkMatchPermission
}
from "./matchPermissionService";

import * as matchAuditRepository
from "../repositories/matchAuditRepository";

export async function createMatch(
    userId: number,
    data: CreateMatchDTO
){

    const submittingPlayer =
        await playerRepository.findByUserId(
            userId
        );

    if(!submittingPlayer){

        throw new UnauthorizedError(
            "Authenticated user does not have a player profile."
        );

    }

    const membership =
        await leaguePlayerRepository.findMembership(
            data.league_id,
            submittingPlayer.player_id
        );

    if(!membership){

        throw new UnauthorizedError(
            "You are not a member of this league."
        );

    }

    for(
        const matchPlayer of data.players
    ){

        const playerMembership =
            await leaguePlayerRepository.findMembership(
                data.league_id,
                matchPlayer.player_id
            );

        if(!playerMembership){

            throw new UnauthorizedError(
                `Player ${matchPlayer.player_id} is not in this league.`
            );

        }

        const deck =
            await deckService.getOrCreateCommanderDeck(
                matchPlayer.player_id,
                matchPlayer.commander_id
            );

        matchPlayer.deck_id =
            deck.deck_id;

    }

    const matchId =
        await matchRepository.createMatch(

            data.league_id,

            submittingPlayer.player_id,

            data.game_length_minutes,

            data.notes

        );

    for(
        const matchPlayer of data.players
    ){

        await matchPlayerRepository.createMatchPlayer({

            match_id:
                matchId,

            player_id:
                matchPlayer.player_id,

            deck_id:
                matchPlayer.deck_id!,

            secondary_commander_id:
                matchPlayer.secondary_commander_id,

            finish_position:
                matchPlayer.finish_position,

            starting_life:
                matchPlayer.starting_life,

            ending_life:
                matchPlayer.ending_life

        });

    }

    return {

        match_id:
            matchId

    };

}

export async function getMatchesByLeague(
    leagueId: number
){

    return await matchRepository.findByLeagueId(
        leagueId
    );

}

export async function canManageMatch(
    matchId: number,
    userId: number
){

    return await checkMatchPermission(
        matchId,
        userId
    );

}

export async function updateMatch(
    userId: number,
    matchId: number,
    data: UpdateMatchDTO
){

    const allowed =
        await checkMatchPermission(
            matchId,
            userId
        );

    if(!allowed){

        throw new UnauthorizedError(
            "You do not have permission to update this match."
        );

    }

    const match =
        await matchRepository.findById(
            matchId
        );

    if(!match){

        throw new NotFoundError(
            "Match not found."
        );

    }

    const player =
        await playerRepository.findByUserId(
            userId
        );

    if(!player){

        throw new UnauthorizedError(
            "Player profile not found."
        );

    }

    const updatedPlayers: Array<{

        player_id:
            number;

        deck_id:
            number;

        secondary_commander_id?:
            number;

        finish_position?:
            number;

        starting_life?:
            number;

        ending_life?:
            number;

    }> = [];

    for(
        const matchPlayer of data.players
    ){

        const deck =
            await deckService.getOrCreateCommanderDeck(

                matchPlayer.player_id,

                matchPlayer.commander_id

            );

        updatedPlayers.push({

            player_id:
                matchPlayer.player_id,

            deck_id:
                deck.deck_id,

            secondary_commander_id:
                matchPlayer.secondary_commander_id,

            finish_position:
                matchPlayer.finish_position,

            starting_life:
                matchPlayer.starting_life,

            ending_life:
                matchPlayer.ending_life

        });

    }

    await matchRepository.updateMatch(

        matchId,

        data.game_length_minutes ?? null,

        data.notes ?? null,

        player.player_id

    );

    const previousPlayers =
        await matchPlayerRepository.findByMatchId(
            matchId
        );

    await matchPlayerRepository.replaceMatchPlayers(

        matchId,

        updatedPlayers

    );

    await matchAuditRepository.createAuditEntry(

        matchId,

        "MATCH_UPDATED",

        player.player_id,

        {

            previous_match:
                match,

            previous_players:
                previousPlayers

        },

        {

            updated_players:
                updatedPlayers

        }

    );

    await matchAuditRepository.createAuditEntry(

        matchId,

        "MATCH_UPDATED",

        player.player_id,

        {

            previous_match:
                match,

            previous_players:
                await matchPlayerRepository.findByMatchId(
                    matchId
                )

        },

        {

            updated_match: {

                game_length_minutes:
                    data.game_length_minutes ?? null,

                notes:
                    data.notes ?? null

            },

            updated_players:
                updatedPlayers

        }

    );

    return {

        match_id:
            matchId

    };

}

export async function deleteMatch(
    userId: number,
    matchId: number
){

    const allowed =
        await checkMatchPermission(
            matchId,
            userId
        );

    if(!allowed){

        throw new UnauthorizedError(
            "You do not have permission to delete this match."
        );

    }

    const match =
        await matchRepository.findById(
            matchId
        );

    if(!match){

        throw new NotFoundError(
            "Match not found."
        );

    }

    const player =
        await playerRepository.findByUserId(
            userId
        );

    if(!player){

        throw new UnauthorizedError(
            "Player profile not found."
        );

    }

    await matchRepository.softDeleteMatch(

        matchId,

        player.player_id

    );

    await matchAuditRepository.createAuditEntry(

        matchId,

        "MATCH_DELETED",

        player.player_id,

        {

            match

        },

        {

            deleted_date:
                new Date()

        }

    );

}