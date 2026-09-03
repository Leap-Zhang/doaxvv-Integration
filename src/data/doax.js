import girls from './doax-girls.json';

export const doaxGirls = girls;

export function getDoax(id) {
  return girls.find((g) => g.id === id) || null;
}
