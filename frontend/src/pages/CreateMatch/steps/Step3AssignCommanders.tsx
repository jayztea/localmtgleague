import CommanderSelector from "../components/CommanderSelector";

import type {
    CreateMatchState
}
from "../types";

import "../CreateMatch.css";

interface Props {

    matchState: CreateMatchState;

    setMatchState:
    React.Dispatch<
        React.SetStateAction<CreateMatchState>
    >;

    nextStep: () => void;

    previousStep: () => void;

}

export default function Step3AssignCommanders({

    matchState,

    setMatchState,

    nextStep,

    previousStep

}: Props) {

    function updateCommander(

        playerId: number,

        commanderId: number

    ) {

        setMatchState({

            ...matchState,

            players:

                matchState.players.map(player =>

                    player.player_id === playerId

                        ? {

                            ...player,

                            selected_commander_id: commanderId

                        }

                        : player

                )

        });

    }

    function commanderAdded(

        playerId: number,

        commander: any

    ) {

        setMatchState({

            ...matchState,

            players:

                matchState.players.map(player =>

                    player.player_id === playerId

                        ? {

                            ...player,

                            commanders: [

                                ...player.commanders,

                                commander

                            ],

                            selected_commander_id:
                                commander.commander_id

                        }

                        : player

                )

        });

    }

    const allPlayersHaveCommander =

        matchState.players.every(

            player => player.selected_commander_id

        );

    return (

        <div className="create-match-page">

            <div className="create-match-card">

                <h1 className="page-title">

                    (3) Assign Commanders

                </h1>

                <p className="page-subtitle">

                    Select a commander for each player.

                </p>

                <div className="assignment-table">

                    <div className="assignment-header">

                        <div>Player</div>

                        <div>Commander</div>

                    </div>

                    {

                        matchState.players.map(player => (

                            <div
                                key={player.player_id}
                                className="assignment-row"
                            >

                                <div className="assignment-player">

                                    {player.display_name}

                                </div>

                                <div className="assignment-selector">

                                    <CommanderSelector

                                        player={player}

                                        selectedCommanderId={
                                            player.selected_commander_id
                                        }

                                        onChange={updateCommander}

                                        onCommanderAdded={
                                            commanderAdded
                                        }

                                    />

                                </div>

                            </div>

                        ))

                    }

                </div>

                <div className="wizard-footer">

                    <button

                        className="secondary-button"

                        onClick={previousStep}

                    >

                        ← Back

                    </button>

                    <button

                        className="primary-button"

                        disabled={!allPlayersHaveCommander}

                        onClick={nextStep}

                    >

                        Next →

                    </button>

                </div>

            </div>

        </div>

    );

}