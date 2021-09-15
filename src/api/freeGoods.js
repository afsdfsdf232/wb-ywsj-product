import request from '@/plugins/request';

export function AccountLogin(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  });
}
// 分页列表
export function getMFActivityListByPageList(data) {
  return request({
    url: '/freeApi/MFActivity/queryMFActivityListByPage',
    method: 'post',
    data
  })
}

// 发布活动 
export function releaseMFActivity(data) {
  return request({
    url: '/freeApi/MFActivity/releaseMFActivity',
    method: 'post',
    data
  })
}

// 删除活动
export function delMFActivity(data) {
  return request({
    url: '/freeApi/MFActivity/delMFActivity',
    method: 'post',
    data
  })
}

// 取消发布活动
export function cancelReleaseMFActivity(data) {
  return request({
    url: '/freeApi/MFActivity/cancelReleaseMFActivity',
    method: 'post',
    data
  })
}

// 停止活动
export function stopMFActivity(data) {
  return request({
    url: '/freeApi/MFActivity/stopMFActivity',
    method: 'post',
    data
  })
}

// 新建活动
export function addMFActivity(data) {
  return request({
    url: '/freeApi/MFActivity/addMFActivity',
    method: 'post',
    data,
    hiddenFormData: true
  })
}

// 查询投票活动列表
export function queryVoteActivityList(data) {
  return request({
    url: '/freeApi/MFActivity/queryVoteActivityList',
    method: 'post',
    data,
    
  })
}

// 获取商品分类，新增
export function getGoodsTypesList(data) {
  return request({
    url: 'https://api.javamall.com.cn/seller/seller/goods/skus',
    method: 'get',
    isJson: true,
    data
  })
}

// 店铺分组
export function getGoodsCategoryList(data) {
  return request({
    url: 'https://api.javamall.com.cn/seller/seller/shops/cats',
    method: 'get',
    data,
    isJson: true
  })
}
// 查询任务管理列表
export function getMFActivityTaskListByPage(data) {
  return request({
    url: '/freeApi/MFActivity/queryMFActivityTaskListByPage',
    data,
    method: 'post'
  })
}
// 删除任务
export function delMFActivityTask(data) {
  return request({
    url: '/freeApi/MFActivity/delMFActivityTask',
    data,
    method: 'post'
  })
}

// 编辑任务基本信息 
export function updateMFActivityTask(data) {
  return request({
    url: '/freeApi/MFActivity/updateMFActivityTask',
    data,
    method: 'post'
  })
}

// 编辑任务规则
export function updateRule(data) {
  return request({
    url: '/freeApi/rule/updateRule',
    data,
    method: 'post'
  })
}

// 编辑广告设置
export function editAdvert(data) {
  return request({
    url: '/freeApi/advert/editAdvert',
    data,
    method: 'post'
  })
}

// 图片上传
export function fileUpload(data) {
  return request({
    url: '/uploadApi/activityfileupload/file/fileUpload',
    method: 'post',
    data,
    hiddenFormData: true
  })
}

// 获取任务详情
export function getMFActivityTaskDetail(data) {
  return request({
    url: '/freeApi/MFActivity/queryMFActivityTaskDetail',
    data,
    method: 'post'
  })
}


// 获取招商商品列表
export function getSupportGoodsList(data) {
  return request({
    url: '/freeApi/MFActivity/querySupportGoodsList',
    method: 'post',
    data
  })
}

// 查询领取统计列表
export function getMFActivityTaskReceiveListByPage(data) {
  return request({
    url: '/freeApi/MFActivity/queryMFActivityTaskReceiveListByPage',
    data,
    method: 'post'
  })
}
