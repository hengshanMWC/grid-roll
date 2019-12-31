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
let startIndex = () => {}
export default {
  name: 'grid-roll',
  componentName: 'grid-roll',
  props: {
    xy: {
      type: String,
      default: '3*3'
    },
    interval: {
      type: String,
      default: '8px' // 间隔
    },
    startIndex: {
      type: Number,
      default: 0 // 开始的下标或者
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
      currentIndex: 0, // 当前转动的下标
      $time: null,
      dom: null
    }
  },
  computed: {
    x () {
      return Number(this.xy.split('*')[0])
    },
    y () {
      return Number(this.xy.split('*')[1])
    },
    isPid () {
      return this.prizes[0] && this.prizes[0].pid !== undefined
    },
    buttonxy () {
      return {
        maxX: this.x - 2,
        maxY: this.y - 2
      }
    },
    brim () {
      return this.direction === 'r'
        ? [
          {
            direction: 'x',
            value: 1
          }, {
            direction: 'y',
            value: 1
          }, {
            direction: 'x',
            value: -1
          }, {
            direction: 'y',
            value: -1
          }]
        : [
          {
            direction: 'y',
            value: 1
          }, {
            direction: 'x',
            value: 1
          }, {
            direction: 'y',
            value: -1
          }, {
            direction: 'x',
            value: -1
          }]
    },
    advances () {
      let obj = {
        x: 0,
        y: 0
      }
      let i = 0
      let reverse = this.brim[i]
      let value = this[reverse.direction]
      return this.prizes.map((prize, index) => {
        if (index !== 0) {
          obj[reverse.direction] += reverse.value
        }
        value--
        if (value === 0) {
          i++
          reverse = this.brim[i]
          value = this[reverse.direction] - 1
        }
        return {
          ...obj
        }
      })
    },
    sudokuArrayIndex () {
      return this.prizes.map((prize, index) => {
        let advance = this.advances[index]
        return this.prizes.findIndex(prize => prize.$options.x === advance.x && prize.$options.y === advance.y)
      })
    },
    changeNum () {
      return this.circle * this.prizes.length + 1
    }
  },
  mounted () {
    this.$watch('xy', this.initDom, {
      immediate: true
    })
  },
  beforeDestroy () {
    clearTimeout(this.$time)
  },
  methods: {
    // 初始化布局
    initDom () {
      this.$nextTick(() => {
        this.filterDom()
        this.setCoordinates()
        this.setContainerSize()
        startIndex()
        startIndex = this.$watch('startIndex', function (startIndex) {
          this.currentIndex = this.getIndex(startIndex)
        }, {
          immediate: true
        })
      })
    },
    // 筛选好dom
    filterDom () {
      this.prizes = this.$children.filter(children => children.$options.componentName === 'grid-prize')
      this.start = this.$children.find(children => children.$options.componentName === 'grid-start')
    },
    // 设置坐标
    setCoordinates () {
      let x = 0
      let y = 0
      this.prizes.forEach(prize => {
        if (this.buttonInside(x, y)) {
          x += this.buttonxy.maxX
        }
        prize.$options.x = x
        prize.$options.y = y
        prize.$el.style.left = this.getCalc('offsetWidth', x, x)
        prize.$el.style.top = this.getCalc('offsetHeight', y, y)
        if (++x === this.x) {
          x = 0
          y++
        }
      })
    },
    // 修改width和height
    setContainerSize () {
      let offsetWidth = this.getCalc('offsetWidth', this.x, this.x - 1)
      let offsetHeight = this.getCalc('offsetHeight', this.y, this.y - 1)
      let container = this.$refs.container
      container.style.width = offsetWidth
      container.style.height = offsetHeight
    },
    // 获得size
    getCalc (size, num, intervalNum) {
      return `calc(${this.prizes[0].$el[size] * num}px + ${this.interval} * ${intervalNum})`
    },
    buttonInside (x, y) {
      return (x > 0 && x <= this.buttonxy.maxX) && (y > 0 && y <= this.buttonxy.maxY)
    },
    /**
     * 开始滚动
     * @param {Number} 滚动到的目标
     */
    startRoll (index) {
      if (this.resolve) {
        this.$emit('underway', this.getId(this.currentIndex))
        return false
      }
      return new Promise(resolve => {
        this.resolve = resolve
        let num = this.isPid ? this.currentIndex : 0
        this.underway(this.changeNum + this.getIndex(index) - num)
      })
    },
    lamplight (b = false) {
      if (this.dom) this.dom.setIsSel(b)
    },
    /**
     * 核心内容
     * @param {Number} 次数
    */
    underway (number) {
      clearTimeout(this.$time)
      if (number <= 0) {
        this.resolve(true)
        this.resolve = null
        this.currentIndex = this.getIndex(this.startIndex)
        return
      }
      this.lamplight()
      if (this.currentIndex > this.prizes.length - 1) {
        this.currentIndex = 0
      }
      let target = this.sudokuArrayIndex[this.currentIndex++]
      this.dom = this.prizes[target]
      this.lamplight(true)
      --number
      this.$time = setTimeout(() => {
        this.underway(number, this.dom)
      }, this.velocity / number)
    },
    /**
     * 获取宫格下标
     * @param {any} index 宫格下标或者标识符
     * @returns {Number} 宫格下标
     */
    getIndex (index) {
      if (this.isPid) {
        index = this.prizes.findIndex(prize => prize.pid === index)
        index = this.sudokuArrayIndex.findIndex(i => i === index)
      }
      return index
    },
    getId (index) {
      if (this.isPid) {
        return this.sudokuArrayIndex[index]
      }
      return index
    }
  }
}
</script>

<style lang="scss" scoped>
.dialSudoku {
  display: inline-block;
  position: relative;
}
</style>
