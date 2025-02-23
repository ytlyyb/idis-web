<template>
  <div>
    <div class="dialogsign1">
      <el-dialog
        :title="$t('ytlPowerUsed.selectMeter')"
        :modal-append-to-body="false"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        :width="500 / 192 + 'rem'"
      >
        <div class="search_btn_box">
          <el-input
            :placeholder="$t('ytlPowerUsed.keywordsFilter')"
            v-model="filterText"
          >
          </el-input>
        </div>
        <div class="tree_bg">
          <el-tree
            v-loading="loadingTree"
            :data="treeData"
            default-expand-all
            node-key="id"
            ref="tree"
            highlight-current
            :props="defaultProps"
            @node-click="nodeClick"
            :expand-on-click-node="false"
            icon-class="ami-icon-shouqi1"
            :current-node-key="currentId"
            :indent="15"
            :filter-node-method="filterNode"
          >
            <span
              class="custom-tree-node"
              slot-scope="{ node, data }"
              :class="{
                underline: data.id == currentId && isEmpty(data.onBind),
              }"
            >
              <span :title="node.label">
                <i
                  :class="[
                    data.layer == 1 ? 'first_floor_icon' : '',
                    !isEmpty(data.meterNo) && !isEmpty(data.onBind)
                      ? 'color_grey'
                      : '',
                    data.icon,
                  ]"
                  >{{ data.iconClass }}</i
                >
                <span
                  :class="[
                    data.layer == 1 ? 'first_floor_text' : '',
                    !isEmpty(data.meterNo) && !isEmpty(data.onBind)
                      ? 'color_grey'
                      : '',
                    'node_style',
                  ]"
                  >{{ node.label }}</span
                >
              </span>
            </span>
          </el-tree>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="close">{{ $t("ytlPowerUsed.cancel") }}</el-button>
          <el-button
            :disabled="btnTrueState"
            type="primary"
            @click="onClickTrue"
            >{{ $t("ytlPowerUsed.determine") }}</el-button
          >
        </span>
        <div class="bottom_border"></div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import mixinF from "../../common/tools/func_mixin";
export default {
  mixins: [mixinF],
  name: 'DeviceDialog',
  data() {
    return {
      dialogVisible: false,
      /**确定按钮是否不可以点击 */
      btnTrueState: true,
      //
      treeData: [],
      defaultProps: {
        label: "name",
        children: "list",
      },
      currentId: "",
      loadingTree: false,
      localCheckedItem: {},
      /**所有表计列表 */
      meterList: [],
      /**标记 两个接口都完成后调用 */
      onceSign: 0,
      /**选中的表计数据 */
      meterItem: {},
      /**筛选数据 */
      filterText: "",
      /**回调方法 */
      setCurrentId: null,
      /**已经绑定的表列表 */
      onBindList: [],
    };
  },
  computed: {
    ...mapGetters(["deviceSelectDialogShow"]),
  },
  filters: {
    isNull(val) {
      if (val === undefined || val === null || val === "") return "--";
      return val;
    },
  },
  watch: {
    deviceSelectDialogShow(val) {
      if (val) {
        this.dialogVisible = val;
        this.show();
      } else {
        this.dialogVisible = val;
        setTimeout(() => {
          this.clear();
        }, 300);
      }
    },
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    currentId(val) {
      this.$nextTick(() => {
        if (this.isEmpty(val)) this.$refs.tree.setCurrentKey(-1);
        else this.$refs.tree.setCurrentKey(this.currentId);
      });
    },
  },
  methods: {
    ...mapMutations(["showDeviceSelect"]),
    /**筛选时需要此方法 */
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    clear() {
      this.treeData = [];
      this.currentId = "";
      this.loadingTree = false;
      this.localCheckedItem = {};
      this.meterList = [];
      this.onceSign = 0;
      this.btnTrueState = true;
      this.meterItem = {};
      this.filterText = "";
      this.onBindList = [];
      this.$refs.tree.setCurrentKey(-1);
    },
    // 关闭
    close() {
      this.showDeviceSelect();
    },
    //#region 接口数据
    ...mapActions({
      getTree: "AnalysisObjectGetTree",
      getPowMeterList: "ArchivesGetPowMeterList",
      queryNoAvailableMeter: "UserMeter_QueryNoAvailableMeter",
    }),
    /**获得已添加表列表 */
    iQueryNoAvailableMeter() {
      this.queryNoAvailableMeter({}).then((res) => {
        if (res.success === 1) {
          //将要筛选的表加入 待筛选表
          res.data.forEach((elem) => {
            this.onBindList.push({
              meterNo: elem,
            });
          });
          this.insertMeter();
        }
      });
    },
    iGetTree() {
      this.getTree({}).then((res) => {
        if (res.success === 1) {
          this.treeData = this.pointAddList(res.data);
          this.insertMeter();
        }
      });
    },
    pointAddList(list) {
      list.forEach((elem) => {
        if (this.isEmpty(elem.list)) elem.list = [];
        else this.pointAddList(elem.list);
      });
      return list;
    },
    /**表计加入树节点 */
    iGetPowMeterList() {
      this.getPowMeterList({}).then((res) => {
        if (res.success === 1) {
          this.meterList = res.data;
          this.insertMeter();
        }
      });
    },
    /**将电表插入树节点 */
    insertMeter() {
      if (this.onceSign++ < 1) return;
      //给已经绑定的电表添加标记（不可选择）
      this.onBindList.forEach((elem) => {
        for (const key in this.meterList) {
          if (elem.meterNo === this.meterList[key].meterNo) {
            this.meterList[key].onBind = true;
            break;
          }
        }
      });
      //电表插入到树节点中
      this.meterList.forEach((elem) => {
        elem.iconClass = "ami-icon-electric";
        elem.name = elem.disc;
        elem.id = parseInt(elem.meterNo);
        this.recursionTree(elem, this.treeData);
      });
      //树节点处理
      this.iGetTreeHandle(this.treeData);
      setTimeout(() => {
        this.setCurrentId();
        this.loadingTree = false;
      }, 100);
    },
    recursionTree(meter, treelist) {
      for (const key in treelist) {
        if (meter.ownerId == treelist[key].id) {
          //加表计
          if (this.isEmpty(treelist[key].list)) treelist[key].list = [];
          treelist[key].list.push(meter);
          return true;
        } else if (!this.isEmpty(treelist[key].list)) {
          if (this.recursionTree(meter, treelist[key].list)) return true;
        }
      }
    },
    /**树节点节点处理 */
    iGetTreeHandle(data, layer = 1) {
      data.forEach((elem) => {
        elem.layer = layer;
        elem.icon = this.deepCopy(elem.iconClass);
        elem.iconClass = "";
        if (elem.list && elem.list.length > 0)
          elem.list = this.iGetTreeHandle(elem.list, layer + 1);
      });
      return data;
    },
    //#endregion

    show(posId = null) {
      this.loadingTree = true;
      this.setCurrentId = () => {
        this.currentId = posId;
      };
      this.iGetTree();
      this.iGetPowMeterList();
      // this.iQueryNoAvailableMeter();
      // this.dialogVisible = true;
    },
    nodeClick(data, node, ref) {
      if (this.isEmpty(data.meterNo) || !this.isEmpty(data.onBind))
        this.btnTrueState = true;
      else this.btnTrueState = false;
      this.currentId = data.id;
      this.meterItem = data;
    },
    //#region 按钮点击事件
    onClickTrue() {
      //父节点需要固定一个方法来接收选中表计
      this.$bus.$emit('deviceSelect',this.meterItem);
      this.close();
      this.dialogVisible = false;
    },

    //#endregion
  },
  destroyed(){
    this.$bus.$off('deviceSelect');
  }
};
</script>

<style lang="less" scoped>
.underline {
  border-bottom: 1px solid #57b8ff;
}
.custom-tree-node {
  margin-bottom: 4px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  .first_floor_text {
    font-size: 16px !important;
    font-weight: 700;
  }
  .first_floor_icon {
    font-size: 18px !important;
  }
  i {
    font-size: 16px;
  }
  .node_style {
    font-size: 14px;
    margin-left: 4px;
  }
}
.search_btn_box {
  display: flex;
  justify-content: center;
  padding: 40px 0 15px;
}
.tree_bg {
  padding: 0px 10px;
  //
  height: calc(100vh - 650px);
  max-height: 450px;
  min-height: 200px;
  //
  border-radius: 18px;
  overflow: auto;
  /deep/.el-tree {
    background-color: transparent;
  }
  /deep/.el-tree-node {
    margin: 4px 0;
  }
}
.color_grey {
  color: #999;
}

.dialog-footer /deep/ .el-button--medium {
  padding: 12px 20px;
}
.bottom_border{
  width: 100%;
  height: 19px;
  background: #F6FBFF;
  margin-top: 20px;
}
/deep/ .el-dialog__footer {
  padding: 40px 0 0 !important;
  border-top: 1px solid #e5e7ee;
}
/deep/ .el-dialog__title {
  display: inline-block;
  width: 100%;
  text-align: center;
  font-size: 18px;
}
/deep/ .el-dialog__header {
  border-bottom: 1px solid #e5e7ee;
  padding: 15px 10px;
}
/deep/ .el-dialog__body {
  padding: 0;
}
</style>
