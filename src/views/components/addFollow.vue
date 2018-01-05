<template>
  <div id="addFollow" >
    <!--===========================================添加或编辑跟进记录弹窗=============================================-->
    <el-dialog :visible="followDisplay" custom-class="dialogFollow" :before-close="handleClose" close-on-press-escape close-on-click-modal lock-scroll
               :close-on-click-modal="showList" :close-on-press-escape="showList" size="large">
      <div class="addTitle">
        <span> | </span>添加跟进
      </div>
      <div class="main" v-loading.body="loading" element-loading-text="拼命加载中">
        <el-form :model="follow" ref="follow" label-width="100px" class="padding" label-position="top">
          <el-row :span="24" :gutter="25">
            <el-col :span="12">
              <el-form-item
                label=" 关联项目"
                prop="project_name" :rules="[{required:true,trigger: 'change',message: '关联项目不能为空'}]">
                <el-autocomplete v-model="follow.project_name"
                                 :fetch-suggestions="querySearchProject"
                                 placeholder="一句话介绍，如帮助FA成交的项目管理工具"
                                 :maxlength="20"
                                 style="width:343.5px;"
                                 @select="handleSelectProject">
                </el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="意向投资人"
                prop="card_name" :rules="[{required:true,trigger: 'change',message: '意向投资人不能为空'}]">
                <el-autocomplete v-model="follow.card_name"
                                 :fetch-suggestions="querySearchAsync"
                                 placeholder="投资人"
                                 @select="handleSelect">
                </el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="机构"
                prop="user_organization" class="formColor" :rules="[{min: 1, max:40,message: '最大40个字符',trigger: 'blur'}]">
                <el-input v-model="follow.user_organization" placeholder="机构">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="24" :gutter="25">
            <el-col :span="6">
              <el-form-item
                label="联系方式"
                prop="user_mobile"
                :rules="PhoneRule">
                <el-input v-model="follow.user_mobile" placeholder="手机号">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="微信"
                prop="user_wechat" class="formColor"  :rules="[{max: 40, message: '长度不能大于40个字符', trigger: 'blur' }]">
                <el-input v-model="follow.user_wechat" placeholder="微信">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="其他联系方式"
                prop="user_other" class="formColor"    :rules="[{max: 40, message: '长度不能大于40个字符', trigger: 'blur' }]">
                <el-input v-model="follow.user_other" placeholder="其他联系方式">

                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="24" :gutter="25">
            <el-col :span="12">
              <el-form-item
                label="跟进进度"
                prop="schedule_id">
                <el-select v-model="follow.schedule_id"
                           placeholder="请选择"
                           style="width:343.5px;">
                  <el-option
                    v-for="item in schedule_name"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="约谈方式"
                prop="meet_type">
                <el-select v-model="follow.meet_type"
                           placeholder="请选择"
                           style="width: 343.5px;">
                  <el-option
                    v-for="item in meet_choose"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="24" :gutter="25">
            <el-col :span="12">
              <el-form-item
                label="约谈时间"
                prop="meet_time" >
                <el-date-picker
                  v-model="follow.meet_time"
                  type="datetime"
                  placeholder="选择日期时间" style="width: 343.5px;">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="约谈地点"
                prop="meet_address" :rules="[{min: 1, max:200,message: '最大200个字符',trigger: 'blur'}]">
                <el-input v-model="follow.meet_address"
                          placeholder="请输入具体地址" >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="24" :gutter="25">
            <el-col :span="12">
              <el-form-item
                label="约谈状态"
                prop="meet_status">
                <el-select v-model="follow.meet_status"
                           placeholder="请选择"
                           style="width:343.5px;">
                  <el-option
                    v-for="item in meet_choose1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="约谈反馈"
                prop="meet_back">
                <el-select v-model="follow.meet_back"
                           placeholder="请选择"
                           style="width: 343.5px;">
                  <el-option
                    v-for="item in meet_choose2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="24" :gutter="32">
            <el-col :span="24">
              <el-form-item label="跟进描述"
                            prop="follow_desc"
                            :rules="[{max: 500, message: '长度不能大于500个字符', trigger: 'blur' }]">
                <el-input type="textarea"
                          v-model="follow.follow_desc"
                          :autosize="{ minRows: 4, maxRows: 30}" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="block-info block-cc-pro" style="margin-top:15px;">
          <span class="f-title fl">项目文件</span>
          <span style="margin-left: 34px;" class="fl">
              <el-upload
                class="upload"
                ref="upload"
                :action="uploadAddress"
                :on-change="handleChange"
                :on-success="uploadsuccess"
                :on-error="uploaderror"
                :before-upload="beforeUpload"
                :file-list="fileList"
                :data="fileuploadDate"
                :show-file-list="showList"
                accept=".doc, .ppt, .pdf, .zip, .rar, .png, .docx, .jpg, .pptx, .jpeg"
                multiple>
                <el-button slot="trigger" type="primary"><i class="el-icon-plus"></i>上传附件</el-button>
              </el-upload>
          </span>
        </div>
        <div class="block-info block-cc-other" style="margin-bottom: 15px;"
             v-for="(list, index) in uploadShow.lists"
             :key="list.index">

          <el-tooltip placement="top">
              <div slot="content">{{list.bp_type}}</div>
              <span class="f-title fl">{{list.bp_type}}：</span>
          </el-tooltip>

          <el-tooltip placement="top">
            <div slot="content">{{list.file_title}}</div>
            <span class="f-name fl" @click.prevent="download(list)"
                  style="cursor: pointer">{{list.file_title}}</span>
          </el-tooltip>

          <span v-if="!list.load" class="del-btn fl" @click.prevent="removeList(list)"><img src="../../assets/images/delete.png"></span>
          <span v-if="!list.load" class="solt-btn" @click.prevent="toGroup(list)">分组设置</span>
          <span v-if="list.load" class="uploadImg"><img src="../../assets/images/loading.gif"></span>
          <span v-if="list.load"  class="del-btn  fl" @click.prevent="cancelUpload(list)">取消</span>
        </div>
        <div slot="footer" class="dialog-footer fr" style="margin: 32px 0">
          <el-button type="primary" @click="allSave" :disabled="submitButton">提 交</el-button>
        </div>
      </div>
    </el-dialog>

    <!--文件分组的弹窗-->
    <el-dialog title="文件分组设置" :visible.sync="dialogFileVisible" :show-close="showList">
      <el-form :model="groups" ref="groups">
        <el-form-item label="分组名称" label-width="80px" prop="input"
                      :rules="[{required: true, message: '分组不能为空', trigger: 'blur'},{max:40,message: '不超过40个字符'}]">
          <el-row :span="24" :gutter="32">
            <el-col :span="18">
              <el-input v-model="groups.input" auto-complete="off"></el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="addGroup('groups')">添加</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div class="radios">
        <el-radio-group v-model="groups.type" @change="groupchange">
          <el-radio v-for="group in groups.group" class="radio"
                    :label="group.value"
                    :key="group.value"
          >{{group.label}}
          </el-radio>
        </el-radio-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFileVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveGroupChange">保　存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
  import * as validata from '@/utils/validata';
  import { error, success } from '@/utils/notification';
  import * as formatData from '@/utils/formatData';
  export default {
    props: {
      cardname: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: ''
      }
    },
    computed: {
      ...mapState({
        followDisplay: state => state.dialogDisplay.followDisplay,
        followId: state => state.projectDetails.followData.followId,
        projectId: state => state.projectDetails.projectMessage.projectId,
        projectIntro: state => state.projectDetails.projectMessage.projectIntro,
        cardId: state => state.projectDetails.contactDeatil.cardId,
        userId: state => state.projectDetails.contactDeatil.userId
      })
    },
    data () {
      var checkPhoneNumber = (rule, value, callback) => {
        if (!validata.getNull(value)) {
          setTimeout(() => {
            if (!validata.checkNumber(value)) {
              callback(new Error('请输入数字值'));
            } else {
              if (!validata.checkPhoneNumber(value)) {
                callback(new Error('请输入正确的手机号'));
              } else {
                callback();
              }
            }
          }, 100);
        } else {
          callback();
        }
      };// 电话号码正则判断
      return {
        uploadAddress: this.URL.weitianshiLine + this.URL.uploadFile + localStorage.token, // 上传地址
        loading: false,
        loading2: false, // 加载框加载
        showList: false, // 上传列表隐藏
        dialogFileVisible: false, // 文件分组设置
        getFollow: {},
        fileuploadDate: { user_id: localStorage.user_id, flag: 1 }, // 项目文件上传带的参数
        restaurants: [], // 项目模糊匹配存放
        userArr: [], // 意向投资人模糊匹配存放
        timeout: null,
        fileList: [], // 批量上传文件列表
        uploadShow: {// 上传文件展示列表,就是老夫操作的列表
          lists: [
            /* {
             bp_type: "其他",
             file_id: 2476,
             file_title: "文件2.docx",
             type: 4,
             load:true,
             uid:1501837722250
             } */
          ]
        },
        groups: {
          input: '',
          group: [
            /*              {type: "其他", label: '其他', value: '其他'} */
          ],
          type: '',
          name: ''
        }, // 分组用的所有参数
        statusLast: 0,
        loadingcheck: false,
        investor_id: '',
        value: '',
        followName: '',
        follow: {
          project_id: '', // 关联项目id
          project_name: '', // 关联项目名称
          card_id: '', // 意向投资人
          card_name: '', // 意向投资人
          schedule_id: '', // 跟进进度
          follow_desc: '', // 跟进描述
          file_id: [], // 文件id
          follow_id: '', // id
          type: '', // 名片类型card,user
          user_organization: '', // 机构
          user_mobile: '', // 手机号
          user_wechat: '', // 微信
          user_other: '', // 其他联系方式
          meet_type: '', // 约谈方式
          meet_time: '', // 约谈时间
          meet_address: '', // 约谈地点
          meet_status: '', // 约谈状态
          meet_back: ''// 约谈反馈
        }, // 跟进记录
        meet_choose: [
          {
            value: 1,
            label: '电话'
          }, {
            value: 2,
            label: '面谈'
          }
        ], // 约谈方式
        meet_choose1: [
          {
            value: 1,
            label: '待确认'
          }, {
            value: 2,
            label: '已确认'
          }, {
            value: 3,
            label: '完成'
          }, {
            value: 4,
            label: '取消'
          }
        ], // 约谈状态
        meet_choose2: [
          {
            value: 1,
            label: '待确认'
          }, {
            value: 2,
            label: '继续跟进'
          }, {
            value: 3,
            label: '不跟进'
          }
        ], // 约谈反馈
        schedule_name: [
          /*            {
           value: '选项1',
           label: '黄金糕'
           } */
        ], // 跟进进度下拉框
        meet_name: [

        ], // 约谈方式下拉框
        project_name: [], // 项目搜索下拉框
        saveJumpData: {

        },
        submitButton: false, // 是否允许提交false允许/true不允许
        typein: '',
        PhoneRule: { validator: checkPhoneNumber, trigger: 'blur' }, // 电话规则

        followMust: false
      };
    },
    methods: {
      // 关闭
      handleClose (e) {
        if (!this.submitButton) {
          this.$store.dispatch('followControl', false);
        } else {
          error('请等待上传成功后关闭或取消上传');
        }
      },
      // 选择项目后
      handleSelectProject (item) {
        this.follow.project_id = '';
        this.follow.project_id = item.label;
      },
      // 项目搜索
      querySearchProject (queryString, cb) {
        let obj = {};
        obj.user_id = localStorage.user_id;
        obj.search = queryString;
        obj.page = 0;
        obj.type = 'follow';
        this.$http.post(this.URL.getProjectList, obj)
          .then(res => {
            this.restaurants = [];
            let data = res.data.data;
            if (data.length === 0) { this.follow.project_id = ''; }
            this.restaurants = this.loadData(data);
            let restaurants = this.restaurants;
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
              cb(restaurants);
            }, 300);
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 选择意向投资人后
      handleSelect (item) {
        this.follow.card_id = item.label;
        this.follow.type = item.type;
        this.typein = item.type;
        let name = item.value;
        let na = item.na || '';
        if (item.label === 0) {
          if (validata.getNull(na)) {
            error('名字不能为空');
            this.follow.card_name = '';
            return false;
          }
          if (name.length > 20) {
            error('名字不能超过20个字');
            this.follow.card_name = '';
          } else {
            this.loading = true;
            this.$http.post(this.URL.createUserCard, {user_id: localStorage.user_id, user_real_name: item.na})
              .then(res => {
                this.loading = false;
                success('添加成功');
                this.follow.card_id = res.data.card_id;
                this.follow.card_name = item.na;
                this.follow.type = 'card';
                this.typein = 'card';
              })
              .catch(err => {
                this.loading = false;
                error('添加失败');
                console.log(err);
                this.follow.card_name = item.na;
              });
          }
        } else {
          this.loading = true;
          this.$http.post(this.URL.getEnjoyedInvestorBasicInfo, {card_id: this.follow.card_id, type: this.follow.type})
            .then(res => {
              this.loading = false;
              this.follow.user_organization = res.data.data.user_organization;
              this.follow.user_mobile = res.data.data.user_mobile;
              this.follow.user_other = res.data.data.user_other;
              this.follow.user_wechat = res.data.data.user_wechat;
            })
            .catch(err => {
              console.log(err);
              this.loading = false;
            });
        }
      },
      // 意向投资人搜索
      querySearchAsync (queryString, cb) {
        this.$http.post(this.URL.match_my_relation, {user_id: localStorage.user_id, user_name: queryString})
          .then(res => {
            this.userArr = [];
            let data = res.data.data;
            if (data.length === 0) { this.follow.card_id = ''; }
            this.userArr = this.loadDataUser(data, queryString);
            let userArr = this.userArr;
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
              cb(userArr);
            }, 300);
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 获取远程数据模拟
      loadData (arr) {
        let newArr = [];
        for (let i = 0; i < arr.length; i++) {
          let obj = {};
          obj.value = arr[i].pro_intro.toString() || '无介绍';
          obj.label = arr[i].project_id;
          newArr.push(obj);
        }
        return newArr;
      },
      // 获取用户
      loadDataUser (arr, name) {
        let newArr = [];
        var set = '新增‘' + name + '’为意向投资人';
        newArr = [{value: set, label: 0, na: name}];
        if (name === '') newArr = [];
        for (let i = 0; i < arr.length; i++) {
          let obj = {};
          obj.value = arr[i].user_real_name + '(' + arr[i].user_company_name + ')';
          if (arr[i].user_company_name === '') obj.value = arr[i].user_real_name;
          obj.name = arr[i].user_real_name;
          obj.label = arr[i].card_id;
          obj.type = arr[i].type;
          newArr.push(obj);
        }
        return newArr;
      },
      // 获取跟进进度
      getScheduleName () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          this.schedule_name = this.$global.data.follow_schedule;// 设置项目跟进状态
          resolve(1);
        });
      },
      // 获取项目分组信息
      getFileType (data) {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
          let obj = {};
          obj.label = data[i].type_name;
          obj.value = data[i].type_id;
          arr.push(obj);
        }
        return arr;
      },
      // 设置文件分组标签
      setFileType () {
        this.$http.post(this.URL.getFileType, {user_id: localStorage.user_id})
          .then(res => {
            let data = res.data.data;
            this.groups.group = this.getFileType(data);
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 设置批量上传文件显示
      setUploadShow (data) {
        for (let i = 0; i < data.length; i++) {
          this.addDomain(data[i].type_name, data[i].file_title + '.' + data[i].file_ext, data[i].file_id, data[i].type);
        }
      },
      // 获取跟进记录
      getFollowUp () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          if (this.followId !== '') {
            this.loading = true;
            this.uploadShow.lists = [];
            this.fileList = [];
            this.$http.post(this.URL.get_follow_record, {user_id: localStorage.user_id, follow_id: this.followId})
              .then(res => {
                let data = res.data.data;
                formatData.setTimeToReallyTime1(data, 'meet_time');// 时间格式设置
                data.file_id = [];
                this.typein = data.type;
                this.follow = data;
                this.setUploadShow(data.files);
                resolve(1);
                this.loading = false;
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            this.loading = false;
          }
        });
      },
      // 项目文件上传==========================
      // 项目文件上传验证
      beforeUpload (file) {
        this.num++;
        let filetypes = ['.doc', '.ppt', '.pdf', '.zip', '.rar', '.pptx', '.png', '.jpg', '.docx', '.jpeg'];
        let name = file.name;
        let fileend = name.substring(name.lastIndexOf('.')).toLowerCase();
        let isnext = false;
        if (filetypes && filetypes.length > 0) {
          for (var i = 0; i < filetypes.length; i++) {
            if (filetypes[i] === fileend) {
              isnext = true;
              break;
            }
          }
        }
        if (!isnext) {
          error(file.name + '是不支持的文件格式');
          return false;
        }
        if (parseInt(file.size) > parseInt(52428810)) {
          error(file.name + '超过50m文件大小');
          return false;
        };
        this.addDomain('其他', file.name, 0, 4, true, file.uid);
        this.subButtonCheck(this.uploadShow.lists);
      },
      // 取消上传
      cancelUpload (file) {
        this.$refs.upload.abort(file);
        this.deleteLoad(file.uid);
        this.subButtonCheck(this.uploadShow.lists);
      },
      // 当添加文件时,添加入上传列表
      handleChange (file, fileList) {
      },
      // 上传成功
      uploadsuccess (response, file, fileList) {
        let data = response.data;
        this.deleteLoad(file.uid);
        this.addDomain(data.type_name, data.file_title, data.file_id, data.type, false, file.uid);
        this.subButtonCheck(this.uploadShow.lists);
      },
      // 上传失败
      uploaderror (err, file, fileList) {
        console.log(err);
        error('上传失败,请联系管理员');
      },
      // 点击下载
      download (item) {
        let index = this.uploadShow.lists.indexOf(item);
        if (index !== -1) {
          let fileId = this.uploadShow.lists[index].file_id;
          const url = this.URL.weitianshi + this.URL.download + '?user_id=' + localStorage.user_id + '&file_id=' + fileId + '&token=' + localStorage.token;
          window.open(url);
        }
      },
      // 删除当前上传文件
      removeList (item) {
        var index = this.uploadShow.lists.indexOf(item);
        if (index !== -1) {
          this.fileList.splice(index, 1);
          this.$http.post(this.URL.deleteAtFile, {
            user_id: localStorage.user_id,
            file_id: item.file_id
          })
            .then(res => {
              if (res.status === 200) {
                this.loading = false;
                this.uploadShow.lists.splice(index, 1);
                success('删除成功');
              }
            })
            .catch(err => {
              console.log(err);
              error('删除失败,请联系管理员');
            });
        }
      },
      // 添加上传文件时,加入显示列表
      addDomain (typeName, fileTitle, fileId, type, load, uid) {
        let object = {};
        object.bp_type = typeName;
        object.file_title = fileTitle;
        object.file_id = fileId;
        object.type = type;// 文件类型
        object.load = load;// 是否在上传中
        object.uid = uid;// 文件唯一标识
        this.uploadShow.lists.push(object);
        this.follow.file_id.push(fileId);
      },
      // 剔除Load
      deleteLoad (uid) {
        let lists = this.uploadShow.lists;// 所有的文件的数组
        let fileIdIists = this.follow.file_id;
        for (let i = 0; i < lists.length; i++) {
          if (lists[i].uid === uid) {
            lists.splice(i, 1);
            fileIdIists.splice(i, 1);
          }
        }
      },
      // 当文件没有全部上传完时,不能提交
      subButtonCheck (arr) {
        if (arr.length === 0) {
          this.submitButton = false;
          return false;
        }
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].load) {
            this.submitButton = true;
            return false;
          } else {
            this.submitButton = false;
          }
        }
      },
      // 点击分组设置中的单选框
      groupchange (label) {
        let index = this.groups.index;
        let data = this.groups.group;
        for (let i = 0; i < data.length; i++) {
          if (data[i].value === label) {
            this.groups.name = data[i].label;
            this.uploadShow.lists[index].type = label;
          }
        }
      },
      // 添加分组设置的分组选项
      addGroup (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post(this.URL.createFileType, {
              user_id: localStorage.user_id,
              type_name: this.groups.input
            })
              .then(res => {
                let data = res.data;
                let newObj = {};
                newObj.type = this.groups.input;
                newObj.label = this.groups.input;
                newObj.value = data.type_id;
                this.groups.type = data.type_id;
                this.groups.group.push(newObj);
                this.groups.input = '';
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            return false;
          }
        });
      },
      // 发送分组设置请求
      saveGroupChange () { // file_id type_id user_id
        this.zgClick('提交跟进');
        let index = this.groups.index;
        let typeName = this.groups.name;
        this.$http.post(this.URL.setFileType, {
          user_id: localStorage.user_id,
          file_id: this.uploadShow.lists[index].file_id,
          type: this.uploadShow.lists[index].type
        })
          .then(res => {
            if (index !== -1) {
              this.uploadShow.lists[index].bp_type = typeName;
              this.dialogFileVisible = false;
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 获取分组的位置
      toGroup (item) {
        this.groups.type = item.type;
        let index = this.uploadShow.lists.indexOf(item);
        this.groups.index = index;
        this.groups.name = item.bp_type;
        this.dialogFileVisible = true;
      },
      //* 检查所有必填项目以及获取所有数据/true过.false不过
      submitForm (formName, checkName) {
        this.$refs[formName].validate((valid) => {
          this[checkName] = !valid;
        });
      },
      // 重置
      resetForm (formName) {
        this.$refs[formName].resetFields();
      },
      // 全部保存按钮
      allSave () {
        var submit = () => {
          return new Promise((resolve, reject) => {
            // 做一些异步操作
            this.submitForm('follow', 'followMust');
            resolve(true);
          });
        };

        var check = () => {
          return new Promise((resolve, reject) => {
            // 做一些异步操作
            setTimeout(() => {
              if (this.followMust) {} else {
                resolve(true);
              }
            }, 200);
          });
        };

        submit()
          .then((data) => {
            return check();
          })
          .then((data) => {
            if (data) {
              if (this.follow.card_name === '') this.follow.card_id = '';
              if (validata.getNull(this.follow.card_id) && !validata.getNull(this.follow.card_name)) {
                error('请选择或添加正确的投资人');
              } else if (validata.getNull(this.follow.project_id)) error('请选择正确的项目');
              else if (validata.getNull(this.follow.project_name)) error('请选择正确的项目');
              else {
                formatData.setReallyTimeToTime1(this.follow, 'meet_time', 'meet_time_stamp');// 标准时间转化为时间戳（单个数据）
                this.follow.follow_id = this.followId;
                if (this.follow.follow_id === '') delete this.follow.follow_id;
                delete this.follow.files;
                this.follow.user_id = localStorage.user_id;
                this.follow.type = this.typein;
                if (this.follow.type === 'user') {
                  this.follow.card_id = this.userId;
                }
                this.loading = true;
                this.$http.post(this.URL.add_follow_record, this.follow)
                  .then(res => {
                    if (res.data.status_code === 2000000) {
//                      this.follow_id = res.data.data;
                      this.$store.dispatch('setFollowId', res.data.data);
                      this.open2('跟进编辑成功', '保存成功', '继续添加', '返回');
                    } else {
                      error(res.data.error_msg);
                    }
                    this.loading = false;
                  })
                  .catch(err => {
                    console.log(err);
                    this.loading = false;
                  });
              }
            }
          });
      },
      // 编辑成功弹窗
      open2 (title, main, confirm, cancel) {
        this.$confirm(main, title, {
          confirmButtonText: confirm,
          cancelButtonText: cancel,
          type: 'success'
        }).then(() => {
          this.clearData();
          this.$store.dispatch('setFollowId', '');
          this.resetForm('follow');
        }).catch(() => {
          this.$store.dispatch('followControl', false);
          this.clearData();
          this.$store.dispatch('setFollowId', '');
        });
      },
      // 清除所有数据
      clearData () {
        this.uploadShow.lists = [];
        this.follow.file_id = [];
        this.fileList = [];
        this.follow.project_id = this.projectId || '';
        this.follow.project_name = this.projectIntro || '';
        this.follow.card_id = this.cardId || '';
        this.follow.card_name = this.cardname || '';
        this.investor_id = this.investorid || '';
        this.saveJumpData = this.follow;
      }
    },
    created () {},
    watch: {
      followDisplay: function (e) {
        if (e) {
          this.clearData();
          this.typein = this.type;
          this.loading = true;
          this.$global.func.getWxProjectCategory()
            .then((data) => {
              return this.getScheduleName();
            })
            .then((data) => {
              return this.getFollowUp();
            });
          this.setFileType();
        } else {
          this.$store.dispatch('setFollowId', '');
          this.resetForm('follow');
        }
      }// 清空数据
    }
  };
</script>

<style lang="less">
  @import '../../assets/css/addFollow';
</style>
