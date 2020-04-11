import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const Loading=()=>{

    return (
        <View style={{ backgroundColor: 'transparent', alignContent: 'center', alignItems: 'center', flex: 1 }}>
        <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />
      </View>
    );
}


const styles = StyleSheet.create({
    loading: {
        padding: 10,
        // flex: 1,
        alignSelf: 'center',
        marginTop: '50%',
        fontSize: 70,
        color: 'red',
      }
})
export default Loading;
