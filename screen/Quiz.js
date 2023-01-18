import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, ImageBackground, Alert } from 'react-native';
import { CircleButton, RectButton } from '../components/Button';
import {AskQuestion, LoadingScreen } from "../components";
import {COLORS} from "../constants";


const bgImage = require("../assets/TopicBG.png");
const goBackImage = require("../assets/goBack.png");

const Quiz = ({route}) => {
    const navigation = useNavigation();
    const quizData = route.params.randomeData;
    
    const [loading, setLoading] = useState(true);
    const [selectionMade, setSelectionMade] = useState(false);
    const [index, setIndex] = useState(0);
    const [quiz, setQuiz] = useState(quizData[index]);
    const [options, setOptions] = useState([]);
    
    const randomeOptions = () => {
        let randomeAnswers = [];
        let trackIndex = [];
        while (randomeAnswers.length < 3) {
            let tempIndex = (Math.ceil(Math.random() * (quizData.length - 1)));
            if (tempIndex != index && !trackIndex.includes(tempIndex)) {
                trackIndex.push(tempIndex);
                randomeAnswers.push(quizData[tempIndex].answer);
            }
        }
        randomeAnswers.push(quizData[index].answer);
        setOptions(randomeAnswers.sort(() => Math.random() - 0.5));
    }

    const checkSelection = () => {
        return quiz.answer
    }

    const nextQuestion = () => {
        if (index >= quizData.length-1) {
            Alert.alert("Finished", "Good Job", [
                {
                    text:"OK",
                    onPress: () => {navigation.navigate("Home")}
                }
            ])
        } else {
            setIndex(index + 1);
            setQuiz(quizData[index]);
        }
    }

    useEffect (() => {
        setTimeout( ()=> {
            setQuiz(quizData[index]);
            randomeOptions();
        }, 200);
    }, [index]);


    setTimeout(() => {
        setLoading(false);
    }, 1000);
    
    if (loading) {
        return(
            <LoadingScreen/>
        )
    }

    return (
        <SafeAreaView key={"main-quiz-screen"}>
            <View style={{
				paddingTop: 5,
				flexDirection:"row", 
				justifyContent:"space-between",
				height:"8%",
				backgroundColor: COLORS.primary,
				}}
                key={"quiz-screen-header"}>
				<CircleButton 
					buttonImage= {goBackImage}
					imageWidth = {30}
					imageHeight = {30}
					onPressHandle= {()=> navigation.goBack()}
					width={50} height={50}
					borderRadius = {50}
					backgroundColor = {COLORS.white}
                    key={"quiz-screen-go-back-button"}
				/>
				
                <Text style={{
                    margin: 15,
                    color: COLORS.white
                }}> {index + 1} / {quizData.length}</Text>
			</View>
            <ImageBackground source={bgImage} 
				style={{width:"100%", height:"100%"}} 
				resizeMode="cover"
                key={"quiz-screen-background-image"}>
                <AskQuestion quizState={quiz}
                    options={options}
                    checkSelection={checkSelection}
                    nextQuestion = {nextQuestion}
                />  
            </ImageBackground>
        </SafeAreaView>
    )
}

export default Quiz