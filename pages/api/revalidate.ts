import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 检查请求方法
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // 验证密钥（可选，用于安全性）
  const secret = req.body.secret || req.query.secret;
  if (secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid secret' });
  }

  try {
    const { path, paths } = req.body;

    if (path) {
      // 重新验证单个路径
      await res.revalidate(path);
      console.log(`[ISR] Revalidated path: ${path}`);
      return res.json({ 
        revalidated: true, 
        path,
        message: `Path ${path} revalidated successfully` 
      });
    }

    if (paths && Array.isArray(paths)) {
      // 重新验证多个路径
      const results = [];
      for (const p of paths) {
        try {
          await res.revalidate(p);
          results.push({ path: p, success: true });
          console.log(`[ISR] Revalidated path: ${p}`);
        } catch (error) {
          results.push({ path: p, success: false, error: error.message });
          console.error(`[ISR] Failed to revalidate path: ${p}`, error);
        }
      }
      
      return res.json({ 
        revalidated: true, 
        results,
        message: `${results.filter(r => r.success).length}/${paths.length} paths revalidated successfully` 
      });
    }

    return res.status(400).json({ 
      message: 'Missing path or paths parameter' 
    });

  } catch (error) {
    console.error('[ISR] Revalidation error:', error);
    return res.status(500).json({ 
      message: 'Error revalidating', 
      error: error.message 
    });
  }
}
