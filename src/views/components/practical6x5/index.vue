<template>
  <div class="demo-dialSudoku">
    <div>
      <h3>{{title}}</h3>
      <grid-roll
        ref="dial"
        @underway="handleUnderway"
        @select="handleSelect"
        direction="l"
        xy="6*5"
        class="box"
        interval="3px"
        :startIndex="5">
        <grid-start slot="button">
          <div @click="handleStart" class="demo-box2 button-box2">按钮</div>
        </grid-start>
        <grid-prize v-for="(item, index) in items2" :key="index" :pid="item.id" slot="prize">
          <template slot-scope="{ isSelect }">
            <div class="demo-box2" :class="isSelect ? 'select' : ''">
              <p>id：{{item.id}}</p>
              <p>text：{{item.text}}</p>
            </div>
          </template>
        </grid-prize>
      </grid-roll>
    </div>
  </div>
</template>

<script>
import { gridRoll, gridStart, gridPrize } from '@/index'
export default {
  name: 'practical6x5',
  data () {
    return {
      items2: [],
      title: '自定义宫格：6*5'
    }
  },
  components: {
    [gridRoll.name]: gridRoll,
    [gridStart.name]: gridStart,
    [gridPrize.name]: gridPrize
  },
  created () {
    const arr = []
    for (let i = 1; i < 19; i++) {
      arr.push({
        id: i,
        text: i
      })
    }
    this.items2 = arr
  },
  methods: {
    async handleStart () {
      const param = 7
      let b = await this.$refs.dial.startRoll(param)
      console.log(b)
      if (b) {
        const pid = this.$refs.dial.currentDom.pid
        alert(`
          ${this.title}：${pid === param}
          恭喜你抽了个奖：期望获取id为${param}，得到id为${pid}
        `)
      }
    },
    handleUnderway (id) {
      console.log('进行中,id=' + id)
    },
    handleSelect (id, index) {
      console.log(`id:${id}和index:${index}`)
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
