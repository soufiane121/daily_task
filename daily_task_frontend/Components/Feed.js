import React from 'react'
import {View, AsyncStorage, StyleSheet, Platform} from 'react-native'
import {connect} from 'react-redux'
import { AntDesign } from '@expo/vector-icons';
import { Overlay,Text, Button } from 'react-native-elements';
import Popup from './OverLayy'



const Feed=(props)=>{
    console.log('current user', props.currentUser);
    


 const handleSendContent=()=>{
     console.log(props.FeedContent);
     
 }

    // const Logout= async ()=>{
    // try {
    //      let value = await AsyncStorage.removeItem('owner_id');
    //      props.handleTabps()
    //      props.navigation.replace('alltabs')
    //     return true;
    //     } catch (error) {
    //         alert('Did not clear storage')
    //         console.log(error);
    //     }
    // }



    return (
    <View style={styles.all}>
        <Text style={styles.txt}>Heelo</Text>
        <Popup handleSendContent={handleSendContent}/>  
        <Button style={styles.btn} icon={ <AntDesign name="pluscircle" size={Platform.OS === 'ios' ? 70 : 60} style={styles.icon} />}
            type="clear"
            onPress={props.handleOverlay} 
                />
    </View>
    )
}

const styles = StyleSheet.create({
    all: {
        flex: 1,
        // borderWidth: 9,
        // margin: 5
    },
    icon :{
        color: '#721b65',
        opacity: 0.8,
        width: 86,
        marginLeft: Platform.OS === 'android' ? '82%' : '5%',
        marginTop: Platform.OS === 'ios' ? '310%' : '40%'

    },
    txt: {
       marginTop: '40%',
       borderColor: 'red',
       borderWidth: 4,
       padding: '40%',
       alignSelf: 'center'
    }, 
    btn:{
    width: 70,
    marginLeft: Platform.OS === 'android' ? 80 : '81%',
 
    }
})

const mps=(state)=>{
return{
    FeedContent: state.FeedConten,
    currentUser: state.currentUser
}
}

const mpss=(dispatch)=>{
    return {
        handleTabps: () =>{
            dispatch({type: "tabvisible"})
        },
        handleOverlay:()=>{
            dispatch({type: 'overLay'})
        },
        handleContent:()=>{
            dispatch({
              type: 'FeedContent',
              playload: {FeedContent: e}
          })
          }
    }
}

export default connect(mps, mpss)(Feed);


{/* <AntDesign name='pluscircleo' size={70}/> */}