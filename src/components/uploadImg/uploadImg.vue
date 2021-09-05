<template>
   <div class=''>
       <Upload
        ref="upload"
        :show-upload-list="false"
        :with-credentials="true"
        :default-file-list="defaultList"
        :on-success="handleSuccess"
        :format="format"
        :max-size="maxSize"
        :data="{moduleName:moduleName}"
        :on-error="handleFormatError"
        :multiple="multiple"
        :action="ajaxUrl"
        style="display: inline-block;width:80px;">
        <div class="file-box">
            <Icon type="md-add" size="30"></Icon>
        </div>
    </Upload>
   </div>
</template>

<script>
    import { fileUpload } from '@/api/common'
    export default {
        name: 'uploadImg',
        components: {},
        props: {
            maxSize: {
                type: Number,
                default: 2048
            },
            multiple: {
                type: Boolean,
                default: false
            },
            format: {
                type: Array,
                default: () => {
                    return ['jpg', 'jpeg', 'png']
                }
            },
            moduleName: {
                type: String,
                default: 'system'
            }
        },
        data () {
            // 这里存放数据
            return {
                defaultList: [],
                ajaxUrl: fileUpload
            }
        },
        // 生命周期 - 创建完成
        created () {
        },
        // 监控data中的数据变化
        watch: {},
        // 方法集合
        methods: {
            handleSuccess (res, file) {
                file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
                file.name = '7eb99afb9d5f317c912f08b5212fd69a';
                this.$emit('upload', file)
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '上传失败',
                    desc: '请重试或者联系管理员'
                });
            }
        },
        // 生命周期 - 挂载完成（可以访问DOM元素）
        mounted () {

        }
    }
</script>
<style lang='less' scoped>
    .file-box {
        width: 80px;
        height: 80px;
        border-radius: 6px;
        text-align: center;
        line-height: 80px;
        background: #eee;
    }
</style>
