import type {
    League
} from "../../services/leagueService";


import type {
    LeaguePlayer
}
from "../../types/match";



export interface MatchCommander {

    deck_id?: number;

    commander_id: number;

    commander_name: string;

    color_identity?: string;

    image_url?: string;

}


export interface MatchPlayer {

    player_id:number;

    display_name:string;

    commanders:MatchCommander[];

    selected_commander_id:number | null;

    placement:number | null;

    ending_life:number | null;

}



export interface CreateMatchState {

    league:League | null;

    /**
     * Players available from selected league
     */
    leaguePlayers:LeaguePlayer[];

    /**
     * Players selected for this match
     */
    players:MatchPlayer[];

}