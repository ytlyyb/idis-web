<template>
  <div>
    <span class="icon"></span>
    <span :style="bold ? 'font-weight:700' : 'font-weight:400'" class="title"
      ><slot>首页</slot></span
    >
  </div>
</template>

<script>
export default {
  props: {
    bold: {
      type: Boolean,
      default: false, //默认值
      required: false, //表示att1属性必须要在cnp中实现
    },
  },
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.icon {
  display: inline-block;
  width: 4px;
  height: 16px;
  background-color: var(--theme_bg_color);
}
.title {
  margin-left: 8px;
  color: #333333;
  font-size: 14px;
  font-family: Microsoft YaHei, Microsoft YaHei-Bold;
}
</style>