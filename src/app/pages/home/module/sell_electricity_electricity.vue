<template>
  <div class="contents1">
    <div class="ammeter">
      <my-echarts class="tiao_ammeter"  ref="myEcharts" :width="'100%'"
        :vHeight="isvHeight" :options="typeAmmeter" />
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import MyEcharts from "../../../components/my-echarts/my-echarts.vue";
import mixinF from "../../../common/tools/menu_mixin";
import CmPageHead from "../../../components/title/cm-page-head.vue";
export default {
  name: "ammeterUserMap",
  mixins: [mixinF],
  components: { MyEcharts, CmPageHead },
  data() {
    return {
      isvHeight:'180',
      typeAmmeter: {},
      abnormalCommCount: null, //通讯异常表计数量
      normalCommCount: null, //通讯正常表计数量
      offCount: null, //断电
      onCount: null, //通电
    };
  },
  created() {},
  mounted() {
    this.pieAmmeter();
    this.getDataList();
  },
  methods: {
    ...mapActions({
      SellElectricityMeters: "Sell_electricity_meters",
    }),
    getDataList() {
      this.SellElectricityMeters({}).then((res) => {
        if (res.success == 1) {
          this.abnormalCommCount = res.data.abnormalCommCount;
          this.normalCommCount = res.data.normalCommCount;
          this.isvHeight = this.$parent.$parent.$parent.Heights9 || this.$parent.$parent.$parent.Size9
          this.typeAmmeter.series[0].data[0].value = res.data.normalCommCount;
          this.typeAmmeter.series[0].data[1].value = res.data.abnormalCommCount;
        }
      });
    },
    /**设置 电表数量统计 */
    pieAmmeter() {
      let that = this;
      this.typeAmmeter = {
        color: ["#7CD8FF", "#3A99DE"],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "center",
          bottom: -5,
          formatter(name) {
            let data = that.typeAmmeter.series[0].data;
            let tarValue;
            for (let i = 0; i < data.length; i++) {
              if (data[i].name === name) {
                tarValue = data[i].value;
              }
            }
            return name + "(" + tarValue + ")";
          },
        },
        series: [
          {
            name: this.$t("ytlMeterReading.numberMeters"),
            type: "pie",
            radius: "60%",
            label: {
              normal: {
                position: "inner",
                show: true,
                formatter: "{d}%",
                color: "#ffffff",
              },
            },
            itemStyle: {
              // normal: {
              //   // 设置扇形的阴影
              //   shadowBlur: 10,
              //   shadowColor: "rgba(0,0,0,0.4)",
              //   shadowOffsetX: -5,
              //   shadowOffsetY: 5,
              // },
            },
            data: [
              {
                name: this.$t("ytlMeterReading.Communicationnormal"),
                value: 10,
              },
              {
                name: this.$t("ytlMeterReading.Abnormalcommunication"),
                value: 15,
              },
            ],
          },
        ],
      };
      let style = localStorage.getItem("style");
      if (style == 1) {
        this.typeAmmeter.color = ["#8BC8FF", "#A4E486"];
      } else if (style == 2) {
        this.typeAmmeter.color = ["#FF6633", "#FEC85F"];
      }
    },
  },
  computed: {},
  watch: {
    isvHeight(val) {
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
<style lang="less" scoped>
.contents1 {
  margin-top: 30px;
  border-top: 1px solid #dcdfe6;
  .ammeter{
    margin-top: -30px;
  }
  .tiao_ammeter{
    position: relative;
    z-index: 1;
  }
}
</style>
