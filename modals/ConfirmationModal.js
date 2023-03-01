import { View, Text, Modal, Button } from 'react-native';
import React from 'react';
import { COLORS } from "../constants";
import { RectButton } from '../components/Button';

const ConfirmationModal = (props) => {
  const warningData = props.warningData;
  const confirmationHandle = props.confirmationHandle;
  const showConfirmationModal = props.showConfirmationModal;
  const setShowConfirmationModal = props.setShowConfirmationModal;

  return (
    <Modal
		animationType="slide"
		transparent={true}
		visible={showConfirmationModal}
		onRequestClose={() => {
		setShowConfirmationModal(!showConfirmationModal);
		}}>
            
			<View style={{
				flexDirection:"row",
				justifyContent:"center",
				alignSelf:"center",
				marginTop:"40%",
				borderRadius:25,
				borderColor: "white",
				borderWidth: 1,
				backgroundColor:COLORS.primary,
				width:"80%",
				height:"30%",
				opacity:1
			}}>
				<View style={{
					flex:1,
					flexDirection:"column",
					justifyContent:"space-between",
					width:"100%",
					alignItems:"center",
				}}>
					<Text style={{
						marginTop: 10,
						fontWeight: "bold",
						padding: 5,
						width:"90%",
						color: "red",
						borderBottomWidth: 2,
						textAlign: "center",
						borderColor: "white",
						textShadowColor:"white",
    					textShadowRadius:2
					}}>{warningData.title}</Text>

					<Text style={{
						fontWeight: "bold",
						padding: 5,
						color: COLORS.white,
					}}>{warningData.body}</Text>
					
					<View style={{
						width:'90%',
						paddingLeft: "10%",
						paddingRight: "10%",
						paddingTop: 10,
						margin: 20,
						flexDirection:"row",
						justifyContent:"space-between",
						borderTopWidth: 2,
						borderColor: "white",
					}}>
						<Button 
							title='Cancel'
							onPress={() => {
								setShowConfirmationModal(!showConfirmationModal);
							}}
						/>

						<Button 
							color={"red"}
							title='DELETE'
							onPress={() => {
								setShowConfirmationModal(!showConfirmationModal);
								confirmationHandle();
							}}
						/>
					</View>
				</View>
			</View>
        </Modal>
  )
}

export default ConfirmationModal