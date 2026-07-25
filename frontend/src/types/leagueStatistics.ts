export interface LeagueInfo {

    league_id:number;

    league_name:string;

    league_code:string;

}



export interface LeagueOverview {

    total_matches:number;

    total_players:number;

    unique_commanders:number;

    average_pod_size:number;

}



export interface LeagueLeaderboardEntry {

    player_id:number;

    display_name:string;

    games_played:number;

    wins:number;

    losses:number;

    win_rate:number;

    average_finish:number;

}



export interface CommanderHighlight {

    commander_id:number;

    commander_name:string;

    games_played:number;

    wins:number;

    losses:number;

    win_rate:number;

}



export interface ColorHighlight {

    color_identity:string;

    games_played:number;

    wins:number;

    losses:number;

    win_rate:number;

}



export interface LeagueHighlights {

    most_played_commander:
        CommanderHighlight | null;


    favorite_color:
        ColorHighlight | null;

}



export interface RecentLeagueMatch {

    match_id:number;

    match_date:string;

    winner_name:string;

    players:string;

}



export interface LeagueStatistics {

    league:LeagueInfo;


    overview:LeagueOverview;


    leaderboard:
        LeagueLeaderboardEntry[];


    highlights:
        LeagueHighlights;


    recent_matches:
        RecentLeagueMatch[];

}