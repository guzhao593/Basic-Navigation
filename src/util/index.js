
export function clone (param) {
  if (typeof param !== 'object' || param === null) return param
  if (Array.isArray(param)) {
    return param.map((item, key) => {
      return clone(item)
    })
  } else {
    return Object.keys(param).reduce((init, currt) => {
      init[currt] = clone(param[currt])
      return init
    }, {})
  }
}

export const cloneData = function (obj) {
  if (obj === null) return null
  if (typeof obj !== 'object') return obj
  if (obj.constructor === Date) return new Date(obj)
  if (obj.constructor === RegExp) return new RegExp(obj)
  // eslint-disable-next-line
  let constructor = obj.constructor()
  var newObj = new obj.constructor() // 保持继承链
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) { // 不遍历其原型链上的属性
      var val = obj[key]
      newObj[key] = typeof val === 'object' ? clone(val) : val
    }
  }
  return newObj
}
