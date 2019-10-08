# grid-roll
宫格抽奖(目前只能是9个)

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

```html
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
```
```javascript
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
```
## grid-roll

> Prop

| 名称        | 说明   |  类型  | 默认值 |
| --------   | -----:  | :----:  | :----:  |
| interval     | 格子左右上下间隔|   String  | 12px |
| startIndex   |    开始的奖品下标	  |  Number  | 0 |
| direction        |    方向，r为顺时针，l为逆时针	    |  String  | r|
| circle        |    专的圈数，请传正整数	    |  Number  | 6 |
| velocity        |    速度	    | Number  | 650 |

> Event

| 名称        | 说明   |  回调参数  |
| --------   | -----:  | :----:  |
| underway     | 抽奖进行中	 |  返回当前的下标   |

> function

| 名称        |  说明   |  参数  |  回调参数  |
| --------   |  :----:  | :-----:  | :----:  |
| startRoll     |  抽奖	 | 宫格奖品下标，如果有grid-prize设置了pid则按根据id来索引 |true表示完成, false表示进行中  |
| initDom     |  初始化抽奖格局	 | 内部会自动调用一次，但如果碰到一些意外的情况，例如屏幕尺寸变化，可以再次调用 | - |

## grid-prize

> Prop

| 名称        | 说明   |  类型  | 默认值 |
| --------   | -----:  | :----:  | :----:  |
| boxShadow     | 滚动选中的box-shadow |   String  | #eaa665 0 0 8px 2px |
| pid   |    唯一标识，startRoll会根据这个去选择结束目标	  |  any  | - |
