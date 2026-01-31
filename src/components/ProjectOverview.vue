
<template>
  <div class="overview-bg">
    <div class="overview-container">
      <!-- 左侧导航栏 -->
      <AppSidebar />
      <!-- 主内容区 -->
      <main class="main-content">
        <div class="main-header">
          <div class="main-title">项目总览</div>
          <div class="header-actions">
            <button class="btn-analytics" @click="goAnalysis">分析视图</button>
            <button class="btn-create">+ 新建项目</button>
          </div>
        </div>
        <div class="main-toolbar">
          <input class="search-input" placeholder="搜索项目..." />
          <select class="sort-select">
            <option>最近更新</option>
            <option>名称</option>
            <option>风险等级</option>
          </select>
          <button class="btn-refresh">最近更新</button>
        </div>
        <div class="main-tabs">
          <button class="tab active">全部</button>
          <button class="tab">我负责的</button>
          <button class="tab">有风险</button>
          <button class="tab">活跃中</button>
          <button class="tab">已归档</button>
        </div>
        <div class="card-grid">
          <div v-for="project in projects" :key="project.id" class="project-card" :class="project.cardClass">
            <div class="card-bar" :class="project.barClass"></div>
            <div class="card-body">
              <div class="card-header">
                <span v-if="project.icon" class="card-icon">{{ project.icon }}</span>
                <span class="card-title">{{ project.name }}</span>
                <span v-if="project.role" class="card-role">{{ project.role }}</span>
              </div>
              <div class="card-info">
                <span>{{ project.statusText }}</span>
                <span>👥 {{ project.teamSize }}人</span>
                <span>📅 {{ project.daysLeftText }}</span>
              </div>
              <div class="card-progress">
                <span>进度：{{ project.progress }}% ({{ project.storyPoints }})</span>
                <div class="progress-bar">
                  <div class="progress-inner" :style="{ width: project.progress + '%' }"></div>
                </div>
              </div>
              <div class="card-meta">
                <span>🎯 速度：{{ project.velocity }}点/周</span>
                <span>📈 质量：{{ project.quality }}</span>
              </div>
              <div class="card-risk" v-if="project.risks && project.risks.length">
                <div v-for="risk in project.risks" :key="risk" :class="risk.includes('滞后') ? 'risk-late' : 'risk-block'">
                  <span v-if="risk.includes('阻塞')">🔥</span>
                  <span v-if="risk.includes('滞后')">⏰</span>
                  {{ risk }}
                </div>
              </div>
              <div class="card-status" v-if="project.statusTag">
                <span :class="project.statusTagClass">{{ project.statusTag }}</span>
              </div>
              <div class="card-actions">
                <button class="btn-main">{{ project.actionMain }}</button>
                <button v-if="project.actionSec" :class="project.actionSecClass">{{ project.actionSec }}</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import AppSidebar from '@/components/AppSidebar.vue';

export default {
  name: 'ProjectOverview',
  components: {
    AppSidebar
  },
  data() {
    return {
      isSprintOpen: false,
      projects: [
        {
          id: 1,
          name: '电商平台重构',
          icon: '👑',
          statusText: '🟢 活跃',
          teamSize: 8,
          daysLeftText: '15天',
          progress: 65,
          storyPoints: '13/20故事点',
          velocity: 28,
          quality: 'A',
          risks: [],
          statusTag: '✅ 运行正常',
          statusTagClass: 'tag-normal',
          cardClass: 'card-normal',
          barClass: 'bar-green',
          actionMain: '进入项目',
        },
        {
          id: 2,
          name: '移动端APP开发',
          statusText: '🟡 需关注',
          teamSize: 6,
          daysLeftText: '8天',
          progress: 45,
          storyPoints: '9/20故事点',
          velocity: 22,
          quality: 'B+',
          risks: ['滞后1天'],
          statusTag: '',
          cardClass: 'card-warning',
          barClass: 'bar-orange',
          actionMain: '进入项目',
          actionSec: '处理',
          actionSecClass: 'btn-warning',
          role: '团队成员',
        },
        {
          id: 3,
          name: '数据分析平台',
          statusText: '🔴 高风险',
          teamSize: 12,
          daysLeftText: '3天',
          progress: 30,
          storyPoints: '6/20故事点',
          velocity: 15,
          quality: 'C+',
          risks: ['2个阻塞', '滞后5天'],
          statusTag: '',
          cardClass: 'card-danger',
          barClass: 'bar-red',
          actionMain: '进入项目',
          actionSec: '处理',
          actionSecClass: 'btn-danger',
          role: '我负责',
        },
        {
          id: 4,
          name: 'CRM系统升级',
          statusText: '📁 已归档',
          teamSize: 10,
          daysLeftText: '已结束',
          progress: 100,
          storyPoints: '25/25故事点',
          velocity: 30,
          quality: 'A-',
          risks: [],
          statusTag: '✅ 已完成',
          statusTagClass: 'tag-archived',
          cardClass: 'card-archived',
          barClass: 'bar-gray',
          actionMain: '查看详情',
          role: '团队成员',
        },
        {
          id: 5,
          name: '支付网关集成',
          statusText: '🟢 活跃',
          teamSize: 5,
          daysLeftText: '22天',
          progress: 78,
          storyPoints: '16/20故事点',
          velocity: 35,
          quality: 'A+',
          risks: [],
          statusTag: '✅ 运行正常',
          statusTagClass: 'tag-normal',
          cardClass: 'card-normal',
          barClass: 'bar-green',
          actionMain: '进入项目',
          role: '团队成员',
        },
        {
          id: 6,
          name: '客户门户系统',
          statusText: '🟡 需关注',
          teamSize: 7,
          daysLeftText: '12天',
          progress: 52,
          storyPoints: '11/21故事点',
          velocity: 25,
          quality: 'B',
          risks: ['滞后2天'],
          statusTag: '',
          cardClass: 'card-warning',
          barClass: 'bar-orange',
          actionMain: '进入项目',
          actionSec: '处理',
          actionSecClass: 'btn-warning',
          role: '我负责',
        },
      ]
    }
  },
  methods: {
    toggleSprint() {
      this.isSprintOpen = !this.isSprintOpen
    },
    goAnalysis() {
      this.$router.push({ name: 'ProjectAnalysis' })
    }
  }
}
</script>

<style scoped>
.overview-bg {
  min-height: 100vh;
  background: #f6f8fa;
}
.overview-container {
  display: flex;
  height: 100vh;
}
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
.main-content {
  flex: 1;
  padding: 36px 32px 0 32px;
  /* 去掉内部滚动条，交给body滚动 */
  /* overflow-y: auto; */
  min-width: 0;
}
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}
.main-title {
  font-size: 24px;
  font-weight: bold;
  color: #222;
}
.btn-create {
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 24px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background .2s;
}
.btn-create:hover {
  background: #1749b1;
}
.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}
.btn-analytics {
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 24px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background .2s;
}
.btn-analytics:hover {
  background: #1749b1;
}
.main-toolbar {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 18px;
}
.search-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 15px;
}
.sort-select {
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 15px;
}
.btn-refresh {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 8px 18px;
  font-size: 15px;
  color: #222;
  cursor: pointer;
  transition: background .2s;
}
.btn-refresh:hover {
  background: #f0f6ff;
}
.main-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}
.tab {
  background: #f3f6fa;
  color: #666;
  border: none;
  border-radius: 6px;
  padding: 7px 22px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background .2s, color .2s;
}
.tab.active, .tab:hover {
  background: #2563eb;
  color: #fff;
}
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 24px;
}
.project-card {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.04);
  overflow: hidden;
  transition: box-shadow .2s;
  border: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
}
.project-card:hover {
  box-shadow: 0 6px 24px 0 rgba(37,99,235,0.10);
}
.card-bar {
  height: 4px;
}
.bar-green { background: #22c55e; }
.bar-orange { background: #f59e42; }
.bar-red { background: #ef4444; }
.bar-gray { background: #a3a3a3; }
.card-body {
  padding: 22px 22px 18px 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 17px;
  font-weight: bold;
  color: #222;
}
.card-icon {
  font-size: 18px;
}
.card-role {
  margin-left: auto;
  font-size: 13px;
  color: #2563eb;
  background: #f0f6ff;
  border-radius: 6px;
  padding: 2px 10px;
}
.card-info {
  display: flex;
  gap: 18px;
  font-size: 14px;
  color: #666;
}
.card-progress {
  font-size: 14px;
  color: #444;
  margin-bottom: 2px;
}
.progress-bar {
  width: 100%;
  height: 7px;
  background: #e5e7eb;
  border-radius: 6px;
  margin-top: 4px;
  position: relative;
}
.progress-inner {
  height: 100%;
  border-radius: 6px;
  background: #2563eb;
  transition: width .4s;
}
.card-meta {
  display: flex;
  gap: 18px;
  font-size: 13px;
  color: #888;
}
.card-risk {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 13px;
}
.risk-block {
  color: #ef4444;
  font-weight: 500;
}
.risk-late {
  color: #f59e42;
  font-weight: 500;
}
.card-status {
  margin-top: 2px;
}
.tag-normal {
  color: #22c55e;
  font-weight: bold;
  font-size: 15px;
}
.tag-archived {
  color: #2563eb;
  font-weight: bold;
  font-size: 15px;
}
.card-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}
.btn-main {
  flex: 1;
  background: #e8f0fe;
  color: #2563eb;
  border: none;
  border-radius: 7px;
  padding: 8px 0;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background .2s;
}
.btn-main:hover {
  background: #dbeafe;
}
.btn-warning {
  flex: 1;
  background: #fff7ed;
  color: #f59e42;
  border: 1px solid #f59e42;
  border-radius: 7px;
  padding: 8px 0;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background .2s;
}
.btn-warning:hover {
  background: #fef3c7;
}
.btn-danger {
  flex: 1;
  background: #fef2f2;
  color: #ef4444;
  border: 1px solid #ef4444;
  border-radius: 7px;
  padding: 8px 0;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background .2s;
}
.btn-danger:hover {
  background: #fee2e2;
}
@media (max-width: 900px) {
  .overview-container {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
    flex-direction: row;
    height: 60px;
    align-items: center;
    padding: 0;
  }
  .sidebar-header, .sidebar-user {
    display: none;
  }
  .sidebar-nav ul {
    display: flex;
    flex-direction: row;
    gap: 10px;
    padding: 0 10px;
  }
  .sidebar-nav li {
    padding: 0 10px;
    height: 60px;
    border: none;
  }
  .main-content {
    padding: 16px 6px 0 6px;
  }
  .card-grid {
    grid-template-columns: 1fr;
  }
}
</style>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  background: #f6f8fa;
}
</style>
