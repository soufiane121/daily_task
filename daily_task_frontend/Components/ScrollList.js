import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, FlatList } from 'react-native';
import Constants from 'expo-constants';
import First from './First';
import Second from './Second'

let functionsArr = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: 'bd7acbea-c1b1-46c2-aaded5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ddad53abb28ba',
        title: 'First Item',
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3asd53abb28ba',
        title: 'First Item',
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3addssd53abb28ba',
        title: 'First Item',
    },
]

const ScrollList = () => {
    // let firty = functionsArr[1].func

    const SingleItem = ({ Item }) => {
        // console.log(Item);
        // let Yes = Item.func
        return (
            <View style={{flex: 1}}>
        <Text>{Item.title}</Text>
        </View >
        )
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={functionsArr}
                scrollEnabled={true}
                horizontal={true}
                renderItem={({ item })=> <SingleItem Item={item} />
                }
                // keyExtractor={item => item.id.toString()}
                listKey={(item, index) => 'D' + index.toString()}
            />

        </View>
    )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: Constants.statusBarHeight,
        // height: 80,
        // width: 120
    },
    scrollView: {
        backgroundColor: 'pink',
        // marginHorizontal: 20,
        // position: 'relative',
        height: 40
    },
    text: {
        fontSize: 14,
    },
});
export default ScrollList;


  // return (
    //     <SafeAreaView style={styles.container}>
    //     <ScrollView style={styles.scrollView} horizontal={false} scrollEnabled={true} showsHorizontalScrollIndicator={false}>
    //         <Text style={styles.text}>hello</Text>
    //         <Text style={styles.text}>hey</Text>
    //         <Text style={styles.text}>hola</Text>
    //         <Text style={styles.text}>salut</Text>
    //         <Text style={styles.text}>marhaba</Text>
    //         <Text style={styles.text}>voila</Text>
    //         <Text style={styles.text}>horizontal</Text>
    //         <Text style={styles.text}>horizontal</Text>
    //         <Text style={styles.text}>horizontal</Text>
    //         <Text style={styles.text}>horizontal</Text>
    //         <Text style={styles.text}>horizontal</Text>
    //         <Text style={styles.text}>horizontal</Text>
    //         <Text style={styles.text}>horizontal</Text>
    //         <Text style={styles.text}>horizontal</Text>
    //         <Text style={styles.text}>horizontal</Text>
    //     </ScrollView>
    //     </SafeAreaView>
    // )