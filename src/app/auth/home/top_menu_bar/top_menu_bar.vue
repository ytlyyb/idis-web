<template>
  <div class="top_menu" ref="top_menu">
    <!-- <div :class="['menu_logo', !isCollapse ? 'avtor_open' : 'avtor_close']"></div> -->
    <div
      :class="[
        'top_menu_right',
        !isCollapse ? 'header_title_open' : 'header_title_close',
      ]"
    >
      <div class="_row">
        <div class="menu_title">
          <img :src="logoUrl" alt="" srcset="" />
          <p>{{ companyName }}</p>
        </div>
      </div>

      <div class="menu_right_list">
        <!-- 主页 -->
        <i class="ami-icon-shouye1" @click="Home()"></i>
        <!-- 语言切换 -->
        <el-dropdown
          class="left_icon curpointer"
          @command="toggleLanguage"
          placement="bottom"
        >
          <div class="left_icon">
            <i style="font-size: 0.120208rem; color: #fff" :class="Language_icon"></i>
          </div>
          <el-dropdown-menu slot="dropdown" style="margin-left: 15px;background-color: #fff; width: fit-content;">
            <el-dropdown-item command="0" class="custom-dropdown-item">简体中文</el-dropdown-item>
            <el-dropdown-item command="1" class="custom-dropdown-item">English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- 登出 -->
        <i
          class="ami-icon-tuichu2 margin_right10"
          style="margin-left: -5px; margin-top: 4px"
          @click="logout"
        ></i>
        <!-- <user-edit :showDetails="showDetails"></user-edit> -->
        <!-- <Derivedlist ref="downloadList" ></Derivedlist> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
      logoUrl: "@/assets/img/logo1.png",
      companyName: "IDIS",
      showDetails: false,
    };
  },
  methods: {
    Home() {
      this.$router.push("/home/homePage");
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
    logout(e) {
      this.$confirm(this.$t("idisTips.isLogout"), this.$t("idisPage.tip"), {
        confirmButtonText: this.$t("idisPage.comfirm"),
        cancelButtonText: this.$t("idisPage.cancel"),
        type: "warning",
        confirmButtonClass: "btn-custom-confirm",
        cancelButtonClass: "btn-custom-cancel",
      })
        .then(() => {
          this.$router.replace("/Login");
        })
        .catch(() => {});
    },
  },
  created() {
    if (this.$i18n.locale == "zh-CN") {
      this.Language_icon = "ami-icon-a-zhongyingwenzhongwen";
    } else {
      this.Language_icon = "ami-icon-zhongyingwenyingwen";
    }
  },
};
</script>

<style scoped lang="less">
.top_menu {
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;

  .top_menu_right {
    width: 100%;
    display: flex;
    // margin-left: -242px;
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
.curpointer {
  cursor: pointer;
}

/deep/ .custom-dropdown-item {
  list-style: none;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background-color: #fff;
  width: 100%;
  margin: 0;
  font-size: 14px;
}

.custom-dropdown-item:hover {
  color:#fff;
  background-color: #fde7d4;
}

/deep/.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
  // color: var(--theme_bg_color);
  color:#fff;
}
/deep/.el-dropdown-menu__item:not(.is-disabled):hover {
  // background-color: var(--theme_buttonbg_color);
  background-color: #ffcca0;
}
/deep/.el-table th.el-table__cell.is-leaf {
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
