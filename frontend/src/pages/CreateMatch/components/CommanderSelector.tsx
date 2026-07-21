import React,{useState} from "react";


import AddCommanderModal
from "./AddCommanderModal";


import type {
    LeaguePlayer
}
from "../../../types/match";



interface Props {


    player:LeaguePlayer;


    selectedCommanderId?:number;


    onChange:
    (
        playerId:number,
        commanderId:number
    )=>void;


    onCommanderAdded:
    (
        playerId:number,
        commander:any
    )=>void;


}



const ADD_COMMANDER =
    "__ADD_COMMANDER__";



export default function CommanderSelector({

    player,

    selectedCommanderId,

    onChange,

    onCommanderAdded


}:Props){



    const [
        showAddCommander,
        setShowAddCommander
    ]
    =
    useState(false);





    return (

        <>


        <select


            value={
                selectedCommanderId ?? ""
            }


            onChange={(event)=>{


                if(
                    event.target.value === ADD_COMMANDER
                ){

                    setShowAddCommander(true);

                    return;

                }



                onChange(

                    player.player_id,

                    Number(event.target.value)

                );


            }}



        >



            <option value="">

                Select Commander

            </option>




            {

            player.commanders.map(commander=>(


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


            ))

            }




            <option value={ADD_COMMANDER}>

                + Add Commander...

            </option>



        </select>





        {
            showAddCommander &&


            <AddCommanderModal


                player={player}


                closeModal={()=>setShowAddCommander(false)}


                onCommanderAdded={(commander)=>{


                    onCommanderAdded(

                        player.player_id,

                        commander

                    );


                    setShowAddCommander(false);


                }}


            />

        }


        </>


    );

}