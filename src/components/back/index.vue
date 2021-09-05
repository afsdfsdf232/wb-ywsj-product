<template>
   <div class="color-blue cursor dib" @click="goBack">
       <Icon type="ios-arrow-back" color="#1486FF" size="24" /> <span class="fs-20">{{titles || '返回'}}</span>
   </div>
</template>

<script>
    export default {
        props: {
            to: {
                type: String
            },
            title: {
                type: String
            }
        },
        data () {
            return {
                titles: this.title
            }
        },
        methods: {
            goBack () {
                if (this.to) {
                    let opendList = this.$store.state.admin.page.opened;
                    let openData = opendList.filter(item => {
                        console.log(item.fullPath.indexOf(this.to))
                        return item.fullPath.split('?')[0] === this.to;
                    })
                    if (openData.length === 0) {
                        this.$router.go(-1);
                    } else {
                        this.$router.push({
                            path: this.to || '/',
                            query: openData[0].query,
                            params: openData[0].params
                        })
                    }
                } else {
                    this.$router.go(-1);
                }
            }
        }
    }
</script>

<style>

</style>
