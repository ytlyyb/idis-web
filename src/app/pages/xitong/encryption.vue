<template>
  <div style="background-color: #fff; width: 98.5%; height: 73%; border-radius: 20px">
    <div class="form-row">
      <div class="label-input">
        <label>方案名称</label>
        <el-input v-model="planName" placeholder="请输入方案名称"></el-input>
      </div>
      <div class="label-input">
        <label>起始表号</label>
        <el-input v-model="startMeterNumber" placeholder="请输入表号后十位"></el-input>
      </div>
      <div class="label-input">
        <label>结束表号</label>
        <el-input v-model="endMeterNumber" placeholder="请输入表号后十位"></el-input>
      </div>
    </div>
    <div class="key_input">
      <div class="label-input">
        <label>KEY</label>
        <el-input
          v-model="key"
          placeholder="请输入表号后十位"
          style="margin-left: 10px"
        ></el-input>
      </div>
      <el-button class="sure_button">新增</el-button>
      <el-button class="sure_button">修改</el-button>
      <el-button class="sure_button">删除</el-button>
      <el-button class="sure_button">导出</el-button>
      <el-button class="sure_button">加载</el-button>
    </div>
    <el-table :data="tableData" height="76%" border class="tabel">
      <el-table-column prop="date" label="方案名称" width="290"> </el-table-column>
      <el-table-column prop="name" label="起始表号" width="290"> </el-table-column>
      <el-table-column prop="address" label="结束表号" width="290"> </el-table-column>
      <el-table-column prop="key" label="KEY"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      planName: "",
      startMeterNumber: "",
      endMeterNumber: "",
      key: "",
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          key: "000102030405060708090A0B0C0D0E0F",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          key: "000102030405060708090A0B0C0D0E0F",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          key: "000102030405060708090A0B0C0D0E0F",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          key: "000102030405060708090A0B0C0D0E0F",
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          key: "000102030405060708090A0B0C0D0E0F",
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          key: "000102030405060708090A0B0C0D0E0F",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          key: "000102030405060708090A0B0C0D0E0F",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          key: "000102030405060708090A0B0C0D0E0F",
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.form-row {
  margin-top: 20px;
  display: flex;
  align-items: center;
  margin-left: 20px;
  font-size: 16px;
}
.label-input {
  display: flex;
  align-items: center;
  margin-right: 30px;
}
.form-row label {
  margin-right: 10px;
}
.key_input {
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-left: 20px;
  margin-top: 10px;
}

.el-input {
  flex: 1;
}
.sure_button {
  background-color: #ff9b45;
  width: 80px;
  height: 36px;
  color: #fff;
  border: none;
  margin-left: 10px;
}
/deep/ .el-input__inner {
  height: 36px;
  width: 260px;
}
.key_input /deep/ .el-input__inner {
  height: 36px;
  width: 460px;
}
/deep/ .el-input__inner:hover,
.el-select:hover {
  border-color: #ff9b45;
}
/deep/ .el-input__inner:focus,
.el-select:focus {
  border-color: #ff9b45;
}
.tabel{
  margin-top: 20px;
  margin-left: 20px;
  width: 97%;
  height: 85%;
  border-radius: 8px;
}
/deep/ .el-table th.el-table__cell.is-leaf {
  background-color: #f5f7fa;
}
</style>
