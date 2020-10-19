<template>
  <div class="gr-prize">
    <slot :is-select="isSelect"></slot>
  </div>
</template>

<script>
export default {
  name: 'grid-prize',
  componentName: 'grid-prize',
  props: {
    pid: {
      validator () {
        return true
      }
    }
  },
  data () {
    return {
      isSelect: false
    }
  },
  methods: {
    setIsSelect (b) {
      this.isSelect = b
    }
  }
}
</script>

<style lang="scss" scoped>
.gr-prize {
  z-index: 1;
  display: inline-block;
  position: absolute;
}
</style>
