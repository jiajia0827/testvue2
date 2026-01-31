<template>
  <div class="login-bg">
    <div class="login-container">
      <!-- 左侧：欢迎 + 表单（匹配截图布局） -->
      <div class="login-left">
        <div class="left-inner">
          <h1 class="welcome-line">欢迎使用，</h1>
          <h2 class="brand">项目过程化管理平台</h2>

          <form class="login-form" @submit.prevent="onLogin">
            <!-- 账号输入框 -->
              <div class="input-item">
                <label class="label-text">账号：</label>
                <input v-model="account" type="text" placeholder="请输入账号" required />
            </div>
            <!-- 密码输入框 -->
              <div class="input-item">
                <label class="label-text">密码：</label>
                <input v-model="password" type="password" placeholder="请输入密码" required />
            </div>
            <!-- 立即登录按钮 -->
            <button class="login-btn" type="submit">立即登录</button>

            <!-- 记住密码 + 忘记密码 -->
            <div class="form-footer">
              <label class="remember-wrap">
                <input type="checkbox" v-model="remember" /> 
                <span class="remember-text">记住密码</span>
              </label>
              <a href="#" class="forgot-pwd">忘记密码？</a>
            </div>

            <!-- 注册链接 -->
            <div class="register-wrap">没有账号？<a href="#" class="register-link">去注册</a></div>
          </form>
        </div>
      </div>

      <!-- 右侧：轮播图 + 信息卡 -->
      <div class="login-right">
        <div class="carousel" @mouseenter="stopCarousel" @mouseleave="startCarousel">
          <div class="slides">
            <div v-for="(img, idx) in images" :key="idx" class="slide" :class="{ active: currentSlide === idx }">
              <img :src="img" alt="slide" />
            </div>
          </div>
          <div class="card-overlay">
            <div class="card-title">专业赋能 管理提效</div>
            <div class="card-desc">助力企业项目管理数字化转型</div>
            <div class="dots">
              <button v-for="(img, idx) in images" :key="idx" :class="['dot', { active: currentSlide===idx }]" @click="goTo(idx)" aria-label="切换图片"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// If your images are placed in `src/assets`, import them so bundler resolves paths correctly.
import img1 from '@/assets/login3.png'
import img2 from '@/assets/login1.png'
import img3 from '@/assets/login4.png'
export default {
  name: 'LoginPage',
  data() {
    return {
      account: '',
      password: '',
      remember: false,
      // Use imported images from src/assets (ensure the files exist there)
      images: [ img1, img2, img3 ],
      currentSlide: 0,
      carouselTimer: null
    }
  },
  methods: {
    onLogin() {
      if (!this.account || !this.password) {
        alert('请输入账号和密码')
        return
      }
      // 日志并检查路由是否可用，避免运行时报错
      console.log('$router on login:', this.$router)
      if (this.$router && typeof this.$router.push === 'function') {
        // 简单模拟登录成功后跳转到项目管理页面
        this.$router.push({ name: 'Projects' })
      } else {
        alert('路由未挂载，无法跳转。请在项目根目录安装并启用 vue-router。')
      }
    },
    startCarousel() {
      this.stopCarousel();
      this.carouselTimer = setInterval(() => {
        this.nextSlide();
      }, 4000);
    },
    stopCarousel() {
      if (this.carouselTimer) {
        clearInterval(this.carouselTimer);
        this.carouselTimer = null;
      }
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.images.length;
    },
    goTo(idx) {
      this.currentSlide = idx;
    }
  },
  mounted() {
    this.startCarousel();
  },
  beforeUnmount() {
    this.stopCarousel();
  }
}
</script>

<style scoped>
/* 全局背景：匹配截图的浅蓝底色 */
.login-bg {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eaf6ff;
  padding: 20px;
  box-sizing: border-box;
}

/* 登录容器：白色卡片，圆角，阴影 */
.login-container {
  display: flex;
  width: 1200px;
  height: 600px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

/* ===== 轮播与右侧样式 ===== */
.carousel {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  overflow: hidden;
}
.slides { flex:1; position:relative; }
.slide { position:absolute; inset:0; opacity:0; transform:scale(1.02); transition:opacity .6s ease, transform .6s ease; display:flex; align-items:center; justify-content:center; }
.slide img { width:100%; height:100%; object-fit:cover; display:block; }
.slide.active { opacity:1; transform:scale(1); }

.card-overlay {
  position:absolute; left:0; right:0; bottom:0; height:160px; display:flex; flex-direction:column; align-items:center; justify-content:center;
  background: linear-gradient(0deg, rgba(17,88,212,0.98) 0%, rgba(38,120,255,0.95) 100%);
  color: #fff; padding:20px; box-sizing:border-box;
}
.card-title { font-size:18px; font-weight:700; margin-bottom:8px }
.card-desc { font-size:13px; opacity:0.95; margin-bottom:12px; text-align:center }
.dots { display:flex; gap:8px }
.dot { width:8px; height:8px; border-radius:50%; background:rgba(255,255,255,0.4); border:none; cursor:pointer }
.dot.active { background:#fff; box-shadow:0 4px 10px rgba(0,0,0,0.15) }


/* 左侧区域：占比50%，内容垂直居中 */
.login-left {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 40px;
  box-sizing: border-box;
}

.left-inner {
  width: 100%;
  max-width: 300px;
}

/* 欢迎文字样式 */
.welcome-line {
  font-size: 28px;
  color: #0066cc;
  font-weight: 500;
  margin: 0 0 8px 0;
  line-height: 1.2;
}

.brand {
  font-size: 28px;
  color: #0066cc;
  font-weight: 500;
  margin: 0 0 40px 0;
  line-height: 1.2;
}

/* 表单样式 */
.login-form {
  width: 100%;
}

/* 输入项：账号/密码行 */
.input-item {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  gap: 12px;
  /* 保证标签与输入在一行，不换行 */
  flex-wrap: nowrap;
}

.label-text {
  font-size: 14px;
  color: #333333;
  width: 64px; /* 提宽标签，防止文字换行 */
  flex-shrink: 0;
  text-align: right;
  white-space: nowrap;
  display: inline-block;
}

.input-item input {
  flex: 1 1 auto;
  min-width: 0; /* 防止在 flex 中超出宽度导致换行 */
  height: 38px;
  padding: 0 12px;
  border: 1px solid #e8e8ea;
  border-radius: 6px;
  outline: none;
  font-size: 14px;
  box-sizing: border-box;
}

.input-item input::placeholder {
  color: #cccccc;
}

/* 登录按钮 */
.login-btn {
  width: 100%;
  height: 40px;
  background-color: #0066cc;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin: 10px 0 16px 0;
}

.login-btn:hover {
  background-color: #0052aa;
}

/* 记住密码 + 忘记密码 */
.form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  margin-bottom: 20px;
}

.remember-wrap {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.remember-wrap input {
  width: 14px;
  height: 14px;
  margin-right: 4px;
}

.remember-text {
  color: #666666;
}

.forgot-pwd {
  color: #0066cc;
  text-decoration: none;
}

.forgot-pwd:hover {
  text-decoration: underline;
}

/* 注册链接 */
.register-wrap {
  font-size: 12px;
  color: #666666;
}

.register-link {
  color: #0066cc;
  text-decoration: none;
  margin-left: 4px;
}

.register-link:hover {
  text-decoration: underline;
}

/* 右侧区域：占比50%，上下布局（图片+蓝色卡片） */
.login-right {
  width: 50%;
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* 右侧图片区域 */
.right-img {
  flex: 1;
  height: 70%;
  overflow: hidden;
}

.right-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 右侧蓝色卡片 */
.right-card {
  background-color: #0066cc;
  color: #ffffff;
  padding: 20px;
  height: 30%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
}

.card-desc {
  font-size: 12px;
  line-height: 1.4;
  opacity: 0.9;
  margin-bottom: 12px;
}

.card-desc p {
  margin: 0;
}

/* 圆点指示器 */
.dot-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
}

.dot.active {
  background-color: #ffffff;
}

/* 移动端适配：小屏幕下改为上下布局 */
@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
    width: 100%;
    height: auto;
  }

  .login-left, .login-right {
    width: 100%;
  }

  .login-left {
    padding: 30px 20px;
  }

  .login-right {
    height: 400px;
  }
}
</style>
