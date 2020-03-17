import React from 'react'
import {connect} from 'react-redux'
import {View, TextInput, StyleSheet, Button} from 'react-native'

const SignUp=(props)=>{

 const handleSubmit=()=>{
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
            company: props.company,
            email: props.email,
            password: props.password
        })
     })
     .then(resp => resp.json())
     .then(data => console.log('daaata',data)
     )
        
    }

 return (
    <View>
        <TextInput style={styles.txt} placeholder="Company" autoCapitalize = 'none' value={props.company} onChange={props.handleCompany}/>
        <TextInput style={styles.txt} placeholder="Email" autoCapitalize = 'none' value={props.email} onChange={props.handleEmail}/>
        <TextInput style={styles.txt} placeholder="First name" autoCapitalize = 'none' value={props.first_name} onChange={props.handleFirstName} />
        <TextInput style={styles.txt} placeholder="Last name" autoCapitalize = 'none' value={props.last_name} onChange={props.handleLastName} />
        <TextInput style={styles.txt} placeholder="User name" autoCapitalize = 'none' value={props.user_name} onChange={props.handleUserName} />
        <TextInput style={styles.txt} secureTextEntry placeholder="Password" name="password" value={props.password} onChange={props.handlePassword} />
        <Button title='Submit' onPress={handleSubmit}/>
    </View>
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
}
}

export default connect(mps,mpss)(SignUp)