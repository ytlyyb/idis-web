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
      :active-text-color="'#57B8FF'"
      :collapse-transition="true"
      :style="{
        height: menuHeight + 'px',
        paddingTop: '18px',
        overflowY: 'scroll',
      }"
    >
      <template v-for="(ele, i) in moduleMenu">
        <div
          v-bind:key="i + '-isCollapse'"
          :class="[
            'menu_title',
            !isCollapseTitle ? 'title_show' : 'title_hide',
          ]"
        >
          <p class="_menu_text">{{ $t(ele.title) }}</p>
        </div>
        <template v-for="(item, index) in ele.children">
          <el-tooltip
            :key="index + '-only' + i"
            class="item_tooltip"
            effect="dark"
            :content="$t(item.title)"
            :disabled="!isCollapseTitle"
            placement="right"
          >
            <el-menu-item :index="item.route" :disabled="item.disabled">
              <div class="_row" style="height: 100%">
                <i v-if="item.icon" :class="item.icon"></i>
                <img v-else :src="item.img" alt="" srcset="" />
                <!-- <i v-if="item.icon" :class="item.icon"></i>
              <img v-else :src="item.img" alt="" srcset="" /> -->
                <span slot="title" class="font16">{{ $t(item.title) }}</span>
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
import { mapActions } from "vuex";
import menuList from "../../../common/resources/menu.js";
export default {
  mixins: [],
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
  data() {
    return {
      list: menuList,
      baseColor: "#57B8FF",
      isCollapseTitle: false,
      menuBottomHeight: 30,
      moduleMenu: [],
    };
  },
  watch: {
    mainHeight(val) {
      if (val) {
        // console.log(this.$refs.menuBottom.clientHeight);
        this.menuBottomHeight = this.$refs.menuBottom.clientHeight;
        this.$emit("menuBottomHeight", this.$refs.menuBottom.clientHeight);
      }
    },
  },
  computed: {
    menuList() {
      let menu = menuList;
      return menu;
    },
    menuHeight() {
      if (this.menuBottomHeight) {
        return this.mainHeight - this.menuBottomHeight - 18;
      } else {
        return this.mainHeight;
      }
    },
  },
  created() {},
  mounted() {
    this.getModuleMenu();
  },
  methods: {
    ...mapActions({
      getModuleList: "GetModuleList",
    }),
    getModuleMenu() {
      this.getModuleList({}).then((res) => {
        if (res.success == 1) {
          this.moduleMenu = [];
          this.controlMenu(res.data);
        }
      });
    },
    controlMenu(menu) {
      for (const item in this.list) {
        if (item == 0 && menu[item].menuName == "ytlMenu.homePage") {
          this.moduleMenu.push(this.list[item]);
        } else {
          const isShow = this.searchMenu(menu, this.list[item]);
          if (isShow) {
            this.moduleMenu.push({
              children: [],
              title: this.list[item].title,
            });
            for (const item1 in this.list[item].children) {
              const isShowChildren = this.searchMenu(
                menu[isShow].moduleTreeList,
                this.list[item].children[item1]
              );
              if (isShowChildren) {
                this.moduleMenu[this.moduleMenu.length - 1].children.push(
                  this.list[item].children[item1]
                );
              }
            }
          }
        }
      }
    },
    searchMenu(menu, moduleObject) {
      for (const item in menu) {
        if (menu[item].menuName == moduleObject.title) {
          return item;
        }
      }
      return 0;
    },
    searchChildMenu(moduleList, childMenu) {
      for (const item in moduleList) {
        if (moduleList[item].menuName == childMenu.title) {
          return;
        }
      }
    },
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
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    menuSelect(e) {
      // console.log(e);
      // this.$bus.$emit("routeChange",e)
      // this.$emit("routeChange")
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
.title_show {
  height: 20px;
  opacity: 1;
  margin-bottom: 9px;
  margin-top: 13px;
}
.title_hide {
  /* height: 20px; */
  opacity: 0;
  height: 0px;
  margin-bottom: 0px;
}
.menu_title {
  transition: 0.3s all ease;
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
.width222 {
  /* left: 83px; */
  width: 222px;
}
.width43 {
  /* left: 13px; */
  width: 63px;
}
.el-menu-vertical-demo{
  background: red;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 222px;
  min-height: 400px;
}
.el-menu {
  border-right: none !important;
}
/* .el-menu-item:hover {
  background-color: rgb(3, 19, 33) !important;
} */
.el-menu-item.is-active {
  border-radius: 60px 0px 0px 60px;
  background-color: white !important;
  width: 100%;
  height: 43px;
  line-height: 43px;
  color: var(--theme_bg_color) !important;
}
.el-menu-item {
  height: 43px;
  line-height: 43px;
  border-radius: 60px 0px 0px 60px;
  /* margin-bottom: 13px; */
  padding-left: 20px !important;
}
/* #E84813 */
.el-menu-item:hover {
  border-radius: 60px 0px 0px 60px;
  background: var(--theme_menuitemhover_color) !important;
  width: 100%;
  height: 43px;
  line-height: 43px;
}
.el-menu-item.is-active {  
  color: var(--theme_bg_color) !important;  
  background: #ffffff !important;  
} 
.line_shadow {
  width: 258px;
  height: 0px;
  position: absolute;
  top: 0px;
  box-shadow: 0px -3px 8px 2px rgb(46 167 255);
}
.el-menu-item i {
  color: white;
}
.el-menu-item.is-active i {
  color: inherit;
}
.collapse-transition {
  transition: 0.5s height ease-in, 0.3s padding-top ease-in-out,
    0.3s padding-bottom ease-in-out;
}
.horizontal-collapse-transition {
  transition: 0.5s width ease-out, 0.3s padding-left ease-in-out,
    0.3s padding-right ease-in-out;
}
/* .item_tooltip {
  width: 40px;
  left: 70px !important;
} */
</style>