import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import {COLORS, SIZES, SHADOWS} from "../constants";
import { Entypo, MaterialIcons } from '@expo/vector-icons';


const QuizViewCard = (props) => {
    const data = props.quiz;
    const setShowConfirmationModal = props.setShowConfirmationModal;
    const setWarningData = props.setWarningData;

    return (
        <View style={{
            backgroundColor: COLORS.quizViewCard,
            borderRadius: SIZES.font,
            marginBottom: SIZES.extraLarge,
            margin: SIZES.medium,
            ...SHADOWS.dark,
        }}>
            
            <View style={{
                width: '100%', minHeight: 150,
                padding: 10
            }}>
                {
                data != undefined ? 
                <View>
                    <View style={{
                        position: "absolute",
                        alignSelf: "flex-end",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: -20,
                        width: 80,
                        height: 30,
                        zIndex: 2,
                        opacity: 0.8,
                    }}>
                        <Pressable style={styles.pressableStyle}>
                            <View style={styles.buttonBackground}>
                                <Entypo name="edit" size={24} color="blue"/>
                            </View>
                        </Pressable>
                        <Pressable 
                            style={styles.pressableStyle}
                            onPress={() => {
                                setWarningData({
                                    title : `Deletion Warning:\n"THIS ACTION IS NOT REVERSIBLE"`,
                                    body : `Are you sure you want to delete the quiz card "${data.question}"`,
                                    t_id : data.topicId,
                                    q_id : data.id,
                                })
                                setShowConfirmationModal(true);
                            }}
                        >
                            <View style={styles.buttonBackground}>
                                <MaterialIcons name="delete" size={28} color="red" />
                            </View>
                        </Pressable>
                    </View>
                    <Text style={{fontWeight: 'bold'}}>Question:</Text>
                    <Text style={{textAlign:'center', borderBottomWidth: 1, borderBottomColor: COLORS.gray}}>{data.question}</Text>
                    <Text style={{paddingTop: 10, fontWeight: 'bold'}}>Answer:</Text>
                    <Text style={{padding: 10, textAlign:'center', justifyContent:"center"}}>{data.answer}</Text>
                </View>
                :
                <View style={{flex:1}}>
                    <Text style={{
                    fontSize: SIZES.extraLarge, 
                    flex: 1,
                    fontWeight: '600', textAlign:'center', 
                    textAlignVertical:"center"
                    }}>No Record Found!</Text>
                    <Text style={{
                    flex: 1, textAlign:'center'
                    }}>
                        Use the + button to add some Quizes.
                    </Text>
                </View>
                }
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    pressableStyle: {
        width: 45,
        height: 30,
        borderRadius: 10,
    },
    buttonBackground : {
        width: 35,
        height: 30,
        borderRadius: 10,
        alignSelf:"flex-end"
    }
})

export default QuizViewCard