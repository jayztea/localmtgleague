import {
    useState
}
from "react";


import {
    useNavigate
}
from "react-router-dom";


import {
    useAuth
}
from "../../auth/AuthContext";


import "./Register.css";





export default function Register(){


    const {
        register
    } =
    useAuth();



    const navigate =
        useNavigate();




    const [
        displayName,
        setDisplayName
    ] =
    useState("");



    const [
        email,
        setEmail
    ] =
    useState("");



    const [
        password,
        setPassword
    ] =
    useState("");



    const [
        confirmPassword,
        setConfirmPassword
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



            if(password !== confirmPassword){


                setError(
                    "Passwords do not match."
                );


                return;


            }






            await register(

                email,

                password,

                displayName

            );





            navigate(
                "/dashboard"
            );



        }
        catch(err){


            console.error(err);



            setError(
                "Unable to create account."
            );


        }


    }







    return (

        <div className="register-page">


            <div className="register-card">



                <h1>

                    Create Account

                </h1>



                <p>

                    Join your Commander playgroup
                    and start tracking your league.

                </p>







                {
                    error &&


                    <div className="register-error">

                        {error}

                    </div>

                }







                <form
                    onSubmit={handleSubmit}
                >





                    <label>

                        Display Name

                    </label>




                    <input

                        type="text"

                        value={displayName}

                        onChange={
                            e =>
                                setDisplayName(
                                    e.target.value
                                )
                        }

                        placeholder="Your name"

                        required

                    />






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







                    <label>

                        Password

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

                        placeholder="Password"

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

                        Create Account

                    </button>





                </form>







                <div className="login-link">



                    <span>

                        Already have an account?

                    </span>




                    <button

                        type="button"

                        onClick={() =>
                            navigate(
                                "/login"
                            )
                        }

                    >

                        Sign In

                    </button>



                </div>





            </div>



        </div>

    );


}