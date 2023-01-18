import React from 'react';
import { StatusBar} from 'react-native';
import { useIsFocused } from '@react-navigation/core';

const StatusBarComp = (props) => {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar animated={true} backgroundColor={props.background}/> : null;
}

export default StatusBarComp