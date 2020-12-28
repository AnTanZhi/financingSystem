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
}