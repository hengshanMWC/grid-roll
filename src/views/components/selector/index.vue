<template>
  <div class="selector">
    <div class="ul">
      <label v-for="item in list" :key="item.id">
        <input type="checkbox" name="selector" :value="item.id" v-model="selects">
        <div>{{ item.name }}</div>
      </label>
    </div>
    <div class="btn" @click="handleStart">抽奖</div>
  </div>
</template>

<script>
import { list } from '../../config'
export default {
  name: 'selector',
  props: {
    grids: Array
  },
  data () {
    return {
      list,
      selects: list.map(item => item.id)
    }
  },
  watch: {
    selects: {
      handler (arr) {
        this.$emit('change', arr.join().split(','))
      },
      immediate: true
    }
  },
  methods: {
    handleStart () {
      this.grids.forEach(grid => grid.handleStart())
    }
  }
}
</script>

<style lang="scss" scoped>
.selector {
  padding: 30px;
  background: #fff;
  .ul {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
    label {
      input {
        display: none;
      }
      div {
        padding: 12px;
        border: 2px solid #ccc;
        border-radius: 16px;
        font-size: 28px;
        margin: 0 20px 20px 0;
      }
      input:checked + div {
        background: #409EFF;
        border-width: 0;
        color: #fff;
      }
    }
  }
  .btn {
    margin: auto;
    width: 80%;
    height: 80px;
    border-radius: 30px;
    background: #67C23A;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 34px;
  }
}
</style>
