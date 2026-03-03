import React, { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts'
import * as XLSX from 'xlsx'
import axios from 'axios'
import * as cheerio from 'cheerio'

const fyOverviewData = {
  FY23: {
    totalKOLCount: 45,
    totalVideoCount: 128,
    totalViews: 8500000,
    barterKOLCount: 12,
    barterVideoCount: 35,
    barterViews: 2100000,
    paidKOLCount: 33,
    paidVideoCount: 93,
    paidViews: 6400000,
    totalCost: 425000,
    platforms: {
      xiaohongshu: { views: 3200000, cost: 140000 },
      douyin: { views: 3800000, cost: 200000 },
      bilibili: { views: 1200000, cost: 65000 },
      other: { views: 300000, cost: 20000 }
    }
  },
  FY24: {
    totalKOLCount: 62,
    totalVideoCount: 186,
    totalViews: 12300000,
    barterKOLCount: 18,
    barterVideoCount: 52,
    barterViews: 3100000,
    paidKOLCount: 44,
    paidVideoCount: 134,
    paidViews: 9200000,
    totalCost: 580000,
    platforms: {
      xiaohongshu: { views: 4800000, cost: 195000 },
      douyin: { views: 5500000, cost: 280000 },
      bilibili: { views: 1600000, cost: 85000 },
      other: { views: 400000, cost: 20000 }
    }
  },
  FY25: {
    totalKOLCount: 78,
    totalVideoCount: 245,
    totalViews: 16800000,
    barterKOLCount: 22,
    barterVideoCount: 68,
    barterViews: 4200000,
    paidKOLCount: 56,
    paidVideoCount: 177,
    paidViews: 12600000,
    totalCost: 720000,
    platforms: {
      xiaohongshu: { views: 6500000, cost: 250000 },
      douyin: { views: 7500000, cost: 350000 },
      bilibili: { views: 2200000, cost: 100000 },
      other: { views: 600000, cost: 20000 }
    }
  },
  FY26: {
    totalKOLCount: 95,
    totalVideoCount: 312,
    totalViews: 22500000,
    barterKOLCount: 28,
    barterVideoCount: 85,
    barterViews: 5600000,
    paidKOLCount: 67,
    paidVideoCount: 227,
    paidViews: 16900000,
    totalCost: 890000,
    platforms: {
      xiaohongshu: { views: 8500000, cost: 310000 },
      douyin: { views: 10200000, cost: 430000 },
      bilibili: { views: 3000000, cost: 120000 },
      other: { views: 800000, cost: 30000 }
    }
  }
}

const mockCampaigns = [
  {
    id: 'campaign1',
    name: '新年促销',
    productName: '智能手表',
    fy: 'FY25',
    startDate: '2025-12-01',
    endDate: '2025-12-31',
    totalBudget: 75000,
    totalSpent: 60000,
    kolCount: 6,
    contentCount: 12,
    totalViews: 750000,
    totalInteractions: 28000,
    barterKOLCount: 2,
    barterVideoCount: 3,
    barterViews: 120000,
    paidKOLCount: 4,
    paidVideoCount: 9,
    paidViews: 630000,
    platforms: {
      xiaohongshu: { views: 250000, cost: 15000 },
      douyin: { views: 400000, cost: 35000 },
      bilibili: { views: 100000, cost: 10000 },
      other: { views: 0, cost: 0 }
    }
  },
  {
    id: 'campaign2',
    name: '夏季新品推广',
    productName: '清凉系列饮料',
    fy: 'FY26',
    startDate: '2026-01-01',
    endDate: '2026-01-31',
    totalBudget: 100000,
    totalSpent: 85000,
    kolCount: 15,
    contentCount: 32,
    totalViews: 1250000,
    totalInteractions: 45000,
    barterKOLCount: 5,
    barterVideoCount: 10,
    barterViews: 300000,
    paidKOLCount: 10,
    paidVideoCount: 22,
    paidViews: 950000,
    platforms: {
      xiaohongshu: { views: 450000, cost: 30000 },
      douyin: { views: 650000, cost: 40000 },
      bilibili: { views: 150000, cost: 15000 },
      other: { views: 0, cost: 0 }
    }
  },
  {
    id: 'campaign3',
    name: '品牌形象打造',
    productName: '高端护肤系列',
    fy: 'FY27',
    startDate: '2027-01-01',
    endDate: '2027-01-31',
    totalBudget: 90000,
    totalSpent: 72000,
    kolCount: 12,
    contentCount: 24,
    totalViews: 980000,
    totalInteractions: 38000,
    barterKOLCount: 3,
    barterVideoCount: 6,
    barterViews: 180000,
    paidKOLCount: 9,
    paidVideoCount: 18,
    paidViews: 800000,
    platforms: {
      xiaohongshu: { views: 500000, cost: 30000 },
      douyin: { views: 380000, cost: 30000 },
      bilibili: { views: 100000, cost: 12000 },
      other: { views: 0, cost: 0 }
    }
  },
  {
    id: 'campaign4',
    name: '节日促销活动',
    productName: '智能手表',
    fy: 'FY26',
    startDate: '2026-02-01',
    endDate: '2026-02-29',
    totalBudget: 80000,
    totalSpent: 65000,
    kolCount: 8,
    contentCount: 16,
    totalViews: 890000,
    totalInteractions: 32000,
    barterKOLCount: 2,
    barterVideoCount: 4,
    barterViews: 160000,
    paidKOLCount: 6,
    paidVideoCount: 12,
    paidViews: 730000,
    platforms: {
      xiaohongshu: { views: 300000, cost: 20000 },
      douyin: { views: 500000, cost: 35000 },
      bilibili: { views: 90000, cost: 10000 },
      other: { views: 0, cost: 0 }
    }
  },
  {
    id: 'campaign5',
    name: '座位Sample项目',
    productName: '高端护肤系列',
    fy: 'FY26',
    startDate: '2026-03-01',
    endDate: '2026-03-31',
    totalBudget: 60000,
    totalSpent: 50000,
    kolCount: 5,
    contentCount: 10,
    totalViews: 650000,
    totalInteractions: 25000,
    barterKOLCount: 1,
    barterVideoCount: 2,
    barterViews: 100000,
    paidKOLCount: 4,
    paidVideoCount: 8,
    paidViews: 550000,
    platforms: {
      xiaohongshu: { views: 350000, cost: 20000 },
      douyin: { views: 250000, cost: 25000 },
      bilibili: { views: 50000, cost: 5000 },
      other: { views: 0, cost: 0 }
    }
  }
]

const mockKOLs = [
  {
    id: 'kol1',
    name: '美食小王',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20food%20blogger%20avatar%20portrait&image_size=square',
    followerCount: 1250000,
    bilibiliUsername: '美食小王',
    bilibiliId: '123456789',
    xiaohongshuUsername: '美食达人小王',
    xiaohongshuId: '987654321',
    douyinUsername: '小王美食',
    douyinId: '1122334455',
    campaigns: [
      {
        campaignId: 'campaign1',
        campaignName: '夏季新品推广',
        productName: '清凉系列饮料',
        fy: 'FY25',
        videos: [
          {
            videoId: 'video1',
            name: '夏日必备！这款清凉饮料让我彻底爱上夏天',
            videoUrl: 'https://example.com/video1',
            platform: 'xiaohongshu',
            platformIcon: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=xiaohongshu%20logo%20icon&image_size=square',
            publishDate: '2026-01-15',
            views: 250000,
            interactions: 12000,
            cost: 8000
          },
          {
            videoId: 'video2',
            name: '测评：市面上最火的清凉饮料大PK',
            videoUrl: 'https://example.com/video2',
            platform: 'douyin',
            platformIcon: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=douyin%20logo%20icon&image_size=square',
            publishDate: '2026-01-16',
            views: 180000,
            interactions: 9000,
            cost: 6500
          }
        ]
      }
    ]
  },
  {
    id: 'kol2',
    name: '科技小李',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tech%20reviewer%20professional%20avatar%20portrait&image_size=square',
    followerCount: 890000,
    bilibiliUsername: '科技小李',
    bilibiliId: '223344556',
    xiaohongshuUsername: '科技评测师小李',
    xiaohongshuId: '665544332',
    douyinUsername: '小李科技',
    douyinId: '556677889',
    campaigns: [
      {
        campaignId: 'campaign2',
        campaignName: '节日促销活动',
        productName: '智能手表',
        fy: 'FY26',
        videos: [
          {
            videoId: 'video3',
            name: '2026年最值得购买的智能手表全面评测',
            videoUrl: 'https://example.com/video3',
            platform: 'bilibili',
            platformIcon: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bilibili%20logo%20icon&image_size=square',
            publishDate: '2026-02-10',
            views: 320000,
            interactions: 15000,
            cost: 12000
          }
        ]
      }
    ]
  },
  {
    id: 'kol3',
    name: '时尚小张',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fashion%20blogger%20stylish%20avatar%20portrait&image_size=square',
    followerCount: 1560000,
    bilibiliUsername: '时尚小张',
    bilibiliId: '334455667',
    xiaohongshuUsername: '时尚博主小张',
    xiaohongshuId: '776655443',
    douyinUsername: '小张时尚',
    douyinId: '998877665',
    campaigns: [
      {
        campaignId: 'campaign3',
        campaignName: '品牌形象打造',
        productName: '高端护肤系列',
        fy: 'FY27',
        videos: [
          {
            videoId: 'video4',
            name: '护肤必备！这款高端系列让我的皮肤重获新生',
            videoUrl: 'https://example.com/video4',
            platform: 'xiaohongshu',
            platformIcon: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=xiaohongshu%20logo%20icon&image_size=square',
            publishDate: '2026-03-15',
            views: 450000,
            interactions: 22000,
            cost: 15000
          },
          {
            videoId: 'video5',
            name: '30天使用报告：这款护肤品真的值得入手吗？',
            videoUrl: 'https://example.com/video5',
            platform: 'douyin',
            platformIcon: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=douyin%20logo%20icon&image_size=square',
            publishDate: '2026-03-16',
            views: 380000,
            interactions: 18000,
            cost: 12000
          }
        ]
      }
    ]
  }
]

function App() {
  const [activeTab, setActiveTab] = useState('campaign')
  const [selectedCampaign, setSelectedCampaign] = useState(mockCampaigns[0])
  const [selectedKOL, setSelectedKOL] = useState(mockKOLs[0])
  
  const [selectedFYs, setSelectedFYs] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])
  const [selectedCampaignFiltered, setSelectedCampaignFiltered] = useState(null)
  const [fyDisplayText, setFyDisplayText] = useState('请选择')
  const [productDisplayText, setProductDisplayText] = useState('请选择')
  
  const [selectedFY, setSelectedFY] = useState('FY26')
  const [selectedScatterPlatform, setSelectedScatterPlatform] = useState('xiaohongshu')
  
  const [campaigns, setCampaigns] = useState(mockCampaigns)
  const [showCampaignForm, setShowCampaignForm] = useState(false)
  const [editingCampaign, setEditingCampaign] = useState(null)
  const [campaignFormData, setCampaignFormData] = useState({
    name: '',
    productName: [],
    officialBudget: '',
    otherBudget: '',
    startDate: '',
    endDate: '',
    kolCount: '',
    platforms: {
      xiaohongshu: { views: '', cost: '' },
      douyin: { views: '', cost: '' },
      bilibili: { views: '', cost: '' },
      other: { views: '', cost: '' }
    }
  })
  
  const productOptions = ['碧海黑帆', '刺客信条：影']
  
  const [kolSearchQuery, setKolSearchQuery] = useState('')
  const [showKolDropdown, setShowKolDropdown] = useState(false)
  const [selectedKolForDisplay, setSelectedKolForDisplay] = useState(null)
  
  const [showAddVideoForm, setShowAddVideoForm] = useState(false)
  const [addVideoFormData, setAddVideoFormData] = useState({
    videoUrl: '',
    views: '',
    interactions: '',
    cost: '',
    platform: 'xiaohongshu',
    fy: '',
    productName: '',
    campaignName: ''
  })
  
  const [kols, setKols] = useState(mockKOLs)
  const [showKOLForm, setShowKOLForm] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [filePreview, setFilePreview] = useState(null)

  const [kolSelectedFY, setKolSelectedFY] = useState('')
  const [kolSelectedProduct, setKolSelectedProduct] = useState('')
  const [kolSelectedPlatform, setKolSelectedPlatform] = useState('')

  const [uploadFY, setUploadFY] = useState('')
  const [uploadProduct, setUploadProduct] = useState('')
  const [uploadCampaign, setUploadCampaign] = useState('')
  const [uploadFile, setUploadFile] = useState(null)
  const [uploadStatus, setUploadStatus] = useState('')
  const [processing, setProcessing] = useState(false)

  const parseExcelFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result)
          const workbook = XLSX.read(data, { type: 'array' })
          const sheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[sheetName]
          const jsonData = XLSX.utils.sheet_to_json(worksheet)
          resolve(jsonData)
        } catch (error) {
          reject(error)
        }
      }
      reader.onerror = (error) => reject(error)
      reader.readAsArrayBuffer(file)
    })
  }

  const crawlVideoInfo = async (url) => {
    try {
      const response = await axios.get(url)
      const $ = cheerio.default.load(response.data)
      
      // 尝试获取标题
      let title = $('title').text().trim() || '未知标题'
      
      // 尝试获取发布日期（不同平台可能有不同的选择器）
      let publishDate = new Date().toISOString().split('T')[0]
      
      // 这里需要根据不同平台的HTML结构调整选择器
      // 示例：B站
      const bilibiliDate = $('meta[property="article:published_time"]').attr('content')
      if (bilibiliDate) {
        publishDate = new Date(bilibiliDate).toISOString().split('T')[0]
      }
      
      // 示例：小红书
      const xhsDate = $('meta[name="publish_time"]').attr('content')
      if (xhsDate) {
        publishDate = new Date(xhsDate).toISOString().split('T')[0]
      }
      
      // 示例：抖音
      const douyinDate = $('meta[property="article:published_time"]').attr('content')
      if (douyinDate) {
        publishDate = new Date(douyinDate).toISOString().split('T')[0]
      }
      
      return { title, publishDate }
    } catch (error) {
      console.error('爬取视频信息失败:', error)
      return { title: '未知标题', publishDate: new Date().toISOString().split('T')[0] }
    }
  }

  const processCost = (cost) => {
    if (typeof cost === 'number') {
      return cost
    }
    if (typeof cost === 'string') {
      const lowerCost = cost.toLowerCase()
      if (lowerCost === '分发' || lowerCost === '置换') {
        return 0
      }
      const numericCost = parseFloat(cost.replace(/[^0-9.]/g, ''))
      return isNaN(numericCost) ? 0 : numericCost
    }
    return 0
  }

  const processVideoPlatform = (url) => {
    if (url.includes('bilibili')) return 'bilibili'
    if (url.includes('xiaohongshu')) return 'xiaohongshu'
    if (url.includes('douyin') || url.includes('tiktok')) return 'douyin'
    return 'other'
  }

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'xiaohongshu':
        return 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=xiaohongshu%20logo%20icon&image_size=square'
      case 'douyin':
        return 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=douyin%20logo%20icon&image_size=square'
      case 'bilibili':
        return 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bilibili%20logo%20icon&image_size=square'
      default:
        return 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=generic%20platform%20icon&image_size=square'
    }
  }

  const handleFileUpload = async () => {
    if (!uploadFY || !uploadProduct || !uploadCampaign || !uploadFile) {
      alert('请填写所有筛选条件并选择文件');
      return;
    }

    setProcessing(true)
    setUploadStatus('正在处理文件...')

    try {
      // 解析Excel文件
      const excelData = await parseExcelFile(uploadFile)
      setUploadStatus(`解析完成，发现 ${excelData.length} 条数据`)

      // 处理每条数据
      const processedData = []
      for (let i = 0; i < excelData.length; i++) {
        const row = excelData[i]
        setUploadStatus(`处理第 ${i + 1}/${excelData.length} 条数据`)

        // 提取数据
        const url = row['url'] || row['视频链接'] || row['链接'] || ''
        const kolName = row['kol'] || row['KOL'] || row['达人'] || row['姓名'] || '未知KOL'
        const views = parseInt(row['播放量'] || row['观看量'] || 0)
        const interactions = parseInt(row['互动量'] || row['互动'] || 0)
        const cost = processCost(row['价格'] || row['花费'] || row['费用'] || 0)

        if (!url) {
          console.warn('跳过缺少URL的行:', row)
          continue
        }

        // 爬取视频信息
        const { title, publishDate } = await crawlVideoInfo(url)
        const platform = processVideoPlatform(url)
        const platformIcon = getPlatformIcon(platform)

        processedData.push({
          url,
          kolName,
          views,
          interactions,
          cost,
          title,
          publishDate,
          platform,
          platformIcon
        })

        // 避免请求过快被封
        await new Promise(resolve => setTimeout(resolve, 1000))
      }

      setUploadStatus(`处理完成，成功处理 ${processedData.length} 条数据`)

      // 将数据添加到系统中
      addVideosToSystem(processedData)

      // 重置表单
      setUploadFY('')
      setUploadProduct('')
      setUploadCampaign('')
      setUploadFile(null)
      setUploadStatus('')
      setProcessing(false)
      alert('数据上传成功！所有视频数据已录入系统。')

    } catch (error) {
      console.error('处理文件失败:', error)
      setUploadStatus('处理失败: ' + error.message)
      setProcessing(false)
      alert('处理文件失败，请检查控制台错误信息')
    }
  }

  const addVideosToSystem = (videos) => {
    videos.forEach(video => {
      // 生成新视频对象
      const newVideo = {
        videoId: `video${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        name: video.title,
        videoUrl: video.url,
        platform: video.platform,
        platformIcon: video.platformIcon,
        publishDate: video.publishDate,
        views: video.views,
        interactions: video.interactions,
        cost: video.cost
      }

      // 生成新campaign对象（如果需要）
      const newCampaign = {
        campaignId: `campaign${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        campaignName: uploadCampaign,
        productName: uploadProduct,
        fy: uploadFY,
        videos: [newVideo]
      }

      // 生成新KOL对象（如果需要）
      const newKol = {
        id: `kol${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        name: video.kolName,
        avatar: `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20influencer%20avatar&image_size=square`,
        followerCount: 0,
        bilibiliUsername: video.kolName,
        bilibiliId: '',
        xiaohongshuUsername: video.kolName,
        xiaohongshuId: '',
        douyinUsername: video.kolName,
        douyinId: '',
        campaigns: [newCampaign]
      }

      // 一次性更新状态，避免异步更新问题
      setKols(prev => {
        // 查找KOL
        const existingKolIndex = prev.findIndex(k => k.name === video.kolName)
        
        if (existingKolIndex === -1) {
          // KOL不存在，添加新KOL
          return [...prev, newKol]
        } else {
          // KOL存在，查找campaign
          const existingKol = prev[existingKolIndex]
          const existingCampaignIndex = existingKol.campaigns.findIndex(c => c.campaignName === uploadCampaign)
          
          if (existingCampaignIndex === -1) {
            // Campaign不存在，添加新campaign
            return prev.map((k, index) => 
              index === existingKolIndex 
                ? { ...k, campaigns: [...k.campaigns, newCampaign] }
                : k
            )
          } else {
            // Campaign存在，添加视频
            return prev.map((k, index) => 
              index === existingKolIndex 
                ? {
                    ...k,
                    campaigns: k.campaigns.map((c, cIndex) => 
                      cIndex === existingCampaignIndex
                        ? { ...c, videos: [...c.videos, newVideo] }
                        : c
                    )
                  }
                : k
            )
          }
        }
      })
    })
  }

  const handleCampaignFormChange = (e) => {
    const { name, value } = e.target
    
    if (name.includes('_')) {
      const [platform, type] = name.split('_')
      setCampaignFormData(prev => ({
        ...prev,
        platforms: {
          ...prev.platforms,
          [platform]: {
            ...prev.platforms[platform],
            [type]: value
          }
        }
      }))
    } else {
      setCampaignFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }
  
  const handleProductToggle = (product) => {
    setCampaignFormData(prev => {
      const newProducts = prev.productName.includes(product)
        ? prev.productName.filter(p => p !== product)
        : [...prev.productName, product]
      return {
        ...prev,
        productName: newProducts
      }
    })
  }
  
  const handleSelectAllProducts = () => {
    if (campaignFormData.productName.length === productOptions.length) {
      setCampaignFormData(prev => ({
        ...prev,
        productName: []
      }))
    } else {
      setCampaignFormData(prev => ({
        ...prev,
        productName: [...productOptions]
      }))
    }
  }

  const handleCampaignSubmit = (e) => {
    e.preventDefault()
    
    const totalViews = Object.values(campaignFormData.platforms).reduce((sum, platform) => {
      return sum + parseInt(platform.views || 0)
    }, 0)
    
    const totalSpent = Object.values(campaignFormData.platforms).reduce((sum, platform) => {
      return sum + parseFloat(platform.cost || 0)
    }, 0)
    
    const totalBudget = parseFloat(campaignFormData.officialBudget || 0) + parseFloat(campaignFormData.otherBudget || 0);
    
    const newCampaign = {
      id: editingCampaign ? editingCampaign.id : `campaign${campaigns.length + 1}`,
      name: campaignFormData.name,
      productName: campaignFormData.productName,
      totalBudget: totalBudget,
      startDate: campaignFormData.startDate,
      endDate: campaignFormData.endDate,
      kolCount: parseInt(campaignFormData.kolCount),
      contentCount: 0,
      totalSpent: totalSpent,
      totalViews: totalViews,
      totalInteractions: 0,
      platforms: {
        xiaohongshu: {
          views: parseInt(campaignFormData.platforms.xiaohongshu.views || 0),
          cost: parseFloat(campaignFormData.platforms.xiaohongshu.cost || 0)
        },
        douyin: {
          views: parseInt(campaignFormData.platforms.douyin.views || 0),
          cost: parseFloat(campaignFormData.platforms.douyin.cost || 0)
        },
        bilibili: {
          views: parseInt(campaignFormData.platforms.bilibili.views || 0),
          cost: parseFloat(campaignFormData.platforms.bilibili.cost || 0)
        },
        other: {
          views: parseInt(campaignFormData.platforms.other.views || 0),
          cost: parseFloat(campaignFormData.platforms.other.cost || 0)
        }
      }
    }

    if (editingCampaign) {
      setCampaigns(prev => prev.map(c => c.id === editingCampaign.id ? newCampaign : c))
    } else {
      setCampaigns(prev => [...prev, newCampaign])
    }

    setShowCampaignForm(false)
    setEditingCampaign(null)
    setCampaignFormData({
    name: '',
    productName: [],
    officialBudget: '',
    otherBudget: '',
    startDate: '',
    endDate: '',
    kolCount: '',
    platforms: {
      xiaohongshu: { views: '', cost: '' },
      douyin: { views: '', cost: '' },
      bilibili: { views: '', cost: '' },
      other: { views: '', cost: '' }
    }
  })
  }

  const handleEditCampaign = (campaign) => {
    setEditingCampaign(campaign)
    setCampaignFormData({
      name: campaign.name,
      productName: Array.isArray(campaign.productName) ? campaign.productName : [campaign.productName],
      officialBudget: campaign.totalBudget.toString(),
      otherBudget: '0',
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      kolCount: campaign.kolCount.toString(),
      platforms: {
        xiaohongshu: {
          views: (campaign.platforms?.xiaohongshu?.views || 0).toString(),
          cost: (campaign.platforms?.xiaohongshu?.cost || 0).toString()
        },
        douyin: {
          views: (campaign.platforms?.douyin?.views || 0).toString(),
          cost: (campaign.platforms?.douyin?.cost || 0).toString()
        },
        bilibili: {
          views: (campaign.platforms?.bilibili?.views || 0).toString(),
          cost: (campaign.platforms?.bilibili?.cost || 0).toString()
        },
        other: {
          views: (campaign.platforms?.other?.views || 0).toString(),
          cost: (campaign.platforms?.other?.cost || 0).toString()
        }
      }
    })
    setShowCampaignForm(true)
  }

  const handleDeleteCampaign = (campaignId) => {
    setCampaigns(prev => prev.filter(c => c.id !== campaignId))
    if (selectedCampaign.id === campaignId) {
      setSelectedCampaign(campaigns[0])
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setSelectedFile(file)
    setFilePreview(URL.createObjectURL(file))
  }



  const handleKolSearchChange = (e) => {
    const value = e.target.value
    setKolSearchQuery(value)
    setShowKolDropdown(value.length > 0)
  }

  const handleKolSelect = (kol) => {
    setSelectedKolForDisplay(kol)
    setKolSearchQuery(kol.name)
    setShowKolDropdown(false)
  }

  const handleAddVideoFormChange = (e) => {
    const { name, value } = e.target
    setAddVideoFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddVideoSubmit = (e) => {
    e.preventDefault()
    if (!selectedKolForDisplay) return
    
    const newVideo = {
      videoId: `video${Date.now()}`,
      name: addVideoFormData.videoUrl.split('/').pop() || '新视频',
      videoUrl: addVideoFormData.videoUrl,
      platform: addVideoFormData.platform,
      platformIcon: addVideoFormData.platform === 'xiaohongshu' 
        ? 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=xiaohongshu%20logo%20icon&image_size=square'
        : addVideoFormData.platform === 'douyin'
        ? 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=douyin%20logo%20icon&image_size=square'
        : 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bilibili%20logo%20icon&image_size=square',
      publishDate: new Date().toISOString().split('T')[0],
      views: parseInt(addVideoFormData.views) || 0,
      interactions: parseInt(addVideoFormData.interactions) || 0,
      cost: parseFloat(addVideoFormData.cost) || 0
    }

    const newCampaign = {
      campaignId: `campaign${Date.now()}`,
      campaignName: addVideoFormData.campaignName,
      productName: addVideoFormData.productName,
      fy: addVideoFormData.fy,
      videos: [newVideo]
    }

    setKols(prev => prev.map(kol => {
      if (kol.id === selectedKolForDisplay.id) {
        return {
          ...kol,
          campaigns: [...kol.campaigns, newCampaign]
        }
      }
      return kol
    }))

    setSelectedKolForDisplay(prev => {
      if (!prev) return null
      return {
        ...prev,
        campaigns: [...prev.campaigns, newCampaign]
      }
    })

    setShowAddVideoForm(false)
    setAddVideoFormData({
      videoUrl: '',
      views: '',
      interactions: '',
      cost: '',
      platform: 'xiaohongshu',
      fy: '',
      productName: '',
      campaignName: ''
    })
  }

  const filteredKOLs = kols.filter(kol => 
    kol.name.toLowerCase().includes(kolSearchQuery.toLowerCase())
  )

  const availableFYs = ['FY25', 'FY26', 'FY27']
  const availableProducts = [...new Set(campaigns.map(c => c.productName))]
  const availableCampaigns = campaigns

  const getKolAvailableFYs = () => {
    if (!selectedKolForDisplay) return []
    return [...new Set(selectedKolForDisplay.campaigns.map(c => c.fy))]
  }

  const getKolAvailableProducts = () => {
    if (!selectedKolForDisplay) return []
    return [...new Set(selectedKolForDisplay.campaigns.map(c => c.productName))]
  }

  const getKolAvailablePlatforms = () => {
    if (!selectedKolForDisplay) return []
    const platforms = new Set()
    selectedKolForDisplay.campaigns.forEach(c => {
      c.videos.forEach(v => platforms.add(v.platform))
    })
    return [...platforms]
  }

  const getFilteredKolVideos = () => {
    if (!selectedKolForDisplay) return []
    let allVideos = []
    selectedKolForDisplay.campaigns.forEach(campaign => {
      campaign.videos.forEach(video => {
        allVideos.push({
          ...video,
          campaignName: campaign.campaignName,
          productName: campaign.productName,
          fy: campaign.fy
        })
      })
    })
    return allVideos.filter(video => {
      const fyMatch = !kolSelectedFY || video.fy === kolSelectedFY
      const productMatch = !kolSelectedProduct || video.productName === kolSelectedProduct
      const platformMatch = !kolSelectedPlatform || video.platform === kolSelectedPlatform
      return fyMatch && productMatch && platformMatch
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">KOL数据面板</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveTab('fy-overview')}
                className={`px-4 py-2 rounded-md ${activeTab === 'fy-overview' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                财年总览
              </button>
              <button
                onClick={() => setActiveTab('campaign')}
                className={`px-4 py-2 rounded-md ${activeTab === 'campaign' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Campaign分析
              </button>
              <button
                onClick={() => setActiveTab('kol')}
                className={`px-4 py-2 rounded-md ${activeTab === 'kol' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                KOL表现
              </button>
              <button
                onClick={() => setActiveTab('upload')}
                className={`px-4 py-2 rounded-md ${activeTab === 'upload' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                上传数据
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'fy-overview' && (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">财年总览</h1>
            
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">选择财年：</label>
                <select
                  value={selectedFY}
                  onChange={(e) => setSelectedFY(e.target.value)}
                  className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                >
                  <option value="FY23">FY23</option>
                  <option value="FY24">FY24</option>
                  <option value="FY25">FY25</option>
                  <option value="FY26">FY26</option>
                </select>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">总览</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500 mb-1">总KOL数量</p>
                  <p className="text-3xl font-bold text-gray-900">{fyOverviewData[selectedFY].totalKOLCount}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500 mb-1">总视频数量</p>
                  <p className="text-3xl font-bold text-gray-900">{fyOverviewData[selectedFY].totalVideoCount}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500 mb-1">总播放量</p>
                  <p className="text-3xl font-bold text-gray-900">{fyOverviewData[selectedFY].totalViews.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">置换KOL（不花钱）</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500 mb-1">置换KOL数量</p>
                  <p className="text-3xl font-bold text-gray-900">{fyOverviewData[selectedFY].barterKOLCount}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500 mb-1">置换视频数量</p>
                  <p className="text-3xl font-bold text-gray-900">{fyOverviewData[selectedFY].barterVideoCount}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500 mb-1">置换视频总播放量</p>
                  <p className="text-3xl font-bold text-gray-900">{fyOverviewData[selectedFY].barterViews.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">付费KOL</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500 mb-1">付费KOL数量</p>
                  <p className="text-3xl font-bold text-gray-900">{fyOverviewData[selectedFY].paidKOLCount}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500 mb-1">付费视频数量</p>
                  <p className="text-3xl font-bold text-gray-900">{fyOverviewData[selectedFY].paidVideoCount}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500 mb-1">总播放量</p>
                  <p className="text-3xl font-bold text-gray-900">{fyOverviewData[selectedFY].paidViews.toLocaleString()}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-yellow-50 p-6 rounded-lg text-center">
                  <p className="text-sm text-gray-500 mb-1">总花费</p>
                  <p className="text-3xl font-bold text-gray-900">¥{fyOverviewData[selectedFY].totalCost.toLocaleString()}</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg text-center">
                  <p className="text-sm text-gray-500 mb-1">综合CPV</p>
                  <p className="text-3xl font-bold text-gray-900">
                    ¥{(fyOverviewData[selectedFY].totalCost / fyOverviewData[selectedFY].paidViews).toFixed(4)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">分平台数据</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">小红书</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">播放量</p>
                      <p className="text-lg font-bold text-gray-900">{fyOverviewData[selectedFY].platforms.xiaohongshu.views.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">花费</p>
                      <p className="text-lg font-bold text-gray-900">¥{fyOverviewData[selectedFY].platforms.xiaohongshu.cost.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">CPV</p>
                      <p className="text-lg font-bold text-gray-900">
                        ¥{(fyOverviewData[selectedFY].platforms.xiaohongshu.cost / fyOverviewData[selectedFY].platforms.xiaohongshu.views).toFixed(4)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">抖音</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">播放量</p>
                      <p className="text-lg font-bold text-gray-900">{fyOverviewData[selectedFY].platforms.douyin.views.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">花费</p>
                      <p className="text-lg font-bold text-gray-900">¥{fyOverviewData[selectedFY].platforms.douyin.cost.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">CPV</p>
                      <p className="text-lg font-bold text-gray-900">
                        ¥{(fyOverviewData[selectedFY].platforms.douyin.cost / fyOverviewData[selectedFY].platforms.douyin.views).toFixed(4)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">B站</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">播放量</p>
                      <p className="text-lg font-bold text-gray-900">{fyOverviewData[selectedFY].platforms.bilibili.views.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">花费</p>
                      <p className="text-lg font-bold text-gray-900">¥{fyOverviewData[selectedFY].platforms.bilibili.cost.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">CPV</p>
                      <p className="text-lg font-bold text-gray-900">
                        ¥{(fyOverviewData[selectedFY].platforms.bilibili.cost / fyOverviewData[selectedFY].platforms.bilibili.views).toFixed(4)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">其他平台</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">播放量</p>
                      <p className="text-lg font-bold text-gray-900">{fyOverviewData[selectedFY].platforms.other.views.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">花费</p>
                      <p className="text-lg font-bold text-gray-900">¥{fyOverviewData[selectedFY].platforms.other.cost.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">CPV</p>
                      <p className="text-lg font-bold text-gray-900">
                        ¥{(fyOverviewData[selectedFY].platforms.other.cost / fyOverviewData[selectedFY].platforms.other.views).toFixed(4)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'campaign' && (
          <div>
            <div className="mb-6">
              <button
                onClick={() => setActiveTab('campaign-manage')}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Campaign管理
              </button>
            </div>
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">选择过滤条件</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">财政年度</label>
                  <select
                    value={fyDisplayText}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFyDisplayText(value);
                      if (value === 'Select all') {
                        setSelectedFYs(['FY25', 'FY26', 'FY27']);
                      } else if (value === '请选择') {
                        setSelectedFYs([]);
                      } else {
                        setSelectedFYs([value]);
                      }
                      setSelectedCampaignFiltered(null);
                    }}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  >
                    <option value="请选择">请选择</option>
                    <option value="Select all">Select all</option>
                    {['FY25', 'FY26', 'FY27'].map(fy => (
                      <option key={fy} value={fy}>
                        {fy}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">产品</label>
                  <select
                    value={productDisplayText}
                    onChange={(e) => {
                      const value = e.target.value;
                      setProductDisplayText(value);
                      if (value === 'Select all') {
                        const allProducts = [...new Set(campaigns.filter(c => selectedFYs.length > 0 ? selectedFYs.includes(c.fy) : true).map(c => c.productName))];
                        setSelectedProducts(allProducts);
                      } else if (value === '请选择') {
                        setSelectedProducts([]);
                      } else {
                        setSelectedProducts([value]);
                      }
                      setSelectedCampaignFiltered(null);
                    }}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  >
                    <option value="请选择">请选择</option>
                    <option value="Select all">Select all</option>
                    {[...new Set(campaigns.filter(c => selectedFYs.length > 0 ? selectedFYs.includes(c.fy) : true).map(c => c.productName))].map(product => (
                      <option key={product} value={product}>
                        {product}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Campaign</label>
                  <select
                    value={selectedCampaignFiltered || ''}
                    onChange={(e) => {
                      const campaignId = e.target.value;
                      if (campaignId) {
                        setSelectedCampaignFiltered(campaignId);
                        const campaign = campaigns.find(c => c.id === campaignId);
                        if (campaign) {
                          setSelectedCampaign(campaign);
                        }
                      } else {
                        setSelectedCampaignFiltered(null);
                      }
                    }}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  >
                    <option value="">请选择Campaign</option>
                    {(() => {
                      const filteredCampaigns = campaigns.filter(c => {
                        const fyMatch = selectedFYs.length === 0 || selectedFYs.includes(c.fy);
                        const productMatch = selectedProducts.length === 0 || selectedProducts.includes(c.productName);
                        return fyMatch && productMatch;
                      });
                      return filteredCampaigns.map(campaign => (
                        <option key={campaign.id} value={campaign.id}>
                          {campaign.name} - {campaign.productName}
                        </option>
                      ));
                    })()}
                  </select>
                </div>
              </div>
            </div>

            {selectedCampaignFiltered ? (
              <>
                <div className="mb-4">
                  <button
                    onClick={() => setSelectedCampaignFiltered(null)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>返回Campaign列表</span>
                  </button>
                </div>

                <div className="bg-white shadow rounded-lg p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900">{selectedCampaign.name} - {selectedCampaign.productName}</h2>
                </div>

                <div className="bg-white shadow rounded-lg p-6 mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">总览</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-500 mb-1">总KOL数量</p>
                      <p className="text-3xl font-bold text-gray-900">{selectedCampaign.kolCount}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-500 mb-1">总视频数量</p>
                      <p className="text-3xl font-bold text-gray-900">{selectedCampaign.contentCount}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-500 mb-1">总播放量</p>
                      <p className="text-3xl font-bold text-gray-900">{selectedCampaign.totalViews.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white shadow rounded-lg p-6 mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">分平台数据</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">小红书</p>
                      <p className="text-xl font-bold text-gray-900">播放量: {selectedCampaign.platforms.xiaohongshu.views.toLocaleString()}</p>
                      <p className="text-lg text-gray-900">花费: ¥{selectedCampaign.platforms.xiaohongshu.cost.toLocaleString()}</p>
                      <p className="text-lg text-gray-900">CPV: ¥{(selectedCampaign.platforms.xiaohongshu.cost / selectedCampaign.platforms.xiaohongshu.views || 1).toFixed(2)}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">抖音</p>
                      <p className="text-xl font-bold text-gray-900">播放量: {selectedCampaign.platforms.douyin.views.toLocaleString()}</p>
                      <p className="text-lg text-gray-900">花费: ¥{selectedCampaign.platforms.douyin.cost.toLocaleString()}</p>
                      <p className="text-lg text-gray-900">CPV: ¥{(selectedCampaign.platforms.douyin.cost / selectedCampaign.platforms.douyin.views || 1).toFixed(2)}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">B站</p>
                      <p className="text-xl font-bold text-gray-900">播放量: {selectedCampaign.platforms.bilibili.views.toLocaleString()}</p>
                      <p className="text-lg text-gray-900">花费: ¥{selectedCampaign.platforms.bilibili.cost.toLocaleString()}</p>
                      <p className="text-lg text-gray-900">CPV: ¥{(selectedCampaign.platforms.bilibili.cost / selectedCampaign.platforms.bilibili.views || 1).toFixed(2)}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">其他平台</p>
                      <p className="text-xl font-bold text-gray-900">播放量: {selectedCampaign.platforms.other.views.toLocaleString()}</p>
                      <p className="text-lg text-gray-900">花费: ¥{selectedCampaign.platforms.other.cost.toLocaleString()}</p>
                      <p className="text-lg text-gray-900">CPV: ¥{(selectedCampaign.platforms.other.cost / selectedCampaign.platforms.other.views || 1).toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">视频表现分析（播放量 vs 互动量）</h2>
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700">平台：</label>
                      <select
                        value={selectedScatterPlatform}
                        onChange={(e) => setSelectedScatterPlatform(e.target.value)}
                        className="pl-3 pr-8 py-1 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                      >
                        <option value="xiaohongshu">小红书</option>
                        <option value="douyin">抖音</option>
                        <option value="bilibili">B站</option>
                      </select>
                    </div>
                  </div>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart
                        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          type="number" 
                          dataKey="views" 
                          name="播放量" 
                          tickFormatter={(value) => `${(value/1000).toFixed(0)}k`}
                          label={{ value: '播放量', position: 'bottom', offset: 40 }}
                        />
                        <YAxis 
                          type="number" 
                          dataKey="interactions" 
                          name="互动量"
                          tickFormatter={(value) => `${(value/1000).toFixed(1)}k`}
                          label={{ value: '互动量', angle: -90, position: 'insideLeft' }}
                        />
                        <ZAxis type="number" range={[50, 400]} dataKey="cost" name="花费" />
                        <Tooltip 
                          cursor={{ strokeDasharray: '3 3' }}
                          formatter={(value, name) => {
                            if (name === '播放量') return value.toLocaleString();
                            if (name === '互动量') return value.toLocaleString();
                            if (name === '花费') return `¥${value.toLocaleString()}`;
                            return value;
                          }}
                        />
                        <Legend />
                        {selectedScatterPlatform === 'xiaohongshu' && (
                          <Scatter 
                            name="小红书" 
                            data={kols.flatMap(kol => 
                              kol.campaigns
                                .filter(c => c.campaignId === selectedCampaign.id)
                                .flatMap(c => c.videos.filter(v => v.platform === 'xiaohongshu'))
                                .map(v => ({
                                  views: v.views,
                                  interactions: v.interactions,
                                  cost: v.cost,
                                  name: v.name
                                }))
                            )}
                            fill="#ff6b6b"
                          />
                        )}
                        {selectedScatterPlatform === 'douyin' && (
                          <Scatter 
                            name="抖音" 
                            data={kols.flatMap(kol => 
                              kol.campaigns
                                .filter(c => c.campaignId === selectedCampaign.id)
                                .flatMap(c => c.videos.filter(v => v.platform === 'douyin'))
                                .map(v => ({
                                  views: v.views,
                                  interactions: v.interactions,
                                  cost: v.cost,
                                  name: v.name
                                }))
                            )}
                            fill="#4ecdc4"
                          />
                        )}
                        {selectedScatterPlatform === 'bilibili' && (
                          <Scatter 
                            name="B站" 
                            data={kols.flatMap(kol => 
                              kol.campaigns
                                .filter(c => c.campaignId === selectedCampaign.id)
                                .flatMap(c => c.videos.filter(v => v.platform === 'bilibili'))
                                .map(v => ({
                                  views: v.views,
                                  interactions: v.interactions,
                                  cost: v.cost,
                                  name: v.name
                                }))
                            )}
                            fill="#45b7d1"
                          />
                        )}
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 text-sm text-gray-500">
                    <p>💡 提示：点的大小代表视频花费，越大表示花费越高</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Campaign列表</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign名称</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">产品</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">财年</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {campaigns
                        .filter(c => {
                          const fyMatch = selectedFYs.length === 0 || selectedFYs.includes(c.fy);
                          const productMatch = selectedProducts.length === 0 || selectedProducts.includes(c.productName);
                          return fyMatch && productMatch;
                        })
                        .map(campaign => (
                          <tr key={campaign.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{campaign.productName}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{campaign.fy}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => {
                                  setSelectedCampaignFiltered(campaign.id);
                                  setSelectedCampaign(campaign);
                                }}
                                className="text-blue-600 hover:text-blue-900 mr-3"
                              >
                                查看
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'kol' && (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">KOL表现</h1>
            
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">搜索KOL</h2>
              <div className="relative">
                <input
                  type="text"
                  value={kolSearchQuery}
                  onChange={handleKolSearchChange}
                  placeholder="输入KOL名字进行搜索..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {showKolDropdown && filteredKOLs.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredKOLs.map(kol => (
                      <div
                        key={kol.id}
                        onClick={() => handleKolSelect(kol)}
                        className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center space-x-3"
                      >
                        <img
                          src={kol.avatar}
                          alt={kol.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{kol.name}</p>
                          <p className="text-sm text-gray-500">粉丝数: {kol.followerCount.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {selectedKolForDisplay && (
              <>
                <div className="bg-white shadow rounded-lg p-6 mb-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-6">
                      <img
                        src={selectedKolForDisplay.avatar}
                        alt={selectedKolForDisplay.name}
                        className="w-24 h-24 rounded-full"
                      />
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{selectedKolForDisplay.bilibiliUsername}</h2>
                        <p className="text-gray-600">粉丝数: {selectedKolForDisplay.followerCount.toLocaleString()}</p>
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center space-x-4">
                            <span className="text-sm font-medium text-gray-700">B站:</span>
                            <span className="text-sm text-gray-900">{selectedKolForDisplay.bilibiliUsername} (ID: {selectedKolForDisplay.bilibiliId})</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className="text-sm font-medium text-gray-700">小红书:</span>
                            <span className="text-sm text-gray-900">{selectedKolForDisplay.xiaohongshuUsername} (ID: {selectedKolForDisplay.xiaohongshuId})</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className="text-sm font-medium text-gray-700">抖音:</span>
                            <span className="text-sm text-gray-900">{selectedKolForDisplay.douyinUsername} (ID: {selectedKolForDisplay.douyinId})</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowAddVideoForm(true)}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span>添加视频</span>
                    </button>
                  </div>

                  <div className="border-t pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-gray-900">KOL数据概览</h2>
                      <button
                        onClick={() => {
                          setKolSelectedFY('')
                          setKolSelectedProduct('')
                          setKolSelectedPlatform('')
                        }}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                      >
                        重置筛选
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">财年</label>
                        <select
                          value={kolSelectedFY}
                          onChange={(e) => setKolSelectedFY(e.target.value)}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                        >
                          <option value="">全部</option>
                          {getKolAvailableFYs().map(fy => (
                            <option key={fy} value={fy}>{fy}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">产品</label>
                        <select
                          value={kolSelectedProduct}
                          onChange={(e) => setKolSelectedProduct(e.target.value)}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                        >
                          <option value="">全部</option>
                          {getKolAvailableProducts().map(product => (
                            <option key={product} value={product}>{product}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">平台</label>
                        <select
                          value={kolSelectedPlatform}
                          onChange={(e) => setKolSelectedPlatform(e.target.value)}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                        >
                          <option value="">全部</option>
                          {getKolAvailablePlatforms().map(platform => (
                            <option key={platform} value={platform}>
                              {platform === 'xiaohongshu' ? '小红书' : 
                               platform === 'douyin' ? '抖音' : 'B站'}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-sm text-gray-500 mb-1">总视频数</p>
                        <p className="text-3xl font-bold text-gray-900">
                          {getFilteredKolVideos().length}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-sm text-gray-500 mb-1">总播放量</p>
                        <p className="text-3xl font-bold text-gray-900">
                          {getFilteredKolVideos().reduce((sum, v) => sum + v.views, 0).toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-sm text-gray-500 mb-1">总互动量</p>
                        <p className="text-3xl font-bold text-gray-900">
                          {getFilteredKolVideos().reduce((sum, v) => sum + v.interactions, 0).toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-sm text-gray-500 mb-1">综合互动率</p>
                        <p className="text-3xl font-bold text-gray-900">
                          {(() => {
                            const filteredVideos = getFilteredKolVideos();
                            const totalViews = filteredVideos.reduce((sum, v) => sum + v.views, 0);
                            const totalInteractions = filteredVideos.reduce((sum, v) => sum + v.interactions, 0);
                            return totalViews > 0 ? `${((totalInteractions / totalViews) * 100).toFixed(2)}%` : '0%';
                          })()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">项目表现</h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">产品</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">视频标题</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">平台</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">发布时间</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">播放量</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">互动量</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">花费</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {getFilteredKolVideos().map(video => (
                          <tr key={video.videoId}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{video.campaignName}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{video.productName}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-900">
                                {video.name}
                              </a>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <img src={video.platformIcon} alt={video.platform} className="w-5 h-5 mr-2" />
                                <span className="text-sm text-gray-900">
                                  {video.platform === 'xiaohongshu' ? '小红书' : 
                                   video.platform === 'douyin' ? '抖音' : 'B站'}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{video.publishDate}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{video.views.toLocaleString()}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{video.interactions.toLocaleString()}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">¥{video.cost.toLocaleString()}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'upload' && (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">上传达人视频数据</h1>
            
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">选择筛选条件</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">财年</label>
                  <select
                    value={uploadFY}
                    onChange={(e) => setUploadFY(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  >
                    <option value="">请选择财年</option>
                    {availableFYs.map(fy => (
                      <option key={fy} value={fy}>{fy}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">产品</label>
                  <select
                    value={uploadProduct}
                    onChange={(e) => setUploadProduct(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  >
                    <option value="">请选择产品</option>
                    {availableProducts.map(product => (
                      <option key={product} value={product}>{product}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">项目</label>
                  <select
                    value={uploadCampaign}
                    onChange={(e) => setUploadCampaign(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  >
                    <option value="">请选择项目</option>
                    {availableCampaigns
                      .filter(c => 
                        (!uploadFY || c.fy === uploadFY) && 
                        (!uploadProduct || c.productName === uploadProduct)
                      )
                      .map(campaign => (
                        <option key={campaign.id} value={campaign.name}>{campaign.name}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">上传Excel文件</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="flex flex-col items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-sm text-gray-600 mb-4">拖拽文件到此处或点击上传</p>
                  <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={(e) => setUploadFile(e.target.files[0])}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
                  >
                    选择文件
                  </label>
                  {uploadFile && (
                    <div className="mt-4 text-sm text-gray-600">
                      已选择文件: {uploadFile.name}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleFileUpload}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  disabled={processing}
                >
                  {processing ? '处理中...' : '上传并处理数据'}
                </button>
              </div>
              {uploadStatus && (
                <div className="mt-4 p-4 bg-gray-100 rounded-md">
                  <p className="text-sm text-gray-700">{uploadStatus}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {showAddVideoForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">添加视频</h2>
              <form onSubmit={handleAddVideoSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">财年</label>
                    <select
                      name="fy"
                      value={addVideoFormData.fy}
                      onChange={handleAddVideoFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">请选择财年</option>
                      {availableFYs.map(fy => (
                        <option key={fy} value={fy}>{fy}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">产品名</label>
                    <select
                      name="productName"
                      value={addVideoFormData.productName}
                      onChange={handleAddVideoFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">请选择产品</option>
                      {availableProducts.map(product => (
                        <option key={product} value={product}>{product}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">项目名</label>
                    <select
                      name="campaignName"
                      value={addVideoFormData.campaignName}
                      onChange={handleAddVideoFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">请选择项目</option>
                      {availableCampaigns
                        .filter(c => 
                          (!addVideoFormData.fy || c.fy === addVideoFormData.fy) && 
                          (!addVideoFormData.productName || c.productName === addVideoFormData.productName)
                        )
                        .map(campaign => (
                          <option key={campaign.id} value={campaign.name}>{campaign.name}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">视频链接</label>
                    <input
                      type="url"
                      name="videoUrl"
                      value={addVideoFormData.videoUrl}
                      onChange={handleAddVideoFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/video"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">平台</label>
                    <select
                      name="platform"
                      value={addVideoFormData.platform}
                      onChange={handleAddVideoFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="xiaohongshu">小红书</option>
                      <option value="douyin">抖音</option>
                      <option value="bilibili">B站</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">播放量</label>
                    <input
                      type="number"
                      name="views"
                      value={addVideoFormData.views}
                      onChange={handleAddVideoFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">互动量</label>
                    <input
                      type="number"
                      name="interactions"
                      value={addVideoFormData.interactions}
                      onChange={handleAddVideoFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">花费</label>
                    <input
                      type="number"
                      name="cost"
                      value={addVideoFormData.cost}
                      onChange={handleAddVideoFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                      step="0.01"
                      required
                    />
                  </div>
                </div>
                <div className="flex space-x-3 mt-6">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    添加
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddVideoForm(false);
                      setAddVideoFormData({
                        videoUrl: '',
                        views: '',
                        interactions: '',
                        cost: '',
                        platform: 'xiaohongshu',
                        fy: '',
                        productName: '',
                        campaignName: ''
                      });
                    }}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                  >
                    取消
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App

