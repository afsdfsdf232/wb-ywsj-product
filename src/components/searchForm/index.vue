<template>
   <div class='yw-search p-tb8 p-lr12 flex  bg-white'>
        <div class="flex m-r10 " v-for="(item, index) in queryFieids" :key="index">
            <div class="lable">{{item.label}}：</div>
            <div class="label-input flex-1" v-if="item.type === 'Input'">
                <Input  type="text" v-model="search[item.prop]" :placeholder="item.placeholder || ''"></Input>
            </div>
            <div class="label-input flex-1" v-if="item.type === 'Select'">
                <Select v-model="search[item.prop]"
                    clearable  filterable transfer
                    :placeholder="item.placeholder || ''"
                    :multiple="item.multiple"
                 style="width:140px">
                    <Option v-for="ite in item.option" :value="ite.id || ''" :key="ite.id">{{ ite.label }}</Option>
                </Select>
            </div>
            <div class="label-input flex-1" v-if="item.type === 'daterange'" style="width: 240px">
                <DatePicker type="daterange" class="w100" transfer v-model="search[item.prop]" placement="bottom-end" placeholder=""></DatePicker>
            </div>
            <div class="label-input flex-1" v-if="item.type === 'datetimerange'" style="width: 300px">
                <DatePicker class="w100" type="datetimerange" transfer v-model="search[item.prop]" :format="item.format || 'yyyy-MM-dd HH:mm:ss'" placeholder="" ></DatePicker>
            </div>
        </div>
        <slot></slot>
        <div class="p-l20  flex flex-1">
            <Button class="m-l10" v-for="(item,index) in formBtn" :key="index" :type="item.type ? item.type : 'default'" @click="handelClick(item)">{{item.label}}</Button>
        </div>
        <!-- 尾部描述文字 -->
        <slot name="end"></slot>
   </div>
</template>
<script>
    export default {
        name: 'searchForm',
        props: {
            labelWidth: { type: Number, default: 80 }, // label的长度
            formBtn: {
                type: Array, default: () => []
            },
            queryFieids: {
                type: Array, default: () => []
            },
            search: {
                type: Object
            }
        },
        data () {
            // 这里存放数据
            return {
                formInfo: {}
            }
        },
        // 监控data中的数据变化
        watch: {
        },
        // 方法集合
        methods: { // item.handle()
        handelClick(item){
           typeof item.handle === 'function' && item.handle();
           this.$emit('on-click',this.search,item)
        }
        },
        // 生命周期 - 挂载完成（可以访问DOM元素）
        mounted () {
        }
    }
</script>
<style lang='less' scoped>
    .label-input {
        min-width: 160px;
    }
</style>
