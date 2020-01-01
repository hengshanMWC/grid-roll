<template>
  <div class="gr-prize" :style="style">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'grid-prize',
  componentName: 'grid-prize',
  props: {
    selStyle: {
      type: Object,
      default () {
        return {
          boxShadow: 'red 0 0 12px 4px'
        }
      }
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
    style () {
      return this.isSel ? {
        zIndex: this.zIndex,
        ...this.selStyle
      } : {}
    },
    zIndex () {
      return this.isSel ? 10 : ''
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
.gr-prize {
  z-index: 1;
  display: inline-block;
  position: absolute;
}
</style>
