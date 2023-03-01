import React, { useEffect, useState } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Login from './screen/Login';
import Singup from './screen/Singup';
import Welcome from './screen/Welcome';
import Home from './screen/Home';
import Quiz from './screen/Quiz';
import TopicScreen from './screen/TopicScreen';
import * as SQLite from 'expo-sqlite';
import { LoadingScreen } from './components';

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent"
  }
}

export default App = () => {
  // const [db, setDb] = useState(SQLite.openDatabase('QL_DB.db'))
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // db.transaction(tx => {
  //   //   tx.executeSql("DROP TABLE IF EXISTS user")
  //   // });

  //   // This transaction will make sure there is always a user table in the
  //   // database.
  //   db.transaction(tx => {
  //     tx.executeSql(`CREATE TABLE IF NOT EXISTS "user" (
  //       "user_id"	INTEGER NOT NULL UNIQUE,
  //       "first_name"	TEXT NOT NULL,
  //       "last_name"	TEXT NOT NULL,
  //       "age"	INTEGER,
  //       "country"	TEXT,
  //       PRIMARY KEY("user_id" AUTOINCREMENT)
  //     )`, [],
  //     (txObj, resultSet) => console.log("USER Table Generated."),
  //     (txObj, error) => console.log(error)
  //     )
  //   });

  //   // This transaction will make sure that there are always topic and Quiz
  //   // table in the database.
  //   db.transaction(tx => {
  //     tx.executeSql(`CREATE TABLE IF NOT EXISTS "topic" (
  //       "topic_id"	INTEGER NOT NULL UNIQUE,
  //       "topic"	TEXT NOT NULL,
  //       "description"	TEXT NOT NULL,
  //       "practice_with_mistake"	INTEGER DEFAULT 0,
  //       "practice_without_mistake"	INTEGER DEFAULT 0,
  //       "total_practice" INTEGER DEFAULT 0,
  //       PRIMARY KEY("topic_id" AUTOINCREMENT)
  //     )`, [],
  //     (txObj, resultSet) => {
  //       console.log("TOPIC table generated.");
  //     },
  //     (txObj, error) => console.log(error)
  //     )
  //   });

  //   // db.transaction(tx => {
  //   //     tx.executeSql("DROP TABLE IF EXISTS quiz")
  //   //   });
  //   db.transaction(tx => {
  //     tx.executeSql(`CREATE TABLE IF NOT EXISTS "quiz" (
  //       "quiz_id"	INTEGER NOT NULL UNIQUE,
  //       "question"	TEXT NOT NULL,
  //       "answer"	TEXT NOT NULL,
  //       "practice_with_mistake"	INTEGER DEFAULT 0,
  //       "practice_without_mistake"	INTEGER DEFAULT 0,
  //       "total_practice" INTEGER DEFAULT 0,
  //       "topic_id" INTEGER NOT NULL,
  //       FOREIGN KEY("topic_id") REFERENCES topic("topic_id") ON DELETE CASCADE
  //       PRIMARY KEY("quiz_id" AUTOINCREMENT)
  //     )`, [],
  //     (txObj, resultSet) => console.log("QUIZ Table Generated."),
  //     (txObj, error) => console.log(error)
  //     )
  //   });

  //   setTimeout (() => {
  //     setLoading(false)
  //   }, 2000);

  // }, [db])

  const [loadedFonts] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf")
  })

  if (!loadedFonts) return null;

  // if (loading) {
  //   return (<LoadingScreen />)
  // }

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator 
        screenOptions = {{headerShown: false}}
        initialRouteName = "Welcome"
      >
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Signup" component={Singup}/>
        <Stack.Screen name="Welcome" component={Welcome}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Topic" component={TopicScreen}/>
        <Stack.Screen name="Quiz" component={Quiz}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}