import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import {COLORS, SIZES, SHADOWS} from "../constants";

export const OptionCard = (props) => {
    const option = props.item;
    const checkSelection = props.checkSelection;
    const nextQuestion = props.nextQuestion;
    const [cardColor, setCardColor] = useState({});
    const answer = checkSelection();

    const goNext = (timeDelay) => {
        setTimeout(()=> {
            setCardColor({});
            nextQuestion();
            props.scrollToTop();
        }, timeDelay);
    }

  return (
    <View style={{
        backgroundColor: COLORS.optionCard,
        borderRadius: SIZES.font,
        margin: SIZES.medium,
        ...SHADOWS.dark,
        ...cardColor,
    }}>
        
        <View style={{
            width: '100%', minHeight: 70,
            padding: 10,
        }}>
            <TouchableOpacity key={option} onPress={
                ()=> {
                    if (answer == option) {
                        setCardColor({
                            backgroundColor: COLORS.right,});
                        goNext(700);
                    } else {
                        setCardColor({
                            backgroundColor: COLORS.wrong,});
                        setTimeout(() => {
                            Alert.alert("WRONG SELECTION", `The correct answer is "${answer}"`, [
                                {
                                    text: "OK",
                                    onPress: ()=> goNext(0),
                                    style:"ok"
                            }])
                        }, 500)
                        
                        
                    }
                }}
                >
                <View key={"visible-options-" + {option}}>
                    <Text style={{
                        padding: 10, 
                        textAlign:'center', 
                        justifyContent:"center"
                    }}>{option}</Text>
                </View>
            </TouchableOpacity>
        </View>
        
    </View>
  )
}
