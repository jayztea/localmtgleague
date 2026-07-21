import React,{useState} from "react";


import type {
    LeaguePlayer
} from "../../../types/match";



interface Props {


    availablePlayers:LeaguePlayer[];


    selectedPlayers:LeaguePlayer[];


    setAvailablePlayers:
        (players:LeaguePlayer[])=>void;


    setSelectedPlayers:
        (players:LeaguePlayer[])=>void;


}



export default function PlayerSelector({

    availablePlayers,

    selectedPlayers,

    setAvailablePlayers,

    setSelectedPlayers


}:Props){



    const [
        selectedAvailable,
        setSelectedAvailable
    ]
    =
    useState<number[]>([]);



    const [
        selectedSelected,
        setSelectedSelected
    ]
    =
    useState<number[]>([]);




    function toggleAvailable(
        playerId:number
    ){


        setSelectedAvailable(

            selectedAvailable.includes(playerId)

            ?

            selectedAvailable.filter(
                id=>id !== playerId
            )

            :

            [
                ...selectedAvailable,
                playerId
            ]

        );


    }




    function toggleSelected(
        playerId:number
    ){


        setSelectedSelected(

            selectedSelected.includes(playerId)

            ?

            selectedSelected.filter(
                id=>id !== playerId
            )

            :

            [
                ...selectedSelected,
                playerId
            ]

        );


    }





    function moveRight(){


        const movingPlayers =
            availablePlayers.filter(

                player =>
                selectedAvailable.includes(
                    player.player_id
                )

            );



        setSelectedPlayers([

            ...selectedPlayers,

            ...movingPlayers

        ]);



        setAvailablePlayers(

            availablePlayers.filter(

                player =>

                !selectedAvailable.includes(
                    player.player_id
                )

            )

        );


        setSelectedAvailable([]);


    }






    function moveLeft(){


        const movingPlayers =
            selectedPlayers.filter(

                player =>

                selectedSelected.includes(
                    player.player_id
                )

            );



        setAvailablePlayers([

            ...availablePlayers,

            ...movingPlayers

        ]);



        setSelectedPlayers(

            selectedPlayers.filter(

                player =>

                !selectedSelected.includes(
                    player.player_id
                )

            )

        );


        setSelectedSelected([]);


    }






    return (

        <div

            style={{

                display:"flex",

                gap:"30px",

                alignItems:"center"

            }}

        >


            {/* AVAILABLE */}


            <div>


                <h3>
                    Available Players
                </h3>


                <div

                    style={{

                        border:"1px solid gray",

                        width:"250px",

                        minHeight:"300px",

                        padding:"10px"

                    }}

                >


                {
                    availablePlayers.map(player=>(


                        <div

                            key={
                                player.player_id
                            }

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


                            {
                                player.display_name
                            }


                        </div>


                    ))

                }


                </div>


            </div>





            {/* BUTTONS */}


            <div

                style={{

                    display:"flex",

                    flexDirection:"column",

                    gap:"20px"

                }}

            >


                <button

                    onClick={moveRight}

                >

                    →

                </button>



                <button

                    onClick={moveLeft}

                >

                    ←

                </button>


            </div>





            {/* SELECTED */}


            <div>


                <h3>
                    Selected Players
                </h3>


                <div

                    style={{

                        border:"1px solid gray",

                        width:"250px",

                        minHeight:"300px",

                        padding:"10px"

                    }}

                >


                {
                    selectedPlayers.map(player=>(


                        <div

                            key={
                                player.player_id
                            }

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


                            {
                                player.display_name
                            }


                        </div>


                    ))

                }


                </div>


            </div>


        </div>

    );

}