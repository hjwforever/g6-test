# G6-demo
  
  > - `src/pages/g6-demo/data.js` 中为json数据
  > - `src/pages/g6-demo/registerShape.js`  中自定义 **线，Behavior，或节点node**
  > - `src/pages/g6-demo/index.jsx` 中为运用G6来渲染结果图的主要代码， 大致特点如下:
  >>
  >> - 自定义了 **动画效果的线my-line-dash** ， 自定义了**点击节点的Behavior**， 另重写或定义了一些其他元素
  >> - 使用了多种类型的节点，如**diamond，ellipse， circle**;
  >> - **悬浮节点(hover)**或**选中节点(selected)**后， 有不同效果
  >> - 选中节点后，其相邻所有边变为 **动画虚线** (animation + cubic)

效果图：![效果图](https://s3.ax1x.com/2021/01/26/sOWlB4.png)
