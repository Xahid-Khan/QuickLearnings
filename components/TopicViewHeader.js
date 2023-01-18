import { View, Text} from 'react-native';
import { React, useState} from 'react';
import { COLORS } from '../constants';

const TopicViewHeader = (props) => {
    const topic = props.topic;
    // const filterQuiz = props.filterQuiz;

  return (
    <View style={{
        backgroundColor: COLORS.primary,
        minHeight: 100,
        paddingLeft: 20,
        paddingRight: 20,
    }}>
        <Text style={{
            color: COLORS.white,
            margin: 5,
            fontWeight:"bold",
        }}>
            {topic.topic}</Text>
        <Text style={{
            color: COLORS.white,
            margin: 5
        }}>
            {topic.description}</Text>
    </View>
  )
}

export default TopicViewHeader