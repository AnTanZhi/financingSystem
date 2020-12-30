<template>
  <div class="view-container bg-gray">
    <div class="border-card">
      <header class="view-header" style="margin-bottom:0px !important">
        <div class="header-container">
          <el-form :inline="true" :model="selectParams" class="demo-form-inline">
            <div style="display:flex;justify-content: space-between;">
              <div style="width: 52%;">
                <el-form-item>
                  <LeiXing v-model="copyRzlxmc" style="width:230px" @change="setCopyRzlxmc" />
                </el-form-item>
                <el-form-item>
                  <div style="display:flex;">
                    <el-select v-model="selectParams.queryType" clearable style="width:120px">
                      <el-option value="金融机构" label="金融机构" />
                      <el-option value="融资主体" label="融资主体" />
                      <el-option value="债务名称" label="债务名称" />
                    </el-select>
                    <span v-text="`:`" style="font-size:.2rem;margin-left:.125rem;margin-right:.125rem" />
                    <el-input v-model="selectParams.queryContent" clearable style="width:150px" @input="getTablData" />
                  </div>
                </el-form-item>
                <el-form-item>
                  <BiZhong v-model="selectParams.bz" style="width:90px" @change="getTablData" />
                </el-form-item>
                <el-button type="primary" :icon="!isShow?'el-icon-s-grid':'el-icon-menu'"
                  @click="()=>this.isShow=!this.isShow">
                  {{isShow?'收起':'展开'}}</el-button>
                <div v-if="isShow">
                  <el-form-item>
                    <GongSi v-model="selectParams.suoshugs" style="width:110px" @change="getTablData" />
                  </el-form-item>
                  <el-form-item>
                    <el-select v-model="selectParams.jieqing" placeholder="是否结清" clearable style="width:110px"
                      @change="getTablData">
                      <el-option label="是" value="1" />
                      <el-option label="否" value="0" />
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <KeShi v-model="selectParams.zrks" style="width:110px" @change="getTablData" />
                  </el-form-item>
                  <el-form-item>
                    <el-date-picker v-model="selectTime" type="daterange" range-separator="~" start-placeholder="贷款日期"
                      end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" style="width:240px" @change="setTime" />
                  </el-form-item>
                </div>
              </div>
              <div style="text-align: end;">
                <el-form-item>
                  <ShangChuan v-model="fujian" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" icon="el-icon-download">模板下载</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" icon="el-icon-document-checked">导出</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" icon="el-icon-plus"
                    @click="()=> this.$router.push({path:'/rongZiGuanLi/guanLiAdd',query:{pageIndex:this.selectParams.pageIndex,pageSize:this.selectParams.pageSize}})">
                    添加
                  </el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger" icon="el-icon-delete" @click="delS">删除选中</el-button>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </header>
      <section class="table-container view-section">
        <el-table :header-cell-style="{background:'#F0FAFF',color:'#787878'}" border stripe v-loading="loading"
          element-loading-text="加载中，请稍候……" :data="tableData" tooltip-effect="dark" style="width: 100%"
          @selection-change="handleSelectionChange" :summary-method="getSummaries" show-summary>
          <el-table-column type="selection" width="40" align="center" />
          <el-table-column label="融资主体" prop="rzztName" width="260" show-overflow-tooltip />
          <el-table-column label="金融机构" prop="jinRongJiGou" width="260" show-overflow-tooltip />
          <el-table-column label="债务名称" width="350" prop="zwmc" show-overflow-tooltip>
            <template slot-scope="s">
              <el-link type="primary" :underline="false" @click="getFinancingInfo(s.row.id)">{{s.row.zwmc}}</el-link>
            </template>
          </el-table-column>
          <el-table-column label="贷款日期" prop="dkrqq" width="100" :formatter="setDkrqq" />
          <el-table-column label="贷款日期止" prop="dkrqz" width="100" :formatter="setDkrqz" />
          <el-table-column label="贷款期限(月)" prop="qxy" width="110" align="center" />
          <el-table-column label="授信金额(万元)" prop="sxje" width="180" align="right"
            :formatter="row=>Number(row.sxje).toFixed(6)" />
          <el-table-column label="放款金额(万元)" prop="dkje" width="180" align="right"
            :formatter="row=>Number(row.dkje).toFixed(6)" />
          <el-table-column label="本期余额(万元)" width="180" align="right" :formatter="row=>Number(row.dkje).toFixed(6)" />
          <el-table-column label="利率(%)" prop="lilvRate" align="right" />
          <el-table-column label="综合成本(%)" prop="ptlvRate" width="110" align="right" />
          <el-table-column label="币种" prop="bzName" align="center" width="70" />
          <el-table-column label="责任人" prop="zrrName" width="100" show-overflow-tooltip align="center" />
          <el-table-column label="是否结清" prop="jieqingmc" align="center" />
          <el-table-column label="结清操作" />
          <el-table-column width="80" label="操作" align="center" fixed="right">
            <template slot-scope="s">
              <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                <i class="el-icon-edit-outline edit-btn" @click="goUpd(s.row.id)" />
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                <i class="el-icon-delete edit-btn" @click="publicDel('delFinancing', [s.row.id])" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </section>
      <el-pagination style="text-align: end;" background @size-change="publicSizeSelect"
        @current-change="publicPageSelect" :current-page="selectParams.pageIndex" :page-sizes="[10, 20, 50, 100]"
        :page-size="selectParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- 详细弹出框 -->
    <!-- <el-dialog title="贷款单详细" :visible.sync="loanNoteDia">
      <el-form :model="addOrUpdParams.rongZiEntityInfo" ref="addOrUpdParams" label-width="150px" class="demo-ruleForm"
        :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="合同编号：">
              <el-input v-model="addOrUpdParams.rongZiEntityInfo.dkdbhs" style="width:33%" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="债务名称：" prop="zwmc">
              <el-input v-model="addOrUpdParams.rongZiEntityInfo.zwmc" style="width:33%" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="还款账号：">
              <el-input v-model="addOrUpdParams.rongZiEntityInfo.hkzh" style="width:33%" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="还款银行：">
              <el-input v-model="addOrUpdParams.rongZiEntityInfo.hkyh" style="width:33%" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属公司：">
              <GongSi v-model="addOrUpdParams.rongZiEntityInfo.suoshugs" style="width:33%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="融资主体：">
              <ZhuTi v-model="addOrUpdParams.rongZiEntityInfo.rzzt" style="width:33%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="贷款日期起：" prop="dkrqq">
              <el-date-picker v-model="addOrUpdParams.rongZiEntityInfo.dkrqq" type="date" placeholder="选择日期"
                style="width:33%" format="yyyy-MM-dd" value-format="yyyy-MM-dd HH:mm:ss" @change="loanDateVerification">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="贷款日期止：" prop="dkrqz">
              <el-date-picker v-model="addOrUpdParams.rongZiEntityInfo.dkrqz" type="date" placeholder="选择日期"
                style="width:33%" format="yyyy-MM-dd" value-format="yyyy-MM-dd HH:mm:ss" @change="loanDateVerification">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="融资类型：">
              <LeiXing v-model="addOrUpdParams.rongZiEntityInfo.rzlxmc" style="width:33%" :isMultiple="false" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="签订日期：" prop="qdrq">
              <el-date-picker v-model="addOrUpdParams.rongZiEntityInfo.qdrq" type="date" style="width:33%"
                placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd HH:mm:ss" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="期限(天)：">
              <span>{{deadlineTian}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="期限(月)：">
              <span>{{deadlineYue}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="币种：">
              <BiZhong v-model="addOrUpdParams.rongZiEntityInfo.bz" style="width:33%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="贷款周期固定：">
              <el-checkbox v-model="addOrUpdParams.rongZiEntityInfo.zqgd" style="width:33%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="授信金额：" prop="sxje">
              <el-input v-model="addOrUpdParams.rongZiEntityInfo.sxje" type="number" style="margin-right:20px;width:33%"
                clearable />[万元]
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="金融机构：" prop="jinRongJiGou">
              <el-input v-model="addOrUpdParams.rongZiEntityInfo.jinRongJiGou" style="width:33%" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="合同利率(%)：" prop="lilv">
              <el-input v-model="addOrUpdParams.rongZiEntityInfo.lilv" type="number" style="width:33%" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="综合成本(%)：">
              <el-input v-model="addOrUpdParams.rongZiEntityInfo.ptlv" style="width:33%" type="number" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="付息频率：">
              <PinLv v-model="addOrUpdParams.rongZiEntityInfo.hkplmc" style="width:33%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="付息日：" prop="hkr">
              <el-input v-model="addOrUpdParams.rongZiEntityInfo.hkr" style="width:33%" type="number" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="首次付息日期：" prop="schkrq">
              <el-date-picker v-model="addOrUpdParams.rongZiEntityInfo.schkrq" type="date" style="width:33%"
                placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="可续贷：">
              <el-checkbox v-model="addOrUpdParams.rongZiEntityInfo.kxd" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="本金还款方式：" prop="bjhkfsmc">
              <HuanKuanFangShi v-model="addOrUpdParams.rongZiEntityInfo.bjhkfsmc" style="width:33%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="利息还款方式：" prop="lxhkfsmc">
              <LiXiHuanKuanFangShi v-model="addOrUpdParams.rongZiEntityInfo.lxhkfsmc" style="width:33%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="担保方式：">
              <el-checkbox v-model="addOrUpdParams.rongZiEntityInfo.dsf">担保</el-checkbox>
              <el-checkbox v-model="addOrUpdParams.rongZiEntityInfo.dy">抵质押</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="还款模式：">
              <MoShi v-model="addOrUpdParams.rongZiEntityInfo.hkModel" style="width:33%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="addOrUpdParams.rongZiEntityInfo.dsf">
          <el-col :span="4">
            <el-form-item label="担保方：">
              <el-input v-model="addOrUpdParams.rongZiEntityInfo.dbrmc" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="担保协议号：">
              <el-input v-model="addOrUpdParams.rongZiEntityInfo.dbxyh" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="征信报告：">
              <BaoGao v-model="addOrUpdParams.rongZiEntityInfo.dbrmczx" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="addOrUpdParams.rongZiEntityInfo.dsf">
          <el-col :span="4">
            <el-form-item label="担保方2：">
              <el-input v-model="addOrUpdParams.rongZiEntityInfo.dbrmc2" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="担保协议号：">
              <el-input v-model="addOrUpdParams.rongZiEntityInfo.dbxyh2" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="征信报告：">
              <BaoGao v-model="addOrUpdParams.rongZiEntityInfo.dbrmczx2" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="保证金(万元)：">
              <el-input v-model="addOrUpdParams.rongZiEntityInfo.bzj" type="number" style="width:33%" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手续费(万元)：">
              <el-input v-model="addOrUpdParams.rongZiEntityInfo.sxf" type="number" style="width:33%" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="监管账户：">
              <el-input v-model="addOrUpdParams.rongZiEntityInfo.jianGuanZhangHu" style="width:33%" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="监管银行：">
              <el-input v-model="addOrUpdParams.rongZiEntityInfo.jianGuanYinHang" style="width:33%" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="责任人：">
              <ZeRenRen v-model="addOrUpdParams.rongZiEntityInfo.zrr" style="width:33%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="责任科室：">
              <KeShi v-model="addOrUpdParams.rongZiEntityInfo.zrks" style="width:33%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注：">
              <el-input type="textarea" :rows="3" v-model="addOrUpdParams.rongZiEntityInfo.bzcontext">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider content-position="left">
          <span style="color: #666666;font-weight: 900;font-size: 1.2em">放款金额</span>
        </el-divider>
        <el-row v-for="item in addOrUpdParams.rongziFangdais" :key="item.rongziFangdaisKey">
          <el-col :span="4">
            <el-form-item label="放款金额(万元) *：">
              <el-input type="number" v-model="item.efkjy" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="放款时间 *：">
              <el-date-picker v-model="item.efksj" type="date" placeholder="选择日期" format="yyyy-MM-dd"
                value-format="yyyy-MM-dd HH:mm:ss" style="width:140%" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="放款利率 *：">
              <el-input type="number" v-model="item.efkll" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="手续费(万元) *：">
              <el-input type="number" v-model="item.sxf" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="保证金(万元) *：">
              <el-input type="number" v-model="item.bzj" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-button type="success" icon="el-icon-plus" circle size="mini" @click="addLoanAmount" />
              <el-button type="danger" icon="el-icon-minus" circle size="mini" @click="delLoanAmount" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider content-position="left">
          <span style="color: #666666;font-weight: 900;font-size: 1.2em">资金使用情况登记表</span>
        </el-divider>
        <el-row v-for="item in addOrUpdParams.rongziTicords" :key="item.rongziTicordsKey">
          <el-col :span="5">
            <el-form-item label="提款金额(万元)：">
              <el-input type="number" v-model="item.tiMoney" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="提款银行：">
              <el-input v-model="item.tiBlank" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="提款账户：">
              <el-input v-model="item.tiAccount" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="日期：">
              <el-date-picker v-model="item.tiTime" type="date" placeholder="选择日期" format="yyyy-MM-dd"
                value-format="yyyy-MM-dd HH:mm:ss" style="100%" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-button type="success" icon="el-icon-plus" circle size="mini" @click="addFunds" />
              <el-button type="danger" icon="el-icon-minus" circle size="mini" @click="delFunds" />
            </el-form-item>
          </el-col>
        </el-row>
        <div v-if="addOrUpdParams.rongZiEntityInfo.kxd">
          <el-divider content-position="left">
            <span style="color: #666666;font-weight: 900;font-size: 1.2em">续贷</span>
          </el-divider>
          <el-row v-for="item in addOrUpdParams.rongziXudais" :key="item.rongziXudaisKey">
            <el-col :span="6">
              <el-form-item label="续贷金额(万元)：">
                <el-input type="number" v-model="item.efkjy" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="续贷开始：">
                <el-date-picker v-model="item.efksj" type="date" placeholder="选择日期" format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd HH:mm:ss" style="100%" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="续贷结束：">
                <el-date-picker v-model="item.ejzsj" type="date" placeholder="选择日期" format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd HH:mm:ss" style="100%" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item>
                <el-button type="success" icon="el-icon-plus" circle size="mini" @click="addRenew" />
                <el-button type="danger" icon="el-icon-minus" circle size="mini" @click="delRenew" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div v-if="addOrUpdParams.rongZiEntityInfo.dy">
          <el-divider content-position="left">
            <span style="color: #666666;font-weight: 900;font-size: 1.2em">抵质押物</span>
          </el-divider>
          <el-row v-for="item in addOrUpdParams.rongziDiyawus" :key="item.rongziDiyawusKey">
            <el-row>
              <el-col :span="5">
                <el-form-item label="抵质押物类型：">
                  <DiZhiYaLeiXing v-model="item.zclb" />
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="证件编号：">
                  <el-input v-model="item.zjbh" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="抵质押物名称 *：" class="dzyName">
                  <el-input v-model="item.zcmc" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="土地证号：">
                  <el-input v-model="item.dkh" clearable />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="抵质押日期起：">
                  <el-date-picker v-model="item.dyrq" type="date" placeholder="选择日期" format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd HH:mm:ss" style="100%" />
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="抵质押日期止：">
                  <el-date-picker v-model="item.dyrqz" type="date" placeholder="选择日期" format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd HH:mm:ss" style="100%" />
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="抵质押金额(万元)：">
                  <el-input type="number" v-model="item.dyje" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item>
                  <el-button type="success" icon="el-icon-plus" circle size="mini" @click="addCollateral" />
                  <el-button type="danger" icon="el-icon-minus" circle size="mini" @click="delCollateral" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-row>
        </div>
      </el-form>
      <el-dialog width="30%" title="放款金额编辑" :visible.sync="loanAmountDia" append-to-body>
      </el-dialog>
    </el-dialog> -->
  </div>
</template>

<script>
import publicMixin from "@/mixin/publicMixin";
import LeiXing from "@/myComponents/LeiXing";
import BiZhong from "@/myComponents/BiZhong";
import GongSi from "@/myComponents/GongSi";
import KeShi from "@/myComponents/KeShi";
import ShangChuan from "@/myComponents/ShangChuan";
import { isNull, tableTotal } from "@/utils/utils";
import guanLi from "@/api/guanLi";
export default {
  data() {
    return {
      /* 上传附件 */
      fujian: "",
      /* 查询参数 */
      selectParams: {
        pageIndex: Number(this.$route.query.pageIndex) || 1,
        pageSize: Number(this.$route.query.pageSize) || 10,
      },
      /* mixin参数 */
      mixinParams: {
        api: guanLi,
        name: "getFinancing",
      },
      /* 添加/修改参数 */
      addOrUpdateParams: {},
      /* 校验 */
      rules: {
        pname: [
          { required: true, message: "请输入类型名称", trigger: "blur" },
          { max: 25, message: "长度在最多到 25 个字符", trigger: "blur" },
        ],
      },
      /* 删除参数 */
      ids: [],
      /* 是否展示更多搜索框 */
      isShow: false,
      /* 查询框时间 */
      selectTime: "",
      /* 贷款单详细 */
      loanNoteDia: false,
      /* 放款金额编辑 */
      loanAmountDia: false,
      /* 融资详细 */
      financingInfo: {},
      /* 融资类型第三变量 */
      copyRzlxmc: "",
    };
  },
  methods: {
    /* 融资第三变量赋值 */
    setCopyRzlxmc(val) {
      if (!isNull(val)) this.selectParams.rzlxmc = val.join(",");
      else this.selectParams.rzlxmc = "";
      this.getTablData();
    },
    /* 融资详细 */
    getFinancingInfo(id) {
      guanLi.getFinancingInfo(id).then((res) => {
        this.financingInfo = res.data;
        this.loanNoteDia = true;
      });
    },
    /* 表格合计 */
    getSummaries(param) {
      return tableTotal(param, this.total, [
        "授信金额(万元)",
        "放款金额(万元)",
        "本期余额(万元)",
      ]);
    },
    /* 初始化贷款日期止 */
    setDkrqz(row) {
      if (String(row.dkrqz) == "null") return "";
      else return String(row.dkrqz).substring(0, 10);
    },
    /* 初始化贷款日期 */
    setDkrqq(row) {
      if (String(row.dkrqq) == "null") return "";
      else return String(row.dkrqq).substring(0, 10);
    },
    /* 初始化时间参数 */
    setTime(val) {
      if (isNull(val)) {
        this.selectParams.dkrqq = "";
        this.selectParams.dkrqz = "";
      } else {
        this.selectParams.dkrqq = val[0];
        this.selectParams.dkrqz = val[1];
      }
      this.getTablData();
    },
    /* 删除(多个) */
    delS() {
      if (this.ids == "") {
        this.$message.error("请至少选择一条数据");
        return;
      }
      this.publicDel("delFinancing", this.ids);
    },
    /* 修改前置 */
    goUpd(id) {
      this.$router.push({
        path: "/rongZiGuanLi/guanLiAdd",
        query: { id },
      });
    },
    /* 添加融资主体 */
    addLeiXing() {
      if (this.publicRules("addOrUpdateParams")) {
        this.publicAdd("addFinancingBody", this.addOrUpdateParams, "");
      }
    },
    /* 添加前置 */
    goAdd() {},
    handleSelectionChange(val) {
      this.ids = [];
      this.ids = val.map((v) => v.id);
    },
    /* 获取表格数据 */
    getTablData() {
      this.publicSelect();
    },
  },
  mounted() {
    /* 获取表格数据 */
    this.getTablData();
  },
  components: { LeiXing, BiZhong, GongSi, KeShi, ShangChuan },
  mixins: [publicMixin],
};
</script>

<style lang="scss">
.el-dialog {
  .el-dialog__header {
    .el-dialog__title {
      margin-left: 0.25rem;
    }
  }
}
</style>