<template>
  <div class="hello-api">
    <h2>调用后端接口 /hello 示例</h2>

    <div v-if="loading">加载中...</div>

    <div v-else>
      <div v-if="error" style="color: red">错误：{{ error }}</div>
      <div v-else-if="data">响应：{{ data }}</div>
      <div v-else>暂无数据</div>
    </div>

    <button @click="fetchHello" style="margin-top:12px">重新请求 /hello</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// 引入我们封装的 http 模块（axios 实例）
import http from '../services/http'

// 响应数据、加载和错误状态
const data = ref(null)
const loading = ref(false)
const error = ref('')

// 请求函数：调用 GET /hello
async function fetchHello() {
  loading.value = true
  error.value = ''
  data.value = null
  try {
    // 注意：http.get 返回的是 axios 的 response 对象
    const res = await http.get('/hello')
    // 根据后端返回结构调整，这里先展示 response.data
    data.value = res.data
  } catch (err) {
    // 兼容错误信息
    error.value = err?.message || String(err)
  } finally {
    loading.value = false
  }
}

// 组件挂载时自动请求一次
onMounted(() => {
  fetchHello()
})
</script>

<style scoped>
.hello-api {
  display: inline-block;
  text-align: left;
  border: 1px solid #eee;
  padding: 16px;
  border-radius: 6px;
}
</style>
