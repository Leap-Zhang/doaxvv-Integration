import { characters } from '../../data/characters.js';
import { baseStats } from '../../data/stats.js';
import { communityNotes } from '../../data/community-notes.js';
import { asset } from '../lib/asset.js';
import officialGirls from './official-girls.json';

export function deriveType(base) {
  if (!base) return '待补充';
  if (base.pow >= base.tec && base.pow >= base.stm) return '力量型';
  if (base.tec >= base.pow && base.tec >= base.stm) return '技巧型';
  return '体力型';
}

export const girls = characters.map((c) => {
  const base = baseStats[c.id] || null;
  const note = communityNotes[c.id] || {};
  return {
    ...c,
    base,
    note,
    official: officialGirls[c.id] || null,
    img: asset(`/img/bromide/girls/${c.id}.webp`),
    type: note.type || deriveType(base)
  };
});

export function getGirl(id) {
  return girls.find((g) => g.id === id);
}

export function girlIndex(id) {
  return girls.findIndex((g) => g.id === id);
}