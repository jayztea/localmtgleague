import * as leagueRepository from "../repositories/leagueRepository";
import * as leaguePlayerRepository from "../repositories/leaguePlayerRepository";
import * as userRepository from "../repositories/userRepository";
import * as playerRepository from "../repositories/playerRepository";

import { ConflictError } from "../errors/ConflictError";
import { NotFoundError } from "../errors/NotFoundError";

export async function addPlayerToLeague(
    leagueId: number,
    emailAddress: string
) {

    const league =
        await leagueRepository.findById(
            leagueId
        );

    if (!league) {
        throw new NotFoundError(
            "League not found."
        );
    }

    const user =
        await userRepository.findByEmail(
            emailAddress
        );

    if (!user) {
        throw new NotFoundError(
            "User not found."
        );
    }

    const player =
        await playerRepository.findByUserId(
            user.user_id
        );

    if (!player) {
        throw new NotFoundError(
            "Player profile not found."
        );
    }

    const membership =
        await leaguePlayerRepository.findMembership(
            leagueId,
            player.player_id
        );

    if (membership) {
        throw new ConflictError(
            "Player is already a member of this league."
        );
    }

    const leaguePlayerId =
        await leaguePlayerRepository.addPlayerToLeague(
            leagueId,
            player.player_id
        );

    return {

        league_player_id: leaguePlayerId,

        player: {

            player_id: player.player_id,

            display_name: player.display_name

        }

    };

}

export async function getLeaguePlayers(
    leagueId: number
) {

    return await leaguePlayerRepository.findPlayersByLeague(
        leagueId
    );

}

export async function removePlayer(
    leagueId: number,
    playerId: number
) {

    const membership =
        await leaguePlayerRepository.findMembership(
            leagueId,
            playerId
        );

    if (!membership) {
        throw new NotFoundError(
            "Player is not a member of this league."
        );
    }

    await leaguePlayerRepository.removePlayer(
        leagueId,
        playerId
    );

}