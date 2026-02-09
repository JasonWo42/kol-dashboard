# 启动KOL数据面板项目计划

## 项目概述
这是一个基于React + Vite的KOL数据面板项目，使用Tailwind CSS进行样式设计，Chart.js和recharts库进行数据可视化。项目包含Dashboard、Campaign分析、Campaign管理、KOL表现和KOL管理等功能模块。

## 启动步骤

### 1. 安装依赖
- 运行 `npm install` 命令安装项目所需的所有依赖包

### 2. 启动开发服务器
- 运行 `npm run dev` 命令启动本地开发服务器
- 查看服务器输出的访问URL

### 3. 访问项目
- 在浏览器中打开开发服务器提供的URL
- 查看项目的各个功能模块

### 4. 验证功能
- 测试Dashboard页面的统计数据显示
- 测试Campaign分析页面的过滤和数据展示
- 测试Campaign管理页面的创建、编辑、删除功能
- 测试KOL表现页面的数据展示
- 测试KOL管理页面的功能

## 技术栈
- React 18.2.0
- Vite 4.4.5
- Tailwind CSS 3.3.3
- Chart.js 4.4.0
- recharts 3.7.0

## 项目结构
- src/App.jsx：主应用组件，包含所有功能模块
- src/main.jsx：应用入口点
- src/index.css：全局样式

## 模拟数据
项目使用了模拟数据，包括5个Campaign和3个KOL的详细信息，以便直接查看和测试所有功能。