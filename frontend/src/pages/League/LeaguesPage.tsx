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
    getDashboard
}
from "../../services/dashboardService";

import type {
    Dashboard as DashboardType
}
from "../../types/dashboard";

import LeagueDashboardCard
from "../../components/LeagueDashboardCard";

import "./LeaguesPage.css";


export default function LeaguesPage(){

    const navigate =
        useNavigate();


    const [
        dashboard,
        setDashboard
    ] =
    useState<DashboardType | null>(null);


    const [
        error,
        setError
    ] =
    useState(false);


    useEffect(
        ()=>{

            async function load(){

                try{

                    const data =
                        await getDashboard();

                    setDashboard(
                        data
                    );

                }
                catch(error){

                    console.error(
                        "Failed to load leagues:",
                        error
                    );

                    setError(true);

                }

            }


            load();

        },
        []
    );


    if(!dashboard && !error){

        return(

            <div className="leagues-page">

                <div className="leagues-page-loading">

                    Loading leagues...

                </div>

            </div>

        );

    }


    if(error){

        return(

            <div className="leagues-page">

                <div className="leagues-page-error">

                    Unable to load your leagues.

                </div>

            </div>

        );

    }


    return(

        <div className="leagues-page">


            <div className="leagues-page-header">


                <div>

                    <h1 className="leagues-page-title">

                        My Leagues

                    </h1>


                    <p className="leagues-page-subtitle">

                        View the leagues you belong to and manage your league participation.

                    </p>

                </div>


                <div className="leagues-page-actions">


                    <button

                        type="button"

                        className="leagues-page-button"

                        onClick={()=>navigate(
                            "/leagues/create"
                        )}

                    >

                        Create League +

                    </button>


                    <button

                        type="button"

                        className="leagues-page-button"

                        onClick={()=>navigate(
                            "/leagues/join"
                        )}

                    >

                        Join League +

                    </button>


                </div>


            </div>


            {
                dashboard &&

                dashboard.leagues.length === 0

                ?

                <div className="leagues-page-empty">

                    <h2>

                        You haven't joined any leagues yet.

                    </h2>


                    <p>

                        Create a new league or join an existing league to get started.

                    </p>


                    <div className="leagues-page-empty-actions">


                        <button

                            type="button"

                            className="leagues-page-button"

                            onClick={()=>navigate(
                                "/leagues/create"
                            )}

                        >

                            Create League +

                        </button>


                        <button

                            type="button"

                            className="leagues-page-button"

                            onClick={()=>navigate(
                                "/leagues/join"
                            )}

                        >

                            Join League +

                        </button>


                    </div>


                </div>

                :

                dashboard &&

                <div className="leagues-page-grid">

                    {

                        dashboard.leagues.map(

                            league => (

                                <LeagueDashboardCard

                                    key={
                                        league.league_id
                                    }

                                    league={
                                        league
                                    }

                                />

                            )

                        )

                    }

                </div>

            }


        </div>

    );

}