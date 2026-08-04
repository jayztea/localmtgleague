import type {
    PlayerStatisticsHighlights
}
from "../../../types/playerStatistics";

import "./PlayerHighlights.css";

interface Props{

    highlights:PlayerStatisticsHighlights;

}

export default function PlayerHighlights({

    highlights

}:Props){

    function renderValue(
        value:string | null | undefined
    ){

        return value ?? "—";

    }

    return(

        <section className="player-section">

            <h2>

                Highlights

            </h2>

            <div className="player-highlights-grid">

                <div className="player-highlight-card">

                    <span className="player-highlight-label">

                        Most Played Commander

                    </span>

                    <h3>

                        {

                            renderValue(

                                highlights.most_played_commander
                                    ?.commander_name

                            )

                        }

                    </h3>

                </div>

                <div className="player-highlight-card">

                    <span className="player-highlight-label">

                        Best Commander

                    </span>

                    <h3>

                        {

                            renderValue(

                                highlights.best_commander
                                    ?.commander_name

                            )

                        }

                    </h3>

                    {

                        highlights.best_commander &&

                        <p>

                            {

                                highlights.best_commander
                                    .win_rate

                            }%

                            {" "}Win Rate

                        </p>

                    }

                </div>

                <div className="player-highlight-card">

                    <span className="player-highlight-label">

                        Best Color

                    </span>

                    <h3>

                        {

                            renderValue(

                                highlights.best_color
                                    ?.color_identity

                            )

                        }

                    </h3>

                    {

                        highlights.best_color &&

                        <p>

                            {

                                highlights.best_color
                                    .win_rate

                            }%

                            {" "}Win Rate

                        </p>

                    }

                </div>

                <div className="player-highlight-card">

                    <span className="player-highlight-label">

                        Worst Color

                    </span>

                    <h3>

                        {

                            renderValue(

                                highlights.worst_color
                                    ?.color_identity

                            )

                        }

                    </h3>

                    {

                        highlights.worst_color &&

                        <p>

                            {

                                highlights.worst_color
                                    .win_rate

                            }%

                            {" "}Win Rate

                        </p>

                    }

                </div>

            </div>

        </section>

    );

}