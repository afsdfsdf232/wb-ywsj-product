import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'index-';

export default {
    path: '/index',
    name: 'index',
    redirect: {
        name: `index`
    },
    meta,
    component: BasicLayout,
    children: [{
        path: 'index',
        name: `${pre}index`,
        meta: {
            ...meta,
            title: '首页',
            closable: false
        },
        component: () => import('@/pages/index/index')
    }]
};
