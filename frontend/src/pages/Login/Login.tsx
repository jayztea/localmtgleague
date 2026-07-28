import {
    useState
} from "react";


import {
    useNavigate
} from "react-router-dom";


import {
    useAuth
} from "../../auth/AuthContext";


import "./Login.css";


import logo
from "../../styles/assets/branding/local-magic-league-logo.png";


import heroImage
from "../../styles/assets/branding/hero-illustration.png";





export default function Login(){


    const {
        login
    } =
    useAuth();



    const navigate =
        useNavigate();




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



            await login(

                email,

                password

            );



            navigate(
                "/dashboard"
            );


        }
        catch(err){


            console.error(err);



            setError(
                "Invalid email or password."
            );


        }


    }






    return (

        <div className="login-page">


            <div className="login-layout">





                <section className="login-hero">



                    <img

                        src={logo}

                        alt="Local Magic League"

                        className="login-logo"

                    />





                    <div className="hero-content">



                        <h1>

                            Everything your
                            Commander league needs.

                        </h1>




                        <p>

                            Create leagues, organize your
                            playgroup, record Commander
                            matches, and discover detailed
                            player statistics that grow with
                            every game.

                        </p>





                        <ul className="feature-list">


                            <li>

                                <span>
                                    ●
                                </span>

                                Organize private Commander leagues

                            </li>



                            <li>

                                <span>
                                    ●
                                </span>

                                Record multiplayer Commander matches

                            </li>



                            <li>

                                <span>
                                    ●
                                </span>

                                Explore rich player statistics

                            </li>



                            <li>

                                <span>
                                    ●
                                </span>

                                Track commander history

                            </li>



                            <li>

                                <span>
                                    ●
                                </span>

                                Follow league leaderboards

                            </li>



                        </ul>


                    </div>






                    <div className="hero-panel">


                        <img

                            src={heroImage}

                            alt="Commander league experience"

                            className="hero-image"

                        />


                    </div>





                </section>









                <section className="login-section">



                    <div className="login-card">



                        <h2>

                            Welcome Back

                        </h2>




                        <p>

                            Sign in to continue
                            your league experience.

                        </p>







                        {
                            error &&


                            <div className="login-error">

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







                            {/*<button

                                type="button"

                                className="forgot-button"

                                onClick={() =>
                                    navigate(
                                        "/forgot-password"
                                    )
                                }

                            >

                                Forgot Password?

                            </button>*/}








                            <button

                                type="submit"

                                className="login-button"

                            >

                                Sign In

                            </button>





                        </form>








                        <div className="register-prompt">



                            <span>

                                New to Local Magic League?

                            </span>




                            <button

                                type="button"

                                onClick={() =>
                                    navigate(
                                        "/register"
                                    )
                                }

                            >

                                Create Account

                            </button>



                        </div>





                    </div>



                </section>





            </div>



        </div>

    );


}