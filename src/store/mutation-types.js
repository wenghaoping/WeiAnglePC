/**
 * Created by Administrator on 2017/7/25.
 */
// 全局通用弹框参数（仅限弹框）
export const SEARCH_CHANGE = 'SEARCH_CHANGE'; // 项目详情 => 一键尽调弹框
export const COMPANY_SEARCH_CHANGE = 'COMPANY_SEARCH_CHANGE'; // 项目详情 => 一键尽调(搜索)弹框
export const RECOMMEND_CHANGE = 'RECOMMEND_CHANGE'; // 项目详情 => 帮我引荐弹框

// 作为项目详情页的所有数据存储,包括所有弹框的数据交互
export const SET_SEARCH_COMPANY = 'SET_SEARCH_COMPANY'; // 项目详情 => 一键尽调存储数据
export const MATCH_INVESTORS_DATA = 'MATCH_INVESTORS_DATA'; // 项目详情 => 买家图谱 => 帮我引荐弹框需要的数据

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
