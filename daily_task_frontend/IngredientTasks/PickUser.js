import React from 'react';
import { Text, View, TouchableOpacity,StyleSheet} from 'react-native';
import { EvilIcons} from "@expo/vector-icons";


const PickUser = () => {
    return (
        <TouchableOpacity style={styles.container}>
            <EvilIcons name='user' style={styles.icon}/>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    container:{
        width: 60,
        backgroundColor: '#dee3e2',
        marginHorizontal:2
    },
    icon:{
       fontSize: 43,
       paddingHorizontal: 8,
       paddingTop:4 ,
       color: '#8566aa'
    }
});

export default PickUser;
