// 泳装工具 + 详情弹层（纯客户端）
import { getNote, setNote } from './notes.js';
const SGKEY = { elena: 'helena', marierose: 'marie', megu: 'meg' };
const SSRGKEY = Object.fromEntries(Object.entries(SGKEY).map(([a, b]) => [b, a]));

export function girlSuitKey(girlId) {
  return SGKEY[girlId] || girlId;
}

export function suitName(s, lang) {
  return lang === 'en' ? (s.name_en || s.name) : lang === 'ja' ? (s.name_ja || s.name) : s.name;
}

export function girlDisplayName(girlKey, girlNames, lang) {
  const n = girlNames[girlKey];
  return n ? (n[lang] || n.zh) : girlKey;
}

export function buildSkillMap(skillData) {
  return Object.fromEntries(skillData.map((s) => [s.name_ja, {
    zh: s.name, en: s.name_en, ja: s.name_ja,
    zhe: s.effect, ene: s.effect_en, jae: s.effect_ja,
    pp: s.pp,
    property: s.property,
    type: s.type
  }]));
}

export function skillText(skillMap, name, lang) {
  const m = skillMap[name];
  if (!m) return { name, effect: '' };
  const nm = lang === 'en' ? (m.en || m.zh) : lang === 'ja' ? (m.ja || m.zh) : m.zh;
  const ef = lang === 'en' ? (m.ene || m.zhe) : lang === 'ja' ? (m.jae || m.zhe) : m.zhe;
  return { name: nm, effect: ef };
}

export function skillPropClass(p){ return ({ pow: 'chip-pow', tec: 'chip-tec', stm: 'chip-stm', apl: 'chip-apl' }[p] || 'badge-sand'); }

export function openSuitModal(suit, skillMap, lang, opts = {}) {
  const girlNames = opts.girlNames || {};
  const girlImg = opts.girlImg || {};
  const base = opts.base || '/';
  const shared = !(opts.girlNames && opts.girlNames[suit.girl]); const gn = shared ? '共享泳装' : girlDisplayName(suit.girl, girlNames, lang);
  const linkId = SSRGKEY[suit.girl] || suit.girl;

  const overlay = document.createElement('div');
  const backdrop = opts.img || girlImg[suit.girl] || '';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:120;display:flex;align-items:center;justify-content:center;padding:18px;';
  overlay.style.background = backdrop ? 'linear-gradient(rgba(15,24,38,.55),rgba(15,24,38,.62)), url(' + backdrop + ') center/cover' : 'rgba(15,24,38,.5)';
  const panel = document.createElement('div');
  panel.style.cssText = 'background:rgba(255,251,243,.62);border:1px solid rgba(224,138,106,.30);border-radius:20px;max-width:560px;width:100%;max-height:88vh;overflow:auto;padding:24px;position:relative;box-shadow:0 30px 70px rgba(0,0,0,.35);backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px);';

  const statRow = (l, v, c) => '<div class="flex justify-between border-b border-line py-1"><span>' + l + '</span><b class="' + (c || '') + '">' + v + '</b></div>';
  const skills = suit.skills && suit.skills.length
    ? suit.skills.map((k) => {
        const t = skillText(skillMap, k, lang);
        return '<div class="mt-2 rounded-lg bg-pool-50 p-3"><div class="flex items-center justify-between"><div class="font-semibold text-pool-700">' + t.name + '</div>' + ((skillMap[k] || {}).property ? '<span class="badge ' + skillPropClass((skillMap[k] || {}).property) + '">' + ((skillMap[k] || {}).property).toUpperCase() + '</span>' : '') + '</div>' + (t.effect ? '<div class="mt-1 text-sm text-ink-soft">' + t.effect + '</div>' : '') + '</div>';
      }).join('')
    : '<p class="mt-2 text-sm text-ink-soft">—</p>';

  panel.innerHTML =
    '<button class="suit-x" style="position:absolute;top:14px;right:14px;border:none;background:transparent;font-size:20px;cursor:pointer;color:#5a7288">×</button>' +
    '<div class="flex items-center gap-3">' +
      '<img src="' + (girlImg[suit.girl] || '') + '" alt="' + suitName(suit, lang) + '" class="h-16 w-16 rounded-xl object-cover" onerror="this.style.display=\'none\'" />' +
      '<div><h2 class="text-lg font-extrabold">' + suitName(suit, lang) + '</h2>' +
      '<div class="text-xs text-ink-soft">' + (suit.jp || '') + '</div>' +
      '<div class="mt-1">' + (shared ? '<span class="text-xs text-ink-soft">共享泳装</span>' : '<a class="text-xs font-semibold text-pool-600 no-underline hover:underline" href="' + base + 'girls/' + linkId + '/"> ' + gn + ' ↗</a>') + '</div></div>' +
      '<div style="margin-left:auto"><span class="badge badge-blush">' + (suit.type || '').toUpperCase() + '</span></div>' +
    '</div>' +

    '<div class="mt-4">' + statRow('POW', suit.pow, 'attr-pow') + statRow('TEC', suit.tec, 'attr-tec') + statRow('STM', suit.stm, 'attr-stm') + statRow('APL', suit.apl, 'attr-apl') + '</div>' +
    '<div class="mt-4 text-xs text-ink-soft">登场：' + suit.sell + (suit.resell && suit.resell !== 'N/A' ? '　复刻：' + suit.resell : '') + '</div>' +
    '<div class="mt-2 border-t border-line pt-2"><p class="text-xs font-semibold text-pool-600">' + (lang === 'en' ? 'Skills' : lang === 'ja' ? 'スキル' : '技能') + '</p>' + skills + '</div>';

  overlay.appendChild(panel);
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  const ta = panel.querySelector('.note-ta'); const key = suit.girl + ':' + suit.id; if (ta) { ta.value = getNote('suits', suit.id); ta.addEventListener('input', () => setNote('suits', suit.id, ta.value)); }
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', onKey);
  const close = () => { overlay.remove(); document.body.style.overflow = ''; document.removeEventListener('keydown', onKey); };
  panel.querySelector('.suit-x').addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
}