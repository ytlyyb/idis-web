<template>
  <div class="contents1">
     <div class="tiao">
      <my-echarts ref="myEcharts" class="tiao_optMeterAmount" :width="'100%'" :vHeight="isvHeight" :options="optMeterAmount" />
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import MyEcharts from "../../../components/my-echarts/my-echarts.vue";
import mixinF from "../../../common/tools/menu_mixin";
export default {
  name: "sellElectricityPower",
  mixins: [mixinF],
  components: { MyEcharts },
  data() {
    return {
      isvHeight:'150',
      optMeterAmount: {},
      typeAmmeter: {},
      typeUser:{},
      thisYearList:[],
      lastYearList:[],
    };
  },
  created() {},
  mounted() {
    this.getEarningsData();
    this.setMeterAmount();
  },
  methods: {
    ...mapActions({
       ProceedsContrast:'Proceeds_contrast'
    }),
    getEarningsData(){
      this.ProceedsContrast({}).then(res=>{
        if(res.success == 1){
          this.isvHeight = this.$parent.$parent.$parent.Heights6 || this.$parent.$parent.$parent.Size6
          res.data[0].forEach(item=>{
            this.thisYearList.push(item.income)
            this.optMeterAmount.series[0].data = this.thisYearList;
          })
          res.data[1].forEach(item=>{
            this.lastYearList.push(item.income)
            this.optMeterAmount.series[1].data = this.lastYearList
          })
        }
      })
    },
    /**设置 电表数量统计 */
     setMeterAmount() {
      this.optMeterAmount = {
        legend: {
          top: 5,
          left: 60,
          textStyle: {
            fontSize: 12,
          },
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "20%",
          top: "20%",
          containLabel: true,
        },
        tooltip: {
          trigger: "item",
        },
        xAxis: {
          type: "category",
          data: [this.$t('ytlMeterReading.january'), 
          this.$t('ytlMeterReading.february'), 
          this.$t('ytlMeterReading.march'),
          this.$t('ytlMeterReading.april'), 
          this.$t('ytlMeterReading.may'), 
          this.$t('ytlMeterReading.june'),
          this.$t('ytlMeterReading.july'),
          this.$t('ytlMeterReading.august'),
          this.$t('ytlMeterReading.september'),
          this.$t('ytlMeterReading.October'),
          this.$t('ytlMeterReading.November'),
          this.$t('ytlMeterReading.December')],
          axisTick: {
            show: false, // 是否显示坐标轴刻度
          },
          splitLine: {
            show: false,
            lineStyle: {
              type: "dashed",
              color: "#dcdfe6",
            },
          },
        },
        yAxis: {
          axisLine: {
            show: true, // 是否显示坐标轴轴线
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "#dcdfe6",
            },
          },
        },
        series: [
          {
            type: "bar",
            name: this.$t('ytlMeterReading.thisyear'),
            color: "#E6A23C",
            data: [],
            barWidth: "20px",
            itemStyle: {
              borderRadius: [4, 4, 0, 0]
            },
          },
          {
            type: "bar",
            name: this.$t('ytlMeterReading.lastyear'),
            color: "#57B8FF",
            data: [],
            barWidth: "20px",
            itemStyle: {
              borderRadius: [4, 4, 0, 0]
            },
          },
        ],
      };
      let style = localStorage.getItem("style");
      if (style == 1) {
        this.optMeterAmount.series[0].color = ["#E6A23C","#57B8FF"]
      } else if (style == 2) {
        this.optMeterAmount.series[1].color = ["#FF6633","#FEC85F"]
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
}
.tiao_optMeterAmount {
  margin-top: 20px;
}
</style>
