import {StackScreenProps} from "@react-navigation/stack/lib/typescript/src/types";
import {RootStackParamList} from "../types";
import {Image, View} from "react-native";
import * as React from "react";

export default function Home({navigation}: StackScreenProps<RootStackParamList, 'Home'>) {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{width: '100%', height: '100%'}} source={require('../assets/images/home-icon.png')}/>
        </View>
    );
}