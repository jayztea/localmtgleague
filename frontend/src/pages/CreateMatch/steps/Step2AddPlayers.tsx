import {
    useEffect,
    useMemo,
    useState
}
from "react";


import {
    getLeaguePlayersWithCommanders
}
from "../../../services/leagueService";


import PlayerSelector
from "../components/PlayerSelector";


import StepHeader
from "../../../components/ui/StepHeader";


import StepNavigation
from "../components/StepNavigation";


import type {
    CreateMatchState,
    MatchPlayer
}
from "../types";


import type {
    LeaguePlayer
}
from "../../../types/match";



interface Props {

    matchState: CreateMatchState;

    setMatchState:
    React.Dispatch<
        React.SetStateAction<CreateMatchState>
    >;

    nextStep: () => void;

    previousStep: () => void;

    cancelMatch: () => void;

}



export default function Step2AddPlayers({

    matchState,

    setMatchState,

    nextStep,

    previousStep,

    cancelMatch

}: Props){

    const [
        loading,
        setLoading
    ] =
    useState(false);



    useEffect(()=>{

        async function loadPlayers(){

            if(!matchState.league)

                return;


            if(matchState.leaguePlayers.length > 0)

                return;


            try{

                setLoading(true);


                const players:

                LeaguePlayer[] =

                    await getLeaguePlayersWithCommanders(

                        matchState.league.league_id

                    );


                setMatchState(previous => ({

                    ...previous,

                    leaguePlayers: players

                }));

            }

            catch(error){

                console.error(

                    "FAILED LOADING PLAYERS",

                    error

                );

            }

            finally{

                setLoading(false);

            }

        }


        loadPlayers();


    },[

        matchState.league,

        matchState.leaguePlayers.length,

        setMatchState

    ]);



    const availablePlayers = useMemo(()=>{

        return matchState.leaguePlayers

            .filter(player =>

                !matchState.players.some(

                    selected =>

                        selected.player_id === player.player_id

                )

            )

            .map(player => ({

                player_id:

                    player.player_id,

                display_name:

                    player.display_name,

                commanders:

                    player.commanders.map(commander => ({

                        deck_id:

                            commander.deck_id,

                        commander_id:

                            commander.commander_id,

                        commander_name:

                            commander.commander_name,

                        color_identity:

                            commander.color_identity,

                        image_url:

                            commander.image_url

                    })),

                selected_commander_id:

                    null,

                placement:

                    null,

                ending_life:

                    null

            }));

    },[

        matchState.leaguePlayers,

        matchState.players

    ]);





    function convertSelectedPlayers(

        players: MatchPlayer[]

    ){

        return players;

    }





    return(

        <>

            <StepHeader

                step={2}

                title="Add Players"

                description="Select players from your league to play in this match."

            />




            {

            loading &&

                <p>

                    Loading players...

                </p>

            }




            {

            !loading &&

                <PlayerSelector

                    availablePlayers={availablePlayers}

                    selectedPlayers={matchState.players}

                    setAvailablePlayers={()=>{}}

                    setSelectedPlayers={(players)=>{

                        setMatchState(previous => ({

                            ...previous,

                            players:

                                convertSelectedPlayers(players)

                        }));

                    }}

                />

            }




            <StepNavigation

                previousStep={previousStep}

                nextStep={nextStep}

                cancelMatch={cancelMatch}

                disableNext={

                    matchState.players.length === 0

                }

            />

        </>

    );

}