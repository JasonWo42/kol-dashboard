// 测试爬虫功能的脚本
import axios from 'axios';
import * as cheerio from 'cheerio';

// 测试视频 URL
const testVideoUrls = [
  'https://www.bilibili.com/video/BV1xx411c7mD',
  'https://www.xiaohongshu.com/explore/123456789',
  'https://www.douyin.com/video/123456789'
];

// 测试 KOL 名称
const testKolNames = [
  '美食小王',
  '科技小李',
  '时尚小张'
];

async function crawlVideoInfo(url) {
  try {
    console.log(`\n尝试爬取视频：${url}`);
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 10000
    });
    
    const $ = cheerio.load(response.data);
    
    // 尝试获取标题
    let title = $('title').text().trim() || '未知标题';
    console.log(`标题：${title}`);
    
    // 尝试获取发布日期
    let publishDate = new Date().toISOString().split('T')[0];
    
    const bilibiliDate = $('meta[property="article:published_time"]').attr('content');
    if (bilibiliDate) {
      publishDate = new Date(bilibiliDate).toISOString().split('T')[0];
      console.log(`发布日期（B 站）：${publishDate}`);
    }
    
    const xhsDate = $('meta[name="publish_time"]').attr('content');
    if (xhsDate) {
      publishDate = new Date(xhsDate).toISOString().split('T')[0];
      console.log(`发布日期（小红书）：${publishDate}`);
    }
    
    const douyinDate = $('meta[property="article:published_time"]').attr('content');
    if (douyinDate) {
      publishDate = new Date(douyinDate).toISOString().split('T')[0];
      console.log(`发布日期（抖音）：${publishDate}`);
    }
    
    return { title, publishDate };
  } catch (error) {
    console.error(`爬取视频失败：${error.message}`);
    return { title: '未知标题', publishDate: new Date().toISOString().split('T')[0] };
  }
}

async function crawlKolAvatar(kolName) {
  try {
    console.log(`\n尝试爬取 KOL 头像：${kolName}`);
    
    // 尝试从 B 站爬取
    const bilibiliSearchUrl = `https://search.bilibili.com/upuser?keyword=${encodeURIComponent(kolName)}`;
    console.log(`搜索 B 站：${bilibiliSearchUrl}`);
    const bilibiliResponse = await axios.get(bilibiliSearchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 10000
    });
    
    const $bilibili = cheerio.load(bilibiliResponse.data);
    const bilibiliAvatar = $bilibili('.up-card .up-face img').attr('src');
    if (bilibiliAvatar) {
      console.log(`B 站头像：${bilibiliAvatar}`);
      return bilibiliAvatar;
    }
    
    // 尝试从抖音爬取
    const douyinSearchUrl = `https://www.douyin.com/search/${encodeURIComponent(kolName)}`;
    console.log(`搜索抖音：${douyinSearchUrl}`);
    const douyinResponse = await axios.get(douyinSearchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 10000
    });
    
    const $douyin = cheerio.load(douyinResponse.data);
    const douyinAvatar = $douyin('.user-avatar img').attr('src');
    if (douyinAvatar) {
      console.log(`抖音头像：${douyinAvatar}`);
      return douyinAvatar;
    }
    
    // 尝试从快手爬取
    const kuaishouSearchUrl = `https://www.kuaishou.com/search/${encodeURIComponent(kolName)}`;
    console.log(`搜索快手：${kuaishouSearchUrl}`);
    const kuaishouResponse = await axios.get(kuaishouSearchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 10000
    });
    
    const $kuaishou = cheerio.load(kuaishouResponse.data);
    const kuaishouAvatar = $kuaishou('.user-avatar img').attr('src');
    if (kuaishouAvatar) {
      console.log(`快手头像：${kuaishouAvatar}`);
      return kuaishouAvatar;
    }
    
    // 尝试从小红书爬取
    const xhsSearchUrl = `https://www.xiaohongshu.com/search_result?keyword=${encodeURIComponent(kolName)}`;
    console.log(`搜索小红书：${xhsSearchUrl}`);
    const xhsResponse = await axios.get(xhsSearchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 10000
    });
    
    const $xhs = cheerio.load(xhsResponse.data);
    const xhsAvatar = $xhs('.user-avatar img').attr('src');
    if (xhsAvatar) {
      console.log(`小红书头像：${xhsAvatar}`);
      return xhsAvatar;
    }
    
    console.log('未找到头像，使用默认头像');
    return 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20influencer%20avatar&image_size=square';
  } catch (error) {
    console.error(`爬取 KOL 头像失败：${error.message}`);
    return 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20influencer%20avatar&image_size=square';
  }
}

async function runTests() {
  console.log('=== 开始测试爬虫功能 ===\n');
  
  // 测试视频爬取
  console.log('--- 测试视频爬取 ---');
  for (const url of testVideoUrls) {
    await crawlVideoInfo(url);
    await new Promise(resolve => setTimeout(resolve, 1000)); // 避免请求过快
  }
  
  // 测试 KOL 头像爬取
  console.log('\n--- 测试 KOL 头像爬取 ---');
  for (const kolName of testKolNames) {
    await crawlKolAvatar(kolName);
    await new Promise(resolve => setTimeout(resolve, 1000)); // 避免请求过快
  }
  
  console.log('\n=== 测试完成 ===');
}

runTests();
