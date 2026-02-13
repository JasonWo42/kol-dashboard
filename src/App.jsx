import React, { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts'

// 财年总览模拟数据
const fyOverviewData = {
  FY23: {
    totalKOLCount: 45,
    totalVideoCount: 128,
    totalViews: 8500000,
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
    totalCost: 890000,
    platforms: {
      xiaohongshu: { views: 8500000, cost: 310000 },
      douyin: { views: 10200000, cost: 430000 },
      bilibili: { views: 3000000, cost: 120000 },
      other: { views: 800000, cost: 30000 }
    }
  }
}

// 模拟数据
const mockCampaigns = [
  // FY25 Campaign
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
    platforms: {
      xiaohongshu: { views: 250000, cost: 15000 },
      douyin: { views: 400000, cost: 35000 },
      bilibili: { views: 100000, cost: 10000 },
      other: { views: 0, cost: 0 }
    }
  },
  
  // FY26 Campaigns
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
    platforms: {
      xiaohongshu: { views: 450000, cost: 30000 },
      douyin: { views: 650000, cost: 40000 },
      bilibili: { views: 150000, cost: 15000 },
      other: { views: 0, cost: 0 }
    }
  },
  
  // FY27 Campaigns
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
    platforms: {
      xiaohongshu: { views: 500000, cost: 30000 },
      douyin: { views: 380000, cost: 30000 },
      bilibili: { views: 100000, cost: 12000 },
      other: { views: 0, cost: 0 }
    }
  },
  
  // 额外的Campaign，分配到FY26
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
    platforms: {
      xiaohongshu: { views: 300000, cost: 20000 },
      douyin: { views: 500000, cost: 35000 },
      bilibili: { views: 90000, cost: 10000 },
      other: { views: 0, cost: 0 }
    }
  },
  
  // 座位sample的campaign项目
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
    platforms: {
      xiaohongshu: { views: 350000, cost: 20000 },
      douyin: { views: 250000, cost: 25000 },
      bilibili: { views: 50000, cost: 5000 },
      other: { views: 0, cost: 0 }
    }
  }
] // 五个campaign分别分配到三个FY中：FY25(1), FY26(3), FY27(1)

const mockKOLs = [
  {
    id: 'kol1',
    name: '美食达人小王',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20food%20blogger%20avatar%20portrait&image_size=square',
    followerCount: 1250000,
    campaigns: [
      {
        campaignId: 'campaign1',
        campaignName: '夏季新品推广',
        productName: '清凉系列饮料',
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
    name: '科技评测师小李',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tech%20reviewer%20professional%20avatar%20portrait&image_size=square',
    followerCount: 890000,
    campaigns: [
      {
        campaignId: 'campaign2',
        campaignName: '节日促销活动',
        productName: '智能手表',
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
    name: '时尚博主小张',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fashion%20blogger%20stylish%20avatar%20portrait&image_size=square',
    followerCount: 1560000,
    campaigns: [
      {
        campaignId: 'campaign3',
        campaignName: '品牌形象打造',
        productName: '高端护肤系列',
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
  const [selectedCampaignFilter, setSelectedCampaignFilter] = useState('all')
  const [selectedCampaignsForComparison, setSelectedCampaignsForComparison] = useState([])
  
  // Campaign分析页面的过滤状态
  const [selectedFYs, setSelectedFYs] = useState([]) // 默认不选择任何财年
  const [selectedProducts, setSelectedProducts] = useState([]) // 默认不选择任何产品
  const [selectedCampaignFiltered, setSelectedCampaignFiltered] = useState(null) // 默认未选择任何campaign
  // 下拉菜单显示状态
  const [showFYDropdown, setShowFYDropdown] = useState(false)
  const [showProductDropdown, setShowProductDropdown] = useState(false)
  // 显示文本状态
  const [fyDisplayText, setFyDisplayText] = useState('请选择') // 默认显示"请选择"
  const [productDisplayText, setProductDisplayText] = useState('请选择')
  
  // 财年总览状态
  const [selectedFY, setSelectedFY] = useState('FY26')
  
  // 散点图平台选择状态
  const [selectedScatterPlatform, setSelectedScatterPlatform] = useState('xiaohongshu')
  
  // Campaign管理状态
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
    // 平台数据
    platforms: {
      xiaohongshu: {
        views: '',
        cost: ''
      },
      douyin: {
        views: '',
        cost: ''
      },
      bilibili: {
        views: '',
        cost: ''
      },
      other: {
        views: '',
        cost: ''
      }
    }
  })
  
  // 产品选项
  const productOptions = ['碧海黑帆', '刺客信条：影']
  
  // KOL管理状态
  const [kols, setKols] = useState(mockKOLs)
  const [showKOLForm, setShowKOLForm] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [filePreview, setFilePreview] = useState(null)

  // Campaign管理函数
  const handleCampaignFormChange = (e) => {
    const { name, value } = e.target
    
    // 处理平台数据字段，格式为 platform_view 或 platform_cost
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
      // 处理普通字段
      setCampaignFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }
  
  // 处理产品多选
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
  
  // 处理全选产品
  const handleSelectAllProducts = () => {
    if (campaignFormData.productName.length === productOptions.length) {
      // 如果已全选，则取消全选
      setCampaignFormData(prev => ({
        ...prev,
        productName: []
      }))
    } else {
      // 否则全选
      setCampaignFormData(prev => ({
        ...prev,
        productName: [...productOptions]
      }))
    }
  }

  const handleCampaignSubmit = (e) => {
    e.preventDefault()
    
    // 计算总播放量和总花费
    const totalViews = Object.values(campaignFormData.platforms).reduce((sum, platform) => {
      return sum + parseInt(platform.views || 0)
    }, 0)
    
    const totalSpent = Object.values(campaignFormData.platforms).reduce((sum, platform) => {
      return sum + parseFloat(platform.cost || 0)
    }, 0)
    
    // è®¡ç®—æ€»é¢„ç®—
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
      totalInteractions: 0, // 暂时设为0，实际应用中可能需要从其他地方获取
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
      xiaohongshu: {
        views: '',
        cost: ''
      },
      douyin: {
        views: '',
        cost: ''
      },
      bilibili: {
        views: '',
        cost: ''
      },
      other: {
        views: '',
        cost: ''
      }
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

  // KOL管理函数
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setSelectedFile(file)
    setFilePreview(URL.createObjectURL(file))
  }

  const handleFileUpload = () => {
    // 这里应该实现Excel文件解析逻辑
    // 暂时模拟上传成功
    alert('文件上传成功！')
    setSelectedFile(null)
    setFilePreview(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">KOL数据面板</h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* Dashboard 暂时隐藏 */}
              {/* <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-2 rounded-md ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Dashboard
              </button> */}
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
                onClick={() => setActiveTab('campaign-manage')}
                className={`px-4 py-2 rounded-md ${activeTab === 'campaign-manage' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Campaign管理
              </button>
              <button
                onClick={() => setActiveTab('kol')}
                className={`px-4 py-2 rounded-md ${activeTab === 'kol' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                KOL表现
              </button>
              <button
                onClick={() => setActiveTab('kol-manage')}
                className={`px-4 py-2 rounded-md ${activeTab === 'kol-manage' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                KOL管理
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 主内容区 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 财年总览 */}
        {activeTab === 'fy-overview' && (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">财年总览</h1>
            
            {/* FY选择器 */}
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

            {/* 总览卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-white shadow rounded-lg p-6">
                <p className="text-sm text-gray-500">总KOL数量</p>
                <p className="text-2xl font-bold text-gray-900">{fyOverviewData[selectedFY].totalKOLCount}</p>
              </div>
              <div className="bg-white shadow rounded-lg p-6">
                <p className="text-sm text-gray-500">总视频数量</p>
                <p className="text-2xl font-bold text-gray-900">{fyOverviewData[selectedFY].totalVideoCount}</p>
              </div>
              <div className="bg-white shadow rounded-lg p-6">
                <p className="text-sm text-gray-500">总播放数量</p>
                <p className="text-2xl font-bold text-gray-900">{fyOverviewData[selectedFY].totalViews.toLocaleString()}</p>
              </div>
              <div className="bg-white shadow rounded-lg p-6">
                <p className="text-sm text-gray-500">综合CPV</p>
                <p className="text-2xl font-bold text-gray-900">
                  ¥{(fyOverviewData[selectedFY].totalCost / fyOverviewData[selectedFY].totalViews).toFixed(4)}
                </p>
              </div>
            </div>

            {/* 总KOL花费 */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">总KOL花费</h2>
              <div className="bg-yellow-50 p-6 rounded-lg">
                <p className="text-sm text-gray-500">总花费</p>
                <p className="text-3xl font-bold text-gray-900">¥{fyOverviewData[selectedFY].totalCost.toLocaleString()}</p>
              </div>
            </div>

            {/* 分平台数据 */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">分平台数据</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* 小红书 */}
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2">小红书</p>
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

                {/* 抖音 */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2">抖音</p>
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

                {/* B站 */}
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2">B站</p>
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

                {/* 其他平台 */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2">其他平台</p>
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

        {/* Dashboard 暂时隐藏 */}
        {/* {activeTab === 'dashboard' && (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-white shadow rounded-lg p-6">
                <p className="text-sm text-gray-500">总Campaign数</p>
                <p className="text-2xl font-bold text-gray-900">{campaigns.length}</p>
              </div>
              <div className="bg-white shadow rounded-lg p-6">
                <p className="text-sm text-gray-500">总KOL数</p>
                <p className="text-2xl font-bold text-gray-900">{kols.length}</p>
              </div>
              <div className="bg-white shadow rounded-lg p-6">
                <p className="text-sm text-gray-500">总视频数</p>
                <p className="text-2xl font-bold text-gray-900">
                  {kols.reduce((total, kol) => {
                    return total + kol.campaigns.reduce((campaignTotal, campaign) => {
                      return campaignTotal + campaign.videos.length
                    }, 0)
                  }, 0)}
                </p>
              </div>
              <div className="bg-white shadow rounded-lg p-6">
                <p className="text-sm text-gray-500">总播放量</p>
                <p className="text-2xl font-bold text-gray-900">
                  {campaigns.reduce((total, campaign) => total + campaign.totalViews, 0).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Campaign表现概览</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={campaigns}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalViews" name="播放量" fill="#8884d8" />
                    <Bar dataKey="totalInteractions" name="互动量" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )} */}

        {/* Campaign分析 */}
        {activeTab === 'campaign' && (
          <div>
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">选择过滤条件</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 财政年度下拉选择 */}
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
                      setSelectedCampaignFiltered(null); // 重置campaign选择
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
                
                {/* 产品下拉选择 */}
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
                      setSelectedCampaignFiltered(null); // 重置campaign选择
                    }}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  >
                    <option value="请选择">请选择</option>
                    <option value="Select all">Select all</option>
                    {/* 基于所选财政年度动态生成产品选项 */}
                    {[...new Set(campaigns.filter(c => selectedFYs.length > 0 ? selectedFYs.includes(c.fy) : true).map(c => c.productName))].map(product => (
                      <option key={product} value={product}>
                        {product}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Campaign选择器 */}
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
                    {/* 基于所选财政年度和产品动态生成campaign选项 */}
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
                <div className="bg-white shadow rounded-lg p-6 mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">{selectedCampaign.name} - {selectedCampaign.productName}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">KOL数量</p>
                      <p className="text-2xl font-bold text-gray-900">{selectedCampaign.kolCount}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">内容数量</p>
                      <p className="text-2xl font-bold text-gray-900">{selectedCampaign.contentCount}</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">总预算</p>
                      <p className="text-2xl font-bold text-gray-900">¥{selectedCampaign.totalBudget.toLocaleString()}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">总播放量</p>
                      <p className="text-2xl font-bold text-gray-900">{selectedCampaign.totalViews.toLocaleString()}</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">总互动量</p>
                      <p className="text-2xl font-bold text-gray-900">{selectedCampaign.totalInteractions.toLocaleString()}</p>
                    </div>
                    <div className="bg-indigo-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">总CPV</p>
                      <p className="text-2xl font-bold text-gray-900">
                        ¥{(selectedCampaign.totalBudget / selectedCampaign.totalViews).toFixed(2)}
                      </p>
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

                {/* 视频表现散点图 */}
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
              <div className="bg-white shadow rounded-lg p-6 mb-6">
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="text-gray-500 text-lg">请选择一个Campaign以查看详细信息</p>
                  <p className="text-gray-400 mt-2">您需要先在上方选择框中选择一个Campaign</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Campaign管理 */}
        {activeTab === 'campaign-manage' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Campaign管理</h2>
              <button
                onClick={() => {
                  // 先设置编辑状态和表单数据
                  setEditingCampaign(null)
                  setCampaignFormData({
                    name: '',
                    productName: '',
                    officialBudget: '',
                    otherBudget: '',
                    startDate: '',
                    endDate: '',
                    kolCount: '',
                    platforms: {
                      xiaohongshu: {
                        views: '0',
                        cost: '0'
                      },
                      douyin: {
                        views: '0',
                        cost: '0'
                      },
                      bilibili: {
                        views: '0',
                        cost: '0'
                      },
                      other: {
                        views: '0',
                        cost: '0'
                      }
                    }
                  })
                  // 确保状态更新完成后再显示表单
                  setTimeout(() => {
                    setShowCampaignForm(true)
                  }, 100)
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                添加Campaign
              </button>
            </div>

            {showCampaignForm && (
              <div className="bg-white shadow rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{editingCampaign ? '编辑Campaign' : '添加Campaign'}</h3>
                <form onSubmit={handleCampaignSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">产品名称</label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setShowProductDropdown(!showProductDropdown)}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md bg-white text-left"
                        >
                          {campaignFormData.productName.length === 0 
                            ? '请选择产品' 
                            : campaignFormData.productName.join(', ')}
                          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </span>
                        </button>
                        
                        {showProductDropdown && (
                          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-300">
                            <div className="p-2">
                              <label className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={campaignFormData.productName.length === productOptions.length}
                                  onChange={handleSelectAllProducts}
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <span className="ml-2 text-sm font-medium text-gray-700">Select all</span>
                              </label>
                              <div className="border-t border-gray-200 my-1"></div>
                              {productOptions.map(product => (
                                <label key={product} className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={campaignFormData.productName.includes(product)}
                                    onChange={() => handleProductToggle(product)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                  />
                                  <span className="ml-2 text-sm text-gray-900">{product}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Campaign名称</label>
                      <input
                        type="text"
                        name="name"
                        value={campaignFormData.name}
                        onChange={handleCampaignFormChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">官方预算</label>
                      <input
                        type="number"
                        name="officialBudget"
                        value={campaignFormData.officialBudget}
                        onChange={handleCampaignFormChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">其他预算</label>
                      <input
                        type="number"
                        name="otherBudget"
                        value={campaignFormData.otherBudget}
                        onChange={handleCampaignFormChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">KOL数量</label>
                      <input
                        type="number"
                        name="kolCount"
                        value={campaignFormData.kolCount}
                        onChange={handleCampaignFormChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">开始日期</label>
                      <input
                        type="date"
                        name="startDate"
                        value={campaignFormData.startDate}
                        onChange={handleCampaignFormChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">结束日期</label>
                      <input
                        type="date"
                        name="endDate"
                        value={campaignFormData.endDate}
                        onChange={handleCampaignFormChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* 平台数据输入 */}
                  <div className="mb-6">
                    <h4 className="text-md font-semibold text-gray-900 mb-4">平台数据</h4>
                    
                    {/* 小红书 */}
                    <div className="bg-blue-50 p-4 rounded-lg mb-4">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">小红书</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">播放量</label>
                          <input
                            type="number"
                            name="xiaohongshu_views"
                            value={campaignFormData.platforms.xiaohongshu.views}
                            onChange={handleCampaignFormChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">预算</label>
                          <input
                            type="number"
                            name="xiaohongshu_cost"
                            value={campaignFormData.platforms.xiaohongshu.cost}
                            onChange={handleCampaignFormChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* 抖音 */}
                    <div className="bg-green-50 p-4 rounded-lg mb-4">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">抖音</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">播放量</label>
                          <input
                            type="number"
                            name="douyin_views"
                            value={campaignFormData.platforms.douyin.views}
                            onChange={handleCampaignFormChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">预算</label>
                          <input
                            type="number"
                            name="douyin_cost"
                            value={campaignFormData.platforms.douyin.cost}
                            onChange={handleCampaignFormChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* B站 */}
                    <div className="bg-purple-50 p-4 rounded-lg mb-4">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">B站</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">播放量</label>
                          <input
                            type="number"
                            name="bilibili_views"
                            value={campaignFormData.platforms.bilibili.views}
                            onChange={handleCampaignFormChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">预算</label>
                          <input
                            type="number"
                            name="bilibili_cost"
                            value={campaignFormData.platforms.bilibili.cost}
                            onChange={handleCampaignFormChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* 其他平台 */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">其他平台</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">播放量</label>
                          <input
                            type="number"
                            name="other_views"
                            value={campaignFormData.platforms.other.views}
                            onChange={handleCampaignFormChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">预算</label>
                          <input
                            type="number"
                            name="other_cost"
                            value={campaignFormData.platforms.other.cost}
                            onChange={handleCampaignFormChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      保存
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCampaignForm(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    >
                      取消
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign列表</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">产品名称</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign名称</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">总预算</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">KOL数量</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">时间范围</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {campaigns.map(campaign => (
                      <tr key={campaign.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {Array.isArray(campaign.productName) 
                            ? campaign.productName.join(', ') 
                            : campaign.productName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">¥{campaign.totalBudget.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.kolCount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.startDate} 至 {campaign.endDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleEditCampaign(campaign)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            编辑
                          </button>
                          <button
                            onClick={() => handleDeleteCampaign(campaign.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            删除
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* KOL表现 */}
        {activeTab === 'kol' && (
          <div>
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">选择过滤条件</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* 财政年度下拉选择 */}
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
                
                {/* 产品下拉选择 */}
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
                
                {/* Campaign选择器 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Campaign</label>
                  <select
                    value={selectedCampaignFilter}
                    onChange={(e) => setSelectedCampaignFilter(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  >
                    <option value="all">全部Campaign</option>
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
                
                {/* 选择KOL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">选择KOL</label>
                  <select
                    value={selectedKOL.id}
                    onChange={(e) => setSelectedKOL(kols.find(k => k.id === e.target.value))}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  >
                    {kols.map(kol => (
                      <option key={kol.id} value={kol.id}>
                        {kol.name} - {kol.followerCount.toLocaleString()} 粉丝
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* KOL基本信息 */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <div className="flex items-center space-x-4 mb-6">
                <img 
                  src={selectedKOL.avatar} 
                  alt={selectedKOL.name} 
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedKOL.name}</h2>
                  <p className="text-gray-600">粉丝数: {selectedKOL.followerCount.toLocaleString()}</p>
                  <p className="text-gray-600">ID: {selectedKOL.id}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">总视频数</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {selectedKOL.campaigns.reduce((total, campaign) => total + campaign.videos.length, 0)}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">总播放量</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {selectedKOL.campaigns.reduce((total, campaign) => {
                      return total + campaign.videos.reduce((videoTotal, video) => videoTotal + video.views, 0);
                    }, 0).toLocaleString()}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">总互动量</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {selectedKOL.campaigns.reduce((total, campaign) => {
                      return total + campaign.videos.reduce((videoTotal, video) => videoTotal + video.interactions, 0);
                    }, 0).toLocaleString()}
                  </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">综合互动率</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {(() => {
                      const totalViews = selectedKOL.campaigns.reduce((total, campaign) => {
                        return total + campaign.videos.reduce((videoTotal, video) => videoTotal + video.views, 0);
                      }, 0);
                      const totalInteractions = selectedKOL.campaigns.reduce((total, campaign) => {
                        return total + campaign.videos.reduce((videoTotal, video) => videoTotal + video.interactions, 0);
                      }, 0);
                      return totalViews > 0 ? ((totalInteractions / totalViews) * 100).toFixed(2) : '0.00';
                    })()}%
                  </p>
                </div>
              </div>
            </div>

            {/* KOL项目表现 */}
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">互动率</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">花费</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedKOL.campaigns
                      .filter(campaign => selectedCampaignFilter === 'all' || campaign.campaignId === selectedCampaignFilter)
                      .flatMap(campaign => 
                        campaign.videos.map(video => (
                          <tr key={video.videoId}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.campaignName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.productName}</td>
                            <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{video.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                <img 
                                  src={video.platformIcon} 
                                  alt={video.platform} 
                                  className="w-6 h-6 mr-2"
                                />
                                <span className="text-sm text-gray-900">
                                  {video.platform === 'xiaohongshu' ? '小红书' : 
                                   video.platform === 'douyin' ? '抖音' : 'B站'}
                                </span>
                              </a>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{video.publishDate}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{video.views.toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{video.interactions.toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{(video.interactions / video.views * 100).toFixed(2)}%</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">¥{video.cost.toLocaleString()}</td>
                          </tr>
                        ))
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* KOL管理 */}
        {activeTab === 'kol-manage' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">KOL管理</h2>
              <button
                onClick={() => setShowKOLForm(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                添加KOL
              </button>
            </div>

            {showKOLForm && (
              <div className="bg-white shadow rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">添加KOL</h3>
                <form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">KOL名称</label>
                      <input
                        type="text"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">粉丝数</label>
                      <input
                        type="number"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">上传Excel文件</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                        />
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                          <span>上传文件</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="text-xs text-gray-500">
                          Excel文件 (.xlsx)
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={handleFileUpload}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      保存
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowKOLForm(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    >
                      取消
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">KOL列表</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">KOL名称</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">粉丝数</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {kols.map(kol => (
                      <tr key={kol.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full" src={kol.avatar} alt={kol.name} />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{kol.name}</div>
                              <div className="text-sm text-gray-500">ID: {kol.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{kol.followerCount.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">编辑</button>
                          <button className="text-red-600 hover:text-red-900">删除</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App