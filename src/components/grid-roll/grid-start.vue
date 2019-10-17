<template>
  <div class="start">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'grid-start',
  componentName: 'grid-start'
}
</script>

<style lang="scss" scoped>
.start {
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
