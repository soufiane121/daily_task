import React from 'react';
import { Text, View, Button, AsyncStorage, StyleSheet, ImageBackground, ScrollView, TextInput,KeyboardAvoidingView } from 'react-native';
import { ActionCableConsumer } from 'react-actioncable-provider'
import { connect } from 'react-redux'
import moment from 'moment'

let DATA = []

class ChatList extends React.Component {
    // isFocused = useIsFocused();

    state = {
        messages: [],
        input: ''
    }
    scrollToEnd = () => {
        this.scrollView.scrollToEnd();
      }

    componentDidMount = async () => {
        let subdomain = this.props.currentUser?.user?.owner?.subdomain
        fetch(`http://${subdomain}.lvh.me:3000/messages`)
            .then(resp => resp.json())
            .then(data => this.setState({ messages: [...data] })
            )
    }

    createMessages = () => {
        // this.createOrFindChat
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
            .then(data=> this.setState({messages: [...data]})
            )
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
        // let strDate = moment(props.elementDate).format("d MMM YYYY")

        return this.state.messages.map((message, idx) => {
            let even = (idx % 2 === 0)
            let time = moment(message.create_at).format('LT')
            return (
                <View style={even}>
                    <View style={even ? styles.textEven : styles.textOdd}>
                        <Text style={{ fontSize: 15, paddingLeft: 4, paddingTop: 2 }}>{message.content}</Text>
                    </View>
                    <Text style={even ? styles.timeEven : styles.timeOdd}>
                        {time}</Text>
                </View>
            )
        })
    }

    handleChange = (e) => {
        console.log(e.nativeEvent.text);
        this.setState({
            input: e.nativeEvent.text
        })
        
    }


    render() {
// console.log(this.state.messages[0]);

        return (
            <View style={{ flex: 1 }}>
                <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset= "40">
                <ActionCableConsumer
                    channel={{ channel: 'ChatChannel' }}
                    onReceived={(backArg) => {
                        // console.log("what come back from server", backArg);
                        this.setState({messages: [...this.state.messages, ...[backArg]]})
                    }}
                >
                    <ImageBackground source={require("../assets/backgroundChat.jpg")} style={{ width: '100%', height: '100%', }}>
                        <ScrollView 
                        ref={(scrollView) => { this.scrollView = scrollView }}
                        contentContainerStyle={{paddingBottom: 120}}
                        >
                            {this.chatScreenMessages()}
                        </ScrollView>
                        <View style={{ flexDirection: 'row', backgroundColor: 'grey', height: 50, borderTopRightRadius: 5, borderTopLeftRadius: 5 }}>
                            <TextInput placeholder="HERE"
                                multiline={true} autoCorrect
                                style={{ width: 320, borderRadius: 10 }} placeholderTextColor='red'
                                onChange={this.handleChange}
                                value={this.state.input}
                                // autoFocus={true}
                            />
                            <Button title="Send" onPress={this.createMessages}/>
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
