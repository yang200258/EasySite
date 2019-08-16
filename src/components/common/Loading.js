import React,{Component} from 'react';
import {View,ActivityIndicator,StyleSheet,Text,StatusBar,Modal,Alert,TouchableHighlight} from 'react-native';
import NavigationBar from '../common/NavigationBar'
export default class Loading extends Component {
    state = {
        modalVisible: true,
      };
    
      setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }
    render() {
        let BarProps = {hide: true,statusBar: {backgroundColor: 'rgba(0,0,0,.5)',barStyle: 'light-content',color: '#fff',hidden: false}}
        return (
            <View style={styles.container}>
                {/* <NavigationBar {...BarProps} /> */}
                
                <Modal
                    animationType='fade'            // 淡入淡出
                    transparent={true}              // 透明
                    visible={this.state.modalVisible}    // 根据isModal决定是否显示
                    onRequestClose={() => {this.onRequestClose()}}  // android必须实现
                >
                    <View style={styles.modalViewStyle}>
                        <View style={styles.hudViewStyle}>
                            <ActivityIndicator size="large" color="#fff" animating={true} />
                            <Text style={{color:'#fff'}}>加载中...</Text>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,.5)',
      position: 'absolute',
      width: '100%',
      height: '100%',
      zIndex: 999,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    
  })