import {createApp} from "vue";
import App from "./App.vue";
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import components from './components'

import '../assets/styles/newtab.css';

// 导全量包
// import * as monaco from 'monaco-editor';
// 只导核心包, 需手动引入语言
// import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
// import * as monaco from "monaco-editor/esm/vs/editor/editor.main.js";
// import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
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



// self.MonacoEnvironment = {
//   getWorkerUrl: function (moduleId, label) {
//     console.log('moduleId:', moduleId)
//     console.log('label:', label)
//     if (label === 'json') {
//       return './json.worker.js';
//     }
//     if (label === 'css' || label === 'scss' || label === 'less') {
//       return './css.worker.js';
//     }
//     if (label === 'html' || label === 'handlebars' || label === 'razor') {
//       return './html.worker.js';
//     }
//     if (label === 'typescript' || label === 'javascript') {
//       return './ts.worker.js';
//     }
//     return './editor.worker.js';
//   }
// };
// loader.config({monaco})

const app = createApp(App)
app.use(ArcoVue)
app.use(components)
// app.use(VueMonacoEditorPlugin)
app.mount('#root')

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
