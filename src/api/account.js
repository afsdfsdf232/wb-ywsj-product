import request from '@/plugins/request';

export function AccountLogin (data) {
    return request({
        url: '/api/login',
        method: 'post',
        data
    });
}

export function AccountRegister (data) {
    return request({
        url: '/api/register',
        method: 'post',
        data
    });
}
export function querySystemStatus (data) {
    return request({
        url: '/adminUser/querySystemStatus',
        method: 'post',
        data
    });
}
export function generatorList (data) {
    return request({
        url: '/sys/generator/list',
        method: 'get',
        data
    });
}
