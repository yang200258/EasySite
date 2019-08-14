import React, { Component } from 'react';
import {Text,View,TouchableOpacity} from 'react-native';
import { TextInput,DefaultTheme,Button,TouchableRipple,Snackbar  } from 'react-native-paper';
import Colors from '../../utils/Colors';
import axios from '../../utils/request';
import StorageUtil from '../../utils/storage';
import SplashScreen from 'react-native-splash-screen';
import NavigationUtil from '../../navigator/NavigationUtil'
const theme = {
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.mainColor,
      background : '#fff',
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
            tipText: ''
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
            if(status) this.props.navigation.navigate('Tab')
        }
    }
    // 忘记密码
    _forgetPass= ()=> {
        
    }
    render() {
        return (
            <View  style={{paddingHorizontal: 30,flex:1}}>
                <View style={{flex:1,alignItems: 'center',justifyContent: 'center'}}>
                    
                </View>
                <View style={{flex:2,flexDirection: 'column'}}>
                    <TextInput
                        autoCompleteType={'username'}
                        value={this.state.username}
                        placeholder={'请输入域账号或手机号'}
                        selectionColor={Colors.mainColor}
                        onChangeText={value => this._setUserName(value)}
                        theme={theme}
                    />
                    <TextInput
                        autoCompleteType={'password'}
                        value={this.state.password}
                        placeholder={'请输入密码'}
                        selectionColor={Colors.mainColor}
                        onChangeText={value => this._setPass(value)}
                        theme={theme}
                    />
                    <Button style={{marginTop: 40}} dark={true} mode="contained" onPress={this.login} color={Colors.mainColor}>
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
                <View style={{flex:3,alignItems: 'center',justifyContent: 'flex-end'}}>
                    
                </View>
                <Snackbar
                    duration={500}
                    visible={this.state.showTip}
                    onDismiss={() => this.setState({ showTip: false })}
                    action={null}
                >
                    {this.state.tipText}
                </Snackbar>
            </View>
        )
    }
}

export default Login