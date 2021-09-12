<template>
  <div class="container">
    <goods-header title="送出奖项统计" ref="headers">
      <template #right>
        <Button @click="back">返回</Button>
      </template>
    </goods-header>
    <!-- 表格 -->
    <div class="tabs-content">
      <search-form
        ref="searchForm"
        style="margin: 10px 0 20px"
        :queryFieids="search.queryFieids"
        :search="search.search"
        :formBtn="search.formBtn"
        @on-click="searchFilter"
      ></search-form>
      <Table
        :columns="columns"
        ref="tableList"
        stripe
        :loading="table.loading"
        :data="table.data"
        :height="computedHeight"
      >
      </Table>
      <!-- 分页 -->
      <pagination
        ref="pagination"
        :pageIndex="table.tableQuery.page"
        @onfreshPage="onfreshPage"
        :pageSize="table.tableQuery.size"
        :total="table.total"
      >
      </pagination>
    </div>
  </div>
</template>

<script>
const typeData = [
  {
    label: "待发货",
    value: 1,
  },
  {
    label: "已发货",
    value: 2,
  },
  {
    label: "已收货",
    value: 3,
  },
  {
    label: "已完成",
    value: 4,
  },
];
import Header from "./../com/Header";
import { getMFActivityTaskListByPage } from "@/api/freeGoods";
export default {
  components: {
    "goods-header": Header,
  },
  data() {
    return {
      computedHeight: 0,
      columns: [
        {
          type: "index",
          width: 60,
          align: "center",
          title: "序号",
        },
        {
          key: "activityTitle",
          align: "center",
          title: "完成时间",
        },
        {
          key: "parentActivityTitle",
          align: "center",
          title: "昵称",
        },
        {
          key: "activityBeginDt",
          align: "center",
          title: "手机号",
        },
        {
          key: "activityEndDt",
          align: "center",
          title: "支持选手",
        },
        {
          key: "activityEndDt",
          align: "center",
          title: "所属活动",
        },
        {
          key: "activityEndDt",
          align: "center",
          title: "订单号",
        },
        {
          key: "activityEndDt",
          align: "center",
          title: "商品名称",
        },
        {
          key: "activityEndDt",
          align: "center",
          title: "状态",
        },
      ],
      table: {
        // 未发布
        data: [{ status: 1 }, { status: 2 }, { status: 3 }],
        total: 0,
        loading: false,
        tableQuery: {
          page: 1,
          size: 10,
          status: "",
          qryCode: "",
          activityStateId: this.stateType,
        },
      },
      search: {
        formBtn: [
          // 搜索框按钮
          {
            label: "查询",
            class: "normal-btn",
            btnType: "search",
            type: "primary",
          },
          { label: "重置", btnType: "reset", class: "normal-btn" },
        ],
        queryFieids: [
          {
            type: "Select",
            label: "商品状态",
            placeholder: "请选择",
            prop: "status",
            option: typeData,
          },
          // 搜索框字段
          {
            type: "Input",
            label: "搜索",
            placeholder: "输入商品名称",
            prop: "name",
          },
        ],
        search: {
          // 搜索值
          name: "", // 姓名
          status: "", // 商品状态
        },
      },
    };
  },
  methods: {
    receiveStatistics(row) {
      console.log("领取统计：", row);
      this.$router.push({
        name: "free-Goods-receiveStatistics",
        query: row,
      });
      // 跳转统计页面
    },
    async getMFActivityTaskListByPage() {
      // 获取列表
      this.table.loading = true;
      try {
        const res = await getMFActivityTaskListByPage(this.table.tableQuery);
        if (res.code === 0 && res.data) {
        }
      } finally {
        this.table.loading = false;
      }
    },
    onfreshPage({ currentPage, pageSize }) {
      // 分页
      this.table.tableQuery.page = currentPage;
      this.table.tableQuery.size = pageSize;
      this.getMFActivityTaskListByPage();
    },
    searchFilter(data, { btnType }) {
      // 筛选
      if (btnType === "reset") {
        this.table.tableQuery.qryCode = "";
        this.search.search.name = "";
        this.search.search.status = "";
      }
      if (btnType === "search") {
        this.table.tableQuery.qryCode = data.name;
        this.table.tableQuery.status = data.status;
      }
      this.table.tableQuery.page = 1;
      this.getMFActivityTaskListByPage();
    },
    getContentH() {
      let datas = [];
      if (this.$refs.headers) datas.push(this.$refs.headers);
      if (this.$refs.pagination) datas.push(this.$refs.pagination);
      if (this.$refs.searchForm) datas.push(this.$refs.searchForm);
      this.computedHeight = this.$util.resizeElementH(datas) - 75;
    },
    editTask(row) {
      // 编辑任务
    },
    removeTask(row) {
      // 移除任务
    },
    taskDetail(row) {
      // 任务详情
      this.$router.push({
        name: "free-Goods-detail",
        query: {
          ...row,
        },
      });
    },
    back() {
      this.$router.go(-1);
    },
  },
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

<style lang="less" scoped>
.container {
  background-color: #fff;
}
</style>
