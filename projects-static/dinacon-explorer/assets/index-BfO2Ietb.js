(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();/**
* @vue/shared v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**//*! #__NO_SIDE_EFFECTS__ */function Hc(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const je={},Xr=[],rn=()=>{},d_=()=>!1,Ho=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),zc=t=>t.startsWith("onUpdate:"),Nt=Object.assign,Wc=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},f_=Object.prototype.hasOwnProperty,Fe=(t,e)=>f_.call(t,e),ye=Array.isArray,Jr=t=>zo(t)==="[object Map]",af=t=>zo(t)==="[object Set]",be=t=>typeof t=="function",ot=t=>typeof t=="string",lr=t=>typeof t=="symbol",Qe=t=>t!==null&&typeof t=="object",cf=t=>(Qe(t)||be(t))&&be(t.then)&&be(t.catch),lf=Object.prototype.toString,zo=t=>lf.call(t),p_=t=>zo(t).slice(8,-1),uf=t=>zo(t)==="[object Object]",Gc=t=>ot(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,qs=Hc(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Wo=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},m_=/-(\w)/g,Zn=Wo(t=>t.replace(m_,(e,n)=>n?n.toUpperCase():"")),g_=/\B([A-Z])/g,ur=Wo(t=>t.replace(g_,"-$1").toLowerCase()),hf=Wo(t=>t.charAt(0).toUpperCase()+t.slice(1)),Oa=Wo(t=>t?`on${hf(t)}`:""),Wn=(t,e)=>!Object.is(t,e),ro=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},oc=(t,e,n,r=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:r,value:n})},ac=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let Ku;const Go=()=>Ku||(Ku=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function wn(t){if(ye(t)){const e={};for(let n=0;n<t.length;n++){const r=t[n],s=ot(r)?T_(r):wn(r);if(s)for(const i in s)e[i]=s[i]}return e}else if(ot(t)||Qe(t))return t}const __=/;(?![^(]*\))/g,y_=/:([^]+)/,v_=/\/\*[^]*?\*\//g;function T_(t){const e={};return t.replace(v_,"").split(__).forEach(n=>{if(n){const r=n.split(y_);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}function er(t){let e="";if(ot(t))e=t;else if(ye(t))for(let n=0;n<t.length;n++){const r=er(t[n]);r&&(e+=r+" ")}else if(Qe(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const E_="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",I_=Hc(E_);function df(t){return!!t||t===""}const ff=t=>!!(t&&t.__v_isRef===!0),rt=t=>ot(t)?t:t==null?"":ye(t)||Qe(t)&&(t.toString===lf||!be(t.toString))?ff(t)?rt(t.value):JSON.stringify(t,pf,2):String(t),pf=(t,e)=>ff(e)?pf(t,e.value):Jr(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[r,s],i)=>(n[Ma(r,i)+" =>"]=s,n),{})}:af(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>Ma(n))}:lr(e)?Ma(e):Qe(e)&&!ye(e)&&!uf(e)?String(e):e,Ma=(t,e="")=>{var n;return lr(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let wt;class mf{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=wt,!e&&wt&&(this.index=(wt.scopes||(wt.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].pause();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].resume();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].resume()}}run(e){if(this._active){const n=wt;try{return wt=this,e()}finally{wt=n}}}on(){++this._on===1&&(this.prevScope=wt,wt=this)}off(){this._on>0&&--this._on===0&&(wt=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(this.effects.length=0,n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function gf(t){return new mf(t)}function _f(){return wt}function w_(t,e=!1){wt&&wt.cleanups.push(t)}let qe;const La=new WeakSet;class yf{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,wt&&wt.active&&wt.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,La.has(this)&&(La.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Tf(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Qu(this),Ef(this);const e=qe,n=Xt;qe=this,Xt=!0;try{return this.fn()}finally{If(this),qe=e,Xt=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Xc(e);this.deps=this.depsTail=void 0,Qu(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?La.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){cc(this)&&this.run()}get dirty(){return cc(this)}}let vf=0,Hs,zs;function Tf(t,e=!1){if(t.flags|=8,e){t.next=zs,zs=t;return}t.next=Hs,Hs=t}function Kc(){vf++}function Qc(){if(--vf>0)return;if(zs){let e=zs;for(zs=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;Hs;){let e=Hs;for(Hs=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(r){t||(t=r)}e=n}}if(t)throw t}function Ef(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function If(t){let e,n=t.depsTail,r=n;for(;r;){const s=r.prevDep;r.version===-1?(r===n&&(n=s),Xc(r),A_(r)):e=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=s}t.deps=e,t.depsTail=n}function cc(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(wf(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function wf(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===si)||(t.globalVersion=si,!t.isSSR&&t.flags&128&&(!t.deps&&!t._dirty||!cc(t))))return;t.flags|=2;const e=t.dep,n=qe,r=Xt;qe=t,Xt=!0;try{Ef(t);const s=t.fn(t._value);(e.version===0||Wn(s,t._value))&&(t.flags|=128,t._value=s,e.version++)}catch(s){throw e.version++,s}finally{qe=n,Xt=r,If(t),t.flags&=-3}}function Xc(t,e=!1){const{dep:n,prevSub:r,nextSub:s}=t;if(r&&(r.nextSub=s,t.prevSub=void 0),s&&(s.prevSub=r,t.nextSub=void 0),n.subs===t&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let i=n.computed.deps;i;i=i.nextDep)Xc(i,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function A_(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let Xt=!0;const Af=[];function An(){Af.push(Xt),Xt=!1}function bn(){const t=Af.pop();Xt=t===void 0?!0:t}function Qu(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=qe;qe=void 0;try{e()}finally{qe=n}}}let si=0;class b_{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Jc{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!qe||!Xt||qe===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==qe)n=this.activeLink=new b_(qe,this),qe.deps?(n.prevDep=qe.depsTail,qe.depsTail.nextDep=n,qe.depsTail=n):qe.deps=qe.depsTail=n,bf(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const r=n.nextDep;r.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=r),n.prevDep=qe.depsTail,n.nextDep=void 0,qe.depsTail.nextDep=n,qe.depsTail=n,qe.deps===n&&(qe.deps=r)}return n}trigger(e){this.version++,si++,this.notify(e)}notify(e){Kc();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{Qc()}}}function bf(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let r=e.deps;r;r=r.nextDep)bf(r)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const yo=new WeakMap,Er=Symbol(""),lc=Symbol(""),ii=Symbol("");function bt(t,e,n){if(Xt&&qe){let r=yo.get(t);r||yo.set(t,r=new Map);let s=r.get(n);s||(r.set(n,s=new Jc),s.map=r,s.key=n),s.track()}}function yn(t,e,n,r,s,i){const a=yo.get(t);if(!a){si++;return}const c=l=>{l&&l.trigger()};if(Kc(),e==="clear")a.forEach(c);else{const l=ye(t),h=l&&Gc(n);if(l&&n==="length"){const f=Number(r);a.forEach((p,y)=>{(y==="length"||y===ii||!lr(y)&&y>=f)&&c(p)})}else switch((n!==void 0||a.has(void 0))&&c(a.get(n)),h&&c(a.get(ii)),e){case"add":l?h&&c(a.get("length")):(c(a.get(Er)),Jr(t)&&c(a.get(lc)));break;case"delete":l||(c(a.get(Er)),Jr(t)&&c(a.get(lc)));break;case"set":Jr(t)&&c(a.get(Er));break}}Qc()}function S_(t,e){const n=yo.get(t);return n&&n.get(e)}function jr(t){const e=Oe(t);return e===t?e:(bt(e,"iterate",ii),Ht(t)?e:e.map(gt))}function Ko(t){return bt(t=Oe(t),"iterate",ii),t}const C_={__proto__:null,[Symbol.iterator](){return Fa(this,Symbol.iterator,gt)},concat(...t){return jr(this).concat(...t.map(e=>ye(e)?jr(e):e))},entries(){return Fa(this,"entries",t=>(t[1]=gt(t[1]),t))},every(t,e){return gn(this,"every",t,e,void 0,arguments)},filter(t,e){return gn(this,"filter",t,e,n=>n.map(gt),arguments)},find(t,e){return gn(this,"find",t,e,gt,arguments)},findIndex(t,e){return gn(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return gn(this,"findLast",t,e,gt,arguments)},findLastIndex(t,e){return gn(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return gn(this,"forEach",t,e,void 0,arguments)},includes(...t){return Ua(this,"includes",t)},indexOf(...t){return Ua(this,"indexOf",t)},join(t){return jr(this).join(t)},lastIndexOf(...t){return Ua(this,"lastIndexOf",t)},map(t,e){return gn(this,"map",t,e,void 0,arguments)},pop(){return Ms(this,"pop")},push(...t){return Ms(this,"push",t)},reduce(t,...e){return Xu(this,"reduce",t,e)},reduceRight(t,...e){return Xu(this,"reduceRight",t,e)},shift(){return Ms(this,"shift")},some(t,e){return gn(this,"some",t,e,void 0,arguments)},splice(...t){return Ms(this,"splice",t)},toReversed(){return jr(this).toReversed()},toSorted(t){return jr(this).toSorted(t)},toSpliced(...t){return jr(this).toSpliced(...t)},unshift(...t){return Ms(this,"unshift",t)},values(){return Fa(this,"values",gt)}};function Fa(t,e,n){const r=Ko(t),s=r[e]();return r!==t&&!Ht(t)&&(s._next=s.next,s.next=()=>{const i=s._next();return i.value&&(i.value=n(i.value)),i}),s}const R_=Array.prototype;function gn(t,e,n,r,s,i){const a=Ko(t),c=a!==t&&!Ht(t),l=a[e];if(l!==R_[e]){const p=l.apply(t,i);return c?gt(p):p}let h=n;a!==t&&(c?h=function(p,y){return n.call(this,gt(p),y,t)}:n.length>2&&(h=function(p,y){return n.call(this,p,y,t)}));const f=l.call(a,h,r);return c&&s?s(f):f}function Xu(t,e,n,r){const s=Ko(t);let i=n;return s!==t&&(Ht(t)?n.length>3&&(i=function(a,c,l){return n.call(this,a,c,l,t)}):i=function(a,c,l){return n.call(this,a,gt(c),l,t)}),s[e](i,...r)}function Ua(t,e,n){const r=Oe(t);bt(r,"iterate",ii);const s=r[e](...n);return(s===-1||s===!1)&&el(n[0])?(n[0]=Oe(n[0]),r[e](...n)):s}function Ms(t,e,n=[]){An(),Kc();const r=Oe(t)[e].apply(t,n);return Qc(),bn(),r}const P_=Hc("__proto__,__v_isRef,__isVue"),Sf=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(lr));function k_(t){lr(t)||(t=String(t));const e=Oe(this);return bt(e,"has",t),e.hasOwnProperty(t)}class Cf{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,r){if(n==="__v_skip")return e.__v_skip;const s=this._isReadonly,i=this._isShallow;if(n==="__v_isReactive")return!s;if(n==="__v_isReadonly")return s;if(n==="__v_isShallow")return i;if(n==="__v_raw")return r===(s?i?$_:Df:i?kf:Pf).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(r)?e:void 0;const a=ye(e);if(!s){let l;if(a&&(l=C_[n]))return l;if(n==="hasOwnProperty")return k_}const c=Reflect.get(e,n,Ze(e)?e:r);return(lr(n)?Sf.has(n):P_(n))||(s||bt(e,"get",n),i)?c:Ze(c)?a&&Gc(n)?c:c.value:Qe(c)?s?Nf(c):Qo(c):c}}class Rf extends Cf{constructor(e=!1){super(!1,e)}set(e,n,r,s){let i=e[n];if(!this._isShallow){const l=tr(i);if(!Ht(r)&&!tr(r)&&(i=Oe(i),r=Oe(r)),!ye(e)&&Ze(i)&&!Ze(r))return l?!1:(i.value=r,!0)}const a=ye(e)&&Gc(n)?Number(n)<e.length:Fe(e,n),c=Reflect.set(e,n,r,Ze(e)?e:s);return e===Oe(s)&&(a?Wn(r,i)&&yn(e,"set",n,r):yn(e,"add",n,r)),c}deleteProperty(e,n){const r=Fe(e,n);e[n];const s=Reflect.deleteProperty(e,n);return s&&r&&yn(e,"delete",n,void 0),s}has(e,n){const r=Reflect.has(e,n);return(!lr(n)||!Sf.has(n))&&bt(e,"has",n),r}ownKeys(e){return bt(e,"iterate",ye(e)?"length":Er),Reflect.ownKeys(e)}}class D_ extends Cf{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const N_=new Rf,x_=new D_,V_=new Rf(!0);const uc=t=>t,Ki=t=>Reflect.getPrototypeOf(t);function O_(t,e,n){return function(...r){const s=this.__v_raw,i=Oe(s),a=Jr(i),c=t==="entries"||t===Symbol.iterator&&a,l=t==="keys"&&a,h=s[t](...r),f=n?uc:e?vo:gt;return!e&&bt(i,"iterate",l?lc:Er),{next(){const{value:p,done:y}=h.next();return y?{value:p,done:y}:{value:c?[f(p[0]),f(p[1])]:f(p),done:y}},[Symbol.iterator](){return this}}}}function Qi(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function M_(t,e){const n={get(s){const i=this.__v_raw,a=Oe(i),c=Oe(s);t||(Wn(s,c)&&bt(a,"get",s),bt(a,"get",c));const{has:l}=Ki(a),h=e?uc:t?vo:gt;if(l.call(a,s))return h(i.get(s));if(l.call(a,c))return h(i.get(c));i!==a&&i.get(s)},get size(){const s=this.__v_raw;return!t&&bt(Oe(s),"iterate",Er),Reflect.get(s,"size",s)},has(s){const i=this.__v_raw,a=Oe(i),c=Oe(s);return t||(Wn(s,c)&&bt(a,"has",s),bt(a,"has",c)),s===c?i.has(s):i.has(s)||i.has(c)},forEach(s,i){const a=this,c=a.__v_raw,l=Oe(c),h=e?uc:t?vo:gt;return!t&&bt(l,"iterate",Er),c.forEach((f,p)=>s.call(i,h(f),h(p),a))}};return Nt(n,t?{add:Qi("add"),set:Qi("set"),delete:Qi("delete"),clear:Qi("clear")}:{add(s){!e&&!Ht(s)&&!tr(s)&&(s=Oe(s));const i=Oe(this);return Ki(i).has.call(i,s)||(i.add(s),yn(i,"add",s,s)),this},set(s,i){!e&&!Ht(i)&&!tr(i)&&(i=Oe(i));const a=Oe(this),{has:c,get:l}=Ki(a);let h=c.call(a,s);h||(s=Oe(s),h=c.call(a,s));const f=l.call(a,s);return a.set(s,i),h?Wn(i,f)&&yn(a,"set",s,i):yn(a,"add",s,i),this},delete(s){const i=Oe(this),{has:a,get:c}=Ki(i);let l=a.call(i,s);l||(s=Oe(s),l=a.call(i,s)),c&&c.call(i,s);const h=i.delete(s);return l&&yn(i,"delete",s,void 0),h},clear(){const s=Oe(this),i=s.size!==0,a=s.clear();return i&&yn(s,"clear",void 0,void 0),a}}),["keys","values","entries",Symbol.iterator].forEach(s=>{n[s]=O_(s,t,e)}),n}function Yc(t,e){const n=M_(t,e);return(r,s,i)=>s==="__v_isReactive"?!t:s==="__v_isReadonly"?t:s==="__v_raw"?r:Reflect.get(Fe(n,s)&&s in r?n:r,s,i)}const L_={get:Yc(!1,!1)},F_={get:Yc(!1,!0)},U_={get:Yc(!0,!1)};const Pf=new WeakMap,kf=new WeakMap,Df=new WeakMap,$_=new WeakMap;function B_(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function j_(t){return t.__v_skip||!Object.isExtensible(t)?0:B_(p_(t))}function Qo(t){return tr(t)?t:Zc(t,!1,N_,L_,Pf)}function q_(t){return Zc(t,!1,V_,F_,kf)}function Nf(t){return Zc(t,!0,x_,U_,Df)}function Zc(t,e,n,r,s){if(!Qe(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const i=j_(t);if(i===0)return t;const a=s.get(t);if(a)return a;const c=new Proxy(t,i===2?r:n);return s.set(t,c),c}function Gn(t){return tr(t)?Gn(t.__v_raw):!!(t&&t.__v_isReactive)}function tr(t){return!!(t&&t.__v_isReadonly)}function Ht(t){return!!(t&&t.__v_isShallow)}function el(t){return t?!!t.__v_raw:!1}function Oe(t){const e=t&&t.__v_raw;return e?Oe(e):t}function tl(t){return!Fe(t,"__v_skip")&&Object.isExtensible(t)&&oc(t,"__v_skip",!0),t}const gt=t=>Qe(t)?Qo(t):t,vo=t=>Qe(t)?Nf(t):t;function Ze(t){return t?t.__v_isRef===!0:!1}function Ne(t){return H_(t,!1)}function H_(t,e){return Ze(t)?t:new z_(t,e)}class z_{constructor(e,n){this.dep=new Jc,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:Oe(e),this._value=n?e:gt(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,r=this.__v_isShallow||Ht(e)||tr(e);e=r?e:Oe(e),Wn(e,n)&&(this._rawValue=e,this._value=r?e:gt(e),this.dep.trigger())}}function xf(t){return Ze(t)?t.value:t}const W_={get:(t,e,n)=>e==="__v_raw"?t:xf(Reflect.get(t,e,n)),set:(t,e,n,r)=>{const s=t[e];return Ze(s)&&!Ze(n)?(s.value=n,!0):Reflect.set(t,e,n,r)}};function Vf(t){return Gn(t)?t:new Proxy(t,W_)}function G_(t){const e=ye(t)?new Array(t.length):{};for(const n in t)e[n]=Q_(t,n);return e}class K_{constructor(e,n,r){this._object=e,this._key=n,this._defaultValue=r,this.__v_isRef=!0,this._value=void 0}get value(){const e=this._object[this._key];return this._value=e===void 0?this._defaultValue:e}set value(e){this._object[this._key]=e}get dep(){return S_(Oe(this._object),this._key)}}function Q_(t,e,n){const r=t[e];return Ze(r)?r:new K_(t,e,n)}class X_{constructor(e,n,r){this.fn=e,this.setter=n,this._value=void 0,this.dep=new Jc(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=si-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=r}notify(){if(this.flags|=16,!(this.flags&8)&&qe!==this)return Tf(this,!0),!0}get value(){const e=this.dep.track();return wf(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function J_(t,e,n=!1){let r,s;return be(t)?r=t:(r=t.get,s=t.set),new X_(r,s,n)}const Xi={},To=new WeakMap;let _r;function Y_(t,e=!1,n=_r){if(n){let r=To.get(n);r||To.set(n,r=[]),r.push(t)}}function Z_(t,e,n=je){const{immediate:r,deep:s,once:i,scheduler:a,augmentJob:c,call:l}=n,h=z=>s?z:Ht(z)||s===!1||s===0?vn(z,1):vn(z);let f,p,y,b,R=!1,N=!1;if(Ze(t)?(p=()=>t.value,R=Ht(t)):Gn(t)?(p=()=>h(t),R=!0):ye(t)?(N=!0,R=t.some(z=>Gn(z)||Ht(z)),p=()=>t.map(z=>{if(Ze(z))return z.value;if(Gn(z))return h(z);if(be(z))return l?l(z,2):z()})):be(t)?e?p=l?()=>l(t,2):t:p=()=>{if(y){An();try{y()}finally{bn()}}const z=_r;_r=f;try{return l?l(t,3,[b]):t(b)}finally{_r=z}}:p=rn,e&&s){const z=p,ce=s===!0?1/0:s;p=()=>vn(z(),ce)}const x=_f(),j=()=>{f.stop(),x&&x.active&&Wc(x.effects,f)};if(i&&e){const z=e;e=(...ce)=>{z(...ce),j()}}let W=N?new Array(t.length).fill(Xi):Xi;const K=z=>{if(!(!(f.flags&1)||!f.dirty&&!z))if(e){const ce=f.run();if(s||R||(N?ce.some((Ie,w)=>Wn(Ie,W[w])):Wn(ce,W))){y&&y();const Ie=_r;_r=f;try{const w=[ce,W===Xi?void 0:N&&W[0]===Xi?[]:W,b];W=ce,l?l(e,3,w):e(...w)}finally{_r=Ie}}}else f.run()};return c&&c(K),f=new yf(p),f.scheduler=a?()=>a(K,!1):K,b=z=>Y_(z,!1,f),y=f.onStop=()=>{const z=To.get(f);if(z){if(l)l(z,4);else for(const ce of z)ce();To.delete(f)}},e?r?K(!0):W=f.run():a?a(K.bind(null,!0),!0):f.run(),j.pause=f.pause.bind(f),j.resume=f.resume.bind(f),j.stop=j,j}function vn(t,e=1/0,n){if(e<=0||!Qe(t)||t.__v_skip||(n=n||new Set,n.has(t)))return t;if(n.add(t),e--,Ze(t))vn(t.value,e,n);else if(ye(t))for(let r=0;r<t.length;r++)vn(t[r],e,n);else if(af(t)||Jr(t))t.forEach(r=>{vn(r,e,n)});else if(uf(t)){for(const r in t)vn(t[r],e,n);for(const r of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,r)&&vn(t[r],e,n)}return t}/**
* @vue/runtime-core v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function vi(t,e,n,r){try{return r?t(...r):t()}catch(s){Xo(s,e,n)}}function hn(t,e,n,r){if(be(t)){const s=vi(t,e,n,r);return s&&cf(s)&&s.catch(i=>{Xo(i,e,n)}),s}if(ye(t)){const s=[];for(let i=0;i<t.length;i++)s.push(hn(t[i],e,n,r));return s}}function Xo(t,e,n,r=!0){const s=e?e.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:a}=e&&e.appContext.config||je;if(e){let c=e.parent;const l=e.proxy,h=`https://vuejs.org/error-reference/#runtime-${n}`;for(;c;){const f=c.ec;if(f){for(let p=0;p<f.length;p++)if(f[p](t,l,h)===!1)return}c=c.parent}if(i){An(),vi(i,null,10,[t,l,h]),bn();return}}ey(t,n,s,r,a)}function ey(t,e,n,r=!0,s=!1){if(s)throw t;console.error(t)}const kt=[];let en=-1;const Yr=[];let $n=null,Hr=0;const Of=Promise.resolve();let Eo=null;function nl(t){const e=Eo||Of;return t?e.then(this?t.bind(this):t):e}function ty(t){let e=en+1,n=kt.length;for(;e<n;){const r=e+n>>>1,s=kt[r],i=oi(s);i<t||i===t&&s.flags&2?e=r+1:n=r}return e}function rl(t){if(!(t.flags&1)){const e=oi(t),n=kt[kt.length-1];!n||!(t.flags&2)&&e>=oi(n)?kt.push(t):kt.splice(ty(e),0,t),t.flags|=1,Mf()}}function Mf(){Eo||(Eo=Of.then(Ff))}function ny(t){ye(t)?Yr.push(...t):$n&&t.id===-1?$n.splice(Hr+1,0,t):t.flags&1||(Yr.push(t),t.flags|=1),Mf()}function Ju(t,e,n=en+1){for(;n<kt.length;n++){const r=kt[n];if(r&&r.flags&2){if(t&&r.id!==t.uid)continue;kt.splice(n,1),n--,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function Lf(t){if(Yr.length){const e=[...new Set(Yr)].sort((n,r)=>oi(n)-oi(r));if(Yr.length=0,$n){$n.push(...e);return}for($n=e,Hr=0;Hr<$n.length;Hr++){const n=$n[Hr];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}$n=null,Hr=0}}const oi=t=>t.id==null?t.flags&2?-1:1/0:t.id;function Ff(t){try{for(en=0;en<kt.length;en++){const e=kt[en];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),vi(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;en<kt.length;en++){const e=kt[en];e&&(e.flags&=-2)}en=-1,kt.length=0,Lf(),Eo=null,(kt.length||Yr.length)&&Ff()}}let jt=null,Uf=null;function Io(t){const e=jt;return jt=t,Uf=t&&t.type.__scopeId||null,e}function ry(t,e=jt,n){if(!e||t._n)return t;const r=(...s)=>{r._d&&oh(-1);const i=Io(e);let a;try{a=t(...s)}finally{Io(i),r._d&&oh(1)}return a};return r._n=!0,r._c=!0,r._d=!0,r}function sy(t,e){if(jt===null)return t;const n=ea(jt),r=t.dirs||(t.dirs=[]);for(let s=0;s<e.length;s++){let[i,a,c,l=je]=e[s];i&&(be(i)&&(i={mounted:i,updated:i}),i.deep&&vn(a),r.push({dir:i,instance:n,value:a,oldValue:void 0,arg:c,modifiers:l}))}return t}function mr(t,e,n,r){const s=t.dirs,i=e&&e.dirs;for(let a=0;a<s.length;a++){const c=s[a];i&&(c.oldValue=i[a].value);let l=c.dir[r];l&&(An(),hn(l,n,8,[t.el,c,t,e]),bn())}}const iy=Symbol("_vte"),oy=t=>t.__isTeleport;function sl(t,e){t.shapeFlag&6&&t.component?(t.transition=e,sl(t.component.subTree,e)):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}function $f(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}function Ws(t,e,n,r,s=!1){if(ye(t)){t.forEach((R,N)=>Ws(R,e&&(ye(e)?e[N]:e),n,r,s));return}if(Gs(r)&&!s){r.shapeFlag&512&&r.type.__asyncResolved&&r.component.subTree.component&&Ws(t,e,n,r.component.subTree);return}const i=r.shapeFlag&4?ea(r.component):r.el,a=s?null:i,{i:c,r:l}=t,h=e&&e.r,f=c.refs===je?c.refs={}:c.refs,p=c.setupState,y=Oe(p),b=p===je?()=>!1:R=>Fe(y,R);if(h!=null&&h!==l&&(ot(h)?(f[h]=null,b(h)&&(p[h]=null)):Ze(h)&&(h.value=null)),be(l))vi(l,c,12,[a,f]);else{const R=ot(l),N=Ze(l);if(R||N){const x=()=>{if(t.f){const j=R?b(l)?p[l]:f[l]:l.value;s?ye(j)&&Wc(j,i):ye(j)?j.includes(i)||j.push(i):R?(f[l]=[i],b(l)&&(p[l]=f[l])):(l.value=[i],t.k&&(f[t.k]=l.value))}else R?(f[l]=a,b(l)&&(p[l]=a)):N&&(l.value=a,t.k&&(f[t.k]=a))};a?(x.id=-1,Mt(x,n)):x()}}}Go().requestIdleCallback;Go().cancelIdleCallback;const Gs=t=>!!t.type.__asyncLoader,Bf=t=>t.type.__isKeepAlive;function ay(t,e){jf(t,"a",e)}function cy(t,e){jf(t,"da",e)}function jf(t,e,n=Dt){const r=t.__wdc||(t.__wdc=()=>{let s=n;for(;s;){if(s.isDeactivated)return;s=s.parent}return t()});if(Jo(e,r,n),n){let s=n.parent;for(;s&&s.parent;)Bf(s.parent.vnode)&&ly(r,e,n,s),s=s.parent}}function ly(t,e,n,r){const s=Jo(e,t,r,!0);Dr(()=>{Wc(r[e],s)},n)}function Jo(t,e,n=Dt,r=!1){if(n){const s=n[t]||(n[t]=[]),i=e.__weh||(e.__weh=(...a)=>{An();const c=Ti(n),l=hn(e,n,t,a);return c(),bn(),l});return r?s.unshift(i):s.push(i),i}}const Dn=t=>(e,n=Dt)=>{(!ci||t==="sp")&&Jo(t,(...r)=>e(...r),n)},uy=Dn("bm"),ps=Dn("m"),hy=Dn("bu"),dy=Dn("u"),fy=Dn("bum"),Dr=Dn("um"),py=Dn("sp"),my=Dn("rtg"),gy=Dn("rtc");function _y(t,e=Dt){Jo("ec",t,e)}const yy=Symbol.for("v-ndc");function Wt(t,e,n,r){let s;const i=n,a=ye(t);if(a||ot(t)){const c=a&&Gn(t);let l=!1,h=!1;c&&(l=!Ht(t),h=tr(t),t=Ko(t)),s=new Array(t.length);for(let f=0,p=t.length;f<p;f++)s[f]=e(l?h?vo(gt(t[f])):gt(t[f]):t[f],f,void 0,i)}else if(typeof t=="number"){s=new Array(t);for(let c=0;c<t;c++)s[c]=e(c+1,c,void 0,i)}else if(Qe(t))if(t[Symbol.iterator])s=Array.from(t,(c,l)=>e(c,l,void 0,i));else{const c=Object.keys(t);s=new Array(c.length);for(let l=0,h=c.length;l<h;l++){const f=c[l];s[l]=e(t[f],f,l,i)}}else s=[];return s}const hc=t=>t?hp(t)?ea(t):hc(t.parent):null,Ks=Nt(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>hc(t.parent),$root:t=>hc(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>Hf(t),$forceUpdate:t=>t.f||(t.f=()=>{rl(t.update)}),$nextTick:t=>t.n||(t.n=nl.bind(t.proxy)),$watch:t=>By.bind(t)}),$a=(t,e)=>t!==je&&!t.__isScriptSetup&&Fe(t,e),vy={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:r,data:s,props:i,accessCache:a,type:c,appContext:l}=t;let h;if(e[0]!=="$"){const b=a[e];if(b!==void 0)switch(b){case 1:return r[e];case 2:return s[e];case 4:return n[e];case 3:return i[e]}else{if($a(r,e))return a[e]=1,r[e];if(s!==je&&Fe(s,e))return a[e]=2,s[e];if((h=t.propsOptions[0])&&Fe(h,e))return a[e]=3,i[e];if(n!==je&&Fe(n,e))return a[e]=4,n[e];dc&&(a[e]=0)}}const f=Ks[e];let p,y;if(f)return e==="$attrs"&&bt(t.attrs,"get",""),f(t);if((p=c.__cssModules)&&(p=p[e]))return p;if(n!==je&&Fe(n,e))return a[e]=4,n[e];if(y=l.config.globalProperties,Fe(y,e))return y[e]},set({_:t},e,n){const{data:r,setupState:s,ctx:i}=t;return $a(s,e)?(s[e]=n,!0):r!==je&&Fe(r,e)?(r[e]=n,!0):Fe(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(i[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:r,appContext:s,propsOptions:i}},a){let c;return!!n[a]||t!==je&&Fe(t,a)||$a(e,a)||(c=i[0])&&Fe(c,a)||Fe(r,a)||Fe(Ks,a)||Fe(s.config.globalProperties,a)},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:Fe(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function Yu(t){return ye(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let dc=!0;function Ty(t){const e=Hf(t),n=t.proxy,r=t.ctx;dc=!1,e.beforeCreate&&Zu(e.beforeCreate,t,"bc");const{data:s,computed:i,methods:a,watch:c,provide:l,inject:h,created:f,beforeMount:p,mounted:y,beforeUpdate:b,updated:R,activated:N,deactivated:x,beforeDestroy:j,beforeUnmount:W,destroyed:K,unmounted:z,render:ce,renderTracked:Ie,renderTriggered:w,errorCaptured:g,serverPrefetch:_,expose:v,inheritAttrs:I,components:S,directives:E,filters:Me}=e;if(h&&Ey(h,r,null),a)for(const ie in a){const me=a[ie];be(me)&&(r[ie]=me.bind(n))}if(s){const ie=s.call(n,n);Qe(ie)&&(t.data=Qo(ie))}if(dc=!0,i)for(const ie in i){const me=i[ie],Ke=be(me)?me.bind(n,n):be(me.get)?me.get.bind(n,n):rn,ge=!be(me)&&be(me.set)?me.set.bind(n):rn,V=Y({get:Ke,set:ge});Object.defineProperty(r,ie,{enumerable:!0,configurable:!0,get:()=>V.value,set:L=>V.value=L})}if(c)for(const ie in c)qf(c[ie],r,n,ie);if(l){const ie=be(l)?l.call(n):l;Reflect.ownKeys(ie).forEach(me=>{Cy(me,ie[me])})}f&&Zu(f,t,"c");function Te(ie,me){ye(me)?me.forEach(Ke=>ie(Ke.bind(n))):me&&ie(me.bind(n))}if(Te(uy,p),Te(ps,y),Te(hy,b),Te(dy,R),Te(ay,N),Te(cy,x),Te(_y,g),Te(gy,Ie),Te(my,w),Te(fy,W),Te(Dr,z),Te(py,_),ye(v))if(v.length){const ie=t.exposed||(t.exposed={});v.forEach(me=>{Object.defineProperty(ie,me,{get:()=>n[me],set:Ke=>n[me]=Ke,enumerable:!0})})}else t.exposed||(t.exposed={});ce&&t.render===rn&&(t.render=ce),I!=null&&(t.inheritAttrs=I),S&&(t.components=S),E&&(t.directives=E),_&&$f(t)}function Ey(t,e,n=rn){ye(t)&&(t=fc(t));for(const r in t){const s=t[r];let i;Qe(s)?"default"in s?i=Qs(s.from||r,s.default,!0):i=Qs(s.from||r):i=Qs(s),Ze(i)?Object.defineProperty(e,r,{enumerable:!0,configurable:!0,get:()=>i.value,set:a=>i.value=a}):e[r]=i}}function Zu(t,e,n){hn(ye(t)?t.map(r=>r.bind(e.proxy)):t.bind(e.proxy),e,n)}function qf(t,e,n,r){let s=r.includes(".")?rp(n,r):()=>n[r];if(ot(t)){const i=e[t];be(i)&&qt(s,i)}else if(be(t))qt(s,t.bind(n));else if(Qe(t))if(ye(t))t.forEach(i=>qf(i,e,n,r));else{const i=be(t.handler)?t.handler.bind(n):e[t.handler];be(i)&&qt(s,i,t)}}function Hf(t){const e=t.type,{mixins:n,extends:r}=e,{mixins:s,optionsCache:i,config:{optionMergeStrategies:a}}=t.appContext,c=i.get(e);let l;return c?l=c:!s.length&&!n&&!r?l=e:(l={},s.length&&s.forEach(h=>wo(l,h,a,!0)),wo(l,e,a)),Qe(e)&&i.set(e,l),l}function wo(t,e,n,r=!1){const{mixins:s,extends:i}=e;i&&wo(t,i,n,!0),s&&s.forEach(a=>wo(t,a,n,!0));for(const a in e)if(!(r&&a==="expose")){const c=Iy[a]||n&&n[a];t[a]=c?c(t[a],e[a]):e[a]}return t}const Iy={data:eh,props:th,emits:th,methods:Fs,computed:Fs,beforeCreate:Pt,created:Pt,beforeMount:Pt,mounted:Pt,beforeUpdate:Pt,updated:Pt,beforeDestroy:Pt,beforeUnmount:Pt,destroyed:Pt,unmounted:Pt,activated:Pt,deactivated:Pt,errorCaptured:Pt,serverPrefetch:Pt,components:Fs,directives:Fs,watch:Ay,provide:eh,inject:wy};function eh(t,e){return e?t?function(){return Nt(be(t)?t.call(this,this):t,be(e)?e.call(this,this):e)}:e:t}function wy(t,e){return Fs(fc(t),fc(e))}function fc(t){if(ye(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function Pt(t,e){return t?[...new Set([].concat(t,e))]:e}function Fs(t,e){return t?Nt(Object.create(null),t,e):e}function th(t,e){return t?ye(t)&&ye(e)?[...new Set([...t,...e])]:Nt(Object.create(null),Yu(t),Yu(e??{})):e}function Ay(t,e){if(!t)return e;if(!e)return t;const n=Nt(Object.create(null),t);for(const r in e)n[r]=Pt(t[r],e[r]);return n}function zf(){return{app:null,config:{isNativeTag:d_,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let by=0;function Sy(t,e){return function(r,s=null){be(r)||(r=Nt({},r)),s!=null&&!Qe(s)&&(s=null);const i=zf(),a=new WeakSet,c=[];let l=!1;const h=i.app={_uid:by++,_component:r,_props:s,_container:null,_context:i,_instance:null,version:cv,get config(){return i.config},set config(f){},use(f,...p){return a.has(f)||(f&&be(f.install)?(a.add(f),f.install(h,...p)):be(f)&&(a.add(f),f(h,...p))),h},mixin(f){return i.mixins.includes(f)||i.mixins.push(f),h},component(f,p){return p?(i.components[f]=p,h):i.components[f]},directive(f,p){return p?(i.directives[f]=p,h):i.directives[f]},mount(f,p,y){if(!l){const b=h._ceVNode||tt(r,s);return b.appContext=i,y===!0?y="svg":y===!1&&(y=void 0),t(b,f,y),l=!0,h._container=f,f.__vue_app__=h,ea(b.component)}},onUnmount(f){c.push(f)},unmount(){l&&(hn(c,h._instance,16),t(null,h._container),delete h._container.__vue_app__)},provide(f,p){return i.provides[f]=p,h},runWithContext(f){const p=Ir;Ir=h;try{return f()}finally{Ir=p}}};return h}}let Ir=null;function Cy(t,e){if(Dt){let n=Dt.provides;const r=Dt.parent&&Dt.parent.provides;r===n&&(n=Dt.provides=Object.create(r)),n[t]=e}}function Qs(t,e,n=!1){const r=up();if(r||Ir){let s=Ir?Ir._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(s&&t in s)return s[t];if(arguments.length>1)return n&&be(e)?e.call(r&&r.proxy):e}}function Ry(){return!!(up()||Ir)}const Wf={},Gf=()=>Object.create(Wf),Kf=t=>Object.getPrototypeOf(t)===Wf;function Py(t,e,n,r=!1){const s={},i=Gf();t.propsDefaults=Object.create(null),Qf(t,e,s,i);for(const a in t.propsOptions[0])a in s||(s[a]=void 0);n?t.props=r?s:q_(s):t.type.props?t.props=s:t.props=i,t.attrs=i}function ky(t,e,n,r){const{props:s,attrs:i,vnode:{patchFlag:a}}=t,c=Oe(s),[l]=t.propsOptions;let h=!1;if((r||a>0)&&!(a&16)){if(a&8){const f=t.vnode.dynamicProps;for(let p=0;p<f.length;p++){let y=f[p];if(Yo(t.emitsOptions,y))continue;const b=e[y];if(l)if(Fe(i,y))b!==i[y]&&(i[y]=b,h=!0);else{const R=Zn(y);s[R]=pc(l,c,R,b,t,!1)}else b!==i[y]&&(i[y]=b,h=!0)}}}else{Qf(t,e,s,i)&&(h=!0);let f;for(const p in c)(!e||!Fe(e,p)&&((f=ur(p))===p||!Fe(e,f)))&&(l?n&&(n[p]!==void 0||n[f]!==void 0)&&(s[p]=pc(l,c,p,void 0,t,!0)):delete s[p]);if(i!==c)for(const p in i)(!e||!Fe(e,p))&&(delete i[p],h=!0)}h&&yn(t.attrs,"set","")}function Qf(t,e,n,r){const[s,i]=t.propsOptions;let a=!1,c;if(e)for(let l in e){if(qs(l))continue;const h=e[l];let f;s&&Fe(s,f=Zn(l))?!i||!i.includes(f)?n[f]=h:(c||(c={}))[f]=h:Yo(t.emitsOptions,l)||(!(l in r)||h!==r[l])&&(r[l]=h,a=!0)}if(i){const l=Oe(n),h=c||je;for(let f=0;f<i.length;f++){const p=i[f];n[p]=pc(s,l,p,h[p],t,!Fe(h,p))}}return a}function pc(t,e,n,r,s,i){const a=t[n];if(a!=null){const c=Fe(a,"default");if(c&&r===void 0){const l=a.default;if(a.type!==Function&&!a.skipFactory&&be(l)){const{propsDefaults:h}=s;if(n in h)r=h[n];else{const f=Ti(s);r=h[n]=l.call(null,e),f()}}else r=l;s.ce&&s.ce._setProp(n,r)}a[0]&&(i&&!c?r=!1:a[1]&&(r===""||r===ur(n))&&(r=!0))}return r}const Dy=new WeakMap;function Xf(t,e,n=!1){const r=n?Dy:e.propsCache,s=r.get(t);if(s)return s;const i=t.props,a={},c=[];let l=!1;if(!be(t)){const f=p=>{l=!0;const[y,b]=Xf(p,e,!0);Nt(a,y),b&&c.push(...b)};!n&&e.mixins.length&&e.mixins.forEach(f),t.extends&&f(t.extends),t.mixins&&t.mixins.forEach(f)}if(!i&&!l)return Qe(t)&&r.set(t,Xr),Xr;if(ye(i))for(let f=0;f<i.length;f++){const p=Zn(i[f]);nh(p)&&(a[p]=je)}else if(i)for(const f in i){const p=Zn(f);if(nh(p)){const y=i[f],b=a[p]=ye(y)||be(y)?{type:y}:Nt({},y),R=b.type;let N=!1,x=!0;if(ye(R))for(let j=0;j<R.length;++j){const W=R[j],K=be(W)&&W.name;if(K==="Boolean"){N=!0;break}else K==="String"&&(x=!1)}else N=be(R)&&R.name==="Boolean";b[0]=N,b[1]=x,(N||Fe(b,"default"))&&c.push(p)}}const h=[a,c];return Qe(t)&&r.set(t,h),h}function nh(t){return t[0]!=="$"&&!qs(t)}const il=t=>t==="_"||t==="__"||t==="_ctx"||t==="$stable",ol=t=>ye(t)?t.map(nn):[nn(t)],Ny=(t,e,n)=>{if(e._n)return e;const r=ry((...s)=>ol(e(...s)),n);return r._c=!1,r},Jf=(t,e,n)=>{const r=t._ctx;for(const s in t){if(il(s))continue;const i=t[s];if(be(i))e[s]=Ny(s,i,r);else if(i!=null){const a=ol(i);e[s]=()=>a}}},Yf=(t,e)=>{const n=ol(e);t.slots.default=()=>n},Zf=(t,e,n)=>{for(const r in e)(n||!il(r))&&(t[r]=e[r])},xy=(t,e,n)=>{const r=t.slots=Gf();if(t.vnode.shapeFlag&32){const s=e.__;s&&oc(r,"__",s,!0);const i=e._;i?(Zf(r,e,n),n&&oc(r,"_",i,!0)):Jf(e,r)}else e&&Yf(t,e)},Vy=(t,e,n)=>{const{vnode:r,slots:s}=t;let i=!0,a=je;if(r.shapeFlag&32){const c=e._;c?n&&c===1?i=!1:Zf(s,e,n):(i=!e.$stable,Jf(e,s)),a=e}else e&&(Yf(t,e),a={default:1});if(i)for(const c in s)!il(c)&&a[c]==null&&delete s[c]},Mt=Ky;function Oy(t){return My(t)}function My(t,e){const n=Go();n.__VUE__=!0;const{insert:r,remove:s,patchProp:i,createElement:a,createText:c,createComment:l,setText:h,setElementText:f,parentNode:p,nextSibling:y,setScopeId:b=rn,insertStaticContent:R}=t,N=(T,A,D,$=null,F=null,U=null,J=void 0,G=null,H=!!A.dynamicChildren)=>{if(T===A)return;T&&!Ls(T,A)&&($=Se(T),L(T,F,U,!0),T=null),A.patchFlag===-2&&(H=!1,A.dynamicChildren=null);const{type:B,ref:ae,shapeFlag:X}=A;switch(B){case Zo:x(T,A,D,$);break;case nr:j(T,A,D,$);break;case so:T==null&&W(A,D,$,J);break;case nt:S(T,A,D,$,F,U,J,G,H);break;default:X&1?ce(T,A,D,$,F,U,J,G,H):X&6?E(T,A,D,$,F,U,J,G,H):(X&64||X&128)&&B.process(T,A,D,$,F,U,J,G,H,Le)}ae!=null&&F?Ws(ae,T&&T.ref,U,A||T,!A):ae==null&&T&&T.ref!=null&&Ws(T.ref,null,U,T,!0)},x=(T,A,D,$)=>{if(T==null)r(A.el=c(A.children),D,$);else{const F=A.el=T.el;A.children!==T.children&&h(F,A.children)}},j=(T,A,D,$)=>{T==null?r(A.el=l(A.children||""),D,$):A.el=T.el},W=(T,A,D,$)=>{[T.el,T.anchor]=R(T.children,A,D,$,T.el,T.anchor)},K=({el:T,anchor:A},D,$)=>{let F;for(;T&&T!==A;)F=y(T),r(T,D,$),T=F;r(A,D,$)},z=({el:T,anchor:A})=>{let D;for(;T&&T!==A;)D=y(T),s(T),T=D;s(A)},ce=(T,A,D,$,F,U,J,G,H)=>{A.type==="svg"?J="svg":A.type==="math"&&(J="mathml"),T==null?Ie(A,D,$,F,U,J,G,H):_(T,A,F,U,J,G,H)},Ie=(T,A,D,$,F,U,J,G)=>{let H,B;const{props:ae,shapeFlag:X,transition:oe,dirs:pe}=T;if(H=T.el=a(T.type,U,ae&&ae.is,ae),X&8?f(H,T.children):X&16&&g(T.children,H,null,$,F,Ba(T,U),J,G),pe&&mr(T,null,$,"created"),w(H,T,T.scopeId,J,$),ae){for(const Ae in ae)Ae!=="value"&&!qs(Ae)&&i(H,Ae,null,ae[Ae],U,$);"value"in ae&&i(H,"value",null,ae.value,U),(B=ae.onVnodeBeforeMount)&&Zt(B,$,T)}pe&&mr(T,null,$,"beforeMount");const de=Ly(F,oe);de&&oe.beforeEnter(H),r(H,A,D),((B=ae&&ae.onVnodeMounted)||de||pe)&&Mt(()=>{B&&Zt(B,$,T),de&&oe.enter(H),pe&&mr(T,null,$,"mounted")},F)},w=(T,A,D,$,F)=>{if(D&&b(T,D),$)for(let U=0;U<$.length;U++)b(T,$[U]);if(F){let U=F.subTree;if(A===U||ip(U.type)&&(U.ssContent===A||U.ssFallback===A)){const J=F.vnode;w(T,J,J.scopeId,J.slotScopeIds,F.parent)}}},g=(T,A,D,$,F,U,J,G,H=0)=>{for(let B=H;B<T.length;B++){const ae=T[B]=G?Bn(T[B]):nn(T[B]);N(null,ae,A,D,$,F,U,J,G)}},_=(T,A,D,$,F,U,J)=>{const G=A.el=T.el;let{patchFlag:H,dynamicChildren:B,dirs:ae}=A;H|=T.patchFlag&16;const X=T.props||je,oe=A.props||je;let pe;if(D&&gr(D,!1),(pe=oe.onVnodeBeforeUpdate)&&Zt(pe,D,A,T),ae&&mr(A,T,D,"beforeUpdate"),D&&gr(D,!0),(X.innerHTML&&oe.innerHTML==null||X.textContent&&oe.textContent==null)&&f(G,""),B?v(T.dynamicChildren,B,G,D,$,Ba(A,F),U):J||me(T,A,G,null,D,$,Ba(A,F),U,!1),H>0){if(H&16)I(G,X,oe,D,F);else if(H&2&&X.class!==oe.class&&i(G,"class",null,oe.class,F),H&4&&i(G,"style",X.style,oe.style,F),H&8){const de=A.dynamicProps;for(let Ae=0;Ae<de.length;Ae++){const ke=de[Ae],ht=X[ke],dt=oe[ke];(dt!==ht||ke==="value")&&i(G,ke,ht,dt,F,D)}}H&1&&T.children!==A.children&&f(G,A.children)}else!J&&B==null&&I(G,X,oe,D,F);((pe=oe.onVnodeUpdated)||ae)&&Mt(()=>{pe&&Zt(pe,D,A,T),ae&&mr(A,T,D,"updated")},$)},v=(T,A,D,$,F,U,J)=>{for(let G=0;G<A.length;G++){const H=T[G],B=A[G],ae=H.el&&(H.type===nt||!Ls(H,B)||H.shapeFlag&198)?p(H.el):D;N(H,B,ae,null,$,F,U,J,!0)}},I=(T,A,D,$,F)=>{if(A!==D){if(A!==je)for(const U in A)!qs(U)&&!(U in D)&&i(T,U,A[U],null,F,$);for(const U in D){if(qs(U))continue;const J=D[U],G=A[U];J!==G&&U!=="value"&&i(T,U,G,J,F,$)}"value"in D&&i(T,"value",A.value,D.value,F)}},S=(T,A,D,$,F,U,J,G,H)=>{const B=A.el=T?T.el:c(""),ae=A.anchor=T?T.anchor:c("");let{patchFlag:X,dynamicChildren:oe,slotScopeIds:pe}=A;pe&&(G=G?G.concat(pe):pe),T==null?(r(B,D,$),r(ae,D,$),g(A.children||[],D,ae,F,U,J,G,H)):X>0&&X&64&&oe&&T.dynamicChildren?(v(T.dynamicChildren,oe,D,F,U,J,G),(A.key!=null||F&&A===F.subTree)&&ep(T,A,!0)):me(T,A,D,ae,F,U,J,G,H)},E=(T,A,D,$,F,U,J,G,H)=>{A.slotScopeIds=G,T==null?A.shapeFlag&512?F.ctx.activate(A,D,$,J,H):Me(A,D,$,F,U,J,H):ze(T,A,H)},Me=(T,A,D,$,F,U,J)=>{const G=T.component=nv(T,$,F);if(Bf(T)&&(G.ctx.renderer=Le),rv(G,!1,J),G.asyncDep){if(F&&F.registerDep(G,Te,J),!T.el){const H=G.subTree=tt(nr);j(null,H,A,D),T.placeholder=H.el}}else Te(G,T,A,D,F,U,J)},ze=(T,A,D)=>{const $=A.component=T.component;if(Wy(T,A,D))if($.asyncDep&&!$.asyncResolved){ie($,A,D);return}else $.next=A,$.update();else A.el=T.el,$.vnode=A},Te=(T,A,D,$,F,U,J)=>{const G=()=>{if(T.isMounted){let{next:X,bu:oe,u:pe,parent:de,vnode:Ae}=T;{const vt=tp(T);if(vt){X&&(X.el=Ae.el,ie(T,X,J)),vt.asyncDep.then(()=>{T.isUnmounted||G()});return}}let ke=X,ht;gr(T,!1),X?(X.el=Ae.el,ie(T,X,J)):X=Ae,oe&&ro(oe),(ht=X.props&&X.props.onVnodeBeforeUpdate)&&Zt(ht,de,X,Ae),gr(T,!0);const dt=sh(T),Ft=T.subTree;T.subTree=dt,N(Ft,dt,p(Ft.el),Se(Ft),T,F,U),X.el=dt.el,ke===null&&Gy(T,dt.el),pe&&Mt(pe,F),(ht=X.props&&X.props.onVnodeUpdated)&&Mt(()=>Zt(ht,de,X,Ae),F)}else{let X;const{el:oe,props:pe}=A,{bm:de,m:Ae,parent:ke,root:ht,type:dt}=T,Ft=Gs(A);gr(T,!1),de&&ro(de),!Ft&&(X=pe&&pe.onVnodeBeforeMount)&&Zt(X,ke,A),gr(T,!0);{ht.ce&&ht.ce._def.shadowRoot!==!1&&ht.ce._injectChildStyle(dt);const vt=T.subTree=sh(T);N(null,vt,D,$,T,F,U),A.el=vt.el}if(Ae&&Mt(Ae,F),!Ft&&(X=pe&&pe.onVnodeMounted)){const vt=A;Mt(()=>Zt(X,ke,vt),F)}(A.shapeFlag&256||ke&&Gs(ke.vnode)&&ke.vnode.shapeFlag&256)&&T.a&&Mt(T.a,F),T.isMounted=!0,A=D=$=null}};T.scope.on();const H=T.effect=new yf(G);T.scope.off();const B=T.update=H.run.bind(H),ae=T.job=H.runIfDirty.bind(H);ae.i=T,ae.id=T.uid,H.scheduler=()=>rl(ae),gr(T,!0),B()},ie=(T,A,D)=>{A.component=T;const $=T.vnode.props;T.vnode=A,T.next=null,ky(T,A.props,$,D),Vy(T,A.children,D),An(),Ju(T),bn()},me=(T,A,D,$,F,U,J,G,H=!1)=>{const B=T&&T.children,ae=T?T.shapeFlag:0,X=A.children,{patchFlag:oe,shapeFlag:pe}=A;if(oe>0){if(oe&128){ge(B,X,D,$,F,U,J,G,H);return}else if(oe&256){Ke(B,X,D,$,F,U,J,G,H);return}}pe&8?(ae&16&&ne(B,F,U),X!==B&&f(D,X)):ae&16?pe&16?ge(B,X,D,$,F,U,J,G,H):ne(B,F,U,!0):(ae&8&&f(D,""),pe&16&&g(X,D,$,F,U,J,G,H))},Ke=(T,A,D,$,F,U,J,G,H)=>{T=T||Xr,A=A||Xr;const B=T.length,ae=A.length,X=Math.min(B,ae);let oe;for(oe=0;oe<X;oe++){const pe=A[oe]=H?Bn(A[oe]):nn(A[oe]);N(T[oe],pe,D,null,F,U,J,G,H)}B>ae?ne(T,F,U,!0,!1,X):g(A,D,$,F,U,J,G,H,X)},ge=(T,A,D,$,F,U,J,G,H)=>{let B=0;const ae=A.length;let X=T.length-1,oe=ae-1;for(;B<=X&&B<=oe;){const pe=T[B],de=A[B]=H?Bn(A[B]):nn(A[B]);if(Ls(pe,de))N(pe,de,D,null,F,U,J,G,H);else break;B++}for(;B<=X&&B<=oe;){const pe=T[X],de=A[oe]=H?Bn(A[oe]):nn(A[oe]);if(Ls(pe,de))N(pe,de,D,null,F,U,J,G,H);else break;X--,oe--}if(B>X){if(B<=oe){const pe=oe+1,de=pe<ae?A[pe].el:$;for(;B<=oe;)N(null,A[B]=H?Bn(A[B]):nn(A[B]),D,de,F,U,J,G,H),B++}}else if(B>oe)for(;B<=X;)L(T[B],F,U,!0),B++;else{const pe=B,de=B,Ae=new Map;for(B=de;B<=oe;B++){const ft=A[B]=H?Bn(A[B]):nn(A[B]);ft.key!=null&&Ae.set(ft.key,B)}let ke,ht=0;const dt=oe-de+1;let Ft=!1,vt=0;const Vn=new Array(dt);for(B=0;B<dt;B++)Vn[B]=0;for(B=pe;B<=X;B++){const ft=T[B];if(ht>=dt){L(ft,F,U,!0);continue}let Ut;if(ft.key!=null)Ut=Ae.get(ft.key);else for(ke=de;ke<=oe;ke++)if(Vn[ke-de]===0&&Ls(ft,A[ke])){Ut=ke;break}Ut===void 0?L(ft,F,U,!0):(Vn[Ut-de]=B+1,Ut>=vt?vt=Ut:Ft=!0,N(ft,A[Ut],D,null,F,U,J,G,H),ht++)}const ws=Ft?Fy(Vn):Xr;for(ke=ws.length-1,B=dt-1;B>=0;B--){const ft=de+B,Ut=A[ft],Ni=A[ft+1],Lr=ft+1<ae?Ni.el||Ni.placeholder:$;Vn[B]===0?N(null,Ut,D,Lr,F,U,J,G,H):Ft&&(ke<0||B!==ws[ke]?V(Ut,D,Lr,2):ke--)}}},V=(T,A,D,$,F=null)=>{const{el:U,type:J,transition:G,children:H,shapeFlag:B}=T;if(B&6){V(T.component.subTree,A,D,$);return}if(B&128){T.suspense.move(A,D,$);return}if(B&64){J.move(T,A,D,Le);return}if(J===nt){r(U,A,D);for(let X=0;X<H.length;X++)V(H[X],A,D,$);r(T.anchor,A,D);return}if(J===so){K(T,A,D);return}if($!==2&&B&1&&G)if($===0)G.beforeEnter(U),r(U,A,D),Mt(()=>G.enter(U),F);else{const{leave:X,delayLeave:oe,afterLeave:pe}=G,de=()=>{T.ctx.isUnmounted?s(U):r(U,A,D)},Ae=()=>{X(U,()=>{de(),pe&&pe()})};oe?oe(U,de,Ae):Ae()}else r(U,A,D)},L=(T,A,D,$=!1,F=!1)=>{const{type:U,props:J,ref:G,children:H,dynamicChildren:B,shapeFlag:ae,patchFlag:X,dirs:oe,cacheIndex:pe}=T;if(X===-2&&(F=!1),G!=null&&(An(),Ws(G,null,D,T,!0),bn()),pe!=null&&(A.renderCache[pe]=void 0),ae&256){A.ctx.deactivate(T);return}const de=ae&1&&oe,Ae=!Gs(T);let ke;if(Ae&&(ke=J&&J.onVnodeBeforeUnmount)&&Zt(ke,A,T),ae&6)q(T.component,D,$);else{if(ae&128){T.suspense.unmount(D,$);return}de&&mr(T,null,A,"beforeUnmount"),ae&64?T.type.remove(T,A,D,Le,$):B&&!B.hasOnce&&(U!==nt||X>0&&X&64)?ne(B,A,D,!1,!0):(U===nt&&X&384||!F&&ae&16)&&ne(H,A,D),$&&P(T)}(Ae&&(ke=J&&J.onVnodeUnmounted)||de)&&Mt(()=>{ke&&Zt(ke,A,T),de&&mr(T,null,A,"unmounted")},D)},P=T=>{const{type:A,el:D,anchor:$,transition:F}=T;if(A===nt){Z(D,$);return}if(A===so){z(T);return}const U=()=>{s(D),F&&!F.persisted&&F.afterLeave&&F.afterLeave()};if(T.shapeFlag&1&&F&&!F.persisted){const{leave:J,delayLeave:G}=F,H=()=>J(D,U);G?G(T.el,U,H):H()}else U()},Z=(T,A)=>{let D;for(;T!==A;)D=y(T),s(T),T=D;s(A)},q=(T,A,D)=>{const{bum:$,scope:F,job:U,subTree:J,um:G,m:H,a:B,parent:ae,slots:{__:X}}=T;rh(H),rh(B),$&&ro($),ae&&ye(X)&&X.forEach(oe=>{ae.renderCache[oe]=void 0}),F.stop(),U&&(U.flags|=8,L(J,T,A,D)),G&&Mt(G,A),Mt(()=>{T.isUnmounted=!0},A),A&&A.pendingBranch&&!A.isUnmounted&&T.asyncDep&&!T.asyncResolved&&T.suspenseId===A.pendingId&&(A.deps--,A.deps===0&&A.resolve())},ne=(T,A,D,$=!1,F=!1,U=0)=>{for(let J=U;J<T.length;J++)L(T[J],A,D,$,F)},Se=T=>{if(T.shapeFlag&6)return Se(T.component.subTree);if(T.shapeFlag&128)return T.suspense.next();const A=y(T.anchor||T.el),D=A&&A[iy];return D?y(D):A};let we=!1;const he=(T,A,D)=>{T==null?A._vnode&&L(A._vnode,null,null,!0):N(A._vnode||null,T,A,null,null,null,D),A._vnode=T,we||(we=!0,Ju(),Lf(),we=!1)},Le={p:N,um:L,m:V,r:P,mt:Me,mc:g,pc:me,pbc:v,n:Se,o:t};return{render:he,hydrate:void 0,createApp:Sy(he)}}function Ba({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function gr({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function Ly(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function ep(t,e,n=!1){const r=t.children,s=e.children;if(ye(r)&&ye(s))for(let i=0;i<r.length;i++){const a=r[i];let c=s[i];c.shapeFlag&1&&!c.dynamicChildren&&((c.patchFlag<=0||c.patchFlag===32)&&(c=s[i]=Bn(s[i]),c.el=a.el),!n&&c.patchFlag!==-2&&ep(a,c)),c.type===Zo&&(c.el=a.el),c.type===nr&&!c.el&&(c.el=a.el)}}function Fy(t){const e=t.slice(),n=[0];let r,s,i,a,c;const l=t.length;for(r=0;r<l;r++){const h=t[r];if(h!==0){if(s=n[n.length-1],t[s]<h){e[r]=s,n.push(r);continue}for(i=0,a=n.length-1;i<a;)c=i+a>>1,t[n[c]]<h?i=c+1:a=c;h<t[n[i]]&&(i>0&&(e[r]=n[i-1]),n[i]=r)}}for(i=n.length,a=n[i-1];i-- >0;)n[i]=a,a=e[a];return n}function tp(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:tp(e)}function rh(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}const Uy=Symbol.for("v-scx"),$y=()=>Qs(Uy);function qt(t,e,n){return np(t,e,n)}function np(t,e,n=je){const{immediate:r,deep:s,flush:i,once:a}=n,c=Nt({},n),l=e&&r||!e&&i!=="post";let h;if(ci){if(i==="sync"){const b=$y();h=b.__watcherHandles||(b.__watcherHandles=[])}else if(!l){const b=()=>{};return b.stop=rn,b.resume=rn,b.pause=rn,b}}const f=Dt;c.call=(b,R,N)=>hn(b,f,R,N);let p=!1;i==="post"?c.scheduler=b=>{Mt(b,f&&f.suspense)}:i!=="sync"&&(p=!0,c.scheduler=(b,R)=>{R?b():rl(b)}),c.augmentJob=b=>{e&&(b.flags|=4),p&&(b.flags|=2,f&&(b.id=f.uid,b.i=f))};const y=Z_(t,e,c);return ci&&(h?h.push(y):l&&y()),y}function By(t,e,n){const r=this.proxy,s=ot(t)?t.includes(".")?rp(r,t):()=>r[t]:t.bind(r,r);let i;be(e)?i=e:(i=e.handler,n=e);const a=Ti(this),c=np(s,i.bind(r),n);return a(),c}function rp(t,e){const n=e.split(".");return()=>{let r=t;for(let s=0;s<n.length&&r;s++)r=r[n[s]];return r}}const jy=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${Zn(e)}Modifiers`]||t[`${ur(e)}Modifiers`];function qy(t,e,...n){if(t.isUnmounted)return;const r=t.vnode.props||je;let s=n;const i=e.startsWith("update:"),a=i&&jy(r,e.slice(7));a&&(a.trim&&(s=n.map(f=>ot(f)?f.trim():f)),a.number&&(s=n.map(ac)));let c,l=r[c=Oa(e)]||r[c=Oa(Zn(e))];!l&&i&&(l=r[c=Oa(ur(e))]),l&&hn(l,t,6,s);const h=r[c+"Once"];if(h){if(!t.emitted)t.emitted={};else if(t.emitted[c])return;t.emitted[c]=!0,hn(h,t,6,s)}}function sp(t,e,n=!1){const r=e.emitsCache,s=r.get(t);if(s!==void 0)return s;const i=t.emits;let a={},c=!1;if(!be(t)){const l=h=>{const f=sp(h,e,!0);f&&(c=!0,Nt(a,f))};!n&&e.mixins.length&&e.mixins.forEach(l),t.extends&&l(t.extends),t.mixins&&t.mixins.forEach(l)}return!i&&!c?(Qe(t)&&r.set(t,null),null):(ye(i)?i.forEach(l=>a[l]=null):Nt(a,i),Qe(t)&&r.set(t,a),a)}function Yo(t,e){return!t||!Ho(e)?!1:(e=e.slice(2).replace(/Once$/,""),Fe(t,e[0].toLowerCase()+e.slice(1))||Fe(t,ur(e))||Fe(t,e))}function sh(t){const{type:e,vnode:n,proxy:r,withProxy:s,propsOptions:[i],slots:a,attrs:c,emit:l,render:h,renderCache:f,props:p,data:y,setupState:b,ctx:R,inheritAttrs:N}=t,x=Io(t);let j,W;try{if(n.shapeFlag&4){const z=s||r,ce=z;j=nn(h.call(ce,z,f,p,b,y,R)),W=c}else{const z=e;j=nn(z.length>1?z(p,{attrs:c,slots:a,emit:l}):z(p,null)),W=e.props?c:Hy(c)}}catch(z){Xs.length=0,Xo(z,t,1),j=tt(nr)}let K=j;if(W&&N!==!1){const z=Object.keys(W),{shapeFlag:ce}=K;z.length&&ce&7&&(i&&z.some(zc)&&(W=zy(W,i)),K=is(K,W,!1,!0))}return n.dirs&&(K=is(K,null,!1,!0),K.dirs=K.dirs?K.dirs.concat(n.dirs):n.dirs),n.transition&&sl(K,n.transition),j=K,Io(x),j}const Hy=t=>{let e;for(const n in t)(n==="class"||n==="style"||Ho(n))&&((e||(e={}))[n]=t[n]);return e},zy=(t,e)=>{const n={};for(const r in t)(!zc(r)||!(r.slice(9)in e))&&(n[r]=t[r]);return n};function Wy(t,e,n){const{props:r,children:s,component:i}=t,{props:a,children:c,patchFlag:l}=e,h=i.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return r?ih(r,a,h):!!a;if(l&8){const f=e.dynamicProps;for(let p=0;p<f.length;p++){const y=f[p];if(a[y]!==r[y]&&!Yo(h,y))return!0}}}else return(s||c)&&(!c||!c.$stable)?!0:r===a?!1:r?a?ih(r,a,h):!0:!!a;return!1}function ih(t,e,n){const r=Object.keys(e);if(r.length!==Object.keys(t).length)return!0;for(let s=0;s<r.length;s++){const i=r[s];if(e[i]!==t[i]&&!Yo(n,i))return!0}return!1}function Gy({vnode:t,parent:e},n){for(;e;){const r=e.subTree;if(r.suspense&&r.suspense.activeBranch===t&&(r.el=t.el),r===t)(t=e.vnode).el=n,e=e.parent;else break}}const ip=t=>t.__isSuspense;function Ky(t,e){e&&e.pendingBranch?ye(t)?e.effects.push(...t):e.effects.push(t):ny(t)}const nt=Symbol.for("v-fgt"),Zo=Symbol.for("v-txt"),nr=Symbol.for("v-cmt"),so=Symbol.for("v-stc"),Xs=[];let Lt=null;function re(t=!1){Xs.push(Lt=t?null:[])}function Qy(){Xs.pop(),Lt=Xs[Xs.length-1]||null}let ai=1;function oh(t,e=!1){ai+=t,t<0&&Lt&&e&&(Lt.hasOnce=!0)}function op(t){return t.dynamicChildren=ai>0?Lt||Xr:null,Qy(),ai>0&&Lt&&Lt.push(t),t}function se(t,e,n,r,s,i){return op(ue(t,e,n,r,s,i,!0))}function Xy(t,e,n,r,s){return op(tt(t,e,n,r,s,!0))}function ap(t){return t?t.__v_isVNode===!0:!1}function Ls(t,e){return t.type===e.type&&t.key===e.key}const cp=({key:t})=>t??null,io=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?ot(t)||Ze(t)||be(t)?{i:jt,r:t,k:e,f:!!n}:t:null);function ue(t,e=null,n=null,r=0,s=null,i=t===nt?0:1,a=!1,c=!1){const l={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&cp(e),ref:e&&io(e),scopeId:Uf,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:jt};return c?(al(l,n),i&128&&t.normalize(l)):n&&(l.shapeFlag|=ot(n)?8:16),ai>0&&!a&&Lt&&(l.patchFlag>0||i&6)&&l.patchFlag!==32&&Lt.push(l),l}const tt=Jy;function Jy(t,e=null,n=null,r=0,s=null,i=!1){if((!t||t===yy)&&(t=nr),ap(t)){const c=is(t,e,!0);return n&&al(c,n),ai>0&&!i&&Lt&&(c.shapeFlag&6?Lt[Lt.indexOf(t)]=c:Lt.push(c)),c.patchFlag=-2,c}if(av(t)&&(t=t.__vccOpts),e){e=Yy(e);let{class:c,style:l}=e;c&&!ot(c)&&(e.class=er(c)),Qe(l)&&(el(l)&&!ye(l)&&(l=Nt({},l)),e.style=wn(l))}const a=ot(t)?1:ip(t)?128:oy(t)?64:Qe(t)?4:be(t)?2:0;return ue(t,e,n,r,s,a,i,!0)}function Yy(t){return t?el(t)||Kf(t)?Nt({},t):t:null}function is(t,e,n=!1,r=!1){const{props:s,ref:i,patchFlag:a,children:c,transition:l}=t,h=e?Zy(s||{},e):s,f={__v_isVNode:!0,__v_skip:!0,type:t.type,props:h,key:h&&cp(h),ref:e&&e.ref?n&&i?ye(i)?i.concat(io(e)):[i,io(e)]:io(e):i,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:c,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==nt?a===-1?16:a|16:a,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:l,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&is(t.ssContent),ssFallback:t.ssFallback&&is(t.ssFallback),placeholder:t.placeholder,el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce};return l&&r&&sl(f,l.clone(f)),f}function lp(t=" ",e=0){return tt(Zo,null,t,e)}function ja(t,e){const n=tt(so,null,t);return n.staticCount=e,n}function at(t="",e=!1){return e?(re(),Xy(nr,null,t)):tt(nr,null,t)}function nn(t){return t==null||typeof t=="boolean"?tt(nr):ye(t)?tt(nt,null,t.slice()):ap(t)?Bn(t):tt(Zo,null,String(t))}function Bn(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:is(t)}function al(t,e){let n=0;const{shapeFlag:r}=t;if(e==null)e=null;else if(ye(e))n=16;else if(typeof e=="object")if(r&65){const s=e.default;s&&(s._c&&(s._d=!1),al(t,s()),s._c&&(s._d=!0));return}else{n=32;const s=e._;!s&&!Kf(e)?e._ctx=jt:s===3&&jt&&(jt.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else be(e)?(e={default:e,_ctx:jt},n=32):(e=String(e),r&64?(n=16,e=[lp(e)]):n=8);t.children=e,t.shapeFlag|=n}function Zy(...t){const e={};for(let n=0;n<t.length;n++){const r=t[n];for(const s in r)if(s==="class")e.class!==r.class&&(e.class=er([e.class,r.class]));else if(s==="style")e.style=wn([e.style,r.style]);else if(Ho(s)){const i=e[s],a=r[s];a&&i!==a&&!(ye(i)&&i.includes(a))&&(e[s]=i?[].concat(i,a):a)}else s!==""&&(e[s]=r[s])}return e}function Zt(t,e,n,r=null){hn(t,e,7,[n,r])}const ev=zf();let tv=0;function nv(t,e,n){const r=t.type,s=(e?e.appContext:t.appContext)||ev,i={uid:tv++,vnode:t,type:r,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new mf(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Xf(r,s),emitsOptions:sp(r,s),emit:null,emitted:null,propsDefaults:je,inheritAttrs:r.inheritAttrs,ctx:je,data:je,props:je,attrs:je,slots:je,refs:je,setupState:je,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=qy.bind(null,i),t.ce&&t.ce(i),i}let Dt=null;const up=()=>Dt||jt;let Ao,mc;{const t=Go(),e=(n,r)=>{let s;return(s=t[n])||(s=t[n]=[]),s.push(r),i=>{s.length>1?s.forEach(a=>a(i)):s[0](i)}};Ao=e("__VUE_INSTANCE_SETTERS__",n=>Dt=n),mc=e("__VUE_SSR_SETTERS__",n=>ci=n)}const Ti=t=>{const e=Dt;return Ao(t),t.scope.on(),()=>{t.scope.off(),Ao(e)}},ah=()=>{Dt&&Dt.scope.off(),Ao(null)};function hp(t){return t.vnode.shapeFlag&4}let ci=!1;function rv(t,e=!1,n=!1){e&&mc(e);const{props:r,children:s}=t.vnode,i=hp(t);Py(t,r,i,e),xy(t,s,n||e);const a=i?sv(t,e):void 0;return e&&mc(!1),a}function sv(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,vy);const{setup:r}=n;if(r){An();const s=t.setupContext=r.length>1?ov(t):null,i=Ti(t),a=vi(r,t,0,[t.props,s]),c=cf(a);if(bn(),i(),(c||t.sp)&&!Gs(t)&&$f(t),c){if(a.then(ah,ah),e)return a.then(l=>{ch(t,l)}).catch(l=>{Xo(l,t,0)});t.asyncDep=a}else ch(t,a)}else dp(t)}function ch(t,e,n){be(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:Qe(e)&&(t.setupState=Vf(e)),dp(t)}function dp(t,e,n){const r=t.type;t.render||(t.render=r.render||rn);{const s=Ti(t);An();try{Ty(t)}finally{bn(),s()}}}const iv={get(t,e){return bt(t,"get",""),t[e]}};function ov(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,iv),slots:t.slots,emit:t.emit,expose:e}}function ea(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(Vf(tl(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in Ks)return Ks[n](t)},has(e,n){return n in e||n in Ks}})):t.proxy}function av(t){return be(t)&&"__vccOpts"in t}const Y=(t,e)=>J_(t,e,ci),cv="3.5.18";/**
* @vue/runtime-dom v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let gc;const lh=typeof window<"u"&&window.trustedTypes;if(lh)try{gc=lh.createPolicy("vue",{createHTML:t=>t})}catch{}const fp=gc?t=>gc.createHTML(t):t=>t,lv="http://www.w3.org/2000/svg",uv="http://www.w3.org/1998/Math/MathML",_n=typeof document<"u"?document:null,uh=_n&&_n.createElement("template"),hv={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,r)=>{const s=e==="svg"?_n.createElementNS(lv,t):e==="mathml"?_n.createElementNS(uv,t):n?_n.createElement(t,{is:n}):_n.createElement(t);return t==="select"&&r&&r.multiple!=null&&s.setAttribute("multiple",r.multiple),s},createText:t=>_n.createTextNode(t),createComment:t=>_n.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>_n.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,r,s,i){const a=n?n.previousSibling:e.lastChild;if(s&&(s===i||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),n),!(s===i||!(s=s.nextSibling)););else{uh.innerHTML=fp(r==="svg"?`<svg>${t}</svg>`:r==="mathml"?`<math>${t}</math>`:t);const c=uh.content;if(r==="svg"||r==="mathml"){const l=c.firstChild;for(;l.firstChild;)c.appendChild(l.firstChild);c.removeChild(l)}e.insertBefore(c,n)}return[a?a.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},dv=Symbol("_vtc");function fv(t,e,n){const r=t[dv];r&&(e=(e?[e,...r]:[...r]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const hh=Symbol("_vod"),pv=Symbol("_vsh"),mv=Symbol(""),gv=/(^|;)\s*display\s*:/;function _v(t,e,n){const r=t.style,s=ot(n);let i=!1;if(n&&!s){if(e)if(ot(e))for(const a of e.split(";")){const c=a.slice(0,a.indexOf(":")).trim();n[c]==null&&oo(r,c,"")}else for(const a in e)n[a]==null&&oo(r,a,"");for(const a in n)a==="display"&&(i=!0),oo(r,a,n[a])}else if(s){if(e!==n){const a=r[mv];a&&(n+=";"+a),r.cssText=n,i=gv.test(n)}}else e&&t.removeAttribute("style");hh in t&&(t[hh]=i?r.display:"",t[pv]&&(r.display="none"))}const dh=/\s*!important$/;function oo(t,e,n){if(ye(n))n.forEach(r=>oo(t,e,r));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const r=yv(t,e);dh.test(n)?t.setProperty(ur(r),n.replace(dh,""),"important"):t[r]=n}}const fh=["Webkit","Moz","ms"],qa={};function yv(t,e){const n=qa[e];if(n)return n;let r=Zn(e);if(r!=="filter"&&r in t)return qa[e]=r;r=hf(r);for(let s=0;s<fh.length;s++){const i=fh[s]+r;if(i in t)return qa[e]=i}return e}const ph="http://www.w3.org/1999/xlink";function mh(t,e,n,r,s,i=I_(e)){r&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(ph,e.slice(6,e.length)):t.setAttributeNS(ph,e,n):n==null||i&&!df(n)?t.removeAttribute(e):t.setAttribute(e,i?"":lr(n)?String(n):n)}function gh(t,e,n,r,s){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?fp(n):n);return}const i=t.tagName;if(e==="value"&&i!=="PROGRESS"&&!i.includes("-")){const c=i==="OPTION"?t.getAttribute("value")||"":t.value,l=n==null?t.type==="checkbox"?"on":"":String(n);(c!==l||!("_value"in t))&&(t.value=l),n==null&&t.removeAttribute(e),t._value=n;return}let a=!1;if(n===""||n==null){const c=typeof t[e];c==="boolean"?n=df(n):n==null&&c==="string"?(n="",a=!0):c==="number"&&(n=0,a=!0)}try{t[e]=n}catch{}a&&t.removeAttribute(s||e)}function zr(t,e,n,r){t.addEventListener(e,n,r)}function vv(t,e,n,r){t.removeEventListener(e,n,r)}const _h=Symbol("_vei");function Tv(t,e,n,r,s=null){const i=t[_h]||(t[_h]={}),a=i[e];if(r&&a)a.value=r;else{const[c,l]=Ev(e);if(r){const h=i[e]=Av(r,s);zr(t,c,h,l)}else a&&(vv(t,c,a,l),i[e]=void 0)}}const yh=/(?:Once|Passive|Capture)$/;function Ev(t){let e;if(yh.test(t)){e={};let r;for(;r=t.match(yh);)t=t.slice(0,t.length-r[0].length),e[r[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):ur(t.slice(2)),e]}let Ha=0;const Iv=Promise.resolve(),wv=()=>Ha||(Iv.then(()=>Ha=0),Ha=Date.now());function Av(t,e){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;hn(bv(r,n.value),e,5,[r])};return n.value=t,n.attached=wv(),n}function bv(t,e){if(ye(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(r=>s=>!s._stopped&&r&&r(s))}else return e}const vh=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,Sv=(t,e,n,r,s,i)=>{const a=s==="svg";e==="class"?fv(t,r,a):e==="style"?_v(t,n,r):Ho(e)?zc(e)||Tv(t,e,n,r,i):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):Cv(t,e,r,a))?(gh(t,e,r),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&mh(t,e,r,a,i,e!=="value")):t._isVueCE&&(/[A-Z]/.test(e)||!ot(r))?gh(t,Zn(e),r,i,e):(e==="true-value"?t._trueValue=r:e==="false-value"&&(t._falseValue=r),mh(t,e,r,a))};function Cv(t,e,n,r){if(r)return!!(e==="innerHTML"||e==="textContent"||e in t&&vh(e)&&be(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const s=t.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return vh(e)&&ot(n)?!1:e in t}const Th=t=>{const e=t.props["onUpdate:modelValue"]||!1;return ye(e)?n=>ro(e,n):e};function Rv(t){t.target.composing=!0}function Eh(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const za=Symbol("_assign"),Pv={created(t,{modifiers:{lazy:e,trim:n,number:r}},s){t[za]=Th(s);const i=r||s.props&&s.props.type==="number";zr(t,e?"change":"input",a=>{if(a.target.composing)return;let c=t.value;n&&(c=c.trim()),i&&(c=ac(c)),t[za](c)}),n&&zr(t,"change",()=>{t.value=t.value.trim()}),e||(zr(t,"compositionstart",Rv),zr(t,"compositionend",Eh),zr(t,"change",Eh))},mounted(t,{value:e}){t.value=e??""},beforeUpdate(t,{value:e,oldValue:n,modifiers:{lazy:r,trim:s,number:i}},a){if(t[za]=Th(a),t.composing)return;const c=(i||t.type==="number")&&!/^0\d/.test(t.value)?ac(t.value):t.value,l=e??"";c!==l&&(document.activeElement===t&&t.type!=="range"&&(r&&e===n||s&&t.value.trim()===l)||(t.value=l))}},kv={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},Ih=(t,e)=>{const n=t._withKeys||(t._withKeys={}),r=e.join(".");return n[r]||(n[r]=s=>{if(!("key"in s))return;const i=ur(s.key);if(e.some(a=>a===i||kv[a]===i))return t(s)})},Dv=Nt({patchProp:Sv},hv);let wh;function Nv(){return wh||(wh=Oy(Dv))}const xv=(...t)=>{const e=Nv().createApp(...t),{mount:n}=e;return e.mount=r=>{const s=Ov(r);if(!s)return;const i=e._component;!be(i)&&!i.render&&!i.template&&(i.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const a=n(s,!1,Vv(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),a},e};function Vv(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function Ov(t){return ot(t)?document.querySelector(t):t}/*!
 * pinia v3.0.3
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let pp;const ta=t=>pp=t,mp=Symbol();function _c(t){return t&&typeof t=="object"&&Object.prototype.toString.call(t)==="[object Object]"&&typeof t.toJSON!="function"}var Js;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(Js||(Js={}));function Mv(){const t=gf(!0),e=t.run(()=>Ne({}));let n=[],r=[];const s=tl({install(i){ta(s),s._a=i,i.provide(mp,s),i.config.globalProperties.$pinia=s,r.forEach(a=>n.push(a)),r=[]},use(i){return this._a?n.push(i):r.push(i),this},_p:n,_a:null,_e:t,_s:new Map,state:e});return s}const gp=()=>{};function Ah(t,e,n,r=gp){t.push(e);const s=()=>{const i=t.indexOf(e);i>-1&&(t.splice(i,1),r())};return!n&&_f()&&w_(s),s}function qr(t,...e){t.slice().forEach(n=>{n(...e)})}const Lv=t=>t(),bh=Symbol(),Wa=Symbol();function yc(t,e){t instanceof Map&&e instanceof Map?e.forEach((n,r)=>t.set(r,n)):t instanceof Set&&e instanceof Set&&e.forEach(t.add,t);for(const n in e){if(!e.hasOwnProperty(n))continue;const r=e[n],s=t[n];_c(s)&&_c(r)&&t.hasOwnProperty(n)&&!Ze(r)&&!Gn(r)?t[n]=yc(s,r):t[n]=r}return t}const Fv=Symbol();function Uv(t){return!_c(t)||!Object.prototype.hasOwnProperty.call(t,Fv)}const{assign:Un}=Object;function $v(t){return!!(Ze(t)&&t.effect)}function Bv(t,e,n,r){const{state:s,actions:i,getters:a}=e,c=n.state.value[t];let l;function h(){c||(n.state.value[t]=s?s():{});const f=G_(n.state.value[t]);return Un(f,i,Object.keys(a||{}).reduce((p,y)=>(p[y]=tl(Y(()=>{ta(n);const b=n._s.get(t);return a[y].call(b,b)})),p),{}))}return l=_p(t,h,e,n,r,!0),l}function _p(t,e,n={},r,s,i){let a;const c=Un({actions:{}},n),l={deep:!0};let h,f,p=[],y=[],b;const R=r.state.value[t];!i&&!R&&(r.state.value[t]={}),Ne({});let N;function x(g){let _;h=f=!1,typeof g=="function"?(g(r.state.value[t]),_={type:Js.patchFunction,storeId:t,events:b}):(yc(r.state.value[t],g),_={type:Js.patchObject,payload:g,storeId:t,events:b});const v=N=Symbol();nl().then(()=>{N===v&&(h=!0)}),f=!0,qr(p,_,r.state.value[t])}const j=i?function(){const{state:_}=n,v=_?_():{};this.$patch(I=>{Un(I,v)})}:gp;function W(){a.stop(),p=[],y=[],r._s.delete(t)}const K=(g,_="")=>{if(bh in g)return g[Wa]=_,g;const v=function(){ta(r);const I=Array.from(arguments),S=[],E=[];function Me(ie){S.push(ie)}function ze(ie){E.push(ie)}qr(y,{args:I,name:v[Wa],store:ce,after:Me,onError:ze});let Te;try{Te=g.apply(this&&this.$id===t?this:ce,I)}catch(ie){throw qr(E,ie),ie}return Te instanceof Promise?Te.then(ie=>(qr(S,ie),ie)).catch(ie=>(qr(E,ie),Promise.reject(ie))):(qr(S,Te),Te)};return v[bh]=!0,v[Wa]=_,v},z={_p:r,$id:t,$onAction:Ah.bind(null,y),$patch:x,$reset:j,$subscribe(g,_={}){const v=Ah(p,g,_.detached,()=>I()),I=a.run(()=>qt(()=>r.state.value[t],S=>{(_.flush==="sync"?f:h)&&g({storeId:t,type:Js.direct,events:b},S)},Un({},l,_)));return v},$dispose:W},ce=Qo(z);r._s.set(t,ce);const w=(r._a&&r._a.runWithContext||Lv)(()=>r._e.run(()=>(a=gf()).run(()=>e({action:K}))));for(const g in w){const _=w[g];if(Ze(_)&&!$v(_)||Gn(_))i||(R&&Uv(_)&&(Ze(_)?_.value=R[g]:yc(_,R[g])),r.state.value[t][g]=_);else if(typeof _=="function"){const v=K(_,g);w[g]=v,c.actions[g]=_}}return Un(ce,w),Un(Oe(ce),w),Object.defineProperty(ce,"$state",{get:()=>r.state.value[t],set:g=>{x(_=>{Un(_,g)})}}),r._p.forEach(g=>{Un(ce,a.run(()=>g({store:ce,app:r._a,pinia:r,options:c})))}),R&&i&&n.hydrate&&n.hydrate(ce.$state,R),h=!0,f=!0,ce}/*! #__NO_SIDE_EFFECTS__ */function na(t,e,n){let r;const s=typeof e=="function";r=s?n:e;function i(a,c){const l=Ry();return a=a||(l?Qs(mp,null):null),a&&ta(a),a=pp,a._s.has(t)||(s?_p(t,e,r,a):Bv(t,r,a)),a._s.get(t)}return i.$id=t,i}const jv=5625,Sh=jv/60,Sn=na("audio",{state:()=>({isPlaying:!1,absoluteCurrentTime:3600+.05,clipInfo:null,isMutedA:!1,isMutedB:!1}),actions:{async load(){try{const e=await(await fetch("A.json")).json();this.setClipInfo(e)}catch(t){console.error("Failed to load clip info:",t)}},setPlayingStatus(t){this.isPlaying=t},updateAbsoluteCurrentTime(t){this.absoluteCurrentTime=t},setClipInfo(t){this.clipInfo=t},setMutedA(t){this.isMutedA=t},setMutedB(t){this.isMutedB=t},reset(){this.isPlaying=!1,this.absoluteCurrentTime=0,this.clipInfo=null,this.isMutedA=!1,this.isMutedB=!1}},getters:{totalDuration:t=>!t.clipInfo||t.clipInfo.length===0?0:t.clipInfo.reduce((e,n)=>e+(n.length||0),0),currentPart:t=>{if(!t.clipInfo||t.clipInfo.length===0||t.absoluteCurrentTime<0)return 0;let e=0;for(let n=0;n<t.clipInfo.length;n++){const r=t.clipInfo[n].length||0;if(t.absoluteCurrentTime<e+r)return n;e+=r}return t.clipInfo.length-1},currentTime:t=>{if(!t.clipInfo||t.clipInfo.length===0)return 0;if(t.absoluteCurrentTime<0)return t.absoluteCurrentTime;const e=t.currentPart;let n=0;for(let r=0;r<e;r++)n+=t.clipInfo[r].length||0;return t.absoluteCurrentTime-n},timeInSpectrogram:t=>{const e=t.currentSpectrograms;if(e.length===0||t.duration===0)return 0;const n=t.currentSpectrogramIndex;let r=0;for(let s=0;s<n;s++)r+=e[s].width/Sh;return t.currentTime-r},duration:t=>{if(!t.clipInfo||t.clipInfo.length===0)return 0;const e=t.currentPart;return t.clipInfo[e]?.length||0},totalParts:t=>t.clipInfo?.length||0,partDurations:t=>t.clipInfo?t.clipInfo.map(e=>e.length||0):[],audioSrc:t=>{if(!t.clipInfo||t.clipInfo.length===0)return null;const e=t.currentPart;return e<0?null:t.clipInfo[e]?.url||null},hasNextPart:t=>t.currentPart<t.totalParts-1,getNextPart:t=>t.currentPart<t.totalParts-1?t.currentPart+1:null,currentPartInfo:t=>{if(!t.clipInfo||t.clipInfo.length===0)return null;const e=t.currentPart;return e<0?null:t.clipInfo[e]||null},currentSpectrograms:t=>t.currentPartInfo?.spect||[],currentSpectrogramIndex:t=>{const e=t.currentSpectrograms;if(e.length===0||t.duration===0)return 0;let n=0;for(let r=0;r<e.length;r++){const s=e[r].width/Sh;if(n+=s,t.currentTime<n)return r}return e.length-1},currentSpect:t=>{const e=t.currentSpectrograms,n=t.currentSpectrogramIndex,r=e[n];return r?{part:t.currentPart,index:n,url:r.url,width:r.width,filename:r.spect}:{part:null,index:null,url:null,width:0,filename:null}},previousSpect:t=>{const e=t.currentPart,n=t.currentSpectrogramIndex;if(n>0){const s=t.currentSpectrograms[n-1];return s?{part:e,index:n-1,url:s.url,width:s.width,filename:s.spect}:{part:null,index:null,url:null,width:0,filename:null}}if(e>0&&t.clipInfo){const s=t.clipInfo[e-1]?.spect||[];if(s.length>0){const i=s[s.length-1];return{part:e-1,index:s.length-1,url:i.url,width:i.width,filename:i.spect}}}return{part:null,index:null,url:null,width:0,filename:null}},nextSpect:t=>{const e=t.currentPart,n=t.currentSpectrogramIndex,r=t.currentSpectrograms;if(n<r.length-1){const s=r[n+1];return s?{part:e,index:n+1,url:s.url,width:s.width,filename:s.spect}:{part:null,index:null,url:null,width:0,filename:null}}if(e<t.totalParts-1&&t.clipInfo){const i=t.clipInfo[e+1]?.spect||[];if(i.length>0){const a=i[0];return{part:e+1,index:0,url:a.url,width:a.width,filename:a.spect}}}return{part:null,index:null,url:null,width:0,filename:null}}}}),qv=5625,Ch=qv/60,Rh=-847-.8,cl=na("audioB",{state:()=>({clipInfo:null}),actions:{async load(){try{const e=await(await fetch("B.json")).json();this.setClipInfo(e)}catch(t){console.error("Failed to load clip info:",t)}},updateAbsoluteCurrentTime(t){const e=Sn(),n=t-Rh;e.updateAbsoluteCurrentTime(n)},setClipInfo(t){this.clipInfo=t},reset(){this.clipInfo=null}},getters:{offsetAbsoluteTime:()=>Sn().absoluteCurrentTime+Rh,totalDuration:t=>!t.clipInfo||t.clipInfo.length===0?0:t.clipInfo.reduce((e,n)=>e+(n.length||0),0),currentPart:t=>{if(!t.clipInfo||t.clipInfo.length===0||t.offsetAbsoluteTime<0)return 0;let e=0;for(let n=0;n<t.clipInfo.length;n++){const r=t.clipInfo[n].length||0;if(t.offsetAbsoluteTime<e+r)return n;e+=r}return t.clipInfo.length-1},currentTime:t=>{if(!t.clipInfo||t.clipInfo.length===0)return 0;if(t.offsetAbsoluteTime<0)return t.offsetAbsoluteTime;const e=t.currentPart;let n=0;for(let r=0;r<e;r++)n+=t.clipInfo[r].length||0;return t.offsetAbsoluteTime-n},timeInSpectrogram:t=>{const e=t.currentSpectrograms;if(e.length===0||t.duration===0)return 0;const n=t.currentSpectrogramIndex;let r=0;for(let s=0;s<n;s++)r+=e[s].width/Ch;return t.currentTime-r},duration:t=>{if(!t.clipInfo||t.clipInfo.length===0)return 0;const e=t.currentPart;return t.clipInfo[e]?.length||0},totalParts:t=>t.clipInfo?.length||0,partDurations:t=>t.clipInfo?t.clipInfo.map(e=>e.length||0):[],audioSrc:t=>{if(!t.clipInfo||t.clipInfo.length===0)return null;const e=t.currentPart;return e<0?null:t.clipInfo[e]?.url||null},hasNextPart:t=>t.currentPart<t.totalParts-1,getNextPart:t=>t.currentPart<t.totalParts-1?t.currentPart+1:null,currentPartInfo:t=>{if(!t.clipInfo||t.clipInfo.length===0)return null;const e=t.currentPart;return e<0?null:t.clipInfo[e]||null},currentSpectrograms:t=>t.currentPartInfo?.spect||[],currentSpectrogramIndex:t=>{const e=t.currentSpectrograms;if(e.length===0||t.duration===0)return 0;let n=0;for(let r=0;r<e.length;r++){const s=e[r].width/Ch;if(n+=s,t.currentTime<n)return r}return e.length-1},currentSpect:t=>{const e=t.currentSpectrograms,n=t.currentSpectrogramIndex,r=e[n];return r?{part:t.currentPart,index:n,url:r.url,width:r.width,filename:r.spect}:{part:null,index:null,url:null,width:0,filename:null}},previousSpect:t=>{const e=t.currentPart,n=t.currentSpectrogramIndex;if(n>0){const s=t.currentSpectrograms[n-1];return s?{part:e,index:n-1,url:s.url,width:s.width,filename:s.spect}:{part:null,index:null,url:null,width:0,filename:null}}if(e>0&&t.clipInfo){const s=t.clipInfo[e-1]?.spect||[];if(s.length>0){const i=s[s.length-1];return{part:e-1,index:s.length-1,url:i.url,width:i.width,filename:i.spect}}}return{part:null,index:null,url:null,width:0,filename:null}},nextSpect:t=>{const e=t.currentPart,n=t.currentSpectrogramIndex,r=t.currentSpectrograms;if(n<r.length-1){const s=r[n+1];return s?{part:e,index:n+1,url:s.url,width:s.width,filename:s.spect}:{part:null,index:null,url:null,width:0,filename:null}}if(e<t.totalParts-1&&t.clipInfo){const i=t.clipInfo[e+1]?.spect||[];if(i.length>0){const a=i[0];return{part:e+1,index:0,url:a.url,width:a.width,filename:a.spect}}}return{part:null,index:null,url:null,width:0,filename:null}}}}),Nn=(t,e)=>{const n=t.__vccOpts||t;for(const[r,s]of e)n[r]=s;return n},Hv=["data-store-type"],zv=["src"],Wv=["src"],Gv=["src"],Kv={class:"time-axis"},Qv={key:0,class:"tick-label"},Xv={class:"frequency-axis"},Jv={class:"tick-label"},Yv=5625,Zv={__name:"Spectrogram",props:{storeType:{type:String,default:"A",validator:t=>["A","B"].includes(t)}},setup(t){const e=t,n=Sn(),r=cl(),s=Ne(null),i=Ne(null),a=Ne(0),c=Ne(0),l=Ne(!1),h=Y(()=>e.storeType==="B"?r:n),f=Y(()=>e.storeType==="B"?r.updateAbsoluteCurrentTime:n.updateAbsoluteCurrentTime),p=Y(()=>e.storeType==="B"?r.offsetAbsoluteTime:n.absoluteCurrentTime),y=Yv/60;Y(()=>h.value.currentTime);const b=Y(()=>n.isPlaying);Y(()=>h.value.currentPart);const R=()=>{s.value&&(a.value=s.value.offsetWidth)},N=Y(()=>{if(a.value===0)return 0;const _=h.value.timeInSpectrogram*y;return a.value/2-_-h.value.previousSpect.width}),x=(_,v=300,I=!0)=>{if(l.value)return;if(I){const ze=new CustomEvent("spectrogram-animate",{detail:{storeType:e.storeType,targetValue:_,duration:v}});window.dispatchEvent(ze)}l.value=!0;const S=c.value,E=performance.now(),Me=ze=>{const Te=ze-E,ie=Math.min(Te/v,1),me=ie<.5?2*ie*ie:1-Math.pow(-2*ie+2,2)/2;c.value=S+(_-S)*me,ie<1?requestAnimationFrame(Me):l.value=!1};requestAnimationFrame(Me)};qt(N,_=>{l.value||(c.value=_)},{immediate:!0});const j=Y(()=>{if(a.value===0)return[];const _=[];let v;if(l.value){a.value/2;const ie=(N.value-c.value)/y;v=n.absoluteCurrentTime+ie}else v=n.absoluteCurrentTime;const I=a.value/y,S=v-I/2,E=v+I/2,Me=Math.floor(Math.max(0,S)),ze=Math.ceil(E);for(let Te=Me;Te<=ze;Te++){const ie=Te-v,Ke=a.value/2+ie*y;Ke>=-100&&Ke<=a.value+100&&Te>=0&&_.push({time:Te,position:Ke,label:W(Te),showLabel:Te%5===4&&Te>0})}return _}),W=_=>{const v=new Date("2025-07-04T03:29:56.000Z"),I=new Date(v.getTime()+_*1e3),S=new Date(I.getTime()+480*60*1e3),E=S.getUTCHours().toString().padStart(2,"0"),Me=S.getUTCMinutes().toString().padStart(2,"0"),ze=S.getUTCSeconds().toString().padStart(2,"0");return`${E}:${Me}:${ze}`},K=_=>{const v=new Date("2025-07-04T03:29:56.000Z"),I=new Date(v.getTime()+_*1e3),S=new Date(I.getTime()+480*60*1e3),E=S.getUTCFullYear(),Me=(S.getUTCMonth()+1).toString().padStart(2,"0"),ze=S.getUTCDate().toString().padStart(2,"0"),Te=S.getUTCHours().toString().padStart(2,"0"),ie=S.getUTCMinutes().toString().padStart(2,"0"),me=S.getUTCSeconds().toString().padStart(2,"0"),Ke=S.getUTCMilliseconds().toString().padStart(3,"0");return`${E}-${Me}-${ze} ${Te}:${ie}:${me}.${Ke}`},z=Y(()=>h.value.previousSpect?[h.value.previousSpect.url,h.value.currentSpect.url,h.value.nextSpect.url]:[null,null,null]),ce=Y(()=>{const _=[0,.12890625,.2578125,.38671875,.515625,.64453125,.7734375,.90234375],v=[0,440,880,1396.30547306,2200.89762379,3469.11936096,5468.12764505,8619.02310976];return _.map((I,S)=>({position:I,frequency:v[S],label:Ie(v[S])}))}),Ie=_=>_===0?"0 Hz":_>=1e3?`${(_/1e3).toFixed(1)}k`:`${Math.round(_)}`,w=_=>{if(!s.value||h.value.duration===0||a.value===0)return;const v=s.value.getBoundingClientRect(),I=_.clientX-v.left,S=a.value/2,Me=(I-S)/y,Te=p.value+Me,ie=h.value.currentSpectrogramIndex,me=h.value.currentPart;f.value(Te);const Ke=h.value.currentSpectrogramIndex,ge=h.value.currentPart,V=ie!==Ke||me!==ge;!b.value&&!V&&x(N.value);const L=e.storeType==="B"?"spectrogramB-seek":"spectrogram-seek",P=new CustomEvent(L,{detail:{time:Te}});window.dispatchEvent(P)};qt(()=>h.value.audioSrc,()=>{s.value&&(s.value.scrollLeft=0)});const g=_=>{if(_.detail.storeType!==e.storeType){if(b.value)return;h.value.currentSpectrogramIndex,h.value.currentPart;const v=N.value;if(Math.abs(v-c.value)>y*30)return;x(v,_.detail.duration,!1)}};return ps(()=>{R(),window.addEventListener("resize",R),window.addEventListener("spectrogram-animate",g)}),Dr(()=>{window.removeEventListener("resize",R),window.removeEventListener("spectrogram-animate",g)}),(_,v)=>(re(),se("div",{class:"spectrogram-container",ref_key:"containerRef",ref:s,onClick:w,"data-store-type":t.storeType},[ue("div",{class:"spectrogram-wrapper",style:wn({marginLeft:`${c.value}px`})},[(re(),se("img",{src:z.value[0],alt:"",class:"spectrogram-image",key:z.value[0]},null,8,zv)),(re(),se("img",{src:z.value[1],alt:"",class:"spectrogram-image",ref_key:"imageRef",ref:i,key:z.value[1]},null,8,Wv)),(re(),se("img",{src:z.value[2],alt:"",class:"spectrogram-image",key:z.value[2]},null,8,Gv))],4),ue("div",Kv,[(re(!0),se(nt,null,Wt(j.value,I=>(re(),se("div",{key:I.time,class:"time-tick",style:wn({left:`${I.position}px`})},[v[0]||(v[0]=ue("div",{class:"tick-line"},null,-1)),I.showLabel?(re(),se("div",Qv,rt(I.label),1)):at("",!0)],4))),128))]),ue("div",Xv,[(re(!0),se(nt,null,Wt(ce.value,I=>(re(),se("div",{key:I.frequency,class:"frequency-tick",style:wn({bottom:`${I.position*100}%`})},[v[1]||(v[1]=ue("div",{class:"tick-line"},null,-1)),ue("div",Jv,rt(I.label),1)],4))),128))]),ue("div",{class:er(["current-time-label",{"bottom-position":t.storeType==="B"}])},rt(K(xf(n).absoluteCurrentTime)),3),v[2]||(v[2]=ue("div",{class:"playback-indicator"},null,-1))],8,Hv))}},Ph=Nn(Zv,[["__scopeId","data-v-7f7ea37d"]]),eT={class:"audio-player"},tT={class:"hydrophone-label"},nT=["src"],rT={__name:"AudioPlayer",props:{storeType:{type:String,default:"A",validator:t=>["A","B"].includes(t)}},setup(t){const e=t,n=Sn(),r=cl(),s=Ne(null),i=Ne(null),a=Ne(null),c=Ne(null),l=Ne(null),h=Ne(null),f=Y(()=>e.storeType==="B"?r:n),p=Y(()=>e.storeType==="B"?r.updateAbsoluteCurrentTime:n.updateAbsoluteCurrentTime),y=Y(()=>e.storeType==="B"?r.offsetAbsoluteTime:n.absoluteCurrentTime),b=Y(()=>n.isPlaying),R=Y(()=>f.value.audioSrc),N=Y(()=>f.value.currentPart),x=Y(()=>e.storeType==="A"?n.isMutedA:n.isMutedB),j=Y(()=>e.storeType==="A"?n.isMutedB:n.isMutedA),W=Y(()=>x.value!==j.value),K=Y(()=>x.value?"(M)":W.value?"(C)":e.storeType==="A"?"(L)":"(R)"),z=()=>{if(b.value){if(y.value>=0&&s.value&&R.value){const ge=v(N.value,s.value.currentTime);p.value(ge),s.value.paused&&s.value.play().catch(console.error)}else{const ge=y.value+.016666666666666666;p.value(ge),s.value&&!s.value.paused&&s.value.pause()}i.value=requestAnimationFrame(z)}},ce=()=>{i.value||(i.value=requestAnimationFrame(z))},Ie=()=>{i.value&&(cancelAnimationFrame(i.value),i.value=null)},w=()=>{if(l.value&&h.value){const ge=e.storeType==="A"?1:2;l.value.gain.value=x.value?0:ge,W.value?h.value.pan.value=0:h.value.pan.value=e.storeType==="A"?-.85:.85}},g=()=>{console.log("initWebAudio"),!a.value&&s.value&&(a.value=new(window.AudioContext||window.webkitAudioContext),c.value=a.value.createMediaElementSource(s.value),l.value=a.value.createGain(),h.value=a.value.createStereoPanner(),w(),c.value.connect(l.value),l.value.connect(h.value),h.value.connect(a.value.destination))},_=()=>{(e.storeType==="A"?n.setMutedA:n.setMutedB)(!x.value)},v=(ge,V)=>{let L=V;for(let P=0;P<ge;P++)L+=f.value.partDurations[P]||0;return L},I=()=>{console.log("Audio metadata loaded, duration:",s.value?.duration)},S=()=>{console.log("Audio can play, duration:",s.value?.duration),s.value&&f.value.currentTime>=0&&Math.abs(s.value.currentTime-f.value.currentTime)>.5&&(s.value.currentTime=f.value.currentTime)},E=ge=>{console.error("Audio loading error:",ge)},Me=()=>{if(s.value&&!b.value){const ge=v(N.value,s.value.currentTime);R.value?p.value(ge):console.log("audioSrc is null")}},ze=()=>{console.log("onPlay - audio element started"),g()},Te=()=>{console.log("onPause - audio element paused")},ie=()=>{if(Ie(),console.log("onEnded"),f.value.hasNextPart){const ge=f.value.getNextPart;let V=0;for(let L=0;L<ge;L++)V+=f.value.partDurations[L]||0;p.value(V)}};qt(()=>R.value,(ge,V)=>{if(console.log("audioSrc changed from",V,"to",ge),s.value&&ge){console.log("Loading new audio source:",ge),b.value,s.value.src=ge,s.value.load();const L=()=>{s.value.removeEventListener("canplay",L),f.value.currentTime>=0&&Math.abs(s.value.currentTime-f.value.currentTime)>.5&&(s.value.currentTime=f.value.currentTime,console.log("Audio source changed - synced time to:",f.value.currentTime))};s.value.addEventListener("canplay",L)}}),qt(()=>f.value.currentTime,ge=>{s.value&&ge>=0&&Math.abs(s.value.currentTime-ge)>.5&&(console.log(`Syncing audio element time to ${ge}`),s.value.currentTime=ge)}),qt(()=>b.value,ge=>{ge?(ce(),y.value>=0&&R.value&&s.value&&s.value.play().catch(console.error)):(Ie(),s.value&&s.value.pause())}),qt([()=>x.value,()=>j.value],()=>{w()}),ps(()=>{const ge=e.storeType==="B"?"spectrogramB-seek":"spectrogram-seek";window.addEventListener(ge,me),e.storeType==="A"&&window.addEventListener("minimap-seek",me),window.addEventListener("volume-change",Ke)}),Dr(()=>{Ie();const ge=e.storeType==="B"?"spectrogramB-seek":"spectrogram-seek";window.removeEventListener(ge,me),e.storeType==="A"&&window.removeEventListener("minimap-seek",me),window.removeEventListener("volume-change",Ke),a.value&&a.value.close().catch(console.error)});const me=ge=>{if(s.value){const V=ge.detail.time;console.log("handleSeek",V),p.value(V)}},Ke=ge=>{s.value&&(s.value.volume=ge.detail.volume)};return(ge,V)=>(re(),se("div",eT,[ue("div",{class:er(["floating-label",{"muted-channel":x.value}])},[ue("span",tT," Hydrophone "+rt(t.storeType),1),ue("button",{onClick:_,class:er(["mute-button",{muted:x.value}]),tabindex:"-1"},rt(x.value?"🔇":"🔊"),3),lp(" "+rt(K.value),1)],2),(re(),se("audio",{ref_key:"audioElement",ref:s,key:`audioElement${t.storeType}`,src:R.value,onLoadedmetadata:I,onCanplay:S,onTimeupdate:Me,onPlay:ze,onPause:Te,onEnded:ie,onError:E,crossorigin:"anonymous",preload:"metadata"},null,40,nT))]))}},kh=Nn(rT,[["__scopeId","data-v-816ead38"]]),sT=()=>{};var Dh={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yp=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},iT=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],a=t[n++],c=t[n++],l=((s&7)<<18|(i&63)<<12|(a&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const i=t[n++],a=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},vp={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],a=s+1<t.length,c=a?t[s+1]:0,l=s+2<t.length,h=l?t[s+2]:0,f=i>>2,p=(i&3)<<4|c>>4;let y=(c&15)<<2|h>>6,b=h&63;l||(b=64,a||(y=64)),r.push(n[f],n[p],n[y],n[b])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(yp(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):iT(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],c=s<t.length?n[t.charAt(s)]:0;++s;const h=s<t.length?n[t.charAt(s)]:64;++s;const p=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||c==null||h==null||p==null)throw new oT;const y=i<<2|c>>4;if(r.push(y),h!==64){const b=c<<4&240|h>>2;if(r.push(b),p!==64){const R=h<<6&192|p;r.push(R)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class oT extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const aT=function(t){const e=yp(t);return vp.encodeByteArray(e,!0)},bo=function(t){return aT(t).replace(/\./g,"")},Tp=function(t){try{return vp.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cT(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lT=()=>cT().__FIREBASE_DEFAULTS__,uT=()=>{if(typeof process>"u"||typeof Dh>"u")return;const t=Dh.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},hT=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Tp(t[1]);return e&&JSON.parse(e)},ra=()=>{try{return sT()||lT()||uT()||hT()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Ep=t=>ra()?.emulatorHosts?.[t],dT=t=>{const e=Ep(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},Ip=()=>ra()?.config,wp=t=>ra()?.[`_${t}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fT{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ms(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Ap(t){return(await fetch(t,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pT(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",s=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...t};return[bo(JSON.stringify(n)),bo(JSON.stringify(a)),""].join(".")}const Ys={};function mT(){const t={prod:[],emulator:[]};for(const e of Object.keys(Ys))Ys[e]?t.emulator.push(e):t.prod.push(e);return t}function gT(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let Nh=!1;function bp(t,e){if(typeof window>"u"||typeof document>"u"||!ms(window.location.host)||Ys[t]===e||Ys[t]||Nh)return;Ys[t]=e;function n(y){return`__firebase__banner__${y}`}const r="__firebase__banner",i=mT().prod.length>0;function a(){const y=document.getElementById(r);y&&y.remove()}function c(y){y.style.display="flex",y.style.background="#7faaf0",y.style.position="fixed",y.style.bottom="5px",y.style.left="5px",y.style.padding=".5em",y.style.borderRadius="5px",y.style.alignItems="center"}function l(y,b){y.setAttribute("width","24"),y.setAttribute("id",b),y.setAttribute("height","24"),y.setAttribute("viewBox","0 0 24 24"),y.setAttribute("fill","none"),y.style.marginLeft="-6px"}function h(){const y=document.createElement("span");return y.style.cursor="pointer",y.style.marginLeft="16px",y.style.fontSize="24px",y.innerHTML=" &times;",y.onclick=()=>{Nh=!0,a()},y}function f(y,b){y.setAttribute("id",b),y.innerText="Learn more",y.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",y.setAttribute("target","__blank"),y.style.paddingLeft="5px",y.style.textDecoration="underline"}function p(){const y=gT(r),b=n("text"),R=document.getElementById(b)||document.createElement("span"),N=n("learnmore"),x=document.getElementById(N)||document.createElement("a"),j=n("preprendIcon"),W=document.getElementById(j)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(y.created){const K=y.element;c(K),f(x,N);const z=h();l(W,j),K.append(W,R,x,z),document.body.appendChild(K)}i?(R.innerText="Preview backend disconnected.",W.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(W.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,R.innerText="Preview backend running in this workspace."),R.setAttribute("id",b)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",p):p()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ct(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function _T(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ct())}function yT(){const t=ra()?.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function vT(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function TT(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function ET(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function IT(){const t=Ct();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function wT(){return!yT()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function AT(){try{return typeof indexedDB=="object"}catch{return!1}}function bT(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ST="FirebaseError";class xn extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=ST,Object.setPrototypeOf(this,xn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ei.prototype.create)}}class Ei{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?CT(i,r):"Error",c=`${this.serviceName}: ${a} (${s}).`;return new xn(s,c,r)}}function CT(t,e){return t.replace(RT,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const RT=/\{\$([^}]+)}/g;function PT(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Sr(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],a=e[s];if(xh(i)&&xh(a)){if(!Sr(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function xh(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ii(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function kT(t,e){const n=new DT(t,e);return n.subscribe.bind(n)}class DT{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");NT(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=Ga),s.error===void 0&&(s.error=Ga),s.complete===void 0&&(s.complete=Ga);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function NT(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Ga(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xt(t){return t&&t._delegate?t._delegate:t}class Cr{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yr="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xT{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new fT;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(OT(e))try{this.getOrInitializeService({instanceIdentifier:yr})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=yr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=yr){return this.instances.has(e)}getOptions(e=yr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&a.resolve(s)}return s}onInit(e,n){const r=this.normalizeInstanceIdentifier(n),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:VT(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=yr){return this.component?this.component.multipleInstances?e:yr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function VT(t){return t===yr?void 0:t}function OT(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MT{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new xT(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ce;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(Ce||(Ce={}));const LT={debug:Ce.DEBUG,verbose:Ce.VERBOSE,info:Ce.INFO,warn:Ce.WARN,error:Ce.ERROR,silent:Ce.SILENT},FT=Ce.INFO,UT={[Ce.DEBUG]:"log",[Ce.VERBOSE]:"log",[Ce.INFO]:"info",[Ce.WARN]:"warn",[Ce.ERROR]:"error"},$T=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=UT[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ll{constructor(e){this.name=e,this._logLevel=FT,this._logHandler=$T,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Ce))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?LT[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Ce.DEBUG,...e),this._logHandler(this,Ce.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Ce.VERBOSE,...e),this._logHandler(this,Ce.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Ce.INFO,...e),this._logHandler(this,Ce.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Ce.WARN,...e),this._logHandler(this,Ce.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Ce.ERROR,...e),this._logHandler(this,Ce.ERROR,...e)}}const BT=(t,e)=>e.some(n=>t instanceof n);let Vh,Oh;function jT(){return Vh||(Vh=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function qT(){return Oh||(Oh=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Sp=new WeakMap,vc=new WeakMap,Cp=new WeakMap,Ka=new WeakMap,ul=new WeakMap;function HT(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",a)},i=()=>{n(Kn(t.result)),s()},a=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",a)});return e.then(n=>{n instanceof IDBCursor&&Sp.set(n,t)}).catch(()=>{}),ul.set(e,t),e}function zT(t){if(vc.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",a),t.removeEventListener("abort",a)},i=()=>{n(),s()},a=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",a),t.addEventListener("abort",a)});vc.set(t,e)}let Tc={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return vc.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Cp.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Kn(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function WT(t){Tc=t(Tc)}function GT(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(Qa(this),e,...n);return Cp.set(r,e.sort?e.sort():[e]),Kn(r)}:qT().includes(t)?function(...e){return t.apply(Qa(this),e),Kn(Sp.get(this))}:function(...e){return Kn(t.apply(Qa(this),e))}}function KT(t){return typeof t=="function"?GT(t):(t instanceof IDBTransaction&&zT(t),BT(t,jT())?new Proxy(t,Tc):t)}function Kn(t){if(t instanceof IDBRequest)return HT(t);if(Ka.has(t))return Ka.get(t);const e=KT(t);return e!==t&&(Ka.set(t,e),ul.set(e,t)),e}const Qa=t=>ul.get(t);function QT(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(t,e),c=Kn(a);return r&&a.addEventListener("upgradeneeded",l=>{r(Kn(a.result),l.oldVersion,l.newVersion,Kn(a.transaction),l)}),n&&a.addEventListener("blocked",l=>n(l.oldVersion,l.newVersion,l)),c.then(l=>{i&&l.addEventListener("close",()=>i()),s&&l.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const XT=["get","getKey","getAll","getAllKeys","count"],JT=["put","add","delete","clear"],Xa=new Map;function Mh(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Xa.get(e))return Xa.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=JT.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||XT.includes(n)))return;const i=async function(a,...c){const l=this.transaction(a,s?"readwrite":"readonly");let h=l.store;return r&&(h=h.index(c.shift())),(await Promise.all([h[n](...c),s&&l.done]))[0]};return Xa.set(e,i),i}WT(t=>({...t,get:(e,n,r)=>Mh(e,n)||t.get(e,n,r),has:(e,n)=>!!Mh(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YT{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(ZT(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function ZT(t){return t.getComponent()?.type==="VERSION"}const Ec="@firebase/app",Lh="0.14.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cn=new ll("@firebase/app"),eE="@firebase/app-compat",tE="@firebase/analytics-compat",nE="@firebase/analytics",rE="@firebase/app-check-compat",sE="@firebase/app-check",iE="@firebase/auth",oE="@firebase/auth-compat",aE="@firebase/database",cE="@firebase/data-connect",lE="@firebase/database-compat",uE="@firebase/functions",hE="@firebase/functions-compat",dE="@firebase/installations",fE="@firebase/installations-compat",pE="@firebase/messaging",mE="@firebase/messaging-compat",gE="@firebase/performance",_E="@firebase/performance-compat",yE="@firebase/remote-config",vE="@firebase/remote-config-compat",TE="@firebase/storage",EE="@firebase/storage-compat",IE="@firebase/firestore",wE="@firebase/ai",AE="@firebase/firestore-compat",bE="firebase",SE="12.0.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ic="[DEFAULT]",CE={[Ec]:"fire-core",[eE]:"fire-core-compat",[nE]:"fire-analytics",[tE]:"fire-analytics-compat",[sE]:"fire-app-check",[rE]:"fire-app-check-compat",[iE]:"fire-auth",[oE]:"fire-auth-compat",[aE]:"fire-rtdb",[cE]:"fire-data-connect",[lE]:"fire-rtdb-compat",[uE]:"fire-fn",[hE]:"fire-fn-compat",[dE]:"fire-iid",[fE]:"fire-iid-compat",[pE]:"fire-fcm",[mE]:"fire-fcm-compat",[gE]:"fire-perf",[_E]:"fire-perf-compat",[yE]:"fire-rc",[vE]:"fire-rc-compat",[TE]:"fire-gcs",[EE]:"fire-gcs-compat",[IE]:"fire-fst",[AE]:"fire-fst-compat",[wE]:"fire-vertex","fire-js":"fire-js",[bE]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const So=new Map,RE=new Map,wc=new Map;function Fh(t,e){try{t.container.addComponent(e)}catch(n){Cn.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function os(t){const e=t.name;if(wc.has(e))return Cn.debug(`There were multiple attempts to register component ${e}.`),!1;wc.set(e,t);for(const n of So.values())Fh(n,t);for(const n of RE.values())Fh(n,t);return!0}function hl(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Gt(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PE={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Qn=new Ei("app","Firebase",PE);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kE{constructor(e,n,r){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Cr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Qn.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gs=SE;function Rp(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r={name:Ic,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw Qn.create("bad-app-name",{appName:String(s)});if(n||(n=Ip()),!n)throw Qn.create("no-options");const i=So.get(s);if(i){if(Sr(n,i.options)&&Sr(r,i.config))return i;throw Qn.create("duplicate-app",{appName:s})}const a=new MT(s);for(const l of wc.values())a.addComponent(l);const c=new kE(n,r,a);return So.set(s,c),c}function Pp(t=Ic){const e=So.get(t);if(!e&&t===Ic&&Ip())return Rp();if(!e)throw Qn.create("no-app",{appName:t});return e}function Xn(t,e,n){let r=CE[t]??t;n&&(r+=`-${n}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const a=[`Unable to register library "${r}" with version "${e}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&a.push("and"),i&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Cn.warn(a.join(" "));return}os(new Cr(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DE="firebase-heartbeat-database",NE=1,li="firebase-heartbeat-store";let Ja=null;function kp(){return Ja||(Ja=QT(DE,NE,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(li)}catch(n){console.warn(n)}}}}).catch(t=>{throw Qn.create("idb-open",{originalErrorMessage:t.message})})),Ja}async function xE(t){try{const n=(await kp()).transaction(li),r=await n.objectStore(li).get(Dp(t));return await n.done,r}catch(e){if(e instanceof xn)Cn.warn(e.message);else{const n=Qn.create("idb-get",{originalErrorMessage:e?.message});Cn.warn(n.message)}}}async function Uh(t,e){try{const r=(await kp()).transaction(li,"readwrite");await r.objectStore(li).put(e,Dp(t)),await r.done}catch(n){if(n instanceof xn)Cn.warn(n.message);else{const r=Qn.create("idb-set",{originalErrorMessage:n?.message});Cn.warn(r.message)}}}function Dp(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VE=1024,OE=30;class ME{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new FE(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=$h();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats.length>OE){const s=UE(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Cn.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=$h(),{heartbeatsToSend:n,unsentEntries:r}=LE(this._heartbeatsCache.heartbeats),s=bo(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return Cn.warn(e),""}}}function $h(){return new Date().toISOString().substring(0,10)}function LE(t,e=VE){const n=[];let r=t.slice();for(const s of t){const i=n.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),Bh(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),Bh(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class FE{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return AT()?bT().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await xE(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Uh(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Uh(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Bh(t){return bo(JSON.stringify({version:2,heartbeats:t})).length}function UE(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let r=1;r<t.length;r++)t[r].date<n&&(n=t[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $E(t){os(new Cr("platform-logger",e=>new YT(e),"PRIVATE")),os(new Cr("heartbeat",e=>new ME(e),"PRIVATE")),Xn(Ec,Lh,t),Xn(Ec,Lh,"esm2020"),Xn("fire-js","")}$E("");var jh=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Jn,Np;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(w,g){function _(){}_.prototype=g.prototype,w.D=g.prototype,w.prototype=new _,w.prototype.constructor=w,w.C=function(v,I,S){for(var E=Array(arguments.length-2),Me=2;Me<arguments.length;Me++)E[Me-2]=arguments[Me];return g.prototype[I].apply(v,E)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(w,g,_){_||(_=0);var v=Array(16);if(typeof g=="string")for(var I=0;16>I;++I)v[I]=g.charCodeAt(_++)|g.charCodeAt(_++)<<8|g.charCodeAt(_++)<<16|g.charCodeAt(_++)<<24;else for(I=0;16>I;++I)v[I]=g[_++]|g[_++]<<8|g[_++]<<16|g[_++]<<24;g=w.g[0],_=w.g[1],I=w.g[2];var S=w.g[3],E=g+(S^_&(I^S))+v[0]+3614090360&4294967295;g=_+(E<<7&4294967295|E>>>25),E=S+(I^g&(_^I))+v[1]+3905402710&4294967295,S=g+(E<<12&4294967295|E>>>20),E=I+(_^S&(g^_))+v[2]+606105819&4294967295,I=S+(E<<17&4294967295|E>>>15),E=_+(g^I&(S^g))+v[3]+3250441966&4294967295,_=I+(E<<22&4294967295|E>>>10),E=g+(S^_&(I^S))+v[4]+4118548399&4294967295,g=_+(E<<7&4294967295|E>>>25),E=S+(I^g&(_^I))+v[5]+1200080426&4294967295,S=g+(E<<12&4294967295|E>>>20),E=I+(_^S&(g^_))+v[6]+2821735955&4294967295,I=S+(E<<17&4294967295|E>>>15),E=_+(g^I&(S^g))+v[7]+4249261313&4294967295,_=I+(E<<22&4294967295|E>>>10),E=g+(S^_&(I^S))+v[8]+1770035416&4294967295,g=_+(E<<7&4294967295|E>>>25),E=S+(I^g&(_^I))+v[9]+2336552879&4294967295,S=g+(E<<12&4294967295|E>>>20),E=I+(_^S&(g^_))+v[10]+4294925233&4294967295,I=S+(E<<17&4294967295|E>>>15),E=_+(g^I&(S^g))+v[11]+2304563134&4294967295,_=I+(E<<22&4294967295|E>>>10),E=g+(S^_&(I^S))+v[12]+1804603682&4294967295,g=_+(E<<7&4294967295|E>>>25),E=S+(I^g&(_^I))+v[13]+4254626195&4294967295,S=g+(E<<12&4294967295|E>>>20),E=I+(_^S&(g^_))+v[14]+2792965006&4294967295,I=S+(E<<17&4294967295|E>>>15),E=_+(g^I&(S^g))+v[15]+1236535329&4294967295,_=I+(E<<22&4294967295|E>>>10),E=g+(I^S&(_^I))+v[1]+4129170786&4294967295,g=_+(E<<5&4294967295|E>>>27),E=S+(_^I&(g^_))+v[6]+3225465664&4294967295,S=g+(E<<9&4294967295|E>>>23),E=I+(g^_&(S^g))+v[11]+643717713&4294967295,I=S+(E<<14&4294967295|E>>>18),E=_+(S^g&(I^S))+v[0]+3921069994&4294967295,_=I+(E<<20&4294967295|E>>>12),E=g+(I^S&(_^I))+v[5]+3593408605&4294967295,g=_+(E<<5&4294967295|E>>>27),E=S+(_^I&(g^_))+v[10]+38016083&4294967295,S=g+(E<<9&4294967295|E>>>23),E=I+(g^_&(S^g))+v[15]+3634488961&4294967295,I=S+(E<<14&4294967295|E>>>18),E=_+(S^g&(I^S))+v[4]+3889429448&4294967295,_=I+(E<<20&4294967295|E>>>12),E=g+(I^S&(_^I))+v[9]+568446438&4294967295,g=_+(E<<5&4294967295|E>>>27),E=S+(_^I&(g^_))+v[14]+3275163606&4294967295,S=g+(E<<9&4294967295|E>>>23),E=I+(g^_&(S^g))+v[3]+4107603335&4294967295,I=S+(E<<14&4294967295|E>>>18),E=_+(S^g&(I^S))+v[8]+1163531501&4294967295,_=I+(E<<20&4294967295|E>>>12),E=g+(I^S&(_^I))+v[13]+2850285829&4294967295,g=_+(E<<5&4294967295|E>>>27),E=S+(_^I&(g^_))+v[2]+4243563512&4294967295,S=g+(E<<9&4294967295|E>>>23),E=I+(g^_&(S^g))+v[7]+1735328473&4294967295,I=S+(E<<14&4294967295|E>>>18),E=_+(S^g&(I^S))+v[12]+2368359562&4294967295,_=I+(E<<20&4294967295|E>>>12),E=g+(_^I^S)+v[5]+4294588738&4294967295,g=_+(E<<4&4294967295|E>>>28),E=S+(g^_^I)+v[8]+2272392833&4294967295,S=g+(E<<11&4294967295|E>>>21),E=I+(S^g^_)+v[11]+1839030562&4294967295,I=S+(E<<16&4294967295|E>>>16),E=_+(I^S^g)+v[14]+4259657740&4294967295,_=I+(E<<23&4294967295|E>>>9),E=g+(_^I^S)+v[1]+2763975236&4294967295,g=_+(E<<4&4294967295|E>>>28),E=S+(g^_^I)+v[4]+1272893353&4294967295,S=g+(E<<11&4294967295|E>>>21),E=I+(S^g^_)+v[7]+4139469664&4294967295,I=S+(E<<16&4294967295|E>>>16),E=_+(I^S^g)+v[10]+3200236656&4294967295,_=I+(E<<23&4294967295|E>>>9),E=g+(_^I^S)+v[13]+681279174&4294967295,g=_+(E<<4&4294967295|E>>>28),E=S+(g^_^I)+v[0]+3936430074&4294967295,S=g+(E<<11&4294967295|E>>>21),E=I+(S^g^_)+v[3]+3572445317&4294967295,I=S+(E<<16&4294967295|E>>>16),E=_+(I^S^g)+v[6]+76029189&4294967295,_=I+(E<<23&4294967295|E>>>9),E=g+(_^I^S)+v[9]+3654602809&4294967295,g=_+(E<<4&4294967295|E>>>28),E=S+(g^_^I)+v[12]+3873151461&4294967295,S=g+(E<<11&4294967295|E>>>21),E=I+(S^g^_)+v[15]+530742520&4294967295,I=S+(E<<16&4294967295|E>>>16),E=_+(I^S^g)+v[2]+3299628645&4294967295,_=I+(E<<23&4294967295|E>>>9),E=g+(I^(_|~S))+v[0]+4096336452&4294967295,g=_+(E<<6&4294967295|E>>>26),E=S+(_^(g|~I))+v[7]+1126891415&4294967295,S=g+(E<<10&4294967295|E>>>22),E=I+(g^(S|~_))+v[14]+2878612391&4294967295,I=S+(E<<15&4294967295|E>>>17),E=_+(S^(I|~g))+v[5]+4237533241&4294967295,_=I+(E<<21&4294967295|E>>>11),E=g+(I^(_|~S))+v[12]+1700485571&4294967295,g=_+(E<<6&4294967295|E>>>26),E=S+(_^(g|~I))+v[3]+2399980690&4294967295,S=g+(E<<10&4294967295|E>>>22),E=I+(g^(S|~_))+v[10]+4293915773&4294967295,I=S+(E<<15&4294967295|E>>>17),E=_+(S^(I|~g))+v[1]+2240044497&4294967295,_=I+(E<<21&4294967295|E>>>11),E=g+(I^(_|~S))+v[8]+1873313359&4294967295,g=_+(E<<6&4294967295|E>>>26),E=S+(_^(g|~I))+v[15]+4264355552&4294967295,S=g+(E<<10&4294967295|E>>>22),E=I+(g^(S|~_))+v[6]+2734768916&4294967295,I=S+(E<<15&4294967295|E>>>17),E=_+(S^(I|~g))+v[13]+1309151649&4294967295,_=I+(E<<21&4294967295|E>>>11),E=g+(I^(_|~S))+v[4]+4149444226&4294967295,g=_+(E<<6&4294967295|E>>>26),E=S+(_^(g|~I))+v[11]+3174756917&4294967295,S=g+(E<<10&4294967295|E>>>22),E=I+(g^(S|~_))+v[2]+718787259&4294967295,I=S+(E<<15&4294967295|E>>>17),E=_+(S^(I|~g))+v[9]+3951481745&4294967295,w.g[0]=w.g[0]+g&4294967295,w.g[1]=w.g[1]+(I+(E<<21&4294967295|E>>>11))&4294967295,w.g[2]=w.g[2]+I&4294967295,w.g[3]=w.g[3]+S&4294967295}r.prototype.u=function(w,g){g===void 0&&(g=w.length);for(var _=g-this.blockSize,v=this.B,I=this.h,S=0;S<g;){if(I==0)for(;S<=_;)s(this,w,S),S+=this.blockSize;if(typeof w=="string"){for(;S<g;)if(v[I++]=w.charCodeAt(S++),I==this.blockSize){s(this,v),I=0;break}}else for(;S<g;)if(v[I++]=w[S++],I==this.blockSize){s(this,v),I=0;break}}this.h=I,this.o+=g},r.prototype.v=function(){var w=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);w[0]=128;for(var g=1;g<w.length-8;++g)w[g]=0;var _=8*this.o;for(g=w.length-8;g<w.length;++g)w[g]=_&255,_/=256;for(this.u(w),w=Array(16),g=_=0;4>g;++g)for(var v=0;32>v;v+=8)w[_++]=this.g[g]>>>v&255;return w};function i(w,g){var _=c;return Object.prototype.hasOwnProperty.call(_,w)?_[w]:_[w]=g(w)}function a(w,g){this.h=g;for(var _=[],v=!0,I=w.length-1;0<=I;I--){var S=w[I]|0;v&&S==g||(_[I]=S,v=!1)}this.g=_}var c={};function l(w){return-128<=w&&128>w?i(w,function(g){return new a([g|0],0>g?-1:0)}):new a([w|0],0>w?-1:0)}function h(w){if(isNaN(w)||!isFinite(w))return p;if(0>w)return x(h(-w));for(var g=[],_=1,v=0;w>=_;v++)g[v]=w/_|0,_*=4294967296;return new a(g,0)}function f(w,g){if(w.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(w.charAt(0)=="-")return x(f(w.substring(1),g));if(0<=w.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=h(Math.pow(g,8)),v=p,I=0;I<w.length;I+=8){var S=Math.min(8,w.length-I),E=parseInt(w.substring(I,I+S),g);8>S?(S=h(Math.pow(g,S)),v=v.j(S).add(h(E))):(v=v.j(_),v=v.add(h(E)))}return v}var p=l(0),y=l(1),b=l(16777216);t=a.prototype,t.m=function(){if(N(this))return-x(this).m();for(var w=0,g=1,_=0;_<this.g.length;_++){var v=this.i(_);w+=(0<=v?v:4294967296+v)*g,g*=4294967296}return w},t.toString=function(w){if(w=w||10,2>w||36<w)throw Error("radix out of range: "+w);if(R(this))return"0";if(N(this))return"-"+x(this).toString(w);for(var g=h(Math.pow(w,6)),_=this,v="";;){var I=z(_,g).g;_=j(_,I.j(g));var S=((0<_.g.length?_.g[0]:_.h)>>>0).toString(w);if(_=I,R(_))return S+v;for(;6>S.length;)S="0"+S;v=S+v}},t.i=function(w){return 0>w?0:w<this.g.length?this.g[w]:this.h};function R(w){if(w.h!=0)return!1;for(var g=0;g<w.g.length;g++)if(w.g[g]!=0)return!1;return!0}function N(w){return w.h==-1}t.l=function(w){return w=j(this,w),N(w)?-1:R(w)?0:1};function x(w){for(var g=w.g.length,_=[],v=0;v<g;v++)_[v]=~w.g[v];return new a(_,~w.h).add(y)}t.abs=function(){return N(this)?x(this):this},t.add=function(w){for(var g=Math.max(this.g.length,w.g.length),_=[],v=0,I=0;I<=g;I++){var S=v+(this.i(I)&65535)+(w.i(I)&65535),E=(S>>>16)+(this.i(I)>>>16)+(w.i(I)>>>16);v=E>>>16,S&=65535,E&=65535,_[I]=E<<16|S}return new a(_,_[_.length-1]&-2147483648?-1:0)};function j(w,g){return w.add(x(g))}t.j=function(w){if(R(this)||R(w))return p;if(N(this))return N(w)?x(this).j(x(w)):x(x(this).j(w));if(N(w))return x(this.j(x(w)));if(0>this.l(b)&&0>w.l(b))return h(this.m()*w.m());for(var g=this.g.length+w.g.length,_=[],v=0;v<2*g;v++)_[v]=0;for(v=0;v<this.g.length;v++)for(var I=0;I<w.g.length;I++){var S=this.i(v)>>>16,E=this.i(v)&65535,Me=w.i(I)>>>16,ze=w.i(I)&65535;_[2*v+2*I]+=E*ze,W(_,2*v+2*I),_[2*v+2*I+1]+=S*ze,W(_,2*v+2*I+1),_[2*v+2*I+1]+=E*Me,W(_,2*v+2*I+1),_[2*v+2*I+2]+=S*Me,W(_,2*v+2*I+2)}for(v=0;v<g;v++)_[v]=_[2*v+1]<<16|_[2*v];for(v=g;v<2*g;v++)_[v]=0;return new a(_,0)};function W(w,g){for(;(w[g]&65535)!=w[g];)w[g+1]+=w[g]>>>16,w[g]&=65535,g++}function K(w,g){this.g=w,this.h=g}function z(w,g){if(R(g))throw Error("division by zero");if(R(w))return new K(p,p);if(N(w))return g=z(x(w),g),new K(x(g.g),x(g.h));if(N(g))return g=z(w,x(g)),new K(x(g.g),g.h);if(30<w.g.length){if(N(w)||N(g))throw Error("slowDivide_ only works with positive integers.");for(var _=y,v=g;0>=v.l(w);)_=ce(_),v=ce(v);var I=Ie(_,1),S=Ie(v,1);for(v=Ie(v,2),_=Ie(_,2);!R(v);){var E=S.add(v);0>=E.l(w)&&(I=I.add(_),S=E),v=Ie(v,1),_=Ie(_,1)}return g=j(w,I.j(g)),new K(I,g)}for(I=p;0<=w.l(g);){for(_=Math.max(1,Math.floor(w.m()/g.m())),v=Math.ceil(Math.log(_)/Math.LN2),v=48>=v?1:Math.pow(2,v-48),S=h(_),E=S.j(g);N(E)||0<E.l(w);)_-=v,S=h(_),E=S.j(g);R(S)&&(S=y),I=I.add(S),w=j(w,E)}return new K(I,w)}t.A=function(w){return z(this,w).h},t.and=function(w){for(var g=Math.max(this.g.length,w.g.length),_=[],v=0;v<g;v++)_[v]=this.i(v)&w.i(v);return new a(_,this.h&w.h)},t.or=function(w){for(var g=Math.max(this.g.length,w.g.length),_=[],v=0;v<g;v++)_[v]=this.i(v)|w.i(v);return new a(_,this.h|w.h)},t.xor=function(w){for(var g=Math.max(this.g.length,w.g.length),_=[],v=0;v<g;v++)_[v]=this.i(v)^w.i(v);return new a(_,this.h^w.h)};function ce(w){for(var g=w.g.length+1,_=[],v=0;v<g;v++)_[v]=w.i(v)<<1|w.i(v-1)>>>31;return new a(_,w.h)}function Ie(w,g){var _=g>>5;g%=32;for(var v=w.g.length-_,I=[],S=0;S<v;S++)I[S]=0<g?w.i(S+_)>>>g|w.i(S+_+1)<<32-g:w.i(S+_);return new a(I,w.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Np=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=h,a.fromString=f,Jn=a}).apply(typeof jh<"u"?jh:typeof self<"u"?self:typeof window<"u"?window:{});var Ji=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var xp,Us,Vp,ao,Ac,Op,Mp,Lp;(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,u,d){return o==Array.prototype||o==Object.prototype||(o[u]=d.value),o};function n(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ji=="object"&&Ji];for(var u=0;u<o.length;++u){var d=o[u];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=n(this);function s(o,u){if(u)e:{var d=r;o=o.split(".");for(var m=0;m<o.length-1;m++){var C=o[m];if(!(C in d))break e;d=d[C]}o=o[o.length-1],m=d[o],u=u(m),u!=m&&u!=null&&e(d,o,{configurable:!0,writable:!0,value:u})}}function i(o,u){o instanceof String&&(o+="");var d=0,m=!1,C={next:function(){if(!m&&d<o.length){var k=d++;return{value:u(k,o[k]),done:!1}}return m=!0,{done:!0,value:void 0}}};return C[Symbol.iterator]=function(){return C},C}s("Array.prototype.values",function(o){return o||function(){return i(this,function(u,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},c=this||self;function l(o){var u=typeof o;return u=u!="object"?u:o?Array.isArray(o)?"array":u:"null",u=="array"||u=="object"&&typeof o.length=="number"}function h(o){var u=typeof o;return u=="object"&&o!=null||u=="function"}function f(o,u,d){return o.call.apply(o.bind,arguments)}function p(o,u,d){if(!o)throw Error();if(2<arguments.length){var m=Array.prototype.slice.call(arguments,2);return function(){var C=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(C,m),o.apply(u,C)}}return function(){return o.apply(u,arguments)}}function y(o,u,d){return y=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:p,y.apply(null,arguments)}function b(o,u){var d=Array.prototype.slice.call(arguments,1);return function(){var m=d.slice();return m.push.apply(m,arguments),o.apply(this,m)}}function R(o,u){function d(){}d.prototype=u.prototype,o.aa=u.prototype,o.prototype=new d,o.prototype.constructor=o,o.Qb=function(m,C,k){for(var Q=Array(arguments.length-2),$e=2;$e<arguments.length;$e++)Q[$e-2]=arguments[$e];return u.prototype[C].apply(m,Q)}}function N(o){const u=o.length;if(0<u){const d=Array(u);for(let m=0;m<u;m++)d[m]=o[m];return d}return[]}function x(o,u){for(let d=1;d<arguments.length;d++){const m=arguments[d];if(l(m)){const C=o.length||0,k=m.length||0;o.length=C+k;for(let Q=0;Q<k;Q++)o[C+Q]=m[Q]}else o.push(m)}}class j{constructor(u,d){this.i=u,this.j=d,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function W(o){return/^[\s\xa0]*$/.test(o)}function K(){var o=c.navigator;return o&&(o=o.userAgent)?o:""}function z(o){return z[" "](o),o}z[" "]=function(){};var ce=K().indexOf("Gecko")!=-1&&!(K().toLowerCase().indexOf("webkit")!=-1&&K().indexOf("Edge")==-1)&&!(K().indexOf("Trident")!=-1||K().indexOf("MSIE")!=-1)&&K().indexOf("Edge")==-1;function Ie(o,u,d){for(const m in o)u.call(d,o[m],m,o)}function w(o,u){for(const d in o)u.call(void 0,o[d],d,o)}function g(o){const u={};for(const d in o)u[d]=o[d];return u}const _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function v(o,u){let d,m;for(let C=1;C<arguments.length;C++){m=arguments[C];for(d in m)o[d]=m[d];for(let k=0;k<_.length;k++)d=_[k],Object.prototype.hasOwnProperty.call(m,d)&&(o[d]=m[d])}}function I(o){var u=1;o=o.split(":");const d=[];for(;0<u&&o.length;)d.push(o.shift()),u--;return o.length&&d.push(o.join(":")),d}function S(o){c.setTimeout(()=>{throw o},0)}function E(){var o=Ke;let u=null;return o.g&&(u=o.g,o.g=o.g.next,o.g||(o.h=null),u.next=null),u}class Me{constructor(){this.h=this.g=null}add(u,d){const m=ze.get();m.set(u,d),this.h?this.h.next=m:this.g=m,this.h=m}}var ze=new j(()=>new Te,o=>o.reset());class Te{constructor(){this.next=this.g=this.h=null}set(u,d){this.h=u,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let ie,me=!1,Ke=new Me,ge=()=>{const o=c.Promise.resolve(void 0);ie=()=>{o.then(V)}};var V=()=>{for(var o;o=E();){try{o.h.call(o.g)}catch(d){S(d)}var u=ze;u.j(o),100>u.h&&(u.h++,o.next=u.g,u.g=o)}me=!1};function L(){this.s=this.s,this.C=this.C}L.prototype.s=!1,L.prototype.ma=function(){this.s||(this.s=!0,this.N())},L.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function P(o,u){this.type=o,this.g=this.target=u,this.defaultPrevented=!1}P.prototype.h=function(){this.defaultPrevented=!0};var Z=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var o=!1,u=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const d=()=>{};c.addEventListener("test",d,u),c.removeEventListener("test",d,u)}catch{}return o}();function q(o,u){if(P.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var d=this.type=o.type,m=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=u,u=o.relatedTarget){if(ce){e:{try{z(u.nodeName);var C=!0;break e}catch{}C=!1}C||(u=null)}}else d=="mouseover"?u=o.fromElement:d=="mouseout"&&(u=o.toElement);this.relatedTarget=u,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:ne[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&q.aa.h.call(this)}}R(q,P);var ne={2:"touch",3:"pen",4:"mouse"};q.prototype.h=function(){q.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var Se="closure_listenable_"+(1e6*Math.random()|0),we=0;function he(o,u,d,m,C){this.listener=o,this.proxy=null,this.src=u,this.type=d,this.capture=!!m,this.ha=C,this.key=++we,this.da=this.fa=!1}function Le(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function xe(o){this.src=o,this.g={},this.h=0}xe.prototype.add=function(o,u,d,m,C){var k=o.toString();o=this.g[k],o||(o=this.g[k]=[],this.h++);var Q=A(o,u,m,C);return-1<Q?(u=o[Q],d||(u.fa=!1)):(u=new he(u,this.src,k,!!m,C),u.fa=d,o.push(u)),u};function T(o,u){var d=u.type;if(d in o.g){var m=o.g[d],C=Array.prototype.indexOf.call(m,u,void 0),k;(k=0<=C)&&Array.prototype.splice.call(m,C,1),k&&(Le(u),o.g[d].length==0&&(delete o.g[d],o.h--))}}function A(o,u,d,m){for(var C=0;C<o.length;++C){var k=o[C];if(!k.da&&k.listener==u&&k.capture==!!d&&k.ha==m)return C}return-1}var D="closure_lm_"+(1e6*Math.random()|0),$={};function F(o,u,d,m,C){if(Array.isArray(u)){for(var k=0;k<u.length;k++)F(o,u[k],d,m,C);return null}return d=pe(d),o&&o[Se]?o.K(u,d,h(m)?!!m.capture:!1,C):U(o,u,d,!1,m,C)}function U(o,u,d,m,C,k){if(!u)throw Error("Invalid event type");var Q=h(C)?!!C.capture:!!C,$e=X(o);if($e||(o[D]=$e=new xe(o)),d=$e.add(u,d,m,Q,k),d.proxy)return d;if(m=J(),d.proxy=m,m.src=o,m.listener=d,o.addEventListener)Z||(C=Q),C===void 0&&(C=!1),o.addEventListener(u.toString(),m,C);else if(o.attachEvent)o.attachEvent(B(u.toString()),m);else if(o.addListener&&o.removeListener)o.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return d}function J(){function o(d){return u.call(o.src,o.listener,d)}const u=ae;return o}function G(o,u,d,m,C){if(Array.isArray(u))for(var k=0;k<u.length;k++)G(o,u[k],d,m,C);else m=h(m)?!!m.capture:!!m,d=pe(d),o&&o[Se]?(o=o.i,u=String(u).toString(),u in o.g&&(k=o.g[u],d=A(k,d,m,C),-1<d&&(Le(k[d]),Array.prototype.splice.call(k,d,1),k.length==0&&(delete o.g[u],o.h--)))):o&&(o=X(o))&&(u=o.g[u.toString()],o=-1,u&&(o=A(u,d,m,C)),(d=-1<o?u[o]:null)&&H(d))}function H(o){if(typeof o!="number"&&o&&!o.da){var u=o.src;if(u&&u[Se])T(u.i,o);else{var d=o.type,m=o.proxy;u.removeEventListener?u.removeEventListener(d,m,o.capture):u.detachEvent?u.detachEvent(B(d),m):u.addListener&&u.removeListener&&u.removeListener(m),(d=X(u))?(T(d,o),d.h==0&&(d.src=null,u[D]=null)):Le(o)}}}function B(o){return o in $?$[o]:$[o]="on"+o}function ae(o,u){if(o.da)o=!0;else{u=new q(u,this);var d=o.listener,m=o.ha||o.src;o.fa&&H(o),o=d.call(m,u)}return o}function X(o){return o=o[D],o instanceof xe?o:null}var oe="__closure_events_fn_"+(1e9*Math.random()>>>0);function pe(o){return typeof o=="function"?o:(o[oe]||(o[oe]=function(u){return o.handleEvent(u)}),o[oe])}function de(){L.call(this),this.i=new xe(this),this.M=this,this.F=null}R(de,L),de.prototype[Se]=!0,de.prototype.removeEventListener=function(o,u,d,m){G(this,o,u,d,m)};function Ae(o,u){var d,m=o.F;if(m)for(d=[];m;m=m.F)d.push(m);if(o=o.M,m=u.type||u,typeof u=="string")u=new P(u,o);else if(u instanceof P)u.target=u.target||o;else{var C=u;u=new P(m,o),v(u,C)}if(C=!0,d)for(var k=d.length-1;0<=k;k--){var Q=u.g=d[k];C=ke(Q,m,!0,u)&&C}if(Q=u.g=o,C=ke(Q,m,!0,u)&&C,C=ke(Q,m,!1,u)&&C,d)for(k=0;k<d.length;k++)Q=u.g=d[k],C=ke(Q,m,!1,u)&&C}de.prototype.N=function(){if(de.aa.N.call(this),this.i){var o=this.i,u;for(u in o.g){for(var d=o.g[u],m=0;m<d.length;m++)Le(d[m]);delete o.g[u],o.h--}}this.F=null},de.prototype.K=function(o,u,d,m){return this.i.add(String(o),u,!1,d,m)},de.prototype.L=function(o,u,d,m){return this.i.add(String(o),u,!0,d,m)};function ke(o,u,d,m){if(u=o.i.g[String(u)],!u)return!0;u=u.concat();for(var C=!0,k=0;k<u.length;++k){var Q=u[k];if(Q&&!Q.da&&Q.capture==d){var $e=Q.listener,pt=Q.ha||Q.src;Q.fa&&T(o.i,Q),C=$e.call(pt,m)!==!1&&C}}return C&&!m.defaultPrevented}function ht(o,u,d){if(typeof o=="function")d&&(o=y(o,d));else if(o&&typeof o.handleEvent=="function")o=y(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:c.setTimeout(o,u||0)}function dt(o){o.g=ht(()=>{o.g=null,o.i&&(o.i=!1,dt(o))},o.l);const u=o.h;o.h=null,o.m.apply(null,u)}class Ft extends L{constructor(u,d){super(),this.m=u,this.l=d,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:dt(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function vt(o){L.call(this),this.h=o,this.g={}}R(vt,L);var Vn=[];function ws(o){Ie(o.g,function(u,d){this.g.hasOwnProperty(d)&&H(u)},o),o.g={}}vt.prototype.N=function(){vt.aa.N.call(this),ws(this)},vt.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ft=c.JSON.stringify,Ut=c.JSON.parse,Ni=class{stringify(o){return c.JSON.stringify(o,void 0)}parse(o){return c.JSON.parse(o,void 0)}};function Lr(){}Lr.prototype.h=null;function ru(o){return o.h||(o.h=o.i())}function su(){}var As={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Ea(){P.call(this,"d")}R(Ea,P);function Ia(){P.call(this,"c")}R(Ia,P);var hr={},iu=null;function xi(){return iu=iu||new de}hr.La="serverreachability";function ou(o){P.call(this,hr.La,o)}R(ou,P);function bs(o){const u=xi();Ae(u,new ou(u))}hr.STAT_EVENT="statevent";function au(o,u){P.call(this,hr.STAT_EVENT,o),this.stat=u}R(au,P);function Rt(o){const u=xi();Ae(u,new au(u,o))}hr.Ma="timingevent";function cu(o,u){P.call(this,hr.Ma,o),this.size=u}R(cu,P);function Ss(o,u){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){o()},u)}function Cs(){this.g=!0}Cs.prototype.xa=function(){this.g=!1};function qg(o,u,d,m,C,k){o.info(function(){if(o.g)if(k)for(var Q="",$e=k.split("&"),pt=0;pt<$e.length;pt++){var Ve=$e[pt].split("=");if(1<Ve.length){var Tt=Ve[0];Ve=Ve[1];var Et=Tt.split("_");Q=2<=Et.length&&Et[1]=="type"?Q+(Tt+"="+Ve+"&"):Q+(Tt+"=redacted&")}}else Q=null;else Q=k;return"XMLHTTP REQ ("+m+") [attempt "+C+"]: "+u+`
`+d+`
`+Q})}function Hg(o,u,d,m,C,k,Q){o.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+C+"]: "+u+`
`+d+`
`+k+" "+Q})}function Fr(o,u,d,m){o.info(function(){return"XMLHTTP TEXT ("+u+"): "+Wg(o,d)+(m?" "+m:"")})}function zg(o,u){o.info(function(){return"TIMEOUT: "+u})}Cs.prototype.info=function(){};function Wg(o,u){if(!o.g)return u;if(!u)return null;try{var d=JSON.parse(u);if(d){for(o=0;o<d.length;o++)if(Array.isArray(d[o])){var m=d[o];if(!(2>m.length)){var C=m[1];if(Array.isArray(C)&&!(1>C.length)){var k=C[0];if(k!="noop"&&k!="stop"&&k!="close")for(var Q=1;Q<C.length;Q++)C[Q]=""}}}}return ft(d)}catch{return u}}var Vi={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},lu={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},wa;function Oi(){}R(Oi,Lr),Oi.prototype.g=function(){return new XMLHttpRequest},Oi.prototype.i=function(){return{}},wa=new Oi;function On(o,u,d,m){this.j=o,this.i=u,this.l=d,this.R=m||1,this.U=new vt(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new uu}function uu(){this.i=null,this.g="",this.h=!1}var hu={},Aa={};function ba(o,u,d){o.L=1,o.v=Ui(pn(u)),o.m=d,o.P=!0,du(o,null)}function du(o,u){o.F=Date.now(),Mi(o),o.A=pn(o.v);var d=o.A,m=o.R;Array.isArray(m)||(m=[String(m)]),Su(d.i,"t",m),o.C=0,d=o.j.J,o.h=new uu,o.g=Hu(o.j,d?u:null,!o.m),0<o.O&&(o.M=new Ft(y(o.Y,o,o.g),o.O)),u=o.U,d=o.g,m=o.ca;var C="readystatechange";Array.isArray(C)||(C&&(Vn[0]=C.toString()),C=Vn);for(var k=0;k<C.length;k++){var Q=F(d,C[k],m||u.handleEvent,!1,u.h||u);if(!Q)break;u.g[Q.key]=Q}u=o.H?g(o.H):{},o.m?(o.u||(o.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,u)):(o.u="GET",o.g.ea(o.A,o.u,null,u)),bs(),qg(o.i,o.u,o.A,o.l,o.R,o.m)}On.prototype.ca=function(o){o=o.target;const u=this.M;u&&mn(o)==3?u.j():this.Y(o)},On.prototype.Y=function(o){try{if(o==this.g)e:{const Et=mn(this.g);var u=this.g.Ba();const Br=this.g.Z();if(!(3>Et)&&(Et!=3||this.g&&(this.h.h||this.g.oa()||xu(this.g)))){this.J||Et!=4||u==7||(u==8||0>=Br?bs(3):bs(2)),Sa(this);var d=this.g.Z();this.X=d;t:if(fu(this)){var m=xu(this.g);o="";var C=m.length,k=mn(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){dr(this),Rs(this);var Q="";break t}this.h.i=new c.TextDecoder}for(u=0;u<C;u++)this.h.h=!0,o+=this.h.i.decode(m[u],{stream:!(k&&u==C-1)});m.length=0,this.h.g+=o,this.C=0,Q=this.h.g}else Q=this.g.oa();if(this.o=d==200,Hg(this.i,this.u,this.A,this.l,this.R,Et,d),this.o){if(this.T&&!this.K){t:{if(this.g){var $e,pt=this.g;if(($e=pt.g?pt.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!W($e)){var Ve=$e;break t}}Ve=null}if(d=Ve)Fr(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Ca(this,d);else{this.o=!1,this.s=3,Rt(12),dr(this),Rs(this);break e}}if(this.P){d=!0;let zt;for(;!this.J&&this.C<Q.length;)if(zt=Gg(this,Q),zt==Aa){Et==4&&(this.s=4,Rt(14),d=!1),Fr(this.i,this.l,null,"[Incomplete Response]");break}else if(zt==hu){this.s=4,Rt(15),Fr(this.i,this.l,Q,"[Invalid Chunk]"),d=!1;break}else Fr(this.i,this.l,zt,null),Ca(this,zt);if(fu(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Et!=4||Q.length!=0||this.h.h||(this.s=1,Rt(16),d=!1),this.o=this.o&&d,!d)Fr(this.i,this.l,Q,"[Invalid Chunked Response]"),dr(this),Rs(this);else if(0<Q.length&&!this.W){this.W=!0;var Tt=this.j;Tt.g==this&&Tt.ba&&!Tt.M&&(Tt.j.info("Great, no buffering proxy detected. Bytes received: "+Q.length),xa(Tt),Tt.M=!0,Rt(11))}}else Fr(this.i,this.l,Q,null),Ca(this,Q);Et==4&&dr(this),this.o&&!this.J&&(Et==4?$u(this.j,this):(this.o=!1,Mi(this)))}else u_(this.g),d==400&&0<Q.indexOf("Unknown SID")?(this.s=3,Rt(12)):(this.s=0,Rt(13)),dr(this),Rs(this)}}}catch{}finally{}};function fu(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function Gg(o,u){var d=o.C,m=u.indexOf(`
`,d);return m==-1?Aa:(d=Number(u.substring(d,m)),isNaN(d)?hu:(m+=1,m+d>u.length?Aa:(u=u.slice(m,m+d),o.C=m+d,u)))}On.prototype.cancel=function(){this.J=!0,dr(this)};function Mi(o){o.S=Date.now()+o.I,pu(o,o.I)}function pu(o,u){if(o.B!=null)throw Error("WatchDog timer not null");o.B=Ss(y(o.ba,o),u)}function Sa(o){o.B&&(c.clearTimeout(o.B),o.B=null)}On.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(zg(this.i,this.A),this.L!=2&&(bs(),Rt(17)),dr(this),this.s=2,Rs(this)):pu(this,this.S-o)};function Rs(o){o.j.G==0||o.J||$u(o.j,o)}function dr(o){Sa(o);var u=o.M;u&&typeof u.ma=="function"&&u.ma(),o.M=null,ws(o.U),o.g&&(u=o.g,o.g=null,u.abort(),u.ma())}function Ca(o,u){try{var d=o.j;if(d.G!=0&&(d.g==o||Ra(d.h,o))){if(!o.K&&Ra(d.h,o)&&d.G==3){try{var m=d.Da.g.parse(u)}catch{m=null}if(Array.isArray(m)&&m.length==3){var C=m;if(C[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<o.F)zi(d),qi(d);else break e;Na(d),Rt(18)}}else d.za=C[1],0<d.za-d.T&&37500>C[2]&&d.F&&d.v==0&&!d.C&&(d.C=Ss(y(d.Za,d),6e3));if(1>=_u(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else pr(d,11)}else if((o.K||d.g==o)&&zi(d),!W(u))for(C=d.Da.g.parse(u),u=0;u<C.length;u++){let Ve=C[u];if(d.T=Ve[0],Ve=Ve[1],d.G==2)if(Ve[0]=="c"){d.K=Ve[1],d.ia=Ve[2];const Tt=Ve[3];Tt!=null&&(d.la=Tt,d.j.info("VER="+d.la));const Et=Ve[4];Et!=null&&(d.Aa=Et,d.j.info("SVER="+d.Aa));const Br=Ve[5];Br!=null&&typeof Br=="number"&&0<Br&&(m=1.5*Br,d.L=m,d.j.info("backChannelRequestTimeoutMs_="+m)),m=d;const zt=o.g;if(zt){const Gi=zt.g?zt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Gi){var k=m.h;k.g||Gi.indexOf("spdy")==-1&&Gi.indexOf("quic")==-1&&Gi.indexOf("h2")==-1||(k.j=k.l,k.g=new Set,k.h&&(Pa(k,k.h),k.h=null))}if(m.D){const Va=zt.g?zt.g.getResponseHeader("X-HTTP-Session-Id"):null;Va&&(m.ya=Va,We(m.I,m.D,Va))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-o.F,d.j.info("Handshake RTT: "+d.R+"ms")),m=d;var Q=o;if(m.qa=qu(m,m.J?m.ia:null,m.W),Q.K){yu(m.h,Q);var $e=Q,pt=m.L;pt&&($e.I=pt),$e.B&&(Sa($e),Mi($e)),m.g=Q}else Fu(m);0<d.i.length&&Hi(d)}else Ve[0]!="stop"&&Ve[0]!="close"||pr(d,7);else d.G==3&&(Ve[0]=="stop"||Ve[0]=="close"?Ve[0]=="stop"?pr(d,7):Da(d):Ve[0]!="noop"&&d.l&&d.l.ta(Ve),d.v=0)}}bs(4)}catch{}}var Kg=class{constructor(o,u){this.g=o,this.map=u}};function mu(o){this.l=o||10,c.PerformanceNavigationTiming?(o=c.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function gu(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function _u(o){return o.h?1:o.g?o.g.size:0}function Ra(o,u){return o.h?o.h==u:o.g?o.g.has(u):!1}function Pa(o,u){o.g?o.g.add(u):o.h=u}function yu(o,u){o.h&&o.h==u?o.h=null:o.g&&o.g.has(u)&&o.g.delete(u)}mu.prototype.cancel=function(){if(this.i=vu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function vu(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let u=o.i;for(const d of o.g.values())u=u.concat(d.D);return u}return N(o.i)}function Qg(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(l(o)){for(var u=[],d=o.length,m=0;m<d;m++)u.push(o[m]);return u}u=[],d=0;for(m in o)u[d++]=o[m];return u}function Xg(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(l(o)||typeof o=="string"){var u=[];o=o.length;for(var d=0;d<o;d++)u.push(d);return u}u=[],d=0;for(const m in o)u[d++]=m;return u}}}function Tu(o,u){if(o.forEach&&typeof o.forEach=="function")o.forEach(u,void 0);else if(l(o)||typeof o=="string")Array.prototype.forEach.call(o,u,void 0);else for(var d=Xg(o),m=Qg(o),C=m.length,k=0;k<C;k++)u.call(void 0,m[k],d&&d[k],o)}var Eu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Jg(o,u){if(o){o=o.split("&");for(var d=0;d<o.length;d++){var m=o[d].indexOf("="),C=null;if(0<=m){var k=o[d].substring(0,m);C=o[d].substring(m+1)}else k=o[d];u(k,C?decodeURIComponent(C.replace(/\+/g," ")):"")}}}function fr(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof fr){this.h=o.h,Li(this,o.j),this.o=o.o,this.g=o.g,Fi(this,o.s),this.l=o.l;var u=o.i,d=new Ds;d.i=u.i,u.g&&(d.g=new Map(u.g),d.h=u.h),Iu(this,d),this.m=o.m}else o&&(u=String(o).match(Eu))?(this.h=!1,Li(this,u[1]||"",!0),this.o=Ps(u[2]||""),this.g=Ps(u[3]||"",!0),Fi(this,u[4]),this.l=Ps(u[5]||"",!0),Iu(this,u[6]||"",!0),this.m=Ps(u[7]||"")):(this.h=!1,this.i=new Ds(null,this.h))}fr.prototype.toString=function(){var o=[],u=this.j;u&&o.push(ks(u,wu,!0),":");var d=this.g;return(d||u=="file")&&(o.push("//"),(u=this.o)&&o.push(ks(u,wu,!0),"@"),o.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&o.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&o.push("/"),o.push(ks(d,d.charAt(0)=="/"?e_:Zg,!0))),(d=this.i.toString())&&o.push("?",d),(d=this.m)&&o.push("#",ks(d,n_)),o.join("")};function pn(o){return new fr(o)}function Li(o,u,d){o.j=d?Ps(u,!0):u,o.j&&(o.j=o.j.replace(/:$/,""))}function Fi(o,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);o.s=u}else o.s=null}function Iu(o,u,d){u instanceof Ds?(o.i=u,r_(o.i,o.h)):(d||(u=ks(u,t_)),o.i=new Ds(u,o.h))}function We(o,u,d){o.i.set(u,d)}function Ui(o){return We(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function Ps(o,u){return o?u?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function ks(o,u,d){return typeof o=="string"?(o=encodeURI(o).replace(u,Yg),d&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Yg(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var wu=/[#\/\?@]/g,Zg=/[#\?:]/g,e_=/[#\?]/g,t_=/[#\?@]/g,n_=/#/g;function Ds(o,u){this.h=this.g=null,this.i=o||null,this.j=!!u}function Mn(o){o.g||(o.g=new Map,o.h=0,o.i&&Jg(o.i,function(u,d){o.add(decodeURIComponent(u.replace(/\+/g," ")),d)}))}t=Ds.prototype,t.add=function(o,u){Mn(this),this.i=null,o=Ur(this,o);var d=this.g.get(o);return d||this.g.set(o,d=[]),d.push(u),this.h+=1,this};function Au(o,u){Mn(o),u=Ur(o,u),o.g.has(u)&&(o.i=null,o.h-=o.g.get(u).length,o.g.delete(u))}function bu(o,u){return Mn(o),u=Ur(o,u),o.g.has(u)}t.forEach=function(o,u){Mn(this),this.g.forEach(function(d,m){d.forEach(function(C){o.call(u,C,m,this)},this)},this)},t.na=function(){Mn(this);const o=Array.from(this.g.values()),u=Array.from(this.g.keys()),d=[];for(let m=0;m<u.length;m++){const C=o[m];for(let k=0;k<C.length;k++)d.push(u[m])}return d},t.V=function(o){Mn(this);let u=[];if(typeof o=="string")bu(this,o)&&(u=u.concat(this.g.get(Ur(this,o))));else{o=Array.from(this.g.values());for(let d=0;d<o.length;d++)u=u.concat(o[d])}return u},t.set=function(o,u){return Mn(this),this.i=null,o=Ur(this,o),bu(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[u]),this.h+=1,this},t.get=function(o,u){return o?(o=this.V(o),0<o.length?String(o[0]):u):u};function Su(o,u,d){Au(o,u),0<d.length&&(o.i=null,o.g.set(Ur(o,u),N(d)),o.h+=d.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],u=Array.from(this.g.keys());for(var d=0;d<u.length;d++){var m=u[d];const k=encodeURIComponent(String(m)),Q=this.V(m);for(m=0;m<Q.length;m++){var C=k;Q[m]!==""&&(C+="="+encodeURIComponent(String(Q[m]))),o.push(C)}}return this.i=o.join("&")};function Ur(o,u){return u=String(u),o.j&&(u=u.toLowerCase()),u}function r_(o,u){u&&!o.j&&(Mn(o),o.i=null,o.g.forEach(function(d,m){var C=m.toLowerCase();m!=C&&(Au(this,m),Su(this,C,d))},o)),o.j=u}function s_(o,u){const d=new Cs;if(c.Image){const m=new Image;m.onload=b(Ln,d,"TestLoadImage: loaded",!0,u,m),m.onerror=b(Ln,d,"TestLoadImage: error",!1,u,m),m.onabort=b(Ln,d,"TestLoadImage: abort",!1,u,m),m.ontimeout=b(Ln,d,"TestLoadImage: timeout",!1,u,m),c.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=o}else u(!1)}function i_(o,u){const d=new Cs,m=new AbortController,C=setTimeout(()=>{m.abort(),Ln(d,"TestPingServer: timeout",!1,u)},1e4);fetch(o,{signal:m.signal}).then(k=>{clearTimeout(C),k.ok?Ln(d,"TestPingServer: ok",!0,u):Ln(d,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(C),Ln(d,"TestPingServer: error",!1,u)})}function Ln(o,u,d,m,C){try{C&&(C.onload=null,C.onerror=null,C.onabort=null,C.ontimeout=null),m(d)}catch{}}function o_(){this.g=new Ni}function a_(o,u,d){const m=d||"";try{Tu(o,function(C,k){let Q=C;h(C)&&(Q=ft(C)),u.push(m+k+"="+encodeURIComponent(Q))})}catch(C){throw u.push(m+"type="+encodeURIComponent("_badmap")),C}}function $i(o){this.l=o.Ub||null,this.j=o.eb||!1}R($i,Lr),$i.prototype.g=function(){return new Bi(this.l,this.j)},$i.prototype.i=function(o){return function(){return o}}({});function Bi(o,u){de.call(this),this.D=o,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}R(Bi,de),t=Bi.prototype,t.open=function(o,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=u,this.readyState=1,xs(this)},t.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(u.body=o),(this.D||c).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Ns(this)),this.readyState=0},t.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,xs(this)),this.g&&(this.readyState=3,xs(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Cu(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function Cu(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}t.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var u=o.value?o.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!o.done}))&&(this.response=this.responseText+=u)}o.done?Ns(this):xs(this),this.readyState==3&&Cu(this)}},t.Ra=function(o){this.g&&(this.response=this.responseText=o,Ns(this))},t.Qa=function(o){this.g&&(this.response=o,Ns(this))},t.ga=function(){this.g&&Ns(this)};function Ns(o){o.readyState=4,o.l=null,o.j=null,o.v=null,xs(o)}t.setRequestHeader=function(o,u){this.u.append(o,u)},t.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],u=this.h.entries();for(var d=u.next();!d.done;)d=d.value,o.push(d[0]+": "+d[1]),d=u.next();return o.join(`\r
`)};function xs(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(Bi.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Ru(o){let u="";return Ie(o,function(d,m){u+=m,u+=":",u+=d,u+=`\r
`}),u}function ka(o,u,d){e:{for(m in d){var m=!1;break e}m=!0}m||(d=Ru(d),typeof o=="string"?d!=null&&encodeURIComponent(String(d)):We(o,u,d))}function Je(o){de.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}R(Je,de);var c_=/^https?$/i,l_=["POST","PUT"];t=Je.prototype,t.Ha=function(o){this.J=o},t.ea=function(o,u,d,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);u=u?u.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():wa.g(),this.v=this.o?ru(this.o):ru(wa),this.g.onreadystatechange=y(this.Ea,this);try{this.B=!0,this.g.open(u,String(o),!0),this.B=!1}catch(k){Pu(this,k);return}if(o=d||"",d=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var C in m)d.set(C,m[C]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const k of m.keys())d.set(k,m.get(k));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(d.keys()).find(k=>k.toLowerCase()=="content-type"),C=c.FormData&&o instanceof c.FormData,!(0<=Array.prototype.indexOf.call(l_,u,void 0))||m||C||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[k,Q]of d)this.g.setRequestHeader(k,Q);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Nu(this),this.u=!0,this.g.send(o),this.u=!1}catch(k){Pu(this,k)}};function Pu(o,u){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=u,o.m=5,ku(o),ji(o)}function ku(o){o.A||(o.A=!0,Ae(o,"complete"),Ae(o,"error"))}t.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,Ae(this,"complete"),Ae(this,"abort"),ji(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),ji(this,!0)),Je.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?Du(this):this.bb())},t.bb=function(){Du(this)};function Du(o){if(o.h&&typeof a<"u"&&(!o.v[1]||mn(o)!=4||o.Z()!=2)){if(o.u&&mn(o)==4)ht(o.Ea,0,o);else if(Ae(o,"readystatechange"),mn(o)==4){o.h=!1;try{const Q=o.Z();e:switch(Q){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var d;if(!(d=u)){var m;if(m=Q===0){var C=String(o.D).match(Eu)[1]||null;!C&&c.self&&c.self.location&&(C=c.self.location.protocol.slice(0,-1)),m=!c_.test(C?C.toLowerCase():"")}d=m}if(d)Ae(o,"complete"),Ae(o,"success");else{o.m=6;try{var k=2<mn(o)?o.g.statusText:""}catch{k=""}o.l=k+" ["+o.Z()+"]",ku(o)}}finally{ji(o)}}}}function ji(o,u){if(o.g){Nu(o);const d=o.g,m=o.v[0]?()=>{}:null;o.g=null,o.v=null,u||Ae(o,"ready");try{d.onreadystatechange=m}catch{}}}function Nu(o){o.I&&(c.clearTimeout(o.I),o.I=null)}t.isActive=function(){return!!this.g};function mn(o){return o.g?o.g.readyState:0}t.Z=function(){try{return 2<mn(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(o){if(this.g){var u=this.g.responseText;return o&&u.indexOf(o)==0&&(u=u.substring(o.length)),Ut(u)}};function xu(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function u_(o){const u={};o=(o.g&&2<=mn(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<o.length;m++){if(W(o[m]))continue;var d=I(o[m]);const C=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const k=u[C]||[];u[C]=k,k.push(d)}w(u,function(m){return m.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Vs(o,u,d){return d&&d.internalChannelParams&&d.internalChannelParams[o]||u}function Vu(o){this.Aa=0,this.i=[],this.j=new Cs,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Vs("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Vs("baseRetryDelayMs",5e3,o),this.cb=Vs("retryDelaySeedMs",1e4,o),this.Wa=Vs("forwardChannelMaxRetries",2,o),this.wa=Vs("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new mu(o&&o.concurrentRequestLimit),this.Da=new o_,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=Vu.prototype,t.la=8,t.G=1,t.connect=function(o,u,d,m){Rt(0),this.W=o,this.H=u||{},d&&m!==void 0&&(this.H.OSID=d,this.H.OAID=m),this.F=this.X,this.I=qu(this,null,this.W),Hi(this)};function Da(o){if(Ou(o),o.G==3){var u=o.U++,d=pn(o.I);if(We(d,"SID",o.K),We(d,"RID",u),We(d,"TYPE","terminate"),Os(o,d),u=new On(o,o.j,u),u.L=2,u.v=Ui(pn(d)),d=!1,c.navigator&&c.navigator.sendBeacon)try{d=c.navigator.sendBeacon(u.v.toString(),"")}catch{}!d&&c.Image&&(new Image().src=u.v,d=!0),d||(u.g=Hu(u.j,null),u.g.ea(u.v)),u.F=Date.now(),Mi(u)}ju(o)}function qi(o){o.g&&(xa(o),o.g.cancel(),o.g=null)}function Ou(o){qi(o),o.u&&(c.clearTimeout(o.u),o.u=null),zi(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&c.clearTimeout(o.s),o.s=null)}function Hi(o){if(!gu(o.h)&&!o.s){o.s=!0;var u=o.Ga;ie||ge(),me||(ie(),me=!0),Ke.add(u,o),o.B=0}}function h_(o,u){return _u(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=u.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=Ss(y(o.Ga,o,u),Bu(o,o.B)),o.B++,!0)}t.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const C=new On(this,this.j,o);let k=this.o;if(this.S&&(k?(k=g(k),v(k,this.S)):k=this.S),this.m!==null||this.O||(C.H=k,k=null),this.P)e:{for(var u=0,d=0;d<this.i.length;d++){t:{var m=this.i[d];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(u+=m,4096<u){u=d;break e}if(u===4096||d===this.i.length-1){u=d+1;break e}}u=1e3}else u=1e3;u=Lu(this,C,u),d=pn(this.I),We(d,"RID",o),We(d,"CVER",22),this.D&&We(d,"X-HTTP-Session-Id",this.D),Os(this,d),k&&(this.O?u="headers="+encodeURIComponent(String(Ru(k)))+"&"+u:this.m&&ka(d,this.m,k)),Pa(this.h,C),this.Ua&&We(d,"TYPE","init"),this.P?(We(d,"$req",u),We(d,"SID","null"),C.T=!0,ba(C,d,null)):ba(C,d,u),this.G=2}}else this.G==3&&(o?Mu(this,o):this.i.length==0||gu(this.h)||Mu(this))};function Mu(o,u){var d;u?d=u.l:d=o.U++;const m=pn(o.I);We(m,"SID",o.K),We(m,"RID",d),We(m,"AID",o.T),Os(o,m),o.m&&o.o&&ka(m,o.m,o.o),d=new On(o,o.j,d,o.B+1),o.m===null&&(d.H=o.o),u&&(o.i=u.D.concat(o.i)),u=Lu(o,d,1e3),d.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),Pa(o.h,d),ba(d,m,u)}function Os(o,u){o.H&&Ie(o.H,function(d,m){We(u,m,d)}),o.l&&Tu({},function(d,m){We(u,m,d)})}function Lu(o,u,d){d=Math.min(o.i.length,d);var m=o.l?y(o.l.Na,o.l,o):null;e:{var C=o.i;let k=-1;for(;;){const Q=["count="+d];k==-1?0<d?(k=C[0].g,Q.push("ofs="+k)):k=0:Q.push("ofs="+k);let $e=!0;for(let pt=0;pt<d;pt++){let Ve=C[pt].g;const Tt=C[pt].map;if(Ve-=k,0>Ve)k=Math.max(0,C[pt].g-100),$e=!1;else try{a_(Tt,Q,"req"+Ve+"_")}catch{m&&m(Tt)}}if($e){m=Q.join("&");break e}}}return o=o.i.splice(0,d),u.D=o,m}function Fu(o){if(!o.g&&!o.u){o.Y=1;var u=o.Fa;ie||ge(),me||(ie(),me=!0),Ke.add(u,o),o.v=0}}function Na(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=Ss(y(o.Fa,o),Bu(o,o.v)),o.v++,!0)}t.Fa=function(){if(this.u=null,Uu(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=Ss(y(this.ab,this),o)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Rt(10),qi(this),Uu(this))};function xa(o){o.A!=null&&(c.clearTimeout(o.A),o.A=null)}function Uu(o){o.g=new On(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var u=pn(o.qa);We(u,"RID","rpc"),We(u,"SID",o.K),We(u,"AID",o.T),We(u,"CI",o.F?"0":"1"),!o.F&&o.ja&&We(u,"TO",o.ja),We(u,"TYPE","xmlhttp"),Os(o,u),o.m&&o.o&&ka(u,o.m,o.o),o.L&&(o.g.I=o.L);var d=o.g;o=o.ia,d.L=1,d.v=Ui(pn(u)),d.m=null,d.P=!0,du(d,o)}t.Za=function(){this.C!=null&&(this.C=null,qi(this),Na(this),Rt(19))};function zi(o){o.C!=null&&(c.clearTimeout(o.C),o.C=null)}function $u(o,u){var d=null;if(o.g==u){zi(o),xa(o),o.g=null;var m=2}else if(Ra(o.h,u))d=u.D,yu(o.h,u),m=1;else return;if(o.G!=0){if(u.o)if(m==1){d=u.m?u.m.length:0,u=Date.now()-u.F;var C=o.B;m=xi(),Ae(m,new cu(m,d)),Hi(o)}else Fu(o);else if(C=u.s,C==3||C==0&&0<u.X||!(m==1&&h_(o,u)||m==2&&Na(o)))switch(d&&0<d.length&&(u=o.h,u.i=u.i.concat(d)),C){case 1:pr(o,5);break;case 4:pr(o,10);break;case 3:pr(o,6);break;default:pr(o,2)}}}function Bu(o,u){let d=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(d*=2),d*u}function pr(o,u){if(o.j.info("Error code "+u),u==2){var d=y(o.fb,o),m=o.Xa;const C=!m;m=new fr(m||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||Li(m,"https"),Ui(m),C?s_(m.toString(),d):i_(m.toString(),d)}else Rt(2);o.G=0,o.l&&o.l.sa(u),ju(o),Ou(o)}t.fb=function(o){o?(this.j.info("Successfully pinged google.com"),Rt(2)):(this.j.info("Failed to ping google.com"),Rt(1))};function ju(o){if(o.G=0,o.ka=[],o.l){const u=vu(o.h);(u.length!=0||o.i.length!=0)&&(x(o.ka,u),x(o.ka,o.i),o.h.i.length=0,N(o.i),o.i.length=0),o.l.ra()}}function qu(o,u,d){var m=d instanceof fr?pn(d):new fr(d);if(m.g!="")u&&(m.g=u+"."+m.g),Fi(m,m.s);else{var C=c.location;m=C.protocol,u=u?u+"."+C.hostname:C.hostname,C=+C.port;var k=new fr(null);m&&Li(k,m),u&&(k.g=u),C&&Fi(k,C),d&&(k.l=d),m=k}return d=o.D,u=o.ya,d&&u&&We(m,d,u),We(m,"VER",o.la),Os(o,m),m}function Hu(o,u,d){if(u&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=o.Ca&&!o.pa?new Je(new $i({eb:d})):new Je(o.pa),u.Ha(o.J),u}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function zu(){}t=zu.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function Wi(){}Wi.prototype.g=function(o,u){return new Ot(o,u)};function Ot(o,u){de.call(this),this.g=new Vu(u),this.l=o,this.h=u&&u.messageUrlParams||null,o=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(o?o["X-WebChannel-Content-Type"]=u.messageContentType:o={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(o?o["X-WebChannel-Client-Profile"]=u.va:o={"X-WebChannel-Client-Profile":u.va}),this.g.S=o,(o=u&&u.Sb)&&!W(o)&&(this.g.m=o),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!W(u)&&(this.g.D=u,o=this.h,o!==null&&u in o&&(o=this.h,u in o&&delete o[u])),this.j=new $r(this)}R(Ot,de),Ot.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Ot.prototype.close=function(){Da(this.g)},Ot.prototype.o=function(o){var u=this.g;if(typeof o=="string"){var d={};d.__data__=o,o=d}else this.u&&(d={},d.__data__=ft(o),o=d);u.i.push(new Kg(u.Ya++,o)),u.G==3&&Hi(u)},Ot.prototype.N=function(){this.g.l=null,delete this.j,Da(this.g),delete this.g,Ot.aa.N.call(this)};function Wu(o){Ea.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var u=o.__sm__;if(u){e:{for(const d in u){o=d;break e}o=void 0}(this.i=o)&&(o=this.i,u=u!==null&&o in u?u[o]:void 0),this.data=u}else this.data=o}R(Wu,Ea);function Gu(){Ia.call(this),this.status=1}R(Gu,Ia);function $r(o){this.g=o}R($r,zu),$r.prototype.ua=function(){Ae(this.g,"a")},$r.prototype.ta=function(o){Ae(this.g,new Wu(o))},$r.prototype.sa=function(o){Ae(this.g,new Gu)},$r.prototype.ra=function(){Ae(this.g,"b")},Wi.prototype.createWebChannel=Wi.prototype.g,Ot.prototype.send=Ot.prototype.o,Ot.prototype.open=Ot.prototype.m,Ot.prototype.close=Ot.prototype.close,Lp=function(){return new Wi},Mp=function(){return xi()},Op=hr,Ac={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Vi.NO_ERROR=0,Vi.TIMEOUT=8,Vi.HTTP_ERROR=6,ao=Vi,lu.COMPLETE="complete",Vp=lu,su.EventType=As,As.OPEN="a",As.CLOSE="b",As.ERROR="c",As.MESSAGE="d",de.prototype.listen=de.prototype.K,Us=su,Je.prototype.listenOnce=Je.prototype.L,Je.prototype.getLastError=Je.prototype.Ka,Je.prototype.getLastErrorCode=Je.prototype.Ba,Je.prototype.getStatus=Je.prototype.Z,Je.prototype.getResponseJson=Je.prototype.Oa,Je.prototype.getResponseText=Je.prototype.oa,Je.prototype.send=Je.prototype.ea,Je.prototype.setWithCredentials=Je.prototype.Ha,xp=Je}).apply(typeof Ji<"u"?Ji:typeof self<"u"?self:typeof window<"u"?window:{});const qh="@firebase/firestore",Hh="4.9.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}At.UNAUTHENTICATED=new At(null),At.GOOGLE_CREDENTIALS=new At("google-credentials-uid"),At.FIRST_PARTY=new At("first-party-uid"),At.MOCK_USER=new At("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let _s="12.0.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rr=new ll("@firebase/firestore");function Wr(){return Rr.logLevel}function te(t,...e){if(Rr.logLevel<=Ce.DEBUG){const n=e.map(dl);Rr.debug(`Firestore (${_s}): ${t}`,...n)}}function Rn(t,...e){if(Rr.logLevel<=Ce.ERROR){const n=e.map(dl);Rr.error(`Firestore (${_s}): ${t}`,...n)}}function as(t,...e){if(Rr.logLevel<=Ce.WARN){const n=e.map(dl);Rr.warn(`Firestore (${_s}): ${t}`,...n)}}function dl(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fe(t,e,n){let r="Unexpected state";typeof e=="string"?r=e:n=e,Fp(t,r,n)}function Fp(t,e,n){let r=`FIRESTORE (${_s}) INTERNAL ASSERTION FAILED: ${e} (ID: ${t.toString(16)})`;if(n!==void 0)try{r+=" CONTEXT: "+JSON.stringify(n)}catch{r+=" CONTEXT: "+n}throw Rn(r),new Error(r)}function Ue(t,e,n,r){let s="Unexpected state";typeof n=="string"?s=n:r=n,t||Fp(e,s,r)}function Ee(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const O={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class ee extends xn{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wr{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Up{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class BE{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(At.UNAUTHENTICATED))}shutdown(){}}class jE{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class qE{constructor(e){this.t=e,this.currentUser=At.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){Ue(this.o===void 0,42304);let r=this.i;const s=l=>this.i!==r?(r=this.i,n(l)):Promise.resolve();let i=new wr;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new wr,e.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const l=i;e.enqueueRetryable(async()=>{await l.promise,await s(this.currentUser)})},c=l=>{te("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(l=>c(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?c(l):(te("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new wr)}},0),a()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(te("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Ue(typeof r.accessToken=="string",31837,{l:r}),new Up(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Ue(e===null||typeof e=="string",2055,{h:e}),new At(e)}}class HE{constructor(e,n,r){this.P=e,this.T=n,this.I=r,this.type="FirstParty",this.user=At.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class zE{constructor(e,n,r){this.P=e,this.T=n,this.I=r}getToken(){return Promise.resolve(new HE(this.P,this.T,this.I))}start(e,n){e.enqueueRetryable(()=>n(At.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class zh{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class WE{constructor(e,n){this.V=n,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Gt(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,n){Ue(this.o===void 0,3512);const r=i=>{i.error!=null&&te("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,te("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{te("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):te("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new zh(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(Ue(typeof n.token=="string",44558,{tokenResult:n}),this.m=n.token,new zh(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function GE(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fl{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=GE(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<n&&(r+=e.charAt(s[i]%62))}return r}}function Re(t,e){return t<e?-1:t>e?1:0}function bc(t,e){const n=Math.min(t.length,e.length);for(let r=0;r<n;r++){const s=t.charAt(r),i=e.charAt(r);if(s!==i)return Ya(s)===Ya(i)?Re(s,i):Ya(s)?1:-1}return Re(t.length,e.length)}const KE=55296,QE=57343;function Ya(t){const e=t.charCodeAt(0);return e>=KE&&e<=QE}function cs(t,e,n){return t.length===e.length&&t.every((r,s)=>n(r,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wh="__name__";class tn{constructor(e,n,r){n===void 0?n=0:n>e.length&&fe(637,{offset:n,range:e.length}),r===void 0?r=e.length-n:r>e.length-n&&fe(1746,{length:r,range:e.length-n}),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return tn.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof tn?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let s=0;s<r;s++){const i=tn.compareSegments(e.get(s),n.get(s));if(i!==0)return i}return Re(e.length,n.length)}static compareSegments(e,n){const r=tn.isNumericId(e),s=tn.isNumericId(n);return r&&!s?-1:!r&&s?1:r&&s?tn.extractNumericId(e).compare(tn.extractNumericId(n)):bc(e,n)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Jn.fromString(e.substring(4,e.length-2))}}class He extends tn{construct(e,n,r){return new He(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new ee(O.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(s=>s.length>0))}return new He(n)}static emptyPath(){return new He([])}}const XE=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class _t extends tn{construct(e,n,r){return new _t(e,n,r)}static isValidIdentifier(e){return XE.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),_t.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Wh}static keyField(){return new _t([Wh])}static fromServerFormat(e){const n=[];let r="",s=0;const i=()=>{if(r.length===0)throw new ee(O.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let a=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new ee(O.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[s+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new ee(O.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,s+=2}else c==="`"?(a=!a,s++):c!=="."||a?(r+=c,s++):(i(),s++)}if(i(),a)throw new ee(O.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new _t(n)}static emptyPath(){return new _t([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class le{constructor(e){this.path=e}static fromPath(e){return new le(He.fromString(e))}static fromName(e){return new le(He.fromString(e).popFirst(5))}static empty(){return new le(He.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&He.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return He.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new le(new He(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $p(t,e,n){if(!n)throw new ee(O.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function JE(t,e,n,r){if(e===!0&&r===!0)throw new ee(O.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function Gh(t){if(!le.isDocumentKey(t))throw new ee(O.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function Kh(t){if(le.isDocumentKey(t))throw new ee(O.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function Bp(t){return typeof t=="object"&&t!==null&&(Object.getPrototypeOf(t)===Object.prototype||Object.getPrototypeOf(t)===null)}function sa(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":fe(12329,{type:typeof t})}function Zr(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new ee(O.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=sa(t);throw new ee(O.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function it(t,e){const n={typeString:t};return e&&(n.value=e),n}function wi(t,e){if(!Bp(t))throw new ee(O.INVALID_ARGUMENT,"JSON must be an object");let n;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in t)){n=`JSON missing required field: '${r}'`;break}const a=t[r];if(s&&typeof a!==s){n=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){n=`Expected '${r}' field to equal '${i.value}'`;break}}if(n)throw new ee(O.INVALID_ARGUMENT,n);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qh=-62135596800,Xh=1e6;class Ge{static now(){return Ge.fromMillis(Date.now())}static fromDate(e){return Ge.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor((e-1e3*n)*Xh);return new Ge(n,r)}constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new ee(O.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new ee(O.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<Qh)throw new ee(O.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new ee(O.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Xh}_compareTo(e){return this.seconds===e.seconds?Re(this.nanoseconds,e.nanoseconds):Re(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Ge._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(wi(e,Ge._jsonSchema))return new Ge(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Qh;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Ge._jsonSchemaVersion="firestore/timestamp/1.0",Ge._jsonSchema={type:it("string",Ge._jsonSchemaVersion),seconds:it("number"),nanoseconds:it("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{static fromTimestamp(e){return new ve(e)}static min(){return new ve(new Ge(0,0))}static max(){return new ve(new Ge(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ui=-1;function YE(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,s=ve.fromTimestamp(r===1e9?new Ge(n+1,0):new Ge(n,r));return new rr(s,le.empty(),e)}function ZE(t){return new rr(t.readTime,t.key,ui)}class rr{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new rr(ve.min(),le.empty(),ui)}static max(){return new rr(ve.max(),le.empty(),ui)}}function eI(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=le.comparator(t.documentKey,e.documentKey),n!==0?n:Re(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tI="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class nI{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ys(t){if(t.code!==O.FAILED_PRECONDITION||t.message!==tI)throw t;te("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&fe(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new M((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(n,i).next(r,s)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof M?n:M.resolve(n)}catch(n){return M.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):M.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):M.reject(n)}static resolve(e){return new M((n,r)=>{n(e)})}static reject(e){return new M((n,r)=>{r(e)})}static waitFor(e){return new M((n,r)=>{let s=0,i=0,a=!1;e.forEach(c=>{++s,c.next(()=>{++i,a&&i===s&&n()},l=>r(l))}),a=!0,i===s&&n()})}static or(e){let n=M.resolve(!1);for(const r of e)n=n.next(s=>s?M.resolve(s):r());return n}static forEach(e,n){const r=[];return e.forEach((s,i)=>{r.push(n.call(this,s,i))}),this.waitFor(r)}static mapArray(e,n){return new M((r,s)=>{const i=e.length,a=new Array(i);let c=0;for(let l=0;l<i;l++){const h=l;n(e[h]).next(f=>{a[h]=f,++c,c===i&&r(a)},f=>s(f))}})}static doWhile(e,n){return new M((r,s)=>{const i=()=>{e()===!0?n().next(()=>{i()},s):r()};i()})}}function rI(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function vs(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ia{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>n.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}ia.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pl=-1;function oa(t){return t==null}function Co(t){return t===0&&1/t==-1/0}function sI(t){return typeof t=="number"&&Number.isInteger(t)&&!Co(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jp="";function iI(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=Jh(e)),e=oI(t.get(n),e);return Jh(e)}function oI(t,e){let n=e;const r=t.length;for(let s=0;s<r;s++){const i=t.charAt(s);switch(i){case"\0":n+="";break;case jp:n+="";break;default:n+=i}}return n}function Jh(t){return t+jp+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yh(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function Nr(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function qp(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xe{constructor(e,n){this.comparator=e,this.root=n||mt.EMPTY}insert(e,n){return new Xe(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,mt.BLACK,null,null))}remove(e){return new Xe(this.comparator,this.root.remove(e,this.comparator).copy(null,null,mt.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return n+r.left.size;s<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Yi(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Yi(this.root,e,this.comparator,!1)}getReverseIterator(){return new Yi(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Yi(this.root,e,this.comparator,!0)}}class Yi{constructor(e,n,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=n?r(e.key,n):1,n&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class mt{constructor(e,n,r,s,i){this.key=e,this.value=n,this.color=r??mt.RED,this.left=s??mt.EMPTY,this.right=i??mt.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,s,i){return new mt(e??this.key,n??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,n,r),null):i===0?s.copy(null,n,null,null,null):s.copy(null,null,null,null,s.right.insert(e,n,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return mt.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,s=this;if(n(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),n(e,s.key)===0){if(s.right.isEmpty())return mt.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,mt.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,mt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw fe(43730,{key:this.key,value:this.value});if(this.right.isRed())throw fe(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw fe(27949);return e+(this.isRed()?0:1)}}mt.EMPTY=null,mt.RED=!0,mt.BLACK=!1;mt.EMPTY=new class{constructor(){this.size=0}get key(){throw fe(57766)}get value(){throw fe(16141)}get color(){throw fe(16727)}get left(){throw fe(29726)}get right(){throw fe(36894)}copy(e,n,r,s,i){return this}insert(e,n,r){return new mt(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt{constructor(e){this.comparator=e,this.data=new Xe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;n(s.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new Zh(this.data.getIterator())}getIteratorFrom(e){return new Zh(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof lt)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new lt(this.comparator);return n.data=e,n}}class Zh{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt{constructor(e){this.fields=e,e.sort(_t.comparator)}static empty(){return new Kt([])}unionWith(e){let n=new lt(_t.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new Kt(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return cs(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hp extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Hp("Invalid base64 string: "+i):i}}(e);return new yt(n)}static fromUint8Array(e){const n=function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i}(e);return new yt(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Re(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}yt.EMPTY_BYTE_STRING=new yt("");const aI=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function sr(t){if(Ue(!!t,39018),typeof t=="string"){let e=0;const n=aI.exec(t);if(Ue(!!n,46558,{timestamp:t}),n[1]){let s=n[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Ye(t.seconds),nanos:Ye(t.nanos)}}function Ye(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function ir(t){return typeof t=="string"?yt.fromBase64String(t):yt.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zp="server_timestamp",Wp="__type__",Gp="__previous_value__",Kp="__local_write_time__";function ml(t){return(t?.mapValue?.fields||{})[Wp]?.stringValue===zp}function aa(t){const e=t.mapValue.fields[Gp];return ml(e)?aa(e):e}function hi(t){const e=sr(t.mapValue.fields[Kp].timestampValue);return new Ge(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cI{constructor(e,n,r,s,i,a,c,l,h,f){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=h,this.isUsingEmulator=f}}const Ro="(default)";class di{constructor(e,n){this.projectId=e,this.database=n||Ro}static empty(){return new di("","")}get isDefaultDatabase(){return this.database===Ro}isEqual(e){return e instanceof di&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qp="__type__",lI="__max__",Zi={mapValue:{}},Xp="__vector__",Po="value";function or(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?ml(t)?4:hI(t)?9007199254740991:uI(t)?10:11:fe(28295,{value:t})}function dn(t,e){if(t===e)return!0;const n=or(t);if(n!==or(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return hi(t).isEqual(hi(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=sr(s.timestampValue),c=sr(i.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(s,i){return ir(s.bytesValue).isEqual(ir(i.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(s,i){return Ye(s.geoPointValue.latitude)===Ye(i.geoPointValue.latitude)&&Ye(s.geoPointValue.longitude)===Ye(i.geoPointValue.longitude)}(t,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return Ye(s.integerValue)===Ye(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=Ye(s.doubleValue),c=Ye(i.doubleValue);return a===c?Co(a)===Co(c):isNaN(a)&&isNaN(c)}return!1}(t,e);case 9:return cs(t.arrayValue.values||[],e.arrayValue.values||[],dn);case 10:case 11:return function(s,i){const a=s.mapValue.fields||{},c=i.mapValue.fields||{};if(Yh(a)!==Yh(c))return!1;for(const l in a)if(a.hasOwnProperty(l)&&(c[l]===void 0||!dn(a[l],c[l])))return!1;return!0}(t,e);default:return fe(52216,{left:t})}}function fi(t,e){return(t.values||[]).find(n=>dn(n,e))!==void 0}function ls(t,e){if(t===e)return 0;const n=or(t),r=or(e);if(n!==r)return Re(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return Re(t.booleanValue,e.booleanValue);case 2:return function(i,a){const c=Ye(i.integerValue||i.doubleValue),l=Ye(a.integerValue||a.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1}(t,e);case 3:return ed(t.timestampValue,e.timestampValue);case 4:return ed(hi(t),hi(e));case 5:return bc(t.stringValue,e.stringValue);case 6:return function(i,a){const c=ir(i),l=ir(a);return c.compareTo(l)}(t.bytesValue,e.bytesValue);case 7:return function(i,a){const c=i.split("/"),l=a.split("/");for(let h=0;h<c.length&&h<l.length;h++){const f=Re(c[h],l[h]);if(f!==0)return f}return Re(c.length,l.length)}(t.referenceValue,e.referenceValue);case 8:return function(i,a){const c=Re(Ye(i.latitude),Ye(a.latitude));return c!==0?c:Re(Ye(i.longitude),Ye(a.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return td(t.arrayValue,e.arrayValue);case 10:return function(i,a){const c=i.fields||{},l=a.fields||{},h=c[Po]?.arrayValue,f=l[Po]?.arrayValue,p=Re(h?.values?.length||0,f?.values?.length||0);return p!==0?p:td(h,f)}(t.mapValue,e.mapValue);case 11:return function(i,a){if(i===Zi.mapValue&&a===Zi.mapValue)return 0;if(i===Zi.mapValue)return 1;if(a===Zi.mapValue)return-1;const c=i.fields||{},l=Object.keys(c),h=a.fields||{},f=Object.keys(h);l.sort(),f.sort();for(let p=0;p<l.length&&p<f.length;++p){const y=bc(l[p],f[p]);if(y!==0)return y;const b=ls(c[l[p]],h[f[p]]);if(b!==0)return b}return Re(l.length,f.length)}(t.mapValue,e.mapValue);default:throw fe(23264,{he:n})}}function ed(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return Re(t,e);const n=sr(t),r=sr(e),s=Re(n.seconds,r.seconds);return s!==0?s:Re(n.nanos,r.nanos)}function td(t,e){const n=t.values||[],r=e.values||[];for(let s=0;s<n.length&&s<r.length;++s){const i=ls(n[s],r[s]);if(i)return i}return Re(n.length,r.length)}function us(t){return Sc(t)}function Sc(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const r=sr(n);return`time(${r.seconds},${r.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return ir(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return le.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let r="[",s=!0;for(const i of n.values||[])s?s=!1:r+=",",r+=Sc(i);return r+"]"}(t.arrayValue):"mapValue"in t?function(n){const r=Object.keys(n.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${Sc(n.fields[a])}`;return s+"}"}(t.mapValue):fe(61005,{value:t})}function co(t){switch(or(t)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=aa(t);return e?16+co(e):16;case 5:return 2*t.stringValue.length;case 6:return ir(t.bytesValue).approximateByteSize();case 7:return t.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,i)=>s+co(i),0)}(t.arrayValue);case 10:case 11:return function(r){let s=0;return Nr(r.fields,(i,a)=>{s+=i.length+co(a)}),s}(t.mapValue);default:throw fe(13486,{value:t})}}function nd(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function Cc(t){return!!t&&"integerValue"in t}function gl(t){return!!t&&"arrayValue"in t}function rd(t){return!!t&&"nullValue"in t}function sd(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function lo(t){return!!t&&"mapValue"in t}function uI(t){return(t?.mapValue?.fields||{})[Qp]?.stringValue===Xp}function Zs(t){if(t.geoPointValue)return{geoPointValue:{...t.geoPointValue}};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:{...t.timestampValue}};if(t.mapValue){const e={mapValue:{fields:{}}};return Nr(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=Zs(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=Zs(t.arrayValue.values[n]);return e}return{...t}}function hI(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue===lI}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $t{constructor(e){this.value=e}static empty(){return new $t({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!lo(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=Zs(n)}setAll(e){let n=_t.emptyPath(),r={},s=[];e.forEach((a,c)=>{if(!n.isImmediateParentOf(c)){const l=this.getFieldsMap(n);this.applyChanges(l,r,s),r={},s=[],n=c.popLast()}a?r[c.lastSegment()]=Zs(a):s.push(c.lastSegment())});const i=this.getFieldsMap(n);this.applyChanges(i,r,s)}delete(e){const n=this.field(e.popLast());lo(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return dn(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=n.mapValue.fields[e.get(r)];lo(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=s),n=s}return n.mapValue.fields}applyChanges(e,n,r){Nr(n,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new $t(Zs(this.value))}}function Jp(t){const e=[];return Nr(t.fields,(n,r)=>{const s=new _t([n]);if(lo(r)){const i=Jp(r.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)}),new Kt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St{constructor(e,n,r,s,i,a,c){this.key=e,this.documentType=n,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=c}static newInvalidDocument(e){return new St(e,0,ve.min(),ve.min(),ve.min(),$t.empty(),0)}static newFoundDocument(e,n,r,s){return new St(e,1,n,ve.min(),r,s,0)}static newNoDocument(e,n){return new St(e,2,n,ve.min(),ve.min(),$t.empty(),0)}static newUnknownDocument(e,n){return new St(e,3,n,ve.min(),ve.min(),$t.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(ve.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=$t.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=$t.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=ve.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof St&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new St(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ko{constructor(e,n){this.position=e,this.inclusive=n}}function id(t,e,n){let r=0;for(let s=0;s<t.position.length;s++){const i=e[s],a=t.position[s];if(i.field.isKeyField()?r=le.comparator(le.fromName(a.referenceValue),n.key):r=ls(a,n.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function od(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!dn(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pi{constructor(e,n="asc"){this.field=e,this.dir=n}}function dI(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yp{}class st extends Yp{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new pI(e,n,r):n==="array-contains"?new _I(e,r):n==="in"?new yI(e,r):n==="not-in"?new vI(e,r):n==="array-contains-any"?new TI(e,r):new st(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new mI(e,r):new gI(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&n.nullValue===void 0&&this.matchesComparison(ls(n,this.value)):n!==null&&or(this.value)===or(n)&&this.matchesComparison(ls(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return fe(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Yt extends Yp{constructor(e,n){super(),this.filters=e,this.op=n,this.Pe=null}static create(e,n){return new Yt(e,n)}matches(e){return Zp(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Zp(t){return t.op==="and"}function em(t){return fI(t)&&Zp(t)}function fI(t){for(const e of t.filters)if(e instanceof Yt)return!1;return!0}function Rc(t){if(t instanceof st)return t.field.canonicalString()+t.op.toString()+us(t.value);if(em(t))return t.filters.map(e=>Rc(e)).join(",");{const e=t.filters.map(n=>Rc(n)).join(",");return`${t.op}(${e})`}}function tm(t,e){return t instanceof st?function(r,s){return s instanceof st&&r.op===s.op&&r.field.isEqual(s.field)&&dn(r.value,s.value)}(t,e):t instanceof Yt?function(r,s){return s instanceof Yt&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,a,c)=>i&&tm(a,s.filters[c]),!0):!1}(t,e):void fe(19439)}function nm(t){return t instanceof st?function(n){return`${n.field.canonicalString()} ${n.op} ${us(n.value)}`}(t):t instanceof Yt?function(n){return n.op.toString()+" {"+n.getFilters().map(nm).join(" ,")+"}"}(t):"Filter"}class pI extends st{constructor(e,n,r){super(e,n,r),this.key=le.fromName(r.referenceValue)}matches(e){const n=le.comparator(e.key,this.key);return this.matchesComparison(n)}}class mI extends st{constructor(e,n){super(e,"in",n),this.keys=rm("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class gI extends st{constructor(e,n){super(e,"not-in",n),this.keys=rm("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function rm(t,e){return(e.arrayValue?.values||[]).map(n=>le.fromName(n.referenceValue))}class _I extends st{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return gl(n)&&fi(n.arrayValue,this.value)}}class yI extends st{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&fi(this.value.arrayValue,n)}}class vI extends st{constructor(e,n){super(e,"not-in",n)}matches(e){if(fi(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&n.nullValue===void 0&&!fi(this.value.arrayValue,n)}}class TI extends st{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!gl(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>fi(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EI{constructor(e,n=null,r=[],s=[],i=null,a=null,c=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=c,this.Te=null}}function ad(t,e=null,n=[],r=[],s=null,i=null,a=null){return new EI(t,e,n,r,s,i,a)}function _l(t){const e=Ee(t);if(e.Te===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>Rc(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),oa(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>us(r)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>us(r)).join(",")),e.Te=n}return e.Te}function yl(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!dI(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!tm(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!od(t.startAt,e.startAt)&&od(t.endAt,e.endAt)}function Pc(t){return le.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ts{constructor(e,n=null,r=[],s=[],i=null,a="F",c=null,l=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=c,this.endAt=l,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function II(t,e,n,r,s,i,a,c){return new Ts(t,e,n,r,s,i,a,c)}function vl(t){return new Ts(t)}function cd(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function sm(t){return t.collectionGroup!==null}function ei(t){const e=Ee(t);if(e.Ie===null){e.Ie=[];const n=new Set;for(const i of e.explicitOrderBy)e.Ie.push(i),n.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new lt(_t.comparator);return a.filters.forEach(l=>{l.getFlattenedFilters().forEach(h=>{h.isInequality()&&(c=c.add(h.field))})}),c})(e).forEach(i=>{n.has(i.canonicalString())||i.isKeyField()||e.Ie.push(new pi(i,r))}),n.has(_t.keyField().canonicalString())||e.Ie.push(new pi(_t.keyField(),r))}return e.Ie}function sn(t){const e=Ee(t);return e.Ee||(e.Ee=wI(e,ei(t))),e.Ee}function wI(t,e){if(t.limitType==="F")return ad(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new pi(s.field,i)});const n=t.endAt?new ko(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new ko(t.startAt.position,t.startAt.inclusive):null;return ad(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function kc(t,e){const n=t.filters.concat([e]);return new Ts(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}function Dc(t,e,n){return new Ts(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function ca(t,e){return yl(sn(t),sn(e))&&t.limitType===e.limitType}function im(t){return`${_l(sn(t))}|lt:${t.limitType}`}function Gr(t){return`Query(target=${function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map(s=>nm(s)).join(", ")}]`),oa(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map(s=>us(s)).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map(s=>us(s)).join(",")),`Target(${r})`}(sn(t))}; limitType=${t.limitType})`}function la(t,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):le.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(t,e)&&function(r,s){for(const i of ei(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(t,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(t,e)&&function(r,s){return!(r.startAt&&!function(a,c,l){const h=id(a,c,l);return a.inclusive?h<=0:h<0}(r.startAt,ei(r),s)||r.endAt&&!function(a,c,l){const h=id(a,c,l);return a.inclusive?h>=0:h>0}(r.endAt,ei(r),s))}(t,e)}function AI(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function om(t){return(e,n)=>{let r=!1;for(const s of ei(t)){const i=bI(s,e,n);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function bI(t,e,n){const r=t.field.isKeyField()?le.comparator(e.key,n.key):function(i,a,c){const l=a.data.field(i),h=c.data.field(i);return l!==null&&h!==null?ls(l,h):fe(42886)}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return fe(19790,{direction:t.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xr{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,n]);s.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[n]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Nr(this.inner,(n,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return qp(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const SI=new Xe(le.comparator);function Pn(){return SI}const am=new Xe(le.comparator);function $s(...t){let e=am;for(const n of t)e=e.insert(n.key,n);return e}function cm(t){let e=am;return t.forEach((n,r)=>e=e.insert(n,r.overlayedDocument)),e}function vr(){return ti()}function lm(){return ti()}function ti(){return new xr(t=>t.toString(),(t,e)=>t.isEqual(e))}const CI=new Xe(le.comparator),RI=new lt(le.comparator);function Pe(...t){let e=RI;for(const n of t)e=e.add(n);return e}const PI=new lt(Re);function kI(){return PI}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tl(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Co(e)?"-0":e}}function um(t){return{integerValue:""+t}}function DI(t,e){return sI(e)?um(e):Tl(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ua{constructor(){this._=void 0}}function NI(t,e,n){return t instanceof Do?function(s,i){const a={fields:{[Wp]:{stringValue:zp},[Kp]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&ml(i)&&(i=aa(i)),i&&(a.fields[Gp]=i),{mapValue:a}}(n,e):t instanceof mi?dm(t,e):t instanceof gi?fm(t,e):function(s,i){const a=hm(s,i),c=ld(a)+ld(s.Ae);return Cc(a)&&Cc(s.Ae)?um(c):Tl(s.serializer,c)}(t,e)}function xI(t,e,n){return t instanceof mi?dm(t,e):t instanceof gi?fm(t,e):n}function hm(t,e){return t instanceof No?function(r){return Cc(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class Do extends ua{}class mi extends ua{constructor(e){super(),this.elements=e}}function dm(t,e){const n=pm(e);for(const r of t.elements)n.some(s=>dn(s,r))||n.push(r);return{arrayValue:{values:n}}}class gi extends ua{constructor(e){super(),this.elements=e}}function fm(t,e){let n=pm(e);for(const r of t.elements)n=n.filter(s=>!dn(s,r));return{arrayValue:{values:n}}}class No extends ua{constructor(e,n){super(),this.serializer=e,this.Ae=n}}function ld(t){return Ye(t.integerValue||t.doubleValue)}function pm(t){return gl(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}function VI(t,e){return t.field.isEqual(e.field)&&function(r,s){return r instanceof mi&&s instanceof mi||r instanceof gi&&s instanceof gi?cs(r.elements,s.elements,dn):r instanceof No&&s instanceof No?dn(r.Ae,s.Ae):r instanceof Do&&s instanceof Do}(t.transform,e.transform)}class OI{constructor(e,n){this.version=e,this.transformResults=n}}class on{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new on}static exists(e){return new on(void 0,e)}static updateTime(e){return new on(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function uo(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class ha{}function mm(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new El(t.key,on.none()):new Ai(t.key,t.data,on.none());{const n=t.data,r=$t.empty();let s=new lt(_t.comparator);for(let i of e.fields)if(!s.has(i)){let a=n.field(i);a===null&&i.length>1&&(i=i.popLast(),a=n.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new Vr(t.key,r,new Kt(s.toArray()),on.none())}}function MI(t,e,n){t instanceof Ai?function(s,i,a){const c=s.value.clone(),l=hd(s.fieldTransforms,i,a.transformResults);c.setAll(l),i.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(t,e,n):t instanceof Vr?function(s,i,a){if(!uo(s.precondition,i))return void i.convertToUnknownDocument(a.version);const c=hd(s.fieldTransforms,i,a.transformResults),l=i.data;l.setAll(gm(s)),l.setAll(c),i.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(t,e,n):function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,n)}function ni(t,e,n,r){return t instanceof Ai?function(i,a,c,l){if(!uo(i.precondition,a))return c;const h=i.value.clone(),f=dd(i.fieldTransforms,l,a);return h.setAll(f),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),null}(t,e,n,r):t instanceof Vr?function(i,a,c,l){if(!uo(i.precondition,a))return c;const h=dd(i.fieldTransforms,l,a),f=a.data;return f.setAll(gm(i)),f.setAll(h),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(p=>p.field))}(t,e,n,r):function(i,a,c){return uo(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c}(t,e,n)}function LI(t,e){let n=null;for(const r of t.fieldTransforms){const s=e.data.field(r.field),i=hm(r.transform,s||null);i!=null&&(n===null&&(n=$t.empty()),n.set(r.field,i))}return n||null}function ud(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&cs(r,s,(i,a)=>VI(i,a))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class Ai extends ha{constructor(e,n,r,s=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Vr extends ha{constructor(e,n,r,s,i=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function gm(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function hd(t,e,n){const r=new Map;Ue(t.length===n.length,32656,{Re:n.length,Ve:t.length});for(let s=0;s<n.length;s++){const i=t[s],a=i.transform,c=e.data.field(i.field);r.set(i.field,xI(a,c,n[s]))}return r}function dd(t,e,n){const r=new Map;for(const s of t){const i=s.transform,a=n.data.field(s.field);r.set(s.field,NI(i,a,e))}return r}class El extends ha{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class FI extends ha{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UI{constructor(e,n,r,s){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&MI(i,e,r[s])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=ni(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=ni(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=lm();return this.mutations.forEach(s=>{const i=e.get(s.key),a=i.overlayedDocument;let c=this.applyToLocalView(a,i.mutatedFields);c=n.has(s.key)?null:c;const l=mm(a,c);l!==null&&r.set(s.key,l),a.isValidDocument()||a.convertToNoDocument(ve.min())}),r}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),Pe())}isEqual(e){return this.batchId===e.batchId&&cs(this.mutations,e.mutations,(n,r)=>ud(n,r))&&cs(this.baseMutations,e.baseMutations,(n,r)=>ud(n,r))}}class Il{constructor(e,n,r,s){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=s}static from(e,n,r){Ue(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let s=function(){return CI}();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new Il(e,n,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $I{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BI{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var et,De;function jI(t){switch(t){case O.OK:return fe(64938);case O.CANCELLED:case O.UNKNOWN:case O.DEADLINE_EXCEEDED:case O.RESOURCE_EXHAUSTED:case O.INTERNAL:case O.UNAVAILABLE:case O.UNAUTHENTICATED:return!1;case O.INVALID_ARGUMENT:case O.NOT_FOUND:case O.ALREADY_EXISTS:case O.PERMISSION_DENIED:case O.FAILED_PRECONDITION:case O.ABORTED:case O.OUT_OF_RANGE:case O.UNIMPLEMENTED:case O.DATA_LOSS:return!0;default:return fe(15467,{code:t})}}function _m(t){if(t===void 0)return Rn("GRPC error has no .code"),O.UNKNOWN;switch(t){case et.OK:return O.OK;case et.CANCELLED:return O.CANCELLED;case et.UNKNOWN:return O.UNKNOWN;case et.DEADLINE_EXCEEDED:return O.DEADLINE_EXCEEDED;case et.RESOURCE_EXHAUSTED:return O.RESOURCE_EXHAUSTED;case et.INTERNAL:return O.INTERNAL;case et.UNAVAILABLE:return O.UNAVAILABLE;case et.UNAUTHENTICATED:return O.UNAUTHENTICATED;case et.INVALID_ARGUMENT:return O.INVALID_ARGUMENT;case et.NOT_FOUND:return O.NOT_FOUND;case et.ALREADY_EXISTS:return O.ALREADY_EXISTS;case et.PERMISSION_DENIED:return O.PERMISSION_DENIED;case et.FAILED_PRECONDITION:return O.FAILED_PRECONDITION;case et.ABORTED:return O.ABORTED;case et.OUT_OF_RANGE:return O.OUT_OF_RANGE;case et.UNIMPLEMENTED:return O.UNIMPLEMENTED;case et.DATA_LOSS:return O.DATA_LOSS;default:return fe(39323,{code:t})}}(De=et||(et={}))[De.OK=0]="OK",De[De.CANCELLED=1]="CANCELLED",De[De.UNKNOWN=2]="UNKNOWN",De[De.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",De[De.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",De[De.NOT_FOUND=5]="NOT_FOUND",De[De.ALREADY_EXISTS=6]="ALREADY_EXISTS",De[De.PERMISSION_DENIED=7]="PERMISSION_DENIED",De[De.UNAUTHENTICATED=16]="UNAUTHENTICATED",De[De.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",De[De.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",De[De.ABORTED=10]="ABORTED",De[De.OUT_OF_RANGE=11]="OUT_OF_RANGE",De[De.UNIMPLEMENTED=12]="UNIMPLEMENTED",De[De.INTERNAL=13]="INTERNAL",De[De.UNAVAILABLE=14]="UNAVAILABLE",De[De.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qI(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HI=new Jn([4294967295,4294967295],0);function fd(t){const e=qI().encode(t),n=new Np;return n.update(e),new Uint8Array(n.digest())}function pd(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Jn([n,r],0),new Jn([s,i],0)]}class wl{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new Bs(`Invalid padding: ${n}`);if(r<0)throw new Bs(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Bs(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new Bs(`Invalid padding when bitmap length is 0: ${n}`);this.ge=8*e.length-n,this.pe=Jn.fromNumber(this.ge)}ye(e,n,r){let s=e.add(n.multiply(Jn.fromNumber(r)));return s.compare(HI)===1&&(s=new Jn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const n=fd(e),[r,s]=pd(n);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);if(!this.we(a))return!1}return!0}static create(e,n,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new wl(i,s,n);return r.forEach(c=>a.insert(c)),a}insert(e){if(this.ge===0)return;const n=fd(e),[r,s]=pd(n);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);this.Se(a)}}Se(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class Bs extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class da{constructor(e,n,r,s,i){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const s=new Map;return s.set(e,bi.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new da(ve.min(),s,new Xe(Re),Pn(),Pe())}}class bi{constructor(e,n,r,s,i){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new bi(r,n,Pe(),Pe(),Pe())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ho{constructor(e,n,r,s){this.be=e,this.removedTargetIds=n,this.key=r,this.De=s}}class ym{constructor(e,n){this.targetId=e,this.Ce=n}}class vm{constructor(e,n,r=yt.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=s}}class md{constructor(){this.ve=0,this.Fe=gd(),this.Me=yt.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=Pe(),n=Pe(),r=Pe();return this.Fe.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:n=n.add(s);break;case 1:r=r.add(s);break;default:fe(38017,{changeType:i})}}),new bi(this.Me,this.xe,e,n,r)}qe(){this.Oe=!1,this.Fe=gd()}Qe(e,n){this.Oe=!0,this.Fe=this.Fe.insert(e,n)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,Ue(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class zI{constructor(e){this.Ge=e,this.ze=new Map,this.je=Pn(),this.Je=eo(),this.He=eo(),this.Ye=new Xe(Re)}Ze(e){for(const n of e.be)e.De&&e.De.isFoundDocument()?this.Xe(n,e.De):this.et(n,e.key,e.De);for(const n of e.removedTargetIds)this.et(n,e.key,e.De)}tt(e){this.forEachTarget(e,n=>{const r=this.nt(n);switch(e.state){case 0:this.rt(n)&&r.Le(e.resumeToken);break;case 1:r.Ke(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.Ke(),r.Ne||this.removeTarget(n);break;case 3:this.rt(n)&&(r.We(),r.Le(e.resumeToken));break;case 4:this.rt(n)&&(this.it(n),r.Le(e.resumeToken));break;default:fe(56790,{state:e.state})}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.ze.forEach((r,s)=>{this.rt(s)&&n(s)})}st(e){const n=e.targetId,r=e.Ce.count,s=this.ot(n);if(s){const i=s.target;if(Pc(i))if(r===0){const a=new le(i.path);this.et(n,a,St.newNoDocument(a,ve.min()))}else Ue(r===1,20013,{expectedCount:r});else{const a=this._t(n);if(a!==r){const c=this.ut(e),l=c?this.ct(c,e,a):1;if(l!==0){this.it(n);const h=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(n,h)}}}}}ut(e){const n=e.Ce.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=n;let a,c;try{a=ir(r).toUint8Array()}catch(l){if(l instanceof Hp)return as("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new wl(a,s,i)}catch(l){return as(l instanceof Bs?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.ge===0?null:c}ct(e,n,r){return n.Ce.count===r-this.Pt(e,n.targetId)?0:2}Pt(e,n){const r=this.Ge.getRemoteKeysForTarget(n);let s=0;return r.forEach(i=>{const a=this.Ge.ht(),c=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.et(n,i,null),s++)}),s}Tt(e){const n=new Map;this.ze.forEach((i,a)=>{const c=this.ot(a);if(c){if(i.current&&Pc(c.target)){const l=new le(c.target.path);this.It(l).has(a)||this.Et(a,l)||this.et(a,l,St.newNoDocument(l,e))}i.Be&&(n.set(a,i.ke()),i.qe())}});let r=Pe();this.He.forEach((i,a)=>{let c=!0;a.forEachWhile(l=>{const h=this.ot(l);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(i))}),this.je.forEach((i,a)=>a.setReadTime(e));const s=new da(e,n,this.Ye,this.je,r);return this.je=Pn(),this.Je=eo(),this.He=eo(),this.Ye=new Xe(Re),s}Xe(e,n){if(!this.rt(e))return;const r=this.Et(e,n.key)?2:0;this.nt(e).Qe(n.key,r),this.je=this.je.insert(n.key,n),this.Je=this.Je.insert(n.key,this.It(n.key).add(e)),this.He=this.He.insert(n.key,this.dt(n.key).add(e))}et(e,n,r){if(!this.rt(e))return;const s=this.nt(e);this.Et(e,n)?s.Qe(n,1):s.$e(n),this.He=this.He.insert(n,this.dt(n).delete(e)),this.He=this.He.insert(n,this.dt(n).add(e)),r&&(this.je=this.je.insert(n,r))}removeTarget(e){this.ze.delete(e)}_t(e){const n=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let n=this.ze.get(e);return n||(n=new md,this.ze.set(e,n)),n}dt(e){let n=this.He.get(e);return n||(n=new lt(Re),this.He=this.He.insert(e,n)),n}It(e){let n=this.Je.get(e);return n||(n=new lt(Re),this.Je=this.Je.insert(e,n)),n}rt(e){const n=this.ot(e)!==null;return n||te("WatchChangeAggregator","Detected inactive target",e),n}ot(e){const n=this.ze.get(e);return n&&n.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new md),this.Ge.getRemoteKeysForTarget(e).forEach(n=>{this.et(e,n,null)})}Et(e,n){return this.Ge.getRemoteKeysForTarget(e).has(n)}}function eo(){return new Xe(le.comparator)}function gd(){return new Xe(le.comparator)}const WI={asc:"ASCENDING",desc:"DESCENDING"},GI={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},KI={and:"AND",or:"OR"};class QI{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function Nc(t,e){return t.useProto3Json||oa(e)?e:{value:e}}function xo(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Tm(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function XI(t,e){return xo(t,e.toTimestamp())}function an(t){return Ue(!!t,49232),ve.fromTimestamp(function(n){const r=sr(n);return new Ge(r.seconds,r.nanos)}(t))}function Al(t,e){return xc(t,e).canonicalString()}function xc(t,e){const n=function(s){return new He(["projects",s.projectId,"databases",s.database])}(t).child("documents");return e===void 0?n:n.child(e)}function Em(t){const e=He.fromString(t);return Ue(Sm(e),10190,{key:e.toString()}),e}function Vc(t,e){return Al(t.databaseId,e.path)}function Za(t,e){const n=Em(e);if(n.get(1)!==t.databaseId.projectId)throw new ee(O.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new ee(O.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new le(wm(n))}function Im(t,e){return Al(t.databaseId,e)}function JI(t){const e=Em(t);return e.length===4?He.emptyPath():wm(e)}function Oc(t){return new He(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function wm(t){return Ue(t.length>4&&t.get(4)==="documents",29091,{key:t.toString()}),t.popFirst(5)}function _d(t,e,n){return{name:Vc(t,e),fields:n.value.mapValue.fields}}function YI(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:fe(39313,{state:h})}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(h,f){return h.useProto3Json?(Ue(f===void 0||typeof f=="string",58123),yt.fromBase64String(f||"")):(Ue(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),yt.fromUint8Array(f||new Uint8Array))}(t,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&function(h){const f=h.code===void 0?O.UNKNOWN:_m(h.code);return new ee(f,h.message||"")}(a);n=new vm(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Za(t,r.document.name),i=an(r.document.updateTime),a=r.document.createTime?an(r.document.createTime):ve.min(),c=new $t({mapValue:{fields:r.document.fields}}),l=St.newFoundDocument(s,i,a,c),h=r.targetIds||[],f=r.removedTargetIds||[];n=new ho(h,f,l.key,l)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Za(t,r.document),i=r.readTime?an(r.readTime):ve.min(),a=St.newNoDocument(s,i),c=r.removedTargetIds||[];n=new ho([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Za(t,r.document),i=r.removedTargetIds||[];n=new ho([],i,s,null)}else{if(!("filter"in e))return fe(11601,{Rt:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new BI(s,i),c=r.targetId;n=new ym(c,a)}}return n}function ZI(t,e){let n;if(e instanceof Ai)n={update:_d(t,e.key,e.value)};else if(e instanceof El)n={delete:Vc(t,e.key)};else if(e instanceof Vr)n={update:_d(t,e.key,e.data),updateMask:cw(e.fieldMask)};else{if(!(e instanceof FI))return fe(16599,{Vt:e.type});n={verify:Vc(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(i,a){const c=a.transform;if(c instanceof Do)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof mi)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof gi)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof No)return{fieldPath:a.field.canonicalString(),increment:c.Ae};throw fe(20930,{transform:a.transform})}(0,r))),e.precondition.isNone||(n.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:XI(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:fe(27497)}(t,e.precondition)),n}function ew(t,e){return t&&t.length>0?(Ue(e!==void 0,14353),t.map(n=>function(s,i){let a=s.updateTime?an(s.updateTime):an(i);return a.isEqual(ve.min())&&(a=an(i)),new OI(a,s.transformResults||[])}(n,e))):[]}function tw(t,e){return{documents:[Im(t,e.path)]}}function nw(t,e){const n={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=Im(t,s);const i=function(h){if(h.length!==0)return bm(Yt.create(h,"and"))}(e.filters);i&&(n.structuredQuery.where=i);const a=function(h){if(h.length!==0)return h.map(f=>function(y){return{field:Kr(y.field),direction:iw(y.dir)}}(f))}(e.orderBy);a&&(n.structuredQuery.orderBy=a);const c=Nc(t,e.limit);return c!==null&&(n.structuredQuery.limit=c),e.startAt&&(n.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{ft:n,parent:s}}function rw(t){let e=JI(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){Ue(r===1,65062);const f=n.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];n.where&&(i=function(p){const y=Am(p);return y instanceof Yt&&em(y)?y.getFilters():[y]}(n.where));let a=[];n.orderBy&&(a=function(p){return p.map(y=>function(R){return new pi(Qr(R.field),function(x){switch(x){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(R.direction))}(y))}(n.orderBy));let c=null;n.limit&&(c=function(p){let y;return y=typeof p=="object"?p.value:p,oa(y)?null:y}(n.limit));let l=null;n.startAt&&(l=function(p){const y=!!p.before,b=p.values||[];return new ko(b,y)}(n.startAt));let h=null;return n.endAt&&(h=function(p){const y=!p.before,b=p.values||[];return new ko(b,y)}(n.endAt)),II(e,s,a,i,c,"F",l,h)}function sw(t,e){const n=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return fe(28987,{purpose:s})}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function Am(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=Qr(n.unaryFilter.field);return st.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Qr(n.unaryFilter.field);return st.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Qr(n.unaryFilter.field);return st.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Qr(n.unaryFilter.field);return st.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return fe(61313);default:return fe(60726)}}(t):t.fieldFilter!==void 0?function(n){return st.create(Qr(n.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return fe(58110);default:return fe(50506)}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return Yt.create(n.compositeFilter.filters.map(r=>Am(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return fe(1026)}}(n.compositeFilter.op))}(t):fe(30097,{filter:t})}function iw(t){return WI[t]}function ow(t){return GI[t]}function aw(t){return KI[t]}function Kr(t){return{fieldPath:t.canonicalString()}}function Qr(t){return _t.fromServerFormat(t.fieldPath)}function bm(t){return t instanceof st?function(n){if(n.op==="=="){if(sd(n.value))return{unaryFilter:{field:Kr(n.field),op:"IS_NAN"}};if(rd(n.value))return{unaryFilter:{field:Kr(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(sd(n.value))return{unaryFilter:{field:Kr(n.field),op:"IS_NOT_NAN"}};if(rd(n.value))return{unaryFilter:{field:Kr(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Kr(n.field),op:ow(n.op),value:n.value}}}(t):t instanceof Yt?function(n){const r=n.getFilters().map(s=>bm(s));return r.length===1?r[0]:{compositeFilter:{op:aw(n.op),filters:r}}}(t):fe(54877,{filter:t})}function cw(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function Sm(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zn{constructor(e,n,r,s,i=ve.min(),a=ve.min(),c=yt.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new zn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new zn(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new zn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new zn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lw{constructor(e){this.yt=e}}function uw(t){const e=rw({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?Dc(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hw{constructor(){this.Cn=new dw}addToCollectionParentIndex(e,n){return this.Cn.add(n),M.resolve()}getCollectionParents(e,n){return M.resolve(this.Cn.getEntries(n))}addFieldIndex(e,n){return M.resolve()}deleteFieldIndex(e,n){return M.resolve()}deleteAllFieldIndexes(e){return M.resolve()}createTargetIndexes(e,n){return M.resolve()}getDocumentsMatchingTarget(e,n){return M.resolve(null)}getIndexType(e,n){return M.resolve(0)}getFieldIndexes(e,n){return M.resolve([])}getNextCollectionGroupToUpdate(e){return M.resolve(null)}getMinOffset(e,n){return M.resolve(rr.min())}getMinOffsetFromCollectionGroup(e,n){return M.resolve(rr.min())}updateCollectionGroup(e,n,r){return M.resolve()}updateIndexEntries(e,n){return M.resolve()}}class dw{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n]||new lt(He.comparator),i=!s.has(r);return this.index[n]=s.add(r),i}has(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n];return s&&s.has(r)}getEntries(e){return(this.index[e]||new lt(He.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yd={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Cm=41943040;class Vt{static withCacheSize(e){return new Vt(e,Vt.DEFAULT_COLLECTION_PERCENTILE,Vt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,n,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=n,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Vt.DEFAULT_COLLECTION_PERCENTILE=10,Vt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Vt.DEFAULT=new Vt(Cm,Vt.DEFAULT_COLLECTION_PERCENTILE,Vt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Vt.DISABLED=new Vt(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hs{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new hs(0)}static cr(){return new hs(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vd="LruGarbageCollector",fw=1048576;function Td([t,e],[n,r]){const s=Re(t,n);return s===0?Re(e,r):s}class pw{constructor(e){this.Ir=e,this.buffer=new lt(Td),this.Er=0}dr(){return++this.Er}Ar(e){const n=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(n);else{const r=this.buffer.last();Td(n,r)<0&&(this.buffer=this.buffer.delete(r).add(n))}}get maxValue(){return this.buffer.last()[0]}}class mw{constructor(e,n,r){this.garbageCollector=e,this.asyncQueue=n,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(e){te(vd,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(n){vs(n)?te(vd,"Ignoring IndexedDB error during garbage collection: ",n):await ys(n)}await this.Vr(3e5)})}}class gw{constructor(e,n){this.mr=e,this.params=n}calculateTargetCount(e,n){return this.mr.gr(e).next(r=>Math.floor(n/100*r))}nthSequenceNumber(e,n){if(n===0)return M.resolve(ia.ce);const r=new pw(n);return this.mr.forEachTarget(e,s=>r.Ar(s.sequenceNumber)).next(()=>this.mr.pr(e,s=>r.Ar(s))).next(()=>r.maxValue)}removeTargets(e,n,r){return this.mr.removeTargets(e,n,r)}removeOrphanedDocuments(e,n){return this.mr.removeOrphanedDocuments(e,n)}collect(e,n){return this.params.cacheSizeCollectionThreshold===-1?(te("LruGarbageCollector","Garbage collection skipped; disabled"),M.resolve(yd)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(te("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),yd):this.yr(e,n))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,n){let r,s,i,a,c,l,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?(te("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,a=Date.now(),this.nthSequenceNumber(e,s))).next(p=>(r=p,c=Date.now(),this.removeTargets(e,r,n))).next(p=>(i=p,l=Date.now(),this.removeOrphanedDocuments(e,r))).next(p=>(h=Date.now(),Wr()<=Ce.DEBUG&&te("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${s} in `+(c-a)+`ms
	Removed ${i} targets in `+(l-c)+`ms
	Removed ${p} documents in `+(h-l)+`ms
Total Duration: ${h-f}ms`),M.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p})))}}function _w(t,e){return new gw(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yw{constructor(){this.changes=new xr(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,St.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?M.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vw{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tw{constructor(e,n,r,s){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,n))).next(s=>(r!==null&&ni(r.mutation,s,Kt.empty(),Ge.now()),s))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.getLocalViewOfDocuments(e,r,Pe()).next(()=>r))}getLocalViewOfDocuments(e,n,r=Pe()){const s=vr();return this.populateOverlays(e,s,n).next(()=>this.computeViews(e,n,s,r).next(i=>{let a=$s();return i.forEach((c,l)=>{a=a.insert(c,l.overlayedDocument)}),a}))}getOverlayedDocuments(e,n){const r=vr();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,Pe()))}populateOverlays(e,n,r){const s=[];return r.forEach(i=>{n.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((a,c)=>{n.set(a,c)})})}computeViews(e,n,r,s){let i=Pn();const a=ti(),c=function(){return ti()}();return n.forEach((l,h)=>{const f=r.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof Vr)?i=i.insert(h.key,h):f!==void 0?(a.set(h.key,f.mutation.getFieldMask()),ni(f.mutation,h,f.mutation.getFieldMask(),Ge.now())):a.set(h.key,Kt.empty())}),this.recalculateAndSaveOverlays(e,i).next(l=>(l.forEach((h,f)=>a.set(h,f)),n.forEach((h,f)=>c.set(h,new vw(f,a.get(h)??null))),c))}recalculateAndSaveOverlays(e,n){const r=ti();let s=new Xe((a,c)=>a-c),i=Pe();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(a=>{for(const c of a)c.keys().forEach(l=>{const h=n.get(l);if(h===null)return;let f=r.get(l)||Kt.empty();f=c.applyToLocalView(h,f),r.set(l,f);const p=(s.get(c.batchId)||Pe()).add(l);s=s.insert(c.batchId,p)})}).next(()=>{const a=[],c=s.getReverseIterator();for(;c.hasNext();){const l=c.getNext(),h=l.key,f=l.value,p=lm();f.forEach(y=>{if(!i.has(y)){const b=mm(n.get(y),r.get(y));b!==null&&p.set(y,b),i=i.add(y)}}),a.push(this.documentOverlayCache.saveOverlays(e,h,p))}return M.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,n,r,s){return function(a){return le.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):sm(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,s):this.getDocumentsMatchingCollectionQuery(e,n,r,s)}getNextDocuments(e,n,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,s).next(i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,s-i.size):M.resolve(vr());let c=ui,l=i;return a.next(h=>M.forEach(h,(f,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),i.get(f)?M.resolve():this.remoteDocumentCache.getEntry(e,f).next(y=>{l=l.insert(f,y)}))).next(()=>this.populateOverlays(e,h,i)).next(()=>this.computeViews(e,l,h,Pe())).next(f=>({batchId:c,changes:cm(f)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new le(n)).next(r=>{let s=$s();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,n,r,s){const i=n.collectionGroup;let a=$s();return this.indexManager.getCollectionParents(e,i).next(c=>M.forEach(c,l=>{const h=function(p,y){return new Ts(y,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(n,l.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,r,s).next(f=>{f.forEach((p,y)=>{a=a.insert(p,y)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,n,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,i,s))).next(a=>{i.forEach((l,h)=>{const f=h.getKey();a.get(f)===null&&(a=a.insert(f,St.newInvalidDocument(f)))});let c=$s();return a.forEach((l,h)=>{const f=i.get(l);f!==void 0&&ni(f.mutation,h,Kt.empty(),Ge.now()),la(n,h)&&(c=c.insert(l,h))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ew{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,n){return M.resolve(this.Lr.get(n))}saveBundleMetadata(e,n){return this.Lr.set(n.id,function(s){return{id:s.id,version:s.version,createTime:an(s.createTime)}}(n)),M.resolve()}getNamedQuery(e,n){return M.resolve(this.kr.get(n))}saveNamedQuery(e,n){return this.kr.set(n.name,function(s){return{name:s.name,query:uw(s.bundledQuery),readTime:an(s.readTime)}}(n)),M.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iw{constructor(){this.overlays=new Xe(le.comparator),this.qr=new Map}getOverlay(e,n){return M.resolve(this.overlays.get(n))}getOverlays(e,n){const r=vr();return M.forEach(n,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,n,r){return r.forEach((s,i)=>{this.St(e,n,i)}),M.resolve()}removeOverlaysForBatchId(e,n,r){const s=this.qr.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.qr.delete(r)),M.resolve()}getOverlaysForCollection(e,n,r){const s=vr(),i=n.length+1,a=new le(n.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const l=c.getNext().value,h=l.getKey();if(!n.isPrefixOf(h.path))break;h.path.length===i&&l.largestBatchId>r&&s.set(l.getKey(),l)}return M.resolve(s)}getOverlaysForCollectionGroup(e,n,r,s){let i=new Xe((h,f)=>h-f);const a=this.overlays.getIterator();for(;a.hasNext();){const h=a.getNext().value;if(h.getKey().getCollectionGroup()===n&&h.largestBatchId>r){let f=i.get(h.largestBatchId);f===null&&(f=vr(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const c=vr(),l=i.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((h,f)=>c.set(h,f)),!(c.size()>=s)););return M.resolve(c)}St(e,n,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.qr.get(s.largestBatchId).delete(r.key);this.qr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new $I(n,r));let i=this.qr.get(n);i===void 0&&(i=Pe(),this.qr.set(n,i)),this.qr.set(n,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ww{constructor(){this.sessionToken=yt.EMPTY_BYTE_STRING}getSessionToken(e){return M.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,M.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bl{constructor(){this.Qr=new lt(ut.$r),this.Ur=new lt(ut.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,n){const r=new ut(e,n);this.Qr=this.Qr.add(r),this.Ur=this.Ur.add(r)}Wr(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.Gr(new ut(e,n))}zr(e,n){e.forEach(r=>this.removeReference(r,n))}jr(e){const n=new le(new He([])),r=new ut(n,e),s=new ut(n,e+1),i=[];return this.Ur.forEachInRange([r,s],a=>{this.Gr(a),i.push(a.key)}),i}Jr(){this.Qr.forEach(e=>this.Gr(e))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const n=new le(new He([])),r=new ut(n,e),s=new ut(n,e+1);let i=Pe();return this.Ur.forEachInRange([r,s],a=>{i=i.add(a.key)}),i}containsKey(e){const n=new ut(e,0),r=this.Qr.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class ut{constructor(e,n){this.key=e,this.Yr=n}static $r(e,n){return le.comparator(e.key,n.key)||Re(e.Yr,n.Yr)}static Kr(e,n){return Re(e.Yr,n.Yr)||le.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Aw{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.tr=1,this.Zr=new lt(ut.$r)}checkEmpty(e){return M.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,s){const i=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new UI(i,n,r,s);this.mutationQueue.push(a);for(const c of s)this.Zr=this.Zr.add(new ut(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return M.resolve(a)}lookupMutationBatch(e,n){return M.resolve(this.Xr(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,s=this.ei(r),i=s<0?0:s;return M.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return M.resolve(this.mutationQueue.length===0?pl:this.tr-1)}getAllMutationBatches(e){return M.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new ut(n,0),s=new ut(n,Number.POSITIVE_INFINITY),i=[];return this.Zr.forEachInRange([r,s],a=>{const c=this.Xr(a.Yr);i.push(c)}),M.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new lt(Re);return n.forEach(s=>{const i=new ut(s,0),a=new ut(s,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([i,a],c=>{r=r.add(c.Yr)})}),M.resolve(this.ti(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,s=r.length+1;let i=r;le.isDocumentKey(i)||(i=i.child(""));const a=new ut(new le(i),0);let c=new lt(Re);return this.Zr.forEachWhile(l=>{const h=l.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(c=c.add(l.Yr)),!0)},a),M.resolve(this.ti(c))}ti(e){const n=[];return e.forEach(r=>{const s=this.Xr(r);s!==null&&n.push(s)}),n}removeMutationBatch(e,n){Ue(this.ni(n.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Zr;return M.forEach(n.mutations,s=>{const i=new ut(s.key,n.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Zr=r})}ir(e){}containsKey(e,n){const r=new ut(n,0),s=this.Zr.firstAfterOrEqual(r);return M.resolve(n.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,M.resolve()}ni(e,n){return this.ei(e)}ei(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Xr(e){const n=this.ei(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bw{constructor(e){this.ri=e,this.docs=function(){return new Xe(le.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,s=this.docs.get(r),i=s?s.size:0,a=this.ri(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return M.resolve(r?r.document.mutableCopy():St.newInvalidDocument(n))}getEntries(e,n){let r=Pn();return n.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():St.newInvalidDocument(s))}),M.resolve(r)}getDocumentsMatchingQuery(e,n,r,s){let i=Pn();const a=n.path,c=new le(a.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){const{key:h,value:{document:f}}=l.getNext();if(!a.isPrefixOf(h.path))break;h.path.length>a.length+1||eI(ZE(f),r)<=0||(s.has(f.key)||la(n,f))&&(i=i.insert(f.key,f.mutableCopy()))}return M.resolve(i)}getAllFromCollectionGroup(e,n,r,s){fe(9500)}ii(e,n){return M.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new Sw(this)}getSize(e){return M.resolve(this.size)}}class Sw extends yw{constructor(e){super(),this.Nr=e}applyChanges(e){const n=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?n.push(this.Nr.addEntry(e,s)):this.Nr.removeEntry(r)}),M.waitFor(n)}getFromCache(e,n){return this.Nr.getEntry(e,n)}getAllFromCache(e,n){return this.Nr.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cw{constructor(e){this.persistence=e,this.si=new xr(n=>_l(n),yl),this.lastRemoteSnapshotVersion=ve.min(),this.highestTargetId=0,this.oi=0,this._i=new bl,this.targetCount=0,this.ai=hs.ur()}forEachTarget(e,n){return this.si.forEach((r,s)=>n(s)),M.resolve()}getLastRemoteSnapshotVersion(e){return M.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return M.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),M.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.oi&&(this.oi=n),M.resolve()}Pr(e){this.si.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.ai=new hs(n),this.highestTargetId=n),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,n){return this.Pr(n),this.targetCount+=1,M.resolve()}updateTargetData(e,n){return this.Pr(n),M.resolve()}removeTargetData(e,n){return this.si.delete(n.target),this._i.jr(n.targetId),this.targetCount-=1,M.resolve()}removeTargets(e,n,r){let s=0;const i=[];return this.si.forEach((a,c)=>{c.sequenceNumber<=n&&r.get(c.targetId)===null&&(this.si.delete(a),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)}),M.waitFor(i).next(()=>s)}getTargetCount(e){return M.resolve(this.targetCount)}getTargetData(e,n){const r=this.si.get(n)||null;return M.resolve(r)}addMatchingKeys(e,n,r){return this._i.Wr(n,r),M.resolve()}removeMatchingKeys(e,n,r){this._i.zr(n,r);const s=this.persistence.referenceDelegate,i=[];return s&&n.forEach(a=>{i.push(s.markPotentiallyOrphaned(e,a))}),M.waitFor(i)}removeMatchingKeysForTargetId(e,n){return this._i.jr(n),M.resolve()}getMatchingKeysForTargetId(e,n){const r=this._i.Hr(n);return M.resolve(r)}containsKey(e,n){return M.resolve(this._i.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rm{constructor(e,n){this.ui={},this.overlays={},this.ci=new ia(0),this.li=!1,this.li=!0,this.hi=new ww,this.referenceDelegate=e(this),this.Pi=new Cw(this),this.indexManager=new hw,this.remoteDocumentCache=function(s){return new bw(s)}(r=>this.referenceDelegate.Ti(r)),this.serializer=new lw(n),this.Ii=new Ew(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new Iw,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.ui[e.toKey()];return r||(r=new Aw(n,this.referenceDelegate),this.ui[e.toKey()]=r),r}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,n,r){te("MemoryPersistence","Starting transaction:",e);const s=new Rw(this.ci.next());return this.referenceDelegate.Ei(),r(s).next(i=>this.referenceDelegate.di(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Ai(e,n){return M.or(Object.values(this.ui).map(r=>()=>r.containsKey(e,n)))}}class Rw extends nI{constructor(e){super(),this.currentSequenceNumber=e}}class Sl{constructor(e){this.persistence=e,this.Ri=new bl,this.Vi=null}static mi(e){return new Sl(e)}get fi(){if(this.Vi)return this.Vi;throw fe(60996)}addReference(e,n,r){return this.Ri.addReference(r,n),this.fi.delete(r.toString()),M.resolve()}removeReference(e,n,r){return this.Ri.removeReference(r,n),this.fi.add(r.toString()),M.resolve()}markPotentiallyOrphaned(e,n){return this.fi.add(n.toString()),M.resolve()}removeTarget(e,n){this.Ri.jr(n.targetId).forEach(s=>this.fi.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(s=>{s.forEach(i=>this.fi.add(i.toString()))}).next(()=>r.removeTargetData(e,n))}Ei(){this.Vi=new Set}di(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return M.forEach(this.fi,r=>{const s=le.fromPath(r);return this.gi(e,s).next(i=>{i||n.removeEntry(s,ve.min())})}).next(()=>(this.Vi=null,n.apply(e)))}updateLimboDocument(e,n){return this.gi(e,n).next(r=>{r?this.fi.delete(n.toString()):this.fi.add(n.toString())})}Ti(e){return 0}gi(e,n){return M.or([()=>M.resolve(this.Ri.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Ai(e,n)])}}class Vo{constructor(e,n){this.persistence=e,this.pi=new xr(r=>iI(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=_w(this,n)}static mi(e,n){return new Vo(e,n)}Ei(){}di(e){return M.resolve()}forEachTarget(e,n){return this.persistence.getTargetCache().forEachTarget(e,n)}gr(e){const n=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>n.next(s=>r+s))}wr(e){let n=0;return this.pr(e,r=>{n++}).next(()=>n)}pr(e,n){return M.forEach(this.pi,(r,s)=>this.br(e,r,s).next(i=>i?M.resolve():n(s)))}removeTargets(e,n,r){return this.persistence.getTargetCache().removeTargets(e,n,r)}removeOrphanedDocuments(e,n){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ii(e,a=>this.br(e,a,n).next(c=>{c||(r++,i.removeEntry(a,ve.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,n){return this.pi.set(n,e.currentSequenceNumber),M.resolve()}removeTarget(e,n){const r=n.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,n,r){return this.pi.set(r,e.currentSequenceNumber),M.resolve()}removeReference(e,n,r){return this.pi.set(r,e.currentSequenceNumber),M.resolve()}updateLimboDocument(e,n){return this.pi.set(n,e.currentSequenceNumber),M.resolve()}Ti(e){let n=e.key.toString().length;return e.isFoundDocument()&&(n+=co(e.data.value)),n}br(e,n,r){return M.or([()=>this.persistence.Ai(e,n),()=>this.persistence.getTargetCache().containsKey(e,n),()=>{const s=this.pi.get(n);return M.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cl{constructor(e,n,r,s){this.targetId=e,this.fromCache=n,this.Es=r,this.ds=s}static As(e,n){let r=Pe(),s=Pe();for(const i of n.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Cl(e,n.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pw{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kw{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=function(){return wT()?8:rI(Ct())>0?6:4}()}initialize(e,n){this.ps=e,this.indexManager=n,this.Rs=!0}getDocumentsMatchingQuery(e,n,r,s){const i={result:null};return this.ys(e,n).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.ws(e,n,s,r).next(a=>{i.result=a})}).next(()=>{if(i.result)return;const a=new Pw;return this.Ss(e,n,a).next(c=>{if(i.result=c,this.Vs)return this.bs(e,n,a,c.size)})}).next(()=>i.result)}bs(e,n,r,s){return r.documentReadCount<this.fs?(Wr()<=Ce.DEBUG&&te("QueryEngine","SDK will not create cache indexes for query:",Gr(n),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),M.resolve()):(Wr()<=Ce.DEBUG&&te("QueryEngine","Query:",Gr(n),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.gs*s?(Wr()<=Ce.DEBUG&&te("QueryEngine","The SDK decides to create cache indexes for query:",Gr(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,sn(n))):M.resolve())}ys(e,n){if(cd(n))return M.resolve(null);let r=sn(n);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(n.limit!==null&&s===1&&(n=Dc(n,null,"F"),r=sn(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const a=Pe(...i);return this.ps.getDocuments(e,a).next(c=>this.indexManager.getMinOffset(e,r).next(l=>{const h=this.Ds(n,c);return this.Cs(n,h,a,l.readTime)?this.ys(e,Dc(n,null,"F")):this.vs(e,h,n,l)}))})))}ws(e,n,r,s){return cd(n)||s.isEqual(ve.min())?M.resolve(null):this.ps.getDocuments(e,r).next(i=>{const a=this.Ds(n,i);return this.Cs(n,a,r,s)?M.resolve(null):(Wr()<=Ce.DEBUG&&te("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Gr(n)),this.vs(e,a,n,YE(s,ui)).next(c=>c))})}Ds(e,n){let r=new lt(om(e));return n.forEach((s,i)=>{la(e,i)&&(r=r.add(i))}),r}Cs(e,n,r,s){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const i=e.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Ss(e,n,r){return Wr()<=Ce.DEBUG&&te("QueryEngine","Using full collection scan to execute query:",Gr(n)),this.ps.getDocumentsMatchingQuery(e,n,rr.min(),r)}vs(e,n,r,s){return this.ps.getDocumentsMatchingQuery(e,r,s).next(i=>(n.forEach(a=>{i=i.insert(a.key,a)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rl="LocalStore",Dw=3e8;class Nw{constructor(e,n,r,s){this.persistence=e,this.Fs=n,this.serializer=s,this.Ms=new Xe(Re),this.xs=new xr(i=>_l(i),yl),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(r)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Tw(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.Ms))}}function xw(t,e,n,r){return new Nw(t,e,n,r)}async function Pm(t,e){const n=Ee(t);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let s;return n.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,n.Bs(e),n.mutationQueue.getAllMutationBatches(r))).next(i=>{const a=[],c=[];let l=Pe();for(const h of s){a.push(h.batchId);for(const f of h.mutations)l=l.add(f.key)}for(const h of i){c.push(h.batchId);for(const f of h.mutations)l=l.add(f.key)}return n.localDocuments.getDocuments(r,l).next(h=>({Ls:h,removedBatchIds:a,addedBatchIds:c}))})})}function Vw(t,e){const n=Ee(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=n.Ns.newChangeBuffer({trackRemovals:!0});return function(c,l,h,f){const p=h.batch,y=p.keys();let b=M.resolve();return y.forEach(R=>{b=b.next(()=>f.getEntry(l,R)).next(N=>{const x=h.docVersions.get(R);Ue(x!==null,48541),N.version.compareTo(x)<0&&(p.applyToRemoteDocument(N,h),N.isValidDocument()&&(N.setReadTime(h.commitVersion),f.addEntry(N)))})}),b.next(()=>c.mutationQueue.removeMutationBatch(l,p))}(n,r,e,i).next(()=>i.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let l=Pe();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(l=l.add(c.batch.mutations[h].key));return l}(e))).next(()=>n.localDocuments.getDocuments(r,s))})}function km(t){const e=Ee(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Pi.getLastRemoteSnapshotVersion(n))}function Ow(t,e){const n=Ee(t),r=e.snapshotVersion;let s=n.Ms;return n.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const a=n.Ns.newChangeBuffer({trackRemovals:!0});s=n.Ms;const c=[];e.targetChanges.forEach((f,p)=>{const y=s.get(p);if(!y)return;c.push(n.Pi.removeMatchingKeys(i,f.removedDocuments,p).next(()=>n.Pi.addMatchingKeys(i,f.addedDocuments,p)));let b=y.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?b=b.withResumeToken(yt.EMPTY_BYTE_STRING,ve.min()).withLastLimboFreeSnapshotVersion(ve.min()):f.resumeToken.approximateByteSize()>0&&(b=b.withResumeToken(f.resumeToken,r)),s=s.insert(p,b),function(N,x,j){return N.resumeToken.approximateByteSize()===0||x.snapshotVersion.toMicroseconds()-N.snapshotVersion.toMicroseconds()>=Dw?!0:j.addedDocuments.size+j.modifiedDocuments.size+j.removedDocuments.size>0}(y,b,f)&&c.push(n.Pi.updateTargetData(i,b))});let l=Pn(),h=Pe();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&c.push(n.persistence.referenceDelegate.updateLimboDocument(i,f))}),c.push(Mw(i,a,e.documentUpdates).next(f=>{l=f.ks,h=f.qs})),!r.isEqual(ve.min())){const f=n.Pi.getLastRemoteSnapshotVersion(i).next(p=>n.Pi.setTargetsMetadata(i,i.currentSequenceNumber,r));c.push(f)}return M.waitFor(c).next(()=>a.apply(i)).next(()=>n.localDocuments.getLocalViewOfDocuments(i,l,h)).next(()=>l)}).then(i=>(n.Ms=s,i))}function Mw(t,e,n){let r=Pe(),s=Pe();return n.forEach(i=>r=r.add(i)),e.getEntries(t,r).next(i=>{let a=Pn();return n.forEach((c,l)=>{const h=i.get(c);l.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(c)),l.isNoDocument()&&l.version.isEqual(ve.min())?(e.removeEntry(c,l.readTime),a=a.insert(c,l)):!h.isValidDocument()||l.version.compareTo(h.version)>0||l.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(l),a=a.insert(c,l)):te(Rl,"Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",l.version)}),{ks:a,qs:s}})}function Lw(t,e){const n=Ee(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=pl),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function Fw(t,e){const n=Ee(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return n.Pi.getTargetData(r,e).next(i=>i?(s=i,M.resolve(s)):n.Pi.allocateTargetId(r).next(a=>(s=new zn(e,a,"TargetPurposeListen",r.currentSequenceNumber),n.Pi.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=n.Ms.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.Ms=n.Ms.insert(r.targetId,r),n.xs.set(e,r.targetId)),r})}async function Mc(t,e,n){const r=Ee(t),s=r.Ms.get(e),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!vs(a))throw a;te(Rl,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Ms=r.Ms.remove(e),r.xs.delete(s.target)}function Ed(t,e,n){const r=Ee(t);let s=ve.min(),i=Pe();return r.persistence.runTransaction("Execute query","readwrite",a=>function(l,h,f){const p=Ee(l),y=p.xs.get(f);return y!==void 0?M.resolve(p.Ms.get(y)):p.Pi.getTargetData(h,f)}(r,a,sn(e)).next(c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(a,c.targetId).next(l=>{i=l})}).next(()=>r.Fs.getDocumentsMatchingQuery(a,e,n?s:ve.min(),n?i:Pe())).next(c=>(Uw(r,AI(e),c),{documents:c,Qs:i})))}function Uw(t,e,n){let r=t.Os.get(e)||ve.min();n.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),t.Os.set(e,r)}class Id{constructor(){this.activeTargetIds=kI()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class $w{constructor(){this.Mo=new Id,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e,n=!0){return n&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,n,r){this.xo[e]=n}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new Id,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bw{Oo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wd="ConnectivityMonitor";class Ad{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){te(wd,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){te(wd,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let to=null;function Lc(){return to===null?to=function(){return 268435456+Math.round(2147483648*Math.random())}():to++,"0x"+to.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ec="RestConnection",jw={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class qw{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Uo=n+"://"+e.host,this.Ko=`projects/${r}/databases/${s}`,this.Wo=this.databaseId.database===Ro?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Go(e,n,r,s,i){const a=Lc(),c=this.zo(e,n.toUriEncodedString());te(ec,`Sending RPC '${e}' ${a}:`,c,r);const l={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(l,s,i);const{host:h}=new URL(c),f=ms(h);return this.Jo(e,c,l,r,f).then(p=>(te(ec,`Received RPC '${e}' ${a}: `,p),p),p=>{throw as(ec,`RPC '${e}' ${a} failed with error: `,p,"url: ",c,"request:",r),p})}Ho(e,n,r,s,i,a){return this.Go(e,n,r,s,i)}jo(e,n,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+_s}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}zo(e,n){const r=jw[e];return`${this.Uo}/v1/${n}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hw{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const It="WebChannelConnection";class zw extends qw{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,n,r,s,i){const a=Lc();return new Promise((c,l)=>{const h=new xp;h.setWithCredentials(!0),h.listenOnce(Vp.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case ao.NO_ERROR:const p=h.getResponseJson();te(It,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(p)),c(p);break;case ao.TIMEOUT:te(It,`RPC '${e}' ${a} timed out`),l(new ee(O.DEADLINE_EXCEEDED,"Request time out"));break;case ao.HTTP_ERROR:const y=h.getStatus();if(te(It,`RPC '${e}' ${a} failed with status:`,y,"response text:",h.getResponseText()),y>0){let b=h.getResponseJson();Array.isArray(b)&&(b=b[0]);const R=b?.error;if(R&&R.status&&R.message){const N=function(j){const W=j.toLowerCase().replace(/_/g,"-");return Object.values(O).indexOf(W)>=0?W:O.UNKNOWN}(R.status);l(new ee(N,R.message))}else l(new ee(O.UNKNOWN,"Server responded with status "+h.getStatus()))}else l(new ee(O.UNAVAILABLE,"Connection failed."));break;default:fe(9055,{l_:e,streamId:a,h_:h.getLastErrorCode(),P_:h.getLastError()})}}finally{te(It,`RPC '${e}' ${a} completed.`)}});const f=JSON.stringify(s);te(It,`RPC '${e}' ${a} sending request:`,s),h.send(n,"POST",f,r,15)})}T_(e,n,r){const s=Lc(),i=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=Lp(),c=Mp(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(l.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(l.useFetchStreams=!0),this.jo(l.initMessageHeaders,n,r),l.encodeInitMessageHeaders=!0;const f=i.join("");te(It,`Creating RPC '${e}' stream ${s}: ${f}`,l);const p=a.createWebChannel(f,l);this.I_(p);let y=!1,b=!1;const R=new Hw({Yo:x=>{b?te(It,`Not sending because RPC '${e}' stream ${s} is closed:`,x):(y||(te(It,`Opening RPC '${e}' stream ${s} transport.`),p.open(),y=!0),te(It,`RPC '${e}' stream ${s} sending:`,x),p.send(x))},Zo:()=>p.close()}),N=(x,j,W)=>{x.listen(j,K=>{try{W(K)}catch(z){setTimeout(()=>{throw z},0)}})};return N(p,Us.EventType.OPEN,()=>{b||(te(It,`RPC '${e}' stream ${s} transport opened.`),R.o_())}),N(p,Us.EventType.CLOSE,()=>{b||(b=!0,te(It,`RPC '${e}' stream ${s} transport closed`),R.a_(),this.E_(p))}),N(p,Us.EventType.ERROR,x=>{b||(b=!0,as(It,`RPC '${e}' stream ${s} transport errored. Name:`,x.name,"Message:",x.message),R.a_(new ee(O.UNAVAILABLE,"The operation could not be completed")))}),N(p,Us.EventType.MESSAGE,x=>{if(!b){const j=x.data[0];Ue(!!j,16349);const W=j,K=W?.error||W[0]?.error;if(K){te(It,`RPC '${e}' stream ${s} received error:`,K);const z=K.status;let ce=function(g){const _=et[g];if(_!==void 0)return _m(_)}(z),Ie=K.message;ce===void 0&&(ce=O.INTERNAL,Ie="Unknown error status: "+z+" with message "+K.message),b=!0,R.a_(new ee(ce,Ie)),p.close()}else te(It,`RPC '${e}' stream ${s} received:`,j),R.u_(j)}}),N(c,Op.STAT_EVENT,x=>{x.stat===Ac.PROXY?te(It,`RPC '${e}' stream ${s} detected buffering proxy`):x.stat===Ac.NOPROXY&&te(It,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{R.__()},0),R}terminate(){this.c_.forEach(e=>e.close()),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter(n=>n===e)}}function tc(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fa(t){return new QI(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dm{constructor(e,n,r=1e3,s=1.5,i=6e4){this.Mi=e,this.timerId=n,this.d_=r,this.A_=s,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const n=Math.floor(this.V_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,n-r);s>0&&te("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,s,()=>(this.f_=Date.now(),e())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bd="PersistentStream";class Nm{constructor(e,n,r,s,i,a,c,l){this.Mi=e,this.S_=r,this.b_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Dm(e,n)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,n){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():n&&n.code===O.RESOURCE_EXHAUSTED?(Rn(n.toString()),Rn("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):n&&n.code===O.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(n)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),n=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.D_===n&&this.G_(r,s)},r=>{e(()=>{const s=new ee(O.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)})})}G_(e,n){const r=this.W_(this.D_);this.stream=this.j_(e,n),this.stream.Xo(()=>{r(()=>this.listener.Xo())}),this.stream.t_(()=>{r(()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.t_()))}),this.stream.r_(s=>{r(()=>this.z_(s))}),this.stream.onMessage(s=>{r(()=>++this.F_==1?this.J_(s):this.onNext(s))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return te(bd,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return n=>{this.Mi.enqueueAndForget(()=>this.D_===e?n():(te(bd,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Ww extends Nm{constructor(e,n,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,s,a),this.serializer=i}j_(e,n){return this.connection.T_("Listen",e,n)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const n=YI(this.serializer,e),r=function(i){if(!("targetChange"in i))return ve.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?ve.min():a.readTime?an(a.readTime):ve.min()}(e);return this.listener.H_(n,r)}Y_(e){const n={};n.database=Oc(this.serializer),n.addTarget=function(i,a){let c;const l=a.target;if(c=Pc(l)?{documents:tw(i,l)}:{query:nw(i,l).ft},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=Tm(i,a.resumeToken);const h=Nc(i,a.expectedCount);h!==null&&(c.expectedCount=h)}else if(a.snapshotVersion.compareTo(ve.min())>0){c.readTime=xo(i,a.snapshotVersion.toTimestamp());const h=Nc(i,a.expectedCount);h!==null&&(c.expectedCount=h)}return c}(this.serializer,e);const r=sw(this.serializer,e);r&&(n.labels=r),this.q_(n)}Z_(e){const n={};n.database=Oc(this.serializer),n.removeTarget=e,this.q_(n)}}class Gw extends Nm{constructor(e,n,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,s,a),this.serializer=i}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,n){return this.connection.T_("Write",e,n)}J_(e){return Ue(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,Ue(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){Ue(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const n=ew(e.writeResults,e.commitTime),r=an(e.commitTime);return this.listener.na(r,n)}ra(){const e={};e.database=Oc(this.serializer),this.q_(e)}ea(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>ZI(this.serializer,r))};this.q_(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kw{}class Qw extends Kw{constructor(e,n,r,s){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new ee(O.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,n,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.Go(e,xc(n,r),s,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===O.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new ee(O.UNKNOWN,i.toString())})}Ho(e,n,r,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.Ho(e,xc(n,r),s,a,c,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===O.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new ee(O.UNKNOWN,a.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class Xw{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Rn(n),this.aa=!1):te("OnlineStateTracker",n)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pr="RemoteStore";class Jw{constructor(e,n,r,s,i){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=i,this.Aa.Oo(a=>{r.enqueueAndForget(async()=>{Or(this)&&(te(Pr,"Restarting streams for network reachability change."),await async function(l){const h=Ee(l);h.Ea.add(4),await Si(h),h.Ra.set("Unknown"),h.Ea.delete(4),await pa(h)}(this))})}),this.Ra=new Xw(r,s)}}async function pa(t){if(Or(t))for(const e of t.da)await e(!0)}async function Si(t){for(const e of t.da)await e(!1)}function xm(t,e){const n=Ee(t);n.Ia.has(e.targetId)||(n.Ia.set(e.targetId,e),Nl(n)?Dl(n):Es(n).O_()&&kl(n,e))}function Pl(t,e){const n=Ee(t),r=Es(n);n.Ia.delete(e),r.O_()&&Vm(n,e),n.Ia.size===0&&(r.O_()?r.L_():Or(n)&&n.Ra.set("Unknown"))}function kl(t,e){if(t.Va.Ue(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(ve.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}Es(t).Y_(e)}function Vm(t,e){t.Va.Ue(e),Es(t).Z_(e)}function Dl(t){t.Va=new zI({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),At:e=>t.Ia.get(e)||null,ht:()=>t.datastore.serializer.databaseId}),Es(t).start(),t.Ra.ua()}function Nl(t){return Or(t)&&!Es(t).x_()&&t.Ia.size>0}function Or(t){return Ee(t).Ea.size===0}function Om(t){t.Va=void 0}async function Yw(t){t.Ra.set("Online")}async function Zw(t){t.Ia.forEach((e,n)=>{kl(t,e)})}async function e0(t,e){Om(t),Nl(t)?(t.Ra.ha(e),Dl(t)):t.Ra.set("Unknown")}async function t0(t,e,n){if(t.Ra.set("Online"),e instanceof vm&&e.state===2&&e.cause)try{await async function(s,i){const a=i.cause;for(const c of i.targetIds)s.Ia.has(c)&&(await s.remoteSyncer.rejectListen(c,a),s.Ia.delete(c),s.Va.removeTarget(c))}(t,e)}catch(r){te(Pr,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Oo(t,r)}else if(e instanceof ho?t.Va.Ze(e):e instanceof ym?t.Va.st(e):t.Va.tt(e),!n.isEqual(ve.min()))try{const r=await km(t.localStore);n.compareTo(r)>=0&&await function(i,a){const c=i.Va.Tt(a);return c.targetChanges.forEach((l,h)=>{if(l.resumeToken.approximateByteSize()>0){const f=i.Ia.get(h);f&&i.Ia.set(h,f.withResumeToken(l.resumeToken,a))}}),c.targetMismatches.forEach((l,h)=>{const f=i.Ia.get(l);if(!f)return;i.Ia.set(l,f.withResumeToken(yt.EMPTY_BYTE_STRING,f.snapshotVersion)),Vm(i,l);const p=new zn(f.target,l,h,f.sequenceNumber);kl(i,p)}),i.remoteSyncer.applyRemoteEvent(c)}(t,n)}catch(r){te(Pr,"Failed to raise snapshot:",r),await Oo(t,r)}}async function Oo(t,e,n){if(!vs(e))throw e;t.Ea.add(1),await Si(t),t.Ra.set("Offline"),n||(n=()=>km(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{te(Pr,"Retrying IndexedDB access"),await n(),t.Ea.delete(1),await pa(t)})}function Mm(t,e){return e().catch(n=>Oo(t,n,e))}async function ma(t){const e=Ee(t),n=ar(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:pl;for(;n0(e);)try{const s=await Lw(e.localStore,r);if(s===null){e.Ta.length===0&&n.L_();break}r=s.batchId,r0(e,s)}catch(s){await Oo(e,s)}Lm(e)&&Fm(e)}function n0(t){return Or(t)&&t.Ta.length<10}function r0(t,e){t.Ta.push(e);const n=ar(t);n.O_()&&n.X_&&n.ea(e.mutations)}function Lm(t){return Or(t)&&!ar(t).x_()&&t.Ta.length>0}function Fm(t){ar(t).start()}async function s0(t){ar(t).ra()}async function i0(t){const e=ar(t);for(const n of t.Ta)e.ea(n.mutations)}async function o0(t,e,n){const r=t.Ta.shift(),s=Il.from(r,e,n);await Mm(t,()=>t.remoteSyncer.applySuccessfulWrite(s)),await ma(t)}async function a0(t,e){e&&ar(t).X_&&await async function(r,s){if(function(a){return jI(a)&&a!==O.ABORTED}(s.code)){const i=r.Ta.shift();ar(r).B_(),await Mm(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await ma(r)}}(t,e),Lm(t)&&Fm(t)}async function Sd(t,e){const n=Ee(t);n.asyncQueue.verifyOperationInProgress(),te(Pr,"RemoteStore received new credentials");const r=Or(n);n.Ea.add(3),await Si(n),r&&n.Ra.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.Ea.delete(3),await pa(n)}async function c0(t,e){const n=Ee(t);e?(n.Ea.delete(2),await pa(n)):e||(n.Ea.add(2),await Si(n),n.Ra.set("Unknown"))}function Es(t){return t.ma||(t.ma=function(n,r,s){const i=Ee(n);return i.sa(),new Ww(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(t.datastore,t.asyncQueue,{Xo:Yw.bind(null,t),t_:Zw.bind(null,t),r_:e0.bind(null,t),H_:t0.bind(null,t)}),t.da.push(async e=>{e?(t.ma.B_(),Nl(t)?Dl(t):t.Ra.set("Unknown")):(await t.ma.stop(),Om(t))})),t.ma}function ar(t){return t.fa||(t.fa=function(n,r,s){const i=Ee(n);return i.sa(),new Gw(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(t.datastore,t.asyncQueue,{Xo:()=>Promise.resolve(),t_:s0.bind(null,t),r_:a0.bind(null,t),ta:i0.bind(null,t),na:o0.bind(null,t)}),t.da.push(async e=>{e?(t.fa.B_(),await ma(t)):(await t.fa.stop(),t.Ta.length>0&&(te(Pr,`Stopping write stream with ${t.Ta.length} pending writes`),t.Ta=[]))})),t.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xl{constructor(e,n,r,s,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new wr,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,s,i){const a=Date.now()+r,c=new xl(e,n,a,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new ee(O.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Vl(t,e){if(Rn("AsyncQueue",`${e}: ${t}`),vs(t))return new ee(O.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class es{static emptySet(e){return new es(e.comparator)}constructor(e){this.comparator=e?(n,r)=>e(n,r)||le.comparator(n.key,r.key):(n,r)=>le.comparator(n.key,r.key),this.keyedMap=$s(),this.sortedSet=new Xe(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof es)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new es;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cd{constructor(){this.ga=new Xe(le.comparator)}track(e){const n=e.doc.key,r=this.ga.get(n);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(n,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(n):e.type===1&&r.type===2?this.ga=this.ga.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(n,{type:2,doc:e.doc}):fe(63341,{Rt:e,pa:r}):this.ga=this.ga.insert(n,e)}ya(){const e=[];return this.ga.inorderTraversal((n,r)=>{e.push(r)}),e}}class ds{constructor(e,n,r,s,i,a,c,l,h){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=h}static fromInitialDocuments(e,n,r,s,i){const a=[];return n.forEach(c=>{a.push({type:0,doc:c})}),new ds(e,n,es.emptySet(n),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ca(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let s=0;s<n.length;s++)if(n[s].type!==r[s].type||!n[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class l0{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class u0{constructor(){this.queries=Rd(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(n,r){const s=Ee(n),i=s.queries;s.queries=Rd(),i.forEach((a,c)=>{for(const l of c.Sa)l.onError(r)})})(this,new ee(O.ABORTED,"Firestore shutting down"))}}function Rd(){return new xr(t=>im(t),ca)}async function h0(t,e){const n=Ee(t);let r=3;const s=e.query;let i=n.queries.get(s);i?!i.ba()&&e.Da()&&(r=2):(i=new l0,r=e.Da()?0:1);try{switch(r){case 0:i.wa=await n.onListen(s,!0);break;case 1:i.wa=await n.onListen(s,!1);break;case 2:await n.onFirstRemoteStoreListen(s)}}catch(a){const c=Vl(a,`Initialization of query '${Gr(e.query)}' failed`);return void e.onError(c)}n.queries.set(s,i),i.Sa.push(e),e.va(n.onlineState),i.wa&&e.Fa(i.wa)&&Ol(n)}async function d0(t,e){const n=Ee(t),r=e.query;let s=3;const i=n.queries.get(r);if(i){const a=i.Sa.indexOf(e);a>=0&&(i.Sa.splice(a,1),i.Sa.length===0?s=e.Da()?0:1:!i.ba()&&e.Da()&&(s=2))}switch(s){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function f0(t,e){const n=Ee(t);let r=!1;for(const s of e){const i=s.query,a=n.queries.get(i);if(a){for(const c of a.Sa)c.Fa(s)&&(r=!0);a.wa=s}}r&&Ol(n)}function p0(t,e,n){const r=Ee(t),s=r.queries.get(e);if(s)for(const i of s.Sa)i.onError(n);r.queries.delete(e)}function Ol(t){t.Ca.forEach(e=>{e.next()})}var Fc,Pd;(Pd=Fc||(Fc={})).Ma="default",Pd.Cache="cache";class m0{constructor(e,n,r){this.query=e,this.xa=n,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new ds(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),n=!0):this.La(e,this.onlineState)&&(this.ka(e),n=!0),this.Na=e,n}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let n=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),n=!0),n}La(e,n){if(!e.fromCache||!this.Da())return!0;const r=n!=="Offline";return(!this.options.qa||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const n=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}ka(e){e=ds.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Fc.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Um{constructor(e){this.key=e}}class $m{constructor(e){this.key=e}}class g0{constructor(e,n){this.query=e,this.Ya=n,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=Pe(),this.mutatedKeys=Pe(),this.eu=om(e),this.tu=new es(this.eu)}get nu(){return this.Ya}ru(e,n){const r=n?n.iu:new Cd,s=n?n.tu:this.tu;let i=n?n.mutatedKeys:this.mutatedKeys,a=s,c=!1;const l=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((f,p)=>{const y=s.get(f),b=la(this.query,p)?p:null,R=!!y&&this.mutatedKeys.has(y.key),N=!!b&&(b.hasLocalMutations||this.mutatedKeys.has(b.key)&&b.hasCommittedMutations);let x=!1;y&&b?y.data.isEqual(b.data)?R!==N&&(r.track({type:3,doc:b}),x=!0):this.su(y,b)||(r.track({type:2,doc:b}),x=!0,(l&&this.eu(b,l)>0||h&&this.eu(b,h)<0)&&(c=!0)):!y&&b?(r.track({type:0,doc:b}),x=!0):y&&!b&&(r.track({type:1,doc:y}),x=!0,(l||h)&&(c=!0)),x&&(b?(a=a.add(b),i=N?i.add(f):i.delete(f)):(a=a.delete(f),i=i.delete(f)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),i=i.delete(f.key),r.track({type:1,doc:f})}return{tu:a,iu:r,Cs:c,mutatedKeys:i}}su(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r,s){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const a=e.iu.ya();a.sort((f,p)=>function(b,R){const N=x=>{switch(x){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return fe(20277,{Rt:x})}};return N(b)-N(R)}(f.type,p.type)||this.eu(f.doc,p.doc)),this.ou(r),s=s??!1;const c=n&&!s?this._u():[],l=this.Xa.size===0&&this.current&&!s?1:0,h=l!==this.Za;return this.Za=l,a.length!==0||h?{snapshot:new ds(this.query,e.tu,i,a,e.mutatedKeys,l===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Cd,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(n=>this.Ya=this.Ya.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Ya=this.Ya.delete(n)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=Pe(),this.tu.forEach(r=>{this.uu(r.key)&&(this.Xa=this.Xa.add(r.key))});const n=[];return e.forEach(r=>{this.Xa.has(r)||n.push(new $m(r))}),this.Xa.forEach(r=>{e.has(r)||n.push(new Um(r))}),n}cu(e){this.Ya=e.Qs,this.Xa=Pe();const n=this.ru(e.documents);return this.applyChanges(n,!0)}lu(){return ds.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const Ml="SyncEngine";class _0{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class y0{constructor(e){this.key=e,this.hu=!1}}class v0{constructor(e,n,r,s,i,a){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new xr(c=>im(c),ca),this.Iu=new Map,this.Eu=new Set,this.du=new Xe(le.comparator),this.Au=new Map,this.Ru=new bl,this.Vu={},this.mu=new Map,this.fu=hs.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function T0(t,e,n=!0){const r=Wm(t);let s;const i=r.Tu.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await Bm(r,e,n,!0),s}async function E0(t,e){const n=Wm(t);await Bm(n,e,!0,!1)}async function Bm(t,e,n,r){const s=await Fw(t.localStore,sn(e)),i=s.targetId,a=t.sharedClientState.addLocalQueryTarget(i,n);let c;return r&&(c=await I0(t,e,i,a==="current",s.resumeToken)),t.isPrimaryClient&&n&&xm(t.remoteStore,s),c}async function I0(t,e,n,r,s){t.pu=(p,y,b)=>async function(N,x,j,W){let K=x.view.ru(j);K.Cs&&(K=await Ed(N.localStore,x.query,!1).then(({documents:w})=>x.view.ru(w,K)));const z=W&&W.targetChanges.get(x.targetId),ce=W&&W.targetMismatches.get(x.targetId)!=null,Ie=x.view.applyChanges(K,N.isPrimaryClient,z,ce);return Dd(N,x.targetId,Ie.au),Ie.snapshot}(t,p,y,b);const i=await Ed(t.localStore,e,!0),a=new g0(e,i.Qs),c=a.ru(i.documents),l=bi.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",s),h=a.applyChanges(c,t.isPrimaryClient,l);Dd(t,n,h.au);const f=new _0(e,n,a);return t.Tu.set(e,f),t.Iu.has(n)?t.Iu.get(n).push(e):t.Iu.set(n,[e]),h.snapshot}async function w0(t,e,n){const r=Ee(t),s=r.Tu.get(e),i=r.Iu.get(s.targetId);if(i.length>1)return r.Iu.set(s.targetId,i.filter(a=>!ca(a,e))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Mc(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),n&&Pl(r.remoteStore,s.targetId),Uc(r,s.targetId)}).catch(ys)):(Uc(r,s.targetId),await Mc(r.localStore,s.targetId,!0))}async function A0(t,e){const n=Ee(t),r=n.Tu.get(e),s=n.Iu.get(r.targetId);n.isPrimaryClient&&s.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),Pl(n.remoteStore,r.targetId))}async function b0(t,e,n){const r=N0(t);try{const s=await function(a,c){const l=Ee(a),h=Ge.now(),f=c.reduce((b,R)=>b.add(R.key),Pe());let p,y;return l.persistence.runTransaction("Locally write mutations","readwrite",b=>{let R=Pn(),N=Pe();return l.Ns.getEntries(b,f).next(x=>{R=x,R.forEach((j,W)=>{W.isValidDocument()||(N=N.add(j))})}).next(()=>l.localDocuments.getOverlayedDocuments(b,R)).next(x=>{p=x;const j=[];for(const W of c){const K=LI(W,p.get(W.key).overlayedDocument);K!=null&&j.push(new Vr(W.key,K,Jp(K.value.mapValue),on.exists(!0)))}return l.mutationQueue.addMutationBatch(b,h,j,c)}).next(x=>{y=x;const j=x.applyToLocalDocumentSet(p,N);return l.documentOverlayCache.saveOverlays(b,x.batchId,j)})}).then(()=>({batchId:y.batchId,changes:cm(p)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(a,c,l){let h=a.Vu[a.currentUser.toKey()];h||(h=new Xe(Re)),h=h.insert(c,l),a.Vu[a.currentUser.toKey()]=h}(r,s.batchId,n),await Ci(r,s.changes),await ma(r.remoteStore)}catch(s){const i=Vl(s,"Failed to persist write");n.reject(i)}}async function jm(t,e){const n=Ee(t);try{const r=await Ow(n.localStore,e);e.targetChanges.forEach((s,i)=>{const a=n.Au.get(i);a&&(Ue(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.hu=!0:s.modifiedDocuments.size>0?Ue(a.hu,14607):s.removedDocuments.size>0&&(Ue(a.hu,42227),a.hu=!1))}),await Ci(n,r,e)}catch(r){await ys(r)}}function kd(t,e,n){const r=Ee(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const s=[];r.Tu.forEach((i,a)=>{const c=a.view.va(e);c.snapshot&&s.push(c.snapshot)}),function(a,c){const l=Ee(a);l.onlineState=c;let h=!1;l.queries.forEach((f,p)=>{for(const y of p.Sa)y.va(c)&&(h=!0)}),h&&Ol(l)}(r.eventManager,e),s.length&&r.Pu.H_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function S0(t,e,n){const r=Ee(t);r.sharedClientState.updateQueryState(e,"rejected",n);const s=r.Au.get(e),i=s&&s.key;if(i){let a=new Xe(le.comparator);a=a.insert(i,St.newNoDocument(i,ve.min()));const c=Pe().add(i),l=new da(ve.min(),new Map,new Xe(Re),a,c);await jm(r,l),r.du=r.du.remove(i),r.Au.delete(e),Ll(r)}else await Mc(r.localStore,e,!1).then(()=>Uc(r,e,n)).catch(ys)}async function C0(t,e){const n=Ee(t),r=e.batch.batchId;try{const s=await Vw(n.localStore,e);Hm(n,r,null),qm(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Ci(n,s)}catch(s){await ys(s)}}async function R0(t,e,n){const r=Ee(t);try{const s=await function(a,c){const l=Ee(a);return l.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let f;return l.mutationQueue.lookupMutationBatch(h,c).next(p=>(Ue(p!==null,37113),f=p.keys(),l.mutationQueue.removeMutationBatch(h,p))).next(()=>l.mutationQueue.performConsistencyCheck(h)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(h,f,c)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f)).next(()=>l.localDocuments.getDocuments(h,f))})}(r.localStore,e);Hm(r,e,n),qm(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await Ci(r,s)}catch(s){await ys(s)}}function qm(t,e){(t.mu.get(e)||[]).forEach(n=>{n.resolve()}),t.mu.delete(e)}function Hm(t,e,n){const r=Ee(t);let s=r.Vu[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(n?i.reject(n):i.resolve(),s=s.remove(e)),r.Vu[r.currentUser.toKey()]=s}}function Uc(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Iu.get(e))t.Tu.delete(r),n&&t.Pu.yu(r,n);t.Iu.delete(e),t.isPrimaryClient&&t.Ru.jr(e).forEach(r=>{t.Ru.containsKey(r)||zm(t,r)})}function zm(t,e){t.Eu.delete(e.path.canonicalString());const n=t.du.get(e);n!==null&&(Pl(t.remoteStore,n),t.du=t.du.remove(e),t.Au.delete(n),Ll(t))}function Dd(t,e,n){for(const r of n)r instanceof Um?(t.Ru.addReference(r.key,e),P0(t,r)):r instanceof $m?(te(Ml,"Document no longer in limbo: "+r.key),t.Ru.removeReference(r.key,e),t.Ru.containsKey(r.key)||zm(t,r.key)):fe(19791,{wu:r})}function P0(t,e){const n=e.key,r=n.path.canonicalString();t.du.get(n)||t.Eu.has(r)||(te(Ml,"New document in limbo: "+n),t.Eu.add(r),Ll(t))}function Ll(t){for(;t.Eu.size>0&&t.du.size<t.maxConcurrentLimboResolutions;){const e=t.Eu.values().next().value;t.Eu.delete(e);const n=new le(He.fromString(e)),r=t.fu.next();t.Au.set(r,new y0(n)),t.du=t.du.insert(n,r),xm(t.remoteStore,new zn(sn(vl(n.path)),r,"TargetPurposeLimboResolution",ia.ce))}}async function Ci(t,e,n){const r=Ee(t),s=[],i=[],a=[];r.Tu.isEmpty()||(r.Tu.forEach((c,l)=>{a.push(r.pu(l,e,n).then(h=>{if((h||n)&&r.isPrimaryClient){const f=h?!h.fromCache:n?.targetChanges.get(l.targetId)?.current;r.sharedClientState.updateQueryState(l.targetId,f?"current":"not-current")}if(h){s.push(h);const f=Cl.As(l.targetId,h);i.push(f)}}))}),await Promise.all(a),r.Pu.H_(s),await async function(l,h){const f=Ee(l);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>M.forEach(h,y=>M.forEach(y.Es,b=>f.persistence.referenceDelegate.addReference(p,y.targetId,b)).next(()=>M.forEach(y.ds,b=>f.persistence.referenceDelegate.removeReference(p,y.targetId,b)))))}catch(p){if(!vs(p))throw p;te(Rl,"Failed to update sequence numbers: "+p)}for(const p of h){const y=p.targetId;if(!p.fromCache){const b=f.Ms.get(y),R=b.snapshotVersion,N=b.withLastLimboFreeSnapshotVersion(R);f.Ms=f.Ms.insert(y,N)}}}(r.localStore,i))}async function k0(t,e){const n=Ee(t);if(!n.currentUser.isEqual(e)){te(Ml,"User change. New user:",e.toKey());const r=await Pm(n.localStore,e);n.currentUser=e,function(i,a){i.mu.forEach(c=>{c.forEach(l=>{l.reject(new ee(O.CANCELLED,a))})}),i.mu.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Ci(n,r.Ls)}}function D0(t,e){const n=Ee(t),r=n.Au.get(e);if(r&&r.hu)return Pe().add(r.key);{let s=Pe();const i=n.Iu.get(e);if(!i)return s;for(const a of i){const c=n.Tu.get(a);s=s.unionWith(c.view.nu)}return s}}function Wm(t){const e=Ee(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=jm.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=D0.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=S0.bind(null,e),e.Pu.H_=f0.bind(null,e.eventManager),e.Pu.yu=p0.bind(null,e.eventManager),e}function N0(t){const e=Ee(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=C0.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=R0.bind(null,e),e}class Mo{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=fa(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,n){return null}Mu(e,n){return null}vu(e){return xw(this.persistence,new kw,e.initialUser,this.serializer)}Cu(e){return new Rm(Sl.mi,this.serializer)}Du(e){return new $w}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Mo.provider={build:()=>new Mo};class x0 extends Mo{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,n){Ue(this.persistence.referenceDelegate instanceof Vo,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new mw(r,e.asyncQueue,n)}Cu(e){const n=this.cacheSizeBytes!==void 0?Vt.withCacheSize(this.cacheSizeBytes):Vt.DEFAULT;return new Rm(r=>Vo.mi(r,n),this.serializer)}}class $c{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>kd(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=k0.bind(null,this.syncEngine),await c0(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new u0}()}createDatastore(e){const n=fa(e.databaseInfo.databaseId),r=function(i){return new zw(i)}(e.databaseInfo);return function(i,a,c,l){return new Qw(i,a,c,l)}(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return function(r,s,i,a,c){return new Jw(r,s,i,a,c)}(this.localStore,this.datastore,e.asyncQueue,n=>kd(this.syncEngine,n,0),function(){return Ad.v()?new Ad:new Bw}())}createSyncEngine(e,n){return function(s,i,a,c,l,h,f){const p=new v0(s,i,a,c,l,h);return f&&(p.gu=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){await async function(n){const r=Ee(n);te(Pr,"RemoteStore shutting down."),r.Ea.add(5),await Si(r),r.Aa.shutdown(),r.Ra.set("Unknown")}(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}$c.provider={build:()=>new $c};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V0{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):Rn("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cr="FirestoreClient";class O0{constructor(e,n,r,s,i){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=s,this.user=At.UNAUTHENTICATED,this.clientId=fl.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async a=>{te(cr,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(te(cr,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new wr;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=Vl(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function nc(t,e){t.asyncQueue.verifyOperationInProgress(),te(cr,"Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async s=>{r.isEqual(s)||(await Pm(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function Nd(t,e){t.asyncQueue.verifyOperationInProgress();const n=await M0(t);te(cr,"Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(r=>Sd(e.remoteStore,r)),t.setAppCheckTokenChangeListener((r,s)=>Sd(e.remoteStore,s)),t._onlineComponents=e}async function M0(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){te(cr,"Using user provided OfflineComponentProvider");try{await nc(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(s){return s.name==="FirebaseError"?s.code===O.FAILED_PRECONDITION||s.code===O.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(n))throw n;as("Error using user provided cache. Falling back to memory cache: "+n),await nc(t,new Mo)}}else te(cr,"Using default OfflineComponentProvider"),await nc(t,new x0(void 0));return t._offlineComponents}async function Gm(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(te(cr,"Using user provided OnlineComponentProvider"),await Nd(t,t._uninitializedComponentsProvider._online)):(te(cr,"Using default OnlineComponentProvider"),await Nd(t,new $c))),t._onlineComponents}function L0(t){return Gm(t).then(e=>e.syncEngine)}async function xd(t){const e=await Gm(t),n=e.eventManager;return n.onListen=T0.bind(null,e.syncEngine),n.onUnlisten=w0.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=E0.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=A0.bind(null,e.syncEngine),n}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Km(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vd=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qm="firestore.googleapis.com",Od=!0;class Md{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new ee(O.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Qm,this.ssl=Od}else this.host=e.host,this.ssl=e.ssl??Od;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Cm;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<fw)throw new ee(O.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}JE("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Km(e.experimentalLongPollingOptions??{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new ee(O.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new ee(O.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new ee(O.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class ga{constructor(e,n,r,s){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Md({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new ee(O.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new ee(O.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Md(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new BE;switch(r.type){case"firstParty":return new zE(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new ee(O.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=Vd.get(n);r&&(te("ComponentProvider","Removing Datastore"),Vd.delete(n),r.terminate())}(this),Promise.resolve()}}function F0(t,e,n,r={}){t=Zr(t,ga);const s=ms(e),i=t._getSettings(),a={...i,emulatorOptions:t._getEmulatorOptions()},c=`${e}:${n}`;s&&(Ap(`https://${c}`),bp("Firestore",!0)),i.host!==Qm&&i.host!==c&&as("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const l={...i,host:c,ssl:s,emulatorOptions:r};if(!Sr(l,a)&&(t._setSettings(l),r.mockUserToken)){let h,f;if(typeof r.mockUserToken=="string")h=r.mockUserToken,f=At.MOCK_USER;else{h=pT(r.mockUserToken,t._app?.options.projectId);const p=r.mockUserToken.sub||r.mockUserToken.user_id;if(!p)throw new ee(O.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");f=new At(p)}t._authCredentials=new jE(new Up(h,f))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mr{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Mr(this.firestore,e,this._query)}}class ct{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Yn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new ct(this.firestore,e,this._key)}toJSON(){return{type:ct._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,n,r){if(wi(n,ct._jsonSchema))return new ct(e,r||null,new le(He.fromString(n.referencePath)))}}ct._jsonSchemaVersion="firestore/documentReference/1.0",ct._jsonSchema={type:it("string",ct._jsonSchemaVersion),referencePath:it("string")};class Yn extends Mr{constructor(e,n,r){super(e,n,vl(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new ct(this.firestore,null,new le(e))}withConverter(e){return new Yn(this.firestore,e,this._path)}}function Xm(t,e,...n){if(t=xt(t),$p("collection","path",e),t instanceof ga){const r=He.fromString(e,...n);return Kh(r),new Yn(t,null,r)}{if(!(t instanceof ct||t instanceof Yn))throw new ee(O.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(He.fromString(e,...n));return Kh(r),new Yn(t.firestore,null,r)}}function Jm(t,e,...n){if(t=xt(t),arguments.length===1&&(e=fl.newId()),$p("doc","path",e),t instanceof ga){const r=He.fromString(e,...n);return Gh(r),new ct(t,null,new le(r))}{if(!(t instanceof ct||t instanceof Yn))throw new ee(O.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(He.fromString(e,...n));return Gh(r),new ct(t.firestore,t instanceof Yn?t.converter:null,new le(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ld="AsyncQueue";class Fd{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Dm(this,"async_queue_retry"),this._c=()=>{const r=tc();r&&te(Ld,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const n=tc();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const n=tc();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const n=new wr;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xu.push(e),this.lc()))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!vs(e))throw e;te(Ld,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const n=this.ac.then(()=>(this.rc=!0,e().catch(r=>{throw this.nc=r,this.rc=!1,Rn("INTERNAL UNHANDLED ERROR: ",Ud(r)),r}).then(r=>(this.rc=!1,r))));return this.ac=n,n}enqueueAfterDelay(e,n,r){this.uc(),this.oc.indexOf(e)>-1&&(n=0);const s=xl.createAndSchedule(this,e,n,r,i=>this.hc(i));return this.tc.push(s),s}uc(){this.nc&&fe(47125,{Pc:Ud(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const n of this.tc)if(n.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.tc)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.Tc()})}dc(e){this.oc.push(e)}hc(e){const n=this.tc.indexOf(e);this.tc.splice(n,1)}}function Ud(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+`
`+t.stack),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $d(t){return function(n,r){if(typeof n!="object"||n===null)return!1;const s=n;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(t,["next","error","complete"])}class _i extends ga{constructor(e,n,r,s){super(e,n,r,s),this.type="firestore",this._queue=new Fd,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Fd(e),this._firestoreClient=void 0,await e}}}function U0(t,e){const n=typeof t=="object"?t:Pp(),r=typeof t=="string"?t:Ro,s=hl(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=dT("firestore");i&&F0(s,...i)}return s}function Ym(t){if(t._terminated)throw new ee(O.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||$0(t),t._firestoreClient}function $0(t){const e=t._freezeSettings(),n=function(s,i,a,c){return new cI(s,i,a,c.host,c.ssl,c.experimentalForceLongPolling,c.experimentalAutoDetectLongPolling,Km(c.experimentalLongPollingOptions),c.useFetchStreams,c.isUsingEmulator)}(t._databaseId,t._app?.options.appId||"",t._persistenceKey,e);t._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(t._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),t._firestoreClient=new O0(t._authCredentials,t._appCheckCredentials,t._queue,n,t._componentsProvider&&function(s){const i=s?._online.build();return{_offline:s?._offline.build(i),_online:i}}(t._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Bt(yt.fromBase64String(e))}catch(n){throw new ee(O.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new Bt(yt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Bt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(wi(e,Bt._jsonSchema))return Bt.fromBase64String(e.bytes)}}Bt._jsonSchemaVersion="firestore/bytes/1.0",Bt._jsonSchema={type:it("string",Bt._jsonSchemaVersion),bytes:it("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fl{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new ee(O.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new _t(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zm{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cn{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new ee(O.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new ee(O.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return Re(this._lat,e._lat)||Re(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:cn._jsonSchemaVersion}}static fromJSON(e){if(wi(e,cn._jsonSchema))return new cn(e.latitude,e.longitude)}}cn._jsonSchemaVersion="firestore/geoPoint/1.0",cn._jsonSchema={type:it("string",cn._jsonSchemaVersion),latitude:it("number"),longitude:it("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ln{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:ln._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(wi(e,ln._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(n=>typeof n=="number"))return new ln(e.vectorValues);throw new ee(O.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}ln._jsonSchemaVersion="firestore/vectorValue/1.0",ln._jsonSchema={type:it("string",ln._jsonSchemaVersion),vectorValues:it("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const B0=/^__.*__$/;class j0{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new Vr(e,this.data,this.fieldMask,n,this.fieldTransforms):new Ai(e,this.data,n,this.fieldTransforms)}}function eg(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw fe(40011,{Ac:t})}}class Ul{constructor(e,n,r,s,i,a){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Rc(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new Ul({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){const n=this.path?.child(e),r=this.Vc({path:n,fc:!1});return r.gc(e),r}yc(e){const n=this.path?.child(e),r=this.Vc({path:n,fc:!1});return r.Rc(),r}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return Lo(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc("Document fields must not be empty");if(eg(this.Ac)&&B0.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class q0{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||fa(e)}Cc(e,n,r,s=!1){return new Ul({Ac:e,methodName:n,Dc:r,path:_t.emptyPath(),fc:!1,bc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function tg(t){const e=t._freezeSettings(),n=fa(t._databaseId);return new q0(t._databaseId,!!e.ignoreUndefinedProperties,n)}function H0(t,e,n,r,s,i={}){const a=t.Cc(i.merge||i.mergeFields?2:0,e,n,s);sg("Data must be an object, but it was:",a,r);const c=ng(r,a);let l,h;if(i.merge)l=new Kt(a.fieldMask),h=a.fieldTransforms;else if(i.mergeFields){const f=[];for(const p of i.mergeFields){const y=W0(e,p,n);if(!a.contains(y))throw new ee(O.INVALID_ARGUMENT,`Field '${y}' is specified in your field mask but missing from your input data.`);K0(f,y)||f.push(y)}l=new Kt(f),h=a.fieldTransforms.filter(p=>l.covers(p.field))}else l=null,h=a.fieldTransforms;return new j0(new $t(c),l,h)}function z0(t,e,n,r=!1){return $l(n,t.Cc(r?4:3,e))}function $l(t,e){if(rg(t=xt(t)))return sg("Unsupported field value:",e,t),ng(t,e);if(t instanceof Zm)return function(r,s){if(!eg(s.Ac))throw s.Sc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Sc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.fc&&e.Ac!==4)throw e.Sc("Nested arrays are not supported");return function(r,s){const i=[];let a=0;for(const c of r){let l=$l(c,s.wc(a));l==null&&(l={nullValue:"NULL_VALUE"}),i.push(l),a++}return{arrayValue:{values:i}}}(t,e)}return function(r,s){if((r=xt(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return DI(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=Ge.fromDate(r);return{timestampValue:xo(s.serializer,i)}}if(r instanceof Ge){const i=new Ge(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:xo(s.serializer,i)}}if(r instanceof cn)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Bt)return{bytesValue:Tm(s.serializer,r._byteString)};if(r instanceof ct){const i=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(i))throw s.Sc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Al(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof ln)return function(a,c){return{mapValue:{fields:{[Qp]:{stringValue:Xp},[Po]:{arrayValue:{values:a.toArray().map(h=>{if(typeof h!="number")throw c.Sc("VectorValues must only contain numeric values.");return Tl(c.serializer,h)})}}}}}}(r,s);throw s.Sc(`Unsupported field value: ${sa(r)}`)}(t,e)}function ng(t,e){const n={};return qp(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Nr(t,(r,s)=>{const i=$l(s,e.mc(r));i!=null&&(n[r]=i)}),{mapValue:{fields:n}}}function rg(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof Ge||t instanceof cn||t instanceof Bt||t instanceof ct||t instanceof Zm||t instanceof ln)}function sg(t,e,n){if(!rg(n)||!Bp(n)){const r=sa(n);throw r==="an object"?e.Sc(t+" a custom object"):e.Sc(t+" "+r)}}function W0(t,e,n){if((e=xt(e))instanceof Fl)return e._internalPath;if(typeof e=="string")return ig(t,e);throw Lo("Field path arguments must be of type string or ",t,!1,void 0,n)}const G0=new RegExp("[~\\*/\\[\\]]");function ig(t,e,n){if(e.search(G0)>=0)throw Lo(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new Fl(...e.split("."))._internalPath}catch{throw Lo(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Lo(t,e,n,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let c=`Function ${e}() called with invalid data`;n&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(i||a)&&(l+=" (found",i&&(l+=` in field ${r}`),a&&(l+=` in document ${s}`),l+=")"),new ee(O.INVALID_ARGUMENT,c+t+l)}function K0(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class og{constructor(e,n,r,s,i){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new ct(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Q0(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(Bl("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class Q0 extends og{data(){return super.data()}}function Bl(t,e){return typeof e=="string"?ig(t,e):e instanceof Fl?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function X0(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new ee(O.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class jl{}class ag extends jl{}function J0(t,e,...n){let r=[];e instanceof jl&&r.push(e),r=r.concat(n),function(i){const a=i.filter(l=>l instanceof Hl).length,c=i.filter(l=>l instanceof ql).length;if(a>1||a>0&&c>0)throw new ee(O.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)t=s._apply(t);return t}class ql extends ag{constructor(e,n,r){super(),this._field=e,this._op=n,this._value=r,this.type="where"}static _create(e,n,r){return new ql(e,n,r)}_apply(e){const n=this._parse(e);return cg(e._query,n),new Mr(e.firestore,e.converter,kc(e._query,n))}_parse(e){const n=tg(e.firestore);return function(i,a,c,l,h,f,p){let y;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new ee(O.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){jd(p,f);const R=[];for(const N of p)R.push(Bd(l,i,N));y={arrayValue:{values:R}}}else y=Bd(l,i,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||jd(p,f),y=z0(c,a,p,f==="in"||f==="not-in");return st.create(h,f,y)}(e._query,"where",n,e.firestore._databaseId,this._field,this._op,this._value)}}class Hl extends jl{constructor(e,n){super(),this.type=e,this._queryConstraints=n}static _create(e,n){return new Hl(e,n)}_parse(e){const n=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return n.length===1?n[0]:Yt.create(n,this._getOperator())}_apply(e){const n=this._parse(e);return n.getFilters().length===0?e:(function(s,i){let a=s;const c=i.getFlattenedFilters();for(const l of c)cg(a,l),a=kc(a,l)}(e._query,n),new Mr(e.firestore,e.converter,kc(e._query,n)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class zl extends ag{constructor(e,n){super(),this._field=e,this._direction=n,this.type="orderBy"}static _create(e,n){return new zl(e,n)}_apply(e){const n=function(s,i,a){if(s.startAt!==null)throw new ee(O.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new ee(O.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new pi(i,a)}(e._query,this._field,this._direction);return new Mr(e.firestore,e.converter,function(s,i){const a=s.explicitOrderBy.concat([i]);return new Ts(s.path,s.collectionGroup,a,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(e._query,n))}}function Y0(t,e="asc"){const n=e,r=Bl("orderBy",t);return zl._create(r,n)}function Bd(t,e,n){if(typeof(n=xt(n))=="string"){if(n==="")throw new ee(O.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!sm(e)&&n.indexOf("/")!==-1)throw new ee(O.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=e.path.child(He.fromString(n));if(!le.isDocumentKey(r))throw new ee(O.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return nd(t,new le(r))}if(n instanceof ct)return nd(t,n._key);throw new ee(O.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${sa(n)}.`)}function jd(t,e){if(!Array.isArray(t)||t.length===0)throw new ee(O.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function cg(t,e){const n=function(s,i){for(const a of s)for(const c of a.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null}(t.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(n!==null)throw n===e.op?new ee(O.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new ee(O.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}class Z0{convertValue(e,n="none"){switch(or(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Ye(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(ir(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw fe(62114,{value:e})}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return Nr(e,(s,i)=>{r[s]=this.convertValue(i,n)}),r}convertVectorValue(e){const n=e.fields?.[Po].arrayValue?.values?.map(r=>Ye(r.doubleValue));return new ln(n)}convertGeoPoint(e){return new cn(Ye(e.latitude),Ye(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=aa(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(hi(e));default:return null}}convertTimestamp(e){const n=sr(e);return new Ge(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=He.fromString(e);Ue(Sm(r),9688,{name:e});const s=new di(r.get(1),r.get(3)),i=new le(r.popFirst(5));return s.isEqual(n)||Rn(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eA(t,e,n){let r;return r=t?t.toFirestore(e):e,r}class js{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Ar extends og{constructor(e,n,r,s,i,a){super(e,n,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new fo(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(Bl("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new ee(O.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,n={};return n.type=Ar._jsonSchemaVersion,n.bundle="",n.bundleSource="DocumentSnapshot",n.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?n:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),n.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),n)}}Ar._jsonSchemaVersion="firestore/documentSnapshot/1.0",Ar._jsonSchema={type:it("string",Ar._jsonSchemaVersion),bundleSource:it("string","DocumentSnapshot"),bundleName:it("string"),bundle:it("string")};class fo extends Ar{data(e={}){return super.data(e)}}class ts{constructor(e,n,r,s){this._firestore=e,this._userDataWriter=n,this._snapshot=s,this.metadata=new js(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new fo(this._firestore,this._userDataWriter,r.key,r,new js(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new ee(O.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(c=>{const l=new fo(s._firestore,s._userDataWriter,c.doc.key,c.doc,new js(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(c=>i||c.type!==3).map(c=>{const l=new fo(s._firestore,s._userDataWriter,c.doc.key,c.doc,new js(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return c.type!==0&&(h=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),f=a.indexOf(c.doc.key)),{type:tA(c.type),doc:l,oldIndex:h,newIndex:f}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new ee(O.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=ts._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=fl.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const n=[],r=[],s=[];return this.docs.forEach(i=>{i._document!==null&&(n.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function tA(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return fe(61501,{type:t})}}ts._jsonSchemaVersion="firestore/querySnapshot/1.0",ts._jsonSchema={type:it("string",ts._jsonSchemaVersion),bundleSource:it("string","QuerySnapshot"),bundleName:it("string"),bundle:it("string")};class lg extends Z0{constructor(e){super(),this.firestore=e}convertBytes(e){return new Bt(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new ct(this.firestore,null,n)}}function nA(t){return ug(Zr(t.firestore,_i),[new El(t._key,on.none())])}function rA(t,e){const n=Zr(t.firestore,_i),r=Jm(t),s=eA(t.converter,e);return ug(n,[H0(tg(t.firestore),"addDoc",r._key,s,t.converter!==null,{}).toMutation(r._key,on.exists(!1))]).then(()=>r)}function sA(t,...e){t=xt(t);let n={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||$d(e[r])||(n=e[r++]);const s={includeMetadataChanges:n.includeMetadataChanges,source:n.source};if($d(e[r])){const l=e[r];e[r]=l.next?.bind(l),e[r+1]=l.error?.bind(l),e[r+2]=l.complete?.bind(l)}let i,a,c;if(t instanceof ct)a=Zr(t.firestore,_i),c=vl(t._key.path),i={next:l=>{e[r]&&e[r](iA(a,t,l))},error:e[r+1],complete:e[r+2]};else{const l=Zr(t,Mr);a=Zr(l.firestore,_i),c=l._query;const h=new lg(a);i={next:f=>{e[r]&&e[r](new ts(a,h,l,f))},error:e[r+1],complete:e[r+2]},X0(t._query)}return function(h,f,p,y){const b=new V0(y),R=new m0(f,b,p);return h.asyncQueue.enqueueAndForget(async()=>h0(await xd(h),R)),()=>{b.Nu(),h.asyncQueue.enqueueAndForget(async()=>d0(await xd(h),R))}}(Ym(a),c,s,i)}function ug(t,e){return function(r,s){const i=new wr;return r.asyncQueue.enqueueAndForget(async()=>b0(await L0(r),s,i)),i.promise}(Ym(t),e)}function iA(t,e,n){const r=n.docs.get(e._key),s=new lg(t);return new Ar(t,s,e._key,r,new js(n.hasPendingWrites,n.fromCache),e.converter)}(function(e,n=!0){(function(s){_s=s})(gs),os(new Cr("firestore",(r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),c=new _i(new qE(r.getProvider("auth-internal")),new WE(a,r.getProvider("app-check-internal")),function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new ee(O.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new di(h.options.projectId,f)}(a,s),a);return i={useFetchStreams:n,...i},c._setSettings(i),c},"PUBLIC").setMultipleInstances(!0)),Xn(qh,Hh,e),Xn(qh,Hh,"esm2020")})();var oA="firebase",aA="12.0.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Xn(oA,aA,"app");function hg(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const cA=hg,dg=new Ei("auth","Firebase",hg());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fo=new ll("@firebase/auth");function lA(t,...e){Fo.logLevel<=Ce.WARN&&Fo.warn(`Auth (${gs}): ${t}`,...e)}function po(t,...e){Fo.logLevel<=Ce.ERROR&&Fo.error(`Auth (${gs}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fn(t,...e){throw Gl(t,...e)}function Jt(t,...e){return Gl(t,...e)}function Wl(t,e,n){const r={...cA(),[e]:n};return new Ei("auth","Firebase",r).create(e,{appName:t.name})}function br(t){return Wl(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function uA(t,e,n){const r=n;if(!(e instanceof r))throw r.name!==e.constructor.name&&fn(t,"argument-error"),Wl(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Gl(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return dg.create(t,...e)}function _e(t,e,...n){if(!t)throw Gl(e,...n)}function En(t){const e="INTERNAL ASSERTION FAILED: "+t;throw po(e),new Error(e)}function kn(t,e){t||En(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bc(){return typeof self<"u"&&self.location?.href||""}function hA(){return qd()==="http:"||qd()==="https:"}function qd(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dA(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(hA()||TT()||"connection"in navigator)?navigator.onLine:!0}function fA(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ri{constructor(e,n){this.shortDelay=e,this.longDelay=n,kn(n>e,"Short delay should be less than long delay!"),this.isMobile=_T()||ET()}get(){return dA()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kl(t,e){kn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fg{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;En("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;En("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;En("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pA={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mA=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],gA=new Ri(3e4,6e4);function Ql(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function Is(t,e,n,r,s={}){return pg(t,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const c=Ii({key:t.config.apiKey,...a}).slice(1),l=await t._getAdditionalHeaders();l["Content-Type"]="application/json",t.languageCode&&(l["X-Firebase-Locale"]=t.languageCode);const h={method:e,headers:l,...i};return vT()||(h.referrerPolicy="no-referrer"),t.emulatorConfig&&ms(t.emulatorConfig.host)&&(h.credentials="include"),fg.fetch()(await mg(t,t.config.apiHost,n,c),h)})}async function pg(t,e,n){t._canInitEmulator=!1;const r={...pA,...e};try{const s=new yA(t),i=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw no(t,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const c=i.ok?a.errorMessage:a.error.message,[l,h]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw no(t,"credential-already-in-use",a);if(l==="EMAIL_EXISTS")throw no(t,"email-already-in-use",a);if(l==="USER_DISABLED")throw no(t,"user-disabled",a);const f=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw Wl(t,f,h);fn(t,f)}}catch(s){if(s instanceof xn)throw s;fn(t,"network-request-failed",{message:String(s)})}}async function _A(t,e,n,r,s={}){const i=await Is(t,e,n,r,s);return"mfaPendingCredential"in i&&fn(t,"multi-factor-auth-required",{_serverResponse:i}),i}async function mg(t,e,n,r){const s=`${e}${n}?${r}`,i=t,a=i.config.emulator?Kl(t.config,s):`${t.config.apiScheme}://${s}`;return mA.includes(n)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}class yA{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(Jt(this.auth,"network-request-failed")),gA.get())})}}function no(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=Jt(t,e,r);return s.customData._tokenResponse=n,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vA(t,e){return Is(t,"POST","/v1/accounts:delete",e)}async function Uo(t,e){return Is(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ri(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function TA(t,e=!1){const n=xt(t),r=await n.getIdToken(e),s=Xl(r);_e(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i?.sign_in_provider;return{claims:s,token:r,authTime:ri(rc(s.auth_time)),issuedAtTime:ri(rc(s.iat)),expirationTime:ri(rc(s.exp)),signInProvider:a||null,signInSecondFactor:i?.sign_in_second_factor||null}}function rc(t){return Number(t)*1e3}function Xl(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return po("JWT malformed, contained fewer than 3 sections"),null;try{const s=Tp(n);return s?JSON.parse(s):(po("Failed to decode base64 JWT payload"),null)}catch(s){return po("Caught error parsing JWT payload as JSON",s?.toString()),null}}function Hd(t){const e=Xl(t);return _e(e,"internal-error"),_e(typeof e.exp<"u","internal-error"),_e(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yi(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof xn&&EA(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function EA({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IA{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jc{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=ri(this.lastLoginAt),this.creationTime=ri(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $o(t){const e=t.auth,n=await t.getIdToken(),r=await yi(t,Uo(e,{idToken:n}));_e(r?.users.length,e,"internal-error");const s=r.users[0];t._notifyReloadListener(s);const i=s.providerUserInfo?.length?gg(s.providerUserInfo):[],a=AA(t.providerData,i),c=t.isAnonymous,l=!(t.email&&s.passwordHash)&&!a?.length,h=c?l:!1,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new jc(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(t,f)}async function wA(t){const e=xt(t);await $o(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function AA(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function gg(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bA(t,e){const n=await pg(t,{},async()=>{const r=Ii({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=t.config,a=await mg(t,s,"/v1/token",`key=${i}`),c=await t._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const l={method:"POST",headers:c,body:r};return t.emulatorConfig&&ms(t.emulatorConfig.host)&&(l.credentials="include"),fg.fetch()(a,l)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function SA(t,e){return Is(t,"POST","/v2/accounts:revokeToken",Ql(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ns{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){_e(e.idToken,"internal-error"),_e(typeof e.idToken<"u","internal-error"),_e(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Hd(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){_e(e.length!==0,"internal-error");const n=Hd(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(_e(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:i}=await bA(e,n);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:i}=n,a=new ns;return r&&(_e(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(_e(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(_e(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ns,this.toJSON())}_performRefresh(){return En("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fn(t,e){_e(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Qt{constructor({uid:e,auth:n,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new IA(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new jc(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const n=await yi(this,this.stsTokenManager.getToken(this.auth,e));return _e(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return TA(this,e)}reload(){return wA(this)}_assign(e){this!==e&&(_e(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Qt({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){_e(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await $o(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Gt(this.auth.app))return Promise.reject(br(this.auth));const e=await this.getIdToken();return await yi(this,vA(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const r=n.displayName??void 0,s=n.email??void 0,i=n.phoneNumber??void 0,a=n.photoURL??void 0,c=n.tenantId??void 0,l=n._redirectEventId??void 0,h=n.createdAt??void 0,f=n.lastLoginAt??void 0,{uid:p,emailVerified:y,isAnonymous:b,providerData:R,stsTokenManager:N}=n;_e(p&&N,e,"internal-error");const x=ns.fromJSON(this.name,N);_e(typeof p=="string",e,"internal-error"),Fn(r,e.name),Fn(s,e.name),_e(typeof y=="boolean",e,"internal-error"),_e(typeof b=="boolean",e,"internal-error"),Fn(i,e.name),Fn(a,e.name),Fn(c,e.name),Fn(l,e.name),Fn(h,e.name),Fn(f,e.name);const j=new Qt({uid:p,auth:e,email:s,emailVerified:y,displayName:r,isAnonymous:b,photoURL:a,phoneNumber:i,tenantId:c,stsTokenManager:x,createdAt:h,lastLoginAt:f});return R&&Array.isArray(R)&&(j.providerData=R.map(W=>({...W}))),l&&(j._redirectEventId=l),j}static async _fromIdTokenResponse(e,n,r=!1){const s=new ns;s.updateFromServerResponse(n);const i=new Qt({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await $o(i),i}static async _fromGetAccountInfoResponse(e,n,r){const s=n.users[0];_e(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?gg(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!i?.length,c=new ns;c.updateFromIdToken(r);const l=new Qt({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:a}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new jc(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(l,h),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zd=new Map;function In(t){kn(t instanceof Function,"Expected a class definition");let e=zd.get(t);return e?(kn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,zd.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _g{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}_g.type="NONE";const Wd=_g;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mo(t,e,n){return`firebase:${t}:${e}:${n}`}class rs{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=mo(this.userKey,s.apiKey,i),this.fullPersistenceKey=mo("persistence",s.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await Uo(this.auth,{idToken:e}).catch(()=>{});return n?Qt._fromGetAccountInfoResponse(this.auth,n,e):null}return Qt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new rs(In(Wd),e,r);const s=(await Promise.all(n.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||In(Wd);const a=mo(r,e.config.apiKey,e.name);let c=null;for(const h of n)try{const f=await h._get(a);if(f){let p;if(typeof f=="string"){const y=await Uo(e,{idToken:f}).catch(()=>{});if(!y)break;p=await Qt._fromGetAccountInfoResponse(e,y,f)}else p=Qt._fromJSON(e,f);h!==i&&(c=p),i=h;break}}catch{}const l=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!l.length?new rs(i,e,r):(i=l[0],c&&await i._set(a,c.toJSON()),await Promise.all(n.map(async h=>{if(h!==i)try{await h._remove(a)}catch{}})),new rs(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gd(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Eg(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(yg(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(wg(e))return"Blackberry";if(Ag(e))return"Webos";if(vg(e))return"Safari";if((e.includes("chrome/")||Tg(e))&&!e.includes("edge/"))return"Chrome";if(Ig(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if(r?.length===2)return r[1]}return"Other"}function yg(t=Ct()){return/firefox\//i.test(t)}function vg(t=Ct()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Tg(t=Ct()){return/crios\//i.test(t)}function Eg(t=Ct()){return/iemobile/i.test(t)}function Ig(t=Ct()){return/android/i.test(t)}function wg(t=Ct()){return/blackberry/i.test(t)}function Ag(t=Ct()){return/webos/i.test(t)}function Jl(t=Ct()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function CA(t=Ct()){return Jl(t)&&!!window.navigator?.standalone}function RA(){return IT()&&document.documentMode===10}function bg(t=Ct()){return Jl(t)||Ig(t)||Ag(t)||wg(t)||/windows phone/i.test(t)||Eg(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sg(t,e=[]){let n;switch(t){case"Browser":n=Gd(Ct());break;case"Worker":n=`${Gd(Ct())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${gs}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PA{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=i=>new Promise((a,c)=>{try{const l=e(i);a(l)}catch(l){c(l)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kA(t,e={}){return Is(t,"GET","/v2/passwordPolicy",Ql(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DA=6;class NA{constructor(e){const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??DA,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xA{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Kd(this),this.idTokenSubscription=new Kd(this),this.beforeStateQueue=new PA(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=dg,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=In(n)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await rs.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await Uo(this,{idToken:e}),r=await Qt._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(Gt(this.app)){const i=this.app.settings.authIdToken;return i?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(a,a))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let r=n,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const i=this.redirectUser?._redirectEventId,a=r?._redirectEventId,c=await this.tryRedirectSignIn(e);(!i||i===a)&&c?.user&&(r=c.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(i){r=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return _e(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await $o(e)}catch(n){if(n?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=fA()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Gt(this.app))return Promise.reject(br(this));const n=e?xt(e):null;return n&&_e(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&_e(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Gt(this.app)?Promise.reject(br(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Gt(this.app)?Promise.reject(br(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(In(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await kA(this),n=new NA(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Ei("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await SA(this,r)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&In(e)||this._popupRedirectResolver;_e(n,this,"argument-error"),this.redirectPersistenceManager=await rs.create(this,[In(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(_e(c,this,"internal-error"),c.then(()=>{a||i(this.currentUser)}),typeof n=="function"){const l=e.addObserver(n,r,s);return()=>{a=!0,l()}}else{const l=e.addObserver(n);return()=>{a=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return _e(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Sg(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();n&&(e["X-Firebase-Client"]=n);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){if(Gt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&lA(`Error while retrieving App Check token: ${e.error}`),e?.token}}function _a(t){return xt(t)}class Kd{constructor(e){this.auth=e,this.observer=null,this.addObserver=kT(n=>this.observer=n)}get next(){return _e(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Yl={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function VA(t){Yl=t}function OA(t){return Yl.loadJS(t)}function MA(){return Yl.gapiScript}function LA(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function FA(t,e){const n=hl(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),i=n.getOptions();if(Sr(i,e??{}))return s;fn(s,"already-initialized")}return n.initialize({options:e})}function UA(t,e){const n=e?.persistence||[],r=(Array.isArray(n)?n:[n]).map(In);e?.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e?.popupRedirectResolver)}function $A(t,e,n){const r=_a(t);_e(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=Cg(e),{host:a,port:c}=BA(e),l=c===null?"":`:${c}`,h={url:`${i}//${a}${l}/`},f=Object.freeze({host:a,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){_e(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),_e(Sr(h,r.config.emulator)&&Sr(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=h,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,ms(a)?(Ap(`${i}//${a}${l}`),bp("Auth",!0)):jA()}function Cg(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function BA(t){const e=Cg(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Qd(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:Qd(a)}}}function Qd(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function jA(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rg{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return En("not implemented")}_getIdTokenResponse(e){return En("not implemented")}_linkToIdToken(e,n){return En("not implemented")}_getReauthenticationResolver(e){return En("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ss(t,e){return _A(t,"POST","/v1/accounts:signInWithIdp",Ql(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qA="http://localhost";class kr extends Rg{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new kr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):fn("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=n;if(!r||!s)return null;const a=new kr(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const n=this.buildRequest();return ss(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,ss(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,ss(e,n)}buildRequest(){const e={requestUri:qA,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Ii(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zl{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pi extends Zl{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jn extends Pi{constructor(){super("facebook.com")}static credential(e){return kr._fromParams({providerId:jn.PROVIDER_ID,signInMethod:jn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return jn.credentialFromTaggedObject(e)}static credentialFromError(e){return jn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return jn.credential(e.oauthAccessToken)}catch{return null}}}jn.FACEBOOK_SIGN_IN_METHOD="facebook.com";jn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tn extends Pi{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return kr._fromParams({providerId:Tn.PROVIDER_ID,signInMethod:Tn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Tn.credentialFromTaggedObject(e)}static credentialFromError(e){return Tn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return Tn.credential(n,r)}catch{return null}}}Tn.GOOGLE_SIGN_IN_METHOD="google.com";Tn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qn extends Pi{constructor(){super("github.com")}static credential(e){return kr._fromParams({providerId:qn.PROVIDER_ID,signInMethod:qn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return qn.credentialFromTaggedObject(e)}static credentialFromError(e){return qn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return qn.credential(e.oauthAccessToken)}catch{return null}}}qn.GITHUB_SIGN_IN_METHOD="github.com";qn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hn extends Pi{constructor(){super("twitter.com")}static credential(e,n){return kr._fromParams({providerId:Hn.PROVIDER_ID,signInMethod:Hn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Hn.credentialFromTaggedObject(e)}static credentialFromError(e){return Hn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return Hn.credential(n,r)}catch{return null}}}Hn.TWITTER_SIGN_IN_METHOD="twitter.com";Hn.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fs{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const i=await Qt._fromIdTokenResponse(e,r,s),a=Xd(r);return new fs({user:i,providerId:a,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=Xd(r);return new fs({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function Xd(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bo extends xn{constructor(e,n,r,s){super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Bo.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new Bo(e,n,r,s)}}function Pg(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Bo._fromErrorAndOperation(t,i,e,r):i})}async function HA(t,e,n=!1){const r=await yi(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return fs._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zA(t,e,n=!1){const{auth:r}=t;if(Gt(r.app))return Promise.reject(br(r));const s="reauthenticate";try{const i=await yi(t,Pg(r,s,e,t),n);_e(i.idToken,r,"internal-error");const a=Xl(i.idToken);_e(a,r,"internal-error");const{sub:c}=a;return _e(t.uid===c,r,"user-mismatch"),fs._forOperation(t,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&fn(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function WA(t,e,n=!1){if(Gt(t.app))return Promise.reject(br(t));const r="signIn",s=await Pg(t,r,e),i=await fs._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(i.user),i}function GA(t,e,n,r){return xt(t).onIdTokenChanged(e,n,r)}function KA(t,e,n){return xt(t).beforeAuthStateChanged(e,n)}function QA(t,e,n,r){return xt(t).onAuthStateChanged(e,n,r)}function XA(t){return xt(t).signOut()}const jo="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kg{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(jo,"1"),this.storage.removeItem(jo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JA=1e3,YA=10;class Dg extends kg{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=bg(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((a,c,l)=>{this.notifyListeners(a,l)});return}const r=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!n&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);RA()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,YA):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},JA)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}Dg.type="LOCAL";const ZA=Dg;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ng extends kg{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Ng.type="SESSION";const xg=Ng;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eb(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ya{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new ya(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:i}=n.data,a=this.handlersMap[s];if(!a?.size)return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(a).map(async h=>h(n.origin,i)),l=await eb(c);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:l})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ya.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eu(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tb{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((c,l)=>{const h=eu("",20);s.port1.start();const f=setTimeout(()=>{l(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(p){const y=p;if(y.data.eventId===h)switch(y.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(y.data.response);break;default:clearTimeout(f),clearTimeout(i),l(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:h,data:n},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function un(){return window}function nb(t){un().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vg(){return typeof un().WorkerGlobalScope<"u"&&typeof un().importScripts=="function"}async function rb(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function sb(){return navigator?.serviceWorker?.controller||null}function ib(){return Vg()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Og="firebaseLocalStorageDb",ob=1,qo="firebaseLocalStorage",Mg="fbase_key";class ki{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function va(t,e){return t.transaction([qo],e?"readwrite":"readonly").objectStore(qo)}function ab(){const t=indexedDB.deleteDatabase(Og);return new ki(t).toPromise()}function qc(){const t=indexedDB.open(Og,ob);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(qo,{keyPath:Mg})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(qo)?e(r):(r.close(),await ab(),e(await qc()))})})}async function Jd(t,e,n){const r=va(t,!0).put({[Mg]:e,value:n});return new ki(r).toPromise()}async function cb(t,e){const n=va(t,!1).get(e),r=await new ki(n).toPromise();return r===void 0?null:r.value}function Yd(t,e){const n=va(t,!0).delete(e);return new ki(n).toPromise()}const lb=800,ub=3;class Lg{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await qc(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>ub)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Vg()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ya._getInstance(ib()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await rb(),!this.activeServiceWorker)return;this.sender=new tb(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||sb()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await qc();return await Jd(e,jo,"1"),await Yd(e,jo),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>Jd(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>cb(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Yd(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=va(s,!1).getAll();return new ki(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),lb)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Lg.type="LOCAL";const hb=Lg;new Ri(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fg(t,e){return e?In(e):(_e(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tu extends Rg{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return ss(e,this._buildIdpRequest())}_linkToIdToken(e,n){return ss(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return ss(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function db(t){return WA(t.auth,new tu(t),t.bypassAuthState)}function fb(t){const{auth:e,user:n}=t;return _e(n,e,"internal-error"),zA(n,new tu(t),t.bypassAuthState)}async function pb(t){const{auth:e,user:n}=t;return _e(n,e,"internal-error"),HA(n,new tu(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ug{constructor(e,n,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:i,error:a,type:c}=e;if(a){this.reject(a);return}const l={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return db;case"linkViaPopup":case"linkViaRedirect":return pb;case"reauthViaPopup":case"reauthViaRedirect":return fb;default:fn(this.auth,"internal-error")}}resolve(e){kn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){kn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mb=new Ri(2e3,1e4);async function gb(t,e,n){if(Gt(t.app))return Promise.reject(Jt(t,"operation-not-supported-in-this-environment"));const r=_a(t);uA(t,e,Zl);const s=Fg(r,n);return new Tr(r,"signInViaPopup",e,s).executeNotNull()}class Tr extends Ug{constructor(e,n,r,s,i){super(e,n,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Tr.currentPopupAction&&Tr.currentPopupAction.cancel(),Tr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return _e(e,this.auth,"internal-error"),e}async onExecution(){kn(this.filter.length===1,"Popup operations only handle one event");const e=eu();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Jt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(Jt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Tr.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Jt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,mb.get())};e()}}Tr.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _b="pendingRedirect",go=new Map;class yb extends Ug{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=go.get(this.auth._key());if(!e){try{const r=await vb(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}go.set(this.auth._key(),e)}return this.bypassAuthState||go.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function vb(t,e){const n=Ib(e),r=Eb(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function Tb(t,e){go.set(t._key(),e)}function Eb(t){return In(t._redirectPersistence)}function Ib(t){return mo(_b,t.config.apiKey,t.name)}async function wb(t,e,n=!1){if(Gt(t.app))return Promise.reject(br(t));const r=_a(t),s=Fg(r,e),a=await new yb(r,s,n).execute();return a&&!n&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ab=600*1e3;class bb{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Sb(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){if(e.error&&!$g(e)){const r=e.error.code?.split("auth/")[1]||"internal-error";n.onError(Jt(this.auth,r))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Ab&&this.cachedEventUids.clear(),this.cachedEventUids.has(Zd(e))}saveEventToCache(e){this.cachedEventUids.add(Zd(e)),this.lastProcessedEventTime=Date.now()}}function Zd(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function $g({type:t,error:e}){return t==="unknown"&&e?.code==="auth/no-auth-event"}function Sb(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return $g(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cb(t,e={}){return Is(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rb=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Pb=/^https?/;async function kb(t){if(t.config.emulator)return;const{authorizedDomains:e}=await Cb(t);for(const n of e)try{if(Db(n))return}catch{}fn(t,"unauthorized-domain")}function Db(t){const e=Bc(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const a=new URL(t);return a.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&a.hostname===r}if(!Pb.test(n))return!1;if(Rb.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nb=new Ri(3e4,6e4);function ef(){const t=un().___jsl;if(t?.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function xb(t){return new Promise((e,n)=>{function r(){ef(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{ef(),n(Jt(t,"network-request-failed"))},timeout:Nb.get()})}if(un().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(un().gapi?.load)r();else{const s=LA("iframefcb");return un()[s]=()=>{gapi.load?r():n(Jt(t,"network-request-failed"))},OA(`${MA()}?onload=${s}`).catch(i=>n(i))}}).catch(e=>{throw _o=null,e})}let _o=null;function Vb(t){return _o=_o||xb(t),_o}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ob=new Ri(5e3,15e3),Mb="__/auth/iframe",Lb="emulator/auth/iframe",Fb={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Ub=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function $b(t){const e=t.config;_e(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Kl(e,Lb):`https://${t.config.authDomain}/${Mb}`,r={apiKey:e.apiKey,appName:t.name,v:gs},s=Ub.get(t.config.apiHost);s&&(r.eid=s);const i=t._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${Ii(r).slice(1)}`}async function Bb(t){const e=await Vb(t),n=un().gapi;return _e(n,t,"internal-error"),e.open({where:document.body,url:$b(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Fb,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=Jt(t,"network-request-failed"),c=un().setTimeout(()=>{i(a)},Ob.get());function l(){un().clearTimeout(c),s(r)}r.ping(l).then(l,()=>{i(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jb={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},qb=500,Hb=600,zb="_blank",Wb="http://localhost";class tf{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Gb(t,e,n,r=qb,s=Hb){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const l={...jb,width:r.toString(),height:s.toString(),top:i,left:a},h=Ct().toLowerCase();n&&(c=Tg(h)?zb:n),yg(h)&&(e=e||Wb,l.scrollbars="yes");const f=Object.entries(l).reduce((y,[b,R])=>`${y}${b}=${R},`,"");if(CA(h)&&c!=="_self")return Kb(e||"",c),new tf(null);const p=window.open(e||"",c,f);_e(p,t,"popup-blocked");try{p.focus()}catch{}return new tf(p)}function Kb(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qb="__/auth/handler",Xb="emulator/auth/handler",Jb=encodeURIComponent("fac");async function nf(t,e,n,r,s,i){_e(t.config.authDomain,t,"auth-domain-config-required"),_e(t.config.apiKey,t,"invalid-api-key");const a={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:gs,eventId:s};if(e instanceof Zl){e.setDefaultLanguage(t.languageCode),a.providerId=e.providerId||"",PT(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))a[f]=p}if(e instanceof Pi){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(a.scopes=f.join(","))}t.tenantId&&(a.tid=t.tenantId);const c=a;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const l=await t._getAppCheckToken(),h=l?`#${Jb}=${encodeURIComponent(l)}`:"";return`${Yb(t)}?${Ii(c).slice(1)}${h}`}function Yb({config:t}){return t.emulator?Kl(t,Xb):`https://${t.authDomain}/${Qb}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sc="webStorageSupport";class Zb{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=xg,this._completeRedirectFn=wb,this._overrideRedirectResult=Tb}async _openPopup(e,n,r,s){kn(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const i=await nf(e,n,r,Bc(),s);return Gb(e,i,eu())}async _openRedirect(e,n,r,s){await this._originValidation(e);const i=await nf(e,n,r,Bc(),s);return nb(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:i}=this.eventManagers[n];return s?Promise.resolve(s):(kn(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await Bb(e),r=new bb(e);return n.register("authEvent",s=>(_e(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(sc,{type:sc},s=>{const i=s?.[0]?.[sc];i!==void 0&&n(!!i),fn(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=kb(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return bg()||vg()||Jl()}}const eS=Zb;var rf="@firebase/auth",sf="1.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tS{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){_e(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nS(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function rS(t){os(new Cr("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;_e(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:a,authDomain:c,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Sg(t)},h=new xA(r,s,i,l);return UA(h,n),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),os(new Cr("auth-internal",e=>{const n=_a(e.getProvider("auth").getImmediate());return(r=>new tS(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Xn(rf,sf,nS(t)),Xn(rf,sf,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sS=300,iS=wp("authIdTokenMaxAge")||sS;let of=null;const oS=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>iS)return;const s=n?.token;of!==s&&(of=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function aS(t=Pp()){const e=hl(t,"auth");if(e.isInitialized())return e.getImmediate();const n=FA(t,{popupRedirectResolver:eS,persistence:[hb,ZA,xg]}),r=wp("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=oS(i.toString());KA(n,a,()=>a(n.currentUser)),GA(n,c=>a(c))}}const s=Ep("auth");return s&&$A(n,`http://${s}`),n}function cS(){return document.getElementsByTagName("head")?.[0]??document}VA({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const i=Jt("internal-error");i.customData=s,n(i)},r.type="text/javascript",r.charset="UTF-8",cS().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});rS("Browser");const lS={apiKey:"AIzaSyDTjxkS7WNK6slJ9WG6aU4rGl8tXuzO5Fk",authDomain:"dinacon-hydrophone.firebaseapp.com",projectId:"dinacon-hydrophone",storageBucket:"dinacon-hydrophone.firebasestorage.app",messagingSenderId:"972661963057",appId:"1:972661963057:web:10349ecd04c8ed48aad810"},Bg=Rp(lS),ic=aS(Bg),nu=U0(Bg),Di=na("comments",()=>{const t=Ne([]),e=Ne(!0),n=Ne(null);let r=null;const s=Y(()=>[...t.value].sort((h,f)=>h.timestamp-f.timestamp));return{comments:t,loading:e,error:n,sortedComments:s,loadComments:()=>{try{const h=J0(Xm(nu,"comments"),Y0("createdTimestamp","desc"));r=sA(h,f=>{const p=[];f.forEach(y=>{p.push({id:y.id,...y.data()})}),t.value=p,e.value=!1,console.log(`Loaded ${p.length} comments`)},f=>{console.error("Error loading comments:",f),n.value=f.message,e.value=!1})}catch(h){console.error("Error setting up comments listener:",h),n.value=h.message,e.value=!1}},stopListening:()=>{r&&(r(),r=null)},getNextComment:h=>s.value.find(p=>p.timestamp>h),getPreviousComment:h=>{const f=s.value;for(let p=f.length-1;p>=0;p--)if(f[p].timestamp<h)return f[p];return null}}}),uS={class:"minimap-container"},hS={class:"minimap-content"},dS=["width"],fS={class:"day-night-highlights"},pS=["x","width"],mS=["x","width"],gS=["y1","x2","y2"],_S=["d"],yS=["d"],vS=["d"],TS=["d"],ES=["width"],IS=["width"],wS=["y1","x2","y2"],AS=["d"],bS=["d"],SS=["width"],CS=["x","y","width","height","fill"],RS=["cx","cy","onClick"],PS=["width"],kS=["x","y","width","height","fill"],DS=["cx","cy","onClick"],NS={class:"time-markers"},xS={key:0,class:"marker-label"},Be=291322,VS={__name:"MiniMap",setup(t){const e=Sn(),n=Di(),r=Ne(null),s=Ne(0),i=Ne([]),a=Ne([]),c=Ne([]),l=new Date("2025-07-04T03:29:56.000Z"),h=async()=>{try{const Z=(await(await fetch("tide_data.csv")).text()).split(`
`).slice(1).filter(q=>q.trim()).map(q=>{const[,ne,Se,we,he,Le]=q.split(",");return{timestamp:new Date(we.replace("+00:00","Z")),solarAltitude:parseFloat(he),lunarAltitude:parseFloat(Le),tideHeight:parseFloat(Se),unixTime:parseInt(ne)}}).filter(q=>!isNaN(q.solarAltitude)&&!isNaN(q.lunarAltitude)&&!isNaN(q.tideHeight));i.value=Z}catch(V){console.error("Error loading solar data:",V)}},f=async()=>{try{const Z=(await(await fetch("A_stat.csv")).text()).split(`
`).slice(1).filter(q=>q.trim()).map(q=>{const[,ne,Se,we,he,Le,xe]=q.split(","),T=ne.replace(" ","T").substring(0,23)+"Z";return{timestamp:new Date(T),rms:parseFloat(Se),spectralCentroid:parseFloat(we),spectralBandwidth:parseFloat(he),spectralContrast:parseFloat(Le),spectralFlatness:parseFloat(xe)}}).filter(q=>!isNaN(q.rms)&&!isNaN(q.spectralContrast)&&!isNaN(q.spectralFlatness));a.value=Z}catch(V){console.error("Error loading audio stats data:",V)}},p=async()=>{try{const Z=(await(await fetch("B_stat.csv")).text()).split(`
`).slice(1).filter(q=>q.trim()).map(q=>{const[,ne,Se,we,he,Le,xe]=q.split(","),T=ne.replace(" ","T").substring(0,23)+"Z";return{timestamp:new Date(T),rms:parseFloat(Se),spectralCentroid:parseFloat(we),spectralBandwidth:parseFloat(he),spectralContrast:parseFloat(Le),spectralFlatness:parseFloat(xe)}}).filter(q=>!isNaN(q.rms)&&!isNaN(q.spectralContrast)&&!isNaN(q.spectralFlatness));c.value=Z}catch(V){console.error("Error loading audio stats B data:",V)}},y=Y(()=>e.absoluteCurrentTime);Y(()=>e.isPlaying);const b=()=>{r.value&&(s.value=r.value.offsetWidth)};Y(()=>y.value/Be*100);const R=Y(()=>s.value===0?0:y.value/Be*s.value),N=()=>{if(i.value.length===0)return[];const V=new Date(l.getTime()+Be*1e3);return i.value.filter(L=>L.timestamp>=l&&L.timestamp<=V)},x=()=>{const V=N();if(V.length===0)return{minAltitude:0,maxAltitude:90,altitudeRange:90};const L=V.map(ne=>ne.solarAltitude),P=V.map(ne=>ne.lunarAltitude),Z=[...L,...P],q=Math.max(...Z,0);return{minAltitude:0,maxAltitude:q,altitudeRange:q}},j=()=>{const V=N();if(V.length===0)return{minTide:-1,maxTide:1,tidalRange:2};const L=V.map(ne=>ne.tideHeight),P=Math.min(...L),Z=Math.max(...L),q=Z-P;return{minTide:P-.1,maxTide:Z,tidalRange:q+.1}},W=Y(()=>{if(i.value.length===0||s.value===0)return[];const V=[],L=N();if(L.length===0)return[];const{minAltitude:P,maxAltitude:Z,altitudeRange:q}=x();return L.forEach((ne,Se)=>{const we=(ne.timestamp.getTime()-l.getTime())/1e3;if(we>=0&&we<=Be){const he=we/Be*s.value,xe=60-ne.solarAltitude/q*52;V.push({x:he,y:Math.max(8,xe),altitude:ne.solarAltitude,time:we,isDay:ne.solarAltitude>0})}}),V}),K=Y(()=>{if(i.value.length===0||s.value===0)return[];const V=[],L=N();if(L.length===0)return[];const{minAltitude:P,maxAltitude:Z,altitudeRange:q}=x();return L.forEach((ne,Se)=>{const we=(ne.timestamp.getTime()-l.getTime())/1e3;if(we>=0&&we<=Be){const he=we/Be*s.value,xe=60-ne.lunarAltitude/q*52;V.push({x:he,y:Math.max(8,xe),altitude:ne.lunarAltitude,time:we,isVisible:ne.lunarAltitude>0})}}),V}),z=Y(()=>{if(i.value.length===0||s.value===0)return[];const V=[],L=N();if(L.length===0)return[];const{minTide:P,maxTide:Z,tidalRange:q}=j();return L.forEach((ne,Se)=>{const we=(ne.timestamp.getTime()-l.getTime())/1e3;if(we>=0&&we<=Be){const he=we/Be*s.value,xe=60-(q>0?(ne.tideHeight-P)/q:.5)*56;V.push({x:he,y:Math.max(4,Math.min(60,xe)),tideHeight:ne.tideHeight,time:we,isHigh:ne.tideHeight>0})}}),V}),ce=Y(()=>60),Ie=Y(()=>{const V=W.value;if(V.length===0)return{daySegments:[],nightSegments:[]};const L=[],P=[];let Z=null,q=null;return V.forEach((ne,Se)=>{const we=ne.altitude>0;q!==we||Z===null?(Z!==null&&(q?L.push(Z):P.push(Z)),Z={startX:ne.x,endX:ne.x,startTime:ne.time,endTime:ne.time},q=we):(Z.endX=ne.x,Z.endTime=ne.time),Se===V.length-1&&(q?L.push(Z):P.push(Z))}),{daySegments:L,nightSegments:P}}),w=Y(()=>{const V=W.value;if(V.length<2)return"";let L=`M ${V[0].x} ${V[0].y}`;for(let P=1;P<V.length;P++){const Z=V[P-1],q=V[P];if(P===1)L+=` L ${q.x} ${q.y}`;else{const ne=(Z.x+q.x)/2;L+=` Q ${ne} ${Z.y} ${q.x} ${q.y}`}}return L}),g=Y(()=>{const V=K.value;if(V.length<2)return"";let L=`M ${V[0].x} ${V[0].y}`;for(let P=1;P<V.length;P++){const Z=V[P-1],q=V[P];if(P===1)L+=` L ${q.x} ${q.y}`;else{const ne=(Z.x+q.x)/2;L+=` Q ${ne} ${Z.y} ${q.x} ${q.y}`}}return L}),_=Y(()=>{const V=z.value;if(V.length<2)return"";let L=`M ${V[0].x} ${V[0].y}`;for(let P=1;P<V.length;P++){const Z=V[P-1],q=V[P];if(P===1)L+=` L ${q.x} ${q.y}`;else{const ne=(Z.x+q.x)/2;L+=` Q ${ne} ${Z.y} ${q.x} ${q.y}`}}return L}),v=Y(()=>{if(i.value.length===0)return 30;const{minTide:V,maxTide:L,tidalRange:P}=j();return P===0?30:60-(0-V)/P*56}),I=(V,L,P)=>{const Z=P*L,q=Z*(1-Math.abs(V/60%2-1)),ne=P-Z;let Se,we,he;return V>=0&&V<60?[Se,we,he]=[Z,q,0]:V>=60&&V<120?[Se,we,he]=[q,Z,0]:V>=120&&V<180?[Se,we,he]=[0,Z,q]:V>=180&&V<240?[Se,we,he]=[0,q,Z]:V>=240&&V<300?[Se,we,he]=[q,0,Z]:[Se,we,he]=[Z,0,q],[Math.round((Se+ne)*255),Math.round((we+ne)*255),Math.round((he+ne)*255)]},S=Y(()=>{if(a.value.length===0||s.value===0)return[];const V=[],L=a.value.filter(he=>he.timestamp>=l&&he.timestamp<=new Date(l.getTime()+Be*1e3));if(L.length===0)return[];const P=0,Z=.08,q=0,ne=.015,Se=18,we=26;return L.forEach((he,Le)=>{const xe=(he.timestamp.getTime()-l.getTime())/1e3;if(xe>=0&&xe<=Be){const T=xe/Be*s.value;let A;Le<L.length-1?A=((L[Le+1].timestamp.getTime()-l.getTime())/1e3-xe)/Be*s.value:A=s.value-T;const D=Math.max(0,Math.min(1,(he.rms-P)/(Z-P))),$=Math.max(0,Math.min(1,(he.spectralFlatness-q)/(ne-q))),U=Math.max(0,Math.min(1,(he.spectralContrast-Se)/(we-Se)))*360,J=$,G=D,[H,B,ae]=I(U,J,G),X=`rgb(${H}, ${B}, ${ae})`;V.push({x:T,y:0,width:Math.max(1,A),height:30,color:X,secondsFromStart:xe,rms:he.rms,spectralContrast:he.spectralContrast,spectralFlatness:he.spectralFlatness})}}),V}),E=Y(()=>{if(c.value.length===0||s.value===0)return[];const V=[],L=c.value.filter(he=>he.timestamp>=l&&he.timestamp<=new Date(l.getTime()+Be*1e3));if(L.length===0)return[];const P=0,Z=.018,q=0,ne=.09,Se=17,we=22;return L.forEach((he,Le)=>{const xe=(he.timestamp.getTime()-l.getTime())/1e3;if(xe>=0&&xe<=Be){const T=xe/Be*s.value;let A;Le<L.length-1?A=((L[Le+1].timestamp.getTime()-l.getTime())/1e3-xe)/Be*s.value:A=s.value-T;const D=Math.max(0,Math.min(1,(he.rms-P)/(Z-P))),$=Math.max(0,Math.min(1,(he.spectralFlatness-q)/(ne-q))),U=Math.max(0,Math.min(1,(he.spectralContrast-Se)/(we-Se)))*360,J=$,G=D,[H,B,ae]=I(U,J,G),X=`rgb(${H}, ${B}, ${ae})`;V.push({x:T,y:0,width:Math.max(1,A),height:30,color:X,secondsFromStart:xe,rms:he.rms,spectralContrast:he.spectralContrast,spectralFlatness:he.spectralFlatness})}}),V}),Me=V=>{const L=new Date(l.getTime()+V*1e3),P=new Date(L.getTime()+480*60*1e3),Z=(P.getUTCMonth()+1).toString().padStart(2,"0"),q=P.getUTCDate().toString().padStart(2,"0"),ne=P.getUTCHours().toString().padStart(2,"0"),Se=P.getUTCMinutes().toString().padStart(2,"0");return`${Z}/${q} ${ne}:${Se}`},ze=V=>{const L=new Date(l.getTime()+V*1e3),P=new Date(L.getTime()+480*60*1e3),q=["January","February","March","April","May","June","July","August","September","October","November","December"][P.getUTCMonth()],ne=P.getUTCDate();return`${q} ${ne}`},Te=Y(()=>{if(s.value===0)return[];const V=[],L=new Date(l.getTime()+480*60*1e3),P=new Date(L);P.setUTCDate(P.getUTCDate()+1),P.setUTCHours(0,0,0,0);const q=(new Date(P.getTime()-480*60*1e3).getTime()-l.getTime())/1e3,ne=new Date(L);L.getUTCHours()>=12&&ne.setUTCDate(ne.getUTCDate()+1),ne.setUTCHours(12,0,0,0);const we=(new Date(ne.getTime()-480*60*1e3).getTime()-l.getTime())/1e3;let he=q;for(;he<=Be;){if(he>=0){const xe=he/Be*s.value;V.push({time:he,position:xe,type:"midnight",label:ze(he),showLabel:!0})}he+=24*3600}let Le=we;for(;Le<=Be;){if(Le>=0){const xe=Le/Be*s.value;V.push({time:Le,position:xe,type:"noon",label:"12:00",showLabel:!0})}Le+=24*3600}return V.sort((xe,T)=>xe.time-T.time)}),ie=V=>{if(!r.value||s.value===0)return;const L=r.value.getBoundingClientRect(),P=V.clientX-L.left,q=Math.max(0,Math.min(1,P/s.value))*Be;e.updateAbsoluteCurrentTime(q);const ne=new CustomEvent("minimap-seek",{detail:{time:q}});window.dispatchEvent(ne)},me=(V,L)=>{V.stopPropagation(),e.updateAbsoluteCurrentTime(L);const P=new CustomEvent("minimap-seek",{detail:{time:L}});window.dispatchEvent(P)};Y(()=>Me(y.value)),Y(()=>Me(Be));const Ke=Y(()=>{if(n.comments.length===0||s.value===0)return[];const V=[];return n.comments.filter(P=>P.timestamp>=0&&P.timestamp<=Be&&!P.hydrophoneAMuted).forEach((P,Z)=>{const q=P.timestamp/Be*s.value;V.push({x:q,y:15,timestamp:P.timestamp,userName:P.userName,content:P.content,id:P.id})}),V}),ge=Y(()=>{if(n.comments.length===0||s.value===0)return[];const V=[];return n.comments.filter(P=>P.timestamp>=0&&P.timestamp<=Be&&!P.hydrophoneBMuted).forEach((P,Z)=>{const q=P.timestamp/Be*s.value;V.push({x:q,y:15,timestamp:P.timestamp,userName:P.userName,content:P.content,id:P.id})}),V});return ps(async()=>{b(),window.addEventListener("resize",b),await h(),await f(),await p(),n.loadComments()}),Dr(()=>{window.removeEventListener("resize",b),n.stopListening()}),(V,L)=>(re(),se("div",uS,[ue("div",hS,[L[4]||(L[4]=ja('<div class="minimap-left-legend" data-v-ed873a6b><div class="legend-label" data-v-ed873a6b>Sun/Moon</div><div class="legend-label" data-v-ed873a6b>Tides</div><div class="legend-label" data-v-ed873a6b>Hydrophone A</div><div class="legend-label" data-v-ed873a6b>Hydrophone B</div></div>',1)),ue("div",{class:"minimap-track",ref_key:"containerRef",ref:r,onClick:ie},[L[3]||(L[3]=ue("div",{class:"minimap-background"},null,-1)),W.value.length>0?(re(),se("svg",{key:0,class:"solar-altitude-plot",width:s.value,height:"60"},[L[0]||(L[0]=ja('<defs data-v-ed873a6b><linearGradient id="dayNightGradient" x1="0%" y1="0%" x2="0%" y2="100%" data-v-ed873a6b><stop offset="0%" style="stop-color:rgba(255,215,0,0.1);stop-opacity:1;" data-v-ed873a6b></stop><stop offset="50%" style="stop-color:rgba(135,206,235,0.05);stop-opacity:1;" data-v-ed873a6b></stop><stop offset="100%" style="stop-color:rgba(25,25,112,0.1);stop-opacity:1;" data-v-ed873a6b></stop></linearGradient><linearGradient id="dayHighlight" x1="0%" y1="0%" x2="0%" y2="100%" data-v-ed873a6b><stop offset="0%" style="stop-color:rgba(255,215,0,0.15);stop-opacity:1;" data-v-ed873a6b></stop><stop offset="100%" style="stop-color:rgba(255,140,0,0.1);stop-opacity:1;" data-v-ed873a6b></stop></linearGradient><linearGradient id="nightHighlight" x1="0%" y1="0%" x2="0%" y2="100%" data-v-ed873a6b><stop offset="0%" style="stop-color:rgba(25,25,112,0.1);stop-opacity:1;" data-v-ed873a6b></stop><stop offset="100%" style="stop-color:rgba(0,0,50,0.15);stop-opacity:1;" data-v-ed873a6b></stop></linearGradient><linearGradient id="lunarGradient" x1="0%" y1="0%" x2="0%" y2="100%" data-v-ed873a6b><stop offset="0%" style="stop-color:rgba(220,220,255,0.08);stop-opacity:1;" data-v-ed873a6b></stop><stop offset="100%" style="stop-color:rgba(150,150,200,0.05);stop-opacity:1;" data-v-ed873a6b></stop></linearGradient></defs>',1)),ue("g",fS,[(re(!0),se(nt,null,Wt(Ie.value.daySegments,(P,Z)=>(re(),se("rect",{key:`day-${Z}`,x:P.startX,y:0,width:P.endX-P.startX,height:60,fill:"url(#dayHighlight)",class:"day-segment"},null,8,pS))),128)),(re(!0),se(nt,null,Wt(Ie.value.nightSegments,(P,Z)=>(re(),se("rect",{key:`night-${Z}`,x:P.startX,y:0,width:P.endX-P.startX,height:60,fill:"url(#nightHighlight)",class:"night-segment"},null,8,mS))),128))]),ue("line",{x1:0,y1:ce.value,x2:s.value,y2:ce.value,stroke:"rgba(255, 255, 255, 0.4)","stroke-width":"1","stroke-dasharray":"2,3",class:"zero-line"},null,8,gS),w.value?(re(),se("path",{key:0,d:`${w.value} L ${s.value} 60 L 0 60 Z`,fill:"url(#dayNightGradient)",opacity:"0.2"},null,8,_S)):at("",!0),g.value?(re(),se("path",{key:1,d:`${g.value} L ${s.value} 60 L 0 60 Z`,fill:"url(#lunarGradient)",opacity:"0.15"},null,8,yS)):at("",!0),w.value?(re(),se("path",{key:2,d:w.value,stroke:"rgba(255, 215, 0, 0.9)","stroke-width":"2",fill:"none",class:"solar-curve"},null,8,vS)):at("",!0),g.value?(re(),se("path",{key:3,d:g.value,stroke:"rgba(220, 220, 255, 0.8)","stroke-width":"2",fill:"none",class:"lunar-curve"},null,8,TS)):at("",!0)],8,dS)):at("",!0),z.value.length>0?(re(),se("svg",{key:1,class:"tidal-height-plot",width:s.value,height:"60"},[L[1]||(L[1]=ja('<defs data-v-ed873a6b><linearGradient id="tidalGradient" x1="0%" y1="0%" x2="0%" y2="100%" data-v-ed873a6b><stop offset="0%" style="stop-color:rgba(0,191,255,0.15);stop-opacity:1;" data-v-ed873a6b></stop><stop offset="50%" style="stop-color:rgba(0,150,200,0.1);stop-opacity:1;" data-v-ed873a6b></stop><stop offset="100%" style="stop-color:rgba(0,100,150,0.05);stop-opacity:1;" data-v-ed873a6b></stop></linearGradient><linearGradient id="tidalFill" x1="0%" y1="0%" x2="0%" y2="100%" data-v-ed873a6b><stop offset="0%" style="stop-color:rgba(0,191,255,0.2);stop-opacity:1;" data-v-ed873a6b></stop><stop offset="100%" style="stop-color:rgba(0,100,150,0.1);stop-opacity:1;" data-v-ed873a6b></stop></linearGradient></defs>',1)),ue("rect",{x:"0",y:"0",width:s.value,height:"60",fill:"url(#tidalGradient)"},null,8,IS),ue("line",{x1:0,y1:v.value,x2:s.value,y2:v.value,stroke:"rgba(0, 191, 255, 0.4)","stroke-width":"1","stroke-dasharray":"2,2",class:"tidal-zero-line"},null,8,wS),_.value?(re(),se("path",{key:0,d:`${_.value} L ${s.value} 60 L 0 60 Z`,fill:"url(#tidalFill)",opacity:"0.3"},null,8,AS)):at("",!0),_.value?(re(),se("path",{key:1,d:_.value,stroke:"rgba(0, 191, 255, 0.9)","stroke-width":"2",fill:"none",class:"tidal-curve"},null,8,bS)):at("",!0)],8,ES)):at("",!0),S.value.length>0?(re(),se("svg",{key:2,class:"audio-stats-plot",width:s.value,height:"30"},[(re(!0),se(nt,null,Wt(S.value,(P,Z)=>(re(),se("rect",{key:`audio-stat-${Z}`,x:P.x,y:P.y,width:P.width,height:P.height,fill:P.color,class:"audio-stat-rect"},null,8,CS))),128)),(re(!0),se(nt,null,Wt(Ke.value,P=>(re(),se("circle",{key:`comment-a-${P.id}`,cx:P.x,cy:P.y,r:"4","stroke-width":"1",class:"comment-dot comment-dot-a",onClick:Z=>me(Z,P.timestamp)},[ue("title",null,rt(P.userName)+": "+rt(P.content),1)],8,RS))),128))],8,SS)):at("",!0),E.value.length>0?(re(),se("svg",{key:3,class:"audio-stats-b-plot",width:s.value,height:"30"},[(re(!0),se(nt,null,Wt(E.value,(P,Z)=>(re(),se("rect",{key:`audio-stat-b-${Z}`,x:P.x,y:P.y,width:P.width,height:P.height,fill:P.color,class:"audio-stat-rect"},null,8,kS))),128)),(re(!0),se(nt,null,Wt(ge.value,P=>(re(),se("circle",{key:`comment-b-${P.id}`,cx:P.x,cy:P.y,r:"4",fill:"rgba(255, 255, 255, 0.9)",stroke:"rgba(0, 0, 0, 0.8)","stroke-width":"1",class:"comment-dot comment-dot-b",onClick:Z=>me(Z,P.timestamp)},[ue("title",null,rt(P.userName)+": "+rt(P.content),1)],8,DS))),128))],8,PS)):at("",!0),ue("div",NS,[(re(!0),se(nt,null,Wt(Te.value,P=>(re(),se("div",{key:P.time,class:er(["time-marker",`marker-${P.type}`]),style:wn({left:`${P.position}px`})},[L[2]||(L[2]=ue("div",{class:"marker-line"},null,-1)),P.showLabel?(re(),se("div",xS,rt(P.label),1)):at("",!0)],6))),128))]),ue("div",{class:"current-position",style:wn({left:`${R.value}px`})},null,4)],512)])]))}},OS=Nn(VS,[["__scopeId","data-v-ed873a6b"]]),MS=""+new URL("icons8-play-CEwPAUXb.gif",import.meta.url).href,LS="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAXUlEQVR4nO3PMQ6AQAwDwfz/00fjHgofoNOMlCpysTMA8K718Hbta44L+epfIySEtAkJIW1CQkibkBDSJiSEtAkJIW1CQkibkBDSJiSEtAn5a8i6uV37mmNCAGDiAm5yPtDZhUDWAAAAAElFTkSuQmCC",Ta=na("auth",()=>{const t=Ne(null),e=Ne(!0),n=Ne(null),r=Y(()=>!!t.value),s=Y(()=>t.value?.displayName||"Anonymous"),i=Y(()=>t.value?.email||""),a=Y(()=>t.value?.photoURL||"");return{user:t,loading:e,error:n,isAuthenticated:r,userName:s,userEmail:i,userPhoto:a,login:async()=>{try{n.value=null;const p=new Tn,y=await gb(ic,p);t.value=y.user,console.log("User logged in:",y.user.displayName)}catch(p){n.value=p.message,console.error("Login error:",p)}},logout:async()=>{try{n.value=null,await XA(ic),t.value=null,console.log("User logged out")}catch(p){n.value=p.message,console.error("Logout error:",p)}},clearError:()=>{n.value=null},initializeAuth:()=>{QA(ic,p=>{t.value=p,e.value=!1,p?console.log("User authenticated:",p.displayName):console.log("User not authenticated")})}}}),FS={class:"global-controls"},US={key:0,src:MS,alt:"Play",class:"play-icon"},$S={key:1,src:LS,alt:"Pause",class:"pause-icon"},BS={class:"center-controls"},jS=["src"],qS={key:1,class:"comment-input-bar"},HS={class:"comment-navigation"},zS=["disabled"],WS=["disabled"],GS={__name:"GlobalControls",setup(t){const e=Sn(),n=Ta(),r=Di(),s=Ne(!1),i=Ne(!1),a=Ne(""),c=Ne(0),l=Y(()=>e.isPlaying),h=Y(()=>n.isAuthenticated),f=Y(()=>n.userName),p=Y(()=>n.user?.uid),y=Y(()=>e.absoluteCurrentTime),b=Y(()=>e.isMutedA),R=Y(()=>e.isMutedB),N=Y(()=>!!r.getNextComment(y.value)),x=Y(()=>!!r.getPreviousComment(y.value)),j=()=>{e.setPlayingStatus(!l.value)},W=async()=>{if(!h.value){try{await n.login(),n.isAuthenticated&&(c.value=y.value,i.value=!0)}catch(g){console.error("Sign in failed:",g)}return}c.value=y.value,i.value=!0},K=g=>{s.value=g},z=async()=>{if(!a.value.trim()){alert("Please enter a comment");return}try{const g={userName:f.value,userId:p.value,content:a.value.trim(),timestamp:c.value,hydrophoneAMuted:b.value,hydrophoneBMuted:R.value,createdTimestamp:new Date};await rA(Xm(nu,"comments"),g),console.log("Comment saved successfully:",g),a.value="",i.value=!1,s.value=!1}catch(g){console.error("Error saving comment:",g),alert("Failed to save comment. Please try again.")}},ce=()=>{a.value="",i.value=!1,s.value=!1,c.value=0},Ie=()=>{const g=r.getNextComment(y.value+.01);g&&e.updateAbsoluteCurrentTime(g.timestamp)},w=()=>{const g=r.getPreviousComment(y.value-.01);g&&e.updateAbsoluteCurrentTime(g.timestamp)};return(g,_)=>(re(),se("div",FS,[ue("button",{onClick:j,class:"play-button"},[l.value?(re(),se("img",$S)):(re(),se("img",US))]),ue("div",BS,[i.value?at("",!0):(re(),se("button",{key:0,tabindex:"-1",onClick:W,class:"comment-button",onMouseenter:_[0]||(_[0]=v=>K(!0)),onMouseleave:_[1]||(_[1]=v=>K(!1))},[ue("img",{src:s.value?"icons/icons8-quote.gif":"icons/icons8-quote-50.png",alt:"Add Comment",class:"comment-icon"},null,8,jS)],32)),i.value?(re(),se("div",qS,[ue("button",{onClick:ce,class:"comment-button cancel-btn",tabindex:"-1"},_[3]||(_[3]=[ue("span",{class:"button-icon"},"✕",-1)])),sy(ue("input",{"onUpdate:modelValue":_[2]||(_[2]=v=>a.value=v),placeholder:"Add a comment...",class:"comment-input",onKeydown:[Ih(z,["enter"]),Ih(ce,["escape"])],autofocus:""},null,544),[[Pv,a.value]]),ue("button",{onClick:z,class:"comment-button submit-btn",tabindex:"-1"},_[4]||(_[4]=[ue("span",{class:"button-icon"},"✓",-1)]))])):at("",!0)]),ue("div",HS,[ue("button",{onClick:w,class:"nav-button",disabled:!x.value,title:"Previous Comment",tabindex:"-1"}," ⬅︎ ",8,zS),ue("button",{onClick:Ie,class:"nav-button",disabled:!N.value,title:"Next Comment",tabindex:"-1"}," ⮕︎ ",8,WS)])]))}},KS=Nn(GS,[["__scopeId","data-v-f0cc575e"]]),QS={class:"auth-button-container"},XS={key:0,class:"loading"},JS={key:1,class:"user-info"},YS=["src","alt"],ZS={class:"user-name"},eC={key:3,class:"error-message"},tC={__name:"AuthButton",setup(t){const e=Ta(),n=Y(()=>e.isAuthenticated),r=Y(()=>e.userName),s=Y(()=>e.userPhoto),i=Y(()=>e.loading),a=Y(()=>e.error),c=async()=>{e.clearError(),await e.login()},l=async()=>{e.clearError(),await e.logout()};return(h,f)=>(re(),se("div",QS,[i.value?(re(),se("div",XS,"Loading...")):n.value?(re(),se("div",JS,[s.value?(re(),se("img",{key:0,src:s.value,alt:r.value,class:"user-avatar"},null,8,YS)):at("",!0),ue("span",ZS,rt(r.value),1),ue("button",{onClick:l,class:"auth-button logout-button",tabindex:"-1"},"Logout")])):(re(),se("button",{key:2,onClick:c,class:"auth-button login-button",tabindex:"-1"}," Sign in with Google ")),a.value?(re(),se("div",eC,rt(a.value),1)):at("",!0)]))}},nC=Nn(tC,[["__scopeId","data-v-5f15aa90"]]),rC={class:"comment-container"},sC={key:0,class:"hydrophone-line line-up"},iC={key:1,class:"hydrophone-line line-down"},oC={class:"comment"},aC={class:"comment-author"},cC={class:"comment-content"},lC={__name:"Comment",props:{comment:{type:Object,required:!0}},setup(t){const e=t,n=Ta(),r=Y(()=>n.user?.uid===e.comment.userId),s=a=>{if(!a)return"Anonymous";const c=a.trim().split(" ");if(c.length===1)return c[0];{const l=c[0],h=c[c.length-1].charAt(0).toUpperCase();return`${l} ${h}.`}},i=async()=>{if(!(!r.value||!confirm("Are you sure you want to delete this comment?")))try{await nA(Jm(nu,"comments",e.comment.id)),console.log("Comment deleted successfully")}catch(c){console.error("Error deleting comment:",c),alert("Failed to delete comment. Please try again.")}};return(a,c)=>(re(),se("div",rC,[t.comment.hydrophoneAMuted?at("",!0):(re(),se("div",sC)),t.comment.hydrophoneBMuted?at("",!0):(re(),se("div",iC)),ue("div",oC,[r.value?(re(),se("button",{key:0,onClick:i,class:"delete-button",title:"Delete comment"}," ✕ ")):at("",!0),ue("div",aC,[ue("strong",null,rt(s(t.comment.userName)),1)]),ue("div",cC,rt(t.comment.content),1)])]))}},uC=Nn(lC,[["__scopeId","data-v-5db66e72"]]),hC={key:0,class:"loading-message"},dC={key:1,class:"no-comments"},fC={key:2,class:"comments-timeline"},pC=5625,mC={__name:"Comments",setup(t){const e=Sn(),n=Di(),r=pC/60,s=Ne(null),i=Ne(0),a=Y(()=>n.comments),c=Y(()=>n.loading);Y(()=>n.error);const l=Ne(!1),h=Ne(0),f=Ne(0);let p=null;const y=()=>{s.value&&(i.value=s.value.clientWidth)},b=Y(()=>{if(i.value===0||a.value.length===0)return[];const j=i.value/2;let W;l.value?W=h.value:W=e.absoluteCurrentTime;const K=i.value/r,z=1e3/r,ce=W-K/2-z,Ie=W+K/2+z;return a.value.filter(w=>w.timestamp>=ce&&w.timestamp<=Ie).map(w=>{const g=w.timestamp-W,_=j+g*r;return{...w,position:_}}).sort((w,g)=>w.timestamp-g.timestamp)}),R=Ne(0),N=(j,W=300)=>{if(l.value)return;l.value=!0;const K=h.value,z=performance.now(),ce=Ie=>{const w=Ie-z,g=Math.min(w/W,1),_=g<.5?2*g*g:1-Math.pow(-2*g+2,2)/2;h.value=K+(j-K)*_,g<1?requestAnimationFrame(ce):(l.value=!1,h.value=j)};requestAnimationFrame(ce)},x=j=>{Math.abs(j-R.value)>1&&!e.isPlaying&&!l.value?(h.value=R.value,f.value=j,N(j,300)):l.value||(h.value=j,f.value=j),R.value=j};return ps(async()=>{await nl(),y(),s.value&&(p=new ResizeObserver(()=>{y()}),p.observe(s.value)),h.value=e.absoluteCurrentTime,R.value=e.absoluteCurrentTime,qt(()=>e.absoluteCurrentTime,j=>{x(j)})}),Dr(()=>{p&&p.disconnect()}),(j,W)=>(re(),se("div",{class:"comments-overlay",ref_key:"commentsContainer",ref:s},[c.value?(re(),se("div",hC," Loading comments... ")):a.value.length===0?(re(),se("div",dC)):(re(),se("div",fC,[(re(!0),se(nt,null,Wt(b.value,K=>(re(),se("div",{key:K.id,class:"comment-marker",style:wn({left:`${K.position}px`})},[tt(uC,{comment:K},null,8,["comment"])],4))),128))]))],512))}},gC=Nn(mC,[["__scopeId","data-v-be32bf66"]]),_C={class:"comment-list"},yC={key:0,class:"loading"},vC={key:1,class:"error"},TC={key:2,class:"no-comments"},EC={key:3,class:"comments-container"},IC=["onClick"],wC={class:"comment-time"},AC={class:"comment-user"},bC={class:"comment-content"},SC={__name:"CommentList",setup(t){const e=Di(),n=Sn(),r=Y(()=>e.sortedComments),s=Y(()=>e.loading),i=Y(()=>e.error),a=Y(()=>n.absoluteCurrentTime),c=Y(()=>{if(!r.value.length)return[];let y=0,b=Math.abs(r.value[0].timestamp-a.value);for(let x=1;x<r.value.length;x++){const j=Math.abs(r.value[x].timestamp-a.value);j<b&&(b=j,y=x)}const R=Math.max(0,y-2),N=Math.min(r.value.length-1,y+2);return r.value.slice(R,N+1)}),l=y=>{if(!r.value.length)return!1;let b=r.value[0],R=Math.abs(r.value[0].timestamp-a.value);for(const N of r.value){const x=Math.abs(N.timestamp-a.value);x<R&&(R=x,b=N)}return y.id===b.id},h=y=>{n.updateAbsoluteCurrentTime(y.timestamp)},f=y=>{const b=new Date("2025-07-04T03:29:56.000Z"),R=new Date(b.getTime()+y*1e3),N=new Date(R.getTime()+480*60*1e3),x=N.getUTCFullYear(),j=(N.getUTCMonth()+1).toString().padStart(2,"0"),W=N.getUTCDate().toString().padStart(2,"0"),K=N.getUTCHours().toString().padStart(2,"0"),z=N.getUTCMinutes().toString().padStart(2,"0"),ce=N.getUTCSeconds().toString().padStart(2,"0"),Ie=N.getUTCMilliseconds().toString().padStart(3,"0");return`${x}-${j}-${W} ${K}:${z}:${ce}.${Ie}`},p=y=>{if(!y)return"";const b=y.trim().split(/\s+/);if(b.length===1)return b[0];const R=b[0],N=b[b.length-1].charAt(0).toUpperCase();return`${R} ${N}.`};return(y,b)=>(re(),se("div",_C,[s.value?(re(),se("div",yC,"Loading comments...")):i.value?(re(),se("div",vC,"Error loading comments: "+rt(i.value),1)):c.value.length===0?(re(),se("div",TC,"No comments found")):(re(),se("div",EC,[(re(!0),se(nt,null,Wt(c.value,R=>(re(),se("div",{key:R.id,class:er(["comment-item",{"current-comment":l(R)}]),onClick:N=>h(R)},[ue("span",wC,rt(f(R.timestamp)),1),ue("span",AC,rt(p(R.userName)),1),ue("span",bC,rt(R.content),1)],10,IC))),128))]))]))}},CC=Nn(SC,[["__scopeId","data-v-4cef858c"]]),RC={class:"app"},PC={class:"header"},kC={class:"auth-container"},DC={class:"data-section"},NC={class:"med"},xC={class:"data-section"},VC={__name:"App",setup(t){const e=Sn(),n=cl(),r=Ta(),s=Di(),i=()=>{const h=new URLSearchParams(window.location.search).get("t");if(h){const f=parseFloat(h);if(!isNaN(f))return f}return null},a=l=>{const h=new URL(window.location);h.searchParams.set("t",l.toFixed(2)),window.history.replaceState({},"",h)};qt(()=>e.absoluteCurrentTime,l=>{a(l)},{immediate:!1});const c=l=>{l.code==="Space"&&(l.preventDefault(),e.setPlayingStatus(!e.isPlaying))};return ps(async()=>{r.initializeAuth(),s.loadComments(),await Promise.all([e.load(),n.load()]);const l=i();l!==null?e.updateAbsoluteCurrentTime(l):a(e.absoluteCurrentTime),window.addEventListener("keydown",c)}),Dr(()=>{window.removeEventListener("keydown",c)}),(l,h)=>(re(),se("div",RC,[ue("div",PC,[h[0]||(h[0]=ue("div",{class:"headerleft"},[ue("h1",null,"Dinacon Hydrophone Explorer"),ue("h2",null,"Passive Acoustic Listening tool by Logan, hydrophone recordings by Ashlin")],-1)),ue("div",kC,[tt(nC)])]),tt(OS),h[1]||(h[1]=ue("div",{class:"spacer"},null,-1)),ue("div",DC,[tt(kh,{storeType:"A"}),tt(Ph,{storeType:"A"})]),ue("div",NC,[tt(KS),tt(gC)]),ue("div",xC,[tt(kh,{storeType:"B"}),tt(Ph,{storeType:"B"})]),tt(CC)]))}},OC=Nn(VC,[["__scopeId","data-v-79170eee"]]),jg=xv(OC),MC=Mv();jg.use(MC);jg.mount("#app");
