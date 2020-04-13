import React, { useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native'
import { Button } from 'react-native-elements';
import { connect } from 'react-redux'
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

import NvCreateTask from './NvCreateTask';
import Loading from './Loading'

const OwnerTask = (props) => {
  let DATA = [...props.currentUser.owner.items]

  // costume function to filter hashes

  // Object.filter = (obj, predicate) =>
  //   Object.keys(obj)
  //     .filter(key => predicate(obj[key]))
  //     .reduce((res, key) => Object.assign(res, { [key]: obj[key] }), {});


  if (props.searching.length !== 0) {
    let arr = []
     props.currentUser.owner.items.forEach(ele => {
     let check =  Object.values(ele.recipe).toString().includes(props.searching)
      if (check === true) {
        arr.push(ele)
      }
    })
    DATA = [...arr]
  }


  const ItemsList = ({ fullObj }) => {
    let name = props.currentUser.owner.user_name
    return (
      <View style={styles.cardContainer}>
        <Text style={styles.card1}>{fullObj.recipe.task_name.toString()}</Text>
        <View style={{marginTop: 35, padding: 7, marginLeft:8, marginRight:8, borderRadius: 9, backgroundColor: '#b2ebf2'}}>
          <Text style={{marginLeft: 190, fontSize: 15}}>Created By {name.charAt(0).toUpperCase() + name.slice(1)}</Text>
        </View>
      </View>
    )
  }
  

  return (
    <>
      <View style={styles.container}>
        <View style={{ height: 70,}}>
          <TextInput style={styles.search} placeholder='Search For Recipe' value={props.searching} onChangeText={props.handleSearch} />
        </View>
        {!props.loadingPg ?
          <Loading />
          :
          <FlatList
            data={DATA.reverse()}
            renderItem={({ item }) => <ItemsList fullObj={item} />}
            keyExtractor={item => item.id.toString()}
          />
        }
        <View style={{ height: 71, marginTop: 2 }}>
          <TouchableOpacity style={styles.touch} onPress={props.handleOverlay}>
            <AntDesign name='plus' size={50} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <NvCreateTask />
      </View>
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  touch: {
    backgroundColor: '#b53389',
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
  card1: {
    fontSize: 24,
    margin: 3,
    marginLeft: 20
  },
  search: {
    height: '85%',
    margin: 6,
    backgroundColor: '#d4d7dd',
    borderRadius: 23,
    width: '94%',
    padding: 9,
  },
  cardContainer:{
    flex: 1, 
    backgroundColor: '#eeeeee', 
    margin: 5, 
    borderRadius: 20 ,
    borderLeftColor: '#d7385e',
    borderLeftWidth: 4,
    marginBottom: 7,
    height: 110
  }
})


const mps = state => {
  return {
    overLayTask: state.overLayTask,
    createTask: state.createTask,
    currentUser: state.currentUser,
    loadingPg: state.loadingPg,
    searching: state.searching
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
    handleLoadingPg: () => {
      dispatch({ type: 'loadingPg' })
    },
    handleSearch: (e) => {
      dispatch({
        type: 'searching',
        payload: { searching: e }
      })
    }
  };
};
export default connect(mps, mpss)(OwnerTask);