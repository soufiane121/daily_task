import React from 'react';
import { View, TextInput, StyleSheet, Keyboard,  TouchableWithoutFeedback } from 'react-native';
import {Provider} from 'react-redux'
import store from './Redux/store' 
import UserSignUp from './Components/UserSignUp'
import ParentComp from './Owner/ParentComp';


const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

 const App =()=> {

  return (
    <Provider store={store} >
    <DismissKeyboard>
    <View style={styles.container}>
      <ParentComp />
      {/* <UserSignUp /> */}
    </View>
    </DismissKeyboard>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App