import React,{useEffect} from 'react';
import { View, TextInput, StyleSheet, Keyboard,  TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import {Provider} from 'react-redux'
import {connect} from 'react-redux'

import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';

import store from './Redux/store' 
import ImageButtons from './OwnOrUser/ImageButtons'
import ParentComp from './Owner/ParentComp';
import LandingPg from './Components/LandingPg'
import ParentCompForUsers from './Users/ParentCompForUsers'
import UserTasks from './Components/UsersTasks'
import Feed from './Components/Feed'
import { render } from 'react-dom';


const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const Stack = createStackNavigator();
const BottomTap = createBottomTabNavigator();
const Drawer = createDrawerNavigator()




const App =(props)=> {
  
  // wait couple seconds before call store to avoid showing tab in first render
const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));
wait(3000).then(() =>  console.log(store.getState().tabvisible));
  console.log('app just render');
  

useEffect(()=>{

},[store.getState().tabvisible])

  const MainNavigations=()=>{
    return (
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        {/* <Stack.Screen name={'so'} component={ImageButtons} /> */}
        <Stack.Screen name='alltabs' children={BottomTaps} />
        {/* <Stack.Screen name="main" children={FullNavigation} /> */}
      </Stack.Navigator>
    )
  }

  const FullNavigation=({navigation})=>{
    return (
      <Stack.Navigator screenOptions={{
        headerShown: store.getState().tabvisible
      }}>
        <Stack.Screen name={' '} component={ImageButtons} />
        <Stack.Screen  name="ParentComp" component={ParentComp} 
        options={{title: 'Registration'}}
        />
        <Stack.Screen name="Home" component={LandingPg} />
        <Stack.Screen name='Users' component={ParentCompForUsers} />
        <Stack.Screen name='tasks' component={UserTasks} options={{title: "Tasks"}} />
      </Stack.Navigator>
    )
  }

  const MenuButton = (props) => (
    <View>
      <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}>
        <Ionicons name="md-menu" style={{color: 'grey', marginLeft:7, fontSize: 30, height: 24}}/>
      </TouchableOpacity>
    </View>
  );


  const DrawerComp=(props)=>{
    return(
    <Drawer.Navigator >
      <Drawer.Screen name='tabs' component={BottomTaps}/>
    </Drawer.Navigator>
    )
  }

  
  const BottomTaps=(props)=>{
    return (
    <BottomTap.Navigator screenOptions={{tabBarVisible: store.getState().tabvisible }}   >
      <BottomTap.Screen name=' ' children={FullNavigation}  />
      <BottomTap.Screen name='feed' component={Feed} />
    </BottomTap.Navigator>
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