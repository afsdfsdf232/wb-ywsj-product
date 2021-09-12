import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'free-';

export default {
    path: '/freeGoods',
    name: `freeGoods`,
    redirect: {
        name: `freeGoods`
    },
    meta,
    component: BasicLayout,
    children: [
        {
            path: 'index',
            name: `${pre}Goods-index`,
            meta: {
                ...meta,
                title: '免费领商品'
            },
            redirect: {
                name: `${pre}Goods-list`
            },
            component: () => import('@/pages/operationCenter/freeGoods/index'),
            children: [
                {
                    meta: {
                        ...meta,
                        title: '免费领商品'
                    },
                    path: 'list',
                    component: () => import('@/pages/operationCenter/freeGoods/index/indexSp.vue'),
                    name: `${pre}Goods-list`
                },
                {
                    path: 'detail',
                    name: `${pre}Goods-detail`,
                    meta: {
                        ...meta,
                        hiddenTag: true,
                        title: '详情'
                    },
                    component: () => import('@/pages/operationCenter/freeGoods/detail')
                },
                {
                    path: 'add',
                    name: `${pre}Goods-add`,
                    meta: {
                        ...meta,
                        hiddenTag: true,
                        title: '新增编辑'
                    },
                    component: () => import('@/pages/operationCenter/freeGoods/AddEdit')
                },
                {
                    path: 'taskManagement',
                    name: `${pre}Goods-taskManagement`,
                    meta: {
                        ...meta,
                        hiddenTag: true,
                        title: '任务管理'
                    },
                    component: () => import('@/pages/operationCenter/freeGoods/taskManagement')
                },
                {
                    path: 'receiveStatistics',
                    name: `${pre}Goods-receiveStatistics`,
                    meta: {
                        ...meta,
                        hiddenTag: true,
                        title: '奖励统计'
                    },
                    component: () => import('@/pages/operationCenter/freeGoods/receiveStatistics')
                },
                {
                    path: 'editTask',
                    name: `${pre}Goods-editTask`,
                    meta: {
                        ...meta,
                        hiddenTag: true,
                        title: '编辑任务'
                    },
                    component: () => import('@/pages/operationCenter/freeGoods/editTask')
                }
            ]
        }
    ]
};
