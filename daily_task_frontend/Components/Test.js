import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Test extends Component {

 fetching= async ()=>{
   let result= await this.second()
   console.log(result);
 }

 second= async ()=>{
     let arr = []
     await fetch('https://pokeapi.co/api/v2/pokemon/ditto/')
     .then(resp=> resp.json())
     .then(data=> arr = data.abilities)
     return arr
 }

  render() {
    return (
      <View>
        <Text> Test </Text>
      </View>
    );
  }
}

export default Test;
