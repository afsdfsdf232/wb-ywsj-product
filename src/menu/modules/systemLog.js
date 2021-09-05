const pre = '/systemLog/';

export default {
    path: '/systemLog',
    title: '系统日志',
    header: 'system',
    // icon: 'md-speedometer',
    children: [
        {
            path: `${pre}operateLog`,
            title: '系统操作日志'
        },
        {
            path: `${pre}loginLog`,
            title: '登录日志'
        }
    ]
}
