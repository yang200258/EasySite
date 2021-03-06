import React, { Component } from 'react';
import { Text, View,Image,NativeModules,NativeEventEmitter,Platform,PermissionsAndroid,StyleSheet,TouchableOpacity,InteractionManager} from 'react-native';
import {Divider} from 'react-native-paper'
import AntDesign from 'react-native-vector-icons/AntDesign'
import ClockDetailContent from '../../components/Clock/ClockDetailContent'
import Colors from '../../utils/Colors';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import BackBase from '../../components/common/BackBase';
import {NavigationActions} from "react-navigation";
import {connect} from 'react-redux';
// 查看设备信息
import BleManager from 'react-native-ble-manager';
import axios from '../../utils/request'
import WifiManager from 'react-native-wifi';
//获取经纬度
import Geolocation from 'react-native-geolocation-service';
//获取手机model、uid、version
import DeviceInfo from 'react-native-device-info';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const phoneModel = Platform === 'ios' ? DeviceInfo.getModel() : DeviceInfo.getDeviceId();
const phoneUid = DeviceInfo.getUniqueID();
const phoneVersion = DeviceInfo.getVersion();

class ClockPageDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            onBluetooth: false,
            onWifi: false,
            scanWifi: false,
            scanBluetooth: false,
            canClock: false,
            clockToken: '',
            date: '',
            time: '',
            bluetooth:[],
            wifi: [],
            clockData: [],
            loading: false
        }
        this.backPress = new BackBase({backPress: this.onBackPress})
        this._handleDiscoverPeripheral = this._handleDiscoverPeripheral.bind(this);
        this._handleStopScan = this._handleStopScan.bind(this);
        this._handleBluetoothUpdateState = this._handleBluetoothUpdateState.bind(this);
    }
    async componentDidMount(){
        // InteractionManager.runAfterInteractions(async () => {
            await this._setDateTime()
            await this._getClockData()
            this.intervalTime = setInterval(this._setDateTime,1000)
            this._getDeviceInfo()
            this.backPress.componentDidMount()
        // });
    }
    componentWillUnmount() {
        clearInterval(this.intervalWifi)
        clearInterval(this.intervalTime)
        this.handleUpdateState.remove()
        this.handlerDiscover.remove()
        this.handlerStop.remove()
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
    _setDateTime = () => {
        this.setState(previousState => {
            let dates = new Date()
            let tmpDate = dates.toLocaleDateString().split('/')
            let date = `${tmpDate[0]}-${tmpDate[1] < 10 ? '0' +tmpDate[1] : tmpDate[1]}-${tmpDate[2] < 10 ? '0' +tmpDate[2] : tmpDate[2]}`
            let time = dates.toTimeString().split(' ')[0].split(':') 
            return { time: `${time[0]}:${time[1]}`,date: date }
        });
    }
    //获取蓝牙、WIFI列表信息
    _getDeviceInfo = async () => {
        //判断、申请权限
        this._getPermission()
        this.getWifiList()
        this.intervalWifi = setInterval(()=> {
            if(!this.state.canClock && !this.state.scanWifi) this.getWifiList()
        },1000)
        this._getBluetoothList()
    }
    _getBluetoothList = async () => {
        //开启蓝牙功能
        await BleManager.start({showAlert: false})
        //检查蓝牙状态，回调为 this.handleUpdateState
        BleManager.checkState();
        //蓝牙状态改变监听
        this.handleUpdateState =  bleManagerEmitter.addListener('BleManagerDidUpdateState',this._handleBluetoothUpdateState);
        //发现设备
        this.handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this._handleDiscoverPeripheral);
        // 停止扫描
        this.handlerStop = bleManagerEmitter.addListener('BleManagerStopScan', this._handleStopScan);
    }
    _getPermission = () => {
        if (Platform.OS === 'android' && Platform.Version >= 23) {
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                if (result) {
                  console.log("Permission is OK");
                  //TODO: 获取到位置权限后获取经纬度操作
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
    //监听蓝牙打开状态
    _handleBluetoothUpdateState = (args) => {
        console.log('BleManagerDidUpdateStatea:', args);
        if(args.state == 'on' ){  //蓝牙已打开
            console.log('蓝牙已打开')
            this.setState({onBluetooth: true})
            // 开始扫描
            this.startScan()
        } else {
            this.setState({onBluetooth: false})
        }
    }
    //扫描
    startScan() {
        if (!this.state.scanBluetooth) {
          BleManager.scan([], 10, true).then((results) => {
            this.setState({scanBluetooth:true});
          });
        }
    }
    //监听扫描到设备
    _handleDiscoverPeripheral = async (device) => {
        console.log('BleManagerDiscoverPeripheral:', device);
        let mac;  //蓝牙Mac地址            
        if(Platform.OS == 'android' && device.name){
            mac = device.id;
            let {bluetooth} = this.state
            let {uuid,major,minor} = await this._dealDevic(device)
            let res = await axios({url: '/api/clock/bluetooth/_check',method: 'post',data: {mac,uuid,major,minor}})
            if(res && res.token) {
                bluetooth.push({mac,uuid,major,minor})
                this.setState({canClock:true,scanBluetooth: false, clockToken:res.token,bluetooth: bluetooth})
                BleManager.stopScan()
            }
        } else{  
            // TODO: 后续ios时配置获取数据
            //ios连接时不需要用到Mac地址，但跨平台识别是否是同一设备时需要Mac地址
        }  
    }
    _dealDevic = (device) => {
        const {bytes,data} = device.advertising.manufacturerData
        let hexString = this.bytesToHexString(bytes)
        // ibeacon的UUID值
        let uuid = hexString.substring(18, 26) + "-"
                + hexString.substring(26, 30) + "-"
                + hexString.substring(30, 34) + "-"
                + hexString.substring(34, 38) + "-"
                + hexString.substring(38, 50);
        let major = parseInt(hexString.substring(50, 54),16)
        let minor = parseInt(hexString.substring(54, 58),16)
        return {uuid,major,minor}
    }
    bytesToHexString = (arr) => {
        let hexString = ''
        for(let i= 0;i< arr.length;i++) {
            let tmp = arr[i].toString(16);
            if(tmp.length === 1) {
                tmp = '0' + tmp
            }
            hexString += tmp
        }
        return hexString
    }
    //停止扫描
    _handleStopScan = () => {
        console.log('Scan is stopped');
        this.setState({ scanBluetooth: false });
    }
    getWifiList = () => {
        WifiManager.isEnabled((isEnabled) => {
            if (isEnabled) {
              console.log("wifi 打开");
              this.setState({onWifi: true,scanWifi:true})
              this.scanWifiList()
            } else {
                this.setState({onWifi: false})
                console.log("wifi 关闭");
            }
          });
    }
    scanWifiList = () => {
        WifiManager.reScanAndLoadWifiList( async(res) => {
            let wifiList = JSON.parse(res)
            let {wifi} = this.state
            console.log('wifiList:',wifiList)
            for(let i = 0;i<wifiList.length;i++) {
                let respond = await axios({url: '/api/clock/wifi/_check',method: 'post',data:{mac:wifiList[i].BSSID}})
                console.log('wifi扫描设备请求后返回信息：',respond)
                if(respond && respond.token) {
                    wifi.push({mac:wifiList[i].BSSID})
                    this.setState({canClock: true,clockToken:respond.token,wifi: wifi})
                    break
                }
            }
            this.setState({scanWifi:false})
        },
        err=> {
            console.log(err);
        })
    }
    //打卡
    _handleClock = async () => {
        this.setLoading(true)
        let {wifi,bluetooth,clockToken,loading} = this.state
        let res;
        try {
            if(wifi.length) {
                res = await axios({url: '/api/clock/_clock',method:'post',data: {phoneModel,phoneUid,phoneVersion,clockToken,wifi}})  
            } else {
                res = await axios({url: '/api/clock/_clock',method:'post',data: {phoneModel,phoneUid,phoneVersion,clockToken,bluetooth}})
            }
            if(typeof(res) == 'string') {
                this._getClockData()
            }
        }catch(err) {
            console.log(err);
        }
        console.log(loading);
        // this.setLoading(false)
    }
    //获取打卡数据
    _getClockData = async () => {
        this.setLoading(true)
        let {date} = this.state
        let clockRes = await axios({url: `/api/clock/events?date=${date}`,method: 'get'})
        if(clockRes && clockRes.length) {
            this.setState({clockData:clockRes})
        }
        this.setLoading(false)
    }
    //显示发送报告
    _showSendProblem = () => {
        
    }
    setLoading = (val) => {
        this.setState({
            loading: val
        })
    }
    onRequestClose = () => {
        this.setLoading(false)
    }
    render() {
        let showIcon = ((!this.state.scanWifi && !this.state.scanBluetooth) || this.state.canClock) ? false : true;
        let {onBluetooth,onWifi,scanWifi,scanBluetooth,canClock,clockData,time,loading} = this.state
        let [allOff,onBlue,onWIFI,range,unRange] = ['请打开蓝牙或WIFI','请打开蓝牙','请打开WIFI','您当前已在打卡范围内','您当前不在有效打卡范围内']
        let tipText = !onBluetooth && !onWifi ? allOff : 
                        (onWifi && !canClock && !onBluetooth ? onBlue : 
                            (onBluetooth && !canClock  && !onWifi ? onWIFI : 
                                (canClock ? range : 
                                    (onBluetooth && onWifi && !canClock ? unRange: ''))))
        let ClockContainer = canClock ? TouchableOpacity : View
        let ClockDetailWrapper = clockData.length == 0 ? <Text>暂无数据</Text> : <ClockDetailContent clockData={clockData} />
        return (
            <View style={{flex: 1}}>
                <LoadingIndicator loading={loading} onRequestClose={this.onRequestClose} />
                <View style={{flex: 3, backgroundColor: '#fdfdfd',justifyContent: 'center'}}>
                    {ClockDetailWrapper}
                </View>
                <Divider />
                <View  style={{flex: 1, backgroundColor: '#fff',alignItems: 'center',justifyContent: 'center',height: 140}}>
                    <View style={{flexDirection: 'row',marginBottom:6,justifyContent: 'center',alignItems: 'center',height: 30}}>
                        <Text style={styles.tipText}>{tipText}</Text>
                        <AntDesign name={'exclamationcircleo'} size={20} style={[styles.iconStyle,!canClock ? null : styles.hide]} onPress={this._sendProblem}/>
                    </View>
                    <ClockContainer style={[styles.clockFingerWrapper,canClock ? styles.canClock : null]} onPress={() => this._handleClock()}>
                        <Text style={[styles.clockTime,this.state.canClock ? styles.canClockText : null]}>{time}</Text>
                        <Text style={[styles.clockText,this.state.canClock ? styles.canClockText : null]}>打卡</Text>
                    </ClockContainer>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    clockFingerWrapper:{
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.unClockColor,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    tipText: {
        color: Colors.mainColor,
        borderWidth: 1,
        borderColor: Colors.mainColor,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        lineHeight: 30,
        textAlign: 'center',
        paddingHorizontal: 6
    },
    iconStyle: {
        color: 'red',
        position: 'absolute',
        right: -30
    },
    clockTime: {
        color:'#cdcdcd',
        fontSize:16,
        marginBottom: 6
    },  
    clockText: {
        color:'#cdcdcd',
        fontSize:20,
    },
    canClock: {
        backgroundColor: Colors.mainColor,
    },
    canClockText: {
        color: '#fff'
    },
    hide: {
        display: 'none'
    }
})

const mapStateToProps = state => ({
    nav: state.nav
})
export default connect(mapStateToProps)(ClockPageDetail)