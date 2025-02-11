<template>
  <div style="background-color: #fff; width: 98.5%; height: 73%; border-radius: 20px">
    <el-radio-group v-model="radio">
      <el-radio :label="3">参数</el-radio>
      <el-radio :label="6">瞬时量</el-radio>
      <el-radio :label="9">电能</el-radio>
      <el-radio :label="1">需量</el-radio>
    </el-radio-group>
    <el-button class="sure_button">确认</el-button>
    <el-transfer v-model="value" :data="data" class="trans"></el-transfer>
  </div>
</template>

<script>
export default {
  data() {
    const generateData = (_) => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0,
        });
      }
      return data;
    };
    return {
      radio: 3,
      data: generateData(),
      value: [1, 4],
    };
  },
};
</script>

<style scoped lang="less">
/deep/ .el-radio__input.is-checked .el-radio__inner {
  border-color: #FF9B45;
  background-color: #FF9B45;
}
/deep/ .el-checkbox__input.is-checked .el-checkbox__inner{
    background-color: #FF9B45;
    border-color: #FF9B45;
}
/deep/ .el-button--primary.is-disabled{
    background-color: #FFCDA3;
}
/deep/ .el-button--primary{
    background-color: #FF9B45;
}
.trans{
    width: 600px;
}
</style>
