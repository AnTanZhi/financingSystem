import request from '@/utils/request'
export default {
  /* 数值类型 */
  getIndexValueType() {
    return request({
      url: 'financing/homePage/indexValueType',
      method: 'GET'
    })
  },
}