// 图片已本地化：public/img/suits/<id>[_m].webp 与 public/img/portraits/<id>.webp
// 不再依赖 jsDelivr / wsrv 外链，浏览器直接加载站内文件。用 BASE_URL 兼容 GitHub Pages 子路径。
const base = typeof import.meta.env !== 'undefined' && import.meta.env.BASE_URL
  ? import.meta.env.BASE_URL
  : '/';
const withBase = (p) => base + p.replace(/^\//, '');

// 泳装图（正常 / 走形）。列表与弹窗共用 3:4 竖版本地 webp。
export const suitImage = (id, malf = false) =>
  withBase(`/img/suits/${id}${malf ? '_m' : ''}.webp`);

// 泳装缩略图与详情图同源，直接返回本地图。
export const suitThumb = (id, malf = false) => suitImage(id, malf);

// 女孩立绘（竖版 cover）。
export const portraitThumb = (id) => withBase(`/img/portraits/${id}.webp`);