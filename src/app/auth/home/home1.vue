<template>
  <el-container
    :class="['_container', '_transition1']"
    :style="{ paddingLeft: paddingLeft }"
  >
    <el-header style="padding: 0px; height: auto">
      <!-- <el-radio-group v-model="isCollapse">
                <el-radio-button :label="false">展开</el-radio-button>
                <el-radio-button :label="true">收起</el-radio-button>
            </el-radio-group> -->
      <top-menu :isCollapse="isCollapse" ref="top_menu"></top-menu>
    </el-header>
    <el-container :style="{ backgroundColor: baseColor }" class="_inner_container">
      <el-aside :style="{ height: mainHeight, width: 'auto' }">
        <left-menu
          :mainHeight="menuHeight"
          :isCollapse="isCollapse"
          @toggleMenu="toggleMenu"
          @menuBottomHeight="getMenuBottomHeight"
        >
        </left-menu>
        <div class="line_shadow" :style="{ bottom: shadowLineBottom + 'px' }"></div>
      </el-aside>
      <el-main
        v-if="isRouterShow"
        :style="{
          height: mainHeight + 'px',
          overflow: 'hidden',
          backgroundColor: baseColorWhite,
        }"
        class="_inner_container"
      >
        <head-navigation ref="headNavigation"></head-navigation>
        <!-- 主体内容 -->
        <div class="main_box" v-if="isPermissionShow">
          <div class="bottom_left_tip _inner_container" ref="footers">
            <p>V1.0.2.32</p>
          </div>

          <transition
            name="slide-fade"
            mode="out-in"
            :duration="{ enter: 300, leave: 300 }"
          >
            <keep-alive :include="aliveList">
              <router-view
                ref="routewidth"
                :style="{
                  minHeight: routeHeight + 'px',
                  maxHeight: routeHeight + 'px',
                  overflow: 'auto',
                }"
              ></router-view>
            </keep-alive>
          </transition>
        </div>
        <!-- <transition name="fade-transform" mode="out-in" :duration="{ enter: 200, leave: 300 }">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive" ref="routewidth" class="home_bg" :style="{minHeight:routeHeight}"></router-view>
          </keep-alive>
        </transition>
        <transition name="fade-transform" mode="out-in" :duration="{ enter: 200, leave: 300 }">
          <router-view v-if="!$route.meta.keepAlive" ref="routewidth" class="home_bg" :style="{minHeight:routeHeight}"></router-view>
        </transition> -->
      </el-main>
    </el-container>
    <div class="bottom_tip _inner_container" ref="footers">
      <p>Copyright © 2022<span class="brand">浙江永泰隆 </span>出品</p>
      <!-- <el-button @click="onConfirm">发送</el-button> -->
      <device-dialog></device-dialog>
      <download-dialog></download-dialog>
    </div>
  </el-container>
</template>

<script>
import LeftMenu from "./left_menu_bar/left_menu_bar.vue";
import TopMenu from "./top_menu_bar/top_menu_bar.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import HeadNavigation from "./head_navigation/head_navigation.vue";
import menuMixin from "@/app/common/tools/menu_mixin.js";
import environment from "../../../environment";
import { DeviceDialog } from "../../components/index";
import DownloadDialog from "../../components/download-dialog/download-dialog.vue";
const { WEBSOCKET } = environment;
export default {
  components: { LeftMenu, TopMenu, HeadNavigation, DeviceDialog, DownloadDialog },
  mixins: [menuMixin],
  provide() {
    return {
      reload: this.reload, //中英文切换重新加载路由组件
    };
  },
  data() {
    return {
      // baseColor: "#57B8FF",
      baseColor: null,
      isCollapse: false,
      // height:'100vh',
      baseColorWhite: "#E8E8E8", //设置背景灰
      isRouterShow: true, //中英文切换重新加载路由组件
      websock: null,
      timer: null,
      dataList: [],
      moduleData: [], //模块权限数据
      isPermissionShow: false, //模块内容权限控制
      token: null,
      storedData: null,
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
  watch: {},
  created() {
    // this.getMoudleData();
    let that = this;
    window.onresize = () => {
      setTimeout(() => {
        that.getHeight(
          document.body.clientHeight,
          that.$refs.top_menu.$el.clientHeight,
          that.$refs.footers.clientHeight,
          that.$refs.headNavigation.$el.clientHeight
        );
      }, 300);
    };
    this.$nextTick(function () {
      this.getHeight(
        document.body.clientHeight,
        this.$refs.top_menu.$el.clientHeight,
        this.$refs.footers.clientHeight,
        this.$refs.headNavigation.$el.clientHeight
      );
    });
    this.initWebSocket();
    let Language = sessionStorage.getItem("acceptLanguage");
    this.$i18n.locale = Language;
    // 监听来自项目1的消息
    console.log("Binding receiveMessageFromProject1");
    window.addEventListener("message", this.receiveMessageFromProject1);
  },
  // beforeDestroy() {
  //   // 移除事件监听器
  //   window.removeEventListener("message", this.receiveMessageFromProject1);
  // },
  beforeDestroy() {
    if (this.socket) {
        this.socket.close();
    }
},
  mounted() {
    let style = localStorage.getItem("style");
    //设置默认的值
    if (style === null) {
      (style = 1), localStorage.setItem("style", style);
    }
    if (style == 1) {
      document.documentElement.style.setProperty("--theme_bg_color", "#57B8FF");
      document.documentElement.style.setProperty(
        "--theme_menuitemhover_color",
        "#4693CC"
      );
      document.documentElement.style.setProperty("--theme_treehover_color", "#EEF8FF");
      document.documentElement.style.setProperty("--theme_buttonbg_color", "#f0f9ff");
      document.documentElement.style.setProperty("--theme_tabledelete_color", "#f56c6c");
      document.documentElement.style.setProperty("--theme_tabletop_color", "#F6FBFF");
      document.documentElement.style.setProperty(
        "--theme_progressColor_color",
        "#A4E486"
      );
      document.documentElement.style.setProperty(
        "--theme_tableConfirmdel_color",
        "#F56C6C"
      );
      document.documentElement.style.setProperty(
        "--theme_treebackground_color",
        "#f0f9ff"
      );
      document.documentElement.style.setProperty("--theme_progress_color", "#a6d9ff");
      document.documentElement.style.setProperty("--theme_tablehover_color", "#f2faff");
    } else if (style == 2) {
      document.documentElement.style.setProperty("--theme_bg_color", "#FF6633");
      document.documentElement.style.setProperty(
        "--theme_menuitemhover_color",
        "#E84813"
      );
      document.documentElement.style.setProperty("--theme_treehover_color", "#fad6cb");
      document.documentElement.style.setProperty(
        "--theme_buttonbg_color",
        "rgba(255,102,51,0.10)"
      );
      document.documentElement.style.setProperty("--theme_tabledelete_color", "#666666");
      document.documentElement.style.setProperty("--theme_tabletop_color", "#fff2ee");
      document.documentElement.style.setProperty(
        "--theme_progressColor_color",
        "#FEC85F"
      );
      document.documentElement.style.setProperty(
        "--theme_tableConfirmdel_color",
        "#FEC85F"
      );
      document.documentElement.style.setProperty(
        "--theme_treebackground_color",
        "#fff7f4"
      );
      document.documentElement.style.setProperty("--theme_progress_color", "#feb096");
      document.documentElement.style.setProperty("--theme_tablehover_color", "#fff7f5");
    } else {
      document.documentElement.style.setProperty("--theme_bg_color", "#57B8FF");
      document.documentElement.style.setProperty(
        "--theme_menuitemhover_color",
        "#4693CC"
      );
      document.documentElement.style.setProperty("--theme_treehover_color", "#EEF8FF");
      document.documentElement.style.setProperty("--theme_buttonbg_color", "#f0f9ff");
      document.documentElement.style.setProperty("--theme_tabledelete_color", "#f56c6c");
      document.documentElement.style.setProperty("--theme_tabletop_color", "#F6FBFF");
      document.documentElement.style.setProperty(
        "--theme_progressColor_color",
        "#A4E486"
      );
      document.documentElement.style.setProperty(
        "--theme_tableConfirmdel_color",
        "#F56C6C"
      );
      document.documentElement.style.setProperty(
        "--theme_treebackground_color",
        "#f0f9ff"
      );
      document.documentElement.style.setProperty("--theme_progress_color", "#a6d9ff");
      document.documentElement.style.setProperty(
        "--theme_tablehover_color",
        "rgba(255,102,51,0.06)"
      );
    }
    // this.readLocalStorageData();
  },
  updated() {},
  methods: {
    ...mapActions({
      permissionRole: "USER_AuthorityModuleList",
      getAccountModuleList: "GetAccountModuleList",
    }),
    ...mapMutations(["getPermissionData"]),
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
    // getMoudleData() {
    //   this.getAccountModuleList({}).then((res) => {
    //     if (res.success == 1) {
    //       this.moduleData = res.data;
    //       this.getPermissionData(res.data);
    //       this.isPermissionShow = true;
    //     }
    //   });
    // },
    onConfirm() {
      //需要传输的数据
      let data = {
        code: 1,
        item: "传输的数据",
      };
      this.websocketsend(JSON.stringify(data));
    },
    initWebSocket() {
      if (typeof WebSocket === "undefined") {
        console.log("您的浏览器不支持socket");
      } else {
        // 初始化weosocket
        const URL = WEBSOCKET + "/webSocket";
        this.websock = new WebSocket(URL);

        // 监听websocket接收到消息事件
        this.websock.onmessage = this.websocketonmessage;
        // 监听websocket连接错误事件
        this.websock.onerror = this.websocketonerror;
        // 监听websocket连接打开事件
        this.websock.onopen = this.websocketonopen;
        // 监听websocket连接关闭事件
        this.websock.onclose = this.websocketclose;
      }
    },
    receiveMessageFromProject1(event) {
      console.log("event.data:", event.data);
      console.log("event.data:", event.origin);
      if (event.data.type === "webpackOk") {
        console.log("忽略 Webpack 开发服务器的消息");
        return;
      }
     
      const expectedOrigin = event.origin;
      if (event.origin !== expectedOrigin) {
        console.log("消息来源不匹配:", event.origin);
        return;
      }

      if (typeof event.data === "object" && event.data.type === "storedData") {
        this.storedData = event.data.data;
        // 将数据用于websocketsend
        console.log("打印接收数据在项目2里面", this.storedData);
        this.websocketsend(this.storedData);
      } else {
        console.log("event.data 不符合预期:", event.data);
      }
    },
    // readLocalStorageData(){
    //   let storedData = localStorage.getItem('token2');
    //   console.log("dayin111-1",storedData)
    //   if (storedData) {
    //     this.storedData = storedData
    //     this.axiosData = JSON.parse(storedData);
    //     console.log("打印了吗",this.axiosData);
    //   }else{
    //     console.log("没有打印",this.axiosData);
    //   }
    // },
    websocketonopen() {
      // 连接建立之后执行send方法发送数据
      console.log("WebSocket连接成功");
      if (this.storedData) {
    this.websocketsend(this.storedData);
  } else {
    console.log("storedData 未定义");
  }
    },
    websocketonerror() {
      console.log("WebSocket连接失败");
    },
    websocketonmessage(e) {
      const receiveData = JSON.parse(e.data);
      console.log("receive数据接收", receiveData);
      this.$bus.$emit("messageNotification", receiveData);
      if (receiveData.success == 4) {
        window.location.href = 'http://localhost:8080/';
        // this.$router.replace("/login");
        return;
      }
      if (receiveData.responseType == 1) {
        if (receiveData.success == 1 && receiveData.data) {
          // this.$router.replace("/home");
          sessionStorage.setItem("requestId", receiveData.data);
        }
      } else if (receiveData.responseType == 3) {
        const data = receiveData.data;
        this.$bus.$emit("missionData", data);
      } else if (receiveData.responseType == 4) {
        const data = receiveData.data;
        console.log("AlarmMessage", data);
        this.$bus.$emit("eventMessageData", data);
      } else if (receiveData.responseType == 2) {
        // console.log("DeviceData数据error", receiveData.data);
        const data = receiveData.data;
        this.$bus.$emit("DeviceData", receiveData.data);
        if (data.errorSource == 0) {
        } else if (data.errorSource == 1 || data.errorSource == 2) {
          // this.$bus.$emit("webSocketError");
          let errorMsg = "";
          if (data.errorSource == 2) {
            errorMsg += this.$t("ytlPage.deviceEndErrorMessage");
            if (data.errorCode == 1) {
              errorMsg += this.$t("ytlMeterReading.addressNotExist");
            } else if (data.errorCode == 2) {
              errorMsg = this.$t("ytlMeterReading.offlineMeter");
            } else if (data.errorCode == 3) {
              errorMsg += this.$t("ytlMeterReading.serveNotRun");
            } else if (data.errorCode == 4) {
              errorMsg += this.$t("ytlMeterReading.channelBusy");
            } else if (data.errorCode == 5) {
              errorMsg += this.$t("ytlMeterReading.timeOut");
            } else if (data.errorCode == 6) {
              errorMsg += this.$t("ytlMeterReading.deviceEmpty");
            } else if (data.errorCode == 7) {
              errorMsg += this.$t("ytlMeterReading.theSameTask");
            } else if (data.errorCode == 8) {
              errorMsg += this.$t("ytlMeterReading.deviceAbnormalReplay");
            }
          } else if (data.errorSource == 1) {
            errorMsg += this.$t("ytlPage.frontEndErrorMessage");
            if (data.errorCode == 1) {
              errorMsg += this.$t("ytlMeterReading.addressNotExist");
            } else if (data.errorCode == 2) {
              errorMsg = this.$t("ytlMeterReading.offlineMeter");
            } else if (data.errorCode == 3) {
              errorMsg += this.$t("ytlMeterReading.serveNotRun");
            } else if (data.errorCode == 4) {
              errorMsg += this.$t("ytlMeterReading.channelBusy");
            } else if (data.errorCode == 5) {
              errorMsg += this.$t("ytlMeterReading.timeOut");
            } else if (data.errorCode == 6) {
              errorMsg += this.$t("ytlMeterReading.deviceEmpty");
            } else if (data.errorCode == 7) {
              errorMsg += this.$t("ytlMeterReading.theSameTask");
            } else if (data.errorCode == 8) {
              errorMsg += this.$t("ytlMeterReading.deviceAbnormalReplay");
            }
          }
          this.$message.error(errorMsg);
        }
        this.$bus.$emit("DataFor");
      } else if (receiveData.responseType == 5) {
        this.$bus.$emit("interfaceMonitor", receiveData.data);
        const interfaceInfoTaskId = sessionStorage.getItem("interfaceInfoTaskId");
        if (receiveData.data.taskId == interfaceInfoTaskId) {
          this.dataList.push(receiveData.data);
          if (this.dataList.length > 1000) {
            this.dataList.shift();
          }
          sessionStorage.setItem("interfaceMessage", JSON.stringify(this.dataList));
        }
      }
    },
    websocketsend(Data) {
      if (this.websock.readyState === WebSocket.OPEN) {
    console.log("打印发送数据:", Data);
    this.websock.send(Data);
  } else {
    console.error("WebSocket 连接未打开，无法发送数据");
  }
    },
    websocketclose(e) {
      // 关闭
      console.log("已关闭连接", e);
      // this.$router.replace("/Login");
      const requestId = sessionStorage.getItem("requestId");
      if (requestId) {
        this.initWebSocket();
      }
    },
  },
  watch: {
    // aliveList(val) {
    //   console.log(val);
    // },
  },
  destroyed() {
    sessionStorage.removeItem("groupInfo");
    sessionStorage.removeItem("requestId");
    this.websock.close();
    this.$bus.$off("DeviceData");
    this.$bus.$off("webSocketError");
    this.$bus.$off("missionData");
    this.$bus.$off("groupInfo");
    this.$bus.$off("messageNotification");
    this.$bus.$off("eventMessageData");
  },
};
</script>

<style scoped lang="less">
.brand {
  color: var(--theme_bg_color);
}
._container {
  height: 100vh;
  overflow: hidden;
  position: relative;
  background: #FFF9F4;
}
/* .home_bg {
  background-color: #fff;
} */
.el-main {
  padding: 0px;
  border-radius: 20px 0 0 0;
  /* background-color: #E8E8E8; */
}
._inner_container {
  /* padding-right: 22px; */
  z-index: 9;
  background: var(--theme_bg_color);
}
._transition1 {
  padding-left: 50px;
  transition: 0.3s padding-left ease-in-out;
}
.bottom_tip {
  /* width: 50%; */
  margin-left: 50%;
  position: absolute;
  bottom: 2px;
  /* background:transparent; */
  /* pointer-events: none; */
  z-index: 888; /* 设置更高的 z-index */
  background-color: transparent; /* 将背景设置为透明 */
}
.bottom_tip > p {
  font-size: 12px;
  color: #cccccc;
  padding: 4px 0 6px 0;
}
.line_shadow {
  width: 100%;
  height: 0px;
  position: absolute;
  left: 0px;
  /* box-shadow: 0px -3px 8px 2px rgb(46 167 255); */
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
.common_bg {
  border-radius: 15px 15px 25px 25px;
  padding-top: 15px;
  /* padding-right: 10px; */
}
</style>
