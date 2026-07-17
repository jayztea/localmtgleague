import {
    createContext,
    useContext,
    useEffect,
    useState
}
from "react";


import api from "../api/axios";


import type {
    User
}
from "../types/auth";



interface AuthContextType {

    user:User | null;

    login:
        (
            email:string,
            password:string
        ) => Promise<void>;

    logout:
        () => void;

    loading:boolean;

}



const AuthContext =
    createContext<AuthContextType | undefined>(
        undefined
    );





export function AuthProvider(
    {
        children
    }:
    {
        children:React.ReactNode
    }
) {


    const [user,setUser] =
        useState<User | null>(
            null
        );


    const [loading,setLoading] =
        useState(true);




    useEffect(
        () => {


            async function loadUser() {


                const token =
                    localStorage.getItem(
                        "token"
                    );


                if (!token) {

                    setLoading(false);

                    return;

                }



                try {


                    const response =
                        await api.get(
                            "/auth/me"
                        );


                    setUser(
                        response.data
                    );


                }
                catch(error) {


                    localStorage.removeItem(
                        "token"
                    );


                }
                finally {

                    setLoading(false);

                }


            }



            loadUser();


        },
        []

    );





    async function login(
        email:string,
        password:string
    ) {


        const response =
            await api.post(
                "/auth/login",
                {

                    email_address:
                        email,

                    password

                }
            );



        localStorage.setItem(

            "token",

            response.data.token

        );



        const userResponse =
            await api.get(
                "/auth/me"
            );



        setUser(
            userResponse.data
        );


    }





    function logout() {


        localStorage.removeItem(
            "token"
        );


        setUser(null);

    }





    return (

        <AuthContext.Provider
            value={{

                user,

                login,

                logout,

                loading

            }}
        >

            {children}

        </AuthContext.Provider>

    );

}





export function useAuth() {


    const context =
        useContext(
            AuthContext
        );


    if (!context) {

        throw new Error(
            "useAuth must be used inside AuthProvider"
        );

    }


    return context;

}