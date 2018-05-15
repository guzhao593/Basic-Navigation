// 普通冒泡排序
export const bubbleSort = (data, sortField) => {
  for (let i = 0, len = data.length; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (Number(data[i][sortField]) > Number(data[j][sortField])) {
        let template = data[i]
        data[i] = data[j]
        data[j] = template
      }
    }
  }
  return data
}
// 快速冒泡排序
export const fastBubbleSort = (data, sortField) => {
  let i = data.length - 1
  while (i > 0) {
    let pos = 0
    for (let j = 0; j < i; j++) {
      if (Number(data[i][sortField]) < Number(data[j][sortField])) {
        pos = j
        let template = data[i]
        data[i] = data[j]
        data[j] = template
      }
    }
    i = pos
  }
  return data
}
// 选择排序
export const selectSort = (data, sortField) => {
  let minIndex, temp
  for (let i = 0, len = data.length; i < len; i++) {
    minIndex = i
    for (let j = i + 1; j < len; j++) {
      if (Number(data[j][sortField]) < Number(data[minIndex][sortField])) {
        minIndex = j
      }
    }
    temp = data[minIndex]
    data[minIndex] = data[i]
    data[i] = temp
  }
  return data
}
