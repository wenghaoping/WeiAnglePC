<template>
  <div class="components-container">
    <div>
      <tinymce :height='200' v-model="content"></tinymce>
    </div>
    <div class='editor-content' v-html='content'></div>

    <el-button @click="get">点击测试</el-button>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce';

export default {
  components: {
    Tinymce
  },
  data () {
    return {
      content: ''
    };
  },
  methods: {
    get () {
      localStorage.content = this.content;
      console.log(this.content);
    }
  },
  created () {
    this.content = localStorage.content || '';
  }
};
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>


