import React from 'react';
import { Text, View, SafeAreaView, AsyncStorage, Button } from 'react-native';
import {connect} from 'react-redux'
import { State } from 'react-native-gesture-handler/GestureHandler';
import { useNavigation } from '@react-navigation/native';
import * as Updates from 'expo-updates';

let key = ''
const LogOout =  (props) => {
    const navigation = useNavigation();
    props.handleTabVisible()

    const somethong= async()=>{
        if (props.currentUser.hasOwnProperty("owner")) {
            key = 'owner_id'
        } else {
            key =  'user_id'
        }
         await AsyncStorage.removeItem(key)
        // let ss = await AsyncStorage.getAllKeys()
        // console.log(props.navigation.replace('Home'));
       await Updates.reloadAsync()
        navigation.navigate("first")
        return; 
    }

    return (
    <SafeAreaView >
        <Button title="log out" onPress={somethong}/>
    </SafeAreaView>
);
    }

const mps=(state)=>{
    return {
        currentUser: state.currentUser
    }
}

const mpss=(dispatch)=>{
    return {
        handleTabVisible:()=>{
            dispatch({type: 'tabvisible'})
        }
    }
}

export default connect(mps,mpss)(LogOout);
