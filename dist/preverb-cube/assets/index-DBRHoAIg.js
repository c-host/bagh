var Jf=Object.defineProperty;var qf=(n,e,t)=>e in n?Jf(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var et=(n,e,t)=>qf(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))A(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&A(s)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function A(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();function rt(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function ji(n){return rt(n).replace(/'/g,"&#39;")}const Zf=/(https?:\/\/[^\s]+)/gi;function jf(n){return/https?:\/\//i.test(n)?n.split(Zf).map((t,A)=>{if(A%2===1&&/^https?:\/\//i.test(t)){const i=t.replace(/[)\].,;:!?]+$/u,""),r=t.slice(i.length),s=$f(i);return`<a href="${ji(i)}" target="_blank" rel="noopener">${rt(s)}</a>${rt(r)}`}return rt(t)}).join(""):rt(n)}function $f(n){try{const e=new URL(n);return e.hostname==="lingua.ge"||e.hostname.endsWith(".lingua.ge")?"Lingua.ge":e.hostname.endsWith("wiktionary.org")?"Wiktionary":e.hostname.includes("archive.illc.uva.nl")?"ILLC archive":e.hostname.replace(/^www\./,"")||"Link"}catch{return"Link"}}function sh(n){if(n instanceof Error)return n.message||n.name||"Error";if(typeof n=="string")return n;try{return JSON.stringify(n)}catch{return String(n)}}const ed="0 0 52 44",St="currentColor",Xt=2;function UA(n){return`<svg class="pd-spatial-icon__svg" viewBox="${ed}" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${n}</svg>`}const td=UA(`<path stroke="${St}" stroke-width="${Xt}" stroke-linecap="round" stroke-linejoin="round" d="M26 36V8M22 12l4-4 4 4"/>`),Ad=UA(`<path stroke="${St}" stroke-width="${Xt}" stroke-linecap="round" stroke-linejoin="round" d="M26 8v28M22 32l4 4 4-4"/>`),nd=UA(`<path stroke="${St}" stroke-width="${Xt}" stroke-linecap="round" stroke-linejoin="round" d="M8 22h32M34 18l4 4-4 4"/>`),id=UA(`<path stroke="${St}" stroke-width="${Xt}" stroke-linecap="round" stroke-linejoin="round" d="M44 22H12M18 18l-4 4 4 4"/>`),rd=UA(`<path stroke="${St}" stroke-width="${Xt}" stroke-linecap="round" stroke-linejoin="round" d="M8 34L26 10L41.6 30.8"/><polygon points="44,34 39.5,32.3 43.5,29.3" fill="${St}"/>`),sd=UA(`<path stroke="${St}" stroke-width="${Xt}" stroke-linecap="round" stroke-linejoin="round" d="M10 22h32M14 18l-4 4 4 4M38 26l4-4-4-4"/>`),ad=UA(`<circle cx="30" cy="22" r="11" stroke="${St}" stroke-width="${Xt}"/><path stroke="${St}" stroke-width="${Xt}" stroke-linecap="round" stroke-linejoin="round" d="M5 22H18"/><polygon points="18,22 14,18 14,26" fill="${St}"/>`),od=UA(`<circle cx="22" cy="22" r="11" stroke="${St}" stroke-width="${Xt}"/><path stroke="${St}" stroke-width="${Xt}" stroke-linecap="round" stroke-linejoin="round" d="M22 22h20"/><polygon points="42,22 38,18 38,26" fill="${St}"/>`),ld=UA(`<circle cx="20" cy="22" r="11" stroke="${St}" stroke-width="${Xt}"/><path stroke="${St}" stroke-width="${Xt}" stroke-linecap="round" stroke-linejoin="round" d="M31 22h16"/><polygon points="47,22 43,18 43,26" fill="${St}"/>`),cd=UA(`<circle cx="26" cy="18" r="10" stroke="${St}" stroke-width="${Xt}"/><path stroke="${St}" stroke-width="${Xt}" stroke-linecap="round" d="M10 34h32"/>`),ud=["a","cha","mi","mo","gada","she","ga","tsa","da"],ah=[{id:"a",title:"ა-",gloss:"from down to up",icons:[td]},{id:"cha",title:"ჩა-",gloss:"from up to down",icons:[Ad]},{id:"mi",title:"მი-",gloss:"from speaker / listener (towards Alter Space)",icons:[nd]},{id:"mo",title:"მო-",gloss:"to speaker / listener (towards Ego Space)",icons:[id]},{id:"gada",title:"გადა-",gloss:"crossing obstacles; also frequenting / repeating (back-and-forth)",icons:[rd,sd]},{id:"she",title:"შე-",gloss:"from outside to inside",icons:[ad]},{id:"ga",title:"გა-",gloss:"from inside to outside",icons:[od]},{id:"tsa",title:"წა-",gloss:"from something / somebody (departure)",icons:[ld]},{id:"da",title:"და-",gloss:"above some space",icons:[cd]}],hd=new Map(ah.map(n=>[n.id,n]));function fd(n,e){var i;const t=e.find(r=>r.id===n);if(!((i=t==null?void 0:t.spatialIconRowIds)!=null&&i.length))return[];const A=[];for(const r of t.spatialIconRowIds){const s=hd.get(r);s?A.push(s):console.warn(`[acha-mimo] Unknown spatialIconRowIds "${r}" for preverb "${n}". Valid: ${ud.join(", ")}`)}return A}function dd(n,e){if(!n)return'<div class="pd-icon-strip pd-icon-strip--empty"><span class="pd-icon-strip__placeholder">Select a preverb — spatial icons for that lemma appear here.</span></div>';const t=fd(n,e);if(!t.length){const i=e.find(s=>s.id===n),r=(i==null?void 0:i.display)??n;return`<div class="pd-icon-strip pd-icon-strip--empty"><span class="pd-icon-strip__placeholder">${rt(r)} — no spatial icons configured for this preverb.</span></div>`}return`<div class="pd-icon-strip pd-icon-strip--active" role="region" aria-label="Spatial icons for selected preverb">${t.map(i=>{const r=i.icons.map(s=>`<span class="pd-icon-strip__cell" role="img" aria-label="${ji(i.title)}">${s}</span>`).join("");return`<div class="pd-icon-strip__block"><span class="pd-icon-strip__lemma">${rt(i.title)}</span><div class="pd-icon-strip__graphics">${r}</div></div>`}).join("")}</div>`}function pd(){return`<div class="pd-icon-key">
    <h3>Spatial schematic icons key</h3>
    <p class="pd-icon-key__intro">Clicking a preverb will also display a 2D spatial icon in the bottom bar.</p>
    <ul class="pd-icon-key__list">${ah.map(e=>{const t=e.icons.map(A=>`<span class="pd-spatial-icon__cell" role="img" aria-label="${ji(e.title+" "+e.gloss)}">${A}</span>`).join("");return`<li class="pd-spatial-icon__row" data-preverb-id="${ji(e.id)}">
      <div class="pd-spatial-icon__text"><strong class="pd-spatial-icon__lemma">${rt(e.title)}</strong> <span class="pd-spatial-icon__gloss">${rt(e.gloss)}</span></div>
      <div class="pd-spatial-icon__graphics">${t}</div>
    </li>`}).join("")}</ul>
  </div>`}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Bl="172",ui={ROTATE:0,DOLLY:1,PAN:2},oi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},gd=0,zl=1,md=2,oh=1,Bd=2,DA=3,ln=0,zt=1,gA=2,rn=0,hi=1,Wl=2,Xl=3,Yl=4,wd=5,xn=100,_d=101,vd=102,Cd=103,Ed=104,xd=200,Ud=201,yd=202,Sd=203,ro=204,so=205,Md=206,Fd=207,bd=208,Td=209,Qd=210,Id=211,Rd=212,Ld=213,Dd=214,ao=0,oo=1,lo=2,mi=3,co=4,uo=5,ho=6,fo=7,lh=0,Hd=1,Pd=2,sn=0,Nd=1,Od=2,Gd=3,Vd=4,kd=5,Kd=6,zd=7,ch=300,Bi=301,wi=302,po=303,go=304,Ns=306,mo=1e3,Sn=1001,Bo=1002,BA=1003,Wd=1004,hr=1005,EA=1006,ta=1007,Mn=1008,GA=1009,uh=1010,hh=1011,$i=1012,wl=1013,Qn=1014,HA=1015,nr=1016,_l=1017,vl=1018,_i=1020,fh=35902,dh=1021,ph=1022,mA=1023,gh=1024,mh=1025,fi=1026,vi=1027,Bh=1028,Cl=1029,wh=1030,El=1031,xl=1033,fs=33776,ds=33777,ps=33778,gs=33779,wo=35840,_o=35841,vo=35842,Co=35843,Eo=36196,xo=37492,Uo=37496,yo=37808,So=37809,Mo=37810,Fo=37811,bo=37812,To=37813,Qo=37814,Io=37815,Ro=37816,Lo=37817,Do=37818,Ho=37819,Po=37820,No=37821,ms=36492,Oo=36494,Go=36495,_h=36283,Vo=36284,ko=36285,Ko=36286,Xd=3200,Yd=3201,Jd=0,qd=1,en="",iA="srgb",Ci="srgb-linear",Es="linear",At="srgb",Pn=7680,Jl=519,Zd=512,jd=513,$d=514,vh=515,ep=516,tp=517,Ap=518,np=519,ql=35044,Zl="300 es",PA=2e3,xs=2001;class Dn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const A=this._listeners;A[e]===void 0&&(A[e]=[]),A[e].indexOf(t)===-1&&A[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const A=this._listeners;return A[e]!==void 0&&A[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const A=this._listeners[e.type];if(A!==void 0){e.target=this;const i=A.slice(0);for(let r=0,s=i.length;r<s;r++)i[r].call(this,e);e.target=null}}}const Rt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Wi=Math.PI/180,zo=180/Math.PI;function ir(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,A=Math.random()*4294967295|0;return(Rt[n&255]+Rt[n>>8&255]+Rt[n>>16&255]+Rt[n>>24&255]+"-"+Rt[e&255]+Rt[e>>8&255]+"-"+Rt[e>>16&15|64]+Rt[e>>24&255]+"-"+Rt[t&63|128]+Rt[t>>8&255]+"-"+Rt[t>>16&255]+Rt[t>>24&255]+Rt[A&255]+Rt[A>>8&255]+Rt[A>>16&255]+Rt[A>>24&255]).toLowerCase()}function ke(n,e,t){return Math.max(e,Math.min(t,n))}function ip(n,e){return(n%e+e)%e}function Aa(n,e,t){return(1-t)*n+t*e}function Mi(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Vt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const rp={DEG2RAD:Wi};class Pe{constructor(e=0,t=0){Pe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,A=this.y,i=e.elements;return this.x=i[0]*t+i[3]*A+i[6],this.y=i[1]*t+i[4]*A+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ke(this.x,e.x,t.x),this.y=ke(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ke(this.x,e,t),this.y=ke(this.y,e,t),this}clampLength(e,t){const A=this.length();return this.divideScalar(A||1).multiplyScalar(ke(A,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const A=this.dot(e)/t;return Math.acos(ke(A,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,A=this.y-e.y;return t*t+A*A}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,A){return this.x=e.x+(t.x-e.x)*A,this.y=e.y+(t.y-e.y)*A,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const A=Math.cos(t),i=Math.sin(t),r=this.x-e.x,s=this.y-e.y;return this.x=r*A-s*i+e.x,this.y=r*i+s*A+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class He{constructor(e,t,A,i,r,s,a,o,l){He.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,A,i,r,s,a,o,l)}set(e,t,A,i,r,s,a,o,l){const c=this.elements;return c[0]=e,c[1]=i,c[2]=a,c[3]=t,c[4]=r,c[5]=o,c[6]=A,c[7]=s,c[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,A=e.elements;return t[0]=A[0],t[1]=A[1],t[2]=A[2],t[3]=A[3],t[4]=A[4],t[5]=A[5],t[6]=A[6],t[7]=A[7],t[8]=A[8],this}extractBasis(e,t,A){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),A.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const A=e.elements,i=t.elements,r=this.elements,s=A[0],a=A[3],o=A[6],l=A[1],c=A[4],u=A[7],f=A[2],p=A[5],g=A[8],m=i[0],d=i[3],h=i[6],E=i[1],U=i[4],B=i[7],M=i[2],x=i[5],S=i[8];return r[0]=s*m+a*E+o*M,r[3]=s*d+a*U+o*x,r[6]=s*h+a*B+o*S,r[1]=l*m+c*E+u*M,r[4]=l*d+c*U+u*x,r[7]=l*h+c*B+u*S,r[2]=f*m+p*E+g*M,r[5]=f*d+p*U+g*x,r[8]=f*h+p*B+g*S,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],A=e[1],i=e[2],r=e[3],s=e[4],a=e[5],o=e[6],l=e[7],c=e[8];return t*s*c-t*a*l-A*r*c+A*a*o+i*r*l-i*s*o}invert(){const e=this.elements,t=e[0],A=e[1],i=e[2],r=e[3],s=e[4],a=e[5],o=e[6],l=e[7],c=e[8],u=c*s-a*l,f=a*o-c*r,p=l*r-s*o,g=t*u+A*f+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const m=1/g;return e[0]=u*m,e[1]=(i*l-c*A)*m,e[2]=(a*A-i*s)*m,e[3]=f*m,e[4]=(c*t-i*o)*m,e[5]=(i*r-a*t)*m,e[6]=p*m,e[7]=(A*o-l*t)*m,e[8]=(s*t-A*r)*m,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,A,i,r,s,a){const o=Math.cos(r),l=Math.sin(r);return this.set(A*o,A*l,-A*(o*s+l*a)+s+e,-i*l,i*o,-i*(-l*s+o*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(na.makeScale(e,t)),this}rotate(e){return this.premultiply(na.makeRotation(-e)),this}translate(e,t){return this.premultiply(na.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),A=Math.sin(e);return this.set(t,-A,0,A,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,A=e.elements;for(let i=0;i<9;i++)if(t[i]!==A[i])return!1;return!0}fromArray(e,t=0){for(let A=0;A<9;A++)this.elements[A]=e[A+t];return this}toArray(e=[],t=0){const A=this.elements;return e[t]=A[0],e[t+1]=A[1],e[t+2]=A[2],e[t+3]=A[3],e[t+4]=A[4],e[t+5]=A[5],e[t+6]=A[6],e[t+7]=A[7],e[t+8]=A[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const na=new He;function Ch(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Us(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function sp(){const n=Us("canvas");return n.style.display="block",n}const jl={};function ri(n){n in jl||(jl[n]=!0,console.warn(n))}function ap(n,e,t){return new Promise(function(A,i){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:i();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:A()}}setTimeout(r,t)})}function op(n){const e=n.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function lp(n){const e=n.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const $l=new He().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ec=new He().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function cp(){const n={enabled:!0,workingColorSpace:Ci,spaces:{},convert:function(i,r,s){return this.enabled===!1||r===s||!r||!s||(this.spaces[r].transfer===At&&(i.r=NA(i.r),i.g=NA(i.g),i.b=NA(i.b)),this.spaces[r].primaries!==this.spaces[s].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[s].fromXYZ)),this.spaces[s].transfer===At&&(i.r=di(i.r),i.g=di(i.g),i.b=di(i.b))),i},fromWorkingColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},toWorkingColorSpace:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===en?Es:this.spaces[i].transfer},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,s){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[s].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],A=[.3127,.329];return n.define({[Ci]:{primaries:e,whitePoint:A,transfer:Es,toXYZ:$l,fromXYZ:ec,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:iA},outputColorSpaceConfig:{drawingBufferColorSpace:iA}},[iA]:{primaries:e,whitePoint:A,transfer:At,toXYZ:$l,fromXYZ:ec,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:iA}}}),n}const Xe=cp();function NA(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function di(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Nn;class up{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Nn===void 0&&(Nn=Us("canvas")),Nn.width=e.width,Nn.height=e.height;const A=Nn.getContext("2d");e instanceof ImageData?A.putImageData(e,0,0):A.drawImage(e,0,0,e.width,e.height),t=Nn}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Us("canvas");t.width=e.width,t.height=e.height;const A=t.getContext("2d");A.drawImage(e,0,0,e.width,e.height);const i=A.getImageData(0,0,e.width,e.height),r=i.data;for(let s=0;s<r.length;s++)r[s]=NA(r[s]/255)*255;return A.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let A=0;A<t.length;A++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[A]=Math.floor(NA(t[A]/255)*255):t[A]=NA(t[A]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let hp=0;class Eh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:hp++}),this.uuid=ir(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const A={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let s=0,a=i.length;s<a;s++)i[s].isDataTexture?r.push(ia(i[s].image)):r.push(ia(i[s]))}else r=ia(i);A.url=r}return t||(e.images[this.uuid]=A),A}}function ia(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?up.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let fp=0;class Wt extends Dn{constructor(e=Wt.DEFAULT_IMAGE,t=Wt.DEFAULT_MAPPING,A=Sn,i=Sn,r=EA,s=Mn,a=mA,o=GA,l=Wt.DEFAULT_ANISOTROPY,c=en){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:fp++}),this.uuid=ir(),this.name="",this.source=new Eh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=A,this.wrapT=i,this.magFilter=r,this.minFilter=s,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=o,this.offset=new Pe(0,0),this.repeat=new Pe(1,1),this.center=new Pe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const A={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(A.userData=this.userData),t||(e.textures[this.uuid]=A),A}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ch)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case mo:e.x=e.x-Math.floor(e.x);break;case Sn:e.x=e.x<0?0:1;break;case Bo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case mo:e.y=e.y-Math.floor(e.y);break;case Sn:e.y=e.y<0?0:1;break;case Bo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Wt.DEFAULT_IMAGE=null;Wt.DEFAULT_MAPPING=ch;Wt.DEFAULT_ANISOTROPY=1;class mt{constructor(e=0,t=0,A=0,i=1){mt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=A,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,A,i){return this.x=e,this.y=t,this.z=A,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,A=this.y,i=this.z,r=this.w,s=e.elements;return this.x=s[0]*t+s[4]*A+s[8]*i+s[12]*r,this.y=s[1]*t+s[5]*A+s[9]*i+s[13]*r,this.z=s[2]*t+s[6]*A+s[10]*i+s[14]*r,this.w=s[3]*t+s[7]*A+s[11]*i+s[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,A,i,r;const o=e.elements,l=o[0],c=o[4],u=o[8],f=o[1],p=o[5],g=o[9],m=o[2],d=o[6],h=o[10];if(Math.abs(c-f)<.01&&Math.abs(u-m)<.01&&Math.abs(g-d)<.01){if(Math.abs(c+f)<.1&&Math.abs(u+m)<.1&&Math.abs(g+d)<.1&&Math.abs(l+p+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const U=(l+1)/2,B=(p+1)/2,M=(h+1)/2,x=(c+f)/4,S=(u+m)/4,F=(g+d)/4;return U>B&&U>M?U<.01?(A=0,i=.707106781,r=.707106781):(A=Math.sqrt(U),i=x/A,r=S/A):B>M?B<.01?(A=.707106781,i=0,r=.707106781):(i=Math.sqrt(B),A=x/i,r=F/i):M<.01?(A=.707106781,i=.707106781,r=0):(r=Math.sqrt(M),A=S/r,i=F/r),this.set(A,i,r,t),this}let E=Math.sqrt((d-g)*(d-g)+(u-m)*(u-m)+(f-c)*(f-c));return Math.abs(E)<.001&&(E=1),this.x=(d-g)/E,this.y=(u-m)/E,this.z=(f-c)/E,this.w=Math.acos((l+p+h-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ke(this.x,e.x,t.x),this.y=ke(this.y,e.y,t.y),this.z=ke(this.z,e.z,t.z),this.w=ke(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ke(this.x,e,t),this.y=ke(this.y,e,t),this.z=ke(this.z,e,t),this.w=ke(this.w,e,t),this}clampLength(e,t){const A=this.length();return this.divideScalar(A||1).multiplyScalar(ke(A,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,A){return this.x=e.x+(t.x-e.x)*A,this.y=e.y+(t.y-e.y)*A,this.z=e.z+(t.z-e.z)*A,this.w=e.w+(t.w-e.w)*A,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class dp extends Dn{constructor(e=1,t=1,A={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new mt(0,0,e,t),this.scissorTest=!1,this.viewport=new mt(0,0,e,t);const i={width:e,height:t,depth:1};A=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:EA,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},A);const r=new Wt(i,A.mapping,A.wrapS,A.wrapT,A.magFilter,A.minFilter,A.format,A.type,A.anisotropy,A.colorSpace);r.flipY=!1,r.generateMipmaps=A.generateMipmaps,r.internalFormat=A.internalFormat,this.textures=[];const s=A.count;for(let a=0;a<s;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this.depthBuffer=A.depthBuffer,this.stencilBuffer=A.stencilBuffer,this.resolveDepthBuffer=A.resolveDepthBuffer,this.resolveStencilBuffer=A.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=A.depthTexture,this.samples=A.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,A=1){if(this.width!==e||this.height!==t||this.depth!==A){this.width=e,this.height=t,this.depth=A;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=A;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let A=0,i=e.textures.length;A<i;A++)this.textures[A]=e.textures[A].clone(),this.textures[A].isRenderTargetTexture=!0,this.textures[A].renderTarget=this;const t=Object.assign({},e.texture.image);return this.texture.source=new Eh(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class In extends dp{constructor(e=1,t=1,A={}){super(e,t,A),this.isWebGLRenderTarget=!0}}class xh extends Wt{constructor(e=null,t=1,A=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:A,depth:i},this.magFilter=BA,this.minFilter=BA,this.wrapR=Sn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class pp extends Wt{constructor(e=null,t=1,A=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:A,depth:i},this.magFilter=BA,this.minFilter=BA,this.wrapR=Sn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Rn{constructor(e=0,t=0,A=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=A,this._w=i}static slerpFlat(e,t,A,i,r,s,a){let o=A[i+0],l=A[i+1],c=A[i+2],u=A[i+3];const f=r[s+0],p=r[s+1],g=r[s+2],m=r[s+3];if(a===0){e[t+0]=o,e[t+1]=l,e[t+2]=c,e[t+3]=u;return}if(a===1){e[t+0]=f,e[t+1]=p,e[t+2]=g,e[t+3]=m;return}if(u!==m||o!==f||l!==p||c!==g){let d=1-a;const h=o*f+l*p+c*g+u*m,E=h>=0?1:-1,U=1-h*h;if(U>Number.EPSILON){const M=Math.sqrt(U),x=Math.atan2(M,h*E);d=Math.sin(d*x)/M,a=Math.sin(a*x)/M}const B=a*E;if(o=o*d+f*B,l=l*d+p*B,c=c*d+g*B,u=u*d+m*B,d===1-a){const M=1/Math.sqrt(o*o+l*l+c*c+u*u);o*=M,l*=M,c*=M,u*=M}}e[t]=o,e[t+1]=l,e[t+2]=c,e[t+3]=u}static multiplyQuaternionsFlat(e,t,A,i,r,s){const a=A[i],o=A[i+1],l=A[i+2],c=A[i+3],u=r[s],f=r[s+1],p=r[s+2],g=r[s+3];return e[t]=a*g+c*u+o*p-l*f,e[t+1]=o*g+c*f+l*u-a*p,e[t+2]=l*g+c*p+a*f-o*u,e[t+3]=c*g-a*u-o*f-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,A,i){return this._x=e,this._y=t,this._z=A,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const A=e._x,i=e._y,r=e._z,s=e._order,a=Math.cos,o=Math.sin,l=a(A/2),c=a(i/2),u=a(r/2),f=o(A/2),p=o(i/2),g=o(r/2);switch(s){case"XYZ":this._x=f*c*u+l*p*g,this._y=l*p*u-f*c*g,this._z=l*c*g+f*p*u,this._w=l*c*u-f*p*g;break;case"YXZ":this._x=f*c*u+l*p*g,this._y=l*p*u-f*c*g,this._z=l*c*g-f*p*u,this._w=l*c*u+f*p*g;break;case"ZXY":this._x=f*c*u-l*p*g,this._y=l*p*u+f*c*g,this._z=l*c*g+f*p*u,this._w=l*c*u-f*p*g;break;case"ZYX":this._x=f*c*u-l*p*g,this._y=l*p*u+f*c*g,this._z=l*c*g-f*p*u,this._w=l*c*u+f*p*g;break;case"YZX":this._x=f*c*u+l*p*g,this._y=l*p*u+f*c*g,this._z=l*c*g-f*p*u,this._w=l*c*u-f*p*g;break;case"XZY":this._x=f*c*u-l*p*g,this._y=l*p*u-f*c*g,this._z=l*c*g+f*p*u,this._w=l*c*u+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const A=t/2,i=Math.sin(A);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(A),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,A=t[0],i=t[4],r=t[8],s=t[1],a=t[5],o=t[9],l=t[2],c=t[6],u=t[10],f=A+a+u;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(c-o)*p,this._y=(r-l)*p,this._z=(s-i)*p}else if(A>a&&A>u){const p=2*Math.sqrt(1+A-a-u);this._w=(c-o)/p,this._x=.25*p,this._y=(i+s)/p,this._z=(r+l)/p}else if(a>u){const p=2*Math.sqrt(1+a-A-u);this._w=(r-l)/p,this._x=(i+s)/p,this._y=.25*p,this._z=(o+c)/p}else{const p=2*Math.sqrt(1+u-A-a);this._w=(s-i)/p,this._x=(r+l)/p,this._y=(o+c)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let A=e.dot(t)+1;return A<Number.EPSILON?(A=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=A):(this._x=0,this._y=-e.z,this._z=e.y,this._w=A)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=A),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ke(this.dot(e),-1,1)))}rotateTowards(e,t){const A=this.angleTo(e);if(A===0)return this;const i=Math.min(1,t/A);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const A=e._x,i=e._y,r=e._z,s=e._w,a=t._x,o=t._y,l=t._z,c=t._w;return this._x=A*c+s*a+i*l-r*o,this._y=i*c+s*o+r*a-A*l,this._z=r*c+s*l+A*o-i*a,this._w=s*c-A*a-i*o-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const A=this._x,i=this._y,r=this._z,s=this._w;let a=s*e._w+A*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=s,this._x=A,this._y=i,this._z=r,this;const o=1-a*a;if(o<=Number.EPSILON){const p=1-t;return this._w=p*s+t*this._w,this._x=p*A+t*this._x,this._y=p*i+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}const l=Math.sqrt(o),c=Math.atan2(l,a),u=Math.sin((1-t)*c)/l,f=Math.sin(t*c)/l;return this._w=s*u+this._w*f,this._x=A*u+this._x*f,this._y=i*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,A){return this.copy(e).slerp(t,A)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),A=Math.random(),i=Math.sqrt(1-A),r=Math.sqrt(A);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class Q{constructor(e=0,t=0,A=0){Q.prototype.isVector3=!0,this.x=e,this.y=t,this.z=A}set(e,t,A){return A===void 0&&(A=this.z),this.x=e,this.y=t,this.z=A,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(tc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(tc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,A=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*A+r[6]*i,this.y=r[1]*t+r[4]*A+r[7]*i,this.z=r[2]*t+r[5]*A+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,A=this.y,i=this.z,r=e.elements,s=1/(r[3]*t+r[7]*A+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*A+r[8]*i+r[12])*s,this.y=(r[1]*t+r[5]*A+r[9]*i+r[13])*s,this.z=(r[2]*t+r[6]*A+r[10]*i+r[14])*s,this}applyQuaternion(e){const t=this.x,A=this.y,i=this.z,r=e.x,s=e.y,a=e.z,o=e.w,l=2*(s*i-a*A),c=2*(a*t-r*i),u=2*(r*A-s*t);return this.x=t+o*l+s*u-a*c,this.y=A+o*c+a*l-r*u,this.z=i+o*u+r*c-s*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,A=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*A+r[8]*i,this.y=r[1]*t+r[5]*A+r[9]*i,this.z=r[2]*t+r[6]*A+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ke(this.x,e.x,t.x),this.y=ke(this.y,e.y,t.y),this.z=ke(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ke(this.x,e,t),this.y=ke(this.y,e,t),this.z=ke(this.z,e,t),this}clampLength(e,t){const A=this.length();return this.divideScalar(A||1).multiplyScalar(ke(A,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,A){return this.x=e.x+(t.x-e.x)*A,this.y=e.y+(t.y-e.y)*A,this.z=e.z+(t.z-e.z)*A,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const A=e.x,i=e.y,r=e.z,s=t.x,a=t.y,o=t.z;return this.x=i*o-r*a,this.y=r*s-A*o,this.z=A*a-i*s,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const A=e.dot(this)/t;return this.copy(e).multiplyScalar(A)}projectOnPlane(e){return ra.copy(this).projectOnVector(e),this.sub(ra)}reflect(e){return this.sub(ra.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const A=this.dot(e)/t;return Math.acos(ke(A,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,A=this.y-e.y,i=this.z-e.z;return t*t+A*A+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,A){const i=Math.sin(t)*e;return this.x=i*Math.sin(A),this.y=Math.cos(t)*e,this.z=i*Math.cos(A),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,A){return this.x=e*Math.sin(t),this.y=A,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),A=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=A,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,A=Math.sqrt(1-t*t);return this.x=A*Math.cos(e),this.y=t,this.z=A*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ra=new Q,tc=new Rn;class rr{constructor(e=new Q(1/0,1/0,1/0),t=new Q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,A=e.length;t<A;t+=3)this.expandByPoint(hA.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,A=e.count;t<A;t++)this.expandByPoint(hA.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,A=e.length;t<A;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const A=hA.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(A),this.max.copy(e).add(A),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const A=e.geometry;if(A!==void 0){const r=A.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let s=0,a=r.count;s<a;s++)e.isMesh===!0?e.getVertexPosition(s,hA):hA.fromBufferAttribute(r,s),hA.applyMatrix4(e.matrixWorld),this.expandByPoint(hA);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),fr.copy(e.boundingBox)):(A.boundingBox===null&&A.computeBoundingBox(),fr.copy(A.boundingBox)),fr.applyMatrix4(e.matrixWorld),this.union(fr)}const i=e.children;for(let r=0,s=i.length;r<s;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,hA),hA.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,A;return e.normal.x>0?(t=e.normal.x*this.min.x,A=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,A=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,A+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,A+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,A+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,A+=e.normal.z*this.min.z),t<=-e.constant&&A>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Fi),dr.subVectors(this.max,Fi),On.subVectors(e.a,Fi),Gn.subVectors(e.b,Fi),Vn.subVectors(e.c,Fi),KA.subVectors(Gn,On),zA.subVectors(Vn,Gn),dn.subVectors(On,Vn);let t=[0,-KA.z,KA.y,0,-zA.z,zA.y,0,-dn.z,dn.y,KA.z,0,-KA.x,zA.z,0,-zA.x,dn.z,0,-dn.x,-KA.y,KA.x,0,-zA.y,zA.x,0,-dn.y,dn.x,0];return!sa(t,On,Gn,Vn,dr)||(t=[1,0,0,0,1,0,0,0,1],!sa(t,On,Gn,Vn,dr))?!1:(pr.crossVectors(KA,zA),t=[pr.x,pr.y,pr.z],sa(t,On,Gn,Vn,dr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,hA).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(hA).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(FA[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),FA[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),FA[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),FA[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),FA[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),FA[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),FA[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),FA[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(FA),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const FA=[new Q,new Q,new Q,new Q,new Q,new Q,new Q,new Q],hA=new Q,fr=new rr,On=new Q,Gn=new Q,Vn=new Q,KA=new Q,zA=new Q,dn=new Q,Fi=new Q,dr=new Q,pr=new Q,pn=new Q;function sa(n,e,t,A,i){for(let r=0,s=n.length-3;r<=s;r+=3){pn.fromArray(n,r);const a=i.x*Math.abs(pn.x)+i.y*Math.abs(pn.y)+i.z*Math.abs(pn.z),o=e.dot(pn),l=t.dot(pn),c=A.dot(pn);if(Math.max(-Math.max(o,l,c),Math.min(o,l,c))>a)return!1}return!0}const gp=new rr,bi=new Q,aa=new Q;class Os{constructor(e=new Q,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const A=this.center;t!==void 0?A.copy(t):gp.setFromPoints(e).getCenter(A);let i=0;for(let r=0,s=e.length;r<s;r++)i=Math.max(i,A.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const A=this.center.distanceToSquared(e);return t.copy(e),A>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;bi.subVectors(e,this.center);const t=bi.lengthSq();if(t>this.radius*this.radius){const A=Math.sqrt(t),i=(A-this.radius)*.5;this.center.addScaledVector(bi,i/A),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(aa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(bi.copy(e.center).add(aa)),this.expandByPoint(bi.copy(e.center).sub(aa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const bA=new Q,oa=new Q,gr=new Q,WA=new Q,la=new Q,mr=new Q,ca=new Q;class Gs{constructor(e=new Q,t=new Q(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,bA)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const A=t.dot(this.direction);return A<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,A)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=bA.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(bA.copy(this.origin).addScaledVector(this.direction,t),bA.distanceToSquared(e))}distanceSqToSegment(e,t,A,i){oa.copy(e).add(t).multiplyScalar(.5),gr.copy(t).sub(e).normalize(),WA.copy(this.origin).sub(oa);const r=e.distanceTo(t)*.5,s=-this.direction.dot(gr),a=WA.dot(this.direction),o=-WA.dot(gr),l=WA.lengthSq(),c=Math.abs(1-s*s);let u,f,p,g;if(c>0)if(u=s*o-a,f=s*a-o,g=r*c,u>=0)if(f>=-g)if(f<=g){const m=1/c;u*=m,f*=m,p=u*(u+s*f+2*a)+f*(s*u+f+2*o)+l}else f=r,u=Math.max(0,-(s*f+a)),p=-u*u+f*(f+2*o)+l;else f=-r,u=Math.max(0,-(s*f+a)),p=-u*u+f*(f+2*o)+l;else f<=-g?(u=Math.max(0,-(-s*r+a)),f=u>0?-r:Math.min(Math.max(-r,-o),r),p=-u*u+f*(f+2*o)+l):f<=g?(u=0,f=Math.min(Math.max(-r,-o),r),p=f*(f+2*o)+l):(u=Math.max(0,-(s*r+a)),f=u>0?r:Math.min(Math.max(-r,-o),r),p=-u*u+f*(f+2*o)+l);else f=s>0?-r:r,u=Math.max(0,-(s*f+a)),p=-u*u+f*(f+2*o)+l;return A&&A.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(oa).addScaledVector(gr,f),p}intersectSphere(e,t){bA.subVectors(e.center,this.origin);const A=bA.dot(this.direction),i=bA.dot(bA)-A*A,r=e.radius*e.radius;if(i>r)return null;const s=Math.sqrt(r-i),a=A-s,o=A+s;return o<0?null:a<0?this.at(o,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const A=-(this.origin.dot(e.normal)+e.constant)/t;return A>=0?A:null}intersectPlane(e,t){const A=this.distanceToPlane(e);return A===null?null:this.at(A,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let A,i,r,s,a,o;const l=1/this.direction.x,c=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(A=(e.min.x-f.x)*l,i=(e.max.x-f.x)*l):(A=(e.max.x-f.x)*l,i=(e.min.x-f.x)*l),c>=0?(r=(e.min.y-f.y)*c,s=(e.max.y-f.y)*c):(r=(e.max.y-f.y)*c,s=(e.min.y-f.y)*c),A>s||r>i||((r>A||isNaN(A))&&(A=r),(s<i||isNaN(i))&&(i=s),u>=0?(a=(e.min.z-f.z)*u,o=(e.max.z-f.z)*u):(a=(e.max.z-f.z)*u,o=(e.min.z-f.z)*u),A>o||a>i)||((a>A||A!==A)&&(A=a),(o<i||i!==i)&&(i=o),i<0)?null:this.at(A>=0?A:i,t)}intersectsBox(e){return this.intersectBox(e,bA)!==null}intersectTriangle(e,t,A,i,r){la.subVectors(t,e),mr.subVectors(A,e),ca.crossVectors(la,mr);let s=this.direction.dot(ca),a;if(s>0){if(i)return null;a=1}else if(s<0)a=-1,s=-s;else return null;WA.subVectors(this.origin,e);const o=a*this.direction.dot(mr.crossVectors(WA,mr));if(o<0)return null;const l=a*this.direction.dot(la.cross(WA));if(l<0||o+l>s)return null;const c=-a*WA.dot(ca);return c<0?null:this.at(c/s,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ut{constructor(e,t,A,i,r,s,a,o,l,c,u,f,p,g,m,d){ut.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,A,i,r,s,a,o,l,c,u,f,p,g,m,d)}set(e,t,A,i,r,s,a,o,l,c,u,f,p,g,m,d){const h=this.elements;return h[0]=e,h[4]=t,h[8]=A,h[12]=i,h[1]=r,h[5]=s,h[9]=a,h[13]=o,h[2]=l,h[6]=c,h[10]=u,h[14]=f,h[3]=p,h[7]=g,h[11]=m,h[15]=d,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ut().fromArray(this.elements)}copy(e){const t=this.elements,A=e.elements;return t[0]=A[0],t[1]=A[1],t[2]=A[2],t[3]=A[3],t[4]=A[4],t[5]=A[5],t[6]=A[6],t[7]=A[7],t[8]=A[8],t[9]=A[9],t[10]=A[10],t[11]=A[11],t[12]=A[12],t[13]=A[13],t[14]=A[14],t[15]=A[15],this}copyPosition(e){const t=this.elements,A=e.elements;return t[12]=A[12],t[13]=A[13],t[14]=A[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,A){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),A.setFromMatrixColumn(this,2),this}makeBasis(e,t,A){return this.set(e.x,t.x,A.x,0,e.y,t.y,A.y,0,e.z,t.z,A.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,A=e.elements,i=1/kn.setFromMatrixColumn(e,0).length(),r=1/kn.setFromMatrixColumn(e,1).length(),s=1/kn.setFromMatrixColumn(e,2).length();return t[0]=A[0]*i,t[1]=A[1]*i,t[2]=A[2]*i,t[3]=0,t[4]=A[4]*r,t[5]=A[5]*r,t[6]=A[6]*r,t[7]=0,t[8]=A[8]*s,t[9]=A[9]*s,t[10]=A[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,A=e.x,i=e.y,r=e.z,s=Math.cos(A),a=Math.sin(A),o=Math.cos(i),l=Math.sin(i),c=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const f=s*c,p=s*u,g=a*c,m=a*u;t[0]=o*c,t[4]=-o*u,t[8]=l,t[1]=p+g*l,t[5]=f-m*l,t[9]=-a*o,t[2]=m-f*l,t[6]=g+p*l,t[10]=s*o}else if(e.order==="YXZ"){const f=o*c,p=o*u,g=l*c,m=l*u;t[0]=f+m*a,t[4]=g*a-p,t[8]=s*l,t[1]=s*u,t[5]=s*c,t[9]=-a,t[2]=p*a-g,t[6]=m+f*a,t[10]=s*o}else if(e.order==="ZXY"){const f=o*c,p=o*u,g=l*c,m=l*u;t[0]=f-m*a,t[4]=-s*u,t[8]=g+p*a,t[1]=p+g*a,t[5]=s*c,t[9]=m-f*a,t[2]=-s*l,t[6]=a,t[10]=s*o}else if(e.order==="ZYX"){const f=s*c,p=s*u,g=a*c,m=a*u;t[0]=o*c,t[4]=g*l-p,t[8]=f*l+m,t[1]=o*u,t[5]=m*l+f,t[9]=p*l-g,t[2]=-l,t[6]=a*o,t[10]=s*o}else if(e.order==="YZX"){const f=s*o,p=s*l,g=a*o,m=a*l;t[0]=o*c,t[4]=m-f*u,t[8]=g*u+p,t[1]=u,t[5]=s*c,t[9]=-a*c,t[2]=-l*c,t[6]=p*u+g,t[10]=f-m*u}else if(e.order==="XZY"){const f=s*o,p=s*l,g=a*o,m=a*l;t[0]=o*c,t[4]=-u,t[8]=l*c,t[1]=f*u+m,t[5]=s*c,t[9]=p*u-g,t[2]=g*u-p,t[6]=a*c,t[10]=m*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(mp,e,Bp)}lookAt(e,t,A){const i=this.elements;return Jt.subVectors(e,t),Jt.lengthSq()===0&&(Jt.z=1),Jt.normalize(),XA.crossVectors(A,Jt),XA.lengthSq()===0&&(Math.abs(A.z)===1?Jt.x+=1e-4:Jt.z+=1e-4,Jt.normalize(),XA.crossVectors(A,Jt)),XA.normalize(),Br.crossVectors(Jt,XA),i[0]=XA.x,i[4]=Br.x,i[8]=Jt.x,i[1]=XA.y,i[5]=Br.y,i[9]=Jt.y,i[2]=XA.z,i[6]=Br.z,i[10]=Jt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const A=e.elements,i=t.elements,r=this.elements,s=A[0],a=A[4],o=A[8],l=A[12],c=A[1],u=A[5],f=A[9],p=A[13],g=A[2],m=A[6],d=A[10],h=A[14],E=A[3],U=A[7],B=A[11],M=A[15],x=i[0],S=i[4],F=i[8],_=i[12],v=i[1],b=i[5],H=i[9],L=i[13],G=i[2],X=i[6],K=i[10],Y=i[14],k=i[3],ne=i[7],oe=i[11],Be=i[15];return r[0]=s*x+a*v+o*G+l*k,r[4]=s*S+a*b+o*X+l*ne,r[8]=s*F+a*H+o*K+l*oe,r[12]=s*_+a*L+o*Y+l*Be,r[1]=c*x+u*v+f*G+p*k,r[5]=c*S+u*b+f*X+p*ne,r[9]=c*F+u*H+f*K+p*oe,r[13]=c*_+u*L+f*Y+p*Be,r[2]=g*x+m*v+d*G+h*k,r[6]=g*S+m*b+d*X+h*ne,r[10]=g*F+m*H+d*K+h*oe,r[14]=g*_+m*L+d*Y+h*Be,r[3]=E*x+U*v+B*G+M*k,r[7]=E*S+U*b+B*X+M*ne,r[11]=E*F+U*H+B*K+M*oe,r[15]=E*_+U*L+B*Y+M*Be,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],A=e[4],i=e[8],r=e[12],s=e[1],a=e[5],o=e[9],l=e[13],c=e[2],u=e[6],f=e[10],p=e[14],g=e[3],m=e[7],d=e[11],h=e[15];return g*(+r*o*u-i*l*u-r*a*f+A*l*f+i*a*p-A*o*p)+m*(+t*o*p-t*l*f+r*s*f-i*s*p+i*l*c-r*o*c)+d*(+t*l*u-t*a*p-r*s*u+A*s*p+r*a*c-A*l*c)+h*(-i*a*c-t*o*u+t*a*f+i*s*u-A*s*f+A*o*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,A){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=A),this}invert(){const e=this.elements,t=e[0],A=e[1],i=e[2],r=e[3],s=e[4],a=e[5],o=e[6],l=e[7],c=e[8],u=e[9],f=e[10],p=e[11],g=e[12],m=e[13],d=e[14],h=e[15],E=u*d*l-m*f*l+m*o*p-a*d*p-u*o*h+a*f*h,U=g*f*l-c*d*l-g*o*p+s*d*p+c*o*h-s*f*h,B=c*m*l-g*u*l+g*a*p-s*m*p-c*a*h+s*u*h,M=g*u*o-c*m*o-g*a*f+s*m*f+c*a*d-s*u*d,x=t*E+A*U+i*B+r*M;if(x===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const S=1/x;return e[0]=E*S,e[1]=(m*f*r-u*d*r-m*i*p+A*d*p+u*i*h-A*f*h)*S,e[2]=(a*d*r-m*o*r+m*i*l-A*d*l-a*i*h+A*o*h)*S,e[3]=(u*o*r-a*f*r-u*i*l+A*f*l+a*i*p-A*o*p)*S,e[4]=U*S,e[5]=(c*d*r-g*f*r+g*i*p-t*d*p-c*i*h+t*f*h)*S,e[6]=(g*o*r-s*d*r-g*i*l+t*d*l+s*i*h-t*o*h)*S,e[7]=(s*f*r-c*o*r+c*i*l-t*f*l-s*i*p+t*o*p)*S,e[8]=B*S,e[9]=(g*u*r-c*m*r-g*A*p+t*m*p+c*A*h-t*u*h)*S,e[10]=(s*m*r-g*a*r+g*A*l-t*m*l-s*A*h+t*a*h)*S,e[11]=(c*a*r-s*u*r-c*A*l+t*u*l+s*A*p-t*a*p)*S,e[12]=M*S,e[13]=(c*m*i-g*u*i+g*A*f-t*m*f-c*A*d+t*u*d)*S,e[14]=(g*a*i-s*m*i-g*A*o+t*m*o+s*A*d-t*a*d)*S,e[15]=(s*u*i-c*a*i+c*A*o-t*u*o-s*A*f+t*a*f)*S,this}scale(e){const t=this.elements,A=e.x,i=e.y,r=e.z;return t[0]*=A,t[4]*=i,t[8]*=r,t[1]*=A,t[5]*=i,t[9]*=r,t[2]*=A,t[6]*=i,t[10]*=r,t[3]*=A,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],A=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,A,i))}makeTranslation(e,t,A){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,A,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),A=Math.sin(e);return this.set(1,0,0,0,0,t,-A,0,0,A,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),A=Math.sin(e);return this.set(t,0,A,0,0,1,0,0,-A,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),A=Math.sin(e);return this.set(t,-A,0,0,A,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const A=Math.cos(t),i=Math.sin(t),r=1-A,s=e.x,a=e.y,o=e.z,l=r*s,c=r*a;return this.set(l*s+A,l*a-i*o,l*o+i*a,0,l*a+i*o,c*a+A,c*o-i*s,0,l*o-i*a,c*o+i*s,r*o*o+A,0,0,0,0,1),this}makeScale(e,t,A){return this.set(e,0,0,0,0,t,0,0,0,0,A,0,0,0,0,1),this}makeShear(e,t,A,i,r,s){return this.set(1,A,r,0,e,1,s,0,t,i,1,0,0,0,0,1),this}compose(e,t,A){const i=this.elements,r=t._x,s=t._y,a=t._z,o=t._w,l=r+r,c=s+s,u=a+a,f=r*l,p=r*c,g=r*u,m=s*c,d=s*u,h=a*u,E=o*l,U=o*c,B=o*u,M=A.x,x=A.y,S=A.z;return i[0]=(1-(m+h))*M,i[1]=(p+B)*M,i[2]=(g-U)*M,i[3]=0,i[4]=(p-B)*x,i[5]=(1-(f+h))*x,i[6]=(d+E)*x,i[7]=0,i[8]=(g+U)*S,i[9]=(d-E)*S,i[10]=(1-(f+m))*S,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,A){const i=this.elements;let r=kn.set(i[0],i[1],i[2]).length();const s=kn.set(i[4],i[5],i[6]).length(),a=kn.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],fA.copy(this);const l=1/r,c=1/s,u=1/a;return fA.elements[0]*=l,fA.elements[1]*=l,fA.elements[2]*=l,fA.elements[4]*=c,fA.elements[5]*=c,fA.elements[6]*=c,fA.elements[8]*=u,fA.elements[9]*=u,fA.elements[10]*=u,t.setFromRotationMatrix(fA),A.x=r,A.y=s,A.z=a,this}makePerspective(e,t,A,i,r,s,a=PA){const o=this.elements,l=2*r/(t-e),c=2*r/(A-i),u=(t+e)/(t-e),f=(A+i)/(A-i);let p,g;if(a===PA)p=-(s+r)/(s-r),g=-2*s*r/(s-r);else if(a===xs)p=-s/(s-r),g=-s*r/(s-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return o[0]=l,o[4]=0,o[8]=u,o[12]=0,o[1]=0,o[5]=c,o[9]=f,o[13]=0,o[2]=0,o[6]=0,o[10]=p,o[14]=g,o[3]=0,o[7]=0,o[11]=-1,o[15]=0,this}makeOrthographic(e,t,A,i,r,s,a=PA){const o=this.elements,l=1/(t-e),c=1/(A-i),u=1/(s-r),f=(t+e)*l,p=(A+i)*c;let g,m;if(a===PA)g=(s+r)*u,m=-2*u;else if(a===xs)g=r*u,m=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return o[0]=2*l,o[4]=0,o[8]=0,o[12]=-f,o[1]=0,o[5]=2*c,o[9]=0,o[13]=-p,o[2]=0,o[6]=0,o[10]=m,o[14]=-g,o[3]=0,o[7]=0,o[11]=0,o[15]=1,this}equals(e){const t=this.elements,A=e.elements;for(let i=0;i<16;i++)if(t[i]!==A[i])return!1;return!0}fromArray(e,t=0){for(let A=0;A<16;A++)this.elements[A]=e[A+t];return this}toArray(e=[],t=0){const A=this.elements;return e[t]=A[0],e[t+1]=A[1],e[t+2]=A[2],e[t+3]=A[3],e[t+4]=A[4],e[t+5]=A[5],e[t+6]=A[6],e[t+7]=A[7],e[t+8]=A[8],e[t+9]=A[9],e[t+10]=A[10],e[t+11]=A[11],e[t+12]=A[12],e[t+13]=A[13],e[t+14]=A[14],e[t+15]=A[15],e}}const kn=new Q,fA=new ut,mp=new Q(0,0,0),Bp=new Q(1,1,1),XA=new Q,Br=new Q,Jt=new Q,Ac=new ut,nc=new Rn;class VA{constructor(e=0,t=0,A=0,i=VA.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=A,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,A,i=this._order){return this._x=e,this._y=t,this._z=A,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,A=!0){const i=e.elements,r=i[0],s=i[4],a=i[8],o=i[1],l=i[5],c=i[9],u=i[2],f=i[6],p=i[10];switch(t){case"XYZ":this._y=Math.asin(ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-c,p),this._z=Math.atan2(-s,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ke(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(o,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(ke(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-s,l)):(this._y=0,this._z=Math.atan2(o,r));break;case"ZYX":this._y=Math.asin(-ke(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(o,r)):(this._x=0,this._z=Math.atan2(-s,l));break;case"YZX":this._z=Math.asin(ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-c,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-ke(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-c,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,A===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,A){return Ac.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ac,t,A)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return nc.setFromEuler(this),this.setFromQuaternion(nc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}VA.DEFAULT_ORDER="XYZ";class Ul{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let wp=0;const ic=new Q,Kn=new Rn,TA=new ut,wr=new Q,Ti=new Q,_p=new Q,vp=new Rn,rc=new Q(1,0,0),sc=new Q(0,1,0),ac=new Q(0,0,1),oc={type:"added"},Cp={type:"removed"},zn={type:"childadded",child:null},ua={type:"childremoved",child:null};class Tt extends Dn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:wp++}),this.uuid=ir(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Tt.DEFAULT_UP.clone();const e=new Q,t=new VA,A=new Rn,i=new Q(1,1,1);function r(){A.setFromEuler(t,!1)}function s(){t.setFromQuaternion(A,void 0,!1)}t._onChange(r),A._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:A},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ut},normalMatrix:{value:new He}}),this.matrix=new ut,this.matrixWorld=new ut,this.matrixAutoUpdate=Tt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Tt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ul,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Kn.setFromAxisAngle(e,t),this.quaternion.multiply(Kn),this}rotateOnWorldAxis(e,t){return Kn.setFromAxisAngle(e,t),this.quaternion.premultiply(Kn),this}rotateX(e){return this.rotateOnAxis(rc,e)}rotateY(e){return this.rotateOnAxis(sc,e)}rotateZ(e){return this.rotateOnAxis(ac,e)}translateOnAxis(e,t){return ic.copy(e).applyQuaternion(this.quaternion),this.position.add(ic.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(rc,e)}translateY(e){return this.translateOnAxis(sc,e)}translateZ(e){return this.translateOnAxis(ac,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(TA.copy(this.matrixWorld).invert())}lookAt(e,t,A){e.isVector3?wr.copy(e):wr.set(e,t,A);const i=this.parent;this.updateWorldMatrix(!0,!1),Ti.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?TA.lookAt(Ti,wr,this.up):TA.lookAt(wr,Ti,this.up),this.quaternion.setFromRotationMatrix(TA),i&&(TA.extractRotation(i.matrixWorld),Kn.setFromRotationMatrix(TA),this.quaternion.premultiply(Kn.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(oc),zn.child=e,this.dispatchEvent(zn),zn.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let A=0;A<arguments.length;A++)this.remove(arguments[A]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Cp),ua.child=e,this.dispatchEvent(ua),ua.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),TA.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),TA.multiply(e.parent.matrixWorld)),e.applyMatrix4(TA),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(oc),zn.child=e,this.dispatchEvent(zn),zn.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let A=0,i=this.children.length;A<i;A++){const s=this.children[A].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,A=[]){this[e]===t&&A.push(this);const i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].getObjectsByProperty(e,t,A);return A}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ti,e,_p),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ti,vp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let A=0,i=t.length;A<i;A++)t[A].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let A=0,i=t.length;A<i;A++)t[A].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let A=0,i=t.length;A<i;A++)t[A].updateMatrixWorld(e)}updateWorldMatrix(e,t){const A=this.parent;if(e===!0&&A!==null&&A.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",A={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},A.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,o){return a[o.uuid]===void 0&&(a[o.uuid]=o.toJSON(e)),o.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const o=a.shapes;if(Array.isArray(o))for(let l=0,c=o.length;l<c;l++){const u=o[l];r(e.shapes,u)}else r(e.shapes,o)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let o=0,l=this.material.length;o<l;o++)a.push(r(e.materials,this.material[o]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const o=this.animations[a];i.animations.push(r(e.animations,o))}}if(t){const a=s(e.geometries),o=s(e.materials),l=s(e.textures),c=s(e.images),u=s(e.shapes),f=s(e.skeletons),p=s(e.animations),g=s(e.nodes);a.length>0&&(A.geometries=a),o.length>0&&(A.materials=o),l.length>0&&(A.textures=l),c.length>0&&(A.images=c),u.length>0&&(A.shapes=u),f.length>0&&(A.skeletons=f),p.length>0&&(A.animations=p),g.length>0&&(A.nodes=g)}return A.object=i,A;function s(a){const o=[];for(const l in a){const c=a[l];delete c.metadata,o.push(c)}return o}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let A=0;A<e.children.length;A++){const i=e.children[A];this.add(i.clone())}return this}}Tt.DEFAULT_UP=new Q(0,1,0);Tt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Tt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const dA=new Q,QA=new Q,ha=new Q,IA=new Q,Wn=new Q,Xn=new Q,lc=new Q,fa=new Q,da=new Q,pa=new Q,ga=new mt,ma=new mt,Ba=new mt;class aA{constructor(e=new Q,t=new Q,A=new Q){this.a=e,this.b=t,this.c=A}static getNormal(e,t,A,i){i.subVectors(A,t),dA.subVectors(e,t),i.cross(dA);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,A,i,r){dA.subVectors(i,t),QA.subVectors(A,t),ha.subVectors(e,t);const s=dA.dot(dA),a=dA.dot(QA),o=dA.dot(ha),l=QA.dot(QA),c=QA.dot(ha),u=s*l-a*a;if(u===0)return r.set(0,0,0),null;const f=1/u,p=(l*o-a*c)*f,g=(s*c-a*o)*f;return r.set(1-p-g,g,p)}static containsPoint(e,t,A,i){return this.getBarycoord(e,t,A,i,IA)===null?!1:IA.x>=0&&IA.y>=0&&IA.x+IA.y<=1}static getInterpolation(e,t,A,i,r,s,a,o){return this.getBarycoord(e,t,A,i,IA)===null?(o.x=0,o.y=0,"z"in o&&(o.z=0),"w"in o&&(o.w=0),null):(o.setScalar(0),o.addScaledVector(r,IA.x),o.addScaledVector(s,IA.y),o.addScaledVector(a,IA.z),o)}static getInterpolatedAttribute(e,t,A,i,r,s){return ga.setScalar(0),ma.setScalar(0),Ba.setScalar(0),ga.fromBufferAttribute(e,t),ma.fromBufferAttribute(e,A),Ba.fromBufferAttribute(e,i),s.setScalar(0),s.addScaledVector(ga,r.x),s.addScaledVector(ma,r.y),s.addScaledVector(Ba,r.z),s}static isFrontFacing(e,t,A,i){return dA.subVectors(A,t),QA.subVectors(e,t),dA.cross(QA).dot(i)<0}set(e,t,A){return this.a.copy(e),this.b.copy(t),this.c.copy(A),this}setFromPointsAndIndices(e,t,A,i){return this.a.copy(e[t]),this.b.copy(e[A]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,A,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,A),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return dA.subVectors(this.c,this.b),QA.subVectors(this.a,this.b),dA.cross(QA).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return aA.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return aA.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,A,i,r){return aA.getInterpolation(e,this.a,this.b,this.c,t,A,i,r)}containsPoint(e){return aA.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return aA.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const A=this.a,i=this.b,r=this.c;let s,a;Wn.subVectors(i,A),Xn.subVectors(r,A),fa.subVectors(e,A);const o=Wn.dot(fa),l=Xn.dot(fa);if(o<=0&&l<=0)return t.copy(A);da.subVectors(e,i);const c=Wn.dot(da),u=Xn.dot(da);if(c>=0&&u<=c)return t.copy(i);const f=o*u-c*l;if(f<=0&&o>=0&&c<=0)return s=o/(o-c),t.copy(A).addScaledVector(Wn,s);pa.subVectors(e,r);const p=Wn.dot(pa),g=Xn.dot(pa);if(g>=0&&p<=g)return t.copy(r);const m=p*l-o*g;if(m<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(A).addScaledVector(Xn,a);const d=c*g-p*u;if(d<=0&&u-c>=0&&p-g>=0)return lc.subVectors(r,i),a=(u-c)/(u-c+(p-g)),t.copy(i).addScaledVector(lc,a);const h=1/(d+m+f);return s=m*h,a=f*h,t.copy(A).addScaledVector(Wn,s).addScaledVector(Xn,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Uh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},YA={h:0,s:0,l:0},_r={h:0,s:0,l:0};function wa(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ye{constructor(e,t,A){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,A)}set(e,t,A){if(t===void 0&&A===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,A);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=iA){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Xe.toWorkingColorSpace(this,t),this}setRGB(e,t,A,i=Xe.workingColorSpace){return this.r=e,this.g=t,this.b=A,Xe.toWorkingColorSpace(this,i),this}setHSL(e,t,A,i=Xe.workingColorSpace){if(e=ip(e,1),t=ke(t,0,1),A=ke(A,0,1),t===0)this.r=this.g=this.b=A;else{const r=A<=.5?A*(1+t):A+t-A*t,s=2*A-r;this.r=wa(s,r,e+1/3),this.g=wa(s,r,e),this.b=wa(s,r,e-1/3)}return Xe.toWorkingColorSpace(this,i),this}setStyle(e,t=iA){function A(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const s=i[1],a=i[2];switch(s){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return A(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return A(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return A(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],s=r.length;if(s===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=iA){const A=Uh[e.toLowerCase()];return A!==void 0?this.setHex(A,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=NA(e.r),this.g=NA(e.g),this.b=NA(e.b),this}copyLinearToSRGB(e){return this.r=di(e.r),this.g=di(e.g),this.b=di(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=iA){return Xe.fromWorkingColorSpace(Lt.copy(this),e),Math.round(ke(Lt.r*255,0,255))*65536+Math.round(ke(Lt.g*255,0,255))*256+Math.round(ke(Lt.b*255,0,255))}getHexString(e=iA){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Xe.workingColorSpace){Xe.fromWorkingColorSpace(Lt.copy(this),t);const A=Lt.r,i=Lt.g,r=Lt.b,s=Math.max(A,i,r),a=Math.min(A,i,r);let o,l;const c=(a+s)/2;if(a===s)o=0,l=0;else{const u=s-a;switch(l=c<=.5?u/(s+a):u/(2-s-a),s){case A:o=(i-r)/u+(i<r?6:0);break;case i:o=(r-A)/u+2;break;case r:o=(A-i)/u+4;break}o/=6}return e.h=o,e.s=l,e.l=c,e}getRGB(e,t=Xe.workingColorSpace){return Xe.fromWorkingColorSpace(Lt.copy(this),t),e.r=Lt.r,e.g=Lt.g,e.b=Lt.b,e}getStyle(e=iA){Xe.fromWorkingColorSpace(Lt.copy(this),e);const t=Lt.r,A=Lt.g,i=Lt.b;return e!==iA?`color(${e} ${t.toFixed(3)} ${A.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(A*255)},${Math.round(i*255)})`}offsetHSL(e,t,A){return this.getHSL(YA),this.setHSL(YA.h+e,YA.s+t,YA.l+A)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,A){return this.r=e.r+(t.r-e.r)*A,this.g=e.g+(t.g-e.g)*A,this.b=e.b+(t.b-e.b)*A,this}lerpHSL(e,t){this.getHSL(YA),e.getHSL(_r);const A=Aa(YA.h,_r.h,t),i=Aa(YA.s,_r.s,t),r=Aa(YA.l,_r.l,t);return this.setHSL(A,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,A=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*A+r[6]*i,this.g=r[1]*t+r[4]*A+r[7]*i,this.b=r[2]*t+r[5]*A+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Lt=new Ye;Ye.NAMES=Uh;let Ep=0;class sr extends Dn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ep++}),this.uuid=ir(),this.name="",this.type="Material",this.blending=hi,this.side=ln,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ro,this.blendDst=so,this.blendEquation=xn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ye(0,0,0),this.blendAlpha=0,this.depthFunc=mi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Jl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Pn,this.stencilZFail=Pn,this.stencilZPass=Pn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const A=e[t];if(A===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(A):i&&i.isVector3&&A&&A.isVector3?i.copy(A):this[t]=A}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const A={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};A.uuid=this.uuid,A.type=this.type,this.name!==""&&(A.name=this.name),this.color&&this.color.isColor&&(A.color=this.color.getHex()),this.roughness!==void 0&&(A.roughness=this.roughness),this.metalness!==void 0&&(A.metalness=this.metalness),this.sheen!==void 0&&(A.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(A.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(A.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(A.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(A.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(A.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(A.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(A.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(A.shininess=this.shininess),this.clearcoat!==void 0&&(A.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(A.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(A.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(A.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(A.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,A.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(A.dispersion=this.dispersion),this.iridescence!==void 0&&(A.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(A.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(A.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(A.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(A.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(A.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(A.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(A.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(A.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(A.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(A.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(A.lightMap=this.lightMap.toJSON(e).uuid,A.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(A.aoMap=this.aoMap.toJSON(e).uuid,A.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(A.bumpMap=this.bumpMap.toJSON(e).uuid,A.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(A.normalMap=this.normalMap.toJSON(e).uuid,A.normalMapType=this.normalMapType,A.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(A.displacementMap=this.displacementMap.toJSON(e).uuid,A.displacementScale=this.displacementScale,A.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(A.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(A.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(A.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(A.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(A.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(A.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(A.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(A.combine=this.combine)),this.envMapRotation!==void 0&&(A.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(A.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(A.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(A.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(A.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(A.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(A.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(A.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(A.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(A.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(A.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(A.size=this.size),this.shadowSide!==null&&(A.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(A.sizeAttenuation=this.sizeAttenuation),this.blending!==hi&&(A.blending=this.blending),this.side!==ln&&(A.side=this.side),this.vertexColors===!0&&(A.vertexColors=!0),this.opacity<1&&(A.opacity=this.opacity),this.transparent===!0&&(A.transparent=!0),this.blendSrc!==ro&&(A.blendSrc=this.blendSrc),this.blendDst!==so&&(A.blendDst=this.blendDst),this.blendEquation!==xn&&(A.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(A.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(A.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(A.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(A.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(A.blendAlpha=this.blendAlpha),this.depthFunc!==mi&&(A.depthFunc=this.depthFunc),this.depthTest===!1&&(A.depthTest=this.depthTest),this.depthWrite===!1&&(A.depthWrite=this.depthWrite),this.colorWrite===!1&&(A.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(A.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Jl&&(A.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(A.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(A.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Pn&&(A.stencilFail=this.stencilFail),this.stencilZFail!==Pn&&(A.stencilZFail=this.stencilZFail),this.stencilZPass!==Pn&&(A.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(A.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(A.rotation=this.rotation),this.polygonOffset===!0&&(A.polygonOffset=!0),this.polygonOffsetFactor!==0&&(A.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(A.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(A.linewidth=this.linewidth),this.dashSize!==void 0&&(A.dashSize=this.dashSize),this.gapSize!==void 0&&(A.gapSize=this.gapSize),this.scale!==void 0&&(A.scale=this.scale),this.dithering===!0&&(A.dithering=!0),this.alphaTest>0&&(A.alphaTest=this.alphaTest),this.alphaHash===!0&&(A.alphaHash=!0),this.alphaToCoverage===!0&&(A.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(A.premultipliedAlpha=!0),this.forceSinglePass===!0&&(A.forceSinglePass=!0),this.wireframe===!0&&(A.wireframe=!0),this.wireframeLinewidth>1&&(A.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(A.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(A.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(A.flatShading=!0),this.visible===!1&&(A.visible=!1),this.toneMapped===!1&&(A.toneMapped=!1),this.fog===!1&&(A.fog=!1),Object.keys(this.userData).length>0&&(A.userData=this.userData);function i(r){const s=[];for(const a in r){const o=r[a];delete o.metadata,s.push(o)}return s}if(t){const r=i(e.textures),s=i(e.images);r.length>0&&(A.textures=r),s.length>0&&(A.images=s)}return A}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let A=null;if(t!==null){const i=t.length;A=new Array(i);for(let r=0;r!==i;++r)A[r]=t[r].clone()}return this.clippingPlanes=A,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class pi extends sr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new VA,this.combine=lh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const wt=new Q,vr=new Pe;class xA{constructor(e,t,A=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=A,this.usage=ql,this.updateRanges=[],this.gpuType=HA,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,A){e*=this.itemSize,A*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[A+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,A=this.count;t<A;t++)vr.fromBufferAttribute(this,t),vr.applyMatrix3(e),this.setXY(t,vr.x,vr.y);else if(this.itemSize===3)for(let t=0,A=this.count;t<A;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix3(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyMatrix4(e){for(let t=0,A=this.count;t<A;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix4(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyNormalMatrix(e){for(let t=0,A=this.count;t<A;t++)wt.fromBufferAttribute(this,t),wt.applyNormalMatrix(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}transformDirection(e){for(let t=0,A=this.count;t<A;t++)wt.fromBufferAttribute(this,t),wt.transformDirection(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let A=this.array[e*this.itemSize+t];return this.normalized&&(A=Mi(A,this.array)),A}setComponent(e,t,A){return this.normalized&&(A=Vt(A,this.array)),this.array[e*this.itemSize+t]=A,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Mi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Mi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Mi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Mi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,A){return e*=this.itemSize,this.normalized&&(t=Vt(t,this.array),A=Vt(A,this.array)),this.array[e+0]=t,this.array[e+1]=A,this}setXYZ(e,t,A,i){return e*=this.itemSize,this.normalized&&(t=Vt(t,this.array),A=Vt(A,this.array),i=Vt(i,this.array)),this.array[e+0]=t,this.array[e+1]=A,this.array[e+2]=i,this}setXYZW(e,t,A,i,r){return e*=this.itemSize,this.normalized&&(t=Vt(t,this.array),A=Vt(A,this.array),i=Vt(i,this.array),r=Vt(r,this.array)),this.array[e+0]=t,this.array[e+1]=A,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ql&&(e.usage=this.usage),e}}class yh extends xA{constructor(e,t,A){super(new Uint16Array(e),t,A)}}class Sh extends xA{constructor(e,t,A){super(new Uint32Array(e),t,A)}}class Qt extends xA{constructor(e,t,A){super(new Float32Array(e),t,A)}}let xp=0;const AA=new ut,_a=new Tt,Yn=new Q,qt=new rr,Qi=new rr,Ut=new Q;class $t extends Dn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:xp++}),this.uuid=ir(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ch(e)?Sh:yh)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,A=0){this.groups.push({start:e,count:t,materialIndex:A})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const A=this.attributes.normal;if(A!==void 0){const r=new He().getNormalMatrix(e);A.applyNormalMatrix(r),A.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return AA.makeRotationFromQuaternion(e),this.applyMatrix4(AA),this}rotateX(e){return AA.makeRotationX(e),this.applyMatrix4(AA),this}rotateY(e){return AA.makeRotationY(e),this.applyMatrix4(AA),this}rotateZ(e){return AA.makeRotationZ(e),this.applyMatrix4(AA),this}translate(e,t,A){return AA.makeTranslation(e,t,A),this.applyMatrix4(AA),this}scale(e,t,A){return AA.makeScale(e,t,A),this.applyMatrix4(AA),this}lookAt(e){return _a.lookAt(e),_a.updateMatrix(),this.applyMatrix4(_a.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Yn).negate(),this.translate(Yn.x,Yn.y,Yn.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const A=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];A.push(s.x,s.y,s.z||0)}this.setAttribute("position",new Qt(A,3))}else{const A=Math.min(e.length,t.count);for(let i=0;i<A;i++){const r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new rr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Q(-1/0,-1/0,-1/0),new Q(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let A=0,i=t.length;A<i;A++){const r=t[A];qt.setFromBufferAttribute(r),this.morphTargetsRelative?(Ut.addVectors(this.boundingBox.min,qt.min),this.boundingBox.expandByPoint(Ut),Ut.addVectors(this.boundingBox.max,qt.max),this.boundingBox.expandByPoint(Ut)):(this.boundingBox.expandByPoint(qt.min),this.boundingBox.expandByPoint(qt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Os);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Q,1/0);return}if(e){const A=this.boundingSphere.center;if(qt.setFromBufferAttribute(e),t)for(let r=0,s=t.length;r<s;r++){const a=t[r];Qi.setFromBufferAttribute(a),this.morphTargetsRelative?(Ut.addVectors(qt.min,Qi.min),qt.expandByPoint(Ut),Ut.addVectors(qt.max,Qi.max),qt.expandByPoint(Ut)):(qt.expandByPoint(Qi.min),qt.expandByPoint(Qi.max))}qt.getCenter(A);let i=0;for(let r=0,s=e.count;r<s;r++)Ut.fromBufferAttribute(e,r),i=Math.max(i,A.distanceToSquared(Ut));if(t)for(let r=0,s=t.length;r<s;r++){const a=t[r],o=this.morphTargetsRelative;for(let l=0,c=a.count;l<c;l++)Ut.fromBufferAttribute(a,l),o&&(Yn.fromBufferAttribute(e,l),Ut.add(Yn)),i=Math.max(i,A.distanceToSquared(Ut))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const A=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new xA(new Float32Array(4*A.count),4));const s=this.getAttribute("tangent"),a=[],o=[];for(let F=0;F<A.count;F++)a[F]=new Q,o[F]=new Q;const l=new Q,c=new Q,u=new Q,f=new Pe,p=new Pe,g=new Pe,m=new Q,d=new Q;function h(F,_,v){l.fromBufferAttribute(A,F),c.fromBufferAttribute(A,_),u.fromBufferAttribute(A,v),f.fromBufferAttribute(r,F),p.fromBufferAttribute(r,_),g.fromBufferAttribute(r,v),c.sub(l),u.sub(l),p.sub(f),g.sub(f);const b=1/(p.x*g.y-g.x*p.y);isFinite(b)&&(m.copy(c).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(b),d.copy(u).multiplyScalar(p.x).addScaledVector(c,-g.x).multiplyScalar(b),a[F].add(m),a[_].add(m),a[v].add(m),o[F].add(d),o[_].add(d),o[v].add(d))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let F=0,_=E.length;F<_;++F){const v=E[F],b=v.start,H=v.count;for(let L=b,G=b+H;L<G;L+=3)h(e.getX(L+0),e.getX(L+1),e.getX(L+2))}const U=new Q,B=new Q,M=new Q,x=new Q;function S(F){M.fromBufferAttribute(i,F),x.copy(M);const _=a[F];U.copy(_),U.sub(M.multiplyScalar(M.dot(_))).normalize(),B.crossVectors(x,_);const b=B.dot(o[F])<0?-1:1;s.setXYZW(F,U.x,U.y,U.z,b)}for(let F=0,_=E.length;F<_;++F){const v=E[F],b=v.start,H=v.count;for(let L=b,G=b+H;L<G;L+=3)S(e.getX(L+0)),S(e.getX(L+1)),S(e.getX(L+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let A=this.getAttribute("normal");if(A===void 0)A=new xA(new Float32Array(t.count*3),3),this.setAttribute("normal",A);else for(let f=0,p=A.count;f<p;f++)A.setXYZ(f,0,0,0);const i=new Q,r=new Q,s=new Q,a=new Q,o=new Q,l=new Q,c=new Q,u=new Q;if(e)for(let f=0,p=e.count;f<p;f+=3){const g=e.getX(f+0),m=e.getX(f+1),d=e.getX(f+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,m),s.fromBufferAttribute(t,d),c.subVectors(s,r),u.subVectors(i,r),c.cross(u),a.fromBufferAttribute(A,g),o.fromBufferAttribute(A,m),l.fromBufferAttribute(A,d),a.add(c),o.add(c),l.add(c),A.setXYZ(g,a.x,a.y,a.z),A.setXYZ(m,o.x,o.y,o.z),A.setXYZ(d,l.x,l.y,l.z)}else for(let f=0,p=t.count;f<p;f+=3)i.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),s.fromBufferAttribute(t,f+2),c.subVectors(s,r),u.subVectors(i,r),c.cross(u),A.setXYZ(f+0,c.x,c.y,c.z),A.setXYZ(f+1,c.x,c.y,c.z),A.setXYZ(f+2,c.x,c.y,c.z);this.normalizeNormals(),A.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,A=e.count;t<A;t++)Ut.fromBufferAttribute(e,t),Ut.normalize(),e.setXYZ(t,Ut.x,Ut.y,Ut.z)}toNonIndexed(){function e(a,o){const l=a.array,c=a.itemSize,u=a.normalized,f=new l.constructor(o.length*c);let p=0,g=0;for(let m=0,d=o.length;m<d;m++){a.isInterleavedBufferAttribute?p=o[m]*a.data.stride+a.offset:p=o[m]*c;for(let h=0;h<c;h++)f[g++]=l[p++]}return new xA(f,c,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new $t,A=this.index.array,i=this.attributes;for(const a in i){const o=i[a],l=e(o,A);t.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const o=[],l=r[a];for(let c=0,u=l.length;c<u;c++){const f=l[c],p=e(f,A);o.push(p)}t.morphAttributes[a]=o}t.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let a=0,o=s.length;a<o;a++){const l=s[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const o=this.parameters;for(const l in o)o[l]!==void 0&&(e[l]=o[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const A=this.attributes;for(const o in A){const l=A[o];e.data.attributes[o]=l.toJSON(e.data)}const i={};let r=!1;for(const o in this.morphAttributes){const l=this.morphAttributes[o],c=[];for(let u=0,f=l.length;u<f;u++){const p=l[u];c.push(p.toJSON(e.data))}c.length>0&&(i[o]=c,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const A=e.index;A!==null&&this.setIndex(A.clone(t));const i=e.attributes;for(const l in i){const c=i[l];this.setAttribute(l,c.clone(t))}const r=e.morphAttributes;for(const l in r){const c=[],u=r[l];for(let f=0,p=u.length;f<p;f++)c.push(u[f].clone(t));this.morphAttributes[l]=c}this.morphTargetsRelative=e.morphTargetsRelative;const s=e.groups;for(let l=0,c=s.length;l<c;l++){const u=s[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const o=e.boundingSphere;return o!==null&&(this.boundingSphere=o.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const cc=new ut,gn=new Gs,Cr=new Os,uc=new Q,Er=new Q,xr=new Q,Ur=new Q,va=new Q,yr=new Q,hc=new Q,Sr=new Q;class jt extends Tt{constructor(e=new $t,t=new pi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,A=Object.keys(t);if(A.length>0){const i=t[A[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=i.length;r<s;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const A=this.geometry,i=A.attributes.position,r=A.morphAttributes.position,s=A.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(r&&a){yr.set(0,0,0);for(let o=0,l=r.length;o<l;o++){const c=a[o],u=r[o];c!==0&&(va.fromBufferAttribute(u,e),s?yr.addScaledVector(va,c):yr.addScaledVector(va.sub(t),c))}t.add(yr)}return t}raycast(e,t){const A=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(A.boundingSphere===null&&A.computeBoundingSphere(),Cr.copy(A.boundingSphere),Cr.applyMatrix4(r),gn.copy(e.ray).recast(e.near),!(Cr.containsPoint(gn.origin)===!1&&(gn.intersectSphere(Cr,uc)===null||gn.origin.distanceToSquared(uc)>(e.far-e.near)**2))&&(cc.copy(r).invert(),gn.copy(e.ray).applyMatrix4(cc),!(A.boundingBox!==null&&gn.intersectsBox(A.boundingBox)===!1)&&this._computeIntersections(e,t,gn)))}_computeIntersections(e,t,A){let i;const r=this.geometry,s=this.material,a=r.index,o=r.attributes.position,l=r.attributes.uv,c=r.attributes.uv1,u=r.attributes.normal,f=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(s))for(let g=0,m=f.length;g<m;g++){const d=f[g],h=s[d.materialIndex],E=Math.max(d.start,p.start),U=Math.min(a.count,Math.min(d.start+d.count,p.start+p.count));for(let B=E,M=U;B<M;B+=3){const x=a.getX(B),S=a.getX(B+1),F=a.getX(B+2);i=Mr(this,h,e,A,l,c,u,x,S,F),i&&(i.faceIndex=Math.floor(B/3),i.face.materialIndex=d.materialIndex,t.push(i))}}else{const g=Math.max(0,p.start),m=Math.min(a.count,p.start+p.count);for(let d=g,h=m;d<h;d+=3){const E=a.getX(d),U=a.getX(d+1),B=a.getX(d+2);i=Mr(this,s,e,A,l,c,u,E,U,B),i&&(i.faceIndex=Math.floor(d/3),t.push(i))}}else if(o!==void 0)if(Array.isArray(s))for(let g=0,m=f.length;g<m;g++){const d=f[g],h=s[d.materialIndex],E=Math.max(d.start,p.start),U=Math.min(o.count,Math.min(d.start+d.count,p.start+p.count));for(let B=E,M=U;B<M;B+=3){const x=B,S=B+1,F=B+2;i=Mr(this,h,e,A,l,c,u,x,S,F),i&&(i.faceIndex=Math.floor(B/3),i.face.materialIndex=d.materialIndex,t.push(i))}}else{const g=Math.max(0,p.start),m=Math.min(o.count,p.start+p.count);for(let d=g,h=m;d<h;d+=3){const E=d,U=d+1,B=d+2;i=Mr(this,s,e,A,l,c,u,E,U,B),i&&(i.faceIndex=Math.floor(d/3),t.push(i))}}}}function Up(n,e,t,A,i,r,s,a){let o;if(e.side===zt?o=A.intersectTriangle(s,r,i,!0,a):o=A.intersectTriangle(i,r,s,e.side===ln,a),o===null)return null;Sr.copy(a),Sr.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Sr);return l<t.near||l>t.far?null:{distance:l,point:Sr.clone(),object:n}}function Mr(n,e,t,A,i,r,s,a,o,l){n.getVertexPosition(a,Er),n.getVertexPosition(o,xr),n.getVertexPosition(l,Ur);const c=Up(n,e,t,A,Er,xr,Ur,hc);if(c){const u=new Q;aA.getBarycoord(hc,Er,xr,Ur,u),i&&(c.uv=aA.getInterpolatedAttribute(i,a,o,l,u,new Pe)),r&&(c.uv1=aA.getInterpolatedAttribute(r,a,o,l,u,new Pe)),s&&(c.normal=aA.getInterpolatedAttribute(s,a,o,l,u,new Q),c.normal.dot(A.direction)>0&&c.normal.multiplyScalar(-1));const f={a,b:o,c:l,normal:new Q,materialIndex:0};aA.getNormal(Er,xr,Ur,f.normal),c.face=f,c.barycoord=u}return c}class Ln extends $t{constructor(e=1,t=1,A=1,i=1,r=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:A,widthSegments:i,heightSegments:r,depthSegments:s};const a=this;i=Math.floor(i),r=Math.floor(r),s=Math.floor(s);const o=[],l=[],c=[],u=[];let f=0,p=0;g("z","y","x",-1,-1,A,t,e,s,r,0),g("z","y","x",1,-1,A,t,-e,s,r,1),g("x","z","y",1,1,e,A,t,i,s,2),g("x","z","y",1,-1,e,A,-t,i,s,3),g("x","y","z",1,-1,e,t,A,i,r,4),g("x","y","z",-1,-1,e,t,-A,i,r,5),this.setIndex(o),this.setAttribute("position",new Qt(l,3)),this.setAttribute("normal",new Qt(c,3)),this.setAttribute("uv",new Qt(u,2));function g(m,d,h,E,U,B,M,x,S,F,_){const v=B/S,b=M/F,H=B/2,L=M/2,G=x/2,X=S+1,K=F+1;let Y=0,k=0;const ne=new Q;for(let oe=0;oe<K;oe++){const Be=oe*b-L;for(let Fe=0;Fe<X;Fe++){const Re=Fe*v-H;ne[m]=Re*E,ne[d]=Be*U,ne[h]=G,l.push(ne.x,ne.y,ne.z),ne[m]=0,ne[d]=0,ne[h]=x>0?1:-1,c.push(ne.x,ne.y,ne.z),u.push(Fe/S),u.push(1-oe/F),Y+=1}}for(let oe=0;oe<F;oe++)for(let Be=0;Be<S;Be++){const Fe=f+Be+X*oe,Re=f+Be+X*(oe+1),W=f+(Be+1)+X*(oe+1),ee=f+(Be+1)+X*oe;o.push(Fe,Re,ee),o.push(Re,W,ee),k+=6}a.addGroup(p,k,_),p+=k,f+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ln(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ei(n){const e={};for(const t in n){e[t]={};for(const A in n[t]){const i=n[t][A];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][A]=null):e[t][A]=i.clone():Array.isArray(i)?e[t][A]=i.slice():e[t][A]=i}}return e}function Nt(n){const e={};for(let t=0;t<n.length;t++){const A=Ei(n[t]);for(const i in A)e[i]=A[i]}return e}function yp(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Mh(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Xe.workingColorSpace}const Sp={clone:Ei,merge:Nt};var Mp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Fp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class cn extends sr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Mp,this.fragmentShader=Fp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ei(e.uniforms),this.uniformsGroups=yp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const s=this.uniforms[i].value;s&&s.isTexture?t.uniforms[i]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[i]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[i]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[i]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[i]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[i]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[i]={type:"m4",value:s.toArray()}:t.uniforms[i]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const A={};for(const i in this.extensions)this.extensions[i]===!0&&(A[i]=!0);return Object.keys(A).length>0&&(t.extensions=A),t}}class Fh extends Tt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ut,this.projectionMatrix=new ut,this.projectionMatrixInverse=new ut,this.coordinateSystem=PA}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const JA=new Q,fc=new Pe,dc=new Pe;class rA extends Fh{constructor(e=50,t=1,A=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=A,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=zo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Wi*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return zo*2*Math.atan(Math.tan(Wi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,A){JA.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(JA.x,JA.y).multiplyScalar(-e/JA.z),JA.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),A.set(JA.x,JA.y).multiplyScalar(-e/JA.z)}getViewSize(e,t){return this.getViewBounds(e,fc,dc),t.subVectors(dc,fc)}setViewOffset(e,t,A,i,r,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=A,this.view.offsetY=i,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Wi*.5*this.fov)/this.zoom,A=2*t,i=this.aspect*A,r=-.5*i;const s=this.view;if(this.view!==null&&this.view.enabled){const o=s.fullWidth,l=s.fullHeight;r+=s.offsetX*i/o,t-=s.offsetY*A/l,i*=s.width/o,A*=s.height/l}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-A,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Jn=-90,qn=1;class bp extends Tt{constructor(e,t,A){super(),this.type="CubeCamera",this.renderTarget=A,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new rA(Jn,qn,e,t);i.layers=this.layers,this.add(i);const r=new rA(Jn,qn,e,t);r.layers=this.layers,this.add(r);const s=new rA(Jn,qn,e,t);s.layers=this.layers,this.add(s);const a=new rA(Jn,qn,e,t);a.layers=this.layers,this.add(a);const o=new rA(Jn,qn,e,t);o.layers=this.layers,this.add(o);const l=new rA(Jn,qn,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[A,i,r,s,a,o]=t;for(const l of t)this.remove(l);if(e===PA)A.up.set(0,1,0),A.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),o.up.set(0,1,0),o.lookAt(0,0,-1);else if(e===xs)A.up.set(0,-1,0),A.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),o.up.set(0,-1,0),o.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:A,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,s,a,o,l,c]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const m=A.texture.generateMipmaps;A.texture.generateMipmaps=!1,e.setRenderTarget(A,0,i),e.render(t,r),e.setRenderTarget(A,1,i),e.render(t,s),e.setRenderTarget(A,2,i),e.render(t,a),e.setRenderTarget(A,3,i),e.render(t,o),e.setRenderTarget(A,4,i),e.render(t,l),A.texture.generateMipmaps=m,e.setRenderTarget(A,5,i),e.render(t,c),e.setRenderTarget(u,f,p),e.xr.enabled=g,A.texture.needsPMREMUpdate=!0}}class bh extends Wt{constructor(e,t,A,i,r,s,a,o,l,c){e=e!==void 0?e:[],t=t!==void 0?t:Bi,super(e,t,A,i,r,s,a,o,l,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Tp extends In{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const A={width:e,height:e,depth:1},i=[A,A,A,A,A,A];this.texture=new bh(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:EA}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const A={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Ln(5,5,5),r=new cn({name:"CubemapFromEquirect",uniforms:Ei(A.uniforms),vertexShader:A.vertexShader,fragmentShader:A.fragmentShader,side:zt,blending:rn});r.uniforms.tEquirect.value=t;const s=new jt(i,r),a=t.minFilter;return t.minFilter===Mn&&(t.minFilter=EA),new bp(1,10,this).update(e,s),t.minFilter=a,s.geometry.dispose(),s.material.dispose(),this}clear(e,t,A,i){const r=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,A,i);e.setRenderTarget(r)}}class Qp extends Tt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new VA,this.environmentIntensity=1,this.environmentRotation=new VA,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Ca=new Q,Ip=new Q,Rp=new He;class jA{constructor(e=new Q(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,A,i){return this.normal.set(e,t,A),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,A){const i=Ca.subVectors(A,t).cross(Ip.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const A=e.delta(Ca),i=this.normal.dot(A);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(A,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),A=this.distanceToPoint(e.end);return t<0&&A>0||A<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const A=t||Rp.getNormalMatrix(e),i=this.coplanarPoint(Ca).applyMatrix4(e),r=this.normal.applyMatrix3(A).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const mn=new Os,Fr=new Q;class Th{constructor(e=new jA,t=new jA,A=new jA,i=new jA,r=new jA,s=new jA){this.planes=[e,t,A,i,r,s]}set(e,t,A,i,r,s){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(A),a[3].copy(i),a[4].copy(r),a[5].copy(s),this}copy(e){const t=this.planes;for(let A=0;A<6;A++)t[A].copy(e.planes[A]);return this}setFromProjectionMatrix(e,t=PA){const A=this.planes,i=e.elements,r=i[0],s=i[1],a=i[2],o=i[3],l=i[4],c=i[5],u=i[6],f=i[7],p=i[8],g=i[9],m=i[10],d=i[11],h=i[12],E=i[13],U=i[14],B=i[15];if(A[0].setComponents(o-r,f-l,d-p,B-h).normalize(),A[1].setComponents(o+r,f+l,d+p,B+h).normalize(),A[2].setComponents(o+s,f+c,d+g,B+E).normalize(),A[3].setComponents(o-s,f-c,d-g,B-E).normalize(),A[4].setComponents(o-a,f-u,d-m,B-U).normalize(),t===PA)A[5].setComponents(o+a,f+u,d+m,B+U).normalize();else if(t===xs)A[5].setComponents(a,u,m,U).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),mn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),mn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(mn)}intersectsSprite(e){return mn.center.set(0,0,0),mn.radius=.7071067811865476,mn.applyMatrix4(e.matrixWorld),this.intersectsSphere(mn)}intersectsSphere(e){const t=this.planes,A=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(A)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let A=0;A<6;A++){const i=t[A];if(Fr.x=i.normal.x>0?e.max.x:e.min.x,Fr.y=i.normal.y>0?e.max.y:e.min.y,Fr.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Fr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let A=0;A<6;A++)if(t[A].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ys extends sr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ye(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ss=new Q,Ms=new Q,pc=new ut,Ii=new Gs,br=new Os,Ea=new Q,gc=new Q;class yl extends Tt{constructor(e=new $t,t=new ys){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,A=[0];for(let i=1,r=t.count;i<r;i++)Ss.fromBufferAttribute(t,i-1),Ms.fromBufferAttribute(t,i),A[i]=A[i-1],A[i]+=Ss.distanceTo(Ms);e.setAttribute("lineDistance",new Qt(A,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const A=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,s=A.drawRange;if(A.boundingSphere===null&&A.computeBoundingSphere(),br.copy(A.boundingSphere),br.applyMatrix4(i),br.radius+=r,e.ray.intersectsSphere(br)===!1)return;pc.copy(i).invert(),Ii.copy(e.ray).applyMatrix4(pc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),o=a*a,l=this.isLineSegments?2:1,c=A.index,f=A.attributes.position;if(c!==null){const p=Math.max(0,s.start),g=Math.min(c.count,s.start+s.count);for(let m=p,d=g-1;m<d;m+=l){const h=c.getX(m),E=c.getX(m+1),U=Tr(this,e,Ii,o,h,E);U&&t.push(U)}if(this.isLineLoop){const m=c.getX(g-1),d=c.getX(p),h=Tr(this,e,Ii,o,m,d);h&&t.push(h)}}else{const p=Math.max(0,s.start),g=Math.min(f.count,s.start+s.count);for(let m=p,d=g-1;m<d;m+=l){const h=Tr(this,e,Ii,o,m,m+1);h&&t.push(h)}if(this.isLineLoop){const m=Tr(this,e,Ii,o,g-1,p);m&&t.push(m)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,A=Object.keys(t);if(A.length>0){const i=t[A[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=i.length;r<s;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Tr(n,e,t,A,i,r){const s=n.geometry.attributes.position;if(Ss.fromBufferAttribute(s,i),Ms.fromBufferAttribute(s,r),t.distanceSqToSegment(Ss,Ms,Ea,gc)>A)return;Ea.applyMatrix4(n.matrixWorld);const o=e.ray.origin.distanceTo(Ea);if(!(o<e.near||o>e.far))return{distance:o,point:gc.clone().applyMatrix4(n.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:n}}const mc=new Q,Bc=new Q;class Lp extends yl{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,A=[];for(let i=0,r=t.count;i<r;i+=2)mc.fromBufferAttribute(t,i),Bc.fromBufferAttribute(t,i+1),A[i]=i===0?0:A[i-1],A[i+1]=A[i]+mc.distanceTo(Bc);e.setAttribute("lineDistance",new Qt(A,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Qr extends Tt{constructor(){super(),this.isGroup=!0,this.type="Group"}}class Qh extends Wt{constructor(e,t,A,i,r,s,a,o,l,c=fi){if(c!==fi&&c!==vi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");A===void 0&&c===fi&&(A=Qn),A===void 0&&c===vi&&(A=_i),super(null,i,r,s,a,o,c,A,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:BA,this.minFilter=o!==void 0?o:BA,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Sl extends $t{constructor(e=1,t=1,A=1,i=32,r=1,s=!1,a=0,o=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:A,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o};const l=this;i=Math.floor(i),r=Math.floor(r);const c=[],u=[],f=[],p=[];let g=0;const m=[],d=A/2;let h=0;E(),s===!1&&(e>0&&U(!0),t>0&&U(!1)),this.setIndex(c),this.setAttribute("position",new Qt(u,3)),this.setAttribute("normal",new Qt(f,3)),this.setAttribute("uv",new Qt(p,2));function E(){const B=new Q,M=new Q;let x=0;const S=(t-e)/A;for(let F=0;F<=r;F++){const _=[],v=F/r,b=v*(t-e)+e;for(let H=0;H<=i;H++){const L=H/i,G=L*o+a,X=Math.sin(G),K=Math.cos(G);M.x=b*X,M.y=-v*A+d,M.z=b*K,u.push(M.x,M.y,M.z),B.set(X,S,K).normalize(),f.push(B.x,B.y,B.z),p.push(L,1-v),_.push(g++)}m.push(_)}for(let F=0;F<i;F++)for(let _=0;_<r;_++){const v=m[_][F],b=m[_+1][F],H=m[_+1][F+1],L=m[_][F+1];(e>0||_!==0)&&(c.push(v,b,L),x+=3),(t>0||_!==r-1)&&(c.push(b,H,L),x+=3)}l.addGroup(h,x,0),h+=x}function U(B){const M=g,x=new Pe,S=new Q;let F=0;const _=B===!0?e:t,v=B===!0?1:-1;for(let H=1;H<=i;H++)u.push(0,d*v,0),f.push(0,v,0),p.push(.5,.5),g++;const b=g;for(let H=0;H<=i;H++){const G=H/i*o+a,X=Math.cos(G),K=Math.sin(G);S.x=_*K,S.y=d*v,S.z=_*X,u.push(S.x,S.y,S.z),f.push(0,v,0),x.x=X*.5+.5,x.y=K*.5*v+.5,p.push(x.x,x.y),g++}for(let H=0;H<i;H++){const L=M+H,G=b+H;B===!0?c.push(G,G+1,L):c.push(G+1,G,L),F+=3}l.addGroup(h,F,B===!0?1:2),h+=F}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Sl(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}const Ir=new Q,Rr=new Q,xa=new Q,Lr=new aA;class Dp extends $t{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const i=Math.pow(10,4),r=Math.cos(Wi*t),s=e.getIndex(),a=e.getAttribute("position"),o=s?s.count:a.count,l=[0,0,0],c=["a","b","c"],u=new Array(3),f={},p=[];for(let g=0;g<o;g+=3){s?(l[0]=s.getX(g),l[1]=s.getX(g+1),l[2]=s.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);const{a:m,b:d,c:h}=Lr;if(m.fromBufferAttribute(a,l[0]),d.fromBufferAttribute(a,l[1]),h.fromBufferAttribute(a,l[2]),Lr.getNormal(xa),u[0]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,u[1]=`${Math.round(d.x*i)},${Math.round(d.y*i)},${Math.round(d.z*i)}`,u[2]=`${Math.round(h.x*i)},${Math.round(h.y*i)},${Math.round(h.z*i)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let E=0;E<3;E++){const U=(E+1)%3,B=u[E],M=u[U],x=Lr[c[E]],S=Lr[c[U]],F=`${B}_${M}`,_=`${M}_${B}`;_ in f&&f[_]?(xa.dot(f[_].normal)<=r&&(p.push(x.x,x.y,x.z),p.push(S.x,S.y,S.z)),f[_]=null):F in f||(f[F]={index0:l[E],index1:l[U],normal:xa.clone()})}}for(const g in f)if(f[g]){const{index0:m,index1:d}=f[g];Ir.fromBufferAttribute(a,m),Rr.fromBufferAttribute(a,d),p.push(Ir.x,Ir.y,Ir.z),p.push(Rr.x,Rr.y,Rr.z)}this.setAttribute("position",new Qt(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class ar extends $t{constructor(e=1,t=1,A=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:A,heightSegments:i};const r=e/2,s=t/2,a=Math.floor(A),o=Math.floor(i),l=a+1,c=o+1,u=e/a,f=t/o,p=[],g=[],m=[],d=[];for(let h=0;h<c;h++){const E=h*f-s;for(let U=0;U<l;U++){const B=U*u-r;g.push(B,-E,0),m.push(0,0,1),d.push(U/a),d.push(1-h/o)}}for(let h=0;h<o;h++)for(let E=0;E<a;E++){const U=E+l*h,B=E+l*(h+1),M=E+1+l*(h+1),x=E+1+l*h;p.push(U,B,x),p.push(B,M,x)}this.setIndex(p),this.setAttribute("position",new Qt(g,3)),this.setAttribute("normal",new Qt(m,3)),this.setAttribute("uv",new Qt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ar(e.width,e.height,e.widthSegments,e.heightSegments)}}class Ml extends $t{constructor(e=1,t=32,A=16,i=0,r=Math.PI*2,s=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:A,phiStart:i,phiLength:r,thetaStart:s,thetaLength:a},t=Math.max(3,Math.floor(t)),A=Math.max(2,Math.floor(A));const o=Math.min(s+a,Math.PI);let l=0;const c=[],u=new Q,f=new Q,p=[],g=[],m=[],d=[];for(let h=0;h<=A;h++){const E=[],U=h/A;let B=0;h===0&&s===0?B=.5/t:h===A&&o===Math.PI&&(B=-.5/t);for(let M=0;M<=t;M++){const x=M/t;u.x=-e*Math.cos(i+x*r)*Math.sin(s+U*a),u.y=e*Math.cos(s+U*a),u.z=e*Math.sin(i+x*r)*Math.sin(s+U*a),g.push(u.x,u.y,u.z),f.copy(u).normalize(),m.push(f.x,f.y,f.z),d.push(x+B,1-U),E.push(l++)}c.push(E)}for(let h=0;h<A;h++)for(let E=0;E<t;E++){const U=c[h][E+1],B=c[h][E],M=c[h+1][E],x=c[h+1][E+1];(h!==0||s>0)&&p.push(U,B,x),(h!==A-1||o<Math.PI)&&p.push(B,M,x)}this.setIndex(p),this.setAttribute("position",new Qt(g,3)),this.setAttribute("normal",new Qt(m,3)),this.setAttribute("uv",new Qt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ml(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Hp extends sr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Xd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Pp extends sr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Np extends Tt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ye(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Op extends Fh{constructor(e=-1,t=1,A=1,i=-1,r=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=A,this.bottom=i,this.near=r,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,A,i,r,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=A,this.view.offsetY=i,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),A=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=A-e,s=A+e,a=i+t,o=i-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,s=r+l*this.view.width,a-=c*this.view.offsetY,o=a-c*this.view.height}this.projectionMatrix.makeOrthographic(r,s,a,o,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Gp extends Np{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Vp extends rA{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}const wc=new ut;class kp{constructor(e,t,A=0,i=1/0){this.ray=new Gs(e,t),this.near=A,this.far=i,this.camera=null,this.layers=new Ul,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return wc.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(wc),this}intersectObject(e,t=!0,A=[]){return Wo(e,this,A,t),A.sort(_c),A}intersectObjects(e,t=!0,A=[]){for(let i=0,r=e.length;i<r;i++)Wo(e[i],this,A,t);return A.sort(_c),A}}function _c(n,e){return n.distance-e.distance}function Wo(n,e,t,A){let i=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(i=!1),i===!0&&A===!0){const r=n.children;for(let s=0,a=r.length;s<a;s++)Wo(r[s],e,t,!0)}}class vc{constructor(e=1,t=0,A=0){return this.radius=e,this.phi=t,this.theta=A,this}set(e,t,A){return this.radius=e,this.phi=t,this.theta=A,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=ke(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,A){return this.radius=Math.sqrt(e*e+t*t+A*A),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,A),this.phi=Math.acos(ke(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Cc=new Q;let Dr,Ua;class Hr extends Tt{constructor(e=new Q(0,0,1),t=new Q(0,0,0),A=1,i=16776960,r=A*.2,s=r*.2){super(),this.type="ArrowHelper",Dr===void 0&&(Dr=new $t,Dr.setAttribute("position",new Qt([0,0,0,0,1,0],3)),Ua=new Sl(0,.5,1,5,1),Ua.translate(0,-.5,0)),this.position.copy(t),this.line=new yl(Dr,new ys({color:i,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new jt(Ua,new pi({color:i,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(A,r,s)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{Cc.set(e.z,0,-e.x).normalize();const t=Math.acos(e.y);this.quaternion.setFromAxisAngle(Cc,t)}}setLength(e,t=e*.2,A=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(A,t,A),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class Kp extends Dn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}function Ec(n,e,t,A){const i=zp(A);switch(t){case dh:return n*e;case gh:return n*e;case mh:return n*e*2;case Bh:return n*e/i.components*i.byteLength;case Cl:return n*e/i.components*i.byteLength;case wh:return n*e*2/i.components*i.byteLength;case El:return n*e*2/i.components*i.byteLength;case ph:return n*e*3/i.components*i.byteLength;case mA:return n*e*4/i.components*i.byteLength;case xl:return n*e*4/i.components*i.byteLength;case fs:case ds:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ps:case gs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case _o:case Co:return Math.max(n,16)*Math.max(e,8)/4;case wo:case vo:return Math.max(n,8)*Math.max(e,8)/2;case Eo:case xo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Uo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case yo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case So:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Mo:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Fo:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case bo:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case To:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Qo:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Io:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Ro:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Lo:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Do:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Ho:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Po:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case No:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case ms:case Oo:case Go:return Math.ceil(n/4)*Math.ceil(e/4)*16;case _h:case Vo:return Math.ceil(n/4)*Math.ceil(e/4)*8;case ko:case Ko:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function zp(n){switch(n){case GA:case uh:return{byteLength:1,components:1};case $i:case hh:case nr:return{byteLength:2,components:1};case _l:case vl:return{byteLength:2,components:4};case Qn:case wl:case HA:return{byteLength:4,components:1};case fh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Bl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Bl);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Ih(){let n=null,e=!1,t=null,A=null;function i(r,s){t(r,s),A=n.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(A=n.requestAnimationFrame(i),e=!0)},stop:function(){n.cancelAnimationFrame(A),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function Wp(n){const e=new WeakMap;function t(a,o){const l=a.array,c=a.usage,u=l.byteLength,f=n.createBuffer();n.bindBuffer(o,f),n.bufferData(o,l,c),a.onUploadCallback();let p;if(l instanceof Float32Array)p=n.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=n.SHORT;else if(l instanceof Uint32Array)p=n.UNSIGNED_INT;else if(l instanceof Int32Array)p=n.INT;else if(l instanceof Int8Array)p=n.BYTE;else if(l instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function A(a,o,l){const c=o.array,u=o.updateRanges;if(n.bindBuffer(l,a),u.length===0)n.bufferSubData(l,0,c);else{u.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<u.length;p++){const g=u[f],m=u[p];m.start<=g.start+g.count+1?g.count=Math.max(g.count,m.start+m.count-g.start):(++f,u[f]=m)}u.length=f+1;for(let p=0,g=u.length;p<g;p++){const m=u[p];n.bufferSubData(l,m.start*c.BYTES_PER_ELEMENT,c,m.start,m.count)}o.clearUpdateRanges()}o.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const o=e.get(a);o&&(n.deleteBuffer(o.buffer),e.delete(a))}function s(a,o){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const c=e.get(a);(!c||c.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,o));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");A(l.buffer,a,o),l.version=a.version}}return{get:i,remove:r,update:s}}var Xp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Yp=`#ifdef USE_ALPHAHASH
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
#endif`,Jp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,qp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Zp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,jp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,$p=`#ifdef USE_AOMAP
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
#endif`,eg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,tg=`#ifdef USE_BATCHING
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
#endif`,Ag=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ng=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ig=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,rg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,sg=`#ifdef USE_IRIDESCENCE
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
#endif`,ag=`#ifdef USE_BUMPMAP
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
#endif`,og=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,lg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,cg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ug=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,hg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,fg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,dg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,pg=`#if defined( USE_COLOR_ALPHA )
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
#endif`,gg=`#define PI 3.141592653589793
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
} // validated`,mg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Bg=`vec3 transformedNormal = objectNormal;
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
#endif`,wg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,_g=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,vg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Cg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Eg="gl_FragColor = linearToOutputTexel( gl_FragColor );",xg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ug=`#ifdef USE_ENVMAP
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
#endif`,yg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Sg=`#ifdef USE_ENVMAP
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
#endif`,Mg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Fg=`#ifdef USE_ENVMAP
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
#endif`,bg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Tg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Qg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ig=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Rg=`#ifdef USE_GRADIENTMAP
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
}`,Lg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Dg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Hg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Pg=`uniform bool receiveShadow;
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
#endif`,Ng=`#ifdef USE_ENVMAP
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
#endif`,Og=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Gg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Vg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,kg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Kg=`PhysicalMaterial material;
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
#endif`,zg=`struct PhysicalMaterial {
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
}`,Wg=`
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
#endif`,Xg=`#if defined( RE_IndirectDiffuse )
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
#endif`,Yg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Jg=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,qg=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zg=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,jg=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,$g=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,em=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,tm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Am=`#if defined( USE_POINTS_UV )
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
#endif`,nm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,im=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,rm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,sm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,am=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,om=`#ifdef USE_MORPHTARGETS
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
#endif`,lm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,cm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,um=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,hm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,fm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,dm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,pm=`#ifdef USE_NORMALMAP
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
#endif`,gm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,mm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Bm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,wm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,_m=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,vm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Cm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Em=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,xm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Um=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ym=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Sm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Mm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Fm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,bm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Tm=`float getShadowMask() {
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
}`,Qm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Im=`#ifdef USE_SKINNING
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
#endif`,Rm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Lm=`#ifdef USE_SKINNING
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
#endif`,Dm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Hm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Pm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Nm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Om=`#ifdef USE_TRANSMISSION
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
#endif`,Gm=`#ifdef USE_TRANSMISSION
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
#endif`,Vm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,km=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Km=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,zm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Wm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Xm=`uniform sampler2D t2D;
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
}`,Ym=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Jm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,qm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jm=`#include <common>
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
}`,$m=`#if DEPTH_PACKING == 3200
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
}`,eB=`#define DISTANCE
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
}`,tB=`#define DISTANCE
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
}`,AB=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,nB=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,iB=`uniform float scale;
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
}`,rB=`uniform vec3 diffuse;
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
}`,sB=`#include <common>
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
}`,aB=`uniform vec3 diffuse;
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
}`,oB=`#define LAMBERT
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
}`,lB=`#define LAMBERT
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
}`,cB=`#define MATCAP
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
}`,uB=`#define MATCAP
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
}`,hB=`#define NORMAL
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
}`,fB=`#define NORMAL
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
}`,dB=`#define PHONG
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
}`,pB=`#define PHONG
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
}`,gB=`#define STANDARD
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
}`,mB=`#define STANDARD
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
}`,BB=`#define TOON
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
}`,wB=`#define TOON
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
}`,_B=`uniform float size;
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
}`,vB=`uniform vec3 diffuse;
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
}`,CB=`#include <common>
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
}`,EB=`uniform vec3 color;
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
}`,xB=`uniform float rotation;
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
}`,UB=`uniform vec3 diffuse;
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
}`,Ne={alphahash_fragment:Xp,alphahash_pars_fragment:Yp,alphamap_fragment:Jp,alphamap_pars_fragment:qp,alphatest_fragment:Zp,alphatest_pars_fragment:jp,aomap_fragment:$p,aomap_pars_fragment:eg,batching_pars_vertex:tg,batching_vertex:Ag,begin_vertex:ng,beginnormal_vertex:ig,bsdfs:rg,iridescence_fragment:sg,bumpmap_pars_fragment:ag,clipping_planes_fragment:og,clipping_planes_pars_fragment:lg,clipping_planes_pars_vertex:cg,clipping_planes_vertex:ug,color_fragment:hg,color_pars_fragment:fg,color_pars_vertex:dg,color_vertex:pg,common:gg,cube_uv_reflection_fragment:mg,defaultnormal_vertex:Bg,displacementmap_pars_vertex:wg,displacementmap_vertex:_g,emissivemap_fragment:vg,emissivemap_pars_fragment:Cg,colorspace_fragment:Eg,colorspace_pars_fragment:xg,envmap_fragment:Ug,envmap_common_pars_fragment:yg,envmap_pars_fragment:Sg,envmap_pars_vertex:Mg,envmap_physical_pars_fragment:Ng,envmap_vertex:Fg,fog_vertex:bg,fog_pars_vertex:Tg,fog_fragment:Qg,fog_pars_fragment:Ig,gradientmap_pars_fragment:Rg,lightmap_pars_fragment:Lg,lights_lambert_fragment:Dg,lights_lambert_pars_fragment:Hg,lights_pars_begin:Pg,lights_toon_fragment:Og,lights_toon_pars_fragment:Gg,lights_phong_fragment:Vg,lights_phong_pars_fragment:kg,lights_physical_fragment:Kg,lights_physical_pars_fragment:zg,lights_fragment_begin:Wg,lights_fragment_maps:Xg,lights_fragment_end:Yg,logdepthbuf_fragment:Jg,logdepthbuf_pars_fragment:qg,logdepthbuf_pars_vertex:Zg,logdepthbuf_vertex:jg,map_fragment:$g,map_pars_fragment:em,map_particle_fragment:tm,map_particle_pars_fragment:Am,metalnessmap_fragment:nm,metalnessmap_pars_fragment:im,morphinstance_vertex:rm,morphcolor_vertex:sm,morphnormal_vertex:am,morphtarget_pars_vertex:om,morphtarget_vertex:lm,normal_fragment_begin:cm,normal_fragment_maps:um,normal_pars_fragment:hm,normal_pars_vertex:fm,normal_vertex:dm,normalmap_pars_fragment:pm,clearcoat_normal_fragment_begin:gm,clearcoat_normal_fragment_maps:mm,clearcoat_pars_fragment:Bm,iridescence_pars_fragment:wm,opaque_fragment:_m,packing:vm,premultiplied_alpha_fragment:Cm,project_vertex:Em,dithering_fragment:xm,dithering_pars_fragment:Um,roughnessmap_fragment:ym,roughnessmap_pars_fragment:Sm,shadowmap_pars_fragment:Mm,shadowmap_pars_vertex:Fm,shadowmap_vertex:bm,shadowmask_pars_fragment:Tm,skinbase_vertex:Qm,skinning_pars_vertex:Im,skinning_vertex:Rm,skinnormal_vertex:Lm,specularmap_fragment:Dm,specularmap_pars_fragment:Hm,tonemapping_fragment:Pm,tonemapping_pars_fragment:Nm,transmission_fragment:Om,transmission_pars_fragment:Gm,uv_pars_fragment:Vm,uv_pars_vertex:km,uv_vertex:Km,worldpos_vertex:zm,background_vert:Wm,background_frag:Xm,backgroundCube_vert:Ym,backgroundCube_frag:Jm,cube_vert:qm,cube_frag:Zm,depth_vert:jm,depth_frag:$m,distanceRGBA_vert:eB,distanceRGBA_frag:tB,equirect_vert:AB,equirect_frag:nB,linedashed_vert:iB,linedashed_frag:rB,meshbasic_vert:sB,meshbasic_frag:aB,meshlambert_vert:oB,meshlambert_frag:lB,meshmatcap_vert:cB,meshmatcap_frag:uB,meshnormal_vert:hB,meshnormal_frag:fB,meshphong_vert:dB,meshphong_frag:pB,meshphysical_vert:gB,meshphysical_frag:mB,meshtoon_vert:BB,meshtoon_frag:wB,points_vert:_B,points_frag:vB,shadow_vert:CB,shadow_frag:EB,sprite_vert:xB,sprite_frag:UB},ce={common:{diffuse:{value:new Ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},envMapRotation:{value:new He},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new Pe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new Ye(16777215)},opacity:{value:1},center:{value:new Pe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},CA={basic:{uniforms:Nt([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.fog]),vertexShader:Ne.meshbasic_vert,fragmentShader:Ne.meshbasic_frag},lambert:{uniforms:Nt([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new Ye(0)}}]),vertexShader:Ne.meshlambert_vert,fragmentShader:Ne.meshlambert_frag},phong:{uniforms:Nt([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new Ye(0)},specular:{value:new Ye(1118481)},shininess:{value:30}}]),vertexShader:Ne.meshphong_vert,fragmentShader:Ne.meshphong_frag},standard:{uniforms:Nt([ce.common,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.roughnessmap,ce.metalnessmap,ce.fog,ce.lights,{emissive:{value:new Ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag},toon:{uniforms:Nt([ce.common,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.gradientmap,ce.fog,ce.lights,{emissive:{value:new Ye(0)}}]),vertexShader:Ne.meshtoon_vert,fragmentShader:Ne.meshtoon_frag},matcap:{uniforms:Nt([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,{matcap:{value:null}}]),vertexShader:Ne.meshmatcap_vert,fragmentShader:Ne.meshmatcap_frag},points:{uniforms:Nt([ce.points,ce.fog]),vertexShader:Ne.points_vert,fragmentShader:Ne.points_frag},dashed:{uniforms:Nt([ce.common,ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ne.linedashed_vert,fragmentShader:Ne.linedashed_frag},depth:{uniforms:Nt([ce.common,ce.displacementmap]),vertexShader:Ne.depth_vert,fragmentShader:Ne.depth_frag},normal:{uniforms:Nt([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,{opacity:{value:1}}]),vertexShader:Ne.meshnormal_vert,fragmentShader:Ne.meshnormal_frag},sprite:{uniforms:Nt([ce.sprite,ce.fog]),vertexShader:Ne.sprite_vert,fragmentShader:Ne.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ne.background_vert,fragmentShader:Ne.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new He}},vertexShader:Ne.backgroundCube_vert,fragmentShader:Ne.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ne.cube_vert,fragmentShader:Ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ne.equirect_vert,fragmentShader:Ne.equirect_frag},distanceRGBA:{uniforms:Nt([ce.common,ce.displacementmap,{referencePosition:{value:new Q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ne.distanceRGBA_vert,fragmentShader:Ne.distanceRGBA_frag},shadow:{uniforms:Nt([ce.lights,ce.fog,{color:{value:new Ye(0)},opacity:{value:1}}]),vertexShader:Ne.shadow_vert,fragmentShader:Ne.shadow_frag}};CA.physical={uniforms:Nt([CA.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new Pe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new Ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new Pe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new Ye(0)},specularColor:{value:new Ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new Pe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag};const Pr={r:0,b:0,g:0},Bn=new VA,yB=new ut;function SB(n,e,t,A,i,r,s){const a=new Ye(0);let o=r===!0?0:1,l,c,u=null,f=0,p=null;function g(U){let B=U.isScene===!0?U.background:null;return B&&B.isTexture&&(B=(U.backgroundBlurriness>0?t:e).get(B)),B}function m(U){let B=!1;const M=g(U);M===null?h(a,o):M&&M.isColor&&(h(M,1),B=!0);const x=n.xr.getEnvironmentBlendMode();x==="additive"?A.buffers.color.setClear(0,0,0,1,s):x==="alpha-blend"&&A.buffers.color.setClear(0,0,0,0,s),(n.autoClear||B)&&(A.buffers.depth.setTest(!0),A.buffers.depth.setMask(!0),A.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function d(U,B){const M=g(B);M&&(M.isCubeTexture||M.mapping===Ns)?(c===void 0&&(c=new jt(new Ln(1,1,1),new cn({name:"BackgroundCubeMaterial",uniforms:Ei(CA.backgroundCube.uniforms),vertexShader:CA.backgroundCube.vertexShader,fragmentShader:CA.backgroundCube.fragmentShader,side:zt,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(x,S,F){this.matrixWorld.copyPosition(F.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),Bn.copy(B.backgroundRotation),Bn.x*=-1,Bn.y*=-1,Bn.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Bn.y*=-1,Bn.z*=-1),c.material.uniforms.envMap.value=M,c.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=B.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=B.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(yB.makeRotationFromEuler(Bn)),c.material.toneMapped=Xe.getTransfer(M.colorSpace)!==At,(u!==M||f!==M.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,u=M,f=M.version,p=n.toneMapping),c.layers.enableAll(),U.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new jt(new ar(2,2),new cn({name:"BackgroundMaterial",uniforms:Ei(CA.background.uniforms),vertexShader:CA.background.vertexShader,fragmentShader:CA.background.fragmentShader,side:ln,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=B.backgroundIntensity,l.material.toneMapped=Xe.getTransfer(M.colorSpace)!==At,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(u!==M||f!==M.version||p!==n.toneMapping)&&(l.material.needsUpdate=!0,u=M,f=M.version,p=n.toneMapping),l.layers.enableAll(),U.unshift(l,l.geometry,l.material,0,0,null))}function h(U,B){U.getRGB(Pr,Mh(n)),A.buffers.color.setClear(Pr.r,Pr.g,Pr.b,B,s)}function E(){c!==void 0&&(c.geometry.dispose(),c.material.dispose()),l!==void 0&&(l.geometry.dispose(),l.material.dispose())}return{getClearColor:function(){return a},setClearColor:function(U,B=1){a.set(U),o=B,h(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(U){o=U,h(a,o)},render:m,addToRenderList:d,dispose:E}}function MB(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),A={},i=f(null);let r=i,s=!1;function a(v,b,H,L,G){let X=!1;const K=u(L,H,b);r!==K&&(r=K,l(r.object)),X=p(v,L,H,G),X&&g(v,L,H,G),G!==null&&e.update(G,n.ELEMENT_ARRAY_BUFFER),(X||s)&&(s=!1,B(v,b,H,L),G!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function o(){return n.createVertexArray()}function l(v){return n.bindVertexArray(v)}function c(v){return n.deleteVertexArray(v)}function u(v,b,H){const L=H.wireframe===!0;let G=A[v.id];G===void 0&&(G={},A[v.id]=G);let X=G[b.id];X===void 0&&(X={},G[b.id]=X);let K=X[L];return K===void 0&&(K=f(o()),X[L]=K),K}function f(v){const b=[],H=[],L=[];for(let G=0;G<t;G++)b[G]=0,H[G]=0,L[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:b,enabledAttributes:H,attributeDivisors:L,object:v,attributes:{},index:null}}function p(v,b,H,L){const G=r.attributes,X=b.attributes;let K=0;const Y=H.getAttributes();for(const k in Y)if(Y[k].location>=0){const oe=G[k];let Be=X[k];if(Be===void 0&&(k==="instanceMatrix"&&v.instanceMatrix&&(Be=v.instanceMatrix),k==="instanceColor"&&v.instanceColor&&(Be=v.instanceColor)),oe===void 0||oe.attribute!==Be||Be&&oe.data!==Be.data)return!0;K++}return r.attributesNum!==K||r.index!==L}function g(v,b,H,L){const G={},X=b.attributes;let K=0;const Y=H.getAttributes();for(const k in Y)if(Y[k].location>=0){let oe=X[k];oe===void 0&&(k==="instanceMatrix"&&v.instanceMatrix&&(oe=v.instanceMatrix),k==="instanceColor"&&v.instanceColor&&(oe=v.instanceColor));const Be={};Be.attribute=oe,oe&&oe.data&&(Be.data=oe.data),G[k]=Be,K++}r.attributes=G,r.attributesNum=K,r.index=L}function m(){const v=r.newAttributes;for(let b=0,H=v.length;b<H;b++)v[b]=0}function d(v){h(v,0)}function h(v,b){const H=r.newAttributes,L=r.enabledAttributes,G=r.attributeDivisors;H[v]=1,L[v]===0&&(n.enableVertexAttribArray(v),L[v]=1),G[v]!==b&&(n.vertexAttribDivisor(v,b),G[v]=b)}function E(){const v=r.newAttributes,b=r.enabledAttributes;for(let H=0,L=b.length;H<L;H++)b[H]!==v[H]&&(n.disableVertexAttribArray(H),b[H]=0)}function U(v,b,H,L,G,X,K){K===!0?n.vertexAttribIPointer(v,b,H,G,X):n.vertexAttribPointer(v,b,H,L,G,X)}function B(v,b,H,L){m();const G=L.attributes,X=H.getAttributes(),K=b.defaultAttributeValues;for(const Y in X){const k=X[Y];if(k.location>=0){let ne=G[Y];if(ne===void 0&&(Y==="instanceMatrix"&&v.instanceMatrix&&(ne=v.instanceMatrix),Y==="instanceColor"&&v.instanceColor&&(ne=v.instanceColor)),ne!==void 0){const oe=ne.normalized,Be=ne.itemSize,Fe=e.get(ne);if(Fe===void 0)continue;const Re=Fe.buffer,W=Fe.type,ee=Fe.bytesPerElement,de=W===n.INT||W===n.UNSIGNED_INT||ne.gpuType===wl;if(ne.isInterleavedBufferAttribute){const ie=ne.data,xe=ie.stride,Te=ne.offset;if(ie.isInstancedInterleavedBuffer){for(let Le=0;Le<k.locationSize;Le++)h(k.location+Le,ie.meshPerAttribute);v.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let Le=0;Le<k.locationSize;Le++)d(k.location+Le);n.bindBuffer(n.ARRAY_BUFFER,Re);for(let Le=0;Le<k.locationSize;Le++)U(k.location+Le,Be/k.locationSize,W,oe,xe*ee,(Te+Be/k.locationSize*Le)*ee,de)}else{if(ne.isInstancedBufferAttribute){for(let ie=0;ie<k.locationSize;ie++)h(k.location+ie,ne.meshPerAttribute);v.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let ie=0;ie<k.locationSize;ie++)d(k.location+ie);n.bindBuffer(n.ARRAY_BUFFER,Re);for(let ie=0;ie<k.locationSize;ie++)U(k.location+ie,Be/k.locationSize,W,oe,Be*ee,Be/k.locationSize*ie*ee,de)}}else if(K!==void 0){const oe=K[Y];if(oe!==void 0)switch(oe.length){case 2:n.vertexAttrib2fv(k.location,oe);break;case 3:n.vertexAttrib3fv(k.location,oe);break;case 4:n.vertexAttrib4fv(k.location,oe);break;default:n.vertexAttrib1fv(k.location,oe)}}}}E()}function M(){F();for(const v in A){const b=A[v];for(const H in b){const L=b[H];for(const G in L)c(L[G].object),delete L[G];delete b[H]}delete A[v]}}function x(v){if(A[v.id]===void 0)return;const b=A[v.id];for(const H in b){const L=b[H];for(const G in L)c(L[G].object),delete L[G];delete b[H]}delete A[v.id]}function S(v){for(const b in A){const H=A[b];if(H[v.id]===void 0)continue;const L=H[v.id];for(const G in L)c(L[G].object),delete L[G];delete H[v.id]}}function F(){_(),s=!0,r!==i&&(r=i,l(r.object))}function _(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:F,resetDefaultState:_,dispose:M,releaseStatesOfGeometry:x,releaseStatesOfProgram:S,initAttributes:m,enableAttribute:d,disableUnusedAttributes:E}}function FB(n,e,t){let A;function i(l){A=l}function r(l,c){n.drawArrays(A,l,c),t.update(c,A,1)}function s(l,c,u){u!==0&&(n.drawArraysInstanced(A,l,c,u),t.update(c,A,u))}function a(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(A,l,0,c,0,u);let p=0;for(let g=0;g<u;g++)p+=c[g];t.update(p,A,1)}function o(l,c,u,f){if(u===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<l.length;g++)s(l[g],c[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(A,l,0,c,0,f,0,u);let g=0;for(let m=0;m<u;m++)g+=c[m]*f[m];t.update(g,A,1)}}this.setMode=i,this.render=r,this.renderInstances=s,this.renderMultiDraw=a,this.renderMultiDrawInstances=o}function bB(n,e,t,A){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const S=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(S.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(S){return!(S!==mA&&A.convert(S)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(S){const F=S===nr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(S!==GA&&A.convert(S)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&S!==HA&&!F)}function o(S){if(S==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";S="mediump"}return S==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const c=o(l);c!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",c,"instead."),l=c);const u=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_TEXTURE_SIZE),d=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),h=n.getParameter(n.MAX_VERTEX_ATTRIBS),E=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),U=n.getParameter(n.MAX_VARYING_VECTORS),B=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),M=g>0,x=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:o,textureFormatReadable:s,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:m,maxCubemapSize:d,maxAttributes:h,maxVertexUniforms:E,maxVaryings:U,maxFragmentUniforms:B,vertexTextures:M,maxSamples:x}}function TB(n){const e=this;let t=null,A=0,i=!1,r=!1;const s=new jA,a=new He,o={value:null,needsUpdate:!1};this.uniform=o,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const p=u.length!==0||f||A!==0||i;return i=f,A=u.length,p},this.beginShadows=function(){r=!0,c(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=c(u,f,0)},this.setState=function(u,f,p){const g=u.clippingPlanes,m=u.clipIntersection,d=u.clipShadows,h=n.get(u);if(!i||g===null||g.length===0||r&&!d)r?c(null):l();else{const E=r?0:A,U=E*4;let B=h.clippingState||null;o.value=B,B=c(g,f,U,p);for(let M=0;M!==U;++M)B[M]=t[M];h.clippingState=B,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=E}};function l(){o.value!==t&&(o.value=t,o.needsUpdate=A>0),e.numPlanes=A,e.numIntersection=0}function c(u,f,p,g){const m=u!==null?u.length:0;let d=null;if(m!==0){if(d=o.value,g!==!0||d===null){const h=p+m*4,E=f.matrixWorldInverse;a.getNormalMatrix(E),(d===null||d.length<h)&&(d=new Float32Array(h));for(let U=0,B=p;U!==m;++U,B+=4)s.copy(u[U]).applyMatrix4(E,a),s.normal.toArray(d,B),d[B+3]=s.constant}o.value=d,o.needsUpdate=!0}return e.numPlanes=m,e.numIntersection=0,d}}function QB(n){let e=new WeakMap;function t(s,a){return a===po?s.mapping=Bi:a===go&&(s.mapping=wi),s}function A(s){if(s&&s.isTexture){const a=s.mapping;if(a===po||a===go)if(e.has(s)){const o=e.get(s).texture;return t(o,s.mapping)}else{const o=s.image;if(o&&o.height>0){const l=new Tp(o.height);return l.fromEquirectangularTexture(n,s),e.set(s,l),s.addEventListener("dispose",i),t(l.texture,s.mapping)}else return null}}return s}function i(s){const a=s.target;a.removeEventListener("dispose",i);const o=e.get(a);o!==void 0&&(e.delete(a),o.dispose())}function r(){e=new WeakMap}return{get:A,dispose:r}}const li=4,xc=[.125,.215,.35,.446,.526,.582],Un=20,ya=new Op,Uc=new Ye;let Sa=null,Ma=0,Fa=0,ba=!1;const En=(1+Math.sqrt(5))/2,Zn=1/En,yc=[new Q(-En,Zn,0),new Q(En,Zn,0),new Q(-Zn,0,En),new Q(Zn,0,En),new Q(0,En,-Zn),new Q(0,En,Zn),new Q(-1,1,-1),new Q(1,1,-1),new Q(-1,1,1),new Q(1,1,1)];class Sc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,A=.1,i=100){Sa=this._renderer.getRenderTarget(),Ma=this._renderer.getActiveCubeFace(),Fa=this._renderer.getActiveMipmapLevel(),ba=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,A,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=bc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Fc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Sa,Ma,Fa),this._renderer.xr.enabled=ba,e.scissorTest=!1,Nr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Bi||e.mapping===wi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Sa=this._renderer.getRenderTarget(),Ma=this._renderer.getActiveCubeFace(),Fa=this._renderer.getActiveMipmapLevel(),ba=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const A=t||this._allocateTargets();return this._textureToCubeUV(e,A),this._applyPMREM(A),this._cleanup(A),A}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,A={magFilter:EA,minFilter:EA,generateMipmaps:!1,type:nr,format:mA,colorSpace:Ci,depthBuffer:!1},i=Mc(e,t,A);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Mc(e,t,A);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=IB(r)),this._blurMaterial=RB(r,e,t)}return i}_compileMaterial(e){const t=new jt(this._lodPlanes[0],e);this._renderer.compile(t,ya)}_sceneToCubeUV(e,t,A,i){const a=new rA(90,1,t,A),o=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],c=this._renderer,u=c.autoClear,f=c.toneMapping;c.getClearColor(Uc),c.toneMapping=sn,c.autoClear=!1;const p=new pi({name:"PMREM.Background",side:zt,depthWrite:!1,depthTest:!1}),g=new jt(new Ln,p);let m=!1;const d=e.background;d?d.isColor&&(p.color.copy(d),e.background=null,m=!0):(p.color.copy(Uc),m=!0);for(let h=0;h<6;h++){const E=h%3;E===0?(a.up.set(0,o[h],0),a.lookAt(l[h],0,0)):E===1?(a.up.set(0,0,o[h]),a.lookAt(0,l[h],0)):(a.up.set(0,o[h],0),a.lookAt(0,0,l[h]));const U=this._cubeSize;Nr(i,E*U,h>2?U:0,U,U),c.setRenderTarget(i),m&&c.render(g,a),c.render(e,a)}g.geometry.dispose(),g.material.dispose(),c.toneMapping=f,c.autoClear=u,e.background=d}_textureToCubeUV(e,t){const A=this._renderer,i=e.mapping===Bi||e.mapping===wi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=bc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Fc());const r=i?this._cubemapMaterial:this._equirectMaterial,s=new jt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const o=this._cubeSize;Nr(t,0,0,3*o,2*o),A.setRenderTarget(t),A.render(s,ya)}_applyPMREM(e){const t=this._renderer,A=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=yc[(i-r-1)%yc.length];this._blur(e,r-1,r,s,a)}t.autoClear=A}_blur(e,t,A,i,r){const s=this._pingPongRenderTarget;this._halfBlur(e,s,t,A,i,"latitudinal",r),this._halfBlur(s,e,A,A,i,"longitudinal",r)}_halfBlur(e,t,A,i,r,s,a){const o=this._renderer,l=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const c=3,u=new jt(this._lodPlanes[i],l),f=l.uniforms,p=this._sizeLods[A]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Un-1),m=r/g,d=isFinite(r)?1+Math.floor(c*m):Un;d>Un&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${d} samples when the maximum is set to ${Un}`);const h=[];let E=0;for(let S=0;S<Un;++S){const F=S/m,_=Math.exp(-F*F/2);h.push(_),S===0?E+=_:S<d&&(E+=2*_)}for(let S=0;S<h.length;S++)h[S]=h[S]/E;f.envMap.value=e.texture,f.samples.value=d,f.weights.value=h,f.latitudinal.value=s==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:U}=this;f.dTheta.value=g,f.mipInt.value=U-A;const B=this._sizeLods[i],M=3*B*(i>U-li?i-U+li:0),x=4*(this._cubeSize-B);Nr(t,M,x,3*B,2*B),o.setRenderTarget(t),o.render(u,ya)}}function IB(n){const e=[],t=[],A=[];let i=n;const r=n-li+1+xc.length;for(let s=0;s<r;s++){const a=Math.pow(2,i);t.push(a);let o=1/a;s>n-li?o=xc[s-n+li-1]:s===0&&(o=0),A.push(o);const l=1/(a-2),c=-l,u=1+l,f=[c,c,u,c,u,u,c,c,u,u,c,u],p=6,g=6,m=3,d=2,h=1,E=new Float32Array(m*g*p),U=new Float32Array(d*g*p),B=new Float32Array(h*g*p);for(let x=0;x<p;x++){const S=x%3*2/3-1,F=x>2?0:-1,_=[S,F,0,S+2/3,F,0,S+2/3,F+1,0,S,F,0,S+2/3,F+1,0,S,F+1,0];E.set(_,m*g*x),U.set(f,d*g*x);const v=[x,x,x,x,x,x];B.set(v,h*g*x)}const M=new $t;M.setAttribute("position",new xA(E,m)),M.setAttribute("uv",new xA(U,d)),M.setAttribute("faceIndex",new xA(B,h)),e.push(M),i>li&&i--}return{lodPlanes:e,sizeLods:t,sigmas:A}}function Mc(n,e,t){const A=new In(n,e,t);return A.texture.mapping=Ns,A.texture.name="PMREM.cubeUv",A.scissorTest=!0,A}function Nr(n,e,t,A,i){n.viewport.set(e,t,A,i),n.scissor.set(e,t,A,i)}function RB(n,e,t){const A=new Float32Array(Un),i=new Q(0,1,0);return new cn({name:"SphericalGaussianBlur",defines:{n:Un,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:A},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Fl(),fragmentShader:`

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
		`,blending:rn,depthTest:!1,depthWrite:!1})}function Fc(){return new cn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Fl(),fragmentShader:`

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
		`,blending:rn,depthTest:!1,depthWrite:!1})}function bc(){return new cn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Fl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:rn,depthTest:!1,depthWrite:!1})}function Fl(){return`

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
	`}function LB(n){let e=new WeakMap,t=null;function A(a){if(a&&a.isTexture){const o=a.mapping,l=o===po||o===go,c=o===Bi||o===wi;if(l||c){let u=e.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new Sc(n)),u=l?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const p=a.image;return l&&p&&p.height>0||c&&p&&i(p)?(t===null&&(t=new Sc(n)),u=l?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function i(a){let o=0;const l=6;for(let c=0;c<l;c++)a[c]!==void 0&&o++;return o===l}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:A,dispose:s}}function DB(n){const e={};function t(A){if(e[A]!==void 0)return e[A];let i;switch(A){case"WEBGL_depth_texture":i=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=n.getExtension(A)}return e[A]=i,i}return{has:function(A){return t(A)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(A){const i=t(A);return i===null&&ri("THREE.WebGLRenderer: "+A+" extension not supported."),i}}}function HB(n,e,t,A){const i={},r=new WeakMap;function s(u){const f=u.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);f.removeEventListener("dispose",s),delete i[f.id];const p=r.get(f);p&&(e.remove(p),r.delete(f)),A.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(u,f){return i[f.id]===!0||(f.addEventListener("dispose",s),i[f.id]=!0,t.memory.geometries++),f}function o(u){const f=u.attributes;for(const p in f)e.update(f[p],n.ARRAY_BUFFER)}function l(u){const f=[],p=u.index,g=u.attributes.position;let m=0;if(p!==null){const E=p.array;m=p.version;for(let U=0,B=E.length;U<B;U+=3){const M=E[U+0],x=E[U+1],S=E[U+2];f.push(M,x,x,S,S,M)}}else if(g!==void 0){const E=g.array;m=g.version;for(let U=0,B=E.length/3-1;U<B;U+=3){const M=U+0,x=U+1,S=U+2;f.push(M,x,x,S,S,M)}}else return;const d=new(Ch(f)?Sh:yh)(f,1);d.version=m;const h=r.get(u);h&&e.remove(h),r.set(u,d)}function c(u){const f=r.get(u);if(f){const p=u.index;p!==null&&f.version<p.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:o,getWireframeAttribute:c}}function PB(n,e,t){let A;function i(f){A=f}let r,s;function a(f){r=f.type,s=f.bytesPerElement}function o(f,p){n.drawElements(A,p,r,f*s),t.update(p,A,1)}function l(f,p,g){g!==0&&(n.drawElementsInstanced(A,p,r,f*s,g),t.update(p,A,g))}function c(f,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(A,p,0,r,f,0,g);let d=0;for(let h=0;h<g;h++)d+=p[h];t.update(d,A,1)}function u(f,p,g,m){if(g===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let h=0;h<f.length;h++)l(f[h]/s,p[h],m[h]);else{d.multiDrawElementsInstancedWEBGL(A,p,0,r,f,0,m,0,g);let h=0;for(let E=0;E<g;E++)h+=p[E]*m[E];t.update(h,A,1)}}this.setMode=i,this.setIndex=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c,this.renderMultiDrawInstances=u}function NB(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function A(r,s,a){switch(t.calls++,s){case n.TRIANGLES:t.triangles+=a*(r/3);break;case n.LINES:t.lines+=a*(r/2);break;case n.LINE_STRIP:t.lines+=a*(r-1);break;case n.LINE_LOOP:t.lines+=a*r;break;case n.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",s);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:A}}function OB(n,e,t){const A=new WeakMap,i=new mt;function r(s,a,o){const l=s.morphTargetInfluences,c=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=c!==void 0?c.length:0;let f=A.get(a);if(f===void 0||f.count!==u){let v=function(){F.dispose(),A.delete(a),a.removeEventListener("dispose",v)};var p=v;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,d=a.morphAttributes.color!==void 0,h=a.morphAttributes.position||[],E=a.morphAttributes.normal||[],U=a.morphAttributes.color||[];let B=0;g===!0&&(B=1),m===!0&&(B=2),d===!0&&(B=3);let M=a.attributes.position.count*B,x=1;M>e.maxTextureSize&&(x=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const S=new Float32Array(M*x*4*u),F=new xh(S,M,x,u);F.type=HA,F.needsUpdate=!0;const _=B*4;for(let b=0;b<u;b++){const H=h[b],L=E[b],G=U[b],X=M*x*4*b;for(let K=0;K<H.count;K++){const Y=K*_;g===!0&&(i.fromBufferAttribute(H,K),S[X+Y+0]=i.x,S[X+Y+1]=i.y,S[X+Y+2]=i.z,S[X+Y+3]=0),m===!0&&(i.fromBufferAttribute(L,K),S[X+Y+4]=i.x,S[X+Y+5]=i.y,S[X+Y+6]=i.z,S[X+Y+7]=0),d===!0&&(i.fromBufferAttribute(G,K),S[X+Y+8]=i.x,S[X+Y+9]=i.y,S[X+Y+10]=i.z,S[X+Y+11]=G.itemSize===4?i.w:1)}}f={count:u,texture:F,size:new Pe(M,x)},A.set(a,f),a.addEventListener("dispose",v)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)o.getUniforms().setValue(n,"morphTexture",s.morphTexture,t);else{let g=0;for(let d=0;d<l.length;d++)g+=l[d];const m=a.morphTargetsRelative?1:1-g;o.getUniforms().setValue(n,"morphTargetBaseInfluence",m),o.getUniforms().setValue(n,"morphTargetInfluences",l)}o.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),o.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function GB(n,e,t,A){let i=new WeakMap;function r(o){const l=A.render.frame,c=o.geometry,u=e.get(o,c);if(i.get(u)!==l&&(e.update(u),i.set(u,l)),o.isInstancedMesh&&(o.hasEventListener("dispose",a)===!1&&o.addEventListener("dispose",a),i.get(o)!==l&&(t.update(o.instanceMatrix,n.ARRAY_BUFFER),o.instanceColor!==null&&t.update(o.instanceColor,n.ARRAY_BUFFER),i.set(o,l))),o.isSkinnedMesh){const f=o.skeleton;i.get(f)!==l&&(f.update(),i.set(f,l))}return u}function s(){i=new WeakMap}function a(o){const l=o.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:s}}const Rh=new Wt,Tc=new Qh(1,1),Lh=new xh,Dh=new pp,Hh=new bh,Qc=[],Ic=[],Rc=new Float32Array(16),Lc=new Float32Array(9),Dc=new Float32Array(4);function Ui(n,e,t){const A=n[0];if(A<=0||A>0)return n;const i=e*t;let r=Qc[i];if(r===void 0&&(r=new Float32Array(i),Qc[i]=r),e!==0){A.toArray(r,0);for(let s=1,a=0;s!==e;++s)a+=t,n[s].toArray(r,a)}return r}function Et(n,e){if(n.length!==e.length)return!1;for(let t=0,A=n.length;t<A;t++)if(n[t]!==e[t])return!1;return!0}function xt(n,e){for(let t=0,A=e.length;t<A;t++)n[t]=e[t]}function Vs(n,e){let t=Ic[e];t===void 0&&(t=new Int32Array(e),Ic[e]=t);for(let A=0;A!==e;++A)t[A]=n.allocateTextureUnit();return t}function VB(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function kB(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;n.uniform2fv(this.addr,e),xt(t,e)}}function KB(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Et(t,e))return;n.uniform3fv(this.addr,e),xt(t,e)}}function zB(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;n.uniform4fv(this.addr,e),xt(t,e)}}function WB(n,e){const t=this.cache,A=e.elements;if(A===void 0){if(Et(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),xt(t,e)}else{if(Et(t,A))return;Dc.set(A),n.uniformMatrix2fv(this.addr,!1,Dc),xt(t,A)}}function XB(n,e){const t=this.cache,A=e.elements;if(A===void 0){if(Et(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),xt(t,e)}else{if(Et(t,A))return;Lc.set(A),n.uniformMatrix3fv(this.addr,!1,Lc),xt(t,A)}}function YB(n,e){const t=this.cache,A=e.elements;if(A===void 0){if(Et(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),xt(t,e)}else{if(Et(t,A))return;Rc.set(A),n.uniformMatrix4fv(this.addr,!1,Rc),xt(t,A)}}function JB(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function qB(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;n.uniform2iv(this.addr,e),xt(t,e)}}function ZB(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;n.uniform3iv(this.addr,e),xt(t,e)}}function jB(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;n.uniform4iv(this.addr,e),xt(t,e)}}function $B(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function e0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;n.uniform2uiv(this.addr,e),xt(t,e)}}function t0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;n.uniform3uiv(this.addr,e),xt(t,e)}}function A0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;n.uniform4uiv(this.addr,e),xt(t,e)}}function n0(n,e,t){const A=this.cache,i=t.allocateTextureUnit();A[0]!==i&&(n.uniform1i(this.addr,i),A[0]=i);let r;this.type===n.SAMPLER_2D_SHADOW?(Tc.compareFunction=vh,r=Tc):r=Rh,t.setTexture2D(e||r,i)}function i0(n,e,t){const A=this.cache,i=t.allocateTextureUnit();A[0]!==i&&(n.uniform1i(this.addr,i),A[0]=i),t.setTexture3D(e||Dh,i)}function r0(n,e,t){const A=this.cache,i=t.allocateTextureUnit();A[0]!==i&&(n.uniform1i(this.addr,i),A[0]=i),t.setTextureCube(e||Hh,i)}function s0(n,e,t){const A=this.cache,i=t.allocateTextureUnit();A[0]!==i&&(n.uniform1i(this.addr,i),A[0]=i),t.setTexture2DArray(e||Lh,i)}function a0(n){switch(n){case 5126:return VB;case 35664:return kB;case 35665:return KB;case 35666:return zB;case 35674:return WB;case 35675:return XB;case 35676:return YB;case 5124:case 35670:return JB;case 35667:case 35671:return qB;case 35668:case 35672:return ZB;case 35669:case 35673:return jB;case 5125:return $B;case 36294:return e0;case 36295:return t0;case 36296:return A0;case 35678:case 36198:case 36298:case 36306:case 35682:return n0;case 35679:case 36299:case 36307:return i0;case 35680:case 36300:case 36308:case 36293:return r0;case 36289:case 36303:case 36311:case 36292:return s0}}function o0(n,e){n.uniform1fv(this.addr,e)}function l0(n,e){const t=Ui(e,this.size,2);n.uniform2fv(this.addr,t)}function c0(n,e){const t=Ui(e,this.size,3);n.uniform3fv(this.addr,t)}function u0(n,e){const t=Ui(e,this.size,4);n.uniform4fv(this.addr,t)}function h0(n,e){const t=Ui(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function f0(n,e){const t=Ui(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function d0(n,e){const t=Ui(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function p0(n,e){n.uniform1iv(this.addr,e)}function g0(n,e){n.uniform2iv(this.addr,e)}function m0(n,e){n.uniform3iv(this.addr,e)}function B0(n,e){n.uniform4iv(this.addr,e)}function w0(n,e){n.uniform1uiv(this.addr,e)}function _0(n,e){n.uniform2uiv(this.addr,e)}function v0(n,e){n.uniform3uiv(this.addr,e)}function C0(n,e){n.uniform4uiv(this.addr,e)}function E0(n,e,t){const A=this.cache,i=e.length,r=Vs(t,i);Et(A,r)||(n.uniform1iv(this.addr,r),xt(A,r));for(let s=0;s!==i;++s)t.setTexture2D(e[s]||Rh,r[s])}function x0(n,e,t){const A=this.cache,i=e.length,r=Vs(t,i);Et(A,r)||(n.uniform1iv(this.addr,r),xt(A,r));for(let s=0;s!==i;++s)t.setTexture3D(e[s]||Dh,r[s])}function U0(n,e,t){const A=this.cache,i=e.length,r=Vs(t,i);Et(A,r)||(n.uniform1iv(this.addr,r),xt(A,r));for(let s=0;s!==i;++s)t.setTextureCube(e[s]||Hh,r[s])}function y0(n,e,t){const A=this.cache,i=e.length,r=Vs(t,i);Et(A,r)||(n.uniform1iv(this.addr,r),xt(A,r));for(let s=0;s!==i;++s)t.setTexture2DArray(e[s]||Lh,r[s])}function S0(n){switch(n){case 5126:return o0;case 35664:return l0;case 35665:return c0;case 35666:return u0;case 35674:return h0;case 35675:return f0;case 35676:return d0;case 5124:case 35670:return p0;case 35667:case 35671:return g0;case 35668:case 35672:return m0;case 35669:case 35673:return B0;case 5125:return w0;case 36294:return _0;case 36295:return v0;case 36296:return C0;case 35678:case 36198:case 36298:case 36306:case 35682:return E0;case 35679:case 36299:case 36307:return x0;case 35680:case 36300:case 36308:case 36293:return U0;case 36289:case 36303:case 36311:case 36292:return y0}}class M0{constructor(e,t,A){this.id=e,this.addr=A,this.cache=[],this.type=t.type,this.setValue=a0(t.type)}}class F0{constructor(e,t,A){this.id=e,this.addr=A,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=S0(t.type)}}class b0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,A){const i=this.seq;for(let r=0,s=i.length;r!==s;++r){const a=i[r];a.setValue(e,t[a.id],A)}}}const Ta=/(\w+)(\])?(\[|\.)?/g;function Hc(n,e){n.seq.push(e),n.map[e.id]=e}function T0(n,e,t){const A=n.name,i=A.length;for(Ta.lastIndex=0;;){const r=Ta.exec(A),s=Ta.lastIndex;let a=r[1];const o=r[2]==="]",l=r[3];if(o&&(a=a|0),l===void 0||l==="["&&s+2===i){Hc(t,l===void 0?new M0(a,n,e):new F0(a,n,e));break}else{let u=t.map[a];u===void 0&&(u=new b0(a),Hc(t,u)),t=u}}}class Bs{constructor(e,t){this.seq=[],this.map={};const A=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<A;++i){const r=e.getActiveUniform(t,i),s=e.getUniformLocation(t,r.name);T0(r,s,this)}}setValue(e,t,A,i){const r=this.map[t];r!==void 0&&r.setValue(e,A,i)}setOptional(e,t,A){const i=t[A];i!==void 0&&this.setValue(e,A,i)}static upload(e,t,A,i){for(let r=0,s=t.length;r!==s;++r){const a=t[r],o=A[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,i)}}static seqWithValue(e,t){const A=[];for(let i=0,r=e.length;i!==r;++i){const s=e[i];s.id in t&&A.push(s)}return A}}function Pc(n,e,t){const A=n.createShader(e);return n.shaderSource(A,t),n.compileShader(A),A}const Q0=37297;let I0=0;function R0(n,e){const t=n.split(`
`),A=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let s=i;s<r;s++){const a=s+1;A.push(`${a===e?">":" "} ${a}: ${t[s]}`)}return A.join(`
`)}const Nc=new He;function L0(n){Xe._getMatrix(Nc,Xe.workingColorSpace,n);const e=`mat3( ${Nc.elements.map(t=>t.toFixed(4))} )`;switch(Xe.getTransfer(n)){case Es:return[e,"LinearTransferOETF"];case At:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Oc(n,e,t){const A=n.getShaderParameter(e,n.COMPILE_STATUS),i=n.getShaderInfoLog(e).trim();if(A&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const s=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+R0(n.getShaderSource(e),s)}else return i}function D0(n,e){const t=L0(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function H0(n,e){let t;switch(e){case Nd:t="Linear";break;case Od:t="Reinhard";break;case Gd:t="Cineon";break;case Vd:t="ACESFilmic";break;case Kd:t="AgX";break;case zd:t="Neutral";break;case kd:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Or=new Q;function P0(){Xe.getLuminanceCoefficients(Or);const n=Or.x.toFixed(4),e=Or.y.toFixed(4),t=Or.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function N0(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Pi).join(`
`)}function O0(n){const e=[];for(const t in n){const A=n[t];A!==!1&&e.push("#define "+t+" "+A)}return e.join(`
`)}function G0(n,e){const t={},A=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let i=0;i<A;i++){const r=n.getActiveAttrib(e,i),s=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),t[s]={type:r.type,location:n.getAttribLocation(e,s),locationSize:a}}return t}function Pi(n){return n!==""}function Gc(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Vc(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const V0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Xo(n){return n.replace(V0,K0)}const k0=new Map;function K0(n,e){let t=Ne[e];if(t===void 0){const A=k0.get(e);if(A!==void 0)t=Ne[A],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,A);else throw new Error("Can not resolve #include <"+e+">")}return Xo(t)}const z0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function kc(n){return n.replace(z0,W0)}function W0(n,e,t,A){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=A.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Kc(n){let e=`precision ${n.precision} float;
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
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function X0(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===oh?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Bd?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===DA&&(e="SHADOWMAP_TYPE_VSM"),e}function Y0(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Bi:case wi:e="ENVMAP_TYPE_CUBE";break;case Ns:e="ENVMAP_TYPE_CUBE_UV";break}return e}function J0(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case wi:e="ENVMAP_MODE_REFRACTION";break}return e}function q0(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case lh:e="ENVMAP_BLENDING_MULTIPLY";break;case Hd:e="ENVMAP_BLENDING_MIX";break;case Pd:e="ENVMAP_BLENDING_ADD";break}return e}function Z0(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,A=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:A,maxMip:t}}function j0(n,e,t,A){const i=n.getContext(),r=t.defines;let s=t.vertexShader,a=t.fragmentShader;const o=X0(t),l=Y0(t),c=J0(t),u=q0(t),f=Z0(t),p=N0(t),g=O0(r),m=i.createProgram();let d,h,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Pi).join(`
`),d.length>0&&(d+=`
`),h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Pi).join(`
`),h.length>0&&(h+=`
`)):(d=[Kc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+o:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Pi).join(`
`),h=[Kc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+o:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==sn?"#define TONE_MAPPING":"",t.toneMapping!==sn?Ne.tonemapping_pars_fragment:"",t.toneMapping!==sn?H0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ne.colorspace_pars_fragment,D0("linearToOutputTexel",t.outputColorSpace),P0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Pi).join(`
`)),s=Xo(s),s=Gc(s,t),s=Vc(s,t),a=Xo(a),a=Gc(a,t),a=Vc(a,t),s=kc(s),a=kc(a),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,d=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,h=["#define varying in",t.glslVersion===Zl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Zl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const U=E+d+s,B=E+h+a,M=Pc(i,i.VERTEX_SHADER,U),x=Pc(i,i.FRAGMENT_SHADER,B);i.attachShader(m,M),i.attachShader(m,x),t.index0AttributeName!==void 0?i.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m);function S(b){if(n.debug.checkShaderErrors){const H=i.getProgramInfoLog(m).trim(),L=i.getShaderInfoLog(M).trim(),G=i.getShaderInfoLog(x).trim();let X=!0,K=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(X=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(i,m,M,x);else{const Y=Oc(i,M,"vertex"),k=Oc(i,x,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Material Name: `+b.name+`
Material Type: `+b.type+`

Program Info Log: `+H+`
`+Y+`
`+k)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(L===""||G==="")&&(K=!1);K&&(b.diagnostics={runnable:X,programLog:H,vertexShader:{log:L,prefix:d},fragmentShader:{log:G,prefix:h}})}i.deleteShader(M),i.deleteShader(x),F=new Bs(i,m),_=G0(i,m)}let F;this.getUniforms=function(){return F===void 0&&S(this),F};let _;this.getAttributes=function(){return _===void 0&&S(this),_};let v=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=i.getProgramParameter(m,Q0)),v},this.destroy=function(){A.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=I0++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=M,this.fragmentShader=x,this}let $0=0;class ew{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,A=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(A),s=this._getShaderCacheForMaterial(e);return s.has(i)===!1&&(s.add(i),i.usedTimes++),s.has(r)===!1&&(s.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const A of t)A.usedTimes--,A.usedTimes===0&&this.shaderCache.delete(A.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let A=t.get(e);return A===void 0&&(A=new Set,t.set(e,A)),A}_getShaderStage(e){const t=this.shaderCache;let A=t.get(e);return A===void 0&&(A=new tw(e),t.set(e,A)),A}}class tw{constructor(e){this.id=$0++,this.code=e,this.usedTimes=0}}function Aw(n,e,t,A,i,r,s){const a=new Ul,o=new ew,l=new Set,c=[],u=i.logarithmicDepthBuffer,f=i.vertexTextures;let p=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(_){return l.add(_),_===0?"uv":`uv${_}`}function d(_,v,b,H,L){const G=H.fog,X=L.geometry,K=_.isMeshStandardMaterial?H.environment:null,Y=(_.isMeshStandardMaterial?t:e).get(_.envMap||K),k=Y&&Y.mapping===Ns?Y.image.height:null,ne=g[_.type];_.precision!==null&&(p=i.getMaxPrecision(_.precision),p!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",p,"instead."));const oe=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,Be=oe!==void 0?oe.length:0;let Fe=0;X.morphAttributes.position!==void 0&&(Fe=1),X.morphAttributes.normal!==void 0&&(Fe=2),X.morphAttributes.color!==void 0&&(Fe=3);let Re,W,ee,de;if(ne){const $e=CA[ne];Re=$e.vertexShader,W=$e.fragmentShader}else Re=_.vertexShader,W=_.fragmentShader,o.update(_),ee=o.getVertexShaderID(_),de=o.getFragmentShaderID(_);const ie=n.getRenderTarget(),xe=n.state.buffers.depth.getReversed(),Te=L.isInstancedMesh===!0,Le=L.isBatchedMesh===!0,at=!!_.map,Oe=!!_.matcap,ot=!!Y,T=!!_.aoMap,dt=!!_.lightMap,Se=!!_.bumpMap,Ge=!!_.normalMap,Ee=!!_.displacementMap,tt=!!_.emissiveMap,Ce=!!_.metalnessMap,y=!!_.roughnessMap,w=_.anisotropy>0,P=_.clearcoat>0,q=_.dispersion>0,j=_.iridescence>0,J=_.sheen>0,ve=_.transmission>0,ae=w&&!!_.anisotropyMap,pe=P&&!!_.clearcoatMap,Ve=P&&!!_.clearcoatNormalMap,Ae=P&&!!_.clearcoatRoughnessMap,N=j&&!!_.iridescenceMap,$=j&&!!_.iridescenceThicknessMap,_e=J&&!!_.sheenColorMap,se=J&&!!_.sheenRoughnessMap,Me=!!_.specularMap,be=!!_.specularColorMap,Je=!!_.specularIntensityMap,I=ve&&!!_.transmissionMap,le=ve&&!!_.thicknessMap,z=!!_.gradientMap,Z=!!_.alphaMap,re=_.alphaTest>0,ue=!!_.alphaHash,De=!!_.extensions;let ht=sn;_.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(ht=n.toneMapping);const It={shaderID:ne,shaderType:_.type,shaderName:_.name,vertexShader:Re,fragmentShader:W,defines:_.defines,customVertexShaderID:ee,customFragmentShaderID:de,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:p,batching:Le,batchingColor:Le&&L._colorsTexture!==null,instancing:Te,instancingColor:Te&&L.instanceColor!==null,instancingMorph:Te&&L.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ie===null?n.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:Ci,alphaToCoverage:!!_.alphaToCoverage,map:at,matcap:Oe,envMap:ot,envMapMode:ot&&Y.mapping,envMapCubeUVHeight:k,aoMap:T,lightMap:dt,bumpMap:Se,normalMap:Ge,displacementMap:f&&Ee,emissiveMap:tt,normalMapObjectSpace:Ge&&_.normalMapType===qd,normalMapTangentSpace:Ge&&_.normalMapType===Jd,metalnessMap:Ce,roughnessMap:y,anisotropy:w,anisotropyMap:ae,clearcoat:P,clearcoatMap:pe,clearcoatNormalMap:Ve,clearcoatRoughnessMap:Ae,dispersion:q,iridescence:j,iridescenceMap:N,iridescenceThicknessMap:$,sheen:J,sheenColorMap:_e,sheenRoughnessMap:se,specularMap:Me,specularColorMap:be,specularIntensityMap:Je,transmission:ve,transmissionMap:I,thicknessMap:le,gradientMap:z,opaque:_.transparent===!1&&_.blending===hi&&_.alphaToCoverage===!1,alphaMap:Z,alphaTest:re,alphaHash:ue,combine:_.combine,mapUv:at&&m(_.map.channel),aoMapUv:T&&m(_.aoMap.channel),lightMapUv:dt&&m(_.lightMap.channel),bumpMapUv:Se&&m(_.bumpMap.channel),normalMapUv:Ge&&m(_.normalMap.channel),displacementMapUv:Ee&&m(_.displacementMap.channel),emissiveMapUv:tt&&m(_.emissiveMap.channel),metalnessMapUv:Ce&&m(_.metalnessMap.channel),roughnessMapUv:y&&m(_.roughnessMap.channel),anisotropyMapUv:ae&&m(_.anisotropyMap.channel),clearcoatMapUv:pe&&m(_.clearcoatMap.channel),clearcoatNormalMapUv:Ve&&m(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ae&&m(_.clearcoatRoughnessMap.channel),iridescenceMapUv:N&&m(_.iridescenceMap.channel),iridescenceThicknessMapUv:$&&m(_.iridescenceThicknessMap.channel),sheenColorMapUv:_e&&m(_.sheenColorMap.channel),sheenRoughnessMapUv:se&&m(_.sheenRoughnessMap.channel),specularMapUv:Me&&m(_.specularMap.channel),specularColorMapUv:be&&m(_.specularColorMap.channel),specularIntensityMapUv:Je&&m(_.specularIntensityMap.channel),transmissionMapUv:I&&m(_.transmissionMap.channel),thicknessMapUv:le&&m(_.thicknessMap.channel),alphaMapUv:Z&&m(_.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(Ge||w),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!X.attributes.uv&&(at||Z),fog:!!G,useFog:_.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:_.flatShading===!0,sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:xe,skinning:L.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:Be,morphTextureStride:Fe,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&b.length>0,shadowMapType:n.shadowMap.type,toneMapping:ht,decodeVideoTexture:at&&_.map.isVideoTexture===!0&&Xe.getTransfer(_.map.colorSpace)===At,decodeVideoTextureEmissive:tt&&_.emissiveMap.isVideoTexture===!0&&Xe.getTransfer(_.emissiveMap.colorSpace)===At,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===gA,flipSided:_.side===zt,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:De&&_.extensions.clipCullDistance===!0&&A.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(De&&_.extensions.multiDraw===!0||Le)&&A.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:A.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return It.vertexUv1s=l.has(1),It.vertexUv2s=l.has(2),It.vertexUv3s=l.has(3),l.clear(),It}function h(_){const v=[];if(_.shaderID?v.push(_.shaderID):(v.push(_.customVertexShaderID),v.push(_.customFragmentShaderID)),_.defines!==void 0)for(const b in _.defines)v.push(b),v.push(_.defines[b]);return _.isRawShaderMaterial===!1&&(E(v,_),U(v,_),v.push(n.outputColorSpace)),v.push(_.customProgramCacheKey),v.join()}function E(_,v){_.push(v.precision),_.push(v.outputColorSpace),_.push(v.envMapMode),_.push(v.envMapCubeUVHeight),_.push(v.mapUv),_.push(v.alphaMapUv),_.push(v.lightMapUv),_.push(v.aoMapUv),_.push(v.bumpMapUv),_.push(v.normalMapUv),_.push(v.displacementMapUv),_.push(v.emissiveMapUv),_.push(v.metalnessMapUv),_.push(v.roughnessMapUv),_.push(v.anisotropyMapUv),_.push(v.clearcoatMapUv),_.push(v.clearcoatNormalMapUv),_.push(v.clearcoatRoughnessMapUv),_.push(v.iridescenceMapUv),_.push(v.iridescenceThicknessMapUv),_.push(v.sheenColorMapUv),_.push(v.sheenRoughnessMapUv),_.push(v.specularMapUv),_.push(v.specularColorMapUv),_.push(v.specularIntensityMapUv),_.push(v.transmissionMapUv),_.push(v.thicknessMapUv),_.push(v.combine),_.push(v.fogExp2),_.push(v.sizeAttenuation),_.push(v.morphTargetsCount),_.push(v.morphAttributeCount),_.push(v.numDirLights),_.push(v.numPointLights),_.push(v.numSpotLights),_.push(v.numSpotLightMaps),_.push(v.numHemiLights),_.push(v.numRectAreaLights),_.push(v.numDirLightShadows),_.push(v.numPointLightShadows),_.push(v.numSpotLightShadows),_.push(v.numSpotLightShadowsWithMaps),_.push(v.numLightProbes),_.push(v.shadowMapType),_.push(v.toneMapping),_.push(v.numClippingPlanes),_.push(v.numClipIntersection),_.push(v.depthPacking)}function U(_,v){a.disableAll(),v.supportsVertexTextures&&a.enable(0),v.instancing&&a.enable(1),v.instancingColor&&a.enable(2),v.instancingMorph&&a.enable(3),v.matcap&&a.enable(4),v.envMap&&a.enable(5),v.normalMapObjectSpace&&a.enable(6),v.normalMapTangentSpace&&a.enable(7),v.clearcoat&&a.enable(8),v.iridescence&&a.enable(9),v.alphaTest&&a.enable(10),v.vertexColors&&a.enable(11),v.vertexAlphas&&a.enable(12),v.vertexUv1s&&a.enable(13),v.vertexUv2s&&a.enable(14),v.vertexUv3s&&a.enable(15),v.vertexTangents&&a.enable(16),v.anisotropy&&a.enable(17),v.alphaHash&&a.enable(18),v.batching&&a.enable(19),v.dispersion&&a.enable(20),v.batchingColor&&a.enable(21),_.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.reverseDepthBuffer&&a.enable(4),v.skinning&&a.enable(5),v.morphTargets&&a.enable(6),v.morphNormals&&a.enable(7),v.morphColors&&a.enable(8),v.premultipliedAlpha&&a.enable(9),v.shadowMapEnabled&&a.enable(10),v.doubleSided&&a.enable(11),v.flipSided&&a.enable(12),v.useDepthPacking&&a.enable(13),v.dithering&&a.enable(14),v.transmission&&a.enable(15),v.sheen&&a.enable(16),v.opaque&&a.enable(17),v.pointsUvs&&a.enable(18),v.decodeVideoTexture&&a.enable(19),v.decodeVideoTextureEmissive&&a.enable(20),v.alphaToCoverage&&a.enable(21),_.push(a.mask)}function B(_){const v=g[_.type];let b;if(v){const H=CA[v];b=Sp.clone(H.uniforms)}else b=_.uniforms;return b}function M(_,v){let b;for(let H=0,L=c.length;H<L;H++){const G=c[H];if(G.cacheKey===v){b=G,++b.usedTimes;break}}return b===void 0&&(b=new j0(n,v,_,r),c.push(b)),b}function x(_){if(--_.usedTimes===0){const v=c.indexOf(_);c[v]=c[c.length-1],c.pop(),_.destroy()}}function S(_){o.remove(_)}function F(){o.dispose()}return{getParameters:d,getProgramCacheKey:h,getUniforms:B,acquireProgram:M,releaseProgram:x,releaseShaderCache:S,programs:c,dispose:F}}function nw(){let n=new WeakMap;function e(s){return n.has(s)}function t(s){let a=n.get(s);return a===void 0&&(a={},n.set(s,a)),a}function A(s){n.delete(s)}function i(s,a,o){n.get(s)[a]=o}function r(){n=new WeakMap}return{has:e,get:t,remove:A,update:i,dispose:r}}function iw(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function zc(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Wc(){const n=[];let e=0;const t=[],A=[],i=[];function r(){e=0,t.length=0,A.length=0,i.length=0}function s(u,f,p,g,m,d){let h=n[e];return h===void 0?(h={id:u.id,object:u,geometry:f,material:p,groupOrder:g,renderOrder:u.renderOrder,z:m,group:d},n[e]=h):(h.id=u.id,h.object=u,h.geometry=f,h.material=p,h.groupOrder=g,h.renderOrder=u.renderOrder,h.z=m,h.group=d),e++,h}function a(u,f,p,g,m,d){const h=s(u,f,p,g,m,d);p.transmission>0?A.push(h):p.transparent===!0?i.push(h):t.push(h)}function o(u,f,p,g,m,d){const h=s(u,f,p,g,m,d);p.transmission>0?A.unshift(h):p.transparent===!0?i.unshift(h):t.unshift(h)}function l(u,f){t.length>1&&t.sort(u||iw),A.length>1&&A.sort(f||zc),i.length>1&&i.sort(f||zc)}function c(){for(let u=e,f=n.length;u<f;u++){const p=n[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:A,transparent:i,init:r,push:a,unshift:o,finish:c,sort:l}}function rw(){let n=new WeakMap;function e(A,i){const r=n.get(A);let s;return r===void 0?(s=new Wc,n.set(A,[s])):i>=r.length?(s=new Wc,r.push(s)):s=r[i],s}function t(){n=new WeakMap}return{get:e,dispose:t}}function sw(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new Q,color:new Ye};break;case"SpotLight":t={position:new Q,direction:new Q,color:new Ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new Q,color:new Ye,distance:0,decay:0};break;case"HemisphereLight":t={direction:new Q,skyColor:new Ye,groundColor:new Ye};break;case"RectAreaLight":t={color:new Ye,position:new Q,halfWidth:new Q,halfHeight:new Q};break}return n[e.id]=t,t}}}function aw(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let ow=0;function lw(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function cw(n){const e=new sw,t=aw(),A={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)A.probe.push(new Q);const i=new Q,r=new ut,s=new ut;function a(l){let c=0,u=0,f=0;for(let _=0;_<9;_++)A.probe[_].set(0,0,0);let p=0,g=0,m=0,d=0,h=0,E=0,U=0,B=0,M=0,x=0,S=0;l.sort(lw);for(let _=0,v=l.length;_<v;_++){const b=l[_],H=b.color,L=b.intensity,G=b.distance,X=b.shadow&&b.shadow.map?b.shadow.map.texture:null;if(b.isAmbientLight)c+=H.r*L,u+=H.g*L,f+=H.b*L;else if(b.isLightProbe){for(let K=0;K<9;K++)A.probe[K].addScaledVector(b.sh.coefficients[K],L);S++}else if(b.isDirectionalLight){const K=e.get(b);if(K.color.copy(b.color).multiplyScalar(b.intensity),b.castShadow){const Y=b.shadow,k=t.get(b);k.shadowIntensity=Y.intensity,k.shadowBias=Y.bias,k.shadowNormalBias=Y.normalBias,k.shadowRadius=Y.radius,k.shadowMapSize=Y.mapSize,A.directionalShadow[p]=k,A.directionalShadowMap[p]=X,A.directionalShadowMatrix[p]=b.shadow.matrix,E++}A.directional[p]=K,p++}else if(b.isSpotLight){const K=e.get(b);K.position.setFromMatrixPosition(b.matrixWorld),K.color.copy(H).multiplyScalar(L),K.distance=G,K.coneCos=Math.cos(b.angle),K.penumbraCos=Math.cos(b.angle*(1-b.penumbra)),K.decay=b.decay,A.spot[m]=K;const Y=b.shadow;if(b.map&&(A.spotLightMap[M]=b.map,M++,Y.updateMatrices(b),b.castShadow&&x++),A.spotLightMatrix[m]=Y.matrix,b.castShadow){const k=t.get(b);k.shadowIntensity=Y.intensity,k.shadowBias=Y.bias,k.shadowNormalBias=Y.normalBias,k.shadowRadius=Y.radius,k.shadowMapSize=Y.mapSize,A.spotShadow[m]=k,A.spotShadowMap[m]=X,B++}m++}else if(b.isRectAreaLight){const K=e.get(b);K.color.copy(H).multiplyScalar(L),K.halfWidth.set(b.width*.5,0,0),K.halfHeight.set(0,b.height*.5,0),A.rectArea[d]=K,d++}else if(b.isPointLight){const K=e.get(b);if(K.color.copy(b.color).multiplyScalar(b.intensity),K.distance=b.distance,K.decay=b.decay,b.castShadow){const Y=b.shadow,k=t.get(b);k.shadowIntensity=Y.intensity,k.shadowBias=Y.bias,k.shadowNormalBias=Y.normalBias,k.shadowRadius=Y.radius,k.shadowMapSize=Y.mapSize,k.shadowCameraNear=Y.camera.near,k.shadowCameraFar=Y.camera.far,A.pointShadow[g]=k,A.pointShadowMap[g]=X,A.pointShadowMatrix[g]=b.shadow.matrix,U++}A.point[g]=K,g++}else if(b.isHemisphereLight){const K=e.get(b);K.skyColor.copy(b.color).multiplyScalar(L),K.groundColor.copy(b.groundColor).multiplyScalar(L),A.hemi[h]=K,h++}}d>0&&(n.has("OES_texture_float_linear")===!0?(A.rectAreaLTC1=ce.LTC_FLOAT_1,A.rectAreaLTC2=ce.LTC_FLOAT_2):(A.rectAreaLTC1=ce.LTC_HALF_1,A.rectAreaLTC2=ce.LTC_HALF_2)),A.ambient[0]=c,A.ambient[1]=u,A.ambient[2]=f;const F=A.hash;(F.directionalLength!==p||F.pointLength!==g||F.spotLength!==m||F.rectAreaLength!==d||F.hemiLength!==h||F.numDirectionalShadows!==E||F.numPointShadows!==U||F.numSpotShadows!==B||F.numSpotMaps!==M||F.numLightProbes!==S)&&(A.directional.length=p,A.spot.length=m,A.rectArea.length=d,A.point.length=g,A.hemi.length=h,A.directionalShadow.length=E,A.directionalShadowMap.length=E,A.pointShadow.length=U,A.pointShadowMap.length=U,A.spotShadow.length=B,A.spotShadowMap.length=B,A.directionalShadowMatrix.length=E,A.pointShadowMatrix.length=U,A.spotLightMatrix.length=B+M-x,A.spotLightMap.length=M,A.numSpotLightShadowsWithMaps=x,A.numLightProbes=S,F.directionalLength=p,F.pointLength=g,F.spotLength=m,F.rectAreaLength=d,F.hemiLength=h,F.numDirectionalShadows=E,F.numPointShadows=U,F.numSpotShadows=B,F.numSpotMaps=M,F.numLightProbes=S,A.version=ow++)}function o(l,c){let u=0,f=0,p=0,g=0,m=0;const d=c.matrixWorldInverse;for(let h=0,E=l.length;h<E;h++){const U=l[h];if(U.isDirectionalLight){const B=A.directional[u];B.direction.setFromMatrixPosition(U.matrixWorld),i.setFromMatrixPosition(U.target.matrixWorld),B.direction.sub(i),B.direction.transformDirection(d),u++}else if(U.isSpotLight){const B=A.spot[p];B.position.setFromMatrixPosition(U.matrixWorld),B.position.applyMatrix4(d),B.direction.setFromMatrixPosition(U.matrixWorld),i.setFromMatrixPosition(U.target.matrixWorld),B.direction.sub(i),B.direction.transformDirection(d),p++}else if(U.isRectAreaLight){const B=A.rectArea[g];B.position.setFromMatrixPosition(U.matrixWorld),B.position.applyMatrix4(d),s.identity(),r.copy(U.matrixWorld),r.premultiply(d),s.extractRotation(r),B.halfWidth.set(U.width*.5,0,0),B.halfHeight.set(0,U.height*.5,0),B.halfWidth.applyMatrix4(s),B.halfHeight.applyMatrix4(s),g++}else if(U.isPointLight){const B=A.point[f];B.position.setFromMatrixPosition(U.matrixWorld),B.position.applyMatrix4(d),f++}else if(U.isHemisphereLight){const B=A.hemi[m];B.direction.setFromMatrixPosition(U.matrixWorld),B.direction.transformDirection(d),m++}}}return{setup:a,setupView:o,state:A}}function Xc(n){const e=new cw(n),t=[],A=[];function i(c){l.camera=c,t.length=0,A.length=0}function r(c){t.push(c)}function s(c){A.push(c)}function a(){e.setup(t)}function o(c){e.setupView(t,c)}const l={lightsArray:t,shadowsArray:A,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:a,setupLightsView:o,pushLight:r,pushShadow:s}}function uw(n){let e=new WeakMap;function t(i,r=0){const s=e.get(i);let a;return s===void 0?(a=new Xc(n),e.set(i,[a])):r>=s.length?(a=new Xc(n),s.push(a)):a=s[r],a}function A(){e=new WeakMap}return{get:t,dispose:A}}const hw=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,fw=`uniform sampler2D shadow_pass;
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
}`;function dw(n,e,t){let A=new Th;const i=new Pe,r=new Pe,s=new mt,a=new Hp({depthPacking:Yd}),o=new Pp,l={},c=t.maxTextureSize,u={[ln]:zt,[zt]:ln,[gA]:gA},f=new cn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Pe},radius:{value:4}},vertexShader:hw,fragmentShader:fw}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new $t;g.setAttribute("position",new xA(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const m=new jt(g,f),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=oh;let h=this.type;this.render=function(x,S,F){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||x.length===0)return;const _=n.getRenderTarget(),v=n.getActiveCubeFace(),b=n.getActiveMipmapLevel(),H=n.state;H.setBlending(rn),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const L=h!==DA&&this.type===DA,G=h===DA&&this.type!==DA;for(let X=0,K=x.length;X<K;X++){const Y=x[X],k=Y.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;i.copy(k.mapSize);const ne=k.getFrameExtents();if(i.multiply(ne),r.copy(k.mapSize),(i.x>c||i.y>c)&&(i.x>c&&(r.x=Math.floor(c/ne.x),i.x=r.x*ne.x,k.mapSize.x=r.x),i.y>c&&(r.y=Math.floor(c/ne.y),i.y=r.y*ne.y,k.mapSize.y=r.y)),k.map===null||L===!0||G===!0){const Be=this.type!==DA?{minFilter:BA,magFilter:BA}:{};k.map!==null&&k.map.dispose(),k.map=new In(i.x,i.y,Be),k.map.texture.name=Y.name+".shadowMap",k.camera.updateProjectionMatrix()}n.setRenderTarget(k.map),n.clear();const oe=k.getViewportCount();for(let Be=0;Be<oe;Be++){const Fe=k.getViewport(Be);s.set(r.x*Fe.x,r.y*Fe.y,r.x*Fe.z,r.y*Fe.w),H.viewport(s),k.updateMatrices(Y,Be),A=k.getFrustum(),B(S,F,k.camera,Y,this.type)}k.isPointLightShadow!==!0&&this.type===DA&&E(k,F),k.needsUpdate=!1}h=this.type,d.needsUpdate=!1,n.setRenderTarget(_,v,b)};function E(x,S){const F=e.update(m);f.defines.VSM_SAMPLES!==x.blurSamples&&(f.defines.VSM_SAMPLES=x.blurSamples,p.defines.VSM_SAMPLES=x.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),x.mapPass===null&&(x.mapPass=new In(i.x,i.y)),f.uniforms.shadow_pass.value=x.map.texture,f.uniforms.resolution.value=x.mapSize,f.uniforms.radius.value=x.radius,n.setRenderTarget(x.mapPass),n.clear(),n.renderBufferDirect(S,null,F,f,m,null),p.uniforms.shadow_pass.value=x.mapPass.texture,p.uniforms.resolution.value=x.mapSize,p.uniforms.radius.value=x.radius,n.setRenderTarget(x.map),n.clear(),n.renderBufferDirect(S,null,F,p,m,null)}function U(x,S,F,_){let v=null;const b=F.isPointLight===!0?x.customDistanceMaterial:x.customDepthMaterial;if(b!==void 0)v=b;else if(v=F.isPointLight===!0?o:a,n.localClippingEnabled&&S.clipShadows===!0&&Array.isArray(S.clippingPlanes)&&S.clippingPlanes.length!==0||S.displacementMap&&S.displacementScale!==0||S.alphaMap&&S.alphaTest>0||S.map&&S.alphaTest>0){const H=v.uuid,L=S.uuid;let G=l[H];G===void 0&&(G={},l[H]=G);let X=G[L];X===void 0&&(X=v.clone(),G[L]=X,S.addEventListener("dispose",M)),v=X}if(v.visible=S.visible,v.wireframe=S.wireframe,_===DA?v.side=S.shadowSide!==null?S.shadowSide:S.side:v.side=S.shadowSide!==null?S.shadowSide:u[S.side],v.alphaMap=S.alphaMap,v.alphaTest=S.alphaTest,v.map=S.map,v.clipShadows=S.clipShadows,v.clippingPlanes=S.clippingPlanes,v.clipIntersection=S.clipIntersection,v.displacementMap=S.displacementMap,v.displacementScale=S.displacementScale,v.displacementBias=S.displacementBias,v.wireframeLinewidth=S.wireframeLinewidth,v.linewidth=S.linewidth,F.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const H=n.properties.get(v);H.light=F}return v}function B(x,S,F,_,v){if(x.visible===!1)return;if(x.layers.test(S.layers)&&(x.isMesh||x.isLine||x.isPoints)&&(x.castShadow||x.receiveShadow&&v===DA)&&(!x.frustumCulled||A.intersectsObject(x))){x.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,x.matrixWorld);const L=e.update(x),G=x.material;if(Array.isArray(G)){const X=L.groups;for(let K=0,Y=X.length;K<Y;K++){const k=X[K],ne=G[k.materialIndex];if(ne&&ne.visible){const oe=U(x,ne,_,v);x.onBeforeShadow(n,x,S,F,L,oe,k),n.renderBufferDirect(F,null,L,oe,x,k),x.onAfterShadow(n,x,S,F,L,oe,k)}}}else if(G.visible){const X=U(x,G,_,v);x.onBeforeShadow(n,x,S,F,L,X,null),n.renderBufferDirect(F,null,L,X,x,null),x.onAfterShadow(n,x,S,F,L,X,null)}}const H=x.children;for(let L=0,G=H.length;L<G;L++)B(H[L],S,F,_,v)}function M(x){x.target.removeEventListener("dispose",M);for(const F in l){const _=l[F],v=x.target.uuid;v in _&&(_[v].dispose(),delete _[v])}}}const pw={[ao]:oo,[lo]:ho,[co]:fo,[mi]:uo,[oo]:ao,[ho]:lo,[fo]:co,[uo]:mi};function gw(n,e){function t(){let I=!1;const le=new mt;let z=null;const Z=new mt(0,0,0,0);return{setMask:function(re){z!==re&&!I&&(n.colorMask(re,re,re,re),z=re)},setLocked:function(re){I=re},setClear:function(re,ue,De,ht,It){It===!0&&(re*=ht,ue*=ht,De*=ht),le.set(re,ue,De,ht),Z.equals(le)===!1&&(n.clearColor(re,ue,De,ht),Z.copy(le))},reset:function(){I=!1,z=null,Z.set(-1,0,0,0)}}}function A(){let I=!1,le=!1,z=null,Z=null,re=null;return{setReversed:function(ue){if(le!==ue){const De=e.get("EXT_clip_control");le?De.clipControlEXT(De.LOWER_LEFT_EXT,De.ZERO_TO_ONE_EXT):De.clipControlEXT(De.LOWER_LEFT_EXT,De.NEGATIVE_ONE_TO_ONE_EXT);const ht=re;re=null,this.setClear(ht)}le=ue},getReversed:function(){return le},setTest:function(ue){ue?ie(n.DEPTH_TEST):xe(n.DEPTH_TEST)},setMask:function(ue){z!==ue&&!I&&(n.depthMask(ue),z=ue)},setFunc:function(ue){if(le&&(ue=pw[ue]),Z!==ue){switch(ue){case ao:n.depthFunc(n.NEVER);break;case oo:n.depthFunc(n.ALWAYS);break;case lo:n.depthFunc(n.LESS);break;case mi:n.depthFunc(n.LEQUAL);break;case co:n.depthFunc(n.EQUAL);break;case uo:n.depthFunc(n.GEQUAL);break;case ho:n.depthFunc(n.GREATER);break;case fo:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Z=ue}},setLocked:function(ue){I=ue},setClear:function(ue){re!==ue&&(le&&(ue=1-ue),n.clearDepth(ue),re=ue)},reset:function(){I=!1,z=null,Z=null,re=null,le=!1}}}function i(){let I=!1,le=null,z=null,Z=null,re=null,ue=null,De=null,ht=null,It=null;return{setTest:function($e){I||($e?ie(n.STENCIL_TEST):xe(n.STENCIL_TEST))},setMask:function($e){le!==$e&&!I&&(n.stencilMask($e),le=$e)},setFunc:function($e,cA,MA){(z!==$e||Z!==cA||re!==MA)&&(n.stencilFunc($e,cA,MA),z=$e,Z=cA,re=MA)},setOp:function($e,cA,MA){(ue!==$e||De!==cA||ht!==MA)&&(n.stencilOp($e,cA,MA),ue=$e,De=cA,ht=MA)},setLocked:function($e){I=$e},setClear:function($e){It!==$e&&(n.clearStencil($e),It=$e)},reset:function(){I=!1,le=null,z=null,Z=null,re=null,ue=null,De=null,ht=null,It=null}}}const r=new t,s=new A,a=new i,o=new WeakMap,l=new WeakMap;let c={},u={},f=new WeakMap,p=[],g=null,m=!1,d=null,h=null,E=null,U=null,B=null,M=null,x=null,S=new Ye(0,0,0),F=0,_=!1,v=null,b=null,H=null,L=null,G=null;const X=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let K=!1,Y=0;const k=n.getParameter(n.VERSION);k.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(k)[1]),K=Y>=1):k.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),K=Y>=2);let ne=null,oe={};const Be=n.getParameter(n.SCISSOR_BOX),Fe=n.getParameter(n.VIEWPORT),Re=new mt().fromArray(Be),W=new mt().fromArray(Fe);function ee(I,le,z,Z){const re=new Uint8Array(4),ue=n.createTexture();n.bindTexture(I,ue),n.texParameteri(I,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(I,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let De=0;De<z;De++)I===n.TEXTURE_3D||I===n.TEXTURE_2D_ARRAY?n.texImage3D(le,0,n.RGBA,1,1,Z,0,n.RGBA,n.UNSIGNED_BYTE,re):n.texImage2D(le+De,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,re);return ue}const de={};de[n.TEXTURE_2D]=ee(n.TEXTURE_2D,n.TEXTURE_2D,1),de[n.TEXTURE_CUBE_MAP]=ee(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),de[n.TEXTURE_2D_ARRAY]=ee(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),de[n.TEXTURE_3D]=ee(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),a.setClear(0),ie(n.DEPTH_TEST),s.setFunc(mi),Se(!1),Ge(zl),ie(n.CULL_FACE),T(rn);function ie(I){c[I]!==!0&&(n.enable(I),c[I]=!0)}function xe(I){c[I]!==!1&&(n.disable(I),c[I]=!1)}function Te(I,le){return u[I]!==le?(n.bindFramebuffer(I,le),u[I]=le,I===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=le),I===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=le),!0):!1}function Le(I,le){let z=p,Z=!1;if(I){z=f.get(le),z===void 0&&(z=[],f.set(le,z));const re=I.textures;if(z.length!==re.length||z[0]!==n.COLOR_ATTACHMENT0){for(let ue=0,De=re.length;ue<De;ue++)z[ue]=n.COLOR_ATTACHMENT0+ue;z.length=re.length,Z=!0}}else z[0]!==n.BACK&&(z[0]=n.BACK,Z=!0);Z&&n.drawBuffers(z)}function at(I){return g!==I?(n.useProgram(I),g=I,!0):!1}const Oe={[xn]:n.FUNC_ADD,[_d]:n.FUNC_SUBTRACT,[vd]:n.FUNC_REVERSE_SUBTRACT};Oe[Cd]=n.MIN,Oe[Ed]=n.MAX;const ot={[xd]:n.ZERO,[Ud]:n.ONE,[yd]:n.SRC_COLOR,[ro]:n.SRC_ALPHA,[Qd]:n.SRC_ALPHA_SATURATE,[bd]:n.DST_COLOR,[Md]:n.DST_ALPHA,[Sd]:n.ONE_MINUS_SRC_COLOR,[so]:n.ONE_MINUS_SRC_ALPHA,[Td]:n.ONE_MINUS_DST_COLOR,[Fd]:n.ONE_MINUS_DST_ALPHA,[Id]:n.CONSTANT_COLOR,[Rd]:n.ONE_MINUS_CONSTANT_COLOR,[Ld]:n.CONSTANT_ALPHA,[Dd]:n.ONE_MINUS_CONSTANT_ALPHA};function T(I,le,z,Z,re,ue,De,ht,It,$e){if(I===rn){m===!0&&(xe(n.BLEND),m=!1);return}if(m===!1&&(ie(n.BLEND),m=!0),I!==wd){if(I!==d||$e!==_){if((h!==xn||B!==xn)&&(n.blendEquation(n.FUNC_ADD),h=xn,B=xn),$e)switch(I){case hi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Wl:n.blendFunc(n.ONE,n.ONE);break;case Xl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Yl:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case hi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Wl:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Xl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Yl:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}E=null,U=null,M=null,x=null,S.set(0,0,0),F=0,d=I,_=$e}return}re=re||le,ue=ue||z,De=De||Z,(le!==h||re!==B)&&(n.blendEquationSeparate(Oe[le],Oe[re]),h=le,B=re),(z!==E||Z!==U||ue!==M||De!==x)&&(n.blendFuncSeparate(ot[z],ot[Z],ot[ue],ot[De]),E=z,U=Z,M=ue,x=De),(ht.equals(S)===!1||It!==F)&&(n.blendColor(ht.r,ht.g,ht.b,It),S.copy(ht),F=It),d=I,_=!1}function dt(I,le){I.side===gA?xe(n.CULL_FACE):ie(n.CULL_FACE);let z=I.side===zt;le&&(z=!z),Se(z),I.blending===hi&&I.transparent===!1?T(rn):T(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),s.setFunc(I.depthFunc),s.setTest(I.depthTest),s.setMask(I.depthWrite),r.setMask(I.colorWrite);const Z=I.stencilWrite;a.setTest(Z),Z&&(a.setMask(I.stencilWriteMask),a.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),a.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),tt(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?ie(n.SAMPLE_ALPHA_TO_COVERAGE):xe(n.SAMPLE_ALPHA_TO_COVERAGE)}function Se(I){v!==I&&(I?n.frontFace(n.CW):n.frontFace(n.CCW),v=I)}function Ge(I){I!==gd?(ie(n.CULL_FACE),I!==b&&(I===zl?n.cullFace(n.BACK):I===md?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):xe(n.CULL_FACE),b=I}function Ee(I){I!==H&&(K&&n.lineWidth(I),H=I)}function tt(I,le,z){I?(ie(n.POLYGON_OFFSET_FILL),(L!==le||G!==z)&&(n.polygonOffset(le,z),L=le,G=z)):xe(n.POLYGON_OFFSET_FILL)}function Ce(I){I?ie(n.SCISSOR_TEST):xe(n.SCISSOR_TEST)}function y(I){I===void 0&&(I=n.TEXTURE0+X-1),ne!==I&&(n.activeTexture(I),ne=I)}function w(I,le,z){z===void 0&&(ne===null?z=n.TEXTURE0+X-1:z=ne);let Z=oe[z];Z===void 0&&(Z={type:void 0,texture:void 0},oe[z]=Z),(Z.type!==I||Z.texture!==le)&&(ne!==z&&(n.activeTexture(z),ne=z),n.bindTexture(I,le||de[I]),Z.type=I,Z.texture=le)}function P(){const I=oe[ne];I!==void 0&&I.type!==void 0&&(n.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function q(){try{n.compressedTexImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function j(){try{n.compressedTexImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function J(){try{n.texSubImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ve(){try{n.texSubImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ae(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function pe(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ve(){try{n.texStorage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ae(){try{n.texStorage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function N(){try{n.texImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function $(){try{n.texImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function _e(I){Re.equals(I)===!1&&(n.scissor(I.x,I.y,I.z,I.w),Re.copy(I))}function se(I){W.equals(I)===!1&&(n.viewport(I.x,I.y,I.z,I.w),W.copy(I))}function Me(I,le){let z=l.get(le);z===void 0&&(z=new WeakMap,l.set(le,z));let Z=z.get(I);Z===void 0&&(Z=n.getUniformBlockIndex(le,I.name),z.set(I,Z))}function be(I,le){const Z=l.get(le).get(I);o.get(le)!==Z&&(n.uniformBlockBinding(le,Z,I.__bindingPointIndex),o.set(le,Z))}function Je(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),s.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),c={},ne=null,oe={},u={},f=new WeakMap,p=[],g=null,m=!1,d=null,h=null,E=null,U=null,B=null,M=null,x=null,S=new Ye(0,0,0),F=0,_=!1,v=null,b=null,H=null,L=null,G=null,Re.set(0,0,n.canvas.width,n.canvas.height),W.set(0,0,n.canvas.width,n.canvas.height),r.reset(),s.reset(),a.reset()}return{buffers:{color:r,depth:s,stencil:a},enable:ie,disable:xe,bindFramebuffer:Te,drawBuffers:Le,useProgram:at,setBlending:T,setMaterial:dt,setFlipSided:Se,setCullFace:Ge,setLineWidth:Ee,setPolygonOffset:tt,setScissorTest:Ce,activeTexture:y,bindTexture:w,unbindTexture:P,compressedTexImage2D:q,compressedTexImage3D:j,texImage2D:N,texImage3D:$,updateUBOMapping:Me,uniformBlockBinding:be,texStorage2D:Ve,texStorage3D:Ae,texSubImage2D:J,texSubImage3D:ve,compressedTexSubImage2D:ae,compressedTexSubImage3D:pe,scissor:_e,viewport:se,reset:Je}}function mw(n,e,t,A,i,r,s){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,o=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Pe,c=new WeakMap;let u;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(y,w){return p?new OffscreenCanvas(y,w):Us("canvas")}function m(y,w,P){let q=1;const j=Ce(y);if((j.width>P||j.height>P)&&(q=P/Math.max(j.width,j.height)),q<1)if(typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&y instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&y instanceof ImageBitmap||typeof VideoFrame<"u"&&y instanceof VideoFrame){const J=Math.floor(q*j.width),ve=Math.floor(q*j.height);u===void 0&&(u=g(J,ve));const ae=w?g(J,ve):u;return ae.width=J,ae.height=ve,ae.getContext("2d").drawImage(y,0,0,J,ve),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+J+"x"+ve+")."),ae}else return"data"in y&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),y;return y}function d(y){return y.generateMipmaps}function h(y){n.generateMipmap(y)}function E(y){return y.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:y.isWebGL3DRenderTarget?n.TEXTURE_3D:y.isWebGLArrayRenderTarget||y.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function U(y,w,P,q,j=!1){if(y!==null){if(n[y]!==void 0)return n[y];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+y+"'")}let J=w;if(w===n.RED&&(P===n.FLOAT&&(J=n.R32F),P===n.HALF_FLOAT&&(J=n.R16F),P===n.UNSIGNED_BYTE&&(J=n.R8)),w===n.RED_INTEGER&&(P===n.UNSIGNED_BYTE&&(J=n.R8UI),P===n.UNSIGNED_SHORT&&(J=n.R16UI),P===n.UNSIGNED_INT&&(J=n.R32UI),P===n.BYTE&&(J=n.R8I),P===n.SHORT&&(J=n.R16I),P===n.INT&&(J=n.R32I)),w===n.RG&&(P===n.FLOAT&&(J=n.RG32F),P===n.HALF_FLOAT&&(J=n.RG16F),P===n.UNSIGNED_BYTE&&(J=n.RG8)),w===n.RG_INTEGER&&(P===n.UNSIGNED_BYTE&&(J=n.RG8UI),P===n.UNSIGNED_SHORT&&(J=n.RG16UI),P===n.UNSIGNED_INT&&(J=n.RG32UI),P===n.BYTE&&(J=n.RG8I),P===n.SHORT&&(J=n.RG16I),P===n.INT&&(J=n.RG32I)),w===n.RGB_INTEGER&&(P===n.UNSIGNED_BYTE&&(J=n.RGB8UI),P===n.UNSIGNED_SHORT&&(J=n.RGB16UI),P===n.UNSIGNED_INT&&(J=n.RGB32UI),P===n.BYTE&&(J=n.RGB8I),P===n.SHORT&&(J=n.RGB16I),P===n.INT&&(J=n.RGB32I)),w===n.RGBA_INTEGER&&(P===n.UNSIGNED_BYTE&&(J=n.RGBA8UI),P===n.UNSIGNED_SHORT&&(J=n.RGBA16UI),P===n.UNSIGNED_INT&&(J=n.RGBA32UI),P===n.BYTE&&(J=n.RGBA8I),P===n.SHORT&&(J=n.RGBA16I),P===n.INT&&(J=n.RGBA32I)),w===n.RGB&&P===n.UNSIGNED_INT_5_9_9_9_REV&&(J=n.RGB9_E5),w===n.RGBA){const ve=j?Es:Xe.getTransfer(q);P===n.FLOAT&&(J=n.RGBA32F),P===n.HALF_FLOAT&&(J=n.RGBA16F),P===n.UNSIGNED_BYTE&&(J=ve===At?n.SRGB8_ALPHA8:n.RGBA8),P===n.UNSIGNED_SHORT_4_4_4_4&&(J=n.RGBA4),P===n.UNSIGNED_SHORT_5_5_5_1&&(J=n.RGB5_A1)}return(J===n.R16F||J===n.R32F||J===n.RG16F||J===n.RG32F||J===n.RGBA16F||J===n.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function B(y,w){let P;return y?w===null||w===Qn||w===_i?P=n.DEPTH24_STENCIL8:w===HA?P=n.DEPTH32F_STENCIL8:w===$i&&(P=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Qn||w===_i?P=n.DEPTH_COMPONENT24:w===HA?P=n.DEPTH_COMPONENT32F:w===$i&&(P=n.DEPTH_COMPONENT16),P}function M(y,w){return d(y)===!0||y.isFramebufferTexture&&y.minFilter!==BA&&y.minFilter!==EA?Math.log2(Math.max(w.width,w.height))+1:y.mipmaps!==void 0&&y.mipmaps.length>0?y.mipmaps.length:y.isCompressedTexture&&Array.isArray(y.image)?w.mipmaps.length:1}function x(y){const w=y.target;w.removeEventListener("dispose",x),F(w),w.isVideoTexture&&c.delete(w)}function S(y){const w=y.target;w.removeEventListener("dispose",S),v(w)}function F(y){const w=A.get(y);if(w.__webglInit===void 0)return;const P=y.source,q=f.get(P);if(q){const j=q[w.__cacheKey];j.usedTimes--,j.usedTimes===0&&_(y),Object.keys(q).length===0&&f.delete(P)}A.remove(y)}function _(y){const w=A.get(y);n.deleteTexture(w.__webglTexture);const P=y.source,q=f.get(P);delete q[w.__cacheKey],s.memory.textures--}function v(y){const w=A.get(y);if(y.depthTexture&&(y.depthTexture.dispose(),A.remove(y.depthTexture)),y.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(w.__webglFramebuffer[q]))for(let j=0;j<w.__webglFramebuffer[q].length;j++)n.deleteFramebuffer(w.__webglFramebuffer[q][j]);else n.deleteFramebuffer(w.__webglFramebuffer[q]);w.__webglDepthbuffer&&n.deleteRenderbuffer(w.__webglDepthbuffer[q])}else{if(Array.isArray(w.__webglFramebuffer))for(let q=0;q<w.__webglFramebuffer.length;q++)n.deleteFramebuffer(w.__webglFramebuffer[q]);else n.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&n.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&n.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let q=0;q<w.__webglColorRenderbuffer.length;q++)w.__webglColorRenderbuffer[q]&&n.deleteRenderbuffer(w.__webglColorRenderbuffer[q]);w.__webglDepthRenderbuffer&&n.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const P=y.textures;for(let q=0,j=P.length;q<j;q++){const J=A.get(P[q]);J.__webglTexture&&(n.deleteTexture(J.__webglTexture),s.memory.textures--),A.remove(P[q])}A.remove(y)}let b=0;function H(){b=0}function L(){const y=b;return y>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+y+" texture units while this GPU supports only "+i.maxTextures),b+=1,y}function G(y){const w=[];return w.push(y.wrapS),w.push(y.wrapT),w.push(y.wrapR||0),w.push(y.magFilter),w.push(y.minFilter),w.push(y.anisotropy),w.push(y.internalFormat),w.push(y.format),w.push(y.type),w.push(y.generateMipmaps),w.push(y.premultiplyAlpha),w.push(y.flipY),w.push(y.unpackAlignment),w.push(y.colorSpace),w.join()}function X(y,w){const P=A.get(y);if(y.isVideoTexture&&Ee(y),y.isRenderTargetTexture===!1&&y.version>0&&P.__version!==y.version){const q=y.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{W(P,y,w);return}}t.bindTexture(n.TEXTURE_2D,P.__webglTexture,n.TEXTURE0+w)}function K(y,w){const P=A.get(y);if(y.version>0&&P.__version!==y.version){W(P,y,w);return}t.bindTexture(n.TEXTURE_2D_ARRAY,P.__webglTexture,n.TEXTURE0+w)}function Y(y,w){const P=A.get(y);if(y.version>0&&P.__version!==y.version){W(P,y,w);return}t.bindTexture(n.TEXTURE_3D,P.__webglTexture,n.TEXTURE0+w)}function k(y,w){const P=A.get(y);if(y.version>0&&P.__version!==y.version){ee(P,y,w);return}t.bindTexture(n.TEXTURE_CUBE_MAP,P.__webglTexture,n.TEXTURE0+w)}const ne={[mo]:n.REPEAT,[Sn]:n.CLAMP_TO_EDGE,[Bo]:n.MIRRORED_REPEAT},oe={[BA]:n.NEAREST,[Wd]:n.NEAREST_MIPMAP_NEAREST,[hr]:n.NEAREST_MIPMAP_LINEAR,[EA]:n.LINEAR,[ta]:n.LINEAR_MIPMAP_NEAREST,[Mn]:n.LINEAR_MIPMAP_LINEAR},Be={[Zd]:n.NEVER,[np]:n.ALWAYS,[jd]:n.LESS,[vh]:n.LEQUAL,[$d]:n.EQUAL,[Ap]:n.GEQUAL,[ep]:n.GREATER,[tp]:n.NOTEQUAL};function Fe(y,w){if(w.type===HA&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===EA||w.magFilter===ta||w.magFilter===hr||w.magFilter===Mn||w.minFilter===EA||w.minFilter===ta||w.minFilter===hr||w.minFilter===Mn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(y,n.TEXTURE_WRAP_S,ne[w.wrapS]),n.texParameteri(y,n.TEXTURE_WRAP_T,ne[w.wrapT]),(y===n.TEXTURE_3D||y===n.TEXTURE_2D_ARRAY)&&n.texParameteri(y,n.TEXTURE_WRAP_R,ne[w.wrapR]),n.texParameteri(y,n.TEXTURE_MAG_FILTER,oe[w.magFilter]),n.texParameteri(y,n.TEXTURE_MIN_FILTER,oe[w.minFilter]),w.compareFunction&&(n.texParameteri(y,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(y,n.TEXTURE_COMPARE_FUNC,Be[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===BA||w.minFilter!==hr&&w.minFilter!==Mn||w.type===HA&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||A.get(w).__currentAnisotropy){const P=e.get("EXT_texture_filter_anisotropic");n.texParameterf(y,P.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),A.get(w).__currentAnisotropy=w.anisotropy}}}function Re(y,w){let P=!1;y.__webglInit===void 0&&(y.__webglInit=!0,w.addEventListener("dispose",x));const q=w.source;let j=f.get(q);j===void 0&&(j={},f.set(q,j));const J=G(w);if(J!==y.__cacheKey){j[J]===void 0&&(j[J]={texture:n.createTexture(),usedTimes:0},s.memory.textures++,P=!0),j[J].usedTimes++;const ve=j[y.__cacheKey];ve!==void 0&&(j[y.__cacheKey].usedTimes--,ve.usedTimes===0&&_(w)),y.__cacheKey=J,y.__webglTexture=j[J].texture}return P}function W(y,w,P){let q=n.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(q=n.TEXTURE_2D_ARRAY),w.isData3DTexture&&(q=n.TEXTURE_3D);const j=Re(y,w),J=w.source;t.bindTexture(q,y.__webglTexture,n.TEXTURE0+P);const ve=A.get(J);if(J.version!==ve.__version||j===!0){t.activeTexture(n.TEXTURE0+P);const ae=Xe.getPrimaries(Xe.workingColorSpace),pe=w.colorSpace===en?null:Xe.getPrimaries(w.colorSpace),Ve=w.colorSpace===en||ae===pe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,w.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,w.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ve);let Ae=m(w.image,!1,i.maxTextureSize);Ae=tt(w,Ae);const N=r.convert(w.format,w.colorSpace),$=r.convert(w.type);let _e=U(w.internalFormat,N,$,w.colorSpace,w.isVideoTexture);Fe(q,w);let se;const Me=w.mipmaps,be=w.isVideoTexture!==!0,Je=ve.__version===void 0||j===!0,I=J.dataReady,le=M(w,Ae);if(w.isDepthTexture)_e=B(w.format===vi,w.type),Je&&(be?t.texStorage2D(n.TEXTURE_2D,1,_e,Ae.width,Ae.height):t.texImage2D(n.TEXTURE_2D,0,_e,Ae.width,Ae.height,0,N,$,null));else if(w.isDataTexture)if(Me.length>0){be&&Je&&t.texStorage2D(n.TEXTURE_2D,le,_e,Me[0].width,Me[0].height);for(let z=0,Z=Me.length;z<Z;z++)se=Me[z],be?I&&t.texSubImage2D(n.TEXTURE_2D,z,0,0,se.width,se.height,N,$,se.data):t.texImage2D(n.TEXTURE_2D,z,_e,se.width,se.height,0,N,$,se.data);w.generateMipmaps=!1}else be?(Je&&t.texStorage2D(n.TEXTURE_2D,le,_e,Ae.width,Ae.height),I&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,Ae.width,Ae.height,N,$,Ae.data)):t.texImage2D(n.TEXTURE_2D,0,_e,Ae.width,Ae.height,0,N,$,Ae.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){be&&Je&&t.texStorage3D(n.TEXTURE_2D_ARRAY,le,_e,Me[0].width,Me[0].height,Ae.depth);for(let z=0,Z=Me.length;z<Z;z++)if(se=Me[z],w.format!==mA)if(N!==null)if(be){if(I)if(w.layerUpdates.size>0){const re=Ec(se.width,se.height,w.format,w.type);for(const ue of w.layerUpdates){const De=se.data.subarray(ue*re/se.data.BYTES_PER_ELEMENT,(ue+1)*re/se.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,z,0,0,ue,se.width,se.height,1,N,De)}w.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,z,0,0,0,se.width,se.height,Ae.depth,N,se.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,z,_e,se.width,se.height,Ae.depth,0,se.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else be?I&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,z,0,0,0,se.width,se.height,Ae.depth,N,$,se.data):t.texImage3D(n.TEXTURE_2D_ARRAY,z,_e,se.width,se.height,Ae.depth,0,N,$,se.data)}else{be&&Je&&t.texStorage2D(n.TEXTURE_2D,le,_e,Me[0].width,Me[0].height);for(let z=0,Z=Me.length;z<Z;z++)se=Me[z],w.format!==mA?N!==null?be?I&&t.compressedTexSubImage2D(n.TEXTURE_2D,z,0,0,se.width,se.height,N,se.data):t.compressedTexImage2D(n.TEXTURE_2D,z,_e,se.width,se.height,0,se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):be?I&&t.texSubImage2D(n.TEXTURE_2D,z,0,0,se.width,se.height,N,$,se.data):t.texImage2D(n.TEXTURE_2D,z,_e,se.width,se.height,0,N,$,se.data)}else if(w.isDataArrayTexture)if(be){if(Je&&t.texStorage3D(n.TEXTURE_2D_ARRAY,le,_e,Ae.width,Ae.height,Ae.depth),I)if(w.layerUpdates.size>0){const z=Ec(Ae.width,Ae.height,w.format,w.type);for(const Z of w.layerUpdates){const re=Ae.data.subarray(Z*z/Ae.data.BYTES_PER_ELEMENT,(Z+1)*z/Ae.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Z,Ae.width,Ae.height,1,N,$,re)}w.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Ae.width,Ae.height,Ae.depth,N,$,Ae.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,_e,Ae.width,Ae.height,Ae.depth,0,N,$,Ae.data);else if(w.isData3DTexture)be?(Je&&t.texStorage3D(n.TEXTURE_3D,le,_e,Ae.width,Ae.height,Ae.depth),I&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Ae.width,Ae.height,Ae.depth,N,$,Ae.data)):t.texImage3D(n.TEXTURE_3D,0,_e,Ae.width,Ae.height,Ae.depth,0,N,$,Ae.data);else if(w.isFramebufferTexture){if(Je)if(be)t.texStorage2D(n.TEXTURE_2D,le,_e,Ae.width,Ae.height);else{let z=Ae.width,Z=Ae.height;for(let re=0;re<le;re++)t.texImage2D(n.TEXTURE_2D,re,_e,z,Z,0,N,$,null),z>>=1,Z>>=1}}else if(Me.length>0){if(be&&Je){const z=Ce(Me[0]);t.texStorage2D(n.TEXTURE_2D,le,_e,z.width,z.height)}for(let z=0,Z=Me.length;z<Z;z++)se=Me[z],be?I&&t.texSubImage2D(n.TEXTURE_2D,z,0,0,N,$,se):t.texImage2D(n.TEXTURE_2D,z,_e,N,$,se);w.generateMipmaps=!1}else if(be){if(Je){const z=Ce(Ae);t.texStorage2D(n.TEXTURE_2D,le,_e,z.width,z.height)}I&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,N,$,Ae)}else t.texImage2D(n.TEXTURE_2D,0,_e,N,$,Ae);d(w)&&h(q),ve.__version=J.version,w.onUpdate&&w.onUpdate(w)}y.__version=w.version}function ee(y,w,P){if(w.image.length!==6)return;const q=Re(y,w),j=w.source;t.bindTexture(n.TEXTURE_CUBE_MAP,y.__webglTexture,n.TEXTURE0+P);const J=A.get(j);if(j.version!==J.__version||q===!0){t.activeTexture(n.TEXTURE0+P);const ve=Xe.getPrimaries(Xe.workingColorSpace),ae=w.colorSpace===en?null:Xe.getPrimaries(w.colorSpace),pe=w.colorSpace===en||ve===ae?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,w.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,w.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,pe);const Ve=w.isCompressedTexture||w.image[0].isCompressedTexture,Ae=w.image[0]&&w.image[0].isDataTexture,N=[];for(let Z=0;Z<6;Z++)!Ve&&!Ae?N[Z]=m(w.image[Z],!0,i.maxCubemapSize):N[Z]=Ae?w.image[Z].image:w.image[Z],N[Z]=tt(w,N[Z]);const $=N[0],_e=r.convert(w.format,w.colorSpace),se=r.convert(w.type),Me=U(w.internalFormat,_e,se,w.colorSpace),be=w.isVideoTexture!==!0,Je=J.__version===void 0||q===!0,I=j.dataReady;let le=M(w,$);Fe(n.TEXTURE_CUBE_MAP,w);let z;if(Ve){be&&Je&&t.texStorage2D(n.TEXTURE_CUBE_MAP,le,Me,$.width,$.height);for(let Z=0;Z<6;Z++){z=N[Z].mipmaps;for(let re=0;re<z.length;re++){const ue=z[re];w.format!==mA?_e!==null?be?I&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,re,0,0,ue.width,ue.height,_e,ue.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,re,Me,ue.width,ue.height,0,ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):be?I&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,re,0,0,ue.width,ue.height,_e,se,ue.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,re,Me,ue.width,ue.height,0,_e,se,ue.data)}}}else{if(z=w.mipmaps,be&&Je){z.length>0&&le++;const Z=Ce(N[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,le,Me,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(Ae){be?I&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,N[Z].width,N[Z].height,_e,se,N[Z].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Me,N[Z].width,N[Z].height,0,_e,se,N[Z].data);for(let re=0;re<z.length;re++){const De=z[re].image[Z].image;be?I&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,re+1,0,0,De.width,De.height,_e,se,De.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,re+1,Me,De.width,De.height,0,_e,se,De.data)}}else{be?I&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,_e,se,N[Z]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Me,_e,se,N[Z]);for(let re=0;re<z.length;re++){const ue=z[re];be?I&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,re+1,0,0,_e,se,ue.image[Z]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,re+1,Me,_e,se,ue.image[Z])}}}d(w)&&h(n.TEXTURE_CUBE_MAP),J.__version=j.version,w.onUpdate&&w.onUpdate(w)}y.__version=w.version}function de(y,w,P,q,j,J){const ve=r.convert(P.format,P.colorSpace),ae=r.convert(P.type),pe=U(P.internalFormat,ve,ae,P.colorSpace),Ve=A.get(w),Ae=A.get(P);if(Ae.__renderTarget=w,!Ve.__hasExternalTextures){const N=Math.max(1,w.width>>J),$=Math.max(1,w.height>>J);j===n.TEXTURE_3D||j===n.TEXTURE_2D_ARRAY?t.texImage3D(j,J,pe,N,$,w.depth,0,ve,ae,null):t.texImage2D(j,J,pe,N,$,0,ve,ae,null)}t.bindFramebuffer(n.FRAMEBUFFER,y),Ge(w)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,q,j,Ae.__webglTexture,0,Se(w)):(j===n.TEXTURE_2D||j>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,q,j,Ae.__webglTexture,J),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ie(y,w,P){if(n.bindRenderbuffer(n.RENDERBUFFER,y),w.depthBuffer){const q=w.depthTexture,j=q&&q.isDepthTexture?q.type:null,J=B(w.stencilBuffer,j),ve=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ae=Se(w);Ge(w)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ae,J,w.width,w.height):P?n.renderbufferStorageMultisample(n.RENDERBUFFER,ae,J,w.width,w.height):n.renderbufferStorage(n.RENDERBUFFER,J,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ve,n.RENDERBUFFER,y)}else{const q=w.textures;for(let j=0;j<q.length;j++){const J=q[j],ve=r.convert(J.format,J.colorSpace),ae=r.convert(J.type),pe=U(J.internalFormat,ve,ae,J.colorSpace),Ve=Se(w);P&&Ge(w)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ve,pe,w.width,w.height):Ge(w)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ve,pe,w.width,w.height):n.renderbufferStorage(n.RENDERBUFFER,pe,w.width,w.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function xe(y,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,y),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=A.get(w.depthTexture);q.__renderTarget=w,(!q.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),X(w.depthTexture,0);const j=q.__webglTexture,J=Se(w);if(w.depthTexture.format===fi)Ge(w)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,j,0,J):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,j,0);else if(w.depthTexture.format===vi)Ge(w)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,j,0,J):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function Te(y){const w=A.get(y),P=y.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==y.depthTexture){const q=y.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),q){const j=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,q.removeEventListener("dispose",j)};q.addEventListener("dispose",j),w.__depthDisposeCallback=j}w.__boundDepthTexture=q}if(y.depthTexture&&!w.__autoAllocateDepthBuffer){if(P)throw new Error("target.depthTexture not supported in Cube render targets");xe(w.__webglFramebuffer,y)}else if(P){w.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer[q]),w.__webglDepthbuffer[q]===void 0)w.__webglDepthbuffer[q]=n.createRenderbuffer(),ie(w.__webglDepthbuffer[q],y,!1);else{const j=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,J=w.__webglDepthbuffer[q];n.bindRenderbuffer(n.RENDERBUFFER,J),n.framebufferRenderbuffer(n.FRAMEBUFFER,j,n.RENDERBUFFER,J)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=n.createRenderbuffer(),ie(w.__webglDepthbuffer,y,!1);else{const q=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,j=w.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,j),n.framebufferRenderbuffer(n.FRAMEBUFFER,q,n.RENDERBUFFER,j)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Le(y,w,P){const q=A.get(y);w!==void 0&&de(q.__webglFramebuffer,y,y.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),P!==void 0&&Te(y)}function at(y){const w=y.texture,P=A.get(y),q=A.get(w);y.addEventListener("dispose",S);const j=y.textures,J=y.isWebGLCubeRenderTarget===!0,ve=j.length>1;if(ve||(q.__webglTexture===void 0&&(q.__webglTexture=n.createTexture()),q.__version=w.version,s.memory.textures++),J){P.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(w.mipmaps&&w.mipmaps.length>0){P.__webglFramebuffer[ae]=[];for(let pe=0;pe<w.mipmaps.length;pe++)P.__webglFramebuffer[ae][pe]=n.createFramebuffer()}else P.__webglFramebuffer[ae]=n.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){P.__webglFramebuffer=[];for(let ae=0;ae<w.mipmaps.length;ae++)P.__webglFramebuffer[ae]=n.createFramebuffer()}else P.__webglFramebuffer=n.createFramebuffer();if(ve)for(let ae=0,pe=j.length;ae<pe;ae++){const Ve=A.get(j[ae]);Ve.__webglTexture===void 0&&(Ve.__webglTexture=n.createTexture(),s.memory.textures++)}if(y.samples>0&&Ge(y)===!1){P.__webglMultisampledFramebuffer=n.createFramebuffer(),P.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,P.__webglMultisampledFramebuffer);for(let ae=0;ae<j.length;ae++){const pe=j[ae];P.__webglColorRenderbuffer[ae]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,P.__webglColorRenderbuffer[ae]);const Ve=r.convert(pe.format,pe.colorSpace),Ae=r.convert(pe.type),N=U(pe.internalFormat,Ve,Ae,pe.colorSpace,y.isXRRenderTarget===!0),$=Se(y);n.renderbufferStorageMultisample(n.RENDERBUFFER,$,N,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.RENDERBUFFER,P.__webglColorRenderbuffer[ae])}n.bindRenderbuffer(n.RENDERBUFFER,null),y.depthBuffer&&(P.__webglDepthRenderbuffer=n.createRenderbuffer(),ie(P.__webglDepthRenderbuffer,y,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(J){t.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture),Fe(n.TEXTURE_CUBE_MAP,w);for(let ae=0;ae<6;ae++)if(w.mipmaps&&w.mipmaps.length>0)for(let pe=0;pe<w.mipmaps.length;pe++)de(P.__webglFramebuffer[ae][pe],y,w,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,pe);else de(P.__webglFramebuffer[ae],y,w,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);d(w)&&h(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ve){for(let ae=0,pe=j.length;ae<pe;ae++){const Ve=j[ae],Ae=A.get(Ve);t.bindTexture(n.TEXTURE_2D,Ae.__webglTexture),Fe(n.TEXTURE_2D,Ve),de(P.__webglFramebuffer,y,Ve,n.COLOR_ATTACHMENT0+ae,n.TEXTURE_2D,0),d(Ve)&&h(n.TEXTURE_2D)}t.unbindTexture()}else{let ae=n.TEXTURE_2D;if((y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(ae=y.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ae,q.__webglTexture),Fe(ae,w),w.mipmaps&&w.mipmaps.length>0)for(let pe=0;pe<w.mipmaps.length;pe++)de(P.__webglFramebuffer[pe],y,w,n.COLOR_ATTACHMENT0,ae,pe);else de(P.__webglFramebuffer,y,w,n.COLOR_ATTACHMENT0,ae,0);d(w)&&h(ae),t.unbindTexture()}y.depthBuffer&&Te(y)}function Oe(y){const w=y.textures;for(let P=0,q=w.length;P<q;P++){const j=w[P];if(d(j)){const J=E(y),ve=A.get(j).__webglTexture;t.bindTexture(J,ve),h(J),t.unbindTexture()}}}const ot=[],T=[];function dt(y){if(y.samples>0){if(Ge(y)===!1){const w=y.textures,P=y.width,q=y.height;let j=n.COLOR_BUFFER_BIT;const J=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ve=A.get(y),ae=w.length>1;if(ae)for(let pe=0;pe<w.length;pe++)t.bindFramebuffer(n.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ve.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ve.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ve.__webglFramebuffer);for(let pe=0;pe<w.length;pe++){if(y.resolveDepthBuffer&&(y.depthBuffer&&(j|=n.DEPTH_BUFFER_BIT),y.stencilBuffer&&y.resolveStencilBuffer&&(j|=n.STENCIL_BUFFER_BIT)),ae){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ve.__webglColorRenderbuffer[pe]);const Ve=A.get(w[pe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ve,0)}n.blitFramebuffer(0,0,P,q,0,0,P,q,j,n.NEAREST),o===!0&&(ot.length=0,T.length=0,ot.push(n.COLOR_ATTACHMENT0+pe),y.depthBuffer&&y.resolveDepthBuffer===!1&&(ot.push(J),T.push(J),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,T)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ot))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ae)for(let pe=0;pe<w.length;pe++){t.bindFramebuffer(n.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.RENDERBUFFER,ve.__webglColorRenderbuffer[pe]);const Ve=A.get(w[pe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ve.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.TEXTURE_2D,Ve,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ve.__webglMultisampledFramebuffer)}else if(y.depthBuffer&&y.resolveDepthBuffer===!1&&o){const w=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[w])}}}function Se(y){return Math.min(i.maxSamples,y.samples)}function Ge(y){const w=A.get(y);return y.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Ee(y){const w=s.render.frame;c.get(y)!==w&&(c.set(y,w),y.update())}function tt(y,w){const P=y.colorSpace,q=y.format,j=y.type;return y.isCompressedTexture===!0||y.isVideoTexture===!0||P!==Ci&&P!==en&&(Xe.getTransfer(P)===At?(q!==mA||j!==GA)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",P)),w}function Ce(y){return typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement?(l.width=y.naturalWidth||y.width,l.height=y.naturalHeight||y.height):typeof VideoFrame<"u"&&y instanceof VideoFrame?(l.width=y.displayWidth,l.height=y.displayHeight):(l.width=y.width,l.height=y.height),l}this.allocateTextureUnit=L,this.resetTextureUnits=H,this.setTexture2D=X,this.setTexture2DArray=K,this.setTexture3D=Y,this.setTextureCube=k,this.rebindTextures=Le,this.setupRenderTarget=at,this.updateRenderTargetMipmap=Oe,this.updateMultisampleRenderTarget=dt,this.setupDepthRenderbuffer=Te,this.setupFrameBufferTexture=de,this.useMultisampledRTT=Ge}function Bw(n,e){function t(A,i=en){let r;const s=Xe.getTransfer(i);if(A===GA)return n.UNSIGNED_BYTE;if(A===_l)return n.UNSIGNED_SHORT_4_4_4_4;if(A===vl)return n.UNSIGNED_SHORT_5_5_5_1;if(A===fh)return n.UNSIGNED_INT_5_9_9_9_REV;if(A===uh)return n.BYTE;if(A===hh)return n.SHORT;if(A===$i)return n.UNSIGNED_SHORT;if(A===wl)return n.INT;if(A===Qn)return n.UNSIGNED_INT;if(A===HA)return n.FLOAT;if(A===nr)return n.HALF_FLOAT;if(A===dh)return n.ALPHA;if(A===ph)return n.RGB;if(A===mA)return n.RGBA;if(A===gh)return n.LUMINANCE;if(A===mh)return n.LUMINANCE_ALPHA;if(A===fi)return n.DEPTH_COMPONENT;if(A===vi)return n.DEPTH_STENCIL;if(A===Bh)return n.RED;if(A===Cl)return n.RED_INTEGER;if(A===wh)return n.RG;if(A===El)return n.RG_INTEGER;if(A===xl)return n.RGBA_INTEGER;if(A===fs||A===ds||A===ps||A===gs)if(s===At)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(A===fs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(A===ds)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(A===ps)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(A===gs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(A===fs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(A===ds)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(A===ps)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(A===gs)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(A===wo||A===_o||A===vo||A===Co)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(A===wo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(A===_o)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(A===vo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(A===Co)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(A===Eo||A===xo||A===Uo)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(A===Eo||A===xo)return s===At?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(A===Uo)return s===At?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(A===yo||A===So||A===Mo||A===Fo||A===bo||A===To||A===Qo||A===Io||A===Ro||A===Lo||A===Do||A===Ho||A===Po||A===No)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(A===yo)return s===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(A===So)return s===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(A===Mo)return s===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(A===Fo)return s===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(A===bo)return s===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(A===To)return s===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(A===Qo)return s===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(A===Io)return s===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(A===Ro)return s===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(A===Lo)return s===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(A===Do)return s===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(A===Ho)return s===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(A===Po)return s===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(A===No)return s===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(A===ms||A===Oo||A===Go)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(A===ms)return s===At?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(A===Oo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(A===Go)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(A===_h||A===Vo||A===ko||A===Ko)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(A===ms)return r.COMPRESSED_RED_RGTC1_EXT;if(A===Vo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(A===ko)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(A===Ko)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return A===_i?n.UNSIGNED_INT_24_8:n[A]!==void 0?n[A]:null}return{convert:t}}const ww={type:"move"};class Qa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Qr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Qr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Qr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Q),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const A of e.hand.values())this._getHandJoint(t,A)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,A){let i=null,r=null,s=null;const a=this._targetRay,o=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){s=!0;for(const m of e.hand.values()){const d=t.getJointPose(m,A),h=this._getHandJoint(l,m);d!==null&&(h.matrix.fromArray(d.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=d.radius),h.visible=d!==null}const c=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=c.position.distanceTo(u.position),p=.02,g=.005;l.inputState.pinching&&f>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else o!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,A),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,A),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(ww)))}return a!==null&&(a.visible=i!==null),o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const A=new Qr;A.matrixAutoUpdate=!1,A.visible=!1,e.joints[t.jointName]=A,e.add(A)}return e.joints[t.jointName]}}const _w=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,vw=`
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

}`;class Cw{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,A){if(this.texture===null){const i=new Wt,r=e.properties.get(i);r.__webglTexture=t.texture,(t.depthNear!==A.depthNear||t.depthFar!==A.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,A=new cn({vertexShader:_w,fragmentShader:vw,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new jt(new ar(20,20),A)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Ew extends Dn{constructor(e,t){super();const A=this;let i=null,r=1,s=null,a="local-floor",o=1,l=null,c=null,u=null,f=null,p=null,g=null;const m=new Cw,d=t.getContextAttributes();let h=null,E=null;const U=[],B=[],M=new Pe;let x=null;const S=new rA;S.viewport=new mt;const F=new rA;F.viewport=new mt;const _=[S,F],v=new Vp;let b=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let ee=U[W];return ee===void 0&&(ee=new Qa,U[W]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(W){let ee=U[W];return ee===void 0&&(ee=new Qa,U[W]=ee),ee.getGripSpace()},this.getHand=function(W){let ee=U[W];return ee===void 0&&(ee=new Qa,U[W]=ee),ee.getHandSpace()};function L(W){const ee=B.indexOf(W.inputSource);if(ee===-1)return;const de=U[ee];de!==void 0&&(de.update(W.inputSource,W.frame,l||s),de.dispatchEvent({type:W.type,data:W.inputSource}))}function G(){i.removeEventListener("select",L),i.removeEventListener("selectstart",L),i.removeEventListener("selectend",L),i.removeEventListener("squeeze",L),i.removeEventListener("squeezestart",L),i.removeEventListener("squeezeend",L),i.removeEventListener("end",G),i.removeEventListener("inputsourceschange",X);for(let W=0;W<U.length;W++){const ee=B[W];ee!==null&&(B[W]=null,U[W].disconnect(ee))}b=null,H=null,m.reset(),e.setRenderTarget(h),p=null,f=null,u=null,i=null,E=null,Re.stop(),A.isPresenting=!1,e.setPixelRatio(x),e.setSize(M.width,M.height,!1),A.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){r=W,A.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){a=W,A.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||s},this.setReferenceSpace=function(W){l=W},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(W){if(i=W,i!==null){if(h=e.getRenderTarget(),i.addEventListener("select",L),i.addEventListener("selectstart",L),i.addEventListener("selectend",L),i.addEventListener("squeeze",L),i.addEventListener("squeezestart",L),i.addEventListener("squeezeend",L),i.addEventListener("end",G),i.addEventListener("inputsourceschange",X),d.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(M),i.enabledFeatures!==void 0&&i.enabledFeatures.includes("layers")){let de=null,ie=null,xe=null;d.depth&&(xe=d.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,de=d.stencil?vi:fi,ie=d.stencil?_i:Qn);const Te={colorFormat:t.RGBA8,depthFormat:xe,scaleFactor:r};u=new XRWebGLBinding(i,t),f=u.createProjectionLayer(Te),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),E=new In(f.textureWidth,f.textureHeight,{format:mA,type:GA,depthTexture:new Qh(f.textureWidth,f.textureHeight,ie,void 0,void 0,void 0,void 0,void 0,void 0,de),stencilBuffer:d.stencil,colorSpace:e.outputColorSpace,samples:d.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}else{const de={antialias:d.antialias,alpha:!0,depth:d.depth,stencil:d.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(i,t,de),i.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),E=new In(p.framebufferWidth,p.framebufferHeight,{format:mA,type:GA,colorSpace:e.outputColorSpace,stencilBuffer:d.stencil})}E.isXRRenderTarget=!0,this.setFoveation(o),l=null,s=await i.requestReferenceSpace(a),Re.setContext(i),Re.start(),A.isPresenting=!0,A.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function X(W){for(let ee=0;ee<W.removed.length;ee++){const de=W.removed[ee],ie=B.indexOf(de);ie>=0&&(B[ie]=null,U[ie].disconnect(de))}for(let ee=0;ee<W.added.length;ee++){const de=W.added[ee];let ie=B.indexOf(de);if(ie===-1){for(let Te=0;Te<U.length;Te++)if(Te>=B.length){B.push(de),ie=Te;break}else if(B[Te]===null){B[Te]=de,ie=Te;break}if(ie===-1)break}const xe=U[ie];xe&&xe.connect(de)}}const K=new Q,Y=new Q;function k(W,ee,de){K.setFromMatrixPosition(ee.matrixWorld),Y.setFromMatrixPosition(de.matrixWorld);const ie=K.distanceTo(Y),xe=ee.projectionMatrix.elements,Te=de.projectionMatrix.elements,Le=xe[14]/(xe[10]-1),at=xe[14]/(xe[10]+1),Oe=(xe[9]+1)/xe[5],ot=(xe[9]-1)/xe[5],T=(xe[8]-1)/xe[0],dt=(Te[8]+1)/Te[0],Se=Le*T,Ge=Le*dt,Ee=ie/(-T+dt),tt=Ee*-T;if(ee.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(tt),W.translateZ(Ee),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),xe[10]===-1)W.projectionMatrix.copy(ee.projectionMatrix),W.projectionMatrixInverse.copy(ee.projectionMatrixInverse);else{const Ce=Le+Ee,y=at+Ee,w=Se-tt,P=Ge+(ie-tt),q=Oe*at/y*Ce,j=ot*at/y*Ce;W.projectionMatrix.makePerspective(w,P,q,j,Ce,y),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function ne(W,ee){ee===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(ee.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(i===null)return;let ee=W.near,de=W.far;m.texture!==null&&(m.depthNear>0&&(ee=m.depthNear),m.depthFar>0&&(de=m.depthFar)),v.near=F.near=S.near=ee,v.far=F.far=S.far=de,(b!==v.near||H!==v.far)&&(i.updateRenderState({depthNear:v.near,depthFar:v.far}),b=v.near,H=v.far),S.layers.mask=W.layers.mask|2,F.layers.mask=W.layers.mask|4,v.layers.mask=S.layers.mask|F.layers.mask;const ie=W.parent,xe=v.cameras;ne(v,ie);for(let Te=0;Te<xe.length;Te++)ne(xe[Te],ie);xe.length===2?k(v,S,F):v.projectionMatrix.copy(S.projectionMatrix),oe(W,v,ie)};function oe(W,ee,de){de===null?W.matrix.copy(ee.matrixWorld):(W.matrix.copy(de.matrixWorld),W.matrix.invert(),W.matrix.multiply(ee.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(ee.projectionMatrix),W.projectionMatrixInverse.copy(ee.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=zo*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(f===null&&p===null))return o},this.setFoveation=function(W){o=W,f!==null&&(f.fixedFoveation=W),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=W)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(v)};let Be=null;function Fe(W,ee){if(c=ee.getViewerPose(l||s),g=ee,c!==null){const de=c.views;p!==null&&(e.setRenderTargetFramebuffer(E,p.framebuffer),e.setRenderTarget(E));let ie=!1;de.length!==v.cameras.length&&(v.cameras.length=0,ie=!0);for(let Te=0;Te<de.length;Te++){const Le=de[Te];let at=null;if(p!==null)at=p.getViewport(Le);else{const ot=u.getViewSubImage(f,Le);at=ot.viewport,Te===0&&(e.setRenderTargetTextures(E,ot.colorTexture,f.ignoreDepthValues?void 0:ot.depthStencilTexture),e.setRenderTarget(E))}let Oe=_[Te];Oe===void 0&&(Oe=new rA,Oe.layers.enable(Te),Oe.viewport=new mt,_[Te]=Oe),Oe.matrix.fromArray(Le.transform.matrix),Oe.matrix.decompose(Oe.position,Oe.quaternion,Oe.scale),Oe.projectionMatrix.fromArray(Le.projectionMatrix),Oe.projectionMatrixInverse.copy(Oe.projectionMatrix).invert(),Oe.viewport.set(at.x,at.y,at.width,at.height),Te===0&&(v.matrix.copy(Oe.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),ie===!0&&v.cameras.push(Oe)}const xe=i.enabledFeatures;if(xe&&xe.includes("depth-sensing")){const Te=u.getDepthInformation(de[0]);Te&&Te.isValid&&Te.texture&&m.init(e,Te,i.renderState)}}for(let de=0;de<U.length;de++){const ie=B[de],xe=U[de];ie!==null&&xe!==void 0&&xe.update(ie,ee,l||s)}Be&&Be(W,ee),ee.detectedPlanes&&A.dispatchEvent({type:"planesdetected",data:ee}),g=null}const Re=new Ih;Re.setAnimationLoop(Fe),this.setAnimationLoop=function(W){Be=W},this.dispose=function(){}}}const wn=new VA,xw=new ut;function Uw(n,e){function t(d,h){d.matrixAutoUpdate===!0&&d.updateMatrix(),h.value.copy(d.matrix)}function A(d,h){h.color.getRGB(d.fogColor.value,Mh(n)),h.isFog?(d.fogNear.value=h.near,d.fogFar.value=h.far):h.isFogExp2&&(d.fogDensity.value=h.density)}function i(d,h,E,U,B){h.isMeshBasicMaterial||h.isMeshLambertMaterial?r(d,h):h.isMeshToonMaterial?(r(d,h),u(d,h)):h.isMeshPhongMaterial?(r(d,h),c(d,h)):h.isMeshStandardMaterial?(r(d,h),f(d,h),h.isMeshPhysicalMaterial&&p(d,h,B)):h.isMeshMatcapMaterial?(r(d,h),g(d,h)):h.isMeshDepthMaterial?r(d,h):h.isMeshDistanceMaterial?(r(d,h),m(d,h)):h.isMeshNormalMaterial?r(d,h):h.isLineBasicMaterial?(s(d,h),h.isLineDashedMaterial&&a(d,h)):h.isPointsMaterial?o(d,h,E,U):h.isSpriteMaterial?l(d,h):h.isShadowMaterial?(d.color.value.copy(h.color),d.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function r(d,h){d.opacity.value=h.opacity,h.color&&d.diffuse.value.copy(h.color),h.emissive&&d.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(d.map.value=h.map,t(h.map,d.mapTransform)),h.alphaMap&&(d.alphaMap.value=h.alphaMap,t(h.alphaMap,d.alphaMapTransform)),h.bumpMap&&(d.bumpMap.value=h.bumpMap,t(h.bumpMap,d.bumpMapTransform),d.bumpScale.value=h.bumpScale,h.side===zt&&(d.bumpScale.value*=-1)),h.normalMap&&(d.normalMap.value=h.normalMap,t(h.normalMap,d.normalMapTransform),d.normalScale.value.copy(h.normalScale),h.side===zt&&d.normalScale.value.negate()),h.displacementMap&&(d.displacementMap.value=h.displacementMap,t(h.displacementMap,d.displacementMapTransform),d.displacementScale.value=h.displacementScale,d.displacementBias.value=h.displacementBias),h.emissiveMap&&(d.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,d.emissiveMapTransform)),h.specularMap&&(d.specularMap.value=h.specularMap,t(h.specularMap,d.specularMapTransform)),h.alphaTest>0&&(d.alphaTest.value=h.alphaTest);const E=e.get(h),U=E.envMap,B=E.envMapRotation;U&&(d.envMap.value=U,wn.copy(B),wn.x*=-1,wn.y*=-1,wn.z*=-1,U.isCubeTexture&&U.isRenderTargetTexture===!1&&(wn.y*=-1,wn.z*=-1),d.envMapRotation.value.setFromMatrix4(xw.makeRotationFromEuler(wn)),d.flipEnvMap.value=U.isCubeTexture&&U.isRenderTargetTexture===!1?-1:1,d.reflectivity.value=h.reflectivity,d.ior.value=h.ior,d.refractionRatio.value=h.refractionRatio),h.lightMap&&(d.lightMap.value=h.lightMap,d.lightMapIntensity.value=h.lightMapIntensity,t(h.lightMap,d.lightMapTransform)),h.aoMap&&(d.aoMap.value=h.aoMap,d.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,d.aoMapTransform))}function s(d,h){d.diffuse.value.copy(h.color),d.opacity.value=h.opacity,h.map&&(d.map.value=h.map,t(h.map,d.mapTransform))}function a(d,h){d.dashSize.value=h.dashSize,d.totalSize.value=h.dashSize+h.gapSize,d.scale.value=h.scale}function o(d,h,E,U){d.diffuse.value.copy(h.color),d.opacity.value=h.opacity,d.size.value=h.size*E,d.scale.value=U*.5,h.map&&(d.map.value=h.map,t(h.map,d.uvTransform)),h.alphaMap&&(d.alphaMap.value=h.alphaMap,t(h.alphaMap,d.alphaMapTransform)),h.alphaTest>0&&(d.alphaTest.value=h.alphaTest)}function l(d,h){d.diffuse.value.copy(h.color),d.opacity.value=h.opacity,d.rotation.value=h.rotation,h.map&&(d.map.value=h.map,t(h.map,d.mapTransform)),h.alphaMap&&(d.alphaMap.value=h.alphaMap,t(h.alphaMap,d.alphaMapTransform)),h.alphaTest>0&&(d.alphaTest.value=h.alphaTest)}function c(d,h){d.specular.value.copy(h.specular),d.shininess.value=Math.max(h.shininess,1e-4)}function u(d,h){h.gradientMap&&(d.gradientMap.value=h.gradientMap)}function f(d,h){d.metalness.value=h.metalness,h.metalnessMap&&(d.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,d.metalnessMapTransform)),d.roughness.value=h.roughness,h.roughnessMap&&(d.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,d.roughnessMapTransform)),h.envMap&&(d.envMapIntensity.value=h.envMapIntensity)}function p(d,h,E){d.ior.value=h.ior,h.sheen>0&&(d.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),d.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(d.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,d.sheenColorMapTransform)),h.sheenRoughnessMap&&(d.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,d.sheenRoughnessMapTransform))),h.clearcoat>0&&(d.clearcoat.value=h.clearcoat,d.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(d.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,d.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(d.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,d.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(d.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,d.clearcoatNormalMapTransform),d.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===zt&&d.clearcoatNormalScale.value.negate())),h.dispersion>0&&(d.dispersion.value=h.dispersion),h.iridescence>0&&(d.iridescence.value=h.iridescence,d.iridescenceIOR.value=h.iridescenceIOR,d.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],d.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(d.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,d.iridescenceMapTransform)),h.iridescenceThicknessMap&&(d.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,d.iridescenceThicknessMapTransform))),h.transmission>0&&(d.transmission.value=h.transmission,d.transmissionSamplerMap.value=E.texture,d.transmissionSamplerSize.value.set(E.width,E.height),h.transmissionMap&&(d.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,d.transmissionMapTransform)),d.thickness.value=h.thickness,h.thicknessMap&&(d.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,d.thicknessMapTransform)),d.attenuationDistance.value=h.attenuationDistance,d.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(d.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(d.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,d.anisotropyMapTransform))),d.specularIntensity.value=h.specularIntensity,d.specularColor.value.copy(h.specularColor),h.specularColorMap&&(d.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,d.specularColorMapTransform)),h.specularIntensityMap&&(d.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,d.specularIntensityMapTransform))}function g(d,h){h.matcap&&(d.matcap.value=h.matcap)}function m(d,h){const E=e.get(h).light;d.referencePosition.value.setFromMatrixPosition(E.matrixWorld),d.nearDistance.value=E.shadow.camera.near,d.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:A,refreshMaterialUniforms:i}}function yw(n,e,t,A){let i={},r={},s=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function o(E,U){const B=U.program;A.uniformBlockBinding(E,B)}function l(E,U){let B=i[E.id];B===void 0&&(g(E),B=c(E),i[E.id]=B,E.addEventListener("dispose",d));const M=U.program;A.updateUBOMapping(E,M);const x=e.render.frame;r[E.id]!==x&&(f(E),r[E.id]=x)}function c(E){const U=u();E.__bindingPointIndex=U;const B=n.createBuffer(),M=E.__size,x=E.usage;return n.bindBuffer(n.UNIFORM_BUFFER,B),n.bufferData(n.UNIFORM_BUFFER,M,x),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,U,B),B}function u(){for(let E=0;E<a;E++)if(s.indexOf(E)===-1)return s.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(E){const U=i[E.id],B=E.uniforms,M=E.__cache;n.bindBuffer(n.UNIFORM_BUFFER,U);for(let x=0,S=B.length;x<S;x++){const F=Array.isArray(B[x])?B[x]:[B[x]];for(let _=0,v=F.length;_<v;_++){const b=F[_];if(p(b,x,_,M)===!0){const H=b.__offset,L=Array.isArray(b.value)?b.value:[b.value];let G=0;for(let X=0;X<L.length;X++){const K=L[X],Y=m(K);typeof K=="number"||typeof K=="boolean"?(b.__data[0]=K,n.bufferSubData(n.UNIFORM_BUFFER,H+G,b.__data)):K.isMatrix3?(b.__data[0]=K.elements[0],b.__data[1]=K.elements[1],b.__data[2]=K.elements[2],b.__data[3]=0,b.__data[4]=K.elements[3],b.__data[5]=K.elements[4],b.__data[6]=K.elements[5],b.__data[7]=0,b.__data[8]=K.elements[6],b.__data[9]=K.elements[7],b.__data[10]=K.elements[8],b.__data[11]=0):(K.toArray(b.__data,G),G+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,H,b.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(E,U,B,M){const x=E.value,S=U+"_"+B;if(M[S]===void 0)return typeof x=="number"||typeof x=="boolean"?M[S]=x:M[S]=x.clone(),!0;{const F=M[S];if(typeof x=="number"||typeof x=="boolean"){if(F!==x)return M[S]=x,!0}else if(F.equals(x)===!1)return F.copy(x),!0}return!1}function g(E){const U=E.uniforms;let B=0;const M=16;for(let S=0,F=U.length;S<F;S++){const _=Array.isArray(U[S])?U[S]:[U[S]];for(let v=0,b=_.length;v<b;v++){const H=_[v],L=Array.isArray(H.value)?H.value:[H.value];for(let G=0,X=L.length;G<X;G++){const K=L[G],Y=m(K),k=B%M,ne=k%Y.boundary,oe=k+ne;B+=ne,oe!==0&&M-oe<Y.storage&&(B+=M-oe),H.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=B,B+=Y.storage}}}const x=B%M;return x>0&&(B+=M-x),E.__size=B,E.__cache={},this}function m(E){const U={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(U.boundary=4,U.storage=4):E.isVector2?(U.boundary=8,U.storage=8):E.isVector3||E.isColor?(U.boundary=16,U.storage=12):E.isVector4?(U.boundary=16,U.storage=16):E.isMatrix3?(U.boundary=48,U.storage=48):E.isMatrix4?(U.boundary=64,U.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),U}function d(E){const U=E.target;U.removeEventListener("dispose",d);const B=s.indexOf(U.__bindingPointIndex);s.splice(B,1),n.deleteBuffer(i[U.id]),delete i[U.id],delete r[U.id]}function h(){for(const E in i)n.deleteBuffer(i[E]);s=[],i={},r={}}return{bind:o,update:l,dispose:h}}class Sw{constructor(e={}){const{canvas:t=sp(),context:A=null,depth:i=!0,stencil:r=!1,alpha:s=!1,antialias:a=!1,premultipliedAlpha:o=!0,preserveDrawingBuffer:l=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let p;if(A!==null){if(typeof WebGLRenderingContext<"u"&&A instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=A.getContextAttributes().alpha}else p=s;const g=new Uint32Array(4),m=new Int32Array(4);let d=null,h=null;const E=[],U=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=iA,this.toneMapping=sn,this.toneMappingExposure=1;const B=this;let M=!1,x=0,S=0,F=null,_=-1,v=null;const b=new mt,H=new mt;let L=null;const G=new Ye(0);let X=0,K=t.width,Y=t.height,k=1,ne=null,oe=null;const Be=new mt(0,0,K,Y),Fe=new mt(0,0,K,Y);let Re=!1;const W=new Th;let ee=!1,de=!1;this.transmissionResolutionScale=1;const ie=new ut,xe=new ut,Te=new Q,Le=new mt,at={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Oe=!1;function ot(){return F===null?k:1}let T=A;function dt(C,R){return t.getContext(C,R)}try{const C={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:o,preserveDrawingBuffer:l,powerPreference:c,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Bl}`),t.addEventListener("webglcontextlost",Z,!1),t.addEventListener("webglcontextrestored",re,!1),t.addEventListener("webglcontextcreationerror",ue,!1),T===null){const R="webgl2";if(T=dt(R,C),T===null)throw dt(R)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let Se,Ge,Ee,tt,Ce,y,w,P,q,j,J,ve,ae,pe,Ve,Ae,N,$,_e,se,Me,be,Je,I;function le(){Se=new DB(T),Se.init(),be=new Bw(T,Se),Ge=new bB(T,Se,e,be),Ee=new gw(T,Se),Ge.reverseDepthBuffer&&f&&Ee.buffers.depth.setReversed(!0),tt=new NB(T),Ce=new nw,y=new mw(T,Se,Ee,Ce,Ge,be,tt),w=new QB(B),P=new LB(B),q=new Wp(T),Je=new MB(T,q),j=new HB(T,q,tt,Je),J=new GB(T,j,q,tt),_e=new OB(T,Ge,y),Ae=new TB(Ce),ve=new Aw(B,w,P,Se,Ge,Je,Ae),ae=new Uw(B,Ce),pe=new rw,Ve=new uw(Se),$=new SB(B,w,P,Ee,J,p,o),N=new dw(B,J,Ge),I=new yw(T,tt,Ge,Ee),se=new FB(T,Se,tt),Me=new PB(T,Se,tt),tt.programs=ve.programs,B.capabilities=Ge,B.extensions=Se,B.properties=Ce,B.renderLists=pe,B.shadowMap=N,B.state=Ee,B.info=tt}le();const z=new Ew(B,T);this.xr=z,this.getContext=function(){return T},this.getContextAttributes=function(){return T.getContextAttributes()},this.forceContextLoss=function(){const C=Se.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=Se.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(C){C!==void 0&&(k=C,this.setSize(K,Y,!1))},this.getSize=function(C){return C.set(K,Y)},this.setSize=function(C,R,O=!0){if(z.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}K=C,Y=R,t.width=Math.floor(C*k),t.height=Math.floor(R*k),O===!0&&(t.style.width=C+"px",t.style.height=R+"px"),this.setViewport(0,0,C,R)},this.getDrawingBufferSize=function(C){return C.set(K*k,Y*k).floor()},this.setDrawingBufferSize=function(C,R,O){K=C,Y=R,k=O,t.width=Math.floor(C*O),t.height=Math.floor(R*O),this.setViewport(0,0,C,R)},this.getCurrentViewport=function(C){return C.copy(b)},this.getViewport=function(C){return C.copy(Be)},this.setViewport=function(C,R,O,V){C.isVector4?Be.set(C.x,C.y,C.z,C.w):Be.set(C,R,O,V),Ee.viewport(b.copy(Be).multiplyScalar(k).round())},this.getScissor=function(C){return C.copy(Fe)},this.setScissor=function(C,R,O,V){C.isVector4?Fe.set(C.x,C.y,C.z,C.w):Fe.set(C,R,O,V),Ee.scissor(H.copy(Fe).multiplyScalar(k).round())},this.getScissorTest=function(){return Re},this.setScissorTest=function(C){Ee.setScissorTest(Re=C)},this.setOpaqueSort=function(C){ne=C},this.setTransparentSort=function(C){oe=C},this.getClearColor=function(C){return C.copy($.getClearColor())},this.setClearColor=function(){$.setClearColor.apply($,arguments)},this.getClearAlpha=function(){return $.getClearAlpha()},this.setClearAlpha=function(){$.setClearAlpha.apply($,arguments)},this.clear=function(C=!0,R=!0,O=!0){let V=0;if(C){let D=!1;if(F!==null){const te=F.texture.format;D=te===xl||te===El||te===Cl}if(D){const te=F.texture.type,he=te===GA||te===Qn||te===$i||te===_i||te===_l||te===vl,me=$.getClearColor(),we=$.getClearAlpha(),Qe=me.r,Ie=me.g,Ue=me.b;he?(g[0]=Qe,g[1]=Ie,g[2]=Ue,g[3]=we,T.clearBufferuiv(T.COLOR,0,g)):(m[0]=Qe,m[1]=Ie,m[2]=Ue,m[3]=we,T.clearBufferiv(T.COLOR,0,m))}else V|=T.COLOR_BUFFER_BIT}R&&(V|=T.DEPTH_BUFFER_BIT),O&&(V|=T.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),T.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Z,!1),t.removeEventListener("webglcontextrestored",re,!1),t.removeEventListener("webglcontextcreationerror",ue,!1),$.dispose(),pe.dispose(),Ve.dispose(),Ce.dispose(),w.dispose(),P.dispose(),J.dispose(),Je.dispose(),I.dispose(),ve.dispose(),z.dispose(),z.removeEventListener("sessionstart",Pl),z.removeEventListener("sessionend",Nl),hn.stop()};function Z(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function re(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const C=tt.autoReset,R=N.enabled,O=N.autoUpdate,V=N.needsUpdate,D=N.type;le(),tt.autoReset=C,N.enabled=R,N.autoUpdate=O,N.needsUpdate=V,N.type=D}function ue(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function De(C){const R=C.target;R.removeEventListener("dispose",De),ht(R)}function ht(C){It(C),Ce.remove(C)}function It(C){const R=Ce.get(C).programs;R!==void 0&&(R.forEach(function(O){ve.releaseProgram(O)}),C.isShaderMaterial&&ve.releaseShaderCache(C))}this.renderBufferDirect=function(C,R,O,V,D,te){R===null&&(R=at);const he=D.isMesh&&D.matrixWorld.determinant()<0,me=kf(C,R,O,V,D);Ee.setMaterial(V,he);let we=O.index,Qe=1;if(V.wireframe===!0){if(we=j.getWireframeAttribute(O),we===void 0)return;Qe=2}const Ie=O.drawRange,Ue=O.attributes.position;let ze=Ie.start*Qe,qe=(Ie.start+Ie.count)*Qe;te!==null&&(ze=Math.max(ze,te.start*Qe),qe=Math.min(qe,(te.start+te.count)*Qe)),we!==null?(ze=Math.max(ze,0),qe=Math.min(qe,we.count)):Ue!=null&&(ze=Math.max(ze,0),qe=Math.min(qe,Ue.count));const Bt=qe-ze;if(Bt<0||Bt===1/0)return;Je.setup(D,V,me,O,we);let ft,We=se;if(we!==null&&(ft=q.get(we),We=Me,We.setIndex(ft)),D.isMesh)V.wireframe===!0?(Ee.setLineWidth(V.wireframeLinewidth*ot()),We.setMode(T.LINES)):We.setMode(T.TRIANGLES);else if(D.isLine){let ye=V.linewidth;ye===void 0&&(ye=1),Ee.setLineWidth(ye*ot()),D.isLineSegments?We.setMode(T.LINES):D.isLineLoop?We.setMode(T.LINE_LOOP):We.setMode(T.LINE_STRIP)}else D.isPoints?We.setMode(T.POINTS):D.isSprite&&We.setMode(T.TRIANGLES);if(D.isBatchedMesh)if(D._multiDrawInstances!==null)We.renderMultiDrawInstances(D._multiDrawStarts,D._multiDrawCounts,D._multiDrawCount,D._multiDrawInstances);else if(Se.get("WEBGL_multi_draw"))We.renderMultiDraw(D._multiDrawStarts,D._multiDrawCounts,D._multiDrawCount);else{const ye=D._multiDrawStarts,Mt=D._multiDrawCounts,Ze=D._multiDrawCount,uA=we?q.get(we).bytesPerElement:1,Hn=Ce.get(V).currentProgram.getUniforms();for(let Yt=0;Yt<Ze;Yt++)Hn.setValue(T,"_gl_DrawID",Yt),We.render(ye[Yt]/uA,Mt[Yt])}else if(D.isInstancedMesh)We.renderInstances(ze,Bt,D.count);else if(O.isInstancedBufferGeometry){const ye=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,Mt=Math.min(O.instanceCount,ye);We.renderInstances(ze,Bt,Mt)}else We.render(ze,Bt)};function $e(C,R,O){C.transparent===!0&&C.side===gA&&C.forceSinglePass===!1?(C.side=zt,C.needsUpdate=!0,ur(C,R,O),C.side=ln,C.needsUpdate=!0,ur(C,R,O),C.side=gA):ur(C,R,O)}this.compile=function(C,R,O=null){O===null&&(O=C),h=Ve.get(O),h.init(R),U.push(h),O.traverseVisible(function(D){D.isLight&&D.layers.test(R.layers)&&(h.pushLight(D),D.castShadow&&h.pushShadow(D))}),C!==O&&C.traverseVisible(function(D){D.isLight&&D.layers.test(R.layers)&&(h.pushLight(D),D.castShadow&&h.pushShadow(D))}),h.setupLights();const V=new Set;return C.traverse(function(D){if(!(D.isMesh||D.isPoints||D.isLine||D.isSprite))return;const te=D.material;if(te)if(Array.isArray(te))for(let he=0;he<te.length;he++){const me=te[he];$e(me,O,D),V.add(me)}else $e(te,O,D),V.add(te)}),U.pop(),h=null,V},this.compileAsync=function(C,R,O=null){const V=this.compile(C,R,O);return new Promise(D=>{function te(){if(V.forEach(function(he){Ce.get(he).currentProgram.isReady()&&V.delete(he)}),V.size===0){D(C);return}setTimeout(te,10)}Se.get("KHR_parallel_shader_compile")!==null?te():setTimeout(te,10)})};let cA=null;function MA(C){cA&&cA(C)}function Pl(){hn.stop()}function Nl(){hn.start()}const hn=new Ih;hn.setAnimationLoop(MA),typeof self<"u"&&hn.setContext(self),this.setAnimationLoop=function(C){cA=C,z.setAnimationLoop(C),C===null?hn.stop():hn.start()},z.addEventListener("sessionstart",Pl),z.addEventListener("sessionend",Nl),this.render=function(C,R){if(R!==void 0&&R.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),R.parent===null&&R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),z.enabled===!0&&z.isPresenting===!0&&(z.cameraAutoUpdate===!0&&z.updateCamera(R),R=z.getCamera()),C.isScene===!0&&C.onBeforeRender(B,C,R,F),h=Ve.get(C,U.length),h.init(R),U.push(h),xe.multiplyMatrices(R.projectionMatrix,R.matrixWorldInverse),W.setFromProjectionMatrix(xe),de=this.localClippingEnabled,ee=Ae.init(this.clippingPlanes,de),d=pe.get(C,E.length),d.init(),E.push(d),z.enabled===!0&&z.isPresenting===!0){const te=B.xr.getDepthSensingMesh();te!==null&&$s(te,R,-1/0,B.sortObjects)}$s(C,R,0,B.sortObjects),d.finish(),B.sortObjects===!0&&d.sort(ne,oe),Oe=z.enabled===!1||z.isPresenting===!1||z.hasDepthSensing()===!1,Oe&&$.addToRenderList(d,C),this.info.render.frame++,ee===!0&&Ae.beginShadows();const O=h.state.shadowsArray;N.render(O,C,R),ee===!0&&Ae.endShadows(),this.info.autoReset===!0&&this.info.reset();const V=d.opaque,D=d.transmissive;if(h.setupLights(),R.isArrayCamera){const te=R.cameras;if(D.length>0)for(let he=0,me=te.length;he<me;he++){const we=te[he];Gl(V,D,C,we)}Oe&&$.render(C);for(let he=0,me=te.length;he<me;he++){const we=te[he];Ol(d,C,we,we.viewport)}}else D.length>0&&Gl(V,D,C,R),Oe&&$.render(C),Ol(d,C,R);F!==null&&S===0&&(y.updateMultisampleRenderTarget(F),y.updateRenderTargetMipmap(F)),C.isScene===!0&&C.onAfterRender(B,C,R),Je.resetDefaultState(),_=-1,v=null,U.pop(),U.length>0?(h=U[U.length-1],ee===!0&&Ae.setGlobalState(B.clippingPlanes,h.state.camera)):h=null,E.pop(),E.length>0?d=E[E.length-1]:d=null};function $s(C,R,O,V){if(C.visible===!1)return;if(C.layers.test(R.layers)){if(C.isGroup)O=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(R);else if(C.isLight)h.pushLight(C),C.castShadow&&h.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||W.intersectsSprite(C)){V&&Le.setFromMatrixPosition(C.matrixWorld).applyMatrix4(xe);const he=J.update(C),me=C.material;me.visible&&d.push(C,he,me,O,Le.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||W.intersectsObject(C))){const he=J.update(C),me=C.material;if(V&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Le.copy(C.boundingSphere.center)):(he.boundingSphere===null&&he.computeBoundingSphere(),Le.copy(he.boundingSphere.center)),Le.applyMatrix4(C.matrixWorld).applyMatrix4(xe)),Array.isArray(me)){const we=he.groups;for(let Qe=0,Ie=we.length;Qe<Ie;Qe++){const Ue=we[Qe],ze=me[Ue.materialIndex];ze&&ze.visible&&d.push(C,he,ze,O,Le.z,Ue)}}else me.visible&&d.push(C,he,me,O,Le.z,null)}}const te=C.children;for(let he=0,me=te.length;he<me;he++)$s(te[he],R,O,V)}function Ol(C,R,O,V){const D=C.opaque,te=C.transmissive,he=C.transparent;h.setupLightsView(O),ee===!0&&Ae.setGlobalState(B.clippingPlanes,O),V&&Ee.viewport(b.copy(V)),D.length>0&&cr(D,R,O),te.length>0&&cr(te,R,O),he.length>0&&cr(he,R,O),Ee.buffers.depth.setTest(!0),Ee.buffers.depth.setMask(!0),Ee.buffers.color.setMask(!0),Ee.setPolygonOffset(!1)}function Gl(C,R,O,V){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;h.state.transmissionRenderTarget[V.id]===void 0&&(h.state.transmissionRenderTarget[V.id]=new In(1,1,{generateMipmaps:!0,type:Se.has("EXT_color_buffer_half_float")||Se.has("EXT_color_buffer_float")?nr:GA,minFilter:Mn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Xe.workingColorSpace}));const te=h.state.transmissionRenderTarget[V.id],he=V.viewport||b;te.setSize(he.z*B.transmissionResolutionScale,he.w*B.transmissionResolutionScale);const me=B.getRenderTarget();B.setRenderTarget(te),B.getClearColor(G),X=B.getClearAlpha(),X<1&&B.setClearColor(16777215,.5),B.clear(),Oe&&$.render(O);const we=B.toneMapping;B.toneMapping=sn;const Qe=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),h.setupLightsView(V),ee===!0&&Ae.setGlobalState(B.clippingPlanes,V),cr(C,O,V),y.updateMultisampleRenderTarget(te),y.updateRenderTargetMipmap(te),Se.has("WEBGL_multisampled_render_to_texture")===!1){let Ie=!1;for(let Ue=0,ze=R.length;Ue<ze;Ue++){const qe=R[Ue],Bt=qe.object,ft=qe.geometry,We=qe.material,ye=qe.group;if(We.side===gA&&Bt.layers.test(V.layers)){const Mt=We.side;We.side=zt,We.needsUpdate=!0,Vl(Bt,O,V,ft,We,ye),We.side=Mt,We.needsUpdate=!0,Ie=!0}}Ie===!0&&(y.updateMultisampleRenderTarget(te),y.updateRenderTargetMipmap(te))}B.setRenderTarget(me),B.setClearColor(G,X),Qe!==void 0&&(V.viewport=Qe),B.toneMapping=we}function cr(C,R,O){const V=R.isScene===!0?R.overrideMaterial:null;for(let D=0,te=C.length;D<te;D++){const he=C[D],me=he.object,we=he.geometry,Qe=V===null?he.material:V,Ie=he.group;me.layers.test(O.layers)&&Vl(me,R,O,we,Qe,Ie)}}function Vl(C,R,O,V,D,te){C.onBeforeRender(B,R,O,V,D,te),C.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),D.onBeforeRender(B,R,O,V,C,te),D.transparent===!0&&D.side===gA&&D.forceSinglePass===!1?(D.side=zt,D.needsUpdate=!0,B.renderBufferDirect(O,R,V,D,C,te),D.side=ln,D.needsUpdate=!0,B.renderBufferDirect(O,R,V,D,C,te),D.side=gA):B.renderBufferDirect(O,R,V,D,C,te),C.onAfterRender(B,R,O,V,D,te)}function ur(C,R,O){R.isScene!==!0&&(R=at);const V=Ce.get(C),D=h.state.lights,te=h.state.shadowsArray,he=D.state.version,me=ve.getParameters(C,D.state,te,R,O),we=ve.getProgramCacheKey(me);let Qe=V.programs;V.environment=C.isMeshStandardMaterial?R.environment:null,V.fog=R.fog,V.envMap=(C.isMeshStandardMaterial?P:w).get(C.envMap||V.environment),V.envMapRotation=V.environment!==null&&C.envMap===null?R.environmentRotation:C.envMapRotation,Qe===void 0&&(C.addEventListener("dispose",De),Qe=new Map,V.programs=Qe);let Ie=Qe.get(we);if(Ie!==void 0){if(V.currentProgram===Ie&&V.lightsStateVersion===he)return Kl(C,me),Ie}else me.uniforms=ve.getUniforms(C),C.onBeforeCompile(me,B),Ie=ve.acquireProgram(me,we),Qe.set(we,Ie),V.uniforms=me.uniforms;const Ue=V.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Ue.clippingPlanes=Ae.uniform),Kl(C,me),V.needsLights=zf(C),V.lightsStateVersion=he,V.needsLights&&(Ue.ambientLightColor.value=D.state.ambient,Ue.lightProbe.value=D.state.probe,Ue.directionalLights.value=D.state.directional,Ue.directionalLightShadows.value=D.state.directionalShadow,Ue.spotLights.value=D.state.spot,Ue.spotLightShadows.value=D.state.spotShadow,Ue.rectAreaLights.value=D.state.rectArea,Ue.ltc_1.value=D.state.rectAreaLTC1,Ue.ltc_2.value=D.state.rectAreaLTC2,Ue.pointLights.value=D.state.point,Ue.pointLightShadows.value=D.state.pointShadow,Ue.hemisphereLights.value=D.state.hemi,Ue.directionalShadowMap.value=D.state.directionalShadowMap,Ue.directionalShadowMatrix.value=D.state.directionalShadowMatrix,Ue.spotShadowMap.value=D.state.spotShadowMap,Ue.spotLightMatrix.value=D.state.spotLightMatrix,Ue.spotLightMap.value=D.state.spotLightMap,Ue.pointShadowMap.value=D.state.pointShadowMap,Ue.pointShadowMatrix.value=D.state.pointShadowMatrix),V.currentProgram=Ie,V.uniformsList=null,Ie}function kl(C){if(C.uniformsList===null){const R=C.currentProgram.getUniforms();C.uniformsList=Bs.seqWithValue(R.seq,C.uniforms)}return C.uniformsList}function Kl(C,R){const O=Ce.get(C);O.outputColorSpace=R.outputColorSpace,O.batching=R.batching,O.batchingColor=R.batchingColor,O.instancing=R.instancing,O.instancingColor=R.instancingColor,O.instancingMorph=R.instancingMorph,O.skinning=R.skinning,O.morphTargets=R.morphTargets,O.morphNormals=R.morphNormals,O.morphColors=R.morphColors,O.morphTargetsCount=R.morphTargetsCount,O.numClippingPlanes=R.numClippingPlanes,O.numIntersection=R.numClipIntersection,O.vertexAlphas=R.vertexAlphas,O.vertexTangents=R.vertexTangents,O.toneMapping=R.toneMapping}function kf(C,R,O,V,D){R.isScene!==!0&&(R=at),y.resetTextureUnits();const te=R.fog,he=V.isMeshStandardMaterial?R.environment:null,me=F===null?B.outputColorSpace:F.isXRRenderTarget===!0?F.texture.colorSpace:Ci,we=(V.isMeshStandardMaterial?P:w).get(V.envMap||he),Qe=V.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,Ie=!!O.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Ue=!!O.morphAttributes.position,ze=!!O.morphAttributes.normal,qe=!!O.morphAttributes.color;let Bt=sn;V.toneMapped&&(F===null||F.isXRRenderTarget===!0)&&(Bt=B.toneMapping);const ft=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,We=ft!==void 0?ft.length:0,ye=Ce.get(V),Mt=h.state.lights;if(ee===!0&&(de===!0||C!==v)){const Pt=C===v&&V.id===_;Ae.setState(V,C,Pt)}let Ze=!1;V.version===ye.__version?(ye.needsLights&&ye.lightsStateVersion!==Mt.state.version||ye.outputColorSpace!==me||D.isBatchedMesh&&ye.batching===!1||!D.isBatchedMesh&&ye.batching===!0||D.isBatchedMesh&&ye.batchingColor===!0&&D.colorTexture===null||D.isBatchedMesh&&ye.batchingColor===!1&&D.colorTexture!==null||D.isInstancedMesh&&ye.instancing===!1||!D.isInstancedMesh&&ye.instancing===!0||D.isSkinnedMesh&&ye.skinning===!1||!D.isSkinnedMesh&&ye.skinning===!0||D.isInstancedMesh&&ye.instancingColor===!0&&D.instanceColor===null||D.isInstancedMesh&&ye.instancingColor===!1&&D.instanceColor!==null||D.isInstancedMesh&&ye.instancingMorph===!0&&D.morphTexture===null||D.isInstancedMesh&&ye.instancingMorph===!1&&D.morphTexture!==null||ye.envMap!==we||V.fog===!0&&ye.fog!==te||ye.numClippingPlanes!==void 0&&(ye.numClippingPlanes!==Ae.numPlanes||ye.numIntersection!==Ae.numIntersection)||ye.vertexAlphas!==Qe||ye.vertexTangents!==Ie||ye.morphTargets!==Ue||ye.morphNormals!==ze||ye.morphColors!==qe||ye.toneMapping!==Bt||ye.morphTargetsCount!==We)&&(Ze=!0):(Ze=!0,ye.__version=V.version);let uA=ye.currentProgram;Ze===!0&&(uA=ur(V,R,D));let Hn=!1,Yt=!1,Si=!1;const lt=uA.getUniforms(),eA=ye.uniforms;if(Ee.useProgram(uA.program)&&(Hn=!0,Yt=!0,Si=!0),V.id!==_&&(_=V.id,Yt=!0),Hn||v!==C){Ee.buffers.depth.getReversed()?(ie.copy(C.projectionMatrix),op(ie),lp(ie),lt.setValue(T,"projectionMatrix",ie)):lt.setValue(T,"projectionMatrix",C.projectionMatrix),lt.setValue(T,"viewMatrix",C.matrixWorldInverse);const Gt=lt.map.cameraPosition;Gt!==void 0&&Gt.setValue(T,Te.setFromMatrixPosition(C.matrixWorld)),Ge.logarithmicDepthBuffer&&lt.setValue(T,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&lt.setValue(T,"isOrthographic",C.isOrthographicCamera===!0),v!==C&&(v=C,Yt=!0,Si=!0)}if(D.isSkinnedMesh){lt.setOptional(T,D,"bindMatrix"),lt.setOptional(T,D,"bindMatrixInverse");const Pt=D.skeleton;Pt&&(Pt.boneTexture===null&&Pt.computeBoneTexture(),lt.setValue(T,"boneTexture",Pt.boneTexture,y))}D.isBatchedMesh&&(lt.setOptional(T,D,"batchingTexture"),lt.setValue(T,"batchingTexture",D._matricesTexture,y),lt.setOptional(T,D,"batchingIdTexture"),lt.setValue(T,"batchingIdTexture",D._indirectTexture,y),lt.setOptional(T,D,"batchingColorTexture"),D._colorsTexture!==null&&lt.setValue(T,"batchingColorTexture",D._colorsTexture,y));const tA=O.morphAttributes;if((tA.position!==void 0||tA.normal!==void 0||tA.color!==void 0)&&_e.update(D,O,uA),(Yt||ye.receiveShadow!==D.receiveShadow)&&(ye.receiveShadow=D.receiveShadow,lt.setValue(T,"receiveShadow",D.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(eA.envMap.value=we,eA.flipEnvMap.value=we.isCubeTexture&&we.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&R.environment!==null&&(eA.envMapIntensity.value=R.environmentIntensity),Yt&&(lt.setValue(T,"toneMappingExposure",B.toneMappingExposure),ye.needsLights&&Kf(eA,Si),te&&V.fog===!0&&ae.refreshFogUniforms(eA,te),ae.refreshMaterialUniforms(eA,V,k,Y,h.state.transmissionRenderTarget[C.id]),Bs.upload(T,kl(ye),eA,y)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Bs.upload(T,kl(ye),eA,y),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&lt.setValue(T,"center",D.center),lt.setValue(T,"modelViewMatrix",D.modelViewMatrix),lt.setValue(T,"normalMatrix",D.normalMatrix),lt.setValue(T,"modelMatrix",D.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const Pt=V.uniformsGroups;for(let Gt=0,ea=Pt.length;Gt<ea;Gt++){const fn=Pt[Gt];I.update(fn,uA),I.bind(fn,uA)}}return uA}function Kf(C,R){C.ambientLightColor.needsUpdate=R,C.lightProbe.needsUpdate=R,C.directionalLights.needsUpdate=R,C.directionalLightShadows.needsUpdate=R,C.pointLights.needsUpdate=R,C.pointLightShadows.needsUpdate=R,C.spotLights.needsUpdate=R,C.spotLightShadows.needsUpdate=R,C.rectAreaLights.needsUpdate=R,C.hemisphereLights.needsUpdate=R}function zf(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return x},this.getActiveMipmapLevel=function(){return S},this.getRenderTarget=function(){return F},this.setRenderTargetTextures=function(C,R,O){Ce.get(C.texture).__webglTexture=R,Ce.get(C.depthTexture).__webglTexture=O;const V=Ce.get(C);V.__hasExternalTextures=!0,V.__autoAllocateDepthBuffer=O===void 0,V.__autoAllocateDepthBuffer||Se.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),V.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(C,R){const O=Ce.get(C);O.__webglFramebuffer=R,O.__useDefaultFramebuffer=R===void 0};const Wf=T.createFramebuffer();this.setRenderTarget=function(C,R=0,O=0){F=C,x=R,S=O;let V=!0,D=null,te=!1,he=!1;if(C){const we=Ce.get(C);if(we.__useDefaultFramebuffer!==void 0)Ee.bindFramebuffer(T.FRAMEBUFFER,null),V=!1;else if(we.__webglFramebuffer===void 0)y.setupRenderTarget(C);else if(we.__hasExternalTextures)y.rebindTextures(C,Ce.get(C.texture).__webglTexture,Ce.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const Ue=C.depthTexture;if(we.__boundDepthTexture!==Ue){if(Ue!==null&&Ce.has(Ue)&&(C.width!==Ue.image.width||C.height!==Ue.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");y.setupDepthRenderbuffer(C)}}const Qe=C.texture;(Qe.isData3DTexture||Qe.isDataArrayTexture||Qe.isCompressedArrayTexture)&&(he=!0);const Ie=Ce.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Ie[R])?D=Ie[R][O]:D=Ie[R],te=!0):C.samples>0&&y.useMultisampledRTT(C)===!1?D=Ce.get(C).__webglMultisampledFramebuffer:Array.isArray(Ie)?D=Ie[O]:D=Ie,b.copy(C.viewport),H.copy(C.scissor),L=C.scissorTest}else b.copy(Be).multiplyScalar(k).floor(),H.copy(Fe).multiplyScalar(k).floor(),L=Re;if(O!==0&&(D=Wf),Ee.bindFramebuffer(T.FRAMEBUFFER,D)&&V&&Ee.drawBuffers(C,D),Ee.viewport(b),Ee.scissor(H),Ee.setScissorTest(L),te){const we=Ce.get(C.texture);T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_CUBE_MAP_POSITIVE_X+R,we.__webglTexture,O)}else if(he){const we=Ce.get(C.texture),Qe=R;T.framebufferTextureLayer(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,we.__webglTexture,O,Qe)}else if(C!==null&&O!==0){const we=Ce.get(C.texture);T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,we.__webglTexture,O)}_=-1},this.readRenderTargetPixels=function(C,R,O,V,D,te,he){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let me=Ce.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&he!==void 0&&(me=me[he]),me){Ee.bindFramebuffer(T.FRAMEBUFFER,me);try{const we=C.texture,Qe=we.format,Ie=we.type;if(!Ge.textureFormatReadable(Qe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ge.textureTypeReadable(Ie)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}R>=0&&R<=C.width-V&&O>=0&&O<=C.height-D&&T.readPixels(R,O,V,D,be.convert(Qe),be.convert(Ie),te)}finally{const we=F!==null?Ce.get(F).__webglFramebuffer:null;Ee.bindFramebuffer(T.FRAMEBUFFER,we)}}},this.readRenderTargetPixelsAsync=async function(C,R,O,V,D,te,he){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let me=Ce.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&he!==void 0&&(me=me[he]),me){const we=C.texture,Qe=we.format,Ie=we.type;if(!Ge.textureFormatReadable(Qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ge.textureTypeReadable(Ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(R>=0&&R<=C.width-V&&O>=0&&O<=C.height-D){Ee.bindFramebuffer(T.FRAMEBUFFER,me);const Ue=T.createBuffer();T.bindBuffer(T.PIXEL_PACK_BUFFER,Ue),T.bufferData(T.PIXEL_PACK_BUFFER,te.byteLength,T.STREAM_READ),T.readPixels(R,O,V,D,be.convert(Qe),be.convert(Ie),0);const ze=F!==null?Ce.get(F).__webglFramebuffer:null;Ee.bindFramebuffer(T.FRAMEBUFFER,ze);const qe=T.fenceSync(T.SYNC_GPU_COMMANDS_COMPLETE,0);return T.flush(),await ap(T,qe,4),T.bindBuffer(T.PIXEL_PACK_BUFFER,Ue),T.getBufferSubData(T.PIXEL_PACK_BUFFER,0,te),T.deleteBuffer(Ue),T.deleteSync(qe),te}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(C,R=null,O=0){C.isTexture!==!0&&(ri("WebGLRenderer: copyFramebufferToTexture function signature has changed."),R=arguments[0]||null,C=arguments[1]);const V=Math.pow(2,-O),D=Math.floor(C.image.width*V),te=Math.floor(C.image.height*V),he=R!==null?R.x:0,me=R!==null?R.y:0;y.setTexture2D(C,0),T.copyTexSubImage2D(T.TEXTURE_2D,O,0,0,he,me,D,te),Ee.unbindTexture()};const Xf=T.createFramebuffer(),Yf=T.createFramebuffer();this.copyTextureToTexture=function(C,R,O=null,V=null,D=0,te=null){C.isTexture!==!0&&(ri("WebGLRenderer: copyTextureToTexture function signature has changed."),V=arguments[0]||null,C=arguments[1],R=arguments[2],te=arguments[3]||0,O=null),te===null&&(D!==0?(ri("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),te=D,D=0):te=0);let he,me,we,Qe,Ie,Ue,ze,qe,Bt;const ft=C.isCompressedTexture?C.mipmaps[te]:C.image;if(O!==null)he=O.max.x-O.min.x,me=O.max.y-O.min.y,we=O.isBox3?O.max.z-O.min.z:1,Qe=O.min.x,Ie=O.min.y,Ue=O.isBox3?O.min.z:0;else{const tA=Math.pow(2,-D);he=Math.floor(ft.width*tA),me=Math.floor(ft.height*tA),C.isDataArrayTexture?we=ft.depth:C.isData3DTexture?we=Math.floor(ft.depth*tA):we=1,Qe=0,Ie=0,Ue=0}V!==null?(ze=V.x,qe=V.y,Bt=V.z):(ze=0,qe=0,Bt=0);const We=be.convert(R.format),ye=be.convert(R.type);let Mt;R.isData3DTexture?(y.setTexture3D(R,0),Mt=T.TEXTURE_3D):R.isDataArrayTexture||R.isCompressedArrayTexture?(y.setTexture2DArray(R,0),Mt=T.TEXTURE_2D_ARRAY):(y.setTexture2D(R,0),Mt=T.TEXTURE_2D),T.pixelStorei(T.UNPACK_FLIP_Y_WEBGL,R.flipY),T.pixelStorei(T.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),T.pixelStorei(T.UNPACK_ALIGNMENT,R.unpackAlignment);const Ze=T.getParameter(T.UNPACK_ROW_LENGTH),uA=T.getParameter(T.UNPACK_IMAGE_HEIGHT),Hn=T.getParameter(T.UNPACK_SKIP_PIXELS),Yt=T.getParameter(T.UNPACK_SKIP_ROWS),Si=T.getParameter(T.UNPACK_SKIP_IMAGES);T.pixelStorei(T.UNPACK_ROW_LENGTH,ft.width),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,ft.height),T.pixelStorei(T.UNPACK_SKIP_PIXELS,Qe),T.pixelStorei(T.UNPACK_SKIP_ROWS,Ie),T.pixelStorei(T.UNPACK_SKIP_IMAGES,Ue);const lt=C.isDataArrayTexture||C.isData3DTexture,eA=R.isDataArrayTexture||R.isData3DTexture;if(C.isDepthTexture){const tA=Ce.get(C),Pt=Ce.get(R),Gt=Ce.get(tA.__renderTarget),ea=Ce.get(Pt.__renderTarget);Ee.bindFramebuffer(T.READ_FRAMEBUFFER,Gt.__webglFramebuffer),Ee.bindFramebuffer(T.DRAW_FRAMEBUFFER,ea.__webglFramebuffer);for(let fn=0;fn<we;fn++)lt&&(T.framebufferTextureLayer(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,Ce.get(C).__webglTexture,D,Ue+fn),T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,Ce.get(R).__webglTexture,te,Bt+fn)),T.blitFramebuffer(Qe,Ie,he,me,ze,qe,he,me,T.DEPTH_BUFFER_BIT,T.NEAREST);Ee.bindFramebuffer(T.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(T.DRAW_FRAMEBUFFER,null)}else if(D!==0||C.isRenderTargetTexture||Ce.has(C)){const tA=Ce.get(C),Pt=Ce.get(R);Ee.bindFramebuffer(T.READ_FRAMEBUFFER,Xf),Ee.bindFramebuffer(T.DRAW_FRAMEBUFFER,Yf);for(let Gt=0;Gt<we;Gt++)lt?T.framebufferTextureLayer(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,tA.__webglTexture,D,Ue+Gt):T.framebufferTexture2D(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,tA.__webglTexture,D),eA?T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,Pt.__webglTexture,te,Bt+Gt):T.framebufferTexture2D(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,Pt.__webglTexture,te),D!==0?T.blitFramebuffer(Qe,Ie,he,me,ze,qe,he,me,T.COLOR_BUFFER_BIT,T.NEAREST):eA?T.copyTexSubImage3D(Mt,te,ze,qe,Bt+Gt,Qe,Ie,he,me):T.copyTexSubImage2D(Mt,te,ze,qe,Qe,Ie,he,me);Ee.bindFramebuffer(T.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(T.DRAW_FRAMEBUFFER,null)}else eA?C.isDataTexture||C.isData3DTexture?T.texSubImage3D(Mt,te,ze,qe,Bt,he,me,we,We,ye,ft.data):R.isCompressedArrayTexture?T.compressedTexSubImage3D(Mt,te,ze,qe,Bt,he,me,we,We,ft.data):T.texSubImage3D(Mt,te,ze,qe,Bt,he,me,we,We,ye,ft):C.isDataTexture?T.texSubImage2D(T.TEXTURE_2D,te,ze,qe,he,me,We,ye,ft.data):C.isCompressedTexture?T.compressedTexSubImage2D(T.TEXTURE_2D,te,ze,qe,ft.width,ft.height,We,ft.data):T.texSubImage2D(T.TEXTURE_2D,te,ze,qe,he,me,We,ye,ft);T.pixelStorei(T.UNPACK_ROW_LENGTH,Ze),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,uA),T.pixelStorei(T.UNPACK_SKIP_PIXELS,Hn),T.pixelStorei(T.UNPACK_SKIP_ROWS,Yt),T.pixelStorei(T.UNPACK_SKIP_IMAGES,Si),te===0&&R.generateMipmaps&&T.generateMipmap(Mt),Ee.unbindTexture()},this.copyTextureToTexture3D=function(C,R,O=null,V=null,D=0){return C.isTexture!==!0&&(ri("WebGLRenderer: copyTextureToTexture3D function signature has changed."),O=arguments[0]||null,V=arguments[1]||null,C=arguments[2],R=arguments[3],D=arguments[4]||0),ri('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(C,R,O,V,D)},this.initRenderTarget=function(C){Ce.get(C).__webglFramebuffer===void 0&&y.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?y.setTextureCube(C,0):C.isData3DTexture?y.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?y.setTexture2DArray(C,0):y.setTexture2D(C,0),Ee.unbindTexture()},this.resetState=function(){x=0,S=0,F=null,Ee.reset(),Je.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return PA}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=Xe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Xe._getUnpackColorSpace()}}const Yc={type:"change"},bl={type:"start"},Ph={type:"end"},Gr=new Gs,Jc=new jA,Mw=Math.cos(70*rp.DEG2RAD),vt=new Q,kt=2*Math.PI,nt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ia=1e-6;class Fw extends Kp{constructor(e,t=null){super(e,t),this.state=nt.NONE,this.enabled=!0,this.target=new Q,this.cursor=new Q,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ui.ROTATE,MIDDLE:ui.DOLLY,RIGHT:ui.PAN},this.touches={ONE:oi.ROTATE,TWO:oi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new Q,this._lastQuaternion=new Rn,this._lastTargetPosition=new Q,this._quat=new Rn().setFromUnitVectors(e.up,new Q(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new vc,this._sphericalDelta=new vc,this._scale=1,this._panOffset=new Q,this._rotateStart=new Pe,this._rotateEnd=new Pe,this._rotateDelta=new Pe,this._panStart=new Pe,this._panEnd=new Pe,this._panDelta=new Pe,this._dollyStart=new Pe,this._dollyEnd=new Pe,this._dollyDelta=new Pe,this._dollyDirection=new Q,this._mouse=new Pe,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Tw.bind(this),this._onPointerDown=bw.bind(this),this._onPointerUp=Qw.bind(this),this._onContextMenu=Nw.bind(this),this._onMouseWheel=Lw.bind(this),this._onKeyDown=Dw.bind(this),this._onTouchStart=Hw.bind(this),this._onTouchMove=Pw.bind(this),this._onMouseDown=Iw.bind(this),this._onMouseMove=Rw.bind(this),this._interceptControlDown=Ow.bind(this),this._interceptControlUp=Gw.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Yc),this.update(),this.state=nt.NONE}update(e=null){const t=this.object.position;vt.copy(t).sub(this.target),vt.applyQuaternion(this._quat),this._spherical.setFromVector3(vt),this.autoRotate&&this.state===nt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let A=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(A)&&isFinite(i)&&(A<-Math.PI?A+=kt:A>Math.PI&&(A-=kt),i<-Math.PI?i+=kt:i>Math.PI&&(i-=kt),A<=i?this._spherical.theta=Math.max(A,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(A+i)/2?Math.max(A,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const s=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=s!=this._spherical.radius}if(vt.setFromSpherical(this._spherical),vt.applyQuaternion(this._quatInverse),t.copy(this.target).add(vt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let s=null;if(this.object.isPerspectiveCamera){const a=vt.length();s=this._clampDistance(a*this._scale);const o=a-s;this.object.position.addScaledVector(this._dollyDirection,o),this.object.updateMatrixWorld(),r=!!o}else if(this.object.isOrthographicCamera){const a=new Q(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=o!==this.object.zoom;const l=new Q(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),s=vt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;s!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(s).add(this.object.position):(Gr.origin.copy(this.object.position),Gr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Gr.direction))<Mw?this.object.lookAt(this.target):(Jc.setFromNormalAndCoplanarPoint(this.object.up,this.target),Gr.intersectPlane(Jc,this.target))))}else if(this.object.isOrthographicCamera){const s=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),s!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Ia||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ia||this._lastTargetPosition.distanceToSquared(this.target)>Ia?(this.dispatchEvent(Yc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?kt/60*this.autoRotateSpeed*e:kt/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){vt.setFromMatrixColumn(t,0),vt.multiplyScalar(-e),this._panOffset.add(vt)}_panUp(e,t){this.screenSpacePanning===!0?vt.setFromMatrixColumn(t,1):(vt.setFromMatrixColumn(t,0),vt.crossVectors(this.object.up,vt)),vt.multiplyScalar(e),this._panOffset.add(vt)}_pan(e,t){const A=this.domElement;if(this.object.isPerspectiveCamera){const i=this.object.position;vt.copy(i).sub(this.target);let r=vt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/A.clientHeight,this.object.matrix),this._panUp(2*t*r/A.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/A.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/A.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const A=this.domElement.getBoundingClientRect(),i=e-A.left,r=t-A.top,s=A.width,a=A.height;this._mouse.x=i/s*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(kt*this._rotateDelta.x/t.clientHeight),this._rotateUp(kt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(kt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-kt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(kt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-kt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),A=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._rotateStart.set(A,i)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),A=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panStart.set(A,i)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),A=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(A*A+i*i);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const A=this._getSecondPointerPosition(e),i=.5*(e.pageX+A.x),r=.5*(e.pageY+A.y);this._rotateEnd.set(i,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(kt*this._rotateDelta.x/t.clientHeight),this._rotateUp(kt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),A=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panEnd.set(A,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),A=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(A*A+i*i);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const s=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(s,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Pe,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,A={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:A.deltaY*=16;break;case 2:A.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(A.deltaY*=10),A}}function bw(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function Tw(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function Qw(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Ph),this.state=nt.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Iw(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case ui.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=nt.DOLLY;break;case ui.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=nt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=nt.ROTATE}break;case ui.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=nt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=nt.PAN}break;default:this.state=nt.NONE}this.state!==nt.NONE&&this.dispatchEvent(bl)}function Rw(n){switch(this.state){case nt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case nt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case nt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function Lw(n){this.enabled===!1||this.enableZoom===!1||this.state!==nt.NONE||(n.preventDefault(),this.dispatchEvent(bl),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Ph))}function Dw(n){this.enabled!==!1&&this._handleKeyDown(n)}function Hw(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case oi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=nt.TOUCH_ROTATE;break;case oi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=nt.TOUCH_PAN;break;default:this.state=nt.NONE}break;case 2:switch(this.touches.TWO){case oi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=nt.TOUCH_DOLLY_PAN;break;case oi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=nt.TOUCH_DOLLY_ROTATE;break;default:this.state=nt.NONE}break;default:this.state=nt.NONE}this.state!==nt.NONE&&this.dispatchEvent(bl)}function Pw(n){switch(this._trackPointer(n),this.state){case nt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case nt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case nt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case nt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=nt.NONE}}function Nw(n){this.enabled!==!1&&n.preventDefault()}function Ow(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Gw(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class qc extends Tt{constructor(e=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=e,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new Pe(.5,.5),this.addEventListener("removed",function(){this.traverse(function(t){t.element instanceof t.element.ownerDocument.defaultView.Element&&t.element.parentNode!==null&&t.element.remove()})})}copy(e,t){return super.copy(e,t),this.element=e.element.cloneNode(!0),this.center=e.center,this}}const jn=new Q,Zc=new ut,jc=new ut,$c=new Q,eu=new Q;class Vw{constructor(e={}){const t=this;let A,i,r,s;const a={objects:new WeakMap},o=e.element!==void 0?e.element:document.createElement("div");o.style.overflow="hidden",this.domElement=o,this.getSize=function(){return{width:A,height:i}},this.render=function(g,m){g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),m.parent===null&&m.matrixWorldAutoUpdate===!0&&m.updateMatrixWorld(),Zc.copy(m.matrixWorldInverse),jc.multiplyMatrices(m.projectionMatrix,Zc),c(g,g,m),p(g)},this.setSize=function(g,m){A=g,i=m,r=A/2,s=i/2,o.style.width=g+"px",o.style.height=m+"px"};function l(g){g.isCSS2DObject&&(g.element.style.display="none");for(let m=0,d=g.children.length;m<d;m++)l(g.children[m])}function c(g,m,d){if(g.visible===!1){l(g);return}if(g.isCSS2DObject){jn.setFromMatrixPosition(g.matrixWorld),jn.applyMatrix4(jc);const h=jn.z>=-1&&jn.z<=1&&g.layers.test(d.layers)===!0,E=g.element;E.style.display=h===!0?"":"none",h===!0&&(g.onBeforeRender(t,m,d),E.style.transform="translate("+-100*g.center.x+"%,"+-100*g.center.y+"%)translate("+(jn.x*r+r)+"px,"+(-jn.y*s+s)+"px)",E.parentNode!==o&&o.appendChild(E),g.onAfterRender(t,m,d));const U={distanceToCameraSquared:u(d,g)};a.objects.set(g,U)}for(let h=0,E=g.children.length;h<E;h++)c(g.children[h],m,d)}function u(g,m){return $c.setFromMatrixPosition(g.matrixWorld),eu.setFromMatrixPosition(m.matrixWorld),$c.distanceToSquared(eu)}function f(g){const m=[];return g.traverseVisible(function(d){d.isCSS2DObject&&m.push(d)}),m}function p(g){const m=f(g).sort(function(h,E){if(h.renderOrder!==E.renderOrder)return E.renderOrder-h.renderOrder;const U=a.objects.get(h).distanceToCameraSquared,B=a.objects.get(E).distanceToCameraSquared;return U-B}),d=m.length;for(let h=0,E=m.length;h<E;h++)m[h].element.style.zIndex=d-h}}}const kw=[{position:[0,1.62,0],primary:"Geographic Space (GS) ↑",secondary:"Down → Up"},{position:[0,-1.62,0],primary:"Geographic Space (GS) ↓",secondary:"Up → Down"},{position:[1.82,0,0],primary:"Communicational Space (CS) →",secondary:"Towards Alter Space (AS): Towards non-participants (III person)"},{position:[-1.82,0,0],primary:"Communicational Space (CS) ←",secondary:"Towards Ego Space (ES): Towards participants (speaker/addressee, I/II persons)"},{position:[0,0,1.82],primary:"Geographic Space (GS)",secondary:"Inside → Outside"},{position:[0,0,-1.82],primary:"Geographic Space (GS)",secondary:"Outside → Inside"}],Kw=[{from:[-1.78,0,0],to:[1.78,0,0],key:"x"},{from:[0,-1.58,0],to:[0,1.58,0],key:"y"},{from:[0,0,-1.78],to:[0,0,1.78],key:"z"}],_A={x:4553629,y:2976335,z:7291585},zw=new Set(["a","cha","mi","mo","she","ga"]);function Ww(n,e){if(!e)return null;const t=e.entries.find(i=>i.id===n);if(!t||t.highlightArrows===void 0)return null;const A=t.highlightArrows.filter(i=>zw.has(i));return A.length>0?A:null}function Xw(n,e){return n?Ww(n,e??null):null}const Yw=.1,tu=[1,1,1],_n=.06,vn=.09,Vr=.58,kr=.72,Au={modern_simple:"pd-label--modern-simple",modern_complex:"pd-label--modern-complex",old_simple:"pd-label--old-simple",old_complex:"pd-label--old-complex"};class Jw{constructor(e,t){et(this,"scene");et(this,"camera");et(this,"renderer");et(this,"labelRenderer");et(this,"controls");et(this,"container");et(this,"currentTheme","light");et(this,"pickMeshes",new Map);et(this,"labelById",new Map);et(this,"raycaster",new kp);et(this,"pointer",new Pe);et(this,"animationId",0);et(this,"onPick",null);et(this,"defaultCameraPosition",new Q(2.8,2.2,3.2));et(this,"defaultTarget",new Q(0,0,0));et(this,"axisArrowById",new Map);et(this,"axisLines",[]);et(this,"cubeEdges",null);et(this,"daPlane",null);et(this,"tsaHintArrow",null);et(this,"enclosureShell",null);et(this,"sheInboundArrow",null);et(this,"gadaEnclosureArrows",[]);et(this,"tsaHintAnchor",new Q(.85,.15,-.35));et(this,"daPlaneAnchor",new Q(.2,-.76,-.48));et(this,"onPointerDown",e=>{var r,s;const t=this.renderer.domElement.getBoundingClientRect();this.pointer.x=(e.clientX-t.left)/t.width*2-1,this.pointer.y=-((e.clientY-t.top)/t.height)*2+1,this.raycaster.setFromCamera(this.pointer,this.camera);const A=[...this.pickMeshes.values()],i=this.raycaster.intersectObjects(A,!1);i.length&&i[0].object.userData.preverbId?(r=this.onPick)==null||r.call(this,i[0].object.userData.preverbId):(s=this.onPick)==null||s.call(this,null)});et(this,"onResize",()=>{const e=this.container.clientWidth,t=this.container.clientHeight;e===0||t===0||(this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t),this.labelRenderer.setSize(e,t))});et(this,"loop",()=>{this.animationId=requestAnimationFrame(this.loop),this.controls.update(),this.renderer.render(this.scene,this.camera),this.labelRenderer.render(this.scene,this.camera)});this.container=e;const A=e.clientWidth||640,i=e.clientHeight||480;this.scene=new Qp,this.scene.background=new Ye(16316922),this.camera=new rA(50,A/i,.1,100),this.camera.position.copy(this.defaultCameraPosition),this.renderer=new Sw({antialias:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(A,i),e.appendChild(this.renderer.domElement),this.labelRenderer=new Vw,this.labelRenderer.setSize(A,i),this.labelRenderer.domElement.className="pd-label-layer",this.labelRenderer.domElement.style.position="absolute",this.labelRenderer.domElement.style.top="0",this.labelRenderer.domElement.style.left="0",this.labelRenderer.domElement.style.pointerEvents="none",e.appendChild(this.labelRenderer.domElement),this.controls=new Fw(this.camera,this.renderer.domElement),this.controls.target.copy(this.defaultTarget),this.controls.enableDamping=!0,this.controls.minDistance=2,this.controls.maxDistance=12;const r=new Gp(16777215,1);this.scene.add(r);const s=new Ln(2,2,2),a=new Dp(s),o=new Lp(a,new ys({color:4804695,linewidth:1}));this.cubeEdges=o,this.scene.add(o);const l=new Ln(...tu),c=new pi({color:5983628,transparent:!0,opacity:.055,side:gA,depthWrite:!1});this.enclosureShell=new jt(l,c),this.scene.add(this.enclosureShell);for(const M of Kw){const x=new $t().setFromPoints([new Q(...M.from),new Q(...M.to)]),S=new ys({color:_A[M.key],transparent:!0,opacity:.5,depthWrite:!1}),F=new yl(x,S);this.axisLines.push(F),this.scene.add(F)}const u=[{id:"a",dir:new Q(0,1,0),color:_A.y},{id:"cha",dir:new Q(0,-1,0),color:_A.y},{id:"mi",dir:new Q(1,0,0),color:_A.x},{id:"mo",dir:new Q(-1,0,0),color:_A.x},{id:"she",dir:new Q(0,0,-1),color:_A.z},{id:"ga",dir:new Q(0,0,1),color:_A.z}];for(const{id:M,dir:x,color:S}of u){const F=new Hr(x.clone().normalize(),new Q(0,0,0),1.02,S,.2,.14),_=F.line.material;_.transparent=!0,_.opacity=_n,_.depthWrite=!1;const v=F.cone.material;v.transparent=!0,v.opacity=vn,v.depthWrite=!1,F.userData.arrowId=M,this.axisArrowById.set(M,F),this.scene.add(F)}const f=new Q(0,0,1),p=new Q(0,0,-1.07);this.sheInboundArrow=new Hr(f,p,.94,_A.z,.2,.14);const g=this.sheInboundArrow.line.material;g.transparent=!0,g.opacity=_n,g.depthWrite=!1;const m=this.sheInboundArrow.cone.material;m.transparent=!0,m.opacity=vn,m.depthWrite=!1,this.sheInboundArrow.visible=!1,this.scene.add(this.sheInboundArrow);{const M=tu[2]/2,x=Math.max(.1,M),S=Math.min(Math.max(.1,M*.38),x*.42),F=S*.62,_=new Q(0,0,0),v=[{dir:new Q(0,0,-1)},{dir:new Q(0,0,1)}];for(const b of v){const H=new Hr(b.dir,_,x,_A.z,S,F),L=H.line.material;L.transparent=!0,L.opacity=_n,L.depthWrite=!1;const G=H.cone.material;G.transparent=!0,G.opacity=vn,G.depthWrite=!1,H.visible=!1,H.renderOrder=10,H.line.renderOrder=10,H.cone.renderOrder=10,this.scene.add(H),this.gadaEnclosureArrows.push(H)}}const d=new ar(.85,.85),h=new pi({color:6055792,transparent:!0,opacity:.18,side:gA,depthWrite:!1});this.daPlane=new jt(d,h),this.daPlane.rotation.x=-Math.PI/2,this.daPlane.position.set(.14,-.94,-.4),this.daPlane.visible=!1,this.scene.add(this.daPlane);const E=new Q(.9,.06,.2).normalize();this.tsaHintArrow=new Hr(E,this.tsaHintAnchor.clone(),.42,_A.x,.11,.085);const U=this.tsaHintArrow.line.material;U.transparent=!0,U.depthWrite=!1;const B=this.tsaHintArrow.cone.material;B.transparent=!0,B.depthWrite=!1,this.tsaHintArrow.visible=!1,this.scene.add(this.tsaHintArrow),this.setDiagramHints(null,null),this.setTheme("light");for(const M of kw){const x=document.createElement("div");x.className="pd-axis-label",x.innerHTML=`<span class="pd-axis-label__primary">${rt(M.primary)}</span><span class="pd-axis-label__secondary">${rt(M.secondary)}</span>`;const S=new qc(x);S.position.set(...M.position),this.scene.add(S)}this.renderer.domElement.addEventListener("pointerdown",this.onPointerDown),window.addEventListener("resize",this.onResize),this.loop()}setPickCallback(e){this.onPick=e}setDiagramHints(e,t){const A=Xw(e,t),i=A?new Set(A):null,r=!!(i!=null&&i.has("she")&&!(i!=null&&i.has("ga")));for(const[a,o]of this.axisArrowById){let l=(i==null?void 0:i.has(a))??!1;a==="she"&&r&&(l=!1);const c=o.line.material,u=o.cone.material;c.opacity=l?Vr:_n,u.opacity=l?kr:vn}if(this.sheInboundArrow){const a=r;this.sheInboundArrow.visible=a;const o=this.sheInboundArrow.line.material,l=this.sheInboundArrow.cone.material;a?(o.opacity=Vr,l.opacity=kr):(o.opacity=_n,l.opacity=vn)}const s=e==="gada";for(const a of this.gadaEnclosureArrows){a.visible=s;const o=a.line.material,l=a.cone.material;s?(o.opacity=Vr,l.opacity=kr):(o.opacity=_n,l.opacity=vn)}if(this.daPlane){const a=e==="da";this.daPlane.visible=a,a&&this.daPlane.position.set(this.daPlaneAnchor.x,this.daPlaneAnchor.y-Yw,this.daPlaneAnchor.z)}if(this.enclosureShell){const a=this.enclosureShell.material,o=e??"",l=o==="she"||o==="ga"||o==="gada"||o==="shemo"||o==="tsamo"||o==="gamo",c=this.currentTheme==="dark"?.09:.055,u=this.currentTheme==="dark"?.16:.12;a.opacity=l?u:c}if(this.tsaHintArrow){const a=e==="tsa";if(this.tsaHintArrow.visible=a,a){this.tsaHintArrow.position.copy(this.tsaHintAnchor);const o=new Q(.88,.05,.22).normalize();this.tsaHintArrow.setDirection(o);const l=this.tsaHintArrow.line.material,c=this.tsaHintArrow.cone.material;l.opacity=Vr,c.opacity=kr}else{const o=this.tsaHintArrow.line.material,l=this.tsaHintArrow.cone.material;o.opacity=_n,l.opacity=vn}}}buildLabels(e,t,A){var r,s,a,o;for(const l of this.pickMeshes.values())this.scene.remove(l);this.pickMeshes.clear();for(const l of this.labelById.values())this.scene.remove(l);this.labelById.clear();const i=new Map(t.map(l=>[l.id,l]));for(const l of e.entries){const c=i.get(l.id);if(!c)continue;const u=((r=l.labelOffset)==null?void 0:r[0])??0,f=((s=l.labelOffset)==null?void 0:s[1])??0,p=((a=l.labelOffset)==null?void 0:a[2])??0,g=new Q(l.position[0]+u,l.position[1]+f,l.position[2]+p);if(l.id==="tsa"&&this.tsaHintAnchor.copy(g),l.id==="da"&&this.daPlaneAnchor.copy(g),A.modernPreverbsOnly&&!c.modernPreverb||A.mode==="verb"&&A.usedIds&&!A.usedIds.has(c.id))continue;const m=document.createElement("div");m.className=`pd-label ${Au[c.tier]??""}`,m.textContent=c.display,A.legendTier!=null&&c.tier!==A.legendTier&&m.classList.add("pd-label--dim"),A.selectedId===c.id&&m.classList.add("pd-label--selected"),(o=A.scenarioHighlight)!=null&&o.has(c.id)&&m.classList.add("pd-label--scenario");const h=new qc(m);h.position.copy(g),this.scene.add(h),this.labelById.set(c.id,h);const E=new Ml(.18,12,12),U=new pi({visible:!1,transparent:!0,opacity:0}),B=new jt(E,U);B.position.copy(g),B.userData.preverbId=c.id,this.scene.add(B),this.pickMeshes.set(c.id,B)}}updateLabelStyles(e,t){var i;const A=new Map(t.map(r=>[r.id,r]));for(const[r,s]of this.labelById){const a=A.get(r);if(!a)continue;const o=s.element;if(o.className=`pd-label ${Au[a.tier]??""}`,e.modernPreverbsOnly&&!a.modernPreverb){o.style.display="none";continue}o.style.display="",e.legendTier!=null&&a.tier!==e.legendTier&&o.classList.add("pd-label--dim"),e.selectedId===r&&o.classList.add("pd-label--selected"),(i=e.scenarioHighlight)!=null&&i.has(r)&&o.classList.add("pd-label--scenario")}for(const[r,s]of this.pickMeshes){const a=A.get(r);s.visible=!!(a&&(!e.modernPreverbsOnly||a.modernPreverb))}}resize(){this.onResize()}renderOnce(){this.controls.update(),this.renderer.render(this.scene,this.camera),this.labelRenderer.render(this.scene,this.camera)}resetView(){this.camera.position.copy(this.defaultCameraPosition),this.controls.target.copy(this.defaultTarget),this.camera.up.set(0,1,0),this.controls.update()}setTheme(e){this.currentTheme=e;const t=e==="dark";this.scene.background=new Ye(t?725536:16316922),this.cubeEdges&&this.cubeEdges.material.color.setHex(t?9741240:4804695);for(const A of this.axisLines){const i=A.material;i.opacity=t?.66:.5}if(this.enclosureShell){const A=this.enclosureShell.material;A.opacity=t?.09:.055}if(this.daPlane){const A=this.daPlane.material;A.color.setHex(t?9741240:6055792),A.opacity=t?.24:.18}}destroy(){cancelAnimationFrame(this.animationId),window.removeEventListener("resize",this.onResize),this.renderer.domElement.removeEventListener("pointerdown",this.onPointerDown),this.controls.dispose(),this.renderer.dispose(),this.renderer.domElement.remove(),this.labelRenderer.domElement.remove(),this.daPlane&&(this.daPlane.geometry.dispose(),this.daPlane.material.dispose()),this.enclosureShell&&(this.enclosureShell.geometry.dispose(),this.enclosureShell.material.dispose()),this.tsaHintArrow&&this.tsaHintArrow.dispose(),this.sheInboundArrow&&this.sheInboundArrow.dispose();for(const e of this.gadaEnclosureArrows)e.dispose();for(const e of this.axisArrowById.values())e.dispose()}}/*!
 * html2canvas 1.4.1 <https://html2canvas.hertzen.com>
 * Copyright (c) 2022 Niklas von Hertzen <https://hertzen.com>
 * Released under MIT License
 *//*! *****************************************************************************
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
***************************************************************************** */var Yo=function(n,e){return Yo=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,A){t.__proto__=A}||function(t,A){for(var i in A)Object.prototype.hasOwnProperty.call(A,i)&&(t[i]=A[i])},Yo(n,e)};function wA(n,e){if(typeof e!="function"&&e!==null)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");Yo(n,e);function t(){this.constructor=n}n.prototype=e===null?Object.create(e):(t.prototype=e.prototype,new t)}var Jo=function(){return Jo=Object.assign||function(e){for(var t,A=1,i=arguments.length;A<i;A++){t=arguments[A];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},Jo.apply(this,arguments)};function Ot(n,e,t,A){function i(r){return r instanceof t?r:new t(function(s){s(r)})}return new(t||(t=Promise))(function(r,s){function a(c){try{l(A.next(c))}catch(u){s(u)}}function o(c){try{l(A.throw(c))}catch(u){s(u)}}function l(c){c.done?r(c.value):i(c.value).then(a,o)}l((A=A.apply(n,[])).next())})}function Dt(n,e){var t={label:0,sent:function(){if(r[0]&1)throw r[1];return r[1]},trys:[],ops:[]},A,i,r,s;return s={next:a(0),throw:a(1),return:a(2)},typeof Symbol=="function"&&(s[Symbol.iterator]=function(){return this}),s;function a(l){return function(c){return o([l,c])}}function o(l){if(A)throw new TypeError("Generator is already executing.");for(;t;)try{if(A=1,i&&(r=l[0]&2?i.return:l[0]?i.throw||((r=i.return)&&r.call(i),0):i.next)&&!(r=r.call(i,l[1])).done)return r;switch(i=0,r&&(l=[l[0]&2,r.value]),l[0]){case 0:case 1:r=l;break;case 4:return t.label++,{value:l[1],done:!1};case 5:t.label++,i=l[1],l=[0];continue;case 7:l=t.ops.pop(),t.trys.pop();continue;default:if(r=t.trys,!(r=r.length>0&&r[r.length-1])&&(l[0]===6||l[0]===2)){t=0;continue}if(l[0]===3&&(!r||l[1]>r[0]&&l[1]<r[3])){t.label=l[1];break}if(l[0]===6&&t.label<r[1]){t.label=r[1],r=l;break}if(r&&t.label<r[2]){t.label=r[2],t.ops.push(l);break}r[2]&&t.ops.pop(),t.trys.pop();continue}l=e.call(n,t)}catch(c){l=[6,c],i=0}finally{A=r=0}if(l[0]&5)throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}}function Kr(n,e,t){if(arguments.length===2)for(var A=0,i=e.length,r;A<i;A++)(r||!(A in e))&&(r||(r=Array.prototype.slice.call(e,0,A)),r[A]=e[A]);return n.concat(r||e)}var kA=(function(){function n(e,t,A,i){this.left=e,this.top=t,this.width=A,this.height=i}return n.prototype.add=function(e,t,A,i){return new n(this.left+e,this.top+t,this.width+A,this.height+i)},n.fromClientRect=function(e,t){return new n(t.left+e.windowBounds.left,t.top+e.windowBounds.top,t.width,t.height)},n.fromDOMRectList=function(e,t){var A=Array.from(t).find(function(i){return i.width!==0});return A?new n(A.left+e.windowBounds.left,A.top+e.windowBounds.top,A.width,A.height):n.EMPTY},n.EMPTY=new n(0,0,0,0),n})(),ks=function(n,e){return kA.fromClientRect(n,e.getBoundingClientRect())},qw=function(n){var e=n.body,t=n.documentElement;if(!e||!t)throw new Error("Unable to get document size");var A=Math.max(Math.max(e.scrollWidth,t.scrollWidth),Math.max(e.offsetWidth,t.offsetWidth),Math.max(e.clientWidth,t.clientWidth)),i=Math.max(Math.max(e.scrollHeight,t.scrollHeight),Math.max(e.offsetHeight,t.offsetHeight),Math.max(e.clientHeight,t.clientHeight));return new kA(0,0,A,i)},Ks=function(n){for(var e=[],t=0,A=n.length;t<A;){var i=n.charCodeAt(t++);if(i>=55296&&i<=56319&&t<A){var r=n.charCodeAt(t++);(r&64512)===56320?e.push(((i&1023)<<10)+(r&1023)+65536):(e.push(i),t--)}else e.push(i)}return e},gt=function(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];if(String.fromCodePoint)return String.fromCodePoint.apply(String,n);var t=n.length;if(!t)return"";for(var A=[],i=-1,r="";++i<t;){var s=n[i];s<=65535?A.push(s):(s-=65536,A.push((s>>10)+55296,s%1024+56320)),(i+1===t||A.length>16384)&&(r+=String.fromCharCode.apply(String,A),A.length=0)}return r},nu="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Zw=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(var zr=0;zr<nu.length;zr++)Zw[nu.charCodeAt(zr)]=zr;var iu="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Ni=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(var Wr=0;Wr<iu.length;Wr++)Ni[iu.charCodeAt(Wr)]=Wr;var jw=function(n){var e=n.length*.75,t=n.length,A,i=0,r,s,a,o;n[n.length-1]==="="&&(e--,n[n.length-2]==="="&&e--);var l=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u"&&typeof Uint8Array.prototype.slice<"u"?new ArrayBuffer(e):new Array(e),c=Array.isArray(l)?l:new Uint8Array(l);for(A=0;A<t;A+=4)r=Ni[n.charCodeAt(A)],s=Ni[n.charCodeAt(A+1)],a=Ni[n.charCodeAt(A+2)],o=Ni[n.charCodeAt(A+3)],c[i++]=r<<2|s>>4,c[i++]=(s&15)<<4|a>>2,c[i++]=(a&3)<<6|o&63;return l},$w=function(n){for(var e=n.length,t=[],A=0;A<e;A+=2)t.push(n[A+1]<<8|n[A]);return t},e_=function(n){for(var e=n.length,t=[],A=0;A<e;A+=4)t.push(n[A+3]<<24|n[A+2]<<16|n[A+1]<<8|n[A]);return t},bn=5,Tl=11,Ra=2,t_=Tl-bn,Nh=65536>>bn,A_=1<<bn,La=A_-1,n_=1024>>bn,i_=Nh+n_,r_=i_,s_=32,a_=r_+s_,o_=65536>>Tl,l_=1<<t_,c_=l_-1,ru=function(n,e,t){return n.slice?n.slice(e,t):new Uint16Array(Array.prototype.slice.call(n,e,t))},u_=function(n,e,t){return n.slice?n.slice(e,t):new Uint32Array(Array.prototype.slice.call(n,e,t))},h_=function(n,e){var t=jw(n),A=Array.isArray(t)?e_(t):new Uint32Array(t),i=Array.isArray(t)?$w(t):new Uint16Array(t),r=24,s=ru(i,r/2,A[4]/2),a=A[5]===2?ru(i,(r+A[4])/2):u_(A,Math.ceil((r+A[4])/4));return new f_(A[0],A[1],A[2],A[3],s,a)},f_=(function(){function n(e,t,A,i,r,s){this.initialValue=e,this.errorValue=t,this.highStart=A,this.highValueIndex=i,this.index=r,this.data=s}return n.prototype.get=function(e){var t;if(e>=0){if(e<55296||e>56319&&e<=65535)return t=this.index[e>>bn],t=(t<<Ra)+(e&La),this.data[t];if(e<=65535)return t=this.index[Nh+(e-55296>>bn)],t=(t<<Ra)+(e&La),this.data[t];if(e<this.highStart)return t=a_-o_+(e>>Tl),t=this.index[t],t+=e>>bn&c_,t=this.index[t],t=(t<<Ra)+(e&La),this.data[t];if(e<=1114111)return this.data[this.highValueIndex]}return this.errorValue},n})(),su="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",d_=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(var Xr=0;Xr<su.length;Xr++)d_[su.charCodeAt(Xr)]=Xr;var p_="KwAAAAAAAAAACA4AUD0AADAgAAACAAAAAAAIABAAGABAAEgAUABYAGAAaABgAGgAYgBqAF8AZwBgAGgAcQB5AHUAfQCFAI0AlQCdAKIAqgCyALoAYABoAGAAaABgAGgAwgDKAGAAaADGAM4A0wDbAOEA6QDxAPkAAQEJAQ8BFwF1AH0AHAEkASwBNAE6AUIBQQFJAVEBWQFhAWgBcAF4ATAAgAGGAY4BlQGXAZ8BpwGvAbUBvQHFAc0B0wHbAeMB6wHxAfkBAQIJAvEBEQIZAiECKQIxAjgCQAJGAk4CVgJeAmQCbAJ0AnwCgQKJApECmQKgAqgCsAK4ArwCxAIwAMwC0wLbAjAA4wLrAvMC+AIAAwcDDwMwABcDHQMlAy0DNQN1AD0DQQNJA0kDSQNRA1EDVwNZA1kDdQB1AGEDdQBpA20DdQN1AHsDdQCBA4kDkQN1AHUAmQOhA3UAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AKYDrgN1AHUAtgO+A8YDzgPWAxcD3gPjA+sD8wN1AHUA+wMDBAkEdQANBBUEHQQlBCoEFwMyBDgEYABABBcDSARQBFgEYARoBDAAcAQzAXgEgASIBJAEdQCXBHUAnwSnBK4EtgS6BMIEyAR1AHUAdQB1AHUAdQCVANAEYABgAGAAYABgAGAAYABgANgEYADcBOQEYADsBPQE/AQEBQwFFAUcBSQFLAU0BWQEPAVEBUsFUwVbBWAAYgVgAGoFcgV6BYIFigWRBWAAmQWfBaYFYABgAGAAYABgAKoFYACxBbAFuQW6BcEFwQXHBcEFwQXPBdMF2wXjBeoF8gX6BQIGCgYSBhoGIgYqBjIGOgZgAD4GRgZMBmAAUwZaBmAAYABgAGAAYABgAGAAYABgAGAAYABgAGIGYABpBnAGYABgAGAAYABgAGAAYABgAGAAYAB4Bn8GhQZgAGAAYAB1AHcDFQSLBmAAYABgAJMGdQA9A3UAmwajBqsGqwaVALMGuwbDBjAAywbSBtIG1QbSBtIG0gbSBtIG0gbdBuMG6wbzBvsGAwcLBxMHAwcbByMHJwcsBywHMQcsB9IGOAdAB0gHTgfSBkgHVgfSBtIG0gbSBtIG0gbSBtIG0gbSBiwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdgAGAALAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdbB2MHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB2kH0gZwB64EdQB1AHUAdQB1AHUAdQB1AHUHfQdgAIUHjQd1AHUAlQedB2AAYAClB6sHYACzB7YHvgfGB3UAzgfWBzMB3gfmB1EB7gf1B/0HlQENAQUIDQh1ABUIHQglCBcDLQg1CD0IRQhNCEEDUwh1AHUAdQBbCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIcAh3CHoIMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIgggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAALAcsBywHLAcsBywHLAcsBywHLAcsB4oILAcsB44I0gaWCJ4Ipgh1AHUAqgiyCHUAdQB1AHUAdQB1AHUAdQB1AHUAtwh8AXUAvwh1AMUIyQjRCNkI4AjoCHUAdQB1AO4I9gj+CAYJDgkTCS0HGwkjCYIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiAAIAAAAFAAYABgAGIAXwBgAHEAdQBFAJUAogCyAKAAYABgAEIA4ABGANMA4QDxAMEBDwE1AFwBLAE6AQEBUQF4QkhCmEKoQrhCgAHIQsAB0MLAAcABwAHAAeDC6ABoAHDCwMMAAcABwAHAAdDDGMMAAcAB6MM4wwjDWMNow3jDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEjDqABWw6bDqABpg6gAaABoAHcDvwOPA+gAaABfA/8DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DpcPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB9cPKwkyCToJMAB1AHUAdQBCCUoJTQl1AFUJXAljCWcJawkwADAAMAAwAHMJdQB2CX4JdQCECYoJjgmWCXUAngkwAGAAYABxAHUApgn3A64JtAl1ALkJdQDACTAAMAAwADAAdQB1AHUAdQB1AHUAdQB1AHUAowYNBMUIMAAwADAAMADICcsJ0wnZCRUE4QkwAOkJ8An4CTAAMAB1AAAKvwh1AAgKDwoXCh8KdQAwACcKLgp1ADYKqAmICT4KRgowADAAdQB1AE4KMAB1AFYKdQBeCnUAZQowADAAMAAwADAAMAAwADAAMAAVBHUAbQowADAAdQC5CXUKMAAwAHwBxAijBogEMgF9CoQKiASMCpQKmgqIBKIKqgquCogEDQG2Cr4KxgrLCjAAMADTCtsKCgHjCusK8Qr5CgELMAAwADAAMAB1AIsECQsRC3UANAEZCzAAMAAwADAAMAB1ACELKQswAHUANAExCzkLdQBBC0kLMABRC1kLMAAwADAAMAAwADAAdQBhCzAAMAAwAGAAYABpC3ELdwt/CzAAMACHC4sLkwubC58Lpwt1AK4Ltgt1APsDMAAwADAAMAAwADAAMAAwAL4LwwvLC9IL1wvdCzAAMADlC+kL8Qv5C/8LSQswADAAMAAwADAAMAAwADAAMAAHDDAAMAAwADAAMAAODBYMHgx1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1ACYMMAAwADAAdQB1AHUALgx1AHUAdQB1AHUAdQA2DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AD4MdQBGDHUAdQB1AHUAdQB1AEkMdQB1AHUAdQB1AFAMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQBYDHUAdQB1AF8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUA+wMVBGcMMAAwAHwBbwx1AHcMfwyHDI8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAYABgAJcMMAAwADAAdQB1AJ8MlQClDDAAMACtDCwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB7UMLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AA0EMAC9DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAsBywHLAcsBywHLAcsBywHLQcwAMEMyAwsBywHLAcsBywHLAcsBywHLAcsBywHzAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1ANQM2QzhDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMABgAGAAYABgAGAAYABgAOkMYADxDGAA+AwADQYNYABhCWAAYAAODTAAMAAwADAAFg1gAGAAHg37AzAAMAAwADAAYABgACYNYAAsDTQNPA1gAEMNPg1LDWAAYABgAGAAYABgAGAAYABgAGAAUg1aDYsGVglhDV0NcQBnDW0NdQ15DWAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAlQCBDZUAiA2PDZcNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAnw2nDTAAMAAwADAAMAAwAHUArw23DTAAMAAwADAAMAAwADAAMAAwADAAMAB1AL8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQDHDTAAYABgAM8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA1w11ANwNMAAwAD0B5A0wADAAMAAwADAAMADsDfQN/A0EDgwOFA4wABsOMAAwADAAMAAwADAAMAAwANIG0gbSBtIG0gbSBtIG0gYjDigOwQUuDsEFMw7SBjoO0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGQg5KDlIOVg7SBtIGXg5lDm0OdQ7SBtIGfQ6EDooOjQ6UDtIGmg6hDtIG0gaoDqwO0ga0DrwO0gZgAGAAYADEDmAAYAAkBtIGzA5gANIOYADaDokO0gbSBt8O5w7SBu8O0gb1DvwO0gZgAGAAxA7SBtIG0gbSBtIGYABgAGAAYAAED2AAsAUMD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHJA8sBywHLAcsBywHLAccDywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywPLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAc0D9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHPA/SBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gYUD0QPlQCVAJUAMAAwADAAMACVAJUAlQCVAJUAlQCVAEwPMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA//8EAAQABAAEAAQABAAEAAQABAANAAMAAQABAAIABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQACgATABcAHgAbABoAHgAXABYAEgAeABsAGAAPABgAHABLAEsASwBLAEsASwBLAEsASwBLABgAGAAeAB4AHgATAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAGwASAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWAA0AEQAeAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAFAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJABYAGgAbABsAGwAeAB0AHQAeAE8AFwAeAA0AHgAeABoAGwBPAE8ADgBQAB0AHQAdAE8ATwAXAE8ATwBPABYAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwBWAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsABAAbABsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEAA0ADQBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABABQACsAKwArACsAKwArACsAKwAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUAAaABoAUABQAFAAUABQAEwAHgAbAFAAHgAEACsAKwAEAAQABAArAFAAUABQAFAAUABQACsAKwArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQACsAUABQACsAKwAEACsABAAEAAQABAAEACsAKwArACsABAAEACsAKwAEAAQABAArACsAKwAEACsAKwArACsAKwArACsAUABQAFAAUAArAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAAQABABQAFAAUAAEAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAArACsAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AGwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAKwArACsAKwArAAQABAAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAAQAUAArAFAAUABQAFAAUABQACsAKwArAFAAUABQACsAUABQAFAAUAArACsAKwBQAFAAKwBQACsAUABQACsAKwArAFAAUAArACsAKwBQAFAAUAArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAArACsAKwAEAAQABAArAAQABAAEAAQAKwArAFAAKwArACsAKwArACsABAArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAHgAeAB4AHgAeAB4AGwAeACsAKwArACsAKwAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAUABQAFAAKwArACsAKwArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwAOAFAAUABQAFAAUABQAFAAHgBQAAQABAAEAA4AUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAKwArAAQAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAKwArACsAKwArACsAUAArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAXABcAFwAXABcACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAXAArAFwAXABcAFwAXABcAFwAXABcAFwAKgBcAFwAKgAqACoAKgAqACoAKgAqACoAXAArACsAXABcAFwAXABcACsAXAArACoAKgAqACoAKgAqACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwBcAFwAXABcAFAADgAOAA4ADgAeAA4ADgAJAA4ADgANAAkAEwATABMAEwATAAkAHgATAB4AHgAeAAQABAAeAB4AHgAeAB4AHgBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAADQAEAB4ABAAeAAQAFgARABYAEQAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAAQABAAEAAQADQAEAAQAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAA0ADQAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeACsAHgAeAA4ADgANAA4AHgAeAB4AHgAeAAkACQArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgBcAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4AHgAeAB4AXABcAFwAXABcAFwAKgAqACoAKgBcAFwAXABcACoAKgAqAFwAKgAqACoAXABcACoAKgAqACoAKgAqACoAXABcAFwAKgAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwAKgBLAEsASwBLAEsASwBLAEsASwBLACoAKgAqACoAKgAqAFAAUABQAFAAUABQACsAUAArACsAKwArACsAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAKwBQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsABAAEAAQAHgANAB4AHgAeAB4AHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUAArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWABEAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAANAA0AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUAArAAQABAArACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAA0ADQAVAFwADQAeAA0AGwBcACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwAeAB4AEwATAA0ADQAOAB4AEwATAB4ABAAEAAQACQArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAHgArACsAKwATABMASwBLAEsASwBLAEsASwBLAEsASwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAXABcAFwAXABcACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXAArACsAKwAqACoAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsAHgAeAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKwArAAQASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACoAKgAqACoAKgAqACoAXAAqACoAKgAqACoAKgArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABABQAFAAUABQAFAAUABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgANAA0ADQANAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwAeAB4AHgAeAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArAA0ADQANAA0ADQBLAEsASwBLAEsASwBLAEsASwBLACsAKwArAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUAAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAAQAUABQAFAAUABQAFAABABQAFAABAAEAAQAUAArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQACsAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQACsAKwAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQACsAHgAeAB4AHgAeAB4AHgAOAB4AKwANAA0ADQANAA0ADQANAAkADQANAA0ACAAEAAsABAAEAA0ACQANAA0ADAAdAB0AHgAXABcAFgAXABcAFwAWABcAHQAdAB4AHgAUABQAFAANAAEAAQAEAAQABAAEAAQACQAaABoAGgAaABoAGgAaABoAHgAXABcAHQAVABUAHgAeAB4AHgAeAB4AGAAWABEAFQAVABUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ADQAeAA0ADQANAA0AHgANAA0ADQAHAB4AHgAeAB4AKwAEAAQABAAEAAQABAAEAAQABAAEAFAAUAArACsATwBQAFAAUABQAFAAHgAeAB4AFgARAE8AUABPAE8ATwBPAFAAUABQAFAAUAAeAB4AHgAWABEAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArABsAGwAbABsAGwAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGgAbABsAGwAbABoAGwAbABoAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAFAAGgAeAB0AHgBQAB4AGgAeAB4AHgAeAB4AHgAeAB4AHgBPAB4AUAAbAB4AHgBQAFAAUABQAFAAHgAeAB4AHQAdAB4AUAAeAFAAHgBQAB4AUABPAFAAUAAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgBQAFAAUABQAE8ATwBQAFAAUABQAFAATwBQAFAATwBQAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAUABQAFAATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABPAB4AHgArACsAKwArAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAdAB4AHgAeAB0AHQAeAB4AHQAeAB4AHgAdAB4AHQAbABsAHgAdAB4AHgAeAB4AHQAeAB4AHQAdAB0AHQAeAB4AHQAeAB0AHgAdAB0AHQAdAB0AHQAeAB0AHgAeAB4AHgAeAB0AHQAdAB0AHgAeAB4AHgAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB0AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAdAB0AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHQAdAB0AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHQAdAB4AHgAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AJQAlAB0AHQAlAB4AJQAlACUAIAAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAeAB0AJQAdAB0AHgAdAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAdAB0AHQAdACUAHgAlACUAJQAdACUAJQAdAB0AHQAlACUAHQAdACUAHQAdACUAJQAlAB4AHQAeAB4AHgAeAB0AHQAlAB0AHQAdAB0AHQAdACUAJQAlACUAJQAdACUAJQAgACUAHQAdACUAJQAlACUAJQAlACUAJQAeAB4AHgAlACUAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AFwAXABcAFwAXABcAHgATABMAJQAeAB4AHgAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARABYAEQAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANAA0AHgANAB4ADQANAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwAlACUAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACsAKwArACsAKwArACsAKwArACsAKwArAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBPAE8ATwBPAE8ATwBPAE8AJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeAAQAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUABQAAQAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAUABQAFAAUABQAAQABAAEACsABAAEACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAKwBQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAA0ADQANAA0ADQANAA0ADQAeACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAArACsAKwArAFAAUABQAFAAUAANAA0ADQANAA0ADQAUACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQANAA0ADQANAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAANACsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAB4AHgAeAB4AHgArACsAKwArACsAKwAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANAFAABAAEAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAEAAQABAAEAB4ABAAEAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsABAAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLAA0ADQArAB4ABABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUAAeAFAAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAAEAAQADgANAA0AEwATAB4AHgAeAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAFAAUABQAFAABAAEACsAKwAEAA0ADQAeAFAAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcAFwADQANAA0AKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQAKwAEAAQAKwArAAQABAAEAAQAUAAEAFAABAAEAA0ADQANACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABABQAA4AUAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANAFAADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAaABoAGgAaAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAJAAkACQAJAAkACQAJABYAEQArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AHgAeACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAARwBHABUARwAJACsAKwArACsAKwArACsAKwArACsAKwAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAKwArACsAKwArACsAKwArACsAKwArACsAKwBRAFEAUQBRACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAHgAEAAQADQAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAeAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQAHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAKwArAFAAKwArAFAAUAArACsAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAHgAeAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeACsAKwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4ABAAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAHgAeAA0ADQANAA0AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArAAQABAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwBQAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArABsAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAB4AHgAeAB4ABAAEAAQABAAEAAQABABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArABYAFgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAGgBQAFAAUAAaAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUAArACsAKwArACsAKwBQACsAKwArACsAUAArAFAAKwBQACsAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUAArAFAAKwBQACsAUAArAFAAUAArAFAAKwArAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAKwBQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeACUAJQAlAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAHgAlACUAJQAlACUAIAAgACAAJQAlACAAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACEAIQAhACEAIQAlACUAIAAgACUAJQAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAlACUAJQAlACAAIAAgACUAIAAgACAAJQAlACUAJQAlACUAJQAgACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAlAB4AJQAeACUAJQAlACUAJQAgACUAJQAlACUAHgAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACAAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABcAFwAXABUAFQAVAB4AHgAeAB4AJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAgACUAJQAgACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAIAAgACUAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACAAIAAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACAAIAAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAA==",au=50,g_=1,Oh=2,Gh=3,m_=4,B_=5,ou=7,Vh=8,lu=9,tn=10,qo=11,cu=12,Zo=13,w_=14,Oi=15,jo=16,Yr=17,Ri=18,__=19,uu=20,$o=21,Li=22,Da=23,$n=24,Zt=25,Gi=26,Vi=27,ei=28,v_=29,yn=30,C_=31,Jr=32,qr=33,el=34,tl=35,Al=36,er=37,nl=38,ws=39,_s=40,Ha=41,kh=42,E_=43,x_=[9001,65288],Kh="!",Ke="×",Zr="÷",il=h_(p_),RA=[yn,Al],rl=[g_,Oh,Gh,B_],zh=[tn,Vh],hu=[Vi,Gi],U_=rl.concat(zh),fu=[nl,ws,_s,el,tl],y_=[Oi,Zo],S_=function(n,e){e===void 0&&(e="strict");var t=[],A=[],i=[];return n.forEach(function(r,s){var a=il.get(r);if(a>au?(i.push(!0),a-=au):i.push(!1),["normal","auto","loose"].indexOf(e)!==-1&&[8208,8211,12316,12448].indexOf(r)!==-1)return A.push(s),t.push(jo);if(a===m_||a===qo){if(s===0)return A.push(s),t.push(yn);var o=t[s-1];return U_.indexOf(o)===-1?(A.push(A[s-1]),t.push(o)):(A.push(s),t.push(yn))}if(A.push(s),a===C_)return t.push(e==="strict"?$o:er);if(a===kh||a===v_)return t.push(yn);if(a===E_)return r>=131072&&r<=196605||r>=196608&&r<=262141?t.push(er):t.push(yn);t.push(a)}),[A,t,i]},Pa=function(n,e,t,A){var i=A[t];if(Array.isArray(n)?n.indexOf(i)!==-1:n===i)for(var r=t;r<=A.length;){r++;var s=A[r];if(s===e)return!0;if(s!==tn)break}if(i===tn)for(var r=t;r>0;){r--;var a=A[r];if(Array.isArray(n)?n.indexOf(a)!==-1:n===a)for(var o=t;o<=A.length;){o++;var s=A[o];if(s===e)return!0;if(s!==tn)break}if(a!==tn)break}return!1},du=function(n,e){for(var t=n;t>=0;){var A=e[t];if(A===tn)t--;else return A}return 0},M_=function(n,e,t,A,i){if(t[A]===0)return Ke;var r=A-1;if(Array.isArray(i)&&i[r]===!0)return Ke;var s=r-1,a=r+1,o=e[r],l=s>=0?e[s]:0,c=e[a];if(o===Oh&&c===Gh)return Ke;if(rl.indexOf(o)!==-1)return Kh;if(rl.indexOf(c)!==-1||zh.indexOf(c)!==-1)return Ke;if(du(r,e)===Vh)return Zr;if(il.get(n[r])===qo||(o===Jr||o===qr)&&il.get(n[a])===qo||o===ou||c===ou||o===lu||[tn,Zo,Oi].indexOf(o)===-1&&c===lu||[Yr,Ri,__,$n,ei].indexOf(c)!==-1||du(r,e)===Li||Pa(Da,Li,r,e)||Pa([Yr,Ri],$o,r,e)||Pa(cu,cu,r,e))return Ke;if(o===tn)return Zr;if(o===Da||c===Da)return Ke;if(c===jo||o===jo)return Zr;if([Zo,Oi,$o].indexOf(c)!==-1||o===w_||l===Al&&y_.indexOf(o)!==-1||o===ei&&c===Al||c===uu||RA.indexOf(c)!==-1&&o===Zt||RA.indexOf(o)!==-1&&c===Zt||o===Vi&&[er,Jr,qr].indexOf(c)!==-1||[er,Jr,qr].indexOf(o)!==-1&&c===Gi||RA.indexOf(o)!==-1&&hu.indexOf(c)!==-1||hu.indexOf(o)!==-1&&RA.indexOf(c)!==-1||[Vi,Gi].indexOf(o)!==-1&&(c===Zt||[Li,Oi].indexOf(c)!==-1&&e[a+1]===Zt)||[Li,Oi].indexOf(o)!==-1&&c===Zt||o===Zt&&[Zt,ei,$n].indexOf(c)!==-1)return Ke;if([Zt,ei,$n,Yr,Ri].indexOf(c)!==-1)for(var u=r;u>=0;){var f=e[u];if(f===Zt)return Ke;if([ei,$n].indexOf(f)!==-1)u--;else break}if([Vi,Gi].indexOf(c)!==-1)for(var u=[Yr,Ri].indexOf(o)!==-1?s:r;u>=0;){var f=e[u];if(f===Zt)return Ke;if([ei,$n].indexOf(f)!==-1)u--;else break}if(nl===o&&[nl,ws,el,tl].indexOf(c)!==-1||[ws,el].indexOf(o)!==-1&&[ws,_s].indexOf(c)!==-1||[_s,tl].indexOf(o)!==-1&&c===_s||fu.indexOf(o)!==-1&&[uu,Gi].indexOf(c)!==-1||fu.indexOf(c)!==-1&&o===Vi||RA.indexOf(o)!==-1&&RA.indexOf(c)!==-1||o===$n&&RA.indexOf(c)!==-1||RA.concat(Zt).indexOf(o)!==-1&&c===Li&&x_.indexOf(n[a])===-1||RA.concat(Zt).indexOf(c)!==-1&&o===Ri)return Ke;if(o===Ha&&c===Ha){for(var p=t[r],g=1;p>0&&(p--,e[p]===Ha);)g++;if(g%2!==0)return Ke}return o===Jr&&c===qr?Ke:Zr},F_=function(n,e){e||(e={lineBreak:"normal",wordBreak:"normal"});var t=S_(n,e.lineBreak),A=t[0],i=t[1],r=t[2];(e.wordBreak==="break-all"||e.wordBreak==="break-word")&&(i=i.map(function(a){return[Zt,yn,kh].indexOf(a)!==-1?er:a}));var s=e.wordBreak==="keep-all"?r.map(function(a,o){return a&&n[o]>=19968&&n[o]<=40959}):void 0;return[A,i,s]},b_=(function(){function n(e,t,A,i){this.codePoints=e,this.required=t===Kh,this.start=A,this.end=i}return n.prototype.slice=function(){return gt.apply(void 0,this.codePoints.slice(this.start,this.end))},n})(),T_=function(n,e){var t=Ks(n),A=F_(t,e),i=A[0],r=A[1],s=A[2],a=t.length,o=0,l=0;return{next:function(){if(l>=a)return{done:!0,value:null};for(var c=Ke;l<a&&(c=M_(t,r,i,++l,s))===Ke;);if(c!==Ke||l===a){var u=new b_(t,c,o,l);return o=l,{value:u,done:!1}}return{done:!0,value:null}}}},Q_=1,I_=2,or=4,pu=8,Fs=10,gu=47,Xi=92,R_=9,L_=32,jr=34,Di=61,D_=35,H_=36,P_=37,$r=39,es=40,Hi=41,N_=95,Kt=45,O_=33,G_=60,V_=62,k_=64,K_=91,z_=93,W_=61,X_=123,ts=63,Y_=125,mu=124,J_=126,q_=128,Bu=65533,Na=42,Fn=43,Z_=44,j_=58,$_=59,tr=46,ev=0,tv=8,Av=11,nv=14,iv=31,rv=127,vA=-1,Wh=48,Xh=97,Yh=101,sv=102,av=117,ov=122,Jh=65,qh=69,Zh=70,lv=85,cv=90,Ht=function(n){return n>=Wh&&n<=57},uv=function(n){return n>=55296&&n<=57343},ti=function(n){return Ht(n)||n>=Jh&&n<=Zh||n>=Xh&&n<=sv},hv=function(n){return n>=Xh&&n<=ov},fv=function(n){return n>=Jh&&n<=cv},dv=function(n){return hv(n)||fv(n)},pv=function(n){return n>=q_},As=function(n){return n===Fs||n===R_||n===L_},bs=function(n){return dv(n)||pv(n)||n===N_},wu=function(n){return bs(n)||Ht(n)||n===Kt},gv=function(n){return n>=ev&&n<=tv||n===Av||n>=nv&&n<=iv||n===rv},$A=function(n,e){return n!==Xi?!1:e!==Fs},ns=function(n,e,t){return n===Kt?bs(e)||$A(e,t):bs(n)?!0:!!(n===Xi&&$A(n,e))},Oa=function(n,e,t){return n===Fn||n===Kt?Ht(e)?!0:e===tr&&Ht(t):Ht(n===tr?e:n)},mv=function(n){var e=0,t=1;(n[e]===Fn||n[e]===Kt)&&(n[e]===Kt&&(t=-1),e++);for(var A=[];Ht(n[e]);)A.push(n[e++]);var i=A.length?parseInt(gt.apply(void 0,A),10):0;n[e]===tr&&e++;for(var r=[];Ht(n[e]);)r.push(n[e++]);var s=r.length,a=s?parseInt(gt.apply(void 0,r),10):0;(n[e]===qh||n[e]===Yh)&&e++;var o=1;(n[e]===Fn||n[e]===Kt)&&(n[e]===Kt&&(o=-1),e++);for(var l=[];Ht(n[e]);)l.push(n[e++]);var c=l.length?parseInt(gt.apply(void 0,l),10):0;return t*(i+a*Math.pow(10,-s))*Math.pow(10,o*c)},Bv={type:2},wv={type:3},_v={type:4},vv={type:13},Cv={type:8},Ev={type:21},xv={type:9},Uv={type:10},yv={type:11},Sv={type:12},Mv={type:14},is={type:23},Fv={type:1},bv={type:25},Tv={type:24},Qv={type:26},Iv={type:27},Rv={type:28},Lv={type:29},Dv={type:31},sl={type:32},jh=(function(){function n(){this._value=[]}return n.prototype.write=function(e){this._value=this._value.concat(Ks(e))},n.prototype.read=function(){for(var e=[],t=this.consumeToken();t!==sl;)e.push(t),t=this.consumeToken();return e},n.prototype.consumeToken=function(){var e=this.consumeCodePoint();switch(e){case jr:return this.consumeStringToken(jr);case D_:var t=this.peekCodePoint(0),A=this.peekCodePoint(1),i=this.peekCodePoint(2);if(wu(t)||$A(A,i)){var r=ns(t,A,i)?I_:Q_,s=this.consumeName();return{type:5,value:s,flags:r}}break;case H_:if(this.peekCodePoint(0)===Di)return this.consumeCodePoint(),vv;break;case $r:return this.consumeStringToken($r);case es:return Bv;case Hi:return wv;case Na:if(this.peekCodePoint(0)===Di)return this.consumeCodePoint(),Mv;break;case Fn:if(Oa(e,this.peekCodePoint(0),this.peekCodePoint(1)))return this.reconsumeCodePoint(e),this.consumeNumericToken();break;case Z_:return _v;case Kt:var a=e,o=this.peekCodePoint(0),l=this.peekCodePoint(1);if(Oa(a,o,l))return this.reconsumeCodePoint(e),this.consumeNumericToken();if(ns(a,o,l))return this.reconsumeCodePoint(e),this.consumeIdentLikeToken();if(o===Kt&&l===V_)return this.consumeCodePoint(),this.consumeCodePoint(),Tv;break;case tr:if(Oa(e,this.peekCodePoint(0),this.peekCodePoint(1)))return this.reconsumeCodePoint(e),this.consumeNumericToken();break;case gu:if(this.peekCodePoint(0)===Na)for(this.consumeCodePoint();;){var c=this.consumeCodePoint();if(c===Na&&(c=this.consumeCodePoint(),c===gu))return this.consumeToken();if(c===vA)return this.consumeToken()}break;case j_:return Qv;case $_:return Iv;case G_:if(this.peekCodePoint(0)===O_&&this.peekCodePoint(1)===Kt&&this.peekCodePoint(2)===Kt)return this.consumeCodePoint(),this.consumeCodePoint(),bv;break;case k_:var u=this.peekCodePoint(0),f=this.peekCodePoint(1),p=this.peekCodePoint(2);if(ns(u,f,p)){var s=this.consumeName();return{type:7,value:s}}break;case K_:return Rv;case Xi:if($A(e,this.peekCodePoint(0)))return this.reconsumeCodePoint(e),this.consumeIdentLikeToken();break;case z_:return Lv;case W_:if(this.peekCodePoint(0)===Di)return this.consumeCodePoint(),Cv;break;case X_:return yv;case Y_:return Sv;case av:case lv:var g=this.peekCodePoint(0),m=this.peekCodePoint(1);return g===Fn&&(ti(m)||m===ts)&&(this.consumeCodePoint(),this.consumeUnicodeRangeToken()),this.reconsumeCodePoint(e),this.consumeIdentLikeToken();case mu:if(this.peekCodePoint(0)===Di)return this.consumeCodePoint(),xv;if(this.peekCodePoint(0)===mu)return this.consumeCodePoint(),Ev;break;case J_:if(this.peekCodePoint(0)===Di)return this.consumeCodePoint(),Uv;break;case vA:return sl}return As(e)?(this.consumeWhiteSpace(),Dv):Ht(e)?(this.reconsumeCodePoint(e),this.consumeNumericToken()):bs(e)?(this.reconsumeCodePoint(e),this.consumeIdentLikeToken()):{type:6,value:gt(e)}},n.prototype.consumeCodePoint=function(){var e=this._value.shift();return typeof e>"u"?-1:e},n.prototype.reconsumeCodePoint=function(e){this._value.unshift(e)},n.prototype.peekCodePoint=function(e){return e>=this._value.length?-1:this._value[e]},n.prototype.consumeUnicodeRangeToken=function(){for(var e=[],t=this.consumeCodePoint();ti(t)&&e.length<6;)e.push(t),t=this.consumeCodePoint();for(var A=!1;t===ts&&e.length<6;)e.push(t),t=this.consumeCodePoint(),A=!0;if(A){var i=parseInt(gt.apply(void 0,e.map(function(o){return o===ts?Wh:o})),16),r=parseInt(gt.apply(void 0,e.map(function(o){return o===ts?Zh:o})),16);return{type:30,start:i,end:r}}var s=parseInt(gt.apply(void 0,e),16);if(this.peekCodePoint(0)===Kt&&ti(this.peekCodePoint(1))){this.consumeCodePoint(),t=this.consumeCodePoint();for(var a=[];ti(t)&&a.length<6;)a.push(t),t=this.consumeCodePoint();var r=parseInt(gt.apply(void 0,a),16);return{type:30,start:s,end:r}}else return{type:30,start:s,end:s}},n.prototype.consumeIdentLikeToken=function(){var e=this.consumeName();return e.toLowerCase()==="url"&&this.peekCodePoint(0)===es?(this.consumeCodePoint(),this.consumeUrlToken()):this.peekCodePoint(0)===es?(this.consumeCodePoint(),{type:19,value:e}):{type:20,value:e}},n.prototype.consumeUrlToken=function(){var e=[];if(this.consumeWhiteSpace(),this.peekCodePoint(0)===vA)return{type:22,value:""};var t=this.peekCodePoint(0);if(t===$r||t===jr){var A=this.consumeStringToken(this.consumeCodePoint());return A.type===0&&(this.consumeWhiteSpace(),this.peekCodePoint(0)===vA||this.peekCodePoint(0)===Hi)?(this.consumeCodePoint(),{type:22,value:A.value}):(this.consumeBadUrlRemnants(),is)}for(;;){var i=this.consumeCodePoint();if(i===vA||i===Hi)return{type:22,value:gt.apply(void 0,e)};if(As(i))return this.consumeWhiteSpace(),this.peekCodePoint(0)===vA||this.peekCodePoint(0)===Hi?(this.consumeCodePoint(),{type:22,value:gt.apply(void 0,e)}):(this.consumeBadUrlRemnants(),is);if(i===jr||i===$r||i===es||gv(i))return this.consumeBadUrlRemnants(),is;if(i===Xi)if($A(i,this.peekCodePoint(0)))e.push(this.consumeEscapedCodePoint());else return this.consumeBadUrlRemnants(),is;else e.push(i)}},n.prototype.consumeWhiteSpace=function(){for(;As(this.peekCodePoint(0));)this.consumeCodePoint()},n.prototype.consumeBadUrlRemnants=function(){for(;;){var e=this.consumeCodePoint();if(e===Hi||e===vA)return;$A(e,this.peekCodePoint(0))&&this.consumeEscapedCodePoint()}},n.prototype.consumeStringSlice=function(e){for(var t=5e4,A="";e>0;){var i=Math.min(t,e);A+=gt.apply(void 0,this._value.splice(0,i)),e-=i}return this._value.shift(),A},n.prototype.consumeStringToken=function(e){var t="",A=0;do{var i=this._value[A];if(i===vA||i===void 0||i===e)return t+=this.consumeStringSlice(A),{type:0,value:t};if(i===Fs)return this._value.splice(0,A),Fv;if(i===Xi){var r=this._value[A+1];r!==vA&&r!==void 0&&(r===Fs?(t+=this.consumeStringSlice(A),A=-1,this._value.shift()):$A(i,r)&&(t+=this.consumeStringSlice(A),t+=gt(this.consumeEscapedCodePoint()),A=-1))}A++}while(!0)},n.prototype.consumeNumber=function(){var e=[],t=or,A=this.peekCodePoint(0);for((A===Fn||A===Kt)&&e.push(this.consumeCodePoint());Ht(this.peekCodePoint(0));)e.push(this.consumeCodePoint());A=this.peekCodePoint(0);var i=this.peekCodePoint(1);if(A===tr&&Ht(i))for(e.push(this.consumeCodePoint(),this.consumeCodePoint()),t=pu;Ht(this.peekCodePoint(0));)e.push(this.consumeCodePoint());A=this.peekCodePoint(0),i=this.peekCodePoint(1);var r=this.peekCodePoint(2);if((A===qh||A===Yh)&&((i===Fn||i===Kt)&&Ht(r)||Ht(i)))for(e.push(this.consumeCodePoint(),this.consumeCodePoint()),t=pu;Ht(this.peekCodePoint(0));)e.push(this.consumeCodePoint());return[mv(e),t]},n.prototype.consumeNumericToken=function(){var e=this.consumeNumber(),t=e[0],A=e[1],i=this.peekCodePoint(0),r=this.peekCodePoint(1),s=this.peekCodePoint(2);if(ns(i,r,s)){var a=this.consumeName();return{type:15,number:t,flags:A,unit:a}}return i===P_?(this.consumeCodePoint(),{type:16,number:t,flags:A}):{type:17,number:t,flags:A}},n.prototype.consumeEscapedCodePoint=function(){var e=this.consumeCodePoint();if(ti(e)){for(var t=gt(e);ti(this.peekCodePoint(0))&&t.length<6;)t+=gt(this.consumeCodePoint());As(this.peekCodePoint(0))&&this.consumeCodePoint();var A=parseInt(t,16);return A===0||uv(A)||A>1114111?Bu:A}return e===vA?Bu:e},n.prototype.consumeName=function(){for(var e="";;){var t=this.consumeCodePoint();if(wu(t))e+=gt(t);else if($A(t,this.peekCodePoint(0)))e+=gt(this.consumeEscapedCodePoint());else return this.reconsumeCodePoint(t),e}},n})(),$h=(function(){function n(e){this._tokens=e}return n.create=function(e){var t=new jh;return t.write(e),new n(t.read())},n.parseValue=function(e){return n.create(e).parseComponentValue()},n.parseValues=function(e){return n.create(e).parseComponentValues()},n.prototype.parseComponentValue=function(){for(var e=this.consumeToken();e.type===31;)e=this.consumeToken();if(e.type===32)throw new SyntaxError("Error parsing CSS component value, unexpected EOF");this.reconsumeToken(e);var t=this.consumeComponentValue();do e=this.consumeToken();while(e.type===31);if(e.type===32)return t;throw new SyntaxError("Error parsing CSS component value, multiple values found when expecting only one")},n.prototype.parseComponentValues=function(){for(var e=[];;){var t=this.consumeComponentValue();if(t.type===32)return e;e.push(t),e.push()}},n.prototype.consumeComponentValue=function(){var e=this.consumeToken();switch(e.type){case 11:case 28:case 2:return this.consumeSimpleBlock(e.type);case 19:return this.consumeFunction(e)}return e},n.prototype.consumeSimpleBlock=function(e){for(var t={type:e,values:[]},A=this.consumeToken();;){if(A.type===32||Pv(A,e))return t;this.reconsumeToken(A),t.values.push(this.consumeComponentValue()),A=this.consumeToken()}},n.prototype.consumeFunction=function(e){for(var t={name:e.value,values:[],type:18};;){var A=this.consumeToken();if(A.type===32||A.type===3)return t;this.reconsumeToken(A),t.values.push(this.consumeComponentValue())}},n.prototype.consumeToken=function(){var e=this._tokens.shift();return typeof e>"u"?sl:e},n.prototype.reconsumeToken=function(e){this._tokens.unshift(e)},n})(),lr=function(n){return n.type===15},yi=function(n){return n.type===17},it=function(n){return n.type===20},Hv=function(n){return n.type===0},al=function(n,e){return it(n)&&n.value===e},ef=function(n){return n.type!==31},xi=function(n){return n.type!==31&&n.type!==4},yA=function(n){var e=[],t=[];return n.forEach(function(A){if(A.type===4){if(t.length===0)throw new Error("Error parsing function args, zero tokens for arg");e.push(t),t=[];return}A.type!==31&&t.push(A)}),t.length&&e.push(t),e},Pv=function(n,e){return e===11&&n.type===12||e===28&&n.type===29?!0:e===2&&n.type===3},un=function(n){return n.type===17||n.type===15},_t=function(n){return n.type===16||un(n)},tf=function(n){return n.length>1?[n[0],n[1]]:[n[0]]},bt={type:17,number:0,flags:or},Ql={type:16,number:50,flags:or},An={type:16,number:100,flags:or},ki=function(n,e,t){var A=n[0],i=n[1];return[st(A,e),st(typeof i<"u"?i:A,t)]},st=function(n,e){if(n.type===16)return n.number/100*e;if(lr(n))switch(n.unit){case"rem":case"em":return 16*n.number;case"px":default:return n.number}return n.number},Af="deg",nf="grad",rf="rad",sf="turn",zs={name:"angle",parse:function(n,e){if(e.type===15)switch(e.unit){case Af:return Math.PI*e.number/180;case nf:return Math.PI/200*e.number;case rf:return e.number;case sf:return Math.PI*2*e.number}throw new Error("Unsupported angle type")}},af=function(n){return n.type===15&&(n.unit===Af||n.unit===nf||n.unit===rf||n.unit===sf)},of=function(n){var e=n.filter(it).map(function(t){return t.value}).join(" ");switch(e){case"to bottom right":case"to right bottom":case"left top":case"top left":return[bt,bt];case"to top":case"bottom":return oA(0);case"to bottom left":case"to left bottom":case"right top":case"top right":return[bt,An];case"to right":case"left":return oA(90);case"to top left":case"to left top":case"right bottom":case"bottom right":return[An,An];case"to bottom":case"top":return oA(180);case"to top right":case"to right top":case"left bottom":case"bottom left":return[An,bt];case"to left":case"right":return oA(270)}return 0},oA=function(n){return Math.PI*n/180},an={name:"color",parse:function(n,e){if(e.type===18){var t=Nv[e.name];if(typeof t>"u")throw new Error('Attempting to parse an unsupported color function "'+e.name+'"');return t(n,e.values)}if(e.type===5){if(e.value.length===3){var A=e.value.substring(0,1),i=e.value.substring(1,2),r=e.value.substring(2,3);return nn(parseInt(A+A,16),parseInt(i+i,16),parseInt(r+r,16),1)}if(e.value.length===4){var A=e.value.substring(0,1),i=e.value.substring(1,2),r=e.value.substring(2,3),s=e.value.substring(3,4);return nn(parseInt(A+A,16),parseInt(i+i,16),parseInt(r+r,16),parseInt(s+s,16)/255)}if(e.value.length===6){var A=e.value.substring(0,2),i=e.value.substring(2,4),r=e.value.substring(4,6);return nn(parseInt(A,16),parseInt(i,16),parseInt(r,16),1)}if(e.value.length===8){var A=e.value.substring(0,2),i=e.value.substring(2,4),r=e.value.substring(4,6),s=e.value.substring(6,8);return nn(parseInt(A,16),parseInt(i,16),parseInt(r,16),parseInt(s,16)/255)}}if(e.type===20){var a=OA[e.value.toUpperCase()];if(typeof a<"u")return a}return OA.TRANSPARENT}},on=function(n){return(255&n)===0},yt=function(n){var e=255&n,t=255&n>>8,A=255&n>>16,i=255&n>>24;return e<255?"rgba("+i+","+A+","+t+","+e/255+")":"rgb("+i+","+A+","+t+")"},nn=function(n,e,t,A){return(n<<24|e<<16|t<<8|Math.round(A*255)<<0)>>>0},_u=function(n,e){if(n.type===17)return n.number;if(n.type===16){var t=e===3?1:255;return e===3?n.number/100*t:Math.round(n.number/100*t)}return 0},vu=function(n,e){var t=e.filter(xi);if(t.length===3){var A=t.map(_u),i=A[0],r=A[1],s=A[2];return nn(i,r,s,1)}if(t.length===4){var a=t.map(_u),i=a[0],r=a[1],s=a[2],o=a[3];return nn(i,r,s,o)}return 0};function Ga(n,e,t){return t<0&&(t+=1),t>=1&&(t-=1),t<1/6?(e-n)*t*6+n:t<1/2?e:t<2/3?(e-n)*6*(2/3-t)+n:n}var Cu=function(n,e){var t=e.filter(xi),A=t[0],i=t[1],r=t[2],s=t[3],a=(A.type===17?oA(A.number):zs.parse(n,A))/(Math.PI*2),o=_t(i)?i.number/100:0,l=_t(r)?r.number/100:0,c=typeof s<"u"&&_t(s)?st(s,1):1;if(o===0)return nn(l*255,l*255,l*255,1);var u=l<=.5?l*(o+1):l+o-l*o,f=l*2-u,p=Ga(f,u,a+1/3),g=Ga(f,u,a),m=Ga(f,u,a-1/3);return nn(p*255,g*255,m*255,c)},Nv={hsl:Cu,hsla:Cu,rgb:vu,rgba:vu},Yi=function(n,e){return an.parse(n,$h.create(e).parseComponentValue())},OA={ALICEBLUE:4042850303,ANTIQUEWHITE:4209760255,AQUA:16777215,AQUAMARINE:2147472639,AZURE:4043309055,BEIGE:4126530815,BISQUE:4293182719,BLACK:255,BLANCHEDALMOND:4293643775,BLUE:65535,BLUEVIOLET:2318131967,BROWN:2771004159,BURLYWOOD:3736635391,CADETBLUE:1604231423,CHARTREUSE:2147418367,CHOCOLATE:3530104575,CORAL:4286533887,CORNFLOWERBLUE:1687547391,CORNSILK:4294499583,CRIMSON:3692313855,CYAN:16777215,DARKBLUE:35839,DARKCYAN:9145343,DARKGOLDENROD:3095837695,DARKGRAY:2846468607,DARKGREEN:6553855,DARKGREY:2846468607,DARKKHAKI:3182914559,DARKMAGENTA:2332068863,DARKOLIVEGREEN:1433087999,DARKORANGE:4287365375,DARKORCHID:2570243327,DARKRED:2332033279,DARKSALMON:3918953215,DARKSEAGREEN:2411499519,DARKSLATEBLUE:1211993087,DARKSLATEGRAY:793726975,DARKSLATEGREY:793726975,DARKTURQUOISE:13554175,DARKVIOLET:2483082239,DEEPPINK:4279538687,DEEPSKYBLUE:12582911,DIMGRAY:1768516095,DIMGREY:1768516095,DODGERBLUE:512819199,FIREBRICK:2988581631,FLORALWHITE:4294635775,FORESTGREEN:579543807,FUCHSIA:4278255615,GAINSBORO:3705462015,GHOSTWHITE:4177068031,GOLD:4292280575,GOLDENROD:3668254975,GRAY:2155905279,GREEN:8388863,GREENYELLOW:2919182335,GREY:2155905279,HONEYDEW:4043305215,HOTPINK:4285117695,INDIANRED:3445382399,INDIGO:1258324735,IVORY:4294963455,KHAKI:4041641215,LAVENDER:3873897215,LAVENDERBLUSH:4293981695,LAWNGREEN:2096890111,LEMONCHIFFON:4294626815,LIGHTBLUE:2916673279,LIGHTCORAL:4034953471,LIGHTCYAN:3774873599,LIGHTGOLDENRODYELLOW:4210742015,LIGHTGRAY:3553874943,LIGHTGREEN:2431553791,LIGHTGREY:3553874943,LIGHTPINK:4290167295,LIGHTSALMON:4288707327,LIGHTSEAGREEN:548580095,LIGHTSKYBLUE:2278488831,LIGHTSLATEGRAY:2005441023,LIGHTSLATEGREY:2005441023,LIGHTSTEELBLUE:2965692159,LIGHTYELLOW:4294959359,LIME:16711935,LIMEGREEN:852308735,LINEN:4210091775,MAGENTA:4278255615,MAROON:2147483903,MEDIUMAQUAMARINE:1724754687,MEDIUMBLUE:52735,MEDIUMORCHID:3126187007,MEDIUMPURPLE:2473647103,MEDIUMSEAGREEN:1018393087,MEDIUMSLATEBLUE:2070474495,MEDIUMSPRINGGREEN:16423679,MEDIUMTURQUOISE:1221709055,MEDIUMVIOLETRED:3340076543,MIDNIGHTBLUE:421097727,MINTCREAM:4127193855,MISTYROSE:4293190143,MOCCASIN:4293178879,NAVAJOWHITE:4292783615,NAVY:33023,OLDLACE:4260751103,OLIVE:2155872511,OLIVEDRAB:1804477439,ORANGE:4289003775,ORANGERED:4282712319,ORCHID:3664828159,PALEGOLDENROD:4008225535,PALEGREEN:2566625535,PALETURQUOISE:2951671551,PALEVIOLETRED:3681588223,PAPAYAWHIP:4293907967,PEACHPUFF:4292524543,PERU:3448061951,PINK:4290825215,PLUM:3718307327,POWDERBLUE:2967529215,PURPLE:2147516671,REBECCAPURPLE:1714657791,RED:4278190335,ROSYBROWN:3163525119,ROYALBLUE:1097458175,SADDLEBROWN:2336560127,SALMON:4202722047,SANDYBROWN:4104413439,SEAGREEN:780883967,SEASHELL:4294307583,SIENNA:2689740287,SILVER:3233857791,SKYBLUE:2278484991,SLATEBLUE:1784335871,SLATEGRAY:1887473919,SLATEGREY:1887473919,SNOW:4294638335,SPRINGGREEN:16744447,STEELBLUE:1182971135,TAN:3535047935,TEAL:8421631,THISTLE:3636451583,TOMATO:4284696575,TRANSPARENT:0,TURQUOISE:1088475391,VIOLET:4001558271,WHEAT:4125012991,WHITE:4294967295,WHITESMOKE:4126537215,YELLOW:4294902015,YELLOWGREEN:2597139199},Ov={name:"background-clip",initialValue:"border-box",prefix:!1,type:1,parse:function(n,e){return e.map(function(t){if(it(t))switch(t.value){case"padding-box":return 1;case"content-box":return 2}return 0})}},Gv={name:"background-color",initialValue:"transparent",prefix:!1,type:3,format:"color"},Ws=function(n,e){var t=an.parse(n,e[0]),A=e[1];return A&&_t(A)?{color:t,stop:A}:{color:t,stop:null}},Eu=function(n,e){var t=n[0],A=n[n.length-1];t.stop===null&&(t.stop=bt),A.stop===null&&(A.stop=An);for(var i=[],r=0,s=0;s<n.length;s++){var a=n[s].stop;if(a!==null){var o=st(a,e);o>r?i.push(o):i.push(r),r=o}else i.push(null)}for(var l=null,s=0;s<i.length;s++){var c=i[s];if(c===null)l===null&&(l=s);else if(l!==null){for(var u=s-l,f=i[l-1],p=(c-f)/(u+1),g=1;g<=u;g++)i[l+g-1]=p*g;l=null}}return n.map(function(m,d){var h=m.color;return{color:h,stop:Math.max(Math.min(1,i[d]/e),0)}})},Vv=function(n,e,t){var A=e/2,i=t/2,r=st(n[0],e)-A,s=i-st(n[1],t);return(Math.atan2(s,r)+Math.PI*2)%(Math.PI*2)},kv=function(n,e,t){var A=typeof n=="number"?n:Vv(n,e,t),i=Math.abs(e*Math.sin(A))+Math.abs(t*Math.cos(A)),r=e/2,s=t/2,a=i/2,o=Math.sin(A-Math.PI/2)*a,l=Math.cos(A-Math.PI/2)*a;return[i,r-l,r+l,s-o,s+o]},pA=function(n,e){return Math.sqrt(n*n+e*e)},xu=function(n,e,t,A,i){var r=[[0,0],[0,e],[n,0],[n,e]];return r.reduce(function(s,a){var o=a[0],l=a[1],c=pA(t-o,A-l);return(i?c<s.optimumDistance:c>s.optimumDistance)?{optimumCorner:a,optimumDistance:c}:s},{optimumDistance:i?1/0:-1/0,optimumCorner:null}).optimumCorner},Kv=function(n,e,t,A,i){var r=0,s=0;switch(n.size){case 0:n.shape===0?r=s=Math.min(Math.abs(e),Math.abs(e-A),Math.abs(t),Math.abs(t-i)):n.shape===1&&(r=Math.min(Math.abs(e),Math.abs(e-A)),s=Math.min(Math.abs(t),Math.abs(t-i)));break;case 2:if(n.shape===0)r=s=Math.min(pA(e,t),pA(e,t-i),pA(e-A,t),pA(e-A,t-i));else if(n.shape===1){var a=Math.min(Math.abs(t),Math.abs(t-i))/Math.min(Math.abs(e),Math.abs(e-A)),o=xu(A,i,e,t,!0),l=o[0],c=o[1];r=pA(l-e,(c-t)/a),s=a*r}break;case 1:n.shape===0?r=s=Math.max(Math.abs(e),Math.abs(e-A),Math.abs(t),Math.abs(t-i)):n.shape===1&&(r=Math.max(Math.abs(e),Math.abs(e-A)),s=Math.max(Math.abs(t),Math.abs(t-i)));break;case 3:if(n.shape===0)r=s=Math.max(pA(e,t),pA(e,t-i),pA(e-A,t),pA(e-A,t-i));else if(n.shape===1){var a=Math.max(Math.abs(t),Math.abs(t-i))/Math.max(Math.abs(e),Math.abs(e-A)),u=xu(A,i,e,t,!1),l=u[0],c=u[1];r=pA(l-e,(c-t)/a),s=a*r}break}return Array.isArray(n.size)&&(r=st(n.size[0],A),s=n.size.length===2?st(n.size[1],i):r),[r,s]},zv=function(n,e){var t=oA(180),A=[];return yA(e).forEach(function(i,r){if(r===0){var s=i[0];if(s.type===20&&s.value==="to"){t=of(i);return}else if(af(s)){t=zs.parse(n,s);return}}var a=Ws(n,i);A.push(a)}),{angle:t,stops:A,type:1}},rs=function(n,e){var t=oA(180),A=[];return yA(e).forEach(function(i,r){if(r===0){var s=i[0];if(s.type===20&&["top","left","right","bottom"].indexOf(s.value)!==-1){t=of(i);return}else if(af(s)){t=(zs.parse(n,s)+oA(270))%oA(360);return}}var a=Ws(n,i);A.push(a)}),{angle:t,stops:A,type:1}},Wv=function(n,e){var t=oA(180),A=[],i=1,r=0,s=3,a=[];return yA(e).forEach(function(o,l){var c=o[0];if(l===0){if(it(c)&&c.value==="linear"){i=1;return}else if(it(c)&&c.value==="radial"){i=2;return}}if(c.type===18){if(c.name==="from"){var u=an.parse(n,c.values[0]);A.push({stop:bt,color:u})}else if(c.name==="to"){var u=an.parse(n,c.values[0]);A.push({stop:An,color:u})}else if(c.name==="color-stop"){var f=c.values.filter(xi);if(f.length===2){var u=an.parse(n,f[1]),p=f[0];yi(p)&&A.push({stop:{type:16,number:p.number*100,flags:p.flags},color:u})}}}}),i===1?{angle:(t+oA(180))%oA(360),stops:A,type:i}:{size:s,shape:r,stops:A,position:a,type:i}},lf="closest-side",cf="farthest-side",uf="closest-corner",hf="farthest-corner",ff="circle",df="ellipse",pf="cover",gf="contain",Xv=function(n,e){var t=0,A=3,i=[],r=[];return yA(e).forEach(function(s,a){var o=!0;if(a===0){var l=!1;o=s.reduce(function(u,f){if(l)if(it(f))switch(f.value){case"center":return r.push(Ql),u;case"top":case"left":return r.push(bt),u;case"right":case"bottom":return r.push(An),u}else(_t(f)||un(f))&&r.push(f);else if(it(f))switch(f.value){case ff:return t=0,!1;case df:return t=1,!1;case"at":return l=!0,!1;case lf:return A=0,!1;case pf:case cf:return A=1,!1;case gf:case uf:return A=2,!1;case hf:return A=3,!1}else if(un(f)||_t(f))return Array.isArray(A)||(A=[]),A.push(f),!1;return u},o)}if(o){var c=Ws(n,s);i.push(c)}}),{size:A,shape:t,stops:i,position:r,type:2}},ss=function(n,e){var t=0,A=3,i=[],r=[];return yA(e).forEach(function(s,a){var o=!0;if(a===0?o=s.reduce(function(c,u){if(it(u))switch(u.value){case"center":return r.push(Ql),!1;case"top":case"left":return r.push(bt),!1;case"right":case"bottom":return r.push(An),!1}else if(_t(u)||un(u))return r.push(u),!1;return c},o):a===1&&(o=s.reduce(function(c,u){if(it(u))switch(u.value){case ff:return t=0,!1;case df:return t=1,!1;case gf:case lf:return A=0,!1;case cf:return A=1,!1;case uf:return A=2,!1;case pf:case hf:return A=3,!1}else if(un(u)||_t(u))return Array.isArray(A)||(A=[]),A.push(u),!1;return c},o)),o){var l=Ws(n,s);i.push(l)}}),{size:A,shape:t,stops:i,position:r,type:2}},Yv=function(n){return n.type===1},Jv=function(n){return n.type===2},Il={name:"image",parse:function(n,e){if(e.type===22){var t={url:e.value,type:0};return n.cache.addImage(e.value),t}if(e.type===18){var A=mf[e.name];if(typeof A>"u")throw new Error('Attempting to parse an unsupported image function "'+e.name+'"');return A(n,e.values)}throw new Error("Unsupported image type "+e.type)}};function qv(n){return!(n.type===20&&n.value==="none")&&(n.type!==18||!!mf[n.name])}var mf={"linear-gradient":zv,"-moz-linear-gradient":rs,"-ms-linear-gradient":rs,"-o-linear-gradient":rs,"-webkit-linear-gradient":rs,"radial-gradient":Xv,"-moz-radial-gradient":ss,"-ms-radial-gradient":ss,"-o-radial-gradient":ss,"-webkit-radial-gradient":ss,"-webkit-gradient":Wv},Zv={name:"background-image",initialValue:"none",type:1,prefix:!1,parse:function(n,e){if(e.length===0)return[];var t=e[0];return t.type===20&&t.value==="none"?[]:e.filter(function(A){return xi(A)&&qv(A)}).map(function(A){return Il.parse(n,A)})}},jv={name:"background-origin",initialValue:"border-box",prefix:!1,type:1,parse:function(n,e){return e.map(function(t){if(it(t))switch(t.value){case"padding-box":return 1;case"content-box":return 2}return 0})}},$v={name:"background-position",initialValue:"0% 0%",type:1,prefix:!1,parse:function(n,e){return yA(e).map(function(t){return t.filter(_t)}).map(tf)}},eC={name:"background-repeat",initialValue:"repeat",prefix:!1,type:1,parse:function(n,e){return yA(e).map(function(t){return t.filter(it).map(function(A){return A.value}).join(" ")}).map(tC)}},tC=function(n){switch(n){case"no-repeat":return 1;case"repeat-x":case"repeat no-repeat":return 2;case"repeat-y":case"no-repeat repeat":return 3;case"repeat":default:return 0}},gi;(function(n){n.AUTO="auto",n.CONTAIN="contain",n.COVER="cover"})(gi||(gi={}));var AC={name:"background-size",initialValue:"0",prefix:!1,type:1,parse:function(n,e){return yA(e).map(function(t){return t.filter(nC)})}},nC=function(n){return it(n)||_t(n)},Xs=function(n){return{name:"border-"+n+"-color",initialValue:"transparent",prefix:!1,type:3,format:"color"}},iC=Xs("top"),rC=Xs("right"),sC=Xs("bottom"),aC=Xs("left"),Ys=function(n){return{name:"border-radius-"+n,initialValue:"0 0",prefix:!1,type:1,parse:function(e,t){return tf(t.filter(_t))}}},oC=Ys("top-left"),lC=Ys("top-right"),cC=Ys("bottom-right"),uC=Ys("bottom-left"),Js=function(n){return{name:"border-"+n+"-style",initialValue:"solid",prefix:!1,type:2,parse:function(e,t){switch(t){case"none":return 0;case"dashed":return 2;case"dotted":return 3;case"double":return 4}return 1}}},hC=Js("top"),fC=Js("right"),dC=Js("bottom"),pC=Js("left"),qs=function(n){return{name:"border-"+n+"-width",initialValue:"0",type:0,prefix:!1,parse:function(e,t){return lr(t)?t.number:0}}},gC=qs("top"),mC=qs("right"),BC=qs("bottom"),wC=qs("left"),_C={name:"color",initialValue:"transparent",prefix:!1,type:3,format:"color"},vC={name:"direction",initialValue:"ltr",prefix:!1,type:2,parse:function(n,e){switch(e){case"rtl":return 1;case"ltr":default:return 0}}},CC={name:"display",initialValue:"inline-block",prefix:!1,type:1,parse:function(n,e){return e.filter(it).reduce(function(t,A){return t|EC(A.value)},0)}},EC=function(n){switch(n){case"block":case"-webkit-box":return 2;case"inline":return 4;case"run-in":return 8;case"flow":return 16;case"flow-root":return 32;case"table":return 64;case"flex":case"-webkit-flex":return 128;case"grid":case"-ms-grid":return 256;case"ruby":return 512;case"subgrid":return 1024;case"list-item":return 2048;case"table-row-group":return 4096;case"table-header-group":return 8192;case"table-footer-group":return 16384;case"table-row":return 32768;case"table-cell":return 65536;case"table-column-group":return 131072;case"table-column":return 262144;case"table-caption":return 524288;case"ruby-base":return 1048576;case"ruby-text":return 2097152;case"ruby-base-container":return 4194304;case"ruby-text-container":return 8388608;case"contents":return 16777216;case"inline-block":return 33554432;case"inline-list-item":return 67108864;case"inline-table":return 134217728;case"inline-flex":return 268435456;case"inline-grid":return 536870912}return 0},xC={name:"float",initialValue:"none",prefix:!1,type:2,parse:function(n,e){switch(e){case"left":return 1;case"right":return 2;case"inline-start":return 3;case"inline-end":return 4}return 0}},UC={name:"letter-spacing",initialValue:"0",prefix:!1,type:0,parse:function(n,e){return e.type===20&&e.value==="normal"?0:e.type===17||e.type===15?e.number:0}},Ts;(function(n){n.NORMAL="normal",n.STRICT="strict"})(Ts||(Ts={}));var yC={name:"line-break",initialValue:"normal",prefix:!1,type:2,parse:function(n,e){switch(e){case"strict":return Ts.STRICT;case"normal":default:return Ts.NORMAL}}},SC={name:"line-height",initialValue:"normal",prefix:!1,type:4},Uu=function(n,e){return it(n)&&n.value==="normal"?1.2*e:n.type===17?e*n.number:_t(n)?st(n,e):e},MC={name:"list-style-image",initialValue:"none",type:0,prefix:!1,parse:function(n,e){return e.type===20&&e.value==="none"?null:Il.parse(n,e)}},FC={name:"list-style-position",initialValue:"outside",prefix:!1,type:2,parse:function(n,e){switch(e){case"inside":return 0;case"outside":default:return 1}}},ol={name:"list-style-type",initialValue:"none",prefix:!1,type:2,parse:function(n,e){switch(e){case"disc":return 0;case"circle":return 1;case"square":return 2;case"decimal":return 3;case"cjk-decimal":return 4;case"decimal-leading-zero":return 5;case"lower-roman":return 6;case"upper-roman":return 7;case"lower-greek":return 8;case"lower-alpha":return 9;case"upper-alpha":return 10;case"arabic-indic":return 11;case"armenian":return 12;case"bengali":return 13;case"cambodian":return 14;case"cjk-earthly-branch":return 15;case"cjk-heavenly-stem":return 16;case"cjk-ideographic":return 17;case"devanagari":return 18;case"ethiopic-numeric":return 19;case"georgian":return 20;case"gujarati":return 21;case"gurmukhi":return 22;case"hebrew":return 22;case"hiragana":return 23;case"hiragana-iroha":return 24;case"japanese-formal":return 25;case"japanese-informal":return 26;case"kannada":return 27;case"katakana":return 28;case"katakana-iroha":return 29;case"khmer":return 30;case"korean-hangul-formal":return 31;case"korean-hanja-formal":return 32;case"korean-hanja-informal":return 33;case"lao":return 34;case"lower-armenian":return 35;case"malayalam":return 36;case"mongolian":return 37;case"myanmar":return 38;case"oriya":return 39;case"persian":return 40;case"simp-chinese-formal":return 41;case"simp-chinese-informal":return 42;case"tamil":return 43;case"telugu":return 44;case"thai":return 45;case"tibetan":return 46;case"trad-chinese-formal":return 47;case"trad-chinese-informal":return 48;case"upper-armenian":return 49;case"disclosure-open":return 50;case"disclosure-closed":return 51;case"none":default:return-1}}},Zs=function(n){return{name:"margin-"+n,initialValue:"0",prefix:!1,type:4}},bC=Zs("top"),TC=Zs("right"),QC=Zs("bottom"),IC=Zs("left"),RC={name:"overflow",initialValue:"visible",prefix:!1,type:1,parse:function(n,e){return e.filter(it).map(function(t){switch(t.value){case"hidden":return 1;case"scroll":return 2;case"clip":return 3;case"auto":return 4;case"visible":default:return 0}})}},LC={name:"overflow-wrap",initialValue:"normal",prefix:!1,type:2,parse:function(n,e){switch(e){case"break-word":return"break-word";case"normal":default:return"normal"}}},js=function(n){return{name:"padding-"+n,initialValue:"0",prefix:!1,type:3,format:"length-percentage"}},DC=js("top"),HC=js("right"),PC=js("bottom"),NC=js("left"),OC={name:"text-align",initialValue:"left",prefix:!1,type:2,parse:function(n,e){switch(e){case"right":return 2;case"center":case"justify":return 1;case"left":default:return 0}}},GC={name:"position",initialValue:"static",prefix:!1,type:2,parse:function(n,e){switch(e){case"relative":return 1;case"absolute":return 2;case"fixed":return 3;case"sticky":return 4}return 0}},VC={name:"text-shadow",initialValue:"none",type:1,prefix:!1,parse:function(n,e){return e.length===1&&al(e[0],"none")?[]:yA(e).map(function(t){for(var A={color:OA.TRANSPARENT,offsetX:bt,offsetY:bt,blur:bt},i=0,r=0;r<t.length;r++){var s=t[r];un(s)?(i===0?A.offsetX=s:i===1?A.offsetY=s:A.blur=s,i++):A.color=an.parse(n,s)}return A})}},kC={name:"text-transform",initialValue:"none",prefix:!1,type:2,parse:function(n,e){switch(e){case"uppercase":return 2;case"lowercase":return 1;case"capitalize":return 3}return 0}},KC={name:"transform",initialValue:"none",prefix:!0,type:0,parse:function(n,e){if(e.type===20&&e.value==="none")return null;if(e.type===18){var t=XC[e.name];if(typeof t>"u")throw new Error('Attempting to parse an unsupported transform function "'+e.name+'"');return t(e.values)}return null}},zC=function(n){var e=n.filter(function(t){return t.type===17}).map(function(t){return t.number});return e.length===6?e:null},WC=function(n){var e=n.filter(function(o){return o.type===17}).map(function(o){return o.number}),t=e[0],A=e[1];e[2],e[3];var i=e[4],r=e[5];e[6],e[7],e[8],e[9],e[10],e[11];var s=e[12],a=e[13];return e[14],e[15],e.length===16?[t,A,i,r,s,a]:null},XC={matrix:zC,matrix3d:WC},yu={type:16,number:50,flags:or},YC=[yu,yu],JC={name:"transform-origin",initialValue:"50% 50%",prefix:!0,type:1,parse:function(n,e){var t=e.filter(_t);return t.length!==2?YC:[t[0],t[1]]}},qC={name:"visible",initialValue:"none",prefix:!1,type:2,parse:function(n,e){switch(e){case"hidden":return 1;case"collapse":return 2;case"visible":default:return 0}}},Ji;(function(n){n.NORMAL="normal",n.BREAK_ALL="break-all",n.KEEP_ALL="keep-all"})(Ji||(Ji={}));var ZC={name:"word-break",initialValue:"normal",prefix:!1,type:2,parse:function(n,e){switch(e){case"break-all":return Ji.BREAK_ALL;case"keep-all":return Ji.KEEP_ALL;case"normal":default:return Ji.NORMAL}}},jC={name:"z-index",initialValue:"auto",prefix:!1,type:0,parse:function(n,e){if(e.type===20)return{auto:!0,order:0};if(yi(e))return{auto:!1,order:e.number};throw new Error("Invalid z-index number parsed")}},Bf={name:"time",parse:function(n,e){if(e.type===15)switch(e.unit.toLowerCase()){case"s":return 1e3*e.number;case"ms":return e.number}throw new Error("Unsupported time type")}},$C={name:"opacity",initialValue:"1",type:0,prefix:!1,parse:function(n,e){return yi(e)?e.number:1}},eE={name:"text-decoration-color",initialValue:"transparent",prefix:!1,type:3,format:"color"},tE={name:"text-decoration-line",initialValue:"none",prefix:!1,type:1,parse:function(n,e){return e.filter(it).map(function(t){switch(t.value){case"underline":return 1;case"overline":return 2;case"line-through":return 3;case"none":return 4}return 0}).filter(function(t){return t!==0})}},AE={name:"font-family",initialValue:"",prefix:!1,type:1,parse:function(n,e){var t=[],A=[];return e.forEach(function(i){switch(i.type){case 20:case 0:t.push(i.value);break;case 17:t.push(i.number.toString());break;case 4:A.push(t.join(" ")),t.length=0;break}}),t.length&&A.push(t.join(" ")),A.map(function(i){return i.indexOf(" ")===-1?i:"'"+i+"'"})}},nE={name:"font-size",initialValue:"0",prefix:!1,type:3,format:"length"},iE={name:"font-weight",initialValue:"normal",type:0,prefix:!1,parse:function(n,e){if(yi(e))return e.number;if(it(e))switch(e.value){case"bold":return 700;case"normal":default:return 400}return 400}},rE={name:"font-variant",initialValue:"none",type:1,prefix:!1,parse:function(n,e){return e.filter(it).map(function(t){return t.value})}},sE={name:"font-style",initialValue:"normal",prefix:!1,type:2,parse:function(n,e){switch(e){case"oblique":return"oblique";case"italic":return"italic";case"normal":default:return"normal"}}},Ct=function(n,e){return(n&e)!==0},aE={name:"content",initialValue:"none",type:1,prefix:!1,parse:function(n,e){if(e.length===0)return[];var t=e[0];return t.type===20&&t.value==="none"?[]:e}},oE={name:"counter-increment",initialValue:"none",prefix:!0,type:1,parse:function(n,e){if(e.length===0)return null;var t=e[0];if(t.type===20&&t.value==="none")return null;for(var A=[],i=e.filter(ef),r=0;r<i.length;r++){var s=i[r],a=i[r+1];if(s.type===20){var o=a&&yi(a)?a.number:1;A.push({counter:s.value,increment:o})}}return A}},lE={name:"counter-reset",initialValue:"none",prefix:!0,type:1,parse:function(n,e){if(e.length===0)return[];for(var t=[],A=e.filter(ef),i=0;i<A.length;i++){var r=A[i],s=A[i+1];if(it(r)&&r.value!=="none"){var a=s&&yi(s)?s.number:0;t.push({counter:r.value,reset:a})}}return t}},cE={name:"duration",initialValue:"0s",prefix:!1,type:1,parse:function(n,e){return e.filter(lr).map(function(t){return Bf.parse(n,t)})}},uE={name:"quotes",initialValue:"none",prefix:!0,type:1,parse:function(n,e){if(e.length===0)return null;var t=e[0];if(t.type===20&&t.value==="none")return null;var A=[],i=e.filter(Hv);if(i.length%2!==0)return null;for(var r=0;r<i.length;r+=2){var s=i[r].value,a=i[r+1].value;A.push({open:s,close:a})}return A}},Su=function(n,e,t){if(!n)return"";var A=n[Math.min(e,n.length-1)];return A?t?A.open:A.close:""},hE={name:"box-shadow",initialValue:"none",type:1,prefix:!1,parse:function(n,e){return e.length===1&&al(e[0],"none")?[]:yA(e).map(function(t){for(var A={color:255,offsetX:bt,offsetY:bt,blur:bt,spread:bt,inset:!1},i=0,r=0;r<t.length;r++){var s=t[r];al(s,"inset")?A.inset=!0:un(s)?(i===0?A.offsetX=s:i===1?A.offsetY=s:i===2?A.blur=s:A.spread=s,i++):A.color=an.parse(n,s)}return A})}},fE={name:"paint-order",initialValue:"normal",prefix:!1,type:1,parse:function(n,e){var t=[0,1,2],A=[];return e.filter(it).forEach(function(i){switch(i.value){case"stroke":A.push(1);break;case"fill":A.push(0);break;case"markers":A.push(2);break}}),t.forEach(function(i){A.indexOf(i)===-1&&A.push(i)}),A}},dE={name:"-webkit-text-stroke-color",initialValue:"currentcolor",prefix:!1,type:3,format:"color"},pE={name:"-webkit-text-stroke-width",initialValue:"0",type:0,prefix:!1,parse:function(n,e){return lr(e)?e.number:0}},gE=(function(){function n(e,t){var A,i;this.animationDuration=ge(e,cE,t.animationDuration),this.backgroundClip=ge(e,Ov,t.backgroundClip),this.backgroundColor=ge(e,Gv,t.backgroundColor),this.backgroundImage=ge(e,Zv,t.backgroundImage),this.backgroundOrigin=ge(e,jv,t.backgroundOrigin),this.backgroundPosition=ge(e,$v,t.backgroundPosition),this.backgroundRepeat=ge(e,eC,t.backgroundRepeat),this.backgroundSize=ge(e,AC,t.backgroundSize),this.borderTopColor=ge(e,iC,t.borderTopColor),this.borderRightColor=ge(e,rC,t.borderRightColor),this.borderBottomColor=ge(e,sC,t.borderBottomColor),this.borderLeftColor=ge(e,aC,t.borderLeftColor),this.borderTopLeftRadius=ge(e,oC,t.borderTopLeftRadius),this.borderTopRightRadius=ge(e,lC,t.borderTopRightRadius),this.borderBottomRightRadius=ge(e,cC,t.borderBottomRightRadius),this.borderBottomLeftRadius=ge(e,uC,t.borderBottomLeftRadius),this.borderTopStyle=ge(e,hC,t.borderTopStyle),this.borderRightStyle=ge(e,fC,t.borderRightStyle),this.borderBottomStyle=ge(e,dC,t.borderBottomStyle),this.borderLeftStyle=ge(e,pC,t.borderLeftStyle),this.borderTopWidth=ge(e,gC,t.borderTopWidth),this.borderRightWidth=ge(e,mC,t.borderRightWidth),this.borderBottomWidth=ge(e,BC,t.borderBottomWidth),this.borderLeftWidth=ge(e,wC,t.borderLeftWidth),this.boxShadow=ge(e,hE,t.boxShadow),this.color=ge(e,_C,t.color),this.direction=ge(e,vC,t.direction),this.display=ge(e,CC,t.display),this.float=ge(e,xC,t.cssFloat),this.fontFamily=ge(e,AE,t.fontFamily),this.fontSize=ge(e,nE,t.fontSize),this.fontStyle=ge(e,sE,t.fontStyle),this.fontVariant=ge(e,rE,t.fontVariant),this.fontWeight=ge(e,iE,t.fontWeight),this.letterSpacing=ge(e,UC,t.letterSpacing),this.lineBreak=ge(e,yC,t.lineBreak),this.lineHeight=ge(e,SC,t.lineHeight),this.listStyleImage=ge(e,MC,t.listStyleImage),this.listStylePosition=ge(e,FC,t.listStylePosition),this.listStyleType=ge(e,ol,t.listStyleType),this.marginTop=ge(e,bC,t.marginTop),this.marginRight=ge(e,TC,t.marginRight),this.marginBottom=ge(e,QC,t.marginBottom),this.marginLeft=ge(e,IC,t.marginLeft),this.opacity=ge(e,$C,t.opacity);var r=ge(e,RC,t.overflow);this.overflowX=r[0],this.overflowY=r[r.length>1?1:0],this.overflowWrap=ge(e,LC,t.overflowWrap),this.paddingTop=ge(e,DC,t.paddingTop),this.paddingRight=ge(e,HC,t.paddingRight),this.paddingBottom=ge(e,PC,t.paddingBottom),this.paddingLeft=ge(e,NC,t.paddingLeft),this.paintOrder=ge(e,fE,t.paintOrder),this.position=ge(e,GC,t.position),this.textAlign=ge(e,OC,t.textAlign),this.textDecorationColor=ge(e,eE,(A=t.textDecorationColor)!==null&&A!==void 0?A:t.color),this.textDecorationLine=ge(e,tE,(i=t.textDecorationLine)!==null&&i!==void 0?i:t.textDecoration),this.textShadow=ge(e,VC,t.textShadow),this.textTransform=ge(e,kC,t.textTransform),this.transform=ge(e,KC,t.transform),this.transformOrigin=ge(e,JC,t.transformOrigin),this.visibility=ge(e,qC,t.visibility),this.webkitTextStrokeColor=ge(e,dE,t.webkitTextStrokeColor),this.webkitTextStrokeWidth=ge(e,pE,t.webkitTextStrokeWidth),this.wordBreak=ge(e,ZC,t.wordBreak),this.zIndex=ge(e,jC,t.zIndex)}return n.prototype.isVisible=function(){return this.display>0&&this.opacity>0&&this.visibility===0},n.prototype.isTransparent=function(){return on(this.backgroundColor)},n.prototype.isTransformed=function(){return this.transform!==null},n.prototype.isPositioned=function(){return this.position!==0},n.prototype.isPositionedWithZIndex=function(){return this.isPositioned()&&!this.zIndex.auto},n.prototype.isFloating=function(){return this.float!==0},n.prototype.isInlineLevel=function(){return Ct(this.display,4)||Ct(this.display,33554432)||Ct(this.display,268435456)||Ct(this.display,536870912)||Ct(this.display,67108864)||Ct(this.display,134217728)},n})(),mE=(function(){function n(e,t){this.content=ge(e,aE,t.content),this.quotes=ge(e,uE,t.quotes)}return n})(),Mu=(function(){function n(e,t){this.counterIncrement=ge(e,oE,t.counterIncrement),this.counterReset=ge(e,lE,t.counterReset)}return n})(),ge=function(n,e,t){var A=new jh,i=t!==null&&typeof t<"u"?t.toString():e.initialValue;A.write(i);var r=new $h(A.read());switch(e.type){case 2:var s=r.parseComponentValue();return e.parse(n,it(s)?s.value:e.initialValue);case 0:return e.parse(n,r.parseComponentValue());case 1:return e.parse(n,r.parseComponentValues());case 4:return r.parseComponentValue();case 3:switch(e.format){case"angle":return zs.parse(n,r.parseComponentValue());case"color":return an.parse(n,r.parseComponentValue());case"image":return Il.parse(n,r.parseComponentValue());case"length":var a=r.parseComponentValue();return un(a)?a:bt;case"length-percentage":var o=r.parseComponentValue();return _t(o)?o:bt;case"time":return Bf.parse(n,r.parseComponentValue())}break}},BE="data-html2canvas-debug",wE=function(n){var e=n.getAttribute(BE);switch(e){case"all":return 1;case"clone":return 2;case"parse":return 3;case"render":return 4;default:return 0}},ll=function(n,e){var t=wE(n);return t===1||e===t},SA=(function(){function n(e,t){if(this.context=e,this.textNodes=[],this.elements=[],this.flags=0,ll(t,3))debugger;this.styles=new gE(e,window.getComputedStyle(t,null)),hl(t)&&(this.styles.animationDuration.some(function(A){return A>0})&&(t.style.animationDuration="0s"),this.styles.transform!==null&&(t.style.transform="none")),this.bounds=ks(this.context,t),ll(t,4)&&(this.flags|=16)}return n})(),_E="AAAAAAAAAAAAEA4AGBkAAFAaAAACAAAAAAAIABAAGAAwADgACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAAQABIAEQATAAIABAACAAQAAgAEAAIABAAVABcAAgAEAAIABAACAAQAGAAaABwAHgAgACIAI4AlgAIABAAmwCjAKgAsAC2AL4AvQDFAMoA0gBPAVYBWgEIAAgACACMANoAYgFkAWwBdAF8AX0BhQGNAZUBlgGeAaMBlQGWAasBswF8AbsBwwF0AcsBYwHTAQgA2wG/AOMBdAF8AekB8QF0AfkB+wHiAHQBfAEIAAMC5gQIAAsCEgIIAAgAFgIeAggAIgIpAggAMQI5AkACygEIAAgASAJQAlgCYAIIAAgACAAKBQoFCgUTBRMFGQUrBSsFCAAIAAgACAAIAAgACAAIAAgACABdAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABoAmgCrwGvAQgAbgJ2AggAHgEIAAgACADnAXsCCAAIAAgAgwIIAAgACAAIAAgACACKAggAkQKZAggAPADJAAgAoQKkAqwCsgK6AsICCADJAggA0AIIAAgACAAIANYC3gIIAAgACAAIAAgACABAAOYCCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAkASoB+QIEAAgACAA8AEMCCABCBQgACABJBVAFCAAIAAgACAAIAAgACAAIAAgACABTBVoFCAAIAFoFCABfBWUFCAAIAAgACAAIAAgAbQUIAAgACAAIAAgACABzBXsFfQWFBYoFigWKBZEFigWKBYoFmAWfBaYFrgWxBbkFCAAIAAgACAAIAAgACAAIAAgACAAIAMEFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAMgFCADQBQgACAAIAAgACAAIAAgACAAIAAgACAAIAO4CCAAIAAgAiQAIAAgACABAAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAD0AggACAD8AggACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIANYFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAMDvwAIAAgAJAIIAAgACAAIAAgACAAIAAgACwMTAwgACAB9BOsEGwMjAwgAKwMyAwsFYgE3A/MEPwMIAEUDTQNRAwgAWQOsAGEDCAAIAAgACAAIAAgACABpAzQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFIQUoBSwFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABtAwgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABMAEwACAAIAAgACAAIABgACAAIAAgACAC/AAgACAAyAQgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACAAIAAwAAgACAAIAAgACAAIAAgACAAIAAAARABIAAgACAAIABQASAAIAAgAIABwAEAAjgCIABsAqAC2AL0AigDQAtwC+IJIQqVAZUBWQqVAZUBlQGVAZUBlQGrC5UBlQGVAZUBlQGVAZUBlQGVAXsKlQGVAbAK6wsrDGUMpQzlDJUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAfAKAAuZA64AtwCJALoC6ADwAAgAuACgA/oEpgO6AqsD+AAIAAgAswMIAAgACAAIAIkAuwP5AfsBwwPLAwgACAAIAAgACADRA9kDCAAIAOED6QMIAAgACAAIAAgACADuA/YDCAAIAP4DyQAIAAgABgQIAAgAXQAOBAgACAAIAAgACAAIABMECAAIAAgACAAIAAgACAD8AAQBCAAIAAgAGgQiBCoECAExBAgAEAEIAAgACAAIAAgACAAIAAgACAAIAAgACAA4BAgACABABEYECAAIAAgATAQYAQgAVAQIAAgACAAIAAgACAAIAAgACAAIAFoECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAOQEIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAB+BAcACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAEABhgSMBAgACAAIAAgAlAQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAwAEAAQABAADAAMAAwADAAQABAAEAAQABAAEAAQABHATAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAdQMIAAgACAAIAAgACAAIAMkACAAIAAgAfQMIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACFA4kDCAAIAAgACAAIAOcBCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAIcDCAAIAAgACAAIAAgACAAIAAgACAAIAJEDCAAIAAgACADFAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABgBAgAZgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAbAQCBXIECAAIAHkECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABAAJwEQACjBKoEsgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAC6BMIECAAIAAgACAAIAAgACABmBAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAxwQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAGYECAAIAAgAzgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBd0FXwUIAOIF6gXxBYoF3gT5BQAGCAaKBYoFigWKBYoFigWKBYoFigWKBYoFigXWBIoFigWKBYoFigWKBYoFigWKBYsFEAaKBYoFigWKBYoFigWKBRQGCACKBYoFigWKBQgACAAIANEECAAIABgGigUgBggAJgYIAC4GMwaKBYoF0wQ3Bj4GigWKBYoFigWKBYoFigWKBYoFigWKBYoFigUIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWLBf///////wQABAAEAAQABAAEAAQABAAEAAQAAwAEAAQAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAQADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUAAAAFAAUAAAAFAAUAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAQAAAAUABQAFAAUABQAFAAAAAAAFAAUAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAFAAUAAQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAAABwAHAAcAAAAHAAcABwAFAAEAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAcABwAFAAUAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAQABAAAAAAAAAAAAAAAFAAUABQAFAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAHAAcAAAAHAAcAAAAAAAUABQAHAAUAAQAHAAEABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwABAAUABQAFAAUAAAAAAAAAAAAAAAEAAQABAAEAAQABAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABQANAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAABQAHAAUABQAFAAAAAAAAAAcABQAFAAUABQAFAAQABAAEAAQABAAEAAQABAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUAAAAFAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAUAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAcABwAFAAcABwAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUABwAHAAUABQAFAAUAAAAAAAcABwAAAAAABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAAAAAAAAAAABQAFAAAAAAAFAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAFAAUABQAFAAUAAAAFAAUABwAAAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABwAFAAUABQAFAAAAAAAHAAcAAAAAAAcABwAFAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAAAAAAAAAHAAcABwAAAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAUABQAFAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAHAAcABQAHAAcAAAAFAAcABwAAAAcABwAFAAUAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAFAAcABwAFAAUABQAAAAUAAAAHAAcABwAHAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAHAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUAAAAFAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAUAAAAFAAUAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABwAFAAUABQAFAAUABQAAAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABQAFAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAFAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAHAAUABQAFAAUABQAFAAUABwAHAAcABwAHAAcABwAHAAUABwAHAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABwAHAAcABwAFAAUABwAHAAcAAAAAAAAAAAAHAAcABQAHAAcABwAHAAcABwAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAUABQAFAAUABQAFAAUAAAAFAAAABQAAAAAABQAFAAUABQAFAAUABQAFAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAUABQAFAAUABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABwAFAAcABwAHAAcABwAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAUABQAFAAUABwAHAAUABQAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABQAFAAcABwAHAAUABwAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAcABQAFAAUABQAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAAAAAABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAAAAAAAAAFAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAUABQAHAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAFAAUABQAFAAcABwAFAAUABwAHAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAcABwAFAAUABwAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABQAAAAAABQAFAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAcABwAAAAAAAAAAAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAcABwAFAAcABwAAAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAFAAUABQAAAAUABQAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABwAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAHAAcABQAHAAUABQAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAAABwAHAAAAAAAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAFAAUABwAFAAcABwAFAAcABQAFAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAAAAAABwAHAAcABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAFAAcABwAFAAUABQAFAAUABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAUABQAFAAcABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABQAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAAAAAAFAAUABwAHAAcABwAFAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAHAAUABQAFAAUABQAFAAUABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAABQAAAAUABQAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAHAAcAAAAFAAUAAAAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABQAFAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAABQAFAAUABQAFAAUABQAAAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAFAAUABQAFAAUADgAOAA4ADgAOAA4ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAMAAwADAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAAAAAAAAAAAAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAAAAAAAAAAAAsADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwACwAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAADgAOAA4AAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAAAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4AAAAOAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAAAAAAAAAAAA4AAAAOAAAAAAAAAAAADgAOAA4AAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAA=",Fu="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Ki=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(var as=0;as<Fu.length;as++)Ki[Fu.charCodeAt(as)]=as;var vE=function(n){var e=n.length*.75,t=n.length,A,i=0,r,s,a,o;n[n.length-1]==="="&&(e--,n[n.length-2]==="="&&e--);var l=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u"&&typeof Uint8Array.prototype.slice<"u"?new ArrayBuffer(e):new Array(e),c=Array.isArray(l)?l:new Uint8Array(l);for(A=0;A<t;A+=4)r=Ki[n.charCodeAt(A)],s=Ki[n.charCodeAt(A+1)],a=Ki[n.charCodeAt(A+2)],o=Ki[n.charCodeAt(A+3)],c[i++]=r<<2|s>>4,c[i++]=(s&15)<<4|a>>2,c[i++]=(a&3)<<6|o&63;return l},CE=function(n){for(var e=n.length,t=[],A=0;A<e;A+=2)t.push(n[A+1]<<8|n[A]);return t},EE=function(n){for(var e=n.length,t=[],A=0;A<e;A+=4)t.push(n[A+3]<<24|n[A+2]<<16|n[A+1]<<8|n[A]);return t},Tn=5,Rl=11,Va=2,xE=Rl-Tn,wf=65536>>Tn,UE=1<<Tn,ka=UE-1,yE=1024>>Tn,SE=wf+yE,ME=SE,FE=32,bE=ME+FE,TE=65536>>Rl,QE=1<<xE,IE=QE-1,bu=function(n,e,t){return n.slice?n.slice(e,t):new Uint16Array(Array.prototype.slice.call(n,e,t))},RE=function(n,e,t){return n.slice?n.slice(e,t):new Uint32Array(Array.prototype.slice.call(n,e,t))},LE=function(n,e){var t=vE(n),A=Array.isArray(t)?EE(t):new Uint32Array(t),i=Array.isArray(t)?CE(t):new Uint16Array(t),r=24,s=bu(i,r/2,A[4]/2),a=A[5]===2?bu(i,(r+A[4])/2):RE(A,Math.ceil((r+A[4])/4));return new DE(A[0],A[1],A[2],A[3],s,a)},DE=(function(){function n(e,t,A,i,r,s){this.initialValue=e,this.errorValue=t,this.highStart=A,this.highValueIndex=i,this.index=r,this.data=s}return n.prototype.get=function(e){var t;if(e>=0){if(e<55296||e>56319&&e<=65535)return t=this.index[e>>Tn],t=(t<<Va)+(e&ka),this.data[t];if(e<=65535)return t=this.index[wf+(e-55296>>Tn)],t=(t<<Va)+(e&ka),this.data[t];if(e<this.highStart)return t=bE-TE+(e>>Rl),t=this.index[t],t+=e>>Tn&IE,t=this.index[t],t=(t<<Va)+(e&ka),this.data[t];if(e<=1114111)return this.data[this.highValueIndex]}return this.errorValue},n})(),Tu="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",HE=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(var os=0;os<Tu.length;os++)HE[Tu.charCodeAt(os)]=os;var PE=1,Ka=2,za=3,Qu=4,Iu=5,NE=7,Ru=8,Wa=9,Xa=10,Lu=11,Du=12,Hu=13,Pu=14,Ya=15,OE=function(n){for(var e=[],t=0,A=n.length;t<A;){var i=n.charCodeAt(t++);if(i>=55296&&i<=56319&&t<A){var r=n.charCodeAt(t++);(r&64512)===56320?e.push(((i&1023)<<10)+(r&1023)+65536):(e.push(i),t--)}else e.push(i)}return e},GE=function(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];if(String.fromCodePoint)return String.fromCodePoint.apply(String,n);var t=n.length;if(!t)return"";for(var A=[],i=-1,r="";++i<t;){var s=n[i];s<=65535?A.push(s):(s-=65536,A.push((s>>10)+55296,s%1024+56320)),(i+1===t||A.length>16384)&&(r+=String.fromCharCode.apply(String,A),A.length=0)}return r},VE=LE(_E),nA="×",Ja="÷",kE=function(n){return VE.get(n)},KE=function(n,e,t){var A=t-2,i=e[A],r=e[t-1],s=e[t];if(r===Ka&&s===za)return nA;if(r===Ka||r===za||r===Qu||s===Ka||s===za||s===Qu)return Ja;if(r===Ru&&[Ru,Wa,Lu,Du].indexOf(s)!==-1||(r===Lu||r===Wa)&&(s===Wa||s===Xa)||(r===Du||r===Xa)&&s===Xa||s===Hu||s===Iu||s===NE||r===PE)return nA;if(r===Hu&&s===Pu){for(;i===Iu;)i=e[--A];if(i===Pu)return nA}if(r===Ya&&s===Ya){for(var a=0;i===Ya;)a++,i=e[--A];if(a%2===0)return nA}return Ja},zE=function(n){var e=OE(n),t=e.length,A=0,i=0,r=e.map(kE);return{next:function(){if(A>=t)return{done:!0,value:null};for(var s=nA;A<t&&(s=KE(e,r,++A))===nA;);if(s!==nA||A===t){var a=GE.apply(null,e.slice(i,A));return i=A,{value:a,done:!1}}return{done:!0,value:null}}}},WE=function(n){for(var e=zE(n),t=[],A;!(A=e.next()).done;)A.value&&t.push(A.value.slice());return t},XE=function(n){var e=123;if(n.createRange){var t=n.createRange();if(t.getBoundingClientRect){var A=n.createElement("boundtest");A.style.height=e+"px",A.style.display="block",n.body.appendChild(A),t.selectNode(A);var i=t.getBoundingClientRect(),r=Math.round(i.height);if(n.body.removeChild(A),r===e)return!0}}return!1},YE=function(n){var e=n.createElement("boundtest");e.style.width="50px",e.style.display="block",e.style.fontSize="12px",e.style.letterSpacing="0px",e.style.wordSpacing="0px",n.body.appendChild(e);var t=n.createRange();e.innerHTML=typeof"".repeat=="function"?"&#128104;".repeat(10):"";var A=e.firstChild,i=Ks(A.data).map(function(o){return gt(o)}),r=0,s={},a=i.every(function(o,l){t.setStart(A,r),t.setEnd(A,r+o.length);var c=t.getBoundingClientRect();r+=o.length;var u=c.x>s.x||c.y>s.y;return s=c,l===0?!0:u});return n.body.removeChild(e),a},JE=function(){return typeof new Image().crossOrigin<"u"},qE=function(){return typeof new XMLHttpRequest().responseType=="string"},ZE=function(n){var e=new Image,t=n.createElement("canvas"),A=t.getContext("2d");if(!A)return!1;e.src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";try{A.drawImage(e,0,0),t.toDataURL()}catch{return!1}return!0},Nu=function(n){return n[0]===0&&n[1]===255&&n[2]===0&&n[3]===255},jE=function(n){var e=n.createElement("canvas"),t=100;e.width=t,e.height=t;var A=e.getContext("2d");if(!A)return Promise.reject(!1);A.fillStyle="rgb(0, 255, 0)",A.fillRect(0,0,t,t);var i=new Image,r=e.toDataURL();i.src=r;var s=cl(t,t,0,0,i);return A.fillStyle="red",A.fillRect(0,0,t,t),Ou(s).then(function(a){A.drawImage(a,0,0);var o=A.getImageData(0,0,t,t).data;A.fillStyle="red",A.fillRect(0,0,t,t);var l=n.createElement("div");return l.style.backgroundImage="url("+r+")",l.style.height=t+"px",Nu(o)?Ou(cl(t,t,0,0,l)):Promise.reject(!1)}).then(function(a){return A.drawImage(a,0,0),Nu(A.getImageData(0,0,t,t).data)}).catch(function(){return!1})},cl=function(n,e,t,A,i){var r="http://www.w3.org/2000/svg",s=document.createElementNS(r,"svg"),a=document.createElementNS(r,"foreignObject");return s.setAttributeNS(null,"width",n.toString()),s.setAttributeNS(null,"height",e.toString()),a.setAttributeNS(null,"width","100%"),a.setAttributeNS(null,"height","100%"),a.setAttributeNS(null,"x",t.toString()),a.setAttributeNS(null,"y",A.toString()),a.setAttributeNS(null,"externalResourcesRequired","true"),s.appendChild(a),a.appendChild(i),s},Ou=function(n){return new Promise(function(e,t){var A=new Image;A.onload=function(){return e(A)},A.onerror=t,A.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(new XMLSerializer().serializeToString(n))})},Ft={get SUPPORT_RANGE_BOUNDS(){var n=XE(document);return Object.defineProperty(Ft,"SUPPORT_RANGE_BOUNDS",{value:n}),n},get SUPPORT_WORD_BREAKING(){var n=Ft.SUPPORT_RANGE_BOUNDS&&YE(document);return Object.defineProperty(Ft,"SUPPORT_WORD_BREAKING",{value:n}),n},get SUPPORT_SVG_DRAWING(){var n=ZE(document);return Object.defineProperty(Ft,"SUPPORT_SVG_DRAWING",{value:n}),n},get SUPPORT_FOREIGNOBJECT_DRAWING(){var n=typeof Array.from=="function"&&typeof window.fetch=="function"?jE(document):Promise.resolve(!1);return Object.defineProperty(Ft,"SUPPORT_FOREIGNOBJECT_DRAWING",{value:n}),n},get SUPPORT_CORS_IMAGES(){var n=JE();return Object.defineProperty(Ft,"SUPPORT_CORS_IMAGES",{value:n}),n},get SUPPORT_RESPONSE_TYPE(){var n=qE();return Object.defineProperty(Ft,"SUPPORT_RESPONSE_TYPE",{value:n}),n},get SUPPORT_CORS_XHR(){var n="withCredentials"in new XMLHttpRequest;return Object.defineProperty(Ft,"SUPPORT_CORS_XHR",{value:n}),n},get SUPPORT_NATIVE_TEXT_SEGMENTATION(){var n=!!(typeof Intl<"u"&&Intl.Segmenter);return Object.defineProperty(Ft,"SUPPORT_NATIVE_TEXT_SEGMENTATION",{value:n}),n}},qi=(function(){function n(e,t){this.text=e,this.bounds=t}return n})(),$E=function(n,e,t,A){var i=Ax(e,t),r=[],s=0;return i.forEach(function(a){if(t.textDecorationLine.length||a.trim().length>0)if(Ft.SUPPORT_RANGE_BOUNDS){var o=Gu(A,s,a.length).getClientRects();if(o.length>1){var l=Ll(a),c=0;l.forEach(function(f){r.push(new qi(f,kA.fromDOMRectList(n,Gu(A,c+s,f.length).getClientRects()))),c+=f.length})}else r.push(new qi(a,kA.fromDOMRectList(n,o)))}else{var u=A.splitText(a.length);r.push(new qi(a,ex(n,A))),A=u}else Ft.SUPPORT_RANGE_BOUNDS||(A=A.splitText(a.length));s+=a.length}),r},ex=function(n,e){var t=e.ownerDocument;if(t){var A=t.createElement("html2canvaswrapper");A.appendChild(e.cloneNode(!0));var i=e.parentNode;if(i){i.replaceChild(A,e);var r=ks(n,A);return A.firstChild&&i.replaceChild(A.firstChild,A),r}}return kA.EMPTY},Gu=function(n,e,t){var A=n.ownerDocument;if(!A)throw new Error("Node has no owner document");var i=A.createRange();return i.setStart(n,e),i.setEnd(n,e+t),i},Ll=function(n){if(Ft.SUPPORT_NATIVE_TEXT_SEGMENTATION){var e=new Intl.Segmenter(void 0,{granularity:"grapheme"});return Array.from(e.segment(n)).map(function(t){return t.segment})}return WE(n)},tx=function(n,e){if(Ft.SUPPORT_NATIVE_TEXT_SEGMENTATION){var t=new Intl.Segmenter(void 0,{granularity:"word"});return Array.from(t.segment(n)).map(function(A){return A.segment})}return ix(n,e)},Ax=function(n,e){return e.letterSpacing!==0?Ll(n):tx(n,e)},nx=[32,160,4961,65792,65793,4153,4241],ix=function(n,e){for(var t=T_(n,{lineBreak:e.lineBreak,wordBreak:e.overflowWrap==="break-word"?"break-word":e.wordBreak}),A=[],i,r=function(){if(i.value){var s=i.value.slice(),a=Ks(s),o="";a.forEach(function(l){nx.indexOf(l)===-1?o+=gt(l):(o.length&&A.push(o),A.push(gt(l)),o="")}),o.length&&A.push(o)}};!(i=t.next()).done;)r();return A},rx=(function(){function n(e,t,A){this.text=sx(t.data,A.textTransform),this.textBounds=$E(e,this.text,A,t)}return n})(),sx=function(n,e){switch(e){case 1:return n.toLowerCase();case 3:return n.replace(ax,ox);case 2:return n.toUpperCase();default:return n}},ax=/(^|\s|:|-|\(|\))([a-z])/g,ox=function(n,e,t){return n.length>0?e+t.toUpperCase():n},_f=(function(n){wA(e,n);function e(t,A){var i=n.call(this,t,A)||this;return i.src=A.currentSrc||A.src,i.intrinsicWidth=A.naturalWidth,i.intrinsicHeight=A.naturalHeight,i.context.cache.addImage(i.src),i}return e})(SA),vf=(function(n){wA(e,n);function e(t,A){var i=n.call(this,t,A)||this;return i.canvas=A,i.intrinsicWidth=A.width,i.intrinsicHeight=A.height,i}return e})(SA),Cf=(function(n){wA(e,n);function e(t,A){var i=n.call(this,t,A)||this,r=new XMLSerializer,s=ks(t,A);return A.setAttribute("width",s.width+"px"),A.setAttribute("height",s.height+"px"),i.svg="data:image/svg+xml,"+encodeURIComponent(r.serializeToString(A)),i.intrinsicWidth=A.width.baseVal.value,i.intrinsicHeight=A.height.baseVal.value,i.context.cache.addImage(i.svg),i}return e})(SA),Ef=(function(n){wA(e,n);function e(t,A){var i=n.call(this,t,A)||this;return i.value=A.value,i}return e})(SA),ul=(function(n){wA(e,n);function e(t,A){var i=n.call(this,t,A)||this;return i.start=A.start,i.reversed=typeof A.reversed=="boolean"&&A.reversed===!0,i}return e})(SA),lx=[{type:15,flags:0,unit:"px",number:3}],cx=[{type:16,flags:0,number:50}],ux=function(n){return n.width>n.height?new kA(n.left+(n.width-n.height)/2,n.top,n.height,n.height):n.width<n.height?new kA(n.left,n.top+(n.height-n.width)/2,n.width,n.width):n},hx=function(n){var e=n.type===fx?new Array(n.value.length+1).join("•"):n.value;return e.length===0?n.placeholder||"":e},Qs="checkbox",Is="radio",fx="password",Vu=707406591,Dl=(function(n){wA(e,n);function e(t,A){var i=n.call(this,t,A)||this;switch(i.type=A.type.toLowerCase(),i.checked=A.checked,i.value=hx(A),(i.type===Qs||i.type===Is)&&(i.styles.backgroundColor=3739148031,i.styles.borderTopColor=i.styles.borderRightColor=i.styles.borderBottomColor=i.styles.borderLeftColor=2779096575,i.styles.borderTopWidth=i.styles.borderRightWidth=i.styles.borderBottomWidth=i.styles.borderLeftWidth=1,i.styles.borderTopStyle=i.styles.borderRightStyle=i.styles.borderBottomStyle=i.styles.borderLeftStyle=1,i.styles.backgroundClip=[0],i.styles.backgroundOrigin=[0],i.bounds=ux(i.bounds)),i.type){case Qs:i.styles.borderTopRightRadius=i.styles.borderTopLeftRadius=i.styles.borderBottomRightRadius=i.styles.borderBottomLeftRadius=lx;break;case Is:i.styles.borderTopRightRadius=i.styles.borderTopLeftRadius=i.styles.borderBottomRightRadius=i.styles.borderBottomLeftRadius=cx;break}return i}return e})(SA),xf=(function(n){wA(e,n);function e(t,A){var i=n.call(this,t,A)||this,r=A.options[A.selectedIndex||0];return i.value=r&&r.text||"",i}return e})(SA),Uf=(function(n){wA(e,n);function e(t,A){var i=n.call(this,t,A)||this;return i.value=A.value,i}return e})(SA),yf=(function(n){wA(e,n);function e(t,A){var i=n.call(this,t,A)||this;i.src=A.src,i.width=parseInt(A.width,10)||0,i.height=parseInt(A.height,10)||0,i.backgroundColor=i.styles.backgroundColor;try{if(A.contentWindow&&A.contentWindow.document&&A.contentWindow.document.documentElement){i.tree=Mf(t,A.contentWindow.document.documentElement);var r=A.contentWindow.document.documentElement?Yi(t,getComputedStyle(A.contentWindow.document.documentElement).backgroundColor):OA.TRANSPARENT,s=A.contentWindow.document.body?Yi(t,getComputedStyle(A.contentWindow.document.body).backgroundColor):OA.TRANSPARENT;i.backgroundColor=on(r)?on(s)?i.styles.backgroundColor:s:r}}catch{}return i}return e})(SA),dx=["OL","UL","MENU"],vs=function(n,e,t,A){for(var i=e.firstChild,r=void 0;i;i=r)if(r=i.nextSibling,Ff(i)&&i.data.trim().length>0)t.textNodes.push(new rx(n,i,t.styles));else if(ci(i))if(If(i)&&i.assignedNodes)i.assignedNodes().forEach(function(a){return vs(n,a,t,A)});else{var s=Sf(n,i);s.styles.isVisible()&&(px(i,s,A)?s.flags|=4:gx(s.styles)&&(s.flags|=2),dx.indexOf(i.tagName)!==-1&&(s.flags|=8),t.elements.push(s),i.slot,i.shadowRoot?vs(n,i.shadowRoot,s,A):!Rs(i)&&!bf(i)&&!Ls(i)&&vs(n,i,s,A))}},Sf=function(n,e){return fl(e)?new _f(n,e):Tf(e)?new vf(n,e):bf(e)?new Cf(n,e):mx(e)?new Ef(n,e):Bx(e)?new ul(n,e):wx(e)?new Dl(n,e):Ls(e)?new xf(n,e):Rs(e)?new Uf(n,e):Qf(e)?new yf(n,e):new SA(n,e)},Mf=function(n,e){var t=Sf(n,e);return t.flags|=4,vs(n,e,t,t),t},px=function(n,e,t){return e.styles.isPositionedWithZIndex()||e.styles.opacity<1||e.styles.isTransformed()||Hl(n)&&t.styles.isTransparent()},gx=function(n){return n.isPositioned()||n.isFloating()},Ff=function(n){return n.nodeType===Node.TEXT_NODE},ci=function(n){return n.nodeType===Node.ELEMENT_NODE},hl=function(n){return ci(n)&&typeof n.style<"u"&&!Cs(n)},Cs=function(n){return typeof n.className=="object"},mx=function(n){return n.tagName==="LI"},Bx=function(n){return n.tagName==="OL"},wx=function(n){return n.tagName==="INPUT"},_x=function(n){return n.tagName==="HTML"},bf=function(n){return n.tagName==="svg"},Hl=function(n){return n.tagName==="BODY"},Tf=function(n){return n.tagName==="CANVAS"},ku=function(n){return n.tagName==="VIDEO"},fl=function(n){return n.tagName==="IMG"},Qf=function(n){return n.tagName==="IFRAME"},Ku=function(n){return n.tagName==="STYLE"},vx=function(n){return n.tagName==="SCRIPT"},Rs=function(n){return n.tagName==="TEXTAREA"},Ls=function(n){return n.tagName==="SELECT"},If=function(n){return n.tagName==="SLOT"},zu=function(n){return n.tagName.indexOf("-")>0},Cx=(function(){function n(){this.counters={}}return n.prototype.getCounterValue=function(e){var t=this.counters[e];return t&&t.length?t[t.length-1]:1},n.prototype.getCounterValues=function(e){var t=this.counters[e];return t||[]},n.prototype.pop=function(e){var t=this;e.forEach(function(A){return t.counters[A].pop()})},n.prototype.parse=function(e){var t=this,A=e.counterIncrement,i=e.counterReset,r=!0;A!==null&&A.forEach(function(a){var o=t.counters[a.counter];o&&a.increment!==0&&(r=!1,o.length||o.push(1),o[Math.max(0,o.length-1)]+=a.increment)});var s=[];return r&&i.forEach(function(a){var o=t.counters[a.counter];s.push(a.counter),o||(o=t.counters[a.counter]=[]),o.push(a.reset)}),s},n})(),Wu={integers:[1e3,900,500,400,100,90,50,40,10,9,5,4,1],values:["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"]},Xu={integers:[9e3,8e3,7e3,6e3,5e3,4e3,3e3,2e3,1e3,900,800,700,600,500,400,300,200,100,90,80,70,60,50,40,30,20,10,9,8,7,6,5,4,3,2,1],values:["Ք","Փ","Ւ","Ց","Ր","Տ","Վ","Ս","Ռ","Ջ","Պ","Չ","Ո","Շ","Ն","Յ","Մ","Ճ","Ղ","Ձ","Հ","Կ","Ծ","Խ","Լ","Ի","Ժ","Թ","Ը","Է","Զ","Ե","Դ","Գ","Բ","Ա"]},Ex={integers:[1e4,9e3,8e3,7e3,6e3,5e3,4e3,3e3,2e3,1e3,400,300,200,100,90,80,70,60,50,40,30,20,19,18,17,16,15,10,9,8,7,6,5,4,3,2,1],values:["י׳","ט׳","ח׳","ז׳","ו׳","ה׳","ד׳","ג׳","ב׳","א׳","ת","ש","ר","ק","צ","פ","ע","ס","נ","מ","ל","כ","יט","יח","יז","טז","טו","י","ט","ח","ז","ו","ה","ד","ג","ב","א"]},xx={integers:[1e4,9e3,8e3,7e3,6e3,5e3,4e3,3e3,2e3,1e3,900,800,700,600,500,400,300,200,100,90,80,70,60,50,40,30,20,10,9,8,7,6,5,4,3,2,1],values:["ჵ","ჰ","ჯ","ჴ","ხ","ჭ","წ","ძ","ც","ჩ","შ","ყ","ღ","ქ","ფ","ჳ","ტ","ს","რ","ჟ","პ","ო","ჲ","ნ","მ","ლ","კ","ი","თ","ჱ","ზ","ვ","ე","დ","გ","ბ","ა"]},Ai=function(n,e,t,A,i,r){return n<e||n>t?Ar(n,i,r.length>0):A.integers.reduce(function(s,a,o){for(;n>=a;)n-=a,s+=A.values[o];return s},"")+r},Rf=function(n,e,t,A){var i="";do t||n--,i=A(n)+i,n/=e;while(n*e>=e);return i},pt=function(n,e,t,A,i){var r=t-e+1;return(n<0?"-":"")+(Rf(Math.abs(n),r,A,function(s){return gt(Math.floor(s%r)+e)})+i)},Cn=function(n,e,t){t===void 0&&(t=". ");var A=e.length;return Rf(Math.abs(n),A,!1,function(i){return e[Math.floor(i%A)]})+t},si=1,qA=2,ZA=4,zi=8,LA=function(n,e,t,A,i,r){if(n<-9999||n>9999)return Ar(n,4,i.length>0);var s=Math.abs(n),a=i;if(s===0)return e[0]+a;for(var o=0;s>0&&o<=4;o++){var l=s%10;l===0&&Ct(r,si)&&a!==""?a=e[l]+a:l>1||l===1&&o===0||l===1&&o===1&&Ct(r,qA)||l===1&&o===1&&Ct(r,ZA)&&n>100||l===1&&o>1&&Ct(r,zi)?a=e[l]+(o>0?t[o-1]:"")+a:l===1&&o>0&&(a=t[o-1]+a),s=Math.floor(s/10)}return(n<0?A:"")+a},Yu="十百千萬",Ju="拾佰仟萬",qu="マイナス",qa="마이너스",Ar=function(n,e,t){var A=t?". ":"",i=t?"、":"",r=t?", ":"",s=t?" ":"";switch(e){case 0:return"•"+s;case 1:return"◦"+s;case 2:return"◾"+s;case 5:var a=pt(n,48,57,!0,A);return a.length<4?"0"+a:a;case 4:return Cn(n,"〇一二三四五六七八九",i);case 6:return Ai(n,1,3999,Wu,3,A).toLowerCase();case 7:return Ai(n,1,3999,Wu,3,A);case 8:return pt(n,945,969,!1,A);case 9:return pt(n,97,122,!1,A);case 10:return pt(n,65,90,!1,A);case 11:return pt(n,1632,1641,!0,A);case 12:case 49:return Ai(n,1,9999,Xu,3,A);case 35:return Ai(n,1,9999,Xu,3,A).toLowerCase();case 13:return pt(n,2534,2543,!0,A);case 14:case 30:return pt(n,6112,6121,!0,A);case 15:return Cn(n,"子丑寅卯辰巳午未申酉戌亥",i);case 16:return Cn(n,"甲乙丙丁戊己庚辛壬癸",i);case 17:case 48:return LA(n,"零一二三四五六七八九",Yu,"負",i,qA|ZA|zi);case 47:return LA(n,"零壹貳參肆伍陸柒捌玖",Ju,"負",i,si|qA|ZA|zi);case 42:return LA(n,"零一二三四五六七八九",Yu,"负",i,qA|ZA|zi);case 41:return LA(n,"零壹贰叁肆伍陆柒捌玖",Ju,"负",i,si|qA|ZA|zi);case 26:return LA(n,"〇一二三四五六七八九","十百千万",qu,i,0);case 25:return LA(n,"零壱弐参四伍六七八九","拾百千万",qu,i,si|qA|ZA);case 31:return LA(n,"영일이삼사오육칠팔구","십백천만",qa,r,si|qA|ZA);case 33:return LA(n,"零一二三四五六七八九","十百千萬",qa,r,0);case 32:return LA(n,"零壹貳參四五六七八九","拾百千",qa,r,si|qA|ZA);case 18:return pt(n,2406,2415,!0,A);case 20:return Ai(n,1,19999,xx,3,A);case 21:return pt(n,2790,2799,!0,A);case 22:return pt(n,2662,2671,!0,A);case 22:return Ai(n,1,10999,Ex,3,A);case 23:return Cn(n,"あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをん");case 24:return Cn(n,"いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす");case 27:return pt(n,3302,3311,!0,A);case 28:return Cn(n,"アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン",i);case 29:return Cn(n,"イロハニホヘトチリヌルヲワカヨタレソツネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセス",i);case 34:return pt(n,3792,3801,!0,A);case 37:return pt(n,6160,6169,!0,A);case 38:return pt(n,4160,4169,!0,A);case 39:return pt(n,2918,2927,!0,A);case 40:return pt(n,1776,1785,!0,A);case 43:return pt(n,3046,3055,!0,A);case 44:return pt(n,3174,3183,!0,A);case 45:return pt(n,3664,3673,!0,A);case 46:return pt(n,3872,3881,!0,A);case 3:default:return pt(n,48,57,!0,A)}},Lf="data-html2canvas-ignore",Zu=(function(){function n(e,t,A){if(this.context=e,this.options=A,this.scrolledElements=[],this.referenceElement=t,this.counters=new Cx,this.quoteDepth=0,!t.ownerDocument)throw new Error("Cloned element does not have an owner document");this.documentElement=this.cloneNode(t.ownerDocument.documentElement,!1)}return n.prototype.toIFrame=function(e,t){var A=this,i=Ux(e,t);if(!i.contentWindow)return Promise.reject("Unable to find iframe window");var r=e.defaultView.pageXOffset,s=e.defaultView.pageYOffset,a=i.contentWindow,o=a.document,l=Mx(i).then(function(){return Ot(A,void 0,void 0,function(){var c,u;return Dt(this,function(f){switch(f.label){case 0:return this.scrolledElements.forEach(Qx),a&&(a.scrollTo(t.left,t.top),/(iPad|iPhone|iPod)/g.test(navigator.userAgent)&&(a.scrollY!==t.top||a.scrollX!==t.left)&&(this.context.logger.warn("Unable to restore scroll position for cloned document"),this.context.windowBounds=this.context.windowBounds.add(a.scrollX-t.left,a.scrollY-t.top,0,0))),c=this.options.onclone,u=this.clonedReferenceElement,typeof u>"u"?[2,Promise.reject("Error finding the "+this.referenceElement.nodeName+" in the cloned document")]:o.fonts&&o.fonts.ready?[4,o.fonts.ready]:[3,2];case 1:f.sent(),f.label=2;case 2:return/(AppleWebKit)/g.test(navigator.userAgent)?[4,Sx(o)]:[3,4];case 3:f.sent(),f.label=4;case 4:return typeof c=="function"?[2,Promise.resolve().then(function(){return c(o,u)}).then(function(){return i})]:[2,i]}})})});return o.open(),o.write(bx(document.doctype)+"<html></html>"),Tx(this.referenceElement.ownerDocument,r,s),o.replaceChild(o.adoptNode(this.documentElement),o.documentElement),o.close(),l},n.prototype.createElementClone=function(e){if(ll(e,2))debugger;if(Tf(e))return this.createCanvasClone(e);if(ku(e))return this.createVideoClone(e);if(Ku(e))return this.createStyleClone(e);var t=e.cloneNode(!1);return fl(t)&&(fl(e)&&e.currentSrc&&e.currentSrc!==e.src&&(t.src=e.currentSrc,t.srcset=""),t.loading==="lazy"&&(t.loading="eager")),zu(t)?this.createCustomElementClone(t):t},n.prototype.createCustomElementClone=function(e){var t=document.createElement("html2canvascustomelement");return Za(e.style,t),t},n.prototype.createStyleClone=function(e){try{var t=e.sheet;if(t&&t.cssRules){var A=[].slice.call(t.cssRules,0).reduce(function(r,s){return s&&typeof s.cssText=="string"?r+s.cssText:r},""),i=e.cloneNode(!1);return i.textContent=A,i}}catch(r){if(this.context.logger.error("Unable to access cssRules property",r),r.name!=="SecurityError")throw r}return e.cloneNode(!1)},n.prototype.createCanvasClone=function(e){var t;if(this.options.inlineImages&&e.ownerDocument){var A=e.ownerDocument.createElement("img");try{return A.src=e.toDataURL(),A}catch{this.context.logger.info("Unable to inline canvas contents, canvas is tainted",e)}}var i=e.cloneNode(!1);try{i.width=e.width,i.height=e.height;var r=e.getContext("2d"),s=i.getContext("2d");if(s)if(!this.options.allowTaint&&r)s.putImageData(r.getImageData(0,0,e.width,e.height),0,0);else{var a=(t=e.getContext("webgl2"))!==null&&t!==void 0?t:e.getContext("webgl");if(a){var o=a.getContextAttributes();(o==null?void 0:o.preserveDrawingBuffer)===!1&&this.context.logger.warn("Unable to clone WebGL context as it has preserveDrawingBuffer=false",e)}s.drawImage(e,0,0)}return i}catch{this.context.logger.info("Unable to clone canvas as it is tainted",e)}return i},n.prototype.createVideoClone=function(e){var t=e.ownerDocument.createElement("canvas");t.width=e.offsetWidth,t.height=e.offsetHeight;var A=t.getContext("2d");try{return A&&(A.drawImage(e,0,0,t.width,t.height),this.options.allowTaint||A.getImageData(0,0,t.width,t.height)),t}catch{this.context.logger.info("Unable to clone video as it is tainted",e)}var i=e.ownerDocument.createElement("canvas");return i.width=e.offsetWidth,i.height=e.offsetHeight,i},n.prototype.appendChildNode=function(e,t,A){(!ci(t)||!vx(t)&&!t.hasAttribute(Lf)&&(typeof this.options.ignoreElements!="function"||!this.options.ignoreElements(t)))&&(!this.options.copyStyles||!ci(t)||!Ku(t))&&e.appendChild(this.cloneNode(t,A))},n.prototype.cloneChildNodes=function(e,t,A){for(var i=this,r=e.shadowRoot?e.shadowRoot.firstChild:e.firstChild;r;r=r.nextSibling)if(ci(r)&&If(r)&&typeof r.assignedNodes=="function"){var s=r.assignedNodes();s.length&&s.forEach(function(a){return i.appendChildNode(t,a,A)})}else this.appendChildNode(t,r,A)},n.prototype.cloneNode=function(e,t){if(Ff(e))return document.createTextNode(e.data);if(!e.ownerDocument)return e.cloneNode(!1);var A=e.ownerDocument.defaultView;if(A&&ci(e)&&(hl(e)||Cs(e))){var i=this.createElementClone(e);i.style.transitionProperty="none";var r=A.getComputedStyle(e),s=A.getComputedStyle(e,":before"),a=A.getComputedStyle(e,":after");this.referenceElement===e&&hl(i)&&(this.clonedReferenceElement=i),Hl(i)&&Lx(i);var o=this.counters.parse(new Mu(this.context,r)),l=this.resolvePseudoContent(e,i,s,Zi.BEFORE);zu(e)&&(t=!0),ku(e)||this.cloneChildNodes(e,i,t),l&&i.insertBefore(l,i.firstChild);var c=this.resolvePseudoContent(e,i,a,Zi.AFTER);return c&&i.appendChild(c),this.counters.pop(o),(r&&(this.options.copyStyles||Cs(e))&&!Qf(e)||t)&&Za(r,i),(e.scrollTop!==0||e.scrollLeft!==0)&&this.scrolledElements.push([i,e.scrollLeft,e.scrollTop]),(Rs(e)||Ls(e))&&(Rs(i)||Ls(i))&&(i.value=e.value),i}return e.cloneNode(!1)},n.prototype.resolvePseudoContent=function(e,t,A,i){var r=this;if(A){var s=A.content,a=t.ownerDocument;if(!(!a||!s||s==="none"||s==="-moz-alt-content"||A.display==="none")){this.counters.parse(new Mu(this.context,A));var o=new mE(this.context,A),l=a.createElement("html2canvaspseudoelement");Za(A,l),o.content.forEach(function(u){if(u.type===0)l.appendChild(a.createTextNode(u.value));else if(u.type===22){var f=a.createElement("img");f.src=u.value,f.style.opacity="1",l.appendChild(f)}else if(u.type===18){if(u.name==="attr"){var p=u.values.filter(it);p.length&&l.appendChild(a.createTextNode(e.getAttribute(p[0].value)||""))}else if(u.name==="counter"){var g=u.values.filter(xi),m=g[0],d=g[1];if(m&&it(m)){var h=r.counters.getCounterValue(m.value),E=d&&it(d)?ol.parse(r.context,d.value):3;l.appendChild(a.createTextNode(Ar(h,E,!1)))}}else if(u.name==="counters"){var U=u.values.filter(xi),m=U[0],B=U[1],d=U[2];if(m&&it(m)){var M=r.counters.getCounterValues(m.value),x=d&&it(d)?ol.parse(r.context,d.value):3,S=B&&B.type===0?B.value:"",F=M.map(function(b){return Ar(b,x,!1)}).join(S);l.appendChild(a.createTextNode(F))}}}else if(u.type===20)switch(u.value){case"open-quote":l.appendChild(a.createTextNode(Su(o.quotes,r.quoteDepth++,!0)));break;case"close-quote":l.appendChild(a.createTextNode(Su(o.quotes,--r.quoteDepth,!1)));break;default:l.appendChild(a.createTextNode(u.value))}}),l.className=dl+" "+pl;var c=i===Zi.BEFORE?" "+dl:" "+pl;return Cs(t)?t.className.baseValue+=c:t.className+=c,l}}},n.destroy=function(e){return e.parentNode?(e.parentNode.removeChild(e),!0):!1},n})(),Zi;(function(n){n[n.BEFORE=0]="BEFORE",n[n.AFTER=1]="AFTER"})(Zi||(Zi={}));var Ux=function(n,e){var t=n.createElement("iframe");return t.className="html2canvas-container",t.style.visibility="hidden",t.style.position="fixed",t.style.left="-10000px",t.style.top="0px",t.style.border="0",t.width=e.width.toString(),t.height=e.height.toString(),t.scrolling="no",t.setAttribute(Lf,"true"),n.body.appendChild(t),t},yx=function(n){return new Promise(function(e){if(n.complete){e();return}if(!n.src){e();return}n.onload=e,n.onerror=e})},Sx=function(n){return Promise.all([].slice.call(n.images,0).map(yx))},Mx=function(n){return new Promise(function(e,t){var A=n.contentWindow;if(!A)return t("No window assigned for iframe");var i=A.document;A.onload=n.onload=function(){A.onload=n.onload=null;var r=setInterval(function(){i.body.childNodes.length>0&&i.readyState==="complete"&&(clearInterval(r),e(n))},50)}})},Fx=["all","d","content"],Za=function(n,e){for(var t=n.length-1;t>=0;t--){var A=n.item(t);Fx.indexOf(A)===-1&&e.style.setProperty(A,n.getPropertyValue(A))}return e},bx=function(n){var e="";return n&&(e+="<!DOCTYPE ",n.name&&(e+=n.name),n.internalSubset&&(e+=n.internalSubset),n.publicId&&(e+='"'+n.publicId+'"'),n.systemId&&(e+='"'+n.systemId+'"'),e+=">"),e},Tx=function(n,e,t){n&&n.defaultView&&(e!==n.defaultView.pageXOffset||t!==n.defaultView.pageYOffset)&&n.defaultView.scrollTo(e,t)},Qx=function(n){var e=n[0],t=n[1],A=n[2];e.scrollLeft=t,e.scrollTop=A},Ix=":before",Rx=":after",dl="___html2canvas___pseudoelement_before",pl="___html2canvas___pseudoelement_after",ju=`{
    content: "" !important;
    display: none !important;
}`,Lx=function(n){Dx(n,"."+dl+Ix+ju+`
         .`+pl+Rx+ju)},Dx=function(n,e){var t=n.ownerDocument;if(t){var A=t.createElement("style");A.textContent=e,n.appendChild(A)}},Df=(function(){function n(){}return n.getOrigin=function(e){var t=n._link;return t?(t.href=e,t.href=t.href,t.protocol+t.hostname+t.port):"about:blank"},n.isSameOrigin=function(e){return n.getOrigin(e)===n._origin},n.setContext=function(e){n._link=e.document.createElement("a"),n._origin=n.getOrigin(e.location.href)},n._origin="about:blank",n})(),Hx=(function(){function n(e,t){this.context=e,this._options=t,this._cache={}}return n.prototype.addImage=function(e){var t=Promise.resolve();return this.has(e)||($a(e)||Gx(e))&&(this._cache[e]=this.loadImage(e)).catch(function(){}),t},n.prototype.match=function(e){return this._cache[e]},n.prototype.loadImage=function(e){return Ot(this,void 0,void 0,function(){var t,A,i,r,s=this;return Dt(this,function(a){switch(a.label){case 0:return t=Df.isSameOrigin(e),A=!ja(e)&&this._options.useCORS===!0&&Ft.SUPPORT_CORS_IMAGES&&!t,i=!ja(e)&&!t&&!$a(e)&&typeof this._options.proxy=="string"&&Ft.SUPPORT_CORS_XHR&&!A,!t&&this._options.allowTaint===!1&&!ja(e)&&!$a(e)&&!i&&!A?[2]:(r=e,i?[4,this.proxy(r)]:[3,2]);case 1:r=a.sent(),a.label=2;case 2:return this.context.logger.debug("Added image "+e.substring(0,256)),[4,new Promise(function(o,l){var c=new Image;c.onload=function(){return o(c)},c.onerror=l,(Vx(r)||A)&&(c.crossOrigin="anonymous"),c.src=r,c.complete===!0&&setTimeout(function(){return o(c)},500),s._options.imageTimeout>0&&setTimeout(function(){return l("Timed out ("+s._options.imageTimeout+"ms) loading image")},s._options.imageTimeout)})];case 3:return[2,a.sent()]}})})},n.prototype.has=function(e){return typeof this._cache[e]<"u"},n.prototype.keys=function(){return Promise.resolve(Object.keys(this._cache))},n.prototype.proxy=function(e){var t=this,A=this._options.proxy;if(!A)throw new Error("No proxy defined");var i=e.substring(0,256);return new Promise(function(r,s){var a=Ft.SUPPORT_RESPONSE_TYPE?"blob":"text",o=new XMLHttpRequest;o.onload=function(){if(o.status===200)if(a==="text")r(o.response);else{var u=new FileReader;u.addEventListener("load",function(){return r(u.result)},!1),u.addEventListener("error",function(f){return s(f)},!1),u.readAsDataURL(o.response)}else s("Failed to proxy resource "+i+" with status code "+o.status)},o.onerror=s;var l=A.indexOf("?")>-1?"&":"?";if(o.open("GET",""+A+l+"url="+encodeURIComponent(e)+"&responseType="+a),a!=="text"&&o instanceof XMLHttpRequest&&(o.responseType=a),t._options.imageTimeout){var c=t._options.imageTimeout;o.timeout=c,o.ontimeout=function(){return s("Timed out ("+c+"ms) proxying "+i)}}o.send()})},n})(),Px=/^data:image\/svg\+xml/i,Nx=/^data:image\/.*;base64,/i,Ox=/^data:image\/.*/i,Gx=function(n){return Ft.SUPPORT_SVG_DRAWING||!kx(n)},ja=function(n){return Ox.test(n)},Vx=function(n){return Nx.test(n)},$a=function(n){return n.substr(0,4)==="blob"},kx=function(n){return n.substr(-3).toLowerCase()==="svg"||Px.test(n)},fe=(function(){function n(e,t){this.type=0,this.x=e,this.y=t}return n.prototype.add=function(e,t){return new n(this.x+e,this.y+t)},n})(),ni=function(n,e,t){return new fe(n.x+(e.x-n.x)*t,n.y+(e.y-n.y)*t)},ls=(function(){function n(e,t,A,i){this.type=1,this.start=e,this.startControl=t,this.endControl=A,this.end=i}return n.prototype.subdivide=function(e,t){var A=ni(this.start,this.startControl,e),i=ni(this.startControl,this.endControl,e),r=ni(this.endControl,this.end,e),s=ni(A,i,e),a=ni(i,r,e),o=ni(s,a,e);return t?new n(this.start,A,s,o):new n(o,a,r,this.end)},n.prototype.add=function(e,t){return new n(this.start.add(e,t),this.startControl.add(e,t),this.endControl.add(e,t),this.end.add(e,t))},n.prototype.reverse=function(){return new n(this.end,this.endControl,this.startControl,this.start)},n})(),sA=function(n){return n.type===1},Kx=(function(){function n(e){var t=e.styles,A=e.bounds,i=ki(t.borderTopLeftRadius,A.width,A.height),r=i[0],s=i[1],a=ki(t.borderTopRightRadius,A.width,A.height),o=a[0],l=a[1],c=ki(t.borderBottomRightRadius,A.width,A.height),u=c[0],f=c[1],p=ki(t.borderBottomLeftRadius,A.width,A.height),g=p[0],m=p[1],d=[];d.push((r+o)/A.width),d.push((g+u)/A.width),d.push((s+m)/A.height),d.push((l+f)/A.height);var h=Math.max.apply(Math,d);h>1&&(r/=h,s/=h,o/=h,l/=h,u/=h,f/=h,g/=h,m/=h);var E=A.width-o,U=A.height-f,B=A.width-u,M=A.height-m,x=t.borderTopWidth,S=t.borderRightWidth,F=t.borderBottomWidth,_=t.borderLeftWidth,v=st(t.paddingTop,e.bounds.width),b=st(t.paddingRight,e.bounds.width),H=st(t.paddingBottom,e.bounds.width),L=st(t.paddingLeft,e.bounds.width);this.topLeftBorderDoubleOuterBox=r>0||s>0?ct(A.left+_/3,A.top+x/3,r-_/3,s-x/3,je.TOP_LEFT):new fe(A.left+_/3,A.top+x/3),this.topRightBorderDoubleOuterBox=r>0||s>0?ct(A.left+E,A.top+x/3,o-S/3,l-x/3,je.TOP_RIGHT):new fe(A.left+A.width-S/3,A.top+x/3),this.bottomRightBorderDoubleOuterBox=u>0||f>0?ct(A.left+B,A.top+U,u-S/3,f-F/3,je.BOTTOM_RIGHT):new fe(A.left+A.width-S/3,A.top+A.height-F/3),this.bottomLeftBorderDoubleOuterBox=g>0||m>0?ct(A.left+_/3,A.top+M,g-_/3,m-F/3,je.BOTTOM_LEFT):new fe(A.left+_/3,A.top+A.height-F/3),this.topLeftBorderDoubleInnerBox=r>0||s>0?ct(A.left+_*2/3,A.top+x*2/3,r-_*2/3,s-x*2/3,je.TOP_LEFT):new fe(A.left+_*2/3,A.top+x*2/3),this.topRightBorderDoubleInnerBox=r>0||s>0?ct(A.left+E,A.top+x*2/3,o-S*2/3,l-x*2/3,je.TOP_RIGHT):new fe(A.left+A.width-S*2/3,A.top+x*2/3),this.bottomRightBorderDoubleInnerBox=u>0||f>0?ct(A.left+B,A.top+U,u-S*2/3,f-F*2/3,je.BOTTOM_RIGHT):new fe(A.left+A.width-S*2/3,A.top+A.height-F*2/3),this.bottomLeftBorderDoubleInnerBox=g>0||m>0?ct(A.left+_*2/3,A.top+M,g-_*2/3,m-F*2/3,je.BOTTOM_LEFT):new fe(A.left+_*2/3,A.top+A.height-F*2/3),this.topLeftBorderStroke=r>0||s>0?ct(A.left+_/2,A.top+x/2,r-_/2,s-x/2,je.TOP_LEFT):new fe(A.left+_/2,A.top+x/2),this.topRightBorderStroke=r>0||s>0?ct(A.left+E,A.top+x/2,o-S/2,l-x/2,je.TOP_RIGHT):new fe(A.left+A.width-S/2,A.top+x/2),this.bottomRightBorderStroke=u>0||f>0?ct(A.left+B,A.top+U,u-S/2,f-F/2,je.BOTTOM_RIGHT):new fe(A.left+A.width-S/2,A.top+A.height-F/2),this.bottomLeftBorderStroke=g>0||m>0?ct(A.left+_/2,A.top+M,g-_/2,m-F/2,je.BOTTOM_LEFT):new fe(A.left+_/2,A.top+A.height-F/2),this.topLeftBorderBox=r>0||s>0?ct(A.left,A.top,r,s,je.TOP_LEFT):new fe(A.left,A.top),this.topRightBorderBox=o>0||l>0?ct(A.left+E,A.top,o,l,je.TOP_RIGHT):new fe(A.left+A.width,A.top),this.bottomRightBorderBox=u>0||f>0?ct(A.left+B,A.top+U,u,f,je.BOTTOM_RIGHT):new fe(A.left+A.width,A.top+A.height),this.bottomLeftBorderBox=g>0||m>0?ct(A.left,A.top+M,g,m,je.BOTTOM_LEFT):new fe(A.left,A.top+A.height),this.topLeftPaddingBox=r>0||s>0?ct(A.left+_,A.top+x,Math.max(0,r-_),Math.max(0,s-x),je.TOP_LEFT):new fe(A.left+_,A.top+x),this.topRightPaddingBox=o>0||l>0?ct(A.left+Math.min(E,A.width-S),A.top+x,E>A.width+S?0:Math.max(0,o-S),Math.max(0,l-x),je.TOP_RIGHT):new fe(A.left+A.width-S,A.top+x),this.bottomRightPaddingBox=u>0||f>0?ct(A.left+Math.min(B,A.width-_),A.top+Math.min(U,A.height-F),Math.max(0,u-S),Math.max(0,f-F),je.BOTTOM_RIGHT):new fe(A.left+A.width-S,A.top+A.height-F),this.bottomLeftPaddingBox=g>0||m>0?ct(A.left+_,A.top+Math.min(M,A.height-F),Math.max(0,g-_),Math.max(0,m-F),je.BOTTOM_LEFT):new fe(A.left+_,A.top+A.height-F),this.topLeftContentBox=r>0||s>0?ct(A.left+_+L,A.top+x+v,Math.max(0,r-(_+L)),Math.max(0,s-(x+v)),je.TOP_LEFT):new fe(A.left+_+L,A.top+x+v),this.topRightContentBox=o>0||l>0?ct(A.left+Math.min(E,A.width+_+L),A.top+x+v,E>A.width+_+L?0:o-_+L,l-(x+v),je.TOP_RIGHT):new fe(A.left+A.width-(S+b),A.top+x+v),this.bottomRightContentBox=u>0||f>0?ct(A.left+Math.min(B,A.width-(_+L)),A.top+Math.min(U,A.height+x+v),Math.max(0,u-(S+b)),f-(F+H),je.BOTTOM_RIGHT):new fe(A.left+A.width-(S+b),A.top+A.height-(F+H)),this.bottomLeftContentBox=g>0||m>0?ct(A.left+_+L,A.top+M,Math.max(0,g-(_+L)),m-(F+H),je.BOTTOM_LEFT):new fe(A.left+_+L,A.top+A.height-(F+H))}return n})(),je;(function(n){n[n.TOP_LEFT=0]="TOP_LEFT",n[n.TOP_RIGHT=1]="TOP_RIGHT",n[n.BOTTOM_RIGHT=2]="BOTTOM_RIGHT",n[n.BOTTOM_LEFT=3]="BOTTOM_LEFT"})(je||(je={}));var ct=function(n,e,t,A,i){var r=4*((Math.sqrt(2)-1)/3),s=t*r,a=A*r,o=n+t,l=e+A;switch(i){case je.TOP_LEFT:return new ls(new fe(n,l),new fe(n,l-a),new fe(o-s,e),new fe(o,e));case je.TOP_RIGHT:return new ls(new fe(n,e),new fe(n+s,e),new fe(o,l-a),new fe(o,l));case je.BOTTOM_RIGHT:return new ls(new fe(o,e),new fe(o,e+a),new fe(n+s,l),new fe(n,l));case je.BOTTOM_LEFT:default:return new ls(new fe(o,l),new fe(o-s,l),new fe(n,e+a),new fe(n,e))}},Ds=function(n){return[n.topLeftBorderBox,n.topRightBorderBox,n.bottomRightBorderBox,n.bottomLeftBorderBox]},zx=function(n){return[n.topLeftContentBox,n.topRightContentBox,n.bottomRightContentBox,n.bottomLeftContentBox]},Hs=function(n){return[n.topLeftPaddingBox,n.topRightPaddingBox,n.bottomRightPaddingBox,n.bottomLeftPaddingBox]},Wx=(function(){function n(e,t,A){this.offsetX=e,this.offsetY=t,this.matrix=A,this.type=0,this.target=6}return n})(),cs=(function(){function n(e,t){this.path=e,this.target=t,this.type=1}return n})(),Xx=(function(){function n(e){this.opacity=e,this.type=2,this.target=6}return n})(),Yx=function(n){return n.type===0},Hf=function(n){return n.type===1},Jx=function(n){return n.type===2},$u=function(n,e){return n.length===e.length?n.some(function(t,A){return t===e[A]}):!1},qx=function(n,e,t,A,i){return n.map(function(r,s){switch(s){case 0:return r.add(e,t);case 1:return r.add(e+A,t);case 2:return r.add(e+A,t+i);case 3:return r.add(e,t+i)}return r})},Pf=(function(){function n(e){this.element=e,this.inlineLevel=[],this.nonInlineLevel=[],this.negativeZIndex=[],this.zeroOrAutoZIndexOrTransformedOrOpacity=[],this.positiveZIndex=[],this.nonPositionedFloats=[],this.nonPositionedInlineLevel=[]}return n})(),Nf=(function(){function n(e,t){if(this.container=e,this.parent=t,this.effects=[],this.curves=new Kx(this.container),this.container.styles.opacity<1&&this.effects.push(new Xx(this.container.styles.opacity)),this.container.styles.transform!==null){var A=this.container.bounds.left+this.container.styles.transformOrigin[0].number,i=this.container.bounds.top+this.container.styles.transformOrigin[1].number,r=this.container.styles.transform;this.effects.push(new Wx(A,i,r))}if(this.container.styles.overflowX!==0){var s=Ds(this.curves),a=Hs(this.curves);$u(s,a)?this.effects.push(new cs(s,6)):(this.effects.push(new cs(s,2)),this.effects.push(new cs(a,4)))}}return n.prototype.getEffects=function(e){for(var t=[2,3].indexOf(this.container.styles.position)===-1,A=this.parent,i=this.effects.slice(0);A;){var r=A.effects.filter(function(o){return!Hf(o)});if(t||A.container.styles.position!==0||!A.parent){if(i.unshift.apply(i,r),t=[2,3].indexOf(A.container.styles.position)===-1,A.container.styles.overflowX!==0){var s=Ds(A.curves),a=Hs(A.curves);$u(s,a)||i.unshift(new cs(a,6))}}else i.unshift.apply(i,r);A=A.parent}return i.filter(function(o){return Ct(o.target,e)})},n})(),gl=function(n,e,t,A){n.container.elements.forEach(function(i){var r=Ct(i.flags,4),s=Ct(i.flags,2),a=new Nf(i,n);Ct(i.styles.display,2048)&&A.push(a);var o=Ct(i.flags,8)?[]:A;if(r||s){var l=r||i.styles.isPositioned()?t:e,c=new Pf(a);if(i.styles.isPositioned()||i.styles.opacity<1||i.styles.isTransformed()){var u=i.styles.zIndex.order;if(u<0){var f=0;l.negativeZIndex.some(function(g,m){return u>g.element.container.styles.zIndex.order?(f=m,!1):f>0}),l.negativeZIndex.splice(f,0,c)}else if(u>0){var p=0;l.positiveZIndex.some(function(g,m){return u>=g.element.container.styles.zIndex.order?(p=m+1,!1):p>0}),l.positiveZIndex.splice(p,0,c)}else l.zeroOrAutoZIndexOrTransformedOrOpacity.push(c)}else i.styles.isFloating()?l.nonPositionedFloats.push(c):l.nonPositionedInlineLevel.push(c);gl(a,c,r?c:t,o)}else i.styles.isInlineLevel()?e.inlineLevel.push(a):e.nonInlineLevel.push(a),gl(a,e,t,o);Ct(i.flags,8)&&Of(i,o)})},Of=function(n,e){for(var t=n instanceof ul?n.start:1,A=n instanceof ul?n.reversed:!1,i=0;i<e.length;i++){var r=e[i];r.container instanceof Ef&&typeof r.container.value=="number"&&r.container.value!==0&&(t=r.container.value),r.listValue=Ar(t,r.container.styles.listStyleType,!0),t+=A?-1:1}},Zx=function(n){var e=new Nf(n,null),t=new Pf(e),A=[];return gl(e,t,t,A),Of(e.container,A),t},eh=function(n,e){switch(e){case 0:return lA(n.topLeftBorderBox,n.topLeftPaddingBox,n.topRightBorderBox,n.topRightPaddingBox);case 1:return lA(n.topRightBorderBox,n.topRightPaddingBox,n.bottomRightBorderBox,n.bottomRightPaddingBox);case 2:return lA(n.bottomRightBorderBox,n.bottomRightPaddingBox,n.bottomLeftBorderBox,n.bottomLeftPaddingBox);case 3:default:return lA(n.bottomLeftBorderBox,n.bottomLeftPaddingBox,n.topLeftBorderBox,n.topLeftPaddingBox)}},jx=function(n,e){switch(e){case 0:return lA(n.topLeftBorderBox,n.topLeftBorderDoubleOuterBox,n.topRightBorderBox,n.topRightBorderDoubleOuterBox);case 1:return lA(n.topRightBorderBox,n.topRightBorderDoubleOuterBox,n.bottomRightBorderBox,n.bottomRightBorderDoubleOuterBox);case 2:return lA(n.bottomRightBorderBox,n.bottomRightBorderDoubleOuterBox,n.bottomLeftBorderBox,n.bottomLeftBorderDoubleOuterBox);case 3:default:return lA(n.bottomLeftBorderBox,n.bottomLeftBorderDoubleOuterBox,n.topLeftBorderBox,n.topLeftBorderDoubleOuterBox)}},$x=function(n,e){switch(e){case 0:return lA(n.topLeftBorderDoubleInnerBox,n.topLeftPaddingBox,n.topRightBorderDoubleInnerBox,n.topRightPaddingBox);case 1:return lA(n.topRightBorderDoubleInnerBox,n.topRightPaddingBox,n.bottomRightBorderDoubleInnerBox,n.bottomRightPaddingBox);case 2:return lA(n.bottomRightBorderDoubleInnerBox,n.bottomRightPaddingBox,n.bottomLeftBorderDoubleInnerBox,n.bottomLeftPaddingBox);case 3:default:return lA(n.bottomLeftBorderDoubleInnerBox,n.bottomLeftPaddingBox,n.topLeftBorderDoubleInnerBox,n.topLeftPaddingBox)}},eU=function(n,e){switch(e){case 0:return us(n.topLeftBorderStroke,n.topRightBorderStroke);case 1:return us(n.topRightBorderStroke,n.bottomRightBorderStroke);case 2:return us(n.bottomRightBorderStroke,n.bottomLeftBorderStroke);case 3:default:return us(n.bottomLeftBorderStroke,n.topLeftBorderStroke)}},us=function(n,e){var t=[];return sA(n)?t.push(n.subdivide(.5,!1)):t.push(n),sA(e)?t.push(e.subdivide(.5,!0)):t.push(e),t},lA=function(n,e,t,A){var i=[];return sA(n)?i.push(n.subdivide(.5,!1)):i.push(n),sA(t)?i.push(t.subdivide(.5,!0)):i.push(t),sA(A)?i.push(A.subdivide(.5,!0).reverse()):i.push(A),sA(e)?i.push(e.subdivide(.5,!1).reverse()):i.push(e),i},Gf=function(n){var e=n.bounds,t=n.styles;return e.add(t.borderLeftWidth,t.borderTopWidth,-(t.borderRightWidth+t.borderLeftWidth),-(t.borderTopWidth+t.borderBottomWidth))},Ps=function(n){var e=n.styles,t=n.bounds,A=st(e.paddingLeft,t.width),i=st(e.paddingRight,t.width),r=st(e.paddingTop,t.width),s=st(e.paddingBottom,t.width);return t.add(A+e.borderLeftWidth,r+e.borderTopWidth,-(e.borderRightWidth+e.borderLeftWidth+A+i),-(e.borderTopWidth+e.borderBottomWidth+r+s))},tU=function(n,e){return n===0?e.bounds:n===2?Ps(e):Gf(e)},AU=function(n,e){return n===0?e.bounds:n===2?Ps(e):Gf(e)},eo=function(n,e,t){var A=tU(ai(n.styles.backgroundOrigin,e),n),i=AU(ai(n.styles.backgroundClip,e),n),r=nU(ai(n.styles.backgroundSize,e),t,A),s=r[0],a=r[1],o=ki(ai(n.styles.backgroundPosition,e),A.width-s,A.height-a),l=iU(ai(n.styles.backgroundRepeat,e),o,r,A,i),c=Math.round(A.left+o[0]),u=Math.round(A.top+o[1]);return[l,c,u,s,a]},ii=function(n){return it(n)&&n.value===gi.AUTO},hs=function(n){return typeof n=="number"},nU=function(n,e,t){var A=e[0],i=e[1],r=e[2],s=n[0],a=n[1];if(!s)return[0,0];if(_t(s)&&a&&_t(a))return[st(s,t.width),st(a,t.height)];var o=hs(r);if(it(s)&&(s.value===gi.CONTAIN||s.value===gi.COVER)){if(hs(r)){var l=t.width/t.height;return l<r!=(s.value===gi.COVER)?[t.width,t.width/r]:[t.height*r,t.height]}return[t.width,t.height]}var c=hs(A),u=hs(i),f=c||u;if(ii(s)&&(!a||ii(a))){if(c&&u)return[A,i];if(!o&&!f)return[t.width,t.height];if(f&&o){var p=c?A:i*r,g=u?i:A/r;return[p,g]}var m=c?A:t.width,d=u?i:t.height;return[m,d]}if(o){var h=0,E=0;return _t(s)?h=st(s,t.width):_t(a)&&(E=st(a,t.height)),ii(s)?h=E*r:(!a||ii(a))&&(E=h/r),[h,E]}var U=null,B=null;if(_t(s)?U=st(s,t.width):a&&_t(a)&&(B=st(a,t.height)),U!==null&&(!a||ii(a))&&(B=c&&u?U/A*i:t.height),B!==null&&ii(s)&&(U=c&&u?B/i*A:t.width),U!==null&&B!==null)return[U,B];throw new Error("Unable to calculate background-size for element")},ai=function(n,e){var t=n[e];return typeof t>"u"?n[0]:t},iU=function(n,e,t,A,i){var r=e[0],s=e[1],a=t[0],o=t[1];switch(n){case 2:return[new fe(Math.round(A.left),Math.round(A.top+s)),new fe(Math.round(A.left+A.width),Math.round(A.top+s)),new fe(Math.round(A.left+A.width),Math.round(o+A.top+s)),new fe(Math.round(A.left),Math.round(o+A.top+s))];case 3:return[new fe(Math.round(A.left+r),Math.round(A.top)),new fe(Math.round(A.left+r+a),Math.round(A.top)),new fe(Math.round(A.left+r+a),Math.round(A.height+A.top)),new fe(Math.round(A.left+r),Math.round(A.height+A.top))];case 1:return[new fe(Math.round(A.left+r),Math.round(A.top+s)),new fe(Math.round(A.left+r+a),Math.round(A.top+s)),new fe(Math.round(A.left+r+a),Math.round(A.top+s+o)),new fe(Math.round(A.left+r),Math.round(A.top+s+o))];default:return[new fe(Math.round(i.left),Math.round(i.top)),new fe(Math.round(i.left+i.width),Math.round(i.top)),new fe(Math.round(i.left+i.width),Math.round(i.height+i.top)),new fe(Math.round(i.left),Math.round(i.height+i.top))]}},rU="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",th="Hidden Text",sU=(function(){function n(e){this._data={},this._document=e}return n.prototype.parseMetrics=function(e,t){var A=this._document.createElement("div"),i=this._document.createElement("img"),r=this._document.createElement("span"),s=this._document.body;A.style.visibility="hidden",A.style.fontFamily=e,A.style.fontSize=t,A.style.margin="0",A.style.padding="0",A.style.whiteSpace="nowrap",s.appendChild(A),i.src=rU,i.width=1,i.height=1,i.style.margin="0",i.style.padding="0",i.style.verticalAlign="baseline",r.style.fontFamily=e,r.style.fontSize=t,r.style.margin="0",r.style.padding="0",r.appendChild(this._document.createTextNode(th)),A.appendChild(r),A.appendChild(i);var a=i.offsetTop-r.offsetTop+2;A.removeChild(r),A.appendChild(this._document.createTextNode(th)),A.style.lineHeight="normal",i.style.verticalAlign="super";var o=i.offsetTop-A.offsetTop+2;return s.removeChild(A),{baseline:a,middle:o}},n.prototype.getMetrics=function(e,t){var A=e+" "+t;return typeof this._data[A]>"u"&&(this._data[A]=this.parseMetrics(e,t)),this._data[A]},n})(),Vf=(function(){function n(e,t){this.context=e,this.options=t}return n})(),aU=1e4,oU=(function(n){wA(e,n);function e(t,A){var i=n.call(this,t,A)||this;return i._activeEffects=[],i.canvas=A.canvas?A.canvas:document.createElement("canvas"),i.ctx=i.canvas.getContext("2d"),A.canvas||(i.canvas.width=Math.floor(A.width*A.scale),i.canvas.height=Math.floor(A.height*A.scale),i.canvas.style.width=A.width+"px",i.canvas.style.height=A.height+"px"),i.fontMetrics=new sU(document),i.ctx.scale(i.options.scale,i.options.scale),i.ctx.translate(-A.x,-A.y),i.ctx.textBaseline="bottom",i._activeEffects=[],i.context.logger.debug("Canvas renderer initialized ("+A.width+"x"+A.height+") with scale "+A.scale),i}return e.prototype.applyEffects=function(t){for(var A=this;this._activeEffects.length;)this.popEffect();t.forEach(function(i){return A.applyEffect(i)})},e.prototype.applyEffect=function(t){this.ctx.save(),Jx(t)&&(this.ctx.globalAlpha=t.opacity),Yx(t)&&(this.ctx.translate(t.offsetX,t.offsetY),this.ctx.transform(t.matrix[0],t.matrix[1],t.matrix[2],t.matrix[3],t.matrix[4],t.matrix[5]),this.ctx.translate(-t.offsetX,-t.offsetY)),Hf(t)&&(this.path(t.path),this.ctx.clip()),this._activeEffects.push(t)},e.prototype.popEffect=function(){this._activeEffects.pop(),this.ctx.restore()},e.prototype.renderStack=function(t){return Ot(this,void 0,void 0,function(){var A;return Dt(this,function(i){switch(i.label){case 0:return A=t.element.container.styles,A.isVisible()?[4,this.renderStackContent(t)]:[3,2];case 1:i.sent(),i.label=2;case 2:return[2]}})})},e.prototype.renderNode=function(t){return Ot(this,void 0,void 0,function(){return Dt(this,function(A){switch(A.label){case 0:if(Ct(t.container.flags,16))debugger;return t.container.styles.isVisible()?[4,this.renderNodeBackgroundAndBorders(t)]:[3,3];case 1:return A.sent(),[4,this.renderNodeContent(t)];case 2:A.sent(),A.label=3;case 3:return[2]}})})},e.prototype.renderTextWithLetterSpacing=function(t,A,i){var r=this;if(A===0)this.ctx.fillText(t.text,t.bounds.left,t.bounds.top+i);else{var s=Ll(t.text);s.reduce(function(a,o){return r.ctx.fillText(o,a,t.bounds.top+i),a+r.ctx.measureText(o).width},t.bounds.left)}},e.prototype.createFontStyle=function(t){var A=t.fontVariant.filter(function(s){return s==="normal"||s==="small-caps"}).join(""),i=fU(t.fontFamily).join(", "),r=lr(t.fontSize)?""+t.fontSize.number+t.fontSize.unit:t.fontSize.number+"px";return[[t.fontStyle,A,t.fontWeight,r,i].join(" "),i,r]},e.prototype.renderTextNode=function(t,A){return Ot(this,void 0,void 0,function(){var i,r,s,a,o,l,c,u,f=this;return Dt(this,function(p){return i=this.createFontStyle(A),r=i[0],s=i[1],a=i[2],this.ctx.font=r,this.ctx.direction=A.direction===1?"rtl":"ltr",this.ctx.textAlign="left",this.ctx.textBaseline="alphabetic",o=this.fontMetrics.getMetrics(s,a),l=o.baseline,c=o.middle,u=A.paintOrder,t.textBounds.forEach(function(g){u.forEach(function(m){switch(m){case 0:f.ctx.fillStyle=yt(A.color),f.renderTextWithLetterSpacing(g,A.letterSpacing,l);var d=A.textShadow;d.length&&g.text.trim().length&&(d.slice(0).reverse().forEach(function(h){f.ctx.shadowColor=yt(h.color),f.ctx.shadowOffsetX=h.offsetX.number*f.options.scale,f.ctx.shadowOffsetY=h.offsetY.number*f.options.scale,f.ctx.shadowBlur=h.blur.number,f.renderTextWithLetterSpacing(g,A.letterSpacing,l)}),f.ctx.shadowColor="",f.ctx.shadowOffsetX=0,f.ctx.shadowOffsetY=0,f.ctx.shadowBlur=0),A.textDecorationLine.length&&(f.ctx.fillStyle=yt(A.textDecorationColor||A.color),A.textDecorationLine.forEach(function(h){switch(h){case 1:f.ctx.fillRect(g.bounds.left,Math.round(g.bounds.top+l),g.bounds.width,1);break;case 2:f.ctx.fillRect(g.bounds.left,Math.round(g.bounds.top),g.bounds.width,1);break;case 3:f.ctx.fillRect(g.bounds.left,Math.ceil(g.bounds.top+c),g.bounds.width,1);break}}));break;case 1:A.webkitTextStrokeWidth&&g.text.trim().length&&(f.ctx.strokeStyle=yt(A.webkitTextStrokeColor),f.ctx.lineWidth=A.webkitTextStrokeWidth,f.ctx.lineJoin=window.chrome?"miter":"round",f.ctx.strokeText(g.text,g.bounds.left,g.bounds.top+l)),f.ctx.strokeStyle="",f.ctx.lineWidth=0,f.ctx.lineJoin="miter";break}})}),[2]})})},e.prototype.renderReplacedElement=function(t,A,i){if(i&&t.intrinsicWidth>0&&t.intrinsicHeight>0){var r=Ps(t),s=Hs(A);this.path(s),this.ctx.save(),this.ctx.clip(),this.ctx.drawImage(i,0,0,t.intrinsicWidth,t.intrinsicHeight,r.left,r.top,r.width,r.height),this.ctx.restore()}},e.prototype.renderNodeContent=function(t){return Ot(this,void 0,void 0,function(){var A,i,r,s,a,o,E,E,l,c,u,f,B,p,g,M,m,d,h,E,U,B,M;return Dt(this,function(x){switch(x.label){case 0:this.applyEffects(t.getEffects(4)),A=t.container,i=t.curves,r=A.styles,s=0,a=A.textNodes,x.label=1;case 1:return s<a.length?(o=a[s],[4,this.renderTextNode(o,r)]):[3,4];case 2:x.sent(),x.label=3;case 3:return s++,[3,1];case 4:if(!(A instanceof _f))return[3,8];x.label=5;case 5:return x.trys.push([5,7,,8]),[4,this.context.cache.match(A.src)];case 6:return E=x.sent(),this.renderReplacedElement(A,i,E),[3,8];case 7:return x.sent(),this.context.logger.error("Error loading image "+A.src),[3,8];case 8:if(A instanceof vf&&this.renderReplacedElement(A,i,A.canvas),!(A instanceof Cf))return[3,12];x.label=9;case 9:return x.trys.push([9,11,,12]),[4,this.context.cache.match(A.svg)];case 10:return E=x.sent(),this.renderReplacedElement(A,i,E),[3,12];case 11:return x.sent(),this.context.logger.error("Error loading svg "+A.svg.substring(0,255)),[3,12];case 12:return A instanceof yf&&A.tree?(l=new e(this.context,{scale:this.options.scale,backgroundColor:A.backgroundColor,x:0,y:0,width:A.width,height:A.height}),[4,l.render(A.tree)]):[3,14];case 13:c=x.sent(),A.width&&A.height&&this.ctx.drawImage(c,0,0,A.width,A.height,A.bounds.left,A.bounds.top,A.bounds.width,A.bounds.height),x.label=14;case 14:if(A instanceof Dl&&(u=Math.min(A.bounds.width,A.bounds.height),A.type===Qs?A.checked&&(this.ctx.save(),this.path([new fe(A.bounds.left+u*.39363,A.bounds.top+u*.79),new fe(A.bounds.left+u*.16,A.bounds.top+u*.5549),new fe(A.bounds.left+u*.27347,A.bounds.top+u*.44071),new fe(A.bounds.left+u*.39694,A.bounds.top+u*.5649),new fe(A.bounds.left+u*.72983,A.bounds.top+u*.23),new fe(A.bounds.left+u*.84,A.bounds.top+u*.34085),new fe(A.bounds.left+u*.39363,A.bounds.top+u*.79)]),this.ctx.fillStyle=yt(Vu),this.ctx.fill(),this.ctx.restore()):A.type===Is&&A.checked&&(this.ctx.save(),this.ctx.beginPath(),this.ctx.arc(A.bounds.left+u/2,A.bounds.top+u/2,u/4,0,Math.PI*2,!0),this.ctx.fillStyle=yt(Vu),this.ctx.fill(),this.ctx.restore())),lU(A)&&A.value.length){switch(f=this.createFontStyle(r),B=f[0],p=f[1],g=this.fontMetrics.getMetrics(B,p).baseline,this.ctx.font=B,this.ctx.fillStyle=yt(r.color),this.ctx.textBaseline="alphabetic",this.ctx.textAlign=uU(A.styles.textAlign),M=Ps(A),m=0,A.styles.textAlign){case 1:m+=M.width/2;break;case 2:m+=M.width;break}d=M.add(m,0,0,-M.height/2+1),this.ctx.save(),this.path([new fe(M.left,M.top),new fe(M.left+M.width,M.top),new fe(M.left+M.width,M.top+M.height),new fe(M.left,M.top+M.height)]),this.ctx.clip(),this.renderTextWithLetterSpacing(new qi(A.value,d),r.letterSpacing,g),this.ctx.restore(),this.ctx.textBaseline="alphabetic",this.ctx.textAlign="left"}if(!Ct(A.styles.display,2048))return[3,20];if(A.styles.listStyleImage===null)return[3,19];if(h=A.styles.listStyleImage,h.type!==0)return[3,18];E=void 0,U=h.url,x.label=15;case 15:return x.trys.push([15,17,,18]),[4,this.context.cache.match(U)];case 16:return E=x.sent(),this.ctx.drawImage(E,A.bounds.left-(E.width+10),A.bounds.top),[3,18];case 17:return x.sent(),this.context.logger.error("Error loading list-style-image "+U),[3,18];case 18:return[3,20];case 19:t.listValue&&A.styles.listStyleType!==-1&&(B=this.createFontStyle(r)[0],this.ctx.font=B,this.ctx.fillStyle=yt(r.color),this.ctx.textBaseline="middle",this.ctx.textAlign="right",M=new kA(A.bounds.left,A.bounds.top+st(A.styles.paddingTop,A.bounds.width),A.bounds.width,Uu(r.lineHeight,r.fontSize.number)/2+1),this.renderTextWithLetterSpacing(new qi(t.listValue,M),r.letterSpacing,Uu(r.lineHeight,r.fontSize.number)/2+2),this.ctx.textBaseline="bottom",this.ctx.textAlign="left"),x.label=20;case 20:return[2]}})})},e.prototype.renderStackContent=function(t){return Ot(this,void 0,void 0,function(){var A,i,h,r,s,h,a,o,h,l,c,h,u,f,h,p,g,h,m,d,h;return Dt(this,function(E){switch(E.label){case 0:if(Ct(t.element.container.flags,16))debugger;return[4,this.renderNodeBackgroundAndBorders(t.element)];case 1:E.sent(),A=0,i=t.negativeZIndex,E.label=2;case 2:return A<i.length?(h=i[A],[4,this.renderStack(h)]):[3,5];case 3:E.sent(),E.label=4;case 4:return A++,[3,2];case 5:return[4,this.renderNodeContent(t.element)];case 6:E.sent(),r=0,s=t.nonInlineLevel,E.label=7;case 7:return r<s.length?(h=s[r],[4,this.renderNode(h)]):[3,10];case 8:E.sent(),E.label=9;case 9:return r++,[3,7];case 10:a=0,o=t.nonPositionedFloats,E.label=11;case 11:return a<o.length?(h=o[a],[4,this.renderStack(h)]):[3,14];case 12:E.sent(),E.label=13;case 13:return a++,[3,11];case 14:l=0,c=t.nonPositionedInlineLevel,E.label=15;case 15:return l<c.length?(h=c[l],[4,this.renderStack(h)]):[3,18];case 16:E.sent(),E.label=17;case 17:return l++,[3,15];case 18:u=0,f=t.inlineLevel,E.label=19;case 19:return u<f.length?(h=f[u],[4,this.renderNode(h)]):[3,22];case 20:E.sent(),E.label=21;case 21:return u++,[3,19];case 22:p=0,g=t.zeroOrAutoZIndexOrTransformedOrOpacity,E.label=23;case 23:return p<g.length?(h=g[p],[4,this.renderStack(h)]):[3,26];case 24:E.sent(),E.label=25;case 25:return p++,[3,23];case 26:m=0,d=t.positiveZIndex,E.label=27;case 27:return m<d.length?(h=d[m],[4,this.renderStack(h)]):[3,30];case 28:E.sent(),E.label=29;case 29:return m++,[3,27];case 30:return[2]}})})},e.prototype.mask=function(t){this.ctx.beginPath(),this.ctx.moveTo(0,0),this.ctx.lineTo(this.canvas.width,0),this.ctx.lineTo(this.canvas.width,this.canvas.height),this.ctx.lineTo(0,this.canvas.height),this.ctx.lineTo(0,0),this.formatPath(t.slice(0).reverse()),this.ctx.closePath()},e.prototype.path=function(t){this.ctx.beginPath(),this.formatPath(t),this.ctx.closePath()},e.prototype.formatPath=function(t){var A=this;t.forEach(function(i,r){var s=sA(i)?i.start:i;r===0?A.ctx.moveTo(s.x,s.y):A.ctx.lineTo(s.x,s.y),sA(i)&&A.ctx.bezierCurveTo(i.startControl.x,i.startControl.y,i.endControl.x,i.endControl.y,i.end.x,i.end.y)})},e.prototype.renderRepeat=function(t,A,i,r){this.path(t),this.ctx.fillStyle=A,this.ctx.translate(i,r),this.ctx.fill(),this.ctx.translate(-i,-r)},e.prototype.resizeImage=function(t,A,i){var r;if(t.width===A&&t.height===i)return t;var s=(r=this.canvas.ownerDocument)!==null&&r!==void 0?r:document,a=s.createElement("canvas");a.width=Math.max(1,A),a.height=Math.max(1,i);var o=a.getContext("2d");return o.drawImage(t,0,0,t.width,t.height,0,0,A,i),a},e.prototype.renderBackgroundImage=function(t){return Ot(this,void 0,void 0,function(){var A,i,r,s,a,o;return Dt(this,function(l){switch(l.label){case 0:A=t.styles.backgroundImage.length-1,i=function(c){var u,f,p,v,K,Y,L,G,F,g,v,K,Y,L,G,m,d,h,E,U,B,M,x,S,F,_,v,b,H,L,G,X,K,Y,k,ne,oe,Be,Fe,Re,W,ee;return Dt(this,function(de){switch(de.label){case 0:if(c.type!==0)return[3,5];u=void 0,f=c.url,de.label=1;case 1:return de.trys.push([1,3,,4]),[4,r.context.cache.match(f)];case 2:return u=de.sent(),[3,4];case 3:return de.sent(),r.context.logger.error("Error loading background-image "+f),[3,4];case 4:return u&&(p=eo(t,A,[u.width,u.height,u.width/u.height]),v=p[0],K=p[1],Y=p[2],L=p[3],G=p[4],F=r.ctx.createPattern(r.resizeImage(u,L,G),"repeat"),r.renderRepeat(v,F,K,Y)),[3,6];case 5:Yv(c)?(g=eo(t,A,[null,null,null]),v=g[0],K=g[1],Y=g[2],L=g[3],G=g[4],m=kv(c.angle,L,G),d=m[0],h=m[1],E=m[2],U=m[3],B=m[4],M=document.createElement("canvas"),M.width=L,M.height=G,x=M.getContext("2d"),S=x.createLinearGradient(h,U,E,B),Eu(c.stops,d).forEach(function(ie){return S.addColorStop(ie.stop,yt(ie.color))}),x.fillStyle=S,x.fillRect(0,0,L,G),L>0&&G>0&&(F=r.ctx.createPattern(M,"repeat"),r.renderRepeat(v,F,K,Y))):Jv(c)&&(_=eo(t,A,[null,null,null]),v=_[0],b=_[1],H=_[2],L=_[3],G=_[4],X=c.position.length===0?[Ql]:c.position,K=st(X[0],L),Y=st(X[X.length-1],G),k=Kv(c,K,Y,L,G),ne=k[0],oe=k[1],ne>0&&oe>0&&(Be=r.ctx.createRadialGradient(b+K,H+Y,0,b+K,H+Y,ne),Eu(c.stops,ne*2).forEach(function(ie){return Be.addColorStop(ie.stop,yt(ie.color))}),r.path(v),r.ctx.fillStyle=Be,ne!==oe?(Fe=t.bounds.left+.5*t.bounds.width,Re=t.bounds.top+.5*t.bounds.height,W=oe/ne,ee=1/W,r.ctx.save(),r.ctx.translate(Fe,Re),r.ctx.transform(1,0,0,W,0,0),r.ctx.translate(-Fe,-Re),r.ctx.fillRect(b,ee*(H-Re)+Re,L,G*ee),r.ctx.restore()):r.ctx.fill())),de.label=6;case 6:return A--,[2]}})},r=this,s=0,a=t.styles.backgroundImage.slice(0).reverse(),l.label=1;case 1:return s<a.length?(o=a[s],[5,i(o)]):[3,4];case 2:l.sent(),l.label=3;case 3:return s++,[3,1];case 4:return[2]}})})},e.prototype.renderSolidBorder=function(t,A,i){return Ot(this,void 0,void 0,function(){return Dt(this,function(r){return this.path(eh(i,A)),this.ctx.fillStyle=yt(t),this.ctx.fill(),[2]})})},e.prototype.renderDoubleBorder=function(t,A,i,r){return Ot(this,void 0,void 0,function(){var s,a;return Dt(this,function(o){switch(o.label){case 0:return A<3?[4,this.renderSolidBorder(t,i,r)]:[3,2];case 1:return o.sent(),[2];case 2:return s=jx(r,i),this.path(s),this.ctx.fillStyle=yt(t),this.ctx.fill(),a=$x(r,i),this.path(a),this.ctx.fill(),[2]}})})},e.prototype.renderNodeBackgroundAndBorders=function(t){return Ot(this,void 0,void 0,function(){var A,i,r,s,a,o,l,c,u=this;return Dt(this,function(f){switch(f.label){case 0:return this.applyEffects(t.getEffects(2)),A=t.container.styles,i=!on(A.backgroundColor)||A.backgroundImage.length,r=[{style:A.borderTopStyle,color:A.borderTopColor,width:A.borderTopWidth},{style:A.borderRightStyle,color:A.borderRightColor,width:A.borderRightWidth},{style:A.borderBottomStyle,color:A.borderBottomColor,width:A.borderBottomWidth},{style:A.borderLeftStyle,color:A.borderLeftColor,width:A.borderLeftWidth}],s=cU(ai(A.backgroundClip,0),t.curves),i||A.boxShadow.length?(this.ctx.save(),this.path(s),this.ctx.clip(),on(A.backgroundColor)||(this.ctx.fillStyle=yt(A.backgroundColor),this.ctx.fill()),[4,this.renderBackgroundImage(t.container)]):[3,2];case 1:f.sent(),this.ctx.restore(),A.boxShadow.slice(0).reverse().forEach(function(p){u.ctx.save();var g=Ds(t.curves),m=p.inset?0:aU,d=qx(g,-m+(p.inset?1:-1)*p.spread.number,(p.inset?1:-1)*p.spread.number,p.spread.number*(p.inset?-2:2),p.spread.number*(p.inset?-2:2));p.inset?(u.path(g),u.ctx.clip(),u.mask(d)):(u.mask(g),u.ctx.clip(),u.path(d)),u.ctx.shadowOffsetX=p.offsetX.number+m,u.ctx.shadowOffsetY=p.offsetY.number,u.ctx.shadowColor=yt(p.color),u.ctx.shadowBlur=p.blur.number,u.ctx.fillStyle=p.inset?yt(p.color):"rgba(0,0,0,1)",u.ctx.fill(),u.ctx.restore()}),f.label=2;case 2:a=0,o=0,l=r,f.label=3;case 3:return o<l.length?(c=l[o],c.style!==0&&!on(c.color)&&c.width>0?c.style!==2?[3,5]:[4,this.renderDashedDottedBorder(c.color,c.width,a,t.curves,2)]:[3,11]):[3,13];case 4:return f.sent(),[3,11];case 5:return c.style!==3?[3,7]:[4,this.renderDashedDottedBorder(c.color,c.width,a,t.curves,3)];case 6:return f.sent(),[3,11];case 7:return c.style!==4?[3,9]:[4,this.renderDoubleBorder(c.color,c.width,a,t.curves)];case 8:return f.sent(),[3,11];case 9:return[4,this.renderSolidBorder(c.color,a,t.curves)];case 10:f.sent(),f.label=11;case 11:a++,f.label=12;case 12:return o++,[3,3];case 13:return[2]}})})},e.prototype.renderDashedDottedBorder=function(t,A,i,r,s){return Ot(this,void 0,void 0,function(){var a,o,l,c,u,f,p,g,m,d,h,E,U,B,M,x,M,x;return Dt(this,function(S){return this.ctx.save(),a=eU(r,i),o=eh(r,i),s===2&&(this.path(o),this.ctx.clip()),sA(o[0])?(l=o[0].start.x,c=o[0].start.y):(l=o[0].x,c=o[0].y),sA(o[1])?(u=o[1].end.x,f=o[1].end.y):(u=o[1].x,f=o[1].y),i===0||i===2?p=Math.abs(l-u):p=Math.abs(c-f),this.ctx.beginPath(),s===3?this.formatPath(a):this.formatPath(o.slice(0,2)),g=A<3?A*3:A*2,m=A<3?A*2:A,s===3&&(g=A,m=A),d=!0,p<=g*2?d=!1:p<=g*2+m?(h=p/(2*g+m),g*=h,m*=h):(E=Math.floor((p+m)/(g+m)),U=(p-E*g)/(E-1),B=(p-(E+1)*g)/E,m=B<=0||Math.abs(m-U)<Math.abs(m-B)?U:B),d&&(s===3?this.ctx.setLineDash([0,g+m]):this.ctx.setLineDash([g,m])),s===3?(this.ctx.lineCap="round",this.ctx.lineWidth=A):this.ctx.lineWidth=A*2+1.1,this.ctx.strokeStyle=yt(t),this.ctx.stroke(),this.ctx.setLineDash([]),s===2&&(sA(o[0])&&(M=o[3],x=o[0],this.ctx.beginPath(),this.formatPath([new fe(M.end.x,M.end.y),new fe(x.start.x,x.start.y)]),this.ctx.stroke()),sA(o[1])&&(M=o[1],x=o[2],this.ctx.beginPath(),this.formatPath([new fe(M.end.x,M.end.y),new fe(x.start.x,x.start.y)]),this.ctx.stroke())),this.ctx.restore(),[2]})})},e.prototype.render=function(t){return Ot(this,void 0,void 0,function(){var A;return Dt(this,function(i){switch(i.label){case 0:return this.options.backgroundColor&&(this.ctx.fillStyle=yt(this.options.backgroundColor),this.ctx.fillRect(this.options.x,this.options.y,this.options.width,this.options.height)),A=Zx(t),[4,this.renderStack(A)];case 1:return i.sent(),this.applyEffects([]),[2,this.canvas]}})})},e})(Vf),lU=function(n){return n instanceof Uf||n instanceof xf?!0:n instanceof Dl&&n.type!==Is&&n.type!==Qs},cU=function(n,e){switch(n){case 0:return Ds(e);case 2:return zx(e);case 1:default:return Hs(e)}},uU=function(n){switch(n){case 1:return"center";case 2:return"right";case 0:default:return"left"}},hU=["-apple-system","system-ui"],fU=function(n){return/iPhone OS 15_(0|1)/.test(window.navigator.userAgent)?n.filter(function(e){return hU.indexOf(e)===-1}):n},dU=(function(n){wA(e,n);function e(t,A){var i=n.call(this,t,A)||this;return i.canvas=A.canvas?A.canvas:document.createElement("canvas"),i.ctx=i.canvas.getContext("2d"),i.options=A,i.canvas.width=Math.floor(A.width*A.scale),i.canvas.height=Math.floor(A.height*A.scale),i.canvas.style.width=A.width+"px",i.canvas.style.height=A.height+"px",i.ctx.scale(i.options.scale,i.options.scale),i.ctx.translate(-A.x,-A.y),i.context.logger.debug("EXPERIMENTAL ForeignObject renderer initialized ("+A.width+"x"+A.height+" at "+A.x+","+A.y+") with scale "+A.scale),i}return e.prototype.render=function(t){return Ot(this,void 0,void 0,function(){var A,i;return Dt(this,function(r){switch(r.label){case 0:return A=cl(this.options.width*this.options.scale,this.options.height*this.options.scale,this.options.scale,this.options.scale,t),[4,pU(A)];case 1:return i=r.sent(),this.options.backgroundColor&&(this.ctx.fillStyle=yt(this.options.backgroundColor),this.ctx.fillRect(0,0,this.options.width*this.options.scale,this.options.height*this.options.scale)),this.ctx.drawImage(i,-this.options.x*this.options.scale,-this.options.y*this.options.scale),[2,this.canvas]}})})},e})(Vf),pU=function(n){return new Promise(function(e,t){var A=new Image;A.onload=function(){e(A)},A.onerror=t,A.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(new XMLSerializer().serializeToString(n))})},gU=(function(){function n(e){var t=e.id,A=e.enabled;this.id=t,this.enabled=A,this.start=Date.now()}return n.prototype.debug=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this.enabled&&(typeof window<"u"&&window.console&&typeof console.debug=="function"?console.debug.apply(console,Kr([this.id,this.getTime()+"ms"],e)):this.info.apply(this,e))},n.prototype.getTime=function(){return Date.now()-this.start},n.prototype.info=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this.enabled&&typeof window<"u"&&window.console&&typeof console.info=="function"&&console.info.apply(console,Kr([this.id,this.getTime()+"ms"],e))},n.prototype.warn=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this.enabled&&(typeof window<"u"&&window.console&&typeof console.warn=="function"?console.warn.apply(console,Kr([this.id,this.getTime()+"ms"],e)):this.info.apply(this,e))},n.prototype.error=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this.enabled&&(typeof window<"u"&&window.console&&typeof console.error=="function"?console.error.apply(console,Kr([this.id,this.getTime()+"ms"],e)):this.info.apply(this,e))},n.instances={},n})(),mU=(function(){function n(e,t){var A;this.windowBounds=t,this.instanceName="#"+n.instanceCount++,this.logger=new gU({id:this.instanceName,enabled:e.logging}),this.cache=(A=e.cache)!==null&&A!==void 0?A:new Hx(this,e)}return n.instanceCount=1,n})(),BU=function(n,e){return e===void 0&&(e={}),wU(n,e)};typeof window<"u"&&Df.setContext(window);var wU=function(n,e){return Ot(void 0,void 0,void 0,function(){var t,A,i,r,s,a,o,l,c,u,f,p,g,m,d,h,E,U,B,M,S,x,S,F,_,v,b,H,L,G,X,K,Y,k,ne,oe,Be,Fe,Re,W;return Dt(this,function(ee){switch(ee.label){case 0:if(!n||typeof n!="object")return[2,Promise.reject("Invalid element provided as first argument")];if(t=n.ownerDocument,!t)throw new Error("Element is not attached to a Document");if(A=t.defaultView,!A)throw new Error("Document is not attached to a Window");return i={allowTaint:(F=e.allowTaint)!==null&&F!==void 0?F:!1,imageTimeout:(_=e.imageTimeout)!==null&&_!==void 0?_:15e3,proxy:e.proxy,useCORS:(v=e.useCORS)!==null&&v!==void 0?v:!1},r=Jo({logging:(b=e.logging)!==null&&b!==void 0?b:!0,cache:e.cache},i),s={windowWidth:(H=e.windowWidth)!==null&&H!==void 0?H:A.innerWidth,windowHeight:(L=e.windowHeight)!==null&&L!==void 0?L:A.innerHeight,scrollX:(G=e.scrollX)!==null&&G!==void 0?G:A.pageXOffset,scrollY:(X=e.scrollY)!==null&&X!==void 0?X:A.pageYOffset},a=new kA(s.scrollX,s.scrollY,s.windowWidth,s.windowHeight),o=new mU(r,a),l=(K=e.foreignObjectRendering)!==null&&K!==void 0?K:!1,c={allowTaint:(Y=e.allowTaint)!==null&&Y!==void 0?Y:!1,onclone:e.onclone,ignoreElements:e.ignoreElements,inlineImages:l,copyStyles:l},o.logger.debug("Starting document clone with size "+a.width+"x"+a.height+" scrolled to "+-a.left+","+-a.top),u=new Zu(o,n,c),f=u.clonedReferenceElement,f?[4,u.toIFrame(t,a)]:[2,Promise.reject("Unable to find element in cloned iframe")];case 1:return p=ee.sent(),g=Hl(f)||_x(f)?qw(f.ownerDocument):ks(o,f),m=g.width,d=g.height,h=g.left,E=g.top,U=_U(o,f,e.backgroundColor),B={canvas:e.canvas,backgroundColor:U,scale:(ne=(k=e.scale)!==null&&k!==void 0?k:A.devicePixelRatio)!==null&&ne!==void 0?ne:1,x:((oe=e.x)!==null&&oe!==void 0?oe:0)+h,y:((Be=e.y)!==null&&Be!==void 0?Be:0)+E,width:(Fe=e.width)!==null&&Fe!==void 0?Fe:Math.ceil(m),height:(Re=e.height)!==null&&Re!==void 0?Re:Math.ceil(d)},l?(o.logger.debug("Document cloned, using foreign object rendering"),S=new dU(o,B),[4,S.render(f)]):[3,3];case 2:return M=ee.sent(),[3,5];case 3:return o.logger.debug("Document cloned, element located at "+h+","+E+" with size "+m+"x"+d+" using computed rendering"),o.logger.debug("Starting DOM parsing"),x=Mf(o,f),U===x.styles.backgroundColor&&(x.styles.backgroundColor=OA.TRANSPARENT),o.logger.debug("Starting renderer for element at "+B.x+","+B.y+" with size "+B.width+"x"+B.height),S=new oU(o,B),[4,S.render(x)];case 4:M=ee.sent(),ee.label=5;case 5:return(!((W=e.removeContainer)!==null&&W!==void 0)||W)&&(Zu.destroy(p)||o.logger.error("Cannot detach cloned iframe as it is not in the DOM anymore")),o.logger.debug("Finished rendering"),[2,M]}})})},_U=function(n,e,t){var A=e.ownerDocument,i=A.documentElement?Yi(n,getComputedStyle(A.documentElement).backgroundColor):OA.TRANSPARENT,r=A.body?Yi(n,getComputedStyle(A.body).backgroundColor):OA.TRANSPARENT,s=typeof t=="string"?Yi(n,t):t===null?OA.TRANSPARENT:4294967295;return e===A.documentElement?on(i)?on(r)?s:r:i:s};async function Ah(n,e){await new Promise(u=>requestAnimationFrame(()=>requestAnimationFrame(()=>u()))),e();const t=n.querySelector("canvas");if(!t)throw new Error("acha-mimo: no WebGL canvas in host");const A=n.querySelector(".pd-label-layer"),i=Math.max(1,Math.round(n.clientWidth)),r=Math.max(1,Math.round(n.clientHeight)),s=Math.min(2,window.devicePixelRatio||1),a=Math.round(i*s),o=Math.round(r*s),l=document.createElement("canvas");l.width=a,l.height=o;const c=l.getContext("2d");if(!c)throw new Error("acha-mimo: 2D context unavailable");if(c.fillStyle="#f8f9fa",c.fillRect(0,0,a,o),c.drawImage(t,0,0,t.width,t.height,0,0,a,o),A)try{const u=await BU(A,{backgroundColor:null,scale:s,width:i,height:r,logging:!1,useCORS:!0});c.drawImage(u,0,0,a,o)}catch(u){console.warn("[acha-mimo] Label overlay capture failed; image has 3D only.",u)}return l.toDataURL("image/png")}const to=[{id:"point_of_view",title:"Point of view (PV)",body:`1. Topic

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

Green axis: ა- toward the up pole, ჩა- toward the down pole. Vertical preverb choice (or English “up”/“down”) follows the PV pattern, not the speaker’s floor height by itself.`,highlightIds:["a","cha"]},{id:"ego_inclusion",title:"Ego Space (ES) folds into Alter Space (AS)",body:`1. Topic

This scenario is about Communicational Space (CS): how Georgian marks whether motion or orientation is toward the speech participants (I/II) or toward a third party non-participant (III).

2. ES vs AS

CS divides Ego Space (ES: speaker and addressee, I–II) from Alter Space (AS: third persons).

3. ES is not “physical distance”

Do not read ES as “physically close” in Geographic Space. Near and far in GS use distance, but how they apply is flexible; ES is flexible too. Both depend on speaker or teller attitude.

4. Inclusion → complex preverbs with მო-

When ES widens, narrows, or treats AS as inside the participant sphere, Georgian uses complex preverbs: a simple direction (შე-, ჩა-, გა-, etc.) plus მო- (“hither,” toward I/II). 

If another person’s space is structured as part of the participant sphere, the simple + მო- complex is the usual form.`,highlightIds:["shemo","chamo","gamo","amo","tsamo","gadmo","mimo"]}],vU="acha mimo";function Ao(n){const t=n.replace(/^\//,"");return"./".endsWith("/")?`./${t}`:`.//${t}`}const no={preverbs:Ao("data/preverbs.json"),layout:Ao("data/layout.json"),diagramVerbs:Ao("data/diagram_verbs.json")};async function io(n){const e=await fetch(n);if(!e.ok)throw new Error(`Failed to load ${n}: ${e.status}`);return e.json()}const CU={modern_simple:"Modern simple preverb",modern_complex:"Modern complex preverb — simple preverb + მო-",old_simple:"Old simple",old_complex:"Old complex"},EU=[{tier:"modern_simple",title:"Modern simple",sub:"Modern simple-type preverbs."},{tier:"modern_complex",title:"Modern complex",sub:"Modern complex-type preverbs."},{tier:"old_simple",title:"Old simple",sub:"Archaic / literary simple-type preverbs."},{tier:"old_complex",title:"Old complex",sub:"Archaic / literary complex-type preverbs."}];function xU(){return`<div class="pd-citation-block">
    <p class="pd-citation"><strong>Source:</strong> Rusudan Asatiani, <cite>Dynamic Conceptual Model of the Linguistic Structuring of Space: the Georgian Preverbs</cite> (Institute of Oriental Studies, Georgia), 2007. [<a href="https://archive.illc.uva.nl/Tbilisi/Tbilisi2007/abstracts/3.pdf" target="_blank" rel="noopener">source</a>]</p>
    <br>
    <p class="pd-citation">This interactive diagram adapts and extends the author's spatial model into an interactive model. Some icons, terminology, and scenarios are drawn directly from the author's text. Citations given where relevant.</p>
  </div>`}const nh="pd-collapse-left",ih="pd-collapse-right",rh="pd-theme",UU="(min-width: 1101px)";async function yU(n){const{container:e,mode:t,verbKey:A,fontFamily:i,embedded:r=!1}=n;let s=n.theme==="dark"?"dark":"light";if(!n.theme&&!r)try{const N=localStorage.getItem(rh);N==="dark"||N==="light"?s=N:window.matchMedia("(prefers-color-scheme: dark)").matches&&(s="dark")}catch{}const a=n.preverbsUrl??no.preverbs,o=n.layoutUrl??no.layout,l=n.diagramVerbsUrl??no.diagramVerbs,c=n.preverbs??await io(a),u=n.layout??await io(o),f=n.diagramVerbs!==void 0?n.diagramVerbs:(await io(l)).verbs;let p=t,g=A??"",m=null,d=!1,h=null,E=null;const U=r?"":`<header class="pd-site-header">
      <div class="pd-site-header__inner pd-site-header__inner--controls">
        <a class="pd-header-link" href="../">Back to Bagh</a>
        <button type="button" class="pd-btn pd-theme-toggle">Switch theme</button>
      </div>
    </header>`,B=document.createElement("div");B.className=r?"pd-root pd-root--embedded":"pd-root",B.innerHTML=`
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
            ${xU()}
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
                  ${to.map(N=>`<option value="${N.id}">${ji(N.title)}</option>`).join("")}
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
  `,e.appendChild(B);const M=B.querySelector(".pd-layout"),x=B.querySelector(".pd-drawer-backdrop"),S=B.querySelector(".pd-sidebar-toggle--left"),F=B.querySelector(".pd-sidebar-toggle--right"),_=B.querySelector(".pd-drawer-fab--left"),v=B.querySelector(".pd-drawer-fab--right"),b=B.querySelector("#pd-scroll-left"),H=B.querySelector("#pd-scroll-right"),L=window.matchMedia(UU);function G(){return L.matches}function X(N){try{return sessionStorage.getItem(N)==="1"}catch{return!1}}function K(N,$){try{sessionStorage.setItem(N,$?"1":"0")}catch{}}function Y(){const N=M.classList.contains("pd-layout--left-collapsed"),$=M.classList.contains("pd-layout--right-collapsed");S.setAttribute("aria-expanded",(!N).toString()),F.setAttribute("aria-expanded",(!$).toString()),S.textContent=N?"›":"‹",F.textContent=$?"‹":"›",S.title=N?"Show reference panel":"Hide reference panel",F.title=$?"Show details panel":"Hide details panel"}function k(){G()&&(X(nh)&&M.classList.add("pd-layout--left-collapsed"),X(ih)&&M.classList.add("pd-layout--right-collapsed"),Y())}function ne(N){const $=N==="left",_e=N==="right";B.classList.toggle("pd-root--drawer-left-open",$),B.classList.toggle("pd-root--drawer-right-open",_e),B.classList.toggle("pd-root--drawer-open",N!==null),x.hidden=N===null,_.setAttribute("aria-expanded",$.toString()),v.setAttribute("aria-expanded",_e.toString())}function oe(){ne(null)}function Be(N){const $=N==="left"?b:H;($.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')??$).focus()}k();const Fe=B.querySelector(".pd-icon-strip-host"),Re=B.querySelector(".pd-canvas-host");Fe||console.warn("acha-mimo: .pd-icon-strip-host missing from template; canvas icon strip disabled.");const W=B.querySelector(".pd-panel"),ee=B.querySelector(".pd-legend"),de=B.querySelector(".pd-mode"),ie=B.querySelector(".pd-verb"),xe=B.querySelector(".pd-verb-wrap"),Te=B.querySelector(".pd-modern-preverbs-only"),Le=B.querySelector(".pd-scenario"),at=B.querySelector(".pd-reset-view"),Oe=B.querySelector(".pd-print"),ot=B.querySelector(".pd-print-root"),T=B.querySelector(".pd-view-hint"),dt=B.querySelector(".pd-theme-toggle");i&&B.style.setProperty("--pd-font-georgian",i);const Se=new Jw(Re,i),Ge=N=>{B.dataset.theme=N,Se.setTheme(N),dt&&(dt.textContent=N==="dark"?"Switch to light mode":"Switch to dark mode")};Ge(s);const Ee=()=>{const N=B.dataset.theme==="dark"?"light":"dark";if(Ge(N),!r)try{localStorage.setItem(rh,N)}catch{}};dt==null||dt.addEventListener("click",Ee),S.addEventListener("click",()=>{if(!G())return;const N=!M.classList.contains("pd-layout--left-collapsed");M.classList.toggle("pd-layout--left-collapsed",N),K(nh,N),Y(),Se.resize()}),F.addEventListener("click",()=>{if(!G())return;const N=!M.classList.contains("pd-layout--right-collapsed");M.classList.toggle("pd-layout--right-collapsed",N),K(ih,N),Y(),Se.resize()}),_.addEventListener("click",()=>{G()||(B.classList.contains("pd-root--drawer-left-open")?oe():(ne("left"),requestAnimationFrame(()=>Be("left"))))}),v.addEventListener("click",()=>{G()||(B.classList.contains("pd-root--drawer-right-open")?oe():(ne("right"),requestAnimationFrame(()=>Be("right"))))}),x.addEventListener("click",()=>oe());const tt=()=>{G()?(oe(),k(),Y()):M.classList.remove("pd-layout--left-collapsed","pd-layout--right-collapsed"),Se.resize()};L.addEventListener("change",tt);const Ce=N=>{N.key==="Escape"&&B.classList.contains("pd-root--drawer-open")&&oe()};document.addEventListener("keydown",Ce);for(const N of Object.keys(f).sort()){const $=document.createElement("option");$.value=N,$.textContent=f[N].label??N,ie.appendChild($)}g&&f[g]?ie.value=g:ie.options.length&&(g=ie.options[0].value),de.value=p,xe.style.display=p==="verb"?"flex":"none";function y(){if(T){if(p==="verb"){T.innerHTML="Drag empty space to rotate (touch or mouse).";return}T.innerHTML="Drag empty space to rotate (touch or mouse). <strong>Reset view</strong> restores the default angle. <strong>Print</strong> captures the current 3D view (WYSIWYG)."}}function w(){return p!=="verb"?null:f[g]??null}function P(){const N=w();return N?new Set(N.usedPreverbIds):null}function q(){if(!h)return null;const N=to.find($=>$.id===h);return N?new Set(N.highlightIds):null}function j(){ee.querySelectorAll(".pd-leg-item").forEach(N=>{const $=N.dataset.tier,_e=E===$;N.setAttribute("aria-pressed",_e?"true":"false"),N.classList.toggle("pd-leg-item--active",_e)})}function J(){ee.innerHTML='<h3>Legend</h3><p class="pd-legend-help">Click a row to dim other tiers on the cube.</p><div class="pd-leg-list">'+EU.map(N=>`<button type="button" class="pd-leg-item" data-tier="${N.tier}" aria-pressed="false"><span class="pd-leg-stripe pd-leg-stripe--${N.tier}" aria-hidden="true"></span><span class="pd-leg-body"><strong>${rt(N.title)}</strong><span class="pd-leg-sub">${rt(N.sub)}</span></span></button>`).join("")+"</div>",ee.querySelectorAll(".pd-leg-item").forEach(N=>{N.addEventListener("click",()=>{const $=N.dataset.tier;E=E===$?null:$,j(),Ve()})})}function ve(){Fe&&(Fe.innerHTML=dd(m,c.preverbs))}function ae(){var Je,I,le,z,Z;const N=c.preverbs,$=m?N.find(re=>re.id===m):null,_e=w();let se="";if(ve(),h){const re=to.find(ue=>ue.id===h);re&&(se+=`<div class="pd-scenario-box"><h3>${rt(re.title)}</h3><p>${rt(re.body)}</p></div>`)}if(!$){se+='<p class="pd-hint">Click a preverb on the cube to see glosses and notes.</p>',W.innerHTML=se;return}const Me=(Je=_e==null?void 0:_e.annotations)==null?void 0:Je[$.id],be={...$.axisHints,...(I=u.entries.find(re=>re.id===$.id))==null?void 0:I.axisHints};if(se+=`<h2>${rt($.display)} <span class="pd-meta">${rt(CU[$.tier]??$.tier)}</span></h2>`,(le=$.specialRules)!=null&&le.length&&(se+=`<ul class="pd-rules">${$.specialRules.map(re=>`<li>${rt(re)}</li>`).join("")}</ul>`),be.geographic&&(se+=`<p><strong>Geographic Space (GS):</strong> ${rt(be.geographic)}</p>`),be.communicational&&(se+=`<p><strong>Communicational Space (CS):</strong> ${rt(be.communicational)}</p>`),be.distance&&(se+=`<p><strong>Distance (within GS):</strong> ${rt(be.distance)}</p>`),(z=$.aliases)!=null&&z.length&&(se+=`<p><strong>Aliases:</strong> ${$.aliases.map(rt).join(", ")}</p>`),$.wiktionaryPath){const re=`https://en.wiktionary.org/wiki/${encodeURIComponent($.wiktionaryPath)}`;se+=`<p><a href="${re}" target="_blank" rel="noopener">Wiktionary</a></p>`}if(Me!=null&&Me.note&&(se+=`<p class="pd-annote"><strong>Note:</strong> ${rt(Me.note)}</p>`),(Z=Me==null?void 0:Me.examples)!=null&&Z.length){se+='<h4>Examples</h4><ul class="pd-examples">';for(const re of Me.examples)se+=`<li><span class="pd-geo">${rt(re.georgian)}</span> — ${rt(re.gloss)}</li>`;se+="</ul>"}Me!=null&&Me.citation&&(se+=`<p class="pd-ann-citation"><strong>Citation:</strong> ${jf(Me.citation)}</p>`),W.innerHTML=se}function pe(){const N=q();Se.buildLabels(u,c.preverbs,{modernPreverbsOnly:d,mode:p,usedIds:P(),selectedId:m,scenarioHighlight:N,legendTier:E}),Se.setDiagramHints(m,u)}function Ve(){Se.updateLabelStyles({modernPreverbsOnly:d,mode:p,usedIds:P(),selectedId:m,scenarioHighlight:q(),legendTier:E},c.preverbs)}Se.setPickCallback(N=>{N!==null&&(m=m===N?null:N,Se.setDiagramHints(m,u),Ve(),ae())}),de.addEventListener("change",()=>{p=de.value,xe.style.display=p==="verb"?"flex":"none",m=null,y(),pe(),ae()}),ie.addEventListener("change",()=>{g=ie.value,m=null,pe(),ae()}),Te.addEventListener("change",()=>{d=Te.checked,m=null,pe(),ae()}),Le.addEventListener("change",()=>{h=Le.value||null,Ve(),ae()}),at.addEventListener("click",()=>{Se.resetView()}),Oe.addEventListener("click",async()=>{Oe.disabled=!0;try{const N=await Ah(Re,()=>Se.renderOnce());ot.replaceChildren();const $=document.createElement("img");$.alt=vU,$.style.maxWidth="100%",$.style.height="auto",$.src=N,ot.appendChild($);let _e=!1;const se=()=>{_e||(_e=!0,window.clearTimeout(be),window.removeEventListener("afterprint",Me),ot.replaceChildren(),Oe.disabled=!1)},Me=()=>se(),be=window.setTimeout(se,12e4);window.addEventListener("afterprint",Me),await new Promise(Je=>requestAnimationFrame(()=>requestAnimationFrame(()=>Je()))),window.print()}catch(N){console.error(N),window.alert(`Could not capture the 3D view for printing: ${sh(N)}`),Oe.disabled=!1}}),J(),j(),y(),ae(),pe();const Ae=new ResizeObserver(()=>Se.resize());return Ae.observe(Re),{destroy:()=>{L.removeEventListener("change",tt),document.removeEventListener("keydown",Ce),dt==null||dt.removeEventListener("click",Ee),Ae.disconnect(),Se.destroy(),B.remove()},setMode:(N,$)=>{p=N,de.value=N,xe.style.display=N==="verb"?"flex":"none",$!==void 0&&f[$]&&(g=$,ie.value=$),m=null,pe(),ae()},setModernPreverbsOnly:N=>{d=N,Te.checked=N,m=null,pe(),ae()},setScenarioId:N=>{h=N,Le.value=N??"",Ve(),ae()},captureViewAsPng:()=>Ah(Re,()=>Se.renderOnce()),resetView:()=>{Se.resetView()},setTheme:N=>{Ge(N==="dark"?"dark":"light")}}}const ml=document.querySelector("#app");if(!ml)throw new Error("#app missing");const SU=new URLSearchParams(window.location.search).get("embedded")==="1";yU({container:ml,mode:"overview",embedded:SU}).catch(n=>{ml.innerHTML=`<p class="pd-err">Failed to load acha-mimo: ${rt(sh(n))}</p>`,console.error(n)});
