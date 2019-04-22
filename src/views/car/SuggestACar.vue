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
            <div class="form-group col-xl-6 col-sm-12">
              <el-form-item label="Make" prop="make">
                <el-input v-model="ruleForm.make"></el-input>
              </el-form-item>
            </div>

            <div class="form-group col-sm-6">
              <el-form-item label="Model" prop="model">
                <el-input v-model="ruleForm.model"></el-input>
              </el-form-item>
            </div>


            <div class="form-group col-sm-6">
              <el-form-item label="Fuel Type" prop="fuelType">
                <el-select v-model="ruleForm.fuelType" placeholder="eg Petrol, Diesel, etc">
                  <el-option label="Diesel" value="diesel"></el-option>
                  <el-option label="Hybrid" value="hybrid"></el-option>
                  <el-option label="Petrol" value="petrol"></el-option>
                </el-select>
              </el-form-item>
            </div>


            <div class="form-group col-sm-6">
              <el-form-item label="Drive Terrain" prop="driveTerrain">
                <el-checkbox-group v-model="ruleForm.driveTerrain">
                  <el-checkbox label="4 Wheel Drive" name="four"></el-checkbox>
                  <el-checkbox label="Front wheel drive" name="front"></el-checkbox>
                  <el-checkbox label="Rear wheel drive" name="rear"></el-checkbox>
                  <el-checkbox label="Automatic" name="automatic"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>

            <div class="form-group col-sm-6">
              <el-form-item label="Automatic transmission" prop="transmission">
                <el-switch on-text="" off-text="" v-model="ruleForm.delivery"></el-switch>
              </el-form-item>
            </div>

            <div class="form-group col-sm-6">
              <el-form-item label="Release date" required>
                <el-col :span="11">
                  <el-form-item prop="date1">
                    <el-date-picker type="date" placeholder="Release date of the car" v-model="ruleForm.date1" ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
            </div>

<!--
            <div class="form-group col-sm-6">
              <el-form-item label="Drive terrain" prop="driveTerrain">
                <el-radio-group v-model="ruleForm.driveTerrain">
                  <el-radio label="4 Wheel Drive"></el-radio>
                  <el-radio label="Front wheel drive"></el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
-->
            <div class="form-group col-sm-6">
              <el-form-item label="Other details" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
              </el-form-item>
            </div>

            <div class="form-group col-sm-8">
              <el-form-item
                v-for="(domain, index) in dynamicValidateForm.domains"
                :label="'Add another property'"
                :key="domain.key"
                :prop="'domains.' + index + '.value'"
                :rules="{
                  required: true, message: 'property can not be null', trigger: 'blur'
                }"
              >
                <el-input v-model="domain.value" class="mb-2"></el-input>
                    <el-button type="primary" @click="addDomain">New property</el-button>
                    <el-button @click.prevent="removeDomain(domain)" icon="el-icon-delete" circle></el-button></el-button>

              </el-form-item>
            </div>
            <div class="form-group col-sm-3">
            </div>
          </el-form>
          <div class="form-group col-sm-6">
            <el-button type="primary" @click="submitForm('ruleForm')">Submit car</el-button>
            <el-button @click="resetForm('ruleForm')">Reset</el-button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  //Vue Components are like OOP Classess:
  //   data:    atrributes
  //   methods: methods
  name: 'SuggestACar',
  components: {},
  props: {},
  data () {
    return {
      dynamicValidateForm: {
        domains: [{
          key: 1,
          value: ''
        }],
        email: ''
      },
      ruleForm: {
        make: '',
        model: '',
        fuelType: '',
        date1: '',
        date2: '',
        transmission: false,
        type: [],
        driveTerrain: '',
        desc: ''
      },
      rules: {
        make: [
          { required: true, message: 'Make is required.', trigger: 'blur' },
          { min: 2, max: 16, message: 'At least 2, but no more than 16 characters.', trigger: 'blur' }
        ],
        fuelType: [
          { required: true, message: 'You must choose fuel type.', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: 'You must enter a value', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: 'You must enter a value', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: 'You must enter a value', trigger: 'change' }
        ],
        driveTerrain: [
          { required: true, message: 'You must choose at least one option.', trigger: 'change' }
        ],
        desc: [
          { required: true, message: 'You must enter a value', trigger: 'blur' }
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
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item);
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1);
        }
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
          key: Date.now(),
          value: ''
        });
      }
  }
}
</script>
<style lang="scss" scoped>
.el-checkbox+.el-checkbox {
  margin-left: 0px;
  display: block;
}
.el-checkbox {
  margin: 0;
}
</style>
