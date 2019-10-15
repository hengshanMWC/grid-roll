<template>
  <div class="demo-dialSudoku">
    <grid-roll ref="dial" @underway="handleUnderway" direction="l" :x="4" :y="4">
      <template #button>
        <grid-start>
          <div @click="handleStart" class="demo-box button-box">按钮</div>
        </grid-start>
      </template>
      <template #prize>
        <grid-prize v-for="(item, index) in items" :key="index" boxShadow="red 0 0 12px 4px" :pid="item.id">
          <div class="demo-box">
            <p>id：{{item.id}}</p>
            <p>text：{{item.text}}</p>
          </div>
        </grid-prize>
      </template>
    </grid-roll>
  </div>
</template>

<script>
import { gridRoll, gridStart, gridPrize } from '@/index'
export default {
  name: 'demo-dialSudoku',
  data () {
    return {
      items: []
    }
  },
  components: {
    [gridRoll.name]: gridRoll,
    [gridStart.name]: gridStart,
    [gridPrize.name]: gridPrize
  },
  created () {
    let arr = []
    for (let i = 0; i < 12; i++) {
      arr.push({
        id: i,
        text: i
      })
    }
    this.items = arr
  },
  methods: {
    async handleStart () {
      let b = await this.$refs.dial.startRoll(7)
      console.log(b)
      if (b) {
        alert('恭喜你抽了个奖')
      }
    },
    handleUnderway (index) {
      console.log('进行中到' + index)
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
  margin-top: 20px * $zoom; // 40
  display: flex;
  justify-content: center;
  .demo-box {
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
  .button-box {
    border-radius: 50%;
    width: 200px;
    height: 200px;
  }
}
</style>
