import {connect} from "react-redux";
import {Image, Text, View} from "react-native";
import * as React from "react";
import {User} from "../redux/reducers/profile";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {changePassword, logoutActionCreator} from "../redux/userActionTypes";
import {AppState} from "../redux/store";
import {globalStyle} from "../navigation";
import {StackNavigationProp} from "@react-navigation/stack/lib/typescript/src/types";
import {RootStackParamList} from "../types";
import {useNavigation} from "@react-navigation/native";

export interface ChangePasswordRequest {

    currentPassword: string;
    newPassword: string;
}

export interface ProfileProps {
    user: User,
    loading: boolean,
    onLogOut: () => void,
    changePassword: (changePasswordRequest: ChangePasswordRequest) => void
}

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        changePassword: (changePasswordRequest: ChangePasswordRequest) => dispatch(changePassword(changePasswordRequest)),
        onLogOut: () => dispatch(logoutActionCreator()),
    };
};

function mapStateToProps(state: AppState, props: ProfileProps) {
    return {
        user: state.userState.currentUser,
        loading: state.generalState.loading
    }
}

function Profile(props: ProfileProps) {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Profile'>>();
    return (
        <View style={globalStyle.container}>

            <Image style={{width: '30%', height: '30%'}} source={{uri: `data:image/png;base64,${props.user?.profileImage?.data}`}}/>
            <Text>{props.user.name}</Text>
            <Text>{props.user.email}</Text>
        </View>
    )
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
