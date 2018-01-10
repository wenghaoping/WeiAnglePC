<template>
  <div>
    <el-tabs v-model="conmanyName">
      <el-tab-pane label="公司信息" name="1">
        <div class="block" style="display: block">
          <el-row :span="24">
            <el-col :span="4"><div class="content left">公司名称</div></el-col>
            <el-col :span="20"><div class="content" style="padding-left: 12px;margin-right: -8px;">{{company.company_name}}</div></el-col>
          </el-row>
          <el-row :span="24">
            <el-col :span="4"><div class="content left">公司地址</div></el-col>
            <el-col :span="20"><div class="content" style="padding-left: 12px;margin-right: -8px;">{{company.company_address}}</div></el-col>
          </el-row>
          <el-row :span="24">
            <el-col :span="4"><div class="content left">成立日期</div></el-col>
            <el-col :span="8"><div class="content right">{{company.company_register_date | timeToReallTime}}</div></el-col>
            <el-col :span="4"><div class="content left">公司规模</div></el-col>
            <el-col :span="8"><div class="content right">{{company.company_team_size}}</div></el-col>
          </el-row>
          <el-row :span="24">
            <el-col :span="4"><div class="content left" style="border-bottom:1px solid #e0e6ed;">邮箱地址</div></el-col>
            <el-col :span="8"><div class="content right" style="border-bottom:1px solid #e0e6ed;">{{company.company_email}}</div></el-col>
            <el-col :span="4"><div class="content left" style="border-bottom:1px solid #e0e6ed;">联系电话</div></el-col>
            <el-col :span="8"><div class="content right" style="border-bottom:1px solid #e0e6ed;">{{company.company_contact}}</div></el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="productMessage" name="2">
        <div class="block"  style="display: block">
          <div class="inner fl" v-for="project in company.company_project">
            <div class="img fl"><img src="../../../assets/images/logo.png"/></div>
            <p class="type fl" style="margin-bottom: 7px;">{{project.company_project_name}}<span>{{project.company_project_type}}</span></p>
            <p class="sec">{{project.company_project_introduce}}</p>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['compName', 'comMessage'],
    data () {
      return {
        compaName: '', // 搜索用的公司名称
        conmanyName: '1',
        productMessage: '产品信息',
        recruitMessage: '招聘信息(29)',
        recruitData: [{
          position: 'JAVA',
          money: '20-30K',
          experience: '1-2年',
          address: '北京',
          date: '2016-05-04'
        }, {
          position: 'IOS',
          money: '1-2K',
          experience: '1年',
          address: '北京',
          date: '2016-05-04'
        }],
        /* 公司信息 */
        company: {
          com_id: 4,
          company_name: '', // 公司名称杭州投着乐网络科技有限公司
          company_type: '', // 企业类型企业类型：有限责任公司(自然人投资或控股)
          company_registered_capital: '', // 注册资本ff
          company_operating_state: '暂无信息', // 经营状态ss
          company_business_number: '', // 工商注册号123
          company_legal_representative: '', // 法定代表人jdjjf
          company_address: '', // 公司地址浙江省杭州市西湖区文三路90号东部软件园一楼之韵社
          company_empirical_range: '', // 科技推广和应用服务业
          company_register_date: '', // 成立日期2014-03-23
          company_organization_code: '', // 统一社会信用代码111
          company_contact: '', // 联系方式0571-86427664
          company_email: '', // 邮箱地址HR@weitianshi.cn
          company_unified_code: '', // 统一社会信用代码111
          company_register_office: '', // 登记机关111
          team_now_size: '', // 团队规模500-2000人
          company_business_term: '', // 营业期限111
          company_project: [
            /*            {
             project_id: 1,
             company_project_name: "滴滴出行",
             company_project_introduce: "近3亿用户的选择】，2012年诞生的滴滴现已成为广受用户近3亿用户的选择】，2012年诞生的滴...",
             company_project_type: "IOS",
             com_id: 4
             } */
          ]
        }
      };
    },
    methods: {
      // 获取公司信息
      getCrawlerCompany () {
        let data = this.comMessage || {};
        this.company = data.company;
        this.company.company_project = data.project_product;
        this.productMessage = '产品信息' + '(' + data.project_product.length + ')';
      }
    },
    watch: {
      comMessage: function (e) {
        this.getCrawlerCompany();
      }// 获取公司名称
    }

  };
</script>
