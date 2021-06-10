<template>
  <noButtonDemo ref="demo" :param="param" @ing="toast"></noButtonDemo>
</template>

<script>
import noButton from '@/components/demo/noButton'
export default {
  name: 'noButton',
  data () {
    return {
      param: 4
    }
  },
  components: {
    [noButton.name]: noButton
  },
  methods: {
    toast (b) {
      if (b) {
        const id = 17
        const demo = this.$refs.demo
        const currentIndex = demo.$refs.dial.currentIndex
        const index = demo.items.findIndex(item => item.id === id)
        alert(`
        ${demo.title}：${currentIndex === this.param}
        恭喜你抽了个奖：
        期望获取第${this.param}个，得到第${currentIndex}
        期望id为${id}的亮,${demo.$refs.prizes[index].isSelect}
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

<style lang="scss" scoped>
$zoom: .5;
$size: 200px * $zoom;
* {
  margin: 0;
  padding: 0;
}
.select {
  opacity: .4;
}
.demo-dialSudoku {
  h3 {
    font-size: 32px;
    text-align: center;
    font-weight: 600;
  }
  .box {
    margin-top: 30px;
    left: 50%;
    transform: translateX(-50%);
  }
  .demo-box {
    width: 150px;
    height: 150px;
    font-size: 32px;
    text-align: center;
    font-weight: 600;
    border: 5px solid #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    background: #fff;
    p {
      flex: 1 1 150px;
    }
  }
}
.btn {
  width: 150px;
  height: 80px;
  font-size: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  margin: auto;
}
</style>
