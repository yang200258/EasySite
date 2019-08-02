module.exports = {
  // root: true,
  // extends: '@react-native-community',
  //此项是用来指定eslint解析器的，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装使其与ESLint解析
  "parser": "babel-eslint",
  extends: ["eslint:recommended", "plugin:react/recommended"],
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "ecmaFeatures": { // 添加ES特性支持，使之能够识别ES6语法
      "jsx": true,
      
    }
  },
  "rules": {
    //行末使用分号
    "semi": "off",
    "react/prop-types": "off",
    "no-unused-vars": "off",
    // "quotes": [
    //   "error",
    //   "single",
    //   { "allowTemplateLiterals": true }
    // ],
    "indent": ["off","tab"],
    "linebreak-style": ["off","windows"],
    "react/jsx-indent-props": ["error", 4],
    "react/no-direct-mutation-state": 2,
    "no-console": 0,
    "no-debugger": 2
  },
  "env": {
    "es6": true,
    "browser": true,
    "node": true,
    "commonjs": true,
    // "react-native/react-native": true,
  },
  // 当访问未定义的变量时，no-undef 规则将发出警告。如果你想在一个文件里使用全局变量，推荐你定义这些全局变量，这样 ESLint 就不会发出警告了。你可以使用注释或在配置文件中定义全局变量。
  "globals": {
    "px2dp": true,
    "FONT_SIZE": true,
    "SCREEN_WIDTH": true,
    "SCREEN_HEIGHT": true,
    "IOS": true,
    "Android": true,
    "Toast": true,
    "isIPhoneX": true,
},
"plugins": [
  "react",
  "react-native",
],
};

