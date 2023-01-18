import {FlatList, Text, View } from 'react-native'
import React, {useRef } from 'react'
import {COLORS, SIZES, SHADOWS} from "../constants";
import {OptionCard} from "../components/OptionCard";

const AskQuestion = (props) => {
    const quiz = props.quizState;
    const checkSelection = props.checkSelection;
    const nextQuestion = props.nextQuestion;

    const flastListRef = useRef();

    const scrollToTop = () => {
        flastListRef.current.scrollToOffset({animated: true, offset:0})
    }

    return (
        <View style={{
            height: "80%"
        }}
        key={"quiz-option-view"}
        >
            <View style={{
                height:"20%",
                backgroundColor: COLORS.quizCard,
                borderRadius: SIZES.font,
                marginBottom: SIZES.extraLarge,
                margin: SIZES.medium,
                ...SHADOWS.dark,
            }}>
                <View style={{padding: 5}}>
                    <Text style={{fontWeight: 'bold'}}>Question:</Text>
                    <Text style={{
                        fontStyle:"italic",
                        textAlign:'center',
                        padding:5,
                    }}>{quiz.question}</Text>
                </View>
            </View>
            <View style={{
                height:"80%",
                borderRadius: SIZES.font,
                margin: SIZES.base,
            }}>
                <FlatList
                    keyboardShouldPersistTaps={"always"}
                    data={props.options}
                    ref={flastListRef}
                    keyExtractor = {(item)=> {return item}}
                    renderItem = {({item}) => 
                        <OptionCard
                            item={item}
                            checkSelection={checkSelection}
                            nextQuestion={nextQuestion}
                            scrollToTop = {scrollToTop}
                        />
                    }
                />
            </View>
        </View>
    )
}

export default AskQuestion