<template>
  <div class="main">
    <div 
      class="head_nav"
      :class="{'active-head_nav': currentIndex === 0}"
      @click="currentIndex = 0"
    >
      <span>通讯设置</span>
      <div class="chacha">
        <span class="close-icon">×</span>
        <!-- <div style="width:12px;height:12px;background-color:#FFE7D3;border-radius:6px"></div> -->
      </div>
    </div>
    <div 
      class="head_nav"
      :class="{ 'active-head_nav': currentIndex === 1 }"
      @click="currentIndex = 1"
    >
      <span>账号管理</span>
      <div class="chacha">
        <span class="close-icon">×</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: null // 记录当前选中的导航项索引
    };
  }
};
</script>

<style lang="less" scoped>
.main {
  display: flex;
  // justify-content: space-between; 
  align-items: center;
}
.head_nav {
  background-color: #fff;
  width: auto; 
  min-width: 97px; 
  height: 30px;
  display: flex;
  align-items: center;
  border-radius: 6px;
  color: #ff9b45;
  font-size: 14px;
  padding: 0 10px; 
  // justify-content: center; 
  margin-left: 10px;
  border: 1px solid transparent;
  box-sizing: border-box; 
}
.head_nav:hover,
.active-head_nav {
  border: #ff9b45 1px solid;
}
.chacha:hover{
  background-color: #FFE7D3;
}
.chacha{
  width: 16px; 
  height: 16px; 
  background-color: #fff;
  border-radius: 50%; 
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 6px;
  border: 1px solid transparent; /* 设置透明边框 */
}
.close-icon {
  font-size: 12px; /* 调整关闭图标大小 */
  color: #ff9b45; /* 设置关闭图标颜色 */
}
</style>
