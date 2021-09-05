<template>
    <span class="i-layout-header-trigger i-layout-header-trigger-min">
        <Dropdown :trigger="isMobile ? 'click' : 'hover'" class="i-layout-header-user" :class="{ 'i-layout-header-user-mobile': isMobile }" @on-click="handleClick">
            <Avatar  :src="info.headPictureUrl" v-if="info.headPictureUrl" />
            <span class="i-layout-header-user-name" v-if="!isMobile">{{ info.staffName || info.name }}</span>
            <DropdownMenu slot="list">
               <!--  <i-link to="/setting/user">
                    <DropdownItem>
                        <Icon type="ios-contact-outline" />
                        <span>{{ $t('basicLayout.user.center') }}</span>
                    </DropdownItem>
                </i-link> -->
                 <DropdownItem name="center">
                        <Icon type="ios-contact-outline" />
                        <span>修改密码</span>
                    </DropdownItem>
              <!--   <i-link to="/setting/account">
                    <DropdownItem>
                        <Icon type="ios-settings-outline" />
                        <span>{{ $t('basicLayout.user.setting') }}</span>
                    </DropdownItem>
                </i-link> -->
                <DropdownItem name="setting">
                        <Icon type="ios-settings-outline" />
                        <span>修改信息</span>
                    </DropdownItem>
                <DropdownItem divided name="logout">
                    <Icon type="ios-log-out" />
                    <span>{{ $t('basicLayout.user.logOut') }}</span>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <Modal
            v-model="passwordModal"
            title="修改密码">
            <Form ref="formValidate" label-colon :model="formValidate" :rules="ruleValidate" :label-width="120">
                <FormItem label="旧密码" prop="password">
                    <Input v-model="formValidate.password" min="6" max="16" placeholder=""></Input>
                </FormItem>
                <FormItem label="新密码" prop="password1">
                    <Input v-model="formValidate.password1" min="6" max="16" placeholder=""></Input>
                </FormItem>
                 <FormItem label="确认新密码" prop="password2">
                    <Input v-model="formValidate.password2" min="6" max="16" placeholder=""></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="passwordModal = false">取消</Button>
                <Button type="primary" @click="submitBtn()">确定</Button>
            </div>
        </Modal>
        <Modal
            v-model="infoFlag"
            title="修改信息">
            <Form ref="InfoValidate" label-colon :model="InfoValidate" :rules="InfRulesValidate" :label-width="120">
                <FormItem label="用户姓名" prop="staffName">
                    <Input v-model="InfoValidate.staffName" maxlength="8" placeholder=""></Input>
                </FormItem>
                <FormItem label="手机号" prop="moblieNumber">
                    <Input v-model="InfoValidate.moblieNumber" type="number" maxlength="11" placeholder=""></Input>
                </FormItem>
                 <FormItem label="邮箱" prop="email">
                    <Input v-model="InfoValidate.email" placeholder=""></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="infoFlag = false">取消</Button>
                <Button type="primary" @click="infoSaveBtn()">确定</Button>
            </div>
        </Modal>
    </span>
</template>
<script>
    import { mapState, mapActions } from 'vuex';
    import util from '@/libs/util'
    export default {
        name: 'iHeaderUser',
        data () {
            return {
                passwordModal: false,
                infoFlag: false,
                formValidate: {
                    password: '',
                    password1: '',
                    password2: ''
                },
                ruleValidate: {
                    password: [
                        { required: true, message: '旧密码不能为空', trigger: 'blur' },
                        { type: 'string', min: 6, message: '最小长度6位', trigger: 'blur' }
                    ],
                    password1: [
                        { required: true, message: '新密码不能为空', trigger: 'blur' }
                        // { type: 'string', min: 6, message: '最小长度6位', trigger: 'blur' }
                    ],
                    password2: [
                        { required: true, message: '确认新密码不能为空', trigger: 'blur' },
                        { type: 'string', min: 6, message: '最小长度6位', trigger: 'blur' }
                    ]
                },
                InfoValidate: {
                    staffName: '',
                    moblieNumber: '',
                    email: ''
                },
                InfRulesValidate: {
                    staffName: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                    moblieNumber: [
                        { required: true, message: '手机号不能为空', trigger: 'blur' },
                        { type: 'string', message: '手机号格式输入错误', trigger: 'blur', pattern: util.mobileReg }
                    ],
                    email: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'string', message: '邮箱格式输入错误', trigger: 'blur', pattern: util.emailReg }
                    ]
                }
            }
        },
        computed: {
            ...mapState('admin/user', [
                'info'
            ]),
            ...mapState('admin/layout', [
                'isMobile',
                'logoutConfirm'
            ])
        },
        methods: {
            ...mapActions('admin/account', [
                'logout'
            ]),
            submitBtn () {
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                        this.passwordModal = false;
                    } else {
                        this.$Message.error('请输入必填项');
                    }
                })
            },
            // 保存信息
            infoSaveBtn () {
                this.$refs.InfoValidate.validate((valid) => {
                    if (valid) {
                        util.ajax({
                            data: {
                                _call: 'im.imService.editMyData',
                                params: this.InfoValidate
                            }
                        }).then(res => {
                            if (res.output.flag) {
                                this.$Message.success('修改成功');
                                let info = {};
                                Object.assign(info, this.info, this.InfoValidate);
                                this.$store.dispatch('admin/user/set', info);
                                this.infoFlag = false;
                            }
                        })
                    } else {
                        this.$Message.error('请输入必填项');
                    }
                })
            },
            handleClick (name) {
                if (name === 'logout') {
                    this.logout({
                        confirm: this.logoutConfirm,
                        vm: this
                    });
                } else if (name === 'center') {
                    // 重置表单
                    this.$refs.formValidate.resetFields();
                    this.passwordModal = true;
                } else if (name === 'setting') {
                    this.$refs.InfoValidate.resetFields();
                    this.InfoValidate.staffName = this.info.staffName;
                    this.InfoValidate.moblieNumber = this.info.moblieNumber;
                    this.InfoValidate.email = this.info.email || '';
                    this.infoFlag = true;
                }
            }
        },
        mounted () {
            console.log(this.info);
            this.InfoValidate.staffName = this.info.staffName;
            this.InfoValidate.moblieNumber = this.info.moblieNumber;
            this.InfoValidate.email = this.info.email || '';
            console.log('this.InfoValidate', this.InfoValidate)
        }
    }
</script>
