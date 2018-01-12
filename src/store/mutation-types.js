/**
 * Created by Administrator on 2017/7/25.
 */
// 全局通用弹框参数（仅限弹框）
export const SEARCH_CHANGE = 'SEARCH_CHANGE'; // 项目详情 => 一键尽调弹框
export const COMPANY_SEARCH_CHANGE = 'COMPANY_SEARCH_CHANGE'; // 项目详情 => 一键尽调(搜索)弹框
export const RECOMMEND_CHANGE = 'RECOMMEND_CHANGE'; // 项目详情 => 帮我引荐弹框
export const CONTACT_CHANGE = 'CONTACT_CHANGE'; // 项目详情 / 跟进列表 => 人脉详情弹框
export const FOLLOWUP_CHANGE = 'FOLLOWUP_CHANGE'; // 项目详情 => 跟进弹框
export const ALERT_PROJECT_CHANGE = 'ALERT_PROJECT_CHANGE'; // 人脉详情 => 项目详情弹框

// 项目推送相关弹框
export const PROJECT_PUSH_TO_PRO_CHANGE = 'PROJECT_PUSH_TO_PRO_CHANGE'; // 项目推送项目入口（多选）
export const PROJECT_PUSH_TO_CON_CHANGE = 'PROJECT_PUSH_TO_CON_CHANGE'; // 项目推送人脉入口（单选）
export const PROJECT_PUSH_PREVIEW_CHANGE = 'PROJECT_PUSH_PREVIEW_CHANGE'; // 项目推送预览弹框
export const SET_USER_MESSAGE = 'SET_USER_MESSAGE'; // 买家图谱推送所需要的人数据
export const SET_PUSH_MESSAGE = 'SET_PUSH_MESSAGE'; // 设置推送的数据
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE'; // 清空所有推送的数据

// 作为项目详情页的所有数据存储,包括所有弹框的数据交互
export const SET_SEARCH_COMPANY = 'SET_SEARCH_COMPANY'; // 项目详情 => 一键尽调存储数据
export const SET_CONTACT_DETAIL = 'SET_CONTACT_DETAIL'; // 项目详情 => 人脉详情弹框
export const SET_FOLLOW_UP_DATA = 'SET_FOLLOW_UP_DATA'; // 项目详情 => 跟进弹框所需要的数据(所有需要项目详情数据的地方都存在这里)
export const SET_FOLLOW_ID = 'SET_FOLLOW_ID'; // 项目详情 => 跟进弹框所需要的数据followid
export const MATCH_INVESTORS_DATA = 'MATCH_INVESTORS_DATA'; // 项目详情 => 买家图谱 => 帮我引荐弹框需要的数据
export const CLEAR_PROJECT_MESSAGE = 'CLEAR_PROJECT_MESSAGE'; // 清空项目相关数据

// 作为人脉详情页的所有数据存储,包括弹框的数据交互
export const SET_PROJECT_ID = 'SET_PROJECT_ID'; // 人脉详情 => 项目详情弹框

// 超级BP_type
export const INDUSTRY_CHANGE = 'INDUSTRY_CHANGE'; // 改变行业弹框
export const CHOICE_BP_CHANGE = 'CHOICE_BP_CHANGE'; // 改变BP选择
export const BP_PREVIEW_CHANGE = 'BP_PREVIEW_CHANGE'; // 改变BP预览
export const PAY_BP_CHANGE = 'PAY_BP_CHANGE'; // 改变BP支付弹框
export const ALL_CHANGE = 'ALL_CHANGE'; // 控制关闭所有
export const SET_INDUSTRY_STAGE_ID = 'SET_INDUSTRY_STAGE_ID'; // 设置行业和阶段ID
export const SET_BP_ID = 'SET_BP_ID'; // 设置BPid
export const SET_BP_PAGE = 'SET_BP_PAGE'; // 设置SET_BP_PAGE
export const GET_BP_BANNER = 'GET_BP_BANNER'; // 设置支付页面BPURL
export const SET_TYPE = 'SET_TYPE'; // 搞一个参数控制是首页进入的，还是下载进入的
export const SET_INDUSTRY = 'SET_INDUSTRY'; // 行业存储

// Login相关数据Type使用
export const SET_LOGIN_DATA = 'SET_LOGIN_DATA'; // 设置登陆参数
export const SET_GROUP_NAME = 'SET_GROUP_NAME'; // 设置身份认证
export const SET_USER_REAL_NAME = 'SET_USER_REAL_NAME'; // 设置真实名字（退出登陆的时候需要清空数据）

// 我的活动
export const MEMBER_CHANGE = 'MEMBER_CHANGE'; // 我的活动 => 报名成员弹框
export const SER_ACTIVITY_DATA = 'SER_ACTIVITY_DATA'; // 我的活动 => 设置需要的数据
export const IMPORT_REGISTRATION_CHANGE = 'IMPORT_REGISTRATION_CHANGE'; // 我的活动 => 导入名单
export const QR_CODE_ACTIVITY_CHANGE = 'QR_CODE_ACTIVITY_CHANGE'; // 我的活动 => 二维码
export const SET_UP_SEARCH = 'SET_UP_SEARCH'; // 我的活动 => 搜索参数
