<template>
  <div class="prize" :style="{boxShadow: shadow}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'grid-prize',
  componentName: 'grid-prize',
  props: {
    boxShadow: {
      type: String,
      default: '#eaa665 0 0 8px 2px'
    },
    pid: {
      validator () {
        return true
      }
    }
  },
  data () {
    return {
      isSel: false
    }
  },
  computed: {
    shadow () {
      return this.isSel ? this.boxShadow : ''
    }
  },
  methods: {
    setIsSel (b) {
      this.isSel = b
    }
  }
}
</script>

<style lang="scss" scoped>
.prize {
  z-index: 1;
  display: inline-block;
}
</style>
