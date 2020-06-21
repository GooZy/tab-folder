<template>
  <el-card class="box-card">

    <div slot="header" class="clearfix">
      <span style="font-size: 120%; padding: 6px">
        <b>{{localeMessage.textFolderCapacity}}：</b>{{tabs.length}}/{{capacity}}
        <el-button class="btn" type="primary" icon="el-icon-setting" style="float: left" plain
                   @click="openOption"></el-button>
      </span>

      <el-tooltip effect="light" :content="localeMessage.popUpHint" placement="top">
        <el-button class="btn" type="primary" icon="el-icon-circle-plus" plain @click="saveTab"></el-button>
      </el-tooltip>

      <a href="https://github.com/GooZy/tab-folder" target="_blank">
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNiAwQzcuMTYgMCAwIDcuMTYgMCAxNkMwIDIzLjA4IDQuNTggMjkuMDYgMTAuOTQgMzEuMThDMTEuNzQgMzEuMzIgMTIuMDQgMzAuODQgMTIuMDQgMzAuNDJDMTIuMDQgMzAuMDQgMTIuMDIgMjguNzggMTIuMDIgMjcuNDRDOCAyOC4xOCA2Ljk2IDI2LjQ2IDYuNjQgMjUuNTZDNi40NiAyNS4xIDUuNjggMjMuNjggNSAyMy4zQzQuNDQgMjMgMy42NCAyMi4yNiA0Ljk4IDIyLjI0QzYuMjQgMjIuMjIgNy4xNCAyMy40IDcuNDQgMjMuODhDOC44OCAyNi4zIDExLjE4IDI1LjYyIDEyLjEgMjUuMkMxMi4yNCAyNC4xNiAxMi42NiAyMy40NiAxMy4xMiAyMy4wNkM5LjU2IDIyLjY2IDUuODQgMjEuMjggNS44NCAxNS4xNkM1Ljg0IDEzLjQyIDYuNDYgMTEuOTggNy40OCAxMC44NkM3LjMyIDEwLjQ2IDYuNzYgOC44MiA3LjY0IDYuNjJDNy42NCA2LjYyIDguOTggNi4yIDEyLjA0IDguMjZDMTMuMzIgNy45IDE0LjY4IDcuNzIgMTYuMDQgNy43MkMxNy40IDcuNzIgMTguNzYgNy45IDIwLjA0IDguMjZDMjMuMSA2LjE4IDI0LjQ0IDYuNjIgMjQuNDQgNi42MkMyNS4zMiA4LjgyIDI0Ljc2IDEwLjQ2IDI0LjYgMTAuODZDMjUuNjIgMTEuOTggMjYuMjQgMTMuNCAyNi4yNCAxNS4xNkMyNi4yNCAyMS4zIDIyLjUgMjIuNjYgMTguOTQgMjMuMDZDMTkuNTIgMjMuNTYgMjAuMDIgMjQuNTIgMjAuMDIgMjYuMDJDMjAuMDIgMjguMTYgMjAgMjkuODggMjAgMzAuNDJDMjAgMzAuODQgMjAuMyAzMS4zNCAyMS4xIDMxLjE4QzI3LjQyIDI5LjA2IDMyIDIzLjA2IDMyIDE2QzMyIDcuMTYgMjQuODQgMCAxNiAwVjBaIiBmaWxsPSIjMjQyOTJFIi8+Cjwvc3ZnPgo="
             alt="github" style="float: right; padding-right: 10px" width="20"/>
      </a>
    </div>

    <div v-if="tabs.length === 0">
      {{localeMessage.popUpTitle}}
    </div>

    <div v-for="(tab, index) in tabs" class="text item" :key="tab.createTimeUnix">
      <el-container style="height: 45px; border: 1px solid #eee">
        <el-aside width="35px">
          <img :src="tab.iconUrl" :alt="tab.title" height="35" width="35" style="padding: 10% 10% 10% 0">
        </el-aside>
        <el-container>
          <el-header height="50%" style="padding-top: 1%">
            <el-link class="cut-text" :href="tab.url" :title="tab.title" type="primary" icon="el-icon-top-right"
                     target="_blank" @click.native="deleteTab(index)">
              {{tab.title}}
            </el-link>
            <el-button class="btn" type="danger" icon="el-icon-remove" plain @click="deleteTab(index)"></el-button>
          </el-header>
          <el-footer height="20%" style="white-space: nowrap;">
            <b>{{localeMessage.textCreateTime}}：</b>{{utils.unixTime2String(tab.createTimeUnix)}}
          </el-footer>
        </el-container>
      </el-container>
      <br>
    </div>

  </el-card>
</template>

<script>
  const BACK_PAGE = chrome.extension.getBackgroundPage();
  export default {
    name: 'app',
    data() {
      return {
        tabs: [{
          'url': 'http://www.baidu.com',
          'title': '百度',
          'iconUrl': chrome.runtime.getURL("images/multiple.png"),
          'createTimeUnix': 1592318558000
        }, {
          'url': 'https://developer.chrome.com/extensions/background_pages',
          'title': 'Manage Events with Background Scripts - Google Chrome',
          'iconUrl': 'https://www.google.com/images/icons/product/chrome-32.png',
          'createTimeUnix': 1592469191150
        }],
        localeMessage: {
          "popUpTitle": "",
          "popUpHint": "",
          "textFolderCapacity": "",
          "textCreateTime": "",
        },
        capacity: BACK_PAGE.getDefaultCapacity(),
        utils: {
          'unixTime2String': BACK_PAGE.unixTime2String,
          'saveTabInfo': BACK_PAGE.saveTabInfo,
          'updateBadge': BACK_PAGE.updateBadge,
        }
      }
    },
    created() {
      // data init
      this.tabs = [];

      // get data from storage
      let _this = this;
      chrome.storage.sync.get(['tabs', 'capacity'], function (result) {
        if (result.tabs != null) {
          _this.tabs = result.tabs;
        }
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
      saveTab() {
        let _this = this;
        chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
          let tab = tabs[0];
          _this.utils.saveTabInfo(tab.url, tab.title, tab.favIconUrl, tab.id);

        });
      },
      deleteTab(index) {
        this.tabs.splice(index, 1);
        chrome.storage.sync.set({
          "tabs": this.tabs
        });
        this.utils.updateBadge(this.tabs.length);
      },
      openOption() {
        chrome.runtime.openOptionsPage();
      }
    }
  }
</script>

<style>
  .box-card {
    width: 350px;
  }
  .btn {
    float: right;
    padding: 0 0 0 0;
    width: 25px;
    height: 20px;
  }
  .cut-text {
    width: 180px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    float: left;
  }
</style>
