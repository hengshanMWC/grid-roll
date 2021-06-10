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
import Params from './params'
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
      },
      default: 0
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
    },
    nextTimeInterval: {
      type: [Number],
      default: 1000 // 多选宫格时间间隔
    }
  },
  data () {
    return {
      resolve: null, // 用来储存Promise的resolve，并进行判断是否进行中
      currentIndex: 0, // 当前的宫格下标
      isPid: false, // 是否开启pid模式
      $time: null,
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
    // 按钮占位，除去左右和上下两个
    buttonxy () {
      return {
        maxX: this.x - 2,
        maxY: this.y - 2
      }
    },
    // 方向
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
    // 制定滚动路线
    advances () {
      let obj = {
        x: 0,
        y: 0
      }
      let i = 0
      let reverse = this.brim[i]
      let value = this[reverse.direction] // 获取坐标轴方向的最大值
      return this.$prizeComponents.map((prize, index) => {
        // 第一个的坐标是0,0，所以不用设置
        if (index !== 0) {
          // 为每个奖品设置坐标
          obj[reverse.direction] += reverse.value
        }
        value--
        // 到达坐标轴某个方向尽头时，切换方向
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
    // 宫格顺序数组,元素是奖品的下标
    sudokuArrayIndex () {
      return this.$prizeComponents.map((prize, index) => {
        const advance = this.advances[index]
        return this.$prizeComponents.findIndex(prize => prize.$options.x === advance.x && prize.$options.y === advance.y)
      })
    },
    changeNum () {
      return this.circle * this.$prizeComponents.length + 1
    },
    currentDom () {
      return this.$prizeComponents[this.sudokuArrayIndex[this.currentIndex]]
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
    /**
     * 开始滚动
     * @param {Number | Array} 滚动到的目标
     */
    startRoll (indexs) {
      if (this.resolve) {
        this.$emit('underway', this.getId(this.currentIndex))
        return false
      }
      return new Promise(resolve => {
        this.forEachLamplight()
        this.$params = new Params(indexs)
        this.resolve = resolve
        this.lamplight(true)
        this.dischargeCargo()
      })
    },
    // 初始化布局
    initDom () {
      this.$nextTick(() => {
        this.filterDom()
        this.setCoordinates()
        this.setContainerSize()
        if (typeof this.$watchStartIndex === 'function') this.$watchStartIndex()
        this.$watchStartIndex = this.$watch('startIndex', function (startIndex) {
          this.currentIndex = startIndex
        }, {
          immediate: true
        })
      })
    },
    // 筛选好dom
    filterDom () {
      this.$prizeComponents = this.$children.filter(children => children.$options.componentName === 'grid-prize')
      this.$startComponent = this.$children.find(children => children.$options.componentName === 'grid-start')
    },
    // 设置奖品坐标
    setCoordinates () {
      let x = 0
      let y = 0
      this.$prizeComponents.forEach(prize => {
        if (this.isButtonInside(x, y)) {
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
    // 关于按钮对布局的影响
    isButtonInside (x, y) {
      if (this.$startComponent) {
        // 4条边的顶点不会受按钮占位影响
        return (x > 0 && x <= this.buttonxy.maxX) && (y > 0 && y <= this.buttonxy.maxY)
      } else {
        return false
      }
    },
    getIsPid () {
      return this.$prizeComponents[0] && this.$prizeComponents[0].pid !== undefined
    },
    stopRoll () {
      clearTimeout(this.$time)
    },
    continueRoll () {
      this.underway(this.changeNum, false)
    },
    dischargeCargo () {
      if (!isNaN(Number(this.$params.indexValue))) {
        if (this.$params.multi) {
          this.$time = setTimeout(() => {
            this.round()
          }, this.nextTimeInterval)
        } else {
          this.round()
        }
      }
    },
    round () {
      // 算上开始奖品，所以-1
      this.underway(this.countStep(this.$params.indexValue) - 1)
    },
    /**
     * 计算步数
     * @param {Number} 奖品位置
     * @returns {Number} 返回步数
     */
    countStep (index) {
      const i = this.getIsPid() ? this.pIdToIndex(index) : index
      return this.changeNum + i - this.currentIndex
    },
    forEachLamplight (b = false) {
      this.$prizeComponents.forEach(item => {
        item.setIsSelect(b)
      })
    },
    lamplight (b = false) {
      if (this.currentDom) this.currentDom.setIsSelect(b)
    },
    /**
     * 核心内容
     * @param {Number} 次数
     * @param {Boolean} 是否真转
    */
    underway (number, status = true) {
      clearTimeout(this.$time)
      // 没有步数
      if (number <= 0) {
        this.$emit('select', this.$params.indexValue, this.$params.index)
        this.reincarnation()
        return
      } else if (status) {
        --number
      }
      // 被选中不关灯
      if (!this.indexsCompletion(this.currentIndex)) {
        this.lamplight()
      }
      // 绕完一圈从头来过
      if (++this.currentIndex > this.$prizeComponents.length - 1) {
        this.currentIndex = 0
      }
      if (typeof this.currentDom === 'undefined') {
        throw new TypeError('请确保宫格布局中奖品组件存在')
      } else {
        if (this.currentDom.disabled) {
          this.underway(number, status)
        } else {
          this.lamplight(true)
          this.$time = setTimeout(() => {
            this.underway(number, status)
          }, this.filterTime(number))
        }
      }
    },
    reincarnation () {
      // 看看是否还有
      if (this.$params.next()) {
        this.dischargeCargo()
      } else {
        // 抽奖全部完成
        this.resolve(true)
        this.resolve = null
      }
    },
    indexsCompletion () {
      const index = this.$params.index
      if (index > 0) {
        const target = this.indexExchangePrizeComponentPosition(this.currentIndex)
        return this.$params.indexs
          .slice(0, index)
          .includes(target)
      }
    },
    filterTime (number) {
      let num = this.velocity / number
      if (this.minVelocity && num < this.minVelocity) {
        num = this.minVelocity
      }
      return num
    },
    getId (index) {
      if (this.getIsPid()) {
        return this.sudokuArrayIndex[index]
      }
      return index
    },
    /**
     * 奖品id换下标
     * @param {any} pid
    */
    pIdToIndex (pid) {
      const prizeIndex = this.$prizeComponents.findIndex(prize => prize.pid === pid)
      return this.sudokuArrayIndex.findIndex(i => i === prizeIndex)
    },
    // 宫格下标换取奖品位置
    indexExchangePrizeComponentPosition (index) {
      const sudokuIndex = this.sudokuArrayIndex[index]
      if (this.getIsPid()) {
        return this.$prizeComponents[sudokuIndex].pid
      } else {
        return sudokuIndex
      }
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
