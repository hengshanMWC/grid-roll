<template>
  <div class="gr">
    <div class="gr-container" ref="container"></div>
    <div class="storag">
      <slot name="button"></slot>
      <slot name="prize"></slot>
    </div>
  </div>
</template>

<script>
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
      default: '0px' // 间隔
    },
    startIndex: {
      validator () {
        return true
      }
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
    },
    minVelocity: {
      type: [Number, Boolean],
      default: 40 // 最小间隔
    }
  },
  data () {
    return {
      resolve: null, // 用来储存Promise的resolve，并进行判断是否进行中
      currentIndex: 0, // 当前转动的下标
      $time: null,
      currentDom: null,
      $watchStartIndex: null,
      $prizeComponents: [], // 奖品
      $startComponent: null // 抽奖按钮
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
      return this.$prizeComponents[0] && this.$prizeComponents[0].pid !== undefined
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
      return this.$prizeComponents.map((prize, index) => {
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
      return this.$prizeComponents.map((prize, index) => {
        let advance = this.advances[index]
        return this.$prizeComponents.findIndex(prize => prize.$options.x === advance.x && prize.$options.y === advance.y)
      })
    },
    changeNum () {
      return this.circle * this.$prizeComponents.length + 1
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
        if (typeof this.$watchStartIndex === 'function') this.$watchStartIndex()
        this.$watchStartIndex = this.$watch('startIndex', function (startIndex) {
          this.currentIndex = this.getIndex(this.getStartIndex(startIndex))
        }, {
          immediate: true
        })
      })
    },
    // 对于startIndex和isPid多一个默认判断
    getStartIndex (startIndex) {
      if (this.isPid && startIndex === undefined) {
        startIndex = this.$prizeComponents[0].pid
      } else if (startIndex === undefined) {
        startIndex = 0
      }
      return startIndex
    },
    // 筛选好dom
    filterDom () {
      this.$prizeComponents = this.$children.filter(children => children.$options.componentName === 'grid-prize')
      this.$startComponent = this.$children.find(children => children.$options.componentName === 'grid-start')
    },
    // 设置坐标
    setCoordinates () {
      let x = 0
      let y = 0
      this.$prizeComponents.forEach(prize => {
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
      return `calc(${this.$prizeComponents[0].$el[size] * num}px + ${this.interval} * ${intervalNum})`
    },
    buttonInside (x, y) {
      return (x > 0 && x <= this.buttonxy.maxX) && (y > 0 && y <= this.buttonxy.maxY)
    },
    stopRoll () {
      clearTimeout(this.$time)
    },
    continueRoll () {
      this.underway(this.changeNum, false)
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
        this.underway(this.countStep(index))
      })
    },
    countStep (index) {
      let num = 0
      let continueNumber = 0
      if (this.isPid) {
        num = this.currentIndex
      } else {
        continueNumber = this.getIndex(this.getStartIndex(this.startIndex)) - this.currentIndex
      }
      return this.changeNum + this.getIndex(index) - num + continueNumber
    },
    lamplight (b = false) {
      if (this.currentDom) this.currentDom.setIsSelect(b)
    },
    /**
     * 核心内容
     * @param {Number} 次数
    */
    underway (number, status = true) {
      clearTimeout(this.$time)
      if (number <= 0) {
        this.resolve(true)
        this.resolve = null
        return
      }
      this.lamplight()
      if (this.currentIndex > this.$prizeComponents.length - 1) {
        this.currentIndex = 0
      }
      let target = this.sudokuArrayIndex[this.currentIndex++]
      this.currentDom = this.$prizeComponents[target]
      if (typeof this.currentDom === 'undefined') {
        throw new TypeError('请确保宫格布局中奖品组件存在')
      } else {
        if (this.currentDom.disabled) {
          if (status) --number
          this.underway(number, status)
        } else {
          this.lamplight(true)
          if (status) --number
          this.$time = setTimeout(() => {
            this.underway(number, status)
          }, this.filterTime(number))
        }
      }
    },
    filterTime (number) {
      let num = this.velocity / number
      if (this.minVelocity && num < this.minVelocity) {
        num = this.minVelocity
      }
      return num
    },
    /**
     * 获取宫格下标
     * @param {any} index 宫格下标或者标识符
     * @returns {Number} 宫格下标
     */
    getIndex (index) {
      if (this.isPid) {
        index = this.$prizeComponents.findIndex(prize => prize.pid === index)
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

<style scoped>
.gr {
  display: inline-block;
  position: relative;
}
</style>
