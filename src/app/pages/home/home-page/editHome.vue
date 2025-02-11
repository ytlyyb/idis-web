<template>
  <div class="common_bg" style="height: 1360px;">
    <leftTree ref="lefttree" />
    <div class="edit-left">
      <div class="right_grid">
        <div class="layoutJSON">
          <div class="layoutItem" v-for="item in menuList" :key="item.modlueId">
            <span class="span_list">{{ $t(item.disc.split(",")[0]) }}</span>
            <i
              class="el-icon-remove-outline"
              @click="removeMenu(item.modlueId)"
            ></i>
            <i class="septal_line"></i>
          </div>
          <!-- <el-button class="back" @click="backReturn">{{
            $t("ytlPage.back")
          }}</el-button> -->
          <el-button type="primary" class="save" @click="save">{{
            $t("ytlPage.save")
          }}</el-button>
        </div>
        <grid-layout
          :layout.sync="layout"
          :col-num="colNum"
          :row-height="10"
          :col-width="10"
          :is-draggable="draggable"
          :is-resizable="resizable"
          :vertical-compact="true"
          :use-css-transforms="true"
          :autoSize="isAutoSize"
          @layout-updated="layoutUpdatedEvent"
        >
          <grid-item
            v-for="item in layout"
            :static="item.static"
            :x="item.x"
            :y="item.y"
            :w="item.w"
            :h="item.h"
            :i="item.i"
            :key="item.i"
            @resize="SizeAutoChange(item.value)"
            @moved="movedEvent"
          >
            <meter-type ref="meterType" v-if="item.modlueId == '1.1'" />
            <communicationType ref="communicationType" v-if="item.modlueId == '1.2'" />
            <meterNumber ref="meterNumber" v-if="item.modlueId == '1.3'" />
            <communication ref="communication" v-if="item.modlueId == '1.4'" />
            <dataIntegrityrate ref="dataIntegrityrate" v-if="item.modlueId == '1.5'" />
            <electricityConsumption ref="electricityConsumption" v-if="item.modlueId == '2.1'" />
            <electricityElectricity ref="electricityElectricity" v-if="item.modlueId == '2.2'" />
            <electricityUser ref="electricityUser" v-if="item.modlueId == '2.3'" />
            <sellElectricityPower ref="sellElectricityPower" v-if="item.modlueId == '3.1'"/>
            <sellElectricityElectricity ref="sellElectricityElectricity" v-if="item.modlueId == '3.2'"/>
            <sellElectricityUser ref="sellElectricityUser" v-if="item.modlueId == '3.3'"/>
            <span class="text">{{ $t(item.disc.split(",")[0]) }}</span>
            <el-dropdown class="size">
              <div class="icon_rank"><i class="el-icon-rank"></i></div>
              <el-dropdown-menu
                slot="dropdown"
                v-if="item.modlueId == '1.1' 
                || item.modlueId == '1.2' 
                || item.modlueId == '2.2'
                || item.modlueId == '2.3'
                || item.modlueId == '3.2'
                || item.modlueId == '3.3'"
              >
                <el-dropdown-item
                  command="a"
                  @click.native="drop(10, 2, item.modlueId, '180')"
                  >{{$t('ytlPage.Small')}}</el-dropdown-item
                >
                <el-dropdown-item
                  command="b"
                  @click.native="drop(15, 3, item.modlueId, '270')"
                  >{{$t('ytlPage.Medium')}}
                </el-dropdown-item>
                <el-dropdown-item
                  command="c"
                  @click.native="drop(20, 4, item.modlueId, '380')"
                  >{{$t('ytlPage.Large')}}
                </el-dropdown-item>
              </el-dropdown-menu>
              <el-dropdown-menu
                slot="dropdown"
                v-if="
                  item.modlueId == '1.3' ||
                  item.modlueId == '1.4' ||
                  item.modlueId == '2.1' ||
                  item.modlueId == '3.1' 
                "
              >
                <el-dropdown-item
                  command="a"
                  @click.native="drop(10, 4, item.modlueId, '150')"
                  >{{$t('ytlPage.Small')}}</el-dropdown-item>
                <el-dropdown-item
                  command="b"
                  @click.native="drop(15, 6, item.modlueId, '250')"
                  >{{$t('ytlPage.Large')}}</el-dropdown-item>
              </el-dropdown-menu>
              <el-dropdown-menu slot="dropdown" v-if="item.modlueId == '1.5'">
                <el-dropdown-item
                  command="a"
                  @click.native="drop(20, 2, item.modlueId, '50')"
                  >{{$t('ytlPage.Small')}}</el-dropdown-item>
                <el-dropdown-item
                  command="b"
                  @click.native="drop(30, 3, item.modlueId, '120')"
                  >{{$t('ytlPage.Large')}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span class="remove" @click="removeItem(item.i)">
              <i
                class="el-icon-remove-outline"
                style="font-size: 18px; color: red"
              ></i>
            </span>
          </grid-item>
        </grid-layout>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import leftTree from "../child/left-tree.vue";
import { GridLayout, GridItem } from "vue-grid-layout";
// 模块引入
import communication from "../module/communication.vue";
import dataIntegrityrate from "../module/dataIntegrityrate.vue";
import meterType from "../module/meterType.vue";
import communicationType from "../module/communicationType.vue";
import meterNumber from "../module/meter_number.vue";
import electricityConsumption from "../module/electricity_consumption.vue";
import sellElectricityPower from "../module/sell_electricity_power.vue";
import electricityElectricity from "../module/electricity_electricity.vue";
import electricityUser from "../module/electricity_user.vue"
import sellElectricityElectricity from "../module/sell_electricity_electricity.vue"
import sellElectricityUser from "../module/sell_electricity_user.vue"
export default {
  components: {
    leftTree,
    GridLayout,
    GridItem,
    communication,
    dataIntegrityrate,
    meterType,
    communicationType,
    meterNumber,
    electricityConsumption,
    sellElectricityPower,
    electricityElectricity,
    electricityUser,
    sellElectricityElectricity,
    sellElectricityUser
  },
  name: "editHome",
  data() {
    return {
      layout: [],
      draggable: true,
      resizable: false,
      isAutoSize: false,
      colNum: 12,
      index: 0,
      modulesIndex: null,
      menuList: [],
      id: null,
      config: [],
      reqData: [],
      Size: null,
      Size1: null,
      Size2: null,
      Size3: null,
      Size4: null,
      Size5: null,
      Size6: null,
      Size7: null,
      Size8: null,
      Size9: null,
      Size10: null,
      Width: null,
    };
  },
  mounted() {},
  watch: {},
  methods: {
    ...mapActions({
      myHomePageupdata: "My_Home_Pageupdata", //更新
      MyHomePagegetInfo: "My_Home_PagegetInfo", //查询
    }),
    addItem(e) {
      this.Size = "180";
      this.Size1 = "180";
      this.Size2 = "150";
      this.Size3 = "150";
      this.Size4 = "50";
      this.Size5 = "120";
      this.Size6 = "120";
      this.Size7 = "180";
      this.Size8 = "180";
      this.Size9 = "180";
      this.Size10 = "180";
      if (
        e.value != "1" &&
        e.value != "1-1" &&
        e.value != "1-2" &&
        e.value != "1-3" &&
        e.value != "1-4" &&
        e.value != "1-5" &&
        e.value != "1-6" &&
        e.value != "1-7" &&
        e.value != "1-8" &&
        e.value != "2" &&
        e.value != "2-1" &&
        e.value != "2-1-1" &&
        e.value != "2-1-2" &&
        e.value != "2-1-3" &&
        e.value != "2-1-4" &&
        e.value != "2-1-5" &&
        e.value != "3-1" &&
        e.value != "3-1-1" &&
        e.value != "3-1-2" &&
        e.value != "3-1-3" &&
        e.value != "4-1" &&
        e.value != "4-1-1" &&
        e.value != "4-1-2" &&
        e.value != "4-1-3" &&
        e.value != "4-1-4"
      ) {
        let flag1 = this.menuList.find((i) => i.modlueId == e.value);
        if (flag1) {
          this.menuList = this.menuList.filter((ele) => ele != flag1);
        } else {
          if (this.menuList.length < 5) {
            this.menuList.push({
              disc: e.label + "," + e.route,
              modlueId: e.value,
              type: 1,
            });
          } else {
            this.menuList.splice(this.menuList.length - 1, 1);
            this.menuList.push({
              disc: e.label + "," + e.route,
              modlueId: e.value,
              type: 1,
            });
          }
        }
      }
      let flag = this.layout.find((cur) => cur.modlueId == e.modlueId);
      if (flag) {
        // 把这个数组变成去除掉id相同的这一项
        this.layout = this.layout.filter((ele) => ele != flag);
      } else {
        if (e.value == "2-1-1") {
          this.layout.push({
            x: 0,
            y: 0,
            w: 2,
            h: 10,
            static: false,
            modlueId: 1.1,
            i: "0",
            disc: 'ytlMeterReading.meterType',
            type: 0,
          });
        }
        if (e.value == "2-1-2") {
          this.layout.push({
            x: 2,
            y: 0,
            w: 2,
            h: 10,
            static: false,
            modlueId: 1.2,
            i: "1",
            disc: 'ytlPage.CommunicationTypeelectricMeter',
            type: 0,
          });
        }
        if (e.value == "2-1-3") {
          this.layout.push({
            x: 0,
            y: 2,
            w: 4,
            h: 10,
            static: false,
            modlueId: 1.3,
            i: "7",
            disc: 'ytlPowerSale.numberMeters2',
            type: 0,
          });
        }
        if (e.value == "2-1-4") {
          this.layout.push({
            x: 4,
            y: 0,
            w: 4,
            h: 10,
            static: false,
            modlueId: 1.4,
            i: "3",
            disc: 'ytlMeterReading.communicationSuccessRate',
            type: 0,
          });
        }
        if (e.value == "2-1-5") {
          this.layout.push({
            x: 8,
            y: 0,
            w: 2,
            h: 20,
            static: false,
            modlueId: 1.5,
            i: "4",
            disc: 'ytlMeterReading.dataIntegrityRate',
            type: 0,
          });
        }
        if (e.value == "3-1-1") {
          this.layout.push({
            x: 4,
            y: 5,
            w: 4,
            h: 10,
            static: false,
            modlueId: 2.1,
            i: "5",
            disc: 'ytlMeterReading.trendanalysis',
            type: 0,
          });
        }
        if (e.value == "3-1-2") {
          this.layout.push({
            x: 4,
            y: 5,
            w: 2,
            h: 10,
            static: false,
            modlueId: 2.2,
            i: "9",
            disc: 'ytlPage.ElectricitymeterNumber',
            type: 0,
          });
        }
        if (e.value == "3-1-3") {
          this.layout.push({
            x: 4,
            y: 5,
            w: 2,
            h: 10,
            static: false,
            modlueId: 2.3,
            i: "10",
            disc: 'ytlPage.NumberofelectricityUsers',
            type: 0,
          });
        }
        if (e.value == "4-1-1") {
          this.layout.push({
            x: 4,
            y: 6,
            w: 4,
            h: 10,
            static: false,
            modlueId: 3.1,
            i: "8",
            disc: 'ytlMeterReading.trendanalysis',
            type: 0,
          });
        }
        if (e.value == "4-1-2") {
          this.layout.push({
            x: 6,
            y: 5,
            w: 2,
            h: 10,
            static: false,
            modlueId: 3.2,
            i: "11",
            disc: 'ytlPage.NumberofelectricitymetersSold',
            type: 0,
          });
        }
        if (e.value == "4-1-3") {
          this.layout.push({
            x: 6,
            y: 6,
            w: 2,
            h: 10,
            static: false,
            modlueId: 3.3,
            i: "12",
            disc: 'ytlPage.NumberofsoldelectricityUsers',
            type: 0,
          });
        }
      }
    },
    removeMenu(val) {
      // console.log(this.menuList);
      const index = this.menuList.map((item) => item.modlueId).indexOf(val);
      this.menuList.splice(index, 1);
    },
    removeItem(val) {
      const index = this.layout.map((item) => item.i).indexOf(val);
      this.layout.splice(index, 1);
    },
    alterSize(e) {},
    SizeAutoChange(e) {},
    drop(width, height, e, isSize) {
      this.index = e;
      this.layout.forEach((item) => {
        if (item.modlueId == "1.1" && this.index == "1.1") {
          this.$refs.meterType[0].isvHeight = isSize;
          item.h = width;
          item.w = height;
        }
        if (item.modlueId == "1.2" && this.index == "1.2") {
          this.$refs.communicationType[0].isvHeight = isSize;
          item.h = width;
          item.w = height;
        }
        if (item.modlueId == "1.3" && this.index == "1.3") {
          this.$refs.meterNumber[0].isvHeight = isSize;
          item.h = width;
          item.w = height;
        }
        if (item.modlueId == "1.4" && this.index == "1.4") {
          this.$refs.communication[0].isvHeight = isSize;
          item.h = width;
          item.w = height;
        }
        if (item.modlueId == "1.5" && this.index == "1.5") {
          this.$refs.dataIntegrityrate[0].isvHeight = isSize;
          item.h = width;
          item.w = height;
        }
        if (item.modlueId == "2.1" && this.index == "2.1") {
          this.$refs.electricityConsumption[0].isvHeight = isSize;
          item.h = width;
          item.w = height;
        }
        if (item.modlueId == "2.2" && this.index == "2.2") {
          this.$refs.electricityElectricity[0].isvHeight = isSize;
          item.h = width;
          item.w = height;
        }
         if (item.modlueId == "2.3" && this.index == "2.3") {
          this.$refs.electricityUser[0].isvHeight = isSize;
          item.h = width;
          item.w = height;
        }
        if (item.modlueId == "3.1" && this.index == "3.1") {
          this.$refs.sellElectricityPower[0].isvHeight = isSize;
          item.h = width;
          item.w = height;
        }
        if (item.modlueId == "3.2" && this.index == "3.2") {
          this.$refs.sellElectricityElectricity[0].isvHeight = isSize;
          item.h = width;
          item.w = height;
        }
        if (item.modlueId == "3.3" && this.index == "3.3") {
          this.$refs.sellElectricityUser[0].isvHeight = isSize;
          item.h = width;
          item.w = height;
        }
      });
    },
    movedEvent(i, newX, newY) {
      // console.log("MOVED i=" + i + ", X=" + newX + ", Y=" + newY);
    },
    layoutUpdatedEvent(e) {
      this.config = e;
    },
    save() {
      this.reqData = this.config.concat(this.menuList);
      this.myHomePageupdata({ config: this.reqData }).then((res) => {
        if (res.success === 1) {
          this.$message.success(this.$t('ytlPowerUsed.modifiedSuccessfully'));
          this.$parent.active = 1;
          this.$parent.getModuleList();
        }
      });
    },
    // getModuleData() {
    //   this.MyHomePagegetInfo({}).then((res) => {
    //     if (res.success === 1) {
    //       this.menuList = res.data.moduleResult;
    //       this.layout = res.data.mune;
    //       this.$nextTick(() => {
    //         this.isEchortsSize();
    //       });
    //     }
    //   });
    // },
    isEchortsSize() {
      this.layout.forEach((item) => {
        if (item.modlueId == 1.1) {
          if (item.w == 4 && item.h == 20) {
            this.Size = "380";
          } else if (item.w == 3 && item.h == 15) {
            this.Size = "270";
          } else if (item.w == 2 && item.h == 10) {
            this.Size = "180";
          }
        }
        if (item.modlueId == 1.2) {
          if (item.w == 4 && item.h == 20) {
            this.Size1 = "380";
          } else if (item.w == 3 && item.h == 15) {
            this.Size1 = "270";
          } else if (item.w == 2 && item.h == 10) {
            this.Size1 = "180";
          }
        }
        if (item.modlueId == 1.3) {
          if (item.w == 6 && item.h == 15) {
            this.Size3 = "250";
          } else {
            this.Size3 = "150";
          }
        }
        if (item.modlueId == 1.4) {
          if (item.w == 6 && item.h == 15) {
            this.Size2 = "250";
          } else {
            this.Size2 = "150";
          }
        }
        if (item.modlueId == 1.5) {
          if (item.w == 2 && item.h == 20) {
            this.Size4 = "50";
          } else {
            this.Size4 = "120";
          }
        }
        if (item.modlueId == 2.1) {
          if (item.w == 6 && item.h == 15) {
            this.Size5 = "250";
          } else {
            this.Size5 = "150";
          }
        }
        if (item.modlueId == 2.2) {
          if (item.w == 4 && item.h == 20) {
            this.Size7 = "380";
          } else if (item.w == 3 && item.h == 15) {
            this.Size7 = "270";
          } else if (item.w == 2 && item.h == 10) {
            this.Size7 = "180";
          }
        }
        if (item.modlueId == 2.3) {
          if (item.w == 4 && item.h == 20) {
            this.Size8 = "380";
          } else if (item.w == 3 && item.h == 15) {
            this.Size8 = "270";
          } else if (item.w == 2 && item.h == 10) {
            this.Size8 = "180";
          }
        }
        if (item.modlueId == 3.1) {
          if (item.w == 6 && item.h == 15) {
            this.Size6 = "250";
          } else {
            this.Size6 = "150";
          }
        }
         if (item.modlueId == 3.2) {
          if (item.w == 4 && item.h == 20) {
            this.Size9 = "380";
          } else if (item.w == 3 && item.h == 15) {
            this.Size9 = "270";
          } else if (item.w == 2 && item.h == 10) {
            this.Size9 = "180";
          }
        }
        if (item.modlueId == 3.3) {
          if (item.w == 4 && item.h == 20) {
            this.Size10 = "380";
          } else if (item.w == 3 && item.h == 15) {
            this.Size10 = "270";
          } else if (item.w == 2 && item.h == 10) {
            this.Size10 = "180";
          }
        }
      });
    },
    backReturn (){
      this.$parent.active = 1
    }
  },
  activated() {},
  deactivated() {},
  destroyed() {},
};
</script>
<style lang='less' scoped>
.layoutJSON {
  background: #f0f2f5;
  height: 36px;
  .layoutItem {
    float: left;
    height: 36px;
    background: #ffffff;
    border-left: 0.5px solid #b9b5b5;
    margin-left: -1px;
  }
  span {
    margin-left: 20px;
    line-height: 36px;
  }
  i {
    margin-left: 10px;
    color: red;
    font-size: 16px;
  }
  i:hover {
    cursor: pointer;
  }
  .save {
    width: 80px;
    height: 25px;
    margin-top: 4px;
    border-radius: 8px;
    color: #ffffff;
    border: none;
    position: absolute;
    right: 30px;
    font-size: 14px;
    line-height: 8px;
  }
  .back {
    width: 94px;
    height: 28px;
    margin-top: 4px;
    background: #57b8ff;
    border-radius: 4px;
    color: #ffffff;
    border: none;
    position: absolute;
    right: 150px;
    font-size: 12px;
    line-height: 10px;
  }
}
</style>
<style>
.remove {
  position: absolute;
  right: 10px;
  top: 5px;
  cursor: pointer;
  z-index: 1;
}
.size {
  position: absolute;
  right: 30px;
  top: 2px;
  z-index: 1;
  cursor: pointer;
}
.icon_rank {
  font-size: 18px;
  color: var(--theme_bg_color);
  margin-right: 5px;
}
.vue-grid-layout {
  background: #ffffff;
}
.vue-grid-item:not(.vue-grid-placeholder) {
  background: #ffffff;
  border: 1px solid #b9b5b5;
  overflow: hidden;
}
.vue-grid-item .resizing {
  opacity: 0.9;
}
.vue-grid-item .static {
  background: #cce;
}
.vue-grid-item .text {
  font-size: 14px;
  font-weight: 700;
  color: #707070;
  position: absolute;
  top: 15px;
  bottom: 0;
  left: 10px;
  margin: auto;
  height: 100%;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
}
.vue-grid-item .no-drag {
  height: 100%;
  width: 100%;
}
.vue-grid-item .minMax {
  font-size: 12px;
}
/* .vue-grid-item .add {
    cursor: pointer;
} */
.vue-draggable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  left: 0;
  background-position: bottom right;
  padding: 0 8px 8px 0;
  background-repeat: no-repeat;
  background-origin: content-box;
  box-sizing: border-box;
  cursor: pointer;
}
.right_grid {
  border: 0.5px solid #b9b5b5;
  width: 1350px;
  position: absolute;
  top: 10px;
  left: 265px;
  /* height: 1350px; */
  height: 99%;
}
</style>