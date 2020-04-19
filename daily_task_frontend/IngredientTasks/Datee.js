import React, {useState} from 'react';
import {View, Button, Platform, Text, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Overlay} from "react-native-elements";
import {connect} from 'react-redux'


const Datee = (props) => {
  
  
  const [date, setDate] = useState(new Date(Date.now()));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    // setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  // console.log(date);
let time  = date.toLocaleString().split(',')[1]
let daate = date.toDateString()

_Displaying=()=>{
  props.handleDisplayDate()
  props.handleDateTime(date)
}

  return (
    <Overlay
      isVisible={props.displayDate}
      onBackdropPress={() => props.handleDisplayDate()}
      height={"35%"}
      width={"87%"}
      borderRadius={6}
      overlayBackgroundColor="#ececec"
      overlayStyle={{marginBottom: -90}}
    >
    <View >
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={date}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
        <Button title="Set" onPress={_Displaying}/>
    </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  calendar:{
    height: 140
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
      handleDateTime:(e)=>{
        dispatch({
          type: 'dateTime',
          payload: {dateTime: e}
        })
      }
    }
}


export default connect(mps,mpss)(Datee);