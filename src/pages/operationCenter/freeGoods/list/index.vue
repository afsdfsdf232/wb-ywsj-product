<template>
  <div class="container">
    list
  </div>
</template>

<script>
    import Header from './../com/Header'

    export default {
        name: 'goods',
        components: {
            'goods-header': Header
        }
    }
</script>

<style scoped lang="less">
  .container {
    box-sizing: border-box;
  }
</style>
