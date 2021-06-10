<template>
  <div class="demo-dialSudoku">
    <h3>{{ title }}-pid模式</h3>
    <div>
      <grid-roll
        ref="dial"
        @underway="handleUnderway"
        :minVelocity="100"
        class="box">
        <grid-start slot="button">
          <input
            :value="selectId"
            @input="handleInput"
            maxlength="1"
            type="type"
            class="demo-box button-box" />
        </grid-start>
        <grid-prize
          v-for="(item, index) in items"
          :key="index"
          :pid="item.id"
          :disabled="item.disabled"
          slot="prize"
          ref="prizes">
          <template slot-scope="{ isSelect }">
            <div
              class="demo-box"
              :class="isSelect ? 'select' : ''"
              @click="item.disabled && handleStart()"
            >
              <p v-if="!isNaN(Number(item.id))">id：{{item.id}}</p>
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
  name: 'disabledDemo',
  data () {
    return {
      items: [],
      selectId: 0,
      title: 'disabled宫格'
    }
  },
  components: {
    [gridRoll.name]: gridRoll,
    [gridStart.name]: gridStart,
    [gridPrize.name]: gridPrize
  },
  created () {
    const arr = []
    for (let i = 0; i <= 6; i++) {
      arr.push({
        id: i,
        text: i
      })
    }
    arr.splice(6, 0, {
      text: '抽奖',
      disabled: true
    })
    this.items = arr
  },
  methods: {
    async handleStart () {
      let b = await this.$refs.dial.startRoll(this.selectId)
      this.$emit('ing', b)
    },
    handleUnderway (index) {
      console.log('进行中,index=' + index)
    },
    handleInput (e) {
      const number = Number(e.target.value)
      let num
      if (isNaN(number)) {
        num = 0
      } else if (number > 6) {
        num = 6
      } else {
        num = number
      }
      this.selectId = num
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
