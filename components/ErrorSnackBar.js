import Snackbar from 'react-native-snackbar-component';
import React from 'react';

const ErrorSnackBar = ({snackIsVisible, errorMessage, setSnackIsVisible}) => {
  return (
    <Snackbar
        visible={snackIsVisible}
        //SnackBar visibility control
        textMessage={errorMessage}
        //Text on SnackBar
        actionHandler={() => {
            //After handling click making nackBar invisible
            setSnackIsVisible(false);
        }}
        actionText="Close"
        backgroundColor= "red"
        borderRadius = {50}
        messageColor = {"white"}
        accentColor = {"yellow"}
        containerStyle = {{
            position: "absolute",
            top: 0,
            left: 0,
            borderRadius: 20,
            height: 80,
        }}
        />
  )
}

export default ErrorSnackBar
