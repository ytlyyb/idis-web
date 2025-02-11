<template>
  <div class="contents">
    <el-tree
      class="el_tree"
      :data="data"
      :props="defaultProps"
      node-key="value"
      :default-expanded-keys="[1, 2]"
      @node-click="handleNodeClick"
      ref="tree"
    >
   <span class="custom_tree_node" slot-scope="{ data }">
     <span class="item_label">{{ $t(data.label) }}</span><i :class="data.icon"></i>
   </span>
    </el-tree>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      menuList:[],
      data: [
        {
          label: 'ytlPage.Menu',
          value: 1,
          children: [
            {
              label: 'ytlMenu.meterReading',
              value: "1-1",
              children: [
                {
                  label: 'ytlMenu.deviceParameter',
                  value: "1.1",
                  icon:'el-icon-plus',
                  route:'/meterReading/deviceParameter'
                },
                {
                  label: 'ytlMenu.deviceOperate',
                  value: "1.2",
                  icon:'el-icon-plus',
                  route:'/meterReading/deviceOperate'
                },
                {
                  label: 'ytlMenu.meterData',
                  value: "1.3",
                  icon:'el-icon-plus',
                  route:'/meterReading/meterData'
                },
                {
                  label: 'ytlMenu.readingReport',
                  value: "1.4",
                  icon:'el-icon-plus',
                  route:'/meterReading/readingReport'
                },
              ],
            },
            {
              label: 'ytlMenu.powerUsed',
              value: "1-2",
              children: [
                {
                  label: 'ytlMenu.powerUser',
                  value: "2.1",
                  icon:'el-icon-plus',
                  route:'/powerUsed/powerUser'
                },
                {
                  label: 'ytlMenu.userPower',
                  value: "2.2",
                  icon:'el-icon-plus',
                  route:'/powerUsed/userPower'
                },
                {
                  label: 'ytlMenu.userEvent',
                  value: "2.3",
                  icon:'el-icon-plus',
                  route:'/powerUsed/userEvent'
                },
                {
                  label: 'ytlMenu.userReport',
                  value: "2.4",
                  icon:'el-icon-plus',
                  route:'/powerUsed/userReport'
                },
                {
                  label: 'ytlMenu.userReading',
                  value: "2.5",
                  icon:'el-icon-plus',
                  route:'/powerUsed/userReading'
                },
              ],
            },
            {
              label: 'ytlMenu.powerSale',
              value: "1-3",
              children:[
                {
                  label: 'ytlMenu.sellingUser',
                  value: "3.1",
                  icon:'el-icon-plus',
                  route:'/powerSale/sellingUser'
                },
                {
                  label: 'ytlMenu.powerSelling',
                  value: "3.2",
                  icon:'el-icon-plus',
                  route:'/powerSale/powerSelling'
                },
                {
                  label: 'ytlMenu.sellingConfig',
                  value: "3.3",
                  icon:'el-icon-plus',
                  route:'/powerSale/sellingConfig'
                },
                {
                  label: 'ytlMenu.powerPrice',
                  value: "3.4",
                  icon:'el-icon-plus',
                  route:'/powerSale/powerPrice'
                },
                {
                  label: 'ytlMenu.sellingReport',
                  value: "3.5",
                  icon:'el-icon-plus',
                  route:'/powerSale/sellingReport'
                },
              ]
            },
            {
              label: 'ytlMenu.powerSupply',
              value: "1-4",
              children:[
                {
                  label: 'ytlMenu.businessModel',
                  value: "4.1",
                  icon:'el-icon-plus',
                  route:'/powerSupply/businessModel'
                },
                {
                  label: 'ytlMenu.supplyEnergy',
                  value: "4.2",
                  icon:'el-icon-plus',
                  route:'/powerSupply/supplyEnergy'
                },
                {
                  label: 'ytlMenu.supplyLoad',
                  value: "4.3",
                  icon:'el-icon-plus',
                  route:'/powerSupply/supplyLoad'
                },
                {
                  label: 'ytlMenu.supplyReport',
                  value: "4.4",
                  icon:'el-icon-plus',
                  route:'/powerSupply/supplyReport'
                },
                ]
            },
            {
              label: 'ytlMenu.powerDistribute',
              value: "1-5",
              children:[{
                  label: 'ytlMenu.gridModel',
                  value: "5.1",
                  icon:'el-icon-plus',
                  route:'/powerDistribute/gridModel'
                },
                {
                  label: 'ytlMenu.distributeEnergy',
                  value: "5.2",
                  icon:'el-icon-plus',
                  route:'/powerDistribute/distributeEnergy'
                },
                {
                  label: 'ytlMenu.substation',
                  value: "5.3",
                  icon:'el-icon-plus',
                  route:'/powerDistribute/substation'
                },
                {
                  label: 'ytlMenu.gridLoss',
                  value: "5.4",
                  icon:'el-icon-plus',
                  route:'/powerDistribute/gridLoss'
                },
                {
                  label: 'ytlMenu.distributeReport',
                  value: "5.5",
                  icon:'el-icon-plus',
                  route:'/powerDistribute/distributeReport'
                },]
            },
            {
              label: 'ytlMenu.ITOps',
              value: "1-6",
              children:[
                {
                  label: 'ytlMenu.deviceMonitor',
                  value: "6.1",
                  icon:'el-icon-plus',
                  route:'/ITOps/deviceMonitor'
                },
                {
                  label: 'ytlMenu.anomalyAnalysis',
                  value: "6.2",
                  icon:'el-icon-plus',
                  route:'/ITOps/anomalyAnalysis'
                },
                {
                  label: 'ytlMenu.workOrder',
                  value: "6.3",
                  icon:'el-icon-plus',
                  route:'/ITOps/workOrder'
                },
                {
                  label: 'ytlMenu.maintainReport',
                  value: "6.4",
                  icon:'el-icon-plus',
                  route:'/ITOps/maintainReport'
                },
              ]
            },
            {
              label: 'ytlMenu.APIInterface',
              value: "1-7",
              children:[
                {
                  label:'ytlMenu.APIMonitor',
                  value: "7.1",
                  icon:'el-icon-plus',
                  route:'/APIInterface/APIMonitor'
                },
                {
                  label: 'ytlMenu.APILog',
                  value: "7.2",
                  icon:'el-icon-plus',
                  route:'/APIInterface/APILog'
                },
                {
                  label: 'ytlMenu.APIReport',
                  value: "7.3",
                  icon:'el-icon-plus',
                  route:'/APIInterface/APIReport'
                },
              ]
            },
            {
              label: 'ytlMenu.systemConfig',
              value: "1-8",
              children:[
                {
                  label: 'ytlMenu.accountAuthority',
                  value: "8.1",
                  icon:'el-icon-plus',
                  route:'/systemConfig/accountAuthority'
                },
                {
                  label: 'ytlMenu.meterVersion',
                  value: "8.2",
                  icon:'el-icon-plus',
                  route:'/systemConfig/meterVersion'
                },
                {
                  label: 'ytlMenu.parameterConfig',
                  value: "8.3",
                  icon:'el-icon-plus',
                  route:'/systemConfig/parameterConfig'
                },
                {
                  label: 'ytlMenu.reportConfig',
                  value: "8.4",
                  icon:'el-icon-plus',
                  route:'/systemConfig/reportConfig'
                },
              ]
            },
          ],
        },
        {
          label: 'ytlPage.Module',
          value: 2,
          children: [
            {
              label: 'ytlMenu.userReading',
              value: "2-1",
              children: [
                {
                  label: 'ytlMeterReading.meterType',
                  value: "2-1-1",
                  icon:'el-icon-plus',
                  modlueId:1.1
                },
                {
                  label: 'ytlPage.CommunicationTypeelectricMeter',
                  value: "2-1-2",
                  icon:'el-icon-plus',
                  modlueId:1.2
                },
                {
                  label: 'ytlPowerSale.numberMeters2',
                  value: "2-1-3",
                  icon:'el-icon-plus',
                  modlueId:1.3
                },
                {
                  label: 'ytlMeterReading.communicationSuccessRate',
                  value: "2-1-4",
                  icon:'el-icon-plus',
                  modlueId:1.4
                },
                {
                  label: 'ytlMeterReading.dataIntegrityRate',
                  value: "2-1-5",
                  icon:'el-icon-plus',
                  modlueId:1.5
                },
              ],
            },
            {
              label: 'ytlMenu.userReport',
              value: "3-1",
              children: [
                {
                  label: 'ytlMeterReading.trendanalysis',
                  value: "3-1-1",
                  icon:'el-icon-plus',
                  modlueId:2.1
                },
                {
                  label: 'ytlPowerSale.numberMeters2',
                  value: "3-1-2",
                  icon:'el-icon-plus',
                  modlueId:2.2
                },
                {
                  label: 'ytlPage.NumberofUsers',
                  value: "3-1-3",
                  icon:'el-icon-plus',
                  modlueId:2.3
                },
              ],
            },
            {
              label: 'ytlMenu.sellingReport',
              value: "4-1",
              children: [
                {
                  label: 'ytlPage.Analysisofelectricitysalestrend',
                  value: "4-1-1",
                  icon:'el-icon-plus',
                  modlueId:3.1
                },
                {
                  label: 'ytlPowerSale.numberMeters2',
                  value: "4-1-2",
                  icon:'el-icon-plus',
                  modlueId:3.2
                },
                {
                  label: 'ytlPage.NumberofUsers',
                  value: "4-1-3",
                  icon:'el-icon-plus',
                  modlueId:3.3
                },
                // {
                //   label: 'ytlPage.Electricmeterinformation',
                //   value: "4-1-4",
                //   icon:'el-icon-plus',
                //   modlueId:3.4
                // },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    handleNodeClick(data) {
      // console.log(data);
      this.$parent.addItem(data);
      // if(data.value != '1-1' && data.value !='1-2'
      // && data.value !='1-3' && data.value !='1-4'
      // && data.value !='1-5' && data.value !='1-6'
      // && data.value !='1-7' 
      // && data.value !='1-8'){
      //   this.menuList.push(data.label)
      // // console.log(this.menuList);
      // }

    },
    click(e){
      console.log(e);
    }
  },
  computed: {},
  watch: {},
  filters: {},
  //keepAlive
  activated() {},
  deactivated() {},
  updated() {},
  destroyed() {},
};
</script>
<style lang='less' scoped>
.contents {
  width: 238px;
  height: 710px;
  border: 1px solid var(--theme_bg_color);
  border-radius: 5px;
   overflow: scroll;
}
.custom_tree_node{
    width: 100px;  /* //外部容器的宽度 */
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
  i{
   color: var(--theme_bg_color);
   position: absolute;
   right: 5px;
   margin-top: 5px;
  }
  
}
</style>