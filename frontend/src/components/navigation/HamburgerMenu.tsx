import {
    useEffect,
    useState
}
from "react";

import {
    useLocation,
    useNavigate
}
from "react-router-dom";

import {
    useAuth
}
from "../../auth/AuthContext";

import {
    getDashboard
}
from "../../services/dashboardService";

import "./HamburgerMenu.css";


export default function HamburgerMenu(){

    const {
        logout
    } =
    useAuth();


    const navigate =
        useNavigate();


    const location =
        useLocation();


    const [
        isOpen,
        setIsOpen
    ] =
    useState(false);


    const [
        playerId,
        setPlayerId
    ] =
    useState<number | null>(null);


    useEffect(
        ()=>{

            async function loadPlayer(){

                try{

                    const dashboard =
                        await getDashboard();

                    setPlayerId(
                        dashboard.player.player_id
                    );

                }
                catch(error){

                    console.error(
                        "Failed to load player information:",
                        error
                    );

                }

            }


            loadPlayer();

        },
        []
    );


    useEffect(
        ()=>{

            setIsOpen(false);

        },
        [
            location.pathname
        ]
    );


    useEffect(
        ()=>{

            function handleKeyDown(
                event:KeyboardEvent
            ){

                if(
                    event.key === "Escape"
                ){

                    setIsOpen(false);

                }

            }


            document.addEventListener(
                "keydown",
                handleKeyDown
            );


            return()=>{

                document.removeEventListener(
                    "keydown",
                    handleKeyDown
                );

            };

        },
        []
    );


    function navigateTo(
        path:string
    ){

        setIsOpen(false);

        navigate(
            path
        );

    }


    function navigateToProfile(){

        if(
            !playerId
        ){

            return;

        }


        navigateTo(
            `/player/${playerId}`
        );

    }


    return(

        <div className="hamburger-navigation">


            <button

                type="button"

                className="hamburger-menu-button"

                onClick={()=>setIsOpen(true)}

                aria-label="Open navigation menu"

                aria-expanded={isOpen}

            >

                <span></span>

                <span></span>

                <span></span>

            </button>


            <div className="hamburger-navigation-brand">

                Local Magic League

            </div>


            {
                isOpen &&

                <>

                    <div

                        className="hamburger-menu-overlay"

                        onClick={()=>setIsOpen(false)}

                    />


                    <aside

                        className="hamburger-menu"

                        aria-label="Main navigation"

                    >


                        <div className="hamburger-menu-header">


                            <h2>

                                Local Magic League

                            </h2>


                            <button

                                type="button"

                                className="hamburger-menu-close"

                                onClick={()=>setIsOpen(false)}

                                aria-label="Close navigation menu"

                            >

                                ×

                            </button>


                        </div>


                        <nav className="hamburger-menu-navigation">


                            <button

                                type="button"

                                className={
                                    `hamburger-menu-item ${
                                        location.pathname === "/dashboard"
                                            ? "active"
                                            : ""
                                    }`
                                }

                                onClick={()=>navigateTo(
                                    "/dashboard"
                                )}

                            >

                                Dashboard

                            </button>


                            <button

                                type="button"

                                className={
                                    `hamburger-menu-item ${
                                        location.pathname.startsWith("/player/")
                                            ? "active"
                                            : ""
                                    }`
                                }

                                onClick={
                                    navigateToProfile
                                }

                                disabled={
                                    !playerId
                                }

                            >

                                My Profile

                            </button>


                            <button

                                type="button"

                                className={
                                    `hamburger-menu-item ${
                                        location.pathname === "/leagues" ||
                                        location.pathname.startsWith("/league/")
                                            ? "active"
                                            : ""
                                    }`
                                }

                                onClick={()=>navigateTo(
                                    "/leagues"
                                )}

                            >

                                Leagues

                            </button>


                            <button

                                type="button"

                                className={
                                    `hamburger-menu-item ${
                                        location.pathname === "/matches/create"
                                            ? "active"
                                            : ""
                                    }`
                                }

                                onClick={()=>navigateTo(
                                    "/matches/create"
                                )}

                            >

                                Create Match

                            </button>


                        </nav>


                        <div className="hamburger-menu-footer">


                            <button

                                type="button"

                                className="hamburger-menu-item hamburger-menu-logout"

                                onClick={()=>{

                                    setIsOpen(false);

                                    logout();

                                }}

                            >

                                Logout

                            </button>


                        </div>


                    </aside>

                </>

            }


        </div>

    );

}