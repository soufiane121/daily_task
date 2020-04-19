import React from 'react';
import { Text, View, StyleSheet, ScrollView, } from 'react-native';
import { Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import Status from '../IngredientTasks/Status'
import { connect } from 'react-redux'
import Datee from '../IngredientTasks/Datee';
import Quantity from '../IngredientTasks/Quantity';

const ScrollList = (props) => {
    
    _PostInfp = () => {
        console.log('Scroll view comp', props.quantity);
        console.log('Scroll view comp', props.dateTime);
        console.log('Scroll view comp', props.status);
    }

    return (
        <Animatable.View animation={'slideInRight'} >
            <ScrollView style={styles.scrollView} horizontal={true} scrollEnabled={true} showsHorizontalScrollIndicator={false}>
                <Status handleStatus={props.handleStatus} />
                <Datee handleDateTime={props.handleDateTime} />
                <Quantity handleQuantity={props.handleQuantity} />
                <View style={{ width: 120, }}>
                    <Button 
                    buttonStyle={{ backgroundColor: 'red', height: 44 }} 
                    title='Save' 
                    onPress={_PostInfp}
                    />
                </View>
                <Text style={styles.empty}></Text>
                <Text style={styles.empty}></Text>
            </ScrollView>
        </Animatable.View>
    )
};

const styles = StyleSheet.create({

    scrollView: {
        marginVertical: 3,
        marginHorizontal: 3,
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
        quantity: state.quantity
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
    }
}

export default connect(mps, mpss)(ScrollList);
