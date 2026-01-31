import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/components/Login.vue'
import ProjectOverview from '@/components/ProjectOverview.vue'
import ProjectAnalysis from '@/components/ProjectAnalysis.vue'

const routes = [
  { path: '/', name: 'Login', component: LoginPage },
  { path: '/projects', name: 'Projects', component: ProjectOverview },
  { path: '/projects/analysis', name: 'ProjectAnalysis', component: ProjectAnalysis }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
