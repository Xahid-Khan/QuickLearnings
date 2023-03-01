import { Text, View, SafeAreaView, FlatList} from 'react-native';
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
import { currentUser } from '../firebase';
import * as transactions from "../modals/transactions";


const Home = ({route}) => {
    const language = route.params.data;
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [topicData, setTopicData] = useState([]);
    const [user, setUser] = useState([]);
    const [warningData, setWarningData] = useState({
        title   : "",
        body    : "",
        id      : null
    });
    
    useEffect(() => {
        getTopicData();
    }, [loading])

    const getTopicData = () => {
        transactions.getTopicData(language.id, setTopicData, setLoading)
    }

    const addNewTopicToDB = (newTopic) => {
        transactions.addNewTopicToDB(newTopic, setLoading, language);
        getTopicData();
    }

    const deleteTopicAndData = () => {
        transactions.deleteTopicAndData(warningData.id);
        getTopicData();
    }

    
    return (
    <SafeAreaView style={{flex: 1}} key={"homePageSafeArea"}>
        <StatusBarComp background={COLORS.statusBarColour}/>
        {
            loading ? 
            <LoadingScreen/>
            :
            <View style={{flex:1}} key={"home-screen"}>
                <View key={"custom-buttons-home"} style={{flex: 1}}>
                    <CircleButton 
                    buttonImage= {require('../assets/add_button.jpg')}
                    imageWidth = {65}
                    imageHeight = {65}
                    onPressHandle= {() => setModalVisible(!modalVisible)}
                    bottom={10} right={5} width={80} height={80}
                    borderRadius = {50} opacity= {0.7}
                    position= {'absolute'}
                    key={"add-new-topic-button"}
                />
                    {
                        topicData.length == 0 ? 
                        <View>
                            <HomeHeaderComp userName={currentUser().userName} />
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
                            ListHeaderComponent={<HomeHeaderComp userName={currentUser().userName}/>}
                            renderItem={
                                ({item}) => <TopicCard 
                                            data={item}
                                            cardId = {item.id}
                                            value = {item.topic}
                                            destination = "Topic"
                                            setShowConfirmationModal = {setShowConfirmationModal}
                                            setWarningData = {setWarningData}
                                            editable = {true}
                                            />}
                            keyExtractor = {(item) => {return item.id.toString() + "_topic"}}
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
            <View 
                key={"home-bottom-background"}
                style={{backgroundColor: COLORS.primary, height: 300}}
            />

        </View>
    </SafeAreaView>
  )
}
export default Home