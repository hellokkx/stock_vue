import { get, post } from './request'


//----------用户相关----------

// 用户登录
export const login = ({ password, userAccount }) => post('/login', { password, userAccount })

//邮箱登录
export const emailLogin = ({ email ,captcha }) => post('/emailLogin', { email ,captcha })

// 注册用户
export const register = ({ password, userAccount, email ,captcha}) => post('/register', { password, userAccount,email,captcha })

//获取验证码
export const getCaptcha = ({email})=>get('/sendCaptcha',{email})

