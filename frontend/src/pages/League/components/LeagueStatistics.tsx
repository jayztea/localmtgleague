import type {
    LeagueHighlights
}
from "../../../types/leagueStatistics";

interface Props{

    highlights?: LeagueHighlights;

}

interface LeagueStatistic{

    label:string;

    value:string;

}

export default function LeagueStatistics({

    highlights

}:Props){

    const statistics:LeagueStatistic[] = [

        {

            label:"Top Commander",

            value:

                highlights?.most_played_commander?.commander_name

                ??

                "-"

        },

        {

            label:"Favorite Color",

            value:

                highlights?.favorite_color?.color_identity

                ??

                "-"

        },

        {

            label:"Commander Games",

            value:

                highlights?.most_played_commander

                    ?

                    `${highlights.most_played_commander.games_played} Games`

                    :

                    "-"

        },

        {

            label:"Commander Win Rate",

            value:

                highlights?.most_played_commander

                    ?

                    `${highlights.most_played_commander.win_rate}%`

                    :

                    "-"

        }

    ];

    return(

        <section className="league-section-card">

            <h2 className="league-section-title">

                League Statistics

            </h2>

            {

                statistics.map(stat=>(

                    <div

                        key={stat.label}

                        className="league-stat"

                    >

                        <div className="league-stat-label">

                            {stat.label}

                        </div>

                        <div className="league-stat-value">

                            {stat.value}

                        </div>

                    </div>

                ))

            }

        </section>

    );

}