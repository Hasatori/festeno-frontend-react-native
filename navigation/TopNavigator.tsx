import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import * as React from "react";
import Home from "../screens/Home";
import Profile from "../screens/Profile";

const Tab = createMaterialTopTabNavigator();
export default function TopNavigator() {
    return(
        <Tab.Navigator >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Profile" component={Profile}  />
        </Tab.Navigator>
    )
}