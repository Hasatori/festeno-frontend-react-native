import * as React from "react";
import {Image, Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Button, Input} from "react-native-elements";
import O2Auth from "./O2auth";
import {connect} from "react-redux";
import {globalStyle} from "../navigation";
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack/lib/typescript/src/types";
import {RootStackParamList} from "../types";
import {LoginProps} from "./SignIn";

const primaryBlue = Platform.select({
    ios: "#007aff", // rgb(0, 122, 255)
    android: "#2196f3" // rgb(33, 150, 243)
});

const imageWidth = "80%";

const styles = StyleSheet.create({
    container: {
        flex: 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto'
    },
    forgottenPasswordButtonContainer: {
        width: imageWidth
    },
    forgottenPasswordTitle: {
        color: primaryBlue
    },
    loginButtonContainer: {
        width: imageWidth
    },
    loginButton: {
        backgroundColor: primaryBlue
    },
    loginButtonTitle: {
        color: "white"
    },
    disabled: {
        backgroundColor: primaryBlue,
        opacity: 0.3
    }
});

function SignUp(props: LoginProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [code, setCode] = useState('');
    const [url, setUrl] = useState('');
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'SignIn'>>();
    return (
        <View style={globalStyle.container}>

            <Image style={{width: 80, height: 80}} source={require('../assets/images/festeno_yellow.png')}/>
            <Text style={{fontFamily: "Dancing Script", fontSize: 60, color: "#FFF27E"}}>Festeno</Text>

            {/* <O2Auth/>*/}
            <View style={{width: '80%', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={globalStyle.link}>
                    <Text style={{color:"#F9F9F9"}}>Already have an account?<Text style={globalStyle.linkText}> Sign in!</Text></Text>
                </TouchableOpacity>
                <Input
                    placeholder='name'
                    keyboardType="default"
                    autoCapitalize="none"
                    defaultValue={name}
                    onChangeText={(value) => {
                        setName(value)
                    }}
                    inputStyle={{
                        backgroundColor:"#242424",
                        borderColor:"#B2B2B2",
                        borderStyle:"solid",
                        borderWidth: 1,
                        borderRadius:7,
                        color:"#F9F9F9",
                        paddingLeft:10,
                        paddingRight:10,

                    }}
                    inputContainerStyle={{
                        borderBottomWidth:0
                    }}
                    placeholderTextColor={"#B2B2B2"}
                />
                <Input
                    placeholder='email'
                    keyboardType="email-address"
                    autoCapitalize="none"
                    defaultValue={email}
                    onChangeText={(value) => {
                        setEmail(value)
                    }}
                    inputStyle={{
                        backgroundColor:"#242424",
                        borderColor:"#B2B2B2",
                        borderStyle:"solid",
                        borderWidth: 1,
                        borderRadius:7,
                        color:"#F9F9F9",
                        paddingLeft:10,
                        paddingRight:10,

                    }}
                    inputContainerStyle={{
                        borderBottomWidth:0
                    }}
                    placeholderTextColor={"#B2B2B2"}
                />
                <Input placeholder='password'
                       secureTextEntry autoCapitalize="none"
                       onChangeText={(value) => {
                           setPassword(value)
                       }}
                       defaultValue={password}
                       inputStyle={{
                           backgroundColor:"#242424",
                           borderColor:"#B2B2B2",
                           borderStyle:"solid",
                           borderWidth: 1,
                           borderRadius:7,
                           color:"#F9F9F9",
                           paddingLeft:10,
                           paddingRight:10,

                       }}
                       inputContainerStyle={{
                           borderBottomWidth:0
                       }}
                       placeholderTextColor={"#B2B2B2"}
                />
                <Input placeholder='confirm password'
                       secureTextEntry autoCapitalize="none"
                       onChangeText={(value) => {
                           setConfirmPassword(value)
                       }}
                       defaultValue={confirmPassword}
                       inputStyle={{
                           backgroundColor:"#242424",
                           borderColor:"#B2B2B2",
                           borderStyle:"solid",
                           borderWidth: 1,
                           borderRadius:7,
                           color:"#F9F9F9",
                           paddingLeft:10,
                           paddingRight:10,

                       }}
                       inputContainerStyle={{
                           borderBottomWidth:0
                       }}
                       placeholderTextColor={"#B2B2B2"}
                />

                <Button
                    title='Sign up'
                    buttonStyle={{
                        backgroundColor: "#FFF27E",
                        borderRadius:5
                    }}
                    titleStyle={{
                        color: '#242424'
                    }}

                    onPress={() => {
                        props.login({email: email, password: password, rememberMe: false})
                    }}
                />

            </View>

        </View>
    )
}
export interface SignUpRequest {
    name: string,
    email: string,
    password: string

}
export default connect()(SignUp)

