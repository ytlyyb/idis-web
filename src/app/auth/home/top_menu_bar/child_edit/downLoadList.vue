<template>
  <div>
     <!-- 导出消息弹窗 -->
     <div class="popup" v-if="downLoadShow" id="popup">
        <!-- 箭头/阴影 -->
        <div class="arrow"></div><div class="arrow2"></div>
        <div class="head_text">
          <i class="ami-icon-gantanhao" style="font-size: 12px;color: var(--theme_bg_color); margin-right: 5px;margin-left: 15px;"></i>
          <p >{{$t("ytlPage.exported7Days")}}</p>
        </div>
        <ul  class="list_ul">
          <li class="download_li" v-for="item in tableData" :key="item.creatTime"> 
              <svg class="icon" aria-hidden="true" style="font-size: 18px; flex-grow: 1;flex-basis: calc(10%); ">
                <use xlink:href="#ami-icon-xlsx" ></use>
             </svg>
             <p v-if="item.fileName">{{item.fileName}}</p>
             <p v-if="!item.fileName">{{"未知"}}</p>
            <div>
              <el-button type="text" class="btn_export" @click="downloadList(item)" > {{ $t("ytlPage.downLoad") }}</el-button>
            </div>
              <p class="time_text">{{item.exportTime}}</p>
          </li>  
        </ul>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { post, get } from "../../../../../services/http";
import environment from "../../../../../environment";
import moment from 'moment';
export default {
  name: '',
  mixins: [],
  components: {},
  props: {},
  data () {
    return {
        HOSTHOME: environment.HOSTHOME,
        HOSTHOME2: environment.HOSTHOME2, 
        tableData: [],
        downLoadShow:false
    }
  },
  computed: {},
  watch: {
    downLoadShow(val) {
      if (val == true) {
        this.getTableData()
        setTimeout(() => {
          document.addEventListener('click', this.handleOutsideClick);
        }, 500); 
      } else {
        document.removeEventListener('click', this.handleOutsideClick);
      }
    }
  },
  mounted() {},
  beforeDestroy() {
  },
  created () {},
  methods: {
    ...mapActions({
        getHistoryList:'getHistory_Record' //导出历史记录
    }),
    handleClose() {
    },
    getTableData(){
      this.getHistoryList({
        pageNumber:1,
        pageSize:100
      }).then(res=>{
        if (res.success ==1) {
          this.tableData=res.data       
        }
      })
    },
    downloadList(row){
      // 构建文件下载的URL地址
      const fileUrl = this.HOSTHOME2 + row.downLoadUrl;
      // 创建一个a标签
      const link = document.createElement("a");
      link.href = fileUrl;
      // 设置下载的文件名(在服务器上是有效果/生产测试的环境下是没效果的)
      link.download =  row.fileName+".xls"; 
      // 模拟点击下载链接
      link.click();
    },
    handleOutsideClick(event) {
      const popupElement = document.getElementById('popup');
      if (!popupElement.contains(event.target)) {
        // 点击的元素不在弹窗内部，隐藏弹窗
        this.downLoadShow = false;
      }
    }
  },
  
}
</script>

<style scoped lang="less">

  .arrow {
  position: absolute; 
  width: 0;
  height: 0; 
  border-left: 25px solid transparent; 
  border-right: 25px solid transparent; 
  border-bottom: 25px solid  var(--theme_tabletop_color); 
  top: -23px; 
  right: 60px; 
  z-index: 11 ; 
  /* border-top: 20px solid transparent;
 border-bottom:20px solid #ffffff;
 border-left:  20px solid transparent;
 border-right: 20px solid #ffffff; */
 /* transform: rotate(-135deg); */
 /* box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.25); */
 }
 .arrow2{
  position: absolute; 
  width: 0;
  height: 0; 
  border-left: 25px solid transparent; 
  border-right: 25px solid transparent; 
  border-bottom: 25px solid #5e5d5d3c; 
  top: -24px; 
  right: 60px;
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
    font-size:12px;
    color: var(--theme_bg_color); 
    line-height: 12px; 
    text-align: LEFT;
    
  }
 }

 .list_ul{
    list-style: none; 
    padding: 0%; 
    margin-top: 10px; 
    height:75%; 
    overflow-y: auto;
  }

  /* 导出弹窗样式 */
  .download_li{
  height: 30px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  line-height: 20px; 
  margin-left: 10px;
  margin-bottom: 20px;
  margin-top: 5px;
  p{
    font-size:14px;
    color: #000;
    margin-top: -14px;
    flex-grow: 1;
    flex-basis: calc(70%);
    margin-left:5px;
    letter-spacing: 0.1em;
   } 
  .btn_export{
    margin-top:-14px;  
    flex-grow: 1;
    flex-basis: calc(15%);
    color:var(--theme_bg_color);
    margin-right: 20px;
   }
   .time_text{
    font-size: 12px;
     text-align: right; 
     margin-right: 15px;
     color: #999999;
     letter-spacing:0;
   }
}
//滚动条设置
// ::-webkit-scrollbar {
//     width: 6px;
//     height: 0px;
// }
 

@media (min-width: 1366px) and (max-width: 1920px) {
  .popup{
    width: 410px;
    height: 200px;
    background-color: #ffffff;
    position: absolute;
    right: 1.67rem; 
    top: 0.4rem;
    z-index: 10;
    border: 1px solid #e2e2e2;
    box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.25);
  }
} 
@media (max-width: 1366px) {
  .popup{
    width: 410px;
    height: 212px;
    background-color: #ffffff;
    position: absolute;
    right: 1.70rem; 
    top: 0.4rem;
    z-index: 10;
    border: 1px solid #e2e2e2;
    box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.25);
  }
}
</style>
