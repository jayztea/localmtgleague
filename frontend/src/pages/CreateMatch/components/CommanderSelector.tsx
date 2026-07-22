import { useState } from "react";

import AddCommanderModal from "./AddCommanderModal";

import type {
    LeaguePlayer
}
from "../../../types/match";

import "../CreateMatch.css";

interface Props {

    player: LeaguePlayer;

    selectedCommanderId?: number;

    onChange: (
        playerId: number,
        commanderId: number
    ) => void;

    onCommanderAdded: (
        playerId: number,
        commander: any
    ) => void;

}

export default function CommanderSelector({

    player,

    selectedCommanderId,

    onChange,

    onCommanderAdded

}: Props) {

    const [showModal, setShowModal] =
        useState(false);

    function handleChange(

        event: React.ChangeEvent<HTMLSelectElement>

    ) {

        const value = event.target.value;

        if (value === "add") {

            setShowModal(true);

            return;

        }

        onChange(

            player.player_id,

            Number(value)

        );

    }

    function handleCommanderAdded(

        commander: any

    ) {

        onCommanderAdded(

            player.player_id,

            commander

        );

        setShowModal(false);

    }

    return (

        <>

            <select

                className="commander-select"

                value={selectedCommanderId ?? ""}

                onChange={handleChange}

            >

                <option value="">

                    Select Commander

                </option>

                {

                    player.commanders.map(commander => (

                        <option

                            key={commander.commander_id}

                            value={commander.commander_id}

                        >

                            {commander.commander_name}

                        </option>

                    ))

                }

                <option value="add">

                    + Add Commander...

                </option>

            </select>

            {

                showModal &&

                <AddCommanderModal

                    player={player}

                    onClose={() =>

                        setShowModal(false)

                    }

                    onCommanderAdded={

                        handleCommanderAdded

                    }

                />

            }

        </>

    );

}