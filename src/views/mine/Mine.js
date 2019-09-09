import React, { Component } from 'react';
import { Text, View,Image,DeviceEventEmitter } from 'react-native';
import { Button  } from 'react-native-paper';
import StorageUtil from '../../utils/storage';
import NavigationUtil from '../../navigator/NavigationUtil';
import Update from '../../components/common/Update'
class Mine extends Component {
    constructor() {
		super();
		this.state = { progress: false,syncMessage: '' };
      }
    exitLogin = () => {
        StorageUtil.remove('loginToken')
        NavigationUtil.go('Login')
    }
    aboutUs = () => {
        NavigationUtil.go('AboutUs')
    }
    render() {
        let progressView;
        if (this.props.progress) {
          progressView = (
            <Text>{this.state.progress.receivedBytes} of {this.state.progress.totalBytes} bytes received</Text>
          );
        }
        return (
            <View style={{backgroundColor: '#f9f9f9',flex:1,marginTop: 30}}>
                <Button mode='text' style={{backgroundColor: '#fff',marginTop:20}} color='#000' onPress={() => this.aboutUs()}>
                    关于我们
                </Button>
                <Button mode='text' style={{backgroundColor: '#fff'}} color='#000' onPress={() => this.exitLogin()}>
                    退出登录
                </Button>
                {progressView}
            </View>
        )
    }
}

export default Mine