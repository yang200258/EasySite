import React, { Component } from 'react';
import { Text, View,Image,NativeModules,NativeEventEmitter,Platform,DeviceEventEmitter } from 'react-native';
// 查看设备信息
import BleManager from 'react-native-ble-manager';
import Buffer from 'buffer/'
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);


class ClockPageDetail extends Component {
    componentDidMount(){
        this.getDeviceInfo()
    }
    //获取蓝牙、WIFI列表信息
    getDeviceInfo = async () => {
        this.getWifiList()
        this.getBluetoothList()
    }
    getBluetoothList = async () => {
        // 获取蓝牙信息
        try {
            await BleManager.start({showAlert: false})
            BleManager.checkState();
        }catch(err) {
            console.log('Init the module fail.');
        }
        //蓝牙状态改变监听
        bleManagerEmitter.addListener('BleManagerDidUpdateState',async (args) => {
            console.log('BleManagerDidUpdateStatea:', args);
            if(args.state == 'on' ){  //蓝牙已打开
                console.log('蓝牙已打开')
                // 开始扫描
                await BleManager.scan([], 5, true)
                //搜索到一个新设备监听
                bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', (data) => {
                    console.log('BleManagerDiscoverPeripheral:', data);
                    let id;  //蓝牙连接id
                    let macAddress;  //蓝牙Mac地址            
                    if(Platform.OS == 'android' && data.name){
                        BleManager.stopScan().then(() => {
                            macAddress = data.id;
                            id = macAddress; 
                            // const {bytes,data} = data.advertising.manufacturerData
                            // let str = '';
                            // for(let i = 0;i<bytes.length;i++) {
                            //     let tmp = bytes[i].toString(16);
                            //     if(tmp.length == 1) {
                            //         tmp = "0" + tmp;
                            //     }
                            //     str += tmp
                            // }
                            // let arr = [];
                        });
                    }

                        else{  
                        //ios连接时不需要用到Mac地址，但跨平台识别是否是同一设备时需要Mac地址
                        //如果广播携带有Mac地址，ios可通过广播0x18获取蓝牙Mac地址，
                        // macAddress = getMacAddressFromIOS(data);
                        id = data.id;
                    }            
                });
            } else {
                console.log('蓝牙已关闭')
                //停止扫描
                BleManager.stopScan()
            }
        });
    }
    getWifiList = async() => {
        // 获取wifi  mac
        // const bssid = await NetworkInfo.getBSSID();
        // console.log('bssid',bssid);
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