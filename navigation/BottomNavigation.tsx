import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feed from "../screens/Feed";
import Settings from "../screens/Settings"
import React from "react";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Explore from "../screens/Explore";
import DietPlan from "../screens/DietPlan";
import Recipes from "../screens/Recipes";
import Favourite from "../screens/Favourite";

const Tab = createBottomTabNavigator();


export function BottomNavigation() {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeBackgroundColor: '#181818',
                inactiveBackgroundColor: '#181818',
                showLabel: false,
                style:{
                    height:70,
                }
            }}
        >
            <Tab.Screen name="DietPlan"
                        options={{

                            tabBarIcon: ({size, focused}) => (
                                <MaterialCommunityIcons name="calendar" color={getIconColor(focused)}
                                                        size={size}/>),

                        }}
                        component={DietPlan}/>
            <Tab.Screen name="Explore"
                        options={{
                            tabBarIcon: ({size,focused}) => (
                                <MaterialCommunityIcons name="search-web" color={getIconColor(focused)} size={size}/>),
                        }}
                        component={Explore}/>
            <Tab.Screen options={{
                tabBarIcon: ({size,focused}) => (<MaterialCommunityIcons name="home" color={getIconColor(focused)} size={size}/>),
            }} name="Feed" component={Feed}/>
            <Tab.Screen name="Favourite"
                        options={{
                            tabBarIcon: ({size,focused}) => (
                                <MaterialCommunityIcons name="star" color={getIconColor(focused)} size={size}/>),
                        }}
                        component={Favourite}/>
            <Tab.Screen name="Recipes"
                        options={{
                            tabBarIcon: ({size,focused}) => (
                                <MaterialCommunityIcons name="notebook" color={getIconColor(focused)} size={size}/>),
                        }}
                        component={Recipes}/>


        </Tab.Navigator>
    );
}

function getIconColor(focused:boolean): string {
  return   focused ? "#FFF27E" : "#ffffff"
}
