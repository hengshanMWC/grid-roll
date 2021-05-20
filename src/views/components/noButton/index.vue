<template>
  <div class="demo-dialSudoku">
    <h3>{{title}}</h3>
    <div>
      <grid-roll ref="dial" xy="4*2" @underway="handleUnderway" class="box">
        <grid-prize v-for="(item, index) in items" :pid="item.id" :key="index" slot="prize">
          <template slot-scope="{ isSelect }">
            <div class="demo-box"  :class="isSelect ? 'select' : ''">
              <p>id：{{item.id}}</p>
              <p>text：{{item.text}}</p>
            </div>
          </template>
        </grid-prize>
      </grid-roll>
    </div>
    <div class="btn" @click="handleStart">抽奖</div>
  </div>
</template>

<script>
import { gridRoll, gridPrize } from '@/index'
export default {
  name: 'noButton',
  data () {
    return {
      items: [],
      title: '无按钮宫格'
    }
  },
  components: {
    [gridRoll.name]: gridRoll,
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
      const param = 3
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
