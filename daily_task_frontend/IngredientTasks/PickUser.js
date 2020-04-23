import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { EvilIcons } from "@expo/vector-icons";
import UsersList from './UsersList'


const PickUser = () => {
    const [display, setDisplay] = useState(false)
    const [disIcon, setDisIcon]= useState(true)
    const [fLname, setFLname]= useState('')

    const renderUsersList = () => {
        
        setDisplay(!display)
    }

    const getUserName=()=>{
        
        return (
        <View style={{height: 36,borderRadius: 50, width: 36, backgroundColor: '#d7385e', marginLeft:11, marginTop: 3}}>
            <Text style={{color: 'white', marginHorizontal:6 , position: 'relative', marginVertical: 6, fontSize: 18, fontWeight: '500'}}
            >{fLname}</Text>
        </View>
        )
    }

    return (
        <>
            <TouchableOpacity style={styles.container} onPress={renderUsersList}>
                {disIcon ? 
                <EvilIcons name='user' style={styles.icon} />
                :
                (getUserName())

}
            </TouchableOpacity>
            {display && <UsersList setDisplay={setDisplay} display={display} setFLname={setFLname} setDisIcon={setDisIcon}/>}
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        width: 60,
        backgroundColor: '#dee3e2',
        marginHorizontal: 2
    },
    icon: {
        fontSize: 43,
        paddingHorizontal: 8,
        paddingTop: 4,
        color: '#8566aa'
    }
});

export default PickUser;
