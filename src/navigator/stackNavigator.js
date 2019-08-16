import {createStackNavigator,createAppContainer} from 'react-navigation';
import React from 'react';
import {View,Image,Text,Button} from 'react-native';
import TabNav from './tabNavigator';


import ClockPage from '../views/ClockPages/ClockPage';
import ClockPageDetail from '../views/ClockPages/ClockPageDetail';
// import Splash from '../views/Splash/Splash';
import Login from '../views/Login/Login';

import Colors from '../utils/Colors';
import StorageUtil from '../utils/storage';

import {connect} from 'react-redux';
import {createReactNavigationReduxMiddleware, createReduxContainer} from 'react-navigation-redux-helpers';

let loginStatus ;
StorageUtil.get('loginToken').then(res => {
  loginStatus = res ? true : false
})

  const RootNav = createStackNavigator({
    // Splash: {
    //   screen: Splash,
    //   navigationOptions: {
    //     header: null
    //   }
    // },
    Login: {
      screen: Login,
      navigationOptions: {
        header: null
      }
    },
    Tab: {
      screen: TabNav,
      navigationOptions: {
        header: null
      }
    },
    ClockPageDetail:{
      screen: ClockPageDetail,
      navigationOptions: options => {
        return {
          // headerTitle: '打卡',
          // headerTitleStyle: {
          //   fontSize: 18,
          //   color: Colors.textColor,
          //   marginLeft: 0
          // },
          // gesturesEnabled: true,
          header: null
        }
      }
    }
  },{
    lazy:true,
    initialRouteName: 'Login',
    // cardStyle: {},
    headerMode: 'screen',
    headerBackTitle: null,
    defaultNavigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
      headerStyle:{elevation: 0,shadowOpacity: 0,height:48,backgroundColor:"#2196f3"},
      headerTitleStyle:{color:'#fff',fontSize:16}, //alignSelf:'center'  文字居中
      headerBackTitleStyle:{color:'#fff',fontSize:12},
      gesturesEnabled:true,//是否支持滑动返回收拾，iOS默认支持，安卓默认关闭
    }
  })
  const defaultGetStateForAction = RootNav.router.getStateForAction;
  RootNav.router.getStateForAction = (action, state) => {
      //页面是Tab并且 global.user.loginState = false || ''（未登录）
      if (action.routeName === 'Tab' && !loginStatus) {
          let routes = [
              ...state.routes,
              {key: 'id-'+Date.now(), routeName: 'Login'},
          ];
          return {
              ...state,
              routes,
              index: routes.length - 1,
          };
      }
      return defaultGetStateForAction(action, state);
    }

    export const RootNavigator = createAppContainer(RootNav);
    /**
   * 1.初始化react-navigation与redux的中间件，
   * 该方法的一个很大的作用就是为reduxifyNavigator的key设置actionSubscribers(行为订阅者)
   * 设置订阅者@https://github.com/react-navigation/react-navigation-redux-helpers/blob/master/src/middleware.js#L29
   * 检测订阅者是否存在@https://github.com/react-navigation/react-navigation-redux-helpers/blob/master/src/middleware.js#L97
   * @type {Middleware}
   */
  export const middleware = createReactNavigationReduxMiddleware(
    state => state.nav,
    'root',
  );

  /**
   * 2.将根导航器组件传递给 reduxifyNavigator 函数,
   * 并返回一个将navigation state 和 dispatch 函数作为 props的新组件；
   * 注意：要在createReactNavigationReduxMiddleware之后执行
   */
  const AppWithNavigationState = createReduxContainer(RootNavigator, 'root');

  /**
   * State到Props的映射关系
   * @param state
   */
  const mapStateToProps = state => ({
    state: state.nav,//v2
  });
  export const rootCom = 'RootNav'
/**
 * 3.连接 React 组件与 Redux store
 */
export default connect(mapStateToProps)(AppWithNavigationState);
