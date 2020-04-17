import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, FlatList } from 'react-native';

const ScrollList = () => {

    return (
        <ScrollView style={styles.scrollView} horizontal={true} scrollEnabled={true} showsHorizontalScrollIndicator={false}>
            <Text style={styles.text}>hello</Text>
            <Text style={styles.text}>hey</Text>
            <Text style={styles.text}>hola</Text>
            <Text style={styles.text}>salut</Text>
            <Text style={styles.text}>marhaba</Text>
            <Text style={styles.text}>voila</Text>
            <Text style={styles.text}>horizontal</Text>
            <Text style={styles.text}>horizontal</Text>
            <Text style={styles.text}>horizontal</Text>
            <Text style={styles.text}>horizontal</Text>
            <Text style={styles.text}>horizontal</Text>
            <Text style={styles.text}>horizontal</Text>
            <Text style={styles.text}>horizontal</Text>
            <Text style={styles.text}>horizontal</Text>
            <Text style={styles.text}>horizontal</Text>
        </ScrollView>
    )
};

const styles = StyleSheet.create({

    scrollView: {
        backgroundColor: '#dee3e2',
        marginVertical: 3,
        marginHorizontal: 1,
    },
    text: {
        fontSize: 17,
       margin: 3
    },
});
export default ScrollList;
