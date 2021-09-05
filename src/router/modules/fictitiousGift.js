import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'fictitious-';

export default {
    path: '/fictitious',
    name: `fictitious`,
    redirect: {
        name: `fictitious`
    },
    meta,
    component: BasicLayout,
    children: [
        {
            path: 'fictitiousGift',
            name: `${pre}fictitiousGift`,
            meta: {
                ...meta,
                title: '虚拟礼物'
            },
            component: () => import('@/pages/operationCenter/giftManage/fictitiousGift')
        }
    ]
};
