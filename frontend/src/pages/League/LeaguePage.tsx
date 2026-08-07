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


import StepHeader
from "../../components/ui/StepHeader";


import LeagueOverviewCard
from "./components/LeagueOverviewCard";


import LeagueLeaderboard
from "./components/LeagueLeaderboard";


import LeagueRecentMatches
from "./components/LeagueRecentMatches";


import LeagueStatistics
from "./components/LeagueStatistics";


import AddOfflinePlayerModal
from "./components/AddOfflinePlayerModal";


import {
    getLeagueStatistics
}
from "../../services/leagueStatisticsService";


import api
from "../../api/axios";


import {
    useAuth
}
from "../../auth/AuthContext";


import type {
    LeagueStatistics as LeagueStatisticsType
}
from "../../types/leagueStatistics";


import "./LeaguePage.css";



export default function LeaguePage(){


    const navigate =
        useNavigate();



    const {
        leagueId
    }
    =
    useParams();



    const {
        user
    }
    =
    useAuth();




    const [
        statistics,
        setStatistics
    ]
    =
    useState<LeagueStatisticsType | null>(null);



    const [
        league,
        setLeague
    ]
    =
    useState<any>(null);



    const [
        loading,
        setLoading
    ]
    =
    useState(true);



    const [
        showOfflinePlayerModal,
        setShowOfflinePlayerModal
    ]
    =
    useState(false);




    const isLeagueOwner =
        user?.user_id === league?.created_by_user_id;





    async function loadLeague(){

        try{

            if(!leagueId){

                return;

            }



            const leagueResponse =
                await api.get(
                    `/leagues/${leagueId}`
                );


            setLeague(
                leagueResponse.data
            );



            const data =
                await getLeagueStatistics(
                    Number(leagueId)
                );


            setStatistics(
                data
            );


        }
        catch(error){

            console.error(
                error
            );

        }
        finally{

            setLoading(
                false
            );

        }

    }





    useEffect(
        ()=>{

            loadLeague();

        },
        [
            leagueId
        ]
    );





    if(loading){

        return(

            <div className="league-page">

                Loading League...

            </div>

        );

    }





    if(!statistics){

        return(

            <div className="league-page">

                League not found.

            </div>

        );

    }





    return(


        <div className="league-page">



            <StepHeader

                step={0}

                showStep={false}

                title="League"

                description="View league standings, statistics and recent matches."

            />





            <div className="league-header">



                <div>


                    <button

                        className="league-back-button"

                        onClick={()=>{

                            navigate(
                                "/dashboard"
                            );

                        }}

                    >

                        ← Dashboard

                    </button>





                    <h1 className="league-title">


                        {
                            statistics.league.league_name
                        }


                    </h1>





                    <p className="league-code">


                        League Code: {
                            statistics.league.league_code
                        }


                    </p>



                </div>





                <div className="league-actions">



                    {
                        isLeagueOwner &&

                        <button

                            className="league-offline-player-button"

                            onClick={()=>{

                                setShowOfflinePlayerModal(
                                    true
                                );

                            }}

                        >

                            Add Offline Player

                        </button>
                    }





                    <button

                        className="league-create-match-button"

                        onClick={()=>{


                            navigate(

                                `/matches/create?leagueId=${statistics.league.league_id}`

                            );


                        }}

                    >

                        Create Match +

                    </button>



                </div>



            </div>







            <section className="league-overview-grid">



                <LeagueOverviewCard

                    title="Total Matches"

                    value={
                        statistics.overview.total_matches.toString()
                    }

                />





                <LeagueOverviewCard

                    title="Players"

                    value={
                        statistics.overview.total_players.toString()
                    }

                />





                <LeagueOverviewCard

                    title="Average Pod"

                    value={
                        statistics.overview.average_pod_size.toString()
                    }

                />





                <LeagueOverviewCard

                    title="Unique Commanders"

                    value={
                        statistics.overview.unique_commanders.toString()
                    }

                />



            </section>







            <div className="league-content-grid">



                <LeagueLeaderboard

                    leaderboard={
                        statistics.leaderboard
                    }

                />





                <LeagueStatistics

                    highlights={
                        statistics.highlights
                    }

                />



            </div>







            <LeagueRecentMatches

                matches={
                    statistics.recent_matches
                }

            />









            {

                showOfflinePlayerModal &&


                <AddOfflinePlayerModal


                    leagueId={
                        statistics.league.league_id
                    }


                    onClose={()=>{


                        setShowOfflinePlayerModal(
                            false
                        );


                    }}


                    onSuccess={async ()=>{


                        setShowOfflinePlayerModal(
                            false
                        );


                        await loadLeague();


                    }}


                />


            }




        </div>


    );

}