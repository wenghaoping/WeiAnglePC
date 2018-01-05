/**
 * Created by WengHaoping on 2017/7/3.
 */
this.$http.post(this.URL.getCrawlerBrand, {
  user_id: localStorage.user_id,
  com_id: this.comid
})
  .then(res => {
    let data = res.data.data;
    if (data.status_code === 2000000) {
      this.handleClose();
    } else {
      error(res.data.error_msg);
    }
  })
  .catch(err => {
    this.$tool.console(err);
  });// 请求函数

this.$router.push({name: 'projectDetails', query: {project_id: this.project_id}});// 路由传参
this.$route.query.project_id;
// state.show?false:true;

function add () {
  var getOneUserInfo = new Promise((resolve, reject) => {
    // 做一些异步操作
    resolve(1);
  });
  return getOneUserInfo;
}

add()
.then((data) => {
  return this.getWxProjectCategory();
});

window.addEventListener('scroll', () => {
  var sh = document.documentElement.scrollHeight || document.body.scrollHeight;
  var ch = window.innerHeight || document.documentElement.clientHeight;
  var t = document.documentElement.scrollTop || document.body.scrollTop;
  if (sh > ch && t >= ch) {
    this.isHidden = false;
  } else {
    this.isHidden = true;
  }
});
/* ================输入框================ */
// <el-input v-model="input" placeholder="请输入内容"></el-input>

/* ================浮层================ */

/* <el-dialog
title="提示"
:visible.sync="dialogVisible"
size="tiny"
:before-close="handleClose">
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
  <el-button @click="dialogVisible = false">取 消</el-button>
<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
</span>
</el-dialog> */

/* ================加载动画================ */

// v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中"
