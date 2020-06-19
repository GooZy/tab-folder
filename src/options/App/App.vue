<template>
  <div class="main_app" style="margin: auto; width: 50%">
    <h1>{{localeMessage.extName}}</h1>
    <el-row :gutter="20">
      <el-col :span="7"><div class="grid-content"></div></el-col>
      <el-col :span="5"><div class="grid-content bg-purple">{{localeMessage.textFolderCapacity}}</div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
        <el-select v-model="capacity" size="small" @change="changeCapacity">
          <el-option
                  v-for="item in capacityOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </div></el-col>
    </el-row>
  </div>
</template>

<script>
  const BACK_PAGE = chrome.extension.getBackgroundPage();
  export default {
  name: 'app',
  data() {
    return {
      capacityOptions: [],
      capacity: BACK_PAGE.getDefaultCapacity(),
      localeMessage: {
        "textFolderCapacity": "",
        "extName": "",
      },
    }
  },
  created() {
    for (let i = 1; i <= 5; i++) {
      this.capacityOptions.push({
        value: i * 10,
        label: i * 10
      });
    }
    // get data from storage
    let _this = this;
    chrome.storage.sync.get(['capacity'], function (result) {
      if (result.capacity != null) {
        _this.capacity = result.capacity;
      }
    });

    // init locale messages
    for (let key in this.localeMessage) {
      this.localeMessage[key] = chrome.i18n.getMessage(key);
    }
  },
  methods: {
    changeCapacity() {
      let _this = this;
      chrome.storage.sync.set({
        'capacity': _this.capacity
      });
      this.$message({
        message: "配置已保存",
        type: 'success',
        duration: 1000,
      });
    }
  }
}
</script>

<style>
.main_app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  height: 30px;
  font-size: 20px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
