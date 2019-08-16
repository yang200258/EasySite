import Types from '../types';


/**
 * 设置登录账户数据
 * @param account
 * @returns {{type: string, theme: *}}
 */
export const setAccount = (account) => {
    return {type: 'SET_ACCOUNT',account:account}
}