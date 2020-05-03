import React,{useEffect} from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import RNActionCable from 'react-native-actioncable';
import ActionCableProvider from 'react-actioncable-provider';
import ChatList from './ChatList'
import { connect } from 'react-redux'
import { useIsFocused} from '@react-navigation/native';


const ChatRoom = (props) => {
    let subdomain = props.currentUser?.user?.owner?.subdomain
    let lien = `ws://${subdomain}.lvh.me:3000/cable`
    const cable = RNActionCable.createConsumer(lien);
    const isFocused = useIsFocused();

    return (
        <SafeAreaView style={{flex: 1}}>
            <ActionCableProvider cable={cable}>
                <ChatList isFocused={isFocused}/>
            </ActionCableProvider>
        </SafeAreaView>
    );
}

const mps = (state) => {
    return {
        currentUser: state.currentUser
    }
}

export default connect(mps)(ChatRoom);
