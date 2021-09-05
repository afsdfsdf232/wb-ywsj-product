<template>
  <div class="container">
    <goods-header title="免费领取商品" ref="headers">
      <template #right>
        <Button type="primary" @click="createActivity">创建活动</Button>
      </template>
    </goods-header>
    <!-- 表格 -->
    <div class="tabs-content">
      <Tabs value="name0">
        <TabPane label="未发布" name="name0">
          <list-table :height="computedHeight" :stateNum="0" />
        </TabPane>
        <TabPane label="已发布" name="name1">
          <list-table :height="computedHeight" :stateNum="1" />
        </TabPane>
        <TabPane label="进行中" name="name2">
          <list-table :height="computedHeight" :stateNum="2" />
        </TabPane>
        <TabPane label="已取消" name="name3">
          <list-table :height="computedHeight" :stateNum="3" />
        </TabPane>
        <TabPane label="已停止" name="name4">
          <list-table :height="computedHeight" :stateNum="4" />
        </TabPane>
        <TabPane label="已结束" name="name5">
          <list-table :height="computedHeight" :stateNum="5" />
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
import Header from "./../com/Header";
import ListTable from "./../com/ListTable";
export default {
  name: "goods",
  data() {
    return {
      computedHeight: 0,
    };
  },
  components: {
    "goods-header": Header,
    "list-table": ListTable,
  },
  methods: {
    createActivity() {
      // 创建活动
    },
    getContentH() {
      let datas = [];
      if (this.$refs.headers) datas.push(this.$refs.headers);
      if (this.$refs.pagination) datas.push(this.$refs.pagination);
      if (this.$refs.searchForm) datas.push(this.$refs.searchForm);
      this.computedHeight = this.$util.resizeElementH(datas) - 75;
    },
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // 动态设置子组件高度
    this.$nextTick(() => {
      this.getContentH();
    });
    // 监听浏览器高度变化计算内容高度
    window.addEventListener("resize", () => {
      this.getContentH();
    });
  },
};
</script>

<style scoped lang="less">
.container {
  box-sizing: border-box;
  .tabs-content {
    box-sizing: border-box;
    padding: 0 32px;
    background-color: #fff;
  }
}
</style>
