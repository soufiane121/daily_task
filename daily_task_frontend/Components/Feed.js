import React, { useEffect } from "react";
import {
  View,
  AsyncStorage,
  StyleSheet,
  Platform,
  Image,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  FlatList,
  Animated,
  TouchableOpacity,
  TextInput
} from "react-native";
import { connect } from "react-redux";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Overlay, Text, Button } from "react-native-elements";
import Popup from "./OverLayy";
import Constants from "expo-constants";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { FontAwesome } from "@expo/vector-icons";
import UpdateOverlay from './UpdateOverlay'
import { useIsFocused} from '@react-navigation/native';



let owner = "";
let user = "";
let DATA = ''
let UserObject = null

const Feed = props => {
  // const isFocused = useIsFocused();
  

  const handleSendContent = () => {
    props.handleOverlay();
    let id = props.currentUser?.owner.id;
    let company = props.currentUser?.owner.subdomain;
    fetch(`http://${company}.lvh.me:3000/feeds`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        comment: props.FeedContent,
        owner_id: id
      })
    })
      .then(resp => resp.json())
      .then(data => { });
    props.handleFetch();
    props.handleContent();
  };

  useEffect(() => {
    if (props.currentUser?.hasOwnProperty("owner")) {
      id = props.currentUser.owner.id;
      company = props.currentUser.owner.subdomain;
    } else if (props.currentUser?.hasOwnProperty("user")) {
      UserObject = props.currentUser
      id = props.currentUser.user.owner.id;
      company = props.currentUser.user.owner.subdomain;
    }
    fetch(`http://${company}.lvh.me:3000/owners/${id}`)
      .then(resp => resp.json())
      .then(data => props.handleCurrentUser(data));
  }, [props.feedFetch, props.showSwipeButtons]);

  if (props.currentUser.hasOwnProperty("owner")) {
    owner = props.currentUser.owner.user_name.toUpperCase();
    DATA = props.currentUser.owner.feeds.reverse();
  } else if (props.currentUser.hasOwnProperty("user")) {
    user = props.currentUser.user.owner.user_name.toUpperCase();
  }

  const DeleteAction = arg => {
    let subdomain = props.currentUser.owner.subdomain;
    let id = arg.id;
    fetch(`http://${subdomain}.lvh.me:3000/feeds/${id}`, {
      method: "DELETE"
    })
      .then(resp => resp.json())
    props.handleFetch(true)
  };

  const UpdateAction = (feed) => {
    props.handleContent(feed.comment)
    props.handleUpdate()
    props.handleFeedCommentId(feed.id)

  };
  const handleSubmitUpdate = () => {
    let subdomain = props.currentUser.owner.subdomain
    fetch(`http://${subdomain}.lvh.me:3000/feeds/${props.FeedCommentId}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        comment: props.FeedContent,
        owner_id: props.currentUser.owner.id
      })
    })
      .then(resp => resp.json())
      .then(data => console.log('after send update', data)
      )
    props.handleFetch()
    props.handleUpdate()

  }
  const OnwerFeeds = ({ comment, DeleteAction, UpdateAction }) => {
    const LeftActions = (progress, dragX) => {
      return (
        <>
          {props.showSwipeButtons === true
            ?
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => UpdateAction(comment)}
                style={{
                  width: 90,
                  backgroundColor: "#00bdaa",
                  alignContent: "center",
                  alignItems: "center",
                  marginRight: 2
                }}
              >
                <Animated.Text style={styles.txtaction}>UPDATE</Animated.Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => DeleteAction(comment)}
                style={{
                  width: 90,
                  backgroundColor: "#d63447",
                  alignContent: "center",
                  alignItems: "center"
                }}
              >
                <Animated.Text style={styles.txtaction}>DELETE</Animated.Text>
              </TouchableOpacity>
            </View>
            :
            <Text></Text>
          }
        </>
      );
    };

    return (
      <View style={styles.card} key={comment.id}>
        <Swipeable renderRightActions={LeftActions}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../assets/mega.png")}
              style={styles.icon2}
            />
            <Text style={styles.content}>{owner === "" ? user : owner}</Text>
          </View>
          <View style={styles.header}></View>
        </Swipeable>
        <ImageBackground
          source={require("../assets/background.jpg")}
          style={styles.imgback}
          imageStyle={{ borderRadius: 4 }}
        >
          <Text style={styles.txtback}>{comment.comment}</Text>
        </ImageBackground>
      </View>
    );
  };

  return (
    <View style={styles.all}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <OnwerFeeds
            comment={item}
            DeleteAction={DeleteAction}
            UpdateAction={UpdateAction}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
      <Popup handleSendContent={handleSendContent} />
      <UpdateOverlay handleSubmitUpdate={handleSubmitUpdate} />
      {props.showButton === true ? (
        <Button
          style={styles.btn}
          icon={
            <AntDesign
              name="pluscircle"
              size={Platform.OS === "ios" ? 70 : 60}
              style={styles.icon}
            />
          }
          type="clear"
          onPress={props.handleOverlay}
        />
      ) : (
          <Text></Text>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  all: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  },
  imgback: {
    width: 361,
    height: 234,
    margin: 2
  },
  content: {
    fontSize: 17,
    // margin: 10,
    marginTop: 15
  },
  header: {
    borderBottomColor: "black",
    borderBottomWidth: 1
  },
  icon2: {
    margin: 5,
    flexDirection: "row",
    width: 40,
    height: 40
  },
  icon: {
    color: "#721b65",
    opacity: 0.8,
    width: 86,
    marginLeft: Platform.OS === "android" ? "82%" : "5%"
    // marginTop: Platform.OS === 'ios' ? '470%' : '40%',
    // zIndex: 1,
    // position:'absolute',bottom:0,alignSelf:'flex-end'
  },
  txt: {
    marginTop: "40%",
    borderColor: "red",
    borderWidth: 4,
    padding: "40%",
    alignSelf: "center"
  },
  btn: {
    width: 70,
    marginLeft: Platform.OS === "android" ? 80 : "81%"
  },
  img: {
    width: 90,
    height: 200,
    marginTop: "20%",
    marginLeft: 10,
    borderWidth: 5,
    borderColor: "red"
  },
  card: {
    borderWidth: 1,
    borderColor: "grey",
    marginTop: "10%",
    borderRadius: 9,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    shadowOpacity: 0.3,
    width: "98%",
    marginLeft: 3
  },
  txtback: {
    color: "#d7fffd",
    fontSize: 20,
    alignSelf: "center",
    fontWeight: "700",
    position: "absolute",
    margin: 6
  },
  txtaction: {
    color: "white",
    marginTop: 11,
    fontSize: 20
  },
  modal: {
    alignSelf: "center",
    width: "100%",
    opacity: 0.8
  },
  txt: {
    height: "30%",
    fontSize: Platform.OS === "ios" ? 20 : 22,
    alignSelf: "center"
  },
  txtinpit: {
    borderWidth: 1,
    height: "55%"
  }
});

const mps = state => {
  return {
    FeedContent: state.FeedContent,
    currentUser: state.currentUser,
    feedFetch: state.feedFetch,
    showButton: state.showButton,
    showSwipeButtons: state.showSwipeButtons,
    FeedCommentId: state.FeedCommentId
  };
};

const mpss = dispatch => {
  return {
    handleTabps: () => {
      dispatch({ type: "tabvisible" });
    },
    handleOverlay: () => {
      dispatch({ type: "overLay" });
    },
    handleFetch: (e) => {
      dispatch({ type: "feedFetch" });
    },
    handleContent: (e) => {
      dispatch({
        type: "FeedContent",
        playload: { FeedContent: e }
      });
    },
    handleCurrentUser: e => {
      dispatch({
        type: "current",
        payload: { currentUser: e }
      });
    },
    handleshowSwipeButtons: (e) => {
      dispatch({ type: 'showSwipeButtons' })
    },
    handleUpdate: () => {
      dispatch({ type: 'Update' })
    },
    handleFeedCommentId: (e) => {
      dispatch({
        type: 'FeedCommentId',
        playload: { FeedCommentId: e }
      })
    }
  };
};

export default connect(mps, mpss)(Feed);

