import {
    useEffect,
    useState
}
from "react";


import {
    useNavigate
}
from "react-router-dom";


import {
    useAuth
}
from "../auth/AuthContext";


import {
    getDashboard
}
from "../services/dashboardService";


import type {
    Dashboard as DashboardType
}
from "../types/dashboard";


import StatCard
from "../components/StatCard";


import RecentGamesTable
from "../components/RecentGamesTable";


import LeagueDashboardCard
from "../components/LeagueDashboardCard";


import defaultPlayerAvatar
from "../styles/assets/avatars/default-player.png";


import "./Dashboard.css";



export default function Dashboard(){


    const {
        logout
    } =
    useAuth();



    const navigate =
        useNavigate();



    const [
        dashboard,
        setDashboard
    ] =
    useState<DashboardType | null>(null);



    useEffect(
        ()=>{

            async function load(){

                const data =
                    await getDashboard();

                setDashboard(
                    data
                );

            }

            load();

        },
        []
    );



    if(!dashboard){

        return(

            <div className="dashboard-page">

                Loading dashboard...

            </div>

        );

    }



    return(

        <div className="dashboard-page">



            <div className="dashboard-header">



                <div className="dashboard-profile-section">



                    <button

                        className="dashboard-avatar-button"

                        onClick={()=>navigate(

                            `/player/${dashboard.player.player_id}`

                        )}

                        aria-label="View player statistics"

                    >

                        <img

                            src={defaultPlayerAvatar}

                            alt="Player profile"

                            className="dashboard-avatar"

                        />

                    </button>



                    <div>


                        <h1 className="dashboard-title">

                            Commander Dashboard

                        </h1>



                        <p className="dashboard-subtitle">

                            Welcome,
                            {" "}
                            {dashboard.player.display_name}

                        </p>


                    </div>



                </div>




                {
                    dashboard.leagues.length > 0 &&

                    <button

                        className="dashboard-button"

                        onClick={()=>navigate(

                            "/matches/create"

                        )}

                    >

                        Create Match +

                    </button>

                }



            </div>




            <section className="dashboard-stat-grid">



                <StatCard

                    title="Games Played"

                    value={dashboard.summary.games_played}

                />



                <StatCard

                    title="Games Won"

                    value={dashboard.summary.wins}

                />



                <StatCard

                    title="Win Rate"

                    value={`${dashboard.summary.win_rate}%`}

                />



                <StatCard

                    title="Average Finish"

                    value={dashboard.summary.average_finish}

                />



            </section>





            <section className="dashboard-section">



                <div className="dashboard-section-header">



                    <h2>

                        Your Leagues

                    </h2>



                    <div className="dashboard-actions">



                        <button

                            className="dashboard-button"

                            onClick={()=>navigate(

                                "/leagues/create"

                            )}

                        >

                            Create League +

                        </button>




                        <button

                            className="dashboard-button"

                            onClick={()=>navigate(

                                "/leagues/join"

                            )}

                        >

                            Join League +

                        </button>



                    </div>



                </div>




                {
                    dashboard.leagues.length === 0

                    ?

                    <div className="dashboard-empty">

                        You haven't joined any leagues yet.

                    </div>

                    :

                    <div className="dashboard-league-grid">


                        {

                            dashboard.leagues.map(

                                league=>(

                                    <LeagueDashboardCard

                                        key={league.league_id}

                                        league={league}

                                    />

                                )

                            )

                        }


                    </div>

                }



            </section>





            <section className="dashboard-section">



                <h2>

                    Recent Games

                </h2>



                <RecentGamesTable

                    games={dashboard.recent_games}

                />



            </section>





            <button

                className="dashboard-logout"

                onClick={logout}

            >

                Logout

            </button>




        </div>

    );

}