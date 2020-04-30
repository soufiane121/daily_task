import React from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import Video from 'react-native-video'

const Streaming = () => {
return (
    // <SafeAreaView>
        // <Text>Streaming</Text>
        <Video 
        onLoadStart={{
            isNetwork: true,
            type: '',
            uri: 'http://links.iptvlogin.com:80/live/jfhsdjfhskj/987321/153884.m3u8'
        }}
        />
    // </SafeAreaView>
);
}

export default Streaming;
