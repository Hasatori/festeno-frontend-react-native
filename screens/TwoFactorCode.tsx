import {connect} from "react-redux";
import {Text, TouchableOpacity, View} from "react-native";
import {Button, Input} from "react-native-elements";
import * as React from "react";
import {useState} from "react";
import {TwoFactorLoginRequest} from "./SignIn";
import {StackNavigationProp} from "@react-navigation/stack/lib/typescript/src/types";
import {RootStackParamList} from "../types";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {globalStyle} from "../navigation";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {loginTwoFactorActionCreator} from "../redux/userActionTypes";
import {AppState} from "../redux/store";

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        loginTwoFactor: (twoFactorLoginRequest: TwoFactorLoginRequest) => dispatch(loginTwoFactorActionCreator(twoFactorLoginRequest))
    };
};

function mapStateToProps(state: AppState, props: LoginTwoFactorCodeProps) {
    return {
        loading: state.generalState.loading
    }
}

export interface LoginTwoFactorCodeProps {
    loginTwoFactor: (loginRequest: TwoFactorLoginRequest) => void,
    loading: boolean
}

 function TwoFactorCode(props: LoginTwoFactorCodeProps) {
    const [code, setCode] = useState('');
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'TwoFactorCode'>>();
    const route = useRoute<RouteProp<RootStackParamList, 'TwoFactorCode'>>();
    return (
        <View style={globalStyle.container}>
            <View style={{width: '80%', alignItems: 'center'}}>
                <Input
                    placeholder='code'
                    keyboardType="numeric"
                    autoCapitalize="none"
                    defaultValue={code}
                    onChangeText={(value) => {
                        setCode(value)
                    }}
                />
                <Button
                    loading={props.loading}
                    title='Log in'
                    onPress={() => {
                        props.loginTwoFactor({
                            email: route.params.email,
                            password: route.params.password,
                            rememberMe: route.params.rememberMe,
                            code: code
                        })
                    }}
                />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("TwoFactorRecoveryCode", {
                email: route.params.email,
                password: route.params.password,
                rememberMe: route.params.rememberMe
            })}
                              style={globalStyle.link}>
                <Text>Having problems?</Text><Text style={globalStyle.linkText}>Use recovery codes!</Text>
            </TouchableOpacity>
        </View>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(TwoFactorCode)