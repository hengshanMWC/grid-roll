<template>
  <div id="app">
    <router-view
      :key="$route.fullPath"
      class="app-view">
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  html {
    max-width: 750Px;
    margin: 0 auto;
    background: #f6f6f6;
  }
</style>
