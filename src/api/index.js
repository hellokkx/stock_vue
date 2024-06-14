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
export const getUserList = ()=>get('/user/getAllUser')

//根据用户id获取数据
export const getUserById = ({userId})=>get('/user/getUserById',{userId})

//根据用户名获取数据
export const getUserByAccount = ({userAccount})=>get('/user/getUserByAccount',{userAccount})

//删除用户数据
export const deleteUser = ({id})=>get('/delete',{id})


//-----------------------策略数据相关------------------

//管理员查看策略
export const getStrategy = ({strname})=>post('/user/RootGetStr',{strname})//管理员级别的

//用户查看策略
export const getUserStrategy = ({strname})=>post('/user/getStr',{strname})//用户级别的--ifpass=YES

//策略工程师上传策略
export const uploadStrategy = ({strname,strgrade})=>post('/PythonConnection/UploadStr',{strname,strgrade})

//回测股票数据
export const startStrategy = ({ts_code,str})=>post('/PythonConnection/startStr',{ts_code,str})

//删除策略
export const deleteStrategy = ({strid})=>post('/user/RootDeleteStr',{strid})

//审核策略
export const checkStrategy = ({strid,ifpass,strname,strgrade})=>post('/user/RootCheckStr',{strid,ifpass,strname,strgrade})


//-----------------------算法数据相关------------------

//管理员查看算法
export const getAlgorithm = ({algname})=>post('/user/RootGetAlg',{algname})

//用户查看算法
export const getUserAlgorithm = ({algname})=>post('/user/getAlg',{algname})

//上传算法
export const uploadAlgorithm = ({algname,alggrade})=>post('/PythonConnection/UploadAlg',{algname,alggrade})

//预测股票数据
export const predictStockData =({ts_code,alg})=>post('/PythonConnection/startPre',{ts_code,alg})

//删除算法
export const deleteAlgorithm = ({algid})=>post('/user/RootDeleteAlg',{algid})

//审核算法
export const checkAlgorithm = ({algid,ifpass,algname,alggrade})=>post('/user/RootCheckAlg',{algid,ifpass,algname,alggrade})




