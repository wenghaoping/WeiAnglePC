<template>
  <div id="fileManagement">
    <!--新建文件分组按钮-->
    <el-button class="createNewGroup" style="border-radius: 2px" @click.prevent="toGroup">新建文件分组</el-button>
    <!--文件类别-->
    <el-collapse v-model="activeNames">
      <el-collapse-item :name="index" v-for="(item,index) in groupList" :key="item.type_id">
        <!--分组表头-->
        <template slot="title">
          <span class="clearfix  groupName">
            {{item.type_name}}  (<span>{{item.fileNum}}</span>)
               </span>
          <span class=" clearfix collapseHead" style=" display: inline-block;float: right;margin-top: -41px;">
             <el-button v-if="item.type_id>4" class="upload delete fr" type="text" @click.stop="getTypeId(item.type_id,3)"><img :src="deleteIcon">删除</el-button>
            <!--bp上传-->
             <div class="fr" style="margin-top: -3px" v-if="item.type_id===1 && parseInt(item.fileNum)===0 && item.newFile.length===0">
               <el-upload
                 class="upload"
                 :ref="item.type_name"
                 :action="uploadAddress"
                 :on-change="handleChange"
                 :on-progress="uploadProgress"
                 :on-success="uploadsuccess"
                 :on-error="uploaderror"
                 :before-upload="beforeUpload"
                 :file-list="fileList"
                 :data="{user_id: user_id, project_id: project_id}"
                 :show-file-list="false"
                 accept=".pdf, .ppt, .pptx, .doc, .docx, .rar, .zip">
                    <el-button class="upload" type="text" @click="getTypeId(item.type_id,2)"><img :src="uploadIcon">上传文件</el-button>
               </el-upload>
            </div>
            <!--非bp上传-->
            <div class="fr" style="margin-top: -1px" v-if="item.type_id!=1">
               <el-upload
                 class="upload"
                 :ref="item.type_name"
                 :action="uploadAddressFile"
                 :on-change="handleChange"
                 :on-progress="uploadProgress"
                 :on-success="uploadsuccess"
                 :on-error="uploaderror"
                 :before-upload="beforeUpload2"
                 :file-list="fileList"
                 :data="{user_id: user_id, project_id: project_id, type: item.type_id}"
                 :show-file-list="false"
                 accept=".pdf, .ppt, .pptx, .doc, .docx, .rar, .zip, .png, .jpg, .jpeg"
                 multiple>
                    <el-button class="upload" type="text" @click="getTypeId(item.type_id,2)"><img :src="uploadIcon">上传文件</el-button>
               </el-upload>
            </div>
            <el-button v-if="item.type_id>4"  style="margin-top: 1px" class="upload rename fr" type="text" @click.stop="getTypeId(item.type_id,1,item.type_name)"><img :src="renameIcon">重命名</el-button>
            </span>
        </template>
        <!--文件列表-->
        <div class="fileList" style="padding-left: 37px">
          <div class="block-info block-cc-other" style="margin-bottom: 15px;"
               v-for="(file, index) in item.file"
               :key="file.file_id">
            <span class="f-name" style="cursor: pointer;font-size: 10px" @click="download(file.file_id)">{{file.file_title}}.{{file.file_ext}}</span>
            <div class="fr" style="margin-right: 21px">
              <!--bp上传-->
              <el-button v-if="item.type_id===1" type="text"  style="font-size: 12px" @click="getFileId(file.file_id,item.type_id,'bp')">删除</el-button>

              <!--非bp上传-->
              <el-dropdown v-if="item.type_id!=1"  @command="fileDeal" trigger="click">
                <span class="el-dropdown-link" @click="getFileId(file.file_id,item.type_id)">
                  <img :src="threePoint" class="threePoint">
                </span>
                <el-dropdown-menu slot="dropdown" class="curor">
                  <!--<el-dropdown-item command="1">查看</el-dropdown-item>-->
                  <el-dropdown-item command="2">移至</el-dropdown-item>
                  <el-dropdown-item command="3">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
        <!--新添文件列表-->
        <div class="fileList" style="padding-left: 37px">
          <div class="block-info block-cc-other" style="margin-bottom: 15px; position:relative;"
               v-for="(newF, index) in item.newFile"
               :key="newF.file_id">
            <span class="f-name" style="cursor: pointer">{{newF.name}}</span>
            <img src="../../../assets/images/loading.gif" style="width:16px;height: 16px;margin-left: 10px;">
            <i @click.prevent="cancelUpload(item.type_name,newF,index)" style="font-size:12px;color:#f44c4c;cursor: pointer">取消</i>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <!--新建文件分组的弹窗-->
    <el-dialog title="新建文件分组" :visible.sync="dialogFileVisible" :show-close="showList">
      <el-form :model="newGroupName"  ref="newGroupName">
        <el-form-item label="" label-width="20px" prop="name"
                      :rules="[{max:20, message: '分组名称应小于20个字符',required: true, trigger: 'blur'}]">
          <el-row :span="24" :gutter="32">
            <el-col :span="23" style="padding-left: 0">
              <el-input v-model="newGroupName.name" auto-complete="off" placeholder="请输入分组名" style="border-radius: 2px!important"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="addGroup" style="background: #40587a;border-color: #40587a;margin-right:13px">保　存</el-button>
      </div>
    </el-dialog>
    <!--移动文件分组弹框-->
    <el-dialog class="moveFileFrame" title="移至" :visible.sync="fileMoveFrame">
      <el-radio-group v-model="radio">
        <el-radio v-if="group.type_id!=1" class="groupRadio" v-for="group in groupList" :key="group.type_id" :label="group.type_id">{{group.type_name}}</el-radio>
      </el-radio-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="fileMoveFrame = false">取 消</el-button>
        <el-button type="primary" @click="fileMove">确 定</el-button>
      </div>
    </el-dialog>
    <!--重命名文件分组的弹窗-->
    <el-dialog title="重命名文件分组" :visible.sync="renameFrame" :show-close="showList">
      <el-form ref="renameFrame">
        <el-form-item label="分组名称" label-width="80px" prop="name">
          <el-row :span="24" :gutter="32">
            <el-col :span="18">
              <el-input v-model="exGroupName" auto-complete="off"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="renameCancel">取 消</el-button>
        <el-button type="primary" @click="renameCertain" style="background: #40587a;border-color: #40587a;">保　存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import threePoint from '../../../../static/images/threePoint.png';
  import renameIcon from '../../../../static/images/rename.png';
  import uploadIcon from '../../../../static/images/upload.png';
  import deleteIcon from '../../../../static/images/delete.png';
  import { error, success } from '@/utils/notification';
  import * as validata from '@/utils/validata';
  import { getTop } from '@/utils';
  export default {
    props: ['proid'],
    data () {
      return {
        // 图片资源
        user_id: localStorage.user_id,
        threePoint: threePoint,
        renameIcon: renameIcon,
        uploadIcon: uploadIcon,
        deleteIcon: deleteIcon,
        uploadAddress: this.URL.weitianshiLine + this.URL.projectUpload + localStorage.token, // 上传地址
        uploadAddressFile: this.URL.weitianshiLine + this.URL.uploadFile + localStorage.token, // 上传地址
        project_id: '',
        // 加载
        loading: false,
        // 分组列表
        groupList: [],
        // 被展开的分组
        activeNames: [],
        // 批量上传文件列表(组件处理)
        bpFileList: [],
        fileList: [],
        // 批量上传文件列表(自己处理)
        uploadList: [],
        // 上传文件展示列表,就是老夫操作的列表
        uploadShow2: {
          lists: [
            {
              bp_type: '1',
              file_title: '2',
              file_id: '3',
              type: '4'
            }
          ]
        },
        // 新建分组弹窗控制
        dialogFileVisible: false,
        // 新建分组弹窗是否显示关闭按钮
        showList: false,
        // 批量上传按钮禁用控制
        loadingcheck: false,
        // 新建分组弹框表单数据
        newGroupName: {
          name: ''
        },
        // 被点击的上传按钮所属分组
        typeId: 0,
        // 文件分组显示和隐藏
        fileMoveFrame: false,
        // 文件分组单选的值
        radio: 0,
        list: [],
        // 重命名弹框显隐
        renameFrame: false,
        exGroupName: ''
      };
    },
    methods: {
      // 重新获取分组列表信息
      initData (file) {
        // 获取分组列表
        this.$http.post(this.URL.getAllFileType, {
          user_id: localStorage.user_id
        }).then(res => {
          var groupList = res.data.data;
          // 获取分组列表内部文件数据
          this.$http.post(this.URL.getProjectFiles, {
            user_id: localStorage.user_id,
            project_id: this.project_id
          }).then(res => {
            // 把分组内的文件放到对应的分组内
            var groupWithFile = res.data.data;
            groupList.forEach(y => {
              groupWithFile.forEach(x => {
                if (y.type_id === x.type) {
                  y.file = x.file;
                  y.fileNum = x.count;
                }
              });
            });
            // 如果有值传进来
            if (file) {
              // 剔除掉已经上传成功的文件
              this.uploadList.forEach((x, index) => {
                if (x.name === file.name) {
                  this.uploadList.splice(index, 1);
                }
              });
            }
            // 将没有文件的分组设定默认值0
            groupList.forEach((x, index) => {
              if (!x.file) {
                x.file = [];
                x.fileNum = 0;
              }
              x.newFile = [];
              // 如果有值传进来,那么此次触发由上传成功触发
              if (file) {
                this.uploadList.forEach((y, index) => {
                  if (x.type_id === y.typeId) {
                    x.newFile.push(y);
                  }
                });
              }
            });
            this.groupList = groupList;
          });
        });
      },
      // 打开新建分组弹窗
      toGroup () {
        this.dialogFileVisible = true;
        this.newGroupName.name = '';
      },
      // 将所有分组名称放到一个数组里(辅助函数)
      getGroupName () {
        var allGroupName = [];
        this.groupList.forEach(x => {
          allGroupName.push(x.type_name);
        });
        return allGroupName;
      },
      // 新建分组--确定
      addGroup () {
        if (!validata.getNull(this.newGroupName.name)) {
          if (this.newGroupName.name.replace(/(^\s*)|(\s*$)/g, '').length > 20) {
            error('分组名称应小于20个字符');
          } else if (this.getGroupName().indexOf(this.newGroupName.name) === -1) {
            // 检查是否和已有分组重名,若全不重名则创建分组
            this.$http.post(this.URL.createFileType, {
              user_id: localStorage.user_id,
              type_name: this.newGroupName.name
            }).then(res => {
              if (res.data.status_code === 2000000) {
                success('新建文件分组成功');
                this.$refs['newGroupName'].resetFields();
                this.dialogFileVisible = false;
                this.initData();
              } else {
                error(res.data.error_msg);
              }
            });
          } else {
            error('已有相同命名的文件分组');
          }
        } else {
          error('请输入分组名称');
        }
      },
      // 新建分组--取消
      cancel () {
        this.$refs['newGroupName'].resetFields();
        this.dialogFileVisible = false;
      },
      // 获取当前按钮的typeId(辅助函数)
      getTypeId (typeId, type, groupName) {
        this.typeId = typeId;
        if (type === 1) {
          this.renameGroup(groupName);
        } else if (type === 3) {
          this.deleteGroup();
        }
      },
      // 重命名分组(打开弹框)
      renameGroup (groupName) {
        this.exGroupName = groupName;
        this.renameFrame = true;
      },
      // 重命名确定
      renameCertain () {
        this.exGroupName = validata.trim(this.exGroupName);
        if (this.exGroupName.length === 0) {
          error('请输入分组名称');
        } else if (this.exGroupName.length > 20) {
          error('分组名称长度应在小于20字符');
        } else {
          this.$http.post(this.URL.renameFileType, {
            user_id: localStorage.user_id,
            type_id: this.typeId,
            type_name: this.exGroupName
          }).then(res => {
            if (res.data.status_code === 2000000) {
              this.loading = false;
              this.$refs['renameFrame'].resetFields();
              this.renameFrame = false;
              success('分组重命名成功');
              this.initData();
            } else {
              error(res.data.error_msg);
            }
          });
        }
      },
      // 重命名取消
      renameCancel () {
        this.$refs['renameFrame'].resetFields();
        this.renameFrame = false;
      },
      // 删除分组
      deleteGroup () {
        this.$confirm('删除文件分组后,分组内文件也会相应删除.确定删除?', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(this.URL.deleteFileType, {
            user_id: localStorage.user_id,
            type_id: this.typeId,
            project_id: this.project_id
          }).then(res => {
            if (res.data.status_code === 2000000) {
              this.loading = false;
              success('删除成功');
              this.initData();
            } else {
              error(res.data.error_msg);
            }
          });
        });
      },
      // 上传文件上传之前的钩子函数(允许上传的文件格式不同)
      beforeUpload (file) {
        let filetypes = ['.pdf', '.ppt', '.pptx', '.doc', '.docx', '.rar', '.zip'];
        // 去除文件类型后缀
        let name = file.name;
        let fileend = name.substring(name.lastIndexOf('.')).toLowerCase();
        let isnext = false;
        // 文件格式和上传文件数量前端校验
        if (filetypes && filetypes.length > 0) {
          for (var i = 0; i < filetypes.length; i++) {
            if (filetypes[i] === fileend) {
              isnext = true;
              break;
            }
          }
        }
        this.loading = false;
        if (!isnext) {
          error('不支持的文件格式');
          return false;
        }
        if (parseInt(file.size) > parseInt(20971521)) {
          error('暂不支持超过20m文件上传哦');
          return false;
        };
        // 给上传文件加typeId属性标志其分组后存入uploadList
        file.typeId = this.typeId;
        this.uploadList.push(file);
        // 将上传文件放入相应数据的newFile属性中
        this.groupList.forEach(x => {
          if (x.type_id === this.typeId) {
            x.newFile.push(file);
          }
        });
      },
      beforeUpload2 (file) {
        let filetypes = ['.pdf', '.ppt', '.pptx', '.doc', '.docx', '.rar', '.zip', '.png', '.jpg', '.jpeg'];
        // 去除文件类型后缀
        let name = file.name;
        let fileend = name.substring(name.lastIndexOf('.')).toLowerCase();
        let isnext = false;
        // 文件格式和上传文件数量前端校验
        if (filetypes && filetypes.length > 0) {
          for (var i = 0; i < filetypes.length; i++) {
            if (filetypes[i] === fileend) {
              isnext = true;
              break;
            }
          }
        }
        this.loading = false;
        if (!isnext) {
          error('不支持的文件格式');
          return false;
        }
        if (parseInt(file.size) > parseInt(20971521)) {
          error('暂不支持超过20m文件上传哦');
          return false;
        };

        // 给上传文件加typeId属性标志其分组后存入uploadList
        file.typeId = this.typeId;
        this.uploadList.push(file);

        // 将上传文件放入相应数据的newFile属性中
        this.groupList.forEach(x => {
          if (x.type_id === this.typeId) {
            x.newFile.push(file);
          }
        });
      },
      // 当添加文件时,添加入上传列表
      handleChange (file, fileList) {
        this.loading = true;
        this.activeNames.push('1');
        if (this.loadingcheck) {
          this.loading = false;
          this.loadingcheck = false;
        }
      },
      // 文件上传中
      uploadProgress (event, file, fileList) {
        // 不知道为什么文件上传中的勾子函数内的console会触发两次,且event的值不同
      },
      // 上传文件成功
      uploadsuccess (response, file, fileList) {
        success('上传成功');
        this.loadingcheck = true;
        this.initData(file);
      },
      // 上传失败
      uploaderror (err, file, fileList) {
        console.log(err);
        error('上传失败,请联系管理员');
        this.loadingcheck = false;
        this.loading = false;
      },
      // 取消上传
      cancelUpload (typeName, file) {
        this.$refs[typeName][0].abort(file);
        this.initData(file);
      },
      // 获取fileId(辅助函数)
      getFileId (fileId, groupId, bp) {
        this.fileId = fileId;
        this.groupId = groupId;
        if (bp) {
          this.fileDeal(3);
        }
      },
      // 文件操作
      fileDeal (command) {
        // 删除文件
        if (parseInt(command) === 3) {
          this.$confirm('确定删除?', '删除', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.post(this.URL.deleteAtFile, {
              user_id: localStorage.user_id,
              file_id: this.fileId
            }).then(res => {
              if (res.data.status_code === 2000000) {
                this.loading = false;
                success('删除成功');
                this.initData();
              } else {
                error(res.data.error_msg);
              }
            });
          }).catch(() => {});
        }
        // 移动文件
        if (parseInt(command) === 2) {
          this.fileMoveFrame = true;
          this.radio = this.groupId;
        }
      },
      // 移动文件接口调用
      fileMove () {
        this.$http.post(this.URL.setFileType, {user_id: localStorage.user_id, file_id: this.fileId, type: this.radio}).then(res => {
          if (res.data.status_code === 2000000) {
            this.fileMoveFrame = false;
            success('移动文件成功');
            this.initData();
          } else {
            error(res.data.error_msy);
          }
        });
      },
      // 点击下载
      download (fileId) {
        const url = this.URL.weitianshi + this.URL.download + '?user_id=' + localStorage.user_id + '&file_id=' + fileId;
        window.open(url);
      },
      // 点击分组设置中的单选框
      groupchange (label) {
        let index = this.groups.index;
        let data = this.groups.group;
        for (let i = 0; i < data.length; i++) {
          if (data[i].value === label) {
            this.groups.name = data[i].label;
            this.uploadShow2.lists[index].type = label;
          }
        }
      },
      // 发送分组设置请求
      saveGroupChange () { // file_id type_id user_id
        let index = this.groups.index;
        let typeName = this.groups.name;
        this.$http.post(this.URL.setFileType, {
          user_id: localStorage.user_id,
          file_id: this.uploadShow2.lists[index].file_id,
          type: this.uploadShow2.lists[index].type
        })
          .then(res => {
            if (index !== -1) {
              this.uploadShow2.lists[index].bp_type = typeName;
              this.dialogFileVisible = false;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    created () {
      this.project_id = this.proid;
      getTop();
      this.initData();
    }
  };
</script>

<style lang="less">
  @import '../../../assets/css/fileManagement';
</style>

