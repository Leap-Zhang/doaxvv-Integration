// 拉取 doax.cc 数据并重新生成本地数据模块（用于 CI 定时更新）
import fs from 'node:fs';
import { execSync } from 'node:child_process';

const API = 'https://doax.cc/api/';
const files = [
  'girl_data.json', 'ssr_data.json', 'ssr_data_steam.json',
  'skill_data.json', 'skill_emphasis_data.json',
  'level_data.json', 'monthly_banner_data.json', 'event_data.json'
];

fs.mkdirSync('tools/doax/raw', { recursive: true });
for (const f of files) {
  const r = await fetch(API + f);
  if (!r.ok) throw new Error('fetch failed: ' + f + ' ' + r.status);
  fs.writeFileSync('tools/doax/raw/' + f, Buffer.from(await r.arrayBuffer()));
}

// 重新生成泳装/技能/新增资料数据模块
execSync('node tools/doax/gen_from_api.cjs', { stdio: 'inherit' });
execSync('node tools/doax/gen_ref.cjs', { stdio: 'inherit' });

// 同步到 public（运行时数据）
for (const f of ['doax-ssr.json','doax-skills.json','girl-names.json',
                 'doax-level.json','doax-banner.json','doax-event.json','doax-emphasis.json','doax-ssr-steam.json']) {
  fs.copyFileSync('src/data/' + f, 'public/data/' + f);
}
console.log('Data updated from doax.cc');