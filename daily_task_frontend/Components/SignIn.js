import React from "react";
import {TextInput,Button,StyleSheet} from 'react-native'
import {connect} from 'react-redux'



const SignIn=(props)=>{

    const handleSubmit=()=>{
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
        .then(data => console.log('daaata',data)
        )
        
    }

  return(
    <>
        <TextInput style={styles.txt} placeholder="Company" autoCapitalize = 'none' value={props.company} onChange={props.handleCompany}/>
        <TextInput style={styles.txt} placeholder="Email" autoCapitalize = 'none' value={props.email} onChange={props.handleEmail}/>
        <TextInput style={styles.txt} secureTextEntry placeholder="Password" name="password" value={props.password} onChange={props.handlePassword} />
        <Button title='Submit' onPress={handleSubmit}/>
    </>
   )
}

const styles= StyleSheet.create({
    txt: {
        borderBottomWidth: 2,
        width:200,
        padding: 10
    }
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
}
}

export default connect(mps, mpss)(SignIn);
