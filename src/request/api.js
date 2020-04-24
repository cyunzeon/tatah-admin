import http from './http'

//登录管理
//登录
export const iULogin = p => http.get('/auth/login',p) 
//退出登录
export const loginOut = p => http.get('/auth/loginOut',p) 
//获取菜单目录
export const loadMenuInfo = p => http.post('/auth/loadMenuInfo',p) 

//用户管理
//查询用户信息管理列表
export const loadUserList = p => http.post('/user/loadUserList',p) 
//查询用户账户详情
export const loadUserAccountInfo = p => http.post('/user/loadUserAccountInfo',p) 
//查询用户详情
export const loadUserVerifyInfo = p => http.post('/user/loadUserVerifyInfo',p) 
//查询用户账户充值/提现列表
export const loadCzORTxList = p => http.post('/user/loadCzORTxList',p) 
//查询用户账户消费/收益记录列表
export const loadUserConsumptionList = p => http.post('/user/loadUserConsumptionList',p) 
//查询用户账户明细列表
export const loadUserDetailList = p => http.post('/user/loadUserDetailList',p) 
//编辑用户详情
export const editUserVerify = p => http.post('/user/editUserVerify',p)
//保密头像
export const userhidehead = p => http.post('/user/userhidehead',p)
//查询流失用管理列表
export const loadUserLossList = p => http.post('/user/loadUserLossList',p)
//查询用户账户兑换列表
export const loadUserExchangeList = p => http.post('/user/loadUserExchangeList',p)
//查询用户审核列表
export const loadUserExamineList = p => http.post('/user/loadUserExamineList',p)
//查询用户实名列表
export const loadUserInformationList = p => http.post('/user/loadUserInformationList',p)
//用户审核
export const userExamine = p => http.post('/user/userExamine',p)
//实名审核
export const userInformation = p => http.post('/user/userInformation',p)
//查询俱乐部列表
export const loadGroupList = p => http.post('/user/loadGroupList',p)
//查询俱乐部成员列表
export const loadGroupMemberList = p => http.post('/user/loadGroupMemberList',p)

//内容管理
//广告列表
export const loadManageAdvertisingList = p => http.post('/content/loadManageAdvertisingList',p)
//弹窗列表
export const loadHomeWindowList = p => http.post('/content/loadHomeWindowList',p)
//删除广告
export const delManageAdvertising = p => http.post('/content/delManageAdvertising',p)
//删除头像
export const updateUserPortrait = p => http.post('/content/updateUserPortrait',p)
//操作广告  修改/新增
export const operationManageAdvertising = p => http.post('/content/operationManageAdvertising',p)
//查询用户头像管理列表
export const loadUserPortraitList = p => http.post('/content/loadUserPortraitList',p)
//查询用户举报管理列表
export const loadUserReportList = p => http.post('/content/loadUserReportList',p)
//查询用户视频管理列表
export const loadUserVideoExaminetList = p => http.post('/content/loadUserVideoExaminetList',p)
//审核视频管理列表
export const updateVideoExaminet = p => http.post('/content/updateVideoExaminet',p)
//查询用户礼物管理列表
export const loadUserGiftList = p => http.post('/content/loadUserGiftList',p)
//操作弹窗
export const operationHomeWindow = p => http.post('/content/operationHomeWindow',p)
//删除弹窗
export const delHomeWindow = p => http.post('/content/delHomeWindow',p)
//操作礼物  修改/新增
export const operationGift = p => http.post('/content/operationGift',p)
//用户动态
export const loadUserCircleArticleList = p => http.post('/content/loadUserCircleArticleList',p)
//删除用户动态
export const updateUserCircleArticleList = p => http.post('/content/updateUserCircleArticleList',p)
//聚会投诉管理
export const findAllUpc = p => http.post('/party/findAllUpc',p)
//聚会投诉审核
export const partyInfo = p => http.post('/party/partyInfo',p)

//财务管理
//充值列表
export const loadRechargeList = p => http.post('/finance/loadRechargeList',p)
//加钻石
export const addRecharge = p => http.post('/finance/addRecharge',p)
//扣钻石
export const subtractRecharge = p => http.post('/finance/subtractRecharge',p)
//提现订单列表
export const loadUserCashList = p => http.post('/finance/loadUserCashList',p)
//加钻石审批列表
export const loadaddRechargeList = p => http.post('/finance/loadaddRechargeList',p)
//钻石审核
export const operationAddRecharge = p => http.post('/finance/operationAddRecharge',p)
//提现申请 
export const operationUserCash = p => http.post('/finance/operationUserCash',p)
//申请补单 
export const operationRecharge = p => http.post('/finance/operationRecharge',p)

//权限管理
//删除用户
export const delUser = p => http.post('/jurisdiction/delUser',p) 
//查询角色对应权限记录
export const loadRolePermission = p => http.post('/jurisdiction/loadRolePermission',p) 
//删除用户角色
export const delUserRole = p => http.post('/jurisdiction/delUserRole',p) 
//编辑用户角色
export const editUserRole = p => http.post('/jurisdiction/editUserRole',p) 
//查询用户对应角色记录
export const loadUserRoleList = p => http.post('/jurisdiction/loadUserRoleList',p) 
//编辑权限
export const editPermission = p => http.post('/jurisdiction/editPermission',p) 
//删除权限
export const delPermission = p => http.post('/jurisdiction/delPermission',p) 
//查询所有权限
export const loadPermissionList = p => http.post('/jurisdiction/loadPermissionList',p) 
//设置权限
export const handlerRolePermission = p => http.post('/jurisdiction/handlerRolePermission',p) 
//删除角色
export const delRole = p => http.post('/jurisdiction/delRole',p) 
//编辑角色
export const editRole = p => http.post('/jurisdiction/editRole',p) 
//查询所有角色
export const loadRoleList = p => http.post('/jurisdiction/loadRoleList',p) 
//编辑用户
export const editUser = p => http.post('/jurisdiction/editUser',p) 
//查询所有后台用户
export const loadAdminList = p => http.post('/jurisdiction/loadUserList',p)
//查询系统日志列表
export const loadAdminlogList = p => http.post('/system/loadAdminlogList',p) 
//后台管理上传图片
export const uploadImage = p => http.post('/system/uploadImage',p) 


//游戏性格
export const loadSquareQuestionList = p => http.post('/game/loadSquareQuestionList',p) 
//操作性格
export const editSquareQuestion = p => http.post('/game/editSquareQuestion',p) 
//冒险
export const loadAdventureTaskList = p => http.post('/game/loadAdventureTaskList',p) 
//操作冒险
export const editAdventureByCtastId = p => http.post('/game/editAdventureByCtastId',p) 


//数据统计
export const loadUserData = p => http.post('/user/loadUserData',p) 
//数据图像
export const loadUserStatistics = p => http.post('/user/loadUserStatistics',p) 
