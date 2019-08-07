import React, { Component } from 'react';
import { Text, View,Image,NativeModules,NativeEventEmitter,Platform,DeviceEventEmitter } from 'react-native';
// 查看设备信息
import BleManager from 'react-native-ble-manager';
import {Buffer} from 'buffer/'
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
import WifiManager from 'react-native-wifi';
import axios from '../../utils/request'


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
                bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', (device) => {
                    console.log('BleManagerDiscoverPeripheral:', device);
                    let id;  //蓝牙连接id
                    let macAddress;  //蓝牙Mac地址            
                    if(Platform.OS == 'android' && device.name){
                        BleManager.stopScan().then(() => {
                            macAddress = device.id;
                            id = macAddress;
                            const {bytes,data} = device.advertising.manufacturerData
                            const buffer = Buffer.from(data,'base64')
                            const buffer2 = Buffer.from(bytes.slice(0,4),'base64')
                            console.log(buffer.toString(),buffer2.toString());
                        });
                    }

                        else{  
                        // TODO: 后续ios时配置获取数据
                        //ios连接时不需要用到Mac地址，但跨平台识别是否是同一设备时需要Mac地址
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
        WifiManager.loadWifiList(res => {
            let wifiList = JSON.parse(res)
            wifiList.forEach(async (item) => {
                let res = await axios({url: '/api/clock/wifi/_check',method: 'post',data:{mac:item.BSSID}})
                if(res.token) {
                    console.log(res)
                    return;
                }
            })
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