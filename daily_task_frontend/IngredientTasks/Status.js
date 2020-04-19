import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Tooltip } from 'react-native-elements'
import Datee from '../IngredientTasks/Datee'




const Status = () => {
    console.disableYellowBox = true
    const [working, setWorking] = useState(false)
    const [stucking, setStucking] = useState(false)
    const [done, setDone] = useState(false)


    const handleWorking = () => {
        setWorking(true)
        setStucking(false)
        setDone(false)
    }

    const handleStucking = () => {
        setStucking(true)
        setWorking(false)
        setDone(false)
    }

    const handleDone = () => {
        setDone(true)
        setWorking(false)
        setStucking(false)
    }

    const handlSingle = () => {
        if (!stucking && !working && !done) {
            return <Text style={styles.txt}>Status</Text>
        } else if (stucking) {
            return <Text style={styles.txtStuck}>Stuck</Text>
        } else if (working && !stucking) {
            return <Text style={styles.txtWork}>Working on it</Text>
        } else if (done && !stucking && !working) {
            return <Text style={styles.txtDone}>Done</Text>
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
        margin: 1,
        backgroundColor: '#dee3e2',
        width: 95,
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
        height: 40,
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
        height: 40,
        color: '#ecfcff',
        fontSize: 17,
        fontWeight: '600',
        paddingVertical: 9,
        paddingHorizontal: 22
    }
});




export default Status
