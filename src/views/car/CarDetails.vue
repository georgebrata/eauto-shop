<template>
  <section class="page-module">

    <div class="module-header">
      <h3>{{getCar()['make']}} {{getCar()['model']}} <el-tag type="info">{{getCar()['dateFrom(MontYear)']}}</el-tag> </h3>
        <el-button class="hidden-sm-and-down" type="primary" style="position: absolute; right: 20px; top: 15px;"><i class="el-icon-menu mr-3"></i>Compare this car with others</el-button>
        <el-button class="hidden-md-and-up" type="primary" style="position: absolute; right: 20px; top: 15px;"><i class="el-icon-menu"></i></el-button>
    </div>

    <div class="module-content">
        <el-row :gutter="12">
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="general">
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
                        <el-col :xs="24" :sm="24" :md="12">
                            <div class="text item mb-3">
                                <p class="mb-1">Seats</p>
                                <h5 class="mb-1">{{getCar()['seats']}}</h5>
                            </div>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12">
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
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="eco">
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
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="capacity">
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
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="performance">
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
        </el-row>


        <el-row type="flex" class="row-bg" justify="center">
            <el-col :xs="24" v-if="!general && !eco && !capacity && !performance" style="text-align: center;margin-top: 40vh;">
                <el-button style="padding: 20px 30px;font-size: 1.4rem;" type="primary" icon="el-icon-d" @click="showCards()">Show me all the cards back</el-button>
            </el-col>
        </el-row>
    </div>
  </section>
</template>

<script>
  import translations from "../../translations.js";
  import {mapState, mapActions} from 'vuex'


  export default {
    name: "CarDetails",
    props: {},

    data() {
      return {
        searchTerm: '',
        columns: ['make', 'model', "carID", "dateFrom(MontYear)", "dateTo(MontYear)", "fuelType", "usedPriceRange",
          "newPrice", "transmision", "gearBox", "drivetrain", "luggageCapacity", "doors", "seats", "safetyAsist",
          "fuelCapacity", "consumption", "power", "topSpeed", "0-60mph", "torque", "cO2Emision",
          "euroEmisionStandard", "milesPerTank"
        ],
        hiddenColumns: ['carID'],
        favouriteCars: JSON.parse(localStorage.getItem('favoritesList')) || [],
        favouriteCarsIDs: (JSON.parse(localStorage.getItem('favoritesList')) || []).map(el => { return el.carID }),
        carList: JSON.parse(localStorage.getItem('carList')) || [],
        filteredCarList: [],
        isDialogVisible: false,
        capacity: true,
        general: true,
        eco: true,
        performance: true,
        currentCar: {},
        userKnows: false,
      };
    },

    components: {

    },

    computed: {...mapState({
        stateCarList: state => state.carList,
        stateFavouriteCarList: state => state.favoritesCarsList
      })
    },


    watch: {
    },

    created() {},

    mounted() {
      this.getData();
      setTimeout(() => {
        //console.log(this.stateCarList);
      }, 3000);
    },

    filters: {},

    methods: {
    updateUser() {
        if(!this.userKnows) {
            this.$message("You have succesfully hidden a card. Refresh the page to get it back");
            this.userKnows = true;
        }
    },
    showCards() {        this.capacity = this.eco = this.performance = this.general = true;    },
    hideCapacity() {        this.capacity = false;this.updateUser();    },
    hideEco() {        this.eco = false;this.updateUser();    },
    hidePerformance() {        this.performance = false;this.updateUser();    },
    hideGeneral() {        this.general = false;this.updateUser();    },
      getCar() {
          return {
            "carID": 53,
            "make": "Infiniti",
            "model": "Q60",
            "dateFrom(MontYear)": "October 2016",
            "dateTo(MontYear)": "September 2018",
            "fuelType": "Petrol",
            "usedPriceRange": "£20,285 - £28,985",
            "newPrice": "£30,999",
            "transmision": "Automatic",
            "gearBox": "7 Speed",
            "drivetrain": "Rear wheel drive",
            "luggageCapacity": "342",
            "doors": 3,
            "seats": 4,
            "safetyAsist": null,
            "fuelCapacity": "80",
            "consumption": "41",
            "power": "208",
            "topSpeed": "146",
            "0-60mph": "7.1",
            "torque": "350 Nm, 258 ft-lb",
            "cO2Emision": "156",
            "euroEmisionStandard": 6,
            "milesPerTank": "721"
        }
      },

      toggleFavouriteCar(carID) {
        let index = this.favouriteCarsIDs.indexOf(carID);

        if (index > -1) {
          this.favouriteCarsIDs.splice(index, 1);

          this.$message({
            message: 'Car removed from favourites successfully.',
            type: 'success'
          });

        } else {
          this.favouriteCarsIDs.push(carID);

          this.$message({
            message: 'Successfully added car to favourites.',
            type: 'success'
          });

        }

        this.$setFavoritesList(this.favouriteCars.push(this.carList.find(function(car) {
          return car.carID == carID;
        })));
      },

     viewCarDetails(carID) {
        let index = -1;
        this.carList.forEach((element, i) => {
          if (element.carID == carID) {
            index = i;
          }
        });

        console.log(this.carList, carID);

        if (index > -1) {
          this.currentCar = this.filteredCarList[index];
          this.isDialogVisible = true;
        }
     },

      getData() {
        if (this.stateCarList.length) {
          this.carList = this.stateCarList
          this.filteredCarList = this.stateCarList
        } else {
          this.$apis.car.fetchAll().then(carList => {
              this.carList = carList;
              this.filteredCarList = carList;
              this.$setCarList(carList);
            }).catch(err => {
              this.isLoading = false;
              this.hasError = true;
            });
        }
      },

      search(e) {
        let searchTerm = e.target.value;

        let filteredCarList = this.carList.filter(item => {
          //console.log(item)
          /*
          return this.columns.some(column => {
            return item[column] && item[column].toString().includes(this.searchTerm);
          })
          */
         //search only works by make
         return item['make'] && item['make'].toString().toLowerCase().includes(searchTerm.toLowerCase());
        })

        this.filteredCarList = filteredCarList;
      }
    },

    locales: {
      en: translations.en,
      ro: translations.ro
    }
  };

</script>

<style lang="scss">
  @import "./../../assets/scss/variables.scss";
  @import "./../../assets/scss/mixins.scss";
 i.el-icon-circle-check-outline {
     color: green;
 }
 .el-card__body {
     padding: 1rem 1rem !important;
 }
  .module-content {
    .table-operate {
      margin-top: 15px;
    }

    .operation-area {
      @include flex-box-center(row);
    }

    .heart {
      content: "";
      display: block;
      width: 20px;
      min-height: 16px;
      position: relative;
      transform-origin: 50% 50% 0;
    }

    .heart:before {
      content: "";
      display: block;
      width: 10px;
      height: 16px;
      position: absolute;
      top: 0;
      left: 10px;
      border-radius: 10px 10px 0 0;
      background: #f05b72;
      transform: rotateZ(-45deg);
      transform-origin: 0 100% 0;
    }

    .heart:after {
      content: "";
      display: block;
      width: 10px;
      height: 16px;
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 10px 10px 0 0;
      background: #f05b72;
      transform: rotateZ(45deg);
      transform-origin: 100% 100% 0;
    }
    th {
      font-weight: bold;
      height: 1.3rem;
    }
    .details-link {
      margin-left: 10px;
      cursor: pointer;
      &:hover {
        color: black;
      }
    }

    .heart-link {
      cursor: pointer;

      &:hover {
        animation: vibrate-1 0.3s linear infinite both;
      }

      .el-icon-star-off {
        color: gray;
      }

      .el-icon-star-on {
        color: darkgoldenrod;
        animation: jello-diagonal-1 0.8s both;
      }
    }
  }



  /* ----------------------------------------------
 * Generated by Animista on 2019-4-15 2:42:5
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

  /**
 * ----------------------------------------
 * animation jello-diagonal-1
 * ----------------------------------------
 */
  @-webkit-keyframes jello-diagonal-1 {
    0% {
      -webkit-transform: skew(0deg 0deg);
      transform: skew(0deg 0deg);
    }

    30% {
      -webkit-transform: skew(25deg 25deg);
      transform: skew(25deg 25deg);
    }

    40% {
      -webkit-transform: skew(-15deg, -15deg);
      transform: skew(-15deg, -15deg);
    }

    50% {
      -webkit-transform: skew(15deg, 15deg);
      transform: skew(15deg, 15deg);
    }

    65% {
      -webkit-transform: skew(-5deg, -5deg);
      transform: skew(-5deg, -5deg);
    }

    75% {
      -webkit-transform: skew(5deg, 5deg);
      transform: skew(5deg, 5deg);
    }

    100% {
      -webkit-transform: skew(0deg 0deg);
      transform: skew(0deg 0deg);
    }
  }

  @keyframes jello-diagonal-1 {
    0% {
      -webkit-transform: skew(0deg 0deg);
      transform: skew(0deg 0deg);
    }

    30% {
      -webkit-transform: skew(25deg 25deg);
      transform: skew(25deg 25deg);
    }

    40% {
      -webkit-transform: skew(-15deg, -15deg);
      transform: skew(-15deg, -15deg);
    }

    50% {
      -webkit-transform: skew(15deg, 15deg);
      transform: skew(15deg, 15deg);
    }

    65% {
      -webkit-transform: skew(-5deg, -5deg);
      transform: skew(-5deg, -5deg);
    }

    75% {
      -webkit-transform: skew(5deg, 5deg);
      transform: skew(5deg, 5deg);
    }

    100% {
      -webkit-transform: skew(0deg 0deg);
      transform: skew(0deg 0deg);
    }
  }


  /* ----------------------------------------------
 * Generated by Animista on 2019-4-15 2:40:49
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

  /**
 * ----------------------------------------
 * animation vibrate-1
 * ----------------------------------------
 */
  @-webkit-keyframes vibrate-1 {
    0% {
      -webkit-transform: translate(0);
      transform: translate(0);
    }

    20% {
      -webkit-transform: translate(-0.5px, 0.5px);
      transform: translate(-0.5px, 0.5px);
    }

    40% {
      -webkit-transform: translate(-0.5px, -0.5px);
      transform: translate(-0.5px, -0.5px);
    }

    60% {
      -webkit-transform: translate(0.5px, 0.5px);
      transform: translate(0.5px, 0.5px);
    }

    80% {
      -webkit-transform: translate(0.5px, -0.5px);
      transform: translate(0.5px, -0.5px);
    }

    100% {
      -webkit-transform: translate(0);
      transform: translate(0);
    }
  }

  @keyframes vibrate-1 {
    0% {
      -webkit-transform: translate(0);
      transform: translate(0);
    }

    20% {
      -webkit-transform: translate(-0.5px, 0.5px);
      transform: translate(-0.5px, 0.5px);
    }

    40% {
      -webkit-transform: translate(-0.5px, -0.5px);
      transform: translate(-0.5px, -0.5px);
    }

    60% {
      -webkit-transform: translate(0.5px, 0.5px);
      transform: translate(0.5px, 0.5px);
    }

    80% {
      -webkit-transform: translate(0.5px, -0.5px);
      transform: translate(0.5px, -0.5px);
    }

    100% {
      -webkit-transform: translate(0);
      transform: translate(0);
    }
  }

</style>
