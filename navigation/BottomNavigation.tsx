import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from "../screens/Home";
import Settings from "../screens/Settings"
import React from "react";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Explore from "../screens/Explore";

const Tab = createBottomTabNavigator();


export function BottomNavigation() {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeBackgroundColor: '#181818',
                inactiveBackgroundColor: '#181818',
                showLabel: false,
                style:{
                    height:70
                }

            }}
        >
            <Tab.Screen name="DietPlan"
                        options={{
                            tabBarIcon: ({size, focused}) => (
                                <MaterialCommunityIcons name="calendar" color={getIconColor(focused)}
                                                        size={size}/>),

                        }}
                        component={Explore}/>
            <Tab.Screen name="Explore"
                        options={{
                            tabBarIcon: ({size,focused}) => (
                                <MaterialCommunityIcons name="loupe" color={getIconColor(focused)} size={size}/>),
                        }}
                        component={Explore}/>
            <Tab.Screen options={{
                tabBarIcon: ({size,focused}) => (<MaterialCommunityIcons name="home" color={getIconColor(focused)} size={size}/>),
            }} name="Home" component={Home}/>
            <Tab.Screen name="Settings"
                        options={{
                            tabBarIcon: ({size,focused}) => (
                                <MaterialCommunityIcons name="star" color={getIconColor(focused)} size={size}/>),
                        }}
                        component={Settings}/>
            <Tab.Screen name="Recipes"
                        options={{
                            tabBarIcon: ({size,focused}) => (
                                <MaterialCommunityIcons name="notebook" color={getIconColor(focused)} size={size}/>),
                        }}
                        component={Explore}/>


        </Tab.Navigator>
    );
}

function getIconColor(focused:boolean): string {
  return   focused ? "#FFF27E" : "#ffffff"
}
