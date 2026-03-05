import axios from 'axios';
import * as cheerio from 'cheerio';

async function testKolAvatar() {
  try {
    const kolName = '老番茄';
    console.log(`搜索 KOL：${kolName}`);
    
    // 尝试从 B 站爬取
    const bilibiliSearchUrl = `https://search.bilibili.com/upuser?keyword=${encodeURIComponent(kolName)}`;
    console.log(`B 站搜索 URL: ${bilibiliSearchUrl}`);
    
    const response = await axios.get(bilibiliSearchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      timeout: 10000
    });
    
    const $ = cheerio.load(response.data);
    
    console.log('\n=== 查找头像 ===');
    
    // 尝试不同的选择器
    const avatar1 = $('.up-card .up-face img').attr('src');
    console.log('选择器 1 (.up-card .up-face img):', avatar1);
    
    const avatar2 = $('.up-face img').attr('src');
    console.log('选择器 2 (.up-face img):', avatar2);
    
    const avatar3 = $('img[alt="avatar"]').attr('src');
    console.log('选择器 3 (img[alt="avatar"]):', avatar3);
    
    const avatar4 = $('.avatar img').attr('src');
    console.log('选择器 4 (.avatar img):', avatar4);
    
    // 打印所有图片
    console.log('\n=== 前 10 个图片 ===');
    $('img').each((i, el) => {
      if (i < 10) {
        const src = $(el).attr('src');
        const alt = $(el).attr('alt');
        console.log(`  ${i + 1}. src: ${src ? src.substring(0, 100) : 'undefined'}, alt: ${alt}`);
      }
    });
    
    // 打印第一个 up-card 的 HTML
    console.log('\n=== 第一个 up-card 的 HTML ===');
    const firstCard = $('.up-card').first();
    console.log(firstCard.html()?.substring(0, 500));
    
  } catch (error) {
    console.error('错误:', error.message);
    if (error.response) {
      console.error('状态码:', error.response.status);
    }
  }
}

testKolAvatar();
