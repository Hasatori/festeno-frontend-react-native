import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {ColorSchemeName, StyleSheet} from 'react-native';
import {AppProps} from "../App";
import {connect} from "react-redux";
import RootNavigator from "./RootNavigator";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started

let currentScheme = 'dark';
export const globalStyle = StyleSheet.create({
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
    linkText: {
        fontSize: 14,
        color: '#FFF27E',
    }, container: {
        flex: 1,
        paddingTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        backgroundColor: "#181818"
    },
});

function Navigation({colorScheme}: { colorScheme: ColorSchemeName }, appProps: AppProps) {

    return (
        <NavigationContainer
            theme={colorScheme === currentScheme ? DarkTheme : DefaultTheme}>
            <RootNavigator {...appProps}/>
        </NavigationContainer>
    );
}


export default connect()(Navigation);
