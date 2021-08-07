import {TwoFactorLoginRequest} from "./SignIn";
import * as React from "react";
import {useState} from "react";
import {StackNavigationProp} from "@react-navigation/stack/lib/typescript/src/types";
import {RootStackParamList} from "../types";
import {View} from "react-native";
import {globalStyle} from "../navigation";
import {Button, Input} from "react-native-elements";
import {connect} from "react-redux";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {AppState} from "../redux/store";
import {AnyAction} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {loginRecoveryCodeActionCreator} from "../redux/userActionTypes";

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        loginRecoveryCode: (twoFactorLoginRequest: TwoFactorLoginRequest) => dispatch(loginRecoveryCodeActionCreator(twoFactorLoginRequest))

    };
};

function mapStateToProps(state: AppState, props: LoginRecoveryCodeProps) {
    return {
        twoFactorRequired: state.userState.twoFactorRequired,
        loading: state.generalState.loading
    }
}

export interface LoginRecoveryCodeProps {
    loginRecoveryCode: (loginRequest: TwoFactorLoginRequest) => void,

    loading: boolean
}


 function TwoFactorRecoveryCode(props: LoginRecoveryCodeProps) {
    const [code, setCode] = useState('');
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'TwoFactorCode'>>();
    const route = useRoute<RouteProp<RootStackParamList, 'TwoFactorCode'>>();
    return (
        <View style={globalStyle.container}>
            <View style={{width: '80%', alignItems: 'center', backgroundColor:"#ffffff"}}>
                <Input
                    placeholder='code'
                    keyboardType="ascii-capable"
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
                        props.loginRecoveryCode({
                            email: route.params.email,
                            password: route.params.password,
                            rememberMe: route.params.rememberMe,
                            code: code
                        })
                    }}
                />
            </View>
        </View>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(TwoFactorRecoveryCode);
