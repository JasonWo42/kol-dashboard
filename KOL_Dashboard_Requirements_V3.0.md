# KOL数据面板需求文档（V3.0）

## 项目概述

本项目旨在创建一个可视化数据面板，用于收集和呈现KOL（关键意见领袖）在各个项目上的内容表现。通过该面板，用户可以直观地了解KOL营销活动的效果和投资回报率。

## 核心功能

### 功能1：Campaign管理与数据展示

**目标**：管理Campaign信息并展现单个campaign中所有KOL内容的整体表现，包括CPV分析和分平台数据。

**数据录入方式**：
- **手动录入**：通过表单界面手动填写Campaign信息

**需呈现的数据指标**：
1. **基本信息**：
   - Campaign所服务的产品名称
   - Campaign的名称
   - KOL参与度：Campaign中参与的KOL总数量
   - 内容产出：所有KOL在该Campaign中产出的内容总数量
2. **内容表现**（区分D+7和D+30）：
   - 所有内容的总播放量
   - 所有内容的总互动量
3. **成本分析**：
   - 投入成本：在该Campaign中用于KOL合作的总花费
   - 总预算
   - **总CPV**：总预算/总播放量
4. **分平台数据**（小红书、抖音、B站，区分D+7和D+30）：
   - 各平台的播放量
   - 各平台的花费
   - **各平台的CPV**：平台花费/平台播放量

**呈现形式**：
- 看板形式展示，包含上述所有指标的概览卡片
- 分平台数据以单独区域展示，包含平台图标和详细数据
- 可选择具体的Campaign进行查看
- 数据支持实时更新
- 提供Campaign表现对比图表，包含CPV数据
- **数据维度切换**：可切换D+7和D+30的数据视图

### 功能2：KOL数据管理与表现追踪

**目标**：管理KOL信息并展现单个KOL在过去每个产品和不同Campaign中所制作的视频数量和效果，按平台分类展示。

**数据录入方式**：
- **Excel上传**：通过上传Excel文件自动读取KOL数据

**需呈现的数据指标**：
1. **KOL基本信息**：
   - 头像
   - ID/名称
   - 粉丝数量
2. **项目表现**（按产品、Campaign和平台分类，区分D+7和D+30）：
   - **项目信息**：项目名字、Campaign名字
   - **平台信息**：平台图标和名称
   - **视频信息**：
     - 视频链接（以平台图标+超链接形式）
     - 视频发布时间
   - **数据指标**：
     - 播放量
     - 互动量
     - **互动率**：互动量/播放量
     - 单只视频的花费

**呈现形式**：
- 个人概览区域显示KOL基本信息
- 表格形式展示每个项目的详细数据，包含平台列
- 支持按时间、产品、Campaign或平台进行筛选和排序
- 提供数据导出功能
- **数据维度切换**：可切换D+7和D+30的数据视图

## 数据结构需求

### 1. Campaign数据模型

```javascript
Campaign {
  id: String,
  name: String,
  productName: String,
  startDate: Date,
  endDate: Date,
  totalBudget: Number,  // 总预算
  totalSpent: Number,   // 总花费
  kolCount: Number,
  contentCount: Number,
  dataD7: {
    totalViews: Number,
    totalInteractions: Number,
    platforms: {
      xiaohongshu: { views: Number, cost: Number },
      douyin: { views: Number, cost: Number },
      bilibili: { views: Number, cost: Number }
    }
  },
  dataD30: {
    totalViews: Number,
    totalInteractions: Number,
    platforms: {
      xiaohongshu: { views: Number, cost: Number },
      douyin: { views: Number, cost: Number },
      bilibili: { views: Number, cost: Number }
    }
  }
}
```

### 2. KOL数据模型

```javascript
KOL {
  id: String,
  name: String,
  avatar: String,
  followerCount: Number,
  campaigns: [
    {
      campaignId: String,
      campaignName: String,
      productName: String,
      videos: [
        {
          videoId: String,
          videoUrl: String,
          platform: String,        // 平台名称：xiaohongshu/douyin/bilibili
          platformIcon: String,    // 平台图标URL
          publishDate: Date,
          dataD7: {
            views: Number,
            interactions: Number,
            cost: Number
          },
          dataD30: {
            views: Number,
            interactions: Number,
            cost: Number
          }
        }
      ]
    }
  ]
}
```

## 技术需求

### 前端技术栈
- 框架：React/Vue.js/Angular（选择其一）
- 数据可视化：ECharts/Chart.js/D3.js（选择其一）
- 样式：CSS/SCSS/Tailwind CSS
- 响应式设计：支持PC端和移动端
- 文件上传：支持Excel文件解析

### 后端技术栈
- 语言：Node.js/Python/Java（选择其一）
- 数据库：MongoDB/MySQL/PostgreSQL（选择其一）
- API设计：RESTful API
- Excel解析：支持xlsx/xls格式文件解析

### 数据采集
- **Campaign数据**：手动录入
- **KOL数据**：Excel文件上传自动化读取
- 后期可扩展支持自动从各平台API获取数据

## 项目实施计划

### 第一阶段：需求分析与设计
- 确认详细需求
- 设计数据模型
- 设计UI/UX界面

### 第二阶段：核心功能开发
- 搭建基础项目结构
- 实现数据模型
- 开发Campaign管理与数据展示功能
- 开发KOL数据管理与表现追踪功能
- 实现Excel文件上传与解析功能
- 实现D+7和D+30数据维度切换

### 第三阶段：测试与优化
- 功能测试
- 性能优化
- 用户体验优化

### 第四阶段：部署与上线
- 部署到生产环境
- 数据初始化
- 上线运行

## 预期成果

通过本项目的实施，用户将能够：
1. 手动录入Campaign信息并管理
2. 通过Excel上传自动化读取KOL数据
3. 直观了解每个Campaign在D+7和D+30的整体表现和投资回报率
4. 详细了解各平台（小红书、抖音、B站）在不同时间维度的表现差异
5. 追踪单个KOL在不同项目和平台中的表现，包括详细的视频信息
6. 基于数据做出更明智的KOL营销决策

## 后续扩展可能性

1. 添加数据趋势分析功能
2. 集成更多社交媒体平台的数据
3. 实现KOL推荐系统
4. 添加竞品分析功能
5. 开发移动端应用
6. 实现数据自动同步功能，定期从各平台API获取最新数据
