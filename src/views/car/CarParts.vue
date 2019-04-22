<template>
    <el-row v-if="getCar()">
      <el-col :xs="24" v-if="header" class="mb-2">
        <h3>{{ getCar()['make'] }} {{ getCar()['model'] }}
            <el-button type="link" class="small" @click="resetCar()"><i class="el-icon-refresh"></i></el-button>
            <el-tag style="float: right;margin-bottom: 5px;" type="info">{{getCar()['dateFrom(MontYear)']}}</el-tag>
        </h3>
      </el-col>

      <!-- START OF GENERAL CARD -->
      <el-col :xs="24" v-if="!general">
        <el-card class="box-card mb-2 hidden-card">
            <div slot="header" class="clearfix">
              <h4 style="display: inline;">General <el-tag type="warning">hidden</el-tag></h4>
              <el-button style="float: right; padding: 6px;" type="text" @click="showGeneral()">Show</el-button>
            </div>
        </el-card>
      </el-col>
      <el-col :xs="24" v-if="general">
          <el-card class="box-card mb-2">
              <div slot="header" class="clearfix">
                  <h4 style="display: inline;">General</h4>
                  <el-button style="float: right; padding: 6px;" type="text" @click="hideGeneral()">Hide</el-button>
              </div>

              <div class="text item mb-3">
                  <p class="mb-1">Price (new)</p>
                  <h5 class="mb-1">{{getCar()['newPrice']}}</h5>
                  <small class="mb-2" style="color: lightgray; float: right">{{getCar()['usedPriceRange'] ? "Used  "+getCar()['usedPriceRange'] : ""}}</small>
              </div>

              <div class="text item mb-3 mt-1">
                  <p class="mb-1">Transmission</p>
                  <h5 class="mb-1" v-if="getCar()['transmision'] == 'Automatic'"><i class="el-icon-circle-check-outline mr-1"></i>{{getCar()['transmision']}}</h5>
                  <h5 class="mb-1" v-if="getCar()['transmision'] !== 'Automatic'">{{getCar()['transmision']}}</h5>
              </div>

              <div class="text item mb-3">
                  <p class="mb-1">Fuel type</p>
                  <h5 class="mb-1">{{getCar()['fuelType']}}</h5>
              </div>

              <el-row :gutter="12">
                  <el-col :xs="24" :sm="12" :md="12">
                      <div class="text item mb-3">
                          <p class="mb-1">Seats</p>
                          <h5 class="mb-1">{{getCar()['seats']}}</h5>
                      </div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="12">
                      <div class="text item mb-3" style="text-align: left;">
                          <p class="mb-1">Doors</p>
                          <h5 class="mb-1">{{getCar()['doors']}}</h5>
                      </div>
                  </el-col>
              </el-row>

              <hr>

              <div class="text item mb-3">
                  <p class="mb-1">Date released</p>
                  <h5 class="mb-1 font-italic">{{getCar()['dateFrom(MontYear)']}}</h5>
              </div>
          </el-card>
      </el-col>
      <!-- END OF GENERAL CARD -->

      <!-- START OF ECO CARD -->
      <el-col :xs="24" v-if="!eco">
        <el-card class="box-card mb-2 hidden-card">
            <div slot="header" class="clearfix">
              <h4 style="display: inline;">ECO <el-tag type="warning">hidden</el-tag></h4>
              <el-button style="float: right; padding: 6px;" type="text" @click="showEco()">Show</el-button>
            </div>
        </el-card>
      </el-col>
      <el-col :xs="24" v-if="eco">
          <el-card class="box-card mb-2">
              <div slot="header" class="clearfix">
                  <h4 style="display: inline;">ECO</h4>
                  <el-button style="float: right; padding: 6px;" type="text" @click="hideEco()">Hide</el-button>
              </div>
              <div class="text item mb-3">
                  <p class="mb-1">EURO Emision Standard</p>
                  <el-rate
                      v-model="getCar()['euroEmisionStandard']"
                      disabled>
                  </el-rate>

              </div>
              <div class="text item mb-3">
                  <p class="mb-1">CO<sub>2</sub> emissions: {{getCar()['cO2Emision']}} g/km</p>
                  <el-progress :show-text="false" :percentage="getCar()['cO2Emision']/10" color="#8131c1"></el-progress>
              </div>
              <div class="text item mb-3">
                  <p class="mb-1">Consumption {{getCar()['consumption']}} MPG</p>
                  <el-progress :show-text="false" :percentage="getCar()['consumption']/10" color="#131197"></el-progress>
              </div>

              <div class="text item mb-3">
                  <p class="mb-1">Miles per tank: {{getCar()['milesPerTank']}} miles</p>
                  <el-progress :show-text="false" :percentage="getCar()['milesPerTank']/10" color="#838397"></el-progress>
              </div>

          </el-card>
      </el-col>
      <!-- END OF ECO CARD -->

      <!-- START OF CAPACITY CARD -->
      <el-col :xs="24" v-if="!capacity">
        <el-card class="box-card mb-2 hidden-card">
            <div slot="header" class="clearfix">
              <h4 style="display: inline;">Capacity <el-tag type="warning">hidden</el-tag></h4>
              <el-button style="float: right; padding: 6px;" type="text" @click="showCapacity()">Show</el-button>
            </div>
        </el-card>
      </el-col>
      <el-col :xs="24" v-if="capacity">
          <el-card class="box-card mb-2">
              <div slot="header" class="clearfix">
                  <h4 style="display: inline;">Capacity</h4>
                  <el-button style="float: right; padding: 6px;" type="text" @click="hideCapacity()">Hide</el-button>
              </div>
              <!--
                  de normalizat: luggageCapacity, fuelCapacity, power, cO2Emision, consumption, milesPerTank

                  imparteala:
                      luggageCapacity: 10
                      fuelCapacity: 10
                      power: 10
                      0-60mph: x10
                      co2Emmision: 10
                      consumption: 10
                      milesPerTank: 10
              -->
              <div class="text item mb-3">
                  <p class="mb-1">Luggage Capacity: {{getCar()['luggageCapacity']}} liters</p>
                  <el-progress :show-text="false" :percentage="getCar()['luggageCapacity']/10" color="#8e71c7"></el-progress>
              </div>
              <div class="text item mb-3">
                  <p class="mb-1">Fuel Capacity: {{getCar()['fuelCapacity']}} liters</p>
                  <el-progress :show-text="false" :percentage="getCar()['fuelCapacity']/10" color="#1e73e7"></el-progress>
              </div>

              <div class="text item mb-3">
                  <p class="mb-1"><i class="el-icon-rank"></i> {{getCar()['gearBox']}} GearBox</p>
              </div>

          </el-card>
      </el-col>
      <!-- END OF CAPACITY CARD -->

      <!-- START OF PERFORMANCE CARD -->
      <el-col :xs="24" v-if="!performance">
        <el-card class="box-card mb-2 hidden-card">
            <div slot="header" class="clearfix">
              <h4 style="display: inline;">Performance <el-tag type="warning">hidden</el-tag></h4>
              <el-button style="float: right; padding: 6px;" type="text" @click="showPerformance()">Show</el-button>
            </div>
        </el-card>
      </el-col>
      <el-col :xs="24" v-if="performance">
          <el-card class="box-card mb-2">
              <div slot="header" class="clearfix">
                  <h4 style="display: inline;">Performance</h4>
                  <el-button style="float: right; padding: 6px;" type="text" @click="hidePerformance()">Hide</el-button>
              </div>
              <div class="text item mb-3">
                  <p class="mb-1">Power: {{getCar()['power']}} BHP</p>
                  <el-progress :show-text="false" :percentage="getCar()['power']/10" color="#8e71c7"></el-progress>
              </div>
              <div class="text item mb-3">
                  <p class="mb-1">Top Speed: {{getCar()['topSpeed']}} MPH</p>
                  <el-progress :show-text="false" :percentage="getCar()['topSpeed']/10" color="#131197"></el-progress>
              </div>
              <div class="text item mb-3">
                  <p class="mb-1">Acceleration (0-60 mph): {{getCar()['0-60mph']}} s</p>
                  <el-progress :show-text="false" :percentage="getCar()['0-60mph']*10" color="#131197"></el-progress>
              </div>

              <div class="text item mb-3">
                  <p class="mb-1"><i class="el-icon-more"></i>Torque {{getCar()['torque']}}</p>
              </div>

          </el-card>
      </el-col>
      <!-- END OF PERFORMANCE CARD -->

    </el-row>

</template>

<script>

import {mapState, mapActions} from 'vuex'
export default {
  name: 'CarParts',


  data () {
    return {
      eco: true,
      performance: true,
      capacity: true,
      general: true
    }
  },
  props: ['car', 'header'],

  components: {

  },
    methods: {
      selectCar(car) {

      },
      resetCar() {
          this.$emit('change')
      },
      getCar() {
        return this.$props.car;
      },
      hideGeneral() { this.general = false},
      hideEco() { this.eco = false},
      hidePerformance() { this.performance = false},
      hideCapacity() { this.capacity = false},

      showGeneral() { this.general = true},
      showEco() { this.eco = true},
      showPerformance() { this.performance = true},
      showCapacity() { this.capacity = true},
    },

  computed: {...mapState({
      stateCarList: state => state.carList,
      stateFavouriteCarList: state => state.favoritesCarsList
    })
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

</style>
