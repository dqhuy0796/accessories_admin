import { UserActionTypes } from '../constants';

const initState = {
    isLogged: false,
    user: {},
    darkmode: false,
    accessToken: null,
    refreshToken: null,
};

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case UserActionTypes.login:
            return {
                ...state,
                isLogged: true,
                ...action.payload,
            };

        case UserActionTypes.logout:
            return {
                isLogged: false,
                user: {},
                darkmode: false,
                accessToken: null,
                refreshToken: null,
            };

        case UserActionTypes.refresh:
            return {
                ...state,
                ...action.payload,
            };

        case UserActionTypes.updateProfile:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload,
                },
            };

        default:
            return state;
    }
};

export default userReducer;
