"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.uniqArr = uniqArr;
// 一些小的封装
// 数组去重
function uniqArr(arr) {
  return Array.from(new Set(arr));
}

// 求和
var sum = function sum(a, b) {
  return a + b;
};
var _default = {
  sum: sum
};
exports["default"] = _default;