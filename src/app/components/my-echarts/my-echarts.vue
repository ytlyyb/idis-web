<template>
  <div :id="chartId" :style="chartStyle"></div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图/折线图等组件
require("echarts/lib/chart/bar");
require("echarts/lib/chart/line");
require("echarts/lib/chart/pie");
require("echarts/lib/chart/gauge");
// 引入提示框,title组件,图例组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
require("echarts/lib/component/toolbox");
 // 引入 dataZoom.inside 组件
require('echarts/lib/component/dataZoomInside')
//引入graphic 组件
require('echarts/lib/component/graphic')
import ResizeListener from "element-resize-detector";
import { GridComponent } from "echarts/components";
import { PolarComponent } from 'echarts/components'

echarts.use([PolarComponent]);
export default {
  name: "MyChart",
  props: {
    width: {
      type: String,
      default: "300px",
    },
    height: {
      type: Number,
      default: 300,
    },
    vHeight: {
      type: String,
      default: "",
    },
    options: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    chartStyle: null,
    myChart: null,
    resizeTimer: null,
  }),
  created() {
    echarts.use([GridComponent]);
    this.chartStyle = {
      width: this.width / 192 + "rem",
      height: this.vHeight
        ? this.vHeight / 192 + "rem"
        : this.height / 192 + "rem",
    };
  },
  mounted() {
    this.setOptions(this.options);
    let _this = this;
    //监听窗口变化,自动改变图表尺寸
    window.addEventListener("resize", function () {
      if (_this.resizeTimer) clearTimeout(_this.resizeTimer);
      _this.resizeTimer = setTimeout(function () {
        _this.myChart.resize();
      }, 100);
    });

    this.addChartResizeListener();
  },
  computed: {
    chartId() {
      return "id-" + new Date().getTime() + Math.random();
    },
  },
  watch: {
    options: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
  },
  methods: {
    setOptions(options) {
      if (!this.myChart) {
        // 基于准备好的dom，初始化echarts实例
        this.myChart = echarts.init(document.getElementById(this.chartId));
      }
      this.myChart.clear();
      this.myChart.setOption(options);
    },

    //监听父容器变化,自动改变图表尺寸
    addChartResizeListener() {
      let _this = this;
      const instance = ResizeListener({
        strategy: "scroll",
        callOnAdd: true,
      });
      instance.listenTo(_this.$el, () => {
        if (!_this.myChart) return;
        _this.myChart.resize();
      });
    },
  },
};
</script>
