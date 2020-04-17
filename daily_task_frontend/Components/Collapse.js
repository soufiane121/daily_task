import React, { useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import Collapsible from 'react-native-collapsible';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux'



const Collapse = (props) => {
  let DATA = [...props.fullObj.recipe.ingredients]



  _AllIngredients = () => {

    return DATA.map(ele => {
      return (
        <View key={ele.ingredientName.length + Math.random()}>
            <Animatable.Text style={{ fontSize: 17, padding: -6, marginTop: 20, marginLeft: 5 }}
              animation='bounceIn'
              easing='ease'
              delay={1000}
            >
              {ele.ingredientName}</Animatable.Text>
        </View>
      )
    })

  }

  return (
    <Collapsible collapsed={!props.selected} expandMultiple={false} >
      <_AllIngredients />
    </Collapsible>
  )

}

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
