import { routes } from '../../../../common/route_constants.js';

// Function to fetch all character names and classes
export async function fetchCharacterDraftInfo() {
    const characterData = await fetch(routes.GET_ALL_DRAFT_INFO, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const characterDataJson = await characterData.json();
    return characterDataJson;
}
