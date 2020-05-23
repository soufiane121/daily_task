import React, { createRef } from "react";
import {
	Text,
	View,
	Button,
	AsyncStorage,
	StyleSheet,
	ImageBackground,
	ScrollView,
	TextInput,
	KeyboardAvoidingView,
	TouchableOpacity,
	PickerIOSComponent,
} from "react-native";
import { ActionCableConsumer } from "react-actioncable-provider";
import { connect } from "react-redux";
import moment from "moment";
import { FontAwesome } from "@expo/vector-icons";

let DATA = [];

class ChatList extends React.Component {
	state = {
		messages: [],
		input: "",
	};

	scrollToEnd = () => {
		this.scrollView.scrollToEnd((animated = true));
	};

	componentDidMount = async () => {
		let subdomain = this.props.currentUser?.user?.owner?.subdomain;
		fetch(`http://${subdomain}.lvh.me:3000/messages`)
			.then((resp) => resp.json())
			.then((data) => this.setState({ messages: [...data] }));
	};

	createMessages = async () => {
		await this.createOrFindChat();
		let subdomain = this.props.currentUser?.user?.owner?.subdomain;
		fetch(`http://${subdomain}.lvh.me:3000/messages`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				content: this.state.input,
				user_id: this.props.currentUser?.user?.id,
				chat_id: 1,
				owner_id:
					this.props.currentUser?.user?.owner?.id ||
					this.props.currentUser?.owner?.id,
			}),
		}).then((resp) => resp.json());
		// .then(data=> this.setState({messages: [...data]}))
		this.setState({ input: "" });
	};

	createOrFindChat = async () => {
		let subdomain = this.props.currentUser?.user?.owner?.subdomain;
		await fetch(`http://${subdomain}.lvh.me:3000/chats`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				name: "test",
			}),
		});
	};

	chatScreenMessages = () => {
		let currenId = this.props.currentUser?.user?.id;
		return this.state.messages.map((message, idx) => {
			let even = idx % 2 === 0;
			let time = new Date(message.created_at);
			return (
				<View key={message.id}>
					<View
						style={
							currenId === message.user_id ? styles.textEven : styles.textOdd
						}
					>
						<Text
							style={{
								fontSize: 15,
								paddingLeft: 4,
								paddingTop: 2,
								fontWeight: "500",
							}}
						>
							{message.content}
						</Text>
					</View>
					<Text
						style={
							currenId === message.user_id ? styles.timeEven : styles.timeOdd
						}
					>
						{moment(time).format("LT")}
					</Text>
				</View>
			);
		});
	};

	handleChange = (e) => {
		this.setState({
			input: e.nativeEvent.text,
		});
	};

	render() {
		console.disableYellowBox = true;
		return (
			<View style={{ flex: 1 }}>
				<KeyboardAvoidingView behavior="padding" keyboardVerticalOffset="40">
					<ActionCableConsumer
						channel={{ channel: "ChatChannel" }}
						onReceived={(backArg) => {
							this.setState({
								messages: [...this.state.messages, ...[backArg]],
							});
						}}
					>
						<ImageBackground
							source={require("../assets/backgroundChat.jpg")}
							style={{ width: "100%", height: "100%" }}
						>
							<ScrollView
								ref={(scrollView) => {
									this.scrollView = scrollView;
								}}
								showsVerticalScrollIndicator={false}
								contentContainerStyle={{ paddingBottom: 120 }}
								onContentSizeChange={() => {
									this.scrollView.scrollToEnd({ animated: false, index: -1 });
								}}
							>
								{this.chatScreenMessages()}
							</ScrollView>
							<View
								style={{
									flexDirection: "row",
									backgroundColor: "#f4f3f3",
									height: 50,
									marginHorizontal: 4,
									marginVertical: 2,
									borderRadius: 20,
								}}
							>
								<TextInput
									placeholder="Whrite something"
									multiline={true}
									autoCorrect
									style={{
										width: 300,
										borderRadius: 10,
										paddingHorizontal: 9,
										paddingTop: 15,
										fontSize: 14,
									}}
									onChange={this.handleChange}
									value={this.state.input}
								/>
								<TouchableOpacity
									style={styles.iconCont}
									onPress={this.createMessages}
								>
									{/* <Button title="Send" onPress={this.createMessages} /> */}
									<FontAwesome name="send-o" style={styles.icon} />
								</TouchableOpacity>
							</View>
						</ImageBackground>
					</ActionCableConsumer>
				</KeyboardAvoidingView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	textEven: {
		marginLeft: "44%",
		backgroundColor: "#639a67",
		marginVertical: 28,
		// width: 130,
		minWidth: 190,
		width: "auto",
		height: "auto",
		minHeight: 40,
		borderRadius: 9,
	},
	textOdd: {
		backgroundColor: "#d8ebb5",
		marginVertical: 28,
		width: 190,
		height: "auto",
		borderRadius: 9,
		marginLeft: 3,
		minHeight: 40,
	},
	timeEven: {
		width: 120,
		marginTop: -24,
		marginLeft: "84%",
		fontSize: 13,
	},
	timeOdd: {
		width: 120,
		marginTop: -24,
		fontSize: 13,
		marginLeft: 2,
	},
	icon: {
		fontSize: 25,
		marginLeft: 2,
		marginTop: 6,
		marginLeft: 5,
		color: "#512b58",
	},
	iconCont: {
		marginTop: 5,
		backgroundColor: "#85a392",
		marginLeft: 25,
		height: 40,
		marginTop: 6,
		width: 40,
		borderRadius: 20,
	},
});

const mps = (state) => {
	return {
		currentUser: state.currentUser,
	};
};

const mpss = () => {
	return {};
};

export default connect(mps)(ChatList);
