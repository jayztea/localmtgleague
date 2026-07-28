import {
    useNavigate
}
from "react-router-dom";

import "./LeagueDashboardCard.css";


interface League{

    league_id:number;

    league_name:string;

    league_code:string;

    description?:string;

}


interface Props{

    league:League;

}



export default function LeagueDashboardCard({

    league

}:Props){


    const navigate =
        useNavigate();



    return(

        <div

            className="league-dashboard-card"

            onClick={()=>{

                navigate(
                    `/league/${league.league_id}`
                );

            }}

        >

            <div className="league-dashboard-icon">

                🏆

            </div>


            <div className="league-dashboard-content">


                <h3>

                    {league.league_name}

                </h3>


                <div className="league-dashboard-code">

                    League Code:

                    {" "}

                    {league.league_code}

                </div>


                {
                    league.description &&

                    <p>

                        {league.description}

                    </p>

                }


            </div>


            <div className="league-dashboard-arrow">

                →

            </div>


        </div>

    );

}