import request from '@/utils/request'
export default {
  /* 添加管理参数 */
  addManagementParameters(data) {
    return request({
      url: 'financing/rongzi/saveOrUpdateRongzi',
      method: 'POST',
      data
    })
  },
  /* 融资管理详细 */
  getFinancingInfo(id) {
    return request({
      url: `financing/rongzi/queryEntityInfoById/${id}`,
      method: 'GET'
    })
  },
  /* 获取融资管理 */
  getFinancing(params) {
    return request({
      url: `financing/rongzi/getByPage`,
      method: 'GET',
      params
    })
  },
  /* 删除融资管理 */
  delFinancing(data) {
    return request({
      url: `financing/rongzi/delete/{ids}`,
      method: 'DELETE',
      data
    })
  },
}