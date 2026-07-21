import React,{useEffect,useState} from "react";


import {
    getLeaguePlayersWithCommanders
}
from "../../../services/leagueService";


import PlayerSelector
from "../components/PlayerSelector";


import type {
    CreateMatchState
}
from "../types";


import type {
    LeaguePlayer
}
from "../../../types/match";




interface Props {


    matchState:CreateMatchState;


    setMatchState:
    React.Dispatch<
        React.SetStateAction<CreateMatchState>
    >;



    nextStep:()=>void;


    previousStep:()=>void;


}




export default function Step2AddPlayers({

    matchState,

    setMatchState,

    nextStep,

    previousStep


}:Props){



    const [
        loading,
        setLoading
    ]
    =
    useState(false);





    useEffect(()=>{


        async function loadPlayers(){


            if(!matchState.league)
                return;



            if(matchState.leaguePlayers.length > 0)
                return;



            try {


                setLoading(true);



                const players:
                LeaguePlayer[] =

                    await getLeaguePlayersWithCommanders(

                        matchState.league.league_id

                    );



                setMatchState({

                    ...matchState,

                    leaguePlayers:players

                });



            }
            catch(error){


                console.error(

                    "FAILED LOADING LEAGUE PLAYERS",

                    error

                );


            }
            finally {


                setLoading(false);


            }


        }



        loadPlayers();



    },[
        matchState.league
    ]);






    const availablePlayers =

        matchState.leaguePlayers.filter(

            player =>


            !matchState.players.some(

                selected =>

                selected.player_id === player.player_id

            )

        );







    return (

        <div

            style={{

                padding:"40px",

                minHeight:"600px",

                display:"flex",

                flexDirection:"column"

            }}

        >


            <h1>
                (2) Add Players
            </h1>



            <p>
                Select players from your league to play in this match
            </p>




            {
                loading &&

                <p>
                    Loading players...
                </p>

            }




            {
                !loading &&


                <PlayerSelector


                    availablePlayers={
                        availablePlayers
                    }



                    selectedPlayers={
                        matchState.players
                    }



                    setAvailablePlayers={
                        ()=>{}
                    }



                    setSelectedPlayers={

                        (players)=>


                        setMatchState({

                            ...matchState,

                            players

                        })

                    }



                />


            }







            <div

                style={{

                    marginTop:"auto",

                    display:"flex",

                    justifyContent:"flex-end",

                    gap:"10px"

                }}

            >


                <button

                    onClick={
                        previousStep
                    }

                >

                    ← Back

                </button>





                <button

                    disabled={
                        matchState.players.length === 0
                    }



                    onClick={
                        nextStep
                    }


                >

                    Next →

                </button>


            </div>


        </div>

    );


}