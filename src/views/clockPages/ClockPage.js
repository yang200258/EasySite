import React, { Component } from 'react';
import {  Text,View,StyleSheet,TouchableOpacity,Alert,ScrollView,StatusBar,Platform,PermissionsAndroid } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import Clendar from '../../components/Calendar';
import Colors from '../../utils/Colors';
import utils from '../../utils/utils';
import NavigationBar from '../../components/common/NavigationBar';
import {  IconButton } from 'react-native-paper';
import NavigationUtil from '../../navigator/NavigationUtil'
import LoadingIndicator from '../../components/common/LoadingIndicator'
import BackBase from '../../components/common/BackBase'
import {NavigationActions} from "react-navigation";
import {connect} from 'react-redux';
//获取经纬度
// import Geolocation from 'react-native-geolocation-service';
// import Geolocation from "Geolocation"
class ClockPage extends Component {
    constructor(props) {
        super(props)
        this.backPress = new BackBase({backPress: this.onBackPress})
        this.state = {
            loading: false
        }
    }
    componentDidMount() {
        this.backPress.componentDidMount()
    }
    componentWillUnmount() {
        this.backPress.componentWillUnmount()
    }
    onBackPress = () => {
        const { dispatch, nav } = this.props;
        if (nav.routes[1].index === 0) {
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
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
    _handleColock = async () => {
        this.setLoading(true)
        await this._getPermission()
        this.setLoading(false)
        NavigationUtil.go('ClockPageDetail')
    }
    _getPermission = () => {
        if (Platform.OS === 'android' && Platform.Version >= 23) {
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                if (result) {
                  console.log("Permission is OK");
                } else {
                  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                    if (result) {
                      console.log("User accept");
                    } else {
                      console.log("User refuse");
                    }
                  });
                }
          });
        }
    }
    setLoading = (val) => {
        this.setState({loading: val})
    }
    onRequestClose = () => {
        this.setState({loading: false})
    }
    render() {
        let Loading = this.state.loading ? <LoadingIndicator loading={this.state.loading} onRequestClose={this.onRequestClose} /> : null
        let statusBar = {
            hide: true,
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
                {Loading}
                {/* 日历区域 */}
                {/* <View><Clendar markedDay={markedDay} setMarkedDates={this.setMarkedDates} day={this.state.day}></Clendar></View> */}
                {/* 打卡区域 */}
                <View style={styles.clockFingerContainer}>
                    <TouchableOpacity style={styles.clockFingerWrapper} onPress={() => { this._handleColock()}}>
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

const mapStateToProps = state => ({
    nav: state.nav
})
export default connect(mapStateToProps)(ClockPage)