import {
    useState
}
from "react";

import {
    useNavigate
}
from "react-router-dom";

import {
    createMatch
}
from "../../../services/matchService";

import StepNavigation
from "../components/StepNavigation";

import StepHeader
from "../../../components/ui/StepHeader";

import type {
    CreateMatchState,
    MatchCommander
}
from "../types";

import "../CreateMatch.css";

interface Props {

    matchState:
        CreateMatchState;

    previousStep:
        () => void;

    cancelMatch:
        () => void;

    saveMatch?:
        () => Promise<void>;

}

export default function Step5ReviewMatch({

    matchState,

    previousStep,

    cancelMatch,

    saveMatch

}: Props){

    const navigate =
        useNavigate();

    const [
        isSubmitting,
        setIsSubmitting
    ] = useState(false);

    const today =
        new Date()
            .toLocaleDateString();

    function getCommander(
        player: typeof matchState.players[number]
    ): MatchCommander | null {

        return (
            player.commanders?.find(
                commander =>
                    commander.commander_id ===
                    player.selected_commander_id
            ) ?? null
        );

    }

    function getSecondaryCommander(
        player: typeof matchState.players[number]
    ): MatchCommander | null {

        return (
            player.commanders?.find(
                commander =>
                    commander.commander_id ===
                    player.selected_secondary_commander_id
            ) ?? null
        );

    }

    function sortedPlayers(){

        return [
            ...matchState.players
        ]
        .sort(
            (a, b) =>
                (a.placement ?? 0)
                -
                (b.placement ?? 0)
        );

    }

    async function recordMatch(){

        if(isSubmitting){

            return;

        }

        setIsSubmitting(true);

        try {

            if(!matchState.league){

                throw new Error(
                    "League is required before creating a match"
                );

            }

            const request = {

                league_id:
                    matchState.league.league_id,

                players:
                    matchState.players.map(
                        player => ({

                            player_id:
                                player.player_id,

                            commander_id:
                                player.selected_commander_id ?? 0,

                            secondary_commander_id:
                                player.selected_secondary_commander_id
                                ?? undefined,

                            finish_position:
                                player.placement
                                ?? undefined,

                            ending_life:
                                player.ending_life
                                ?? undefined

                        })
                    )

            };

            await createMatch(
                request
            );

            alert(
                "Match recorded successfully!"
            );

            navigate(
                "/dashboard"
            );

        }
        catch(error){

            console.error(
                "FAILED TO CREATE MATCH",
                error
            );

            setIsSubmitting(false);

            alert(
                "Failed to record match."
            );

        }

    }

    async function handleSave(){

        if(isSubmitting){

            return;

        }

        if(saveMatch){

            setIsSubmitting(true);

            try {

                await saveMatch();

            }
            catch(error){

                console.error(
                    "FAILED TO SAVE MATCH",
                    error
                );

                setIsSubmitting(false);

                throw error;

            }

            return;

        }

        await recordMatch();

    }

    return (

        <>

            <StepHeader

                step={5}

                title="Review & Record Match"

                description="Review the match details below and record the results."

            />

            <div className="review-layout">

                <div className="summary-card">

                    <h2>
                        Match Summary
                    </h2>

                    <p>

                        <strong>
                            League:
                        </strong>

                        {" "}

                        {
                            matchState.league?.league_name
                        }

                    </p>

                    <p>

                        <strong>
                            Date:
                        </strong>

                        {" "}

                        {
                            today
                        }

                    </p>

                    <p>

                        <strong>
                            Players:
                        </strong>

                        {" "}

                        {
                            matchState.players.length
                        }

                    </p>

                </div>

                <div className="review-results">

                    {
                        sortedPlayers()
                            .map(player => {

                                const commander =
                                    getCommander(
                                        player
                                    );

                                const secondaryCommander =
                                    getSecondaryCommander(
                                        player
                                    );

                                return (

                                    <div

                                        key={
                                            player.player_id
                                        }

                                        className="review-player-card"

                                    >

                                        <div className="review-placement">

                                            #
                                            {
                                                player.placement
                                            }

                                        </div>

                                        <div>

                                            <div className="review-player-name">

                                                {
                                                    player.display_name
                                                }

                                            </div>

                                            <div className="review-commander">

                                                {
                                                    commander?.commander_name
                                                    ?? ""
                                                }

                                            </div>

                                            {
                                                secondaryCommander && (

                                                    <div className="review-commander">

                                                        {
                                                            secondaryCommander.commander_name
                                                        }

                                                    </div>

                                                )
                                            }

                                        </div>

                                    </div>

                                );

                            })
                    }

                </div>

            </div>

            <StepNavigation

                previousStep={
                    previousStep
                }

                cancelMatch={
                    cancelMatch
                }

                nextStep={
                    handleSave
                }

                nextLabel={

                    isSubmitting

                    ? (

                        saveMatch
                        ? "Saving..."
                        : "Recording..."

                    )

                    : (

                        saveMatch
                        ? "Save Changes"
                        : "Record Match +"

                    )

                }

            />

        </>

    );

}