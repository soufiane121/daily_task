import React, { Component } from "react";
import { Overlay, Text, Button } from "react-native-elements";
import { View, TextInput, StyleSheet, Platform } from "react-native";
import { connect } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";

const Overlayy = props => {

  const onClose = () => {
    props.handleOverlay();
  };

  return (
    <Overlay
      isVisible={props.overLay}
      onBackdropPress={() => onClose()}
      height={"40%"}
      width={"87%"}
      borderRadius={6}
      overlayBackgroundColor="#f4f3ec"
    >
      <>
        <View style={styles.modal}>
          <Text style={styles.txt}>Post Your Annocement</Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={styles.txtinpit}
            placeholderTextColor="black"
            autoCorrect
            placeholder="Enter Your Post Here"
            value={props.FeedContent}
            onChange={props.handleContent}
          />
        </View>
        <Button
          icon={
            <FontAwesome
              name="send"
              size={20}
              color="white"
              style={{ marginRight: 7 }}
            />
          }
          title="Post"
          onPress={props.handleSendContent}
        />
      </>
    </Overlay>
  );
};

const styles = StyleSheet.create({
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
    overLay: state.overLay,
    FeedContent: state.FeedContent
  };
};

const mpss = dispatch => {
  return {
    handleOverlay: () => {
      dispatch({ type: "overLay" });
    },
    handleContent: e => {
      dispatch({
        type: "FeedContent",
        playload: { FeedContent: e.nativeEvent.text }
      });
    }
  };
};

export default connect(mps, mpss)(Overlayy);
