<template>
  <div style="padding:.125rem;background:#F4F9FD">
    <div>
      <div class="kapd">
        <div class="kap">
          <div class="kapa" style="background: #fa6565;">
            <img src="../../icons/money.png" alt="" />
          </div>
          <div class="text">融资到账总额：{{Number(indexValueType.received).toFixed(6)}}万元</div>
        </div>
        <div class="kap">
          <div class="kapa" style="background: #F6AB17;">
            <img src="../../icons/money.png" alt="" />
          </div>
          <div class="text">融资到账可使用：{{Number(indexValueType.receivedAvailable).toFixed(6)}}万元</div>
        </div>
        <div class="kap">
          <div class="kapa" style="background: #48A1FE;">
            <img src="../../icons/money.png" alt="" />
          </div>
          <div class="text2">
            <div>年初本金余额：{{Number(indexValueType.yprincipalBalance).toFixed(6)}}万元</div>
            <div>年初利息余额：{{Number(indexValueType.yinterestBalance).toFixed(6)}}万元</div>
          </div>
        </div>
      </div>
      <div class="kapd">
        <div class="kap">
          <div class="kapa" style="background: #70C545;">
            <img src="../../icons/money.png" alt="" />
          </div>
          <div class="text2">
            <div>今年已还本金：{{Number(indexValueType.yearRepaidPrincipal).toFixed(6)}}万元</div>
            <div>今年已还利息：{{Number(indexValueType.yearRepaidInterest).toFixed(6)}}万元</div>
          </div>
        </div>
        <div class="kap">
          <div class="kapa" style="background: #72D0FF;">
            <img src="../../icons/money.png" alt="" />
          </div>
          <div class="text2">
            <div>今年未还本金：{{Number(indexValueType.yearNotPrincipal).toFixed(6)}}万元</div>
            <div>今年未还利息：{{Number(indexValueType.yearNotInterest).toFixed(6)}}万元</div>
          </div>
        </div>
        <div class="kap">
          <div class="kapa" style="background: #9C89C9;">
            <img src="../../icons/money.png" alt="" />
          </div>
          <div class="text2">
            <div>全部未还本金：{{Number(indexValueType.wholeNotPrincipal).toFixed(6)}}万元</div>
            <div>全部未还利息：{{Number(indexValueType.wholeNotInterest).toFixed(6)}}万元</div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
import home from "@/api/home";
export default {
  data() {
    return {
      /* 数值类型 */ indexValueType: {},
    };
  },
  methods: {
    /* 数值类型 */ getIndexValueType() {
      home.getIndexValueType().then((res) => {
        this.indexValueType = res.data;
      });
    },
  },
  mounted() {
    /* 数值类型 */ this.getIndexValueType();
  },
};
</script>

<style lang="scss" scoped>
.kapd {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
  .kap {
    width: 6.4rem;
    height: 1.025rem;
    background: #fff;
    padding: 0.188rem;
    display: flex;
    align-items: center;
    .text {
      margin-left: 0.125rem;
      font-size: 0.163rem;
      font-weight: 600;
    }
    .text2 {
      margin-left: 0.125rem;
      font-weight: 600;
      font-size: 0.163rem;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
    .kapa {
      border-radius: 10%;
      height: 0.625rem;
      width: 0.625rem;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 0.375rem;
        height: 0.375rem;
      }
    }
  }
}
</style>