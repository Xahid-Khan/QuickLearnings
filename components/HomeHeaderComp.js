import { Pressable } from "react-native";
import { useState } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import { AntDesign } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/core";


const HomeHeaderComp = (props) => {
	const userName = props.userName;

	const navigation = useNavigation();
	const [showSignOut, setShowSignOut] = useState(false);
	const [disableScreen, setDisableScreen] = useState(true);

	return (
		<View style={{
			backgroundColor: COLORS.primary,
			paddingleft: 14,
			paddingTop: 14,
			paddingBottom: 14,
			color: COLORS.white,
			zIndex: 999
		}}>
			<View style={{ 
				flexDirection: "row", 
				justifyContent: "space-between", 
				alignItems: "center" 
			}}>
				<Image style={{ 
					width: 50,
					height: 50, 
					borderRadius: 20
				 }}
					source={require("../assets/logo.png")}
					resizeMode="contain"
				/>
				<View style={{
					width: "80%", flexDirection: "row", justifyContent: "space-between",
					marginLeft: 10, marginRight: 10
				}}>
					<View style={{
						flex: 1,
						height: 50, 
						justifyContent: "center" 
				}}>
						<Text style={{ 
							color: COLORS.white, 
							fontStyle: "italic", 
							fontWeight: "bold", 
							fontSize: SIZES.large 
						}}>Quick Learnings</Text>
					</View>
					<View style={{
						flex: 2,
						height: 50,
						justifyContent: "center" 
					}}>
						<Pressable onPress={() => {
							setShowSignOut(!showSignOut);
							setDisableScreen(showSignOut);
						}}>
							<Text style={styles.userName}>
								{userName}
							</Text>
							<View style={{position: "absolute", top: 10, right: 5}}>
								<AntDesign name="caretdown" size={12} color="white"/> 
							</View>
						</Pressable>
					</View>
					<View style={{
						display: showSignOut ? "flex" : "none",
						position: "absolute",
						top: 40,
						right: 20,
						backgroundColor: "silver",
						width: 100,
						height: 40,
						borderRadius: 10,
						alignItems: "center",
						justifyContent: "center",
						}}>
						<Pressable onPress = {() => {
							signOut(auth)
								.then(() => {
									navigation.dispatch(
										navigation.reset({
											routes: [{name: "Login"}]
										})
									)
								});
							}}>
							<Text style={styles.signOutText}>Sign Out</Text>
						</Pressable>
					</View> 
				</View>
			</View>
			<View style={{
				display: disableScreen ? "none" : "flex",
				position: "absolute",
				backgroundColor: "black",
				width: 1000,
				height: 1500,
				top: 0,
				left: 0,
				zIndex: -1,
				opacity: 0.5
			}}>
				<Pressable onPress={() => {
					setShowSignOut(!showSignOut);
					setDisableScreen(showSignOut);
				}}>
					<View style={{height: "100%", width: "100%", color: "red"}}></View>
				</Pressable>

			</View>
		</View>
	)
}

export default HomeHeaderComp;

const styles = StyleSheet.create({
	userName: {
		color: COLORS.white, 
		fontWeight: "bold", 
		alignSelf: "flex-end", 
		fontSize: SIZES.large,
		zIndex: 10,
		paddingLeft: 10,
		paddingRight: 20,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: "white",
	},
	signOutText: {
		color: "white",
		fontSize: 16,
		padding: 6,
		zIndex: 10,
	}
})