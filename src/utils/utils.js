/* 级联 */
export const recursion = (data, array) => {
  data.forEach((item, index) => {
    array.push({
      departId: item.departId,
      departName: item.departName
    })
    if (item.childs != null) {
      recursion(item.childs, array)
    }
  });
  return array
}
/* 判断时间补零 */
export const ST = (value) => {
  if (value.length == 10) {
    return value += " 00:00:00"
  }
  return value
}