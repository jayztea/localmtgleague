import * as matchRepository
    from "../repositories/matchRepository";

import * as matchPlayerRepository
    from "../repositories/matchPlayerRepository";

import * as playerRepository
    from "../repositories/playerRepository";

import * as deckRepository
    from "../repositories/deckRepository";

import * as leaguePlayerRepository
    from "../repositories/leaguePlayerRepository";

import { CreateMatchDTO } 
    from "../dtos/createMatch.dto";

import { NotFoundError } 
    from "../errors/NotFoundError";

import { UnauthorizedError }
    from "../errors/UnauthorizedError";



export async function createMatch(
    userId: number,
    data: CreateMatchDTO
) {


    /*
        Convert authenticated user
        into player
    */

    const submittingPlayer =
        await playerRepository.findByUserId(
            userId
        );


    if (!submittingPlayer) {

        throw new UnauthorizedError(
            "Authenticated user does not have a player profile."
        );

    }



    /*
        Verify submitting player
        belongs to league
    */


    const membership =
        await leaguePlayerRepository.findMembership(
            data.league_id,
            submittingPlayer.player_id
        );


    if (!membership) {

        throw new UnauthorizedError(
            "You are not a member of this league."
        );

    }



    /*
        Verify every submitted deck
        belongs to its player
    */


    for (const matchPlayer of data.players) {


        const deck =
            await deckRepository.findById(
                matchPlayer.deck_id
            );


        if (!deck) {

            throw new NotFoundError(
                `Deck ${matchPlayer.deck_id} not found.`
            );

        }


        if (
            deck.player_id !== matchPlayer.player_id
        ) {

            throw new UnauthorizedError(
                "A player cannot use another player's deck."
            );

        }


        const playerMembership =
            await leaguePlayerRepository.findMembership(
                data.league_id,
                matchPlayer.player_id
            );


        if (!playerMembership) {

            throw new UnauthorizedError(
                `Player ${matchPlayer.player_id} is not in this league.`
            );

        }

    }



    /*
        Create match
    */


    const matchId =
        await matchRepository.createMatch(
            data.league_id,
            submittingPlayer.player_id,
            data.game_length_minutes,
            data.notes
        );



    /*
        Create match participants
    */


    for (const matchPlayer of data.players) {


        await matchPlayerRepository.createMatchPlayer(
            {
                match_id: matchId,

                player_id:
                    matchPlayer.player_id,

                deck_id:
                    matchPlayer.deck_id,

                finish_position:
                    matchPlayer.finish_position,

                starting_life:
                    matchPlayer.starting_life,

                ending_life:
                    matchPlayer.ending_life
            }
        );

    }



    return {
        match_id: matchId
    };

}
export async function getMatchesByLeague(
    leagueId:number
) {


    const matches =
        await matchRepository.findByLeagueId(
            leagueId
        );


    return matches;

}