<template>
  <div class="container">
    <v-main/>
  </div>
</template>

<style>
</style>

<script setup lang="ts">
import type {App} from "vue"
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import '../styles/newtab.css';
import components from './components'
import {install as VueMonacoEditorPlugin} from '@guolao/vue-monaco-editor'

// 导全量包
// import * as monaco from 'monaco-editor';
// 只导核心包, 需手动引入语言
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

// 可打包到newtab.hash.js中
// import 'monaco-editor/esm/vs/language/json/monaco.contribution'
// import "monaco-editor/esm/vs/language/json/json.worker.js";
// import 'monaco-editor/esm/vs/editor/editor.worker.js'

// import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'


// import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
// import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker";
// import * as EditorWorker from "monaco-editor/esm/vs/editor/editor.worker.js";
// import * as JsonWorker from "monaco-editor/esm/vs/language/json/json.worker.js";

// import codeUrl from "url:~/monaco-editor/esm/vs/language/json/json.worker.js"
// import codeUrl from "url:"

// console.log(codeUrl)


self.MonacoEnvironment = {
  getWorkerUrl: function (moduleId, label) {
    console.log('moduleId: ', moduleId)
    console.log('label: ', label)
    if (label === 'json') {
      return './json.worker.js'
      // return Promise.resolve(new JsonWorker())
    }
    return './editor.worker.js'
    // return Promise.resolve(new EditorWorker())
  }
};


defineOptions({
  prepare(app: App) {
    app.use(ArcoVue)
    app.use(components)
    app.use(VueMonacoEditorPlugin, {monaco})
  }
})

// 全局禁用右键菜单
document.addEventListener('contextmenu', (e) => {
  e.preventDefault() // 阻止默认行为
})
// 全局禁用保存网页
document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.key === 's') {
    event.preventDefault();
  }
});

</script>
