import axios from 'axios'
import { Message } from 'element-ui'
/* 级联 */
export const recursion = (data, array) => {
  data.forEach(item => {
    array.push({
      departId: item.departId,
      departName: item.departName
    })
    if (item.childs != null) recursion(item.childs, array)
  });
  return array
}
/* 判断null */
export const isNull = (value) => {
  if (value != "" && value != null && value != undefined)
    return false
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
          if (isNaN(Number(item[column.property]))) return 0
          else return Number(item[column.property])
        });
        sums[index] = values.reduce((prev, curr) => {
          return Number(Number(prev) + Number(curr)).toFixed(6)
        }, 0);
      }
    });
  });
  return sums;
}
/* 导出 */
export const exportMethod = data => {
  return new Promise((resolve, reject) => {
    axios({
      method: data.method,
      url: `${data.url}${data.params ? '?' + data.params : ''}`,
      responseType: 'blob',
    }).then((res) => {
      const link = document.createElement('a')
      let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
      link.style.display = 'none'
      link.href = URL.createObjectURL(blob)
      link.download = data.fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      resolve()
    }).catch(error => {
      Message.error('导出异常，请稍候再试')
      console.log(error, Object.keys(error))
      reject()
    })
  })
}
/* 下载 */
export const templateDownload = data => {
  axios({
    method: data.method,
    url: data.url,
    params: data.params,
    responseType: "blob",
  })
    .then((res) => {
      const link = document.createElement("a");
      let blob = new Blob([res.data]);
      link.style.display = "none";
      link.href = URL.createObjectURL(blob);
      link.download = data.fileName; //下载的文件名
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((error) => {
      Message.error("下载异常，请稍候再试");
    });
}