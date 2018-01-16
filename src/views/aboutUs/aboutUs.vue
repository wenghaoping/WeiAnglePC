<template>
  <div class="content">
    <div class="content1">
      <h1 style="margin-top:66px;font-size:40px;color:#1f2d3d;letter-spacing:0;">关于微天使</h1>
      <div style="margin-top: 26px;font-size:24px;color:#333333;letter-spacing:0;">FA的智能工作站</div>
      <div class="abstract">
        <div class="line"></div>
        <h3 class="abstract1">简介</h3>
      </div>
      <div class="info1">杭州投着乐网络科技有限公司成立于2016年9月，同年全资收购天津微天使网络科技有限公司及旗下微天使APP产品及相关品牌（微天使网、中国微天使节、微天使投资俱乐部、社群号等），并将互联网化FA平台（创投数据平台）作为公司核心业务（智能投顾方向）。</div>
      <div class="info1 info2"> 微天使APP是一款针对财务顾问（FA）、投资经理、准天使投资人、创业服务机构（保荐方）的创投数据工具型应用，是一个创业投资的数据服务平台：通过辑、共享、授权等方式获取各种早期创投数据；经过人工众包分析及修正、大数据分析和机器学习等技术实现数据的深度挖掘，为投资人、投资机构等提供投资决策参考的综合数据服务；从而搭建一个高效的早期投资数据服务工具平台，并逐渐建立切入到投资交易的服务及与平台的关系。</div>
      <div class="info1 info2"> 微天使致力于搭建快速高效的融资交易生态，已经举办过中国微天使节并聚合微天使投资人，正在发起中国FA行业联盟，聚合一线专业FA，加速优质项目融资。</div>
      <div class="info1 info2">公司筹建初期已得到同道会创始人陈良红百万级种子轮投资，并得到东部资本的数百万级天使轮战略投资。
        创始团队具有资深的行业从业经历，行业资源丰富。</div>
      <div class="abstract" style="margin-top:53px ">
        <div class="line"></div>
        <h3 class="abstract1">产品介绍</h3>
      </div>
      <div class="recommend_left">
       <div class="recommend1">
         <div class="recommend11">网站：www.weitianshi.cn</div>
         <div class="recommend11">小程序：微天使乐投平台
          &nbsp; <span style="color:#e6e0ed ">|</span>&nbsp;
           绿茶妹</div>
         <div class="recommend11">微信公众号：微天使乐投平台  &nbsp; <span style="color:#e6e0ed ">|</span>&nbsp;&nbsp;&nbsp;FA社群</div>
         <div class="recommend11">APP：IOS  &nbsp; <span style="color:#e6e0ed ">|</span>&nbsp;&nbsp;&nbsp;Android（开发中）</div>
       </div>
        <div class="recommend2">
          <div class="recommend22">
            <img class="recommend2_Xiaochengxu" src="../../../static/images/img-iOS.png">
            <div class="recommend2_name">IOS下载</div>
          </div>
          <div class="recommend22" style="margin-right: 16px">
            <img class="recommend2_Xiaochengxu" src="../../../static/images/xiaochengxu.png">
            <div class="recommend2_name">小程序体验</div>
          </div>
        </div>
      </div>
      <div class="abstract" style="margin-top:107px">
        <div class="line"></div>
        <h3 class="abstract1">联系我们</h3>
      </div>
      <div class="recommend_left" style="height: 200px;margin-bottom: 150px">
        <div class="recommend1">
          <div class="recommend11"><img  src="../../../static/images/icon-dianhua.png" class="contact_img"><span>&nbsp;&nbsp;0571-85026758</span></div>
          <div class="recommend11"> <img src="../../../static/images/icon-youxiang.png" class="contact_img">
          <span>&nbsp;&nbsp;fa@weitian.cn</span></div>
          <div class="recommend11"> <img src="../../../static/images/icon-dizhi.png" class="contact_img">
            <span>&nbsp;&nbsp;杭州市文三路90号东部软件园8号楼1楼智云社</span></div>
        </div>
        <div class="recommend2" style="height: 100px;margin-top: 0">
          <div class="recommend22">
            <img class="recommend2_Xiaochengxu" src="../../../static/images/img-weixin.png">
            <div class="recommend2_name">weitianshi.cn</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
  .contact_img{
    width:16px;
  }
.content{
  width:100%;
  .content1{
    width:80%;
    margin: 0 auto;
    text-align: center;
    .abstract{
      width:61%;
      height:31px;
      margin:0 auto;
      margin-top: 41px;
      .line{
        background:#40587a;
        width:4px;
        height:22px;
        float: left;
        margin-top: 6px;
      }
      .abstract1{
        font-size:24px;
        color:#333333;
        letter-spacing:0;
        float: left;
        margin-left: 12px;
      }

    }
    .info1{
      width: 61%;
      margin: 0 auto;
      font-size:16px;
      color:#5e6d82;
      letter-spacing:0;
      line-height:30px;
      text-align: left;
      margin-top: 16px;
    }
    .info2{
      margin-top: 20px;
    }
    .recommend_left{
      width:61%;
      height:150px;
      margin:0 auto;
      .recommend1{
        width:60%;
        margin-top: 25px;
        float: left;
        text-align: left;
        .recommend11{
          margin-top: 12px;
          font-size:16px;
          color:#5e6d82;
          letter-spacing:0;
        }
      }
      .recommend2{
        width:40%;
        height:150px;
        float: right;
        margin-top: 35px;
        .recommend22{
          width:89px;
          float: right;
          height:118px;
          .recommend2_Xiaochengxu{
            width:88px;
            height:88px;
            background: red;
          }
          .recommend2_name{
            font-size:12px;
            color:#8492a6;
            letter-spacing:0;
            margin-top: 6px;
            /*float: left;*/
            text-align: center;
          }
        }
      }
    }
    .contact1{
      width:61%;
      height:150px;
      margin:0 auto;
      margin-top: 21px;
      .contact11{
        width:33%;
        float: left;
        text-align: left;
        margin-top: 11px;
        img{
          width:18px;
          float: left;
          margin-top: 2px;
          margin-right: 4px;
        }
        span{
          font-size:16px;
          color:#5e6d82;
          letter-spacing:0;
        }
      }
    }
  }
}
</style>
