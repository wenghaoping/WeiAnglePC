/**
 * Created by WengHaoping on 2017/6/5.
 */

/* const URL ='https://dev.weitianshi.cn/' */

/* URL汇总 */

export default
{
  /* 总地址,下载用的 */
  // weitianshi: 'https://pc.dev.weitianshi.cn/', // 下载用
  // weitianshiLine: 'https://pc.dev.weitianshi.cn/', // 上传
  weitianshi: 'https://wts.weitianshi.cn/', // 上线接口下载用
  weitianshiLine: 'https://wts.weitianshi.cn/', // 上线接口上传
  openUrl: 'https://www.weitianshi.cn/workbench/#/API/DD', // 一键尽调对外接口
  oneUrl: 'https://www.weitianshi.cn/workbench/#/', // 一键尽调对内接口
  // 一键尽调跳转用接口
  // openUrl:"https://dev.weitianshi.cn/workbench/#/API/DD",

  investorMatch: 'api/project/InvestorMatch', // 一键尽调买家图谱

  /* 上传用 */

  /* 登陆接口 */
  returnQrCredential: 'api/auth/returnQrCredential',   // (获取生成二维码的uuid接口)，返回值
  ajaxPolling: 'api/auth/ajaxPolling',   // 获取登陆信息
  getWxosProjectData: 'api/v/project/getWxosProjectData',   // 创建页面获取微信信息

  /* 项目批量上传 */
  projectUpload: 'api/v/project/projectUpload?token=',

  /* 项目列表页 */
  getNodeCount: 'api/project/getNodeCount', // 项目节点数量
  getAllNode: 'api/category/getAllNode', // 获取所有项目节点
  setScheduleOrder: 'api/category/setScheduleOrder', // 设置自定义进度标签
  deleteUpload: 'api/v/project/deleteUpload',  // 删除批量上传的文件
  saveUpload: 'api/v/project/saveUpload',  // 修改批量上传文件的绑定
  titleSift: 'api/v/project/titleSift', // 项目列表表头数据
  getProjectList: 'api/v/project/getProjectList',  // 获取項目列表
  deleteProject: 'api/v/project/deleteProject', // 删除项目
  deleteSchedule: 'api/category/deleteSchedule', // 删除项目节点
  getCompetitionIndex: '/api/competition/getCompetitionIndex', // 获取大赛名称、阶段、评分指标
  deleteCompetitionIndex: '/api/competition/deleteCompetitionIndex', // 删除自定义的指标
  createCompetitionIndex: '/api/competition/createCompetitionIndex', // 自定义指标的创建和更新
  exportScoreByCompetition: '/api/competition/exportScoreByCompetition', // 导出大赛的统计评分数据，数据按照大赛的阶段分成不同的sheet表
  getCheckedColumn: '/api/project/getCheckedColumn', // 获取用户选中显示的字段
  editCheckedColumn: '/api/project/editCheckedColumn', // 修改用户选中显示的字段
  // 项目详情页
  getProjectDetail: 'api/project/getProjectDetail',  // 获取項目詳情
  deleteCoreTeam: 'api/v/project/deleteCoreTeam',  // 删除核心成员
  deleteFinance: 'api/v/project/deleteFinance',  // 删除历史融资
  deleteDevelop: 'api/v/project/deleteDevelop',  // 删除里程碑
  deleteBrand: 'api/v/project/deleteBrand',   // 删除品牌
  editProject: 'api/v/project/editProject',  // 项目编辑、新建
  getOneCompany: 'api/dataTeam/getOneCompany',  // 获取公司信息
  setProjectSchedule: '/api/project/setProjectSchedule', // 设置项目进度

  /* 项目编辑页 */
  getWxProjectCategory: 'api/category/getProjectCategory',  // 编辑项目各种标签接口
  getArea: 'api/category/getArea',  // 二级城市接口
  createStatusPro: 'api/category/createStatusPro',  // 添加自定义运营状态
  createCustomTag: 'api/category/createCustomTag',  // 添加自定义标签/个人,团队,人脉
  selectCompany: 'api/dataTeam/selectCompany',  // 公司名称提示
  getFileType: 'api/category/getFileType',  // 文件分组设置选项
  getAllFileType: 'api/category/getAllFileType',  // 文件分组设置选项(全)
  createFileType: 'api/category/createFileType',  // 添加文件分组设置
  updateProjectCompany: 'api/v/project/updateProjectCompany', // 更新公司,一键尽调的时候,是否将此公司作为自己的公司
  getProjectAllData: 'api/dataTeam/getProjectAllData', // 一键同步,获取同步信息
  createDataCustomTag: 'api/category/createDataCustomTag', // 一键同步,项目标签的添加

  /* 一键尽调 */
  getCrawlerCompany: 'api/dataTeam/getCrawlerCompany',  // 一键尽调-公司(模糊匹配)
  selectCompanyByName: 'api/dataTeam/selectCompanyByName',  // 一键尽调-公司(精准匹配)
  getCrawlerLeader: 'api/dataTeam/getCrawlerLeader',  // 一键尽调-公司高管
  getCrawlerBrand: 'api/dataTeam/getCrawlerBrand',  // 一键尽调-商标
  getCrawlerTeam: 'api/dataTeam/getCrawlerTeam',  // 一键尽调-核心成员
  getCrawlerHistoryFinance: 'api/dataTeam/getCrawlerHistoryFinance',

  /* 一键尽调加入项目库/联系项目方 */
  getTransToProject: '/api/dataTeam/transToProject', // 加入项目库
  createServiceLog: '/api/user/createServiceLog', // 联系项目方

  // 一键尽调-历史融资
  getCrawlerMilestone: 'api/dataTeam/getCrawlerMilestone',  // 一键尽调-里程碑
  getCrawlerNews: 'api/dataTeam/getCrawlerNews',  // 一键尽调-新闻
  getCrawlerCompeting: 'api/dataTeam/getCrawlerCompeting',  // 一键尽调-竞品
  getCrawlerProject: 'api/dataTeam/getCrawlerProject',  // 一键尽调-项目

  // 身份认证相关
  getGroupIdentify: 'api/category/getGroupIdentify', // 身份类型列表
  setUserGroup: 'api/user/setUserGroup', // 设置身份类型
  saveUserIdentity: 'api/user/saveUserAuthentication', // 保存身份认证信息
  createUserProjectCase: 'api/v/project/createUserProjectCase', // 保存投资成功案例
  getUserGroupByStatus: '/api/user/getUserGroupByStatus', // 核对用户认证状态（用于判断用户是否能进入认证相关页面）
  uploadCard: 'api/user/uploadCard?token=', // 上传名片
  deleteCard: 'api/user/deleteCard', // 删除名片
  // 登录方面相关
  authCaptcha: 'api/auth/authCaptcha', // 用户注册,登录获取验证码接口
  loginForCaptcha: 'api/auth/loginForCaptcha', // 用户注册/登录接口(验证码登录)
  loginForPassword: 'api/auth/loginForPassword', // 用户登录接口(账号密码)
  resetPasswordCaptcha: 'api/auth/resetPasswordCaptcha', // 重置密码获取验证码接口
  resetPassword: 'api/auth/resetPassword', // 重置密码接口
  bindTelephone: '/api/user/bindUser', // 绑定手机号码
  checkUserInfo: 'api/user/checkUserInfo', // 获取用户信息

  /* 我的人脉 */
  uploadConnectCard: 'api/user/uploadConnectCard?token=', // 人脉图片上传

  userTitleSift: 'api/user/userTitleSift', // 人脉列表表头
  getConnectUser: 'api/user/getConnectUser', // 获取人脉列表
  setConnectTag: 'api/user/setConnectTag', // 给人脉设置标签
  deleteConnectUser: 'api/user/deleteConnectUser', // .删除人脉
  createUserCard: 'api/user/createUserCard', // 添加人脉
  deleteConnectCard: 'api/user/deleteConnectCard', // 删除人脉名片(图片)
  getOneUserInfo: 'api/user/getOneUserInfo', // 人脉详情
  setJudgeAuth: 'api/user/setJudgeAuth', // 设置是否成为评委
  /* 跟进记录 */
  get_follow_records: '/api/project/get_follow_records', // 获取跟进记录总列表
  get_follow_record: '/api/project/get_follow_record', // 获取跟进记录单独
  getToInvestor: '/api/project/getToInvestor', // 获取跟进记录表头
  delete_follow_record: '/api/project/delete_follow_record', // 删除跟进记录
  match_my_relation: '/api/user/match_my_relation', // 模糊匹配我的人脉,添加跟进里是用
  add_follow_record: '/api/project/add_follow_record', // 添加跟进记录
  getProjectFollowList: 'api/v/project/getProjectFollowList', // 项目跟进记录列表
  getEnjoyedInvestorBasicInfo: 'api/user/getEnjoyedInvestorBasicInfo', // 获取联系方式机构

  // 文件管理
  getProjectFiles: 'api/v/project/getProjectFiles', // 文件管理列表数据
  deleteAtUpload: 'api/v/project/deleteAtUpload',  // bp文件软删除
  deleteAtFile: 'api/v/project/deleteAtFile',  // 项目文件软删除
  download: 'api/v/project/download',  // 文件下载
  uploadFile: 'api/v/project/uploadFile?token=',  // 文件上传
  setFileType: 'api/v/project/setFileType',  // 文件分组设置
  deleteFileType: 'api/v/project/deleteFileType', // 删除文件分组
  renameFileType: 'api/category/renameFileType', // 重命名文件分组

  /* 意向项目(人脉详情右边) */
  getEnjoyProjectsGroup: '/api/v/project/getEnjoyProjectsGroup', // 意向项目归总(图表)
  getEnjoyProjects: '/api/v/project/getEnjoyProjects', // 意向项目列表,
  setEnjoyProjectSchedule: 'api/v/project/setEnjoyProjectSchedule', // 设置意向项目的跟进进度

  /* 推荐项目(人脉详情右边) */
  getInvestorsMatchProjects: 'api/investors/getInvestorsMatchProjects', // 推荐项目
  exceptMatchAction: 'api/v/project/exceptMatchAction', // 移除买家图谱匹配(废弃)=====================
  removeInvestor: 'api/project/removeInvestor', // 移除买家图谱匹配
  /* 意向投资人(项目详情右边) */
  getEnjoyedInvestors: 'api/project/getEnjoyedInvestors', // 意向投资人列表
  getEnjoyedInvestorsGroup: 'api/project/getEnjoyedInvestorsGroup', // 意向投资人归总(图表)

  /* 买家图谱*(项目详情右边) */
  getProjectMatchInvestors: 'api/project/getProjectMatchInvestors', // 买家图谱列表
  getInvestorInfo: 'api/investors/getInvestorInfo', // 投资人详情
  /* 项目推送 */
  matchProject: 'api/v/project/matchProject', // 我的人脉-推送（模糊匹配我的项目(废弃)=====================
  getPushProjects: '/api/project/getPushProjects', // (项目推送，项目单选)投资人匹配到的项目
  pushUser: '/api/v/project/pushUser', // 我的人脉-推送（发送邮件）
  pushProject: '/api/v/project/pushProject', // 我的项目-推送(发送邮件)(废弃)=====================
  pushCount: '/api/v/project/pushCount', // 推送剩余次数
  getConnectUserSortByMatch: 'api/v/project/getConnectUserSortByMatch', // 推送项目时获取我的人脉(废弃)合二为一===============
  getAllConnectUserSortByMatch: 'api/v/project/getAllConnectUserSortByMatch', // 推送项目时获取全站人脉(废弃)合二为一=====================
  getPushInvestors: 'api/project/getPushInvestors', // 推送项目获取投资人
  recommendProject: 'api/project/recommendProject', // 帮我引荐
  getRecommendCount: 'api/project/getRecommendCount', // 项目引荐次数
  pushProjectToUsers: 'api/project/pushProjectToUsers', // 推送项目给多个投资人(人脉多选)
  /* 使用微信二维码 */
  getProjectQr: 'https://wx.weitianshi.cn/api/wx/getProjectQr', //
  getProjectQrOur: 'api/auth/getProjectQr',

  /* 上传进度 */
  uploadProgress: 'api/project/uploadProgress',

  /* 邮箱加入项目库 */
  importProject: 'api/message/importProject',

  // 上线后数据
  getProjectViewData: 'api/project/getProjectViewData', // 上线后数据-浏览
  getProjectApplyData: 'api/project/getProjectApplyData', // 上线后数据-申请
  getProjectDetailsData: 'api/project/getProjectDetailsData', // 上线后数据-详情
  getProjectBPData: 'api/project/getProjectBPData', // 上线后数据-查看BP
  getProjectServiceData: 'api/project/getProjectServiceData', // 上线后数据-请求联系

  // 个人信息
  getUserBasicInfo: '/api/user/getUserBasicInfo', // 获取个人信息
  getUserAuthenticateInfo: '/api/user/getUserAuthenticateInfo', // 获取认证信息
  updateUserInfo: 'api/user/updateUserInfo', // 个人信息编辑
  uploadUserImage: 'api/user/uploadUserImage?token=', // 上传头像
  deleteImage: 'api/user/deleteImage', // 删除头像
  uploadUserCardImage: 'api/user/uploadUserCardImage?token=', // 上传名片
  deleteCardImage: 'api/user/deleteCardImage', // 删除名片

  // 行为数据
  getUserViewData: 'api/user/getUserViewData', // 行为数据-浏览数据
  getUserApplyData: 'api/user/getUserApplyData', // 行为数据-申请
  getUserDetailsData: 'api/user/getUserDetailsData', // 行为数据-查看详情
  getUserBPData: 'api/user/getUserBPData', // 行为数据-BP
  getUserServiceData: 'api/user/getUserServiceData', // 行为数据-请求联系

  // 评分统计
  getProjectJudgeScoreList: '/api/project/getProjectJudgeScoreList', // 评委评分列表
  getProjectUserScoreList: 'api/project/getProjectUserScoreList', // 普通用户评分列表
  getScoreStatistics: '/api/project/getScoreStatistics', // 项目得分统计(最终评分,投资指数)
  getScoreStatisticsGroup: '/api/project/getScoreStatisticsGroup', // 项目指标平均分统计(图表用)
  editScoreShow: '/api/project/editScoreShow', // 修改项目评分背书展示
  exportProjectScoreByCompetition: 'api/competition/exportProjectScoreByCompetition', // 导出项目评分结果(下载)

  // 超级BP
  uploadInquiryFile: 'api/superBp/uploadInquiryFile?token=', // BP问诊上传
  deleteInquiryFile: 'api/superBp/deleteInquiryFile', // bp问诊删除
  bpInquiry: 'api/superBp/bpInquiry', // 提交BP问诊
  bpCustom: 'api/superBp/bpCustom', // bp定制
  getBpFileSelected: 'api/superBp/getBpFileSelected', // 精选BP
  getIndustryAndStage: 'api/category/getIndustryAndStage', // 领域和阶段标签
  getBpPpt: 'api/superBp/getBpPpt', // bp预览
  getBpByIndustryAndStage: 'api/superBp/getBpByIndustryAndStage', // 通过领域和阶段筛选BP模板
  superBpDownload: 'api/superBp/superBpDownload', // 模板下载

  // 自动邮件
  mail_getProjectDetail: '/api/mobile/wtsProject', // 平台项目的项目详情
  mail_getProjectDetail_scrapy: '/api/mobile/scrapyProject', // 爬虫怕取的项目详情
  mail_createInterview: '/api/mobile/createInterview', // 项目约谈
  mail_createInterview2: 'api/mobile/createSourceInterview', // 项目约谈_爬虫项目
  mail_sendBp: '/api/mobile/emailForBp', // 发送BP

  // 我的活动
  uploadImage: 'api/activity/uploadImage?token=', // 我的活动上传图片
  deleteActivityImage: 'api/activity/deleteImage', // 删除图片
  getActivity: 'api/activity/getActivity', // 获取活动基本信息
  editActivity: 'api/activity/editActivity', // 创建 / 编辑活动
  getActivityApplyUser: 'api/activity/getActivityApplyUser', // 活动报名签到成员
  getActivityList: 'api/activity/getActivityList', // 活动列表
  deleteActivity: 'api/activity/deleteActivity', // 删除活动
  exportApplyUser: 'api/activity/exportApplyUser', // 导出报名名单模板
  importApplyUser: 'api/activity/importApplyUser?token=', // register
  getSignQrCode: 'api/activity/getSignQrCode', // 获取签到二维码
  downloadQrCode: 'api/activity/downloadQrCode' // 下载签到二维码

};
