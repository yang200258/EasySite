import React, { Component } from 'react';
import { Text, View,Button,StyleSheet,TouchableOpacity,Alert,ScrollView,StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Clendar from '../../components/Calendar';
import Colors from '../../utils/Colors';
import utils from '../../utils/utils';
// 悬浮按钮组件
import ActionButton from 'react-native-action-button';


class ClockPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            day:null,
        }
      }
    markedStyle = {selected: true, marked: true, selectedColor: Colors.mainColor,dotColor: 'red'}
    setMarkedDates = (day) => {
        this.setState({day: day.dateString})
    }
    componentDidMount = () => {
        const day = new Date()
        this.setState({day:utils.formatDate(day)})
    }
    render() {
        const {navigation} = this.props
        const markedDay = {}
        markedDay[this.state.day] = this.markedStyle
        return (
            <View style={styles.clockContainer} screenProps={{day:this.state.day}}>
                <StatusBar backgroundColor="blue" barStyle="light-content" hidden={true}/>
                {/* 日历区域 */}
                <View><Clendar markedDay={markedDay} setMarkedDates={this.setMarkedDates} day={this.state.day}></Clendar></View>
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
})
export default ClockPage