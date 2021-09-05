import request from '@/plugins/request';

// 获取列表数据
export function ywdemoListByPage (data) {
    return request({
        url: '/generator/ywdemo/listByPage',
        method: 'get',
        data
    });
}
// 新增
export function addYwDemo (data) {
    return request({
        url: '/generator/ywdemo/addYwDemo',
        method: 'get',
        data
    });
}
// 编辑
export function updateYwDemo (data) {
    return request({
        url: '/generator/ywdemo/updateYwDemo',
        method: 'get',
        data
    });
}
// 删除
export function delYwDemo (data) {
    return request({
        url: '/generator/ywdemo/delYwDemo',
        method: 'get',
        data
    });
}
