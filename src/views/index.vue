<template>
  <div class="demo">
    <selector
      @change="handleSelects"
      :grids="$refs.grids"
      class="selector"
    ></selector>
    <component
      v-for="item in selects"
      :key="item"
      :is="item"
      ref="grids"
      class="item"
    ></component>
  </div>
</template>

<script>
import selector from './components/selector'
import classic from './components/classic'
import practical6x5 from './components/practical6x5'
import noButton from './components/noButton'
import disabled from './components/disabled'
export default {
  name: 'demo',
  data () {
    return {
      selects: []
    }
  },
  components: {
    selector,
    classic,
    practical6x5,
    noButton,
    disabled
  },
  methods: {
    handleSelects (arr) {
      this.selects = arr
    }
  }
}
</script>

<style lang="scss" scoped>
.selector {
  margin-bottom: 40px;
}
.item {
  margin-bottom: 60px;
}
</style>
