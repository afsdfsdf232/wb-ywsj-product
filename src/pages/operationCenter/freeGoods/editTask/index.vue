<template>
  <div class="container">
    <goods-header title="编辑任务">
      <template #right>
        <Button type="primary" class="mr16" @click="updateMFActivityTask">保存</Button>
        <Button @click="back">返回</Button>
      </template>
    </goods-header>
    <div class="content">
      <!-- 基础信息 -->
      <div class="table-content">
        <div class="tag">基础信息</div>
        <div class="table-content-box">
          <div class="table-header flex">
            <div class="w283 br-right">商品名称</div>
            <div class="w249 br-right">SKU</div>
            <div class="w300 br-right">数量</div>
            <div class="w236 br-right">任务开始时间</div>
            <div class="w236">任务结束时间</div>
          </div>
          <div class="table-body">
            <div class="table-row flex br-top">
              <div class="w283 br-right">{{ baseInfo.goodsName }}</div>
              <div class="w249 br-right">{{ baseInfo.sku }}</div>
              <div class="w300 br-right">
                <Input
                  type="number"
                  v-model="baseInfo.goodsNum"
                  placeholder="请输入..."
                />
              </div>
              <div class="w236 br-right">
                <DatePicker
                  v-model="baseInfo.taskBeginDt"
                  format="yyyy-MM-dd HH:mm:ss "
                  type="datetime"
                  placeholder="请选择任务开始时间..."
                ></DatePicker>
              </div>
              <div class="w236">
                <DatePicker
                  v-model="baseInfo.taskEndDt"
                  format="yyyy-MM-dd HH:mm:ss "
                  type="datetime"
                  placeholder="请选择任务结束时间..."
                ></DatePicker>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="table-content" style="margin: 20px 0 0">
        <div class="tag">规则设置</div>
        <div class="p-lr30">
          <div class="rule-list">
            <p class="title">领取规则：</p>
            <RadioGroup @on-change="changeRule" v-model="ruleInfo.ruleDefId" vertical>
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
            <div v-if="ruleInfo.ruleDefId === 1">
              <span>通过链接为选手拉</span>
              <Input
                v-model="ruleInfo.voteNum"
                type="number"
                style="margin: 10px; width: 200px"
                placeholder="请输入票数"
              />
              <span>票</span>
            </div>
            <div v-if="ruleInfo.ruleDefId === 2">
              <span>邀请用户</span>
              <Input
                style="margin: 10px; width: 200px"
                placeholder="请输入人数"
                type="number"
                v-model="ruleInfo.eachNum"
              />
              <span>个</span>
            </div>
            <div v-if="ruleInfo.ruleDefId === 3">
              <span>通过链接为选手拉</span>
              <Input
                style="margin: 10px; width: 200px"
                placeholder="请输入票数"
                type="number"
                v-model="ruleInfo.voteNum"
              />
              <span>票，</span>
              <span>且邀请用户</span>
              <Input
                style="margin: 10px; width: 200px"
                placeholder="请输入人数"
                type="number"
                v-model="ruleInfo.eachNum"
              />
              <span>个</span>
            </div>
          </div>
          <div class="rule-content">
            <p class="title">活动规则</p>
            <quill-editor
              style="height: 300px"
              :content="ruleInfo.activityRule"
              :options="editorOption"
              v-model="ruleInfo.activityRule"
            ></quill-editor>
          </div>
        </div>
      </div>
      <div class="table-content" style="margin: 20px 0 0">
        <div class="tag">广告设置</div>
        <div class="advertising-content p-lr30">
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
            <div v-if="advertisingSettingsModal.state === 5">
              <p>图片</p>
              <div>
                <uploadFile  :img="advertInfo['5'].fileUrl" @click="changeFile('5')" :on-success="uploadSuccess" />
              </div>
              <p style="margin: 8px 0">
                注意：上传图片尺寸为750X1334px，大小不能超过2M
              </p>
              <div class="input-content" style="margin: 20px 0">
                <div>
                  <span>链接：</span>
                  <Input v-model="advertInfo['5'].linkUrl" placeholder="请输入..." style="width: 400px" />
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
                  <Input v-model="advertInfo['6'].advertTitle" placeholder="请输入..." style="width: 400px" />
                </div>
              </div>
              <div class="input-content" style="margin: 20px 0">
                <div>
                  <span>内容：</span>
                  <Input
                    style="width: 400px"
                    v-model="advertInfo['6'].advertDesc"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 5 }"
                    placeholder="请输入..."
                  />
                </div>
              </div>
            </div>
            <div v-if="advertisingSettingsModal.state === 7">
              <p>图片</p>
              <div>
                <uploadFile :img="advertInfo['7'].fileUrl" @click="changeFile('7')" :on-success="uploadSuccess" />
              </div>
              <p style="margin: 8px 0">
                注意：上传图片尺寸为750X1334px，大小不能超过2M
              </p>
              <div class="input-content" style="margin: 20px 0">
                <div>
                  <span>链接：</span>
                  <Input v-model="advertInfo['7'].linkUrl" placeholder="请输入..." style="width: 400px" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {
        updateMFActivityTask,
        updateRule,
        editAdvert,
        getMFActivityTaskDetail
    } from "@/api/freeGoods";
    import Header from "./../com/Header";
    import UploadFile from "./../com/UploadFile";
    import { quillEditor } from "vue-quill-editor";
    import "quill/dist/quill.core.css";
    import "quill/dist/quill.snow.css";
    import "quill/dist/quill.bubble.css";
    import dayjs from 'dayjs';
    const ruleTyps = {
        1: "为选手投票",
        2: "邀请用户",
        3: "既邀请用户且用户需投票"
    };
    const advertAreaIdTypes = {
        5: "投票闪频广告",
        6: "选手继续投票页弹框广告",
        7: "分享链接"
    };
    export default {
        name: "addedit",
        data () {
            return {
                goodsInfo: {},
                editorOption: {
                    height: 600
                },
                baseInfo: {
                    activityTaskId: "", // 活动任务id
                    goodsNum: 0, // 数量
                    taskBeginDt: "", // 任务开始时间
                    taskEndDt: "" // 任务结束时间
                },
                ruleInfo: {
                    ruleDefId: 0, // 规则类型 1：为选手投票，2：邀请用户，3：既邀请用户且用户需投票
                    ruleId: "", // 规则id
                    activityTaskId: "", // 活动任务
                    ruleName: "", // 规则名称
                    eachNum: "", // 人数
                    voteNum: "", // 票数
                    activityRule: "" // 是否为活动规则
                },

                advertInfo: {
                    5: {
                        // 广告信息
                        activityTaskId: "", // 活动任务id
                        advertAreaId: 5, // 广告类型
                        advertId: "",
                        fileId: "", // 广告图片
                        linkUrl: "" // 广告链接
                    },
                    6: {
                        // 广告信息
                        activityTaskId: "", // 活动任务id
                        advertAreaId: 6, // 广告类型
                        fileId: "", // 广告图片id
                        advertTitle: "", // 广告标题
                        advertDesc: "", // 广告内容
                        advertId: "" // 广告id
                    },
                    7: {
                        // 广告信息
                        activityTaskId: "", // 活动任务id
                        advertAreaId: 7, // 广告类型
                        fileId: "", // 广告图片id
                        linkUrl: "" // 广告链接
                    }
                },
                advertisingSettingsModal: {
                    // 广告设置弹窗
                    show: false,
                    state: 5,
                    item: -10
                }
            };
        },
        components: {
            "quill-editor": quillEditor,
            "goods-header": Header,
            uploadFile: UploadFile
        },
        mounted () {
            this.getMFActivityTaskDetail();
        },
        methods: {
            changeRule () {
                this.ruleInfo.eachNum = ''
                this.ruleInfo.voteNum = ''
                this.ruleInfo.ruleName = ''
            },
            async updateMFActivityTask () {
                // 保存基础信息
                console.log(this.baseInfo, this.ruleInfo, this.advertInfo)
                const { activityTaskId, goodsNum, taskBeginDt, taskEndDt } = this.baseInfo
                const query = {
                    activityTaskId,
                    goodsNum,
                    taskBeginDt,
                    taskEndDt,
                    adverts: [],
                    rules: []
                }
                const newRule = JSON.parse(JSON.stringify(this.ruleInfo))
                newRule.ruleName = ruleTyps[newRule.ruleDefId]
                query.rules = [this.ruleInfo]
                const arr = []
                for (let key in this.advertInfo) {
                    arr.push(this.advertInfo[key])
                }
                query.adverts = [...arr]
                if (!taskBeginDt || !taskEndDt) {
                    this.$Message.error("请选择活动时间")
                    return
                }
                if (!goodsNum > 0) {
                    this.$Message.error("请输入数量")
                    return
                }
                if (typeof query.taskBeginDt === 'object') {
                    query.taskBeginDt = dayjs(query.taskBeginDt).format('YYYY-MM-DD HH:mm:ss')
                }
                if (typeof query.taskEndDt === 'object') {
                    query.taskEndDt = dayjs(query.taskEndDt).format('YYYY-MM-DD HH:mm:ss')
                }
                const newQuery = new FormData()
                for (let key in query) {
                    if (typeof query[key] === 'object') {
                        newQuery.append(key, JSON.stringify(query[key]))
                    } else {
                        newQuery.append(key, query[key])
                    }
                }
                const res = await updateMFActivityTask(newQuery);
                if (res.code === 0) {
                    this.$Message.success("编辑成功");
                    setTimeout(() => {
                        this.$router.go(-1)
                    }, 800)
                } else {
                    this.$Message.error(res.data.message || res.msg || "编辑失败");
                }
            },
            async updateRule () {
                // 规则信息保存
                const res = await updateRule(this.ruleInfo);
                if (res.code === 0) {
                    this.$Message.success("规则信息保存成功");
                } else {
                    this.$Message.error(res.data.message || res.msg || "规则信息保存失败");
                }
            },
            async editAdvert () {
                const res = editAdvert(this.advertInfo);
                if (res.code === 0) {
                    this.$Message.success("广告信息保存成功");
                } else {
                    this.$Message.error(res.data.message || res.msg || "广告信息保存失败");
                }
            },
            saveActivity () {
                // 保存
                Promise.all([this.updateMFActivityTask, this.updateRule, this.editAdvert])
                    .then((res) => {
                        this.$Message.success("编辑成功");
                        setTimeout(() => {
                            this.back();
                        }, 1500);
                    })
                    .catch(() => {
                        this.$Message.error("编辑失败");
                });
            },
            async getMFActivityTaskDetail () {
                // 获取任务详情
                const res = await getMFActivityTaskDetail({
                    activityTaskId: this.$route.query.activityTaskId
                });
                if (res.code === 0 && res.data) {
                    this.goodsInfo = res.data;
                    const {
                        taskBeginDt,
                        activityTaskId,
                        activityTaskStateId,
                        activityTaskStateName,
                        goodsNum,
                        taskEndDt,
                        goodsName,
                        sku,
                        activityId,
                        ruleDetail,
                        advertDetail,
                        dbState,
                        dbStateDt,
                        createPartyId,
                        goodsId,
                        receiveGoodsNum,
                        skuId,
                        surplusGoodsNum
                    } = res.data;
                    // 基础信息
                    this.baseInfo.activityId = activityId
                    this.baseInfo.goodsName = goodsName
                    this.baseInfo.activityTaskStateName = activityTaskStateName
                    this.baseInfo.activityTaskStateId = activityTaskStateId
                    this.baseInfo.createPartyId = createPartyId
                    this.baseInfo.dbState = dbState
                    this.baseInfo.sku = sku
                    this.baseInfo.goodsId = goodsId
                    this.baseInfo.dbStateDt = dbStateDt
                    this.baseInfo.taskBeginDt = taskBeginDt;
                    this.baseInfo.activityTaskId = activityTaskId;
                    this.baseInfo.goodsNum = goodsNum;
                    this.baseInfo.taskEndDt = taskEndDt;
                    this.baseInfo.skuId = skuId
                    this.baseInfo.receiveGoodsNum = receiveGoodsNum
                    this.baseInfo.surplusGoodsNum = surplusGoodsNum
                    // 规则设置信息
                    if (ruleDetail && ruleDetail.length > 0) {
                        // ruleInfo
                        const ruleItem = ruleDetail.filter((item) => item.ruleDefId !== 4);
                        console.log('ruleItem:', ruleItem)
                        if (ruleItem && ruleItem.length > 0) {
                            const { ruleId, voteNum, eachNum, ruleDefId, activityRule, ruleEngineTypeId, ruleEngineTypeName } = ruleItem[0];
                            this.ruleInfo.ruleEngineTypeId = ruleEngineTypeId
                            this.ruleInfo.ruleEngineTypeName = ruleEngineTypeName
                            this.ruleInfo.ruleId = ruleId;
                            //  票数
                            this.ruleInfo.voteNum = voteNum;
                            // 人数
                            this.ruleInfo.eachNum = eachNum;
                            this.ruleInfo.ruleDefId = ruleDefId;
                            this.ruleInfo.activityRule = activityRule
                            this.ruleInfo.activityTaskId = activityTaskId;
                        }
                    }

                    // 广告设置
                    if (advertDetail && advertDetail.length > 0) {
                        for (let i = 0; i < advertDetail.length; i++) {
                            const { advertDesc, advertId, advertStateId, advertTitle, createPartyId, dbState, dbStateDt, fileId, fileName, fileUrl, linkUrl, logoPictureId, objectId, objectTypeId } = advertDetail[i]
                            const newobj = {
                                advertDesc, advertId, advertStateId, advertTitle, createPartyId, dbState, dbStateDt, fileId, fileName, fileUrl, linkUrl, logoPictureId, objectId, objectTypeId
                            }
                            this.advertInfo[advertDetail[i].advertAreaId] = Object.assign({}, this.advertInfo[advertDetail[i].advertAreaId], newobj)
                        }
                    }
                }
                console.log("res:", res);
            },
            changeFile (index) {
                this.advertisingSettingsModal.item = index
            },
            uploadSuccess (file) {
                const { fileId, fileUrl } = file
                this.advertInfo[this.advertisingSettingsModal.item].fileId = fileId
                this.advertInfo[this.advertisingSettingsModal.item].fileUrl = fileUrl
                // 图片上传成功
                // 判断广告类型
            },

            back () {
                // 返回
                this.$router.go(-1);
            }
        }
    };
</script>

<style lang="less" scoped>
// 1356
.mr16 {
  margin-right: 16px;
}

.container {
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
    width: 26%;
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
          box-sizing: border-box;
          padding: 6px 10px;
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
