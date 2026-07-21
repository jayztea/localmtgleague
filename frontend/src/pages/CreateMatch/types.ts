import type {
    League
} from "../../services/leagueService";



export interface MatchCommander {


    deck_id?:number;


    commander_id:number;


    commander_name:string;


    color_identity?:string;


}



export interface MatchPlayer {


    league_player_id:number;


    league_id:number;


    player_id:number;


    display_name:string;


    league_role:string;


    status:"ACTIVE" | "INACTIVE";


    joined_date:Date;


    left_date:Date | null;



    commanders:MatchCommander[];



    selected_commander_id:number | null;



    placement:number | null;


}




export interface CreateMatchState {


    league:League | null;



    leaguePlayers:MatchPlayer[];



    players:MatchPlayer[];


}