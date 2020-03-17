import React from 'react';
import {Provider} from 'react-redux'
import store from './Redux/store' 
import SignUp from './Components/SignUp'
import SignIn from './Components/SignIn'
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <Provider store={store} >
    <View style={styles.container}>
      {/* <SignUp /> */}
      <SignIn />
    </View>
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
