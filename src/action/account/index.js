import Types from '../types';


/**
 * 设置登录账户数据
 * @param username
 * @returns {{type: string, theme: *}}
 */
export const setUsername = (username) => {
    return {type: 'SET_USERNAME',username:username}
}