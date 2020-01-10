<template>
  <div class="demo-dialSudoku">
    <div>
      <grid-roll ref="dial" @underway="handleUnderway" class="box">
        <template #button>
          <grid-start>
            <div @click="handleStart" class="demo-box button-box">按钮</div>
          </grid-start>
        </template>
        <template #prize>
          <grid-prize v-for="(item, index) in items" :key="index">
            <div class="demo-box">
              <p>id：{{item.id}}</p>
              <p>text：{{item.text}}</p>
            </div>
          </grid-prize>
        </template>
      </grid-roll>
      <p>基本九宫格</p>
      <grid-roll ref="dial2" @underway="handleUnderway2" direction="l" xy="6*5" class="box" :startIndex="1" interval="3px">
        <template #button>
          <grid-start>
            <div @click="handleStart2" class="demo-box2 button-box2">按钮</div>
          </grid-start>
        </template>
        <template #prize>
          <grid-prize v-for="(item, index) in items2" :key="index" :selStyle="{opacity: 0.4}" :pid="item.id">
            <div class="demo-box2">
              <p>id：{{item.id}}</p>
              <p>text：{{item.text}}</p>
            </div>
          </grid-prize>
        </template>
      </grid-roll>
      <p>自定义宫格：6*5</p>
    </div>
  </div>
</template>

<script>
import { gridRoll, gridStart, gridPrize } from '@/index'
export default {
  name: 'demo-dialSudoku',
  data () {
    return {
      items: [],
      items2: []
    }
  },
  components: {
    [gridRoll.name]: gridRoll,
    [gridStart.name]: gridStart,
    [gridPrize.name]: gridPrize
  },
  created () {
    let arr = []
    for (let i = 0; i < 8; i++) {
      arr.push({
        id: i,
        text: i
      })
    }
    this.items = arr
    arr = []
    for (let i = 0; i < 18; i++) {
      arr.push({
        id: i,
        text: i
      })
    }
    this.items2 = arr
  },
  mounted () {
    window.a = this.$refs.dial
    window.b = this.$refs.dial2
  },
  methods: {
    async handleStart () {
      let b = await this.$refs.dial.startRoll(3)
      console.log(b)
      if (b) {
        alert('恭喜你抽了个奖')
      }
    },
    handleUnderway (index) {
      console.log('进行中,index=' + index)
    },
    async handleStart2 () {
      let b = await this.$refs.dial2.startRoll(7)
      console.log(b)
      if (b) {
        alert('恭喜你抽了个奖')
      }
    },
    handleUnderway2 (id) {
      console.log('进行中,id=' + id)
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
.demo-dialSudoku {
  p {
    font-size: 24px;
    text-align: center;
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
