<template>
  <div class="flex h-screen bg-gray-50">
    <!-- 左侧导航栏 -->
    <AppSidebar />
    
    <!-- 右侧主内容区 -->
    <div class="flex-1 overflow-y-auto p-8">
      <div class="mb-6 flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">项目分析</h1>
          <p class="text-gray-600 mt-2">管理您的项目，跟踪进度和风险</p>
        </div>
        <div class="header-actions flex space-x-4">
          <button class="btn-analytics bg-blue-600 text-white px-4 py-2 rounded" @click="goOverview">项目总览</button>
          <button class="btn-create bg-blue-600 text-white px-4 py-2 rounded">+ 新建项目</button>
        </div>
      </div>
      
      <!-- 顶部 KPI 数据卡片 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-gray-500 text-sm">项目总数</p>
              <p class="text-2xl font-bold text-gray-800 mt-1">24</p>
            </div>
            <div class="bg-blue-100 p-3 rounded-lg">
              <i class="fas fa-project-diagram text-blue-600"></i>
            </div>
          </div>
          <div class="mt-4 flex items-center text-green-600 text-sm">
            <i class="fas fa-arrow-up mr-1"></i>
            <span>12% 上月同期</span>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-gray-500 text-sm">活跃项目数</p>
              <p class="text-2xl font-bold text-gray-800 mt-1">18</p>
            </div>
            <div class="bg-green-100 p-3 rounded-lg">
              <i class="fas fa-play-circle text-green-600"></i>
            </div>
          </div>
          <div class="mt-4 flex items-center text-green-600 text-sm">
            <i class="fas fa-arrow-up mr-1"></i>
            <span>8% 上月同期</span>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-gray-500 text-sm">风险项目数</p>
              <p class="text-2xl font-bold text-orange-600 mt-1">4</p>
            </div>
            <div class="bg-orange-100 p-3 rounded-lg">
              <i class="fas fa-exclamation-triangle text-orange-600"></i>
            </div>
          </div>
          <div class="mt-4 flex items-center text-red-600 text-sm">
            <i class="fas fa-arrow-down mr-1"></i>
            <span>3% 上月同期</span>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-gray-500 text-sm">延期项目数</p>
              <p class="text-2xl font-bold text-red-600 mt-1">2</p>
            </div>
            <div class="bg-red-100 p-3 rounded-lg">
              <i class="fas fa-clock text-red-600"></i>
            </div>
          </div>
          <div class="mt-4 flex items-center text-red-600 text-sm">
            <i class="fas fa-arrow-up mr-1"></i>
            <span>5% 上月同期</span>
          </div>
        </div>
      </div>
      
      <!-- 中部多图表组合区 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- 项目健康度环形图 -->
        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-semibold text-gray-800">项目健康度分布</h3>
            <button class="text-gray-500 hover:text-gray-700">
              <i class="fas fa-ellipsis-h"></i>
            </button>
          </div>
          <div class="h-80 flex items-center justify-center">
            <div ref="healthChartRef" class="w-full h-full"></div>
          </div>
        </div>
        
        <!-- 项目进度趋势折线图 -->
        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-semibold text-gray-800">项目进度趋势</h3>
            <button class="text-gray-500 hover:text-gray-700">
              <i class="fas fa-ellipsis-h"></i>
            </button>
          </div>
          <div class="h-80 flex items-center justify-center">
            <div ref="progressChartRef" class="w-full h-full"></div>
          </div>
        </div>
      </div>
      
      <!-- 风险与延期项目柱状图 -->
      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-semibold text-gray-800">风险与延期项目分布</h3>
          <button class="text-gray-500 hover:text-gray-700">
            <i class="fas fa-ellipsis-h"></i>
          </button>
        </div>
        <div class="h-80 flex items-center justify-center">
          <div ref="riskChartRef" class="w-full h-full"></div>
        </div>
      </div>
      
      <!-- 新增团队效率分析图表 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- 团队效率对比柱状图 -->
        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-semibold text-gray-800">团队效率对比</h3>
            <button class="text-gray-500 hover:text-gray-700">
              <i class="fas fa-ellipsis-h"></i>
            </button>
          </div>
          <div class="h-80 flex items-center justify-center">
            <div ref="efficiencyChartRef" class="w-full h-full"></div>
          </div>
        </div>
        
        <!-- 项目类型分布饼图 -->
        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-semibold text-gray-800">项目类型分布</h3>
            <button class="text-gray-500 hover:text-gray-700">
              <i class="fas fa-ellipsis-h"></i>
            </button>
          </div>
          <div class="h-80 flex items-center justify-center">
            <div ref="projectTypeChartRef" class="w-full h-full"></div>
          </div>
        </div>
      </div>
      
      <!-- 新增项目工时分析和缺陷统计 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- 项目工时分布图 -->
        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-semibold text-gray-800">项目工时分布</h3>
            <button class="text-gray-500 hover:text-gray-700">
              <i class="fas fa-ellipsis-h"></i>
            </button>
          </div>
          <div class="h-80 flex items-center justify-center">
            <div ref="workloadChartRef" class="w-full h-full"></div>
          </div>
        </div>
        
        <!-- 缺陷统计趋势图 -->
        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-semibold text-gray-800">缺陷统计趋势</h3>
            <button class="text-gray-500 hover:text-gray-700">
              <i class="fas fa-ellipsis-h"></i>
            </button>
          </div>
          <div class="h-80 flex items-center justify-center">
            <div ref="defectChartRef" class="w-full h-full"></div>
          </div>
        </div>
      </div>
      
      <!-- 底部项目列表区 -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100">
        <div class="p-6 border-b border-gray-100">
          <h3 class="text-lg font-semibold text-gray-800">项目列表</h3>
        </div>
        <div class="p-6 space-y-4">
          <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start">
              <div>
                <h4 class="font-semibold text-gray-800">电商平台重构</h4>
                <div class="flex items-center mt-1 space-x-4">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <i class="fas fa-check-circle mr-1"></i> 运行正常
                  </span>
                  <span class="text-sm text-gray-600">团队: 8人</span>
                  <span class="text-sm text-gray-600">剩余: 12天</span>
                </div>
              </div>
              <div class="text-right">
                <div class="text-sm text-gray-600">速度: 24</div>
                <div class="text-sm text-gray-600">质量: A+</div>
              </div>
            </div>
            <div class="mt-4">
              <div class="flex justify-between text-sm text-gray-600 mb-1">
                <span>进度</span>
                <span>78%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-green-600 h-2 rounded-full" style="width: 78%"></div>
              </div>
            </div>
          </div>
          <div class="border border-orange-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start">
              <div>
                <h4 class="font-semibold text-gray-800">移动端 APP 开发</h4>
                <div class="flex items-center mt-1 space-x-4">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    <i class="fas fa-exclamation-triangle mr-1"></i> 需关注
                  </span>
                  <span class="text-sm text-gray-600">团队: 6人</span>
                  <span class="text-sm text-gray-600">剩余: 5天</span>
                </div>
              </div>
              <div class="text-right">
                <div class="text-sm text-gray-600">速度: 18</div>
                <div class="text-sm text-gray-600">质量: B+</div>
              </div>
            </div>
            <div class="mt-4">
              <div class="flex justify-between text-sm text-gray-600 mb-1">
                <span>进度</span>
                <span>65%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-orange-500 h-2 rounded-full" style="width: 65%"></div>
              </div>
            </div>
          </div>
          <div class="border border-red-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start">
              <div>
                <h4 class="font-semibold text-gray-800">数据分析平台</h4>
                <div class="flex items-center mt-1 space-x-4">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <i class="fas fa-times-circle mr-1"></i> 高风险
                  </span>
                  <span class="text-sm text-gray-600">团队: 10人</span>
                  <span class="text-sm text-gray-600">剩余: -3天</span>
                </div>
              </div>
              <div class="text-right">
                <div class="text-sm text-gray-600">速度: 12</div>
                <div class="text-sm text-gray-600">质量: C</div>
              </div>
            </div>
            <div class="mt-4">
              <div class="flex justify-between text-sm text-gray-600 mb-1">
                <span>进度</span>
                <span>45%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-red-600 h-2 rounded-full" style="width: 45%"></div>
              </div>
            </div>
          </div>
          <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start">
              <div>
                <h4 class="font-semibold text-gray-800">CRM 系统升级</h4>
                <div class="flex items-center mt-1 space-x-4">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <i class="fas fa-check-circle mr-1"></i> 运行正常
                  </span>
                  <span class="text-sm text-gray-600">团队: 5人</span>
                  <span class="text-sm text-gray-600">剩余: 20天</span>
                </div>
              </div>
              <div class="text-right">
                <div class="text-sm text-gray-600">速度: 22</div>
                <div class="text-sm text-gray-600">质量: A</div>
              </div>
            </div>
            <div class="mt-4">
              <div class="flex justify-between text-sm text-gray-600 mb-1">
                <span>进度</span>
                <span>82%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-green-600 h-2 rounded-full" style="width: 82%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppSidebar from '@/components/AppSidebar.vue';
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import { useRouter } from 'vue-router';

export default {
  name: 'ProjectAnalysis',
  components: {
    AppSidebar
  },
  setup() {
    // 图表引用
    const healthChartRef = ref(null);
    const progressChartRef = ref(null);
    const riskChartRef = ref(null);
    const efficiencyChartRef = ref(null);
    const projectTypeChartRef = ref(null);
    const defectChartRef = ref(null);
    
    const router = useRouter();
    const goOverview = () => {
      router.push({ name: 'Projects' });
    };

    onMounted(() => {
      // 项目健康度环形图
      if (healthChartRef.value) {
        const healthChart = echarts.init(healthChartRef.value);
        const healthOption = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'right',
            data: ['活跃', '需关注', '高风险', '已归档']
          },
          series: [
            {
              name: '项目健康度',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '18',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                {
                  value: 18,
                  name: '活跃',
                  itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: '#10B981' },
                      { offset: 1, color: '#047857' }
                    ])
                  }
                },
                {
                  value: 4,
                  name: '需关注',
                  itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: '#F59E0B' },
                      { offset: 1, color: '#D97706' }
                    ])
                  }
                },
                {
                  value: 2,
                  name: '高风险',
                  itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: '#EF4444' },
                      { offset: 1, color: '#DC2626' }
                    ])
                  }
                },
                {
                  value: 0,
                  name: '已归档',
                  itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: '#6B7280' },
                      { offset: 1, color: '#374151' }
                    ])
                  }
                }
              ],
              animation: false
            }
          ]
        };
        healthChart.setOption(healthOption);
      }

      // 项目进度趋势折线图
      if (progressChartRef.value) {
        const progressChart = echarts.init(progressChartRef.value);
        const progressOption = {
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['平均进度', '核心项目']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['第1周', '第2周', '第3周', '第4周']
          },
          yAxis: {
            type: 'value',
            max: 100
          },
          series: [
            {
              name: '平均进度',
              type: 'line',
              stack: '总量',
              data: [30, 50, 65, 78],
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#60A5FA' },
                  { offset: 1, color: '#3B82F6' }
                ])
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: 'rgba(96, 165, 250, 0.3)' },
                  { offset: 1, color: 'rgba(59, 130, 246, 0.1)' }
                ])
              }
            },
            {
              name: '核心项目',
              type: 'line',
              stack: '总量',
              data: [40, 60, 75, 82],
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#34D399' },
                  { offset: 1, color: '#10B981' }
                ])
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: 'rgba(52, 211, 153, 0.3)' },
                  { offset: 1, color: 'rgba(16, 185, 129, 0.1)' }
                ])
              }
            }
          ],
          animation: false
        };
        progressChart.setOption(progressOption);
      }

      // 风险与延期项目柱状图
      if (riskChartRef.value) {
        const riskChart = echarts.init(riskChartRef.value);
        const riskOption = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['风险项目', '延期项目']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: ['电商', 'APP', '系统', '数据', '其他']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '风险项目',
              type: 'bar',
              data: [2, 1, 0, 1, 0],
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#FBBF24' },
                  { offset: 1, color: '#F59E0B' }
                ])
              }
            },
            {
              name: '延期项目',
              type: 'bar',
              data: [1, 1, 0, 0, 0],
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#F87171' },
                  { offset: 1, color: '#EF4444' }
                ])
              }
            }
          ],
          animation: false
        };
        riskChart.setOption(riskOption);
      }

      // 团队效率对比柱状图
      if (efficiencyChartRef.value) {
        const efficiencyChart = echarts.init(efficiencyChartRef.value);
        const efficiencyOption = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['完成任务数', '平均速度']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: ['电商组', '移动组', '数据组', 'CRM组', '基础组']
          },
          yAxis: [
            {
              type: 'value',
              name: '任务数',
              position: 'left',
              min: 0,
              max: 100,
              interval: 20
            },
            {
              type: 'value',
              name: '速度',
              position: 'right',
              min: 0,
              max: 30,
              interval: 5
            }
          ],
          series: [
            {
              name: '完成任务数',
              type: 'bar',
              data: [85, 72, 60, 78, 65],
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#60A5FA' },
                  { offset: 1, color: '#3B82F6' }
                ])
              }
            },
            {
              name: '平均速度',
              type: 'line',
              yAxisIndex: 1,
              data: [24, 18, 12, 22, 16],
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 0, color: '#34D399' },
                  { offset: 1, color: '#10B981' }
                ])
              },
              smooth: true,
              symbolSize: 8,
              lineStyle: {
                width: 3
              }
            }
          ],
          animation: false
        };
        efficiencyChart.setOption(efficiencyOption);
      }

      // 项目类型分布饼图
      if (projectTypeChartRef.value) {
        const projectTypeChart = echarts.init(projectTypeChartRef.value);
        const projectTypeOption = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'right',
            data: ['Web应用', '移动应用', '数据分析', '系统集成', '其他']
          },
          series: [
            {
              name: '项目类型',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '18',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                {
                  value: 10,
                  name: 'Web应用',
                  itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: '#60A5FA' },
                      { offset: 1, color: '#3B82F6' }
                    ])
                  }
                },
                {
                  value: 8,
                  name: '移动应用',
                  itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: '#34D399' },
                      { offset: 1, color: '#10B981' }
                    ])
                  }
                },
                {
                  value: 3,
                  name: '数据分析',
                  itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: '#FBBF24' },
                      { offset: 1, color: '#F59E0B' }
                    ])
                  }
                },
                {
                  value: 2,
                  name: '系统集成',
                  itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: '#F87171' },
                      { offset: 1, color: '#EF4444' }
                    ])
                  }
                },
                {
                  value: 1,
                  name: '其他',
                  itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: '#A78BFA' },
                      { offset: 1, color: '#8B5CF6' }
                    ])
                  }
                }
              ],
              animation: false
            }
          ]
        };
        projectTypeChart.setOption(projectTypeOption);
      }

      // 缺陷统计趋势图
      if (defectChartRef.value) {
        const defectChart = echarts.init(defectChartRef.value);
        const defectOption = {
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['新发现', '已修复', '关闭']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['第1周', '第2周', '第3周', '第4周']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '新发现',
              type: 'line',
              stack: '缺陷',
              data: [15, 18, 12, 8],
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#F87171' },
                  { offset: 1, color: '#EF4444' }
                ])
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: 'rgba(248, 113, 113, 0.3)' },
                  { offset: 1, color: 'rgba(239, 68, 68, 0.1)' }
                ])
              }
            },
            {
              name: '已修复',
              type: 'line',
              stack: '缺陷',
              data: [10, 15, 18, 20],
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#34D399' },
                  { offset: 1, color: '#10B981' }
                ])
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: 'rgba(52, 211, 153, 0.3)' },
                  { offset: 1, color: 'rgba(16, 185, 129, 0.1)' }
                ])
              }
            },
            {
              name: '关闭',
              type: 'line',
              stack: '缺陷',
              data: [5, 12, 15, 18],
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#60A5FA' },
                  { offset: 1, color: '#3B82F6' }
                ])
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: 'rgba(96, 165, 250, 0.3)' },
                  { offset: 1, color: 'rgba(59, 130, 246, 0.1)' }
                ])
              }
            }
          ],
          animation: false
        };
        defectChart.setOption(defectOption);
      }

      // 监听窗口大小变化
      window.addEventListener('resize', () => {
        if (healthChartRef.value) echarts.getInstanceByDom(healthChartRef.value)?.resize();
        if (progressChartRef.value) echarts.getInstanceByDom(progressChartRef.value)?.resize();
        if (riskChartRef.value) echarts.getInstanceByDom(riskChartRef.value)?.resize();
        if (efficiencyChartRef.value) echarts.getInstanceByDom(efficiencyChartRef.value)?.resize();
        if (projectTypeChartRef.value) echarts.getInstanceByDom(projectTypeChartRef.value)?.resize();
        if (defectChartRef.value) echarts.getInstanceByDom(defectChartRef.value)?.resize();
      });
    });

    return {
      healthChartRef,
      progressChartRef,
      riskChartRef,
      efficiencyChartRef,
      projectTypeChartRef,
      defectChartRef,
      goOverview
    };
  }
};
</script>

<style scoped>
body {
  min-height: 1024px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.bg-gray-50 {
  background-color: #F9FAFB;
}

.border-gray-100 {
  border-color: #F3F4F6;
}

.border-gray-200 {
  border-color: #E5E7EB;
}

.text-gray-800 {
  color: #1F2937;
}

.text-gray-700 {
  color: #374151;
}

.text-gray-600 {
  color: #4B5563;
}

.text-gray-500 {
  color: #6B7280;
}

.bg-blue-50 {
  background-color: #EFF6FF;
}

.bg-blue-100 {
  background-color: #DBEAFE;
}

.bg-green-100 {
  background-color: #D1FAE5;
}

.bg-orange-100 {
  background-color: #FFEDD5;
}

.bg-red-100 {
  background-color: #FEE2E2;
}

.text-blue-600 {
  color: #2563EB;
}

.text-green-600 {
  color: #059669;
}

.text-orange-600 {
  color: #EA580C;
}

.text-red-600 {
  color: #DC2626;
}

.text-green-800 {
  color: #166534;
}

.text-orange-800 {
  color: #9A3412;
}

.text-red-800 {
  color: #991B1B;
}

.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.rounded-xl {
  border-radius: 0.75rem;
}

.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.transition-shadow {
  transition-property: box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.whitespace-nowrap {
  white-space: nowrap;
}

.rounded-button {
  border-radius: 0.5rem;
}
</style>