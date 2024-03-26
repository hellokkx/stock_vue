<template>
  <div style="margin-top: 10px;margin-right: 20px;margin-left:10px">
    这里是用户列表界面
  </div>
</template>

<script>
// @ is an alias to /src
import request from "@/utils/request";

export default {
  name: 'User',
  data(){
    return{

    }
  },
  created() {
    this.load()
  },
  methods: {


  }
}
</script>

<style scoped>

</style>