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
              <div class="w300 br-right" style="height: 100px">111</div>
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
      @on-ok="addGoodsOk"
      width="68%"
      :mask-closable="false"
      title="选择商品"
      @on-cancel="addGoodsCancel"
    >
      <div class="p-lr30">
        <Tabs value="name1">
          <Tab-pane label="商城商品" name="name1">
            <search-form
              :queryFieids="search.queryFieids"
              :search="search.search"
              :formBtn="search.formBtn"
              @on-click="searchFilter"
            ></search-form>
            <div class="goods-container">
              <div class="goods-left">
                <CheckboxGroup v-model="fruit" @on-change="changeProduct">
                  <Checkbox label="香蕉">
                    <div class="goods-item">
                      <div class="goods-img">
                        <img
                          src="https://img2.baidu.com/it/u=3315324068,1694602888&fm=26&fmt=auto&gp=0.jpg"
                          alt=""
                        />
                      </div>
                      <div class="goods-info">
                        <p class="goods-name">
                          商品1111111商品1111111商品1111111商品1111111商品1111111
                        </p>
                        <p class="goods-gg">50g/五香</p>
                        <p class="goods-price">￥ 500</p>
                      </div>
                    </div>
                  </Checkbox>
                  <Checkbox label="香蕉">
                    <div class="goods-item">
                      <div class="goods-img">
                        <img
                          src="https://img2.baidu.com/it/u=3315324068,1694602888&fm=26&fmt=auto&gp=0.jpg"
                          alt=""
                        />
                      </div>
                      <div class="goods-info">
                        <p class="goods-name">
                          商品1111111商品1111111商品1111111商品1111111商品1111111
                        </p>
                        <p class="goods-gg">50g/五香</p>
                        <p class="goods-price">￥ 500</p>
                      </div>
                    </div>
                  </Checkbox>
                  <Checkbox label="香蕉">
                    <div class="goods-item">
                      <div class="goods-img">
                        <img
                          src="https://img2.baidu.com/it/u=3315324068,1694602888&fm=26&fmt=auto&gp=0.jpg"
                          alt=""
                        />
                      </div>
                      <div class="goods-info">
                        <Icon type="md-medical" />
                        <p class="goods-name">
                          商品1111111商品1111111商品1111111商品1111111商品1111111
                        </p>
                        <p class="goods-gg">50g/五香</p>
                        <p class="goods-price">￥ 500</p>
                      </div>
                    </div>
                  </Checkbox>
                  <Checkbox label="香蕉">
                    <div class="goods-item">
                      <div class="goods-img">
                        <img
                          src="https://img2.baidu.com/it/u=3315324068,1694602888&fm=26&fmt=auto&gp=0.jpg"
                          alt=""
                        />
                      </div>
                      <div class="goods-info">
                        <Icon type="md-medical" />
                        <p class="goods-name">
                          商品1111111商品1111111商品1111111商品1111111商品1111111
                        </p>
                        <p class="goods-gg">50g/五香</p>
                        <p class="goods-price">￥ 500</p>
                      </div>
                    </div>
                  </Checkbox>
                  <Checkbox label="香蕉">
                    <div class="goods-item">
                      <div class="goods-img">
                        <img
                          src="https://img2.baidu.com/it/u=3315324068,1694602888&fm=26&fmt=auto&gp=0.jpg"
                          alt=""
                        />
                      </div>
                      <div class="goods-info">
                        <Icon type="md-medical" />
                        <p class="goods-name">
                          商品1111111商品1111111商品1111111商品1111111商品1111111
                        </p>
                        <p class="goods-gg">50g/五香</p>
                        <p class="goods-price">￥ 500</p>
                      </div>
                    </div>
                  </Checkbox>
                  <Checkbox label="香蕉">
                    <div class="goods-item">
                      <div class="goods-img">
                        <img
                          src="https://img2.baidu.com/it/u=3315324068,1694602888&fm=26&fmt=auto&gp=0.jpg"
                          alt=""
                        />
                      </div>
                      <div class="goods-info">
                        <Icon type="md-medical" />
                        <p class="goods-name">
                          商品1111111商品1111111商品1111111商品1111111商品1111111
                        </p>
                        <p class="goods-gg">50g/五香</p>
                        <p class="goods-price">￥ 500</p>
                      </div>
                    </div>
                  </Checkbox>
                  <Checkbox label="香蕉">
                    <div class="goods-item">
                      <div class="goods-img">
                        <img
                          src="https://img2.baidu.com/it/u=3315324068,1694602888&fm=26&fmt=auto&gp=0.jpg"
                          alt=""
                        />
                      </div>
                      <div class="goods-info">
                        <Icon type="md-medical" />
                        <p class="goods-name">
                          商品1111111商品1111111商品1111111商品1111111商品1111111
                        </p>
                        <p class="goods-gg">50g/五香</p>
                        <p class="goods-price">￥ 500</p>
                      </div>
                    </div>
                  </Checkbox>
                  <Checkbox label="香蕉">
                    <div class="goods-item">
                      <div class="goods-img">
                        <img
                          src="https://img2.baidu.com/it/u=3315324068,1694602888&fm=26&fmt=auto&gp=0.jpg"
                          alt=""
                        />
                      </div>
                      <div class="goods-info">
                        <Icon type="md-medical" />
                        <p class="goods-name">
                          商品1111111商品1111111商品1111111商品1111111商品1111111
                        </p>
                        <p class="goods-gg">50g/五香</p>
                        <p class="goods-price">￥ 500</p>
                      </div>
                    </div>
                  </Checkbox>
                  <Checkbox label="香蕉">
                    <div class="goods-item">
                      <div class="goods-img">
                        <img
                          src="https://img2.baidu.com/it/u=3315324068,1694602888&fm=26&fmt=auto&gp=0.jpg"
                          alt=""
                        />
                      </div>
                      <div class="goods-info">
                        <Icon type="md-medical" />
                        <p class="goods-name">
                          商品1111111商品1111111商品1111111商品1111111商品1111111
                        </p>
                        <p class="goods-gg">50g/五香</p>
                        <p class="goods-price">￥ 500</p>
                      </div>
                    </div>
                  </Checkbox>
                </CheckboxGroup>
              </div>
              <div class="goods-right">
                <CheckboxGroup v-model="fruit">
                  <Checkbox label="香蕉">
                    <div class="goods-item">
                      <div class="goods-img">
                        <img
                          src="https://img2.baidu.com/it/u=3315324068,1694602888&fm=26&fmt=auto&gp=0.jpg"
                          alt=""
                        />
                      </div>
                      <div class="goods-info">
                        <Icon type="md-medical" />
                        <p class="goods-name">
                          商品1111111商品1111111商品1111111商品1111111商品1111111
                        </p>
                        <p class="goods-gg">50g/五香</p>
                        <p class="goods-price">￥ 500</p>
                      </div>
                    </div>
                  </Checkbox>
                  <Checkbox label="香蕉">
                    <div class="goods-item">
                      <div class="goods-img">
                        <img
                          src="https://img2.baidu.com/it/u=3315324068,1694602888&fm=26&fmt=auto&gp=0.jpg"
                          alt=""
                        />
                      </div>
                      <div class="goods-info">
                        <Icon type="md-medical" />
                        <p class="goods-name">
                          商品1111111商品1111111商品1111111商品1111111商品1111111
                        </p>
                        <p class="goods-gg">50g/五香</p>
                        <p class="goods-price">￥ 500</p>
                      </div>
                    </div>
                  </Checkbox>
                  <Checkbox label="香蕉">
                    <div class="goods-item">
                      <div class="goods-img">
                        <img
                          src="https://img2.baidu.com/it/u=3315324068,1694602888&fm=26&fmt=auto&gp=0.jpg"
                          alt=""
                        />
                      </div>
                      <div class="goods-info">
                        <Icon type="md-medical" />
                        <p class="goods-name">
                          商品1111111商品1111111商品1111111商品1111111商品1111111
                        </p>
                        <p class="goods-gg">50g/五香</p>
                        <p class="goods-price">￥ 500</p>
                      </div>
                    </div>
                  </Checkbox>
                  <Checkbox label="香蕉">
                    <div class="goods-item">
                      <div class="goods-img">
                        <img
                          src="https://img2.baidu.com/it/u=3315324068,1694602888&fm=26&fmt=auto&gp=0.jpg"
                          alt=""
                        />
                      </div>
                      <div class="goods-info">
                        <Icon type="md-medical" />
                        <p class="goods-name">
                          商品1111111商品1111111商品1111111商品1111111商品1111111
                        </p>
                        <p class="goods-gg">50g/五香</p>
                        <p class="goods-price">￥ 500</p>
                      </div>
                    </div>
                  </Checkbox>
                  <Checkbox label="香蕉">
                    <div class="goods-item">
                      <div class="goods-img">
                        <img
                          src="https://img2.baidu.com/it/u=3315324068,1694602888&fm=26&fmt=auto&gp=0.jpg"
                          alt=""
                        />
                      </div>
                      <div class="goods-info">
                        <Icon type="md-medical" />
                        <p class="goods-name">
                          商品1111111商品1111111商品1111111商品1111111商品1111111
                        </p>
                        <p class="goods-gg">50g/五香</p>
                        <p class="goods-price">￥ 500</p>
                      </div>
                    </div>
                  </Checkbox>
                  <Checkbox label="香蕉">
                    <div class="goods-item">
                      <div class="goods-img">
                        <img
                          src="https://img2.baidu.com/it/u=3315324068,1694602888&fm=26&fmt=auto&gp=0.jpg"
                          alt=""
                        />
                      </div>
                      <div class="goods-info">
                        <Icon type="md-medical" />
                        <p class="goods-name">
                          商品1111111商品1111111商品1111111商品1111111商品1111111
                        </p>
                        <p class="goods-gg">50g/五香</p>
                        <p class="goods-price">￥ 500</p>
                      </div>
                    </div>
                  </Checkbox>
                  <Checkbox label="香蕉">
                    <div class="goods-item">
                      <div class="goods-img">
                        <img
                          src="https://img2.baidu.com/it/u=3315324068,1694602888&fm=26&fmt=auto&gp=0.jpg"
                          alt=""
                        />
                      </div>
                      <div class="goods-info">
                        <Icon type="md-medical" />
                        <p class="goods-name">
                          商品1111111商品1111111商品1111111商品1111111商品1111111
                        </p>
                        <p class="goods-gg">50g/五香</p>
                        <p class="goods-price">￥ 500</p>
                      </div>
                    </div>
                  </Checkbox>
                  <Checkbox label="香蕉">
                    <div class="goods-item">
                      <div class="goods-img">
                        <img
                          src="https://img2.baidu.com/it/u=3315324068,1694602888&fm=26&fmt=auto&gp=0.jpg"
                          alt=""
                        />
                      </div>
                      <div class="goods-info">
                        <Icon type="md-medical" />
                        <p class="goods-name">
                          商品1111111商品1111111商品1111111商品1111111商品1111111
                        </p>
                        <p class="goods-gg">50g/五香</p>
                        <p class="goods-price">￥ 500</p>
                      </div>
                    </div>
                  </Checkbox>
                  <Checkbox label="香蕉">
                    <div class="goods-item">
                      <div class="goods-img">
                        <img
                          src="https://img2.baidu.com/it/u=3315324068,1694602888&fm=26&fmt=auto&gp=0.jpg"
                          alt=""
                        />
                      </div>
                      <div class="goods-info">
                        <Icon type="md-medical" />
                        <p class="goods-name">
                          商品1111111商品1111111商品1111111商品1111111商品1111111
                        </p>
                        <p class="goods-gg">50g/五香</p>
                        <p class="goods-price">￥ 500</p>
                      </div>
                    </div>
                  </Checkbox>
                </CheckboxGroup>
              </div>
            </div>
          </Tab-pane>
          <Tab-pane label="招商商品" name="name2">
            <search-form
              :queryFieids="search.queryFieids"
              :search="search.search"
              :formBtn="search.formBtn"
              @on-click="searchFilter"
            ></search-form>
          </Tab-pane>
        </Tabs>
      </div>
    </Modal>
    <!-- 规则设置弹窗 Rule settings-->
    <Modal
      v-model="ruleSettingsModal.show"
      @on-ok="addGoodsOk"
      width="50%"
      :mask-closable="false"
      title="规则设置"
      @on-cancel="addGoodsCancel"
    >
      <div class="p-lr30">
        <div class="rule-list">
          <p class="title">领取规则：</p>
          <RadioGroup v-model="ruleSettingsModal.ruleValue" vertical>
            <Radio :label="1">
              <span>为选手选票</span>
            </Radio>
            <Radio :label="2">
              <Icon type="social-android"></Icon>
              <span>邀请用户</span>
            </Radio>
            <Radio :label="3">
              <span>既邀请用户，且用户需投票</span>
            </Radio>
          </RadioGroup>
        </div>
        <div class="rule-input">
          <div v-if="ruleSettingsModal.ruleValue === 1">
            <span>通过链接为选手拉</span>
            <Input
              style="margin: 10px; width: 200px"
              placeholder="请输入票数"
            />
            <span>票</span>
          </div>
          <div v-if="ruleSettingsModal.ruleValue === 2">
            <span>邀请用户</span>
            <Input
              style="margin: 10px; width: 200px"
              placeholder="请输入人数"
            />
            <span>个</span>
          </div>
          <div v-if="ruleSettingsModal.ruleValue === 3">
            <span>通过链接为选手拉</span>
            <Input
              style="margin: 10px; width: 200px"
              placeholder="请输入票数"
            />
            <span>票，</span>
            <span>且邀请用户</span>
            <Input
              style="margin: 10px; width: 200px"
              placeholder="请输入人数"
            />
            <span>个</span>
          </div>
        </div>
        <div class="rule-content">
          <p class="title">活动规则</p>
          <quill-editor
            style="height: 300px"
            :content="content"
            :options="editorOption"
            v-model="tinymceHtml"
          ></quill-editor>
        </div>
      </div>
    </Modal>
    <!-- 广告设置弹窗 Advertising settings -->
    <Modal
      v-model="advertisingSettingsModal.show"
      @on-ok="addGoodsOk"
      width="50%"
      :mask-closable="false"
      title="规则设置"
      @on-cancel="addGoodsCancel"
    >
      <div class="p-lr30">
        <div class="advertising-content">
          <div class="advertising-left">
            <p
              @click="advertisingSettingsModal.state = 1"
              :class="{ 'active-p': advertisingSettingsModal.state === 1 }"
            >
              投票闪频广告
            </p>
            <p
              @click="advertisingSettingsModal.state = 2"
              :class="{ 'active-p': advertisingSettingsModal.state === 2 }"
            >
              选手继续投票页弹框广告
            </p>
            <p
              @click="advertisingSettingsModal.state = 3"
              :class="{ 'active-p': advertisingSettingsModal.state === 3 }"
            >
              分享链接
            </p>
          </div>
          <div class="advertising-right">
            <div
              v-if="
                advertisingSettingsModal.state === 1 ||
                advertisingSettingsModal.state === 3
              "
            >
              <p>图片</p>
              <div>
                <Upload
                  ref="upload"
                  :show-upload-list="false"
                  :default-file-list="defaultList"
                  :on-success="handleSuccess"
                  :format="['jpg', 'jpeg', 'png']"
                  :max-size="2048"
                  :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize"
                  :before-upload="handleBeforeUpload"
                  multiple
                  type="drag"
                  action="//jsonplaceholder.typicode.com/posts/"
                  style="display: inline-block; width: 200px; margin: 16px 0"
                >
                  <div style="width: 200px; height: 200px; line-height: 200px">
                    <Icon size="20" type="md-add" />
                    <p>上传图片</p>
                  </div>
                </Upload>
              </div>
              <p>注意：上传图片尺寸为750X1334px，大小不能超过2M</p>
              <div class="input-content" style="margin: 20px 0">
                <div>
                  <span>链接：</span>
                  <Input placeholder="请输入..." style="width: 400px" />
                </div>
              </div>
            </div>
            <div v-if="advertisingSettingsModal.state === 2">
              <p>logo</p>
              <div>
                <Upload
                  ref="upload"
                  :show-upload-list="false"
                  :default-file-list="defaultList"
                  :on-success="handleSuccess"
                  :format="['jpg', 'jpeg', 'png']"
                  :max-size="2048"
                  :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize"
                  :before-upload="handleBeforeUpload"
                  multiple
                  type="drag"
                  action="//jsonplaceholder.typicode.com/posts/"
                  style="display: inline-block; width: 200px; margin: 16px 0"
                >
                  <div style="width: 200px; height: 200px; line-height: 200px">
                    <Icon size="20" type="md-add" />
                    <p>上传图片</p>
                  </div>
                </Upload>
              </div>
              <div class="input-content" style="margin: 20px 0">
                <div>
                  <span>标题：</span>
                  <Input placeholder="请输入..." style="width: 400px" />
                </div>
              </div>
              <div class="input-content" style="margin: 20px 0">
                <div>
                  <span>内容：</span>
                  <Input
                    style="width: 400px"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 5 }"
                    placeholder="请输入..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Header from "./../com/Header";
const typeData = [];
import { quillEditor } from "vue-quill-editor";
import { addQuillTitle } from "./quill-title";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
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
    let _this = this;
    return {
      fruit: [],
      addGoodsModal: {
        show: false,
      },
      tinymceHtml: "<h1>hahha</h1>",
      content: "<h1>hahha</h1>",
      editorOption: {
        height: 600,
      },
      ruleSettingsModal: {
        show: false,
        ruleValue: 1,
      },
      advertisingSettingsModal: {
        // 广告设置弹窗
        show: true,
        state: 1,
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
            type: "Select",
            label: "商品分类",
            placeholder: "请选择",
            prop: "type",
            option: typeData,
          },
          {
            type: "Input",
            label: "搜索",
            placeholder: "输入关键字",
            prop: "name",
          },
        ],
        search: {
          // 搜索值
          name: "", // 姓名
          type: "", // 类型
        },
      },
      filterLeft: {
        name: "",
        type: "",
      },
      filterRight: {
        name: "",
        type: "",
      },
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
    "quill-editor": quillEditor,
    "goods-header": Header,
  },
  mounted() {
    addQuillTitle();
  },
  methods: {
    getSearchRest() {},
    searchFilter(...data) {
      console.log("data:", ...data);
    },
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
    addGoods() {
      // 打开弹窗选择商品
      this.addGoodsModal.show = true;
    },
    changeProduct(...args) {
      console.log("args:", args);
    },
    addGoodsOk() {},
    addGoodsCancel() {},
  },
};
</script>

<style lang="less" scoped>
// 1356
.ivu-checkbox-wrapper {
  width: 250px;
  height: 133px;
  box-sizing: border-box;
  padding: 12px;
  margin: 0 10px 10px 0;
  position: relative;
  background-color: #fff;
}
::v-deep .ivu-checkbox {
  position: absolute;
  top: 8px;
  right: 10px;
}
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
.goods-container {
  display: flex;
  .goods-left,
  .goods-right {
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    max-height: 500px;
    box-sizing: border-box;
    padding: 32px;
    overflow-y: auto;
    background-color: #f8f8f8;
    .goods-item {
      display: flex;
      align-items: center;
      background-color: #fff;
      .goods-img img {
        width: 92px;
        height: 92px;
      }
      .goods-info {
        margin-top: 18px;
        margin-left: 16px;
        .goods-name {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .goods-gg {
          color: rgb(153, 204, 51);
        }
        .goods-price {
          color: rgb(255, 78, 78);
        }
      }
    }
  }
}
.rule-list {
  margin: 20px 0;
  .title {
    font-size: 16px;
    margin-bottom: 10px;
  }
}
.rule-content {
  height: 400px;
  .title {
    font-size: 16px;
    margin-bottom: 10px;
  }
}
.advertising-content {
  display: flex;
  height: 550px;
  .advertising-left {
    border: 1px solid #e4e4e4;
    width: 201px;
    p {
      line-height: 48px;
      box-sizing: border-box;
      padding: 0 10px;
      cursor: pointer;
    }
    .active-p {
      background-color: #f3f9ff;
    }
  }
  .advertising-right {
    box-sizing: border-box;
    padding: 20px;
  }
}
</style>
