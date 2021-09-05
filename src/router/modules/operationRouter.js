import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'operation-';

export default {
    path: '/operation',
    name: `operation`,
    redirect: {
        name: `operation`
    },
    meta,
    component: BasicLayout,
    children: [
        {
            path: 'index',
            name: `${pre}index`,
            meta: {
                ...meta,
                title: '运营首页'
            },
            component: () => import('@/pages/operationCenter/index/index')
        }

    ]
};
