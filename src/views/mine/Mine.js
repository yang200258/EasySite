import React, { Component } from 'react';
import { Text, View,Image,DeviceEventEmitter } from 'react-native';
import { Button  } from 'react-native-paper';
import StorageUtil from '../../utils/storage';
import NavigationUtil from '../../navigator/NavigationUtil';
import CodePush from "react-native-code-push";
class Mine extends Component {
    constructor() {
        super();
        this.state = { progress: false };
      }
    exitLogin = () => {
        StorageUtil.remove('loginToken')
        NavigationUtil.go('Login')
    }
    codePushStatusDidChange = (syncStatus)=>{
        switch(syncStatus) {
          case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
            this.setState({ syncMessage: "检查更新" });
            break;
          case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
            this.setState({ syncMessage: "下载安装包" });
            break;
          case CodePush.SyncStatus.AWAITING_USER_ACTION:
            this.setState({ syncMessage: "等待用户操作" });
            break;
          case CodePush.SyncStatus.INSTALLING_UPDATE:
            this.setState({ syncMessage: "正在安装更新" });
            break;
          case CodePush.SyncStatus.UP_TO_DATE:
            this.setState({ syncMessage: "应用程序是最新的", progress: false });
            break;
          case CodePush.SyncStatus.UPDATE_IGNORED:
            this.setState({ syncMessage: "已取消更新", progress: false });
            break;
          case CodePush.SyncStatus.UPDATE_INSTALLED:
            this.setState({ syncMessage: "已完成安装，将在下次启动时更新", progress: false });
            break;
          case CodePush.SyncStatus.UNKNOWN_ERROR:
            this.setState({ syncMessage: "未知错误", progress: false });
            break;
        }
      }
    getUpdateMetadata = ()=> {
    CodePush.getUpdateMetadata(CodePush.UpdateState.RUNNING)
        .then((metadata) => {
            this.setState({ syncMessage: metadata ? JSON.stringify(metadata) : "Running binary version", progress: false });
        }, (error: any) => {
            this.setState({ syncMessage: "Error: " + error, progress: false });
        });
    }
    codePushDownloadDidProgress = (progress)=> {
        this.setState({ progress });
    }
    /** Update is downloaded silently, and applied on restart (recommended) */
    sync = ()=> {
        CodePush.sync(
        {},
        this.codePushStatusDidChange.bind(this),
        this.codePushDownloadDidProgress.bind(this)
        );
    }

    /** Update pops a confirmation dialog, and then immediately reboots the app */
    syncImmediate = ()=> {
        CodePush.sync(
        { installMode: CodePush.InstallMode.IMMEDIATE, updateDialog: true },
        this.codePushStatusDidChange.bind(this),
        this.codePushDownloadDidProgress.bind(this)
        );
    }
    render() {
        let progressView;
        if (this.state.progress) {
          progressView = (
            <Text>{this.state.progress.receivedBytes} of {this.state.progress.totalBytes} bytes received</Text>
          );
        }
        return (
            <View style={{backgroundColor: '#eee',flex:1,marginTop: 30}}>
                <Button mode='text' style={{backgroundColor: '#fff'}} color='#000' onPress={() => this.exitLogin()}>
                    退出登录
                </Button>
                <Button mode='text' style={{backgroundColor: '#fff',marginTop:20}} color='#000' onPress={() => this.syncImmediate()}>
                    检查更新
                </Button>
                {progressView}
                <Text>{this.state.syncMessage}</Text>
            </View>
        )
    }
}

export default Mine