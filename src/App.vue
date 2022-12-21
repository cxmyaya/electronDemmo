<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <el-dialog
      title="正在更新新版本,请稍候..."
      :visible.sync="dialogVisible"
      width="50%"
      :close-on-click-modal="closeOnClickModal"
      :close-on-press-escape="closeOnPressEscape"
      :show-close="showClose"
      center
    >
      <div
        style="width: 100%; height: 50vh; line-height: 50vh; text-align: center"
      >
        <el-progress
          :stroke-width="26"
          :percentage="percentage"
          :width="strokeWidth"
          :show-text="true"
          type="circle"
        ></el-progress>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
let ipcRenderer = require("electron").ipcRenderer;
export default {
  name: "App",
  components: {
    HelloWorld,
  },
  data() {
    return {
      dialogVisible: false,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      showClose: false,
      percentage: 0,
      strokeWidth: 400,
    };
  },
  created() {},
  mounted() {
    let _this = this;
    //接收主进程版本更新消息
    ipcRenderer.on("message", (event, arg) => {
      //新增内容
      if ("confimUpdate" == arg.cmd) {
        _this.dialogVisible = true;
      } else if ("download-progress" == arg.cmd) {
        console.log(arg.message.percent);
        let percent = Math.round(parseFloat(arg.message.percent));
        _this.percentage = percent;
      } else if ("error" == arg.cmd) {
        _this.dialogVisible = false;
        _this.$message("更新失败"+arg.cmd);
      }

      //if ("update-available" == arg.cmd) {
      //_this.dialogVisible = true;
      //} else if ("download-progress" == arg.cmd) {
      //console.log(arg.message.percent);
      //let percent = Math.round(parseFloat(arg.message.percent));
      //_this.percentage = percent;
      //} else if ("error" == arg.cmd) {
      //_this.dialogVisible = false;
      //_this.$message("更新失败");
      //}
    });
    ipcRenderer.send("checkForUpdate");
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
