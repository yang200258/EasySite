import React, { Component } from 'react';
import {View,Text,StyleSheet,FlatList} from 'react-native';
import Colors from '../../utils/Colors';
import ClockDetailTag from './ClockDetailTag'
class ClockDetailContent extends Component {
    render() {
        return (
            <View style={styles.clockContent}>
                <View style={styles.leftWrapper}>
                    <View style={styles.dot}></View>
                    <View style={styles.line}></View>
                    <View style={styles.dot}></View>
                </View>
                <View>
                    <ClockDetailTag style={styles.space} data={{state:'签到',time:'08:23',location:'海南大厦25楼门口左'}}/>
                    <ClockDetailTag data={{state:'签退',time:'05:23',location:'海南大厦25楼门口左'}}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    clockContent:{
        flexDirection: 'row',
        height: 180,
    },
    leftWrapper:{
        width:30,
        height: 180,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        width:8,
        height:8,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        backgroundColor: Colors.mainColor,
    },
    line: {
        height: 106,
        width: 2,
        backgroundColor: '#ccc'
    },
    space: {
        marginBottom: 40
    }
})

export default ClockDetailContent;