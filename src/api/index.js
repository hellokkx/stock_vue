import { get, post } from './request'


//--------------------登录注册相关--------------------

// 用户登录
// export const login = ({ password, userAccount }) => post('/login', { password, userAccount })
export const login = ({ password, userAccount }) => post('/user/log/login', { password, userAccount })

//邮箱登录
// export const emailLogin = ({ email ,captcha }) => post('/loginByCaptcha', { email ,captcha })
export const emailLogin = ({ email ,captcha }) => post('/user/log/loginByCaptcha', { email ,captcha })

// 注册用户
// export const register = ({ password, userAccount, email ,captcha}) => post('/register', { password, userAccount,email,captcha })
export const register = ({ password, userAccount, email ,captcha}) => post('/user/log/register', { password, userAccount,email,captcha })

//获取验证码
// export const getCaptcha = ({email})=>get('/sendCaptcha',{email})
export const getCaptcha = ({email})=>get('user/log/sendCaptcha',{email})


//--------------------股票收藏夹数据相关--------------------
//获取收藏数据
// export const getCollection = ({userId})=>get('/getCollection',{userId})
export const getCollection = ({userid,collectionname})=>post('/user/selectCollectionGroup',{userid,collectionname})

//删除收藏夹数据
export const deleteCollection = ({collectionid})=>post('/user/deleteCollection',{collectionid})

//添加收藏夹数据相关
export const addCollection=({userid,collectionname})=>post('/user/addCollectionGroup',{userid,collectionname})

//添加收藏夹数据相关
export const updateCollection=({collectionid,collectionname})=>post('/user/changeCollectionGroupName',{collectionid,collectionname})

//--------------------股票数据相关--------------------

//获取股票数据
// export const getStocklist =()=>get('/stockList')
export const getStocklist =()=>get('/StockData/getAllStock')

//将某只股票添加到收藏夹内
export const addToCollection =({symbol,collectionid})=>post('/user/addStockToCollection',{symbol,collectionid})

//获取某一收藏夹内的股票
export const getCollectionStar =({collectionid})=>post('/user/selectStockFromCollection',{collectionid})

//删除收藏夹内的某一条数据
export const deleteStarCollection =({symbol,collectionid})=>post('/user/deleteFromCollection',{symbol,collectionid})

//获取股票数据
export const getStockDataBySymbol =({symbol})=>get('/StockData/getStockDataBySymbol',{symbol})

//获取龙虎榜相关数据
export const getTopList =()=>get('/StockData/getTopList')

//获取大盘热点新闻
export const getMajorNews =()=>get('/StockData/getMajorNews')

//--------------------用户数据相关--------------------
//获取用户数据
// export const getUserList =()=>get('/getAllUser')
export const getUserList = ()=>get('/user/getAllUser')

//根据用户id获取数据
export const getUserById = ({userId})=>get('/user/getUserById',{userId})

//根据用户名获取数据
export const getUserByAccount = ({userAccount})=>get('/user/getUserByAccount',{userAccount})

//删除用户数据
export const deleteUser = ({id})=>get('/delete',{id})





