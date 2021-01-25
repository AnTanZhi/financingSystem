import axios from 'axios'
import { Message } from 'element-ui'
/**
 * 级联(递归处理)
 * @param {Array} data 数据
 * @param {Array} array 空数组(用于返回)  
 */
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
/**
 * 判断是否为null(true==null,false!=null)
 * @param {Object} value 字段
 */
export const isNull = (value) => {
  if (value != "" && value != null && value != undefined && value != 'null' && value != " ")
    return false
  return true
}
/**
 * 表格合计
 * @param {Array} param 数据体(方法内置参数)
 * @param {Array} dataName 参与合计的列的lable 
 */
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
/**
 * 导出
 * @param {Object} data 参数对象(url,method,params,fileName)
 */
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
/**
 * 下载
 * @param {Object} data 参数对象(method,url,params,fileName)
 */
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
/**
 * 计算相差月/日
 * @param {Object} data 开始日期和结束日期对象
 */
export const getMonthDay = data => {
  let dataYue = 0
  let ms = new Date(data.end).getTime() - new Date(data.start).getTime();
  let tian = ms / 1000 / 60 / 60 / 24 + 1;
  let nian =
    new Date(data.end).getFullYear() - new Date(data.start).getFullYear();
  let yue =
    new Date(data.end).getMonth() + 1 - (new Date(data.start).getMonth() + 1);
  let ri = new Date(data.end).getDate() - new Date(data.start).getDate();
  if (nian > 0) {
    dataYue += 12;
  }
  dataYue += yue;
  if (ri > 0) {
    dataYue += 1;
  }
  return { dataYue, tian }
}
/**
 * 前后20年
 */
export const getYearsSelect = () => {
  let date = new Date();
  let years = []
  for (let i = 0; i < 11; i++)  years.push(date.getFullYear() - (11 - i));
  years.push(date.getFullYear());
  for (let i = 0; i < 5; i++) years.push(date.getFullYear() + 1 + i);
  return years.reverse();
}
/**
 * 前五年后四年
 */
export const getYearsSelectTen = () => {
  let date = new Date();
  let years = []
  for (let i = 0; i < 5; i++)  years.push(date.getFullYear() - (5 - i));
  years.push(date.getFullYear());
  for (let i = 0; i < 4; i++) years.push(date.getFullYear() + 1 + i);
  return years;
}
/* 日期默认(补零) */
export const getTimeZeroFill = () => {
  let date = new Date()
  let nian = date.getFullYear()
  let yue = date.getMonth() + 1
  let ri = date.getDate()
  if (yue <= 9) {
    yue = `0${yue}`
  }
  if (ri <= 9) {
    ri = `0${ri}`
  }
  return [`${nian - 5}-01-01`, `${nian}-${yue}-${ri}`]
}