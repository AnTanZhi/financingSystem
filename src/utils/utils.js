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
/* 判断null */
export const isNull = (value) => {
  if (value != "" && value != null && value != undefined) {
    return false
  }
  return true
}
/* 表格合计 */
export const tableTotal = (param, dataName) => {
  const { columns, data } = param;
  const sums = [];
  columns.forEach((column, index) => {
    dataName.forEach(item => {
      if (item == column.label) {
        const values = data.map(item => {
          if (isNaN(Number(item[column.property])))
            return 0
          else
            return Number(item[column.property])
        });
        sums[index] = values.reduce((prev, curr) => {
          return Number(Number(prev) + Number(curr)).toFixed(6)
        }, 0);
      }
    });
  });
  return sums;
}
