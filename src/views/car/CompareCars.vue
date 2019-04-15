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
          <template slot="append">  
              <el-button type="primary" icon="el-icon-edit" circle></el-button>
          </template>
        </el-input>

        <div class="panel-body">
          <el-table :data="filteredCarList" border stripe highlight-current-row height="80vh" style="width: 100%">

            <el-table-column :prop="column" :label="$t(column)" show-overflow-tooltip min-width="30" width="155" 
              v-if="!hiddenColumns.includes(column)" v-for="column in columns.slice(0,19)" v-bind:key="column">
              <template slot-scope="scope">
                <span v-html="scope.row[column]"></span>
              </template>
            </el-table-column>

            <el-table-column :label="''" width="41" fixed="right">
              <template slot-scope="scope">
                <div class="operation-area">
                  <a :href="scope.row.address" class="heart-link" target="_blank" rel="noreferrer noopener" title="Favorite this car"
                    @click="toggleFavouriteCar(scope.row.carID)">
                    <span :class="favouriteCars.includes(scope.row.carID) ? 'el-icon-star-on' : 'el-icon-star-off'"></span>
                  </a>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <edit-dialog :pdata="currentRowData" v-model="isDialogVisible" @dispatch-data="onUpdateRowData">
      </edit-dialog>

    </div>

    <el-dialog
      title="Warning"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <span>It should be noted that the content will not be aligned in center by default</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">Confirm</el-button>
      </span>
    </el-dialog>  
  </section>
</template>

<script>
  import EditDialog from "./EditDialog";
  import translations from "../../translations.js";

  export default {
    name: "CompareCars",
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
        favouriteCars: [],
        carList: [],
        filteredCarList: [],
        isDialogVisible: false,
        currentPage: 1,
        currentRowData: {},
        currentRowIndex: -1
      };
    },

    components: {
      EditDialog
    },

    computed: {},

    watch: {},

    created() {},

    mounted() {
      this.getData();
    },

    filters: {},

    methods: {
      handleSizeChange(val) {},

      toggleFavouriteCar(carID) {
        let index = this.favouriteCars.indexOf(carID);

        if (index > -1) {
          this.favouriteCars.splice(index, 1);

          this.$message({
            message: 'Car removed from favourites successfully.',
            type: 'success'
          });

        } else {
          this.favouriteCars.push(carID);

          this.$message({
            message: 'Successfully added car to favourites.',
            type: 'success'
          });

        }

        this.$setFavoritesList(this.favouriteCars);
      },

      getData() {
        this.$apis.car.fetchAll().then(carList => {
            this.carList = carList;
            this.filteredCarList = carList;
            this.$setCarList(carList);
          }).catch(err => {
            this.isLoading = false;
            this.hasError = true;
          });
      },

      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
      },

      onUpdateRowData(data) {
        this.currentRowData = data;
        this.$set(this.tableData, this.currentRowIndex, data);
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
