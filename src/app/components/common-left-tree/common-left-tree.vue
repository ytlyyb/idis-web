<template>
  <div>
    <div class="tree_bg">
      <el-tree
        style="height: 100%; overflow: auto"
        :data="data"
        node-key="id"
        default-expand-all
        ref="tree"
        highlight-current
        :current-node-key="currentNodeKey"
        :props="defaultProps"
        @node-click="nodeClick"
        :expand-on-click-node="false"
        icon-class="ami-icon-shouqi1"
      >
        <template slot-scope="{ node, data }">
          <!-- <el-tooltip
            :disabled="false"
            :content="data.name"
            placement="top"
            effect="dark"
            :open-delay="1000"
          > -->
          <tree-content
            :node="node"
            :data="data"
            :title="data.name"
            ref="nodeInput"
            @change="inputChange"
            @rootDel="delAddRoot"
          ></tree-content>
          <!-- </el-tooltip> -->
        </template>
        <!-- <span
          class="custom-tree-node"
          slot-scope="{ node, data }"
          :class="{ underline: data.id == currentNodeKey }"
        >
          <span :title="node.label">
            <i
              :class="[data.layer == 1 ? 'first_floor_icon' : '', data.icon]"
            ></i>
            <span
              :class="[data.layer == 1 ? 'first_floor_text' : '', 'node_style']"
              >{{ node.label }}</span
            >
          </span>
        </span> -->
      </el-tree>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "example1",
  props: {
    msg: String,
  },
  data() {
    return {
      data: [],
      defaultProps: {
        label: "name",
        children: "list",
      },
      currentNodeKey: null,
      isInEdit: false,
      nodeShow: {
        name: null,
        id: null,
        type: null,
        rootId: null,
      },
      readonly: true,
      nodeShowName: null,
    };
  },
  created() {
    this.getTreeList();
    this.currentNodeKey = 6;
  },
  mounted() {
    // document.getElementById("goBack").addEventListener("click", function() {
    //   history.back();
    // });
  },
  methods: {
    ...mapActions({
      treeList: "AnalysisObjectGetTree",
      addRoot: "AnalysisObjectAddRoot",
      editName: "AnalysisObjectEditObjectName",
      delObj: "AnalysisObjectDelete",
      delRootObj: "AnalysisObjectDeleteRoot",
    }),
    init() {
        this.getTreeList();
    },
    refresh(){
    //控制节点
    this.currentNodeKey = 6;
    this.$nextTick(() => {
    this.$refs.tree.setCurrentKey(this.currentNodeKey);
    });
    //控制节点数据，可能有点问题，对这个组件不太了解
    this.nodeShow = {
            name:this.data[0].name,
            id: this.data[0].id,
            type: this.data[0].type,
            rootId: this.data[0].rootId,
          };
    this.$bus.$emit("groupInfo", this.nodeShow);
    sessionStorage.setItem("groupInfo", JSON.stringify(this.nodeShow));
    },
    getTreeList() {
      this.treeList().then((res) => {
        if (res.success == 1) {
          this.data = res.data;
          this.setCurrentNodeKey(res.data);
        }
      });
    },
    setCurrentNodeKey(data) {
      const info = sessionStorage.getItem("groupInfo");
      let that = this;
      if (info) {
        const group = JSON.parse(info);
        this.$nextTick(() => {
          that.$refs.tree.setCurrentKey(group.id);
        });
        this.nodeShowName = group.name;
        return;
      }
      if (this.nodeShow.id) {
        this.$nextTick(() => {
          that.$refs.tree.setCurrentKey(this.nodeShow.id);
        });
        this.nodeShowName = this.nodeShow.name;
      } else {
        if (data.length > 0) {
          this.$nextTick(() => {
            that.$refs.tree.setCurrentKey(data.length > 0 ? data[0].id : null);
          });
          this.nodeShowName = data.length > 0 ? data[0].name : null;
          this.nodeShow = {
            name: data[0].name,
            id: data[0].id,
            type: data[0].type,
            rootId: data[0].rootId,
          };
          this.$bus.$emit("groupInfo", this.nodeShow);
          sessionStorage.setItem("groupInfo", JSON.stringify(this.nodeShow));
        }
      }
    },
    treeRefrash(e = 0) {
      if (e == 1) {
        this.nodeShow = {
          name: null,
          id: null,
          type: null,
          rootId: null,
        };
      }
      this.getTreeList();
    },
    nodeClick(data, node, ref) {
      if (!data.id) {
        return;
      }
      if (data.id == "addRoot") {
        if (this.isInEdit) {
          this.$message.warning(this.$t("ytlMeterReading.addTip"));
          this.$refs.nodeInput &&
            this.$refs.nodeInput.$refs.inputTreeRef.focus();
          return;
        }
        this.$refs.tree.insertBefore(
          {
            id: "roodid",
            name: "",
            add: true,
            iconClass: "ami-icon-group-root",
          },
          data.id
        );
        this.$nextTick(() => {
          //  console.log('nodeInput》》',this.$refs.nodeInput);
          this.$refs.nodeInput &&
            this.$refs.nodeInput.$refs.inputTreeRef.focus();
          this.isInEdit = true;
        });
      } else {
        this.nodeShow = {
          id: data.id,
          rootId: data.rootId,
          type: data.type,
          name: data.name,
        };
        this.nodeShowName = data.name;
        this.$bus.$emit("groupInfo", this.nodeShow);
        sessionStorage.setItem("groupInfo", JSON.stringify(this.nodeShow));
      }
      this.readonly = true;
    },
    inputChange(e, data) {
      data.iconClass = "el-icon-loading";
      this.addRoot({ name: e }).then((res) => {
        if (res.success == 1) {
          this.$message.success(
            this.$t("ytlPage.add") + this.$t("ytlPage.success")
          );
          data.name = e;
          data.add = false;
          this.isInEdit = false;
          this.treeRefrash();
        } else {
          data.iconClass = "ami-icon-group-root";
          this.$refs.nodeInput &&
            this.$refs.nodeInput.$refs.inputTreeRef.focus();
        }
      });
    },
    editNodeName() {
      let params = {
        name: this.nodeShowName,
        objectId: this.nodeShow.id,
        objectType: this.nodeShow.type,
      };
      this.editName(params).then((res) => {
        if (res.success == 1) {
          this.$message.success(
            this.$t("ytlPage.edit") + this.$t("ytlPage.success")
          );
          this.readonly = true;
          this.nodeShow.name = this.nodeShowName;
          this.treeRefrash();
        }
      });
    },
    nodeDel() {
      if (this.nodeShow.type == 99) {
        this.delRootObj({ id: this.nodeShow.id }).then((res) => {
          if (res.success == 1) {
            this.$message.success(
              this.$t("ytlPage.delete") + this.$t("ytlPage.success")
            );
            this.treeRefrash(1);
          }
        });
      } else {
        this.delObj({
          id: this.nodeShow.id,
          rootId: this.nodeShow.rootId,
          type: this.nodeShow.type,
        }).then((res) => {
          if (res.success == 1) {
            this.$message.success(
              this.$t("ytlPage.delete") + this.$t("ytlPage.success")
            );
            this.treeRefrash(1);
          }
        });
      }
    },
    delAddRoot(node) {
      // console.log("close");
      this.$refs.tree.remove(node);
      this.isInEdit = false;
    },
  },
  destroyed() {
    // this.$bus.$off("groupInfo");
  },
  components: {
    TreeContent: {
      props: {
        node: {
          required: true,
        },
        data: {
          required: true,
        },
      },
      render(h) {
        const node = this.node;
        const data = this.data;
        // console.log(node, data);
        return data.add
          ? h(
              "div",
              {
                class: "_row_between _add_root",
              },
              [
                h("input", {
                  class: "add_input",
                  attrs: {
                    maxLength: 20,
                  },
                  ref: "inputTreeRef",
                  on: {
                    change: (event) => {
                      this.$emit("change", event.target.value, data);
                    },
                  },
                }),
                h("i", {
                  class: "el-icon-circle-close _icon_close",
                  on: {
                    click: () => {
                      this.$emit("rootDel", node);
                    },
                  },
                }),
              ]
            )
          : h(
              "span",
              {
                class: { "el-tree-node__label": true, _bold:data.type == 99 },
              },
              node.label
            );
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.icon_color {
  color: #e6a23c;
}
._add_root {
  /deep/.add_input {
    border: 1px solid #666;
    width: 80%;
  }
  /deep/.add_input:focus-visible {
    border-color: #57b8ff;
    outline: #57b8ff auto 1px;
  }
  /deep/._icon_close {
    padding: 5px 10px;
  }
}
/deep/.el-tree-node__content > .el-tree-node__expand-icon {
  font-size: 12px;
}
.tree_bg {
  width: 255px;
  padding-left: 5px;
  padding-top: 20px;
  padding-bottom: 10px;
  height: 650px;
  /* background-color: rgba(255, 255, 255, 0.05); */
  background-color: var(--theme_treebackground_color); 
  border: 1px solid var(--theme_bg_color);
  border-radius: 16px;
  overflow: auto;
  /deep/.el-tree {
    background-color: transparent;
  }
  /deep/ .el-tree-node__label {
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
.treeInput {
  margin: 13px 0;
  /deep/.el-input__inner {
    background: #ffffff;
    border: 1px solid var(--theme_bg_color);
    border-radius: 12px;
    color: var(--theme_bg_color);
  }
}
.treeBtn {
  /deep/.el-button--medium {
    padding: 9px 22.5px;
  }
}
._bold {
  font-weight: bold;
}
.el-tree-node__label._bold {
  font-weight: bold;
}


.first_floor_text {
  font-weight: 700;
  font-size: 16px;
}
/deep/.el-tree-node__content:hover {
    background-color: var(--theme_treehover_color);
}
/deep/ .el-tree-node.is-current > .el-tree-node__content {
  color: var(--theme_bg_color);
}
.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content>.el-tree-node__label{
  border-bottom: 0.005208rem solid var(--theme_bg_color);
}
/deep/.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
  background-color: var(--theme_treebackground_color)!important;
}




</style>
