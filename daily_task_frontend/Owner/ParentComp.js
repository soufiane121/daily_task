import React, {useEffect} from 'react'
import {Text, StyleSheet,View} from 'react-native'
import {connect} from 'react-redux'
import {AsyncStorage} from 'react-native'
import * as Updates from 'expo-updates';


import SignIn from './SignIn'
import SignUp from './SignUp'

const ParentComp=(props)=>{

// send post request to create new Owner with subdomain
 const handleSignUp= async ()=>{
 fetch(`http://lvh.me:3000/owners`,{
    method: 'POST',
    headers:{
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
    body: JSON.stringify({
        first_name: props.first_name,
        last_name: props.last_name,
        user_name: props.user_name,
        subdomain: props.company,
        email: props.email,
        password: props.password,
    })
})
.then(resp => resp.json())
.then(data => {
    if (!data.hasOwnProperty("errors")) {
        props.handleCurrentUser(data)
        props.handleTabps()
        props.handleCurrentUserId(data.owner.id)
        saveDataToPhone(data)
         Updates.reloadAsync()

    } else {
        console.log("After sign up",data);
        alert(data.errors)
    }
   } )
   .catch(function(error) {
    alert("Something went wrong");
    console.log(error);
  })
 }

//  fetching data for login 
 const handleSignIn=()=>{
    fetch(`http://${props.company}.lvh.me:3000/login`,{
        method: 'POST',
        headers:{
           'Content-Type': 'application/json',
           Accept: 'application/json'
       },
       body: JSON.stringify({
           company: props.company,
           email: props.email,
           password: props.password
       })
    })
    .then(resp => resp.json())
    .then(data => {
        if (!data.hasOwnProperty("errors")) {
            props.handleCurrentUser(data)
            props.handleTabps()
            props.handleCurrentUserId(data.owner.id)
            saveDataToPhone(data)
        //   props.navigation.replace("Home")
         Updates.reloadAsync()
        } else {
            alert(data.errors)
        }
       }
    )
    .catch(function(error) {
        alert("Something went wrong");
        console.log(error);
      })
}

//  save Owner id to storage phone
 const saveDataToPhone=(data)=>{
    // let num  = id
    // let str  = num.toString()
    AsyncStorage.setItem("company_name", data.owner.subdomain)
    AsyncStorage.setItem("owner_id", data.token)
}

// fetching auto login base on localstage
 useEffect(()=>{
    fetchAutoLogin()
  },[props.handleCurrentUserId]) 


const fetchAutoLogin = async () => {
   
    try {
       value = await AsyncStorage.getItem('owner_id');
      subdomain = await AsyncStorage.getItem('company_name');
      if (value !== null && subdomain !== null) {
        fetch(`http://${subdomain}.lvh.me:3000/owner_auto_login`,{
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': value
          }
        })
        .then(resp=> resp.json())
        .then(data=> {
          props.handleCurrentUser(data)
          props.handleCurrentUserId(data.owner.id)
          props.navigation.replace("Home",{subdomain: data.owner.subdomain})
        })

      }
    } catch (error) {
      alert("something went wrong")
      console.log(error);
    }
  }


    return (
        <View style={styles.container}>
        { props.displaylogin === true  
         ? 
         <SignIn handleSignIn={handleSignIn}/>
        :
        <SignUp handleSignUp={handleSignUp}/>
        }
        </View>
    )
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})
const mps=(state)=>{
    return {
        first_name: state.first_name,
        last_name: state.last_name,
        user_name: state.user_name,
        password: state.password,
        email: state.email,
        company: state.company,
        currentUser: state.currentUser,
        displaylogin: state.displaylogin,
        currentUserId: state.currentuserid
    }
    }

const mpds=(dispatch)=>{

    return {
        handleCurrentUser:(e)=>{
            dispatch({
                type: "current",
                payload: {currentUser: e}
            })
        },
        handleCurrentUserId:(e)=>{
            dispatch({
                type: 'currentuserid',
                playload: {currentuserid: e}
            })
        },
        handleTabps: () =>{
            dispatch({type: "tabvisible"})
        }
    }
}

export default connect(mps,mpds)(ParentComp);