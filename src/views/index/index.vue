<template>
  <div id="index">
    <div class="banner">
      <div style="z-index:99;display:inline-block;border-radius: 2px" class="showQr button opactButton" @click="showS">体验小程序</div>
      <el-button style="z-index:99;border-radius: 2px" class="button" type="primary" @click="createProject">创建项目</el-button>
      <div class="qrShow" v-show="showQr">
        <img src="../../assets/images/weixin.jpg"/>
      </div>
    </div>
    <h1 style="background: white">如果你是</h1>
    <div style="background: white;">
      <div class="content flex content0 tc" >
        <div class="indentityPic">
          <img src='../../assets/images/maifangFA.png'/>
          <div>卖方FA</div>
          <div>项目精准推荐</div>
          <div>微天使一手案源</div>
          <div>大数据一键尽调</div>
        </div>
        <div class="indentityPic">
          <img src='../../assets/images/maifangFA.png'/>
          <div>买方FA</div>
          <div>推荐精准匹配投资人</div>
          <div>项目一键推送</div>
          <div>微天使一手案源</div>
          <div>大数据一键尽调</div>
        </div>
        <div class="indentityPic">
          <img src='../../assets/images/touzifang.png'/>
          <div>投资方</div>
          <div>FA精选项目</div>
          <div>项目管理</div>
          <div>大数据一键尽调</div>
        </div>
        <div class="indentityPic">
          <img src='../../assets/images/chuangyezhe.png'/>
          <div>创业者</div>
          <div>融资加速</div>
          <div>优质FA组团服务</div>
        </div>
      </div>
    </div>
    <h1>我们能提供</h1>
    <div class="content flex content1">
      <div class="fullPageText fullPageText1">
        <div>投资业务工作场景--团队/个人工作</div>
        <div>项目、人脉数据永久留存,人员流动带不走</div>
        <div>新签署的项目有哪些机构可能感兴趣</div>
        <div>哪些项目最近签署了FA协议?哪些投资机构进入了DD阶段?</div>
        <div>进入工作站,一目了然</div>
      </div>
      <div class="fullPagePic fullPagePic1">
        <img src='../../assets/images/index1.jpg'/>
      </div>
    </div>
    <div class="content flex content2">
      <div class="fullPagePic fullPagePic2">
        <img src='../../assets/images/index2.jpg'/>
      </div>
      <div class="fullPageText fullPageText2">
        <div>精准匹配投资场景--买家图谱</div>
        <div>新签约的FA项目,有哪些投资机构在关注</div>
        <div>全网2000+投资人根据投资领域、阶段、地域自动地计算匹配度</div>
        <div>交易机会一目了然,一键触达</div>
      </div>
    </div>
    <div class="content flex content3">
      <div class="fullPageText fullPageText3">
        <div>尽职调查、项目跟踪场景--一键尽调</div>
        <div>从VC投资角度,整合全网数据</div>
        <div>工商、产品、团队、舆情、融资历史</div>
        <div>等多维度一键即得，辅助项目判断</div>
      </div>
      <div class="fullPagePic fullPagePic3">
        <img src='../../assets/images/index3.jpg'/>
      </div>
    </div>
    <!--<div style="height: 300px;background:#f9fafc"></div>-->
    <div class="megagame">
      <span style="font-size:14px;color:#475669; line-height:14px;display: inline-block;margin-top: 8px;">微天使数据支持：</span><br>
      <a target="_blank" href="http://cqc.casicloud.com/youthCmpe/common/home.do" style="width: 200px;"><span style="font-size:14px;
color:#40587a;
letter-spacing:0;">团中央·青年APP大赛</span></a>
    </div>
    <div class="megagame megagame11" style="top: 43%;">
      <span style="font-size:14px;color:#475669; line-height:14px;display: inline-block;margin-top: 8px;">第三届“创青春”</span><br>
      <span style="font-size:14px;color:#40587a;letter-spacing:3px;">100强项目展示</span>
    </div>
    <div class="er-box">
      <img src="../../assets/images/xiangmuzhanshi.png" alt="">
    </div>
    <div class="qrCode">
      <img src='../../assets/images/indexQr.png'/>
    </div>
    <div class="qrCode-large tc">
      <img src="../../assets/images/index-qr.png">
      <div class="add2">添加FA哥微信了解更多</div>
    </div>
    <!--底部-->
    <div class="Infooter tc">
      <p style="height: 20px;line-height: 20px;"><span style="cursor: pointer" @click="aboutUs">关于我们</span>
        | <i @click="aboutUs" style="cursor: pointer">联系我们</i></p>
      <div style="width:525px;margin:0 auto;vertical-align: middle;height: 20px;">
        <img class="fl" src="../../../src/assets/images/beian.png">
        <a class="fl" target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010602008444" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img src="" style="float:left;"/><p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">浙公网安备 33010602008444号</p></a>
        <span style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;"> © 杭州投着乐网络科技有限公司<a href="http://www.miitbeian.gov.cn" style="color:rgb(147, 147, 147)" target="_blank" >浙ICP备16041047号-1</a></span>
      </div>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        // 控制二维码显示
        showQr: false
      };
    },
    methods: {
      // 创建项目
      createProject () {
        this.zgClick('创建项目');
        localStorage.entrance = 'creatproject';
        if (localStorage.user_id) {
          this.$router.push({name: 'creatproject'});
        } else {
          this.$router.push({name: 'telephoneLogin'});
        }
      },
      // 鼠标到体验小程序上悬浮触发二维码显示
      showS () {
        this.showQr = !this.showQr;
        this.zgClick('体验小程序');
      },
      // 关于我们
      aboutUs () {
        this.$router.push('/aboutUs');
      }
    }
  };
</script>

<style scoped lang="less">
  @import '../../assets/css/index.less';
</style>
