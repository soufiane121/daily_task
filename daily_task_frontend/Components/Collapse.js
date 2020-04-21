import React from 'react';
import { Text, View, StyleSheet,Keyboard, ScrollView } from 'react-native';
import Collapsible from 'react-native-collapsible';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux'
import ScrollList from './ScrollList'
import Status from '../IngredientTasks/Status'



let colors = ['#8f71ff', '#13abc4', '#1e2a78', '#ff9f68', '#355c7d']
let fontColor = ['#4a304d', '#001f52', '#360982', '#160f30']
const Collapse = (props) => {
  let DATA = [...props.fullObj.recipe.ingredients]

  _AllIngredients = () => {
    return DATA.map((ele, index) => {
      console.log(ele);
      
      return (
        <View key={ele.ingredientName.length + Math.random()} style={{ flexDirection: 'row' }} >
          <View style={styles.itembox}>
            <Animatable.Text style={styles.txtitem}
              animation='bounceIn'
              easing='ease'
              delay={1000}
            >
              {ele.ingredientName}</Animatable.Text>
              <View style={{width: 300,}}>
                <ScrollView horizontal={true} scrollEnabled={true} showsHorizontalScrollIndicator={false}>
                  <Status elementStatus={ele.status}/>
                  <Status />
                  <Status />
                  <Status />
                  <Status />
                  <Status />
                  <Status />
                  <Status />
                </ScrollView>
              </View>
          </View>
          {/* <ScrollList objcId={props.fullObj.id} index={index}/> */}
        </View>
      )
    })

  }

  return (
    <Collapsible collapsed={!props.selected} expandMultiple={false} style={{ flex: 1 }} >
      <_AllIngredients />
    </Collapsible>
  )

}

const styles = StyleSheet.create({
  itembox: {
    marginVertical: 3,
    borderLeftColor: colors[Math.floor(Math.random() * colors.length - 1)],
    borderLeftWidth: 3,
    marginLeft: 5,
    width: 180,
    flexDirection: 'row',

  },
  txtitem: {
    fontSize: 16,
    padding: 13,
    backgroundColor: '#dee3e2',
    fontWeight: '500',
    color: fontColor[Math.floor(Math.random() * fontColor.length - 1)],
    width: 120
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
