import React, { Component } from 'react';
import { Text, View,Button,StyleSheet,TouchableOpacity,Alert,ScrollView,StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import Clendar from '../../components/Calendar';
import Colors from '../../utils/Colors';
import utils from '../../utils/utils';
import NavigationBar from '../../components/NavigationBar';
// 悬浮按钮组件
import ActionButton from 'react-native-action-button';


class ClockPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            day:null,
        }
      }
    renderMessageButton = () => {
        return <TouchableOpacity 
            onPress={() => {
                Alert.alert('进入消息提示页面！')
            }} style={styles.messageContainer}>
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
            <View style={styles.clockContainer} screenProps={{day:this.state.day}}>
                {navigationBar}
                {/* 日历区域 */}
                {/* <View><Clendar markedDay={markedDay} setMarkedDates={this.setMarkedDates} day={this.state.day}></Clendar></View> */}
                {/* 打卡区域 */}
                <View style={styles.clockFingerContainer}>
                    <ActionButton
                        buttonColor={Colors.mainColor}
                        onPress={() => { navigation.navigate('ClockPageDetail')}}
                        renderIcon={() => (<View><Ionicons name={'md-finger-print'} size={30} style={styles.iconStyle}></Ionicons>
                            <Text style={styles.clockText}>打卡</Text>
                        </View>)}
                    />
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
    iconStyle: {
        color: '#fff',
    },
    clockText: {
        color:'#fff',
        fontSize:12,
    },
    messageContainer:{

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