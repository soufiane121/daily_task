import React, { createRef } from 'react';
import { Text, View, Button, AsyncStorage, StyleSheet, ImageBackground, ScrollView, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { ActionCableConsumer } from 'react-actioncable-provider'
import { connect } from 'react-redux'
import moment from 'moment'
import { FontAwesome } from "@expo/vector-icons";


let DATA = []

class ChatList extends React.Component {

    state = {
        messages: [],
        input: '',

    }

    scrollToEnd = () => {
        this.scrollView.scrollToEnd(animated = true)
    };


    componentDidMount = async () => {
        let subdomain = this.props.currentUser?.user?.owner?.subdomain
        fetch(`http://${subdomain}.lvh.me:3000/messages`)
            .then(resp => resp.json())
            .then(data => this.setState({ messages: [...data] })
            )
    }

    createMessages = () => {
        this.createOrFindChat
        let subdomain = this.props.currentUser?.user?.owner?.subdomain
        fetch(`http://${subdomain}.lvh.me:3000/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                content: this.state.input,
                user_id: this.props.currentUser?.user?.id,
                chat_id: 1
            })
        })
            .then(resp => resp.json())
        // .then(data=> this.setState({messages: [...data]}))
        this.setState({ input: '' })
    }



    createOrFindChat = async () => {
        let subdomain = this.props.currentUser?.user?.owner?.subdomain
        await fetch(`http://${subdomain}.lvh.me:3000/chats`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                name: 'test'
            })
        })
    }

    chatScreenMessages = () => {
        let currenId = this.props.currentUser?.user?.id
        return this.state.messages.map((message, idx) => {
            let even = (idx % 2 === 0)
            let time = new Date(message.created_at)
            return (
                <View style={even} key={message.id}>
                    <View style={currenId === message.user_id ? styles.textEven : styles.textOdd}>
                        <Text style={{ fontSize: 15, paddingLeft: 4, paddingTop: 2 }}>{message.content}</Text>
                    </View>
                    <Text style={currenId === message.user_id ? styles.timeEven : styles.timeOdd}>
                        {moment(time).format('LT')}</Text>
                </View>
            )
        })
    }

    handleChange = (e) => {
        this.setState({
            input: e.nativeEvent.text
        })

    }


    render() {
        console.disableYellowBox = true
        return (
            <View style={{ flex: 1 }}>
                <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset="40">
                    <ActionCableConsumer
                        channel={{ channel: 'ChatChannel' }}
                        onReceived={(backArg) => {
                            this.setState({ messages: [...this.state.messages, ...[backArg]] })
                        }}
                    >
                        <ImageBackground source={require("../assets/backgroundChat.jpg")} style={{ width: '100%', height: '100%', }}>
                            <ScrollView
                                ref={(scrollView) => { this.scrollView = scrollView }}
                                contentContainerStyle={{ paddingBottom: 120 }}
                                onContentSizeChange={() => {
                                    this.scrollView.scrollToEnd({ animated: false, index: -1 });
                                }}
                            >
                                {this.chatScreenMessages()}
                            </ScrollView>
                            <View style={{ flexDirection: 'row', backgroundColor: '#f4f3f3', height: 50, marginHorizontal: 4, marginVertical: 2, borderRadius: 20 }}>
                                <TextInput placeholder="Whrite something"
                                    multiline={true} autoCorrect
                                    style={{ width: 300, borderRadius: 10, paddingHorizontal: 9, paddingTop: 15, fontSize: 14 }}
                                    onChange={this.handleChange}
                                    value={this.state.input}
                                />
                                <TouchableOpacity style={{ marginTop: 5 }} onPress={this.createMessages} >
                                    {/* <Button title="Send" onPress={this.createMessages} /> */}
                                    <FontAwesome name='send-o' style={styles.icon}/>
                                </TouchableOpacity>
                            </View>

                        </ImageBackground>
                    </ActionCableConsumer>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textEven: {
        marginLeft: '64%',
        backgroundColor: '#dbdbdb',
        marginVertical: 28,
        width: 130,
        height: 40,
        borderRadius: 9

    },
    textOdd: {
        backgroundColor: '#dbdbdb',
        marginVertical: 28,
        width: 130,
        height: 40,
        borderRadius: 9,
        marginLeft: 3
    },
    txtCont: {
        color: 'red'
    },
    timeEven: {
        width: 120,
        marginTop: -24,
        marginLeft: '84%',
        fontSize: 13

    },
    timeOdd: {
        width: 120,
        marginTop: -24,
        fontSize: 13,
        marginLeft: 2
    },
    icon:{
        fontSize: 25,
       marginLeft: 25,
       marginTop:8,
       color: '#0779e4'
    }
});


const mps = (state) => {
    return {
        currentUser: state.currentUser
    }
}

const mpss = () => {
    return {

    }
}

export default connect(mps)(ChatList);
