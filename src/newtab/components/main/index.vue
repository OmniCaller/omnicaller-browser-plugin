<template>
  <a-layout style="height:100%; overflow-y: scroll ">
    <!--<sider/>-->
    <a-layout-header style="height: 90px;background: white;">
      <!--<tab/>-->
      Header
    </a-layout-header>
    <a-layout-content style="padding: 20px;">
      <div style="background: white;padding: 20px;">
        <div>
          <a-input-group>
            <a-select v-model="http.method" :options="['GET','POST','PUT','DELETE']" style="width:120px"
                      placeholder="Method"/>
            <a-input v-model="http.url" style="width:200px"/>
            <div class="w-10"></div>
            <a-button type="primary" @click="handleClickSend" :loading="req.loading">Send</a-button>
          </a-input-group>
        </div>
        <div class="h-10"></div>
        <div style="height: 200px; padding: 10px; border: 1px solid lightgray; font-family: 'Consolas', serif;">
          <vue-monaco-editor
            language="json"
            v-model:value="code"
            :options="{ automaticLayout: true, formatOnType: true, formatOnPaste: true, minimap: {enabled: false}}"
            @mount="handleMount"
          />
        </div>
        <div class="h-10"></div>
        <div style="padding: 10px; border: 1px solid lightgray; font-family: 'Consolas', serif;">
          result:
          <div>
            {{ http.method }} {{ http.url }}
          </div>
        </div>
        <div class="h-10"></div>
        <div style="padding: 10px; border: 1px solid lightgray; font-family: 'Consolas', serif;">
          request:
          <div>
            {}
          </div>
        </div>
        <div class="h-10"></div>
        <div v-if="req.elapsedMilliseconds > 0"
             style="padding: 10px; border: 1px solid lightgray; font-family: 'Consolas', serif;">
          <div>请求耗时: {{ req.elapsedMilliseconds }}ms</div>
          response:
          <div>
            {}
          </div>
        </div>
      </div>

      <div class="h-10"></div>
      <a-typography-paragraph>
        <a-typography-title>
          feature list:
        </a-typography-title>
        <ol>
          <li>代码编辑器</li>
          <li>基本功能 → 能进行GET、POST等请求</li>
          <li>环境管理</li>
          <li>API历史记录</li>
          <li>JSON格式化等工具</li>
          <li>RESTful API 色块区分</li>
          <li>设置页 → 设置请求超时时间</li>
          <li>Ctrl + S 不弹出保存网页</li>
          <li>标签页 → 可打开多个标签</li>
          <li>请求时可停止请求</li>
          <li>可设置 newtab 是否为主页</li>
          <li>可下拉选择进入主页</li>
          <li>可单独开一个窗体</li>
          <li>API目录树</li>
          <li>API搜索</li>
          <li>右键不弹出浏览器菜单✔️</li>
          <li>Ctrl+S不保存网页✔️</li>
          <li>按钮弹出F12调试窗口 → 无法实现✔️</li>
        </ol>
      </a-typography-paragraph>

    </a-layout-content>
    <a-layout-footer style="height: 90px;background: white;">Footer</a-layout-footer>


  </a-layout>


</template>

<script lang="ts" setup>
import {reactive, ref, shallowRef} from "vue";
import type {HttpInfo} from "../../index.ts";
import axios from "axios";
import {Message} from "@arco-design/web-vue";




const http = reactive({
  method: 'GET',
  url: 'http://localhost:8080'
} as HttpInfo);

const req = reactive({
  loading: false,
  elapsedMilliseconds: 0
})

const res = reactive({
  data: null
})
const code = ref(`{
  "name": "kelly",
  "age": 26
}`)
const editor = shallowRef()
const handleMount = editorInstance => (editor.value = editorInstance)

function formatCode() {
  editor.value?.getAction('editor.action.formatDocument').run()
}

const handleClickSend = async () => {
  const startTime = performance.now(); // 记录请求开始时间
  try {
    req.loading = true
    const response = await axios.request({method: http.method, url: http.url})
    res.data = JSON.stringify(response.data)
  } catch (e) {
    Message.error({
      content: e.message,
      duration: 15000,
      closable: true
    })
  } finally {
    req.loading = false
    const duration = performance.now() - startTime;
    req.elapsedMilliseconds = Math.floor(duration)
  }
}


</script>

<style scoped>

</style>
