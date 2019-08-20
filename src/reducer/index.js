import {combineReducers} from 'redux'
import {rootCom, RootNavigator} from '../navigator/stackNavigator';
import StorageUtil from '../utils/storage';

let loginStatus ;
StorageUtil.get('loginToken').then(res => {
  loginStatus = res ? true : false
})
//1.指定默认state
const navState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams(rootCom));

/**
 * 2.创建自己的 navigation reducer，
 */
const navReducer = (state = navState, action) => {
    const nextState = RootNavigator.router.getStateForAction(action, state);
    // RootNavigator.router.getStateForAction = (action, state) => {
    //   //页面是Tab并且 global.user.loginState = false || ''（未登录）
    //   console.log(action, state,loginStatus);
    //   if (action.routeName === 'main' && !loginStatus) {
    //       let routes = [
    //           ...state.routes,
    //           {key: 'id-'+Date.now(), routeName: 'init'},
    //       ];
    //       return {
    //           ...state,
    //           routes,
    //           index: routes.length - 1,
    //       };
    //   } else {
    //     console.log('return nextState',nextState);
    //     // 如果`nextState`为null或未定义，只需返回原始`state`
    //     return nextState || state;
    //   }
    // }
    // console.log('return state',state);
    return nextState || state;
};

/**
 * 3.合并reducer
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */
    const index = combineReducers({
        nav: navReducer,
    });
    
export default index;