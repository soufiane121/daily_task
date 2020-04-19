import React, { useState } from 'react';
import { View, Button, Platform, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Overlay } from "react-native-elements";
import { connect } from 'react-redux'


const Datee = (props) => {
  const [date, setDate] = useState(new Date(Date.now()));
  const [toggle, setToggle] = useState(false);
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    // setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  // console.log('daaaaaaaate first render',date);
  let time = date.toLocaleString().split(',')[1]
  let daate = date.toDateString()

  _DisplayCalneder = () => {
    return (
      <>
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={date}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
        <Button title="Set" onPress={_SetDate} />
      </>
    )
  }

  _SetDate = () => {
    setShow(false)
    setToggle(true)
  }

  return (
    <>
      <Overlay
        isVisible={show}
        onBackdropPress={() => setShow(false)}
        height={"35%"}
        width={"87%"}
        borderRadius={6}
        overlayBackgroundColor="#ececec"
        overlayStyle={{ marginBottom: -90 }}
      >
        <_DisplayCalneder />
      </Overlay>
      <TouchableOpacity onPress={() => setShow(true)}>
        {!toggle
          ?
          <Text style={styles.date}>date</Text>
          :
          <Text style={styles.dateExtand}> {date.toDateString() + " " + 'AT' + ' ' + date.toLocaleString().split(',')[1]}</Text>
        }
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  calendar: {
    height: 140
  },
  date: {
    backgroundColor: '#dee3e2',
    width: 105,
    height: 44,
    paddingHorizontal: 29,
    paddingVertical: 12,
    fontWeight: '500',
    fontSize: 14,
    color: 'grey',
  },
  dateExtand: {
    width: 144,
    height: 44,
    fontSize: 15,
    fontWeight: '500',
    backgroundColor: '#dee3e2',
    marginLeft: 1,
    paddingHorizontal: 13
  }
});
const mps = state => {
  return {
    displayDate: state.displayDate,
  }
}

const mpss = dispatch => {
  return {
    handleDisplayDate: () => {
      dispatch({ type: 'displayDate' })
    },
    handleDateTime: (e) => {
      dispatch({
        type: 'dateTime',
        payload: { dateTime: e }
      })
    }
  }
}


export default connect(mps, mpss)(Datee);