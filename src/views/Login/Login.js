import React, { Component } from 'react';
import {Text,View,TouchableOpacity,Alert,StyleSheet,Image,StatusBar,KeyboardAvoidingView,BackHandler,TouchableHighlight,ScrollView } from 'react-native';
import { TextInput,DefaultTheme,Button,TouchableRipple,Snackbar  } from 'react-native-paper';
import Colors from '../../utils/Colors';
import axios from '../../utils/request';
import StorageUtil from '../../utils/storage';
import SplashScreen from 'react-native-splash-screen';
import NavigationUtil from '../../navigator/NavigationUtil';
import imageBg from '../../assets/image/icon_logo.png';
import imageBgEking from '../../assets/image/icon_eking_logo.png';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import NavigationBar from '../../components/common/NavigationBar';
import BackBase from '../../components/common/BackBase';
import {NavigationActions} from "react-navigation";
import {connect} from "react-redux";
import actions from '../../action/index';
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
        this.backPress = new BackBase({backPress: this.onBackPress})
        this.state = {
            username:'',
            password: 'Yy141025',
            showTip: false,
            tipText: '',
            res:'',
            isUserFocused: false,
            isPassFocused: false,
            loading: false,
            text: ''
        }
    }
    componentDidMount() {
        SplashScreen.hide();
        this.backPress.componentDidMount()
    }
    componentWillUnmount() {
        this.backPress.componentWillUnmount()
    }
    onBackPress = () => {
        const { dispatch, nav } = this.props;
        if (nav.routes[0].index === 0 && !this.state.loading) {
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
    }
    // 输入用户名事件
    _setUserName = (username) => {
        const reg = /\w/g
        let val = username && username.match(reg).length ? username.match(reg).join('') : ''
        // this.setState({username: val})
        const {setUsername} = this.props
        setUsername(val)
        
    }
    // 输入密码事件
    _setPass = (password)=> {
        this.setState({password})
    }
    // 登录
    login= async ()=> {
        if(!this.props.account.username) return this.setState({showTip: true,tipText: 'EasySite：请输入域账号或手机号'})
        if(!this.state.password) return this.setState({showTip: true,tipText: 'EasySite：请输入密码'})
        this.setLoading(true)
        this.setState({showTip: true,tipText: '发起登录请求'})
        let {password} = this.state
        try {
            let res = await axios({url: '/sys/accounts/login',method: 'post',data: {username: this.props.account.username,password}})
            if(res && res.token) {
                this.setState({showTip: true,tipText: '成功获取token'})
                let status = await StorageUtil.save('loginToken', res.token)
                this.setLoading(false)
                this.setState({showTip: true,tipText: '准备跳转'})
                if(status) NavigationUtil.go('Tab')
            } else {
                this.setState({showTip: true,tipText: `获取token失败${JSON.stringify(res)}`,text: JSON.stringify(res)})
                this.setLoading(false)
                //请求返回成功但请求失败
                console.log(res);
            }
        } catch(err) {
            console.log(err);
        }
    }
    // 忘记密码
    _forgetPass= ()=> {
        NavigationUtil.go('ForgetPass')
    }
    setLoading = (val : Boolean) => {
        this.setState({
            loading: val
        })
    }
    onRequestClose = () => {
        this.setLoading(false)
    }
    render() {
        NavigationUtil.navigation = this.props.navigation
        return (
            <KeyboardAvoidingView style={{flex:1}}>
                <LoadingIndicator loading={this.state.loading} onRequestClose={this.onRequestClose} />
                {/* <TouchableHighlight> */}
                <View style={{paddingHorizontal: 30,flex:1}}>
                    <View style={{flex:1,alignItems: 'center',justifyContent: 'center'}}>
                        <Image
                            source={imageBg}
                            resizeMode='cover'
                            style={{width: 60,height:60}} />
                    </View>
                    <View style={{flex:4,flexDirection: 'column'}}>
                        <TextInput
                            backgroundColor='#fff'
                            style={[styles.btn,this.state.isUserFocused ? styles.selectColor : null]}
                            // autoFocus={true}
                            value={this.props.account.username}
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
                        <ScrollView><Text>{this.state.text}</Text></ScrollView>
                    </View>
                    <View style={{flex:1,alignItems: 'center',justifyContent: 'center'}}>
                        <Image
                            source={imageBgEking}
                            resizeMode='cover'
                            style={{width: 70,height:50}}></Image>
                        <Text style={{alignSelf: 'flex-end',color:'#ccc'}}>v2.0.1</Text>
                    </View>
                    <Snackbar
                        duration={500}
                        visible={this.state.showTip}
                        onDismiss={() => this.setState({ showTip: false })}
                    >
                        {this.state.tipText}
                    </Snackbar>
                </View>
                {/* </TouchableHighlight> */}
            </KeyboardAvoidingView>
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

const mapStateToProps = state => ({
    nav: state.nav,
    account: state.account
})
const mapDispatchToProps = dispatch => {
    return {
        setUsername: username => dispatch(actions.setUsername(username))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login)