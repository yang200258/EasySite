import React,{Component} from 'react'
import CodePush from "react-native-code-push";
import {Text,View} from 'react-native'
class Update extends Component {
    constructor(props) {
        super(props)
    }
    codePushStatusDidChange = (syncStatus)=>{
		const {setMessage,setProgress} = this.props
        switch(syncStatus) {
          case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
			// this.setState({ syncMessage: "检查更新" });
			setMessage("检查更新")
            break;
          case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
			// this.setState({ syncMessage: "下载安装包" });
			setMessage("下载安装包")
            break;
          case CodePush.SyncStatus.AWAITING_USER_ACTION:
			// this.setState({ syncMessage: "等待用户操作" });
			setMessage("等待用户操作")
            break;
          case CodePush.SyncStatus.INSTALLING_UPDATE:
			// this.setState({ syncMessage: "正在安装更新" });
			setMessage("正在安装更新")
            break;
          case CodePush.SyncStatus.UP_TO_DATE:
			// this.setState({ syncMessage: "应用程序是最新的", progress: false });
			setMessage("应用程序是最新的")
			setProgress(false)
            break;
          case CodePush.SyncStatus.UPDATE_IGNORED:
			// this.setState({ syncMessage: "已取消更新", progress: false });
			setMessage("已取消更新")
			setProgress(false)
            break;
          case CodePush.SyncStatus.UPDATE_INSTALLED:
			// this.setState({ syncMessage: "已完成安装，将在下次启动时更新", progress: false });
			setMessage("已完成安装，将在下次启动时更新")
            break;
          case CodePush.SyncStatus.UNKNOWN_ERROR:
			// this.setState({ syncMessage: "未知错误", progress: false });
			setMessage("未知错误")
			setProgress(false)
            break;
        }
      }
    getUpdateMetadata = ()=> {
        CodePush.getUpdateMetadata(CodePush.UpdateState.RUNNING).then((metadata) => {
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
        this.codePushStatusDidChange(),
        this.codePushDownloadDidProgress()
        );
    }
    /** Update pops a confirmation dialog, and then immediately reboots the app */
    syncImmediate = ()=> {
        CodePush.sync(
        { installMode: CodePush.InstallMode.IMMEDIATE, updateDialog: true },
        this.codePushStatusDidChange(),
        this.codePushDownloadDidProgress()
        );
    }
}

export default Update