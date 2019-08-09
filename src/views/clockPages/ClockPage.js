import React, { Component } from 'react';
import {  Text,View,StyleSheet,TouchableOpacity,Alert,ScrollView,StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import Clendar from '../../components/Calendar';
import Colors from '../../utils/Colors';
import utils from '../../utils/utils';
import NavigationBar from '../../components/NavigationBar';
import {  IconButton } from 'react-native-paper';


class ClockPage extends Component {
    constructor(props) {
        super(props);
      }
    renderMessageButton = () => {
        return <TouchableOpacity 
            onPress={() => {
                Alert.alert('进入消息提示页面！')
            }}>
                <EvilIcons name={'bell'} size={30} style={styles.messageIcon}></EvilIcons>
                <Text style={styles.messageNum}>{3}</Text>
        </TouchableOpacity>
    }
    render() {
        const {navigation} = this.props
        let statusBar = {
            barStyle: 'dark-content',
            backgroundColor: Colors.navColor,
        }
        let navigationBar = <NavigationBar 
            title={'考勤'} 
            statusBar={statusBar}
            rightButton={this.renderMessageButton()} 
            />
        return (
            <View style={styles.clockContainer}>
                {navigationBar}
                {/* 日历区域 */}
                {/* <View><Clendar markedDay={markedDay} setMarkedDates={this.setMarkedDates} day={this.state.day}></Clendar></View> */}
                {/* 打卡区域 */}
                <View style={styles.clockFingerContainer}>
                    <TouchableOpacity style={styles.clockFingerWrapper} onPress={() => { navigation.navigate('ClockPageDetail')}}>
                        <Ionicons name={'md-finger-print'} size={30} style={styles.iconStyle}></Ionicons>
                        <Text style={styles.clockText}>打卡</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    clockContainer:{
        height: '100%',
    },
    clockFingerContainer:{
        width: 100,
        height: 100, 
        position: 'absolute',
        bottom: 0,
        right: 0,
    }, 
    clockFingerWrapper:{
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.mainColor,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    iconStyle: {
        color: '#fff',
    },
    clockText: {
        color:'#fff',
        fontSize:12,
    },
    messageIcon: {
        color: Colors.mainColor
    },
    messageNum: {
        width:16,
        height:16,
        fontSize: 10,
        textAlign: 'center',
        color: '#fff',
        position: 'absolute',
        right:-4,
        top: -4,
        backgroundColor: 'red',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    }

})
export default ClockPage