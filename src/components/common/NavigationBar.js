import React,{Component} from 'react'
import {DeviceInfo,View,StyleSheet,Platform,Text,StatusBar} from 'react-native'
import PropTypes from 'prop-types';
import Colors from '../../utils/Colors'

const NAV_BAR_HEIGHT_IOS = 44;//导航栏在iOS中的高度
const NAV_BAR_HEIGHT_ANDROID = 50;//导航栏在Android中的高度
const STATUS_BAR_HEIGHT = DeviceInfo.isIPhoneX_deprecated ? 0 : 20;//状态栏的高度
const StatusBarShape = {//设置状态栏所接受的属性
    barStyle: PropTypes.oneOf(['light-content', 'default','dark-content']),
    hidden: PropTypes.bool,
    backgroundColor: PropTypes.string,
};
class NavigationBar extends Component {
    //设置默认属性
    static defaultProps = {
        statusBar: {
            barStyle: 'dark-content',
            backgroundColor: Colors.navColor,
            color: '#000',
            hidden: false,
        },
    }
    render() {
        let statusBar = !this.props.statusBar.hidden ?
            <View style={styles.statusBar}>
                <StatusBar {...this.props.statusBar} />
            </View> : null;
        let titleView = this.props.titleView ? this.props.titleView :
            <Text ellipsizeMode="head" numberOfLines={1} style={styles.title}>{this.props.title}</Text>;
        let content = this.props.hide ? null : 
            <View style={styles.navBar}>
                <View style={styles.navBarTitleContainer}>
                    {titleView}
                </View>
                {this.getButtonElement(this.props.rightButton)}
            </View>
        return(
            <View style={styles.navBarContainer}>
                {statusBar}
                {content}
            </View>
        )
    }
    getButtonElement(data) {
        return <View style={styles.navButton}>{data ? data : null}</View>
    }
}
NavigationBar.propTypes = {
    title: PropTypes.string,
    hide: PropTypes.bool,
    rightButton: PropTypes.element,
    statusBar: PropTypes.shape(StatusBarShape),
    titleView: PropTypes.element
}
const styles = StyleSheet.create({
    navBarContainer: {
        backgroundColor: Colors.navColor
    },
    statusBar: {
        height:Platform.os == 'ios' ? STATUS_BAR_HEIGHT : 0
    },
    title:{
        fontSize: 18,
        color:'#000',
        marginLeft: 24
    },
    navButton: {
        alignItems: 'center',
        marginRight: 16
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
    },
    navBarTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})


export default NavigationBar

