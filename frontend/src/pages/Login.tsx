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
from "../auth/AuthContext";



export default function Login() {


    const {
        login
    } =
        useAuth();



    const navigate =
        useNavigate();



    const [email,setEmail] =
        useState("");



    const [password,setPassword] =
        useState("");



    const [error,setError] =
        useState("");





    async function handleSubmit(
        e:React.FormEvent
    ) {


        e.preventDefault();



        try {


            await login(
                email,
                password
            );


            navigate(
                "/dashboard"
            );


        }
        catch(error) {


            setError(
                "Invalid login."
            );


        }


    }





    return (

        <div className="min-h-screen flex items-center justify-center">

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                <h1 className="text-2xl">
                    MTG League Login
                </h1>


                {error &&

                    <div>
                        {error}
                    </div>

                }



                <input

                    className="border p-2"

                    placeholder="Email"

                    value={email}

                    onChange={
                        e =>
                            setEmail(
                                e.target.value
                            )
                    }

                />



                <input

                    className="border p-2"

                    type="password"

                    placeholder="Password"

                    value={password}

                    onChange={
                        e =>
                            setPassword(
                                e.target.value
                            )
                    }

                />



                <button

                    className="border px-4 py-2"

                    type="submit"

                >

                    Login

                </button>


            </form>


        </div>

    );

}