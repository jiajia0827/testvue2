// axios 封装：统一配置 baseURL 与超时时间，导出常用方法
import axios from 'axios'

// 创建 axios 实例，统一配置后端接口前缀与超时时间
const http = axios.create({
  baseURL: 'http://localhost:8080/api', // 后端接口统一前缀
  timeout: 5000 // 请求超时，单位：ms
})

// 请求拦截器（可统一添加 header、token 等）
http.interceptors.request.use(
  config => {
    // 比如：config.headers['Authorization'] = 'Bearer ' + token
    return config
  },
  error => Promise.reject(error)
)

// 响应拦截器（可统一处理响应格式、错误码等）
http.interceptors.response.use(
  response => {
    // 这里可以按后端返回结构自定义处理，例如统一取 data 字段
    return response
  },
  error => {
    // 可以做统一的错误处理（例如提示、日志上报等）
    return Promise.reject(error)
  }
)

// 导出常用方法，方便组件调用
export default {
  // GET 请求，params 为查询参数对象
  get(url, params = {}, config = {}) {
    return http.get(url, { params, ...config })
  },

  // POST 请求，data 为请求体对象
  post(url, data = {}, config = {}) {
    return http.post(url, data, config)
  },

  // 可根据需要继续扩展 put/delete/patch 等方法
  put(url, data = {}, config = {}) {
    return http.put(url, data, config)
  },

  delete(url, params = {}, config = {}) {
    return http.delete(url, { params, ...config })
  }
}
