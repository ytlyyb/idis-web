<template>
  <div>
    <edit-home ref="editHome" v-show="active == 2" />
    <div class="contents" v-show="active == 1">
      <div class="menu">
        <div class="menu_item">
          <span
            v-for="item in this.menuList"
            :key="item.modlueId"
            @click="onClick(item.disc)"
          >
            <div class="Item_disc">{{ $t(item.disc.split(",")[0]) }}</div>
          </span>
        </div>
        <el-button type="primary" class="btn" icon="el-icon-edit-outline" @click="edit"
          >{{ $t('ytlPage.edit1') }}</el-button>
      </div>
      <div>
        <grid-layout
          :layout.sync="layout"
          :col-num="colNum"
          :row-height="10"
          :col-width="10"
          :is-draggable="draggable"
          :is-resizable="resizable"
          :vertical-compact="true"
          :use-css-transforms="true"
          autoSize
        >
          <grid-item
            v-for="item in layout"
            :x="item.x"
            :y="item.y"
            :w="item.w"
            :h="item.h"
            :i="item.i"
            :key="item.i"
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
            <span class="text">{{ $t( item.disc) }}</span>
          </grid-item>
        </grid-layout>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { GridLayout, GridItem } from "vue-grid-layout";
import editHome from "./editHome.vue";
import communication from "../module/communication.vue";
import dataIntegrityrate from "../module/dataIntegrityrate.vue";
import meterNumber from "../module/meter_number.vue";
import meterType from "../module/meterType.vue";
import communicationType from "../module/communicationType.vue";
import electricityConsumption from "../module/electricity_consumption.vue";
import sellElectricityPower from "../module/sell_electricity_power.vue"
import electricityElectricity from "../module/electricity_electricity.vue"
import electricityUser from "../module/electricity_user.vue"
import sellElectricityElectricity from "../module/sell_electricity_electricity.vue"
import sellElectricityUser from "../module/sell_electricity_user.vue"
export default {
  name: "homePage",
  components: {
    editHome,
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
  data() {
    return {
      draggable: false,
      resizable: false,
      colNum: 12,
      active: 1,
      menuList: null,
      layout: [],
      Heights: null,
      Heights1: null,
      Heights2: null,
      Heights3: null,
      Heights4: null,
      Heights5: null,
      Heights6: null,
      Heights7: null,
      Heights8: null,
      Heights9: null,
      Heights10: null,
    };
  },
  created() {},
  mounted() {
    this.getModuleList();
  },
  watch: {},
  methods: {
    ...mapActions({
      MyHomePagegetInfo: "My_Home_PagegetInfo", //查询
    }),
    getModuleList() {
      this.MyHomePagegetInfo({}).then((res) => {
        if (res.success === 1) {
          this.menuList = res.data.moduleResult;
          this.layout = res.data.mune;
          this.isEchortsSize();
          setTimeout(() => {
            this.ismodLueID()
          }, 100);
        }
      });
    },
    edit() {
      this.active = 2;
      // this.$refs.editHome.getModuleData();
    },
    onClick(e) {
      let roter = e.split(",")[1];
      this.$router.push(roter);
    },
    ismodLueID(){
      let flag = this.layout.find((item)=> item.modlueId == 1.1);
      let flag1 = this.layout.find((item)=> item.modlueId == 1.2);
      let flag2 = this.layout.find((item)=> item.modlueId == 1.3);
      let flag3 = this.layout.find((item)=> item.modlueId == 1.4);
      let flag4 = this.layout.find((item)=> item.modlueId == 1.5);
      let flag5 = this.layout.find((item)=> item.modlueId == 2.1);
      let flag7 = this.layout.find((item)=> item.modlueId == 2.2);
      let flag8 = this.layout.find((item)=> item.modlueId == 2.3);
      let flag9 = this.layout.find((item)=> item.modlueId == 3.1);
      let flag10 = this.layout.find((item)=> item.modlueId == 3.2);
      let flag11 = this.layout.find((item)=> item.modlueId == 3.3);
      if(flag){
        this.$refs.meterType[0].iGetSta()
      } 
      if(flag1){
        this.$refs.communicationType[0].iGetSta()
      }
      if(flag2){
        this.$refs.meterNumber[0].iGetReadByCommandta()
      }
      if(flag3){
        this.$refs.communication[0].iGetReadByCommandta()
      }
      if(flag4){
        this.$refs.dataIntegrityrate[0].iGetDataByCommand()
      }
      if(flag5){
        this.$refs.electricityConsumption[0].onPowerConsumption()
      }
      if(flag7){
        this.$refs.electricityElectricity[0].ammeterStatistics()
      }
      if(flag8){
        this.$refs.electricityUser[0].ammeterStatistics()
      }
      if(flag9){
        this.$refs.sellElectricityPower[0].getEarningsData()
      }
      if(flag10){
        this.$refs.sellElectricityElectricity[0].getDataList()
      }
      if(flag11){
        this.$refs.sellElectricityUser[0].getDataList()
      }
    },
    isEchortsSize() {
      this.layout.forEach((item) => {
        if (item.modlueId == 1.1) {
          if (item.w == 4 && item.h == 20) {
            this.Heights = "380";
          } else if (item.w == 3 && item.h == 15) {
            this.Heights = "270";
          } else if (item.w == 2 && item.h == 10) {
            this.Heights = "180";
          }
        }
        if (item.modlueId == 1.2) {
          if (item.w == 4 && item.h == 20) {
            this.Heights1 = "380";
          } else if (item.w == 3 && item.h == 15) {
            this.Heights1 = "270";
          } else if (item.w == 2 && item.h == 10) {
            this.Heights1 = "180";
          }
        }if(item.modlueId == 1.3){
          if (item.w == 6 && item.h == 15) {
            this.Heights3 = "250";
          } else  {
            this.Heights3 = "150";
          }
        }
        if(item.modlueId == 1.4){
          if (item.w == 6 && item.h == 15) {
            this.Heights2 = "250";
          } else  {
            this.Heights2 = "150";
          }
        }
        if(item.modlueId == 1.5){
          if (item.w == 2 && item.h == 20) {
            this.Heights4 = "50";
          } else  {
            this.Heights4 = "140";
          }
        }
        if(item.modlueId == 2.1){
          if (item.w == 6 && item.h == 15) {
            this.Heights5 = "250";
          } else  {
            this.Heights5 = "150";
          }
        }
        if (item.modlueId == 2.2) {
          if (item.w == 4 && item.h == 20) {
            this.Heights7 = "380";
          } else if (item.w == 3 && item.h == 15) {
            this.Heights7 = "270";
          } else if (item.w == 2 && item.h == 10) {
            this.Heights7 = "180";
          }
        }
        if (item.modlueId == 2.3) {
          if (item.w == 4 && item.h == 20) {
            this.Heights8 = "380";
          } else if (item.w == 3 && item.h == 15) {
            this.Heights8 = "270";
          } else if (item.w == 2 && item.h == 10) {
            this.Heights8 = "180";
          }
        }
        if(item.modlueId == 3.1){
          if (item.w == 6 && item.h == 15) {
            this.Heights6 = "250";
          } else  {
            this.Heights6 = "150";
          }
        }
         if (item.modlueId == 3.2) {
          if (item.w == 4 && item.h == 20) {
            this.Heights9 = "380";
          } else if (item.w == 3 && item.h == 15) {
            this.Heights9 = "270";
          } else if (item.w == 2 && item.h == 10) {
            this.Heights9 = "180";
          }
        }
         if (item.modlueId == 3.3) {
          if (item.w == 4 && item.h == 20) {
            this.Heights10 = "380";
          } else if (item.w == 3 && item.h == 15) {
            this.Heights10 = "270";
          } else if (item.w == 2 && item.h == 10) {
            this.Heights10 = "180";
          }
        }
      });
    },
  },
  computed: {},
  filters: {},
  activated() {},
  deactivated() {},
  updated() {},
  destroyed() {},
};
</script>
<style lang='less' scoped>
.contents {
  border: 0.5px solid #b9b5b5;
  ul {
    li {
      float: left;
      list-style: none;
      background: #ffffff;
      border-left: 0.5px solid #b9b5b5;
    }
    p {
      font-weight: 400;
      font-size: 12px;
      color: #666666;
    }
  }
  .menu {
    height: 36px;
    line-height: 36px;
    background: #f0f2f5;
    .menu_item {
      height: 36px;
      span {
        text-align: center;
        cursor: pointer;
        font-size: 13px;
        .Item_disc {
          width: 130px;
          float: left;
          border-left: 1px solid #f0f2f5;
          background: #ffffff;
        }
      }
      span:hover {
        color:var(--theme_bg_color);
      }
    }
    .btn {
      width: 80px;
      height: 25px;
      position: absolute;
      right: 50px;
      top: 145px;
      font-size: 14px;
      padding: 0;
      line-height: 25px;
    }
  }
}
.vue-grid-item .text{
  /* color: var(--theme_bg_color); */
  width: 100%;
}
</style>
