<template>

  <n-message-provider>
    <router-view></router-view>
  </n-message-provider>
  <foote id="foote"></foote>
</template>
<script lang="ts" setup>
import foote from './components/footer.vue'
</script>
<style >
.foote {
  height: 20px;
  align-self: flex-end;
}
</style>