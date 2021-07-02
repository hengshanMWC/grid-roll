<template>
  <div class="demo">
    <selector
      @change="handleSelects"
      :grids="grids"
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
import more6x5 from './components/more6x5'
import more6x5Index from './components/more6x5Index'
import noButton from './components/noButton'
import disabled from './components/disabled'
export default {
  name: 'demo',
  data () {
    return {
      selects: [],
      grids: []
    }
  },
  components: {
    selector,
    classic,
    more6x5,
    more6x5Index,
    noButton,
    disabled
  },
  mounted () {
    this.setGrids()
    window.addEventListener('resize', () => {
      setTimeout(() => {
        this.grids.forEach(grid => {
          grid.$refs.demo.$refs.dial.initDom()
        })
      }, 500)
    })
  },
  methods: {
    handleSelects (arr) {
      this.selects = arr
      this.setGrids()
    },
    setGrids () {
      this.$nextTick(() => {
        this.grids = this.$refs.grids
      })
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
