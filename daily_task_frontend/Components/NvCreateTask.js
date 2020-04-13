import React from 'react'
import { Modal, Text, TextInput, View, StyleSheet, Button, TouchableOpacity, Touchableopacity, PanResponder, PickerIOSComponent } from 'react-native'
import { connect } from 'react-redux'
import { SimpleLineIcons, EvilIcons } from "@expo/vector-icons";
import Loading from './Loading'


const NvCreateTask = (props) => {

  const handlePress = async () => {
    let subdomain = await props.currentUser.owner.subdomain

    fetch(`http://${subdomain}.lvh.me:3000/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        recipe: props.createTask,
        owner_id: props.currentUser.owner.id
      })
    })
    .then(resp => resp.json())
    .then(data=> props.handleCurrentUser({owner: data}))
    .catch(function(errors) {
      alert('something went wrong')
      console.log('catch',errors);
      
    })
    props.handleOverlay()
    props.handleCreateTask('')
  }


  return (
    <View style={styles.main} >
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.overLayTask}
        onRequestClose={props.handleCreateTask}
      >
        <TouchableOpacity style={styles.main} onPress={props.handleOverlay} activeOpacity={1}>
          <View style={styles.modalView} >
            <Text style={styles.txt}>Create Task</Text>
            <TextInput  autoCapitalize={'words'} style={styles.inpt} placeholder='Task Name' value={props.createTask} onChangeText={props.handleCreateTask} />
            <EvilIcons name='paperclip' style={styles.icon} />
            <View style={{ height: 1, marginTop: 120 }}>
              <TouchableOpacity onPress={handlePress}>
                <Text style={styles.btn}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}


const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    height: '20%',
    width: '88%',
    margin: 20,
    flexDirection: 'row'
  },
  txt: {
    fontSize: 20,
    margin: 15,
    flexDirection: 'column',
    height: 30,
    marginLeft: '30%',
  },
  inpt: {
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    marginLeft: -183,
    width: "80%",
    height: 40,
    marginTop: 60,
    paddingLeft: 5
  },
  icon: {
    fontSize: 30,
    height: 30,
    marginTop: 67,
    marginLeft: '-88%',
    paddingRight: 9
  },
  btn: {
    marginTop: -10,
    marginLeft: 90,
    color: '#00bcd4',
    fontSize: 20,
    height: 30
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
    handleCreateTask:(e)=>{
      dispatch({
        type: 'createTask',
        playload: {createTask: e}
      })
    },
    handleItemsFetch:()=>{
      dispatch({type: 'itemsFetch'})
    },
    handleCurrentUser: e => {
      dispatch({
        type: "current",
        payload: { currentUser: e }
      });
    },
  };
};


export default connect(mps, mpss)(NvCreateTask)