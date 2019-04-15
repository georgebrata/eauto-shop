<template>
  <el-dialog :title="`${car.make} ${car.model}`" :visible="visible || isVisible" @close="onClose" class="edit-dialog">
    {{car.carID}}
    
    <span slot="footer" class="dialog-footer">
      <el-button @click="isVisible = false"> {{$t('cancel')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { Bar } from 'vue-chartjs'
import translations from "../../translations.js";


export default{
  name: 'EditDialog',
  extends: Bar,
  data () {
    return {
      isVisible: false,
      fillForm: {
        name: '',
        description: '',
        address: '',
        date: ''
      },
      rules: {}
    }
  },

  computed: {},

  created () {},

  mounted () {
    //this.renderChart(data, options)
  },

  props: {
    visible: {
      type: Boolean,
      required: true
    },
    car: {
      type: Object,
      default: {}
    }
  },

  watch: {
    value (newVal) {
      this.isVisible = newVal
      this.fillForm = JSON.parse(JSON.stringify(this.pdata))
    }
  },

  methods: {
    onClose () {
      this.isVisible = false
      this.$emit('input', this.isVisible)
    },

    /* ----------------------------On Click Event---------------------------- */
    onSureClick () {
    }
  },

  locales: {
    en: translations.en,
    ro: translations.ro
  }
}
</script>

<style type="text/css" lang="scss">
.edit-dialog{
  .el-form-item__label, .el-form-item__content{
    display: inline-block;
  }
  .el-form-item__label{
    width: 30%;
  }
  .el-input{
    width: 100%;
    min-width: 260px;
  }
  .el-dialog--tiny{
    min-width: 300px;
  }
}
</style>
