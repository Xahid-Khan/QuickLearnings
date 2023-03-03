import { StyleSheet, Text, View, Image, KeyboardAvoidingView, Pressable } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageBackground } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Button } from 'react-native';
import { screenStyles } from '../styles/screenStyle';
import { useNavigation } from '@react-navigation/core';
import { StatusBarComp } from '../components';
import { COLORS } from '../constants';
import { ScrollView } from 'react-native';
import { auth } from "../firebase";
import ErrorSnackBar from '../components/ErrorSnackBar';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ActivityIndicator } from '@react-native-material/core';

const Login = () => {
    const navigation = useNavigation();
    const [errorMessage, setErrorMessage] = useState("");
    const [snackIsVisible, setSnackIsVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');

    const attemptSignIn = () => {
        if (email.length == 0 || password.length == 0){
            setSnackIsVisible(true);
            setErrorMessage("Please fill in the EMAIL and PASSWORD.");
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCred) => {
                    setSnackIsVisible(false);
                    setTimeout(() => {
                        navigation.dispatch(
                            navigation.reset({
                                index: 0,
                                routes: [{name: "LanguageScreen"}]
                            })
                        )
                    }, 500)
                })
                .catch((err) => {
                    if(err.message.includes("wrong-password") ||
                       err.message.includes("user-not-found")
                       ) {
                        setErrorMessage("Email or password is incorrect");
                        setSnackIsVisible(true);
                    } else {
                        console.log(err);
                        setErrorMessage("Server Error - Try again later.");
                        setSnackIsVisible(true);
                    }
                })
        }
    }
    if (auth.currentUser) {
        navigation.dispatch(
            navigation.reset({
                index: 0,
                routes: [{name: "LanguageScreen"}]
            })
        )
    } else {
        return (
        <ScrollView 
            contentContainerStyle={{flexGrow:1}}
            keyboardShouldPersistTaps={"always"}
        >
            <SafeAreaView style={screenStyles.safeAreaViewStyle}>
                <StatusBarComp background={COLORS.statusBarColour}/>
                <ImageBackground
                source={require("../assets/TopicBG.png")}
                style={screenStyles.backgroundImage}
                resizeMode='cover'
                >
                    <View style={styles.loginPage}>
                        <View style={styles.logoView}>
                            <Image 
                                source={require("../assets/logo.png")}
                                style={styles.logoImage}
                            />
                            <Text style={styles.pageTitle}>
                                QUICK LEARNINGS
                            </Text>
                        </View>
                        <View style={styles.loginForm}>
                            <Text style={styles.loginTitle}>LOGIN FORM</Text>
                            <TextInput 
                                style={styles.emailInput}
                                placeholder='Email'
                                placeholderTextColor={"white"}
                                autoCapitalize="none"
                                inputMode='email'
                                onChangeText={setEmail}
                                onChange = {() => setSnackIsVisible(false)}
                            />
                            <TextInput
                                secureTextEntry
                                style={styles.passwordInput}
                                placeholder='Password'
                                placeholderTextColor={"white"}
                                autoCapitalize = "none"
                                onChangeText={setPassword}
                                onChange = {() => setSnackIsVisible(false)}
                                onEndEditing = {() => attemptSignIn()}
                            />
                            <View style={{width:"60%", marginTop: 20}}>
                                <Button 
                                    title="Login"
                                    style={{padding: 50}}
                                    color={"green"}
                                    onPress = { () => {attemptSignIn()}}
                                />
                            </View>
                            <ErrorSnackBar 
                                snackIsVisible = {snackIsVisible} 
                                errorMessage = {errorMessage} 
                                setSnackIsVisible = {setSnackIsVisible}
                            />
                        </View>
                        <View style={styles.signupText}>
                            <Text style={{
                                backgroundColor:"#46C7C7",
                                padding:10,
                                borderRadius:20,
                                }}>
                            Don't have an account? 
                            <Pressable 
                                onPress={() => {navigation.navigate("Signup")}}
                            >
                                <Text 
                                    style={{
                                        fontSize:15, 
                                        color:"blue", 
                                        marginBottom:-5, 
                                        marginLeft:5}}
                                    >Sign Up</Text>
                            </Pressable>
                            </Text>
                        </View>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        </ScrollView>
        )
    }
}

export default Login

const styles = StyleSheet.create({
    loginPage: {
        flexDirection:"column",
        justifyContent:'center',
        flex: 1
    },
    logoView: {
        alignSelf:"center",
        justifyContent:"space-around",
        flex: 4,
        alignItems:"center",
    },
    pageTitle: {
        backgroundColor:"#46C7C7",
        padding:10,
        borderRadius: 30,
        fontWeight: 'bold',
        fontSize: 28
    },
    logoImage: {
        width:150,
        height:150,
        borderRadius: 50,
        borderWidth: 5,
        borderColor:"#46C7C7",
    },
    loginForm: {
        width:"90%",
        alignSelf:"center",
        flex : 3,
        backgroundColor:"black",
        opacity: 0.8,
        borderRadius: 20,
        padding: 20,
        margin: 20,
        alignItems: "center",
        justifyContent: "space-around",
    },
    signupText: {
        alignSelf:"center",
        justifyContent:"center",
        flex: 1,
        margin: 20,
    },
    loginTitle: {
        color:'white',
        fontSize: 24,
        fontWeight: "bold"
    },
    emailInput: {
        color: "white",
        fontSize: 18,
        height: 40,
        alignSelf: "stretch",
        borderBottomWidth: 1,
        borderBottomColor: "white",
        marginTop: 20
    },
    passwordInput: {
        color:"white",
        fontSize: 18,
        height: 40,
        alignSelf: "stretch",
        borderBottomWidth: 1,
        borderBottomColor: "white",
        marginTop: 20
    },
    loginButton: {
        alignSelf: 'stretch',
        width: 200,
    }
})