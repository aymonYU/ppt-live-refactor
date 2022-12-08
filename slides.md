---
theme: 'vuetiful'
clicks: 1
altCover: false 
---

# js 解析器实现
---

# 背景

* 解决column动态化，小程序不能执行js的问题，完成组件动态下饭最后一步
* 给大家分享我们在业务开发中不经常接触，但是在软件开发中非常有用的编译原理

---
layout: section
---
# js 解析器基本原理

---

# js 在浏览器解析运行过程

<img src="/img/ast.png">

---

# 针对小程序解析器

<img  class="mt-[-22px]" src="/img/ast1.png">


---
layout: section
---
# 编辑器部分

---

# 编辑器实现部分

<div class="pt-16">
<img src="/img/generatecode.png">
</div>


---

# 编译器（编译原理）应用的场景

1. js的编译器（babel，eslint），例如：es6 语法编译成 es5的语法
2. ts编译
3. jsx， Less，vue文件编译成render函数， 等等的编译

---

# 常见的js编译器

1. babel(环境：node), ebuild(环境：go), swc(环境：rust)

2. js环境编译器， acorn（小巧，babel前期代码也是基于这个库），exprima 等等

### ast 定义标准
https://github.com/estree/estree


<img src="/img/parser.png">


---

# 1. 词法分析 (Tokenization)
将源代码分解并组织成一组有意义的单词,这一过程即为词法分析(Token)。

例如一句单词，将其切割成主谓宾

```js
+----------------------------------------------------------+
| Javascript | is | the | best | language | in |the |world |
+----------------------------------------------------------+
```

将js代码切割成一个一个数组
```js
var a = 1;

[
  ("var": "keyword"),
  ("a": "identifier"),
  ("=": "assignment"),
  ("1": "literal"),
  (";": "separator"),
];
```

---

# 1. 编译器tokenlizer 最小实现

<IframeCode url="https://codesandbox.io/embed/sweet-gagarin-rbx9j0?fontsize=14&hidenavigation=1&theme=dark"/>

---

# 2. 语法解析 (Parsing)
将词法分析阶段生成的 Token 转换为抽象语法树(Abstract Syntax Tree),这一过程称之为语法解析(Parsing)。
```js
var a = 1;

{
  type: "Program",
  body: [
    {
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "sum"
          },
          init: {
            type: "Literal",
            value: 30,
            raw: "30"
          }
        }
      ],
      kind: "var"
    }
  ],
}
```
---

# 2. 编译器parser 最小实现

<IframeCode url="https://codesandbox.io/embed/suspicious-yonath-cc7dzp?fontsize=14&hidenavigation=1&theme=dark"/>

---
layout: section
---
# 解析器的实现

---

# 解析器 evaluate实现
前面我们得到js 有标准的 ast ，所以只需要对照这个标准格式进行实现语法树的求值，只要保证 JavaScript 一样的语义，就和 eval / new Function 等效果差不多了。

1. 作用域。比如全局作用域名，块级作用域
2. 将对应的代码块进行拼接、运行

---

# 解析器evaluate 最小实现

<IframeCode url="https://codesandbox.io/embed/friendly-pike-dubzkn?fontsize=14&hidenavigation=1&theme=dark"/>

---

# 解析器总体 最小实现

<IframeCode url="https://codesandbox.io/embed/funny-bhabha-4fur1i?fontsize=14&hidenavigation=1&theme=dark"/>


---
layout: section
---
# 我们自定义解析器做的事情

---
cols: '1-2'
---

# 自定义解析器
1. 将关键字进行更改
将"Program"这些关键字，全部用数字枚举来取代

2. 更换原先 eval5，更换起编译器，该用ts支持程度

3. 对代码进行混淆， terser

4. 补充单元测试
::right::
`var a ;`这一段代码ast，协议更改前：
<div class="flex flex-row">
<div class="flex-1">
```js
{
  "type": "Program",
  "body": [
    {
      "type": "VariableDeclaration",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "a"
          },
          "init": null
        }
      ],
      "kind": "var"
    }
  ],
}
```
</div>
<div class="flex-1">
更改后：

```js
{
  "type": 0,
  "body": [
    {
      "type": 1,
      "declarations": [
        {
          "type": 2,
          "id": {
            "type": 3,
            "name": "a"
          },
          "init": null
        }
      ],
      "kind": "var"
    }
  ],
}
```
</div>

</div>

---

# 仓库代码

https://git.woa.com/aymonyu/my-compiler

---
layout: section
---

附录

---

1. jsx的编译怎么实现的呢

https://astexplorer.net/

---

# 其他人针对这次小程序解析器被禁止所做的尝试

这里还有一篇 其他同学解析器另辟蹊径的方法
https://zhuanlan.zhihu.com/p/539725089

问题点：
1. 下发的是字节码，字节码过大，放入图片中有些不优雅
2. 下发的部分阅读性不高

---

# 其他话题

1. 终身学习

2. 了解一些原理性的东西，有利于定位，分析问题
