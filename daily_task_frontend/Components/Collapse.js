import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import Collapsible from 'react-native-collapsible';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux'
import Constants from 'expo-constants';
import ScrollList from './ScrollList'


 let colors = ['#8f71ff', '#13abc4', '#1e2a78', '#ff9f68', '#355c7d']
 let fontColor= ['#4a304d', '#001f52','#360982', '#160f30']
const Collapse = (props) => {
  let DATA = [...props.fullObj.recipe.ingredients]

  _AllIngredients = () => {
    return DATA.map(ele => {
      return (
        <View key={ele.ingredientName.length + Math.random()} style={{flex: 1}} >
          <View style={styles.itembox}>
          <Animatable.Text style={styles.txtitem}
            animation='bounceIn'
            easing='ease'
            delay={1000}
          >
            {ele.ingredientName}</Animatable.Text>
            </View>
            <View style={{flex: 1}}>
            <ScrollList />
            </View>
        </View>
      )
    })

  }

  return (
    <Collapsible collapsed={!props.selected} expandMultiple={false} style={{flex: 1}} >
      <_AllIngredients />
    </Collapsible>
  )

}

const styles = StyleSheet.create({
  itembox:{
    marginVertical: 3,
    borderLeftColor: colors[Math.floor(Math.random() * colors.length-1)],
    borderLeftWidth:3,
    marginLeft:5,
    width: 140,
    flex:1
  },
  txtitem:{
   fontSize: 16, 
   padding: 7, 
  backgroundColor: '#dee3e2',
  fontWeight: '500',
  color: fontColor[Math.floor(Math.random() * fontColor.length-1)],
  }
});

const mps = state => {
  return {
    currentUser: state.currentUser,
    loadingPg: state.loadingPg,
  };
};

const mpss = dispatch => {
  return {
    handleCurrentUser: e => {
      dispatch({
        type: "current",
        payload: { currentUser: e }
      });
    },
  }
}

export default connect(mps, mpss)(Collapse);
