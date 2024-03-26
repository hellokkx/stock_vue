import { get, post } from './request'

//----------歌单相关----------

// 根据歌单ID查询歌单
export const getSongList = (songListId) => get('/songList/selectByPrimaryKey', songListId)

// 根据用户ID查询歌单
export const getUserSongList = (userId) => get('/songList/selectByUserId', userId)



//----------歌手相关----------

// 根据歌手ID查询歌手信息
export const getSinger = (singerId) => get('/singer/selectSingerByPrimaryKey', singerId)



//----------歌曲相关----------

// 根据歌曲id查询歌曲对象
export const getSong = (songId) => get('/song/detail', songId)

// 根据歌手名字精确查询歌曲
export const getSongBySingerName = (singerName) => get('/song/getIdBySingerName', singerName)

// 根据歌手名字模糊查询歌曲
export const getSongBylikeSingerName = (likeSingerName) => get('/song/getIdLikeSingerName', likeSingerName)

// 根据歌曲名字精确查询歌曲
export const getSongBySongName = (songName) => get('/song/songOfSongName', songName)

// 根据歌曲名字模糊查询歌曲
export const getSongBylikeSongOfName = (likeSongOfName) => get('/song/likeSongOfName', likeSongOfName)

// 根据歌单ID，歌曲名升序返回歌曲
export const sortBySongNameAsc = (SongListId) => get('/song/selectBySongNameAsc', SongListId)

// 根据歌单ID，歌曲名降序返回歌曲
export const sortBySongNameDesc = (SongListId) => get('/song/selectBySongNameDesc', SongListId)

// 根据歌单ID，歌手名升序返回歌曲
export const sortBySingerNameAsc = (SongListId) => get('/song/selectBySingerNameAsc', SongListId)

// 根据歌单ID，歌手名降序返回歌曲
export const sortBySingerNameDesc = (SongListId) => get('/song/selectBySingerNameDesc', SongListId)

// 根据歌手ID，歌曲名升序返回歌曲
export const sortBySingerIdSNAsc = (SingerId) => get('/song/selectBySingerIdSNAsc', SingerId)

// 根据歌手ID，歌曲名降序返回歌曲
export const sortBySingerIdSNDesc = (SingerId) => get('/song/selectBySingerIdSNDesc', SingerId)



//----------用户相关----------

// 用户登录
export const login = ({ password, userAccount }) => post('/login', { password, userAccount })

// 注册用户
export const register = ({ password, userAccount }) => post('/register', { password, userAccount })

// 修改密码
export const updatePassword = ({ newPassword, oldPassword, userId }) => post('/user/updatePassword', { newPassword, oldPassword, userId })

// 更新用户头像
export const updateUserAvatar = ({ file, id }) => post('/user/updateUserAvatar', { file, id })

// 修改个人资料
export const updateUserInfo = ({ introduction, nickName, sex, userAccount, userId }) => post('/user/updateUserInfo', { introduction, nickName, sex, userAccount, userId })

// 根据用户账号查询用户信息
export const getUserInfo = (userAccount) => get('/user/getUserByAccount', userAccount)

// 根据用户ID查询用户信息
export const getUserInfo2 = (userId) => get('/user/getUserById', userId)



//----------评论相关----------

// 添加评论
export const addComment = ({ content, song_Id, userId }) => post('/comment/add', { content, song_Id, userId })

// 查询某个歌曲下的所有评论
export const getCommentOfSong = (songId) => get('/comment/commentOfSongId', songId)



//----------收藏相关----------

// 添加收藏
export const addCollect = ({ songId, userId }) => post('/collect/add', { songId, userId })

// 删除收藏
export const dropCollect = ({ songId, userId }) => get('/collect/delete', { songId, userId })

// 查询一个用户的收藏列表
export const inquireCollect = (userId) => get('/collect/collectOfUserId', userId)
