// 生成前端可“随用随调”的后端数据接口索引：/api/meta.json
const fs = require('fs');
const path = require('path');
const api = 'public/api';
const snap = new Date().toISOString().slice(0, 10);
const meta = {
  name: 'DOAXVV 攻略站 · 数据接口',
  version: 1,
  source: 'doax.cc / 官方 Game Help / 社区攻略（来源见站点各页）',
  snapshot: snap,
  base: '/api/',
  serve: 'GitHub Pages 静态数据服务（前后端分离：前端只渲染，数据按需从此拉取）',
  endpoints: {},
  updated: new Date().toISOString()
};
for (const f of fs.readdirSync(api).filter((x) => x.endsWith('.json') && x !== 'meta.json')) {
  const j = JSON.parse(fs.readFileSync(path.join(api, f), 'utf8'));
  meta.endpoints['/api/' + f] = { count: Array.isArray(j) ? j.length : Object.keys(j).length };
}
const suits = path.join(api, 'suits');
if (fs.existsSync(suits)) meta.endpoints['/api/suits/{girl}.json'] = { count: fs.readdirSync(suits).filter((x) => x.endsWith('.json')).length };
fs.writeFileSync(path.join(api, 'meta.json'), JSON.stringify(meta, null, 2));
console.log('api meta endpoints=', Object.keys(meta.endpoints).length, 'snapshot=', snap);