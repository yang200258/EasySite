import React, { Component } from 'react';
import { Text, View,Image,DeviceEventEmitter } from 'react-native';
import { Button  } from 'react-native-paper';
import StorageUtil from '../../utils/storage';
import NavigationUtil from '../../navigator/NavigationUtil';
import Update from '../../components/common/Update'
class Mine extends Component {
    constructor() {
		super();
		this.update = new Update({setMessage: this.setMessage,setProgress: this.setProgress})
		this.state = { progress: false,syncMessage: '' };
      }
    exitLogin = () => {
        StorageUtil.remove('loginToken')
        NavigationUtil.go('Login')
    }
    setMessage = (syncMessage) => {
        this.setState({syncMessage})
    }
    setProgress = (progress) => {
        this.setState({progress})
    }
    render() {
        let progressView;
        if (this.props.progress) {
          progressView = (
            <Text>{this.state.progress.receivedBytes} of {this.state.progress.totalBytes} bytes received</Text>
          );
        }
        return (
            <View style={{backgroundColor: '#eee',flex:1,marginTop: 30}}>
                <Button mode='text' style={{backgroundColor: '#fff'}} color='#000' onPress={() => this.exitLogin()}>
                    退出登录
                </Button>
                <Button mode='text' style={{backgroundColor: '#fff',marginTop:20}} color='#000' onPress={() => this.update.syncImmediate()}>
                    检查更新
                </Button>
                {progressView}
            </View>
        )
    }
}

export default Mine