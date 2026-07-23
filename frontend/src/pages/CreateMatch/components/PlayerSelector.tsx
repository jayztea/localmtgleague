import { useState } from "react";

import type { MatchPlayer } from "../types";

import "../CreateMatch.css";

interface Props {

    availablePlayers: MatchPlayer[];

    selectedPlayers: MatchPlayer[];

    setAvailablePlayers: (players: MatchPlayer[]) => void;

    setSelectedPlayers: (players: MatchPlayer[]) => void;

}

export default function PlayerSelector({

    availablePlayers,

    selectedPlayers,

    setAvailablePlayers,

    setSelectedPlayers

}: Props) {

    const [selectedAvailable, setSelectedAvailable] = useState<number[]>([]);
    const [selectedSelected, setSelectedSelected] = useState<number[]>([]);

    function toggleAvailable(id: number) {

        setSelectedAvailable(

            selectedAvailable.includes(id)

                ? selectedAvailable.filter(x => x !== id)

                : [...selectedAvailable, id]

        );

    }

    function toggleSelected(id: number) {

        setSelectedSelected(

            selectedSelected.includes(id)

                ? selectedSelected.filter(x => x !== id)

                : [...selectedSelected, id]

        );

    }

    function moveRight() {

        const moving = availablePlayers.filter(p =>
            selectedAvailable.includes(p.player_id)
        );

        setSelectedPlayers([...selectedPlayers, ...moving]);

        setAvailablePlayers([]);

        setSelectedAvailable([]);

    }

    function moveLeft() {

        const remaining = selectedPlayers.filter(
            p => !selectedSelected.includes(p.player_id)
        );

        setSelectedPlayers(remaining);

        setSelectedSelected([]);

    }

    return (

        <div className="player-transfer-container">

            <div className="transfer-box">

                <h3>Available Players</h3>

                <div className="transfer-list">

                    {availablePlayers.map(player => (

                        <label
                            key={player.player_id}
                            className="transfer-item"
                        >

                            <input
                                type="checkbox"
                                checked={selectedAvailable.includes(player.player_id)}
                                onChange={() => toggleAvailable(player.player_id)}
                            />

                            {player.display_name}

                        </label>

                    ))}

                </div>

            </div>

            <div className="transfer-buttons">

                <button onClick={moveRight}>→</button>

                <button onClick={moveLeft}>←</button>

            </div>

            <div className="transfer-box">

                <h3>Selected Players</h3>

                <div className="transfer-list">

                    {selectedPlayers.map(player => (

                        <label
                            key={player.player_id}
                            className="transfer-item"
                        >

                            <input
                                type="checkbox"
                                checked={selectedSelected.includes(player.player_id)}
                                onChange={() => toggleSelected(player.player_id)}
                            />

                            {player.display_name}

                        </label>

                    ))}

                </div>

            </div>

        </div>

    );

}