export interface LeaguePlayerCommander {

    deck_id: number;

    commander_id: number;

    commander_name: string;

    color_identity?: string;

}

export interface LeaguePlayer {

    player_id: number;

    display_name: string;

    commanders: LeaguePlayerCommander[];

}

export interface MatchPlayerInput {

    player_id: number;

    commander_id: number;

    finish_position: number;

    starting_life?: number;

    ending_life?: number;

}

export interface CreateMatchRequest {

    league_id: number;

    game_length_minutes?: number;

    notes?: string;

    players: MatchPlayerInput[];

}