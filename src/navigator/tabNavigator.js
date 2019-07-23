import React from 'react';
import {Text,DeviceEventEmitter,StyleSheet} from 'react-native';
import Colors from '../utils/Colors'
import {createBottomTabNavigator} from 'react-navigation';
import ClockPage from '../views/clockPages/ClockPage';
import Mine from '../views/mine/Mine';
import WorkBench from '../views/workBench/WorkBench';
import MyConsern from '../views/MyConsern/MyConsern';

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
// TabBarBottom的tabBarOptions (TabBarBottom为iOS的默认tab bar)

// activeTintColor - 当前选中的tab bar的文本颜色和图标颜色
// activeBackgroundColor - 当前选中的tab bar的背景色
// inactiveTintColor - 当前未选中的tab bar的文本颜色和图标颜色
// inactiveBackgroundColor - 当前未选中的tab bar的背景色
// showLabel - 是否显示tab bar的文本，默认是true
// style - tab bar的样式
// labelStyle - tab bar的文本样式
// tabStyle - tab页的样式
// allowFontScaling - 文本字体大小是否可以缩放取决于该设置，默认为true。
const tabBarOptions = {
    activeTintColor: Colors.mainColor,
    inactiveTintColor: Colors.unMainColor,
    activeBackgroundColor: Colors.unMainColor,
    inactiveBackgroundColor: Colors.unMainColor,
    initialRouteName: 'Clock',
    showIcon: true,
    showLabel: true,
  }
  const TabNavigatorConfig = {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: tabBarOptions,
  }
  const TabNav = createBottomTabNavigator({
    Clock: {
        screen: ClockPage,
        navigationOptions: {
            /* eslint-disable */
            tabBarLabel: ({tintColor,focused}) => {
                return <Text style={{ color: focused ? tintColor : null,textAlign:'center'}}>考勤</Text>
            },
            tabBarIcon: ({tintColor,focused}) => {
                return <FontAwesome name={'calendar'} size={26} style={{color:focused ? tintColor : null}} />
            },
            // tabBarOnPress: obj => {
            //     DeviceEventEmitter.emit('Clock')
            //     obj.jumpToIndex(obj.scene.index)
            // }
        }
    },
    WorkBench: {
        screen: WorkBench,
        navigationOptions: {
            /* eslint-disable */
            tabBarLabel: ({tintColor,focused}) => {
                return <Text style={{ color: focused ? tintColor : null,textAlign:'center'}}>工作台</Text>
            },
            tabBarIcon: ({tintColor,focused}) => {
                return <AntDesign name={'setting'} size={26} style={{color:focused ? tintColor : null}} />
            },
            // tabBarOnPress: obj => {
            //     DeviceEventEmitter.emit('workBench')
            //     obj.jumpToIndex(obj.scene.index)
            // }
        }
    },
    MyConsern: {
        screen: MyConsern,
        navigationOptions: {
            /* eslint-disable */
            tabBarLabel: ({tintColor,focused}) => {
                return <Text style={{ color: focused ? tintColor : null,textAlign:'center'}}>我的关注</Text>
            },
            tabBarIcon: ({tintColor,focused}) => {
                return <MaterialIcons name={'person-add'} size={26} style={{color:focused ? tintColor : '#666'}} />
            },
            // tabBarOnPress: obj => {
            //     DeviceEventEmitter.emit('workBench')
            //     obj.jumpToIndex(obj.scene.index)
            // }
        }
    },
    Mine: {
        screen: Mine,
        navigationOptions: {
            /* eslint-disable */
            tabBarLabel: ({tintColor,focused}) => {
                return <Text style={{ color: focused ? tintColor : null,textAlign:'center'}}>我</Text>
            },
            tabBarIcon: ({tintColor,focused}) => {
                return <MaterialIcons name={'person-outline'} size={26} style={{color:focused ? tintColor : null}} />
            },
            // tabBarOnPress: obj => {
            //     DeviceEventEmitter.emit('Mine')
            //     obj.jumpToIndex(obj.scene.index)
            // }
        }
    },
  },TabNavigatorConfig)

  const styles = StyleSheet.create({
    textCenter: {
        flexDirection: 'row',
        alignItems: 'center'
    }
  })

  export default TabNav