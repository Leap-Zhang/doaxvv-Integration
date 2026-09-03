const KEY = 'doax_fav';

function read() {
  try { return JSON.parse(localStorage.getItem(KEY)) || { girls: [], suits: [] }; }
  catch (e) { return { girls: [], suits: [] }; }
}
function write(d) { localStorage.setItem(KEY, JSON.stringify(d)); }

export function isFav(type, id) { return (read()[type] || []).includes(id); }
export function toggleFav(type, id) {
  const d = read(); const arr = d[type] = d[type] || [];
  const i = arr.indexOf(id);
  if (i >= 0) arr.splice(i, 1); else arr.push(id);
  write(d);
  return i < 0;
}
export function getFav() { return read(); }
