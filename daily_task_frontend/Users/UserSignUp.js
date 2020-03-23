import React from 'react'
import {connect} from 'react-redux'
import {Text, TextInput, StyleSheet, Button, ScrollView, 
    KeyboardAvoidingView, Platform,TouchableOpacity, View, Keyboard, TouchableWithoutFeedback
} from 'react-native'

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

const UserSignUp=(props)=>{

 

 return (
     <DismissKeyboard>
     <KeyboardAvoidingView behavior='padding' enabled keyboardVerticalOffset="3" style={styles.container}>
            {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <Text style={styles.title}>Sign Up</Text>
        <TextInput style={styles.txt} placeholder="Company" autoCapitalize = 'none' value={props.company} onChange={props.handleCompany}/>
        <TextInput style={styles.txt} placeholder="Email" autoCapitalize = 'none' value={props.email} onChange={props.handleEmail}/>
        <TextInput style={styles.txt} placeholder="First name" autoCapitalize = 'none' value={props.first_name} onChange={props.handleFirstName} />
        <TextInput style={styles.txt} placeholder="Last name" autoCapitalize = 'none' value={props.last_name} onChange={props.handleLastName} />
        <TextInput style={styles.txt} secureTextEntry placeholder="Password" name="password" value={props.password} onChange={props.handlePassword} />
        <Button title='Sign Up' onPress={props.handleSignUp} style={styles.btn}/>
        <Text style={{fontSize: 16}}>You Do have an Account ?</Text>
       <TouchableOpacity onPress={props.handleDisplay}>
           <Text style={styles.txt2}> Log In</Text>
       </TouchableOpacity>
         {/* </ScrollView> */}
    </KeyboardAvoidingView>
    </DismissKeyboard>
    
    )
}

const styles= StyleSheet.create({
    txt: {
        borderBottomWidth: 2,
        width:300,
        padding: 20
    },
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn:{
        marginBottom: 420
    },
    title: {
        alignSelf: 'center',
        fontSize: Platform.OS === 'ios' ? 23: 19 ,
        color: 'grey',
        // marginTop: Platform.OS === 'ios' ? 130 : 60
    },
    txt2: {
        alignSelf: 'center',
        color: 'skyblue',
        fontSize: Platform.OS === 'ios' ? 22 : 17
    }
})

const mps=(state)=>{
    return {
        first_name: state.first_name,
        last_name: state.last_name,
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

export default connect(mps,mpss)(UserSignUp)