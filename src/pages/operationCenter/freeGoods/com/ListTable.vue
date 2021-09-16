<template>
  <div>
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
      @on-selection-change="selectTable"
      :data="table.data"
      :height="h - 36"
    >
      <template slot-scope="{ row }" slot="option">
        <template v-if="stateNum === 0">
          <Button
            type="primary"
            size="small"
            class="table-btn"
            @click.stop="editGoods(row)"
            >编辑</Button
          >
          <span class="p-lr4 color-blue">|</span>
          <Button
            type="primary"
            size="small"
            class="table-btn"
            @click.stop="delMFActivity(row)"
            >删除</Button
          >
          <span class="p-lr4 color-blue">|</span>
          <Button
            type="primary"
            size="small"
            class="table-btn"
            @click.stop="taskManagement(row)"
            >任务管理</Button
          >
          <span class="p-lr4 color-blue">|</span>
          <Button
            type="primary"
            size="small"
            class="table-btn"
            @click.stop="releaseMFActivity(row)"
            >发布</Button
          >
        </template>
        <template v-if="stateNum === 1">
          <Button
            type="primary"
            size="small"
            class="table-btn"
            @click.stop="cancelReleaseMFActivity(row)"
            >取消发布</Button
          >
          <span class="p-lr4 color-blue">|</span>
          <Button
            type="primary"
            size="small"
            class="table-btn"
            @click.stop="taskManagement(row)"
            >任务管理</Button
          >
        </template>
        <template v-if="stateNum === 2">
          <Button
            type="primary"
            size="small"
            class="table-btn"
            @click.stop="stopMFActivity(row)"
            >停止活动</Button
          >
          <span class="p-lr4 color-blue">|</span>
          <Button
            type="primary"
            size="small"
            class="table-btn"
            @click.stop="taskManagement(row)"
            >任务管理</Button
          >
          <span class="p-lr4 color-blue">|</span>
          <Button
            type="primary"
            size="small"
            class="table-btn"
            @click.stop="receiveStatistics(row)"
            >领取统计</Button
          >
        </template>
        <template v-if="stateNum === 3">
          <Button
            type="primary"
            size="small"
            class="table-btn"
            @click.stop="editGoods(row)"
            >编辑</Button
          >
          <span class="p-lr4 color-blue">|</span>
          <Button
            type="primary"
            size="small"
            class="table-btn"
            @click.stop="delMFActivity(row)"
            >删除</Button
          >
          <span class="p-lr4 color-blue">|</span>
          <Button
            type="primary"
            size="small"
            class="table-btn"
            @click.stop="taskManagement(row)"
            >任务管理</Button
          >
          <span class="p-lr4 color-blue">|</span>
          <Button
            type="primary"
            size="small"
            class="table-btn"
            @click.stop="releaseMFActivity(row)"
            >发布</Button
          >
        </template>
        <template v-if="stateNum === 5">
          <Button
            type="primary"
            size="small"
            class="table-btn"
            @click.stop="taskManagement(row)"
            >任务管理</Button
          >
          <span class="p-lr4 color-blue">|</span>
          <Button
            type="primary"
            size="small"
            class="table-btn"
            @click.stop="receiveStatistics(row)"
            >领取统计</Button
          >
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
</template>

<script>
import { tableHeaders } from "../data";
import {
  getMFActivityListByPageList,
  releaseMFActivity,
  delMFActivity,
  cancelReleaseMFActivity,
  stopMFActivity,
} from "@/api/freeGoods";

export default {
  name: "listTable",
  props: {
    height: Number,
    stateNum: {
      type: Number,
      default: -1,
    },
    stateType: {
      type: Number,
      default: -100,
    },
  },
  data() {
    return {
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
          // 搜索框字段
          {
            type: "Input",
            label: "搜索",
            placeholder: "输入活动名称",
            prop: "name",
          },
        ],
        search: {
          // 搜索值
          name: "", // 姓名
        },
      },
    };
  },
  computed: {
    columns() {
      if (this.stateNum === -1) return [];
      if (this.stateNum === 4) {
        return tableHeaders["tab-4"];
      } else {
        return tableHeaders["tab-0"];
      }
    },
  },
  methods: {
    // 选择表格
    selectTable(selection) {
      this.selectedData = selection;
    },
    async getTableList() {
      this.table.loading = true;
      try {
        const res = await getMFActivityListByPageList(this.table.tableQuery);
        if (res.code === 0 && res.data) {
          const { records, total } = res.data;
          this.table.data = records;
          this.table.total = total;
        }
        console.log("list:", res);
      } finally {
        this.table.loading = false;
      }
    },
    searchFilter(data, { btnType }) {
      if (btnType === "reset") {
        this.table.tableQuery.qryCode = "";
        this.search.search.name = "";
      }
      if (btnType === "search") {
        this.table.tableQuery.qryCode = data.name;
      }
      this.table.tableQuery.page = 1;
      this.getTableList();
    },
    onfreshPage({ currentPage, pageSize }) {
      this.table.tableQuery.page = currentPage;
      this.table.tableQuery.size = pageSize;
      this.getTableList();
    },
    async releaseMFActivity({ activityId }) {
      // 发布活动
      this.$Modal.confirm({
        title: `确定发布该活动?`,
        onOk: async () => {
          const res = await releaseMFActivity({ activityId });
          if (res.code === 0) {
            this.$Message.success("发布成功");
            this.getTableList();
          } else {
            this.$Message.error(res.data.message || res.msg || "操作失败");
          }
        },
      });
    },
    async delMFActivity({ activityId }) {
      // 删除活动
      this.$Modal.confirm({
        title: `确定删除该活动?`,
        onOk: async () => {
          const res = await delMFActivity({ activityId });
          if (res.code === 0) {
            this.$Message.success("删除成功");
            this.getTableList();
          } else {
            this.$Message.error(res.data.message || res.msg || "操作失败");
          }
        },
      });
    },
    async cancelReleaseMFActivity({ activityId }) {
      // 取消发布
      this.$Modal.confirm({
        title: `确定取消发布该活动?`,
        onOk: async () => {
          const res = await cancelReleaseMFActivity({ activityId });
          if (res.code === 0) {
            this.$Message.success("取消成功");
            this.getTableList();
          } else {
            this.$Message.error(res.data.message || res.msg || "操作失败");
          }
        },
      });
    },
    async stopMFActivity({ activityId }) {
      // 停止活动
      this.$Modal.confirm({
        title: `确定要停止该活动?`,
        onOk: async () => {
          const res = await stopMFActivity({ activityId });
          if (res.code === 0) {
            this.$Message.success("操作成功");
            this.getTableList();
          } else {
            this.$Message.error(res.data.message || res.msg || "操作失败");
          }
        },
      });
    },
    taskManagement(row) {
      this.$router.push({
        name: "free-Goods-taskManagement",
        query: {
          activityId: row.activityId,
        },
      });
    },
    receiveStatistics(row) {
      this.$router.push({
        name: "free-Goods-receiveStatistics",
        query: row,
      });
      // 跳转统计页面
    },
    editGoods(row) {
      // 编辑活动
       this.$router.push({name:'free-Goods-add',query: {type:'edit', ...row}})
    }
   
  },
  mounted() {
    this.getTableList();
    this.h = this.height - this.$refs.searchForm.$el.offsetHeight;
  },
};
</script>

<style>
</style>
