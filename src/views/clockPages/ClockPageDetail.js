import React, { Component } from 'react';
import { Text, View,Image,NativeModules,NativeEventEmitter,Platform,PermissionsAndroid,DeviceEventEmitter } from 'react-native';
// 查看设备信息
import BleManager from 'react-native-ble-manager';
import axios from '../../utils/request'
import WifiManager from 'react-native-wifi';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

class ClockPageDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            canClock: false,
            scanWifi: false,
            scanBluetooth: false,
        }
        this._handleDiscoverPeripheral = this._handleDiscoverPeripheral.bind(this);
        this._handleStopScan = this._handleStopScan.bind(this);
        this._handleBluetoothUpdateState = this._handleBluetoothUpdateState.bind(this);
    }
    componentDidMount(){
        this._getDeviceInfo()
    }
    componentWillUnmount() {
        clearTimeout(this.timer)
        this.handleUpdateState.remove()
        this.handlerDiscover.remove()
        this.handlerStop.remove()
    }
    //获取蓝牙、WIFI列表信息
    _getDeviceInfo = async () => {
        // this.timer = setTimeout(()=> {this.getWifiList()},3000)
        // this.getWifiList()
        this._getBluetoothList()
    }
    _getBluetoothList = async () => {
        //判断、申请权限
        this._getPermission()
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
            // 开始扫描
            this.startScan()
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
    _handleDiscoverPeripheral = (device) => {
        console.log('BleManagerDiscoverPeripheral:', device);
        let mac;  //蓝牙Mac地址            
        if(Platform.OS == 'android' && device.name){
            BleManager.stopScan().then(() => {
                mac = device.id;
                let {uuid,major,minor} = this._dealDevic(device)
                console.log(mac,uuid,major,minor);
            });
        } else{  
            // TODO: 后续ios时配置获取数据
            //ios连接时不需要用到Mac地址，但跨平台识别是否是同一设备时需要Mac地址
        }  
    }
    _dealDevic = (device) => {
        const {bytes,data} = device.advertising.manufacturerData
        let hexString = this.bytesToHexString(bytes)
        // console.log(hexString);
        // ibeacon的UUID值
        let uuid = hexString.substring(18, 26) + "-"
                + hexString.substring(26, 30) + "-"
                + hexString.substring(30, 34) + "-"
                + hexString.substring(34, 38) + "-"
                + hexString.substring(38, 50);
        // console.log(uuid)
        let major = parseInt(hexString.substring(50, 54),16)
        let minor = parseInt(hexString.substring(54, 58),16)
        // console.log(major,minor)
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
              console.log("wifi service enabled");
              this.scanWifiList()
            } else {
              console.log("wifi service is disabled");
            }
          });
    }
    scanWifiList = () => {
        WifiManager.reScanAndLoadWifiList( async(res) => {
            let wifiList = JSON.parse(res)
            let rp = await axios({url: '/api/clock/wifi/_check',method: 'get',data:{mac:wifiList[0].BSSID}})
            console.log(wifiList)
        },
        err=> {
            console.log(err);
        })
    }
    render() {
        return (
            <View style={{height:'100%'}}>
                <Text>Hello, ClockPa16510505geDetail!</Text>
            </View>
        )
    }
}

export default ClockPageDetail