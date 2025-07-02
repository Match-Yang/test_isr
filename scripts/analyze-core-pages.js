/**
 * 分析核心页面脚本
 * 帮助确定哪些页面应该预生成
 */

const fs = require('fs');
const path = require('path');

// 分析文档结构，找出重要页面
function analyzeCorePages() {
  const docsDir = path.join(process.cwd(), 'docs');
  const corePages = [];
  
  // 定义重要页面的模式
  const importantPatterns = [
    /overview/i,
    /quickstart/i,
    /getting-started/i,
    /introduction/i,
    /index/i,
    /readme/i,
  ];
  
  // 定义重要目录
  const importantDirs = [
    'general',
    'core_products',
    'uikit',
  ];
  
  function scanDirectory(dir, relativePath = '') {
    if (!fs.existsSync(dir)) return;
    
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const currentRelativePath = relativePath ? `${relativePath}/${item}` : item;
      
      if (fs.statSync(fullPath).isDirectory()) {
        // 如果是重要目录，递归扫描
        if (importantDirs.some(importantDir => currentRelativePath.includes(importantDir))) {
          scanDirectory(fullPath, currentRelativePath);
        }
      } else if (item.endsWith('.mdx') || item.endsWith('.md')) {
        const fileName = item.replace(/\.(mdx|md)$/, '');
        
        // 检查是否匹配重要页面模式
        const isImportant = importantPatterns.some(pattern => 
          pattern.test(fileName) || pattern.test(currentRelativePath)
        );
        
        if (isImportant) {
          // 转换为路由路径
          let routePath = currentRelativePath.replace(/\.(mdx|md)$/, '');
          if (fileName === 'index' || fileName === 'README') {
            routePath = routePath.replace(/\/(index|README)$/, '');
          }
          
          const slugArray = routePath.split('/').filter(Boolean);
          corePages.push({
            file: currentRelativePath,
            route: `/${routePath}`,
            slug: slugArray,
            reason: 'Important page pattern match'
          });
        }
      }
    }
  }
  
  scanDirectory(docsDir);
  
  return corePages;
}

// 生成 getStaticPaths 的代码
function generateStaticPathsCode(corePages) {
  const pathsCode = corePages
    .slice(0, 20) // 限制预生成页面数量
    .map(page => `      { params: { slug: ${JSON.stringify(page.slug)} } }, // ${page.route}`)
    .join('\n');
  
  return `    const corePaths = [
      // 预生成最重要的页面（通过脚本分析得出）
${pathsCode}
    ];`;
}

// 主函数
function main() {
  console.log('🔍 分析文档结构，寻找核心页面...\n');
  
  const corePages = analyzeCorePages();
  
  console.log(`📊 分析结果：`);
  console.log(`- 总共找到 ${corePages.length} 个重要页面`);
  console.log(`- 建议预生成前 20 个页面以平衡构建时间和用户体验\n`);
  
  console.log('📋 建议预生成的页面：');
  corePages.slice(0, 20).forEach((page, index) => {
    console.log(`${index + 1}. ${page.route} (${page.file})`);
  });
  
  console.log('\n📝 生成的代码片段：');
  console.log('将以下代码替换到 pages/[[...slug]].tsx 中的 corePaths 数组：\n');
  console.log(generateStaticPathsCode(corePages));
  
  console.log('\n💡 提示：');
  console.log('- 你可以根据 Google Analytics 数据进一步优化这个列表');
  console.log('- 访问量最高的页面应该优先预生成');
  console.log('- 预生成页面越少，构建越快，但首次访问可能稍慢');
}

if (require.main === module) {
  main();
}

module.exports = { analyzeCorePages, generateStaticPathsCode };
