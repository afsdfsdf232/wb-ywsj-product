<template>
  <div class="container" @click="changeFile">
    <input type="file" @change="uploadFile" class="file-btn" />
    <template v-if="!img">
      <Icon type="md-add" class="add-icon" size="20" />
    </template>
    <template v-if="img">
      <div class="img-box">
        <img :src="img" alt="" />
      </div>
    </template>
  </div>
</template>

<script>
import { fileUpload } from "@/api/freeGoods";
export default {
  name: "uploadfile",
  props: {
    onSuccess: {
      type: Function,
      default: null,
    },
    img:  {
      type: String,
      default: ''
    }
  },
  methods: {
    changeFile(){
      this.$emit('click')
    },
    async uploadFile(e) {
      if (!e.target.files[0]) return;
      const file = e.target.files[0];
      if (file.type.indexOf("image/") === -1) {
        this.$Message.error("图片类型格式不正确");
        return;
      }
      // 判断文件大小
      const size = file.size;
      if (size / 1024 / 1024 > 2) {
        this.$Message.error("文件大小不能大于2M");
        return;
      }
      const fileData = new FormData();
      fileData.append("file", file);
      fileData.append("moduleName", "activity");
      const res = await fileUpload(fileData);
      if (res.code === 0 && res.data && res.data.fileId) {
        if (typeof this.onSuccess === "function") {
          this.src = res.data.fileUrl;
          this.onSuccess(res.data);
        }
      } else {
         this.$Message.error("图片上传失败，请稍后再试!");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 200px;
  height: 200px;
  background: #fff;
  border: 1px dashed #dcdee2;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: border-color 0.2s;
  &:hover {
    border-color: #2e8cf0;
  }
  .file-btn {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 99;
    opacity: 0;
    cursor: pointer;
  }
  .add-icon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
  .img-box {
    width: 200px;
    height: 200px;
    position: relative;
    img {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      max-width: 200px;
      max-height: 200px;
    }
  }
}
</style>
