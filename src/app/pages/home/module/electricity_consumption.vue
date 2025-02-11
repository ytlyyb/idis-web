<template>
<!-- 用电趋势分析 -->
  <div class="contents1">
    <div class="radio_group">
      <el-radio-group
        class="cut"
        v-model="dataType"
        size="mini"
        @change="onPowerConsumption"
      >
        <el-radio-button label="2">{{
          this.$t("ytlPowerUsed.day")
        }}</el-radio-button>
        <el-radio-button label="3">{{
          this.$t("ytlPowerUsed.month")
        }}</el-radio-button>
      </el-radio-group>
    </div>
    <div class="echarts">
      <my-echarts
        ref="myEcharts"
        :width="'100%'"
        :vHeight="isvHeight"
        class="tiao_optMeterAmount"
        :options="optMeterAmount"
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
      isvHeight: '150',
      dataType: 2,
      optMeterAmount: {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: [],
          top: 5,
          left: 20,
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "20%",
          top: "20%",
          containLabel: true,
        },
        //柱形图和折线图相互切换
        toolbox: {
          right: 25,
          top: 0,
          show: true,
          feature: {
            magicType: { type: ["line", "bar"] },
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "time",
          axisTick: {
            show: false, // 是否显示坐标轴刻度
          },
          axisLabel: {
            formatter: "{yyyy}-{MM}-{dd} {hh}:{mm}:{ss}",
          },
          boundaryGap: ['0%', '1%'],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [],
            type: "bar",
          },
        ],
      },
    };
  },
  created() {},
  mounted() {
    this.onPowerConsumption();
  },
  methods: {
    ...mapActions({
      ElectricityConsumptionContrast: "Electricity_consumption_contrast", //用电量对比
    }),
    onPowerConsumption() {
      this.ElectricityConsumptionContrast({ dataType: this.dataType }).then(
        (res) => {
          if (res.success == 1) {
            // console.log(res);
            this.isvHeight = this.$parent.$parent.$parent.Heights5 || this.$parent.$parent.$parent.Size5
            this.dealEmptyCharts();
            this.dealShow(res.data);
          }
        }
      );
    }, //电表统计
    dealShow(data) {
      if (this.dataType == 2) {
        this.dealChartsB(data);
      } else {
        this.dealChartsA(data);
      }
      data.length == 0 && this.dealEmptyCharts();
    },
    dealCharts() {
      if (this.dataType == 2) {
        this.optMeterAmount.xAxis.axisLabel.formatter = "{d}";
      } else {
        this.optMeterAmount.xAxis.axisLabel.formatter = "{MMM}";
      }
    },
    dealChartsA(list) {
      this.dealCharts();
      this.optMeterAmount.legend.data = [
        this.$t("ytlMeterReading.thisyear"),
        this.$t("ytlMeterReading.lastyear"),
      ];
      this.optMeterAmount.series = [
        {
          data: [],
          type: "bar",
          symbol: "none",
          name: this.$t("ytlMeterReading.lastyear"),
        },
        {
          data: [],
          type: "bar",
          symbol: "none",
          name: this.$t("ytlMeterReading.thisyear"),
        },
      ];
      this.optMeterAmount.color = []
      let style = localStorage.getItem("style");
      if (style == 1) {
        this.optMeterAmount.color = ["#E6A23C","#57B8FF"]
      } else if (style == 2) {
        this.optMeterAmount.color = ["#FF6633","#FEC85F"]
      }
      list[0].map((item) => {
        this.optMeterAmount.series[0].data.push([item.dataTime, item.energy]);
      });
      let idx = 0;
      list[1].map((item) => {
        if (this.optMeterAmount.series[1].data[idx]) {
          this.optMeterAmount.series[1].data.push([
            this.optMeterAmount.series[0].data[idx][0],
            item.energy,
          ]);
          idx += 1;          
        }
      });
      this.optMeterAmount.series[1].data[0][0] =
      this.optMeterAmount.series[0].data[0][0];
    },
    dealChartsB(list) {
      this.dealCharts();
      this.optMeterAmount.legend.data = [
        this.$t("ytlPage.thismonth"),
        this.$t("ytlPage.lastmonth"),
      ];
      this.optMeterAmount.series = [
        {
          data: [],
          type: "bar",
          symbol: "none",
          name: this.$t("ytlPage.lastmonth"),
        },
        {
          data: [],
          type: "bar",
          symbol: "none",
          name: this.$t("ytlPage.thismonth"),
        },
      ];
      this.optMeterAmount.color = []
      let style = localStorage.getItem("style");
      if (style == 1) {
        this.optMeterAmount.color = ["#E6A23C","#57B8FF"]
      } else if (style == 2) {
        this.optMeterAmount.color = ["#FF6633","#FEC85F"]
      }
      list[0].map((item) => {
        this.optMeterAmount.series[0].data.push([item.dataTime, item.energy]);
      });
      let idx = 0;
      list[1].map((item) => {
        if (this.optMeterAmount.series[0].data[idx]) {
          this.optMeterAmount.series[1].data.push([
            this.optMeterAmount.series[0].data[idx][0],
            item.energy,
          ]);
          idx += 1;
        }
      });

      this.optMeterAmount.series[1].data[0][0] = this.optMeterAmount.series[0].data[0][0];
    },
    dealEmptyCharts() {
      this.dealCharts();
      let timeSeries;
      if (this.dataType == 0) {
        timeSeries = this.get1MonthArray();
      } else {
        timeSeries = this.get1YearArray();
      }
      this.optMeterAmount.series[0].data = timeSeries;
    },
    gen24HoursArray() {
      let hours24 = new Array();
      let i = 0;
      let now = this.getYMDHMS();
      now = now.split(" ")[0];
      let tm = `${now} 00:00:00`;
      for (; i < 25; i++) {
        let tm = `${now} ${i > 9 ? i : "0" + i}:00:00`;
        hours24.push([tm, ""]);
      }
      return hours24;
    },
    get1MonthArray() {
      let month1 = new Array();
      let dm = moment().endOf("month").format("D");
      let now = this.getYM();
      let tm = "";
      for (let i = 1; i <= dm; i++) {
        let tm = `${now}-${i > 9 ? i : "0" + i}`;
        month1.push([tm, ""]);
      }
      return month1;
    },
    get1MonthArray() {
      let month1 = new Array();
      let dm = moment().endOf("month").format("D");
      let now = this.getYM();
      let tm = "";
      for (let i = 1; i <= dm; i++) {
        let tm = `${now}-${i > 9 ? i : "0" + i}`;
        month1.push([tm, ""]);
      }
      return month1;
    },
    get1YearArray() {
      let year1 = new Array();
      let now = this.getY();
      let tm = "";
      for (let i = 1; i <= 12; i++) {
        let tm = `${now}-${i > 9 ? i : "0" + i}-01`;
        year1.push([tm, ""]);
      }
      return year1;
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
<style lang="less" scoped>
.contents1 {
  margin-top: 30px;
  border-top: 1px solid #dcdfe6;
  .radio_group {
    position: absolute;
    right: 30px;
    top: 40px;
    z-index: 1;
  }
  .echarts {
    position: relative;
    z-index: 1;
    top: 40px;
  }
}
</style>