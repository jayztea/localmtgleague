import {
    CommanderRelationshipType,
    findPairingOptionsForCommander,
    findRelationshipsForCommander
} from "../repositories/commanderRepository";


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
        CommanderRelationshipType;

    related_commander_id:
        number | null;

    related_commander_name:
        string | null;

}


export interface CommanderPairingConfiguration {

    requires_secondary: boolean;

    relationship_type:
        CommanderRelationshipType | null;

    selection_mode:
        "choose" |
        "automatic" |
        "none";

    options:
        CommanderPairingOption[];

}


export async function getCommanderPairingRules(
    commanderId: number
): Promise<CommanderPairingRule[]> {

    const relationships =
        await findRelationshipsForCommander(
            commanderId
        );


    return relationships.map(
        (
            relationship: any
        ) => ({

            relationship_type:
                relationship.relationship_type,

            related_commander_id:
                relationship.related_commander_id,

            related_commander_name:
                relationship.related_commander_name ??
                null

        })
    );

}


export async function getPairingOptions(
    commanderId: number,
    relationshipType:
        CommanderRelationshipType
): Promise<CommanderPairingOption[]> {

    const options =
        await findPairingOptionsForCommander(
            commanderId,
            relationshipType
        );


    return options;

}


export async function getPartnerWithOption(
    commanderId: number
): Promise<CommanderPairingOption | null> {

    const relationships =
        await findRelationshipsForCommander(
            commanderId
        );


    const partnerWith =
        relationships.find(
            (
                relationship: any
            ) =>
                relationship.relationship_type ===
                "partner_with"
        );


    if (
        !partnerWith ||
        !partnerWith.related_commander_id
    ) {

        return null;

    }


    return {

        commander_id:
            partnerWith.related_commander_id,

        commander_name:
            partnerWith.related_commander_name,

        scryfall_id:
            partnerWith.related_scryfall_id,

        color_identity:
            partnerWith.related_color_identity,

        type_line:
            partnerWith.related_type_line,

        image_url:
            partnerWith.related_image_url

    };

}


export async function getCommanderPairingConfiguration(
    commanderId: number
): Promise<CommanderPairingConfiguration> {

    const rules =
        await getCommanderPairingRules(
            commanderId
        );


    if (
        rules.length === 0
    ) {

        return {

            requires_secondary:
                false,

            relationship_type:
                null,

            selection_mode:
                "none",

            options:
                []

        };

    }


    const partnerWithRule =
        rules.find(
            rule =>
                rule.relationship_type ===
                "partner_with"
        );


    if (
        partnerWithRule
    ) {

        const option =
            await getPartnerWithOption(
                commanderId
            );


        if (
            option
        ) {

            return {

                requires_secondary:
                    true,

                relationship_type:
                    "partner_with",

                selection_mode:
                    "automatic",

                options:
                    [
                        option
                    ]

            };

        }


        return {

            requires_secondary:
                false,

            relationship_type:
                null,

            selection_mode:
                "none",

            options:
                []

        };

    }


    const rule =
        rules[0];


    const options =
        await getPairingOptions(
            commanderId,
            rule.relationship_type
        );


    return {

        requires_secondary:
            true,

        relationship_type:
            rule.relationship_type,

        selection_mode:
            "choose",

        options

    };

}