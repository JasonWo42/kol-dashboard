import axios from 'axios';
import * as cheerio from 'cheerio';

async function testKolAvatar() {
  try {
    // 直接访问 UP 主个人页面
    const kolUrl = 'https://space.bilibili.com/546190619'; // 老番茄的 UID
    console.log(`访问 UP 主页面：${kolUrl}`);
    
    const response = await axios.get(kolUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      timeout: 10000
    });
    
    const $ = cheerio.load(response.data);
    
    console.log('\n=== 查找头像 ===');
    
    // 尝试不同的选择器
    const avatar1 = $('.h-full.rounded-full').attr('src');
    console.log('选择器 1 (.h-full.rounded-full):', avatar1);
    
    const avatar2 = $('img[src*="i0.hdslb.com"]').first().attr('src');
    console.log('选择器 2 (第一个 hdslb 图片):', avatar2);
    
    // 打印所有图片
    console.log('\n=== 前 20 个图片 ===');
    $('img').each((i, el) => {
      if (i < 20) {
        const src = $(el).attr('src');
        const alt = $(el).attr('alt');
        if (src && src.includes('hdslb')) {
          console.log(`  ${i + 1}. src: ${src.substring(0, 150)}, alt: ${alt}`);
        }
      }
    });
    
    // 查找 face 相关的类
    console.log('\n=== 查找 face 相关的元素 ===');
    $('[class*="face"]').each((i, el) => {
      const className = $(el).attr('class');
      console.log(`  ${i + 1}. class: ${className}`);
    });
    
    // 查找 avatar 相关的元素
    console.log('\n=== 查找 avatar 相关的元素 ===');
    $('[class*="avatar"]').each((i, el) => {
      const className = $(el).attr('class');
      console.log(`  ${i + 1}. class: ${className}`);
    });
    
  } catch (error) {
    console.error('错误:', error.message);
    if (error.response) {
      console.error('状态码:', error.response.status);
    }
  }
}

testKolAvatar();
