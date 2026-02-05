# KOL数据面板需求文档

## 项目概述

本项目旨在创建一个可视化数据面板，用于收集和呈现KOL（关键意见领袖）在各个项目上的内容表现。通过该面板，用户可以直观地了解KOL营销活动的效果和投资回报率。

## 核心功能

### 功能1：Campaign级数据展示

**目标**：展现单个campaign中所有KOL内容的整体表现。

**需呈现的数据指标**：
1. **产品信息**：Campaign所服务的产品名称
2. **Campaign信息**：Campaign的名称
3. **KOL参与度**：Campaign中参与的KOL总数量
4. **内容产出**：所有KOL在该Campaign中产出的内容总数量
5. **内容表现**：
   - 所有内容的总播放量
   - 所有内容的总互动量
6. **投入成本**：在该Campaign中用于KOL合作的总花费

**呈现形式**：
- 看板形式展示，包含上述所有指标的概览卡片
- 可选择具体的Campaign进行查看
- 数据支持实时更新

### 功能2：KOL个人表现追踪

**目标**：展现单个KOL在过去每个产品和不同Campaign中所制作的视频数量和效果。

**需呈现的数据指标**：
1. **KOL基本信息**：
   - 头像
   - ID/名称
   - 粉丝数量
2. **项目表现**（按产品和Campaign分类）：
   - 视频链接
   - 播放量
   - 互动量
   - 单只视频的花费

**呈现形式**：
- 个人概览区域显示KOL基本信息
- 表格或列表形式展示每个项目的详细数据
- 支持按时间、产品或Campaign进行筛选和排序
- 提供数据导出功能

## 数据结构需求

### 1. Campaign数据模型
```
Campaign {
  id: String,
  name: String,
  productName: String,
  startDate: Date,
  endDate: Date,
  totalBudget: Number,
  kolCount: Number,
  contentCount: Number,
  totalViews: Number,
  totalInteractions: Number,
  totalSpent: Number
}
```

### 2. KOL数据模型
```
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
          views: Number,
          interactions: Number,
          cost: Number,
          publishDate: Date
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

### 后端技术栈
- 语言：Node.js/Python/Java（选择其一）
- 数据库：MongoDB/MySQL/PostgreSQL（选择其一）
- API设计：RESTful API

### 数据采集
- 支持手动录入数据
- 后期可扩展支持自动从各平台API获取数据

## 项目实施计划

### 第一阶段：需求分析与设计
- 确认详细需求
- 设计数据模型
- 设计UI/UX界面

### 第二阶段：核心功能开发
- 搭建基础项目结构
- 实现数据模型
- 开发Campaign级数据展示功能
- 开发KOL个人表现追踪功能

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
1. 直观了解每个Campaign的整体表现和投资回报率
2. 追踪单个KOL在不同项目中的表现，为后续合作提供数据支持
3. 基于数据做出更明智的KOL营销决策

## 后续扩展可能性

1. 添加数据趋势分析功能
2. 集成更多社交媒体平台的数据
3. 实现KOL推荐系统
4. 添加竞品分析功能
5. 开发移动端应用

---

本需求文档为第一版本，后续可根据实际使用情况和业务需求进行调整和扩展。