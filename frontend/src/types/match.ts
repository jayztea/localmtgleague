import type {
    League
}
from "../services/leagueService";

export interface LeaguePlayerCommander {

    deck_id?: number;

    commander_id:number;

    commander_name:string;

    color_identity?:string;

    image_url:string;

}


export interface LeaguePlayer {

    player_id:number;

    display_name:string;

    commanders:LeaguePlayerCommander[];

}



export interface MatchPlayerInput {

    player_id:number;

    commander_id:number;

    finish_position?:number;

    starting_life?:number;

    ending_life?:number;

}



export interface CreateMatchRequest {

    league_id:number;

    game_length_minutes?:number;

    notes?:string;

    players:MatchPlayerInput[];

}

export interface MatchDetailPlayer {

    player_id:number;

    display_name:string;

    finish_position:number;

    deck_id:number;

    commander_id:number;

    commander_name:string;

    color_identity:string;

}



export interface MatchDetails {


    match_id:number;


    league:League;


    match_date:string;


    players:MatchDetailPlayer[];

}