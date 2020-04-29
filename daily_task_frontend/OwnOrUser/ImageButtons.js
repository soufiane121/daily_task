import React, {useEffect} from 'react'
import {Text,View, StyleSheet, TouchableOpacity, Platform, AsyncStorage} from 'react-native'
import { Entypo, FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
import {connect} from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import ScrollList from '../Components/ScrollList'

const ImageButtons=(props)=>{

    const navigation = useNavigation();

    // function to navigate to company login form
    const handleGroupTeamButton= async ()=>{
        props.handleFetch()
        props.handleshowSwipeButtons()
        try {
        let async = await AsyncStorage.getItem('owner_id')
            if (async !== null) {
                props.handleTabps()
                props.handleDisplayAdmin()
                navigation.replace('ParentComp')     
            } else {
                navigation.replace('ParentComp')
            }
        } catch (error) {
           alert('Something went wrong with connection') 
           console.log(error)
        }
    }

    // function to navigate to user form 
    const handleUserButton= async ()=>{
        props.handleShowButton(false)
        try {
            let async = await AsyncStorage.getItem('user_id')
                if (async !== null) {
                    props.handleTabps()
                    navigation.replace('Users')     
                } else {
                    navigation.replace('Users')     
                    
                }
            } catch (error) {
               alert('Something went wrong with connection') 
               console.log(error)
            }
        // props.handleTabps()
        // navigation.replace('Users')     
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

    // return <ScrollList />
}

const styles= StyleSheet.create({
    groupIcon: {
        color: 'grey',
        margin: 70,
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
    tabvisible: state.tabvisible,
}
}

const mpss=(dispatch)=>{
    return {
        handleTabps: () =>{
            dispatch({type: "tabvisible"})
        },
        handleShowButton:(e)=>{
            dispatch({
                type: 'showButton',
                playload: {showButton: e}
            })
        },
        handleFetch: (e) => {
            dispatch({ type: "feedFetch"  });
          },
          handleshowSwipeButtons:()=>{
              dispatch({type: 'showSwipeButtons'})
          },
          handleDisplayAdmin:()=>{
              dispatch({type: 'displayAdmin'})
          }
    }
}

export default connect(mps, mpss)(ImageButtons);