import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import {ActivityIndicator, StyleSheet, View} from "react-native";
import {ToastProvider} from "react-native-styled-toast";
import {ThemeProvider} from "styled-components";
import {Provider} from "react-redux";
import configureStore from "./redux/store";
import {User} from "./redux/reducers/profile";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
});
const theme = {
    space: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48],
    colors: {
        text: '#0A0A0A',
        background: '#FFF',
        border: '#E2E8F0',
        muted: '#F0F1F3',
        success: '#7DBE31',
        error: '#FC0021',
        info: '#00FFFF'
    }
};

export interface AppProps {
    loading: boolean,
    loadingMessage: string | undefined
    successMessage: string | undefined
    failureMessage: string | undefined
    warningMessage: string | undefined
    infoMessage: string | undefined
    authenticated: boolean,
    loggedIn: boolean,
    loadCurrentUser: () => void
    onLogOut: () => void,
    refreshToken: () => void,
    user: User,
    accessToken: string
}

export const initProps: AppProps = {
        authenticated: false,
        loggedIn: false,
        loading: false,
        loadingMessage: undefined,
        successMessage: undefined,
        failureMessage: undefined,
        warningMessage: undefined,
        infoMessage: undefined,
        user: {} as any,
        onLogOut: () => {
        },
        loadCurrentUser: () => {
        },
        refreshToken: () => {
        },
    accessToken: ""
    }
;
export const store = configureStore();
export default function App() {
    let isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();
    if (!isLoadingComplete) {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#00ff00"/>
            </View>
        )
    } else {
        return (
            <ThemeProvider theme={theme}>
                <SafeAreaProvider>
                    <ToastProvider>
                        <Provider store={store}>

                            <Navigation colorScheme={colorScheme} {...initProps}/>
                            <StatusBar/>

                        </Provider>
                    </ToastProvider>
                </SafeAreaProvider>
            </ThemeProvider>
        );
    }
}
