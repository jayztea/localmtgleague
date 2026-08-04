import {
    useEffect,
    useState
}
from "react";


import {
    useNavigate,
    useParams
}
from "react-router-dom";


import {
    getPlayerStatistics
}
from "../../services/playerStatisticsService";


import type {
    PlayerStatistics
}
from "../../types/playerStatistics";


import PlayerHeader
from "./components/PlayerHeader";


import PlayerSummaryCards
from "./components/PlayerSummaryCards";


import PlayerHighlights
from "./components/PlayerHighlights";


import PlayerCommanderStatistics
from "./components/PlayerCommanderStatistics";


import PlayerColorStatistics
from "./components/PlayerColorStatistics";


import PlayerRecentMatches
from "./components/PlayerRecentMatches";


import "./PlayerPage.css";



export default function PlayerPage(){


    const navigate =
        useNavigate();



    const {
        playerId
    } =
    useParams();



    const [
        statistics,
        setStatistics
    ] =
    useState<PlayerStatistics | null>(
        null
    );



    const [
        loading,
        setLoading
    ] =
    useState(true);



    const [
        error,
        setError
    ] =
    useState<string | null>(
        null
    );



    useEffect(

        ()=>{


            async function load(){


                try{


                    if(!playerId){

                        setError(
                            "Player ID missing."
                        );

                        return;

                    }



                    const data =
                        await getPlayerStatistics(

                            Number(playerId)

                        );



                    setStatistics(
                        data
                    );


                }
                catch(error){


                    console.error(
                        error
                    );


                    setError(
                        "Unable to load player statistics."
                    );


                }
                finally{


                    setLoading(
                        false
                    );


                }


            }



            load();


        },

        [
            playerId
        ]

    );



    if(loading){

        return(

            <div className="player-page">

                <div className="player-error">

                    Loading player profile...

                </div>

            </div>

        );

    }



    if(error || !statistics){

        return(

            <div className="player-page">

                <div className="player-error">

                    <p>

                        {
                            error ??
                            "Player not found."
                        }

                    </p>


                    <button

                        className="player-back-button"

                        onClick={()=>navigate("/dashboard")}

                    >

                        ← Back to Dashboard

                    </button>


                </div>

            </div>

        );

    }


    return(

        <div className="player-page">


            <PlayerHeader

                player={
                    statistics.player
                }

                summary={
                    statistics.summary
                }

                onBack={
                    ()=>navigate(-1)
                }

            />



            <PlayerSummaryCards

                summary={
                    statistics.summary
                }

            />



            <PlayerHighlights

                highlights={
                    statistics.highlights
                }

            />



            <PlayerCommanderStatistics

                commanders={
                    statistics.commander_stats ?? []
                }

            />



            <PlayerColorStatistics

                colors={
                    statistics.color_stats ?? []
                }

            />



            <PlayerRecentMatches

                matches={
                    statistics.recent_matches ?? []
                }

            />


        </div>

    );

}