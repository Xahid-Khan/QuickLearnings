import { useState } from 'react';
import { View, Modal, TextInput, ScrollView, Text } from 'react-native';
import { RectButton } from '../components/Button';
import {COLORS} from "../constants";


const TopicAndQuestionModal = (props) => {
    const addToDB = props.onAddHandle;
    const modalVisible = props.modalVisible;
    const setModalVisible = props.setModalVisible;
    const title = props.title;
    const headerPlaceHolder = props.head;
    const bodyPlaceHolder = props.body;

    const [newTopic, setNewTopic] = useState("");
    const [newDescription, setNewDescription] = useState("");

    const validateInput = (event) => {
        return event.replace(/[`~!@#$%^&*|+\=;:'"<>\{\}\[\]\\\/]/gi, '');
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            console.log("MODAL CLOSED...");
            setModalVisible(!modalVisible);
            }}>
            <ScrollView keyboardShouldPersistTaps={"always"}>
                <View style={{
                    flexDirection:"row",
                    justifyContent:"center",
                    alignSelf:"center",
                    marginTop:"28%",
                    borderRadius:25,
                    backgroundColor:COLORS.primary,
                    width:"80%",
                    height:"80%",
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
                        }}>{title}</Text>
                        <TextInput style={{
                            borderWidth:2,
                            borderRadius:20,
                            width:"90%",
                            height:100,
                            paddingHorizontal: 10,
                            backgroundColor:COLORS.quizViewCard,
                        }}
                            multiline
                            placeholder={headerPlaceHolder + ' (256 Characters Max)'}
                            maxLength={256}
                            value = {newTopic}
                            onChangeText={(e) => setNewTopic(validateInput(e))}
                        />
                        <TextInput style={{
                            marginTop:"5%",
                            borderWidth:2,
                            borderRadius:20,
                            width:"90%",
                            height:200,
                            textAlignVertical:"top",
                            paddingHorizontal: 10,
                            paddingVertical: 10,
                            backgroundColor:COLORS.quizViewCard,
                        }}
                            multiline
                            maxLength={512}
                            placeholder= {bodyPlaceHolder + ' (512 Characters Max)'}
                            onChangeText={(e) => setNewDescription(validateInput(e))}
                            value = {newDescription}
                        />
                        <View style={{
                            height:170,
                            width: "100%",
                        }}>
                            <RectButton 
                                buttonImage={require("../assets/logo.png")} 
                                onPressHandle= {() => {
                                    addToDB({head: newTopic, body: newDescription});
                                    setModalVisible(!modalVisible);
                                    setNewTopic("");
                                    setNewDescription("");
                                }}
                                buttonText={headerPlaceHolder.includes("Topic") ? "Add Topic" : "Add Quiz"}
                                activate={newTopic == "" || newDescription == "" ? true : false}
                                backgroundColor={COLORS.right}
                                width={"100%"}
                                marginTop={20}
                                opacity = {newTopic == "" || newDescription == "" ? 0.4 : 1}
                            />
                            <RectButton 
                                buttonImage={require("../assets/logo.png")} 
                                onPressHandle= {() => {
                                    setModalVisible(!modalVisible);
                                    setNewTopic("");
                                    setNewDescription("");
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

export default TopicAndQuestionModal