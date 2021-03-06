import React, {useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import QuantitySc from './QuantitySc'
import {connect} from 'react-redux'

const Quantity = (props) => {
const [show, setShow] = useState(false)

const conditionRender=()=>{
    if (props.elementQuantity === undefined || props.elementQuantity?.length === 0 || props.elementQuantity === null) {
        return (
            <TouchableOpacity onPress={()=> setShow(true)}>
            <Text style={styles.quantity}>Quantity</Text>
            </TouchableOpacity>
        ) 
    } else if (props.currentUser.user) {
        return (
            <View>
            <Text style={styles.quantityExtand}>{props.elementQuantity}</Text>
            </View>
        )
    } else {
        return (
            <TouchableOpacity onPress={()=> setShow(true)}>
            <Text style={styles.quantityExtand}>{props.elementQuantity}</Text>
            </TouchableOpacity>
        )
    }
}

    return (
        <View>
            {show 
            ?
            <QuantitySc setTextInp={props.handleQuantity} setShow={setShow} fetchQuantity={props.fetchQuantity}/>
            :
            (conditionRender())
             }
        </View>
    );
}

const styles = StyleSheet.create({
    quantity: {
        backgroundColor: '#dee3e2',
        width: 125,
        height: 44,
        paddingHorizontal: 29,
        paddingVertical: 12,
        fontWeight: '500',
        fontSize: 14,
        color: 'grey',
        marginLeft: 1,
        marginRight: 1
    },
    quantityExtand:{
        backgroundColor: '#dee3e2',
        width: 125,
        height: 44,
        paddingHorizontal: 38,
        paddingVertical: 10,
        fontWeight: '600',
        fontSize: 16,
        color: 'tomato',
        marginLeft: 1
    }
});

const mps=(state)=>{
    return {
        currentUser: state.currentUser
    }
}

export default connect(mps)(Quantity);
