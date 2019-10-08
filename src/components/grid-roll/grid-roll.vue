<template>
  <div class="dialSudoku">
    <div class="dialSudoku-container" ref="container"></div>
    <div class="storag">
      <slot name="button"></slot>
      <slot name="prize"></slot>
    </div>
  </div>
</template>

<script>
let time
export default {
  name: 'grid-roll',
  componentName: 'grid-roll',
  props: {
    interval: {
      type: String,
      default: '12px' // 间隔
    },
    startIndex: {
      type: Number,
      default: 0 // 开始的下标
    },
    direction: {
      type: String,
      default: 'r' // r顺时针, l逆时针
    },
    circle: {
      type: Number,
      default: 6 // 转的圈数
    },
    velocity: {
      type: Number,
      default: 650 // 速度，其实就是定时器
    }
  },
  data () {
    return {
      resolve: null, // 用来储存Promise的resolve，并进行判断是否进行中
      currentIndex: this.startIndex // 当前转动的下标
    }
  },
  computed: {
    // 滚动方向， 是因为九宫格排序不是0,1,2,3.。这样
    sudokuArrayIndex () {
      return this.direction === 'r' ? [
        0, 1, 2, 4, 7, 6, 5, 3
      ] : [
        0, 3, 5, 6, 7, 4, 2, 1
      ]
    },
    changeNum () {
      return this.circle * this.prizes.length + 1
    }
  },
  mounted () {
    this.initDom()
  },
  beforeDestroy () {
    clearTimeout(time)
  },
  methods: {
    // 初始化布局
    initDom () {
      this.$nextTick(() => {
        this.filterDom()
        // if (!(this.prizes.length === NUM - 1 && this.start)) {
        //   console.warn('九宫格的children没有准备好')
        //   return
        // }
        this.setContainerSize()
        this.insertContainer()
      })
    },
    // 筛选好dom
    filterDom () {
      this.prizes = this.$children.filter(children => children.$options.componentName === 'grid-prize')
      this.start = this.$children.find(children => children.$options.componentName === 'grid-start')
    },
    // 修改width和height
    setContainerSize () {
      let offsetWidth = this.getCalc('offsetWidth')
      let offsetHeight = this.getCalc('offsetHeight')
      let container = this.$refs.container
      container.style.width = offsetWidth
      container.style.height = offsetHeight
    },
    // 获得size
    getCalc (size) {
      return `calc(${this.prizes[0].$el[size] * 3}px + ${this.interval})`
    },
    // 插入dom
    insertContainer () {
      const fragment = document.createDocumentFragment()
      for (let i = 0; i < this.prizes.length; i++) {
        let v = this.prizes[i]
        let el
        if (v.$options.componentName === 'grid-prize') {
          el = v.$el
        }
        fragment.appendChild(el)
      }
      fragment.insertBefore(this.start.$el, fragment.childNodes[this.prizes.length / 2])
      this.$refs.container.appendChild(fragment)
    },
    /**
     * 开始滚动
     * @param {Number} 滚动到的目标
     */
    startRoll (index) {
      if (this.resolve) {
        this.$emit('underway', this.currentIndex)
        return false
      }
      return new Promise(resolve => {
        this.resolve = resolve
        this.underway(this.changeNum + this.getIndex(index))
      })
    },
    /**
     * 获取宫格下标
     * @param {any} index 宫格下标或者标识符
     * @returns {Number} 宫格下标
     */
    getIndex (index) {
      if (this.prizes[0].pid !== undefined) {
        index = this.prizes.findIndex(prize => prize.pid === index)
      }
      return this.sudokuArrayIndex.find(i => i === index)
    },
    /**
     * 核心内容
     * @param {Number} 次数
    */
    underway (number) {
      clearTimeout(time)
      if (number <= 0) {
        this.resolve(true)
        this.resolve = null
        this.currentIndex = this.startIndex
        return
      }
      if (this.currentIndex > 7) {
        this.currentIndex = 0
      }
      let target = this.sudokuArrayIndex[this.currentIndex++]
      let dom = this.prizes[target]
      dom.setIsSel(true)
      --number
      time = setTimeout(() => {
        dom.setIsSel(false)
        this.underway(number)
      }, this.velocity / number)
    }
  }
}
</script>

<style lang="scss" scoped>
.dialSudoku {
  display: inline-block;
  .dialSudoku-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
