# [Demo演示 :blush:](https://fuxiaoqin.github.io/TestGame/index.html)<br>
↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
 
[![image](https://github.com/Fuxiaoqin/TestGame/blob/master/images/banner.jpg?raw=true "点我演示效果")](https://fuxiaoqin.github.io/TestGame/index.html) [![image](https://github.com/Fuxiaoqin/TestGame/blob/master/images/banner2.jpg?raw=true "点我演示效果")](https://fuxiaoqin.github.io/TestGame/index.html)

## 开发说明：
### 一、使用技术栈
    1.H5：支持移动端、PC端
    2.css：使用css3高级动画，animate.css框架动画
    3.Javascript：ES5语法
    4.jQuery: 选择器、循环API
   
### 二、本demo各功能
    1.支持移动端、pc端
    2.支持一次分享、二次分享
    3.支持多页面跳转
    4.支持外部分享页进入后展示下载横幅
    5.支持PV人数展示
    6.支持分享次数控制抽奖次数
    6.如若想编辑本demo代码，拉取code，在dev分支下提交您的code，我会合并至master

### 三、开发流程
#### 一、页面之间的跳转及参数传递：
    1.页面跳转：window.location.href
    2.传递参数：链接上携带参数（需同时编码）
#### 二、难点及核心技术：
    1.需要同时给30个对象绑定动画时，可利用冒泡原理给其共用父级绑定一次即可，再判定目标对象是否为所需要的对象
    2.利用分享次数控制抽奖次数时：需在首次请求接口时传递初始化为0的分享计数器，后台将count值存入缓存数组，
    每次分享之后将其加1再push进数组
    3.各种aimiate动画使用前后需清除原动画
## 联系方式
- `Email`：xiaoqinfu@sina.com
