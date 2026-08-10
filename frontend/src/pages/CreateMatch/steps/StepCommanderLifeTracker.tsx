import {
    useEffect,
    useMemo,
    useState
}
from "react";

import type {
    CreateMatchState,
    MatchPlayer
}
from "../types";

import "../CreateMatch.css";


interface Props {

    matchState:CreateMatchState;

    setMatchState:
        React.Dispatch<
            React.SetStateAction<CreateMatchState>
        >;

    nextStep:()=>void;

    previousStep:()=>void;

    cancelMatch:()=>void;

}


type Arrangement =
    | "standard"
    | "clockwise"
    | "counterClockwise";


interface LifeValues {

    [playerId:number]:number;

}


export default function StepCommanderLifeTracker({

    matchState,

    setMatchState,

    nextStep,

    previousStep,

    cancelMatch

}:Props){


    const [

        lifeValues,

        setLifeValues

    ] =

    useState<LifeValues>(()=>{

        const initial:LifeValues = {};


        matchState.players.forEach(player=>{

            initial[player.player_id] =

                player.ending_life ??

                40;

        });


        return initial;

    });


    const [

        arrangement,

        setArrangement

    ] =

    useState<Arrangement>("standard");


    const [

        showSettings,

        setShowSettings

    ] =

    useState(false);


    const [

        editingPlayerId,

        setEditingPlayerId

    ] =

    useState<number | null>(null);


    const [

        exactLife,

        setExactLife

    ] =

    useState("");


    const [

        orderedPlayers,

        setOrderedPlayers

    ] =

    useState<MatchPlayer[]>(

        matchState.players

    );



    useEffect(()=>{

        setOrderedPlayers(

            matchState.players

        );

    },[matchState.players]);



    const arrangedPlayers = useMemo(()=>{

        if(orderedPlayers.length !== 4)

            return orderedPlayers;


        if(arrangement === "clockwise"){

            return [

                orderedPlayers[0],

                orderedPlayers[1],

                orderedPlayers[2],

                orderedPlayers[3]

            ];

        }


        if(arrangement === "counterClockwise"){

            return [

                orderedPlayers[0],

                orderedPlayers[3],

                orderedPlayers[2],

                orderedPlayers[1]

            ];

        }


        return orderedPlayers;

    },[

        orderedPlayers,

        arrangement

    ]);



    function updateLife(

        playerId:number,

        amount:number

    ){

        setLifeValues(previous=>({

            ...previous,

            [playerId]:

                Math.max(

                    0,

                    (previous[playerId] ?? 40) +

                    amount

                )

        }));

    }



    function openExactLife(

        playerId:number

    ){

        setEditingPlayerId(

            playerId

        );


        setExactLife(

            String(

                lifeValues[playerId] ?? 40

            )

        );

    }



    function saveExactLife(){

        if(

            editingPlayerId === null

        )

            return;


        const value = Number(

            exactLife

        );


        if(

            !Number.isFinite(value)

        )

            return;


        setLifeValues(previous=>({

            ...previous,

            [editingPlayerId]:

                Math.max(

                    0,

                    Math.floor(value)

                )

        }));


        setEditingPlayerId(null);

        setExactLife("");

    }



    function finishTracker(){

        setMatchState(previous=>({

            ...previous,

            players:

                previous.players.map(player=>({

                    ...player,

                    ending_life:

                        lifeValues[

                            player.player_id

                        ] ?? 40

                }))

        }));


        nextStep();

    }



    function getCommander(

        player:MatchPlayer

    ){

        return player.commanders.find(

            commander=>

                commander.commander_id ===

                player.selected_commander_id

        );

    }



    function movePlayer(

        fromIndex:number,

        toIndex:number

    ){

        const next = [

            ...orderedPlayers

        ];


        const [

            moved

        ] = next.splice(

            fromIndex,

            1

        );


        next.splice(

            toIndex,

            0,

            moved

        );


        setOrderedPlayers(next);

    }



    function playerCard(

        player:MatchPlayer,

        position:string

    ){

        const commander =

            getCommander(player);


        return (

            <div

                key={player.player_id}

                className={`life-player-card ${position}`}

            >

                {

                    commander?.image_url &&

                    <img

                        src={commander.image_url}

                        alt=""

                        className="life-player-image"

                    />

                }


                <div className="life-player-overlay" />


                <div className="life-player-content">


                    <div className="life-player-name">

                        {player.display_name}

                    </div>


                    <div className="life-player-commander">

                        {commander?.commander_name ??

                            "Commander"

                        }

                    </div>


                    <div className="life-controls">


                        <button

                            type="button"

                            className="life-adjust-button"

                            onClick={()=>updateLife(

                                player.player_id,

                                -1

                            )}

                            aria-label="Decrease life"

                        >

                            −

                        </button>


                        <button

                            type="button"

                            className="life-total"

                            onClick={()=>openExactLife(

                                player.player_id

                            )}

                        >

                            {lifeValues[player.player_id] ?? 40}

                        </button>


                        <button

                            type="button"

                            className="life-adjust-button"

                            onClick={()=>updateLife(

                                player.player_id,

                                1

                            )}

                            aria-label="Increase life"

                        >

                            +

                        </button>


                    </div>


                </div>

            </div>

        );

    }



    return (

        <div className="life-tracker">


            <button

                type="button"

                className="life-settings-button"

                onClick={()=>setShowSettings(true)}

                aria-label="Table settings"

            >

                ⚙

            </button>


            <div className="life-table">


                {

                    arrangedPlayers.length === 4

                    ? <>


                        {

                            playerCard(

                                arrangedPlayers[0],

                                "life-player-top"

                            )

                        }


                        {

                            playerCard(

                                arrangedPlayers[1],

                                "life-player-left"

                            )

                        }


                        <div className="life-table-center">

                            <div>

                                COMMANDER

                            </div>

                            <span>

                                LIFE

                            </span>

                        </div>


                        {

                            playerCard(

                                arrangedPlayers[2],

                                "life-player-right"

                            )

                        }


                        {

                            playerCard(

                                arrangedPlayers[3],

                                "life-player-bottom"

                            )

                        }

                    </>

                    :

                    arrangedPlayers.map(

                        (player,index)=>

                            playerCard(

                                player,

                                `life-player-position-${index}`

                            )

                    )

                }


            </div>


            <div className="life-tracker-actions">


                <button

                    type="button"

                    className="life-back-button"

                    onClick={previousStep}

                >

                    ← Back

                </button>


                <button

                    type="button"

                    className="life-next-button"

                    onClick={finishTracker}

                >

                    Continue →

                </button>

            </div>


            <button

                type="button"

                className="life-cancel-button"

                onClick={cancelMatch}

            >

                Cancel Match

            </button>



            {

                showSettings &&

                <div className="life-settings-overlay">


                    <div className="life-settings-panel">


                        <div className="life-settings-header">

                            <h2>

                                Table Settings

                            </h2>


                            <button

                                type="button"

                                onClick={()=>setShowSettings(false)}

                            >

                                ×

                            </button>

                        </div>


                        <p>

                            Choose how players are arranged around the table.

                        </p>


                        <button

                            type="button"

                            className={

                                arrangement === "standard"

                                    ? "life-arrangement active"

                                    : "life-arrangement"

                            }

                            onClick={()=>{

                                setArrangement(

                                    "standard"

                                );

                                setShowSettings(false);

                            }}

                        >

                            Standard

                        </button>


                        <button

                            type="button"

                            className={

                                arrangement === "clockwise"

                                    ? "life-arrangement active"

                                    : "life-arrangement"

                            }

                            onClick={()=>{

                                setArrangement(

                                    "clockwise"

                                );

                                setShowSettings(false);

                            }}

                        >

                            Rotate Clockwise

                        </button>


                        <button

                            type="button"

                            className={

                                arrangement === "counterClockwise"

                                    ? "life-arrangement active"

                                    : "life-arrangement"

                            }

                            onClick={()=>{

                                setArrangement(

                                    "counterClockwise"

                                );

                                setShowSettings(false);

                            }}

                        >

                            Rotate Counter-Clockwise

                        </button>


                        <h3>

                            Rearrange Players

                        </h3>


                        {

                            orderedPlayers.map(

                                (player,index)=>(

                                    <div

                                        key={player.player_id}

                                        className="life-seat-row"

                                    >

                                        <span>

                                            {index + 1}.

                                            {" "}

                                            {player.display_name}

                                        </span>


                                        <div>

                                            <button

                                                type="button"

                                                disabled={index === 0}

                                                onClick={()=>movePlayer(

                                                    index,

                                                    index - 1

                                                )}

                                            >

                                                ↑

                                            </button>


                                            <button

                                                type="button"

                                                disabled={

                                                    index ===

                                                    orderedPlayers.length - 1

                                                }

                                                onClick={()=>movePlayer(

                                                    index,

                                                    index + 1

                                                )}

                                            >

                                                ↓

                                            </button>

                                        </div>

                                    </div>

                                )

                            )

                        }


                    </div>

                </div>

            }


            {

                editingPlayerId !== null &&

                <div className="life-exact-overlay">


                    <div className="life-exact-panel">


                        <h2>

                            Set Life Total

                        </h2>


                        <input

                            type="number"

                            inputMode="numeric"

                            value={exactLife}

                            onChange={event=>

                                setExactLife(

                                    event.target.value

                                )

                            }

                            autoFocus

                        />


                        <div>

                            <button

                                type="button"

                                onClick={()=>{

                                    setEditingPlayerId(null);

                                    setExactLife("");

                                }}

                            >

                                Cancel

                            </button>


                            <button

                                type="button"

                                onClick={saveExactLife}

                            >

                                Save

                            </button>

                        </div>


                    </div>

                </div>

            }

        </div>

    );

}