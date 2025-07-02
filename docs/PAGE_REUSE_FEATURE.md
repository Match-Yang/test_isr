# 页面复用功能

## 概述

页面复用功能允许在文档站点中复用其他页面的内容，而无需重复构建相同的页面。这可以显著减少构建时间和存储空间。

## 使用方法

### 1. 创建复用页面

要创建一个复用页面，只需在MDX文件中使用以下语法：

```mdx
import Content from '/path/to/original/page.mdx'

<Content />
```

### 2. 复用页面的识别条件

系统会自动识别符合以下条件的文件为复用页面：

1. 整个文件只有两行非空内容
2. 第一行是以 `import Content from` 开头的导入语句
3. 第二行必须是 `<Content />`

### 3. 示例

例如，要让 `aiagent-server` 的定价页面复用 `aiagent-android` 的定价页面内容：

**文件：** `docs/core_products/aiagent/zh/server/introduction/pricing.mdx`

```mdx
import Content from '/core_products/aiagent/zh/android/introduction/pricing.mdx'

<Content />
```

## 工作原理

### 1. 构建时检测

在构建过程中，系统会：

1. 扫描所有MDX文件
2. 识别符合复用模式的文件
3. 跳过这些文件的页面构建
4. 生成URL重写映射

### 2. 运行时重写

当用户访问复用页面的URL时：

1. 中间件检测到这是一个复用页面的URL
2. 自动将请求重写到原始页面的URL
3. 用户看到的是原始页面的内容，但URL保持不变

### 3. 路径映射规则

系统会根据 `docuo.config.json` 中的实例配置自动计算URL映射：

- 复用页面路径：根据文件在实例中的位置计算
- 原始页面路径：根据import路径和对应实例的routeBasePath计算

## 配置

### 自动生成重写映射

构建脚本会自动运行 `scripts/generate-rewrite-mappings.js` 来：

1. 扫描所有复用页面
2. 生成重写映射
3. 更新 `middleware.ts` 文件

### 手动生成重写映射

如果需要手动生成重写映射，可以运行：

```bash
node scripts/generate-rewrite-mappings.js
```

## 优势

1. **减少构建时间**：跳过复用页面的构建过程
2. **节省存储空间**：避免生成重复的页面文件
3. **保持URL独立性**：每个实例保持自己的URL结构
4. **内容一致性**：确保复用页面与原始页面内容完全一致
5. **SEO友好**：每个URL都有独立的页面，搜索引擎可以正常索引

## 注意事项

1. **路径准确性**：确保import路径正确指向存在的文件
2. **实例配置**：确保 `docuo.config.json` 中的实例配置正确
3. **构建顺序**：重写映射生成必须在Next.js构建之前完成
4. **缓存清理**：修改复用关系后可能需要清理构建缓存

## 验证

要验证页面复用功能是否正常工作：

1. 检查构建日志中的 `[SlugController] Skipping reused page` 消息
2. 检查中间件日志中的 `[Middleware] Rewriting` 消息
3. 访问复用页面URL，确认内容正确显示
4. 检查 `middleware.ts` 文件中的 `REWRITE_MAPPINGS` 对象

## 故障排除

### 复用页面未被识别

- 检查文件格式是否严格符合要求
- 确认只有两行非空内容
- 检查import语法是否正确

### URL重写不工作

- 检查 `middleware.ts` 中是否包含正确的映射
- 重新运行重写映射生成脚本
- 检查路径计算是否正确

### 页面显示404

- 确认原始页面存在且可访问
- 检查实例配置是否正确
- 验证路径映射是否准确
