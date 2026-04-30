var Xf = Object.defineProperty;
var Yf = (n, e, A) => e in n ? Xf(n, e, { enumerable: !0, configurable: !0, writable: !0, value: A }) : n[e] = A;
var eA = (n, e, A) => Yf(n, typeof e != "symbol" ? e + "" : e, A);
const Jf = "acha mimo", yU = "acha-mimo";
function oA(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function ji(n) {
  return oA(n).replace(/'/g, "&#39;");
}
const qf = /(https?:\/\/[^\s]+)/gi;
function Zf(n) {
  return /https?:\/\//i.test(n) ? n.split(qf).map((A, t) => {
    if (t % 2 === 1 && /^https?:\/\//i.test(A)) {
      const i = A.replace(/[)\].,;:!?]+$/u, ""), r = A.slice(i.length), s = jf(i);
      return `<a href="${ji(i)}" target="_blank" rel="noopener">${oA(s)}</a>${oA(r)}`;
    }
    return oA(A);
  }).join("") : oA(n);
}
function jf(n) {
  try {
    const e = new URL(n);
    return e.hostname === "lingua.ge" || e.hostname.endsWith(".lingua.ge") ? "Lingua.ge" : e.hostname.endsWith("wiktionary.org") ? "Wiktionary" : e.hostname.includes("archive.illc.uva.nl") ? "ILLC archive" : e.hostname.replace(/^www\./, "") || "Link";
  } catch {
    return "Link";
  }
}
function $f(n) {
  if (n instanceof Error) return n.message || n.name || "Error";
  if (typeof n == "string") return n;
  try {
    return JSON.stringify(n);
  } catch {
    return String(n);
  }
}
const ed = "0 0 52 44", SA = "currentColor", XA = 2;
function Ut(n) {
  return `<svg class="pd-spatial-icon__svg" viewBox="${ed}" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${n}</svg>`;
}
const Ad = Ut(
  `<path stroke="${SA}" stroke-width="${XA}" stroke-linecap="round" stroke-linejoin="round" d="M26 36V8M22 12l4-4 4 4"/>`
), td = Ut(
  `<path stroke="${SA}" stroke-width="${XA}" stroke-linecap="round" stroke-linejoin="round" d="M26 8v28M22 32l4 4 4-4"/>`
), nd = Ut(
  `<path stroke="${SA}" stroke-width="${XA}" stroke-linecap="round" stroke-linejoin="round" d="M8 22h32M34 18l4 4-4 4"/>`
), id = Ut(
  `<path stroke="${SA}" stroke-width="${XA}" stroke-linecap="round" stroke-linejoin="round" d="M44 22H12M18 18l-4 4 4 4"/>`
), rd = Ut(
  `<path stroke="${SA}" stroke-width="${XA}" stroke-linecap="round" stroke-linejoin="round" d="M8 34L26 10L41.6 30.8"/><polygon points="44,34 39.5,32.3 43.5,29.3" fill="${SA}"/>`
), sd = Ut(
  `<path stroke="${SA}" stroke-width="${XA}" stroke-linecap="round" stroke-linejoin="round" d="M10 22h32M14 18l-4 4 4 4M38 26l4-4-4-4"/>`
), ad = Ut(
  `<circle cx="30" cy="22" r="11" stroke="${SA}" stroke-width="${XA}"/><path stroke="${SA}" stroke-width="${XA}" stroke-linecap="round" stroke-linejoin="round" d="M5 22H18"/><polygon points="18,22 14,18 14,26" fill="${SA}"/>`
), od = Ut(
  `<circle cx="22" cy="22" r="11" stroke="${SA}" stroke-width="${XA}"/><path stroke="${SA}" stroke-width="${XA}" stroke-linecap="round" stroke-linejoin="round" d="M22 22h20"/><polygon points="42,22 38,18 38,26" fill="${SA}"/>`
), ld = Ut(
  `<circle cx="20" cy="22" r="11" stroke="${SA}" stroke-width="${XA}"/><path stroke="${SA}" stroke-width="${XA}" stroke-linecap="round" stroke-linejoin="round" d="M31 22h16"/><polygon points="47,22 43,18 43,26" fill="${SA}"/>`
), cd = Ut(
  `<circle cx="26" cy="18" r="10" stroke="${SA}" stroke-width="${XA}"/><path stroke="${SA}" stroke-width="${XA}" stroke-linecap="round" d="M10 34h32"/>`
), ud = [
  "a",
  "cha",
  "mi",
  "mo",
  "gada",
  "she",
  "ga",
  "tsa",
  "da"
], rh = [
  { id: "a", title: "ა-", gloss: "from down to up", icons: [Ad] },
  { id: "cha", title: "ჩა-", gloss: "from up to down", icons: [td] },
  {
    id: "mi",
    title: "მი-",
    gloss: "from speaker / listener (towards Alter Space)",
    icons: [nd]
  },
  { id: "mo", title: "მო-", gloss: "to speaker / listener (towards Ego Space)", icons: [id] },
  {
    id: "gada",
    title: "გადა-",
    gloss: "crossing obstacles; also frequenting / repeating (back-and-forth)",
    icons: [rd, sd]
  },
  { id: "she", title: "შე-", gloss: "from outside to inside", icons: [ad] },
  { id: "ga", title: "გა-", gloss: "from inside to outside", icons: [od] },
  { id: "tsa", title: "წა-", gloss: "from something / somebody (departure)", icons: [ld] },
  {
    id: "da",
    title: "და-",
    gloss: "above some space",
    icons: [cd]
  }
], hd = new Map(rh.map((n) => [n.id, n]));
function fd(n, e) {
  var i;
  const A = e.find((r) => r.id === n);
  if (!((i = A == null ? void 0 : A.spatialIconRowIds) != null && i.length)) return [];
  const t = [];
  for (const r of A.spatialIconRowIds) {
    const s = hd.get(r);
    s ? t.push(s) : console.warn(
      `[acha-mimo] Unknown spatialIconRowIds "${r}" for preverb "${n}". Valid: ${ud.join(", ")}`
    );
  }
  return t;
}
function dd(n, e) {
  if (!n)
    return '<div class="pd-icon-strip pd-icon-strip--empty"><span class="pd-icon-strip__placeholder">Select a preverb — spatial icons for that lemma appear here.</span></div>';
  const A = fd(n, e);
  if (!A.length) {
    const i = e.find((s) => s.id === n), r = (i == null ? void 0 : i.display) ?? n;
    return `<div class="pd-icon-strip pd-icon-strip--empty"><span class="pd-icon-strip__placeholder">${oA(
      r
    )} — no spatial icons configured for this preverb.</span></div>`;
  }
  return `<div class="pd-icon-strip pd-icon-strip--active" role="region" aria-label="Spatial icons for selected preverb">${A.map((i) => {
    const r = i.icons.map(
      (s) => `<span class="pd-icon-strip__cell" role="img" aria-label="${ji(i.title)}">${s}</span>`
    ).join("");
    return `<div class="pd-icon-strip__block"><span class="pd-icon-strip__lemma">${oA(i.title)}</span><div class="pd-icon-strip__graphics">${r}</div></div>`;
  }).join("")}</div>`;
}
function pd() {
  return `<div class="pd-icon-key">
    <h3>Spatial schematic icons key</h3>
    <p class="pd-icon-key__intro">Clicking a preverb will also display a 2D spatial icon in the bottom bar.</p>
    <ul class="pd-icon-key__list">${rh.map((e) => {
    const A = e.icons.map(
      (t) => `<span class="pd-spatial-icon__cell" role="img" aria-label="${ji(e.title + " " + e.gloss)}">${t}</span>`
    ).join("");
    return `<li class="pd-spatial-icon__row" data-preverb-id="${ji(e.id)}">
      <div class="pd-spatial-icon__text"><strong class="pd-spatial-icon__lemma">${oA(e.title)}</strong> <span class="pd-spatial-icon__gloss">${oA(e.gloss)}</span></div>
      <div class="pd-spatial-icon__graphics">${A}</div>
    </li>`;
  }).join("")}</ul>
  </div>`;
}
/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
const ml = "172", ui = { ROTATE: 0, DOLLY: 1, PAN: 2 }, oi = { ROTATE: 0, PAN: 1, DOLLY_PAN: 2, DOLLY_ROTATE: 3 }, gd = 0, Kl = 1, md = 2, sh = 1, Bd = 2, Dt = 3, ln = 0, zA = 1, gt = 2, rn = 0, hi = 1, zl = 2, Wl = 3, Xl = 4, wd = 5, xn = 100, _d = 101, vd = 102, Cd = 103, Ed = 104, xd = 200, Ud = 201, yd = 202, Sd = 203, ro = 204, so = 205, Md = 206, Fd = 207, bd = 208, Td = 209, Qd = 210, Id = 211, Rd = 212, Ld = 213, Dd = 214, ao = 0, oo = 1, lo = 2, mi = 3, co = 4, uo = 5, ho = 6, fo = 7, ah = 0, Hd = 1, Pd = 2, sn = 0, Nd = 1, Od = 2, Gd = 3, Vd = 4, kd = 5, Kd = 6, zd = 7, oh = 300, Bi = 301, wi = 302, po = 303, go = 304, Ns = 306, mo = 1e3, Sn = 1001, Bo = 1002, Bt = 1003, Wd = 1004, hr = 1005, Et = 1006, Aa = 1007, Mn = 1008, Gt = 1009, lh = 1010, ch = 1011, $i = 1012, Bl = 1013, Qn = 1014, Ht = 1015, nr = 1016, wl = 1017, _l = 1018, _i = 1020, uh = 35902, hh = 1021, fh = 1022, mt = 1023, dh = 1024, ph = 1025, fi = 1026, vi = 1027, gh = 1028, vl = 1029, mh = 1030, Cl = 1031, El = 1033, fs = 33776, ds = 33777, ps = 33778, gs = 33779, wo = 35840, _o = 35841, vo = 35842, Co = 35843, Eo = 36196, xo = 37492, Uo = 37496, yo = 37808, So = 37809, Mo = 37810, Fo = 37811, bo = 37812, To = 37813, Qo = 37814, Io = 37815, Ro = 37816, Lo = 37817, Do = 37818, Ho = 37819, Po = 37820, No = 37821, ms = 36492, Oo = 36494, Go = 36495, Bh = 36283, Vo = 36284, ko = 36285, Ko = 36286, Xd = 3200, Yd = 3201, Jd = 0, qd = 1, en = "", it = "srgb", Ci = "srgb-linear", Es = "linear", tA = "srgb", Pn = 7680, Yl = 519, Zd = 512, jd = 513, $d = 514, wh = 515, ep = 516, Ap = 517, tp = 518, np = 519, Jl = 35044, ql = "300 es", Pt = 2e3, xs = 2001;
class Dn {
  addEventListener(e, A) {
    this._listeners === void 0 && (this._listeners = {});
    const t = this._listeners;
    t[e] === void 0 && (t[e] = []), t[e].indexOf(A) === -1 && t[e].push(A);
  }
  hasEventListener(e, A) {
    if (this._listeners === void 0) return !1;
    const t = this._listeners;
    return t[e] !== void 0 && t[e].indexOf(A) !== -1;
  }
  removeEventListener(e, A) {
    if (this._listeners === void 0) return;
    const i = this._listeners[e];
    if (i !== void 0) {
      const r = i.indexOf(A);
      r !== -1 && i.splice(r, 1);
    }
  }
  dispatchEvent(e) {
    if (this._listeners === void 0) return;
    const t = this._listeners[e.type];
    if (t !== void 0) {
      e.target = this;
      const i = t.slice(0);
      for (let r = 0, s = i.length; r < s; r++)
        i[r].call(this, e);
      e.target = null;
    }
  }
}
const RA = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"], Wi = Math.PI / 180, zo = 180 / Math.PI;
function ir() {
  const n = Math.random() * 4294967295 | 0, e = Math.random() * 4294967295 | 0, A = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0;
  return (RA[n & 255] + RA[n >> 8 & 255] + RA[n >> 16 & 255] + RA[n >> 24 & 255] + "-" + RA[e & 255] + RA[e >> 8 & 255] + "-" + RA[e >> 16 & 15 | 64] + RA[e >> 24 & 255] + "-" + RA[A & 63 | 128] + RA[A >> 8 & 255] + "-" + RA[A >> 16 & 255] + RA[A >> 24 & 255] + RA[t & 255] + RA[t >> 8 & 255] + RA[t >> 16 & 255] + RA[t >> 24 & 255]).toLowerCase();
}
function ke(n, e, A) {
  return Math.max(e, Math.min(A, n));
}
function ip(n, e) {
  return (n % e + e) % e;
}
function ta(n, e, A) {
  return (1 - A) * n + A * e;
}
function Mi(n, e) {
  switch (e.constructor) {
    case Float32Array:
      return n;
    case Uint32Array:
      return n / 4294967295;
    case Uint16Array:
      return n / 65535;
    case Uint8Array:
      return n / 255;
    case Int32Array:
      return Math.max(n / 2147483647, -1);
    case Int16Array:
      return Math.max(n / 32767, -1);
    case Int8Array:
      return Math.max(n / 127, -1);
    default:
      throw new Error("Invalid component type.");
  }
}
function VA(n, e) {
  switch (e.constructor) {
    case Float32Array:
      return n;
    case Uint32Array:
      return Math.round(n * 4294967295);
    case Uint16Array:
      return Math.round(n * 65535);
    case Uint8Array:
      return Math.round(n * 255);
    case Int32Array:
      return Math.round(n * 2147483647);
    case Int16Array:
      return Math.round(n * 32767);
    case Int8Array:
      return Math.round(n * 127);
    default:
      throw new Error("Invalid component type.");
  }
}
const rp = {
  DEG2RAD: Wi
};
class Pe {
  constructor(e = 0, A = 0) {
    Pe.prototype.isVector2 = !0, this.x = e, this.y = A;
  }
  get width() {
    return this.x;
  }
  set width(e) {
    this.x = e;
  }
  get height() {
    return this.y;
  }
  set height(e) {
    this.y = e;
  }
  set(e, A) {
    return this.x = e, this.y = A, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setComponent(e, A) {
    switch (e) {
      case 0:
        this.x = A;
        break;
      case 1:
        this.y = A;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this;
  }
  addVectors(e, A) {
    return this.x = e.x + A.x, this.y = e.y + A.y, this;
  }
  addScaledVector(e, A) {
    return this.x += e.x * A, this.y += e.y * A, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this;
  }
  subVectors(e, A) {
    return this.x = e.x - A.x, this.y = e.y - A.y, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this;
  }
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  applyMatrix3(e) {
    const A = this.x, t = this.y, i = e.elements;
    return this.x = i[0] * A + i[3] * t + i[6], this.y = i[1] * A + i[4] * t + i[7], this;
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this;
  }
  clamp(e, A) {
    return this.x = ke(this.x, e.x, A.x), this.y = ke(this.y, e.y, A.y), this;
  }
  clampScalar(e, A) {
    return this.x = ke(this.x, e, A), this.y = ke(this.y, e, A), this;
  }
  clampLength(e, A) {
    const t = this.length();
    return this.divideScalar(t || 1).multiplyScalar(ke(t, e, A));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y;
  }
  cross(e) {
    return this.x * e.y - this.y * e.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  angleTo(e) {
    const A = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (A === 0) return Math.PI / 2;
    const t = this.dot(e) / A;
    return Math.acos(ke(t, -1, 1));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    const A = this.x - e.x, t = this.y - e.y;
    return A * A + t * t;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, A) {
    return this.x += (e.x - this.x) * A, this.y += (e.y - this.y) * A, this;
  }
  lerpVectors(e, A, t) {
    return this.x = e.x + (A.x - e.x) * t, this.y = e.y + (A.y - e.y) * t, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y;
  }
  fromArray(e, A = 0) {
    return this.x = e[A], this.y = e[A + 1], this;
  }
  toArray(e = [], A = 0) {
    return e[A] = this.x, e[A + 1] = this.y, e;
  }
  fromBufferAttribute(e, A) {
    return this.x = e.getX(A), this.y = e.getY(A), this;
  }
  rotateAround(e, A) {
    const t = Math.cos(A), i = Math.sin(A), r = this.x - e.x, s = this.y - e.y;
    return this.x = r * t - s * i + e.x, this.y = r * i + s * t + e.y, this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
}
class He {
  constructor(e, A, t, i, r, s, a, o, l) {
    He.prototype.isMatrix3 = !0, this.elements = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ], e !== void 0 && this.set(e, A, t, i, r, s, a, o, l);
  }
  set(e, A, t, i, r, s, a, o, l) {
    const c = this.elements;
    return c[0] = e, c[1] = i, c[2] = a, c[3] = A, c[4] = r, c[5] = o, c[6] = t, c[7] = s, c[8] = l, this;
  }
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ), this;
  }
  copy(e) {
    const A = this.elements, t = e.elements;
    return A[0] = t[0], A[1] = t[1], A[2] = t[2], A[3] = t[3], A[4] = t[4], A[5] = t[5], A[6] = t[6], A[7] = t[7], A[8] = t[8], this;
  }
  extractBasis(e, A, t) {
    return e.setFromMatrix3Column(this, 0), A.setFromMatrix3Column(this, 1), t.setFromMatrix3Column(this, 2), this;
  }
  setFromMatrix4(e) {
    const A = e.elements;
    return this.set(
      A[0],
      A[4],
      A[8],
      A[1],
      A[5],
      A[9],
      A[2],
      A[6],
      A[10]
    ), this;
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, A) {
    const t = e.elements, i = A.elements, r = this.elements, s = t[0], a = t[3], o = t[6], l = t[1], c = t[4], u = t[7], f = t[2], d = t[5], g = t[8], m = i[0], p = i[3], h = i[6], E = i[1], U = i[4], B = i[7], S = i[2], x = i[5], M = i[8];
    return r[0] = s * m + a * E + o * S, r[3] = s * p + a * U + o * x, r[6] = s * h + a * B + o * M, r[1] = l * m + c * E + u * S, r[4] = l * p + c * U + u * x, r[7] = l * h + c * B + u * M, r[2] = f * m + d * E + g * S, r[5] = f * p + d * U + g * x, r[8] = f * h + d * B + g * M, this;
  }
  multiplyScalar(e) {
    const A = this.elements;
    return A[0] *= e, A[3] *= e, A[6] *= e, A[1] *= e, A[4] *= e, A[7] *= e, A[2] *= e, A[5] *= e, A[8] *= e, this;
  }
  determinant() {
    const e = this.elements, A = e[0], t = e[1], i = e[2], r = e[3], s = e[4], a = e[5], o = e[6], l = e[7], c = e[8];
    return A * s * c - A * a * l - t * r * c + t * a * o + i * r * l - i * s * o;
  }
  invert() {
    const e = this.elements, A = e[0], t = e[1], i = e[2], r = e[3], s = e[4], a = e[5], o = e[6], l = e[7], c = e[8], u = c * s - a * l, f = a * o - c * r, d = l * r - s * o, g = A * u + t * f + i * d;
    if (g === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const m = 1 / g;
    return e[0] = u * m, e[1] = (i * l - c * t) * m, e[2] = (a * t - i * s) * m, e[3] = f * m, e[4] = (c * A - i * o) * m, e[5] = (i * r - a * A) * m, e[6] = d * m, e[7] = (t * o - l * A) * m, e[8] = (s * A - t * r) * m, this;
  }
  transpose() {
    let e;
    const A = this.elements;
    return e = A[1], A[1] = A[3], A[3] = e, e = A[2], A[2] = A[6], A[6] = e, e = A[5], A[5] = A[7], A[7] = e, this;
  }
  getNormalMatrix(e) {
    return this.setFromMatrix4(e).invert().transpose();
  }
  transposeIntoArray(e) {
    const A = this.elements;
    return e[0] = A[0], e[1] = A[3], e[2] = A[6], e[3] = A[1], e[4] = A[4], e[5] = A[7], e[6] = A[2], e[7] = A[5], e[8] = A[8], this;
  }
  setUvTransform(e, A, t, i, r, s, a) {
    const o = Math.cos(r), l = Math.sin(r);
    return this.set(
      t * o,
      t * l,
      -t * (o * s + l * a) + s + e,
      -i * l,
      i * o,
      -i * (-l * s + o * a) + a + A,
      0,
      0,
      1
    ), this;
  }
  //
  scale(e, A) {
    return this.premultiply(na.makeScale(e, A)), this;
  }
  rotate(e) {
    return this.premultiply(na.makeRotation(-e)), this;
  }
  translate(e, A) {
    return this.premultiply(na.makeTranslation(e, A)), this;
  }
  // for 2D Transforms
  makeTranslation(e, A) {
    return e.isVector2 ? this.set(
      1,
      0,
      e.x,
      0,
      1,
      e.y,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      e,
      0,
      1,
      A,
      0,
      0,
      1
    ), this;
  }
  makeRotation(e) {
    const A = Math.cos(e), t = Math.sin(e);
    return this.set(
      A,
      -t,
      0,
      t,
      A,
      0,
      0,
      0,
      1
    ), this;
  }
  makeScale(e, A) {
    return this.set(
      e,
      0,
      0,
      0,
      A,
      0,
      0,
      0,
      1
    ), this;
  }
  //
  equals(e) {
    const A = this.elements, t = e.elements;
    for (let i = 0; i < 9; i++)
      if (A[i] !== t[i]) return !1;
    return !0;
  }
  fromArray(e, A = 0) {
    for (let t = 0; t < 9; t++)
      this.elements[t] = e[t + A];
    return this;
  }
  toArray(e = [], A = 0) {
    const t = this.elements;
    return e[A] = t[0], e[A + 1] = t[1], e[A + 2] = t[2], e[A + 3] = t[3], e[A + 4] = t[4], e[A + 5] = t[5], e[A + 6] = t[6], e[A + 7] = t[7], e[A + 8] = t[8], e;
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}
const na = /* @__PURE__ */ new He();
function _h(n) {
  for (let e = n.length - 1; e >= 0; --e)
    if (n[e] >= 65535) return !0;
  return !1;
}
function Us(n) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", n);
}
function sp() {
  const n = Us("canvas");
  return n.style.display = "block", n;
}
const Zl = {};
function ri(n) {
  n in Zl || (Zl[n] = !0, console.warn(n));
}
function ap(n, e, A) {
  return new Promise(function(t, i) {
    function r() {
      switch (n.clientWaitSync(e, n.SYNC_FLUSH_COMMANDS_BIT, 0)) {
        case n.WAIT_FAILED:
          i();
          break;
        case n.TIMEOUT_EXPIRED:
          setTimeout(r, A);
          break;
        default:
          t();
      }
    }
    setTimeout(r, A);
  });
}
function op(n) {
  const e = n.elements;
  e[2] = 0.5 * e[2] + 0.5 * e[3], e[6] = 0.5 * e[6] + 0.5 * e[7], e[10] = 0.5 * e[10] + 0.5 * e[11], e[14] = 0.5 * e[14] + 0.5 * e[15];
}
function lp(n) {
  const e = n.elements;
  e[11] === -1 ? (e[10] = -e[10] - 1, e[14] = -e[14]) : (e[10] = -e[10], e[14] = -e[14] + 1);
}
const jl = /* @__PURE__ */ new He().set(
  0.4123908,
  0.3575843,
  0.1804808,
  0.212639,
  0.7151687,
  0.0721923,
  0.0193308,
  0.1191948,
  0.9505322
), $l = /* @__PURE__ */ new He().set(
  3.2409699,
  -1.5373832,
  -0.4986108,
  -0.9692436,
  1.8759675,
  0.0415551,
  0.0556301,
  -0.203977,
  1.0569715
);
function cp() {
  const n = {
    enabled: !0,
    workingColorSpace: Ci,
    /**
     * Implementations of supported color spaces.
     *
     * Required:
     *	- primaries: chromaticity coordinates [ rx ry gx gy bx by ]
     *	- whitePoint: reference white [ x y ]
     *	- transfer: transfer function (pre-defined)
     *	- toXYZ: Matrix3 RGB to XYZ transform
     *	- fromXYZ: Matrix3 XYZ to RGB transform
     *	- luminanceCoefficients: RGB luminance coefficients
     *
     * Optional:
     *  - outputColorSpaceConfig: { drawingBufferColorSpace: ColorSpace }
     *  - workingColorSpaceConfig: { unpackColorSpace: ColorSpace }
     *
     * Reference:
     * - https://www.russellcottrell.com/photo/matrixCalculator.htm
     */
    spaces: {},
    convert: function(i, r, s) {
      return this.enabled === !1 || r === s || !r || !s || (this.spaces[r].transfer === tA && (i.r = Nt(i.r), i.g = Nt(i.g), i.b = Nt(i.b)), this.spaces[r].primaries !== this.spaces[s].primaries && (i.applyMatrix3(this.spaces[r].toXYZ), i.applyMatrix3(this.spaces[s].fromXYZ)), this.spaces[s].transfer === tA && (i.r = di(i.r), i.g = di(i.g), i.b = di(i.b))), i;
    },
    fromWorkingColorSpace: function(i, r) {
      return this.convert(i, this.workingColorSpace, r);
    },
    toWorkingColorSpace: function(i, r) {
      return this.convert(i, r, this.workingColorSpace);
    },
    getPrimaries: function(i) {
      return this.spaces[i].primaries;
    },
    getTransfer: function(i) {
      return i === en ? Es : this.spaces[i].transfer;
    },
    getLuminanceCoefficients: function(i, r = this.workingColorSpace) {
      return i.fromArray(this.spaces[r].luminanceCoefficients);
    },
    define: function(i) {
      Object.assign(this.spaces, i);
    },
    // Internal APIs
    _getMatrix: function(i, r, s) {
      return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[s].fromXYZ);
    },
    _getDrawingBufferColorSpace: function(i) {
      return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace;
    },
    _getUnpackColorSpace: function(i = this.workingColorSpace) {
      return this.spaces[i].workingColorSpaceConfig.unpackColorSpace;
    }
  }, e = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06], A = [0.2126, 0.7152, 0.0722], t = [0.3127, 0.329];
  return n.define({
    [Ci]: {
      primaries: e,
      whitePoint: t,
      transfer: Es,
      toXYZ: jl,
      fromXYZ: $l,
      luminanceCoefficients: A,
      workingColorSpaceConfig: { unpackColorSpace: it },
      outputColorSpaceConfig: { drawingBufferColorSpace: it }
    },
    [it]: {
      primaries: e,
      whitePoint: t,
      transfer: tA,
      toXYZ: jl,
      fromXYZ: $l,
      luminanceCoefficients: A,
      outputColorSpaceConfig: { drawingBufferColorSpace: it }
    }
  }), n;
}
const Xe = /* @__PURE__ */ cp();
function Nt(n) {
  return n < 0.04045 ? n * 0.0773993808 : Math.pow(n * 0.9478672986 + 0.0521327014, 2.4);
}
function di(n) {
  return n < 31308e-7 ? n * 12.92 : 1.055 * Math.pow(n, 0.41666) - 0.055;
}
let Nn;
class up {
  static getDataURL(e) {
    if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u")
      return e.src;
    let A;
    if (e instanceof HTMLCanvasElement)
      A = e;
    else {
      Nn === void 0 && (Nn = Us("canvas")), Nn.width = e.width, Nn.height = e.height;
      const t = Nn.getContext("2d");
      e instanceof ImageData ? t.putImageData(e, 0, 0) : t.drawImage(e, 0, 0, e.width, e.height), A = Nn;
    }
    return A.width > 2048 || A.height > 2048 ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", e), A.toDataURL("image/jpeg", 0.6)) : A.toDataURL("image/png");
  }
  static sRGBToLinear(e) {
    if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap) {
      const A = Us("canvas");
      A.width = e.width, A.height = e.height;
      const t = A.getContext("2d");
      t.drawImage(e, 0, 0, e.width, e.height);
      const i = t.getImageData(0, 0, e.width, e.height), r = i.data;
      for (let s = 0; s < r.length; s++)
        r[s] = Nt(r[s] / 255) * 255;
      return t.putImageData(i, 0, 0), A;
    } else if (e.data) {
      const A = e.data.slice(0);
      for (let t = 0; t < A.length; t++)
        A instanceof Uint8Array || A instanceof Uint8ClampedArray ? A[t] = Math.floor(Nt(A[t] / 255) * 255) : A[t] = Nt(A[t]);
      return {
        data: A,
        width: e.width,
        height: e.height
      };
    } else
      return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e;
  }
}
let hp = 0;
class vh {
  constructor(e = null) {
    this.isSource = !0, Object.defineProperty(this, "id", { value: hp++ }), this.uuid = ir(), this.data = e, this.dataReady = !0, this.version = 0;
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  toJSON(e) {
    const A = e === void 0 || typeof e == "string";
    if (!A && e.images[this.uuid] !== void 0)
      return e.images[this.uuid];
    const t = {
      uuid: this.uuid,
      url: ""
    }, i = this.data;
    if (i !== null) {
      let r;
      if (Array.isArray(i)) {
        r = [];
        for (let s = 0, a = i.length; s < a; s++)
          i[s].isDataTexture ? r.push(ia(i[s].image)) : r.push(ia(i[s]));
      } else
        r = ia(i);
      t.url = r;
    }
    return A || (e.images[this.uuid] = t), t;
  }
}
function ia(n) {
  return typeof HTMLImageElement < "u" && n instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && n instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && n instanceof ImageBitmap ? up.getDataURL(n) : n.data ? {
    data: Array.from(n.data),
    width: n.width,
    height: n.height,
    type: n.data.constructor.name
  } : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
}
let fp = 0;
class WA extends Dn {
  constructor(e = WA.DEFAULT_IMAGE, A = WA.DEFAULT_MAPPING, t = Sn, i = Sn, r = Et, s = Mn, a = mt, o = Gt, l = WA.DEFAULT_ANISOTROPY, c = en) {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: fp++ }), this.uuid = ir(), this.name = "", this.source = new vh(e), this.mipmaps = [], this.mapping = A, this.channel = 0, this.wrapS = t, this.wrapT = i, this.magFilter = r, this.minFilter = s, this.anisotropy = l, this.format = a, this.internalFormat = null, this.type = o, this.offset = new Pe(0, 0), this.repeat = new Pe(1, 1), this.center = new Pe(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new He(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = c, this.userData = {}, this.version = 0, this.onUpdate = null, this.renderTarget = null, this.isRenderTargetTexture = !1, this.pmremVersion = 0;
  }
  get image() {
    return this.source.data;
  }
  set image(e = null) {
    this.source.data = e;
  }
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.name = e.name, this.source = e.source, this.mipmaps = e.mipmaps.slice(0), this.mapping = e.mapping, this.channel = e.channel, this.wrapS = e.wrapS, this.wrapT = e.wrapT, this.magFilter = e.magFilter, this.minFilter = e.minFilter, this.anisotropy = e.anisotropy, this.format = e.format, this.internalFormat = e.internalFormat, this.type = e.type, this.offset.copy(e.offset), this.repeat.copy(e.repeat), this.center.copy(e.center), this.rotation = e.rotation, this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrix.copy(e.matrix), this.generateMipmaps = e.generateMipmaps, this.premultiplyAlpha = e.premultiplyAlpha, this.flipY = e.flipY, this.unpackAlignment = e.unpackAlignment, this.colorSpace = e.colorSpace, this.renderTarget = e.renderTarget, this.isRenderTargetTexture = e.isRenderTargetTexture, this.userData = JSON.parse(JSON.stringify(e.userData)), this.needsUpdate = !0, this;
  }
  toJSON(e) {
    const A = e === void 0 || typeof e == "string";
    if (!A && e.textures[this.uuid] !== void 0)
      return e.textures[this.uuid];
    const t = {
      metadata: {
        version: 4.6,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(e).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment
    };
    return Object.keys(this.userData).length > 0 && (t.userData = this.userData), A || (e.textures[this.uuid] = t), t;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  transformUv(e) {
    if (this.mapping !== oh) return e;
    if (e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1)
      switch (this.wrapS) {
        case mo:
          e.x = e.x - Math.floor(e.x);
          break;
        case Sn:
          e.x = e.x < 0 ? 0 : 1;
          break;
        case Bo:
          Math.abs(Math.floor(e.x) % 2) === 1 ? e.x = Math.ceil(e.x) - e.x : e.x = e.x - Math.floor(e.x);
          break;
      }
    if (e.y < 0 || e.y > 1)
      switch (this.wrapT) {
        case mo:
          e.y = e.y - Math.floor(e.y);
          break;
        case Sn:
          e.y = e.y < 0 ? 0 : 1;
          break;
        case Bo:
          Math.abs(Math.floor(e.y) % 2) === 1 ? e.y = Math.ceil(e.y) - e.y : e.y = e.y - Math.floor(e.y);
          break;
      }
    return this.flipY && (e.y = 1 - e.y), e;
  }
  set needsUpdate(e) {
    e === !0 && (this.version++, this.source.needsUpdate = !0);
  }
  set needsPMREMUpdate(e) {
    e === !0 && this.pmremVersion++;
  }
}
WA.DEFAULT_IMAGE = null;
WA.DEFAULT_MAPPING = oh;
WA.DEFAULT_ANISOTROPY = 1;
class mA {
  constructor(e = 0, A = 0, t = 0, i = 1) {
    mA.prototype.isVector4 = !0, this.x = e, this.y = A, this.z = t, this.w = i;
  }
  get width() {
    return this.z;
  }
  set width(e) {
    this.z = e;
  }
  get height() {
    return this.w;
  }
  set height(e) {
    this.w = e;
  }
  set(e, A, t, i) {
    return this.x = e, this.y = A, this.z = t, this.w = i, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this.w = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setZ(e) {
    return this.z = e, this;
  }
  setW(e) {
    return this.w = e, this;
  }
  setComponent(e, A) {
    switch (e) {
      case 0:
        this.x = A;
        break;
      case 1:
        this.y = A;
        break;
      case 2:
        this.z = A;
        break;
      case 3:
        this.w = A;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this.w = e.w !== void 0 ? e.w : 1, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this.w += e, this;
  }
  addVectors(e, A) {
    return this.x = e.x + A.x, this.y = e.y + A.y, this.z = e.z + A.z, this.w = e.w + A.w, this;
  }
  addScaledVector(e, A) {
    return this.x += e.x * A, this.y += e.y * A, this.z += e.z * A, this.w += e.w * A, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this.w -= e, this;
  }
  subVectors(e, A) {
    return this.x = e.x - A.x, this.y = e.y - A.y, this.z = e.z - A.z, this.w = e.w - A.w, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this.w *= e.w, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this;
  }
  applyMatrix4(e) {
    const A = this.x, t = this.y, i = this.z, r = this.w, s = e.elements;
    return this.x = s[0] * A + s[4] * t + s[8] * i + s[12] * r, this.y = s[1] * A + s[5] * t + s[9] * i + s[13] * r, this.z = s[2] * A + s[6] * t + s[10] * i + s[14] * r, this.w = s[3] * A + s[7] * t + s[11] * i + s[15] * r, this;
  }
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this.z /= e.z, this.w /= e.w, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  setAxisAngleFromQuaternion(e) {
    this.w = 2 * Math.acos(e.w);
    const A = Math.sqrt(1 - e.w * e.w);
    return A < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e.x / A, this.y = e.y / A, this.z = e.z / A), this;
  }
  setAxisAngleFromRotationMatrix(e) {
    let A, t, i, r;
    const o = e.elements, l = o[0], c = o[4], u = o[8], f = o[1], d = o[5], g = o[9], m = o[2], p = o[6], h = o[10];
    if (Math.abs(c - f) < 0.01 && Math.abs(u - m) < 0.01 && Math.abs(g - p) < 0.01) {
      if (Math.abs(c + f) < 0.1 && Math.abs(u + m) < 0.1 && Math.abs(g + p) < 0.1 && Math.abs(l + d + h - 3) < 0.1)
        return this.set(1, 0, 0, 0), this;
      A = Math.PI;
      const U = (l + 1) / 2, B = (d + 1) / 2, S = (h + 1) / 2, x = (c + f) / 4, M = (u + m) / 4, F = (g + p) / 4;
      return U > B && U > S ? U < 0.01 ? (t = 0, i = 0.707106781, r = 0.707106781) : (t = Math.sqrt(U), i = x / t, r = M / t) : B > S ? B < 0.01 ? (t = 0.707106781, i = 0, r = 0.707106781) : (i = Math.sqrt(B), t = x / i, r = F / i) : S < 0.01 ? (t = 0.707106781, i = 0.707106781, r = 0) : (r = Math.sqrt(S), t = M / r, i = F / r), this.set(t, i, r, A), this;
    }
    let E = Math.sqrt((p - g) * (p - g) + (u - m) * (u - m) + (f - c) * (f - c));
    return Math.abs(E) < 1e-3 && (E = 1), this.x = (p - g) / E, this.y = (u - m) / E, this.z = (f - c) / E, this.w = Math.acos((l + d + h - 1) / 2), this;
  }
  setFromMatrixPosition(e) {
    const A = e.elements;
    return this.x = A[12], this.y = A[13], this.z = A[14], this.w = A[15], this;
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this.w = Math.min(this.w, e.w), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this.w = Math.max(this.w, e.w), this;
  }
  clamp(e, A) {
    return this.x = ke(this.x, e.x, A.x), this.y = ke(this.y, e.y, A.y), this.z = ke(this.z, e.z, A.z), this.w = ke(this.w, e.w, A.w), this;
  }
  clampScalar(e, A) {
    return this.x = ke(this.x, e, A), this.y = ke(this.y, e, A), this.z = ke(this.z, e, A), this.w = ke(this.w, e, A), this;
  }
  clampLength(e, A) {
    const t = this.length();
    return this.divideScalar(t || 1).multiplyScalar(ke(t, e, A));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, A) {
    return this.x += (e.x - this.x) * A, this.y += (e.y - this.y) * A, this.z += (e.z - this.z) * A, this.w += (e.w - this.w) * A, this;
  }
  lerpVectors(e, A, t) {
    return this.x = e.x + (A.x - e.x) * t, this.y = e.y + (A.y - e.y) * t, this.z = e.z + (A.z - e.z) * t, this.w = e.w + (A.w - e.w) * t, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w;
  }
  fromArray(e, A = 0) {
    return this.x = e[A], this.y = e[A + 1], this.z = e[A + 2], this.w = e[A + 3], this;
  }
  toArray(e = [], A = 0) {
    return e[A] = this.x, e[A + 1] = this.y, e[A + 2] = this.z, e[A + 3] = this.w, e;
  }
  fromBufferAttribute(e, A) {
    return this.x = e.getX(A), this.y = e.getY(A), this.z = e.getZ(A), this.w = e.getW(A), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
}
class dp extends Dn {
  constructor(e = 1, A = 1, t = {}) {
    super(), this.isRenderTarget = !0, this.width = e, this.height = A, this.depth = 1, this.scissor = new mA(0, 0, e, A), this.scissorTest = !1, this.viewport = new mA(0, 0, e, A);
    const i = { width: e, height: A, depth: 1 };
    t = Object.assign({
      generateMipmaps: !1,
      internalFormat: null,
      minFilter: Et,
      depthBuffer: !0,
      stencilBuffer: !1,
      resolveDepthBuffer: !0,
      resolveStencilBuffer: !0,
      depthTexture: null,
      samples: 0,
      count: 1
    }, t);
    const r = new WA(i, t.mapping, t.wrapS, t.wrapT, t.magFilter, t.minFilter, t.format, t.type, t.anisotropy, t.colorSpace);
    r.flipY = !1, r.generateMipmaps = t.generateMipmaps, r.internalFormat = t.internalFormat, this.textures = [];
    const s = t.count;
    for (let a = 0; a < s; a++)
      this.textures[a] = r.clone(), this.textures[a].isRenderTargetTexture = !0, this.textures[a].renderTarget = this;
    this.depthBuffer = t.depthBuffer, this.stencilBuffer = t.stencilBuffer, this.resolveDepthBuffer = t.resolveDepthBuffer, this.resolveStencilBuffer = t.resolveStencilBuffer, this._depthTexture = null, this.depthTexture = t.depthTexture, this.samples = t.samples;
  }
  get texture() {
    return this.textures[0];
  }
  set texture(e) {
    this.textures[0] = e;
  }
  set depthTexture(e) {
    this._depthTexture !== null && (this._depthTexture.renderTarget = null), e !== null && (e.renderTarget = this), this._depthTexture = e;
  }
  get depthTexture() {
    return this._depthTexture;
  }
  setSize(e, A, t = 1) {
    if (this.width !== e || this.height !== A || this.depth !== t) {
      this.width = e, this.height = A, this.depth = t;
      for (let i = 0, r = this.textures.length; i < r; i++)
        this.textures[i].image.width = e, this.textures[i].image.height = A, this.textures[i].image.depth = t;
      this.dispose();
    }
    this.viewport.set(0, 0, e, A), this.scissor.set(0, 0, e, A);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.width = e.width, this.height = e.height, this.depth = e.depth, this.scissor.copy(e.scissor), this.scissorTest = e.scissorTest, this.viewport.copy(e.viewport), this.textures.length = 0;
    for (let t = 0, i = e.textures.length; t < i; t++)
      this.textures[t] = e.textures[t].clone(), this.textures[t].isRenderTargetTexture = !0, this.textures[t].renderTarget = this;
    const A = Object.assign({}, e.texture.image);
    return this.texture.source = new vh(A), this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.resolveDepthBuffer = e.resolveDepthBuffer, this.resolveStencilBuffer = e.resolveStencilBuffer, e.depthTexture !== null && (this.depthTexture = e.depthTexture.clone()), this.samples = e.samples, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class In extends dp {
  constructor(e = 1, A = 1, t = {}) {
    super(e, A, t), this.isWebGLRenderTarget = !0;
  }
}
class Ch extends WA {
  constructor(e = null, A = 1, t = 1, i = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = { data: e, width: A, height: t, depth: i }, this.magFilter = Bt, this.minFilter = Bt, this.wrapR = Sn, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
  }
  addLayerUpdate(e) {
    this.layerUpdates.add(e);
  }
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}
class pp extends WA {
  constructor(e = null, A = 1, t = 1, i = 1) {
    super(null), this.isData3DTexture = !0, this.image = { data: e, width: A, height: t, depth: i }, this.magFilter = Bt, this.minFilter = Bt, this.wrapR = Sn, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
class Rn {
  constructor(e = 0, A = 0, t = 0, i = 1) {
    this.isQuaternion = !0, this._x = e, this._y = A, this._z = t, this._w = i;
  }
  static slerpFlat(e, A, t, i, r, s, a) {
    let o = t[i + 0], l = t[i + 1], c = t[i + 2], u = t[i + 3];
    const f = r[s + 0], d = r[s + 1], g = r[s + 2], m = r[s + 3];
    if (a === 0) {
      e[A + 0] = o, e[A + 1] = l, e[A + 2] = c, e[A + 3] = u;
      return;
    }
    if (a === 1) {
      e[A + 0] = f, e[A + 1] = d, e[A + 2] = g, e[A + 3] = m;
      return;
    }
    if (u !== m || o !== f || l !== d || c !== g) {
      let p = 1 - a;
      const h = o * f + l * d + c * g + u * m, E = h >= 0 ? 1 : -1, U = 1 - h * h;
      if (U > Number.EPSILON) {
        const S = Math.sqrt(U), x = Math.atan2(S, h * E);
        p = Math.sin(p * x) / S, a = Math.sin(a * x) / S;
      }
      const B = a * E;
      if (o = o * p + f * B, l = l * p + d * B, c = c * p + g * B, u = u * p + m * B, p === 1 - a) {
        const S = 1 / Math.sqrt(o * o + l * l + c * c + u * u);
        o *= S, l *= S, c *= S, u *= S;
      }
    }
    e[A] = o, e[A + 1] = l, e[A + 2] = c, e[A + 3] = u;
  }
  static multiplyQuaternionsFlat(e, A, t, i, r, s) {
    const a = t[i], o = t[i + 1], l = t[i + 2], c = t[i + 3], u = r[s], f = r[s + 1], d = r[s + 2], g = r[s + 3];
    return e[A] = a * g + c * u + o * d - l * f, e[A + 1] = o * g + c * f + l * u - a * d, e[A + 2] = l * g + c * d + a * f - o * u, e[A + 3] = c * g - a * u - o * f - l * d, e;
  }
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  get w() {
    return this._w;
  }
  set w(e) {
    this._w = e, this._onChangeCallback();
  }
  set(e, A, t, i) {
    return this._x = e, this._y = A, this._z = t, this._w = i, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(e) {
    return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this;
  }
  setFromEuler(e, A = !0) {
    const t = e._x, i = e._y, r = e._z, s = e._order, a = Math.cos, o = Math.sin, l = a(t / 2), c = a(i / 2), u = a(r / 2), f = o(t / 2), d = o(i / 2), g = o(r / 2);
    switch (s) {
      case "XYZ":
        this._x = f * c * u + l * d * g, this._y = l * d * u - f * c * g, this._z = l * c * g + f * d * u, this._w = l * c * u - f * d * g;
        break;
      case "YXZ":
        this._x = f * c * u + l * d * g, this._y = l * d * u - f * c * g, this._z = l * c * g - f * d * u, this._w = l * c * u + f * d * g;
        break;
      case "ZXY":
        this._x = f * c * u - l * d * g, this._y = l * d * u + f * c * g, this._z = l * c * g + f * d * u, this._w = l * c * u - f * d * g;
        break;
      case "ZYX":
        this._x = f * c * u - l * d * g, this._y = l * d * u + f * c * g, this._z = l * c * g - f * d * u, this._w = l * c * u + f * d * g;
        break;
      case "YZX":
        this._x = f * c * u + l * d * g, this._y = l * d * u + f * c * g, this._z = l * c * g - f * d * u, this._w = l * c * u - f * d * g;
        break;
      case "XZY":
        this._x = f * c * u - l * d * g, this._y = l * d * u - f * c * g, this._z = l * c * g + f * d * u, this._w = l * c * u + f * d * g;
        break;
      default:
        console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + s);
    }
    return A === !0 && this._onChangeCallback(), this;
  }
  setFromAxisAngle(e, A) {
    const t = A / 2, i = Math.sin(t);
    return this._x = e.x * i, this._y = e.y * i, this._z = e.z * i, this._w = Math.cos(t), this._onChangeCallback(), this;
  }
  setFromRotationMatrix(e) {
    const A = e.elements, t = A[0], i = A[4], r = A[8], s = A[1], a = A[5], o = A[9], l = A[2], c = A[6], u = A[10], f = t + a + u;
    if (f > 0) {
      const d = 0.5 / Math.sqrt(f + 1);
      this._w = 0.25 / d, this._x = (c - o) * d, this._y = (r - l) * d, this._z = (s - i) * d;
    } else if (t > a && t > u) {
      const d = 2 * Math.sqrt(1 + t - a - u);
      this._w = (c - o) / d, this._x = 0.25 * d, this._y = (i + s) / d, this._z = (r + l) / d;
    } else if (a > u) {
      const d = 2 * Math.sqrt(1 + a - t - u);
      this._w = (r - l) / d, this._x = (i + s) / d, this._y = 0.25 * d, this._z = (o + c) / d;
    } else {
      const d = 2 * Math.sqrt(1 + u - t - a);
      this._w = (s - i) / d, this._x = (r + l) / d, this._y = (o + c) / d, this._z = 0.25 * d;
    }
    return this._onChangeCallback(), this;
  }
  setFromUnitVectors(e, A) {
    let t = e.dot(A) + 1;
    return t < Number.EPSILON ? (t = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = t) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = t)) : (this._x = e.y * A.z - e.z * A.y, this._y = e.z * A.x - e.x * A.z, this._z = e.x * A.y - e.y * A.x, this._w = t), this.normalize();
  }
  angleTo(e) {
    return 2 * Math.acos(Math.abs(ke(this.dot(e), -1, 1)));
  }
  rotateTowards(e, A) {
    const t = this.angleTo(e);
    if (t === 0) return this;
    const i = Math.min(1, A / t);
    return this.slerp(e, i), this;
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
  }
  dot(e) {
    return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
  }
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let e = this.length();
    return e === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x = this._x * e, this._y = this._y * e, this._z = this._z * e, this._w = this._w * e), this._onChangeCallback(), this;
  }
  multiply(e) {
    return this.multiplyQuaternions(this, e);
  }
  premultiply(e) {
    return this.multiplyQuaternions(e, this);
  }
  multiplyQuaternions(e, A) {
    const t = e._x, i = e._y, r = e._z, s = e._w, a = A._x, o = A._y, l = A._z, c = A._w;
    return this._x = t * c + s * a + i * l - r * o, this._y = i * c + s * o + r * a - t * l, this._z = r * c + s * l + t * o - i * a, this._w = s * c - t * a - i * o - r * l, this._onChangeCallback(), this;
  }
  slerp(e, A) {
    if (A === 0) return this;
    if (A === 1) return this.copy(e);
    const t = this._x, i = this._y, r = this._z, s = this._w;
    let a = s * e._w + t * e._x + i * e._y + r * e._z;
    if (a < 0 ? (this._w = -e._w, this._x = -e._x, this._y = -e._y, this._z = -e._z, a = -a) : this.copy(e), a >= 1)
      return this._w = s, this._x = t, this._y = i, this._z = r, this;
    const o = 1 - a * a;
    if (o <= Number.EPSILON) {
      const d = 1 - A;
      return this._w = d * s + A * this._w, this._x = d * t + A * this._x, this._y = d * i + A * this._y, this._z = d * r + A * this._z, this.normalize(), this;
    }
    const l = Math.sqrt(o), c = Math.atan2(l, a), u = Math.sin((1 - A) * c) / l, f = Math.sin(A * c) / l;
    return this._w = s * u + this._w * f, this._x = t * u + this._x * f, this._y = i * u + this._y * f, this._z = r * u + this._z * f, this._onChangeCallback(), this;
  }
  slerpQuaternions(e, A, t) {
    return this.copy(e).slerp(A, t);
  }
  random() {
    const e = 2 * Math.PI * Math.random(), A = 2 * Math.PI * Math.random(), t = Math.random(), i = Math.sqrt(1 - t), r = Math.sqrt(t);
    return this.set(
      i * Math.sin(e),
      i * Math.cos(e),
      r * Math.sin(A),
      r * Math.cos(A)
    );
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w;
  }
  fromArray(e, A = 0) {
    return this._x = e[A], this._y = e[A + 1], this._z = e[A + 2], this._w = e[A + 3], this._onChangeCallback(), this;
  }
  toArray(e = [], A = 0) {
    return e[A] = this._x, e[A + 1] = this._y, e[A + 2] = this._z, e[A + 3] = this._w, e;
  }
  fromBufferAttribute(e, A) {
    return this._x = e.getX(A), this._y = e.getY(A), this._z = e.getZ(A), this._w = e.getW(A), this._onChangeCallback(), this;
  }
  toJSON() {
    return this.toArray();
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}
class Q {
  constructor(e = 0, A = 0, t = 0) {
    Q.prototype.isVector3 = !0, this.x = e, this.y = A, this.z = t;
  }
  set(e, A, t) {
    return t === void 0 && (t = this.z), this.x = e, this.y = A, this.z = t, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setZ(e) {
    return this.z = e, this;
  }
  setComponent(e, A) {
    switch (e) {
      case 0:
        this.x = A;
        break;
      case 1:
        this.y = A;
        break;
      case 2:
        this.z = A;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this;
  }
  addVectors(e, A) {
    return this.x = e.x + A.x, this.y = e.y + A.y, this.z = e.z + A.z, this;
  }
  addScaledVector(e, A) {
    return this.x += e.x * A, this.y += e.y * A, this.z += e.z * A, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this;
  }
  subVectors(e, A) {
    return this.x = e.x - A.x, this.y = e.y - A.y, this.z = e.z - A.z, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this;
  }
  multiplyVectors(e, A) {
    return this.x = e.x * A.x, this.y = e.y * A.y, this.z = e.z * A.z, this;
  }
  applyEuler(e) {
    return this.applyQuaternion(ec.setFromEuler(e));
  }
  applyAxisAngle(e, A) {
    return this.applyQuaternion(ec.setFromAxisAngle(e, A));
  }
  applyMatrix3(e) {
    const A = this.x, t = this.y, i = this.z, r = e.elements;
    return this.x = r[0] * A + r[3] * t + r[6] * i, this.y = r[1] * A + r[4] * t + r[7] * i, this.z = r[2] * A + r[5] * t + r[8] * i, this;
  }
  applyNormalMatrix(e) {
    return this.applyMatrix3(e).normalize();
  }
  applyMatrix4(e) {
    const A = this.x, t = this.y, i = this.z, r = e.elements, s = 1 / (r[3] * A + r[7] * t + r[11] * i + r[15]);
    return this.x = (r[0] * A + r[4] * t + r[8] * i + r[12]) * s, this.y = (r[1] * A + r[5] * t + r[9] * i + r[13]) * s, this.z = (r[2] * A + r[6] * t + r[10] * i + r[14]) * s, this;
  }
  applyQuaternion(e) {
    const A = this.x, t = this.y, i = this.z, r = e.x, s = e.y, a = e.z, o = e.w, l = 2 * (s * i - a * t), c = 2 * (a * A - r * i), u = 2 * (r * t - s * A);
    return this.x = A + o * l + s * u - a * c, this.y = t + o * c + a * l - r * u, this.z = i + o * u + r * c - s * l, this;
  }
  project(e) {
    return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix);
  }
  unproject(e) {
    return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld);
  }
  transformDirection(e) {
    const A = this.x, t = this.y, i = this.z, r = e.elements;
    return this.x = r[0] * A + r[4] * t + r[8] * i, this.y = r[1] * A + r[5] * t + r[9] * i, this.z = r[2] * A + r[6] * t + r[10] * i, this.normalize();
  }
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this.z /= e.z, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this;
  }
  clamp(e, A) {
    return this.x = ke(this.x, e.x, A.x), this.y = ke(this.y, e.y, A.y), this.z = ke(this.z, e.z, A.z), this;
  }
  clampScalar(e, A) {
    return this.x = ke(this.x, e, A), this.y = ke(this.y, e, A), this.z = ke(this.z, e, A), this;
  }
  clampLength(e, A) {
    const t = this.length();
    return this.divideScalar(t || 1).multiplyScalar(ke(t, e, A));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z;
  }
  // TODO lengthSquared?
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, A) {
    return this.x += (e.x - this.x) * A, this.y += (e.y - this.y) * A, this.z += (e.z - this.z) * A, this;
  }
  lerpVectors(e, A, t) {
    return this.x = e.x + (A.x - e.x) * t, this.y = e.y + (A.y - e.y) * t, this.z = e.z + (A.z - e.z) * t, this;
  }
  cross(e) {
    return this.crossVectors(this, e);
  }
  crossVectors(e, A) {
    const t = e.x, i = e.y, r = e.z, s = A.x, a = A.y, o = A.z;
    return this.x = i * o - r * a, this.y = r * s - t * o, this.z = t * a - i * s, this;
  }
  projectOnVector(e) {
    const A = e.lengthSq();
    if (A === 0) return this.set(0, 0, 0);
    const t = e.dot(this) / A;
    return this.copy(e).multiplyScalar(t);
  }
  projectOnPlane(e) {
    return ra.copy(this).projectOnVector(e), this.sub(ra);
  }
  reflect(e) {
    return this.sub(ra.copy(e).multiplyScalar(2 * this.dot(e)));
  }
  angleTo(e) {
    const A = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (A === 0) return Math.PI / 2;
    const t = this.dot(e) / A;
    return Math.acos(ke(t, -1, 1));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    const A = this.x - e.x, t = this.y - e.y, i = this.z - e.z;
    return A * A + t * t + i * i;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z);
  }
  setFromSpherical(e) {
    return this.setFromSphericalCoords(e.radius, e.phi, e.theta);
  }
  setFromSphericalCoords(e, A, t) {
    const i = Math.sin(A) * e;
    return this.x = i * Math.sin(t), this.y = Math.cos(A) * e, this.z = i * Math.cos(t), this;
  }
  setFromCylindrical(e) {
    return this.setFromCylindricalCoords(e.radius, e.theta, e.y);
  }
  setFromCylindricalCoords(e, A, t) {
    return this.x = e * Math.sin(A), this.y = t, this.z = e * Math.cos(A), this;
  }
  setFromMatrixPosition(e) {
    const A = e.elements;
    return this.x = A[12], this.y = A[13], this.z = A[14], this;
  }
  setFromMatrixScale(e) {
    const A = this.setFromMatrixColumn(e, 0).length(), t = this.setFromMatrixColumn(e, 1).length(), i = this.setFromMatrixColumn(e, 2).length();
    return this.x = A, this.y = t, this.z = i, this;
  }
  setFromMatrixColumn(e, A) {
    return this.fromArray(e.elements, A * 4);
  }
  setFromMatrix3Column(e, A) {
    return this.fromArray(e.elements, A * 3);
  }
  setFromEuler(e) {
    return this.x = e._x, this.y = e._y, this.z = e._z, this;
  }
  setFromColor(e) {
    return this.x = e.r, this.y = e.g, this.z = e.b, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z;
  }
  fromArray(e, A = 0) {
    return this.x = e[A], this.y = e[A + 1], this.z = e[A + 2], this;
  }
  toArray(e = [], A = 0) {
    return e[A] = this.x, e[A + 1] = this.y, e[A + 2] = this.z, e;
  }
  fromBufferAttribute(e, A) {
    return this.x = e.getX(A), this.y = e.getY(A), this.z = e.getZ(A), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
  }
  randomDirection() {
    const e = Math.random() * Math.PI * 2, A = Math.random() * 2 - 1, t = Math.sqrt(1 - A * A);
    return this.x = t * Math.cos(e), this.y = A, this.z = t * Math.sin(e), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z;
  }
}
const ra = /* @__PURE__ */ new Q(), ec = /* @__PURE__ */ new Rn();
class rr {
  constructor(e = new Q(1 / 0, 1 / 0, 1 / 0), A = new Q(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = e, this.max = A;
  }
  set(e, A) {
    return this.min.copy(e), this.max.copy(A), this;
  }
  setFromArray(e) {
    this.makeEmpty();
    for (let A = 0, t = e.length; A < t; A += 3)
      this.expandByPoint(ht.fromArray(e, A));
    return this;
  }
  setFromBufferAttribute(e) {
    this.makeEmpty();
    for (let A = 0, t = e.count; A < t; A++)
      this.expandByPoint(ht.fromBufferAttribute(e, A));
    return this;
  }
  setFromPoints(e) {
    this.makeEmpty();
    for (let A = 0, t = e.length; A < t; A++)
      this.expandByPoint(e[A]);
    return this;
  }
  setFromCenterAndSize(e, A) {
    const t = ht.copy(A).multiplyScalar(0.5);
    return this.min.copy(e).sub(t), this.max.copy(e).add(t), this;
  }
  setFromObject(e, A = !1) {
    return this.makeEmpty(), this.expandByObject(e, A);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.min.copy(e.min), this.max.copy(e.max), this;
  }
  makeEmpty() {
    return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  getCenter(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min);
  }
  expandByPoint(e) {
    return this.min.min(e), this.max.max(e), this;
  }
  expandByVector(e) {
    return this.min.sub(e), this.max.add(e), this;
  }
  expandByScalar(e) {
    return this.min.addScalar(-e), this.max.addScalar(e), this;
  }
  expandByObject(e, A = !1) {
    e.updateWorldMatrix(!1, !1);
    const t = e.geometry;
    if (t !== void 0) {
      const r = t.getAttribute("position");
      if (A === !0 && r !== void 0 && e.isInstancedMesh !== !0)
        for (let s = 0, a = r.count; s < a; s++)
          e.isMesh === !0 ? e.getVertexPosition(s, ht) : ht.fromBufferAttribute(r, s), ht.applyMatrix4(e.matrixWorld), this.expandByPoint(ht);
      else
        e.boundingBox !== void 0 ? (e.boundingBox === null && e.computeBoundingBox(), fr.copy(e.boundingBox)) : (t.boundingBox === null && t.computeBoundingBox(), fr.copy(t.boundingBox)), fr.applyMatrix4(e.matrixWorld), this.union(fr);
    }
    const i = e.children;
    for (let r = 0, s = i.length; r < s; r++)
      this.expandByObject(i[r], A);
    return this;
  }
  containsPoint(e) {
    return e.x >= this.min.x && e.x <= this.max.x && e.y >= this.min.y && e.y <= this.max.y && e.z >= this.min.z && e.z <= this.max.z;
  }
  containsBox(e) {
    return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z;
  }
  getParameter(e, A) {
    return A.set(
      (e.x - this.min.x) / (this.max.x - this.min.x),
      (e.y - this.min.y) / (this.max.y - this.min.y),
      (e.z - this.min.z) / (this.max.z - this.min.z)
    );
  }
  intersectsBox(e) {
    return e.max.x >= this.min.x && e.min.x <= this.max.x && e.max.y >= this.min.y && e.min.y <= this.max.y && e.max.z >= this.min.z && e.min.z <= this.max.z;
  }
  intersectsSphere(e) {
    return this.clampPoint(e.center, ht), ht.distanceToSquared(e.center) <= e.radius * e.radius;
  }
  intersectsPlane(e) {
    let A, t;
    return e.normal.x > 0 ? (A = e.normal.x * this.min.x, t = e.normal.x * this.max.x) : (A = e.normal.x * this.max.x, t = e.normal.x * this.min.x), e.normal.y > 0 ? (A += e.normal.y * this.min.y, t += e.normal.y * this.max.y) : (A += e.normal.y * this.max.y, t += e.normal.y * this.min.y), e.normal.z > 0 ? (A += e.normal.z * this.min.z, t += e.normal.z * this.max.z) : (A += e.normal.z * this.max.z, t += e.normal.z * this.min.z), A <= -e.constant && t >= -e.constant;
  }
  intersectsTriangle(e) {
    if (this.isEmpty())
      return !1;
    this.getCenter(Fi), dr.subVectors(this.max, Fi), On.subVectors(e.a, Fi), Gn.subVectors(e.b, Fi), Vn.subVectors(e.c, Fi), Kt.subVectors(Gn, On), zt.subVectors(Vn, Gn), dn.subVectors(On, Vn);
    let A = [
      0,
      -Kt.z,
      Kt.y,
      0,
      -zt.z,
      zt.y,
      0,
      -dn.z,
      dn.y,
      Kt.z,
      0,
      -Kt.x,
      zt.z,
      0,
      -zt.x,
      dn.z,
      0,
      -dn.x,
      -Kt.y,
      Kt.x,
      0,
      -zt.y,
      zt.x,
      0,
      -dn.y,
      dn.x,
      0
    ];
    return !sa(A, On, Gn, Vn, dr) || (A = [1, 0, 0, 0, 1, 0, 0, 0, 1], !sa(A, On, Gn, Vn, dr)) ? !1 : (pr.crossVectors(Kt, zt), A = [pr.x, pr.y, pr.z], sa(A, On, Gn, Vn, dr));
  }
  clampPoint(e, A) {
    return A.copy(e).clamp(this.min, this.max);
  }
  distanceToPoint(e) {
    return this.clampPoint(e, ht).distanceTo(e);
  }
  getBoundingSphere(e) {
    return this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center), e.radius = this.getSize(ht).length() * 0.5), e;
  }
  intersect(e) {
    return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(e) {
    return this.min.min(e.min), this.max.max(e.max), this;
  }
  applyMatrix4(e) {
    return this.isEmpty() ? this : (Ft[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), Ft[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), Ft[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), Ft[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), Ft[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), Ft[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), Ft[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), Ft[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(Ft), this);
  }
  translate(e) {
    return this.min.add(e), this.max.add(e), this;
  }
  equals(e) {
    return e.min.equals(this.min) && e.max.equals(this.max);
  }
}
const Ft = [
  /* @__PURE__ */ new Q(),
  /* @__PURE__ */ new Q(),
  /* @__PURE__ */ new Q(),
  /* @__PURE__ */ new Q(),
  /* @__PURE__ */ new Q(),
  /* @__PURE__ */ new Q(),
  /* @__PURE__ */ new Q(),
  /* @__PURE__ */ new Q()
], ht = /* @__PURE__ */ new Q(), fr = /* @__PURE__ */ new rr(), On = /* @__PURE__ */ new Q(), Gn = /* @__PURE__ */ new Q(), Vn = /* @__PURE__ */ new Q(), Kt = /* @__PURE__ */ new Q(), zt = /* @__PURE__ */ new Q(), dn = /* @__PURE__ */ new Q(), Fi = /* @__PURE__ */ new Q(), dr = /* @__PURE__ */ new Q(), pr = /* @__PURE__ */ new Q(), pn = /* @__PURE__ */ new Q();
function sa(n, e, A, t, i) {
  for (let r = 0, s = n.length - 3; r <= s; r += 3) {
    pn.fromArray(n, r);
    const a = i.x * Math.abs(pn.x) + i.y * Math.abs(pn.y) + i.z * Math.abs(pn.z), o = e.dot(pn), l = A.dot(pn), c = t.dot(pn);
    if (Math.max(-Math.max(o, l, c), Math.min(o, l, c)) > a)
      return !1;
  }
  return !0;
}
const gp = /* @__PURE__ */ new rr(), bi = /* @__PURE__ */ new Q(), aa = /* @__PURE__ */ new Q();
class Os {
  constructor(e = new Q(), A = -1) {
    this.isSphere = !0, this.center = e, this.radius = A;
  }
  set(e, A) {
    return this.center.copy(e), this.radius = A, this;
  }
  setFromPoints(e, A) {
    const t = this.center;
    A !== void 0 ? t.copy(A) : gp.setFromPoints(e).getCenter(t);
    let i = 0;
    for (let r = 0, s = e.length; r < s; r++)
      i = Math.max(i, t.distanceToSquared(e[r]));
    return this.radius = Math.sqrt(i), this;
  }
  copy(e) {
    return this.center.copy(e.center), this.radius = e.radius, this;
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    return this.center.set(0, 0, 0), this.radius = -1, this;
  }
  containsPoint(e) {
    return e.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint(e) {
    return e.distanceTo(this.center) - this.radius;
  }
  intersectsSphere(e) {
    const A = this.radius + e.radius;
    return e.center.distanceToSquared(this.center) <= A * A;
  }
  intersectsBox(e) {
    return e.intersectsSphere(this);
  }
  intersectsPlane(e) {
    return Math.abs(e.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint(e, A) {
    const t = this.center.distanceToSquared(e);
    return A.copy(e), t > this.radius * this.radius && (A.sub(this.center).normalize(), A.multiplyScalar(this.radius).add(this.center)), A;
  }
  getBoundingBox(e) {
    return this.isEmpty() ? (e.makeEmpty(), e) : (e.set(this.center, this.center), e.expandByScalar(this.radius), e);
  }
  applyMatrix4(e) {
    return this.center.applyMatrix4(e), this.radius = this.radius * e.getMaxScaleOnAxis(), this;
  }
  translate(e) {
    return this.center.add(e), this;
  }
  expandByPoint(e) {
    if (this.isEmpty())
      return this.center.copy(e), this.radius = 0, this;
    bi.subVectors(e, this.center);
    const A = bi.lengthSq();
    if (A > this.radius * this.radius) {
      const t = Math.sqrt(A), i = (t - this.radius) * 0.5;
      this.center.addScaledVector(bi, i / t), this.radius += i;
    }
    return this;
  }
  union(e) {
    return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (this.center.equals(e.center) === !0 ? this.radius = Math.max(this.radius, e.radius) : (aa.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(bi.copy(e.center).add(aa)), this.expandByPoint(bi.copy(e.center).sub(aa))), this);
  }
  equals(e) {
    return e.center.equals(this.center) && e.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const bt = /* @__PURE__ */ new Q(), oa = /* @__PURE__ */ new Q(), gr = /* @__PURE__ */ new Q(), Wt = /* @__PURE__ */ new Q(), la = /* @__PURE__ */ new Q(), mr = /* @__PURE__ */ new Q(), ca = /* @__PURE__ */ new Q();
class Gs {
  constructor(e = new Q(), A = new Q(0, 0, -1)) {
    this.origin = e, this.direction = A;
  }
  set(e, A) {
    return this.origin.copy(e), this.direction.copy(A), this;
  }
  copy(e) {
    return this.origin.copy(e.origin), this.direction.copy(e.direction), this;
  }
  at(e, A) {
    return A.copy(this.origin).addScaledVector(this.direction, e);
  }
  lookAt(e) {
    return this.direction.copy(e).sub(this.origin).normalize(), this;
  }
  recast(e) {
    return this.origin.copy(this.at(e, bt)), this;
  }
  closestPointToPoint(e, A) {
    A.subVectors(e, this.origin);
    const t = A.dot(this.direction);
    return t < 0 ? A.copy(this.origin) : A.copy(this.origin).addScaledVector(this.direction, t);
  }
  distanceToPoint(e) {
    return Math.sqrt(this.distanceSqToPoint(e));
  }
  distanceSqToPoint(e) {
    const A = bt.subVectors(e, this.origin).dot(this.direction);
    return A < 0 ? this.origin.distanceToSquared(e) : (bt.copy(this.origin).addScaledVector(this.direction, A), bt.distanceToSquared(e));
  }
  distanceSqToSegment(e, A, t, i) {
    oa.copy(e).add(A).multiplyScalar(0.5), gr.copy(A).sub(e).normalize(), Wt.copy(this.origin).sub(oa);
    const r = e.distanceTo(A) * 0.5, s = -this.direction.dot(gr), a = Wt.dot(this.direction), o = -Wt.dot(gr), l = Wt.lengthSq(), c = Math.abs(1 - s * s);
    let u, f, d, g;
    if (c > 0)
      if (u = s * o - a, f = s * a - o, g = r * c, u >= 0)
        if (f >= -g)
          if (f <= g) {
            const m = 1 / c;
            u *= m, f *= m, d = u * (u + s * f + 2 * a) + f * (s * u + f + 2 * o) + l;
          } else
            f = r, u = Math.max(0, -(s * f + a)), d = -u * u + f * (f + 2 * o) + l;
        else
          f = -r, u = Math.max(0, -(s * f + a)), d = -u * u + f * (f + 2 * o) + l;
      else
        f <= -g ? (u = Math.max(0, -(-s * r + a)), f = u > 0 ? -r : Math.min(Math.max(-r, -o), r), d = -u * u + f * (f + 2 * o) + l) : f <= g ? (u = 0, f = Math.min(Math.max(-r, -o), r), d = f * (f + 2 * o) + l) : (u = Math.max(0, -(s * r + a)), f = u > 0 ? r : Math.min(Math.max(-r, -o), r), d = -u * u + f * (f + 2 * o) + l);
    else
      f = s > 0 ? -r : r, u = Math.max(0, -(s * f + a)), d = -u * u + f * (f + 2 * o) + l;
    return t && t.copy(this.origin).addScaledVector(this.direction, u), i && i.copy(oa).addScaledVector(gr, f), d;
  }
  intersectSphere(e, A) {
    bt.subVectors(e.center, this.origin);
    const t = bt.dot(this.direction), i = bt.dot(bt) - t * t, r = e.radius * e.radius;
    if (i > r) return null;
    const s = Math.sqrt(r - i), a = t - s, o = t + s;
    return o < 0 ? null : a < 0 ? this.at(o, A) : this.at(a, A);
  }
  intersectsSphere(e) {
    return this.distanceSqToPoint(e.center) <= e.radius * e.radius;
  }
  distanceToPlane(e) {
    const A = e.normal.dot(this.direction);
    if (A === 0)
      return e.distanceToPoint(this.origin) === 0 ? 0 : null;
    const t = -(this.origin.dot(e.normal) + e.constant) / A;
    return t >= 0 ? t : null;
  }
  intersectPlane(e, A) {
    const t = this.distanceToPlane(e);
    return t === null ? null : this.at(t, A);
  }
  intersectsPlane(e) {
    const A = e.distanceToPoint(this.origin);
    return A === 0 || e.normal.dot(this.direction) * A < 0;
  }
  intersectBox(e, A) {
    let t, i, r, s, a, o;
    const l = 1 / this.direction.x, c = 1 / this.direction.y, u = 1 / this.direction.z, f = this.origin;
    return l >= 0 ? (t = (e.min.x - f.x) * l, i = (e.max.x - f.x) * l) : (t = (e.max.x - f.x) * l, i = (e.min.x - f.x) * l), c >= 0 ? (r = (e.min.y - f.y) * c, s = (e.max.y - f.y) * c) : (r = (e.max.y - f.y) * c, s = (e.min.y - f.y) * c), t > s || r > i || ((r > t || isNaN(t)) && (t = r), (s < i || isNaN(i)) && (i = s), u >= 0 ? (a = (e.min.z - f.z) * u, o = (e.max.z - f.z) * u) : (a = (e.max.z - f.z) * u, o = (e.min.z - f.z) * u), t > o || a > i) || ((a > t || t !== t) && (t = a), (o < i || i !== i) && (i = o), i < 0) ? null : this.at(t >= 0 ? t : i, A);
  }
  intersectsBox(e) {
    return this.intersectBox(e, bt) !== null;
  }
  intersectTriangle(e, A, t, i, r) {
    la.subVectors(A, e), mr.subVectors(t, e), ca.crossVectors(la, mr);
    let s = this.direction.dot(ca), a;
    if (s > 0) {
      if (i) return null;
      a = 1;
    } else if (s < 0)
      a = -1, s = -s;
    else
      return null;
    Wt.subVectors(this.origin, e);
    const o = a * this.direction.dot(mr.crossVectors(Wt, mr));
    if (o < 0)
      return null;
    const l = a * this.direction.dot(la.cross(Wt));
    if (l < 0 || o + l > s)
      return null;
    const c = -a * Wt.dot(ca);
    return c < 0 ? null : this.at(c / s, r);
  }
  applyMatrix4(e) {
    return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this;
  }
  equals(e) {
    return e.origin.equals(this.origin) && e.direction.equals(this.direction);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class uA {
  constructor(e, A, t, i, r, s, a, o, l, c, u, f, d, g, m, p) {
    uA.prototype.isMatrix4 = !0, this.elements = [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ], e !== void 0 && this.set(e, A, t, i, r, s, a, o, l, c, u, f, d, g, m, p);
  }
  set(e, A, t, i, r, s, a, o, l, c, u, f, d, g, m, p) {
    const h = this.elements;
    return h[0] = e, h[4] = A, h[8] = t, h[12] = i, h[1] = r, h[5] = s, h[9] = a, h[13] = o, h[2] = l, h[6] = c, h[10] = u, h[14] = f, h[3] = d, h[7] = g, h[11] = m, h[15] = p, this;
  }
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  clone() {
    return new uA().fromArray(this.elements);
  }
  copy(e) {
    const A = this.elements, t = e.elements;
    return A[0] = t[0], A[1] = t[1], A[2] = t[2], A[3] = t[3], A[4] = t[4], A[5] = t[5], A[6] = t[6], A[7] = t[7], A[8] = t[8], A[9] = t[9], A[10] = t[10], A[11] = t[11], A[12] = t[12], A[13] = t[13], A[14] = t[14], A[15] = t[15], this;
  }
  copyPosition(e) {
    const A = this.elements, t = e.elements;
    return A[12] = t[12], A[13] = t[13], A[14] = t[14], this;
  }
  setFromMatrix3(e) {
    const A = e.elements;
    return this.set(
      A[0],
      A[3],
      A[6],
      0,
      A[1],
      A[4],
      A[7],
      0,
      A[2],
      A[5],
      A[8],
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  extractBasis(e, A, t) {
    return e.setFromMatrixColumn(this, 0), A.setFromMatrixColumn(this, 1), t.setFromMatrixColumn(this, 2), this;
  }
  makeBasis(e, A, t) {
    return this.set(
      e.x,
      A.x,
      t.x,
      0,
      e.y,
      A.y,
      t.y,
      0,
      e.z,
      A.z,
      t.z,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  extractRotation(e) {
    const A = this.elements, t = e.elements, i = 1 / kn.setFromMatrixColumn(e, 0).length(), r = 1 / kn.setFromMatrixColumn(e, 1).length(), s = 1 / kn.setFromMatrixColumn(e, 2).length();
    return A[0] = t[0] * i, A[1] = t[1] * i, A[2] = t[2] * i, A[3] = 0, A[4] = t[4] * r, A[5] = t[5] * r, A[6] = t[6] * r, A[7] = 0, A[8] = t[8] * s, A[9] = t[9] * s, A[10] = t[10] * s, A[11] = 0, A[12] = 0, A[13] = 0, A[14] = 0, A[15] = 1, this;
  }
  makeRotationFromEuler(e) {
    const A = this.elements, t = e.x, i = e.y, r = e.z, s = Math.cos(t), a = Math.sin(t), o = Math.cos(i), l = Math.sin(i), c = Math.cos(r), u = Math.sin(r);
    if (e.order === "XYZ") {
      const f = s * c, d = s * u, g = a * c, m = a * u;
      A[0] = o * c, A[4] = -o * u, A[8] = l, A[1] = d + g * l, A[5] = f - m * l, A[9] = -a * o, A[2] = m - f * l, A[6] = g + d * l, A[10] = s * o;
    } else if (e.order === "YXZ") {
      const f = o * c, d = o * u, g = l * c, m = l * u;
      A[0] = f + m * a, A[4] = g * a - d, A[8] = s * l, A[1] = s * u, A[5] = s * c, A[9] = -a, A[2] = d * a - g, A[6] = m + f * a, A[10] = s * o;
    } else if (e.order === "ZXY") {
      const f = o * c, d = o * u, g = l * c, m = l * u;
      A[0] = f - m * a, A[4] = -s * u, A[8] = g + d * a, A[1] = d + g * a, A[5] = s * c, A[9] = m - f * a, A[2] = -s * l, A[6] = a, A[10] = s * o;
    } else if (e.order === "ZYX") {
      const f = s * c, d = s * u, g = a * c, m = a * u;
      A[0] = o * c, A[4] = g * l - d, A[8] = f * l + m, A[1] = o * u, A[5] = m * l + f, A[9] = d * l - g, A[2] = -l, A[6] = a * o, A[10] = s * o;
    } else if (e.order === "YZX") {
      const f = s * o, d = s * l, g = a * o, m = a * l;
      A[0] = o * c, A[4] = m - f * u, A[8] = g * u + d, A[1] = u, A[5] = s * c, A[9] = -a * c, A[2] = -l * c, A[6] = d * u + g, A[10] = f - m * u;
    } else if (e.order === "XZY") {
      const f = s * o, d = s * l, g = a * o, m = a * l;
      A[0] = o * c, A[4] = -u, A[8] = l * c, A[1] = f * u + m, A[5] = s * c, A[9] = d * u - g, A[2] = g * u - d, A[6] = a * c, A[10] = m * u + f;
    }
    return A[3] = 0, A[7] = 0, A[11] = 0, A[12] = 0, A[13] = 0, A[14] = 0, A[15] = 1, this;
  }
  makeRotationFromQuaternion(e) {
    return this.compose(mp, e, Bp);
  }
  lookAt(e, A, t) {
    const i = this.elements;
    return JA.subVectors(e, A), JA.lengthSq() === 0 && (JA.z = 1), JA.normalize(), Xt.crossVectors(t, JA), Xt.lengthSq() === 0 && (Math.abs(t.z) === 1 ? JA.x += 1e-4 : JA.z += 1e-4, JA.normalize(), Xt.crossVectors(t, JA)), Xt.normalize(), Br.crossVectors(JA, Xt), i[0] = Xt.x, i[4] = Br.x, i[8] = JA.x, i[1] = Xt.y, i[5] = Br.y, i[9] = JA.y, i[2] = Xt.z, i[6] = Br.z, i[10] = JA.z, this;
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, A) {
    const t = e.elements, i = A.elements, r = this.elements, s = t[0], a = t[4], o = t[8], l = t[12], c = t[1], u = t[5], f = t[9], d = t[13], g = t[2], m = t[6], p = t[10], h = t[14], E = t[3], U = t[7], B = t[11], S = t[15], x = i[0], M = i[4], F = i[8], _ = i[12], v = i[1], b = i[5], H = i[9], R = i[13], N = i[2], Y = i[6], k = i[10], Z = i[14], K = i[3], ne = i[7], oe = i[11], Be = i[15];
    return r[0] = s * x + a * v + o * N + l * K, r[4] = s * M + a * b + o * Y + l * ne, r[8] = s * F + a * H + o * k + l * oe, r[12] = s * _ + a * R + o * Z + l * Be, r[1] = c * x + u * v + f * N + d * K, r[5] = c * M + u * b + f * Y + d * ne, r[9] = c * F + u * H + f * k + d * oe, r[13] = c * _ + u * R + f * Z + d * Be, r[2] = g * x + m * v + p * N + h * K, r[6] = g * M + m * b + p * Y + h * ne, r[10] = g * F + m * H + p * k + h * oe, r[14] = g * _ + m * R + p * Z + h * Be, r[3] = E * x + U * v + B * N + S * K, r[7] = E * M + U * b + B * Y + S * ne, r[11] = E * F + U * H + B * k + S * oe, r[15] = E * _ + U * R + B * Z + S * Be, this;
  }
  multiplyScalar(e) {
    const A = this.elements;
    return A[0] *= e, A[4] *= e, A[8] *= e, A[12] *= e, A[1] *= e, A[5] *= e, A[9] *= e, A[13] *= e, A[2] *= e, A[6] *= e, A[10] *= e, A[14] *= e, A[3] *= e, A[7] *= e, A[11] *= e, A[15] *= e, this;
  }
  determinant() {
    const e = this.elements, A = e[0], t = e[4], i = e[8], r = e[12], s = e[1], a = e[5], o = e[9], l = e[13], c = e[2], u = e[6], f = e[10], d = e[14], g = e[3], m = e[7], p = e[11], h = e[15];
    return g * (+r * o * u - i * l * u - r * a * f + t * l * f + i * a * d - t * o * d) + m * (+A * o * d - A * l * f + r * s * f - i * s * d + i * l * c - r * o * c) + p * (+A * l * u - A * a * d - r * s * u + t * s * d + r * a * c - t * l * c) + h * (-i * a * c - A * o * u + A * a * f + i * s * u - t * s * f + t * o * c);
  }
  transpose() {
    const e = this.elements;
    let A;
    return A = e[1], e[1] = e[4], e[4] = A, A = e[2], e[2] = e[8], e[8] = A, A = e[6], e[6] = e[9], e[9] = A, A = e[3], e[3] = e[12], e[12] = A, A = e[7], e[7] = e[13], e[13] = A, A = e[11], e[11] = e[14], e[14] = A, this;
  }
  setPosition(e, A, t) {
    const i = this.elements;
    return e.isVector3 ? (i[12] = e.x, i[13] = e.y, i[14] = e.z) : (i[12] = e, i[13] = A, i[14] = t), this;
  }
  invert() {
    const e = this.elements, A = e[0], t = e[1], i = e[2], r = e[3], s = e[4], a = e[5], o = e[6], l = e[7], c = e[8], u = e[9], f = e[10], d = e[11], g = e[12], m = e[13], p = e[14], h = e[15], E = u * p * l - m * f * l + m * o * d - a * p * d - u * o * h + a * f * h, U = g * f * l - c * p * l - g * o * d + s * p * d + c * o * h - s * f * h, B = c * m * l - g * u * l + g * a * d - s * m * d - c * a * h + s * u * h, S = g * u * o - c * m * o - g * a * f + s * m * f + c * a * p - s * u * p, x = A * E + t * U + i * B + r * S;
    if (x === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const M = 1 / x;
    return e[0] = E * M, e[1] = (m * f * r - u * p * r - m * i * d + t * p * d + u * i * h - t * f * h) * M, e[2] = (a * p * r - m * o * r + m * i * l - t * p * l - a * i * h + t * o * h) * M, e[3] = (u * o * r - a * f * r - u * i * l + t * f * l + a * i * d - t * o * d) * M, e[4] = U * M, e[5] = (c * p * r - g * f * r + g * i * d - A * p * d - c * i * h + A * f * h) * M, e[6] = (g * o * r - s * p * r - g * i * l + A * p * l + s * i * h - A * o * h) * M, e[7] = (s * f * r - c * o * r + c * i * l - A * f * l - s * i * d + A * o * d) * M, e[8] = B * M, e[9] = (g * u * r - c * m * r - g * t * d + A * m * d + c * t * h - A * u * h) * M, e[10] = (s * m * r - g * a * r + g * t * l - A * m * l - s * t * h + A * a * h) * M, e[11] = (c * a * r - s * u * r - c * t * l + A * u * l + s * t * d - A * a * d) * M, e[12] = S * M, e[13] = (c * m * i - g * u * i + g * t * f - A * m * f - c * t * p + A * u * p) * M, e[14] = (g * a * i - s * m * i - g * t * o + A * m * o + s * t * p - A * a * p) * M, e[15] = (s * u * i - c * a * i + c * t * o - A * u * o - s * t * f + A * a * f) * M, this;
  }
  scale(e) {
    const A = this.elements, t = e.x, i = e.y, r = e.z;
    return A[0] *= t, A[4] *= i, A[8] *= r, A[1] *= t, A[5] *= i, A[9] *= r, A[2] *= t, A[6] *= i, A[10] *= r, A[3] *= t, A[7] *= i, A[11] *= r, this;
  }
  getMaxScaleOnAxis() {
    const e = this.elements, A = e[0] * e[0] + e[1] * e[1] + e[2] * e[2], t = e[4] * e[4] + e[5] * e[5] + e[6] * e[6], i = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
    return Math.sqrt(Math.max(A, t, i));
  }
  makeTranslation(e, A, t) {
    return e.isVector3 ? this.set(
      1,
      0,
      0,
      e.x,
      0,
      1,
      0,
      e.y,
      0,
      0,
      1,
      e.z,
      0,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      0,
      e,
      0,
      1,
      0,
      A,
      0,
      0,
      1,
      t,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationX(e) {
    const A = Math.cos(e), t = Math.sin(e);
    return this.set(
      1,
      0,
      0,
      0,
      0,
      A,
      -t,
      0,
      0,
      t,
      A,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationY(e) {
    const A = Math.cos(e), t = Math.sin(e);
    return this.set(
      A,
      0,
      t,
      0,
      0,
      1,
      0,
      0,
      -t,
      0,
      A,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationZ(e) {
    const A = Math.cos(e), t = Math.sin(e);
    return this.set(
      A,
      -t,
      0,
      0,
      t,
      A,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationAxis(e, A) {
    const t = Math.cos(A), i = Math.sin(A), r = 1 - t, s = e.x, a = e.y, o = e.z, l = r * s, c = r * a;
    return this.set(
      l * s + t,
      l * a - i * o,
      l * o + i * a,
      0,
      l * a + i * o,
      c * a + t,
      c * o - i * s,
      0,
      l * o - i * a,
      c * o + i * s,
      r * o * o + t,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeScale(e, A, t) {
    return this.set(
      e,
      0,
      0,
      0,
      0,
      A,
      0,
      0,
      0,
      0,
      t,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeShear(e, A, t, i, r, s) {
    return this.set(
      1,
      t,
      r,
      0,
      e,
      1,
      s,
      0,
      A,
      i,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  compose(e, A, t) {
    const i = this.elements, r = A._x, s = A._y, a = A._z, o = A._w, l = r + r, c = s + s, u = a + a, f = r * l, d = r * c, g = r * u, m = s * c, p = s * u, h = a * u, E = o * l, U = o * c, B = o * u, S = t.x, x = t.y, M = t.z;
    return i[0] = (1 - (m + h)) * S, i[1] = (d + B) * S, i[2] = (g - U) * S, i[3] = 0, i[4] = (d - B) * x, i[5] = (1 - (f + h)) * x, i[6] = (p + E) * x, i[7] = 0, i[8] = (g + U) * M, i[9] = (p - E) * M, i[10] = (1 - (f + m)) * M, i[11] = 0, i[12] = e.x, i[13] = e.y, i[14] = e.z, i[15] = 1, this;
  }
  decompose(e, A, t) {
    const i = this.elements;
    let r = kn.set(i[0], i[1], i[2]).length();
    const s = kn.set(i[4], i[5], i[6]).length(), a = kn.set(i[8], i[9], i[10]).length();
    this.determinant() < 0 && (r = -r), e.x = i[12], e.y = i[13], e.z = i[14], ft.copy(this);
    const l = 1 / r, c = 1 / s, u = 1 / a;
    return ft.elements[0] *= l, ft.elements[1] *= l, ft.elements[2] *= l, ft.elements[4] *= c, ft.elements[5] *= c, ft.elements[6] *= c, ft.elements[8] *= u, ft.elements[9] *= u, ft.elements[10] *= u, A.setFromRotationMatrix(ft), t.x = r, t.y = s, t.z = a, this;
  }
  makePerspective(e, A, t, i, r, s, a = Pt) {
    const o = this.elements, l = 2 * r / (A - e), c = 2 * r / (t - i), u = (A + e) / (A - e), f = (t + i) / (t - i);
    let d, g;
    if (a === Pt)
      d = -(s + r) / (s - r), g = -2 * s * r / (s - r);
    else if (a === xs)
      d = -s / (s - r), g = -s * r / (s - r);
    else
      throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + a);
    return o[0] = l, o[4] = 0, o[8] = u, o[12] = 0, o[1] = 0, o[5] = c, o[9] = f, o[13] = 0, o[2] = 0, o[6] = 0, o[10] = d, o[14] = g, o[3] = 0, o[7] = 0, o[11] = -1, o[15] = 0, this;
  }
  makeOrthographic(e, A, t, i, r, s, a = Pt) {
    const o = this.elements, l = 1 / (A - e), c = 1 / (t - i), u = 1 / (s - r), f = (A + e) * l, d = (t + i) * c;
    let g, m;
    if (a === Pt)
      g = (s + r) * u, m = -2 * u;
    else if (a === xs)
      g = r * u, m = -1 * u;
    else
      throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + a);
    return o[0] = 2 * l, o[4] = 0, o[8] = 0, o[12] = -f, o[1] = 0, o[5] = 2 * c, o[9] = 0, o[13] = -d, o[2] = 0, o[6] = 0, o[10] = m, o[14] = -g, o[3] = 0, o[7] = 0, o[11] = 0, o[15] = 1, this;
  }
  equals(e) {
    const A = this.elements, t = e.elements;
    for (let i = 0; i < 16; i++)
      if (A[i] !== t[i]) return !1;
    return !0;
  }
  fromArray(e, A = 0) {
    for (let t = 0; t < 16; t++)
      this.elements[t] = e[t + A];
    return this;
  }
  toArray(e = [], A = 0) {
    const t = this.elements;
    return e[A] = t[0], e[A + 1] = t[1], e[A + 2] = t[2], e[A + 3] = t[3], e[A + 4] = t[4], e[A + 5] = t[5], e[A + 6] = t[6], e[A + 7] = t[7], e[A + 8] = t[8], e[A + 9] = t[9], e[A + 10] = t[10], e[A + 11] = t[11], e[A + 12] = t[12], e[A + 13] = t[13], e[A + 14] = t[14], e[A + 15] = t[15], e;
  }
}
const kn = /* @__PURE__ */ new Q(), ft = /* @__PURE__ */ new uA(), mp = /* @__PURE__ */ new Q(0, 0, 0), Bp = /* @__PURE__ */ new Q(1, 1, 1), Xt = /* @__PURE__ */ new Q(), Br = /* @__PURE__ */ new Q(), JA = /* @__PURE__ */ new Q(), Ac = /* @__PURE__ */ new uA(), tc = /* @__PURE__ */ new Rn();
class Vt {
  constructor(e = 0, A = 0, t = 0, i = Vt.DEFAULT_ORDER) {
    this.isEuler = !0, this._x = e, this._y = A, this._z = t, this._order = i;
  }
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  get order() {
    return this._order;
  }
  set order(e) {
    this._order = e, this._onChangeCallback();
  }
  set(e, A, t, i = this._order) {
    return this._x = e, this._y = A, this._z = t, this._order = i, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(e) {
    return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this._onChangeCallback(), this;
  }
  setFromRotationMatrix(e, A = this._order, t = !0) {
    const i = e.elements, r = i[0], s = i[4], a = i[8], o = i[1], l = i[5], c = i[9], u = i[2], f = i[6], d = i[10];
    switch (A) {
      case "XYZ":
        this._y = Math.asin(ke(a, -1, 1)), Math.abs(a) < 0.9999999 ? (this._x = Math.atan2(-c, d), this._z = Math.atan2(-s, r)) : (this._x = Math.atan2(f, l), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-ke(c, -1, 1)), Math.abs(c) < 0.9999999 ? (this._y = Math.atan2(a, d), this._z = Math.atan2(o, l)) : (this._y = Math.atan2(-u, r), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(ke(f, -1, 1)), Math.abs(f) < 0.9999999 ? (this._y = Math.atan2(-u, d), this._z = Math.atan2(-s, l)) : (this._y = 0, this._z = Math.atan2(o, r));
        break;
      case "ZYX":
        this._y = Math.asin(-ke(u, -1, 1)), Math.abs(u) < 0.9999999 ? (this._x = Math.atan2(f, d), this._z = Math.atan2(o, r)) : (this._x = 0, this._z = Math.atan2(-s, l));
        break;
      case "YZX":
        this._z = Math.asin(ke(o, -1, 1)), Math.abs(o) < 0.9999999 ? (this._x = Math.atan2(-c, l), this._y = Math.atan2(-u, r)) : (this._x = 0, this._y = Math.atan2(a, d));
        break;
      case "XZY":
        this._z = Math.asin(-ke(s, -1, 1)), Math.abs(s) < 0.9999999 ? (this._x = Math.atan2(f, l), this._y = Math.atan2(a, r)) : (this._x = Math.atan2(-c, d), this._y = 0);
        break;
      default:
        console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + A);
    }
    return this._order = A, t === !0 && this._onChangeCallback(), this;
  }
  setFromQuaternion(e, A, t) {
    return Ac.makeRotationFromQuaternion(e), this.setFromRotationMatrix(Ac, A, t);
  }
  setFromVector3(e, A = this._order) {
    return this.set(e.x, e.y, e.z, A);
  }
  reorder(e) {
    return tc.setFromEuler(this), this.setFromQuaternion(tc, e);
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order;
  }
  fromArray(e) {
    return this._x = e[0], this._y = e[1], this._z = e[2], e[3] !== void 0 && (this._order = e[3]), this._onChangeCallback(), this;
  }
  toArray(e = [], A = 0) {
    return e[A] = this._x, e[A + 1] = this._y, e[A + 2] = this._z, e[A + 3] = this._order, e;
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
}
Vt.DEFAULT_ORDER = "XYZ";
class xl {
  constructor() {
    this.mask = 1;
  }
  set(e) {
    this.mask = (1 << e | 0) >>> 0;
  }
  enable(e) {
    this.mask |= 1 << e | 0;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(e) {
    this.mask ^= 1 << e | 0;
  }
  disable(e) {
    this.mask &= ~(1 << e | 0);
  }
  disableAll() {
    this.mask = 0;
  }
  test(e) {
    return (this.mask & e.mask) !== 0;
  }
  isEnabled(e) {
    return (this.mask & (1 << e | 0)) !== 0;
  }
}
let wp = 0;
const nc = /* @__PURE__ */ new Q(), Kn = /* @__PURE__ */ new Rn(), Tt = /* @__PURE__ */ new uA(), wr = /* @__PURE__ */ new Q(), Ti = /* @__PURE__ */ new Q(), _p = /* @__PURE__ */ new Q(), vp = /* @__PURE__ */ new Rn(), ic = /* @__PURE__ */ new Q(1, 0, 0), rc = /* @__PURE__ */ new Q(0, 1, 0), sc = /* @__PURE__ */ new Q(0, 0, 1), ac = { type: "added" }, Cp = { type: "removed" }, zn = { type: "childadded", child: null }, ua = { type: "childremoved", child: null };
class TA extends Dn {
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: wp++ }), this.uuid = ir(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = TA.DEFAULT_UP.clone();
    const e = new Q(), A = new Vt(), t = new Rn(), i = new Q(1, 1, 1);
    function r() {
      t.setFromEuler(A, !1);
    }
    function s() {
      A.setFromQuaternion(t, void 0, !1);
    }
    A._onChange(r), t._onChange(s), Object.defineProperties(this, {
      position: {
        configurable: !0,
        enumerable: !0,
        value: e
      },
      rotation: {
        configurable: !0,
        enumerable: !0,
        value: A
      },
      quaternion: {
        configurable: !0,
        enumerable: !0,
        value: t
      },
      scale: {
        configurable: !0,
        enumerable: !0,
        value: i
      },
      modelViewMatrix: {
        value: new uA()
      },
      normalMatrix: {
        value: new He()
      }
    }), this.matrix = new uA(), this.matrixWorld = new uA(), this.matrixAutoUpdate = TA.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = TA.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new xl(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.userData = {};
  }
  onBeforeShadow() {
  }
  onAfterShadow() {
  }
  onBeforeRender() {
  }
  onAfterRender() {
  }
  applyMatrix4(e) {
    this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(e), this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  applyQuaternion(e) {
    return this.quaternion.premultiply(e), this;
  }
  setRotationFromAxisAngle(e, A) {
    this.quaternion.setFromAxisAngle(e, A);
  }
  setRotationFromEuler(e) {
    this.quaternion.setFromEuler(e, !0);
  }
  setRotationFromMatrix(e) {
    this.quaternion.setFromRotationMatrix(e);
  }
  setRotationFromQuaternion(e) {
    this.quaternion.copy(e);
  }
  rotateOnAxis(e, A) {
    return Kn.setFromAxisAngle(e, A), this.quaternion.multiply(Kn), this;
  }
  rotateOnWorldAxis(e, A) {
    return Kn.setFromAxisAngle(e, A), this.quaternion.premultiply(Kn), this;
  }
  rotateX(e) {
    return this.rotateOnAxis(ic, e);
  }
  rotateY(e) {
    return this.rotateOnAxis(rc, e);
  }
  rotateZ(e) {
    return this.rotateOnAxis(sc, e);
  }
  translateOnAxis(e, A) {
    return nc.copy(e).applyQuaternion(this.quaternion), this.position.add(nc.multiplyScalar(A)), this;
  }
  translateX(e) {
    return this.translateOnAxis(ic, e);
  }
  translateY(e) {
    return this.translateOnAxis(rc, e);
  }
  translateZ(e) {
    return this.translateOnAxis(sc, e);
  }
  localToWorld(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(Tt.copy(this.matrixWorld).invert());
  }
  lookAt(e, A, t) {
    e.isVector3 ? wr.copy(e) : wr.set(e, A, t);
    const i = this.parent;
    this.updateWorldMatrix(!0, !1), Ti.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? Tt.lookAt(Ti, wr, this.up) : Tt.lookAt(wr, Ti, this.up), this.quaternion.setFromRotationMatrix(Tt), i && (Tt.extractRotation(i.matrixWorld), Kn.setFromRotationMatrix(Tt), this.quaternion.premultiply(Kn.invert()));
  }
  add(e) {
    if (arguments.length > 1) {
      for (let A = 0; A < arguments.length; A++)
        this.add(arguments[A]);
      return this;
    }
    return e === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", e), this) : (e && e.isObject3D ? (e.removeFromParent(), e.parent = this, this.children.push(e), e.dispatchEvent(ac), zn.child = e, this.dispatchEvent(zn), zn.child = null) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", e), this);
  }
  remove(e) {
    if (arguments.length > 1) {
      for (let t = 0; t < arguments.length; t++)
        this.remove(arguments[t]);
      return this;
    }
    const A = this.children.indexOf(e);
    return A !== -1 && (e.parent = null, this.children.splice(A, 1), e.dispatchEvent(Cp), ua.child = e, this.dispatchEvent(ua), ua.child = null), this;
  }
  removeFromParent() {
    const e = this.parent;
    return e !== null && e.remove(this), this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(e) {
    return this.updateWorldMatrix(!0, !1), Tt.copy(this.matrixWorld).invert(), e.parent !== null && (e.parent.updateWorldMatrix(!0, !1), Tt.multiply(e.parent.matrixWorld)), e.applyMatrix4(Tt), e.removeFromParent(), e.parent = this, this.children.push(e), e.updateWorldMatrix(!1, !0), e.dispatchEvent(ac), zn.child = e, this.dispatchEvent(zn), zn.child = null, this;
  }
  getObjectById(e) {
    return this.getObjectByProperty("id", e);
  }
  getObjectByName(e) {
    return this.getObjectByProperty("name", e);
  }
  getObjectByProperty(e, A) {
    if (this[e] === A) return this;
    for (let t = 0, i = this.children.length; t < i; t++) {
      const s = this.children[t].getObjectByProperty(e, A);
      if (s !== void 0)
        return s;
    }
  }
  getObjectsByProperty(e, A, t = []) {
    this[e] === A && t.push(this);
    const i = this.children;
    for (let r = 0, s = i.length; r < s; r++)
      i[r].getObjectsByProperty(e, A, t);
    return t;
  }
  getWorldPosition(e) {
    return this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld);
  }
  getWorldQuaternion(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Ti, e, _p), e;
  }
  getWorldScale(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Ti, vp, e), e;
  }
  getWorldDirection(e) {
    this.updateWorldMatrix(!0, !1);
    const A = this.matrixWorld.elements;
    return e.set(A[8], A[9], A[10]).normalize();
  }
  raycast() {
  }
  traverse(e) {
    e(this);
    const A = this.children;
    for (let t = 0, i = A.length; t < i; t++)
      A[t].traverse(e);
  }
  traverseVisible(e) {
    if (this.visible === !1) return;
    e(this);
    const A = this.children;
    for (let t = 0, i = A.length; t < i; t++)
      A[t].traverseVisible(e);
  }
  traverseAncestors(e) {
    const A = this.parent;
    A !== null && (e(A), A.traverseAncestors(e));
  }
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0;
  }
  updateMatrixWorld(e) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || e) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, e = !0);
    const A = this.children;
    for (let t = 0, i = A.length; t < i; t++)
      A[t].updateMatrixWorld(e);
  }
  updateWorldMatrix(e, A) {
    const t = this.parent;
    if (e === !0 && t !== null && t.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), A === !0) {
      const i = this.children;
      for (let r = 0, s = i.length; r < s; r++)
        i[r].updateWorldMatrix(!1, !0);
    }
  }
  toJSON(e) {
    const A = e === void 0 || typeof e == "string", t = {};
    A && (e = {
      geometries: {},
      materials: {},
      textures: {},
      images: {},
      shapes: {},
      skeletons: {},
      animations: {},
      nodes: {}
    }, t.metadata = {
      version: 4.6,
      type: "Object",
      generator: "Object3D.toJSON"
    });
    const i = {};
    i.uuid = this.uuid, i.type = this.type, this.name !== "" && (i.name = this.name), this.castShadow === !0 && (i.castShadow = !0), this.receiveShadow === !0 && (i.receiveShadow = !0), this.visible === !1 && (i.visible = !1), this.frustumCulled === !1 && (i.frustumCulled = !1), this.renderOrder !== 0 && (i.renderOrder = this.renderOrder), Object.keys(this.userData).length > 0 && (i.userData = this.userData), i.layers = this.layers.mask, i.matrix = this.matrix.toArray(), i.up = this.up.toArray(), this.matrixAutoUpdate === !1 && (i.matrixAutoUpdate = !1), this.isInstancedMesh && (i.type = "InstancedMesh", i.count = this.count, i.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (i.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (i.type = "BatchedMesh", i.perObjectFrustumCulled = this.perObjectFrustumCulled, i.sortObjects = this.sortObjects, i.drawRanges = this._drawRanges, i.reservedRanges = this._reservedRanges, i.visibility = this._visibility, i.active = this._active, i.bounds = this._bounds.map((a) => ({
      boxInitialized: a.boxInitialized,
      boxMin: a.box.min.toArray(),
      boxMax: a.box.max.toArray(),
      sphereInitialized: a.sphereInitialized,
      sphereRadius: a.sphere.radius,
      sphereCenter: a.sphere.center.toArray()
    })), i.maxInstanceCount = this._maxInstanceCount, i.maxVertexCount = this._maxVertexCount, i.maxIndexCount = this._maxIndexCount, i.geometryInitialized = this._geometryInitialized, i.geometryCount = this._geometryCount, i.matricesTexture = this._matricesTexture.toJSON(e), this._colorsTexture !== null && (i.colorsTexture = this._colorsTexture.toJSON(e)), this.boundingSphere !== null && (i.boundingSphere = {
      center: i.boundingSphere.center.toArray(),
      radius: i.boundingSphere.radius
    }), this.boundingBox !== null && (i.boundingBox = {
      min: i.boundingBox.min.toArray(),
      max: i.boundingBox.max.toArray()
    }));
    function r(a, o) {
      return a[o.uuid] === void 0 && (a[o.uuid] = o.toJSON(e)), o.uuid;
    }
    if (this.isScene)
      this.background && (this.background.isColor ? i.background = this.background.toJSON() : this.background.isTexture && (i.background = this.background.toJSON(e).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (i.environment = this.environment.toJSON(e).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      i.geometry = r(e.geometries, this.geometry);
      const a = this.geometry.parameters;
      if (a !== void 0 && a.shapes !== void 0) {
        const o = a.shapes;
        if (Array.isArray(o))
          for (let l = 0, c = o.length; l < c; l++) {
            const u = o[l];
            r(e.shapes, u);
          }
        else
          r(e.shapes, o);
      }
    }
    if (this.isSkinnedMesh && (i.bindMode = this.bindMode, i.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (r(e.skeletons, this.skeleton), i.skeleton = this.skeleton.uuid)), this.material !== void 0)
      if (Array.isArray(this.material)) {
        const a = [];
        for (let o = 0, l = this.material.length; o < l; o++)
          a.push(r(e.materials, this.material[o]));
        i.material = a;
      } else
        i.material = r(e.materials, this.material);
    if (this.children.length > 0) {
      i.children = [];
      for (let a = 0; a < this.children.length; a++)
        i.children.push(this.children[a].toJSON(e).object);
    }
    if (this.animations.length > 0) {
      i.animations = [];
      for (let a = 0; a < this.animations.length; a++) {
        const o = this.animations[a];
        i.animations.push(r(e.animations, o));
      }
    }
    if (A) {
      const a = s(e.geometries), o = s(e.materials), l = s(e.textures), c = s(e.images), u = s(e.shapes), f = s(e.skeletons), d = s(e.animations), g = s(e.nodes);
      a.length > 0 && (t.geometries = a), o.length > 0 && (t.materials = o), l.length > 0 && (t.textures = l), c.length > 0 && (t.images = c), u.length > 0 && (t.shapes = u), f.length > 0 && (t.skeletons = f), d.length > 0 && (t.animations = d), g.length > 0 && (t.nodes = g);
    }
    return t.object = i, t;
    function s(a) {
      const o = [];
      for (const l in a) {
        const c = a[l];
        delete c.metadata, o.push(c);
      }
      return o;
    }
  }
  clone(e) {
    return new this.constructor().copy(this, e);
  }
  copy(e, A = !0) {
    if (this.name = e.name, this.up.copy(e.up), this.position.copy(e.position), this.rotation.order = e.rotation.order, this.quaternion.copy(e.quaternion), this.scale.copy(e.scale), this.matrix.copy(e.matrix), this.matrixWorld.copy(e.matrixWorld), this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate, this.layers.mask = e.layers.mask, this.visible = e.visible, this.castShadow = e.castShadow, this.receiveShadow = e.receiveShadow, this.frustumCulled = e.frustumCulled, this.renderOrder = e.renderOrder, this.animations = e.animations.slice(), this.userData = JSON.parse(JSON.stringify(e.userData)), A === !0)
      for (let t = 0; t < e.children.length; t++) {
        const i = e.children[t];
        this.add(i.clone());
      }
    return this;
  }
}
TA.DEFAULT_UP = /* @__PURE__ */ new Q(0, 1, 0);
TA.DEFAULT_MATRIX_AUTO_UPDATE = !0;
TA.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
const dt = /* @__PURE__ */ new Q(), Qt = /* @__PURE__ */ new Q(), ha = /* @__PURE__ */ new Q(), It = /* @__PURE__ */ new Q(), Wn = /* @__PURE__ */ new Q(), Xn = /* @__PURE__ */ new Q(), oc = /* @__PURE__ */ new Q(), fa = /* @__PURE__ */ new Q(), da = /* @__PURE__ */ new Q(), pa = /* @__PURE__ */ new Q(), ga = /* @__PURE__ */ new mA(), ma = /* @__PURE__ */ new mA(), Ba = /* @__PURE__ */ new mA();
class at {
  constructor(e = new Q(), A = new Q(), t = new Q()) {
    this.a = e, this.b = A, this.c = t;
  }
  static getNormal(e, A, t, i) {
    i.subVectors(t, A), dt.subVectors(e, A), i.cross(dt);
    const r = i.lengthSq();
    return r > 0 ? i.multiplyScalar(1 / Math.sqrt(r)) : i.set(0, 0, 0);
  }
  // static/instance method to calculate barycentric coordinates
  // based on: http://www.blackpawn.com/texts/pointinpoly/default.html
  static getBarycoord(e, A, t, i, r) {
    dt.subVectors(i, A), Qt.subVectors(t, A), ha.subVectors(e, A);
    const s = dt.dot(dt), a = dt.dot(Qt), o = dt.dot(ha), l = Qt.dot(Qt), c = Qt.dot(ha), u = s * l - a * a;
    if (u === 0)
      return r.set(0, 0, 0), null;
    const f = 1 / u, d = (l * o - a * c) * f, g = (s * c - a * o) * f;
    return r.set(1 - d - g, g, d);
  }
  static containsPoint(e, A, t, i) {
    return this.getBarycoord(e, A, t, i, It) === null ? !1 : It.x >= 0 && It.y >= 0 && It.x + It.y <= 1;
  }
  static getInterpolation(e, A, t, i, r, s, a, o) {
    return this.getBarycoord(e, A, t, i, It) === null ? (o.x = 0, o.y = 0, "z" in o && (o.z = 0), "w" in o && (o.w = 0), null) : (o.setScalar(0), o.addScaledVector(r, It.x), o.addScaledVector(s, It.y), o.addScaledVector(a, It.z), o);
  }
  static getInterpolatedAttribute(e, A, t, i, r, s) {
    return ga.setScalar(0), ma.setScalar(0), Ba.setScalar(0), ga.fromBufferAttribute(e, A), ma.fromBufferAttribute(e, t), Ba.fromBufferAttribute(e, i), s.setScalar(0), s.addScaledVector(ga, r.x), s.addScaledVector(ma, r.y), s.addScaledVector(Ba, r.z), s;
  }
  static isFrontFacing(e, A, t, i) {
    return dt.subVectors(t, A), Qt.subVectors(e, A), dt.cross(Qt).dot(i) < 0;
  }
  set(e, A, t) {
    return this.a.copy(e), this.b.copy(A), this.c.copy(t), this;
  }
  setFromPointsAndIndices(e, A, t, i) {
    return this.a.copy(e[A]), this.b.copy(e[t]), this.c.copy(e[i]), this;
  }
  setFromAttributeAndIndices(e, A, t, i) {
    return this.a.fromBufferAttribute(e, A), this.b.fromBufferAttribute(e, t), this.c.fromBufferAttribute(e, i), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this;
  }
  getArea() {
    return dt.subVectors(this.c, this.b), Qt.subVectors(this.a, this.b), dt.cross(Qt).length() * 0.5;
  }
  getMidpoint(e) {
    return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  getNormal(e) {
    return at.getNormal(this.a, this.b, this.c, e);
  }
  getPlane(e) {
    return e.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(e, A) {
    return at.getBarycoord(e, this.a, this.b, this.c, A);
  }
  getInterpolation(e, A, t, i, r) {
    return at.getInterpolation(e, this.a, this.b, this.c, A, t, i, r);
  }
  containsPoint(e) {
    return at.containsPoint(e, this.a, this.b, this.c);
  }
  isFrontFacing(e) {
    return at.isFrontFacing(this.a, this.b, this.c, e);
  }
  intersectsBox(e) {
    return e.intersectsTriangle(this);
  }
  closestPointToPoint(e, A) {
    const t = this.a, i = this.b, r = this.c;
    let s, a;
    Wn.subVectors(i, t), Xn.subVectors(r, t), fa.subVectors(e, t);
    const o = Wn.dot(fa), l = Xn.dot(fa);
    if (o <= 0 && l <= 0)
      return A.copy(t);
    da.subVectors(e, i);
    const c = Wn.dot(da), u = Xn.dot(da);
    if (c >= 0 && u <= c)
      return A.copy(i);
    const f = o * u - c * l;
    if (f <= 0 && o >= 0 && c <= 0)
      return s = o / (o - c), A.copy(t).addScaledVector(Wn, s);
    pa.subVectors(e, r);
    const d = Wn.dot(pa), g = Xn.dot(pa);
    if (g >= 0 && d <= g)
      return A.copy(r);
    const m = d * l - o * g;
    if (m <= 0 && l >= 0 && g <= 0)
      return a = l / (l - g), A.copy(t).addScaledVector(Xn, a);
    const p = c * g - d * u;
    if (p <= 0 && u - c >= 0 && d - g >= 0)
      return oc.subVectors(r, i), a = (u - c) / (u - c + (d - g)), A.copy(i).addScaledVector(oc, a);
    const h = 1 / (p + m + f);
    return s = m * h, a = f * h, A.copy(t).addScaledVector(Wn, s).addScaledVector(Xn, a);
  }
  equals(e) {
    return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c);
  }
}
const Eh = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
}, Yt = { h: 0, s: 0, l: 0 }, _r = { h: 0, s: 0, l: 0 };
function wa(n, e, A) {
  return A < 0 && (A += 1), A > 1 && (A -= 1), A < 1 / 6 ? n + (e - n) * 6 * A : A < 1 / 2 ? e : A < 2 / 3 ? n + (e - n) * 6 * (2 / 3 - A) : n;
}
class Ye {
  constructor(e, A, t) {
    return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(e, A, t);
  }
  set(e, A, t) {
    if (A === void 0 && t === void 0) {
      const i = e;
      i && i.isColor ? this.copy(i) : typeof i == "number" ? this.setHex(i) : typeof i == "string" && this.setStyle(i);
    } else
      this.setRGB(e, A, t);
    return this;
  }
  setScalar(e) {
    return this.r = e, this.g = e, this.b = e, this;
  }
  setHex(e, A = it) {
    return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (e & 255) / 255, Xe.toWorkingColorSpace(this, A), this;
  }
  setRGB(e, A, t, i = Xe.workingColorSpace) {
    return this.r = e, this.g = A, this.b = t, Xe.toWorkingColorSpace(this, i), this;
  }
  setHSL(e, A, t, i = Xe.workingColorSpace) {
    if (e = ip(e, 1), A = ke(A, 0, 1), t = ke(t, 0, 1), A === 0)
      this.r = this.g = this.b = t;
    else {
      const r = t <= 0.5 ? t * (1 + A) : t + A - t * A, s = 2 * t - r;
      this.r = wa(s, r, e + 1 / 3), this.g = wa(s, r, e), this.b = wa(s, r, e - 1 / 3);
    }
    return Xe.toWorkingColorSpace(this, i), this;
  }
  setStyle(e, A = it) {
    function t(r) {
      r !== void 0 && parseFloat(r) < 1 && console.warn("THREE.Color: Alpha component of " + e + " will be ignored.");
    }
    let i;
    if (i = /^(\w+)\(([^\)]*)\)/.exec(e)) {
      let r;
      const s = i[1], a = i[2];
      switch (s) {
        case "rgb":
        case "rgba":
          if (r = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))
            return t(r[4]), this.setRGB(
              Math.min(255, parseInt(r[1], 10)) / 255,
              Math.min(255, parseInt(r[2], 10)) / 255,
              Math.min(255, parseInt(r[3], 10)) / 255,
              A
            );
          if (r = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))
            return t(r[4]), this.setRGB(
              Math.min(100, parseInt(r[1], 10)) / 100,
              Math.min(100, parseInt(r[2], 10)) / 100,
              Math.min(100, parseInt(r[3], 10)) / 100,
              A
            );
          break;
        case "hsl":
        case "hsla":
          if (r = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))
            return t(r[4]), this.setHSL(
              parseFloat(r[1]) / 360,
              parseFloat(r[2]) / 100,
              parseFloat(r[3]) / 100,
              A
            );
          break;
        default:
          console.warn("THREE.Color: Unknown color model " + e);
      }
    } else if (i = /^\#([A-Fa-f\d]+)$/.exec(e)) {
      const r = i[1], s = r.length;
      if (s === 3)
        return this.setRGB(
          parseInt(r.charAt(0), 16) / 15,
          parseInt(r.charAt(1), 16) / 15,
          parseInt(r.charAt(2), 16) / 15,
          A
        );
      if (s === 6)
        return this.setHex(parseInt(r, 16), A);
      console.warn("THREE.Color: Invalid hex color " + e);
    } else if (e && e.length > 0)
      return this.setColorName(e, A);
    return this;
  }
  setColorName(e, A = it) {
    const t = Eh[e.toLowerCase()];
    return t !== void 0 ? this.setHex(t, A) : console.warn("THREE.Color: Unknown color " + e), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(e) {
    return this.r = e.r, this.g = e.g, this.b = e.b, this;
  }
  copySRGBToLinear(e) {
    return this.r = Nt(e.r), this.g = Nt(e.g), this.b = Nt(e.b), this;
  }
  copyLinearToSRGB(e) {
    return this.r = di(e.r), this.g = di(e.g), this.b = di(e.b), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(e = it) {
    return Xe.fromWorkingColorSpace(LA.copy(this), e), Math.round(ke(LA.r * 255, 0, 255)) * 65536 + Math.round(ke(LA.g * 255, 0, 255)) * 256 + Math.round(ke(LA.b * 255, 0, 255));
  }
  getHexString(e = it) {
    return ("000000" + this.getHex(e).toString(16)).slice(-6);
  }
  getHSL(e, A = Xe.workingColorSpace) {
    Xe.fromWorkingColorSpace(LA.copy(this), A);
    const t = LA.r, i = LA.g, r = LA.b, s = Math.max(t, i, r), a = Math.min(t, i, r);
    let o, l;
    const c = (a + s) / 2;
    if (a === s)
      o = 0, l = 0;
    else {
      const u = s - a;
      switch (l = c <= 0.5 ? u / (s + a) : u / (2 - s - a), s) {
        case t:
          o = (i - r) / u + (i < r ? 6 : 0);
          break;
        case i:
          o = (r - t) / u + 2;
          break;
        case r:
          o = (t - i) / u + 4;
          break;
      }
      o /= 6;
    }
    return e.h = o, e.s = l, e.l = c, e;
  }
  getRGB(e, A = Xe.workingColorSpace) {
    return Xe.fromWorkingColorSpace(LA.copy(this), A), e.r = LA.r, e.g = LA.g, e.b = LA.b, e;
  }
  getStyle(e = it) {
    Xe.fromWorkingColorSpace(LA.copy(this), e);
    const A = LA.r, t = LA.g, i = LA.b;
    return e !== it ? `color(${e} ${A.toFixed(3)} ${t.toFixed(3)} ${i.toFixed(3)})` : `rgb(${Math.round(A * 255)},${Math.round(t * 255)},${Math.round(i * 255)})`;
  }
  offsetHSL(e, A, t) {
    return this.getHSL(Yt), this.setHSL(Yt.h + e, Yt.s + A, Yt.l + t);
  }
  add(e) {
    return this.r += e.r, this.g += e.g, this.b += e.b, this;
  }
  addColors(e, A) {
    return this.r = e.r + A.r, this.g = e.g + A.g, this.b = e.b + A.b, this;
  }
  addScalar(e) {
    return this.r += e, this.g += e, this.b += e, this;
  }
  sub(e) {
    return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this;
  }
  multiply(e) {
    return this.r *= e.r, this.g *= e.g, this.b *= e.b, this;
  }
  multiplyScalar(e) {
    return this.r *= e, this.g *= e, this.b *= e, this;
  }
  lerp(e, A) {
    return this.r += (e.r - this.r) * A, this.g += (e.g - this.g) * A, this.b += (e.b - this.b) * A, this;
  }
  lerpColors(e, A, t) {
    return this.r = e.r + (A.r - e.r) * t, this.g = e.g + (A.g - e.g) * t, this.b = e.b + (A.b - e.b) * t, this;
  }
  lerpHSL(e, A) {
    this.getHSL(Yt), e.getHSL(_r);
    const t = ta(Yt.h, _r.h, A), i = ta(Yt.s, _r.s, A), r = ta(Yt.l, _r.l, A);
    return this.setHSL(t, i, r), this;
  }
  setFromVector3(e) {
    return this.r = e.x, this.g = e.y, this.b = e.z, this;
  }
  applyMatrix3(e) {
    const A = this.r, t = this.g, i = this.b, r = e.elements;
    return this.r = r[0] * A + r[3] * t + r[6] * i, this.g = r[1] * A + r[4] * t + r[7] * i, this.b = r[2] * A + r[5] * t + r[8] * i, this;
  }
  equals(e) {
    return e.r === this.r && e.g === this.g && e.b === this.b;
  }
  fromArray(e, A = 0) {
    return this.r = e[A], this.g = e[A + 1], this.b = e[A + 2], this;
  }
  toArray(e = [], A = 0) {
    return e[A] = this.r, e[A + 1] = this.g, e[A + 2] = this.b, e;
  }
  fromBufferAttribute(e, A) {
    return this.r = e.getX(A), this.g = e.getY(A), this.b = e.getZ(A), this;
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
}
const LA = /* @__PURE__ */ new Ye();
Ye.NAMES = Eh;
let Ep = 0;
class sr extends Dn {
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: Ep++ }), this.uuid = ir(), this.name = "", this.type = "Material", this.blending = hi, this.side = ln, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = ro, this.blendDst = so, this.blendEquation = xn, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new Ye(0, 0, 0), this.blendAlpha = 0, this.depthFunc = mi, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = Yl, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = Pn, this.stencilZFail = Pn, this.stencilZPass = Pn, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(e) {
    this._alphaTest > 0 != e > 0 && this.version++, this._alphaTest = e;
  }
  // onBeforeRender and onBeforeCompile only supported in WebGLRenderer
  onBeforeRender() {
  }
  onBeforeCompile() {
  }
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  setValues(e) {
    if (e !== void 0)
      for (const A in e) {
        const t = e[A];
        if (t === void 0) {
          console.warn(`THREE.Material: parameter '${A}' has value of undefined.`);
          continue;
        }
        const i = this[A];
        if (i === void 0) {
          console.warn(`THREE.Material: '${A}' is not a property of THREE.${this.type}.`);
          continue;
        }
        i && i.isColor ? i.set(t) : i && i.isVector3 && t && t.isVector3 ? i.copy(t) : this[A] = t;
      }
  }
  toJSON(e) {
    const A = e === void 0 || typeof e == "string";
    A && (e = {
      textures: {},
      images: {}
    });
    const t = {
      metadata: {
        version: 4.6,
        type: "Material",
        generator: "Material.toJSON"
      }
    };
    t.uuid = this.uuid, t.type = this.type, this.name !== "" && (t.name = this.name), this.color && this.color.isColor && (t.color = this.color.getHex()), this.roughness !== void 0 && (t.roughness = this.roughness), this.metalness !== void 0 && (t.metalness = this.metalness), this.sheen !== void 0 && (t.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (t.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (t.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (t.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1 && (t.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (t.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (t.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (t.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (t.shininess = this.shininess), this.clearcoat !== void 0 && (t.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (t.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (t.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (t.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (t.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, t.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.dispersion !== void 0 && (t.dispersion = this.dispersion), this.iridescence !== void 0 && (t.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (t.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (t.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (t.iridescenceMap = this.iridescenceMap.toJSON(e).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (t.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid), this.anisotropy !== void 0 && (t.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (t.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (t.anisotropyMap = this.anisotropyMap.toJSON(e).uuid), this.map && this.map.isTexture && (t.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (t.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (t.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (t.lightMap = this.lightMap.toJSON(e).uuid, t.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (t.aoMap = this.aoMap.toJSON(e).uuid, t.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (t.bumpMap = this.bumpMap.toJSON(e).uuid, t.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (t.normalMap = this.normalMap.toJSON(e).uuid, t.normalMapType = this.normalMapType, t.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (t.displacementMap = this.displacementMap.toJSON(e).uuid, t.displacementScale = this.displacementScale, t.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (t.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (t.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (t.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (t.specularMap = this.specularMap.toJSON(e).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (t.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid), this.specularColorMap && this.specularColorMap.isTexture && (t.specularColorMap = this.specularColorMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (t.envMap = this.envMap.toJSON(e).uuid, this.combine !== void 0 && (t.combine = this.combine)), this.envMapRotation !== void 0 && (t.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (t.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (t.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (t.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (t.gradientMap = this.gradientMap.toJSON(e).uuid), this.transmission !== void 0 && (t.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (t.transmissionMap = this.transmissionMap.toJSON(e).uuid), this.thickness !== void 0 && (t.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (t.thicknessMap = this.thicknessMap.toJSON(e).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (t.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (t.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (t.size = this.size), this.shadowSide !== null && (t.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (t.sizeAttenuation = this.sizeAttenuation), this.blending !== hi && (t.blending = this.blending), this.side !== ln && (t.side = this.side), this.vertexColors === !0 && (t.vertexColors = !0), this.opacity < 1 && (t.opacity = this.opacity), this.transparent === !0 && (t.transparent = !0), this.blendSrc !== ro && (t.blendSrc = this.blendSrc), this.blendDst !== so && (t.blendDst = this.blendDst), this.blendEquation !== xn && (t.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (t.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (t.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (t.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (t.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (t.blendAlpha = this.blendAlpha), this.depthFunc !== mi && (t.depthFunc = this.depthFunc), this.depthTest === !1 && (t.depthTest = this.depthTest), this.depthWrite === !1 && (t.depthWrite = this.depthWrite), this.colorWrite === !1 && (t.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (t.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== Yl && (t.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (t.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (t.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== Pn && (t.stencilFail = this.stencilFail), this.stencilZFail !== Pn && (t.stencilZFail = this.stencilZFail), this.stencilZPass !== Pn && (t.stencilZPass = this.stencilZPass), this.stencilWrite === !0 && (t.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (t.rotation = this.rotation), this.polygonOffset === !0 && (t.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (t.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (t.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (t.linewidth = this.linewidth), this.dashSize !== void 0 && (t.dashSize = this.dashSize), this.gapSize !== void 0 && (t.gapSize = this.gapSize), this.scale !== void 0 && (t.scale = this.scale), this.dithering === !0 && (t.dithering = !0), this.alphaTest > 0 && (t.alphaTest = this.alphaTest), this.alphaHash === !0 && (t.alphaHash = !0), this.alphaToCoverage === !0 && (t.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (t.premultipliedAlpha = !0), this.forceSinglePass === !0 && (t.forceSinglePass = !0), this.wireframe === !0 && (t.wireframe = !0), this.wireframeLinewidth > 1 && (t.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (t.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (t.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (t.flatShading = !0), this.visible === !1 && (t.visible = !1), this.toneMapped === !1 && (t.toneMapped = !1), this.fog === !1 && (t.fog = !1), Object.keys(this.userData).length > 0 && (t.userData = this.userData);
    function i(r) {
      const s = [];
      for (const a in r) {
        const o = r[a];
        delete o.metadata, s.push(o);
      }
      return s;
    }
    if (A) {
      const r = i(e.textures), s = i(e.images);
      r.length > 0 && (t.textures = r), s.length > 0 && (t.images = s);
    }
    return t;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.name = e.name, this.blending = e.blending, this.side = e.side, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.blendColor.copy(e.blendColor), this.blendAlpha = e.blendAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.stencilWriteMask = e.stencilWriteMask, this.stencilFunc = e.stencilFunc, this.stencilRef = e.stencilRef, this.stencilFuncMask = e.stencilFuncMask, this.stencilFail = e.stencilFail, this.stencilZFail = e.stencilZFail, this.stencilZPass = e.stencilZPass, this.stencilWrite = e.stencilWrite;
    const A = e.clippingPlanes;
    let t = null;
    if (A !== null) {
      const i = A.length;
      t = new Array(i);
      for (let r = 0; r !== i; ++r)
        t[r] = A[r].clone();
    }
    return this.clippingPlanes = t, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.alphaHash = e.alphaHash, this.alphaToCoverage = e.alphaToCoverage, this.premultipliedAlpha = e.premultipliedAlpha, this.forceSinglePass = e.forceSinglePass, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  onBuild() {
    console.warn("Material: onBuild() has been removed.");
  }
}
class pi extends sr {
  constructor(e) {
    super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new Ye(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Vt(), this.combine = ah, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this;
  }
}
const wA = /* @__PURE__ */ new Q(), vr = /* @__PURE__ */ new Pe();
class xt {
  constructor(e, A, t = !1) {
    if (Array.isArray(e))
      throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, this.name = "", this.array = e, this.itemSize = A, this.count = e !== void 0 ? e.length / A : 0, this.normalized = t, this.usage = Jl, this.updateRanges = [], this.gpuType = Ht, this.version = 0;
  }
  onUploadCallback() {
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  setUsage(e) {
    return this.usage = e, this;
  }
  addUpdateRange(e, A) {
    this.updateRanges.push({ start: e, count: A });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(e) {
    return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this.gpuType = e.gpuType, this;
  }
  copyAt(e, A, t) {
    e *= this.itemSize, t *= A.itemSize;
    for (let i = 0, r = this.itemSize; i < r; i++)
      this.array[e + i] = A.array[t + i];
    return this;
  }
  copyArray(e) {
    return this.array.set(e), this;
  }
  applyMatrix3(e) {
    if (this.itemSize === 2)
      for (let A = 0, t = this.count; A < t; A++)
        vr.fromBufferAttribute(this, A), vr.applyMatrix3(e), this.setXY(A, vr.x, vr.y);
    else if (this.itemSize === 3)
      for (let A = 0, t = this.count; A < t; A++)
        wA.fromBufferAttribute(this, A), wA.applyMatrix3(e), this.setXYZ(A, wA.x, wA.y, wA.z);
    return this;
  }
  applyMatrix4(e) {
    for (let A = 0, t = this.count; A < t; A++)
      wA.fromBufferAttribute(this, A), wA.applyMatrix4(e), this.setXYZ(A, wA.x, wA.y, wA.z);
    return this;
  }
  applyNormalMatrix(e) {
    for (let A = 0, t = this.count; A < t; A++)
      wA.fromBufferAttribute(this, A), wA.applyNormalMatrix(e), this.setXYZ(A, wA.x, wA.y, wA.z);
    return this;
  }
  transformDirection(e) {
    for (let A = 0, t = this.count; A < t; A++)
      wA.fromBufferAttribute(this, A), wA.transformDirection(e), this.setXYZ(A, wA.x, wA.y, wA.z);
    return this;
  }
  set(e, A = 0) {
    return this.array.set(e, A), this;
  }
  getComponent(e, A) {
    let t = this.array[e * this.itemSize + A];
    return this.normalized && (t = Mi(t, this.array)), t;
  }
  setComponent(e, A, t) {
    return this.normalized && (t = VA(t, this.array)), this.array[e * this.itemSize + A] = t, this;
  }
  getX(e) {
    let A = this.array[e * this.itemSize];
    return this.normalized && (A = Mi(A, this.array)), A;
  }
  setX(e, A) {
    return this.normalized && (A = VA(A, this.array)), this.array[e * this.itemSize] = A, this;
  }
  getY(e) {
    let A = this.array[e * this.itemSize + 1];
    return this.normalized && (A = Mi(A, this.array)), A;
  }
  setY(e, A) {
    return this.normalized && (A = VA(A, this.array)), this.array[e * this.itemSize + 1] = A, this;
  }
  getZ(e) {
    let A = this.array[e * this.itemSize + 2];
    return this.normalized && (A = Mi(A, this.array)), A;
  }
  setZ(e, A) {
    return this.normalized && (A = VA(A, this.array)), this.array[e * this.itemSize + 2] = A, this;
  }
  getW(e) {
    let A = this.array[e * this.itemSize + 3];
    return this.normalized && (A = Mi(A, this.array)), A;
  }
  setW(e, A) {
    return this.normalized && (A = VA(A, this.array)), this.array[e * this.itemSize + 3] = A, this;
  }
  setXY(e, A, t) {
    return e *= this.itemSize, this.normalized && (A = VA(A, this.array), t = VA(t, this.array)), this.array[e + 0] = A, this.array[e + 1] = t, this;
  }
  setXYZ(e, A, t, i) {
    return e *= this.itemSize, this.normalized && (A = VA(A, this.array), t = VA(t, this.array), i = VA(i, this.array)), this.array[e + 0] = A, this.array[e + 1] = t, this.array[e + 2] = i, this;
  }
  setXYZW(e, A, t, i, r) {
    return e *= this.itemSize, this.normalized && (A = VA(A, this.array), t = VA(t, this.array), i = VA(i, this.array), r = VA(r, this.array)), this.array[e + 0] = A, this.array[e + 1] = t, this.array[e + 2] = i, this.array[e + 3] = r, this;
  }
  onUpload(e) {
    return this.onUploadCallback = e, this;
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    const e = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized
    };
    return this.name !== "" && (e.name = this.name), this.usage !== Jl && (e.usage = this.usage), e;
  }
}
class xh extends xt {
  constructor(e, A, t) {
    super(new Uint16Array(e), A, t);
  }
}
class Uh extends xt {
  constructor(e, A, t) {
    super(new Uint32Array(e), A, t);
  }
}
class QA extends xt {
  constructor(e, A, t) {
    super(new Float32Array(e), A, t);
  }
}
let xp = 0;
const tt = /* @__PURE__ */ new uA(), _a = /* @__PURE__ */ new TA(), Yn = /* @__PURE__ */ new Q(), qA = /* @__PURE__ */ new rr(), Qi = /* @__PURE__ */ new rr(), UA = /* @__PURE__ */ new Q();
class $A extends Dn {
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: xp++ }), this.uuid = ir(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {};
  }
  getIndex() {
    return this.index;
  }
  setIndex(e) {
    return Array.isArray(e) ? this.index = new (_h(e) ? Uh : xh)(e, 1) : this.index = e, this;
  }
  setIndirect(e) {
    return this.indirect = e, this;
  }
  getIndirect() {
    return this.indirect;
  }
  getAttribute(e) {
    return this.attributes[e];
  }
  setAttribute(e, A) {
    return this.attributes[e] = A, this;
  }
  deleteAttribute(e) {
    return delete this.attributes[e], this;
  }
  hasAttribute(e) {
    return this.attributes[e] !== void 0;
  }
  addGroup(e, A, t = 0) {
    this.groups.push({
      start: e,
      count: A,
      materialIndex: t
    });
  }
  clearGroups() {
    this.groups = [];
  }
  setDrawRange(e, A) {
    this.drawRange.start = e, this.drawRange.count = A;
  }
  applyMatrix4(e) {
    const A = this.attributes.position;
    A !== void 0 && (A.applyMatrix4(e), A.needsUpdate = !0);
    const t = this.attributes.normal;
    if (t !== void 0) {
      const r = new He().getNormalMatrix(e);
      t.applyNormalMatrix(r), t.needsUpdate = !0;
    }
    const i = this.attributes.tangent;
    return i !== void 0 && (i.transformDirection(e), i.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
  }
  applyQuaternion(e) {
    return tt.makeRotationFromQuaternion(e), this.applyMatrix4(tt), this;
  }
  rotateX(e) {
    return tt.makeRotationX(e), this.applyMatrix4(tt), this;
  }
  rotateY(e) {
    return tt.makeRotationY(e), this.applyMatrix4(tt), this;
  }
  rotateZ(e) {
    return tt.makeRotationZ(e), this.applyMatrix4(tt), this;
  }
  translate(e, A, t) {
    return tt.makeTranslation(e, A, t), this.applyMatrix4(tt), this;
  }
  scale(e, A, t) {
    return tt.makeScale(e, A, t), this.applyMatrix4(tt), this;
  }
  lookAt(e) {
    return _a.lookAt(e), _a.updateMatrix(), this.applyMatrix4(_a.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(Yn).negate(), this.translate(Yn.x, Yn.y, Yn.z), this;
  }
  setFromPoints(e) {
    const A = this.getAttribute("position");
    if (A === void 0) {
      const t = [];
      for (let i = 0, r = e.length; i < r; i++) {
        const s = e[i];
        t.push(s.x, s.y, s.z || 0);
      }
      this.setAttribute("position", new QA(t, 3));
    } else {
      const t = Math.min(e.length, A.count);
      for (let i = 0; i < t; i++) {
        const r = e[i];
        A.setXYZ(i, r.x, r.y, r.z || 0);
      }
      e.length > A.count && console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), A.needsUpdate = !0;
    }
    return this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new rr());
    const e = this.attributes.position, A = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(
        new Q(-1 / 0, -1 / 0, -1 / 0),
        new Q(1 / 0, 1 / 0, 1 / 0)
      );
      return;
    }
    if (e !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(e), A)
        for (let t = 0, i = A.length; t < i; t++) {
          const r = A[t];
          qA.setFromBufferAttribute(r), this.morphTargetsRelative ? (UA.addVectors(this.boundingBox.min, qA.min), this.boundingBox.expandByPoint(UA), UA.addVectors(this.boundingBox.max, qA.max), this.boundingBox.expandByPoint(UA)) : (this.boundingBox.expandByPoint(qA.min), this.boundingBox.expandByPoint(qA.max));
        }
    } else
      this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new Os());
    const e = this.attributes.position, A = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new Q(), 1 / 0);
      return;
    }
    if (e) {
      const t = this.boundingSphere.center;
      if (qA.setFromBufferAttribute(e), A)
        for (let r = 0, s = A.length; r < s; r++) {
          const a = A[r];
          Qi.setFromBufferAttribute(a), this.morphTargetsRelative ? (UA.addVectors(qA.min, Qi.min), qA.expandByPoint(UA), UA.addVectors(qA.max, Qi.max), qA.expandByPoint(UA)) : (qA.expandByPoint(Qi.min), qA.expandByPoint(Qi.max));
        }
      qA.getCenter(t);
      let i = 0;
      for (let r = 0, s = e.count; r < s; r++)
        UA.fromBufferAttribute(e, r), i = Math.max(i, t.distanceToSquared(UA));
      if (A)
        for (let r = 0, s = A.length; r < s; r++) {
          const a = A[r], o = this.morphTargetsRelative;
          for (let l = 0, c = a.count; l < c; l++)
            UA.fromBufferAttribute(a, l), o && (Yn.fromBufferAttribute(e, l), UA.add(Yn)), i = Math.max(i, t.distanceToSquared(UA));
        }
      this.boundingSphere.radius = Math.sqrt(i), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
    }
  }
  computeTangents() {
    const e = this.index, A = this.attributes;
    if (e === null || A.position === void 0 || A.normal === void 0 || A.uv === void 0) {
      console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const t = A.position, i = A.normal, r = A.uv;
    this.hasAttribute("tangent") === !1 && this.setAttribute("tangent", new xt(new Float32Array(4 * t.count), 4));
    const s = this.getAttribute("tangent"), a = [], o = [];
    for (let F = 0; F < t.count; F++)
      a[F] = new Q(), o[F] = new Q();
    const l = new Q(), c = new Q(), u = new Q(), f = new Pe(), d = new Pe(), g = new Pe(), m = new Q(), p = new Q();
    function h(F, _, v) {
      l.fromBufferAttribute(t, F), c.fromBufferAttribute(t, _), u.fromBufferAttribute(t, v), f.fromBufferAttribute(r, F), d.fromBufferAttribute(r, _), g.fromBufferAttribute(r, v), c.sub(l), u.sub(l), d.sub(f), g.sub(f);
      const b = 1 / (d.x * g.y - g.x * d.y);
      isFinite(b) && (m.copy(c).multiplyScalar(g.y).addScaledVector(u, -d.y).multiplyScalar(b), p.copy(u).multiplyScalar(d.x).addScaledVector(c, -g.x).multiplyScalar(b), a[F].add(m), a[_].add(m), a[v].add(m), o[F].add(p), o[_].add(p), o[v].add(p));
    }
    let E = this.groups;
    E.length === 0 && (E = [{
      start: 0,
      count: e.count
    }]);
    for (let F = 0, _ = E.length; F < _; ++F) {
      const v = E[F], b = v.start, H = v.count;
      for (let R = b, N = b + H; R < N; R += 3)
        h(
          e.getX(R + 0),
          e.getX(R + 1),
          e.getX(R + 2)
        );
    }
    const U = new Q(), B = new Q(), S = new Q(), x = new Q();
    function M(F) {
      S.fromBufferAttribute(i, F), x.copy(S);
      const _ = a[F];
      U.copy(_), U.sub(S.multiplyScalar(S.dot(_))).normalize(), B.crossVectors(x, _);
      const b = B.dot(o[F]) < 0 ? -1 : 1;
      s.setXYZW(F, U.x, U.y, U.z, b);
    }
    for (let F = 0, _ = E.length; F < _; ++F) {
      const v = E[F], b = v.start, H = v.count;
      for (let R = b, N = b + H; R < N; R += 3)
        M(e.getX(R + 0)), M(e.getX(R + 1)), M(e.getX(R + 2));
    }
  }
  computeVertexNormals() {
    const e = this.index, A = this.getAttribute("position");
    if (A !== void 0) {
      let t = this.getAttribute("normal");
      if (t === void 0)
        t = new xt(new Float32Array(A.count * 3), 3), this.setAttribute("normal", t);
      else
        for (let f = 0, d = t.count; f < d; f++)
          t.setXYZ(f, 0, 0, 0);
      const i = new Q(), r = new Q(), s = new Q(), a = new Q(), o = new Q(), l = new Q(), c = new Q(), u = new Q();
      if (e)
        for (let f = 0, d = e.count; f < d; f += 3) {
          const g = e.getX(f + 0), m = e.getX(f + 1), p = e.getX(f + 2);
          i.fromBufferAttribute(A, g), r.fromBufferAttribute(A, m), s.fromBufferAttribute(A, p), c.subVectors(s, r), u.subVectors(i, r), c.cross(u), a.fromBufferAttribute(t, g), o.fromBufferAttribute(t, m), l.fromBufferAttribute(t, p), a.add(c), o.add(c), l.add(c), t.setXYZ(g, a.x, a.y, a.z), t.setXYZ(m, o.x, o.y, o.z), t.setXYZ(p, l.x, l.y, l.z);
        }
      else
        for (let f = 0, d = A.count; f < d; f += 3)
          i.fromBufferAttribute(A, f + 0), r.fromBufferAttribute(A, f + 1), s.fromBufferAttribute(A, f + 2), c.subVectors(s, r), u.subVectors(i, r), c.cross(u), t.setXYZ(f + 0, c.x, c.y, c.z), t.setXYZ(f + 1, c.x, c.y, c.z), t.setXYZ(f + 2, c.x, c.y, c.z);
      this.normalizeNormals(), t.needsUpdate = !0;
    }
  }
  normalizeNormals() {
    const e = this.attributes.normal;
    for (let A = 0, t = e.count; A < t; A++)
      UA.fromBufferAttribute(e, A), UA.normalize(), e.setXYZ(A, UA.x, UA.y, UA.z);
  }
  toNonIndexed() {
    function e(a, o) {
      const l = a.array, c = a.itemSize, u = a.normalized, f = new l.constructor(o.length * c);
      let d = 0, g = 0;
      for (let m = 0, p = o.length; m < p; m++) {
        a.isInterleavedBufferAttribute ? d = o[m] * a.data.stride + a.offset : d = o[m] * c;
        for (let h = 0; h < c; h++)
          f[g++] = l[d++];
      }
      return new xt(f, c, u);
    }
    if (this.index === null)
      return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const A = new $A(), t = this.index.array, i = this.attributes;
    for (const a in i) {
      const o = i[a], l = e(o, t);
      A.setAttribute(a, l);
    }
    const r = this.morphAttributes;
    for (const a in r) {
      const o = [], l = r[a];
      for (let c = 0, u = l.length; c < u; c++) {
        const f = l[c], d = e(f, t);
        o.push(d);
      }
      A.morphAttributes[a] = o;
    }
    A.morphTargetsRelative = this.morphTargetsRelative;
    const s = this.groups;
    for (let a = 0, o = s.length; a < o; a++) {
      const l = s[a];
      A.addGroup(l.start, l.count, l.materialIndex);
    }
    return A;
  }
  toJSON() {
    const e = {
      metadata: {
        version: 4.6,
        type: "BufferGeometry",
        generator: "BufferGeometry.toJSON"
      }
    };
    if (e.uuid = this.uuid, e.type = this.type, this.name !== "" && (e.name = this.name), Object.keys(this.userData).length > 0 && (e.userData = this.userData), this.parameters !== void 0) {
      const o = this.parameters;
      for (const l in o)
        o[l] !== void 0 && (e[l] = o[l]);
      return e;
    }
    e.data = { attributes: {} };
    const A = this.index;
    A !== null && (e.data.index = {
      type: A.array.constructor.name,
      array: Array.prototype.slice.call(A.array)
    });
    const t = this.attributes;
    for (const o in t) {
      const l = t[o];
      e.data.attributes[o] = l.toJSON(e.data);
    }
    const i = {};
    let r = !1;
    for (const o in this.morphAttributes) {
      const l = this.morphAttributes[o], c = [];
      for (let u = 0, f = l.length; u < f; u++) {
        const d = l[u];
        c.push(d.toJSON(e.data));
      }
      c.length > 0 && (i[o] = c, r = !0);
    }
    r && (e.data.morphAttributes = i, e.data.morphTargetsRelative = this.morphTargetsRelative);
    const s = this.groups;
    s.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(s)));
    const a = this.boundingSphere;
    return a !== null && (e.data.boundingSphere = {
      center: a.center.toArray(),
      radius: a.radius
    }), e;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
    const A = {};
    this.name = e.name;
    const t = e.index;
    t !== null && this.setIndex(t.clone(A));
    const i = e.attributes;
    for (const l in i) {
      const c = i[l];
      this.setAttribute(l, c.clone(A));
    }
    const r = e.morphAttributes;
    for (const l in r) {
      const c = [], u = r[l];
      for (let f = 0, d = u.length; f < d; f++)
        c.push(u[f].clone(A));
      this.morphAttributes[l] = c;
    }
    this.morphTargetsRelative = e.morphTargetsRelative;
    const s = e.groups;
    for (let l = 0, c = s.length; l < c; l++) {
      const u = s[l];
      this.addGroup(u.start, u.count, u.materialIndex);
    }
    const a = e.boundingBox;
    a !== null && (this.boundingBox = a.clone());
    const o = e.boundingSphere;
    return o !== null && (this.boundingSphere = o.clone()), this.drawRange.start = e.drawRange.start, this.drawRange.count = e.drawRange.count, this.userData = e.userData, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
const lc = /* @__PURE__ */ new uA(), gn = /* @__PURE__ */ new Gs(), Cr = /* @__PURE__ */ new Os(), cc = /* @__PURE__ */ new Q(), Er = /* @__PURE__ */ new Q(), xr = /* @__PURE__ */ new Q(), Ur = /* @__PURE__ */ new Q(), va = /* @__PURE__ */ new Q(), yr = /* @__PURE__ */ new Q(), uc = /* @__PURE__ */ new Q(), Sr = /* @__PURE__ */ new Q();
class jA extends TA {
  constructor(e = new $A(), A = new pi()) {
    super(), this.isMesh = !0, this.type = "Mesh", this.geometry = e, this.material = A, this.updateMorphTargets();
  }
  copy(e, A) {
    return super.copy(e, A), e.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = e.morphTargetInfluences.slice()), e.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
  }
  updateMorphTargets() {
    const A = this.geometry.morphAttributes, t = Object.keys(A);
    if (t.length > 0) {
      const i = A[t[0]];
      if (i !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let r = 0, s = i.length; r < s; r++) {
          const a = i[r].name || String(r);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[a] = r;
        }
      }
    }
  }
  getVertexPosition(e, A) {
    const t = this.geometry, i = t.attributes.position, r = t.morphAttributes.position, s = t.morphTargetsRelative;
    A.fromBufferAttribute(i, e);
    const a = this.morphTargetInfluences;
    if (r && a) {
      yr.set(0, 0, 0);
      for (let o = 0, l = r.length; o < l; o++) {
        const c = a[o], u = r[o];
        c !== 0 && (va.fromBufferAttribute(u, e), s ? yr.addScaledVector(va, c) : yr.addScaledVector(va.sub(A), c));
      }
      A.add(yr);
    }
    return A;
  }
  raycast(e, A) {
    const t = this.geometry, i = this.material, r = this.matrixWorld;
    i !== void 0 && (t.boundingSphere === null && t.computeBoundingSphere(), Cr.copy(t.boundingSphere), Cr.applyMatrix4(r), gn.copy(e.ray).recast(e.near), !(Cr.containsPoint(gn.origin) === !1 && (gn.intersectSphere(Cr, cc) === null || gn.origin.distanceToSquared(cc) > (e.far - e.near) ** 2)) && (lc.copy(r).invert(), gn.copy(e.ray).applyMatrix4(lc), !(t.boundingBox !== null && gn.intersectsBox(t.boundingBox) === !1) && this._computeIntersections(e, A, gn)));
  }
  _computeIntersections(e, A, t) {
    let i;
    const r = this.geometry, s = this.material, a = r.index, o = r.attributes.position, l = r.attributes.uv, c = r.attributes.uv1, u = r.attributes.normal, f = r.groups, d = r.drawRange;
    if (a !== null)
      if (Array.isArray(s))
        for (let g = 0, m = f.length; g < m; g++) {
          const p = f[g], h = s[p.materialIndex], E = Math.max(p.start, d.start), U = Math.min(a.count, Math.min(p.start + p.count, d.start + d.count));
          for (let B = E, S = U; B < S; B += 3) {
            const x = a.getX(B), M = a.getX(B + 1), F = a.getX(B + 2);
            i = Mr(this, h, e, t, l, c, u, x, M, F), i && (i.faceIndex = Math.floor(B / 3), i.face.materialIndex = p.materialIndex, A.push(i));
          }
        }
      else {
        const g = Math.max(0, d.start), m = Math.min(a.count, d.start + d.count);
        for (let p = g, h = m; p < h; p += 3) {
          const E = a.getX(p), U = a.getX(p + 1), B = a.getX(p + 2);
          i = Mr(this, s, e, t, l, c, u, E, U, B), i && (i.faceIndex = Math.floor(p / 3), A.push(i));
        }
      }
    else if (o !== void 0)
      if (Array.isArray(s))
        for (let g = 0, m = f.length; g < m; g++) {
          const p = f[g], h = s[p.materialIndex], E = Math.max(p.start, d.start), U = Math.min(o.count, Math.min(p.start + p.count, d.start + d.count));
          for (let B = E, S = U; B < S; B += 3) {
            const x = B, M = B + 1, F = B + 2;
            i = Mr(this, h, e, t, l, c, u, x, M, F), i && (i.faceIndex = Math.floor(B / 3), i.face.materialIndex = p.materialIndex, A.push(i));
          }
        }
      else {
        const g = Math.max(0, d.start), m = Math.min(o.count, d.start + d.count);
        for (let p = g, h = m; p < h; p += 3) {
          const E = p, U = p + 1, B = p + 2;
          i = Mr(this, s, e, t, l, c, u, E, U, B), i && (i.faceIndex = Math.floor(p / 3), A.push(i));
        }
      }
  }
}
function Up(n, e, A, t, i, r, s, a) {
  let o;
  if (e.side === zA ? o = t.intersectTriangle(s, r, i, !0, a) : o = t.intersectTriangle(i, r, s, e.side === ln, a), o === null) return null;
  Sr.copy(a), Sr.applyMatrix4(n.matrixWorld);
  const l = A.ray.origin.distanceTo(Sr);
  return l < A.near || l > A.far ? null : {
    distance: l,
    point: Sr.clone(),
    object: n
  };
}
function Mr(n, e, A, t, i, r, s, a, o, l) {
  n.getVertexPosition(a, Er), n.getVertexPosition(o, xr), n.getVertexPosition(l, Ur);
  const c = Up(n, e, A, t, Er, xr, Ur, uc);
  if (c) {
    const u = new Q();
    at.getBarycoord(uc, Er, xr, Ur, u), i && (c.uv = at.getInterpolatedAttribute(i, a, o, l, u, new Pe())), r && (c.uv1 = at.getInterpolatedAttribute(r, a, o, l, u, new Pe())), s && (c.normal = at.getInterpolatedAttribute(s, a, o, l, u, new Q()), c.normal.dot(t.direction) > 0 && c.normal.multiplyScalar(-1));
    const f = {
      a,
      b: o,
      c: l,
      normal: new Q(),
      materialIndex: 0
    };
    at.getNormal(Er, xr, Ur, f.normal), c.face = f, c.barycoord = u;
  }
  return c;
}
class Ln extends $A {
  constructor(e = 1, A = 1, t = 1, i = 1, r = 1, s = 1) {
    super(), this.type = "BoxGeometry", this.parameters = {
      width: e,
      height: A,
      depth: t,
      widthSegments: i,
      heightSegments: r,
      depthSegments: s
    };
    const a = this;
    i = Math.floor(i), r = Math.floor(r), s = Math.floor(s);
    const o = [], l = [], c = [], u = [];
    let f = 0, d = 0;
    g("z", "y", "x", -1, -1, t, A, e, s, r, 0), g("z", "y", "x", 1, -1, t, A, -e, s, r, 1), g("x", "z", "y", 1, 1, e, t, A, i, s, 2), g("x", "z", "y", 1, -1, e, t, -A, i, s, 3), g("x", "y", "z", 1, -1, e, A, t, i, r, 4), g("x", "y", "z", -1, -1, e, A, -t, i, r, 5), this.setIndex(o), this.setAttribute("position", new QA(l, 3)), this.setAttribute("normal", new QA(c, 3)), this.setAttribute("uv", new QA(u, 2));
    function g(m, p, h, E, U, B, S, x, M, F, _) {
      const v = B / M, b = S / F, H = B / 2, R = S / 2, N = x / 2, Y = M + 1, k = F + 1;
      let Z = 0, K = 0;
      const ne = new Q();
      for (let oe = 0; oe < k; oe++) {
        const Be = oe * b - R;
        for (let Fe = 0; Fe < Y; Fe++) {
          const Re = Fe * v - H;
          ne[m] = Re * E, ne[p] = Be * U, ne[h] = N, l.push(ne.x, ne.y, ne.z), ne[m] = 0, ne[p] = 0, ne[h] = x > 0 ? 1 : -1, c.push(ne.x, ne.y, ne.z), u.push(Fe / M), u.push(1 - oe / F), Z += 1;
        }
      }
      for (let oe = 0; oe < F; oe++)
        for (let Be = 0; Be < M; Be++) {
          const Fe = f + Be + Y * oe, Re = f + Be + Y * (oe + 1), W = f + (Be + 1) + Y * (oe + 1), ee = f + (Be + 1) + Y * oe;
          o.push(Fe, Re, ee), o.push(Re, W, ee), K += 6;
        }
      a.addGroup(d, K, _), d += K, f += Z;
    }
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new Ln(e.width, e.height, e.depth, e.widthSegments, e.heightSegments, e.depthSegments);
  }
}
function Ei(n) {
  const e = {};
  for (const A in n) {
    e[A] = {};
    for (const t in n[A]) {
      const i = n[A][t];
      i && (i.isColor || i.isMatrix3 || i.isMatrix4 || i.isVector2 || i.isVector3 || i.isVector4 || i.isTexture || i.isQuaternion) ? i.isRenderTargetTexture ? (console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), e[A][t] = null) : e[A][t] = i.clone() : Array.isArray(i) ? e[A][t] = i.slice() : e[A][t] = i;
    }
  }
  return e;
}
function NA(n) {
  const e = {};
  for (let A = 0; A < n.length; A++) {
    const t = Ei(n[A]);
    for (const i in t)
      e[i] = t[i];
  }
  return e;
}
function yp(n) {
  const e = [];
  for (let A = 0; A < n.length; A++)
    e.push(n[A].clone());
  return e;
}
function yh(n) {
  const e = n.getRenderTarget();
  return e === null ? n.outputColorSpace : e.isXRRenderTarget === !0 ? e.texture.colorSpace : Xe.workingColorSpace;
}
const Sp = { clone: Ei, merge: NA };
var Mp = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, Fp = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
class cn extends sr {
  constructor(e) {
    super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = Mp, this.fragmentShader = Fp, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
      clipCullDistance: !1,
      // set to use vertex shader clipping
      multiDraw: !1
      // set to use vertex shader multi_draw / enable gl_DrawID
    }, this.defaultAttributeValues = {
      color: [1, 1, 1],
      uv: [0, 0],
      uv1: [0, 0]
    }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, e !== void 0 && this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = Ei(e.uniforms), this.uniformsGroups = yp(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this;
  }
  toJSON(e) {
    const A = super.toJSON(e);
    A.glslVersion = this.glslVersion, A.uniforms = {};
    for (const i in this.uniforms) {
      const s = this.uniforms[i].value;
      s && s.isTexture ? A.uniforms[i] = {
        type: "t",
        value: s.toJSON(e).uuid
      } : s && s.isColor ? A.uniforms[i] = {
        type: "c",
        value: s.getHex()
      } : s && s.isVector2 ? A.uniforms[i] = {
        type: "v2",
        value: s.toArray()
      } : s && s.isVector3 ? A.uniforms[i] = {
        type: "v3",
        value: s.toArray()
      } : s && s.isVector4 ? A.uniforms[i] = {
        type: "v4",
        value: s.toArray()
      } : s && s.isMatrix3 ? A.uniforms[i] = {
        type: "m3",
        value: s.toArray()
      } : s && s.isMatrix4 ? A.uniforms[i] = {
        type: "m4",
        value: s.toArray()
      } : A.uniforms[i] = {
        value: s
      };
    }
    Object.keys(this.defines).length > 0 && (A.defines = this.defines), A.vertexShader = this.vertexShader, A.fragmentShader = this.fragmentShader, A.lights = this.lights, A.clipping = this.clipping;
    const t = {};
    for (const i in this.extensions)
      this.extensions[i] === !0 && (t[i] = !0);
    return Object.keys(t).length > 0 && (A.extensions = t), A;
  }
}
class Sh extends TA {
  constructor() {
    super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new uA(), this.projectionMatrix = new uA(), this.projectionMatrixInverse = new uA(), this.coordinateSystem = Pt;
  }
  copy(e, A) {
    return super.copy(e, A), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this.coordinateSystem = e.coordinateSystem, this;
  }
  getWorldDirection(e) {
    return super.getWorldDirection(e).negate();
  }
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  updateWorldMatrix(e, A) {
    super.updateWorldMatrix(e, A), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const Jt = /* @__PURE__ */ new Q(), hc = /* @__PURE__ */ new Pe(), fc = /* @__PURE__ */ new Pe();
class rt extends Sh {
  constructor(e = 50, A = 1, t = 0.1, i = 2e3) {
    super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = e, this.zoom = 1, this.near = t, this.far = i, this.focus = 10, this.aspect = A, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
  }
  copy(e, A) {
    return super.copy(e, A), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = e.view === null ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this;
  }
  /**
   * Sets the FOV by focal length in respect to the current .filmGauge.
   *
   * The default film gauge is 35, so that the focal length can be specified for
   * a 35mm (full frame) camera.
   *
   * @param {number} focalLength - Values for focal length and film gauge must have the same unit.
   */
  setFocalLength(e) {
    const A = 0.5 * this.getFilmHeight() / e;
    this.fov = zo * 2 * Math.atan(A), this.updateProjectionMatrix();
  }
  /**
   * Calculates the focal length from the current .fov and .filmGauge.
   *
   * @returns {number}
   */
  getFocalLength() {
    const e = Math.tan(Wi * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / e;
  }
  getEffectiveFOV() {
    return zo * 2 * Math.atan(
      Math.tan(Wi * 0.5 * this.fov) / this.zoom
    );
  }
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  /**
   * Computes the 2D bounds of the camera's viewable rectangle at a given distance along the viewing direction.
   * Sets minTarget and maxTarget to the coordinates of the lower-left and upper-right corners of the view rectangle.
   *
   * @param {number} distance
   * @param {Vector2} minTarget
   * @param {Vector2} maxTarget
   */
  getViewBounds(e, A, t) {
    Jt.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse), A.set(Jt.x, Jt.y).multiplyScalar(-e / Jt.z), Jt.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse), t.set(Jt.x, Jt.y).multiplyScalar(-e / Jt.z);
  }
  /**
   * Computes the width and height of the camera's viewable rectangle at a given distance along the viewing direction.
   *
   * @param {number} distance
   * @param {Vector2} target - Vector2 target used to store result where x is width and y is height.
   * @returns {Vector2}
   */
  getViewSize(e, A) {
    return this.getViewBounds(e, hc, fc), A.subVectors(fc, hc);
  }
  /**
   * Sets an offset in a larger frustum. This is useful for multi-window or
   * multi-monitor/multi-machine setups.
   *
   * For example, if you have 3x2 monitors and each monitor is 1920x1080 and
   * the monitors are in grid like this
   *
   *   +---+---+---+
   *   | A | B | C |
   *   +---+---+---+
   *   | D | E | F |
   *   +---+---+---+
   *
   * then for each monitor you would call it like this
   *
   *   const w = 1920;
   *   const h = 1080;
   *   const fullWidth = w * 3;
   *   const fullHeight = h * 2;
   *
   *   --A--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
   *   --B--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
   *   --C--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
   *   --D--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
   *   --E--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
   *   --F--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
   *
   *   Note there is no reason monitors have to be the same size or in a grid.
   *
   * @param {number} fullWidth
   * @param {number} fullHeight
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   */
  setViewOffset(e, A, t, i, r, s) {
    this.aspect = e / A, this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = A, this.view.offsetX = t, this.view.offsetY = i, this.view.width = r, this.view.height = s, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = this.near;
    let A = e * Math.tan(Wi * 0.5 * this.fov) / this.zoom, t = 2 * A, i = this.aspect * t, r = -0.5 * i;
    const s = this.view;
    if (this.view !== null && this.view.enabled) {
      const o = s.fullWidth, l = s.fullHeight;
      r += s.offsetX * i / o, A -= s.offsetY * t / l, i *= s.width / o, t *= s.height / l;
    }
    const a = this.filmOffset;
    a !== 0 && (r += e * a / this.getFilmWidth()), this.projectionMatrix.makePerspective(r, r + i, A, A - t, e, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const A = super.toJSON(e);
    return A.object.fov = this.fov, A.object.zoom = this.zoom, A.object.near = this.near, A.object.far = this.far, A.object.focus = this.focus, A.object.aspect = this.aspect, this.view !== null && (A.object.view = Object.assign({}, this.view)), A.object.filmGauge = this.filmGauge, A.object.filmOffset = this.filmOffset, A;
  }
}
const Jn = -90, qn = 1;
class bp extends TA {
  constructor(e, A, t) {
    super(), this.type = "CubeCamera", this.renderTarget = t, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const i = new rt(Jn, qn, e, A);
    i.layers = this.layers, this.add(i);
    const r = new rt(Jn, qn, e, A);
    r.layers = this.layers, this.add(r);
    const s = new rt(Jn, qn, e, A);
    s.layers = this.layers, this.add(s);
    const a = new rt(Jn, qn, e, A);
    a.layers = this.layers, this.add(a);
    const o = new rt(Jn, qn, e, A);
    o.layers = this.layers, this.add(o);
    const l = new rt(Jn, qn, e, A);
    l.layers = this.layers, this.add(l);
  }
  updateCoordinateSystem() {
    const e = this.coordinateSystem, A = this.children.concat(), [t, i, r, s, a, o] = A;
    for (const l of A) this.remove(l);
    if (e === Pt)
      t.up.set(0, 1, 0), t.lookAt(1, 0, 0), i.up.set(0, 1, 0), i.lookAt(-1, 0, 0), r.up.set(0, 0, -1), r.lookAt(0, 1, 0), s.up.set(0, 0, 1), s.lookAt(0, -1, 0), a.up.set(0, 1, 0), a.lookAt(0, 0, 1), o.up.set(0, 1, 0), o.lookAt(0, 0, -1);
    else if (e === xs)
      t.up.set(0, -1, 0), t.lookAt(-1, 0, 0), i.up.set(0, -1, 0), i.lookAt(1, 0, 0), r.up.set(0, 0, 1), r.lookAt(0, 1, 0), s.up.set(0, 0, -1), s.lookAt(0, -1, 0), a.up.set(0, -1, 0), a.lookAt(0, 0, 1), o.up.set(0, -1, 0), o.lookAt(0, 0, -1);
    else
      throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + e);
    for (const l of A)
      this.add(l), l.updateMatrixWorld();
  }
  update(e, A) {
    this.parent === null && this.updateMatrixWorld();
    const { renderTarget: t, activeMipmapLevel: i } = this;
    this.coordinateSystem !== e.coordinateSystem && (this.coordinateSystem = e.coordinateSystem, this.updateCoordinateSystem());
    const [r, s, a, o, l, c] = this.children, u = e.getRenderTarget(), f = e.getActiveCubeFace(), d = e.getActiveMipmapLevel(), g = e.xr.enabled;
    e.xr.enabled = !1;
    const m = t.texture.generateMipmaps;
    t.texture.generateMipmaps = !1, e.setRenderTarget(t, 0, i), e.render(A, r), e.setRenderTarget(t, 1, i), e.render(A, s), e.setRenderTarget(t, 2, i), e.render(A, a), e.setRenderTarget(t, 3, i), e.render(A, o), e.setRenderTarget(t, 4, i), e.render(A, l), t.texture.generateMipmaps = m, e.setRenderTarget(t, 5, i), e.render(A, c), e.setRenderTarget(u, f, d), e.xr.enabled = g, t.texture.needsPMREMUpdate = !0;
  }
}
class Mh extends WA {
  constructor(e, A, t, i, r, s, a, o, l, c) {
    e = e !== void 0 ? e : [], A = A !== void 0 ? A : Bi, super(e, A, t, i, r, s, a, o, l, c), this.isCubeTexture = !0, this.flipY = !1;
  }
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}
class Tp extends In {
  constructor(e = 1, A = {}) {
    super(e, e, A), this.isWebGLCubeRenderTarget = !0;
    const t = { width: e, height: e, depth: 1 }, i = [t, t, t, t, t, t];
    this.texture = new Mh(i, A.mapping, A.wrapS, A.wrapT, A.magFilter, A.minFilter, A.format, A.type, A.anisotropy, A.colorSpace), this.texture.isRenderTargetTexture = !0, this.texture.generateMipmaps = A.generateMipmaps !== void 0 ? A.generateMipmaps : !1, this.texture.minFilter = A.minFilter !== void 0 ? A.minFilter : Et;
  }
  fromEquirectangularTexture(e, A) {
    this.texture.type = A.type, this.texture.colorSpace = A.colorSpace, this.texture.generateMipmaps = A.generateMipmaps, this.texture.minFilter = A.minFilter, this.texture.magFilter = A.magFilter;
    const t = {
      uniforms: {
        tEquirect: { value: null }
      },
      vertexShader: (
        /* glsl */
        `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`
      ),
      fragmentShader: (
        /* glsl */
        `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`
      )
    }, i = new Ln(5, 5, 5), r = new cn({
      name: "CubemapFromEquirect",
      uniforms: Ei(t.uniforms),
      vertexShader: t.vertexShader,
      fragmentShader: t.fragmentShader,
      side: zA,
      blending: rn
    });
    r.uniforms.tEquirect.value = A;
    const s = new jA(i, r), a = A.minFilter;
    return A.minFilter === Mn && (A.minFilter = Et), new bp(1, 10, this).update(e, s), A.minFilter = a, s.geometry.dispose(), s.material.dispose(), this;
  }
  clear(e, A, t, i) {
    const r = e.getRenderTarget();
    for (let s = 0; s < 6; s++)
      e.setRenderTarget(this, s), e.clear(A, t, i);
    e.setRenderTarget(r);
  }
}
class Qp extends TA {
  constructor() {
    super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new Vt(), this.environmentIntensity = 1, this.environmentRotation = new Vt(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  copy(e, A) {
    return super.copy(e, A), e.background !== null && (this.background = e.background.clone()), e.environment !== null && (this.environment = e.environment.clone()), e.fog !== null && (this.fog = e.fog.clone()), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, this.backgroundRotation.copy(e.backgroundRotation), this.environmentIntensity = e.environmentIntensity, this.environmentRotation.copy(e.environmentRotation), e.overrideMaterial !== null && (this.overrideMaterial = e.overrideMaterial.clone()), this.matrixAutoUpdate = e.matrixAutoUpdate, this;
  }
  toJSON(e) {
    const A = super.toJSON(e);
    return this.fog !== null && (A.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (A.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (A.object.backgroundIntensity = this.backgroundIntensity), A.object.backgroundRotation = this.backgroundRotation.toArray(), this.environmentIntensity !== 1 && (A.object.environmentIntensity = this.environmentIntensity), A.object.environmentRotation = this.environmentRotation.toArray(), A;
  }
}
const Ca = /* @__PURE__ */ new Q(), Ip = /* @__PURE__ */ new Q(), Rp = /* @__PURE__ */ new He();
class jt {
  constructor(e = new Q(1, 0, 0), A = 0) {
    this.isPlane = !0, this.normal = e, this.constant = A;
  }
  set(e, A) {
    return this.normal.copy(e), this.constant = A, this;
  }
  setComponents(e, A, t, i) {
    return this.normal.set(e, A, t), this.constant = i, this;
  }
  setFromNormalAndCoplanarPoint(e, A) {
    return this.normal.copy(e), this.constant = -A.dot(this.normal), this;
  }
  setFromCoplanarPoints(e, A, t) {
    const i = Ca.subVectors(t, A).cross(Ip.subVectors(e, A)).normalize();
    return this.setFromNormalAndCoplanarPoint(i, e), this;
  }
  copy(e) {
    return this.normal.copy(e.normal), this.constant = e.constant, this;
  }
  normalize() {
    const e = 1 / this.normal.length();
    return this.normal.multiplyScalar(e), this.constant *= e, this;
  }
  negate() {
    return this.constant *= -1, this.normal.negate(), this;
  }
  distanceToPoint(e) {
    return this.normal.dot(e) + this.constant;
  }
  distanceToSphere(e) {
    return this.distanceToPoint(e.center) - e.radius;
  }
  projectPoint(e, A) {
    return A.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e));
  }
  intersectLine(e, A) {
    const t = e.delta(Ca), i = this.normal.dot(t);
    if (i === 0)
      return this.distanceToPoint(e.start) === 0 ? A.copy(e.start) : null;
    const r = -(e.start.dot(this.normal) + this.constant) / i;
    return r < 0 || r > 1 ? null : A.copy(e.start).addScaledVector(t, r);
  }
  intersectsLine(e) {
    const A = this.distanceToPoint(e.start), t = this.distanceToPoint(e.end);
    return A < 0 && t > 0 || t < 0 && A > 0;
  }
  intersectsBox(e) {
    return e.intersectsPlane(this);
  }
  intersectsSphere(e) {
    return e.intersectsPlane(this);
  }
  coplanarPoint(e) {
    return e.copy(this.normal).multiplyScalar(-this.constant);
  }
  applyMatrix4(e, A) {
    const t = A || Rp.getNormalMatrix(e), i = this.coplanarPoint(Ca).applyMatrix4(e), r = this.normal.applyMatrix3(t).normalize();
    return this.constant = -i.dot(r), this;
  }
  translate(e) {
    return this.constant -= e.dot(this.normal), this;
  }
  equals(e) {
    return e.normal.equals(this.normal) && e.constant === this.constant;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const mn = /* @__PURE__ */ new Os(), Fr = /* @__PURE__ */ new Q();
class Fh {
  constructor(e = new jt(), A = new jt(), t = new jt(), i = new jt(), r = new jt(), s = new jt()) {
    this.planes = [e, A, t, i, r, s];
  }
  set(e, A, t, i, r, s) {
    const a = this.planes;
    return a[0].copy(e), a[1].copy(A), a[2].copy(t), a[3].copy(i), a[4].copy(r), a[5].copy(s), this;
  }
  copy(e) {
    const A = this.planes;
    for (let t = 0; t < 6; t++)
      A[t].copy(e.planes[t]);
    return this;
  }
  setFromProjectionMatrix(e, A = Pt) {
    const t = this.planes, i = e.elements, r = i[0], s = i[1], a = i[2], o = i[3], l = i[4], c = i[5], u = i[6], f = i[7], d = i[8], g = i[9], m = i[10], p = i[11], h = i[12], E = i[13], U = i[14], B = i[15];
    if (t[0].setComponents(o - r, f - l, p - d, B - h).normalize(), t[1].setComponents(o + r, f + l, p + d, B + h).normalize(), t[2].setComponents(o + s, f + c, p + g, B + E).normalize(), t[3].setComponents(o - s, f - c, p - g, B - E).normalize(), t[4].setComponents(o - a, f - u, p - m, B - U).normalize(), A === Pt)
      t[5].setComponents(o + a, f + u, p + m, B + U).normalize();
    else if (A === xs)
      t[5].setComponents(a, u, m, U).normalize();
    else
      throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + A);
    return this;
  }
  intersectsObject(e) {
    if (e.boundingSphere !== void 0)
      e.boundingSphere === null && e.computeBoundingSphere(), mn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);
    else {
      const A = e.geometry;
      A.boundingSphere === null && A.computeBoundingSphere(), mn.copy(A.boundingSphere).applyMatrix4(e.matrixWorld);
    }
    return this.intersectsSphere(mn);
  }
  intersectsSprite(e) {
    return mn.center.set(0, 0, 0), mn.radius = 0.7071067811865476, mn.applyMatrix4(e.matrixWorld), this.intersectsSphere(mn);
  }
  intersectsSphere(e) {
    const A = this.planes, t = e.center, i = -e.radius;
    for (let r = 0; r < 6; r++)
      if (A[r].distanceToPoint(t) < i)
        return !1;
    return !0;
  }
  intersectsBox(e) {
    const A = this.planes;
    for (let t = 0; t < 6; t++) {
      const i = A[t];
      if (Fr.x = i.normal.x > 0 ? e.max.x : e.min.x, Fr.y = i.normal.y > 0 ? e.max.y : e.min.y, Fr.z = i.normal.z > 0 ? e.max.z : e.min.z, i.distanceToPoint(Fr) < 0)
        return !1;
    }
    return !0;
  }
  containsPoint(e) {
    const A = this.planes;
    for (let t = 0; t < 6; t++)
      if (A[t].distanceToPoint(e) < 0)
        return !1;
    return !0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class ys extends sr {
  constructor(e) {
    super(), this.isLineBasicMaterial = !0, this.type = "LineBasicMaterial", this.color = new Ye(16777215), this.map = null, this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.linewidth = e.linewidth, this.linecap = e.linecap, this.linejoin = e.linejoin, this.fog = e.fog, this;
  }
}
const Ss = /* @__PURE__ */ new Q(), Ms = /* @__PURE__ */ new Q(), dc = /* @__PURE__ */ new uA(), Ii = /* @__PURE__ */ new Gs(), br = /* @__PURE__ */ new Os(), Ea = /* @__PURE__ */ new Q(), pc = /* @__PURE__ */ new Q();
class Ul extends TA {
  constructor(e = new $A(), A = new ys()) {
    super(), this.isLine = !0, this.type = "Line", this.geometry = e, this.material = A, this.updateMorphTargets();
  }
  copy(e, A) {
    return super.copy(e, A), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
  }
  computeLineDistances() {
    const e = this.geometry;
    if (e.index === null) {
      const A = e.attributes.position, t = [0];
      for (let i = 1, r = A.count; i < r; i++)
        Ss.fromBufferAttribute(A, i - 1), Ms.fromBufferAttribute(A, i), t[i] = t[i - 1], t[i] += Ss.distanceTo(Ms);
      e.setAttribute("lineDistance", new QA(t, 1));
    } else
      console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
  raycast(e, A) {
    const t = this.geometry, i = this.matrixWorld, r = e.params.Line.threshold, s = t.drawRange;
    if (t.boundingSphere === null && t.computeBoundingSphere(), br.copy(t.boundingSphere), br.applyMatrix4(i), br.radius += r, e.ray.intersectsSphere(br) === !1) return;
    dc.copy(i).invert(), Ii.copy(e.ray).applyMatrix4(dc);
    const a = r / ((this.scale.x + this.scale.y + this.scale.z) / 3), o = a * a, l = this.isLineSegments ? 2 : 1, c = t.index, f = t.attributes.position;
    if (c !== null) {
      const d = Math.max(0, s.start), g = Math.min(c.count, s.start + s.count);
      for (let m = d, p = g - 1; m < p; m += l) {
        const h = c.getX(m), E = c.getX(m + 1), U = Tr(this, e, Ii, o, h, E);
        U && A.push(U);
      }
      if (this.isLineLoop) {
        const m = c.getX(g - 1), p = c.getX(d), h = Tr(this, e, Ii, o, m, p);
        h && A.push(h);
      }
    } else {
      const d = Math.max(0, s.start), g = Math.min(f.count, s.start + s.count);
      for (let m = d, p = g - 1; m < p; m += l) {
        const h = Tr(this, e, Ii, o, m, m + 1);
        h && A.push(h);
      }
      if (this.isLineLoop) {
        const m = Tr(this, e, Ii, o, g - 1, d);
        m && A.push(m);
      }
    }
  }
  updateMorphTargets() {
    const A = this.geometry.morphAttributes, t = Object.keys(A);
    if (t.length > 0) {
      const i = A[t[0]];
      if (i !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let r = 0, s = i.length; r < s; r++) {
          const a = i[r].name || String(r);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[a] = r;
        }
      }
    }
  }
}
function Tr(n, e, A, t, i, r) {
  const s = n.geometry.attributes.position;
  if (Ss.fromBufferAttribute(s, i), Ms.fromBufferAttribute(s, r), A.distanceSqToSegment(Ss, Ms, Ea, pc) > t) return;
  Ea.applyMatrix4(n.matrixWorld);
  const o = e.ray.origin.distanceTo(Ea);
  if (!(o < e.near || o > e.far))
    return {
      distance: o,
      // What do we want? intersection point on the ray or on the segment??
      // point: raycaster.ray.at( distance ),
      point: pc.clone().applyMatrix4(n.matrixWorld),
      index: i,
      face: null,
      faceIndex: null,
      barycoord: null,
      object: n
    };
}
const gc = /* @__PURE__ */ new Q(), mc = /* @__PURE__ */ new Q();
class Lp extends Ul {
  constructor(e, A) {
    super(e, A), this.isLineSegments = !0, this.type = "LineSegments";
  }
  computeLineDistances() {
    const e = this.geometry;
    if (e.index === null) {
      const A = e.attributes.position, t = [];
      for (let i = 0, r = A.count; i < r; i += 2)
        gc.fromBufferAttribute(A, i), mc.fromBufferAttribute(A, i + 1), t[i] = i === 0 ? 0 : t[i - 1], t[i + 1] = t[i] + gc.distanceTo(mc);
      e.setAttribute("lineDistance", new QA(t, 1));
    } else
      console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
}
class Qr extends TA {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}
class bh extends WA {
  constructor(e, A, t, i, r, s, a, o, l, c = fi) {
    if (c !== fi && c !== vi)
      throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    t === void 0 && c === fi && (t = Qn), t === void 0 && c === vi && (t = _i), super(null, i, r, s, a, o, c, t, l), this.isDepthTexture = !0, this.image = { width: e, height: A }, this.magFilter = a !== void 0 ? a : Bt, this.minFilter = o !== void 0 ? o : Bt, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
  }
  copy(e) {
    return super.copy(e), this.compareFunction = e.compareFunction, this;
  }
  toJSON(e) {
    const A = super.toJSON(e);
    return this.compareFunction !== null && (A.compareFunction = this.compareFunction), A;
  }
}
class yl extends $A {
  constructor(e = 1, A = 1, t = 1, i = 32, r = 1, s = !1, a = 0, o = Math.PI * 2) {
    super(), this.type = "CylinderGeometry", this.parameters = {
      radiusTop: e,
      radiusBottom: A,
      height: t,
      radialSegments: i,
      heightSegments: r,
      openEnded: s,
      thetaStart: a,
      thetaLength: o
    };
    const l = this;
    i = Math.floor(i), r = Math.floor(r);
    const c = [], u = [], f = [], d = [];
    let g = 0;
    const m = [], p = t / 2;
    let h = 0;
    E(), s === !1 && (e > 0 && U(!0), A > 0 && U(!1)), this.setIndex(c), this.setAttribute("position", new QA(u, 3)), this.setAttribute("normal", new QA(f, 3)), this.setAttribute("uv", new QA(d, 2));
    function E() {
      const B = new Q(), S = new Q();
      let x = 0;
      const M = (A - e) / t;
      for (let F = 0; F <= r; F++) {
        const _ = [], v = F / r, b = v * (A - e) + e;
        for (let H = 0; H <= i; H++) {
          const R = H / i, N = R * o + a, Y = Math.sin(N), k = Math.cos(N);
          S.x = b * Y, S.y = -v * t + p, S.z = b * k, u.push(S.x, S.y, S.z), B.set(Y, M, k).normalize(), f.push(B.x, B.y, B.z), d.push(R, 1 - v), _.push(g++);
        }
        m.push(_);
      }
      for (let F = 0; F < i; F++)
        for (let _ = 0; _ < r; _++) {
          const v = m[_][F], b = m[_ + 1][F], H = m[_ + 1][F + 1], R = m[_][F + 1];
          (e > 0 || _ !== 0) && (c.push(v, b, R), x += 3), (A > 0 || _ !== r - 1) && (c.push(b, H, R), x += 3);
        }
      l.addGroup(h, x, 0), h += x;
    }
    function U(B) {
      const S = g, x = new Pe(), M = new Q();
      let F = 0;
      const _ = B === !0 ? e : A, v = B === !0 ? 1 : -1;
      for (let H = 1; H <= i; H++)
        u.push(0, p * v, 0), f.push(0, v, 0), d.push(0.5, 0.5), g++;
      const b = g;
      for (let H = 0; H <= i; H++) {
        const N = H / i * o + a, Y = Math.cos(N), k = Math.sin(N);
        M.x = _ * k, M.y = p * v, M.z = _ * Y, u.push(M.x, M.y, M.z), f.push(0, v, 0), x.x = Y * 0.5 + 0.5, x.y = k * 0.5 * v + 0.5, d.push(x.x, x.y), g++;
      }
      for (let H = 0; H < i; H++) {
        const R = S + H, N = b + H;
        B === !0 ? c.push(N, N + 1, R) : c.push(N + 1, N, R), F += 3;
      }
      l.addGroup(h, F, B === !0 ? 1 : 2), h += F;
    }
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new yl(e.radiusTop, e.radiusBottom, e.height, e.radialSegments, e.heightSegments, e.openEnded, e.thetaStart, e.thetaLength);
  }
}
const Ir = /* @__PURE__ */ new Q(), Rr = /* @__PURE__ */ new Q(), xa = /* @__PURE__ */ new Q(), Lr = /* @__PURE__ */ new at();
class Dp extends $A {
  constructor(e = null, A = 1) {
    if (super(), this.type = "EdgesGeometry", this.parameters = {
      geometry: e,
      thresholdAngle: A
    }, e !== null) {
      const i = Math.pow(10, 4), r = Math.cos(Wi * A), s = e.getIndex(), a = e.getAttribute("position"), o = s ? s.count : a.count, l = [0, 0, 0], c = ["a", "b", "c"], u = new Array(3), f = {}, d = [];
      for (let g = 0; g < o; g += 3) {
        s ? (l[0] = s.getX(g), l[1] = s.getX(g + 1), l[2] = s.getX(g + 2)) : (l[0] = g, l[1] = g + 1, l[2] = g + 2);
        const { a: m, b: p, c: h } = Lr;
        if (m.fromBufferAttribute(a, l[0]), p.fromBufferAttribute(a, l[1]), h.fromBufferAttribute(a, l[2]), Lr.getNormal(xa), u[0] = `${Math.round(m.x * i)},${Math.round(m.y * i)},${Math.round(m.z * i)}`, u[1] = `${Math.round(p.x * i)},${Math.round(p.y * i)},${Math.round(p.z * i)}`, u[2] = `${Math.round(h.x * i)},${Math.round(h.y * i)},${Math.round(h.z * i)}`, !(u[0] === u[1] || u[1] === u[2] || u[2] === u[0]))
          for (let E = 0; E < 3; E++) {
            const U = (E + 1) % 3, B = u[E], S = u[U], x = Lr[c[E]], M = Lr[c[U]], F = `${B}_${S}`, _ = `${S}_${B}`;
            _ in f && f[_] ? (xa.dot(f[_].normal) <= r && (d.push(x.x, x.y, x.z), d.push(M.x, M.y, M.z)), f[_] = null) : F in f || (f[F] = {
              index0: l[E],
              index1: l[U],
              normal: xa.clone()
            });
          }
      }
      for (const g in f)
        if (f[g]) {
          const { index0: m, index1: p } = f[g];
          Ir.fromBufferAttribute(a, m), Rr.fromBufferAttribute(a, p), d.push(Ir.x, Ir.y, Ir.z), d.push(Rr.x, Rr.y, Rr.z);
        }
      this.setAttribute("position", new QA(d, 3));
    }
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
}
class ar extends $A {
  constructor(e = 1, A = 1, t = 1, i = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: e,
      height: A,
      widthSegments: t,
      heightSegments: i
    };
    const r = e / 2, s = A / 2, a = Math.floor(t), o = Math.floor(i), l = a + 1, c = o + 1, u = e / a, f = A / o, d = [], g = [], m = [], p = [];
    for (let h = 0; h < c; h++) {
      const E = h * f - s;
      for (let U = 0; U < l; U++) {
        const B = U * u - r;
        g.push(B, -E, 0), m.push(0, 0, 1), p.push(U / a), p.push(1 - h / o);
      }
    }
    for (let h = 0; h < o; h++)
      for (let E = 0; E < a; E++) {
        const U = E + l * h, B = E + l * (h + 1), S = E + 1 + l * (h + 1), x = E + 1 + l * h;
        d.push(U, B, x), d.push(B, S, x);
      }
    this.setIndex(d), this.setAttribute("position", new QA(g, 3)), this.setAttribute("normal", new QA(m, 3)), this.setAttribute("uv", new QA(p, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new ar(e.width, e.height, e.widthSegments, e.heightSegments);
  }
}
class Sl extends $A {
  constructor(e = 1, A = 32, t = 16, i = 0, r = Math.PI * 2, s = 0, a = Math.PI) {
    super(), this.type = "SphereGeometry", this.parameters = {
      radius: e,
      widthSegments: A,
      heightSegments: t,
      phiStart: i,
      phiLength: r,
      thetaStart: s,
      thetaLength: a
    }, A = Math.max(3, Math.floor(A)), t = Math.max(2, Math.floor(t));
    const o = Math.min(s + a, Math.PI);
    let l = 0;
    const c = [], u = new Q(), f = new Q(), d = [], g = [], m = [], p = [];
    for (let h = 0; h <= t; h++) {
      const E = [], U = h / t;
      let B = 0;
      h === 0 && s === 0 ? B = 0.5 / A : h === t && o === Math.PI && (B = -0.5 / A);
      for (let S = 0; S <= A; S++) {
        const x = S / A;
        u.x = -e * Math.cos(i + x * r) * Math.sin(s + U * a), u.y = e * Math.cos(s + U * a), u.z = e * Math.sin(i + x * r) * Math.sin(s + U * a), g.push(u.x, u.y, u.z), f.copy(u).normalize(), m.push(f.x, f.y, f.z), p.push(x + B, 1 - U), E.push(l++);
      }
      c.push(E);
    }
    for (let h = 0; h < t; h++)
      for (let E = 0; E < A; E++) {
        const U = c[h][E + 1], B = c[h][E], S = c[h + 1][E], x = c[h + 1][E + 1];
        (h !== 0 || s > 0) && d.push(U, B, x), (h !== t - 1 || o < Math.PI) && d.push(B, S, x);
      }
    this.setIndex(d), this.setAttribute("position", new QA(g, 3)), this.setAttribute("normal", new QA(m, 3)), this.setAttribute("uv", new QA(p, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new Sl(e.radius, e.widthSegments, e.heightSegments, e.phiStart, e.phiLength, e.thetaStart, e.thetaLength);
  }
}
class Hp extends sr {
  constructor(e) {
    super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = Xd, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.depthPacking = e.depthPacking, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this;
  }
}
class Pp extends sr {
  constructor(e) {
    super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this;
  }
}
class Np extends TA {
  constructor(e, A = 1) {
    super(), this.isLight = !0, this.type = "Light", this.color = new Ye(e), this.intensity = A;
  }
  dispose() {
  }
  copy(e, A) {
    return super.copy(e, A), this.color.copy(e.color), this.intensity = e.intensity, this;
  }
  toJSON(e) {
    const A = super.toJSON(e);
    return A.object.color = this.color.getHex(), A.object.intensity = this.intensity, this.groundColor !== void 0 && (A.object.groundColor = this.groundColor.getHex()), this.distance !== void 0 && (A.object.distance = this.distance), this.angle !== void 0 && (A.object.angle = this.angle), this.decay !== void 0 && (A.object.decay = this.decay), this.penumbra !== void 0 && (A.object.penumbra = this.penumbra), this.shadow !== void 0 && (A.object.shadow = this.shadow.toJSON()), this.target !== void 0 && (A.object.target = this.target.uuid), A;
  }
}
class Op extends Sh {
  constructor(e = -1, A = 1, t = 1, i = -1, r = 0.1, s = 2e3) {
    super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = e, this.right = A, this.top = t, this.bottom = i, this.near = r, this.far = s, this.updateProjectionMatrix();
  }
  copy(e, A) {
    return super.copy(e, A), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = e.view === null ? null : Object.assign({}, e.view), this;
  }
  setViewOffset(e, A, t, i, r, s) {
    this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = A, this.view.offsetX = t, this.view.offsetY = i, this.view.width = r, this.view.height = s, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = (this.right - this.left) / (2 * this.zoom), A = (this.top - this.bottom) / (2 * this.zoom), t = (this.right + this.left) / 2, i = (this.top + this.bottom) / 2;
    let r = t - e, s = t + e, a = i + A, o = i - A;
    if (this.view !== null && this.view.enabled) {
      const l = (this.right - this.left) / this.view.fullWidth / this.zoom, c = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      r += l * this.view.offsetX, s = r + l * this.view.width, a -= c * this.view.offsetY, o = a - c * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(r, s, a, o, this.near, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const A = super.toJSON(e);
    return A.object.zoom = this.zoom, A.object.left = this.left, A.object.right = this.right, A.object.top = this.top, A.object.bottom = this.bottom, A.object.near = this.near, A.object.far = this.far, this.view !== null && (A.object.view = Object.assign({}, this.view)), A;
  }
}
class Gp extends Np {
  constructor(e, A) {
    super(e, A), this.isAmbientLight = !0, this.type = "AmbientLight";
  }
}
class Vp extends rt {
  constructor(e = []) {
    super(), this.isArrayCamera = !0, this.cameras = e;
  }
}
const Bc = /* @__PURE__ */ new uA();
class kp {
  constructor(e, A, t = 0, i = 1 / 0) {
    this.ray = new Gs(e, A), this.near = t, this.far = i, this.camera = null, this.layers = new xl(), this.params = {
      Mesh: {},
      Line: { threshold: 1 },
      LOD: {},
      Points: { threshold: 1 },
      Sprite: {}
    };
  }
  set(e, A) {
    this.ray.set(e, A);
  }
  setFromCamera(e, A) {
    A.isPerspectiveCamera ? (this.ray.origin.setFromMatrixPosition(A.matrixWorld), this.ray.direction.set(e.x, e.y, 0.5).unproject(A).sub(this.ray.origin).normalize(), this.camera = A) : A.isOrthographicCamera ? (this.ray.origin.set(e.x, e.y, (A.near + A.far) / (A.near - A.far)).unproject(A), this.ray.direction.set(0, 0, -1).transformDirection(A.matrixWorld), this.camera = A) : console.error("THREE.Raycaster: Unsupported camera type: " + A.type);
  }
  setFromXRController(e) {
    return Bc.identity().extractRotation(e.matrixWorld), this.ray.origin.setFromMatrixPosition(e.matrixWorld), this.ray.direction.set(0, 0, -1).applyMatrix4(Bc), this;
  }
  intersectObject(e, A = !0, t = []) {
    return Wo(e, this, t, A), t.sort(wc), t;
  }
  intersectObjects(e, A = !0, t = []) {
    for (let i = 0, r = e.length; i < r; i++)
      Wo(e[i], this, t, A);
    return t.sort(wc), t;
  }
}
function wc(n, e) {
  return n.distance - e.distance;
}
function Wo(n, e, A, t) {
  let i = !0;
  if (n.layers.test(e.layers) && n.raycast(e, A) === !1 && (i = !1), i === !0 && t === !0) {
    const r = n.children;
    for (let s = 0, a = r.length; s < a; s++)
      Wo(r[s], e, A, !0);
  }
}
class _c {
  constructor(e = 1, A = 0, t = 0) {
    return this.radius = e, this.phi = A, this.theta = t, this;
  }
  set(e, A, t) {
    return this.radius = e, this.phi = A, this.theta = t, this;
  }
  copy(e) {
    return this.radius = e.radius, this.phi = e.phi, this.theta = e.theta, this;
  }
  // restrict phi to be between EPS and PI-EPS
  makeSafe() {
    return this.phi = ke(this.phi, 1e-6, Math.PI - 1e-6), this;
  }
  setFromVector3(e) {
    return this.setFromCartesianCoords(e.x, e.y, e.z);
  }
  setFromCartesianCoords(e, A, t) {
    return this.radius = Math.sqrt(e * e + A * A + t * t), this.radius === 0 ? (this.theta = 0, this.phi = 0) : (this.theta = Math.atan2(e, t), this.phi = Math.acos(ke(A / this.radius, -1, 1))), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const vc = /* @__PURE__ */ new Q();
let Dr, Ua;
class Hr extends TA {
  // dir is assumed to be normalized
  constructor(e = new Q(0, 0, 1), A = new Q(0, 0, 0), t = 1, i = 16776960, r = t * 0.2, s = r * 0.2) {
    super(), this.type = "ArrowHelper", Dr === void 0 && (Dr = new $A(), Dr.setAttribute("position", new QA([0, 0, 0, 0, 1, 0], 3)), Ua = new yl(0, 0.5, 1, 5, 1), Ua.translate(0, -0.5, 0)), this.position.copy(A), this.line = new Ul(Dr, new ys({ color: i, toneMapped: !1 })), this.line.matrixAutoUpdate = !1, this.add(this.line), this.cone = new jA(Ua, new pi({ color: i, toneMapped: !1 })), this.cone.matrixAutoUpdate = !1, this.add(this.cone), this.setDirection(e), this.setLength(t, r, s);
  }
  setDirection(e) {
    if (e.y > 0.99999)
      this.quaternion.set(0, 0, 0, 1);
    else if (e.y < -0.99999)
      this.quaternion.set(1, 0, 0, 0);
    else {
      vc.set(e.z, 0, -e.x).normalize();
      const A = Math.acos(e.y);
      this.quaternion.setFromAxisAngle(vc, A);
    }
  }
  setLength(e, A = e * 0.2, t = A * 0.2) {
    this.line.scale.set(1, Math.max(1e-4, e - A), 1), this.line.updateMatrix(), this.cone.scale.set(t, A, t), this.cone.position.y = e, this.cone.updateMatrix();
  }
  setColor(e) {
    this.line.material.color.set(e), this.cone.material.color.set(e);
  }
  copy(e) {
    return super.copy(e, !1), this.line.copy(e.line), this.cone.copy(e.cone), this;
  }
  dispose() {
    this.line.geometry.dispose(), this.line.material.dispose(), this.cone.geometry.dispose(), this.cone.material.dispose();
  }
}
class Kp extends Dn {
  constructor(e, A = null) {
    super(), this.object = e, this.domElement = A, this.enabled = !0, this.state = -1, this.keys = {}, this.mouseButtons = { LEFT: null, MIDDLE: null, RIGHT: null }, this.touches = { ONE: null, TWO: null };
  }
  connect() {
  }
  disconnect() {
  }
  dispose() {
  }
  update() {
  }
}
function Cc(n, e, A, t) {
  const i = zp(t);
  switch (A) {
    // https://registry.khronos.org/OpenGL-Refpages/es3.0/html/glTexImage2D.xhtml
    case hh:
      return n * e;
    case dh:
      return n * e;
    case ph:
      return n * e * 2;
    case gh:
      return n * e / i.components * i.byteLength;
    case vl:
      return n * e / i.components * i.byteLength;
    case mh:
      return n * e * 2 / i.components * i.byteLength;
    case Cl:
      return n * e * 2 / i.components * i.byteLength;
    case fh:
      return n * e * 3 / i.components * i.byteLength;
    case mt:
      return n * e * 4 / i.components * i.byteLength;
    case El:
      return n * e * 4 / i.components * i.byteLength;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_s3tc_srgb/
    case fs:
    case ds:
      return Math.floor((n + 3) / 4) * Math.floor((e + 3) / 4) * 8;
    case ps:
    case gs:
      return Math.floor((n + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_pvrtc/
    case _o:
    case Co:
      return Math.max(n, 16) * Math.max(e, 8) / 4;
    case wo:
    case vo:
      return Math.max(n, 8) * Math.max(e, 8) / 2;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_etc/
    case Eo:
    case xo:
      return Math.floor((n + 3) / 4) * Math.floor((e + 3) / 4) * 8;
    case Uo:
      return Math.floor((n + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_astc/
    case yo:
      return Math.floor((n + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    case So:
      return Math.floor((n + 4) / 5) * Math.floor((e + 3) / 4) * 16;
    case Mo:
      return Math.floor((n + 4) / 5) * Math.floor((e + 4) / 5) * 16;
    case Fo:
      return Math.floor((n + 5) / 6) * Math.floor((e + 4) / 5) * 16;
    case bo:
      return Math.floor((n + 5) / 6) * Math.floor((e + 5) / 6) * 16;
    case To:
      return Math.floor((n + 7) / 8) * Math.floor((e + 4) / 5) * 16;
    case Qo:
      return Math.floor((n + 7) / 8) * Math.floor((e + 5) / 6) * 16;
    case Io:
      return Math.floor((n + 7) / 8) * Math.floor((e + 7) / 8) * 16;
    case Ro:
      return Math.floor((n + 9) / 10) * Math.floor((e + 4) / 5) * 16;
    case Lo:
      return Math.floor((n + 9) / 10) * Math.floor((e + 5) / 6) * 16;
    case Do:
      return Math.floor((n + 9) / 10) * Math.floor((e + 7) / 8) * 16;
    case Ho:
      return Math.floor((n + 9) / 10) * Math.floor((e + 9) / 10) * 16;
    case Po:
      return Math.floor((n + 11) / 12) * Math.floor((e + 9) / 10) * 16;
    case No:
      return Math.floor((n + 11) / 12) * Math.floor((e + 11) / 12) * 16;
    // https://registry.khronos.org/webgl/extensions/EXT_texture_compression_bptc/
    case ms:
    case Oo:
    case Go:
      return Math.ceil(n / 4) * Math.ceil(e / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/EXT_texture_compression_rgtc/
    case Bh:
    case Vo:
      return Math.ceil(n / 4) * Math.ceil(e / 4) * 8;
    case ko:
    case Ko:
      return Math.ceil(n / 4) * Math.ceil(e / 4) * 16;
  }
  throw new Error(
    `Unable to determine texture byte length for ${A} format.`
  );
}
function zp(n) {
  switch (n) {
    case Gt:
    case lh:
      return { byteLength: 1, components: 1 };
    case $i:
    case ch:
    case nr:
      return { byteLength: 2, components: 1 };
    case wl:
    case _l:
      return { byteLength: 2, components: 4 };
    case Qn:
    case Bl:
    case Ht:
      return { byteLength: 4, components: 1 };
    case uh:
      return { byteLength: 4, components: 3 };
  }
  throw new Error(`Unknown texture type ${n}.`);
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: {
  revision: ml
} }));
typeof window < "u" && (window.__THREE__ ? console.warn("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = ml);
/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
function Th() {
  let n = null, e = !1, A = null, t = null;
  function i(r, s) {
    A(r, s), t = n.requestAnimationFrame(i);
  }
  return {
    start: function() {
      e !== !0 && A !== null && (t = n.requestAnimationFrame(i), e = !0);
    },
    stop: function() {
      n.cancelAnimationFrame(t), e = !1;
    },
    setAnimationLoop: function(r) {
      A = r;
    },
    setContext: function(r) {
      n = r;
    }
  };
}
function Wp(n) {
  const e = /* @__PURE__ */ new WeakMap();
  function A(a, o) {
    const l = a.array, c = a.usage, u = l.byteLength, f = n.createBuffer();
    n.bindBuffer(o, f), n.bufferData(o, l, c), a.onUploadCallback();
    let d;
    if (l instanceof Float32Array)
      d = n.FLOAT;
    else if (l instanceof Uint16Array)
      a.isFloat16BufferAttribute ? d = n.HALF_FLOAT : d = n.UNSIGNED_SHORT;
    else if (l instanceof Int16Array)
      d = n.SHORT;
    else if (l instanceof Uint32Array)
      d = n.UNSIGNED_INT;
    else if (l instanceof Int32Array)
      d = n.INT;
    else if (l instanceof Int8Array)
      d = n.BYTE;
    else if (l instanceof Uint8Array)
      d = n.UNSIGNED_BYTE;
    else if (l instanceof Uint8ClampedArray)
      d = n.UNSIGNED_BYTE;
    else
      throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + l);
    return {
      buffer: f,
      type: d,
      bytesPerElement: l.BYTES_PER_ELEMENT,
      version: a.version,
      size: u
    };
  }
  function t(a, o, l) {
    const c = o.array, u = o.updateRanges;
    if (n.bindBuffer(l, a), u.length === 0)
      n.bufferSubData(l, 0, c);
    else {
      u.sort((d, g) => d.start - g.start);
      let f = 0;
      for (let d = 1; d < u.length; d++) {
        const g = u[f], m = u[d];
        m.start <= g.start + g.count + 1 ? g.count = Math.max(
          g.count,
          m.start + m.count - g.start
        ) : (++f, u[f] = m);
      }
      u.length = f + 1;
      for (let d = 0, g = u.length; d < g; d++) {
        const m = u[d];
        n.bufferSubData(
          l,
          m.start * c.BYTES_PER_ELEMENT,
          c,
          m.start,
          m.count
        );
      }
      o.clearUpdateRanges();
    }
    o.onUploadCallback();
  }
  function i(a) {
    return a.isInterleavedBufferAttribute && (a = a.data), e.get(a);
  }
  function r(a) {
    a.isInterleavedBufferAttribute && (a = a.data);
    const o = e.get(a);
    o && (n.deleteBuffer(o.buffer), e.delete(a));
  }
  function s(a, o) {
    if (a.isInterleavedBufferAttribute && (a = a.data), a.isGLBufferAttribute) {
      const c = e.get(a);
      (!c || c.version < a.version) && e.set(a, {
        buffer: a.buffer,
        type: a.type,
        bytesPerElement: a.elementSize,
        version: a.version
      });
      return;
    }
    const l = e.get(a);
    if (l === void 0)
      e.set(a, A(a, o));
    else if (l.version < a.version) {
      if (l.size !== a.array.byteLength)
        throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
      t(l.buffer, a, o), l.version = a.version;
    }
  }
  return {
    get: i,
    remove: r,
    update: s
  };
}
var Xp = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`, Yp = `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`, Jp = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`, qp = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, Zp = `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`, jp = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`, $p = `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`, eg = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`, Ag = `#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`, tg = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`, ng = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`, ig = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`, rg = `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`, sg = `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`, ag = `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`, og = `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`, lg = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`, cg = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`, ug = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`, hg = `#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`, fg = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`, dg = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`, pg = `#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`, gg = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`, mg = `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`, Bg = `vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`, wg = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`, _g = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`, vg = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`, Cg = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`, Eg = "gl_FragColor = linearToOutputTexel( gl_FragColor );", xg = `vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`, Ug = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`, yg = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`, Sg = `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`, Mg = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`, Fg = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`, bg = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`, Tg = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`, Qg = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`, Ig = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`, Rg = `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`, Lg = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`, Dg = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`, Hg = `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`, Pg = `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`, Ng = `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`, Og = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`, Gg = `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`, Vg = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`, kg = `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`, Kg = `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`, zg = `struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`, Wg = `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`, Xg = `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`, Yg = `#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`, Jg = `#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`, qg = `#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, Zg = `#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, jg = `#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`, $g = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`, em = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`, Am = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`, tm = `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, nm = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`, im = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`, rm = `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`, sm = `#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`, am = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, om = `#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`, lm = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, cm = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`, um = `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`, hm = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, fm = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, dm = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`, pm = `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`, gm = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`, mm = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`, Bm = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`, wm = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`, _m = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`, vm = `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`, Cm = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`, Em = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`, xm = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`, Um = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`, ym = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`, Sm = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`, Mm = `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`, Fm = `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`, bm = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`, Tm = `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`, Qm = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`, Im = `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`, Rm = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`, Lm = `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`, Dm = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`, Hm = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`, Pm = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`, Nm = `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`, Om = `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`, Gm = `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`, Vm = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, km = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, Km = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`, zm = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;
const Wm = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`, Xm = `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Ym = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, Jm = `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, qm = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, Zm = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, jm = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`, $m = `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`, eB = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`, AB = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`, tB = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`, nB = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, iB = `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, rB = `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, sB = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`, aB = `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, oB = `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, lB = `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, cB = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`, uB = `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, hB = `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`, fB = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`, dB = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, pB = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, gB = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`, mB = `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, BB = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, wB = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, _B = `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`, vB = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, CB = `#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, EB = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, xB = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, UB = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, Ne = {
  alphahash_fragment: Xp,
  alphahash_pars_fragment: Yp,
  alphamap_fragment: Jp,
  alphamap_pars_fragment: qp,
  alphatest_fragment: Zp,
  alphatest_pars_fragment: jp,
  aomap_fragment: $p,
  aomap_pars_fragment: eg,
  batching_pars_vertex: Ag,
  batching_vertex: tg,
  begin_vertex: ng,
  beginnormal_vertex: ig,
  bsdfs: rg,
  iridescence_fragment: sg,
  bumpmap_pars_fragment: ag,
  clipping_planes_fragment: og,
  clipping_planes_pars_fragment: lg,
  clipping_planes_pars_vertex: cg,
  clipping_planes_vertex: ug,
  color_fragment: hg,
  color_pars_fragment: fg,
  color_pars_vertex: dg,
  color_vertex: pg,
  common: gg,
  cube_uv_reflection_fragment: mg,
  defaultnormal_vertex: Bg,
  displacementmap_pars_vertex: wg,
  displacementmap_vertex: _g,
  emissivemap_fragment: vg,
  emissivemap_pars_fragment: Cg,
  colorspace_fragment: Eg,
  colorspace_pars_fragment: xg,
  envmap_fragment: Ug,
  envmap_common_pars_fragment: yg,
  envmap_pars_fragment: Sg,
  envmap_pars_vertex: Mg,
  envmap_physical_pars_fragment: Ng,
  envmap_vertex: Fg,
  fog_vertex: bg,
  fog_pars_vertex: Tg,
  fog_fragment: Qg,
  fog_pars_fragment: Ig,
  gradientmap_pars_fragment: Rg,
  lightmap_pars_fragment: Lg,
  lights_lambert_fragment: Dg,
  lights_lambert_pars_fragment: Hg,
  lights_pars_begin: Pg,
  lights_toon_fragment: Og,
  lights_toon_pars_fragment: Gg,
  lights_phong_fragment: Vg,
  lights_phong_pars_fragment: kg,
  lights_physical_fragment: Kg,
  lights_physical_pars_fragment: zg,
  lights_fragment_begin: Wg,
  lights_fragment_maps: Xg,
  lights_fragment_end: Yg,
  logdepthbuf_fragment: Jg,
  logdepthbuf_pars_fragment: qg,
  logdepthbuf_pars_vertex: Zg,
  logdepthbuf_vertex: jg,
  map_fragment: $g,
  map_pars_fragment: em,
  map_particle_fragment: Am,
  map_particle_pars_fragment: tm,
  metalnessmap_fragment: nm,
  metalnessmap_pars_fragment: im,
  morphinstance_vertex: rm,
  morphcolor_vertex: sm,
  morphnormal_vertex: am,
  morphtarget_pars_vertex: om,
  morphtarget_vertex: lm,
  normal_fragment_begin: cm,
  normal_fragment_maps: um,
  normal_pars_fragment: hm,
  normal_pars_vertex: fm,
  normal_vertex: dm,
  normalmap_pars_fragment: pm,
  clearcoat_normal_fragment_begin: gm,
  clearcoat_normal_fragment_maps: mm,
  clearcoat_pars_fragment: Bm,
  iridescence_pars_fragment: wm,
  opaque_fragment: _m,
  packing: vm,
  premultiplied_alpha_fragment: Cm,
  project_vertex: Em,
  dithering_fragment: xm,
  dithering_pars_fragment: Um,
  roughnessmap_fragment: ym,
  roughnessmap_pars_fragment: Sm,
  shadowmap_pars_fragment: Mm,
  shadowmap_pars_vertex: Fm,
  shadowmap_vertex: bm,
  shadowmask_pars_fragment: Tm,
  skinbase_vertex: Qm,
  skinning_pars_vertex: Im,
  skinning_vertex: Rm,
  skinnormal_vertex: Lm,
  specularmap_fragment: Dm,
  specularmap_pars_fragment: Hm,
  tonemapping_fragment: Pm,
  tonemapping_pars_fragment: Nm,
  transmission_fragment: Om,
  transmission_pars_fragment: Gm,
  uv_pars_fragment: Vm,
  uv_pars_vertex: km,
  uv_vertex: Km,
  worldpos_vertex: zm,
  background_vert: Wm,
  background_frag: Xm,
  backgroundCube_vert: Ym,
  backgroundCube_frag: Jm,
  cube_vert: qm,
  cube_frag: Zm,
  depth_vert: jm,
  depth_frag: $m,
  distanceRGBA_vert: eB,
  distanceRGBA_frag: AB,
  equirect_vert: tB,
  equirect_frag: nB,
  linedashed_vert: iB,
  linedashed_frag: rB,
  meshbasic_vert: sB,
  meshbasic_frag: aB,
  meshlambert_vert: oB,
  meshlambert_frag: lB,
  meshmatcap_vert: cB,
  meshmatcap_frag: uB,
  meshnormal_vert: hB,
  meshnormal_frag: fB,
  meshphong_vert: dB,
  meshphong_frag: pB,
  meshphysical_vert: gB,
  meshphysical_frag: mB,
  meshtoon_vert: BB,
  meshtoon_frag: wB,
  points_vert: _B,
  points_frag: vB,
  shadow_vert: CB,
  shadow_frag: EB,
  sprite_vert: xB,
  sprite_frag: UB
}, ce = {
  common: {
    diffuse: { value: /* @__PURE__ */ new Ye(16777215) },
    opacity: { value: 1 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new He() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new He() },
    alphaTest: { value: 0 }
  },
  specularmap: {
    specularMap: { value: null },
    specularMapTransform: { value: /* @__PURE__ */ new He() }
  },
  envmap: {
    envMap: { value: null },
    envMapRotation: { value: /* @__PURE__ */ new He() },
    flipEnvMap: { value: -1 },
    reflectivity: { value: 1 },
    // basic, lambert, phong
    ior: { value: 1.5 },
    // physical
    refractionRatio: { value: 0.98 }
    // basic, lambert, phong
  },
  aomap: {
    aoMap: { value: null },
    aoMapIntensity: { value: 1 },
    aoMapTransform: { value: /* @__PURE__ */ new He() }
  },
  lightmap: {
    lightMap: { value: null },
    lightMapIntensity: { value: 1 },
    lightMapTransform: { value: /* @__PURE__ */ new He() }
  },
  bumpmap: {
    bumpMap: { value: null },
    bumpMapTransform: { value: /* @__PURE__ */ new He() },
    bumpScale: { value: 1 }
  },
  normalmap: {
    normalMap: { value: null },
    normalMapTransform: { value: /* @__PURE__ */ new He() },
    normalScale: { value: /* @__PURE__ */ new Pe(1, 1) }
  },
  displacementmap: {
    displacementMap: { value: null },
    displacementMapTransform: { value: /* @__PURE__ */ new He() },
    displacementScale: { value: 1 },
    displacementBias: { value: 0 }
  },
  emissivemap: {
    emissiveMap: { value: null },
    emissiveMapTransform: { value: /* @__PURE__ */ new He() }
  },
  metalnessmap: {
    metalnessMap: { value: null },
    metalnessMapTransform: { value: /* @__PURE__ */ new He() }
  },
  roughnessmap: {
    roughnessMap: { value: null },
    roughnessMapTransform: { value: /* @__PURE__ */ new He() }
  },
  gradientmap: {
    gradientMap: { value: null }
  },
  fog: {
    fogDensity: { value: 25e-5 },
    fogNear: { value: 1 },
    fogFar: { value: 2e3 },
    fogColor: { value: /* @__PURE__ */ new Ye(16777215) }
  },
  lights: {
    ambientLightColor: { value: [] },
    lightProbe: { value: [] },
    directionalLights: { value: [], properties: {
      direction: {},
      color: {}
    } },
    directionalLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    directionalShadowMap: { value: [] },
    directionalShadowMatrix: { value: [] },
    spotLights: { value: [], properties: {
      color: {},
      position: {},
      direction: {},
      distance: {},
      coneCos: {},
      penumbraCos: {},
      decay: {}
    } },
    spotLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    spotLightMap: { value: [] },
    spotShadowMap: { value: [] },
    spotLightMatrix: { value: [] },
    pointLights: { value: [], properties: {
      color: {},
      position: {},
      decay: {},
      distance: {}
    } },
    pointLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {},
      shadowCameraNear: {},
      shadowCameraFar: {}
    } },
    pointShadowMap: { value: [] },
    pointShadowMatrix: { value: [] },
    hemisphereLights: { value: [], properties: {
      direction: {},
      skyColor: {},
      groundColor: {}
    } },
    // TODO (abelnation): RectAreaLight BRDF data needs to be moved from example to main src
    rectAreaLights: { value: [], properties: {
      color: {},
      position: {},
      width: {},
      height: {}
    } },
    ltc_1: { value: null },
    ltc_2: { value: null }
  },
  points: {
    diffuse: { value: /* @__PURE__ */ new Ye(16777215) },
    opacity: { value: 1 },
    size: { value: 1 },
    scale: { value: 1 },
    map: { value: null },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new He() },
    alphaTest: { value: 0 },
    uvTransform: { value: /* @__PURE__ */ new He() }
  },
  sprite: {
    diffuse: { value: /* @__PURE__ */ new Ye(16777215) },
    opacity: { value: 1 },
    center: { value: /* @__PURE__ */ new Pe(0.5, 0.5) },
    rotation: { value: 0 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new He() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new He() },
    alphaTest: { value: 0 }
  }
}, Ct = {
  basic: {
    uniforms: /* @__PURE__ */ NA([
      ce.common,
      ce.specularmap,
      ce.envmap,
      ce.aomap,
      ce.lightmap,
      ce.fog
    ]),
    vertexShader: Ne.meshbasic_vert,
    fragmentShader: Ne.meshbasic_frag
  },
  lambert: {
    uniforms: /* @__PURE__ */ NA([
      ce.common,
      ce.specularmap,
      ce.envmap,
      ce.aomap,
      ce.lightmap,
      ce.emissivemap,
      ce.bumpmap,
      ce.normalmap,
      ce.displacementmap,
      ce.fog,
      ce.lights,
      {
        emissive: { value: /* @__PURE__ */ new Ye(0) }
      }
    ]),
    vertexShader: Ne.meshlambert_vert,
    fragmentShader: Ne.meshlambert_frag
  },
  phong: {
    uniforms: /* @__PURE__ */ NA([
      ce.common,
      ce.specularmap,
      ce.envmap,
      ce.aomap,
      ce.lightmap,
      ce.emissivemap,
      ce.bumpmap,
      ce.normalmap,
      ce.displacementmap,
      ce.fog,
      ce.lights,
      {
        emissive: { value: /* @__PURE__ */ new Ye(0) },
        specular: { value: /* @__PURE__ */ new Ye(1118481) },
        shininess: { value: 30 }
      }
    ]),
    vertexShader: Ne.meshphong_vert,
    fragmentShader: Ne.meshphong_frag
  },
  standard: {
    uniforms: /* @__PURE__ */ NA([
      ce.common,
      ce.envmap,
      ce.aomap,
      ce.lightmap,
      ce.emissivemap,
      ce.bumpmap,
      ce.normalmap,
      ce.displacementmap,
      ce.roughnessmap,
      ce.metalnessmap,
      ce.fog,
      ce.lights,
      {
        emissive: { value: /* @__PURE__ */ new Ye(0) },
        roughness: { value: 1 },
        metalness: { value: 0 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Ne.meshphysical_vert,
    fragmentShader: Ne.meshphysical_frag
  },
  toon: {
    uniforms: /* @__PURE__ */ NA([
      ce.common,
      ce.aomap,
      ce.lightmap,
      ce.emissivemap,
      ce.bumpmap,
      ce.normalmap,
      ce.displacementmap,
      ce.gradientmap,
      ce.fog,
      ce.lights,
      {
        emissive: { value: /* @__PURE__ */ new Ye(0) }
      }
    ]),
    vertexShader: Ne.meshtoon_vert,
    fragmentShader: Ne.meshtoon_frag
  },
  matcap: {
    uniforms: /* @__PURE__ */ NA([
      ce.common,
      ce.bumpmap,
      ce.normalmap,
      ce.displacementmap,
      ce.fog,
      {
        matcap: { value: null }
      }
    ]),
    vertexShader: Ne.meshmatcap_vert,
    fragmentShader: Ne.meshmatcap_frag
  },
  points: {
    uniforms: /* @__PURE__ */ NA([
      ce.points,
      ce.fog
    ]),
    vertexShader: Ne.points_vert,
    fragmentShader: Ne.points_frag
  },
  dashed: {
    uniforms: /* @__PURE__ */ NA([
      ce.common,
      ce.fog,
      {
        scale: { value: 1 },
        dashSize: { value: 1 },
        totalSize: { value: 2 }
      }
    ]),
    vertexShader: Ne.linedashed_vert,
    fragmentShader: Ne.linedashed_frag
  },
  depth: {
    uniforms: /* @__PURE__ */ NA([
      ce.common,
      ce.displacementmap
    ]),
    vertexShader: Ne.depth_vert,
    fragmentShader: Ne.depth_frag
  },
  normal: {
    uniforms: /* @__PURE__ */ NA([
      ce.common,
      ce.bumpmap,
      ce.normalmap,
      ce.displacementmap,
      {
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Ne.meshnormal_vert,
    fragmentShader: Ne.meshnormal_frag
  },
  sprite: {
    uniforms: /* @__PURE__ */ NA([
      ce.sprite,
      ce.fog
    ]),
    vertexShader: Ne.sprite_vert,
    fragmentShader: Ne.sprite_frag
  },
  background: {
    uniforms: {
      uvTransform: { value: /* @__PURE__ */ new He() },
      t2D: { value: null },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: Ne.background_vert,
    fragmentShader: Ne.background_frag
  },
  backgroundCube: {
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 },
      backgroundBlurriness: { value: 0 },
      backgroundIntensity: { value: 1 },
      backgroundRotation: { value: /* @__PURE__ */ new He() }
    },
    vertexShader: Ne.backgroundCube_vert,
    fragmentShader: Ne.backgroundCube_frag
  },
  cube: {
    uniforms: {
      tCube: { value: null },
      tFlip: { value: -1 },
      opacity: { value: 1 }
    },
    vertexShader: Ne.cube_vert,
    fragmentShader: Ne.cube_frag
  },
  equirect: {
    uniforms: {
      tEquirect: { value: null }
    },
    vertexShader: Ne.equirect_vert,
    fragmentShader: Ne.equirect_frag
  },
  distanceRGBA: {
    uniforms: /* @__PURE__ */ NA([
      ce.common,
      ce.displacementmap,
      {
        referencePosition: { value: /* @__PURE__ */ new Q() },
        nearDistance: { value: 1 },
        farDistance: { value: 1e3 }
      }
    ]),
    vertexShader: Ne.distanceRGBA_vert,
    fragmentShader: Ne.distanceRGBA_frag
  },
  shadow: {
    uniforms: /* @__PURE__ */ NA([
      ce.lights,
      ce.fog,
      {
        color: { value: /* @__PURE__ */ new Ye(0) },
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Ne.shadow_vert,
    fragmentShader: Ne.shadow_frag
  }
};
Ct.physical = {
  uniforms: /* @__PURE__ */ NA([
    Ct.standard.uniforms,
    {
      clearcoat: { value: 0 },
      clearcoatMap: { value: null },
      clearcoatMapTransform: { value: /* @__PURE__ */ new He() },
      clearcoatNormalMap: { value: null },
      clearcoatNormalMapTransform: { value: /* @__PURE__ */ new He() },
      clearcoatNormalScale: { value: /* @__PURE__ */ new Pe(1, 1) },
      clearcoatRoughness: { value: 0 },
      clearcoatRoughnessMap: { value: null },
      clearcoatRoughnessMapTransform: { value: /* @__PURE__ */ new He() },
      dispersion: { value: 0 },
      iridescence: { value: 0 },
      iridescenceMap: { value: null },
      iridescenceMapTransform: { value: /* @__PURE__ */ new He() },
      iridescenceIOR: { value: 1.3 },
      iridescenceThicknessMinimum: { value: 100 },
      iridescenceThicknessMaximum: { value: 400 },
      iridescenceThicknessMap: { value: null },
      iridescenceThicknessMapTransform: { value: /* @__PURE__ */ new He() },
      sheen: { value: 0 },
      sheenColor: { value: /* @__PURE__ */ new Ye(0) },
      sheenColorMap: { value: null },
      sheenColorMapTransform: { value: /* @__PURE__ */ new He() },
      sheenRoughness: { value: 1 },
      sheenRoughnessMap: { value: null },
      sheenRoughnessMapTransform: { value: /* @__PURE__ */ new He() },
      transmission: { value: 0 },
      transmissionMap: { value: null },
      transmissionMapTransform: { value: /* @__PURE__ */ new He() },
      transmissionSamplerSize: { value: /* @__PURE__ */ new Pe() },
      transmissionSamplerMap: { value: null },
      thickness: { value: 0 },
      thicknessMap: { value: null },
      thicknessMapTransform: { value: /* @__PURE__ */ new He() },
      attenuationDistance: { value: 0 },
      attenuationColor: { value: /* @__PURE__ */ new Ye(0) },
      specularColor: { value: /* @__PURE__ */ new Ye(1, 1, 1) },
      specularColorMap: { value: null },
      specularColorMapTransform: { value: /* @__PURE__ */ new He() },
      specularIntensity: { value: 1 },
      specularIntensityMap: { value: null },
      specularIntensityMapTransform: { value: /* @__PURE__ */ new He() },
      anisotropyVector: { value: /* @__PURE__ */ new Pe() },
      anisotropyMap: { value: null },
      anisotropyMapTransform: { value: /* @__PURE__ */ new He() }
    }
  ]),
  vertexShader: Ne.meshphysical_vert,
  fragmentShader: Ne.meshphysical_frag
};
const Pr = { r: 0, b: 0, g: 0 }, Bn = /* @__PURE__ */ new Vt(), yB = /* @__PURE__ */ new uA();
function SB(n, e, A, t, i, r, s) {
  const a = new Ye(0);
  let o = r === !0 ? 0 : 1, l, c, u = null, f = 0, d = null;
  function g(U) {
    let B = U.isScene === !0 ? U.background : null;
    return B && B.isTexture && (B = (U.backgroundBlurriness > 0 ? A : e).get(B)), B;
  }
  function m(U) {
    let B = !1;
    const S = g(U);
    S === null ? h(a, o) : S && S.isColor && (h(S, 1), B = !0);
    const x = n.xr.getEnvironmentBlendMode();
    x === "additive" ? t.buffers.color.setClear(0, 0, 0, 1, s) : x === "alpha-blend" && t.buffers.color.setClear(0, 0, 0, 0, s), (n.autoClear || B) && (t.buffers.depth.setTest(!0), t.buffers.depth.setMask(!0), t.buffers.color.setMask(!0), n.clear(n.autoClearColor, n.autoClearDepth, n.autoClearStencil));
  }
  function p(U, B) {
    const S = g(B);
    S && (S.isCubeTexture || S.mapping === Ns) ? (c === void 0 && (c = new jA(
      new Ln(1, 1, 1),
      new cn({
        name: "BackgroundCubeMaterial",
        uniforms: Ei(Ct.backgroundCube.uniforms),
        vertexShader: Ct.backgroundCube.vertexShader,
        fragmentShader: Ct.backgroundCube.fragmentShader,
        side: zA,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), c.geometry.deleteAttribute("normal"), c.geometry.deleteAttribute("uv"), c.onBeforeRender = function(x, M, F) {
      this.matrixWorld.copyPosition(F.matrixWorld);
    }, Object.defineProperty(c.material, "envMap", {
      get: function() {
        return this.uniforms.envMap.value;
      }
    }), i.update(c)), Bn.copy(B.backgroundRotation), Bn.x *= -1, Bn.y *= -1, Bn.z *= -1, S.isCubeTexture && S.isRenderTargetTexture === !1 && (Bn.y *= -1, Bn.z *= -1), c.material.uniforms.envMap.value = S, c.material.uniforms.flipEnvMap.value = S.isCubeTexture && S.isRenderTargetTexture === !1 ? -1 : 1, c.material.uniforms.backgroundBlurriness.value = B.backgroundBlurriness, c.material.uniforms.backgroundIntensity.value = B.backgroundIntensity, c.material.uniforms.backgroundRotation.value.setFromMatrix4(yB.makeRotationFromEuler(Bn)), c.material.toneMapped = Xe.getTransfer(S.colorSpace) !== tA, (u !== S || f !== S.version || d !== n.toneMapping) && (c.material.needsUpdate = !0, u = S, f = S.version, d = n.toneMapping), c.layers.enableAll(), U.unshift(c, c.geometry, c.material, 0, 0, null)) : S && S.isTexture && (l === void 0 && (l = new jA(
      new ar(2, 2),
      new cn({
        name: "BackgroundMaterial",
        uniforms: Ei(Ct.background.uniforms),
        vertexShader: Ct.background.vertexShader,
        fragmentShader: Ct.background.fragmentShader,
        side: ln,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), l.geometry.deleteAttribute("normal"), Object.defineProperty(l.material, "map", {
      get: function() {
        return this.uniforms.t2D.value;
      }
    }), i.update(l)), l.material.uniforms.t2D.value = S, l.material.uniforms.backgroundIntensity.value = B.backgroundIntensity, l.material.toneMapped = Xe.getTransfer(S.colorSpace) !== tA, S.matrixAutoUpdate === !0 && S.updateMatrix(), l.material.uniforms.uvTransform.value.copy(S.matrix), (u !== S || f !== S.version || d !== n.toneMapping) && (l.material.needsUpdate = !0, u = S, f = S.version, d = n.toneMapping), l.layers.enableAll(), U.unshift(l, l.geometry, l.material, 0, 0, null));
  }
  function h(U, B) {
    U.getRGB(Pr, yh(n)), t.buffers.color.setClear(Pr.r, Pr.g, Pr.b, B, s);
  }
  function E() {
    c !== void 0 && (c.geometry.dispose(), c.material.dispose()), l !== void 0 && (l.geometry.dispose(), l.material.dispose());
  }
  return {
    getClearColor: function() {
      return a;
    },
    setClearColor: function(U, B = 1) {
      a.set(U), o = B, h(a, o);
    },
    getClearAlpha: function() {
      return o;
    },
    setClearAlpha: function(U) {
      o = U, h(a, o);
    },
    render: m,
    addToRenderList: p,
    dispose: E
  };
}
function MB(n, e) {
  const A = n.getParameter(n.MAX_VERTEX_ATTRIBS), t = {}, i = f(null);
  let r = i, s = !1;
  function a(v, b, H, R, N) {
    let Y = !1;
    const k = u(R, H, b);
    r !== k && (r = k, l(r.object)), Y = d(v, R, H, N), Y && g(v, R, H, N), N !== null && e.update(N, n.ELEMENT_ARRAY_BUFFER), (Y || s) && (s = !1, B(v, b, H, R), N !== null && n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, e.get(N).buffer));
  }
  function o() {
    return n.createVertexArray();
  }
  function l(v) {
    return n.bindVertexArray(v);
  }
  function c(v) {
    return n.deleteVertexArray(v);
  }
  function u(v, b, H) {
    const R = H.wireframe === !0;
    let N = t[v.id];
    N === void 0 && (N = {}, t[v.id] = N);
    let Y = N[b.id];
    Y === void 0 && (Y = {}, N[b.id] = Y);
    let k = Y[R];
    return k === void 0 && (k = f(o()), Y[R] = k), k;
  }
  function f(v) {
    const b = [], H = [], R = [];
    for (let N = 0; N < A; N++)
      b[N] = 0, H[N] = 0, R[N] = 0;
    return {
      // for backward compatibility on non-VAO support browser
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: b,
      enabledAttributes: H,
      attributeDivisors: R,
      object: v,
      attributes: {},
      index: null
    };
  }
  function d(v, b, H, R) {
    const N = r.attributes, Y = b.attributes;
    let k = 0;
    const Z = H.getAttributes();
    for (const K in Z)
      if (Z[K].location >= 0) {
        const oe = N[K];
        let Be = Y[K];
        if (Be === void 0 && (K === "instanceMatrix" && v.instanceMatrix && (Be = v.instanceMatrix), K === "instanceColor" && v.instanceColor && (Be = v.instanceColor)), oe === void 0 || oe.attribute !== Be || Be && oe.data !== Be.data) return !0;
        k++;
      }
    return r.attributesNum !== k || r.index !== R;
  }
  function g(v, b, H, R) {
    const N = {}, Y = b.attributes;
    let k = 0;
    const Z = H.getAttributes();
    for (const K in Z)
      if (Z[K].location >= 0) {
        let oe = Y[K];
        oe === void 0 && (K === "instanceMatrix" && v.instanceMatrix && (oe = v.instanceMatrix), K === "instanceColor" && v.instanceColor && (oe = v.instanceColor));
        const Be = {};
        Be.attribute = oe, oe && oe.data && (Be.data = oe.data), N[K] = Be, k++;
      }
    r.attributes = N, r.attributesNum = k, r.index = R;
  }
  function m() {
    const v = r.newAttributes;
    for (let b = 0, H = v.length; b < H; b++)
      v[b] = 0;
  }
  function p(v) {
    h(v, 0);
  }
  function h(v, b) {
    const H = r.newAttributes, R = r.enabledAttributes, N = r.attributeDivisors;
    H[v] = 1, R[v] === 0 && (n.enableVertexAttribArray(v), R[v] = 1), N[v] !== b && (n.vertexAttribDivisor(v, b), N[v] = b);
  }
  function E() {
    const v = r.newAttributes, b = r.enabledAttributes;
    for (let H = 0, R = b.length; H < R; H++)
      b[H] !== v[H] && (n.disableVertexAttribArray(H), b[H] = 0);
  }
  function U(v, b, H, R, N, Y, k) {
    k === !0 ? n.vertexAttribIPointer(v, b, H, N, Y) : n.vertexAttribPointer(v, b, H, R, N, Y);
  }
  function B(v, b, H, R) {
    m();
    const N = R.attributes, Y = H.getAttributes(), k = b.defaultAttributeValues;
    for (const Z in Y) {
      const K = Y[Z];
      if (K.location >= 0) {
        let ne = N[Z];
        if (ne === void 0 && (Z === "instanceMatrix" && v.instanceMatrix && (ne = v.instanceMatrix), Z === "instanceColor" && v.instanceColor && (ne = v.instanceColor)), ne !== void 0) {
          const oe = ne.normalized, Be = ne.itemSize, Fe = e.get(ne);
          if (Fe === void 0) continue;
          const Re = Fe.buffer, W = Fe.type, ee = Fe.bytesPerElement, de = W === n.INT || W === n.UNSIGNED_INT || ne.gpuType === Bl;
          if (ne.isInterleavedBufferAttribute) {
            const ie = ne.data, xe = ie.stride, Te = ne.offset;
            if (ie.isInstancedInterleavedBuffer) {
              for (let Le = 0; Le < K.locationSize; Le++)
                h(K.location + Le, ie.meshPerAttribute);
              v.isInstancedMesh !== !0 && R._maxInstanceCount === void 0 && (R._maxInstanceCount = ie.meshPerAttribute * ie.count);
            } else
              for (let Le = 0; Le < K.locationSize; Le++)
                p(K.location + Le);
            n.bindBuffer(n.ARRAY_BUFFER, Re);
            for (let Le = 0; Le < K.locationSize; Le++)
              U(
                K.location + Le,
                Be / K.locationSize,
                W,
                oe,
                xe * ee,
                (Te + Be / K.locationSize * Le) * ee,
                de
              );
          } else {
            if (ne.isInstancedBufferAttribute) {
              for (let ie = 0; ie < K.locationSize; ie++)
                h(K.location + ie, ne.meshPerAttribute);
              v.isInstancedMesh !== !0 && R._maxInstanceCount === void 0 && (R._maxInstanceCount = ne.meshPerAttribute * ne.count);
            } else
              for (let ie = 0; ie < K.locationSize; ie++)
                p(K.location + ie);
            n.bindBuffer(n.ARRAY_BUFFER, Re);
            for (let ie = 0; ie < K.locationSize; ie++)
              U(
                K.location + ie,
                Be / K.locationSize,
                W,
                oe,
                Be * ee,
                Be / K.locationSize * ie * ee,
                de
              );
          }
        } else if (k !== void 0) {
          const oe = k[Z];
          if (oe !== void 0)
            switch (oe.length) {
              case 2:
                n.vertexAttrib2fv(K.location, oe);
                break;
              case 3:
                n.vertexAttrib3fv(K.location, oe);
                break;
              case 4:
                n.vertexAttrib4fv(K.location, oe);
                break;
              default:
                n.vertexAttrib1fv(K.location, oe);
            }
        }
      }
    }
    E();
  }
  function S() {
    F();
    for (const v in t) {
      const b = t[v];
      for (const H in b) {
        const R = b[H];
        for (const N in R)
          c(R[N].object), delete R[N];
        delete b[H];
      }
      delete t[v];
    }
  }
  function x(v) {
    if (t[v.id] === void 0) return;
    const b = t[v.id];
    for (const H in b) {
      const R = b[H];
      for (const N in R)
        c(R[N].object), delete R[N];
      delete b[H];
    }
    delete t[v.id];
  }
  function M(v) {
    for (const b in t) {
      const H = t[b];
      if (H[v.id] === void 0) continue;
      const R = H[v.id];
      for (const N in R)
        c(R[N].object), delete R[N];
      delete H[v.id];
    }
  }
  function F() {
    _(), s = !0, r !== i && (r = i, l(r.object));
  }
  function _() {
    i.geometry = null, i.program = null, i.wireframe = !1;
  }
  return {
    setup: a,
    reset: F,
    resetDefaultState: _,
    dispose: S,
    releaseStatesOfGeometry: x,
    releaseStatesOfProgram: M,
    initAttributes: m,
    enableAttribute: p,
    disableUnusedAttributes: E
  };
}
function FB(n, e, A) {
  let t;
  function i(l) {
    t = l;
  }
  function r(l, c) {
    n.drawArrays(t, l, c), A.update(c, t, 1);
  }
  function s(l, c, u) {
    u !== 0 && (n.drawArraysInstanced(t, l, c, u), A.update(c, t, u));
  }
  function a(l, c, u) {
    if (u === 0) return;
    e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(t, l, 0, c, 0, u);
    let d = 0;
    for (let g = 0; g < u; g++)
      d += c[g];
    A.update(d, t, 1);
  }
  function o(l, c, u, f) {
    if (u === 0) return;
    const d = e.get("WEBGL_multi_draw");
    if (d === null)
      for (let g = 0; g < l.length; g++)
        s(l[g], c[g], f[g]);
    else {
      d.multiDrawArraysInstancedWEBGL(t, l, 0, c, 0, f, 0, u);
      let g = 0;
      for (let m = 0; m < u; m++)
        g += c[m] * f[m];
      A.update(g, t, 1);
    }
  }
  this.setMode = i, this.render = r, this.renderInstances = s, this.renderMultiDraw = a, this.renderMultiDrawInstances = o;
}
function bB(n, e, A, t) {
  let i;
  function r() {
    if (i !== void 0) return i;
    if (e.has("EXT_texture_filter_anisotropic") === !0) {
      const M = e.get("EXT_texture_filter_anisotropic");
      i = n.getParameter(M.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else
      i = 0;
    return i;
  }
  function s(M) {
    return !(M !== mt && t.convert(M) !== n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT));
  }
  function a(M) {
    const F = M === nr && (e.has("EXT_color_buffer_half_float") || e.has("EXT_color_buffer_float"));
    return !(M !== Gt && t.convert(M) !== n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE) && // Edge and Chrome Mac < 52 (#9513)
    M !== Ht && !F);
  }
  function o(M) {
    if (M === "highp") {
      if (n.getShaderPrecisionFormat(n.VERTEX_SHADER, n.HIGH_FLOAT).precision > 0 && n.getShaderPrecisionFormat(n.FRAGMENT_SHADER, n.HIGH_FLOAT).precision > 0)
        return "highp";
      M = "mediump";
    }
    return M === "mediump" && n.getShaderPrecisionFormat(n.VERTEX_SHADER, n.MEDIUM_FLOAT).precision > 0 && n.getShaderPrecisionFormat(n.FRAGMENT_SHADER, n.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
  }
  let l = A.precision !== void 0 ? A.precision : "highp";
  const c = o(l);
  c !== l && (console.warn("THREE.WebGLRenderer:", l, "not supported, using", c, "instead."), l = c);
  const u = A.logarithmicDepthBuffer === !0, f = A.reverseDepthBuffer === !0 && e.has("EXT_clip_control"), d = n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS), g = n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS), m = n.getParameter(n.MAX_TEXTURE_SIZE), p = n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE), h = n.getParameter(n.MAX_VERTEX_ATTRIBS), E = n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS), U = n.getParameter(n.MAX_VARYING_VECTORS), B = n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS), S = g > 0, x = n.getParameter(n.MAX_SAMPLES);
  return {
    isWebGL2: !0,
    // keeping this for backwards compatibility
    getMaxAnisotropy: r,
    getMaxPrecision: o,
    textureFormatReadable: s,
    textureTypeReadable: a,
    precision: l,
    logarithmicDepthBuffer: u,
    reverseDepthBuffer: f,
    maxTextures: d,
    maxVertexTextures: g,
    maxTextureSize: m,
    maxCubemapSize: p,
    maxAttributes: h,
    maxVertexUniforms: E,
    maxVaryings: U,
    maxFragmentUniforms: B,
    vertexTextures: S,
    maxSamples: x
  };
}
function TB(n) {
  const e = this;
  let A = null, t = 0, i = !1, r = !1;
  const s = new jt(), a = new He(), o = { value: null, needsUpdate: !1 };
  this.uniform = o, this.numPlanes = 0, this.numIntersection = 0, this.init = function(u, f) {
    const d = u.length !== 0 || f || // enable state of previous frame - the clipping code has to
    // run another frame in order to reset the state:
    t !== 0 || i;
    return i = f, t = u.length, d;
  }, this.beginShadows = function() {
    r = !0, c(null);
  }, this.endShadows = function() {
    r = !1;
  }, this.setGlobalState = function(u, f) {
    A = c(u, f, 0);
  }, this.setState = function(u, f, d) {
    const g = u.clippingPlanes, m = u.clipIntersection, p = u.clipShadows, h = n.get(u);
    if (!i || g === null || g.length === 0 || r && !p)
      r ? c(null) : l();
    else {
      const E = r ? 0 : t, U = E * 4;
      let B = h.clippingState || null;
      o.value = B, B = c(g, f, U, d);
      for (let S = 0; S !== U; ++S)
        B[S] = A[S];
      h.clippingState = B, this.numIntersection = m ? this.numPlanes : 0, this.numPlanes += E;
    }
  };
  function l() {
    o.value !== A && (o.value = A, o.needsUpdate = t > 0), e.numPlanes = t, e.numIntersection = 0;
  }
  function c(u, f, d, g) {
    const m = u !== null ? u.length : 0;
    let p = null;
    if (m !== 0) {
      if (p = o.value, g !== !0 || p === null) {
        const h = d + m * 4, E = f.matrixWorldInverse;
        a.getNormalMatrix(E), (p === null || p.length < h) && (p = new Float32Array(h));
        for (let U = 0, B = d; U !== m; ++U, B += 4)
          s.copy(u[U]).applyMatrix4(E, a), s.normal.toArray(p, B), p[B + 3] = s.constant;
      }
      o.value = p, o.needsUpdate = !0;
    }
    return e.numPlanes = m, e.numIntersection = 0, p;
  }
}
function QB(n) {
  let e = /* @__PURE__ */ new WeakMap();
  function A(s, a) {
    return a === po ? s.mapping = Bi : a === go && (s.mapping = wi), s;
  }
  function t(s) {
    if (s && s.isTexture) {
      const a = s.mapping;
      if (a === po || a === go)
        if (e.has(s)) {
          const o = e.get(s).texture;
          return A(o, s.mapping);
        } else {
          const o = s.image;
          if (o && o.height > 0) {
            const l = new Tp(o.height);
            return l.fromEquirectangularTexture(n, s), e.set(s, l), s.addEventListener("dispose", i), A(l.texture, s.mapping);
          } else
            return null;
        }
    }
    return s;
  }
  function i(s) {
    const a = s.target;
    a.removeEventListener("dispose", i);
    const o = e.get(a);
    o !== void 0 && (e.delete(a), o.dispose());
  }
  function r() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: t,
    dispose: r
  };
}
const li = 4, Ec = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582], Un = 20, ya = /* @__PURE__ */ new Op(), xc = /* @__PURE__ */ new Ye();
let Sa = null, Ma = 0, Fa = 0, ba = !1;
const En = (1 + Math.sqrt(5)) / 2, Zn = 1 / En, Uc = [
  /* @__PURE__ */ new Q(-En, Zn, 0),
  /* @__PURE__ */ new Q(En, Zn, 0),
  /* @__PURE__ */ new Q(-Zn, 0, En),
  /* @__PURE__ */ new Q(Zn, 0, En),
  /* @__PURE__ */ new Q(0, En, -Zn),
  /* @__PURE__ */ new Q(0, En, Zn),
  /* @__PURE__ */ new Q(-1, 1, -1),
  /* @__PURE__ */ new Q(1, 1, -1),
  /* @__PURE__ */ new Q(-1, 1, 1),
  /* @__PURE__ */ new Q(1, 1, 1)
];
class yc {
  constructor(e) {
    this._renderer = e, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._lodPlanes = [], this._sizeLods = [], this._sigmas = [], this._blurMaterial = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._compileMaterial(this._blurMaterial);
  }
  /**
   * Generates a PMREM from a supplied Scene, which can be faster than using an
   * image if networking bandwidth is low. Optional sigma specifies a blur radius
   * in radians to be applied to the scene before PMREM generation. Optional near
   * and far planes ensure the scene is rendered in its entirety (the cubeCamera
   * is placed at the origin).
   *
   * @param {Scene} scene
   * @param {number} sigma
   * @param {number} near
   * @param {number} far
   * @return {WebGLRenderTarget}
   */
  fromScene(e, A = 0, t = 0.1, i = 100) {
    Sa = this._renderer.getRenderTarget(), Ma = this._renderer.getActiveCubeFace(), Fa = this._renderer.getActiveMipmapLevel(), ba = this._renderer.xr.enabled, this._renderer.xr.enabled = !1, this._setSize(256);
    const r = this._allocateTargets();
    return r.depthBuffer = !0, this._sceneToCubeUV(e, t, i, r), A > 0 && this._blur(r, 0, 0, A), this._applyPMREM(r), this._cleanup(r), r;
  }
  /**
   * Generates a PMREM from an equirectangular texture, which can be either LDR
   * or HDR. The ideal input image size is 1k (1024 x 512),
   * as this matches best with the 256 x 256 cubemap output.
   * The smallest supported equirectangular image size is 64 x 32.
   *
   * @param {Texture} equirectangular
   * @param {WebGLRenderTarget} [renderTarget=null] - Optional render target.
   * @return {WebGLRenderTarget}
   */
  fromEquirectangular(e, A = null) {
    return this._fromTexture(e, A);
  }
  /**
   * Generates a PMREM from an cubemap texture, which can be either LDR
   * or HDR. The ideal input cube size is 256 x 256,
   * as this matches best with the 256 x 256 cubemap output.
   * The smallest supported cube size is 16 x 16.
   *
   * @param {Texture} cubemap
   * @param {null} [renderTarget=null] - Optional render target.
   * @return {WebGLRenderTarget}
   */
  fromCubemap(e, A = null) {
    return this._fromTexture(e, A);
  }
  /**
   * Pre-compiles the cubemap shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileCubemapShader() {
    this._cubemapMaterial === null && (this._cubemapMaterial = Fc(), this._compileMaterial(this._cubemapMaterial));
  }
  /**
   * Pre-compiles the equirectangular shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileEquirectangularShader() {
    this._equirectMaterial === null && (this._equirectMaterial = Mc(), this._compileMaterial(this._equirectMaterial));
  }
  /**
   * Disposes of the PMREMGenerator's internal memory. Note that PMREMGenerator is a static class,
   * so you should not need more than one PMREMGenerator object. If you do, calling dispose() on
   * one of them will cause any others to also become unusable.
   */
  dispose() {
    this._dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose();
  }
  // private interface
  _setSize(e) {
    this._lodMax = Math.floor(Math.log2(e)), this._cubeSize = Math.pow(2, this._lodMax);
  }
  _dispose() {
    this._blurMaterial !== null && this._blurMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
    for (let e = 0; e < this._lodPlanes.length; e++)
      this._lodPlanes[e].dispose();
  }
  _cleanup(e) {
    this._renderer.setRenderTarget(Sa, Ma, Fa), this._renderer.xr.enabled = ba, e.scissorTest = !1, Nr(e, 0, 0, e.width, e.height);
  }
  _fromTexture(e, A) {
    e.mapping === Bi || e.mapping === wi ? this._setSize(e.image.length === 0 ? 16 : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4), Sa = this._renderer.getRenderTarget(), Ma = this._renderer.getActiveCubeFace(), Fa = this._renderer.getActiveMipmapLevel(), ba = this._renderer.xr.enabled, this._renderer.xr.enabled = !1;
    const t = A || this._allocateTargets();
    return this._textureToCubeUV(e, t), this._applyPMREM(t), this._cleanup(t), t;
  }
  _allocateTargets() {
    const e = 3 * Math.max(this._cubeSize, 112), A = 4 * this._cubeSize, t = {
      magFilter: Et,
      minFilter: Et,
      generateMipmaps: !1,
      type: nr,
      format: mt,
      colorSpace: Ci,
      depthBuffer: !1
    }, i = Sc(e, A, t);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== e || this._pingPongRenderTarget.height !== A) {
      this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = Sc(e, A, t);
      const { _lodMax: r } = this;
      ({ sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas } = IB(r)), this._blurMaterial = RB(r, e, A);
    }
    return i;
  }
  _compileMaterial(e) {
    const A = new jA(this._lodPlanes[0], e);
    this._renderer.compile(A, ya);
  }
  _sceneToCubeUV(e, A, t, i) {
    const a = new rt(90, 1, A, t), o = [1, -1, 1, 1, 1, 1], l = [1, 1, 1, -1, -1, -1], c = this._renderer, u = c.autoClear, f = c.toneMapping;
    c.getClearColor(xc), c.toneMapping = sn, c.autoClear = !1;
    const d = new pi({
      name: "PMREM.Background",
      side: zA,
      depthWrite: !1,
      depthTest: !1
    }), g = new jA(new Ln(), d);
    let m = !1;
    const p = e.background;
    p ? p.isColor && (d.color.copy(p), e.background = null, m = !0) : (d.color.copy(xc), m = !0);
    for (let h = 0; h < 6; h++) {
      const E = h % 3;
      E === 0 ? (a.up.set(0, o[h], 0), a.lookAt(l[h], 0, 0)) : E === 1 ? (a.up.set(0, 0, o[h]), a.lookAt(0, l[h], 0)) : (a.up.set(0, o[h], 0), a.lookAt(0, 0, l[h]));
      const U = this._cubeSize;
      Nr(i, E * U, h > 2 ? U : 0, U, U), c.setRenderTarget(i), m && c.render(g, a), c.render(e, a);
    }
    g.geometry.dispose(), g.material.dispose(), c.toneMapping = f, c.autoClear = u, e.background = p;
  }
  _textureToCubeUV(e, A) {
    const t = this._renderer, i = e.mapping === Bi || e.mapping === wi;
    i ? (this._cubemapMaterial === null && (this._cubemapMaterial = Fc()), this._cubemapMaterial.uniforms.flipEnvMap.value = e.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = Mc());
    const r = i ? this._cubemapMaterial : this._equirectMaterial, s = new jA(this._lodPlanes[0], r), a = r.uniforms;
    a.envMap.value = e;
    const o = this._cubeSize;
    Nr(A, 0, 0, 3 * o, 2 * o), t.setRenderTarget(A), t.render(s, ya);
  }
  _applyPMREM(e) {
    const A = this._renderer, t = A.autoClear;
    A.autoClear = !1;
    const i = this._lodPlanes.length;
    for (let r = 1; r < i; r++) {
      const s = Math.sqrt(this._sigmas[r] * this._sigmas[r] - this._sigmas[r - 1] * this._sigmas[r - 1]), a = Uc[(i - r - 1) % Uc.length];
      this._blur(e, r - 1, r, s, a);
    }
    A.autoClear = t;
  }
  /**
   * This is a two-pass Gaussian blur for a cubemap. Normally this is done
   * vertically and horizontally, but this breaks down on a cube. Here we apply
   * the blur latitudinally (around the poles), and then longitudinally (towards
   * the poles) to approximate the orthogonally-separable blur. It is least
   * accurate at the poles, but still does a decent job.
   *
   * @param {WebGLRenderTarget} cubeUVRenderTarget
   * @param {number} lodIn
   * @param {number} lodOut
   * @param {number} sigma
   * @param {Vector3} [poleAxis]
   */
  _blur(e, A, t, i, r) {
    const s = this._pingPongRenderTarget;
    this._halfBlur(
      e,
      s,
      A,
      t,
      i,
      "latitudinal",
      r
    ), this._halfBlur(
      s,
      e,
      t,
      t,
      i,
      "longitudinal",
      r
    );
  }
  _halfBlur(e, A, t, i, r, s, a) {
    const o = this._renderer, l = this._blurMaterial;
    s !== "latitudinal" && s !== "longitudinal" && console.error(
      "blur direction must be either latitudinal or longitudinal!"
    );
    const c = 3, u = new jA(this._lodPlanes[i], l), f = l.uniforms, d = this._sizeLods[t] - 1, g = isFinite(r) ? Math.PI / (2 * d) : 2 * Math.PI / (2 * Un - 1), m = r / g, p = isFinite(r) ? 1 + Math.floor(c * m) : Un;
    p > Un && console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Un}`);
    const h = [];
    let E = 0;
    for (let M = 0; M < Un; ++M) {
      const F = M / m, _ = Math.exp(-F * F / 2);
      h.push(_), M === 0 ? E += _ : M < p && (E += 2 * _);
    }
    for (let M = 0; M < h.length; M++)
      h[M] = h[M] / E;
    f.envMap.value = e.texture, f.samples.value = p, f.weights.value = h, f.latitudinal.value = s === "latitudinal", a && (f.poleAxis.value = a);
    const { _lodMax: U } = this;
    f.dTheta.value = g, f.mipInt.value = U - t;
    const B = this._sizeLods[i], S = 3 * B * (i > U - li ? i - U + li : 0), x = 4 * (this._cubeSize - B);
    Nr(A, S, x, 3 * B, 2 * B), o.setRenderTarget(A), o.render(u, ya);
  }
}
function IB(n) {
  const e = [], A = [], t = [];
  let i = n;
  const r = n - li + 1 + Ec.length;
  for (let s = 0; s < r; s++) {
    const a = Math.pow(2, i);
    A.push(a);
    let o = 1 / a;
    s > n - li ? o = Ec[s - n + li - 1] : s === 0 && (o = 0), t.push(o);
    const l = 1 / (a - 2), c = -l, u = 1 + l, f = [c, c, u, c, u, u, c, c, u, u, c, u], d = 6, g = 6, m = 3, p = 2, h = 1, E = new Float32Array(m * g * d), U = new Float32Array(p * g * d), B = new Float32Array(h * g * d);
    for (let x = 0; x < d; x++) {
      const M = x % 3 * 2 / 3 - 1, F = x > 2 ? 0 : -1, _ = [
        M,
        F,
        0,
        M + 2 / 3,
        F,
        0,
        M + 2 / 3,
        F + 1,
        0,
        M,
        F,
        0,
        M + 2 / 3,
        F + 1,
        0,
        M,
        F + 1,
        0
      ];
      E.set(_, m * g * x), U.set(f, p * g * x);
      const v = [x, x, x, x, x, x];
      B.set(v, h * g * x);
    }
    const S = new $A();
    S.setAttribute("position", new xt(E, m)), S.setAttribute("uv", new xt(U, p)), S.setAttribute("faceIndex", new xt(B, h)), e.push(S), i > li && i--;
  }
  return { lodPlanes: e, sizeLods: A, sigmas: t };
}
function Sc(n, e, A) {
  const t = new In(n, e, A);
  return t.texture.mapping = Ns, t.texture.name = "PMREM.cubeUv", t.scissorTest = !0, t;
}
function Nr(n, e, A, t, i) {
  n.viewport.set(e, A, t, i), n.scissor.set(e, A, t, i);
}
function RB(n, e, A) {
  const t = new Float32Array(Un), i = new Q(0, 1, 0);
  return new cn({
    name: "SphericalGaussianBlur",
    defines: {
      n: Un,
      CUBEUV_TEXEL_WIDTH: 1 / e,
      CUBEUV_TEXEL_HEIGHT: 1 / A,
      CUBEUV_MAX_MIP: `${n}.0`
    },
    uniforms: {
      envMap: { value: null },
      samples: { value: 1 },
      weights: { value: t },
      latitudinal: { value: !1 },
      dTheta: { value: 0 },
      mipInt: { value: 0 },
      poleAxis: { value: i }
    },
    vertexShader: Ml(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`
    ),
    blending: rn,
    depthTest: !1,
    depthWrite: !1
  });
}
function Mc() {
  return new cn({
    name: "EquirectangularToCubeUV",
    uniforms: {
      envMap: { value: null }
    },
    vertexShader: Ml(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`
    ),
    blending: rn,
    depthTest: !1,
    depthWrite: !1
  });
}
function Fc() {
  return new cn({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 }
    },
    vertexShader: Ml(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`
    ),
    blending: rn,
    depthTest: !1,
    depthWrite: !1
  });
}
function Ml() {
  return (
    /* glsl */
    `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`
  );
}
function LB(n) {
  let e = /* @__PURE__ */ new WeakMap(), A = null;
  function t(a) {
    if (a && a.isTexture) {
      const o = a.mapping, l = o === po || o === go, c = o === Bi || o === wi;
      if (l || c) {
        let u = e.get(a);
        const f = u !== void 0 ? u.texture.pmremVersion : 0;
        if (a.isRenderTargetTexture && a.pmremVersion !== f)
          return A === null && (A = new yc(n)), u = l ? A.fromEquirectangular(a, u) : A.fromCubemap(a, u), u.texture.pmremVersion = a.pmremVersion, e.set(a, u), u.texture;
        if (u !== void 0)
          return u.texture;
        {
          const d = a.image;
          return l && d && d.height > 0 || c && d && i(d) ? (A === null && (A = new yc(n)), u = l ? A.fromEquirectangular(a) : A.fromCubemap(a), u.texture.pmremVersion = a.pmremVersion, e.set(a, u), a.addEventListener("dispose", r), u.texture) : null;
        }
      }
    }
    return a;
  }
  function i(a) {
    let o = 0;
    const l = 6;
    for (let c = 0; c < l; c++)
      a[c] !== void 0 && o++;
    return o === l;
  }
  function r(a) {
    const o = a.target;
    o.removeEventListener("dispose", r);
    const l = e.get(o);
    l !== void 0 && (e.delete(o), l.dispose());
  }
  function s() {
    e = /* @__PURE__ */ new WeakMap(), A !== null && (A.dispose(), A = null);
  }
  return {
    get: t,
    dispose: s
  };
}
function DB(n) {
  const e = {};
  function A(t) {
    if (e[t] !== void 0)
      return e[t];
    let i;
    switch (t) {
      case "WEBGL_depth_texture":
        i = n.getExtension("WEBGL_depth_texture") || n.getExtension("MOZ_WEBGL_depth_texture") || n.getExtension("WEBKIT_WEBGL_depth_texture");
        break;
      case "EXT_texture_filter_anisotropic":
        i = n.getExtension("EXT_texture_filter_anisotropic") || n.getExtension("MOZ_EXT_texture_filter_anisotropic") || n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
        break;
      case "WEBGL_compressed_texture_s3tc":
        i = n.getExtension("WEBGL_compressed_texture_s3tc") || n.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
        break;
      case "WEBGL_compressed_texture_pvrtc":
        i = n.getExtension("WEBGL_compressed_texture_pvrtc") || n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
        break;
      default:
        i = n.getExtension(t);
    }
    return e[t] = i, i;
  }
  return {
    has: function(t) {
      return A(t) !== null;
    },
    init: function() {
      A("EXT_color_buffer_float"), A("WEBGL_clip_cull_distance"), A("OES_texture_float_linear"), A("EXT_color_buffer_half_float"), A("WEBGL_multisampled_render_to_texture"), A("WEBGL_render_shared_exponent");
    },
    get: function(t) {
      const i = A(t);
      return i === null && ri("THREE.WebGLRenderer: " + t + " extension not supported."), i;
    }
  };
}
function HB(n, e, A, t) {
  const i = {}, r = /* @__PURE__ */ new WeakMap();
  function s(u) {
    const f = u.target;
    f.index !== null && e.remove(f.index);
    for (const g in f.attributes)
      e.remove(f.attributes[g]);
    f.removeEventListener("dispose", s), delete i[f.id];
    const d = r.get(f);
    d && (e.remove(d), r.delete(f)), t.releaseStatesOfGeometry(f), f.isInstancedBufferGeometry === !0 && delete f._maxInstanceCount, A.memory.geometries--;
  }
  function a(u, f) {
    return i[f.id] === !0 || (f.addEventListener("dispose", s), i[f.id] = !0, A.memory.geometries++), f;
  }
  function o(u) {
    const f = u.attributes;
    for (const d in f)
      e.update(f[d], n.ARRAY_BUFFER);
  }
  function l(u) {
    const f = [], d = u.index, g = u.attributes.position;
    let m = 0;
    if (d !== null) {
      const E = d.array;
      m = d.version;
      for (let U = 0, B = E.length; U < B; U += 3) {
        const S = E[U + 0], x = E[U + 1], M = E[U + 2];
        f.push(S, x, x, M, M, S);
      }
    } else if (g !== void 0) {
      const E = g.array;
      m = g.version;
      for (let U = 0, B = E.length / 3 - 1; U < B; U += 3) {
        const S = U + 0, x = U + 1, M = U + 2;
        f.push(S, x, x, M, M, S);
      }
    } else
      return;
    const p = new (_h(f) ? Uh : xh)(f, 1);
    p.version = m;
    const h = r.get(u);
    h && e.remove(h), r.set(u, p);
  }
  function c(u) {
    const f = r.get(u);
    if (f) {
      const d = u.index;
      d !== null && f.version < d.version && l(u);
    } else
      l(u);
    return r.get(u);
  }
  return {
    get: a,
    update: o,
    getWireframeAttribute: c
  };
}
function PB(n, e, A) {
  let t;
  function i(f) {
    t = f;
  }
  let r, s;
  function a(f) {
    r = f.type, s = f.bytesPerElement;
  }
  function o(f, d) {
    n.drawElements(t, d, r, f * s), A.update(d, t, 1);
  }
  function l(f, d, g) {
    g !== 0 && (n.drawElementsInstanced(t, d, r, f * s, g), A.update(d, t, g));
  }
  function c(f, d, g) {
    if (g === 0) return;
    e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(t, d, 0, r, f, 0, g);
    let p = 0;
    for (let h = 0; h < g; h++)
      p += d[h];
    A.update(p, t, 1);
  }
  function u(f, d, g, m) {
    if (g === 0) return;
    const p = e.get("WEBGL_multi_draw");
    if (p === null)
      for (let h = 0; h < f.length; h++)
        l(f[h] / s, d[h], m[h]);
    else {
      p.multiDrawElementsInstancedWEBGL(t, d, 0, r, f, 0, m, 0, g);
      let h = 0;
      for (let E = 0; E < g; E++)
        h += d[E] * m[E];
      A.update(h, t, 1);
    }
  }
  this.setMode = i, this.setIndex = a, this.render = o, this.renderInstances = l, this.renderMultiDraw = c, this.renderMultiDrawInstances = u;
}
function NB(n) {
  const e = {
    geometries: 0,
    textures: 0
  }, A = {
    frame: 0,
    calls: 0,
    triangles: 0,
    points: 0,
    lines: 0
  };
  function t(r, s, a) {
    switch (A.calls++, s) {
      case n.TRIANGLES:
        A.triangles += a * (r / 3);
        break;
      case n.LINES:
        A.lines += a * (r / 2);
        break;
      case n.LINE_STRIP:
        A.lines += a * (r - 1);
        break;
      case n.LINE_LOOP:
        A.lines += a * r;
        break;
      case n.POINTS:
        A.points += a * r;
        break;
      default:
        console.error("THREE.WebGLInfo: Unknown draw mode:", s);
        break;
    }
  }
  function i() {
    A.calls = 0, A.triangles = 0, A.points = 0, A.lines = 0;
  }
  return {
    memory: e,
    render: A,
    programs: null,
    autoReset: !0,
    reset: i,
    update: t
  };
}
function OB(n, e, A) {
  const t = /* @__PURE__ */ new WeakMap(), i = new mA();
  function r(s, a, o) {
    const l = s.morphTargetInfluences, c = a.morphAttributes.position || a.morphAttributes.normal || a.morphAttributes.color, u = c !== void 0 ? c.length : 0;
    let f = t.get(a);
    if (f === void 0 || f.count !== u) {
      let _ = function() {
        M.dispose(), t.delete(a), a.removeEventListener("dispose", _);
      };
      f !== void 0 && f.texture.dispose();
      const d = a.morphAttributes.position !== void 0, g = a.morphAttributes.normal !== void 0, m = a.morphAttributes.color !== void 0, p = a.morphAttributes.position || [], h = a.morphAttributes.normal || [], E = a.morphAttributes.color || [];
      let U = 0;
      d === !0 && (U = 1), g === !0 && (U = 2), m === !0 && (U = 3);
      let B = a.attributes.position.count * U, S = 1;
      B > e.maxTextureSize && (S = Math.ceil(B / e.maxTextureSize), B = e.maxTextureSize);
      const x = new Float32Array(B * S * 4 * u), M = new Ch(x, B, S, u);
      M.type = Ht, M.needsUpdate = !0;
      const F = U * 4;
      for (let v = 0; v < u; v++) {
        const b = p[v], H = h[v], R = E[v], N = B * S * 4 * v;
        for (let Y = 0; Y < b.count; Y++) {
          const k = Y * F;
          d === !0 && (i.fromBufferAttribute(b, Y), x[N + k + 0] = i.x, x[N + k + 1] = i.y, x[N + k + 2] = i.z, x[N + k + 3] = 0), g === !0 && (i.fromBufferAttribute(H, Y), x[N + k + 4] = i.x, x[N + k + 5] = i.y, x[N + k + 6] = i.z, x[N + k + 7] = 0), m === !0 && (i.fromBufferAttribute(R, Y), x[N + k + 8] = i.x, x[N + k + 9] = i.y, x[N + k + 10] = i.z, x[N + k + 11] = R.itemSize === 4 ? i.w : 1);
        }
      }
      f = {
        count: u,
        texture: M,
        size: new Pe(B, S)
      }, t.set(a, f), a.addEventListener("dispose", _);
    }
    if (s.isInstancedMesh === !0 && s.morphTexture !== null)
      o.getUniforms().setValue(n, "morphTexture", s.morphTexture, A);
    else {
      let d = 0;
      for (let m = 0; m < l.length; m++)
        d += l[m];
      const g = a.morphTargetsRelative ? 1 : 1 - d;
      o.getUniforms().setValue(n, "morphTargetBaseInfluence", g), o.getUniforms().setValue(n, "morphTargetInfluences", l);
    }
    o.getUniforms().setValue(n, "morphTargetsTexture", f.texture, A), o.getUniforms().setValue(n, "morphTargetsTextureSize", f.size);
  }
  return {
    update: r
  };
}
function GB(n, e, A, t) {
  let i = /* @__PURE__ */ new WeakMap();
  function r(o) {
    const l = t.render.frame, c = o.geometry, u = e.get(o, c);
    if (i.get(u) !== l && (e.update(u), i.set(u, l)), o.isInstancedMesh && (o.hasEventListener("dispose", a) === !1 && o.addEventListener("dispose", a), i.get(o) !== l && (A.update(o.instanceMatrix, n.ARRAY_BUFFER), o.instanceColor !== null && A.update(o.instanceColor, n.ARRAY_BUFFER), i.set(o, l))), o.isSkinnedMesh) {
      const f = o.skeleton;
      i.get(f) !== l && (f.update(), i.set(f, l));
    }
    return u;
  }
  function s() {
    i = /* @__PURE__ */ new WeakMap();
  }
  function a(o) {
    const l = o.target;
    l.removeEventListener("dispose", a), A.remove(l.instanceMatrix), l.instanceColor !== null && A.remove(l.instanceColor);
  }
  return {
    update: r,
    dispose: s
  };
}
const Qh = /* @__PURE__ */ new WA(), bc = /* @__PURE__ */ new bh(1, 1), Ih = /* @__PURE__ */ new Ch(), Rh = /* @__PURE__ */ new pp(), Lh = /* @__PURE__ */ new Mh(), Tc = [], Qc = [], Ic = new Float32Array(16), Rc = new Float32Array(9), Lc = new Float32Array(4);
function Ui(n, e, A) {
  const t = n[0];
  if (t <= 0 || t > 0) return n;
  const i = e * A;
  let r = Tc[i];
  if (r === void 0 && (r = new Float32Array(i), Tc[i] = r), e !== 0) {
    t.toArray(r, 0);
    for (let s = 1, a = 0; s !== e; ++s)
      a += A, n[s].toArray(r, a);
  }
  return r;
}
function EA(n, e) {
  if (n.length !== e.length) return !1;
  for (let A = 0, t = n.length; A < t; A++)
    if (n[A] !== e[A]) return !1;
  return !0;
}
function xA(n, e) {
  for (let A = 0, t = e.length; A < t; A++)
    n[A] = e[A];
}
function Vs(n, e) {
  let A = Qc[e];
  A === void 0 && (A = new Int32Array(e), Qc[e] = A);
  for (let t = 0; t !== e; ++t)
    A[t] = n.allocateTextureUnit();
  return A;
}
function VB(n, e) {
  const A = this.cache;
  A[0] !== e && (n.uniform1f(this.addr, e), A[0] = e);
}
function kB(n, e) {
  const A = this.cache;
  if (e.x !== void 0)
    (A[0] !== e.x || A[1] !== e.y) && (n.uniform2f(this.addr, e.x, e.y), A[0] = e.x, A[1] = e.y);
  else {
    if (EA(A, e)) return;
    n.uniform2fv(this.addr, e), xA(A, e);
  }
}
function KB(n, e) {
  const A = this.cache;
  if (e.x !== void 0)
    (A[0] !== e.x || A[1] !== e.y || A[2] !== e.z) && (n.uniform3f(this.addr, e.x, e.y, e.z), A[0] = e.x, A[1] = e.y, A[2] = e.z);
  else if (e.r !== void 0)
    (A[0] !== e.r || A[1] !== e.g || A[2] !== e.b) && (n.uniform3f(this.addr, e.r, e.g, e.b), A[0] = e.r, A[1] = e.g, A[2] = e.b);
  else {
    if (EA(A, e)) return;
    n.uniform3fv(this.addr, e), xA(A, e);
  }
}
function zB(n, e) {
  const A = this.cache;
  if (e.x !== void 0)
    (A[0] !== e.x || A[1] !== e.y || A[2] !== e.z || A[3] !== e.w) && (n.uniform4f(this.addr, e.x, e.y, e.z, e.w), A[0] = e.x, A[1] = e.y, A[2] = e.z, A[3] = e.w);
  else {
    if (EA(A, e)) return;
    n.uniform4fv(this.addr, e), xA(A, e);
  }
}
function WB(n, e) {
  const A = this.cache, t = e.elements;
  if (t === void 0) {
    if (EA(A, e)) return;
    n.uniformMatrix2fv(this.addr, !1, e), xA(A, e);
  } else {
    if (EA(A, t)) return;
    Lc.set(t), n.uniformMatrix2fv(this.addr, !1, Lc), xA(A, t);
  }
}
function XB(n, e) {
  const A = this.cache, t = e.elements;
  if (t === void 0) {
    if (EA(A, e)) return;
    n.uniformMatrix3fv(this.addr, !1, e), xA(A, e);
  } else {
    if (EA(A, t)) return;
    Rc.set(t), n.uniformMatrix3fv(this.addr, !1, Rc), xA(A, t);
  }
}
function YB(n, e) {
  const A = this.cache, t = e.elements;
  if (t === void 0) {
    if (EA(A, e)) return;
    n.uniformMatrix4fv(this.addr, !1, e), xA(A, e);
  } else {
    if (EA(A, t)) return;
    Ic.set(t), n.uniformMatrix4fv(this.addr, !1, Ic), xA(A, t);
  }
}
function JB(n, e) {
  const A = this.cache;
  A[0] !== e && (n.uniform1i(this.addr, e), A[0] = e);
}
function qB(n, e) {
  const A = this.cache;
  if (e.x !== void 0)
    (A[0] !== e.x || A[1] !== e.y) && (n.uniform2i(this.addr, e.x, e.y), A[0] = e.x, A[1] = e.y);
  else {
    if (EA(A, e)) return;
    n.uniform2iv(this.addr, e), xA(A, e);
  }
}
function ZB(n, e) {
  const A = this.cache;
  if (e.x !== void 0)
    (A[0] !== e.x || A[1] !== e.y || A[2] !== e.z) && (n.uniform3i(this.addr, e.x, e.y, e.z), A[0] = e.x, A[1] = e.y, A[2] = e.z);
  else {
    if (EA(A, e)) return;
    n.uniform3iv(this.addr, e), xA(A, e);
  }
}
function jB(n, e) {
  const A = this.cache;
  if (e.x !== void 0)
    (A[0] !== e.x || A[1] !== e.y || A[2] !== e.z || A[3] !== e.w) && (n.uniform4i(this.addr, e.x, e.y, e.z, e.w), A[0] = e.x, A[1] = e.y, A[2] = e.z, A[3] = e.w);
  else {
    if (EA(A, e)) return;
    n.uniform4iv(this.addr, e), xA(A, e);
  }
}
function $B(n, e) {
  const A = this.cache;
  A[0] !== e && (n.uniform1ui(this.addr, e), A[0] = e);
}
function e0(n, e) {
  const A = this.cache;
  if (e.x !== void 0)
    (A[0] !== e.x || A[1] !== e.y) && (n.uniform2ui(this.addr, e.x, e.y), A[0] = e.x, A[1] = e.y);
  else {
    if (EA(A, e)) return;
    n.uniform2uiv(this.addr, e), xA(A, e);
  }
}
function A0(n, e) {
  const A = this.cache;
  if (e.x !== void 0)
    (A[0] !== e.x || A[1] !== e.y || A[2] !== e.z) && (n.uniform3ui(this.addr, e.x, e.y, e.z), A[0] = e.x, A[1] = e.y, A[2] = e.z);
  else {
    if (EA(A, e)) return;
    n.uniform3uiv(this.addr, e), xA(A, e);
  }
}
function t0(n, e) {
  const A = this.cache;
  if (e.x !== void 0)
    (A[0] !== e.x || A[1] !== e.y || A[2] !== e.z || A[3] !== e.w) && (n.uniform4ui(this.addr, e.x, e.y, e.z, e.w), A[0] = e.x, A[1] = e.y, A[2] = e.z, A[3] = e.w);
  else {
    if (EA(A, e)) return;
    n.uniform4uiv(this.addr, e), xA(A, e);
  }
}
function n0(n, e, A) {
  const t = this.cache, i = A.allocateTextureUnit();
  t[0] !== i && (n.uniform1i(this.addr, i), t[0] = i);
  let r;
  this.type === n.SAMPLER_2D_SHADOW ? (bc.compareFunction = wh, r = bc) : r = Qh, A.setTexture2D(e || r, i);
}
function i0(n, e, A) {
  const t = this.cache, i = A.allocateTextureUnit();
  t[0] !== i && (n.uniform1i(this.addr, i), t[0] = i), A.setTexture3D(e || Rh, i);
}
function r0(n, e, A) {
  const t = this.cache, i = A.allocateTextureUnit();
  t[0] !== i && (n.uniform1i(this.addr, i), t[0] = i), A.setTextureCube(e || Lh, i);
}
function s0(n, e, A) {
  const t = this.cache, i = A.allocateTextureUnit();
  t[0] !== i && (n.uniform1i(this.addr, i), t[0] = i), A.setTexture2DArray(e || Ih, i);
}
function a0(n) {
  switch (n) {
    case 5126:
      return VB;
    // FLOAT
    case 35664:
      return kB;
    // _VEC2
    case 35665:
      return KB;
    // _VEC3
    case 35666:
      return zB;
    // _VEC4
    case 35674:
      return WB;
    // _MAT2
    case 35675:
      return XB;
    // _MAT3
    case 35676:
      return YB;
    // _MAT4
    case 5124:
    case 35670:
      return JB;
    // INT, BOOL
    case 35667:
    case 35671:
      return qB;
    // _VEC2
    case 35668:
    case 35672:
      return ZB;
    // _VEC3
    case 35669:
    case 35673:
      return jB;
    // _VEC4
    case 5125:
      return $B;
    // UINT
    case 36294:
      return e0;
    // _VEC2
    case 36295:
      return A0;
    // _VEC3
    case 36296:
      return t0;
    // _VEC4
    case 35678:
    // SAMPLER_2D
    case 36198:
    // SAMPLER_EXTERNAL_OES
    case 36298:
    // INT_SAMPLER_2D
    case 36306:
    // UNSIGNED_INT_SAMPLER_2D
    case 35682:
      return n0;
    case 35679:
    // SAMPLER_3D
    case 36299:
    // INT_SAMPLER_3D
    case 36307:
      return i0;
    case 35680:
    // SAMPLER_CUBE
    case 36300:
    // INT_SAMPLER_CUBE
    case 36308:
    // UNSIGNED_INT_SAMPLER_CUBE
    case 36293:
      return r0;
    case 36289:
    // SAMPLER_2D_ARRAY
    case 36303:
    // INT_SAMPLER_2D_ARRAY
    case 36311:
    // UNSIGNED_INT_SAMPLER_2D_ARRAY
    case 36292:
      return s0;
  }
}
function o0(n, e) {
  n.uniform1fv(this.addr, e);
}
function l0(n, e) {
  const A = Ui(e, this.size, 2);
  n.uniform2fv(this.addr, A);
}
function c0(n, e) {
  const A = Ui(e, this.size, 3);
  n.uniform3fv(this.addr, A);
}
function u0(n, e) {
  const A = Ui(e, this.size, 4);
  n.uniform4fv(this.addr, A);
}
function h0(n, e) {
  const A = Ui(e, this.size, 4);
  n.uniformMatrix2fv(this.addr, !1, A);
}
function f0(n, e) {
  const A = Ui(e, this.size, 9);
  n.uniformMatrix3fv(this.addr, !1, A);
}
function d0(n, e) {
  const A = Ui(e, this.size, 16);
  n.uniformMatrix4fv(this.addr, !1, A);
}
function p0(n, e) {
  n.uniform1iv(this.addr, e);
}
function g0(n, e) {
  n.uniform2iv(this.addr, e);
}
function m0(n, e) {
  n.uniform3iv(this.addr, e);
}
function B0(n, e) {
  n.uniform4iv(this.addr, e);
}
function w0(n, e) {
  n.uniform1uiv(this.addr, e);
}
function _0(n, e) {
  n.uniform2uiv(this.addr, e);
}
function v0(n, e) {
  n.uniform3uiv(this.addr, e);
}
function C0(n, e) {
  n.uniform4uiv(this.addr, e);
}
function E0(n, e, A) {
  const t = this.cache, i = e.length, r = Vs(A, i);
  EA(t, r) || (n.uniform1iv(this.addr, r), xA(t, r));
  for (let s = 0; s !== i; ++s)
    A.setTexture2D(e[s] || Qh, r[s]);
}
function x0(n, e, A) {
  const t = this.cache, i = e.length, r = Vs(A, i);
  EA(t, r) || (n.uniform1iv(this.addr, r), xA(t, r));
  for (let s = 0; s !== i; ++s)
    A.setTexture3D(e[s] || Rh, r[s]);
}
function U0(n, e, A) {
  const t = this.cache, i = e.length, r = Vs(A, i);
  EA(t, r) || (n.uniform1iv(this.addr, r), xA(t, r));
  for (let s = 0; s !== i; ++s)
    A.setTextureCube(e[s] || Lh, r[s]);
}
function y0(n, e, A) {
  const t = this.cache, i = e.length, r = Vs(A, i);
  EA(t, r) || (n.uniform1iv(this.addr, r), xA(t, r));
  for (let s = 0; s !== i; ++s)
    A.setTexture2DArray(e[s] || Ih, r[s]);
}
function S0(n) {
  switch (n) {
    case 5126:
      return o0;
    // FLOAT
    case 35664:
      return l0;
    // _VEC2
    case 35665:
      return c0;
    // _VEC3
    case 35666:
      return u0;
    // _VEC4
    case 35674:
      return h0;
    // _MAT2
    case 35675:
      return f0;
    // _MAT3
    case 35676:
      return d0;
    // _MAT4
    case 5124:
    case 35670:
      return p0;
    // INT, BOOL
    case 35667:
    case 35671:
      return g0;
    // _VEC2
    case 35668:
    case 35672:
      return m0;
    // _VEC3
    case 35669:
    case 35673:
      return B0;
    // _VEC4
    case 5125:
      return w0;
    // UINT
    case 36294:
      return _0;
    // _VEC2
    case 36295:
      return v0;
    // _VEC3
    case 36296:
      return C0;
    // _VEC4
    case 35678:
    // SAMPLER_2D
    case 36198:
    // SAMPLER_EXTERNAL_OES
    case 36298:
    // INT_SAMPLER_2D
    case 36306:
    // UNSIGNED_INT_SAMPLER_2D
    case 35682:
      return E0;
    case 35679:
    // SAMPLER_3D
    case 36299:
    // INT_SAMPLER_3D
    case 36307:
      return x0;
    case 35680:
    // SAMPLER_CUBE
    case 36300:
    // INT_SAMPLER_CUBE
    case 36308:
    // UNSIGNED_INT_SAMPLER_CUBE
    case 36293:
      return U0;
    case 36289:
    // SAMPLER_2D_ARRAY
    case 36303:
    // INT_SAMPLER_2D_ARRAY
    case 36311:
    // UNSIGNED_INT_SAMPLER_2D_ARRAY
    case 36292:
      return y0;
  }
}
class M0 {
  constructor(e, A, t) {
    this.id = e, this.addr = t, this.cache = [], this.type = A.type, this.setValue = a0(A.type);
  }
}
class F0 {
  constructor(e, A, t) {
    this.id = e, this.addr = t, this.cache = [], this.type = A.type, this.size = A.size, this.setValue = S0(A.type);
  }
}
class b0 {
  constructor(e) {
    this.id = e, this.seq = [], this.map = {};
  }
  setValue(e, A, t) {
    const i = this.seq;
    for (let r = 0, s = i.length; r !== s; ++r) {
      const a = i[r];
      a.setValue(e, A[a.id], t);
    }
  }
}
const Ta = /(\w+)(\])?(\[|\.)?/g;
function Dc(n, e) {
  n.seq.push(e), n.map[e.id] = e;
}
function T0(n, e, A) {
  const t = n.name, i = t.length;
  for (Ta.lastIndex = 0; ; ) {
    const r = Ta.exec(t), s = Ta.lastIndex;
    let a = r[1];
    const o = r[2] === "]", l = r[3];
    if (o && (a = a | 0), l === void 0 || l === "[" && s + 2 === i) {
      Dc(A, l === void 0 ? new M0(a, n, e) : new F0(a, n, e));
      break;
    } else {
      let u = A.map[a];
      u === void 0 && (u = new b0(a), Dc(A, u)), A = u;
    }
  }
}
class Bs {
  constructor(e, A) {
    this.seq = [], this.map = {};
    const t = e.getProgramParameter(A, e.ACTIVE_UNIFORMS);
    for (let i = 0; i < t; ++i) {
      const r = e.getActiveUniform(A, i), s = e.getUniformLocation(A, r.name);
      T0(r, s, this);
    }
  }
  setValue(e, A, t, i) {
    const r = this.map[A];
    r !== void 0 && r.setValue(e, t, i);
  }
  setOptional(e, A, t) {
    const i = A[t];
    i !== void 0 && this.setValue(e, t, i);
  }
  static upload(e, A, t, i) {
    for (let r = 0, s = A.length; r !== s; ++r) {
      const a = A[r], o = t[a.id];
      o.needsUpdate !== !1 && a.setValue(e, o.value, i);
    }
  }
  static seqWithValue(e, A) {
    const t = [];
    for (let i = 0, r = e.length; i !== r; ++i) {
      const s = e[i];
      s.id in A && t.push(s);
    }
    return t;
  }
}
function Hc(n, e, A) {
  const t = n.createShader(e);
  return n.shaderSource(t, A), n.compileShader(t), t;
}
const Q0 = 37297;
let I0 = 0;
function R0(n, e) {
  const A = n.split(`
`), t = [], i = Math.max(e - 6, 0), r = Math.min(e + 6, A.length);
  for (let s = i; s < r; s++) {
    const a = s + 1;
    t.push(`${a === e ? ">" : " "} ${a}: ${A[s]}`);
  }
  return t.join(`
`);
}
const Pc = /* @__PURE__ */ new He();
function L0(n) {
  Xe._getMatrix(Pc, Xe.workingColorSpace, n);
  const e = `mat3( ${Pc.elements.map((A) => A.toFixed(4))} )`;
  switch (Xe.getTransfer(n)) {
    case Es:
      return [e, "LinearTransferOETF"];
    case tA:
      return [e, "sRGBTransferOETF"];
    default:
      return console.warn("THREE.WebGLProgram: Unsupported color space: ", n), [e, "LinearTransferOETF"];
  }
}
function Nc(n, e, A) {
  const t = n.getShaderParameter(e, n.COMPILE_STATUS), i = n.getShaderInfoLog(e).trim();
  if (t && i === "") return "";
  const r = /ERROR: 0:(\d+)/.exec(i);
  if (r) {
    const s = parseInt(r[1]);
    return A.toUpperCase() + `

` + i + `

` + R0(n.getShaderSource(e), s);
  } else
    return i;
}
function D0(n, e) {
  const A = L0(e);
  return [
    `vec4 ${n}( vec4 value ) {`,
    `	return ${A[1]}( vec4( value.rgb * ${A[0]}, value.a ) );`,
    "}"
  ].join(`
`);
}
function H0(n, e) {
  let A;
  switch (e) {
    case Nd:
      A = "Linear";
      break;
    case Od:
      A = "Reinhard";
      break;
    case Gd:
      A = "Cineon";
      break;
    case Vd:
      A = "ACESFilmic";
      break;
    case Kd:
      A = "AgX";
      break;
    case zd:
      A = "Neutral";
      break;
    case kd:
      A = "Custom";
      break;
    default:
      console.warn("THREE.WebGLProgram: Unsupported toneMapping:", e), A = "Linear";
  }
  return "vec3 " + n + "( vec3 color ) { return " + A + "ToneMapping( color ); }";
}
const Or = /* @__PURE__ */ new Q();
function P0() {
  Xe.getLuminanceCoefficients(Or);
  const n = Or.x.toFixed(4), e = Or.y.toFixed(4), A = Or.z.toFixed(4);
  return [
    "float luminance( const in vec3 rgb ) {",
    `	const vec3 weights = vec3( ${n}, ${e}, ${A} );`,
    "	return dot( weights, rgb );",
    "}"
  ].join(`
`);
}
function N0(n) {
  return [
    n.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "",
    n.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""
  ].filter(Pi).join(`
`);
}
function O0(n) {
  const e = [];
  for (const A in n) {
    const t = n[A];
    t !== !1 && e.push("#define " + A + " " + t);
  }
  return e.join(`
`);
}
function G0(n, e) {
  const A = {}, t = n.getProgramParameter(e, n.ACTIVE_ATTRIBUTES);
  for (let i = 0; i < t; i++) {
    const r = n.getActiveAttrib(e, i), s = r.name;
    let a = 1;
    r.type === n.FLOAT_MAT2 && (a = 2), r.type === n.FLOAT_MAT3 && (a = 3), r.type === n.FLOAT_MAT4 && (a = 4), A[s] = {
      type: r.type,
      location: n.getAttribLocation(e, s),
      locationSize: a
    };
  }
  return A;
}
function Pi(n) {
  return n !== "";
}
function Oc(n, e) {
  const A = e.numSpotLightShadows + e.numSpotLightMaps - e.numSpotLightShadowsWithMaps;
  return n.replace(/NUM_DIR_LIGHTS/g, e.numDirLights).replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, A).replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, e.numPointLights).replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, e.numPointLightShadows);
}
function Gc(n, e) {
  return n.replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, e.numClippingPlanes - e.numClipIntersection);
}
const V0 = /^[ \t]*#include +<([\w\d./]+)>/gm;
function Xo(n) {
  return n.replace(V0, K0);
}
const k0 = /* @__PURE__ */ new Map();
function K0(n, e) {
  let A = Ne[e];
  if (A === void 0) {
    const t = k0.get(e);
    if (t !== void 0)
      A = Ne[t], console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', e, t);
    else
      throw new Error("Can not resolve #include <" + e + ">");
  }
  return Xo(A);
}
const z0 = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function Vc(n) {
  return n.replace(z0, W0);
}
function W0(n, e, A, t) {
  let i = "";
  for (let r = parseInt(e); r < parseInt(A); r++)
    i += t.replace(/\[\s*i\s*\]/g, "[ " + r + " ]").replace(/UNROLLED_LOOP_INDEX/g, r);
  return i;
}
function kc(n) {
  let e = `precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;
  return n.precision === "highp" ? e += `
#define HIGH_PRECISION` : n.precision === "mediump" ? e += `
#define MEDIUM_PRECISION` : n.precision === "lowp" && (e += `
#define LOW_PRECISION`), e;
}
function X0(n) {
  let e = "SHADOWMAP_TYPE_BASIC";
  return n.shadowMapType === sh ? e = "SHADOWMAP_TYPE_PCF" : n.shadowMapType === Bd ? e = "SHADOWMAP_TYPE_PCF_SOFT" : n.shadowMapType === Dt && (e = "SHADOWMAP_TYPE_VSM"), e;
}
function Y0(n) {
  let e = "ENVMAP_TYPE_CUBE";
  if (n.envMap)
    switch (n.envMapMode) {
      case Bi:
      case wi:
        e = "ENVMAP_TYPE_CUBE";
        break;
      case Ns:
        e = "ENVMAP_TYPE_CUBE_UV";
        break;
    }
  return e;
}
function J0(n) {
  let e = "ENVMAP_MODE_REFLECTION";
  if (n.envMap)
    switch (n.envMapMode) {
      case wi:
        e = "ENVMAP_MODE_REFRACTION";
        break;
    }
  return e;
}
function q0(n) {
  let e = "ENVMAP_BLENDING_NONE";
  if (n.envMap)
    switch (n.combine) {
      case ah:
        e = "ENVMAP_BLENDING_MULTIPLY";
        break;
      case Hd:
        e = "ENVMAP_BLENDING_MIX";
        break;
      case Pd:
        e = "ENVMAP_BLENDING_ADD";
        break;
    }
  return e;
}
function Z0(n) {
  const e = n.envMapCubeUVHeight;
  if (e === null) return null;
  const A = Math.log2(e) - 2, t = 1 / e;
  return { texelWidth: 1 / (3 * Math.max(Math.pow(2, A), 112)), texelHeight: t, maxMip: A };
}
function j0(n, e, A, t) {
  const i = n.getContext(), r = A.defines;
  let s = A.vertexShader, a = A.fragmentShader;
  const o = X0(A), l = Y0(A), c = J0(A), u = q0(A), f = Z0(A), d = N0(A), g = O0(r), m = i.createProgram();
  let p, h, E = A.glslVersion ? "#version " + A.glslVersion + `
` : "";
  A.isRawShaderMaterial ? (p = [
    "#define SHADER_TYPE " + A.shaderType,
    "#define SHADER_NAME " + A.shaderName,
    g
  ].filter(Pi).join(`
`), p.length > 0 && (p += `
`), h = [
    "#define SHADER_TYPE " + A.shaderType,
    "#define SHADER_NAME " + A.shaderName,
    g
  ].filter(Pi).join(`
`), h.length > 0 && (h += `
`)) : (p = [
    kc(A),
    "#define SHADER_TYPE " + A.shaderType,
    "#define SHADER_NAME " + A.shaderName,
    g,
    A.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
    A.batching ? "#define USE_BATCHING" : "",
    A.batchingColor ? "#define USE_BATCHING_COLOR" : "",
    A.instancing ? "#define USE_INSTANCING" : "",
    A.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
    A.instancingMorph ? "#define USE_INSTANCING_MORPH" : "",
    A.useFog && A.fog ? "#define USE_FOG" : "",
    A.useFog && A.fogExp2 ? "#define FOG_EXP2" : "",
    A.map ? "#define USE_MAP" : "",
    A.envMap ? "#define USE_ENVMAP" : "",
    A.envMap ? "#define " + c : "",
    A.lightMap ? "#define USE_LIGHTMAP" : "",
    A.aoMap ? "#define USE_AOMAP" : "",
    A.bumpMap ? "#define USE_BUMPMAP" : "",
    A.normalMap ? "#define USE_NORMALMAP" : "",
    A.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    A.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    A.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
    A.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    A.anisotropy ? "#define USE_ANISOTROPY" : "",
    A.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    A.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    A.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    A.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    A.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    A.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    A.specularMap ? "#define USE_SPECULARMAP" : "",
    A.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    A.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    A.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    A.metalnessMap ? "#define USE_METALNESSMAP" : "",
    A.alphaMap ? "#define USE_ALPHAMAP" : "",
    A.alphaHash ? "#define USE_ALPHAHASH" : "",
    A.transmission ? "#define USE_TRANSMISSION" : "",
    A.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    A.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    A.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    A.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    //
    A.mapUv ? "#define MAP_UV " + A.mapUv : "",
    A.alphaMapUv ? "#define ALPHAMAP_UV " + A.alphaMapUv : "",
    A.lightMapUv ? "#define LIGHTMAP_UV " + A.lightMapUv : "",
    A.aoMapUv ? "#define AOMAP_UV " + A.aoMapUv : "",
    A.emissiveMapUv ? "#define EMISSIVEMAP_UV " + A.emissiveMapUv : "",
    A.bumpMapUv ? "#define BUMPMAP_UV " + A.bumpMapUv : "",
    A.normalMapUv ? "#define NORMALMAP_UV " + A.normalMapUv : "",
    A.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + A.displacementMapUv : "",
    A.metalnessMapUv ? "#define METALNESSMAP_UV " + A.metalnessMapUv : "",
    A.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + A.roughnessMapUv : "",
    A.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + A.anisotropyMapUv : "",
    A.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + A.clearcoatMapUv : "",
    A.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + A.clearcoatNormalMapUv : "",
    A.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + A.clearcoatRoughnessMapUv : "",
    A.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + A.iridescenceMapUv : "",
    A.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + A.iridescenceThicknessMapUv : "",
    A.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + A.sheenColorMapUv : "",
    A.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + A.sheenRoughnessMapUv : "",
    A.specularMapUv ? "#define SPECULARMAP_UV " + A.specularMapUv : "",
    A.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + A.specularColorMapUv : "",
    A.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + A.specularIntensityMapUv : "",
    A.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + A.transmissionMapUv : "",
    A.thicknessMapUv ? "#define THICKNESSMAP_UV " + A.thicknessMapUv : "",
    //
    A.vertexTangents && A.flatShading === !1 ? "#define USE_TANGENT" : "",
    A.vertexColors ? "#define USE_COLOR" : "",
    A.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    A.vertexUv1s ? "#define USE_UV1" : "",
    A.vertexUv2s ? "#define USE_UV2" : "",
    A.vertexUv3s ? "#define USE_UV3" : "",
    A.pointsUvs ? "#define USE_POINTS_UV" : "",
    A.flatShading ? "#define FLAT_SHADED" : "",
    A.skinning ? "#define USE_SKINNING" : "",
    A.morphTargets ? "#define USE_MORPHTARGETS" : "",
    A.morphNormals && A.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
    A.morphColors ? "#define USE_MORPHCOLORS" : "",
    A.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + A.morphTextureStride : "",
    A.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + A.morphTargetsCount : "",
    A.doubleSided ? "#define DOUBLE_SIDED" : "",
    A.flipSided ? "#define FLIP_SIDED" : "",
    A.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    A.shadowMapEnabled ? "#define " + o : "",
    A.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
    A.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    A.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
    A.reverseDepthBuffer ? "#define USE_REVERSEDEPTHBUF" : "",
    "uniform mat4 modelMatrix;",
    "uniform mat4 modelViewMatrix;",
    "uniform mat4 projectionMatrix;",
    "uniform mat4 viewMatrix;",
    "uniform mat3 normalMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    "#ifdef USE_INSTANCING",
    "	attribute mat4 instanceMatrix;",
    "#endif",
    "#ifdef USE_INSTANCING_COLOR",
    "	attribute vec3 instanceColor;",
    "#endif",
    "#ifdef USE_INSTANCING_MORPH",
    "	uniform sampler2D morphTexture;",
    "#endif",
    "attribute vec3 position;",
    "attribute vec3 normal;",
    "attribute vec2 uv;",
    "#ifdef USE_UV1",
    "	attribute vec2 uv1;",
    "#endif",
    "#ifdef USE_UV2",
    "	attribute vec2 uv2;",
    "#endif",
    "#ifdef USE_UV3",
    "	attribute vec2 uv3;",
    "#endif",
    "#ifdef USE_TANGENT",
    "	attribute vec4 tangent;",
    "#endif",
    "#if defined( USE_COLOR_ALPHA )",
    "	attribute vec4 color;",
    "#elif defined( USE_COLOR )",
    "	attribute vec3 color;",
    "#endif",
    "#ifdef USE_SKINNING",
    "	attribute vec4 skinIndex;",
    "	attribute vec4 skinWeight;",
    "#endif",
    `
`
  ].filter(Pi).join(`
`), h = [
    kc(A),
    "#define SHADER_TYPE " + A.shaderType,
    "#define SHADER_NAME " + A.shaderName,
    g,
    A.useFog && A.fog ? "#define USE_FOG" : "",
    A.useFog && A.fogExp2 ? "#define FOG_EXP2" : "",
    A.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
    A.map ? "#define USE_MAP" : "",
    A.matcap ? "#define USE_MATCAP" : "",
    A.envMap ? "#define USE_ENVMAP" : "",
    A.envMap ? "#define " + l : "",
    A.envMap ? "#define " + c : "",
    A.envMap ? "#define " + u : "",
    f ? "#define CUBEUV_TEXEL_WIDTH " + f.texelWidth : "",
    f ? "#define CUBEUV_TEXEL_HEIGHT " + f.texelHeight : "",
    f ? "#define CUBEUV_MAX_MIP " + f.maxMip + ".0" : "",
    A.lightMap ? "#define USE_LIGHTMAP" : "",
    A.aoMap ? "#define USE_AOMAP" : "",
    A.bumpMap ? "#define USE_BUMPMAP" : "",
    A.normalMap ? "#define USE_NORMALMAP" : "",
    A.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    A.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    A.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    A.anisotropy ? "#define USE_ANISOTROPY" : "",
    A.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    A.clearcoat ? "#define USE_CLEARCOAT" : "",
    A.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    A.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    A.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    A.dispersion ? "#define USE_DISPERSION" : "",
    A.iridescence ? "#define USE_IRIDESCENCE" : "",
    A.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    A.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    A.specularMap ? "#define USE_SPECULARMAP" : "",
    A.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    A.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    A.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    A.metalnessMap ? "#define USE_METALNESSMAP" : "",
    A.alphaMap ? "#define USE_ALPHAMAP" : "",
    A.alphaTest ? "#define USE_ALPHATEST" : "",
    A.alphaHash ? "#define USE_ALPHAHASH" : "",
    A.sheen ? "#define USE_SHEEN" : "",
    A.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    A.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    A.transmission ? "#define USE_TRANSMISSION" : "",
    A.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    A.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    A.vertexTangents && A.flatShading === !1 ? "#define USE_TANGENT" : "",
    A.vertexColors || A.instancingColor || A.batchingColor ? "#define USE_COLOR" : "",
    A.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    A.vertexUv1s ? "#define USE_UV1" : "",
    A.vertexUv2s ? "#define USE_UV2" : "",
    A.vertexUv3s ? "#define USE_UV3" : "",
    A.pointsUvs ? "#define USE_POINTS_UV" : "",
    A.gradientMap ? "#define USE_GRADIENTMAP" : "",
    A.flatShading ? "#define FLAT_SHADED" : "",
    A.doubleSided ? "#define DOUBLE_SIDED" : "",
    A.flipSided ? "#define FLIP_SIDED" : "",
    A.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    A.shadowMapEnabled ? "#define " + o : "",
    A.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
    A.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    A.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
    A.decodeVideoTextureEmissive ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE" : "",
    A.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
    A.reverseDepthBuffer ? "#define USE_REVERSEDEPTHBUF" : "",
    "uniform mat4 viewMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    A.toneMapping !== sn ? "#define TONE_MAPPING" : "",
    A.toneMapping !== sn ? Ne.tonemapping_pars_fragment : "",
    // this code is required here because it is used by the toneMapping() function defined below
    A.toneMapping !== sn ? H0("toneMapping", A.toneMapping) : "",
    A.dithering ? "#define DITHERING" : "",
    A.opaque ? "#define OPAQUE" : "",
    Ne.colorspace_pars_fragment,
    // this code is required here because it is used by the various encoding/decoding function defined below
    D0("linearToOutputTexel", A.outputColorSpace),
    P0(),
    A.useDepthPacking ? "#define DEPTH_PACKING " + A.depthPacking : "",
    `
`
  ].filter(Pi).join(`
`)), s = Xo(s), s = Oc(s, A), s = Gc(s, A), a = Xo(a), a = Oc(a, A), a = Gc(a, A), s = Vc(s), a = Vc(a), A.isRawShaderMaterial !== !0 && (E = `#version 300 es
`, p = [
    d,
    "#define attribute in",
    "#define varying out",
    "#define texture2D texture"
  ].join(`
`) + `
` + p, h = [
    "#define varying in",
    A.glslVersion === ql ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
    A.glslVersion === ql ? "" : "#define gl_FragColor pc_fragColor",
    "#define gl_FragDepthEXT gl_FragDepth",
    "#define texture2D texture",
    "#define textureCube texture",
    "#define texture2DProj textureProj",
    "#define texture2DLodEXT textureLod",
    "#define texture2DProjLodEXT textureProjLod",
    "#define textureCubeLodEXT textureLod",
    "#define texture2DGradEXT textureGrad",
    "#define texture2DProjGradEXT textureProjGrad",
    "#define textureCubeGradEXT textureGrad"
  ].join(`
`) + `
` + h);
  const U = E + p + s, B = E + h + a, S = Hc(i, i.VERTEX_SHADER, U), x = Hc(i, i.FRAGMENT_SHADER, B);
  i.attachShader(m, S), i.attachShader(m, x), A.index0AttributeName !== void 0 ? i.bindAttribLocation(m, 0, A.index0AttributeName) : A.morphTargets === !0 && i.bindAttribLocation(m, 0, "position"), i.linkProgram(m);
  function M(b) {
    if (n.debug.checkShaderErrors) {
      const H = i.getProgramInfoLog(m).trim(), R = i.getShaderInfoLog(S).trim(), N = i.getShaderInfoLog(x).trim();
      let Y = !0, k = !0;
      if (i.getProgramParameter(m, i.LINK_STATUS) === !1)
        if (Y = !1, typeof n.debug.onShaderError == "function")
          n.debug.onShaderError(i, m, S, x);
        else {
          const Z = Nc(i, S, "vertex"), K = Nc(i, x, "fragment");
          console.error(
            "THREE.WebGLProgram: Shader Error " + i.getError() + " - VALIDATE_STATUS " + i.getProgramParameter(m, i.VALIDATE_STATUS) + `

Material Name: ` + b.name + `
Material Type: ` + b.type + `

Program Info Log: ` + H + `
` + Z + `
` + K
          );
        }
      else H !== "" ? console.warn("THREE.WebGLProgram: Program Info Log:", H) : (R === "" || N === "") && (k = !1);
      k && (b.diagnostics = {
        runnable: Y,
        programLog: H,
        vertexShader: {
          log: R,
          prefix: p
        },
        fragmentShader: {
          log: N,
          prefix: h
        }
      });
    }
    i.deleteShader(S), i.deleteShader(x), F = new Bs(i, m), _ = G0(i, m);
  }
  let F;
  this.getUniforms = function() {
    return F === void 0 && M(this), F;
  };
  let _;
  this.getAttributes = function() {
    return _ === void 0 && M(this), _;
  };
  let v = A.rendererExtensionParallelShaderCompile === !1;
  return this.isReady = function() {
    return v === !1 && (v = i.getProgramParameter(m, Q0)), v;
  }, this.destroy = function() {
    t.releaseStatesOfProgram(this), i.deleteProgram(m), this.program = void 0;
  }, this.type = A.shaderType, this.name = A.shaderName, this.id = I0++, this.cacheKey = e, this.usedTimes = 1, this.program = m, this.vertexShader = S, this.fragmentShader = x, this;
}
let $0 = 0;
class ew {
  constructor() {
    this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
  }
  update(e) {
    const A = e.vertexShader, t = e.fragmentShader, i = this._getShaderStage(A), r = this._getShaderStage(t), s = this._getShaderCacheForMaterial(e);
    return s.has(i) === !1 && (s.add(i), i.usedTimes++), s.has(r) === !1 && (s.add(r), r.usedTimes++), this;
  }
  remove(e) {
    const A = this.materialCache.get(e);
    for (const t of A)
      t.usedTimes--, t.usedTimes === 0 && this.shaderCache.delete(t.code);
    return this.materialCache.delete(e), this;
  }
  getVertexShaderID(e) {
    return this._getShaderStage(e.vertexShader).id;
  }
  getFragmentShaderID(e) {
    return this._getShaderStage(e.fragmentShader).id;
  }
  dispose() {
    this.shaderCache.clear(), this.materialCache.clear();
  }
  _getShaderCacheForMaterial(e) {
    const A = this.materialCache;
    let t = A.get(e);
    return t === void 0 && (t = /* @__PURE__ */ new Set(), A.set(e, t)), t;
  }
  _getShaderStage(e) {
    const A = this.shaderCache;
    let t = A.get(e);
    return t === void 0 && (t = new Aw(e), A.set(e, t)), t;
  }
}
class Aw {
  constructor(e) {
    this.id = $0++, this.code = e, this.usedTimes = 0;
  }
}
function tw(n, e, A, t, i, r, s) {
  const a = new xl(), o = new ew(), l = /* @__PURE__ */ new Set(), c = [], u = i.logarithmicDepthBuffer, f = i.vertexTextures;
  let d = i.precision;
  const g = {
    MeshDepthMaterial: "depth",
    MeshDistanceMaterial: "distanceRGBA",
    MeshNormalMaterial: "normal",
    MeshBasicMaterial: "basic",
    MeshLambertMaterial: "lambert",
    MeshPhongMaterial: "phong",
    MeshToonMaterial: "toon",
    MeshStandardMaterial: "physical",
    MeshPhysicalMaterial: "physical",
    MeshMatcapMaterial: "matcap",
    LineBasicMaterial: "basic",
    LineDashedMaterial: "dashed",
    PointsMaterial: "points",
    ShadowMaterial: "shadow",
    SpriteMaterial: "sprite"
  };
  function m(_) {
    return l.add(_), _ === 0 ? "uv" : `uv${_}`;
  }
  function p(_, v, b, H, R) {
    const N = H.fog, Y = R.geometry, k = _.isMeshStandardMaterial ? H.environment : null, Z = (_.isMeshStandardMaterial ? A : e).get(_.envMap || k), K = Z && Z.mapping === Ns ? Z.image.height : null, ne = g[_.type];
    _.precision !== null && (d = i.getMaxPrecision(_.precision), d !== _.precision && console.warn("THREE.WebGLProgram.getParameters:", _.precision, "not supported, using", d, "instead."));
    const oe = Y.morphAttributes.position || Y.morphAttributes.normal || Y.morphAttributes.color, Be = oe !== void 0 ? oe.length : 0;
    let Fe = 0;
    Y.morphAttributes.position !== void 0 && (Fe = 1), Y.morphAttributes.normal !== void 0 && (Fe = 2), Y.morphAttributes.color !== void 0 && (Fe = 3);
    let Re, W, ee, de;
    if (ne) {
      const $e = Ct[ne];
      Re = $e.vertexShader, W = $e.fragmentShader;
    } else
      Re = _.vertexShader, W = _.fragmentShader, o.update(_), ee = o.getVertexShaderID(_), de = o.getFragmentShaderID(_);
    const ie = n.getRenderTarget(), xe = n.state.buffers.depth.getReversed(), Te = R.isInstancedMesh === !0, Le = R.isBatchedMesh === !0, sA = !!_.map, Oe = !!_.matcap, aA = !!Z, T = !!_.aoMap, dA = !!_.lightMap, Se = !!_.bumpMap, Ge = !!_.normalMap, Ee = !!_.displacementMap, AA = !!_.emissiveMap, Ce = !!_.metalnessMap, y = !!_.roughnessMap, w = _.anisotropy > 0, P = _.clearcoat > 0, J = _.dispersion > 0, j = _.iridescence > 0, X = _.sheen > 0, ve = _.transmission > 0, ae = w && !!_.anisotropyMap, pe = P && !!_.clearcoatMap, Ve = P && !!_.clearcoatNormalMap, te = P && !!_.clearcoatRoughnessMap, O = j && !!_.iridescenceMap, $ = j && !!_.iridescenceThicknessMap, _e = X && !!_.sheenColorMap, se = X && !!_.sheenRoughnessMap, Me = !!_.specularMap, be = !!_.specularColorMap, Je = !!_.specularIntensityMap, I = ve && !!_.transmissionMap, le = ve && !!_.thicknessMap, z = !!_.gradientMap, q = !!_.alphaMap, re = _.alphaTest > 0, ue = !!_.alphaHash, De = !!_.extensions;
    let hA = sn;
    _.toneMapped && (ie === null || ie.isXRRenderTarget === !0) && (hA = n.toneMapping);
    const IA = {
      shaderID: ne,
      shaderType: _.type,
      shaderName: _.name,
      vertexShader: Re,
      fragmentShader: W,
      defines: _.defines,
      customVertexShaderID: ee,
      customFragmentShaderID: de,
      isRawShaderMaterial: _.isRawShaderMaterial === !0,
      glslVersion: _.glslVersion,
      precision: d,
      batching: Le,
      batchingColor: Le && R._colorsTexture !== null,
      instancing: Te,
      instancingColor: Te && R.instanceColor !== null,
      instancingMorph: Te && R.morphTexture !== null,
      supportsVertexTextures: f,
      outputColorSpace: ie === null ? n.outputColorSpace : ie.isXRRenderTarget === !0 ? ie.texture.colorSpace : Ci,
      alphaToCoverage: !!_.alphaToCoverage,
      map: sA,
      matcap: Oe,
      envMap: aA,
      envMapMode: aA && Z.mapping,
      envMapCubeUVHeight: K,
      aoMap: T,
      lightMap: dA,
      bumpMap: Se,
      normalMap: Ge,
      displacementMap: f && Ee,
      emissiveMap: AA,
      normalMapObjectSpace: Ge && _.normalMapType === qd,
      normalMapTangentSpace: Ge && _.normalMapType === Jd,
      metalnessMap: Ce,
      roughnessMap: y,
      anisotropy: w,
      anisotropyMap: ae,
      clearcoat: P,
      clearcoatMap: pe,
      clearcoatNormalMap: Ve,
      clearcoatRoughnessMap: te,
      dispersion: J,
      iridescence: j,
      iridescenceMap: O,
      iridescenceThicknessMap: $,
      sheen: X,
      sheenColorMap: _e,
      sheenRoughnessMap: se,
      specularMap: Me,
      specularColorMap: be,
      specularIntensityMap: Je,
      transmission: ve,
      transmissionMap: I,
      thicknessMap: le,
      gradientMap: z,
      opaque: _.transparent === !1 && _.blending === hi && _.alphaToCoverage === !1,
      alphaMap: q,
      alphaTest: re,
      alphaHash: ue,
      combine: _.combine,
      //
      mapUv: sA && m(_.map.channel),
      aoMapUv: T && m(_.aoMap.channel),
      lightMapUv: dA && m(_.lightMap.channel),
      bumpMapUv: Se && m(_.bumpMap.channel),
      normalMapUv: Ge && m(_.normalMap.channel),
      displacementMapUv: Ee && m(_.displacementMap.channel),
      emissiveMapUv: AA && m(_.emissiveMap.channel),
      metalnessMapUv: Ce && m(_.metalnessMap.channel),
      roughnessMapUv: y && m(_.roughnessMap.channel),
      anisotropyMapUv: ae && m(_.anisotropyMap.channel),
      clearcoatMapUv: pe && m(_.clearcoatMap.channel),
      clearcoatNormalMapUv: Ve && m(_.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: te && m(_.clearcoatRoughnessMap.channel),
      iridescenceMapUv: O && m(_.iridescenceMap.channel),
      iridescenceThicknessMapUv: $ && m(_.iridescenceThicknessMap.channel),
      sheenColorMapUv: _e && m(_.sheenColorMap.channel),
      sheenRoughnessMapUv: se && m(_.sheenRoughnessMap.channel),
      specularMapUv: Me && m(_.specularMap.channel),
      specularColorMapUv: be && m(_.specularColorMap.channel),
      specularIntensityMapUv: Je && m(_.specularIntensityMap.channel),
      transmissionMapUv: I && m(_.transmissionMap.channel),
      thicknessMapUv: le && m(_.thicknessMap.channel),
      alphaMapUv: q && m(_.alphaMap.channel),
      //
      vertexTangents: !!Y.attributes.tangent && (Ge || w),
      vertexColors: _.vertexColors,
      vertexAlphas: _.vertexColors === !0 && !!Y.attributes.color && Y.attributes.color.itemSize === 4,
      pointsUvs: R.isPoints === !0 && !!Y.attributes.uv && (sA || q),
      fog: !!N,
      useFog: _.fog === !0,
      fogExp2: !!N && N.isFogExp2,
      flatShading: _.flatShading === !0,
      sizeAttenuation: _.sizeAttenuation === !0,
      logarithmicDepthBuffer: u,
      reverseDepthBuffer: xe,
      skinning: R.isSkinnedMesh === !0,
      morphTargets: Y.morphAttributes.position !== void 0,
      morphNormals: Y.morphAttributes.normal !== void 0,
      morphColors: Y.morphAttributes.color !== void 0,
      morphTargetsCount: Be,
      morphTextureStride: Fe,
      numDirLights: v.directional.length,
      numPointLights: v.point.length,
      numSpotLights: v.spot.length,
      numSpotLightMaps: v.spotLightMap.length,
      numRectAreaLights: v.rectArea.length,
      numHemiLights: v.hemi.length,
      numDirLightShadows: v.directionalShadowMap.length,
      numPointLightShadows: v.pointShadowMap.length,
      numSpotLightShadows: v.spotShadowMap.length,
      numSpotLightShadowsWithMaps: v.numSpotLightShadowsWithMaps,
      numLightProbes: v.numLightProbes,
      numClippingPlanes: s.numPlanes,
      numClipIntersection: s.numIntersection,
      dithering: _.dithering,
      shadowMapEnabled: n.shadowMap.enabled && b.length > 0,
      shadowMapType: n.shadowMap.type,
      toneMapping: hA,
      decodeVideoTexture: sA && _.map.isVideoTexture === !0 && Xe.getTransfer(_.map.colorSpace) === tA,
      decodeVideoTextureEmissive: AA && _.emissiveMap.isVideoTexture === !0 && Xe.getTransfer(_.emissiveMap.colorSpace) === tA,
      premultipliedAlpha: _.premultipliedAlpha,
      doubleSided: _.side === gt,
      flipSided: _.side === zA,
      useDepthPacking: _.depthPacking >= 0,
      depthPacking: _.depthPacking || 0,
      index0AttributeName: _.index0AttributeName,
      extensionClipCullDistance: De && _.extensions.clipCullDistance === !0 && t.has("WEBGL_clip_cull_distance"),
      extensionMultiDraw: (De && _.extensions.multiDraw === !0 || Le) && t.has("WEBGL_multi_draw"),
      rendererExtensionParallelShaderCompile: t.has("KHR_parallel_shader_compile"),
      customProgramCacheKey: _.customProgramCacheKey()
    };
    return IA.vertexUv1s = l.has(1), IA.vertexUv2s = l.has(2), IA.vertexUv3s = l.has(3), l.clear(), IA;
  }
  function h(_) {
    const v = [];
    if (_.shaderID ? v.push(_.shaderID) : (v.push(_.customVertexShaderID), v.push(_.customFragmentShaderID)), _.defines !== void 0)
      for (const b in _.defines)
        v.push(b), v.push(_.defines[b]);
    return _.isRawShaderMaterial === !1 && (E(v, _), U(v, _), v.push(n.outputColorSpace)), v.push(_.customProgramCacheKey), v.join();
  }
  function E(_, v) {
    _.push(v.precision), _.push(v.outputColorSpace), _.push(v.envMapMode), _.push(v.envMapCubeUVHeight), _.push(v.mapUv), _.push(v.alphaMapUv), _.push(v.lightMapUv), _.push(v.aoMapUv), _.push(v.bumpMapUv), _.push(v.normalMapUv), _.push(v.displacementMapUv), _.push(v.emissiveMapUv), _.push(v.metalnessMapUv), _.push(v.roughnessMapUv), _.push(v.anisotropyMapUv), _.push(v.clearcoatMapUv), _.push(v.clearcoatNormalMapUv), _.push(v.clearcoatRoughnessMapUv), _.push(v.iridescenceMapUv), _.push(v.iridescenceThicknessMapUv), _.push(v.sheenColorMapUv), _.push(v.sheenRoughnessMapUv), _.push(v.specularMapUv), _.push(v.specularColorMapUv), _.push(v.specularIntensityMapUv), _.push(v.transmissionMapUv), _.push(v.thicknessMapUv), _.push(v.combine), _.push(v.fogExp2), _.push(v.sizeAttenuation), _.push(v.morphTargetsCount), _.push(v.morphAttributeCount), _.push(v.numDirLights), _.push(v.numPointLights), _.push(v.numSpotLights), _.push(v.numSpotLightMaps), _.push(v.numHemiLights), _.push(v.numRectAreaLights), _.push(v.numDirLightShadows), _.push(v.numPointLightShadows), _.push(v.numSpotLightShadows), _.push(v.numSpotLightShadowsWithMaps), _.push(v.numLightProbes), _.push(v.shadowMapType), _.push(v.toneMapping), _.push(v.numClippingPlanes), _.push(v.numClipIntersection), _.push(v.depthPacking);
  }
  function U(_, v) {
    a.disableAll(), v.supportsVertexTextures && a.enable(0), v.instancing && a.enable(1), v.instancingColor && a.enable(2), v.instancingMorph && a.enable(3), v.matcap && a.enable(4), v.envMap && a.enable(5), v.normalMapObjectSpace && a.enable(6), v.normalMapTangentSpace && a.enable(7), v.clearcoat && a.enable(8), v.iridescence && a.enable(9), v.alphaTest && a.enable(10), v.vertexColors && a.enable(11), v.vertexAlphas && a.enable(12), v.vertexUv1s && a.enable(13), v.vertexUv2s && a.enable(14), v.vertexUv3s && a.enable(15), v.vertexTangents && a.enable(16), v.anisotropy && a.enable(17), v.alphaHash && a.enable(18), v.batching && a.enable(19), v.dispersion && a.enable(20), v.batchingColor && a.enable(21), _.push(a.mask), a.disableAll(), v.fog && a.enable(0), v.useFog && a.enable(1), v.flatShading && a.enable(2), v.logarithmicDepthBuffer && a.enable(3), v.reverseDepthBuffer && a.enable(4), v.skinning && a.enable(5), v.morphTargets && a.enable(6), v.morphNormals && a.enable(7), v.morphColors && a.enable(8), v.premultipliedAlpha && a.enable(9), v.shadowMapEnabled && a.enable(10), v.doubleSided && a.enable(11), v.flipSided && a.enable(12), v.useDepthPacking && a.enable(13), v.dithering && a.enable(14), v.transmission && a.enable(15), v.sheen && a.enable(16), v.opaque && a.enable(17), v.pointsUvs && a.enable(18), v.decodeVideoTexture && a.enable(19), v.decodeVideoTextureEmissive && a.enable(20), v.alphaToCoverage && a.enable(21), _.push(a.mask);
  }
  function B(_) {
    const v = g[_.type];
    let b;
    if (v) {
      const H = Ct[v];
      b = Sp.clone(H.uniforms);
    } else
      b = _.uniforms;
    return b;
  }
  function S(_, v) {
    let b;
    for (let H = 0, R = c.length; H < R; H++) {
      const N = c[H];
      if (N.cacheKey === v) {
        b = N, ++b.usedTimes;
        break;
      }
    }
    return b === void 0 && (b = new j0(n, v, _, r), c.push(b)), b;
  }
  function x(_) {
    if (--_.usedTimes === 0) {
      const v = c.indexOf(_);
      c[v] = c[c.length - 1], c.pop(), _.destroy();
    }
  }
  function M(_) {
    o.remove(_);
  }
  function F() {
    o.dispose();
  }
  return {
    getParameters: p,
    getProgramCacheKey: h,
    getUniforms: B,
    acquireProgram: S,
    releaseProgram: x,
    releaseShaderCache: M,
    // Exposed for resource monitoring & error feedback via renderer.info:
    programs: c,
    dispose: F
  };
}
function nw() {
  let n = /* @__PURE__ */ new WeakMap();
  function e(s) {
    return n.has(s);
  }
  function A(s) {
    let a = n.get(s);
    return a === void 0 && (a = {}, n.set(s, a)), a;
  }
  function t(s) {
    n.delete(s);
  }
  function i(s, a, o) {
    n.get(s)[a] = o;
  }
  function r() {
    n = /* @__PURE__ */ new WeakMap();
  }
  return {
    has: e,
    get: A,
    remove: t,
    update: i,
    dispose: r
  };
}
function iw(n, e) {
  return n.groupOrder !== e.groupOrder ? n.groupOrder - e.groupOrder : n.renderOrder !== e.renderOrder ? n.renderOrder - e.renderOrder : n.material.id !== e.material.id ? n.material.id - e.material.id : n.z !== e.z ? n.z - e.z : n.id - e.id;
}
function Kc(n, e) {
  return n.groupOrder !== e.groupOrder ? n.groupOrder - e.groupOrder : n.renderOrder !== e.renderOrder ? n.renderOrder - e.renderOrder : n.z !== e.z ? e.z - n.z : n.id - e.id;
}
function zc() {
  const n = [];
  let e = 0;
  const A = [], t = [], i = [];
  function r() {
    e = 0, A.length = 0, t.length = 0, i.length = 0;
  }
  function s(u, f, d, g, m, p) {
    let h = n[e];
    return h === void 0 ? (h = {
      id: u.id,
      object: u,
      geometry: f,
      material: d,
      groupOrder: g,
      renderOrder: u.renderOrder,
      z: m,
      group: p
    }, n[e] = h) : (h.id = u.id, h.object = u, h.geometry = f, h.material = d, h.groupOrder = g, h.renderOrder = u.renderOrder, h.z = m, h.group = p), e++, h;
  }
  function a(u, f, d, g, m, p) {
    const h = s(u, f, d, g, m, p);
    d.transmission > 0 ? t.push(h) : d.transparent === !0 ? i.push(h) : A.push(h);
  }
  function o(u, f, d, g, m, p) {
    const h = s(u, f, d, g, m, p);
    d.transmission > 0 ? t.unshift(h) : d.transparent === !0 ? i.unshift(h) : A.unshift(h);
  }
  function l(u, f) {
    A.length > 1 && A.sort(u || iw), t.length > 1 && t.sort(f || Kc), i.length > 1 && i.sort(f || Kc);
  }
  function c() {
    for (let u = e, f = n.length; u < f; u++) {
      const d = n[u];
      if (d.id === null) break;
      d.id = null, d.object = null, d.geometry = null, d.material = null, d.group = null;
    }
  }
  return {
    opaque: A,
    transmissive: t,
    transparent: i,
    init: r,
    push: a,
    unshift: o,
    finish: c,
    sort: l
  };
}
function rw() {
  let n = /* @__PURE__ */ new WeakMap();
  function e(t, i) {
    const r = n.get(t);
    let s;
    return r === void 0 ? (s = new zc(), n.set(t, [s])) : i >= r.length ? (s = new zc(), r.push(s)) : s = r[i], s;
  }
  function A() {
    n = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: e,
    dispose: A
  };
}
function sw() {
  const n = {};
  return {
    get: function(e) {
      if (n[e.id] !== void 0)
        return n[e.id];
      let A;
      switch (e.type) {
        case "DirectionalLight":
          A = {
            direction: new Q(),
            color: new Ye()
          };
          break;
        case "SpotLight":
          A = {
            position: new Q(),
            direction: new Q(),
            color: new Ye(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0
          };
          break;
        case "PointLight":
          A = {
            position: new Q(),
            color: new Ye(),
            distance: 0,
            decay: 0
          };
          break;
        case "HemisphereLight":
          A = {
            direction: new Q(),
            skyColor: new Ye(),
            groundColor: new Ye()
          };
          break;
        case "RectAreaLight":
          A = {
            color: new Ye(),
            position: new Q(),
            halfWidth: new Q(),
            halfHeight: new Q()
          };
          break;
      }
      return n[e.id] = A, A;
    }
  };
}
function aw() {
  const n = {};
  return {
    get: function(e) {
      if (n[e.id] !== void 0)
        return n[e.id];
      let A;
      switch (e.type) {
        case "DirectionalLight":
          A = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Pe()
          };
          break;
        case "SpotLight":
          A = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Pe()
          };
          break;
        case "PointLight":
          A = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Pe(),
            shadowCameraNear: 1,
            shadowCameraFar: 1e3
          };
          break;
      }
      return n[e.id] = A, A;
    }
  };
}
let ow = 0;
function lw(n, e) {
  return (e.castShadow ? 2 : 0) - (n.castShadow ? 2 : 0) + (e.map ? 1 : 0) - (n.map ? 1 : 0);
}
function cw(n) {
  const e = new sw(), A = aw(), t = {
    version: 0,
    hash: {
      directionalLength: -1,
      pointLength: -1,
      spotLength: -1,
      rectAreaLength: -1,
      hemiLength: -1,
      numDirectionalShadows: -1,
      numPointShadows: -1,
      numSpotShadows: -1,
      numSpotMaps: -1,
      numLightProbes: -1
    },
    ambient: [0, 0, 0],
    probe: [],
    directional: [],
    directionalShadow: [],
    directionalShadowMap: [],
    directionalShadowMatrix: [],
    spot: [],
    spotLightMap: [],
    spotShadow: [],
    spotShadowMap: [],
    spotLightMatrix: [],
    rectArea: [],
    rectAreaLTC1: null,
    rectAreaLTC2: null,
    point: [],
    pointShadow: [],
    pointShadowMap: [],
    pointShadowMatrix: [],
    hemi: [],
    numSpotLightShadowsWithMaps: 0,
    numLightProbes: 0
  };
  for (let l = 0; l < 9; l++) t.probe.push(new Q());
  const i = new Q(), r = new uA(), s = new uA();
  function a(l) {
    let c = 0, u = 0, f = 0;
    for (let _ = 0; _ < 9; _++) t.probe[_].set(0, 0, 0);
    let d = 0, g = 0, m = 0, p = 0, h = 0, E = 0, U = 0, B = 0, S = 0, x = 0, M = 0;
    l.sort(lw);
    for (let _ = 0, v = l.length; _ < v; _++) {
      const b = l[_], H = b.color, R = b.intensity, N = b.distance, Y = b.shadow && b.shadow.map ? b.shadow.map.texture : null;
      if (b.isAmbientLight)
        c += H.r * R, u += H.g * R, f += H.b * R;
      else if (b.isLightProbe) {
        for (let k = 0; k < 9; k++)
          t.probe[k].addScaledVector(b.sh.coefficients[k], R);
        M++;
      } else if (b.isDirectionalLight) {
        const k = e.get(b);
        if (k.color.copy(b.color).multiplyScalar(b.intensity), b.castShadow) {
          const Z = b.shadow, K = A.get(b);
          K.shadowIntensity = Z.intensity, K.shadowBias = Z.bias, K.shadowNormalBias = Z.normalBias, K.shadowRadius = Z.radius, K.shadowMapSize = Z.mapSize, t.directionalShadow[d] = K, t.directionalShadowMap[d] = Y, t.directionalShadowMatrix[d] = b.shadow.matrix, E++;
        }
        t.directional[d] = k, d++;
      } else if (b.isSpotLight) {
        const k = e.get(b);
        k.position.setFromMatrixPosition(b.matrixWorld), k.color.copy(H).multiplyScalar(R), k.distance = N, k.coneCos = Math.cos(b.angle), k.penumbraCos = Math.cos(b.angle * (1 - b.penumbra)), k.decay = b.decay, t.spot[m] = k;
        const Z = b.shadow;
        if (b.map && (t.spotLightMap[S] = b.map, S++, Z.updateMatrices(b), b.castShadow && x++), t.spotLightMatrix[m] = Z.matrix, b.castShadow) {
          const K = A.get(b);
          K.shadowIntensity = Z.intensity, K.shadowBias = Z.bias, K.shadowNormalBias = Z.normalBias, K.shadowRadius = Z.radius, K.shadowMapSize = Z.mapSize, t.spotShadow[m] = K, t.spotShadowMap[m] = Y, B++;
        }
        m++;
      } else if (b.isRectAreaLight) {
        const k = e.get(b);
        k.color.copy(H).multiplyScalar(R), k.halfWidth.set(b.width * 0.5, 0, 0), k.halfHeight.set(0, b.height * 0.5, 0), t.rectArea[p] = k, p++;
      } else if (b.isPointLight) {
        const k = e.get(b);
        if (k.color.copy(b.color).multiplyScalar(b.intensity), k.distance = b.distance, k.decay = b.decay, b.castShadow) {
          const Z = b.shadow, K = A.get(b);
          K.shadowIntensity = Z.intensity, K.shadowBias = Z.bias, K.shadowNormalBias = Z.normalBias, K.shadowRadius = Z.radius, K.shadowMapSize = Z.mapSize, K.shadowCameraNear = Z.camera.near, K.shadowCameraFar = Z.camera.far, t.pointShadow[g] = K, t.pointShadowMap[g] = Y, t.pointShadowMatrix[g] = b.shadow.matrix, U++;
        }
        t.point[g] = k, g++;
      } else if (b.isHemisphereLight) {
        const k = e.get(b);
        k.skyColor.copy(b.color).multiplyScalar(R), k.groundColor.copy(b.groundColor).multiplyScalar(R), t.hemi[h] = k, h++;
      }
    }
    p > 0 && (n.has("OES_texture_float_linear") === !0 ? (t.rectAreaLTC1 = ce.LTC_FLOAT_1, t.rectAreaLTC2 = ce.LTC_FLOAT_2) : (t.rectAreaLTC1 = ce.LTC_HALF_1, t.rectAreaLTC2 = ce.LTC_HALF_2)), t.ambient[0] = c, t.ambient[1] = u, t.ambient[2] = f;
    const F = t.hash;
    (F.directionalLength !== d || F.pointLength !== g || F.spotLength !== m || F.rectAreaLength !== p || F.hemiLength !== h || F.numDirectionalShadows !== E || F.numPointShadows !== U || F.numSpotShadows !== B || F.numSpotMaps !== S || F.numLightProbes !== M) && (t.directional.length = d, t.spot.length = m, t.rectArea.length = p, t.point.length = g, t.hemi.length = h, t.directionalShadow.length = E, t.directionalShadowMap.length = E, t.pointShadow.length = U, t.pointShadowMap.length = U, t.spotShadow.length = B, t.spotShadowMap.length = B, t.directionalShadowMatrix.length = E, t.pointShadowMatrix.length = U, t.spotLightMatrix.length = B + S - x, t.spotLightMap.length = S, t.numSpotLightShadowsWithMaps = x, t.numLightProbes = M, F.directionalLength = d, F.pointLength = g, F.spotLength = m, F.rectAreaLength = p, F.hemiLength = h, F.numDirectionalShadows = E, F.numPointShadows = U, F.numSpotShadows = B, F.numSpotMaps = S, F.numLightProbes = M, t.version = ow++);
  }
  function o(l, c) {
    let u = 0, f = 0, d = 0, g = 0, m = 0;
    const p = c.matrixWorldInverse;
    for (let h = 0, E = l.length; h < E; h++) {
      const U = l[h];
      if (U.isDirectionalLight) {
        const B = t.directional[u];
        B.direction.setFromMatrixPosition(U.matrixWorld), i.setFromMatrixPosition(U.target.matrixWorld), B.direction.sub(i), B.direction.transformDirection(p), u++;
      } else if (U.isSpotLight) {
        const B = t.spot[d];
        B.position.setFromMatrixPosition(U.matrixWorld), B.position.applyMatrix4(p), B.direction.setFromMatrixPosition(U.matrixWorld), i.setFromMatrixPosition(U.target.matrixWorld), B.direction.sub(i), B.direction.transformDirection(p), d++;
      } else if (U.isRectAreaLight) {
        const B = t.rectArea[g];
        B.position.setFromMatrixPosition(U.matrixWorld), B.position.applyMatrix4(p), s.identity(), r.copy(U.matrixWorld), r.premultiply(p), s.extractRotation(r), B.halfWidth.set(U.width * 0.5, 0, 0), B.halfHeight.set(0, U.height * 0.5, 0), B.halfWidth.applyMatrix4(s), B.halfHeight.applyMatrix4(s), g++;
      } else if (U.isPointLight) {
        const B = t.point[f];
        B.position.setFromMatrixPosition(U.matrixWorld), B.position.applyMatrix4(p), f++;
      } else if (U.isHemisphereLight) {
        const B = t.hemi[m];
        B.direction.setFromMatrixPosition(U.matrixWorld), B.direction.transformDirection(p), m++;
      }
    }
  }
  return {
    setup: a,
    setupView: o,
    state: t
  };
}
function Wc(n) {
  const e = new cw(n), A = [], t = [];
  function i(c) {
    l.camera = c, A.length = 0, t.length = 0;
  }
  function r(c) {
    A.push(c);
  }
  function s(c) {
    t.push(c);
  }
  function a() {
    e.setup(A);
  }
  function o(c) {
    e.setupView(A, c);
  }
  const l = {
    lightsArray: A,
    shadowsArray: t,
    camera: null,
    lights: e,
    transmissionRenderTarget: {}
  };
  return {
    init: i,
    state: l,
    setupLights: a,
    setupLightsView: o,
    pushLight: r,
    pushShadow: s
  };
}
function uw(n) {
  let e = /* @__PURE__ */ new WeakMap();
  function A(i, r = 0) {
    const s = e.get(i);
    let a;
    return s === void 0 ? (a = new Wc(n), e.set(i, [a])) : r >= s.length ? (a = new Wc(n), s.push(a)) : a = s[r], a;
  }
  function t() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: A,
    dispose: t
  };
}
const hw = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, fw = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;
function dw(n, e, A) {
  let t = new Fh();
  const i = new Pe(), r = new Pe(), s = new mA(), a = new Hp({ depthPacking: Yd }), o = new Pp(), l = {}, c = A.maxTextureSize, u = { [ln]: zA, [zA]: ln, [gt]: gt }, f = new cn({
    defines: {
      VSM_SAMPLES: 8
    },
    uniforms: {
      shadow_pass: { value: null },
      resolution: { value: new Pe() },
      radius: { value: 4 }
    },
    vertexShader: hw,
    fragmentShader: fw
  }), d = f.clone();
  d.defines.HORIZONTAL_PASS = 1;
  const g = new $A();
  g.setAttribute(
    "position",
    new xt(
      new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]),
      3
    )
  );
  const m = new jA(g, f), p = this;
  this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = sh;
  let h = this.type;
  this.render = function(x, M, F) {
    if (p.enabled === !1 || p.autoUpdate === !1 && p.needsUpdate === !1 || x.length === 0) return;
    const _ = n.getRenderTarget(), v = n.getActiveCubeFace(), b = n.getActiveMipmapLevel(), H = n.state;
    H.setBlending(rn), H.buffers.color.setClear(1, 1, 1, 1), H.buffers.depth.setTest(!0), H.setScissorTest(!1);
    const R = h !== Dt && this.type === Dt, N = h === Dt && this.type !== Dt;
    for (let Y = 0, k = x.length; Y < k; Y++) {
      const Z = x[Y], K = Z.shadow;
      if (K === void 0) {
        console.warn("THREE.WebGLShadowMap:", Z, "has no shadow.");
        continue;
      }
      if (K.autoUpdate === !1 && K.needsUpdate === !1) continue;
      i.copy(K.mapSize);
      const ne = K.getFrameExtents();
      if (i.multiply(ne), r.copy(K.mapSize), (i.x > c || i.y > c) && (i.x > c && (r.x = Math.floor(c / ne.x), i.x = r.x * ne.x, K.mapSize.x = r.x), i.y > c && (r.y = Math.floor(c / ne.y), i.y = r.y * ne.y, K.mapSize.y = r.y)), K.map === null || R === !0 || N === !0) {
        const Be = this.type !== Dt ? { minFilter: Bt, magFilter: Bt } : {};
        K.map !== null && K.map.dispose(), K.map = new In(i.x, i.y, Be), K.map.texture.name = Z.name + ".shadowMap", K.camera.updateProjectionMatrix();
      }
      n.setRenderTarget(K.map), n.clear();
      const oe = K.getViewportCount();
      for (let Be = 0; Be < oe; Be++) {
        const Fe = K.getViewport(Be);
        s.set(
          r.x * Fe.x,
          r.y * Fe.y,
          r.x * Fe.z,
          r.y * Fe.w
        ), H.viewport(s), K.updateMatrices(Z, Be), t = K.getFrustum(), B(M, F, K.camera, Z, this.type);
      }
      K.isPointLightShadow !== !0 && this.type === Dt && E(K, F), K.needsUpdate = !1;
    }
    h = this.type, p.needsUpdate = !1, n.setRenderTarget(_, v, b);
  };
  function E(x, M) {
    const F = e.update(m);
    f.defines.VSM_SAMPLES !== x.blurSamples && (f.defines.VSM_SAMPLES = x.blurSamples, d.defines.VSM_SAMPLES = x.blurSamples, f.needsUpdate = !0, d.needsUpdate = !0), x.mapPass === null && (x.mapPass = new In(i.x, i.y)), f.uniforms.shadow_pass.value = x.map.texture, f.uniforms.resolution.value = x.mapSize, f.uniforms.radius.value = x.radius, n.setRenderTarget(x.mapPass), n.clear(), n.renderBufferDirect(M, null, F, f, m, null), d.uniforms.shadow_pass.value = x.mapPass.texture, d.uniforms.resolution.value = x.mapSize, d.uniforms.radius.value = x.radius, n.setRenderTarget(x.map), n.clear(), n.renderBufferDirect(M, null, F, d, m, null);
  }
  function U(x, M, F, _) {
    let v = null;
    const b = F.isPointLight === !0 ? x.customDistanceMaterial : x.customDepthMaterial;
    if (b !== void 0)
      v = b;
    else if (v = F.isPointLight === !0 ? o : a, n.localClippingEnabled && M.clipShadows === !0 && Array.isArray(M.clippingPlanes) && M.clippingPlanes.length !== 0 || M.displacementMap && M.displacementScale !== 0 || M.alphaMap && M.alphaTest > 0 || M.map && M.alphaTest > 0) {
      const H = v.uuid, R = M.uuid;
      let N = l[H];
      N === void 0 && (N = {}, l[H] = N);
      let Y = N[R];
      Y === void 0 && (Y = v.clone(), N[R] = Y, M.addEventListener("dispose", S)), v = Y;
    }
    if (v.visible = M.visible, v.wireframe = M.wireframe, _ === Dt ? v.side = M.shadowSide !== null ? M.shadowSide : M.side : v.side = M.shadowSide !== null ? M.shadowSide : u[M.side], v.alphaMap = M.alphaMap, v.alphaTest = M.alphaTest, v.map = M.map, v.clipShadows = M.clipShadows, v.clippingPlanes = M.clippingPlanes, v.clipIntersection = M.clipIntersection, v.displacementMap = M.displacementMap, v.displacementScale = M.displacementScale, v.displacementBias = M.displacementBias, v.wireframeLinewidth = M.wireframeLinewidth, v.linewidth = M.linewidth, F.isPointLight === !0 && v.isMeshDistanceMaterial === !0) {
      const H = n.properties.get(v);
      H.light = F;
    }
    return v;
  }
  function B(x, M, F, _, v) {
    if (x.visible === !1) return;
    if (x.layers.test(M.layers) && (x.isMesh || x.isLine || x.isPoints) && (x.castShadow || x.receiveShadow && v === Dt) && (!x.frustumCulled || t.intersectsObject(x))) {
      x.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse, x.matrixWorld);
      const R = e.update(x), N = x.material;
      if (Array.isArray(N)) {
        const Y = R.groups;
        for (let k = 0, Z = Y.length; k < Z; k++) {
          const K = Y[k], ne = N[K.materialIndex];
          if (ne && ne.visible) {
            const oe = U(x, ne, _, v);
            x.onBeforeShadow(n, x, M, F, R, oe, K), n.renderBufferDirect(F, null, R, oe, x, K), x.onAfterShadow(n, x, M, F, R, oe, K);
          }
        }
      } else if (N.visible) {
        const Y = U(x, N, _, v);
        x.onBeforeShadow(n, x, M, F, R, Y, null), n.renderBufferDirect(F, null, R, Y, x, null), x.onAfterShadow(n, x, M, F, R, Y, null);
      }
    }
    const H = x.children;
    for (let R = 0, N = H.length; R < N; R++)
      B(H[R], M, F, _, v);
  }
  function S(x) {
    x.target.removeEventListener("dispose", S);
    for (const F in l) {
      const _ = l[F], v = x.target.uuid;
      v in _ && (_[v].dispose(), delete _[v]);
    }
  }
}
const pw = {
  [ao]: oo,
  [lo]: ho,
  [co]: fo,
  [mi]: uo,
  [oo]: ao,
  [ho]: lo,
  [fo]: co,
  [uo]: mi
};
function gw(n, e) {
  function A() {
    let I = !1;
    const le = new mA();
    let z = null;
    const q = new mA(0, 0, 0, 0);
    return {
      setMask: function(re) {
        z !== re && !I && (n.colorMask(re, re, re, re), z = re);
      },
      setLocked: function(re) {
        I = re;
      },
      setClear: function(re, ue, De, hA, IA) {
        IA === !0 && (re *= hA, ue *= hA, De *= hA), le.set(re, ue, De, hA), q.equals(le) === !1 && (n.clearColor(re, ue, De, hA), q.copy(le));
      },
      reset: function() {
        I = !1, z = null, q.set(-1, 0, 0, 0);
      }
    };
  }
  function t() {
    let I = !1, le = !1, z = null, q = null, re = null;
    return {
      setReversed: function(ue) {
        if (le !== ue) {
          const De = e.get("EXT_clip_control");
          le ? De.clipControlEXT(De.LOWER_LEFT_EXT, De.ZERO_TO_ONE_EXT) : De.clipControlEXT(De.LOWER_LEFT_EXT, De.NEGATIVE_ONE_TO_ONE_EXT);
          const hA = re;
          re = null, this.setClear(hA);
        }
        le = ue;
      },
      getReversed: function() {
        return le;
      },
      setTest: function(ue) {
        ue ? ie(n.DEPTH_TEST) : xe(n.DEPTH_TEST);
      },
      setMask: function(ue) {
        z !== ue && !I && (n.depthMask(ue), z = ue);
      },
      setFunc: function(ue) {
        if (le && (ue = pw[ue]), q !== ue) {
          switch (ue) {
            case ao:
              n.depthFunc(n.NEVER);
              break;
            case oo:
              n.depthFunc(n.ALWAYS);
              break;
            case lo:
              n.depthFunc(n.LESS);
              break;
            case mi:
              n.depthFunc(n.LEQUAL);
              break;
            case co:
              n.depthFunc(n.EQUAL);
              break;
            case uo:
              n.depthFunc(n.GEQUAL);
              break;
            case ho:
              n.depthFunc(n.GREATER);
              break;
            case fo:
              n.depthFunc(n.NOTEQUAL);
              break;
            default:
              n.depthFunc(n.LEQUAL);
          }
          q = ue;
        }
      },
      setLocked: function(ue) {
        I = ue;
      },
      setClear: function(ue) {
        re !== ue && (le && (ue = 1 - ue), n.clearDepth(ue), re = ue);
      },
      reset: function() {
        I = !1, z = null, q = null, re = null, le = !1;
      }
    };
  }
  function i() {
    let I = !1, le = null, z = null, q = null, re = null, ue = null, De = null, hA = null, IA = null;
    return {
      setTest: function($e) {
        I || ($e ? ie(n.STENCIL_TEST) : xe(n.STENCIL_TEST));
      },
      setMask: function($e) {
        le !== $e && !I && (n.stencilMask($e), le = $e);
      },
      setFunc: function($e, ct, Mt) {
        (z !== $e || q !== ct || re !== Mt) && (n.stencilFunc($e, ct, Mt), z = $e, q = ct, re = Mt);
      },
      setOp: function($e, ct, Mt) {
        (ue !== $e || De !== ct || hA !== Mt) && (n.stencilOp($e, ct, Mt), ue = $e, De = ct, hA = Mt);
      },
      setLocked: function($e) {
        I = $e;
      },
      setClear: function($e) {
        IA !== $e && (n.clearStencil($e), IA = $e);
      },
      reset: function() {
        I = !1, le = null, z = null, q = null, re = null, ue = null, De = null, hA = null, IA = null;
      }
    };
  }
  const r = new A(), s = new t(), a = new i(), o = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap();
  let c = {}, u = {}, f = /* @__PURE__ */ new WeakMap(), d = [], g = null, m = !1, p = null, h = null, E = null, U = null, B = null, S = null, x = null, M = new Ye(0, 0, 0), F = 0, _ = !1, v = null, b = null, H = null, R = null, N = null;
  const Y = n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let k = !1, Z = 0;
  const K = n.getParameter(n.VERSION);
  K.indexOf("WebGL") !== -1 ? (Z = parseFloat(/^WebGL (\d)/.exec(K)[1]), k = Z >= 1) : K.indexOf("OpenGL ES") !== -1 && (Z = parseFloat(/^OpenGL ES (\d)/.exec(K)[1]), k = Z >= 2);
  let ne = null, oe = {};
  const Be = n.getParameter(n.SCISSOR_BOX), Fe = n.getParameter(n.VIEWPORT), Re = new mA().fromArray(Be), W = new mA().fromArray(Fe);
  function ee(I, le, z, q) {
    const re = new Uint8Array(4), ue = n.createTexture();
    n.bindTexture(I, ue), n.texParameteri(I, n.TEXTURE_MIN_FILTER, n.NEAREST), n.texParameteri(I, n.TEXTURE_MAG_FILTER, n.NEAREST);
    for (let De = 0; De < z; De++)
      I === n.TEXTURE_3D || I === n.TEXTURE_2D_ARRAY ? n.texImage3D(le, 0, n.RGBA, 1, 1, q, 0, n.RGBA, n.UNSIGNED_BYTE, re) : n.texImage2D(le + De, 0, n.RGBA, 1, 1, 0, n.RGBA, n.UNSIGNED_BYTE, re);
    return ue;
  }
  const de = {};
  de[n.TEXTURE_2D] = ee(n.TEXTURE_2D, n.TEXTURE_2D, 1), de[n.TEXTURE_CUBE_MAP] = ee(n.TEXTURE_CUBE_MAP, n.TEXTURE_CUBE_MAP_POSITIVE_X, 6), de[n.TEXTURE_2D_ARRAY] = ee(n.TEXTURE_2D_ARRAY, n.TEXTURE_2D_ARRAY, 1, 1), de[n.TEXTURE_3D] = ee(n.TEXTURE_3D, n.TEXTURE_3D, 1, 1), r.setClear(0, 0, 0, 1), s.setClear(1), a.setClear(0), ie(n.DEPTH_TEST), s.setFunc(mi), Se(!1), Ge(Kl), ie(n.CULL_FACE), T(rn);
  function ie(I) {
    c[I] !== !0 && (n.enable(I), c[I] = !0);
  }
  function xe(I) {
    c[I] !== !1 && (n.disable(I), c[I] = !1);
  }
  function Te(I, le) {
    return u[I] !== le ? (n.bindFramebuffer(I, le), u[I] = le, I === n.DRAW_FRAMEBUFFER && (u[n.FRAMEBUFFER] = le), I === n.FRAMEBUFFER && (u[n.DRAW_FRAMEBUFFER] = le), !0) : !1;
  }
  function Le(I, le) {
    let z = d, q = !1;
    if (I) {
      z = f.get(le), z === void 0 && (z = [], f.set(le, z));
      const re = I.textures;
      if (z.length !== re.length || z[0] !== n.COLOR_ATTACHMENT0) {
        for (let ue = 0, De = re.length; ue < De; ue++)
          z[ue] = n.COLOR_ATTACHMENT0 + ue;
        z.length = re.length, q = !0;
      }
    } else
      z[0] !== n.BACK && (z[0] = n.BACK, q = !0);
    q && n.drawBuffers(z);
  }
  function sA(I) {
    return g !== I ? (n.useProgram(I), g = I, !0) : !1;
  }
  const Oe = {
    [xn]: n.FUNC_ADD,
    [_d]: n.FUNC_SUBTRACT,
    [vd]: n.FUNC_REVERSE_SUBTRACT
  };
  Oe[Cd] = n.MIN, Oe[Ed] = n.MAX;
  const aA = {
    [xd]: n.ZERO,
    [Ud]: n.ONE,
    [yd]: n.SRC_COLOR,
    [ro]: n.SRC_ALPHA,
    [Qd]: n.SRC_ALPHA_SATURATE,
    [bd]: n.DST_COLOR,
    [Md]: n.DST_ALPHA,
    [Sd]: n.ONE_MINUS_SRC_COLOR,
    [so]: n.ONE_MINUS_SRC_ALPHA,
    [Td]: n.ONE_MINUS_DST_COLOR,
    [Fd]: n.ONE_MINUS_DST_ALPHA,
    [Id]: n.CONSTANT_COLOR,
    [Rd]: n.ONE_MINUS_CONSTANT_COLOR,
    [Ld]: n.CONSTANT_ALPHA,
    [Dd]: n.ONE_MINUS_CONSTANT_ALPHA
  };
  function T(I, le, z, q, re, ue, De, hA, IA, $e) {
    if (I === rn) {
      m === !0 && (xe(n.BLEND), m = !1);
      return;
    }
    if (m === !1 && (ie(n.BLEND), m = !0), I !== wd) {
      if (I !== p || $e !== _) {
        if ((h !== xn || B !== xn) && (n.blendEquation(n.FUNC_ADD), h = xn, B = xn), $e)
          switch (I) {
            case hi:
              n.blendFuncSeparate(n.ONE, n.ONE_MINUS_SRC_ALPHA, n.ONE, n.ONE_MINUS_SRC_ALPHA);
              break;
            case zl:
              n.blendFunc(n.ONE, n.ONE);
              break;
            case Wl:
              n.blendFuncSeparate(n.ZERO, n.ONE_MINUS_SRC_COLOR, n.ZERO, n.ONE);
              break;
            case Xl:
              n.blendFuncSeparate(n.ZERO, n.SRC_COLOR, n.ZERO, n.SRC_ALPHA);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", I);
              break;
          }
        else
          switch (I) {
            case hi:
              n.blendFuncSeparate(n.SRC_ALPHA, n.ONE_MINUS_SRC_ALPHA, n.ONE, n.ONE_MINUS_SRC_ALPHA);
              break;
            case zl:
              n.blendFunc(n.SRC_ALPHA, n.ONE);
              break;
            case Wl:
              n.blendFuncSeparate(n.ZERO, n.ONE_MINUS_SRC_COLOR, n.ZERO, n.ONE);
              break;
            case Xl:
              n.blendFunc(n.ZERO, n.SRC_COLOR);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", I);
              break;
          }
        E = null, U = null, S = null, x = null, M.set(0, 0, 0), F = 0, p = I, _ = $e;
      }
      return;
    }
    re = re || le, ue = ue || z, De = De || q, (le !== h || re !== B) && (n.blendEquationSeparate(Oe[le], Oe[re]), h = le, B = re), (z !== E || q !== U || ue !== S || De !== x) && (n.blendFuncSeparate(aA[z], aA[q], aA[ue], aA[De]), E = z, U = q, S = ue, x = De), (hA.equals(M) === !1 || IA !== F) && (n.blendColor(hA.r, hA.g, hA.b, IA), M.copy(hA), F = IA), p = I, _ = !1;
  }
  function dA(I, le) {
    I.side === gt ? xe(n.CULL_FACE) : ie(n.CULL_FACE);
    let z = I.side === zA;
    le && (z = !z), Se(z), I.blending === hi && I.transparent === !1 ? T(rn) : T(I.blending, I.blendEquation, I.blendSrc, I.blendDst, I.blendEquationAlpha, I.blendSrcAlpha, I.blendDstAlpha, I.blendColor, I.blendAlpha, I.premultipliedAlpha), s.setFunc(I.depthFunc), s.setTest(I.depthTest), s.setMask(I.depthWrite), r.setMask(I.colorWrite);
    const q = I.stencilWrite;
    a.setTest(q), q && (a.setMask(I.stencilWriteMask), a.setFunc(I.stencilFunc, I.stencilRef, I.stencilFuncMask), a.setOp(I.stencilFail, I.stencilZFail, I.stencilZPass)), AA(I.polygonOffset, I.polygonOffsetFactor, I.polygonOffsetUnits), I.alphaToCoverage === !0 ? ie(n.SAMPLE_ALPHA_TO_COVERAGE) : xe(n.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function Se(I) {
    v !== I && (I ? n.frontFace(n.CW) : n.frontFace(n.CCW), v = I);
  }
  function Ge(I) {
    I !== gd ? (ie(n.CULL_FACE), I !== b && (I === Kl ? n.cullFace(n.BACK) : I === md ? n.cullFace(n.FRONT) : n.cullFace(n.FRONT_AND_BACK))) : xe(n.CULL_FACE), b = I;
  }
  function Ee(I) {
    I !== H && (k && n.lineWidth(I), H = I);
  }
  function AA(I, le, z) {
    I ? (ie(n.POLYGON_OFFSET_FILL), (R !== le || N !== z) && (n.polygonOffset(le, z), R = le, N = z)) : xe(n.POLYGON_OFFSET_FILL);
  }
  function Ce(I) {
    I ? ie(n.SCISSOR_TEST) : xe(n.SCISSOR_TEST);
  }
  function y(I) {
    I === void 0 && (I = n.TEXTURE0 + Y - 1), ne !== I && (n.activeTexture(I), ne = I);
  }
  function w(I, le, z) {
    z === void 0 && (ne === null ? z = n.TEXTURE0 + Y - 1 : z = ne);
    let q = oe[z];
    q === void 0 && (q = { type: void 0, texture: void 0 }, oe[z] = q), (q.type !== I || q.texture !== le) && (ne !== z && (n.activeTexture(z), ne = z), n.bindTexture(I, le || de[I]), q.type = I, q.texture = le);
  }
  function P() {
    const I = oe[ne];
    I !== void 0 && I.type !== void 0 && (n.bindTexture(I.type, null), I.type = void 0, I.texture = void 0);
  }
  function J() {
    try {
      n.compressedTexImage2D.apply(n, arguments);
    } catch (I) {
      console.error("THREE.WebGLState:", I);
    }
  }
  function j() {
    try {
      n.compressedTexImage3D.apply(n, arguments);
    } catch (I) {
      console.error("THREE.WebGLState:", I);
    }
  }
  function X() {
    try {
      n.texSubImage2D.apply(n, arguments);
    } catch (I) {
      console.error("THREE.WebGLState:", I);
    }
  }
  function ve() {
    try {
      n.texSubImage3D.apply(n, arguments);
    } catch (I) {
      console.error("THREE.WebGLState:", I);
    }
  }
  function ae() {
    try {
      n.compressedTexSubImage2D.apply(n, arguments);
    } catch (I) {
      console.error("THREE.WebGLState:", I);
    }
  }
  function pe() {
    try {
      n.compressedTexSubImage3D.apply(n, arguments);
    } catch (I) {
      console.error("THREE.WebGLState:", I);
    }
  }
  function Ve() {
    try {
      n.texStorage2D.apply(n, arguments);
    } catch (I) {
      console.error("THREE.WebGLState:", I);
    }
  }
  function te() {
    try {
      n.texStorage3D.apply(n, arguments);
    } catch (I) {
      console.error("THREE.WebGLState:", I);
    }
  }
  function O() {
    try {
      n.texImage2D.apply(n, arguments);
    } catch (I) {
      console.error("THREE.WebGLState:", I);
    }
  }
  function $() {
    try {
      n.texImage3D.apply(n, arguments);
    } catch (I) {
      console.error("THREE.WebGLState:", I);
    }
  }
  function _e(I) {
    Re.equals(I) === !1 && (n.scissor(I.x, I.y, I.z, I.w), Re.copy(I));
  }
  function se(I) {
    W.equals(I) === !1 && (n.viewport(I.x, I.y, I.z, I.w), W.copy(I));
  }
  function Me(I, le) {
    let z = l.get(le);
    z === void 0 && (z = /* @__PURE__ */ new WeakMap(), l.set(le, z));
    let q = z.get(I);
    q === void 0 && (q = n.getUniformBlockIndex(le, I.name), z.set(I, q));
  }
  function be(I, le) {
    const q = l.get(le).get(I);
    o.get(le) !== q && (n.uniformBlockBinding(le, q, I.__bindingPointIndex), o.set(le, q));
  }
  function Je() {
    n.disable(n.BLEND), n.disable(n.CULL_FACE), n.disable(n.DEPTH_TEST), n.disable(n.POLYGON_OFFSET_FILL), n.disable(n.SCISSOR_TEST), n.disable(n.STENCIL_TEST), n.disable(n.SAMPLE_ALPHA_TO_COVERAGE), n.blendEquation(n.FUNC_ADD), n.blendFunc(n.ONE, n.ZERO), n.blendFuncSeparate(n.ONE, n.ZERO, n.ONE, n.ZERO), n.blendColor(0, 0, 0, 0), n.colorMask(!0, !0, !0, !0), n.clearColor(0, 0, 0, 0), n.depthMask(!0), n.depthFunc(n.LESS), s.setReversed(!1), n.clearDepth(1), n.stencilMask(4294967295), n.stencilFunc(n.ALWAYS, 0, 4294967295), n.stencilOp(n.KEEP, n.KEEP, n.KEEP), n.clearStencil(0), n.cullFace(n.BACK), n.frontFace(n.CCW), n.polygonOffset(0, 0), n.activeTexture(n.TEXTURE0), n.bindFramebuffer(n.FRAMEBUFFER, null), n.bindFramebuffer(n.DRAW_FRAMEBUFFER, null), n.bindFramebuffer(n.READ_FRAMEBUFFER, null), n.useProgram(null), n.lineWidth(1), n.scissor(0, 0, n.canvas.width, n.canvas.height), n.viewport(0, 0, n.canvas.width, n.canvas.height), c = {}, ne = null, oe = {}, u = {}, f = /* @__PURE__ */ new WeakMap(), d = [], g = null, m = !1, p = null, h = null, E = null, U = null, B = null, S = null, x = null, M = new Ye(0, 0, 0), F = 0, _ = !1, v = null, b = null, H = null, R = null, N = null, Re.set(0, 0, n.canvas.width, n.canvas.height), W.set(0, 0, n.canvas.width, n.canvas.height), r.reset(), s.reset(), a.reset();
  }
  return {
    buffers: {
      color: r,
      depth: s,
      stencil: a
    },
    enable: ie,
    disable: xe,
    bindFramebuffer: Te,
    drawBuffers: Le,
    useProgram: sA,
    setBlending: T,
    setMaterial: dA,
    setFlipSided: Se,
    setCullFace: Ge,
    setLineWidth: Ee,
    setPolygonOffset: AA,
    setScissorTest: Ce,
    activeTexture: y,
    bindTexture: w,
    unbindTexture: P,
    compressedTexImage2D: J,
    compressedTexImage3D: j,
    texImage2D: O,
    texImage3D: $,
    updateUBOMapping: Me,
    uniformBlockBinding: be,
    texStorage2D: Ve,
    texStorage3D: te,
    texSubImage2D: X,
    texSubImage3D: ve,
    compressedTexSubImage2D: ae,
    compressedTexSubImage3D: pe,
    scissor: _e,
    viewport: se,
    reset: Je
  };
}
function mw(n, e, A, t, i, r, s) {
  const a = e.has("WEBGL_multisampled_render_to_texture") ? e.get("WEBGL_multisampled_render_to_texture") : null, o = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), l = new Pe(), c = /* @__PURE__ */ new WeakMap();
  let u;
  const f = /* @__PURE__ */ new WeakMap();
  let d = !1;
  try {
    d = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {
  }
  function g(y, w) {
    return d ? (
      // eslint-disable-next-line compat/compat
      new OffscreenCanvas(y, w)
    ) : Us("canvas");
  }
  function m(y, w, P) {
    let J = 1;
    const j = Ce(y);
    if ((j.width > P || j.height > P) && (J = P / Math.max(j.width, j.height)), J < 1)
      if (typeof HTMLImageElement < "u" && y instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && y instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && y instanceof ImageBitmap || typeof VideoFrame < "u" && y instanceof VideoFrame) {
        const X = Math.floor(J * j.width), ve = Math.floor(J * j.height);
        u === void 0 && (u = g(X, ve));
        const ae = w ? g(X, ve) : u;
        return ae.width = X, ae.height = ve, ae.getContext("2d").drawImage(y, 0, 0, X, ve), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + j.width + "x" + j.height + ") to (" + X + "x" + ve + ")."), ae;
      } else
        return "data" in y && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + j.width + "x" + j.height + ")."), y;
    return y;
  }
  function p(y) {
    return y.generateMipmaps;
  }
  function h(y) {
    n.generateMipmap(y);
  }
  function E(y) {
    return y.isWebGLCubeRenderTarget ? n.TEXTURE_CUBE_MAP : y.isWebGL3DRenderTarget ? n.TEXTURE_3D : y.isWebGLArrayRenderTarget || y.isCompressedArrayTexture ? n.TEXTURE_2D_ARRAY : n.TEXTURE_2D;
  }
  function U(y, w, P, J, j = !1) {
    if (y !== null) {
      if (n[y] !== void 0) return n[y];
      console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + y + "'");
    }
    let X = w;
    if (w === n.RED && (P === n.FLOAT && (X = n.R32F), P === n.HALF_FLOAT && (X = n.R16F), P === n.UNSIGNED_BYTE && (X = n.R8)), w === n.RED_INTEGER && (P === n.UNSIGNED_BYTE && (X = n.R8UI), P === n.UNSIGNED_SHORT && (X = n.R16UI), P === n.UNSIGNED_INT && (X = n.R32UI), P === n.BYTE && (X = n.R8I), P === n.SHORT && (X = n.R16I), P === n.INT && (X = n.R32I)), w === n.RG && (P === n.FLOAT && (X = n.RG32F), P === n.HALF_FLOAT && (X = n.RG16F), P === n.UNSIGNED_BYTE && (X = n.RG8)), w === n.RG_INTEGER && (P === n.UNSIGNED_BYTE && (X = n.RG8UI), P === n.UNSIGNED_SHORT && (X = n.RG16UI), P === n.UNSIGNED_INT && (X = n.RG32UI), P === n.BYTE && (X = n.RG8I), P === n.SHORT && (X = n.RG16I), P === n.INT && (X = n.RG32I)), w === n.RGB_INTEGER && (P === n.UNSIGNED_BYTE && (X = n.RGB8UI), P === n.UNSIGNED_SHORT && (X = n.RGB16UI), P === n.UNSIGNED_INT && (X = n.RGB32UI), P === n.BYTE && (X = n.RGB8I), P === n.SHORT && (X = n.RGB16I), P === n.INT && (X = n.RGB32I)), w === n.RGBA_INTEGER && (P === n.UNSIGNED_BYTE && (X = n.RGBA8UI), P === n.UNSIGNED_SHORT && (X = n.RGBA16UI), P === n.UNSIGNED_INT && (X = n.RGBA32UI), P === n.BYTE && (X = n.RGBA8I), P === n.SHORT && (X = n.RGBA16I), P === n.INT && (X = n.RGBA32I)), w === n.RGB && P === n.UNSIGNED_INT_5_9_9_9_REV && (X = n.RGB9_E5), w === n.RGBA) {
      const ve = j ? Es : Xe.getTransfer(J);
      P === n.FLOAT && (X = n.RGBA32F), P === n.HALF_FLOAT && (X = n.RGBA16F), P === n.UNSIGNED_BYTE && (X = ve === tA ? n.SRGB8_ALPHA8 : n.RGBA8), P === n.UNSIGNED_SHORT_4_4_4_4 && (X = n.RGBA4), P === n.UNSIGNED_SHORT_5_5_5_1 && (X = n.RGB5_A1);
    }
    return (X === n.R16F || X === n.R32F || X === n.RG16F || X === n.RG32F || X === n.RGBA16F || X === n.RGBA32F) && e.get("EXT_color_buffer_float"), X;
  }
  function B(y, w) {
    let P;
    return y ? w === null || w === Qn || w === _i ? P = n.DEPTH24_STENCIL8 : w === Ht ? P = n.DEPTH32F_STENCIL8 : w === $i && (P = n.DEPTH24_STENCIL8, console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : w === null || w === Qn || w === _i ? P = n.DEPTH_COMPONENT24 : w === Ht ? P = n.DEPTH_COMPONENT32F : w === $i && (P = n.DEPTH_COMPONENT16), P;
  }
  function S(y, w) {
    return p(y) === !0 || y.isFramebufferTexture && y.minFilter !== Bt && y.minFilter !== Et ? Math.log2(Math.max(w.width, w.height)) + 1 : y.mipmaps !== void 0 && y.mipmaps.length > 0 ? y.mipmaps.length : y.isCompressedTexture && Array.isArray(y.image) ? w.mipmaps.length : 1;
  }
  function x(y) {
    const w = y.target;
    w.removeEventListener("dispose", x), F(w), w.isVideoTexture && c.delete(w);
  }
  function M(y) {
    const w = y.target;
    w.removeEventListener("dispose", M), v(w);
  }
  function F(y) {
    const w = t.get(y);
    if (w.__webglInit === void 0) return;
    const P = y.source, J = f.get(P);
    if (J) {
      const j = J[w.__cacheKey];
      j.usedTimes--, j.usedTimes === 0 && _(y), Object.keys(J).length === 0 && f.delete(P);
    }
    t.remove(y);
  }
  function _(y) {
    const w = t.get(y);
    n.deleteTexture(w.__webglTexture);
    const P = y.source, J = f.get(P);
    delete J[w.__cacheKey], s.memory.textures--;
  }
  function v(y) {
    const w = t.get(y);
    if (y.depthTexture && (y.depthTexture.dispose(), t.remove(y.depthTexture)), y.isWebGLCubeRenderTarget)
      for (let J = 0; J < 6; J++) {
        if (Array.isArray(w.__webglFramebuffer[J]))
          for (let j = 0; j < w.__webglFramebuffer[J].length; j++) n.deleteFramebuffer(w.__webglFramebuffer[J][j]);
        else
          n.deleteFramebuffer(w.__webglFramebuffer[J]);
        w.__webglDepthbuffer && n.deleteRenderbuffer(w.__webglDepthbuffer[J]);
      }
    else {
      if (Array.isArray(w.__webglFramebuffer))
        for (let J = 0; J < w.__webglFramebuffer.length; J++) n.deleteFramebuffer(w.__webglFramebuffer[J]);
      else
        n.deleteFramebuffer(w.__webglFramebuffer);
      if (w.__webglDepthbuffer && n.deleteRenderbuffer(w.__webglDepthbuffer), w.__webglMultisampledFramebuffer && n.deleteFramebuffer(w.__webglMultisampledFramebuffer), w.__webglColorRenderbuffer)
        for (let J = 0; J < w.__webglColorRenderbuffer.length; J++)
          w.__webglColorRenderbuffer[J] && n.deleteRenderbuffer(w.__webglColorRenderbuffer[J]);
      w.__webglDepthRenderbuffer && n.deleteRenderbuffer(w.__webglDepthRenderbuffer);
    }
    const P = y.textures;
    for (let J = 0, j = P.length; J < j; J++) {
      const X = t.get(P[J]);
      X.__webglTexture && (n.deleteTexture(X.__webglTexture), s.memory.textures--), t.remove(P[J]);
    }
    t.remove(y);
  }
  let b = 0;
  function H() {
    b = 0;
  }
  function R() {
    const y = b;
    return y >= i.maxTextures && console.warn("THREE.WebGLTextures: Trying to use " + y + " texture units while this GPU supports only " + i.maxTextures), b += 1, y;
  }
  function N(y) {
    const w = [];
    return w.push(y.wrapS), w.push(y.wrapT), w.push(y.wrapR || 0), w.push(y.magFilter), w.push(y.minFilter), w.push(y.anisotropy), w.push(y.internalFormat), w.push(y.format), w.push(y.type), w.push(y.generateMipmaps), w.push(y.premultiplyAlpha), w.push(y.flipY), w.push(y.unpackAlignment), w.push(y.colorSpace), w.join();
  }
  function Y(y, w) {
    const P = t.get(y);
    if (y.isVideoTexture && Ee(y), y.isRenderTargetTexture === !1 && y.version > 0 && P.__version !== y.version) {
      const J = y.image;
      if (J === null)
        console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
      else if (J.complete === !1)
        console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        W(P, y, w);
        return;
      }
    }
    A.bindTexture(n.TEXTURE_2D, P.__webglTexture, n.TEXTURE0 + w);
  }
  function k(y, w) {
    const P = t.get(y);
    if (y.version > 0 && P.__version !== y.version) {
      W(P, y, w);
      return;
    }
    A.bindTexture(n.TEXTURE_2D_ARRAY, P.__webglTexture, n.TEXTURE0 + w);
  }
  function Z(y, w) {
    const P = t.get(y);
    if (y.version > 0 && P.__version !== y.version) {
      W(P, y, w);
      return;
    }
    A.bindTexture(n.TEXTURE_3D, P.__webglTexture, n.TEXTURE0 + w);
  }
  function K(y, w) {
    const P = t.get(y);
    if (y.version > 0 && P.__version !== y.version) {
      ee(P, y, w);
      return;
    }
    A.bindTexture(n.TEXTURE_CUBE_MAP, P.__webglTexture, n.TEXTURE0 + w);
  }
  const ne = {
    [mo]: n.REPEAT,
    [Sn]: n.CLAMP_TO_EDGE,
    [Bo]: n.MIRRORED_REPEAT
  }, oe = {
    [Bt]: n.NEAREST,
    [Wd]: n.NEAREST_MIPMAP_NEAREST,
    [hr]: n.NEAREST_MIPMAP_LINEAR,
    [Et]: n.LINEAR,
    [Aa]: n.LINEAR_MIPMAP_NEAREST,
    [Mn]: n.LINEAR_MIPMAP_LINEAR
  }, Be = {
    [Zd]: n.NEVER,
    [np]: n.ALWAYS,
    [jd]: n.LESS,
    [wh]: n.LEQUAL,
    [$d]: n.EQUAL,
    [tp]: n.GEQUAL,
    [ep]: n.GREATER,
    [Ap]: n.NOTEQUAL
  };
  function Fe(y, w) {
    if (w.type === Ht && e.has("OES_texture_float_linear") === !1 && (w.magFilter === Et || w.magFilter === Aa || w.magFilter === hr || w.magFilter === Mn || w.minFilter === Et || w.minFilter === Aa || w.minFilter === hr || w.minFilter === Mn) && console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), n.texParameteri(y, n.TEXTURE_WRAP_S, ne[w.wrapS]), n.texParameteri(y, n.TEXTURE_WRAP_T, ne[w.wrapT]), (y === n.TEXTURE_3D || y === n.TEXTURE_2D_ARRAY) && n.texParameteri(y, n.TEXTURE_WRAP_R, ne[w.wrapR]), n.texParameteri(y, n.TEXTURE_MAG_FILTER, oe[w.magFilter]), n.texParameteri(y, n.TEXTURE_MIN_FILTER, oe[w.minFilter]), w.compareFunction && (n.texParameteri(y, n.TEXTURE_COMPARE_MODE, n.COMPARE_REF_TO_TEXTURE), n.texParameteri(y, n.TEXTURE_COMPARE_FUNC, Be[w.compareFunction])), e.has("EXT_texture_filter_anisotropic") === !0) {
      if (w.magFilter === Bt || w.minFilter !== hr && w.minFilter !== Mn || w.type === Ht && e.has("OES_texture_float_linear") === !1) return;
      if (w.anisotropy > 1 || t.get(w).__currentAnisotropy) {
        const P = e.get("EXT_texture_filter_anisotropic");
        n.texParameterf(y, P.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(w.anisotropy, i.getMaxAnisotropy())), t.get(w).__currentAnisotropy = w.anisotropy;
      }
    }
  }
  function Re(y, w) {
    let P = !1;
    y.__webglInit === void 0 && (y.__webglInit = !0, w.addEventListener("dispose", x));
    const J = w.source;
    let j = f.get(J);
    j === void 0 && (j = {}, f.set(J, j));
    const X = N(w);
    if (X !== y.__cacheKey) {
      j[X] === void 0 && (j[X] = {
        texture: n.createTexture(),
        usedTimes: 0
      }, s.memory.textures++, P = !0), j[X].usedTimes++;
      const ve = j[y.__cacheKey];
      ve !== void 0 && (j[y.__cacheKey].usedTimes--, ve.usedTimes === 0 && _(w)), y.__cacheKey = X, y.__webglTexture = j[X].texture;
    }
    return P;
  }
  function W(y, w, P) {
    let J = n.TEXTURE_2D;
    (w.isDataArrayTexture || w.isCompressedArrayTexture) && (J = n.TEXTURE_2D_ARRAY), w.isData3DTexture && (J = n.TEXTURE_3D);
    const j = Re(y, w), X = w.source;
    A.bindTexture(J, y.__webglTexture, n.TEXTURE0 + P);
    const ve = t.get(X);
    if (X.version !== ve.__version || j === !0) {
      A.activeTexture(n.TEXTURE0 + P);
      const ae = Xe.getPrimaries(Xe.workingColorSpace), pe = w.colorSpace === en ? null : Xe.getPrimaries(w.colorSpace), Ve = w.colorSpace === en || ae === pe ? n.NONE : n.BROWSER_DEFAULT_WEBGL;
      n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, w.flipY), n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL, w.premultiplyAlpha), n.pixelStorei(n.UNPACK_ALIGNMENT, w.unpackAlignment), n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL, Ve);
      let te = m(w.image, !1, i.maxTextureSize);
      te = AA(w, te);
      const O = r.convert(w.format, w.colorSpace), $ = r.convert(w.type);
      let _e = U(w.internalFormat, O, $, w.colorSpace, w.isVideoTexture);
      Fe(J, w);
      let se;
      const Me = w.mipmaps, be = w.isVideoTexture !== !0, Je = ve.__version === void 0 || j === !0, I = X.dataReady, le = S(w, te);
      if (w.isDepthTexture)
        _e = B(w.format === vi, w.type), Je && (be ? A.texStorage2D(n.TEXTURE_2D, 1, _e, te.width, te.height) : A.texImage2D(n.TEXTURE_2D, 0, _e, te.width, te.height, 0, O, $, null));
      else if (w.isDataTexture)
        if (Me.length > 0) {
          be && Je && A.texStorage2D(n.TEXTURE_2D, le, _e, Me[0].width, Me[0].height);
          for (let z = 0, q = Me.length; z < q; z++)
            se = Me[z], be ? I && A.texSubImage2D(n.TEXTURE_2D, z, 0, 0, se.width, se.height, O, $, se.data) : A.texImage2D(n.TEXTURE_2D, z, _e, se.width, se.height, 0, O, $, se.data);
          w.generateMipmaps = !1;
        } else
          be ? (Je && A.texStorage2D(n.TEXTURE_2D, le, _e, te.width, te.height), I && A.texSubImage2D(n.TEXTURE_2D, 0, 0, 0, te.width, te.height, O, $, te.data)) : A.texImage2D(n.TEXTURE_2D, 0, _e, te.width, te.height, 0, O, $, te.data);
      else if (w.isCompressedTexture)
        if (w.isCompressedArrayTexture) {
          be && Je && A.texStorage3D(n.TEXTURE_2D_ARRAY, le, _e, Me[0].width, Me[0].height, te.depth);
          for (let z = 0, q = Me.length; z < q; z++)
            if (se = Me[z], w.format !== mt)
              if (O !== null)
                if (be) {
                  if (I)
                    if (w.layerUpdates.size > 0) {
                      const re = Cc(se.width, se.height, w.format, w.type);
                      for (const ue of w.layerUpdates) {
                        const De = se.data.subarray(
                          ue * re / se.data.BYTES_PER_ELEMENT,
                          (ue + 1) * re / se.data.BYTES_PER_ELEMENT
                        );
                        A.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY, z, 0, 0, ue, se.width, se.height, 1, O, De);
                      }
                      w.clearLayerUpdates();
                    } else
                      A.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY, z, 0, 0, 0, se.width, se.height, te.depth, O, se.data);
                } else
                  A.compressedTexImage3D(n.TEXTURE_2D_ARRAY, z, _e, se.width, se.height, te.depth, 0, se.data, 0, 0);
              else
                console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
            else
              be ? I && A.texSubImage3D(n.TEXTURE_2D_ARRAY, z, 0, 0, 0, se.width, se.height, te.depth, O, $, se.data) : A.texImage3D(n.TEXTURE_2D_ARRAY, z, _e, se.width, se.height, te.depth, 0, O, $, se.data);
        } else {
          be && Je && A.texStorage2D(n.TEXTURE_2D, le, _e, Me[0].width, Me[0].height);
          for (let z = 0, q = Me.length; z < q; z++)
            se = Me[z], w.format !== mt ? O !== null ? be ? I && A.compressedTexSubImage2D(n.TEXTURE_2D, z, 0, 0, se.width, se.height, O, se.data) : A.compressedTexImage2D(n.TEXTURE_2D, z, _e, se.width, se.height, 0, se.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : be ? I && A.texSubImage2D(n.TEXTURE_2D, z, 0, 0, se.width, se.height, O, $, se.data) : A.texImage2D(n.TEXTURE_2D, z, _e, se.width, se.height, 0, O, $, se.data);
        }
      else if (w.isDataArrayTexture)
        if (be) {
          if (Je && A.texStorage3D(n.TEXTURE_2D_ARRAY, le, _e, te.width, te.height, te.depth), I)
            if (w.layerUpdates.size > 0) {
              const z = Cc(te.width, te.height, w.format, w.type);
              for (const q of w.layerUpdates) {
                const re = te.data.subarray(
                  q * z / te.data.BYTES_PER_ELEMENT,
                  (q + 1) * z / te.data.BYTES_PER_ELEMENT
                );
                A.texSubImage3D(n.TEXTURE_2D_ARRAY, 0, 0, 0, q, te.width, te.height, 1, O, $, re);
              }
              w.clearLayerUpdates();
            } else
              A.texSubImage3D(n.TEXTURE_2D_ARRAY, 0, 0, 0, 0, te.width, te.height, te.depth, O, $, te.data);
        } else
          A.texImage3D(n.TEXTURE_2D_ARRAY, 0, _e, te.width, te.height, te.depth, 0, O, $, te.data);
      else if (w.isData3DTexture)
        be ? (Je && A.texStorage3D(n.TEXTURE_3D, le, _e, te.width, te.height, te.depth), I && A.texSubImage3D(n.TEXTURE_3D, 0, 0, 0, 0, te.width, te.height, te.depth, O, $, te.data)) : A.texImage3D(n.TEXTURE_3D, 0, _e, te.width, te.height, te.depth, 0, O, $, te.data);
      else if (w.isFramebufferTexture) {
        if (Je)
          if (be)
            A.texStorage2D(n.TEXTURE_2D, le, _e, te.width, te.height);
          else {
            let z = te.width, q = te.height;
            for (let re = 0; re < le; re++)
              A.texImage2D(n.TEXTURE_2D, re, _e, z, q, 0, O, $, null), z >>= 1, q >>= 1;
          }
      } else if (Me.length > 0) {
        if (be && Je) {
          const z = Ce(Me[0]);
          A.texStorage2D(n.TEXTURE_2D, le, _e, z.width, z.height);
        }
        for (let z = 0, q = Me.length; z < q; z++)
          se = Me[z], be ? I && A.texSubImage2D(n.TEXTURE_2D, z, 0, 0, O, $, se) : A.texImage2D(n.TEXTURE_2D, z, _e, O, $, se);
        w.generateMipmaps = !1;
      } else if (be) {
        if (Je) {
          const z = Ce(te);
          A.texStorage2D(n.TEXTURE_2D, le, _e, z.width, z.height);
        }
        I && A.texSubImage2D(n.TEXTURE_2D, 0, 0, 0, O, $, te);
      } else
        A.texImage2D(n.TEXTURE_2D, 0, _e, O, $, te);
      p(w) && h(J), ve.__version = X.version, w.onUpdate && w.onUpdate(w);
    }
    y.__version = w.version;
  }
  function ee(y, w, P) {
    if (w.image.length !== 6) return;
    const J = Re(y, w), j = w.source;
    A.bindTexture(n.TEXTURE_CUBE_MAP, y.__webglTexture, n.TEXTURE0 + P);
    const X = t.get(j);
    if (j.version !== X.__version || J === !0) {
      A.activeTexture(n.TEXTURE0 + P);
      const ve = Xe.getPrimaries(Xe.workingColorSpace), ae = w.colorSpace === en ? null : Xe.getPrimaries(w.colorSpace), pe = w.colorSpace === en || ve === ae ? n.NONE : n.BROWSER_DEFAULT_WEBGL;
      n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, w.flipY), n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL, w.premultiplyAlpha), n.pixelStorei(n.UNPACK_ALIGNMENT, w.unpackAlignment), n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL, pe);
      const Ve = w.isCompressedTexture || w.image[0].isCompressedTexture, te = w.image[0] && w.image[0].isDataTexture, O = [];
      for (let q = 0; q < 6; q++)
        !Ve && !te ? O[q] = m(w.image[q], !0, i.maxCubemapSize) : O[q] = te ? w.image[q].image : w.image[q], O[q] = AA(w, O[q]);
      const $ = O[0], _e = r.convert(w.format, w.colorSpace), se = r.convert(w.type), Me = U(w.internalFormat, _e, se, w.colorSpace), be = w.isVideoTexture !== !0, Je = X.__version === void 0 || J === !0, I = j.dataReady;
      let le = S(w, $);
      Fe(n.TEXTURE_CUBE_MAP, w);
      let z;
      if (Ve) {
        be && Je && A.texStorage2D(n.TEXTURE_CUBE_MAP, le, Me, $.width, $.height);
        for (let q = 0; q < 6; q++) {
          z = O[q].mipmaps;
          for (let re = 0; re < z.length; re++) {
            const ue = z[re];
            w.format !== mt ? _e !== null ? be ? I && A.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + q, re, 0, 0, ue.width, ue.height, _e, ue.data) : A.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + q, re, Me, ue.width, ue.height, 0, ue.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : be ? I && A.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + q, re, 0, 0, ue.width, ue.height, _e, se, ue.data) : A.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + q, re, Me, ue.width, ue.height, 0, _e, se, ue.data);
          }
        }
      } else {
        if (z = w.mipmaps, be && Je) {
          z.length > 0 && le++;
          const q = Ce(O[0]);
          A.texStorage2D(n.TEXTURE_CUBE_MAP, le, Me, q.width, q.height);
        }
        for (let q = 0; q < 6; q++)
          if (te) {
            be ? I && A.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + q, 0, 0, 0, O[q].width, O[q].height, _e, se, O[q].data) : A.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + q, 0, Me, O[q].width, O[q].height, 0, _e, se, O[q].data);
            for (let re = 0; re < z.length; re++) {
              const De = z[re].image[q].image;
              be ? I && A.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + q, re + 1, 0, 0, De.width, De.height, _e, se, De.data) : A.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + q, re + 1, Me, De.width, De.height, 0, _e, se, De.data);
            }
          } else {
            be ? I && A.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + q, 0, 0, 0, _e, se, O[q]) : A.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + q, 0, Me, _e, se, O[q]);
            for (let re = 0; re < z.length; re++) {
              const ue = z[re];
              be ? I && A.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + q, re + 1, 0, 0, _e, se, ue.image[q]) : A.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + q, re + 1, Me, _e, se, ue.image[q]);
            }
          }
      }
      p(w) && h(n.TEXTURE_CUBE_MAP), X.__version = j.version, w.onUpdate && w.onUpdate(w);
    }
    y.__version = w.version;
  }
  function de(y, w, P, J, j, X) {
    const ve = r.convert(P.format, P.colorSpace), ae = r.convert(P.type), pe = U(P.internalFormat, ve, ae, P.colorSpace), Ve = t.get(w), te = t.get(P);
    if (te.__renderTarget = w, !Ve.__hasExternalTextures) {
      const O = Math.max(1, w.width >> X), $ = Math.max(1, w.height >> X);
      j === n.TEXTURE_3D || j === n.TEXTURE_2D_ARRAY ? A.texImage3D(j, X, pe, O, $, w.depth, 0, ve, ae, null) : A.texImage2D(j, X, pe, O, $, 0, ve, ae, null);
    }
    A.bindFramebuffer(n.FRAMEBUFFER, y), Ge(w) ? a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER, J, j, te.__webglTexture, 0, Se(w)) : (j === n.TEXTURE_2D || j >= n.TEXTURE_CUBE_MAP_POSITIVE_X && j <= n.TEXTURE_CUBE_MAP_NEGATIVE_Z) && n.framebufferTexture2D(n.FRAMEBUFFER, J, j, te.__webglTexture, X), A.bindFramebuffer(n.FRAMEBUFFER, null);
  }
  function ie(y, w, P) {
    if (n.bindRenderbuffer(n.RENDERBUFFER, y), w.depthBuffer) {
      const J = w.depthTexture, j = J && J.isDepthTexture ? J.type : null, X = B(w.stencilBuffer, j), ve = w.stencilBuffer ? n.DEPTH_STENCIL_ATTACHMENT : n.DEPTH_ATTACHMENT, ae = Se(w);
      Ge(w) ? a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER, ae, X, w.width, w.height) : P ? n.renderbufferStorageMultisample(n.RENDERBUFFER, ae, X, w.width, w.height) : n.renderbufferStorage(n.RENDERBUFFER, X, w.width, w.height), n.framebufferRenderbuffer(n.FRAMEBUFFER, ve, n.RENDERBUFFER, y);
    } else {
      const J = w.textures;
      for (let j = 0; j < J.length; j++) {
        const X = J[j], ve = r.convert(X.format, X.colorSpace), ae = r.convert(X.type), pe = U(X.internalFormat, ve, ae, X.colorSpace), Ve = Se(w);
        P && Ge(w) === !1 ? n.renderbufferStorageMultisample(n.RENDERBUFFER, Ve, pe, w.width, w.height) : Ge(w) ? a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER, Ve, pe, w.width, w.height) : n.renderbufferStorage(n.RENDERBUFFER, pe, w.width, w.height);
      }
    }
    n.bindRenderbuffer(n.RENDERBUFFER, null);
  }
  function xe(y, w) {
    if (w && w.isWebGLCubeRenderTarget) throw new Error("Depth Texture with cube render targets is not supported");
    if (A.bindFramebuffer(n.FRAMEBUFFER, y), !(w.depthTexture && w.depthTexture.isDepthTexture))
      throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
    const J = t.get(w.depthTexture);
    J.__renderTarget = w, (!J.__webglTexture || w.depthTexture.image.width !== w.width || w.depthTexture.image.height !== w.height) && (w.depthTexture.image.width = w.width, w.depthTexture.image.height = w.height, w.depthTexture.needsUpdate = !0), Y(w.depthTexture, 0);
    const j = J.__webglTexture, X = Se(w);
    if (w.depthTexture.format === fi)
      Ge(w) ? a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER, n.DEPTH_ATTACHMENT, n.TEXTURE_2D, j, 0, X) : n.framebufferTexture2D(n.FRAMEBUFFER, n.DEPTH_ATTACHMENT, n.TEXTURE_2D, j, 0);
    else if (w.depthTexture.format === vi)
      Ge(w) ? a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER, n.DEPTH_STENCIL_ATTACHMENT, n.TEXTURE_2D, j, 0, X) : n.framebufferTexture2D(n.FRAMEBUFFER, n.DEPTH_STENCIL_ATTACHMENT, n.TEXTURE_2D, j, 0);
    else
      throw new Error("Unknown depthTexture format");
  }
  function Te(y) {
    const w = t.get(y), P = y.isWebGLCubeRenderTarget === !0;
    if (w.__boundDepthTexture !== y.depthTexture) {
      const J = y.depthTexture;
      if (w.__depthDisposeCallback && w.__depthDisposeCallback(), J) {
        const j = () => {
          delete w.__boundDepthTexture, delete w.__depthDisposeCallback, J.removeEventListener("dispose", j);
        };
        J.addEventListener("dispose", j), w.__depthDisposeCallback = j;
      }
      w.__boundDepthTexture = J;
    }
    if (y.depthTexture && !w.__autoAllocateDepthBuffer) {
      if (P) throw new Error("target.depthTexture not supported in Cube render targets");
      xe(w.__webglFramebuffer, y);
    } else if (P) {
      w.__webglDepthbuffer = [];
      for (let J = 0; J < 6; J++)
        if (A.bindFramebuffer(n.FRAMEBUFFER, w.__webglFramebuffer[J]), w.__webglDepthbuffer[J] === void 0)
          w.__webglDepthbuffer[J] = n.createRenderbuffer(), ie(w.__webglDepthbuffer[J], y, !1);
        else {
          const j = y.stencilBuffer ? n.DEPTH_STENCIL_ATTACHMENT : n.DEPTH_ATTACHMENT, X = w.__webglDepthbuffer[J];
          n.bindRenderbuffer(n.RENDERBUFFER, X), n.framebufferRenderbuffer(n.FRAMEBUFFER, j, n.RENDERBUFFER, X);
        }
    } else if (A.bindFramebuffer(n.FRAMEBUFFER, w.__webglFramebuffer), w.__webglDepthbuffer === void 0)
      w.__webglDepthbuffer = n.createRenderbuffer(), ie(w.__webglDepthbuffer, y, !1);
    else {
      const J = y.stencilBuffer ? n.DEPTH_STENCIL_ATTACHMENT : n.DEPTH_ATTACHMENT, j = w.__webglDepthbuffer;
      n.bindRenderbuffer(n.RENDERBUFFER, j), n.framebufferRenderbuffer(n.FRAMEBUFFER, J, n.RENDERBUFFER, j);
    }
    A.bindFramebuffer(n.FRAMEBUFFER, null);
  }
  function Le(y, w, P) {
    const J = t.get(y);
    w !== void 0 && de(J.__webglFramebuffer, y, y.texture, n.COLOR_ATTACHMENT0, n.TEXTURE_2D, 0), P !== void 0 && Te(y);
  }
  function sA(y) {
    const w = y.texture, P = t.get(y), J = t.get(w);
    y.addEventListener("dispose", M);
    const j = y.textures, X = y.isWebGLCubeRenderTarget === !0, ve = j.length > 1;
    if (ve || (J.__webglTexture === void 0 && (J.__webglTexture = n.createTexture()), J.__version = w.version, s.memory.textures++), X) {
      P.__webglFramebuffer = [];
      for (let ae = 0; ae < 6; ae++)
        if (w.mipmaps && w.mipmaps.length > 0) {
          P.__webglFramebuffer[ae] = [];
          for (let pe = 0; pe < w.mipmaps.length; pe++)
            P.__webglFramebuffer[ae][pe] = n.createFramebuffer();
        } else
          P.__webglFramebuffer[ae] = n.createFramebuffer();
    } else {
      if (w.mipmaps && w.mipmaps.length > 0) {
        P.__webglFramebuffer = [];
        for (let ae = 0; ae < w.mipmaps.length; ae++)
          P.__webglFramebuffer[ae] = n.createFramebuffer();
      } else
        P.__webglFramebuffer = n.createFramebuffer();
      if (ve)
        for (let ae = 0, pe = j.length; ae < pe; ae++) {
          const Ve = t.get(j[ae]);
          Ve.__webglTexture === void 0 && (Ve.__webglTexture = n.createTexture(), s.memory.textures++);
        }
      if (y.samples > 0 && Ge(y) === !1) {
        P.__webglMultisampledFramebuffer = n.createFramebuffer(), P.__webglColorRenderbuffer = [], A.bindFramebuffer(n.FRAMEBUFFER, P.__webglMultisampledFramebuffer);
        for (let ae = 0; ae < j.length; ae++) {
          const pe = j[ae];
          P.__webglColorRenderbuffer[ae] = n.createRenderbuffer(), n.bindRenderbuffer(n.RENDERBUFFER, P.__webglColorRenderbuffer[ae]);
          const Ve = r.convert(pe.format, pe.colorSpace), te = r.convert(pe.type), O = U(pe.internalFormat, Ve, te, pe.colorSpace, y.isXRRenderTarget === !0), $ = Se(y);
          n.renderbufferStorageMultisample(n.RENDERBUFFER, $, O, y.width, y.height), n.framebufferRenderbuffer(n.FRAMEBUFFER, n.COLOR_ATTACHMENT0 + ae, n.RENDERBUFFER, P.__webglColorRenderbuffer[ae]);
        }
        n.bindRenderbuffer(n.RENDERBUFFER, null), y.depthBuffer && (P.__webglDepthRenderbuffer = n.createRenderbuffer(), ie(P.__webglDepthRenderbuffer, y, !0)), A.bindFramebuffer(n.FRAMEBUFFER, null);
      }
    }
    if (X) {
      A.bindTexture(n.TEXTURE_CUBE_MAP, J.__webglTexture), Fe(n.TEXTURE_CUBE_MAP, w);
      for (let ae = 0; ae < 6; ae++)
        if (w.mipmaps && w.mipmaps.length > 0)
          for (let pe = 0; pe < w.mipmaps.length; pe++)
            de(P.__webglFramebuffer[ae][pe], y, w, n.COLOR_ATTACHMENT0, n.TEXTURE_CUBE_MAP_POSITIVE_X + ae, pe);
        else
          de(P.__webglFramebuffer[ae], y, w, n.COLOR_ATTACHMENT0, n.TEXTURE_CUBE_MAP_POSITIVE_X + ae, 0);
      p(w) && h(n.TEXTURE_CUBE_MAP), A.unbindTexture();
    } else if (ve) {
      for (let ae = 0, pe = j.length; ae < pe; ae++) {
        const Ve = j[ae], te = t.get(Ve);
        A.bindTexture(n.TEXTURE_2D, te.__webglTexture), Fe(n.TEXTURE_2D, Ve), de(P.__webglFramebuffer, y, Ve, n.COLOR_ATTACHMENT0 + ae, n.TEXTURE_2D, 0), p(Ve) && h(n.TEXTURE_2D);
      }
      A.unbindTexture();
    } else {
      let ae = n.TEXTURE_2D;
      if ((y.isWebGL3DRenderTarget || y.isWebGLArrayRenderTarget) && (ae = y.isWebGL3DRenderTarget ? n.TEXTURE_3D : n.TEXTURE_2D_ARRAY), A.bindTexture(ae, J.__webglTexture), Fe(ae, w), w.mipmaps && w.mipmaps.length > 0)
        for (let pe = 0; pe < w.mipmaps.length; pe++)
          de(P.__webglFramebuffer[pe], y, w, n.COLOR_ATTACHMENT0, ae, pe);
      else
        de(P.__webglFramebuffer, y, w, n.COLOR_ATTACHMENT0, ae, 0);
      p(w) && h(ae), A.unbindTexture();
    }
    y.depthBuffer && Te(y);
  }
  function Oe(y) {
    const w = y.textures;
    for (let P = 0, J = w.length; P < J; P++) {
      const j = w[P];
      if (p(j)) {
        const X = E(y), ve = t.get(j).__webglTexture;
        A.bindTexture(X, ve), h(X), A.unbindTexture();
      }
    }
  }
  const aA = [], T = [];
  function dA(y) {
    if (y.samples > 0) {
      if (Ge(y) === !1) {
        const w = y.textures, P = y.width, J = y.height;
        let j = n.COLOR_BUFFER_BIT;
        const X = y.stencilBuffer ? n.DEPTH_STENCIL_ATTACHMENT : n.DEPTH_ATTACHMENT, ve = t.get(y), ae = w.length > 1;
        if (ae)
          for (let pe = 0; pe < w.length; pe++)
            A.bindFramebuffer(n.FRAMEBUFFER, ve.__webglMultisampledFramebuffer), n.framebufferRenderbuffer(n.FRAMEBUFFER, n.COLOR_ATTACHMENT0 + pe, n.RENDERBUFFER, null), A.bindFramebuffer(n.FRAMEBUFFER, ve.__webglFramebuffer), n.framebufferTexture2D(n.DRAW_FRAMEBUFFER, n.COLOR_ATTACHMENT0 + pe, n.TEXTURE_2D, null, 0);
        A.bindFramebuffer(n.READ_FRAMEBUFFER, ve.__webglMultisampledFramebuffer), A.bindFramebuffer(n.DRAW_FRAMEBUFFER, ve.__webglFramebuffer);
        for (let pe = 0; pe < w.length; pe++) {
          if (y.resolveDepthBuffer && (y.depthBuffer && (j |= n.DEPTH_BUFFER_BIT), y.stencilBuffer && y.resolveStencilBuffer && (j |= n.STENCIL_BUFFER_BIT)), ae) {
            n.framebufferRenderbuffer(n.READ_FRAMEBUFFER, n.COLOR_ATTACHMENT0, n.RENDERBUFFER, ve.__webglColorRenderbuffer[pe]);
            const Ve = t.get(w[pe]).__webglTexture;
            n.framebufferTexture2D(n.DRAW_FRAMEBUFFER, n.COLOR_ATTACHMENT0, n.TEXTURE_2D, Ve, 0);
          }
          n.blitFramebuffer(0, 0, P, J, 0, 0, P, J, j, n.NEAREST), o === !0 && (aA.length = 0, T.length = 0, aA.push(n.COLOR_ATTACHMENT0 + pe), y.depthBuffer && y.resolveDepthBuffer === !1 && (aA.push(X), T.push(X), n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER, T)), n.invalidateFramebuffer(n.READ_FRAMEBUFFER, aA));
        }
        if (A.bindFramebuffer(n.READ_FRAMEBUFFER, null), A.bindFramebuffer(n.DRAW_FRAMEBUFFER, null), ae)
          for (let pe = 0; pe < w.length; pe++) {
            A.bindFramebuffer(n.FRAMEBUFFER, ve.__webglMultisampledFramebuffer), n.framebufferRenderbuffer(n.FRAMEBUFFER, n.COLOR_ATTACHMENT0 + pe, n.RENDERBUFFER, ve.__webglColorRenderbuffer[pe]);
            const Ve = t.get(w[pe]).__webglTexture;
            A.bindFramebuffer(n.FRAMEBUFFER, ve.__webglFramebuffer), n.framebufferTexture2D(n.DRAW_FRAMEBUFFER, n.COLOR_ATTACHMENT0 + pe, n.TEXTURE_2D, Ve, 0);
          }
        A.bindFramebuffer(n.DRAW_FRAMEBUFFER, ve.__webglMultisampledFramebuffer);
      } else if (y.depthBuffer && y.resolveDepthBuffer === !1 && o) {
        const w = y.stencilBuffer ? n.DEPTH_STENCIL_ATTACHMENT : n.DEPTH_ATTACHMENT;
        n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER, [w]);
      }
    }
  }
  function Se(y) {
    return Math.min(i.maxSamples, y.samples);
  }
  function Ge(y) {
    const w = t.get(y);
    return y.samples > 0 && e.has("WEBGL_multisampled_render_to_texture") === !0 && w.__useRenderToTexture !== !1;
  }
  function Ee(y) {
    const w = s.render.frame;
    c.get(y) !== w && (c.set(y, w), y.update());
  }
  function AA(y, w) {
    const P = y.colorSpace, J = y.format, j = y.type;
    return y.isCompressedTexture === !0 || y.isVideoTexture === !0 || P !== Ci && P !== en && (Xe.getTransfer(P) === tA ? (J !== mt || j !== Gt) && console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : console.error("THREE.WebGLTextures: Unsupported texture color space:", P)), w;
  }
  function Ce(y) {
    return typeof HTMLImageElement < "u" && y instanceof HTMLImageElement ? (l.width = y.naturalWidth || y.width, l.height = y.naturalHeight || y.height) : typeof VideoFrame < "u" && y instanceof VideoFrame ? (l.width = y.displayWidth, l.height = y.displayHeight) : (l.width = y.width, l.height = y.height), l;
  }
  this.allocateTextureUnit = R, this.resetTextureUnits = H, this.setTexture2D = Y, this.setTexture2DArray = k, this.setTexture3D = Z, this.setTextureCube = K, this.rebindTextures = Le, this.setupRenderTarget = sA, this.updateRenderTargetMipmap = Oe, this.updateMultisampleRenderTarget = dA, this.setupDepthRenderbuffer = Te, this.setupFrameBufferTexture = de, this.useMultisampledRTT = Ge;
}
function Bw(n, e) {
  function A(t, i = en) {
    let r;
    const s = Xe.getTransfer(i);
    if (t === Gt) return n.UNSIGNED_BYTE;
    if (t === wl) return n.UNSIGNED_SHORT_4_4_4_4;
    if (t === _l) return n.UNSIGNED_SHORT_5_5_5_1;
    if (t === uh) return n.UNSIGNED_INT_5_9_9_9_REV;
    if (t === lh) return n.BYTE;
    if (t === ch) return n.SHORT;
    if (t === $i) return n.UNSIGNED_SHORT;
    if (t === Bl) return n.INT;
    if (t === Qn) return n.UNSIGNED_INT;
    if (t === Ht) return n.FLOAT;
    if (t === nr) return n.HALF_FLOAT;
    if (t === hh) return n.ALPHA;
    if (t === fh) return n.RGB;
    if (t === mt) return n.RGBA;
    if (t === dh) return n.LUMINANCE;
    if (t === ph) return n.LUMINANCE_ALPHA;
    if (t === fi) return n.DEPTH_COMPONENT;
    if (t === vi) return n.DEPTH_STENCIL;
    if (t === gh) return n.RED;
    if (t === vl) return n.RED_INTEGER;
    if (t === mh) return n.RG;
    if (t === Cl) return n.RG_INTEGER;
    if (t === El) return n.RGBA_INTEGER;
    if (t === fs || t === ds || t === ps || t === gs)
      if (s === tA)
        if (r = e.get("WEBGL_compressed_texture_s3tc_srgb"), r !== null) {
          if (t === fs) return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;
          if (t === ds) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
          if (t === ps) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
          if (t === gs) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
        } else
          return null;
      else if (r = e.get("WEBGL_compressed_texture_s3tc"), r !== null) {
        if (t === fs) return r.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (t === ds) return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (t === ps) return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (t === gs) return r.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      } else
        return null;
    if (t === wo || t === _o || t === vo || t === Co)
      if (r = e.get("WEBGL_compressed_texture_pvrtc"), r !== null) {
        if (t === wo) return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (t === _o) return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (t === vo) return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (t === Co) return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else
        return null;
    if (t === Eo || t === xo || t === Uo)
      if (r = e.get("WEBGL_compressed_texture_etc"), r !== null) {
        if (t === Eo || t === xo) return s === tA ? r.COMPRESSED_SRGB8_ETC2 : r.COMPRESSED_RGB8_ETC2;
        if (t === Uo) return s === tA ? r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : r.COMPRESSED_RGBA8_ETC2_EAC;
      } else
        return null;
    if (t === yo || t === So || t === Mo || t === Fo || t === bo || t === To || t === Qo || t === Io || t === Ro || t === Lo || t === Do || t === Ho || t === Po || t === No)
      if (r = e.get("WEBGL_compressed_texture_astc"), r !== null) {
        if (t === yo) return s === tA ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : r.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (t === So) return s === tA ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : r.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (t === Mo) return s === tA ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : r.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (t === Fo) return s === tA ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : r.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (t === bo) return s === tA ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : r.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (t === To) return s === tA ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : r.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (t === Qo) return s === tA ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : r.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (t === Io) return s === tA ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : r.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (t === Ro) return s === tA ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : r.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (t === Lo) return s === tA ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : r.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (t === Do) return s === tA ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : r.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (t === Ho) return s === tA ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : r.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (t === Po) return s === tA ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : r.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (t === No) return s === tA ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : r.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else
        return null;
    if (t === ms || t === Oo || t === Go)
      if (r = e.get("EXT_texture_compression_bptc"), r !== null) {
        if (t === ms) return s === tA ? r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : r.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (t === Oo) return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (t === Go) return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else
        return null;
    if (t === Bh || t === Vo || t === ko || t === Ko)
      if (r = e.get("EXT_texture_compression_rgtc"), r !== null) {
        if (t === ms) return r.COMPRESSED_RED_RGTC1_EXT;
        if (t === Vo) return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (t === ko) return r.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (t === Ko) return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else
        return null;
    return t === _i ? n.UNSIGNED_INT_24_8 : n[t] !== void 0 ? n[t] : null;
  }
  return { convert: A };
}
const ww = { type: "move" };
class Qa {
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  getHandSpace() {
    return this._hand === null && (this._hand = new Qr(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
  }
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new Qr(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new Q(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new Q()), this._targetRay;
  }
  getGripSpace() {
    return this._grip === null && (this._grip = new Qr(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new Q(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new Q()), this._grip;
  }
  dispatchEvent(e) {
    return this._targetRay !== null && this._targetRay.dispatchEvent(e), this._grip !== null && this._grip.dispatchEvent(e), this._hand !== null && this._hand.dispatchEvent(e), this;
  }
  connect(e) {
    if (e && e.hand) {
      const A = this._hand;
      if (A)
        for (const t of e.hand.values())
          this._getHandJoint(A, t);
    }
    return this.dispatchEvent({ type: "connected", data: e }), this;
  }
  disconnect(e) {
    return this.dispatchEvent({ type: "disconnected", data: e }), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this;
  }
  update(e, A, t) {
    let i = null, r = null, s = null;
    const a = this._targetRay, o = this._grip, l = this._hand;
    if (e && A.session.visibilityState !== "visible-blurred") {
      if (l && e.hand) {
        s = !0;
        for (const m of e.hand.values()) {
          const p = A.getJointPose(m, t), h = this._getHandJoint(l, m);
          p !== null && (h.matrix.fromArray(p.transform.matrix), h.matrix.decompose(h.position, h.rotation, h.scale), h.matrixWorldNeedsUpdate = !0, h.jointRadius = p.radius), h.visible = p !== null;
        }
        const c = l.joints["index-finger-tip"], u = l.joints["thumb-tip"], f = c.position.distanceTo(u.position), d = 0.02, g = 5e-3;
        l.inputState.pinching && f > d + g ? (l.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: e.handedness,
          target: this
        })) : !l.inputState.pinching && f <= d - g && (l.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: e.handedness,
          target: this
        }));
      } else
        o !== null && e.gripSpace && (r = A.getPose(e.gripSpace, t), r !== null && (o.matrix.fromArray(r.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale), o.matrixWorldNeedsUpdate = !0, r.linearVelocity ? (o.hasLinearVelocity = !0, o.linearVelocity.copy(r.linearVelocity)) : o.hasLinearVelocity = !1, r.angularVelocity ? (o.hasAngularVelocity = !0, o.angularVelocity.copy(r.angularVelocity)) : o.hasAngularVelocity = !1));
      a !== null && (i = A.getPose(e.targetRaySpace, t), i === null && r !== null && (i = r), i !== null && (a.matrix.fromArray(i.transform.matrix), a.matrix.decompose(a.position, a.rotation, a.scale), a.matrixWorldNeedsUpdate = !0, i.linearVelocity ? (a.hasLinearVelocity = !0, a.linearVelocity.copy(i.linearVelocity)) : a.hasLinearVelocity = !1, i.angularVelocity ? (a.hasAngularVelocity = !0, a.angularVelocity.copy(i.angularVelocity)) : a.hasAngularVelocity = !1, this.dispatchEvent(ww)));
    }
    return a !== null && (a.visible = i !== null), o !== null && (o.visible = r !== null), l !== null && (l.visible = s !== null), this;
  }
  // private method
  _getHandJoint(e, A) {
    if (e.joints[A.jointName] === void 0) {
      const t = new Qr();
      t.matrixAutoUpdate = !1, t.visible = !1, e.joints[A.jointName] = t, e.add(t);
    }
    return e.joints[A.jointName];
  }
}
const _w = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`, vw = `
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;
class Cw {
  constructor() {
    this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
  }
  init(e, A, t) {
    if (this.texture === null) {
      const i = new WA(), r = e.properties.get(i);
      r.__webglTexture = A.texture, (A.depthNear !== t.depthNear || A.depthFar !== t.depthFar) && (this.depthNear = A.depthNear, this.depthFar = A.depthFar), this.texture = i;
    }
  }
  getMesh(e) {
    if (this.texture !== null && this.mesh === null) {
      const A = e.cameras[0].viewport, t = new cn({
        vertexShader: _w,
        fragmentShader: vw,
        uniforms: {
          depthColor: { value: this.texture },
          depthWidth: { value: A.z },
          depthHeight: { value: A.w }
        }
      });
      this.mesh = new jA(new ar(20, 20), t);
    }
    return this.mesh;
  }
  reset() {
    this.texture = null, this.mesh = null;
  }
  getDepthTexture() {
    return this.texture;
  }
}
class Ew extends Dn {
  constructor(e, A) {
    super();
    const t = this;
    let i = null, r = 1, s = null, a = "local-floor", o = 1, l = null, c = null, u = null, f = null, d = null, g = null;
    const m = new Cw(), p = A.getContextAttributes();
    let h = null, E = null;
    const U = [], B = [], S = new Pe();
    let x = null;
    const M = new rt();
    M.viewport = new mA();
    const F = new rt();
    F.viewport = new mA();
    const _ = [M, F], v = new Vp();
    let b = null, H = null;
    this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(W) {
      let ee = U[W];
      return ee === void 0 && (ee = new Qa(), U[W] = ee), ee.getTargetRaySpace();
    }, this.getControllerGrip = function(W) {
      let ee = U[W];
      return ee === void 0 && (ee = new Qa(), U[W] = ee), ee.getGripSpace();
    }, this.getHand = function(W) {
      let ee = U[W];
      return ee === void 0 && (ee = new Qa(), U[W] = ee), ee.getHandSpace();
    };
    function R(W) {
      const ee = B.indexOf(W.inputSource);
      if (ee === -1)
        return;
      const de = U[ee];
      de !== void 0 && (de.update(W.inputSource, W.frame, l || s), de.dispatchEvent({ type: W.type, data: W.inputSource }));
    }
    function N() {
      i.removeEventListener("select", R), i.removeEventListener("selectstart", R), i.removeEventListener("selectend", R), i.removeEventListener("squeeze", R), i.removeEventListener("squeezestart", R), i.removeEventListener("squeezeend", R), i.removeEventListener("end", N), i.removeEventListener("inputsourceschange", Y);
      for (let W = 0; W < U.length; W++) {
        const ee = B[W];
        ee !== null && (B[W] = null, U[W].disconnect(ee));
      }
      b = null, H = null, m.reset(), e.setRenderTarget(h), d = null, f = null, u = null, i = null, E = null, Re.stop(), t.isPresenting = !1, e.setPixelRatio(x), e.setSize(S.width, S.height, !1), t.dispatchEvent({ type: "sessionend" });
    }
    this.setFramebufferScaleFactor = function(W) {
      r = W, t.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.");
    }, this.setReferenceSpaceType = function(W) {
      a = W, t.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.");
    }, this.getReferenceSpace = function() {
      return l || s;
    }, this.setReferenceSpace = function(W) {
      l = W;
    }, this.getBaseLayer = function() {
      return f !== null ? f : d;
    }, this.getBinding = function() {
      return u;
    }, this.getFrame = function() {
      return g;
    }, this.getSession = function() {
      return i;
    }, this.setSession = async function(W) {
      if (i = W, i !== null) {
        if (h = e.getRenderTarget(), i.addEventListener("select", R), i.addEventListener("selectstart", R), i.addEventListener("selectend", R), i.addEventListener("squeeze", R), i.addEventListener("squeezestart", R), i.addEventListener("squeezeend", R), i.addEventListener("end", N), i.addEventListener("inputsourceschange", Y), p.xrCompatible !== !0 && await A.makeXRCompatible(), x = e.getPixelRatio(), e.getSize(S), i.enabledFeatures !== void 0 && i.enabledFeatures.includes("layers")) {
          let de = null, ie = null, xe = null;
          p.depth && (xe = p.stencil ? A.DEPTH24_STENCIL8 : A.DEPTH_COMPONENT24, de = p.stencil ? vi : fi, ie = p.stencil ? _i : Qn);
          const Te = {
            colorFormat: A.RGBA8,
            depthFormat: xe,
            scaleFactor: r
          };
          u = new XRWebGLBinding(i, A), f = u.createProjectionLayer(Te), i.updateRenderState({ layers: [f] }), e.setPixelRatio(1), e.setSize(f.textureWidth, f.textureHeight, !1), E = new In(
            f.textureWidth,
            f.textureHeight,
            {
              format: mt,
              type: Gt,
              depthTexture: new bh(f.textureWidth, f.textureHeight, ie, void 0, void 0, void 0, void 0, void 0, void 0, de),
              stencilBuffer: p.stencil,
              colorSpace: e.outputColorSpace,
              samples: p.antialias ? 4 : 0,
              resolveDepthBuffer: f.ignoreDepthValues === !1
            }
          );
        } else {
          const de = {
            antialias: p.antialias,
            alpha: !0,
            depth: p.depth,
            stencil: p.stencil,
            framebufferScaleFactor: r
          };
          d = new XRWebGLLayer(i, A, de), i.updateRenderState({ baseLayer: d }), e.setPixelRatio(1), e.setSize(d.framebufferWidth, d.framebufferHeight, !1), E = new In(
            d.framebufferWidth,
            d.framebufferHeight,
            {
              format: mt,
              type: Gt,
              colorSpace: e.outputColorSpace,
              stencilBuffer: p.stencil
            }
          );
        }
        E.isXRRenderTarget = !0, this.setFoveation(o), l = null, s = await i.requestReferenceSpace(a), Re.setContext(i), Re.start(), t.isPresenting = !0, t.dispatchEvent({ type: "sessionstart" });
      }
    }, this.getEnvironmentBlendMode = function() {
      if (i !== null)
        return i.environmentBlendMode;
    }, this.getDepthTexture = function() {
      return m.getDepthTexture();
    };
    function Y(W) {
      for (let ee = 0; ee < W.removed.length; ee++) {
        const de = W.removed[ee], ie = B.indexOf(de);
        ie >= 0 && (B[ie] = null, U[ie].disconnect(de));
      }
      for (let ee = 0; ee < W.added.length; ee++) {
        const de = W.added[ee];
        let ie = B.indexOf(de);
        if (ie === -1) {
          for (let Te = 0; Te < U.length; Te++)
            if (Te >= B.length) {
              B.push(de), ie = Te;
              break;
            } else if (B[Te] === null) {
              B[Te] = de, ie = Te;
              break;
            }
          if (ie === -1) break;
        }
        const xe = U[ie];
        xe && xe.connect(de);
      }
    }
    const k = new Q(), Z = new Q();
    function K(W, ee, de) {
      k.setFromMatrixPosition(ee.matrixWorld), Z.setFromMatrixPosition(de.matrixWorld);
      const ie = k.distanceTo(Z), xe = ee.projectionMatrix.elements, Te = de.projectionMatrix.elements, Le = xe[14] / (xe[10] - 1), sA = xe[14] / (xe[10] + 1), Oe = (xe[9] + 1) / xe[5], aA = (xe[9] - 1) / xe[5], T = (xe[8] - 1) / xe[0], dA = (Te[8] + 1) / Te[0], Se = Le * T, Ge = Le * dA, Ee = ie / (-T + dA), AA = Ee * -T;
      if (ee.matrixWorld.decompose(W.position, W.quaternion, W.scale), W.translateX(AA), W.translateZ(Ee), W.matrixWorld.compose(W.position, W.quaternion, W.scale), W.matrixWorldInverse.copy(W.matrixWorld).invert(), xe[10] === -1)
        W.projectionMatrix.copy(ee.projectionMatrix), W.projectionMatrixInverse.copy(ee.projectionMatrixInverse);
      else {
        const Ce = Le + Ee, y = sA + Ee, w = Se - AA, P = Ge + (ie - AA), J = Oe * sA / y * Ce, j = aA * sA / y * Ce;
        W.projectionMatrix.makePerspective(w, P, J, j, Ce, y), W.projectionMatrixInverse.copy(W.projectionMatrix).invert();
      }
    }
    function ne(W, ee) {
      ee === null ? W.matrixWorld.copy(W.matrix) : W.matrixWorld.multiplyMatrices(ee.matrixWorld, W.matrix), W.matrixWorldInverse.copy(W.matrixWorld).invert();
    }
    this.updateCamera = function(W) {
      if (i === null) return;
      let ee = W.near, de = W.far;
      m.texture !== null && (m.depthNear > 0 && (ee = m.depthNear), m.depthFar > 0 && (de = m.depthFar)), v.near = F.near = M.near = ee, v.far = F.far = M.far = de, (b !== v.near || H !== v.far) && (i.updateRenderState({
        depthNear: v.near,
        depthFar: v.far
      }), b = v.near, H = v.far), M.layers.mask = W.layers.mask | 2, F.layers.mask = W.layers.mask | 4, v.layers.mask = M.layers.mask | F.layers.mask;
      const ie = W.parent, xe = v.cameras;
      ne(v, ie);
      for (let Te = 0; Te < xe.length; Te++)
        ne(xe[Te], ie);
      xe.length === 2 ? K(v, M, F) : v.projectionMatrix.copy(M.projectionMatrix), oe(W, v, ie);
    };
    function oe(W, ee, de) {
      de === null ? W.matrix.copy(ee.matrixWorld) : (W.matrix.copy(de.matrixWorld), W.matrix.invert(), W.matrix.multiply(ee.matrixWorld)), W.matrix.decompose(W.position, W.quaternion, W.scale), W.updateMatrixWorld(!0), W.projectionMatrix.copy(ee.projectionMatrix), W.projectionMatrixInverse.copy(ee.projectionMatrixInverse), W.isPerspectiveCamera && (W.fov = zo * 2 * Math.atan(1 / W.projectionMatrix.elements[5]), W.zoom = 1);
    }
    this.getCamera = function() {
      return v;
    }, this.getFoveation = function() {
      if (!(f === null && d === null))
        return o;
    }, this.setFoveation = function(W) {
      o = W, f !== null && (f.fixedFoveation = W), d !== null && d.fixedFoveation !== void 0 && (d.fixedFoveation = W);
    }, this.hasDepthSensing = function() {
      return m.texture !== null;
    }, this.getDepthSensingMesh = function() {
      return m.getMesh(v);
    };
    let Be = null;
    function Fe(W, ee) {
      if (c = ee.getViewerPose(l || s), g = ee, c !== null) {
        const de = c.views;
        d !== null && (e.setRenderTargetFramebuffer(E, d.framebuffer), e.setRenderTarget(E));
        let ie = !1;
        de.length !== v.cameras.length && (v.cameras.length = 0, ie = !0);
        for (let Te = 0; Te < de.length; Te++) {
          const Le = de[Te];
          let sA = null;
          if (d !== null)
            sA = d.getViewport(Le);
          else {
            const aA = u.getViewSubImage(f, Le);
            sA = aA.viewport, Te === 0 && (e.setRenderTargetTextures(
              E,
              aA.colorTexture,
              f.ignoreDepthValues ? void 0 : aA.depthStencilTexture
            ), e.setRenderTarget(E));
          }
          let Oe = _[Te];
          Oe === void 0 && (Oe = new rt(), Oe.layers.enable(Te), Oe.viewport = new mA(), _[Te] = Oe), Oe.matrix.fromArray(Le.transform.matrix), Oe.matrix.decompose(Oe.position, Oe.quaternion, Oe.scale), Oe.projectionMatrix.fromArray(Le.projectionMatrix), Oe.projectionMatrixInverse.copy(Oe.projectionMatrix).invert(), Oe.viewport.set(sA.x, sA.y, sA.width, sA.height), Te === 0 && (v.matrix.copy(Oe.matrix), v.matrix.decompose(v.position, v.quaternion, v.scale)), ie === !0 && v.cameras.push(Oe);
        }
        const xe = i.enabledFeatures;
        if (xe && xe.includes("depth-sensing")) {
          const Te = u.getDepthInformation(de[0]);
          Te && Te.isValid && Te.texture && m.init(e, Te, i.renderState);
        }
      }
      for (let de = 0; de < U.length; de++) {
        const ie = B[de], xe = U[de];
        ie !== null && xe !== void 0 && xe.update(ie, ee, l || s);
      }
      Be && Be(W, ee), ee.detectedPlanes && t.dispatchEvent({ type: "planesdetected", data: ee }), g = null;
    }
    const Re = new Th();
    Re.setAnimationLoop(Fe), this.setAnimationLoop = function(W) {
      Be = W;
    }, this.dispose = function() {
    };
  }
}
const wn = /* @__PURE__ */ new Vt(), xw = /* @__PURE__ */ new uA();
function Uw(n, e) {
  function A(p, h) {
    p.matrixAutoUpdate === !0 && p.updateMatrix(), h.value.copy(p.matrix);
  }
  function t(p, h) {
    h.color.getRGB(p.fogColor.value, yh(n)), h.isFog ? (p.fogNear.value = h.near, p.fogFar.value = h.far) : h.isFogExp2 && (p.fogDensity.value = h.density);
  }
  function i(p, h, E, U, B) {
    h.isMeshBasicMaterial || h.isMeshLambertMaterial ? r(p, h) : h.isMeshToonMaterial ? (r(p, h), u(p, h)) : h.isMeshPhongMaterial ? (r(p, h), c(p, h)) : h.isMeshStandardMaterial ? (r(p, h), f(p, h), h.isMeshPhysicalMaterial && d(p, h, B)) : h.isMeshMatcapMaterial ? (r(p, h), g(p, h)) : h.isMeshDepthMaterial ? r(p, h) : h.isMeshDistanceMaterial ? (r(p, h), m(p, h)) : h.isMeshNormalMaterial ? r(p, h) : h.isLineBasicMaterial ? (s(p, h), h.isLineDashedMaterial && a(p, h)) : h.isPointsMaterial ? o(p, h, E, U) : h.isSpriteMaterial ? l(p, h) : h.isShadowMaterial ? (p.color.value.copy(h.color), p.opacity.value = h.opacity) : h.isShaderMaterial && (h.uniformsNeedUpdate = !1);
  }
  function r(p, h) {
    p.opacity.value = h.opacity, h.color && p.diffuse.value.copy(h.color), h.emissive && p.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity), h.map && (p.map.value = h.map, A(h.map, p.mapTransform)), h.alphaMap && (p.alphaMap.value = h.alphaMap, A(h.alphaMap, p.alphaMapTransform)), h.bumpMap && (p.bumpMap.value = h.bumpMap, A(h.bumpMap, p.bumpMapTransform), p.bumpScale.value = h.bumpScale, h.side === zA && (p.bumpScale.value *= -1)), h.normalMap && (p.normalMap.value = h.normalMap, A(h.normalMap, p.normalMapTransform), p.normalScale.value.copy(h.normalScale), h.side === zA && p.normalScale.value.negate()), h.displacementMap && (p.displacementMap.value = h.displacementMap, A(h.displacementMap, p.displacementMapTransform), p.displacementScale.value = h.displacementScale, p.displacementBias.value = h.displacementBias), h.emissiveMap && (p.emissiveMap.value = h.emissiveMap, A(h.emissiveMap, p.emissiveMapTransform)), h.specularMap && (p.specularMap.value = h.specularMap, A(h.specularMap, p.specularMapTransform)), h.alphaTest > 0 && (p.alphaTest.value = h.alphaTest);
    const E = e.get(h), U = E.envMap, B = E.envMapRotation;
    U && (p.envMap.value = U, wn.copy(B), wn.x *= -1, wn.y *= -1, wn.z *= -1, U.isCubeTexture && U.isRenderTargetTexture === !1 && (wn.y *= -1, wn.z *= -1), p.envMapRotation.value.setFromMatrix4(xw.makeRotationFromEuler(wn)), p.flipEnvMap.value = U.isCubeTexture && U.isRenderTargetTexture === !1 ? -1 : 1, p.reflectivity.value = h.reflectivity, p.ior.value = h.ior, p.refractionRatio.value = h.refractionRatio), h.lightMap && (p.lightMap.value = h.lightMap, p.lightMapIntensity.value = h.lightMapIntensity, A(h.lightMap, p.lightMapTransform)), h.aoMap && (p.aoMap.value = h.aoMap, p.aoMapIntensity.value = h.aoMapIntensity, A(h.aoMap, p.aoMapTransform));
  }
  function s(p, h) {
    p.diffuse.value.copy(h.color), p.opacity.value = h.opacity, h.map && (p.map.value = h.map, A(h.map, p.mapTransform));
  }
  function a(p, h) {
    p.dashSize.value = h.dashSize, p.totalSize.value = h.dashSize + h.gapSize, p.scale.value = h.scale;
  }
  function o(p, h, E, U) {
    p.diffuse.value.copy(h.color), p.opacity.value = h.opacity, p.size.value = h.size * E, p.scale.value = U * 0.5, h.map && (p.map.value = h.map, A(h.map, p.uvTransform)), h.alphaMap && (p.alphaMap.value = h.alphaMap, A(h.alphaMap, p.alphaMapTransform)), h.alphaTest > 0 && (p.alphaTest.value = h.alphaTest);
  }
  function l(p, h) {
    p.diffuse.value.copy(h.color), p.opacity.value = h.opacity, p.rotation.value = h.rotation, h.map && (p.map.value = h.map, A(h.map, p.mapTransform)), h.alphaMap && (p.alphaMap.value = h.alphaMap, A(h.alphaMap, p.alphaMapTransform)), h.alphaTest > 0 && (p.alphaTest.value = h.alphaTest);
  }
  function c(p, h) {
    p.specular.value.copy(h.specular), p.shininess.value = Math.max(h.shininess, 1e-4);
  }
  function u(p, h) {
    h.gradientMap && (p.gradientMap.value = h.gradientMap);
  }
  function f(p, h) {
    p.metalness.value = h.metalness, h.metalnessMap && (p.metalnessMap.value = h.metalnessMap, A(h.metalnessMap, p.metalnessMapTransform)), p.roughness.value = h.roughness, h.roughnessMap && (p.roughnessMap.value = h.roughnessMap, A(h.roughnessMap, p.roughnessMapTransform)), h.envMap && (p.envMapIntensity.value = h.envMapIntensity);
  }
  function d(p, h, E) {
    p.ior.value = h.ior, h.sheen > 0 && (p.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen), p.sheenRoughness.value = h.sheenRoughness, h.sheenColorMap && (p.sheenColorMap.value = h.sheenColorMap, A(h.sheenColorMap, p.sheenColorMapTransform)), h.sheenRoughnessMap && (p.sheenRoughnessMap.value = h.sheenRoughnessMap, A(h.sheenRoughnessMap, p.sheenRoughnessMapTransform))), h.clearcoat > 0 && (p.clearcoat.value = h.clearcoat, p.clearcoatRoughness.value = h.clearcoatRoughness, h.clearcoatMap && (p.clearcoatMap.value = h.clearcoatMap, A(h.clearcoatMap, p.clearcoatMapTransform)), h.clearcoatRoughnessMap && (p.clearcoatRoughnessMap.value = h.clearcoatRoughnessMap, A(h.clearcoatRoughnessMap, p.clearcoatRoughnessMapTransform)), h.clearcoatNormalMap && (p.clearcoatNormalMap.value = h.clearcoatNormalMap, A(h.clearcoatNormalMap, p.clearcoatNormalMapTransform), p.clearcoatNormalScale.value.copy(h.clearcoatNormalScale), h.side === zA && p.clearcoatNormalScale.value.negate())), h.dispersion > 0 && (p.dispersion.value = h.dispersion), h.iridescence > 0 && (p.iridescence.value = h.iridescence, p.iridescenceIOR.value = h.iridescenceIOR, p.iridescenceThicknessMinimum.value = h.iridescenceThicknessRange[0], p.iridescenceThicknessMaximum.value = h.iridescenceThicknessRange[1], h.iridescenceMap && (p.iridescenceMap.value = h.iridescenceMap, A(h.iridescenceMap, p.iridescenceMapTransform)), h.iridescenceThicknessMap && (p.iridescenceThicknessMap.value = h.iridescenceThicknessMap, A(h.iridescenceThicknessMap, p.iridescenceThicknessMapTransform))), h.transmission > 0 && (p.transmission.value = h.transmission, p.transmissionSamplerMap.value = E.texture, p.transmissionSamplerSize.value.set(E.width, E.height), h.transmissionMap && (p.transmissionMap.value = h.transmissionMap, A(h.transmissionMap, p.transmissionMapTransform)), p.thickness.value = h.thickness, h.thicknessMap && (p.thicknessMap.value = h.thicknessMap, A(h.thicknessMap, p.thicknessMapTransform)), p.attenuationDistance.value = h.attenuationDistance, p.attenuationColor.value.copy(h.attenuationColor)), h.anisotropy > 0 && (p.anisotropyVector.value.set(h.anisotropy * Math.cos(h.anisotropyRotation), h.anisotropy * Math.sin(h.anisotropyRotation)), h.anisotropyMap && (p.anisotropyMap.value = h.anisotropyMap, A(h.anisotropyMap, p.anisotropyMapTransform))), p.specularIntensity.value = h.specularIntensity, p.specularColor.value.copy(h.specularColor), h.specularColorMap && (p.specularColorMap.value = h.specularColorMap, A(h.specularColorMap, p.specularColorMapTransform)), h.specularIntensityMap && (p.specularIntensityMap.value = h.specularIntensityMap, A(h.specularIntensityMap, p.specularIntensityMapTransform));
  }
  function g(p, h) {
    h.matcap && (p.matcap.value = h.matcap);
  }
  function m(p, h) {
    const E = e.get(h).light;
    p.referencePosition.value.setFromMatrixPosition(E.matrixWorld), p.nearDistance.value = E.shadow.camera.near, p.farDistance.value = E.shadow.camera.far;
  }
  return {
    refreshFogUniforms: t,
    refreshMaterialUniforms: i
  };
}
function yw(n, e, A, t) {
  let i = {}, r = {}, s = [];
  const a = n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);
  function o(E, U) {
    const B = U.program;
    t.uniformBlockBinding(E, B);
  }
  function l(E, U) {
    let B = i[E.id];
    B === void 0 && (g(E), B = c(E), i[E.id] = B, E.addEventListener("dispose", p));
    const S = U.program;
    t.updateUBOMapping(E, S);
    const x = e.render.frame;
    r[E.id] !== x && (f(E), r[E.id] = x);
  }
  function c(E) {
    const U = u();
    E.__bindingPointIndex = U;
    const B = n.createBuffer(), S = E.__size, x = E.usage;
    return n.bindBuffer(n.UNIFORM_BUFFER, B), n.bufferData(n.UNIFORM_BUFFER, S, x), n.bindBuffer(n.UNIFORM_BUFFER, null), n.bindBufferBase(n.UNIFORM_BUFFER, U, B), B;
  }
  function u() {
    for (let E = 0; E < a; E++)
      if (s.indexOf(E) === -1)
        return s.push(E), E;
    return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function f(E) {
    const U = i[E.id], B = E.uniforms, S = E.__cache;
    n.bindBuffer(n.UNIFORM_BUFFER, U);
    for (let x = 0, M = B.length; x < M; x++) {
      const F = Array.isArray(B[x]) ? B[x] : [B[x]];
      for (let _ = 0, v = F.length; _ < v; _++) {
        const b = F[_];
        if (d(b, x, _, S) === !0) {
          const H = b.__offset, R = Array.isArray(b.value) ? b.value : [b.value];
          let N = 0;
          for (let Y = 0; Y < R.length; Y++) {
            const k = R[Y], Z = m(k);
            typeof k == "number" || typeof k == "boolean" ? (b.__data[0] = k, n.bufferSubData(n.UNIFORM_BUFFER, H + N, b.__data)) : k.isMatrix3 ? (b.__data[0] = k.elements[0], b.__data[1] = k.elements[1], b.__data[2] = k.elements[2], b.__data[3] = 0, b.__data[4] = k.elements[3], b.__data[5] = k.elements[4], b.__data[6] = k.elements[5], b.__data[7] = 0, b.__data[8] = k.elements[6], b.__data[9] = k.elements[7], b.__data[10] = k.elements[8], b.__data[11] = 0) : (k.toArray(b.__data, N), N += Z.storage / Float32Array.BYTES_PER_ELEMENT);
          }
          n.bufferSubData(n.UNIFORM_BUFFER, H, b.__data);
        }
      }
    }
    n.bindBuffer(n.UNIFORM_BUFFER, null);
  }
  function d(E, U, B, S) {
    const x = E.value, M = U + "_" + B;
    if (S[M] === void 0)
      return typeof x == "number" || typeof x == "boolean" ? S[M] = x : S[M] = x.clone(), !0;
    {
      const F = S[M];
      if (typeof x == "number" || typeof x == "boolean") {
        if (F !== x)
          return S[M] = x, !0;
      } else if (F.equals(x) === !1)
        return F.copy(x), !0;
    }
    return !1;
  }
  function g(E) {
    const U = E.uniforms;
    let B = 0;
    const S = 16;
    for (let M = 0, F = U.length; M < F; M++) {
      const _ = Array.isArray(U[M]) ? U[M] : [U[M]];
      for (let v = 0, b = _.length; v < b; v++) {
        const H = _[v], R = Array.isArray(H.value) ? H.value : [H.value];
        for (let N = 0, Y = R.length; N < Y; N++) {
          const k = R[N], Z = m(k), K = B % S, ne = K % Z.boundary, oe = K + ne;
          B += ne, oe !== 0 && S - oe < Z.storage && (B += S - oe), H.__data = new Float32Array(Z.storage / Float32Array.BYTES_PER_ELEMENT), H.__offset = B, B += Z.storage;
        }
      }
    }
    const x = B % S;
    return x > 0 && (B += S - x), E.__size = B, E.__cache = {}, this;
  }
  function m(E) {
    const U = {
      boundary: 0,
      // bytes
      storage: 0
      // bytes
    };
    return typeof E == "number" || typeof E == "boolean" ? (U.boundary = 4, U.storage = 4) : E.isVector2 ? (U.boundary = 8, U.storage = 8) : E.isVector3 || E.isColor ? (U.boundary = 16, U.storage = 12) : E.isVector4 ? (U.boundary = 16, U.storage = 16) : E.isMatrix3 ? (U.boundary = 48, U.storage = 48) : E.isMatrix4 ? (U.boundary = 64, U.storage = 64) : E.isTexture ? console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.") : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", E), U;
  }
  function p(E) {
    const U = E.target;
    U.removeEventListener("dispose", p);
    const B = s.indexOf(U.__bindingPointIndex);
    s.splice(B, 1), n.deleteBuffer(i[U.id]), delete i[U.id], delete r[U.id];
  }
  function h() {
    for (const E in i)
      n.deleteBuffer(i[E]);
    s = [], i = {}, r = {};
  }
  return {
    bind: o,
    update: l,
    dispose: h
  };
}
class Sw {
  constructor(e = {}) {
    const {
      canvas: A = sp(),
      context: t = null,
      depth: i = !0,
      stencil: r = !1,
      alpha: s = !1,
      antialias: a = !1,
      premultipliedAlpha: o = !0,
      preserveDrawingBuffer: l = !1,
      powerPreference: c = "default",
      failIfMajorPerformanceCaveat: u = !1,
      reverseDepthBuffer: f = !1
    } = e;
    this.isWebGLRenderer = !0;
    let d;
    if (t !== null) {
      if (typeof WebGLRenderingContext < "u" && t instanceof WebGLRenderingContext)
        throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
      d = t.getContextAttributes().alpha;
    } else
      d = s;
    const g = new Uint32Array(4), m = new Int32Array(4);
    let p = null, h = null;
    const E = [], U = [];
    this.domElement = A, this.debug = {
      /**
       * Enables error checking and reporting when shader programs are being compiled
       * @type {boolean}
       */
      checkShaderErrors: !0,
      /**
       * Callback for custom error reporting.
       * @type {?Function}
       */
      onShaderError: null
    }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this._outputColorSpace = it, this.toneMapping = sn, this.toneMappingExposure = 1;
    const B = this;
    let S = !1, x = 0, M = 0, F = null, _ = -1, v = null;
    const b = new mA(), H = new mA();
    let R = null;
    const N = new Ye(0);
    let Y = 0, k = A.width, Z = A.height, K = 1, ne = null, oe = null;
    const Be = new mA(0, 0, k, Z), Fe = new mA(0, 0, k, Z);
    let Re = !1;
    const W = new Fh();
    let ee = !1, de = !1;
    this.transmissionResolutionScale = 1;
    const ie = new uA(), xe = new uA(), Te = new Q(), Le = new mA(), sA = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 };
    let Oe = !1;
    function aA() {
      return F === null ? K : 1;
    }
    let T = t;
    function dA(C, L) {
      return A.getContext(C, L);
    }
    try {
      const C = {
        alpha: !0,
        depth: i,
        stencil: r,
        antialias: a,
        premultipliedAlpha: o,
        preserveDrawingBuffer: l,
        powerPreference: c,
        failIfMajorPerformanceCaveat: u
      };
      if ("setAttribute" in A && A.setAttribute("data-engine", `three.js r${ml}`), A.addEventListener("webglcontextlost", q, !1), A.addEventListener("webglcontextrestored", re, !1), A.addEventListener("webglcontextcreationerror", ue, !1), T === null) {
        const L = "webgl2";
        if (T = dA(L, C), T === null)
          throw dA(L) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
      }
    } catch (C) {
      throw console.error("THREE.WebGLRenderer: " + C.message), C;
    }
    let Se, Ge, Ee, AA, Ce, y, w, P, J, j, X, ve, ae, pe, Ve, te, O, $, _e, se, Me, be, Je, I;
    function le() {
      Se = new DB(T), Se.init(), be = new Bw(T, Se), Ge = new bB(T, Se, e, be), Ee = new gw(T, Se), Ge.reverseDepthBuffer && f && Ee.buffers.depth.setReversed(!0), AA = new NB(T), Ce = new nw(), y = new mw(T, Se, Ee, Ce, Ge, be, AA), w = new QB(B), P = new LB(B), J = new Wp(T), Je = new MB(T, J), j = new HB(T, J, AA, Je), X = new GB(T, j, J, AA), _e = new OB(T, Ge, y), te = new TB(Ce), ve = new tw(B, w, P, Se, Ge, Je, te), ae = new Uw(B, Ce), pe = new rw(), Ve = new uw(Se), $ = new SB(B, w, P, Ee, X, d, o), O = new dw(B, X, Ge), I = new yw(T, AA, Ge, Ee), se = new FB(T, Se, AA), Me = new PB(T, Se, AA), AA.programs = ve.programs, B.capabilities = Ge, B.extensions = Se, B.properties = Ce, B.renderLists = pe, B.shadowMap = O, B.state = Ee, B.info = AA;
    }
    le();
    const z = new Ew(B, T);
    this.xr = z, this.getContext = function() {
      return T;
    }, this.getContextAttributes = function() {
      return T.getContextAttributes();
    }, this.forceContextLoss = function() {
      const C = Se.get("WEBGL_lose_context");
      C && C.loseContext();
    }, this.forceContextRestore = function() {
      const C = Se.get("WEBGL_lose_context");
      C && C.restoreContext();
    }, this.getPixelRatio = function() {
      return K;
    }, this.setPixelRatio = function(C) {
      C !== void 0 && (K = C, this.setSize(k, Z, !1));
    }, this.getSize = function(C) {
      return C.set(k, Z);
    }, this.setSize = function(C, L, G = !0) {
      if (z.isPresenting) {
        console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");
        return;
      }
      k = C, Z = L, A.width = Math.floor(C * K), A.height = Math.floor(L * K), G === !0 && (A.style.width = C + "px", A.style.height = L + "px"), this.setViewport(0, 0, C, L);
    }, this.getDrawingBufferSize = function(C) {
      return C.set(k * K, Z * K).floor();
    }, this.setDrawingBufferSize = function(C, L, G) {
      k = C, Z = L, K = G, A.width = Math.floor(C * G), A.height = Math.floor(L * G), this.setViewport(0, 0, C, L);
    }, this.getCurrentViewport = function(C) {
      return C.copy(b);
    }, this.getViewport = function(C) {
      return C.copy(Be);
    }, this.setViewport = function(C, L, G, V) {
      C.isVector4 ? Be.set(C.x, C.y, C.z, C.w) : Be.set(C, L, G, V), Ee.viewport(b.copy(Be).multiplyScalar(K).round());
    }, this.getScissor = function(C) {
      return C.copy(Fe);
    }, this.setScissor = function(C, L, G, V) {
      C.isVector4 ? Fe.set(C.x, C.y, C.z, C.w) : Fe.set(C, L, G, V), Ee.scissor(H.copy(Fe).multiplyScalar(K).round());
    }, this.getScissorTest = function() {
      return Re;
    }, this.setScissorTest = function(C) {
      Ee.setScissorTest(Re = C);
    }, this.setOpaqueSort = function(C) {
      ne = C;
    }, this.setTransparentSort = function(C) {
      oe = C;
    }, this.getClearColor = function(C) {
      return C.copy($.getClearColor());
    }, this.setClearColor = function() {
      $.setClearColor.apply($, arguments);
    }, this.getClearAlpha = function() {
      return $.getClearAlpha();
    }, this.setClearAlpha = function() {
      $.setClearAlpha.apply($, arguments);
    }, this.clear = function(C = !0, L = !0, G = !0) {
      let V = 0;
      if (C) {
        let D = !1;
        if (F !== null) {
          const Ae = F.texture.format;
          D = Ae === El || Ae === Cl || Ae === vl;
        }
        if (D) {
          const Ae = F.texture.type, he = Ae === Gt || Ae === Qn || Ae === $i || Ae === _i || Ae === wl || Ae === _l, me = $.getClearColor(), we = $.getClearAlpha(), Qe = me.r, Ie = me.g, Ue = me.b;
          he ? (g[0] = Qe, g[1] = Ie, g[2] = Ue, g[3] = we, T.clearBufferuiv(T.COLOR, 0, g)) : (m[0] = Qe, m[1] = Ie, m[2] = Ue, m[3] = we, T.clearBufferiv(T.COLOR, 0, m));
        } else
          V |= T.COLOR_BUFFER_BIT;
      }
      L && (V |= T.DEPTH_BUFFER_BIT), G && (V |= T.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), T.clear(V);
    }, this.clearColor = function() {
      this.clear(!0, !1, !1);
    }, this.clearDepth = function() {
      this.clear(!1, !0, !1);
    }, this.clearStencil = function() {
      this.clear(!1, !1, !0);
    }, this.dispose = function() {
      A.removeEventListener("webglcontextlost", q, !1), A.removeEventListener("webglcontextrestored", re, !1), A.removeEventListener("webglcontextcreationerror", ue, !1), $.dispose(), pe.dispose(), Ve.dispose(), Ce.dispose(), w.dispose(), P.dispose(), X.dispose(), Je.dispose(), I.dispose(), ve.dispose(), z.dispose(), z.removeEventListener("sessionstart", Hl), z.removeEventListener("sessionend", Pl), hn.stop();
    };
    function q(C) {
      C.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), S = !0;
    }
    function re() {
      console.log("THREE.WebGLRenderer: Context Restored."), S = !1;
      const C = AA.autoReset, L = O.enabled, G = O.autoUpdate, V = O.needsUpdate, D = O.type;
      le(), AA.autoReset = C, O.enabled = L, O.autoUpdate = G, O.needsUpdate = V, O.type = D;
    }
    function ue(C) {
      console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", C.statusMessage);
    }
    function De(C) {
      const L = C.target;
      L.removeEventListener("dispose", De), hA(L);
    }
    function hA(C) {
      IA(C), Ce.remove(C);
    }
    function IA(C) {
      const L = Ce.get(C).programs;
      L !== void 0 && (L.forEach(function(G) {
        ve.releaseProgram(G);
      }), C.isShaderMaterial && ve.releaseShaderCache(C));
    }
    this.renderBufferDirect = function(C, L, G, V, D, Ae) {
      L === null && (L = sA);
      const he = D.isMesh && D.matrixWorld.determinant() < 0, me = Gf(C, L, G, V, D);
      Ee.setMaterial(V, he);
      let we = G.index, Qe = 1;
      if (V.wireframe === !0) {
        if (we = j.getWireframeAttribute(G), we === void 0) return;
        Qe = 2;
      }
      const Ie = G.drawRange, Ue = G.attributes.position;
      let ze = Ie.start * Qe, qe = (Ie.start + Ie.count) * Qe;
      Ae !== null && (ze = Math.max(ze, Ae.start * Qe), qe = Math.min(qe, (Ae.start + Ae.count) * Qe)), we !== null ? (ze = Math.max(ze, 0), qe = Math.min(qe, we.count)) : Ue != null && (ze = Math.max(ze, 0), qe = Math.min(qe, Ue.count));
      const BA = qe - ze;
      if (BA < 0 || BA === 1 / 0) return;
      Je.setup(D, V, me, G, we);
      let fA, We = se;
      if (we !== null && (fA = J.get(we), We = Me, We.setIndex(fA)), D.isMesh)
        V.wireframe === !0 ? (Ee.setLineWidth(V.wireframeLinewidth * aA()), We.setMode(T.LINES)) : We.setMode(T.TRIANGLES);
      else if (D.isLine) {
        let ye = V.linewidth;
        ye === void 0 && (ye = 1), Ee.setLineWidth(ye * aA()), D.isLineSegments ? We.setMode(T.LINES) : D.isLineLoop ? We.setMode(T.LINE_LOOP) : We.setMode(T.LINE_STRIP);
      } else D.isPoints ? We.setMode(T.POINTS) : D.isSprite && We.setMode(T.TRIANGLES);
      if (D.isBatchedMesh)
        if (D._multiDrawInstances !== null)
          We.renderMultiDrawInstances(D._multiDrawStarts, D._multiDrawCounts, D._multiDrawCount, D._multiDrawInstances);
        else if (Se.get("WEBGL_multi_draw"))
          We.renderMultiDraw(D._multiDrawStarts, D._multiDrawCounts, D._multiDrawCount);
        else {
          const ye = D._multiDrawStarts, MA = D._multiDrawCounts, Ze = D._multiDrawCount, ut = we ? J.get(we).bytesPerElement : 1, Hn = Ce.get(V).currentProgram.getUniforms();
          for (let YA = 0; YA < Ze; YA++)
            Hn.setValue(T, "_gl_DrawID", YA), We.render(ye[YA] / ut, MA[YA]);
        }
      else if (D.isInstancedMesh)
        We.renderInstances(ze, BA, D.count);
      else if (G.isInstancedBufferGeometry) {
        const ye = G._maxInstanceCount !== void 0 ? G._maxInstanceCount : 1 / 0, MA = Math.min(G.instanceCount, ye);
        We.renderInstances(ze, BA, MA);
      } else
        We.render(ze, BA);
    };
    function $e(C, L, G) {
      C.transparent === !0 && C.side === gt && C.forceSinglePass === !1 ? (C.side = zA, C.needsUpdate = !0, ur(C, L, G), C.side = ln, C.needsUpdate = !0, ur(C, L, G), C.side = gt) : ur(C, L, G);
    }
    this.compile = function(C, L, G = null) {
      G === null && (G = C), h = Ve.get(G), h.init(L), U.push(h), G.traverseVisible(function(D) {
        D.isLight && D.layers.test(L.layers) && (h.pushLight(D), D.castShadow && h.pushShadow(D));
      }), C !== G && C.traverseVisible(function(D) {
        D.isLight && D.layers.test(L.layers) && (h.pushLight(D), D.castShadow && h.pushShadow(D));
      }), h.setupLights();
      const V = /* @__PURE__ */ new Set();
      return C.traverse(function(D) {
        if (!(D.isMesh || D.isPoints || D.isLine || D.isSprite))
          return;
        const Ae = D.material;
        if (Ae)
          if (Array.isArray(Ae))
            for (let he = 0; he < Ae.length; he++) {
              const me = Ae[he];
              $e(me, G, D), V.add(me);
            }
          else
            $e(Ae, G, D), V.add(Ae);
      }), U.pop(), h = null, V;
    }, this.compileAsync = function(C, L, G = null) {
      const V = this.compile(C, L, G);
      return new Promise((D) => {
        function Ae() {
          if (V.forEach(function(he) {
            Ce.get(he).currentProgram.isReady() && V.delete(he);
          }), V.size === 0) {
            D(C);
            return;
          }
          setTimeout(Ae, 10);
        }
        Se.get("KHR_parallel_shader_compile") !== null ? Ae() : setTimeout(Ae, 10);
      });
    };
    let ct = null;
    function Mt(C) {
      ct && ct(C);
    }
    function Hl() {
      hn.stop();
    }
    function Pl() {
      hn.start();
    }
    const hn = new Th();
    hn.setAnimationLoop(Mt), typeof self < "u" && hn.setContext(self), this.setAnimationLoop = function(C) {
      ct = C, z.setAnimationLoop(C), C === null ? hn.stop() : hn.start();
    }, z.addEventListener("sessionstart", Hl), z.addEventListener("sessionend", Pl), this.render = function(C, L) {
      if (L !== void 0 && L.isCamera !== !0) {
        console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        return;
      }
      if (S === !0) return;
      if (C.matrixWorldAutoUpdate === !0 && C.updateMatrixWorld(), L.parent === null && L.matrixWorldAutoUpdate === !0 && L.updateMatrixWorld(), z.enabled === !0 && z.isPresenting === !0 && (z.cameraAutoUpdate === !0 && z.updateCamera(L), L = z.getCamera()), C.isScene === !0 && C.onBeforeRender(B, C, L, F), h = Ve.get(C, U.length), h.init(L), U.push(h), xe.multiplyMatrices(L.projectionMatrix, L.matrixWorldInverse), W.setFromProjectionMatrix(xe), de = this.localClippingEnabled, ee = te.init(this.clippingPlanes, de), p = pe.get(C, E.length), p.init(), E.push(p), z.enabled === !0 && z.isPresenting === !0) {
        const Ae = B.xr.getDepthSensingMesh();
        Ae !== null && $s(Ae, L, -1 / 0, B.sortObjects);
      }
      $s(C, L, 0, B.sortObjects), p.finish(), B.sortObjects === !0 && p.sort(ne, oe), Oe = z.enabled === !1 || z.isPresenting === !1 || z.hasDepthSensing() === !1, Oe && $.addToRenderList(p, C), this.info.render.frame++, ee === !0 && te.beginShadows();
      const G = h.state.shadowsArray;
      O.render(G, C, L), ee === !0 && te.endShadows(), this.info.autoReset === !0 && this.info.reset();
      const V = p.opaque, D = p.transmissive;
      if (h.setupLights(), L.isArrayCamera) {
        const Ae = L.cameras;
        if (D.length > 0)
          for (let he = 0, me = Ae.length; he < me; he++) {
            const we = Ae[he];
            Ol(V, D, C, we);
          }
        Oe && $.render(C);
        for (let he = 0, me = Ae.length; he < me; he++) {
          const we = Ae[he];
          Nl(p, C, we, we.viewport);
        }
      } else
        D.length > 0 && Ol(V, D, C, L), Oe && $.render(C), Nl(p, C, L);
      F !== null && M === 0 && (y.updateMultisampleRenderTarget(F), y.updateRenderTargetMipmap(F)), C.isScene === !0 && C.onAfterRender(B, C, L), Je.resetDefaultState(), _ = -1, v = null, U.pop(), U.length > 0 ? (h = U[U.length - 1], ee === !0 && te.setGlobalState(B.clippingPlanes, h.state.camera)) : h = null, E.pop(), E.length > 0 ? p = E[E.length - 1] : p = null;
    };
    function $s(C, L, G, V) {
      if (C.visible === !1) return;
      if (C.layers.test(L.layers)) {
        if (C.isGroup)
          G = C.renderOrder;
        else if (C.isLOD)
          C.autoUpdate === !0 && C.update(L);
        else if (C.isLight)
          h.pushLight(C), C.castShadow && h.pushShadow(C);
        else if (C.isSprite) {
          if (!C.frustumCulled || W.intersectsSprite(C)) {
            V && Le.setFromMatrixPosition(C.matrixWorld).applyMatrix4(xe);
            const he = X.update(C), me = C.material;
            me.visible && p.push(C, he, me, G, Le.z, null);
          }
        } else if ((C.isMesh || C.isLine || C.isPoints) && (!C.frustumCulled || W.intersectsObject(C))) {
          const he = X.update(C), me = C.material;
          if (V && (C.boundingSphere !== void 0 ? (C.boundingSphere === null && C.computeBoundingSphere(), Le.copy(C.boundingSphere.center)) : (he.boundingSphere === null && he.computeBoundingSphere(), Le.copy(he.boundingSphere.center)), Le.applyMatrix4(C.matrixWorld).applyMatrix4(xe)), Array.isArray(me)) {
            const we = he.groups;
            for (let Qe = 0, Ie = we.length; Qe < Ie; Qe++) {
              const Ue = we[Qe], ze = me[Ue.materialIndex];
              ze && ze.visible && p.push(C, he, ze, G, Le.z, Ue);
            }
          } else me.visible && p.push(C, he, me, G, Le.z, null);
        }
      }
      const Ae = C.children;
      for (let he = 0, me = Ae.length; he < me; he++)
        $s(Ae[he], L, G, V);
    }
    function Nl(C, L, G, V) {
      const D = C.opaque, Ae = C.transmissive, he = C.transparent;
      h.setupLightsView(G), ee === !0 && te.setGlobalState(B.clippingPlanes, G), V && Ee.viewport(b.copy(V)), D.length > 0 && cr(D, L, G), Ae.length > 0 && cr(Ae, L, G), he.length > 0 && cr(he, L, G), Ee.buffers.depth.setTest(!0), Ee.buffers.depth.setMask(!0), Ee.buffers.color.setMask(!0), Ee.setPolygonOffset(!1);
    }
    function Ol(C, L, G, V) {
      if ((G.isScene === !0 ? G.overrideMaterial : null) !== null)
        return;
      h.state.transmissionRenderTarget[V.id] === void 0 && (h.state.transmissionRenderTarget[V.id] = new In(1, 1, {
        generateMipmaps: !0,
        type: Se.has("EXT_color_buffer_half_float") || Se.has("EXT_color_buffer_float") ? nr : Gt,
        minFilter: Mn,
        samples: 4,
        stencilBuffer: r,
        resolveDepthBuffer: !1,
        resolveStencilBuffer: !1,
        colorSpace: Xe.workingColorSpace
      }));
      const Ae = h.state.transmissionRenderTarget[V.id], he = V.viewport || b;
      Ae.setSize(he.z * B.transmissionResolutionScale, he.w * B.transmissionResolutionScale);
      const me = B.getRenderTarget();
      B.setRenderTarget(Ae), B.getClearColor(N), Y = B.getClearAlpha(), Y < 1 && B.setClearColor(16777215, 0.5), B.clear(), Oe && $.render(G);
      const we = B.toneMapping;
      B.toneMapping = sn;
      const Qe = V.viewport;
      if (V.viewport !== void 0 && (V.viewport = void 0), h.setupLightsView(V), ee === !0 && te.setGlobalState(B.clippingPlanes, V), cr(C, G, V), y.updateMultisampleRenderTarget(Ae), y.updateRenderTargetMipmap(Ae), Se.has("WEBGL_multisampled_render_to_texture") === !1) {
        let Ie = !1;
        for (let Ue = 0, ze = L.length; Ue < ze; Ue++) {
          const qe = L[Ue], BA = qe.object, fA = qe.geometry, We = qe.material, ye = qe.group;
          if (We.side === gt && BA.layers.test(V.layers)) {
            const MA = We.side;
            We.side = zA, We.needsUpdate = !0, Gl(BA, G, V, fA, We, ye), We.side = MA, We.needsUpdate = !0, Ie = !0;
          }
        }
        Ie === !0 && (y.updateMultisampleRenderTarget(Ae), y.updateRenderTargetMipmap(Ae));
      }
      B.setRenderTarget(me), B.setClearColor(N, Y), Qe !== void 0 && (V.viewport = Qe), B.toneMapping = we;
    }
    function cr(C, L, G) {
      const V = L.isScene === !0 ? L.overrideMaterial : null;
      for (let D = 0, Ae = C.length; D < Ae; D++) {
        const he = C[D], me = he.object, we = he.geometry, Qe = V === null ? he.material : V, Ie = he.group;
        me.layers.test(G.layers) && Gl(me, L, G, we, Qe, Ie);
      }
    }
    function Gl(C, L, G, V, D, Ae) {
      C.onBeforeRender(B, L, G, V, D, Ae), C.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse, C.matrixWorld), C.normalMatrix.getNormalMatrix(C.modelViewMatrix), D.onBeforeRender(B, L, G, V, C, Ae), D.transparent === !0 && D.side === gt && D.forceSinglePass === !1 ? (D.side = zA, D.needsUpdate = !0, B.renderBufferDirect(G, L, V, D, C, Ae), D.side = ln, D.needsUpdate = !0, B.renderBufferDirect(G, L, V, D, C, Ae), D.side = gt) : B.renderBufferDirect(G, L, V, D, C, Ae), C.onAfterRender(B, L, G, V, D, Ae);
    }
    function ur(C, L, G) {
      L.isScene !== !0 && (L = sA);
      const V = Ce.get(C), D = h.state.lights, Ae = h.state.shadowsArray, he = D.state.version, me = ve.getParameters(C, D.state, Ae, L, G), we = ve.getProgramCacheKey(me);
      let Qe = V.programs;
      V.environment = C.isMeshStandardMaterial ? L.environment : null, V.fog = L.fog, V.envMap = (C.isMeshStandardMaterial ? P : w).get(C.envMap || V.environment), V.envMapRotation = V.environment !== null && C.envMap === null ? L.environmentRotation : C.envMapRotation, Qe === void 0 && (C.addEventListener("dispose", De), Qe = /* @__PURE__ */ new Map(), V.programs = Qe);
      let Ie = Qe.get(we);
      if (Ie !== void 0) {
        if (V.currentProgram === Ie && V.lightsStateVersion === he)
          return kl(C, me), Ie;
      } else
        me.uniforms = ve.getUniforms(C), C.onBeforeCompile(me, B), Ie = ve.acquireProgram(me, we), Qe.set(we, Ie), V.uniforms = me.uniforms;
      const Ue = V.uniforms;
      return (!C.isShaderMaterial && !C.isRawShaderMaterial || C.clipping === !0) && (Ue.clippingPlanes = te.uniform), kl(C, me), V.needsLights = kf(C), V.lightsStateVersion = he, V.needsLights && (Ue.ambientLightColor.value = D.state.ambient, Ue.lightProbe.value = D.state.probe, Ue.directionalLights.value = D.state.directional, Ue.directionalLightShadows.value = D.state.directionalShadow, Ue.spotLights.value = D.state.spot, Ue.spotLightShadows.value = D.state.spotShadow, Ue.rectAreaLights.value = D.state.rectArea, Ue.ltc_1.value = D.state.rectAreaLTC1, Ue.ltc_2.value = D.state.rectAreaLTC2, Ue.pointLights.value = D.state.point, Ue.pointLightShadows.value = D.state.pointShadow, Ue.hemisphereLights.value = D.state.hemi, Ue.directionalShadowMap.value = D.state.directionalShadowMap, Ue.directionalShadowMatrix.value = D.state.directionalShadowMatrix, Ue.spotShadowMap.value = D.state.spotShadowMap, Ue.spotLightMatrix.value = D.state.spotLightMatrix, Ue.spotLightMap.value = D.state.spotLightMap, Ue.pointShadowMap.value = D.state.pointShadowMap, Ue.pointShadowMatrix.value = D.state.pointShadowMatrix), V.currentProgram = Ie, V.uniformsList = null, Ie;
    }
    function Vl(C) {
      if (C.uniformsList === null) {
        const L = C.currentProgram.getUniforms();
        C.uniformsList = Bs.seqWithValue(L.seq, C.uniforms);
      }
      return C.uniformsList;
    }
    function kl(C, L) {
      const G = Ce.get(C);
      G.outputColorSpace = L.outputColorSpace, G.batching = L.batching, G.batchingColor = L.batchingColor, G.instancing = L.instancing, G.instancingColor = L.instancingColor, G.instancingMorph = L.instancingMorph, G.skinning = L.skinning, G.morphTargets = L.morphTargets, G.morphNormals = L.morphNormals, G.morphColors = L.morphColors, G.morphTargetsCount = L.morphTargetsCount, G.numClippingPlanes = L.numClippingPlanes, G.numIntersection = L.numClipIntersection, G.vertexAlphas = L.vertexAlphas, G.vertexTangents = L.vertexTangents, G.toneMapping = L.toneMapping;
    }
    function Gf(C, L, G, V, D) {
      L.isScene !== !0 && (L = sA), y.resetTextureUnits();
      const Ae = L.fog, he = V.isMeshStandardMaterial ? L.environment : null, me = F === null ? B.outputColorSpace : F.isXRRenderTarget === !0 ? F.texture.colorSpace : Ci, we = (V.isMeshStandardMaterial ? P : w).get(V.envMap || he), Qe = V.vertexColors === !0 && !!G.attributes.color && G.attributes.color.itemSize === 4, Ie = !!G.attributes.tangent && (!!V.normalMap || V.anisotropy > 0), Ue = !!G.morphAttributes.position, ze = !!G.morphAttributes.normal, qe = !!G.morphAttributes.color;
      let BA = sn;
      V.toneMapped && (F === null || F.isXRRenderTarget === !0) && (BA = B.toneMapping);
      const fA = G.morphAttributes.position || G.morphAttributes.normal || G.morphAttributes.color, We = fA !== void 0 ? fA.length : 0, ye = Ce.get(V), MA = h.state.lights;
      if (ee === !0 && (de === !0 || C !== v)) {
        const PA = C === v && V.id === _;
        te.setState(V, C, PA);
      }
      let Ze = !1;
      V.version === ye.__version ? (ye.needsLights && ye.lightsStateVersion !== MA.state.version || ye.outputColorSpace !== me || D.isBatchedMesh && ye.batching === !1 || !D.isBatchedMesh && ye.batching === !0 || D.isBatchedMesh && ye.batchingColor === !0 && D.colorTexture === null || D.isBatchedMesh && ye.batchingColor === !1 && D.colorTexture !== null || D.isInstancedMesh && ye.instancing === !1 || !D.isInstancedMesh && ye.instancing === !0 || D.isSkinnedMesh && ye.skinning === !1 || !D.isSkinnedMesh && ye.skinning === !0 || D.isInstancedMesh && ye.instancingColor === !0 && D.instanceColor === null || D.isInstancedMesh && ye.instancingColor === !1 && D.instanceColor !== null || D.isInstancedMesh && ye.instancingMorph === !0 && D.morphTexture === null || D.isInstancedMesh && ye.instancingMorph === !1 && D.morphTexture !== null || ye.envMap !== we || V.fog === !0 && ye.fog !== Ae || ye.numClippingPlanes !== void 0 && (ye.numClippingPlanes !== te.numPlanes || ye.numIntersection !== te.numIntersection) || ye.vertexAlphas !== Qe || ye.vertexTangents !== Ie || ye.morphTargets !== Ue || ye.morphNormals !== ze || ye.morphColors !== qe || ye.toneMapping !== BA || ye.morphTargetsCount !== We) && (Ze = !0) : (Ze = !0, ye.__version = V.version);
      let ut = ye.currentProgram;
      Ze === !0 && (ut = ur(V, L, D));
      let Hn = !1, YA = !1, Si = !1;
      const lA = ut.getUniforms(), et = ye.uniforms;
      if (Ee.useProgram(ut.program) && (Hn = !0, YA = !0, Si = !0), V.id !== _ && (_ = V.id, YA = !0), Hn || v !== C) {
        Ee.buffers.depth.getReversed() ? (ie.copy(C.projectionMatrix), op(ie), lp(ie), lA.setValue(T, "projectionMatrix", ie)) : lA.setValue(T, "projectionMatrix", C.projectionMatrix), lA.setValue(T, "viewMatrix", C.matrixWorldInverse);
        const GA = lA.map.cameraPosition;
        GA !== void 0 && GA.setValue(T, Te.setFromMatrixPosition(C.matrixWorld)), Ge.logarithmicDepthBuffer && lA.setValue(
          T,
          "logDepthBufFC",
          2 / (Math.log(C.far + 1) / Math.LN2)
        ), (V.isMeshPhongMaterial || V.isMeshToonMaterial || V.isMeshLambertMaterial || V.isMeshBasicMaterial || V.isMeshStandardMaterial || V.isShaderMaterial) && lA.setValue(T, "isOrthographic", C.isOrthographicCamera === !0), v !== C && (v = C, YA = !0, Si = !0);
      }
      if (D.isSkinnedMesh) {
        lA.setOptional(T, D, "bindMatrix"), lA.setOptional(T, D, "bindMatrixInverse");
        const PA = D.skeleton;
        PA && (PA.boneTexture === null && PA.computeBoneTexture(), lA.setValue(T, "boneTexture", PA.boneTexture, y));
      }
      D.isBatchedMesh && (lA.setOptional(T, D, "batchingTexture"), lA.setValue(T, "batchingTexture", D._matricesTexture, y), lA.setOptional(T, D, "batchingIdTexture"), lA.setValue(T, "batchingIdTexture", D._indirectTexture, y), lA.setOptional(T, D, "batchingColorTexture"), D._colorsTexture !== null && lA.setValue(T, "batchingColorTexture", D._colorsTexture, y));
      const At = G.morphAttributes;
      if ((At.position !== void 0 || At.normal !== void 0 || At.color !== void 0) && _e.update(D, G, ut), (YA || ye.receiveShadow !== D.receiveShadow) && (ye.receiveShadow = D.receiveShadow, lA.setValue(T, "receiveShadow", D.receiveShadow)), V.isMeshGouraudMaterial && V.envMap !== null && (et.envMap.value = we, et.flipEnvMap.value = we.isCubeTexture && we.isRenderTargetTexture === !1 ? -1 : 1), V.isMeshStandardMaterial && V.envMap === null && L.environment !== null && (et.envMapIntensity.value = L.environmentIntensity), YA && (lA.setValue(T, "toneMappingExposure", B.toneMappingExposure), ye.needsLights && Vf(et, Si), Ae && V.fog === !0 && ae.refreshFogUniforms(et, Ae), ae.refreshMaterialUniforms(et, V, K, Z, h.state.transmissionRenderTarget[C.id]), Bs.upload(T, Vl(ye), et, y)), V.isShaderMaterial && V.uniformsNeedUpdate === !0 && (Bs.upload(T, Vl(ye), et, y), V.uniformsNeedUpdate = !1), V.isSpriteMaterial && lA.setValue(T, "center", D.center), lA.setValue(T, "modelViewMatrix", D.modelViewMatrix), lA.setValue(T, "normalMatrix", D.normalMatrix), lA.setValue(T, "modelMatrix", D.matrixWorld), V.isShaderMaterial || V.isRawShaderMaterial) {
        const PA = V.uniformsGroups;
        for (let GA = 0, ea = PA.length; GA < ea; GA++) {
          const fn = PA[GA];
          I.update(fn, ut), I.bind(fn, ut);
        }
      }
      return ut;
    }
    function Vf(C, L) {
      C.ambientLightColor.needsUpdate = L, C.lightProbe.needsUpdate = L, C.directionalLights.needsUpdate = L, C.directionalLightShadows.needsUpdate = L, C.pointLights.needsUpdate = L, C.pointLightShadows.needsUpdate = L, C.spotLights.needsUpdate = L, C.spotLightShadows.needsUpdate = L, C.rectAreaLights.needsUpdate = L, C.hemisphereLights.needsUpdate = L;
    }
    function kf(C) {
      return C.isMeshLambertMaterial || C.isMeshToonMaterial || C.isMeshPhongMaterial || C.isMeshStandardMaterial || C.isShadowMaterial || C.isShaderMaterial && C.lights === !0;
    }
    this.getActiveCubeFace = function() {
      return x;
    }, this.getActiveMipmapLevel = function() {
      return M;
    }, this.getRenderTarget = function() {
      return F;
    }, this.setRenderTargetTextures = function(C, L, G) {
      Ce.get(C.texture).__webglTexture = L, Ce.get(C.depthTexture).__webglTexture = G;
      const V = Ce.get(C);
      V.__hasExternalTextures = !0, V.__autoAllocateDepthBuffer = G === void 0, V.__autoAllocateDepthBuffer || Se.has("WEBGL_multisampled_render_to_texture") === !0 && (console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"), V.__useRenderToTexture = !1);
    }, this.setRenderTargetFramebuffer = function(C, L) {
      const G = Ce.get(C);
      G.__webglFramebuffer = L, G.__useDefaultFramebuffer = L === void 0;
    };
    const Kf = T.createFramebuffer();
    this.setRenderTarget = function(C, L = 0, G = 0) {
      F = C, x = L, M = G;
      let V = !0, D = null, Ae = !1, he = !1;
      if (C) {
        const we = Ce.get(C);
        if (we.__useDefaultFramebuffer !== void 0)
          Ee.bindFramebuffer(T.FRAMEBUFFER, null), V = !1;
        else if (we.__webglFramebuffer === void 0)
          y.setupRenderTarget(C);
        else if (we.__hasExternalTextures)
          y.rebindTextures(C, Ce.get(C.texture).__webglTexture, Ce.get(C.depthTexture).__webglTexture);
        else if (C.depthBuffer) {
          const Ue = C.depthTexture;
          if (we.__boundDepthTexture !== Ue) {
            if (Ue !== null && Ce.has(Ue) && (C.width !== Ue.image.width || C.height !== Ue.image.height))
              throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");
            y.setupDepthRenderbuffer(C);
          }
        }
        const Qe = C.texture;
        (Qe.isData3DTexture || Qe.isDataArrayTexture || Qe.isCompressedArrayTexture) && (he = !0);
        const Ie = Ce.get(C).__webglFramebuffer;
        C.isWebGLCubeRenderTarget ? (Array.isArray(Ie[L]) ? D = Ie[L][G] : D = Ie[L], Ae = !0) : C.samples > 0 && y.useMultisampledRTT(C) === !1 ? D = Ce.get(C).__webglMultisampledFramebuffer : Array.isArray(Ie) ? D = Ie[G] : D = Ie, b.copy(C.viewport), H.copy(C.scissor), R = C.scissorTest;
      } else
        b.copy(Be).multiplyScalar(K).floor(), H.copy(Fe).multiplyScalar(K).floor(), R = Re;
      if (G !== 0 && (D = Kf), Ee.bindFramebuffer(T.FRAMEBUFFER, D) && V && Ee.drawBuffers(C, D), Ee.viewport(b), Ee.scissor(H), Ee.setScissorTest(R), Ae) {
        const we = Ce.get(C.texture);
        T.framebufferTexture2D(T.FRAMEBUFFER, T.COLOR_ATTACHMENT0, T.TEXTURE_CUBE_MAP_POSITIVE_X + L, we.__webglTexture, G);
      } else if (he) {
        const we = Ce.get(C.texture), Qe = L;
        T.framebufferTextureLayer(T.FRAMEBUFFER, T.COLOR_ATTACHMENT0, we.__webglTexture, G, Qe);
      } else if (C !== null && G !== 0) {
        const we = Ce.get(C.texture);
        T.framebufferTexture2D(T.FRAMEBUFFER, T.COLOR_ATTACHMENT0, T.TEXTURE_2D, we.__webglTexture, G);
      }
      _ = -1;
    }, this.readRenderTargetPixels = function(C, L, G, V, D, Ae, he) {
      if (!(C && C.isWebGLRenderTarget)) {
        console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        return;
      }
      let me = Ce.get(C).__webglFramebuffer;
      if (C.isWebGLCubeRenderTarget && he !== void 0 && (me = me[he]), me) {
        Ee.bindFramebuffer(T.FRAMEBUFFER, me);
        try {
          const we = C.texture, Qe = we.format, Ie = we.type;
          if (!Ge.textureFormatReadable(Qe)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
            return;
          }
          if (!Ge.textureTypeReadable(Ie)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
            return;
          }
          L >= 0 && L <= C.width - V && G >= 0 && G <= C.height - D && T.readPixels(L, G, V, D, be.convert(Qe), be.convert(Ie), Ae);
        } finally {
          const we = F !== null ? Ce.get(F).__webglFramebuffer : null;
          Ee.bindFramebuffer(T.FRAMEBUFFER, we);
        }
      }
    }, this.readRenderTargetPixelsAsync = async function(C, L, G, V, D, Ae, he) {
      if (!(C && C.isWebGLRenderTarget))
        throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
      let me = Ce.get(C).__webglFramebuffer;
      if (C.isWebGLCubeRenderTarget && he !== void 0 && (me = me[he]), me) {
        const we = C.texture, Qe = we.format, Ie = we.type;
        if (!Ge.textureFormatReadable(Qe))
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
        if (!Ge.textureTypeReadable(Ie))
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
        if (L >= 0 && L <= C.width - V && G >= 0 && G <= C.height - D) {
          Ee.bindFramebuffer(T.FRAMEBUFFER, me);
          const Ue = T.createBuffer();
          T.bindBuffer(T.PIXEL_PACK_BUFFER, Ue), T.bufferData(T.PIXEL_PACK_BUFFER, Ae.byteLength, T.STREAM_READ), T.readPixels(L, G, V, D, be.convert(Qe), be.convert(Ie), 0);
          const ze = F !== null ? Ce.get(F).__webglFramebuffer : null;
          Ee.bindFramebuffer(T.FRAMEBUFFER, ze);
          const qe = T.fenceSync(T.SYNC_GPU_COMMANDS_COMPLETE, 0);
          return T.flush(), await ap(T, qe, 4), T.bindBuffer(T.PIXEL_PACK_BUFFER, Ue), T.getBufferSubData(T.PIXEL_PACK_BUFFER, 0, Ae), T.deleteBuffer(Ue), T.deleteSync(qe), Ae;
        } else
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
      }
    }, this.copyFramebufferToTexture = function(C, L = null, G = 0) {
      C.isTexture !== !0 && (ri("WebGLRenderer: copyFramebufferToTexture function signature has changed."), L = arguments[0] || null, C = arguments[1]);
      const V = Math.pow(2, -G), D = Math.floor(C.image.width * V), Ae = Math.floor(C.image.height * V), he = L !== null ? L.x : 0, me = L !== null ? L.y : 0;
      y.setTexture2D(C, 0), T.copyTexSubImage2D(T.TEXTURE_2D, G, 0, 0, he, me, D, Ae), Ee.unbindTexture();
    };
    const zf = T.createFramebuffer(), Wf = T.createFramebuffer();
    this.copyTextureToTexture = function(C, L, G = null, V = null, D = 0, Ae = null) {
      C.isTexture !== !0 && (ri("WebGLRenderer: copyTextureToTexture function signature has changed."), V = arguments[0] || null, C = arguments[1], L = arguments[2], Ae = arguments[3] || 0, G = null), Ae === null && (D !== 0 ? (ri("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."), Ae = D, D = 0) : Ae = 0);
      let he, me, we, Qe, Ie, Ue, ze, qe, BA;
      const fA = C.isCompressedTexture ? C.mipmaps[Ae] : C.image;
      if (G !== null)
        he = G.max.x - G.min.x, me = G.max.y - G.min.y, we = G.isBox3 ? G.max.z - G.min.z : 1, Qe = G.min.x, Ie = G.min.y, Ue = G.isBox3 ? G.min.z : 0;
      else {
        const At = Math.pow(2, -D);
        he = Math.floor(fA.width * At), me = Math.floor(fA.height * At), C.isDataArrayTexture ? we = fA.depth : C.isData3DTexture ? we = Math.floor(fA.depth * At) : we = 1, Qe = 0, Ie = 0, Ue = 0;
      }
      V !== null ? (ze = V.x, qe = V.y, BA = V.z) : (ze = 0, qe = 0, BA = 0);
      const We = be.convert(L.format), ye = be.convert(L.type);
      let MA;
      L.isData3DTexture ? (y.setTexture3D(L, 0), MA = T.TEXTURE_3D) : L.isDataArrayTexture || L.isCompressedArrayTexture ? (y.setTexture2DArray(L, 0), MA = T.TEXTURE_2D_ARRAY) : (y.setTexture2D(L, 0), MA = T.TEXTURE_2D), T.pixelStorei(T.UNPACK_FLIP_Y_WEBGL, L.flipY), T.pixelStorei(T.UNPACK_PREMULTIPLY_ALPHA_WEBGL, L.premultiplyAlpha), T.pixelStorei(T.UNPACK_ALIGNMENT, L.unpackAlignment);
      const Ze = T.getParameter(T.UNPACK_ROW_LENGTH), ut = T.getParameter(T.UNPACK_IMAGE_HEIGHT), Hn = T.getParameter(T.UNPACK_SKIP_PIXELS), YA = T.getParameter(T.UNPACK_SKIP_ROWS), Si = T.getParameter(T.UNPACK_SKIP_IMAGES);
      T.pixelStorei(T.UNPACK_ROW_LENGTH, fA.width), T.pixelStorei(T.UNPACK_IMAGE_HEIGHT, fA.height), T.pixelStorei(T.UNPACK_SKIP_PIXELS, Qe), T.pixelStorei(T.UNPACK_SKIP_ROWS, Ie), T.pixelStorei(T.UNPACK_SKIP_IMAGES, Ue);
      const lA = C.isDataArrayTexture || C.isData3DTexture, et = L.isDataArrayTexture || L.isData3DTexture;
      if (C.isDepthTexture) {
        const At = Ce.get(C), PA = Ce.get(L), GA = Ce.get(At.__renderTarget), ea = Ce.get(PA.__renderTarget);
        Ee.bindFramebuffer(T.READ_FRAMEBUFFER, GA.__webglFramebuffer), Ee.bindFramebuffer(T.DRAW_FRAMEBUFFER, ea.__webglFramebuffer);
        for (let fn = 0; fn < we; fn++)
          lA && (T.framebufferTextureLayer(T.READ_FRAMEBUFFER, T.COLOR_ATTACHMENT0, Ce.get(C).__webglTexture, D, Ue + fn), T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER, T.COLOR_ATTACHMENT0, Ce.get(L).__webglTexture, Ae, BA + fn)), T.blitFramebuffer(Qe, Ie, he, me, ze, qe, he, me, T.DEPTH_BUFFER_BIT, T.NEAREST);
        Ee.bindFramebuffer(T.READ_FRAMEBUFFER, null), Ee.bindFramebuffer(T.DRAW_FRAMEBUFFER, null);
      } else if (D !== 0 || C.isRenderTargetTexture || Ce.has(C)) {
        const At = Ce.get(C), PA = Ce.get(L);
        Ee.bindFramebuffer(T.READ_FRAMEBUFFER, zf), Ee.bindFramebuffer(T.DRAW_FRAMEBUFFER, Wf);
        for (let GA = 0; GA < we; GA++)
          lA ? T.framebufferTextureLayer(T.READ_FRAMEBUFFER, T.COLOR_ATTACHMENT0, At.__webglTexture, D, Ue + GA) : T.framebufferTexture2D(T.READ_FRAMEBUFFER, T.COLOR_ATTACHMENT0, T.TEXTURE_2D, At.__webglTexture, D), et ? T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER, T.COLOR_ATTACHMENT0, PA.__webglTexture, Ae, BA + GA) : T.framebufferTexture2D(T.DRAW_FRAMEBUFFER, T.COLOR_ATTACHMENT0, T.TEXTURE_2D, PA.__webglTexture, Ae), D !== 0 ? T.blitFramebuffer(Qe, Ie, he, me, ze, qe, he, me, T.COLOR_BUFFER_BIT, T.NEAREST) : et ? T.copyTexSubImage3D(MA, Ae, ze, qe, BA + GA, Qe, Ie, he, me) : T.copyTexSubImage2D(MA, Ae, ze, qe, Qe, Ie, he, me);
        Ee.bindFramebuffer(T.READ_FRAMEBUFFER, null), Ee.bindFramebuffer(T.DRAW_FRAMEBUFFER, null);
      } else
        et ? C.isDataTexture || C.isData3DTexture ? T.texSubImage3D(MA, Ae, ze, qe, BA, he, me, we, We, ye, fA.data) : L.isCompressedArrayTexture ? T.compressedTexSubImage3D(MA, Ae, ze, qe, BA, he, me, we, We, fA.data) : T.texSubImage3D(MA, Ae, ze, qe, BA, he, me, we, We, ye, fA) : C.isDataTexture ? T.texSubImage2D(T.TEXTURE_2D, Ae, ze, qe, he, me, We, ye, fA.data) : C.isCompressedTexture ? T.compressedTexSubImage2D(T.TEXTURE_2D, Ae, ze, qe, fA.width, fA.height, We, fA.data) : T.texSubImage2D(T.TEXTURE_2D, Ae, ze, qe, he, me, We, ye, fA);
      T.pixelStorei(T.UNPACK_ROW_LENGTH, Ze), T.pixelStorei(T.UNPACK_IMAGE_HEIGHT, ut), T.pixelStorei(T.UNPACK_SKIP_PIXELS, Hn), T.pixelStorei(T.UNPACK_SKIP_ROWS, YA), T.pixelStorei(T.UNPACK_SKIP_IMAGES, Si), Ae === 0 && L.generateMipmaps && T.generateMipmap(MA), Ee.unbindTexture();
    }, this.copyTextureToTexture3D = function(C, L, G = null, V = null, D = 0) {
      return C.isTexture !== !0 && (ri("WebGLRenderer: copyTextureToTexture3D function signature has changed."), G = arguments[0] || null, V = arguments[1] || null, C = arguments[2], L = arguments[3], D = arguments[4] || 0), ri('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'), this.copyTextureToTexture(C, L, G, V, D);
    }, this.initRenderTarget = function(C) {
      Ce.get(C).__webglFramebuffer === void 0 && y.setupRenderTarget(C);
    }, this.initTexture = function(C) {
      C.isCubeTexture ? y.setTextureCube(C, 0) : C.isData3DTexture ? y.setTexture3D(C, 0) : C.isDataArrayTexture || C.isCompressedArrayTexture ? y.setTexture2DArray(C, 0) : y.setTexture2D(C, 0), Ee.unbindTexture();
    }, this.resetState = function() {
      x = 0, M = 0, F = null, Ee.reset(), Je.reset();
    }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  get coordinateSystem() {
    return Pt;
  }
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(e) {
    this._outputColorSpace = e;
    const A = this.getContext();
    A.drawingBufferColorspace = Xe._getDrawingBufferColorSpace(e), A.unpackColorSpace = Xe._getUnpackColorSpace();
  }
}
const Xc = { type: "change" }, Fl = { type: "start" }, Dh = { type: "end" }, Gr = new Gs(), Yc = new jt(), Mw = Math.cos(70 * rp.DEG2RAD), vA = new Q(), kA = 2 * Math.PI, nA = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  TOUCH_ROTATE: 3,
  TOUCH_PAN: 4,
  TOUCH_DOLLY_PAN: 5,
  TOUCH_DOLLY_ROTATE: 6
}, Ia = 1e-6;
class Fw extends Kp {
  constructor(e, A = null) {
    super(e, A), this.state = nA.NONE, this.enabled = !0, this.target = new Q(), this.cursor = new Q(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.keyRotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: ui.ROTATE, MIDDLE: ui.DOLLY, RIGHT: ui.PAN }, this.touches = { ONE: oi.ROTATE, TWO: oi.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this._lastPosition = new Q(), this._lastQuaternion = new Rn(), this._lastTargetPosition = new Q(), this._quat = new Rn().setFromUnitVectors(e.up, new Q(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new _c(), this._sphericalDelta = new _c(), this._scale = 1, this._panOffset = new Q(), this._rotateStart = new Pe(), this._rotateEnd = new Pe(), this._rotateDelta = new Pe(), this._panStart = new Pe(), this._panEnd = new Pe(), this._panDelta = new Pe(), this._dollyStart = new Pe(), this._dollyEnd = new Pe(), this._dollyDelta = new Pe(), this._dollyDirection = new Q(), this._mouse = new Pe(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = Tw.bind(this), this._onPointerDown = bw.bind(this), this._onPointerUp = Qw.bind(this), this._onContextMenu = Nw.bind(this), this._onMouseWheel = Lw.bind(this), this._onKeyDown = Dw.bind(this), this._onTouchStart = Hw.bind(this), this._onTouchMove = Pw.bind(this), this._onMouseDown = Iw.bind(this), this._onMouseMove = Rw.bind(this), this._interceptControlDown = Ow.bind(this), this._interceptControlUp = Gw.bind(this), this.domElement !== null && this.connect(), this.update();
  }
  connect() {
    this.domElement.addEventListener("pointerdown", this._onPointerDown), this.domElement.addEventListener("pointercancel", this._onPointerUp), this.domElement.addEventListener("contextmenu", this._onContextMenu), this.domElement.addEventListener("wheel", this._onMouseWheel, { passive: !1 }), this.domElement.getRootNode().addEventListener("keydown", this._interceptControlDown, { passive: !0, capture: !0 }), this.domElement.style.touchAction = "none";
  }
  disconnect() {
    this.domElement.removeEventListener("pointerdown", this._onPointerDown), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.domElement.removeEventListener("pointercancel", this._onPointerUp), this.domElement.removeEventListener("wheel", this._onMouseWheel), this.domElement.removeEventListener("contextmenu", this._onContextMenu), this.stopListenToKeyEvents(), this.domElement.getRootNode().removeEventListener("keydown", this._interceptControlDown, { capture: !0 }), this.domElement.style.touchAction = "auto";
  }
  dispose() {
    this.disconnect();
  }
  getPolarAngle() {
    return this._spherical.phi;
  }
  getAzimuthalAngle() {
    return this._spherical.theta;
  }
  getDistance() {
    return this.object.position.distanceTo(this.target);
  }
  listenToKeyEvents(e) {
    e.addEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = e;
  }
  stopListenToKeyEvents() {
    this._domElementKeyEvents !== null && (this._domElementKeyEvents.removeEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = null);
  }
  saveState() {
    this.target0.copy(this.target), this.position0.copy(this.object.position), this.zoom0 = this.object.zoom;
  }
  reset() {
    this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(Xc), this.update(), this.state = nA.NONE;
  }
  update(e = null) {
    const A = this.object.position;
    vA.copy(A).sub(this.target), vA.applyQuaternion(this._quat), this._spherical.setFromVector3(vA), this.autoRotate && this.state === nA.NONE && this._rotateLeft(this._getAutoRotationAngle(e)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
    let t = this.minAzimuthAngle, i = this.maxAzimuthAngle;
    isFinite(t) && isFinite(i) && (t < -Math.PI ? t += kA : t > Math.PI && (t -= kA), i < -Math.PI ? i += kA : i > Math.PI && (i -= kA), t <= i ? this._spherical.theta = Math.max(t, Math.min(i, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (t + i) / 2 ? Math.max(t, this._spherical.theta) : Math.min(i, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
    let r = !1;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera)
      this._spherical.radius = this._clampDistance(this._spherical.radius);
    else {
      const s = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), r = s != this._spherical.radius;
    }
    if (vA.setFromSpherical(this._spherical), vA.applyQuaternion(this._quatInverse), A.copy(this.target).add(vA), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
      let s = null;
      if (this.object.isPerspectiveCamera) {
        const a = vA.length();
        s = this._clampDistance(a * this._scale);
        const o = a - s;
        this.object.position.addScaledVector(this._dollyDirection, o), this.object.updateMatrixWorld(), r = !!o;
      } else if (this.object.isOrthographicCamera) {
        const a = new Q(this._mouse.x, this._mouse.y, 0);
        a.unproject(this.object);
        const o = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), r = o !== this.object.zoom;
        const l = new Q(this._mouse.x, this._mouse.y, 0);
        l.unproject(this.object), this.object.position.sub(l).add(a), this.object.updateMatrixWorld(), s = vA.length();
      } else
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
      s !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(s).add(this.object.position) : (Gr.origin.copy(this.object.position), Gr.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(Gr.direction)) < Mw ? this.object.lookAt(this.target) : (Yc.setFromNormalAndCoplanarPoint(this.object.up, this.target), Gr.intersectPlane(Yc, this.target))));
    } else if (this.object.isOrthographicCamera) {
      const s = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), s !== this.object.zoom && (this.object.updateProjectionMatrix(), r = !0);
    }
    return this._scale = 1, this._performCursorZoom = !1, r || this._lastPosition.distanceToSquared(this.object.position) > Ia || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > Ia || this._lastTargetPosition.distanceToSquared(this.target) > Ia ? (this.dispatchEvent(Xc), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
  }
  _getAutoRotationAngle(e) {
    return e !== null ? kA / 60 * this.autoRotateSpeed * e : kA / 60 / 60 * this.autoRotateSpeed;
  }
  _getZoomScale(e) {
    const A = Math.abs(e * 0.01);
    return Math.pow(0.95, this.zoomSpeed * A);
  }
  _rotateLeft(e) {
    this._sphericalDelta.theta -= e;
  }
  _rotateUp(e) {
    this._sphericalDelta.phi -= e;
  }
  _panLeft(e, A) {
    vA.setFromMatrixColumn(A, 0), vA.multiplyScalar(-e), this._panOffset.add(vA);
  }
  _panUp(e, A) {
    this.screenSpacePanning === !0 ? vA.setFromMatrixColumn(A, 1) : (vA.setFromMatrixColumn(A, 0), vA.crossVectors(this.object.up, vA)), vA.multiplyScalar(e), this._panOffset.add(vA);
  }
  // deltaX and deltaY are in pixels; right and down are positive
  _pan(e, A) {
    const t = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const i = this.object.position;
      vA.copy(i).sub(this.target);
      let r = vA.length();
      r *= Math.tan(this.object.fov / 2 * Math.PI / 180), this._panLeft(2 * e * r / t.clientHeight, this.object.matrix), this._panUp(2 * A * r / t.clientHeight, this.object.matrix);
    } else this.object.isOrthographicCamera ? (this._panLeft(e * (this.object.right - this.object.left) / this.object.zoom / t.clientWidth, this.object.matrix), this._panUp(A * (this.object.top - this.object.bottom) / this.object.zoom / t.clientHeight, this.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), this.enablePan = !1);
  }
  _dollyOut(e) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale /= e : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
  }
  _dollyIn(e) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale *= e : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
  }
  _updateZoomParameters(e, A) {
    if (!this.zoomToCursor)
      return;
    this._performCursorZoom = !0;
    const t = this.domElement.getBoundingClientRect(), i = e - t.left, r = A - t.top, s = t.width, a = t.height;
    this._mouse.x = i / s * 2 - 1, this._mouse.y = -(r / a) * 2 + 1, this._dollyDirection.set(this._mouse.x, this._mouse.y, 1).unproject(this.object).sub(this.object.position).normalize();
  }
  _clampDistance(e) {
    return Math.max(this.minDistance, Math.min(this.maxDistance, e));
  }
  //
  // event callbacks - update the object state
  //
  _handleMouseDownRotate(e) {
    this._rotateStart.set(e.clientX, e.clientY);
  }
  _handleMouseDownDolly(e) {
    this._updateZoomParameters(e.clientX, e.clientX), this._dollyStart.set(e.clientX, e.clientY);
  }
  _handleMouseDownPan(e) {
    this._panStart.set(e.clientX, e.clientY);
  }
  _handleMouseMoveRotate(e) {
    this._rotateEnd.set(e.clientX, e.clientY), this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const A = this.domElement;
    this._rotateLeft(kA * this._rotateDelta.x / A.clientHeight), this._rotateUp(kA * this._rotateDelta.y / A.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
  }
  _handleMouseMoveDolly(e) {
    this._dollyEnd.set(e.clientX, e.clientY), this._dollyDelta.subVectors(this._dollyEnd, this._dollyStart), this._dollyDelta.y > 0 ? this._dollyOut(this._getZoomScale(this._dollyDelta.y)) : this._dollyDelta.y < 0 && this._dollyIn(this._getZoomScale(this._dollyDelta.y)), this._dollyStart.copy(this._dollyEnd), this.update();
  }
  _handleMouseMovePan(e) {
    this._panEnd.set(e.clientX, e.clientY), this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd), this.update();
  }
  _handleMouseWheel(e) {
    this._updateZoomParameters(e.clientX, e.clientY), e.deltaY < 0 ? this._dollyIn(this._getZoomScale(e.deltaY)) : e.deltaY > 0 && this._dollyOut(this._getZoomScale(e.deltaY)), this.update();
  }
  _handleKeyDown(e) {
    let A = !1;
    switch (e.code) {
      case this.keys.UP:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(kA * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, this.keyPanSpeed), A = !0;
        break;
      case this.keys.BOTTOM:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(-kA * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, -this.keyPanSpeed), A = !0;
        break;
      case this.keys.LEFT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(kA * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(this.keyPanSpeed, 0), A = !0;
        break;
      case this.keys.RIGHT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(-kA * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(-this.keyPanSpeed, 0), A = !0;
        break;
    }
    A && (e.preventDefault(), this.update());
  }
  _handleTouchStartRotate(e) {
    if (this._pointers.length === 1)
      this._rotateStart.set(e.pageX, e.pageY);
    else {
      const A = this._getSecondPointerPosition(e), t = 0.5 * (e.pageX + A.x), i = 0.5 * (e.pageY + A.y);
      this._rotateStart.set(t, i);
    }
  }
  _handleTouchStartPan(e) {
    if (this._pointers.length === 1)
      this._panStart.set(e.pageX, e.pageY);
    else {
      const A = this._getSecondPointerPosition(e), t = 0.5 * (e.pageX + A.x), i = 0.5 * (e.pageY + A.y);
      this._panStart.set(t, i);
    }
  }
  _handleTouchStartDolly(e) {
    const A = this._getSecondPointerPosition(e), t = e.pageX - A.x, i = e.pageY - A.y, r = Math.sqrt(t * t + i * i);
    this._dollyStart.set(0, r);
  }
  _handleTouchStartDollyPan(e) {
    this.enableZoom && this._handleTouchStartDolly(e), this.enablePan && this._handleTouchStartPan(e);
  }
  _handleTouchStartDollyRotate(e) {
    this.enableZoom && this._handleTouchStartDolly(e), this.enableRotate && this._handleTouchStartRotate(e);
  }
  _handleTouchMoveRotate(e) {
    if (this._pointers.length == 1)
      this._rotateEnd.set(e.pageX, e.pageY);
    else {
      const t = this._getSecondPointerPosition(e), i = 0.5 * (e.pageX + t.x), r = 0.5 * (e.pageY + t.y);
      this._rotateEnd.set(i, r);
    }
    this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const A = this.domElement;
    this._rotateLeft(kA * this._rotateDelta.x / A.clientHeight), this._rotateUp(kA * this._rotateDelta.y / A.clientHeight), this._rotateStart.copy(this._rotateEnd);
  }
  _handleTouchMovePan(e) {
    if (this._pointers.length === 1)
      this._panEnd.set(e.pageX, e.pageY);
    else {
      const A = this._getSecondPointerPosition(e), t = 0.5 * (e.pageX + A.x), i = 0.5 * (e.pageY + A.y);
      this._panEnd.set(t, i);
    }
    this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd);
  }
  _handleTouchMoveDolly(e) {
    const A = this._getSecondPointerPosition(e), t = e.pageX - A.x, i = e.pageY - A.y, r = Math.sqrt(t * t + i * i);
    this._dollyEnd.set(0, r), this._dollyDelta.set(0, Math.pow(this._dollyEnd.y / this._dollyStart.y, this.zoomSpeed)), this._dollyOut(this._dollyDelta.y), this._dollyStart.copy(this._dollyEnd);
    const s = (e.pageX + A.x) * 0.5, a = (e.pageY + A.y) * 0.5;
    this._updateZoomParameters(s, a);
  }
  _handleTouchMoveDollyPan(e) {
    this.enableZoom && this._handleTouchMoveDolly(e), this.enablePan && this._handleTouchMovePan(e);
  }
  _handleTouchMoveDollyRotate(e) {
    this.enableZoom && this._handleTouchMoveDolly(e), this.enableRotate && this._handleTouchMoveRotate(e);
  }
  // pointers
  _addPointer(e) {
    this._pointers.push(e.pointerId);
  }
  _removePointer(e) {
    delete this._pointerPositions[e.pointerId];
    for (let A = 0; A < this._pointers.length; A++)
      if (this._pointers[A] == e.pointerId) {
        this._pointers.splice(A, 1);
        return;
      }
  }
  _isTrackingPointer(e) {
    for (let A = 0; A < this._pointers.length; A++)
      if (this._pointers[A] == e.pointerId) return !0;
    return !1;
  }
  _trackPointer(e) {
    let A = this._pointerPositions[e.pointerId];
    A === void 0 && (A = new Pe(), this._pointerPositions[e.pointerId] = A), A.set(e.pageX, e.pageY);
  }
  _getSecondPointerPosition(e) {
    const A = e.pointerId === this._pointers[0] ? this._pointers[1] : this._pointers[0];
    return this._pointerPositions[A];
  }
  //
  _customWheelEvent(e) {
    const A = e.deltaMode, t = {
      clientX: e.clientX,
      clientY: e.clientY,
      deltaY: e.deltaY
    };
    switch (A) {
      case 1:
        t.deltaY *= 16;
        break;
      case 2:
        t.deltaY *= 100;
        break;
    }
    return e.ctrlKey && !this._controlActive && (t.deltaY *= 10), t;
  }
}
function bw(n) {
  this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(n.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.domElement.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(n) && (this._addPointer(n), n.pointerType === "touch" ? this._onTouchStart(n) : this._onMouseDown(n)));
}
function Tw(n) {
  this.enabled !== !1 && (n.pointerType === "touch" ? this._onTouchMove(n) : this._onMouseMove(n));
}
function Qw(n) {
  switch (this._removePointer(n), this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(n.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(Dh), this.state = nA.NONE;
      break;
    case 1:
      const e = this._pointers[0], A = this._pointerPositions[e];
      this._onTouchStart({ pointerId: e, pageX: A.x, pageY: A.y });
      break;
  }
}
function Iw(n) {
  let e;
  switch (n.button) {
    case 0:
      e = this.mouseButtons.LEFT;
      break;
    case 1:
      e = this.mouseButtons.MIDDLE;
      break;
    case 2:
      e = this.mouseButtons.RIGHT;
      break;
    default:
      e = -1;
  }
  switch (e) {
    case ui.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseDownDolly(n), this.state = nA.DOLLY;
      break;
    case ui.ROTATE:
      if (n.ctrlKey || n.metaKey || n.shiftKey) {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(n), this.state = nA.PAN;
      } else {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(n), this.state = nA.ROTATE;
      }
      break;
    case ui.PAN:
      if (n.ctrlKey || n.metaKey || n.shiftKey) {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(n), this.state = nA.ROTATE;
      } else {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(n), this.state = nA.PAN;
      }
      break;
    default:
      this.state = nA.NONE;
  }
  this.state !== nA.NONE && this.dispatchEvent(Fl);
}
function Rw(n) {
  switch (this.state) {
    case nA.ROTATE:
      if (this.enableRotate === !1) return;
      this._handleMouseMoveRotate(n);
      break;
    case nA.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseMoveDolly(n);
      break;
    case nA.PAN:
      if (this.enablePan === !1) return;
      this._handleMouseMovePan(n);
      break;
  }
}
function Lw(n) {
  this.enabled === !1 || this.enableZoom === !1 || this.state !== nA.NONE || (n.preventDefault(), this.dispatchEvent(Fl), this._handleMouseWheel(this._customWheelEvent(n)), this.dispatchEvent(Dh));
}
function Dw(n) {
  this.enabled !== !1 && this._handleKeyDown(n);
}
function Hw(n) {
  switch (this._trackPointer(n), this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case oi.ROTATE:
          if (this.enableRotate === !1) return;
          this._handleTouchStartRotate(n), this.state = nA.TOUCH_ROTATE;
          break;
        case oi.PAN:
          if (this.enablePan === !1) return;
          this._handleTouchStartPan(n), this.state = nA.TOUCH_PAN;
          break;
        default:
          this.state = nA.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case oi.DOLLY_PAN:
          if (this.enableZoom === !1 && this.enablePan === !1) return;
          this._handleTouchStartDollyPan(n), this.state = nA.TOUCH_DOLLY_PAN;
          break;
        case oi.DOLLY_ROTATE:
          if (this.enableZoom === !1 && this.enableRotate === !1) return;
          this._handleTouchStartDollyRotate(n), this.state = nA.TOUCH_DOLLY_ROTATE;
          break;
        default:
          this.state = nA.NONE;
      }
      break;
    default:
      this.state = nA.NONE;
  }
  this.state !== nA.NONE && this.dispatchEvent(Fl);
}
function Pw(n) {
  switch (this._trackPointer(n), this.state) {
    case nA.TOUCH_ROTATE:
      if (this.enableRotate === !1) return;
      this._handleTouchMoveRotate(n), this.update();
      break;
    case nA.TOUCH_PAN:
      if (this.enablePan === !1) return;
      this._handleTouchMovePan(n), this.update();
      break;
    case nA.TOUCH_DOLLY_PAN:
      if (this.enableZoom === !1 && this.enablePan === !1) return;
      this._handleTouchMoveDollyPan(n), this.update();
      break;
    case nA.TOUCH_DOLLY_ROTATE:
      if (this.enableZoom === !1 && this.enableRotate === !1) return;
      this._handleTouchMoveDollyRotate(n), this.update();
      break;
    default:
      this.state = nA.NONE;
  }
}
function Nw(n) {
  this.enabled !== !1 && n.preventDefault();
}
function Ow(n) {
  n.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
function Gw(n) {
  n.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
class Jc extends TA {
  constructor(e = document.createElement("div")) {
    super(), this.isCSS2DObject = !0, this.element = e, this.element.style.position = "absolute", this.element.style.userSelect = "none", this.element.setAttribute("draggable", !1), this.center = new Pe(0.5, 0.5), this.addEventListener("removed", function() {
      this.traverse(function(A) {
        A.element instanceof A.element.ownerDocument.defaultView.Element && A.element.parentNode !== null && A.element.remove();
      });
    });
  }
  copy(e, A) {
    return super.copy(e, A), this.element = e.element.cloneNode(!0), this.center = e.center, this;
  }
}
const jn = new Q(), qc = new uA(), Zc = new uA(), jc = new Q(), $c = new Q();
class Vw {
  constructor(e = {}) {
    const A = this;
    let t, i, r, s;
    const a = {
      objects: /* @__PURE__ */ new WeakMap()
    }, o = e.element !== void 0 ? e.element : document.createElement("div");
    o.style.overflow = "hidden", this.domElement = o, this.getSize = function() {
      return {
        width: t,
        height: i
      };
    }, this.render = function(g, m) {
      g.matrixWorldAutoUpdate === !0 && g.updateMatrixWorld(), m.parent === null && m.matrixWorldAutoUpdate === !0 && m.updateMatrixWorld(), qc.copy(m.matrixWorldInverse), Zc.multiplyMatrices(m.projectionMatrix, qc), c(g, g, m), d(g);
    }, this.setSize = function(g, m) {
      t = g, i = m, r = t / 2, s = i / 2, o.style.width = g + "px", o.style.height = m + "px";
    };
    function l(g) {
      g.isCSS2DObject && (g.element.style.display = "none");
      for (let m = 0, p = g.children.length; m < p; m++)
        l(g.children[m]);
    }
    function c(g, m, p) {
      if (g.visible === !1) {
        l(g);
        return;
      }
      if (g.isCSS2DObject) {
        jn.setFromMatrixPosition(g.matrixWorld), jn.applyMatrix4(Zc);
        const h = jn.z >= -1 && jn.z <= 1 && g.layers.test(p.layers) === !0, E = g.element;
        E.style.display = h === !0 ? "" : "none", h === !0 && (g.onBeforeRender(A, m, p), E.style.transform = "translate(" + -100 * g.center.x + "%," + -100 * g.center.y + "%)translate(" + (jn.x * r + r) + "px," + (-jn.y * s + s) + "px)", E.parentNode !== o && o.appendChild(E), g.onAfterRender(A, m, p));
        const U = {
          distanceToCameraSquared: u(p, g)
        };
        a.objects.set(g, U);
      }
      for (let h = 0, E = g.children.length; h < E; h++)
        c(g.children[h], m, p);
    }
    function u(g, m) {
      return jc.setFromMatrixPosition(g.matrixWorld), $c.setFromMatrixPosition(m.matrixWorld), jc.distanceToSquared($c);
    }
    function f(g) {
      const m = [];
      return g.traverseVisible(function(p) {
        p.isCSS2DObject && m.push(p);
      }), m;
    }
    function d(g) {
      const m = f(g).sort(function(h, E) {
        if (h.renderOrder !== E.renderOrder)
          return E.renderOrder - h.renderOrder;
        const U = a.objects.get(h).distanceToCameraSquared, B = a.objects.get(E).distanceToCameraSquared;
        return U - B;
      }), p = m.length;
      for (let h = 0, E = m.length; h < E; h++)
        m[h].element.style.zIndex = p - h;
    }
  }
}
const kw = [
  {
    position: [0, 1.62, 0],
    primary: "Geographic Space (GS) ↑",
    secondary: "Down → Up"
  },
  {
    position: [0, -1.62, 0],
    primary: "Geographic Space (GS) ↓",
    secondary: "Up → Down"
  },
  {
    position: [1.82, 0, 0],
    primary: "Communicational Space (CS) →",
    secondary: "Towards Alter Space (AS): Towards non-participants (III person)"
  },
  {
    position: [-1.82, 0, 0],
    primary: "Communicational Space (CS) ←",
    secondary: "Towards Ego Space (ES): Towards participants (speaker/addressee, I/II persons)"
  },
  {
    position: [0, 0, 1.82],
    primary: "Geographic Space (GS)",
    secondary: "Inside → Outside"
  },
  {
    position: [0, 0, -1.82],
    primary: "Geographic Space (GS)",
    secondary: "Outside → Inside"
  }
], Kw = [
  { from: [-1.78, 0, 0], to: [1.78, 0, 0], key: "x" },
  { from: [0, -1.58, 0], to: [0, 1.58, 0], key: "y" },
  { from: [0, 0, -1.78], to: [0, 0, 1.78], key: "z" }
], _t = {
  x: 4553629,
  y: 2976335,
  z: 7291585
}, zw = /* @__PURE__ */ new Set(["a", "cha", "mi", "mo", "she", "ga"]);
function Ww(n, e) {
  if (!e) return null;
  const A = e.entries.find((i) => i.id === n);
  if (!A || A.highlightArrows === void 0) return null;
  const t = A.highlightArrows.filter((i) => zw.has(i));
  return t.length > 0 ? t : null;
}
function Xw(n, e) {
  return n ? Ww(n, e ?? null) : null;
}
const Yw = 0.1, eu = [1, 1, 1], _n = 0.06, vn = 0.09, Vr = 0.58, kr = 0.72, Au = {
  modern_simple: "pd-label--modern-simple",
  modern_complex: "pd-label--modern-complex",
  old_simple: "pd-label--old-simple",
  old_complex: "pd-label--old-complex"
};
class Jw {
  constructor(e, A) {
    eA(this, "scene");
    eA(this, "camera");
    eA(this, "renderer");
    eA(this, "labelRenderer");
    eA(this, "controls");
    eA(this, "container");
    eA(this, "currentTheme", "light");
    eA(this, "pickMeshes", /* @__PURE__ */ new Map());
    eA(this, "labelById", /* @__PURE__ */ new Map());
    eA(this, "raycaster", new kp());
    eA(this, "pointer", new Pe());
    eA(this, "animationId", 0);
    eA(this, "onPick", null);
    eA(this, "defaultCameraPosition", new Q(2.8, 2.2, 3.2));
    eA(this, "defaultTarget", new Q(0, 0, 0));
    eA(this, "axisArrowById", /* @__PURE__ */ new Map());
    eA(this, "axisLines", []);
    eA(this, "cubeEdges", null);
    eA(this, "daPlane", null);
    eA(this, "tsaHintArrow", null);
    /** Faint inner volume so შე-/გა- read as into / out of an enclosure */
    eA(this, "enclosureShell", null);
    /**
     * Inbound “into volume” shaft: starts near the შე- (−Z) face, ends toward the interior.
     * Used whenever `she` is highlighted without `ga` (plain შე-, შემო-, წამო-, etc.).
     */
    eA(this, "sheInboundArrow", null);
    /** გადა-: two Z-axis arrows from center toward −Z / +Z enclosure bounds (outward, bounded) */
    eA(this, "gadaEnclosureArrows", []);
    /** World position of წა- (tsa) label (updated in buildLabels); departure hint starts here */
    eA(this, "tsaHintAnchor", new Q(0.85, 0.15, -0.35));
    /** World position of და- label (updated in buildLabels); horizontal plane is placed just below */
    eA(this, "daPlaneAnchor", new Q(0.2, -0.76, -0.48));
    eA(this, "onPointerDown", (e) => {
      var r, s;
      const A = this.renderer.domElement.getBoundingClientRect();
      this.pointer.x = (e.clientX - A.left) / A.width * 2 - 1, this.pointer.y = -((e.clientY - A.top) / A.height) * 2 + 1, this.raycaster.setFromCamera(this.pointer, this.camera);
      const t = [...this.pickMeshes.values()], i = this.raycaster.intersectObjects(t, !1);
      i.length && i[0].object.userData.preverbId ? (r = this.onPick) == null || r.call(this, i[0].object.userData.preverbId) : (s = this.onPick) == null || s.call(this, null);
    });
    eA(this, "onResize", () => {
      const e = this.container.clientWidth, A = this.container.clientHeight;
      e === 0 || A === 0 || (this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)), this.camera.aspect = e / A, this.camera.updateProjectionMatrix(), this.renderer.setSize(e, A), this.labelRenderer.setSize(e, A));
    });
    eA(this, "loop", () => {
      this.animationId = requestAnimationFrame(this.loop), this.controls.update(), this.renderer.render(this.scene, this.camera), this.labelRenderer.render(this.scene, this.camera);
    });
    this.container = e;
    const t = e.clientWidth || 640, i = e.clientHeight || 480;
    this.scene = new Qp(), this.scene.background = new Ye(16316922), this.camera = new rt(50, t / i, 0.1, 100), this.camera.position.copy(this.defaultCameraPosition), this.renderer = new Sw({ antialias: !0, preserveDrawingBuffer: !0 }), this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)), this.renderer.setSize(t, i), e.appendChild(this.renderer.domElement), this.labelRenderer = new Vw(), this.labelRenderer.setSize(t, i), this.labelRenderer.domElement.className = "pd-label-layer", this.labelRenderer.domElement.style.position = "absolute", this.labelRenderer.domElement.style.top = "0", this.labelRenderer.domElement.style.left = "0", this.labelRenderer.domElement.style.pointerEvents = "none", e.appendChild(this.labelRenderer.domElement), this.controls = new Fw(this.camera, this.renderer.domElement), this.controls.target.copy(this.defaultTarget), this.controls.enableDamping = !0, this.controls.minDistance = 2, this.controls.maxDistance = 12;
    const r = new Gp(16777215, 1);
    this.scene.add(r);
    const s = new Ln(2, 2, 2), a = new Dp(s), o = new Lp(
      a,
      new ys({ color: 4804695, linewidth: 1 })
    );
    this.cubeEdges = o, this.scene.add(o);
    const l = new Ln(...eu), c = new pi({
      color: 5983628,
      transparent: !0,
      opacity: 0.055,
      side: gt,
      depthWrite: !1
    });
    this.enclosureShell = new jA(l, c), this.scene.add(this.enclosureShell);
    for (const S of Kw) {
      const x = new $A().setFromPoints([
        new Q(...S.from),
        new Q(...S.to)
      ]), M = new ys({
        color: _t[S.key],
        transparent: !0,
        opacity: 0.5,
        depthWrite: !1
      }), F = new Ul(x, M);
      this.axisLines.push(F), this.scene.add(F);
    }
    const u = [
      { id: "a", dir: new Q(0, 1, 0), color: _t.y },
      { id: "cha", dir: new Q(0, -1, 0), color: _t.y },
      { id: "mi", dir: new Q(1, 0, 0), color: _t.x },
      { id: "mo", dir: new Q(-1, 0, 0), color: _t.x },
      /** Toward შე- at −Z (into) */
      { id: "she", dir: new Q(0, 0, -1), color: _t.z },
      /** Toward გა- at +Z (out) */
      { id: "ga", dir: new Q(0, 0, 1), color: _t.z }
    ];
    for (const { id: S, dir: x, color: M } of u) {
      const F = new Hr(
        x.clone().normalize(),
        new Q(0, 0, 0),
        1.02,
        M,
        0.2,
        0.14
      ), _ = F.line.material;
      _.transparent = !0, _.opacity = _n, _.depthWrite = !1;
      const v = F.cone.material;
      v.transparent = !0, v.opacity = vn, v.depthWrite = !1, F.userData.arrowId = S, this.axisArrowById.set(S, F), this.scene.add(F);
    }
    const f = new Q(0, 0, 1), d = new Q(0, 0, -1.07);
    this.sheInboundArrow = new Hr(
      f,
      d,
      0.94,
      _t.z,
      0.2,
      0.14
    );
    const g = this.sheInboundArrow.line.material;
    g.transparent = !0, g.opacity = _n, g.depthWrite = !1;
    const m = this.sheInboundArrow.cone.material;
    m.transparent = !0, m.opacity = vn, m.depthWrite = !1, this.sheInboundArrow.visible = !1, this.scene.add(this.sheInboundArrow);
    {
      const S = eu[2] / 2, x = Math.max(0.1, S), M = Math.min(Math.max(0.1, S * 0.38), x * 0.42), F = M * 0.62, _ = new Q(0, 0, 0), v = [
        { dir: new Q(0, 0, -1) },
        { dir: new Q(0, 0, 1) }
      ];
      for (const b of v) {
        const H = new Hr(b.dir, _, x, _t.z, M, F), R = H.line.material;
        R.transparent = !0, R.opacity = _n, R.depthWrite = !1;
        const N = H.cone.material;
        N.transparent = !0, N.opacity = vn, N.depthWrite = !1, H.visible = !1, H.renderOrder = 10, H.line.renderOrder = 10, H.cone.renderOrder = 10, this.scene.add(H), this.gadaEnclosureArrows.push(H);
      }
    }
    const p = new ar(0.85, 0.85), h = new pi({
      color: 6055792,
      transparent: !0,
      opacity: 0.18,
      side: gt,
      depthWrite: !1
    });
    this.daPlane = new jA(p, h), this.daPlane.rotation.x = -Math.PI / 2, this.daPlane.position.set(0.14, -0.94, -0.4), this.daPlane.visible = !1, this.scene.add(this.daPlane);
    const E = new Q(0.9, 0.06, 0.2).normalize();
    this.tsaHintArrow = new Hr(
      E,
      this.tsaHintAnchor.clone(),
      0.42,
      _t.x,
      0.11,
      0.085
    );
    const U = this.tsaHintArrow.line.material;
    U.transparent = !0, U.depthWrite = !1;
    const B = this.tsaHintArrow.cone.material;
    B.transparent = !0, B.depthWrite = !1, this.tsaHintArrow.visible = !1, this.scene.add(this.tsaHintArrow), this.setDiagramHints(null, null), this.setTheme("light");
    for (const S of kw) {
      const x = document.createElement("div");
      x.className = "pd-axis-label", x.innerHTML = `<span class="pd-axis-label__primary">${oA(S.primary)}</span><span class="pd-axis-label__secondary">${oA(S.secondary)}</span>`;
      const M = new Jc(x);
      M.position.set(...S.position), this.scene.add(M);
    }
    this.renderer.domElement.addEventListener("pointerdown", this.onPointerDown), window.addEventListener("resize", this.onResize), this.loop();
  }
  setPickCallback(e) {
    this.onPick = e;
  }
  /**
   * Dim all axis arrows until a preverb is selected; then brighten arrows listed for that id.
   * Shows optional hints: horizontal plane for და-, extra departure arrow for წა- (tsa).
   */
  setDiagramHints(e, A) {
    const t = Xw(e, A), i = t ? new Set(t) : null, r = !!(i != null && i.has("she") && !(i != null && i.has("ga")));
    for (const [a, o] of this.axisArrowById) {
      let l = (i == null ? void 0 : i.has(a)) ?? !1;
      a === "she" && r && (l = !1);
      const c = o.line.material, u = o.cone.material;
      c.opacity = l ? Vr : _n, u.opacity = l ? kr : vn;
    }
    if (this.sheInboundArrow) {
      const a = r;
      this.sheInboundArrow.visible = a;
      const o = this.sheInboundArrow.line.material, l = this.sheInboundArrow.cone.material;
      a ? (o.opacity = Vr, l.opacity = kr) : (o.opacity = _n, l.opacity = vn);
    }
    const s = e === "gada";
    for (const a of this.gadaEnclosureArrows) {
      a.visible = s;
      const o = a.line.material, l = a.cone.material;
      s ? (o.opacity = Vr, l.opacity = kr) : (o.opacity = _n, l.opacity = vn);
    }
    if (this.daPlane) {
      const a = e === "da";
      this.daPlane.visible = a, a && this.daPlane.position.set(
        this.daPlaneAnchor.x,
        this.daPlaneAnchor.y - Yw,
        this.daPlaneAnchor.z
      );
    }
    if (this.enclosureShell) {
      const a = this.enclosureShell.material, o = e ?? "", l = o === "she" || o === "ga" || o === "gada" || o === "shemo" || o === "tsamo" || o === "gamo", c = this.currentTheme === "dark" ? 0.09 : 0.055, u = this.currentTheme === "dark" ? 0.16 : 0.12;
      a.opacity = l ? u : c;
    }
    if (this.tsaHintArrow) {
      const a = e === "tsa";
      if (this.tsaHintArrow.visible = a, a) {
        this.tsaHintArrow.position.copy(this.tsaHintAnchor);
        const o = new Q(0.88, 0.05, 0.22).normalize();
        this.tsaHintArrow.setDirection(o);
        const l = this.tsaHintArrow.line.material, c = this.tsaHintArrow.cone.material;
        l.opacity = Vr, c.opacity = kr;
      } else {
        const o = this.tsaHintArrow.line.material, l = this.tsaHintArrow.cone.material;
        o.opacity = _n, l.opacity = vn;
      }
    }
  }
  buildLabels(e, A, t) {
    var r, s, a, o;
    for (const l of this.pickMeshes.values())
      this.scene.remove(l);
    this.pickMeshes.clear();
    for (const l of this.labelById.values())
      this.scene.remove(l);
    this.labelById.clear();
    const i = new Map(A.map((l) => [l.id, l]));
    for (const l of e.entries) {
      const c = i.get(l.id);
      if (!c) continue;
      const u = ((r = l.labelOffset) == null ? void 0 : r[0]) ?? 0, f = ((s = l.labelOffset) == null ? void 0 : s[1]) ?? 0, d = ((a = l.labelOffset) == null ? void 0 : a[2]) ?? 0, g = new Q(l.position[0] + u, l.position[1] + f, l.position[2] + d);
      if (l.id === "tsa" && this.tsaHintAnchor.copy(g), l.id === "da" && this.daPlaneAnchor.copy(g), t.modernPreverbsOnly && !c.modernPreverb || t.mode === "verb" && t.usedIds && !t.usedIds.has(c.id)) continue;
      const m = document.createElement("div");
      m.className = `pd-label ${Au[c.tier] ?? ""}`, m.textContent = c.display, t.legendTier != null && c.tier !== t.legendTier && m.classList.add("pd-label--dim"), t.selectedId === c.id && m.classList.add("pd-label--selected"), (o = t.scenarioHighlight) != null && o.has(c.id) && m.classList.add("pd-label--scenario");
      const h = new Jc(m);
      h.position.copy(g), this.scene.add(h), this.labelById.set(c.id, h);
      const E = new Sl(0.18, 12, 12), U = new pi({
        visible: !1,
        transparent: !0,
        opacity: 0
      }), B = new jA(E, U);
      B.position.copy(g), B.userData.preverbId = c.id, this.scene.add(B), this.pickMeshes.set(c.id, B);
    }
  }
  updateLabelStyles(e, A) {
    var i;
    const t = new Map(A.map((r) => [r.id, r]));
    for (const [r, s] of this.labelById) {
      const a = t.get(r);
      if (!a) continue;
      const o = s.element;
      if (o.className = `pd-label ${Au[a.tier] ?? ""}`, e.modernPreverbsOnly && !a.modernPreverb) {
        o.style.display = "none";
        continue;
      }
      o.style.display = "", e.legendTier != null && a.tier !== e.legendTier && o.classList.add("pd-label--dim"), e.selectedId === r && o.classList.add("pd-label--selected"), (i = e.scenarioHighlight) != null && i.has(r) && o.classList.add("pd-label--scenario");
    }
    for (const [r, s] of this.pickMeshes) {
      const a = t.get(r);
      s.visible = !!(a && (!e.modernPreverbsOnly || a.modernPreverb));
    }
  }
  resize() {
    this.onResize();
  }
  /**
   * Draw one frame (after orbit changes) so `canvas.toDataURL` / drawImage see the current view.
   * The render loop also runs continuously; this is for snapshots right before capture.
   */
  renderOnce() {
    this.controls.update(), this.renderer.render(this.scene, this.camera), this.labelRenderer.render(this.scene, this.camera);
  }
  resetView() {
    this.camera.position.copy(this.defaultCameraPosition), this.controls.target.copy(this.defaultTarget), this.camera.up.set(0, 1, 0), this.controls.update();
  }
  setTheme(e) {
    this.currentTheme = e;
    const A = e === "dark";
    this.scene.background = new Ye(A ? 725536 : 16316922), this.cubeEdges && this.cubeEdges.material.color.setHex(A ? 9741240 : 4804695);
    for (const t of this.axisLines) {
      const i = t.material;
      i.opacity = A ? 0.66 : 0.5;
    }
    if (this.enclosureShell) {
      const t = this.enclosureShell.material;
      t.opacity = A ? 0.09 : 0.055;
    }
    if (this.daPlane) {
      const t = this.daPlane.material;
      t.color.setHex(A ? 9741240 : 6055792), t.opacity = A ? 0.24 : 0.18;
    }
  }
  destroy() {
    cancelAnimationFrame(this.animationId), window.removeEventListener("resize", this.onResize), this.renderer.domElement.removeEventListener("pointerdown", this.onPointerDown), this.controls.dispose(), this.renderer.dispose(), this.renderer.domElement.remove(), this.labelRenderer.domElement.remove(), this.daPlane && (this.daPlane.geometry.dispose(), this.daPlane.material.dispose()), this.enclosureShell && (this.enclosureShell.geometry.dispose(), this.enclosureShell.material.dispose()), this.tsaHintArrow && this.tsaHintArrow.dispose(), this.sheInboundArrow && this.sheInboundArrow.dispose();
    for (const e of this.gadaEnclosureArrows)
      e.dispose();
    for (const e of this.axisArrowById.values())
      e.dispose();
  }
}
/*!
 * html2canvas 1.4.1 <https://html2canvas.hertzen.com>
 * Copyright (c) 2022 Niklas von Hertzen <https://hertzen.com>
 * Released under MIT License
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var Yo = function(n, e) {
  return Yo = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(A, t) {
    A.__proto__ = t;
  } || function(A, t) {
    for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (A[i] = t[i]);
  }, Yo(n, e);
};
function wt(n, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
  Yo(n, e);
  function A() {
    this.constructor = n;
  }
  n.prototype = e === null ? Object.create(e) : (A.prototype = e.prototype, new A());
}
var Jo = function() {
  return Jo = Object.assign || function(e) {
    for (var A, t = 1, i = arguments.length; t < i; t++) {
      A = arguments[t];
      for (var r in A) Object.prototype.hasOwnProperty.call(A, r) && (e[r] = A[r]);
    }
    return e;
  }, Jo.apply(this, arguments);
};
function OA(n, e, A, t) {
  function i(r) {
    return r instanceof A ? r : new A(function(s) {
      s(r);
    });
  }
  return new (A || (A = Promise))(function(r, s) {
    function a(c) {
      try {
        l(t.next(c));
      } catch (u) {
        s(u);
      }
    }
    function o(c) {
      try {
        l(t.throw(c));
      } catch (u) {
        s(u);
      }
    }
    function l(c) {
      c.done ? r(c.value) : i(c.value).then(a, o);
    }
    l((t = t.apply(n, [])).next());
  });
}
function DA(n, e) {
  var A = { label: 0, sent: function() {
    if (r[0] & 1) throw r[1];
    return r[1];
  }, trys: [], ops: [] }, t, i, r, s;
  return s = { next: a(0), throw: a(1), return: a(2) }, typeof Symbol == "function" && (s[Symbol.iterator] = function() {
    return this;
  }), s;
  function a(l) {
    return function(c) {
      return o([l, c]);
    };
  }
  function o(l) {
    if (t) throw new TypeError("Generator is already executing.");
    for (; A; ) try {
      if (t = 1, i && (r = l[0] & 2 ? i.return : l[0] ? i.throw || ((r = i.return) && r.call(i), 0) : i.next) && !(r = r.call(i, l[1])).done) return r;
      switch (i = 0, r && (l = [l[0] & 2, r.value]), l[0]) {
        case 0:
        case 1:
          r = l;
          break;
        case 4:
          return A.label++, { value: l[1], done: !1 };
        case 5:
          A.label++, i = l[1], l = [0];
          continue;
        case 7:
          l = A.ops.pop(), A.trys.pop();
          continue;
        default:
          if (r = A.trys, !(r = r.length > 0 && r[r.length - 1]) && (l[0] === 6 || l[0] === 2)) {
            A = 0;
            continue;
          }
          if (l[0] === 3 && (!r || l[1] > r[0] && l[1] < r[3])) {
            A.label = l[1];
            break;
          }
          if (l[0] === 6 && A.label < r[1]) {
            A.label = r[1], r = l;
            break;
          }
          if (r && A.label < r[2]) {
            A.label = r[2], A.ops.push(l);
            break;
          }
          r[2] && A.ops.pop(), A.trys.pop();
          continue;
      }
      l = e.call(n, A);
    } catch (c) {
      l = [6, c], i = 0;
    } finally {
      t = r = 0;
    }
    if (l[0] & 5) throw l[1];
    return { value: l[0] ? l[1] : void 0, done: !0 };
  }
}
function Kr(n, e, A) {
  if (arguments.length === 2) for (var t = 0, i = e.length, r; t < i; t++)
    (r || !(t in e)) && (r || (r = Array.prototype.slice.call(e, 0, t)), r[t] = e[t]);
  return n.concat(r || e);
}
var kt = (
  /** @class */
  (function() {
    function n(e, A, t, i) {
      this.left = e, this.top = A, this.width = t, this.height = i;
    }
    return n.prototype.add = function(e, A, t, i) {
      return new n(this.left + e, this.top + A, this.width + t, this.height + i);
    }, n.fromClientRect = function(e, A) {
      return new n(A.left + e.windowBounds.left, A.top + e.windowBounds.top, A.width, A.height);
    }, n.fromDOMRectList = function(e, A) {
      var t = Array.from(A).find(function(i) {
        return i.width !== 0;
      });
      return t ? new n(t.left + e.windowBounds.left, t.top + e.windowBounds.top, t.width, t.height) : n.EMPTY;
    }, n.EMPTY = new n(0, 0, 0, 0), n;
  })()
), ks = function(n, e) {
  return kt.fromClientRect(n, e.getBoundingClientRect());
}, qw = function(n) {
  var e = n.body, A = n.documentElement;
  if (!e || !A)
    throw new Error("Unable to get document size");
  var t = Math.max(Math.max(e.scrollWidth, A.scrollWidth), Math.max(e.offsetWidth, A.offsetWidth), Math.max(e.clientWidth, A.clientWidth)), i = Math.max(Math.max(e.scrollHeight, A.scrollHeight), Math.max(e.offsetHeight, A.offsetHeight), Math.max(e.clientHeight, A.clientHeight));
  return new kt(0, 0, t, i);
}, Ks = function(n) {
  for (var e = [], A = 0, t = n.length; A < t; ) {
    var i = n.charCodeAt(A++);
    if (i >= 55296 && i <= 56319 && A < t) {
      var r = n.charCodeAt(A++);
      (r & 64512) === 56320 ? e.push(((i & 1023) << 10) + (r & 1023) + 65536) : (e.push(i), A--);
    } else
      e.push(i);
  }
  return e;
}, gA = function() {
  for (var n = [], e = 0; e < arguments.length; e++)
    n[e] = arguments[e];
  if (String.fromCodePoint)
    return String.fromCodePoint.apply(String, n);
  var A = n.length;
  if (!A)
    return "";
  for (var t = [], i = -1, r = ""; ++i < A; ) {
    var s = n[i];
    s <= 65535 ? t.push(s) : (s -= 65536, t.push((s >> 10) + 55296, s % 1024 + 56320)), (i + 1 === A || t.length > 16384) && (r += String.fromCharCode.apply(String, t), t.length = 0);
  }
  return r;
}, tu = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", Zw = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (var zr = 0; zr < tu.length; zr++)
  Zw[tu.charCodeAt(zr)] = zr;
var nu = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", Ni = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (var Wr = 0; Wr < nu.length; Wr++)
  Ni[nu.charCodeAt(Wr)] = Wr;
var jw = function(n) {
  var e = n.length * 0.75, A = n.length, t, i = 0, r, s, a, o;
  n[n.length - 1] === "=" && (e--, n[n.length - 2] === "=" && e--);
  var l = typeof ArrayBuffer < "u" && typeof Uint8Array < "u" && typeof Uint8Array.prototype.slice < "u" ? new ArrayBuffer(e) : new Array(e), c = Array.isArray(l) ? l : new Uint8Array(l);
  for (t = 0; t < A; t += 4)
    r = Ni[n.charCodeAt(t)], s = Ni[n.charCodeAt(t + 1)], a = Ni[n.charCodeAt(t + 2)], o = Ni[n.charCodeAt(t + 3)], c[i++] = r << 2 | s >> 4, c[i++] = (s & 15) << 4 | a >> 2, c[i++] = (a & 3) << 6 | o & 63;
  return l;
}, $w = function(n) {
  for (var e = n.length, A = [], t = 0; t < e; t += 2)
    A.push(n[t + 1] << 8 | n[t]);
  return A;
}, e_ = function(n) {
  for (var e = n.length, A = [], t = 0; t < e; t += 4)
    A.push(n[t + 3] << 24 | n[t + 2] << 16 | n[t + 1] << 8 | n[t]);
  return A;
}, bn = 5, bl = 11, Ra = 2, A_ = bl - bn, Hh = 65536 >> bn, t_ = 1 << bn, La = t_ - 1, n_ = 1024 >> bn, i_ = Hh + n_, r_ = i_, s_ = 32, a_ = r_ + s_, o_ = 65536 >> bl, l_ = 1 << A_, c_ = l_ - 1, iu = function(n, e, A) {
  return n.slice ? n.slice(e, A) : new Uint16Array(Array.prototype.slice.call(n, e, A));
}, u_ = function(n, e, A) {
  return n.slice ? n.slice(e, A) : new Uint32Array(Array.prototype.slice.call(n, e, A));
}, h_ = function(n, e) {
  var A = jw(n), t = Array.isArray(A) ? e_(A) : new Uint32Array(A), i = Array.isArray(A) ? $w(A) : new Uint16Array(A), r = 24, s = iu(i, r / 2, t[4] / 2), a = t[5] === 2 ? iu(i, (r + t[4]) / 2) : u_(t, Math.ceil((r + t[4]) / 4));
  return new f_(t[0], t[1], t[2], t[3], s, a);
}, f_ = (
  /** @class */
  (function() {
    function n(e, A, t, i, r, s) {
      this.initialValue = e, this.errorValue = A, this.highStart = t, this.highValueIndex = i, this.index = r, this.data = s;
    }
    return n.prototype.get = function(e) {
      var A;
      if (e >= 0) {
        if (e < 55296 || e > 56319 && e <= 65535)
          return A = this.index[e >> bn], A = (A << Ra) + (e & La), this.data[A];
        if (e <= 65535)
          return A = this.index[Hh + (e - 55296 >> bn)], A = (A << Ra) + (e & La), this.data[A];
        if (e < this.highStart)
          return A = a_ - o_ + (e >> bl), A = this.index[A], A += e >> bn & c_, A = this.index[A], A = (A << Ra) + (e & La), this.data[A];
        if (e <= 1114111)
          return this.data[this.highValueIndex];
      }
      return this.errorValue;
    }, n;
  })()
), ru = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", d_ = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (var Xr = 0; Xr < ru.length; Xr++)
  d_[ru.charCodeAt(Xr)] = Xr;
var p_ = "KwAAAAAAAAAACA4AUD0AADAgAAACAAAAAAAIABAAGABAAEgAUABYAGAAaABgAGgAYgBqAF8AZwBgAGgAcQB5AHUAfQCFAI0AlQCdAKIAqgCyALoAYABoAGAAaABgAGgAwgDKAGAAaADGAM4A0wDbAOEA6QDxAPkAAQEJAQ8BFwF1AH0AHAEkASwBNAE6AUIBQQFJAVEBWQFhAWgBcAF4ATAAgAGGAY4BlQGXAZ8BpwGvAbUBvQHFAc0B0wHbAeMB6wHxAfkBAQIJAvEBEQIZAiECKQIxAjgCQAJGAk4CVgJeAmQCbAJ0AnwCgQKJApECmQKgAqgCsAK4ArwCxAIwAMwC0wLbAjAA4wLrAvMC+AIAAwcDDwMwABcDHQMlAy0DNQN1AD0DQQNJA0kDSQNRA1EDVwNZA1kDdQB1AGEDdQBpA20DdQN1AHsDdQCBA4kDkQN1AHUAmQOhA3UAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AKYDrgN1AHUAtgO+A8YDzgPWAxcD3gPjA+sD8wN1AHUA+wMDBAkEdQANBBUEHQQlBCoEFwMyBDgEYABABBcDSARQBFgEYARoBDAAcAQzAXgEgASIBJAEdQCXBHUAnwSnBK4EtgS6BMIEyAR1AHUAdQB1AHUAdQCVANAEYABgAGAAYABgAGAAYABgANgEYADcBOQEYADsBPQE/AQEBQwFFAUcBSQFLAU0BWQEPAVEBUsFUwVbBWAAYgVgAGoFcgV6BYIFigWRBWAAmQWfBaYFYABgAGAAYABgAKoFYACxBbAFuQW6BcEFwQXHBcEFwQXPBdMF2wXjBeoF8gX6BQIGCgYSBhoGIgYqBjIGOgZgAD4GRgZMBmAAUwZaBmAAYABgAGAAYABgAGAAYABgAGAAYABgAGIGYABpBnAGYABgAGAAYABgAGAAYABgAGAAYAB4Bn8GhQZgAGAAYAB1AHcDFQSLBmAAYABgAJMGdQA9A3UAmwajBqsGqwaVALMGuwbDBjAAywbSBtIG1QbSBtIG0gbSBtIG0gbdBuMG6wbzBvsGAwcLBxMHAwcbByMHJwcsBywHMQcsB9IGOAdAB0gHTgfSBkgHVgfSBtIG0gbSBtIG0gbSBtIG0gbSBiwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdgAGAALAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdbB2MHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB2kH0gZwB64EdQB1AHUAdQB1AHUAdQB1AHUHfQdgAIUHjQd1AHUAlQedB2AAYAClB6sHYACzB7YHvgfGB3UAzgfWBzMB3gfmB1EB7gf1B/0HlQENAQUIDQh1ABUIHQglCBcDLQg1CD0IRQhNCEEDUwh1AHUAdQBbCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIcAh3CHoIMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIgggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAALAcsBywHLAcsBywHLAcsBywHLAcsB4oILAcsB44I0gaWCJ4Ipgh1AHUAqgiyCHUAdQB1AHUAdQB1AHUAdQB1AHUAtwh8AXUAvwh1AMUIyQjRCNkI4AjoCHUAdQB1AO4I9gj+CAYJDgkTCS0HGwkjCYIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiAAIAAAAFAAYABgAGIAXwBgAHEAdQBFAJUAogCyAKAAYABgAEIA4ABGANMA4QDxAMEBDwE1AFwBLAE6AQEBUQF4QkhCmEKoQrhCgAHIQsAB0MLAAcABwAHAAeDC6ABoAHDCwMMAAcABwAHAAdDDGMMAAcAB6MM4wwjDWMNow3jDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEjDqABWw6bDqABpg6gAaABoAHcDvwOPA+gAaABfA/8DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DpcPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB9cPKwkyCToJMAB1AHUAdQBCCUoJTQl1AFUJXAljCWcJawkwADAAMAAwAHMJdQB2CX4JdQCECYoJjgmWCXUAngkwAGAAYABxAHUApgn3A64JtAl1ALkJdQDACTAAMAAwADAAdQB1AHUAdQB1AHUAdQB1AHUAowYNBMUIMAAwADAAMADICcsJ0wnZCRUE4QkwAOkJ8An4CTAAMAB1AAAKvwh1AAgKDwoXCh8KdQAwACcKLgp1ADYKqAmICT4KRgowADAAdQB1AE4KMAB1AFYKdQBeCnUAZQowADAAMAAwADAAMAAwADAAMAAVBHUAbQowADAAdQC5CXUKMAAwAHwBxAijBogEMgF9CoQKiASMCpQKmgqIBKIKqgquCogEDQG2Cr4KxgrLCjAAMADTCtsKCgHjCusK8Qr5CgELMAAwADAAMAB1AIsECQsRC3UANAEZCzAAMAAwADAAMAB1ACELKQswAHUANAExCzkLdQBBC0kLMABRC1kLMAAwADAAMAAwADAAdQBhCzAAMAAwAGAAYABpC3ELdwt/CzAAMACHC4sLkwubC58Lpwt1AK4Ltgt1APsDMAAwADAAMAAwADAAMAAwAL4LwwvLC9IL1wvdCzAAMADlC+kL8Qv5C/8LSQswADAAMAAwADAAMAAwADAAMAAHDDAAMAAwADAAMAAODBYMHgx1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1ACYMMAAwADAAdQB1AHUALgx1AHUAdQB1AHUAdQA2DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AD4MdQBGDHUAdQB1AHUAdQB1AEkMdQB1AHUAdQB1AFAMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQBYDHUAdQB1AF8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUA+wMVBGcMMAAwAHwBbwx1AHcMfwyHDI8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAYABgAJcMMAAwADAAdQB1AJ8MlQClDDAAMACtDCwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB7UMLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AA0EMAC9DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAsBywHLAcsBywHLAcsBywHLQcwAMEMyAwsBywHLAcsBywHLAcsBywHLAcsBywHzAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1ANQM2QzhDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMABgAGAAYABgAGAAYABgAOkMYADxDGAA+AwADQYNYABhCWAAYAAODTAAMAAwADAAFg1gAGAAHg37AzAAMAAwADAAYABgACYNYAAsDTQNPA1gAEMNPg1LDWAAYABgAGAAYABgAGAAYABgAGAAUg1aDYsGVglhDV0NcQBnDW0NdQ15DWAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAlQCBDZUAiA2PDZcNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAnw2nDTAAMAAwADAAMAAwAHUArw23DTAAMAAwADAAMAAwADAAMAAwADAAMAB1AL8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQDHDTAAYABgAM8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA1w11ANwNMAAwAD0B5A0wADAAMAAwADAAMADsDfQN/A0EDgwOFA4wABsOMAAwADAAMAAwADAAMAAwANIG0gbSBtIG0gbSBtIG0gYjDigOwQUuDsEFMw7SBjoO0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGQg5KDlIOVg7SBtIGXg5lDm0OdQ7SBtIGfQ6EDooOjQ6UDtIGmg6hDtIG0gaoDqwO0ga0DrwO0gZgAGAAYADEDmAAYAAkBtIGzA5gANIOYADaDokO0gbSBt8O5w7SBu8O0gb1DvwO0gZgAGAAxA7SBtIG0gbSBtIGYABgAGAAYAAED2AAsAUMD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHJA8sBywHLAcsBywHLAccDywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywPLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAc0D9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHPA/SBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gYUD0QPlQCVAJUAMAAwADAAMACVAJUAlQCVAJUAlQCVAEwPMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA//8EAAQABAAEAAQABAAEAAQABAANAAMAAQABAAIABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQACgATABcAHgAbABoAHgAXABYAEgAeABsAGAAPABgAHABLAEsASwBLAEsASwBLAEsASwBLABgAGAAeAB4AHgATAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAGwASAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWAA0AEQAeAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAFAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJABYAGgAbABsAGwAeAB0AHQAeAE8AFwAeAA0AHgAeABoAGwBPAE8ADgBQAB0AHQAdAE8ATwAXAE8ATwBPABYAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwBWAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsABAAbABsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEAA0ADQBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABABQACsAKwArACsAKwArACsAKwAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUAAaABoAUABQAFAAUABQAEwAHgAbAFAAHgAEACsAKwAEAAQABAArAFAAUABQAFAAUABQACsAKwArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQACsAUABQACsAKwAEACsABAAEAAQABAAEACsAKwArACsABAAEACsAKwAEAAQABAArACsAKwAEACsAKwArACsAKwArACsAUABQAFAAUAArAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAAQABABQAFAAUAAEAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAArACsAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AGwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAKwArACsAKwArAAQABAAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAAQAUAArAFAAUABQAFAAUABQACsAKwArAFAAUABQACsAUABQAFAAUAArACsAKwBQAFAAKwBQACsAUABQACsAKwArAFAAUAArACsAKwBQAFAAUAArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAArACsAKwAEAAQABAArAAQABAAEAAQAKwArAFAAKwArACsAKwArACsABAArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAHgAeAB4AHgAeAB4AGwAeACsAKwArACsAKwAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAUABQAFAAKwArACsAKwArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwAOAFAAUABQAFAAUABQAFAAHgBQAAQABAAEAA4AUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAKwArAAQAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAKwArACsAKwArACsAUAArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAXABcAFwAXABcACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAXAArAFwAXABcAFwAXABcAFwAXABcAFwAKgBcAFwAKgAqACoAKgAqACoAKgAqACoAXAArACsAXABcAFwAXABcACsAXAArACoAKgAqACoAKgAqACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwBcAFwAXABcAFAADgAOAA4ADgAeAA4ADgAJAA4ADgANAAkAEwATABMAEwATAAkAHgATAB4AHgAeAAQABAAeAB4AHgAeAB4AHgBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAADQAEAB4ABAAeAAQAFgARABYAEQAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAAQABAAEAAQADQAEAAQAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAA0ADQAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeACsAHgAeAA4ADgANAA4AHgAeAB4AHgAeAAkACQArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgBcAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4AHgAeAB4AXABcAFwAXABcAFwAKgAqACoAKgBcAFwAXABcACoAKgAqAFwAKgAqACoAXABcACoAKgAqACoAKgAqACoAXABcAFwAKgAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwAKgBLAEsASwBLAEsASwBLAEsASwBLACoAKgAqACoAKgAqAFAAUABQAFAAUABQACsAUAArACsAKwArACsAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAKwBQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsABAAEAAQAHgANAB4AHgAeAB4AHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUAArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWABEAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAANAA0AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUAArAAQABAArACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAA0ADQAVAFwADQAeAA0AGwBcACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwAeAB4AEwATAA0ADQAOAB4AEwATAB4ABAAEAAQACQArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAHgArACsAKwATABMASwBLAEsASwBLAEsASwBLAEsASwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAXABcAFwAXABcACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXAArACsAKwAqACoAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsAHgAeAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKwArAAQASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACoAKgAqACoAKgAqACoAXAAqACoAKgAqACoAKgArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABABQAFAAUABQAFAAUABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgANAA0ADQANAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwAeAB4AHgAeAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArAA0ADQANAA0ADQBLAEsASwBLAEsASwBLAEsASwBLACsAKwArAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUAAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAAQAUABQAFAAUABQAFAABABQAFAABAAEAAQAUAArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQACsAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQACsAKwAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQACsAHgAeAB4AHgAeAB4AHgAOAB4AKwANAA0ADQANAA0ADQANAAkADQANAA0ACAAEAAsABAAEAA0ACQANAA0ADAAdAB0AHgAXABcAFgAXABcAFwAWABcAHQAdAB4AHgAUABQAFAANAAEAAQAEAAQABAAEAAQACQAaABoAGgAaABoAGgAaABoAHgAXABcAHQAVABUAHgAeAB4AHgAeAB4AGAAWABEAFQAVABUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ADQAeAA0ADQANAA0AHgANAA0ADQAHAB4AHgAeAB4AKwAEAAQABAAEAAQABAAEAAQABAAEAFAAUAArACsATwBQAFAAUABQAFAAHgAeAB4AFgARAE8AUABPAE8ATwBPAFAAUABQAFAAUAAeAB4AHgAWABEAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArABsAGwAbABsAGwAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGgAbABsAGwAbABoAGwAbABoAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAFAAGgAeAB0AHgBQAB4AGgAeAB4AHgAeAB4AHgAeAB4AHgBPAB4AUAAbAB4AHgBQAFAAUABQAFAAHgAeAB4AHQAdAB4AUAAeAFAAHgBQAB4AUABPAFAAUAAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgBQAFAAUABQAE8ATwBQAFAAUABQAFAATwBQAFAATwBQAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAUABQAFAATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABPAB4AHgArACsAKwArAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAdAB4AHgAeAB0AHQAeAB4AHQAeAB4AHgAdAB4AHQAbABsAHgAdAB4AHgAeAB4AHQAeAB4AHQAdAB0AHQAeAB4AHQAeAB0AHgAdAB0AHQAdAB0AHQAeAB0AHgAeAB4AHgAeAB0AHQAdAB0AHgAeAB4AHgAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB0AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAdAB0AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHQAdAB0AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHQAdAB4AHgAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AJQAlAB0AHQAlAB4AJQAlACUAIAAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAeAB0AJQAdAB0AHgAdAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAdAB0AHQAdACUAHgAlACUAJQAdACUAJQAdAB0AHQAlACUAHQAdACUAHQAdACUAJQAlAB4AHQAeAB4AHgAeAB0AHQAlAB0AHQAdAB0AHQAdACUAJQAlACUAJQAdACUAJQAgACUAHQAdACUAJQAlACUAJQAlACUAJQAeAB4AHgAlACUAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AFwAXABcAFwAXABcAHgATABMAJQAeAB4AHgAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARABYAEQAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANAA0AHgANAB4ADQANAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwAlACUAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACsAKwArACsAKwArACsAKwArACsAKwArAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBPAE8ATwBPAE8ATwBPAE8AJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeAAQAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUABQAAQAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAUABQAFAAUABQAAQABAAEACsABAAEACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAKwBQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAA0ADQANAA0ADQANAA0ADQAeACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAArACsAKwArAFAAUABQAFAAUAANAA0ADQANAA0ADQAUACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQANAA0ADQANAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAANACsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAB4AHgAeAB4AHgArACsAKwArACsAKwAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANAFAABAAEAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAEAAQABAAEAB4ABAAEAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsABAAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLAA0ADQArAB4ABABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUAAeAFAAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAAEAAQADgANAA0AEwATAB4AHgAeAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAFAAUABQAFAABAAEACsAKwAEAA0ADQAeAFAAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcAFwADQANAA0AKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQAKwAEAAQAKwArAAQABAAEAAQAUAAEAFAABAAEAA0ADQANACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABABQAA4AUAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANAFAADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAaABoAGgAaAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAJAAkACQAJAAkACQAJABYAEQArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AHgAeACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAARwBHABUARwAJACsAKwArACsAKwArACsAKwArACsAKwAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAKwArACsAKwArACsAKwArACsAKwArACsAKwBRAFEAUQBRACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAHgAEAAQADQAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAeAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQAHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAKwArAFAAKwArAFAAUAArACsAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAHgAeAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeACsAKwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4ABAAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAHgAeAA0ADQANAA0AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArAAQABAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwBQAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArABsAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAB4AHgAeAB4ABAAEAAQABAAEAAQABABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArABYAFgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAGgBQAFAAUAAaAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUAArACsAKwArACsAKwBQACsAKwArACsAUAArAFAAKwBQACsAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUAArAFAAKwBQACsAUAArAFAAUAArAFAAKwArAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAKwBQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeACUAJQAlAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAHgAlACUAJQAlACUAIAAgACAAJQAlACAAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACEAIQAhACEAIQAlACUAIAAgACUAJQAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAlACUAJQAlACAAIAAgACUAIAAgACAAJQAlACUAJQAlACUAJQAgACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAlAB4AJQAeACUAJQAlACUAJQAgACUAJQAlACUAHgAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACAAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABcAFwAXABUAFQAVAB4AHgAeAB4AJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAgACUAJQAgACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAIAAgACUAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACAAIAAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACAAIAAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAA==", su = 50, g_ = 1, Ph = 2, Nh = 3, m_ = 4, B_ = 5, au = 7, Oh = 8, ou = 9, An = 10, qo = 11, lu = 12, Zo = 13, w_ = 14, Oi = 15, jo = 16, Yr = 17, Ri = 18, __ = 19, cu = 20, $o = 21, Li = 22, Da = 23, $n = 24, ZA = 25, Gi = 26, Vi = 27, ei = 28, v_ = 29, yn = 30, C_ = 31, Jr = 32, qr = 33, el = 34, Al = 35, tl = 36, er = 37, nl = 38, ws = 39, _s = 40, Ha = 41, Gh = 42, E_ = 43, x_ = [9001, 65288], Vh = "!", Ke = "×", Zr = "÷", il = h_(p_), Rt = [yn, tl], rl = [g_, Ph, Nh, B_], kh = [An, Oh], uu = [Vi, Gi], U_ = rl.concat(kh), hu = [nl, ws, _s, el, Al], y_ = [Oi, Zo], S_ = function(n, e) {
  e === void 0 && (e = "strict");
  var A = [], t = [], i = [];
  return n.forEach(function(r, s) {
    var a = il.get(r);
    if (a > su ? (i.push(!0), a -= su) : i.push(!1), ["normal", "auto", "loose"].indexOf(e) !== -1 && [8208, 8211, 12316, 12448].indexOf(r) !== -1)
      return t.push(s), A.push(jo);
    if (a === m_ || a === qo) {
      if (s === 0)
        return t.push(s), A.push(yn);
      var o = A[s - 1];
      return U_.indexOf(o) === -1 ? (t.push(t[s - 1]), A.push(o)) : (t.push(s), A.push(yn));
    }
    if (t.push(s), a === C_)
      return A.push(e === "strict" ? $o : er);
    if (a === Gh || a === v_)
      return A.push(yn);
    if (a === E_)
      return r >= 131072 && r <= 196605 || r >= 196608 && r <= 262141 ? A.push(er) : A.push(yn);
    A.push(a);
  }), [t, A, i];
}, Pa = function(n, e, A, t) {
  var i = t[A];
  if (Array.isArray(n) ? n.indexOf(i) !== -1 : n === i)
    for (var r = A; r <= t.length; ) {
      r++;
      var s = t[r];
      if (s === e)
        return !0;
      if (s !== An)
        break;
    }
  if (i === An)
    for (var r = A; r > 0; ) {
      r--;
      var a = t[r];
      if (Array.isArray(n) ? n.indexOf(a) !== -1 : n === a)
        for (var o = A; o <= t.length; ) {
          o++;
          var s = t[o];
          if (s === e)
            return !0;
          if (s !== An)
            break;
        }
      if (a !== An)
        break;
    }
  return !1;
}, fu = function(n, e) {
  for (var A = n; A >= 0; ) {
    var t = e[A];
    if (t === An)
      A--;
    else
      return t;
  }
  return 0;
}, M_ = function(n, e, A, t, i) {
  if (A[t] === 0)
    return Ke;
  var r = t - 1;
  if (Array.isArray(i) && i[r] === !0)
    return Ke;
  var s = r - 1, a = r + 1, o = e[r], l = s >= 0 ? e[s] : 0, c = e[a];
  if (o === Ph && c === Nh)
    return Ke;
  if (rl.indexOf(o) !== -1)
    return Vh;
  if (rl.indexOf(c) !== -1 || kh.indexOf(c) !== -1)
    return Ke;
  if (fu(r, e) === Oh)
    return Zr;
  if (il.get(n[r]) === qo || (o === Jr || o === qr) && il.get(n[a]) === qo || o === au || c === au || o === ou || [An, Zo, Oi].indexOf(o) === -1 && c === ou || [Yr, Ri, __, $n, ei].indexOf(c) !== -1 || fu(r, e) === Li || Pa(Da, Li, r, e) || Pa([Yr, Ri], $o, r, e) || Pa(lu, lu, r, e))
    return Ke;
  if (o === An)
    return Zr;
  if (o === Da || c === Da)
    return Ke;
  if (c === jo || o === jo)
    return Zr;
  if ([Zo, Oi, $o].indexOf(c) !== -1 || o === w_ || l === tl && y_.indexOf(o) !== -1 || o === ei && c === tl || c === cu || Rt.indexOf(c) !== -1 && o === ZA || Rt.indexOf(o) !== -1 && c === ZA || o === Vi && [er, Jr, qr].indexOf(c) !== -1 || [er, Jr, qr].indexOf(o) !== -1 && c === Gi || Rt.indexOf(o) !== -1 && uu.indexOf(c) !== -1 || uu.indexOf(o) !== -1 && Rt.indexOf(c) !== -1 || // (PR | PO) × ( OP | HY )? NU
  [Vi, Gi].indexOf(o) !== -1 && (c === ZA || [Li, Oi].indexOf(c) !== -1 && e[a + 1] === ZA) || // ( OP | HY ) × NU
  [Li, Oi].indexOf(o) !== -1 && c === ZA || // NU ×	(NU | SY | IS)
  o === ZA && [ZA, ei, $n].indexOf(c) !== -1)
    return Ke;
  if ([ZA, ei, $n, Yr, Ri].indexOf(c) !== -1)
    for (var u = r; u >= 0; ) {
      var f = e[u];
      if (f === ZA)
        return Ke;
      if ([ei, $n].indexOf(f) !== -1)
        u--;
      else
        break;
    }
  if ([Vi, Gi].indexOf(c) !== -1)
    for (var u = [Yr, Ri].indexOf(o) !== -1 ? s : r; u >= 0; ) {
      var f = e[u];
      if (f === ZA)
        return Ke;
      if ([ei, $n].indexOf(f) !== -1)
        u--;
      else
        break;
    }
  if (nl === o && [nl, ws, el, Al].indexOf(c) !== -1 || [ws, el].indexOf(o) !== -1 && [ws, _s].indexOf(c) !== -1 || [_s, Al].indexOf(o) !== -1 && c === _s || hu.indexOf(o) !== -1 && [cu, Gi].indexOf(c) !== -1 || hu.indexOf(c) !== -1 && o === Vi || Rt.indexOf(o) !== -1 && Rt.indexOf(c) !== -1 || o === $n && Rt.indexOf(c) !== -1 || Rt.concat(ZA).indexOf(o) !== -1 && c === Li && x_.indexOf(n[a]) === -1 || Rt.concat(ZA).indexOf(c) !== -1 && o === Ri)
    return Ke;
  if (o === Ha && c === Ha) {
    for (var d = A[r], g = 1; d > 0 && (d--, e[d] === Ha); )
      g++;
    if (g % 2 !== 0)
      return Ke;
  }
  return o === Jr && c === qr ? Ke : Zr;
}, F_ = function(n, e) {
  e || (e = { lineBreak: "normal", wordBreak: "normal" });
  var A = S_(n, e.lineBreak), t = A[0], i = A[1], r = A[2];
  (e.wordBreak === "break-all" || e.wordBreak === "break-word") && (i = i.map(function(a) {
    return [ZA, yn, Gh].indexOf(a) !== -1 ? er : a;
  }));
  var s = e.wordBreak === "keep-all" ? r.map(function(a, o) {
    return a && n[o] >= 19968 && n[o] <= 40959;
  }) : void 0;
  return [t, i, s];
}, b_ = (
  /** @class */
  (function() {
    function n(e, A, t, i) {
      this.codePoints = e, this.required = A === Vh, this.start = t, this.end = i;
    }
    return n.prototype.slice = function() {
      return gA.apply(void 0, this.codePoints.slice(this.start, this.end));
    }, n;
  })()
), T_ = function(n, e) {
  var A = Ks(n), t = F_(A, e), i = t[0], r = t[1], s = t[2], a = A.length, o = 0, l = 0;
  return {
    next: function() {
      if (l >= a)
        return { done: !0, value: null };
      for (var c = Ke; l < a && (c = M_(A, r, i, ++l, s)) === Ke; )
        ;
      if (c !== Ke || l === a) {
        var u = new b_(A, c, o, l);
        return o = l, { value: u, done: !1 };
      }
      return { done: !0, value: null };
    }
  };
}, Q_ = 1, I_ = 2, or = 4, du = 8, Fs = 10, pu = 47, Xi = 92, R_ = 9, L_ = 32, jr = 34, Di = 61, D_ = 35, H_ = 36, P_ = 37, $r = 39, es = 40, Hi = 41, N_ = 95, KA = 45, O_ = 33, G_ = 60, V_ = 62, k_ = 64, K_ = 91, z_ = 93, W_ = 61, X_ = 123, As = 63, Y_ = 125, gu = 124, J_ = 126, q_ = 128, mu = 65533, Na = 42, Fn = 43, Z_ = 44, j_ = 58, $_ = 59, Ar = 46, ev = 0, Av = 8, tv = 11, nv = 14, iv = 31, rv = 127, vt = -1, Kh = 48, zh = 97, Wh = 101, sv = 102, av = 117, ov = 122, Xh = 65, Yh = 69, Jh = 70, lv = 85, cv = 90, HA = function(n) {
  return n >= Kh && n <= 57;
}, uv = function(n) {
  return n >= 55296 && n <= 57343;
}, Ai = function(n) {
  return HA(n) || n >= Xh && n <= Jh || n >= zh && n <= sv;
}, hv = function(n) {
  return n >= zh && n <= ov;
}, fv = function(n) {
  return n >= Xh && n <= cv;
}, dv = function(n) {
  return hv(n) || fv(n);
}, pv = function(n) {
  return n >= q_;
}, ts = function(n) {
  return n === Fs || n === R_ || n === L_;
}, bs = function(n) {
  return dv(n) || pv(n) || n === N_;
}, Bu = function(n) {
  return bs(n) || HA(n) || n === KA;
}, gv = function(n) {
  return n >= ev && n <= Av || n === tv || n >= nv && n <= iv || n === rv;
}, $t = function(n, e) {
  return n !== Xi ? !1 : e !== Fs;
}, ns = function(n, e, A) {
  return n === KA ? bs(e) || $t(e, A) : bs(n) ? !0 : !!(n === Xi && $t(n, e));
}, Oa = function(n, e, A) {
  return n === Fn || n === KA ? HA(e) ? !0 : e === Ar && HA(A) : HA(n === Ar ? e : n);
}, mv = function(n) {
  var e = 0, A = 1;
  (n[e] === Fn || n[e] === KA) && (n[e] === KA && (A = -1), e++);
  for (var t = []; HA(n[e]); )
    t.push(n[e++]);
  var i = t.length ? parseInt(gA.apply(void 0, t), 10) : 0;
  n[e] === Ar && e++;
  for (var r = []; HA(n[e]); )
    r.push(n[e++]);
  var s = r.length, a = s ? parseInt(gA.apply(void 0, r), 10) : 0;
  (n[e] === Yh || n[e] === Wh) && e++;
  var o = 1;
  (n[e] === Fn || n[e] === KA) && (n[e] === KA && (o = -1), e++);
  for (var l = []; HA(n[e]); )
    l.push(n[e++]);
  var c = l.length ? parseInt(gA.apply(void 0, l), 10) : 0;
  return A * (i + a * Math.pow(10, -s)) * Math.pow(10, o * c);
}, Bv = {
  type: 2
  /* LEFT_PARENTHESIS_TOKEN */
}, wv = {
  type: 3
  /* RIGHT_PARENTHESIS_TOKEN */
}, _v = {
  type: 4
  /* COMMA_TOKEN */
}, vv = {
  type: 13
  /* SUFFIX_MATCH_TOKEN */
}, Cv = {
  type: 8
  /* PREFIX_MATCH_TOKEN */
}, Ev = {
  type: 21
  /* COLUMN_TOKEN */
}, xv = {
  type: 9
  /* DASH_MATCH_TOKEN */
}, Uv = {
  type: 10
  /* INCLUDE_MATCH_TOKEN */
}, yv = {
  type: 11
  /* LEFT_CURLY_BRACKET_TOKEN */
}, Sv = {
  type: 12
  /* RIGHT_CURLY_BRACKET_TOKEN */
}, Mv = {
  type: 14
  /* SUBSTRING_MATCH_TOKEN */
}, is = {
  type: 23
  /* BAD_URL_TOKEN */
}, Fv = {
  type: 1
  /* BAD_STRING_TOKEN */
}, bv = {
  type: 25
  /* CDO_TOKEN */
}, Tv = {
  type: 24
  /* CDC_TOKEN */
}, Qv = {
  type: 26
  /* COLON_TOKEN */
}, Iv = {
  type: 27
  /* SEMICOLON_TOKEN */
}, Rv = {
  type: 28
  /* LEFT_SQUARE_BRACKET_TOKEN */
}, Lv = {
  type: 29
  /* RIGHT_SQUARE_BRACKET_TOKEN */
}, Dv = {
  type: 31
  /* WHITESPACE_TOKEN */
}, sl = {
  type: 32
  /* EOF_TOKEN */
}, qh = (
  /** @class */
  (function() {
    function n() {
      this._value = [];
    }
    return n.prototype.write = function(e) {
      this._value = this._value.concat(Ks(e));
    }, n.prototype.read = function() {
      for (var e = [], A = this.consumeToken(); A !== sl; )
        e.push(A), A = this.consumeToken();
      return e;
    }, n.prototype.consumeToken = function() {
      var e = this.consumeCodePoint();
      switch (e) {
        case jr:
          return this.consumeStringToken(jr);
        case D_:
          var A = this.peekCodePoint(0), t = this.peekCodePoint(1), i = this.peekCodePoint(2);
          if (Bu(A) || $t(t, i)) {
            var r = ns(A, t, i) ? I_ : Q_, s = this.consumeName();
            return { type: 5, value: s, flags: r };
          }
          break;
        case H_:
          if (this.peekCodePoint(0) === Di)
            return this.consumeCodePoint(), vv;
          break;
        case $r:
          return this.consumeStringToken($r);
        case es:
          return Bv;
        case Hi:
          return wv;
        case Na:
          if (this.peekCodePoint(0) === Di)
            return this.consumeCodePoint(), Mv;
          break;
        case Fn:
          if (Oa(e, this.peekCodePoint(0), this.peekCodePoint(1)))
            return this.reconsumeCodePoint(e), this.consumeNumericToken();
          break;
        case Z_:
          return _v;
        case KA:
          var a = e, o = this.peekCodePoint(0), l = this.peekCodePoint(1);
          if (Oa(a, o, l))
            return this.reconsumeCodePoint(e), this.consumeNumericToken();
          if (ns(a, o, l))
            return this.reconsumeCodePoint(e), this.consumeIdentLikeToken();
          if (o === KA && l === V_)
            return this.consumeCodePoint(), this.consumeCodePoint(), Tv;
          break;
        case Ar:
          if (Oa(e, this.peekCodePoint(0), this.peekCodePoint(1)))
            return this.reconsumeCodePoint(e), this.consumeNumericToken();
          break;
        case pu:
          if (this.peekCodePoint(0) === Na)
            for (this.consumeCodePoint(); ; ) {
              var c = this.consumeCodePoint();
              if (c === Na && (c = this.consumeCodePoint(), c === pu))
                return this.consumeToken();
              if (c === vt)
                return this.consumeToken();
            }
          break;
        case j_:
          return Qv;
        case $_:
          return Iv;
        case G_:
          if (this.peekCodePoint(0) === O_ && this.peekCodePoint(1) === KA && this.peekCodePoint(2) === KA)
            return this.consumeCodePoint(), this.consumeCodePoint(), bv;
          break;
        case k_:
          var u = this.peekCodePoint(0), f = this.peekCodePoint(1), d = this.peekCodePoint(2);
          if (ns(u, f, d)) {
            var s = this.consumeName();
            return { type: 7, value: s };
          }
          break;
        case K_:
          return Rv;
        case Xi:
          if ($t(e, this.peekCodePoint(0)))
            return this.reconsumeCodePoint(e), this.consumeIdentLikeToken();
          break;
        case z_:
          return Lv;
        case W_:
          if (this.peekCodePoint(0) === Di)
            return this.consumeCodePoint(), Cv;
          break;
        case X_:
          return yv;
        case Y_:
          return Sv;
        case av:
        case lv:
          var g = this.peekCodePoint(0), m = this.peekCodePoint(1);
          return g === Fn && (Ai(m) || m === As) && (this.consumeCodePoint(), this.consumeUnicodeRangeToken()), this.reconsumeCodePoint(e), this.consumeIdentLikeToken();
        case gu:
          if (this.peekCodePoint(0) === Di)
            return this.consumeCodePoint(), xv;
          if (this.peekCodePoint(0) === gu)
            return this.consumeCodePoint(), Ev;
          break;
        case J_:
          if (this.peekCodePoint(0) === Di)
            return this.consumeCodePoint(), Uv;
          break;
        case vt:
          return sl;
      }
      return ts(e) ? (this.consumeWhiteSpace(), Dv) : HA(e) ? (this.reconsumeCodePoint(e), this.consumeNumericToken()) : bs(e) ? (this.reconsumeCodePoint(e), this.consumeIdentLikeToken()) : { type: 6, value: gA(e) };
    }, n.prototype.consumeCodePoint = function() {
      var e = this._value.shift();
      return typeof e > "u" ? -1 : e;
    }, n.prototype.reconsumeCodePoint = function(e) {
      this._value.unshift(e);
    }, n.prototype.peekCodePoint = function(e) {
      return e >= this._value.length ? -1 : this._value[e];
    }, n.prototype.consumeUnicodeRangeToken = function() {
      for (var e = [], A = this.consumeCodePoint(); Ai(A) && e.length < 6; )
        e.push(A), A = this.consumeCodePoint();
      for (var t = !1; A === As && e.length < 6; )
        e.push(A), A = this.consumeCodePoint(), t = !0;
      if (t) {
        var i = parseInt(gA.apply(void 0, e.map(function(o) {
          return o === As ? Kh : o;
        })), 16), r = parseInt(gA.apply(void 0, e.map(function(o) {
          return o === As ? Jh : o;
        })), 16);
        return { type: 30, start: i, end: r };
      }
      var s = parseInt(gA.apply(void 0, e), 16);
      if (this.peekCodePoint(0) === KA && Ai(this.peekCodePoint(1))) {
        this.consumeCodePoint(), A = this.consumeCodePoint();
        for (var a = []; Ai(A) && a.length < 6; )
          a.push(A), A = this.consumeCodePoint();
        var r = parseInt(gA.apply(void 0, a), 16);
        return { type: 30, start: s, end: r };
      } else
        return { type: 30, start: s, end: s };
    }, n.prototype.consumeIdentLikeToken = function() {
      var e = this.consumeName();
      return e.toLowerCase() === "url" && this.peekCodePoint(0) === es ? (this.consumeCodePoint(), this.consumeUrlToken()) : this.peekCodePoint(0) === es ? (this.consumeCodePoint(), { type: 19, value: e }) : { type: 20, value: e };
    }, n.prototype.consumeUrlToken = function() {
      var e = [];
      if (this.consumeWhiteSpace(), this.peekCodePoint(0) === vt)
        return { type: 22, value: "" };
      var A = this.peekCodePoint(0);
      if (A === $r || A === jr) {
        var t = this.consumeStringToken(this.consumeCodePoint());
        return t.type === 0 && (this.consumeWhiteSpace(), this.peekCodePoint(0) === vt || this.peekCodePoint(0) === Hi) ? (this.consumeCodePoint(), { type: 22, value: t.value }) : (this.consumeBadUrlRemnants(), is);
      }
      for (; ; ) {
        var i = this.consumeCodePoint();
        if (i === vt || i === Hi)
          return { type: 22, value: gA.apply(void 0, e) };
        if (ts(i))
          return this.consumeWhiteSpace(), this.peekCodePoint(0) === vt || this.peekCodePoint(0) === Hi ? (this.consumeCodePoint(), { type: 22, value: gA.apply(void 0, e) }) : (this.consumeBadUrlRemnants(), is);
        if (i === jr || i === $r || i === es || gv(i))
          return this.consumeBadUrlRemnants(), is;
        if (i === Xi)
          if ($t(i, this.peekCodePoint(0)))
            e.push(this.consumeEscapedCodePoint());
          else
            return this.consumeBadUrlRemnants(), is;
        else
          e.push(i);
      }
    }, n.prototype.consumeWhiteSpace = function() {
      for (; ts(this.peekCodePoint(0)); )
        this.consumeCodePoint();
    }, n.prototype.consumeBadUrlRemnants = function() {
      for (; ; ) {
        var e = this.consumeCodePoint();
        if (e === Hi || e === vt)
          return;
        $t(e, this.peekCodePoint(0)) && this.consumeEscapedCodePoint();
      }
    }, n.prototype.consumeStringSlice = function(e) {
      for (var A = 5e4, t = ""; e > 0; ) {
        var i = Math.min(A, e);
        t += gA.apply(void 0, this._value.splice(0, i)), e -= i;
      }
      return this._value.shift(), t;
    }, n.prototype.consumeStringToken = function(e) {
      var A = "", t = 0;
      do {
        var i = this._value[t];
        if (i === vt || i === void 0 || i === e)
          return A += this.consumeStringSlice(t), { type: 0, value: A };
        if (i === Fs)
          return this._value.splice(0, t), Fv;
        if (i === Xi) {
          var r = this._value[t + 1];
          r !== vt && r !== void 0 && (r === Fs ? (A += this.consumeStringSlice(t), t = -1, this._value.shift()) : $t(i, r) && (A += this.consumeStringSlice(t), A += gA(this.consumeEscapedCodePoint()), t = -1));
        }
        t++;
      } while (!0);
    }, n.prototype.consumeNumber = function() {
      var e = [], A = or, t = this.peekCodePoint(0);
      for ((t === Fn || t === KA) && e.push(this.consumeCodePoint()); HA(this.peekCodePoint(0)); )
        e.push(this.consumeCodePoint());
      t = this.peekCodePoint(0);
      var i = this.peekCodePoint(1);
      if (t === Ar && HA(i))
        for (e.push(this.consumeCodePoint(), this.consumeCodePoint()), A = du; HA(this.peekCodePoint(0)); )
          e.push(this.consumeCodePoint());
      t = this.peekCodePoint(0), i = this.peekCodePoint(1);
      var r = this.peekCodePoint(2);
      if ((t === Yh || t === Wh) && ((i === Fn || i === KA) && HA(r) || HA(i)))
        for (e.push(this.consumeCodePoint(), this.consumeCodePoint()), A = du; HA(this.peekCodePoint(0)); )
          e.push(this.consumeCodePoint());
      return [mv(e), A];
    }, n.prototype.consumeNumericToken = function() {
      var e = this.consumeNumber(), A = e[0], t = e[1], i = this.peekCodePoint(0), r = this.peekCodePoint(1), s = this.peekCodePoint(2);
      if (ns(i, r, s)) {
        var a = this.consumeName();
        return { type: 15, number: A, flags: t, unit: a };
      }
      return i === P_ ? (this.consumeCodePoint(), { type: 16, number: A, flags: t }) : { type: 17, number: A, flags: t };
    }, n.prototype.consumeEscapedCodePoint = function() {
      var e = this.consumeCodePoint();
      if (Ai(e)) {
        for (var A = gA(e); Ai(this.peekCodePoint(0)) && A.length < 6; )
          A += gA(this.consumeCodePoint());
        ts(this.peekCodePoint(0)) && this.consumeCodePoint();
        var t = parseInt(A, 16);
        return t === 0 || uv(t) || t > 1114111 ? mu : t;
      }
      return e === vt ? mu : e;
    }, n.prototype.consumeName = function() {
      for (var e = ""; ; ) {
        var A = this.consumeCodePoint();
        if (Bu(A))
          e += gA(A);
        else if ($t(A, this.peekCodePoint(0)))
          e += gA(this.consumeEscapedCodePoint());
        else
          return this.reconsumeCodePoint(A), e;
      }
    }, n;
  })()
), Zh = (
  /** @class */
  (function() {
    function n(e) {
      this._tokens = e;
    }
    return n.create = function(e) {
      var A = new qh();
      return A.write(e), new n(A.read());
    }, n.parseValue = function(e) {
      return n.create(e).parseComponentValue();
    }, n.parseValues = function(e) {
      return n.create(e).parseComponentValues();
    }, n.prototype.parseComponentValue = function() {
      for (var e = this.consumeToken(); e.type === 31; )
        e = this.consumeToken();
      if (e.type === 32)
        throw new SyntaxError("Error parsing CSS component value, unexpected EOF");
      this.reconsumeToken(e);
      var A = this.consumeComponentValue();
      do
        e = this.consumeToken();
      while (e.type === 31);
      if (e.type === 32)
        return A;
      throw new SyntaxError("Error parsing CSS component value, multiple values found when expecting only one");
    }, n.prototype.parseComponentValues = function() {
      for (var e = []; ; ) {
        var A = this.consumeComponentValue();
        if (A.type === 32)
          return e;
        e.push(A), e.push();
      }
    }, n.prototype.consumeComponentValue = function() {
      var e = this.consumeToken();
      switch (e.type) {
        case 11:
        case 28:
        case 2:
          return this.consumeSimpleBlock(e.type);
        case 19:
          return this.consumeFunction(e);
      }
      return e;
    }, n.prototype.consumeSimpleBlock = function(e) {
      for (var A = { type: e, values: [] }, t = this.consumeToken(); ; ) {
        if (t.type === 32 || Pv(t, e))
          return A;
        this.reconsumeToken(t), A.values.push(this.consumeComponentValue()), t = this.consumeToken();
      }
    }, n.prototype.consumeFunction = function(e) {
      for (var A = {
        name: e.value,
        values: [],
        type: 18
        /* FUNCTION */
      }; ; ) {
        var t = this.consumeToken();
        if (t.type === 32 || t.type === 3)
          return A;
        this.reconsumeToken(t), A.values.push(this.consumeComponentValue());
      }
    }, n.prototype.consumeToken = function() {
      var e = this._tokens.shift();
      return typeof e > "u" ? sl : e;
    }, n.prototype.reconsumeToken = function(e) {
      this._tokens.unshift(e);
    }, n;
  })()
), lr = function(n) {
  return n.type === 15;
}, yi = function(n) {
  return n.type === 17;
}, iA = function(n) {
  return n.type === 20;
}, Hv = function(n) {
  return n.type === 0;
}, al = function(n, e) {
  return iA(n) && n.value === e;
}, jh = function(n) {
  return n.type !== 31;
}, xi = function(n) {
  return n.type !== 31 && n.type !== 4;
}, yt = function(n) {
  var e = [], A = [];
  return n.forEach(function(t) {
    if (t.type === 4) {
      if (A.length === 0)
        throw new Error("Error parsing function args, zero tokens for arg");
      e.push(A), A = [];
      return;
    }
    t.type !== 31 && A.push(t);
  }), A.length && e.push(A), e;
}, Pv = function(n, e) {
  return e === 11 && n.type === 12 || e === 28 && n.type === 29 ? !0 : e === 2 && n.type === 3;
}, un = function(n) {
  return n.type === 17 || n.type === 15;
}, _A = function(n) {
  return n.type === 16 || un(n);
}, $h = function(n) {
  return n.length > 1 ? [n[0], n[1]] : [n[0]];
}, bA = {
  type: 17,
  number: 0,
  flags: or
}, Tl = {
  type: 16,
  number: 50,
  flags: or
}, tn = {
  type: 16,
  number: 100,
  flags: or
}, ki = function(n, e, A) {
  var t = n[0], i = n[1];
  return [rA(t, e), rA(typeof i < "u" ? i : t, A)];
}, rA = function(n, e) {
  if (n.type === 16)
    return n.number / 100 * e;
  if (lr(n))
    switch (n.unit) {
      case "rem":
      case "em":
        return 16 * n.number;
      // TODO use correct font-size
      case "px":
      default:
        return n.number;
    }
  return n.number;
}, ef = "deg", Af = "grad", tf = "rad", nf = "turn", zs = {
  name: "angle",
  parse: function(n, e) {
    if (e.type === 15)
      switch (e.unit) {
        case ef:
          return Math.PI * e.number / 180;
        case Af:
          return Math.PI / 200 * e.number;
        case tf:
          return e.number;
        case nf:
          return Math.PI * 2 * e.number;
      }
    throw new Error("Unsupported angle type");
  }
}, rf = function(n) {
  return n.type === 15 && (n.unit === ef || n.unit === Af || n.unit === tf || n.unit === nf);
}, sf = function(n) {
  var e = n.filter(iA).map(function(A) {
    return A.value;
  }).join(" ");
  switch (e) {
    case "to bottom right":
    case "to right bottom":
    case "left top":
    case "top left":
      return [bA, bA];
    case "to top":
    case "bottom":
      return ot(0);
    case "to bottom left":
    case "to left bottom":
    case "right top":
    case "top right":
      return [bA, tn];
    case "to right":
    case "left":
      return ot(90);
    case "to top left":
    case "to left top":
    case "right bottom":
    case "bottom right":
      return [tn, tn];
    case "to bottom":
    case "top":
      return ot(180);
    case "to top right":
    case "to right top":
    case "left bottom":
    case "bottom left":
      return [tn, bA];
    case "to left":
    case "right":
      return ot(270);
  }
  return 0;
}, ot = function(n) {
  return Math.PI * n / 180;
}, an = {
  name: "color",
  parse: function(n, e) {
    if (e.type === 18) {
      var A = Nv[e.name];
      if (typeof A > "u")
        throw new Error('Attempting to parse an unsupported color function "' + e.name + '"');
      return A(n, e.values);
    }
    if (e.type === 5) {
      if (e.value.length === 3) {
        var t = e.value.substring(0, 1), i = e.value.substring(1, 2), r = e.value.substring(2, 3);
        return nn(parseInt(t + t, 16), parseInt(i + i, 16), parseInt(r + r, 16), 1);
      }
      if (e.value.length === 4) {
        var t = e.value.substring(0, 1), i = e.value.substring(1, 2), r = e.value.substring(2, 3), s = e.value.substring(3, 4);
        return nn(parseInt(t + t, 16), parseInt(i + i, 16), parseInt(r + r, 16), parseInt(s + s, 16) / 255);
      }
      if (e.value.length === 6) {
        var t = e.value.substring(0, 2), i = e.value.substring(2, 4), r = e.value.substring(4, 6);
        return nn(parseInt(t, 16), parseInt(i, 16), parseInt(r, 16), 1);
      }
      if (e.value.length === 8) {
        var t = e.value.substring(0, 2), i = e.value.substring(2, 4), r = e.value.substring(4, 6), s = e.value.substring(6, 8);
        return nn(parseInt(t, 16), parseInt(i, 16), parseInt(r, 16), parseInt(s, 16) / 255);
      }
    }
    if (e.type === 20) {
      var a = Ot[e.value.toUpperCase()];
      if (typeof a < "u")
        return a;
    }
    return Ot.TRANSPARENT;
  }
}, on = function(n) {
  return (255 & n) === 0;
}, yA = function(n) {
  var e = 255 & n, A = 255 & n >> 8, t = 255 & n >> 16, i = 255 & n >> 24;
  return e < 255 ? "rgba(" + i + "," + t + "," + A + "," + e / 255 + ")" : "rgb(" + i + "," + t + "," + A + ")";
}, nn = function(n, e, A, t) {
  return (n << 24 | e << 16 | A << 8 | Math.round(t * 255) << 0) >>> 0;
}, wu = function(n, e) {
  if (n.type === 17)
    return n.number;
  if (n.type === 16) {
    var A = e === 3 ? 1 : 255;
    return e === 3 ? n.number / 100 * A : Math.round(n.number / 100 * A);
  }
  return 0;
}, _u = function(n, e) {
  var A = e.filter(xi);
  if (A.length === 3) {
    var t = A.map(wu), i = t[0], r = t[1], s = t[2];
    return nn(i, r, s, 1);
  }
  if (A.length === 4) {
    var a = A.map(wu), i = a[0], r = a[1], s = a[2], o = a[3];
    return nn(i, r, s, o);
  }
  return 0;
};
function Ga(n, e, A) {
  return A < 0 && (A += 1), A >= 1 && (A -= 1), A < 1 / 6 ? (e - n) * A * 6 + n : A < 1 / 2 ? e : A < 2 / 3 ? (e - n) * 6 * (2 / 3 - A) + n : n;
}
var vu = function(n, e) {
  var A = e.filter(xi), t = A[0], i = A[1], r = A[2], s = A[3], a = (t.type === 17 ? ot(t.number) : zs.parse(n, t)) / (Math.PI * 2), o = _A(i) ? i.number / 100 : 0, l = _A(r) ? r.number / 100 : 0, c = typeof s < "u" && _A(s) ? rA(s, 1) : 1;
  if (o === 0)
    return nn(l * 255, l * 255, l * 255, 1);
  var u = l <= 0.5 ? l * (o + 1) : l + o - l * o, f = l * 2 - u, d = Ga(f, u, a + 1 / 3), g = Ga(f, u, a), m = Ga(f, u, a - 1 / 3);
  return nn(d * 255, g * 255, m * 255, c);
}, Nv = {
  hsl: vu,
  hsla: vu,
  rgb: _u,
  rgba: _u
}, Yi = function(n, e) {
  return an.parse(n, Zh.create(e).parseComponentValue());
}, Ot = {
  ALICEBLUE: 4042850303,
  ANTIQUEWHITE: 4209760255,
  AQUA: 16777215,
  AQUAMARINE: 2147472639,
  AZURE: 4043309055,
  BEIGE: 4126530815,
  BISQUE: 4293182719,
  BLACK: 255,
  BLANCHEDALMOND: 4293643775,
  BLUE: 65535,
  BLUEVIOLET: 2318131967,
  BROWN: 2771004159,
  BURLYWOOD: 3736635391,
  CADETBLUE: 1604231423,
  CHARTREUSE: 2147418367,
  CHOCOLATE: 3530104575,
  CORAL: 4286533887,
  CORNFLOWERBLUE: 1687547391,
  CORNSILK: 4294499583,
  CRIMSON: 3692313855,
  CYAN: 16777215,
  DARKBLUE: 35839,
  DARKCYAN: 9145343,
  DARKGOLDENROD: 3095837695,
  DARKGRAY: 2846468607,
  DARKGREEN: 6553855,
  DARKGREY: 2846468607,
  DARKKHAKI: 3182914559,
  DARKMAGENTA: 2332068863,
  DARKOLIVEGREEN: 1433087999,
  DARKORANGE: 4287365375,
  DARKORCHID: 2570243327,
  DARKRED: 2332033279,
  DARKSALMON: 3918953215,
  DARKSEAGREEN: 2411499519,
  DARKSLATEBLUE: 1211993087,
  DARKSLATEGRAY: 793726975,
  DARKSLATEGREY: 793726975,
  DARKTURQUOISE: 13554175,
  DARKVIOLET: 2483082239,
  DEEPPINK: 4279538687,
  DEEPSKYBLUE: 12582911,
  DIMGRAY: 1768516095,
  DIMGREY: 1768516095,
  DODGERBLUE: 512819199,
  FIREBRICK: 2988581631,
  FLORALWHITE: 4294635775,
  FORESTGREEN: 579543807,
  FUCHSIA: 4278255615,
  GAINSBORO: 3705462015,
  GHOSTWHITE: 4177068031,
  GOLD: 4292280575,
  GOLDENROD: 3668254975,
  GRAY: 2155905279,
  GREEN: 8388863,
  GREENYELLOW: 2919182335,
  GREY: 2155905279,
  HONEYDEW: 4043305215,
  HOTPINK: 4285117695,
  INDIANRED: 3445382399,
  INDIGO: 1258324735,
  IVORY: 4294963455,
  KHAKI: 4041641215,
  LAVENDER: 3873897215,
  LAVENDERBLUSH: 4293981695,
  LAWNGREEN: 2096890111,
  LEMONCHIFFON: 4294626815,
  LIGHTBLUE: 2916673279,
  LIGHTCORAL: 4034953471,
  LIGHTCYAN: 3774873599,
  LIGHTGOLDENRODYELLOW: 4210742015,
  LIGHTGRAY: 3553874943,
  LIGHTGREEN: 2431553791,
  LIGHTGREY: 3553874943,
  LIGHTPINK: 4290167295,
  LIGHTSALMON: 4288707327,
  LIGHTSEAGREEN: 548580095,
  LIGHTSKYBLUE: 2278488831,
  LIGHTSLATEGRAY: 2005441023,
  LIGHTSLATEGREY: 2005441023,
  LIGHTSTEELBLUE: 2965692159,
  LIGHTYELLOW: 4294959359,
  LIME: 16711935,
  LIMEGREEN: 852308735,
  LINEN: 4210091775,
  MAGENTA: 4278255615,
  MAROON: 2147483903,
  MEDIUMAQUAMARINE: 1724754687,
  MEDIUMBLUE: 52735,
  MEDIUMORCHID: 3126187007,
  MEDIUMPURPLE: 2473647103,
  MEDIUMSEAGREEN: 1018393087,
  MEDIUMSLATEBLUE: 2070474495,
  MEDIUMSPRINGGREEN: 16423679,
  MEDIUMTURQUOISE: 1221709055,
  MEDIUMVIOLETRED: 3340076543,
  MIDNIGHTBLUE: 421097727,
  MINTCREAM: 4127193855,
  MISTYROSE: 4293190143,
  MOCCASIN: 4293178879,
  NAVAJOWHITE: 4292783615,
  NAVY: 33023,
  OLDLACE: 4260751103,
  OLIVE: 2155872511,
  OLIVEDRAB: 1804477439,
  ORANGE: 4289003775,
  ORANGERED: 4282712319,
  ORCHID: 3664828159,
  PALEGOLDENROD: 4008225535,
  PALEGREEN: 2566625535,
  PALETURQUOISE: 2951671551,
  PALEVIOLETRED: 3681588223,
  PAPAYAWHIP: 4293907967,
  PEACHPUFF: 4292524543,
  PERU: 3448061951,
  PINK: 4290825215,
  PLUM: 3718307327,
  POWDERBLUE: 2967529215,
  PURPLE: 2147516671,
  REBECCAPURPLE: 1714657791,
  RED: 4278190335,
  ROSYBROWN: 3163525119,
  ROYALBLUE: 1097458175,
  SADDLEBROWN: 2336560127,
  SALMON: 4202722047,
  SANDYBROWN: 4104413439,
  SEAGREEN: 780883967,
  SEASHELL: 4294307583,
  SIENNA: 2689740287,
  SILVER: 3233857791,
  SKYBLUE: 2278484991,
  SLATEBLUE: 1784335871,
  SLATEGRAY: 1887473919,
  SLATEGREY: 1887473919,
  SNOW: 4294638335,
  SPRINGGREEN: 16744447,
  STEELBLUE: 1182971135,
  TAN: 3535047935,
  TEAL: 8421631,
  THISTLE: 3636451583,
  TOMATO: 4284696575,
  TRANSPARENT: 0,
  TURQUOISE: 1088475391,
  VIOLET: 4001558271,
  WHEAT: 4125012991,
  WHITE: 4294967295,
  WHITESMOKE: 4126537215,
  YELLOW: 4294902015,
  YELLOWGREEN: 2597139199
}, Ov = {
  name: "background-clip",
  initialValue: "border-box",
  prefix: !1,
  type: 1,
  parse: function(n, e) {
    return e.map(function(A) {
      if (iA(A))
        switch (A.value) {
          case "padding-box":
            return 1;
          case "content-box":
            return 2;
        }
      return 0;
    });
  }
}, Gv = {
  name: "background-color",
  initialValue: "transparent",
  prefix: !1,
  type: 3,
  format: "color"
}, Ws = function(n, e) {
  var A = an.parse(n, e[0]), t = e[1];
  return t && _A(t) ? { color: A, stop: t } : { color: A, stop: null };
}, Cu = function(n, e) {
  var A = n[0], t = n[n.length - 1];
  A.stop === null && (A.stop = bA), t.stop === null && (t.stop = tn);
  for (var i = [], r = 0, s = 0; s < n.length; s++) {
    var a = n[s].stop;
    if (a !== null) {
      var o = rA(a, e);
      o > r ? i.push(o) : i.push(r), r = o;
    } else
      i.push(null);
  }
  for (var l = null, s = 0; s < i.length; s++) {
    var c = i[s];
    if (c === null)
      l === null && (l = s);
    else if (l !== null) {
      for (var u = s - l, f = i[l - 1], d = (c - f) / (u + 1), g = 1; g <= u; g++)
        i[l + g - 1] = d * g;
      l = null;
    }
  }
  return n.map(function(m, p) {
    var h = m.color;
    return { color: h, stop: Math.max(Math.min(1, i[p] / e), 0) };
  });
}, Vv = function(n, e, A) {
  var t = e / 2, i = A / 2, r = rA(n[0], e) - t, s = i - rA(n[1], A);
  return (Math.atan2(s, r) + Math.PI * 2) % (Math.PI * 2);
}, kv = function(n, e, A) {
  var t = typeof n == "number" ? n : Vv(n, e, A), i = Math.abs(e * Math.sin(t)) + Math.abs(A * Math.cos(t)), r = e / 2, s = A / 2, a = i / 2, o = Math.sin(t - Math.PI / 2) * a, l = Math.cos(t - Math.PI / 2) * a;
  return [i, r - l, r + l, s - o, s + o];
}, pt = function(n, e) {
  return Math.sqrt(n * n + e * e);
}, Eu = function(n, e, A, t, i) {
  var r = [
    [0, 0],
    [0, e],
    [n, 0],
    [n, e]
  ];
  return r.reduce(function(s, a) {
    var o = a[0], l = a[1], c = pt(A - o, t - l);
    return (i ? c < s.optimumDistance : c > s.optimumDistance) ? {
      optimumCorner: a,
      optimumDistance: c
    } : s;
  }, {
    optimumDistance: i ? 1 / 0 : -1 / 0,
    optimumCorner: null
  }).optimumCorner;
}, Kv = function(n, e, A, t, i) {
  var r = 0, s = 0;
  switch (n.size) {
    case 0:
      n.shape === 0 ? r = s = Math.min(Math.abs(e), Math.abs(e - t), Math.abs(A), Math.abs(A - i)) : n.shape === 1 && (r = Math.min(Math.abs(e), Math.abs(e - t)), s = Math.min(Math.abs(A), Math.abs(A - i)));
      break;
    case 2:
      if (n.shape === 0)
        r = s = Math.min(pt(e, A), pt(e, A - i), pt(e - t, A), pt(e - t, A - i));
      else if (n.shape === 1) {
        var a = Math.min(Math.abs(A), Math.abs(A - i)) / Math.min(Math.abs(e), Math.abs(e - t)), o = Eu(t, i, e, A, !0), l = o[0], c = o[1];
        r = pt(l - e, (c - A) / a), s = a * r;
      }
      break;
    case 1:
      n.shape === 0 ? r = s = Math.max(Math.abs(e), Math.abs(e - t), Math.abs(A), Math.abs(A - i)) : n.shape === 1 && (r = Math.max(Math.abs(e), Math.abs(e - t)), s = Math.max(Math.abs(A), Math.abs(A - i)));
      break;
    case 3:
      if (n.shape === 0)
        r = s = Math.max(pt(e, A), pt(e, A - i), pt(e - t, A), pt(e - t, A - i));
      else if (n.shape === 1) {
        var a = Math.max(Math.abs(A), Math.abs(A - i)) / Math.max(Math.abs(e), Math.abs(e - t)), u = Eu(t, i, e, A, !1), l = u[0], c = u[1];
        r = pt(l - e, (c - A) / a), s = a * r;
      }
      break;
  }
  return Array.isArray(n.size) && (r = rA(n.size[0], t), s = n.size.length === 2 ? rA(n.size[1], i) : r), [r, s];
}, zv = function(n, e) {
  var A = ot(180), t = [];
  return yt(e).forEach(function(i, r) {
    if (r === 0) {
      var s = i[0];
      if (s.type === 20 && s.value === "to") {
        A = sf(i);
        return;
      } else if (rf(s)) {
        A = zs.parse(n, s);
        return;
      }
    }
    var a = Ws(n, i);
    t.push(a);
  }), {
    angle: A,
    stops: t,
    type: 1
    /* LINEAR_GRADIENT */
  };
}, rs = function(n, e) {
  var A = ot(180), t = [];
  return yt(e).forEach(function(i, r) {
    if (r === 0) {
      var s = i[0];
      if (s.type === 20 && ["top", "left", "right", "bottom"].indexOf(s.value) !== -1) {
        A = sf(i);
        return;
      } else if (rf(s)) {
        A = (zs.parse(n, s) + ot(270)) % ot(360);
        return;
      }
    }
    var a = Ws(n, i);
    t.push(a);
  }), {
    angle: A,
    stops: t,
    type: 1
    /* LINEAR_GRADIENT */
  };
}, Wv = function(n, e) {
  var A = ot(180), t = [], i = 1, r = 0, s = 3, a = [];
  return yt(e).forEach(function(o, l) {
    var c = o[0];
    if (l === 0) {
      if (iA(c) && c.value === "linear") {
        i = 1;
        return;
      } else if (iA(c) && c.value === "radial") {
        i = 2;
        return;
      }
    }
    if (c.type === 18) {
      if (c.name === "from") {
        var u = an.parse(n, c.values[0]);
        t.push({ stop: bA, color: u });
      } else if (c.name === "to") {
        var u = an.parse(n, c.values[0]);
        t.push({ stop: tn, color: u });
      } else if (c.name === "color-stop") {
        var f = c.values.filter(xi);
        if (f.length === 2) {
          var u = an.parse(n, f[1]), d = f[0];
          yi(d) && t.push({
            stop: { type: 16, number: d.number * 100, flags: d.flags },
            color: u
          });
        }
      }
    }
  }), i === 1 ? {
    angle: (A + ot(180)) % ot(360),
    stops: t,
    type: i
  } : { size: s, shape: r, stops: t, position: a, type: i };
}, af = "closest-side", of = "farthest-side", lf = "closest-corner", cf = "farthest-corner", uf = "circle", hf = "ellipse", ff = "cover", df = "contain", Xv = function(n, e) {
  var A = 0, t = 3, i = [], r = [];
  return yt(e).forEach(function(s, a) {
    var o = !0;
    if (a === 0) {
      var l = !1;
      o = s.reduce(function(u, f) {
        if (l)
          if (iA(f))
            switch (f.value) {
              case "center":
                return r.push(Tl), u;
              case "top":
              case "left":
                return r.push(bA), u;
              case "right":
              case "bottom":
                return r.push(tn), u;
            }
          else (_A(f) || un(f)) && r.push(f);
        else if (iA(f))
          switch (f.value) {
            case uf:
              return A = 0, !1;
            case hf:
              return A = 1, !1;
            case "at":
              return l = !0, !1;
            case af:
              return t = 0, !1;
            case ff:
            case of:
              return t = 1, !1;
            case df:
            case lf:
              return t = 2, !1;
            case cf:
              return t = 3, !1;
          }
        else if (un(f) || _A(f))
          return Array.isArray(t) || (t = []), t.push(f), !1;
        return u;
      }, o);
    }
    if (o) {
      var c = Ws(n, s);
      i.push(c);
    }
  }), {
    size: t,
    shape: A,
    stops: i,
    position: r,
    type: 2
    /* RADIAL_GRADIENT */
  };
}, ss = function(n, e) {
  var A = 0, t = 3, i = [], r = [];
  return yt(e).forEach(function(s, a) {
    var o = !0;
    if (a === 0 ? o = s.reduce(function(c, u) {
      if (iA(u))
        switch (u.value) {
          case "center":
            return r.push(Tl), !1;
          case "top":
          case "left":
            return r.push(bA), !1;
          case "right":
          case "bottom":
            return r.push(tn), !1;
        }
      else if (_A(u) || un(u))
        return r.push(u), !1;
      return c;
    }, o) : a === 1 && (o = s.reduce(function(c, u) {
      if (iA(u))
        switch (u.value) {
          case uf:
            return A = 0, !1;
          case hf:
            return A = 1, !1;
          case df:
          case af:
            return t = 0, !1;
          case of:
            return t = 1, !1;
          case lf:
            return t = 2, !1;
          case ff:
          case cf:
            return t = 3, !1;
        }
      else if (un(u) || _A(u))
        return Array.isArray(t) || (t = []), t.push(u), !1;
      return c;
    }, o)), o) {
      var l = Ws(n, s);
      i.push(l);
    }
  }), {
    size: t,
    shape: A,
    stops: i,
    position: r,
    type: 2
    /* RADIAL_GRADIENT */
  };
}, Yv = function(n) {
  return n.type === 1;
}, Jv = function(n) {
  return n.type === 2;
}, Ql = {
  name: "image",
  parse: function(n, e) {
    if (e.type === 22) {
      var A = {
        url: e.value,
        type: 0
        /* URL */
      };
      return n.cache.addImage(e.value), A;
    }
    if (e.type === 18) {
      var t = pf[e.name];
      if (typeof t > "u")
        throw new Error('Attempting to parse an unsupported image function "' + e.name + '"');
      return t(n, e.values);
    }
    throw new Error("Unsupported image type " + e.type);
  }
};
function qv(n) {
  return !(n.type === 20 && n.value === "none") && (n.type !== 18 || !!pf[n.name]);
}
var pf = {
  "linear-gradient": zv,
  "-moz-linear-gradient": rs,
  "-ms-linear-gradient": rs,
  "-o-linear-gradient": rs,
  "-webkit-linear-gradient": rs,
  "radial-gradient": Xv,
  "-moz-radial-gradient": ss,
  "-ms-radial-gradient": ss,
  "-o-radial-gradient": ss,
  "-webkit-radial-gradient": ss,
  "-webkit-gradient": Wv
}, Zv = {
  name: "background-image",
  initialValue: "none",
  type: 1,
  prefix: !1,
  parse: function(n, e) {
    if (e.length === 0)
      return [];
    var A = e[0];
    return A.type === 20 && A.value === "none" ? [] : e.filter(function(t) {
      return xi(t) && qv(t);
    }).map(function(t) {
      return Ql.parse(n, t);
    });
  }
}, jv = {
  name: "background-origin",
  initialValue: "border-box",
  prefix: !1,
  type: 1,
  parse: function(n, e) {
    return e.map(function(A) {
      if (iA(A))
        switch (A.value) {
          case "padding-box":
            return 1;
          case "content-box":
            return 2;
        }
      return 0;
    });
  }
}, $v = {
  name: "background-position",
  initialValue: "0% 0%",
  type: 1,
  prefix: !1,
  parse: function(n, e) {
    return yt(e).map(function(A) {
      return A.filter(_A);
    }).map($h);
  }
}, eC = {
  name: "background-repeat",
  initialValue: "repeat",
  prefix: !1,
  type: 1,
  parse: function(n, e) {
    return yt(e).map(function(A) {
      return A.filter(iA).map(function(t) {
        return t.value;
      }).join(" ");
    }).map(AC);
  }
}, AC = function(n) {
  switch (n) {
    case "no-repeat":
      return 1;
    case "repeat-x":
    case "repeat no-repeat":
      return 2;
    case "repeat-y":
    case "no-repeat repeat":
      return 3;
    case "repeat":
    default:
      return 0;
  }
}, gi;
(function(n) {
  n.AUTO = "auto", n.CONTAIN = "contain", n.COVER = "cover";
})(gi || (gi = {}));
var tC = {
  name: "background-size",
  initialValue: "0",
  prefix: !1,
  type: 1,
  parse: function(n, e) {
    return yt(e).map(function(A) {
      return A.filter(nC);
    });
  }
}, nC = function(n) {
  return iA(n) || _A(n);
}, Xs = function(n) {
  return {
    name: "border-" + n + "-color",
    initialValue: "transparent",
    prefix: !1,
    type: 3,
    format: "color"
  };
}, iC = Xs("top"), rC = Xs("right"), sC = Xs("bottom"), aC = Xs("left"), Ys = function(n) {
  return {
    name: "border-radius-" + n,
    initialValue: "0 0",
    prefix: !1,
    type: 1,
    parse: function(e, A) {
      return $h(A.filter(_A));
    }
  };
}, oC = Ys("top-left"), lC = Ys("top-right"), cC = Ys("bottom-right"), uC = Ys("bottom-left"), Js = function(n) {
  return {
    name: "border-" + n + "-style",
    initialValue: "solid",
    prefix: !1,
    type: 2,
    parse: function(e, A) {
      switch (A) {
        case "none":
          return 0;
        case "dashed":
          return 2;
        case "dotted":
          return 3;
        case "double":
          return 4;
      }
      return 1;
    }
  };
}, hC = Js("top"), fC = Js("right"), dC = Js("bottom"), pC = Js("left"), qs = function(n) {
  return {
    name: "border-" + n + "-width",
    initialValue: "0",
    type: 0,
    prefix: !1,
    parse: function(e, A) {
      return lr(A) ? A.number : 0;
    }
  };
}, gC = qs("top"), mC = qs("right"), BC = qs("bottom"), wC = qs("left"), _C = {
  name: "color",
  initialValue: "transparent",
  prefix: !1,
  type: 3,
  format: "color"
}, vC = {
  name: "direction",
  initialValue: "ltr",
  prefix: !1,
  type: 2,
  parse: function(n, e) {
    switch (e) {
      case "rtl":
        return 1;
      case "ltr":
      default:
        return 0;
    }
  }
}, CC = {
  name: "display",
  initialValue: "inline-block",
  prefix: !1,
  type: 1,
  parse: function(n, e) {
    return e.filter(iA).reduce(
      function(A, t) {
        return A | EC(t.value);
      },
      0
      /* NONE */
    );
  }
}, EC = function(n) {
  switch (n) {
    case "block":
    case "-webkit-box":
      return 2;
    case "inline":
      return 4;
    case "run-in":
      return 8;
    case "flow":
      return 16;
    case "flow-root":
      return 32;
    case "table":
      return 64;
    case "flex":
    case "-webkit-flex":
      return 128;
    case "grid":
    case "-ms-grid":
      return 256;
    case "ruby":
      return 512;
    case "subgrid":
      return 1024;
    case "list-item":
      return 2048;
    case "table-row-group":
      return 4096;
    case "table-header-group":
      return 8192;
    case "table-footer-group":
      return 16384;
    case "table-row":
      return 32768;
    case "table-cell":
      return 65536;
    case "table-column-group":
      return 131072;
    case "table-column":
      return 262144;
    case "table-caption":
      return 524288;
    case "ruby-base":
      return 1048576;
    case "ruby-text":
      return 2097152;
    case "ruby-base-container":
      return 4194304;
    case "ruby-text-container":
      return 8388608;
    case "contents":
      return 16777216;
    case "inline-block":
      return 33554432;
    case "inline-list-item":
      return 67108864;
    case "inline-table":
      return 134217728;
    case "inline-flex":
      return 268435456;
    case "inline-grid":
      return 536870912;
  }
  return 0;
}, xC = {
  name: "float",
  initialValue: "none",
  prefix: !1,
  type: 2,
  parse: function(n, e) {
    switch (e) {
      case "left":
        return 1;
      case "right":
        return 2;
      case "inline-start":
        return 3;
      case "inline-end":
        return 4;
    }
    return 0;
  }
}, UC = {
  name: "letter-spacing",
  initialValue: "0",
  prefix: !1,
  type: 0,
  parse: function(n, e) {
    return e.type === 20 && e.value === "normal" ? 0 : e.type === 17 || e.type === 15 ? e.number : 0;
  }
}, Ts;
(function(n) {
  n.NORMAL = "normal", n.STRICT = "strict";
})(Ts || (Ts = {}));
var yC = {
  name: "line-break",
  initialValue: "normal",
  prefix: !1,
  type: 2,
  parse: function(n, e) {
    switch (e) {
      case "strict":
        return Ts.STRICT;
      case "normal":
      default:
        return Ts.NORMAL;
    }
  }
}, SC = {
  name: "line-height",
  initialValue: "normal",
  prefix: !1,
  type: 4
  /* TOKEN_VALUE */
}, xu = function(n, e) {
  return iA(n) && n.value === "normal" ? 1.2 * e : n.type === 17 ? e * n.number : _A(n) ? rA(n, e) : e;
}, MC = {
  name: "list-style-image",
  initialValue: "none",
  type: 0,
  prefix: !1,
  parse: function(n, e) {
    return e.type === 20 && e.value === "none" ? null : Ql.parse(n, e);
  }
}, FC = {
  name: "list-style-position",
  initialValue: "outside",
  prefix: !1,
  type: 2,
  parse: function(n, e) {
    switch (e) {
      case "inside":
        return 0;
      case "outside":
      default:
        return 1;
    }
  }
}, ol = {
  name: "list-style-type",
  initialValue: "none",
  prefix: !1,
  type: 2,
  parse: function(n, e) {
    switch (e) {
      case "disc":
        return 0;
      case "circle":
        return 1;
      case "square":
        return 2;
      case "decimal":
        return 3;
      case "cjk-decimal":
        return 4;
      case "decimal-leading-zero":
        return 5;
      case "lower-roman":
        return 6;
      case "upper-roman":
        return 7;
      case "lower-greek":
        return 8;
      case "lower-alpha":
        return 9;
      case "upper-alpha":
        return 10;
      case "arabic-indic":
        return 11;
      case "armenian":
        return 12;
      case "bengali":
        return 13;
      case "cambodian":
        return 14;
      case "cjk-earthly-branch":
        return 15;
      case "cjk-heavenly-stem":
        return 16;
      case "cjk-ideographic":
        return 17;
      case "devanagari":
        return 18;
      case "ethiopic-numeric":
        return 19;
      case "georgian":
        return 20;
      case "gujarati":
        return 21;
      case "gurmukhi":
        return 22;
      case "hebrew":
        return 22;
      case "hiragana":
        return 23;
      case "hiragana-iroha":
        return 24;
      case "japanese-formal":
        return 25;
      case "japanese-informal":
        return 26;
      case "kannada":
        return 27;
      case "katakana":
        return 28;
      case "katakana-iroha":
        return 29;
      case "khmer":
        return 30;
      case "korean-hangul-formal":
        return 31;
      case "korean-hanja-formal":
        return 32;
      case "korean-hanja-informal":
        return 33;
      case "lao":
        return 34;
      case "lower-armenian":
        return 35;
      case "malayalam":
        return 36;
      case "mongolian":
        return 37;
      case "myanmar":
        return 38;
      case "oriya":
        return 39;
      case "persian":
        return 40;
      case "simp-chinese-formal":
        return 41;
      case "simp-chinese-informal":
        return 42;
      case "tamil":
        return 43;
      case "telugu":
        return 44;
      case "thai":
        return 45;
      case "tibetan":
        return 46;
      case "trad-chinese-formal":
        return 47;
      case "trad-chinese-informal":
        return 48;
      case "upper-armenian":
        return 49;
      case "disclosure-open":
        return 50;
      case "disclosure-closed":
        return 51;
      case "none":
      default:
        return -1;
    }
  }
}, Zs = function(n) {
  return {
    name: "margin-" + n,
    initialValue: "0",
    prefix: !1,
    type: 4
    /* TOKEN_VALUE */
  };
}, bC = Zs("top"), TC = Zs("right"), QC = Zs("bottom"), IC = Zs("left"), RC = {
  name: "overflow",
  initialValue: "visible",
  prefix: !1,
  type: 1,
  parse: function(n, e) {
    return e.filter(iA).map(function(A) {
      switch (A.value) {
        case "hidden":
          return 1;
        case "scroll":
          return 2;
        case "clip":
          return 3;
        case "auto":
          return 4;
        case "visible":
        default:
          return 0;
      }
    });
  }
}, LC = {
  name: "overflow-wrap",
  initialValue: "normal",
  prefix: !1,
  type: 2,
  parse: function(n, e) {
    switch (e) {
      case "break-word":
        return "break-word";
      case "normal":
      default:
        return "normal";
    }
  }
}, js = function(n) {
  return {
    name: "padding-" + n,
    initialValue: "0",
    prefix: !1,
    type: 3,
    format: "length-percentage"
  };
}, DC = js("top"), HC = js("right"), PC = js("bottom"), NC = js("left"), OC = {
  name: "text-align",
  initialValue: "left",
  prefix: !1,
  type: 2,
  parse: function(n, e) {
    switch (e) {
      case "right":
        return 2;
      case "center":
      case "justify":
        return 1;
      case "left":
      default:
        return 0;
    }
  }
}, GC = {
  name: "position",
  initialValue: "static",
  prefix: !1,
  type: 2,
  parse: function(n, e) {
    switch (e) {
      case "relative":
        return 1;
      case "absolute":
        return 2;
      case "fixed":
        return 3;
      case "sticky":
        return 4;
    }
    return 0;
  }
}, VC = {
  name: "text-shadow",
  initialValue: "none",
  type: 1,
  prefix: !1,
  parse: function(n, e) {
    return e.length === 1 && al(e[0], "none") ? [] : yt(e).map(function(A) {
      for (var t = {
        color: Ot.TRANSPARENT,
        offsetX: bA,
        offsetY: bA,
        blur: bA
      }, i = 0, r = 0; r < A.length; r++) {
        var s = A[r];
        un(s) ? (i === 0 ? t.offsetX = s : i === 1 ? t.offsetY = s : t.blur = s, i++) : t.color = an.parse(n, s);
      }
      return t;
    });
  }
}, kC = {
  name: "text-transform",
  initialValue: "none",
  prefix: !1,
  type: 2,
  parse: function(n, e) {
    switch (e) {
      case "uppercase":
        return 2;
      case "lowercase":
        return 1;
      case "capitalize":
        return 3;
    }
    return 0;
  }
}, KC = {
  name: "transform",
  initialValue: "none",
  prefix: !0,
  type: 0,
  parse: function(n, e) {
    if (e.type === 20 && e.value === "none")
      return null;
    if (e.type === 18) {
      var A = XC[e.name];
      if (typeof A > "u")
        throw new Error('Attempting to parse an unsupported transform function "' + e.name + '"');
      return A(e.values);
    }
    return null;
  }
}, zC = function(n) {
  var e = n.filter(function(A) {
    return A.type === 17;
  }).map(function(A) {
    return A.number;
  });
  return e.length === 6 ? e : null;
}, WC = function(n) {
  var e = n.filter(function(o) {
    return o.type === 17;
  }).map(function(o) {
    return o.number;
  }), A = e[0], t = e[1];
  e[2], e[3];
  var i = e[4], r = e[5];
  e[6], e[7], e[8], e[9], e[10], e[11];
  var s = e[12], a = e[13];
  return e[14], e[15], e.length === 16 ? [A, t, i, r, s, a] : null;
}, XC = {
  matrix: zC,
  matrix3d: WC
}, Uu = {
  type: 16,
  number: 50,
  flags: or
}, YC = [Uu, Uu], JC = {
  name: "transform-origin",
  initialValue: "50% 50%",
  prefix: !0,
  type: 1,
  parse: function(n, e) {
    var A = e.filter(_A);
    return A.length !== 2 ? YC : [A[0], A[1]];
  }
}, qC = {
  name: "visible",
  initialValue: "none",
  prefix: !1,
  type: 2,
  parse: function(n, e) {
    switch (e) {
      case "hidden":
        return 1;
      case "collapse":
        return 2;
      case "visible":
      default:
        return 0;
    }
  }
}, Ji;
(function(n) {
  n.NORMAL = "normal", n.BREAK_ALL = "break-all", n.KEEP_ALL = "keep-all";
})(Ji || (Ji = {}));
var ZC = {
  name: "word-break",
  initialValue: "normal",
  prefix: !1,
  type: 2,
  parse: function(n, e) {
    switch (e) {
      case "break-all":
        return Ji.BREAK_ALL;
      case "keep-all":
        return Ji.KEEP_ALL;
      case "normal":
      default:
        return Ji.NORMAL;
    }
  }
}, jC = {
  name: "z-index",
  initialValue: "auto",
  prefix: !1,
  type: 0,
  parse: function(n, e) {
    if (e.type === 20)
      return { auto: !0, order: 0 };
    if (yi(e))
      return { auto: !1, order: e.number };
    throw new Error("Invalid z-index number parsed");
  }
}, gf = {
  name: "time",
  parse: function(n, e) {
    if (e.type === 15)
      switch (e.unit.toLowerCase()) {
        case "s":
          return 1e3 * e.number;
        case "ms":
          return e.number;
      }
    throw new Error("Unsupported time type");
  }
}, $C = {
  name: "opacity",
  initialValue: "1",
  type: 0,
  prefix: !1,
  parse: function(n, e) {
    return yi(e) ? e.number : 1;
  }
}, eE = {
  name: "text-decoration-color",
  initialValue: "transparent",
  prefix: !1,
  type: 3,
  format: "color"
}, AE = {
  name: "text-decoration-line",
  initialValue: "none",
  prefix: !1,
  type: 1,
  parse: function(n, e) {
    return e.filter(iA).map(function(A) {
      switch (A.value) {
        case "underline":
          return 1;
        case "overline":
          return 2;
        case "line-through":
          return 3;
        case "none":
          return 4;
      }
      return 0;
    }).filter(function(A) {
      return A !== 0;
    });
  }
}, tE = {
  name: "font-family",
  initialValue: "",
  prefix: !1,
  type: 1,
  parse: function(n, e) {
    var A = [], t = [];
    return e.forEach(function(i) {
      switch (i.type) {
        case 20:
        case 0:
          A.push(i.value);
          break;
        case 17:
          A.push(i.number.toString());
          break;
        case 4:
          t.push(A.join(" ")), A.length = 0;
          break;
      }
    }), A.length && t.push(A.join(" ")), t.map(function(i) {
      return i.indexOf(" ") === -1 ? i : "'" + i + "'";
    });
  }
}, nE = {
  name: "font-size",
  initialValue: "0",
  prefix: !1,
  type: 3,
  format: "length"
}, iE = {
  name: "font-weight",
  initialValue: "normal",
  type: 0,
  prefix: !1,
  parse: function(n, e) {
    if (yi(e))
      return e.number;
    if (iA(e))
      switch (e.value) {
        case "bold":
          return 700;
        case "normal":
        default:
          return 400;
      }
    return 400;
  }
}, rE = {
  name: "font-variant",
  initialValue: "none",
  type: 1,
  prefix: !1,
  parse: function(n, e) {
    return e.filter(iA).map(function(A) {
      return A.value;
    });
  }
}, sE = {
  name: "font-style",
  initialValue: "normal",
  prefix: !1,
  type: 2,
  parse: function(n, e) {
    switch (e) {
      case "oblique":
        return "oblique";
      case "italic":
        return "italic";
      case "normal":
      default:
        return "normal";
    }
  }
}, CA = function(n, e) {
  return (n & e) !== 0;
}, aE = {
  name: "content",
  initialValue: "none",
  type: 1,
  prefix: !1,
  parse: function(n, e) {
    if (e.length === 0)
      return [];
    var A = e[0];
    return A.type === 20 && A.value === "none" ? [] : e;
  }
}, oE = {
  name: "counter-increment",
  initialValue: "none",
  prefix: !0,
  type: 1,
  parse: function(n, e) {
    if (e.length === 0)
      return null;
    var A = e[0];
    if (A.type === 20 && A.value === "none")
      return null;
    for (var t = [], i = e.filter(jh), r = 0; r < i.length; r++) {
      var s = i[r], a = i[r + 1];
      if (s.type === 20) {
        var o = a && yi(a) ? a.number : 1;
        t.push({ counter: s.value, increment: o });
      }
    }
    return t;
  }
}, lE = {
  name: "counter-reset",
  initialValue: "none",
  prefix: !0,
  type: 1,
  parse: function(n, e) {
    if (e.length === 0)
      return [];
    for (var A = [], t = e.filter(jh), i = 0; i < t.length; i++) {
      var r = t[i], s = t[i + 1];
      if (iA(r) && r.value !== "none") {
        var a = s && yi(s) ? s.number : 0;
        A.push({ counter: r.value, reset: a });
      }
    }
    return A;
  }
}, cE = {
  name: "duration",
  initialValue: "0s",
  prefix: !1,
  type: 1,
  parse: function(n, e) {
    return e.filter(lr).map(function(A) {
      return gf.parse(n, A);
    });
  }
}, uE = {
  name: "quotes",
  initialValue: "none",
  prefix: !0,
  type: 1,
  parse: function(n, e) {
    if (e.length === 0)
      return null;
    var A = e[0];
    if (A.type === 20 && A.value === "none")
      return null;
    var t = [], i = e.filter(Hv);
    if (i.length % 2 !== 0)
      return null;
    for (var r = 0; r < i.length; r += 2) {
      var s = i[r].value, a = i[r + 1].value;
      t.push({ open: s, close: a });
    }
    return t;
  }
}, yu = function(n, e, A) {
  if (!n)
    return "";
  var t = n[Math.min(e, n.length - 1)];
  return t ? A ? t.open : t.close : "";
}, hE = {
  name: "box-shadow",
  initialValue: "none",
  type: 1,
  prefix: !1,
  parse: function(n, e) {
    return e.length === 1 && al(e[0], "none") ? [] : yt(e).map(function(A) {
      for (var t = {
        color: 255,
        offsetX: bA,
        offsetY: bA,
        blur: bA,
        spread: bA,
        inset: !1
      }, i = 0, r = 0; r < A.length; r++) {
        var s = A[r];
        al(s, "inset") ? t.inset = !0 : un(s) ? (i === 0 ? t.offsetX = s : i === 1 ? t.offsetY = s : i === 2 ? t.blur = s : t.spread = s, i++) : t.color = an.parse(n, s);
      }
      return t;
    });
  }
}, fE = {
  name: "paint-order",
  initialValue: "normal",
  prefix: !1,
  type: 1,
  parse: function(n, e) {
    var A = [
      0,
      1,
      2
      /* MARKERS */
    ], t = [];
    return e.filter(iA).forEach(function(i) {
      switch (i.value) {
        case "stroke":
          t.push(
            1
            /* STROKE */
          );
          break;
        case "fill":
          t.push(
            0
            /* FILL */
          );
          break;
        case "markers":
          t.push(
            2
            /* MARKERS */
          );
          break;
      }
    }), A.forEach(function(i) {
      t.indexOf(i) === -1 && t.push(i);
    }), t;
  }
}, dE = {
  name: "-webkit-text-stroke-color",
  initialValue: "currentcolor",
  prefix: !1,
  type: 3,
  format: "color"
}, pE = {
  name: "-webkit-text-stroke-width",
  initialValue: "0",
  type: 0,
  prefix: !1,
  parse: function(n, e) {
    return lr(e) ? e.number : 0;
  }
}, gE = (
  /** @class */
  (function() {
    function n(e, A) {
      var t, i;
      this.animationDuration = ge(e, cE, A.animationDuration), this.backgroundClip = ge(e, Ov, A.backgroundClip), this.backgroundColor = ge(e, Gv, A.backgroundColor), this.backgroundImage = ge(e, Zv, A.backgroundImage), this.backgroundOrigin = ge(e, jv, A.backgroundOrigin), this.backgroundPosition = ge(e, $v, A.backgroundPosition), this.backgroundRepeat = ge(e, eC, A.backgroundRepeat), this.backgroundSize = ge(e, tC, A.backgroundSize), this.borderTopColor = ge(e, iC, A.borderTopColor), this.borderRightColor = ge(e, rC, A.borderRightColor), this.borderBottomColor = ge(e, sC, A.borderBottomColor), this.borderLeftColor = ge(e, aC, A.borderLeftColor), this.borderTopLeftRadius = ge(e, oC, A.borderTopLeftRadius), this.borderTopRightRadius = ge(e, lC, A.borderTopRightRadius), this.borderBottomRightRadius = ge(e, cC, A.borderBottomRightRadius), this.borderBottomLeftRadius = ge(e, uC, A.borderBottomLeftRadius), this.borderTopStyle = ge(e, hC, A.borderTopStyle), this.borderRightStyle = ge(e, fC, A.borderRightStyle), this.borderBottomStyle = ge(e, dC, A.borderBottomStyle), this.borderLeftStyle = ge(e, pC, A.borderLeftStyle), this.borderTopWidth = ge(e, gC, A.borderTopWidth), this.borderRightWidth = ge(e, mC, A.borderRightWidth), this.borderBottomWidth = ge(e, BC, A.borderBottomWidth), this.borderLeftWidth = ge(e, wC, A.borderLeftWidth), this.boxShadow = ge(e, hE, A.boxShadow), this.color = ge(e, _C, A.color), this.direction = ge(e, vC, A.direction), this.display = ge(e, CC, A.display), this.float = ge(e, xC, A.cssFloat), this.fontFamily = ge(e, tE, A.fontFamily), this.fontSize = ge(e, nE, A.fontSize), this.fontStyle = ge(e, sE, A.fontStyle), this.fontVariant = ge(e, rE, A.fontVariant), this.fontWeight = ge(e, iE, A.fontWeight), this.letterSpacing = ge(e, UC, A.letterSpacing), this.lineBreak = ge(e, yC, A.lineBreak), this.lineHeight = ge(e, SC, A.lineHeight), this.listStyleImage = ge(e, MC, A.listStyleImage), this.listStylePosition = ge(e, FC, A.listStylePosition), this.listStyleType = ge(e, ol, A.listStyleType), this.marginTop = ge(e, bC, A.marginTop), this.marginRight = ge(e, TC, A.marginRight), this.marginBottom = ge(e, QC, A.marginBottom), this.marginLeft = ge(e, IC, A.marginLeft), this.opacity = ge(e, $C, A.opacity);
      var r = ge(e, RC, A.overflow);
      this.overflowX = r[0], this.overflowY = r[r.length > 1 ? 1 : 0], this.overflowWrap = ge(e, LC, A.overflowWrap), this.paddingTop = ge(e, DC, A.paddingTop), this.paddingRight = ge(e, HC, A.paddingRight), this.paddingBottom = ge(e, PC, A.paddingBottom), this.paddingLeft = ge(e, NC, A.paddingLeft), this.paintOrder = ge(e, fE, A.paintOrder), this.position = ge(e, GC, A.position), this.textAlign = ge(e, OC, A.textAlign), this.textDecorationColor = ge(e, eE, (t = A.textDecorationColor) !== null && t !== void 0 ? t : A.color), this.textDecorationLine = ge(e, AE, (i = A.textDecorationLine) !== null && i !== void 0 ? i : A.textDecoration), this.textShadow = ge(e, VC, A.textShadow), this.textTransform = ge(e, kC, A.textTransform), this.transform = ge(e, KC, A.transform), this.transformOrigin = ge(e, JC, A.transformOrigin), this.visibility = ge(e, qC, A.visibility), this.webkitTextStrokeColor = ge(e, dE, A.webkitTextStrokeColor), this.webkitTextStrokeWidth = ge(e, pE, A.webkitTextStrokeWidth), this.wordBreak = ge(e, ZC, A.wordBreak), this.zIndex = ge(e, jC, A.zIndex);
    }
    return n.prototype.isVisible = function() {
      return this.display > 0 && this.opacity > 0 && this.visibility === 0;
    }, n.prototype.isTransparent = function() {
      return on(this.backgroundColor);
    }, n.prototype.isTransformed = function() {
      return this.transform !== null;
    }, n.prototype.isPositioned = function() {
      return this.position !== 0;
    }, n.prototype.isPositionedWithZIndex = function() {
      return this.isPositioned() && !this.zIndex.auto;
    }, n.prototype.isFloating = function() {
      return this.float !== 0;
    }, n.prototype.isInlineLevel = function() {
      return CA(
        this.display,
        4
        /* INLINE */
      ) || CA(
        this.display,
        33554432
        /* INLINE_BLOCK */
      ) || CA(
        this.display,
        268435456
        /* INLINE_FLEX */
      ) || CA(
        this.display,
        536870912
        /* INLINE_GRID */
      ) || CA(
        this.display,
        67108864
        /* INLINE_LIST_ITEM */
      ) || CA(
        this.display,
        134217728
        /* INLINE_TABLE */
      );
    }, n;
  })()
), mE = (
  /** @class */
  /* @__PURE__ */ (function() {
    function n(e, A) {
      this.content = ge(e, aE, A.content), this.quotes = ge(e, uE, A.quotes);
    }
    return n;
  })()
), Su = (
  /** @class */
  /* @__PURE__ */ (function() {
    function n(e, A) {
      this.counterIncrement = ge(e, oE, A.counterIncrement), this.counterReset = ge(e, lE, A.counterReset);
    }
    return n;
  })()
), ge = function(n, e, A) {
  var t = new qh(), i = A !== null && typeof A < "u" ? A.toString() : e.initialValue;
  t.write(i);
  var r = new Zh(t.read());
  switch (e.type) {
    case 2:
      var s = r.parseComponentValue();
      return e.parse(n, iA(s) ? s.value : e.initialValue);
    case 0:
      return e.parse(n, r.parseComponentValue());
    case 1:
      return e.parse(n, r.parseComponentValues());
    case 4:
      return r.parseComponentValue();
    case 3:
      switch (e.format) {
        case "angle":
          return zs.parse(n, r.parseComponentValue());
        case "color":
          return an.parse(n, r.parseComponentValue());
        case "image":
          return Ql.parse(n, r.parseComponentValue());
        case "length":
          var a = r.parseComponentValue();
          return un(a) ? a : bA;
        case "length-percentage":
          var o = r.parseComponentValue();
          return _A(o) ? o : bA;
        case "time":
          return gf.parse(n, r.parseComponentValue());
      }
      break;
  }
}, BE = "data-html2canvas-debug", wE = function(n) {
  var e = n.getAttribute(BE);
  switch (e) {
    case "all":
      return 1;
    case "clone":
      return 2;
    case "parse":
      return 3;
    case "render":
      return 4;
    default:
      return 0;
  }
}, ll = function(n, e) {
  var A = wE(n);
  return A === 1 || e === A;
}, St = (
  /** @class */
  /* @__PURE__ */ (function() {
    function n(e, A) {
      if (this.context = e, this.textNodes = [], this.elements = [], this.flags = 0, ll(
        A,
        3
        /* PARSE */
      ))
        debugger;
      this.styles = new gE(e, window.getComputedStyle(A, null)), hl(A) && (this.styles.animationDuration.some(function(t) {
        return t > 0;
      }) && (A.style.animationDuration = "0s"), this.styles.transform !== null && (A.style.transform = "none")), this.bounds = ks(this.context, A), ll(
        A,
        4
        /* RENDER */
      ) && (this.flags |= 16);
    }
    return n;
  })()
), _E = "AAAAAAAAAAAAEA4AGBkAAFAaAAACAAAAAAAIABAAGAAwADgACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAAQABIAEQATAAIABAACAAQAAgAEAAIABAAVABcAAgAEAAIABAACAAQAGAAaABwAHgAgACIAI4AlgAIABAAmwCjAKgAsAC2AL4AvQDFAMoA0gBPAVYBWgEIAAgACACMANoAYgFkAWwBdAF8AX0BhQGNAZUBlgGeAaMBlQGWAasBswF8AbsBwwF0AcsBYwHTAQgA2wG/AOMBdAF8AekB8QF0AfkB+wHiAHQBfAEIAAMC5gQIAAsCEgIIAAgAFgIeAggAIgIpAggAMQI5AkACygEIAAgASAJQAlgCYAIIAAgACAAKBQoFCgUTBRMFGQUrBSsFCAAIAAgACAAIAAgACAAIAAgACABdAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABoAmgCrwGvAQgAbgJ2AggAHgEIAAgACADnAXsCCAAIAAgAgwIIAAgACAAIAAgACACKAggAkQKZAggAPADJAAgAoQKkAqwCsgK6AsICCADJAggA0AIIAAgACAAIANYC3gIIAAgACAAIAAgACABAAOYCCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAkASoB+QIEAAgACAA8AEMCCABCBQgACABJBVAFCAAIAAgACAAIAAgACAAIAAgACABTBVoFCAAIAFoFCABfBWUFCAAIAAgACAAIAAgAbQUIAAgACAAIAAgACABzBXsFfQWFBYoFigWKBZEFigWKBYoFmAWfBaYFrgWxBbkFCAAIAAgACAAIAAgACAAIAAgACAAIAMEFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAMgFCADQBQgACAAIAAgACAAIAAgACAAIAAgACAAIAO4CCAAIAAgAiQAIAAgACABAAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAD0AggACAD8AggACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIANYFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAMDvwAIAAgAJAIIAAgACAAIAAgACAAIAAgACwMTAwgACAB9BOsEGwMjAwgAKwMyAwsFYgE3A/MEPwMIAEUDTQNRAwgAWQOsAGEDCAAIAAgACAAIAAgACABpAzQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFIQUoBSwFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABtAwgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABMAEwACAAIAAgACAAIABgACAAIAAgACAC/AAgACAAyAQgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACAAIAAwAAgACAAIAAgACAAIAAgACAAIAAAARABIAAgACAAIABQASAAIAAgAIABwAEAAjgCIABsAqAC2AL0AigDQAtwC+IJIQqVAZUBWQqVAZUBlQGVAZUBlQGrC5UBlQGVAZUBlQGVAZUBlQGVAXsKlQGVAbAK6wsrDGUMpQzlDJUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAfAKAAuZA64AtwCJALoC6ADwAAgAuACgA/oEpgO6AqsD+AAIAAgAswMIAAgACAAIAIkAuwP5AfsBwwPLAwgACAAIAAgACADRA9kDCAAIAOED6QMIAAgACAAIAAgACADuA/YDCAAIAP4DyQAIAAgABgQIAAgAXQAOBAgACAAIAAgACAAIABMECAAIAAgACAAIAAgACAD8AAQBCAAIAAgAGgQiBCoECAExBAgAEAEIAAgACAAIAAgACAAIAAgACAAIAAgACAA4BAgACABABEYECAAIAAgATAQYAQgAVAQIAAgACAAIAAgACAAIAAgACAAIAFoECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAOQEIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAB+BAcACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAEABhgSMBAgACAAIAAgAlAQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAwAEAAQABAADAAMAAwADAAQABAAEAAQABAAEAAQABHATAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAdQMIAAgACAAIAAgACAAIAMkACAAIAAgAfQMIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACFA4kDCAAIAAgACAAIAOcBCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAIcDCAAIAAgACAAIAAgACAAIAAgACAAIAJEDCAAIAAgACADFAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABgBAgAZgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAbAQCBXIECAAIAHkECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABAAJwEQACjBKoEsgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAC6BMIECAAIAAgACAAIAAgACABmBAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAxwQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAGYECAAIAAgAzgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBd0FXwUIAOIF6gXxBYoF3gT5BQAGCAaKBYoFigWKBYoFigWKBYoFigWKBYoFigXWBIoFigWKBYoFigWKBYoFigWKBYsFEAaKBYoFigWKBYoFigWKBRQGCACKBYoFigWKBQgACAAIANEECAAIABgGigUgBggAJgYIAC4GMwaKBYoF0wQ3Bj4GigWKBYoFigWKBYoFigWKBYoFigWKBYoFigUIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWLBf///////wQABAAEAAQABAAEAAQABAAEAAQAAwAEAAQAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAQADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUAAAAFAAUAAAAFAAUAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAQAAAAUABQAFAAUABQAFAAAAAAAFAAUAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAFAAUAAQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAAABwAHAAcAAAAHAAcABwAFAAEAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAcABwAFAAUAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAQABAAAAAAAAAAAAAAAFAAUABQAFAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAHAAcAAAAHAAcAAAAAAAUABQAHAAUAAQAHAAEABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwABAAUABQAFAAUAAAAAAAAAAAAAAAEAAQABAAEAAQABAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABQANAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAABQAHAAUABQAFAAAAAAAAAAcABQAFAAUABQAFAAQABAAEAAQABAAEAAQABAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUAAAAFAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAUAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAcABwAFAAcABwAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUABwAHAAUABQAFAAUAAAAAAAcABwAAAAAABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAAAAAAAAAAABQAFAAAAAAAFAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAFAAUABQAFAAUAAAAFAAUABwAAAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABwAFAAUABQAFAAAAAAAHAAcAAAAAAAcABwAFAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAAAAAAAAAHAAcABwAAAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAUABQAFAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAHAAcABQAHAAcAAAAFAAcABwAAAAcABwAFAAUAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAFAAcABwAFAAUABQAAAAUAAAAHAAcABwAHAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAHAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUAAAAFAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAUAAAAFAAUAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABwAFAAUABQAFAAUABQAAAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABQAFAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAFAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAHAAUABQAFAAUABQAFAAUABwAHAAcABwAHAAcABwAHAAUABwAHAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABwAHAAcABwAFAAUABwAHAAcAAAAAAAAAAAAHAAcABQAHAAcABwAHAAcABwAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAUABQAFAAUABQAFAAUAAAAFAAAABQAAAAAABQAFAAUABQAFAAUABQAFAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAUABQAFAAUABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABwAFAAcABwAHAAcABwAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAUABQAFAAUABwAHAAUABQAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABQAFAAcABwAHAAUABwAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAcABQAFAAUABQAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAAAAAABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAAAAAAAAAFAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAUABQAHAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAFAAUABQAFAAcABwAFAAUABwAHAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAcABwAFAAUABwAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABQAAAAAABQAFAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAcABwAAAAAAAAAAAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAcABwAFAAcABwAAAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAFAAUABQAAAAUABQAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABwAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAHAAcABQAHAAUABQAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAAABwAHAAAAAAAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAFAAUABwAFAAcABwAFAAcABQAFAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAAAAAABwAHAAcABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAFAAcABwAFAAUABQAFAAUABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAUABQAFAAcABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABQAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAAAAAAFAAUABwAHAAcABwAFAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAHAAUABQAFAAUABQAFAAUABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAABQAAAAUABQAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAHAAcAAAAFAAUAAAAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABQAFAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAABQAFAAUABQAFAAUABQAAAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAFAAUABQAFAAUADgAOAA4ADgAOAA4ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAMAAwADAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAAAAAAAAAAAAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAAAAAAAAAAAAsADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwACwAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAADgAOAA4AAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAAAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4AAAAOAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAAAAAAAAAAAA4AAAAOAAAAAAAAAAAADgAOAA4AAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAA=", Mu = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", Ki = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (var as = 0; as < Mu.length; as++)
  Ki[Mu.charCodeAt(as)] = as;
var vE = function(n) {
  var e = n.length * 0.75, A = n.length, t, i = 0, r, s, a, o;
  n[n.length - 1] === "=" && (e--, n[n.length - 2] === "=" && e--);
  var l = typeof ArrayBuffer < "u" && typeof Uint8Array < "u" && typeof Uint8Array.prototype.slice < "u" ? new ArrayBuffer(e) : new Array(e), c = Array.isArray(l) ? l : new Uint8Array(l);
  for (t = 0; t < A; t += 4)
    r = Ki[n.charCodeAt(t)], s = Ki[n.charCodeAt(t + 1)], a = Ki[n.charCodeAt(t + 2)], o = Ki[n.charCodeAt(t + 3)], c[i++] = r << 2 | s >> 4, c[i++] = (s & 15) << 4 | a >> 2, c[i++] = (a & 3) << 6 | o & 63;
  return l;
}, CE = function(n) {
  for (var e = n.length, A = [], t = 0; t < e; t += 2)
    A.push(n[t + 1] << 8 | n[t]);
  return A;
}, EE = function(n) {
  for (var e = n.length, A = [], t = 0; t < e; t += 4)
    A.push(n[t + 3] << 24 | n[t + 2] << 16 | n[t + 1] << 8 | n[t]);
  return A;
}, Tn = 5, Il = 11, Va = 2, xE = Il - Tn, mf = 65536 >> Tn, UE = 1 << Tn, ka = UE - 1, yE = 1024 >> Tn, SE = mf + yE, ME = SE, FE = 32, bE = ME + FE, TE = 65536 >> Il, QE = 1 << xE, IE = QE - 1, Fu = function(n, e, A) {
  return n.slice ? n.slice(e, A) : new Uint16Array(Array.prototype.slice.call(n, e, A));
}, RE = function(n, e, A) {
  return n.slice ? n.slice(e, A) : new Uint32Array(Array.prototype.slice.call(n, e, A));
}, LE = function(n, e) {
  var A = vE(n), t = Array.isArray(A) ? EE(A) : new Uint32Array(A), i = Array.isArray(A) ? CE(A) : new Uint16Array(A), r = 24, s = Fu(i, r / 2, t[4] / 2), a = t[5] === 2 ? Fu(i, (r + t[4]) / 2) : RE(t, Math.ceil((r + t[4]) / 4));
  return new DE(t[0], t[1], t[2], t[3], s, a);
}, DE = (
  /** @class */
  (function() {
    function n(e, A, t, i, r, s) {
      this.initialValue = e, this.errorValue = A, this.highStart = t, this.highValueIndex = i, this.index = r, this.data = s;
    }
    return n.prototype.get = function(e) {
      var A;
      if (e >= 0) {
        if (e < 55296 || e > 56319 && e <= 65535)
          return A = this.index[e >> Tn], A = (A << Va) + (e & ka), this.data[A];
        if (e <= 65535)
          return A = this.index[mf + (e - 55296 >> Tn)], A = (A << Va) + (e & ka), this.data[A];
        if (e < this.highStart)
          return A = bE - TE + (e >> Il), A = this.index[A], A += e >> Tn & IE, A = this.index[A], A = (A << Va) + (e & ka), this.data[A];
        if (e <= 1114111)
          return this.data[this.highValueIndex];
      }
      return this.errorValue;
    }, n;
  })()
), bu = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", HE = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (var os = 0; os < bu.length; os++)
  HE[bu.charCodeAt(os)] = os;
var PE = 1, Ka = 2, za = 3, Tu = 4, Qu = 5, NE = 7, Iu = 8, Wa = 9, Xa = 10, Ru = 11, Lu = 12, Du = 13, Hu = 14, Ya = 15, OE = function(n) {
  for (var e = [], A = 0, t = n.length; A < t; ) {
    var i = n.charCodeAt(A++);
    if (i >= 55296 && i <= 56319 && A < t) {
      var r = n.charCodeAt(A++);
      (r & 64512) === 56320 ? e.push(((i & 1023) << 10) + (r & 1023) + 65536) : (e.push(i), A--);
    } else
      e.push(i);
  }
  return e;
}, GE = function() {
  for (var n = [], e = 0; e < arguments.length; e++)
    n[e] = arguments[e];
  if (String.fromCodePoint)
    return String.fromCodePoint.apply(String, n);
  var A = n.length;
  if (!A)
    return "";
  for (var t = [], i = -1, r = ""; ++i < A; ) {
    var s = n[i];
    s <= 65535 ? t.push(s) : (s -= 65536, t.push((s >> 10) + 55296, s % 1024 + 56320)), (i + 1 === A || t.length > 16384) && (r += String.fromCharCode.apply(String, t), t.length = 0);
  }
  return r;
}, VE = LE(_E), nt = "×", Ja = "÷", kE = function(n) {
  return VE.get(n);
}, KE = function(n, e, A) {
  var t = A - 2, i = e[t], r = e[A - 1], s = e[A];
  if (r === Ka && s === za)
    return nt;
  if (r === Ka || r === za || r === Tu || s === Ka || s === za || s === Tu)
    return Ja;
  if (r === Iu && [Iu, Wa, Ru, Lu].indexOf(s) !== -1 || (r === Ru || r === Wa) && (s === Wa || s === Xa) || (r === Lu || r === Xa) && s === Xa || s === Du || s === Qu || s === NE || r === PE)
    return nt;
  if (r === Du && s === Hu) {
    for (; i === Qu; )
      i = e[--t];
    if (i === Hu)
      return nt;
  }
  if (r === Ya && s === Ya) {
    for (var a = 0; i === Ya; )
      a++, i = e[--t];
    if (a % 2 === 0)
      return nt;
  }
  return Ja;
}, zE = function(n) {
  var e = OE(n), A = e.length, t = 0, i = 0, r = e.map(kE);
  return {
    next: function() {
      if (t >= A)
        return { done: !0, value: null };
      for (var s = nt; t < A && (s = KE(e, r, ++t)) === nt; )
        ;
      if (s !== nt || t === A) {
        var a = GE.apply(null, e.slice(i, t));
        return i = t, { value: a, done: !1 };
      }
      return { done: !0, value: null };
    }
  };
}, WE = function(n) {
  for (var e = zE(n), A = [], t; !(t = e.next()).done; )
    t.value && A.push(t.value.slice());
  return A;
}, XE = function(n) {
  var e = 123;
  if (n.createRange) {
    var A = n.createRange();
    if (A.getBoundingClientRect) {
      var t = n.createElement("boundtest");
      t.style.height = e + "px", t.style.display = "block", n.body.appendChild(t), A.selectNode(t);
      var i = A.getBoundingClientRect(), r = Math.round(i.height);
      if (n.body.removeChild(t), r === e)
        return !0;
    }
  }
  return !1;
}, YE = function(n) {
  var e = n.createElement("boundtest");
  e.style.width = "50px", e.style.display = "block", e.style.fontSize = "12px", e.style.letterSpacing = "0px", e.style.wordSpacing = "0px", n.body.appendChild(e);
  var A = n.createRange();
  e.innerHTML = typeof "".repeat == "function" ? "&#128104;".repeat(10) : "";
  var t = e.firstChild, i = Ks(t.data).map(function(o) {
    return gA(o);
  }), r = 0, s = {}, a = i.every(function(o, l) {
    A.setStart(t, r), A.setEnd(t, r + o.length);
    var c = A.getBoundingClientRect();
    r += o.length;
    var u = c.x > s.x || c.y > s.y;
    return s = c, l === 0 ? !0 : u;
  });
  return n.body.removeChild(e), a;
}, JE = function() {
  return typeof new Image().crossOrigin < "u";
}, qE = function() {
  return typeof new XMLHttpRequest().responseType == "string";
}, ZE = function(n) {
  var e = new Image(), A = n.createElement("canvas"), t = A.getContext("2d");
  if (!t)
    return !1;
  e.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
  try {
    t.drawImage(e, 0, 0), A.toDataURL();
  } catch {
    return !1;
  }
  return !0;
}, Pu = function(n) {
  return n[0] === 0 && n[1] === 255 && n[2] === 0 && n[3] === 255;
}, jE = function(n) {
  var e = n.createElement("canvas"), A = 100;
  e.width = A, e.height = A;
  var t = e.getContext("2d");
  if (!t)
    return Promise.reject(!1);
  t.fillStyle = "rgb(0, 255, 0)", t.fillRect(0, 0, A, A);
  var i = new Image(), r = e.toDataURL();
  i.src = r;
  var s = cl(A, A, 0, 0, i);
  return t.fillStyle = "red", t.fillRect(0, 0, A, A), Nu(s).then(function(a) {
    t.drawImage(a, 0, 0);
    var o = t.getImageData(0, 0, A, A).data;
    t.fillStyle = "red", t.fillRect(0, 0, A, A);
    var l = n.createElement("div");
    return l.style.backgroundImage = "url(" + r + ")", l.style.height = A + "px", Pu(o) ? Nu(cl(A, A, 0, 0, l)) : Promise.reject(!1);
  }).then(function(a) {
    return t.drawImage(a, 0, 0), Pu(t.getImageData(0, 0, A, A).data);
  }).catch(function() {
    return !1;
  });
}, cl = function(n, e, A, t, i) {
  var r = "http://www.w3.org/2000/svg", s = document.createElementNS(r, "svg"), a = document.createElementNS(r, "foreignObject");
  return s.setAttributeNS(null, "width", n.toString()), s.setAttributeNS(null, "height", e.toString()), a.setAttributeNS(null, "width", "100%"), a.setAttributeNS(null, "height", "100%"), a.setAttributeNS(null, "x", A.toString()), a.setAttributeNS(null, "y", t.toString()), a.setAttributeNS(null, "externalResourcesRequired", "true"), s.appendChild(a), a.appendChild(i), s;
}, Nu = function(n) {
  return new Promise(function(e, A) {
    var t = new Image();
    t.onload = function() {
      return e(t);
    }, t.onerror = A, t.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(n));
  });
}, FA = {
  get SUPPORT_RANGE_BOUNDS() {
    var n = XE(document);
    return Object.defineProperty(FA, "SUPPORT_RANGE_BOUNDS", { value: n }), n;
  },
  get SUPPORT_WORD_BREAKING() {
    var n = FA.SUPPORT_RANGE_BOUNDS && YE(document);
    return Object.defineProperty(FA, "SUPPORT_WORD_BREAKING", { value: n }), n;
  },
  get SUPPORT_SVG_DRAWING() {
    var n = ZE(document);
    return Object.defineProperty(FA, "SUPPORT_SVG_DRAWING", { value: n }), n;
  },
  get SUPPORT_FOREIGNOBJECT_DRAWING() {
    var n = typeof Array.from == "function" && typeof window.fetch == "function" ? jE(document) : Promise.resolve(!1);
    return Object.defineProperty(FA, "SUPPORT_FOREIGNOBJECT_DRAWING", { value: n }), n;
  },
  get SUPPORT_CORS_IMAGES() {
    var n = JE();
    return Object.defineProperty(FA, "SUPPORT_CORS_IMAGES", { value: n }), n;
  },
  get SUPPORT_RESPONSE_TYPE() {
    var n = qE();
    return Object.defineProperty(FA, "SUPPORT_RESPONSE_TYPE", { value: n }), n;
  },
  get SUPPORT_CORS_XHR() {
    var n = "withCredentials" in new XMLHttpRequest();
    return Object.defineProperty(FA, "SUPPORT_CORS_XHR", { value: n }), n;
  },
  get SUPPORT_NATIVE_TEXT_SEGMENTATION() {
    var n = !!(typeof Intl < "u" && Intl.Segmenter);
    return Object.defineProperty(FA, "SUPPORT_NATIVE_TEXT_SEGMENTATION", { value: n }), n;
  }
}, qi = (
  /** @class */
  /* @__PURE__ */ (function() {
    function n(e, A) {
      this.text = e, this.bounds = A;
    }
    return n;
  })()
), $E = function(n, e, A, t) {
  var i = tx(e, A), r = [], s = 0;
  return i.forEach(function(a) {
    if (A.textDecorationLine.length || a.trim().length > 0)
      if (FA.SUPPORT_RANGE_BOUNDS) {
        var o = Ou(t, s, a.length).getClientRects();
        if (o.length > 1) {
          var l = Rl(a), c = 0;
          l.forEach(function(f) {
            r.push(new qi(f, kt.fromDOMRectList(n, Ou(t, c + s, f.length).getClientRects()))), c += f.length;
          });
        } else
          r.push(new qi(a, kt.fromDOMRectList(n, o)));
      } else {
        var u = t.splitText(a.length);
        r.push(new qi(a, ex(n, t))), t = u;
      }
    else FA.SUPPORT_RANGE_BOUNDS || (t = t.splitText(a.length));
    s += a.length;
  }), r;
}, ex = function(n, e) {
  var A = e.ownerDocument;
  if (A) {
    var t = A.createElement("html2canvaswrapper");
    t.appendChild(e.cloneNode(!0));
    var i = e.parentNode;
    if (i) {
      i.replaceChild(t, e);
      var r = ks(n, t);
      return t.firstChild && i.replaceChild(t.firstChild, t), r;
    }
  }
  return kt.EMPTY;
}, Ou = function(n, e, A) {
  var t = n.ownerDocument;
  if (!t)
    throw new Error("Node has no owner document");
  var i = t.createRange();
  return i.setStart(n, e), i.setEnd(n, e + A), i;
}, Rl = function(n) {
  if (FA.SUPPORT_NATIVE_TEXT_SEGMENTATION) {
    var e = new Intl.Segmenter(void 0, { granularity: "grapheme" });
    return Array.from(e.segment(n)).map(function(A) {
      return A.segment;
    });
  }
  return WE(n);
}, Ax = function(n, e) {
  if (FA.SUPPORT_NATIVE_TEXT_SEGMENTATION) {
    var A = new Intl.Segmenter(void 0, {
      granularity: "word"
    });
    return Array.from(A.segment(n)).map(function(t) {
      return t.segment;
    });
  }
  return ix(n, e);
}, tx = function(n, e) {
  return e.letterSpacing !== 0 ? Rl(n) : Ax(n, e);
}, nx = [32, 160, 4961, 65792, 65793, 4153, 4241], ix = function(n, e) {
  for (var A = T_(n, {
    lineBreak: e.lineBreak,
    wordBreak: e.overflowWrap === "break-word" ? "break-word" : e.wordBreak
  }), t = [], i, r = function() {
    if (i.value) {
      var s = i.value.slice(), a = Ks(s), o = "";
      a.forEach(function(l) {
        nx.indexOf(l) === -1 ? o += gA(l) : (o.length && t.push(o), t.push(gA(l)), o = "");
      }), o.length && t.push(o);
    }
  }; !(i = A.next()).done; )
    r();
  return t;
}, rx = (
  /** @class */
  /* @__PURE__ */ (function() {
    function n(e, A, t) {
      this.text = sx(A.data, t.textTransform), this.textBounds = $E(e, this.text, t, A);
    }
    return n;
  })()
), sx = function(n, e) {
  switch (e) {
    case 1:
      return n.toLowerCase();
    case 3:
      return n.replace(ax, ox);
    case 2:
      return n.toUpperCase();
    default:
      return n;
  }
}, ax = /(^|\s|:|-|\(|\))([a-z])/g, ox = function(n, e, A) {
  return n.length > 0 ? e + A.toUpperCase() : n;
}, Bf = (
  /** @class */
  (function(n) {
    wt(e, n);
    function e(A, t) {
      var i = n.call(this, A, t) || this;
      return i.src = t.currentSrc || t.src, i.intrinsicWidth = t.naturalWidth, i.intrinsicHeight = t.naturalHeight, i.context.cache.addImage(i.src), i;
    }
    return e;
  })(St)
), wf = (
  /** @class */
  (function(n) {
    wt(e, n);
    function e(A, t) {
      var i = n.call(this, A, t) || this;
      return i.canvas = t, i.intrinsicWidth = t.width, i.intrinsicHeight = t.height, i;
    }
    return e;
  })(St)
), _f = (
  /** @class */
  (function(n) {
    wt(e, n);
    function e(A, t) {
      var i = n.call(this, A, t) || this, r = new XMLSerializer(), s = ks(A, t);
      return t.setAttribute("width", s.width + "px"), t.setAttribute("height", s.height + "px"), i.svg = "data:image/svg+xml," + encodeURIComponent(r.serializeToString(t)), i.intrinsicWidth = t.width.baseVal.value, i.intrinsicHeight = t.height.baseVal.value, i.context.cache.addImage(i.svg), i;
    }
    return e;
  })(St)
), vf = (
  /** @class */
  (function(n) {
    wt(e, n);
    function e(A, t) {
      var i = n.call(this, A, t) || this;
      return i.value = t.value, i;
    }
    return e;
  })(St)
), ul = (
  /** @class */
  (function(n) {
    wt(e, n);
    function e(A, t) {
      var i = n.call(this, A, t) || this;
      return i.start = t.start, i.reversed = typeof t.reversed == "boolean" && t.reversed === !0, i;
    }
    return e;
  })(St)
), lx = [
  {
    type: 15,
    flags: 0,
    unit: "px",
    number: 3
  }
], cx = [
  {
    type: 16,
    flags: 0,
    number: 50
  }
], ux = function(n) {
  return n.width > n.height ? new kt(n.left + (n.width - n.height) / 2, n.top, n.height, n.height) : n.width < n.height ? new kt(n.left, n.top + (n.height - n.width) / 2, n.width, n.width) : n;
}, hx = function(n) {
  var e = n.type === fx ? new Array(n.value.length + 1).join("•") : n.value;
  return e.length === 0 ? n.placeholder || "" : e;
}, Qs = "checkbox", Is = "radio", fx = "password", Gu = 707406591, Ll = (
  /** @class */
  (function(n) {
    wt(e, n);
    function e(A, t) {
      var i = n.call(this, A, t) || this;
      switch (i.type = t.type.toLowerCase(), i.checked = t.checked, i.value = hx(t), (i.type === Qs || i.type === Is) && (i.styles.backgroundColor = 3739148031, i.styles.borderTopColor = i.styles.borderRightColor = i.styles.borderBottomColor = i.styles.borderLeftColor = 2779096575, i.styles.borderTopWidth = i.styles.borderRightWidth = i.styles.borderBottomWidth = i.styles.borderLeftWidth = 1, i.styles.borderTopStyle = i.styles.borderRightStyle = i.styles.borderBottomStyle = i.styles.borderLeftStyle = 1, i.styles.backgroundClip = [
        0
        /* BORDER_BOX */
      ], i.styles.backgroundOrigin = [
        0
        /* BORDER_BOX */
      ], i.bounds = ux(i.bounds)), i.type) {
        case Qs:
          i.styles.borderTopRightRadius = i.styles.borderTopLeftRadius = i.styles.borderBottomRightRadius = i.styles.borderBottomLeftRadius = lx;
          break;
        case Is:
          i.styles.borderTopRightRadius = i.styles.borderTopLeftRadius = i.styles.borderBottomRightRadius = i.styles.borderBottomLeftRadius = cx;
          break;
      }
      return i;
    }
    return e;
  })(St)
), Cf = (
  /** @class */
  (function(n) {
    wt(e, n);
    function e(A, t) {
      var i = n.call(this, A, t) || this, r = t.options[t.selectedIndex || 0];
      return i.value = r && r.text || "", i;
    }
    return e;
  })(St)
), Ef = (
  /** @class */
  (function(n) {
    wt(e, n);
    function e(A, t) {
      var i = n.call(this, A, t) || this;
      return i.value = t.value, i;
    }
    return e;
  })(St)
), xf = (
  /** @class */
  (function(n) {
    wt(e, n);
    function e(A, t) {
      var i = n.call(this, A, t) || this;
      i.src = t.src, i.width = parseInt(t.width, 10) || 0, i.height = parseInt(t.height, 10) || 0, i.backgroundColor = i.styles.backgroundColor;
      try {
        if (t.contentWindow && t.contentWindow.document && t.contentWindow.document.documentElement) {
          i.tree = yf(A, t.contentWindow.document.documentElement);
          var r = t.contentWindow.document.documentElement ? Yi(A, getComputedStyle(t.contentWindow.document.documentElement).backgroundColor) : Ot.TRANSPARENT, s = t.contentWindow.document.body ? Yi(A, getComputedStyle(t.contentWindow.document.body).backgroundColor) : Ot.TRANSPARENT;
          i.backgroundColor = on(r) ? on(s) ? i.styles.backgroundColor : s : r;
        }
      } catch {
      }
      return i;
    }
    return e;
  })(St)
), dx = ["OL", "UL", "MENU"], vs = function(n, e, A, t) {
  for (var i = e.firstChild, r = void 0; i; i = r)
    if (r = i.nextSibling, Sf(i) && i.data.trim().length > 0)
      A.textNodes.push(new rx(n, i, A.styles));
    else if (ci(i))
      if (Tf(i) && i.assignedNodes)
        i.assignedNodes().forEach(function(a) {
          return vs(n, a, A, t);
        });
      else {
        var s = Uf(n, i);
        s.styles.isVisible() && (px(i, s, t) ? s.flags |= 4 : gx(s.styles) && (s.flags |= 2), dx.indexOf(i.tagName) !== -1 && (s.flags |= 8), A.elements.push(s), i.slot, i.shadowRoot ? vs(n, i.shadowRoot, s, t) : !Rs(i) && !Mf(i) && !Ls(i) && vs(n, i, s, t));
      }
}, Uf = function(n, e) {
  return fl(e) ? new Bf(n, e) : Ff(e) ? new wf(n, e) : Mf(e) ? new _f(n, e) : mx(e) ? new vf(n, e) : Bx(e) ? new ul(n, e) : wx(e) ? new Ll(n, e) : Ls(e) ? new Cf(n, e) : Rs(e) ? new Ef(n, e) : bf(e) ? new xf(n, e) : new St(n, e);
}, yf = function(n, e) {
  var A = Uf(n, e);
  return A.flags |= 4, vs(n, e, A, A), A;
}, px = function(n, e, A) {
  return e.styles.isPositionedWithZIndex() || e.styles.opacity < 1 || e.styles.isTransformed() || Dl(n) && A.styles.isTransparent();
}, gx = function(n) {
  return n.isPositioned() || n.isFloating();
}, Sf = function(n) {
  return n.nodeType === Node.TEXT_NODE;
}, ci = function(n) {
  return n.nodeType === Node.ELEMENT_NODE;
}, hl = function(n) {
  return ci(n) && typeof n.style < "u" && !Cs(n);
}, Cs = function(n) {
  return typeof n.className == "object";
}, mx = function(n) {
  return n.tagName === "LI";
}, Bx = function(n) {
  return n.tagName === "OL";
}, wx = function(n) {
  return n.tagName === "INPUT";
}, _x = function(n) {
  return n.tagName === "HTML";
}, Mf = function(n) {
  return n.tagName === "svg";
}, Dl = function(n) {
  return n.tagName === "BODY";
}, Ff = function(n) {
  return n.tagName === "CANVAS";
}, Vu = function(n) {
  return n.tagName === "VIDEO";
}, fl = function(n) {
  return n.tagName === "IMG";
}, bf = function(n) {
  return n.tagName === "IFRAME";
}, ku = function(n) {
  return n.tagName === "STYLE";
}, vx = function(n) {
  return n.tagName === "SCRIPT";
}, Rs = function(n) {
  return n.tagName === "TEXTAREA";
}, Ls = function(n) {
  return n.tagName === "SELECT";
}, Tf = function(n) {
  return n.tagName === "SLOT";
}, Ku = function(n) {
  return n.tagName.indexOf("-") > 0;
}, Cx = (
  /** @class */
  (function() {
    function n() {
      this.counters = {};
    }
    return n.prototype.getCounterValue = function(e) {
      var A = this.counters[e];
      return A && A.length ? A[A.length - 1] : 1;
    }, n.prototype.getCounterValues = function(e) {
      var A = this.counters[e];
      return A || [];
    }, n.prototype.pop = function(e) {
      var A = this;
      e.forEach(function(t) {
        return A.counters[t].pop();
      });
    }, n.prototype.parse = function(e) {
      var A = this, t = e.counterIncrement, i = e.counterReset, r = !0;
      t !== null && t.forEach(function(a) {
        var o = A.counters[a.counter];
        o && a.increment !== 0 && (r = !1, o.length || o.push(1), o[Math.max(0, o.length - 1)] += a.increment);
      });
      var s = [];
      return r && i.forEach(function(a) {
        var o = A.counters[a.counter];
        s.push(a.counter), o || (o = A.counters[a.counter] = []), o.push(a.reset);
      }), s;
    }, n;
  })()
), zu = {
  integers: [1e3, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
  values: ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]
}, Wu = {
  integers: [
    9e3,
    8e3,
    7e3,
    6e3,
    5e3,
    4e3,
    3e3,
    2e3,
    1e3,
    900,
    800,
    700,
    600,
    500,
    400,
    300,
    200,
    100,
    90,
    80,
    70,
    60,
    50,
    40,
    30,
    20,
    10,
    9,
    8,
    7,
    6,
    5,
    4,
    3,
    2,
    1
  ],
  values: [
    "Ք",
    "Փ",
    "Ւ",
    "Ց",
    "Ր",
    "Տ",
    "Վ",
    "Ս",
    "Ռ",
    "Ջ",
    "Պ",
    "Չ",
    "Ո",
    "Շ",
    "Ն",
    "Յ",
    "Մ",
    "Ճ",
    "Ղ",
    "Ձ",
    "Հ",
    "Կ",
    "Ծ",
    "Խ",
    "Լ",
    "Ի",
    "Ժ",
    "Թ",
    "Ը",
    "Է",
    "Զ",
    "Ե",
    "Դ",
    "Գ",
    "Բ",
    "Ա"
  ]
}, Ex = {
  integers: [
    1e4,
    9e3,
    8e3,
    7e3,
    6e3,
    5e3,
    4e3,
    3e3,
    2e3,
    1e3,
    400,
    300,
    200,
    100,
    90,
    80,
    70,
    60,
    50,
    40,
    30,
    20,
    19,
    18,
    17,
    16,
    15,
    10,
    9,
    8,
    7,
    6,
    5,
    4,
    3,
    2,
    1
  ],
  values: [
    "י׳",
    "ט׳",
    "ח׳",
    "ז׳",
    "ו׳",
    "ה׳",
    "ד׳",
    "ג׳",
    "ב׳",
    "א׳",
    "ת",
    "ש",
    "ר",
    "ק",
    "צ",
    "פ",
    "ע",
    "ס",
    "נ",
    "מ",
    "ל",
    "כ",
    "יט",
    "יח",
    "יז",
    "טז",
    "טו",
    "י",
    "ט",
    "ח",
    "ז",
    "ו",
    "ה",
    "ד",
    "ג",
    "ב",
    "א"
  ]
}, xx = {
  integers: [
    1e4,
    9e3,
    8e3,
    7e3,
    6e3,
    5e3,
    4e3,
    3e3,
    2e3,
    1e3,
    900,
    800,
    700,
    600,
    500,
    400,
    300,
    200,
    100,
    90,
    80,
    70,
    60,
    50,
    40,
    30,
    20,
    10,
    9,
    8,
    7,
    6,
    5,
    4,
    3,
    2,
    1
  ],
  values: [
    "ჵ",
    "ჰ",
    "ჯ",
    "ჴ",
    "ხ",
    "ჭ",
    "წ",
    "ძ",
    "ც",
    "ჩ",
    "შ",
    "ყ",
    "ღ",
    "ქ",
    "ფ",
    "ჳ",
    "ტ",
    "ს",
    "რ",
    "ჟ",
    "პ",
    "ო",
    "ჲ",
    "ნ",
    "მ",
    "ლ",
    "კ",
    "ი",
    "თ",
    "ჱ",
    "ზ",
    "ვ",
    "ე",
    "დ",
    "გ",
    "ბ",
    "ა"
  ]
}, ti = function(n, e, A, t, i, r) {
  return n < e || n > A ? tr(n, i, r.length > 0) : t.integers.reduce(function(s, a, o) {
    for (; n >= a; )
      n -= a, s += t.values[o];
    return s;
  }, "") + r;
}, Qf = function(n, e, A, t) {
  var i = "";
  do
    A || n--, i = t(n) + i, n /= e;
  while (n * e >= e);
  return i;
}, pA = function(n, e, A, t, i) {
  var r = A - e + 1;
  return (n < 0 ? "-" : "") + (Qf(Math.abs(n), r, t, function(s) {
    return gA(Math.floor(s % r) + e);
  }) + i);
}, Cn = function(n, e, A) {
  A === void 0 && (A = ". ");
  var t = e.length;
  return Qf(Math.abs(n), t, !1, function(i) {
    return e[Math.floor(i % t)];
  }) + A;
}, si = 1, qt = 2, Zt = 4, zi = 8, Lt = function(n, e, A, t, i, r) {
  if (n < -9999 || n > 9999)
    return tr(n, 4, i.length > 0);
  var s = Math.abs(n), a = i;
  if (s === 0)
    return e[0] + a;
  for (var o = 0; s > 0 && o <= 4; o++) {
    var l = s % 10;
    l === 0 && CA(r, si) && a !== "" ? a = e[l] + a : l > 1 || l === 1 && o === 0 || l === 1 && o === 1 && CA(r, qt) || l === 1 && o === 1 && CA(r, Zt) && n > 100 || l === 1 && o > 1 && CA(r, zi) ? a = e[l] + (o > 0 ? A[o - 1] : "") + a : l === 1 && o > 0 && (a = A[o - 1] + a), s = Math.floor(s / 10);
  }
  return (n < 0 ? t : "") + a;
}, Xu = "十百千萬", Yu = "拾佰仟萬", Ju = "マイナス", qa = "마이너스", tr = function(n, e, A) {
  var t = A ? ". " : "", i = A ? "、" : "", r = A ? ", " : "", s = A ? " " : "";
  switch (e) {
    case 0:
      return "•" + s;
    case 1:
      return "◦" + s;
    case 2:
      return "◾" + s;
    case 5:
      var a = pA(n, 48, 57, !0, t);
      return a.length < 4 ? "0" + a : a;
    case 4:
      return Cn(n, "〇一二三四五六七八九", i);
    case 6:
      return ti(n, 1, 3999, zu, 3, t).toLowerCase();
    case 7:
      return ti(n, 1, 3999, zu, 3, t);
    case 8:
      return pA(n, 945, 969, !1, t);
    case 9:
      return pA(n, 97, 122, !1, t);
    case 10:
      return pA(n, 65, 90, !1, t);
    case 11:
      return pA(n, 1632, 1641, !0, t);
    case 12:
    case 49:
      return ti(n, 1, 9999, Wu, 3, t);
    case 35:
      return ti(n, 1, 9999, Wu, 3, t).toLowerCase();
    case 13:
      return pA(n, 2534, 2543, !0, t);
    case 14:
    case 30:
      return pA(n, 6112, 6121, !0, t);
    case 15:
      return Cn(n, "子丑寅卯辰巳午未申酉戌亥", i);
    case 16:
      return Cn(n, "甲乙丙丁戊己庚辛壬癸", i);
    case 17:
    case 48:
      return Lt(n, "零一二三四五六七八九", Xu, "負", i, qt | Zt | zi);
    case 47:
      return Lt(n, "零壹貳參肆伍陸柒捌玖", Yu, "負", i, si | qt | Zt | zi);
    case 42:
      return Lt(n, "零一二三四五六七八九", Xu, "负", i, qt | Zt | zi);
    case 41:
      return Lt(n, "零壹贰叁肆伍陆柒捌玖", Yu, "负", i, si | qt | Zt | zi);
    case 26:
      return Lt(n, "〇一二三四五六七八九", "十百千万", Ju, i, 0);
    case 25:
      return Lt(n, "零壱弐参四伍六七八九", "拾百千万", Ju, i, si | qt | Zt);
    case 31:
      return Lt(n, "영일이삼사오육칠팔구", "십백천만", qa, r, si | qt | Zt);
    case 33:
      return Lt(n, "零一二三四五六七八九", "十百千萬", qa, r, 0);
    case 32:
      return Lt(n, "零壹貳參四五六七八九", "拾百千", qa, r, si | qt | Zt);
    case 18:
      return pA(n, 2406, 2415, !0, t);
    case 20:
      return ti(n, 1, 19999, xx, 3, t);
    case 21:
      return pA(n, 2790, 2799, !0, t);
    case 22:
      return pA(n, 2662, 2671, !0, t);
    case 22:
      return ti(n, 1, 10999, Ex, 3, t);
    case 23:
      return Cn(n, "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをん");
    case 24:
      return Cn(n, "いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす");
    case 27:
      return pA(n, 3302, 3311, !0, t);
    case 28:
      return Cn(n, "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン", i);
    case 29:
      return Cn(n, "イロハニホヘトチリヌルヲワカヨタレソツネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセス", i);
    case 34:
      return pA(n, 3792, 3801, !0, t);
    case 37:
      return pA(n, 6160, 6169, !0, t);
    case 38:
      return pA(n, 4160, 4169, !0, t);
    case 39:
      return pA(n, 2918, 2927, !0, t);
    case 40:
      return pA(n, 1776, 1785, !0, t);
    case 43:
      return pA(n, 3046, 3055, !0, t);
    case 44:
      return pA(n, 3174, 3183, !0, t);
    case 45:
      return pA(n, 3664, 3673, !0, t);
    case 46:
      return pA(n, 3872, 3881, !0, t);
    case 3:
    default:
      return pA(n, 48, 57, !0, t);
  }
}, If = "data-html2canvas-ignore", qu = (
  /** @class */
  (function() {
    function n(e, A, t) {
      if (this.context = e, this.options = t, this.scrolledElements = [], this.referenceElement = A, this.counters = new Cx(), this.quoteDepth = 0, !A.ownerDocument)
        throw new Error("Cloned element does not have an owner document");
      this.documentElement = this.cloneNode(A.ownerDocument.documentElement, !1);
    }
    return n.prototype.toIFrame = function(e, A) {
      var t = this, i = Ux(e, A);
      if (!i.contentWindow)
        return Promise.reject("Unable to find iframe window");
      var r = e.defaultView.pageXOffset, s = e.defaultView.pageYOffset, a = i.contentWindow, o = a.document, l = Mx(i).then(function() {
        return OA(t, void 0, void 0, function() {
          var c, u;
          return DA(this, function(f) {
            switch (f.label) {
              case 0:
                return this.scrolledElements.forEach(Qx), a && (a.scrollTo(A.left, A.top), /(iPad|iPhone|iPod)/g.test(navigator.userAgent) && (a.scrollY !== A.top || a.scrollX !== A.left) && (this.context.logger.warn("Unable to restore scroll position for cloned document"), this.context.windowBounds = this.context.windowBounds.add(a.scrollX - A.left, a.scrollY - A.top, 0, 0))), c = this.options.onclone, u = this.clonedReferenceElement, typeof u > "u" ? [2, Promise.reject("Error finding the " + this.referenceElement.nodeName + " in the cloned document")] : o.fonts && o.fonts.ready ? [4, o.fonts.ready] : [3, 2];
              case 1:
                f.sent(), f.label = 2;
              case 2:
                return /(AppleWebKit)/g.test(navigator.userAgent) ? [4, Sx(o)] : [3, 4];
              case 3:
                f.sent(), f.label = 4;
              case 4:
                return typeof c == "function" ? [2, Promise.resolve().then(function() {
                  return c(o, u);
                }).then(function() {
                  return i;
                })] : [2, i];
            }
          });
        });
      });
      return o.open(), o.write(bx(document.doctype) + "<html></html>"), Tx(this.referenceElement.ownerDocument, r, s), o.replaceChild(o.adoptNode(this.documentElement), o.documentElement), o.close(), l;
    }, n.prototype.createElementClone = function(e) {
      if (ll(
        e,
        2
        /* CLONE */
      ))
        debugger;
      if (Ff(e))
        return this.createCanvasClone(e);
      if (Vu(e))
        return this.createVideoClone(e);
      if (ku(e))
        return this.createStyleClone(e);
      var A = e.cloneNode(!1);
      return fl(A) && (fl(e) && e.currentSrc && e.currentSrc !== e.src && (A.src = e.currentSrc, A.srcset = ""), A.loading === "lazy" && (A.loading = "eager")), Ku(A) ? this.createCustomElementClone(A) : A;
    }, n.prototype.createCustomElementClone = function(e) {
      var A = document.createElement("html2canvascustomelement");
      return Za(e.style, A), A;
    }, n.prototype.createStyleClone = function(e) {
      try {
        var A = e.sheet;
        if (A && A.cssRules) {
          var t = [].slice.call(A.cssRules, 0).reduce(function(r, s) {
            return s && typeof s.cssText == "string" ? r + s.cssText : r;
          }, ""), i = e.cloneNode(!1);
          return i.textContent = t, i;
        }
      } catch (r) {
        if (this.context.logger.error("Unable to access cssRules property", r), r.name !== "SecurityError")
          throw r;
      }
      return e.cloneNode(!1);
    }, n.prototype.createCanvasClone = function(e) {
      var A;
      if (this.options.inlineImages && e.ownerDocument) {
        var t = e.ownerDocument.createElement("img");
        try {
          return t.src = e.toDataURL(), t;
        } catch {
          this.context.logger.info("Unable to inline canvas contents, canvas is tainted", e);
        }
      }
      var i = e.cloneNode(!1);
      try {
        i.width = e.width, i.height = e.height;
        var r = e.getContext("2d"), s = i.getContext("2d");
        if (s)
          if (!this.options.allowTaint && r)
            s.putImageData(r.getImageData(0, 0, e.width, e.height), 0, 0);
          else {
            var a = (A = e.getContext("webgl2")) !== null && A !== void 0 ? A : e.getContext("webgl");
            if (a) {
              var o = a.getContextAttributes();
              (o == null ? void 0 : o.preserveDrawingBuffer) === !1 && this.context.logger.warn("Unable to clone WebGL context as it has preserveDrawingBuffer=false", e);
            }
            s.drawImage(e, 0, 0);
          }
        return i;
      } catch {
        this.context.logger.info("Unable to clone canvas as it is tainted", e);
      }
      return i;
    }, n.prototype.createVideoClone = function(e) {
      var A = e.ownerDocument.createElement("canvas");
      A.width = e.offsetWidth, A.height = e.offsetHeight;
      var t = A.getContext("2d");
      try {
        return t && (t.drawImage(e, 0, 0, A.width, A.height), this.options.allowTaint || t.getImageData(0, 0, A.width, A.height)), A;
      } catch {
        this.context.logger.info("Unable to clone video as it is tainted", e);
      }
      var i = e.ownerDocument.createElement("canvas");
      return i.width = e.offsetWidth, i.height = e.offsetHeight, i;
    }, n.prototype.appendChildNode = function(e, A, t) {
      (!ci(A) || !vx(A) && !A.hasAttribute(If) && (typeof this.options.ignoreElements != "function" || !this.options.ignoreElements(A))) && (!this.options.copyStyles || !ci(A) || !ku(A)) && e.appendChild(this.cloneNode(A, t));
    }, n.prototype.cloneChildNodes = function(e, A, t) {
      for (var i = this, r = e.shadowRoot ? e.shadowRoot.firstChild : e.firstChild; r; r = r.nextSibling)
        if (ci(r) && Tf(r) && typeof r.assignedNodes == "function") {
          var s = r.assignedNodes();
          s.length && s.forEach(function(a) {
            return i.appendChildNode(A, a, t);
          });
        } else
          this.appendChildNode(A, r, t);
    }, n.prototype.cloneNode = function(e, A) {
      if (Sf(e))
        return document.createTextNode(e.data);
      if (!e.ownerDocument)
        return e.cloneNode(!1);
      var t = e.ownerDocument.defaultView;
      if (t && ci(e) && (hl(e) || Cs(e))) {
        var i = this.createElementClone(e);
        i.style.transitionProperty = "none";
        var r = t.getComputedStyle(e), s = t.getComputedStyle(e, ":before"), a = t.getComputedStyle(e, ":after");
        this.referenceElement === e && hl(i) && (this.clonedReferenceElement = i), Dl(i) && Lx(i);
        var o = this.counters.parse(new Su(this.context, r)), l = this.resolvePseudoContent(e, i, s, Zi.BEFORE);
        Ku(e) && (A = !0), Vu(e) || this.cloneChildNodes(e, i, A), l && i.insertBefore(l, i.firstChild);
        var c = this.resolvePseudoContent(e, i, a, Zi.AFTER);
        return c && i.appendChild(c), this.counters.pop(o), (r && (this.options.copyStyles || Cs(e)) && !bf(e) || A) && Za(r, i), (e.scrollTop !== 0 || e.scrollLeft !== 0) && this.scrolledElements.push([i, e.scrollLeft, e.scrollTop]), (Rs(e) || Ls(e)) && (Rs(i) || Ls(i)) && (i.value = e.value), i;
      }
      return e.cloneNode(!1);
    }, n.prototype.resolvePseudoContent = function(e, A, t, i) {
      var r = this;
      if (t) {
        var s = t.content, a = A.ownerDocument;
        if (!(!a || !s || s === "none" || s === "-moz-alt-content" || t.display === "none")) {
          this.counters.parse(new Su(this.context, t));
          var o = new mE(this.context, t), l = a.createElement("html2canvaspseudoelement");
          Za(t, l), o.content.forEach(function(u) {
            if (u.type === 0)
              l.appendChild(a.createTextNode(u.value));
            else if (u.type === 22) {
              var f = a.createElement("img");
              f.src = u.value, f.style.opacity = "1", l.appendChild(f);
            } else if (u.type === 18) {
              if (u.name === "attr") {
                var d = u.values.filter(iA);
                d.length && l.appendChild(a.createTextNode(e.getAttribute(d[0].value) || ""));
              } else if (u.name === "counter") {
                var g = u.values.filter(xi), m = g[0], p = g[1];
                if (m && iA(m)) {
                  var h = r.counters.getCounterValue(m.value), E = p && iA(p) ? ol.parse(r.context, p.value) : 3;
                  l.appendChild(a.createTextNode(tr(h, E, !1)));
                }
              } else if (u.name === "counters") {
                var U = u.values.filter(xi), m = U[0], B = U[1], p = U[2];
                if (m && iA(m)) {
                  var S = r.counters.getCounterValues(m.value), x = p && iA(p) ? ol.parse(r.context, p.value) : 3, M = B && B.type === 0 ? B.value : "", F = S.map(function(b) {
                    return tr(b, x, !1);
                  }).join(M);
                  l.appendChild(a.createTextNode(F));
                }
              }
            } else if (u.type === 20)
              switch (u.value) {
                case "open-quote":
                  l.appendChild(a.createTextNode(yu(o.quotes, r.quoteDepth++, !0)));
                  break;
                case "close-quote":
                  l.appendChild(a.createTextNode(yu(o.quotes, --r.quoteDepth, !1)));
                  break;
                default:
                  l.appendChild(a.createTextNode(u.value));
              }
          }), l.className = dl + " " + pl;
          var c = i === Zi.BEFORE ? " " + dl : " " + pl;
          return Cs(A) ? A.className.baseValue += c : A.className += c, l;
        }
      }
    }, n.destroy = function(e) {
      return e.parentNode ? (e.parentNode.removeChild(e), !0) : !1;
    }, n;
  })()
), Zi;
(function(n) {
  n[n.BEFORE = 0] = "BEFORE", n[n.AFTER = 1] = "AFTER";
})(Zi || (Zi = {}));
var Ux = function(n, e) {
  var A = n.createElement("iframe");
  return A.className = "html2canvas-container", A.style.visibility = "hidden", A.style.position = "fixed", A.style.left = "-10000px", A.style.top = "0px", A.style.border = "0", A.width = e.width.toString(), A.height = e.height.toString(), A.scrolling = "no", A.setAttribute(If, "true"), n.body.appendChild(A), A;
}, yx = function(n) {
  return new Promise(function(e) {
    if (n.complete) {
      e();
      return;
    }
    if (!n.src) {
      e();
      return;
    }
    n.onload = e, n.onerror = e;
  });
}, Sx = function(n) {
  return Promise.all([].slice.call(n.images, 0).map(yx));
}, Mx = function(n) {
  return new Promise(function(e, A) {
    var t = n.contentWindow;
    if (!t)
      return A("No window assigned for iframe");
    var i = t.document;
    t.onload = n.onload = function() {
      t.onload = n.onload = null;
      var r = setInterval(function() {
        i.body.childNodes.length > 0 && i.readyState === "complete" && (clearInterval(r), e(n));
      }, 50);
    };
  });
}, Fx = [
  "all",
  "d",
  "content"
  // Safari shows pseudoelements if content is set
], Za = function(n, e) {
  for (var A = n.length - 1; A >= 0; A--) {
    var t = n.item(A);
    Fx.indexOf(t) === -1 && e.style.setProperty(t, n.getPropertyValue(t));
  }
  return e;
}, bx = function(n) {
  var e = "";
  return n && (e += "<!DOCTYPE ", n.name && (e += n.name), n.internalSubset && (e += n.internalSubset), n.publicId && (e += '"' + n.publicId + '"'), n.systemId && (e += '"' + n.systemId + '"'), e += ">"), e;
}, Tx = function(n, e, A) {
  n && n.defaultView && (e !== n.defaultView.pageXOffset || A !== n.defaultView.pageYOffset) && n.defaultView.scrollTo(e, A);
}, Qx = function(n) {
  var e = n[0], A = n[1], t = n[2];
  e.scrollLeft = A, e.scrollTop = t;
}, Ix = ":before", Rx = ":after", dl = "___html2canvas___pseudoelement_before", pl = "___html2canvas___pseudoelement_after", Zu = `{
    content: "" !important;
    display: none !important;
}`, Lx = function(n) {
  Dx(n, "." + dl + Ix + Zu + `
         .` + pl + Rx + Zu);
}, Dx = function(n, e) {
  var A = n.ownerDocument;
  if (A) {
    var t = A.createElement("style");
    t.textContent = e, n.appendChild(t);
  }
}, Rf = (
  /** @class */
  (function() {
    function n() {
    }
    return n.getOrigin = function(e) {
      var A = n._link;
      return A ? (A.href = e, A.href = A.href, A.protocol + A.hostname + A.port) : "about:blank";
    }, n.isSameOrigin = function(e) {
      return n.getOrigin(e) === n._origin;
    }, n.setContext = function(e) {
      n._link = e.document.createElement("a"), n._origin = n.getOrigin(e.location.href);
    }, n._origin = "about:blank", n;
  })()
), Hx = (
  /** @class */
  (function() {
    function n(e, A) {
      this.context = e, this._options = A, this._cache = {};
    }
    return n.prototype.addImage = function(e) {
      var A = Promise.resolve();
      return this.has(e) || ($a(e) || Gx(e)) && (this._cache[e] = this.loadImage(e)).catch(function() {
      }), A;
    }, n.prototype.match = function(e) {
      return this._cache[e];
    }, n.prototype.loadImage = function(e) {
      return OA(this, void 0, void 0, function() {
        var A, t, i, r, s = this;
        return DA(this, function(a) {
          switch (a.label) {
            case 0:
              return A = Rf.isSameOrigin(e), t = !ja(e) && this._options.useCORS === !0 && FA.SUPPORT_CORS_IMAGES && !A, i = !ja(e) && !A && !$a(e) && typeof this._options.proxy == "string" && FA.SUPPORT_CORS_XHR && !t, !A && this._options.allowTaint === !1 && !ja(e) && !$a(e) && !i && !t ? [
                2
                /*return*/
              ] : (r = e, i ? [4, this.proxy(r)] : [3, 2]);
            case 1:
              r = a.sent(), a.label = 2;
            case 2:
              return this.context.logger.debug("Added image " + e.substring(0, 256)), [4, new Promise(function(o, l) {
                var c = new Image();
                c.onload = function() {
                  return o(c);
                }, c.onerror = l, (Vx(r) || t) && (c.crossOrigin = "anonymous"), c.src = r, c.complete === !0 && setTimeout(function() {
                  return o(c);
                }, 500), s._options.imageTimeout > 0 && setTimeout(function() {
                  return l("Timed out (" + s._options.imageTimeout + "ms) loading image");
                }, s._options.imageTimeout);
              })];
            case 3:
              return [2, a.sent()];
          }
        });
      });
    }, n.prototype.has = function(e) {
      return typeof this._cache[e] < "u";
    }, n.prototype.keys = function() {
      return Promise.resolve(Object.keys(this._cache));
    }, n.prototype.proxy = function(e) {
      var A = this, t = this._options.proxy;
      if (!t)
        throw new Error("No proxy defined");
      var i = e.substring(0, 256);
      return new Promise(function(r, s) {
        var a = FA.SUPPORT_RESPONSE_TYPE ? "blob" : "text", o = new XMLHttpRequest();
        o.onload = function() {
          if (o.status === 200)
            if (a === "text")
              r(o.response);
            else {
              var u = new FileReader();
              u.addEventListener("load", function() {
                return r(u.result);
              }, !1), u.addEventListener("error", function(f) {
                return s(f);
              }, !1), u.readAsDataURL(o.response);
            }
          else
            s("Failed to proxy resource " + i + " with status code " + o.status);
        }, o.onerror = s;
        var l = t.indexOf("?") > -1 ? "&" : "?";
        if (o.open("GET", "" + t + l + "url=" + encodeURIComponent(e) + "&responseType=" + a), a !== "text" && o instanceof XMLHttpRequest && (o.responseType = a), A._options.imageTimeout) {
          var c = A._options.imageTimeout;
          o.timeout = c, o.ontimeout = function() {
            return s("Timed out (" + c + "ms) proxying " + i);
          };
        }
        o.send();
      });
    }, n;
  })()
), Px = /^data:image\/svg\+xml/i, Nx = /^data:image\/.*;base64,/i, Ox = /^data:image\/.*/i, Gx = function(n) {
  return FA.SUPPORT_SVG_DRAWING || !kx(n);
}, ja = function(n) {
  return Ox.test(n);
}, Vx = function(n) {
  return Nx.test(n);
}, $a = function(n) {
  return n.substr(0, 4) === "blob";
}, kx = function(n) {
  return n.substr(-3).toLowerCase() === "svg" || Px.test(n);
}, fe = (
  /** @class */
  (function() {
    function n(e, A) {
      this.type = 0, this.x = e, this.y = A;
    }
    return n.prototype.add = function(e, A) {
      return new n(this.x + e, this.y + A);
    }, n;
  })()
), ni = function(n, e, A) {
  return new fe(n.x + (e.x - n.x) * A, n.y + (e.y - n.y) * A);
}, ls = (
  /** @class */
  (function() {
    function n(e, A, t, i) {
      this.type = 1, this.start = e, this.startControl = A, this.endControl = t, this.end = i;
    }
    return n.prototype.subdivide = function(e, A) {
      var t = ni(this.start, this.startControl, e), i = ni(this.startControl, this.endControl, e), r = ni(this.endControl, this.end, e), s = ni(t, i, e), a = ni(i, r, e), o = ni(s, a, e);
      return A ? new n(this.start, t, s, o) : new n(o, a, r, this.end);
    }, n.prototype.add = function(e, A) {
      return new n(this.start.add(e, A), this.startControl.add(e, A), this.endControl.add(e, A), this.end.add(e, A));
    }, n.prototype.reverse = function() {
      return new n(this.end, this.endControl, this.startControl, this.start);
    }, n;
  })()
), st = function(n) {
  return n.type === 1;
}, Kx = (
  /** @class */
  /* @__PURE__ */ (function() {
    function n(e) {
      var A = e.styles, t = e.bounds, i = ki(A.borderTopLeftRadius, t.width, t.height), r = i[0], s = i[1], a = ki(A.borderTopRightRadius, t.width, t.height), o = a[0], l = a[1], c = ki(A.borderBottomRightRadius, t.width, t.height), u = c[0], f = c[1], d = ki(A.borderBottomLeftRadius, t.width, t.height), g = d[0], m = d[1], p = [];
      p.push((r + o) / t.width), p.push((g + u) / t.width), p.push((s + m) / t.height), p.push((l + f) / t.height);
      var h = Math.max.apply(Math, p);
      h > 1 && (r /= h, s /= h, o /= h, l /= h, u /= h, f /= h, g /= h, m /= h);
      var E = t.width - o, U = t.height - f, B = t.width - u, S = t.height - m, x = A.borderTopWidth, M = A.borderRightWidth, F = A.borderBottomWidth, _ = A.borderLeftWidth, v = rA(A.paddingTop, e.bounds.width), b = rA(A.paddingRight, e.bounds.width), H = rA(A.paddingBottom, e.bounds.width), R = rA(A.paddingLeft, e.bounds.width);
      this.topLeftBorderDoubleOuterBox = r > 0 || s > 0 ? cA(t.left + _ / 3, t.top + x / 3, r - _ / 3, s - x / 3, je.TOP_LEFT) : new fe(t.left + _ / 3, t.top + x / 3), this.topRightBorderDoubleOuterBox = r > 0 || s > 0 ? cA(t.left + E, t.top + x / 3, o - M / 3, l - x / 3, je.TOP_RIGHT) : new fe(t.left + t.width - M / 3, t.top + x / 3), this.bottomRightBorderDoubleOuterBox = u > 0 || f > 0 ? cA(t.left + B, t.top + U, u - M / 3, f - F / 3, je.BOTTOM_RIGHT) : new fe(t.left + t.width - M / 3, t.top + t.height - F / 3), this.bottomLeftBorderDoubleOuterBox = g > 0 || m > 0 ? cA(t.left + _ / 3, t.top + S, g - _ / 3, m - F / 3, je.BOTTOM_LEFT) : new fe(t.left + _ / 3, t.top + t.height - F / 3), this.topLeftBorderDoubleInnerBox = r > 0 || s > 0 ? cA(t.left + _ * 2 / 3, t.top + x * 2 / 3, r - _ * 2 / 3, s - x * 2 / 3, je.TOP_LEFT) : new fe(t.left + _ * 2 / 3, t.top + x * 2 / 3), this.topRightBorderDoubleInnerBox = r > 0 || s > 0 ? cA(t.left + E, t.top + x * 2 / 3, o - M * 2 / 3, l - x * 2 / 3, je.TOP_RIGHT) : new fe(t.left + t.width - M * 2 / 3, t.top + x * 2 / 3), this.bottomRightBorderDoubleInnerBox = u > 0 || f > 0 ? cA(t.left + B, t.top + U, u - M * 2 / 3, f - F * 2 / 3, je.BOTTOM_RIGHT) : new fe(t.left + t.width - M * 2 / 3, t.top + t.height - F * 2 / 3), this.bottomLeftBorderDoubleInnerBox = g > 0 || m > 0 ? cA(t.left + _ * 2 / 3, t.top + S, g - _ * 2 / 3, m - F * 2 / 3, je.BOTTOM_LEFT) : new fe(t.left + _ * 2 / 3, t.top + t.height - F * 2 / 3), this.topLeftBorderStroke = r > 0 || s > 0 ? cA(t.left + _ / 2, t.top + x / 2, r - _ / 2, s - x / 2, je.TOP_LEFT) : new fe(t.left + _ / 2, t.top + x / 2), this.topRightBorderStroke = r > 0 || s > 0 ? cA(t.left + E, t.top + x / 2, o - M / 2, l - x / 2, je.TOP_RIGHT) : new fe(t.left + t.width - M / 2, t.top + x / 2), this.bottomRightBorderStroke = u > 0 || f > 0 ? cA(t.left + B, t.top + U, u - M / 2, f - F / 2, je.BOTTOM_RIGHT) : new fe(t.left + t.width - M / 2, t.top + t.height - F / 2), this.bottomLeftBorderStroke = g > 0 || m > 0 ? cA(t.left + _ / 2, t.top + S, g - _ / 2, m - F / 2, je.BOTTOM_LEFT) : new fe(t.left + _ / 2, t.top + t.height - F / 2), this.topLeftBorderBox = r > 0 || s > 0 ? cA(t.left, t.top, r, s, je.TOP_LEFT) : new fe(t.left, t.top), this.topRightBorderBox = o > 0 || l > 0 ? cA(t.left + E, t.top, o, l, je.TOP_RIGHT) : new fe(t.left + t.width, t.top), this.bottomRightBorderBox = u > 0 || f > 0 ? cA(t.left + B, t.top + U, u, f, je.BOTTOM_RIGHT) : new fe(t.left + t.width, t.top + t.height), this.bottomLeftBorderBox = g > 0 || m > 0 ? cA(t.left, t.top + S, g, m, je.BOTTOM_LEFT) : new fe(t.left, t.top + t.height), this.topLeftPaddingBox = r > 0 || s > 0 ? cA(t.left + _, t.top + x, Math.max(0, r - _), Math.max(0, s - x), je.TOP_LEFT) : new fe(t.left + _, t.top + x), this.topRightPaddingBox = o > 0 || l > 0 ? cA(t.left + Math.min(E, t.width - M), t.top + x, E > t.width + M ? 0 : Math.max(0, o - M), Math.max(0, l - x), je.TOP_RIGHT) : new fe(t.left + t.width - M, t.top + x), this.bottomRightPaddingBox = u > 0 || f > 0 ? cA(t.left + Math.min(B, t.width - _), t.top + Math.min(U, t.height - F), Math.max(0, u - M), Math.max(0, f - F), je.BOTTOM_RIGHT) : new fe(t.left + t.width - M, t.top + t.height - F), this.bottomLeftPaddingBox = g > 0 || m > 0 ? cA(t.left + _, t.top + Math.min(S, t.height - F), Math.max(0, g - _), Math.max(0, m - F), je.BOTTOM_LEFT) : new fe(t.left + _, t.top + t.height - F), this.topLeftContentBox = r > 0 || s > 0 ? cA(t.left + _ + R, t.top + x + v, Math.max(0, r - (_ + R)), Math.max(0, s - (x + v)), je.TOP_LEFT) : new fe(t.left + _ + R, t.top + x + v), this.topRightContentBox = o > 0 || l > 0 ? cA(t.left + Math.min(E, t.width + _ + R), t.top + x + v, E > t.width + _ + R ? 0 : o - _ + R, l - (x + v), je.TOP_RIGHT) : new fe(t.left + t.width - (M + b), t.top + x + v), this.bottomRightContentBox = u > 0 || f > 0 ? cA(t.left + Math.min(B, t.width - (_ + R)), t.top + Math.min(U, t.height + x + v), Math.max(0, u - (M + b)), f - (F + H), je.BOTTOM_RIGHT) : new fe(t.left + t.width - (M + b), t.top + t.height - (F + H)), this.bottomLeftContentBox = g > 0 || m > 0 ? cA(t.left + _ + R, t.top + S, Math.max(0, g - (_ + R)), m - (F + H), je.BOTTOM_LEFT) : new fe(t.left + _ + R, t.top + t.height - (F + H));
    }
    return n;
  })()
), je;
(function(n) {
  n[n.TOP_LEFT = 0] = "TOP_LEFT", n[n.TOP_RIGHT = 1] = "TOP_RIGHT", n[n.BOTTOM_RIGHT = 2] = "BOTTOM_RIGHT", n[n.BOTTOM_LEFT = 3] = "BOTTOM_LEFT";
})(je || (je = {}));
var cA = function(n, e, A, t, i) {
  var r = 4 * ((Math.sqrt(2) - 1) / 3), s = A * r, a = t * r, o = n + A, l = e + t;
  switch (i) {
    case je.TOP_LEFT:
      return new ls(new fe(n, l), new fe(n, l - a), new fe(o - s, e), new fe(o, e));
    case je.TOP_RIGHT:
      return new ls(new fe(n, e), new fe(n + s, e), new fe(o, l - a), new fe(o, l));
    case je.BOTTOM_RIGHT:
      return new ls(new fe(o, e), new fe(o, e + a), new fe(n + s, l), new fe(n, l));
    case je.BOTTOM_LEFT:
    default:
      return new ls(new fe(o, l), new fe(o - s, l), new fe(n, e + a), new fe(n, e));
  }
}, Ds = function(n) {
  return [n.topLeftBorderBox, n.topRightBorderBox, n.bottomRightBorderBox, n.bottomLeftBorderBox];
}, zx = function(n) {
  return [
    n.topLeftContentBox,
    n.topRightContentBox,
    n.bottomRightContentBox,
    n.bottomLeftContentBox
  ];
}, Hs = function(n) {
  return [
    n.topLeftPaddingBox,
    n.topRightPaddingBox,
    n.bottomRightPaddingBox,
    n.bottomLeftPaddingBox
  ];
}, Wx = (
  /** @class */
  /* @__PURE__ */ (function() {
    function n(e, A, t) {
      this.offsetX = e, this.offsetY = A, this.matrix = t, this.type = 0, this.target = 6;
    }
    return n;
  })()
), cs = (
  /** @class */
  /* @__PURE__ */ (function() {
    function n(e, A) {
      this.path = e, this.target = A, this.type = 1;
    }
    return n;
  })()
), Xx = (
  /** @class */
  /* @__PURE__ */ (function() {
    function n(e) {
      this.opacity = e, this.type = 2, this.target = 6;
    }
    return n;
  })()
), Yx = function(n) {
  return n.type === 0;
}, Lf = function(n) {
  return n.type === 1;
}, Jx = function(n) {
  return n.type === 2;
}, ju = function(n, e) {
  return n.length === e.length ? n.some(function(A, t) {
    return A === e[t];
  }) : !1;
}, qx = function(n, e, A, t, i) {
  return n.map(function(r, s) {
    switch (s) {
      case 0:
        return r.add(e, A);
      case 1:
        return r.add(e + t, A);
      case 2:
        return r.add(e + t, A + i);
      case 3:
        return r.add(e, A + i);
    }
    return r;
  });
}, Df = (
  /** @class */
  /* @__PURE__ */ (function() {
    function n(e) {
      this.element = e, this.inlineLevel = [], this.nonInlineLevel = [], this.negativeZIndex = [], this.zeroOrAutoZIndexOrTransformedOrOpacity = [], this.positiveZIndex = [], this.nonPositionedFloats = [], this.nonPositionedInlineLevel = [];
    }
    return n;
  })()
), Hf = (
  /** @class */
  (function() {
    function n(e, A) {
      if (this.container = e, this.parent = A, this.effects = [], this.curves = new Kx(this.container), this.container.styles.opacity < 1 && this.effects.push(new Xx(this.container.styles.opacity)), this.container.styles.transform !== null) {
        var t = this.container.bounds.left + this.container.styles.transformOrigin[0].number, i = this.container.bounds.top + this.container.styles.transformOrigin[1].number, r = this.container.styles.transform;
        this.effects.push(new Wx(t, i, r));
      }
      if (this.container.styles.overflowX !== 0) {
        var s = Ds(this.curves), a = Hs(this.curves);
        ju(s, a) ? this.effects.push(new cs(
          s,
          6
          /* CONTENT */
        )) : (this.effects.push(new cs(
          s,
          2
          /* BACKGROUND_BORDERS */
        )), this.effects.push(new cs(
          a,
          4
          /* CONTENT */
        )));
      }
    }
    return n.prototype.getEffects = function(e) {
      for (var A = [
        2,
        3
        /* FIXED */
      ].indexOf(this.container.styles.position) === -1, t = this.parent, i = this.effects.slice(0); t; ) {
        var r = t.effects.filter(function(o) {
          return !Lf(o);
        });
        if (A || t.container.styles.position !== 0 || !t.parent) {
          if (i.unshift.apply(i, r), A = [
            2,
            3
            /* FIXED */
          ].indexOf(t.container.styles.position) === -1, t.container.styles.overflowX !== 0) {
            var s = Ds(t.curves), a = Hs(t.curves);
            ju(s, a) || i.unshift(new cs(
              a,
              6
              /* CONTENT */
            ));
          }
        } else
          i.unshift.apply(i, r);
        t = t.parent;
      }
      return i.filter(function(o) {
        return CA(o.target, e);
      });
    }, n;
  })()
), gl = function(n, e, A, t) {
  n.container.elements.forEach(function(i) {
    var r = CA(
      i.flags,
      4
      /* CREATES_REAL_STACKING_CONTEXT */
    ), s = CA(
      i.flags,
      2
      /* CREATES_STACKING_CONTEXT */
    ), a = new Hf(i, n);
    CA(
      i.styles.display,
      2048
      /* LIST_ITEM */
    ) && t.push(a);
    var o = CA(
      i.flags,
      8
      /* IS_LIST_OWNER */
    ) ? [] : t;
    if (r || s) {
      var l = r || i.styles.isPositioned() ? A : e, c = new Df(a);
      if (i.styles.isPositioned() || i.styles.opacity < 1 || i.styles.isTransformed()) {
        var u = i.styles.zIndex.order;
        if (u < 0) {
          var f = 0;
          l.negativeZIndex.some(function(g, m) {
            return u > g.element.container.styles.zIndex.order ? (f = m, !1) : f > 0;
          }), l.negativeZIndex.splice(f, 0, c);
        } else if (u > 0) {
          var d = 0;
          l.positiveZIndex.some(function(g, m) {
            return u >= g.element.container.styles.zIndex.order ? (d = m + 1, !1) : d > 0;
          }), l.positiveZIndex.splice(d, 0, c);
        } else
          l.zeroOrAutoZIndexOrTransformedOrOpacity.push(c);
      } else
        i.styles.isFloating() ? l.nonPositionedFloats.push(c) : l.nonPositionedInlineLevel.push(c);
      gl(a, c, r ? c : A, o);
    } else
      i.styles.isInlineLevel() ? e.inlineLevel.push(a) : e.nonInlineLevel.push(a), gl(a, e, A, o);
    CA(
      i.flags,
      8
      /* IS_LIST_OWNER */
    ) && Pf(i, o);
  });
}, Pf = function(n, e) {
  for (var A = n instanceof ul ? n.start : 1, t = n instanceof ul ? n.reversed : !1, i = 0; i < e.length; i++) {
    var r = e[i];
    r.container instanceof vf && typeof r.container.value == "number" && r.container.value !== 0 && (A = r.container.value), r.listValue = tr(A, r.container.styles.listStyleType, !0), A += t ? -1 : 1;
  }
}, Zx = function(n) {
  var e = new Hf(n, null), A = new Df(e), t = [];
  return gl(e, A, A, t), Pf(e.container, t), A;
}, $u = function(n, e) {
  switch (e) {
    case 0:
      return lt(n.topLeftBorderBox, n.topLeftPaddingBox, n.topRightBorderBox, n.topRightPaddingBox);
    case 1:
      return lt(n.topRightBorderBox, n.topRightPaddingBox, n.bottomRightBorderBox, n.bottomRightPaddingBox);
    case 2:
      return lt(n.bottomRightBorderBox, n.bottomRightPaddingBox, n.bottomLeftBorderBox, n.bottomLeftPaddingBox);
    case 3:
    default:
      return lt(n.bottomLeftBorderBox, n.bottomLeftPaddingBox, n.topLeftBorderBox, n.topLeftPaddingBox);
  }
}, jx = function(n, e) {
  switch (e) {
    case 0:
      return lt(n.topLeftBorderBox, n.topLeftBorderDoubleOuterBox, n.topRightBorderBox, n.topRightBorderDoubleOuterBox);
    case 1:
      return lt(n.topRightBorderBox, n.topRightBorderDoubleOuterBox, n.bottomRightBorderBox, n.bottomRightBorderDoubleOuterBox);
    case 2:
      return lt(n.bottomRightBorderBox, n.bottomRightBorderDoubleOuterBox, n.bottomLeftBorderBox, n.bottomLeftBorderDoubleOuterBox);
    case 3:
    default:
      return lt(n.bottomLeftBorderBox, n.bottomLeftBorderDoubleOuterBox, n.topLeftBorderBox, n.topLeftBorderDoubleOuterBox);
  }
}, $x = function(n, e) {
  switch (e) {
    case 0:
      return lt(n.topLeftBorderDoubleInnerBox, n.topLeftPaddingBox, n.topRightBorderDoubleInnerBox, n.topRightPaddingBox);
    case 1:
      return lt(n.topRightBorderDoubleInnerBox, n.topRightPaddingBox, n.bottomRightBorderDoubleInnerBox, n.bottomRightPaddingBox);
    case 2:
      return lt(n.bottomRightBorderDoubleInnerBox, n.bottomRightPaddingBox, n.bottomLeftBorderDoubleInnerBox, n.bottomLeftPaddingBox);
    case 3:
    default:
      return lt(n.bottomLeftBorderDoubleInnerBox, n.bottomLeftPaddingBox, n.topLeftBorderDoubleInnerBox, n.topLeftPaddingBox);
  }
}, eU = function(n, e) {
  switch (e) {
    case 0:
      return us(n.topLeftBorderStroke, n.topRightBorderStroke);
    case 1:
      return us(n.topRightBorderStroke, n.bottomRightBorderStroke);
    case 2:
      return us(n.bottomRightBorderStroke, n.bottomLeftBorderStroke);
    case 3:
    default:
      return us(n.bottomLeftBorderStroke, n.topLeftBorderStroke);
  }
}, us = function(n, e) {
  var A = [];
  return st(n) ? A.push(n.subdivide(0.5, !1)) : A.push(n), st(e) ? A.push(e.subdivide(0.5, !0)) : A.push(e), A;
}, lt = function(n, e, A, t) {
  var i = [];
  return st(n) ? i.push(n.subdivide(0.5, !1)) : i.push(n), st(A) ? i.push(A.subdivide(0.5, !0)) : i.push(A), st(t) ? i.push(t.subdivide(0.5, !0).reverse()) : i.push(t), st(e) ? i.push(e.subdivide(0.5, !1).reverse()) : i.push(e), i;
}, Nf = function(n) {
  var e = n.bounds, A = n.styles;
  return e.add(A.borderLeftWidth, A.borderTopWidth, -(A.borderRightWidth + A.borderLeftWidth), -(A.borderTopWidth + A.borderBottomWidth));
}, Ps = function(n) {
  var e = n.styles, A = n.bounds, t = rA(e.paddingLeft, A.width), i = rA(e.paddingRight, A.width), r = rA(e.paddingTop, A.width), s = rA(e.paddingBottom, A.width);
  return A.add(t + e.borderLeftWidth, r + e.borderTopWidth, -(e.borderRightWidth + e.borderLeftWidth + t + i), -(e.borderTopWidth + e.borderBottomWidth + r + s));
}, AU = function(n, e) {
  return n === 0 ? e.bounds : n === 2 ? Ps(e) : Nf(e);
}, tU = function(n, e) {
  return n === 0 ? e.bounds : n === 2 ? Ps(e) : Nf(e);
}, eo = function(n, e, A) {
  var t = AU(ai(n.styles.backgroundOrigin, e), n), i = tU(ai(n.styles.backgroundClip, e), n), r = nU(ai(n.styles.backgroundSize, e), A, t), s = r[0], a = r[1], o = ki(ai(n.styles.backgroundPosition, e), t.width - s, t.height - a), l = iU(ai(n.styles.backgroundRepeat, e), o, r, t, i), c = Math.round(t.left + o[0]), u = Math.round(t.top + o[1]);
  return [l, c, u, s, a];
}, ii = function(n) {
  return iA(n) && n.value === gi.AUTO;
}, hs = function(n) {
  return typeof n == "number";
}, nU = function(n, e, A) {
  var t = e[0], i = e[1], r = e[2], s = n[0], a = n[1];
  if (!s)
    return [0, 0];
  if (_A(s) && a && _A(a))
    return [rA(s, A.width), rA(a, A.height)];
  var o = hs(r);
  if (iA(s) && (s.value === gi.CONTAIN || s.value === gi.COVER)) {
    if (hs(r)) {
      var l = A.width / A.height;
      return l < r != (s.value === gi.COVER) ? [A.width, A.width / r] : [A.height * r, A.height];
    }
    return [A.width, A.height];
  }
  var c = hs(t), u = hs(i), f = c || u;
  if (ii(s) && (!a || ii(a))) {
    if (c && u)
      return [t, i];
    if (!o && !f)
      return [A.width, A.height];
    if (f && o) {
      var d = c ? t : i * r, g = u ? i : t / r;
      return [d, g];
    }
    var m = c ? t : A.width, p = u ? i : A.height;
    return [m, p];
  }
  if (o) {
    var h = 0, E = 0;
    return _A(s) ? h = rA(s, A.width) : _A(a) && (E = rA(a, A.height)), ii(s) ? h = E * r : (!a || ii(a)) && (E = h / r), [h, E];
  }
  var U = null, B = null;
  if (_A(s) ? U = rA(s, A.width) : a && _A(a) && (B = rA(a, A.height)), U !== null && (!a || ii(a)) && (B = c && u ? U / t * i : A.height), B !== null && ii(s) && (U = c && u ? B / i * t : A.width), U !== null && B !== null)
    return [U, B];
  throw new Error("Unable to calculate background-size for element");
}, ai = function(n, e) {
  var A = n[e];
  return typeof A > "u" ? n[0] : A;
}, iU = function(n, e, A, t, i) {
  var r = e[0], s = e[1], a = A[0], o = A[1];
  switch (n) {
    case 2:
      return [
        new fe(Math.round(t.left), Math.round(t.top + s)),
        new fe(Math.round(t.left + t.width), Math.round(t.top + s)),
        new fe(Math.round(t.left + t.width), Math.round(o + t.top + s)),
        new fe(Math.round(t.left), Math.round(o + t.top + s))
      ];
    case 3:
      return [
        new fe(Math.round(t.left + r), Math.round(t.top)),
        new fe(Math.round(t.left + r + a), Math.round(t.top)),
        new fe(Math.round(t.left + r + a), Math.round(t.height + t.top)),
        new fe(Math.round(t.left + r), Math.round(t.height + t.top))
      ];
    case 1:
      return [
        new fe(Math.round(t.left + r), Math.round(t.top + s)),
        new fe(Math.round(t.left + r + a), Math.round(t.top + s)),
        new fe(Math.round(t.left + r + a), Math.round(t.top + s + o)),
        new fe(Math.round(t.left + r), Math.round(t.top + s + o))
      ];
    default:
      return [
        new fe(Math.round(i.left), Math.round(i.top)),
        new fe(Math.round(i.left + i.width), Math.round(i.top)),
        new fe(Math.round(i.left + i.width), Math.round(i.height + i.top)),
        new fe(Math.round(i.left), Math.round(i.height + i.top))
      ];
  }
}, rU = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", eh = "Hidden Text", sU = (
  /** @class */
  (function() {
    function n(e) {
      this._data = {}, this._document = e;
    }
    return n.prototype.parseMetrics = function(e, A) {
      var t = this._document.createElement("div"), i = this._document.createElement("img"), r = this._document.createElement("span"), s = this._document.body;
      t.style.visibility = "hidden", t.style.fontFamily = e, t.style.fontSize = A, t.style.margin = "0", t.style.padding = "0", t.style.whiteSpace = "nowrap", s.appendChild(t), i.src = rU, i.width = 1, i.height = 1, i.style.margin = "0", i.style.padding = "0", i.style.verticalAlign = "baseline", r.style.fontFamily = e, r.style.fontSize = A, r.style.margin = "0", r.style.padding = "0", r.appendChild(this._document.createTextNode(eh)), t.appendChild(r), t.appendChild(i);
      var a = i.offsetTop - r.offsetTop + 2;
      t.removeChild(r), t.appendChild(this._document.createTextNode(eh)), t.style.lineHeight = "normal", i.style.verticalAlign = "super";
      var o = i.offsetTop - t.offsetTop + 2;
      return s.removeChild(t), { baseline: a, middle: o };
    }, n.prototype.getMetrics = function(e, A) {
      var t = e + " " + A;
      return typeof this._data[t] > "u" && (this._data[t] = this.parseMetrics(e, A)), this._data[t];
    }, n;
  })()
), Of = (
  /** @class */
  /* @__PURE__ */ (function() {
    function n(e, A) {
      this.context = e, this.options = A;
    }
    return n;
  })()
), aU = 1e4, oU = (
  /** @class */
  (function(n) {
    wt(e, n);
    function e(A, t) {
      var i = n.call(this, A, t) || this;
      return i._activeEffects = [], i.canvas = t.canvas ? t.canvas : document.createElement("canvas"), i.ctx = i.canvas.getContext("2d"), t.canvas || (i.canvas.width = Math.floor(t.width * t.scale), i.canvas.height = Math.floor(t.height * t.scale), i.canvas.style.width = t.width + "px", i.canvas.style.height = t.height + "px"), i.fontMetrics = new sU(document), i.ctx.scale(i.options.scale, i.options.scale), i.ctx.translate(-t.x, -t.y), i.ctx.textBaseline = "bottom", i._activeEffects = [], i.context.logger.debug("Canvas renderer initialized (" + t.width + "x" + t.height + ") with scale " + t.scale), i;
    }
    return e.prototype.applyEffects = function(A) {
      for (var t = this; this._activeEffects.length; )
        this.popEffect();
      A.forEach(function(i) {
        return t.applyEffect(i);
      });
    }, e.prototype.applyEffect = function(A) {
      this.ctx.save(), Jx(A) && (this.ctx.globalAlpha = A.opacity), Yx(A) && (this.ctx.translate(A.offsetX, A.offsetY), this.ctx.transform(A.matrix[0], A.matrix[1], A.matrix[2], A.matrix[3], A.matrix[4], A.matrix[5]), this.ctx.translate(-A.offsetX, -A.offsetY)), Lf(A) && (this.path(A.path), this.ctx.clip()), this._activeEffects.push(A);
    }, e.prototype.popEffect = function() {
      this._activeEffects.pop(), this.ctx.restore();
    }, e.prototype.renderStack = function(A) {
      return OA(this, void 0, void 0, function() {
        var t;
        return DA(this, function(i) {
          switch (i.label) {
            case 0:
              return t = A.element.container.styles, t.isVisible() ? [4, this.renderStackContent(A)] : [3, 2];
            case 1:
              i.sent(), i.label = 2;
            case 2:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    }, e.prototype.renderNode = function(A) {
      return OA(this, void 0, void 0, function() {
        return DA(this, function(t) {
          switch (t.label) {
            case 0:
              if (CA(
                A.container.flags,
                16
                /* DEBUG_RENDER */
              ))
                debugger;
              return A.container.styles.isVisible() ? [4, this.renderNodeBackgroundAndBorders(A)] : [3, 3];
            case 1:
              return t.sent(), [4, this.renderNodeContent(A)];
            case 2:
              t.sent(), t.label = 3;
            case 3:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    }, e.prototype.renderTextWithLetterSpacing = function(A, t, i) {
      var r = this;
      if (t === 0)
        this.ctx.fillText(A.text, A.bounds.left, A.bounds.top + i);
      else {
        var s = Rl(A.text);
        s.reduce(function(a, o) {
          return r.ctx.fillText(o, a, A.bounds.top + i), a + r.ctx.measureText(o).width;
        }, A.bounds.left);
      }
    }, e.prototype.createFontStyle = function(A) {
      var t = A.fontVariant.filter(function(s) {
        return s === "normal" || s === "small-caps";
      }).join(""), i = fU(A.fontFamily).join(", "), r = lr(A.fontSize) ? "" + A.fontSize.number + A.fontSize.unit : A.fontSize.number + "px";
      return [
        [A.fontStyle, t, A.fontWeight, r, i].join(" "),
        i,
        r
      ];
    }, e.prototype.renderTextNode = function(A, t) {
      return OA(this, void 0, void 0, function() {
        var i, r, s, a, o, l, c, u, f = this;
        return DA(this, function(d) {
          return i = this.createFontStyle(t), r = i[0], s = i[1], a = i[2], this.ctx.font = r, this.ctx.direction = t.direction === 1 ? "rtl" : "ltr", this.ctx.textAlign = "left", this.ctx.textBaseline = "alphabetic", o = this.fontMetrics.getMetrics(s, a), l = o.baseline, c = o.middle, u = t.paintOrder, A.textBounds.forEach(function(g) {
            u.forEach(function(m) {
              switch (m) {
                case 0:
                  f.ctx.fillStyle = yA(t.color), f.renderTextWithLetterSpacing(g, t.letterSpacing, l);
                  var p = t.textShadow;
                  p.length && g.text.trim().length && (p.slice(0).reverse().forEach(function(h) {
                    f.ctx.shadowColor = yA(h.color), f.ctx.shadowOffsetX = h.offsetX.number * f.options.scale, f.ctx.shadowOffsetY = h.offsetY.number * f.options.scale, f.ctx.shadowBlur = h.blur.number, f.renderTextWithLetterSpacing(g, t.letterSpacing, l);
                  }), f.ctx.shadowColor = "", f.ctx.shadowOffsetX = 0, f.ctx.shadowOffsetY = 0, f.ctx.shadowBlur = 0), t.textDecorationLine.length && (f.ctx.fillStyle = yA(t.textDecorationColor || t.color), t.textDecorationLine.forEach(function(h) {
                    switch (h) {
                      case 1:
                        f.ctx.fillRect(g.bounds.left, Math.round(g.bounds.top + l), g.bounds.width, 1);
                        break;
                      case 2:
                        f.ctx.fillRect(g.bounds.left, Math.round(g.bounds.top), g.bounds.width, 1);
                        break;
                      case 3:
                        f.ctx.fillRect(g.bounds.left, Math.ceil(g.bounds.top + c), g.bounds.width, 1);
                        break;
                    }
                  }));
                  break;
                case 1:
                  t.webkitTextStrokeWidth && g.text.trim().length && (f.ctx.strokeStyle = yA(t.webkitTextStrokeColor), f.ctx.lineWidth = t.webkitTextStrokeWidth, f.ctx.lineJoin = window.chrome ? "miter" : "round", f.ctx.strokeText(g.text, g.bounds.left, g.bounds.top + l)), f.ctx.strokeStyle = "", f.ctx.lineWidth = 0, f.ctx.lineJoin = "miter";
                  break;
              }
            });
          }), [
            2
            /*return*/
          ];
        });
      });
    }, e.prototype.renderReplacedElement = function(A, t, i) {
      if (i && A.intrinsicWidth > 0 && A.intrinsicHeight > 0) {
        var r = Ps(A), s = Hs(t);
        this.path(s), this.ctx.save(), this.ctx.clip(), this.ctx.drawImage(i, 0, 0, A.intrinsicWidth, A.intrinsicHeight, r.left, r.top, r.width, r.height), this.ctx.restore();
      }
    }, e.prototype.renderNodeContent = function(A) {
      return OA(this, void 0, void 0, function() {
        var t, i, r, s, a, o, E, E, l, c, u, f, B, d, g, S, m, p, h, E, U, B, S;
        return DA(this, function(x) {
          switch (x.label) {
            case 0:
              this.applyEffects(A.getEffects(
                4
                /* CONTENT */
              )), t = A.container, i = A.curves, r = t.styles, s = 0, a = t.textNodes, x.label = 1;
            case 1:
              return s < a.length ? (o = a[s], [4, this.renderTextNode(o, r)]) : [3, 4];
            case 2:
              x.sent(), x.label = 3;
            case 3:
              return s++, [3, 1];
            case 4:
              if (!(t instanceof Bf)) return [3, 8];
              x.label = 5;
            case 5:
              return x.trys.push([5, 7, , 8]), [4, this.context.cache.match(t.src)];
            case 6:
              return E = x.sent(), this.renderReplacedElement(t, i, E), [3, 8];
            case 7:
              return x.sent(), this.context.logger.error("Error loading image " + t.src), [3, 8];
            case 8:
              if (t instanceof wf && this.renderReplacedElement(t, i, t.canvas), !(t instanceof _f)) return [3, 12];
              x.label = 9;
            case 9:
              return x.trys.push([9, 11, , 12]), [4, this.context.cache.match(t.svg)];
            case 10:
              return E = x.sent(), this.renderReplacedElement(t, i, E), [3, 12];
            case 11:
              return x.sent(), this.context.logger.error("Error loading svg " + t.svg.substring(0, 255)), [3, 12];
            case 12:
              return t instanceof xf && t.tree ? (l = new e(this.context, {
                scale: this.options.scale,
                backgroundColor: t.backgroundColor,
                x: 0,
                y: 0,
                width: t.width,
                height: t.height
              }), [4, l.render(t.tree)]) : [3, 14];
            case 13:
              c = x.sent(), t.width && t.height && this.ctx.drawImage(c, 0, 0, t.width, t.height, t.bounds.left, t.bounds.top, t.bounds.width, t.bounds.height), x.label = 14;
            case 14:
              if (t instanceof Ll && (u = Math.min(t.bounds.width, t.bounds.height), t.type === Qs ? t.checked && (this.ctx.save(), this.path([
                new fe(t.bounds.left + u * 0.39363, t.bounds.top + u * 0.79),
                new fe(t.bounds.left + u * 0.16, t.bounds.top + u * 0.5549),
                new fe(t.bounds.left + u * 0.27347, t.bounds.top + u * 0.44071),
                new fe(t.bounds.left + u * 0.39694, t.bounds.top + u * 0.5649),
                new fe(t.bounds.left + u * 0.72983, t.bounds.top + u * 0.23),
                new fe(t.bounds.left + u * 0.84, t.bounds.top + u * 0.34085),
                new fe(t.bounds.left + u * 0.39363, t.bounds.top + u * 0.79)
              ]), this.ctx.fillStyle = yA(Gu), this.ctx.fill(), this.ctx.restore()) : t.type === Is && t.checked && (this.ctx.save(), this.ctx.beginPath(), this.ctx.arc(t.bounds.left + u / 2, t.bounds.top + u / 2, u / 4, 0, Math.PI * 2, !0), this.ctx.fillStyle = yA(Gu), this.ctx.fill(), this.ctx.restore())), lU(t) && t.value.length) {
                switch (f = this.createFontStyle(r), B = f[0], d = f[1], g = this.fontMetrics.getMetrics(B, d).baseline, this.ctx.font = B, this.ctx.fillStyle = yA(r.color), this.ctx.textBaseline = "alphabetic", this.ctx.textAlign = uU(t.styles.textAlign), S = Ps(t), m = 0, t.styles.textAlign) {
                  case 1:
                    m += S.width / 2;
                    break;
                  case 2:
                    m += S.width;
                    break;
                }
                p = S.add(m, 0, 0, -S.height / 2 + 1), this.ctx.save(), this.path([
                  new fe(S.left, S.top),
                  new fe(S.left + S.width, S.top),
                  new fe(S.left + S.width, S.top + S.height),
                  new fe(S.left, S.top + S.height)
                ]), this.ctx.clip(), this.renderTextWithLetterSpacing(new qi(t.value, p), r.letterSpacing, g), this.ctx.restore(), this.ctx.textBaseline = "alphabetic", this.ctx.textAlign = "left";
              }
              if (!CA(
                t.styles.display,
                2048
                /* LIST_ITEM */
              )) return [3, 20];
              if (t.styles.listStyleImage === null) return [3, 19];
              if (h = t.styles.listStyleImage, h.type !== 0) return [3, 18];
              E = void 0, U = h.url, x.label = 15;
            case 15:
              return x.trys.push([15, 17, , 18]), [4, this.context.cache.match(U)];
            case 16:
              return E = x.sent(), this.ctx.drawImage(E, t.bounds.left - (E.width + 10), t.bounds.top), [3, 18];
            case 17:
              return x.sent(), this.context.logger.error("Error loading list-style-image " + U), [3, 18];
            case 18:
              return [3, 20];
            case 19:
              A.listValue && t.styles.listStyleType !== -1 && (B = this.createFontStyle(r)[0], this.ctx.font = B, this.ctx.fillStyle = yA(r.color), this.ctx.textBaseline = "middle", this.ctx.textAlign = "right", S = new kt(t.bounds.left, t.bounds.top + rA(t.styles.paddingTop, t.bounds.width), t.bounds.width, xu(r.lineHeight, r.fontSize.number) / 2 + 1), this.renderTextWithLetterSpacing(new qi(A.listValue, S), r.letterSpacing, xu(r.lineHeight, r.fontSize.number) / 2 + 2), this.ctx.textBaseline = "bottom", this.ctx.textAlign = "left"), x.label = 20;
            case 20:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    }, e.prototype.renderStackContent = function(A) {
      return OA(this, void 0, void 0, function() {
        var t, i, h, r, s, h, a, o, h, l, c, h, u, f, h, d, g, h, m, p, h;
        return DA(this, function(E) {
          switch (E.label) {
            case 0:
              if (CA(
                A.element.container.flags,
                16
                /* DEBUG_RENDER */
              ))
                debugger;
              return [4, this.renderNodeBackgroundAndBorders(A.element)];
            case 1:
              E.sent(), t = 0, i = A.negativeZIndex, E.label = 2;
            case 2:
              return t < i.length ? (h = i[t], [4, this.renderStack(h)]) : [3, 5];
            case 3:
              E.sent(), E.label = 4;
            case 4:
              return t++, [3, 2];
            case 5:
              return [4, this.renderNodeContent(A.element)];
            case 6:
              E.sent(), r = 0, s = A.nonInlineLevel, E.label = 7;
            case 7:
              return r < s.length ? (h = s[r], [4, this.renderNode(h)]) : [3, 10];
            case 8:
              E.sent(), E.label = 9;
            case 9:
              return r++, [3, 7];
            case 10:
              a = 0, o = A.nonPositionedFloats, E.label = 11;
            case 11:
              return a < o.length ? (h = o[a], [4, this.renderStack(h)]) : [3, 14];
            case 12:
              E.sent(), E.label = 13;
            case 13:
              return a++, [3, 11];
            case 14:
              l = 0, c = A.nonPositionedInlineLevel, E.label = 15;
            case 15:
              return l < c.length ? (h = c[l], [4, this.renderStack(h)]) : [3, 18];
            case 16:
              E.sent(), E.label = 17;
            case 17:
              return l++, [3, 15];
            case 18:
              u = 0, f = A.inlineLevel, E.label = 19;
            case 19:
              return u < f.length ? (h = f[u], [4, this.renderNode(h)]) : [3, 22];
            case 20:
              E.sent(), E.label = 21;
            case 21:
              return u++, [3, 19];
            case 22:
              d = 0, g = A.zeroOrAutoZIndexOrTransformedOrOpacity, E.label = 23;
            case 23:
              return d < g.length ? (h = g[d], [4, this.renderStack(h)]) : [3, 26];
            case 24:
              E.sent(), E.label = 25;
            case 25:
              return d++, [3, 23];
            case 26:
              m = 0, p = A.positiveZIndex, E.label = 27;
            case 27:
              return m < p.length ? (h = p[m], [4, this.renderStack(h)]) : [3, 30];
            case 28:
              E.sent(), E.label = 29;
            case 29:
              return m++, [3, 27];
            case 30:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    }, e.prototype.mask = function(A) {
      this.ctx.beginPath(), this.ctx.moveTo(0, 0), this.ctx.lineTo(this.canvas.width, 0), this.ctx.lineTo(this.canvas.width, this.canvas.height), this.ctx.lineTo(0, this.canvas.height), this.ctx.lineTo(0, 0), this.formatPath(A.slice(0).reverse()), this.ctx.closePath();
    }, e.prototype.path = function(A) {
      this.ctx.beginPath(), this.formatPath(A), this.ctx.closePath();
    }, e.prototype.formatPath = function(A) {
      var t = this;
      A.forEach(function(i, r) {
        var s = st(i) ? i.start : i;
        r === 0 ? t.ctx.moveTo(s.x, s.y) : t.ctx.lineTo(s.x, s.y), st(i) && t.ctx.bezierCurveTo(i.startControl.x, i.startControl.y, i.endControl.x, i.endControl.y, i.end.x, i.end.y);
      });
    }, e.prototype.renderRepeat = function(A, t, i, r) {
      this.path(A), this.ctx.fillStyle = t, this.ctx.translate(i, r), this.ctx.fill(), this.ctx.translate(-i, -r);
    }, e.prototype.resizeImage = function(A, t, i) {
      var r;
      if (A.width === t && A.height === i)
        return A;
      var s = (r = this.canvas.ownerDocument) !== null && r !== void 0 ? r : document, a = s.createElement("canvas");
      a.width = Math.max(1, t), a.height = Math.max(1, i);
      var o = a.getContext("2d");
      return o.drawImage(A, 0, 0, A.width, A.height, 0, 0, t, i), a;
    }, e.prototype.renderBackgroundImage = function(A) {
      return OA(this, void 0, void 0, function() {
        var t, i, r, s, a, o;
        return DA(this, function(l) {
          switch (l.label) {
            case 0:
              t = A.styles.backgroundImage.length - 1, i = function(c) {
                var u, f, d, v, k, Z, R, N, F, g, v, k, Z, R, N, m, p, h, E, U, B, S, x, M, F, _, v, b, H, R, N, Y, k, Z, K, ne, oe, Be, Fe, Re, W, ee;
                return DA(this, function(de) {
                  switch (de.label) {
                    case 0:
                      if (c.type !== 0) return [3, 5];
                      u = void 0, f = c.url, de.label = 1;
                    case 1:
                      return de.trys.push([1, 3, , 4]), [4, r.context.cache.match(f)];
                    case 2:
                      return u = de.sent(), [3, 4];
                    case 3:
                      return de.sent(), r.context.logger.error("Error loading background-image " + f), [3, 4];
                    case 4:
                      return u && (d = eo(A, t, [
                        u.width,
                        u.height,
                        u.width / u.height
                      ]), v = d[0], k = d[1], Z = d[2], R = d[3], N = d[4], F = r.ctx.createPattern(r.resizeImage(u, R, N), "repeat"), r.renderRepeat(v, F, k, Z)), [3, 6];
                    case 5:
                      Yv(c) ? (g = eo(A, t, [null, null, null]), v = g[0], k = g[1], Z = g[2], R = g[3], N = g[4], m = kv(c.angle, R, N), p = m[0], h = m[1], E = m[2], U = m[3], B = m[4], S = document.createElement("canvas"), S.width = R, S.height = N, x = S.getContext("2d"), M = x.createLinearGradient(h, U, E, B), Cu(c.stops, p).forEach(function(ie) {
                        return M.addColorStop(ie.stop, yA(ie.color));
                      }), x.fillStyle = M, x.fillRect(0, 0, R, N), R > 0 && N > 0 && (F = r.ctx.createPattern(S, "repeat"), r.renderRepeat(v, F, k, Z))) : Jv(c) && (_ = eo(A, t, [
                        null,
                        null,
                        null
                      ]), v = _[0], b = _[1], H = _[2], R = _[3], N = _[4], Y = c.position.length === 0 ? [Tl] : c.position, k = rA(Y[0], R), Z = rA(Y[Y.length - 1], N), K = Kv(c, k, Z, R, N), ne = K[0], oe = K[1], ne > 0 && oe > 0 && (Be = r.ctx.createRadialGradient(b + k, H + Z, 0, b + k, H + Z, ne), Cu(c.stops, ne * 2).forEach(function(ie) {
                        return Be.addColorStop(ie.stop, yA(ie.color));
                      }), r.path(v), r.ctx.fillStyle = Be, ne !== oe ? (Fe = A.bounds.left + 0.5 * A.bounds.width, Re = A.bounds.top + 0.5 * A.bounds.height, W = oe / ne, ee = 1 / W, r.ctx.save(), r.ctx.translate(Fe, Re), r.ctx.transform(1, 0, 0, W, 0, 0), r.ctx.translate(-Fe, -Re), r.ctx.fillRect(b, ee * (H - Re) + Re, R, N * ee), r.ctx.restore()) : r.ctx.fill())), de.label = 6;
                    case 6:
                      return t--, [
                        2
                        /*return*/
                      ];
                  }
                });
              }, r = this, s = 0, a = A.styles.backgroundImage.slice(0).reverse(), l.label = 1;
            case 1:
              return s < a.length ? (o = a[s], [5, i(o)]) : [3, 4];
            case 2:
              l.sent(), l.label = 3;
            case 3:
              return s++, [3, 1];
            case 4:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    }, e.prototype.renderSolidBorder = function(A, t, i) {
      return OA(this, void 0, void 0, function() {
        return DA(this, function(r) {
          return this.path($u(i, t)), this.ctx.fillStyle = yA(A), this.ctx.fill(), [
            2
            /*return*/
          ];
        });
      });
    }, e.prototype.renderDoubleBorder = function(A, t, i, r) {
      return OA(this, void 0, void 0, function() {
        var s, a;
        return DA(this, function(o) {
          switch (o.label) {
            case 0:
              return t < 3 ? [4, this.renderSolidBorder(A, i, r)] : [3, 2];
            case 1:
              return o.sent(), [
                2
                /*return*/
              ];
            case 2:
              return s = jx(r, i), this.path(s), this.ctx.fillStyle = yA(A), this.ctx.fill(), a = $x(r, i), this.path(a), this.ctx.fill(), [
                2
                /*return*/
              ];
          }
        });
      });
    }, e.prototype.renderNodeBackgroundAndBorders = function(A) {
      return OA(this, void 0, void 0, function() {
        var t, i, r, s, a, o, l, c, u = this;
        return DA(this, function(f) {
          switch (f.label) {
            case 0:
              return this.applyEffects(A.getEffects(
                2
                /* BACKGROUND_BORDERS */
              )), t = A.container.styles, i = !on(t.backgroundColor) || t.backgroundImage.length, r = [
                { style: t.borderTopStyle, color: t.borderTopColor, width: t.borderTopWidth },
                { style: t.borderRightStyle, color: t.borderRightColor, width: t.borderRightWidth },
                { style: t.borderBottomStyle, color: t.borderBottomColor, width: t.borderBottomWidth },
                { style: t.borderLeftStyle, color: t.borderLeftColor, width: t.borderLeftWidth }
              ], s = cU(ai(t.backgroundClip, 0), A.curves), i || t.boxShadow.length ? (this.ctx.save(), this.path(s), this.ctx.clip(), on(t.backgroundColor) || (this.ctx.fillStyle = yA(t.backgroundColor), this.ctx.fill()), [4, this.renderBackgroundImage(A.container)]) : [3, 2];
            case 1:
              f.sent(), this.ctx.restore(), t.boxShadow.slice(0).reverse().forEach(function(d) {
                u.ctx.save();
                var g = Ds(A.curves), m = d.inset ? 0 : aU, p = qx(g, -m + (d.inset ? 1 : -1) * d.spread.number, (d.inset ? 1 : -1) * d.spread.number, d.spread.number * (d.inset ? -2 : 2), d.spread.number * (d.inset ? -2 : 2));
                d.inset ? (u.path(g), u.ctx.clip(), u.mask(p)) : (u.mask(g), u.ctx.clip(), u.path(p)), u.ctx.shadowOffsetX = d.offsetX.number + m, u.ctx.shadowOffsetY = d.offsetY.number, u.ctx.shadowColor = yA(d.color), u.ctx.shadowBlur = d.blur.number, u.ctx.fillStyle = d.inset ? yA(d.color) : "rgba(0,0,0,1)", u.ctx.fill(), u.ctx.restore();
              }), f.label = 2;
            case 2:
              a = 0, o = 0, l = r, f.label = 3;
            case 3:
              return o < l.length ? (c = l[o], c.style !== 0 && !on(c.color) && c.width > 0 ? c.style !== 2 ? [3, 5] : [4, this.renderDashedDottedBorder(
                c.color,
                c.width,
                a,
                A.curves,
                2
                /* DASHED */
              )] : [3, 11]) : [3, 13];
            case 4:
              return f.sent(), [3, 11];
            case 5:
              return c.style !== 3 ? [3, 7] : [4, this.renderDashedDottedBorder(
                c.color,
                c.width,
                a,
                A.curves,
                3
                /* DOTTED */
              )];
            case 6:
              return f.sent(), [3, 11];
            case 7:
              return c.style !== 4 ? [3, 9] : [4, this.renderDoubleBorder(c.color, c.width, a, A.curves)];
            case 8:
              return f.sent(), [3, 11];
            case 9:
              return [4, this.renderSolidBorder(c.color, a, A.curves)];
            case 10:
              f.sent(), f.label = 11;
            case 11:
              a++, f.label = 12;
            case 12:
              return o++, [3, 3];
            case 13:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    }, e.prototype.renderDashedDottedBorder = function(A, t, i, r, s) {
      return OA(this, void 0, void 0, function() {
        var a, o, l, c, u, f, d, g, m, p, h, E, U, B, S, x, S, x;
        return DA(this, function(M) {
          return this.ctx.save(), a = eU(r, i), o = $u(r, i), s === 2 && (this.path(o), this.ctx.clip()), st(o[0]) ? (l = o[0].start.x, c = o[0].start.y) : (l = o[0].x, c = o[0].y), st(o[1]) ? (u = o[1].end.x, f = o[1].end.y) : (u = o[1].x, f = o[1].y), i === 0 || i === 2 ? d = Math.abs(l - u) : d = Math.abs(c - f), this.ctx.beginPath(), s === 3 ? this.formatPath(a) : this.formatPath(o.slice(0, 2)), g = t < 3 ? t * 3 : t * 2, m = t < 3 ? t * 2 : t, s === 3 && (g = t, m = t), p = !0, d <= g * 2 ? p = !1 : d <= g * 2 + m ? (h = d / (2 * g + m), g *= h, m *= h) : (E = Math.floor((d + m) / (g + m)), U = (d - E * g) / (E - 1), B = (d - (E + 1) * g) / E, m = B <= 0 || Math.abs(m - U) < Math.abs(m - B) ? U : B), p && (s === 3 ? this.ctx.setLineDash([0, g + m]) : this.ctx.setLineDash([g, m])), s === 3 ? (this.ctx.lineCap = "round", this.ctx.lineWidth = t) : this.ctx.lineWidth = t * 2 + 1.1, this.ctx.strokeStyle = yA(A), this.ctx.stroke(), this.ctx.setLineDash([]), s === 2 && (st(o[0]) && (S = o[3], x = o[0], this.ctx.beginPath(), this.formatPath([new fe(S.end.x, S.end.y), new fe(x.start.x, x.start.y)]), this.ctx.stroke()), st(o[1]) && (S = o[1], x = o[2], this.ctx.beginPath(), this.formatPath([new fe(S.end.x, S.end.y), new fe(x.start.x, x.start.y)]), this.ctx.stroke())), this.ctx.restore(), [
            2
            /*return*/
          ];
        });
      });
    }, e.prototype.render = function(A) {
      return OA(this, void 0, void 0, function() {
        var t;
        return DA(this, function(i) {
          switch (i.label) {
            case 0:
              return this.options.backgroundColor && (this.ctx.fillStyle = yA(this.options.backgroundColor), this.ctx.fillRect(this.options.x, this.options.y, this.options.width, this.options.height)), t = Zx(A), [4, this.renderStack(t)];
            case 1:
              return i.sent(), this.applyEffects([]), [2, this.canvas];
          }
        });
      });
    }, e;
  })(Of)
), lU = function(n) {
  return n instanceof Ef || n instanceof Cf ? !0 : n instanceof Ll && n.type !== Is && n.type !== Qs;
}, cU = function(n, e) {
  switch (n) {
    case 0:
      return Ds(e);
    case 2:
      return zx(e);
    case 1:
    default:
      return Hs(e);
  }
}, uU = function(n) {
  switch (n) {
    case 1:
      return "center";
    case 2:
      return "right";
    case 0:
    default:
      return "left";
  }
}, hU = ["-apple-system", "system-ui"], fU = function(n) {
  return /iPhone OS 15_(0|1)/.test(window.navigator.userAgent) ? n.filter(function(e) {
    return hU.indexOf(e) === -1;
  }) : n;
}, dU = (
  /** @class */
  (function(n) {
    wt(e, n);
    function e(A, t) {
      var i = n.call(this, A, t) || this;
      return i.canvas = t.canvas ? t.canvas : document.createElement("canvas"), i.ctx = i.canvas.getContext("2d"), i.options = t, i.canvas.width = Math.floor(t.width * t.scale), i.canvas.height = Math.floor(t.height * t.scale), i.canvas.style.width = t.width + "px", i.canvas.style.height = t.height + "px", i.ctx.scale(i.options.scale, i.options.scale), i.ctx.translate(-t.x, -t.y), i.context.logger.debug("EXPERIMENTAL ForeignObject renderer initialized (" + t.width + "x" + t.height + " at " + t.x + "," + t.y + ") with scale " + t.scale), i;
    }
    return e.prototype.render = function(A) {
      return OA(this, void 0, void 0, function() {
        var t, i;
        return DA(this, function(r) {
          switch (r.label) {
            case 0:
              return t = cl(this.options.width * this.options.scale, this.options.height * this.options.scale, this.options.scale, this.options.scale, A), [4, pU(t)];
            case 1:
              return i = r.sent(), this.options.backgroundColor && (this.ctx.fillStyle = yA(this.options.backgroundColor), this.ctx.fillRect(0, 0, this.options.width * this.options.scale, this.options.height * this.options.scale)), this.ctx.drawImage(i, -this.options.x * this.options.scale, -this.options.y * this.options.scale), [2, this.canvas];
          }
        });
      });
    }, e;
  })(Of)
), pU = function(n) {
  return new Promise(function(e, A) {
    var t = new Image();
    t.onload = function() {
      e(t);
    }, t.onerror = A, t.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(n));
  });
}, gU = (
  /** @class */
  (function() {
    function n(e) {
      var A = e.id, t = e.enabled;
      this.id = A, this.enabled = t, this.start = Date.now();
    }
    return n.prototype.debug = function() {
      for (var e = [], A = 0; A < arguments.length; A++)
        e[A] = arguments[A];
      this.enabled && (typeof window < "u" && window.console && typeof console.debug == "function" ? console.debug.apply(console, Kr([this.id, this.getTime() + "ms"], e)) : this.info.apply(this, e));
    }, n.prototype.getTime = function() {
      return Date.now() - this.start;
    }, n.prototype.info = function() {
      for (var e = [], A = 0; A < arguments.length; A++)
        e[A] = arguments[A];
      this.enabled && typeof window < "u" && window.console && typeof console.info == "function" && console.info.apply(console, Kr([this.id, this.getTime() + "ms"], e));
    }, n.prototype.warn = function() {
      for (var e = [], A = 0; A < arguments.length; A++)
        e[A] = arguments[A];
      this.enabled && (typeof window < "u" && window.console && typeof console.warn == "function" ? console.warn.apply(console, Kr([this.id, this.getTime() + "ms"], e)) : this.info.apply(this, e));
    }, n.prototype.error = function() {
      for (var e = [], A = 0; A < arguments.length; A++)
        e[A] = arguments[A];
      this.enabled && (typeof window < "u" && window.console && typeof console.error == "function" ? console.error.apply(console, Kr([this.id, this.getTime() + "ms"], e)) : this.info.apply(this, e));
    }, n.instances = {}, n;
  })()
), mU = (
  /** @class */
  (function() {
    function n(e, A) {
      var t;
      this.windowBounds = A, this.instanceName = "#" + n.instanceCount++, this.logger = new gU({ id: this.instanceName, enabled: e.logging }), this.cache = (t = e.cache) !== null && t !== void 0 ? t : new Hx(this, e);
    }
    return n.instanceCount = 1, n;
  })()
), BU = function(n, e) {
  return e === void 0 && (e = {}), wU(n, e);
};
typeof window < "u" && Rf.setContext(window);
var wU = function(n, e) {
  return OA(void 0, void 0, void 0, function() {
    var A, t, i, r, s, a, o, l, c, u, f, d, g, m, p, h, E, U, B, S, M, x, M, F, _, v, b, H, R, N, Y, k, Z, K, ne, oe, Be, Fe, Re, W;
    return DA(this, function(ee) {
      switch (ee.label) {
        case 0:
          if (!n || typeof n != "object")
            return [2, Promise.reject("Invalid element provided as first argument")];
          if (A = n.ownerDocument, !A)
            throw new Error("Element is not attached to a Document");
          if (t = A.defaultView, !t)
            throw new Error("Document is not attached to a Window");
          return i = {
            allowTaint: (F = e.allowTaint) !== null && F !== void 0 ? F : !1,
            imageTimeout: (_ = e.imageTimeout) !== null && _ !== void 0 ? _ : 15e3,
            proxy: e.proxy,
            useCORS: (v = e.useCORS) !== null && v !== void 0 ? v : !1
          }, r = Jo({ logging: (b = e.logging) !== null && b !== void 0 ? b : !0, cache: e.cache }, i), s = {
            windowWidth: (H = e.windowWidth) !== null && H !== void 0 ? H : t.innerWidth,
            windowHeight: (R = e.windowHeight) !== null && R !== void 0 ? R : t.innerHeight,
            scrollX: (N = e.scrollX) !== null && N !== void 0 ? N : t.pageXOffset,
            scrollY: (Y = e.scrollY) !== null && Y !== void 0 ? Y : t.pageYOffset
          }, a = new kt(s.scrollX, s.scrollY, s.windowWidth, s.windowHeight), o = new mU(r, a), l = (k = e.foreignObjectRendering) !== null && k !== void 0 ? k : !1, c = {
            allowTaint: (Z = e.allowTaint) !== null && Z !== void 0 ? Z : !1,
            onclone: e.onclone,
            ignoreElements: e.ignoreElements,
            inlineImages: l,
            copyStyles: l
          }, o.logger.debug("Starting document clone with size " + a.width + "x" + a.height + " scrolled to " + -a.left + "," + -a.top), u = new qu(o, n, c), f = u.clonedReferenceElement, f ? [4, u.toIFrame(A, a)] : [2, Promise.reject("Unable to find element in cloned iframe")];
        case 1:
          return d = ee.sent(), g = Dl(f) || _x(f) ? qw(f.ownerDocument) : ks(o, f), m = g.width, p = g.height, h = g.left, E = g.top, U = _U(o, f, e.backgroundColor), B = {
            canvas: e.canvas,
            backgroundColor: U,
            scale: (ne = (K = e.scale) !== null && K !== void 0 ? K : t.devicePixelRatio) !== null && ne !== void 0 ? ne : 1,
            x: ((oe = e.x) !== null && oe !== void 0 ? oe : 0) + h,
            y: ((Be = e.y) !== null && Be !== void 0 ? Be : 0) + E,
            width: (Fe = e.width) !== null && Fe !== void 0 ? Fe : Math.ceil(m),
            height: (Re = e.height) !== null && Re !== void 0 ? Re : Math.ceil(p)
          }, l ? (o.logger.debug("Document cloned, using foreign object rendering"), M = new dU(o, B), [4, M.render(f)]) : [3, 3];
        case 2:
          return S = ee.sent(), [3, 5];
        case 3:
          return o.logger.debug("Document cloned, element located at " + h + "," + E + " with size " + m + "x" + p + " using computed rendering"), o.logger.debug("Starting DOM parsing"), x = yf(o, f), U === x.styles.backgroundColor && (x.styles.backgroundColor = Ot.TRANSPARENT), o.logger.debug("Starting renderer for element at " + B.x + "," + B.y + " with size " + B.width + "x" + B.height), M = new oU(o, B), [4, M.render(x)];
        case 4:
          S = ee.sent(), ee.label = 5;
        case 5:
          return (!((W = e.removeContainer) !== null && W !== void 0) || W) && (qu.destroy(d) || o.logger.error("Cannot detach cloned iframe as it is not in the DOM anymore")), o.logger.debug("Finished rendering"), [2, S];
      }
    });
  });
}, _U = function(n, e, A) {
  var t = e.ownerDocument, i = t.documentElement ? Yi(n, getComputedStyle(t.documentElement).backgroundColor) : Ot.TRANSPARENT, r = t.body ? Yi(n, getComputedStyle(t.body).backgroundColor) : Ot.TRANSPARENT, s = typeof A == "string" ? Yi(n, A) : A === null ? Ot.TRANSPARENT : 4294967295;
  return e === t.documentElement ? on(i) ? on(r) ? s : r : i : s;
};
async function Ah(n, e) {
  await new Promise(
    (u) => requestAnimationFrame(() => requestAnimationFrame(() => u()))
  ), e();
  const A = n.querySelector("canvas");
  if (!A) throw new Error("acha-mimo: no WebGL canvas in host");
  const t = n.querySelector(".pd-label-layer"), i = Math.max(1, Math.round(n.clientWidth)), r = Math.max(1, Math.round(n.clientHeight)), s = Math.min(2, window.devicePixelRatio || 1), a = Math.round(i * s), o = Math.round(r * s), l = document.createElement("canvas");
  l.width = a, l.height = o;
  const c = l.getContext("2d");
  if (!c) throw new Error("acha-mimo: 2D context unavailable");
  if (c.fillStyle = "#f8f9fa", c.fillRect(0, 0, a, o), c.drawImage(A, 0, 0, A.width, A.height, 0, 0, a, o), t)
    try {
      const u = await BU(t, {
        backgroundColor: null,
        scale: s,
        width: i,
        height: r,
        logging: !1,
        useCORS: !0
      });
      c.drawImage(u, 0, 0, a, o);
    } catch (u) {
      console.warn("[acha-mimo] Label overlay capture failed; image has 3D only.", u);
    }
  return l.toDataURL("image/png");
}
const Ao = [
  {
    id: "point_of_view",
    title: "Point of view (PV)",
    body: `1. Topic

This scenario is only about the vertical axis of Geographic Space (GS): how an utterance classifies motion as “up” or “down.” In Georgian that choice shows up as vertical preverbs (ა- vs ჩა-) on the diagram’s green axis. The same real-world motion can still be worded with “up” in one sentence and “down” in another.

2. Concrete picture

The examples use a building with numbered floors so that height in GS is visible: a higher floor is higher on the vertical axis than a lower floor. 

3. Terms (all in GS, vertical)

SP (speaker position) — where the speaker is located along that vertical scale in the scene being described (here: which floor “I” am on).

TS (teller position) — the viewpoint that the GS in the clause is built from; spatial relations get a concrete reading relative to TS. In simple face-to-face description, TS is the same place as SP. They can split though: in "Nino says that she is going up", vertical “up” in the clause is anchored to Nino, the teller (TS), who is not the person uttering the whole sentence, the speaker (SP).

PV (point of view) — the vantage (here height) the utterance uses to label the path as upward or downward. PV can sit at the same height as SP/TS, above them, or below them.

4. Three PV placements relative to SP/TS

(1) PV at the same height as SP/TS.
(2) PV higher than SP/TS.
(3) PV lower than SP/TS.

5. Examples 
Throughout this section, SP and TS coincide: both are on the fourth floor. The only thing that changes is the friend’s destination floor and the vertical wording.

First situation — friend’s path ends on the third floor, one vertical step below the speaker/teller (fourth floor).

I am on the fourth floor. My friend is going to the third floor.

I can say: My friend is going up to the third floor.
Roles: the destination is below the speaker’s level in GS, but the phrase uses “up” → PV is lower than SP/TS → (3). That upward wording matches the up pole (ა-) in the model, not “moving to a higher floor than the speaker.”

I can say: My friend is going down to the third floor.
Roles: “down” fits a vantage at or above SP/TS → (2) or (1). That wording matches the down pole (ჩა-).

Second situation — friend’s path ends on the sixth floor, above the speaker/teller (fourth floor).

I am on the fourth floor. My friend is going to the sixth floor. 

I can say: My friend is going up to the sixth floor.
Roles: PV lower than SP/TS, or PV aligned with SP/TS → (3) or (1); upward wording, up pole (ა-).

I can say: My friend is going down to the sixth floor.
Roles: PV higher than SP/TS → (2); downward wording, down pole (ჩა-), even though the sixth floor is above the speaker in GS.

6. Diagram

Green axis: ა- toward the up pole, ჩა- toward the down pole. Vertical preverb choice (or English “up”/“down”) follows the PV pattern, not the speaker’s floor height by itself.`,
    highlightIds: ["a", "cha"]
  },
  {
    id: "ego_inclusion",
    title: "Ego Space (ES) folds into Alter Space (AS)",
    body: `1. Topic

This scenario is about Communicational Space (CS): how Georgian marks whether motion or orientation is toward the speech participants (I/II) or toward a third party non-participant (III).

2. ES vs AS

CS divides Ego Space (ES: speaker and addressee, I–II) from Alter Space (AS: third persons).

3. ES is not “physical distance”

Do not read ES as “physically close” in Geographic Space. Near and far in GS use distance, but how they apply is flexible; ES is flexible too. Both depend on speaker or teller attitude.

4. Inclusion → complex preverbs with მო-

When ES widens, narrows, or treats AS as inside the participant sphere, Georgian uses complex preverbs: a simple direction (შე-, ჩა-, გა-, etc.) plus მო- (“hither,” toward I/II). 

If another person’s space is structured as part of the participant sphere, the simple + მო- complex is the usual form.`,
    highlightIds: ["shemo", "chamo", "gamo", "amo", "tsamo", "gadmo", "mimo"]
  }
];
function to(n) {
  const A = n.replace(/^\//, "");
  return "/".endsWith("/") ? `/${A}` : `//${A}`;
}
const no = {
  preverbs: to("data/preverbs.json"),
  layout: to("data/layout.json"),
  diagramVerbs: to("data/diagram_verbs.json")
};
async function io(n) {
  const e = await fetch(n);
  if (!e.ok) throw new Error(`Failed to load ${n}: ${e.status}`);
  return e.json();
}
const vU = {
  modern_simple: "Modern simple preverb",
  modern_complex: "Modern complex preverb — simple preverb + მო-",
  old_simple: "Old simple",
  old_complex: "Old complex"
}, CU = [
  {
    tier: "modern_simple",
    title: "Modern simple",
    sub: "Modern simple-type preverbs."
  },
  {
    tier: "modern_complex",
    title: "Modern complex",
    sub: "Modern complex-type preverbs."
  },
  {
    tier: "old_simple",
    title: "Old simple",
    sub: "Archaic / literary simple-type preverbs."
  },
  {
    tier: "old_complex",
    title: "Old complex",
    sub: "Archaic / literary complex-type preverbs."
  }
];
function EU() {
  return `<div class="pd-citation-block">
    <p class="pd-citation"><strong>Source:</strong> Rusudan Asatiani, <cite>Dynamic Conceptual Model of the Linguistic Structuring of Space: the Georgian Preverbs</cite> (Institute of Oriental Studies, Georgia), 2007. [<a href="https://archive.illc.uva.nl/Tbilisi/Tbilisi2007/abstracts/3.pdf" target="_blank" rel="noopener">source</a>]</p>
    <br>
    <p class="pd-citation">This interactive diagram adapts and extends the author's spatial model into an interactive model. Some icons, terminology, and scenarios are drawn directly from the author's text. Citations given where relevant.</p>
  </div>`;
}
const th = "pd-collapse-left", nh = "pd-collapse-right", ih = "pd-theme", xU = "(min-width: 1101px)";
async function SU(n) {
  const { container: e, mode: A, verbKey: t, fontFamily: i, embedded: r = !1 } = n;
  let s = n.theme === "dark" ? "dark" : "light";
  if (!n.theme && !r)
    try {
      const O = localStorage.getItem(ih);
      O === "dark" || O === "light" ? s = O : window.matchMedia("(prefers-color-scheme: dark)").matches && (s = "dark");
    } catch {
    }
  const a = n.preverbsUrl ?? no.preverbs, o = n.layoutUrl ?? no.layout, l = n.diagramVerbsUrl ?? no.diagramVerbs, c = n.preverbs ?? await io(a), u = n.layout ?? await io(o), f = n.diagramVerbs !== void 0 ? n.diagramVerbs : (await io(l)).verbs;
  let d = A, g = t ?? "", m = null, p = !1, h = null, E = null;
  const U = r ? "" : `<header class="pd-site-header">
      <div class="pd-site-header__inner pd-site-header__inner--controls">
        <a class="pd-header-link" href="../">Back to Bagh</a>
        <button type="button" class="pd-btn pd-theme-toggle">Switch theme</button>
      </div>
    </header>`, B = document.createElement("div");
  B.className = r ? "pd-root pd-root--embedded" : "pd-root", B.innerHTML = `
    <div class="pd-layout">
      ${U}
      <div class="pd-layout-body">
      <div class="pd-sidebar-shell pd-sidebar-shell--left">
        <button type="button" class="pd-sidebar-toggle pd-sidebar-toggle--left" aria-expanded="true" aria-controls="pd-scroll-left" title="Hide reference panel">‹</button>
        <div class="pd-sidebar-scroll" id="pd-scroll-left">
          <aside class="pd-sidebar pd-sidebar--left" aria-label="Legend and diagram reference">
            <label class="pd-check pd-modern-preverbs-label"><input type="checkbox" class="pd-modern-preverbs-only"/> Modern preverbs only (9 simple preverbs + 6 complex preverbs with მო-)</label>
            <div class="pd-legend"></div>
            <div class="pd-axes-legend pd-axes-legend--stacked">
              <strong>Dimensions:</strong>
              <span><strong>Geographic Space (GS):</strong> up ←→ down / in ←→ out</span>
              <div class="pd-axes-legend__dimension">
                <span><strong>Communicational Space (CS):</strong> Ego Space (ES) ←→ Alter Space (AS)</span>
                <ul class="pd-axes-legend__subbullets">
                  <li><strong>Ego Space (ES):</strong> Towards participants (speaker/addressee, I/II persons)</li>
                  <li><strong>Alter Space (AS):</strong> Towards non-participants (III person)</li>
                </ul>
              </div>
            </div>
            <div class="pd-reading-hint">
              <h3>Axes, arrows, perspectives</h3>
              <p>Colored <strong>arrows</strong> from the center show the six main directions (<strong>up/down</strong>, <strong>in/out</strong>, <strong>toward ego</strong> / <strong>toward alter</strong>).</p>
              <ul>
                <li><span class="pd-key pd-key--y"></span> <strong>Green</strong> — Geographic movement up/down (GS) along <strong>ა-</strong> / <strong>ჩა-</strong>.</li>
                <li><span class="pd-key pd-key--x"></span> <strong>Blue</strong> — Communicational movement toward Ego Space (ES) or Alter Space (AS) along <strong>მო-</strong> / <strong>მი-</strong>.</li>
                <li><span class="pd-key pd-key--z"></span> <strong>Purple</strong> — Geographic movement in/out (GS) along <strong>შე-</strong> / <strong>გა-</strong>.</li>
              </ul>
              <p><strong>Select a <em>Scenario</em></strong> (in the <strong>Details</strong> panel) to see how “up/down” <strong>Point of view (PV):</strong> can shift with the speaker's position.</p>
            </div>
            ${pd()}
            ${EU()}
          </aside>
        </div>
      </div>
      <div class="pd-main">
        <div class="pd-canvas-host">
          <div class="pd-canvas-chrome">
            <div class="pd-canvas-chrome__bottom">
              <div class="pd-canvas-chrome__icons">
                <div class="pd-icon-strip-host" aria-live="polite"></div>
              </div>
              <div class="pd-canvas-chrome__actions">
                <button type="button" class="pd-btn pd-reset-view">Reset view</button>
                <button type="button" class="pd-btn pd-print">Print</button>
              </div>
            </div>
          </div>
        </div>
        <footer class="pd-bottom-bar" aria-label="Diagram help">
          <p class="pd-view-hint">Drag empty space to rotate (touch or mouse). <strong>Reset view</strong> restores the default angle. <strong>Print</strong> captures the current 3D view (WYSIWYG).</p>
        </footer>
      </div>
      <div class="pd-sidebar-shell pd-sidebar-shell--right">
        <div class="pd-sidebar-scroll" id="pd-scroll-right">
          <aside class="pd-sidebar pd-sidebar--right" aria-label="View options and preverb details">
            <div class="pd-mode-bar">
              <label>View <select class="pd-mode">
                <option value="overview">All preverbs</option>
                <option value="verb">Verb-specific</option>
              </select></label>
              <label class="pd-verb-wrap" style="display:none">Verb
                <select class="pd-verb"></select>
              </label>
              <label class="pd-check pd-scenario-label">Scenario
                <select class="pd-scenario">
                  <option value="">— none —</option>
                  ${Ao.map((O) => `<option value="${O.id}">${ji(O.title)}</option>`).join("")}
                </select>
              </label>
            </div>
            <div class="pd-panel"></div>
          </aside>
        </div>
        <button type="button" class="pd-sidebar-toggle pd-sidebar-toggle--right" aria-expanded="true" aria-controls="pd-scroll-right" title="Hide details panel">›</button>
      </div>
      <div class="pd-fab-layer">
        <button type="button" class="pd-drawer-fab pd-drawer-fab--left" aria-expanded="false" aria-controls="pd-scroll-left">Reference</button>
        <button type="button" class="pd-drawer-fab pd-drawer-fab--right" aria-expanded="false" aria-controls="pd-scroll-right">Details</button>
      </div>
      </div>
    </div>
    <div class="pd-drawer-backdrop" hidden></div>
    <div class="pd-print-root" aria-hidden="true"></div>
  `, e.appendChild(B);
  const S = B.querySelector(".pd-layout"), x = B.querySelector(".pd-drawer-backdrop"), M = B.querySelector(".pd-sidebar-toggle--left"), F = B.querySelector(".pd-sidebar-toggle--right"), _ = B.querySelector(".pd-drawer-fab--left"), v = B.querySelector(".pd-drawer-fab--right"), b = B.querySelector("#pd-scroll-left"), H = B.querySelector("#pd-scroll-right"), R = window.matchMedia(xU);
  function N() {
    return R.matches;
  }
  function Y(O) {
    try {
      return sessionStorage.getItem(O) === "1";
    } catch {
      return !1;
    }
  }
  function k(O, $) {
    try {
      sessionStorage.setItem(O, $ ? "1" : "0");
    } catch {
    }
  }
  function Z() {
    const O = S.classList.contains("pd-layout--left-collapsed"), $ = S.classList.contains("pd-layout--right-collapsed");
    M.setAttribute("aria-expanded", (!O).toString()), F.setAttribute("aria-expanded", (!$).toString()), M.textContent = O ? "›" : "‹", F.textContent = $ ? "‹" : "›", M.title = O ? "Show reference panel" : "Hide reference panel", F.title = $ ? "Show details panel" : "Hide details panel";
  }
  function K() {
    N() && (Y(th) && S.classList.add("pd-layout--left-collapsed"), Y(nh) && S.classList.add("pd-layout--right-collapsed"), Z());
  }
  function ne(O) {
    const $ = O === "left", _e = O === "right";
    B.classList.toggle("pd-root--drawer-left-open", $), B.classList.toggle("pd-root--drawer-right-open", _e), B.classList.toggle("pd-root--drawer-open", O !== null), x.hidden = O === null, _.setAttribute("aria-expanded", $.toString()), v.setAttribute("aria-expanded", _e.toString());
  }
  function oe() {
    ne(null);
  }
  function Be(O) {
    const $ = O === "left" ? b : H;
    ($.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) ?? $).focus();
  }
  K();
  const Fe = B.querySelector(".pd-icon-strip-host"), Re = B.querySelector(".pd-canvas-host");
  Fe || console.warn(
    "acha-mimo: .pd-icon-strip-host missing from template; canvas icon strip disabled."
  );
  const W = B.querySelector(".pd-panel"), ee = B.querySelector(".pd-legend"), de = B.querySelector(".pd-mode"), ie = B.querySelector(".pd-verb"), xe = B.querySelector(".pd-verb-wrap"), Te = B.querySelector(".pd-modern-preverbs-only"), Le = B.querySelector(".pd-scenario"), sA = B.querySelector(".pd-reset-view"), Oe = B.querySelector(".pd-print"), aA = B.querySelector(".pd-print-root"), T = B.querySelector(".pd-view-hint"), dA = B.querySelector(".pd-theme-toggle");
  i && B.style.setProperty("--pd-font-georgian", i);
  const Se = new Jw(Re, i), Ge = (O) => {
    B.dataset.theme = O, Se.setTheme(O), dA && (dA.textContent = O === "dark" ? "Switch to light mode" : "Switch to dark mode");
  };
  Ge(s);
  const Ee = () => {
    const O = B.dataset.theme === "dark" ? "light" : "dark";
    if (Ge(O), !r)
      try {
        localStorage.setItem(ih, O);
      } catch {
      }
  };
  dA == null || dA.addEventListener("click", Ee), M.addEventListener("click", () => {
    if (!N()) return;
    const O = !S.classList.contains("pd-layout--left-collapsed");
    S.classList.toggle("pd-layout--left-collapsed", O), k(th, O), Z(), Se.resize();
  }), F.addEventListener("click", () => {
    if (!N()) return;
    const O = !S.classList.contains("pd-layout--right-collapsed");
    S.classList.toggle("pd-layout--right-collapsed", O), k(nh, O), Z(), Se.resize();
  }), _.addEventListener("click", () => {
    N() || (B.classList.contains("pd-root--drawer-left-open") ? oe() : (ne("left"), requestAnimationFrame(() => Be("left"))));
  }), v.addEventListener("click", () => {
    N() || (B.classList.contains("pd-root--drawer-right-open") ? oe() : (ne("right"), requestAnimationFrame(() => Be("right"))));
  }), x.addEventListener("click", () => oe());
  const AA = () => {
    N() ? (oe(), K(), Z()) : S.classList.remove("pd-layout--left-collapsed", "pd-layout--right-collapsed"), Se.resize();
  };
  R.addEventListener("change", AA);
  const Ce = (O) => {
    O.key === "Escape" && B.classList.contains("pd-root--drawer-open") && oe();
  };
  document.addEventListener("keydown", Ce);
  for (const O of Object.keys(f).sort()) {
    const $ = document.createElement("option");
    $.value = O, $.textContent = f[O].label ?? O, ie.appendChild($);
  }
  g && f[g] ? ie.value = g : ie.options.length && (g = ie.options[0].value), de.value = d, xe.style.display = d === "verb" ? "flex" : "none";
  function y() {
    if (T) {
      if (d === "verb") {
        T.innerHTML = "Drag empty space to rotate (touch or mouse).";
        return;
      }
      T.innerHTML = "Drag empty space to rotate (touch or mouse). <strong>Reset view</strong> restores the default angle. <strong>Print</strong> captures the current 3D view (WYSIWYG).";
    }
  }
  function w() {
    return d !== "verb" ? null : f[g] ?? null;
  }
  function P() {
    const O = w();
    return O ? new Set(O.usedPreverbIds) : null;
  }
  function J() {
    if (!h) return null;
    const O = Ao.find(($) => $.id === h);
    return O ? new Set(O.highlightIds) : null;
  }
  function j() {
    ee.querySelectorAll(".pd-leg-item").forEach((O) => {
      const $ = O.dataset.tier, _e = E === $;
      O.setAttribute("aria-pressed", _e ? "true" : "false"), O.classList.toggle("pd-leg-item--active", _e);
    });
  }
  function X() {
    ee.innerHTML = '<h3>Legend</h3><p class="pd-legend-help">Click a row to dim other tiers on the cube.</p><div class="pd-leg-list">' + CU.map(
      (O) => `<button type="button" class="pd-leg-item" data-tier="${O.tier}" aria-pressed="false"><span class="pd-leg-stripe pd-leg-stripe--${O.tier}" aria-hidden="true"></span><span class="pd-leg-body"><strong>${oA(O.title)}</strong><span class="pd-leg-sub">${oA(O.sub)}</span></span></button>`
    ).join("") + "</div>", ee.querySelectorAll(".pd-leg-item").forEach((O) => {
      O.addEventListener("click", () => {
        const $ = O.dataset.tier;
        E = E === $ ? null : $, j(), Ve();
      });
    });
  }
  function ve() {
    Fe && (Fe.innerHTML = dd(m, c.preverbs));
  }
  function ae() {
    var Je, I, le, z, q;
    const O = c.preverbs, $ = m ? O.find((re) => re.id === m) : null, _e = w();
    let se = "";
    if (ve(), h) {
      const re = Ao.find((ue) => ue.id === h);
      re && (se += `<div class="pd-scenario-box"><h3>${oA(re.title)}</h3><p>${oA(re.body)}</p></div>`);
    }
    if (!$) {
      se += '<p class="pd-hint">Click a preverb on the cube to see glosses and notes.</p>', W.innerHTML = se;
      return;
    }
    const Me = (Je = _e == null ? void 0 : _e.annotations) == null ? void 0 : Je[$.id], be = { ...$.axisHints, ...(I = u.entries.find((re) => re.id === $.id)) == null ? void 0 : I.axisHints };
    if (se += `<h2>${oA($.display)} <span class="pd-meta">${oA(vU[$.tier] ?? $.tier)}</span></h2>`, (le = $.specialRules) != null && le.length && (se += `<ul class="pd-rules">${$.specialRules.map((re) => `<li>${oA(re)}</li>`).join("")}</ul>`), be.geographic && (se += `<p><strong>Geographic Space (GS):</strong> ${oA(be.geographic)}</p>`), be.communicational && (se += `<p><strong>Communicational Space (CS):</strong> ${oA(be.communicational)}</p>`), be.distance && (se += `<p><strong>Distance (within GS):</strong> ${oA(be.distance)}</p>`), (z = $.aliases) != null && z.length && (se += `<p><strong>Aliases:</strong> ${$.aliases.map(oA).join(", ")}</p>`), $.wiktionaryPath) {
      const re = `https://en.wiktionary.org/wiki/${encodeURIComponent($.wiktionaryPath)}`;
      se += `<p><a href="${re}" target="_blank" rel="noopener">Wiktionary</a></p>`;
    }
    if (Me != null && Me.note && (se += `<p class="pd-annote"><strong>Note:</strong> ${oA(Me.note)}</p>`), (q = Me == null ? void 0 : Me.examples) != null && q.length) {
      se += '<h4>Examples</h4><ul class="pd-examples">';
      for (const re of Me.examples)
        se += `<li><span class="pd-geo">${oA(re.georgian)}</span> — ${oA(re.gloss)}</li>`;
      se += "</ul>";
    }
    Me != null && Me.citation && (se += `<p class="pd-ann-citation"><strong>Citation:</strong> ${Zf(Me.citation)}</p>`), W.innerHTML = se;
  }
  function pe() {
    const O = J();
    Se.buildLabels(u, c.preverbs, {
      modernPreverbsOnly: p,
      mode: d,
      usedIds: P(),
      selectedId: m,
      scenarioHighlight: O,
      legendTier: E
    }), Se.setDiagramHints(m, u);
  }
  function Ve() {
    Se.updateLabelStyles(
      {
        modernPreverbsOnly: p,
        mode: d,
        usedIds: P(),
        selectedId: m,
        scenarioHighlight: J(),
        legendTier: E
      },
      c.preverbs
    );
  }
  Se.setPickCallback((O) => {
    O !== null && (m = m === O ? null : O, Se.setDiagramHints(m, u), Ve(), ae());
  }), de.addEventListener("change", () => {
    d = de.value, xe.style.display = d === "verb" ? "flex" : "none", m = null, y(), pe(), ae();
  }), ie.addEventListener("change", () => {
    g = ie.value, m = null, pe(), ae();
  }), Te.addEventListener("change", () => {
    p = Te.checked, m = null, pe(), ae();
  }), Le.addEventListener("change", () => {
    h = Le.value || null, Ve(), ae();
  }), sA.addEventListener("click", () => {
    Se.resetView();
  }), Oe.addEventListener("click", async () => {
    Oe.disabled = !0;
    try {
      const O = await Ah(Re, () => Se.renderOnce());
      aA.replaceChildren();
      const $ = document.createElement("img");
      $.alt = Jf, $.style.maxWidth = "100%", $.style.height = "auto", $.src = O, aA.appendChild($);
      let _e = !1;
      const se = () => {
        _e || (_e = !0, window.clearTimeout(be), window.removeEventListener("afterprint", Me), aA.replaceChildren(), Oe.disabled = !1);
      }, Me = () => se(), be = window.setTimeout(se, 12e4);
      window.addEventListener("afterprint", Me), await new Promise(
        (Je) => requestAnimationFrame(() => requestAnimationFrame(() => Je()))
      ), window.print();
    } catch (O) {
      console.error(O), window.alert(`Could not capture the 3D view for printing: ${$f(O)}`), Oe.disabled = !1;
    }
  }), X(), j(), y(), ae(), pe();
  const te = new ResizeObserver(() => Se.resize());
  return te.observe(Re), {
    destroy: () => {
      R.removeEventListener("change", AA), document.removeEventListener("keydown", Ce), dA == null || dA.removeEventListener("click", Ee), te.disconnect(), Se.destroy(), B.remove();
    },
    setMode: (O, $) => {
      d = O, de.value = O, xe.style.display = O === "verb" ? "flex" : "none", $ !== void 0 && f[$] && (g = $, ie.value = $), m = null, pe(), ae();
    },
    setModernPreverbsOnly: (O) => {
      p = O, Te.checked = O, m = null, pe(), ae();
    },
    setScenarioId: (O) => {
      h = O, Le.value = O ?? "", Ve(), ae();
    },
    captureViewAsPng: () => Ah(Re, () => Se.renderOnce()),
    resetView: () => {
      Se.resetView();
    },
    setTheme: (O) => {
      Ge(O === "dark" ? "dark" : "light");
    }
  };
}
export {
  Ao as PV_SCENARIOS,
  Jf as SITE_NAME_KA,
  yU as SITE_SHORT_SLUG,
  ud as SPATIAL_ICON_ROW_IDS,
  Ah as captureDiagramViewAsPng,
  SU as mountPreverbDiagram
};
