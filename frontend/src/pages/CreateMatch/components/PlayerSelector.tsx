import { useState } from "react";

import type { MatchPlayer } from "../types";

import "../CreateMatch.css";


interface Props {

    availablePlayers: MatchPlayer[];

    selectedPlayers: MatchPlayer[];

    setAvailablePlayers: (players: MatchPlayer[]) => void;

    setSelectedPlayers: (players: MatchPlayer[]) => void;

}



export default function PlayerSelector({

    availablePlayers,

    selectedPlayers,

    setAvailablePlayers,

    setSelectedPlayers

}: Props) {


    const [
        selectedAvailable,
        setSelectedAvailable
    ] = useState<number[]>([]);



    const [
        selectedSelected,
        setSelectedSelected
    ] = useState<number[]>([]);




    function toggleAvailable(id:number){


        setSelectedAvailable(

            selectedAvailable.includes(id)

            ?

            selectedAvailable.filter(x=>x !== id)

            :

            [
                ...selectedAvailable,
                id
            ]

        );

    }





    function toggleSelected(id:number){


        setSelectedSelected(

            selectedSelected.includes(id)

            ?

            selectedSelected.filter(x=>x !== id)

            :

            [
                ...selectedSelected,
                id
            ]

        );

    }





    function moveRight(){


        const moving =

            availablePlayers.filter(player =>

                selectedAvailable.includes(
                    player.player_id
                )

            );



        setSelectedPlayers([

            ...selectedPlayers,

            ...moving

        ]);



        setAvailablePlayers([]);



        setSelectedAvailable([]);


    }





    function moveLeft(){


        const remaining =

            selectedPlayers.filter(player =>

                !selectedSelected.includes(
                    player.player_id
                )

            );



        setSelectedPlayers(

            remaining

        );



        setSelectedSelected([]);


    }






    return (

        <div className="player-transfer-container">



            <div className="transfer-box">


                <h3>

                    Available Players

                </h3>



                <div className="transfer-list">


                    {

                    availablePlayers.length === 0 &&


                        <div className="transfer-empty">

                            No available players

                        </div>

                    }



                    {

                    availablePlayers.map(player => (


                        <label

                            key={player.player_id}

                            className="transfer-item"

                        >


                            <input

                                type="checkbox"

                                checked={

                                    selectedAvailable.includes(

                                        player.player_id

                                    )

                                }


                                onChange={()=>


                                    toggleAvailable(

                                        player.player_id

                                    )

                                }

                            />


                            <span>

                                {player.display_name}

                            </span>


                        </label>


                    ))

                    }


                </div>


            </div>






            <div className="transfer-buttons">


                <button

                    onClick={moveRight}

                    disabled={selectedAvailable.length === 0}

                    aria-label="Add selected players"

                >

                    ↓

                </button>




                <button

                    onClick={moveLeft}

                    disabled={selectedSelected.length === 0}

                    aria-label="Remove selected players"

                >

                    ↑

                </button>


            </div>







            <div className="transfer-box">


                <h3>

                    Selected Players

                </h3>



                <div className="transfer-list">


                    {

                    selectedPlayers.length === 0 &&


                        <div className="transfer-empty">

                            No players selected

                        </div>

                    }




                    {

                    selectedPlayers.map(player => (


                        <label

                            key={player.player_id}

                            className="transfer-item"

                        >


                            <input

                                type="checkbox"

                                checked={

                                    selectedSelected.includes(

                                        player.player_id

                                    )

                                }


                                onChange={()=>


                                    toggleSelected(

                                        player.player_id

                                    )

                                }

                            />


                            <span>

                                {player.display_name}

                            </span>


                        </label>


                    ))

                    }


                </div>


            </div>




        </div>

    );

}