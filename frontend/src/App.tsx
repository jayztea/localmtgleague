import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
}
from "react-router-dom";


import Login
from "./pages/Login/Login";


import Register
from "./pages/Register/Register";


import ForgotPassword
from "./pages/ForgotPassword/ForgotPassword";


import ResetPassword
from "./pages/ResetPassword/ResetPassword";


import Dashboard
from "./pages/Dashboard";


import CreateMatch
from "./pages/CreateMatch/CreateMatch";


import CreateLeague
from "./pages/CreateLeague/CreateLeague";


import JoinLeague
from "./pages/JoinLeague/JoinLeague";


import LeaguePage
from "./pages/League/LeaguePage";


import MatchDetails
from "./pages/MatchDetails/MatchDetails";


import ProtectedRoute
from "./auth/ProtectedRoute";






export default function App(){


    return (

        <BrowserRouter>


            <Routes>





                <Route

                    path="/login"

                    element={
                        <Login />
                    }

                />





                <Route

                    path="/register"

                    element={
                        <Register />
                    }

                />





                <Route

                    path="/forgot-password"

                    element={
                        <ForgotPassword />
                    }

                />





                <Route

                    path="/reset-password/:token"

                    element={
                        <ResetPassword />
                    }

                />









                <Route

                    path="/dashboard"

                    element={

                        <ProtectedRoute>

                            <Dashboard />

                        </ProtectedRoute>

                    }

                />








                <Route

                    path="/league/:leagueId"

                    element={

                        <ProtectedRoute>

                            <LeaguePage />

                        </ProtectedRoute>

                    }

                />








                <Route

                    path="/matches/create"

                    element={

                        <ProtectedRoute>

                            <CreateMatch />

                        </ProtectedRoute>

                    }

                />








                <Route

                    path="/leagues/create"

                    element={

                        <ProtectedRoute>

                            <CreateLeague />

                        </ProtectedRoute>

                    }

                />








                <Route

                    path="/leagues/join"

                    element={

                        <ProtectedRoute>

                            <JoinLeague />

                        </ProtectedRoute>

                    }

                />








                <Route

                    path="/matches/:matchId"

                    element={

                        <MatchDetails />

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