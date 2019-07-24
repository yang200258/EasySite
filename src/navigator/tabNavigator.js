import React from 'react';
import {Text,DeviceEventEmitter,StyleSheet,TouchableOpacity} from 'react-native';
import Colors from '../utils/Colors'
import {createBottomTabNavigator,createAppContainer} from 'react-navigation';

import ClockPage from '../views/ClockPages/ClockPage';
import Mine from '../views/Mine/Mine';
import WorkBench from '../views/WorkBench/WorkBench';
import MyConcern from '../views/MyConcern/MyConcern';

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
    inactiveTintColor: Colors.textColor,
    activeBackgroundColor: Colors.unMainColor,
    inactiveBackgroundColor: Colors.unMainColor,
    initialRouteName: 'Clock',
    showIcon: true,
    showLabel: true,
    labelStyle: {
        textAlign:'center',
        fontSize:12
      },
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
        navigationOptions: options =>{
            /* eslint-disable */
            // tabBarLabel: ({tintColor,focused}) => {
            //     return <Text style={[{ color: focused ? tintColor : null},styles.tabText]}>考勤</Text>
            // },
            return {
                tabBarLabel: '考勤',
                tabBarIcon: ({tintColor,focused}) => {
                    return <FontAwesome name={'calendar'} size={styles.iconSize} style={{color:focused ? tintColor : Colors.textColor}} />
                },
                // tabBarOnPress: obj => {
                    // DeviceEventEmitter.emit('Clock')
                    // obj.jumpToIndex(obj.scene.index)
                // }
                tabBarButtonComponent: TouchableOpacity
            }
        }
    },
    WorkBench: {
        screen: WorkBench,
        navigationOptions: {
            /* eslint-disable */
            // tabBarLabel: ({tintColor,focused}) => {
            //     return <Text style={[{ color: focused ? tintColor : null},styles.tabText]}>工作台</Text>
            // },
            tabBarLabel: '工作台',
            tabBarIcon: ({tintColor,focused}) => {
                return <AntDesign name={'setting'} size={styles.iconSize} style={{color:focused ? tintColor : Colors.textColor}} />
            },
            tabBarButtonComponent: TouchableOpacity
            // tabBarOnPress: obj => {
            //     DeviceEventEmitter.emit('workBench')
            //     obj.jumpToIndex(obj.scene.index)
            // }
        }
    },
    MyConcern: {
        screen: MyConcern,
        navigationOptions: {
            /* eslint-disable */
            // tabBarLabel: ({tintColor,focused}) => {
            //     return <Text style={[{ color: focused ? tintColor : null},styles.tabText]}>我的关注</Text>
            // },
            tabBarLabel: '我的关注',
            tabBarIcon: ({tintColor,focused}) => {
                return <MaterialIcons name={'person-add'} size={styles.iconSize} style={{color:focused ? tintColor : Colors.textColor}} />
            },
            tabBarButtonComponent: TouchableOpacity
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
            // tabBarLabel: ({tintColor,focused}) => {
            //     return <Text style={[{ color: focused ? tintColor : null},styles.tabText]}>我</Text>
            // },
            tabBarLabel: '我',
            tabBarIcon: ({tintColor,focused}) => {
                return <MaterialIcons name={'person-outline'} size={styles.iconSize} style={{color:focused ? tintColor : Colors.textColor}} />
            },
            tabBarButtonComponent: TouchableOpacity
            // tabBarOnPress: obj => {
            //     DeviceEventEmitter.emit('Mine')
            //     obj.jumpToIndex(obj.scene.index)
            // }
        }
    },
  },TabNavigatorConfig)

  const styles = StyleSheet.create({
    tabText: {
        textAlign:'center',
        fontSize:12
    },
    iconSize: 22
  })

  export default createAppContainer(TabNav)