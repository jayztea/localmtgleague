export interface PlayerMatchHistory {

    match_player_id: number;

    match_id: number;

    match_date: Date;

    finish_position: number;

    deck_id: number;

    deck_name: string;

    color_identity: string | null;

    commander_id: number;

    commander_name: string;

}



export interface SummaryStatistics {

    games_played: number;

    wins: number;

    losses: number;

    win_rate: number;

    average_finish: number;

}



export interface CommanderStatistics {

    commander_id: number;

    commander_name: string;

    games_played: number;

    wins: number;

    losses: number;

    win_rate: number;

}



export interface ColorStatistics {

    color_identity: string;

    games_played: number;

    wins: number;

    losses: number;

    win_rate: number;

}

export interface Player {

    player_id:number;

    display_name:string;

}
