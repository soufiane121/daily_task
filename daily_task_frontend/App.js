import React from 'react';
import { View, TextInput, StyleSheet, Keyboard,  TouchableWithoutFeedback } from 'react-native';
import {Provider} from 'react-redux'

import store from './Redux/store' 
import ImageButtons from './OwnOrUser/ImageButtons'
import ParentComp from './Owner/ParentComp';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingPg from './Components/LandingPg'
import ParentCompForUsers from './Users/ParentCompForUsers'




const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const Stack = createStackNavigator();

 const App =()=> {

  const MainNavigations=()=>{
    return (
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="main" children={FullNavigation} />
      </Stack.Navigator>
    )
  }

  const FullNavigation=()=>{
    return (
      <Stack.Navigator>
        <Stack.Screen name={' '} component={ImageButtons} />
        <Stack.Screen  name="ParentComp" component={ParentComp} 
        options={{title: 'Registration'}}
        />
        <Stack.Screen name="Home" component={LandingPg} />
        <Stack.Screen name='Users' component={ParentCompForUsers} />
      </Stack.Navigator>
    )
  }

  return (
  
    <Provider store={store} >
    <DismissKeyboard>
    <NavigationContainer>
     {MainNavigations()}
    </NavigationContainer>
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