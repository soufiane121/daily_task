import React from 'react'
import {Text, Keyboard, TouchableWithoutFeedback, StyleSheet, View, KeyboardAvoidingView} from 'react-native'
import {connect} from 'react-redux'
import UserSignUp from './UserSignUp'
import UserLogIn from './UserLogIn'


  
const ParentCompForUsers=(props)=>{

const handleSignUp=()=>{
    fetch(`http://${props.company}.lvh.me:3000/users`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            first_name: props.first_name,
            last_name: props.last_name,
            company: props.company,
            email: props.email,
            password: props.password
        })
    })
    .then(resp => resp.json())
    .then(data => console.log('daaata',data)
    )   
 }

 const handleLogIn=()=>{
    fetch(`http://${props.company}.lvh.me:3000/user_login`,{
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
    .then(data =>  console.log(data)
    
    //     {
    //     if (!data.hasOwnProperty("errors")) {
    //         props.handleCurrentUser(data)
    //         props.handleCurrentUserId(data.owner.id)
    //         saveDataToPhone(data.owner.id)
    //     } else {
    //         console.log("After Login",data);
    //         alert(data.errors)
    //     }
    //    }
    )
    .catch(function(error) {
        alert("Something went wrong");
        console.log(error);
      })
     
 }

    return (
        <View style={styles.container}>
            {props.displaylogin === false 
            ? 
            <UserSignUp handleSignUp={handleSignUp}/>
            :
            <UserLogIn handleLogIn={handleLogIn}/>
        }
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const mps=(state)=>{
return {
    first_name: state.first_name,
    last_name: state.last_name,
    password: state.password,
    email: state.email,
    company: state.company,
    displaylogin: state.displaylogin
}
}

export default connect(mps)(ParentCompForUsers);