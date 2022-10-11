'use strict';

import {preview} from "./components/preview";
import helper from "./components/preview/helper";
import XdFileListPreview from "@/components/XdFileListPreview";
import VueHighlightJS from 'vue-highlightjs'

// 定义 install 方法
const install = function (Vue, options) {
  if (install.installed) return;
  install.installed = true;
  Vue.use(VueHighlightJS);
  Vue.prototype.$xdOptions = options;
  Vue.prototype.$preview = (options, callback=null)=>{
    options['callback'] = callback;
    preview(options, Vue);
  };
  Vue.prototype.$fileHelper = helper;
  console.log('Vue.use()=> options', options);

  Vue.component(XdFileListPreview.name, XdFileListPreview)
};

if (typeof window !== 'undefined' && window['Vue']) {
  install(window['Vue'])
}

export default {
  install,
  XdFileListPreview
}
