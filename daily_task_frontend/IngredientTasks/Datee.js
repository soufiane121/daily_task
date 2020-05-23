import React, { useState } from 'react';
import { View, Button, Platform, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Overlay } from "react-native-elements";
import { connect } from 'react-redux'
import moment from 'moment'


const Datee = (props) => {
  const [date, setDate] = useState(new Date(Date.now()));
  const [toggle, setToggle] = useState(false);
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
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
    props.fetchDatePost(date)
  }


  
  let newDate = new Date(moment(props.elementDate))
let strDate = moment(props.elementDate).format("d MMM YYYY")

  const formatAMPM = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  
  _Toggling = () => {

    if (!toggle && props.elementDate === undefined  ) {
      return <Text style={styles.date}>Date</Text>
    } else if (props.elementDate && !toggle) {
      return <Text style={styles.dateExtand}>{strDate + " " + "AT" + " " + formatAMPM(newDate)}</Text>
    } else {
      return <Text style={styles.dateExtand}> {date.toDateString() + " " + 'AT' + ' ' + date.toLocaleString().split(',')[1]}</Text>
    }
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
        {_Toggling()}
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