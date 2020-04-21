import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Tooltip } from 'react-native-elements'
import {connect} from 'react-redux'



const Status = (props) => {
    console.disableYellowBox = true
    const [working, setWorking] = useState(false)
    const [stucking, setStucking] = useState(false)
    const [done, setDone] = useState(false)

    const handleWorking = () => {
        setWorking(true)
        setStucking(false)
        setDone(false)
        props.fetchStatus('Working on it')
    }

    const handleStucking = () => {
        setStucking(true)
        setWorking(false)
        setDone(false)
        props.fetchStatus('Stuck')
    }

    const handleDone = () => {
        setDone(true)
        setWorking(false)
        setStucking(false)
        props.fetchStatus('Done')
    }

    const styling = () => {
        if (props.elementStatus === 'Done') {
            return styles.txtDone
        } else if (props.elementStatus === 'Stuck') {
            return styles.txtStuck
        } else if (props.elementStatus === 'Working on it'){
            return styles.txtWork
        } else {
            return styles.txt
        }
    }

    const handlSingle = () => {  
        if (!stucking && !working && !done ) {
            return (
                props.elementStatus === undefined || props.elementStatus?.length === 0 || props.elementStatus === null
                    ?
                    <Text style={styles.txt}>Status</Text>
                    :
                    <Text style={styling()}>{props.elementStatus}</Text>
                   )
        } else if (stucking) {
            return <Text style={styles.txtStuck}>Stuck</Text>
        } else if (working && !stucking) {
            return <Text style={styles.txtWork}>Working on it</Text>
        } else if (done && !stucking && !working) {
            return <Text style={styles.txtDone}>Done</Text>
        } else {
           return <Text style={styling()}>Status</Text>
        }
    }

    const StatusChoose = () => {
        return (
            <View style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={handleWorking}>
                    <Text style={styles.working}>Working on it</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={handleStucking}>
                    <Text style={styles.stuck}>Stuck</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={handleDone}>
                    <Text style={styles.done}>Done</Text>
                </TouchableWithoutFeedback>
            </View>
        )
    }

    return (
        <View style={styles.container} >
            <Tooltip
                withPointer={true}
                popover={<StatusChoose />}
                width={200}
                height={140}
                containerStyle={styles.toptip}
                pointerColor='#f2f2f2'
                overlayColor="transparent"
            >
            {handlSingle()}
            </Tooltip>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        fontSize: 17,
        // margin: 1,
        backgroundColor: '#dee3e2',
        width: 99,
        marginLeft: 2,
        marginRight: 1
    },
    txt: {
        alignSelf: 'center',
        marginTop: 11,
        color: 'grey',
        fontWeight: '500'
    },
    toptip: {
        backgroundColor: '#f4f9f4',
    },
    working: {
        width: 190,
        height: 40,
        backgroundColor: '#f8a978',
        paddingVertical: 8,
        paddingLeft: 35,
        color: '#ecfcff',
        fontWeight: '500',
        fontSize: 19,
        marginBottom: 2
    },
    txtWork: {
        backgroundColor: '#f8a978',
        height: 44,
        paddingVertical: 10,
        fontWeight: '600',
        fontSize: 15,
        color: '#ecfcff',
        paddingHorizontal: 1
    },
    stuck: {
        backgroundColor: '#c70039',
        height: 40,
        color: '#ecfcff',
        fontSize: 17,
        fontWeight: '600',
        paddingHorizontal: 70,
        paddingVertical: 9,
        marginBottom: 2
    },
    txtStuck: {
        backgroundColor: '#c70039',
        height: 44,
        color: '#ecfcff',
        fontSize: 17,
        fontWeight: '600',
        paddingVertical: 9,
        paddingHorizontal: 19
    },
    done: {
        height: 40,
        backgroundColor: 'green',
        color: '#ecfcff',
        fontSize: 17,
        fontWeight: '600',
        paddingHorizontal: 70,
        paddingVertical: 9,
        marginBottom: 2
    },
    txtDone: {
        backgroundColor: 'green',
        height: 44,
        color: '#ecfcff',
        fontSize: 17,
        fontWeight: '600',
        paddingVertical: 9,
        paddingHorizontal: 22
    }
});

const mpts = (state) => {
    return {
    status: state.status
    }
}

const mstd = (dispatch) => {
    return {
        handleStatus: (e) => {
            dispatch({
                type: 'status',
                payload: { status: e }
            })
        }
    }
}



export default connect(mpts, mstd)(Status)
// export default Status


// const styling = () => {
//     if (props.elementStatus === 'Done') {
//         return styles.txtDone
//     } else if (props.elementStatus === 'Stuck') {
//         return styles.txtStuck
//     } else {
//         return styles.txtWork
//     }
// }

// const handlSingle = () => {
//     console.log('Done', done, 'working', working, 'stuck', stucking);
//     // console.log('props.elementStatus',props.status);

//     if (!stucking && !working && !done) {
//         return (
//             props.elementStatus === undefined
//                 ?
//                 <Text style={styles.txt}>Status</Text>
//                 :
//                 <Text style={styling()}>{props.elementStatus}</Text>


//         )
//     } else if (stucking) {
//         return <Text style={styles.txtStuck}>Stuck</Text>
//     } else if (working && !stucking) {
//         return <Text style={styles.txtWork}>Working on it</Text>
//     } else if (done && !stucking && !working) {
//         return <Text style={styles.txtDone}>Done</Text>
//     }
