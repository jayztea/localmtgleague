import * as commanderRepository
from "../repositories/commanderRepository";

import type {
    CommanderRelationshipType
}
from "../repositories/commanderRepository";

export async function searchCommanders(
    query: string
) {

    if (!query.trim()) {

        return [];

    }

    return commanderRepository.search(
        query
    );

}

export async function getCommanderPairingRules(
    commanderId: number
) {

    const relationships =
        await commanderRepository.findRelationshipsForCommander(
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
    relationshipType: CommanderRelationshipType
) {

    return commanderRepository.findPairingOptionsForCommander(
        commanderId,
        relationshipType
    );

}