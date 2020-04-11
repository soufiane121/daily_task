import React, { useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button, FlatList, ActivityIndicator } from 'react-native'
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import CreateTask from './CreateTask'
import { connect } from 'react-redux'
import NvCreateTask from './NvCreateTask';
import Loading from './Loading'

const DATA = []

const OwnerTask = (props) => {
  console.log('first render', props);

  useEffect(() => {
    getItems()
  },[props.itemsFetch])

  const getItems = async () => {
    //  if you want to disable yellow errors
    console.disableYellowBox = true
    let subdomain = await props.currentUser.owner.subdomain
    // DATA = await props.currentUser.owner.items

    fetch(`http://${subdomain}.lvh.me:3000/items`)
      .then(resp => resp.json())
      .then(data => props.handleCurrentUser(data))
      .catch(function (errors) {
        console.log('something wrong', errors);
        
      })
  }

  const ItemsList = ({fullObj} ) => {
    debugger 
    // console.log('list function', fullObj);
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 20, padding: 30, borderWidth: 4, marginBottom: 9 }}>{fullObj.recipe.task_name.toString()}</Text>
      </View>
    )

  }

  // const Loading = () => {
  //   return (
  //     <View style={{ backgroundColor: 'transparent', alignContent: 'center', alignItems: 'center', flex: 1 }}>
  //       <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />
  //     </View>
  //   )
  // }

  return (

    <>
      <View style={styles.container}>
        {!props.currentUser ?
          <Loading />
          :
          <FlatList
            data={props.currentUser.owner.items ===  null ? [] : props.currentUser.owner.items}
            // data={[]}
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
    // padding: 30,
    // borderWidth: 3,
    // position: 'absolute',
    // marginBottom: -2
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
    itemsFetch: state.itemsFetch
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
  };
};
export default connect(mps, mpss)(OwnerTask);

{/* <Item title={item.title} /> */ }