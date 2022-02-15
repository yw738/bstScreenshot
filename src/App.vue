<template>
  <div id="app">
    <NodeCom />
  </div>
</template>
<script>
import NodeCom from './views/NodeCom.vue'
export default {
  components: {
    NodeCom,
  },
}
</script>

<style lang="less">
html {
  font-size: 100vw / 3.75;
}

body {
  font-size: 0.14rem;
}
#app {
  overflow: hidden;
}
</style>