import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'sponsorManage-';

export default {
    path: '/sponsorManage',
    name: `sponsorManage`,
    redirect: {
        name: `sponsorManage`
    },
    meta,
    component: BasicLayout,
    children: [
        {
            path: 'sponsorData',
            name: `${pre}sponsorData`,
            meta: {
                ...meta,
                title: '主办方资料'
            },
            component: () => import('@/pages/operationCenter/sponsorManage/sponsorData')
        },
        {
            path: 'sponsorDetail',
            name: `${pre}sponsorDetail`,
            meta: {
                ...meta,
                title: '主办方详情'
            },
            component: () => import('@/pages/operationCenter/sponsorManage/com/detail')
        }
    ]
};
