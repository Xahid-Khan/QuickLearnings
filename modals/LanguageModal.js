import { useState } from 'react';
import { View, Modal, TextInput, ScrollView, Text } from 'react-native';
import { RectButton } from '../components/Button';
import { COLORS } from "../constants";

const LanguageModal = (props) => {
    const modalVisible = props.modalVisible;
    const setModalVisible = props.setModalVisible;
    const addNewLanguage = props.addNewLanguage;
    const newLanguage = props.newLanguage
    const setNewLanguage = props.setNewLanguage
    const showSnackError = props.showSnackError
    const snackErrorMessage = props.snackErrorMessage
    

    const validateInput = (event) => {
        return event.replace(/[`~!@#$%^&*()_+-=<>?,./|+\=;:'"<>\{\}\[\]\\\/]/gi, '');
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible);
            }}>
            <ScrollView keyboardShouldPersistTaps={"always"}>
                <View style={{
                    flexDirection:"row",
                    justifyContent:"center",
                    alignSelf:"center",
                    marginTop:"40%",
                    borderRadius:25,
                    backgroundColor:COLORS.primary,
                    width:"80%",
                    borderWidth: 2,
                    borderColor: "aqua",
                }}>
                    <View style={{
                        flex:1,
                        flexDirection:"column",
                        justifyContent:"space-between",
                        width:"100%",
                        alignItems:"center",
                    }}>
                        <Text style={{
                            fontWeight: "bold",
                            padding: 5,
                            color: COLORS.white,
                        }}>SELECT LANGUAGE:</Text>
                        <TextInput style={{
                            borderWidth:2,
                            borderRadius:20,
                            width:"90%",
                            height:60,
                            paddingHorizontal: 10,
                            backgroundColor:COLORS.quizViewCard,
                        }}
                            placeholder={' (64 Characters Max)'}
                            maxLength={64}
                            value = {newLanguage}
                            onChangeText={(e) => setNewLanguage(validateInput(e))}
                        />
                        <View style={{
                            height:170,
                            width: "80%",
                        }}>
                            <RectButton 
                                buttonImage={require("../assets/logo.png")} 
                                onPressHandle= {() => {
                                    addNewLanguage(newLanguage, setNewLanguage);
                                }}
                                buttonText={"Add Language"}
                                activate={newLanguage == "" ? true : false}
                                backgroundColor={COLORS.right}
                                width={"100%"}
                                marginTop={20}
                                opacity = {newLanguage == "" ? 0.4 : 1}
                            />
                            <RectButton 
                                buttonImage={require("../assets/logo.png")} 
                                onPressHandle= {() => {
                                    setModalVisible(!modalVisible);
                                    setNewLanguage("");
                                }}
                                buttonText={"Cancel"}
                                activate={false}
                                backgroundColor={COLORS.wrong}
                                width={"100%"}
                                marginTop={10}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </Modal>
    )
}

export default LanguageModal