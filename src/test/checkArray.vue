<template>
  <div id="check">
    <el-form ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="年龄"
                    v-for="(ruleForm, index) in ruleForm2"
                    :rules="age"
                    :key="ruleForm.key"
                    :prop="'ruleForm.' + index + '.age1'">
        <el-input v-model.number="ruleForm.age1"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
        <el-button @click="add">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data () {
      var checkAge = (rule, value, callback) => {
        console.log(value, 1);
        console.log(rule, 2);
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          console.log('判断啦');
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 100);
      };
      return {
        ruleForm2: [{
          age1: ''
        }],
        age: [
          { validator: checkAge, trigger: 'blur' }
        ]
      };
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
      },
      add () {
        this.ruleForm2.push({age1: ''});
      }
    }
  };
</script>

<style lang="less">

</style>
