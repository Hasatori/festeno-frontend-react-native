import {Action, ActionCreator, AnyAction, Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AccountActivationRequest, myAxios} from "../util/APIUtils";
import {AxiosResponse} from "axios";
import {ACCESS_TOKEN, API_BASE_URL, REFRESH_TOKEN_COOKIE, REMEMBER_ME_COOKIE} from "../constants";
import {
    doneActionCreator,
    failureActionCreator,
    GeneralActionTypes,
    infoActionCreator,
    inProgressActionCreator,
    successActionCreator
} from "./generalActionTypes";
import {User} from "./reducers/profile";
import {LoginRequest, TwoFactorLoginRequest} from "../screens/SignIn";
import {SignUpRequest} from "../screens/SignUp";
import {ResetPasswordRequest} from "../screens/ResetPassword";
import {ChangePasswordRequest} from "../screens/Profile";
import * as SecureStore from 'expo-secure-store';
import * as AuthSession from "expo-auth-session";

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_TWO_FACTOR = 'LOGIN_TWO_FACTOR';
export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const TOKEN_REFRESHED = 'TOKEN_REFRESHED';

export interface LoginSuccessAction extends Action {
    readonly  type: typeof LOGIN_SUCCESS,
    readonly accessToken: string;
}

export interface AddUserAction extends Action {
    readonly  type: typeof ADD_USER,
    readonly  user: User,
}

export interface UpdateUserAction extends Action {
    readonly type: typeof UPDATE_USER,

    newUser: User,
}

export interface LogoutUserAction extends Action {
    readonly type: typeof LOGOUT_USER
}

export interface LoginTwoFactorAction extends Action {
    readonly type: typeof LOGIN_TWO_FACTOR
}

export interface LoginFailureAction extends Action {
    readonly type: typeof LOGIN_FAILURE
}

export interface UpdateUserAction extends Action {
    readonly  type: typeof UPDATE_USER,
    readonly payload: User,
}

export interface TokenRefreshedAction extends Action {
    readonly  type: typeof TOKEN_REFRESHED
    accessToken: string,
}

export interface UserLoggedInResponse {
    twoFactorEnabled: boolean,
    accessToken: string,
    persistentToken: string
    expires: number
}

const DEFAULT_ERROR_MESSAGE = 'Oops! Something went wrong. Please try again!';


const saveTokens = (response: UserLoggedInResponse) => {
    const promises = [SecureStore.setItemAsync(ACCESS_TOKEN, response.accessToken)];
    if (response.persistentToken) {
        /*        Cookies.set(REMEMBER_ME_COOKIE, response.persistentToken, {
                    path: '/',
                    expires: response.expires
                });*/
        promises.push(SecureStore.setItemAsync(REMEMBER_ME_COOKIE, response.persistentToken));
    }
    return Promise.all(promises);

};
export const loginActionCreator: ActionCreator<ThunkAction<// The type of the last action to be dispatched - will always be promise<T> for async actions
    void,
    // The type for the data within the last action
    void,
    // The type of the parameter for the nested function
    LoginRequest,
    // The type of the last action to be dispatched
    LoginSuccessAction>> = (loginRequest: LoginRequest) => {
    return async (dispatch: Dispatch) => {
        dispatch(inProgressActionCreator("Logging in progress"));
        myAxios({
            url: API_BASE_URL + "/auth/login",
            method: 'POST',
            data: JSON.stringify(loginRequest)
        }).then((response: AxiosResponse<UserLoggedInResponse>) => {

            if (response.data.twoFactorEnabled) {
                dispatch({type: LOGIN_TWO_FACTOR})
            } else {
                saveCookies(response.headers).then(() => {
                    dispatch(successActionCreator("Logged in"));
                    dispatch({type: LOGIN_SUCCESS, accessToken: response.data.accessToken})

                });
                dispatch(doneActionCreator());
            }
        }).catch(error => {
            dispatch(doneActionCreator());
            dispatch(failureActionCreator((error && error.message) || DEFAULT_ERROR_MESSAGE));
            dispatch({type: LOGIN_FAILURE});
        });
    };
};

function saveCookies(headers: any): Promise<void> {
    let cookieHeader = headers["set-cookie"];

    if (typeof cookieHeader !== 'undefined') {
        return SecureStore.setItemAsync(REFRESH_TOKEN_COOKIE, cookieHeader.map((cookie: string) => cookie.split(';')[0]).join(";"));
    } else {
        return Promise.reject("Cookies header is not present!");
    }
}

export const refreshTokenActionCreator: ActionCreator<ThunkAction<void,
    void,
    void,
    AnyAction>> = () => {
    return async (dispatch: Dispatch) => {
        myAxios({
            url: API_BASE_URL + "/auth/refresh-token",
            method: 'POST'
        }).then((response) => {
            console.log(response);
            dispatch({type: TOKEN_REFRESHED, accessToken: response.data.accessToken})
        }).catch(error => {
            //dispatch(failureActionCreator((error && error.message) || DEFAULT_ERROR_MESSAGE));
        });
    };
};
export const loginTwoFactorActionCreator: ActionCreator<ThunkAction<void, void, TwoFactorLoginRequest, LoginSuccessAction>> = (loginRequest: TwoFactorLoginRequest) => {
    return async (dispatch: Dispatch) => {
        dispatch(inProgressActionCreator("Logging in progress"));
        myAxios({
            url: API_BASE_URL + "/auth/login/verify",
            method: 'POST',
            data: JSON.stringify(loginRequest)
        }).then(response => {
            saveTokens(response.data).then(() => {
                dispatch(successActionCreator("Logged in"));
                dispatch({type: LOGIN_SUCCESS});
                dispatch(doneActionCreator());
            }).catch(error => {
                dispatch(doneActionCreator());
                dispatch(failureActionCreator((error && error.message) || DEFAULT_ERROR_MESSAGE));
                return Promise.reject(error);
            });

        }).catch(error => {
            dispatch(doneActionCreator());
            dispatch(failureActionCreator((error && error.message) || DEFAULT_ERROR_MESSAGE));
        });
    };
};

export const loginRecoveryCodeActionCreator: ActionCreator<ThunkAction<void, void, TwoFactorLoginRequest, LoginSuccessAction>> = (loginRequest: TwoFactorLoginRequest) => {
    return async (dispatch: Dispatch) => {
        dispatch(inProgressActionCreator("Logging in progress"));
        myAxios({
            url: API_BASE_URL + "/auth/login/recovery-code",
            method: 'POST',
            data: JSON.stringify(loginRequest)
        }).then(response => {
            saveTokens(response.data).then(() => {
                dispatch(successActionCreator("Logged in"));
                dispatch({type: LOGIN_SUCCESS});
                dispatch(doneActionCreator());
            });
        }).catch(error => {
            dispatch(doneActionCreator());
            dispatch(failureActionCreator((error && error.message) || DEFAULT_ERROR_MESSAGE));
        });
    };
};

export const loginO2Auth: ActionCreator<ThunkAction<void, void, string, LoginSuccessAction>> = (o2AuthUrl: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(inProgressActionCreator("Logging in progress"));
        AuthSession.startAsync({
            authUrl: o2AuthUrl,
            showInRecents: true
        }).then(result => {
            if (result.type === 'error' || result.type === 'success') {
                if (result.params.error) {
                    dispatch(failureActionCreator(result.params.error));
                } else {
                    console.log(result);
                    SecureStore.setItemAsync(REFRESH_TOKEN_COOKIE, `${REFRESH_TOKEN_COOKIE}=${result.params.refresh_token}`).then(() => {
                        dispatch(successActionCreator("Logged in"));
                        dispatch({type: LOGIN_SUCCESS, accessToken: result.params.access_token});
                    });
                }
            }
            dispatch(doneActionCreator());
        }).catch(error => {
            dispatch(doneActionCreator());
            dispatch(failureActionCreator((error && error.message) || DEFAULT_ERROR_MESSAGE));
        })
    };
};

export const logoutActionCreator: ActionCreator<ThunkAction<void, void, void, LogoutUserAction>> = () => {
    return async (dispatch: Dispatch) => {
        dispatch(inProgressActionCreator("Logging out"));
        myAxios({
            url: API_BASE_URL + "/logout",
            method: 'POST'
        }).then(response => {
            SecureStore.deleteItemAsync(REFRESH_TOKEN_COOKIE).then(() => {
                dispatch(doneActionCreator());
                dispatch({type: LOGOUT_USER});
                dispatch(infoActionCreator("Logged out"));
            });
        }).catch(error => {
            dispatch(doneActionCreator());
            dispatch(failureActionCreator((error && error.message) || DEFAULT_ERROR_MESSAGE));
        });
    }
};

export const loadCurrentlyLoggedInUser: ActionCreator<ThunkAction<void, void, TwoFactorLoginRequest, LoginSuccessAction>> = () => {
    return async (dispatch: Dispatch) => {
        dispatch(inProgressActionCreator("Loading user"));
        myAxios({
            url: API_BASE_URL + "/user/me",
            method: 'GET'
        }).then(response => {
            dispatch(doneActionCreator());
            dispatch({type: ADD_USER, user: response.data})
        }).catch(error => {
            dispatch(doneActionCreator());
            dispatch(failureActionCreator((error && error.message) || DEFAULT_ERROR_MESSAGE));
        });
    }
};

export const activateAccount: ActionCreator<ThunkAction<void, void, TwoFactorLoginRequest, GeneralActionTypes>> = (accountActivationRequest: AccountActivationRequest) => {
    return async (dispatch: Dispatch) => {
        dispatch(inProgressActionCreator('Activating account for ' + accountActivationRequest.email));
        myAxios({
            url: API_BASE_URL + "/auth/activateAccount",
            method: 'POST',
            data: JSON.stringify(accountActivationRequest)
        }).then(response => {
            dispatch(successActionCreator("Account has been activated. You can log in now"));
            dispatch(doneActionCreator());
        }).catch(error => {

                dispatch(doneActionCreator());
                dispatch(failureActionCreator((error && error.message) || DEFAULT_ERROR_MESSAGE));
            }
        );
    };
};

export const getTwoFactorSetup: ActionCreator<ThunkAction<void, void, void, GeneralActionTypes>> = () => {
    return async (dispatch: Dispatch) => {
        dispatch(inProgressActionCreator("Enabling two factor authentication"));
        myAxios({
            url: API_BASE_URL + "/getTwoFactorSetupSecret",
            method: 'POST'
        }).then(response => {
            dispatch(successActionCreator(response.data.message));
            dispatch(doneActionCreator());
        }).catch(error => {
                dispatch(doneActionCreator());
                dispatch(failureActionCreator((error && error.message) || DEFAULT_ERROR_MESSAGE));
            }
        );
    };
};

export const verifyTwoFactor: ActionCreator<ThunkAction<void, void, string, GeneralActionTypes>> = (code: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(inProgressActionCreator("Enabling two factor authentication"));
        myAxios({
            url: API_BASE_URL + "/verifyTwoFactor",
            method: 'POST',
            data: JSON.stringify({code: code})
        }).then(response => {
            dispatch(successActionCreator(response.data.message));
            dispatch(doneActionCreator());
        }).catch(error => {
                dispatch(doneActionCreator());
                dispatch(failureActionCreator((error && error.message) || DEFAULT_ERROR_MESSAGE));
            }
        );
    };
};


export const signUp: ActionCreator<ThunkAction<void, void, TwoFactorLoginRequest, GeneralActionTypes>> = (signupRequest: SignUpRequest) => {
    return async (dispatch: Dispatch) => {
        dispatch(inProgressActionCreator('Signing up in progress'));
        myAxios({
            url: API_BASE_URL + "/auth/signup",
            method: 'POST',
            data: JSON.stringify(signupRequest)
        }).then(response => {
            dispatch(successActionCreator("Successfully signed up"));
            dispatch(infoActionCreator("Activation email has been send to your email."));
            dispatch(doneActionCreator());
        }).catch(error => {
                dispatch(doneActionCreator());
                dispatch(failureActionCreator((error && error.message) || DEFAULT_ERROR_MESSAGE));
            }
        );
    };
};

export const forgottenPasswordRequest: ActionCreator<ThunkAction<void, void, TwoFactorLoginRequest, GeneralActionTypes>> = (email: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(inProgressActionCreator('Processing forgotten password request'));
        myAxios({
            url: API_BASE_URL + "/auth/forgottenPassword",
            method: 'POST',
            data: JSON.stringify({email: email})
        }).then(response => {
            dispatch(doneActionCreator());
            dispatch(successActionCreator("Password reset request send!"));
        }).catch(error => {
            dispatch(doneActionCreator());
            dispatch(failureActionCreator((error && error.message) || DEFAULT_ERROR_MESSAGE));
        });
    };
};

export const resetPassword: ActionCreator<ThunkAction<void, void, TwoFactorLoginRequest, GeneralActionTypes>> = (resetPasswordRequest: ResetPasswordRequest) => {
    return async (dispatch: Dispatch) => {
        dispatch(inProgressActionCreator('Resetting password'));
        myAxios({
            url: API_BASE_URL + "/auth/passwordReset",
            method: 'POST',
            data: JSON.stringify(resetPasswordRequest)
        }).then(response => {
            dispatch(doneActionCreator());
            dispatch(successActionCreator("Password has been reset!"));
        }).catch(error => {
            dispatch(doneActionCreator());
            dispatch(failureActionCreator((error && error.message) || DEFAULT_ERROR_MESSAGE));
        });
    };
};
export const changePassword: ActionCreator<ThunkAction<void, void, TwoFactorLoginRequest, GeneralActionTypes>> = (changePasswordRequest: ChangePasswordRequest) => {
    return async (dispatch: Dispatch) => {
        dispatch(inProgressActionCreator('Updating profile'));
        myAxios({
            url: API_BASE_URL + "/changePassword",
            method: 'POST',
            data: JSON.stringify(changePasswordRequest)
        }).then(response => {
            saveTokens(response.data);
            dispatch(successActionCreator("Password changed"));
            dispatch(doneActionCreator());
        }).catch(error => {
            dispatch(doneActionCreator());
            dispatch(failureActionCreator((error && error.message) || DEFAULT_ERROR_MESSAGE));
        });
    };
};

export type UserActionTypes =
    LoginSuccessAction
    | LoginFailureAction
    | LogoutUserAction
    | LoginTwoFactorAction
    | UpdateUserAction
    | AddUserAction
    | TokenRefreshedAction
