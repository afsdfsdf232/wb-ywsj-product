<template>
  <div class="container">
    <goods-header title="新建活动">
      <template #right>
        <Button type="primary">保存</Button>
        <Button type="primary m16">发布</Button>
        <Button type="">返回</Button>
      </template>
    </goods-header>
    <div class="content">
      <!-- 基础信息 -->
      <div class="basic-content">
        <Form
          ref="formValidate"
          :model="formValidate"
          :rules="ruleValidate"
          :label-width="80"
        >
          <FormItem label="活动名称" prop="name">
            <Input
              v-model="formValidate.name"
              placeholder="请输入活动名称"
            ></Input>
          </FormItem>
          <FormItem label="Date">
            <DatePicker
              type="daterange"
              :start-date="new Date(1991, 4, 14)"
              placement="bottom-end"
              placeholder="Select date"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
        </Form>
      </div>
      <div class="table-content"></div>
    </div>
  </div>
</template>

<script>
import Header from "./../com/Header";
export default {
  name: "addedit",
  data() {
    return {
      formValidate: {
        name: "",
        mail: "",
        city: "",
        gender: "",
        interest: [],
        date: "",
        time: "",
        desc: "",
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur",
          },
        ],
        mail: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur",
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" },
        ],
        city: [
          {
            required: true,
            message: "Please select the city",
            trigger: "change",
          },
        ],
        gender: [
          {
            required: true,
            message: "Please select gender",
            trigger: "change",
          },
        ],
        interest: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "Choose at least one hobby",
            trigger: "change",
          },
          {
            type: "array",
            max: 2,
            message: "Choose two hobbies at best",
            trigger: "change",
          },
        ],
        date: [
          {
            required: true,
            type: "date",
            message: "Please select the date",
            trigger: "change",
          },
        ],
        time: [
          {
            required: true,
            type: "string",
            message: "Please select time",
            trigger: "change",
          },
        ],
        desc: [
          {
            required: true,
            message: "Please enter a personal introduction",
            trigger: "blur",
          },
          {
            type: "string",
            min: 20,
            message: "Introduce no less than 20 words",
            trigger: "blur",
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
  },
};
</script>

<style lang="less" scoped>
.container {
  .m16 {
    margin: 0 16px;
  }
}
</style>
