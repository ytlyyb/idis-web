<template>
  <el-container
    :class="['_container', '_transition1']"
    style="display: flex; flex-direction: column"
  >
    <el-header style="padding: 0px; height: auto; padding-left: 50px">
      <top-menu :isCollapse="isCollapse" ref="top_menu"></top-menu>
    </el-header>

    <el-container style="flex: 1; display: flex; flex-direction: column">
      <el-main
        style="
          flex: 1;
          background-color: #fff2e7;
          border-top-left-radius: 30px;
          border-top-right-radius: 30px;
          display: flex;
          gap: 10px;
        "
      >
        <el-aside
          style="
            background-color: #ff9b45;
            width: 10%;
            height: 86vh;
            margin-left: 26px;
            margin-top: 26px;
            border-radius: 20px;
            overflow: hidden;
          "
        >
          <div class="scrollable-menu-container">
            <el-menu style="padding-top: 15%; padding-left: 12%">
              <template v-for="(menuGroup, menuIndex) in menuGroups">
                <div
                  class="center-between"
                  @click="toggleMenuGroup(menuIndex)"
                  :key="`menu-${menuIndex}`"
                >
                  <i :class="[menuGroup.icon11, 'icon-size-20']"></i>
                  <span>{{ menuGroup.title }}</span>
                  <div class="icon-right-align">
                    <i
                      :class="[
                        menuGroup.expanded
                          ? 'ami-icon-zhankai-copy'
                          : menuGroup.iconClass,
                        'font20',
                      ]"
                      style="padding-left: 30px"
                    ></i>
                  </div>
                </div>
                <el-menu-item
                  v-if="menuGroup.expanded"
                  v-for="(item, itemIndex) in menuGroup.items"
                  :key="`menu-${menuIndex}-item-${itemIndex}`"
                  :index="item.index"
                  class="custom-menu-item"
                  :class="{ 'active-menu-item': selectedMenuItem === item }"
                  @click="selectMenuItem(item)"
                  @mouseenter="handleMouseEnter(item)"
                  @mouseleave="handleMouseLeave(item)"
                  >{{ item.title }}</el-menu-item
                >
              </template>
            </el-menu>
          </div>
        </el-aside>
        <div class="main-content-container" style="margin-top: 26px">
          <head-navigation></head-navigation>
          <comm-communication
            style="margin-top: 10px"
            v-if="selectedMenuItem && selectedMenuItem.index === '4-1'"
          ></comm-communication>
          <En-Encryption
            style="margin-top: 10px"
            v-if="selectedMenuItem && selectedMenuItem.index === '4-2'"
          ></En-Encryption>
          <Account-Management
           style="margin-top: 10px"
            v-if="selectedMenuItem && selectedMenuItem.index === '4-3'"
          ></Account-Management>
          <RealTime
          style="margin-top: 10px"
            v-if="selectedMenuItem && selectedMenuItem.index === '1-1'">
            
          </RealTime>
          <div class="information_tab fixed-information-tab">
            <el-radio-group
              v-model="radioValue"
              style="display: flex; flex-direction: row"
            >
              <el-radio-button label="information">information</el-radio-button>
              <el-radio-button label="message">message</el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </el-main>
    </el-container>
    <el-footer style="height: 0px"></el-footer>
  </el-container>
</template>

<script>
// import LeftMenu from "./left_menu_bar/left_menu_bar copy.vue"
import HeadNavigation from "./head_navigation/head_navigation.vue";
import TopMenu from "./top_menu_bar/top_menu_bar.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import CommCommunication from "../../pages/xitong/communication.vue";
import EnEncryption from "../../pages/xitong/encryption.vue";
import AccountManagement from "../../pages/xitong/account_management.vue"
import RealTime from "../../pages/meterdata/real_time_data.vue"
import menuMixin from "@/app/common/tools/menu_mixin.js";
export default {
  components: { TopMenu, CommCommunication, HeadNavigation, EnEncryption, AccountManagement,RealTime },
  mixins: [menuMixin],
  provide() {
    return {
      reload: this.reload, //中英文切换重新加载路由组件
    };
  },
  data() {
    return {
      baseColor: null,
      isCollapse: false,
      isRouterShow: true, //中英文切换重新加载路由组件
      baseColorWhite: "#E8E8E8", //设置背景灰
      isPermissionShow: false,
      // 菜单组数据
      menuGroups: [
        {
          icon11: "ami-icon-dianbiaoshuju",
          title: "电表数据",
          iconClass: "ami-icon-zhankai-copy-copy",
          expanded: false,
          items: [
            { index: "1-1", title: "实时数据" },
            { index: "1-2", title: "负荷曲线" },
            { index: "1-3", title: "月账单" },
            { index: "1-4", title: "事件" },
            { index: "1-5", title: "电网质量" },
            { index: "1-6", title: "读取所有OBIS" },
            { index: "1-7", title: "告警" },
          ],
        },
        {
          icon11: "ami-icon-duxiecanshu",
          title: "读写参数",
          iconClass: "ami-icon-zhankai-copy-copy",
          expanded: false,
          items: [
            { index: "3-1", title: "基本参数" },
            { index: "3-2", title: "阈值" },
            { index: "3-3", title: "GPRS" },
            { index: "3-4", title: "费率" },
            { index: "3-5", title: "预付费" },
            { index: "3-6", title: "告警配置" },
            { index: "3-7", title: "在线TOKEN" },
          ],
        },
        {
          icon11: "ami-icon-dianbiaokongzhi",
          title: "电表控制",
          iconClass: "ami-icon-zhankai-copy-copy",
          expanded: false,
          items: [
            { index: "2-1", title: "继电器" },
            { index: "2-2", title: "清事件" },
            { index: "2-3", title: "通讯密码" },
            { index: "2-4", title: "升级" },
          ],
        },
        {
          icon11: "ami-icon-xitong",
          title: "系统",
          iconClass: "ami-icon-zhankai-copy-copy",
          expanded: false,
          items: [
            { index: "4-1", title: "通讯设置" },
            { index: "4-2", title: "加密设置" },
            { index: "4-3", title: "账号管理" },
            { index: "4-4", title: "修改密码" },
          ],
        },
      ],
      selectedMenuItem: null, // 当前选中的菜单项
      hoveredMenuItem: null, // 当前鼠标悬浮的菜单项
      radioValue: "information", // 默认选中顶部标签页
    };
  },
  computed: {
    ...mapGetters({ aliveList: "keepAlivePage" }),
    paddingLeft() {
      if (this.isCollapse) {
        return "13px";
      } else {
        return "36px";
      }
    },
  },
  created() {
    // 找到系统菜单组并展开
    const systemMenuIndex = this.menuGroups.findIndex((group) => group.title === "系统");
    if (systemMenuIndex !== -1) {
      this.menuGroups[systemMenuIndex].expanded = true;
      // 找到通讯设置菜单项并选中
      const communicationItem = this.menuGroups[systemMenuIndex].items.find(
        (item) => item.index === "4-1"
      );
      if (communicationItem) {
        this.selectMenuItem(communicationItem);
      }
    }
  },

  methods: {
    toggleMenu(val) {
      //   console.log(val)
      this.isCollapse = val;
    },
    //中英文切换重新加载路由组件
    async reload() {
      this.isRouterShow = false;
      await this.$nextTick();
      this.isRouterShow = true;
    },
    // 切换菜单组的展开状态
    toggleMenuGroup(index) {
      this.menuGroups[index].expanded = !this.menuGroups[index].expanded;
    },
    // 选择菜单项
    selectMenuItem(item) {
      this.selectedMenuItem = item;
    },
    handleMouseEnter(item) {
      this.hoveredMenuItem = item;
    },
    handleMouseLeave(item) {
      this.hoveredMenuItem = null;
    },
    websocketonopen() {
      // 连接建立之后执行send方法发送数据
      console.log("WebSocket连接成功");
      const token = sessionStorage.getItem("token");
      this.websocketsend(token);
    },
    websocketonerror() {
      console.log("WebSocket连接失败");
    },
  },
};
</script>

<style scoped lang="less">
._container {
  height: 100vh;
  overflow: hidden;
  position: relative;
  background: #ff9b45;
}
._transition1 {
  // padding-left: 50px;
  transition: 0.3s padding-left ease-in-out;
}
._inner_container {
  /* padding-right: 22px; */
  z-index: 9;
  background: #fff;
}
.line_shadow {
  width: 100%;
  height: 0px;
  position: absolute;
  left: 0px;
  /* box-shadow: 0px -3px 8px 2px rgb(46 167 255); */
}
.main_box {
  padding: 0%;
  margin-left: 15px;
  width: 98%;
  position: relative;
  .bottom_left_tip {
    position: absolute;
    bottom: 12px;
    left: 12px;
    z-index: 888; /* 设置更高的 z-index */
    background-color: transparent; /* 将背景设置为透明 */
  }
  .bottom_left_tip > p {
    font-size: 14px;
    color: #999;
    padding: 4px 0 6px 0;
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

/deep/ .el-menu span {
  color: white;
  font-size: 16px;
}
/deep/ .el-menu-item {
  color: white;
  font-size: 14px;
  list-style: none; /* 去掉列表项目符号 */
  // margin-bottom: 22px;
  padding-left: 40px !important;
  position: relative; /* 为伪元素定位做准备 */
  z-index: 2;
  transition: all 0.3s ease;
}
/deep/ .el-menu-item {
  background-color: #ff9b45;
}
/deep/ .custom-menu-item:hover,
/deep/ .active-menu-item {
  color: #ff9b45;
  // background-color: red;
}
/deep/ .custom-menu-item:hover::before,
/deep/ .active-menu-item::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 65%;
  height: 28px;
  background-color: #ffefe1;
  opacity: 0.83;
  border-radius: 6px; /* 可根据需要添加圆角 */
  z-index: -1;
}
/deep/ .el-menu {
  background-color: #ff9b45;
  border: none;
}

/deep/ .el-menu i {
  color: white;
  margin-right: 8px;
}
/deep/ .el-menu .center-between {
  display: flex;
  align-items: center; /* 垂直居中 */
  margin-bottom: 30px; /* 可根据需要调整底部间距 */
}
.icon-size-20 {
  font-size: 20px;
}
.icon-right-align {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
}

.main-content-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* 滚动容器样式 */
.scrollable-menu-container {
  height: 100%;
  overflow-y: auto;
  /* 隐藏滚动条 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
.scrollable-menu-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
.information_tab {
  margin-top: 10px;
  // background-color: #fff;
  width: 85%;
  height: 17%;
  border-radius: 20px;
}
.fixed-information-tab {
  position: fixed;
  top: 80%;
  background-color: #fff;
  border-radius: 20px;
  width: 83% !important;
}
/deep/ .el-radio-group {
  // border-radius: 20px; /* 与容器圆角一致 */
  // border: 1px solid #FF9B45;
  margin-top: 10px;
  margin-left: 10px;
  width: 10%; /* 改为自动宽度 */
  padding: 2px; /* 添加内边距 */
  display: inline-flex; /* 防止拉伸 */
  gap: 0; /* 移除默认间隔 */
}

/deep/ .el-radio-button {
  flex: 1; /* 均分宽度 */
  margin: 0; /* 移除负边距 */
  border: none;
  transition: all 0.3s;

  /* 文本完整显示 */
  .el-radio-button__inner {
    white-space: nowrap;
    padding: 8px 20px; /* 增大内边距 */
    color: #333;
  }

  /* 悬停样式 */
  &:not(.is-active):hover {
    .el-radio-button__inner {
      color: #000; /* 字体变黑 */
      background-color: rgba(255, 155, 69, 0.1); /* 浅色背景 */
    }
  }

  /* 激活状态 */
  &.is-active {
    .el-radio-button__inner {
      background-color: #ff9b45;
      color: white;
      border-color: #ff9b45;
    }
  }
}

/* 确保容器不遮挡 */
.fixed-information-tab {
  width: auto; /* 根据内容自适应 */
  padding: 0 20px; /* 添加左右内边距 */
}
/deep/ .el-radio-button__orig-radio {
  display: none;
  outline: none !important;
}
/deep/ .el-radio-button__inner.is-active:focus {
  box-shadow: 0 0 0 0 transparent !important;
  outline: none !important;
}
/deep/ .el-radio-button.is-active:focus {
  box-shadow: 0 0 0 0 transparent !important;
  outline: none !important;
}
/deep/ .el-radio-button__inner:not(.is-active):focus {
  outline: none !important;
}
/deep/.el-radio-button__orig-radio:checked +.el-radio-button__inner {
    border-color: none; /* 去掉边框颜色 */
    box-shadow: none; /* 去掉阴影 */
    // color: initial; /* 恢复文本颜色初始值，可根据实际需求调整 */
}
</style>
