import React from 'react'
import {Text, StyleSheet,View} from 'react-native'
import {connect} from 'react-redux'


import SignIn from './SignIn'
import SignUp from './SignUp'

const ParentComp=(props)=>{


 const handleSignUp=()=>{
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
.then(data => console.log('daaata',data)   )
    
 }
 const handleSignIn=()=>{
    fetch(`http://lvh.me:3000/login`,{
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
        } else {
            console.log("hahaha",data);
        }
       }
    )
    .catch(function(error) {
        alert("Something went wrong");
        console.log(error);
      })
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
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
        displaylogin: state.displaylogin
    }
    }

const mpds=(dispatch)=>{

    return {
        handleCurrentUser:(e)=>{
            dispatch({
                type: "current",
                payload: {currentUser: e}
            })
        }
    }
}

export default connect(mps,mpds)(ParentComp);