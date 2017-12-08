<template>
  <!--     头部导航 -->
  <header id="header">
    <ul class="select ulfl tc" style="position: relative">
      <li style="width: 150px;margin-right: 100px;vertical-align: middle;display: table-cell;height: 60px;"><img
        src="../assets/images/logoing.png" style="vertical-align:middle;"></li>
      <li @click="toggle(index)" v-for="(tab,index) in tabs">
        <router-link :to=" tab.jump " :class="{border:active===index}">
          {{tab.type}}
        </router-link>
      </li>
      <li id="samllrou">小程序</li>
      <div class="weixin">
        <p style="margin-top: 34px;">微信扫一扫</p>
        <p style="margin-bottom: 15px">发现更多精选资源</p>
        <div class="img">
          <img src="../assets/images/weixin.jpg">
        </div>
        <div class="arrow">
          <img src="../assets/images/arrow.png">
        </div>
      </div>

      <li v-show="userRealName" style="float: right;position: relative;margin-right: 55px;line-height: 60px">
        <el-dropdown trigger="click">
              <span class="el-dropdown-link" style="color: #ffffff">
                {{userRealName}}<i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><div @click="loginOut(0)">个人信息</div></el-dropdown-item>
            <el-dropdown-item><div @click="loginOut(1)" >{{groupStatus}}</div></el-dropdown-item>
            <el-dropdown-item divided><div @click="loginOut(2)">退出</div></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
      <li v-show="!userRealName" class="login" @click="login">
        登录
      </li>
      <el-autocomplete
        v-model="companyTitle"
        :fetch-suggestions="querySearchAsync"
        placeholder="查竞品，查工商，请输入公司或品牌名称"
        @select="handleSelect"
        class="width350"
      ></el-autocomplete>
    </ul>
  </header>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      identityDisplay: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        loading: false,
        tabs: [
          {type: '首页', jump: '/'},
          {type: '工作站', jump: '/workBench'}
        ],
        restaurants: [],
        companyTitle: '',
        user_name: '',
        user_id: '',
        timeout: null,
        value: '',
        active: 0
      };
    },
    computed: {
      userRealName () {
        let userRealName = this.$store.state.logining.user_real_name || localStorage.user_real_name;
//        console.log(userRealName);
        return userRealName;
      },
      groupStatus () {
        let groupName = this.$store.state.logining.group_name || localStorage.group_name || '身份认证';
//        console.log(groupName);
        return groupName;
      }
    },
    mounted () {

    },
    // 组件
    components: {},
    methods: {
      // 切换选项卡
      toggle (i) {
        this.active = i;
        if (this.active === 0) { this.zgClick('首页'); }
        if (this.active === 1) { this.zgClick('工作站'); }
        if (this.active === 2) { this.zgClick('小程序'); }
        // 控制点击工作台跳转情况
        if (this.active === 1) {
          localStorage.entrance = 'myProject';
          if (localStorage.user_id) {
            this.$router.push({name: 'myProject', query: {activeTo: 0}});

//            setTimeout(()=>{ window.location.reload()},1000);
          } else {
            this.$router.push({name: 'telephoneLogin'});
          }
        }
      },
      // 登录
      login () {
        this.zgClick('登陆');
        localStorage.entrance = 'myProject';
        this.$router.push({path: 'login'});
      },
      // 获取远程数据模拟
      loadData (arr) {
        var newArr = [];
        for (let i = 0; i < arr.length; i++) {
          let obj = {};
          obj.value = arr[i].project_name === '' ? arr[i].company_name : arr[i].company_name + '(' + arr[i].project_name + ')';
          obj.address = arr[i].com_id;
          obj.company_name = arr[i].company_name;
          obj.pro_id = arr[i].pro_id;
          newArr.push(obj);
        }
        return newArr;
      },
      // 自动搜索,接口写这里面
      querySearchAsync (queryString, cb) {
        if (queryString.length > 2) {
          this.$http.post(this.URL.selectCompany, {company_name: queryString})
            .then(res => {
              this.restaurants = [];
              let data = res.data.data;
              this.restaurants = this.loadData(data);
              let restaurants = this.restaurants;
              clearTimeout(this.timeout);
              this.timeout = setTimeout(() => {
                if (data.length === 0) {
                  let callback = [{value: '未查询到结果，换个关键词试试', address: -1}];
                  cb(callback);
                } else {
                  cb(restaurants);
                }
              }, 500);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          let callback = [];
          cb(callback);
        }
      },
      // 选择了搜索出来的数据后
      handleSelect (item) {
        this.loading = true;
        this.companyTitle = item.company_name;
        this.companyId = item.address;
        this.$http.post(this.URL.getCrawlerCompany, {company_name: this.companyTitle})
          .then(res => {
            let data = res.data.data;
            if (data.length !== 0) {
              this.$router.push({name: 'onekeyResearch', query: {company: item.company_name, pro: item.pro_id}});// 路由传参
            } else {
              this.$tool.warning('未查询到该公司信息，无法获取');
            }
            this.loading = false;
          })
          .catch(err => {
            this.$tool.error('获取失败');
            console.log(err);
            this.loading = false;
          });
      },
      // 个人信息,认证,登出
      loginOut (e) {
        if (e === 0) {
          this.$router.push({name: 'personalInformation'}); // 个人信息
        } else if (e === 1) {
          this.getUserGroupByStatus();
        } else if (e === 2) {
          localStorage.clear();
          sessionStorage.clear();
          this.$router.push({path: 'login'});// 登陆
          this.$store.state.logining.user_real_name = '';
          this.$store.state.logining.user_id = '';
          setTimeout(() => { window.location.reload(); }, 100);
        }
        this.value = '';
      },
      // 是否认证过身份
      getUserGroupByStatus () {
        // 核对是否认证过身份
        this.$http.post(this.URL.getUserGroupByStatus, {
          user_id: localStorage.user_id
        }).then(res => {
          if (res.data.status_code === 2000000) {
            if (res.data.status === 0) {
              this.$router.push({name: 'identityChoose'});
              localStorage.authenticate_id = '';
            } else {
              // 认证过了
              localStorage.group_title = res.data.group.group_title || '';
              this.$emit('identityopen', true);
            }
          } else {
            this.$tool.error('核对身份接口调用失败');
          }
        });
      }
    },
    // 当dom一创建时
    created () {

    },
    watch: {}
  };
</script>

<style lang="less">

</style>
