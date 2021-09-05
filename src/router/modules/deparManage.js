import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'depar-';

export default {
    path: '/depar',
    name: `depar`,
    redirect: {
        name: `depar`
    },
    meta,
    component: BasicLayout,
    children: [
        {
            path: 'deparManage',
            name: `${pre}deparManage`,
            meta: {
                ...meta,
                title: '部门管理'
            },
            component: () => import('@/pages/systemSetting/deparManage/index')
        }
    ]
};
