import React, {useState} from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import QuantitySc from './QuantitySc'

const Quantity = (props) => {
const [show, setShow] = useState(false)

    return (
        <View>
            {show 
            ?
            <QuantitySc setTextInp={props.handleQuantity} setShow={setShow}/>
            :
            <TouchableOpacity onPress={()=> setShow(true)}>
            <Text style={styles.quantity}>Quantity</Text>
            </TouchableOpacity>
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
    }
});

export default Quantity;
