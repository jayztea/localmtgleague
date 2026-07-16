import * as statisticsRepository
    from "./statisticsRepository";


import * as playerRepository
    from "../repositories/playerRepository";


import {
    calculatePlayerStats
}
from "./calculators/playerStatsCalculator";


import {
    NotFoundError
}
from "../errors/NotFoundError";



export async function getPlayerStatistics(
    playerId:number
) {


    const player =
        await playerRepository.findById(
            playerId
        );


    if (!player) {

        throw new NotFoundError(
            "Player not found."
        );

    }



    const games =
        await statisticsRepository.findPlayerMatchHistory(
            playerId
        );



    const playerStats =
        calculatePlayerStats(
            games
        );



    const favoriteDeck =
        calculateFavoriteDeck(
            games
        );



    const favoriteCommander =
        calculateFavoriteCommander(
            games
        );



    return {

        player_id:
            player.player_id,


        display_name:
            player.display_name,


        summary:
            playerStats,


        favorite_deck:
            favoriteDeck,


        favorite_commander:
            favoriteCommander

    };

}





function calculateFavoriteDeck(
    games:any[]
) {


    const decks:any = {};



    for (const game of games) {


        if (!decks[game.deck_id]) {

            decks[game.deck_id] = {

                deck_id:
                    game.deck_id,

                deck_name:
                    game.deck_name,

                games:0

            };

        }


        decks[game.deck_id].games++;

    }



    return (
        Object.values(decks)
            .sort(
                (a:any,b:any)=>
                    b.games -
                    a.games
            )[0]
        ??
        null
    );

}





function calculateFavoriteCommander(
    games:any[]
) {


    const commanders:any = {};



    for (const game of games) {


        if (!commanders[game.commander_id]) {

            commanders[game.commander_id] = {

                commander_id:
                    game.commander_id,

                commander_name:
                    game.commander_name,

                games:0

            };

        }


        commanders[game.commander_id].games++;

    }



    return (
        Object.values(commanders)
            .sort(
                (a:any,b:any)=>
                    b.games -
                    a.games
            )[0]
        ??
        null
    );

}