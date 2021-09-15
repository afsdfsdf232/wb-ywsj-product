<template>
  <div class="container">
    <goods-header title="新建活动">
      <template #right>
        <Button type="primary" @click="saveActivity">保存</Button>
        <Button class="m16" type="primary" @click="release">发布</Button>
        <Button @click="back">返回</Button>
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
          <FormItem label="活动名称" prop="activityTitle">
            <Input
              style="width: 450px"
              v-model="formValidate.activityTitle"
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
          <FormItem label="关联活动" prop="parentActivityId">
            <Select
              v-model="formValidate.parentActivityId"
              placeholder="请选择活动"
              clearable
              style="width: 450px"
            >
              <Option
                v-for="item in activityList"
                :value="item.activityId"
                :key="item.activityId"
                >{{ item.activityTitle }}</Option
              >
            </Select>
          </FormItem>
        </Form>
      </div>
      <div class="table-content">
        <div class="tag">添加任务</div>
        <div class="table-content-box">
          <div class="table-header flex">
            <div class="w60 br-right col">序号</div>
            <div class="w283 br-right col">商品名称</div>
            <div class="w249 br-right col">SKU</div>
            <div class="w300 br-right col">数量</div>
            <div class="w236 br-right col">任务开始时间</div>
            <div class="w236 br-right col">任务结束时间</div>
            <div class="w200">操作</div>
          </div>
          <div class="table-body">
            <div
              class="table-row flex br-top"
              v-for="(item, index) in formValidate.activityTasks"
              :key="item.goodsId"
            >
              <div class="w60 br-right col">{{ index + 1 }}</div>
              <div class="w283 br-right col">{{ item.goodsName }}</div>
              <div class="w249 br-right col">
                <Input
                  class="input-s"
                  v-model="item.sku"
                  placeholder="请输入..."
                />
              </div>
              <div class="w300 br-right col">
                <Input
                  class="input-s"
                  v-model="item.goodsNum"
                  type="number"
                  placeholder="请输入数量..."
                />
              </div>
              <div class="w236 br-right col">
                <DatePicker
                  class="input-s"
                  v-model="item.taskBeginDt"
                  format="yyyy-MM-dd HH:mm:ss "
                  type="date"
                  placeholder="任务开始时间..."
                ></DatePicker>
              </div>
              <div class="w236 br-right col">
                <DatePicker
                  class="input-s"
                  v-model="item.taskEndDt"
                  format="yyyy-MM-dd HH:mm:ss "
                  type="date"
                  placeholder="任务结束时间..."
                ></DatePicker>
              </div>
              <div class="w200 col options">
                <span @click="setRule(item)">规则设置</span>
                <span @click="setAdvert(item)">广告设置</span>
                <span @click="deleteGoods(item)">删除</span>
              </div>
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
                <CheckboxGroup
                  v-model="mallGoodsFilterList"
                  @on-change="changeProduct"
                >
                  <Checkbox
                    :label="item.goodsId"
                    v-for="item in mallGoodsList"
                    :key="item.goodsId"
                  >
                    <div class="goods-item">
                      <div class="goods-img">
                        <img :src="item.thumbnail" alt="" />
                      </div>
                      <div class="goods-info">
                        <p class="goods-name">
                          {{ item.goodsName }}
                        </p>
                        <p class="goods-gg">暂无规格</p>
                        <p class="goods-price">￥ {{ item.price }}</p>
                      </div>
                    </div>
                  </Checkbox>
                </CheckboxGroup>
              </div>
              <div class="goods-right">
                <CheckboxGroup
                  @on-change="changeProduct"
                  v-model="mallGoodsFilterList"
                >
                  <Checkbox
                    :label="item.goodsId"
                    v-for="item in mallGoodsSeleteList"
                    :key="item.goodsId"
                  >
                    <div class="goods-item">
                      <div class="goods-img">
                        <img :src="item.thumbnail" alt="" />
                      </div>
                      <div class="goods-info">
                        <p class="goods-name">
                          {{ item.goodsName }}
                        </p>
                        <p class="goods-gg">暂无规格</p>
                        <p class="goods-price">￥ {{ item.price }}</p>
                      </div>
                    </div>
                  </Checkbox>
                </CheckboxGroup>
              </div>
            </div>
          </Tab-pane>
          <Tab-pane label="招商商品" name="name2">
            <div class="goods-container">
              <div class="goods-left">
                <CheckboxGroup
                  v-model="investmentCommoditiesFilterList"
                  @on-change="changeProductInve"
                >
                  <Checkbox
                    :label="item.goodsId"
                    v-for="item in investmentCommodities"
                    :key="item.goodsId"
                  >
                    <div class="goods-item">
                      <div class="goods-img">
                        <img :src="item.thumbnail" alt="" />
                      </div>
                      <div class="goods-info">
                        <p class="goods-name">
                          {{ item.goodsName }}
                        </p>
                        <p class="goods-gg">暂无规格</p>
                        <p class="goods-price">￥ {{ item.price }}</p>
                      </div>
                    </div>
                  </Checkbox>
                </CheckboxGroup>
              </div>
              <div class="goods-right">
                <CheckboxGroup
                  @on-change="changeProductInve"
                  v-model="investmentCommoditiesFilterList"
                >
                  <Checkbox
                    :label="item.goodsId"
                    v-for="item in investmentCommoditiesSelete"
                    :key="item.goodsId"
                  >
                    <div class="goods-item">
                      <div class="goods-img">
                        <img :src="item.thumbnail" alt="" />
                      </div>
                      <div class="goods-info">
                        <p class="goods-name">
                          {{ item.goodsName }}
                        </p>
                        <p class="goods-gg">暂无规格</p>
                        <p class="goods-price">￥ {{ item.price }}</p>
                      </div>
                    </div>
                  </Checkbox>
                </CheckboxGroup>
              </div>
            </div>
          </Tab-pane>
        </Tabs>
      </div>
    </Modal>
    <!-- 规则设置弹窗 Rule settings-->
    <Modal
      v-model="ruleSettingsModal.show"
      @on-ok="addGoodsRuleOk"
      width="50%"
      :mask-closable="false"
      title="规则设置"
      @on-cancel="addGoodsCancel"
    >
      <div class="p-lr30">
        <div class="rule-list">
          <p class="title">领取规则：</p>
          <RadioGroup @on-change="changeRule" v-model="ruleSettingsModal.ruleDefId" vertical>
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
          <div v-if="ruleSettingsModal.ruleDefId === 1">
            <span>通过链接为选手拉</span>
            <Input
              style="margin: 10px; width: 200px"
              placeholder="请输入票数"
              type="number"
              v-model="ruleSettingsModal.voteNum"
            />
            <span>票</span>
          </div>
          <div v-if="ruleSettingsModal.ruleDefId === 2">
            <span>邀请用户</span>
            <Input
             type="number"
              v-model="ruleSettingsModal.eachNum"
              style="margin: 10px; width: 200px"
              placeholder="请输入人数"
            />
            <span>个</span>
          </div>
          <div v-if="ruleSettingsModal.ruleDefId === 3">
            <span>通过链接为选手拉</span>
            <Input
              style="margin: 10px; width: 200px"
              placeholder="请输入票数"
              type="number"
              v-model="ruleSettingsModal.voteNum"
            />
            <span>票，</span>
            <span>且邀请用户</span>
            <Input
              type="number"
              v-model="ruleSettingsModal.eachNum"
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
            :content="ruleSettingsModal.activityRule"
            :options="editorOption"
            v-model="ruleSettingsModal.activityRule"
          ></quill-editor>
        </div>
      </div>
    </Modal>
    <!-- 广告设置弹窗 Advertising settings  @on-ok=""-->
    <Modal
      v-model="advertisingSettingsModal.show"
      width="50%"
      :mask-closable="false"
      @on-ok="advertisingOk"
      title="规则设置"
      @on-cancel="addGoodsCancel"
    >
      <div class="p-lr30">
        <div class="advertising-content">
          <div class="advertising-left">
            <p
              @click="advertisingSettingsModal.state = 5"
              :class="{ 'active-p': advertisingSettingsModal.state === 5 }"
            >
              投票闪频广告
            </p>
            <p
              @click="advertisingSettingsModal.state = 6"
              :class="{ 'active-p': advertisingSettingsModal.state === 6 }"
            >
              选手继续投票页弹框广告
            </p>
            <p
              @click="advertisingSettingsModal.state = 7"
              :class="{ 'active-p': advertisingSettingsModal.state === 7 }"
            >
              分享链接
            </p>
          </div>
          <div class="advertising-right">
            <div
              v-if="
                advertisingSettingsModal.state === 5
              "
            >
              <p>图片</p>
              <div>
                <uploadFile  :img="advertInfo['5'].fileUrl" @click="changeFile('5')"  :on-success="uploadSuccess" />
              </div>
              <p>注意：上传图片尺寸为750X1334px，大小不能超过2M</p>
              <div class="input-content" style="margin: 20px 0">
                <div>
                  <span>链接：</span>
                  <Input v-model="advertInfo['5'].linkUrl" placeholder="请输入..." style="width: 400px" />
                </div>
              </div>
            </div>
            <div
              v-if="
                advertisingSettingsModal.state === 7
              "
            >
              <p>图片</p>
              <div>
                <uploadFile   :img="advertInfo['7'].fileUrl" @click="changeFile('7')"  :on-success="uploadSuccess" />
              </div>
              <p>注意：上传图片尺寸为750X1334px，大小不能超过2M</p>
              <div class="input-content" style="margin: 20px 0">
                <div>
                  <span>链接：</span>
                  <Input v-model="advertInfo['7'].linkUrl" placeholder="请输入..." style="width: 400px" />
                </div>
              </div>
            </div>
            <div v-if="advertisingSettingsModal.state === 6">
              <p>logo</p>
              <div>
               <uploadFile  :img="advertInfo['6'].fileUrl" @click="changeFile('6')" :on-success="uploadSuccess" />
              </div>
              <div class="input-content" style="margin: 20px 0">
                <div>
                  <span>标题：</span>
                  <Input  v-model="advertInfo['6'].advertTitle" placeholder="请输入..." style="width: 400px" />
                </div>
              </div>
              <div class="input-content" style="margin: 20px 0">
                <div>
                  <span>内容：</span>
                  <Input
                    style="width: 400px"
                    type="textarea"
                    v-model="advertInfo['6'].advertDesc"
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
import {
  addMFActivity,
  queryVoteActivityList,
  getGoodsTypesList,
  getGoodsCategoryList,
  getSupportGoodsList
} from "@/api/freeGoods";
import Header from "./../com/Header";
const typeData = [];
import UploadFile from "./../com/UploadFile";
import { quillEditor } from "vue-quill-editor";
import dayjs from 'dayjs';
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
const validateParent = (rule, value, callback) => {
  if (value) {
    return callback();
  } else {
    return callback(rule.message);
  }
};
const relues = {
  1: "为选手投票",
  2: "邀请用户",
  3: "既邀请用户且用户需投票",
}
const advertAreaIdTypes = {
  5: "投票闪频广告",
  6: "选手继续投票页弹框广告",
  7: "分享链接",
};
export default {
  name: "addedit",
  data() {
    return {
      mallGoodsFilterList: [], // 最终的选择列表
      mallGoodsList: [], // 商城商品列表
      mallGoodsSeleteList: [], // 已经选择的商城商品--展示
      investmentCommoditiesFilterList: [],
      investmentCommodities: [], // 招商商品列表
      investmentCommoditiesSelete: [], // 已经选择的招商商品--展示
      tableList: [],
      addGoodsModal: {
        show: false,
      },
      editorOption: {
        height: 600,
      },
      ruleSettingsModal: {
        goodsId: '',
        show: false,
        ruleDefId: 1,
        voteNum: 0, // 票数
        eachNum: 0, // 人数
        activityRule: '' // 规则内容
      },
      advertInfo: { 
        5: {
          // 广告信息
          advertAreaId: 5, // 广告类
          fileId: "", // 广告图片
          linkUrl: "", // 广告链接
          fileUrl:''
        },
        6: {
          // 广告信息
          advertAreaId: 6, // 广告类型
          fileId: "", // 广告图片id
          advertTitle: "", // 广告标题
          advertDesc: "", // 广告内容
          fileUrl:''
        },
        7: {
          // 广告信息
          advertAreaId: 7, // 广告类型
          fileId: "", // 广告图片id
          linkUrl: "", // 广告链接
          fileUrl:''
        },
      },
      advertisingSettingsModal: {
        // 广告设置弹窗
        goodsId: '',
        show: false,
        state: 5,
        item: 0
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
            label: "店铺分组",
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
      activityList: [],
      formValidate: {
        activityTitle: "",
        type: "", // 1保存 2发布
        date: "",
        activityBeginTime: "", // 活动开始时间
        activityEndTime: "", // 活动结束时间
        parentActivityId: "",
        activityTasks: [], // 任务列表
      },
      ruleValidate: {
        activityTitle: [
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
        parentActivityId: [
          {
            required: true,
            message: "请选择关联活动",
            trigger: "change",
            validator: validateParent,
          },
        ],
      },
    };
  },
  components: {
    "quill-editor": quillEditor,
    "goods-header": Header,
    uploadFile: UploadFile,
  },
  mounted() {
    this.queryVoteActivityList();
    this.getGoodsTypesList();
    this.getGoodsCategoryList();
    this.getSupportGoodsList()
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
    changeProductInve(list) {
      if (list.length === 0) {
        this.investmentCommoditiesSelete = [];
        return;
      }
      list.map((id) => {
        const goods = this.investmentCommodities.find(
          (item) => item.goodsId === id
        );
        const you = this.investmentCommoditiesSelete.find(
          (item) => item.goodsId === id
        );
        if (goods && !you) {
          this.investmentCommoditiesSelete.push(goods);
        }
      });
      // 过滤掉没有选择的商品
      this.investmentCommoditiesSelete.forEach((item, index) => {
        if (list.indexOf(item.goodsId) === -1) {
          this.investmentCommoditiesSelete.splice(index, 1);
        }
      });
    },
    changeProduct(list) {
      if (list.length === 0) {
        this.mallGoodsSeleteList = [];
        return;
      }
      list.map((id) => {
        const goods = this.mallGoodsList.find((item) => item.goodsId === id);
        const you = this.mallGoodsSeleteList.find(
          (item) => item.goodsId === id
        );
        if (goods && !you) {
          this.mallGoodsSeleteList.push(goods);
        }
      });
      // 过滤掉没有选择的商品
      this.mallGoodsSeleteList.forEach((item, index) => {
        if (list.indexOf(item.goodsId) === -1) {
          this.mallGoodsSeleteList.splice(index, 1);
        }
      });
    },
    addGoodsOk() {
      // 去除重复数据
      const goods = Array.from(
        new Set([
          ...JSON.parse(JSON.stringify(this.mallGoodsFilterList)),
          ...JSON.parse(JSON.stringify(this.investmentCommoditiesFilterList)),
        ])
      );
      const productList = JSON.parse(
        JSON.stringify([
          ...JSON.parse(JSON.stringify(this.mallGoodsList)),
          ...JSON.parse(JSON.stringify(this.investmentCommodities)),
        ])
      );
      if (goods.length > 0 && productList.length > 0) {
        goods.map((id) => {
          const goodsItem = productList.find((item) => item.goodsId === id);
          if (goodsItem) {
            const { goodsId, skuId, goodsName } = goodsItem;
            this.formValidate.activityTasks.push({
              goodsId,
              skuId,
              sku: "",
              goodsNum: 0,
              goodsName,
              taskBeginDt: "",
              taskEndDt: "",
              ruleDetail: [],
              advertDetail: [],
            });
          }
        });
      }
    },
    addGoodsCancel() {},
    async queryVoteActivityList() {
      // 查询关联活动列表
      const res = await queryVoteActivityList({});
      if (res.code === 0 && res.data) {
        console.log("res:", res);
        this.activityList = res.data || [];
      }
    },
    async release() {
      // 发布活动
        this.$refs["formValidate"].validate( async (valid) => {
        if (valid) {
          const query = {
            ...this.formValidate,
            activityBeginTime: this.formValidate.date[0]?  dayjs(this.formValidate.date[0]).format('YYYY-MM-DD HH:mm:ss'): '',
            activityEndTime: this.formValidate.date[1]? dayjs(this.formValidate.date[1]).format('YYYY-MM-DD HH:mm:ss'): '',
            type: 2,
          };
          console.log('query', query);
          if (query.activityTasks.length === 0) {
            this.$Message.error('请选择商品')
            return
          }
          for(let i=0; i<query.activityTasks.length; i++) {
            
            if (query.activityTasks[i].goodsNum<=0) {
              this.$Message.error('请输入商品数量')
              return
            }
            if (!query.activityTasks[i].taskBeginDt) {
              this.$Message.error('请选择任务开始时间')
              return
            }
               if (!query.activityTasks[i].taskEndDt) {
              this.$Message.error('请选择任务结束时间')
              return
            }
            query.activityTasks[i].taskBeginDt =dayjs(query.activityTasks[i].taskBeginDt).format('YYYY-MM-DD HH:mm:ss') 
            query.activityTasks[i].taskEndDt =dayjs(query.activityTasks[i].taskEndDt).format('YYYY-MM-DD HH:mm:ss')
            
          }
          // 验证是否存在未填写数量和日期的商品
          console.log('query:',query)
          const newQuery = new FormData()
          for(let key in query) {
            newQuery.append(key, typeof query[key] === 'object'? JSON.stringify(query[key]): query[key] )
          }
          const res = await addMFActivity(newQuery);
          if (res.code === 0) {
            this.$Message.success("保存成功");
            setTimeout(() => {
              this.$router.go(-1);
            }, 2000);
          } else {
            this.$Message.error(res.data.message || res.msg || "操作失败");
          }
        }
      });
    },
    saveActivity() {
      this.$refs["formValidate"].validate( async (valid) => {
        console.log('valid:',valid)
        if (valid) {
          const query = {
            ...this.formValidate,
            activityBeginTime: this.formValidate.date[0]?  dayjs(this.formValidate.date[0]).format('YYYY-MM-DD HH:mm:ss'): '',
            activityEndTime: this.formValidate.date[1]? dayjs(this.formValidate.date[1]).format('YYYY-MM-DD HH:mm:ss'): '',
            type: 1,
          };
          console.log('query', query);
          if (query.activityTasks.length === 0) {
            this.$Message.error('请选择商品')
            return
          }
          for(let i=0; i<query.activityTasks.length; i++) {
            
            if (query.activityTasks[i].goodsNum<=0) {
              this.$Message.error('请输入商品数量')
              return
            }
            if (!query.activityTasks[i].taskBeginDt) {
              this.$Message.error('请选择任务开始时间')
              return
            }
               if (!query.activityTasks[i].taskEndDt) {
              this.$Message.error('请选择任务结束时间')
              return
            }
            query.activityTasks[i].taskBeginDt =dayjs(query.activityTasks[i].taskBeginDt).format('YYYY-MM-DD HH:mm:ss') 
            query.activityTasks[i].taskEndDt =dayjs(query.activityTasks[i].taskEndDt).format('YYYY-MM-DD HH:mm:ss')
            
          }
          // 验证是否存在未填写数量和日期的商品
          console.log('query:',query)
          const newQuery = new FormData()
          for(let key in query) {
            newQuery.append(key, typeof query[key] === 'object'? JSON.stringify(query[key]): query[key] )
          }
          const res = await addMFActivity(newQuery);
          if (res.code === 0) {
            this.$Message.success("保存成功");
            setTimeout(() => {
              this.$router.go(-1);
            }, 2000);
          } else {
            this.$Message.error(res.data.message || res.msg || "操作失败");
          }
        }
      });
      // 保存活动
    },
    back() {
      // 返回
      this.$router.go(-1);
    },
    async getGoodsTypesList() {
      const res = await getGoodsTypesList({
        page_no: 1,
        page_size: 10,
        goods_type: "NORMAL",
        market_enable: 1,
        is_auth: 1,
      });
      if (res.data && res.data.data && res.data.data.length > 0) {
        this.mallGoodsList = res.data.data.map(item => {
          return {
            goodsId: item.goods_id,
            skuId: item.sku_id,
            goodsName: item.goods_name,
            ...item,
          }
          
        });
        // this.investmentCommodities = res.data.data;
      }
      console.log("res-goods-type:", res);
    },
    async getSupportGoodsList() {
      // 获取招商商品
      const res = await getSupportGoodsList({})
      if(res.code === 0 && res.data) {
        this.investmentCommodities = res.data || []
      }
      console.log('招商商品;', res)
    },
    async getGoodsCategoryList() {
      //  店铺分组
      const res = await getGoodsCategoryList({});
      console.log("res-店铺分组:", res);
    },
    setRule(item) {
      this.ruleSettingsModal.goodsId = item.goodsId
      this.ruleSettingsModal.show = true;
    },
    changeRule() {
      this.ruleSettingsModal.voteNum = 0
      this.ruleSettingsModal.eachNum = 0
    },
    addGoodsRuleOk(){
      const {activityRule,goodsId,ruleDefId,eachNum,voteNum } = this.ruleSettingsModal
      const index = this.formValidate.activityTasks.findIndex(item => item.goodsId === goodsId)
      if(index> -1) {
        const newRuleDetail = {
          ruleDefId,
          activityRule,
          eachNum,
          voteNum,
          ruleName: relues[ruleDefId]
        }
        this.formValidate.activityTasks[index].ruleDetail = [newRuleDetail]
      }
      
      console.log('ruleSettingsModal:', this.ruleSettingsModal)
    },
    changeFile(val) {
      console.log('val')
      this.advertisingSettingsModal.item = val;
    },
    advertisingOk() {
      const adverList = []
      for(let key in this.advertInfo) {
        adverList.push(this.advertInfo[key])
      }
      const goodsId = this.advertisingSettingsModal.goodsId
      const index = this.formValidate.activityTasks.findIndex(item => item.goodsId === goodsId)
      if (index> -1) {
        this.formValidate.activityTasks[index].advertDetail = adverList
      }
      console.log('advertInfo advertisingSettingsModal:', this.advertInfo, )
    },
    uploadSuccess(file){
      console.log('file:', file)
      const {fileId,fileUrl } = file
      this.advertInfo[this.advertisingSettingsModal.item].fileId = fileId
      this.advertInfo[this.advertisingSettingsModal.item].fileUrl = fileUrl
    },
    setAdvert(item) {
      this.advertisingSettingsModal.goodsId = item.goodsId
      this.advertisingSettingsModal.show = true;
    },
    deleteGoods(item) {
      this.$Modal.confirm({
        title: `确定删除该商品?`,
        onOk: async () => {
          console.log('item:', item)
         const index = this.formValidate.activityTasks.findIndex(goods => goods.goodsId === item.goodsId)
         if (index> -1) {
           console.log(index)
           this.formValidate.activityTasks.splice(index,1)
         }
        },
      });
    },
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
    flex-shrink: 0;
    flex-wrap: nowrap;
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
    box-sizing: border-box;
    padding: 6px 10px;
    display: flex;
    flex-wrap: wrap;
    flex-shrink: 1;
    word-break: break-all;
    width: 20%;
    text-align: center;
  }
  .w249 {
    width: 18%;
    text-align: center;
  }
  .w300 {
    width: 22%;
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
  .goods-left {
    border-right: 1px solid #dcdee2;
  }
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
.col {
  box-sizing: border-box;
  padding: 10px 0;
}
.input-s {
  width: 90%;
}
.options {
  font-size: 12px;
  color: #2e8cf0;
  span {
    margin: 0 5px;
    cursor: pointer;
  }
}
</style>
