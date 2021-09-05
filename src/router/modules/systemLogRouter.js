import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'system-';

export default {
    path: '/systemLog',
    name: `systemLog`,
    redirect: {
        name: `systemLog`
    },
    meta,
    component: BasicLayout,
    children: [
        {
            path: 'operateLog',
            name: `${pre}operateLog`,
            meta: {
                ...meta,
                title: '系统操作日志'
            },
            component: () => import('@/pages/systemSetting/systemLog/operateLog')
        },
        {
            path: 'loginLog',
            name: `${pre}loginLog`,
            meta: {
                ...meta,
                title: '登录日志'
            },
            component: () => import('@/pages/systemSetting/systemLog/loginLog')
        }
    ]
};
