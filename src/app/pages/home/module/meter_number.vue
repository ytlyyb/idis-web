  <template>
  <!-- 电表数量-->
  <div class="box">
    <div class="meter_amount_box">
      <my-echarts
        ref="myEcharts"
        :width="'100%'"
        :vHeight="isvHeight"
        :options="optMeterAmount"
        class="eacharts_meter"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import mixinF from "../../../common/tools/func_mixin";
import MyEcharts from "../../../components/my-echarts/my-echarts.vue";
export default {
  mixins: [mixinF],
  components: {
    MyEcharts,
  },
  name: "Echarts",
  data() {
    return {
      isvHeight: "250",
      optMeterAmount: {},
      req: {
        objectId: 6,
      },
    };
  },
  watch: {
    isvHeight(val) {
      this.$refs.myEcharts.chartStyle.height = this.isvHeight / 192 + "rem";
    },
  },
  created() {},
  mounted() {
     this.iGetReadByCommandta();
  },
  methods: {
    ...mapActions({
      // getSta: "PowerMeterLast_GetSta",
      mianPagePowerMeterLastGetSta:"mianPage_PowerMeterLastGetSta"
    }),
    iGetReadByCommandta() {
      this.req.objectId = sessionStorage.getItem("accountId");
      this.mianPagePowerMeterLastGetSta(this.req).then((res) => {
        if (res.success === 1) {
          this.setMeterAmount(res.data.factoryList)
          this.isvHeight = this.$parent.$parent.$parent.Heights3 || this.$parent.$parent.$parent.Size3
        }
      });
    },
    clear() {
      this.dataList = [];
    },
    setMeterAmount(data) {
      //处理数据
      let axisList = [],
        dataList = [];
      if (data.length > 0)
        data.forEach((elem) => {
          axisList.push(elem.name);
          dataList.push(elem.total);
        });
      else {
        //空数据预处理
        axisList.push(this.$t("ytlMeterReading.none"));
        dataList.push(0);
      }
      let tempInterval;
      tempInterval = this.getInterval(dataList);
      //赋值
      this.optMeterAmount = {
        tooltip: {
          trigger: "item",
        },
        color: ["#57B8FF"],
        grid: {
          left: "5%",
          right: "5%",
          bottom: "10%",
          top: "20%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: axisList,
          axisLine: {
            lineStyle: {
              color: "rgba(65,97,128,0.45);",
            },
          },
          axisTick: {
            show: false, // 是否显示坐标轴刻度
          },
        },
        yAxis: {
          type: "value",
          min: tempInterval.min,
          max: tempInterval.max,
          interval: tempInterval.interval,
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
            },
          },
        },
        series: [
          {
            barWidth: "50",
            data: dataList,
            type: "bar",
          },
        ],
      };
      let style = localStorage.getItem("style");
      if (style == 1) {
        this.optMeterAmount.color = "#57B8FF"
      } else if (style == 2) {
        this.optMeterAmount.color = "#FF6633"
      }
    },
    getInterval(data) {
      //获得max min 判断min 0
      let getNumber = (data) => {
        let maxValue = 0,
          minValue = 0;
        for (const key in data) {
          if (data[key] > maxValue) maxValue = data[key];
          if (data[key] < minValue) minValue = data[key];
        }
        return { maxValue, minValue };
      };
      let min, max, distance, obj;
      obj = getNumber(data);
      if (obj.minValue > 0) obj.minValue = 0;
      min = obj.minValue;
      max = obj.maxValue;
      distance = parseInt(((max - min) / 3).toString(), 10);
      return {
        max: 3 * distance + min + 3,
        min,
        interval: distance + 1,
      };
    },
  },
};
</script>
<style lang="less" scoped>
.box {
  margin-top: 30px;
  border-top: 1px solid #dcdfe6;
  .meter_amount_box {
    margin-top: 10px;
    .eacharts_meter {
      position: relative;
      z-index: 1;
    }
  }
}
</style>
