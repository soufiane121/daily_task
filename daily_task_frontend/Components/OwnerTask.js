import React, { useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Button } from 'react-native-elements';
import { connect } from 'react-redux'
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as Animatable from 'react-native-animatable';
import Collapse from './Collapse'

import NvCreateTask from './NvCreateTask';
import Loading from './Loading'


const OwnerTask = (props) => {

  let DATA = [...props.currentUser.owner.items]
  const [focus, setFocus] = useState(false)
  const [dispaly, setDisplay] = useState(true)
  const [selected, setSelected] = React.useState(new Map());
  const [secondSelected, setSecondSelected] = React.useState(new Map());


  const onSelect = React.useCallback(id => {
    Keyboard.dismiss()
    const newSelected = new Map(selected);
    newSelected.set(id, !selected.get(id));
    setSelected(newSelected);
  },
    [selected]
  )


  const onSecondSelect = React.useCallback(id => {
    Keyboard.dismiss()
    const newSelected = new Map(secondSelected);
    newSelected.set(id, !secondSelected.get(id));
    setSecondSelected(newSelected);
  },
    [secondSelected]
  );


  if (props.searching.length !== 0) {
    let arr = []
    props.currentUser.owner.items.forEach(ele => {
      let check = Object.values(ele.recipe).toString().includes(props.searching)
      if (check === true) {
        arr.push(ele)
      }
    })
    DATA = [...arr]
  }

  const handleCancel = () => {
    setDisplay(false)
    setFocus(true)
  }

  const handleCancelBack = () => {
    setFocus(false)
    props.handleSearch('')
    Keyboard.dismiss()
  }

  const handleLongPress = () => {
    alert('needs implementation')
  }

  _handlePostItem = (item) => {
    let subdomain = props.currentUser.owner.subdomain
    fetch(`http://${subdomain}.lvh.me:3000/items/${item.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        ingredientItem: props.addIngredient,
        owner_id: props.currentUser.owner.id
      })
    })
      .then(resp => resp.json())
      .then(data =>  props.handleCurrentUser({owner: data}))

      .catch((errors) => {
        alert(wrong)
        console.log(errors);
      })
    props.handleAddIngredient('')
  }





  const ItemsList = ({ fullObj, index, selected, onSelect, onSecondSelect, secondSelected }) => {
    let name = props.currentUser.owner.user_name
    return (
      // <TouchableWithoutFeedback onPress={() => props.navigation.navigate('details', { objPass: fullObj })} onLongPress={handleLongPress}>
      <View style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={()=> setDisplay(false)}>
        <View style={selected ? styles.cardContainer : styles.cardContainerExtand}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.card1}>{fullObj.recipe.task_name.toString()}</Text>
            <Ionicons name={selected !== true ? 'ios-arrow-down' : 'ios-arrow-up'} style={styles.iconArrow} onPress={() => onSelect(fullObj.id)} />
          </View>
          <Collapse selected={selected} fullObj={fullObj} />
          {!secondSelected &&
            <TouchableOpacity style={{ marginVertical: 26, paddingHorizontal: 9, }} onPress={() => onSecondSelect(fullObj.id)} opacity={1}>
              <Text style={{ color: '#0779e4', }}>Add Ingredients</Text>
            </TouchableOpacity>
          }
          {secondSelected &&
            <View style={selected ? styles.ingredienInputExtand : styles.ingredienInput} >
              <TextInput style={selected ? styles.inputOfIngredExtand: styles.inputOfIngred} placeholder='Add Ingredients' placeholderTextColor='#0779e4'
                autoFocus={dispaly}
                onFocus={() => setDisplay(true)}
                value={props.addIngredient}
                onChangeText={props.handleAddIngredient}
              />
              <Button title='Add' style={selected ? styles.btnExtand : styles.btn} onPress={() => _handlePostItem(fullObj)} />
            </View>
          }
          <View style={!selected ? styles.createBy : styles.createByExtand}>
            <Text style={{ marginLeft: 190, fontSize: 15, position: 'relative' }}>Created By {name.charAt(0).toUpperCase() + name.slice(1)}</Text>
          </View>
        </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }


  return (
    <>
      <View style={styles.container}>
        <View style={{ height: 70, flexDirection: 'row', }}>
          <TextInput style={focus ? styles.searchExtand : styles.search} 
          placeholder='Search For Recipe' value={props.searching} 
          cancelable={false} onChangeText={props.handleSearch} 
          onFocus={handleCancel} />
          {focus &&
            <TouchableOpacity onPress={handleCancelBack}>
              <Animatable.Text style={styles.cancel}
                animation='slideInRight'
                easing='ease-in-out-back'
              >Cancel
            </Animatable.Text>
            </TouchableOpacity>
          }
        </View>
        
        <View styles={{flex: 1}}>
        {!props.loadingPg ?
          <Loading />
          :
          <FlatList
            data={DATA.reverse()}
            scrollEnabled={true}
            contentContainerStyle={{ flexGrow: 1}}
            renderItem={({ item, index }) =>
              <ItemsList fullObj={item} id={item.id}
                index={index}
                selected={!!selected.get(item.id)}
                onSelect={onSelect}
                secondSelected={!!secondSelected.get(item.id)}
                onSecondSelect={onSecondSelect}
              />
            }
            keyExtractor={item => item.id.toString()}
          />
        }
        </View>
        <View style={{ height: 71, marginTop: 2 }}>
          <TouchableOpacity style={styles.touch} onPress={props.handleOverlay} onPressOut={() => setDisplay(false)}>
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
    marginLeft: 20,
    width: 273,
    marginBottom: -22,
  },
  iconArrow: {
    fontSize: 25,
    color: '#00bdaa',
    marginLeft: 22,
    
  },
  icconAdd: {
    fontSize: 19,
    margin: 2,
    paddingRight: 5,
    color: '#3a0088',
    marginRight: 4
  },
  search: {
    height: '85%',
    margin: 6,
    backgroundColor: '#d4d7dd',
    borderRadius: 23,
    width: '94%',
    padding: 9,
    fontSize: 17
  },
  searchExtand: {
    width: '74%',
    margin: 6,
    borderRadius: 23,
    backgroundColor: '#d4d7dd',
    padding: 9,
    fontSize: 14
  },
  cancel: {
    fontSize: 20,
    marginTop: 19,
    marginLeft: 7,
    color: '#e61c5d',
    fontWeight: '500'
  },
  cardContainer: {
    flex: 1,
    backgroundColor: '#eeeeee',
    margin: 5,
    borderRadius: 20,
    borderLeftColor: '#d7385e',
    borderLeftWidth: 4,
    marginBottom: 7,
    // height: 300 , //127,
  },
  cardContainerExtand: {
    flex: 1,
    backgroundColor: '#eeeeee',
    margin: 5,
    borderRadius: 20,
    borderLeftColor: '#d7385e',
    borderLeftWidth: 4,
    marginBottom: 4,
    
  },
  ingredienInput: {
    marginTop: 26,
    flexDirection: "row",
    width: '87%',
    marginLeft: 6,
    height: 44,
    // borderWidth:4
  },
  ingredienInputExtand: {
    flexDirection: 'row',
    width: '87%',
    marginTop: '20%',
    position: 'relative'
  },
  btn: {
    borderRadius: 50,
    width: 50,
  },
  btnExtand:{
    height: 50,
    borderRadius: 50,
  },
  inputOfIngred: {
    fontSize: 15,
    padding: 10,
    fontWeight: '500',
    width: '94%'
  },
  inputOfIngredExtand:{
    padding: 10,
    fontSize: 15,
    fontWeight: '500',
    width: '94%',
    height: 40
  },
  createBy: {
    marginTop: 10,
    padding: 7,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 9,
    backgroundColor: '#b2ebf2'
  },
  createByExtand: {
    // marginTop: 186,
    padding: 7,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 9,
    backgroundColor: '#b2ebf2',
    marginTop: 30,
    marginBottom: 3
  },
  line: {
    borderWidth: 1,
    marginTop: 8,
    width: '30%',
    marginBottom: 16,
    marginLeft: 16,
    borderColor: '#22559c',
    opacity: 0.4
  }


})


const mps = state => {
  return {
    overLayTask: state.overLayTask,
    createTask: state.createTask,
    currentUser: state.currentUser,
    loadingPg: state.loadingPg,
    searching: state.searching,
    addIngredient: state.addIngredient
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
    },
    handleAddIngredient: (e) => {
      dispatch({
        type: 'addIngredient',
        payload: { addIngredient: e }
      })
    }
  };
};
export default connect(mps, mpss)(OwnerTask);



  // costume function to filter hashes

  // Object.filter = (obj, predicate) =>
  //   Object.keys(obj)
  //     .filter(key => predicate(obj[key]))
  //     .reduce((res, key) => Object.assign(res, { [key]: obj[key] }), {});