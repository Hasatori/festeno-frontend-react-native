import {StackScreenProps} from "@react-navigation/stack/lib/typescript/src/types";
import {RootStackParamList} from "../types";
import {Image, Text, View} from "react-native";
import * as React from "react";

export default function Feed({navigation}: StackScreenProps<RootStackParamList, 'Feed'>) {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:"#ffffff"}}>
          <Text>Feed works!</Text>
        </View>
    );
}
