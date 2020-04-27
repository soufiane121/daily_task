import React from 'react';
import { Text, View, SafeAreaView, AsyncStorage, Button } from 'react-native';
import {connect} from 'react-redux'
import { State } from 'react-native-gesture-handler/GestureHandler';
let key = ''
const LogOout =  (props) => {

    const somethong= async()=>{
        if (props.currentUser.hasOwnProperty("owner")) {
            key = 'owner_id'
        } else {
            key =  'user_id'
        }
         await AsyncStorage.removeItem(key)
        let ss = await AsyncStorage.getAllKeys()
        console.log(ss);
        return; 
    }
    return (
    <SafeAreaView>
        <Text>loog buttom</Text>
        <Button title="log out" onPress={somethong}/>
    </SafeAreaView>
);
    }

const mps=(state)=>{
    return {
        currentUser: state.currentUser
    }
}

export default connect(mps)(LogOout);
