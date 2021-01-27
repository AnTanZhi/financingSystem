<template>
  <div style="padding:.125rem;background:#F4F9FD">
    <div>
      <div class="kapd">
        <div class="kap">
          <div class="kapa" style="background: #fa6565;">
            <img src="../../icons/money.png" alt="" />
          </div>
          <div class="text">融资到账总额：100.00万元</div>
        </div>
        <div class="kap">
          <div class="kapa" style="background: #F6AB17;">
            <img src="../../icons/money.png" alt="" />
          </div>
          <div class="text">融资到账可使用：100.00万元</div>
        </div>
        <div class="kap">
          <div class="kapa" style="background: #48A1FE;">
            <img src="../../icons/money.png" alt="" />
          </div>
          <div class="text2">
            <div>年初本金余额：4,157,577.37万元</div>
            <div>年初利息余额：526,213.94万元</div>
          </div>
        </div>
      </div>
      <div class="kapd">
        <div class="kap">
          <div class="kapa" style="background: #70C545;">
            <img src="../../icons/money.png" alt="" />
          </div>
          <div class="text2">
            <div>今年已还本金：255,242.33万元</div>
            <div>今年已还利息：-6,806.14万元</div>
          </div>
        </div>
        <div class="kap">
          <div class="kapa" style="background: #72D0FF;">
            <img src="../../icons/money.png" alt="" />
          </div>
          <div class="text2">
            <div>今年未还本金：1,466,358.52万元</div>
            <div>今年未还利息：199,808.63万元</div>
          </div>
        </div>
        <div class="kap">
          <div class="kapa" style="background: #9C89C9;">
            <img src="../../icons/money.png" alt="" />
          </div>
          <div class="text2">
            <div>全部未还本金：3,902,335.05万元</div>
            <div>全部未还利息：517,469.93万元</div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {},
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