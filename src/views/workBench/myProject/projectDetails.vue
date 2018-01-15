<template>
  <div id="projectDetails" class="clearfix"  v-loading.fullscreen="loading" element-loading-text="拼命加载中">
    <div class="contain-grid contain-center1 fl" ref="left" id="wid">
      <span class="back-tag" @click="goBack"><i class="el-icon-arrow-left"></i>返回</span>
      <div class="main-box clearfix">
        <div class="item-lists item-lists-top clearfix">
          <div class="item-lists-inner-left fl">
            <div class="item height">
              <el-tag type="success" v-if="project.open_status==1">公开</el-tag>
              <el-tag type="primary" v-else>私密</el-tag>
              <el-tooltip class="item height" effect="dark" placement="top-start">
                <div slot="content">1. 私密项目仅自己/团队成员可见,项目数据安全不泄露　<br/>2. 公开项目投资人可申请查看,并参与市场融资对接</div>
                <span class="icon"><img src="../../../assets/images/why.png"/></span>
              </el-tooltip>
              <el-tooltip class="item" effect="dark"  placement="top" :disabled="project.pro_name.length > 8 ? false:true">
                <div slot="content">
                  <div class="tips-txt">{{project.pro_name}}</div>
                </div>
                <span class="title" style="width: 180px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{project.pro_name}}</span>
              </el-tooltip>
              <el-tooltip class="item" effect="dark"  placement="top-start" :disabled="project.pro_company_name.length > 13? false:true">
                <div slot="content">
                  <div class="tips-txt">{{project.pro_company_name}}</div>
                </div>
                <span class="company"  style="width: 220px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{project.pro_company_name}}</span>
              </el-tooltip>
            </div>
            <div class="item height" style="margin-top: 14px;">
              <el-tooltip class="item" effect="dark"  placement="top-start" :disabled="project.pro_intro.length > 40 ? false:true">
                <div slot="content">
                  <div class="tips-txt">{{project.pro_intro}}</div>
                </div>
                <div class="doc" style="height: 21px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{project.pro_intro}}</div>
              </el-tooltip>

            </div>
            <div class="item height" style="margin-top:6px;">
              <span class="mid-tag" v-for="industry in project.pro_industry">{{industry.industry_name}}</span>
            </div>
            <div class="item height" style="margin-top:14px;">
              <span class="big-tag" > {{project.pro_scale.scale_money | nullTo_}}</span>
              <span class="split">｜</span>
              <span class="big-tag">{{project.pro_area.area_title | nullTo_}}</span>
              <span class="split">｜</span>
              <span class="big-tag">{{project.pro_finance_stock_after | nullTo_}}%</span>
              <span class="split">｜</span>
              <span class="big-tag">{{project.pro_stage.stage_name | nullTo_}}</span>
            </div>
            <div class="item height" style="margin-top:40px;    display: inline-block;">
              <span id="bottom_width1" class="project"  style="padding-left: 6px;">
                <span class="title">项目完整度:</span>
                <span class="number" v-if="project.pro_total_score!=''">{{project.pro_total_score}}%</span>
                <span class="number" v-else>去完善</span>
                <span class="more">超过60%的项目更易被投资人关注</span>
              </span>
                <span id="bottom_width2" class="project" style="width: 290px;">
                <div class="item progress height" style="padding-left: 5px">
                  <div class="txt begin" :class="{ scheduleColor: project.pro_schedule.schedule_name == scheduleFirst}">{{scheduleFirst}}</div>
                  <div class="progress-bar">
                    <span class="circle circle-s"></span>
                    <span class="bar-bg1">&nbsp;</span>
                    <span  class="txt state" v-if="project.pro_schedule.schedule_name == scheduleFirst"></span>
                    <span  class="txt state" v-else-if="project.pro_schedule.schedule_name == scheduleLast"></span>
                    <span  class="txt state" v-else>{{project.pro_schedule.schedule_name}}</span>
                    <span class="circle circle-e">&nbsp;</span>
                  </div>
                  <div class="txt end" :class="{ scheduleColor: project.pro_schedule.schedule_name == scheduleLast}">{{scheduleLast}}</div>
                  <div class="img img1"><img src="../../../assets/images/editTo.png"></div>
                   <div class="selectIn fr">
                      <el-select v-model="project.pro_schedule.schedule_id" placeholder="请选择" @change="selectChange2">
                        <el-option
                          v-for="item in schedule"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                </div>
              </span>
            </div>
            <div class="onlyone">
              <img v-if="pro.is_exclusive==1" src="../../../assets/images/onlyonedark.png"/>
              <img v-else-if="pro.is_exclusive==2" src="../../../assets/images/onlyonelight.png"/>
            </div>
          </div>
          <div class="item-lists-inner-right fl">
            <div class="text">
              <span>扫描二维码转发推送</span>
              <img :src="xiaochengxu" v-if="qrImg==''" alt="">
              <img :src="qrImg" v-if="qrImg!==''">
            </div>
            <el-tooltip class="item" effect="dark" placement="top-start">
              <div slot="content">根据项目公司名称检索微天使数据库,快速了解企业的<br/>工商、核心团队、产品数据、历史融资、新闻谬论等全方面信息</div>
              <span class="icon icon2" style="cursor: pointer"><img src="../../../assets/images/why.png"/></span>
            </el-tooltip>
            <div class="button-float fr" @click="goOnkey" style="cursor:pointer" >一键尽调</div>

          </div>
        </div>
        <div style="background-color: #eff2f7;height: 17px;width: 850px;"></div>
        <div class="item-lists clearfix">
          <!--===============================================================================================================================tab页面-->
          <el-tabs v-model="show" type="card" @tab-click="handleClick" style="position: relative">
            <el-tab-pane label="项目详情" name="detail">
              <div class="ul-lists">
                <div class="item">
                  <span class="title"><img class="img" src="../../../assets/images/projectIntroduce.png">项目介绍</span>
                  <span class="flower" v-show="project.follow_user!=''">跟进人 : {{project.follow_user}}</span>
                </div>
                <div class="item" style="margin-top:33px;">
                  <span class="person-tag" style="margin-bottom: 10px" v-for="tag in project.tag" v-if="tag.type==0">{{tag.tag_name}}</span>
                </div>
                <div class="item" style="margin-top:24px;">
                  <div class="paper" v-if="file.pro_BP.length!=0">
                    <img class="img" style="padding-left: 16px;" src="../../../assets/images/paper.png">
                    <span class="pt">{{file.pro_BP.file_title}}</span>
                    <el-button type="text" size="mini" @click="download(file.pro_BP.file_id)">下载</el-button>
                  </div>
                </div>
                <div class="ul-lists" style="margin-top:16px;padding: 0">
                  <div class="item" >
                    <div  v-show="project.goodness.pro_goodness.length!=0"  style="margin-bottom: 20px">
                      <div class="title" style="font-size:16px;color:#475669;">投资亮点</div>
                      <div class="prod-doc" style="font-size: 13px;"v-for=" (goodness1,index) in project.goodness.pro_goodness">
                       <span style="line-height: 23px; color:#8492a6">
                         <span style="color:#475669;margin-top: -4px">{{goodness1.goodness_title}}&nbsp;:&nbsp;</span>
                      {{goodness1.goodness_desc}}
                       </span>
                      </div>
                    </div>
                    <div  v-show="project.goodness.pro_market_genera.length!=0" style="margin-bottom: 20px">
                      <div class="title" style="font-size:16px;color:#475669;">市场概况</div>
                      <div class="prod-doc" style="font-size: 13px;"   v-for="goodness2 in project.goodness.pro_market_genera">
                       <span style="line-height: 23px; color:#8492a6">
                         <span style="color:#475669;margin-top: -4px">{{goodness2.goodness_title}}&nbsp;:&nbsp;</span>
                      {{goodness2.goodness_desc}}
                       </span>
                      </div>
                    </div>
                    <div v-show="project.goodness.pro_business_model.length!=0" style="margin-bottom: 20px">
                      <div class="title" style="font-size:16px;color:#475669;">商业模式</div>
                      <div class="prod-doc" style="font-size: 13px;"  v-for="goodness3 in project.goodness.pro_business_model">
                       <span style="line-height: 23px; color:#8492a6">
                         <span style="color:#475669;margin-top: -4px">{{goodness3.goodness_title}}</span>&nbsp;:&nbsp;
                      {{goodness3.goodness_desc}}
                       </span>
                      </div>
                    </div>
                    <div v-if="project.goodness.pro_service.length!=0"  style="">
                      <div class="title" style="font-size:16px;color:#475669;">产品概况</div>
                      <div class="prod-doc" style="font-size: 13px;" v-for="goodness4 in project.goodness.pro_service">
                       <span style="line-height: 23px; color:#8492a6">
                         <span style="color:#475669;margin-top: -4px">{{goodness4.goodness_title}}&nbsp;:&nbsp;</span>
                      {{goodness4.goodness_desc}}
                       </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--核心团队-->
              <div class="ul-lists" style="margin-top:16px;" v-show="team.core_users!=''||team.tag!=''" >
                <div class="item">
                  <span class="title"><img class="img" src="../../../assets/images/team.png">核心团队</span>
                </div>
                <div class="item" v-show="team.tag!=''" style="margin-top:33px;">
                  <span class="person-tag" v-for="tag1 in team.tag">{{tag1.tag_name}}</span>
                </div>
                <div style="margin-top:32px;"></div>
                <div class="item" v-show="team.core_users!=''" v-for="bili in team.core_users" style="margin-top:10px;">
                  <el-tooltip class="item" effect="dark"  placement="top">
                    <div slot="content">
                      <div class="tips-txt">{{bili.ct_member_name}}</div>
                    </div>
                    <span class="p-name" style="text-align:left;line-height: 44px;width: 90px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{bili.ct_member_name}}</span>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark"  placement="top-start" >
                    <div slot="content">
                      <div class="tips-txt">{{bili.ct_member_career}}</div>
                    </div>
                    <span class="p-mg" style="text-align:left;line-height: 44px;width: 300px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{bili.ct_member_career}}</span>
                  </el-tooltip>
                  <div class="p-gf" style="margin-top: 11px">股权占比 : <span>{{bili.stock_scale}}%</span></div>
                  <div class="p-doc">{{bili.ct_member_intro}}</div>
                </div>

              </div>
              <!--公司运营-->
              <div class="ul-lists" style="margin-top:16px;" v-show="company.pro_company_scale!=''||company.pro_status!=''||company.pro_website!==''" >
                <div class="item">
                  <span class="title"><img class="img" :src="yunying" style="width: 37px;">公司运营</span>
                  <div class="rz-details">
                    <div class="rz-detail">
                      <span class="det-title" style="width: 100%;line-height: 21px">运营状态</span>
                      <span class="del-info" style="font-size:22px;color:#1f2d3d;text-align:center;line-height: 44px">{{company.pro_status.status_name}}</span>
                    </div>
                    <div class="rz-detail">
                      <span class="det-title" style="width: 100%;line-height: 21px">公司官网</span>

                      <el-tooltip class="item" effect="dark"  placement="top" :disabled="company.pro_website.length > 15 ? false:true">
                        <div slot="content">
                          <div class="tips-txt">{{company.pro_website}}</div>
                        </div>
                        <span  class="del-info"  style="font-size:22px;color:#20a0ff;text-align:center;line-height: 44px;cursor: pointer;width: 200px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;text-decoration: underline!important" @click="urlOpen(company.pro_website)">{{company.pro_website | nullTo_}}</span>
                      </el-tooltip>
                    </div>
                    <div class="rz-detail">
                      <span class="det-title"style="width: 100%;line-height: 21px">公司规模</span>
                      <span class="del-info"  style="font-size:22px;color:#1f2d3d;text-align:center;line-height: 44px">{{company.pro_company_scale.comp_scale_value | nullTo_}} </span>
                      <span v-show="company.pro_company_scale.comp_scale_value!='-'">人</span>
                    </div>
                  </div>
                </div>
              </div>
              <!--产品-->
              <div class="ul-lists" style="margin-top:16px;" v-show="brands.brand!=''">
                <div class="item">
                  <span class="title"><img class="img" :src="pinpai" style="width: 37px;">产品</span>
                  <div class="brand">
                    <div class="brand1" v-for="brandd in brands.brand">
                      <el-tooltip class="item" effect="dark"  placement="top" >
                        <div slot="content">
                          <div class="tips-txt">{{brandd.brand_name}}</div>
                        </div>
                        <span style="font-size:16px;color:#4e4563;width: 200px; white-space: nowrap; overflow: hidden;text-overflow: ellipsis;">{{brandd.brand_name}}</span>
                      </el-tooltip>
                      <span class="brand1_lei" v-if="brandd.type_id==1" >网站</span>
                      <span class="brand1_lei" v-if="brandd.type_id==2" >app</span>
                      <span class="brand1_lei" v-if="brandd.type_id==3" >软件</span>
                      <span class="brand1_lei" v-if="brandd.type_id==4" >游戏</span>
                      <span class="brand1_lei" v-if="brandd.type_id==5" >小程序</span>
                      <span class="brand1_lei" v-if="brandd.type_id==6" >硬件</span>
                      <span class="brand1_lei" v-if="brandd.type_id==7" >HTML5</span>
                      <span class="brand1_lei" v-if="brandd.type_id==8" >微信公众号</span>
                      <span class="brand1_lei" v-if="brandd.type_id==9" >其他</span>
                      <el-tooltip class="item" effect="dark"  placement="top" >
                        <div slot="content">
                          <div class="tips-txt">{{brandd.brand_desc}}</div>
                        </div>
                        <div class="brand1_introduce" style="white-space: normal;word-break: break-all;">{{brandd.brand_desc}}</div>
                      </el-tooltip>
                    </div>
                    <div class="clear"></div>
                  </div>
                </div>
              </div>
              <!--融资信息-->
              <div class="ul-lists" v-show="financing.pro_finance_use!=''||financing.pro_history_finance.length!=0" style="margin-top:16px;">
                <div class="item">
                  <span class="title"><img class="img" src="../../../assets/images/money.png">融资信息</span>
                  <div class="rz-details">
                    <div class="rz-detail">
                      <p class="det-title">期望融资</p>
                      <p class="det-info">{{project.pro_scale.scale_money | nullTo_}}</p>
                    </div>
                    <div class="rz-detail">
                      <p class="det-title">投后股份</p>
                      <p class="det-info">{{project.pro_finance_stock_after | nullTo_}}
                        <span v-show="project.pro_finance_stock_after!=' '"> %</span>
                      </p>
                    </div>
                    <div class="rz-detail">
                      <p class="det-title">估值</p>
                      <p class="det-info">{{project.pro_finance_value | nullTo_}}万</p>
                    </div>
                  </div>
                </div>
                <div class="item" style="margin-top:35px;" v-show="financing.pro_finance_use!=''">
                  <span class="sec-title" >资金用途</span>
                  <div class="yt-doc">
                    {{financing.pro_finance_use}}
                  </div>
                </div>
                <div class="item" style="margin-top:18px;" v-show="financing.pro_history_finance.length!=0">
                  <div>
                    <span class="sec-title">历史融资</span>
                    <div class="v-progress-table">
                      <div class="v-progress-txt" style="height: 45px;" v-for="finance in financing.pro_history_finance">
                        <img :src="cirIcon" alt="" style="width: 12px;height: 12px;">
                        <span class="pro-txt-1">{{finance.finance_time}}</span>
                        <span class="pro-txt-2">{{finance.pro_finance_scale}}</span>
                        <span class="pro-txt-3" style="width: 68px;">{{finance.belongs_to_stage.stage_name}}</span>
                        <el-tooltip class="item" effect="dark"  placement="top" :disabled="finance.pro_finance_investor.length > 20 ? false:true">
                          <div slot="content">
                            <div class="tips-txt">{{finance.pro_finance_investor}}</div>
                          </div>
                          <span class="pro-txt-4" style="width:314px;max-width:314px; overflow: hidden; text-overflow:ellipsis; white-space: nowrap;display:inline-block;margin-left: 73px">{{finance.pro_finance_investor}}</span>
                        </el-tooltip>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--里程碑-->
              <div class="ul-lists" style="margin-top:16px;" v-show="milepost.pro_develop!=''" >
                <div class="item">
                  <span class="title"><img class="img" src="../../../assets/images/Milepost.png">里程碑</span>
                </div>
                <div class="item" style="margin-top:6px;">
                  <div>
                    <div class="v-progress-table">
                      <div class="v-progress-txt" style="height: 45px;" v-for="develop in milepost.pro_develop">
                        <img :src="cirIcon" alt="" style="width: 12px;height: 12px;">
                        <span class="pro-txt-1">
                      {{develop.dh_start_time}}
                    </span>
                        <span class="pro-txt-2"  style="color:#5e6d82;white-space: normal;word-break: break-all;width: 546px;line-height: 20px">
                          {{develop.dh_event}}
                    </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--FA签约协议-->
              <div class="ul-lists" style="margin-top:16px;" >
                <div class="item">
                  <span class="title"><img class="img" src="../../../assets/images/money.png">FA业务</span>
                  <div class="item" style="margin-top:33px;" v-show="private.pro_source!=''">
                    <span style="font-size:14px;color:#8492a6;">项目来源:&nbsp;&nbsp;</span>
                    <span class="person-tag" v-for="source in private.pro_source"> {{source.tag_name}}</span>
                  </div>
                  <div class="rz-details" v-show="private.commission!=''&&private.stock_right!==''" >
                    <div class="rz-detail" style="width: 50%" v-show="private.commission!=''">
                      <p class="det-title">签约佣金</p>
                      <p class="det-info">{{private.commission}}%</p>
                    </div>
                    <div class="rz-detail" style="width: 50%" v-show="private.stock_right!=''">
                      <p class="det-title">股权赠与</p>
                      <p class="det-info">{{private.stock_right}}%</p>
                    </div>
                  </div>
                  <div class="item"   style="margin-top:24px;height: 34px;" v-show="private.contact_user_name!=''||private.contact_user_career!=''||private.contact_user_mobile!=''">
                    <div class="bot-det" v-show="private.contact_user_name!=''">
                      <span class="det-title">项目联系人:</span>
                      <el-tooltip class="item" effect="dark"  placement="top-start" >
                        <div slot="content">
                          <div class="tips-txt">{{private.contact_user_name}}</div>
                        </div>
                        <span class="del-info" style="width: 92px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{private.contact_user_name}}</span>
                      </el-tooltip>
                    </div>
                    <div class="bot-det" style="margin-left:128px;" v-show="private.contact_user_career!=''">
                      <span class="det-title">职位:</span>
                      <el-tooltip class="item" effect="dark"  placement="top-start" >
                        <div slot="content">
                          <div class="tips-txt">{{private.contact_user_career}}</div>
                        </div>
                        <span class="del-info" style="width: 122px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{private.contact_user_career}}</span>
                      </el-tooltip>
                    </div>
                    <div class="bot-det" style="float:right;" v-show="private.contact_user_mobile!=''">
                      <span class="det-title">手机号:</span>
                      <span class="del-info">{{private.contact_user_mobile}}</span>
                    </div>
                  </div>
                  <div class="bot-det" style="float: none" v-show="private.stock_follow!=''">
                    <span class="det-title">跟投权:</span>
                    <span class="del-info">{{private.stock_follow}}</span>
                  </div>
                  <div class="bot-det" style="float: none;margin-top: 8px" v-show="private.stock_other!=''">
                    <span class="det-title">其他权益:</span>
                    <span class="del-info">{{private.stock_other}}</span>
                  </div>
                  <div class="bot-det" style="float: none;margin-top: 8px" v-show="private.pro_remark!=''">
                    <span class="det-title">项目备注:</span>
                    <span class="del-info">{{private.pro_remark}}</span>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="跟进记录" name="flow">
              <folowup :proid="project.project_id"
                       :get-data-true="getFollowData"
                       @getfollowid="getFollowId"
                       @changefollowdata="changefollowdata"></folowup>
            </el-tab-pane>
            <el-tab-pane label="文件管理" name="files">
              <filemanagement :proid="project.project_id"></filemanagement>
            </el-tab-pane>
            <el-tab-pane label="上线后数据" name="onlinedata">
              <onlinedata :proid="project.project_id"></onlinedata>
            </el-tab-pane>
            <el-tab-pane label="项目评价" name="scoreStatistics">
              <score-statistics :proid="project.project_id"
                                :scheduleid="project.pro_schedule.schedule_id">
              </score-statistics>
            </el-tab-pane>
          </el-tabs>
          <div class="ul-lists list tc"  style="padding:0">
            <div class="toButton" style="padding-left: 0;z-index: 111">
              <el-button type="primary" @click="toEdit" class="btn1">编辑</el-button>
              <el-button type="primary" @click="addFollow" class="btn1">写跟进</el-button>
              <el-button type="primary" @click="projectPushToPro" class="btn1">项目推送</el-button>
            </div>
          </div>
        </div>
        <div style="height: 100px;background: rgb(243, 244, 248);"></div>
      </div>
    </div>

    <div class="contain-grid contain-right-1 fl" ref="right">
      <div class="main-box header_none">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick2" style="position: relative">
          <el-tab-pane name="1">
            <button class="btn" @click="addFollow">添加潜在买家</button>
            <span slot="label">潜在买家
            </span>
            <el-collapse-transition>
              <div v-show="tabs">
                <div class="main_left">
                  <div class="echart" id="echart"></div>
                  <div class="selectIn fr">
                    <el-select v-model="searchSchedule" placeholder="请选择" @change="selectSearch">
                      <el-option
                        v-for="item in follow_scheduleAll"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                  <div class="item_lists">
                    <div class="item_list" v-for="(enjoyInvestor,index) in enjoyInvestors" v-if="enjoyInvestors.lngth!=0">
                      <div class="list_header">
                        <span class="pipei">匹配度 : </span>
                        <span class="bili">{{enjoyInvestor.match}}%</span>
                        <span class="pro fr" v-if="enjoyInvestor.source=='follow'">我跟进关联的用户</span>
                        <span class="pro fr" v-if="enjoyInvestor.source=='push'">我推送的用户</span>
                      </div>
                      <div class="list_main">
                        <div @click="toDetail(enjoyInvestor)" class="click">
                          <div class="block" style="width: 290px;">
                            <span class="name">{{enjoyInvestor.user_real_name}}</span>
                            <span class="zhiwei">{{enjoyInvestor.user_company_career}}</span>
                            <span class="imgs" v-if="enjoyInvestor.user_group!=''"><img src="../../../assets/images/renzhen.png"/></span>
                            <span class="ren">{{enjoyInvestor.user_group}}</span>
                          </div>
                          <div class="block" style="margin-top: 5px;">
                            <span class="company">{{enjoyInvestor.user_company_name}}</span>
                          </div>
                          <div class="block" style="margin-top: 42px;">
                            <span class="company ft13" v-if="enjoyInvestor.user_invest_industry.length!=0">投资领域：<i v-for="industry in enjoyInvestor.user_invest_industry" :class="{ newColor: industry.is_match==1 }">{{industry.industry_name}}、</i></span>
                          </div>
                          <div class="block" style="margin-top: 5px;">
                            <span class="company ft13" v-if="enjoyInvestor.user_invest_stage.length!=0">投资轮次：<i v-for="stage in enjoyInvestor.user_invest_stage" :class="{ newColor: stage.is_match==1 }">{{stage.stage_name}}、</i></span>
                          </div>
                        </div>
                        <div class="li change_li">
                      <span class="all fl">
                        <span class="all_inner" :style="{width:enjoyInvestor.width + 'px' }"></span>
                      </span>
                          <div class="selectIn fl" style="margin-left: 13px;margin-top: -17px;" @click="getIndex(index)">
                            <el-select v-model="enjoyInvestor.schedule_id" placeholder="请选择" @change="selectChange">
                              <el-option
                                v-for="item in follow_schedule"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                              </el-option>
                            </el-select>
                          </div>
                        </div>

                        <div class="img" v-if="enjoyInvestor.user_avatar_url!=''"><img :src="enjoyInvestor.user_avatar_url"></div>
                        <div class="img" v-else><span class="header">{{enjoyInvestor.user_avatar_txt}}</span></div>
                      </div>
                    </div>
                    <div class="emptyImg" v-if="enjoyInvestors.length==0">
                      <img src="../../../assets/images/zanwushuju.png">
                    </div>
                  </div>
                  <el-pagination
                    class="pagination fr"
                    small
                    v-if="totalData>5"
                    @current-change="filterChangeCurrent"
                    :current-page.sync="currentPage"
                    layout="prev, pager, next"
                    :page-size="5"
                    :total="totalData">
                  </el-pagination>
                </div>
              </div>
            </el-collapse-transition>
          </el-tab-pane>
          <el-tab-pane name="2">
            <span slot="label">买家图谱</span>
            <el-collapse-transition>
              <div v-show="!tabs">
                <div class="main_right main_left">
                  <div class="item_lists">
                    <div class="item_list" v-for="projectMatchInvestor in ProjectMatchInvestors" v-if="ProjectMatchInvestors.length!=0">
                      <div class="list_main list_main2">
                        <div @click="toInvestorDetail(projectMatchInvestor)" class="click">
                          <div class="block" style="width: 290px;padding-top: 20px;">
                            <div class="img" v-if="projectMatchInvestor.user_avatar_url!=''"><img :src="projectMatchInvestor.user_avatar_url"></div>
                            <div class="img" v-else><span class="header">{{projectMatchInvestor.user_avatar_txt}}</span></div>
                            <span class="name">{{projectMatchInvestor.investor_name}}</span>
                          </div>
                          <div class="block" style="margin-left: 78px;">
                            <span class="company">{{projectMatchInvestor.investor_career}}</span>
                            <span class="company">·</span>
                            <span class="company">{{projectMatchInvestor.investor_company}}</span>
                          </div>
                          <div class="block" style="margin-left: 31px;margin-top: 23px;">
                            <span class="pipei">匹配度</span>
                            <span class="backgr inlineBlock">
                              <span class="back_title" style="padding-left: 8px;">关注领域</span>
                              <span class="progre inlineBlock"><el-progress :percentage="projectMatchInvestor.wts_match_weight" :stroke-width="2"></el-progress></span>
                              <span class="back_title">机构投资方向</span>
                              <span class="progre inlineBlock"><el-progress :percentage="projectMatchInvestor.match_weight" :stroke-width="2"></el-progress></span>
                            </span>
                          </div>
                        </div>
                        <div class="closeTu absolute cursor" @click="industryDelete(projectMatchInvestor)"><i class="el-icon-close"></i></div>
                        <div class="block clearfix">
                          <div class="fr" style="margin: 15px 21px 24px 0;">
                            <el-button @click="industryPush(projectMatchInvestor)" v-if="projectMatchInvestor.push_status==0">提交项目</el-button>
                            <el-button @click="industryPush(0)" v-if="projectMatchInvestor.push_status==1">已提交</el-button>
                            <el-button type="primary" @click="helpKnow(projectMatchInvestor)" v-if="projectMatchInvestor.recommend_status==0">帮我引荐</el-button>
                            <el-button type="primary" @click="helpKnow(0)" v-if="projectMatchInvestor.recommend_status==1">已引荐</el-button>
                          </div>
                        </div>
                        <div style="border-bottom: 1px solid #eff2f7"></div>
                      </div>
                    </div>
                    <div class="emptyImg" v-if="ProjectMatchInvestors.length == 0">
                      <img src="../../../assets/images/zanwushuju.png">
                    </div>
                    <el-pagination
                      class="pagination fr"
                      small
                      v-if="totalInvestors > 5"
                      @current-change="filterChangeInvestors"
                      :current-page.sync="currentPageInvestors"
                      layout="prev, pager, next"
                      :page-size="5"
                      :total="totalInvestors">
                    </el-pagination>
                  </div>
                </div>
              </div>
            </el-collapse-transition>
          </el-tab-pane>
        </el-tabs>
        <div style="height: 100px;"></div>
      </div>
    </div>

    <!--一键尽调弹窗-->
    <research></research>

    <!--尽调搜索弹窗-->
    <el-dialog title="一键尽调" :visible="companySearchDisplay" close-on-click-modal close-on-press-escape :before-close="dialogVisibleTo">
      <el-form label-position="top" label-width="140px" v-loading="loadingSmall"
               element-loading-text="拼命加载中">
        <el-form-item :label="jindiaoTitle">
          <el-input v-model="searchName" @keyup.native.enter="handleIconClick" placeholder="帮助FA成交的项目管理工具">
            <el-button slot="append" icon="search" @click="handleIconClick"></el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <ul class="onsearch">
        <li v-for="seachCompany in seachCompanys" @click="search(seachCompany)" v-html="seachCompany.company_name"></li>
      </ul>
    </el-dialog>

    <!--人脉详情弹窗-->
    <alertcontactsdetail></alertcontactsdetail>

    <!--写跟进弹框-->
    <addfollow></addfollow>

    <!--项目推送弹窗,项目入口弹窗-->
    <projectpushtopro :emitPush="emitPush"></projectpushtopro>

    <!--项目推送弹窗,人脉入口弹窗============================-->
    <projectpush enterType="atlas"></projectpush>

    <!--项目预览弹窗-->
    <projectpreview></projectpreview>

    <!--帮我引荐-->
    <recommend></recommend>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
  import yichu from '../../../assets/images/icon-yichu.png';
  import xiaochengxu from '../../../../static/images/xiaochengxu.png';
  import pinpai from '../../../../static/images/icon-pinpa.png';
  import yunying from '../../../../static/images/icon-yunying.png';
  import cirIcon from '../../../../static/images/circle.png';
  import echarts from 'echarts';
  import research from './onekeyresearch.vue';
  import folowup from './followUpDetail.vue';
  import filemanagement from './fileManagement.vue';
  import onlinedata from './onlineData.vue';
  import scoreStatistics from './scoreStatistics.vue';
  import projectpreview from '@/views/components/projectPreview.vue';
  import alertcontactsdetail from '@/views/components/alertContactsDetail.vue';
  import addfollow from '@/views/components/addFollow.vue';
  import projectpushtopro from '@/views/components/projectPushToPro.vue';
  import projectpush from '@/views/components/projectPush.vue';
  import recommend from '@/views/components/recommend.vue';
  import { error, success, warning } from '@/utils/notification';
  import * as formatData from '@/utils/formatData';
  import { getTop } from '@/utils';
  export default {
    data () {
      return {
        yichu: yichu,
        yunying: yunying,
        pinpai: pinpai,
        cirIcon: cirIcon,
        xiaochengxu: xiaochengxu,
        show: 'detail',
        searchName: '',
        form: {
          name: '',
          region: ''
        },
        loading: false,
        loadingSmall: false,
        file: {
          pro_BP: {
            created_at: '', // 2017-08-30 10:51:15
            deleted_at: null,
            file_ext: '', // docx
            file_id: '', // 3530
            file_title: '', // 微天使PC端开发文档1
            file_url: '', /// test_file/20170830/egKaSAxsZ7UNshhkCIuvbpjqNzDW59a628010b3d0.docx
            follow_id: '', // 0
            project_id: '', // 8215
            type: '', // 1
            updated_at: '', // 2017-08-30 10:51:15
            user_id: ''// 182510
          }

        },
        team: {
          core_users: {
            ct_member_career: '', // 技术
            ct_member_intro: '', // 亮点亮点亮点亮点亮点亮点亮点亮点
            ct_member_name: '', // 张三
            stock_scale: ''// 10

          },
          tag: {
            tag_name: ''// 大海
          }
        },
        financing: {
          pro_finance_use: '', // 用途
          pro_history_finance: [
            {
              finance_time: '', // 1503331200
              pro_finance_investor: '', // aS财经asaS财经asaS财经asaS财saSasaSS财经asaS
              pro_finance_scale: '', // 10000
              belongs_to_stage: {
                sort: '', // 5
                stage_id: '', // 18
                stage_name: '' // A+轮
              }
            }
          ]
        },
        company: {
          pro_status: {
            status_name: ''// 上线1
          },
          pro_company_scale: {
            comp_scale_value: ''// 1-20
          },
          pro_website: ''// baidu.com
        },
        pro: {
          is_exclusive: ''// 1
        },
        milepost: {
          pro_develop: {
            dh_start_time: '', // 1503331200
            dh_event: ''// 事件
          }

        },
        brands: {},
        private: {
          commission: '', // 10
          contact_user_career: '', // 技术
          stock_follow: '', // 12
          stock_other: '', // 22
          stock_right: '', // 12
          user_mobile: '', // 18745852123
          user_name: '', // 张三
          pro_source: {
            tag_name: ''// baidu
          }
        },
        project: {
          pro_industry: {
            industry_name: ''// 轮次
          },
          follow_user: '', // 张小五
          open_status: '', // 1
          pro_company_name: '', // aaa
          pro_intro: '', // 微天使PC端开发文档
          pro_name: '', // 微天使PC端开发文档
          pro_schedule: '', // 10
          pro_total_score: '', // 94
          pro_area: {
            area_title: ''// 北京市
          },
          goodness: {
            pro_business_model: [{
              goodness_desc: '', // 凉凉凉凉
              goodness_title: ''// 亮点亮点
            }],
            pro_goodness: [{
              goodness_desc: '', // 凉凉凉凉
              goodness_title: ''// 亮点亮点
            }],
            pro_market_genera: [{
              goodness_desc: '', // 凉凉凉凉
              goodness_title: ''// 亮点亮点
            }],
            pro_service: [{
              goodness_desc: '', // 凉凉凉凉
              goodness_title: ''// 亮点亮点
            }]
          },
          pro_scale: {
            scale_money: ''// 1001W-200W
          },
          pro_stage: {
            stage_name: ''// 天使论
          }
        },
        seachCompanys: [],
        value: 1,
        status_name: '', // 一键尽调边上那个按钮线里的字
        activeName: '1',
        tabs: true, // 标签切换
        currentPage: 1, // 当前第几页(意向投资人)
        totalData: 0, // 总数(意向投资人)
        currentPageInvestors: 1, // 当前第几页(买家图谱)
        totalInvestors: 0, // 总数(买家图谱)
        schedule: [{label: '初始值', value: 0}], // 项目进度
        follow_schedule: [/* {
         value: 1,
         label: '项目推进中'
         } */
        ], // 项目跟进进度
        follow_scheduleAll: [/* {
         value: 1,
         label: '项目推进中'
         } */
        ], // 项目跟进进度搜索用,多一个全部
        searchSchedule: 0, // 意向项目的筛选进度
        getConCon: {}, // 获取意向投资人的请求参数
        chartData: {
          going: '',
          hold: '',
          reject: ''
        }, // 图表的数据
        enjoyInvestors: [
          /* {
           card_id: "1Np889pR",
           import_user_name: "李凯强",
           is_add:false,
           is_bind:0,
           schedule_id:2,
           user_invest_industry:"人工智能、大数据、理财、企业服务台",
           user_invest_stage:"轮次",
           type:"card",
           user_avatar_url:"",//头像地址
           user_company_career:"投资总监",//职位
           user_company_name:"杭州偷着乐",// 公司名称
           match:"12",//匹配度
           user_group:"投资机构",
           width:40
           } */
        ], // 意向投资人数据
        scheduleIndex: -1, // 设置跟进状态的位置(单独需要)
        takechange: false, // 这个我就是随便用用
        chart: '',
        chartCheck: true,

        getInvestors: {}, // 获取买家图谱请求参数
        ProjectMatchInvestors: [
          /*          {
           follow_status:0,
           industry_tag:"暂无匹配",//领域
           investor_career:"暂无匹配",//职位
           investor_company:"暂无匹配",//公司
           investor_desc:"暂无匹配",//介绍
           investor_id:"0",//id
           investor_logo_text:"暂无匹配",//名片名字
           investor_logo_url:"",
           investor_name:"暂无匹配",//名字
           investor_type:2,
           stage_tag:"暂无匹配",//轮次
           user_id: "0",
           match:0,//匹配度
           } */
        ], // 买家图谱数据
        littlePushShow: false, // 买家图谱推送弹窗
        littlePush: {
          email: '',
          content: ''
        }, // 买家图谱推送弹窗表单
        formLabelWidth: '74px',
        pushData: [], // 买家图谱推送接口参数
        activeFrom: 0, // 从哪个路由进来的
        previewDisplay: false, // 项目推送预览显隐控制
        emitPush: false, // 控制项目推送-项目入口的推送函数触发
        getFollowData: false, // 看是否要获取跟进的数据
        scrolled: false,
        qrImg: '', // 二维码地址
        InvestorType: 'userInfo' // 人脉详情弹框,应该用那种数据设置
      };
    },
    computed: {
      jindiaoTitle () {
        return '尽调项目：' + this.project.pro_intro;
      },
      scheduleFirst () {
        return this.schedule[0].label;
      },
      scheduleLast () {
        return this.schedule[this.schedule.length - 1].label;
      },
      ...mapState({
        companySearchDisplay: state => state.dialogDisplay.companySearchDisplay,
        recommendDisplay: state => state.dialogDisplay.recommendDisplay,
        followDisplay: state => state.dialogDisplay.followDisplay,
        projectPushToProDisplay: state => state.pushProject.projectPushToProDisplay,
        projectPushToConDisplay: state => state.pushProject.projectPushToConDisplay
      })
    },
    components: {
      research,
      folowup,
      filemanagement,
      alertcontactsdetail,
      addfollow,
      projectpushtopro,
      projectpreview,
      projectpush,
      onlinedata,
      scoreStatistics,
      recommend
    },
    // Echart组件
    mounted () {},
    methods: {
      // 点击写跟近按钮
      addFollow () {
        this.zgClick('添加跟进');
        this.$store.dispatch('setFollowId', '');
        this.$store.dispatch('followControl', true);
        this.$store.dispatch('setFollowUp', {projectId: this.project.project_id, projectIntro: this.project.pro_intro});
      },
      // 关闭添加跟进重置
      changefollowdata () {
        this.getFollowData = false;
        this.getAllData();
      },
      // 下载文件
      download (e) {
        const url = this.URL.weitianshi + this.URL.download + '?user_id=' + localStorage.user_id + '&file_id=' + e;
        window.open(url);
      },
      // 远程数据模拟
      loadData (arr) {
        let newArr = [];
        for (let i = 0; i < arr.length; i++) {
          let obj = {};
          obj.company_name = arr[i].project_name === '' ? arr[i].company_name : arr[i].company_name + ' ( ' + arr[i].project_name + ' )';
          obj.com_id = arr[i].com_id;
          obj.newName = arr[i].company_name;
          newArr.push(obj);
        }
        return newArr;
      },
      // 搜索公司
      searchChange (queryString) {
        this.loadingSmall = true;
        this.$http.post(this.URL.selectCompany, {user_id: localStorage.user_id, company_name: queryString})
          .then(res => {
            this.seachCompanys = [];
            let data = res.data.data;
            if (data.length === 0) this.seachCompanys = [{company_name: "未查询到结果，<i style='color: #009eff;'>保存公司名称</i>", com_id: -1, newName: queryString}];
            else this.seachCompanys = this.loadData(data);
            this.loadingSmall = false;
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 一键尽调按钮
      goOnkey () {
        if (this.project.pro_company_name === '') {
          this.$store.dispatch('companySearchControl', true);
        } else {
          this.loading = true;
          this.$http.post(this.URL.getCrawlerCompany, {user_id: localStorage.user_id, company_name: this.project.pro_company_name})
            .then(res => {
              let data = res.data.data;
              if (data.length === 0) { // 搜索不到信息
                this.$store.dispatch('companySearchControl', true);
                this.searchName = this.project.pro_company_name;
                this.seachCompanys = [{company_name: '匹配不到你要搜索的公司,请重新继续输入', com_id: -2}];
                this.loading = false;
              } else { // 搜索到了
                this.loading = false;
                this.$store.dispatch('setSearchCompany', {companyId: data.company.com_id, companyName: this.project.pro_company_name});
                this.$store.dispatch('searchControl', true);
              }
            })
            .catch(err => {
              alert('加载失败');
              console.log(err);
            });
        }
      },
      // 点击下拉选择公司后
      search (data) {
        if (data.com_id === -2) {
          error('匹配不到你要搜索的公司,请重新继续输入');
        } else {
          this.$confirm('把' + data.newName + '设置为您的公司?, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.post(this.URL.updateProjectCompany, {user_id: localStorage.user_id, pro_company_name: data.newName, project_id: this.project.project_id})
              .then(res => {
                if (res.data.status_code === 2000000) {
                  success('修改成功');
                  if (data.com_id !== -1) {
                    this.$store.dispatch('companySearchControl', false);
                    this.$store.dispatch('setSearchCompany', {companyId: data.com_id, companyName: data.newName});
                    this.$store.dispatch('searchControl', true);
                  } else {
                    this.$store.dispatch('companySearchControl', false);
                  }
                }
              })
              .catch(err => {
                console.log(err);
              });
          }).catch(() => {
            this.$store.dispatch('companySearchControl', false);
          });
        }
      },
      // 关闭搜索弹框
      dialogVisibleTo () {
        this.$store.dispatch('companySearchControl', false);
      },
      // 输入搜索
      handleIconClick () {
        this.searchChange(this.searchName);
      },
      handleClick (tab, event) {
        this.show = tab.name;
        if (tab.name === 'detail') { this.zgClick('查看项目详情'); }
        if (tab.name === 'flow') { this.zgClick('查看跟进详情'); }
        if (tab.name === 'files') { this.zgClick('查看文件管理'); }
        if (tab.name === 'onlinedata') { this.zgClick('查看上线后数据'); }
        if (tab.name === 'scoreStatistics') { this.zgClick('查看评分统计'); }
      },
      // 返回上一层
      goBack () {
        if (this.activeFrom === 0) this.$router.push({name: 'myProject', query: {activeTo: 0}});
        else if (this.activeFrom === 2) this.$router.push({name: 'followUp', query: {activeTo: 2}});// 路由传参
        this.$store.dispatch('clearProjectMessage', false);
      },
      // 项目来源编辑
      getProjectTag (arr) {
        let str = '';
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].type === 2) {
            str += arr[i].tag_name + '.';
          }
        }
        return str;
      },
      // 项目来源编辑
      getteam_tag (arr) {
        return arr.filter(e => e.type === 1).map(item => item.tag_name);
      },
      // 链接跳转
      urlOpen (url) {
        let url1 = '';
        if ((!url.indexOf('https://')) || (!url.indexOf('http://'))) {
          url1 = url;
        } else {
          url1 = 'http://' + url;
        }
        window.open(url1);
      },
      // 获取项目详情数据
      async getProjectDetail () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          this.$http.post(this.URL.getProjectDetail, {user_id: localStorage.user_id, project_id: this.project.project_id})
            .then(res => {
              if (res.data.status_code === 430004) {
                warning('找不到项目');
                this.loading = false;
                this.$router.push({name: 'index'});// 路由传参
              } else {
                let data = res.data.data;
                // 项目介绍
                if (data.project.pro_scale === '') { data.project.pro_scale = {}; data.project.pro_scale.scale_money = ' '; }
                if (data.project.pro_area === '') { data.project.pro_area = {}; data.project.pro_area.area_title = ' '; }
                if (data.project.pro_stage === '') { data.project.pro_stage = {}; data.project.pro_stage.stage_name = ' '; }
                if (data.project.pro_finance_stock_after === '') { data.project.pro_finance_stock_after = {}; data.project.pro_finance_stock_after = ' '; }
                if (data.project.pro_intro === '') { data.project.pro_intro = {}; data.project.pro_intro = ' '; }
                if (data.project.pro_industry === '') { data.project.pro_industry = {}; data.project.pro_industry.industry_name = ' '; }
                if (data.company.pro_status === '') { data.company.pro_status = {}; data.company.pro_status.status_name = '-'; }
                if (data.company.pro_website === '') { data.company.pro_website = {}; data.company.pro_website = '-'; }
                if (data.company.pro_company_scale === '') { data.company.pro_company_scale = {}; data.company.pro_company_scale.comp_scale_value = '-'; }
                if (data.project.pro_schedule === '') { data.project.pro_schedule = {}; data.project.pro_schedule.schedule_name = ''; data.project.pro_schedule.schedule_id = ''; }
                this.project = data.project;
                // 公司运营
                this.company = data.company;
                // 项目文件
                this.file.pro_BP.file_title = data.file.pro_BP.file_title + '.' + data.file.pro_BP.file_ext;
                this.file = data.file;
                // 融资信息
                formatData.setTime(data.financing.pro_history_finance, 'finance_time');
                this.financing = data.financing;
                // 里程碑
                formatData.setTime(data.milepost.pro_develop, 'dh_start_time');
                this.milepost = data.milepost;
                // FA业务
                this.private = data.private;
                // 团队
                this.team.tag = this.getteam_tag(data.team.tag);
                this.team = data.team;
                // is_exclusive
                this.pro = data.pro_FA;
                // brand
                this.brands = data.brands;

                if (data.pro_schedule === '') { data.pro_schedule = {}; data.pro_schedule.schedule_name = ''; data.pro_schedule.schedule_id = ''; }
                this.$store.dispatch('setFollowUp', {projectId: this.project.project_id, projectIntro: this.project.pro_intro});
                resolve(3);
                this.loading = false;
              }
            })
            .catch(err => {
              console.log(err);
            });
        });
      },
      // 获取所有下拉框的数据
      async getWxProjectCategory () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          this.schedule = this.$global.data.schedule;// 设置项目跟进状态
          this.follow_schedule = this.$global.data.follow_schedule.slice(0);// 设置项目状态
          this.follow_schedule.unshift({label: '请选择', value: 0});// 设置项目状态
          this.follow_scheduleAll = this.$global.data.follow_schedule.slice(0);
          this.follow_scheduleAll.unshift({label: '全部', value: 0});// 设置项目状态
          resolve(2);
        });
      },
      // 项目推送入口,项目入口
      projectPushToPro () {
        this.$store.dispatch('projectPushToProControl', true);
        this.zgClick('推送项目');
      },
      // 获取id
      getprojectId () {
        this.project.project_id = this.$route.query.project_id;
        this.activeFrom = this.$route.query.activeTo || 0;
        this.show = this.$route.query.show || 'detail';
      },
      // 编辑项目
      toEdit () {
        this.zgClick('编辑项目');
        this.$router.push({name: 'editproject', query: {project_id: this.project.project_id}});
      },
      // 打开人脉详情弹窗
      toDetail (data) {
        this.$store.dispatch('setConnectDeatil', {cardId: data.card_id, userId: data.user_id, type: 'userInfo'});
        this.$store.dispatch('contactControl', true);
      },
      // 买家图谱 => 打开投资人详情
      toInvestorDetail (data) {
        this.$store.dispatch('setFollowUp', {projectId: this.project.project_id, projectIntro: ''});
        this.$store.dispatch('setConnectDeatil', {type: 'InvestorInfo'});
        this.$store.dispatch('setMatchInvestorsData', data); // 设置买家图谱所需要的数据
        this.$store.dispatch('contactControl', true);
      },
      // hold切换后
      selectChange2 (e) {
        if (this.takechange) {
          let getData = {
            user_id: localStorage.user_id,
            project_id: this.project.project_id,
            schedule_id: e
          };
          this.loading = true;
          this.zgClick('设置项目进度');
          this.$http.post(this.URL.setProjectSchedule, getData)
            .then(res => {
              let data = res.data.data;
              success('设置成功');
              this.loading = false;
              this.project.pro_schedule.schedule_id = data.schedule_id;
              this.project.pro_schedule.schedule_name = data.schedule_name;
            })
            .catch(err => {
              this.loading = false;
              console.log(err);
            });
        }
        this.takechange = true;
      },
      // 点击标签
      handleClick2 (tab, event) {
        if (tab.name === '1') this.zgClick('意向投资人');
        if (tab.name === '2') this.zgClick('买家图谱');
        if (tab.name === '1') this.tabs = true;
        else this.tabs = false;
      },
      // 设置意向投资人右边

      // 获取意向项目数据(图表)
      async getEchartData () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          this.$http.post(this.URL.getEnjoyedInvestorsGroup, {user_id: localStorage.user_id, project_id: this.project.project_id})
            .then(res => {
              if (res.data.status_code === 2000000) {
                let data = res.data.data;
                this.chartData = data;
                this.eChart(data.going, data.hold, data.reject);
                resolve(4);
              }
            })
            .catch(err => {
              console.log(err);
              error('加载超时');
            });
        });
      },
      // 获取意向投资人列表
      async getEnjoyedInvestors () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          this.getConCon.user_id = localStorage.user_id;
          this.currentPage = 1;
          this.getConCon.project_id = this.project.project_id;
          this.getConCon.page = 1;
          this.getConCon.schedule_id = '';
          this.$http.post(this.URL.getEnjoyedInvestors, this.getConCon)
            .then(res => {
              if (res.data.status_code === 2000000) {
                let data = res.data.data;
                this.enjoyInvestors = this.setEnjoyInvestor(data);
                this.totalData = res.data.count;
                if (this.enjoyInvestors.length === 0) {
                  this.activeName = '2';
                  this.tabs = false;
                }
                resolve(5);
              }
            })
            .catch(err => {
              console.log(err);
              error('加载超时');
            });
        });
      },
      // 设置意向投资人列表
      setEnjoyInvestor (arr) {
        let newArr = [];
        arr.forEach((x) => {
          let obj = {};
          obj.follow_id = x.follow_id;
          obj.user_id = x.card.user_id;
          obj.card_id = x.card.card_id;
          obj.user_real_name = x.card.user_real_name;
          obj.is_add = x.card.is_add;
          obj.is_bind = x.card.is_bind;
          obj.schedule_id = x.schedule.schedule_id || 0;
          obj.user_invest_industry = x.card.user_invest_industry;
          obj.user_invest_stage = x.card.user_invest_stage;
          obj.type = x.type;
          obj.user_avatar_url = x.card.user_avatar_url;
          obj.user_avatar_txt = formatData.setUrlChange(x.card.user_avatar_url, x.card.user_real_name);
          obj.user_company_career = x.card.user_company_career;
          obj.user_company_name = x.card.user_company_name;
          obj.match = x.match;
          obj.user_group = formatData.setTagToString(x.card.user_group, 'group_title');
          obj.width = this.selectChange(x.schedule.schedule_id);
          obj.source = x.source;
          newArr.push(obj);
        });
        return newArr;
      },
      // 图表
      eChart (going, hold, reject) {
        if (this.chartCheck) this.chart = echarts.init(document.getElementById('echart'));
        let option = {
          color: ['#13CE66', '#009eff', '#F44C4C'],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            x: 'right',
            top: '30%',
            data: ['推进中', 'Hold', 'Rejcet'],
            textStyle: {
              fontSize: '16'
            }
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              selectedMode: 'single',
              radius: ['60%', '70%'],
              center: ['35%', '55%'],
              label: {
                normal: {
                  show: true,
                  position: 'center',
                  textStyle: {
                    fontSize: '12'
                  }
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '16'
                  }
                }
              },
              data: [
                {value: going, name: '推进中'},
                {value: hold, name: 'Hold'},
                {value: reject, name: 'Rejcet'}
              ],
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    formatter: '{b} : {c}'
                  },
                  labelLine: {show: true}
                }
              }
            }
          ]
        };
        this.chart.setOption(option);
        this.chartCheck = false;
      },
      // 获取意向投资人索引
      getIndex (index) {
        this.scheduleIndex = index;
      },
      // 控制意向投资人页码
      filterChangeCurrent (page) {
        getTop();
        this.loading = true;
        this.getConCon.user_id = localStorage.user_id;
        this.getConCon.project_id = this.project.project_id;
        this.getConCon.page = page;
        this.$http.post(this.URL.getEnjoyedInvestors, this.getConCon)
          .then(res => {
            if (res.data.status_code === 2000000) {
              let data = res.data.data;
              this.enjoyInvestors = this.setEnjoyInvestor(data);
              this.totalData = res.data.count;
            }
            this.loading = false;
          })
          .catch(err => {
            console.log(err);
            this.loading = false;
            error('加载超时');
          });
      },
      // 设置项目跟进进度
      selectChange (e) {
        let width = 0;
        switch (e) {
          case 0:
            width = 0;
            break;
          case 1:
            width = 10;
            break;
          case 2:
            width = 20;
            break;
          case 3:
            width = 30;
            break;
          case 4:
            width = 40;
            break;
          case 5:
            width = 50;
            break;
          case 6:
            width = 60;
            break;
          case 7:
            width = 70;
            break;
          case 8:
            width = 0;
            break;
          case 9:
            width = 0;
            break;
          default:
            console.log('错误');
            break;
        }
        let index = this.scheduleIndex;
        if (index !== -1) {
          this.enjoyInvestors[index].width = width;
          let followId = this.enjoyInvestors[index].follow_id;
          let scheduleId = this.enjoyInvestors[index].schedule_id;
          this.$http.post(this.URL.setEnjoyProjectSchedule, {
            user_id: localStorage.user_id,
            follow_id: followId,
            schedule_id: scheduleId
          })
            .then(res => {
              success('设置成功');
              this.scheduleIndex = -1;
              this.loading = false;
              this.getEchartData();
            })
            .catch(err => {
              console.log(err);
              this.loading = false;
              error('加载超时');
            });
        }
        return width;
      },
      // 筛选意向项目
      selectSearch (e) {
        this.loading = true;
        this.getConCon.schedule_id = e;
        this.getConCon.user_id = localStorage.user_id;
        this.currentPage = 1;
        this.getConCon.project_id = this.project.project_id;
        this.getConCon.page = 1;
        this.$http.post(this.URL.getEnjoyedInvestors, this.getConCon)
          .then(res => {
            if (res.data.data.length !== 0) {
              if (res.data.status_code === 2000000) {
                let data = res.data.data;
                this.enjoyInvestors = this.setEnjoyInvestor(data);
                this.totalData = res.data.count;
                this.loading = false;
              }
            } else {
              this.enjoyInvestors = [];
              this.totalData = 0;
              this.loading = false;
            }
          })
          .catch(err => {
            console.log(err);
            this.loading = false;
            error('加载超时');
          });
      },
      // 买家图谱
      // 设置买家图谱列表
      setProjectMatchInvestors (arr) {
        let newArr = [];
        arr.forEach((x) => {
          let obj = [];
          obj.user_avatar_url = x.user_avatar_url || '';
          obj.user_avatar_txt = formatData.setUrlChange(x.user_avatar_url, x.investor_name);
          obj.investor_career = x.investor_career;
          obj.investor_company = x.investor_company;
          obj.investor_id = x.investor_id;
          obj.investor_name = x.investor_name;
          obj.investor_source = x.investor_source;
          obj.match_weight = x.match_weight;
          obj.original_id = x.original_id;
          obj.recommend_status = x.recommend_status;
          obj.wts_match_weight = x.wts_match_weight;
          obj.push_status = x.push_status;
          obj.investor_email = x.investor_email;
          newArr.push(obj);
        });
        return newArr;
      },
      // 买家图谱列表
      async getProjectMatchInvestors () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          this.getInvestors.user_id = localStorage.user_id;
          this.currentPageInvestors = 1;
          this.getInvestors.project_id = this.project.project_id;
          this.getInvestors.page = 1;
          this.$http.post(this.URL.getProjectMatchInvestors, this.getInvestors)
            .then(res => {
              if (res.data.status_code === 2000000) {
                let data = res.data.data;
                this.ProjectMatchInvestors = this.setProjectMatchInvestors(data);
                this.totalInvestors = res.data.count;
                resolve(6);
              }
            })
            .catch(err => {
              console.log(err, 2);
              error('加载超时');
            });
        });
      },
      // 控制买家图谱页码
      filterChangeInvestors (page) {
        getTop();
        this.loading = true;
        this.getInvestors.user_id = localStorage.user_id;
        this.currentPageInvestors = page;
        this.getInvestors.project_id = this.project.project_id;
        this.getInvestors.page = page;
        this.$http.post(this.URL.getProjectMatchInvestors, this.getInvestors)
          .then(res => {
            if (res.data.status_code === 2000000) {
              let data = res.data.data;
              this.ProjectMatchInvestors = this.setProjectMatchInvestors(data);
              this.totalInvestors = res.data.count;
            }
            this.loading = false;
          })
          .catch(err => {
            console.log(err);
            this.loading = false;
            error('加载超时');
          });
      },
      // 买家图谱推送
      industryPush (data) {
        if (data === 0) {
          warning('已提交');
        } else {
          this.zgClick('推送项目');
          let obj = {
            user_real_name: data.investor_name,
            user_company_career: data.investor_career,
            user_company_name: data.investor_company,
            investor_id: data.investor_id,
            investor_email: data.investor_email
          };
          this.$store.dispatch('setMatchInvestorsData', data); // 设置买家图谱所需要的数据
          this.$store.dispatch('setUserMessage', obj);
          this.$store.dispatch('projectPushToConControl', true);
        }
      },
      // 买家图谱人脉删除
      industryDelete (data) {
        let delData = {};
        delData.user_id = localStorage.user_id;
        delData.investor_id = data.investor_id;
        delData.project_id = this.project.project_id;
        this.$confirm('此操作将移除该买家, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.zgClick('买家图谱移除');
          this.loading = true;
          this.$http.post(this.URL.removeInvestor, delData)
            .then(res => {
              if (res.data.status_code === 2000000) {
                success('移除成功');
                this.getProjectMatchInvestors();
              } else {
                error(res.data.error_msg);
              }
              this.loading = false;
            })
            .catch(err => {
              console.log(err);
              this.loading = false;
              error('加载超时');
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // 帮我引荐
      helpKnow (data) {
        if (data === 0) {
          warning('已引荐');
        } else {
          this.$store.dispatch('setMatchInvestorsData', data); // 设置买家图谱所需要的数据
          this.$store.dispatch('recommendControl', true);
        }
      },
      // 编辑跟进记录
      // 拿到跟进记录id
      getFollowId (id) {
        this.getFollowData = false;
        this.$store.dispatch('setFollowId', id);
        this.$store.dispatch('followControl', true);
      },
      // 重新获取所有数据
      async getAllData (e) {
        this.loading = true;
        try {
          const global = await this.$global.func.getWxProjectCategory(e);
          const getWxProjectCategory = await this.getWxProjectCategory(global);
          const getProjectDetail = await this.getProjectDetail(getWxProjectCategory);
          const getEchartData = await this.getEchartData(getProjectDetail);
          const getProjectMatchInvestors = await this.getProjectMatchInvestors(getEchartData);
          const getWX = await this.getWX(getProjectMatchInvestors);
          const getEnjoyedInvestors = await this.getEnjoyedInvestors(getWX);
          this.loading = false;
          return getEnjoyedInvestors;
        } catch (err) {
          console.err('Error：' + err);
        }
      },
      // 获取二维码
      async getWX () {
        return new Promise((resolve, reject) => {
          this.$http.post(this.URL.getProjectQrOur, {
            user_id: localStorage.user_id,
            width: 1000,
            path: 'pages/oneKeyResearch/oneKeyResearch?id=' + this.project.project_id,
            project_id: this.project.project_id
          })
            .then(res => {
              let data = res.data;
              if (data.status_code === 2000000) {
                this.qrImg = data.qr_src;
              }
            })
            .catch(err => {
              console.log(err);
            });// 请求函数
          resolve(6);
        });
      }
    },
    created () {
      getTop();
      this.getprojectId();
      this.getAllData();
    },
    watch: {
      // 关闭跟进弹框，刷新跟进详情
      followDisplay: function (e) {
        if (!e) {
          this.getEnjoyedInvestors();
          this.getFollowData = true;
        }
      },
      // 推送弹框关闭，刷新所有新数据（项目入口）
      projectPushToProDisplay: function (e) {
        if (!e) {
          this.getAllData();
        }
      },
      // 推送弹框关闭，刷新所有新数据（人脉入口）
      projectPushToConDisplay: function (e) {
        if (!e) {
          this.getAllData();
        }
      },
      // 关闭引荐弹框刷新数据
      recommendDisplay: function (e) {
        if (!e) {
          this.getAllData();
        }
      }
    }
  };
</script>

<style lang="less">
  @import '../../../assets/css/projectDetail.less';
  .scheduleColor{
    color:#20a0ff!important;
  }
</style>
