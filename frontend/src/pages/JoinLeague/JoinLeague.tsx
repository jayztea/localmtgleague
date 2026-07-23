import {
    useState
}
from "react";


import {
    useNavigate
}
from "react-router-dom";


import {
    joinLeague
}
from "../../services/leagueService";







export default function JoinLeague(){


    const navigate =
        useNavigate();






    const [
        leagueCode,
        setLeagueCode
    ] =
    useState("");






    const [
        error,
        setError
    ] =
    useState("");






    const [
        success,
        setSuccess
    ] =
    useState("");







    function cancelJoin(){


        const confirmed =

            window.confirm(

                "Are you sure you want to cancel joining this league?"

            );



        if(!confirmed)

            return;



        navigate(

            "/dashboard"

        );


    }









    async function handleSubmit(

        event:React.FormEvent

    ){


        event.preventDefault();




        try {



            setError("");



            await joinLeague({


                league_code:

                    leagueCode.toUpperCase()


            });





            setSuccess(

                "Successfully joined league!"

            );



        }


        catch(error:any){



            setError(


                error.response?.data?.message

                ??

                "Unable to join league."


            );


        }



    }









    return (



        <div className="p-8 max-w-xl">






            <h1 className="text-3xl font-bold mb-6">


                Join League


            </h1>







            {


            error &&


                <div className="mb-4">


                    {error}


                </div>


            }








            {


            success ?





            <div className="space-y-6">



                <p>


                    {success}


                </p>






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





            :








            <form


                onSubmit={handleSubmit}


                className="space-y-4"


            >





                <div>



                    <label>


                        League Code


                    </label>





                    <input


                        className="border w-full p-2"


                        value={leagueCode}


                        maxLength={6}


                        onChange={event=>


                            setLeagueCode(

                                event.target.value

                            )


                        }


                    />


                </div>







                <div className="flex gap-3">





                    <button


                        className="border px-4 py-2"


                        type="submit"


                    >


                        Join League


                    </button>





                    <button


                        className="border px-4 py-2"


                        type="button"


                        onClick={cancelJoin}


                    >


                        Cancel


                    </button>





                </div>






            </form>





            }






        </div>


    );


}