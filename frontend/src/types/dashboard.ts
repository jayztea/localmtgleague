export interface Dashboard {

    player: {

        player_id:number;

        display_name:string;

    };

    summary: {

        games_played:number;

        wins:number;

        losses:number;

        win_rate:number;

        average_finish:number;

    };

    recent_games: RecentGame[];

    leagues: League[];

}



export interface RecentGame {

    match_id:number;

    league_name:string;

    commander_name:string;

    finish_position:number;

    match_date:string;

}



export interface League {

    league_id:number;

    league_name:string;

    league_code:string;

}