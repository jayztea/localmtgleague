import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";


import {
    getMyLeagues,
    getLeaguePlayersWithCommanders
} from "../services/leagueService";


import {
    createMatch
} from "../services/matchService";


import {
    searchCommanders,
    addCommanderToPlayer
} from "../services/commanderService";


import type {
    LeaguePlayer,
    MatchPlayerInput
} from "../types/match";



interface League {

    league_id:number;

    league_name:string;

}



export default function CreateMatch(){


    const navigate =
        useNavigate();



    const [leagues,setLeagues] =
        useState<League[]>([]);



    const [selectedLeague,setSelectedLeague] =
        useState<number | null>(null);



    const [players,setPlayers] =
        useState<LeaguePlayer[]>([]);



    const [selectedPlayers,setSelectedPlayers] =
        useState<Record<number,MatchPlayerInput>>({});



    const [commanderSearch,setCommanderSearch] =
        useState("");



    const [searchResults,setSearchResults] =
        useState<any[]>([]);



    const [activePlayer,setActivePlayer] =
        useState<number | null>(null);



    const [loading,setLoading] =
        useState(false);





    useEffect(()=>{

        async function loadLeagues(){

            try {

                const result =
                    await getMyLeagues();


                console.log(
                    "MY LEAGUES RESPONSE:",
                    result
                );


                setLeagues(
                    result
                );


            } catch(error){

                console.error(
                    "FAILED LOADING LEAGUES:",
                    error
                );

            }

        }


        loadLeagues();


    },[]);





    async function handleLeagueChange(
        leagueId:number
    ){


        setSelectedLeague(
            leagueId
        );


        const result =
            await getLeaguePlayersWithCommanders(
                leagueId
            );


        setPlayers(
            result
        );


        setSelectedPlayers({});


    }






    function addPlayer(
        player:LeaguePlayer
    ){


        setSelectedPlayers(
            current=>({

                ...current,


                [player.player_id]:{

                    player_id:
                        player.player_id,


                    commander_id:
                        0,


                    finish_position:
                        Object.keys(current).length + 1,


                    starting_life:
                        40

                }

            })
        );


    }






    function removePlayer(
        playerId:number
    ){


        const copy =
            {
                ...selectedPlayers
            };


        delete copy[playerId];


        setSelectedPlayers(
            copy
        );

    }






    function selectCommander(
        playerId:number,
        commanderId:number
    ){


        setSelectedPlayers(
            current=>({

                ...current,


                [playerId]:{

                    ...current[playerId],

                    commander_id:
                        commanderId

                }

            })
        );


    }








    async function searchCommandersHandler(){


        if(
            !commanderSearch.trim()
        ){

            return;

        }



        const result =
            await searchCommanders(
                commanderSearch
            );



        setSearchResults(
            result
        );

    }








    async function addCommander(
        playerId:number,
        commanderId:number
    ){


        await addCommanderToPlayer(
            playerId,
            commanderId
        );



        if(selectedLeague){


            const refreshed =
                await getLeaguePlayersWithCommanders(
                    selectedLeague
                );


            setPlayers(
                refreshed
            );


        }



        selectCommander(
            playerId,
            commanderId
        );


    }








    async function submitMatch(){


        if(!selectedLeague){

            return;

        }



        const payload = {


            league_id:
                selectedLeague,


            players:
                Object.values(
                    selectedPlayers
                )


        };



        setLoading(true);



        try{


            await createMatch(
                payload
            );


            navigate(
                "/dashboard"
            );


        }
        finally{


            setLoading(false);


        }


    }







    return (

        <div>


            <h1>
                Create Commander Match
            </h1>





            <div>

                <label>
                    League
                </label>


                <select

                    value={
                        selectedLeague ?? ""
                    }


                    onChange={
                        e =>
                            handleLeagueChange(
                                Number(e.target.value)
                            )
                    }

                >

                    <option value="">
                        Select League
                    </option>


                    {
                        leagues.map(
                            league=>(

                                <option

                                    key={
                                        league.league_id
                                    }

                                    value={
                                        league.league_id
                                    }

                                >

                                    {
                                        league.league_name
                                    }

                                </option>

                            )
                        )
                    }


                </select>


            </div>







            <hr/>





            {
                players.map(
                    player=>(


                        <div

                            key={
                                player.player_id
                            }

                            style={{

                                border:"1px solid black",

                                padding:"10px",

                                margin:"10px"

                            }}

                        >


                            <h3>

                                {
                                    player.display_name
                                }

                            </h3>





                            {
                                !selectedPlayers[player.player_id]

                                ?

                                <button

                                    onClick={()=>
                                        addPlayer(player)
                                    }

                                >

                                    Add To Match

                                </button>


                                :


                                <>


                                    <select

                                        onChange={
                                            e =>
                                                selectCommander(
                                                    player.player_id,
                                                    Number(e.target.value)
                                                )
                                        }

                                    >

                                        <option>
                                            Select Commander
                                        </option>


                                        {
                                            player.commanders.map(
                                                commander=>(

                                                    <option

                                                        key={
                                                            commander.commander_id
                                                        }

                                                        value={
                                                            commander.commander_id
                                                        }

                                                    >

                                                        {
                                                            commander.commander_name
                                                        }


                                                    </option>

                                                )
                                            )
                                        }


                                    </select>




                                    <button

                                        onClick={()=>
                                            setActivePlayer(
                                                player.player_id
                                            )
                                        }

                                    >

                                        Search/Add Commander

                                    </button>





                                    <button

                                        onClick={()=>
                                            removePlayer(
                                                player.player_id
                                            )
                                        }

                                    >

                                        Remove

                                    </button>


                                </>


                            }



                        </div>


                    )

                )

            }







            {
                activePlayer &&


                <div>


                    <h3>
                        Add Commander
                    </h3>



                    <input

                        value={
                            commanderSearch
                        }

                        onChange={
                            e =>
                                setCommanderSearch(
                                    e.target.value
                                )
                        }


                        placeholder="Search Commander"

                    />



                    <button

                        onClick={
                            searchCommandersHandler
                        }

                    >

                        Search

                    </button>





                    {
                        searchResults.map(
                            commander=>(


                                <div

                                    key={
                                        commander.commander_id
                                    }

                                >

                                    {
                                        commander.commander_name
                                    }



                                    <button

                                        onClick={()=>
                                            addCommander(
                                                activePlayer,
                                                commander.commander_id
                                            )
                                        }

                                    >

                                        Add

                                    </button>


                                </div>


                            )
                        )

                    }



                </div>

            }







            <hr/>





            <h2>
                Match Players
            </h2>



            {
                Object.values(
                    selectedPlayers
                )
                .map(
                    player=>(

                        <div

                            key={
                                player.player_id
                            }

                        >

                            Player ID:
                            {
                                player.player_id
                            }

                            <br/>

                            Commander ID:
                            {
                                player.commander_id
                            }

                            <br/>

                            Starting Life:
                            {
                                player.starting_life
                            }


                        </div>


                    )
                )

            }





            <button

                disabled={
                    loading
                }

                onClick={
                    submitMatch
                }

            >

                {
                    loading
                    ?
                    "Creating..."
                    :
                    "Create Match"
                }


            </button>




        </div>

    );

}