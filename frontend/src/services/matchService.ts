import api from "../api/axios";

import type {
    CreateMatchRequest
} from "../types/match";

export async function createMatch(
    data: CreateMatchRequest
) {

    const response =
        await api.post(
            "/matches",
            data
        );

    return response.data;
}