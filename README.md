# Startup


UI框架: ArcoDesign  
pnpm  
react  
node: v22.11.0  
rsbuild  



```
├─ /node_modules
├─ /public
|  └─ manifest.json         <--插件的配置文件
├─ /src
|  ├─ /api                  <-- api目录
|  |  └─ index.ts           <-- api库
|  ├─ /background           <--background script开发目录
|  |  └─ index.ts           <--background script主文件
|  ├─ /assets               <-- 全局公用目录
|  |  ├─ /fonts             <-- 字体文件目录
|  |  ├─ /images            <-- 图片文件目录
|  |  ├─ /ts                <-- 公用ts文件目录
|  |  └─ /styles            <-- 公用样式文件目录
|  ├─ /content              <--content script开发目录
|  ├─ /options              <--options script开发目录
|  ├─ /popup                <--popup 开发目录
|  ├─ /newtab               <--newtab 开发目录
|  |  ├─ /components        <--newtab 组件目录
|  |  ├─ /router            <--newtab 路由配置目录
|  |  |  └─ index.ts        <--newtab 路由配置文件
|  |  ├─ /views             <--newtab 页面目录
|  |  ├─ main.ts            <--newtab 主文件
|  |  └─ App.vue            <--newtab 入口页面文件
|  └─ mock.ts               <-- mock数据文件
├─.gitignore
├─ package.json
├─ pnpm-lock.yaml
└─ yarn.lock
```
