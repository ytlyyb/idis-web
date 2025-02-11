<template>
  <!-- 不同类型电表 -->
  <div class="main_left_top">
    <span class="meter_total">{{ $t("ytlMeterReading.totalElectricityMeters") }}：{{
        meterTotal
      }}</span>
    <div class="title_num">
      <my-echarts
        :width="'100%'"
        ref="myEcharts"
        :vHeight="isvHeight"
        :options="linkOption"
        class="eacharts_meter"
      />
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import MyEcharts from "../../../components/my-echarts/my-echarts.vue";
import CmPageHead from "../../../components/title/cm-page-head.vue";
import mixinF from "../../../common/tools/func_mixin";
export default {
  mixins: [mixinF],
  components: { CmPageHead, MyEcharts },
  data() {
    return {
      isvHeight:'170',
      //#region 电表类型
      linkOption: {},
      linkData: [],
      //#endregion
      meterTotal: 0,
      colorBool: true,
      currentId: 6,
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
          // console.log(res);
          this.reUpdate(res.data);
          this.isvHeight = this.$parent.$parent.$parent.Heights1 || this.$parent.$parent.$parent.Size1
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
      //不同通讯类型电表
      this.setLinkOptions(this.linkData, tempMeterTotal);
      //电表数量统计
      this.setMeterAmount(tempMeterAmount);
      //表计总数
      this.meterTotal = tempMeterTotal;
      //#endregion
    },
    /**不同通讯类型电表 */
    setLinkOptions(data, total) {
      //提前计算好百分比，防止相加不等于100
      let tempDataList = [],
        tempTotalRate = 0;
      this.linkData.forEach((elem) => {
        let tempObj = {
          name: elem.name,
          value: elem.value,
          rate: total === 0 ? 0 : ((elem.value / total) * 100).toFixed(0) - 0,
        };
        tempDataList.push(tempObj);
        tempTotalRate += tempObj.rate;
      });
      if (tempDataList.length > 0) tempDataList[0].rate += 100 - tempTotalRate;
      //获得数据
      let getValue = (name) => {
        if (tempDataList.length < 1) return { value: 0, rate: 0 };
        for (const key in tempDataList) {
          if (tempDataList[key].name == name)
            return {
              value: tempDataList[key].value,
              rate: tempDataList[key].rate,
            };
        }
      };
      //空数据预处理
      if (data.length < 1)
        data.push({ name: this.$t("ytlMeterReading.none"), value: 0 });
      // console.log(">>>测测", data);
      this.linkOption = {
        color: [
          "#4D96FF",
          "#6BCB77",
          "#FFD93D",
          "#FF6B6B",
          "#6FBAFF",
          "#8DDD68",
          "#FF8761",
        ],
        tooltip: {
          trigger: "item",
          
        },
        legend: {
          //  selectedMode: false,
          show: false,
          type: "scroll",
          orient: "vertical",
          itemHeight: 12,
          itemWidth: 12,
          bottom:-10,
          textStyle: {
            color: "#333",
            fontSize: 14,
            rich: {
              name: {
                width: 80,
                fontSize: 14,
                color: "#333",
              },
              value: {
                width: 50,
                fontSize: 14,
                color: "#333",
              },
              bfb: {
                fontSize: 14,
                color: "#333",
              },
            },
          },
          formatter: function (name) {
            let tempStr = JSON.parse(JSON.stringify(name)),
              { value, rate } = getValue(name);
            tempStr = [
              "{name|" + tempStr + "}",
              "{value|" + value + "}",
              "{bfb|" + rate + "%}",
            ];
            return tempStr.join("");
          },
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: ["50%", "80%"],
            // center: ["50%", "50%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
              color: "#333",
              formatter: (a) => {
                return a.value;
              },
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 14,
                fontWeight: 400,
              },
            },
            labelLine: {
              show: false,
            },
            itemStyle: {
          normal: {
          },
        },
            data: data,
          },
        ],
      };
      let style = localStorage.getItem("style");
      if (style == 1) {
        this.linkOption.color = [
          "#4D96FF",
          "#6BCB77",
          "#FFD93D",
          "#FF6B6B",
          "#6FBAFF",
          "#8DDD68",
          "#FF8761",
        ];
      } else if (style == 2) {
        this.linkOption.color = [
          "#FF6633",
          "#6BCB77",
          "#FFD93D",
          "#FF6B6B",
          "#6FBAFF",
          "#8DDD68",
          "#FF8761",
        ];
      }
    },
    /**电表数量统计 */
    setMeterAmount(data) {
      this.send("meter-amount-data", data);
    },
    onClickMore() {
      this.send("reading-report-more", 1);
    },
  },
  computed: {},
  watch: {
     isvHeight(val){
      this.$refs.myEcharts.chartStyle.height = this.isvHeight / 192 + "rem"
    }
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
  .meter_total{
    position: relative;
    top: 10px;
    left: 5%;
  }
}
.title_num{
  margin-top: -20px;
  .eacharts_meter {
  position: relative;
  z-index: 1;
}
}

</style>