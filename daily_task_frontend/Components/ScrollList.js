import React from 'react';
import { Text, View, StyleSheet, ScrollView, } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Status from '../IngredientTasks/Status'
import { connect } from 'react-redux'
import Datee from '../IngredientTasks/Datee';
import Quantity from '../IngredientTasks/Quantity';
import PickUser from '../IngredientTasks/PickUser'

const ScrollList = (props) => {


    const fetchStatus = async (value) => {
        debugger
        let subdomain;
        if (props.currentUser.hasOwnProperty('owner')) {
            subdomain = props.currentUser.owner.subdomain
            await fetch(`http://${subdomain}.lvh.me:3000/items_updat/${props.objcId}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    status: value,
                    quantity: props.ele.quantity,
                    dateTime: props.ele.dateTime,
                    itemId: props.index,
                    owner_id: props.currentUser.owner.id
                })
            })
                .then(resp => resp.json())
                // .then(data => console.log(data))
                .catch((errors) => {
                    alert('Sorry our fault')
                    console.log(errors);
                })
        } else if (props.currentUser.hasOwnProperty('user')) {
            subdomain = props.currentUser.user.owner.subdomain
            await fetch(`http://${subdomain}.lvh.me:3000/items_update_from_user/${props.objcId}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    status: value,
                    quantity: props.ele.quantity,
                    dateTime: props.ele.dateTime,
                    itemId: props.index,
                    owner_id: props.currentUser.user.owner.id,
                    ingredientName: props.ele.ingredientName
                })
            })
                .then(resp => resp.json())
                // .then(data => console.log(data))
                .catch((errors) => {
                    alert('Sorry our fault')
                    console.log(errors);
                })
        }
    }

    const fetchQuantity = async (value) => {
        let subdomain = props.currentUser.owner.subdomain
        if (props.currentUser.hasOwnProperty('owner')) {
            await fetch(`http://${subdomain}.lvh.me:3000/items_updat/${props.objcId}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    status: props.ele.status,
                    quantity: value,
                    dateTime: props.ele.dateTime,
                    itemId: props.index,
                    owner_id: props.currentUser.owner.id
                })
            })
                .then(resp => resp.json())
                .then(data => props.handleCurrentUser({ owner: data })
                )
                .catch((errors) => {
                    alert('Sorry our fault')
                    console.log(errors);
                })
        }
    }


    const fetchDatePost = async (value) => {
        let subdomain;
        if (props.currentUser.hasOwnProperty('owner')) {
            subdomain = props.currentUser.owner.subdomain
            await fetch(`http://${subdomain}.lvh.me:3000/items_updat/${props.objcId}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    status: props.ele.status,
                    quantity: props.ele.quantity,
                    dateTime: value,
                    itemId: props.index,
                    owner_id: props.currentUser.owner.id
                })
            })
                .then(resp => resp.json())
                // .then(data => console.log(data))
                .catch((errors) => {
                    alert('Sorry our fault')
                    console.log(errors);
                })
        } else if (props.currentUser.hasOwnProperty('user')) {
            subdomain = props.currentUser.user.owner.subdomain
            await fetch(`http://${subdomain}.lvh.me:3000/items_update_from_user/${props.objcId}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    status: props.ele.status,
                    quantity: props.ele.quantity,
                    dateTime: value,
                    itemId: props.index,
                    owner_id: props.currentUser.user.owner.id,
                    ingredientName: props.ele.ingredientName
                })
            })
                .then(resp => resp.json())
                // .then(data => console.log(data))
                .catch((errors) => {
                    alert('Sorry our fault')
                    console.log(errors);
                })
        }

    }

    const fetchUserInfo = async (user) => {

        console.log('props.objcId', props.index);
        let subdomain = props.currentUser.owner.subdomain
        await fetch(`http://${subdomain}.lvh.me:3000/assigning_user/${props.objcId}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                userInfo: { firstName: user.first_name, lastName: user.last_name },
                itemId: props.index,
                owner_id: props.currentUser.owner.id,
                user_id: user.id
            })
        })
            .then(resp => resp.json())
            .then(data => {
                props.handleCurrentUser({ owner: data })
                // setTimeout(function () { postIdxToUser(user) }, 3000);
                postIdxToUser(user)
            }
            )
            .catch((errors) => {
                alert('Sorry our fault')
                console.log(errors);
            })
    }


    const postIdxToUser = async (user) => {
        let subdomain = props.currentUser.owner.subdomain
        await fetch(`http://${subdomain}.lvh.me:3000/assigning_ids`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                taskId: props.objcId,
                ingredientIdx: props.index,
                id: user.id
                // owner_id: props.currentUser.owner.id,
            })
        })
            .then(resp => resp.json())
            .then(data => console.log(data)
            )
            .catch((errors) => {
                alert('Sorry our fault')
                console.log(errors);
            })
    }

    return (
        <Animatable.View animation={'slideInRight'} >
            <ScrollView style={styles.scrollView} horizontal={true} scrollEnabled={true} showsHorizontalScrollIndicator={false}>
                <Status handleStatus={props.handleStatus} elementStatus={props.ele.status} fetchStatus={fetchStatus} />
                <Datee handleDateTime={props.handleDateTime} elementDate={props.ele.dateTime} fetchDatePost={fetchDatePost} />
                <Quantity handleQuantity={props.handleQuantity} elementQuantity={props.ele.quantity} fetchQuantity={fetchQuantity} />
                {props.currentUser.hasOwnProperty('owner') &&
                    <PickUser fetchUserInfo={fetchUserInfo} elementUser={props.ele} />
                }
                <Text style={styles.empty}></Text>
                {/* <Text style={styles.empty}></Text> */}
            </ScrollView>
        </Animatable.View>
    )
};

const styles = StyleSheet.create({

    scrollView: {
        marginHorizontal: 3,
        // borderWidth: 1
    },
    text: {
        fontSize: 17,
        margin: 1,
        backgroundColor: '#dee3e2',
        width: 95
    },
    date: {
        backgroundColor: '#dee3e2',
        width: 95,
        height: 44,
        paddingHorizontal: 29,
        paddingVertical: 12,
        fontWeight: '500',
        fontSize: 14,
        color: 'grey',
    },
    dateExtand: {
        width: 120,
        height: 64,
        fontSize: 15,
        fontWeight: '500',
        backgroundColor: '#dee3e2',
        marginLeft: 1,
        paddingHorizontal: 13
    },
    empty: {
        fontSize: 17,
        backgroundColor: '#dee3e2',
        width: 70
    }
});


const mps = (state) => {
    return {
        dateTime: state.dateTime,
        status: state.status,
        quantity: state.quantity,
        currentUser: state.currentUser
    }
}

const mpss = (dispatch) => {
    return {
        handleDateTime: (e) => {
            dispatch({
                type: 'displayDate',
                payload: { dateTime: e }
            })
        },
        handleStatus: (e) => {
            dispatch({
                type: 'status',
                payload: { status: e }
            })
        },
        handleQuantity: (e) => {
            dispatch({
                type: 'quantity',
                payload: { quantity: e }
            })
        },
        handleCurrentUser: e => {
            dispatch({
                type: "current",
                payload: { currentUser: e }
            });
        },
    }
}

export default connect(mps, mpss)(ScrollList);
