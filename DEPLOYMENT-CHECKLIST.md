# VortKart® 上线部署清单（域名 + SSL + 托管）

> 站点类型：Astro 静态站（纯 HTML/CSS/JS，无服务器端逻辑）
> 构建命令：`npm run build` → 产物在 `dist/`（41 页，约 38MB）

---

## 1. 域名（vortkart.com）

- [ ] 确认 **vortkart.com** 已注册。购买/管理域名推荐 WordPress.com Domains：https://wordpress.com/domains
- [ ] 决定规范主机名：**非 www**（`https://vortkart.com`）—— 已在 astro.config、sitemap、robots、canonical 全站统一
- [ ] `_redirects` 已配置 www → 非 www 的 301 跳转（避免重复内容分散权重）

---

## 2. 托管选择（静态站）

推荐（按契合度）：
1. **Cloudflare Pages** — 免费、全球 CDN、自动 SSL、支持 `_headers`/`_redirects`
2. **Netlify** — 免费额度、自动 SSL、原生支持 `_headers`/`_redirects`
3. **WordPress.com / Pressable** — 若你希望统一在 WordPress 生态托管

> 本站是静态产物，上传 `dist/` 目录即可，无需 Node 运行环境。

---

## 3. 部署步骤（以 Netlify / Cloudflare Pages 为例）

- [ ] 连接 Git 仓库（或手动拖拽 `dist/` 上传）
- [ ] 构建设置：Build command = `npm run build`，Publish directory = `dist`
- [ ] 首次部署成功后，绑定自定义域名 `vortkart.com`
- [ ] 按平台提示配置 DNS（见第 4 节）

---

## 4. DNS 配置

在域名注册商的 DNS 面板添加（具体值以托管平台给出的为准）：

| 类型 | 主机 | 值 | 说明 |
|---|---|---|---|
| A / CNAME | @ (根域) | 托管平台指定 IP / 目标 | 指向站点 |
| CNAME | www | vortkart.com（或平台目标） | www 跳转 |
| TXT | @ | 平台验证串 | 域名归属验证 |

- [ ] DNS 生效后（几分钟~48h），访问 https://vortkart.com 确认正常

---

## 5. SSL / HTTPS

- [ ] 托管平台自动签发 Let's Encrypt SSL（Cloudflare/Netlify 均自动）
- [ ] 确认强制 HTTPS（HTTP 自动跳 HTTPS）
- [ ] `_headers` 已含 HSTS（Strict-Transport-Security）—— 提升安全评分

---

## 6. 上线后验证

- [ ] https://vortkart.com 首页正常、无混合内容警告（锁头图标绿）
- [ ] https://www.vortkart.com 正确 301 跳到非 www
- [ ] https://vortkart.com/sitemap.xml 可访问
- [ ] https://vortkart.com/robots.txt 可访问
- [ ] 提交 sitemap 到 Google Search Console
- [ ] 表单提交测试 → 跳转 /thank-you → 邮箱收到询盘（需先配 Web3Forms key）
- [ ] 用 Google Rich Results Test 验证 JSON-LD 结构化数据

---

## 7. 与广告投放的衔接

- [ ] 域名可访问后，广告落地页 URL（`https://vortkart.com/commercial-go-karts` 等）才有效
- [ ] 上线后先跑 SEO 审计（rank-me-up）确认 meta/OG 正常
- [ ] 填入 GA4 / Ads ID 到 `src/config/site.ts` → 重新 build 部署 → 追踪激活
- [ ] Google Search Console + Google Ads 关联，导入转化数据
