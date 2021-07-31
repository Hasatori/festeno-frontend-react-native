import {createDrawerNavigator} from "@react-navigation/drawer";
import * as React from "react";
import TopNavigator from "./TopNavigator";
import {connect} from "react-redux";
import {logoutActionCreator} from "../redux/userActionTypes";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {AppProps} from "../App";

import {RootStackParamList} from "../types";
import {useNavigation} from "@react-navigation/native";
import {DrawerNavigationProp} from "@react-navigation/drawer/lib/typescript/src/types";
import {Image} from "react-native";
import Settings from "../screens/Settings";

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        onLogOut: () => dispatch(logoutActionCreator()),

    };
};
const Drawer = createDrawerNavigator();
export function DrawerNavigation(props:AppProps) {
    const navigation = useNavigation<DrawerNavigationProp<RootStackParamList,'Profile'>>();
    return(
        <Drawer.Navigator initialRouteName="Home" screenOptions={{headerShown: true}} >
            <Drawer.Screen
                options={{
                    headerTitle: () => headerTitle(),
                }}
                name="Main" component={TopNavigator} />
            <Drawer.Screen name="Settings"  component={Settings} />
        </Drawer.Navigator>
    )
}

function headerTitle() {
    return (

            <Image style={{width: 50, height: 50}} source={require('../assets/images/header-icon.png')}/>


    )
}
export default connect(null,mapDispatchToProps)(DrawerNavigation)