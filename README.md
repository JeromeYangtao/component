### 已经实现的组件
- [x] dialog组件
- [x] popover组件
- [x] Tabs组件
- [x] 轮播组件
- [x] localStorage 实现LRU缓存淘汰算法

### 效果预览
[dialog组件](https://jeromeyangtao.github.io/component/dialog%E7%BB%84%E4%BB%B6/)

[popover组件](https://jeromeyangtao.github.io/component/popover%E7%BB%84%E4%BB%B6/)

[Tabs组件](https://jeromeyangtao.github.io/component/Tabs%E7%BB%84%E4%BB%B6/)

[轮播组件](https://jeromeyangtao.github.io/component/%E8%BD%AE%E6%92%AD%E7%BB%84%E4%BB%B6/)

### 组件使用范例
dialog组件
```js
xxx.onclick = function() {
            var api = dialog({
                title: '标题',
                content: '这是一个对话框',
                buttons: [{
                    text: '确定',
                    action: function() {
                        outputDiv.textContent = '点击了确定'
                        return false
                    }
                }, {
                    text: '取消'
                }]
            })
        }
```

popover组件
```js
  popover({
            element: '#xxx',
            content: 'hi',
        })
```

Tabs组件
```js
tabs(document.querySelectorAll('.tabs')[0])
```

轮播组件
```js
slides(document.querySelectorAll('.slides')[0])
```

