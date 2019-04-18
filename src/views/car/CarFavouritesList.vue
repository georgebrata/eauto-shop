<template>
  <section class="page-module">
    <!--
    <div class="module-header">
      <h3>All cars</h3>
    </div>
    -->
    <div class="module-content">

      <div class="panel panel-default">
        <el-input v-if="stateFavouriteCarList.length > 0" placeholder="Type a car make ..." prefix-icon="el-icon-search" class="mb-2" @keydown.native="search">
          <template slot="prepend">Search for a car</template>
          <template slot="append">  
              <el-button type="primary" icon="el-icon-edit" circle></el-button>
          </template>
        </el-input>

        <div class="panel-body">
          <el-table v-if="stateFavouriteCarList.length > 0" :data="stateFavouriteCarList" border stripe highlight-current-row height="80vh" style="width: 100%">

            <el-table-column :prop="column" :label="$t(column)" show-overflow-tooltip min-width="30" width="155" 
              v-if="!hiddenColumns.includes(column)" v-for="column in columns.slice(0,19)" v-bind:key="column">
              <template slot-scope="scope">
                <span v-html="scope.row[column]"></span>
              </template>
            </el-table-column>

            <el-table-column :label="''" width="50" fixed="right">
              <template slot-scope="scope">
                <div class="operation-area">
                  <a :href="scope.row.address" class="heart-link" target="_blank" rel="noreferrer noopener" title="Favorite this car"
                    @click="removeFromFavorites(scope.row.carID)">
                    <span class="el-icon-delete"></span>
                  </a>
                </div>
              </template>
            </el-table-column>
          </el-table>

            <el-alert v-if="stateFavouriteCarList.length === 0"
              title="You have no favourite cars."
              type="warning"
              description="Add cars to your favourites directory by navigating to the main car list."
              show-icon>
            </el-alert>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
  import translations from "../../translations.js";
  import {mapState, mapActions} from 'vuex'

  export default {
    name: "CarFavouritesList",
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
        favouriteCarsIDs: [],
        favouriteCars: [],
        carList: [],
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
    },

    filters: {},

    methods: {
      handleSizeChange(val) {},

      removeFromFavorites(carID) {
        
        let index = this.favouriteCarsIDs.indexOf(carID);

        if (index > -1) {
          this.favouriteCarsIDs.splice(index, 1);

          this.$message({
            message: 'Car removed from favourites successfully.',
            type: 'success'
          });

        } 

        this.carList.forEach(function(car, i) {
          if(car.carID == carID) {
            index = i;
          }
        })

        this.favouriteCars.splice(index, 1);
        this.$setFavoritesList(Array.concat(this.favouriteCars, []));
        
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
        -webkit-animation: heartbeat 1.5s ease-in-out both;
	        animation: heartbeat 1.5s ease-in-out both;
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
 * Generated by Animista on 2019-4-18 3:7:45
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation heartbeat
 * ----------------------------------------
 */
@-webkit-keyframes heartbeat {
  from {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: center center;
            transform-origin: center center;
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  10% {
    -webkit-transform: scale(0.91);
            transform: scale(0.91);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  17% {
    -webkit-transform: scale(0.98);
            transform: scale(0.98);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  33% {
    -webkit-transform: scale(0.87);
            transform: scale(0.87);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  45% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
}
@keyframes heartbeat {
  from {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: center center;
            transform-origin: center center;
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  10% {
    -webkit-transform: scale(0.91);
            transform: scale(0.91);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  17% {
    -webkit-transform: scale(0.98);
            transform: scale(0.98);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  33% {
    -webkit-transform: scale(0.87);
            transform: scale(0.87);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  45% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
}


</style>
