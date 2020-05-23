import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ShadowPropTypesIOS } from 'react-native';
import { EvilIcons } from "@expo/vector-icons";
import UsersList from './UsersList'


const PickUser = (props) => {
    const [display, setDisplay] = useState(false)
    const [disIcon, setDisIcon] = useState(true)
    const [fLname, setFLname] = useState('')



    const renderUsersList = () => {
        setDisplay(!display)
    }
    
    const getUserName = () => {
        
      if ( props.elementUser.first_name !== undefined && !fLname ) {
            return (
                <View style={{ height: 36, borderRadius: 50, width: 36, backgroundColor: '#d7385e', marginLeft: 11, marginTop: 3 }}>
                    <Text style={{ color: 'white', marginHorizontal: 6, position: 'relative', marginVertical: 6, fontSize: 18, fontWeight: '500' }}>
                        {props.elementUser?.first_name[0].toUpperCase() + props.elementUser?.last_name[0].toUpperCase()}

                    </Text>
                </View>
            )
        } else if (fLname ) {
        props.fetchUserInfo(fLname)
            return (<View style={{ height: 36, borderRadius: 50, width: 36, backgroundColor: '#d7385e', marginLeft: 11, marginTop: 3 }}>
                    <Text style={{ color: 'white', marginHorizontal: 6, position: 'relative', marginVertical: 6, fontSize: 18, fontWeight: '500' }}>
                    {fLname.first_name[0].toUpperCase() + fLname.last_name[0].toUpperCase()}
                    </Text>
                </View>)
        }else if(fLname.length === 0 && props.elementUser.first_name === null){
            return <EvilIcons name='user' style={styles.icon} />
        }
    }

    return (
        <>
            <TouchableOpacity style={styles.container} onPress={renderUsersList}>
                {getUserName()}
            </TouchableOpacity>
            {display && <UsersList setDisplay={setDisplay} display={display} setFLname={setFLname} setDisIcon={setDisIcon} />}
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
