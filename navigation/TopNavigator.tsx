import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import * as React from "react";
import Feed from "../screens/Feed";
import Profile from "../screens/Profile";

const Tab = createMaterialTopTabNavigator();
export default function TopNavigator() {
    return(
        <Tab.Navigator >
            <Tab.Screen name="Home" component={Feed} />
            <Tab.Screen name="Profile" component={Profile}  />
        </Tab.Navigator>
    )
}
