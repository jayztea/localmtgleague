import { useState } from "react";


import {
    searchCommanders
}
from "../../../services/commanderService";


import {
    getOrCreateCommanderDeck
}
from "../../../services/deckService";


import "../CreateMatch.css";



interface PlayerInfo {

    player_id:number;

    display_name:string;

}



interface Props {

    player:PlayerInfo;

    onClose:()=>void;

    onCommanderAdded:(commander:any)=>void;

}



export default function AddCommanderModal({

    player,

    onClose,

    onCommanderAdded

}:Props){


    const [

        query,

        setQuery

    ] =

    useState("");


    const [

        loading,

        setLoading

    ] =

    useState(false);


    const [

        results,

        setResults

    ] =

    useState<any[]>([]);





    async function handleSearch(){


        if(!query.trim())

            return;


        try{

            setLoading(true);


            const commanders =

                await searchCommanders(

                    query

                );


            setResults(

                commanders

            );

        }

        catch(error){

            console.error(error);

            alert(

                "Failed to search commanders."

            );

        }

        finally{

            setLoading(false);

        }

    }





    async function selectCommander(

        commander:any

    ){


        try{


            const deck =

                await getOrCreateCommanderDeck(

                    player.player_id,

                    commander.commander_id

                );


            onCommanderAdded({

                deck_id:

                    deck.deck_id,

                commander_id:

                    commander.commander_id,

                commander_name:

                    commander.commander_name,

                color_identity:

                    commander.color_identity,

                image_url:

                    commander.image_url

            });

        }

        catch(error){

            console.error(error);

            alert(

                "Unable to add commander."

            );

        }

    }





    return(

        <div className="modal-overlay">


            <div className="modal-card">


                <h2>

                    Add Commander

                </h2>


                <p className="modal-subtitle">

                    Search for a commander to add to

                    {` ${player.display_name}`}'s decks.

                </p>


                <div className="modal-search">


                    <input

                        className="search-input"

                        value={query}

                        onChange={(e)=>

                            setQuery(

                                e.target.value

                            )

                        }

                        placeholder="Search commander..."

                        onKeyDown={(e)=>{

                            if(e.key === "Enter"){

                                handleSearch();

                            }

                        }}

                    />


                    <button

                        className="primary-button"

                        onClick={handleSearch}

                    >

                        Search

                    </button>


                </div>


                {

                    loading &&

                    <div className="loading-text">

                        Searching...

                    </div>

                }


                <div className="search-results">


                    {

                        results.map(commander=>(


                            <div

                                key={

                                    commander.commander_id

                                }

                                className="search-result-row"

                            >


                                <div>

                                    <div className="commander-name">

                                        {

                                            commander.commander_name

                                        }

                                    </div>


                                    <div className="commander-colors">

                                        {

                                            commander.color_identity

                                        }

                                    </div>

                                </div>


                                <button

                                    className="primary-button"

                                    onClick={()=>selectCommander(

                                        commander

                                    )}

                                >

                                    Add

                                </button>


                            </div>

                        ))

                    }


                    {

                        !loading &&

                        results.length === 0 &&

                        query !== "" &&

                        <div className="empty-search">

                            No commanders found.

                        </div>

                    }


                </div>


                <div className="modal-footer">


                    <button

                        className="secondary-button"

                        onClick={onClose}

                    >

                        Cancel

                    </button>


                </div>


            </div>


        </div>

    );

}