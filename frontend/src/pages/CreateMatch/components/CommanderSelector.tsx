import {
    useEffect,
    useState
} from "react";

import AddCommanderModal from "./AddCommanderModal";

import type {
    MatchCommander,
    MatchPlayer
} from "../types";

import {
    getCommanderPairingRules,
    getPairingOptions
} from "../../../services/commanderService";

import "../CreateMatch.css";

interface CommanderPairingOption {

    commander_id: number;

    commander_name: string;

    scryfall_id: string;

    color_identity: string;

    type_line: string | null;

    image_url: string | null;

}

interface CommanderPairingRule {

    relationship_type:
        | "partner"
        | "partner_with"
        | "background"
        | "friends_forever"
        | "doctors_companion"
        | "partner_character_select";

    related_commander_id:
        number | null;

    related_commander_name:
        string | null;

}

interface Props {

    player: MatchPlayer;

    selectedCommanderId: number | null;

    selectedSecondaryCommanderId: number | null;

    onChange: (
        playerId: number,
        commanderId: number
    ) => void;

    onCommanderAdded: (
        playerId: number,
        commander: MatchCommander
    ) => void;

    onSecondaryCommanderAdded: (
        playerId: number,
        commander: MatchCommander
    ) => void;

}

export default function CommanderSelector({
    player,
    selectedCommanderId,
    selectedSecondaryCommanderId,
    onChange,
    onCommanderAdded,
    onSecondaryCommanderAdded
}: Props) {

    const [
        showModal,
        setShowModal
    ] = useState(false);

    const [
        pairingRules,
        setPairingRules
    ] = useState<CommanderPairingRule[]>([]);

    const [
        pairingOptions,
        setPairingOptions
    ] = useState<CommanderPairingOption[]>([]);

    const [
        loadingPairing,
        setLoadingPairing
    ] = useState(false);

    const [
        pairingError,
        setPairingError
    ] = useState<string | null>(null);

    const selectedCommander =
        player.commanders.find(
            commander =>
                commander.commander_id ===
                selectedCommanderId
        );

    useEffect(() => {

        let cancelled = false;

        async function loadPairingOptions() {

            if (!selectedCommanderId) {

                setPairingRules([]);
                setPairingOptions([]);
                setPairingError(null);
                return;

            }

            setLoadingPairing(true);
            setPairingError(null);

            try {

                const rules =
                    await getCommanderPairingRules(
                        selectedCommanderId
                    );

                if (cancelled) {
                    return;
                }

                setPairingRules(rules);

                if (rules.length === 0) {

                    setPairingOptions([]);
                    return;

                }

                const rule =
                    rules.find(
                        item =>
                            item.relationship_type !==
                            "partner_with"
                    ) ??
                    rules[0];

                const options =
                    await getPairingOptions(
                        selectedCommanderId,
                        rule.relationship_type
                    );

                if (cancelled) {
                    return;
                }

                setPairingOptions(options);

            }
            catch (error) {

                if (cancelled) {
                    return;
                }

                console.error(
                    "Failed to load commander pairing options:",
                    error
                );

                setPairingRules([]);
                setPairingOptions([]);

                setPairingError(
                    "Unable to load legal pairing options."
                );

            }
            finally {

                if (!cancelled) {

                    setLoadingPairing(false);

                }

            }

        }

        loadPairingOptions();

        return () => {

            cancelled = true;

        };

    }, [
        selectedCommanderId
    ]);

    function handleChange(
        event: React.ChangeEvent<HTMLSelectElement>
    ) {

        const value =
            event.target.value;

        if (value === "add") {

            setShowModal(true);
            return;

        }

        if (!value) {
            return;
        }

        onChange(
            player.player_id,
            Number(value)
        );

    }

    function handleCommanderAdded(
        commander: MatchCommander
    ) {

        onCommanderAdded(
            player.player_id,
            commander
        );

        setShowModal(false);

    }

    function handleSecondaryCommanderChange(
        event: React.ChangeEvent<HTMLSelectElement>
    ) {

        const value =
            event.target.value;

        if (!value) {
            return;
        }

        const commander =
            pairingOptions.find(
                option =>
                    option.commander_id ===
                    Number(value)
            );

        if (!commander) {
            return;
        }

        const secondaryCommander: MatchCommander = {

            commander_id:
                commander.commander_id,

            commander_name:
                commander.commander_name,

            color_identity:
                commander.color_identity,

            image_url:
                commander.image_url ?? undefined,

            type_line:
                commander.type_line

        };

        onSecondaryCommanderAdded(
            player.player_id,
            secondaryCommander
        );

    }

    function getPairingLabel(
        relationshipType:
            CommanderPairingRule["relationship_type"]
    ) {

        switch (relationshipType) {

            case "partner":
                return "Partner";

            case "partner_with":
                return "Partner With";

            case "background":
                return "Background";

            case "friends_forever":
                return "Friends Forever";

            case "doctors_companion":
                return "Doctor's Companion";

            case "partner_character_select":
                return "Partner — Character Select";

            default:
                return "Secondary Commander";

        }

    }

    const hasPairingRule =
        pairingRules.length > 0;

    const pairingRule =
        pairingRules.find(
            rule =>
                rule.relationship_type !==
                "partner_with"
        ) ??
        pairingRules[0];

    const primaryCommanders =
        player.commanders.filter(
            commander =>
                !(
                    commander.type_line
                    ?.toLowerCase()
                    .includes("background")
                )
        );

    return (

        <>

            <select

                className="commander-select"

                value={
                    selectedCommanderId ?? ""
                }

                onChange={
                    handleChange
                }

            >

                <option value="">

                    Select Commander

                </option>

                {

                    primaryCommanders.map(
                        commander => (

                            <option

                                key={
                                    commander.commander_id
                                }

                                value={
                                    commander.commander_id
                                }

                            >

                                {
                                    commander.commander_name
                                }

                            </option>

                        )
                    )

                }

                <option value="add">

                    + Add Commander...

                </option>

            </select>

            {

                selectedCommander &&
                hasPairingRule &&
                pairingRule &&
                (

                    <div
                        className="commander-pairing-section"
                    >

                        <div
                            className="assignment-label"
                        >

                            {
                                getPairingLabel(
                                    pairingRule.relationship_type
                                )
                            }

                        </div>

                        {

                            loadingPairing && (

                                <div
                                    className="commander-pairing-message"
                                >

                                    Loading legal options...

                                </div>

                            )

                        }

                        {

                            pairingError && (

                                <div
                                    className="commander-pairing-error"
                                >

                                    {
                                        pairingError
                                    }

                                </div>

                            )

                        }

                        {

                            !loadingPairing &&
                            !pairingError &&
                            pairingOptions.length > 0 &&
                            (

                                <select

                                    className="commander-select"

                                    value={
                                        selectedSecondaryCommanderId ?? ""
                                    }

                                    onChange={
                                        handleSecondaryCommanderChange
                                    }

                                >

                                    <option value="">

                                        Select Secondary Commander

                                    </option>

                                    {

                                        pairingOptions.map(
                                            (
                                                option:
                                                    CommanderPairingOption
                                            ) => (

                                                <option

                                                    key={
                                                        option.commander_id
                                                    }

                                                    value={
                                                        option.commander_id
                                                    }

                                                >

                                                    {
                                                        option.commander_name
                                                    }

                                                </option>

                                            )
                                        )

                                    }

                                </select>

                            )

                        }

                        {

                            !loadingPairing &&
                            !pairingError &&
                            pairingOptions.length === 0 &&
                            (

                                <div
                                    className="commander-pairing-message"
                                >

                                    No legal secondary commanders found.

                                </div>

                            )

                        }

                    </div>

                )

            }

            {

                showModal && (

                    <AddCommanderModal

                        player={
                            player
                        }

                        onClose={() =>
                            setShowModal(false)
                        }

                        onCommanderAdded={
                            handleCommanderAdded
                        }

                    />

                )

            }

        </>

    );

}