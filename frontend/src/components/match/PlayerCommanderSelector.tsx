import {
    useState
} from "react";


import CommanderSearchModal
from "./CommanderSearchModal";


import type {
    LeaguePlayerCommander,
    MatchPlayerSelection
}
from "../../types/match";


import type {
    Commander
}
from "../../types/commander";



interface Props {

    player:LeaguePlayerCommander;

    selected:MatchPlayerSelection | undefined;

    onChange:
        (
            selection:MatchPlayerSelection
        )=>void;

}



export default function PlayerCommanderSelector(
    {
        player,
        selected,
        onChange
    }:Props
){


    const [
        showSearch,
        setShowSearch
    ] =
    useState(false);



    function selectCommander(
        commander:Commander
    ){

        onChange({

            player_id:
                player.player_id,

            display_name:
                player.display_name,

            commander

        });

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


            <div
                className="
                    font-semibold
                    mb-3
                "
            >

                {
                    player.display_name
                }

            </div>



            <div
                className="
                    flex
                    flex-wrap
                    gap-2
                    mb-3
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
                                    selected?.commander?.commander_id
                                    ===
                                    commander.commander_id
                                    ?
                                    "bg-blue-200"
                                    :
                                    ""
                                }
                            `}


                            onClick={()=>{

                                selectCommander({

                                    commander_id:
                                        commander.commander_id,

                                    commander_name:
                                        commander.commander_name,

                                    color_identity:
                                        commander.color_identity

                                });

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


                onClick={()=>setShowSearch(true)}

            >

                + Search Commander

            </button>


            </div>




            {
                selected?.commander &&

                <div
                    className="
                        text-sm
                        text-green-700
                    "
                >

                    Selected:

                    {" "}

                    {
                        selected.commander.commander_name
                    }

                </div>

            }




            <CommanderSearchModal

                isOpen={
                    showSearch
                }

                onClose={()=>{

                    setShowSearch(false);

                }}

                onSelect={
                    selectCommander
                }

            />


        </div>

    );

}