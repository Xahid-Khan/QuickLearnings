import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageBackground } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StatusBarComp } from '../components';
import { COLORS } from '../constants';
import ErrorSnackBar from '../components/ErrorSnackBar';
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { ScrollView } from 'react-native';
import { async } from '@firebase/util';


const Singup = () => {
    const navigation = useNavigation();
    const [errorMessage, setErrorMessage] = useState("");
    const [snackIsVisible, setSnackIsVisible] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const fieldValidation = () => {
        let output = false;

        if (firstName.length == 0) {
            setSnackIsVisible(true);
            setErrorMessage("Please enter the first name.")
        } else if (lastName.length == 0 ) {
            setSnackIsVisible(true);
            setErrorMessage("Please enter the Last name.")
        } else if (userName.length == 0 ) {
            setSnackIsVisible(true);
            setErrorMessage("Please enter the username.")
        } else if (email.length == 0 ) {
            setSnackIsVisible(true);
            setErrorMessage("Please enter the email.")
        } else if (password.length == 0 ) {
            setSnackIsVisible(true);
            setErrorMessage("Please enter the password.")
        } else if (password !== confirmPassword ) {
            setSnackIsVisible(true);
            setErrorMessage("Your passwords do not match, try again.")
        } else {
            setSnackIsVisible(false);
            output = true;
        }
        return output;
    }

    const signupUser = () => {
        if (fieldValidation()) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCred) => {
                    try {
                        addDoc(
                            collection(db, "users"),
                            {
                                firstName: firstName,
                                lastName: lastName,
                                userName: userName,
                                email: email,
                                password: password
                            }
                            )
                    } catch (e) {
                        console.log(e);
                    }
                    navigation.navigate("Welcome");
                })
                .catch((err) => {
                    if (err.message.includes("email-already-in-use")){
                        console.log(err.message);
                        setErrorMessage("Email is already in use.");
                        setSnackIsVisible(true);
                    } else if (err.message.includes("Password should be at least 6 characters")) {
                        console.log(err.message);
                        setErrorMessage("Password should be at least 6 characters.");
                        setSnackIsVisible(true);
                    } else {
                        console.log(err.message);
                        setErrorMessage("Server Error - Try again later.");
                        setSnackIsVisible(true);
                    }
                });
        }
    }

    if (auth.currentUser) {
        navigation.dispatch(
            navigation.reset({
                index: 0,
                routes: [{name: "Welcome"}]
            })
        )
    } else {
        return (
            <ScrollView 
                contentContainerStyle={{flexGrow: 1}}
                keyboardShouldPersistTaps={"always"}
            >
                <SafeAreaView style={styles.safeAreaViewStyle}>
                    <StatusBarComp background={COLORS.statusBarColour}/>
                        <ImageBackground
                        source={require("../assets/TopicBG.png")}
                        style={styles.backgroundImage}
                        resizeMode='cover'
                        >
                            <View style={styles.signupPage}>
                                <View style={styles.signupForm}>
                                    <Text style={styles.pageTitle}>
                                        QUICK LEARNINGS
                                    </Text>
                                    <TextInput 
                                        style={styles.emailInput}
                                        placeholder='First Name'
                                        placeholderTextColor={"white"}
                                        onChange = { () => {
                                            setSnackIsVisible(false);
                                        }}
                                        onChangeText={setFirstName}
                                    />
                                    <TextInput 
                                        style={styles.emailInput}
                                        placeholder='Last Name'
                                        placeholderTextColor={"white"}
                                        onChange = { () => {
                                            setSnackIsVisible(false);
                                        }}
                                        onChangeText={setLastName}
                                    />
                                    <TextInput 
                                        style={styles.emailInput}
                                        placeholder='Username'
                                        placeholderTextColor={"white"}
                                        onChange = { () => {
                                            setSnackIsVisible(false);
                                        }}
                                        onChangeText={setUserName}
                                        autoCapitalize={'none'}
                                    />
                                    <TextInput 
                                        style={styles.emailInput}
                                        placeholder='Email'
                                        placeholderTextColor={"white"}
                                        onChange = { () => {
                                            setSnackIsVisible(false);
                                        }}
                                        onChangeText={setEmail}
                                        autoCapitalize={'none'}
                                    />
                                    <TextInput
                                        secureTextEntry
                                        style={styles.passwordInput}
                                        placeholder='Password'
                                        placeholderTextColor={"white"}
                                        onChange = { () => {
                                            setSnackIsVisible(false);
                                        }}
                                        onChangeText={setPassword}
                                        autoCapitalize = {'none'}
                                    />
                                    <TextInput
                                        secureTextEntry
                                        style={styles.passwordInput}
                                        placeholder='Confirm Password'
                                        placeholderTextColor={"white"}
                                        onChange = { () => {
                                            setSnackIsVisible(false);
                                        }}
                                        onChangeText={setConfirmPassword}
                                        autoCapitalize = {'none'}
                                    />
                                    <View style={{width:"60%", marginTop:20}}>
                                        <Button 
                                            title="Sign up"
                                            style={{padding: 50}}
                                            onPress ={ () => {signupUser()}}
                                        />
                                    </View>
                                    <ErrorSnackBar 
                                        snackIsVisible = {snackIsVisible} 
                                        errorMessage = {errorMessage} 
                                        setSnackIsVisible = {setSnackIsVisible}
                                    />
                                </View>
                                <View style={styles.signinText}>
                                    <Text style={{
                                        backgroundColor:"#46C7C7",
                                        padding:10,
                                        borderRadius:20,
                                        }}>
                                    Already have an account?  
                                    <Pressable 
                                        onPress={() => {navigation.navigate("Login")}}
                                    >
                                        <Text 
                                            style={{
                                                fontSize:15, 
                                                color:"blue", 
                                                marginBottom:-5, 
                                                marginLeft:5}}
                                            >Sign In</Text>
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
    
export default Singup
    
const styles = StyleSheet.create({
    safeAreaViewStyle : {
        backgroundColor:"white",
        flex: 1,
    },
    backgroundImage: {
        width:"100%",
        height:"100%"
    },
    signupPage: {
        marginTop: 5,
        flexDirection:"column",
        justifyContent:'center',
        flex: 1
    },
    pageTitle: {
        backgroundColor:"#46C7C7",
        padding:10,
        borderRadius: 30,
        fontWeight: 'bold',
        fontSize: 24,
        marginTop: 10
    },
    signupForm: {
        width:"80%",
        alignSelf:"center",
        flex : 9,
        backgroundColor:"black",
        opacity: 0.8,
        borderRadius: 20,
        paddingLeft: 30,
        paddingRight: 30,
        alignItems: "center",
        justifyContent: "space-between",
    },
    signinText: {
        alignSelf:"center",
        justifyContent:"center",
        flex: 1,
        marginTop: 20,
    },
    emailInput: {
        color: "white",
        fontSize: 18,
        height: 40,
        alignSelf: "stretch",
        borderBottomWidth: 1,
        borderBottomColor: "white",
        marginTop: 25
    },
    passwordInput: {
        color:"white",
        fontSize: 18,
        height: 40,
        alignSelf: "stretch",
        borderBottomWidth: 1,
        borderBottomColor: "white",
        marginTop: 25
    },
    singupButton: {
        alignSelf: 'stretch',
        width: 200,
    }
})