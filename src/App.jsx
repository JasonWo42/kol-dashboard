import React, { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// 模拟数据
const mockCampaigns = [
  {
    id: 'campaign1',
    name: '夏季新品推广',
    productName: '清凉系列饮料',
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
  {
    id: 'campaign2',
    name: '节日促销活动',
    productName: '智能手表',
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
  {
    id: 'campaign3',
    name: '品牌形象打造',
    productName: '高端护肤系列',
    startDate: '2026-03-01',
    endDate: '2026-03-31',
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
  }
]

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
  
  // Campaign管理状态
  const [campaigns, setCampaigns] = useState(mockCampaigns)
  const [showCampaignForm, setShowCampaignForm] = useState(false)
  const [editingCampaign, setEditingCampaign] = useState(null)
  const [campaignFormData, setCampaignFormData] = useState({
    name: '',
    productName: '',
    totalBudget: '',
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

  const handleCampaignSubmit = (e) => {
    e.preventDefault()
    
    // 计算总播放量和总花费
    const totalViews = Object.values(campaignFormData.platforms).reduce((sum, platform) => {
      return sum + parseInt(platform.views || 0)
    }, 0)
    
    const totalSpent = Object.values(campaignFormData.platforms).reduce((sum, platform) => {
      return sum + parseFloat(platform.cost || 0)
    }, 0)
    
    const newCampaign = {
      id: editingCampaign ? editingCampaign.id : `campaign${campaigns.length + 1}`,
      name: campaignFormData.name,
      productName: campaignFormData.productName,
      totalBudget: parseFloat(campaignFormData.totalBudget),
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
      productName: '',
      totalBudget: '',
      startDate: '',
      endDate: '',
      kolCount: ''
    })
  }

  const handleEditCampaign = (campaign) => {
    setEditingCampaign(campaign)
    setCampaignFormData({
      name: campaign.name,
      productName: campaign.productName,
      totalBudget: campaign.totalBudget.toString(),
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
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-2 rounded-md ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Dashboard
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
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
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
        )}

        {/* Campaign分析 */}
        {activeTab === 'campaign' && (
          <div>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-700">选择Campaign</label>
              </div>
              <select
                value={selectedCampaign.id}
                onChange={(e) => setSelectedCampaign(campaigns.find(c => c.id === e.target.value))}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
              >
                {campaigns.map(campaign => (
                  <option key={campaign.id} value={campaign.id}>
                    {campaign.name} - {campaign.productName}
                  </option>
                ))}
              </select>
            </div>

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

            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">选择对比Campaign</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {campaigns.map(campaign => (
                  <div key={campaign.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`campaign-${campaign.id}`}
                      checked={selectedCampaignsForComparison.includes(campaign.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCampaignsForComparison([...selectedCampaignsForComparison, campaign.id])
                        } else {
                          setSelectedCampaignsForComparison(selectedCampaignsForComparison.filter(id => id !== campaign.id))
                        }
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`campaign-${campaign.id}`} className="ml-2 block text-sm text-gray-900">
                      {campaign.name} - {campaign.productName}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Campaign表现对比</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={selectedCampaignsForComparison.length > 0 ? campaigns.filter(campaign => selectedCampaignsForComparison.includes(campaign.id)) : []}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="platforms.xiaohongshu.views" name="小红书播放量" stackId="a" fill="#ff6b6b" />
                    <Bar dataKey="platforms.douyin.views" name="抖音播放量" stackId="a" fill="#4ecdc4" />
                    <Bar dataKey="platforms.bilibili.views" name="B站播放量" stackId="a" fill="#45b7d1" />
                    <Bar dataKey="platforms.other.views" name="其他平台播放量" stackId="a" fill="#999999" />
                    <Bar dataKey="totalInteractions" name="互动量" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Campaign管理 */}
        {activeTab === 'campaign-manage' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Campaign管理</h2>
              <button
                onClick={() => {
                  setEditingCampaign(null)
                  setCampaignFormData({
                    name: '',
                    productName: '',
                    totalBudget: '',
                    startDate: '',
                    endDate: '',
                    kolCount: ''
                  })
                  setShowCampaignForm(true)
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
                      <input
                        type="text"
                        name="productName"
                        value={campaignFormData.productName}
                        onChange={handleCampaignFormChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                        required
                      />
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">总预算</label>
                      <input
                        type="number"
                        name="totalBudget"
                        value={campaignFormData.totalBudget}
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.productName}</td>
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
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-700">选择KOL</label>
              </div>
              <select
                value={selectedKOL.id}
                onChange={(e) => setSelectedKOL(kols.find(k => k.id === e.target.value))}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md mb-4"
              >
                {kols.map(kol => (
                  <option key={kol.id} value={kol.id}>
                    {kol.name} - {kol.followerCount.toLocaleString()} 粉丝
                  </option>
                ))}
              </select>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">筛选Campaign</label>
                <select
                  value={selectedCampaignFilter}
                  onChange={(e) => setSelectedCampaignFilter(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                >
                  <option value="all">全部Campaign</option>
                  {selectedKOL.campaigns.map(campaign => (
                    <option key={campaign.campaignId} value={campaign.campaignId}>
                      {campaign.campaignName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* KOL基本信息 */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <div className="flex items-center space-x-4">
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
            </div>

            {/* KOL项目表现 */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">项目表现</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">产品</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">平台</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">视频名字</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">视频链接</th>
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.productName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.campaignName}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <img 
                                  src={video.platformIcon} 
                                  alt={video.platform} 
                                  className="w-6 h-6 mr-2"
                                />
                                <span className="text-sm text-gray-900">
                                  {video.platform === 'xiaohongshu' ? '小红书' : 
                                   video.platform === 'douyin' ? '抖音' : 'B站'}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{video.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                              <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                <img 
                                  src={video.platformIcon} 
                                  alt={video.platform} 
                                  className="w-5 h-5 mr-2"
                                />
                                查看视频
                              </a>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{video.publishDate}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{video.views.toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{video.interactions.toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {(video.interactions / video.views * 100).toFixed(2)}%
                            </td>
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
            </div>

            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">上传KOL数据</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center">
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileChange}
                  className="mb-4"
                />
                {selectedFile && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">已选择文件: {selectedFile.name}</p>
                    <button
                      onClick={handleFileUpload}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      上传并解析
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">KOL列表</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">头像</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">KOL名称</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">粉丝数</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">视频数</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {kols.map(kol => (
                      <tr key={kol.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img 
                            src={kol.avatar} 
                            alt={kol.name} 
                            className="w-10 h-10 rounded-full"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{kol.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{kol.followerCount.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{kol.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {kol.campaigns.reduce((total, campaign) => total + campaign.videos.length, 0)}
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