<template>
  <div class="top_menu" ref="top_menu">
    <div :class="['menu_logo', !isCollapse ? 'avtor_open' : 'avtor_close']">
      <!-- <div class="menu_img">
        <img
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          alt=""
          srcset=""
          :class="[
            'fade-transform-enter-active',
            !isCollapse ? 'img_open' : 'img_close',
          ]"
        />
      </div> -->
      <!-- <div class="fade_name">
        <div
          :class="[
            '_row_between',
            '_transition',
            !isCollapse ? 'name_show' : 'name_hide',
          ]"
        >
          <p class="text_ellipsis">{{ username }}</p>
          <i
            style="color: #fff"
            class="icon-shezhi iconfont pointer"
            @click="toSet"
          ></i>
        </div>
      </div> -->
    </div>
    <!-- <div class="top_menu_right"> -->
    <div :class="['top_menu_right',!isCollapse ? 'header_title_open' : 'header_title_close',]">
      <!-- header 最左侧 -->
      <div class="_row">
        <div class="menu_title">
          <img :src="logoUrl" alt="" srcset="" />
          <p>{{ companyName }}</p>
        </div>
      </div>

      <div class="menu_right_list">

        <!-- 消息数字 -->
        <el-badge :value="todoNum" :hidden="isHidden" :max="99" class="item" size="mini" />
        <!-- 下载 -->
        <i class="ami-icon-xiazai" @click="getdownLoadList()" > </i>
        <!-- 主页 -->
        <i class="ami-icon-shouye1" @click="Home()"></i>
        <!-- 告警 -->
        <i class="ami-icon-tixing" @click="Alarm()"></i>
        <!-- 报表 -->
        <i class="ami-icon-shuju" @click="Report()"></i>
        <!-- 地图 -->
        <i class="ami-icon-ditu" @click="Ditu()"></i>
        <!-- 语言切换 -->
        <el-dropdown class="left_icon curpointer" @command="toggleLanguage" placement="bottom">
          <div class="left_icon">
            <i style="font-size: 0.120208rem; color: #fff" :class="Language_icon"></i>
          </div>
          <el-dropdown-menu slot="dropdown" style="margin-left: 15px;">
            <el-dropdown-item command="0">简体中文</el-dropdown-item>
            <el-dropdown-item command="1">English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- 账号信息 -->
        <i @click="Edit()">
          <icon-svg icon-class="ami-icon-zhanghao1" style="font-size: 12px; margin-top: 6px;margin-left: -5px;" />
        </i>
        <!-- 登出 -->
        <i  class="ami-icon-tuichu2 margin_right10" style="margin-left: -5px;margin-top: 4px;"  @click="logout" ></i>
        <user-edit :showDetails="showDetails" ></user-edit>
        <Derivedlist ref="downloadList" ></Derivedlist>
        <!-- 告警消息弹窗 -->
        <div v-if="messageShow"  class="information" id="message">
          <!-- 箭头/阴影 -->
          <div class="arrow"></div>
          <div class="arrow2"></div>
          <div class="head_text">
            <p>{{ this.$t("ytlPage.alarmevents") }}</p>
          </div>
          <el-table 
          :data="messageDataList"
          style="width: 98%;"
          :height="200 / 192 + 'rem'"
          >
            <el-table-column 
            :label="$t('ytlMessageManagement.ExceptionName')"
            prop="disc"
            align="center"
            ></el-table-column>
            <el-table-column 
            :label="$t('ytlMessageManagement.AlarmDescription')"
            prop="content"
            align="center"
            ></el-table-column>
            <el-table-column 
            :label="$t('ytlMessageManagement.OccurrenceTime')"
            prop="happenTimeStr"
            align="center"
            ></el-table-column>
          </el-table>
          <div class="operate">
            <span @click="mone">{{ this.$t("ytlPage.viewmore") }}<i class="el-icon-arrow-right"></i></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from "vuex";
  import Derivedlist from "./child_edit/downLoadList.vue"
  import UserEdit from "./child_edit/userEdit.vue";
  export default {
    components: { UserEdit, Derivedlist},
    inject: ["reload"],
    mixins: [],
    props: {
      isCollapse: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        Language_icon: "",
        timer: null,
        imgStyle: { width: 40 / 192 + "rem", height: 40 / 192 + "rem" },
        url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        username: "nickName",
        companyName: "浙江永泰隆电子股份有限公司",
        logoUrl: "@/assets/img/logo1.png",
        todoNum: 0,
        isHidden: false,
        showDetails: false,
        showAlert: false,
        messageShow: false,
        messageDataList: [],//存放webscoket推送最新告警消息
        list: [],  
        downLoadList:[],//存放导出数据
      };
    },
    created() {
      if (this.$i18n.locale == "zh-CN") {
        this.Language_icon = "ami-icon-a-zhongyingwenzhongwen";
      } else {
        this.Language_icon = "ami-icon-zhongyingwenyingwen";
      }
    },
    mounted() {
      let that = this;
      this.$bus.$on("userNameModify", function (data) { });
      let sessionCompanyName = sessionStorage.getItem("companyName");
      if (sessionCompanyName) {
        that.companyName = sessionCompanyName;
      }
      let sessionAccountName = sessionStorage.getItem("accountName");
      if (sessionAccountName) {
        that.username = sessionAccountName;
      }
      let sessionLogoUrl = sessionStorage.getItem("logoUrl");
      if (sessionLogoUrl) {
        if (sessionLogoUrl != "assets/img/logo1.png") {
          that.logoUrl = sessionLogoUrl;
        } else {
          this.logoUrl = require("@/assets/img/logo1.png");
        }
        if (sessionLogoUrl == 'null') {
          this.logoUrl = require("@/assets/img/logo1.png");
        }
      } else {
        this.logoUrl = require("@/assets/img/logo1.png");
      }
      this.$bus.$on("eventMessageData", function (data) {
        if (data) {
          that.getNewMessageList(JSON.parse(data))
          console.log("接收数据",data,JSON.parse(data));
        }
      });

    },
    destroyed() {
      this.$bus.$off("userNameModify");
      this.$bus.$off("eventMessageData");
    },
    methods: {
      ...mapActions({
        MessageNotmessage: "Message_Not_message", //获取消息
        MessageNotmessageIsRead: "Message_Not_messageIsRead", //消息未读
        MessageTest:"message_Test"
      }),
      toSet() {
        console.log("topMenuHeight>>>", this.topMenuHeight);
      },
      // 中英文切换
      toggleLanguage(e) {
        this.$i18n.locale = e == 1 ? "en-US" : "zh-CN";
        if (this.$i18n.locale == "zh-CN") {
          this.Language_icon = "ami-icon-a-zhongyingwenzhongwen";
        } else {
          this.Language_icon = "ami-icon-zhongyingwenyingwen";
        }
        sessionStorage.setItem("acceptLanguage", this.$i18n.locale);
        // location.reload();
        this.reload();
      },
      //账户头像下的菜单
      logout(e) {
        this.$confirm(this.$t("ytlTips.isLogout"), this.$t("ytlPage.tip"), {
          confirmButtonText: this.$t("ytlPage.comfirm"),
          cancelButtonText: this.$t("ytlPage.cancel"),
          type: "warning",
          confirmButtonClass: 'btn-custom-confirm',
          cancelButtonClass: 'btn-custom-cancel',
        })
          .then(() => {
            this.$router.replace("/Login");
          })
          .catch(() => { });
      },
      // 回主页图标
      Home() {
        this.$router.push("/home/homePage");
      },
      //编辑按钮
      Edit() {
        this.showDetails = true;
      },
      // 告警图标
      Alarm() {
        this.messageShow = !this.messageShow;
        if (this.messageShow == false) {
          if (this.messageDataList.length !== 0) {
            this.messageDataList = [];
            localStorage.setItem('eventMessageNumber', 0);
            this.todoNum = 0;
            localStorage.setItem('eventMessage', ''); 
          }
        }
      },
      // 当websocket推送消息时 获取最新告警
      getNewMessageList(data) {
        // 获取localStorage中的数据
        const eventMessage=localStorage.getItem('eventMessage');
        if (eventMessage) {  this.messageDataList = JSON.parse(eventMessage);}
        this.messageDataList.push(data)
        //再设置localStorage回去
        localStorage.setItem('eventMessage', JSON.stringify(this.messageDataList));

        // 获取未读告警数量
        const MessageNumber = localStorage.getItem('eventMessageNumber');
        if (!isNaN(MessageNumber)) {
          localStorage.setItem('eventMessageNumber', parseInt(MessageNumber) + 1);
          this.todoNum =parseInt(MessageNumber) + 1;
        } else {
           localStorage.setItem('eventMessageNumber', 1);
           this.todoNum =1;
        }
        //测试接口发送
        // this.MessageTest({}).then((res)=>{
        //   // console.log(res.data);
        // })
      },
      //正常获取未读告警
      getMessageList(){
        // 获取localStorage中的数据
        const eventMessage = localStorage.getItem('eventMessage');
        if (eventMessage) {
          this.messageDataList = JSON.parse(eventMessage);
        }
        const MessageNumber = localStorage.getItem('eventMessageNumber');
        if (MessageNumber) {
          this.todoNum=parseInt(MessageNumber) 
        }
      },
      //报表图标
      Report() {
        // this.$router.push("/stateMent/statementManagement");
        // 获取当前的路由地址
        const currentRoute = this.$router.currentRoute;
        // 判断当前的地址和导航目标地址是否相同
        if (currentRoute.path !== '/systemConfig/reportConfig') {
        this.$router.push("/systemConfig/reportConfig");
        }
      },
      // 地图图标
      Ditu() {
        // 获取当前的路由地址
        const currentRoute = this.$router.currentRoute;
        // 判断当前的地址和导航目标地址是否相同
        if (currentRoute.path !== '/gisMap/mapShow') {
        this.$router.push("/gisMap/mapShow");
        }
      },
      //跳转消息管理
      mone() {
        // 获取当前的路由地址
        const currentRoute = this.$router.currentRoute;
        // 判断当前的地址和导航目标地址是否相同
        if (currentRoute.path !== '/meterReading/readingReport/pushNotification') {
          this.$router.push("/meterReading/readingReport/pushNotification")
        }
        this.messageShow = false;
        if (this.messageDataList.length !== 0) {
          this.messageDataList = [];
          localStorage.setItem('eventMessageNumber', 0);
          this.todoNum = 0;
          localStorage.setItem('eventMessage', '');
        }
      },
      // 导出下载图标
      getdownLoadList(){
          this.$refs.downloadList.downLoadShow= ! this.$refs.downloadList.downLoadShow
      },
      handleOutsideClick(event) {
        const popupElement = document.getElementById('message');
        if (!popupElement.contains(event.target)) {
          // 点击的元素不在弹窗内部，隐藏弹窗
          this.messageShow = false;
        }
      }
    },
    watch:{
      messageShow(val) {
      if (val == true) {
        this.getMessageList();
        setTimeout(() => {
          document.addEventListener('click', this.handleOutsideClick);
        }, 500); 
      } else {
        document.removeEventListener('click', this.handleOutsideClick);
      }
    }
    }
  };
</script>

<style scoped lang="less">
  .top_menu {
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;

    /* // background-color: #409eff; */
    .top_menu_right {
      width: 100%;
      display: flex;
      margin-left: -242px;
      align-items: center;
      justify-content: space-between;

      .menu_title {
        display: flex;
        align-items: center;

        img {
          width: 38px;
          height: 38px;
        }

        p {
          margin-left: 16px;
          color: #ffffff;
          font-size: 30px;
        }
      }

      .right_icon {
        width: 20px;
        height: 20px;
        margin-right: 20px;
        display: flex;
        align-items: center;
      }

      .right_icon :hover {
        width: 20px;
        height: 20px;
        margin-right: 20px;
        opacity: 0.8;
        display: flex;
        align-items: center;
      }

      .left_icon {
        width: 20px;
        height: 20px;
        margin-right: 40px;
      }

      .left_icon:hover {
        width: 20px;
        height: 20px;
        opacity: 0.8;
        margin-right: 40px;
      }

      .menu_right_list {
        display: flex;
        align-items: center;
        margin-right: 0px;

        .menu_dropdown {
          padding: 0 10px;
          height: 60px;
        }
        i {
          color: #fff;
          font-size: 0.120208rem;
          padding: 0 15px;
        }

        i:hover {
          cursor: pointer;
          opacity: 0.8;
        }
        .menu_dropdown :hover {
          padding: 0 10px;
          /* // background-color: #0080ff; */
          opacity: 0.6;
          height: 60px;
        }

        .head_portrait {
          display: flex;
          align-items: center;
          /* // height: 60px; */
          /* // width: 150px; */
          padding: 0 10px;
          height: 60px;

          p {
            pointer-events: none;
            color: #ffffff;
            font-size: 16px;
            margin-right: 10px;
          }

          i {
            pointer-events: none;
            color: #ffffff;
          }
        }
      }
    }

    .header_title_open {
      margin-left: -242px;
    }

    .header_title_close {
      margin-left: 0px;
    }

    .avtor_open {
      /* // padding: 0 13px; */
      width: 250px;
    }

    .avtor_close {
      /* // padding: 0 20px 0 0px; */
      /* // padding-left: 13px; */
      width: 65px;
    }

    .img_open {
      width: 34px;
      height: 34px;
      /* // transition: width 0.5s ease-out; */
    }

    .img_close {
      width: 40px;
      height: 40px;
      /* // transition: width 0.5s ease-out; */
    }

    .name_show {
      opacity: 1;
      width: 100%;
    }

    .name_hide {
      opacity: 0;
      width: 0;
    }

    .menu_logo {
      display: flex;
      align-items: center;
      position: relative;
      /* // background-color: #65affb; */
      transition: all 0.5s ease-out;
      /* // transition: 0.45s width ease-out, 0.3s padding-left ease-in-out, */
      /* // 0.3s padding-right ease-in-out; */
      height: 70px;

      .fade_name {
        position: absolute;
        right: 0px;
        width: 70%;
        margin-left: 8px;
        margin-right: 20px;

        p {
          font-size: 20px;
          color: #ffffff;
          font-weight: 500;
        }
      }

      .menu_img {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        border-radius: 20px;

        img {
          border-radius: 40px;
          padding: 1px;
        }
      }
    }
  }

  /* // .fade-enter-active,
  // .fade-leave-active {
  //   transition: opacity 0.2s;
  //   //   transition: all 0.5s;
  //   // width: 500px;
  // } */
  .fade-enter,
  .fade-leave-active {
    opacity: 0;
    /* //   transform:translatex(-200px); */
    /* //   transform-origin: 0 100% 0; */
    /* //   transform: scaleX(2); */
  }

  .curpointer {
    cursor: pointer;
  }

  .app_down {
    min-width: 177px;
    padding: 0px 16px 8px 16px;
    border-bottom: 1px solid #e9e9e9;
    color: rgba(0, 0, 0, 0.65);
    font-weight: 500;
    margin-bottom: 5px;
  }

  .splice_line {
    width: 1px;
    height: 20px;
    background-color: #e8ecf3;
  }

  .img {
    position: relative;
  }

  img:after {
    content: url("/assets/img/logo1.png");
    display: block;
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 38px;
    height: 38px;
  }
  .item {
    position: absolute;
    margin-top: -18px;
    margin-left: 110px;
  }



  .operate {
    height: 30px;
    /* margin-top: 16px; */
    border-top: 1px solid #dcdfe6;

    span {
      color: var(--theme_bg_color);
      font-size: 14px;
      margin-left: 20px;
      line-height: 20px;
      cursor: pointer;

      i {
        color: var(--theme_bg_color);
        margin-left: -1px;
      }
    }
  }

/deep/.el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover{
  color: var(--theme_bg_color);
}
/deep/.el-dropdown-menu__item:not(.is-disabled):hover{
  background-color: var(--theme_buttonbg_color);
}
/deep/.el-table th.el-table__cell.is-leaf{
  background: #fff;
}

@media (min-width: 1366px) and (max-width: 1920px) {
  .information {
    width: 520px;
    background: #ffffff;
    position: absolute;
    right: 20px;
    top:  0.4rem;
    z-index: 10;
    border-radius: 5px;
    border: 1px solid #e2e2e2;
    box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.25);
    .gao {
      margin-left: 5px;
      font-size: 16px;
    }
    .arrow {
      position: absolute; 
      width: 0;
      height: 0; 
      border-left: 25px solid transparent; 
      border-right: 25px solid transparent; 
      border-bottom: 25px solid  var(--theme_tabletop_color); 
      top: -23px; 
      left: 218px; 
      z-index: 11 ; 
    }
    .arrow2{
      position: absolute; 
      width: 0;
      height: 0; 
      border-left: 25px solid transparent; 
      border-right: 25px solid transparent; 
      border-bottom: 25px solid #5e5d5d3c; 
      top: -24px; 
      left: 218px;
      z-index: 8  
    }
    .head_text{
      display: flex;
      align-items: center;
      width: 100%; 
      height: 35px;
      background-color: var(--theme_tabletop_color);
      line-height: 12px; 
      /* text-align: center; */
      p{
        font-size:13px;
        color: var(--theme_bg_color); 
        line-height: 12px; 
        text-align: LEFT;
        margin-left:15px
      }
    }
  }
}

@media (max-width: 1366px) {
  .information { 
    width: 520px;
    background: #ffffff;
    position: absolute;
    right: 25px;
    top:  0.4rem;
    z-index: 10;
    border-radius: 5px;
    border: 1px solid #e2e2e2;
    box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.25);
    .gao {
      margin-left: 5px;
      font-size: 16px;
    }
    .arrow {
      position: absolute; 
      width: 0;
      height: 0; 
      border-left: 25px solid transparent; 
      border-right: 25px solid transparent; 
      border-bottom: 25px solid  var(--theme_tabletop_color); 
      top: -23px; 
      left: 218px; 
      z-index: 11 ; 
    }
    .arrow2{
      position: absolute; 
      width: 0;
      height: 0; 
      border-left: 25px solid transparent; 
      border-right: 25px solid transparent; 
      border-bottom: 25px solid #5e5d5d3c; 
      top: -24px; 
      left: 218px;
      z-index: 8  
    }
    .head_text{
      display: flex;
      align-items: center;
      width: 100%; 
      height: 35px;
      background-color: var(--theme_tabletop_color);
      line-height: 12px; 
      /* text-align: center; */
      p{
        font-size:13px;
        color: var(--theme_bg_color); 
        line-height: 12px; 
        text-align: LEFT;
        margin-left:15px
      }
    }
  }
}
</style>
