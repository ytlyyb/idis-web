<template>
  <!-- 数据完整率 -->
  <div class="box">
    <div class="title_line"></div>
    <div class="content">
      <!-- 日 -->
      <div class="time">{{ day.time }}：</div>
      <div class="progress_top">
        <span
          >{{ $t("ytlMeterReading.numberPointsCopied") }}：{{
            day.totalPoint
          }}</span
        >
        <span
          >{{ $t("ytlMeterReading.numberLeakagePoints") }}：{{
            day.errorPoint
          }}</span
        >
        <br>
        <span>{{ $t("ytlMeterReading.integrityRate") }}: {{ day.rate }}%</span>
      </div>
      <el-progress
        :text-inside="true"
        :stroke-width="26"
        :percentage="day.rate"
        color="var(--theme_bg_color)"
      ></el-progress>
      <!-- 月 -->
      <div class="time2">{{ month.time }}：</div>
      <div class="progress_top">
        <span
          >{{ $t("ytlMeterReading.numberPointsCopied") }}：{{
            month.totalPoint
          }}</span
        >
        <span
          >{{ $t("ytlMeterReading.numberLeakagePoints") }}：{{
            month.errorPoint
          }}</span
        >
        <br>
        <span
          >{{ $t("ytlMeterReading.integrityRate") }}: {{ month.rate }}%</span
        >
      </div>
      <el-progress
        :text-inside="true"
        :stroke-width="24"
        :percentage="month.rate"
        status="success"
        color="var(--theme_progressColor_color)"
      ></el-progress>
      <!-- 图表上的标识 -->
      <div class="table_icon">
        <div class="item ml16">
          <i style="background: var(--theme_bg_color)"></i>
          <span>{{ $t("ytlMeterReading.numberPointsCopied") }}</span>
        </div>
        <div class="item ml16">
          <i style="background: var(--theme_progressColor_color)"></i>
          <span>{{ $t("ytlMeterReading.actualCopyPoints") }}</span>
        </div>
      </div>
      <div class="eacharts_box">
        <my-echarts
          ref="myEcharts1"
          :width="'100%'"
          :vHeight="isvHeight"
          :options="optMeterType"
        />
        <my-echarts
          ref="myEcharts2"
          :width="'100%'"
          :vHeight="isvHeight"
          :options="optFactoryType"
        />
        <my-echarts
          ref="myEcharts3"
          :width="'100%'"
          :vHeight="isvHeight"
          :options="optPointType"
        />
      </div>
    </div>
  </div>
</template>
<script>
import MyEcharts from "../../../components/my-echarts/my-echarts.vue";
import { mapActions } from "vuex";
import mixinF from "../../../common/tools/func_mixin";
export default {
  mixins: [mixinF],
  components: { MyEcharts },
  data() {
    return {
      isvHeight: "100",
      optTemplate: {
        tooltip: {
          trigger: "item",
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "10%",
          top: "10%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: ["RF", "485", "PLC", "GPRS", "wifi", "nbiot", "其他表"],
          axisLabel: {
            // interval: 0,
            textStyle: {
              color: "rgba(44,53,66,0.45)",
              fontSize: 12,
            },
          },
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
          min: 0,
          max: 2,
          interval: 1,
          axisLabel: {
            interval: 9,
          },
          axisLabel: {
            textStyle: {
              color: "rgba(44,53,66,0.45)",
              fontSize: 12,
            },
          },
        },
        series: [
          {
            barWidth: "11",
            data: [120, 200, 150, 80, 11, 11, 11],
            type: "bar",
            color: "#71ABFF",
          },
          {
            barWidth: "11",
            barGap: "10%",
            data: [100, 100, 250, 10, 11, 11, 11],
            type: "bar",
            color: "#A4E486",
          },
        ],
      },
      optMeterType: {},
      optFactoryType: {},
      optPointType: {},
      req: {
        cmd: 1,
        objectId: 6,
      },
      day: {
        time: "",
        totalPoint: "",
        errorPoint: "",
        rate: 0,
      },
      month: {
        time: "",
        totalPoint: "",
        errorPoint: "",
        rate: 0,
      },
    };
  },
  created() {},
  mounted() {
    this.iGetDataByCommand();
    this.setObjectId();
  },
  methods: {
    //#region 接口
    ...mapActions({
      // getDataByCommand: "PowerMeterLast_GetDataByCommand",
            mianPageGetDataByCommand:"mianPage_GetDataByCommand"
    }),
    iGetDataByCommand(callBack = null) {
      this.req.objectId = sessionStorage.getItem("accountId");
      this.mianPageGetDataByCommand(this.req).then((res) => {
        if (res.success === 1) {
          if (callBack) callBack(res.data);
          this.isvHeight = this.$parent.$parent.$parent.Heights4 || this.$parent.$parent.$parent.Size4
        }
      });
    },
    //#endregion
    setObjectId(id) {
      //   this.req.objectId = id;
      //设置表类型
      this.req.cmd = 1;
      this.iGetDataByCommand((data) => {
        this.day.time = this.getPreviousDay();
        this.month.time = this.getYM();
        this.day.totalPoint = data.dayTotal;
        this.month.totalPoint = data.monthTotal;
        this.day.errorPoint = data.dayTotal - data.daySuccess;
        this.month.errorPoint = data.monthTotal - data.monthSuccess;
        //概率赋值
        if (
          data.dayTotal === 0 ||
          data.dayTotal === null ||
          data.dayTotal === undefined
        )
          this.day.rate = 0;
        else
          this.day.rate = parseInt(
            (this.div(data.daySuccess, data.dayTotal) - 0) * 100
          );
        if (
          data.monthTotal === 0 ||
          data.monthTotal === null ||
          data.monthTotal === undefined
        )
          this.month.rate = 0;
        else
          this.month.rate = parseInt(
            (this.div(data.monthSuccess, data.monthTotal) - 0) * 100
          );
        //图表赋值
        this.setMeterType(data.dcsMeterTypeLasts);
        this.setFactoryType(data.dcsMeterFactoryLasts);
        this.setPointType(data.dcsMeterObjectLasts);
      });
    },
    /**获得option */
    getOpt(list) {
      let style = localStorage.getItem("style");
      if (style == 1) {
        this.optTemplate.series[0].color = "#57B8FF"
      } else if (style == 2) {
        this.optTemplate.series[0].color = "#ff6633"
      }
      let tempAxisList = [],
        tempTotalList = [],
        tempSuccessList = [],
        tempOpt = this.deepCopy(this.optTemplate);
      //空数据预处理
      if (list.length < 1) {
        tempOpt.xAxis.data = [this.$t("ytlMeterReading.none")];
        tempOpt.series[0].data = [0];
        tempOpt.series[1].data = [0];
        return tempOpt;
      }
      //设置数据
      list.forEach((elem) => {
        tempAxisList.push(elem.disc);
        tempTotalList.push(elem.commTotal);
        tempSuccessList.push(elem.commSuccess);
      });
      tempOpt.xAxis.data = tempAxisList;
      tempOpt.series[0].data = tempTotalList;
      tempOpt.series[1].data = tempSuccessList;
      //设置间隔
      let tempInterval = this.getInterval(tempTotalList);
      tempOpt.yAxis.min = tempInterval.min;
      tempOpt.yAxis.max = tempInterval.max;
      tempOpt.yAxis.interval = tempInterval.interval;
      return tempOpt;
    },
    setMeterType(list) {
      this.optMeterType = this.getOpt(list);
    },
    setFactoryType(list) {
      this.optFactoryType = this.getOpt(list);
    },
    setPointType(list) {
      this.optPointType = this.getOpt(list);
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
      distance = parseInt(((max - min) / 2).toString(), 10);
      return {
        max: 2 * distance + min + 2,
        min,
        interval: distance + 1,
      };
    },
    onClickMore() {
      this.send("reading-report-more", 3);
    },
  },
  computed: {},
  watch: {
    isvHeight(val) {
      this.$refs.myEcharts1.chartStyle.height = this.isvHeight / 192 + "rem";
      this.$refs.myEcharts2.chartStyle.height = this.isvHeight / 192 + "rem";
      this.$refs.myEcharts3.chartStyle.height = this.isvHeight / 192 + "rem";
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
.box {
  padding: 0px 10px 10px 10px;
  margin-top: 30px;
  border-top: 1px solid #dcdfe6;
  .title_line {
    display: flex;
    align-items: center;
    .icon_style {
      margin-left: 5px;
      color: #999;
    }
    /* .more {
      color: #57b8ff;
      font-size: 14px;
      cursor: pointer;
    } */
  }
  .content {
    .time {
      color: #333;
      margin-top: 10px;
    }
    .time2 {
      color: #333;
    }
    .progress_top {
      /* // 强制不换行 */
      white-space:nowrap;
      span {
        display: block;
        float: left;
        color: #666;
        margin-right: 14px;
      }
    }
    .table_icon {
      display: flex;
      margin-left: 8px;
      flex-wrap: wrap;
      .item {
        display: flex;
        align-items: center;
        i {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }
        span {
          display: inline-block;
          font-size: 11px;
          color: rgba(44, 53, 66, 0.65);
          margin-left: 4px;
        }
      }
      .ml16 {
        margin-left: 10px;
      }
      .ml24 {
        margin-left: 24px;
      }
    }
  }
  .eacharts_box {
    position: relative;
    z-index: 1;
  }
  /deep/ .el-progress-bar__outer {
    height: 10px !important;
  }
  /deep/ .el-progress-bar__innerText {
    display: none;
  }
}
</style>