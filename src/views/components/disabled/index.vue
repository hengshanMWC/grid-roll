<template>
  <disabledDemo ref="demo" @ing="toast"></disabledDemo>
</template>

<script>
import disabled from '@/components/demo/disabled'
export default {
  name: 'disabled',
  components: {
    [disabled.name]: disabled
  },
  methods: {
    toast (b) {
      if (b) {
        const demo = this.$refs.demo
        const pid = demo.$refs.dial.currentDom.pid
        const selectId = demo.selectId
        alert(`
          ${demo.title}：${pid === selectId}
          恭喜你抽了个奖：
          期望获取id为${selectId}，得到id为${pid}
          期望id为${selectId}的亮,${demo.$refs.prizes.find(prize => prize.pid === selectId).isSelect}
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
  color: red;
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
  .button-box {
    border-radius: 50%;
    width: 150px;
    height: 150px;
  }
}
</style>
