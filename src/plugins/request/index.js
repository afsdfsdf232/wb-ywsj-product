import store from '@/store';
import axios from 'axios';
import util from '@/libs/util';
import Setting from '@/setting';
import Qs from 'qs';
import { Message, Notice } from 'view-design';
import router from '@/router';
// 创建一个错误
function errorCreate(msg = '服务器内部错误') {
    console.log(msg)
    const err = new Error(msg);
    errorLog(err);
    throw err;
}

// 记录和显示错误
function errorLog(err) {
    // 添加到日志
    store.dispatch('admin/log/push', {
        message: '数据请求异常',
        type: 'error',
        meta: {
            error: err
        }
    });
    // 打印到控制台
    if (process.env.NODE_ENV === 'development') {
        util.log.error('>>>>>> Error >>>>>>');
        console.log(err);
    }
    // 显示提示，可配置使用 iView 的 $Message 还是 $Notice 组件来显示
    if (Setting.errorModalType === 'Message') {
        Message.error({
            content: err.message || err.msg,
            duration: Setting.modalDuration
        });
    } else if (Setting.errorModalType === 'Notice') {
        Notice.error({
            title: '提示',
            desc: err.message,
            duration: Setting.modalDuration
        });
    }
}
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// 创建一个 axios 实例
const service = axios.create({
    // baseURL: process.env.VUE_APP_BASE_URL,
    baseURL: '',///Setting.apiBaseURL,
    // baseURL: 'http://localhost:8081' + '/api',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: ' eyJhbGciOiJIUzUxMiJ9.eyJzZWxmT3BlcmF0ZWQiOjAsInVpZCI6MTQzNTE4Mzc5OTM4OTM5Mjg5Nywic3ViIjoidXNlciIsInNlbGxlcklkIjoxNDMyNjI1NDg2Nzg5MzQ5Mzc4LCJmb3VuZGVyIjowLCJyb2xlcyI6WyJCVVlFUiIsIlNFTExFUiIsIkNMRVJLIiwiU0VMTEVSX-i2hee6p-euoeeQhuWRmCJdLCJzZWxsZXJOYW1lIjoi5byA5b-D5byA5b-DIiwiY2xlcmtJZCI6bnVsbCwiY2xlcmtOYW1lIjoiYWRtaW4iLCJleHAiOjE2MzE1NDM5MDUsInV1aWQiOm51bGwsInVzZXJuYW1lIjoiYWRtaW4ifQ.01RfXlcRmODbUzHwtO031AbCTPB5n6O9rwUceR77vW26Rp6JaqHIUVeKrZOP2RCorEkFHrUFCSQAREbdmY3fyg'
        ,uuid: '86444eb0-12ef-11ec-a07b-256862264a29'
        // 'Content-Type': 'application/json'
    },
    // 'type': 'json',
    timeout: 60000 // 请求超时时间
})

service.interceptors.request.use(
    config => {
        // 在请求发送之前做一些处理
        const token = util.cookies.get('token');
        // axios.defaults.headers.common['token'] = token;
        // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
        // config.headers['Cookies'] = 'JSESSIONID=' + token;
        config = {
            ...config,
            header: {
                // uuid,
                timeOffset: 60000,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        if (config.method === 'get') {
            config.headers['Content-Type'] = 'application/json'
        }
        // json 提交
        if (config.isJson) {
            console.log('config:', config)
            config = {
                ...config,
                header: {
                    // uuid,
                    timeOffset: 60000,
                    "Content-Type": 'application/json'
                }
            }
        }
        // config.data = JSON.parse(config.data)
        config.data.token = token
        const comppanyId = util.cookies.get('companyId');
        if (config.data.companyId === undefined || config.data.companyId === null) {
            config.data.companyId = comppanyId
        }

        if (config.data.type === 'json') {
            // config.data = JSON.stringify(config.data)
        } else {
            if (config.method.toLocaleLowerCase() === 'post') {
                if (config.hiddenFormData) {
                    config.data = config.data
                } else {
                    config.data = Qs.stringify(config.data)
                }

            } else {
                // config.params = Qs.stringify(JSON.stringify(config.data));
                config.params = config.data
            }
        }

        return config;
    },
    error => {
        // 发送失败
        console.log(error);
        Promise.reject(error);
    }
);
let isLoginDD = false
// 响应拦截器
service.interceptors.response.use(
    response => {
        // dataAxios 是 axios 返回数据中的 data
        const dataAxios = response.data;
        // 这个状态码是和后端约定的
        const { code } = dataAxios;
        // console.log(code)
        let url = response.request.responseURL
        if (/\/user\/onLogin/.test(url) && Setting.isDDLogin) {
            console.log('没有登录')
            if (sessionStorage.getItem('isNologinNum')) {
                return false
            } else {
                isLoginDD = true
            }

            sessionStorage.setItem('isNologinNum', true)
            util.ddLoginFun(() => {
                isLoginDD = false
            })
            return false
        }
        // 根据 code 进行判断
        if (dataAxios.code === undefined) {
            // 如果没有 code 代表这不是项目后端开发的接口
            return response;
        } else {
            // 有 code 代表这是一个后端接口 可以进行进一步的判断
            if (dataAxios.code === 0) {
                return dataAxios;
            } else {
                errorCreate(`${response.data.data.msg || response.data.message}`);
            }
            /* switch (code) {
            case 200:
                // [ 示例 ] code === 0 代表没有错误
                return dataAxios;
            case 601:
                // [ 示例 ] 其它和后台约定的 code
                return dataAxios;
            default:
                // 不是正确的 code
                errorCreate(`${dataAxios.msg}`);
                break;
            } */
        }
    },
    error => {
        if (error && error.response) {
            switch (error.response.status) {
                case 400: error.message = '参数验证错误'; break;
                case 302: error.message = '请先登录！'; break;
                case 401: error.message = '无权操作'; break;
                case 403: error.message = '拒绝访问'; break;
                case 404: error.message = `资源未找到: ${error.response.config.url}`; break;
                case 408: error.message = '请求超时'; break;
                case 405: error.message = '请求方式错误'; break;
                case 500: error.message = '网络错误，请稍候再试'; break;
                case 1001: error.message = '服务调用异常'; break;
                case 1003: error.message = '参数不存在'; break;
                case 1004: error.message = '文件上传失败'; break;
                case 504: error.message = '网关超时'; break;
                case 505: error.message = 'HTTP版本不受支持'; break;
                default: break;
            }
        }
        errorLog(error);
        return Promise.reject(error);
    }
);

export default service;
