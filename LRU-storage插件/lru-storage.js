/**
 * 痛点:
 * localStorage是以域名为单元进行存储，那么在一个域名下，就会有存储key重复的风险，可能导致页面出错。
 * 浏览器下容量基本限制在 5M 左右。尽管已经很大了，但是当超出存储容量时，js会抛出DOM exception，可能导致程序错误。
 * 相比cookie, Storage没有数据过期时间的概念, 一些已经不用的数据一直存在用户的机器上，更容易导致问题1的出现。
 *
 * 对应解决方案:
 * key值前加一个每个人独有的前缀，默认添加一个时间的hash值
 * LRU(Least Recently Used) 进行缓存淘汰
 * 增加一个内置属性_time,取出前和now进行比较
 * 极端情况下考虑localStorage和sessionStorage的升降级
 */

let num = 0 //localStorage中的对象数

function LRU () {

}

let memQueue = []
Array.prototype.remove = function (val) {
  var index = this.indexOf(val)
  if (index > -1) {
    this.splice(index, 1)
  }
}

/**
 * @param prefix  前缀
 * @param config  配置项，缓存过期时间maxAge，最大使用数limit
 */
function lruStorage (prefix, config) {
  if (window.localStorage) {
    let localStorage = window.localStorage
  } else {
    throw Error('环境不支持localStorage')
  }

  prefix = prefix
  config = config ? config : {
    maxAge: 1000 * 60 * 60 * 24, //一天
    limit: 100
  }

  return {
    set: function (key, value) {
      key = prefix + '-' + key
      if (num < config.limit) {
        value._time = Date.now()
        JSON.stringify(value)
        localStorage.setItem(key, value)
        num++
        memQueue.unshift(key)
      } else {
        localStorage.setItem(key, value)
        memQueue.unshift(key)

        let lruObj = memQueue.pop()
        localStorage.removeItem(lruObj)
      }
    },
    get: function (key) {
      key = prefix + '-' + key
      let now = Date.now()
      let value = localStorage.getItem(key)
      value = JSON.parse(value)

      if (!value || now - value._time > config.maxAge) {
        localStorage.removeItem(key)
        num--
        memQueue.remove(key)
        return undefined
      } else {
        memQueue.remove(key)
        memQueue.unshift(key)
        return value
      }
    }
  }
}

// export default {
//   lruStorage
// }