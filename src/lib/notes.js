const KEY = 'doax_note';

function read() {
  try { return JSON.parse(localStorage.getItem(KEY)) || { girls: {}, suits: {} }; }
  catch (e) { return { girls: {}, suits: {} }; }
}
function write(d) { localStorage.setItem(KEY, JSON.stringify(d)); }

export function getNote(type, id) { return (read()[type] || {})[id] || ''; }
export function setNote(type, id, text) {
  const d = read(); d[type] = d[type] || {}; d[type][id] = text; write(d);
}
export function notesAll() { return read(); }
export function hasNote() {
  const d = read(); return Object.keys(d.girls || {}).length + Object.keys(d.suits || {}).length;
}
