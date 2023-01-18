import { View, Image } from 'react-native'
import React from 'react'

const LoadingScreen = () => {
  return (
    <View key={"loading-page"}
      style={{flexDirection: "column", justifyContent:"center"}}>
        <Image source={require("../assets/loading.gif")}
            style={{
				width: "100%",
				height:'100%',
            }}
        />
    </View>
  )
}

export default LoadingScreen