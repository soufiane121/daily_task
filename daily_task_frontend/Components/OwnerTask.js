import React, { useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Button } from 'react-native-elements';
import { connect } from 'react-redux'
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';

import NvCreateTask from './NvCreateTask';
import Loading from './Loading'

let idx = null


// function usePrevious(value) {
//   const ref = useRef();
//   useEffect(() => {
//     ref.current = value;
//   });
//   return ref.current;
// }

const OwnerTask = (props) => {
  let DATA = [...props.currentUser.owner.items]

  const [thruly, setThruly] = useState(true)
  const [focus, setFocus] = useState(false)
  const [add, setAdd] = useState(true)
  const [addInput, setAddInput] = useState('')
  const [arrow, setArrow] = useState(null)






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


  const truly = () => {
    console.log('before', thruly);

    return setThruly(prevS => !prevS)

    console.log('before', thruly);


  }

  const handleCancel = () => {
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
  const handleInputButt = () => {
    setAdd(!add)
  }

  const handleAddInput = (e) => {
    setAddInput(e)
  }

  _colapsing = () => {
    return (
      <Collapsible >

        <Animatable.Text style={{ fontSize: 17, padding: -6, marginTop: 20, marginLeft: 5 }}
          animation='bounceIn'
          easing='ease'
          delay={400}
        >
          comming....</Animatable.Text>
      </Collapsible>
    )
  }

  _Acording = (index) => {

    return (
      <Accordion
        activeSections={[0]}
        sections={['one', 'two', 'tree']}
        renderSectionTitle={'title'}
        renderHeader={'header'}
      >

        <Animatable.Text style={{ fontSize: 17, padding: -6, marginTop: 20, marginLeft: 5 }}
          animation='bounceIn'
          easing='ease'
          delay={400}
        >
          comming....</Animatable.Text>
      </Accordion>
    )
  }


  const [selected, setSelected] = React.useState(new Map());

  const onSelect = React.useCallback(id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));

      setSelected(newSelected);
    },
    [selected]
  );
  const ItemsList = ({ fullObj, index ,selected, onSelect, id }) => {
    
    let name = props.currentUser.owner.user_name
    return (
      <TouchableWithoutFeedback onPress={() => props.navigation.navigate('details', { objPass: fullObj })} onLongPress={handleLongPress}>
        <View style={selected ? styles.cardContainer : styles.cardContainerExtand}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.card1}>{fullObj.recipe.task_name.toString()}</Text>
            {/* <MaterialIcons name='add-alert' style={styles.icconAdd} onPress={handleAdd}/> */}
            <Ionicons name={selected !== true ? 'ios-arrow-down' : 'ios-arrow-up'} style={styles.iconArrow} onPress={()=> onSelect(id)} />
          </View>
          <Collapsible collapsed={!selected} expandMultiple={false} >

            <Animatable.Text style={{ fontSize: 17, padding: -6, marginTop: 20, marginLeft: 5 }}
              animation='bounceIn'
              easing='ease'
              delay={400}
            >
              comming....</Animatable.Text>
          </Collapsible>
        {/* {selected && _colapsing()} */}
          <View style={styles.ingredienInput} animation='pulse' iterationCount={!add ? 1 : 'infinite'}>
            <TextInput style={styles.inputOfIngred} placeholderTextColor='#0779e4' placeholder='Add Ingredients'
              onFocus={handleInputButt}
            // value={props.addIngredient}
            // onChange={props.handleAddIngredient}
            />
            {add && <Button title='Add' style={styles.btn} />}
          </View>
          <View style={thruly ? styles.createBy : styles.createByExtand}>
            <Text style={{ marginLeft: 190, fontSize: 15, position: 'relative' }}>Created By {name.charAt(0).toUpperCase() + name.slice(1)}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }


  return (
    <>
      <View style={styles.container}>
        <View style={{ height: 70, flexDirection: 'row', }}>
          <TextInput style={focus ? styles.searchExtand : styles.search} placeholder='Search For Recipe' value={props.searching} cancelable={false} onChangeText={props.handleSearch} onFocus={handleCancel} />
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
        {!props.loadingPg ?
          <Loading />
          :
          <FlatList
            data={DATA.reverse()}
            renderItem={({ item, index }) => <ItemsList fullObj={item}id={item.id} index={index} selected={!!selected.get(item.id)} onSelect={onSelect}/>}
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
    marginLeft: 20,
    width: 273,
    marginBottom: -22,
  },
  iconArrow: {
    fontSize: 25,
    color: '#00bdaa',
    marginLeft: 22
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
    // height: 143  //127
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
  },
  btn: {
    borderRadius: 50,
    width: 50,
  },
  inputOfIngred: {
    fontSize: 15,
    padding: 10,
    fontWeight: '500',
    width: '94%'
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
    marginTop: 186,
    padding: 7,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 9,
    backgroundColor: '#b2ebf2'
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
      // console.log(e.nativeEvent.text);

      dispatch({
        type: 'addIngredient',
        payload: { addIngredient: e.nativeEvent.text }
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