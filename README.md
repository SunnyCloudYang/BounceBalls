# Bounce Balls - 帮宝逝海洋球

## 介绍

### 欢迎来到第一平行宇宙——[球宇宙](./BounceBalls.html)

简单来说就是一个只有球的宇宙，可以制造混乱也可以守序善良(反正崩的是你的电脑hiahia(╯‵□′)╯炸弹! •••*～●)

## 宇宙架构

宇宙架构说明： 类Newton力学体系，类Galileo变换，SCY式(化名)碰撞方式；

## 版本说明

1. BounceBalls.html是老版本，UI较为简陋，也基本不再更新。但是允许的最大小球数目较高，没有特别需求还是建议使用PureBalls.html；
2. PureBalls.html是新版本，UI较为美观，以后如果还想加什么新功能的话多半会考虑在这上面加，代码也经过一些整理，相对整洁那么一点点；

## 使用说明（请认真阅读！）

1. 单击网页标题（Welcome to balabala...那个）可以查看当前的版本；
2. 输入框<del>(按理说)</del>（现在可以了）可以改变小球数量；
3. Gravity选项加入重力，Energy loss加入碰撞墙壁时的能量损失, Universe mode加入万有引力；
4. Custom选项可以自定义小球大小/速度、万有引力常量、背景颜色，
5. 高级隐藏操作：
   * **双击**Gravity打开/关闭跟随重力模式，你说没有用？哦我还没加呢别着急；
   * **双击**Energy Loss打开/关闭摇晃模式(shake mode)，小球会随着设备摇晃（你晃电脑干嘛呀，电脑可没有加速度计！）
   * **双击**Universe mode打开/关闭融合模式(merge mode)，大球会吃掉被压进自己内部的小球
   * **双击**Day mode或者Night mode打开/关闭尾部拖影，看个人爱好了；
   * <del>**双击**Custom？没有用</del>
6. 在小球内部按下鼠标左键可以控制任意小球，松开鼠标左键可将其释放;
7. 如果卡住了，请刷新页面，这将重新开始；
8. 如果你觉得有时候碰撞过程不河里，<del>emmm，其实我也这么觉得</del> 现在恒河里，不用怀疑；
9. 建议在PC端浏览器中开启传送，手机的<del>不会搞</del>屏幕比较小，不好玩；
10. 超高校级隐藏操作：
    * 打开控制台，balls_valumn[i]对应的就是每一个小球，有mess/radius/x/y/vx/vy等属性，直接赋值即可突破限制（eg. balls_valumn[0].mess=114514;）<del>一般人我都不告诉的</del>

## 建议

1. 在Gravity或Universe模式下建议加入能量损失(Energy loss)
2. 建议把Gravity const调小一点；
3. 上面两条**很重要！！！**

## 鸣谢

1. 对提供源码框架的**Yan同学**（化名）表示**严重感谢！！！** 吃井不忘挖水人！
2. 感谢Edge行而不卡，卡而不死，死而不坏；
3. 感谢头发不离不弃；
4. 感谢牛顿叔叔提供理论支持；
5. 感谢量子力学提供最终解释权。

## 特技

1. Bug表演；
2. <del>有时候能量不太守恒</del> 没有的事儿；
3. <del>有时候动量也不太守恒</del> 没有的事儿；
4. 可能同时治疗低血压和高血压；
5. 程序员的事，能叫bug吗，那是Feature，Feature...

## 最后

还在看？那点个Star吧~

还有一件事——记得把网址(<https://sunnycloudyang.github.io/>)加入收藏夹！

Contact me if confused at <sunnycloudyang@outlook.com>

<br>
<br>

Last updated:
2023-3-17 18:50
