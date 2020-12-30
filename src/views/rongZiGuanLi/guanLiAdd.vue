<template>
  <div class="view-container bg-gray">
    <div class="border-card">
      <div class="title">融资信息</div>
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
        <!-- 放款金额代码块 -->
        <el-divider content-position="left">
          <div style="display:flex;align-items:center">
            <span style="color: #666666;font-weight: 900;font-size: 1.2em">放款金额</span>
            <el-button type="success" icon="el-icon-edit" circle size="mini" @click="addCollateral"
              style="margin-left:10px" v-if="this.$route.query.id" />
          </div>
        </el-divider>
        <div v-if="!this.$route.query.id">
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
        </div>
        <el-table :header-cell-style="{background:'#F0FAFF',color:'#787878'}" border stripe
          element-loading-text="加载中，请稍候……" :data="addOrUpdParams.rongziFangdais" tooltip-effect="dark"
          style="width: 100%" v-if="this.$route.query.id">
          <el-table-column label="放款金额(万元)" :formatter="row=>Number(row.efkjy).toFixed(6)" align="right" />
          <el-table-column label="放款时间" :formatter="row=>String(row.efksj).substring(0,10)" align="center"
            width="100" />
          <el-table-column label="放款利率" :formatter="row=>Number(row.efkll).toFixed(2)+'%'" align="right" />
          <el-table-column label="手续费(万元)" :formatter="row=>Number(row.sxf).toFixed(6)" align="right" />
          <el-table-column label="保证金(万元)" :formatter="row=>Number(row.bzj).toFixed(6)" align="right" />
        </el-table>
        <el-dialog title="新沂市城市投资发展有限公司内部办公平台" :visible.sync="loanAmountDia">
          <el-form :model="loanAmountParams">
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="loanAmountDia = false">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 资金使用情况登记表代码块 -->
        <el-divider content-position="left">
          <div style="display:flex;align-items:center">
            <span style="color: #666666;font-weight: 900;font-size: 1.2em">资金使用情况登记表</span>
            <span style="color: #666666;font-weight: 900;font-size: 1.2em;margin-left:10px"
              v-if="this.$route.query.id">监管账户余额: 0.000000(万元)</span>
            <el-button type="success" icon="el-icon-edit" circle size="mini" @click="addCollateral"
              style="margin-left:10px" v-if="this.$route.query.id" />
          </div>
        </el-divider>
        <div v-if="!this.$route.query.id">
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
        </div>
        <el-table :header-cell-style="{background:'#F0FAFF',color:'#787878'}" border stripe
          element-loading-text="加载中，请稍候……" :data="addOrUpdParams.rongziTicords" tooltip-effect="dark"
          style="width: 100%" v-if="this.$route.query.id">
          <el-table-column label="提款金额(万元)" :formatter="row=>Number(row.tiMoney).toFixed(6)" align="right" />
          <el-table-column label="提款银行" prop="tiBlank" />
          <el-table-column label="提款账户" prop="tiAccount" />
          <el-table-column label="日期" :formatter="row=>String(row.tiTime).substring(0,10)" width="100" align="center" />
        </el-table>
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
        <el-form-item style="text-align: center;">
          <el-button type="primary" @click="addManagementParameters">保存</el-button>
          <el-button type="primary"
            @click="()=>this.$router.push({path:'/rongZiGuanLi/guanLi',query:{pageIndex:this.$route.query.pageIndex,pageSize:this.$route.query.pageSize}})">
            返回
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import publicMixin from "@/mixin/publicMixin";
import GongSi from "@/myComponents/GongSi";
import ZhuTi from "@/myComponents/ZhuTi";
import LeiXing from "@/myComponents/LeiXing";
import BiZhong from "@/myComponents/BiZhong";
import PinLv from "@/myComponents/PinLv";
import HuanKuanFangShi from "@/myComponents/HuanKuanFangShi";
import LiXiHuanKuanFangShi from "@/myComponents/LiXiHuanKuanFangShi";
import MoShi from "@/myComponents/MoShi";
import BaoGao from "@/myComponents/BaoGao";
import ZeRenRen from "@/myComponents/ZeRenRen";
import KeShi from "@/myComponents/KeShi";
import guanLi from "@/api/guanLi";
import { isNull } from "@/utils/utils";
import DiZhiYaLeiXing from "@/myComponents/DiZhiYaLeiXing";
export default {
  data() {
    return {
      /* 添加/修改参数 */
      addOrUpdParams: {
        rongZiEntityInfo: {
          dkrqq: "",
          dkrqz: "",
        },
        rongziFangdais: [
          {
            efkjy: "",
            efksj: "",
            efkll: "",
            sxf: "",
            bzj: "",
            rongziFangdaisKey: "rongziFangdais",
          },
        ],
        rongziTicords: [
          {
            tiMoney: "",
            tiBlank: "",
            tiAccount: "",
            tiTime: "",
            rongziTicordsKey: "rongziTicords",
          },
        ],
        rongziXudais: [
          {
            efkjy: "",
            efksj: "",
            ejzsj: "",
            rongziXudaisKey: "rongziXudais",
          },
        ],
        rongziDiyawus: [
          {
            rongziDiyawusKey: "rongziDiyawus",
            zcmc: "",
            zclb: "",
            zjbh: "",
            dkh: "",
            dyrq: "",
            dyrqz: "",
            dyje: "",
          },
        ],
      },
      /* 添加/修改校验 */
      rules: {
        zwmc: [{ required: true, message: "请输入债务名称", trigger: "blur" }],
        qdrq: [
          {
            required: true,
            message: "请选择签订日期",
            trigger: "change",
          },
        ],
        sxje: [{ required: true, message: "请输入授信金额", trigger: "blur" }],
        jinRongJiGou: [
          { required: true, message: "请输入金融机构", trigger: "blur" },
        ],
        lilv: [{ required: true, message: "请输入合同利率", trigger: "blur" }],
        hkr: [{ required: true, message: "请输入付息日", trigger: "blur" }],
        schkrq: [
          {
            required: true,
            message: "请选择首次付息日期",
            trigger: "change",
          },
        ],
        bjhkfsmc: [
          { required: true, message: "请选择本金还款方式", trigger: "change" },
        ],
        lxhkfsmc: [
          { required: true, message: "请选择利息还款方式", trigger: "change" },
        ],
        dkrqq: [
          {
            required: true,
            message: "请选择贷款日期",
            trigger: "change",
          },
        ],
        dkrqz: [
          {
            required: true,
            message: "请选择贷款日期止",
            trigger: "change",
          },
        ],
      },
      /* 期限(天) */
      deadlineTian: 0,
      /* 期限(月) */
      deadlineYue: 0,
      /* mixin参数 */
      mixinParams: {
        api: guanLi,
      },
      /* 放款金额对话框 */
      loanAmountDia: false,
      /* 放款金额参数 */
      loanAmountParams: {},
    };
  },
  methods: {
    /*  */
    /* 删除抵质押物 */
    delCollateral() {
      if (this.addOrUpdParams.rongziDiyawus.length == 1) {
        this.$message.error("至少保留一个");
        return;
      }
      this.addOrUpdParams.rongziDiyawus.pop();
    },
    /* 添加抵质押物 */
    addCollateral() {
      this.addOrUpdParams.rongziDiyawus.push({
        zclb: "",
        zjbh: "",
        dkh: "",
        dyrq: "",
        dyrqz: "",
        dyje: "",
      });
    },
    /* 删除续贷 */
    delRenew() {
      if (this.addOrUpdParams.rongziXudais.length == 1) {
        this.$message.error("至少保留一个");
        return;
      }
      this.addOrUpdParams.rongziXudais.pop();
    },
    /* 添加续贷 */
    addRenew() {
      this.addOrUpdParams.rongziXudais.push({
        eFkjy: "",
        eFksj: "",
        eJzsj: "",
      });
    },
    /* 删除记录使用情况 */
    delFunds() {
      if (this.addOrUpdParams.rongziTicords.length == 1) {
        this.$message.error("至少保留一个");
        return;
      }
      this.addOrUpdParams.rongziTicords.pop();
    },
    /* 添加记录使用情况 */
    addFunds() {
      this.addOrUpdParams.rongziTicords.push({
        tiMoney: "",
        tiBlank: "",
        tiAccount: "",
        tiTime: "",
      });
    },
    /* 删除放款金额 */
    delLoanAmount() {
      if (this.addOrUpdParams.rongziFangdais.length == 1) {
        this.$message.error("至少保留一个");
        return;
      }
      this.addOrUpdParams.rongziFangdais.pop();
    },
    /* 添加放款金额 */
    addLoanAmount() {
      this.addOrUpdParams.rongziFangdais.push({
        eFkjy: "",
        eFksj: "",
        eFkll: "",
        sxf: "",
        bzj: "",
      });
    },
    /* 添加管理参数 */
    addManagementParameters() {
      if (this.publicRules("addOrUpdParams")) {
        let start = this.addOrUpdParams.rongZiEntityInfo.dkrqq;
        let end = this.addOrUpdParams.rongZiEntityInfo.dkrqz;
        for (let i of this.addOrUpdParams.rongziDiyawus) {
          if (
            (i.zcmc == "" || i.zcmc == null) &&
            this.addOrUpdParams.rongZiEntityInfo.dy
          ) {
            this.$message.error("抵质押物名称为必填");
            return;
          }
        }
        if (start >= end) {
          this.$message.error("贷款日期止必须大于贷款日期");
          return;
        }
        this.addOrUpdParams.rongZiEntityInfo.dkrqz = this.addOrUpdParams.rongZiEntityInfo.dkrqz.substring(
          0,
          10
        );
        this.addOrUpdParams.rongZiEntityInfo.qx = this.deadlineTian;
        this.addOrUpdParams.rongZiEntityInfo.qxy = this.deadlineYue;
        this.addOrUpdParams.rongZiEntityInfo.dkrqz += " 23:59:59";
        this.addOrUpdParams.rongZiEntityInfo.dsf = this.addOrUpdParams
          .rongZiEntityInfo.dsf
          ? 1
          : 0;
        this.addOrUpdParams.rongZiEntityInfo.dy = this.addOrUpdParams
          .rongZiEntityInfo.dy
          ? 1
          : 0;
        this.addOrUpdParams.rongZiEntityInfo.zqgd = this.addOrUpdParams
          .rongZiEntityInfo.zqgd
          ? 1
          : 0;
        this.addOrUpdParams.rongZiEntityInfo.kxd = this.addOrUpdParams
          .rongZiEntityInfo.kxd
          ? 1
          : 0;
        for (let i of this.addOrUpdParams.rongziFangdais) {
          if (isNull(i.efkjy)) {
            this.$message.error("放款金额不能为空");
            return;
          }
          if (isNull(i.efksj)) {
            this.$message.error("放款时间不能为空");
            return;
          }
          if (isNull(i.efkll)) {
            this.$message.error("放款利率不能为空");
            return;
          }
          if (isNull(i.sxf)) {
            this.$message.error("手续费不能为空");
            return;
          }
          if (isNull(i.bzj)) {
            this.$message.error("保证金额不能为空");
            return;
          }
        }
        this.addOrUpdParams.rongziTicords.forEach((item, index) => {
          if (isNull(item.tiMoney)) {
            if (isNull(item.tiBlank)) {
              if (isNull(item.tiAccount)) {
                if (isNull(item.tiTime)) {
                  this.addOrUpdParams.rongziTicords[index] = null;
                }
              }
            }
          }
        });
        let data = [];
        this.addOrUpdParams.rongziTicords.forEach((item, index) => {
          if (item != null) {
            data.push(item);
          }
        });
        this.addOrUpdParams.rongziTicords = data;
        let url = {
          path: "/rongZiGuanLi/guanLi",
          query: "",
        };
        this.publicAdd(
          "addManagementParameters",
          this.addOrUpdParams,
          url,
          false
        );
      }
    },
    /* 贷款日期止校验 */
    loanDateVerification() {
      let [start, end] = [
        this.addOrUpdParams.rongZiEntityInfo.dkrqq,
        this.addOrUpdParams.rongZiEntityInfo.dkrqz,
      ];
      if (start != "" && start != null && end != "" && end != null) {
        if (start >= end) {
          this.$message.error("贷款日期止必须大于贷款日期");
          return false;
        } else {
          let dataYue = 0;
          let ms = new Date(end).getTime() - new Date(start).getTime();
          let tian = ms / 1000 / 60 / 60 / 24 + 1;
          this.deadlineTian = tian;
          let nian =
            new Date(end).getFullYear() - new Date(start).getFullYear();
          let yue =
            new Date(end).getMonth() + 1 - (new Date(start).getMonth() + 1);
          let ri = new Date(end).getDate() - new Date(start).getDate();
          if (nian > 0) {
            dataYue += 12;
          }
          dataYue += yue;
          if (ri > 0) {
            dataYue += 1;
          }
          this.deadlineYue = dataYue;
        }
      }
    },
    /* 融资详细 */
    financingInfo() {
      guanLi.getFinancingInfo(this.$route.query.id).then((res) => {
        res.data.rongZiEntityInfo.zqgd =
          res.data.rongZiEntityInfo.zqgd == 1 ? true : false;
        res.data.rongZiEntityInfo.kxd =
          res.data.rongZiEntityInfo.kxd == 1 ? true : false;
        res.data.rongZiEntityInfo.dsf =
          res.data.rongZiEntityInfo.dsf == 1 ? true : false;
        res.data.rongZiEntityInfo.dy =
          res.data.rongZiEntityInfo.dy == 1 ? true : false;
        res.data.rongZiEntityInfo.bjhkfsmc += "";
        res.data.rongZiEntityInfo.lxhkfsmc += "";
        res.data.rongZiEntityInfo.hkplmc += "";
        res.data.rongZiEntityInfo.zrr += "";
        res.data.rongZiEntityInfo.hkModel += "";
        this.deadlineTian = res.data.rongZiEntityInfo.qx;
        this.deadlineYue = res.data.rongZiEntityInfo.qxy;
        this.addOrUpdParams = res.data;
      });
    },
  },
  mounted() {
    if (this.$route.query.id) this.financingInfo();
  },
  components: {
    GongSi,
    ZhuTi,
    LeiXing,
    BiZhong,
    PinLv,
    HuanKuanFangShi,
    LiXiHuanKuanFangShi,
    MoShi,
    BaoGao,
    ZeRenRen,
    KeShi,
    DiZhiYaLeiXing,
  },
  mixins: [publicMixin],
};
</script>

<style lang="scss" scoped>
.title {
  height: 35px;
  line-height: 35px;
  font-size: 14px;
  font-weight: bold;
  padding-left: 15px;
  color: #5a5a5a;
  border: 1px solid #ccc;
  box-shadow: inset 0 0 0px 1px #fff;
  border-radius: 4px 4px 0 0;
  background: #f5f5f5;
  margin-bottom: 20px;
}
</style>