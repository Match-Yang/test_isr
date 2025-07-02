import { NextApiRequest, NextApiResponse } from 'next';

/**
 * 清除已删除页面的缓存
 * 当删除 MDX 文件时，调用此 API 来清除对应的 ISR 缓存
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // 验证密钥
  const secret = req.body.secret || req.query.secret;
  if (secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid secret' });
  }

  try {
    const { deletedPaths } = req.body;

    if (!deletedPaths || !Array.isArray(deletedPaths)) {
      return res.status(400).json({ 
        message: 'Missing deletedPaths parameter (should be an array)' 
      });
    }

    const results = [];

    for (const path of deletedPaths) {
      try {
        // 尝试重新验证路径，这会触发 getStaticProps
        // 由于文件已删除，getStaticProps 会返回 notFound: true
        // 这样就会清除旧的缓存并显示 404 页面
        await res.revalidate(path);
        
        results.push({ 
          path, 
          success: true, 
          message: 'Cache cleared, will show 404 on next access' 
        });
        
        console.log(`[ISR] Cleared cache for deleted page: ${path}`);
      } catch (error) {
        results.push({ 
          path, 
          success: false, 
          error: error.message 
        });
        
        console.error(`[ISR] Failed to clear cache for: ${path}`, error);
      }
    }

    const successCount = results.filter(r => r.success).length;
    
    return res.json({
      success: true,
      message: `${successCount}/${deletedPaths.length} deleted pages cleared from cache`,
      results
    });

  } catch (error) {
    console.error('[ISR] Error clearing deleted pages:', error);
    return res.status(500).json({
      message: 'Error clearing deleted pages',
      error: error.message
    });
  }
}
