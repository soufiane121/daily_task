import React, { useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button, FlatList, ActivityIndicator } from 'react-native'
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import CreateTask from './CreateTask'
import { connect } from 'react-redux'
import NvCreateTask from './NvCreateTask';
import Loading from './Loading'


const OwnerTask = (props) => {
  let DATA = []

  const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));

  const ItemsList = ({ fullObj }) => {

    return (
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 20, padding: 30, borderWidth: 4, marginBottom: 9 }}>{fullObj.recipe.task_name.toString()}</Text>
      </View>
    )
  }


  return (

    <>
      <View style={styles.container}>
        {!props.loadingPg ?
          <Loading />
          :
          <FlatList
            data={props.currentUser.owner.items.reverse()}
            renderItem={({ item }) => <ItemsList fullObj={item} />}
            keyExtractor={item => item.id.toString()}
          />
        }
        <View style={{ height: 81, backgroundColor: '#00000000', opacity: 1 }}>
          <TouchableOpacity style={styles.touch} onPress={props.handleOverlay}>
            <AntDesign name='plus' size={50} style={styles.icon} />
          </TouchableOpacity>
        </View>
        {/* <CreateTask handleCreateTask={handleCreateTask}/>  */}
        <NvCreateTask />
      </View>
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tomato',
  },
  touch: {
    backgroundColor: '#b53389',
    // marginTop: '30%',
    height: 65,
    alignSelf: 'center',
    width: 65,
    marginLeft: '80%',
    borderRadius: 80,
  },
  icon: {
    position: 'absolute',
    alignItems: 'center',
    padding: 7,
  },
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
    overLayTask: state.overLayTask,
    createTask: state.createTask,
    currentUser: state.currentUser,
    itemsFetch: state.itemsFetch,
    loadingPg: state.loadingPg
  };
};

const mpss = dispatch => {
  return {
    handleOverlay: () => {
      dispatch({ type: "overLayTask" });
    },
    handleCurrentUser: e => {
      dispatch({
        type: "current",
        payload: { currentUser: e }
      });
    },
    handleLoadingPg:()=>{
      dispatch({type: 'loadingPg'})
    }
  };
};
export default connect(mps, mpss)(OwnerTask);