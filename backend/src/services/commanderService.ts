import * as commanderRepository
    from "../repositories/commanderRepository";

export async function searchCommanders(
    query: string
) {

    if (!query.trim()) {

        return [];

    }

    return commanderRepository.search(query);

}