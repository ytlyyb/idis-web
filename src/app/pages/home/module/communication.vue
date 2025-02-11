  <template>
  <!-- 通讯成功率 -->
  <div class="box">
    <div class="content">
      <div class="title_under">
        <div class="line_data">
          <span
            >{{ $t("ytlMeterReading.totalElectricityMeters") }}：{{
              totalMeter
            }}</span
          >
          <span class="ml22"
            >{{ $t("ytlMeterReading.differentConstant") }}：{{
              errorMeter
            }}</span
          >
        </div>
        <div class="tab_btn">
          <el-radio-group v-model="activeName" size="mini">
            <el-radio-button label="a">{{
              $t("ytlMeterReading.meterType")
            }}</el-radio-button>
            <el-radio-button label="b">{{
              $t("ytlMeterReading.companyClassification")
            }}</el-radio-button>
            <el-radio-button label="c">{{
              $t("ytlMeterReading.regionalClassification")
            }}</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="success_chart_box">
        <my-echarts
          ref="myEcharts"
          :options="optSuccessRate"
          :width="'100%'"
          :vHeight="isvHeight"
          class="eacharts_meter"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import MyEcharts from "../../../components/my-echarts/my-echarts.vue";
export default {
  components: {
    MyEcharts,
  },
  name: "Echarts",
  data() {
    return {
      isvHeight: "150",
      //电表总数：
      totalMeter: 0,
      //异常数：
      errorMeter: 0,
      activeName: "a",
      optSuccessRate: {},
      req: {
        cmd: 1,
        objectId: 1,
      },
    };
  },
  watch: {
    activeName(val) {
      if (val == "a") this.req.cmd = 1;
      else if (val == "b") this.req.cmd = 2;
      else this.req.cmd = 3;
      this.iGetReadByCommandta();
    },
    isvHeight(val) {
      this.$refs.myEcharts.chartStyle.height = this.isvHeight / 192 + "rem";
    },
  },
  created(){},
  mounted() {
    this.iGetReadByCommandta();
  },
  methods: {
    ...mapActions({
      // getReadByCommandta: "PowerMeterLast_GetReadByCommand",
      getReadByCommand:"mianPage_GetReadByCommand",
    }),
    iGetReadByCommandta() {
      this.req.objectId = sessionStorage.getItem("accountId");
      this.getReadByCommand(this.req).then((res) => {
        if (res.success === 1) {
          this.reUpdate(res.data);
          this.isvHeight = this.$parent.$parent.$parent.Heights2 || this.$parent.$parent.$parent.Size2
        }
      });
    },
    clear() {
      this.totalMeter = 0;
      this.errorMeter = 0;
      this.dataList = [];
    },
    reUpdate(data) {
      let tempList =
        this.req.cmd === 1
          ? data.commMeterLasts
          : this.req.cmd === 2
          ? data.factoryMeterLasts
          : data.noteMeterLasts;
      this.clear();
      //更新表计总数
      this.totalMeter = data.totalCommMeter;
      //更新异常数
      this.errorMeter = data.totaAbnormal;
      if (tempList.length < 1) {
        this.setSuccessLink([this.$t("ytlMeterReading.none")], [0]);
        return;
      }
      let tempAxisList = [],
        tempDataList = [];
      // tempTotal = 0,
      // tempSuccess = 0;
      tempList.forEach((elem) => {
        tempAxisList.push(elem.disc);
        tempDataList.push(elem.commSuccess);
        // tempTotal += elem.commTotal;
        // tempSuccess += elem.commSuccess;
      });
      //更新图表
      this.setSuccessLink(tempAxisList, tempDataList);
    },
    setSuccessLink(axisList, dataList) {
      //   if (axisList.length === 1) {
      //     // axisList.push(axisList[0]);
      //     // dataList.push(dataList[0]);
      //   }
      let tempInterval = this.getInterval(dataList);
      this.optSuccessRate = {
        tooltip: {
          trigger: "axis",
          formatter: "{b}: {c}%",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        grid: {
         left: "5%",
          right: "5%",
          bottom: "20%",
          top: "20%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            // boundaryGap: false,
            data: axisList,
            // data: ["2", "6", "14", "18", "22", "26", "30"],
            // axisLine: {
            //   show: true,
            //   type: "dashed",
            // },
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: "#333",
              align: "center",
            },
            axisLine: {
              lineStyle: {
                color: "#ccc", // 坐标轴线线的颜色
                width: "1", // 坐标轴线线宽
                type: "solid",
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            min: tempInterval.min,
            max: tempInterval.max,
            interval: tempInterval.interval,
            axisLabel: {
              color: "black",
              fontSize: "10",
              formatter: "{value}%",
            },
            splitLine: {
              show: false,
              lineStyle: {
                type: "dashed",
              },
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#ccc", // 坐标轴线线的颜色
                width: "1", // 坐标轴线线宽
                type: "solid",
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            type: "bar",
            barWidth: "50",
            color: "#409EFF",
            symbol: "none",
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#deeeff", // 0% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            emphasis: {
              focus: "series",
            },
            data: dataList,
            // data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      };
      let style = localStorage.getItem("style");
      if (style == 1) {
        this.optSuccessRate.series[0].color = "#57B8FF"
      } else if (style == 2) {
        this.optSuccessRate.series[0].color = "#ff6633"
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
    onChange() {
      console.log(123);
    },
  },
};
</script>
<style lang="less" scoped>
.box {
  margin-top: 30px;
  .content {
    margin: 0 auto;
    border-top: 1px solid #dcdfe6;
    .title_under {
      .line_data {
        margin-top: 10px;
      }
    }
  }
}
.success_chart_box {
  margin: 0 auto;
}
.tab_btn {
  z-index: 2;
  position: absolute;
  right: 10px;
  top: 45px;
  .tabs_position_style {
    width: 100%;
  }
}
.title_under {
  .line_data {
    margin-left: 20px;
    span {
      color: #333;
    }
    .ml22 {
      margin-left: 20px;
    }
  }
}
.eacharts_meter {
  position: relative;
  z-index: 1;
}

</style>
