import React from 'react'
import {Text, KeyboardAvoidingView, TextInput,Button, StyleSheet, TouchableOpacity, Keyboard, TouchableWithoutFeedback} from 'react-native'
import {connect} from 'react-redux'

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

  
const UserLogIn=(props)=>{

    return (
    <DismissKeyboard>
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset="3" style={styles.all}>
        <Text style={styles.container}>Sign In </Text>
        <TextInput style={styles.txt} placeholder="Company" autoCapitalize = 'none' value={props.company} onChange={props.handleCompany}/>
        <TextInput style={styles.txt} placeholder="Email" autoCapitalize = 'none' value={props.email} onChange={props.handleEmail}/>
        <TextInput style={styles.txt} secureTextEntry placeholder="Password" name="password" value={props.password} onChange={props.handlePassword} />
        <Button title="Log in" onPress={props.handleLogIn} style={styles.btn}/>
        <Text style={{fontSize: 20}}>You don't have an account?</Text>
        <TouchableOpacity>
         <Text onPress={props.handleDisplay} style={styles.spn}>register</Text>
        </TouchableOpacity>
    </KeyboardAvoidingView>
    </DismissKeyboard>
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
        alignSelf: 'center',
        paddingBottom: 10
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
    marginBottom: 420,
   width: '100%'
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
export default connect(mps,mpss)(UserLogIn)