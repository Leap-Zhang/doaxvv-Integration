export const base = import.meta.env.BASE_URL || '/';
export const asset = (p) => base + p.replace(/^\//, '');
