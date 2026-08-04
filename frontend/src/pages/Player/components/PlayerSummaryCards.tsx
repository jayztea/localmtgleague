import StatCard
from "../../../components/StatCard";


import type {
    PlayerSummaryStatistics
}
from "../../../types/playerStatistics";



interface Props{

    summary:PlayerSummaryStatistics;

}



export default function PlayerSummaryCards({

    summary

}:Props){


    return(

        <section className="player-summary-grid">


            <StatCard

                title="Games Played"

                value={
                    summary.games_played
                }

            />



            <StatCard

                title="Wins"

                value={
                    summary.wins
                }

            />



            <StatCard

                title="Losses"

                value={
                    summary.losses
                }

            />



            <StatCard

                title="Win Rate"

                value={
                    `${summary.win_rate}%`
                }

            />



            <StatCard

                title="Average Finish"

                value={
                    summary.average_finish
                }

            />


        </section>

    );

}