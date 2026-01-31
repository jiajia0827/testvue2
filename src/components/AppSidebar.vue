<template>
  <aside class="sidebar">
    <div class="sidebar-header">智能项目管理平台</div>
    <nav class="sidebar-nav">
      <ul>
        <li class="active"><span>项目列表</span></li>
        <li><span>仪表盘</span></li>
        <li :class="['has-sub', { active: isSprintOpen }]" @click="toggleSprint">
          <span>Sprint启动</span>
        </li>
        <li class="sub" v-show="isSprintOpen">
          <ul>
            <li><span>产品待办项</span></li>
            <li><span>用户故事</span></li>
            <li><span>任务看板</span></li>
          </ul>
        </li>
        <li><span>每日站会</span></li>
        <li><span>迭代评审与回顾</span></li>
        <li><span>文档管理</span></li>
        <li><span>用户与权限</span></li>
      </ul>
    </nav>
    <div class="sidebar-user">
      <img src="https://ai-public.mastergo.com/ai/img_res/1769742007788a3K9mP2xN4rT8wY.jpg" alt="User">
      <div>
        <div class="user-name">张伟</div>
        <div class="user-role">产品负责人</div>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'AppSidebar',
  data() {
    return {
      isSprintOpen: false
    }
  },
  methods: {
    toggleSprint() {
      this.isSprintOpen = !this.isSprintOpen;
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 220px;
  background: #fff;
  box-shadow: 2px 0 8px 0 rgba(0,0,0,0.04);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.sidebar-header {
  font-size: 20px;
  font-weight: bold;
  color: #222;
  padding: 32px 0 24px 32px;
  border-bottom: 1px solid #f0f0f0;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0 0 0 0;
  margin: 0;
}

.sidebar-nav li {
  padding: 0 0 0 32px;
  height: 48px;
  display: flex;
  align-items: center;
  color: #666;
  font-size: 15px;
  cursor: pointer;
  border-left: 4px solid transparent;
  transition: background .2s, color .2s;
}

.sidebar-nav li.active, .sidebar-nav li:hover {
  color: #2563eb;
  background: #f0f6ff;
  border-left: 4px solid #2563eb;
}

.sidebar-nav li.sub {
  padding-left: 0;
  background: none;
  border: none;
  height: auto;
}

.sidebar-nav li.sub ul {
  padding-left: 12px;
}

.sidebar-nav li.sub li {
  font-size: 13px;
  color: #888;
  height: 36px;
  border: none;
  background: none;
}

.has-sub {
  cursor: pointer;
}

.sidebar-user {
  display: flex;
  align-items: center;
  padding: 24px 0 24px 32px;
  border-top: 1px solid #f0f0f0;
}

.sidebar-user img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
}

.user-name {
  font-size: 15px;
  color: #222;
  font-weight: 500;
}

.user-role {
  font-size: 12px;
  color: #888;
}
</style>