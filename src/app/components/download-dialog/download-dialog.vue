<template>
  <el-dialog :visible.sync="show" :title="$t('ytlPage.export')" :modal-append-to-body="false"
    :close-on-click-modal="false" :width="1000 / 192 + 'rem'" :before-close="handleClose" center>
    <div class="title_box" >
      <i class="ami-icon-gantanhao" ></i>
      <p >{{$t("ytlPage.exported7Days")}}</p>
    </div>
    <el-table class="download_table" :height="268 / 192 + 'rem'" :data="tableList">
      <el-table-column type="index" :label="$t('ytlPage.No')" align="center"></el-table-column>
      <el-table-column :label="$t('ytlPage.fileName')" prop="fileName" align="center"></el-table-column>
      <el-table-column :label="$t('ytlMeterReading.progress')" align="center">
        <template slot-scope="scope">
          <el-progress type="circle" :percentage="parseInt(scope.row.progressValue)" :width="parseInt('45')"
            :color="scope.row.progressColor" :text-color="scope.row.progressColor" :status="scope.row.progressStatus">
          </el-progress>
        </template>
      </el-table-column>

      <el-table-column :label="$t('ytlMeterReading.createTime')" prop="creatTime" align="center"></el-table-column>
      <el-table-column :label="$t('ytlPage.downloadFile')" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.timeOut == false">
            <el-button type="primary" :disabled="ifclick(scope.row)" class="btn_xls" round
              @click="downLoadXls(scope.row)">
              <p>XLS</p>
            </el-button>
          </div>
          <p  v-if="scope.row.timeOut == true">{{ $t("ytlMeterReading.timeOut") }} </p>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { post, get } from "../../../services/http";
import environment from "../../../environment";
import moment from 'moment';
import mixin from "@/app/common/tools/func_mixin.js";
export default {
  mixins: [mixin],
  data() {
    return {
      HOSTHOME: environment.HOSTHOME,
      HOSTHOME2: environment.HOSTHOME2,
      show: false,
      tableData: {
        url: "",
        fileName: '',
        creatTime: '',
      },
      tableList: [],
      progress: 0,
      intervalId:null,
      isProgressRunning:false,
      // timeOuttimes:0,
      multiData:false,
    };
  },
  components: {
  },
  computed: {
    ...mapGetters(["downloadDialogShow"]),
  },
  created() { },
  mounted() {
    let that = this;
    this.$bus.$on("downloadData", function (data) {
      if (data) {
        let newTableData = {
          creatTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          fileName: data.fileName,
          url: '',
          progressValue: 0,
          progressStatus: null,
          progressColor: "var(--theme_bg_color)",
          timeOut: false,
          timeOuttimes:0,
          id:null,
          intervalId:null
        };
        if (data.total >1000) {
          that.postData2(data.params,data.address)
          that.multiData=true
        }else{
          that.postData(data.params,data.address)
          that.multiData=false
        }
        that.tableList.unshift(newTableData)
      }
    })
  },
  watch: {
    downloadDialogShow(val) {
      //使导出的时候不触发导出面板
      this.show = val;
      if (val && this.multiData==false) {
        this.startProgress()
      }
    },
  },
  methods: {
    ...mapMutations(["showDownload"]),
    ...mapActions({}),
    handleClose() {
      sessionStorage.removeItem("downloadData");
      this.showDownload();
      // clearInterval(this.intervalId);
      //超时次数清零
      // this.timeOuttimes = 0
      // clearInterval(this.intervalIncrease)
    },
    postData(params, address) {
      post(this.HOSTHOME + address, params).then((res) => {
        if (res.success == 1) {
          const exportId = res.data
          this.tableList[0].id=res.data
          this.tableList[0].intervalId = setInterval(() => {
            get(this.HOSTHOME + "/downLoad/getRecord", { exportId: exportId }).then((item) => {
              const index = this.tableList.findIndex(obj => obj.id === exportId);
              if (item.data[0].downloadUrl) {
                // 进度条=100
                this.tableList[index].progressValue = 100
                this.tableList[index].progressStatus = "success"
                this.tableList[index].progressColor = "#3fa16b"
                //清除定时器
                clearInterval(this.tableList[index].intervalId);
                //拼接下载地址 页面访问地址(优化)+接口返回地址
                const pageUrl = window.location.origin
                // 开发测试地址
                const url = this.HOSTHOME2 + item.data[0].downloadUrl;
                //生产地址
                // const url=pageUrl+item.data[0].downloadUrl;
                //添加url
                this.tableList[index].url = url;
                //超时次数清零
                this.tableList[index].timeOuttimes = 0
              } else {
                this.tableList[index].timeOuttimes++;
                if (this.tableList[index].timeOuttimes >= 10) {
                  clearInterval(this.tableList[index].intervalId);
                  this.$message.error(this.$t("ytlMeterReading.timeOut"))
                  //超时次数清零
                  this.tableList[index].timeOuttimes = 0
                  this.tableList[index].timeOut = true
                  this.tableList[index].progressStatus = "exception"
                  this.tableList[index].progressColor = "#f56c6c"
                }
              }
            });

          }, 3000);
        } else {
          this.getSuccessMessage(res)
          this.tableList[index].progressStatus = "exception"
          this.tableList[index].progressColor = "#f56c6c"
          this.tableList[index].progressValue = 100
        }
      });
    },

    postData2(params, address) {
      post(this.HOSTHOME + address, params).then((res) => {
        if (res.success == 1) {
          const exportId = res.data 
          this.tableList[0].id=res.data
          this.tableList[0].intervalId = setInterval(() => {
            get(this.HOSTHOME + "/downLoad/getRecord", { exportId: exportId }).then((item) => {
              //获取索引
              const index = this.tableList.findIndex(obj => obj.id === exportId);
              if (item.data[0].downloadUrl) {
                // 进度条=100
                this.tableList[index].progressValue =100
                this.tableList[index].progressStatus ="success"
                this.tableList[index].progressColor ="#3fa16b"
                //清除定时器
                clearInterval(this.tableList[index].intervalId);
                //拼接下载地址 页面访问地址(优化)+接口返回地址
                const pageUrl = window.location.origin
                // 开发测试地址
                const url=this.HOSTHOME2+item.data[0].downloadUrl;
                //生产地址
                // const url=pageUrl+item.data[0].downloadUrl;
                //添加url
                this.tableList[index].url = url;
                //超时次数清零
                this.tableList[index].timeOuttimes=0
              }else{
                this.tableList[index].progressValue=parseFloat(item.data[0].rate)
                this.tableList[index].timeOuttimes ++;
              if (this.tableList[index].timeOuttimes == 600) {
                clearInterval(this.tableList[index].intervalId);
                this.$message.error(this.$t("ytlMeterReading.timeOut"))
                //超时次数清零
                this.tableList[index].timeOuttimes=0
                this.tableList[index].timeOut =true
                this.tableList[index].progressStatus ="exception"
                this.tableList[index].progressColor ="#f56c6c"
              }
              }
            });
          }, 1000);
        }else{
          this.getSuccessMessage(res)
          this.tableList[index].progressStatus ="exception"
          this.tableList[index].progressColor ="#f56c6c"
          this.tableList[index].progressValue =100
        }
      });
    },
    downLoadXls(row){
      // 构建文件下载的URL地址
      const fileUrl = row.url;
      // 创建一个a标签
      const link = document.createElement("a");
      link.href = fileUrl;
      // 设置下载的文件名(在服务器上是有效果/生产测试的环境下是没效果的)
      link.download = row.fileName + ".xls";
      console.log("下载地址",link.download);
      // 模拟点击下载链接
      link.click();
    },
    ifclick(row) {
      if (row.url) {
        return false
      } else {
        return true
      }
    },
    startProgress() {
      const updateProgress = () => {
        if (this.tableList[0].progressValue < 99 && this.tableList[0].progressValue > -1) {
          this.tableList[0].progressValue += 0.1; // 每次增加1%
        }
        if (this.tableList[0].progressValue < 100) {
          requestAnimationFrame(updateProgress);
        }
      };
      requestAnimationFrame(updateProgress);
    }
  },
  beforeDestroy() {
    // clearInterval(this.intervalId);
    //超时次数清零
    // this.timeOuttimes = 0
  },

};
</script>

<style lang="less" scoped>
/deep/ .el-dialog__header {
  background: var(--theme_bg_color);
  height: 25px;
  border-radius: 4px 4px 0 0;
  padding-top: 15px;
  padding-bottom: 15px;

  .el-dialog__title {
    font-size: 18px;
    color: #ffffff;
    letter-spacing: 0.36px;
  }
}

/deep/ .el-dialog__headerbtn .el-dialog__close:hover {
  color: #ffffff;
}

/deep/ .el-dialog__headerbtn .el-dialog__close {
  color: #ffffff;
}

/deep/ .el-dialog {
  border-radius: 4px 4px 5px 5px;
  z-index: 12;
}

/deep/.el-table th.el-table__cell.is-leaf {
  background: var(--theme_tabletop_color);
}

.btn_xls {
  color: #ffffff;
  background: #3fa16b;
  border: 1px solid #3fa16b;
  border-radius: 15px;
  width: 60px;
  height: 25px;
  margin: 10px auto;
  cursor: pointer;
  P {
    color: #FFF;
    margin-left: -5px;
    margin-top: -5px;
  }
}

.btn_csv {
  color: #ffffff;
  background: #f1532d;
  border: 1px solid #f1532d;
  border-radius: 15px;
  width: 60px;
  height: 25px;
  margin: 10px auto;
  margin-left: 15px;

  P {
    color: #FFF;
    margin-left: -5px;
    margin-top: -5px;
  }
}

.el-button--primary.is-disabled {
  background: #ccc;
  border: #ccc;
}

/deep/.el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell {
  background-color: #fff;
  /* 设置悬浮颜色不变 */
}
.title_box{
  width: 325px; 
  height: 30px;
  border: 1px solid var(--theme_progress_color); 
  background-color: var(--theme_treebackground_color);
  display: flex ;
  align-items: center;
  margin-bottom: 25px;
  p{
    font-size: 12px; 
    color: var(--theme_bg_color);
  }
  i{
    font-size: 12px;
    color: var(--theme_bg_color);
    margin-right: 8px;
    margin-left: 15px;
  }
}
</style>