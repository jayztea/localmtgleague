import {
    useState
}
from "react";


import CommanderSearchModal
from "./CommanderSearchModal";


import type {
    LeaguePlayer
}
from "../../types/match";


import type {
    Commander
}
from "../../types/commander";



interface Props {

    player:LeaguePlayer;

    selectedCommanderId:number | undefined;

    onChange:
        (
            playerId:number,
            commanderId:number
        )=>void;

}



export default function SelectedPlayerCommander(
    {
        player,
        selectedCommanderId,
        onChange
    }:Props
){


    const [
        openSearch,
        setOpenSearch
    ] =
    useState(false);



    function chooseCommander(
        commander:Commander
    ){

        onChange(
            player.player_id,
            commander.commander_id
        );

    }



    return (

        <div
            className="
                border
                rounded
                p-4
                mb-3
            "
        >

            <h3
                className="
                    font-semibold
                    mb-3
                "
            >

                {
                    player.display_name
                }

            </h3>



            <div
                className="
                    flex
                    flex-wrap
                    gap-2
                "
            >


            {


                player.commanders.map(

                    commander=>(

                        <button

                            key={
                                commander.commander_id
                            }

                            className={`
                                border
                                rounded
                                px-3
                                py-1
                                ${
                                    selectedCommanderId ===
                                    commander.commander_id
                                    ?
                                    "bg-blue-200"
                                    :
                                    ""
                                }
                            `}


                            onClick={()=>{

                                onChange(

                                    player.player_id,

                                    commander.commander_id

                                );

                            }}

                        >

                            {
                                commander.commander_name
                            }


                        </button>


                    )

                )


            }


            <button

                className="
                    border
                    rounded
                    px-3
                    py-1
                "

                onClick={()=>

                    setOpenSearch(true)

                }

            >

                + Search

            </button>


            </div>



            <CommanderSearchModal

                isOpen={
                    openSearch
                }

                onClose={()=>{

                    setOpenSearch(false);

                }}

                onSelect={
                    chooseCommander
                }

            />

        </div>

    );

}