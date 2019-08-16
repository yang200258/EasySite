import React,{Component} from 'react';
import {View,StatusBar,Platform,DeviceInfo} from 'react-native';
import Colors from '../../utils/Colors';
import PropTypes from 'prop-types';
const STATUS_BAR_HEIGHT = DeviceInfo.isIPhoneX_deprecated ? 0 : 20;//状态栏的高度

const StatusBarShape = {//设置状态栏所接受的属性
    barStyle: PropTypes.oneOf(['light-content', 'default','dark-content']),
    hidden: PropTypes.bool,
    backgroundColor: PropTypes.string,
};

export default class StatusBarBase extends Component {
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
        return (
            <View style={styles.statusBar}>
                <StatusBar {...this.props.statusBar} />
            </View>
        )
    }
}
const styles = StyleSheet.create({

    statusBar: {
        height:Platform.os == 'ios' ? STATUS_BAR_HEIGHT : 0
    },
})

StatusBarBase.propTypes = {
    statusBar: PropTypes.shape(StatusBarShape),
}