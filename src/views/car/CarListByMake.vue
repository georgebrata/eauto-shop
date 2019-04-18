<template>
  <section class="page-module">

    <div class="module-header">
      <h3 style="display: inline;">{{this.$route.params.make}}</h3>

      <el-rate
        style="float:right; margin-top: 5px;"
        v-model="Math.random()*100/4"
        disabled>
      </el-rate>
    </div>

    <div class="module-content">

      <div class="panel panel-default">
<!--
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>Card name</span>
              </div>
              <div v-for="o in 4" :key="o" class="text item">
                {{'List item ' + o }}
              </div>
            </el-card>

          </el-col>
          <el-col :span="12">

            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>Card name</span>
              </div>
                <el-progress style="text-align: center;" type="circle" :percentage="100" status="text">20 cars</el-progress>
                <h2 style="height: auto;"></h2>

            </el-card>

          </el-col>
        </el-row>
        <hr>

        <el-input placeholder="Type a model ..." prefix-icon="el-icon-search" class="mb-2" @keydown.native="search">
          <template slot="prepend">Browse {{this.$route.params.make}} cars</template>
          <template slot="append">
              <el-button type="primary" icon="el-icon-edit" circle></el-button>
          </template>
        </el-input>
-->

        <div class="panel-body">
          <el-card class="mt-1 mb-1 pr-2 pl-2 pt-1 pb-1" shadow="hover" v-for="car in filteredCarList.filter(el => el.make == this.$route.params.make)" v-bind="car['carID']">
            <i v-if="favouriteCarsIDs.includes(car['carID'])" class="el-icon-star-on mr-2" style="color: #f7ba2a;"></i>{{car['model']}}
            <el-button type="text" class="button ml-4" @click="toggleFavouriteCar(car['carID'])" style="float: right;padding:0;"> {{favouriteCarsIDs.includes(car['carID']) ? "✔︎ Added" : "Add to favorites"}}<i :class="favouriteCarsIDs.includes(car['carID']) ? '' : 'el-icon-star-off mr-4 ml-1'"></i></el-button>
            <el-button type="text" class="button mr-4" @click="viewCar(car)" style="float: right;padding:0;">
              View car details
            </el-button>
          </el-card>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
  import translations from "../../translations.js";
  import {mapState, mapActions} from 'vuex'

  export default {
    name: "CarListByMake",
    props: {},

    data() {
      return {
        searchTerm: '',
        isLoading: true,
        columns: ['model', "carID", "dateFrom(MontYear)", "dateTo(MontYear)", "fuelType", "usedPriceRange",
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
        currentPage: 1,
        currentCar: {},
      };
    },

    components: {

    },

    computed: {...mapState({
        stateCarList: state => state.carList,
        stateFavouriteCarList: state => state.favoritesCarsList
      })
    },
    watch: {},

    created() {},

    mounted() {
      this.getData();
    },

    filters: {},

    methods: {
      viewCar(car) {
        this.$router.push(`/cars/models/${car['model']}`);
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
        let newFavouriteCar = this.carList.find(function(car) {
          return car.carID == carID;
        })

        if (this.favouriteCars.find(car => { return car.carID == carID; })) {
          this.$setFavoritesList(Array.concat(this.favouriteCars, []));
        } else {
          this.favouriteCars.push(newFavouriteCar);
          this.$setFavoritesList(Array.concat(this.favouriteCars, []));
        }
      },

     viewCarDetails(carID) {
        let index = -1;
        this.carList.forEach((element, i) => {
          if (element.carID == carID) {
            index = i;
          }
        });

        if (index > -1) {
          this.currentCar = this.filteredCarList[index];
          this.isDialogVisible = true;
        }
     },

     getFuelTypes() {
       let s = [];
       filteredCarList.filter(el => el.make == this.$route.params.make).forEach(el => {
         if (!s.includes(el.fuelType)) {
           s.push(el.fuelType)
         }
       })
       return s;

     },

      getData() {
        if (this.stateCarList.length) {
          this.carList = this.stateCarList
          this.filteredCarList = this.stateCarList
          this.isLoading = false;
        } else {
          this.isLoading = true
          this.$apis.car.fetchAll().then(carList => {
              this.isLoading = false
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
         //search only works by model
         return item['model'] && item['model'].toString().toLowerCase().includes(searchTerm.toLowerCase());
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

  .el-card {
    button {
      display: none;
    }
    .el-card__body {
      font-weight: 400;
    }
  }

  .el-card:hover {
    button {
      display: inline;
	-webkit-animation: tracking-in-expand 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
	        animation: tracking-in-expand 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
    }
    .el-card__body {
      font-weight: 600;
    }
  }
  button:hover {
    font-weight: 500;
    color: dodgerblue;
  }
  .module-content {
    .table-operate {
      margin-top: 15px;
    }

    .operation-area {
      @include flex-box-center(row);
    }
  }

  .el-card {
    cursor: pointer;
  }
/* ----------------------------------------------
 * Generated by Animista on 2019-4-18 6:59:20
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation tracking-in-expand
 * ----------------------------------------
 */
@-webkit-keyframes tracking-in-expand {
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}
@keyframes tracking-in-expand {
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
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
