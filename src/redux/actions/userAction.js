import { userService } from '~/services';
import { UserActionTypes } from '../constants';

export const login = (data) => ({
    type: UserActionTypes.login,
    payload: {
        user: data.user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
    },
});

export const logout = () => ({
    type: UserActionTypes.logout,
});

export const mapTokens = (newAccessToken, newRefreshToken) => ({
    type: UserActionTypes.refresh,
    payload: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
    },
});

export const refreshTokens = () => async (dispatch) => {
    const response = await userService.refreshTokensService();
    dispatch(mapTokens(response.accessToken, response.refreshToken));
};

// PROFILE

export const updateProfile = (newProfile) => ({
    type: UserActionTypes.updateProfile,
    payload: newProfile,
});