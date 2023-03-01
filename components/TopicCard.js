import { View, Text, Image, TouchableOpacity, StyleSheet, Pressable } from 'react-native'
import {useNavigation} from "@react-navigation/native";
import {COLORS, FONTS, SHADOWS, SIZES} from "../constants";
import SelectDropdown from 'react-native-select-dropdown';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';

const topicBGImage = require('../assets/TopicBG.png');

const TopicCard = (props) => {
    const navigation = useNavigation();
    const data = props.data;
    const destination = props.destination;
    const cardId = props.cardId;
    const value = props.value;
    const setShowConfirmationModal = props.setShowConfirmationModal;
    const setWarningData = props.setWarningData;

    return (
        <View style={{
            backgroundColor: COLORS.white,
            borderRadius: SIZES.font,
            marginBottom: SIZES.extraLarge,
            margin: SIZES.extraLarge,
            ...SHADOWS.dark,
        }}>
           
            <TouchableOpacity onPress={
                ()=> {
                    navigation.navigate(destination, {data});
                    }
                }>
                <View style={{
                    width: '100%', height: 250
                }}>
                    <View style={{
                        position: "absolute",
                        alignSelf: "flex-end",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        width: 45,
                        height: 80,
                        zIndex: 2,
                        borderRadius: 50,
                        opacity: 0.8,
                    }}>
                        {
                            props.editable ? 
                                <Pressable style={styles.pressableStyle}>
                                    <View style={styles.buttonBackground}>
                                        <Entypo name="edit" size={32} color="blue"/>
                                    </View>
                                </Pressable>
                                :
                                null
                        }
                        
                        <Pressable 
                            style={styles.pressableStyle}
                            onPress={() => {
                                setWarningData({
                                    title: `Deletion Warning:\n"THIS ACTION IS NOT REVERSIBLE"`,
                                    body: `Are you sure you want to delete ${value} topic. All related "DATA" will be deleted as well.`,
                                    id : cardId
                                })
                                setShowConfirmationModal(true);
                            }}
                        >
                            <View style={styles.buttonBackground}>
                                <MaterialIcons name="delete" size={35} color="red" />
                            </View>
                        </Pressable>
                    </View>
                    <Image source={topicBGImage} 
                    resizeMode="cover"
                    style={{
                        width: "100%",
                        height: "90%",
                        borderTopLeftRadius: SIZES.font,
                        borderTopRightRadius: SIZES.font
                    }}
                    />
                    <Text style={{
                        paddingLeft: 10, 
                        fontWeight: "bold",
                        alignSelf: "center",
                        }}>{value}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    pressableStyle: {
        width: 45,
        height: 40,
        marginBottom: 2,
        borderRadius: 10,
    },
    buttonBackground : {
        width: 35,
        height: 35,
        marginTop: 2,
        borderRadius: 10,
        backgroundColor: COLORS.gray,
        alignSelf:"flex-end"
    }
})

export default TopicCard