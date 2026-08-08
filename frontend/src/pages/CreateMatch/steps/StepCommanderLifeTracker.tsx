import {
    useEffect,
    useState
}
from "react";


import StepNavigation
from "../components/StepNavigation";


import type {
    CreateMatchState
}
from "../types";


import "./StepCommanderLifeTracker.css";



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



type LayoutType =
    | "table"
    | "grid"
    | "vertical";



type SeatPosition =
    | "top"
    | "right"
    | "bottom"
    | "left";



const STARTING_LIFE = 40;



export default function StepCommanderLifeTracker({

    matchState,

    setMatchState,

    nextStep,

    previousStep,

    cancelMatch

}:Props){


    const [

        layout,

        setLayout

    ] =

    useState<LayoutType>("table");



    const [

        showSettings,

        setShowSettings

    ] =

    useState(false);



    const [

        bottomPlayerId,

        setBottomPlayerId

    ] =

    useState<number | null>(

        matchState.players[0]?.player_id ?? null

    );





    useEffect(()=>{

        const needsInitialization =

            matchState.players.some(

                player =>

                    player.ending_life === null

            );


        if(!needsInitialization){

            return;

        }


        setMatchState(current => ({

            ...current,

            players:

                current.players.map(player =>

                    player.ending_life === null

                    ?

                    {

                        ...player,

                        ending_life:STARTING_LIFE

                    }

                    :

                    player

                )

        }));

    },[

        matchState.players,

        setMatchState

    ]);





    function updateLife(

        playerId:number,

        amount:number

    ){

        setMatchState(current => ({

            ...current,

            players:

                current.players.map(player =>

                    player.player_id === playerId

                    ?

                    {

                        ...player,

                        ending_life:

                            (

                                player.ending_life ??

                                STARTING_LIFE

                            ) + amount

                    }

                    :

                    player

                )

        }));

    }





    function setLifeDirectly(

        playerId:number

    ){

        const player =

            matchState.players.find(

                currentPlayer =>

                    currentPlayer.player_id === playerId

            );


        if(!player){

            return;

        }


        const currentLife =

            player.ending_life ??

            STARTING_LIFE;


        const value =

            window.prompt(

                "Enter life total:",

                currentLife.toString()

            );


        if(value === null){

            return;

        }


        const newLife = Number(value);


        if(!Number.isFinite(newLife)){

            return;

        }


        setMatchState(current => ({

            ...current,

            players:

                current.players.map(currentPlayer =>

                    currentPlayer.player_id === playerId

                    ?

                    {

                        ...currentPlayer,

                        ending_life:newLife

                    }

                    :

                    currentPlayer

                )

        }));

    }





    function getCommander(player:any){

        return player.commanders.find(

            (commander:any) =>

                commander.commander_id ===

                player.selected_commander_id

        );

    }





    function getPlayerImage(player:any){

        const commander =

            getCommander(player);


        return commander?.image_url ?? null;

    }





    function getTablePlayers(){

        if(!bottomPlayerId){

            return matchState.players;

        }


        const bottomPlayer =

            matchState.players.find(

                player =>

                    player.player_id ===

                    bottomPlayerId

            );


        if(!bottomPlayer){

            return matchState.players;

        }


        const remainingPlayers =

            matchState.players.filter(

                player =>

                    player.player_id !==

                    bottomPlayerId

            );


        return [

            remainingPlayers[0],

            remainingPlayers[1],

            bottomPlayer,

            remainingPlayers[2]

        ].filter(Boolean);

    }





    function getSeatPosition(

        index:number

    ):SeatPosition{

        const positions:SeatPosition[] = [

            "top",

            "right",

            "bottom",

            "left"

        ];


        return positions[index];

    }





    function selectLayout(

        selectedLayout:LayoutType

    ){

        setLayout(selectedLayout);

        setShowSettings(false);

    }





    return (

        <div className="commander-life-tracker">


            <button

                type="button"

                className="life-tracker-settings"

                onClick={()=>setShowSettings(

                    current => !current

                )}

                aria-label="Table layout settings"

            >

                ⚙

            </button>



            {

                showSettings &&

                <div className="life-tracker-settings-menu">


                    <div className="life-tracker-settings-title">

                        Table Layout

                    </div>



                    <button

                        type="button"

                        className={

                            `layout-option ${

                                layout === "table"

                                    ? "layout-option--active"

                                    : ""

                            }`

                        }

                        onClick={()=>selectLayout("table")}

                    >

                        <span>

                            4 Seat Table

                        </span>

                        <span>

                            ✓

                        </span>

                    </button>



                    <button

                        type="button"

                        className={

                            `layout-option ${

                                layout === "grid"

                                    ? "layout-option--active"

                                    : ""

                            }`

                        }

                        onClick={()=>selectLayout("grid")}

                    >

                        <span>

                            2 × 2 Grid

                        </span>

                        <span>

                            ✓

                        </span>

                    </button>



                    <button

                        type="button"

                        className={

                            `layout-option ${

                                layout === "vertical"

                                    ? "layout-option--active"

                                    : ""

                            }`

                        }

                        onClick={()=>selectLayout("vertical")}

                    >

                        <span>

                            Vertical

                        </span>

                        <span>

                            ✓

                        </span>

                    </button>



                    {

                        layout === "table" &&

                        matchState.players.length === 4 &&

                        <div className="bottom-seat-selector">


                            <div className="bottom-seat-selector__label">

                                Your Seat

                            </div>



                            <select

                                value={

                                    bottomPlayerId ?? ""

                                }

                                onChange={event =>

                                    setBottomPlayerId(

                                        Number(

                                            event.target.value

                                        )

                                    )

                                }

                            >

                                {

                                    matchState.players.map(

                                        player => (

                                            <option

                                                key={

                                                    player.player_id

                                                }

                                                value={

                                                    player.player_id

                                                }

                                            >

                                                {player.display_name}

                                            </option>

                                        )

                                    )

                                }

                            </select>


                        </div>

                    }

                </div>

            }



            <div

                className={

                    `commander-life-table commander-life-table--${layout}`

                }

            >

                {

                    layout === "table"

                    ?

                    getTablePlayers().map(

                        (player,index) => {

                            const commander =

                                getCommander(player);


                            const life =

                                player.ending_life ??

                                STARTING_LIFE;


                            const position =

                                getSeatPosition(index);


                            return (

                                <LifePlayerCard

                                    key={

                                        player.player_id

                                    }

                                    player={player}

                                    commander={commander}

                                    life={life}

                                    position={position}

                                    getPlayerImage={

                                        getPlayerImage

                                    }

                                    updateLife={

                                        updateLife

                                    }

                                    setLifeDirectly={

                                        setLifeDirectly

                                    }

                                />

                            );

                        }

                    )

                    :

                    matchState.players.map(

                        player => {

                            const commander =

                                getCommander(player);


                            const life =

                                player.ending_life ??

                                STARTING_LIFE;


                            return (

                                <LifePlayerCard

                                    key={

                                        player.player_id

                                    }

                                    player={player}

                                    commander={commander}

                                    life={life}

                                    getPlayerImage={

                                        getPlayerImage

                                    }

                                    updateLife={

                                        updateLife

                                    }

                                    setLifeDirectly={

                                        setLifeDirectly

                                    }

                                />

                            );

                        }

                    )

                }

            </div>



            <div className="commander-life-tracker__navigation">

                <StepNavigation

                    previousStep={previousStep}

                    cancelMatch={cancelMatch}

                    nextStep={nextStep}

                    nextLabel="Continue to Placements →"

                />

            </div>

        </div>

    );

}





interface LifePlayerCardProps {

    player:any;

    commander:any;

    life:number;

    position?:SeatPosition;

    getPlayerImage:(player:any)=>string | null;

    updateLife:(playerId:number,amount:number)=>void;

    setLifeDirectly:(playerId:number)=>void;

}





function LifePlayerCard({

    player,

    commander,

    life,

    position,

    getPlayerImage,

    updateLife,

    setLifeDirectly

}:LifePlayerCardProps){


    const imageUrl =

        getPlayerImage(player);


    const positionClass =

        position

            ? `life-player-card--${position}`

            : "";



    return (

        <div

            className={

                `life-player-card ${positionClass}`

            }

        >

            <div className="life-player-card__content">


                {

                    imageUrl

                    ?

                    <img

                        className="life-player-card__image"

                        src={imageUrl}

                        alt={

                            commander?.commander_name ??

                            "Commander"

                        }

                    />

                    :

                    <div className="life-player-card__image-placeholder">

                        🃏

                    </div>

                }



                <div className="life-player-card__info">

                    <div className="life-player-card__name">

                        {player.display_name}

                    </div>



                    <div className="life-player-card__commander">

                        {

                            commander?.commander_name ??

                            "Unknown Commander"

                        }

                    </div>

                </div>



                <div className="life-player-card__life">


                    <button

                        type="button"

                        className="life-control"

                        onClick={()=>updateLife(

                            player.player_id,

                            -1

                        )}

                        aria-label={

                            `Decrease ${player.display_name}'s life`

                        }

                    >

                        −

                    </button>



                    <button

                        type="button"

                        className="life-total"

                        onClick={()=>setLifeDirectly(

                            player.player_id

                        )}

                        aria-label={

                            `Edit ${player.display_name}'s life total`

                        }

                    >

                        {life}

                    </button>



                    <button

                        type="button"

                        className="life-control"

                        onClick={()=>updateLife(

                            player.player_id,

                            1

                        )}

                        aria-label={

                            `Increase ${player.display_name}'s life`

                        }

                    >

                        +

                    </button>


                </div>

            </div>

        </div>

    );

}