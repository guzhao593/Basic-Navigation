
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

export function maxLetterNumber (param) {
  let reg = /[^a-zA-z]/g
  let newParam = param.replace(reg, '')
  let newArr = [...new Set(newParam.split(''))]
  const newObj = newParam.split('').reduce((init, currt) => {
    init[currt] = init[currt] ? ++init[currt] : 1
    return init
  }, {})
  console.log(Object.values(newObj))
  return {number: newArr.length, max: Object.values(newObj).length ? Math.max.apply(null, Object.values(newObj)) : 0}
}

/**
 * 把扁平化的数据转为成结构化的数据
 * @param {*} data []
 * @param {*} config{id: 数据里的string类型,pid: 数据里的父id string类型,children: 生成结果中子节点的字段名 string类型}
 */
export const jsonTree = function (data, config) {
  let id = config.id || 'id'
  let pid = config.pid || 'pid'
  let children = config.children || 'children'

  let idMap = []
  let jsonTree = []
  let newData = JSON.parse(JSON.stringify(data))

  newData.forEach(v => {
    idMap[v[id]] = v
  })

  newData.forEach(v => {
    let parent = idMap[v[pid]]
    if (parent) {
      !parent[children] && (parent[children] = [])
      parent[children].push(v)
    } else {
      jsonTree.push(v)
    }
  })
  return jsonTree
}

export const getCurrentMenuAllSelfId = (menu, selfIdArray = []) => {
  selfIdArray.push(menu.selfId)
  if (menu.children && menu.children.length) {
    menu.children.forEach(item => {
      getCurrentMenuAllSelfId(item, selfIdArray)
    })
  }
  return selfIdArray
}
