<template>
  <div class="footer">
  <div class="left">所有权归ocean所有</div>
    <div class="right">
      <a target="_blank" href="https://github.com/ocean520x/newBee">新蜂商城在线仓库地址</a>
    </div>
  </div>
</template>

<script>
export default {
  setup() {


    return {}
  }
}
</script>

<style lang="scss" scoped>
.footer {
  height: 50px;
  border-top: 1px solid #e9e9e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  a {
    text-decoration: none;
    color: #1baeae;
  }
}
</style>