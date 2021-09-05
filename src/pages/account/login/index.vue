<template>
    <div class="page-account">
        <div class="page-account-container">
            <div class="flex-1">
                <div class="flex bg-white uba-4 " style="height:500px">
                    <div class="login-img-icon h100 p-lr30 p-tb30 text-left">
                        <div class="img-line"></div>
                        <div class="fs-28 color-white p-tb20 f-fz">数字化大脑</div>
                        <div class="fs12 color-white f-fz">
                            专注中小企业“数字化大脑”，建立以“诊断+跟踪”为主体业务模式。 以“数据+方案+技术”为核心优势打造企业大脑，全面提升企业的利润及管理能力
                        </div>
                    </div>
                    <div class="flex-1  h100">
                        <div class="p-lr40 p-tb40 h100">
                            <div class="login-name text-center">登录</div>
                        <Login @on-submit="handleSubmit">
                            <UserName name="username" value="" />
                            <Captcha name="captcha" :field="['username']"  text="点击获取" @on-get-captcha="handleGetCaptcha" />
                            <div class="page-account-auto-login m-b40 flex">
                                <Checkbox v-model="autoLogin" size="large">{{ $t('page.login.remember') }}</Checkbox>
                                <!-- <a href="">{{ $t('page.login.forgot') }}</a> -->
                                <div class="flex-1 text-right">

                <!-- <router-link class="page-account-register" :to="{ name: 'register' }">{{ $t('page.login.signup') }}</router-link> -->
                                </div>
                            </div>
                            <Submit class="login-btns" shape="circle">{{ $t('page.login.submit') }}</Submit>
                        </Login>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    import iCopyright from '@/components/copyright';
    import { mapActions } from 'vuex';
    import mixins from '../mixins';
    import util from '@/libs/util'
    import { querySystemStatus, generatorList } from '@/api/account'
    export default {
        mixins: [ mixins ],
        components: { iCopyright },
        data () {
            return {
                autoLogin: true
            }
        },
        mounted () {
            /* querySystemStatus({}).then(res => {
                console.log(res)
            }) */
            generatorList({
                page:1,
                limit:10,
                order: 'order'
            }).then(res => {
                console.log(res)
            })
        },
        methods: {
            ...mapActions('admin/account', [
                'login'
            ]),
            /**
             * @description 登录
             * 表单校验已有 iView Pro 自动完成，如有需要修改，请阅读 iView Pro 文档
             */
            handleSubmit (valid, values) {
                let self = this;
                if (valid) {
                    const { username, password } = values;
                    util.cookies.set('token', 'A68NUPaXVBJYRStwvd9frcUn8rlf30h6');
                    // console.log(this.$store.state.admin.user)
                    this.$store.dispatch('admin/user/set', {
                        name: 'Admin',
                        headPictureUrl: 'http://cdn.ywsj.cn/wx/userHeaderDefault.png',
                        access: ['admin']
                    })
                    self.$router.replace(self.$route.query.redirect || '/');
                    return
                    util.ajax({
                        method: 'post',
                        url: 'common/service.execute.json',
                        data: {
                            _call: 'sys.memberService.login',
                            params: {
                                'loginType': 1,
                                'loginName': username,
                                'loginPwd': password
                            }
                        }
                    }).then(function (response) {
                        console.log(response)
                        util.cookies.set('uuid', response.output.memberId);
                        util.cookies.set('token', response.output.loginToken);
                        util.cookies.set('loginToken', response.output.loginToken);
                        util.cookies.set('companyCode', '1');
                        // Cookies.set('loginToken', response.data.output.loginToken);
                        response.output.moblieNumber = username;
                        /* this.$store.dispatch('admin/user/set', {
                            name: 'Aresn',
                            avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                            access: ['admin']
                        }) */
                        self.$store.dispatch('admin/user/set', response.output);
                        self.$router.replace(self.$route.query.redirect || '/');
                    })
                }
            },
            // 获取验证码
            handleGetCaptcha (value, values) {
                console.log(value, values)
                console.log('11')
                // if () {}
                util.ajax({
                    data: {
                        _call: 'sys.memberService.sendValidCode',
                        params: {
                            mobileNbr: values.username
                        }
                    }
                }).then(res => {
                    if (res.output.flag) {
                        this.$Message.info('发送验证码成功');
                    } else {
                        this.$Message.error(res.output.msg)
                    }
                })
            }
        }
    };
</script>
