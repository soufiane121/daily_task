import React from 'react';
import {
    StyleSheet,
    WebView,
    Text,
    View,
    Button,
    SafeAreaView,
    FlatList,
    TouchableOpacity
} from 'react-native';
import HighchartsReactNative from '@highcharts/highcharts-react-native'
import { connect } from 'react-redux'
import Swipeable from "react-native-gesture-handler/Swipeable";



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

    deleteFunction = (id) => {
        let subdomain = this.props.currentUser.owner.subdomain
        fetch(`http://${subdomain}.lvh.me:3000/users/${id}`, {
            method: 'DELETE',
        })
        .then(resp=> resp.json())
        .then(data=> console.log('data back after delete', data)
        )
    }

    rightAction = (id) => {
        return (
            <TouchableOpacity onPress={() => this.deleteFunction(id)}>
                <Text style={{
                    backgroundColor: '#c70039', flex: 1, paddingVertical: 20, width: 70,
                    paddingLeft: 5, fontSize: 17,
                    color: '#f9f6f7',
                    fontWeight: '500',
                    borderRadius: 30,
                    marginVertical: 3,
                    flex: 1,

                }}

                >DELETE</Text>
            </TouchableOpacity>
        )
    }


    RenderSingleItem = ({ item }) => {
        return (
            <Swipeable renderRightActions={() => this.rightAction(item.id)}
            // onSwipeableRightOpen={onRightPress}
            >
                <View style={{ marginVertical: 4, paddingVertical: 20, borderBottomWidth: 0.3, marginHorizontal: 9 }} key={item.id}>
                    <Text style={{ fontWeight: '400', fontSize: 18, marginHorizontal: 9 }}>{`${item.first_name} ${item.last_name}`}</Text>
                </View>
            </Swipeable>
        )
    }

    UsersList = () => {
        return (
            <FlatList
                data={this.props.currentUser?.owner?.users}
                renderItem={({ item }) =>
                    <this.RenderSingleItem item={item}
                    // onRightPress={()=>{
                    //     console.log('you Swiped right');

                    // }}
                    />
                }
            />
        )
    }


    render() {
        // console.log(this.props.currentUser?.owner?.users);
        console.disableYellowBox = true

        let datta = {
            chartOptions: {
                // colors: ['yellowgreen', 'red', 'yello'],
                chart: {
                    plotBackgroundColor: '#f9f9f9',
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie',
                    marginTop: -10,

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
                    {this.UsersList()}
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