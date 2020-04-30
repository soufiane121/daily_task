import React, { useState } from 'react';
import { Text, StyleSheet, KeyboardAvoidingView, TextInput, FlatList, View, TouchableOpacity } from 'react-native';
import { EvilIcons } from "@expo/vector-icons";
import { Overlay, } from "react-native-elements";
import { connect } from 'react-redux'

let DATA = []
const UsersList = (props) => {
    const [searchV, setSearchV] = useState('')
    if (searchV.length !== 0) {
        let arr = []
        props.currentUser.owner.users.forEach(ele => {
            let value = searchV.toLowerCase()
            let check = ele.first_name.includes(value) || ele.last_name.includes(value)
            if (check === true) {
                arr.push(ele)
            }
        })
        DATA = arr
    }

    const assignUserItem = (item) => {
        props.setDisplay(false)
        props.setDisIcon(false)
        props.setFLname(item)
    }

    return (
        <KeyboardAvoidingView enabled behavior='position'>
            <Overlay
                isVisible={props.display}
                onBackdropPress={() => props.setDisplay(false)}
                height={"15%"}
                width={"87%"}
                borderRadius={6}
                overlayBackgroundColor="#f4f3ec"
                overlayStyle={{ marginTop: 20 }}
            >
                <TextInput style={styles.searchField} placeholder='User name'
                    value={searchV}
                    onChangeText={(e) => setSearchV(e)}
                // placeholderTextColor= 'red'
                />
                <FlatList
                    data={DATA}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => assignUserItem(item)} style={styles.flatlist}>
                            <Text style={{fontWeight: '600', color: '#900c3f'}}>{`* ${item.first_name} ${item.last_name}`}</Text>

                        </TouchableOpacity>
                    }
                    keyExtractor={item => item.id.toString()}
                />
            </Overlay>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    searchField: {
        height: 40,
        paddingHorizontal: 10,
        fontSize: 14,
        marginBottom: 6,
        borderBottomWidth: 2,
        borderBottomColor: 'grey'
    },
    flatlist: {
        paddingVertical: 3
    }
});

const mps = (state) => {
    return {
        currentUser: state.currentUser
    }
}
const mpss = (dispatch) => {
    return {

    }
}

export default connect(mps)(UsersList);
