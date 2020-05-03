import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, FlatList, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Button, Image } from 'react-native'
import { connect } from 'react-redux'
import { Ionicons, } from "@expo/vector-icons";
import * as Animatable from 'react-native-animatable';
import Collapse from './Collapse'
// import * as _ from 'underscore'

let DATA = new Array
let ANSWER
let arr = []
let arr2 = []


const UsersTasks = (props) => {

    const [selected, setSelected] = React.useState(new Map());
    const [secondSelected, setSecondSelected] = React.useState(new Map());
    const [refresh, setRefresh] = useState(false)

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







    const uniqueness = () => {
        //first
        let array;
        if (props.currentUser?.user?.tasksId?.length === 1) {
            array = props.currentUser?.user?.tasksId
        } else if (props.currentUser?.user?.tasksId.length > 0 && props.currentUser?.user.tasksId.length !== 1) {
            array = props.currentUser?.user?.tasksId.filter((task, index, self) =>
                index === self.findIndex((t) => (
                    t.taskId === task.taskId && t.ingredientIdx === task.ingredientIdx
                ))
            )
        }


        //second
        array?.forEach(user => {
            props.currentOwner?.owner.items.filter(ele => {
                if (user.taskId === ele.id) {
                    arr.push(ele)
                }
            });
        });

        //third//


        if (arr.length > 0 && array?.length > 1) {
            arr?.forEach((ele, idx2) => {
                let obj = { recipe: { task_name: '', ingredients: [], id: '' } }
                array?.forEach((user, idx) => {
                    if (idx2 !== idx) {
                        obj.recipe.task_name = ele.recipe.task_name
                        obj.recipe.ingredients.push(ele.recipe.ingredients[user.ingredientIdx])
                        obj.recipe.id = user.taskId
                    }
                })
                DATA.push(obj)
            })
        } else if (arr.length > 0 && array?.length === 1 && array?.length !== 0) {
            arr?.forEach((ele, idx2) => {
                let obj = { recipe: { task_name: '', ingredients: [], id: '' } }
                array?.forEach((user, idx) => {
                    obj.recipe.task_name = ele.recipe.task_name
                    obj.recipe.ingredients.push(ele.recipe.ingredients[user.ingredientIdx])
                    obj.recipe.id = user.taskId
                })
                DATA.push(obj)
            })
        }

        //forth
        if (DATA.length > 0) {
            let final;
            final = DATA?.filter((task, index, self) =>
                index === self.findIndex((t) => (
                    t.recipe.task_name === task.recipe.task_name && t.recipe.ingredients.ingredientName === task.recipe.ingredients.ingredientName
                ))
            )
            return final
        }
    }



    const ItemsList = ({ fullObj, index, selected, onSelect, onSecondSelect, secondSelected }) => {
        let name = props.currentOwner.owner.user_name
        // onPress={() => setDisplay(false)}
        return (
            <View style={{ flex: 1 }}>
                <TouchableWithoutFeedback >
                    <View style={selected ? styles.cardContainer : styles.cardContainerExtand}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.card1}>{fullObj.recipe.task_name}</Text>
                            <Ionicons name={selected !== true ? 'ios-arrow-down' : 'ios-arrow-up'} style={styles.iconArrow} onPress={() => onSelect(fullObj.id)} />
                        </View>
                        <Collapse selected={selected} fullObj={fullObj} />

                        <View style={!selected ? styles.createBy : styles.createByExtand}>
                            <Text style={{ marginLeft: 190, fontSize: 15, position: 'relative' }}>Created By {name.charAt(0).toUpperCase() + name.slice(1)}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>

            </View>
        )
    }

    const EmptyList = () => {
        return (
            <>
                <View style={{ marginTop: '25%', paddingLeft: '16%', flex: 1 }}>
                    <Image
                        style={{ width: 250, height: 250, }}
                        source={require('../assets/decision-making.png')}
                    />
                </View>
                <Text style={{
                    fontSize: 24, fontWeight: '500', 
                    paddingHorizontal: 31, paddingVertical: 30, color: '#142850'
                }}>No Tasks Made For You To Do</Text>
            </>
        )
    }


    return (
        <View>
            <View >
                <FlatList
                    data={uniqueness()}
                    // extraData={}
                    scrollEnabled={true}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 320 }}
                    renderItem={({ item, index }) =>
                        <ItemsList fullObj={item} id={item.id}
                            index={index}
                            selected={!!selected.get(item.id)}
                            onSelect={onSelect}
                            secondSelected={!!secondSelected.get(item.id)}
                            onSecondSelect={onSecondSelect}
                        />
                    }
                    keyExtractor={item => item.recipe.task_name.length.toString() + Math.floor(Math.random() * 1000)}
                    ListEmptyComponent={EmptyList()} />
            </View>
        </View >
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
        position: 'relative',
        // borderWidth: 3
    },
    icon: {
        position: 'relative',
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
    btnExtand: {
        height: 50,
        borderRadius: 50,
    },
    inputOfIngred: {
        fontSize: 15,
        padding: 10,
        fontWeight: '500',
        width: '94%'
    },
    inputOfIngredExtand: {
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



const mps = (state) => {
    return {
        currentUser: state.currentUser,
        currentOwner: state.currentOwner,
        tasksArray: state.tasksArray
    }
}
const mpss = (dispatch) => {
    return {
        handleTasksArray: (e) => {
            dispatch({
                type: 'tasksArray',
                payload: { tasksArray: e }
            })
        }
    }
}

export default connect(mps, mpss)(UsersTasks);