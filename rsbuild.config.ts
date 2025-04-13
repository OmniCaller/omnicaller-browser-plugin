import {defineConfig, loadEnv} from '@rsbuild/core';
import {pluginVue} from '@rsbuild/plugin-vue';
// import {resolve} from "@rspack/core/dist/config/browserslistTargetHandler";

// 默认情况下，`publicVars` 是以 `PUBLIC_` 为前缀的变量
const {publicVars} = loadEnv();

export default defineConfig({
  plugins: [pluginVue()],
  source: {
    define: publicVars,
    entry: {
      newtab: './src/newtab/main.ts',
    },
  },
  output:{
  },
  tools: {
    rspack:{
      ignoreWarnings: [/Critical dependency: require function is used in a way in which dependencies cannot be statically extracted/],
    }
  }

  // tools: {
  //   rspack: (config, {rspack}) => {
  //     config.cache = true;
  //     config.plugins.push(
  //       /**
  //        * 关闭警告：
  //        * public/tools/regulex中存在动态require
  //        * Critical dependency: require function is used in a way in which dependencies cannot be statically extracted
  //        */
  //       new rspack.ContextReplacementPlugin(/require\(\[".*"]\)/, resolve())
  //     );
  //   }
  // }
});
