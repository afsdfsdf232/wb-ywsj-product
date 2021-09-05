<template>
  <div>
    <Table
      :columns="columns"
      ref="tableList"
      stripe
      :loading="table.loading"
      @on-selection-change="selectTable"
      :data="table.data"
      :height="height - 36"
    >
      <template slot-scope="{ row }" slot="option">
        <template v-if="stateNum === 0">
          <Button
            type="primary"
            size="small"
            class="table-btn"
            @click.stop="tableBtn(row, 2)"
            >编辑</Button
          >
          <span class="p-lr4 color-blue">|</span>
          <Button
            type="primary"
            size="small"
            class="table-btn"
            @click.stop="tableBtn(row, 1)"
            >删除</Button
          >
          <span class="p-lr4 color-blue">|</span>
          <Button
            type="primary"
            size="small"
            class="table-btn"
            @click.stop="tableBtn(row, 1)"
            >任务管理</Button
          >
          <span class="p-lr4 color-blue">|</span>
          <Button
            type="primary"
            size="small"
            class="table-btn"
            @click.stop="tableBtn(row, 1)"
            >发布</Button
          >
        </template>
        <template v-if="stateNum === 1">
          <Button
            type="primary"
            size="small"
            class="table-btn"
            @click.stop="tableBtn(row, 1)"
            >取消发布</Button
          >
          <span class="p-lr4 color-blue">|</span>
          <Button
            type="primary"
            size="small"
            class="table-btn"
            @click.stop="tableBtn(row, 1)"
            >任务管理</Button
          >
        </template>
        <template v-if="stateNum === 2">
          <Button
            type="primary"
            size="small"
            class="table-btn"
            @click.stop="tableBtn(row, 1)"
            >停止活动</Button
          >
          <span class="p-lr4 color-blue">|</span>
          <Button
            type="primary"
            size="small"
            class="table-btn"
            @click.stop="tableBtn(row, 1)"
            >任务管理</Button
          >
          <span class="p-lr4 color-blue">|</span>
          <Button
            type="primary"
            size="small"
            class="table-btn"
            @click.stop="tableBtn(row, 1)"
            >领取统计</Button
          >
        </template>
        <template v-if="stateNum === 3">
          <Button
            type="primary"
            size="small"
            class="table-btn"
            @click.stop="tableBtn(row, 2)"
            >编辑</Button
          >
          <span class="p-lr4 color-blue">|</span>
          <Button
            type="primary"
            size="small"
            class="table-btn"
            @click.stop="tableBtn(row, 1)"
            >删除</Button
          >
          <span class="p-lr4 color-blue">|</span>
          <Button
            type="primary"
            size="small"
            class="table-btn"
            @click.stop="tableBtn(row, 1)"
            >任务管理</Button
          >
          <span class="p-lr4 color-blue">|</span>
          <Button
            type="primary"
            size="small"
            class="table-btn"
            @click.stop="tableBtn(row, 1)"
            >发布</Button
          >
        </template>
        <template v-if="stateNum === 4"> </template>
        <template v-if="stateNum === 5">
          <Button
            type="primary"
            size="small"
            class="table-btn"
            @click.stop="tableBtn(row, 1)"
            >任务管理</Button
          >
          <span class="p-lr4 color-blue">|</span>
          <Button
            type="primary"
            size="small"
            class="table-btn"
            @click.stop="tableBtn(row, 1)"
            >领取统计</Button
          >
        </template>
      </template>
    </Table>
    <!-- 分页 -->
    <pagination
      ref="pagination"
      :pageIndex="table.pageIndex"
      @onfreshPage="getTableList"
      :pageSize="table.pageSize"
      :total="table.total"
    >
    </pagination>
  </div>
</template>

<script>
import { tableHeaders } from "../data";
export default {
  name: "listTable",
  props: {
    height: Number,
    stateNum: {
      type: Number,
      default: -1,
    },
  },
  data() {
    return {
      table: {
        // 未发布
        data: [{ name: "活动1" }],
        loading: false,
        pageIndex: 1,
        pageSize: 10,
        total: 0,
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
    tableBtn(row, type) {},
    getTableList() {},
  },
};
</script>

<style>
</style>
