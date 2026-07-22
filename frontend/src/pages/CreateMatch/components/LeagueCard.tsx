import "../CreateMatch.css";



interface League {

    league_id: number;

    league_name: string;

    league_code: string;

}



interface LeagueCardProps {

    league: League;

    selected: boolean;

    onSelect: (league: League) => void;

}







export default function LeagueCard({


    league,


    selected,


    onSelect


}: LeagueCardProps) {



    return (



        <div


            className={`league-card ${selected ? "selected" : ""}`}


            onClick={() => onSelect(league)}


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