import { CommanderImport } from "../repositories/commanderRepository";


export function transformCommander(
    card: any
): CommanderImport {

    return {
        scryfall_id: card.id,

        commander_name:
            card.name,

        mana_cost:
            card.mana_cost ?? null,

        mana_value:
            card.cmc ?? null,

        type_line:
            card.type_line,

        oracle_text:
            card.oracle_text ?? null,

        power:
            card.power ?? null,

        toughness:
            card.toughness ?? null,

        color_identity:
            card.color_identity?.join("") ?? "",

        image_url:
            card.image_uris?.normal ?? null,

        scryfall_uri:
            card.scryfall_uri,

        released_at:
            card.released_at ?? null
    };

}