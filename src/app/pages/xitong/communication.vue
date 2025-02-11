<template>
  <div style="background-color: #fff; width: 98.5%; height: 73%; border-radius: 20px">
    <!-- 使用 Flexbox 布局的容器 -->
    <div class="form-container">
      <div class="form-row">
        <div class="select-left">
          <label>通讯方式</label>
          <el-select v-model="value2" placeholder="请选择通讯方式">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="select-right">
          <label>接口类型</label>
          <el-select v-model="value1" placeholder="请选择接口类型">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="form-row">
        <div class="select-left">
          <label>波特率</label>
          <el-select v-model="value4" placeholder="请选择波特率">
            <el-option
              v-for="item in options4"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="select-right">
          <label>串口</label>
          <div class="select-and-refresh">
          <el-select v-model="value3" placeholder="请选择串口">
            <el-option
              v-for="item in options3"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <span style="margin-left:10px; white-space:nowrap" @click="handleRefresh">刷新</span>
        </div>
        </div>
      </div>
      <div class="form-row">
        <div class="select-left">
          <label>数据位</label>
          <el-select v-model="value6" placeholder="请选择数据位"> 
            <el-option
              v-for="item in options6"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="select-right">
          <label>校验</label>
          <el-select v-model="value5" placeholder="请选择校验">
            <el-option
              v-for="item in options5"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="form-row">
        <div class="select-left">
          <label>超时时间</label>
          <el-input v-model="timeout" placeholder="请输入超时时间"></el-input>
        </div>
        <div class="select-right">
          <label>停止位</label>
          <el-select v-model="value7" placeholder="请选择停止位">
            <el-option
              v-for="item in options7"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="form-row">
        <div class="select-left">
          <label>密码</label>
          <div class="select-and-refresh">
          <el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
          <el-checkbox style="margin-left:10px;" label=""></el-checkbox>
          </div>
        </div>
        <div class="select-right" style="margin-left:-1.5%">
          <label>表号</label>
          <div class="select-and-refresh">
          <el-input v-model="meterNumber" placeholder="请输入表号"></el-input>
          <el-checkbox style="margin-left:10px;" label="广播"></el-checkbox>
          </div>
        </div>
      </div>
    </div>
    <el-button class="sure_button" @click="handleSubmit">确认</el-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {  
  data() {
    return {
      options1: [
        {
          value: '选项1-1',
          label: 'HDLC',
        },
        {
          value: '选项1-2',
          label: 'WRAPPER',
        },
      ],
      value1: '选项1-1',
      options2: [
        {
          value: '选项2-1',
          label: 'Serial',
        },
        {
          value: '选项2-2',
          label: 'NET',
        },
        {
          value: '选项2-3',
          label: 'Server',
        },
      ],
      value2: '选项2-1',
      options3: [
        {
          value: 'COM1',
          label: 'COM1',
        },
        {
          value: 'COM2',
          label: 'COM2',
        },
        {
          value: 'COM3',
          label: 'COM3',
        },
      ],
      value3: 'COM1',
      options4: [
        {
          value: '300',
          label: '300',
        },
        {
          value: '600',
          label: '600',
        },
        {
          value: '1200',
          label: '1200',
        },
        {
          value: '2400',
          label: '2400',
        },
        {
          value: '4800',
          label: '4800',
        },
        {
          value: '9600',
          label: '9600',
        },
        {
          value: '38400',
          label: '38400',
        },
        {
          value: '57600',
          label: '57600',
        },
        {
          value: '115200',
          label: '115200',
        },
      ],
      value4: '9600',
      options6: [
        {
          value: '5',
          label: '5',
        },
        {
          value: '6',
          label: '6',
        },
        {
          value: '7',
          label: '7',
        },
        {
          value: '8',
          label: '8',
        },
      ],
      value6: '8',
      options5: [
        {
          value: '0',
          label: 'No Parity',
        },
        {
          value: '1',
          label: 'Odd',
        },
        {
          value: '2',
          label: 'Even',
        }
      ],
      value5: '0',
      options7: [
        {
          value: '1',
          label: '1 stop bit',
        },
        {
          value: '2',
          label: '2 stop bit'
        }
      ],
      value7: '1',
      timeout: '',
      meterNumber: '',
      password: '',
      responseCode: null // 用于保存接口返回的responseCode
    };
  },
  methods: {
    ...mapActions({
      SET_Para: "SET_Para" // 映射Vuex中的SET_Para接口调用方法
    }),
    handleSubmit() {
      // 从localStorage中获取token
      // const token = localStorage.getItem('token');
      // if (!token) {
      //   console.error('未找到token，请先登录');
      //   return;
      // }
      // 准备要发送的数据，从选择框中获取数据
      const data = {
        portName: this.value3,
        baudRate: parseInt(this.value4),
        dataBits: parseInt(this.value6),
        stopBits: parseInt(this.value7),
        parity: parseInt(this.value5),
        // token: token // 添加token到数据中
      };
      // 调用SET_Para接口发送数据
      this.SET_Para(data).then((response) => {
        if (response && response.responseCode === 1) {
          // 保存responseCode
          this.responseCode = response.responseCode;
          console.log('接口调用成功，responseCode已保存');
        } else {
          console.error('接口调用失败');
        }
      }).catch((error) => {
        console.error('接口调用出错', error);
      });
    },
    handleRefresh() {
      // 刷新操作的逻辑
      console.log('刷新串口列表');
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .el-select {
  width: 200px;
  border-color: 1px solid red;
}
/deep/ .el-select .el-input__inner {
  // border: 1px solid red;
  height: 30px;
  width: 600px;
}
/deep/ .el-input__inner:hover, .el-select:hover{
border-color: #ff9b45;
}
/deep/ .el-input__inner:focus, .el-select:focus{
border-color: #ff9b45;
}
/deep/ .el-input__inner {
  // border: 1px solid red;
  height: 30px;
  width: 600px;
}

.form-container {
  display: flex;
  flex-direction: column;
  padding: 20px 36px;
}

.form-row {
  display: flex;
  // justify-content: space-between;
  margin-bottom: 10px;
  font-size: 16px;
}

.select-left,
.select-right {
  display: flex;
  flex-direction: column;
  // width: 48%;
}

.select-left {
  margin-right: 10%; /* 设置左右元素之间的间距，可根据实际情况调整 */
}

.select-left {
  margin-left: 3%; /* 设置左右元素之间的间距，可根据实际情况调整 */
}

.select-left label,
.select-right label {
  margin-bottom: 5px;
}
.select-and-refresh {
  display: flex;
  align-items: center;
  // text-align: center;
  width: 100%; 
}
/deep/ .el-select {
    width: auto;  // 覆盖之前设置的固定宽度
    // flex: 1;      // 让select占据剩余空间
  }
/deep/ .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
  background-color: #fff5ec ;
}
/deep/ .el-select-dropdown__item::before{
  display: none;
}
.sure_button{
  background-color: #ff9b45;
  width: 200px;
  height: 40px;
  color: #fff;
  border: none;
  margin-left: 5%;
}
</style>