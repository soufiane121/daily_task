import React, {useEffect} from 'react'
import {Text,View, StyleSheet, TouchableOpacity, Platform} from 'react-native'
import { Entypo, FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
import {connect} from 'react-redux'
import { useNavigation } from '@react-navigation/native';


const ImageButtons=(props)=>{

    const navigation = useNavigation();

    // function to navigate to company login form
    const handleGroupTeamButton=()=>{
        props.handleTabps()
        navigation.replace('ParentComp')     
    }

    // function to navigate to user form 
    const handleUserButton=()=>{
        props.handleTabps()
        navigation.replace('Users')     
    }

  
    
    return (
        
        <>
        <TouchableOpacity style={styles.container} onPress={handleGroupTeamButton}>
        <MaterialCommunityIcons name="account-group" style={styles.groupIcon}/>
        <Text style={styles.text}>Create Team Group</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleUserButton}>
        <Entypo  name="users" style={styles.userIcon}/>
        <Text style={styles.text}>Users Login for group</Text>
        </TouchableOpacity>
        </>
    )
}

const styles= StyleSheet.create({
    groupIcon: {
        color: 'grey',
        margin: 30,
        fontSize: Platform.OS === 'android' ? 130 : 160
    },
    container:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        fontSize: Platform.OS === 'android' ? 20 : 22,
        fontWeight: '400',
        alignSelf: 'center'
    },
    userIcon:{
        fontSize: Platform.OS === 'android' ? 120 : 160,
        alignSelf: 'center',
        margin: 70,
        color: 'grey'
    }
})

const mps=(state)=>{
return {
    tabvisible: state.tabvisible
}
}

const mpss=(dispatch)=>{
    return {
        handleTabps: () =>{
            dispatch({type: "tabvisible"})
        }
    }
}

export default connect(mps, mpss)(ImageButtons);