<template>
  <div class="login_bg _col_center" id="login">
    <div class="bg_img">
      <img :src="loginBackGround" alt="" srcset="" style="width: 100%; height: 100%" />
    </div>
    <div class="thailand_Style">
      <div class="logo-title-container">
        <img :src="logo" alt="" srcset="" style="width: 10%; height: 10%" />
        <p class="sign_p">{{ $t("idisLogin.signIn") }}</p>
      </div>
      <el-radio-group v-model="languageChinese" class="language" size="small">
        <el-radio-button label="中文" class="language_btn"></el-radio-button>
        <el-radio-button label="English" class="language_btn"></el-radio-button>
      </el-radio-group>
      <el-form
        ref="loginForm"
        :style="{ marginTop: formLocation, width: '70%' }"
        :model="loginForm"
        :rules="loginFormRules"
        class="login_form"
      >
        <!-- 账号 -->
        <el-form-item
          prop="userName"
          :label="$t('idisLogin.username')"
          class="login_input"
        >
          <el-input
            v-model="loginForm.userName"
            :placeholder="$t('idisLogin.input_account')"
            @keyup.enter.native="toLogin"
            style="margin-top: 2%"
          >
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item
          prop="password"
          :label="$t('idisLogin.password')"
          class="login_input"
        >
          <el-input
            v-model="loginForm.password"
            :type="showPassword ? 'text' : 'password'"
            :placeholder="$t('idisLogin.input_password')"
            @keyup.enter.native="toLogin"
            style="margin-top: 2%"
          ></el-input>
        </el-form-item>

        <el-form-item class="btns">
          <el-button
            type="primary"
            :loading="loading"
            class="login_btn1"
            @click="toLogin"
            style="margin-top: 13%"
            >{{ $t("idisLogin.signIn") }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="adaptive-container">
      <p class="welcome_text">Welcome</p>
      <p class="welcome_text2">
        We Are Constantly Committed To Researching,Developing,And Promoting Innovative
        Products With Unique Value
      </p>
      <div class="img-wrapper">
        <img
          :src="loginbg"
          alt=""
          srcset=""
          class="adaptive-img"
        />
        <p class="inn_text"
        >
          Innovation, Never Stopping
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      loginForm: {
        userName: null,
        password: null,
        // code: null,
        // uniqueNumber: null,
      },
      loading: false,
      showPassword: false,
      loginFormRules: {},
      formLocation: "10%",
      languageChinese: "English",
      logo: require("../../../assets/img/login_img/ICMMain 1.png"),
      loginBackGround: require("../../../assets/img/login_img/bg.png"),
      loginbg: require("../../../assets/img/login_img/login_bg2.png"),
      account: require("../../../assets/img/login_img/login_account.png"),
    };
  },
  methods: {
    ...mapActions({
      getCode: "GET_IMGCODE",
      login: "AMI_LOGIN",
    }),
    toLogin() {
      this.trim();
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.login(this.loginForm).then((res) => {
            if (res.responseCode == 1) {
              this.$message.success(this.$t("ytlLogin.login_success"));
              sessionStorage.setItem("token", res.token);
              
              // sessionStorage.setItem("token", 'admin');
              this.$router.push("/home");
              if (this.checked) {
                localStorage.setItem(
                  "loginInfo",
                  JSON.stringify({
                    userName: this.loginForm.userName,
                    password: this.loginForm.password,
                  })
                );
              } else {
                localStorage.removeItem("loginInfo");
                localStorage.setItem(
                  "loginInfo",
                  JSON.stringify({
                    userName: this.loginForm.userName,
                    password: null,
                  })
                );
              }
            } else {
              this.getSuccessMessage(res)
              this.loginForm.code = null;
              this.loginForm.password = null;
              this.getImgCode();
            }
          });
        } else {
          return false;
        }
      });
    },
    trim() {
      this.loginForm.userName = this.loginForm.userName.replace(
        /(^\s*)|(\s*$)/g,
        ""
      );
      this.loginForm.password = this.loginForm.password.replace(
        /(^\s*)|(\s*$)/g,
        ""
      );
    },
    async setData() {
      const settings = await this.getDataConfiguration();
      sessionStorage.setItem("settings", JSON.stringify(settings));
      this.$i18n.locale = settings.language;
      sessionStorage.setItem("acceptLanguage", this.$i18n.locale);
      if (this.$i18n.locale == "zh-CN") {
        this.languageChinese = "中文";
      } else {
        this.languageChinese = "English";
      }
      let localeStyle = localStorage.getItem("style");
      this.style = localeStyle;
      if (localeStyle == null) {
        localStorage.setItem("style", settings.style);
        this.style = settings.style;
      }
    },
    //设置表单校验
    setFormRules() {
      const validateAccount = (rule, value, callback) => {
        let a = /^[a-zA-Z_]+$/;
        if (!a.test(value)) {
          callback(new Error(this.$t("idisLogin.limit_account")));
        } else {
          callback();
        }
      };

      this.loginFormRules = {
        userName: [
          {
            required: true,
            message: this.$t("idisLogin.input_account"),
            trigger: "blur",
          },
          {
            min: 6,
            max: 25,
            message: this.$t("idisLogin.limit_password"),
            trigger: "blur",
          },
          { required: true, trigger: "change", validator: validateAccount },
        ],
        password: [
          {
            required: true,
            message: this.$t("idisLogin.input_password"),
            trigger: "blur",
          },
          {
            min: 6,
            max: 25,
            message: this.$t("idisLogin.limit_password"),
            trigger: "blur",
          },
        ],
        // code: [
        //   {
        //     required: true,
        //     message: this.$t("idisLogin.input_code"),
        //     trigger: "blur",
        //   },
        //   { required: true, trigger: "change", validator: validateCode },
        // ],
      };
    },
  },
  watch: {
    //监听语言切换
    "$i18n.locale": function () {
      this.setFormRules();
    },
    languageChinese: function () {
      if (this.languageChinese == "English") {
        this.$i18n.locale = "en-US";
        sessionStorage.setItem("acceptLanguage", this.$i18n.locale);
      } else {
        this.$i18n.locale = "zh-CN";
        sessionStorage.setItem("acceptLanguage", this.$i18n.locale);
      }
    },
  },
};
</script>

<style lang="less" scoped>
html {
  font-size: 12px;
}
#login {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.logo-title-container {
  display: flex;
  align-items: center;
  margin-top: 45px;
  margin-left: 35px;
}
.login_bg {
  width: 100%;
  height: 100%;
  position: relative;
}
.bg_img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  right: 0px;
}
.login_box {
  width: 1278px;
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.4) 56%,
    rgb(255, 255, 255) 56%
  );
  position: absolute;
  z-index: 999;
  border-radius: 30px;
}
.login_form_box {
  width: 44%;
}

.thailand_Style {
  margin-left: 43%;
  margin-top: -60px;
  background: #fdf6f0;
  border-radius: 16px;
  width: 520px;
  height: 463px;
  z-index: 999;
  position: relative;
  .sign_p {
    font-size: 36px;
    font-family: Microsoft YaHei, Microsoft YaHei-Bold;
    color: #333333;
    font-weight: 700;
    // margin-top: 45px;
    margin-left: 10px;
  }
  .language {
    position: absolute;
    top: 20px;
    right: 20px;
    height: 30px;
    display: flex;
    align-items: center;
    // width: 80%;
    .language_btn {
      height: 28px;
    }
  }
}

.login_form {
  margin-left: 80px;
  .login_input2 {
    display: flex;
    flex-wrap: wrap;
    .verification_box {
      display: flex;
      .code_img1 {
        width: 146px;
        height: 39px;
        margin-left: 10px;
      }
    }
  }
  .login_bottom {
    margin-bottom: 8%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .btns {
    display: flex;
    justify-content: center;
    padding-bottom: 10%;
    .login_btn1 {
      width: 361px;
      height: 40px;
      border-radius: 10px;
      background-color: #ff9b45;
    }
  }
  .error_login {
    margin-top: -5%;
  }
}

/deep/.el-radio-button:first-child .el-radio-button__inner {
  color: #ff9b45;
  background-color: #fdf6f0;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border: 1px solid #ff9b45;
  border-right: none;
  width: 55px !important;
}

/deep/.el-radio-button:last-child .el-radio-button__inner {
  color: #ff9b45;
  background-color: #fdf6f0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border: 1px solid #ff9b45;
  border-left: none;
  width: 70px;
}
/deep/.el-radio-button__orig-radio:checked + .el-radio-button__inner {
  color: #fff;
  background-color: #ff9b45;
}
/deep/.el-radio-button--small .el-radio-button__inner {
  font-size: 14px;
}
/deep/.el-radio-button__orig-radio:checked + .el-radio-button__inner {
  box-shadow: -0.005208rem 0 0 0 #000;
}
/deep/ .login_input .el-input--medium .el-input__inner {
  width: 360px;
  height: 40px;
  line-height: 40px;
}
/deep/.el-input__inner:hover {
  border-color: #ff9b45;
}

/deep/.el-input__inner {
  border-color: #ccc;
}
/deep/ .login_input2 .el-input--medium .el-input__inner {
  width: 200px;
  height: 40px;
  line-height: 40px;
}
/deep/ .el-form-item {
  margin-bottom: 15px;
}

/deep/.el-checkbox__inner {
  border: 1px solid #ccc;
}

/deep/.el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
  content: "";
}
/deep/ .el-input__inner:focus {
  border-color: #ff9b45; /* 焦点状态下的边框颜色 */
  outline: none; /* 移除默认的焦点轮廓 */
}
/* 自定义表单校验错误提示样式 */
/deep/ .el-form-item__error {
  color: red !important; /* 将错误提示文字颜色改为红色 */
  font-size: 12px; /* 调整字体大小 */
  margin-top: 4px; /* 调整错误提示与输入框的间距 */
}

.adaptive-container {
  width: 100%;
  box-sizing: border-box;
}
.img-wrapper {
  width: 100%;
  overflow: hidden;
}
.welcome_text {
  font-size: 0.55rem;
  font-weight: 700;
  color: #b56000;
  position: absolute;
  top: 29%;
  left: 11%;
}
.welcome_text2 {
  font-size: 0.14rem;
  color: #b56000;
  position: absolute;
  top: 42%;
  left: 11%;
  width: 718px;
  line-height: 45px;
  letter-spacing: 2px;
}
.adaptive-img{
  max-width: 100%;
            max-height: 100%;
            position: absolute;
            left: 11%;
            top: 58%;
}
.inn_text{
  font-size: 0.16rem;
            color: #b56000;
            position: absolute;
            top: 58%;
            left: 11%;
            width: 718px;
            text-align: center;
            line-height: 1.5;
            margin-top: 83px;
}
</style>
