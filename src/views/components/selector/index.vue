<template>
  <div class="selector">
    <div class="ul">
      <label v-for="item in list" :key="item.id">
        <input type="checkbox" name="selector" :value="item.id" v-model="selects">
        <div>{{ item.name }}</div>
      </label>
    </div>
  </div>
</template>

<script>
import { list } from '../../config'
export default {
  name: 'selector',
  data () {
    return {
      list,
      selects: list.map(item => item.id)
    }
  },
  computed: {
  },
  watch: {
    selects: {
      handler (arr) {
        this.$emit('change', arr.join().split(','))
      },
      immediate: true
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
}
</style>
