import React  from 'react';
import { View, Text,StyleSheet,TextInput, Button, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';

 const DetailsTasks =(props) => {
//  console.log(props.route.params.objPass);
 

    return (
      <View style={styles.container}>
          <TouchableOpacity style={{borderWidth: 5, height: 99}}><Text>click here</Text></TouchableOpacity>
          <Collapsible collapsed={true}>
        <Text> DetailsTasks </Text>
        <TextInput placeholder='HERE' onFocus={()=> console.log('it works')}/>
        </Collapsible>
      </View>
    );

}

export default DetailsTasks

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#f4f4f4'
    }
});