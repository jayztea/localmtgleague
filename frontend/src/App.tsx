import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";


import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";

import CreateMatch from "./pages/CreateMatch/CreateMatch";

import ProtectedRoute from "./auth/ProtectedRoute";



export default function App() {


    return (

        <BrowserRouter>


            <Routes>


                <Route

                    path="/login"

                    element={<Login />}

                />



                <Route

                    path="/dashboard"

                    element={

                        <ProtectedRoute>

                            <Dashboard />

                        </ProtectedRoute>

                    }

                />



                {/*

                    Match creation

                    Optional leagueId parameter.

                    Examples:

                    /matches/create

                    /matches/create?leagueId=9

                */}

                <Route

                    path="/matches/create"

                    element={

                        <ProtectedRoute>

                            <CreateMatch />

                        </ProtectedRoute>

                    }

                />



                <Route

                    path="/"

                    element={

                        <Navigate

                            to="/dashboard"

                            replace

                        />

                    }

                />



                <Route

                    path="*"

                    element={

                        <Navigate

                            to="/dashboard"

                            replace

                        />

                    }

                />


            </Routes>


        </BrowserRouter>

    );

}