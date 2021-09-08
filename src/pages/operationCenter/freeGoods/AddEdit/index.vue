<template>
  <div class="container">
    <goods-header title="新建活动">
      <template #right>
        <Button type="primary">保存</Button>
        <Button class="m16" type="primary">发布</Button>
        <Button>返回</Button>
      </template>
    </goods-header>
    <div class="content">
      <!-- 基础信息 -->
      <div class="basic-content">
        <div class="tag">基础信息</div>
        <Form
          ref="formValidate"
          :model="formValidate"
          :rules="ruleValidate"
          :label-width="80"
        >
          <FormItem label="活动名称" prop="name">
            <Input
              style="width: 450px"
              v-model="formValidate.name"
              placeholder="请输入活动名称"
            ></Input>
          </FormItem>
          <FormItem label="活动时间" prop="date">
            <DatePicker
              type="datetimerange"
              @on-change="changeDate"
              @on-clear="clearTime"
              format="yyyy-MM-dd HH:mm"
              v-model="formValidate.date"
              placeholder="请选择活动时间"
              style="width: 450px"
            ></DatePicker>
          </FormItem>
          <FormItem label="关联活动" prop="activity">
            <Select
              v-model="formValidate.activity"
              placeholder="请选择活动"
              clearable
              style="width: 450px"
            >
              <Option
                v-for="item in activityList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</Option
              >
            </Select>
          </FormItem>
        </Form>
      </div>
      <div class="table-content">
        <div class="tag">添加任务</div>
        <div class="table-content-box">
          <div class="table-header flex">
            <div class="w60 br-right">序号</div>
            <div class="w283 br-right">商品名称</div>
            <div class="w249 br-right">SKU</div>
            <div class="w300 br-right">数量</div>
            <div class="w236 br-right">任务开始时间</div>
            <div class="w236 br-right">任务结束时间</div>
            <div class="w200">操作</div>
          </div>
          <div class="table-body">
            <div class="table-row flex br-top">
              <div class="w60 br-right">序号</div>
              <div class="w283 br-right">商品名称</div>
              <div class="w249 br-right">SKU</div>
              <div class="w300 br-right" style="height:100px">111</div>
              <div class="w236 br-right">任务开始时间</div>
              <div class="w236 br-right">任务结束时间</div>
              <div class="w200">操作</div>
            </div>
            <div class="row flex no-list br-top">
              <div class="add" @click="addGoods">添加商品</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 选择商品弹窗 -->
    <Modal
      v-model="addGoodsModal.show"
      title=""
      @on-ok="addGoodsOk"
      @on-cancel="addGoodsCancel"
    >
      <Tabs value="name1">
        <Tab-pane label="商城商品" name="name1">标签一的内容</Tab-pane>
        <Tab-pane label="招商商品" name="name2">标签二的内容</Tab-pane>
      </Tabs>
    </Modal>
  </div>
</template>

<script>
    import Header from "./../com/Header";
    const validate = (rule, value, callback) => {
        if (Array.isArray(value)) {
            if (value[0].trim() && value[1].trim()) {
                return callback();
            }
            return callback(rule.message);
        }
        return callback(rule.message);
    };
    export default {
        name: "addedit",
        data () {
            return {
                addGoodsModal: {
                    show: false
                },
                activityList: [
                    {
                        value: "New York",
                        label: "New York"
                    },
                    {
                        value: "London",
                        label: "London"
                    }
                ],
                formValidate: {
                    name: "",
                    date: "",
                    activity: ""
                },
                ruleValidate: {
                    name: [
                        {
                            required: true,
                            message: "请输入活动名称",
                            trigger: "blur"
                        }
                    ],
                    date: [
                        {
                            required: true,
                            type: "array",
                            message: "请选择活动时间",
                            trigger: ["change", "blur"],
                            validator: validate
                        }
                    ],
                    activity: [
                        {
                            required: true,
                            message: "请选择关联活动",
                            trigger: "change"
                        }
                    ]
                }
            };
        },
        components: {
            "goods-header": Header
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate(valid => {
                    if (valid) {
                        this.$Message.success("Success!");
                    } else {
                        this.$Message.error("Fail!");
                    }
                });
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            addGoods () {
                // 打开弹窗选择商品
                this.addGoodsModal.show = true;
            },
            addGoodsOk () {},
            addGoodsCancel () {}
        }
    };
</script>

<style lang="less" scoped>
// 1356
.container {
  .m16 {
    margin: 0 16px;
  }
  .flex {
    display: flex;
    align-items: center;
  }
  .w60 {
    text-align: center;
    width: 7%;
  }
  .br-right {
    border-right: 1px solid #e3e8ee;
  }
  .br-top {
    border-top: 1px solid #e3e8ee;
  }
  .w283 {
    min-width: 20%;
    text-align: center;
  }
  .w249 {
    min-width: 18%;
    text-align: center;
  }
  .w300 {
    min-width: 22%;
    text-align: center;
  }
  .w236 {
    width: 17%;
    text-align: center;
  }
  .w200 {
    width: 15%;
    text-align: center;
  }
  .content {
    box-sizing: border-box;
    padding: 32px;
    background-color: #fff;
    .basic-content,
    .table-content {
      box-sizing: border-box;
      padding: 0 32px;
    }
    .table-content-box {
      width: 100%;
      border: 1px solid #d7dde4;
      .table-header {
        line-height: 40px;
        background-color: #f5f7f9;
      }
      .table-row {
        align-items: stretch;
        & > div {
          display: flex;
          justify-content: center;
          min-height: 40px;
          align-items: center;
        }
      }
    }
  }
  .tag {
    position: relative;
    left: -32px;
    margin-bottom: 30px;
    font-size: 16px;
    width: 114px;
    line-height: 48px;
    text-align: center;
    background-color: #2e8cf0;
    color: #fff;
    font-weight: 700;
    &::before {
      position: absolute;
      right: -48px;
      content: "";
      display: block;
      width: 0px;
      height: 0px;
      border-bottom: 24px solid transparent;
      border-top: 24px solid transparent;
      border-left: 24px solid #2e8cf0;
      border-right: 24px solid transparent;
    }
  }
  .no-list {
    line-height: 40px;
    justify-content: center;
  }
  .add {
    width: 120px;
    text-align: left;
    position: relative;
    box-sizing: border-box;
    padding-left: 16px;
    cursor: pointer;
    color: #2e8cf0;
    &::before {
      position: absolute;
      left: 5px;
      top: 50%;
      width: 1px;
      height: 10px;
      background-color: #2e8cf0;
      content: "";
      display: block;
      transform: translateY(-50%);
    }
    &::after {
      position: absolute;
      left: 0;
      top: 50%;
      content: "";
      display: block;
      height: 1px;
      width: 10px;
      transform: translateY(-50%);
      background-color: #2e8cf0;
    }
  }
}
</style>
