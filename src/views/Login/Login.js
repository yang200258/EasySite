import React, { Component } from 'react';
import {Text,View,TouchableOpacity,Alert,StyleSheet,Image,StatusBar,KeyboardAvoidingView,ActivityIndicator } from 'react-native';
import { TextInput,DefaultTheme,Button,TouchableRipple,Snackbar  } from 'react-native-paper';
import Colors from '../../utils/Colors';
import axios from '../../utils/request';
import StorageUtil from '../../utils/storage';
import SplashScreen from 'react-native-splash-screen';
import NavigationUtil from '../../navigator/NavigationUtil';
import imageBg from '../../assets/image/icon_logo.png'
import imageBgEking from '../../assets/image/icon_eking_logo.png'
import Loading from '../../components/common/Loading'
import NavigationBar from '../../components/common/NavigationBar'
const theme = {
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.mainColor,
      background : '#FFFFFF',
      placeholder: Colors.textColor
    },
  };

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username:'qqing_yang',
            password: 'Yy141025',
            showTip: false,
            tipText: '',
            res:'',
            isUserFocused: false,
            isPassFocused: false,
        }
    }
    componentDidMount() {
        SplashScreen.hide();
    }
    // 输入用户名事件
    _setUserName = (username) => {
        // TODO: 验证
        this.setState({username})
    }
    // 输入密码事件
    _setPass = (password)=> {
        this.setState({password})
    }
    // 登录
    login= async ()=> {
        if(!this.state.username) return this.setState({showTip: true,tipText: 'EasySite：请输入域账号或手机号'})
        if(!this.state.password) return this.setState({showTip: true,tipText: 'EasySite：请输入密码'})
        let {username,password} = this.state
        let res = await axios({url: '/sys/accounts/login',method: 'post',data: {username,password}})
        if(res && res.token) {
            let status = await StorageUtil.save('loginToken', res.token)
            if(status) NavigationUtil.go('Tab')
        }
    }
    // 忘记密码
    _forgetPass= ()=> {
        
    }
    render() {
        NavigationUtil.navigation = this.props.navigation
        let navigationBarProps = {hide: true,statusBar: {backgroundColor: '#fff',barStyle: 'dark-content',color: '#000',hidden: false}}
        return (
            <View style={{flex:1}}>
                <Loading />
                <KeyboardAvoidingView behavior="padding" style={{paddingHorizontal: 30,flex:1}}>
                    <NavigationBar {...navigationBarProps} />
                    <View style={{flex:1,alignItems: 'center',justifyContent: 'center'}}>
                    <Image
                        source={imageBg}
                        resizeMode='cover'
                        style={{width: 60,height:60}} />
                    </View>
                    <View style={{flex:4,flexDirection: 'column'}}>
                        <TextInput
                            backgroundColor='#fff'
                            autoCompleteType={'username'}
                            style={[styles.btn,this.state.isUserFocused ? styles.selectColor : null]}
                            // autoFocus={true}
                            value={this.state.username}
                            placeholder={'请输入域账号或手机号'}
                            selectionColor={Colors.mainColor}
                            onChangeText={value => this._setUserName(value)}
                            theme={theme}
                            onFocus={() => this.setState({isUserFocused: true})}
                            onBlur={() => this.setState({isUserFocused: false})}
                        />
                        <TextInput
                            backgroundColor='#fff'
                            secureTextEntry={true}
                            style={[styles.btn,this.state.isPassFocused ? styles.selectColor : null]}
                            autoCompleteType='password'
                            value={this.state.password}
                            placeholder={'请输入密码'}
                            selectionColor={Colors.mainColor}
                            onChangeText={value => this._setPass(value)}
                            theme={theme}
                            onFocus={() => this.setState({isPassFocused: true})}
                            onBlur={() => this.setState({isPassFocused: false})}
                        />
                        <Button style={{marginTop: 40}} dark={true} mode="contained" onPress={() => this.login()} color={Colors.mainColor}>
                            登录
                        </Button>
                        <TouchableRipple 
                            style={{alignSelf: "flex-end",marginTop: 20}}
                            onPress={() => this._forgetPass()}
                            rippleColor={Colors.mainColor}
                            >
                            <Text style={{color:Colors.mainColor}}>忘记密码</Text>
                        </TouchableRipple>
                    </View>
                    <View style={{flex:1,alignItems: 'center',justifyContent: 'center'}}>
                        <Image
                            source={imageBgEking}
                            resizeMode='cover'
                            style={{width: 70,height:50}}></Image>
                        <Text style={{alignSelf: 'flex-end',color:'#ccc'}}>v2.0.0</Text>
                    </View>
                    <Snackbar
                        duration={500}
                        visible={this.state.showTip}
                        onDismiss={() => this.setState({ showTip: false })}
                    >
                        {this.state.tipText}
                    </Snackbar>
                </KeyboardAvoidingView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    btn: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    selectColor: {
        borderBottomColor: Colors.mainColor
    }
})

export default Login