export interface PlayerProfile {

    player_id:number;

    display_name:string;

}


export interface PlayerSummaryStatistics {

    games_played:number;

    wins:number;

    losses:number;

    win_rate:number;

    average_finish:number;

}


export interface PlayerCommanderStatistics {

    commander_id:number;

    commander_name:string;

    games_played:number;

    wins:number;

    losses:number;

    win_rate:number;

}


export interface PlayerColorStatistics {

    color_identity:string;

    games_played:number;

    wins:number;

    losses:number;

    win_rate:number;

}


export interface PlayerStatisticsHighlights {

    most_played_commander:
        PlayerCommanderStatistics | null;


    best_commander:
        PlayerCommanderStatistics | null;


    best_color:
        PlayerColorStatistics | null;


    worst_color:
        PlayerColorStatistics | null;

}


export interface PlayerStatistics {


    player:PlayerProfile;


    summary:PlayerSummaryStatistics;


    highlights:PlayerStatisticsHighlights;


    commander_stats:
        PlayerCommanderStatistics[];


    color_stats:
        PlayerColorStatistics[];

    recent_matches: 
        PlayerMatchHistory[];

}

export interface PlayerMatchHistory {

    match_player_id:number;

    match_id:number;

    match_date:string;

    finish_position:number;

    deck_id:number;

    deck_name:string;

    color_identity:string | null;

    commander_id:number;

    commander_name:string;

}