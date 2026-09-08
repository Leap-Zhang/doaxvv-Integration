#!/usr/bin/env node
// 官网公告抓取（与官网首页一致版）
// 源：steam_info_list.html（新闻）/ steam_update_list.html（更新）
// 输出：src/data/official-news.json（两栏 + 历史27条 + 每条的图文 blocks）
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJ = path.resolve(__dirname, '..', '..');
const SITE = 'https://game.doaxvv.com';
const INFO = SITE + '/cn/steam_info_list.html';
const UPD  = SITE + '/cn/steam_update_list.html';
const IMGDIR = path.join(PROJ, 'public', 'img', 'news');
const UA = { 'User-Agent': 'Mozilla/5.0', 'Referer': SITE + '/' };
import { createRequire } from 'node:module';
const SHARP_PATH = process.env.SHARP || 'C:\\Users\\Leap_\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\node\\node_modules';
const sharp = createRequire(path.join(SHARP_PATH, 'package.json'))('sharp');

const cleanUrl = (u) => (u || '').replace(/["']?\s*target\s*=\s*["']?brank.*$/i, '').trim();
const cleanTitle = (t) => (t || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const cat = (t) => { const s = t.toLowerCase(); if (/维护/.test(s)) return 'maintenance'; if (/版本|ver\.|更新内容/.test(t)) return 'version'; if (/扭蛋|ガチャ|套装|水着|gacha/.test(s)) return 'gacha'; if (/泳装|水着|宝石|礼包|套组|纪念|礼物|特惠|销售|swimsuit/.test(s)) return 'swimsuit'; if (/活动|赌场|攀岩|温泉|竞技场|大跳|祭|期间|event/.test(s)) return 'event'; if (/开发|进度|公告|预兆|important/.test(s)) return 'important'; return 'other'; };

async function getJSON(u, tries = 5) {
  for (let i = 0; i < tries; i++) {
    try { const r = await fetch(u, { headers: UA }); if (!r.ok) throw new Error('HTTP ' + r.status); const t = await r.text(); try { return JSON.parse(t); } catch { /* 尝试再试 */ } } catch (e) {}
    await new Promise((res) => setTimeout(res, 1500));
  }
  return null;
}

// 解析官网详情正文 → blocks（按 DOM 顺序：heading/text/table/img）
function parseBlocks(html, baseUrl) {
  let b = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i); b = b ? b[1] : html;
  b = b.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ');
  const blocks = [];
  const SITE = 'https://game.doaxvv.com';
  // 顺序扫描：按 img / h* / table / p / li 出现位置切块
  const re = /<img\b[^>]*>|<h[1-4]\b[^>]*>[\s\S]*?<\/h[1-4]>|<table\b[^>]*>[\s\S]*?<\/table>|<p\b[^>]*>[\s\S]*?<\/p>|<li\b[^>]*>[\s\S]*?<\/li>|<tr\b[^>]*>[\s\S]*?<\/tr>|<br\s*\/?>/gi;
  let m;
  while ((m = re.exec(b))) {
    const raw = m[0];
    if (/^<img\b/i.test(raw)) {
      const srcM = raw.match(/(?:src|data-src)="([^"]+)"/i); const altM = raw.match(/alt="([^"]*)"/i);
      if (srcM && !/logo|wallpaper|background|spacer|banner|footer/i.test(srcM[1]) && /\.(png|jpe?g|webp)/i.test(srcM[1])) {
        const abs = srcM[1].startsWith('http') ? srcM[1] : new URL(srcM[1], baseUrl || 'https://game.doaxvv.com/').href;
        blocks.push({ type: 'img', src: abs, alt: (altM ? altM[1] : '') });
      }
    } else if (/^<table\b/i.test(raw)) {
      const rows = []; const trRe = /<tr\b[^>]*>([\s\S]*?)<\/tr>/gi; let tr;
      while ((tr = trRe.exec(raw))) { const cells = [...tr[1].matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((c) => c[1].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim()); if (cells.length) rows.push(cells); }
      if (rows.length) blocks.push({ type: 'table', rows });
    } else if (/^<h[1-4]\b/i.test(raw)) {
      const lvl = +raw.match(/^<h([1-4])\b/)[1]; const txt = raw.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
      if (txt) blocks.push({ type: 'heading', level: lvl, text: txt });
    } else if (/^<p\b/i.test(raw) || /^<li\b/i.test(raw)) {
      const txt = raw.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
      if (txt) blocks.push({ type: 'text', text: txt });
    }
  }
  return blocks;
}


async function fetchDetail(url) {
  for (let i = 0; i < 4; i++) {
    try { const r = await fetch(url, { headers: UA }); if (!r.ok) throw new Error(r.status); return await r.text(); } catch (e) {}
    await new Promise((res) => setTimeout(res, 1500));
  }
  return '';
}

// 下载官网图片并本地化 → public/img/news/<slug>/<i>.webp
async function dl(url) { try { const r = await fetch(url, { headers: UA }); if (!r.ok) return null; return Buffer.from(await r.arrayBuffer()); } catch { return null; } }
async function saveWebp(buf, out) {
  try { await sharp(buf).webp({ quality: 76 }).toFile(out); return true; } catch { return false; }
}

(async () => {
  const info = await getJSON(INFO); const upd = await getJSON(UPD);
  if (!info && !upd) { console.error('无法抓到官方公告源'); process.exit(1); }
  const items = [];
  const seen = new Set();
  for (const src of [info, upd]) {
    if (!src) continue;
    for (const raw of src) {
      const url = cleanUrl(raw.link_url || raw.url || '');
      const title = cleanTitle(raw.title || '');
      const date = (raw.date || '').trim();
      const key = url || date + title;
      if (!title || seen.has(key)) continue; seen.add(key);
      items.push({ date, title, url, category: cat(title), kind: (src === info ? 'news' : 'update') });
    }
  }
  items.sort((a, b) => (b.date || '').localeCompare(a.date || '') || a.title.localeCompare(b.title, 'zh'));

  // 历史27条 = 前27条
  const history = items.slice(0, 27);
  // 首页两栏：最新信息 / 更新信息 各 5 条
  const newsTop = items.filter((i) => i.kind === 'news').slice(0, 5);
  const updTop = items.filter((i) => i.kind === 'update').slice(0, 5);

  // 27条详情（blocks + 图片本地化）
  const withDetail = [];
  for (let i = 0; i < history.length; i++) {
    const it = history[i];
    const html = await fetchDetail(it.url);
    const blocks = html ? await parseBlocks(html, it.url) : [];
    // 下载图
    const slug = (it.url.replace(/^.*information\//, '').split('?')[0].replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '') || 'n' + i).slice(0, 60);
    const localBlocks = [];
    let imgN = 0;
    for (const bl of blocks) {
      if (bl.type === 'img') {
        const was = bl.src.startsWith('http') ? bl.src : SITE + '/' + bl.src.replace(/^\//, '');
        const buf = await dl(was); if (!buf) { localBlocks.push(bl); continue; }
        const dir = path.join(IMGDIR, slug); fs.mkdirSync(dir, { recursive: true });
        const f = path.join(dir, imgN + '.webp'); if (await saveWebp(buf, f)) { localBlocks.push({ type: 'img', src: 'img/news/' + slug + '/' + imgN + '.webp', alt: bl.alt }); imgN++; }
        else localBlocks.push(bl);
      } else localBlocks.push(bl);
    }
    withDetail.push({ ...it, blocks: localBlocks.length ? localBlocks : null });
    if (i % 5 === 0) console.log('详情 ' + (i + 1) + '/' + history.length + ' ' + it.title.slice(0, 30));
  }

  const out = { snapshot: new Date().toISOString().slice(0, 10), count: items.length, newsTop, updTop, history: withDetail };
  fs.writeFileSync(path.join(PROJ, 'src/data/official-news.json'), JSON.stringify(out));
  console.log('完成。总=', items.length, '新闻顶=', newsTop.length, '更新顶=', updTop.length, '历史27=', history.length, '带blocks=', withDetail.filter((x) => x.blocks).length);
})();