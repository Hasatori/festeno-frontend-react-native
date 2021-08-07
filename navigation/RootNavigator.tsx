// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
import {RootStackParamList} from "../types";
import {createStackNavigator} from "@react-navigation/stack";
import * as React from "react";
import {useEffect} from "react";
import SignIn from "../screens/SignIn";
import {useToast} from "react-native-styled-toast";
import {AppProps, store} from "../App";
import {dismissFailure, dismissInfo, dismissSuccess} from "../redux/generalActionTypes";
import {AppState} from "../redux/store";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {loadCurrentlyLoggedInUser, logoutActionCreator, refreshTokenActionCreator} from "../redux/userActionTypes";
import Spinner from "react-native-loading-spinner-overlay";
import {SkypeIndicator} from "react-native-indicators";
import {Button} from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {BottomNavigation} from "./BottomNavigation";
import NotFoundScreen from "../screens/NotFoundScreen";
import SignUp from "../screens/SignUp";
import TwoFactorCode from "../screens/TwoFactorCode";
import TwoFactorRecoveryCode from "../screens/TwoFactorRecoveryCode";
import {connect} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack/lib/typescript/src/types";
import {Settings} from "react-native";
import Profile from "../screens/Profile";

const Stack = createStackNavigator<RootStackParamList>();

function mapStateToProps(state: AppState, props: AppProps) {
    return {
        loading: state.generalState.loading,
        loadingMessage: state.generalState.loadingMessage,
        successMessage: state.generalState.successMessage,
        failureMessage: state.generalState.failureMessage,
        warningMessage: state.generalState.warningMessage,
        infoMessage: state.generalState.infoMessage,
        authenticated: state.userState.authenticated,
        loggedIn: state.userState.loggedIn,
        user: state.userState.currentUser,
        accessToken: state.userState.accessToken
    }
}

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        loadCurrentUser: () => dispatch(loadCurrentlyLoggedInUser()),
        onLogOut: () => dispatch(logoutActionCreator()),
        refreshToken: () => dispatch(refreshTokenActionCreator())
    };
};

function RootNavigator(appProps: AppProps) {

    const {toast} = useToast();
    useEffect(() => {
        if (typeof appProps.infoMessage !== "undefined") {
            toast({message: appProps.infoMessage, intent: 'INFO'},);
            store.dispatch(dismissInfo());
        }
    }, [appProps.infoMessage]);
    useEffect(() => {
        if (typeof appProps.successMessage !== "undefined") {
            toast({message: appProps.successMessage, intent: 'SUCCESS'},);
            store.dispatch(dismissSuccess());
        }
    }, [appProps.successMessage]);
    useEffect(() => {
        if (typeof appProps.failureMessage !== "undefined") {
            toast({message: appProps.failureMessage, intent: 'ERROR'},);
            store.dispatch(dismissFailure());
        }
    }, [appProps.failureMessage]);
    useEffect(() => {
        if (appProps.loggedIn) {
            appProps.loadCurrentUser();
        }
    }, [appProps.loggedIn])
    useEffect(() => {
        if (!appProps.loggedIn) {
            appProps.refreshToken();
        }
    }, []);
    return (
        <>
            <Spinner
                visible={appProps.loading}
                textContent={appProps.loadingMessage}
                textStyle={{color: '#FFF'}}
                customIndicator={<SkypeIndicator color='white'/>}
            />
            <Stack.Navigator initialRouteName={'SignIn'} headerMode='float'
                             screenOptions={{headerShown: !appProps.authenticated}}>

                {appProps.authenticated ? (
                        <>
                            <Stack.Screen
                                options={({navigation})=>({
                                    headerShown: true,
                                    title: "Festeno",
                                    headerTitleStyle: {
                                        fontFamily: "Dancing Script",
                                        fontSize: 30
                                    },
                                    headerRight: () => (
                                        <Button
                                            onPress={() =>navigation.navigate("Profile")}

                                            buttonStyle={{
                                                marginRight: 10,
                                                backgroundColor: '#ffffff'
                                            }}
                                            icon={
                                                <MaterialCommunityIcons name="face" color={"#DDDDDD"}
                                                                        size={30}/>
                                            }

                                        />
                                    ),
                                    headerStyle: {
                                        elevation: 0, // remove shadow on Android
                                        shadowOpacity: 0, // remove shadow on iOS}
                                    },
                                })}

                                name="BottomNavigation" component={BottomNavigation}/>
                            <Stack.Screen name="Profile" component={Profile} options={{title: 'Profile',headerShown: true,}}/>
                            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
                        </>)
                    : (
                        <>
                            <Stack.Screen name="SignIn" options={{headerShown: false}} component={SignIn}/>
                            <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUp}/>
                            <Stack.Screen name="TwoFactorCode" component={TwoFactorCode}/>
                            <Stack.Screen name="TwoFactorRecoveryCode" component={TwoFactorRecoveryCode}/>
                        </>
                    )
                }

            </Stack.Navigator>


        </>
    );

}


export default connect(mapStateToProps, mapDispatchToProps)(RootNavigator)
