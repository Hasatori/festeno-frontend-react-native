import {StackScreenProps} from "@react-navigation/stack/lib/typescript/src/types";
import {RootStackParamList} from "../types";
import {Image, Text, View} from "react-native";
import * as React from "react";

export default function Explore({navigation}: StackScreenProps<RootStackParamList, 'Recipes'>) {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:"#ffffff"}}>
            <Text>Explore works!</Text>
        </View>
    );
}
