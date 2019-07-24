import {createStackNavigator,createAppContainer} from 'react-navigation';
import React from 'react';
import {View,Image,Text,Button} from 'react-native';
import TabNav from './tabNavigator';

import ClockPage from '../views/ClockPages/ClockPage';
import ClockPageDetail from '../views/ClockPages/ClockPageDetail'
import Colors from '../utils/Colors'

  const RootNav = createStackNavigator({
    Root: {
      screen: TabNav,
      navigationOptions: options => {
        // title：可当作headerTitle的备用的字符串。
        // header：可以是React元素或给定了HeaderProps然后返回一个React元素的函数，显示为标题。
        // headerTitle： 字符串、React元素或被当作标题的React组件。
        // headerTitleAllowFontScaling：标题栏中标题字体是否应该缩放取决于文本大小是否可以设置。 默认为true
        // headerBackTitle：iOS上的返回按钮的文字使用的字符串，或者使用null来禁用。 默认为上一个页面的headerTitle。
        // headerRight：显示在标题栏右侧的React元素。
        // headerLeft：用于在标题栏左侧展示的React元素或组件。
        // headerStyle： 标题栏的样式
        // headerTitleStyle： 标题栏中标题的样式
        // headerBackTitleStyle：标题栏中返回按钮标题的样式
        // headerTintColor：标题栏的色调
        // headerPressColorAndroid：material design中的波纹颜色 (仅支持Android >= 5.0)
        // gesturesEnabled：是否可以使用手势来关闭此页面。 在iOS上默认为true，在Android上默认为false。
        // gestureResponseDistance：一个对象，用以覆盖从屏幕边缘开始触摸到手势被识别的距离。 它具有以下属性：
              // horizontal - 数值型 - 水平方向的距离，默认值25
              // vertical - 数值型 - 垂直方向的距离，默认值135.
        // gestureDirection：字符串，用来设置关闭页面的手势方向，默认（default）是从做往右，inverted是从右往左
        return {
          // header: null,
          headerLeft: null,
          headerRight: null,
          headerTitle: null,
        }
      }
    },
    ClockPageDetail:{
      screen: ClockPageDetail,
      navigationOptions: options => {
        return {
          headerTitle: '打卡',
          headerTitleStyle: {
            fontSize: 18,
            color: Colors.textColor,
            marginLeft: 0
          },
          gesturesEnabled: true,
        }
      }
    }
  },{
    initialRouteName: 'Root',
    cardStyle: {
    },
    headerMode: 'float',
  })


  export default createAppContainer (RootNav);