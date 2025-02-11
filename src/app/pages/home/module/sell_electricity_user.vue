<template>
  <div class="contents1">
    <div class="ammeter">
      <my-echarts class="tiao_user" ref="myEcharts" :width="'100%'"
        :vHeight="isvHeight" :options="typeUser" />
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
      typeUser: {},
      offCount: null, //断电
      onCount: null, //通电
    };
  },
  created() {},
  mounted() {
    this.pieUser();
    this.getDataList();
  },
  methods: {
    ...mapActions({
      SellElectricityMeters: "Sell_electricity_meters",
    }),
    getDataList() {
      this.SellElectricityMeters({}).then((res) => {
        if (res.success == 1) {
          this.offCount = res.data.offCount;
          this.onCount = res.data.onCount;
          this.isvHeight = this.$parent.$parent.$parent.Heights10 || this.$parent.$parent.$parent.Size10
          this.typeUser.series[0].data[0].value = res.data.onCount;
          this.typeUser.series[0].data[1].value = res.data.offCount;
        }
      });
    },
    pieUser() {
      let that = this;
      this.typeUser = {
        color: ["#FBB57E", "#E6A23C"],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "center",
          bottom: -5,
          formatter(name) {
            let datas = that.typeUser.series[0].data;
            let tarValues;
            for (let i = 0; i < datas.length; i++) {
              if (datas[i].name === name) {
                tarValues = datas[i].value;
              }
            }
            return name + "(" + tarValues + ")";
          },
        },
        series: [
          {
            name: this.$t("ytlMeterReading.usernumber"),
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
                name: this.$t("ytlPowerUsed.electrify"),
                value: 2,
              },
              {
                name: this.$t("ytlPowerUsed.powerFailure"),
                value: 3,
              },
            ],
          },
        ],
      };
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
  .tiao_user{
    position: relative;
    z-index: 1;
  }
}
</style>
