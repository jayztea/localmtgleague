import api from "../api/axios";

export interface CommanderPairingOption {

    commander_id: number;

    commander_name: string;

    scryfall_id: string;

    color_identity: string;

    type_line: string | null;

    image_url: string | null;

}

export interface CommanderPairingRule {

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

export async function searchCommanders(
    query: string
) {

    const response =
        await api.get(
            "/commanders/search",
            {
                params: {
                    query
                }
            }
        );

    return response.data;

}

export async function getCommanderPairingRules(
    commanderId: number
): Promise<CommanderPairingRule[]> {

    const response =
        await api.get(
            `/commanders/${commanderId}/pairing-rules`
        );

    return response.data;

}

export async function getPairingOptions(
    commanderId: number,
    relationshipType:
        | "partner"
        | "partner_with"
        | "background"
        | "friends_forever"
        | "doctors_companion"
        | "partner_character_select"
): Promise<CommanderPairingOption[]> {

    const response =
        await api.get(
            "/commanders/pairing-options",
            {
                params: {

                    commanderId,

                    relationshipType

                }
            }
        );

    return response.data;

}