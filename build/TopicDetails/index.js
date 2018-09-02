(function(){
      
  var createPageHandler = function() {
    return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * 显示菜单
 */
function showMenu() {
  var prompt = $app_require$('@app-module/system.prompt');
  var router = $app_require$('@app-module/system.router');
  var appInfo = $app_require$('@app-module/system.app').getInfo();
  prompt.showContextMenu({
    itemList: ['保存桌面', '关于', '取消'],
    success: function success(ret) {
      switch (ret.index) {
        case 0:
          // 保存桌面
          createShortcut();
          break;
        case 1:
          // 关于
          router.push({
            uri: '/About',
            params: {
              name: appInfo.name,
              icon: appInfo.icon
            }
          });
          break;
        case 2:
          // 取消
          break;
        default:
          prompt.showToast({
            message: 'error'
          });
      }
    }
  });
}

/**
 * 创建桌面图标
 * 注意：使用加载器测试`创建桌面快捷方式`功能时，请先在`系统设置`中打开`应用加载器`的`桌面快捷方式`权限
 */
function createShortcut() {
  var prompt = $app_require$('@app-module/system.prompt');
  var shortcut = $app_require$('@app-module/system.shortcut');
  shortcut.hasInstalled({
    success: function success(ret) {
      if (ret) {
        prompt.showToast({
          message: '已创建桌面图标'
        });
      } else {
        shortcut.install({
          success: function success() {
            prompt.showToast({
              message: '成功创建桌面图标'
            });
          },
          fail: function fail(errmsg, errcode) {
            prompt.showToast({
              message: errcode + ': ' + errmsg
            });
          }
        });
      }
    }
  });
}

function formatTime(tm) {
  var date = new Date(tm);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  return [year, month, day].map(formatNumber).join('-');
}

function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}

/* 
* url 目标url 
* arg 需要替换的参数名称 
* arg_val 替换后的参数的值 
* return url 参数替换后的url 
*/
function changeURLArg(url, arg, arg_val) {
  var pattern = arg + '=([^&]*)';
  var replaceText = arg + '=' + arg_val;
  if (url.match(pattern)) {
    var tmp = '/(' + arg + '=)([^&]*)/gi';
    tmp = url.replace(eval(tmp), replaceText);
    return tmp;
  } else {
    if (url.match('[\?]')) {
      return url + '&' + replaceText;
    } else {
      return url + '?' + replaceText;
    }
  }
  return url + '\n' + arg + '\n' + arg_val;
}

exports.default = {
  showMenu: showMenu,
  createShortcut: createShortcut,
  formatTime: formatTime,
  changeURLArg: changeURLArg
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = __webpack_require__(2);

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var API_ROOT = 'http://v2er.leanapp.cn';

var urlList = {
  listHot: '/api/topics/hot.json',
  listLatest: '/api/topics/latest.json',
  topicShow: '/api/topics/show.json',
  repliyShow: '/api/replies/show.json'
};

exports.default = {
  /**
   * 获取最热帖子列表
   */
  hotTopicList: function hotTopicList() {
    return (0, _request2.default)(API_ROOT + urlList.listHot);
  },

  /**
   * 获取最新帖子列表
   */
  latestTopicList: function latestTopicList() {
    return (0, _request2.default)(API_ROOT + urlList.listLatest);
  },

  /**
   * 获取帖子详情
   */
  topicDetails: function topicDetails(id) {
    return (0, _request2.default)(API_ROOT + urlList.topicShow, {
      params: {
        id: id
      }
    });
  },

  /**
   * 获取回复详情
   */
  repliyDetails: function repliyDetails(topic_id) {
    return (0, _request2.default)(API_ROOT + urlList.repliyShow, {
      params: {
        topic_id: topic_id,
        page: 1,
        page_size: 100
      }
    });
  }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _system = $app_require$('@app-module/system.fetch');

var _system2 = _interopRequireDefault(_system);

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiRequest = function apiRequest(path, options) {
  var options = options || {};
  return new Promise(function (resolve, reject) {
    var headers = {
      'Content-Type': 'application/json; charset=utf-8'
    };
    var params = options.params || {},
        data = options.data || {};
    if (options && options.headers) {
      options.headers = Object.assign(headers, options.headers);
    } else {
      options.headers = headers;
    }
    // 添加 url 参数
    if (options && params) {
      for (var key in params) {
        path = _util2.default.changeURLArg(path, key, params[key]);
      }
    }
    if (!path) {
      reject('request url is required');
    }
    _system2.default.fetch({
      url: path,
      data: data,
      method: 'GET',
      header: options.headers,
      success: function success(response) {
        if (response) {
          resolve(JSON.parse(response.data));
        } else {
          resolve(response.data);
        }
      },
      fail: function fail(error, code) {
        reject("fetch fail, code=" + code);
      }
    });
  });
};

module.exports = apiRequest;

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var $app_template$ = __webpack_require__(5)
var $app_style$ = __webpack_require__(6)
var $app_script$ = __webpack_require__(7)

$app_define$('@app-component/index', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})

$app_bootstrap$('@app-component/index',{ packagerVersion: '0.0.5'})


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = {
  "type": "div",
  "attr": {},
  "classList": [
    "topic-details-page"
  ],
  "children": [
    {
      "type": "div",
      "attr": {},
      "classList": [
        "section",
        "title-box"
      ],
      "children": [
        {
          "type": "text",
          "attr": {
            "value": function () {return this.title}
          }
        }
      ]
    },
    {
      "type": "div",
      "attr": {},
      "classList": [
        "section",
        "head-info"
      ],
      "children": [
        {
          "type": "div",
          "attr": {},
          "classList": [
            "avator-box",
            "unit-0"
          ],
          "children": [
            {
              "type": "image",
              "attr": {
                "src": function () {return this.details.member&&this.details.member.avatarUrl}
              }
            }
          ]
        },
        {
          "type": "div",
          "attr": {},
          "classList": [
            "user-info",
            "unit-0"
          ],
          "children": [
            {
              "type": "div",
              "attr": {},
              "classList": [
                "username"
              ],
              "children": [
                {
                  "type": "text",
                  "attr": {
                    "value": function () {return this.details.member&&this.details.member.username}
                  }
                }
              ]
            },
            {
              "type": "div",
              "attr": {},
              "classList": [
                "date"
              ],
              "children": [
                {
                  "type": "text",
                  "attr": {
                    "value": function () {return this.details.creatDate||''}
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "div",
      "attr": {},
      "classList": [
        "section",
        "content-box"
      ],
      "children": [
        {
          "type": "richtext",
          "attr": {
            "type": "html",
            "value": function () {return this.details.content_rendered||''}
          },
          "classList": [
            "content-richtext"
          ]
        }
      ]
    }
  ]
}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = {
  ".flex-left": {
    "display": "flex",
    "alignItems": "stretch",
    "justifyContent": "flex-start"
  },
  ".flex-center": {
    "display": "flex",
    "alignItems": "stretch",
    "justifyContent": "center"
  },
  ".flex-right": {
    "display": "flex",
    "alignItems": "stretch",
    "justifyContent": "flex-end"
  },
  ".flex-top": {
    "display": "flex",
    "alignItems": "flex-start",
    "justifyContent": "flex-start"
  },
  ".flex-middle": {
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "flex-start"
  },
  ".flex-bottom": {
    "display": "flex",
    "alignItems": "flex-end",
    "justifyContent": "flex-start"
  },
  ".flex-vertical": {
    "display": "flex",
    "flexDirection": "column"
  },
  ".units-gap": {
    "marginLeft": "-15px",
    "marginRight": "-15px"
  },
  ".units-gap > .unit": {
    "paddingLeft": "15px",
    "paddingRight": "15px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "units-gap"
        },
        {
          "t": "child"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "unit"
        }
      ]
    }
  },
  ".units-gap > .unit-0": {
    "paddingLeft": "15px",
    "paddingRight": "15px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "units-gap"
        },
        {
          "t": "child"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "unit-0"
        }
      ]
    }
  },
  ".units-gap > .unit-1": {
    "paddingLeft": "15px",
    "paddingRight": "15px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "units-gap"
        },
        {
          "t": "child"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "unit-1"
        }
      ]
    }
  },
  ".units-gap > .unit-1-on-mobile": {
    "paddingLeft": "15px",
    "paddingRight": "15px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "units-gap"
        },
        {
          "t": "child"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "unit-1-on-mobile"
        }
      ]
    }
  },
  ".units-gap > .unit-1-2": {
    "paddingLeft": "15px",
    "paddingRight": "15px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "units-gap"
        },
        {
          "t": "child"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "unit-1-2"
        }
      ]
    }
  },
  ".units-gap > .unit-1-3": {
    "paddingLeft": "15px",
    "paddingRight": "15px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "units-gap"
        },
        {
          "t": "child"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "unit-1-3"
        }
      ]
    }
  },
  ".units-gap > .unit-2-3": {
    "paddingLeft": "15px",
    "paddingRight": "15px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "units-gap"
        },
        {
          "t": "child"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "unit-2-3"
        }
      ]
    }
  },
  ".units-gap > .unit-1-4": {
    "paddingLeft": "15px",
    "paddingRight": "15px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "units-gap"
        },
        {
          "t": "child"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "unit-1-4"
        }
      ]
    }
  },
  ".units-gap > .unit-3-4": {
    "paddingLeft": "15px",
    "paddingRight": "15px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "units-gap"
        },
        {
          "t": "child"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "unit-3-4"
        }
      ]
    }
  },
  ".units-gap-big": {
    "marginLeft": "-30px",
    "marginRight": "-30px"
  },
  ".units-gap-big > .unit": {
    "paddingLeft": "30px",
    "paddingRight": "30px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "units-gap-big"
        },
        {
          "t": "child"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "unit"
        }
      ]
    }
  },
  ".units-gap-big > .unit-0": {
    "paddingLeft": "30px",
    "paddingRight": "30px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "units-gap-big"
        },
        {
          "t": "child"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "unit-0"
        }
      ]
    }
  },
  ".units-gap-big > .unit-1": {
    "paddingLeft": "30px",
    "paddingRight": "30px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "units-gap-big"
        },
        {
          "t": "child"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "unit-1"
        }
      ]
    }
  },
  ".units-gap-big > .unit-1-on-mobile": {
    "paddingLeft": "30px",
    "paddingRight": "30px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "units-gap-big"
        },
        {
          "t": "child"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "unit-1-on-mobile"
        }
      ]
    }
  },
  ".units-gap-big > .unit-1-2": {
    "paddingLeft": "30px",
    "paddingRight": "30px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "units-gap-big"
        },
        {
          "t": "child"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "unit-1-2"
        }
      ]
    }
  },
  ".units-gap-big > .unit-1-3": {
    "paddingLeft": "30px",
    "paddingRight": "30px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "units-gap-big"
        },
        {
          "t": "child"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "unit-1-3"
        }
      ]
    }
  },
  ".units-gap-big > .unit-2-3": {
    "paddingLeft": "30px",
    "paddingRight": "30px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "units-gap-big"
        },
        {
          "t": "child"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "unit-2-3"
        }
      ]
    }
  },
  ".units-gap-big > .unit-1-4": {
    "paddingLeft": "30px",
    "paddingRight": "30px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "units-gap-big"
        },
        {
          "t": "child"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "unit-1-4"
        }
      ]
    }
  },
  ".units-gap-big > .unit-3-4": {
    "paddingLeft": "30px",
    "paddingRight": "30px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "units-gap-big"
        },
        {
          "t": "child"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "unit-3-4"
        }
      ]
    }
  },
  ".unit": {
    "flexBasis": "0px",
    "flexGrow": 1,
    "width": "100%"
  },
  ".unit-1": {
    "flexShrink": 0,
    "flexBasis": "100%",
    "width": "100%"
  },
  ".unit-1-on-mobile": {
    "flexShrink": 0
  },
  ".unit-1-2": {
    "flexShrink": 0,
    "flexBasis": "50%",
    "width": "50%"
  },
  ".unit-1-3": {
    "flexShrink": 0,
    "flexBasis": "33.33%",
    "width": "33.33%"
  },
  ".unit-2-3": {
    "flexShrink": 0,
    "flexBasis": "66.67%",
    "width": "66.67%"
  },
  ".unit-1-4": {
    "flexShrink": 0,
    "flexBasis": "25%",
    "width": "25%"
  },
  ".unit-3-4": {
    "flexShrink": 0,
    "flexBasis": "75%",
    "width": "75%"
  },
  ".flex-vertical > .unit": {
    "width": "0px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "flex-vertical"
        },
        {
          "t": "child"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "unit"
        }
      ]
    }
  },
  ".flex-vertical > .unit-0": {
    "width": "0px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "flex-vertical"
        },
        {
          "t": "child"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "unit-0"
        }
      ]
    }
  },
  ".flex-vertical > .unit-1": {
    "width": "0px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "flex-vertical"
        },
        {
          "t": "child"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "unit-1"
        }
      ]
    },
    "height": "100%"
  },
  ".flex-vertical > .unit-1-on-mobile": {
    "width": "0px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "flex-vertical"
        },
        {
          "t": "child"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "unit-1-on-mobile"
        }
      ]
    }
  },
  ".flex-vertical > .unit-1-2": {
    "width": "0px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "flex-vertical"
        },
        {
          "t": "child"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "unit-1-2"
        }
      ]
    },
    "height": "50%"
  },
  ".flex-vertical > .unit-1-3": {
    "width": "0px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "flex-vertical"
        },
        {
          "t": "child"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "unit-1-3"
        }
      ]
    },
    "height": "33.33%"
  },
  ".flex-vertical > .unit-2-3": {
    "width": "0px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "flex-vertical"
        },
        {
          "t": "child"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "unit-2-3"
        }
      ]
    },
    "height": "66.67%"
  },
  ".flex-vertical > .unit-1-4": {
    "width": "0px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "flex-vertical"
        },
        {
          "t": "child"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "unit-1-4"
        }
      ]
    },
    "height": "25%"
  },
  ".flex-vertical > .unit-3-4": {
    "width": "0px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "flex-vertical"
        },
        {
          "t": "child"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "unit-3-4"
        }
      ]
    },
    "height": "75%"
  },
  ".flex-wrap": {
    "flexWrap": "wrap"
  },
  ".cross-img": {
    "display": "flex",
    "width": "100%"
  },
  ".mt-20": {
    "marginTop": "20px"
  },
  ".mt-10": {
    "marginTop": "10px"
  },
  ".text-center": {
    "textAlign": "center"
  },
  ".text-right": {
    "textAlign": "right"
  },
  ".text-left": {
    "textAlign": "left"
  },
  ".bg-white": {
    "backgroundColor": "#ffffff"
  },
  ".color-primary": {
    "color": "#cda27f"
  },
  ".ui-border-t": {
    "borderTopColor": "#efefef",
    "borderRightColor": "#efefef",
    "borderBottomColor": "#efefef",
    "borderLeftColor": "#efefef",
    "borderTopWidth": "1px"
  },
  ".ui-border-b": {
    "borderTopColor": "#efefef",
    "borderRightColor": "#efefef",
    "borderBottomColor": "#efefef",
    "borderLeftColor": "#efefef",
    "borderBottomWidth": "1px"
  },
  ".ui-border-tb": {
    "borderTopColor": "#efefef",
    "borderRightColor": "#efefef",
    "borderBottomColor": "#efefef",
    "borderLeftColor": "#efefef",
    "borderTopWidth": "1px",
    "borderBottomWidth": "1px"
  },
  ".ui-border-l": {
    "borderTopColor": "#efefef",
    "borderRightColor": "#efefef",
    "borderBottomColor": "#efefef",
    "borderLeftColor": "#efefef",
    "borderLeftWidth": "1px"
  },
  ".ui-border-r": {
    "borderTopColor": "#efefef",
    "borderRightColor": "#efefef",
    "borderBottomColor": "#efefef",
    "borderLeftColor": "#efefef",
    "borderRightWidth": "1px"
  },
  ".ui-border": {
    "borderTopColor": "#efefef",
    "borderRightColor": "#efefef",
    "borderBottomColor": "#efefef",
    "borderLeftColor": "#efefef",
    "borderTopWidth": "1px",
    "borderRightWidth": "1px",
    "borderBottomWidth": "1px",
    "borderLeftWidth": "1px"
  },
  ".topic-details-page": {
    "paddingBottom": "40px",
    "display": "flex",
    "flexDirection": "column",
    "justifyContent": "flex-start",
    "alignItems": "flex-start"
  },
  ".topic-details-page .section": {
    "display": "flex",
    "width": "750px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "topic-details-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "section"
        }
      ]
    }
  },
  ".topic-details-page .title-box": {
    "width": "750px",
    "paddingTop": "20px",
    "paddingRight": "20px",
    "paddingBottom": "20px",
    "paddingLeft": "20px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "topic-details-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "title-box"
        }
      ]
    }
  },
  ".topic-details-page .title-box text": {
    "fontSize": "36px",
    "fontWeight": "bold",
    "color": "#000000",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "topic-details-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "title-box"
        },
        {
          "t": "d"
        },
        {
          "t": "t",
          "n": "text"
        }
      ]
    }
  },
  ".topic-details-page .head-info": {
    "width": "750px",
    "paddingTop": "0px",
    "paddingRight": "20px",
    "paddingBottom": "0px",
    "paddingLeft": "20px",
    "height": "110px",
    "display": "flex",
    "flexDirection": "row",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "topic-details-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "head-info"
        }
      ]
    }
  },
  ".topic-details-page .head-info .avator-box": {
    "width": "110px",
    "height": "110px",
    "borderRadius": "55px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "topic-details-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "head-info"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "avator-box"
        }
      ]
    }
  },
  ".topic-details-page .head-info .avator-box image": {
    "width": "110px",
    "height": "110px",
    "borderRadius": "55px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "topic-details-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "head-info"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "avator-box"
        },
        {
          "t": "d"
        },
        {
          "t": "t",
          "n": "image"
        }
      ]
    }
  },
  ".topic-details-page .head-info .user-info": {
    "width": "440px",
    "height": "110px",
    "paddingLeft": "20px",
    "display": "flex",
    "flexDirection": "column",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "topic-details-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "head-info"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "user-info"
        }
      ]
    }
  },
  ".topic-details-page .head-info .user-info .username": {
    "width": "440px",
    "height": "55px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "topic-details-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "head-info"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "user-info"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "username"
        }
      ]
    }
  },
  ".topic-details-page .head-info .user-info .username text": {
    "fontSize": "32px",
    "color": "#101010",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "topic-details-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "head-info"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "user-info"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "username"
        },
        {
          "t": "d"
        },
        {
          "t": "t",
          "n": "text"
        }
      ]
    }
  },
  ".topic-details-page .head-info .user-info .date": {
    "width": "440px",
    "height": "55px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "topic-details-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "head-info"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "user-info"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "date"
        }
      ]
    }
  },
  ".topic-details-page .head-info .user-info .date text": {
    "fontSize": "26px",
    "color": "#b1b1b1",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "topic-details-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "head-info"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "user-info"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "date"
        },
        {
          "t": "d"
        },
        {
          "t": "t",
          "n": "text"
        }
      ]
    }
  },
  ".topic-details-page .head-info .tag-box": {
    "width": "200px",
    "height": "110px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "topic-details-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "head-info"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tag-box"
        }
      ]
    }
  },
  ".topic-details-page .head-info .tag-box .tag": {
    "paddingTop": "10px",
    "paddingRight": "10px",
    "paddingBottom": "10px",
    "paddingLeft": "10px",
    "backgroundColor": "#eeeeee",
    "fontSize": "24px",
    "color": "#b7b7b7",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "topic-details-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "head-info"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tag-box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tag"
        }
      ]
    }
  },
  ".topic-details-page .content-box": {
    "width": "750px",
    "paddingTop": "0px",
    "paddingRight": "0px",
    "paddingBottom": "0px",
    "paddingLeft": "0px",
    "marginTop": "30px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "topic-details-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "content-box"
        }
      ]
    }
  },
  ".topic-details-page .content-box .content-richtext": {
    "width": "750px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "topic-details-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "content-box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "content-richtext"
        }
      ]
    }
  }
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(module, exports, $app_require$){'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _system = $app_require$('@app-module/system.router');

var _system2 = _interopRequireDefault(_system);

var _api = __webpack_require__(1);

var _api2 = _interopRequireDefault(_api);

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: {
    title: '',
    id: '',
    details: {}

  },
  onInit: function onInit() {
    this.$page.setTitleBar({ text: this.title });
  },
  onReady: function onReady() {
    this.initPageData();
  },
  initPageData: function initPageData() {
    this.getTopicDetails();
  },
  getTopicDetails: function getTopicDetails() {
    var _this = this;
    var id = this.id;
    _api2.default.topicDetails(id).then(function (res) {
      var data = res[0] || {};
      if (data.content_rendered) {
        data.content_rendered = '<style>img{display:block;width: 100% !important;;}</style><div>' + data.content_rendered + '</div>';
        data.creatDate = _util2.default.formatTime(data.created * 1000);
        data.member.avatarUrl = 'https:' + data.member.avatar_normal.replace('s=24&', 's=240&');
      }
      _this.details = data;

      console.log(_this.details);
    }).catch(function (err) {
      console.log(err);
    });
  }
};


var moduleOwn = exports.default || module.exports;
var accessors = ['public', 'protected', 'private'];

if (moduleOwn.data && accessors.some(function (acc) {
  return moduleOwn[acc];
})) {
  throw new Error('页面VM对象中的属性data不可与"' + accessors.join(',') + '"同时存在，请使用private替换data名称');
} else if (!moduleOwn.data) {
  moduleOwn.data = {};
  moduleOwn._descriptor = {};
  accessors.forEach(function (acc) {
    var accType = _typeof(moduleOwn[acc]);
    if (accType === 'object') {
      moduleOwn.data = Object.assign(moduleOwn.data, moduleOwn[acc]);
      for (var name in moduleOwn[acc]) {
        moduleOwn._descriptor[name] = { access: acc };
      }
    } else if (accType === 'function') {
      console.warn('页面VM对象中的属性' + acc + '的值不能是函数，请使用对象');
    }
  });
}}

/***/ })
/******/ ]);
  };
  if (typeof window === "undefined") {
    return createPageHandler();
  }
  else {
    window.createPageHandler = createPageHandler
  }
})();
//# sourceMappingURL=index.js.map