import { Text, View, Image, TextInput } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";



const HomeHeaderComp = (props) => {
	const userName = props.userName;
	return (
		<View style={{
			backgroundColor: COLORS.primary,
			padding: 14,
			color: COLORS.white,
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
						width: "50%", 
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
						maxWidth: "50%",
						height: 50,
						justifyContent: "center" 
					}}>
						<Text style={{ 
							color: COLORS.white, 
							fontWeight: "bold", 
							alignContent: "flex-end", 
							fontSize: SIZES.large 
						}}>{userName}</Text>
					</View>
				</View>
			</View>
		</View>
	)
}

export default HomeHeaderComp;