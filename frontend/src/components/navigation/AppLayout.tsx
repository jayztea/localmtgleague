import {
    Outlet
}
from "react-router-dom";

import HamburgerMenu
from "./HamburgerMenu";

import "./AppLayout.css";


export default function AppLayout(){

    return(

        <div className="app-layout">

            <header className="app-layout-header">

                <HamburgerMenu />

            </header>


            <main className="app-layout-content">

                <Outlet />

            </main>

        </div>

    );

}