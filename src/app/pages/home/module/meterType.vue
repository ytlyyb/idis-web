<template>
  <!-- 电表类型 -->
  <div class="main_left_top">
    <div class="meter_type">
      <my-echarts
        ref="myEcharts"
        :width="'100%'"
        :vHeight="isvHeight"
        :options="typeOption"
        class="eacharts_meter"
      />
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import MyEcharts from "../../../components/my-echarts/my-echarts.vue";
import mixinF from "../../../common/tools/func_mixin";
export default {
  mixins: [mixinF],
  components: { MyEcharts },
  data() {
    return {
      isvHeight: '180',
      //#region 电表类型
      typeOption: {},
      linkData: [],
      //#endregion
      meterTotal: 0,
      colorBool: true,
      currentId: 6,
      Width:null,
    };
  },
  created() {},
  mounted() {
    this.iGetSta();
  },
  methods: {
    //#region 接口
    ...mapActions({
      getSta: "PowerMeterLast_GetSta",
    }),
    //获取电表接入最新数据
    iGetSta() {
      this.getSta({ objectId: this.currentId }).then((res) => {
        if (res.success === 1) {
          this.reUpdate(res.data);
          this.isvHeight = this.$parent.$parent.$parent.Heights || this.$parent.$parent.$parent.Size
        }
      });
    },
    clear() {
      this.linkData = [];
      this.meterTotal = 0;
    },
    reUpdate(res) {
      //初始化
      this.clear();
      //单三相
      let tempOneTotal = 0,
        tempThreeTotal = 0;
      //表计总数
      let tempMeterTotal = res.meterTotal;
      //电表数量统计
      let tempMeterAmount = [];
      /**排序 */
      let tempSort = (list) => {
        let tempMax;
        for (let i = 0; i < list.length; i++) {
          for (let j = i + 1; j < list.length; j++) {
            if (list[i].value < list[j].value) {
              tempMax = list[i];
              list[i] = list[j];
              list[j] = tempMax;
            }
          }
        }
      };
      res.phaseList.forEach((elem) => {
        elem.id === 1
          ? (tempOneTotal = elem.total)
          : (tempThreeTotal = elem.total);
      });
      res.commList.forEach((elem) => {
        //通讯类型
        this.linkData.push({
          name: elem.name,
          value: elem.total,
        });
      });
      res.factoryList.forEach((elem) => {
        //电表数量统计
        tempMeterAmount.push({
          name: elem.name,
          value: elem.total,
        });
      });
      //不同通讯类型电表 排序
      tempSort(this.linkData);

      //#region 赋值
      //图标设置 电表类型
      this.setTypeOptions(
        [
          { value: tempOneTotal, name: this.$t("ytlMeterReading.singlePhase") },
          {
            value: tempThreeTotal,
            name: this.$t("ytlMeterReading.threePhase"),
          },
        ],
        tempOneTotal + tempThreeTotal
      );
      this.meterTotal = tempMeterTotal;
    },
    /**图标设置 电表类型 */
    setTypeOptions(data, total) {
      let that = this;
      let tempUnit = this.$t("ytlMeterReading.unitZ");
      this.typeOption = { 
        tooltip: {
          trigger: "item",
        },
        color: ["#8BC8FF", "#A4E486"],
        series: [
          {
            name: "",
            type: "pie",
            radius: "70%",
            data: data,
            label: {
              position: "inner",
              color: "#333",
              formatter: (a) => {
                if (total == 0) return "0%";
                return (
                  ((parseFloat(a.data.value) / total) * 100).toFixed(0) + "%"
                );
              },
            },
          },
          {
            name: "",
            type: "pie",
            radius: "70%",
            data: data,
            // label: {
            //   show:false,
            //   alignTo: "edge",
            //   formatter: (a, b, c) => {
            //     return (
            //       "{name|" +
            //       a.data.name +
            //       "}\n{time|" +
            //       a.data.value +
            //       tempUnit +
            //       "}"
            //     );
            //   },
            //   minMargin: 5,
            //   edgeDistance: 20,
            //   lineHeight: 18,
            //   rich: {
            //     name: {
            //       fontSize: 12,
            //       color: "#2C3542",
            //     },
            //     time: {
            //       fontSize: 11,
            //       color: "#2C3542",
            //     },
            //   },
            // },
            labelLayout: function (params) {
              const isLeft = params.labelRect.x < 190;
              const points = params.labelLinePoints;
              // Update the end point.
              points[2][0] = isLeft
                ? params.labelRect.x
                : params.labelRect.x + params.labelRect.width;
              return {
                labelLinePoints: points,
              };
            },
          },
        ],
      };
      let style = localStorage.getItem("style");
      if (style == 1) {
        that.typeOption.color = ["#8BC8FF", "#A4E486"];
      } else if (style == 2) {
        that.typeOption.color = ["#FF6633", "#FEC85F"];
      }
    },
  },
  computed: {},
  watch: {
    isvHeight(val) {
      // console.log("jhk", val);
      this.$refs.myEcharts.chartStyle.height = this.isvHeight / 192 + "rem";
    },
  },
  filters: {},
  //keepAlive
  activated() {},
  deactivated() {},
  updated() {},
  destroyed() {},
};
</script>
<style lang='less' scoped>
.main_left_top {
  margin-top: 30px;
  border-top: 1px solid #dcdfe6;
}
.meter_type {
  margin: 0 auto;
  margin-top: -10px;
}
.eacharts_meter {
  position: relative;
  z-index: 1;
}
</style>