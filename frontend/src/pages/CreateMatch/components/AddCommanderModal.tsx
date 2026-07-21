import React,{useState} from "react";


import {
    searchCommanders
}
from "../../../services/commanderService";


import {
    getOrCreateCommanderDeck
}
from "../../../services/deckService";



import type {
    LeaguePlayer
}
from "../../../types/match";



interface Props {


    player:LeaguePlayer;


    closeModal:()=>void;


    onCommanderAdded:
    (
        commander:any
    )=>void;


}





export default function AddCommanderModal({

    player,

    closeModal,

    onCommanderAdded


}:Props){



    const [
        search,
        setSearch
    ]
    =
    useState("");



    const [
        results,
        setResults
    ]
    =
    useState<any[]>([]);



    const [
        selectedCommander,
        setSelectedCommander
    ]
    =
    useState<any|null>(null);




async function handleSearch(){

    try {

        console.log(
            "SEARCHING COMMANDERS:",
            search
        );


        const commanders =
            await searchCommanders(
                search
            );


        console.log(
            "COMMANDER SEARCH RESULTS:",
            commanders
        );


        setResults(
            commanders
        );


    }
    catch(error){

        console.error(
            "COMMANDER SEARCH FAILED:",
            error
        );

    }

}






    async function addCommander(){


        if(!selectedCommander)
            return;



        const deck =
            await getOrCreateCommanderDeck(

                player.player_id,

                selectedCommander.commander_id

            );



        onCommanderAdded({

            deck_id:deck.deck_id,

            commander_id:
                selectedCommander.commander_id,

            commander_name:
                selectedCommander.commander_name,

            color_identity:
                selectedCommander.color_identity

        });


    }






    return (

        <div

        style={{

            position:"fixed",

            top:0,

            left:0,

            right:0,

            bottom:0,

            background:"rgba(0,0,0,.3)",

            display:"flex",

            justifyContent:"center",

            alignItems:"center"

        }}

        >


            <div

            style={{

                background:"white",

                padding:"30px",

                width:"400px"

            }}

            >


                <h2>
                    Add Commander
                </h2>



                <input

                    value={search}

                    onChange={
                        e=>setSearch(e.target.value)
                    }


                    placeholder="Search commander"

                />



                <button

                    onClick={handleSearch}

                >

                    Search

                </button>




                <div>


                {
                    results.map(commander=>(


                        <div

                        key={
                            commander.commander_id
                        }


                        >

                            <input

                                type="radio"


                                checked={

                                    selectedCommander?.commander_id ===
                                    commander.commander_id

                                }


                                onChange={()=>


                                    setSelectedCommander(
                                        commander
                                    )

                                }

                            />


                            {
                                commander.commander_name
                            }


                        </div>


                    ))

                }


                </div>




                <div>


                    <button

                        onClick={closeModal}

                    >

                        Cancel

                    </button>



                    <button

                        disabled={
                            !selectedCommander
                        }


                        onClick={addCommander}

                    >

                        Add Commander

                    </button>


                </div>


            </div>


        </div>


    );

}