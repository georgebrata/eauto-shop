<template>
  <section class="page-module">
    <!--
    <div class="module-header">
      <h3>All cars</h3>
    </div>
    -->
    <div class="module-content">

      <div class="panel panel-default">
        <el-input placeholder="Type a car make ..." prefix-icon="el-icon-search" class="mb-2" @keydown.native="search">
          <template slot="prepend">Search for a car</template>
        </el-input>

        <div class="panel-body">
          <el-table :data="filteredCarList" border stripe highlight-current-row height="80vh" style="width: 100%" v-loading="isLoading">

            <el-table-column prop="make" label="Make" show-overflow-tooltip min-width="30" width="130">
              <template slot-scope="scope">
                <router-link tag="a" :to="`/cars/makes/${scope.row['make']}`">
                  <span v-html="scope.row['make']"></span>
                </router-link>
              </template>
            </el-table-column>

            <el-table-column prop="model" label="Model" show-overflow-tooltip min-width="30" width="150">
              <template slot-scope="scope">
                <router-link tag="a" :to="`/cars/models/${scope.row['model']}`">
                  <span v-html="scope.row['model']"></span>
                </router-link>
              </template>
            </el-table-column>

            <el-table-column :prop="column" :label="$t(column)" show-overflow-tooltip min-width="30" width="155"
              v-if="!hiddenColumns.includes(column)" v-for="column in columns.slice(2,19)" v-bind:key="column">
              <template slot-scope="scope">
                <span v-html="scope.row[column]"></span>
              </template>
            </el-table-column>

            <el-table-column :label="''" width="40" fixed="right">
              <template slot-scope="scope">
                <div class="operation-area">
                  <a :href="scope.row.address" class="heart-link" target="_blank" rel="noreferrer noopener" title="Favorite this car"
                    @click="toggleFavouriteCar(scope.row.carID)">
                    <span :class="favouriteCarsIDs.includes(scope.row.carID) ? 'el-icon-star-on' : 'el-icon-star-off'"></span>
                  </a>
                  <!--
                  <a :href="scope.row.address" class="details-link" target="_blank" rel="noreferrer noopener" title="View more details about this car"
                    @click="viewCarDetails(scope.row.carID)">
                    <span class="el-icon-zoom-in"></span>
                  </a>
                  -->
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
  import translations from "../../translations.js";
  import {mapState, mapActions} from 'vuex'

  export default {
    name: "CarList",
    props: {},

    data() {
      return {
        isLoading: true,
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


    watch: {
      carList() {
        //alert(1)
      },
      stateCarList() {
        //alert(1)
      }
    },

    created() {},

    mounted() {
      this.getData();
      console.log('favouriteCars:', this.favouriteCars)
    },

    filters: {},

    methods: {
      handleSizeChange(val) {},

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
          this.carList.forEach(function(car, i) {
            if(car.carID == carID) {
              index = i;
            }
          })

          this.favouriteCars.splice(index, 1);
          this.$setFavoritesList(Array.concat(this.favouriteCars, []));

        } else {
          console.log(newFavouriteCar)
          this.favouriteCars.push(newFavouriteCar);
          this.$setFavoritesList(Array.concat(this.favouriteCars, []));
        }
      },

      getData() {
        if (this.stateCarList.length) {
          this.carList = this.stateCarList
          this.filteredCarList = this.stateCarList
          this.isLoading = false;
        } else {
          this.isLoading = true;
          this.$apis.car.fetchAll().then(carList => {
              this.isLoading = false;
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
