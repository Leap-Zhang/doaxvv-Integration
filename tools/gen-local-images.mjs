#!/usr/bin/env node
// @ts-nocheck
/**
 * 本地图片生成器
 * ---------------------------------------------
 * 把 bromide_dl/pic_star 里的泳装源图（正常 + _m 走形变体）批量转成 webp，
 * 输出到 public/img/suits/，供泳装图鉴卡片 / 弹窗使用（竖版 3:4 裁切）。
 * 同时生成女孩立绘竖版 cover 到 public/img/portraits/。
 *
 * 目标：站点彻底去掉 jsDelivr + wsrv 外链，全部引用本地 /img/ 文件。
 *
 * 用法：
 *   node tools/gen-local-images.mjs                # 全量生成（默认并发 4）
 *   node tools/gen-local-images.mjs --only girls   # 只生成女孩立绘
 *   node tools/gen-local-images.mjs --only suits   # 只生成泳装
 *   node tools/gen-local-images.mjs --fresh        # 忽略已有文件，强制重生成
 *   node tools/gen-local-images.mjs --sharp <path> # 指定 sharp 运行时目录（node_modules/sharp）
 */
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const SRC_STAR = path.join(ROOT, 'bromide_dl', 'pic_star');
const OUT_SUITS = path.join(ROOT, 'public', 'img', 'suits');
const OUT_PORTRAITS = path.join(ROOT, 'public', 'img', 'portraits');

// 复用一个已知可用的 sharp。默认用 codex 运行时自带的完整构建，
// 以避免项目 pnpm 里 sharp@0.34.5 缺少 @img/sharp-win32-x64 的问题。
const SHARP_DEFAULT = 'C:\\Users\\Leap_\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\node\\node_modules';

const args = process.argv.slice(2);

function parseOpt(name) {
  const eq = args.find((a) => a.startsWith(name + '='));
  if (eq) return eq.slice(name.length + 1);
  const idx = args.indexOf(name);
  if (idx >= 0 && args[idx + 1] && !args[idx + 1].startsWith('--')) return args[idx + 1];
  return '';
}

const only = parseOpt('--only');
const fresh = args.includes('--fresh');
const sharpPath = parseOpt('--sharp') || SHARP_DEFAULT;

let sharp;
try {
  const req = createRequire(path.join(sharpPath, 'package.json'));
  sharp = req('sharp');
} catch (e) {
  console.error('[fatal] 无法加载 sharp，请用 --sharp <node_modules 或 sharp 目录> 指定可用运行时');
  console.error(e.message);
  process.exit(1);
}

// 竖版裁切输出：统一按 3:4 竖版 cover 裁切（对象中心），匹配卡片 aspect-[3/4]。
async function toWebpSuit(src, dest, width = 1100, quality = 85) {
  const target = Math.round(width * 1.5);
  await sharp(src)
    .resize({ width, height: target, fit: 'cover', position: 'centre' })
    .webp({ quality, effort: 6 })
    .toFile(dest);
}

// 女孩立绘 cover（竖版，中心裁切）
async function toWebpPortrait(src, dest, width = 840, quality = 93) {
  const target = Math.round(width * 1.5);
  await sharp(src)
    .resize({ width, height: target, fit: 'cover', position: 'centre' })
    .webp({ quality, effort: 6 })
    .toFile(dest);
}

async function exists(file) {
  try { await fs.promises.access(file); return true; } catch { return false; }
}

async function runBatch(files, worker, concurrency = 4) {
  let idx = 0, ok = 0, fail = 0, skip = 0;
  const total = files.length;
  const errors = [];
  async function next() {
    while (idx < total) {
      const cur = idx++;
      const f = files[cur];
      try {
        const did = await worker(f);
        if (did === 'skip') skip++; else ok++;
      } catch (e) {
        fail++;
        errors.push(path.basename(f) + ': ' + e.message);
      }
      if (cur % 50 === 0 || cur === total - 1) {
        process.stdout.write(`\r  ${cur + 1}/${total}  完成=${ok} 跳过=${skip} 失败=${fail}   `);
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, total) }, next));
  process.stdout.write('\n');
  return { ok, skip, fail, errors };
}

async function main() {
  fs.mkdirSync(OUT_SUITS, { recursive: true });
  fs.mkdirSync(OUT_PORTRAITS, { recursive: true });

  const girlFirst = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'girl-first-suit.json'), 'utf8'));

  // ----- 泳装图鉴 -----
  if (only === '' || only === 'suits') {
    const all = fs.readdirSync(SRC_STAR).filter((n) => n.endsWith('.png'));
    const targets = all.map((n) => {
      const stem = n.replace(/\.png$/, '');
      const src = path.join(SRC_STAR, n);
      const dest = path.join(OUT_SUITS, stem + '.webp');
      const id = stem.replace(/_m$/, '');
      return { src, dest, id, stem };
    });
    console.log(`泳装源图：${targets.length} 张 -> ${OUT_SUITS}`);
    const worker = async ({ src, dest, id, stem }) => {
      if (!fresh && (await exists(dest))) return 'skip';
      await toWebpSuit(src, dest, 1100, 85);
      return 'done';
    };
    const r = await runBatch(targets, worker, 4);
    console.log(`泳装生成完成：完成=${r.ok} 跳过=${r.skip} 失败=${r.fail}`);
    if (r.errors.length) { console.error(r.errors.slice(0, 30).join('\n')); }
  }

  // ----- 女孩立绘 -----
  if (only === '' || only === 'girls') {
    const portraits = Object.entries(girlFirst).map(([girl, id]) => ({
      girl,
      id: String(id),
      src: path.join(SRC_STAR, String(id) + '.png'),
      dest: path.join(OUT_PORTRAITS, String(id) + '.webp'),
    })).filter((p) => fs.existsSync(p.src));
    console.log(`女孩立绘：${portraits.length} 张 -> ${OUT_PORTRAITS}`);
    const worker = async ({ girl, id, src, dest }) => {
      if (!fresh && (await exists(dest))) return 'skip';
      await toWebpPortrait(src, dest, 840, 93);
      return 'done';
    };
    const r = await runBatch(portraits, worker, 4);
    console.log(`立绘生成完成：完成=${r.ok} 跳过=${r.skip} 失败=${r.fail}`);
    if (r.errors.length) { console.error(r.errors.slice(0, 30).join('\n')); }
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
