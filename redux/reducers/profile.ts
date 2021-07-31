import {UserActionTypes} from "../userActionTypes";


export interface User {
    name: string;
    email: string;
    profileImage: ProfileImage;
    twoFactorEnabled: boolean;

}

export interface ProfileImage {
    name: string;
    type: string;
    data: string;
}

const initialState = {
    authenticated: false,
    loggedIn: false,
    currentUser: {} as any,
    twoFactorRequired: false,
    accessToken: "",

} as UserState;

export interface UserState {
    authenticated: boolean,
    loggedIn: boolean,
    currentUser: User,
    twoFactorRequired: boolean,
    twoFactorRequestSent: boolean,
    accessToken: string
}

export function userReducer(state = initialState, action: UserActionTypes): UserState {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                accessToken: action.accessToken,
                loggedIn: true,
            };
        case "TOKEN_REFRESHED":
            return {
                ...state,
                accessToken: action.accessToken,
                loggedIn:true
            };
        case "ADD_USER":
            return {
                ...state,
                currentUser: action.user,
                authenticated: true,
            };
        case "LOGIN_TWO_FACTOR":
            return {
                ...state,
                twoFactorRequired: true
            };
        case "LOGOUT_USER":
            return {
                ...state,
                authenticated: false,
                loggedIn: false,
                currentUser: {} as any,
                twoFactorRequired: false,
                accessToken: "",
            };
        case "UPDATE_USER":
            return {
                ...state,
                currentUser: action.newUser
            };
        default:
            return state;
    }
}

export default userReducer;
