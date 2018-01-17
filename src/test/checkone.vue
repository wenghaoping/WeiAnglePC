<template>
<!--  <div id="check">
    <draggable v-model="tags" :move="getdata" @update="datadragEnd">
      <transition-group>
        <div v-for="element in tags" :key="element.id" class="tab">
          {{element.name}}
        </div>
      </transition-group>
    </draggable>
    <card-upload :uploadCardAddress="uploadCardAddress" :uploadDate="uploadDate"
                 @delete="remove" @success="success">
    </card-upload>

    <carousel></carousel>-->
<!--  <div style="height: 300px;">
    <radar height='100%' width='100%' :indicator="indicator" :innerValue="innerValue"></radar>
  </div>-->

  <!--</div>-->
<!--<single-upload :uploadAddress="uploadAddress" :uploadDate="uploadDate"
               :planList="planList"
  @delete="planRemove" @planuploadsuccess="planuploadsuccess"></single-upload>-->

<div>
  <!--<img src="data:image/png;base64,/9j/">-->
  <bp-preview></bp-preview>

  <move-dialog ref="moveDialog">
    <div class="height" style="margin-top:49px;">
      <span class="mid-tag2">杭州</span>
      <span class="mid-tag2 active-tag">北京</span>
    </div>
    <div class="height" style="margin-top:14px;">
      <span class="big-tag active-tag2"> 123</span>
      <span class="split">｜</span>
      <span class="big-tag">123</span>
      <span class="split">｜</span>
      <span class="big-tag">123</span>
      <span class="split">｜</span>
      <span class="big-tag">123</span>
    </div>
  </move-dialog>
  <recommend :recommendDisplay="recommendDisplay"></recommend>

  <card-more-upload :uploadMoreCardAddress="uploadCardAddress" :uploadDate="uploadDate"
                    :planList="planList"
                    @delete="planRemove" @planuploadsuccess="planuploadsuccess">
  </card-more-upload>
</div>


</template>

<script>
  import draggable from 'vuedraggable';
  import cardUpload from '@/components/upload/cardUpload.vue';
  import cardMoreUpload from '@/components/upload/cardMoreUpload.vue';
  import singleUpload from '@/components/upload/singleUpload.vue';
  import radar from '@/components/Charts/radar.vue';
  import moveDialog from '@/components/moveDialog/moveDialog.vue';
  import carousel from '@/views/components/carousel.vue';
  import bpPreview from '@/views/components/superBp/bpPreview.vue';
  import recommend from '@/views/components/recommend.vue';
  export default {
    data () {
      return {
        tags: [
          {id: 0, name: '1'},
          {id: 1, name: '2'},
          {id: 2, name: '3'},
          {id: 3, name: '4'},
          {id: 4, name: '5'}
        ],
        uploadCardAddress: this.URL.weitianshiLine + this.URL.uploadConnectCard + localStorage.token,
        uploadAddress: this.URL.weitianshiLine + this.URL.projectUpload + localStorage.token, // 上传地址
        uploadDate: {user_id: localStorage.user_id},
        recommendDisplay: true,
        indicator: [
          {name: '竞争力', max: 100},
          {name: '商业前景', max: 100},
          {name: '发展战略', max: 100}
        ],
        innerValue: [50, 60, 32],
        planList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
      };
    },
    methods: {
      getdata (evt) {
        console.log(evt.draggedContext.element.id);
      },
      datadragEnd (evt) {
        console.log('拖动前的索引 :' + evt.oldIndex);
        console.log('拖动后的索引 :' + evt.newIndex);
        console.log(this.tags);
      },
      remove (e) {
        console.log(e);
      },
      success (e) {
        console.log(e);
      },
      planuploadsuccess (e) {
        console.log(e);
      },
      planRemove (e) {
        console.log(e);
      },
      doMouseMove (e) {
        this.$refs.moveDialog.doMouseMove(e);
      }
    },
    mounted () {},
    components: {
      draggable,
      cardUpload,
      carousel,
      radar,
      singleUpload,
      bpPreview,
      moveDialog,
      recommend,
      cardMoreUpload
    },
    watch: {
      '$route' (to, from) {

      }
    }
  };
</script>

<style lang="less" scoped>
.tab{
  width: 100px;
  height: 50px;
  background: red;
  margin-bottom: 10px;
}

</style>
