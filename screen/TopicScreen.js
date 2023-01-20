import { View, Text, FlatList, ImageBackground, TextInput, Button  } from 'react-native'
import { React, useEffect, useState } from 'react'
import { useNavigation} from '@react-navigation/core';
import TopicAndQuestionModal from "../modals/TopicAndQuestionModal";
import { LoadingScreen, QuizViewCard, TopicViewHeader} from '../components';
import { CircleButton, RectButton } from '../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import {COLORS} from "../constants";
import * as SQLite from "expo-sqlite";
import ConfirmationModal from '../modals/ConfirmationModal';

const bgImage = require("../assets/TopicBG.png");
const goBackImage = require("../assets/goBack.png");
const logo = require("../assets/logo.png");
const plusImage = require("../assets/add_button.jpg");


const TopicScreen = ({route}) => {
	const navigation = useNavigation();
	const topic = route.params.data;
	const [loading, setLoading] = useState(true);
	const [modalVisible, setModalVisible] = useState(false);
	const [db, setDb] = useState(SQLite.openDatabase("QL_DB.db"));
	const [quizData, setQuizData] = useState([]);
	const [filterInput, setFilterInput] = useState("");
	const [showConfirmationModal, setShowConfirmationModal] = useState(false);
	const [warningData, setWarningData] = useState({
        title : "",
		body : "",
		t_id : null,
		q_id : null,
    });

	const getUpdatedQuizData = (filterInput) => {
		db.transaction(tx => {
            tx.executeSql('SELECT * FROM quiz WHERE "topic_id" = ? and (question LIKE ? OR answer LIKE ?)',
			[topic.topic_id, "%"+filterInput+"%", "%"+filterInput+"%"],
            (txObj, resultSet) => {
                setQuizData(resultSet.rows._array);
				setTimeout(()=> {
					setLoading(false);
				}, 500);
            },
            (txObj, error) => console.log(error)
            );
        })
	}

	useEffect(() => {
		getUpdatedQuizData(filterInput);
	}, [db, loading])

	const addNewQuizToDB = (newQuiz) => {
		setLoading(true);
		db.transaction(tx=> {
			tx.executeSql(`INSERT INTO quiz (question, answer, topic_id) VALUES (?, ?, ?)`,
				[newQuiz.head, newQuiz.body, topic.topic_id],
				(txObj, resultSet)=> {
					getUpdatedQuizData(filterInput);
					console.log(resultSet.rows._array)},
				(txObj, error) => {console.log(error)})
		})
	}

	const deleteQuizFromTopic = () => {
		setLoading(true);
		db.transaction(tx=> {
			tx.executeSql(`DELETE FROM quiz WHERE quiz_id = ? and topic_id = ?;`,
				[warningData.q_id, warningData.t_id],
				(txObj, resultSet) => {
					getUpdatedQuizData(filterInput);
				},
				(txObj, error) => {console.log(error)}
				)
		})
	}

	if (loading) {
		return (
			<LoadingScreen />
		)
	}
	
	return (
		<SafeAreaView key={"main-topic-screen"}>
			<View>
				<View style={{
					paddingTop: 5,
					flexDirection:"row", 
					justifyContent:"space-between",
					height:64,
					backgroundColor: COLORS.primary,
					}}
					key={"topic-screen-custom-button"}>
					<CircleButton 
						buttonImage= {goBackImage}
						imageWidth = {30}
						imageHeight = {30}
						onPressHandle= {()=> navigation.goBack()}
						width={50} height={50}
						borderRadius = {50}
						backgroundColor = {COLORS.white}
						key={"go-to-previous-screen"}
					/>
					<RectButton 
						buttonImage={logo}
						onPressHandle={()=> {
							db.closeAsync();
							const randomeData = quizData.sort(() => Math.random() - 0.5);
							navigation.navigate("Quiz", {randomeData})}}
						activate = {quizData.length < 5 ? true : false}
						buttonText = {quizData.length < 5 ? "Add 5 Quiz to Enable" : "SART PRACTICE"}
						backgroundColor= {COLORS.quizViewCard}
						borderWidth = {3}
						borderColor = {COLORS.white}
						opacity = {quizData.length < 5 ? 0.4 : 1}
						key={"start-practice-test-button"}
						/>
				</View>
				<View style={{
						backgroundColor: COLORS.primary,
						height: 50,}}>
					<View style={{
						flexDirection:"row",
						justifyContent:"center",
						}}>
							<TextInput style={{
								backgroundColor:COLORS.gray,
								width: "75%",
								height: 40,
								borderRadius: 10,
								marginRight: 10,
								color: COLORS.white,
								paddingHorizontal: 10
							}}
							placeholder = {"SEARCH"}
							maxLength = {64}
							value = {filterInput}
							onChangeText = {(e) => {
								setFilterInput(e.replace(/[`~!@#$%^&*|+\=;:'"<>\{\}\[\]\\\/]/gi, ''));
								if (e == '') {
									getUpdatedQuizData("")
								}
							}}
							/>
							<Button title='Search' key={"search-quiz"} onPress={() => getUpdatedQuizData(filterInput)}></Button>
					</View>
				</View>
			</View>
			<View  style={{width:"100%", height:"85%"}} 
				key={"main-quiz-view"}>

				<ImageBackground source={bgImage} 
				style={{width:"100%", height:"100%"}} 
				resizeMode="cover">
					<CircleButton 
							buttonImage= {plusImage}
							imageWidth = {65}
                    		imageHeight = {65}
							onPressHandle= {()=> {setModalVisible(true)}}
							bottom={5} right={5} width={80} height={80}
                    		borderRadius = {50} opacity= {0.7}
							position= {'absolute'}
							key={"add-new-quiz-button"}
						/>
					
					<View key={"quiz-view-cards"}>
						{quizData.length == 0 ? 
						<QuizViewCard quiz={undefined}/>
						:
						<FlatList data={quizData}
							keyboardShouldPersistTaps={"always"}
							ListHeaderComponent={<TopicViewHeader topic={topic}/>}
							renderItem={
								({item}) => <QuizViewCard 
											quiz={item}
											db = {db}
											setWarningData = {setWarningData}
											setShowConfirmationModal = {setShowConfirmationModal}
											/>}
							keyExtractor = {(item) => {return item.quiz_id.toString() + "_quiz"}}
							showsVerticalScrollIndicator={true}
						>
						</FlatList>
						}
						<TopicAndQuestionModal 
							onAddHandle = {addNewQuizToDB}
							modalVisible = {modalVisible}
							setModalVisible = {setModalVisible}
							title = {"Add New Quiz"}
							head = {"Question"}
							body = {"Answer"}
                    	/>
						<ConfirmationModal 
							confirmationHandle = {deleteQuizFromTopic}
							warningData = {warningData}
							showConfirmationModal = {showConfirmationModal}
							setShowConfirmationModal = {setShowConfirmationModal}
						/>
					</View>
				</ImageBackground>
			</View>
		</SafeAreaView>
  	)
}

export default TopicScreen