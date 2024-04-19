import { get, post } from './request'


//----------用户相关----------

// 用户登录
export const login = ({ password, userAccount }) => post('/login', { password, userAccount })

//邮箱登录
export const emailLogin = ({ email ,captcha }) => post('/loginByCaptcha', { email ,captcha })

// 注册用户
export const register = ({ password, userAccount, email ,captcha}) => post('/register', { password, userAccount,email,captcha })

//获取验证码
export const getCaptcha = ({email})=>get('/sendCaptcha',{email})

//获取股票数据
export const getStocklist =()=>get('/stockList')

//获取用户数据
export const getUserList =()=>get('/getAllUser')

//获取收藏数据
export const getCollection = ({userId})=>get('/getCollection',{userId})

//删除用户数据
export const deleteUser = ({id})=>get('/delete',{id})

//删除股票数据
export const deleteCollection = ({symbol,userId})=>get('/deleteCollection',{symbol,userId})

//添加收藏数据
export const addCollection = ({symbol,userId})=>get('/addCollection',{symbol,userId})
