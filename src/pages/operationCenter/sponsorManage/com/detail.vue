<template>
   <div class=''></div>
</template>

<script>
    export default {
        name: 'detail',
        components: {},
        data () {
            // 这里存放数据
            return {

            }
        },
        // 生命周期 - 创建完成
        created () {
            this.getInit()
        },
        // 监控data中的数据变化
        watch: {},
        // 方法集合
        methods: {
            // 获取初始化页面方法
            getInit () {}
        },
        // 生命周期 - 挂载完成（可以访问DOM元素）
        mounted () {

        }
    }
</script>
<style lang='less' scoped>

</style>
