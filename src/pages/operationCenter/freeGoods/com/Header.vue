<template>
  <div class="content">
    <div class="left-title">{{title}}</div>
    <div>
      <slot name="right"></slot>
    </div>
   </div>
</template>

<script>
    export default {
        name: 'header',
        props: {
            title: String
        }
    }
</script>

<style scoped lang="less">
  .content {
    height: 75px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 32px;
    margin: 10px 0;
    background-color: #fff;
    .left-title {
      font-size: 20px;
      color: #000;
    }
  }
</style>
