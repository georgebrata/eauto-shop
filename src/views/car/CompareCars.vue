<template>
  <!-- v-loading puts a loading gif (and a simple blur) on the page when isLoading variable is true -->
  <section class="page-module" v-loading="isLoading">
    <div class="module-content">

      <div class="panel panel-default">
        <!--
        <el-input placeholder="Type a car make ..." prefix-icon="el-icon-search" class="mb-2" @keydown.native="search">
          <template slot="prepend">Search for a car</template>
        </el-input>
        -->

        <div class="panel-body">

          <el-row :gutter="12">
            <el-col :xs="20" :sm="20" :lg="20" :md="20" :xl="20" :offset="2">
              <choose-car :all-cars="carList" :cars="favouriteCars" v-if="!carOneID" @select="selectCarOne"></choose-car>
            </el-col>
          </el-row>



          <el-row :gutter="12" v-if="carOneID">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <car-parts v-if="carOneID" :car="getCar()" :header="true" @change="changeCarOne"></car-parts>
            </el-col>

            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <choose-car v-if="!carTwoID" :all-cars="carList" :cars="favouriteCars" @select="selectCarTwo"></choose-car>
              <car-parts v-if="carTwoID" :car="getCar2()" :header="true" @change="changeCarTwo"></car-parts>
            </el-col>
          </el-row>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import translations from "../../translations.js";
  import {mapState, mapActions} from 'vuex'
  import CarParts from "./CarParts.vue"
  import ChooseCar from "./ChooseCar.vue"

  export default {
    name: "CompareCars",
    props: {},

    data() {
      return {
        isLoading: false,
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
        carOne: null,
        carTwo: null,
        carOneID: null,
        carTwoID: null
      };
    },

    components: {
      CarParts,
      ChooseCar
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
      readFromParams() {
        this.carOneID = this.$route.params.carid1 || null;
        this.carTwoID = this.$route.params.carid2 || null;


        if(this.carOneID) {
          this.carOne = this.stateCarList.find(el => {
            return el['carID'] == this.carOneID
          })
        }
        if(this.carTwoID) {
          this.carTwo = this.stateCarList.find(el => {
            return el['carID'] == this.carTwoID
          })
        }
      },
      changeCarOne(){
        this.carOneID = null;
        this.carOne = null;
      },
      changeCarTwo(){
        this.carTwoID = null;
        this.carTwo = null;
      },
      selectCarOne(car) {
        this.carOne = car;
        this.carOneID = car.carID
      },
      selectCarTwo(car) {
        this.carTwo = car;
        this.carTwoID = car.carID
      },
      getCar() {
        return this.carOne;
      },
      getCar2() {
        return this.carTwo;
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
              this.readFromParams();
            }).catch(err => {
              this.isLoading = false;
              this.hasError = true;
              this.readFromParams();
            });
        }
      },


      search(e) {
        let searchTerm = e.target.value;

        let filteredCarList = this.carList.filter(item => {
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
  }


</style>
