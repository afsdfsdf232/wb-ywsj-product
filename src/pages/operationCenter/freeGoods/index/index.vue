<template>
  <div class="container">
    <!-- 列表页面 -->
    <goods-list v-show="routeCop === 1" />
    <!-- 详情页面 -->
    <!-- 商品活动新增、编辑页面 -->
    <goods-add-edit v-show="routeCop === 2" />
  </div>
</template>

<script>
import List from "./indexSp";
import AddEdit from "./../AddEdit";
export default {
  name: "goods",
  data() {
    return {
      routeCop: 2,
    };
  },
  components: {
    "goods-list": List,
    "goods-add-edit": AddEdit,
  },
  methods: {
    changeRoute(cop){
      this.routeCop = cop;
    }
  }
};
</script>

<style scoped lang="less">
.container {
  box-sizing: border-box;
}
</style>
