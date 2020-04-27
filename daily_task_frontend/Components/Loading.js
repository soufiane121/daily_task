import React,{useEffect} from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import {connect} from 'react-redux'
import { useNavigation } from '@react-navigation/native';

let DATA= []
let arr = []
const Loading=(props)=>{




    return (
        <View style={{ backgroundColor: 'transparent', alignContent: 'center', alignItems: 'center', flex: 1 }}>
        <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />
      </View>
    );
}


const styles = StyleSheet.create({
    loading: {
        padding: 10,
        // flex: 1,
        alignSelf: 'center',
        marginTop: '50%',
        fontSize: 70,
        color: 'red',
      }
})

const mps = state => {
  return {
    itemsFetch: state.itemsFetch,
    currentOwner: state.currentOwner,
    currentUser: state.c
  };
};

const mpss = dispatch => {
  return {
    handleItemsFetch:()=>{
      dispatch({type: 'itemsFetch'})
    },
    handleTasksArray: (e) => {
      dispatch({
          type: 'tasksArray',
          payload: { tasksArray: e }
      })
  }
  };
};

export default connect(mps,mpss)(Loading);
