<template>
  <div class="demo-dialSudoku">
    <div>
      <h3>{{title}}-pid模式</h3>
      <grid-roll
        ref="dial"
        @underway="handleUnderway"
        @select="handleSelect"
        direction="l"
        xy="6*5"
        class="box"
        interval="3px"
        :circle="3"
        :startIndex="5">
        <grid-start slot="button">
          <div @click="handleStart" class="demo-box2 button-box2">按钮</div>
        </grid-start>
        <grid-prize v-for="(item, index) in items" :key="index" :pid="item.id" slot="prize" ref="prizes">
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
  name: 'more6x5Demo',
  props: ['param'],
  data () {
    return {
      items: [],
      startArr: [],
      title: '6x5多抽宫格'
    }
  },
  components: {
    [gridRoll.name]: gridRoll,
    [gridStart.name]: gridStart,
    [gridPrize.name]: gridPrize
  },
  created () {
    const arr = []
    for (let i = 2; i < 20; i++) {
      arr.push({
        id: i,
        text: i
      })
    }
    this.items = arr
  },
  methods: {
    async handleStart () {
      let b = await this.$refs.dial.startRoll(this.param)
      this.$emit('ing', b)
    },
    handleUnderway (id) {
      console.log('进行中,id=' + id)
    },
    handleSelect (id, index) {
      if (!index) {
        this.startArr = [id]
      } else {
        this.startArr.push(id)
      }
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
