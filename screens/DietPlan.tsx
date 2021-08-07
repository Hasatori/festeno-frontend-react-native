import {StackScreenProps} from "@react-navigation/stack/lib/typescript/src/types";
import {RootStackParamList} from "../types";
import {Image, Text, View} from "react-native";
import * as React from "react";

export default function DietPlan({navigation}: StackScreenProps<RootStackParamList, 'DietPlan'>) {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:"#ffffff"}}>
            <Text>Diet plan works!</Text>
        </View>
    );
}
