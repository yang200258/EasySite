import React, { Component } from 'react';
import { Text, View,Button,StyleSheet,TouchableOpacity,Alert,ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Clendar from '../../components/Calendar'
import Colors from '../../utils/Colors';
import utils from '../../utils/utils'
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
                {/* 日历区域 */}
                <View><Clendar markedDay={markedDay} setMarkedDates={this.setMarkedDates} day={this.state.day}></Clendar></View>
                {/* 打卡区域 */}
                <View style={styles.clockFingerContainer}>
                    <TouchableOpacity style={styles.clockFinger} onPress={() => {
                        navigation.navigate('ClockPageDetail')
                    }}>
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
        right: 0
    },  
    clockFinger: {
        backgroundColor: Colors.mainColor,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius:50,
    },
    iconStyle: {
        color: '#fff',
    },
    clockText: {
        color:'#fff',
        fontSize:12,
    }
})
export default ClockPage