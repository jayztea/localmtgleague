import {
    useState
}
from "react";


import {
    useNavigate
}
from "react-router-dom";


import api
from "../../api/axios";


import "./ForgotPassword.css";





export default function ForgotPassword(){


    const navigate =
        useNavigate();




    const [
        email,
        setEmail
    ] =
    useState("");



    const [
        message,
        setMessage
    ] =
    useState("");



    const [
        error,
        setError
    ] =
    useState("");








    async function handleSubmit(
        e:React.FormEvent
    ){


        e.preventDefault();



        try{


            setError("");



            await api.post(

                "/auth/forgot-password",

                {

                    email_address:email

                }

            );





            setMessage(

                "If an account exists with that email, password reset instructions have been sent."

            );



        }
        catch(err){


            console.error(err);



            setError(

                "Unable to process password reset request."

            );


        }


    }








    return (

        <div className="forgot-page">



            <div className="forgot-card">





                <h1>

                    Forgot Password

                </h1>





                <p>

                    Enter your email address and
                    we will send instructions to
                    reset your password.

                </p>








                {
                    message &&


                    <div className="forgot-success">

                        {message}

                    </div>

                }







                {
                    error &&


                    <div className="forgot-error">

                        {error}

                    </div>

                }








                <form

                    onSubmit={handleSubmit}

                >




                    <label>

                        Email Address

                    </label>





                    <input

                        type="email"

                        value={email}

                        onChange={
                            e =>
                                setEmail(
                                    e.target.value
                                )
                        }

                        placeholder="you@example.com"

                        required

                    />







                    <button

                        type="submit"

                    >

                        Send Reset Instructions

                    </button>





                </form>







                <button

                    className="back-login"

                    type="button"

                    onClick={() =>
                        navigate(
                            "/login"
                        )
                    }

                >

                    Back to Login

                </button>





            </div>



        </div>

    );


}