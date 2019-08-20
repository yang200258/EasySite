import React,{Component} from 'react';
import {View,ActivityIndicator,StyleSheet,Text,Modal} from 'react-native';
import NavigationBar from './NavigationBar';
import PropTypes from 'prop-types';
import BackBase from './BackBase';
import {connect} from "react-redux";
class LoadingIndicator extends Component {
    constructor(props) {
        super(props)
        this.backPress = new BackBase({backPress: this.onBackPress})
    }
      static defaultProps = {
          loading: false,
          loadingText: '加载中...',
          background: 'rgba(0,0,0,.5)',
          textColor: '#fff'
      } 
    componentDidMount() {
        this.backPress.componentDidMount()
    }
    componentWillUnmount() {
        this.backPress.componentWillUnmount()
    }
    onBackPress = () => {
        console.log(this.props)
        // const { dispatch, nav } = this.props;
        // if (nav.routes[0].index === 0) {
        //     return false;
        // }
        this.props.onRequestClose()
        return false;
    }
    render() {
        let {loading,loadingText,background,textColor} = this.props
        let navigationBarProps = {hide: true,statusBar: {backgroundColor: loading ? background : textColor,barStyle: loading ? 'light-content' : 'dark-content',hidden: false}}
        console.log(loading,loadingText,background,textColor);
        return (
            <View style={[styles.center,styles.poi]}>
                <NavigationBar {...navigationBarProps} />
                <Modal
                    animationType='fade'            // 淡入淡出
                    transparent={true}              // 透明
                    visible={loading}    // 根据isModal决定是否显示
                    onRequestClose={() => {this.props.onRequestClose}}  // android必须实现
                >
                    <View style={[{backgroundColor: background,zIndex: 999},styles.center,styles.colors]}>
                        <ActivityIndicator size="large" color={textColor} animating={true} />
                        <Text style={{color:textColor}}>{loadingText}</Text>
                    </View>
                </Modal>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    poi: {
        position: 'absolute',
        top: 0,
        left:0,
        bottom:0,
        right: 0
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
    },
  })

  LoadingIndicator.propsTypes = {
    loading: PropTypes.bool,
    loadingText: PropTypes.string,
    background: PropTypes.string,
    color: PropTypes.string,
  }
  const mapStateToProps = state => ({
    nav: state.nav
})
export default connect(mapStateToProps)(LoadingIndicator)
