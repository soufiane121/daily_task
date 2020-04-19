import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Status from '../IngredientTasks/Status'
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux'
import Datee from '../IngredientTasks/Datee';
import Quantity from '../IngredientTasks/Quantity';

const ScrollList = (props) => {

    const navigation = useNavigation()

    return (
        <Animatable.View animation={'slideInRight'} >
            <ScrollView style={styles.scrollView} horizontal={true} scrollEnabled={true} showsHorizontalScrollIndicator={false}>
                <Status />
                <Datee />
                <Quantity />
                <Text style={styles.text}></Text>
                <Text style={styles.text}>salut</Text>
                <Text style={styles.text}>marhaba</Text>
                <Text style={styles.text}>voila</Text>
                <Text style={styles.text}>horizontal</Text>
                <Text style={styles.text}>horizontal</Text>
                <Text style={styles.text}>horizontal</Text>
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
    }
});


const mps = (state) => {
    return {
        displayDate: state.displayDate,
        dateTime: state.dateTime
    }
}

const mpss = (dispatch) => {
    return {
        handleDisplayDate: () => {
            dispatch({ type: 'displayDate' })
        },
    }
}

export default connect(mps, mpss)(ScrollList);
