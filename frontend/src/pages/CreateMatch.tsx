import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    getDashboard
} from "../services/dashboardService";

import type {
    getPlayersWithCommanders
} from "../services/leagueService";

import type {
    Dashboard
} from "../types/dashboard";

import type {
    LeaguePlayerCommander
} from "../types/match";

export default function CreateMatch() {

    const navigate =
        useNavigate();

    const [
        dashboard,
        setDashboard
    ] =
    useState<Dashboard>();

    const [
        selectedLeagueId,
        setSelectedLeagueId
    ] =
    useState<number>();

    const [
        players,
        setPlayers
    ] =
    useState<LeaguePlayerCommander[]>([]);

    const [
        loading,
        setLoading
    ] =
    useState(true);

    useEffect(() => {

        loadDashboard();

    }, []);

    async function loadDashboard() {

        const data =
            await getDashboard();

        setDashboard(data);

        if (data.leagues.length > 0) {

            setSelectedLeagueId(
                data.leagues[0].league_id
            );

        }

        setLoading(false);

    }

    useEffect(() => {

        if (!selectedLeagueId) {

            return;

        }

        loadPlayers(
            selectedLeagueId
        );

    }, [selectedLeagueId]);

    async function loadPlayers(
        leagueId:number
    ) {

        const response =
            await getPlayersWithCommanders(
                leagueId
            );

        setPlayers(response);

    }

    if (loading) {

        return (

            <div className="p-8">

                Loading...

            </div>

        );

    }

    return (

        <div className="max-w-6xl mx-auto p-8">

            <h1 className="text-3xl font-bold mb-6">

                Create Match

            </h1>

            <div className="mb-6">

                <label className="block mb-2">

                    League

                </label>

                <select

                    className="border rounded px-3 py-2"

                    value={selectedLeagueId}

                    onChange={(e)=>

                        setSelectedLeagueId(
                            Number(
                                e.target.value
                            )
                        )

                    }

                >

                    {

                        dashboard?.leagues.map(

                            league=>

                                <option

                                    key={
                                        league.league_id
                                    }

                                    value={
                                        league.league_id
                                    }

                                >

                                    {
                                        league.league_name
                                    }

                                </option>

                        )

                    }

                </select>

            </div>

            <div className="border rounded p-6">

                <h2 className="text-xl font-semibold mb-4">

                    League Players

                </h2>

                {

                    players.map(

                        player=>

                            <div

                                key={
                                    player.player_id
                                }

                                className="border-b py-3"

                            >

                                <div className="font-medium">

                                    {
                                        player.display_name
                                    }

                                </div>

                                <div className="text-sm text-gray-500">

                                    {

                                        player.commanders.length

                                    }

                                    {" "}Commander(s)

                                </div>

                            </div>

                    )

                }

            </div>

            <div className="mt-8">

                <button

                    className="border rounded px-5 py-2"

                    onClick={()=>

                        navigate(
                            "/dashboard"
                        )

                    }

                >

                    Cancel

                </button>

            </div>

        </div>

    );

}