# 素材 → Google Ads 广告位 对照表

> 所有素材在 `ad-assets/` 目录。上传时按此表对号入座。

---

## 一、Search 广告系列（S1–S4）

Search 广告主要是文字，但可加**图片附加信息**提升点击率。

| 广告位 | 用哪个素材 | 数量要求 | 备注 |
|---|---|---|---|
| RSA 标题/描述 | `google-ads-rsa.csv` | 15 标题 + 4 描述/组 | 导入 Ads Editor |
| **图片附加（方 1:1）** | `ad-assets/images/*-square-1200x1200.jpg` | ≥1，建议 3–4 | 每组选对应主题 |
| **图片附加（横 1.91:1）** | `ad-assets/images/*-landscape-1200x628.jpg` | 可选 | — |
| Logo（商家徽标） | `ad-assets/logo/logo-square-1200x1200.png` | 1 | — |
| Sitelink / Callout / Snippet | 见 `GOOGLE-ADS-PLAN.md` 第 5 节 | — | 全组共用 |

**各 Search 组建议配图主题：**
- S1 商用/租赁 → `commercial` + `commercial2` + `factory`
- S2 Turnkey/赛道 → `factory` + `commercial2` + `workshop`
- S3 制造商/OEM → `factory` + `workshop` + `gas`
- S4 Racing/电动 → `racing` + `electric`

---

## 二、Performance Max（P1）资产组

PMax 是素材消耗大户，**每种规格都要传满**才能触达全部广告位（搜索/展示/YouTube/Gmail/Discover/地图）。

| 资产类型 | 规格 | 用哪个素材 | 最少 | 建议 |
|---|---|---|---|---|
| **横图 Landscape** | 1.91:1 (1200×628) | `*-landscape-1200x628.jpg` (8张) | 1 | 传满 8 张 |
| **方图 Square** | 1:1 (1200×1200) | `*-square-1200x1200.jpg` (8张) | 1 | 传满 8 张 |
| **竖图 Portrait** | 4:5 (960×1200) | `*-portrait-960x1200.jpg` (8张) | 0 | 传满 8 张 |
| **Logo 方** | 1:1 (1200×1200) | `logo/logo-square-1200x1200.png` | 1 | ✓ |
| **Logo 横** | 4:1 (1200×300) | `logo/logo-landscape-1200x300.png` | 0 | ✓ |
| **视频** | 横 16:9 | `video/vortkart-30s.mp4` | 0 | ✓ 主打 |
| **视频（短）** | 横 16:9 | `video/vortkart-15s.mp4` | 0 | ✓ 补充 |
| 标题 Headlines | ≤30 字符 ×5–15 | 复用 RSA 标题 | 3 | 15 |
| 长标题 Long headline | ≤90 字符 ×1–5 | 见下方 | 1 | 5 |
| 描述 Descriptions | ≤90 字符 ×2–5 | 复用 RSA 描述 | 2 | 5 |
| 商家名称 | VortKart® | — | 1 | — |
| CTA | Get a quote / Learn more | — | — | — |

**PMax 长标题建议（≤90 字符）：**
1. Factory-direct commercial go karts — electric, gas & racing. Ships to 60+ countries.
2. Turnkey karting solutions from a certified manufacturer. Track design to kart supply.
3. OEM/ODM go kart manufacturer. Skip reseller markup — get a factory quote in 48 hours.

---

## 三、YouTube（如单独跑视频广告）

| 广告位 | 素材 |
|---|---|
| Skippable in-stream | `video/vortkart-30s.mp4` |
| Bumper (6s) | 需从 15s 再裁 6s（脚本见 VIDEO-SCRIPTS.md）|
| Video companion banner | `logo/logo-landscape-1200x300.png` |

---

## 四、上传优先级（时间有限时）

1. **PMax 横图 + 方图各 4 张**（覆盖最广）
2. **Logo 方版**（必填）
3. **30s 视频**（PMax 效果翻倍）
4. Search 图片附加（各组 2–3 张方图）
5. 竖图 + 15s 视频（补充，提升移动端表现）

---

## 五、素材文件速查

```
ad-assets/
├── images/   24 张广告图（8主题 × 横/方/竖）
├── logo/     3 个（方1200 / 横1200×300 / 方512）
├── video/    vortkart-15s.mp4 + vortkart-30s.mp4
├── VIDEO-SCRIPTS.md        视频分镜脚本
└── ASSET-PLACEMENT-MAP.md  本对照表

根目录/
├── GOOGLE-ADS-PLAN.md      完整投放方案
├── google-ads-keywords.csv 关键词+出价（导入 Editor）
├── google-ads-rsa.csv      RSA 文案（导入 Editor）
└── google-ads-negatives.csv 否定词列表
```
