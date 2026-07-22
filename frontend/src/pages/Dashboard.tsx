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


import LeagueCard
from "./CreateMatch/components/LeagueCard";


import RecentGamesTable
from "../components/RecentGamesTable";





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


                setDashboard(data);


            }



            load();



        },
        []
    );







    if(!dashboard){


        return (


            <div className="p-8">


                Loading dashboard...


            </div>


        );


    }







    return (


        <div className="p-8 space-y-8">





            <div

            className="flex justify-between items-start"

            >



                <div>


                    <h1 className="text-3xl font-bold">


                        Commander Dashboard


                    </h1>




                    <p>


                        Welcome,
                        {" "}
                        {dashboard.player.display_name}


                    </p>


                </div>







                <button


                    className="border px-4 py-2"


                    onClick={()=>


                        navigate(

                            "/matches/create"

                        )


                    }


                >


                    Create Match +


                </button>





            </div>









            <div className="grid grid-cols-4 gap-4">



                <StatCard


                    title="Games Played"


                    value={
                        dashboard.summary.games_played
                    }


                />




                <StatCard


                    title="Wins"


                    value={
                        dashboard.summary.wins
                    }


                />




                <StatCard


                    title="Win Rate"


                    value={
                        `${dashboard.summary.win_rate}%`
                    }


                />




                <StatCard


                    title="Average Finish"


                    value={
                        dashboard.summary.average_finish
                    }


                />



            </div>









            <section>


                <div className="flex justify-between items-center mb-4">


                    <h2 className="text-2xl font-bold">


                        Your Leagues


                    </h2>





                    <div className="flex gap-3">



                        <button


                            className="border px-4 py-2"


                            onClick={()=>


                                navigate(

                                    "/leagues/create"

                                )


                            }


                        >


                            Create League +


                        </button>





                        <button


                            className="border px-4 py-2"


                            onClick={()=>


                                navigate(

                                    "/leagues/join"

                                )


                            }


                        >


                            Join League +


                        </button>



                    </div>


                </div>









                <div className="grid grid-cols-3 gap-4">



                    {


                    dashboard.leagues.map(


                        league =>


                        (


                            <LeagueCard


                                key={

                                    league.league_id
                                }


                                league={league}


                            />


                        )


                    )


                    }



                </div>



            </section>









            <section>


                <h2 className="text-2xl font-bold mb-4">


                    Recent Games


                </h2>





                <RecentGamesTable


                    games={

                        dashboard.recent_games

                    }


                />



            </section>









            <button


                className="border px-4 py-2"


                onClick={logout}


            >


                Logout


            </button>






        </div>


    );


}