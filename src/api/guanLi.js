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
  /* 添加/修改放款 */
  setLoan(data) {
    return request({
      url: `financing/rongziFangdai/addOrUpdateEntity`,
      method: 'POST',
      data
    })
  },
  /* 放款详细 */
  loanInfo(id) {
    return request({
      url: `financing/rongziFangdai/getEntityById/${id}`,
      method: 'GET'
    })
  },
  /* 放款删除 */
  delLoan(data) {
    return request({
      url: `financing/rongziFangdai/delete/{ids}`,
      method: 'DELETE',
      data
    })
  },
  /* 放款金额表格 */
  getLoan(params) {
    return request({
      url: `financing/rongziFangdai/getByIdPageList`,
      method: 'GET',
      params
    })
  },
  /* 资金使用记录表格 */
  getFundRecords(params) {
    return request({
      url: `financing/rongziTicord/getByIdPageList`,
      method: 'GET',
      params
    })
  },
  /* 添加/修改资金使用记录 */
  setFundRecords(data) {
    return request({
      url: `financing/rongziTicord/saveOrUpdateTiCode`,
      method: 'POST',
      data
    })
  },
  /* 资金使用记录详细 */
  getFundRecordsInfo(id) {
    return request({
      url: `financing/rongziTicord/getTiCodeEntityById/${id}`,
      method: 'GET',
    })
  },
  /* 删除资金使用记录 */
  delFundRecords(data) {
    return request({
      url: `financing/rongziTicord/deleteEntity/{id}`,
      method: 'DELETE',
      data
    })
  },
}