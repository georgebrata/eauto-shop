<template>
  <section class="page-module">
    <div class="module-header">
      <h3>Suggest an electric car</h3>
    </div>
    <div class="module-content">
      <div class="panel panel-default">
        <div class="panel-body">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="20vw">
            <!--
            <div class="form-group col-sm-6">
              <el-form-item label="Time" prop="time">
                <span>{{ new Date() | dateTimeConvert }}</span>
              </el-form-item>
            </div>
            -->
            <el-row :gutter="10">
              <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple"></div></el-col>
            </el-row>

            <div class="form-group col-xl-6 col-sm-12">
              <el-form-item label="Make" prop="make">
                <el-input v-model="ruleForm.make"></el-input>
              </el-form-item>
            </div>

            <div class="form-group col-sm-6">
              <el-form-item label="Model" prop="model">
                <el-input v-model="ruleForm.make"></el-input>
              </el-form-item>
            </div>


            <div class="form-group col-sm-6">
              <el-form-item label="活动区域" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </div>

            <div class="form-group col-sm-6">
              <el-form-item label="活动时间" required>
                <el-col :span="11">
                  <el-form-item prop="date1">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
            </div>

            <div class="form-group col-sm-6">
              <el-form-item label="Automatic transmission" prop="transmission">
                <el-switch on-text="" off-text="" v-model="ruleForm.delivery"></el-switch>
              </el-form-item>
            </div>

            <div class="form-group col-sm-6">
              <el-form-item label="活动性质" prop="type">
                <el-checkbox-group v-model="ruleForm.type">
                  <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                  <el-checkbox label="地推活动" name="type"></el-checkbox>
                  <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                  <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>

            <div class="form-group col-sm-6">
              <el-form-item label="特殊资源" prop="resource">
                <el-radio-group v-model="ruleForm.resource">
                  <el-radio label="线上品牌商赞助"></el-radio>
                  <el-radio label="线下场地免费"></el-radio>
                </el-radio-group>
              </el-form-item>
            </div>

            <div class="form-group col-sm-6">
              <el-form-item label="活动形式" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
              </el-form-item>
            </div>
          </el-form>
          <div class="form-group col-sm-6">
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'DemoForm',

  components: {},

  props: {
  },

  data () {
    return {
      ruleForm: {
        make: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        make: [
          { required: true, message: 'Make is required.', trigger: 'blur' },
          { min: 2, max: 16, message: 'At least 2, but no more than 16 characters.', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },

  computed: {},

  watch: {},

  created () {
  },

  mounted () {
  },

  filters: {},

  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message.success('We got your suggestion! ')
        } else {
          this.$message.error('There was an error while sending the form, Please try again later. ')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
