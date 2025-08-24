import { routes } from '../../../../common/route_constants.js';

// Function to fetch all character names and classes
export async function fetchSometing() {
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

export async function updateProfile(user_id, display_name, profile_picture) {
    const profileData = await fetch(routes.UPDATE_PROFILE, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: user_id,
            display_name: display_name,
            profile_picture: profile_picture
        })
    });
    const displayNameData = await profileData.json();
    return displayNameData;
}

export async function getPolls() {
    const pollData = await fetch(routes.GET_POLLS, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await pollData.json();
}

export async function getUserResponses(user_id) {
    const pollData = await fetch(routes.GET_USER_RESPONSES, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: user_id
        })
    });
    return await pollData.json();
}

export async function postUserResponse(user_id, poll_id, option_id) {
    const pollData = await fetch(routes.POST_USER_RESPONSE, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: user_id,
            poll_id: poll_id,
            option_id: option_id
        })
    });
    return await pollData.json();
}

export async function getNumberCorrectResponses() {
    const numberCorrectResponses = await fetch(routes.GET_NUMBER_CORRECT_RESPONSES, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await numberCorrectResponses.json();
}
