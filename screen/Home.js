import { Text, View, SafeAreaView, FlatList, StyleSheet, Modal, Pressable, TextInput, ScrollView } from 'react-native';
import {
    HomeHeaderComp, 
    StatusBarComp, 
    LoadingScreen, 
    TopicCard, 
    WelcomeForm,
} from "../components";
import TopicAndQuestionModal from "../modals/TopicAndQuestionModal";
import { CircleButton, RectButton } from '../components/Button';
import {COLORS, SIZES, SHADOWS, DummyData} from "../constants";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from 'react';
import ConfirmationModal from '../modals/ConfirmationModal';


const Home = () => {
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [topicData, setTopicData] = useState([]);
    const [db, setDb] = useState(SQLite.openDatabase('QL_DB.db'));
    const [user, setUser] = useState([]);
    const [warningData, setWarningData] = useState({
        title   : "",
        body    : "",
        id      : null
    });
    const [newUser, setNewUser] = useState({
        first_name 	: "",
        last_name 	: "",
        age 		: null,
        country 	: null
    });
    
    useEffect(() => {
        if (user.length == 0 &&
            newUser.first_name != "" &&
            newUser.last_name != "") {
                db.transaction(tx => {
                tx.executeSql(`INSERT INTO "user" 
                (first_name, last_name, age, country) 
                VALUES (?, ?, ?, ?)`,
                [newUser.first_name, newUser.last_name, newUser.age, newUser.country],
                (txObj, resultSet) => {
                    console.log("New User Has Been Added.")
                },
                (txObj, error) => {console.log(error)}
                )
                });

            }
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM user', null,
            (txObj, resultSet) => {
                setUser(resultSet.rows._array);
            },
            (txObj, error) => console.log(error)
            );
        })

        getTopicData();

    }, [db, newUser])

    const getTopicData = () => {
        db.transaction(tx=> {
            tx.executeSql("SELECT * FROM topic", null,
            (txObj, resultSet) => {
                setTopicData(resultSet.rows._array.reverse());
                setLoading(false);
            },
            (txObj, error) => console.log(error))
        })
    }

    const addNewTopicToDB = (newTopic) => {
        setLoading(true);
        db.transaction(tx=> {
            tx.executeSql(`
            INSERT INTO "topic" (topic, description) VALUES (?,?)`,
            [newTopic.head, newTopic.body],
            (txObj, resultSet)=> {
                getTopicData();
                console.log("New Topic Has Been Added.");},
            (txObj, error) => {console.log(error)})
        })
    }

    const deleteTopicAndData = () => {
        setLoading(true);
        db.transaction(tx=> {
            tx.executeSql(`DELETE FROM quiz WHERE topic_id = ?;`,
				[warningData.id],
				(txObj, resultSet) => {
					console.log("Quiz Deleted...");
				},
				(txObj, error) => {console.log(error)}
				)
			tx.executeSql(`DELETE FROM topic WHERE topic_id = ?;`,
				[warningData.id],
				(txObj, resultSet) => {
					getTopicData();
				},
				(txObj, error) => {console.log(error)}
				)
		})
    }

    
    return (
    <SafeAreaView style={{flex: 1}} key={"homePageSafeArea"}>
        <StatusBarComp background={COLORS.statusBarColour}/>
        {
            loading ? 
            <LoadingScreen/>
            :
                user.length == 0 ? 
                <WelcomeForm setNewUser={setNewUser}/>
                :
                <View style={{flex:1}} key={"home-screen"}>
                    <View key={"custom-buttons-home"}>
                        <CircleButton 
                        buttonImage= {require('../assets/add_button.jpg')}
                        imageWidth = {65}
                        imageHeight = {65}
                        onPressHandle= {() => setModalVisible(!modalVisible)}
                        bottom={5} right={5} width={80} height={80}
                        borderRadius = {50} opacity= {0.7}
                        position= {'absolute'}
                        key={"add-new-topic-button"}
                        />
                        {
                            topicData.length == 0 ? 
                            <View>
                                <HomeHeaderComp userName={user[0].first_name} />
                                <View style={{
                                    height:"90%"
                                }}>
                                    <Text style={{
                                        color:"white",
                                        alignSelf:"center",
                                        margin: 50,
                                        fontWeight:"bold",
                                        fontSize: SIZES.large,
                                        textAlign: "center"
                                    }}>Use the "+" button on bottom-right corner to add new Topic</Text>
                                </View>
                            </View>
                            :
                            <FlatList data={topicData}
                                keyboardShouldPersistTaps={"always"}
                                ListHeaderComponent={<HomeHeaderComp userName={user[0].first_name}/>}
                                renderItem={
                                    ({item}) => <TopicCard 
                                                data={item}
                                                setShowConfirmationModal = {setShowConfirmationModal}
                                                setWarningData = {setWarningData}
                                                />}
                                keyExtractor = {(item) => {return item.topic_id.toString() + "_topic"}}
                                showsVerticalScrollIndicator={true}
                            />
                        }
                    </View>
                    <TopicAndQuestionModal 
                        onAddHandle = {addNewTopicToDB}
                        modalVisible = {modalVisible}
                        setModalVisible = {setModalVisible}
                        title = {"Add New Topic"}
                        head = {"Topic Title"}
                        body = {"Description"}
                    />
                    <ConfirmationModal
                        confirmationHandle = {deleteTopicAndData}
                        showConfirmationModal = {showConfirmationModal}
                        setShowConfirmationModal = {setShowConfirmationModal}
                        warningData = {warningData}
                        />
                </View>
        }
        
        <View key={"home-top-background"} style={{position: 'absolute',
                    top:0, bottom:0,
                    left: 0, right: 0, zIndex: -1}}>
            <View key={"home-bottom-background"} style={{backgroundColor: COLORS.primary, height: 300}}/>

        </View>
    </SafeAreaView>
  )
}
export default Home