<template>
  <div id='mailProjectDetail_type1'>
    <div class="projectMaid">
      <h1 style="font-size: 1rem;">这里是项目的一句话介绍，这里是项目的一句话介绍</h1>
      <!--项目标签-->
      <div class="flex industryList">
        <div class="industryItem" v-for=" industryItem in project.pro_industry">
          {{industryItem.industry_name}}
        </div>
      </div>
      <div class="flex tags">
        <div class="tag">{{ project.pro_scale.scale_money }}</div>
        <div class="tag">{{ project.pro_stage.stage_name}}</div>
        <div class="tag">{{ project.pro_area.area_title}}</div>
      </div>
      <!--用户名片-->
      <div class='userCard flex'>
        <img src="" alt="">
        <div>
          <div class="name">{{userMessage.user_real_name}}</div>
          <div class="careerAndcompany size_12 color_6">{{userMessage.user_company_career}}·{{userMessage.user_company_name}}</div>
        </div>
      </div>
      <!--投资亮点-->
      <div class="textBlock size_14 color_3">
        <div class="text_title weight">投资亮点</div>
        <div class="text_content" v-for="goodness in project.goodness.pro_goodness">
          <span class="goodness_title color_3">·&nbsp;{{goodness.goodness_title}} :</span>
          <span class="goodness_desc color_6">{{goodness.goodness_desc}}</span>
        </div>
      </div>
      <!--市场概况-->
      <div class="textBlock size_14 color_3">
        <div class="text_title weight">市场概况</div>
        <div class="text_content" v-for="marketGenera in project.goodness.pro_market_genera">
          <span class="goodness_title color_3">· &nbsp;{{marketGenera.goodness_title}} :</span>
          <span class="goodness_desc color_6">{{marketGenera.goodness_desc}}</span>
        </div>
      </div>
      <!--产品概况-->
      <div class="textBlock size_14 color_3">
        <div class="text_title weight">产品概况</div>
        <div class="text_content" v-for="pro_service in project.goodness.pro_service">
          <span class="goodness_title color_3">· &nbsp;{{pro_service.goodness_title}} :</span>
          <span class="goodness_desc color_6">{{pro_service.goodness_desc}}</span>
        </div>
      </div>
      <!--基本介绍-->
      <div class="project_intro">
        <div class="size_15 weight">基本介绍</div>
        <div class="intro_tags flex">
          <div class="tag" v-for="tag in project.tag">{{tag.tag_name}}</div>
        </div>
        <div class="intro_item">
          <span class="color_9">项目名称</span>
          <span class="color_3">{{project.pro_name  || '暂无'}}</span>
        </div>
        <div class="intro_item">
          <span class="color_9">公司名称</span>
          <span class="color_3">{{project.pro_company_name  || '暂无'}}</span>
        </div>
        <div class="intro_item">
          <span class="color_9">运营状态</span>
          <span class="color_3">{{company.pro_status.status_name  || '暂无'}}</span>
        </div>
        <div class="intro_item">
          <span class="color_9">公司规模</span>
          <span class="color_3">{{company.pro_company_scale.comp_scale_value  || '暂无'}}</span>
        </div>
        <div class="intro_item">
          <span class="color_9">产品链接</span>
          <span class="color_3">{{company.pro_website  || '暂无'}}</span>
        </div>
      </div>
      <!--产品-->
      <div class="brandList">
        <div class="main_title flex">
          <div class="text_title ">产品</div>
          <div class="showAll">全部&nbsp;()</div>
        </div>
        <div class="brand flex" v-for="brand in brands.brand">
          <img src="http://weitianshi-2017.oss-cn-shanghai.aliyuncs.com/image/banner/email/default-logo.jpg" alt="">
          <div style="width: 17.5rem;">
            <div>
              <div class="sb">
                <div class="brand_name size_15">{{brand.brand_name}}</div>
                <div class="brand_type size_12">微信公众号</div>
              </div>
              <div class="brand_desc size_12 color_6">{{brand.brand_desc}}</div>
            </div>
          </div>
        </div>
      </div>
      <!--历史融资-->
      <div class="financing">
        <div class="main_title flex">
          <div class="text_title ">产品</div>
          <div class="showAll">全部&nbsp;()</div>
        </div>
        <div class="pro_history_finance" v-for="finance in financing.pro_history_finance">
          <div class="flex size_14">
            <div class="finance_left">{{finance.finance_time}}</div>
            <div class="finance_middle"><img src="" alt=""></div>
            <div class="finance_right">{{finance.pro_finance_scale}}</div>
          </div>
          <div class='flex'>
            <div class="finance_left"></div>
            <div class="finance_middle"></div>
            <div class="finance_right"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
  import yichu from '../../assets/images/icon-yichu.png';
  import xiaochengxu from '../../../static/images/xiaochengxu.png';
  import pinpai from '../../../static/images/icon-pinpa.png';
  import yunying from '../../../static/images/icon-yunying.png';
  import cirIcon from '../../../static/images/circle.png';
  import echarts from 'echarts';
  import research from '../workBench/myProject/onekeyresearch.vue';
  import folowup from '../workBench/myProject/followUpDetail.vue';
  import filemanagement from '../workBench/myProject/fileManagement.vue';
  import onlinedata from '../workBench/myProject/onlineData.vue';
  import scoreStatistics from '../workBench/myProject/scoreStatistics.vue';
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
        projectPushDisplay: false, // 项目推送弹框,人脉入口
        projectPushDisplay2: false, // 项目推送弹框,项目入口
//        searchDisplay: false, // 一键尽调弹框
//        companySearchDisplay: false, // 公司搜索弹框
        contactDisplay: false, // 人脉详情弹窗
        recommendDisplay: false, // 帮我引荐
        companyname: '', // 公司名称给一键尽调用的
        companyid: '', // 公司id给一键尽调用的
        cardid: '', // 人脉详情弹框用(点击的那个人的cardid)
        userid: '', // 人脉详情弹框用(点击的那个人的userid)
        projecmessage: {
          project_id: '',
          pro_intro: ''
        }, // 项目名称,ID
        followDisplay: false, // 添加意向投资人
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
        followid: '', // 得到followid
        userMessage: {
          user_real_name: '翁浩平', // 姓名
          user_company_career: '投资总监', // 职位
          user_company_name: '杭州投着乐网络科技有限公司'// 公司名称
        }, // 传递给推送的数据
        userEmail: '',
        scrolled: false,
        qrImg: '' // 二维码地址
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
        companySearchDisplay: state => state.dialogDisplay.companySearchDisplay
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
        this.followid = '';
        this.followDisplay = true;
        this.projecmessage.project_id = this.project.project_id;
        this.projecmessage.pro_intro = this.project.pro_intro;
      },
      // 关闭添加跟进
      closeFollow (msg) {
        this.followDisplay = msg;
        this.getEnjoyedInvestors();
        this.getFollowData = true;
      },
      // 关闭添加跟进重置
      changefollowdata () {
        this.getFollowData = false;
        this.getAllData();
      },
      // 下载文件
      download (e) {
        const url = this.URL.weitianshi + this.URL.download + '?user_id=' + localStorage.user_id + '&file_id=' + e;
        window.location.href = url;
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
//          this.companySearchDisplay = true;
          this.$store.dispatch('companySearchControl', true);
        } else {
          this.loading = true;
          this.$http.post(this.URL.getCrawlerCompany, {user_id: localStorage.user_id, company_name: this.project.pro_company_name})
            .then(res => {
              let data = res.data.data;
              if (data.length === 0) { // 搜索不到信息
//                this.companySearchDisplay = true;
                this.$store.dispatch('companySearchControl', true);
                this.searchName = this.project.pro_company_name;
                this.companyname = this.project.pro_company_name;
                this.seachCompanys = [{company_name: '匹配不到你要搜索的公司,请重新继续输入', com_id: -2}];
                this.loading = false;
              } else { // 搜索到了
                this.loading = false;
//                this.searchDisplay = true;
                this.$store.dispatch('setSearchCompany', {companyId: data.company.com_id, companyName: this.project.pro_company_name});
                this.$store.dispatch('searchControl', true);
                /* this.companyid = data.company.com_id;
                this.companyname = this.project.pro_company_name; */
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
//                console.log(res);
                if (res.data.status_code === 2000000) {
                  success('修改成功');
                  if (data.com_id !== -1) {
//                    this.companySearchDisplay = false;
                    this.$store.dispatch('companySearchControl', false);
                    this.$store.dispatch('setSearchCompany', {companyId: data.com_id, companyName: data.newName});
                    /* this.companyid = data.com_id;
                    this.companyname = data.newName; */
//                    this.searchDisplay = true;
                    this.$store.dispatch('searchControl', true);
                  } else {
//                    this.companySearchDisplay = false;
                    this.$store.dispatch('companySearchControl', false);
                  }
                }
              })
              .catch(err => {
                console.log(err);
              });
          }).catch(() => {
//            this.companySearchDisplay = false;
            this.$store.dispatch('companySearchControl', false);
          });
        }
      },
      // 关闭搜索弹框
      dialogVisibleTo () {
//        this.companySearchDisplay = false;
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
      },
      // 传递给一键尽调窗口
      closeSearchDisplay (msg) {
        this.searchDisplay = msg;
        if (!msg) {
          this.getProjectDetail();
        }
      },
      // 传递给一键尽调搜索窗口
      closeCompanySearchDisplay (msg) {
        this.companySearchDisplay = msg;
      },
      // 人脉详情弹窗关闭
      closeContact (msg) {
        this.contactDisplay = msg;
      },
      // 关闭项目推送弹框(人脉入口)
      closeProjectPush (msg) {
        this.projectPushDisplay = msg;
        this.getAllData();
      },
      // 关闭项目推送弹框(项目入口)
      closeProjectPush2 (msg) {
        this.projectPushDisplay2 = msg;
        this.getAllData();
      },
      // 关闭预览AND关闭项目推送1,关闭项目推送2
      closePreviewANDProjectPush (msg) {
        this.projectPushDisplay = false;
        this.projectPushDisplay2 = false;
        this.previewDisplay = false;
        this.getAllData();
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
        let str = [];
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].type === 1) {
            str.push(arr[i].tag_name);
          }
        }
        return str;
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
          this.$http.post(this.URL.getProjectDetail, {user_id: localStorage.user_id, project_id: '2rzVAMr3'})
            .then(res => {
              if (res.data.status_code === 430004) {
                warning('找不到项目');
                this.loading = false;
                this.$router.push({name: 'index'});// 路由传参
              } else {
                let data = res.data.data;
                console.log(data);
                // 项目介绍
//                if (data.project.pro_company_name === '')  data.project.pro_company_name === '-'; }
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
      projectPush2 () {
        this.projectPushDisplay2 = true;
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
        this.cardid = data.card_id;
        this.userid = data.user_id;
        this.contactDisplay = true;
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
      // 获取意向投资人列表
      async getEnjoyedInvestors () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          this.getConCon.user_id = localStorage.user_id;
//      this.getPra.user_id="2rzyz5vp";
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
          obj.push_statues = x.push_statues;
          newArr.push(obj);
        });
        return newArr;
      },
      // 买家图谱列表
      async getProjectMatchInvestors () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          this.getInvestors.user_id = localStorage.user_id;
//      this.getPra.user_id="2rzyz5vp";
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
//      this.getPra.user_id="2rzyz5vp";
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
          this.userMessage.user_real_name = data.user_real_name;
          this.userMessage.user_company_career = data.user_company_career;
          this.userMessage.user_company_name = data.user_company_name;
          this.userMessage.card_id = data.card_id;
          if (data.type === 'user') {
            this.userMessage.card_id = data.user_id;
          }
          this.userMessage.type = data.type || '';
          this.userEmail = data.user_eamil;
          this.$store.state.pushProject.projectMessgae = {pro_id: this.project.project_id || '', pro_intro: this.project.pro_intro || ''};
          this.$store.state.pushProject.pushMessage.investor_id = data.investor_id;
          this.projectPushDisplay = true;
          this.pushData.email = data.user_eamil;
          this.pushData.project_id = this.project.project_id;
        }
      },
      // 买家图谱人脉删除
      industryDelete (data) {
        let delData = {};
        console.log(data);
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
          this.$http.post(this.URL.exceptMatchAction, delData)
            .then(res => {
              if (res.data.status_code === 2000000) {
                success('移除成功');
                this.getProjectMatchInvestors();
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
        this.$store.dispatch('setMatchInvestorsData', data);
        console.log(data);
        this.recommendDisplay = true;
      },
      // 编辑跟进记录
      // 拿到跟进记录id
      getFollowId (id) {
        this.followDisplay = true;
        this.followid = id;
        this.getFollowData = false;
      },
      // 项目推送
      // 打开项目预览
      openPreview (msg) {
        this.previewDisplay = msg;
      },
      // 项目推送预览隐藏
      previewPush (x) {
        this.emitPush = x;
      },
      // 关闭项目预览
      closePreview (msg) {
        this.previewDisplay = msg;
      },
      // 重新获取所有数据
      async getAllData (e) {
        this.loading = true;
        try {
          const global = await this.$global.func.getWxProjectCategory(e);
          const getWxProjectCategory = await this.getWxProjectCategory(global);
          const getProjectDetail = await this.getProjectDetail(getWxProjectCategory);
          const getProjectMatchInvestors = await this.getProjectMatchInvestors(getProjectDetail);
          const getWX = await this.getWX(getProjectMatchInvestors);
          const getEnjoyedInvestors = await this.getEnjoyedInvestors(getWX);
          this.loading = false;
          return getEnjoyedInvestors;
        } catch (err) {
          console.log('Error：' + err);
        }
        /* this.$global.func.getWxProjectCategory()
         .then((data) => {
           return this.getWxProjectCategory();
         })
         .then((data) => {
           return this.getProjectDetail();
         })
         .then((data) => {
           return this.getEchartData();
         })
         .then((data) => {
           return this.getProjectMatchInvestors();
         })
         .then((data) => {
           return this.getWX();
         })
         .then((data) => {
           this.loading = false;
           return this.getEnjoyedInvestors();
         }); */
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
      localStorage.setItem('user_id', 'Np38mX9r');
      console.log(this);
    },
    watch: {

    }
  };
</script>

<style scoped lang="less">
  @import '../../assets/css/mobileEntrance.less';

  #mailProjectDetail_type1 {
    width: 343px;
    padding: 1rem;
    margin: 0 auto;
    .size_12{
      font-size: .75rem;
    }
    .size_14{
      font-size: 14/16rem;
    }
    .size_15{
      font-size: 15/16rem;
    }
    .color_6{
      color: #666;
    }
    .color_3{
      color: #333;
    }
    .color_9{
      color: #999;
    }
    .weight{
      font-weight: bolder;
    }
    .sb{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .main_title{
      justify-content: space-between;
      align-items: baseline;
    }
    .text_title{
      font-size: 15/16rem;
      margin-bottom: 1rem;
    }
    .showAll{
      cursor: pointer;
      font-size: .75rem;
      color: #3378e0;
    }
    .flex {
      display: flex;
    }
    .industryItem,.tag{
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
      margin-top: 10/16rem;
      margin-right: 7/16rem;
      background-color:#f5f5f5;
      border-radius:2/16rem;
      color: #666;
    }
    .userCard{
      margin-top: 10/16rem;
      padding: 1rem 21/16rem 1rem 1rem;
      img{
        background-color: red;
        border-radius: 50%;
        width: 2.25rem;
        height: 2.25rem;
        display: block;
        margin-right: .5rem;
      }
      .name{
        font-size: 14/16rem;
        color: #333;
      }
      .careerAndcompany {
        margin-top: 3/16rem;
      }
    }
    .textBlock{
      padding: 1rem;
      .text_title{
        font-size: 15/16rem;
        margin-bottom: 1rem;
      }
      .text_content{
        margin-bottom: .25rem;
        .goodness_title{
          font-weight: 400;
        }
      }
    }
    .project_intro{
      margin-top: 1rem;
      padding: 1rem;
      .intro_tags {
        margin-top: 1rem;
        margin-bottom: .25rem;
        .tag{
          padding: .25rem .5rem;
          margin-right: .75rem;
          border: 1px solid #293b55;
          border-radius: 7/4rem;
          color: #293b55;
          font-size: 11/16rem;
          margin-bottom: .375rem;
        }
      }
      .intro_item{
         font-size: 14/16rem;
         span:first-child{
           margin-right: 1rem;
         }
      }
    }
    .brandList{
      padding: 1rem;
      .brand_title{
        justify-content: space-between;
        align-items: baseline;
      }
      .text_title{
        font-size: 15/16rem;
        margin-bottom: 1rem;
      }
      .brand{
        margin-top: 1.25rem;
        margin-bottom: 1.25rem;
        img{
          width: 52px;
          height: 52px;
          margin-right: 7/16rem;
        }
        .brand_name{

        }
        .brand_type{
          border:1px solid #293b55;
          border-radius:34px;
        padding: .25rem .5rem;
        }
        .brand_desc{
          margin-top: 11/16rem;
        }
      }
    }
    .financing{
      padding: 1rem;
      .finance_left{
        flex: 50;
      }
      .finance_middle{
        flex:33;
      }
      .finance_right{
        flex:246;
      }
    }
  }

</style>

