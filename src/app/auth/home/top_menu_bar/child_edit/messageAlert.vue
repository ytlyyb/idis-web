<template>
  <div class="contents">
    <el-dialog
      :title="this.$t('ytlPage.alarmevents')"
      :visible.sync="table"
      direction="rtl"
      :width="1599 / 192 + 'rem'"
      @close="closedialog"
      append-to-body
      center
      :top="80 / 192 + 'rem'"
    >
      <el-form :inline="true">
        <el-form-item>
          <el-date-picker
            class="time_select"
            v-model="timeValue"
            type="datetimerange"
            align="right"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="-"
            :start-placeholder="$t('ytlMeterReading.startDate2')"
            :end-placeholder="$t('ytlMeterReading.endDate')"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select
            :clearable="true"
            v-model="req.alarmSource"
            :placeholder="$t('ytlPage.pleaseSelect')"
            class="supply"
          >
            <el-option
              v-for="item of powersList"
              :key="item.value"
              :label="$t(item.label)"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item>
          <el-select
            :clearable="true"
            v-model="req.groupId"
            :placeholder="$t('ytlPage.pleaseSelect')"
            class="source"
          >
            <el-option
              v-for="item of options1"
              :key="item.groupId"
              :label="item.disc"
              :value="item.groupId"
            >
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-input type="text" class="_input" v-model="req.discription"  :placeholder="$t('ytlPage.description')"/>
        </el-form-item>
        <el-form-item>
          <!-- 搜索 -->
          <el-button type="primary"  @click="onClickSearch" >{{
            $t("ytlMeterReading.search")
          }}</el-button>
          <!-- 导出 -->
          <download-excel
            class="export-excel-wrapper"
            style="display: inline-block"
            :data="getExportData()"
            :fields="getJsonFields()"
            name="消息详情"
          >
            <el-button type="primary" plain class="search_btn">{{
              $t("ytlMeterReading.export")
            }}</el-button>
          </download-excel>
        </el-form-item>
      </el-form>
      <el-table
        border
        class="table_data"
        :height="566 / 192 + 'rem'"
        :data="tableData"
      >
        <!-- 序号 -->
        <el-table-column
          :label="$t('ytlMeterReading.No')"
          align="center"
          width="70"
          type="index"
        >
        </el-table-column>
        <el-table-column
          v-for="(item, index) of tableTitle"
          :key="index"
          :show-overflow-tooltip="true"
          :label="$t(item.label)"
          :prop="item.prop"
          align="center"
        >
        </el-table-column>
      </el-table>
      <el-pagination
      class="_pagination"
      background
      :page-sizes="[10, 20, 50, 100]"
      :page-size="req.pageSize"
      layout="total, prev, pager, next, sizes,jumper"
      @size-change="onClickSizeChange"
      @current-change="onClickCurrentChange"
      :total="total"
      :current-page.sync="req.pageNumber"
    >
    </el-pagination>
    </el-dialog>
    
  </div>
</template>
<script>
import moment from "moment";
import mixin from "../../../../common/tools/func_mixin";
import { mapActions } from "vuex";
import { messageRemindingList, options } from "./tableList";
export default {
  mixins: [mixin],
  name: "PowerUser",
  components: {},
  props: {
    showAlert: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      total:0,
      timeValue: [],
      showMonth: false,
      loading: false,
      table: false,
      tableData: [],
      powersList: options,
      tableTitle: messageRemindingList,
      req: {
        alarmSource: null,
        groupId: null,
        endTime: null,
        beginTime: null,
        discription: null,
        isRead:1,
        pageNumber:1,
        pageSize:100,
      },
    };
  },
  created() {
    let nextDay = moment()
      .add(1, "days")
      .startOf("days")
      .format("YYYY-MM-DD 00:00:00");
    this.req.endTime = nextDay;
    this.req.beginTime = this.getYM() + "-01 00:00:00";
    this.timeValue = [this.req.beginTime, this.req.endTime];
  },
  mounted() {
    const that = this;
    // that.getTheEventgroupList();
    that.getTableList();
  },
  methods: {
    ...mapActions({
      MessageNotmessage: "Message_Not_message", //获取消息
      // TheEventgroup: "The_Event_group", //获取事件分组
    }),
    getTableList() {
      this.req.beginTime = this.timeValue[0];
      this.req.endTime = this.timeValue[1];
      this.MessageNotmessage(this.req).then((res) => {
        if (res.success == 1) {
          this.tableData = res.data;
          this.total = res.total
        }
      });
    },
    // getTheEventgroupList() {
    //   this.TheEventgroup({}).then((res) => {
    //     if (res.success == 1) {
    //       console.log(res);
    //       this.options1 = res.data;
    //       // res.data.forEach(item=>{
    //       //   console.log(item.disc);
    //       // })
    //     }
    //   });
    // },
    // 搜索
    closedialog() {
      this.$parent.showAlert = false;
    },
    onClickSearch() {
      this.getTableList()
    },
    getExportData() {
        let tempDataList = this.deepCopy(this.tableData);
        tempDataList.forEach((item) => {});
        return tempDataList;
    },
    getJsonFields() {
      let fields = {};
      this.tableTitle.forEach((item) => {
        fields[this.$t(item.label)] = item.prop;
      });
      return fields;
    },
    onClickSizeChange(size) {
      this.req.pageSize = size;
      this.getTableList();
    },
    onClickCurrentChange(num) {
      this.req.pageNumber = num;
      this.getTableList();
    },
  },
  computed: {},
  watch: {
    showAlert(val) {
      this.table = val;
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
.search_btn {
  margin-left: 10px;
}
.time_select {
  width: 395px;
}
/deep/.supply .el-input__inner {
  width: 141px;
}
/deep/.source .el-input__inner {
  width: 141px;
}
/deep/.description .el-input__inner {
  width: 243px;
}
.el-input__inner {
  border-collapse: 10px;
  width: 395px;
  height: 36px;
  padding-right: 0px;
}
/deep/.el-dialog {
  height: 800px;
  border-radius: 5px 5px 0px 0px;
}


</style>