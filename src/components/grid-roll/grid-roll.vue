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
    coord: {
      type: String,
      default: '3*3'
    },
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
    xy () {
      return this.coord
    },
    x () {
      return Number(this.xy.split('*')[0])
    },
    y () {
      return Number(this.xy.split('*')[1])
    },
    // 滚动方向， 是因为九宫格排序不是0,1,2,3.。这样
    // sudokuArrayIndex () {
    //   return this.direction === 'r' ? [
    //     0, 1, 2, 4, 7, 6, 5, 3
    //   ] : [
    //     0, 3, 5, 6, 7, 4, 2, 1
    //   ]
    // },
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
    this.$watch('coord', this.initDom, {
      immediate: true
    })
    window.a = this
  },
  beforeDestroy () {
    clearTimeout(time)
  },
  methods: {
    // 初始化布局
    initDom () {
      this.$nextTick(() => {
        this.filterDom()
        this.setCoordinates()
        this.setContainerSize()
        this.insertContainer()
      })
    },
    // 筛选好dom
    filterDom () {
      this.prizes = this.$children.filter(children => children.$options.componentName === 'grid-prize')
      this.start = this.$children.find(children => children.$options.componentName === 'grid-start')
    },
    // 设置坐标
    setCoordinates () {
      let startxy = {
        x: Math.floor(this.x / 2),
        y: Math.floor(this.y / 2)
      }
      this.start.$options.x = startxy.x
      this.start.$options.y = startxy.y
      let x = 0
      let y = 0
      this.prizes.forEach(prize => {
        if (x === startxy.x && y === startxy.y) {
          x++
        }
        prize.$options.x = x++
        prize.$options.y = y
        if (x === this.x) {
          x = 0
          y++
        }
      })
    },
    // 修改width和height
    setContainerSize () {
      let offsetWidth = this.getCalc('offsetWidth', this.x)
      let offsetHeight = this.getCalc('offsetHeight', this.y)
      let container = this.$refs.container
      container.style.width = offsetWidth
      container.style.height = offsetHeight
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
    // 获得size
    getCalc (size, num) {
      return `calc(${this.prizes[0].$el[size] * num}px + ${this.interval})`
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
        console.log(this.getIndex(index))
        this.underway(this.changeNum + this.getIndex(index))
      })
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
      if (this.currentIndex > this.prizes.length - 1) {
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
      return this.sudokuArrayIndex.findIndex(i => i === index)
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
