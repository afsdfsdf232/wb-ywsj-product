const pre = '/sponsorManage/';

export default {
    path: '/sponsorManage',
    title: '主办方管理',
    header: 'operation',
    // icon: 'md-speedometer',
    children: [
        {
            path: `${pre}sponsorData`,
            title: '主办方资料'
        },
        {
            path: `${pre}sponsorDetail`,
            title: '主办方详情',
            auth: ['hidden']
        }
    ]
}
