import React from 'react';
import { Text, View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import * as Animatable from 'react-native-animatable';



const Collapse = (props) => {

    return (
        <Collapsible collapsed={!props.selected} expandMultiple={false} >

        <Animatable.Text style={{ fontSize: 17, padding: -6, marginTop: 20, marginLeft: 5 }}
          animation='bounceIn'
          easing='ease'
          delay={400}
        >
          comming....</Animatable.Text>
      </Collapsible>
    )

}

export default Collapse;
