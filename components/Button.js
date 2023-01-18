import { TouchableOpacity, Image, Text, View } from 'react-native';
import { COLORS, SHADOWS, SIZES } from '../constants'

export const CircleButton = ({buttonImage,
    onPressHandle,
    imageWidth,
    imageHeight,
     ...props}) => {
    return (
        <TouchableOpacity
            onPress={onPressHandle}
            style={{
                width: 50,
                height: 50,
                zIndex: 1,
                backgroundColor: COLORS.secondary,
                alignItems:'center',
                borderRadius: SIZES.extraLarge,
                justifyContent:'center',
                ...SHADOWS.light,
                ...props,
            }}
        >
            <Image
                source={buttonImage}
                resizeMode="contain"
                style = {{width: imageWidth,
                    height: imageHeight,
                    borderRadius: 30
                }}
            />
        </TouchableOpacity>
    )
}

export const RectButton = ({buttonImage, onPressHandle, 
    buttonText, activate,
    ...props}) => {
    return (
      <TouchableOpacity
            onPress={onPressHandle}
            disabled = {activate}
            style={{
                minWidth: 200,
                height: 50,
                zIndex: 1,
                padding: 5,
                alignItems:'center',
                borderRadius: SIZES.extraLarge,
                justifyContent:'center',
                ...SHADOWS.light,
                ...props,
            }}  
      >
        <View style={{flexDirection: "row", justifyContent:"center"}}>
            <Image
                source={buttonImage}
                resizeMode="contain"
                style = {{width: 30, height: 30, borderRadius: 30}}
            />
            <Text style={{marginLeft:15}}>
                {buttonText}
            </Text>
        </View>
      </TouchableOpacity>
    )
}