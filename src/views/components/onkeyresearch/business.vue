<template>
  <div>
    <el-tabs v-model="bussinessName">
      <el-tab-pane label="工商信息" name="1" style="margin-top: -30px;">
        <div class="block"  style="display: block">
          <div class="rz-details" style="width: 795px;">
            <div class="rz-detail">
              <p class="det-title">法定代表人</p>
              <p class="det-info">{{business.company.company_legal_representative}}</p>
            </div>
            <div class="rz-detail">
              <p class="det-title">注册资本</p>
              <p class="det-info">{{business.company.company_registered_capital}}</p>
            </div>
            <div class="rz-detail">
              <p class="det-title">经营状态</p>
              <p class="det-info">{{business.company.company_operating_state}}</p>
            </div>
          </div>
        </div>
        <div class="block"  style="display: block">
          <el-row :span="24">
            <el-col :span="4"><div class="content left">企业类型</div></el-col>
            <el-col :span="8"><div class="content right">{{business.company.company_type}}</div></el-col>
            <el-col :span="4"><div class="content left">统一社会信用代码</div></el-col>
            <el-col :span="8"><div class="content right">{{business.company.company_unified_code}}</div></el-col>
          </el-row>
          <el-row :span="24">
            <el-col :span="4"><div class="content left">工商注册号</div></el-col>
            <el-col :span="8"><div class="content right">{{business.company.company_business_number}}</div></el-col>
            <el-col :span="4"><div class="content left">组织机构代码</div></el-col>
            <el-col :span="8"><div class="content right">{{business.company.company_organization_code}}</div></el-col>
          </el-row>
          <el-row :span="24">
            <el-col :span="4"><div class="content left">营业期限</div></el-col>
            <el-col :span="8"><div class="content right">{{business.company.company_business_term}}</div></el-col>
            <el-col :span="4"><div class="content left">登记机关</div></el-col>
            <el-col :span="8"><div class="content right">{{business.company.company_register_office}}</div></el-col>
          </el-row>
          <el-row :span="24">
            <el-col :span="4"><div class="left hei">经营范围</div></el-col>
            <el-col :span="20"><div class="hei2" style="padding: 14px 12px 12px 15px;border:1px solid #e0e6ed;margin-right: -8px;background: #ffffff">{{business.company.company_empirical_range}}</div></el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="工商变更" name="2">
        <div class="bloack change" style="display: block">
          <el-table
            :data="business.company_change"
            border
            style="width: 100%">
            <el-table-column
              prop="company_change_time"
              label="时间"
              width="150">
            </el-table-column>
            <el-table-column
              prop="company_change_matter"
              label="事项"
              width="150">
            </el-table-column>
            <el-table-column
              prop="company_change_before"
              label="变更前"
            >
            </el-table-column>
            <el-table-column
              prop="company_change_after"
              label="变更后"
            >
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <!--知识产权-商标信息-->
      <el-tab-pane :label="trademarkMessage" name="3">
        <div class="block" style="display: block">
          <el-table
            :data="business.brand"
            border
            style="width: 100%">
            <el-table-column
              prop="company_brand_time"
              label="时间"
              width="150">
            </el-table-column>
            <el-table-column
              prop="company_brand_name"
              label="商标名称"
              width="260">
            </el-table-column>
            <el-table-column
              prop="company_brand_status"
              label="状态"
            >
            </el-table-column>
            <el-table-column
              prop="company_brand_type"
              label="类型"
            >
            </el-table-column>
            <el-table-column
              prop="company_brand_registration_number"
              label="注册号">
            </el-table-column>
          </el-table>

        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script type="text/ecmascript-6">
  import { setTime } from '@/utils/formatData';
  export default {
    props: ['comid', 'busData'],
    data () {
      return {
        bussinessName: '1',
        trademarkMessage: '商标信息',
        patentMessage: '专利信息(12)',
        patentData: [{
          name: '暂无信息',
          publishNubmer: '暂无信息',
          publishdate: '暂无信息',
          applyNumber: '暂无信息',
          classify: '暂无信息'
        }],
        business: {
          // 工商信息
          company: {
            com_id: 4,
            company_name: '暂无信息', // 公司名称
            company_type: '暂无信息', // 企业类型
            company_registered_capital: '暂无信息', // 注册资本
            company_operating_state: '暂无信息', // 经营状态
            company_business_number: '暂无信息', // 工商注册号
            company_legal_representative: '暂无信息', // 法定代表人
            company_address: '暂无信息', // 公司地址
            company_empirical_range: '暂无信息', // 经营范围
            company_register_date: '暂无信息', // 成立日期
            company_organization_code: '暂无信息', // 统一社会信用代码
            company_contact: '暂无信息', // 联系方式
            company_email: '暂无信息', // 邮箱地址
            company_unified_code: '暂无信息', // 统一社会信用代码
            company_register_office: '暂无信息', // 登记机关
            team_now_size: '暂无信息', // 团队规模
            company_business_term: '暂无信息' // 营业期限
          },
          // 商标信息
          brand: [{
            com_id: 4,
            company_brand_type: '20',
            company_brand_registration_number: '0',
            company_brand_status: '暂无信息',
            company_brand_name: '暂无信息',
            company_brand_time: '暂无信息'
          }],
          // 工商变更
          company_change: [{
            com_id: 4,
            company_change_time: '', // 2015-08-17
            company_change_matter: '', // 认缴的出资额、认缴的出资方式、认缴的出资时间、实缴的出资额、实缴的出资方式、实缴的出资时间、投资人
            company_change_before: '', // 技术开发、技术咨询、技术服务、技术推广；基础软件服务；应用软件服务。（未取得行政许可的项目除外）
            company_change_after: ''// 技术开发、技术咨询、技术服务、
          }]
        }
      };
    },
    methods: {
      // 获取商标信息
      getCrawlerBrand () {
        let data = this.busData || {};
        setTime(data.company_change, 'company_change_time');
        setTime(data.brand, 'company_brand_time');
        this.business = data;
        this.trademarkMessage = '知识产权-商标信息' + '(' + data.brand.length + ')';
      }
    },
    watch: {
      // 获取公司id
      busData: function () {
        this.getCrawlerBrand();
      }
    }
  };
</script>

<style lang="less" scoped>
  .mark{
    position: absolute;
    left: 191px;
    top: -14px;
    width: 8px;
    height: 8px;
    z-index: 1000;
    img{
      width: 100%;
    }
  }
  .change{
    .cell{
      margin:16px 0 19px;
      vertical-align: super;
    }
    .is-leaf{
      .cell{
        margin:0px;
      }
    }
  }
  .patent{
    .cell{
      font-size:12px;
      color:#1f2d3d;
    }
  }
</style>
