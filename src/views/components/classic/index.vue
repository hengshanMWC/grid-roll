<template>
  <classicDemo ref="demo" :param="param" @ing="toast"></classicDemo>
</template>

<script>
import classic from '@/components/demo/classic'
export default {
  name: 'classic',
  data () {
    return {
      param: 4
    }
  },
  components: {
    [classic.name]: classic
  },
  methods: {
    toast (b) {
      if (b) {
        const demo = this.$refs.demo
        const currentIndex = demo.$refs.dial.currentIndex
        alert(`
        ${demo.title}：${currentIndex === this.param}
        恭喜你抽了个奖：
        期望获取第${this.param}个，得到第${currentIndex}。
        期望id为7的亮,${demo.$refs.prizes[7].isSelect}
      `)
      }
    },
    async handleStart () {
      const b = await this.$refs.demo.handleStart()
      this.toast(b)
    }
  }
}
</script>
