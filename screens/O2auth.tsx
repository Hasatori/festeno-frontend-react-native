import {Image, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import {FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, GOOGLE_AUTH_URL} from "../constants";
import {loginO2Auth} from "../redux/userActionTypes";
import Constants from "expo-constants";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {connect} from "react-redux";

const {manifest} = Constants;

const styles = StyleSheet.create({
    wrapper: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '50%',
        alignContent: 'center'
    },
    icon: {
        width: 40,
        height: 40,

    }

});

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        loginO2Auth: (o2AuthUrl: string) => dispatch(loginO2Auth(o2AuthUrl))
    };
};

export interface O2AuthProps {
    loginO2Auth: (o2AuthUrl: string) => void
}


function O2Auth(pros: O2AuthProps) {
    return (
        <View style={styles.wrapper}>
            <Text onPress={() => pros.loginO2Auth(FACEBOOK_AUTH_URL)}><Image style={styles.icon}
                                                                             source={require('../img/fb-logo.png')}/></Text>
            <Text onPress={() => pros.loginO2Auth(GITHUB_AUTH_URL)}><Image style={styles.icon}
                                                                           source={require('../img/github-logo.png')}/></Text>
            <Text onPress={() => pros.loginO2Auth(GOOGLE_AUTH_URL)}><Image style={{width: 45, height: 45}}
                                                                           source={require('../img/google-logo.png')}/></Text>
        </View>
    )
}

export default connect(null, mapDispatchToProps)(O2Auth)
