import {
    useState
}
from "react";


import {
    useNavigate
}
from "react-router-dom";


import {
    createLeague
}
from "../../services/leagueService";





export default function CreateLeague(){


    const navigate =
        useNavigate();





    const [
        leagueName,
        setLeagueName
    ] =
    useState("");





    const [
        description,
        setDescription
    ] =
    useState("");





    const [
        leagueCode,
        setLeagueCode
    ] =
    useState<string | null>(null);





    const [
        error,
        setError
    ] =
    useState("");








    async function handleSubmit(
        event: React.FormEvent
    ){


        event.preventDefault();



        try {


            setError("");



            const league =
                await createLeague({

                    league_name:
                        leagueName,

                    description

                });



            setLeagueCode(

                league.league_code

            );


        }
        catch(error:any){


            setError(

                error.response?.data?.message
                ??
                "Unable to create league."

            );


        }


    }








    if(leagueCode){


        return (


            <div className="p-8 space-y-6">


                <h1 className="text-3xl font-bold">


                    League Created!


                </h1>





                <p>


                    Share this league code with your friends:


                </p>





                <div className="text-2xl font-bold">


                    {leagueCode}


                </div>





                <button


                    className="border px-4 py-2"


                    onClick={()=>


                        navigate(

                            "/dashboard"

                        )


                    }


                >


                    Return Dashboard


                </button>



            </div>


        );


    }









    return (


        <div className="p-8 max-w-xl">



            <h1 className="text-3xl font-bold mb-6">


                Create League


            </h1>






            {

            error &&


            <div className="mb-4">


                {error}


            </div>

            }







            <form

                onSubmit={handleSubmit}

                className="space-y-4"

            >



                <div>


                    <label>


                        League Name


                    </label>


                    <input


                        className="border w-full p-2"


                        value={leagueName}


                        onChange={event=>

                            setLeagueName(

                                event.target.value

                            )

                        }


                    />


                </div>







                <div>


                    <label>


                        Description


                    </label>


                    <textarea


                        className="border w-full p-2"


                        value={description}


                        onChange={event=>

                            setDescription(

                                event.target.value

                            )

                        }


                    />


                </div>








                <button


                    className="border px-4 py-2"


                    type="submit"


                >


                    Create League


                </button>





            </form>




        </div>


    );


}