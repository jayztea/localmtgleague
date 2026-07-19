import type {
    League
}
from "../types/dashboard";



interface Props {

    league:League;

}



export default function LeagueCard(
    {
        league
    }:Props
) {


    return (

        <div className="border rounded-lg p-5 shadow-sm">

            <h3 className="text-xl font-bold">

                {league.league_name}

            </h3>


            <p className="text-sm text-gray-500">

                League ID:
                {" "}
                {league.league_id}

            </p>


            <button

                className="mt-4 border px-4 py-2 rounded"

            >

                View League

            </button>


        </div>

    );

}