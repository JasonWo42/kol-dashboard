import axios from 'axios';
import * as cheerio from 'cheerio';

async function testBilibili() {
  try {
    const url = 'https://www.bilibili.com/video/BV1T6B1BTEH7';
    console.log(`爬取视频：${url}`);
    
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      timeout: 10000
    });
    
    const $ = cheerio.load(response.data);
    
    console.log('\n=== 视频信息 ===');
    console.log('标题:', $('title').text().trim());
    
    console.log('\n=== 发布日期相关 meta 标签 ===');
    const publishedTime = $('meta[property="article:published_time"]').attr('content');
    console.log('article:published_time:', publishedTime);
    
    const publishTime = $('meta[name="publish_time"]').attr('content');
    console.log('publish_time:', publishTime);
    
    const videoPubTime = $('meta[itemprop="datePublished"]').attr('content');
    console.log('datePublished:', videoPubTime);
    
    const videoUpTime = $('meta[itemprop="uploadDate"]').attr('content');
    console.log('uploadDate:', videoUpTime);
    
    console.log('\n=== 所有 meta 标签 ===');
    $('meta').each((i, el) => {
      const name = $(el).attr('name') || $(el).attr('property') || $(el).attr('itemprop');
      const content = $(el).attr('content');
      if (name && content && (name.includes('date') || name.includes('time') || name.includes('publish'))) {
        console.log(`  ${name}: ${content}`);
      }
    });
    
  } catch (error) {
    console.error('错误:', error.message);
    if (error.response) {
      console.error('状态码:', error.response.status);
    }
  }
}

testBilibili();
