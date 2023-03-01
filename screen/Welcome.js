import { StyleSheet, Text, View } from 'react-native';
import React, {useEffect, useState} from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import { screenStyles } from "../styles/screen";
import { ImageBackground } from 'react-native';
import { CircleButton } from '../components/Button';
import { HomeHeaderComp, LoadingScreen, StatusBarComp, TopicCard } from '../components';
import { COLORS, SIZES } from '../constants';
import { auth, db, currentUser } from '../firebase';
import { deleteDoc, setDoc, getDoc, collection, doc, addDoc, getDocs, where, query } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/core';
import LanguageModal from '../modals/LanguageModal';
import ConfirmationModal from '../modals/ConfirmationModal';
import * as transaction from "../modals/transactions";

const Welcome = () => {
    const navigation = useNavigation();
    const loggedIn = auth.currentUser;
    const userInfo = currentUser();
    const [isLoading, setIsLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [showSnackError, setShowSnackError] = useState(false);
    const [snackErrorMessage, setSnackErrorMessage] = useState("");
    const [newLanguage, setNewLanguage] = useState("");
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [warningData, setWarningData] = useState({
        title   : "",
        body    : "",
        id      : null
    });
    const [languages, setLanguages] = useState([])

    setTimeout(() => {
        if (!loggedIn) {
            navigation.dispatch(
                navigation.reset({
                    index: 0,
                    routes: [{name: "Login"}]
                })
            )
        }
    }, 100);

    useEffect(() => {
        getLanguages()
    }, [isLoading, userInfo])

    const getLanguages = () => {
        transaction.getLanguages(setLanguages, setIsLoading);
    }

    const addNewLanguage = () => {
        transaction.addNewLanguage(languages, setModalVisible, setNewLanguage, newLanguage);
        getLanguages();
    }

    const deleteLanguageAndData = () => {
        transaction.deleteLanguageAndData(warningData.id);
        getLanguages();
    }


    return (
    <SafeAreaView style={screenStyles.safeAreaViewStyle}>
        {
            isLoading || !userInfo ? 
            <>
                <View style={{flex: 1, width: "100%"}}>
                    <LoadingScreen />
                </View>
            </>
            :
            <>
                <StatusBarComp background={COLORS.statusBarColour}/>
                <View style={styles.welcomePage}>
                    <CircleButton 
                        buttonImage= {require('../assets/add_button.jpg')}
                        imageWidth = {65}
                        imageHeight = {65}
                        onPressHandle= {() => setModalVisible(!modalVisible)}
                        bottom={10} right={5} width={80} height={80}
                        borderRadius = {50} opacity= {0.8}
                        position= {'absolute'}
                        key={"add-new-language-button"}
                        />
                    <HomeHeaderComp userName={userInfo.userName} />

                    {
                        languages.length == 0 ? 
                        <View>
                            <View style={{
                                width:'80%',
                                backgroundColor: "black",
                                padding: 20,
                                opacity: 0.8,
                                borderRadius: 40,
                                marginTop: "20%",
                                paddingTop: 50,
                                paddingBottom: 50,
                                alignSelf: 'center',
                            }}>
                                <Text style={{
                                    color:"white",
                                    alignSelf:"center",
                                    fontWeight:"bold",
                                    fontSize: SIZES.large,
                                    textAlign: "center",
                                    opacity: 1,
                                }}>Use the "+" button on bottom-right corner to add new Language</Text>
                            </View>
                        </View>
                        :
                        <FlatList data={languages}
                            keyboardShouldPersistTaps={"always"}
                            // ListHeaderComponent={<HomeHeaderComp userName={user[0].first_name}/>}
                            renderItem={
                                ({item}) => <TopicCard 
                                            data={item}
                                            cardId = {item.id}
                                            value = {item.language}
                                            destination = "Home"
                                            setShowConfirmationModal = {setShowConfirmationModal}
                                            setWarningData = {setWarningData}
                                            editable = {false}
                                            />}
                            keyExtractor = {(item) => {return item.id.toString() + "_topic"}}
                            showsVerticalScrollIndicator={true}
                        />
                    }
                </View>
                <View>  
                <LanguageModal
                    modalVisible = {modalVisible}
                    setModalVisible = {setModalVisible}
                    addNewLanguage = {addNewLanguage}
                    newLanguage = {newLanguage}
                    setNewLanguage = {setNewLanguage}
                    showSnackError = {showSnackError}
                    snackErrorMessage = {snackErrorMessage}
                />
                </View>
                <ConfirmationModal
                    confirmationHandle = {deleteLanguageAndData}
                    showConfirmationModal = {showConfirmationModal}
                    setShowConfirmationModal = {setShowConfirmationModal}
                    warningData = {warningData}
                    />
                <View key={"home-top-background"} style={{position: 'absolute',
                    top:0, bottom:0,
                    left: 0, right: 0, zIndex: -1}}>
                    <View key={"home-bottom-background"} style={{backgroundColor: COLORS.primary, height: 300}}/>

                </View>
            </>
        }
    </SafeAreaView>
    )
}

export default Welcome

const styles = StyleSheet.create({
    welcomePage: {
        flex: 1,
    }
})