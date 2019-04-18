<template>
    <el-col :xs="24" class="pl-4 pr-4 mt-4 text-center" style="margin-top: 100px; !important0">
        <h4 class="text-muted font-italic mt-3">Choose a car to compare</h4>
        <hr>
        <div v-if="this.$props.cars.length > 0">
            <h6>Select from your favourites cars</h6>
            <div class="p-2">
                <el-card class="mt-1 mb-1 pr-2 pl-2 pt-1 pb-1" shadow="hover" v-for="car in this.$props.cars" v-bind="car['carID']">
                    {{car['model']}} {{car['model']}}
                    <el-button type="text" class="button mr-4" @click="selectCar(car)" style="float: right;padding:0;">
                    Compare
                    </el-button>
                </el-card>
            </div>
        </div>

        <div v-if="this.$props.allCars.length > 0">
            <h6>Search our database</h6>
            <br>
            <div class="panel panel-default">
                <el-input placeholder="Type a car make ..." prefix-icon="el-icon-search" class="mb-2" @keydown.native="search">
                <template slot="prepend">Search by make ...</template>
                </el-input>

                <div class="panel-body">
                <el-table :data="this.$props.allCars" border stripe highlight-current-row height="55vh" style="width: 100%">

                    <el-table-column prop="make" label="Make" show-overflow-tooltip min-width="30" width="auto">
                    <template slot-scope="scope">
                        <span v-html="scope.row['make']"></span>
                    </template>
                    </el-table-column>

                    <el-table-column prop="model" label="Model" show-overflow-tooltip min-width="30" width="auto">
                    <template slot-scope="scope">
                        <span v-html="scope.row['model']"></span>
                    </template>
                    </el-table-column>

                    <el-table-column prop="model" label="Price" show-overflow-tooltip min-width="30" width="auto">
                    <template slot-scope="scope">
                        <span v-html="scope.row['newPrice']"></span>
                    </template>
                    </el-table-column>

                    <el-table-column prop="model" label="Torque" show-overflow-tooltip min-width="30" width="auto">
                    <template slot-scope="scope">
                        <span v-html="scope.row['torque']"></span>
                    </template>
                    </el-table-column>

                    <el-table-column :label="''" width="140" fixed="right">
                    <template slot-scope="scope">
                        <div class="operation-area">
                            <el-button type="text" class="button mr-4" @click="selectCar(scope.row)" style="float: right;padding:0;">
                                <i class="el-icon-menu mr-3"></i>Compare
                            </el-button>
                        </div>
                    </template>
                    </el-table-column>
                </el-table>
                </div>
            </div>
        </div>
    </el-col>
</template>

<script>

import {mapState, mapActions} from 'vuex'
export default {
  name: 'ChooseCar',

  data () {
    return {
      eco: true
    }
  },
  props: ['cars', 'allCars'],

  components: {
    
  },
  mounted() {
      //console.log(this.$props.cars);
  },
    methods: {
        selectCar(car) {
            console.log(car);
            
            this.$emit('select', car)
        }
    }
}
</script>

<style lang="scss">
@import "./../../assets/scss/variables.scss";
@import "./../../assets/scss/mixins.scss";
.hidden-card .el-card__body {
  padding: 0;
}
.el-card__body {
  padding: 20px;
}
  .el-card:hover {
    button {
      display: inline;
	-webkit-animation: tracking-in-expand 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
	        animation: tracking-in-expand 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
    }
  }
th {
    font-weight: 600;
}
</style>
