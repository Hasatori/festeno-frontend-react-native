import * as React from "react";
import {useState} from "react";
import {Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Button, Input, normalize} from "react-native-elements";
import {connect} from 'react-redux'
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {loginActionCreator} from "../redux/userActionTypes";
import {AppState} from "../redux/store";
import {StackNavigationProp} from "@react-navigation/stack/lib/typescript/src/types";
import {RootStackParamList} from "../types";
import {globalStyle} from "../navigation";
import {useNavigation} from "@react-navigation/native";


const primaryBlue = Platform.select({
    ios: "#007aff", // rgb(0, 122, 255)
    android: "#2196f3" // rgb(33, 150, 243)
});

const imageWidth = "80%";

const styles = StyleSheet.create({

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
const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;
function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        login: (loginRequest: LoginRequest) => dispatch(loginActionCreator(loginRequest))
    };
};

function mapStateToProps(state: AppState, props: LoginProps) {
    return {
        twoFactorRequired: state.userState.twoFactorRequired,
        loading: state.generalState.loading
    }
}

export interface LoginProps {
    login: (loginRequest: LoginRequest) => void;
    twoFactorRequired: boolean,
    loading: boolean
}

function SignIn(props: LoginProps) {
    const [email, setEmail] = useState('hradil.o@email.cz');
    const [password, setPassword] = useState('test');
    const [code, setCode] = useState('');
    const [url, setUrl] = useState('');
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'SignIn'>>();
    if (props.twoFactorRequired) {
        navigation.navigate("TwoFactorCode", {email: email, password: password, rememberMe: false});
    }
    return (
        <View style={globalStyle.container}>
            <View style={{width: '80%', flex:0.3, alignItems:"center"     }}>
            <Image style={{   flex: 1,
                width: '100%',
                maxHeight: '70%',

                resizeMode: 'contain'}} source={require('../assets/images/festeno_yellow.png')}/>
            <Text style={{fontFamily: "Dancing Script", fontSize:50 * scale , color: "#FFF27E"}}>Festeno</Text>
            </View>
            {/* <O2Auth/>*/}
            <View style={{width: '80%', flex:0.7,      }}>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={globalStyle.link}>
                    <Text style={{color:"#F9F9F9"}}>Do not have an account yet? <Text style={globalStyle.linkText}>Sign up!</Text></Text>
                </TouchableOpacity>
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

                <Button
                    title='Sign in'
                    buttonStyle={{
                        backgroundColor: "#FFF27E",
                        borderRadius:5,
                        width:"50%",


                    }}
                    containerStyle={{
                        alignItems: 'center',

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

export interface LoginRequest {
    email: string,
    password: string,
    rememberMe: boolean
}

export interface TwoFactorLoginRequest {
    email: string,
    password: string,
    rememberMe: boolean,
    code: string,
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
