<template>
  <div class="demo-dialSudoku">
    <grid-roll ref="dial" @underway="handleUnderway">
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
import { gridRoll, gridStart, gridPrize } from '@/components/grid-roll'
export default {
  name: 'demo-dialSudoku',
  data () {
    return {
      items: [
        {
          id: 0,
          text: '0'
        },
        {
          id: 1,
          text: '1'
        },
        {
          id: 14,
          text: '2'
        },
        {
          id: 10,
          text: '3'
        },
        {
          id: 20,
          text: '4'
        },
        {
          id: 21,
          text: '5'
        },
        {
          id: 19,
          text: '6'
        },
        {
          id: 22,
          text: '7'
        }
      ]
    }
  },
  components: {
    [gridRoll.name]: gridRoll,
    [gridStart.name]: gridStart,
    [gridPrize.name]: gridPrize
  },
  methods: {
    async handleStart () {
      let b = await this.$refs.dial.startRoll(14)
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
* {
  margin: 0;
  padding: 0;
}
.demo-dialSudoku {
  margin-top: 20px; // 40
  display: flex;
  justify-content: center;
  .demo-box {
    width: 200px;
    height: 200px;
    font-size: 42px;
    text-align: center;
    font-weight: 600;
    border: 5px solid #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    background: #fff;
    p {
      flex: 1 1 200px;
    }
  }
  .button-box {
    border-radius: 50%;
  }
}
</style>
