<template>
  <div class="view-container bg-gray">
    <div class="border-card">
      <div class="title">融资信息</div>
      <el-form
        :model="addOrUpdParams"
        ref="addOrUpdParams"
        label-width="150px"
        class="demo-ruleForm"
        :rules="rules"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="合同编号：">
              <el-input
                v-model="addOrUpdParams.dkdbhs"
                style="width:33%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="债务名称："
              prop="zwmc"
            >
              <el-input
                v-model="addOrUpdParams.zwmc"
                style="width:33%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="还款账号：">
              <el-input
                v-model="addOrUpdParams.hkzh"
                style="width:33%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="还款银行：">
              <el-input
                v-model="addOrUpdParams.hkyh"
                style="width:33%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属公司：">
              <GongSi
                v-model="addOrUpdParams.suoshugs"
                style="width:33%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="融资主体：">
              <ZhuTi
                v-model="addOrUpdParams.rzzt"
                style="width:33%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="贷款日期起："
              prop="dkrqq"
            >
              <el-date-picker
                v-model="addOrUpdParams.dkrqq"
                type="date"
                placeholder="选择日期"
                style="width:33%"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                @change="loanDateVerification"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="贷款日期止："
              prop="dkrqz"
            >
              <el-date-picker
                v-model="addOrUpdParams.dkrqz"
                type="date"
                placeholder="选择日期"
                style="width:33%"
                @change="loanDateVerification"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="融资类型：">
              <LeiXing
                v-model="addOrUpdParams.rzlxmc"
                style="width:33%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="签订日期："
              prop="qdrq"
            >
              <el-date-picker
                v-model="addOrUpdParams.qdrq"
                type="date"
                style="width:33%"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              />
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
              <BiZhong
                v-model="addOrUpdParams.bz"
                style="width:33%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="贷款周期固定：">
              <el-checkbox
                v-model="addOrUpdParams.zqgd"
                style="width:33%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="授信金额："
              prop="sxje"
            >
              <el-input
                v-model="addOrUpdParams.sxje"
                type="number"
                style="margin-right:20px;width:33%"
              />[万元]
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="金融机构："
              prop="JinRongJiGou"
            >
              <el-input
                v-model="addOrUpdParams.JinRongJiGou"
                style="width:33%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="合同利率(%)："
              prop="lilv"
            >
              <el-input
                v-model="addOrUpdParams.lilv"
                type="number"
                style="width:33%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="综合成本(%)：">
              <el-input
                v-model="addOrUpdParams.ptlv"
                style="width:33%"
                type="number"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="付息频率：">
              <PinLv
                v-model="addOrUpdParams.hkplmc"
                style="width:33%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="付息日："
              prop="hkr"
            >
              <el-input
                v-model="addOrUpdParams.hkr"
                style="width:33%"
                type="number"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="首次付息日期："
              prop="schkrq"
            >
              <el-date-picker
                v-model="addOrUpdParams.schkrq"
                type="date"
                style="width:33%"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="可续贷：">
              <el-checkbox v-model="addOrUpdParams.kxd" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="本金还款方式："
              prop="bjhkfsmc"
            >
              <HuanKuanFangShi
                v-model="addOrUpdParams.bjhkfsmc"
                style="width:33%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="利息还款方式："
              prop="lxhkfsmc"
            >
              <LiXiHuanKuanFangShi
                v-model="addOrUpdParams.lxhkfsmc"
                style="width:33%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="担保方式：">
              <el-checkbox v-model="addOrUpdParams.dsf">担保</el-checkbox>
              <el-checkbox v-model="addOrUpdParams.dy">抵质押</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="还款模式：">
              <MoShi
                v-model="addOrUpdParams.hkModel"
                style="width:33%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="addOrUpdParams.dsf">
          <el-col :span="4">
            <el-form-item label="担保方：">
              <el-input v-model="addOrUpdParams.dbrmc" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="担保协议号：">
              <el-input v-model="addOrUpdParams.dbxyh" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="征信报告：">
              <BaoGao v-model="addOrUpdParams.dbrmczx" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="addOrUpdParams.dsf">
          <el-col :span="4">
            <el-form-item label="担保方2：">
              <el-input v-model="addOrUpdParams.dbrmc2" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="担保协议号：">
              <el-input v-model="addOrUpdParams.dbxyh2" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="征信报告：">
              <BaoGao v-model="addOrUpdParams.dbrmczx2" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="保证金(万元)：">
              <el-input
                v-model="addOrUpdParams.bzj"
                type="number"
                style="width:33%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手续费(万元)：">
              <el-input
                v-model="addOrUpdParams.sxf"
                type="number"
                style="width:33%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="监管账户：">
              <el-input
                v-model="addOrUpdParams.jianGuanZhangHu"
                style="width:33%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="监管银行：">
              <el-input
                v-model="addOrUpdParams.jianGuanYinHang"
                style="width:33%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="责任人：">
              <ZeRenRen
                v-model="addOrUpdParams.zrr"
                style="width:33%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="责任科室：">
              <KeShi
                v-model="addOrUpdParams.zrks"
                style="width:33%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注：">
              <el-input
                type="textarea"
                :rows="3"
                v-model="addOrUpdParams.bzcontext"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider content-position="left">
          <span style="color: #666666;font-weight: 900;font-size: 1.2em">放款金额</span>
        </el-divider>
        <el-row
          v-for="item in addOrUpdParams.rongziFangdais"
          :key="item.rongziFangdaisKey"
        >
          <el-col :span="4">
            <el-form-item label="放款金额(万元)：">
              <el-input
                type="number"
                v-model="item.eFkjy"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="放款时间：">
              <el-date-picker
                v-model="item.eFksj"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                style="width:140%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="放款利率：">
              <el-input
                type="number"
                v-model="item.eFkll"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="手续费(万元)：">
              <el-input
                type="number"
                v-model="item.sxf"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="保证金(万元)：">
              <el-input
                type="number"
                v-model="item.bzj"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-button
                type="success"
                icon="el-icon-plus"
                circle
                size="mini"
                @click="addLoanAmount"
              />
              <el-button
                type="danger"
                icon="el-icon-minus"
                circle
                size="mini"
                @click="delLoanAmount"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider content-position="left">
          <span style="color: #666666;font-weight: 900;font-size: 1.2em">资金使用情况登记表</span>
        </el-divider>
        <el-row
          v-for="item in addOrUpdParams.rongziTicords"
          :key="item.rongziTicordsKey"
        >
          <el-col :span="5">
            <el-form-item label="提款金额(万元)：">
              <el-input
                type="number"
                v-model="item.tiMoney"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="提款银行：">
              <el-input v-model="item.tiBlank" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="提款账户：">
              <el-input v-model="item.tiAccount" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="日期：">
              <el-date-picker
                v-model="item.tiTime"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                style="100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-button
                type="success"
                icon="el-icon-plus"
                circle
                size="mini"
                @click="addFunds"
              />
              <el-button
                type="danger"
                icon="el-icon-minus"
                circle
                size="mini"
                @click="delFunds"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <div v-if="addOrUpdParams.kxd">
          <el-divider content-position="left">
            <span style="color: #666666;font-weight: 900;font-size: 1.2em">续贷</span>
          </el-divider>
          <el-row
            v-for="item in addOrUpdParams.rongziXudais"
            :key="item.rongziXudaisKey"
          >
            <el-col :span="6">
              <el-form-item label="续贷金额(万元)：">
                <el-input
                  type="number"
                  v-model="item.eFkjy"
                />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="续贷开始：">
                <el-date-picker
                  v-model="item.eFksj"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  style="100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="续贷结束：">
                <el-date-picker
                  v-model="item.eJzsj"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  style="100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item>
                <el-button
                  type="success"
                  icon="el-icon-plus"
                  circle
                  size="mini"
                  @click="addRenew"
                />
                <el-button
                  type="danger"
                  icon="el-icon-minus"
                  circle
                  size="mini"
                  @click="delRenew"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div v-if="addOrUpdParams.dy">
          <el-divider content-position="left">
            <span style="color: #666666;font-weight: 900;font-size: 1.2em">抵质押物</span>
          </el-divider>
          <el-row
            v-for="item in addOrUpdParams.rongziDiyawus"
            :key="item.rongziDiyawusKey"
          >
            <el-row>
              <el-col :span="5">
                <el-form-item label="抵质押物类型：">
                  <el-select
                    v-model="item.zclb"
                    clearable
                  >
                    <el-option
                      label="土地"
                      :value="0"
                    />
                    <el-option
                      label="房产"
                      :value="1"
                    />
                    <el-option
                      label="股权收益权"
                      :value="2"
                    />
                    <el-option
                      label="存单质押"
                      :value="3"
                    />
                    <el-option
                      label="应收账款"
                      :value="4"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="证件编号：">
                  <el-input v-model="item.zjbh" />
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item
                  label="抵质押物名称(*)："
                  class="dzyName"
                >
                  <el-input v-model="item.eFkll" />
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="土地证号：">
                  <el-input v-model="item.dkh" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="抵质押日期起：">
                  <el-date-picker
                    v-model="item.dyrq"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    style="100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="抵质押日期止：">
                  <el-date-picker
                    v-model="item.dyrqz"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    style="100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="抵质押金额(万元)：">
                  <el-input
                    type="number"
                    v-model="item.dyje"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item>
                  <el-button
                    type="success"
                    icon="el-icon-plus"
                    circle
                    size="mini"
                    @click="addCollateral"
                  />
                  <el-button
                    type="danger"
                    icon="el-icon-minus"
                    circle
                    size="mini"
                    @click="delCollateral"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-row>
        </div>
        <el-form-item style="text-align: center;">
          <el-button
            type="primary"
            @click="addManagementParameters"
          >保存</el-button>
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
import { ST } from "@/utils/utils";
export default {
  data() {
    return {
      /* 添加/修改参数 */
      addOrUpdParams: {
        dkrqq: "",
        dkrqz: "",
        rongziFangdais: [
          {
            eFkjy: "",
            eFksj: "",
            eFkll: "",
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
            eFkjy: "",
            eFksj: "",
            eJzsj: "",
            rongziXudaisKey: "rongziXudais",
          },
        ],
        rongziDiyawus: [
          {
            rongziDiyawusKey: "rongziDiyawus",
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
        JinRongJiGou: [
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
    };
  },
  methods: {
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
        let [start, end] = [
          this.addOrUpdParams.dkrqq,
          this.addOrUpdParams.dkrqz,
        ];
        for (let i of this.addOrUpdParams.rongziDiyawus) {
          if ((i.eFkll == "" || i.eFkll == null) && this.addOrUpdParams.dy) {
            this.$message.error("抵质押物名称为必填");
            return;
          }
        }
        if (start >= end) {
          this.$message.error("贷款日期止必须大于贷款日期");
          return;
        }
        this.addOrUpdParams.dsf = this.addOrUpdParams.dsf ? 1 : 0;
        this.addOrUpdParams.dy = this.addOrUpdParams.dy ? 1 : 0;
        this.addOrUpdParams.zqgd = this.addOrUpdParams.zqgd ? 1 : 0;
        this.addOrUpdParams.kxd = this.addOrUpdParams.kxd ? 1 : 0;
        this.addOrUpdParams.dkrqq = ST(this.addOrUpdParams.dkrqq);
        this.addOrUpdParams.dkrqz = ST(this.addOrUpdParams.dkrqz);
        this.addOrUpdParams.qdrq = ST(this.addOrUpdParams.qdrq);
        this.addOrUpdParams.schkrq = ST(this.addOrUpdParams.schkrq);
        this.addOrUpdParams.rongziFangdais.forEach((item, index) => {
          item.eFksj = ST(item.eFksj);
        });
        this.addOrUpdParams.rongziTicords.forEach((item, index) => {
          item.tiTime = ST(item.tiTime);
        });
        this.addOrUpdParams.rongziXudais.forEach((item, index) => {
          item.eFksj = ST(item.eFksj);
          item.eJzsj = ST(item.eJzsj);
        });
        this.addOrUpdParams.rongziDiyawus.forEach((item, index) => {
          item.dyrq = ST(item.dyrq);
          item.dyrqz = ST(item.dyrqz);
        });
        if (this.$route.query.id) {
          return;
        }
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
      let [start, end] = [this.addOrUpdParams.dkrqq, this.addOrUpdParams.dkrqz];
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
  },
  mounted() {},
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