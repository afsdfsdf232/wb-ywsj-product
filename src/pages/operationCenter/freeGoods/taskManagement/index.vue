<template>
  <div class="container">
    <goods-header title="任务管理" ref="headers">
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
        <template slot-scope="{ row }" slot="option">
          <template v-if="row.activityTaskStateId === 2">
            <!-- <Button
              type="primary"
              size="small"
              class="table-btn"
              @click.stop="taskDetail(row)"
              >任务详情</Button
            > -->
          </template>
          <template v-if="row.activityTaskStateId === 1">
            <Button
              type="primary"
              size="small"
              class="table-btn"
              @click.stop="editTask(row)"
              >编辑</Button
            >
            <span class="p-lr4 color-blue">|</span>
            <Button
              type="primary"
              size="small"
              class="table-btn"
              @click.stop="removeTask(row)"
              >移除任务</Button
            >
            <!-- <span class="p-lr4 color-blue">|</span>
            <Button
              type="primary"
              size="small"
              class="table-btn"
              @click.stop="taskDetail(row)"
              >任务详情</Button
            > -->
          </template>
          <template v-if="row.activityTaskStateId === 3">
            <Button
              type="primary"
              size="small"
              class="table-btn"
              @click.stop="removeTask(row)"
              >移除任务</Button
            >
            <!-- <span class="p-lr4 color-blue">|</span>
            <Button
              type="primary"
              size="small"
              class="table-btn"
              @click.stop="taskDetail(row)"
              >任务详情</Button
            > -->
          </template>
        </template>
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
    label: "未开始",
    id: "1",
  },
  {
    label: "进行中",
    id: "2",
  },
  {
    label: "已结束",
    id: "3",
  },
  {
    label: "已送完",
    id: "4",
  },
];
import Header from "./../com/Header";
import {
  getMFActivityTaskListByPage,
  delMFActivityTask,
} from "@/api/freeGoods";
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
          key: "goodsName",
          align: "center",
          title: "商品名称",
        },
        {
          key: "goodsNum",
          align: "center",
          title: "商品总数",
        },
        {
          key: "activityBeginDt",
          align: "center",
          title: "已送出数量",
          render: (h, params) => {
            return h(
              "div",
              {
                style: {
                  color: "rgb(20, 134, 255)",
                  cursor: "pointer",
                },
                on: {
                  click: () => {
                    this.receiveStatistics(params.row);
                  },
                },
              },
              params.row.receiveGoodsNum || 0
            );
          },
        },
        {
          key: "surplusGoodsNum",
          align: "center",
          title: "剩余数量",
        },
        {
          key: "activityEndDt",
          align: "center",
          title: "时间段",
          width: 300,
          render: (h,params) => {
            return h('span',`${params.row.taskBeginDt} 至 ${params.row.taskEndDt}`)
          }
        },
        {
          key: "activityTaskStateName",
          align: "center",
          title: "状态",
        },
        {
          slot: "option",
          align: "left",
          width: 200,
          title: "操作",
        },
      ],
      h: 0,
      table: {
        // 未发布
        data: [],
        total: 0,
        loading: false,
        tableQuery: {
          page: 1,
          size: 10,
          qryCode: "",
          activityTaskStateId: "", // 状态
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
            prop: "activityTaskStateId",
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
          activityTaskStateId: "", // 商品状态
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
          const { total, records } = res.data;
          this.table.data = records || [];
          this.table.total = total;
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
        this.search.search.activityTaskStateId = "";
      }
      if (btnType === "search") {
        this.table.tableQuery.qryCode = data.name;
        this.table.tableQuery.activityTaskStateId = data.activityTaskStateId;
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
      this.$router.push({
        name: "free-Goods-editTask",
        query: {
          ...row,
        },
      });
    },
    removeTask({ activityTaskId }) {
      // 移除任务
      this.$Modal.confirm({
        title: `确定移除该任务?`,
        onOk: async () => {
          const res = await delMFActivityTask({ activityTaskId });
          if (res.code === 0) {
            this.$Message.success("移除成功");
            this.getMFActivityTaskListByPage();
          } else {
            this.$Message.error(res.data.message || res.msg || "操作失败");
          }
        },
      });
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
    this.getMFActivityTaskListByPage();
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
  .tabs-content {
    box-sizing: border-box;
    padding: 10px 0;
    background-color: #fff;
  }
}
</style>
