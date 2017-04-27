let dom = {
    // 事件委托
    on: function(element, eventType, selector, fn) {
        element.addEventListener(eventType, (e) => {
            let el = e.target
            while (el && !el.matches(selector)) {
                el = el.parentNode
                if (element === el) {
                    el = null
                }
            }
            if (el) {
                fn.call(el, e, el)
            }
        })
        return element
    },

    onSwipe: function(element, fn) {
        let x0, y0
        element.addEventListener('touchstart', function(e) {
            x0 = e.touches[0].clientX
            y0 = e.touches[0].clientY
        })
        element.addEventListener('touchmove', function(e) {
            if (!x0 || !y0) { return }
            let xDiff = e.touches[0].clientX - x0
            let yDiff = e.touches[0].clientY - y0

            if (Math.abs(xDiff) > Math.abs(yDiff)) {
                if (xDiff > 0) {
                    fn.call(element, e, 'right')
                } else {
                    fn.call(element, e, 'left')
                }
            } else {
                if (yDiff > 0) {
                    fn.call(element, e, 'down')
                } else {
                    fn.call(element, e, 'up')
                }
            }
            x0 = undefined
            y0 = undefined
        })
    },

    // 找到元素在同辈中的index
    index: function(element) {
        let siblings = element.parentNode.children
        for (let index = 0; index < siblings.length; index++) {
            if (siblings[index] === element) {
                return index
            }
        }
        return -1
    },

    // 给指定元素添加class，同辈的元素去掉class
    uniqueClass: function(element, className) {
        dom.every(element.parentNode.children, (el) => {
            el.classList.remove(className)
        })
        element.classList.add(className)
        return element
    },

    every: function(nodeList, fn) {
        for (var i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i], i)
        }
        return nodeList
    },

    // http://stackoverflow.com/a/35385518/1262580
    create: function(html) {
        var template = document.createElement('template')
        template.innerHTML = html.trim()
        return template.content.firstChild
    }
}