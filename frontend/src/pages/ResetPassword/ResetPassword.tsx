import {
    useState
}
from "react";


import {
    useNavigate,
    useParams
}
from "react-router-dom";


import api
from "../../api/axios";


import "./ResetPassword.css";






export default function ResetPassword(){


    const {

        token

    }
    =
    useParams();




    const navigate =
        useNavigate();





    const [

        password,

        setPassword

    ]
    =
    useState("");




    const [

        confirmPassword,

        setConfirmPassword

    ]
    =
    useState("");




    const [

        message,

        setMessage

    ]
    =
    useState("");




    const [

        error,

        setError

    ]
    =
    useState("");









    async function handleSubmit(

        e:React.FormEvent

    ){


        e.preventDefault();



        try{


            setError("");

            setMessage("");





            if(password !== confirmPassword){


                setError(

                    "Passwords do not match."

                );


                return;


            }






            await api.post(

                "/auth/reset-password",

                {

                    token,

                    password

                }

            );






            setMessage(

                "Password updated successfully. Redirecting to login..."

            );






            setTimeout(() => {


                navigate(
                    "/login"
                );


            },2000);




        }
        catch(error){


            console.error(error);



            setError(

                "Unable to reset password. The link may have expired."

            );


        }


    }








    return (

        <div className="reset-page">


            <div className="reset-card">





                <h1>

                    Reset Password

                </h1>





                <p>

                    Enter your new password below.

                </p>







                {
                    message &&


                    <div className="reset-success">

                        {message}

                    </div>

                }








                {
                    error &&


                    <div className="reset-error">

                        {error}

                    </div>

                }









                <form

                    onSubmit={handleSubmit}

                >





                    <label>

                        New Password

                    </label>




                    <input

                        type="password"

                        value={password}

                        onChange={
                            e =>
                                setPassword(
                                    e.target.value
                                )
                        }

                        placeholder="Minimum 8 characters"

                        required

                    />







                    <label>

                        Confirm Password

                    </label>






                    <input

                        type="password"

                        value={confirmPassword}

                        onChange={
                            e =>
                                setConfirmPassword(
                                    e.target.value
                                )
                        }

                        placeholder="Confirm password"

                        required

                    />









                    <button

                        type="submit"

                    >

                        Update Password

                    </button>





                </form>







            </div>


        </div>

    );


}