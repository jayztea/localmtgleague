import CommanderSelector
    from "../components/CommanderSelector";

import StepNavigation
    from "../components/StepNavigation";

import StepHeader
    from "../../../components/ui/StepHeader";

import type {
    MatchCommander,
    CreateMatchState
} from "../types";

import "../CreateMatch.css";

interface Props {

    matchState: CreateMatchState;

    setMatchState:
        React.Dispatch<
            React.SetStateAction<CreateMatchState>
        >;

    nextStep: () => void;

    previousStep: () => void;

    cancelMatch: () => void;

}

export default function Step3AssignCommanders({
    matchState,
    setMatchState,
    nextStep,
    previousStep,
    cancelMatch
}: Props) {

    function updateCommander(
        playerId: number,
        commanderId: number
    ) {

        setMatchState(
            currentState => ({

                ...currentState,

                players:
                    currentState.players.map(
                        player => {

                            if (
                                player.player_id !==
                                playerId
                            ) {

                                return player;

                            }

                            const commanderChanged =
                                player.selected_commander_id !==
                                commanderId;

                            return {

                                ...player,

                                selected_commander_id:
                                    commanderId,

                                selected_secondary_commander_id:
                                    commanderChanged
                                        ? null
                                        : player.selected_secondary_commander_id

                            };

                        }
                    )

            })
        );

    }

    function commanderAdded(
        playerId: number,
        commander: MatchCommander
    ) {

        setMatchState(
            currentState => ({

                ...currentState,

                players:
                    currentState.players.map(
                        player => {

                            if (
                                player.player_id !==
                                playerId
                            ) {

                                return player;

                            }

                            const commanderAlreadyExists =
                                player.commanders.some(
                                    existingCommander =>
                                        existingCommander.commander_id ===
                                        commander.commander_id
                                );

                            return {

                                ...player,

                                commanders:
                                    commanderAlreadyExists
                                        ? player.commanders
                                        : [
                                            ...player.commanders,
                                            commander
                                        ],

                                selected_commander_id:
                                    commander.commander_id,

                                selected_secondary_commander_id:
                                    null

                            };

                        }
                    )

            })
        );

    }

    function secondaryCommanderAdded(
        playerId: number,
        commander: MatchCommander
    ) {

        setMatchState(
            currentState => ({

                ...currentState,

                players:
                    currentState.players.map(
                        player => {

                            if (
                                player.player_id !==
                                playerId
                            ) {

                                return player;

                            }

                            const commanderAlreadyExists =
                                player.commanders.some(
                                    existingCommander =>
                                        existingCommander.commander_id ===
                                        commander.commander_id
                                );

                            return {

                                ...player,

                                commanders:
                                    commanderAlreadyExists
                                        ? player.commanders
                                        : [
                                            ...player.commanders,
                                            commander
                                        ],

                                selected_secondary_commander_id:
                                    commander.commander_id

                            };

                        }
                    )

            })
        );

    }

    const allPlayersHaveCommander =
        matchState.players.every(
            player =>
                player.selected_commander_id !== null
        );

    return (

        <>

            <StepHeader

                step={3}

                title="Assign Commanders"

                description="Select a commander for each player."

            />

            <div className="assignment-list">

                {

                    matchState.players.map(
                        player => (

                            <div

                                key={
                                    player.player_id
                                }

                                className="assignment-card"

                            >

                                <div
                                    className="assignment-player"
                                >

                                    {
                                        player.display_name
                                    }

                                </div>

                                <div
                                    className="assignment-label"
                                >

                                    Commander

                                </div>

                                <CommanderSelector

                                    player={
                                        player
                                    }

                                    selectedCommanderId={
                                        player.selected_commander_id
                                    }

                                    selectedSecondaryCommanderId={
                                        player.selected_secondary_commander_id
                                    }

                                    onChange={
                                        updateCommander
                                    }

                                    onCommanderAdded={
                                        commanderAdded
                                    }

                                    onSecondaryCommanderAdded={
                                        secondaryCommanderAdded
                                    }

                                />

                            </div>

                        )
                    )

                }

            </div>

            <StepNavigation

                previousStep={
                    previousStep
                }

                nextStep={
                    nextStep
                }

                cancelMatch={
                    cancelMatch
                }

                disableNext={
                    !allPlayersHaveCommander
                }

            />

        </>

    );

}