# grid-roll
多宫格抽奖

# 介绍
ui和逻辑分离，组件封装了逻辑和宫格布局，让开发者只关注奖品和按钮的ui部分。grid-roll有两种抽奖模式。
1. 默认模式为**下标**，startRoll方法和startIndex属性会按下标进行索引和输出
2. 还有一种是**pid**模式，在grid-prize传入pid,startRoll方法和startIndex属性会根据pid进行索引和输出

# 安装
```bash
npm i grid-roll -S
yarn add grid-roll
```

# 引入
```javascript
/** 引入 */
import { gridRoll, gridStart, gridPrize } from 'grid-roll'
import 'grid-roll/dist/grid-roll.min.css'
```
# demo

### [在线demo page预览](https://hengshanmwc.github.io/grid-roll/dist/index.html)

## grid-roll

抽奖有两种模式，一种是index,另外一种是pid

> Prop

| 名称        | 说明   |  类型  | 默认值 |
| --------   | -----:  | :----:  | :----:  |
| xy     | 宫格 |   String  | 3*3 |
| interval     | 格子左右上下间隔|   String  | 0px |
| startIndex   |    开始的奖品下标或者pid。如果启用了pid模式，请务必设置该值	  |  Number  | 0 |
| direction        |    方向，r为顺时针，l为逆时针	    |  String  | r|
| circle        |    圈数    |  Number  | 6 |
| velocity        |    速度，相当于定时器	    | Number  | 650 |
| minVelocity        |    滚动最小间隔上限，传0或者false	    | Number/Boolean  | 40 |
> Event

| 名称        | 说明   |  回调参数  |
| --------   | -----:  | :----:  |
| underway     | 抽奖进行中	 |  index或者pid  |

> function

| 名称        |  说明   |  参数  |  回调参数  |
| --------   |  :----:  | :-----:  | :----:  |
| startRoll     |  抽奖	 | 下标或者pid |true表示完成, false表示进行中  |
| continueRoll     |  持续滚动	 | - | -  |
| stopRoll  |  停止滚动	 | - | -  |
| initDom     |  初始化抽奖格局，内部会自动调用一次，但如果碰到一些意外的情况，例如屏幕尺寸变化，可以再次调用	 | - | - |
| lamplight |  操作中奖的灯光开关	 | [Boolean = false] | - |

## grid-prize

> Prop

| 名称        | 说明   |  类型  | 默认值 |
| --------   | -----:  | :----:  | :----:  |
| selStyle     | 滚动选中的样式 |   String  | {box-shadow: red 0 0 12px 4px} |
| pid   |    使用pid模式	  |  any  | - |

```html
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
      <grid-roll ref="dial2" @underway="handleUnderway2" direction="l" xy="6*5" class="box" :startIndex="1">
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
```
```javascript
import { gridRoll, gridStart, gridPrize } from 'grid-roll'
import 'grid-roll/dist/grid-roll.min.css'
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
```
```css
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
```
