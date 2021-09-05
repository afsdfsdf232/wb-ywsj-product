<template>
  <div class="flex">
    <template v-if="images.length > 0">
      <div class="img-item" v-for="item in images" :key="item.picId">
        <div class="upload-list">
          <img :src="item.picUrl" alt style="width: 100%; height: 100%;" />
          <div class="upload-list-cover">
            <Icon
              type="ios-eye-outline"
              @click.native="()=>{visible = true; fileUrl = item.picUrl}"
            ></Icon>
            <Icon type="ios-trash-outline" @click.native="removeImg(item.picId)"></Icon>
          </div>
        </div>
      </div>
    </template>
    <div class="img-item" style=" border-radius: 100%;" v-if="images.length < amount">
      <input
        type="file"
        @change="uploadFile"
        ref="upLoad"
        multiple="multiple"
        accept="image/*"
        style="position: absolute;top: 0; left:0; right:0; bottom: 0; opacity: 0; z-index: 9; width: 80px;"
      />
      <div
        class="border-1px"
        style="width: 80px; height:80px; text-align: center; line-height: 80px; border-radius: 100%;"
      >
        <Icon type="md-add" size="24" color="#bbbec4"></Icon>
      </div>
    </div>
    <!-- 查看大图 -->
    <Modal title="查看大图" v-model="visible" class-name="vertical-center-modal">
      <img :src="fileUrl" v-if="visible" style="width: 100%" />
    </Modal>
  </div>
</template>
<script>
    import cook from 'js-cookie';
    import util from '@/libs/util';
    // import imgView from '@/components/imgView/imgView.vue';

    export default {
        name: 'UploadImage',
        props: {
            imgs: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            amount: {
                type: Number,
                default: 9
            },
            args: {}
        },
        data () {
            return {
                images: this.imgs,
                // 已经上传的图片数量
                uploadedLength: 0,
                // 大图预览 modal
                visible: false,
                fileUrl: ''
            };
        },
        computed: {
            // 如果给组件传入 args，选择图片后会将这些额外的数据传回
            resultData () {
                let result;
                if (this.args === undefined) {
                    result = this.images;
                } else {
                    result = {
                        images: this.images,
                        args: this.args
                    };
                }
                return result;
            }
        },
        methods: {
            // 获取oss上传权限
            getUploadFileParams (files) {
                return util.ajax({
                    method: 'post',
                    data: {
                        _call: 'common.commonService.getUploadFileValues',
                        params: {
                            moduleName: 'channel',
                            files: files.name
                        }
                    }
                });
            },
            // 上传文件
            uploadFile (e) {
                let files = Array.prototype.slice.apply(e.target.files);
                if (files.length > this.amount - this.uploadedLength) {
                    this.$Message.warning({
                        content: '最多上传' + this.amount + '张图片！'
                    });
                    return false;
                };
                this.getUploadFileParams(files).then(res => {
                    files.forEach((item, idx) => {
                        this.uploadedLength++;
                        util.uploadFile({}, item, res.output.objectKey).then(result => {
                            // result;
                            let picName = [];
                            picName.push({
                                fileName: item.name,
                                fileSize: item.size,
                                fileTypeName: util.getFileType(item.name)
                            });
                            this.upFile(picName);
                            e.target.value = '';
                        });
                    });
                });
            },
            // 将上传图片ID存入后台
            upFile (picName) {
                util.ajax({
                    method: 'post',
                    data: {
                        _call: 'common.commonService.getFileUrlIds',
                        params: {
                            moduleName: 'channel',
                            files: picName
                        }
                    }
                }).then((data) => {
                    data.output.forEach(item => {
                        this.images.push(item);
                        this.$emit('on-change', this.resultData);
                    });
                }).catch(function (error) {
                    console.log(error);
                });
            },
            // 删除图片
            removeImg (picId) {
                this.images.forEach(item => {
                    if (item.picId === picId || item.fileId === picId) {
                        this.uploadedLength--;
                        this.images.splice(this.images.indexOf(item), 1);
                        this.$emit('on-change', this.resultData);
                        return false;
                    }
                });
            },
            // 主动触发选择文件
            openFolder () {
                this.$refs.upLoad.click();
            }
        },
        watch: {
            // images(arr) {
            //     this.$emit('on-change', arr.slice());
            // },
            imgs (arr) {
                this.images = [].concat(arr);
            }
        }
    };
</script>
<style scoped lang='less'>
.img-item {
  margin-right: 10px;
  height: 80px;
  width: 80px;
  position: relative;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
}
.upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  line-height: 80px;
  background: rgba(0, 0, 0, 0.6);
  text-align: center;
}

.upload-list {
  position: relative;
  display: inline-block !important;
  height: 80px;
  width: 80px;
}

.upload-list:hover .upload-list-cover {
  display: inline-block;
}

.upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
