import React from "react";
import {TextInput,Button,StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Text, KeyboardAvoidingView, Platform} from 'react-native'

import {connect} from 'react-redux'
import DismissKeyboardView from '../Components/DismissKeyboardView'


const SignIn=(props)=>{
console.log('props;;', props.displaylogin);


  return(
    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset="3" style={styles.all}>

        <Text style={styles.container}>Sign In </Text>
        <TextInput style={styles.txt} placeholder="Company" autoCapitalize = 'none' value={props.company} onChange={props.handleCompany}/>
        <TextInput style={styles.txt} placeholder="Email" autoCapitalize = 'none' value={props.email} onChange={props.handleEmail}/>
        <TextInput style={styles.txt} secureTextEntry placeholder="Password" name="password" value={props.password} onChange={props.handlePassword} />
        <Text >You don't have an account?</Text>
        <TouchableOpacity>
            <Text onPress={props.handleDisplay} style={styles.spn}>register</Text>
        </TouchableOpacity>

        <Button title="submit" onPress={props.handleSignIn} style={styles.btn}/>
  </KeyboardAvoidingView>
  )
}

const styles= StyleSheet.create({
    txt: {
        borderBottomWidth: 1,
        width:300,
        padding: 20
    },
    container:{
        color: 'grey',
        fontSize: 29,
        alignSelf: 'center'
    },
    all:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
   },
   spn: {
       color: '#d45d79',
       fontSize: 18
   },
   btn: {
    color: 'red',
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
        displaylogin: state.displaylogin
    }
    }
const mpss=(dispatch)=>{
return {
   
    handleCompany: (e)=>{   
        dispatch({
            type: "company",
            payload: {company: e.nativeEvent.text}
        })
    },
    handlePassword: (e)=>{   
        dispatch({
            type: "password",
            payload: {password: e.nativeEvent.text}
        })
    },
    handleEmail: (e)=>{   
        dispatch({
            type: "email",
            payload: {email: e.nativeEvent.text}
        })
    },
    handleDisplay: () =>{
        dispatch({type: 'displaylogin'})
    }
}
}

export default connect(mps, mpss)(SignIn);
