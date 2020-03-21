import React from 'react'
import {connect} from 'react-redux'
import {Text, View, KeyboardAvoidingView, TextInput, StyleSheet, Button, TouchableOpacity, ScrollView, Platform} from 'react-native'
import { Logs } from 'expo'


const SignUp=(props)=>{

 return (
     
     <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset="3" stle={styles.all}>
       <ScrollView showsVerticalScrollIndicator={false}> 
          <Text style={styles.title}>Create Your WorkSpace</Text>
        <TextInput style={styles.txt} placeholder="Company" autoCapitalize = 'none' value={props.company} onChange={props.handleCompany}/>
        <TextInput style={styles.txt} placeholder="Email" autoCapitalize = 'none' value={props.email} onChange={props.handleEmail}/>
        <TextInput style={styles.txt} placeholder="First name" autoCapitalize = 'none' value={props.first_name} onChange={props.handleFirstName} />
        <TextInput style={styles.txt} placeholder="Last name" autoCapitalize = 'none' value={props.last_name} onChange={props.handleLastName} />
        <TextInput style={styles.txt} placeholder="User name" autoCapitalize = 'none' value={props.user_name} onChange={props.handleUserName} />
        <TextInput style={styles.txt} secureTextEntry placeholder="Password" name="password" value={props.password} onChange={props.handlePassword} />
       <Button title="Sign Up" onPress={props.handleSignUp} style={styles.submit} />
       <Text >You Do have an Account ? </Text>
       <TouchableOpacity>
           <Text onPress={props.handleDisplay} style={{color: '#d45d79', fontSize: 18}}> Log In</Text>
       </TouchableOpacity>
     </ScrollView > 
     </KeyboardAvoidingView>
   
    )
}

const styles= StyleSheet.create({
    txt: {
        borderBottomWidth: 1,
        width:300,
        padding: 20,
        marginBottom: 2
    },
    submit:{
        alignSelf: 'center',
        padding: 8,
    },
    title:{
        alignSelf: 'center',
        fontSize: Platform.OS === 'ios' ? 20: 16 ,
        color: 'grey',
        marginTop: Platform.OS === 'ios' ? 150 : 60
    }, 
    btn:{
        padding: 20
    },
    all:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
   },
})

const mps=(state)=>{
    return {
        first_name: state.first_name,
        last_name: state.last_name,
        user_name: state.user_name,
        password: state.password,
        email: state.email,
        company: state.company
    }
    }
const mpss=(dispatch)=>{
return {
    handleFirstName: (e)=>{   
        dispatch({
            type: "first_name",
            payload: {first_name: e.nativeEvent.text}
        })
    },
    handleLastName: (e)=>{   
        dispatch({
            type: "last_name",
            payload: {last_name: e.nativeEvent.text}
        })
    },
    handleUserName: (e)=>{   
        dispatch({
            type: "user_name",
            payload: {user_name: e.nativeEvent.text}
        })
    },
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
    handleDisplay:()=>{
        dispatch({type: 'displaylogin'})
    }
}
}

export default connect(mps,mpss)(SignUp)