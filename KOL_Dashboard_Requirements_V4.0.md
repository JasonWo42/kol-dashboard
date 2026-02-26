# KOL数据面板需求文档（V4.0）
》H
## 项目概述

本项目旨在创建一个可视化数据面板，用于收集和呈现KOL（关键意见领袖）在各个项目上的内容表现。通过该面板，用户可以直观地了解KOL营销活动的效果和投资回报率。

## 核心功能模块

### 模块1：财年总览

**目标**：展示各财年的整体KOL营销数据概览。

**功能特性**：
- 财年选择器：支持选择FY23、FY24、FY25、FY26四个财年
- 总览数据卡片：
  - 总KOL数量
  - 总视频数量
  - 总播放数量
  - 综合CPV（总花费/总播放量）
- 总KOL花费展示
- 分平台数据展示：
  - 小红书：播放量、花费、CPV
  - 抖音：播放量、花费、CPV
  - B站：播放量、花费、CPV
  - 其他平台：播放量、花费、CPV

**数据结构**：
```javascript
FYOverview {
  totalKOLCount: Number,
  totalVideoCount: Number,
  totalViews: Number,
  totalCost: Number,
  platforms: {
    xiaohongshu: { views: Number, cost: Number },
    douyin: { views: Number, cost: Number },
    bilibili: { views: Number, cost: Number },
    other: { views: Number, cost: Number }
  }
}
```

### 模块2：Campaign分析

**目标**：展现单个Campaign中所有KOL内容的整体表现，包括CPV分析和分平台数据。

**功能特性**：
- 过滤条件选择：
  - 财政年度选择（FY25、FY26、FY27）
  - 产品选择（支持多选）
  - Campaign选择
- Campaign概览卡片：
  - KOL数量
  - 内容数量
  - 总预算
  - 总播放量
  - 总互动量
  - 总CPV
- 分平台数据展示：
  - 小红书：播放量、花费、CPV
  - 抖音：播放量、花费、CPV
  - B站：播放量、花费、CPV
  - 其他平台：播放量、花费、CPV
- 视频表现散点图：
  - X轴：播放量
  - Y轴：互动量
  - 点大小：视频花费
  - 平台选择器：小红书、抖音、B站（单选）
  - 颜色区分不同平台

**数据结构**：
```javascript
Campaign {
  id: String,
  name: String,
  productName: String | Array,
  fy: String,
  startDate: Date,
  endDate: Date,
  totalBudget: Number,
  totalSpent: Number,
  kolCount: Number,
  contentCount: Number,
  totalViews: Number,
  totalInteractions: Number,
  platforms: {
    xiaohongshu: { views: Number, cost: Number },
    douyin: { views: Number, cost: Number },
    bilibili: { views: Number, cost: Number },
    other: { views: Number, cost: Number }
  }
}
```

### 模块3：Campaign管理

**目标**：管理Campaign信息，支持添加、编辑、删除操作。

**功能特性**：
- Campaign列表展示：
  - 产品名称
  - Campaign名称
  - 总预算
  - KOL数量
  - 时间范围
  - 操作按钮（编辑、删除）
- Campaign表单：
  - 产品名称（多选下拉框，支持复选框和Select all）
    - 选项：碧海黑帆、刺客信条：影
  - Campaign名称（文本输入）
  - 官方预算（数字输入）
  - 其他预算（数字输入）
  - KOL数量（数字输入）
  - 开始日期（日期选择）
  - 结束日期（日期选择）
  - 平台数据输入：
    - 小红书：播放量、预算
    - 抖音：播放量、预算
    - B站：播放量、预算
    - 其他平台：播放量、预算

### 模块4：KOL表现

**目标**：展现单个KOL在过去每个产品和不同Campaign中所制作的视频数量和效果。

**功能特性**：
- 过滤条件选择：
  - 财政年度选择
  - 产品选择
  - Campaign选择
  - KOL选择
- KOL基本信息：
  - 头像
  - 名称
  - 粉丝数
  - ID
- KOL数据概览：
  - 总视频数
  - 总播放量
  - 总互动量
  - 综合互动率
- 项目表现表格：
  - Campaign名称
  - 产品名称
  - 视频标题
  - 平台（带图标和链接）
  - 发布时间
  - 播放量
  - 互动量
  - 互动率
  - 花费

**数据结构**：
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
          name: String,
          videoUrl: String,
          platform: String,
          platformIcon: String,
          publishDate: Date,
          views: Number,
          interactions: Number,
          cost: Number
        }
      ]
    }
  ]
}
```

### 模块5：KOL管理

**目标**：管理KOL信息，支持添加、编辑、删除操作。

**功能特性**：
- KOL列表展示：
  - 头像
  - 名称
  - ID
  - 粉丝数
  - 操作按钮（编辑、删除）
- KOL添加表单：
  - KOL名称
  - 粉丝数
  - Excel文件上传

## 技术实现

### 前端技术栈
- 框架：React 18.2.0
- 数据可视化：Recharts（散点图、柱状图）
- 样式：Tailwind CSS 3.3.3
- 构建工具：Vite 4.4.5
- 图表库：Chart.js 4.4.0, react-chartjs-2 5.2.0

### 项目结构
```
kol-dashboard/
├── src/
│   ├── App.jsx          # 主应用组件
│   ├── main.jsx         # 入口文件
│   └── index.css        # 全局样式
├── package.json         # 依赖配置
├── vite.config.js       # Vite配置
├── tailwind.config.js   # Tailwind配置
└── postcss.config.js    # PostCSS配置
```

### 核心依赖
```json
{
  "dependencies": {
    "chart.js": "^4.4.0",
    "react": "^18.2.0",
    "react-chartjs-2": "^5.2.0",
    "react-dom": "^18.2.0",
    "recharts": "^3.7.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.3",
    "autoprefixer": "^10.4.14",
    "eslint": "^8.45.0",
    "postcss": "^8.4.27",
    "tailwindcss": "^3.3.3",
    "vite": "^4.4.5"
  }
}
```

## 界面导航

### 顶部导航栏
- 财年总览
- Campaign分析
- Campaign管理
- KOL表现
- KOL管理

## 数据模拟

### 财年数据（FY23-FY26）
| 财年 | KOL数量 | 视频数量 | 总播放量 | 总花费 |
|------|---------|----------|----------|--------|
| FY23 | 45 | 128 | 8,500,000 | ¥425,000 |
| FY24 | 62 | 186 | 12,300,000 | ¥580,000 |
| FY25 | 78 | 245 | 16,800,000 | ¥720,000 |
| FY26 | 95 | 312 | 22,500,000 | ¥890,000 |

### 产品选项
- 碧海黑帆
- 刺客信条：影

## 功能亮点

### 1. 多选下拉框组件
- 支持复选框选择
- Select all功能
- 实时显示已选项

### 2. 视频表现散点图
- 播放量vs互动量可视化
- 点大小表示花费
- 平台筛选功能
- 交互式Tooltip

### 3. 响应式设计
- 支持PC端和移动端
- 网格布局自适应

## 后续扩展计划

1. 后端API集成
2. 数据持久化存储
3. 用户权限管理
4. 数据导出功能
5. 更多数据可视化图表
6. 实时数据同步
7. 移动端应用开发

## 版本历史

### V4.0 (2026-02-13)
- 新增财年总览模块
- Campaign分析模块添加视频表现散点图
- Campaign管理模块产品名称改为多选下拉框
- 移除Campaign对比功能
- 散点图添加平台选择器

### V3.0
- 基础Campaign管理和分析功能
- KOL管理和表现追踪
- 分平台数据展示

### V1.0-V2.0
- 项目初始化
- 基础架构搭建
