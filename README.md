# iView Admin Pro Template

下载项目依赖  npm install

运行项目 npm start 或者 npm run dev

打包项目 npm run build

修改项目端口 src/setting.env.js  port:8081


新建页面规范：
新建页面-> step1：src/pages 下面建文件夹 -> 建页面 比如：新建基础设置(一级菜单)-员工管理（二级菜单）  baseSetting/staffManage/index.vue 
                                                                            新增员工              baseSetting/staffManage/com/addStaff.vue
                                                                            (除了该模块以外的组件都放入com里面)         
step2:   设置菜单->  src/menu          比如： 建员工管理菜单 -> src/menu/modules/baseManage.js (一个一级菜单对应一个菜单模块文件)
                                            在src/menu/sider.js 引入刚建好的菜单
setp3:   设置路由 --> src/router       比如： 建员工管理菜单 -> src/router/modules/baseManage.js (一个一级菜单对应一个路由模块文件)
                                             在src/menu/routes.js  frameIn中引入刚建好的路由

代码规范：必须满足eslint里面的基本规范。代码注释data里面的每个变量都必须有注释， 每个方法也必须说明注释

开发UI框架地址  iviewui:  https://www.iviewui.com/docs/introduce

调用后台  
    后台访问地址 开发环境：  .env.development VUE_APP_BASE_URL
                 生产环境：  .env.production VUE_APP_BASE_URL

    使用方法： 对应模块建一个调用JS  比如： 员工管理模块，在 src/api 里面新建 staffApi.js  配置对应接口；调用参考staffManage/index.vue