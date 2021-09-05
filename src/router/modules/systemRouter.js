import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'system-';

export default {
    path: '/system',
    name: `system`,
    redirect: {
        name: `system`
    },
    meta,
    component: BasicLayout,
    children: [
        {
            path: 'staffManage',
            name: `${pre}staffManage`,
            meta: {
                ...meta,
                title: '员工管理'
            },
            component: () => import('@/pages/systemSetting/staffManage/index')
        }
    ]
};
