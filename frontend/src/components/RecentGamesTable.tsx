import {
    useNavigate
}
from "react-router-dom";

import type {
    RecentGame
}
from "../types/dashboard";

import "./RecentGamesTable.css";

interface Props{

    games:RecentGame[];

}

export default function RecentGamesTable({

    games

}:Props){

    const navigate =
        useNavigate();

    if(games.length===0){

        return(

            <div className="recent-games-empty">

                No games have been played yet.

            </div>

        );

    }

    return(

        <div className="recent-games-list">

            {

                games.map(game=>(

                    <div

                        key={game.match_id}

                        className="recent-game-card"

                    >

                        <div className="recent-game-content">

                            <div className="recent-game-league">

                                {game.league_name}

                            </div>

                            <div className="recent-game-commander">

                                🃏 {game.commander_name}

                            </div>

                            <div className="recent-game-finish">

                                Finished

                                {" "}

                                <strong>

                                    #{game.finish_position}

                                </strong>

                            </div>

                        </div>

                        <button

                            className="recent-game-button"

                            onClick={()=>

                                navigate(

                                    `/matches/${game.match_id}`

                                )

                            }

                        >

                            View Match →

                        </button>

                    </div>

                ))

            }

        </div>

    );

}