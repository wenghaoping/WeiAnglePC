<template>
  <div id="followUpDetail">
    <div v-if="content.length!=0">
      <div class="followDetail" v-for="(item,index) in content" >
        <!--信息介绍-->
        <div class="followItem" style="margin-top: 0px">
          <div class="item-cicle">
            <img :src="cirIcon">
          </div>
           <div class="item-time cursor" @click="toDetail(item)">{{item.investor_name}}</div>
          <div class="item-name" v-if="item.user_organization">
            <el-tooltip class="item" effect="dark"  placement="top" :disabled="item.user_organization.length > 20 ? false:true">
              <div slot="content">
                <span class="tips-txt">{{item.user_organization}}</span>
              </div>
              <span  style="max-width: 200px; white-space: nowrap;text-overflow: ellipsis;overflow: hidden;display: inline-block;line-height: 17.5px  ">( {{item.user_organization}} )</span>
            </el-tooltip>
          </div>
          <span class="followProject1" style="display: inline-block;line-height: 27px;float: left;margin-top: -5px;margin-left: 16px" :class="{ followColor: item.schedule.schedule_name=='Reject',followColor1:item.schedule.schedule_name=='Hold'}" >{{item.schedule.schedule_name}}</span>
          <div class="item-edit">
            <el-button
              type="text"
              size="small"
              class="item-edit1 item-right" style="line-height: 19px" @click="addFollow(index)">
              修改
            </el-button>
            <el-button type="text" class="item-edit1" @click="deleteFollowId(index)">删除</el-button>
          </div>
        </div>
        <!--信息内容介绍-->
        <div class="followContent">
          <div class="followProject">
            <div class="meet" style="padding-top: 15px;padding-bottom: 10px;" v-show="item.meet_back!=''||item.meet_status!=''||item.meet_type!=''||item.meet_time!=''||item.meet_address!=''">
            <el-row :span="24" >
              <el-col :span="12">
                <span style="font-size:14px;color:#8492a6;">约谈反馈:</span>
                <span style="font-size:14px;color:#475669;">{{item.meet_back| nullTo_}}</span>
              </el-col>
              <el-col :span="12">
                <span style="font-size:14px;color:#8492a6;">约谈状态:</span>
                <span style="font-size:14px;color:#475669;">{{item.meet_status| nullTo_}}</span>
              </el-col>
            </el-row>
            <el-row :span="24">
              <el-col :span="12">
                <span style="font-size:14px;color:#8492a6;">约谈方式:</span>
                <span style="font-size:14px;color:#475669;">{{item.meet_type| nullTo_}}</span>
              </el-col>
              <el-col :span="12">
                <span style="font-size:14px;color:#8492a6;">约谈时间:</span>
                <span style="font-size:14px;color:#475669;">{{item.meet_time| nullTo_}}</span>
              </el-col>
            </el-row>
            <el-row :span="24" >
              <el-col :span="24">
                <span style="font-size:14px;color:#8492a6;">约谈地点:</span>

                <el-tooltip class="item" effect="dark"  placement="top" :disabled="item.meet_address.length > 50 ? false:true">
                  <div slot="content">
                    <span class="tips-txt">{{item.meet_address}}</span>
                  </div>
                  <span style=" width: 618px;white-space: nowrap;text-overflow: ellipsis;font-size: 14px;color: rgb(71, 86, 105);overflow: hidden;display: inline-block; line-height: 14px;">{{item.meet_address| nullTo_}}</span>
                </el-tooltip>
              </el-col>
            </el-row>
            </div>
            <!--联系-->
            <div class="contact" style="padding-bottom: 10px;padding-top: 15px;" v-show="item.user_mobile!=='' || item.user_wechat!=='' || item.user_other!==''">
            <el-row :span="24" >
              <el-col :span="12">
                <span style="font-size:14px;color:#8492a6;">手机:</span>
                <span style="font-size:14px;color:#475669;">{{item.user_mobile | nullTo_}}</span>
              </el-col>
              <el-col :span="12">
                <span style="font-size:14px;color:#8492a6;">微信:</span>
                <span style="font-size:14px;color:#475669;">{{item.user_wechat | nullTo_}}</span>
              </el-col>
            </el-row>
            <el-row :span="24">
              <el-col :span="24">
                <span style="font-size:14px;color:#8492a6;">其他:</span>
                <span style="font-size:14px;color:#475669;">{{item.user_other | nullTo_}}</span>
              </el-col>
            </el-row>
            </div>
          </div>
          <div v-show=" (item.follow_desc!=''|| item.follow_file.length!='')&&(item.user_mobile!=''||item.user_wechat!=''||item.user_other!=''||item.meet_back!=''||item.meet_status!=''||item.meet_type!=''||item.meet_time!=''||item.meet_address!='')"  class="followLine"></div>
          <div class="followContent1" :class="{ padbottom: item.follow_desc!=''|| item.follow_file.length!=''}" >{{item.follow_desc}}</div>
          <!--信息文件名-->
          <div class="followFile" v-for="(file,item1) in item.follow_file" :key="file.id">
            <span @click.prevent="upload(item1,index)" style="cursor: pointer">{{file.file_title}}.{{file.file_ext}}</span>
          </div>
        </div>
        <div class="followFooter" style="font-size:12px;color:#8492a6;text-align: right;margin-top: 5px">
          <span>{{item.follow_user_name}}</span>
          <span>{{item.follow_time}}</span>
        </div>
        <!--确认删除弹框-->
        <el-dialog
          title="删除"
          :visible.sync="dialogVisible"
          size="tiny"
          :before-close="handleClose">
          <div class="el-message-box__status el-icon-warning"></div>
          <span style="display: inline-block;margin-left: 44px;">您确认要删除当前项目跟进记录及关联文件吗？</span>
          <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteFollow">确 定</el-button>
        </span>
        </el-dialog>
      </div>
      <!--分页-->
      <el-pagination
        class="pagination fr"
        small
        @current-change="filterChangeCurrent"
        :current-page.sync="currentPage"
        layout="prev, pager, next"
        :page-size="10"
        :total="totalData" v-show="this.totalData!==0">
      </el-pagination>
    </div>
    <div class="emptyData" v-else>
      <img src="../../../assets/images/kongshuju.png">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import cirIcon from '../../../../static/images/circle.png';
  import { success } from '@/utils/notification';
  import { getTop } from '@/utils';
  export default {
    components: {},
    props: ['proid', 'getDataTrue'],
    data () {
      return {
        cirIcon: cirIcon,
        newTime: '',
//        dialogFollow: false, // 控制写跟进弹框
        pro_id: this.proid,
        loading: false, // 加载
        loading1: false, // 加载动画
        content: {}, // 跟进记录数据
        dialogVisible: false,
        followid: '', // 跟进记录id
        currentPage: 1, // 跟进列表当前第几页
        totalData: 0, // 跟进列表总数
        getData1: {}// 获取跟进的请求参数
      };
    },
    methods: {
      toDetail (data) {
        this.$store.dispatch('setConnectDeatil', {cardId: data.card_id, userId: data.user_id, type: 'userInfo'});
        this.$store.dispatch('contactControl', true);
      },
      upload (item1, index) {
        let fileId = this.content[index].follow_file[item1].file_id;
        const url = this.URL.weitianshi + this.URL.download + '?user_id=' + localStorage.user_id + '&file_id=' + fileId;
        window.open(url);
      }, // 下载
      filterChangeCurrent (page) {
        this.getProjectFollowList(page);
      }, // 控制项目页码1
      getProjectFollowList (page) {
        this.getData1.user_id = localStorage.user_id;
        this.getData1.project_id = this.pro_id;
        this.currentPage = page;
        this.getData1.page = page;
        this.$http.post(this.URL.getProjectFollowList, this.getData1)
          .then(res => {
            if (res.data.status_code === 2000000) {
              let data = res.data.data;
              this.setDateTime(data);// 时间格式设置
              this.content = data;
              this.totalData = res.data.count;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }, // 获取跟进记录.toLocaleString('chinese',{hour12:false}).substr(0, 15).replace(/\//g,'.').replace(/:$/,"")
      //* 时间戳的处理
      formatDateTime1 (timeStamp) {
        if (timeStamp === '') return '';
        var date = new Date();
        date.setTime(timeStamp * 1000);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        // var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        // second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute/* +':'+second */;
      }, // 时间戳转化为正常时间yyyy-mm-dd-hh-m===========单个时间的处理
      setDateTime (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].follow_time = this.formatDateTime1(data[i].follow_time);
        }
      },
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }, // 弹框消息提示
      deleteFollow () {
        this.dialogVisible = false;
        this.$http.post(this.URL.delete_follow_record, {
          user_id: localStorage.user_id,
          follow_id: this.followid
        }).then(res => {
          success('删除成功');
          this.getProjectFollowList();
          this.$emit('changefollowdata', true);
        });
      }, // 删除跟进记录
      deleteFollowId (index) {
        this.dialogVisible = true;
        this.followid = this.content[index].follow_id;
      }, // 获取删除记录id
      addFollow (index) {
//        this.dialogFollow = true;
        this.followid = this.content[index].follow_id;
//        this.getProjectFollowList();
        this.$emit('getfollowid', this.content[index].follow_id);
      } // 点击写跟近按钮
    },
    created () {
      getTop();
      this.getProjectFollowList(1);
    },
    watch: {
      proid: function (e) {
        this.pro_id = e;
      }, // 获取项目id
      getDataTrue: function (e) {
        if (e) {
          this.getProjectFollowList();
          this.followid = '';
          this.$emit('changefollowdata', true);
        }
      }// 是否重新获取数据
    }
  };
</script>

<style lang="less">
  @import '../../../assets/css/followUpDetail';
  .el-dialog--tiny{
    width:44%;
    box-shadow: none;
  }
  .padbottom{
    padding-bottom: 10px;
    padding-top: 5px;
  }
</style>
