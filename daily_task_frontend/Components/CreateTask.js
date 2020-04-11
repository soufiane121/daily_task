// import React, { useState } from 'react'
// import { Text, TextInput, View, StyleSheet, Button, TouchableOpacity } from 'react-native'
// import { SimpleLineIcons, EvilIcons } from "@expo/vector-icons";
// import { Overlay, Input } from "react-native-elements";
// import { connect } from 'react-redux'


// const CreateTask = (props) => {

//   console.log(props);

//   const onClose = () => {
//     props.handleOverlay()
//   };

//   return (
//     <View style={styles.conatiner}>
//       <Overlay
//         isVisible={props.overLay}
//         onBackdropPress={() => onClose()}
//         height={"18%"}
//         width={"77%"}
//         borderRadius={6}
//         overlayBackgroundColor="#f1f3f4"
//       >
//         <Text style={styles.txt}>CreateTask</Text>
//         <Input placeholder='Task Name' inputStyle={{ marginTop: 20, }} value={props.createTask} onChangeText={props.handleCreateTask}
//           leftIcon={<EvilIcons name='paperclip' style={styles.icon2} />} placeholderTextColor='#8ec6c5'
//         />
//         <Button title='Create' onPress={props.handleCreateTask} />
//       </Overlay>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   conatiner: {
//     flex: 1,
//     // backgroundColor: '#f3f3f3'
//   },
//   icon2: {
//     fontSize: 30,
//     marginLeft: -30,
//     padding: 4,
//     marginTop: 15,
//     color: '#4d4c7d'
//   },
//   touch: {
//     backgroundColor: '#309fff',
//     marginTop: '150%',
//     marginLeft: '80%',
//     height: 65,
//     zIndex: 0,
//     width: 65,
//     borderRadius: 60
//   },

//   txt: {
//     alignSelf: 'center',
//     fontSize: 20,
//   },


// })


// const mps = state => {
//   return {
//     overLay: state.overLay,
//     createTask: state.createTask
//   };
// };

// const mpss = dispatch => {
//   return {
//     handleOverlay: () => {
//       dispatch({ type: "overLay" });
//     },
//     handleCreateTask: (e) => {
//       dispatch({
//         type: 'createTask',
//         playload: { createTask: e }
//       })
//     }
//   };
// };


// export default connect(mps, mpss)(CreateTask)