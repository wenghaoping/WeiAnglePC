<template>
  <!--赛事详情-->
  <div class="matchDetail" v-loading.fullscreen="loading" element-loading-text="拼命加载中">
    <div class="main">
      <div class="main_top clearfix">
        <div class="top_left fl" v-if="competition.has_one_theme_image === ''">
          <img src="../../../assets/images/morenIMG.png"/>
        </div>
        <div class="top_left fl" v-else>
          <img :src="competition.has_one_theme_image.image_src"/>
        </div>
        <div class="top_right fl">
          <div class="right_title">
            {{competition.competition_name}}
          </div>
          <div class="title_main">领域：{{competition.morph_industry === '' ? '暂未编辑' : competition.morph_industry}}</div>
          <div class="title_main">主办方：{{competition.competition_user === '' ? '暂未编辑' : competition.competition_user}}</div>
          <div class="title_main">时间：{{competition.start_time | timeToReallTimeAll}} ~ {{competition.end_time | timeToReallTimeAll}}</div>
          <div class="title_main">地点：{{competition.competition_address === '' ? '暂未编辑' : competition.competition_address}}</div>
        </div>
      </div>
        <div class="main_center" v-if="competition.has_many_details !== 0">
          <div class="center_title">详情</div>
          <div class="main_for" v-for="(has_many_detail, index) in competition.has_many_details" :key="index">
            <div class="center_main">
              {{has_many_detail.detail_description}}
            </div>
            <div class="main_bottom" v-for="(many_detail, item) in has_many_detail.belongs_to_many_images" :key="item">
              <img :src="many_detail.image_src"/>
            </div>
          </div>
        </div>
      <div class="fixed_button tc cursor" @click="handleEdit">
        编辑
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
  import { error } from '@/utils/notification';
  import { setTagToString } from '@/utils/formatData';
  export default {
    props: {},
    data () {
      return {
        loading: false,
        competition_id: '',
        competition: {
          competition_id: '', // 活动主键
          competition_name: '', // 活动标题
          competition_user: '', // 主办方
          competition_address: '', // 详细地址
          competition_area: '', // 地区
          competition_city: '', // 城市
          competition_province: '', // 省份
          // 活动封面图片id
          has_one_theme_image: {
            image_id: '',
            image_src: ''
          },
          // 修改的封面图片数据
          has_one_theme_image_url: [
//              {
//            image_id: '',
//            url: ''
//          }
          ],
          start_time: '', // 活动开始时间
          end_time: '', // 活动结束时间
          has_many_details: [
            {
              detail_description: '',
              belongs_to_many_images: [
//                {
//                  image_id: 5412,
//                  image_uid: 182190,
//                  image_src: 'http://cdn.weitianshi.cn/test_file/20171128/Zo8oCgCILYifRBP5RlOY1821905a1cd41de7212.jpg'
//                }
              ],
              belongs_to_many_images_url: [
//                {
//                  image_id: 5412,
//                  url: 'http://cdn.weitianshi.cn/test_file/20171128/Zo8oCgCILYifRBP5RlOY1821905a1cd41de7212.jpg'
//                }
              ]
            }
          ]
        }
      };
    },
    methods: {
      // 获取id
      getCompetitionId () {
        this.competition_id = this.$route.query.competition_id;
      },
      // 获取详情
      getOneCompetition () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          if (this.competition_id !== 'creat') {
            this.$http.post(this.URL.getOneCompetition, {user_id: localStorage.user_id, competition_id: this.competition_id})
              .then(res => {
                if (res.data.status_code === 2000000) {
                  let data = res.data.data;
                  this.competition = data;
                  this.competition.morph_industry = setTagToString(this.competition.morph_industry, 'industry_name');
                  this.$store.dispatch('getMatchDetail', data);
                  this.loading = false;
                } else {
                  error(res.data.error_msg);
                }
              })
              .catch(err => {
                this.loading = false;
                console.log(err);
              });
          }
          resolve(1);
        });
      },
      // 点击编辑按钮,跳转
      handleEdit () {
        this.$router.push({name: 'creatMatch', query: {competition_id: this.competition_id}});
      }
    },
    computed: {
      ...mapState({
        matchData: state => state.myActivity.matchData || {}
      }),
      hasManyDetailsLength () {
        let data = this.competition.has_many_details;
        let check = false;
        data.forEach((item) => {
          if (item.detail_description !== '' || item.belongs_to_many_images.length !== 0) {
            check = true;
          } else {
            check = false;
          }
        });
        return check;
      }
    },
    created () {
      this.getCompetitionId();
      this.getOneCompetition();
    }
  };
</script>

<style lang="less" scoped>
.matchDetail{
  .main{
    padding: 24px;
  }
  .main_top{
    .top_left{
      width: 300px;
      height: 222px;
      margin-right: 24px;
      img{
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
    .top_right{
      width: 556px;
      .right_title{
        font-size: 22px;
        color: #1F2D3D;
        margin-bottom: 48px;
        height: 64px;
      }
      .title_main{
        line-height: 30px;
        font-size: 15px;
        color: #475669;
      }
    }
  }
  .main_center{
    width: 880px;
    margin-bottom: 24px;
    .center_title{
      font-size: 20px;
      color: #1F2D3D;
      line-height: 70px;
    }
    .center_main{
      line-height: 30px;
      font-size: 15px;
      color: #5E6D82;
    }
  }
  .main_bottom{
    width: 880px;
    height: 513px;
    margin-bottom: 35px;
    margin-top: 24px;
    img{
      max-width: 880px;
      height: 100%;
      border-radius: 4px;
    }
  }
  .fixed_button{
    width: 252.5px;
    height: 60px;
    background: #E8F5FF;
    border: 1px solid #BFE4FF;
    border-radius: 2px;
    line-height: 60px;
    font-size: 20px;
    color: #009EFF;
    position: absolute;
    right: 70px;
    top: 27px;
  }
}
</style>
