const getBaseUrl = () => {
    if (window.location.hostname === 'localhost') {
        return 'http://localhost:3001';
    }
    return '';
};

export const routes = {
    CURRENT_USER: `${getBaseUrl()}/current_user`,
    LOGOUT: `${getBaseUrl()}/logout`,
    SIGN_IN: `${getBaseUrl()}/auth/google`,
    UPDATE_PROFILE: `${getBaseUrl()}/PUT/profile`,
    GET_POLLS: `${getBaseUrl()}/GETallPolls`,
    GET_USER_RESPONSES: `${getBaseUrl()}/GETuserResponses`,
    POST_USER_RESPONSE: `${getBaseUrl()}/POSTuserResponse`
};