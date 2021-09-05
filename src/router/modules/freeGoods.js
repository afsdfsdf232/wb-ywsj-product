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
            component: () => import('@/pages/operationCenter/freeGoods/index')
        },
        {
            path: 'detail',
            name: `${pre}Goods-detail`,
            meta: {
                ...meta,
                title: '详情'
            },
            component: () => import('@/pages/operationCenter/freeGoods/detail')
        }
    ]
};
