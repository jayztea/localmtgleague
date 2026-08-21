import type {
    League
} from "../../services/leagueService";

import type {
    LeaguePlayer
} from "../../types/match";

export interface MatchCommander {

    deck_id?: number;

    commander_id: number;

    commander_name: string;

    color_identity?: string;

    image_url?: string;

    type_line?: string | null;

}

export interface MatchPlayer {

    player_id: number;

    display_name: string;

    commanders: MatchCommander[];

    selected_commander_id: number | null;

    selected_secondary_commander_id: number | null;

    placement: number | null;

    ending_life: number | null;

}

export interface CreateMatchState {

    league: League | null;

    leaguePlayers: LeaguePlayer[];

    players: MatchPlayer[];

}