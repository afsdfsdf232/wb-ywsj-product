import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'roleAuth-';

export default {
    path: '/roleAuth',
    name: `roleAuth`,
    redirect: {
        name: `roleAuth`
    },
    meta,
    component: BasicLayout,
    children: [

        {
            path: 'roleAuth',
            name: `${pre}roleAuth`,
            meta: {
                ...meta,
                title: '角色权限管理'
            },
            component: () => import('@/pages/systemSetting/roleAuth/index')
        }
    ]
};
