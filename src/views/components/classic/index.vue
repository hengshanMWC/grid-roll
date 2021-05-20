<template>
  <div class="demo-dialSudoku">
    <h3>{{ title }}</h3>
    <div>
      <grid-roll ref="dial" @underway="handleUnderway" class="box">
        <grid-start slot="button">
          <div @click="handleStart" class="demo-box button-box">抽奖</div>
        </grid-start>
        <grid-prize v-for="(item, index) in items" :key="index" slot="prize">
          <template slot-scope="{ isSelect }">
            <div class="demo-box"  :class="isSelect ? 'select' : ''">
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
  name: 'classic',
  data () {
    return {
      items: [],
      title: '经典九宫格'
    }
  },
  components: {
    [gridRoll.name]: gridRoll,
    [gridStart.name]: gridStart,
    [gridPrize.name]: gridPrize
  },
  created () {
    const arr = []
    for (let i = 0; i < 8; i++) {
      arr.push({
        id: i,
        text: i
      })
    }
    this.items = arr
  },
  methods: {
    async handleStart () {
      const param = 4
      let b = await this.$refs.dial.startRoll(param)
      if (b) {
        const currentIndex = this.$refs.dial.currentIndex
        alert(`
        ${this.title}：${currentIndex === param}
        恭喜你抽了个奖：期望获取第${param}个，得到第${currentIndex}
      `)
      }
    },
    handleUnderway (index) {
      console.log('进行中,index=' + index)
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
}
</style>
