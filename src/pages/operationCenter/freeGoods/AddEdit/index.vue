<template>
  <div class="container">
    <goods-header title="新建活动">
      <template #right>
        <Button type="primary">保存</Button>
        <Button class="m16" type="primary">发布</Button>
        <Button >返回</Button>
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
      <div class="table-content"></div>
    </div>
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
  data() {
    return {
      activityList: [
        {
          value: "New York",
          label: "New York",
        },
        {
          value: "London",
          label: "London",
        },
      ],
      formValidate: {
        name: "",
        date: "",
        activity: "",
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入活动名称",
            trigger: "blur",
          },
        ],
        date: [
          {
            required: true,
            type: "array",
            message: "请选择活动时间",
            trigger: ["change", "blur"],
            validator: validate,
          },
        ],
        activity: [
          {
            required: true,
            message: "请选择关联活动",
            trigger: "change",
          },
        ],
      },
    };
  },
  components: {
    "goods-header": Header,
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    changeDate(event) {
      // this.formValidate.date = event;
    },
    clearTime() {
      // this.formValidate.date = [];
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  .m16 {
    margin: 0 16px;
  }
  .content {
    box-sizing: border-box;
    padding: 32px;
    background-color: #fff;
    .basic-content {
      box-sizing: border-box;
      padding: 0 32px;
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
}
</style>
