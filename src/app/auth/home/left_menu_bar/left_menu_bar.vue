<template>
  <div
    class="_menu"
    :style="{
      height: mainHeight + 'px',
    }"
  >
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="menuSelect"
      :router="true"
      :collapse="isCollapse"
      :text-color="'#fff'"
      :active-text-color="'#fff'"
      :collapse-transition="true"
      :style="{
        height: menuHeight + 'px',
        paddingTop: '18px',
        overflowY: 'scroll',
      }"
    >
      <template>
        <div>电表数据</div>
        <template>
          <el-tooltip
            effect="dark"
            :disabled="!isCollapseTitle"
            placement="right"
          >
          <el-menu-item>
            <div class="_row" style="height: 100%">
              <span class="font16">实时数据</span>
            </div>
          </el-menu-item>
          </el-tooltip>
      </template>
      <template>
          <el-tooltip
            effect="dark"
            :disabled="!isCollapseTitle"
            placement="right"
          >
          <el-menu-item>
            <div class="_row" style="height: 100%">
              <span class="font16">负荷曲线</span>
            </div>
          </el-menu-item>
          </el-tooltip>
      </template>
      </template>
    </el-menu>
    <div
      ref="menuBottom"
      :class="[
        'menu_bottom',
        '_col_center',
        !isCollapse ? 'width222' : 'width43',
      ]"
    >
      <div class="toggleMenu_icon" @click="toggleMenu">
        <i
          v-if="isCollapse"
          class="ami-icon-zhankai font18"
          style="color: #fff; cursor: pointer"
        ></i>
        <i
          v-else
          class="ami-icon-shouqi font18"
          style="color: #fff; cursor: pointer"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isCollapse: {
      type: Boolean,
      default: true,
    },
    mainHeight: {
      type: Number,
      default: 0,
    },
  },
  data(){
    return {
      isCollapseTitle: false,
    }
  },
  watch: {
    mainHeight(val) {
      if (val) {
        console.log(this.$refs.menuBottom.clientHeight);
        // 打印menuBottom的clientHeight，并赋值给menuBottomHeight
        this.menuBottomHeight = this.$refs.menuBottom.clientHeight;
        // 向父组件发出menuBottomHeight事件，并传递menuBottom的高度
        this.$emit("menuBottomHeight", this.$refs.menuBottom.clientHeight);
      }
    },
  },
  computed: {
    menuHeight() {
      if (this.menuBottomHeight) {
        return this.mainHeight - this.menuBottomHeight - 18;
      } else {
        return this.mainHeight;
      }
    },
  },
  methods: {
    toggleMenu() {
      if (this.isCollapse) {
        this.$emit("toggleMenu", !this.isCollapse);
        setTimeout(() => {
          this.isCollapseTitle = !this.isCollapseTitle;
        }, 600);
      } else {
        this.isCollapseTitle = !this.isCollapseTitle;
        setTimeout(() => {
          this.$emit("toggleMenu", !this.isCollapse);
        }, 300);
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    menuSelect(e) {
      console.log(e);
      this.$bus.$emit("routeChange",e)
      this.$emit("routeChange")
    },
  },
};
</script>

<style scoped>
._menu {
  position: relative;
}
._menu_text {
  font-size: 14px;
  color: #fff;
}
.el-menu-vertical-demo {
  background: #ff9b45;
  /* background: red; */
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 222px;
  min-height: 400px;
}
.menu_bottom {
  width: auto;
  /* height: 20px; */
  padding-top: 20px;
  z-index: 999;
  position: absolute;
  left: 0;
  bottom: 0px;
  transition: 0.5s width ease;
}
</style>
