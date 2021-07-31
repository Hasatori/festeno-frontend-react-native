import {StackScreenProps} from '@react-navigation/stack';
import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {RootStackParamList} from '../types';
import {globalStyle} from "../navigation";
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from "@react-navigation/stack/lib/typescript/src/types";

export default function NotFoundScreen() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList,'NotFound'>>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This screen doesn't exist.</Text>
      <TouchableOpacity onPress={() => navigation.replace('Home')} style={globalStyle.link}>
        <Text style={globalStyle.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});
