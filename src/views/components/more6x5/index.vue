<template>
  <more6x5Demo ref="demo" :param="param" @ing="toast"></more6x5Demo>
</template>

<script>
import more6x5 from '@/components/demo/more6x5'
export default {
  name: 'more6x5',
  data () {
    return {
      param: [7, 3, 10]
    }
  },
  components: {
    [more6x5.name]: more6x5
  },
  methods: {
    toast (b) {
      if (b) {
        const demo = this.$refs.demo
        alert(`
          ${demo.title}：${demo.startArr.toString() === this.param.toString()}
          恭喜你抽了个奖：
          期望获取id为${this.param}，得到id为${demo.startArr}
          期望id为${this.param}亮
          ${this.param.reduceRight((p, c) => {
    return `${c}：${this.getPrize(c, demo).isSelec}、${p}`
  }, '')}
        `)
      }
    },
    getPrize (id, demo) {
      console.log(demo, demo.items)
      const index = demo.items.findIndex(item => item.id === id)
      return demo.$refs.prizes[index]
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
  .button-box {
    border-radius: 50%;
    width: 150px;
    height: 150px;
  }
  .demo-box2 {
    width: $size;
    height: $size;
    font-size: 42px * $zoom;
    text-align: center;
    font-weight: 600;
    border: 5px * $zoom solid #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    background: #fff;
    p {
      flex: 1 1 $size;
    }
  }
  .button-box2 {
    border-radius: 50%;
    width: 400px;
    height: 300px;
  }
}
</style>
