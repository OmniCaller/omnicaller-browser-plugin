<template>
  <div class="codemirror">
    <div id="monacoEditor" class="monaco-editor" ref="monacoEditor"></div>
  </div>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref, toRaw, watch} from "vue";
import * as monaco from "monaco-editor";
import loader from '@monaco-editor/loader';

// 配置 Monaco 的 Worker 环境
self.MonacoEnvironment = {
  getWorker(workerId, label) {
    console.log('workerId:', workerId)
    console.log('label:', label)
    if (label === "json") {
      return new Worker(new URL('monaco-editor/esm/vs/language/json/json.worker', import.meta.url));
    }
    // return import("monaco-editor/esm/vs/language/json/json.worker?worker");
    // if (label === "css" || label === "scss" || label === "less")
    //   return import("monaco-editor/esm/vs/language/css/css.worker?worker");
    // if (label === "html")
    //   return import("monaco-editor/esm/vs/language/html/html.worker?worker");
    // if (["typescript", "javascript"].includes(label))
    //   return import("monaco-editor/esm/vs/language/typescript/ts.worker?worker");
    // return import("monaco-editor/esm/vs/editor/editor.worker?worker");
    return new Worker(new URL('monaco-editor/esm/vs/editor/editor.worker', import.meta.url));
  },
};

// 定义从父组件接收的属性
const props = defineProps({
  option: {
    type: Object,
    default: () => ({
      options: {
        language: "json", // 默认语言
        code: ``,
      },
    }),
  },
});

// 定义响应式变量
const monacoEditor = ref(null); // 编辑器容器
const editor = ref(null); // 编辑器实例

// 初始化编辑器
function initEditor(language, code) {
  if (!monacoEditor.value) return;

  loader.config({monaco: monaco})
  loader.init().then(monaco => {
    editor.value = monaco.editor.create(monacoEditor.value, {
      value: code,
      theme: "vs-dark", // 主题
      language: language,
      automaticLayout: true,
      folding: true,
      scrollBeyondLastLine: false,
      colorDecorators: true, // 颜色装饰器
      accessibilitySupport: "on", // 辅助功能支持  "auto" | "off" | "on"
      colors: {
        "editor.background": "#131722", // 修改编辑器背景颜色
        "editor.lineHighlightBackground": "#131722", // 当前行背景高亮颜色
        "editorCursor.foreground": "#131722", // 光标颜色
      },
    });
    console.log('Here is the monaco instance', monaco);
  });

  // 添加自定义补全项
  registerCustomCompletionProvider(language);
}

// 注册自定义补全提供者
function registerCustomCompletionProvider(language) {
  monaco.languages.registerCompletionItemProvider(language, {
    provideCompletionItems: (model, position) => {
      const suggestions = [
        {
          label: "console.log", // 提示标签
          kind: monaco.languages.CompletionItemKind.Function, // 类型
          insertText: "console.log(${1:message});", // 插入的内容，支持占位符
          insertTextRules:
          monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, // 插入规则
          documentation: "输出到控制台", // 文档描述
        },
        {
          label: "for loop",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: "for (let i = 0; i < ${1:array}.length; i++) {\n\t$0\n}",
          insertTextRules:
          monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "简单的 for 循环代码模板",
        },
      ];
      return {suggestions};
    },
  });
}

// 监听 props.option 的变化
watch(
  () => props.option,
  (newOption) => {
    if (editor.value) {
      // 只更新编辑器内容和语言，而不是每次都重新初始化
      if (newOption.options.code !== editor.value.getValue()) {
        editor.value.setValue(newOption.options.code);
      }
      if (
        newOption.options.language !== editor.value.getModel().getLanguageId()
      ) {
        monaco.editor.setModelLanguage(
          editor.value.getModel(),
          newOption.options.language
        );
      }
    } else {
      // 仅在第一次初始化时创建编辑器
      initEditor(newOption.options.language, newOption.options.code);
    }
  },
  {immediate: true, deep: false} // 禁用 deep 监听，避免每个嵌套的变化都触发
);

// 挂载时初始化编辑器
onMounted(() => {


  initEditor(props.option.options.language, props.option.options.code);
});

// 销毁前清理编辑器实例
onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.dispose();
  }
});
// 在父组件中调用这个方法来获取代码内容
const getCode = () => {
  // 确保编辑器已经初始化
  if (editor.value) {
    try {
      // 使用 Monaco 编辑器实例的 getValue() 方法获取代码内容
      let demo = toRaw(editor.value).getValue(); //获取编辑器中的文本
      return demo
    } catch (error) {
      console.error('获取代码内容失败：', error);
      return '';
    }
  }
  return '';  // 返回空字符串，如果 editor 没有初始化
};

const setCode = (code) => {
  // 确保编辑器已经初始化
  if (editor.value) {
    try {
      // 使用 Monaco 编辑器实例的 getValue() 方法获取代码内容
      toRaw(editor.value).setModel(monaco.editor.createModel(code, props.option.options.language))
    } catch (error) {
      console.error('获取代码内容失败：', error);
      return '';
    }
  }
  return '';  // 返回空字符串，如果 editor 没有初始化
}
// 通过暴露 `getCode` 方法供父组件调用
defineExpose({
  getCode, setCode
});
</script>

<style scoped>
.codemirror,
.monaco-editor {
  width: 100%;
  height: 100%;
  background-color: skyblue;
}
</style>
