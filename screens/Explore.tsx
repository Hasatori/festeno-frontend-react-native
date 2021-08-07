import {Button, View} from "react-native";
import * as React from "react";
import {useState} from "react";
import {changePassword, getTwoFactorSetup, logoutActionCreator, verifyTwoFactor} from "../redux/userActionTypes";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {ChangePasswordRequest} from "./Profile";
import {connect} from "react-redux";
import {AppState} from "../redux/store";
import {Input} from "react-native-elements";


function mapStateToProps(state: AppState, props: SettingsProps) {
    return {
        twoFactorEnabled: state.userState.currentUser.twoFactorEnabled
    }
}


function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        changePassword: (changePasswordRequest: ChangePasswordRequest) => dispatch(changePassword(changePasswordRequest)),
        onLogOut: () => dispatch(logoutActionCreator()),
        getTwoFactorSetup: () => dispatch(getTwoFactorSetup()),
        verifyTwoFactor: (code: string) => dispatch(verifyTwoFactor(code))
    };
};

interface SettingsProps {
    twoFactorEnabled: boolean,
    onLogOut: () => void,
    getTwoFactorSetup: () => void,
    verifyTwoFactor: (code: string) => void
}

function Explore(props: SettingsProps) {
    const [requestSent, setRequestSent] = useState(false);
    const [code, setCode] = useState('');
    return (
        <View>
            <Button
                onPress={() => {
                    props.onLogOut();

                }} title='Log out'>LogOut</Button>
            {
                !requestSent ?
                    props.twoFactorEnabled ? <Button
                        onPress={() => {
                            props.onLogOut();

                        }} title='Disable two factor auth'></Button> : <Button
                        onPress={() => {
                            props.getTwoFactorSetup();
                            setRequestSent(true);

                        }} title='Set two factor authentication'></Button> :
                    <>
                        <Input
                            placeholder='code'
                            keyboardType="ascii-capable"
                            autoCapitalize="none"
                            onChangeText={(value) => {
                                setCode(value);
                            }}
                        />
                        <Button
                            onPress={() => {
                                props.verifyTwoFactor(code);
                            }} title='Enable Two Factor Authentication'></Button>
                    </>

            }

        </View>

    )

}

export default connect(mapStateToProps, mapDispatchToProps)(Explore)
