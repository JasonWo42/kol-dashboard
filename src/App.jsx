import React, { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// 模拟数据
const mockCampaigns = [
  {
    id: 'campaign1',
    name: '夏季新品推广',
    productName: '清凉系列饮料',
    kolCount: 15,
    contentCount: 32,
    totalViews: 1250000,
    totalInteractions: 45000,
    totalSpent: 85000
  },
  {
    id: 'campaign2',
    name: '节日促销活动',
    productName: '智能手表',
    kolCount: 8,
    contentCount: 16,
    totalViews: 890000,
    totalInteractions: 32000,
    totalSpent: 65000
  },
  {
    id: 'campaign3',
    name: '品牌形象打造',
    productName: '高端护肤系列',
    kolCount: 12,
    contentCount: 24,
    totalViews: 980000,
    totalInteractions: 38000,
    totalSpent: 72000
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
            videoUrl: 'https://example.com/video1',
            views: 250000,
            interactions: 12000,
            cost: 8000
          },
          {
            videoId: 'video2',
            videoUrl: 'https://example.com/video2',
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
            videoUrl: 'https://example.com/video3',
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
            videoUrl: 'https://example.com/video4',
            views: 450000,
            interactions: 22000,
            cost: 15000
          },
          {
            videoId: 'video5',
            videoUrl: 'https://example.com/video5',
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
            </div>
          </div>
        </div>
      </nav>

      {/* 主内容区 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Campaign分析 */}
        {activeTab === 'campaign' && (
          <div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">选择Campaign</label>
              <select
                value={selectedCampaign.id}
                onChange={(e) => setSelectedCampaign(mockCampaigns.find(c => c.id === e.target.value))}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
              >
                {mockCampaigns.map(campaign => (
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
                  <p className="text-sm text-gray-500">总花费</p>
                  <p className="text-2xl font-bold text-gray-900">¥{selectedCampaign.totalSpent.toLocaleString()}</p>
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
                  <p className="text-sm text-gray-500">互动率</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {(selectedCampaign.totalInteractions / selectedCampaign.totalViews * 100).toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Campaign表现对比</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={mockCampaigns}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalViews" name="播放量" fill="#8884d8" />
                    <Bar dataKey="totalInteractions" name="互动量" fill="#82ca9d" />
                    <Bar dataKey="totalSpent" name="花费" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* KOL表现 */}
        {activeTab === 'kol' && (
          <div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">选择KOL</label>
              <select
                value={selectedKOL.id}
                onChange={(e) => setSelectedKOL(mockKOLs.find(k => k.id === e.target.value))}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
              >
                {mockKOLs.map(kol => (
                  <option key={kol.id} value={kol.id}>
                    {kol.name} - {kol.followerCount.toLocaleString()} 粉丝
                  </option>
                ))}
              </select>
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">视频链接</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">播放量</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">互动量</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">花费</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedKOL.campaigns.flatMap(campaign => 
                      campaign.videos.map(video => (
                        <tr key={video.videoId}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.productName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.campaignName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                            <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
                              查看视频
                            </a>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{video.views.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{video.interactions.toLocaleString()}</td>
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
      </main>
    </div>
  )
}

export default App