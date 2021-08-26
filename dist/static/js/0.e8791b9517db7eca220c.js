(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 5:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_5_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_2_node_modules_sass_loader_dist_cjs_js_ref_5_3_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_5_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_2_node_modules_sass_loader_dist_cjs_js_ref_5_3_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_5_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_2_node_modules_sass_loader_dist_cjs_js_ref_5_3_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ 9:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.esm.js
var vue_esm = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=template&id=7ba5bd90&
var Appvue_type_template_id_7ba5bd90_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { id: "app" } },
    [_c("router-view", { key: _vm.$route.fullPath, staticClass: "app-view" })],
    1
  )
}
var staticRenderFns = []
Appvue_type_template_id_7ba5bd90_render._withStripped = true


// CONCATENATED MODULE: ./src/App.vue?vue&type=template&id=7ba5bd90&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
/* harmony default export */ var Appvue_type_script_lang_js_ = ({
  name: 'app'
});
// CONCATENATED MODULE: ./src/App.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_Appvue_type_script_lang_js_ = (Appvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/App.vue?vue&type=style&index=0&lang=scss&
var Appvue_type_style_index_0_lang_scss_ = __webpack_require__(5);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3);

// CONCATENATED MODULE: ./src/App.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_Appvue_type_script_lang_js_,
  Appvue_type_template_id_7ba5bd90_render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/App.vue"
/* harmony default export */ var App = (component.exports);
// CONCATENATED MODULE: ./src/utils/rem.js
/*
 * base on clientWidth,then transform to rem,default 320px == 20rem
 */
function setRem(doc, win) {
  var docEl = doc.documentElement;
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

  var reCaculate = function reCaculate() {
    var clientWidth = docEl.clientWidth; // console.log(clientWidth)

    if (!clientWidth) return;
    var fontSize = 75 * (clientWidth / 750);
    fontSize = Math.min(fontSize, 75);
    docEl.style.fontSize = fontSize + 'px';
  };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, reCaculate, false);
  doc.addEventListener('DOMContentLoaded', reCaculate, false);
}
/**
 * 自适应rem。首先判断用vw，没有支持vw再用js动态改变html的font-size
 *
 * @param {*} docEl
 * @param {*} padBaseSize
 */

var autoRem = function autoRem(docEl, padBaseSize) {
  var width;

  var resize = function resize() {
    var widthDynamic = Math.min(docEl.getBoundingClientRect().width, docEl.clientWidth, padBaseSize);

    if (width !== widthDynamic) {
      width = widthDynamic;
      docEl.style.fontSize = "".concat(width / 10, "px");
    }
  };

  var el = document.createElement('div');
  el.setAttribute('style', 'width: 1vw');

  if (!el.style.width) {
    window.addEventListener && window.addEventListener('orientationchange' in window ? 'orientationchange' : 'resize', resize, false);
    window.addEventListener('DOMContentLoaded', resize, false);
  } else {
    docEl.style.fontSize = '10vw';
  }
};
// EXTERNAL MODULE: ./node_modules/vue-router/dist/vue-router.esm.js
var vue_router_esm = __webpack_require__(2);

// CONCATENATED MODULE: ./src/router/routes.js
/* harmony default export */ var routes = ([{
  path: '/',
  redirect: '/index'
}, {
  path: '/index',
  name: '首页',
  component: function component(resolve) {
    __webpack_require__.e(/* AMD require */ 3).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(43)]; (resolve).apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__);}.bind(this)).catch(__webpack_require__.oe);
  }
}]);
// CONCATENATED MODULE: ./src/router/index.js



vue_esm["a" /* default */].use(vue_router_esm["a" /* default */]);
function createRouter() {
  var router = new vue_router_esm["a" /* default */]({
    routes: routes
  });
  return router;
}
// CONCATENATED MODULE: ./src/main.js




setRem(document, window);
/* router & 历史栈 */

var main_router = createRouter();
new vue_esm["a" /* default */]({
  el: '#app',
  router: main_router,
  render: function render(h) {
    return h(App);
  }
});

/***/ })

},[[9,1,2]]]);