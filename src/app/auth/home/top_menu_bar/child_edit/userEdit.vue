<template>
  <div>
    <el-drawer
      :title="$t('ytlSystem.accountBasicInfo')"
      :append-to-body="true"
      :visible.sync="drawer"
      @close="closeDrawer"
    >
      <div class="user_header">
         <img v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" alt="" >
          <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" alt="">
      </div>
      <div class="form_content">
      <el-form ref="rulesForm" :model="userInfo" :rules="rules">
        <el-form-item :label="$t('ytlSystem.accountID')" prop="accountId" :label-width="formLabelWidth">
           <p>{{userInfo.accountId || '--'}}</p>
        </el-form-item>
        <el-form-item :label="$t('ytlSystem.accountNickName')" prop="accountName" :label-width="formLabelWidth">
           <el-input v-model="userInfo.accountName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('ytlSystem.email')" prop="email" :label-width="formLabelWidth">
           <el-input v-model="userInfo.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('ytlSystem.gender')"
          :label-width="formLabelWidth"
        >
          <el-radio v-model="userInfo.sex" :label="1">{{
            $t("ytlSystem.male")
          }}</el-radio>
          <el-radio v-model="userInfo.sex" :label="0">{{
            $t("ytlSystem.female")
          }}</el-radio>
        </el-form-item>
        <el-form-item :label="$t('ytlSystem.role')" prop="roleName" :label-width="formLabelWidth">
           <p>{{userInfo.roleName || '--'}}</p>
        </el-form-item>
         <!-- <el-form-item :label="$t('ytlSystem.logo')" :label-width="formLabelWidth"> -->
         
        <!-- </el-form-item> -->
         <el-form-item
          :label="$t('ytlSystem.logo')"
          :label-width="formLabelWidth"
        >
         <img v-if="userInfo.companyLogoUrl" :src="userInfo.companyLogoUrl" alt="" class="logo_info">
          <p v-else><img src="@/assets/img/logo1.png" alt=""></p>
          <div class="upload_card">
          <el-upload
            :action="URL_LOGIN_SERVICE + '/file/noAuth/image/upload'"
            :limit="1"
            list-type="picture-card"
            :auto-upload="true"
            ref="upload_file"
            :class="{ hide: hideUrl }"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
            :file-list="refList"
          >   
            <!-- <i slot="default" class="el-icon-plus"></i> -->
            <span class="Edit_logo">{{$t('ytlPage.Updatelogo')}}</span>
            <!-- <div slot="tip" class="el-upload__tip" style="margin-top:-70px ; margin-bottom:30px ;line-height: 20px;;">只能上传jpg/png文件，
              <br >且大小不超过2M</div>  -->
             <div slot="file" slot-scope="{ file }">
              <img
                class="el-upload-list__item-thumbnail"
                :src="userInfo.companyLogoUrl"
                alt=""  
              />
               <span class="el-upload-list__item-actions">
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span> 
            </div> 
          </el-upload>
          </div>
        </el-form-item>
        <el-form-item :label="$t('ytlTips.Style')" :label-width="formLabelWidth"> 
          <el-select
            v-model="style"
            :placeholder="$t('ytlPage.pleaseSelect')"
            class="source"
            @change="changeStyle"
          >
            <el-option
              v-for="item of styleList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
         <el-form-item :label="$t('ytlSystem.companyName')" prop="companyName" :label-width="formLabelWidth">
          <el-input v-model="userInfo.companyName " autocomplete="off"></el-input>
        </el-form-item>
       
        <div class="btn">
        <el-button type="primary" plain  @click="cancel" class="margin_right10">{{$t('ytlPage.cancel')}}</el-button>
        <el-button type="primary" @click="revise('rulesForm')">
          {{$t('ytlPage.edit')}}</el-button>
      </div>
      </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import environment from "@/environment";
import { styleList } from "./tableList";
export default {
  props: {
    showDetails: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const validateAccount = (rule, value, callback) => {
      let a = /^[a-zA-Z_]+$/;
      if (!a.test(value)) {
        callback(new Error(this.$t("ytlLogin.limit_account")));
      } else {
        callback();
      }
    };
    const validateEmail = (rule, value, callback) =>{
      let a = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (!a.test(value)) {
        callback(new Error(this.$t("ytlLogin.email_limit")));
      } else {
        callback();
      }
    } 
    return {
      drawer: false,
      showReset: false,
      showStatus: false,
      accountStatus: 0,
      hideUrl: false,
      refList: [],
      disabled: false,
      URL_LOGIN_SERVICE: environment.HOSTHOME,
      logoUrl: "@/assets/img/logo1.png",
      userInfo:{
        accountId: null,
        createTime: null,
        email: null,
        accountName:null,
        companyName:null,
        companyLogoUrl: null,
        avatarUrl:null,
        sex:null,
        roleName:null,
        roleId: null,
        id:null
      },
      formLabelWidth: '150px',
      timer: null,
      rules: {
        accountId: [
          {
            min: 6,
            max: 25,
            message: this.$t("ytlLogin.limit_password"),
            trigger: "blur",
          },
          { trigger: "change", validator: validateAccount },
        ],
        accountName: [
          {
            min: 3,
            max: 20,
            message: this.$t("ytlSystem.roleNameLimit"),
            trigger: "blur",
          },
        ],
        companyName: [
          {
            min: 4,
            max: 50,
            required: true,
            message: this.$t("ytlSystem.roleNoteLimit"),
            trigger: "blur",
          },
        ],
        email:[
          {
            required: true,
            message: this.$t("ytlLogin.email_limit"),
            trigger: "blur",
          },
          { type :"email", trigger: "change", validator: validateEmail },
        ],
      },
      style: 1,
      styleList:styleList
    };
  },
  watch: {
    showDetails(val) {
      this.drawer = val;
    },
  },
  created(){
    // this.getuserInfo()
  },
  mounted(){
    let style = localStorage.getItem('style');
    // console.log('风格',style);
    if (style == 1) {
      this.style = 1
    } else if(style == 2) {
      this.style = 2
    }
  },
  methods: {
    ...mapActions({
      getInfo: "GET_USERINFO",//获取用户信息
      ReviseAccount:"ReviseAccount" //修改用户
    }),
    changeStyle(e){
        this.style=e
    },

    //主题切换
    styleChange(e){
       localStorage.setItem('style',e);
      if ( e == 1 ) {
        document.documentElement.style.setProperty("--theme_bg_color","#57B8FF");
        document.documentElement.style.setProperty("--theme_menuitemhover_color","#4693CC");
        document.documentElement.style.setProperty("--theme_treehover_color","#EEF8FF");
        document.documentElement.style.setProperty("--theme_buttonbg_color","#f0f9ff");
        document.documentElement.style.setProperty("--theme_tabledelete_color","#f56c6c");
        document.documentElement.style.setProperty("--theme_tabletop_color","#F6FBFF");
        document.documentElement.style.setProperty("--theme_progressColor_color","#A4E486");
        document.documentElement.style.setProperty("--theme_tableConfirmdel_color","#F56C6C");
        document.documentElement.style.setProperty("--theme_treebackground_color","#f0f9ff");
        document.documentElement.style.setProperty("--theme_progress_color","#a6d9ff");
        document.documentElement.style.setProperty("--theme_tablehover_color","#f2faff");
      } else if (e == 2) {
        document.documentElement.style.setProperty("--theme_bg_color","#FF6633");
        document.documentElement.style.setProperty("--theme_menuitemhover_color","#E84813");
        document.documentElement.style.setProperty("--theme_treehover_color","#fad6cb");
        document.documentElement.style.setProperty("--theme_buttonbg_color","rgba(255,102,51,0.10)");
        document.documentElement.style.setProperty("--theme_tabledelete_color","#666666");
        document.documentElement.style.setProperty("--theme_tabletop_color","#fff2ee");
        document.documentElement.style.setProperty("--theme_progressColor_color","#FEC85F");
        document.documentElement.style.setProperty("--theme_tableConfirmdel_color","#FEC85F");
        document.documentElement.style.setProperty("--theme_treebackground_color","#fff7f4");
        document.documentElement.style.setProperty("--theme_progress_color","#feb096");
        document.documentElement.style.setProperty("--theme_tablehover_color","#fff7f5");
      }
    },
    cancel(){
      this.$parent.showDetails = false;
    },
    closeDrawer() {
      // this.getuserInfo()
      this.$parent.showDetails = false;
    },
    changeStatus(status) {
      this.accountStatus = status;
      this.showStatus = true;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error(this.$t("ytlSystem.pleaseImgUpload"));
      }
      if (!isLt2M) {
        this.$message.error(this.$t("ytlSystem.imgTooBig")); 
      }
      return isJPG && isLt2M;
    },
    handleRemove() {
      this.$refs["upload_file"].clearFiles();
      this.refList = [];
      this.hideUrl = this.refList.length >= 1;
    },
    handleAvatarSuccess(res, file) {
      if (res.success == 1) {
        this.userInfo.companyLogoUrl = res.data;
        this.refList.push({ url: res.data });
        this.hideUrl = this.refList.length >= 1;
      }
    },
    // getuserInfo(){
    //   this.getInfo({}).then(res =>{
    //     if(res.success == 1){
    //      this.userInfo.accountId = res.data.accountId
    //      this.userInfo.accountName = res.data.accountName
    //      this.userInfo.email = res.data.email
    //      this.userInfo.companyName = res.data.companyName
    //      this.userInfo.companyLogoUrl =res.data.companyLogoUrl
    //      this.userInfo.avatarUrl = res.data.avatarUrl
    //      this.userInfo.sex = res.data.sex
    //      this.userInfo.roleName = res.data.roleName
    //      this.userInfo.roleId = res.data.roleId
    //      this.userInfo.id = res.data.id
    //     //  设置账号id 
    //     sessionStorage.setItem("accountId",res.data.id);
    //     }
    //   })
    // },
    // 修改
    revise(){
      this.$refs.rulesForm.validate((valid)=>{
        if(valid){
        this.$confirm(this.$t("ytlTips.signInAgain"), this.$t("ytlPage.tip"), {
        confirmButtonText: this.$t("ytlPage.comfirm"),
        cancelButtonText: this.$t("ytlPage.cancel"),
        type: "warning",
        confirmButtonClass: 'btn-custom-confirm',
        cancelButtonClass: 'btn-custom-cancel',
      })
        .then(() => {
          this.ReviseAccount(this.userInfo).then(res=>{
          if(res.success ==1){
          this.styleChange(this.style) 
          this.$router.replace("/Login");
          }
        })
        })
        .catch(() => {});
       
        }
      })
    },
  },
};
</script>

<style lang="less" scoped>
.el-form{
  margin-top: 84px;
}
.form_content{
  margin-right: 20px;
}
/deep/.el-drawer__header {
  margin-top: 40px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    width: 160px;
    margin-left: 160px;
    font-size: 18px;
    // text-decoration: line-through;
    // text-decoration-style: 'height:6px';
    // text-decoration-color: black;
    // border-bottom: 6px solid #A6D9FF;
  }
}
/deep/.el-drawer.rtl {
  width: 436px !important;
  background-image: linear-gradient(
   var(--theme_bg_color) 20%,
    rgb(255, 255, 255) 20%
  );
}
.user_header {
  // display: flex;
  // justify-content: center;
  // align-items: center;
  margin-left: 45%;
  margin-top: 20px;
  width: 102px;
  height: 102px;
  border-radius: 50%;
  border: 1px solid #fff;
  img {
    width: 94px;
    height: 94px;
    margin-top: 3px;
    margin-left: 3px;
    border-radius: 50%;
  }
}
.btn {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  margin-left: 90px;
  .el-button {
    width: 80px;
    height: 36px;
  }
  
}
/deep/.hide .el-upload--picture-card {
  display: none;
}
.logo_info{
  width: 75px;
  height: 75px;
  border: 1px solid #F0F2F5;
}
.upload_card{
  margin-top: -30px;
  margin-left: 90px;
  // position: absolute;
  // right: 120px;
  // bottom: 10px;
}
.Edit_logo{
  color:var(--theme_bg_color);
  text-decoration: underline;
  white-space:nowrap;
}
/deep/.el-upload-list__item {
  margin-top: -60px;
  // margin-left: 10px;
  width: 75px;
  height: 75px;
  border-radius: 8px;
}
/deep/.el-upload--picture-card {
  width: 75px;
  height: 20px;
  // background: #f4f4f5;
  border: 0px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-icon-plus {
    color: #bfbfbf;
  }
}

/* 改变整体rl-radio颜色 */

/deep/.el-radio__input.is-checked+.el-radio__label{
  color: var(--theme_bg_color) !important;
}

/deep/ .el-radio__input.is-checked .el-radio__inner {
  border-color: var(--theme_bg_color) !important; /* 设置选中状态下的边框颜色为红色 */
  background-color: var(--theme_bg_color)  !important; /* 设置选中状态下的背景颜色为红色 */
}

/deep/ .el-radio__input:focus .el-radio__inner {
  border-color: var(--theme_bg_color) !important; /* 设置获取焦点状态下的边框颜色为红色 */
  box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.2); /* 设置获取焦点状态下的阴影效果 */
}

/deep/ .el-radio__input:hover:not(.is-disabled) .el-radio__inner {
  border-color: var(--theme_bg_color)  !important; /* 设置鼠标悬停状态下的边框颜色为红色 */
}

/* el-input 组件获得焦点后边框样式修改 */
/deep/ .form_content .el-input__inner:focus{ border-color:var(--theme_bg_color)}

/* el-select 选中颜色 */
.el-select-dropdown__item.selected{
  color:var(--theme_bg_color) ;
}
/* 取消按钮样式 */
  .el-button:focus, .el-button:hover{
    color:#fff;
    background:var(--theme_bg_color); 
    border-color:var(--theme_bg_color)
  }


</style>