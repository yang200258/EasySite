import React from 'react';
import {Text,DeviceEventEmitter,StyleSheet,TouchableOpacity} from 'react-native';
import Colors from '../utils/Colors'
import {createBottomTabNavigator,createAppContainer} from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import ClockPage from '../views/ClockPages/ClockPage';
import Mine from '../views/Mine/Mine';
import WorkBench from '../views/WorkBench/WorkBench';
import MyConcern from '../views/MyConcern/MyConcern';

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'



  const TABS = {
    Clock: {
        screen: ClockPage,
        navigationOptions: {
            /* eslint-disable */
            // gestureResponseDistance: {horizontal: 20},
            headerTitle : '2019-08-05',
            tabBarLabel: '考勤',
            tabBarIcon: ({tintColor,focused}) => {
                return <FontAwesome name={'calendar'} size={styles.iconSize} style={{color:focused ? tintColor : Colors.textColor}} />
            },
            tabBarButtonComponent: TouchableOpacity,
        }
    },
    Work: {
        screen: WorkBench,
        navigationOptions: {
            tabBarLabel: '工作台',
            title: '工作台',
            tabBarIcon: ({tintColor,focused}) => {
                return <AntDesign name={'setting'} size={styles.iconSize} style={{color:focused ? tintColor : Colors.textColor}} />
            },
            tabBarButtonComponent: TouchableOpacity
        }
    },
    Concern: {
        screen: MyConcern,
        navigationOptions: {
            tabBarLabel: '我的关注',
            title: '我的关注',
            tabBarIcon: ({tintColor,focused}) => {
                return <MaterialIcons name={'person-add'} size={styles.iconSize} style={{color:focused ? tintColor : Colors.textColor}} />
            },
            tabBarButtonComponent: TouchableOpacity
        }
    },
    person: {
        screen: Mine,
        navigationOptions: {
            tabBarLabel: '我',
            title: '我',
            tabBarIcon: ({tintColor,focused}) => {
                return <MaterialIcons name={'person-outline'} size={styles.iconSize} style={{color:focused ? tintColor : Colors.textColor}} />
            },
            tabBarButtonComponent: TouchableOpacity
        }
    },
  }
  const {Clock,Work,Concern,person} = TABS
  const tabs = {Clock,Work,Concern,person}
  const TabNav = createMaterialBottomTabNavigator(tabs,{
    labeled: true,
    shifting: false,
    activeColor: Colors.mainColor,
    inactiveColor: Colors.textColor,
    barStyle: { backgroundColor: '#fff' },
    // tabBarPosition: 'bottom',
    // swipeEnabled: true,
    // animationEnabled: true,
    // backBehavior: "none",
    // tabBarOptions: {
    //     upperCaseLabel: false,//是否使标签大写，默认为true
    //     activeTintColor: Colors.mainColor,
    //     inactiveTintColor: Colors.textColor,
    //     activeBackgroundColor: Colors.unMainColor,
    //     inactiveBackgroundColor: Colors.unMainColor,
    //     initialRouteName: 'Clock',
    //     showIcon: true,
    //     showLabel: true,
    //     labelStyle: {
    //         textAlign:'center',
    //         fontSize:12
    //       },
    //     indicatorStyle: {//标签指示器的样式对象（选项卡底部的行）。安卓底部会多出一条线，可以将height设置为0来暂时解决这个问题
    //         height: 0,
    //     },
    //   },
  })

  const styles = StyleSheet.create({
    tabText: {
        textAlign:'center',
        fontSize:12
    },
    iconSize: 22
  })

  export default TabNav