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

import LeaguesPage
from "./pages/League/LeaguesPage";

import LeaguePage
from "./pages/League/LeaguePage";

import PlayerPage
from "./pages/Player/PlayerPage";

import MatchDetails
from "./pages/MatchDetails/MatchDetails";

import EditMatch
from "./pages/EditMatch/EditMatch";

import ProtectedRoute
from "./auth/ProtectedRoute";

import AppLayout
from "./components/navigation/AppLayout";


export default function App(){

    return(

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

                    element={

                        <ProtectedRoute>

                            <AppLayout />

                        </ProtectedRoute>

                    }

                >


                    <Route

                        path="/dashboard"

                        element={
                            <Dashboard />
                        }

                    />


                    <Route

                        path="/leagues"

                        element={
                            <LeaguesPage />
                        }

                    />


                    <Route

                        path="/player/:playerId"

                        element={
                            <PlayerPage />
                        }

                    />


                    <Route

                        path="/league/:leagueId"

                        element={
                            <LeaguePage />
                        }

                    />


                    <Route

                        path="/matches/create"

                        element={
                            <CreateMatch />
                        }

                    />


                    <Route

                        path="/matches/:matchId"

                        element={
                            <MatchDetails />
                        }

                    />


                    <Route

                        path="/matches/:matchId/edit"

                        element={
                            <EditMatch />
                        }

                    />


                    <Route

                        path="/leagues/create"

                        element={
                            <CreateLeague />
                        }

                    />


                    <Route

                        path="/leagues/join"

                        element={
                            <JoinLeague />
                        }

                    />


                </Route>


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