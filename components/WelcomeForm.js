import {Text, TextInput, View, StyleSheet} from "react-native";
import HomeHeaderComp from "./HomeHeaderComp";
import {COLORS, SIZES} from "../constants";
import { RectButton } from "./Button";
import { useState } from "react";

const WelcomeForm = (props) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [age, setAge] = useState("");
	const [country, setCountry] = useState("");
	const setNewUser = props.setNewUser;
	
	const updateNewUser = () => {
		setNewUser({
			first_name 	: firstName,
			last_name 	: lastName,
			age 		: age,
			country 	: country
		})
	}

	return (
		<View key={"welcome-form-for-user"}>
			<View key={"welcome-form-header"}>
				<HomeHeaderComp/>
			</View>
			<View style={{
				width:'100%',
				height:"90%",
				flexDirection:"column",
				justifyContent:"center",
			}} key={"welcome-form-body"}>
				<Text style={{
					color:"white",
					fontSize:SIZES.extraLarge,
					margin:"7%",
					borderRadius:20,
					minHeight:30,
					alignSelf:"center"
				}}
				>Enter Details To Start</Text>
				<TextInput style={styles.textInput}
					placeholder="First Name"
					value= {firstName}
					onChangeText={setFirstName}
					/>
				<TextInput style={styles.textInput}
					placeholder="Last Name"
					value={lastName}
					onChangeText={setLastName}
					/>
				<TextInput style={styles.textInput}
					placeholder="Age"
					value={age}
					onChangeText={setAge}
					/>
				<TextInput style={styles.textInput}
					placeholder="Country"
					value={country}
					onChangeText={setCountry}
					/>
				
				<RectButton 
					buttonImage={require("../assets/logo.png")}
					onPressHandle={() => {updateNewUser()}}
					buttonText={"Let's Start"} activate={false}
					backgroundColor={COLORS.right}
					margin={"10%"}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	textInput: {
		margin: "2%",
		paddingVertical:10,
		paddingHorizontal:20,
		textAlign:"center",
		fontSize:SIZES.large,
		borderRadius:20,
		minHeight:80,
		backgroundColor:COLORS.quizViewCard
	}
})

export default WelcomeForm;