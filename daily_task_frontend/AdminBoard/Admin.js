import React from 'react';
import {
    StyleSheet,
    WebView,
    Text,
    View,
    Button,
    SafeAreaView
} from 'react-native';
import HighchartsReactNative from '@highcharts/highcharts-react-native'
import { connect } from 'react-redux'


const modules = [
    'highcharts-more',
    'solid-gauge'
];

let done = 0
let stuck = 0
let working = 0


class Admin extends React.Component {

    state = {
        done: 0,
        stuck: 0,
        working: 0
    }

    componentDidMount() {
        this.props.currentUser.owner.items.map((item, idx1) => {
            item.recipe.ingredients.forEach((ele, idx2) => {
                if (ele.status === 'Done') {
                    done += 1
                } else if (ele.status === 'Stuck') {
                    stuck += 1
                } else if (ele.status === 'Working on it') {
                    working += 1
                }
            });
            this.setState({ done: done, stuck: stuck, working: working })
        })
    }


    render() {

        let datta = {
            chartOptions: {
                // colors: ['yellowgreen', 'red', 'yello'],
                chart: {
                    plotBackgroundColor: '#f9f9f9',
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie',
                    marginTop: -60,
                    
                },
                title: {
                    text: 'Users Tasks Progress'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                accessibility: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                series: [{
                    name: 'Percentage',
                    colorByPoint: true,
                    data: [{
                        name: 'Done',
                        y: this.state.done,
                        sliced: true,
                        selected: true,
                        
                    }, {
                        name: 'Stuck',
                        y: this.state.stuck
                    }, {
                        name: 'Wroking on it',
                        y: this.state.working
                    }]
                }]
            }
        }

        return (
            <>
                <SafeAreaView>
                    <HighchartsReactNative
                        styles={styles.container}
                        options={datta.chartOptions}
                        useSSL={true}
                        useCDN={true}
                        modules={modules}
                    />
                </SafeAreaView>
                <View style={{ flex: 2 }}>
                    <Text>Here</Text>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        height: 349,
    }
});

const mps = (state) => {
    return {
        currentUser: state.currentUser
    }
}

export default connect(mps)(Admin)