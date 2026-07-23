import "../pages/CreateMatch/CreateMatch.css";


interface League {


    league_id:number;


    league_name:string;


    league_code:string;


    description?:string;


}



interface Props {


    league:League;


}



export default function LeagueDashboardCard({

    league

}:Props){


    return (


        <div

            className="league-card"

        >


            <div className="league-image">


                🏆


            </div>




            <div className="league-title">


                {league.league_name}


            </div>




            <div className="league-id">


                League Code: {league.league_code}


            </div>



        </div>


    );


}