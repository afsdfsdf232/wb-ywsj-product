<template>
   <div class='p-tb10 flex p-lr12 bg-white'>
       <div>
           <slot></slot>
       </div>
       <div class="flex-1 text-right">
           <Page :total="total" @on-change="changeIndex" @on-page-size-change="changeSize" :page-size="pageSize" transfer :page-size-opts="pageSizeData" :current="currentPage" show-elevator show-sizer show-total />
       </div>
   </div>
</template>

<script>
    export default {
        name: 'pagination',
        components: {},
        props: {
            total: {
                default: 0
            },
            pageSize: {
                type: Number,
                default: 10
            },
            pageSizeData: {
                type: Array,
                default: () => {
                    return [10, 20, 30, 50]
                }
            },
            currentPage: {
                type: Number,
                default: 1
            }
        },
        data () {
            // 这里存放数据
            return {

            }
        },
        // 生命周期 - 创建完成
        created () {
        },
        // 监控data中的数据变化
        watch: {},
        // 方法集合
        methods: {
            changeIndex (index) {
                this.$emit('onfreshPage', {
                    currentPage: index
                })
            },
            changeSize (size) {
                this.$emit('onfreshPage', {
                    currentPage: this.currentPage,
                    pageSize: size
                })
            }
        },
        // 生命周期 - 挂载完成（可以访问DOM元素）
        mounted () {

        }
    }
</script>
<style lang='less' scoped>

</style>
