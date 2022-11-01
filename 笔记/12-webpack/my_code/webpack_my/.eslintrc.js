module.exports = {
    extends: "eslint:recommended", // 使用eslint推荐的默认规则
    rules: {
        //eslint 检查的规则：  0：忽略  1：警告  2：报错
        "no-console": 0, // 不检查console(一般在开发中不检查console，但是在发布版一般不会使用console)
        eqeqeq: 1, // 要求使用 ===
        "no-alert": 0, // 不能使用alert
        "no-unused-vars": 0, // 变量声明定义但未使用不报错
    },
    parserOptions: {
        ecmaVersion: 6, // 支持es6
        sourceType: "module", // 使用es6模块化
    },
    env: {
        // 环境 用来指定识别哪个环境的全局变量
        browser: true, // 支持浏览器中的全局变量
        node: true, // 支持node中的全局变量
        es6: true, // 支持ES6中的全局变量
    },
    globals: {
        // 声明使用的全局变量, 这样即使没有定义也不会报错了
        axios: "readonly", // $ 不允许重写变量
    },
};
