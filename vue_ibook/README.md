# vue_ibook 	基于vue的web阅读器
通过命令行启动项目，端口 localhost:8080 
```
$ npm run dev
```

#### 1) 电子书格式 
txt、pdf、epub(Electronic Publication，一种电子出版物)、mobi(Amazon Kindle的电子书格式)...

#### 2) epubjs的核心工作原理 
epub格式的电子书 ==> Book(通过epub.js实例化了一个Book对象)  
Book ==> Rendition(通过renderTo方法生成一个Rendition对象负责电子书的渲染)  
Book ==> Theme(负责电子书的样式和主题)  
Book ==> Location(负责电子书位置定位) Book ==> Navigation(负责电子书的目录以及定位)

![epubjs的核心工作原理](https://github.com/CruxF/IMOOC/raw/master/ProImages/vueEbook_epub.jpg?1535437561437)

#### 3) 通过IP地址访问项目 
终端查看本地IP（IPv6地址，形如a.b.c.d），(Linux、macOS使用ifconfig指令，Windows使用ipconfig指令)  
==> 在config文件夹中修改index.js文件的host为0.0.0.0
==> 在浏览器通过IP地址访问项目（如http://a.b.c.d:8080)

#### 4) 手机访问项目 
手机和PC处于同一局域网（可以理解为手机和PC连接到同一个Wi-Fi） 
==> 查看PC的IP地址(IPv4地址，形如 m.n.p.q) 注意这里和上面的本地IP是不一样的
==> 在手机中打开浏览器，通过IP地址访问项目（如http://m.n.p.q:8080)

#### 5) 消除eslint语法规则 
方式一：在组件内部定义，将某个出现警告的规则取消
```
<script>
/* eslint-disable space-before-function-paren */
export default {
  name: 'Ebook',
  data () {
    return {}
  },
}
</script>
```

方法二：在.eslintrc.js文件中将该规则关闭掉(需要重新npm run dev才能生效) 
```
rules: {
  // allow async-await
  'generator-star-spacing': 'off',
  // allow debugger during development
  'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  'space-before-function-paren': 'off'
}
```
