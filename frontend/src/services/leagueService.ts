import api from "../api/axios";

import type {
    LeaguePlayer
} from "../types/match";

export async function getLeaguePlayersWithCommanders(
    leagueId: number
) {

    const response =
        await api.get<LeaguePlayer[]>(
            `/leagues/${leagueId}/players-with-commanders`
        );

    return response.data;
}