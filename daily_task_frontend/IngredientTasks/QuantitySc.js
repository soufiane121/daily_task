import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import { Overlay } from "react-native-elements";


const QuantitySc = (props) => {
    const [show, setShow] = useState(true)
    const [input, setInput] = useState('')

    const onClose = () => {
        setShow(false)
        setInput('')
    }

    const handleInput = (e) => {
        setInput(e)
    }
    const handleSaveButton = () => {
        // props.setTextInp(input)
        setShow(false)
        props.fetchQuantity(input)
    }

    return (
        <View style={{ flex: 1 }}>
            <Overlay
                isVisible={show}
                onBackdropPress={() => onClose()}
                height={"20%"}
                width={"98%"}
                borderRadius={6}
                overlayBackgroundColor="#dee3e2"
                overlayStyle={{ marginBottom: 18 }}
            >
                <View style={{ borderBottomWidth: 1, height: 40, marginHorizontal: -6, }}>
                    <Text style={{ paddingHorizontal: 100, fontSize: 20, color: '#5a3f11' }}>Enter Quantities </Text>
                </View>
                <TextInput style={{ height: 45, marginVertical: 9, paddingHorizontal: 20 }}
                    autoFocus={true}
                    placeholder="Quantity and Unit"
                    value={input}
                    onChangeText={handleInput}
                />
                <View >
                    <Button title='Save' onPress={handleSaveButton} />
                </View>
            </Overlay>
            {input.length !== 0
                ?
                <TouchableOpacity onPress={() => setShow(true)}>
                    <Text style={styles.input}>{input}</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => setShow(true)}>
                    <Text style={styles.quantitySc}>Quantity</Text>
                </TouchableOpacity>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    quantitySc: {
        backgroundColor: '#dee3e2',
        width: 125,
        height: 44,
        paddingHorizontal: 29,
        paddingVertical: 12,
        fontWeight: '500',
        fontSize: 14,
        color: 'grey',
        marginLeft: 1
    },
    input:{
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

export default QuantitySc;
