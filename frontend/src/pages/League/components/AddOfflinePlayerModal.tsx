import {
    useState
}
from "react";


import {
    addOfflinePlayer
}
from "../../../services/leagueService";


import "./AddOfflinePlayerModal.css";


interface Props {

    leagueId:number;

    onClose:()=>void;

    onSuccess:()=>void;

}



export default function AddOfflinePlayerModal({

    leagueId,

    onClose,

    onSuccess

}:Props){


    const [
        displayName,
        setDisplayName
    ] =
    useState("");



    const [
        error,
        setError
    ] =
    useState("");



    const [
        saving,
        setSaving
    ] =
    useState(false);





    async function handleSubmit(

        event:React.FormEvent

    ){

        event.preventDefault();


        if(!displayName.trim()){

            setError(
                "Player name is required."
            );

            return;

        }



        try {

            setSaving(true);

            setError("");



            await addOfflinePlayer(

                leagueId,

                {
                    display_name:
                        displayName.trim()
                }

            );



            onSuccess();

        }
        catch(error:any){

            setError(

                error.response?.data?.message

                ??

                "Unable to create player."

            );

        }
        finally{

            setSaving(false);

        }

    }





    return (

        <div className="offline-player-overlay">


            <div className="offline-player-modal">


                <h2>

                    Add Offline Player

                </h2>



                {

                    error &&

                    <p className="offline-player-error">

                        {error}

                    </p>

                }



                <form onSubmit={handleSubmit}>


                    <label>

                        Player Name

                    </label>



                    <input

                        value={displayName}

                        onChange={
                            event =>
                                setDisplayName(
                                    event.target.value
                                )
                        }

                        maxLength={100}

                    />



                    <div className="offline-player-actions">


                        <button

                            type="button"

                            onClick={onClose}

                        >

                            Cancel

                        </button>



                        <button

                            type="submit"

                            disabled={saving}

                        >

                            {
                                saving
                                    ? "Creating..."
                                    : "Create Player"
                            }

                        </button>


                    </div>


                </form>


            </div>


        </div>

    );

}