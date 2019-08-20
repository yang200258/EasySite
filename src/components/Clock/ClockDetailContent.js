import React, { Component } from 'react';
import {View,Text,StyleSheet,FlatList} from 'react-native';
import Colors from '../../utils/Colors';
import ClockDetailTag from './ClockDetailTag'
class ClockDetailContent extends Component {
    render() {
        let {clockData} = this.props
        clockData.forEach((item,index) => {
            item.time = item.happenedTime.split('T')[1].split(':')[0] + ':' + item.happenedTime.split('T')[1].split(':')[1]
            item.state = (index == 0 && item.happenedTime <= item.scheduleStart) ? '签到' : 
                            (index == 0 && item.happenedTime > item.scheduleStart) ? '迟到' :
                                (index == 1 && item.happenedTime >= item.scheduleEnd) ? '签退' : 
                                    (index == 1 && item.happenedTime < item.scheduleEnd) ? '记录' : null
        })
        return (
            <View style={styles.clockContent}>
                <View style={styles.leftWrapper}>
                    <View style={styles.dot}></View>
                    <View style={styles.line}></View>
                    <View style={styles.dot}></View>
                </View>
                <View style={styles.rightWrapper}>
                    <ClockDetailTag data={{state:clockData[0].state,time:clockData[0].time,address:clockData[0].address}}/>
                    <View style={styles.space}/>
                    <ClockDetailTag data={{state:clockData[1].state,time:clockData[1].time,address:clockData[1].address}}/>
                    <Text style={styles.tipText}>以最晚的打卡为准，后一条签退记录会覆盖前一条</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    clockContent:{
        flexDirection: 'row',
        height: 180,
        width: '100%',
    },
    leftWrapper:{
        width:30,
        height: 180,
        marginLeft:20,
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
        backgroundColor: '#ddd'
    },
    space: {
        height: 40
    },
    tipText: {
        fontSize: 10,
        marginLeft: 30,
        color: '#aaa'
    },
    rightWrapper:{
        width: '100%'
    }
})

export default ClockDetailContent;