<template>
   <div class=''>
       <PageHeader title="员工管理" class="p-lr8" hidden-breadcrumb ref="headers" label-width="auto">
            <div slot="action">
                <!-- <Button type="primary" class="m-r10" @click="addProject">新增项目</Button> -->
                <Button type="primary"  @click="addBtn">新增人员</Button>
            </div>
        </PageHeader>
        <search-form  ref="searchForm" :queryFieids="search.queryFieids" :search="search.search" :formBtn="search.formBtn"></search-form>
        <div class="p-lr12 bg-white">
            <Row>
                <Col span="6">
                    <div class="vux p-b10 uba-4" :style="{height:computedHeight + 40 + 'px'}">
                        <div class="h40 flex vux-b p-lr12">
                            <div class="flex-1">项目列表</div>
                            <div>
                                <Tooltip content="删除">
                                    <Icon type="md-trash" class="cursor" @click="deleteDepte" size="18" color="#ed4014" />
                                </Tooltip>
                                <Tooltip content="编辑">
                                    <Icon type="ios-create-outline"  @click="editorDept" class="m-l6 cursor" size="18" color="#439EFB" />
                                </Tooltip>
                                <Tooltip content="新增项目">
                                    <Icon type="md-add" size="18" @click="addProject"  class="m-l6 cursor" color="#439EFB" />
                                </Tooltip>
                            </div>
                        </div>
                        <div class="tree-box p-lr12 demo-tree-render" :style="{height:computedHeight + 'px'}">
                            <Tree :data="projectListData" ref="deptTree" @on-select-change="changeTreeDept"></Tree>
                        </div>
                    </div>
                </Col>
                <!-- 员工列表 start -->
                <Col span="18" class="p-l12">
                    <Table :columns="table.columns" ref="tableList" :loading="table.loading" @on-selection-change="selectTable" :data="table.data" :height="computedHeight">
                        <template slot-scope="{row,index}" slot="option">
                            <Button type="primary" size="small" class="table-btn" @click.stop="tableBtn(row, 2)">编辑</Button>
                            <span class="p-lr4 color-blue">|</span>
                            <Button type="primary" size="small" class="table-btn" @click.stop="tableBtn(row, 1)">移除</Button>
                        </template>
                    </Table>
                    <!-- 分页 -->
                    <pagination ref="pagination" :pageIndex="table.pageIndex" @onfreshPage="getInit"  :pageSize="table.pageSize" :total="table.total">
                        <div v-if="table.columns[0].type == 'selection'">
                            <Button type="error" class="m-r10" @click="batchBtn(1)">批量删除</Button>
                        </div>
                    </pagination>
                </Col>
                <!-- 员工列表 end -->
            </Row>
        </div>
        <!-- 新增员工 -->
        <Modal v-model="addModal.show" :mask-closable="false" title="添加人员" class-name="vertical-center-modal">
            <div class="p-lr30">
                <Form ref="addFormEle" :model="addModal.formData" :rules="addModal.createRules" :label-width="80" class="p-t10">
                    <FormItem label="姓名" prop="name">
                        <Input v-model="addModal.formData.name" maxlength="24"></Input>
                    </FormItem>
                    <!-- <FormItem label="描述" prop="desc" >
                        <Input v-model="addModal.formData.desc" type="textarea" maxlength="500" :autosize="{minRows: 2,maxRows: 5}" placeholder="描述" />
                    </FormItem> -->
                </Form>
            </div>
            <div slot="footer">
                <Button @click="addModal.show = false;">取消</Button>
                <Button type="primary" :loading="addModal.loading" @click="saveLoginData">确定</Button>
            </div>
        </Modal>
   </div>
</template>

<script>
    import { ywdemoListByPage, addYwDemo, updateYwDemo, delYwDemo } from '@/api/staffApi'
    export default {
        name: 'staffManage',
        components: {},
        data () {
            // 验证部门
            let validateDepartment = (rule, value, callback) => {
                // console.log(value);
                if (value.length === 0) {
                    callback(new Error('请选择所在部门'));
                } else {
                    callback();
                }
            }
            let ths = this
            let typeData = [
                {
                    id: ' ',
                    label: '全部'
                },
                {
                    id: '业务员',
                    label: '业务员'
                },
                {
                    id: '仓管员',
                    label: '仓管员'
                },
                {
                    id: '财务员',
                    label: '财务员'
                }
            ]
            return {
                computedHeight: 500,                // 表格内容高度
                search: {
                    formBtn: [                      // 搜索框按钮
                        { label: '查询', class: 'normal-btn', handle: ths.getSearch, type: 'primary' },
                        { label: '重置', class: 'normal-btn', handle: ths.getSearchRest }
                    ],
                    queryFieids: [                  // 搜索框字段
                        { type: 'Input', label: '姓名', prop: 'name' },
                        { type: 'Select', label: '类型', prop: 'type', option: typeData }
                    ],
                    search: {                       // 搜索值
                        name: '',                   // 姓名
                        type: ''                    // 类型
                    }
                },
                table: {
                    pageIndex: 1,                   // 当前页
                    pageSize: 10,                   // 每页数
                    total: 0,                       // 总数
                    loading: false,                 // 加载动画
                    data: [],                     // 表格数据
                    columns: [                      // 表格头部配置
                        {
                            type: 'selection',
                            width: 60,
                            align: 'center',
                            title: '序号'
                        },
                        {
                            type: 'index',
                            width: 60,
                            align: 'center',
                            title: '序号'
                        },
                        {
                            key: 'name',
                            align: 'center',
                            title: '姓名'
                        },
                        {
                            key: 'createDt',
                            align: 'center',
                            title: '创建时间'
                        },
                        {
                            slot: 'option',
                            align: 'center',
                            width: 120,
                            title: '操作'
                        }
                    ]
                },
                projectListData: [ // 项目数据
                    {
                        title: 'parent 1',
                        value: 1,
                        expand: true,
                        children: [
                            {
                                title: 'parent 1-1',
                                expand: true,
                                value: 2,
                                children: [
                                    {
                                        title: 'leaf 1-1-1',
                                        value: 3
                                    },
                                    {
                                        title: 'leaf 1-1-2',
                                        value: 4
                                    }
                                ]
                            }
                        ]
                    }
                ],
                addModal: {                         // 新增模态框
                    title: '新增',                  // 模态框标题
                    show: false,                    // 模态框显示状态
                    loading: false,                 // 模态框保存按钮加载
                    formData: {                     // 表单数据
                        name: ''
                    },
                    createRules: {                  // 表单验证规则
                        name: [
                            { required: true, message: '请输入名称', trigger: 'blur' }
                        ],
                        orgData: [
                            { validator: validateDepartment, required: true, trigger: 'change' }
                        ]
                    }
                },
                selectedData: [],
                projectId: '' // 项目id
            }
        },
        // 生命周期 - 创建完成
        created () {
            this.getInit()
        },
        // 监控data中的数据变化
        watch: {},
        // 方法集合
        methods: {
            // 获取初始化页面方法
            getInit (params) {
                if (typeof params === 'object') {
                    // 分页触发的改变
                    Object.assign(this.table, params)
                }
                this.table.loading = false
                ywdemoListByPage({
                    page: this.table.pageIndex,
                    limit: this.table.pageSize,
                    projectId: this.projectId,
                    ...this.search.search
                }).then(res => {
                    console.log(res)
                    this.table.loading = false

                    this.table.total = res.data.total
                    this.table.data = res.data.list || []
                })
            },
            // 点击搜索
            getSearch (type) {
                this.table.pageIndex = 1
                this.getInit()
            },
            // 重置
            getSearchRest () {
                this.table.pageIndex = 1
                this.search.search = {
                    name: ''
                }
                this.getInit()
            },
            // 选择表格
            selectTable (selection) {
                console.log(selection)
                this.selectedData = selection
            },
            changeTreeDept (tree, treeCurrent) {
                console.log(treeCurrent)
                this.projectId = treeCurrent.value
                this.table.pageIndex = 1
                this.getInit()
            },
            // 删除项目
            deleteDepte () {
                let info = this.$refs.deptTree.getSelectedNodes()
                console.log(info)
                if (info.length === 0 || !info[0].projectId) {
                    this.$Message.error('请选择要删除的项目');
                    return false
                }
                let self = this
                this.$Modal.confirm({
                    title: `确定要删除 ${info[0].projectName} 项目吗?`,
                    onOk () {
                        /* projectDel({
                            projectId: info[0].projectId
                        }).then(res => {
                            self.$Message.success('项目删除成功');
                            self.projectList()
                        }) */
                    }
                })
            },
            // 编辑项目
            editorDept () {
                let info = this.$refs.deptTree.getSelectedNodes()
                console.log(info)
                if (info.length === 0 || !info[0].projectId) {
                    this.$Message.error('请选择要编辑的项目');
                    return false
                }
            },
            // 新增项目
            addProject () {

            },
            // 移除人员 编辑人员
            tableBtn (row, type) {
                let self = this
                if (type === 1) {
                    this.$Modal.confirm({
                        title: `确定要移除 ${row.staffName || ''} 吗?`,
                        onOk () {
                            console.log('删除')
                            delYwDemo({
                                ids: row.id
                            }).then(res => {
                                self.$Message.success('移除成功');
                                self.getInit()
                            })
                        }
                    })
                } else if (type === 2) {
                    this.addModal.title = '编辑'
                    this.$refs.addFormEle.resetFields()
                    this.addModal.formData = {
                        name: row.name,
                        id: row.id
                    }
                    this.addModal.show = true
                }
            },
            // 新增
            addBtn () {
                this.addModal.title = '新增'
                this.$refs.addFormEle.resetFields()
                this.addModal.formData = {
                    name: ''
                }
                this.addModal.show = true
            },
            // 保存人员
            async saveLoginData () {
                this.$refs.addFormEle.validate(async (valid) => {
                    if (valid) {
                        console.log(this.addModal.formData)
                        this.addModal.loading = true
                        let res = ''
                        if (this.addModal.formData.id) {
                            res = await updateYwDemo(this.addModal.formData)
                        } else {
                            res = await addYwDemo(this.addModal.formData)
                        }
                        if (res.code === 0) {
                            this.addModal.loading = false
                            this.addModal.show = false
                            this.table.pageIndex = 1
                            this.getInit()
                        } else {
                            this.$Message.error(res.message);
                        }
                    }
                })
            },
            // 批量删除
            batchBtn () {
                if (this.selectedData.length === 0) {
                    this.$Message.error('请先选择要删除的数据');
                    return false
                }
                let ids = []
                this.selectedData.map(ite => {
                    ids.push(ite.id)
                })
                this.$Modal.confirm({
                    title: `确定要批量删除选中的数据吗?`,
                    onOk () {
                        console.log('删除')
                        delYwDemo({
                            ids: ids.join(',')
                        }).then(res => {
                            if (res.code === 0) {
                                this.$Message.success('删除成功');
                                this.getInit()
                            } else {
                                this.$Message.error(res.message);
                            }
                        })
                    }
                })
            },
            getContentH () {
                let datas = []
                if (this.$refs.headers) datas.push(this.$refs.headers)
                if (this.$refs.pagination) datas.push(this.$refs.pagination)
                if (this.$refs.searchForm) datas.push(this.$refs.searchForm)
                this.computedHeight = this.$util.resizeElementH(datas)
            }
        },
        // 生命周期 - 挂载完成（可以访问DOM元素）
        mounted () {
            // 动态设置子组件高度
            this.$nextTick(() => {
                this.getContentH()
            })
            // 监听浏览器高度变化计算内容高度
            window.addEventListener('resize', () => {
                this.getContentH()
            })
        }
    }
</script>
<style lang='less' scoped>
    .tree-box {
        overflow-y: auto;
    }

</style>
<style>
    .demo-tree-render {
        overflow-y: auto;
        overflow-x: hidden;
    }
    .demo-tree-render .ivu-tree-title{
        width: 100%;
        /* padding: 6px 4px; */
    }
    .demo-tree-render .ivu-tree-arrow {
        position: relative;
        /* top: 4px; */
    }
    .demo-tree-render ul li {
        padding: 2px 0;
        margin-bottom: 0;
    }
</style>
