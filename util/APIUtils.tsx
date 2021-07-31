import {API_BASE_URL, REFRESH_TOKEN_COOKIE} from '../constants/index';
import React from "react";
import axios, {AxiosRequestConfig} from "axios";
import {store} from "../App";
import {TOKEN_REFRESHED} from '../redux/userActionTypes';
import * as SecureStore from 'expo-secure-store';

export const myAxios = axios.create();
myAxios.interceptors.response.use(
    (response) => {
        console.log(response);
        return response;
    },
    function (error) {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            store.getState().userState.loggedIn &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            return myAxios
                .post(`${API_BASE_URL}/auth/refresh-token`)
                .then((res) => {
                    if (res.status === 200) {
                        store.dispatch({type: TOKEN_REFRESHED, accessToken: res.data.accessToken});
                        return axios(originalRequest);
                    }
                }).catch(error => {
                    return Promise.reject(error);
                });
        }
        return Promise.reject(error);
    }
);
myAxios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        return SecureStore.getItemAsync(REFRESH_TOKEN_COOKIE).then(value => {
            if (value) {
                config.headers['Cookie'] = value;
            }
            config.headers['Content-Type'] = 'application/json';
            config.withCredentials = true;
            if (store.getState().userState.accessToken) {
                console.log('Auth', store.getState().userState.accessToken);
                config.headers['Authorization'] = 'Bearer ' + store.getState().userState.accessToken;
            }
            return config;
        }).catch(error => {
            return Promise.reject(error);
        })


    },
    (error) => {

        return Promise.reject(error);
    }
);

export function getUrlParameter(url: string, name: string) {
    name = name.replace(/[\\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(url);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};


export function isEmailValid(email: string): boolean {
    let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(email);
}

export const invalidPasswordMessage = "Password must contain at least one lower and upper case character, one number and must be at least 8 characters long";

export function isPasswordValid(password: string): boolean {
    let pattern = new RegExp(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])[\w!@#$%^&*]{8,}$/);
    return pattern.test(password);
}


export function getFormControlClass(validationStarted: boolean, valid: boolean): string {
    return !validationStarted ? 'form-control' : valid ? "form-control is-valid" : "form-control is-invalid";
}

export interface AccountActivationRequest {
    email: string,
    token: string
}
