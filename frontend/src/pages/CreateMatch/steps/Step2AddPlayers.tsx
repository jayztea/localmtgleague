import React, { useEffect, useMemo, useState } from "react";

import {
    getLeaguePlayersWithCommanders
}
from "../../../services/leagueService";

import PlayerSelector
from "../components/PlayerSelector";

import StepHeader
from "../../../components/ui/StepHeader";

import StepNavigation
from "../components/StepNavigation";

import type {
    CreateMatchState
}
from "../types";

import type {
    LeaguePlayer
}
from "../../../types/match";

interface Props {

    matchState: CreateMatchState;

    setMatchState:
    React.Dispatch<
        React.SetStateAction<CreateMatchState>
    >;

    nextStep: () => void;

    previousStep: () => void;

}

export default function Step2AddPlayers({

    matchState,

    setMatchState,

    nextStep,

    previousStep

}: Props) {

    const [
        loading,
        setLoading
    ] =
    useState(false);

    useEffect(() => {

        async function loadPlayers() {

            if (!matchState.league)
                return;

            if (matchState.leaguePlayers.length > 0)
                return;

            try {

                setLoading(true);

                const players: LeaguePlayer[] =

                    await getLeaguePlayersWithCommanders(

                        matchState.league.league_id

                    );

                console.log(
                    "PLAYERS RESPONSE",
                    players
                );

                setMatchState(previous => ({

                    ...previous,

                    leaguePlayers: players

                }));

            }
            catch (error) {

                console.error(

                    "FAILED LOADING PLAYERS",

                    error

                );

            }
            finally {

                setLoading(false);

            }

        }

        loadPlayers();

    }, [
        matchState.league
    ]);

    const availablePlayers =
        useMemo(() => {

            return matchState.leaguePlayers.filter(

                player =>

                    !matchState.players.some(

                        selected =>

                            selected.player_id === player.player_id

                    )

            );

        }, [
            matchState.leaguePlayers,
            matchState.players
        ]);

    return (

        <div className="create-match-page">

            <div className="create-match-card">

                <StepHeader

                    step={2}

                    title="Add Players"

                    description="Select players from your league to play in this match."

                />

                {

                    loading &&

                    <p>

                        Loading players...

                    </p>

                }

                {

                    !loading &&

                    <PlayerSelector

                        availablePlayers={
                            availablePlayers
                        }

                        selectedPlayers={
                            matchState.players
                        }

                        setAvailablePlayers={() => { }}

                        setSelectedPlayers={(players) =>

                            setMatchState(previous => ({

                                ...previous,

                                players

                            }))

                        }

                    />

                }

                <StepNavigation

                    previousStep={previousStep}

                    nextStep={nextStep}

                    disableNext={
                        matchState.players.length === 0
                    }

                />

            </div>

        </div>

    );

}