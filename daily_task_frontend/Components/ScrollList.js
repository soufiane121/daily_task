import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, FlatList } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Status from '../IngredientTasks/Status'

const ScrollList = () => {

    return (
        <Animatable.View animation={'slideInRight'} >
            <ScrollView style={styles.scrollView} horizontal={true} scrollEnabled={true} showsHorizontalScrollIndicator={false}>
                <Status />
                <Text style={styles.text}>hey</Text>
                <Text style={styles.text}>hola</Text>
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
});
export default ScrollList;
