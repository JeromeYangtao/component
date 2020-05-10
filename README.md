### 已经实现的组件

- [x] dialog 组件
- [x] popover 组件
- [x] Tabs 组件
- [x] 轮播组件
- [x] localStorage 实现 LRU 缓存淘汰算法
- [] 发布订阅库 EventEmitter

### 效果预览

[dialog 组件](https://jeromeyangtao.github.io/component/dialog%E7%BB%84%E4%BB%B6/)

[popover 组件](https://jeromeyangtao.github.io/component/popover%E7%BB%84%E4%BB%B6/)

[Tabs 组件](https://jeromeyangtao.github.io/component/Tabs%E7%BB%84%E4%BB%B6/)

[轮播组件](https://jeromeyangtao.github.io/component/%E8%BD%AE%E6%92%AD%E7%BB%84%E4%BB%B6/)

### 组件使用范例

dialog 组件

```js
xxx.onclick = function () {
  var api = dialog({
    title: '标题',
    content: '这是一个对话框',
    buttons: [
      {
        text: '确定',
        action: function () {
          outputDiv.textContent = '点击了确定';
          return false;
        },
      },
      {
        text: '取消',
      },
    ],
  });
};
```

popover 组件

```js
popover({
  element: '#xxx',
  content: 'hi',
});
```

Tabs 组件

```js
new tabs(document.querySelectorAll('.tabs')[0]);
new tabs(document.querySelectorAll('.tabs')[1]);
```

轮播组件

```js
slides(document.querySelectorAll('.slides')[0]);
```

### 插件使用

LRU-storage 插件

```js
用户使用;
lru = lruStorage('test'); //data will be storaged as 'test-xxx' in webStorage
lru.set('foo', 1);
lru.get('foo'); //1
lru.get('bar'); //undefined

lru = LruWebStorage('testStale', { maxAge: 6 * 1000 });
lru.set('a', 1);
lru.get('a'); //null

lru = LruWebStorage('testLimit', { limit: 2 });
lru.set('a', 1);
lru.set('b', 2);
lru.get('a');
lru.set('c', 3);

lru.get('c'); //3
lru.get('b'); //undefined
lru.get('a'); //1
```

EventEmitter

```js
var ee = new EventEmitter();
ee.on('message', function (text) {
  console.log(text);
});
ee.emit('message', 'hello world');
```
