import {
    useEffect,
    useState
}
from "react";


import {
    searchCommanders
}
from "../../services/commanderService";


import type {
    Commander
}
from "../../types/commander";



interface Props {

    isOpen:boolean;

    onClose:()=>void;

    onSelect:
        (
            commander:Commander
        )=>void;

}



export default function CommanderSearchModal(
    {
        isOpen,
        onClose,
        onSelect
    }:Props
){


    const [
        search,
        setSearch
    ] =
    useState("");



    const [
        results,
        setResults
    ] =
    useState<Commander[]>([]);



    const [
        loading,
        setLoading
    ] =
    useState(false);




    useEffect(()=>{


        if(!isOpen){

            return;

        }


        setSearch("");

        setResults([]);


    },[isOpen]);




    useEffect(()=>{


        if(
            search.length < 3
        ){

            setResults([]);

            return;

        }



        const timeout =
            setTimeout(
                async()=>{


                    setLoading(true);


                    const commanders =
                        await searchCommanders(
                            search
                        );


                    setResults(
                        commanders
                    );


                    setLoading(false);


                },
                300
            );



        return ()=>clearTimeout(timeout);



    },[search]);




    if(!isOpen){

        return null;

    }




    return (

        <div
            className="
                fixed
                inset-0
                bg-black/50
                flex
                items-center
                justify-center
            "
        >


            <div
                className="
                    bg-white
                    rounded
                    p-6
                    w-96
                "
            >


                <h2
                    className="
                        text-xl
                        font-bold
                        mb-4
                    "
                >
                    Search Commander
                </h2>



                <input

                    className="
                        border
                        rounded
                        w-full
                        px-3
                        py-2
                        mb-4
                    "

                    placeholder="
                        Start typing commander name...
                    "

                    value={search}

                    onChange={
                        e =>
                            setSearch(
                                e.target.value
                            )
                    }

                />



                {
                    loading &&
                    <div>
                        Searching...
                    </div>
                }



                <div
                    className="
                        max-h-64
                        overflow-y-auto
                    "
                >

                    {

                        results.map(

                            commander=>(

                                <button

                                    key={
                                        commander.commander_id
                                    }


                                    className="
                                        block
                                        w-full
                                        text-left
                                        border-b
                                        py-2
                                    "


                                    onClick={()=>{

                                        onSelect(
                                            commander
                                        );

                                        onClose();

                                    }}

                                >

                                    <div>
                                        {
                                            commander.commander_name
                                        }
                                    </div>

                                    <div
                                        className="
                                            text-sm
                                            text-gray-500
                                        "
                                    >
                                        {
                                            commander.color_identity
                                        }
                                    </div>


                                </button>

                            )

                        )

                    }

                </div>



                <button

                    className="
                        mt-4
                        border
                        rounded
                        px-4
                        py-2
                    "

                    onClick={onClose}

                >

                    Cancel

                </button>


            </div>


        </div>

    );

}