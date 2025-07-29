(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();/**
* @vue/shared v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**//*! #__NO_SIDE_EFFECTS__ */function tl(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const Be={},ns=[],sn=()=>{},P_=()=>!1,ta=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),nl=t=>t.startsWith("onUpdate:"),Nt=Object.assign,rl=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},k_=Object.prototype.hasOwnProperty,Le=(t,e)=>k_.call(t,e),ge=Array.isArray,rs=t=>na(t)==="[object Map]",Ef=t=>na(t)==="[object Set]",Se=t=>typeof t=="function",ot=t=>typeof t=="string",pr=t=>typeof t=="symbol",Qe=t=>t!==null&&typeof t=="object",If=t=>(Qe(t)||Se(t))&&Se(t.then)&&Se(t.catch),wf=Object.prototype.toString,na=t=>wf.call(t),D_=t=>na(t).slice(8,-1),Af=t=>na(t)==="[object Object]",sl=t=>ot(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,Xs=tl(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),ra=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},N_=/-(\w)/g,ir=ra(t=>t.replace(N_,(e,n)=>n?n.toUpperCase():"")),x_=/\B([A-Z])/g,mr=ra(t=>t.replace(x_,"-$1").toLowerCase()),Sf=ra(t=>t.charAt(0).toUpperCase()+t.slice(1)),za=ra(t=>t?`on${Sf(t)}`:""),Yn=(t,e)=>!Object.is(t,e),ho=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},gc=(t,e,n,r=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:r,value:n})},_c=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let ih;const sa=()=>ih||(ih=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Sn(t){if(ge(t)){const e={};for(let n=0;n<t.length;n++){const r=t[n],s=ot(r)?L_(r):Sn(r);if(s)for(const i in s)e[i]=s[i]}return e}else if(ot(t)||Qe(t))return t}const V_=/;(?![^(]*\))/g,O_=/:([^]+)/,M_=/\/\*[^]*?\*\//g;function L_(t){const e={};return t.replace(M_,"").split(V_).forEach(n=>{if(n){const r=n.split(O_);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}function fn(t){let e="";if(ot(t))e=t;else if(ge(t))for(let n=0;n<t.length;n++){const r=fn(t[n]);r&&(e+=r+" ")}else if(Qe(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const F_="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",U_=tl(F_);function bf(t){return!!t||t===""}const Cf=t=>!!(t&&t.__v_isRef===!0),Ke=t=>ot(t)?t:t==null?"":ge(t)||Qe(t)&&(t.toString===wf||!Se(t.toString))?Cf(t)?Ke(t.value):JSON.stringify(t,Rf,2):String(t),Rf=(t,e)=>Cf(e)?Rf(t,e.value):rs(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[r,s],i)=>(n[Ga(r,i)+" =>"]=s,n),{})}:Ef(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>Ga(n))}:pr(e)?Ga(e):Qe(e)&&!ge(e)&&!Af(e)?String(e):e,Ga=(t,e="")=>{var n;return pr(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let wt;class Pf{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=wt,!e&&wt&&(this.index=(wt.scopes||(wt.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].pause();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].resume();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].resume()}}run(e){if(this._active){const n=wt;try{return wt=this,e()}finally{wt=n}}}on(){++this._on===1&&(this.prevScope=wt,wt=this)}off(){this._on>0&&--this._on===0&&(wt=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(this.effects.length=0,n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function kf(t){return new Pf(t)}function Df(){return wt}function $_(t,e=!1){wt&&wt.cleanups.push(t)}let qe;const Ka=new WeakSet;class Nf{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,wt&&wt.active&&wt.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Ka.has(this)&&(Ka.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Vf(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,oh(this),Of(this);const e=qe,n=Jt;qe=this,Jt=!0;try{return this.fn()}finally{Mf(this),qe=e,Jt=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)al(e);this.deps=this.depsTail=void 0,oh(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Ka.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){yc(this)&&this.run()}get dirty(){return yc(this)}}let xf=0,Js,Ys;function Vf(t,e=!1){if(t.flags|=8,e){t.next=Ys,Ys=t;return}t.next=Js,Js=t}function il(){xf++}function ol(){if(--xf>0)return;if(Ys){let e=Ys;for(Ys=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;Js;){let e=Js;for(Js=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(r){t||(t=r)}e=n}}if(t)throw t}function Of(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function Mf(t){let e,n=t.depsTail,r=n;for(;r;){const s=r.prevDep;r.version===-1?(r===n&&(n=s),al(r),B_(r)):e=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=s}t.deps=e,t.depsTail=n}function yc(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(Lf(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function Lf(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===hi)||(t.globalVersion=hi,!t.isSSR&&t.flags&128&&(!t.deps&&!t._dirty||!yc(t))))return;t.flags|=2;const e=t.dep,n=qe,r=Jt;qe=t,Jt=!0;try{Of(t);const s=t.fn(t._value);(e.version===0||Yn(s,t._value))&&(t.flags|=128,t._value=s,e.version++)}catch(s){throw e.version++,s}finally{qe=n,Jt=r,Mf(t),t.flags&=-3}}function al(t,e=!1){const{dep:n,prevSub:r,nextSub:s}=t;if(r&&(r.nextSub=s,t.prevSub=void 0),s&&(s.prevSub=r,t.nextSub=void 0),n.subs===t&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let i=n.computed.deps;i;i=i.nextDep)al(i,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function B_(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let Jt=!0;const Ff=[];function bn(){Ff.push(Jt),Jt=!1}function Cn(){const t=Ff.pop();Jt=t===void 0?!0:t}function oh(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=qe;qe=void 0;try{e()}finally{qe=n}}}let hi=0;class j_{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class cl{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!qe||!Jt||qe===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==qe)n=this.activeLink=new j_(qe,this),qe.deps?(n.prevDep=qe.depsTail,qe.depsTail.nextDep=n,qe.depsTail=n):qe.deps=qe.depsTail=n,Uf(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const r=n.nextDep;r.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=r),n.prevDep=qe.depsTail,n.nextDep=void 0,qe.depsTail.nextDep=n,qe.depsTail=n,qe.deps===n&&(qe.deps=r)}return n}trigger(e){this.version++,hi++,this.notify(e)}notify(e){il();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{ol()}}}function Uf(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let r=e.deps;r;r=r.nextDep)Uf(r)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const Ro=new WeakMap,Rr=Symbol(""),vc=Symbol(""),di=Symbol("");function St(t,e,n){if(Jt&&qe){let r=Ro.get(t);r||Ro.set(t,r=new Map);let s=r.get(n);s||(r.set(n,s=new cl),s.map=r,s.key=n),s.track()}}function Tn(t,e,n,r,s,i){const a=Ro.get(t);if(!a){hi++;return}const c=l=>{l&&l.trigger()};if(il(),e==="clear")a.forEach(c);else{const l=ge(t),h=l&&sl(n);if(l&&n==="length"){const f=Number(r);a.forEach((p,y)=>{(y==="length"||y===di||!pr(y)&&y>=f)&&c(p)})}else switch((n!==void 0||a.has(void 0))&&c(a.get(n)),h&&c(a.get(di)),e){case"add":l?h&&c(a.get("length")):(c(a.get(Rr)),rs(t)&&c(a.get(vc)));break;case"delete":l||(c(a.get(Rr)),rs(t)&&c(a.get(vc)));break;case"set":rs(t)&&c(a.get(Rr));break}}ol()}function q_(t,e){const n=Ro.get(t);return n&&n.get(e)}function Gr(t){const e=Ve(t);return e===t?e:(St(e,"iterate",di),Wt(t)?e:e.map(mt))}function ia(t){return St(t=Ve(t),"iterate",di),t}const H_={__proto__:null,[Symbol.iterator](){return Qa(this,Symbol.iterator,mt)},concat(...t){return Gr(this).concat(...t.map(e=>ge(e)?Gr(e):e))},entries(){return Qa(this,"entries",t=>(t[1]=mt(t[1]),t))},every(t,e){return yn(this,"every",t,e,void 0,arguments)},filter(t,e){return yn(this,"filter",t,e,n=>n.map(mt),arguments)},find(t,e){return yn(this,"find",t,e,mt,arguments)},findIndex(t,e){return yn(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return yn(this,"findLast",t,e,mt,arguments)},findLastIndex(t,e){return yn(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return yn(this,"forEach",t,e,void 0,arguments)},includes(...t){return Xa(this,"includes",t)},indexOf(...t){return Xa(this,"indexOf",t)},join(t){return Gr(this).join(t)},lastIndexOf(...t){return Xa(this,"lastIndexOf",t)},map(t,e){return yn(this,"map",t,e,void 0,arguments)},pop(){return Bs(this,"pop")},push(...t){return Bs(this,"push",t)},reduce(t,...e){return ah(this,"reduce",t,e)},reduceRight(t,...e){return ah(this,"reduceRight",t,e)},shift(){return Bs(this,"shift")},some(t,e){return yn(this,"some",t,e,void 0,arguments)},splice(...t){return Bs(this,"splice",t)},toReversed(){return Gr(this).toReversed()},toSorted(t){return Gr(this).toSorted(t)},toSpliced(...t){return Gr(this).toSpliced(...t)},unshift(...t){return Bs(this,"unshift",t)},values(){return Qa(this,"values",mt)}};function Qa(t,e,n){const r=ia(t),s=r[e]();return r!==t&&!Wt(t)&&(s._next=s.next,s.next=()=>{const i=s._next();return i.value&&(i.value=n(i.value)),i}),s}const W_=Array.prototype;function yn(t,e,n,r,s,i){const a=ia(t),c=a!==t&&!Wt(t),l=a[e];if(l!==W_[e]){const p=l.apply(t,i);return c?mt(p):p}let h=n;a!==t&&(c?h=function(p,y){return n.call(this,mt(p),y,t)}:n.length>2&&(h=function(p,y){return n.call(this,p,y,t)}));const f=l.call(a,h,r);return c&&s?s(f):f}function ah(t,e,n,r){const s=ia(t);let i=n;return s!==t&&(Wt(t)?n.length>3&&(i=function(a,c,l){return n.call(this,a,c,l,t)}):i=function(a,c,l){return n.call(this,a,mt(c),l,t)}),s[e](i,...r)}function Xa(t,e,n){const r=Ve(t);St(r,"iterate",di);const s=r[e](...n);return(s===-1||s===!1)&&hl(n[0])?(n[0]=Ve(n[0]),r[e](...n)):s}function Bs(t,e,n=[]){bn(),il();const r=Ve(t)[e].apply(t,n);return ol(),Cn(),r}const z_=tl("__proto__,__v_isRef,__isVue"),$f=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(pr));function G_(t){pr(t)||(t=String(t));const e=Ve(this);return St(e,"has",t),e.hasOwnProperty(t)}class Bf{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,r){if(n==="__v_skip")return e.__v_skip;const s=this._isReadonly,i=this._isShallow;if(n==="__v_isReactive")return!s;if(n==="__v_isReadonly")return s;if(n==="__v_isShallow")return i;if(n==="__v_raw")return r===(s?i?ry:Wf:i?Hf:qf).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(r)?e:void 0;const a=ge(e);if(!s){let l;if(a&&(l=H_[n]))return l;if(n==="hasOwnProperty")return G_}const c=Reflect.get(e,n,et(e)?e:r);return(pr(n)?$f.has(n):z_(n))||(s||St(e,"get",n),i)?c:et(c)?a&&sl(n)?c:c.value:Qe(c)?s?zf(c):oa(c):c}}class jf extends Bf{constructor(e=!1){super(!1,e)}set(e,n,r,s){let i=e[n];if(!this._isShallow){const l=or(i);if(!Wt(r)&&!or(r)&&(i=Ve(i),r=Ve(r)),!ge(e)&&et(i)&&!et(r))return l?!1:(i.value=r,!0)}const a=ge(e)&&sl(n)?Number(n)<e.length:Le(e,n),c=Reflect.set(e,n,r,et(e)?e:s);return e===Ve(s)&&(a?Yn(r,i)&&Tn(e,"set",n,r):Tn(e,"add",n,r)),c}deleteProperty(e,n){const r=Le(e,n);e[n];const s=Reflect.deleteProperty(e,n);return s&&r&&Tn(e,"delete",n,void 0),s}has(e,n){const r=Reflect.has(e,n);return(!pr(n)||!$f.has(n))&&St(e,"has",n),r}ownKeys(e){return St(e,"iterate",ge(e)?"length":Rr),Reflect.ownKeys(e)}}class K_ extends Bf{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const Q_=new jf,X_=new K_,J_=new jf(!0);const Tc=t=>t,no=t=>Reflect.getPrototypeOf(t);function Y_(t,e,n){return function(...r){const s=this.__v_raw,i=Ve(s),a=rs(i),c=t==="entries"||t===Symbol.iterator&&a,l=t==="keys"&&a,h=s[t](...r),f=n?Tc:e?Po:mt;return!e&&St(i,"iterate",l?vc:Rr),{next(){const{value:p,done:y}=h.next();return y?{value:p,done:y}:{value:c?[f(p[0]),f(p[1])]:f(p),done:y}},[Symbol.iterator](){return this}}}}function ro(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function Z_(t,e){const n={get(s){const i=this.__v_raw,a=Ve(i),c=Ve(s);t||(Yn(s,c)&&St(a,"get",s),St(a,"get",c));const{has:l}=no(a),h=e?Tc:t?Po:mt;if(l.call(a,s))return h(i.get(s));if(l.call(a,c))return h(i.get(c));i!==a&&i.get(s)},get size(){const s=this.__v_raw;return!t&&St(Ve(s),"iterate",Rr),Reflect.get(s,"size",s)},has(s){const i=this.__v_raw,a=Ve(i),c=Ve(s);return t||(Yn(s,c)&&St(a,"has",s),St(a,"has",c)),s===c?i.has(s):i.has(s)||i.has(c)},forEach(s,i){const a=this,c=a.__v_raw,l=Ve(c),h=e?Tc:t?Po:mt;return!t&&St(l,"iterate",Rr),c.forEach((f,p)=>s.call(i,h(f),h(p),a))}};return Nt(n,t?{add:ro("add"),set:ro("set"),delete:ro("delete"),clear:ro("clear")}:{add(s){!e&&!Wt(s)&&!or(s)&&(s=Ve(s));const i=Ve(this);return no(i).has.call(i,s)||(i.add(s),Tn(i,"add",s,s)),this},set(s,i){!e&&!Wt(i)&&!or(i)&&(i=Ve(i));const a=Ve(this),{has:c,get:l}=no(a);let h=c.call(a,s);h||(s=Ve(s),h=c.call(a,s));const f=l.call(a,s);return a.set(s,i),h?Yn(i,f)&&Tn(a,"set",s,i):Tn(a,"add",s,i),this},delete(s){const i=Ve(this),{has:a,get:c}=no(i);let l=a.call(i,s);l||(s=Ve(s),l=a.call(i,s)),c&&c.call(i,s);const h=i.delete(s);return l&&Tn(i,"delete",s,void 0),h},clear(){const s=Ve(this),i=s.size!==0,a=s.clear();return i&&Tn(s,"clear",void 0,void 0),a}}),["keys","values","entries",Symbol.iterator].forEach(s=>{n[s]=Y_(s,t,e)}),n}function ll(t,e){const n=Z_(t,e);return(r,s,i)=>s==="__v_isReactive"?!t:s==="__v_isReadonly"?t:s==="__v_raw"?r:Reflect.get(Le(n,s)&&s in r?n:r,s,i)}const ey={get:ll(!1,!1)},ty={get:ll(!1,!0)},ny={get:ll(!0,!1)};const qf=new WeakMap,Hf=new WeakMap,Wf=new WeakMap,ry=new WeakMap;function sy(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function iy(t){return t.__v_skip||!Object.isExtensible(t)?0:sy(D_(t))}function oa(t){return or(t)?t:ul(t,!1,Q_,ey,qf)}function oy(t){return ul(t,!1,J_,ty,Hf)}function zf(t){return ul(t,!0,X_,ny,Wf)}function ul(t,e,n,r,s){if(!Qe(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const i=iy(t);if(i===0)return t;const a=s.get(t);if(a)return a;const c=new Proxy(t,i===2?r:n);return s.set(t,c),c}function Zn(t){return or(t)?Zn(t.__v_raw):!!(t&&t.__v_isReactive)}function or(t){return!!(t&&t.__v_isReadonly)}function Wt(t){return!!(t&&t.__v_isShallow)}function hl(t){return t?!!t.__v_raw:!1}function Ve(t){const e=t&&t.__v_raw;return e?Ve(e):t}function dl(t){return!Le(t,"__v_skip")&&Object.isExtensible(t)&&gc(t,"__v_skip",!0),t}const mt=t=>Qe(t)?oa(t):t,Po=t=>Qe(t)?zf(t):t;function et(t){return t?t.__v_isRef===!0:!1}function Ae(t){return ay(t,!1)}function ay(t,e){return et(t)?t:new cy(t,e)}class cy{constructor(e,n){this.dep=new cl,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:Ve(e),this._value=n?e:mt(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,r=this.__v_isShallow||Wt(e)||or(e);e=r?e:Ve(e),Yn(e,n)&&(this._rawValue=e,this._value=r?e:mt(e),this.dep.trigger())}}function Gf(t){return et(t)?t.value:t}const ly={get:(t,e,n)=>e==="__v_raw"?t:Gf(Reflect.get(t,e,n)),set:(t,e,n,r)=>{const s=t[e];return et(s)&&!et(n)?(s.value=n,!0):Reflect.set(t,e,n,r)}};function Kf(t){return Zn(t)?t:new Proxy(t,ly)}function uy(t){const e=ge(t)?new Array(t.length):{};for(const n in t)e[n]=dy(t,n);return e}class hy{constructor(e,n,r){this._object=e,this._key=n,this._defaultValue=r,this.__v_isRef=!0,this._value=void 0}get value(){const e=this._object[this._key];return this._value=e===void 0?this._defaultValue:e}set value(e){this._object[this._key]=e}get dep(){return q_(Ve(this._object),this._key)}}function dy(t,e,n){const r=t[e];return et(r)?r:new hy(t,e,n)}class fy{constructor(e,n,r){this.fn=e,this.setter=n,this._value=void 0,this.dep=new cl(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=hi-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=r}notify(){if(this.flags|=16,!(this.flags&8)&&qe!==this)return Vf(this,!0),!0}get value(){const e=this.dep.track();return Lf(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function py(t,e,n=!1){let r,s;return Se(t)?r=t:(r=t.get,s=t.set),new fy(r,s,n)}const so={},ko=new WeakMap;let Ar;function my(t,e=!1,n=Ar){if(n){let r=ko.get(n);r||ko.set(n,r=[]),r.push(t)}}function gy(t,e,n=Be){const{immediate:r,deep:s,once:i,scheduler:a,augmentJob:c,call:l}=n,h=z=>s?z:Wt(z)||s===!1||s===0?En(z,1):En(z);let f,p,y,S,R=!1,N=!1;if(et(t)?(p=()=>t.value,R=Wt(t)):Zn(t)?(p=()=>h(t),R=!0):ge(t)?(N=!0,R=t.some(z=>Zn(z)||Wt(z)),p=()=>t.map(z=>{if(et(z))return z.value;if(Zn(z))return h(z);if(Se(z))return l?l(z,2):z()})):Se(t)?e?p=l?()=>l(t,2):t:p=()=>{if(y){bn();try{y()}finally{Cn()}}const z=Ar;Ar=f;try{return l?l(t,3,[S]):t(S)}finally{Ar=z}}:p=sn,e&&s){const z=p,oe=s===!0?1/0:s;p=()=>En(z(),oe)}const k=Df(),L=()=>{f.stop(),k&&k.active&&rl(k.effects,f)};if(i&&e){const z=e;e=(...oe)=>{z(...oe),L()}}let q=N?new Array(t.length).fill(so):so;const H=z=>{if(!(!(f.flags&1)||!f.dirty&&!z))if(e){const oe=f.run();if(s||R||(N?oe.some((_e,w)=>Yn(_e,q[w])):Yn(oe,q))){y&&y();const _e=Ar;Ar=f;try{const w=[oe,q===so?void 0:N&&q[0]===so?[]:q,S];q=oe,l?l(e,3,w):e(...w)}finally{Ar=_e}}}else f.run()};return c&&c(H),f=new Nf(p),f.scheduler=a?()=>a(H,!1):H,S=z=>my(z,!1,f),y=f.onStop=()=>{const z=ko.get(f);if(z){if(l)l(z,4);else for(const oe of z)oe();ko.delete(f)}},e?r?H(!0):q=f.run():a?a(H.bind(null,!0),!0):f.run(),L.pause=f.pause.bind(f),L.resume=f.resume.bind(f),L.stop=L,L}function En(t,e=1/0,n){if(e<=0||!Qe(t)||t.__v_skip||(n=n||new Set,n.has(t)))return t;if(n.add(t),e--,et(t))En(t.value,e,n);else if(ge(t))for(let r=0;r<t.length;r++)En(t[r],e,n);else if(Ef(t)||rs(t))t.forEach(r=>{En(r,e,n)});else if(Af(t)){for(const r in t)En(t[r],e,n);for(const r of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,r)&&En(t[r],e,n)}return t}/**
* @vue/runtime-core v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function bi(t,e,n,r){try{return r?t(...r):t()}catch(s){aa(s,e,n)}}function pn(t,e,n,r){if(Se(t)){const s=bi(t,e,n,r);return s&&If(s)&&s.catch(i=>{aa(i,e,n)}),s}if(ge(t)){const s=[];for(let i=0;i<t.length;i++)s.push(pn(t[i],e,n,r));return s}}function aa(t,e,n,r=!0){const s=e?e.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:a}=e&&e.appContext.config||Be;if(e){let c=e.parent;const l=e.proxy,h=`https://vuejs.org/error-reference/#runtime-${n}`;for(;c;){const f=c.ec;if(f){for(let p=0;p<f.length;p++)if(f[p](t,l,h)===!1)return}c=c.parent}if(i){bn(),bi(i,null,10,[t,l,h]),Cn();return}}_y(t,n,s,r,a)}function _y(t,e,n,r=!0,s=!1){if(s)throw t;console.error(t)}const kt=[];let tn=-1;const ss=[];let zn=null,Xr=0;const Qf=Promise.resolve();let Do=null;function fl(t){const e=Do||Qf;return t?e.then(this?t.bind(this):t):e}function yy(t){let e=tn+1,n=kt.length;for(;e<n;){const r=e+n>>>1,s=kt[r],i=fi(s);i<t||i===t&&s.flags&2?e=r+1:n=r}return e}function pl(t){if(!(t.flags&1)){const e=fi(t),n=kt[kt.length-1];!n||!(t.flags&2)&&e>=fi(n)?kt.push(t):kt.splice(yy(e),0,t),t.flags|=1,Xf()}}function Xf(){Do||(Do=Qf.then(Yf))}function vy(t){ge(t)?ss.push(...t):zn&&t.id===-1?zn.splice(Xr+1,0,t):t.flags&1||(ss.push(t),t.flags|=1),Xf()}function ch(t,e,n=tn+1){for(;n<kt.length;n++){const r=kt[n];if(r&&r.flags&2){if(t&&r.id!==t.uid)continue;kt.splice(n,1),n--,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function Jf(t){if(ss.length){const e=[...new Set(ss)].sort((n,r)=>fi(n)-fi(r));if(ss.length=0,zn){zn.push(...e);return}for(zn=e,Xr=0;Xr<zn.length;Xr++){const n=zn[Xr];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}zn=null,Xr=0}}const fi=t=>t.id==null?t.flags&2?-1:1/0:t.id;function Yf(t){try{for(tn=0;tn<kt.length;tn++){const e=kt[tn];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),bi(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;tn<kt.length;tn++){const e=kt[tn];e&&(e.flags&=-2)}tn=-1,kt.length=0,Jf(),Do=null,(kt.length||ss.length)&&Yf()}}let qt=null,Zf=null;function No(t){const e=qt;return qt=t,Zf=t&&t.type.__scopeId||null,e}function Ty(t,e=qt,n){if(!e||t._n)return t;const r=(...s)=>{r._d&&_h(-1);const i=No(e);let a;try{a=t(...s)}finally{No(i),r._d&&_h(1)}return a};return r._n=!0,r._c=!0,r._d=!0,r}function fo(t,e){if(qt===null)return t;const n=ha(qt),r=t.dirs||(t.dirs=[]);for(let s=0;s<e.length;s++){let[i,a,c,l=Be]=e[s];i&&(Se(i)&&(i={mounted:i,updated:i}),i.deep&&En(a),r.push({dir:i,instance:n,value:a,oldValue:void 0,arg:c,modifiers:l}))}return t}function Ir(t,e,n,r){const s=t.dirs,i=e&&e.dirs;for(let a=0;a<s.length;a++){const c=s[a];i&&(c.oldValue=i[a].value);let l=c.dir[r];l&&(bn(),pn(l,n,8,[t.el,c,t,e]),Cn())}}const Ey=Symbol("_vte"),Iy=t=>t.__isTeleport;function ml(t,e){t.shapeFlag&6&&t.component?(t.transition=e,ml(t.component.subTree,e)):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}function ep(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}function Zs(t,e,n,r,s=!1){if(ge(t)){t.forEach((R,N)=>Zs(R,e&&(ge(e)?e[N]:e),n,r,s));return}if(ei(r)&&!s){r.shapeFlag&512&&r.type.__asyncResolved&&r.component.subTree.component&&Zs(t,e,n,r.component.subTree);return}const i=r.shapeFlag&4?ha(r.component):r.el,a=s?null:i,{i:c,r:l}=t,h=e&&e.r,f=c.refs===Be?c.refs={}:c.refs,p=c.setupState,y=Ve(p),S=p===Be?()=>!1:R=>Le(y,R);if(h!=null&&h!==l&&(ot(h)?(f[h]=null,S(h)&&(p[h]=null)):et(h)&&(h.value=null)),Se(l))bi(l,c,12,[a,f]);else{const R=ot(l),N=et(l);if(R||N){const k=()=>{if(t.f){const L=R?S(l)?p[l]:f[l]:l.value;s?ge(L)&&rl(L,i):ge(L)?L.includes(i)||L.push(i):R?(f[l]=[i],S(l)&&(p[l]=f[l])):(l.value=[i],t.k&&(f[t.k]=l.value))}else R?(f[l]=a,S(l)&&(p[l]=a)):N&&(l.value=a,t.k&&(f[t.k]=a))};a?(k.id=-1,Lt(k,n)):k()}}}sa().requestIdleCallback;sa().cancelIdleCallback;const ei=t=>!!t.type.__asyncLoader,tp=t=>t.type.__isKeepAlive;function wy(t,e){np(t,"a",e)}function Ay(t,e){np(t,"da",e)}function np(t,e,n=Dt){const r=t.__wdc||(t.__wdc=()=>{let s=n;for(;s;){if(s.isDeactivated)return;s=s.parent}return t()});if(ca(e,r,n),n){let s=n.parent;for(;s&&s.parent;)tp(s.parent.vnode)&&Sy(r,e,n,s),s=s.parent}}function Sy(t,e,n,r){const s=ca(e,t,r,!0);On(()=>{rl(r[e],s)},n)}function ca(t,e,n=Dt,r=!1){if(n){const s=n[t]||(n[t]=[]),i=e.__weh||(e.__weh=(...a)=>{bn();const c=Ci(n),l=pn(e,n,t,a);return c(),Cn(),l});return r?s.unshift(i):s.push(i),i}}const Vn=t=>(e,n=Dt)=>{(!mi||t==="sp")&&ca(t,(...r)=>e(...r),n)},by=Vn("bm"),gr=Vn("m"),Cy=Vn("bu"),Ry=Vn("u"),Py=Vn("bum"),On=Vn("um"),ky=Vn("sp"),Dy=Vn("rtg"),Ny=Vn("rtc");function xy(t,e=Dt){ca("ec",t,e)}const Vy=Symbol.for("v-ndc");function Kt(t,e,n,r){let s;const i=n,a=ge(t);if(a||ot(t)){const c=a&&Zn(t);let l=!1,h=!1;c&&(l=!Wt(t),h=or(t),t=ia(t)),s=new Array(t.length);for(let f=0,p=t.length;f<p;f++)s[f]=e(l?h?Po(mt(t[f])):mt(t[f]):t[f],f,void 0,i)}else if(typeof t=="number"){s=new Array(t);for(let c=0;c<t;c++)s[c]=e(c+1,c,void 0,i)}else if(Qe(t))if(t[Symbol.iterator])s=Array.from(t,(c,l)=>e(c,l,void 0,i));else{const c=Object.keys(t);s=new Array(c.length);for(let l=0,h=c.length;l<h;l++){const f=c[l];s[l]=e(t[f],f,l,i)}}else s=[];return s}const Ec=t=>t?Ap(t)?ha(t):Ec(t.parent):null,ti=Nt(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>Ec(t.parent),$root:t=>Ec(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>sp(t),$forceUpdate:t=>t.f||(t.f=()=>{pl(t.update)}),$nextTick:t=>t.n||(t.n=fl.bind(t.proxy)),$watch:t=>rv.bind(t)}),Ja=(t,e)=>t!==Be&&!t.__isScriptSetup&&Le(t,e),Oy={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:r,data:s,props:i,accessCache:a,type:c,appContext:l}=t;let h;if(e[0]!=="$"){const S=a[e];if(S!==void 0)switch(S){case 1:return r[e];case 2:return s[e];case 4:return n[e];case 3:return i[e]}else{if(Ja(r,e))return a[e]=1,r[e];if(s!==Be&&Le(s,e))return a[e]=2,s[e];if((h=t.propsOptions[0])&&Le(h,e))return a[e]=3,i[e];if(n!==Be&&Le(n,e))return a[e]=4,n[e];Ic&&(a[e]=0)}}const f=ti[e];let p,y;if(f)return e==="$attrs"&&St(t.attrs,"get",""),f(t);if((p=c.__cssModules)&&(p=p[e]))return p;if(n!==Be&&Le(n,e))return a[e]=4,n[e];if(y=l.config.globalProperties,Le(y,e))return y[e]},set({_:t},e,n){const{data:r,setupState:s,ctx:i}=t;return Ja(s,e)?(s[e]=n,!0):r!==Be&&Le(r,e)?(r[e]=n,!0):Le(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(i[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:r,appContext:s,propsOptions:i}},a){let c;return!!n[a]||t!==Be&&Le(t,a)||Ja(e,a)||(c=i[0])&&Le(c,a)||Le(r,a)||Le(ti,a)||Le(s.config.globalProperties,a)},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:Le(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function lh(t){return ge(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let Ic=!0;function My(t){const e=sp(t),n=t.proxy,r=t.ctx;Ic=!1,e.beforeCreate&&uh(e.beforeCreate,t,"bc");const{data:s,computed:i,methods:a,watch:c,provide:l,inject:h,created:f,beforeMount:p,mounted:y,beforeUpdate:S,updated:R,activated:N,deactivated:k,beforeDestroy:L,beforeUnmount:q,destroyed:H,unmounted:z,render:oe,renderTracked:_e,renderTriggered:w,errorCaptured:_,serverPrefetch:m,expose:v,inheritAttrs:I,components:b,directives:E,filters:Oe}=e;if(h&&Ly(h,r,null),a)for(const ae in a){const Te=a[ae];Se(Te)&&(r[ae]=Te.bind(n))}if(s){const ae=s.call(n,n);Qe(ae)&&(t.data=oa(ae))}if(Ic=!0,i)for(const ae in i){const Te=i[ae],je=Se(Te)?Te.bind(n,n):Se(Te.get)?Te.get.bind(n,n):sn,xt=!Se(Te)&&Se(Te.set)?Te.set.bind(n):sn,D=ee({get:je,set:xt});Object.defineProperty(r,ae,{enumerable:!0,configurable:!0,get:()=>D.value,set:F=>D.value=F})}if(c)for(const ae in c)rp(c[ae],r,n,ae);if(l){const ae=Se(l)?l.call(n):l;Reflect.ownKeys(ae).forEach(Te=>{qy(Te,ae[Te])})}f&&uh(f,t,"c");function ve(ae,Te){ge(Te)?Te.forEach(je=>ae(je.bind(n))):Te&&ae(Te.bind(n))}if(ve(by,p),ve(gr,y),ve(Cy,S),ve(Ry,R),ve(wy,N),ve(Ay,k),ve(xy,_),ve(Ny,_e),ve(Dy,w),ve(Py,q),ve(On,z),ve(ky,m),ge(v))if(v.length){const ae=t.exposed||(t.exposed={});v.forEach(Te=>{Object.defineProperty(ae,Te,{get:()=>n[Te],set:je=>n[Te]=je,enumerable:!0})})}else t.exposed||(t.exposed={});oe&&t.render===sn&&(t.render=oe),I!=null&&(t.inheritAttrs=I),b&&(t.components=b),E&&(t.directives=E),m&&ep(t)}function Ly(t,e,n=sn){ge(t)&&(t=wc(t));for(const r in t){const s=t[r];let i;Qe(s)?"default"in s?i=ni(s.from||r,s.default,!0):i=ni(s.from||r):i=ni(s),et(i)?Object.defineProperty(e,r,{enumerable:!0,configurable:!0,get:()=>i.value,set:a=>i.value=a}):e[r]=i}}function uh(t,e,n){pn(ge(t)?t.map(r=>r.bind(e.proxy)):t.bind(e.proxy),e,n)}function rp(t,e,n,r){let s=r.includes(".")?_p(n,r):()=>n[r];if(ot(t)){const i=e[t];Se(i)&&Ht(s,i)}else if(Se(t))Ht(s,t.bind(n));else if(Qe(t))if(ge(t))t.forEach(i=>rp(i,e,n,r));else{const i=Se(t.handler)?t.handler.bind(n):e[t.handler];Se(i)&&Ht(s,i,t)}}function sp(t){const e=t.type,{mixins:n,extends:r}=e,{mixins:s,optionsCache:i,config:{optionMergeStrategies:a}}=t.appContext,c=i.get(e);let l;return c?l=c:!s.length&&!n&&!r?l=e:(l={},s.length&&s.forEach(h=>xo(l,h,a,!0)),xo(l,e,a)),Qe(e)&&i.set(e,l),l}function xo(t,e,n,r=!1){const{mixins:s,extends:i}=e;i&&xo(t,i,n,!0),s&&s.forEach(a=>xo(t,a,n,!0));for(const a in e)if(!(r&&a==="expose")){const c=Fy[a]||n&&n[a];t[a]=c?c(t[a],e[a]):e[a]}return t}const Fy={data:hh,props:dh,emits:dh,methods:qs,computed:qs,beforeCreate:Pt,created:Pt,beforeMount:Pt,mounted:Pt,beforeUpdate:Pt,updated:Pt,beforeDestroy:Pt,beforeUnmount:Pt,destroyed:Pt,unmounted:Pt,activated:Pt,deactivated:Pt,errorCaptured:Pt,serverPrefetch:Pt,components:qs,directives:qs,watch:$y,provide:hh,inject:Uy};function hh(t,e){return e?t?function(){return Nt(Se(t)?t.call(this,this):t,Se(e)?e.call(this,this):e)}:e:t}function Uy(t,e){return qs(wc(t),wc(e))}function wc(t){if(ge(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function Pt(t,e){return t?[...new Set([].concat(t,e))]:e}function qs(t,e){return t?Nt(Object.create(null),t,e):e}function dh(t,e){return t?ge(t)&&ge(e)?[...new Set([...t,...e])]:Nt(Object.create(null),lh(t),lh(e??{})):e}function $y(t,e){if(!t)return e;if(!e)return t;const n=Nt(Object.create(null),t);for(const r in e)n[r]=Pt(t[r],e[r]);return n}function ip(){return{app:null,config:{isNativeTag:P_,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let By=0;function jy(t,e){return function(r,s=null){Se(r)||(r=Nt({},r)),s!=null&&!Qe(s)&&(s=null);const i=ip(),a=new WeakSet,c=[];let l=!1;const h=i.app={_uid:By++,_component:r,_props:s,_container:null,_context:i,_instance:null,version:Av,get config(){return i.config},set config(f){},use(f,...p){return a.has(f)||(f&&Se(f.install)?(a.add(f),f.install(h,...p)):Se(f)&&(a.add(f),f(h,...p))),h},mixin(f){return i.mixins.includes(f)||i.mixins.push(f),h},component(f,p){return p?(i.components[f]=p,h):i.components[f]},directive(f,p){return p?(i.directives[f]=p,h):i.directives[f]},mount(f,p,y){if(!l){const S=h._ceVNode||nt(r,s);return S.appContext=i,y===!0?y="svg":y===!1&&(y=void 0),t(S,f,y),l=!0,h._container=f,f.__vue_app__=h,ha(S.component)}},onUnmount(f){c.push(f)},unmount(){l&&(pn(c,h._instance,16),t(null,h._container),delete h._container.__vue_app__)},provide(f,p){return i.provides[f]=p,h},runWithContext(f){const p=Pr;Pr=h;try{return f()}finally{Pr=p}}};return h}}let Pr=null;function qy(t,e){if(Dt){let n=Dt.provides;const r=Dt.parent&&Dt.parent.provides;r===n&&(n=Dt.provides=Object.create(r)),n[t]=e}}function ni(t,e,n=!1){const r=wp();if(r||Pr){let s=Pr?Pr._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(s&&t in s)return s[t];if(arguments.length>1)return n&&Se(e)?e.call(r&&r.proxy):e}}function Hy(){return!!(wp()||Pr)}const op={},ap=()=>Object.create(op),cp=t=>Object.getPrototypeOf(t)===op;function Wy(t,e,n,r=!1){const s={},i=ap();t.propsDefaults=Object.create(null),lp(t,e,s,i);for(const a in t.propsOptions[0])a in s||(s[a]=void 0);n?t.props=r?s:oy(s):t.type.props?t.props=s:t.props=i,t.attrs=i}function zy(t,e,n,r){const{props:s,attrs:i,vnode:{patchFlag:a}}=t,c=Ve(s),[l]=t.propsOptions;let h=!1;if((r||a>0)&&!(a&16)){if(a&8){const f=t.vnode.dynamicProps;for(let p=0;p<f.length;p++){let y=f[p];if(la(t.emitsOptions,y))continue;const S=e[y];if(l)if(Le(i,y))S!==i[y]&&(i[y]=S,h=!0);else{const R=ir(y);s[R]=Ac(l,c,R,S,t,!1)}else S!==i[y]&&(i[y]=S,h=!0)}}}else{lp(t,e,s,i)&&(h=!0);let f;for(const p in c)(!e||!Le(e,p)&&((f=mr(p))===p||!Le(e,f)))&&(l?n&&(n[p]!==void 0||n[f]!==void 0)&&(s[p]=Ac(l,c,p,void 0,t,!0)):delete s[p]);if(i!==c)for(const p in i)(!e||!Le(e,p))&&(delete i[p],h=!0)}h&&Tn(t.attrs,"set","")}function lp(t,e,n,r){const[s,i]=t.propsOptions;let a=!1,c;if(e)for(let l in e){if(Xs(l))continue;const h=e[l];let f;s&&Le(s,f=ir(l))?!i||!i.includes(f)?n[f]=h:(c||(c={}))[f]=h:la(t.emitsOptions,l)||(!(l in r)||h!==r[l])&&(r[l]=h,a=!0)}if(i){const l=Ve(n),h=c||Be;for(let f=0;f<i.length;f++){const p=i[f];n[p]=Ac(s,l,p,h[p],t,!Le(h,p))}}return a}function Ac(t,e,n,r,s,i){const a=t[n];if(a!=null){const c=Le(a,"default");if(c&&r===void 0){const l=a.default;if(a.type!==Function&&!a.skipFactory&&Se(l)){const{propsDefaults:h}=s;if(n in h)r=h[n];else{const f=Ci(s);r=h[n]=l.call(null,e),f()}}else r=l;s.ce&&s.ce._setProp(n,r)}a[0]&&(i&&!c?r=!1:a[1]&&(r===""||r===mr(n))&&(r=!0))}return r}const Gy=new WeakMap;function up(t,e,n=!1){const r=n?Gy:e.propsCache,s=r.get(t);if(s)return s;const i=t.props,a={},c=[];let l=!1;if(!Se(t)){const f=p=>{l=!0;const[y,S]=up(p,e,!0);Nt(a,y),S&&c.push(...S)};!n&&e.mixins.length&&e.mixins.forEach(f),t.extends&&f(t.extends),t.mixins&&t.mixins.forEach(f)}if(!i&&!l)return Qe(t)&&r.set(t,ns),ns;if(ge(i))for(let f=0;f<i.length;f++){const p=ir(i[f]);fh(p)&&(a[p]=Be)}else if(i)for(const f in i){const p=ir(f);if(fh(p)){const y=i[f],S=a[p]=ge(y)||Se(y)?{type:y}:Nt({},y),R=S.type;let N=!1,k=!0;if(ge(R))for(let L=0;L<R.length;++L){const q=R[L],H=Se(q)&&q.name;if(H==="Boolean"){N=!0;break}else H==="String"&&(k=!1)}else N=Se(R)&&R.name==="Boolean";S[0]=N,S[1]=k,(N||Le(S,"default"))&&c.push(p)}}const h=[a,c];return Qe(t)&&r.set(t,h),h}function fh(t){return t[0]!=="$"&&!Xs(t)}const gl=t=>t==="_"||t==="__"||t==="_ctx"||t==="$stable",_l=t=>ge(t)?t.map(rn):[rn(t)],Ky=(t,e,n)=>{if(e._n)return e;const r=Ty((...s)=>_l(e(...s)),n);return r._c=!1,r},hp=(t,e,n)=>{const r=t._ctx;for(const s in t){if(gl(s))continue;const i=t[s];if(Se(i))e[s]=Ky(s,i,r);else if(i!=null){const a=_l(i);e[s]=()=>a}}},dp=(t,e)=>{const n=_l(e);t.slots.default=()=>n},fp=(t,e,n)=>{for(const r in e)(n||!gl(r))&&(t[r]=e[r])},Qy=(t,e,n)=>{const r=t.slots=ap();if(t.vnode.shapeFlag&32){const s=e.__;s&&gc(r,"__",s,!0);const i=e._;i?(fp(r,e,n),n&&gc(r,"_",i,!0)):hp(e,r)}else e&&dp(t,e)},Xy=(t,e,n)=>{const{vnode:r,slots:s}=t;let i=!0,a=Be;if(r.shapeFlag&32){const c=e._;c?n&&c===1?i=!1:fp(s,e,n):(i=!e.$stable,hp(e,s)),a=e}else e&&(dp(t,e),a={default:1});if(i)for(const c in s)!gl(c)&&a[c]==null&&delete s[c]},Lt=uv;function Jy(t){return Yy(t)}function Yy(t,e){const n=sa();n.__VUE__=!0;const{insert:r,remove:s,patchProp:i,createElement:a,createText:c,createComment:l,setText:h,setElementText:f,parentNode:p,nextSibling:y,setScopeId:S=sn,insertStaticContent:R}=t,N=(T,A,V,B=null,U=null,$=null,J=void 0,K=null,G=!!A.dynamicChildren)=>{if(T===A)return;T&&!js(T,A)&&(B=be(T),F(T,U,$,!0),T=null),A.patchFlag===-2&&(G=!1,A.dynamicChildren=null);const{type:j,ref:le,shapeFlag:X}=A;switch(j){case ua:k(T,A,V,B);break;case ar:L(T,A,V,B);break;case po:T==null&&q(A,V,B,J);break;case rt:b(T,A,V,B,U,$,J,K,G);break;default:X&1?oe(T,A,V,B,U,$,J,K,G):X&6?E(T,A,V,B,U,$,J,K,G):(X&64||X&128)&&j.process(T,A,V,B,U,$,J,K,G,Me)}le!=null&&U?Zs(le,T&&T.ref,$,A||T,!A):le==null&&T&&T.ref!=null&&Zs(T.ref,null,$,T,!0)},k=(T,A,V,B)=>{if(T==null)r(A.el=c(A.children),V,B);else{const U=A.el=T.el;A.children!==T.children&&h(U,A.children)}},L=(T,A,V,B)=>{T==null?r(A.el=l(A.children||""),V,B):A.el=T.el},q=(T,A,V,B)=>{[T.el,T.anchor]=R(T.children,A,V,B,T.el,T.anchor)},H=({el:T,anchor:A},V,B)=>{let U;for(;T&&T!==A;)U=y(T),r(T,V,B),T=U;r(A,V,B)},z=({el:T,anchor:A})=>{let V;for(;T&&T!==A;)V=y(T),s(T),T=V;s(A)},oe=(T,A,V,B,U,$,J,K,G)=>{A.type==="svg"?J="svg":A.type==="math"&&(J="mathml"),T==null?_e(A,V,B,U,$,J,K,G):m(T,A,U,$,J,K,G)},_e=(T,A,V,B,U,$,J,K)=>{let G,j;const{props:le,shapeFlag:X,transition:ce,dirs:me}=T;if(G=T.el=a(T.type,$,le&&le.is,le),X&8?f(G,T.children):X&16&&_(T.children,G,null,B,U,Ya(T,$),J,K),me&&Ir(T,null,B,"created"),w(G,T,T.scopeId,J,B),le){for(const we in le)we!=="value"&&!Xs(we)&&i(G,we,null,le[we],$,B);"value"in le&&i(G,"value",null,le.value,$),(j=le.onVnodeBeforeMount)&&en(j,B,T)}me&&Ir(T,null,B,"beforeMount");const de=Zy(U,ce);de&&ce.beforeEnter(G),r(G,A,V),((j=le&&le.onVnodeMounted)||de||me)&&Lt(()=>{j&&en(j,B,T),de&&ce.enter(G),me&&Ir(T,null,B,"mounted")},U)},w=(T,A,V,B,U)=>{if(V&&S(T,V),B)for(let $=0;$<B.length;$++)S(T,B[$]);if(U){let $=U.subTree;if(A===$||vp($.type)&&($.ssContent===A||$.ssFallback===A)){const J=U.vnode;w(T,J,J.scopeId,J.slotScopeIds,U.parent)}}},_=(T,A,V,B,U,$,J,K,G=0)=>{for(let j=G;j<T.length;j++){const le=T[j]=K?Gn(T[j]):rn(T[j]);N(null,le,A,V,B,U,$,J,K)}},m=(T,A,V,B,U,$,J)=>{const K=A.el=T.el;let{patchFlag:G,dynamicChildren:j,dirs:le}=A;G|=T.patchFlag&16;const X=T.props||Be,ce=A.props||Be;let me;if(V&&wr(V,!1),(me=ce.onVnodeBeforeUpdate)&&en(me,V,A,T),le&&Ir(A,T,V,"beforeUpdate"),V&&wr(V,!0),(X.innerHTML&&ce.innerHTML==null||X.textContent&&ce.textContent==null)&&f(K,""),j?v(T.dynamicChildren,j,K,V,B,Ya(A,U),$):J||Te(T,A,K,null,V,B,Ya(A,U),$,!1),G>0){if(G&16)I(K,X,ce,V,U);else if(G&2&&X.class!==ce.class&&i(K,"class",null,ce.class,U),G&4&&i(K,"style",X.style,ce.style,U),G&8){const de=A.dynamicProps;for(let we=0;we<de.length;we++){const ke=de[we],ut=X[ke],ht=ce[ke];(ht!==ut||ke==="value")&&i(K,ke,ut,ht,U,V)}}G&1&&T.children!==A.children&&f(K,A.children)}else!J&&j==null&&I(K,X,ce,V,U);((me=ce.onVnodeUpdated)||le)&&Lt(()=>{me&&en(me,V,A,T),le&&Ir(A,T,V,"updated")},B)},v=(T,A,V,B,U,$,J)=>{for(let K=0;K<A.length;K++){const G=T[K],j=A[K],le=G.el&&(G.type===rt||!js(G,j)||G.shapeFlag&198)?p(G.el):V;N(G,j,le,null,B,U,$,J,!0)}},I=(T,A,V,B,U)=>{if(A!==V){if(A!==Be)for(const $ in A)!Xs($)&&!($ in V)&&i(T,$,A[$],null,U,B);for(const $ in V){if(Xs($))continue;const J=V[$],K=A[$];J!==K&&$!=="value"&&i(T,$,K,J,U,B)}"value"in V&&i(T,"value",A.value,V.value,U)}},b=(T,A,V,B,U,$,J,K,G)=>{const j=A.el=T?T.el:c(""),le=A.anchor=T?T.anchor:c("");let{patchFlag:X,dynamicChildren:ce,slotScopeIds:me}=A;me&&(K=K?K.concat(me):me),T==null?(r(j,V,B),r(le,V,B),_(A.children||[],V,le,U,$,J,K,G)):X>0&&X&64&&ce&&T.dynamicChildren?(v(T.dynamicChildren,ce,V,U,$,J,K),(A.key!=null||U&&A===U.subTree)&&pp(T,A,!0)):Te(T,A,V,le,U,$,J,K,G)},E=(T,A,V,B,U,$,J,K,G)=>{A.slotScopeIds=K,T==null?A.shapeFlag&512?U.ctx.activate(A,V,B,J,G):Oe(A,V,B,U,$,J,G):We(T,A,G)},Oe=(T,A,V,B,U,$,J)=>{const K=T.component=yv(T,B,U);if(tp(T)&&(K.ctx.renderer=Me),vv(K,!1,J),K.asyncDep){if(U&&U.registerDep(K,ve,J),!T.el){const G=K.subTree=nt(ar);L(null,G,A,V),T.placeholder=G.el}}else ve(K,T,A,V,U,$,J)},We=(T,A,V)=>{const B=A.component=T.component;if(cv(T,A,V))if(B.asyncDep&&!B.asyncResolved){ae(B,A,V);return}else B.next=A,B.update();else A.el=T.el,B.vnode=A},ve=(T,A,V,B,U,$,J)=>{const K=()=>{if(T.isMounted){let{next:X,bu:ce,u:me,parent:de,vnode:we}=T;{const vt=mp(T);if(vt){X&&(X.el=we.el,ae(T,X,J)),vt.asyncDep.then(()=>{T.isUnmounted||K()});return}}let ke=X,ut;wr(T,!1),X?(X.el=we.el,ae(T,X,J)):X=we,ce&&ho(ce),(ut=X.props&&X.props.onVnodeBeforeUpdate)&&en(ut,de,X,we),wr(T,!0);const ht=mh(T),Ut=T.subTree;T.subTree=ht,N(Ut,ht,p(Ut.el),be(Ut),T,U,$),X.el=ht.el,ke===null&&lv(T,ht.el),me&&Lt(me,U),(ut=X.props&&X.props.onVnodeUpdated)&&Lt(()=>en(ut,de,X,we),U)}else{let X;const{el:ce,props:me}=A,{bm:de,m:we,parent:ke,root:ut,type:ht}=T,Ut=ei(A);wr(T,!1),de&&ho(de),!Ut&&(X=me&&me.onVnodeBeforeMount)&&en(X,ke,A),wr(T,!0);{ut.ce&&ut.ce._def.shadowRoot!==!1&&ut.ce._injectChildStyle(ht);const vt=T.subTree=mh(T);N(null,vt,V,B,T,U,$),A.el=vt.el}if(we&&Lt(we,U),!Ut&&(X=me&&me.onVnodeMounted)){const vt=A;Lt(()=>en(X,ke,vt),U)}(A.shapeFlag&256||ke&&ei(ke.vnode)&&ke.vnode.shapeFlag&256)&&T.a&&Lt(T.a,U),T.isMounted=!0,A=V=B=null}};T.scope.on();const G=T.effect=new Nf(K);T.scope.off();const j=T.update=G.run.bind(G),le=T.job=G.runIfDirty.bind(G);le.i=T,le.id=T.uid,G.scheduler=()=>pl(le),wr(T,!0),j()},ae=(T,A,V)=>{A.component=T;const B=T.vnode.props;T.vnode=A,T.next=null,zy(T,A.props,B,V),Xy(T,A.children,V),bn(),ch(T),Cn()},Te=(T,A,V,B,U,$,J,K,G=!1)=>{const j=T&&T.children,le=T?T.shapeFlag:0,X=A.children,{patchFlag:ce,shapeFlag:me}=A;if(ce>0){if(ce&128){xt(j,X,V,B,U,$,J,K,G);return}else if(ce&256){je(j,X,V,B,U,$,J,K,G);return}}me&8?(le&16&&ie(j,U,$),X!==j&&f(V,X)):le&16?me&16?xt(j,X,V,B,U,$,J,K,G):ie(j,U,$,!0):(le&8&&f(V,""),me&16&&_(X,V,B,U,$,J,K,G))},je=(T,A,V,B,U,$,J,K,G)=>{T=T||ns,A=A||ns;const j=T.length,le=A.length,X=Math.min(j,le);let ce;for(ce=0;ce<X;ce++){const me=A[ce]=G?Gn(A[ce]):rn(A[ce]);N(T[ce],me,V,null,U,$,J,K,G)}j>le?ie(T,U,$,!0,!1,X):_(A,V,B,U,$,J,K,G,X)},xt=(T,A,V,B,U,$,J,K,G)=>{let j=0;const le=A.length;let X=T.length-1,ce=le-1;for(;j<=X&&j<=ce;){const me=T[j],de=A[j]=G?Gn(A[j]):rn(A[j]);if(js(me,de))N(me,de,V,null,U,$,J,K,G);else break;j++}for(;j<=X&&j<=ce;){const me=T[X],de=A[ce]=G?Gn(A[ce]):rn(A[ce]);if(js(me,de))N(me,de,V,null,U,$,J,K,G);else break;X--,ce--}if(j>X){if(j<=ce){const me=ce+1,de=me<le?A[me].el:B;for(;j<=ce;)N(null,A[j]=G?Gn(A[j]):rn(A[j]),V,de,U,$,J,K,G),j++}}else if(j>ce)for(;j<=X;)F(T[j],U,$,!0),j++;else{const me=j,de=j,we=new Map;for(j=de;j<=ce;j++){const dt=A[j]=G?Gn(A[j]):rn(A[j]);dt.key!=null&&we.set(dt.key,j)}let ke,ut=0;const ht=ce-de+1;let Ut=!1,vt=0;const $n=new Array(ht);for(j=0;j<ht;j++)$n[j]=0;for(j=me;j<=X;j++){const dt=T[j];if(ut>=ht){F(dt,U,$,!0);continue}let $t;if(dt.key!=null)$t=we.get(dt.key);else for(ke=de;ke<=ce;ke++)if($n[ke-de]===0&&js(dt,A[ke])){$t=ke;break}$t===void 0?F(dt,U,$,!0):($n[$t-de]=j+1,$t>=vt?vt=$t:Ut=!0,N(dt,A[$t],V,null,U,$,J,K,G),ut++)}const Rs=Ut?ev($n):ns;for(ke=Rs.length-1,j=ht-1;j>=0;j--){const dt=de+j,$t=A[dt],$i=A[dt+1],jr=dt+1<le?$i.el||$i.placeholder:B;$n[j]===0?N(null,$t,V,jr,U,$,J,K,G):Ut&&(ke<0||j!==Rs[ke]?D($t,V,jr,2):ke--)}}},D=(T,A,V,B,U=null)=>{const{el:$,type:J,transition:K,children:G,shapeFlag:j}=T;if(j&6){D(T.component.subTree,A,V,B);return}if(j&128){T.suspense.move(A,V,B);return}if(j&64){J.move(T,A,V,Me);return}if(J===rt){r($,A,V);for(let X=0;X<G.length;X++)D(G[X],A,V,B);r(T.anchor,A,V);return}if(J===po){H(T,A,V);return}if(B!==2&&j&1&&K)if(B===0)K.beforeEnter($),r($,A,V),Lt(()=>K.enter($),U);else{const{leave:X,delayLeave:ce,afterLeave:me}=K,de=()=>{T.ctx.isUnmounted?s($):r($,A,V)},we=()=>{X($,()=>{de(),me&&me()})};ce?ce($,de,we):we()}else r($,A,V)},F=(T,A,V,B=!1,U=!1)=>{const{type:$,props:J,ref:K,children:G,dynamicChildren:j,shapeFlag:le,patchFlag:X,dirs:ce,cacheIndex:me}=T;if(X===-2&&(U=!1),K!=null&&(bn(),Zs(K,null,V,T,!0),Cn()),me!=null&&(A.renderCache[me]=void 0),le&256){A.ctx.deactivate(T);return}const de=le&1&&ce,we=!ei(T);let ke;if(we&&(ke=J&&J.onVnodeBeforeUnmount)&&en(ke,A,T),le&6)W(T.component,V,B);else{if(le&128){T.suspense.unmount(V,B);return}de&&Ir(T,null,A,"beforeUnmount"),le&64?T.type.remove(T,A,V,Me,B):j&&!j.hasOnce&&($!==rt||X>0&&X&64)?ie(j,A,V,!1,!0):($===rt&&X&384||!U&&le&16)&&ie(G,A,V),B&&P(T)}(we&&(ke=J&&J.onVnodeUnmounted)||de)&&Lt(()=>{ke&&en(ke,A,T),de&&Ir(T,null,A,"unmounted")},V)},P=T=>{const{type:A,el:V,anchor:B,transition:U}=T;if(A===rt){Z(V,B);return}if(A===po){z(T);return}const $=()=>{s(V),U&&!U.persisted&&U.afterLeave&&U.afterLeave()};if(T.shapeFlag&1&&U&&!U.persisted){const{leave:J,delayLeave:K}=U,G=()=>J(V,$);K?K(T.el,$,G):G()}else $()},Z=(T,A)=>{let V;for(;T!==A;)V=y(T),s(T),T=V;s(A)},W=(T,A,V)=>{const{bum:B,scope:U,job:$,subTree:J,um:K,m:G,a:j,parent:le,slots:{__:X}}=T;ph(G),ph(j),B&&ho(B),le&&ge(X)&&X.forEach(ce=>{le.renderCache[ce]=void 0}),U.stop(),$&&($.flags|=8,F(J,T,A,V)),K&&Lt(K,A),Lt(()=>{T.isUnmounted=!0},A),A&&A.pendingBranch&&!A.isUnmounted&&T.asyncDep&&!T.asyncResolved&&T.suspenseId===A.pendingId&&(A.deps--,A.deps===0&&A.resolve())},ie=(T,A,V,B=!1,U=!1,$=0)=>{for(let J=$;J<T.length;J++)F(T[J],A,V,B,U)},be=T=>{if(T.shapeFlag&6)return be(T.component.subTree);if(T.shapeFlag&128)return T.suspense.next();const A=y(T.anchor||T.el),V=A&&A[Ey];return V?y(V):A};let Ie=!1;const he=(T,A,V)=>{T==null?A._vnode&&F(A._vnode,null,null,!0):N(A._vnode||null,T,A,null,null,null,V),A._vnode=T,Ie||(Ie=!0,ch(),Jf(),Ie=!1)},Me={p:N,um:F,m:D,r:P,mt:Oe,mc:_,pc:Te,pbc:v,n:be,o:t};return{render:he,hydrate:void 0,createApp:jy(he)}}function Ya({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function wr({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function Zy(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function pp(t,e,n=!1){const r=t.children,s=e.children;if(ge(r)&&ge(s))for(let i=0;i<r.length;i++){const a=r[i];let c=s[i];c.shapeFlag&1&&!c.dynamicChildren&&((c.patchFlag<=0||c.patchFlag===32)&&(c=s[i]=Gn(s[i]),c.el=a.el),!n&&c.patchFlag!==-2&&pp(a,c)),c.type===ua&&(c.el=a.el),c.type===ar&&!c.el&&(c.el=a.el)}}function ev(t){const e=t.slice(),n=[0];let r,s,i,a,c;const l=t.length;for(r=0;r<l;r++){const h=t[r];if(h!==0){if(s=n[n.length-1],t[s]<h){e[r]=s,n.push(r);continue}for(i=0,a=n.length-1;i<a;)c=i+a>>1,t[n[c]]<h?i=c+1:a=c;h<t[n[i]]&&(i>0&&(e[r]=n[i-1]),n[i]=r)}}for(i=n.length,a=n[i-1];i-- >0;)n[i]=a,a=e[a];return n}function mp(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:mp(e)}function ph(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}const tv=Symbol.for("v-scx"),nv=()=>ni(tv);function Ht(t,e,n){return gp(t,e,n)}function gp(t,e,n=Be){const{immediate:r,deep:s,flush:i,once:a}=n,c=Nt({},n),l=e&&r||!e&&i!=="post";let h;if(mi){if(i==="sync"){const S=nv();h=S.__watcherHandles||(S.__watcherHandles=[])}else if(!l){const S=()=>{};return S.stop=sn,S.resume=sn,S.pause=sn,S}}const f=Dt;c.call=(S,R,N)=>pn(S,f,R,N);let p=!1;i==="post"?c.scheduler=S=>{Lt(S,f&&f.suspense)}:i!=="sync"&&(p=!0,c.scheduler=(S,R)=>{R?S():pl(S)}),c.augmentJob=S=>{e&&(S.flags|=4),p&&(S.flags|=2,f&&(S.id=f.uid,S.i=f))};const y=gy(t,e,c);return mi&&(h?h.push(y):l&&y()),y}function rv(t,e,n){const r=this.proxy,s=ot(t)?t.includes(".")?_p(r,t):()=>r[t]:t.bind(r,r);let i;Se(e)?i=e:(i=e.handler,n=e);const a=Ci(this),c=gp(s,i.bind(r),n);return a(),c}function _p(t,e){const n=e.split(".");return()=>{let r=t;for(let s=0;s<n.length&&r;s++)r=r[n[s]];return r}}const sv=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${ir(e)}Modifiers`]||t[`${mr(e)}Modifiers`];function iv(t,e,...n){if(t.isUnmounted)return;const r=t.vnode.props||Be;let s=n;const i=e.startsWith("update:"),a=i&&sv(r,e.slice(7));a&&(a.trim&&(s=n.map(f=>ot(f)?f.trim():f)),a.number&&(s=n.map(_c)));let c,l=r[c=za(e)]||r[c=za(ir(e))];!l&&i&&(l=r[c=za(mr(e))]),l&&pn(l,t,6,s);const h=r[c+"Once"];if(h){if(!t.emitted)t.emitted={};else if(t.emitted[c])return;t.emitted[c]=!0,pn(h,t,6,s)}}function yp(t,e,n=!1){const r=e.emitsCache,s=r.get(t);if(s!==void 0)return s;const i=t.emits;let a={},c=!1;if(!Se(t)){const l=h=>{const f=yp(h,e,!0);f&&(c=!0,Nt(a,f))};!n&&e.mixins.length&&e.mixins.forEach(l),t.extends&&l(t.extends),t.mixins&&t.mixins.forEach(l)}return!i&&!c?(Qe(t)&&r.set(t,null),null):(ge(i)?i.forEach(l=>a[l]=null):Nt(a,i),Qe(t)&&r.set(t,a),a)}function la(t,e){return!t||!ta(e)?!1:(e=e.slice(2).replace(/Once$/,""),Le(t,e[0].toLowerCase()+e.slice(1))||Le(t,mr(e))||Le(t,e))}function mh(t){const{type:e,vnode:n,proxy:r,withProxy:s,propsOptions:[i],slots:a,attrs:c,emit:l,render:h,renderCache:f,props:p,data:y,setupState:S,ctx:R,inheritAttrs:N}=t,k=No(t);let L,q;try{if(n.shapeFlag&4){const z=s||r,oe=z;L=rn(h.call(oe,z,f,p,S,y,R)),q=c}else{const z=e;L=rn(z.length>1?z(p,{attrs:c,slots:a,emit:l}):z(p,null)),q=e.props?c:ov(c)}}catch(z){ri.length=0,aa(z,t,1),L=nt(ar)}let H=L;if(q&&N!==!1){const z=Object.keys(q),{shapeFlag:oe}=H;z.length&&oe&7&&(i&&z.some(nl)&&(q=av(q,i)),H=hs(H,q,!1,!0))}return n.dirs&&(H=hs(H,null,!1,!0),H.dirs=H.dirs?H.dirs.concat(n.dirs):n.dirs),n.transition&&ml(H,n.transition),L=H,No(k),L}const ov=t=>{let e;for(const n in t)(n==="class"||n==="style"||ta(n))&&((e||(e={}))[n]=t[n]);return e},av=(t,e)=>{const n={};for(const r in t)(!nl(r)||!(r.slice(9)in e))&&(n[r]=t[r]);return n};function cv(t,e,n){const{props:r,children:s,component:i}=t,{props:a,children:c,patchFlag:l}=e,h=i.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return r?gh(r,a,h):!!a;if(l&8){const f=e.dynamicProps;for(let p=0;p<f.length;p++){const y=f[p];if(a[y]!==r[y]&&!la(h,y))return!0}}}else return(s||c)&&(!c||!c.$stable)?!0:r===a?!1:r?a?gh(r,a,h):!0:!!a;return!1}function gh(t,e,n){const r=Object.keys(e);if(r.length!==Object.keys(t).length)return!0;for(let s=0;s<r.length;s++){const i=r[s];if(e[i]!==t[i]&&!la(n,i))return!0}return!1}function lv({vnode:t,parent:e},n){for(;e;){const r=e.subTree;if(r.suspense&&r.suspense.activeBranch===t&&(r.el=t.el),r===t)(t=e.vnode).el=n,e=e.parent;else break}}const vp=t=>t.__isSuspense;function uv(t,e){e&&e.pendingBranch?ge(t)?e.effects.push(...t):e.effects.push(t):vy(t)}const rt=Symbol.for("v-fgt"),ua=Symbol.for("v-txt"),ar=Symbol.for("v-cmt"),po=Symbol.for("v-stc"),ri=[];let Ft=null;function te(t=!1){ri.push(Ft=t?null:[])}function hv(){ri.pop(),Ft=ri[ri.length-1]||null}let pi=1;function _h(t,e=!1){pi+=t,t<0&&Ft&&e&&(Ft.hasOnce=!0)}function Tp(t){return t.dynamicChildren=pi>0?Ft||ns:null,hv(),pi>0&&Ft&&Ft.push(t),t}function ne(t,e,n,r,s,i){return Tp(Y(t,e,n,r,s,i,!0))}function dv(t,e,n,r,s){return Tp(nt(t,e,n,r,s,!0))}function Ep(t){return t?t.__v_isVNode===!0:!1}function js(t,e){return t.type===e.type&&t.key===e.key}const Ip=({key:t})=>t??null,mo=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?ot(t)||et(t)||Se(t)?{i:qt,r:t,k:e,f:!!n}:t:null);function Y(t,e=null,n=null,r=0,s=null,i=t===rt?0:1,a=!1,c=!1){const l={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&Ip(e),ref:e&&mo(e),scopeId:Zf,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:qt};return c?(yl(l,n),i&128&&t.normalize(l)):n&&(l.shapeFlag|=ot(n)?8:16),pi>0&&!a&&Ft&&(l.patchFlag>0||i&6)&&l.patchFlag!==32&&Ft.push(l),l}const nt=fv;function fv(t,e=null,n=null,r=0,s=null,i=!1){if((!t||t===Vy)&&(t=ar),Ep(t)){const c=hs(t,e,!0);return n&&yl(c,n),pi>0&&!i&&Ft&&(c.shapeFlag&6?Ft[Ft.indexOf(t)]=c:Ft.push(c)),c.patchFlag=-2,c}if(wv(t)&&(t=t.__vccOpts),e){e=pv(e);let{class:c,style:l}=e;c&&!ot(c)&&(e.class=fn(c)),Qe(l)&&(hl(l)&&!ge(l)&&(l=Nt({},l)),e.style=Sn(l))}const a=ot(t)?1:vp(t)?128:Iy(t)?64:Qe(t)?4:Se(t)?2:0;return Y(t,e,n,r,s,a,i,!0)}function pv(t){return t?hl(t)||cp(t)?Nt({},t):t:null}function hs(t,e,n=!1,r=!1){const{props:s,ref:i,patchFlag:a,children:c,transition:l}=t,h=e?mv(s||{},e):s,f={__v_isVNode:!0,__v_skip:!0,type:t.type,props:h,key:h&&Ip(h),ref:e&&e.ref?n&&i?ge(i)?i.concat(mo(e)):[i,mo(e)]:mo(e):i,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:c,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==rt?a===-1?16:a|16:a,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:l,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&hs(t.ssContent),ssFallback:t.ssFallback&&hs(t.ssFallback),placeholder:t.placeholder,el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce};return l&&r&&ml(f,l.clone(f)),f}function Vo(t=" ",e=0){return nt(ua,null,t,e)}function Za(t,e){const n=nt(po,null,t);return n.staticCount=e,n}function Ye(t="",e=!1){return e?(te(),dv(ar,null,t)):nt(ar,null,t)}function rn(t){return t==null||typeof t=="boolean"?nt(ar):ge(t)?nt(rt,null,t.slice()):Ep(t)?Gn(t):nt(ua,null,String(t))}function Gn(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:hs(t)}function yl(t,e){let n=0;const{shapeFlag:r}=t;if(e==null)e=null;else if(ge(e))n=16;else if(typeof e=="object")if(r&65){const s=e.default;s&&(s._c&&(s._d=!1),yl(t,s()),s._c&&(s._d=!0));return}else{n=32;const s=e._;!s&&!cp(e)?e._ctx=qt:s===3&&qt&&(qt.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else Se(e)?(e={default:e,_ctx:qt},n=32):(e=String(e),r&64?(n=16,e=[Vo(e)]):n=8);t.children=e,t.shapeFlag|=n}function mv(...t){const e={};for(let n=0;n<t.length;n++){const r=t[n];for(const s in r)if(s==="class")e.class!==r.class&&(e.class=fn([e.class,r.class]));else if(s==="style")e.style=Sn([e.style,r.style]);else if(ta(s)){const i=e[s],a=r[s];a&&i!==a&&!(ge(i)&&i.includes(a))&&(e[s]=i?[].concat(i,a):a)}else s!==""&&(e[s]=r[s])}return e}function en(t,e,n,r=null){pn(t,e,7,[n,r])}const gv=ip();let _v=0;function yv(t,e,n){const r=t.type,s=(e?e.appContext:t.appContext)||gv,i={uid:_v++,vnode:t,type:r,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Pf(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:up(r,s),emitsOptions:yp(r,s),emit:null,emitted:null,propsDefaults:Be,inheritAttrs:r.inheritAttrs,ctx:Be,data:Be,props:Be,attrs:Be,slots:Be,refs:Be,setupState:Be,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=iv.bind(null,i),t.ce&&t.ce(i),i}let Dt=null;const wp=()=>Dt||qt;let Oo,Sc;{const t=sa(),e=(n,r)=>{let s;return(s=t[n])||(s=t[n]=[]),s.push(r),i=>{s.length>1?s.forEach(a=>a(i)):s[0](i)}};Oo=e("__VUE_INSTANCE_SETTERS__",n=>Dt=n),Sc=e("__VUE_SSR_SETTERS__",n=>mi=n)}const Ci=t=>{const e=Dt;return Oo(t),t.scope.on(),()=>{t.scope.off(),Oo(e)}},yh=()=>{Dt&&Dt.scope.off(),Oo(null)};function Ap(t){return t.vnode.shapeFlag&4}let mi=!1;function vv(t,e=!1,n=!1){e&&Sc(e);const{props:r,children:s}=t.vnode,i=Ap(t);Wy(t,r,i,e),Qy(t,s,n||e);const a=i?Tv(t,e):void 0;return e&&Sc(!1),a}function Tv(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,Oy);const{setup:r}=n;if(r){bn();const s=t.setupContext=r.length>1?Iv(t):null,i=Ci(t),a=bi(r,t,0,[t.props,s]),c=If(a);if(Cn(),i(),(c||t.sp)&&!ei(t)&&ep(t),c){if(a.then(yh,yh),e)return a.then(l=>{vh(t,l)}).catch(l=>{aa(l,t,0)});t.asyncDep=a}else vh(t,a)}else Sp(t)}function vh(t,e,n){Se(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:Qe(e)&&(t.setupState=Kf(e)),Sp(t)}function Sp(t,e,n){const r=t.type;t.render||(t.render=r.render||sn);{const s=Ci(t);bn();try{My(t)}finally{Cn(),s()}}}const Ev={get(t,e){return St(t,"get",""),t[e]}};function Iv(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,Ev),slots:t.slots,emit:t.emit,expose:e}}function ha(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(Kf(dl(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in ti)return ti[n](t)},has(e,n){return n in e||n in ti}})):t.proxy}function wv(t){return Se(t)&&"__vccOpts"in t}const ee=(t,e)=>py(t,e,mi),Av="3.5.18";/**
* @vue/runtime-dom v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let bc;const Th=typeof window<"u"&&window.trustedTypes;if(Th)try{bc=Th.createPolicy("vue",{createHTML:t=>t})}catch{}const bp=bc?t=>bc.createHTML(t):t=>t,Sv="http://www.w3.org/2000/svg",bv="http://www.w3.org/1998/Math/MathML",vn=typeof document<"u"?document:null,Eh=vn&&vn.createElement("template"),Cv={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,r)=>{const s=e==="svg"?vn.createElementNS(Sv,t):e==="mathml"?vn.createElementNS(bv,t):n?vn.createElement(t,{is:n}):vn.createElement(t);return t==="select"&&r&&r.multiple!=null&&s.setAttribute("multiple",r.multiple),s},createText:t=>vn.createTextNode(t),createComment:t=>vn.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>vn.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,r,s,i){const a=n?n.previousSibling:e.lastChild;if(s&&(s===i||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),n),!(s===i||!(s=s.nextSibling)););else{Eh.innerHTML=bp(r==="svg"?`<svg>${t}</svg>`:r==="mathml"?`<math>${t}</math>`:t);const c=Eh.content;if(r==="svg"||r==="mathml"){const l=c.firstChild;for(;l.firstChild;)c.appendChild(l.firstChild);c.removeChild(l)}e.insertBefore(c,n)}return[a?a.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},Rv=Symbol("_vtc");function Pv(t,e,n){const r=t[Rv];r&&(e=(e?[e,...r]:[...r]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const Ih=Symbol("_vod"),kv=Symbol("_vsh"),Dv=Symbol(""),Nv=/(^|;)\s*display\s*:/;function xv(t,e,n){const r=t.style,s=ot(n);let i=!1;if(n&&!s){if(e)if(ot(e))for(const a of e.split(";")){const c=a.slice(0,a.indexOf(":")).trim();n[c]==null&&go(r,c,"")}else for(const a in e)n[a]==null&&go(r,a,"");for(const a in n)a==="display"&&(i=!0),go(r,a,n[a])}else if(s){if(e!==n){const a=r[Dv];a&&(n+=";"+a),r.cssText=n,i=Nv.test(n)}}else e&&t.removeAttribute("style");Ih in t&&(t[Ih]=i?r.display:"",t[kv]&&(r.display="none"))}const wh=/\s*!important$/;function go(t,e,n){if(ge(n))n.forEach(r=>go(t,e,r));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const r=Vv(t,e);wh.test(n)?t.setProperty(mr(r),n.replace(wh,""),"important"):t[r]=n}}const Ah=["Webkit","Moz","ms"],ec={};function Vv(t,e){const n=ec[e];if(n)return n;let r=ir(e);if(r!=="filter"&&r in t)return ec[e]=r;r=Sf(r);for(let s=0;s<Ah.length;s++){const i=Ah[s]+r;if(i in t)return ec[e]=i}return e}const Sh="http://www.w3.org/1999/xlink";function bh(t,e,n,r,s,i=U_(e)){r&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(Sh,e.slice(6,e.length)):t.setAttributeNS(Sh,e,n):n==null||i&&!bf(n)?t.removeAttribute(e):t.setAttribute(e,i?"":pr(n)?String(n):n)}function Ch(t,e,n,r,s){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?bp(n):n);return}const i=t.tagName;if(e==="value"&&i!=="PROGRESS"&&!i.includes("-")){const c=i==="OPTION"?t.getAttribute("value")||"":t.value,l=n==null?t.type==="checkbox"?"on":"":String(n);(c!==l||!("_value"in t))&&(t.value=l),n==null&&t.removeAttribute(e),t._value=n;return}let a=!1;if(n===""||n==null){const c=typeof t[e];c==="boolean"?n=bf(n):n==null&&c==="string"?(n="",a=!0):c==="number"&&(n=0,a=!0)}try{t[e]=n}catch{}a&&t.removeAttribute(s||e)}function Jr(t,e,n,r){t.addEventListener(e,n,r)}function Ov(t,e,n,r){t.removeEventListener(e,n,r)}const Rh=Symbol("_vei");function Mv(t,e,n,r,s=null){const i=t[Rh]||(t[Rh]={}),a=i[e];if(r&&a)a.value=r;else{const[c,l]=Lv(e);if(r){const h=i[e]=$v(r,s);Jr(t,c,h,l)}else a&&(Ov(t,c,a,l),i[e]=void 0)}}const Ph=/(?:Once|Passive|Capture)$/;function Lv(t){let e;if(Ph.test(t)){e={};let r;for(;r=t.match(Ph);)t=t.slice(0,t.length-r[0].length),e[r[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):mr(t.slice(2)),e]}let tc=0;const Fv=Promise.resolve(),Uv=()=>tc||(Fv.then(()=>tc=0),tc=Date.now());function $v(t,e){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;pn(Bv(r,n.value),e,5,[r])};return n.value=t,n.attached=Uv(),n}function Bv(t,e){if(ge(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(r=>s=>!s._stopped&&r&&r(s))}else return e}const kh=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,jv=(t,e,n,r,s,i)=>{const a=s==="svg";e==="class"?Pv(t,r,a):e==="style"?xv(t,n,r):ta(e)?nl(e)||Mv(t,e,n,r,i):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):qv(t,e,r,a))?(Ch(t,e,r),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&bh(t,e,r,a,i,e!=="value")):t._isVueCE&&(/[A-Z]/.test(e)||!ot(r))?Ch(t,ir(e),r,i,e):(e==="true-value"?t._trueValue=r:e==="false-value"&&(t._falseValue=r),bh(t,e,r,a))};function qv(t,e,n,r){if(r)return!!(e==="innerHTML"||e==="textContent"||e in t&&kh(e)&&Se(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const s=t.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return kh(e)&&ot(n)?!1:e in t}const Dh=t=>{const e=t.props["onUpdate:modelValue"]||!1;return ge(e)?n=>ho(e,n):e};function Hv(t){t.target.composing=!0}function Nh(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const nc=Symbol("_assign"),_o={created(t,{modifiers:{lazy:e,trim:n,number:r}},s){t[nc]=Dh(s);const i=r||s.props&&s.props.type==="number";Jr(t,e?"change":"input",a=>{if(a.target.composing)return;let c=t.value;n&&(c=c.trim()),i&&(c=_c(c)),t[nc](c)}),n&&Jr(t,"change",()=>{t.value=t.value.trim()}),e||(Jr(t,"compositionstart",Hv),Jr(t,"compositionend",Nh),Jr(t,"change",Nh))},mounted(t,{value:e}){t.value=e??""},beforeUpdate(t,{value:e,oldValue:n,modifiers:{lazy:r,trim:s,number:i}},a){if(t[nc]=Dh(a),t.composing)return;const c=(i||t.type==="number")&&!/^0\d/.test(t.value)?_c(t.value):t.value,l=e??"";c!==l&&(document.activeElement===t&&t.type!=="range"&&(r&&e===n||s&&t.value.trim()===l)||(t.value=l))}},Wv=["ctrl","shift","alt","meta"],zv={stop:t=>t.stopPropagation(),prevent:t=>t.preventDefault(),self:t=>t.target!==t.currentTarget,ctrl:t=>!t.ctrlKey,shift:t=>!t.shiftKey,alt:t=>!t.altKey,meta:t=>!t.metaKey,left:t=>"button"in t&&t.button!==0,middle:t=>"button"in t&&t.button!==1,right:t=>"button"in t&&t.button!==2,exact:(t,e)=>Wv.some(n=>t[`${n}Key`]&&!e.includes(n))},xh=(t,e)=>{const n=t._withMods||(t._withMods={}),r=e.join(".");return n[r]||(n[r]=(s,...i)=>{for(let a=0;a<e.length;a++){const c=zv[e[a]];if(c&&c(s,e))return}return t(s,...i)})},Gv={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},Vh=(t,e)=>{const n=t._withKeys||(t._withKeys={}),r=e.join(".");return n[r]||(n[r]=s=>{if(!("key"in s))return;const i=mr(s.key);if(e.some(a=>a===i||Gv[a]===i))return t(s)})},Kv=Nt({patchProp:jv},Cv);let Oh;function Qv(){return Oh||(Oh=Jy(Kv))}const Xv=(...t)=>{const e=Qv().createApp(...t),{mount:n}=e;return e.mount=r=>{const s=Yv(r);if(!s)return;const i=e._component;!Se(i)&&!i.render&&!i.template&&(i.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const a=n(s,!1,Jv(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),a},e};function Jv(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function Yv(t){return ot(t)?document.querySelector(t):t}/*!
 * pinia v3.0.3
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let Cp;const da=t=>Cp=t,Rp=Symbol();function Cc(t){return t&&typeof t=="object"&&Object.prototype.toString.call(t)==="[object Object]"&&typeof t.toJSON!="function"}var si;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(si||(si={}));function Zv(){const t=kf(!0),e=t.run(()=>Ae({}));let n=[],r=[];const s=dl({install(i){da(s),s._a=i,i.provide(Rp,s),i.config.globalProperties.$pinia=s,r.forEach(a=>n.push(a)),r=[]},use(i){return this._a?n.push(i):r.push(i),this},_p:n,_a:null,_e:t,_s:new Map,state:e});return s}const Pp=()=>{};function Mh(t,e,n,r=Pp){t.push(e);const s=()=>{const i=t.indexOf(e);i>-1&&(t.splice(i,1),r())};return!n&&Df()&&$_(s),s}function Kr(t,...e){t.slice().forEach(n=>{n(...e)})}const eT=t=>t(),Lh=Symbol(),rc=Symbol();function Rc(t,e){t instanceof Map&&e instanceof Map?e.forEach((n,r)=>t.set(r,n)):t instanceof Set&&e instanceof Set&&e.forEach(t.add,t);for(const n in e){if(!e.hasOwnProperty(n))continue;const r=e[n],s=t[n];Cc(s)&&Cc(r)&&t.hasOwnProperty(n)&&!et(r)&&!Zn(r)?t[n]=Rc(s,r):t[n]=r}return t}const tT=Symbol();function nT(t){return!Cc(t)||!Object.prototype.hasOwnProperty.call(t,tT)}const{assign:Wn}=Object;function rT(t){return!!(et(t)&&t.effect)}function sT(t,e,n,r){const{state:s,actions:i,getters:a}=e,c=n.state.value[t];let l;function h(){c||(n.state.value[t]=s?s():{});const f=uy(n.state.value[t]);return Wn(f,i,Object.keys(a||{}).reduce((p,y)=>(p[y]=dl(ee(()=>{da(n);const S=n._s.get(t);return a[y].call(S,S)})),p),{}))}return l=kp(t,h,e,n,r,!0),l}function kp(t,e,n={},r,s,i){let a;const c=Wn({actions:{}},n),l={deep:!0};let h,f,p=[],y=[],S;const R=r.state.value[t];!i&&!R&&(r.state.value[t]={}),Ae({});let N;function k(_){let m;h=f=!1,typeof _=="function"?(_(r.state.value[t]),m={type:si.patchFunction,storeId:t,events:S}):(Rc(r.state.value[t],_),m={type:si.patchObject,payload:_,storeId:t,events:S});const v=N=Symbol();fl().then(()=>{N===v&&(h=!0)}),f=!0,Kr(p,m,r.state.value[t])}const L=i?function(){const{state:m}=n,v=m?m():{};this.$patch(I=>{Wn(I,v)})}:Pp;function q(){a.stop(),p=[],y=[],r._s.delete(t)}const H=(_,m="")=>{if(Lh in _)return _[rc]=m,_;const v=function(){da(r);const I=Array.from(arguments),b=[],E=[];function Oe(ae){b.push(ae)}function We(ae){E.push(ae)}Kr(y,{args:I,name:v[rc],store:oe,after:Oe,onError:We});let ve;try{ve=_.apply(this&&this.$id===t?this:oe,I)}catch(ae){throw Kr(E,ae),ae}return ve instanceof Promise?ve.then(ae=>(Kr(b,ae),ae)).catch(ae=>(Kr(E,ae),Promise.reject(ae))):(Kr(b,ve),ve)};return v[Lh]=!0,v[rc]=m,v},z={_p:r,$id:t,$onAction:Mh.bind(null,y),$patch:k,$reset:L,$subscribe(_,m={}){const v=Mh(p,_,m.detached,()=>I()),I=a.run(()=>Ht(()=>r.state.value[t],b=>{(m.flush==="sync"?f:h)&&_({storeId:t,type:si.direct,events:S},b)},Wn({},l,m)));return v},$dispose:q},oe=oa(z);r._s.set(t,oe);const w=(r._a&&r._a.runWithContext||eT)(()=>r._e.run(()=>(a=kf()).run(()=>e({action:H}))));for(const _ in w){const m=w[_];if(et(m)&&!rT(m)||Zn(m))i||(R&&nT(m)&&(et(m)?m.value=R[_]:Rc(m,R[_])),r.state.value[t][_]=m);else if(typeof m=="function"){const v=H(m,_);w[_]=v,c.actions[_]=m}}return Wn(oe,w),Wn(Ve(oe),w),Object.defineProperty(oe,"$state",{get:()=>r.state.value[t],set:_=>{k(m=>{Wn(m,_)})}}),r._p.forEach(_=>{Wn(oe,a.run(()=>_({store:oe,app:r._a,pinia:r,options:c})))}),R&&i&&n.hydrate&&n.hydrate(oe.$state,R),h=!0,f=!0,oe}/*! #__NO_SIDE_EFFECTS__ */function fa(t,e,n){let r;const s=typeof e=="function";r=s?n:e;function i(a,c){const l=Hy();return a=a||(l?ni(Rp,null):null),a&&da(a),a=Cp,a._s.has(t)||(s?kp(t,e,r,a):sT(t,r,a)),a._s.get(t)}return i.$id=t,i}const iT=5625,Fh=iT/60,Rn=fa("audio",{state:()=>({isPlaying:!1,absoluteCurrentTime:3600+.05,clipInfo:null,isMutedA:!1,isMutedB:!1}),actions:{async load(){try{const e=await(await fetch("A.json")).json();this.setClipInfo(e)}catch(t){console.error("Failed to load clip info:",t)}},setPlayingStatus(t){this.isPlaying=t},updateAbsoluteCurrentTime(t){this.absoluteCurrentTime=t},setClipInfo(t){this.clipInfo=t},setMutedA(t){this.isMutedA=t},setMutedB(t){this.isMutedB=t},reset(){this.isPlaying=!1,this.absoluteCurrentTime=0,this.clipInfo=null,this.isMutedA=!1,this.isMutedB=!1}},getters:{totalDuration:t=>!t.clipInfo||t.clipInfo.length===0?0:t.clipInfo.reduce((e,n)=>e+(n.length||0),0),currentPart:t=>{if(!t.clipInfo||t.clipInfo.length===0||t.absoluteCurrentTime<0)return 0;let e=0;for(let n=0;n<t.clipInfo.length;n++){const r=t.clipInfo[n].length||0;if(t.absoluteCurrentTime<e+r)return n;e+=r}return t.clipInfo.length-1},currentTime:t=>{if(!t.clipInfo||t.clipInfo.length===0)return 0;if(t.absoluteCurrentTime<0)return t.absoluteCurrentTime;const e=t.currentPart;let n=0;for(let r=0;r<e;r++)n+=t.clipInfo[r].length||0;return t.absoluteCurrentTime-n},timeInSpectrogram:t=>{const e=t.currentSpectrograms;if(e.length===0||t.duration===0)return 0;const n=t.currentSpectrogramIndex;let r=0;for(let s=0;s<n;s++)r+=e[s].width/Fh;return t.currentTime-r},duration:t=>{if(!t.clipInfo||t.clipInfo.length===0)return 0;const e=t.currentPart;return t.clipInfo[e]?.length||0},totalParts:t=>t.clipInfo?.length||0,partDurations:t=>t.clipInfo?t.clipInfo.map(e=>e.length||0):[],audioSrc:t=>{if(!t.clipInfo||t.clipInfo.length===0)return null;const e=t.currentPart;return e<0?null:t.clipInfo[e]?.url||null},hasNextPart:t=>t.currentPart<t.totalParts-1,getNextPart:t=>t.currentPart<t.totalParts-1?t.currentPart+1:null,currentPartInfo:t=>{if(!t.clipInfo||t.clipInfo.length===0)return null;const e=t.currentPart;return e<0?null:t.clipInfo[e]||null},currentSpectrograms:t=>t.currentPartInfo?.spect||[],currentSpectrogramIndex:t=>{const e=t.currentSpectrograms;if(e.length===0||t.duration===0)return 0;let n=0;for(let r=0;r<e.length;r++){const s=e[r].width/Fh;if(n+=s,t.currentTime<n)return r}return e.length-1},currentSpect:t=>{const e=t.currentSpectrograms,n=t.currentSpectrogramIndex,r=e[n];return r?{part:t.currentPart,index:n,url:r.url,width:r.width,filename:r.spect}:{part:null,index:null,url:null,width:0,filename:null}},previousSpect:t=>{const e=t.currentPart,n=t.currentSpectrogramIndex;if(n>0){const s=t.currentSpectrograms[n-1];return s?{part:e,index:n-1,url:s.url,width:s.width,filename:s.spect}:{part:null,index:null,url:null,width:0,filename:null}}if(e>0&&t.clipInfo){const s=t.clipInfo[e-1]?.spect||[];if(s.length>0){const i=s[s.length-1];return{part:e-1,index:s.length-1,url:i.url,width:i.width,filename:i.spect}}}return{part:null,index:null,url:null,width:0,filename:null}},nextSpect:t=>{const e=t.currentPart,n=t.currentSpectrogramIndex,r=t.currentSpectrograms;if(n<r.length-1){const s=r[n+1];return s?{part:e,index:n+1,url:s.url,width:s.width,filename:s.spect}:{part:null,index:null,url:null,width:0,filename:null}}if(e<t.totalParts-1&&t.clipInfo){const i=t.clipInfo[e+1]?.spect||[];if(i.length>0){const a=i[0];return{part:e+1,index:0,url:a.url,width:a.width,filename:a.spect}}}return{part:null,index:null,url:null,width:0,filename:null}}}}),oT=5625,Uh=oT/60,$h=-847-.8,vl=fa("audioB",{state:()=>({clipInfo:null}),actions:{async load(){try{const e=await(await fetch("B.json")).json();this.setClipInfo(e)}catch(t){console.error("Failed to load clip info:",t)}},updateAbsoluteCurrentTime(t){const e=Rn(),n=t-$h;e.updateAbsoluteCurrentTime(n)},setClipInfo(t){this.clipInfo=t},reset(){this.clipInfo=null}},getters:{offsetAbsoluteTime:()=>Rn().absoluteCurrentTime+$h,totalDuration:t=>!t.clipInfo||t.clipInfo.length===0?0:t.clipInfo.reduce((e,n)=>e+(n.length||0),0),currentPart:t=>{if(!t.clipInfo||t.clipInfo.length===0||t.offsetAbsoluteTime<0)return 0;let e=0;for(let n=0;n<t.clipInfo.length;n++){const r=t.clipInfo[n].length||0;if(t.offsetAbsoluteTime<e+r)return n;e+=r}return t.clipInfo.length-1},currentTime:t=>{if(!t.clipInfo||t.clipInfo.length===0)return 0;if(t.offsetAbsoluteTime<0)return t.offsetAbsoluteTime;const e=t.currentPart;let n=0;for(let r=0;r<e;r++)n+=t.clipInfo[r].length||0;return t.offsetAbsoluteTime-n},timeInSpectrogram:t=>{const e=t.currentSpectrograms;if(e.length===0||t.duration===0)return 0;const n=t.currentSpectrogramIndex;let r=0;for(let s=0;s<n;s++)r+=e[s].width/Uh;return t.currentTime-r},duration:t=>{if(!t.clipInfo||t.clipInfo.length===0)return 0;const e=t.currentPart;return t.clipInfo[e]?.length||0},totalParts:t=>t.clipInfo?.length||0,partDurations:t=>t.clipInfo?t.clipInfo.map(e=>e.length||0):[],audioSrc:t=>{if(!t.clipInfo||t.clipInfo.length===0)return null;const e=t.currentPart;return e<0?null:t.clipInfo[e]?.url||null},hasNextPart:t=>t.currentPart<t.totalParts-1,getNextPart:t=>t.currentPart<t.totalParts-1?t.currentPart+1:null,currentPartInfo:t=>{if(!t.clipInfo||t.clipInfo.length===0)return null;const e=t.currentPart;return e<0?null:t.clipInfo[e]||null},currentSpectrograms:t=>t.currentPartInfo?.spect||[],currentSpectrogramIndex:t=>{const e=t.currentSpectrograms;if(e.length===0||t.duration===0)return 0;let n=0;for(let r=0;r<e.length;r++){const s=e[r].width/Uh;if(n+=s,t.currentTime<n)return r}return e.length-1},currentSpect:t=>{const e=t.currentSpectrograms,n=t.currentSpectrogramIndex,r=e[n];return r?{part:t.currentPart,index:n,url:r.url,width:r.width,filename:r.spect}:{part:null,index:null,url:null,width:0,filename:null}},previousSpect:t=>{const e=t.currentPart,n=t.currentSpectrogramIndex;if(n>0){const s=t.currentSpectrograms[n-1];return s?{part:e,index:n-1,url:s.url,width:s.width,filename:s.spect}:{part:null,index:null,url:null,width:0,filename:null}}if(e>0&&t.clipInfo){const s=t.clipInfo[e-1]?.spect||[];if(s.length>0){const i=s[s.length-1];return{part:e-1,index:s.length-1,url:i.url,width:i.width,filename:i.spect}}}return{part:null,index:null,url:null,width:0,filename:null}},nextSpect:t=>{const e=t.currentPart,n=t.currentSpectrogramIndex,r=t.currentSpectrograms;if(n<r.length-1){const s=r[n+1];return s?{part:e,index:n+1,url:s.url,width:s.width,filename:s.spect}:{part:null,index:null,url:null,width:0,filename:null}}if(e<t.totalParts-1&&t.clipInfo){const i=t.clipInfo[e+1]?.spect||[];if(i.length>0){const a=i[0];return{part:e+1,index:0,url:a.url,width:a.width,filename:a.spect}}}return{part:null,index:null,url:null,width:0,filename:null}}}}),Mn=(t,e)=>{const n=t.__vccOpts||t;for(const[r,s]of e)n[r]=s;return n},aT=["data-store-type"],cT=["src"],lT=["src"],uT=["src"],hT={class:"time-axis"},dT={key:0,class:"tick-label"},fT={class:"frequency-axis"},pT={class:"tick-label"},mT=5625,gT={__name:"Spectrogram",props:{storeType:{type:String,default:"A",validator:t=>["A","B"].includes(t)}},setup(t){const e=t,n=Rn(),r=vl(),s=Ae(null),i=Ae(null),a=Ae(0),c=Ae(0),l=Ae(!1),h=ee(()=>e.storeType==="B"?r:n),f=ee(()=>e.storeType==="B"?r.updateAbsoluteCurrentTime:n.updateAbsoluteCurrentTime),p=ee(()=>e.storeType==="B"?r.offsetAbsoluteTime:n.absoluteCurrentTime),y=mT/60;ee(()=>h.value.currentTime);const S=ee(()=>n.isPlaying);ee(()=>h.value.currentPart);const R=()=>{s.value&&(a.value=s.value.offsetWidth)},N=ee(()=>{if(a.value===0)return 0;const m=h.value.timeInSpectrogram*y;return a.value/2-m-h.value.previousSpect.width}),k=(m,v=300,I=!0)=>{if(l.value)return;if(I){const We=new CustomEvent("spectrogram-animate",{detail:{storeType:e.storeType,targetValue:m,duration:v}});window.dispatchEvent(We)}l.value=!0;const b=c.value,E=performance.now(),Oe=We=>{const ve=We-E,ae=Math.min(ve/v,1),Te=ae<.5?2*ae*ae:1-Math.pow(-2*ae+2,2)/2;c.value=b+(m-b)*Te,ae<1?requestAnimationFrame(Oe):l.value=!1};requestAnimationFrame(Oe)};Ht(N,m=>{l.value||(c.value=m)},{immediate:!0});const L=ee(()=>{if(a.value===0)return[];const m=[];let v;if(l.value){a.value/2;const ae=(N.value-c.value)/y;v=n.absoluteCurrentTime+ae}else v=n.absoluteCurrentTime;const I=a.value/y,b=v-I/2,E=v+I/2,Oe=Math.floor(Math.max(0,b)),We=Math.ceil(E);for(let ve=Oe;ve<=We;ve++){const ae=ve-v,je=a.value/2+ae*y;je>=-100&&je<=a.value+100&&ve>=0&&m.push({time:ve,position:je,label:q(ve),showLabel:ve%5===4&&ve>0})}return m}),q=m=>{const v=new Date("2025-07-04T03:29:56.000Z"),I=new Date(v.getTime()+m*1e3),b=new Date(I.getTime()+480*60*1e3),E=b.getUTCHours().toString().padStart(2,"0"),Oe=b.getUTCMinutes().toString().padStart(2,"0"),We=b.getUTCSeconds().toString().padStart(2,"0");return`${E}:${Oe}:${We}`},H=m=>{const v=new Date("2025-07-04T03:29:56.000Z"),I=new Date(v.getTime()+m*1e3),b=new Date(I.getTime()+480*60*1e3),E=b.getUTCFullYear(),Oe=(b.getUTCMonth()+1).toString().padStart(2,"0"),We=b.getUTCDate().toString().padStart(2,"0"),ve=b.getUTCHours().toString().padStart(2,"0"),ae=b.getUTCMinutes().toString().padStart(2,"0"),Te=b.getUTCSeconds().toString().padStart(2,"0"),je=b.getUTCMilliseconds().toString().padStart(3,"0");return`${E}-${Oe}-${We} ${ve}:${ae}:${Te}.${je}`},z=ee(()=>h.value.previousSpect?[h.value.previousSpect.url,h.value.currentSpect.url,h.value.nextSpect.url]:[null,null,null]),oe=ee(()=>{const m=[0,.12890625,.2578125,.38671875,.515625,.64453125,.7734375,.90234375],v=[0,440,880,1396.30547306,2200.89762379,3469.11936096,5468.12764505,8619.02310976];return m.map((I,b)=>({position:I,frequency:v[b],label:_e(v[b])}))}),_e=m=>m===0?"0 Hz":m>=1e3?`${(m/1e3).toFixed(1)}k`:`${Math.round(m)}`,w=m=>{if(!s.value||h.value.duration===0||a.value===0)return;const v=s.value.getBoundingClientRect(),I=m.clientX-v.left,b=a.value/2,Oe=(I-b)/y,ve=p.value+Oe,ae=h.value.currentSpectrogramIndex,Te=h.value.currentPart;f.value(ve);const je=h.value.currentSpectrogramIndex,xt=h.value.currentPart,D=ae!==je||Te!==xt;!S.value&&!D&&k(N.value);const F=e.storeType==="B"?"spectrogramB-seek":"spectrogram-seek",P=new CustomEvent(F,{detail:{time:ve}});window.dispatchEvent(P)};Ht(()=>h.value.audioSrc,()=>{s.value&&(s.value.scrollLeft=0)});const _=m=>{if(m.detail.storeType!==e.storeType){if(S.value)return;h.value.currentSpectrogramIndex,h.value.currentPart;const v=N.value;if(Math.abs(v-c.value)>y*30)return;k(v,m.detail.duration,!1)}};return gr(()=>{R(),window.addEventListener("resize",R),window.addEventListener("spectrogram-animate",_)}),On(()=>{window.removeEventListener("resize",R),window.removeEventListener("spectrogram-animate",_)}),(m,v)=>(te(),ne("div",{class:"spectrogram-container",ref_key:"containerRef",ref:s,onClick:w,"data-store-type":t.storeType},[Y("div",{class:"spectrogram-wrapper",style:Sn({marginLeft:`${c.value}px`})},[(te(),ne("img",{src:z.value[0],alt:"",class:"spectrogram-image",key:z.value[0]},null,8,cT)),(te(),ne("img",{src:z.value[1],alt:"",class:"spectrogram-image",ref_key:"imageRef",ref:i,key:z.value[1]},null,8,lT)),(te(),ne("img",{src:z.value[2],alt:"",class:"spectrogram-image",key:z.value[2]},null,8,uT))],4),Y("div",hT,[(te(!0),ne(rt,null,Kt(L.value,I=>(te(),ne("div",{key:I.time,class:"time-tick",style:Sn({left:`${I.position}px`})},[v[0]||(v[0]=Y("div",{class:"tick-line"},null,-1)),I.showLabel?(te(),ne("div",dT,Ke(I.label),1)):Ye("",!0)],4))),128))]),Y("div",fT,[(te(!0),ne(rt,null,Kt(oe.value,I=>(te(),ne("div",{key:I.frequency,class:"frequency-tick",style:Sn({bottom:`${I.position*100}%`})},[v[1]||(v[1]=Y("div",{class:"tick-line"},null,-1)),Y("div",pT,Ke(I.label),1)],4))),128))]),Y("div",{class:fn(["current-time-label",{"bottom-position":t.storeType==="B"}])},Ke(H(Gf(n).absoluteCurrentTime)),3),v[2]||(v[2]=Y("div",{class:"playback-indicator"},null,-1))],8,aT))}},Bh=Mn(gT,[["__scopeId","data-v-2e92a2af"]]),_T=""+new URL("A-7xuwHqc2.JPG",import.meta.url).href,yT=""+new URL("B-OVEfjKWK.JPG",import.meta.url).href,vT={class:"audio-player"},TT={class:"hydrophone-image"},ET={key:0,src:_T,alt:"Hydrophone"},IT={key:1,src:yT,alt:"Hydrophone"},wT={class:"hydrophone-label"},AT=["src"],ST={__name:"AudioPlayer",props:{storeType:{type:String,default:"A",validator:t=>["A","B"].includes(t)}},setup(t){const e=t,n=Rn(),r=vl(),s=Ae(null),i=Ae(null),a=Ae(null),c=Ae(null),l=Ae(null),h=Ae(null),f=Ae(null),p=ee(()=>e.storeType==="B"?r:n),y=ee(()=>e.storeType==="B"?r.updateAbsoluteCurrentTime:n.updateAbsoluteCurrentTime),S=ee(()=>e.storeType==="B"?r.offsetAbsoluteTime:n.absoluteCurrentTime),R=ee(()=>n.isPlaying),N=ee(()=>p.value.audioSrc),k=ee(()=>p.value.currentPart),L=ee(()=>e.storeType==="A"?n.isMutedA:n.isMutedB),q=ee(()=>e.storeType==="A"?n.isMutedB:n.isMutedA),H=ee(()=>L.value!==q.value),z=ee(()=>L.value?"(M)":H.value?"(C)":e.storeType==="A"?"(L)":"(R)"),oe=()=>{if(R.value){if(e.storeType==="A")if(S.value>=0&&s.value&&N.value){const D=I(k.value,s.value.currentTime);y.value(D)}else{const D=S.value+.016666666666666666;y.value(D)}S.value>=0&&s.value&&N.value?s.value.paused&&s.value.play().catch(console.error):s.value&&!s.value.paused&&s.value.pause(),i.value=requestAnimationFrame(oe)}},_e=()=>{i.value||(i.value=requestAnimationFrame(oe))},w=()=>{i.value&&(cancelAnimationFrame(i.value),i.value=null)},_=()=>{if(l.value&&f.value){const D=e.storeType==="A"?1:2.75;l.value.gain.value=L.value?0:D,H.value?f.value.pan.value=0:f.value.pan.value=e.storeType==="A"?-.85:.85}},m=()=>{console.log("initWebAudio"),!a.value&&s.value&&(a.value=new(window.AudioContext||window.webkitAudioContext),c.value=a.value.createMediaElementSource(s.value),l.value=a.value.createGain(),h.value=a.value.createDynamicsCompressor(),h.value.threshold.value=-24,h.value.knee.value=30,h.value.ratio.value=12,h.value.attack.value=.003,h.value.release.value=.25,f.value=a.value.createStereoPanner(),_(),c.value.connect(l.value),l.value.connect(h.value),h.value.connect(f.value),f.value.connect(a.value.destination))},v=()=>{(e.storeType==="A"?n.setMutedA:n.setMutedB)(!L.value)},I=(D,F)=>{let P=F;for(let Z=0;Z<D;Z++)P+=p.value.partDurations[Z]||0;return P},b=()=>{console.log("Audio metadata loaded, duration:",s.value?.duration)},E=()=>{console.log("Audio can play, duration:",s.value?.duration),s.value&&p.value.currentTime>=0&&Math.abs(s.value.currentTime-p.value.currentTime)>.5&&(s.value.currentTime=p.value.currentTime)},Oe=D=>{console.error("Audio loading error:",D)},We=()=>{if(s.value&&!R.value){const D=I(k.value,s.value.currentTime);N.value?y.value(D):console.log("audioSrc is null")}},ve=()=>{console.log("onPlay - audio element started"),m()},ae=()=>{console.log("onPause - audio element paused")},Te=()=>{if(w(),console.log("onEnded"),p.value.hasNextPart){const D=p.value.getNextPart;let F=0;for(let P=0;P<D;P++)F+=p.value.partDurations[P]||0;y.value(F)}};Ht(()=>N.value,(D,F)=>{if(console.log("audioSrc changed from",F,"to",D),s.value&&D){console.log("Loading new audio source:",D),R.value,s.value.src=D,s.value.load();const P=()=>{s.value.removeEventListener("canplay",P),p.value.currentTime>=0&&Math.abs(s.value.currentTime-p.value.currentTime)>.5&&(s.value.currentTime=p.value.currentTime,console.log("Audio source changed - synced time to:",p.value.currentTime))};s.value.addEventListener("canplay",P)}}),Ht(()=>p.value.currentTime,D=>{s.value&&D>=0&&Math.abs(s.value.currentTime-D)>.5&&(console.log(`Syncing audio element time to ${D}`),s.value.currentTime=D)}),Ht(()=>R.value,D=>{D?(_e(),S.value>=0&&N.value&&s.value&&s.value.play().catch(console.error)):(w(),s.value&&s.value.pause())}),Ht([()=>L.value,()=>q.value],()=>{_()}),gr(()=>{const D=e.storeType==="B"?"spectrogramB-seek":"spectrogram-seek";window.addEventListener(D,je),e.storeType==="A"&&window.addEventListener("minimap-seek",je),window.addEventListener("volume-change",xt)}),On(()=>{w();const D=e.storeType==="B"?"spectrogramB-seek":"spectrogram-seek";window.removeEventListener(D,je),e.storeType==="A"&&window.removeEventListener("minimap-seek",je),window.removeEventListener("volume-change",xt),a.value&&a.value.close().catch(console.error)});const je=D=>{if(s.value){const F=D.detail.time;console.log("handleSeek",F),y.value(F)}},xt=D=>{s.value&&(s.value.volume=D.detail.volume)};return(D,F)=>(te(),ne("div",vT,[Y("div",{class:fn(["floating-label",{"muted-channel":L.value}])},[Y("div",TT,[t.storeType=="A"?(te(),ne("img",ET)):Ye("",!0),t.storeType=="B"?(te(),ne("img",IT)):Ye("",!0)]),Y("span",wT," Hydrophone "+Ke(t.storeType),1),Y("span",null,'"'+Ke(t.storeType=="B"?"In the Coral":"On The Table")+'"',1),Y("span",null,[Y("button",{onClick:v,class:fn(["mute-button",{muted:L.value}]),tabindex:"-1"},Ke(L.value?"🔇":"🔊"),3),Vo(" "+Ke(z.value),1)])],2),(te(),ne("audio",{ref_key:"audioElement",ref:s,key:`audioElement${t.storeType}`,src:N.value,onLoadedmetadata:b,onCanplay:E,onTimeupdate:We,onPlay:ve,onPause:ae,onEnded:Te,onError:Oe,crossorigin:"anonymous",preload:"metadata"},null,40,AT))]))}},jh=Mn(ST,[["__scopeId","data-v-c08775e1"]]),bT=()=>{};var qh={};/**
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
 */const Dp=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},CT=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],a=t[n++],c=t[n++],l=((s&7)<<18|(i&63)<<12|(a&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const i=t[n++],a=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},Np={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],a=s+1<t.length,c=a?t[s+1]:0,l=s+2<t.length,h=l?t[s+2]:0,f=i>>2,p=(i&3)<<4|c>>4;let y=(c&15)<<2|h>>6,S=h&63;l||(S=64,a||(y=64)),r.push(n[f],n[p],n[y],n[S])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Dp(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):CT(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],c=s<t.length?n[t.charAt(s)]:0;++s;const h=s<t.length?n[t.charAt(s)]:64;++s;const p=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||c==null||h==null||p==null)throw new RT;const y=i<<2|c>>4;if(r.push(y),h!==64){const S=c<<4&240|h>>2;if(r.push(S),p!==64){const R=h<<6&192|p;r.push(R)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class RT extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const PT=function(t){const e=Dp(t);return Np.encodeByteArray(e,!0)},Mo=function(t){return PT(t).replace(/\./g,"")},xp=function(t){try{return Np.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function kT(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const DT=()=>kT().__FIREBASE_DEFAULTS__,NT=()=>{if(typeof process>"u"||typeof qh>"u")return;const t=qh.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},xT=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&xp(t[1]);return e&&JSON.parse(e)},pa=()=>{try{return bT()||DT()||NT()||xT()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Vp=t=>pa()?.emulatorHosts?.[t],VT=t=>{const e=Vp(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},Op=()=>pa()?.config,Mp=t=>pa()?.[`_${t}`];/**
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
 */class OT{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
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
 */function Ts(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Lp(t){return(await fetch(t,{credentials:"include"})).ok}/**
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
 */function MT(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",s=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...t};return[Mo(JSON.stringify(n)),Mo(JSON.stringify(a)),""].join(".")}const ii={};function LT(){const t={prod:[],emulator:[]};for(const e of Object.keys(ii))ii[e]?t.emulator.push(e):t.prod.push(e);return t}function FT(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let Hh=!1;function Fp(t,e){if(typeof window>"u"||typeof document>"u"||!Ts(window.location.host)||ii[t]===e||ii[t]||Hh)return;ii[t]=e;function n(y){return`__firebase__banner__${y}`}const r="__firebase__banner",i=LT().prod.length>0;function a(){const y=document.getElementById(r);y&&y.remove()}function c(y){y.style.display="flex",y.style.background="#7faaf0",y.style.position="fixed",y.style.bottom="5px",y.style.left="5px",y.style.padding=".5em",y.style.borderRadius="5px",y.style.alignItems="center"}function l(y,S){y.setAttribute("width","24"),y.setAttribute("id",S),y.setAttribute("height","24"),y.setAttribute("viewBox","0 0 24 24"),y.setAttribute("fill","none"),y.style.marginLeft="-6px"}function h(){const y=document.createElement("span");return y.style.cursor="pointer",y.style.marginLeft="16px",y.style.fontSize="24px",y.innerHTML=" &times;",y.onclick=()=>{Hh=!0,a()},y}function f(y,S){y.setAttribute("id",S),y.innerText="Learn more",y.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",y.setAttribute("target","__blank"),y.style.paddingLeft="5px",y.style.textDecoration="underline"}function p(){const y=FT(r),S=n("text"),R=document.getElementById(S)||document.createElement("span"),N=n("learnmore"),k=document.getElementById(N)||document.createElement("a"),L=n("preprendIcon"),q=document.getElementById(L)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(y.created){const H=y.element;c(H),f(k,N);const z=h();l(q,L),H.append(q,R,k,z),document.body.appendChild(H)}i?(R.innerText="Preview backend disconnected.",q.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(q.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,R.innerText="Preview backend running in this workspace."),R.setAttribute("id",S)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",p):p()}/**
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
 */function Ct(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function UT(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ct())}function $T(){const t=pa()?.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function BT(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function jT(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function qT(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function HT(){const t=Ct();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function WT(){return!$T()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function zT(){try{return typeof indexedDB=="object"}catch{return!1}}function GT(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(n){e(n)}})}/**
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
 */const KT="FirebaseError";class Ln extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=KT,Object.setPrototypeOf(this,Ln.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ri.prototype.create)}}class Ri{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?QT(i,r):"Error",c=`${this.serviceName}: ${a} (${s}).`;return new Ln(s,c,r)}}function QT(t,e){return t.replace(XT,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const XT=/\{\$([^}]+)}/g;function JT(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Nr(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],a=e[s];if(Wh(i)&&Wh(a)){if(!Nr(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function Wh(t){return t!==null&&typeof t=="object"}/**
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
 */function Pi(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Hs(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function Ws(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function YT(t,e){const n=new ZT(t,e);return n.subscribe.bind(n)}class ZT{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");eE(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=sc),s.error===void 0&&(s.error=sc),s.complete===void 0&&(s.complete=sc);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function eE(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function sc(){}/**
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
 */function _t(t){return t&&t._delegate?t._delegate:t}class xr{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Sr="[DEFAULT]";/**
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
 */class tE{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new OT;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(rE(e))try{this.getOrInitializeService({instanceIdentifier:Sr})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Sr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Sr){return this.instances.has(e)}getOptions(e=Sr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&a.resolve(s)}return s}onInit(e,n){const r=this.normalizeInstanceIdentifier(n),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:nE(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Sr){return this.component?this.component.multipleInstances?e:Sr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function nE(t){return t===Sr?void 0:t}function rE(t){return t.instantiationMode==="EAGER"}/**
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
 */class sE{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new tE(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var Ce;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(Ce||(Ce={}));const iE={debug:Ce.DEBUG,verbose:Ce.VERBOSE,info:Ce.INFO,warn:Ce.WARN,error:Ce.ERROR,silent:Ce.SILENT},oE=Ce.INFO,aE={[Ce.DEBUG]:"log",[Ce.VERBOSE]:"log",[Ce.INFO]:"info",[Ce.WARN]:"warn",[Ce.ERROR]:"error"},cE=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=aE[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Tl{constructor(e){this.name=e,this._logLevel=oE,this._logHandler=cE,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Ce))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?iE[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Ce.DEBUG,...e),this._logHandler(this,Ce.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Ce.VERBOSE,...e),this._logHandler(this,Ce.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Ce.INFO,...e),this._logHandler(this,Ce.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Ce.WARN,...e),this._logHandler(this,Ce.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Ce.ERROR,...e),this._logHandler(this,Ce.ERROR,...e)}}const lE=(t,e)=>e.some(n=>t instanceof n);let zh,Gh;function uE(){return zh||(zh=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function hE(){return Gh||(Gh=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Up=new WeakMap,Pc=new WeakMap,$p=new WeakMap,ic=new WeakMap,El=new WeakMap;function dE(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",a)},i=()=>{n(er(t.result)),s()},a=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",a)});return e.then(n=>{n instanceof IDBCursor&&Up.set(n,t)}).catch(()=>{}),El.set(e,t),e}function fE(t){if(Pc.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",a),t.removeEventListener("abort",a)},i=()=>{n(),s()},a=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",a),t.addEventListener("abort",a)});Pc.set(t,e)}let kc={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Pc.get(t);if(e==="objectStoreNames")return t.objectStoreNames||$p.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return er(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function pE(t){kc=t(kc)}function mE(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(oc(this),e,...n);return $p.set(r,e.sort?e.sort():[e]),er(r)}:hE().includes(t)?function(...e){return t.apply(oc(this),e),er(Up.get(this))}:function(...e){return er(t.apply(oc(this),e))}}function gE(t){return typeof t=="function"?mE(t):(t instanceof IDBTransaction&&fE(t),lE(t,uE())?new Proxy(t,kc):t)}function er(t){if(t instanceof IDBRequest)return dE(t);if(ic.has(t))return ic.get(t);const e=gE(t);return e!==t&&(ic.set(t,e),El.set(e,t)),e}const oc=t=>El.get(t);function _E(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(t,e),c=er(a);return r&&a.addEventListener("upgradeneeded",l=>{r(er(a.result),l.oldVersion,l.newVersion,er(a.transaction),l)}),n&&a.addEventListener("blocked",l=>n(l.oldVersion,l.newVersion,l)),c.then(l=>{i&&l.addEventListener("close",()=>i()),s&&l.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const yE=["get","getKey","getAll","getAllKeys","count"],vE=["put","add","delete","clear"],ac=new Map;function Kh(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(ac.get(e))return ac.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=vE.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||yE.includes(n)))return;const i=async function(a,...c){const l=this.transaction(a,s?"readwrite":"readonly");let h=l.store;return r&&(h=h.index(c.shift())),(await Promise.all([h[n](...c),s&&l.done]))[0]};return ac.set(e,i),i}pE(t=>({...t,get:(e,n,r)=>Kh(e,n)||t.get(e,n,r),has:(e,n)=>!!Kh(e,n)||t.has(e,n)}));/**
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
 */class TE{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(EE(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function EE(t){return t.getComponent()?.type==="VERSION"}const Dc="@firebase/app",Qh="0.14.0";/**
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
 */const Pn=new Tl("@firebase/app"),IE="@firebase/app-compat",wE="@firebase/analytics-compat",AE="@firebase/analytics",SE="@firebase/app-check-compat",bE="@firebase/app-check",CE="@firebase/auth",RE="@firebase/auth-compat",PE="@firebase/database",kE="@firebase/data-connect",DE="@firebase/database-compat",NE="@firebase/functions",xE="@firebase/functions-compat",VE="@firebase/installations",OE="@firebase/installations-compat",ME="@firebase/messaging",LE="@firebase/messaging-compat",FE="@firebase/performance",UE="@firebase/performance-compat",$E="@firebase/remote-config",BE="@firebase/remote-config-compat",jE="@firebase/storage",qE="@firebase/storage-compat",HE="@firebase/firestore",WE="@firebase/ai",zE="@firebase/firestore-compat",GE="firebase",KE="12.0.0";/**
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
 */const Nc="[DEFAULT]",QE={[Dc]:"fire-core",[IE]:"fire-core-compat",[AE]:"fire-analytics",[wE]:"fire-analytics-compat",[bE]:"fire-app-check",[SE]:"fire-app-check-compat",[CE]:"fire-auth",[RE]:"fire-auth-compat",[PE]:"fire-rtdb",[kE]:"fire-data-connect",[DE]:"fire-rtdb-compat",[NE]:"fire-fn",[xE]:"fire-fn-compat",[VE]:"fire-iid",[OE]:"fire-iid-compat",[ME]:"fire-fcm",[LE]:"fire-fcm-compat",[FE]:"fire-perf",[UE]:"fire-perf-compat",[$E]:"fire-rc",[BE]:"fire-rc-compat",[jE]:"fire-gcs",[qE]:"fire-gcs-compat",[HE]:"fire-fst",[zE]:"fire-fst-compat",[WE]:"fire-vertex","fire-js":"fire-js",[GE]:"fire-js-all"};/**
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
 */const Lo=new Map,XE=new Map,xc=new Map;function Xh(t,e){try{t.container.addComponent(e)}catch(n){Pn.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function ds(t){const e=t.name;if(xc.has(e))return Pn.debug(`There were multiple attempts to register component ${e}.`),!1;xc.set(e,t);for(const n of Lo.values())Xh(n,t);for(const n of XE.values())Xh(n,t);return!0}function Il(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Ot(t){return t==null?!1:t.settings!==void 0}/**
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
 */const JE={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},tr=new Ri("app","Firebase",JE);/**
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
 */class YE{constructor(e,n,r){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new xr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw tr.create("app-deleted",{appName:this._name})}}/**
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
 */const Es=KE;function Bp(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r={name:Nc,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw tr.create("bad-app-name",{appName:String(s)});if(n||(n=Op()),!n)throw tr.create("no-options");const i=Lo.get(s);if(i){if(Nr(n,i.options)&&Nr(r,i.config))return i;throw tr.create("duplicate-app",{appName:s})}const a=new sE(s);for(const l of xc.values())a.addComponent(l);const c=new YE(n,r,a);return Lo.set(s,c),c}function jp(t=Nc){const e=Lo.get(t);if(!e&&t===Nc&&Op())return Bp();if(!e)throw tr.create("no-app",{appName:t});return e}function nr(t,e,n){let r=QE[t]??t;n&&(r+=`-${n}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const a=[`Unable to register library "${r}" with version "${e}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&a.push("and"),i&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Pn.warn(a.join(" "));return}ds(new xr(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
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
 */const ZE="firebase-heartbeat-database",eI=1,gi="firebase-heartbeat-store";let cc=null;function qp(){return cc||(cc=_E(ZE,eI,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(gi)}catch(n){console.warn(n)}}}}).catch(t=>{throw tr.create("idb-open",{originalErrorMessage:t.message})})),cc}async function tI(t){try{const n=(await qp()).transaction(gi),r=await n.objectStore(gi).get(Hp(t));return await n.done,r}catch(e){if(e instanceof Ln)Pn.warn(e.message);else{const n=tr.create("idb-get",{originalErrorMessage:e?.message});Pn.warn(n.message)}}}async function Jh(t,e){try{const r=(await qp()).transaction(gi,"readwrite");await r.objectStore(gi).put(e,Hp(t)),await r.done}catch(n){if(n instanceof Ln)Pn.warn(n.message);else{const r=tr.create("idb-set",{originalErrorMessage:n?.message});Pn.warn(r.message)}}}function Hp(t){return`${t.name}!${t.options.appId}`}/**
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
 */const nI=1024,rI=30;class sI{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new oI(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Yh();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats.length>rI){const s=aI(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Pn.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Yh(),{heartbeatsToSend:n,unsentEntries:r}=iI(this._heartbeatsCache.heartbeats),s=Mo(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return Pn.warn(e),""}}}function Yh(){return new Date().toISOString().substring(0,10)}function iI(t,e=nI){const n=[];let r=t.slice();for(const s of t){const i=n.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),Zh(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),Zh(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class oI{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return zT()?GT().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await tI(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Jh(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Jh(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Zh(t){return Mo(JSON.stringify({version:2,heartbeats:t})).length}function aI(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let r=1;r<t.length;r++)t[r].date<n&&(n=t[r].date,e=r);return e}/**
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
 */function cI(t){ds(new xr("platform-logger",e=>new TE(e),"PRIVATE")),ds(new xr("heartbeat",e=>new sI(e),"PRIVATE")),nr(Dc,Qh,t),nr(Dc,Qh,"esm2020"),nr("fire-js","")}cI("");var ed=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var rr,Wp;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(w,_){function m(){}m.prototype=_.prototype,w.D=_.prototype,w.prototype=new m,w.prototype.constructor=w,w.C=function(v,I,b){for(var E=Array(arguments.length-2),Oe=2;Oe<arguments.length;Oe++)E[Oe-2]=arguments[Oe];return _.prototype[I].apply(v,E)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(w,_,m){m||(m=0);var v=Array(16);if(typeof _=="string")for(var I=0;16>I;++I)v[I]=_.charCodeAt(m++)|_.charCodeAt(m++)<<8|_.charCodeAt(m++)<<16|_.charCodeAt(m++)<<24;else for(I=0;16>I;++I)v[I]=_[m++]|_[m++]<<8|_[m++]<<16|_[m++]<<24;_=w.g[0],m=w.g[1],I=w.g[2];var b=w.g[3],E=_+(b^m&(I^b))+v[0]+3614090360&4294967295;_=m+(E<<7&4294967295|E>>>25),E=b+(I^_&(m^I))+v[1]+3905402710&4294967295,b=_+(E<<12&4294967295|E>>>20),E=I+(m^b&(_^m))+v[2]+606105819&4294967295,I=b+(E<<17&4294967295|E>>>15),E=m+(_^I&(b^_))+v[3]+3250441966&4294967295,m=I+(E<<22&4294967295|E>>>10),E=_+(b^m&(I^b))+v[4]+4118548399&4294967295,_=m+(E<<7&4294967295|E>>>25),E=b+(I^_&(m^I))+v[5]+1200080426&4294967295,b=_+(E<<12&4294967295|E>>>20),E=I+(m^b&(_^m))+v[6]+2821735955&4294967295,I=b+(E<<17&4294967295|E>>>15),E=m+(_^I&(b^_))+v[7]+4249261313&4294967295,m=I+(E<<22&4294967295|E>>>10),E=_+(b^m&(I^b))+v[8]+1770035416&4294967295,_=m+(E<<7&4294967295|E>>>25),E=b+(I^_&(m^I))+v[9]+2336552879&4294967295,b=_+(E<<12&4294967295|E>>>20),E=I+(m^b&(_^m))+v[10]+4294925233&4294967295,I=b+(E<<17&4294967295|E>>>15),E=m+(_^I&(b^_))+v[11]+2304563134&4294967295,m=I+(E<<22&4294967295|E>>>10),E=_+(b^m&(I^b))+v[12]+1804603682&4294967295,_=m+(E<<7&4294967295|E>>>25),E=b+(I^_&(m^I))+v[13]+4254626195&4294967295,b=_+(E<<12&4294967295|E>>>20),E=I+(m^b&(_^m))+v[14]+2792965006&4294967295,I=b+(E<<17&4294967295|E>>>15),E=m+(_^I&(b^_))+v[15]+1236535329&4294967295,m=I+(E<<22&4294967295|E>>>10),E=_+(I^b&(m^I))+v[1]+4129170786&4294967295,_=m+(E<<5&4294967295|E>>>27),E=b+(m^I&(_^m))+v[6]+3225465664&4294967295,b=_+(E<<9&4294967295|E>>>23),E=I+(_^m&(b^_))+v[11]+643717713&4294967295,I=b+(E<<14&4294967295|E>>>18),E=m+(b^_&(I^b))+v[0]+3921069994&4294967295,m=I+(E<<20&4294967295|E>>>12),E=_+(I^b&(m^I))+v[5]+3593408605&4294967295,_=m+(E<<5&4294967295|E>>>27),E=b+(m^I&(_^m))+v[10]+38016083&4294967295,b=_+(E<<9&4294967295|E>>>23),E=I+(_^m&(b^_))+v[15]+3634488961&4294967295,I=b+(E<<14&4294967295|E>>>18),E=m+(b^_&(I^b))+v[4]+3889429448&4294967295,m=I+(E<<20&4294967295|E>>>12),E=_+(I^b&(m^I))+v[9]+568446438&4294967295,_=m+(E<<5&4294967295|E>>>27),E=b+(m^I&(_^m))+v[14]+3275163606&4294967295,b=_+(E<<9&4294967295|E>>>23),E=I+(_^m&(b^_))+v[3]+4107603335&4294967295,I=b+(E<<14&4294967295|E>>>18),E=m+(b^_&(I^b))+v[8]+1163531501&4294967295,m=I+(E<<20&4294967295|E>>>12),E=_+(I^b&(m^I))+v[13]+2850285829&4294967295,_=m+(E<<5&4294967295|E>>>27),E=b+(m^I&(_^m))+v[2]+4243563512&4294967295,b=_+(E<<9&4294967295|E>>>23),E=I+(_^m&(b^_))+v[7]+1735328473&4294967295,I=b+(E<<14&4294967295|E>>>18),E=m+(b^_&(I^b))+v[12]+2368359562&4294967295,m=I+(E<<20&4294967295|E>>>12),E=_+(m^I^b)+v[5]+4294588738&4294967295,_=m+(E<<4&4294967295|E>>>28),E=b+(_^m^I)+v[8]+2272392833&4294967295,b=_+(E<<11&4294967295|E>>>21),E=I+(b^_^m)+v[11]+1839030562&4294967295,I=b+(E<<16&4294967295|E>>>16),E=m+(I^b^_)+v[14]+4259657740&4294967295,m=I+(E<<23&4294967295|E>>>9),E=_+(m^I^b)+v[1]+2763975236&4294967295,_=m+(E<<4&4294967295|E>>>28),E=b+(_^m^I)+v[4]+1272893353&4294967295,b=_+(E<<11&4294967295|E>>>21),E=I+(b^_^m)+v[7]+4139469664&4294967295,I=b+(E<<16&4294967295|E>>>16),E=m+(I^b^_)+v[10]+3200236656&4294967295,m=I+(E<<23&4294967295|E>>>9),E=_+(m^I^b)+v[13]+681279174&4294967295,_=m+(E<<4&4294967295|E>>>28),E=b+(_^m^I)+v[0]+3936430074&4294967295,b=_+(E<<11&4294967295|E>>>21),E=I+(b^_^m)+v[3]+3572445317&4294967295,I=b+(E<<16&4294967295|E>>>16),E=m+(I^b^_)+v[6]+76029189&4294967295,m=I+(E<<23&4294967295|E>>>9),E=_+(m^I^b)+v[9]+3654602809&4294967295,_=m+(E<<4&4294967295|E>>>28),E=b+(_^m^I)+v[12]+3873151461&4294967295,b=_+(E<<11&4294967295|E>>>21),E=I+(b^_^m)+v[15]+530742520&4294967295,I=b+(E<<16&4294967295|E>>>16),E=m+(I^b^_)+v[2]+3299628645&4294967295,m=I+(E<<23&4294967295|E>>>9),E=_+(I^(m|~b))+v[0]+4096336452&4294967295,_=m+(E<<6&4294967295|E>>>26),E=b+(m^(_|~I))+v[7]+1126891415&4294967295,b=_+(E<<10&4294967295|E>>>22),E=I+(_^(b|~m))+v[14]+2878612391&4294967295,I=b+(E<<15&4294967295|E>>>17),E=m+(b^(I|~_))+v[5]+4237533241&4294967295,m=I+(E<<21&4294967295|E>>>11),E=_+(I^(m|~b))+v[12]+1700485571&4294967295,_=m+(E<<6&4294967295|E>>>26),E=b+(m^(_|~I))+v[3]+2399980690&4294967295,b=_+(E<<10&4294967295|E>>>22),E=I+(_^(b|~m))+v[10]+4293915773&4294967295,I=b+(E<<15&4294967295|E>>>17),E=m+(b^(I|~_))+v[1]+2240044497&4294967295,m=I+(E<<21&4294967295|E>>>11),E=_+(I^(m|~b))+v[8]+1873313359&4294967295,_=m+(E<<6&4294967295|E>>>26),E=b+(m^(_|~I))+v[15]+4264355552&4294967295,b=_+(E<<10&4294967295|E>>>22),E=I+(_^(b|~m))+v[6]+2734768916&4294967295,I=b+(E<<15&4294967295|E>>>17),E=m+(b^(I|~_))+v[13]+1309151649&4294967295,m=I+(E<<21&4294967295|E>>>11),E=_+(I^(m|~b))+v[4]+4149444226&4294967295,_=m+(E<<6&4294967295|E>>>26),E=b+(m^(_|~I))+v[11]+3174756917&4294967295,b=_+(E<<10&4294967295|E>>>22),E=I+(_^(b|~m))+v[2]+718787259&4294967295,I=b+(E<<15&4294967295|E>>>17),E=m+(b^(I|~_))+v[9]+3951481745&4294967295,w.g[0]=w.g[0]+_&4294967295,w.g[1]=w.g[1]+(I+(E<<21&4294967295|E>>>11))&4294967295,w.g[2]=w.g[2]+I&4294967295,w.g[3]=w.g[3]+b&4294967295}r.prototype.u=function(w,_){_===void 0&&(_=w.length);for(var m=_-this.blockSize,v=this.B,I=this.h,b=0;b<_;){if(I==0)for(;b<=m;)s(this,w,b),b+=this.blockSize;if(typeof w=="string"){for(;b<_;)if(v[I++]=w.charCodeAt(b++),I==this.blockSize){s(this,v),I=0;break}}else for(;b<_;)if(v[I++]=w[b++],I==this.blockSize){s(this,v),I=0;break}}this.h=I,this.o+=_},r.prototype.v=function(){var w=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);w[0]=128;for(var _=1;_<w.length-8;++_)w[_]=0;var m=8*this.o;for(_=w.length-8;_<w.length;++_)w[_]=m&255,m/=256;for(this.u(w),w=Array(16),_=m=0;4>_;++_)for(var v=0;32>v;v+=8)w[m++]=this.g[_]>>>v&255;return w};function i(w,_){var m=c;return Object.prototype.hasOwnProperty.call(m,w)?m[w]:m[w]=_(w)}function a(w,_){this.h=_;for(var m=[],v=!0,I=w.length-1;0<=I;I--){var b=w[I]|0;v&&b==_||(m[I]=b,v=!1)}this.g=m}var c={};function l(w){return-128<=w&&128>w?i(w,function(_){return new a([_|0],0>_?-1:0)}):new a([w|0],0>w?-1:0)}function h(w){if(isNaN(w)||!isFinite(w))return p;if(0>w)return k(h(-w));for(var _=[],m=1,v=0;w>=m;v++)_[v]=w/m|0,m*=4294967296;return new a(_,0)}function f(w,_){if(w.length==0)throw Error("number format error: empty string");if(_=_||10,2>_||36<_)throw Error("radix out of range: "+_);if(w.charAt(0)=="-")return k(f(w.substring(1),_));if(0<=w.indexOf("-"))throw Error('number format error: interior "-" character');for(var m=h(Math.pow(_,8)),v=p,I=0;I<w.length;I+=8){var b=Math.min(8,w.length-I),E=parseInt(w.substring(I,I+b),_);8>b?(b=h(Math.pow(_,b)),v=v.j(b).add(h(E))):(v=v.j(m),v=v.add(h(E)))}return v}var p=l(0),y=l(1),S=l(16777216);t=a.prototype,t.m=function(){if(N(this))return-k(this).m();for(var w=0,_=1,m=0;m<this.g.length;m++){var v=this.i(m);w+=(0<=v?v:4294967296+v)*_,_*=4294967296}return w},t.toString=function(w){if(w=w||10,2>w||36<w)throw Error("radix out of range: "+w);if(R(this))return"0";if(N(this))return"-"+k(this).toString(w);for(var _=h(Math.pow(w,6)),m=this,v="";;){var I=z(m,_).g;m=L(m,I.j(_));var b=((0<m.g.length?m.g[0]:m.h)>>>0).toString(w);if(m=I,R(m))return b+v;for(;6>b.length;)b="0"+b;v=b+v}},t.i=function(w){return 0>w?0:w<this.g.length?this.g[w]:this.h};function R(w){if(w.h!=0)return!1;for(var _=0;_<w.g.length;_++)if(w.g[_]!=0)return!1;return!0}function N(w){return w.h==-1}t.l=function(w){return w=L(this,w),N(w)?-1:R(w)?0:1};function k(w){for(var _=w.g.length,m=[],v=0;v<_;v++)m[v]=~w.g[v];return new a(m,~w.h).add(y)}t.abs=function(){return N(this)?k(this):this},t.add=function(w){for(var _=Math.max(this.g.length,w.g.length),m=[],v=0,I=0;I<=_;I++){var b=v+(this.i(I)&65535)+(w.i(I)&65535),E=(b>>>16)+(this.i(I)>>>16)+(w.i(I)>>>16);v=E>>>16,b&=65535,E&=65535,m[I]=E<<16|b}return new a(m,m[m.length-1]&-2147483648?-1:0)};function L(w,_){return w.add(k(_))}t.j=function(w){if(R(this)||R(w))return p;if(N(this))return N(w)?k(this).j(k(w)):k(k(this).j(w));if(N(w))return k(this.j(k(w)));if(0>this.l(S)&&0>w.l(S))return h(this.m()*w.m());for(var _=this.g.length+w.g.length,m=[],v=0;v<2*_;v++)m[v]=0;for(v=0;v<this.g.length;v++)for(var I=0;I<w.g.length;I++){var b=this.i(v)>>>16,E=this.i(v)&65535,Oe=w.i(I)>>>16,We=w.i(I)&65535;m[2*v+2*I]+=E*We,q(m,2*v+2*I),m[2*v+2*I+1]+=b*We,q(m,2*v+2*I+1),m[2*v+2*I+1]+=E*Oe,q(m,2*v+2*I+1),m[2*v+2*I+2]+=b*Oe,q(m,2*v+2*I+2)}for(v=0;v<_;v++)m[v]=m[2*v+1]<<16|m[2*v];for(v=_;v<2*_;v++)m[v]=0;return new a(m,0)};function q(w,_){for(;(w[_]&65535)!=w[_];)w[_+1]+=w[_]>>>16,w[_]&=65535,_++}function H(w,_){this.g=w,this.h=_}function z(w,_){if(R(_))throw Error("division by zero");if(R(w))return new H(p,p);if(N(w))return _=z(k(w),_),new H(k(_.g),k(_.h));if(N(_))return _=z(w,k(_)),new H(k(_.g),_.h);if(30<w.g.length){if(N(w)||N(_))throw Error("slowDivide_ only works with positive integers.");for(var m=y,v=_;0>=v.l(w);)m=oe(m),v=oe(v);var I=_e(m,1),b=_e(v,1);for(v=_e(v,2),m=_e(m,2);!R(v);){var E=b.add(v);0>=E.l(w)&&(I=I.add(m),b=E),v=_e(v,1),m=_e(m,1)}return _=L(w,I.j(_)),new H(I,_)}for(I=p;0<=w.l(_);){for(m=Math.max(1,Math.floor(w.m()/_.m())),v=Math.ceil(Math.log(m)/Math.LN2),v=48>=v?1:Math.pow(2,v-48),b=h(m),E=b.j(_);N(E)||0<E.l(w);)m-=v,b=h(m),E=b.j(_);R(b)&&(b=y),I=I.add(b),w=L(w,E)}return new H(I,w)}t.A=function(w){return z(this,w).h},t.and=function(w){for(var _=Math.max(this.g.length,w.g.length),m=[],v=0;v<_;v++)m[v]=this.i(v)&w.i(v);return new a(m,this.h&w.h)},t.or=function(w){for(var _=Math.max(this.g.length,w.g.length),m=[],v=0;v<_;v++)m[v]=this.i(v)|w.i(v);return new a(m,this.h|w.h)},t.xor=function(w){for(var _=Math.max(this.g.length,w.g.length),m=[],v=0;v<_;v++)m[v]=this.i(v)^w.i(v);return new a(m,this.h^w.h)};function oe(w){for(var _=w.g.length+1,m=[],v=0;v<_;v++)m[v]=w.i(v)<<1|w.i(v-1)>>>31;return new a(m,w.h)}function _e(w,_){var m=_>>5;_%=32;for(var v=w.g.length-m,I=[],b=0;b<v;b++)I[b]=0<_?w.i(b+m)>>>_|w.i(b+m+1)<<32-_:w.i(b+m);return new a(I,w.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Wp=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=h,a.fromString=f,rr=a}).apply(typeof ed<"u"?ed:typeof self<"u"?self:typeof window<"u"?window:{});var io=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var zp,zs,Gp,yo,Vc,Kp,Qp,Xp;(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,u,d){return o==Array.prototype||o==Object.prototype||(o[u]=d.value),o};function n(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof io=="object"&&io];for(var u=0;u<o.length;++u){var d=o[u];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=n(this);function s(o,u){if(u)e:{var d=r;o=o.split(".");for(var g=0;g<o.length-1;g++){var C=o[g];if(!(C in d))break e;d=d[C]}o=o[o.length-1],g=d[o],u=u(g),u!=g&&u!=null&&e(d,o,{configurable:!0,writable:!0,value:u})}}function i(o,u){o instanceof String&&(o+="");var d=0,g=!1,C={next:function(){if(!g&&d<o.length){var x=d++;return{value:u(x,o[x]),done:!1}}return g=!0,{done:!0,value:void 0}}};return C[Symbol.iterator]=function(){return C},C}s("Array.prototype.values",function(o){return o||function(){return i(this,function(u,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},c=this||self;function l(o){var u=typeof o;return u=u!="object"?u:o?Array.isArray(o)?"array":u:"null",u=="array"||u=="object"&&typeof o.length=="number"}function h(o){var u=typeof o;return u=="object"&&o!=null||u=="function"}function f(o,u,d){return o.call.apply(o.bind,arguments)}function p(o,u,d){if(!o)throw Error();if(2<arguments.length){var g=Array.prototype.slice.call(arguments,2);return function(){var C=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(C,g),o.apply(u,C)}}return function(){return o.apply(u,arguments)}}function y(o,u,d){return y=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:p,y.apply(null,arguments)}function S(o,u){var d=Array.prototype.slice.call(arguments,1);return function(){var g=d.slice();return g.push.apply(g,arguments),o.apply(this,g)}}function R(o,u){function d(){}d.prototype=u.prototype,o.aa=u.prototype,o.prototype=new d,o.prototype.constructor=o,o.Qb=function(g,C,x){for(var Q=Array(arguments.length-2),Ue=2;Ue<arguments.length;Ue++)Q[Ue-2]=arguments[Ue];return u.prototype[C].apply(g,Q)}}function N(o){const u=o.length;if(0<u){const d=Array(u);for(let g=0;g<u;g++)d[g]=o[g];return d}return[]}function k(o,u){for(let d=1;d<arguments.length;d++){const g=arguments[d];if(l(g)){const C=o.length||0,x=g.length||0;o.length=C+x;for(let Q=0;Q<x;Q++)o[C+Q]=g[Q]}else o.push(g)}}class L{constructor(u,d){this.i=u,this.j=d,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function q(o){return/^[\s\xa0]*$/.test(o)}function H(){var o=c.navigator;return o&&(o=o.userAgent)?o:""}function z(o){return z[" "](o),o}z[" "]=function(){};var oe=H().indexOf("Gecko")!=-1&&!(H().toLowerCase().indexOf("webkit")!=-1&&H().indexOf("Edge")==-1)&&!(H().indexOf("Trident")!=-1||H().indexOf("MSIE")!=-1)&&H().indexOf("Edge")==-1;function _e(o,u,d){for(const g in o)u.call(d,o[g],g,o)}function w(o,u){for(const d in o)u.call(void 0,o[d],d,o)}function _(o){const u={};for(const d in o)u[d]=o[d];return u}const m="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function v(o,u){let d,g;for(let C=1;C<arguments.length;C++){g=arguments[C];for(d in g)o[d]=g[d];for(let x=0;x<m.length;x++)d=m[x],Object.prototype.hasOwnProperty.call(g,d)&&(o[d]=g[d])}}function I(o){var u=1;o=o.split(":");const d=[];for(;0<u&&o.length;)d.push(o.shift()),u--;return o.length&&d.push(o.join(":")),d}function b(o){c.setTimeout(()=>{throw o},0)}function E(){var o=je;let u=null;return o.g&&(u=o.g,o.g=o.g.next,o.g||(o.h=null),u.next=null),u}class Oe{constructor(){this.h=this.g=null}add(u,d){const g=We.get();g.set(u,d),this.h?this.h.next=g:this.g=g,this.h=g}}var We=new L(()=>new ve,o=>o.reset());class ve{constructor(){this.next=this.g=this.h=null}set(u,d){this.h=u,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let ae,Te=!1,je=new Oe,xt=()=>{const o=c.Promise.resolve(void 0);ae=()=>{o.then(D)}};var D=()=>{for(var o;o=E();){try{o.h.call(o.g)}catch(d){b(d)}var u=We;u.j(o),100>u.h&&(u.h++,o.next=u.g,u.g=o)}Te=!1};function F(){this.s=this.s,this.C=this.C}F.prototype.s=!1,F.prototype.ma=function(){this.s||(this.s=!0,this.N())},F.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function P(o,u){this.type=o,this.g=this.target=u,this.defaultPrevented=!1}P.prototype.h=function(){this.defaultPrevented=!0};var Z=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var o=!1,u=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const d=()=>{};c.addEventListener("test",d,u),c.removeEventListener("test",d,u)}catch{}return o}();function W(o,u){if(P.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var d=this.type=o.type,g=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=u,u=o.relatedTarget){if(oe){e:{try{z(u.nodeName);var C=!0;break e}catch{}C=!1}C||(u=null)}}else d=="mouseover"?u=o.fromElement:d=="mouseout"&&(u=o.toElement);this.relatedTarget=u,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:ie[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&W.aa.h.call(this)}}R(W,P);var ie={2:"touch",3:"pen",4:"mouse"};W.prototype.h=function(){W.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var be="closure_listenable_"+(1e6*Math.random()|0),Ie=0;function he(o,u,d,g,C){this.listener=o,this.proxy=null,this.src=u,this.type=d,this.capture=!!g,this.ha=C,this.key=++Ie,this.da=this.fa=!1}function Me(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Ne(o){this.src=o,this.g={},this.h=0}Ne.prototype.add=function(o,u,d,g,C){var x=o.toString();o=this.g[x],o||(o=this.g[x]=[],this.h++);var Q=A(o,u,g,C);return-1<Q?(u=o[Q],d||(u.fa=!1)):(u=new he(u,this.src,x,!!g,C),u.fa=d,o.push(u)),u};function T(o,u){var d=u.type;if(d in o.g){var g=o.g[d],C=Array.prototype.indexOf.call(g,u,void 0),x;(x=0<=C)&&Array.prototype.splice.call(g,C,1),x&&(Me(u),o.g[d].length==0&&(delete o.g[d],o.h--))}}function A(o,u,d,g){for(var C=0;C<o.length;++C){var x=o[C];if(!x.da&&x.listener==u&&x.capture==!!d&&x.ha==g)return C}return-1}var V="closure_lm_"+(1e6*Math.random()|0),B={};function U(o,u,d,g,C){if(Array.isArray(u)){for(var x=0;x<u.length;x++)U(o,u[x],d,g,C);return null}return d=me(d),o&&o[be]?o.K(u,d,h(g)?!!g.capture:!1,C):$(o,u,d,!1,g,C)}function $(o,u,d,g,C,x){if(!u)throw Error("Invalid event type");var Q=h(C)?!!C.capture:!!C,Ue=X(o);if(Ue||(o[V]=Ue=new Ne(o)),d=Ue.add(u,d,g,Q,x),d.proxy)return d;if(g=J(),d.proxy=g,g.src=o,g.listener=d,o.addEventListener)Z||(C=Q),C===void 0&&(C=!1),o.addEventListener(u.toString(),g,C);else if(o.attachEvent)o.attachEvent(j(u.toString()),g);else if(o.addListener&&o.removeListener)o.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return d}function J(){function o(d){return u.call(o.src,o.listener,d)}const u=le;return o}function K(o,u,d,g,C){if(Array.isArray(u))for(var x=0;x<u.length;x++)K(o,u[x],d,g,C);else g=h(g)?!!g.capture:!!g,d=me(d),o&&o[be]?(o=o.i,u=String(u).toString(),u in o.g&&(x=o.g[u],d=A(x,d,g,C),-1<d&&(Me(x[d]),Array.prototype.splice.call(x,d,1),x.length==0&&(delete o.g[u],o.h--)))):o&&(o=X(o))&&(u=o.g[u.toString()],o=-1,u&&(o=A(u,d,g,C)),(d=-1<o?u[o]:null)&&G(d))}function G(o){if(typeof o!="number"&&o&&!o.da){var u=o.src;if(u&&u[be])T(u.i,o);else{var d=o.type,g=o.proxy;u.removeEventListener?u.removeEventListener(d,g,o.capture):u.detachEvent?u.detachEvent(j(d),g):u.addListener&&u.removeListener&&u.removeListener(g),(d=X(u))?(T(d,o),d.h==0&&(d.src=null,u[V]=null)):Me(o)}}}function j(o){return o in B?B[o]:B[o]="on"+o}function le(o,u){if(o.da)o=!0;else{u=new W(u,this);var d=o.listener,g=o.ha||o.src;o.fa&&G(o),o=d.call(g,u)}return o}function X(o){return o=o[V],o instanceof Ne?o:null}var ce="__closure_events_fn_"+(1e9*Math.random()>>>0);function me(o){return typeof o=="function"?o:(o[ce]||(o[ce]=function(u){return o.handleEvent(u)}),o[ce])}function de(){F.call(this),this.i=new Ne(this),this.M=this,this.F=null}R(de,F),de.prototype[be]=!0,de.prototype.removeEventListener=function(o,u,d,g){K(this,o,u,d,g)};function we(o,u){var d,g=o.F;if(g)for(d=[];g;g=g.F)d.push(g);if(o=o.M,g=u.type||u,typeof u=="string")u=new P(u,o);else if(u instanceof P)u.target=u.target||o;else{var C=u;u=new P(g,o),v(u,C)}if(C=!0,d)for(var x=d.length-1;0<=x;x--){var Q=u.g=d[x];C=ke(Q,g,!0,u)&&C}if(Q=u.g=o,C=ke(Q,g,!0,u)&&C,C=ke(Q,g,!1,u)&&C,d)for(x=0;x<d.length;x++)Q=u.g=d[x],C=ke(Q,g,!1,u)&&C}de.prototype.N=function(){if(de.aa.N.call(this),this.i){var o=this.i,u;for(u in o.g){for(var d=o.g[u],g=0;g<d.length;g++)Me(d[g]);delete o.g[u],o.h--}}this.F=null},de.prototype.K=function(o,u,d,g){return this.i.add(String(o),u,!1,d,g)},de.prototype.L=function(o,u,d,g){return this.i.add(String(o),u,!0,d,g)};function ke(o,u,d,g){if(u=o.i.g[String(u)],!u)return!0;u=u.concat();for(var C=!0,x=0;x<u.length;++x){var Q=u[x];if(Q&&!Q.da&&Q.capture==d){var Ue=Q.listener,ft=Q.ha||Q.src;Q.fa&&T(o.i,Q),C=Ue.call(ft,g)!==!1&&C}}return C&&!g.defaultPrevented}function ut(o,u,d){if(typeof o=="function")d&&(o=y(o,d));else if(o&&typeof o.handleEvent=="function")o=y(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:c.setTimeout(o,u||0)}function ht(o){o.g=ut(()=>{o.g=null,o.i&&(o.i=!1,ht(o))},o.l);const u=o.h;o.h=null,o.m.apply(null,u)}class Ut extends F{constructor(u,d){super(),this.m=u,this.l=d,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:ht(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function vt(o){F.call(this),this.h=o,this.g={}}R(vt,F);var $n=[];function Rs(o){_e(o.g,function(u,d){this.g.hasOwnProperty(d)&&G(u)},o),o.g={}}vt.prototype.N=function(){vt.aa.N.call(this),Rs(this)},vt.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var dt=c.JSON.stringify,$t=c.JSON.parse,$i=class{stringify(o){return c.JSON.stringify(o,void 0)}parse(o){return c.JSON.parse(o,void 0)}};function jr(){}jr.prototype.h=null;function pu(o){return o.h||(o.h=o.i())}function mu(){}var Ps={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Na(){P.call(this,"d")}R(Na,P);function xa(){P.call(this,"c")}R(xa,P);var yr={},gu=null;function Bi(){return gu=gu||new de}yr.La="serverreachability";function _u(o){P.call(this,yr.La,o)}R(_u,P);function ks(o){const u=Bi();we(u,new _u(u))}yr.STAT_EVENT="statevent";function yu(o,u){P.call(this,yr.STAT_EVENT,o),this.stat=u}R(yu,P);function Rt(o){const u=Bi();we(u,new yu(u,o))}yr.Ma="timingevent";function vu(o,u){P.call(this,yr.Ma,o),this.size=u}R(vu,P);function Ds(o,u){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){o()},u)}function Ns(){this.g=!0}Ns.prototype.xa=function(){this.g=!1};function o_(o,u,d,g,C,x){o.info(function(){if(o.g)if(x)for(var Q="",Ue=x.split("&"),ft=0;ft<Ue.length;ft++){var xe=Ue[ft].split("=");if(1<xe.length){var Tt=xe[0];xe=xe[1];var Et=Tt.split("_");Q=2<=Et.length&&Et[1]=="type"?Q+(Tt+"="+xe+"&"):Q+(Tt+"=redacted&")}}else Q=null;else Q=x;return"XMLHTTP REQ ("+g+") [attempt "+C+"]: "+u+`
`+d+`
`+Q})}function a_(o,u,d,g,C,x,Q){o.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+C+"]: "+u+`
`+d+`
`+x+" "+Q})}function qr(o,u,d,g){o.info(function(){return"XMLHTTP TEXT ("+u+"): "+l_(o,d)+(g?" "+g:"")})}function c_(o,u){o.info(function(){return"TIMEOUT: "+u})}Ns.prototype.info=function(){};function l_(o,u){if(!o.g)return u;if(!u)return null;try{var d=JSON.parse(u);if(d){for(o=0;o<d.length;o++)if(Array.isArray(d[o])){var g=d[o];if(!(2>g.length)){var C=g[1];if(Array.isArray(C)&&!(1>C.length)){var x=C[0];if(x!="noop"&&x!="stop"&&x!="close")for(var Q=1;Q<C.length;Q++)C[Q]=""}}}}return dt(d)}catch{return u}}var ji={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Tu={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Va;function qi(){}R(qi,jr),qi.prototype.g=function(){return new XMLHttpRequest},qi.prototype.i=function(){return{}},Va=new qi;function Bn(o,u,d,g){this.j=o,this.i=u,this.l=d,this.R=g||1,this.U=new vt(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Eu}function Eu(){this.i=null,this.g="",this.h=!1}var Iu={},Oa={};function Ma(o,u,d){o.L=1,o.v=Gi(gn(u)),o.m=d,o.P=!0,wu(o,null)}function wu(o,u){o.F=Date.now(),Hi(o),o.A=gn(o.v);var d=o.A,g=o.R;Array.isArray(g)||(g=[String(g)]),Lu(d.i,"t",g),o.C=0,d=o.j.J,o.h=new Eu,o.g=th(o.j,d?u:null,!o.m),0<o.O&&(o.M=new Ut(y(o.Y,o,o.g),o.O)),u=o.U,d=o.g,g=o.ca;var C="readystatechange";Array.isArray(C)||(C&&($n[0]=C.toString()),C=$n);for(var x=0;x<C.length;x++){var Q=U(d,C[x],g||u.handleEvent,!1,u.h||u);if(!Q)break;u.g[Q.key]=Q}u=o.H?_(o.H):{},o.m?(o.u||(o.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,u)):(o.u="GET",o.g.ea(o.A,o.u,null,u)),ks(),o_(o.i,o.u,o.A,o.l,o.R,o.m)}Bn.prototype.ca=function(o){o=o.target;const u=this.M;u&&_n(o)==3?u.j():this.Y(o)},Bn.prototype.Y=function(o){try{if(o==this.g)e:{const Et=_n(this.g);var u=this.g.Ba();const zr=this.g.Z();if(!(3>Et)&&(Et!=3||this.g&&(this.h.h||this.g.oa()||Hu(this.g)))){this.J||Et!=4||u==7||(u==8||0>=zr?ks(3):ks(2)),La(this);var d=this.g.Z();this.X=d;t:if(Au(this)){var g=Hu(this.g);o="";var C=g.length,x=_n(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){vr(this),xs(this);var Q="";break t}this.h.i=new c.TextDecoder}for(u=0;u<C;u++)this.h.h=!0,o+=this.h.i.decode(g[u],{stream:!(x&&u==C-1)});g.length=0,this.h.g+=o,this.C=0,Q=this.h.g}else Q=this.g.oa();if(this.o=d==200,a_(this.i,this.u,this.A,this.l,this.R,Et,d),this.o){if(this.T&&!this.K){t:{if(this.g){var Ue,ft=this.g;if((Ue=ft.g?ft.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!q(Ue)){var xe=Ue;break t}}xe=null}if(d=xe)qr(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Fa(this,d);else{this.o=!1,this.s=3,Rt(12),vr(this),xs(this);break e}}if(this.P){d=!0;let Gt;for(;!this.J&&this.C<Q.length;)if(Gt=u_(this,Q),Gt==Oa){Et==4&&(this.s=4,Rt(14),d=!1),qr(this.i,this.l,null,"[Incomplete Response]");break}else if(Gt==Iu){this.s=4,Rt(15),qr(this.i,this.l,Q,"[Invalid Chunk]"),d=!1;break}else qr(this.i,this.l,Gt,null),Fa(this,Gt);if(Au(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Et!=4||Q.length!=0||this.h.h||(this.s=1,Rt(16),d=!1),this.o=this.o&&d,!d)qr(this.i,this.l,Q,"[Invalid Chunked Response]"),vr(this),xs(this);else if(0<Q.length&&!this.W){this.W=!0;var Tt=this.j;Tt.g==this&&Tt.ba&&!Tt.M&&(Tt.j.info("Great, no buffering proxy detected. Bytes received: "+Q.length),Ha(Tt),Tt.M=!0,Rt(11))}}else qr(this.i,this.l,Q,null),Fa(this,Q);Et==4&&vr(this),this.o&&!this.J&&(Et==4?Ju(this.j,this):(this.o=!1,Hi(this)))}else C_(this.g),d==400&&0<Q.indexOf("Unknown SID")?(this.s=3,Rt(12)):(this.s=0,Rt(13)),vr(this),xs(this)}}}catch{}finally{}};function Au(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function u_(o,u){var d=o.C,g=u.indexOf(`
`,d);return g==-1?Oa:(d=Number(u.substring(d,g)),isNaN(d)?Iu:(g+=1,g+d>u.length?Oa:(u=u.slice(g,g+d),o.C=g+d,u)))}Bn.prototype.cancel=function(){this.J=!0,vr(this)};function Hi(o){o.S=Date.now()+o.I,Su(o,o.I)}function Su(o,u){if(o.B!=null)throw Error("WatchDog timer not null");o.B=Ds(y(o.ba,o),u)}function La(o){o.B&&(c.clearTimeout(o.B),o.B=null)}Bn.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(c_(this.i,this.A),this.L!=2&&(ks(),Rt(17)),vr(this),this.s=2,xs(this)):Su(this,this.S-o)};function xs(o){o.j.G==0||o.J||Ju(o.j,o)}function vr(o){La(o);var u=o.M;u&&typeof u.ma=="function"&&u.ma(),o.M=null,Rs(o.U),o.g&&(u=o.g,o.g=null,u.abort(),u.ma())}function Fa(o,u){try{var d=o.j;if(d.G!=0&&(d.g==o||Ua(d.h,o))){if(!o.K&&Ua(d.h,o)&&d.G==3){try{var g=d.Da.g.parse(u)}catch{g=null}if(Array.isArray(g)&&g.length==3){var C=g;if(C[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<o.F)Zi(d),Ji(d);else break e;qa(d),Rt(18)}}else d.za=C[1],0<d.za-d.T&&37500>C[2]&&d.F&&d.v==0&&!d.C&&(d.C=Ds(y(d.Za,d),6e3));if(1>=Ru(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else Er(d,11)}else if((o.K||d.g==o)&&Zi(d),!q(u))for(C=d.Da.g.parse(u),u=0;u<C.length;u++){let xe=C[u];if(d.T=xe[0],xe=xe[1],d.G==2)if(xe[0]=="c"){d.K=xe[1],d.ia=xe[2];const Tt=xe[3];Tt!=null&&(d.la=Tt,d.j.info("VER="+d.la));const Et=xe[4];Et!=null&&(d.Aa=Et,d.j.info("SVER="+d.Aa));const zr=xe[5];zr!=null&&typeof zr=="number"&&0<zr&&(g=1.5*zr,d.L=g,d.j.info("backChannelRequestTimeoutMs_="+g)),g=d;const Gt=o.g;if(Gt){const to=Gt.g?Gt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(to){var x=g.h;x.g||to.indexOf("spdy")==-1&&to.indexOf("quic")==-1&&to.indexOf("h2")==-1||(x.j=x.l,x.g=new Set,x.h&&($a(x,x.h),x.h=null))}if(g.D){const Wa=Gt.g?Gt.g.getResponseHeader("X-HTTP-Session-Id"):null;Wa&&(g.ya=Wa,ze(g.I,g.D,Wa))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-o.F,d.j.info("Handshake RTT: "+d.R+"ms")),g=d;var Q=o;if(g.qa=eh(g,g.J?g.ia:null,g.W),Q.K){Pu(g.h,Q);var Ue=Q,ft=g.L;ft&&(Ue.I=ft),Ue.B&&(La(Ue),Hi(Ue)),g.g=Q}else Qu(g);0<d.i.length&&Yi(d)}else xe[0]!="stop"&&xe[0]!="close"||Er(d,7);else d.G==3&&(xe[0]=="stop"||xe[0]=="close"?xe[0]=="stop"?Er(d,7):ja(d):xe[0]!="noop"&&d.l&&d.l.ta(xe),d.v=0)}}ks(4)}catch{}}var h_=class{constructor(o,u){this.g=o,this.map=u}};function bu(o){this.l=o||10,c.PerformanceNavigationTiming?(o=c.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Cu(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Ru(o){return o.h?1:o.g?o.g.size:0}function Ua(o,u){return o.h?o.h==u:o.g?o.g.has(u):!1}function $a(o,u){o.g?o.g.add(u):o.h=u}function Pu(o,u){o.h&&o.h==u?o.h=null:o.g&&o.g.has(u)&&o.g.delete(u)}bu.prototype.cancel=function(){if(this.i=ku(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function ku(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let u=o.i;for(const d of o.g.values())u=u.concat(d.D);return u}return N(o.i)}function d_(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(l(o)){for(var u=[],d=o.length,g=0;g<d;g++)u.push(o[g]);return u}u=[],d=0;for(g in o)u[d++]=o[g];return u}function f_(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(l(o)||typeof o=="string"){var u=[];o=o.length;for(var d=0;d<o;d++)u.push(d);return u}u=[],d=0;for(const g in o)u[d++]=g;return u}}}function Du(o,u){if(o.forEach&&typeof o.forEach=="function")o.forEach(u,void 0);else if(l(o)||typeof o=="string")Array.prototype.forEach.call(o,u,void 0);else for(var d=f_(o),g=d_(o),C=g.length,x=0;x<C;x++)u.call(void 0,g[x],d&&d[x],o)}var Nu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function p_(o,u){if(o){o=o.split("&");for(var d=0;d<o.length;d++){var g=o[d].indexOf("="),C=null;if(0<=g){var x=o[d].substring(0,g);C=o[d].substring(g+1)}else x=o[d];u(x,C?decodeURIComponent(C.replace(/\+/g," ")):"")}}}function Tr(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof Tr){this.h=o.h,Wi(this,o.j),this.o=o.o,this.g=o.g,zi(this,o.s),this.l=o.l;var u=o.i,d=new Ms;d.i=u.i,u.g&&(d.g=new Map(u.g),d.h=u.h),xu(this,d),this.m=o.m}else o&&(u=String(o).match(Nu))?(this.h=!1,Wi(this,u[1]||"",!0),this.o=Vs(u[2]||""),this.g=Vs(u[3]||"",!0),zi(this,u[4]),this.l=Vs(u[5]||"",!0),xu(this,u[6]||"",!0),this.m=Vs(u[7]||"")):(this.h=!1,this.i=new Ms(null,this.h))}Tr.prototype.toString=function(){var o=[],u=this.j;u&&o.push(Os(u,Vu,!0),":");var d=this.g;return(d||u=="file")&&(o.push("//"),(u=this.o)&&o.push(Os(u,Vu,!0),"@"),o.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&o.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&o.push("/"),o.push(Os(d,d.charAt(0)=="/"?__:g_,!0))),(d=this.i.toString())&&o.push("?",d),(d=this.m)&&o.push("#",Os(d,v_)),o.join("")};function gn(o){return new Tr(o)}function Wi(o,u,d){o.j=d?Vs(u,!0):u,o.j&&(o.j=o.j.replace(/:$/,""))}function zi(o,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);o.s=u}else o.s=null}function xu(o,u,d){u instanceof Ms?(o.i=u,T_(o.i,o.h)):(d||(u=Os(u,y_)),o.i=new Ms(u,o.h))}function ze(o,u,d){o.i.set(u,d)}function Gi(o){return ze(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function Vs(o,u){return o?u?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Os(o,u,d){return typeof o=="string"?(o=encodeURI(o).replace(u,m_),d&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function m_(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Vu=/[#\/\?@]/g,g_=/[#\?:]/g,__=/[#\?]/g,y_=/[#\?@]/g,v_=/#/g;function Ms(o,u){this.h=this.g=null,this.i=o||null,this.j=!!u}function jn(o){o.g||(o.g=new Map,o.h=0,o.i&&p_(o.i,function(u,d){o.add(decodeURIComponent(u.replace(/\+/g," ")),d)}))}t=Ms.prototype,t.add=function(o,u){jn(this),this.i=null,o=Hr(this,o);var d=this.g.get(o);return d||this.g.set(o,d=[]),d.push(u),this.h+=1,this};function Ou(o,u){jn(o),u=Hr(o,u),o.g.has(u)&&(o.i=null,o.h-=o.g.get(u).length,o.g.delete(u))}function Mu(o,u){return jn(o),u=Hr(o,u),o.g.has(u)}t.forEach=function(o,u){jn(this),this.g.forEach(function(d,g){d.forEach(function(C){o.call(u,C,g,this)},this)},this)},t.na=function(){jn(this);const o=Array.from(this.g.values()),u=Array.from(this.g.keys()),d=[];for(let g=0;g<u.length;g++){const C=o[g];for(let x=0;x<C.length;x++)d.push(u[g])}return d},t.V=function(o){jn(this);let u=[];if(typeof o=="string")Mu(this,o)&&(u=u.concat(this.g.get(Hr(this,o))));else{o=Array.from(this.g.values());for(let d=0;d<o.length;d++)u=u.concat(o[d])}return u},t.set=function(o,u){return jn(this),this.i=null,o=Hr(this,o),Mu(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[u]),this.h+=1,this},t.get=function(o,u){return o?(o=this.V(o),0<o.length?String(o[0]):u):u};function Lu(o,u,d){Ou(o,u),0<d.length&&(o.i=null,o.g.set(Hr(o,u),N(d)),o.h+=d.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],u=Array.from(this.g.keys());for(var d=0;d<u.length;d++){var g=u[d];const x=encodeURIComponent(String(g)),Q=this.V(g);for(g=0;g<Q.length;g++){var C=x;Q[g]!==""&&(C+="="+encodeURIComponent(String(Q[g]))),o.push(C)}}return this.i=o.join("&")};function Hr(o,u){return u=String(u),o.j&&(u=u.toLowerCase()),u}function T_(o,u){u&&!o.j&&(jn(o),o.i=null,o.g.forEach(function(d,g){var C=g.toLowerCase();g!=C&&(Ou(this,g),Lu(this,C,d))},o)),o.j=u}function E_(o,u){const d=new Ns;if(c.Image){const g=new Image;g.onload=S(qn,d,"TestLoadImage: loaded",!0,u,g),g.onerror=S(qn,d,"TestLoadImage: error",!1,u,g),g.onabort=S(qn,d,"TestLoadImage: abort",!1,u,g),g.ontimeout=S(qn,d,"TestLoadImage: timeout",!1,u,g),c.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=o}else u(!1)}function I_(o,u){const d=new Ns,g=new AbortController,C=setTimeout(()=>{g.abort(),qn(d,"TestPingServer: timeout",!1,u)},1e4);fetch(o,{signal:g.signal}).then(x=>{clearTimeout(C),x.ok?qn(d,"TestPingServer: ok",!0,u):qn(d,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(C),qn(d,"TestPingServer: error",!1,u)})}function qn(o,u,d,g,C){try{C&&(C.onload=null,C.onerror=null,C.onabort=null,C.ontimeout=null),g(d)}catch{}}function w_(){this.g=new $i}function A_(o,u,d){const g=d||"";try{Du(o,function(C,x){let Q=C;h(C)&&(Q=dt(C)),u.push(g+x+"="+encodeURIComponent(Q))})}catch(C){throw u.push(g+"type="+encodeURIComponent("_badmap")),C}}function Ki(o){this.l=o.Ub||null,this.j=o.eb||!1}R(Ki,jr),Ki.prototype.g=function(){return new Qi(this.l,this.j)},Ki.prototype.i=function(o){return function(){return o}}({});function Qi(o,u){de.call(this),this.D=o,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}R(Qi,de),t=Qi.prototype,t.open=function(o,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=u,this.readyState=1,Fs(this)},t.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(u.body=o),(this.D||c).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Ls(this)),this.readyState=0},t.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Fs(this)),this.g&&(this.readyState=3,Fs(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Fu(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function Fu(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}t.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var u=o.value?o.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!o.done}))&&(this.response=this.responseText+=u)}o.done?Ls(this):Fs(this),this.readyState==3&&Fu(this)}},t.Ra=function(o){this.g&&(this.response=this.responseText=o,Ls(this))},t.Qa=function(o){this.g&&(this.response=o,Ls(this))},t.ga=function(){this.g&&Ls(this)};function Ls(o){o.readyState=4,o.l=null,o.j=null,o.v=null,Fs(o)}t.setRequestHeader=function(o,u){this.u.append(o,u)},t.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],u=this.h.entries();for(var d=u.next();!d.done;)d=d.value,o.push(d[0]+": "+d[1]),d=u.next();return o.join(`\r
`)};function Fs(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(Qi.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Uu(o){let u="";return _e(o,function(d,g){u+=g,u+=":",u+=d,u+=`\r
`}),u}function Ba(o,u,d){e:{for(g in d){var g=!1;break e}g=!0}g||(d=Uu(d),typeof o=="string"?d!=null&&encodeURIComponent(String(d)):ze(o,u,d))}function Je(o){de.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}R(Je,de);var S_=/^https?$/i,b_=["POST","PUT"];t=Je.prototype,t.Ha=function(o){this.J=o},t.ea=function(o,u,d,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);u=u?u.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Va.g(),this.v=this.o?pu(this.o):pu(Va),this.g.onreadystatechange=y(this.Ea,this);try{this.B=!0,this.g.open(u,String(o),!0),this.B=!1}catch(x){$u(this,x);return}if(o=d||"",d=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var C in g)d.set(C,g[C]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const x of g.keys())d.set(x,g.get(x));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(d.keys()).find(x=>x.toLowerCase()=="content-type"),C=c.FormData&&o instanceof c.FormData,!(0<=Array.prototype.indexOf.call(b_,u,void 0))||g||C||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[x,Q]of d)this.g.setRequestHeader(x,Q);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{qu(this),this.u=!0,this.g.send(o),this.u=!1}catch(x){$u(this,x)}};function $u(o,u){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=u,o.m=5,Bu(o),Xi(o)}function Bu(o){o.A||(o.A=!0,we(o,"complete"),we(o,"error"))}t.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,we(this,"complete"),we(this,"abort"),Xi(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Xi(this,!0)),Je.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?ju(this):this.bb())},t.bb=function(){ju(this)};function ju(o){if(o.h&&typeof a<"u"&&(!o.v[1]||_n(o)!=4||o.Z()!=2)){if(o.u&&_n(o)==4)ut(o.Ea,0,o);else if(we(o,"readystatechange"),_n(o)==4){o.h=!1;try{const Q=o.Z();e:switch(Q){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var d;if(!(d=u)){var g;if(g=Q===0){var C=String(o.D).match(Nu)[1]||null;!C&&c.self&&c.self.location&&(C=c.self.location.protocol.slice(0,-1)),g=!S_.test(C?C.toLowerCase():"")}d=g}if(d)we(o,"complete"),we(o,"success");else{o.m=6;try{var x=2<_n(o)?o.g.statusText:""}catch{x=""}o.l=x+" ["+o.Z()+"]",Bu(o)}}finally{Xi(o)}}}}function Xi(o,u){if(o.g){qu(o);const d=o.g,g=o.v[0]?()=>{}:null;o.g=null,o.v=null,u||we(o,"ready");try{d.onreadystatechange=g}catch{}}}function qu(o){o.I&&(c.clearTimeout(o.I),o.I=null)}t.isActive=function(){return!!this.g};function _n(o){return o.g?o.g.readyState:0}t.Z=function(){try{return 2<_n(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(o){if(this.g){var u=this.g.responseText;return o&&u.indexOf(o)==0&&(u=u.substring(o.length)),$t(u)}};function Hu(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function C_(o){const u={};o=(o.g&&2<=_n(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<o.length;g++){if(q(o[g]))continue;var d=I(o[g]);const C=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const x=u[C]||[];u[C]=x,x.push(d)}w(u,function(g){return g.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Us(o,u,d){return d&&d.internalChannelParams&&d.internalChannelParams[o]||u}function Wu(o){this.Aa=0,this.i=[],this.j=new Ns,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Us("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Us("baseRetryDelayMs",5e3,o),this.cb=Us("retryDelaySeedMs",1e4,o),this.Wa=Us("forwardChannelMaxRetries",2,o),this.wa=Us("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new bu(o&&o.concurrentRequestLimit),this.Da=new w_,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=Wu.prototype,t.la=8,t.G=1,t.connect=function(o,u,d,g){Rt(0),this.W=o,this.H=u||{},d&&g!==void 0&&(this.H.OSID=d,this.H.OAID=g),this.F=this.X,this.I=eh(this,null,this.W),Yi(this)};function ja(o){if(zu(o),o.G==3){var u=o.U++,d=gn(o.I);if(ze(d,"SID",o.K),ze(d,"RID",u),ze(d,"TYPE","terminate"),$s(o,d),u=new Bn(o,o.j,u),u.L=2,u.v=Gi(gn(d)),d=!1,c.navigator&&c.navigator.sendBeacon)try{d=c.navigator.sendBeacon(u.v.toString(),"")}catch{}!d&&c.Image&&(new Image().src=u.v,d=!0),d||(u.g=th(u.j,null),u.g.ea(u.v)),u.F=Date.now(),Hi(u)}Zu(o)}function Ji(o){o.g&&(Ha(o),o.g.cancel(),o.g=null)}function zu(o){Ji(o),o.u&&(c.clearTimeout(o.u),o.u=null),Zi(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&c.clearTimeout(o.s),o.s=null)}function Yi(o){if(!Cu(o.h)&&!o.s){o.s=!0;var u=o.Ga;ae||xt(),Te||(ae(),Te=!0),je.add(u,o),o.B=0}}function R_(o,u){return Ru(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=u.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=Ds(y(o.Ga,o,u),Yu(o,o.B)),o.B++,!0)}t.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const C=new Bn(this,this.j,o);let x=this.o;if(this.S&&(x?(x=_(x),v(x,this.S)):x=this.S),this.m!==null||this.O||(C.H=x,x=null),this.P)e:{for(var u=0,d=0;d<this.i.length;d++){t:{var g=this.i[d];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break t}g=void 0}if(g===void 0)break;if(u+=g,4096<u){u=d;break e}if(u===4096||d===this.i.length-1){u=d+1;break e}}u=1e3}else u=1e3;u=Ku(this,C,u),d=gn(this.I),ze(d,"RID",o),ze(d,"CVER",22),this.D&&ze(d,"X-HTTP-Session-Id",this.D),$s(this,d),x&&(this.O?u="headers="+encodeURIComponent(String(Uu(x)))+"&"+u:this.m&&Ba(d,this.m,x)),$a(this.h,C),this.Ua&&ze(d,"TYPE","init"),this.P?(ze(d,"$req",u),ze(d,"SID","null"),C.T=!0,Ma(C,d,null)):Ma(C,d,u),this.G=2}}else this.G==3&&(o?Gu(this,o):this.i.length==0||Cu(this.h)||Gu(this))};function Gu(o,u){var d;u?d=u.l:d=o.U++;const g=gn(o.I);ze(g,"SID",o.K),ze(g,"RID",d),ze(g,"AID",o.T),$s(o,g),o.m&&o.o&&Ba(g,o.m,o.o),d=new Bn(o,o.j,d,o.B+1),o.m===null&&(d.H=o.o),u&&(o.i=u.D.concat(o.i)),u=Ku(o,d,1e3),d.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),$a(o.h,d),Ma(d,g,u)}function $s(o,u){o.H&&_e(o.H,function(d,g){ze(u,g,d)}),o.l&&Du({},function(d,g){ze(u,g,d)})}function Ku(o,u,d){d=Math.min(o.i.length,d);var g=o.l?y(o.l.Na,o.l,o):null;e:{var C=o.i;let x=-1;for(;;){const Q=["count="+d];x==-1?0<d?(x=C[0].g,Q.push("ofs="+x)):x=0:Q.push("ofs="+x);let Ue=!0;for(let ft=0;ft<d;ft++){let xe=C[ft].g;const Tt=C[ft].map;if(xe-=x,0>xe)x=Math.max(0,C[ft].g-100),Ue=!1;else try{A_(Tt,Q,"req"+xe+"_")}catch{g&&g(Tt)}}if(Ue){g=Q.join("&");break e}}}return o=o.i.splice(0,d),u.D=o,g}function Qu(o){if(!o.g&&!o.u){o.Y=1;var u=o.Fa;ae||xt(),Te||(ae(),Te=!0),je.add(u,o),o.v=0}}function qa(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=Ds(y(o.Fa,o),Yu(o,o.v)),o.v++,!0)}t.Fa=function(){if(this.u=null,Xu(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=Ds(y(this.ab,this),o)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Rt(10),Ji(this),Xu(this))};function Ha(o){o.A!=null&&(c.clearTimeout(o.A),o.A=null)}function Xu(o){o.g=new Bn(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var u=gn(o.qa);ze(u,"RID","rpc"),ze(u,"SID",o.K),ze(u,"AID",o.T),ze(u,"CI",o.F?"0":"1"),!o.F&&o.ja&&ze(u,"TO",o.ja),ze(u,"TYPE","xmlhttp"),$s(o,u),o.m&&o.o&&Ba(u,o.m,o.o),o.L&&(o.g.I=o.L);var d=o.g;o=o.ia,d.L=1,d.v=Gi(gn(u)),d.m=null,d.P=!0,wu(d,o)}t.Za=function(){this.C!=null&&(this.C=null,Ji(this),qa(this),Rt(19))};function Zi(o){o.C!=null&&(c.clearTimeout(o.C),o.C=null)}function Ju(o,u){var d=null;if(o.g==u){Zi(o),Ha(o),o.g=null;var g=2}else if(Ua(o.h,u))d=u.D,Pu(o.h,u),g=1;else return;if(o.G!=0){if(u.o)if(g==1){d=u.m?u.m.length:0,u=Date.now()-u.F;var C=o.B;g=Bi(),we(g,new vu(g,d)),Yi(o)}else Qu(o);else if(C=u.s,C==3||C==0&&0<u.X||!(g==1&&R_(o,u)||g==2&&qa(o)))switch(d&&0<d.length&&(u=o.h,u.i=u.i.concat(d)),C){case 1:Er(o,5);break;case 4:Er(o,10);break;case 3:Er(o,6);break;default:Er(o,2)}}}function Yu(o,u){let d=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(d*=2),d*u}function Er(o,u){if(o.j.info("Error code "+u),u==2){var d=y(o.fb,o),g=o.Xa;const C=!g;g=new Tr(g||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||Wi(g,"https"),Gi(g),C?E_(g.toString(),d):I_(g.toString(),d)}else Rt(2);o.G=0,o.l&&o.l.sa(u),Zu(o),zu(o)}t.fb=function(o){o?(this.j.info("Successfully pinged google.com"),Rt(2)):(this.j.info("Failed to ping google.com"),Rt(1))};function Zu(o){if(o.G=0,o.ka=[],o.l){const u=ku(o.h);(u.length!=0||o.i.length!=0)&&(k(o.ka,u),k(o.ka,o.i),o.h.i.length=0,N(o.i),o.i.length=0),o.l.ra()}}function eh(o,u,d){var g=d instanceof Tr?gn(d):new Tr(d);if(g.g!="")u&&(g.g=u+"."+g.g),zi(g,g.s);else{var C=c.location;g=C.protocol,u=u?u+"."+C.hostname:C.hostname,C=+C.port;var x=new Tr(null);g&&Wi(x,g),u&&(x.g=u),C&&zi(x,C),d&&(x.l=d),g=x}return d=o.D,u=o.ya,d&&u&&ze(g,d,u),ze(g,"VER",o.la),$s(o,g),g}function th(o,u,d){if(u&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=o.Ca&&!o.pa?new Je(new Ki({eb:d})):new Je(o.pa),u.Ha(o.J),u}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function nh(){}t=nh.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function eo(){}eo.prototype.g=function(o,u){return new Mt(o,u)};function Mt(o,u){de.call(this),this.g=new Wu(u),this.l=o,this.h=u&&u.messageUrlParams||null,o=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(o?o["X-WebChannel-Content-Type"]=u.messageContentType:o={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(o?o["X-WebChannel-Client-Profile"]=u.va:o={"X-WebChannel-Client-Profile":u.va}),this.g.S=o,(o=u&&u.Sb)&&!q(o)&&(this.g.m=o),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!q(u)&&(this.g.D=u,o=this.h,o!==null&&u in o&&(o=this.h,u in o&&delete o[u])),this.j=new Wr(this)}R(Mt,de),Mt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Mt.prototype.close=function(){ja(this.g)},Mt.prototype.o=function(o){var u=this.g;if(typeof o=="string"){var d={};d.__data__=o,o=d}else this.u&&(d={},d.__data__=dt(o),o=d);u.i.push(new h_(u.Ya++,o)),u.G==3&&Yi(u)},Mt.prototype.N=function(){this.g.l=null,delete this.j,ja(this.g),delete this.g,Mt.aa.N.call(this)};function rh(o){Na.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var u=o.__sm__;if(u){e:{for(const d in u){o=d;break e}o=void 0}(this.i=o)&&(o=this.i,u=u!==null&&o in u?u[o]:void 0),this.data=u}else this.data=o}R(rh,Na);function sh(){xa.call(this),this.status=1}R(sh,xa);function Wr(o){this.g=o}R(Wr,nh),Wr.prototype.ua=function(){we(this.g,"a")},Wr.prototype.ta=function(o){we(this.g,new rh(o))},Wr.prototype.sa=function(o){we(this.g,new sh)},Wr.prototype.ra=function(){we(this.g,"b")},eo.prototype.createWebChannel=eo.prototype.g,Mt.prototype.send=Mt.prototype.o,Mt.prototype.open=Mt.prototype.m,Mt.prototype.close=Mt.prototype.close,Xp=function(){return new eo},Qp=function(){return Bi()},Kp=yr,Vc={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},ji.NO_ERROR=0,ji.TIMEOUT=8,ji.HTTP_ERROR=6,yo=ji,Tu.COMPLETE="complete",Gp=Tu,mu.EventType=Ps,Ps.OPEN="a",Ps.CLOSE="b",Ps.ERROR="c",Ps.MESSAGE="d",de.prototype.listen=de.prototype.K,zs=mu,Je.prototype.listenOnce=Je.prototype.L,Je.prototype.getLastError=Je.prototype.Ka,Je.prototype.getLastErrorCode=Je.prototype.Ba,Je.prototype.getStatus=Je.prototype.Z,Je.prototype.getResponseJson=Je.prototype.Oa,Je.prototype.getResponseText=Je.prototype.oa,Je.prototype.send=Je.prototype.ea,Je.prototype.setWithCredentials=Je.prototype.Ha,zp=Je}).apply(typeof io<"u"?io:typeof self<"u"?self:typeof window<"u"?window:{});const td="@firebase/firestore",nd="4.9.0";/**
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
 */let Is="12.0.0";/**
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
 */const Vr=new Tl("@firebase/firestore");function Yr(){return Vr.logLevel}function se(t,...e){if(Vr.logLevel<=Ce.DEBUG){const n=e.map(wl);Vr.debug(`Firestore (${Is}): ${t}`,...n)}}function kn(t,...e){if(Vr.logLevel<=Ce.ERROR){const n=e.map(wl);Vr.error(`Firestore (${Is}): ${t}`,...n)}}function fs(t,...e){if(Vr.logLevel<=Ce.WARN){const n=e.map(wl);Vr.warn(`Firestore (${Is}): ${t}`,...n)}}function wl(t){if(typeof t=="string")return t;try{/**
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
 */function pe(t,e,n){let r="Unexpected state";typeof e=="string"?r=e:n=e,Jp(t,r,n)}function Jp(t,e,n){let r=`FIRESTORE (${Is}) INTERNAL ASSERTION FAILED: ${e} (ID: ${t.toString(16)})`;if(n!==void 0)try{r+=" CONTEXT: "+JSON.stringify(n)}catch{r+=" CONTEXT: "+n}throw kn(r),new Error(r)}function Fe(t,e,n,r){let s="Unexpected state";typeof n=="string"?s=n:r=n,t||Jp(e,s,r)}function Ee(t,e){return t}/**
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
 */const O={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class re extends Ln{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class kr{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
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
 */class Yp{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class lI{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(At.UNAUTHENTICATED))}shutdown(){}}class uI{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class hI{constructor(e){this.t=e,this.currentUser=At.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){Fe(this.o===void 0,42304);let r=this.i;const s=l=>this.i!==r?(r=this.i,n(l)):Promise.resolve();let i=new kr;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new kr,e.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const l=i;e.enqueueRetryable(async()=>{await l.promise,await s(this.currentUser)})},c=l=>{se("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(l=>c(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?c(l):(se("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new kr)}},0),a()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(se("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Fe(typeof r.accessToken=="string",31837,{l:r}),new Yp(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Fe(e===null||typeof e=="string",2055,{h:e}),new At(e)}}class dI{constructor(e,n,r){this.P=e,this.T=n,this.I=r,this.type="FirstParty",this.user=At.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class fI{constructor(e,n,r){this.P=e,this.T=n,this.I=r}getToken(){return Promise.resolve(new dI(this.P,this.T,this.I))}start(e,n){e.enqueueRetryable(()=>n(At.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class rd{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class pI{constructor(e,n){this.V=n,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Ot(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,n){Fe(this.o===void 0,3512);const r=i=>{i.error!=null&&se("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,se("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{se("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):se("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new rd(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(Fe(typeof n.token=="string",44558,{tokenResult:n}),this.m=n.token,new rd(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function mI(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
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
 */class Al{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=mI(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<n&&(r+=e.charAt(s[i]%62))}return r}}function Re(t,e){return t<e?-1:t>e?1:0}function Oc(t,e){const n=Math.min(t.length,e.length);for(let r=0;r<n;r++){const s=t.charAt(r),i=e.charAt(r);if(s!==i)return lc(s)===lc(i)?Re(s,i):lc(s)?1:-1}return Re(t.length,e.length)}const gI=55296,_I=57343;function lc(t){const e=t.charCodeAt(0);return e>=gI&&e<=_I}function ps(t,e,n){return t.length===e.length&&t.every((r,s)=>n(r,e[s]))}/**
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
 */const sd="__name__";class nn{constructor(e,n,r){n===void 0?n=0:n>e.length&&pe(637,{offset:n,range:e.length}),r===void 0?r=e.length-n:r>e.length-n&&pe(1746,{length:r,range:e.length-n}),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return nn.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof nn?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let s=0;s<r;s++){const i=nn.compareSegments(e.get(s),n.get(s));if(i!==0)return i}return Re(e.length,n.length)}static compareSegments(e,n){const r=nn.isNumericId(e),s=nn.isNumericId(n);return r&&!s?-1:!r&&s?1:r&&s?nn.extractNumericId(e).compare(nn.extractNumericId(n)):Oc(e,n)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return rr.fromString(e.substring(4,e.length-2))}}class He extends nn{construct(e,n,r){return new He(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new re(O.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(s=>s.length>0))}return new He(n)}static emptyPath(){return new He([])}}const yI=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class gt extends nn{construct(e,n,r){return new gt(e,n,r)}static isValidIdentifier(e){return yI.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),gt.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===sd}static keyField(){return new gt([sd])}static fromServerFormat(e){const n=[];let r="",s=0;const i=()=>{if(r.length===0)throw new re(O.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let a=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new re(O.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[s+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new re(O.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,s+=2}else c==="`"?(a=!a,s++):c!=="."||a?(r+=c,s++):(i(),s++)}if(i(),a)throw new re(O.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new gt(n)}static emptyPath(){return new gt([])}}/**
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
 */class ue{constructor(e){this.path=e}static fromPath(e){return new ue(He.fromString(e))}static fromName(e){return new ue(He.fromString(e).popFirst(5))}static empty(){return new ue(He.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&He.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return He.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new ue(new He(e.slice()))}}/**
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
 */function Zp(t,e,n){if(!n)throw new re(O.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function vI(t,e,n,r){if(e===!0&&r===!0)throw new re(O.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function id(t){if(!ue.isDocumentKey(t))throw new re(O.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function od(t){if(ue.isDocumentKey(t))throw new re(O.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function em(t){return typeof t=="object"&&t!==null&&(Object.getPrototypeOf(t)===Object.prototype||Object.getPrototypeOf(t)===null)}function ma(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":pe(12329,{type:typeof t})}function is(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new re(O.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=ma(t);throw new re(O.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
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
 */function it(t,e){const n={typeString:t};return e&&(n.value=e),n}function ki(t,e){if(!em(t))throw new re(O.INVALID_ARGUMENT,"JSON must be an object");let n;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in t)){n=`JSON missing required field: '${r}'`;break}const a=t[r];if(s&&typeof a!==s){n=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){n=`Expected '${r}' field to equal '${i.value}'`;break}}if(n)throw new re(O.INVALID_ARGUMENT,n);return!0}/**
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
 */const ad=-62135596800,cd=1e6;class Ge{static now(){return Ge.fromMillis(Date.now())}static fromDate(e){return Ge.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor((e-1e3*n)*cd);return new Ge(n,r)}constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new re(O.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new re(O.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<ad)throw new re(O.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new re(O.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/cd}_compareTo(e){return this.seconds===e.seconds?Re(this.nanoseconds,e.nanoseconds):Re(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Ge._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(ki(e,Ge._jsonSchema))return new Ge(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-ad;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Ge._jsonSchemaVersion="firestore/timestamp/1.0",Ge._jsonSchema={type:it("string",Ge._jsonSchemaVersion),seconds:it("number"),nanoseconds:it("number")};/**
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
 */class ye{static fromTimestamp(e){return new ye(e)}static min(){return new ye(new Ge(0,0))}static max(){return new ye(new Ge(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const _i=-1;function TI(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,s=ye.fromTimestamp(r===1e9?new Ge(n+1,0):new Ge(n,r));return new cr(s,ue.empty(),e)}function EI(t){return new cr(t.readTime,t.key,_i)}class cr{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new cr(ye.min(),ue.empty(),_i)}static max(){return new cr(ye.max(),ue.empty(),_i)}}function II(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=ue.comparator(t.documentKey,e.documentKey),n!==0?n:Re(t.largestBatchId,e.largestBatchId))}/**
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
 */const wI="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class AI{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function ws(t){if(t.code!==O.FAILED_PRECONDITION||t.message!==wI)throw t;se("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class M{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&pe(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new M((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(n,i).next(r,s)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof M?n:M.resolve(n)}catch(n){return M.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):M.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):M.reject(n)}static resolve(e){return new M((n,r)=>{n(e)})}static reject(e){return new M((n,r)=>{r(e)})}static waitFor(e){return new M((n,r)=>{let s=0,i=0,a=!1;e.forEach(c=>{++s,c.next(()=>{++i,a&&i===s&&n()},l=>r(l))}),a=!0,i===s&&n()})}static or(e){let n=M.resolve(!1);for(const r of e)n=n.next(s=>s?M.resolve(s):r());return n}static forEach(e,n){const r=[];return e.forEach((s,i)=>{r.push(n.call(this,s,i))}),this.waitFor(r)}static mapArray(e,n){return new M((r,s)=>{const i=e.length,a=new Array(i);let c=0;for(let l=0;l<i;l++){const h=l;n(e[h]).next(f=>{a[h]=f,++c,c===i&&r(a)},f=>s(f))}})}static doWhile(e,n){return new M((r,s)=>{const i=()=>{e()===!0?n().next(()=>{i()},s):r()};i()})}}function SI(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function As(t){return t.name==="IndexedDbTransactionError"}/**
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
 */class ga{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>n.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}ga.ce=-1;/**
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
 */const Sl=-1;function _a(t){return t==null}function Fo(t){return t===0&&1/t==-1/0}function bI(t){return typeof t=="number"&&Number.isInteger(t)&&!Fo(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
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
 */const tm="";function CI(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=ld(e)),e=RI(t.get(n),e);return ld(e)}function RI(t,e){let n=e;const r=t.length;for(let s=0;s<r;s++){const i=t.charAt(s);switch(i){case"\0":n+="";break;case tm:n+="";break;default:n+=i}}return n}function ld(t){return t+tm+""}/**
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
 */function ud(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function Lr(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function nm(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
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
 */class Xe{constructor(e,n){this.comparator=e,this.root=n||pt.EMPTY}insert(e,n){return new Xe(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,pt.BLACK,null,null))}remove(e){return new Xe(this.comparator,this.root.remove(e,this.comparator).copy(null,null,pt.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return n+r.left.size;s<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new oo(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new oo(this.root,e,this.comparator,!1)}getReverseIterator(){return new oo(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new oo(this.root,e,this.comparator,!0)}}class oo{constructor(e,n,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=n?r(e.key,n):1,n&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class pt{constructor(e,n,r,s,i){this.key=e,this.value=n,this.color=r??pt.RED,this.left=s??pt.EMPTY,this.right=i??pt.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,s,i){return new pt(e??this.key,n??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,n,r),null):i===0?s.copy(null,n,null,null,null):s.copy(null,null,null,null,s.right.insert(e,n,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return pt.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,s=this;if(n(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),n(e,s.key)===0){if(s.right.isEmpty())return pt.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,pt.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,pt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw pe(43730,{key:this.key,value:this.value});if(this.right.isRed())throw pe(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw pe(27949);return e+(this.isRed()?0:1)}}pt.EMPTY=null,pt.RED=!0,pt.BLACK=!1;pt.EMPTY=new class{constructor(){this.size=0}get key(){throw pe(57766)}get value(){throw pe(16141)}get color(){throw pe(16727)}get left(){throw pe(29726)}get right(){throw pe(36894)}copy(e,n,r,s,i){return this}insert(e,n,r){return new pt(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class ct{constructor(e){this.comparator=e,this.data=new Xe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;n(s.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new hd(this.data.getIterator())}getIteratorFrom(e){return new hd(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof ct)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new ct(this.comparator);return n.data=e,n}}class hd{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class Qt{constructor(e){this.fields=e,e.sort(gt.comparator)}static empty(){return new Qt([])}unionWith(e){let n=new ct(gt.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new Qt(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return ps(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
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
 */class rm extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class yt{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new rm("Invalid base64 string: "+i):i}}(e);return new yt(n)}static fromUint8Array(e){const n=function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i}(e);return new yt(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Re(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}yt.EMPTY_BYTE_STRING=new yt("");const PI=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function lr(t){if(Fe(!!t,39018),typeof t=="string"){let e=0;const n=PI.exec(t);if(Fe(!!n,46558,{timestamp:t}),n[1]){let s=n[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Ze(t.seconds),nanos:Ze(t.nanos)}}function Ze(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function ur(t){return typeof t=="string"?yt.fromBase64String(t):yt.fromUint8Array(t)}/**
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
 */const sm="server_timestamp",im="__type__",om="__previous_value__",am="__local_write_time__";function bl(t){return(t?.mapValue?.fields||{})[im]?.stringValue===sm}function ya(t){const e=t.mapValue.fields[om];return bl(e)?ya(e):e}function yi(t){const e=lr(t.mapValue.fields[am].timestampValue);return new Ge(e.seconds,e.nanos)}/**
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
 */class kI{constructor(e,n,r,s,i,a,c,l,h,f){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=h,this.isUsingEmulator=f}}const Uo="(default)";class vi{constructor(e,n){this.projectId=e,this.database=n||Uo}static empty(){return new vi("","")}get isDefaultDatabase(){return this.database===Uo}isEqual(e){return e instanceof vi&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const cm="__type__",DI="__max__",ao={mapValue:{}},lm="__vector__",$o="value";function hr(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?bl(t)?4:xI(t)?9007199254740991:NI(t)?10:11:pe(28295,{value:t})}function mn(t,e){if(t===e)return!0;const n=hr(t);if(n!==hr(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return yi(t).isEqual(yi(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=lr(s.timestampValue),c=lr(i.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(s,i){return ur(s.bytesValue).isEqual(ur(i.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(s,i){return Ze(s.geoPointValue.latitude)===Ze(i.geoPointValue.latitude)&&Ze(s.geoPointValue.longitude)===Ze(i.geoPointValue.longitude)}(t,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return Ze(s.integerValue)===Ze(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=Ze(s.doubleValue),c=Ze(i.doubleValue);return a===c?Fo(a)===Fo(c):isNaN(a)&&isNaN(c)}return!1}(t,e);case 9:return ps(t.arrayValue.values||[],e.arrayValue.values||[],mn);case 10:case 11:return function(s,i){const a=s.mapValue.fields||{},c=i.mapValue.fields||{};if(ud(a)!==ud(c))return!1;for(const l in a)if(a.hasOwnProperty(l)&&(c[l]===void 0||!mn(a[l],c[l])))return!1;return!0}(t,e);default:return pe(52216,{left:t})}}function Ti(t,e){return(t.values||[]).find(n=>mn(n,e))!==void 0}function ms(t,e){if(t===e)return 0;const n=hr(t),r=hr(e);if(n!==r)return Re(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return Re(t.booleanValue,e.booleanValue);case 2:return function(i,a){const c=Ze(i.integerValue||i.doubleValue),l=Ze(a.integerValue||a.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1}(t,e);case 3:return dd(t.timestampValue,e.timestampValue);case 4:return dd(yi(t),yi(e));case 5:return Oc(t.stringValue,e.stringValue);case 6:return function(i,a){const c=ur(i),l=ur(a);return c.compareTo(l)}(t.bytesValue,e.bytesValue);case 7:return function(i,a){const c=i.split("/"),l=a.split("/");for(let h=0;h<c.length&&h<l.length;h++){const f=Re(c[h],l[h]);if(f!==0)return f}return Re(c.length,l.length)}(t.referenceValue,e.referenceValue);case 8:return function(i,a){const c=Re(Ze(i.latitude),Ze(a.latitude));return c!==0?c:Re(Ze(i.longitude),Ze(a.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return fd(t.arrayValue,e.arrayValue);case 10:return function(i,a){const c=i.fields||{},l=a.fields||{},h=c[$o]?.arrayValue,f=l[$o]?.arrayValue,p=Re(h?.values?.length||0,f?.values?.length||0);return p!==0?p:fd(h,f)}(t.mapValue,e.mapValue);case 11:return function(i,a){if(i===ao.mapValue&&a===ao.mapValue)return 0;if(i===ao.mapValue)return 1;if(a===ao.mapValue)return-1;const c=i.fields||{},l=Object.keys(c),h=a.fields||{},f=Object.keys(h);l.sort(),f.sort();for(let p=0;p<l.length&&p<f.length;++p){const y=Oc(l[p],f[p]);if(y!==0)return y;const S=ms(c[l[p]],h[f[p]]);if(S!==0)return S}return Re(l.length,f.length)}(t.mapValue,e.mapValue);default:throw pe(23264,{he:n})}}function dd(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return Re(t,e);const n=lr(t),r=lr(e),s=Re(n.seconds,r.seconds);return s!==0?s:Re(n.nanos,r.nanos)}function fd(t,e){const n=t.values||[],r=e.values||[];for(let s=0;s<n.length&&s<r.length;++s){const i=ms(n[s],r[s]);if(i)return i}return Re(n.length,r.length)}function gs(t){return Mc(t)}function Mc(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const r=lr(n);return`time(${r.seconds},${r.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return ur(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return ue.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let r="[",s=!0;for(const i of n.values||[])s?s=!1:r+=",",r+=Mc(i);return r+"]"}(t.arrayValue):"mapValue"in t?function(n){const r=Object.keys(n.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${Mc(n.fields[a])}`;return s+"}"}(t.mapValue):pe(61005,{value:t})}function vo(t){switch(hr(t)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=ya(t);return e?16+vo(e):16;case 5:return 2*t.stringValue.length;case 6:return ur(t.bytesValue).approximateByteSize();case 7:return t.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,i)=>s+vo(i),0)}(t.arrayValue);case 10:case 11:return function(r){let s=0;return Lr(r.fields,(i,a)=>{s+=i.length+vo(a)}),s}(t.mapValue);default:throw pe(13486,{value:t})}}function pd(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function Lc(t){return!!t&&"integerValue"in t}function Cl(t){return!!t&&"arrayValue"in t}function md(t){return!!t&&"nullValue"in t}function gd(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function To(t){return!!t&&"mapValue"in t}function NI(t){return(t?.mapValue?.fields||{})[cm]?.stringValue===lm}function oi(t){if(t.geoPointValue)return{geoPointValue:{...t.geoPointValue}};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:{...t.timestampValue}};if(t.mapValue){const e={mapValue:{fields:{}}};return Lr(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=oi(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=oi(t.arrayValue.values[n]);return e}return{...t}}function xI(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue===DI}/**
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
 */class Bt{constructor(e){this.value=e}static empty(){return new Bt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!To(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=oi(n)}setAll(e){let n=gt.emptyPath(),r={},s=[];e.forEach((a,c)=>{if(!n.isImmediateParentOf(c)){const l=this.getFieldsMap(n);this.applyChanges(l,r,s),r={},s=[],n=c.popLast()}a?r[c.lastSegment()]=oi(a):s.push(c.lastSegment())});const i=this.getFieldsMap(n);this.applyChanges(i,r,s)}delete(e){const n=this.field(e.popLast());To(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return mn(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=n.mapValue.fields[e.get(r)];To(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=s),n=s}return n.mapValue.fields}applyChanges(e,n,r){Lr(n,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new Bt(oi(this.value))}}function um(t){const e=[];return Lr(t.fields,(n,r)=>{const s=new gt([n]);if(To(r)){const i=um(r.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)}),new Qt(e)}/**
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
 */class bt{constructor(e,n,r,s,i,a,c){this.key=e,this.documentType=n,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=c}static newInvalidDocument(e){return new bt(e,0,ye.min(),ye.min(),ye.min(),Bt.empty(),0)}static newFoundDocument(e,n,r,s){return new bt(e,1,n,ye.min(),r,s,0)}static newNoDocument(e,n){return new bt(e,2,n,ye.min(),ye.min(),Bt.empty(),0)}static newUnknownDocument(e,n){return new bt(e,3,n,ye.min(),ye.min(),Bt.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(ye.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Bt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Bt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=ye.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof bt&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new bt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Bo{constructor(e,n){this.position=e,this.inclusive=n}}function _d(t,e,n){let r=0;for(let s=0;s<t.position.length;s++){const i=e[s],a=t.position[s];if(i.field.isKeyField()?r=ue.comparator(ue.fromName(a.referenceValue),n.key):r=ms(a,n.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function yd(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!mn(t.position[n],e.position[n]))return!1;return!0}/**
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
 */class Ei{constructor(e,n="asc"){this.field=e,this.dir=n}}function VI(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
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
 */class hm{}class st extends hm{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new MI(e,n,r):n==="array-contains"?new UI(e,r):n==="in"?new $I(e,r):n==="not-in"?new BI(e,r):n==="array-contains-any"?new jI(e,r):new st(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new LI(e,r):new FI(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&n.nullValue===void 0&&this.matchesComparison(ms(n,this.value)):n!==null&&hr(this.value)===hr(n)&&this.matchesComparison(ms(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return pe(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Zt extends hm{constructor(e,n){super(),this.filters=e,this.op=n,this.Pe=null}static create(e,n){return new Zt(e,n)}matches(e){return dm(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function dm(t){return t.op==="and"}function fm(t){return OI(t)&&dm(t)}function OI(t){for(const e of t.filters)if(e instanceof Zt)return!1;return!0}function Fc(t){if(t instanceof st)return t.field.canonicalString()+t.op.toString()+gs(t.value);if(fm(t))return t.filters.map(e=>Fc(e)).join(",");{const e=t.filters.map(n=>Fc(n)).join(",");return`${t.op}(${e})`}}function pm(t,e){return t instanceof st?function(r,s){return s instanceof st&&r.op===s.op&&r.field.isEqual(s.field)&&mn(r.value,s.value)}(t,e):t instanceof Zt?function(r,s){return s instanceof Zt&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,a,c)=>i&&pm(a,s.filters[c]),!0):!1}(t,e):void pe(19439)}function mm(t){return t instanceof st?function(n){return`${n.field.canonicalString()} ${n.op} ${gs(n.value)}`}(t):t instanceof Zt?function(n){return n.op.toString()+" {"+n.getFilters().map(mm).join(" ,")+"}"}(t):"Filter"}class MI extends st{constructor(e,n,r){super(e,n,r),this.key=ue.fromName(r.referenceValue)}matches(e){const n=ue.comparator(e.key,this.key);return this.matchesComparison(n)}}class LI extends st{constructor(e,n){super(e,"in",n),this.keys=gm("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class FI extends st{constructor(e,n){super(e,"not-in",n),this.keys=gm("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function gm(t,e){return(e.arrayValue?.values||[]).map(n=>ue.fromName(n.referenceValue))}class UI extends st{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return Cl(n)&&Ti(n.arrayValue,this.value)}}class $I extends st{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&Ti(this.value.arrayValue,n)}}class BI extends st{constructor(e,n){super(e,"not-in",n)}matches(e){if(Ti(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&n.nullValue===void 0&&!Ti(this.value.arrayValue,n)}}class jI extends st{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!Cl(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>Ti(this.value.arrayValue,r))}}/**
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
 */class qI{constructor(e,n=null,r=[],s=[],i=null,a=null,c=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=c,this.Te=null}}function vd(t,e=null,n=[],r=[],s=null,i=null,a=null){return new qI(t,e,n,r,s,i,a)}function Rl(t){const e=Ee(t);if(e.Te===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>Fc(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),_a(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>gs(r)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>gs(r)).join(",")),e.Te=n}return e.Te}function Pl(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!VI(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!pm(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!yd(t.startAt,e.startAt)&&yd(t.endAt,e.endAt)}function Uc(t){return ue.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
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
 */class Ss{constructor(e,n=null,r=[],s=[],i=null,a="F",c=null,l=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=c,this.endAt=l,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function HI(t,e,n,r,s,i,a,c){return new Ss(t,e,n,r,s,i,a,c)}function kl(t){return new Ss(t)}function Td(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function _m(t){return t.collectionGroup!==null}function ai(t){const e=Ee(t);if(e.Ie===null){e.Ie=[];const n=new Set;for(const i of e.explicitOrderBy)e.Ie.push(i),n.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new ct(gt.comparator);return a.filters.forEach(l=>{l.getFlattenedFilters().forEach(h=>{h.isInequality()&&(c=c.add(h.field))})}),c})(e).forEach(i=>{n.has(i.canonicalString())||i.isKeyField()||e.Ie.push(new Ei(i,r))}),n.has(gt.keyField().canonicalString())||e.Ie.push(new Ei(gt.keyField(),r))}return e.Ie}function on(t){const e=Ee(t);return e.Ee||(e.Ee=WI(e,ai(t))),e.Ee}function WI(t,e){if(t.limitType==="F")return vd(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Ei(s.field,i)});const n=t.endAt?new Bo(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new Bo(t.startAt.position,t.startAt.inclusive):null;return vd(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function $c(t,e){const n=t.filters.concat([e]);return new Ss(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}function Bc(t,e,n){return new Ss(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function va(t,e){return Pl(on(t),on(e))&&t.limitType===e.limitType}function ym(t){return`${Rl(on(t))}|lt:${t.limitType}`}function Zr(t){return`Query(target=${function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map(s=>mm(s)).join(", ")}]`),_a(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map(s=>gs(s)).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map(s=>gs(s)).join(",")),`Target(${r})`}(on(t))}; limitType=${t.limitType})`}function Ta(t,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):ue.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(t,e)&&function(r,s){for(const i of ai(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(t,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(t,e)&&function(r,s){return!(r.startAt&&!function(a,c,l){const h=_d(a,c,l);return a.inclusive?h<=0:h<0}(r.startAt,ai(r),s)||r.endAt&&!function(a,c,l){const h=_d(a,c,l);return a.inclusive?h>=0:h>0}(r.endAt,ai(r),s))}(t,e)}function zI(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function vm(t){return(e,n)=>{let r=!1;for(const s of ai(t)){const i=GI(s,e,n);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function GI(t,e,n){const r=t.field.isKeyField()?ue.comparator(e.key,n.key):function(i,a,c){const l=a.data.field(i),h=c.data.field(i);return l!==null&&h!==null?ms(l,h):pe(42886)}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return pe(19790,{direction:t.dir})}}/**
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
 */class Fr{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,n]);s.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[n]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Lr(this.inner,(n,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return nm(this.inner)}size(){return this.innerSize}}/**
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
 */const KI=new Xe(ue.comparator);function Dn(){return KI}const Tm=new Xe(ue.comparator);function Gs(...t){let e=Tm;for(const n of t)e=e.insert(n.key,n);return e}function Em(t){let e=Tm;return t.forEach((n,r)=>e=e.insert(n,r.overlayedDocument)),e}function br(){return ci()}function Im(){return ci()}function ci(){return new Fr(t=>t.toString(),(t,e)=>t.isEqual(e))}const QI=new Xe(ue.comparator),XI=new ct(ue.comparator);function Pe(...t){let e=XI;for(const n of t)e=e.add(n);return e}const JI=new ct(Re);function YI(){return JI}/**
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
 */function Dl(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Fo(e)?"-0":e}}function wm(t){return{integerValue:""+t}}function ZI(t,e){return bI(e)?wm(e):Dl(t,e)}/**
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
 */class Ea{constructor(){this._=void 0}}function ew(t,e,n){return t instanceof jo?function(s,i){const a={fields:{[im]:{stringValue:sm},[am]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&bl(i)&&(i=ya(i)),i&&(a.fields[om]=i),{mapValue:a}}(n,e):t instanceof Ii?Sm(t,e):t instanceof wi?bm(t,e):function(s,i){const a=Am(s,i),c=Ed(a)+Ed(s.Ae);return Lc(a)&&Lc(s.Ae)?wm(c):Dl(s.serializer,c)}(t,e)}function tw(t,e,n){return t instanceof Ii?Sm(t,e):t instanceof wi?bm(t,e):n}function Am(t,e){return t instanceof qo?function(r){return Lc(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class jo extends Ea{}class Ii extends Ea{constructor(e){super(),this.elements=e}}function Sm(t,e){const n=Cm(e);for(const r of t.elements)n.some(s=>mn(s,r))||n.push(r);return{arrayValue:{values:n}}}class wi extends Ea{constructor(e){super(),this.elements=e}}function bm(t,e){let n=Cm(e);for(const r of t.elements)n=n.filter(s=>!mn(s,r));return{arrayValue:{values:n}}}class qo extends Ea{constructor(e,n){super(),this.serializer=e,this.Ae=n}}function Ed(t){return Ze(t.integerValue||t.doubleValue)}function Cm(t){return Cl(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}function nw(t,e){return t.field.isEqual(e.field)&&function(r,s){return r instanceof Ii&&s instanceof Ii||r instanceof wi&&s instanceof wi?ps(r.elements,s.elements,mn):r instanceof qo&&s instanceof qo?mn(r.Ae,s.Ae):r instanceof jo&&s instanceof jo}(t.transform,e.transform)}class rw{constructor(e,n){this.version=e,this.transformResults=n}}class an{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new an}static exists(e){return new an(void 0,e)}static updateTime(e){return new an(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Eo(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class Ia{}function Rm(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new Nl(t.key,an.none()):new Di(t.key,t.data,an.none());{const n=t.data,r=Bt.empty();let s=new ct(gt.comparator);for(let i of e.fields)if(!s.has(i)){let a=n.field(i);a===null&&i.length>1&&(i=i.popLast(),a=n.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new Ur(t.key,r,new Qt(s.toArray()),an.none())}}function sw(t,e,n){t instanceof Di?function(s,i,a){const c=s.value.clone(),l=wd(s.fieldTransforms,i,a.transformResults);c.setAll(l),i.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(t,e,n):t instanceof Ur?function(s,i,a){if(!Eo(s.precondition,i))return void i.convertToUnknownDocument(a.version);const c=wd(s.fieldTransforms,i,a.transformResults),l=i.data;l.setAll(Pm(s)),l.setAll(c),i.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(t,e,n):function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,n)}function li(t,e,n,r){return t instanceof Di?function(i,a,c,l){if(!Eo(i.precondition,a))return c;const h=i.value.clone(),f=Ad(i.fieldTransforms,l,a);return h.setAll(f),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),null}(t,e,n,r):t instanceof Ur?function(i,a,c,l){if(!Eo(i.precondition,a))return c;const h=Ad(i.fieldTransforms,l,a),f=a.data;return f.setAll(Pm(i)),f.setAll(h),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(p=>p.field))}(t,e,n,r):function(i,a,c){return Eo(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c}(t,e,n)}function iw(t,e){let n=null;for(const r of t.fieldTransforms){const s=e.data.field(r.field),i=Am(r.transform,s||null);i!=null&&(n===null&&(n=Bt.empty()),n.set(r.field,i))}return n||null}function Id(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&ps(r,s,(i,a)=>nw(i,a))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class Di extends Ia{constructor(e,n,r,s=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Ur extends Ia{constructor(e,n,r,s,i=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Pm(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function wd(t,e,n){const r=new Map;Fe(t.length===n.length,32656,{Re:n.length,Ve:t.length});for(let s=0;s<n.length;s++){const i=t[s],a=i.transform,c=e.data.field(i.field);r.set(i.field,tw(a,c,n[s]))}return r}function Ad(t,e,n){const r=new Map;for(const s of t){const i=s.transform,a=n.data.field(s.field);r.set(s.field,ew(i,a,e))}return r}class Nl extends Ia{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class ow extends Ia{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class aw{constructor(e,n,r,s){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&sw(i,e,r[s])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=li(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=li(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=Im();return this.mutations.forEach(s=>{const i=e.get(s.key),a=i.overlayedDocument;let c=this.applyToLocalView(a,i.mutatedFields);c=n.has(s.key)?null:c;const l=Rm(a,c);l!==null&&r.set(s.key,l),a.isValidDocument()||a.convertToNoDocument(ye.min())}),r}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),Pe())}isEqual(e){return this.batchId===e.batchId&&ps(this.mutations,e.mutations,(n,r)=>Id(n,r))&&ps(this.baseMutations,e.baseMutations,(n,r)=>Id(n,r))}}class xl{constructor(e,n,r,s){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=s}static from(e,n,r){Fe(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let s=function(){return QI}();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new xl(e,n,r,s)}}/**
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
 */class cw{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class lw{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
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
 */var tt,De;function uw(t){switch(t){case O.OK:return pe(64938);case O.CANCELLED:case O.UNKNOWN:case O.DEADLINE_EXCEEDED:case O.RESOURCE_EXHAUSTED:case O.INTERNAL:case O.UNAVAILABLE:case O.UNAUTHENTICATED:return!1;case O.INVALID_ARGUMENT:case O.NOT_FOUND:case O.ALREADY_EXISTS:case O.PERMISSION_DENIED:case O.FAILED_PRECONDITION:case O.ABORTED:case O.OUT_OF_RANGE:case O.UNIMPLEMENTED:case O.DATA_LOSS:return!0;default:return pe(15467,{code:t})}}function km(t){if(t===void 0)return kn("GRPC error has no .code"),O.UNKNOWN;switch(t){case tt.OK:return O.OK;case tt.CANCELLED:return O.CANCELLED;case tt.UNKNOWN:return O.UNKNOWN;case tt.DEADLINE_EXCEEDED:return O.DEADLINE_EXCEEDED;case tt.RESOURCE_EXHAUSTED:return O.RESOURCE_EXHAUSTED;case tt.INTERNAL:return O.INTERNAL;case tt.UNAVAILABLE:return O.UNAVAILABLE;case tt.UNAUTHENTICATED:return O.UNAUTHENTICATED;case tt.INVALID_ARGUMENT:return O.INVALID_ARGUMENT;case tt.NOT_FOUND:return O.NOT_FOUND;case tt.ALREADY_EXISTS:return O.ALREADY_EXISTS;case tt.PERMISSION_DENIED:return O.PERMISSION_DENIED;case tt.FAILED_PRECONDITION:return O.FAILED_PRECONDITION;case tt.ABORTED:return O.ABORTED;case tt.OUT_OF_RANGE:return O.OUT_OF_RANGE;case tt.UNIMPLEMENTED:return O.UNIMPLEMENTED;case tt.DATA_LOSS:return O.DATA_LOSS;default:return pe(39323,{code:t})}}(De=tt||(tt={}))[De.OK=0]="OK",De[De.CANCELLED=1]="CANCELLED",De[De.UNKNOWN=2]="UNKNOWN",De[De.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",De[De.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",De[De.NOT_FOUND=5]="NOT_FOUND",De[De.ALREADY_EXISTS=6]="ALREADY_EXISTS",De[De.PERMISSION_DENIED=7]="PERMISSION_DENIED",De[De.UNAUTHENTICATED=16]="UNAUTHENTICATED",De[De.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",De[De.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",De[De.ABORTED=10]="ABORTED",De[De.OUT_OF_RANGE=11]="OUT_OF_RANGE",De[De.UNIMPLEMENTED=12]="UNIMPLEMENTED",De[De.INTERNAL=13]="INTERNAL",De[De.UNAVAILABLE=14]="UNAVAILABLE",De[De.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function hw(){return new TextEncoder}/**
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
 */const dw=new rr([4294967295,4294967295],0);function Sd(t){const e=hw().encode(t),n=new Wp;return n.update(e),new Uint8Array(n.digest())}function bd(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new rr([n,r],0),new rr([s,i],0)]}class Vl{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new Ks(`Invalid padding: ${n}`);if(r<0)throw new Ks(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Ks(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new Ks(`Invalid padding when bitmap length is 0: ${n}`);this.ge=8*e.length-n,this.pe=rr.fromNumber(this.ge)}ye(e,n,r){let s=e.add(n.multiply(rr.fromNumber(r)));return s.compare(dw)===1&&(s=new rr([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const n=Sd(e),[r,s]=bd(n);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);if(!this.we(a))return!1}return!0}static create(e,n,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new Vl(i,s,n);return r.forEach(c=>a.insert(c)),a}insert(e){if(this.ge===0)return;const n=Sd(e),[r,s]=bd(n);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);this.Se(a)}}Se(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class Ks extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class wa{constructor(e,n,r,s,i){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const s=new Map;return s.set(e,Ni.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new wa(ye.min(),s,new Xe(Re),Dn(),Pe())}}class Ni{constructor(e,n,r,s,i){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new Ni(r,n,Pe(),Pe(),Pe())}}/**
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
 */class Io{constructor(e,n,r,s){this.be=e,this.removedTargetIds=n,this.key=r,this.De=s}}class Dm{constructor(e,n){this.targetId=e,this.Ce=n}}class Nm{constructor(e,n,r=yt.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=s}}class Cd{constructor(){this.ve=0,this.Fe=Rd(),this.Me=yt.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=Pe(),n=Pe(),r=Pe();return this.Fe.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:n=n.add(s);break;case 1:r=r.add(s);break;default:pe(38017,{changeType:i})}}),new Ni(this.Me,this.xe,e,n,r)}qe(){this.Oe=!1,this.Fe=Rd()}Qe(e,n){this.Oe=!0,this.Fe=this.Fe.insert(e,n)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,Fe(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class fw{constructor(e){this.Ge=e,this.ze=new Map,this.je=Dn(),this.Je=co(),this.He=co(),this.Ye=new Xe(Re)}Ze(e){for(const n of e.be)e.De&&e.De.isFoundDocument()?this.Xe(n,e.De):this.et(n,e.key,e.De);for(const n of e.removedTargetIds)this.et(n,e.key,e.De)}tt(e){this.forEachTarget(e,n=>{const r=this.nt(n);switch(e.state){case 0:this.rt(n)&&r.Le(e.resumeToken);break;case 1:r.Ke(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.Ke(),r.Ne||this.removeTarget(n);break;case 3:this.rt(n)&&(r.We(),r.Le(e.resumeToken));break;case 4:this.rt(n)&&(this.it(n),r.Le(e.resumeToken));break;default:pe(56790,{state:e.state})}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.ze.forEach((r,s)=>{this.rt(s)&&n(s)})}st(e){const n=e.targetId,r=e.Ce.count,s=this.ot(n);if(s){const i=s.target;if(Uc(i))if(r===0){const a=new ue(i.path);this.et(n,a,bt.newNoDocument(a,ye.min()))}else Fe(r===1,20013,{expectedCount:r});else{const a=this._t(n);if(a!==r){const c=this.ut(e),l=c?this.ct(c,e,a):1;if(l!==0){this.it(n);const h=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(n,h)}}}}}ut(e){const n=e.Ce.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=n;let a,c;try{a=ur(r).toUint8Array()}catch(l){if(l instanceof rm)return fs("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new Vl(a,s,i)}catch(l){return fs(l instanceof Ks?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.ge===0?null:c}ct(e,n,r){return n.Ce.count===r-this.Pt(e,n.targetId)?0:2}Pt(e,n){const r=this.Ge.getRemoteKeysForTarget(n);let s=0;return r.forEach(i=>{const a=this.Ge.ht(),c=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.et(n,i,null),s++)}),s}Tt(e){const n=new Map;this.ze.forEach((i,a)=>{const c=this.ot(a);if(c){if(i.current&&Uc(c.target)){const l=new ue(c.target.path);this.It(l).has(a)||this.Et(a,l)||this.et(a,l,bt.newNoDocument(l,e))}i.Be&&(n.set(a,i.ke()),i.qe())}});let r=Pe();this.He.forEach((i,a)=>{let c=!0;a.forEachWhile(l=>{const h=this.ot(l);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(i))}),this.je.forEach((i,a)=>a.setReadTime(e));const s=new wa(e,n,this.Ye,this.je,r);return this.je=Dn(),this.Je=co(),this.He=co(),this.Ye=new Xe(Re),s}Xe(e,n){if(!this.rt(e))return;const r=this.Et(e,n.key)?2:0;this.nt(e).Qe(n.key,r),this.je=this.je.insert(n.key,n),this.Je=this.Je.insert(n.key,this.It(n.key).add(e)),this.He=this.He.insert(n.key,this.dt(n.key).add(e))}et(e,n,r){if(!this.rt(e))return;const s=this.nt(e);this.Et(e,n)?s.Qe(n,1):s.$e(n),this.He=this.He.insert(n,this.dt(n).delete(e)),this.He=this.He.insert(n,this.dt(n).add(e)),r&&(this.je=this.je.insert(n,r))}removeTarget(e){this.ze.delete(e)}_t(e){const n=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let n=this.ze.get(e);return n||(n=new Cd,this.ze.set(e,n)),n}dt(e){let n=this.He.get(e);return n||(n=new ct(Re),this.He=this.He.insert(e,n)),n}It(e){let n=this.Je.get(e);return n||(n=new ct(Re),this.Je=this.Je.insert(e,n)),n}rt(e){const n=this.ot(e)!==null;return n||se("WatchChangeAggregator","Detected inactive target",e),n}ot(e){const n=this.ze.get(e);return n&&n.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new Cd),this.Ge.getRemoteKeysForTarget(e).forEach(n=>{this.et(e,n,null)})}Et(e,n){return this.Ge.getRemoteKeysForTarget(e).has(n)}}function co(){return new Xe(ue.comparator)}function Rd(){return new Xe(ue.comparator)}const pw={asc:"ASCENDING",desc:"DESCENDING"},mw={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},gw={and:"AND",or:"OR"};class _w{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function jc(t,e){return t.useProto3Json||_a(e)?e:{value:e}}function Ho(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function xm(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function yw(t,e){return Ho(t,e.toTimestamp())}function cn(t){return Fe(!!t,49232),ye.fromTimestamp(function(n){const r=lr(n);return new Ge(r.seconds,r.nanos)}(t))}function Ol(t,e){return qc(t,e).canonicalString()}function qc(t,e){const n=function(s){return new He(["projects",s.projectId,"databases",s.database])}(t).child("documents");return e===void 0?n:n.child(e)}function Vm(t){const e=He.fromString(t);return Fe(Um(e),10190,{key:e.toString()}),e}function Hc(t,e){return Ol(t.databaseId,e.path)}function uc(t,e){const n=Vm(e);if(n.get(1)!==t.databaseId.projectId)throw new re(O.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new re(O.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new ue(Mm(n))}function Om(t,e){return Ol(t.databaseId,e)}function vw(t){const e=Vm(t);return e.length===4?He.emptyPath():Mm(e)}function Wc(t){return new He(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function Mm(t){return Fe(t.length>4&&t.get(4)==="documents",29091,{key:t.toString()}),t.popFirst(5)}function Pd(t,e,n){return{name:Hc(t,e),fields:n.value.mapValue.fields}}function Tw(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:pe(39313,{state:h})}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(h,f){return h.useProto3Json?(Fe(f===void 0||typeof f=="string",58123),yt.fromBase64String(f||"")):(Fe(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),yt.fromUint8Array(f||new Uint8Array))}(t,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&function(h){const f=h.code===void 0?O.UNKNOWN:km(h.code);return new re(f,h.message||"")}(a);n=new Nm(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=uc(t,r.document.name),i=cn(r.document.updateTime),a=r.document.createTime?cn(r.document.createTime):ye.min(),c=new Bt({mapValue:{fields:r.document.fields}}),l=bt.newFoundDocument(s,i,a,c),h=r.targetIds||[],f=r.removedTargetIds||[];n=new Io(h,f,l.key,l)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=uc(t,r.document),i=r.readTime?cn(r.readTime):ye.min(),a=bt.newNoDocument(s,i),c=r.removedTargetIds||[];n=new Io([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=uc(t,r.document),i=r.removedTargetIds||[];n=new Io([],i,s,null)}else{if(!("filter"in e))return pe(11601,{Rt:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new lw(s,i),c=r.targetId;n=new Dm(c,a)}}return n}function Ew(t,e){let n;if(e instanceof Di)n={update:Pd(t,e.key,e.value)};else if(e instanceof Nl)n={delete:Hc(t,e.key)};else if(e instanceof Ur)n={update:Pd(t,e.key,e.data),updateMask:kw(e.fieldMask)};else{if(!(e instanceof ow))return pe(16599,{Vt:e.type});n={verify:Hc(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(i,a){const c=a.transform;if(c instanceof jo)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Ii)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof wi)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof qo)return{fieldPath:a.field.canonicalString(),increment:c.Ae};throw pe(20930,{transform:a.transform})}(0,r))),e.precondition.isNone||(n.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:yw(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:pe(27497)}(t,e.precondition)),n}function Iw(t,e){return t&&t.length>0?(Fe(e!==void 0,14353),t.map(n=>function(s,i){let a=s.updateTime?cn(s.updateTime):cn(i);return a.isEqual(ye.min())&&(a=cn(i)),new rw(a,s.transformResults||[])}(n,e))):[]}function ww(t,e){return{documents:[Om(t,e.path)]}}function Aw(t,e){const n={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=Om(t,s);const i=function(h){if(h.length!==0)return Fm(Zt.create(h,"and"))}(e.filters);i&&(n.structuredQuery.where=i);const a=function(h){if(h.length!==0)return h.map(f=>function(y){return{field:es(y.field),direction:Cw(y.dir)}}(f))}(e.orderBy);a&&(n.structuredQuery.orderBy=a);const c=jc(t,e.limit);return c!==null&&(n.structuredQuery.limit=c),e.startAt&&(n.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{ft:n,parent:s}}function Sw(t){let e=vw(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){Fe(r===1,65062);const f=n.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];n.where&&(i=function(p){const y=Lm(p);return y instanceof Zt&&fm(y)?y.getFilters():[y]}(n.where));let a=[];n.orderBy&&(a=function(p){return p.map(y=>function(R){return new Ei(ts(R.field),function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(R.direction))}(y))}(n.orderBy));let c=null;n.limit&&(c=function(p){let y;return y=typeof p=="object"?p.value:p,_a(y)?null:y}(n.limit));let l=null;n.startAt&&(l=function(p){const y=!!p.before,S=p.values||[];return new Bo(S,y)}(n.startAt));let h=null;return n.endAt&&(h=function(p){const y=!p.before,S=p.values||[];return new Bo(S,y)}(n.endAt)),HI(e,s,a,i,c,"F",l,h)}function bw(t,e){const n=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return pe(28987,{purpose:s})}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function Lm(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=ts(n.unaryFilter.field);return st.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=ts(n.unaryFilter.field);return st.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=ts(n.unaryFilter.field);return st.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=ts(n.unaryFilter.field);return st.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return pe(61313);default:return pe(60726)}}(t):t.fieldFilter!==void 0?function(n){return st.create(ts(n.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return pe(58110);default:return pe(50506)}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return Zt.create(n.compositeFilter.filters.map(r=>Lm(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return pe(1026)}}(n.compositeFilter.op))}(t):pe(30097,{filter:t})}function Cw(t){return pw[t]}function Rw(t){return mw[t]}function Pw(t){return gw[t]}function es(t){return{fieldPath:t.canonicalString()}}function ts(t){return gt.fromServerFormat(t.fieldPath)}function Fm(t){return t instanceof st?function(n){if(n.op==="=="){if(gd(n.value))return{unaryFilter:{field:es(n.field),op:"IS_NAN"}};if(md(n.value))return{unaryFilter:{field:es(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(gd(n.value))return{unaryFilter:{field:es(n.field),op:"IS_NOT_NAN"}};if(md(n.value))return{unaryFilter:{field:es(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:es(n.field),op:Rw(n.op),value:n.value}}}(t):t instanceof Zt?function(n){const r=n.getFilters().map(s=>Fm(s));return r.length===1?r[0]:{compositeFilter:{op:Pw(n.op),filters:r}}}(t):pe(54877,{filter:t})}function kw(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function Um(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
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
 */class Jn{constructor(e,n,r,s,i=ye.min(),a=ye.min(),c=yt.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new Jn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new Jn(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Jn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Jn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class Dw{constructor(e){this.yt=e}}function Nw(t){const e=Sw({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?Bc(e,e.limit,"L"):e}/**
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
 */class xw{constructor(){this.Cn=new Vw}addToCollectionParentIndex(e,n){return this.Cn.add(n),M.resolve()}getCollectionParents(e,n){return M.resolve(this.Cn.getEntries(n))}addFieldIndex(e,n){return M.resolve()}deleteFieldIndex(e,n){return M.resolve()}deleteAllFieldIndexes(e){return M.resolve()}createTargetIndexes(e,n){return M.resolve()}getDocumentsMatchingTarget(e,n){return M.resolve(null)}getIndexType(e,n){return M.resolve(0)}getFieldIndexes(e,n){return M.resolve([])}getNextCollectionGroupToUpdate(e){return M.resolve(null)}getMinOffset(e,n){return M.resolve(cr.min())}getMinOffsetFromCollectionGroup(e,n){return M.resolve(cr.min())}updateCollectionGroup(e,n,r){return M.resolve()}updateIndexEntries(e,n){return M.resolve()}}class Vw{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n]||new ct(He.comparator),i=!s.has(r);return this.index[n]=s.add(r),i}has(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n];return s&&s.has(r)}getEntries(e){return(this.index[e]||new ct(He.comparator)).toArray()}}/**
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
 */const kd={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},$m=41943040;class Vt{static withCacheSize(e){return new Vt(e,Vt.DEFAULT_COLLECTION_PERCENTILE,Vt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,n,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=n,this.maximumSequenceNumbersToCollect=r}}/**
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
 */Vt.DEFAULT_COLLECTION_PERCENTILE=10,Vt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Vt.DEFAULT=new Vt($m,Vt.DEFAULT_COLLECTION_PERCENTILE,Vt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Vt.DISABLED=new Vt(-1,0,0);/**
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
 */class _s{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new _s(0)}static cr(){return new _s(-1)}}/**
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
 */const Dd="LruGarbageCollector",Ow=1048576;function Nd([t,e],[n,r]){const s=Re(t,n);return s===0?Re(e,r):s}class Mw{constructor(e){this.Ir=e,this.buffer=new ct(Nd),this.Er=0}dr(){return++this.Er}Ar(e){const n=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(n);else{const r=this.buffer.last();Nd(n,r)<0&&(this.buffer=this.buffer.delete(r).add(n))}}get maxValue(){return this.buffer.last()[0]}}class Lw{constructor(e,n,r){this.garbageCollector=e,this.asyncQueue=n,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(e){se(Dd,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(n){As(n)?se(Dd,"Ignoring IndexedDB error during garbage collection: ",n):await ws(n)}await this.Vr(3e5)})}}class Fw{constructor(e,n){this.mr=e,this.params=n}calculateTargetCount(e,n){return this.mr.gr(e).next(r=>Math.floor(n/100*r))}nthSequenceNumber(e,n){if(n===0)return M.resolve(ga.ce);const r=new Mw(n);return this.mr.forEachTarget(e,s=>r.Ar(s.sequenceNumber)).next(()=>this.mr.pr(e,s=>r.Ar(s))).next(()=>r.maxValue)}removeTargets(e,n,r){return this.mr.removeTargets(e,n,r)}removeOrphanedDocuments(e,n){return this.mr.removeOrphanedDocuments(e,n)}collect(e,n){return this.params.cacheSizeCollectionThreshold===-1?(se("LruGarbageCollector","Garbage collection skipped; disabled"),M.resolve(kd)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(se("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),kd):this.yr(e,n))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,n){let r,s,i,a,c,l,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?(se("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,a=Date.now(),this.nthSequenceNumber(e,s))).next(p=>(r=p,c=Date.now(),this.removeTargets(e,r,n))).next(p=>(i=p,l=Date.now(),this.removeOrphanedDocuments(e,r))).next(p=>(h=Date.now(),Yr()<=Ce.DEBUG&&se("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${s} in `+(c-a)+`ms
	Removed ${i} targets in `+(l-c)+`ms
	Removed ${p} documents in `+(h-l)+`ms
Total Duration: ${h-f}ms`),M.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p})))}}function Uw(t,e){return new Fw(t,e)}/**
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
 */class $w{constructor(){this.changes=new Fr(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,bt.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?M.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class Bw{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
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
 */class jw{constructor(e,n,r,s){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,n))).next(s=>(r!==null&&li(r.mutation,s,Qt.empty(),Ge.now()),s))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.getLocalViewOfDocuments(e,r,Pe()).next(()=>r))}getLocalViewOfDocuments(e,n,r=Pe()){const s=br();return this.populateOverlays(e,s,n).next(()=>this.computeViews(e,n,s,r).next(i=>{let a=Gs();return i.forEach((c,l)=>{a=a.insert(c,l.overlayedDocument)}),a}))}getOverlayedDocuments(e,n){const r=br();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,Pe()))}populateOverlays(e,n,r){const s=[];return r.forEach(i=>{n.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((a,c)=>{n.set(a,c)})})}computeViews(e,n,r,s){let i=Dn();const a=ci(),c=function(){return ci()}();return n.forEach((l,h)=>{const f=r.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof Ur)?i=i.insert(h.key,h):f!==void 0?(a.set(h.key,f.mutation.getFieldMask()),li(f.mutation,h,f.mutation.getFieldMask(),Ge.now())):a.set(h.key,Qt.empty())}),this.recalculateAndSaveOverlays(e,i).next(l=>(l.forEach((h,f)=>a.set(h,f)),n.forEach((h,f)=>c.set(h,new Bw(f,a.get(h)??null))),c))}recalculateAndSaveOverlays(e,n){const r=ci();let s=new Xe((a,c)=>a-c),i=Pe();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(a=>{for(const c of a)c.keys().forEach(l=>{const h=n.get(l);if(h===null)return;let f=r.get(l)||Qt.empty();f=c.applyToLocalView(h,f),r.set(l,f);const p=(s.get(c.batchId)||Pe()).add(l);s=s.insert(c.batchId,p)})}).next(()=>{const a=[],c=s.getReverseIterator();for(;c.hasNext();){const l=c.getNext(),h=l.key,f=l.value,p=Im();f.forEach(y=>{if(!i.has(y)){const S=Rm(n.get(y),r.get(y));S!==null&&p.set(y,S),i=i.add(y)}}),a.push(this.documentOverlayCache.saveOverlays(e,h,p))}return M.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,n,r,s){return function(a){return ue.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):_m(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,s):this.getDocumentsMatchingCollectionQuery(e,n,r,s)}getNextDocuments(e,n,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,s).next(i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,s-i.size):M.resolve(br());let c=_i,l=i;return a.next(h=>M.forEach(h,(f,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),i.get(f)?M.resolve():this.remoteDocumentCache.getEntry(e,f).next(y=>{l=l.insert(f,y)}))).next(()=>this.populateOverlays(e,h,i)).next(()=>this.computeViews(e,l,h,Pe())).next(f=>({batchId:c,changes:Em(f)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new ue(n)).next(r=>{let s=Gs();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,n,r,s){const i=n.collectionGroup;let a=Gs();return this.indexManager.getCollectionParents(e,i).next(c=>M.forEach(c,l=>{const h=function(p,y){return new Ss(y,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(n,l.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,r,s).next(f=>{f.forEach((p,y)=>{a=a.insert(p,y)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,n,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,i,s))).next(a=>{i.forEach((l,h)=>{const f=h.getKey();a.get(f)===null&&(a=a.insert(f,bt.newInvalidDocument(f)))});let c=Gs();return a.forEach((l,h)=>{const f=i.get(l);f!==void 0&&li(f.mutation,h,Qt.empty(),Ge.now()),Ta(n,h)&&(c=c.insert(l,h))}),c})}}/**
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
 */class qw{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,n){return M.resolve(this.Lr.get(n))}saveBundleMetadata(e,n){return this.Lr.set(n.id,function(s){return{id:s.id,version:s.version,createTime:cn(s.createTime)}}(n)),M.resolve()}getNamedQuery(e,n){return M.resolve(this.kr.get(n))}saveNamedQuery(e,n){return this.kr.set(n.name,function(s){return{name:s.name,query:Nw(s.bundledQuery),readTime:cn(s.readTime)}}(n)),M.resolve()}}/**
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
 */class Hw{constructor(){this.overlays=new Xe(ue.comparator),this.qr=new Map}getOverlay(e,n){return M.resolve(this.overlays.get(n))}getOverlays(e,n){const r=br();return M.forEach(n,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,n,r){return r.forEach((s,i)=>{this.St(e,n,i)}),M.resolve()}removeOverlaysForBatchId(e,n,r){const s=this.qr.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.qr.delete(r)),M.resolve()}getOverlaysForCollection(e,n,r){const s=br(),i=n.length+1,a=new ue(n.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const l=c.getNext().value,h=l.getKey();if(!n.isPrefixOf(h.path))break;h.path.length===i&&l.largestBatchId>r&&s.set(l.getKey(),l)}return M.resolve(s)}getOverlaysForCollectionGroup(e,n,r,s){let i=new Xe((h,f)=>h-f);const a=this.overlays.getIterator();for(;a.hasNext();){const h=a.getNext().value;if(h.getKey().getCollectionGroup()===n&&h.largestBatchId>r){let f=i.get(h.largestBatchId);f===null&&(f=br(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const c=br(),l=i.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((h,f)=>c.set(h,f)),!(c.size()>=s)););return M.resolve(c)}St(e,n,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.qr.get(s.largestBatchId).delete(r.key);this.qr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new cw(n,r));let i=this.qr.get(n);i===void 0&&(i=Pe(),this.qr.set(n,i)),this.qr.set(n,i.add(r.key))}}/**
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
 */class Ww{constructor(){this.sessionToken=yt.EMPTY_BYTE_STRING}getSessionToken(e){return M.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,M.resolve()}}/**
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
 */class Ml{constructor(){this.Qr=new ct(lt.$r),this.Ur=new ct(lt.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,n){const r=new lt(e,n);this.Qr=this.Qr.add(r),this.Ur=this.Ur.add(r)}Wr(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.Gr(new lt(e,n))}zr(e,n){e.forEach(r=>this.removeReference(r,n))}jr(e){const n=new ue(new He([])),r=new lt(n,e),s=new lt(n,e+1),i=[];return this.Ur.forEachInRange([r,s],a=>{this.Gr(a),i.push(a.key)}),i}Jr(){this.Qr.forEach(e=>this.Gr(e))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const n=new ue(new He([])),r=new lt(n,e),s=new lt(n,e+1);let i=Pe();return this.Ur.forEachInRange([r,s],a=>{i=i.add(a.key)}),i}containsKey(e){const n=new lt(e,0),r=this.Qr.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class lt{constructor(e,n){this.key=e,this.Yr=n}static $r(e,n){return ue.comparator(e.key,n.key)||Re(e.Yr,n.Yr)}static Kr(e,n){return Re(e.Yr,n.Yr)||ue.comparator(e.key,n.key)}}/**
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
 */class zw{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.tr=1,this.Zr=new ct(lt.$r)}checkEmpty(e){return M.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,s){const i=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new aw(i,n,r,s);this.mutationQueue.push(a);for(const c of s)this.Zr=this.Zr.add(new lt(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return M.resolve(a)}lookupMutationBatch(e,n){return M.resolve(this.Xr(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,s=this.ei(r),i=s<0?0:s;return M.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return M.resolve(this.mutationQueue.length===0?Sl:this.tr-1)}getAllMutationBatches(e){return M.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new lt(n,0),s=new lt(n,Number.POSITIVE_INFINITY),i=[];return this.Zr.forEachInRange([r,s],a=>{const c=this.Xr(a.Yr);i.push(c)}),M.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new ct(Re);return n.forEach(s=>{const i=new lt(s,0),a=new lt(s,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([i,a],c=>{r=r.add(c.Yr)})}),M.resolve(this.ti(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,s=r.length+1;let i=r;ue.isDocumentKey(i)||(i=i.child(""));const a=new lt(new ue(i),0);let c=new ct(Re);return this.Zr.forEachWhile(l=>{const h=l.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(c=c.add(l.Yr)),!0)},a),M.resolve(this.ti(c))}ti(e){const n=[];return e.forEach(r=>{const s=this.Xr(r);s!==null&&n.push(s)}),n}removeMutationBatch(e,n){Fe(this.ni(n.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Zr;return M.forEach(n.mutations,s=>{const i=new lt(s.key,n.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Zr=r})}ir(e){}containsKey(e,n){const r=new lt(n,0),s=this.Zr.firstAfterOrEqual(r);return M.resolve(n.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,M.resolve()}ni(e,n){return this.ei(e)}ei(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Xr(e){const n=this.ei(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
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
 */class Gw{constructor(e){this.ri=e,this.docs=function(){return new Xe(ue.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,s=this.docs.get(r),i=s?s.size:0,a=this.ri(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return M.resolve(r?r.document.mutableCopy():bt.newInvalidDocument(n))}getEntries(e,n){let r=Dn();return n.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():bt.newInvalidDocument(s))}),M.resolve(r)}getDocumentsMatchingQuery(e,n,r,s){let i=Dn();const a=n.path,c=new ue(a.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){const{key:h,value:{document:f}}=l.getNext();if(!a.isPrefixOf(h.path))break;h.path.length>a.length+1||II(EI(f),r)<=0||(s.has(f.key)||Ta(n,f))&&(i=i.insert(f.key,f.mutableCopy()))}return M.resolve(i)}getAllFromCollectionGroup(e,n,r,s){pe(9500)}ii(e,n){return M.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new Kw(this)}getSize(e){return M.resolve(this.size)}}class Kw extends $w{constructor(e){super(),this.Nr=e}applyChanges(e){const n=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?n.push(this.Nr.addEntry(e,s)):this.Nr.removeEntry(r)}),M.waitFor(n)}getFromCache(e,n){return this.Nr.getEntry(e,n)}getAllFromCache(e,n){return this.Nr.getEntries(e,n)}}/**
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
 */class Qw{constructor(e){this.persistence=e,this.si=new Fr(n=>Rl(n),Pl),this.lastRemoteSnapshotVersion=ye.min(),this.highestTargetId=0,this.oi=0,this._i=new Ml,this.targetCount=0,this.ai=_s.ur()}forEachTarget(e,n){return this.si.forEach((r,s)=>n(s)),M.resolve()}getLastRemoteSnapshotVersion(e){return M.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return M.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),M.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.oi&&(this.oi=n),M.resolve()}Pr(e){this.si.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.ai=new _s(n),this.highestTargetId=n),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,n){return this.Pr(n),this.targetCount+=1,M.resolve()}updateTargetData(e,n){return this.Pr(n),M.resolve()}removeTargetData(e,n){return this.si.delete(n.target),this._i.jr(n.targetId),this.targetCount-=1,M.resolve()}removeTargets(e,n,r){let s=0;const i=[];return this.si.forEach((a,c)=>{c.sequenceNumber<=n&&r.get(c.targetId)===null&&(this.si.delete(a),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)}),M.waitFor(i).next(()=>s)}getTargetCount(e){return M.resolve(this.targetCount)}getTargetData(e,n){const r=this.si.get(n)||null;return M.resolve(r)}addMatchingKeys(e,n,r){return this._i.Wr(n,r),M.resolve()}removeMatchingKeys(e,n,r){this._i.zr(n,r);const s=this.persistence.referenceDelegate,i=[];return s&&n.forEach(a=>{i.push(s.markPotentiallyOrphaned(e,a))}),M.waitFor(i)}removeMatchingKeysForTargetId(e,n){return this._i.jr(n),M.resolve()}getMatchingKeysForTargetId(e,n){const r=this._i.Hr(n);return M.resolve(r)}containsKey(e,n){return M.resolve(this._i.containsKey(n))}}/**
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
 */class Bm{constructor(e,n){this.ui={},this.overlays={},this.ci=new ga(0),this.li=!1,this.li=!0,this.hi=new Ww,this.referenceDelegate=e(this),this.Pi=new Qw(this),this.indexManager=new xw,this.remoteDocumentCache=function(s){return new Gw(s)}(r=>this.referenceDelegate.Ti(r)),this.serializer=new Dw(n),this.Ii=new qw(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new Hw,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.ui[e.toKey()];return r||(r=new zw(n,this.referenceDelegate),this.ui[e.toKey()]=r),r}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,n,r){se("MemoryPersistence","Starting transaction:",e);const s=new Xw(this.ci.next());return this.referenceDelegate.Ei(),r(s).next(i=>this.referenceDelegate.di(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Ai(e,n){return M.or(Object.values(this.ui).map(r=>()=>r.containsKey(e,n)))}}class Xw extends AI{constructor(e){super(),this.currentSequenceNumber=e}}class Ll{constructor(e){this.persistence=e,this.Ri=new Ml,this.Vi=null}static mi(e){return new Ll(e)}get fi(){if(this.Vi)return this.Vi;throw pe(60996)}addReference(e,n,r){return this.Ri.addReference(r,n),this.fi.delete(r.toString()),M.resolve()}removeReference(e,n,r){return this.Ri.removeReference(r,n),this.fi.add(r.toString()),M.resolve()}markPotentiallyOrphaned(e,n){return this.fi.add(n.toString()),M.resolve()}removeTarget(e,n){this.Ri.jr(n.targetId).forEach(s=>this.fi.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(s=>{s.forEach(i=>this.fi.add(i.toString()))}).next(()=>r.removeTargetData(e,n))}Ei(){this.Vi=new Set}di(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return M.forEach(this.fi,r=>{const s=ue.fromPath(r);return this.gi(e,s).next(i=>{i||n.removeEntry(s,ye.min())})}).next(()=>(this.Vi=null,n.apply(e)))}updateLimboDocument(e,n){return this.gi(e,n).next(r=>{r?this.fi.delete(n.toString()):this.fi.add(n.toString())})}Ti(e){return 0}gi(e,n){return M.or([()=>M.resolve(this.Ri.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Ai(e,n)])}}class Wo{constructor(e,n){this.persistence=e,this.pi=new Fr(r=>CI(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=Uw(this,n)}static mi(e,n){return new Wo(e,n)}Ei(){}di(e){return M.resolve()}forEachTarget(e,n){return this.persistence.getTargetCache().forEachTarget(e,n)}gr(e){const n=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>n.next(s=>r+s))}wr(e){let n=0;return this.pr(e,r=>{n++}).next(()=>n)}pr(e,n){return M.forEach(this.pi,(r,s)=>this.br(e,r,s).next(i=>i?M.resolve():n(s)))}removeTargets(e,n,r){return this.persistence.getTargetCache().removeTargets(e,n,r)}removeOrphanedDocuments(e,n){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ii(e,a=>this.br(e,a,n).next(c=>{c||(r++,i.removeEntry(a,ye.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,n){return this.pi.set(n,e.currentSequenceNumber),M.resolve()}removeTarget(e,n){const r=n.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,n,r){return this.pi.set(r,e.currentSequenceNumber),M.resolve()}removeReference(e,n,r){return this.pi.set(r,e.currentSequenceNumber),M.resolve()}updateLimboDocument(e,n){return this.pi.set(n,e.currentSequenceNumber),M.resolve()}Ti(e){let n=e.key.toString().length;return e.isFoundDocument()&&(n+=vo(e.data.value)),n}br(e,n,r){return M.or([()=>this.persistence.Ai(e,n),()=>this.persistence.getTargetCache().containsKey(e,n),()=>{const s=this.pi.get(n);return M.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class Fl{constructor(e,n,r,s){this.targetId=e,this.fromCache=n,this.Es=r,this.ds=s}static As(e,n){let r=Pe(),s=Pe();for(const i of n.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Fl(e,n.fromCache,r,s)}}/**
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
 */class Jw{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class Yw{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=function(){return WT()?8:SI(Ct())>0?6:4}()}initialize(e,n){this.ps=e,this.indexManager=n,this.Rs=!0}getDocumentsMatchingQuery(e,n,r,s){const i={result:null};return this.ys(e,n).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.ws(e,n,s,r).next(a=>{i.result=a})}).next(()=>{if(i.result)return;const a=new Jw;return this.Ss(e,n,a).next(c=>{if(i.result=c,this.Vs)return this.bs(e,n,a,c.size)})}).next(()=>i.result)}bs(e,n,r,s){return r.documentReadCount<this.fs?(Yr()<=Ce.DEBUG&&se("QueryEngine","SDK will not create cache indexes for query:",Zr(n),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),M.resolve()):(Yr()<=Ce.DEBUG&&se("QueryEngine","Query:",Zr(n),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.gs*s?(Yr()<=Ce.DEBUG&&se("QueryEngine","The SDK decides to create cache indexes for query:",Zr(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,on(n))):M.resolve())}ys(e,n){if(Td(n))return M.resolve(null);let r=on(n);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(n.limit!==null&&s===1&&(n=Bc(n,null,"F"),r=on(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const a=Pe(...i);return this.ps.getDocuments(e,a).next(c=>this.indexManager.getMinOffset(e,r).next(l=>{const h=this.Ds(n,c);return this.Cs(n,h,a,l.readTime)?this.ys(e,Bc(n,null,"F")):this.vs(e,h,n,l)}))})))}ws(e,n,r,s){return Td(n)||s.isEqual(ye.min())?M.resolve(null):this.ps.getDocuments(e,r).next(i=>{const a=this.Ds(n,i);return this.Cs(n,a,r,s)?M.resolve(null):(Yr()<=Ce.DEBUG&&se("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Zr(n)),this.vs(e,a,n,TI(s,_i)).next(c=>c))})}Ds(e,n){let r=new ct(vm(e));return n.forEach((s,i)=>{Ta(e,i)&&(r=r.add(i))}),r}Cs(e,n,r,s){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const i=e.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Ss(e,n,r){return Yr()<=Ce.DEBUG&&se("QueryEngine","Using full collection scan to execute query:",Zr(n)),this.ps.getDocumentsMatchingQuery(e,n,cr.min(),r)}vs(e,n,r,s){return this.ps.getDocumentsMatchingQuery(e,r,s).next(i=>(n.forEach(a=>{i=i.insert(a.key,a)}),i))}}/**
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
 */const Ul="LocalStore",Zw=3e8;class eA{constructor(e,n,r,s){this.persistence=e,this.Fs=n,this.serializer=s,this.Ms=new Xe(Re),this.xs=new Fr(i=>Rl(i),Pl),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(r)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new jw(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.Ms))}}function tA(t,e,n,r){return new eA(t,e,n,r)}async function jm(t,e){const n=Ee(t);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let s;return n.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,n.Bs(e),n.mutationQueue.getAllMutationBatches(r))).next(i=>{const a=[],c=[];let l=Pe();for(const h of s){a.push(h.batchId);for(const f of h.mutations)l=l.add(f.key)}for(const h of i){c.push(h.batchId);for(const f of h.mutations)l=l.add(f.key)}return n.localDocuments.getDocuments(r,l).next(h=>({Ls:h,removedBatchIds:a,addedBatchIds:c}))})})}function nA(t,e){const n=Ee(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=n.Ns.newChangeBuffer({trackRemovals:!0});return function(c,l,h,f){const p=h.batch,y=p.keys();let S=M.resolve();return y.forEach(R=>{S=S.next(()=>f.getEntry(l,R)).next(N=>{const k=h.docVersions.get(R);Fe(k!==null,48541),N.version.compareTo(k)<0&&(p.applyToRemoteDocument(N,h),N.isValidDocument()&&(N.setReadTime(h.commitVersion),f.addEntry(N)))})}),S.next(()=>c.mutationQueue.removeMutationBatch(l,p))}(n,r,e,i).next(()=>i.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let l=Pe();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(l=l.add(c.batch.mutations[h].key));return l}(e))).next(()=>n.localDocuments.getDocuments(r,s))})}function qm(t){const e=Ee(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Pi.getLastRemoteSnapshotVersion(n))}function rA(t,e){const n=Ee(t),r=e.snapshotVersion;let s=n.Ms;return n.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const a=n.Ns.newChangeBuffer({trackRemovals:!0});s=n.Ms;const c=[];e.targetChanges.forEach((f,p)=>{const y=s.get(p);if(!y)return;c.push(n.Pi.removeMatchingKeys(i,f.removedDocuments,p).next(()=>n.Pi.addMatchingKeys(i,f.addedDocuments,p)));let S=y.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?S=S.withResumeToken(yt.EMPTY_BYTE_STRING,ye.min()).withLastLimboFreeSnapshotVersion(ye.min()):f.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(f.resumeToken,r)),s=s.insert(p,S),function(N,k,L){return N.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-N.snapshotVersion.toMicroseconds()>=Zw?!0:L.addedDocuments.size+L.modifiedDocuments.size+L.removedDocuments.size>0}(y,S,f)&&c.push(n.Pi.updateTargetData(i,S))});let l=Dn(),h=Pe();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&c.push(n.persistence.referenceDelegate.updateLimboDocument(i,f))}),c.push(sA(i,a,e.documentUpdates).next(f=>{l=f.ks,h=f.qs})),!r.isEqual(ye.min())){const f=n.Pi.getLastRemoteSnapshotVersion(i).next(p=>n.Pi.setTargetsMetadata(i,i.currentSequenceNumber,r));c.push(f)}return M.waitFor(c).next(()=>a.apply(i)).next(()=>n.localDocuments.getLocalViewOfDocuments(i,l,h)).next(()=>l)}).then(i=>(n.Ms=s,i))}function sA(t,e,n){let r=Pe(),s=Pe();return n.forEach(i=>r=r.add(i)),e.getEntries(t,r).next(i=>{let a=Dn();return n.forEach((c,l)=>{const h=i.get(c);l.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(c)),l.isNoDocument()&&l.version.isEqual(ye.min())?(e.removeEntry(c,l.readTime),a=a.insert(c,l)):!h.isValidDocument()||l.version.compareTo(h.version)>0||l.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(l),a=a.insert(c,l)):se(Ul,"Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",l.version)}),{ks:a,qs:s}})}function iA(t,e){const n=Ee(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=Sl),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function oA(t,e){const n=Ee(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return n.Pi.getTargetData(r,e).next(i=>i?(s=i,M.resolve(s)):n.Pi.allocateTargetId(r).next(a=>(s=new Jn(e,a,"TargetPurposeListen",r.currentSequenceNumber),n.Pi.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=n.Ms.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.Ms=n.Ms.insert(r.targetId,r),n.xs.set(e,r.targetId)),r})}async function zc(t,e,n){const r=Ee(t),s=r.Ms.get(e),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!As(a))throw a;se(Ul,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Ms=r.Ms.remove(e),r.xs.delete(s.target)}function xd(t,e,n){const r=Ee(t);let s=ye.min(),i=Pe();return r.persistence.runTransaction("Execute query","readwrite",a=>function(l,h,f){const p=Ee(l),y=p.xs.get(f);return y!==void 0?M.resolve(p.Ms.get(y)):p.Pi.getTargetData(h,f)}(r,a,on(e)).next(c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(a,c.targetId).next(l=>{i=l})}).next(()=>r.Fs.getDocumentsMatchingQuery(a,e,n?s:ye.min(),n?i:Pe())).next(c=>(aA(r,zI(e),c),{documents:c,Qs:i})))}function aA(t,e,n){let r=t.Os.get(e)||ye.min();n.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),t.Os.set(e,r)}class Vd{constructor(){this.activeTargetIds=YI()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class cA{constructor(){this.Mo=new Vd,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e,n=!0){return n&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,n,r){this.xo[e]=n}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new Vd,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class lA{Oo(e){}shutdown(){}}/**
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
 */const Od="ConnectivityMonitor";class Md{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){se(Od,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){se(Od,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let lo=null;function Gc(){return lo===null?lo=function(){return 268435456+Math.round(2147483648*Math.random())}():lo++,"0x"+lo.toString(16)}/**
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
 */const hc="RestConnection",uA={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class hA{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Uo=n+"://"+e.host,this.Ko=`projects/${r}/databases/${s}`,this.Wo=this.databaseId.database===Uo?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Go(e,n,r,s,i){const a=Gc(),c=this.zo(e,n.toUriEncodedString());se(hc,`Sending RPC '${e}' ${a}:`,c,r);const l={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(l,s,i);const{host:h}=new URL(c),f=Ts(h);return this.Jo(e,c,l,r,f).then(p=>(se(hc,`Received RPC '${e}' ${a}: `,p),p),p=>{throw fs(hc,`RPC '${e}' ${a} failed with error: `,p,"url: ",c,"request:",r),p})}Ho(e,n,r,s,i,a){return this.Go(e,n,r,s,i)}jo(e,n,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Is}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}zo(e,n){const r=uA[e];return`${this.Uo}/v1/${n}:${r}`}terminate(){}}/**
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
 */class dA{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}/**
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
 */const It="WebChannelConnection";class fA extends hA{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,n,r,s,i){const a=Gc();return new Promise((c,l)=>{const h=new zp;h.setWithCredentials(!0),h.listenOnce(Gp.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case yo.NO_ERROR:const p=h.getResponseJson();se(It,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(p)),c(p);break;case yo.TIMEOUT:se(It,`RPC '${e}' ${a} timed out`),l(new re(O.DEADLINE_EXCEEDED,"Request time out"));break;case yo.HTTP_ERROR:const y=h.getStatus();if(se(It,`RPC '${e}' ${a} failed with status:`,y,"response text:",h.getResponseText()),y>0){let S=h.getResponseJson();Array.isArray(S)&&(S=S[0]);const R=S?.error;if(R&&R.status&&R.message){const N=function(L){const q=L.toLowerCase().replace(/_/g,"-");return Object.values(O).indexOf(q)>=0?q:O.UNKNOWN}(R.status);l(new re(N,R.message))}else l(new re(O.UNKNOWN,"Server responded with status "+h.getStatus()))}else l(new re(O.UNAVAILABLE,"Connection failed."));break;default:pe(9055,{l_:e,streamId:a,h_:h.getLastErrorCode(),P_:h.getLastError()})}}finally{se(It,`RPC '${e}' ${a} completed.`)}});const f=JSON.stringify(s);se(It,`RPC '${e}' ${a} sending request:`,s),h.send(n,"POST",f,r,15)})}T_(e,n,r){const s=Gc(),i=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=Xp(),c=Qp(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(l.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(l.useFetchStreams=!0),this.jo(l.initMessageHeaders,n,r),l.encodeInitMessageHeaders=!0;const f=i.join("");se(It,`Creating RPC '${e}' stream ${s}: ${f}`,l);const p=a.createWebChannel(f,l);this.I_(p);let y=!1,S=!1;const R=new dA({Yo:k=>{S?se(It,`Not sending because RPC '${e}' stream ${s} is closed:`,k):(y||(se(It,`Opening RPC '${e}' stream ${s} transport.`),p.open(),y=!0),se(It,`RPC '${e}' stream ${s} sending:`,k),p.send(k))},Zo:()=>p.close()}),N=(k,L,q)=>{k.listen(L,H=>{try{q(H)}catch(z){setTimeout(()=>{throw z},0)}})};return N(p,zs.EventType.OPEN,()=>{S||(se(It,`RPC '${e}' stream ${s} transport opened.`),R.o_())}),N(p,zs.EventType.CLOSE,()=>{S||(S=!0,se(It,`RPC '${e}' stream ${s} transport closed`),R.a_(),this.E_(p))}),N(p,zs.EventType.ERROR,k=>{S||(S=!0,fs(It,`RPC '${e}' stream ${s} transport errored. Name:`,k.name,"Message:",k.message),R.a_(new re(O.UNAVAILABLE,"The operation could not be completed")))}),N(p,zs.EventType.MESSAGE,k=>{if(!S){const L=k.data[0];Fe(!!L,16349);const q=L,H=q?.error||q[0]?.error;if(H){se(It,`RPC '${e}' stream ${s} received error:`,H);const z=H.status;let oe=function(_){const m=tt[_];if(m!==void 0)return km(m)}(z),_e=H.message;oe===void 0&&(oe=O.INTERNAL,_e="Unknown error status: "+z+" with message "+H.message),S=!0,R.a_(new re(oe,_e)),p.close()}else se(It,`RPC '${e}' stream ${s} received:`,L),R.u_(L)}}),N(c,Kp.STAT_EVENT,k=>{k.stat===Vc.PROXY?se(It,`RPC '${e}' stream ${s} detected buffering proxy`):k.stat===Vc.NOPROXY&&se(It,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{R.__()},0),R}terminate(){this.c_.forEach(e=>e.close()),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter(n=>n===e)}}function dc(){return typeof document<"u"?document:null}/**
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
 */function Aa(t){return new _w(t,!0)}/**
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
 */class Hm{constructor(e,n,r=1e3,s=1.5,i=6e4){this.Mi=e,this.timerId=n,this.d_=r,this.A_=s,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const n=Math.floor(this.V_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,n-r);s>0&&se("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,s,()=>(this.f_=Date.now(),e())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
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
 */const Ld="PersistentStream";class Wm{constructor(e,n,r,s,i,a,c,l){this.Mi=e,this.S_=r,this.b_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Hm(e,n)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,n){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():n&&n.code===O.RESOURCE_EXHAUSTED?(kn(n.toString()),kn("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):n&&n.code===O.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(n)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),n=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.D_===n&&this.G_(r,s)},r=>{e(()=>{const s=new re(O.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)})})}G_(e,n){const r=this.W_(this.D_);this.stream=this.j_(e,n),this.stream.Xo(()=>{r(()=>this.listener.Xo())}),this.stream.t_(()=>{r(()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.t_()))}),this.stream.r_(s=>{r(()=>this.z_(s))}),this.stream.onMessage(s=>{r(()=>++this.F_==1?this.J_(s):this.onNext(s))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return se(Ld,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return n=>{this.Mi.enqueueAndForget(()=>this.D_===e?n():(se(Ld,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class pA extends Wm{constructor(e,n,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,s,a),this.serializer=i}j_(e,n){return this.connection.T_("Listen",e,n)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const n=Tw(this.serializer,e),r=function(i){if(!("targetChange"in i))return ye.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?ye.min():a.readTime?cn(a.readTime):ye.min()}(e);return this.listener.H_(n,r)}Y_(e){const n={};n.database=Wc(this.serializer),n.addTarget=function(i,a){let c;const l=a.target;if(c=Uc(l)?{documents:ww(i,l)}:{query:Aw(i,l).ft},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=xm(i,a.resumeToken);const h=jc(i,a.expectedCount);h!==null&&(c.expectedCount=h)}else if(a.snapshotVersion.compareTo(ye.min())>0){c.readTime=Ho(i,a.snapshotVersion.toTimestamp());const h=jc(i,a.expectedCount);h!==null&&(c.expectedCount=h)}return c}(this.serializer,e);const r=bw(this.serializer,e);r&&(n.labels=r),this.q_(n)}Z_(e){const n={};n.database=Wc(this.serializer),n.removeTarget=e,this.q_(n)}}class mA extends Wm{constructor(e,n,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,s,a),this.serializer=i}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,n){return this.connection.T_("Write",e,n)}J_(e){return Fe(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,Fe(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){Fe(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const n=Iw(e.writeResults,e.commitTime),r=cn(e.commitTime);return this.listener.na(r,n)}ra(){const e={};e.database=Wc(this.serializer),this.q_(e)}ea(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>Ew(this.serializer,r))};this.q_(n)}}/**
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
 */class gA{}class _A extends gA{constructor(e,n,r,s){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new re(O.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,n,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.Go(e,qc(n,r),s,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===O.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new re(O.UNKNOWN,i.toString())})}Ho(e,n,r,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.Ho(e,qc(n,r),s,a,c,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===O.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new re(O.UNKNOWN,a.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class yA{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(kn(n),this.aa=!1):se("OnlineStateTracker",n)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
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
 */const Or="RemoteStore";class vA{constructor(e,n,r,s,i){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=i,this.Aa.Oo(a=>{r.enqueueAndForget(async()=>{$r(this)&&(se(Or,"Restarting streams for network reachability change."),await async function(l){const h=Ee(l);h.Ea.add(4),await xi(h),h.Ra.set("Unknown"),h.Ea.delete(4),await Sa(h)}(this))})}),this.Ra=new yA(r,s)}}async function Sa(t){if($r(t))for(const e of t.da)await e(!0)}async function xi(t){for(const e of t.da)await e(!1)}function zm(t,e){const n=Ee(t);n.Ia.has(e.targetId)||(n.Ia.set(e.targetId,e),ql(n)?jl(n):bs(n).O_()&&Bl(n,e))}function $l(t,e){const n=Ee(t),r=bs(n);n.Ia.delete(e),r.O_()&&Gm(n,e),n.Ia.size===0&&(r.O_()?r.L_():$r(n)&&n.Ra.set("Unknown"))}function Bl(t,e){if(t.Va.Ue(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(ye.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}bs(t).Y_(e)}function Gm(t,e){t.Va.Ue(e),bs(t).Z_(e)}function jl(t){t.Va=new fw({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),At:e=>t.Ia.get(e)||null,ht:()=>t.datastore.serializer.databaseId}),bs(t).start(),t.Ra.ua()}function ql(t){return $r(t)&&!bs(t).x_()&&t.Ia.size>0}function $r(t){return Ee(t).Ea.size===0}function Km(t){t.Va=void 0}async function TA(t){t.Ra.set("Online")}async function EA(t){t.Ia.forEach((e,n)=>{Bl(t,e)})}async function IA(t,e){Km(t),ql(t)?(t.Ra.ha(e),jl(t)):t.Ra.set("Unknown")}async function wA(t,e,n){if(t.Ra.set("Online"),e instanceof Nm&&e.state===2&&e.cause)try{await async function(s,i){const a=i.cause;for(const c of i.targetIds)s.Ia.has(c)&&(await s.remoteSyncer.rejectListen(c,a),s.Ia.delete(c),s.Va.removeTarget(c))}(t,e)}catch(r){se(Or,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await zo(t,r)}else if(e instanceof Io?t.Va.Ze(e):e instanceof Dm?t.Va.st(e):t.Va.tt(e),!n.isEqual(ye.min()))try{const r=await qm(t.localStore);n.compareTo(r)>=0&&await function(i,a){const c=i.Va.Tt(a);return c.targetChanges.forEach((l,h)=>{if(l.resumeToken.approximateByteSize()>0){const f=i.Ia.get(h);f&&i.Ia.set(h,f.withResumeToken(l.resumeToken,a))}}),c.targetMismatches.forEach((l,h)=>{const f=i.Ia.get(l);if(!f)return;i.Ia.set(l,f.withResumeToken(yt.EMPTY_BYTE_STRING,f.snapshotVersion)),Gm(i,l);const p=new Jn(f.target,l,h,f.sequenceNumber);Bl(i,p)}),i.remoteSyncer.applyRemoteEvent(c)}(t,n)}catch(r){se(Or,"Failed to raise snapshot:",r),await zo(t,r)}}async function zo(t,e,n){if(!As(e))throw e;t.Ea.add(1),await xi(t),t.Ra.set("Offline"),n||(n=()=>qm(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{se(Or,"Retrying IndexedDB access"),await n(),t.Ea.delete(1),await Sa(t)})}function Qm(t,e){return e().catch(n=>zo(t,n,e))}async function ba(t){const e=Ee(t),n=dr(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:Sl;for(;AA(e);)try{const s=await iA(e.localStore,r);if(s===null){e.Ta.length===0&&n.L_();break}r=s.batchId,SA(e,s)}catch(s){await zo(e,s)}Xm(e)&&Jm(e)}function AA(t){return $r(t)&&t.Ta.length<10}function SA(t,e){t.Ta.push(e);const n=dr(t);n.O_()&&n.X_&&n.ea(e.mutations)}function Xm(t){return $r(t)&&!dr(t).x_()&&t.Ta.length>0}function Jm(t){dr(t).start()}async function bA(t){dr(t).ra()}async function CA(t){const e=dr(t);for(const n of t.Ta)e.ea(n.mutations)}async function RA(t,e,n){const r=t.Ta.shift(),s=xl.from(r,e,n);await Qm(t,()=>t.remoteSyncer.applySuccessfulWrite(s)),await ba(t)}async function PA(t,e){e&&dr(t).X_&&await async function(r,s){if(function(a){return uw(a)&&a!==O.ABORTED}(s.code)){const i=r.Ta.shift();dr(r).B_(),await Qm(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await ba(r)}}(t,e),Xm(t)&&Jm(t)}async function Fd(t,e){const n=Ee(t);n.asyncQueue.verifyOperationInProgress(),se(Or,"RemoteStore received new credentials");const r=$r(n);n.Ea.add(3),await xi(n),r&&n.Ra.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.Ea.delete(3),await Sa(n)}async function kA(t,e){const n=Ee(t);e?(n.Ea.delete(2),await Sa(n)):e||(n.Ea.add(2),await xi(n),n.Ra.set("Unknown"))}function bs(t){return t.ma||(t.ma=function(n,r,s){const i=Ee(n);return i.sa(),new pA(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(t.datastore,t.asyncQueue,{Xo:TA.bind(null,t),t_:EA.bind(null,t),r_:IA.bind(null,t),H_:wA.bind(null,t)}),t.da.push(async e=>{e?(t.ma.B_(),ql(t)?jl(t):t.Ra.set("Unknown")):(await t.ma.stop(),Km(t))})),t.ma}function dr(t){return t.fa||(t.fa=function(n,r,s){const i=Ee(n);return i.sa(),new mA(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(t.datastore,t.asyncQueue,{Xo:()=>Promise.resolve(),t_:bA.bind(null,t),r_:PA.bind(null,t),ta:CA.bind(null,t),na:RA.bind(null,t)}),t.da.push(async e=>{e?(t.fa.B_(),await ba(t)):(await t.fa.stop(),t.Ta.length>0&&(se(Or,`Stopping write stream with ${t.Ta.length} pending writes`),t.Ta=[]))})),t.fa}/**
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
 */class Hl{constructor(e,n,r,s,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new kr,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,s,i){const a=Date.now()+r,c=new Hl(e,n,a,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new re(O.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Wl(t,e){if(kn("AsyncQueue",`${e}: ${t}`),As(t))return new re(O.UNAVAILABLE,`${e}: ${t}`);throw t}/**
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
 */class os{static emptySet(e){return new os(e.comparator)}constructor(e){this.comparator=e?(n,r)=>e(n,r)||ue.comparator(n.key,r.key):(n,r)=>ue.comparator(n.key,r.key),this.keyedMap=Gs(),this.sortedSet=new Xe(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof os)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new os;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
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
 */class Ud{constructor(){this.ga=new Xe(ue.comparator)}track(e){const n=e.doc.key,r=this.ga.get(n);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(n,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(n):e.type===1&&r.type===2?this.ga=this.ga.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(n,{type:2,doc:e.doc}):pe(63341,{Rt:e,pa:r}):this.ga=this.ga.insert(n,e)}ya(){const e=[];return this.ga.inorderTraversal((n,r)=>{e.push(r)}),e}}class ys{constructor(e,n,r,s,i,a,c,l,h){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=h}static fromInitialDocuments(e,n,r,s,i){const a=[];return n.forEach(c=>{a.push({type:0,doc:c})}),new ys(e,n,os.emptySet(n),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&va(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let s=0;s<n.length;s++)if(n[s].type!==r[s].type||!n[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
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
 */class DA{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class NA{constructor(){this.queries=$d(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(n,r){const s=Ee(n),i=s.queries;s.queries=$d(),i.forEach((a,c)=>{for(const l of c.Sa)l.onError(r)})})(this,new re(O.ABORTED,"Firestore shutting down"))}}function $d(){return new Fr(t=>ym(t),va)}async function xA(t,e){const n=Ee(t);let r=3;const s=e.query;let i=n.queries.get(s);i?!i.ba()&&e.Da()&&(r=2):(i=new DA,r=e.Da()?0:1);try{switch(r){case 0:i.wa=await n.onListen(s,!0);break;case 1:i.wa=await n.onListen(s,!1);break;case 2:await n.onFirstRemoteStoreListen(s)}}catch(a){const c=Wl(a,`Initialization of query '${Zr(e.query)}' failed`);return void e.onError(c)}n.queries.set(s,i),i.Sa.push(e),e.va(n.onlineState),i.wa&&e.Fa(i.wa)&&zl(n)}async function VA(t,e){const n=Ee(t),r=e.query;let s=3;const i=n.queries.get(r);if(i){const a=i.Sa.indexOf(e);a>=0&&(i.Sa.splice(a,1),i.Sa.length===0?s=e.Da()?0:1:!i.ba()&&e.Da()&&(s=2))}switch(s){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function OA(t,e){const n=Ee(t);let r=!1;for(const s of e){const i=s.query,a=n.queries.get(i);if(a){for(const c of a.Sa)c.Fa(s)&&(r=!0);a.wa=s}}r&&zl(n)}function MA(t,e,n){const r=Ee(t),s=r.queries.get(e);if(s)for(const i of s.Sa)i.onError(n);r.queries.delete(e)}function zl(t){t.Ca.forEach(e=>{e.next()})}var Kc,Bd;(Bd=Kc||(Kc={})).Ma="default",Bd.Cache="cache";class LA{constructor(e,n,r){this.query=e,this.xa=n,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new ys(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),n=!0):this.La(e,this.onlineState)&&(this.ka(e),n=!0),this.Na=e,n}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let n=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),n=!0),n}La(e,n){if(!e.fromCache||!this.Da())return!0;const r=n!=="Offline";return(!this.options.qa||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const n=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}ka(e){e=ys.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Kc.Cache}}/**
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
 */class Ym{constructor(e){this.key=e}}class Zm{constructor(e){this.key=e}}class FA{constructor(e,n){this.query=e,this.Ya=n,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=Pe(),this.mutatedKeys=Pe(),this.eu=vm(e),this.tu=new os(this.eu)}get nu(){return this.Ya}ru(e,n){const r=n?n.iu:new Ud,s=n?n.tu:this.tu;let i=n?n.mutatedKeys:this.mutatedKeys,a=s,c=!1;const l=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((f,p)=>{const y=s.get(f),S=Ta(this.query,p)?p:null,R=!!y&&this.mutatedKeys.has(y.key),N=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations);let k=!1;y&&S?y.data.isEqual(S.data)?R!==N&&(r.track({type:3,doc:S}),k=!0):this.su(y,S)||(r.track({type:2,doc:S}),k=!0,(l&&this.eu(S,l)>0||h&&this.eu(S,h)<0)&&(c=!0)):!y&&S?(r.track({type:0,doc:S}),k=!0):y&&!S&&(r.track({type:1,doc:y}),k=!0,(l||h)&&(c=!0)),k&&(S?(a=a.add(S),i=N?i.add(f):i.delete(f)):(a=a.delete(f),i=i.delete(f)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),i=i.delete(f.key),r.track({type:1,doc:f})}return{tu:a,iu:r,Cs:c,mutatedKeys:i}}su(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r,s){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const a=e.iu.ya();a.sort((f,p)=>function(S,R){const N=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return pe(20277,{Rt:k})}};return N(S)-N(R)}(f.type,p.type)||this.eu(f.doc,p.doc)),this.ou(r),s=s??!1;const c=n&&!s?this._u():[],l=this.Xa.size===0&&this.current&&!s?1:0,h=l!==this.Za;return this.Za=l,a.length!==0||h?{snapshot:new ys(this.query,e.tu,i,a,e.mutatedKeys,l===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Ud,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(n=>this.Ya=this.Ya.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Ya=this.Ya.delete(n)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=Pe(),this.tu.forEach(r=>{this.uu(r.key)&&(this.Xa=this.Xa.add(r.key))});const n=[];return e.forEach(r=>{this.Xa.has(r)||n.push(new Zm(r))}),this.Xa.forEach(r=>{e.has(r)||n.push(new Ym(r))}),n}cu(e){this.Ya=e.Qs,this.Xa=Pe();const n=this.ru(e.documents);return this.applyChanges(n,!0)}lu(){return ys.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const Gl="SyncEngine";class UA{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class $A{constructor(e){this.key=e,this.hu=!1}}class BA{constructor(e,n,r,s,i,a){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new Fr(c=>ym(c),va),this.Iu=new Map,this.Eu=new Set,this.du=new Xe(ue.comparator),this.Au=new Map,this.Ru=new Ml,this.Vu={},this.mu=new Map,this.fu=_s.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function jA(t,e,n=!0){const r=ig(t);let s;const i=r.Tu.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await eg(r,e,n,!0),s}async function qA(t,e){const n=ig(t);await eg(n,e,!0,!1)}async function eg(t,e,n,r){const s=await oA(t.localStore,on(e)),i=s.targetId,a=t.sharedClientState.addLocalQueryTarget(i,n);let c;return r&&(c=await HA(t,e,i,a==="current",s.resumeToken)),t.isPrimaryClient&&n&&zm(t.remoteStore,s),c}async function HA(t,e,n,r,s){t.pu=(p,y,S)=>async function(N,k,L,q){let H=k.view.ru(L);H.Cs&&(H=await xd(N.localStore,k.query,!1).then(({documents:w})=>k.view.ru(w,H)));const z=q&&q.targetChanges.get(k.targetId),oe=q&&q.targetMismatches.get(k.targetId)!=null,_e=k.view.applyChanges(H,N.isPrimaryClient,z,oe);return qd(N,k.targetId,_e.au),_e.snapshot}(t,p,y,S);const i=await xd(t.localStore,e,!0),a=new FA(e,i.Qs),c=a.ru(i.documents),l=Ni.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",s),h=a.applyChanges(c,t.isPrimaryClient,l);qd(t,n,h.au);const f=new UA(e,n,a);return t.Tu.set(e,f),t.Iu.has(n)?t.Iu.get(n).push(e):t.Iu.set(n,[e]),h.snapshot}async function WA(t,e,n){const r=Ee(t),s=r.Tu.get(e),i=r.Iu.get(s.targetId);if(i.length>1)return r.Iu.set(s.targetId,i.filter(a=>!va(a,e))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await zc(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),n&&$l(r.remoteStore,s.targetId),Qc(r,s.targetId)}).catch(ws)):(Qc(r,s.targetId),await zc(r.localStore,s.targetId,!0))}async function zA(t,e){const n=Ee(t),r=n.Tu.get(e),s=n.Iu.get(r.targetId);n.isPrimaryClient&&s.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),$l(n.remoteStore,r.targetId))}async function GA(t,e,n){const r=e0(t);try{const s=await function(a,c){const l=Ee(a),h=Ge.now(),f=c.reduce((S,R)=>S.add(R.key),Pe());let p,y;return l.persistence.runTransaction("Locally write mutations","readwrite",S=>{let R=Dn(),N=Pe();return l.Ns.getEntries(S,f).next(k=>{R=k,R.forEach((L,q)=>{q.isValidDocument()||(N=N.add(L))})}).next(()=>l.localDocuments.getOverlayedDocuments(S,R)).next(k=>{p=k;const L=[];for(const q of c){const H=iw(q,p.get(q.key).overlayedDocument);H!=null&&L.push(new Ur(q.key,H,um(H.value.mapValue),an.exists(!0)))}return l.mutationQueue.addMutationBatch(S,h,L,c)}).next(k=>{y=k;const L=k.applyToLocalDocumentSet(p,N);return l.documentOverlayCache.saveOverlays(S,k.batchId,L)})}).then(()=>({batchId:y.batchId,changes:Em(p)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(a,c,l){let h=a.Vu[a.currentUser.toKey()];h||(h=new Xe(Re)),h=h.insert(c,l),a.Vu[a.currentUser.toKey()]=h}(r,s.batchId,n),await Vi(r,s.changes),await ba(r.remoteStore)}catch(s){const i=Wl(s,"Failed to persist write");n.reject(i)}}async function tg(t,e){const n=Ee(t);try{const r=await rA(n.localStore,e);e.targetChanges.forEach((s,i)=>{const a=n.Au.get(i);a&&(Fe(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.hu=!0:s.modifiedDocuments.size>0?Fe(a.hu,14607):s.removedDocuments.size>0&&(Fe(a.hu,42227),a.hu=!1))}),await Vi(n,r,e)}catch(r){await ws(r)}}function jd(t,e,n){const r=Ee(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const s=[];r.Tu.forEach((i,a)=>{const c=a.view.va(e);c.snapshot&&s.push(c.snapshot)}),function(a,c){const l=Ee(a);l.onlineState=c;let h=!1;l.queries.forEach((f,p)=>{for(const y of p.Sa)y.va(c)&&(h=!0)}),h&&zl(l)}(r.eventManager,e),s.length&&r.Pu.H_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function KA(t,e,n){const r=Ee(t);r.sharedClientState.updateQueryState(e,"rejected",n);const s=r.Au.get(e),i=s&&s.key;if(i){let a=new Xe(ue.comparator);a=a.insert(i,bt.newNoDocument(i,ye.min()));const c=Pe().add(i),l=new wa(ye.min(),new Map,new Xe(Re),a,c);await tg(r,l),r.du=r.du.remove(i),r.Au.delete(e),Kl(r)}else await zc(r.localStore,e,!1).then(()=>Qc(r,e,n)).catch(ws)}async function QA(t,e){const n=Ee(t),r=e.batch.batchId;try{const s=await nA(n.localStore,e);rg(n,r,null),ng(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Vi(n,s)}catch(s){await ws(s)}}async function XA(t,e,n){const r=Ee(t);try{const s=await function(a,c){const l=Ee(a);return l.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let f;return l.mutationQueue.lookupMutationBatch(h,c).next(p=>(Fe(p!==null,37113),f=p.keys(),l.mutationQueue.removeMutationBatch(h,p))).next(()=>l.mutationQueue.performConsistencyCheck(h)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(h,f,c)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f)).next(()=>l.localDocuments.getDocuments(h,f))})}(r.localStore,e);rg(r,e,n),ng(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await Vi(r,s)}catch(s){await ws(s)}}function ng(t,e){(t.mu.get(e)||[]).forEach(n=>{n.resolve()}),t.mu.delete(e)}function rg(t,e,n){const r=Ee(t);let s=r.Vu[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(n?i.reject(n):i.resolve(),s=s.remove(e)),r.Vu[r.currentUser.toKey()]=s}}function Qc(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Iu.get(e))t.Tu.delete(r),n&&t.Pu.yu(r,n);t.Iu.delete(e),t.isPrimaryClient&&t.Ru.jr(e).forEach(r=>{t.Ru.containsKey(r)||sg(t,r)})}function sg(t,e){t.Eu.delete(e.path.canonicalString());const n=t.du.get(e);n!==null&&($l(t.remoteStore,n),t.du=t.du.remove(e),t.Au.delete(n),Kl(t))}function qd(t,e,n){for(const r of n)r instanceof Ym?(t.Ru.addReference(r.key,e),JA(t,r)):r instanceof Zm?(se(Gl,"Document no longer in limbo: "+r.key),t.Ru.removeReference(r.key,e),t.Ru.containsKey(r.key)||sg(t,r.key)):pe(19791,{wu:r})}function JA(t,e){const n=e.key,r=n.path.canonicalString();t.du.get(n)||t.Eu.has(r)||(se(Gl,"New document in limbo: "+n),t.Eu.add(r),Kl(t))}function Kl(t){for(;t.Eu.size>0&&t.du.size<t.maxConcurrentLimboResolutions;){const e=t.Eu.values().next().value;t.Eu.delete(e);const n=new ue(He.fromString(e)),r=t.fu.next();t.Au.set(r,new $A(n)),t.du=t.du.insert(n,r),zm(t.remoteStore,new Jn(on(kl(n.path)),r,"TargetPurposeLimboResolution",ga.ce))}}async function Vi(t,e,n){const r=Ee(t),s=[],i=[],a=[];r.Tu.isEmpty()||(r.Tu.forEach((c,l)=>{a.push(r.pu(l,e,n).then(h=>{if((h||n)&&r.isPrimaryClient){const f=h?!h.fromCache:n?.targetChanges.get(l.targetId)?.current;r.sharedClientState.updateQueryState(l.targetId,f?"current":"not-current")}if(h){s.push(h);const f=Fl.As(l.targetId,h);i.push(f)}}))}),await Promise.all(a),r.Pu.H_(s),await async function(l,h){const f=Ee(l);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>M.forEach(h,y=>M.forEach(y.Es,S=>f.persistence.referenceDelegate.addReference(p,y.targetId,S)).next(()=>M.forEach(y.ds,S=>f.persistence.referenceDelegate.removeReference(p,y.targetId,S)))))}catch(p){if(!As(p))throw p;se(Ul,"Failed to update sequence numbers: "+p)}for(const p of h){const y=p.targetId;if(!p.fromCache){const S=f.Ms.get(y),R=S.snapshotVersion,N=S.withLastLimboFreeSnapshotVersion(R);f.Ms=f.Ms.insert(y,N)}}}(r.localStore,i))}async function YA(t,e){const n=Ee(t);if(!n.currentUser.isEqual(e)){se(Gl,"User change. New user:",e.toKey());const r=await jm(n.localStore,e);n.currentUser=e,function(i,a){i.mu.forEach(c=>{c.forEach(l=>{l.reject(new re(O.CANCELLED,a))})}),i.mu.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Vi(n,r.Ls)}}function ZA(t,e){const n=Ee(t),r=n.Au.get(e);if(r&&r.hu)return Pe().add(r.key);{let s=Pe();const i=n.Iu.get(e);if(!i)return s;for(const a of i){const c=n.Tu.get(a);s=s.unionWith(c.view.nu)}return s}}function ig(t){const e=Ee(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=tg.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=ZA.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=KA.bind(null,e),e.Pu.H_=OA.bind(null,e.eventManager),e.Pu.yu=MA.bind(null,e.eventManager),e}function e0(t){const e=Ee(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=QA.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=XA.bind(null,e),e}class Go{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Aa(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,n){return null}Mu(e,n){return null}vu(e){return tA(this.persistence,new Yw,e.initialUser,this.serializer)}Cu(e){return new Bm(Ll.mi,this.serializer)}Du(e){return new cA}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Go.provider={build:()=>new Go};class t0 extends Go{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,n){Fe(this.persistence.referenceDelegate instanceof Wo,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new Lw(r,e.asyncQueue,n)}Cu(e){const n=this.cacheSizeBytes!==void 0?Vt.withCacheSize(this.cacheSizeBytes):Vt.DEFAULT;return new Bm(r=>Wo.mi(r,n),this.serializer)}}class Xc{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>jd(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=YA.bind(null,this.syncEngine),await kA(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new NA}()}createDatastore(e){const n=Aa(e.databaseInfo.databaseId),r=function(i){return new fA(i)}(e.databaseInfo);return function(i,a,c,l){return new _A(i,a,c,l)}(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return function(r,s,i,a,c){return new vA(r,s,i,a,c)}(this.localStore,this.datastore,e.asyncQueue,n=>jd(this.syncEngine,n,0),function(){return Md.v()?new Md:new lA}())}createSyncEngine(e,n){return function(s,i,a,c,l,h,f){const p=new BA(s,i,a,c,l,h);return f&&(p.gu=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){await async function(n){const r=Ee(n);se(Or,"RemoteStore shutting down."),r.Ea.add(5),await xi(r),r.Aa.shutdown(),r.Ra.set("Unknown")}(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}Xc.provider={build:()=>new Xc};/**
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
 */class n0{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):kn("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
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
 */const fr="FirestoreClient";class r0{constructor(e,n,r,s,i){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=s,this.user=At.UNAUTHENTICATED,this.clientId=Al.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async a=>{se(fr,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(se(fr,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new kr;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=Wl(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function fc(t,e){t.asyncQueue.verifyOperationInProgress(),se(fr,"Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async s=>{r.isEqual(s)||(await jm(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function Hd(t,e){t.asyncQueue.verifyOperationInProgress();const n=await s0(t);se(fr,"Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(r=>Fd(e.remoteStore,r)),t.setAppCheckTokenChangeListener((r,s)=>Fd(e.remoteStore,s)),t._onlineComponents=e}async function s0(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){se(fr,"Using user provided OfflineComponentProvider");try{await fc(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(s){return s.name==="FirebaseError"?s.code===O.FAILED_PRECONDITION||s.code===O.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(n))throw n;fs("Error using user provided cache. Falling back to memory cache: "+n),await fc(t,new Go)}}else se(fr,"Using default OfflineComponentProvider"),await fc(t,new t0(void 0));return t._offlineComponents}async function og(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(se(fr,"Using user provided OnlineComponentProvider"),await Hd(t,t._uninitializedComponentsProvider._online)):(se(fr,"Using default OnlineComponentProvider"),await Hd(t,new Xc))),t._onlineComponents}function i0(t){return og(t).then(e=>e.syncEngine)}async function Wd(t){const e=await og(t),n=e.eventManager;return n.onListen=jA.bind(null,e.syncEngine),n.onUnlisten=WA.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=qA.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=zA.bind(null,e.syncEngine),n}/**
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
 */function ag(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
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
 */const zd=new Map;/**
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
 */const cg="firestore.googleapis.com",Gd=!0;class Kd{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new re(O.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=cg,this.ssl=Gd}else this.host=e.host,this.ssl=e.ssl??Gd;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=$m;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Ow)throw new re(O.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}vI("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=ag(e.experimentalLongPollingOptions??{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new re(O.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new re(O.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new re(O.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Ca{constructor(e,n,r,s){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Kd({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new re(O.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new re(O.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Kd(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new lI;switch(r.type){case"firstParty":return new fI(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new re(O.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=zd.get(n);r&&(se("ComponentProvider","Removing Datastore"),zd.delete(n),r.terminate())}(this),Promise.resolve()}}function o0(t,e,n,r={}){t=is(t,Ca);const s=Ts(e),i=t._getSettings(),a={...i,emulatorOptions:t._getEmulatorOptions()},c=`${e}:${n}`;s&&(Lp(`https://${c}`),Fp("Firestore",!0)),i.host!==cg&&i.host!==c&&fs("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const l={...i,host:c,ssl:s,emulatorOptions:r};if(!Nr(l,a)&&(t._setSettings(l),r.mockUserToken)){let h,f;if(typeof r.mockUserToken=="string")h=r.mockUserToken,f=At.MOCK_USER;else{h=MT(r.mockUserToken,t._app?.options.projectId);const p=r.mockUserToken.sub||r.mockUserToken.user_id;if(!p)throw new re(O.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");f=new At(p)}t._authCredentials=new uI(new Yp(h,f))}}/**
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
 */class Br{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Br(this.firestore,e,this._query)}}class at{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new sr(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new at(this.firestore,e,this._key)}toJSON(){return{type:at._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,n,r){if(ki(n,at._jsonSchema))return new at(e,r||null,new ue(He.fromString(n.referencePath)))}}at._jsonSchemaVersion="firestore/documentReference/1.0",at._jsonSchema={type:it("string",at._jsonSchemaVersion),referencePath:it("string")};class sr extends Br{constructor(e,n,r){super(e,n,kl(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new at(this.firestore,null,new ue(e))}withConverter(e){return new sr(this.firestore,e,this._path)}}function lg(t,e,...n){if(t=_t(t),Zp("collection","path",e),t instanceof Ca){const r=He.fromString(e,...n);return od(r),new sr(t,null,r)}{if(!(t instanceof at||t instanceof sr))throw new re(O.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(He.fromString(e,...n));return od(r),new sr(t.firestore,null,r)}}function ug(t,e,...n){if(t=_t(t),arguments.length===1&&(e=Al.newId()),Zp("doc","path",e),t instanceof Ca){const r=He.fromString(e,...n);return id(r),new at(t,null,new ue(r))}{if(!(t instanceof at||t instanceof sr))throw new re(O.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(He.fromString(e,...n));return id(r),new at(t.firestore,t instanceof sr?t.converter:null,new ue(r))}}/**
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
 */const Qd="AsyncQueue";class Xd{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Hm(this,"async_queue_retry"),this._c=()=>{const r=dc();r&&se(Qd,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const n=dc();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const n=dc();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const n=new kr;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xu.push(e),this.lc()))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!As(e))throw e;se(Qd,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const n=this.ac.then(()=>(this.rc=!0,e().catch(r=>{throw this.nc=r,this.rc=!1,kn("INTERNAL UNHANDLED ERROR: ",Jd(r)),r}).then(r=>(this.rc=!1,r))));return this.ac=n,n}enqueueAfterDelay(e,n,r){this.uc(),this.oc.indexOf(e)>-1&&(n=0);const s=Hl.createAndSchedule(this,e,n,r,i=>this.hc(i));return this.tc.push(s),s}uc(){this.nc&&pe(47125,{Pc:Jd(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const n of this.tc)if(n.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.tc)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.Tc()})}dc(e){this.oc.push(e)}hc(e){const n=this.tc.indexOf(e);this.tc.splice(n,1)}}function Jd(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+`
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
 */function Yd(t){return function(n,r){if(typeof n!="object"||n===null)return!1;const s=n;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(t,["next","error","complete"])}class Ai extends Ca{constructor(e,n,r,s){super(e,n,r,s),this.type="firestore",this._queue=new Xd,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Xd(e),this._firestoreClient=void 0,await e}}}function a0(t,e){const n=typeof t=="object"?t:jp(),r=typeof t=="string"?t:Uo,s=Il(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=VT("firestore");i&&o0(s,...i)}return s}function hg(t){if(t._terminated)throw new re(O.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||c0(t),t._firestoreClient}function c0(t){const e=t._freezeSettings(),n=function(s,i,a,c){return new kI(s,i,a,c.host,c.ssl,c.experimentalForceLongPolling,c.experimentalAutoDetectLongPolling,ag(c.experimentalLongPollingOptions),c.useFetchStreams,c.isUsingEmulator)}(t._databaseId,t._app?.options.appId||"",t._persistenceKey,e);t._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(t._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),t._firestoreClient=new r0(t._authCredentials,t._appCheckCredentials,t._queue,n,t._componentsProvider&&function(s){const i=s?._online.build();return{_offline:s?._offline.build(i),_online:i}}(t._componentsProvider))}/**
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
 */class jt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new jt(yt.fromBase64String(e))}catch(n){throw new re(O.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new jt(yt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:jt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(ki(e,jt._jsonSchema))return jt.fromBase64String(e.bytes)}}jt._jsonSchemaVersion="firestore/bytes/1.0",jt._jsonSchema={type:it("string",jt._jsonSchemaVersion),bytes:it("string")};/**
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
 */class Ql{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new re(O.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new gt(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class dg{constructor(e){this._methodName=e}}/**
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
 */class ln{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new re(O.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new re(O.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return Re(this._lat,e._lat)||Re(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:ln._jsonSchemaVersion}}static fromJSON(e){if(ki(e,ln._jsonSchema))return new ln(e.latitude,e.longitude)}}ln._jsonSchemaVersion="firestore/geoPoint/1.0",ln._jsonSchema={type:it("string",ln._jsonSchemaVersion),latitude:it("number"),longitude:it("number")};/**
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
 */class un{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:un._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(ki(e,un._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(n=>typeof n=="number"))return new un(e.vectorValues);throw new re(O.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}un._jsonSchemaVersion="firestore/vectorValue/1.0",un._jsonSchema={type:it("string",un._jsonSchemaVersion),vectorValues:it("object")};/**
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
 */const l0=/^__.*__$/;class u0{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new Ur(e,this.data,this.fieldMask,n,this.fieldTransforms):new Di(e,this.data,n,this.fieldTransforms)}}function fg(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw pe(40011,{Ac:t})}}class Xl{constructor(e,n,r,s,i,a){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Rc(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new Xl({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){const n=this.path?.child(e),r=this.Vc({path:n,fc:!1});return r.gc(e),r}yc(e){const n=this.path?.child(e),r=this.Vc({path:n,fc:!1});return r.Rc(),r}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return Ko(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc("Document fields must not be empty");if(fg(this.Ac)&&l0.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class h0{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||Aa(e)}Cc(e,n,r,s=!1){return new Xl({Ac:e,methodName:n,Dc:r,path:gt.emptyPath(),fc:!1,bc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function pg(t){const e=t._freezeSettings(),n=Aa(t._databaseId);return new h0(t._databaseId,!!e.ignoreUndefinedProperties,n)}function d0(t,e,n,r,s,i={}){const a=t.Cc(i.merge||i.mergeFields?2:0,e,n,s);_g("Data must be an object, but it was:",a,r);const c=mg(r,a);let l,h;if(i.merge)l=new Qt(a.fieldMask),h=a.fieldTransforms;else if(i.mergeFields){const f=[];for(const p of i.mergeFields){const y=p0(e,p,n);if(!a.contains(y))throw new re(O.INVALID_ARGUMENT,`Field '${y}' is specified in your field mask but missing from your input data.`);g0(f,y)||f.push(y)}l=new Qt(f),h=a.fieldTransforms.filter(p=>l.covers(p.field))}else l=null,h=a.fieldTransforms;return new u0(new Bt(c),l,h)}function f0(t,e,n,r=!1){return Jl(n,t.Cc(r?4:3,e))}function Jl(t,e){if(gg(t=_t(t)))return _g("Unsupported field value:",e,t),mg(t,e);if(t instanceof dg)return function(r,s){if(!fg(s.Ac))throw s.Sc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Sc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.fc&&e.Ac!==4)throw e.Sc("Nested arrays are not supported");return function(r,s){const i=[];let a=0;for(const c of r){let l=Jl(c,s.wc(a));l==null&&(l={nullValue:"NULL_VALUE"}),i.push(l),a++}return{arrayValue:{values:i}}}(t,e)}return function(r,s){if((r=_t(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return ZI(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=Ge.fromDate(r);return{timestampValue:Ho(s.serializer,i)}}if(r instanceof Ge){const i=new Ge(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Ho(s.serializer,i)}}if(r instanceof ln)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof jt)return{bytesValue:xm(s.serializer,r._byteString)};if(r instanceof at){const i=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(i))throw s.Sc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Ol(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof un)return function(a,c){return{mapValue:{fields:{[cm]:{stringValue:lm},[$o]:{arrayValue:{values:a.toArray().map(h=>{if(typeof h!="number")throw c.Sc("VectorValues must only contain numeric values.");return Dl(c.serializer,h)})}}}}}}(r,s);throw s.Sc(`Unsupported field value: ${ma(r)}`)}(t,e)}function mg(t,e){const n={};return nm(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Lr(t,(r,s)=>{const i=Jl(s,e.mc(r));i!=null&&(n[r]=i)}),{mapValue:{fields:n}}}function gg(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof Ge||t instanceof ln||t instanceof jt||t instanceof at||t instanceof dg||t instanceof un)}function _g(t,e,n){if(!gg(n)||!em(n)){const r=ma(n);throw r==="an object"?e.Sc(t+" a custom object"):e.Sc(t+" "+r)}}function p0(t,e,n){if((e=_t(e))instanceof Ql)return e._internalPath;if(typeof e=="string")return yg(t,e);throw Ko("Field path arguments must be of type string or ",t,!1,void 0,n)}const m0=new RegExp("[~\\*/\\[\\]]");function yg(t,e,n){if(e.search(m0)>=0)throw Ko(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new Ql(...e.split("."))._internalPath}catch{throw Ko(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Ko(t,e,n,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let c=`Function ${e}() called with invalid data`;n&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(i||a)&&(l+=" (found",i&&(l+=` in field ${r}`),a&&(l+=` in document ${s}`),l+=")"),new re(O.INVALID_ARGUMENT,c+t+l)}function g0(t,e){return t.some(n=>n.isEqual(e))}/**
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
 */class vg{constructor(e,n,r,s,i){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new at(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new _0(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(Yl("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class _0 extends vg{data(){return super.data()}}function Yl(t,e){return typeof e=="string"?yg(t,e):e instanceof Ql?e._internalPath:e._delegate._internalPath}/**
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
 */function y0(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new re(O.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Zl{}class Tg extends Zl{}function v0(t,e,...n){let r=[];e instanceof Zl&&r.push(e),r=r.concat(n),function(i){const a=i.filter(l=>l instanceof tu).length,c=i.filter(l=>l instanceof eu).length;if(a>1||a>0&&c>0)throw new re(O.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)t=s._apply(t);return t}class eu extends Tg{constructor(e,n,r){super(),this._field=e,this._op=n,this._value=r,this.type="where"}static _create(e,n,r){return new eu(e,n,r)}_apply(e){const n=this._parse(e);return Eg(e._query,n),new Br(e.firestore,e.converter,$c(e._query,n))}_parse(e){const n=pg(e.firestore);return function(i,a,c,l,h,f,p){let y;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new re(O.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){ef(p,f);const R=[];for(const N of p)R.push(Zd(l,i,N));y={arrayValue:{values:R}}}else y=Zd(l,i,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||ef(p,f),y=f0(c,a,p,f==="in"||f==="not-in");return st.create(h,f,y)}(e._query,"where",n,e.firestore._databaseId,this._field,this._op,this._value)}}class tu extends Zl{constructor(e,n){super(),this.type=e,this._queryConstraints=n}static _create(e,n){return new tu(e,n)}_parse(e){const n=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return n.length===1?n[0]:Zt.create(n,this._getOperator())}_apply(e){const n=this._parse(e);return n.getFilters().length===0?e:(function(s,i){let a=s;const c=i.getFlattenedFilters();for(const l of c)Eg(a,l),a=$c(a,l)}(e._query,n),new Br(e.firestore,e.converter,$c(e._query,n)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class nu extends Tg{constructor(e,n){super(),this._field=e,this._direction=n,this.type="orderBy"}static _create(e,n){return new nu(e,n)}_apply(e){const n=function(s,i,a){if(s.startAt!==null)throw new re(O.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new re(O.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Ei(i,a)}(e._query,this._field,this._direction);return new Br(e.firestore,e.converter,function(s,i){const a=s.explicitOrderBy.concat([i]);return new Ss(s.path,s.collectionGroup,a,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(e._query,n))}}function T0(t,e="asc"){const n=e,r=Yl("orderBy",t);return nu._create(r,n)}function Zd(t,e,n){if(typeof(n=_t(n))=="string"){if(n==="")throw new re(O.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!_m(e)&&n.indexOf("/")!==-1)throw new re(O.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=e.path.child(He.fromString(n));if(!ue.isDocumentKey(r))throw new re(O.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return pd(t,new ue(r))}if(n instanceof at)return pd(t,n._key);throw new re(O.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${ma(n)}.`)}function ef(t,e){if(!Array.isArray(t)||t.length===0)throw new re(O.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Eg(t,e){const n=function(s,i){for(const a of s)for(const c of a.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null}(t.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(n!==null)throw n===e.op?new re(O.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new re(O.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}class E0{convertValue(e,n="none"){switch(hr(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Ze(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(ur(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw pe(62114,{value:e})}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return Lr(e,(s,i)=>{r[s]=this.convertValue(i,n)}),r}convertVectorValue(e){const n=e.fields?.[$o].arrayValue?.values?.map(r=>Ze(r.doubleValue));return new un(n)}convertGeoPoint(e){return new ln(Ze(e.latitude),Ze(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=ya(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(yi(e));default:return null}}convertTimestamp(e){const n=lr(e);return new Ge(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=He.fromString(e);Fe(Um(r),9688,{name:e});const s=new vi(r.get(1),r.get(3)),i=new ue(r.popFirst(5));return s.isEqual(n)||kn(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
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
 */function I0(t,e,n){let r;return r=t?t.toFirestore(e):e,r}class Qs{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Dr extends vg{constructor(e,n,r,s,i,a){super(e,n,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new wo(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(Yl("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new re(O.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,n={};return n.type=Dr._jsonSchemaVersion,n.bundle="",n.bundleSource="DocumentSnapshot",n.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?n:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),n.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),n)}}Dr._jsonSchemaVersion="firestore/documentSnapshot/1.0",Dr._jsonSchema={type:it("string",Dr._jsonSchemaVersion),bundleSource:it("string","DocumentSnapshot"),bundleName:it("string"),bundle:it("string")};class wo extends Dr{data(e={}){return super.data(e)}}class as{constructor(e,n,r,s){this._firestore=e,this._userDataWriter=n,this._snapshot=s,this.metadata=new Qs(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new wo(this._firestore,this._userDataWriter,r.key,r,new Qs(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new re(O.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(c=>{const l=new wo(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Qs(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(c=>i||c.type!==3).map(c=>{const l=new wo(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Qs(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return c.type!==0&&(h=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),f=a.indexOf(c.doc.key)),{type:w0(c.type),doc:l,oldIndex:h,newIndex:f}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new re(O.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=as._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Al.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const n=[],r=[],s=[];return this.docs.forEach(i=>{i._document!==null&&(n.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function w0(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return pe(61501,{type:t})}}as._jsonSchemaVersion="firestore/querySnapshot/1.0",as._jsonSchema={type:it("string",as._jsonSchemaVersion),bundleSource:it("string","QuerySnapshot"),bundleName:it("string"),bundle:it("string")};class Ig extends E0{constructor(e){super(),this.firestore=e}convertBytes(e){return new jt(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new at(this.firestore,null,n)}}function A0(t){return wg(is(t.firestore,Ai),[new Nl(t._key,an.none())])}function S0(t,e){const n=is(t.firestore,Ai),r=ug(t),s=I0(t.converter,e);return wg(n,[d0(pg(t.firestore),"addDoc",r._key,s,t.converter!==null,{}).toMutation(r._key,an.exists(!1))]).then(()=>r)}function b0(t,...e){t=_t(t);let n={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||Yd(e[r])||(n=e[r++]);const s={includeMetadataChanges:n.includeMetadataChanges,source:n.source};if(Yd(e[r])){const l=e[r];e[r]=l.next?.bind(l),e[r+1]=l.error?.bind(l),e[r+2]=l.complete?.bind(l)}let i,a,c;if(t instanceof at)a=is(t.firestore,Ai),c=kl(t._key.path),i={next:l=>{e[r]&&e[r](C0(a,t,l))},error:e[r+1],complete:e[r+2]};else{const l=is(t,Br);a=is(l.firestore,Ai),c=l._query;const h=new Ig(a);i={next:f=>{e[r]&&e[r](new as(a,h,l,f))},error:e[r+1],complete:e[r+2]},y0(t._query)}return function(h,f,p,y){const S=new n0(y),R=new LA(f,S,p);return h.asyncQueue.enqueueAndForget(async()=>xA(await Wd(h),R)),()=>{S.Nu(),h.asyncQueue.enqueueAndForget(async()=>VA(await Wd(h),R))}}(hg(a),c,s,i)}function wg(t,e){return function(r,s){const i=new kr;return r.asyncQueue.enqueueAndForget(async()=>GA(await i0(r),s,i)),i.promise}(hg(t),e)}function C0(t,e,n){const r=n.docs.get(e._key),s=new Ig(t);return new Dr(t,s,e._key,r,new Qs(n.hasPendingWrites,n.fromCache),e.converter)}(function(e,n=!0){(function(s){Is=s})(Es),ds(new xr("firestore",(r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),c=new Ai(new hI(r.getProvider("auth-internal")),new pI(a,r.getProvider("app-check-internal")),function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new re(O.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new vi(h.options.projectId,f)}(a,s),a);return i={useFetchStreams:n,...i},c._setSettings(i),c},"PUBLIC").setMultipleInstances(!0)),nr(td,nd,e),nr(td,nd,"esm2020")})();var R0="firebase",P0="12.0.0";/**
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
 */nr(R0,P0,"app");function Ag(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const k0=Ag,Sg=new Ri("auth","Firebase",Ag());/**
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
 */const Qo=new Tl("@firebase/auth");function D0(t,...e){Qo.logLevel<=Ce.WARN&&Qo.warn(`Auth (${Es}): ${t}`,...e)}function Ao(t,...e){Qo.logLevel<=Ce.ERROR&&Qo.error(`Auth (${Es}): ${t}`,...e)}/**
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
 */function zt(t,...e){throw su(t,...e)}function Yt(t,...e){return su(t,...e)}function ru(t,e,n){const r={...k0(),[e]:n};return new Ri("auth","Firebase",r).create(e,{appName:t.name})}function hn(t){return ru(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function N0(t,e,n){const r=n;if(!(e instanceof r))throw r.name!==e.constructor.name&&zt(t,"argument-error"),ru(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function su(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return Sg.create(t,...e)}function fe(t,e,...n){if(!t)throw su(e,...n)}function wn(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Ao(e),new Error(e)}function Nn(t,e){t||wn(e)}/**
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
 */function Jc(){return typeof self<"u"&&self.location?.href||""}function x0(){return tf()==="http:"||tf()==="https:"}function tf(){return typeof self<"u"&&self.location?.protocol||null}/**
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
 */function V0(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(x0()||jT()||"connection"in navigator)?navigator.onLine:!0}function O0(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
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
 */class Oi{constructor(e,n){this.shortDelay=e,this.longDelay=n,Nn(n>e,"Short delay should be less than long delay!"),this.isMobile=UT()||qT()}get(){return V0()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function iu(t,e){Nn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
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
 */class bg{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;wn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;wn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;wn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const M0={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const L0=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],F0=new Oi(3e4,6e4);function _r(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function Fn(t,e,n,r,s={}){return Cg(t,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const c=Pi({key:t.config.apiKey,...a}).slice(1),l=await t._getAdditionalHeaders();l["Content-Type"]="application/json",t.languageCode&&(l["X-Firebase-Locale"]=t.languageCode);const h={method:e,headers:l,...i};return BT()||(h.referrerPolicy="no-referrer"),t.emulatorConfig&&Ts(t.emulatorConfig.host)&&(h.credentials="include"),bg.fetch()(await Rg(t,t.config.apiHost,n,c),h)})}async function Cg(t,e,n){t._canInitEmulator=!1;const r={...M0,...e};try{const s=new $0(t),i=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw uo(t,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const c=i.ok?a.errorMessage:a.error.message,[l,h]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw uo(t,"credential-already-in-use",a);if(l==="EMAIL_EXISTS")throw uo(t,"email-already-in-use",a);if(l==="USER_DISABLED")throw uo(t,"user-disabled",a);const f=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw ru(t,f,h);zt(t,f)}}catch(s){if(s instanceof Ln)throw s;zt(t,"network-request-failed",{message:String(s)})}}async function Mi(t,e,n,r,s={}){const i=await Fn(t,e,n,r,s);return"mfaPendingCredential"in i&&zt(t,"multi-factor-auth-required",{_serverResponse:i}),i}async function Rg(t,e,n,r){const s=`${e}${n}?${r}`,i=t,a=i.config.emulator?iu(t.config,s):`${t.config.apiScheme}://${s}`;return L0.includes(n)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}function U0(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class $0{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(Yt(this.auth,"network-request-failed")),F0.get())})}}function uo(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=Yt(t,e,r);return s.customData._tokenResponse=n,s}function nf(t){return t!==void 0&&t.enterprise!==void 0}class B0{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return U0(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function j0(t,e){return Fn(t,"GET","/v2/recaptchaConfig",_r(t,e))}/**
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
 */async function q0(t,e){return Fn(t,"POST","/v1/accounts:delete",e)}async function Xo(t,e){return Fn(t,"POST","/v1/accounts:lookup",e)}/**
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
 */function ui(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function H0(t,e=!1){const n=_t(t),r=await n.getIdToken(e),s=ou(r);fe(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i?.sign_in_provider;return{claims:s,token:r,authTime:ui(pc(s.auth_time)),issuedAtTime:ui(pc(s.iat)),expirationTime:ui(pc(s.exp)),signInProvider:a||null,signInSecondFactor:i?.sign_in_second_factor||null}}function pc(t){return Number(t)*1e3}function ou(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return Ao("JWT malformed, contained fewer than 3 sections"),null;try{const s=xp(n);return s?JSON.parse(s):(Ao("Failed to decode base64 JWT payload"),null)}catch(s){return Ao("Caught error parsing JWT payload as JSON",s?.toString()),null}}function rf(t){const e=ou(t);return fe(e,"internal-error"),fe(typeof e.exp<"u","internal-error"),fe(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function vs(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof Ln&&W0(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function W0({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
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
 */class z0{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class Yc{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=ui(this.lastLoginAt),this.creationTime=ui(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Jo(t){const e=t.auth,n=await t.getIdToken(),r=await vs(t,Xo(e,{idToken:n}));fe(r?.users.length,e,"internal-error");const s=r.users[0];t._notifyReloadListener(s);const i=s.providerUserInfo?.length?Pg(s.providerUserInfo):[],a=K0(t.providerData,i),c=t.isAnonymous,l=!(t.email&&s.passwordHash)&&!a?.length,h=c?l:!1,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Yc(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(t,f)}async function G0(t){const e=_t(t);await Jo(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function K0(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Pg(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
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
 */async function Q0(t,e){const n=await Cg(t,{},async()=>{const r=Pi({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=t.config,a=await Rg(t,s,"/v1/token",`key=${i}`),c=await t._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const l={method:"POST",headers:c,body:r};return t.emulatorConfig&&Ts(t.emulatorConfig.host)&&(l.credentials="include"),bg.fetch()(a,l)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function X0(t,e){return Fn(t,"POST","/v2/accounts:revokeToken",_r(t,e))}/**
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
 */class cs{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){fe(e.idToken,"internal-error"),fe(typeof e.idToken<"u","internal-error"),fe(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):rf(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){fe(e.length!==0,"internal-error");const n=rf(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(fe(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:i}=await Q0(e,n);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:i}=n,a=new cs;return r&&(fe(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(fe(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(fe(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new cs,this.toJSON())}_performRefresh(){return wn("not implemented")}}/**
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
 */function Hn(t,e){fe(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Xt{constructor({uid:e,auth:n,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new z0(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Yc(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const n=await vs(this,this.stsTokenManager.getToken(this.auth,e));return fe(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return H0(this,e)}reload(){return G0(this)}_assign(e){this!==e&&(fe(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Xt({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){fe(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await Jo(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ot(this.auth.app))return Promise.reject(hn(this.auth));const e=await this.getIdToken();return await vs(this,q0(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const r=n.displayName??void 0,s=n.email??void 0,i=n.phoneNumber??void 0,a=n.photoURL??void 0,c=n.tenantId??void 0,l=n._redirectEventId??void 0,h=n.createdAt??void 0,f=n.lastLoginAt??void 0,{uid:p,emailVerified:y,isAnonymous:S,providerData:R,stsTokenManager:N}=n;fe(p&&N,e,"internal-error");const k=cs.fromJSON(this.name,N);fe(typeof p=="string",e,"internal-error"),Hn(r,e.name),Hn(s,e.name),fe(typeof y=="boolean",e,"internal-error"),fe(typeof S=="boolean",e,"internal-error"),Hn(i,e.name),Hn(a,e.name),Hn(c,e.name),Hn(l,e.name),Hn(h,e.name),Hn(f,e.name);const L=new Xt({uid:p,auth:e,email:s,emailVerified:y,displayName:r,isAnonymous:S,photoURL:a,phoneNumber:i,tenantId:c,stsTokenManager:k,createdAt:h,lastLoginAt:f});return R&&Array.isArray(R)&&(L.providerData=R.map(q=>({...q}))),l&&(L._redirectEventId=l),L}static async _fromIdTokenResponse(e,n,r=!1){const s=new cs;s.updateFromServerResponse(n);const i=new Xt({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Jo(i),i}static async _fromGetAccountInfoResponse(e,n,r){const s=n.users[0];fe(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Pg(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!i?.length,c=new cs;c.updateFromIdToken(r);const l=new Xt({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:a}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Yc(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(l,h),l}}/**
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
 */const sf=new Map;function An(t){Nn(t instanceof Function,"Expected a class definition");let e=sf.get(t);return e?(Nn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,sf.set(t,e),e)}/**
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
 */class kg{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}kg.type="NONE";const of=kg;/**
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
 */function So(t,e,n){return`firebase:${t}:${e}:${n}`}class ls{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=So(this.userKey,s.apiKey,i),this.fullPersistenceKey=So("persistence",s.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await Xo(this.auth,{idToken:e}).catch(()=>{});return n?Xt._fromGetAccountInfoResponse(this.auth,n,e):null}return Xt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new ls(An(of),e,r);const s=(await Promise.all(n.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||An(of);const a=So(r,e.config.apiKey,e.name);let c=null;for(const h of n)try{const f=await h._get(a);if(f){let p;if(typeof f=="string"){const y=await Xo(e,{idToken:f}).catch(()=>{});if(!y)break;p=await Xt._fromGetAccountInfoResponse(e,y,f)}else p=Xt._fromJSON(e,f);h!==i&&(c=p),i=h;break}}catch{}const l=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!l.length?new ls(i,e,r):(i=l[0],c&&await i._set(a,c.toJSON()),await Promise.all(n.map(async h=>{if(h!==i)try{await h._remove(a)}catch{}})),new ls(i,e,r))}}/**
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
 */function af(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Vg(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Dg(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Mg(e))return"Blackberry";if(Lg(e))return"Webos";if(Ng(e))return"Safari";if((e.includes("chrome/")||xg(e))&&!e.includes("edge/"))return"Chrome";if(Og(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if(r?.length===2)return r[1]}return"Other"}function Dg(t=Ct()){return/firefox\//i.test(t)}function Ng(t=Ct()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function xg(t=Ct()){return/crios\//i.test(t)}function Vg(t=Ct()){return/iemobile/i.test(t)}function Og(t=Ct()){return/android/i.test(t)}function Mg(t=Ct()){return/blackberry/i.test(t)}function Lg(t=Ct()){return/webos/i.test(t)}function au(t=Ct()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function J0(t=Ct()){return au(t)&&!!window.navigator?.standalone}function Y0(){return HT()&&document.documentMode===10}function Fg(t=Ct()){return au(t)||Og(t)||Lg(t)||Mg(t)||/windows phone/i.test(t)||Vg(t)}/**
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
 */function Ug(t,e=[]){let n;switch(t){case"Browser":n=af(Ct());break;case"Worker":n=`${af(Ct())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Es}/${r}`}/**
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
 */class Z0{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=i=>new Promise((a,c)=>{try{const l=e(i);a(l)}catch(l){c(l)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
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
 */async function eS(t,e={}){return Fn(t,"GET","/v2/passwordPolicy",_r(t,e))}/**
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
 */const tS=6;class nS{constructor(e){const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??tS,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class rS{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new cf(this),this.idTokenSubscription=new cf(this),this.beforeStateQueue=new Z0(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Sg,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=An(n)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await ls.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await Xo(this,{idToken:e}),r=await Xt._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(Ot(this.app)){const i=this.app.settings.authIdToken;return i?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(a,a))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let r=n,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const i=this.redirectUser?._redirectEventId,a=r?._redirectEventId,c=await this.tryRedirectSignIn(e);(!i||i===a)&&c?.user&&(r=c.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(i){r=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return fe(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Jo(e)}catch(n){if(n?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=O0()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ot(this.app))return Promise.reject(hn(this));const n=e?_t(e):null;return n&&fe(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&fe(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ot(this.app)?Promise.reject(hn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ot(this.app)?Promise.reject(hn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(An(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await eS(this),n=new nS(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Ri("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await X0(this,r)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&An(e)||this._popupRedirectResolver;fe(n,this,"argument-error"),this.redirectPersistenceManager=await ls.create(this,[An(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(fe(c,this,"internal-error"),c.then(()=>{a||i(this.currentUser)}),typeof n=="function"){const l=e.addObserver(n,r,s);return()=>{a=!0,l()}}else{const l=e.addObserver(n);return()=>{a=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return fe(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Ug(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();n&&(e["X-Firebase-Client"]=n);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){if(Ot(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&D0(`Error while retrieving App Check token: ${e.error}`),e?.token}}function Un(t){return _t(t)}class cf{constructor(e){this.auth=e,this.observer=null,this.addObserver=YT(n=>this.observer=n)}get next(){return fe(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Ra={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function sS(t){Ra=t}function $g(t){return Ra.loadJS(t)}function iS(){return Ra.recaptchaEnterpriseScript}function oS(){return Ra.gapiScript}function aS(t){return`__${t}${Math.floor(Math.random()*1e6)}`}class cS{constructor(){this.enterprise=new lS}ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}class lS{ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}const uS="recaptcha-enterprise",Bg="NO_RECAPTCHA";class hS{constructor(e){this.type=uS,this.auth=Un(e)}async verify(e="verify",n=!1){async function r(i){if(!n){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(a,c)=>{j0(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const h=new B0(l);return i.tenantId==null?i._agentRecaptchaConfig=h:i._tenantRecaptchaConfigs[i.tenantId]=h,a(h.siteKey)}}).catch(l=>{c(l)})})}function s(i,a,c){const l=window.grecaptcha;nf(l)?l.enterprise.ready(()=>{l.enterprise.execute(i,{action:e}).then(h=>{a(h)}).catch(()=>{a(Bg)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new cS().execute("siteKey",{action:"verify"}):new Promise((i,a)=>{r(this.auth).then(c=>{if(!n&&nf(window.grecaptcha))s(c,i,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let l=iS();l.length!==0&&(l+=c),$g(l).then(()=>{s(c,i,a)}).catch(h=>{a(h)})}}).catch(c=>{a(c)})})}}async function lf(t,e,n,r=!1,s=!1){const i=new hS(t);let a;if(s)a=Bg;else try{a=await i.verify(n)}catch{a=await i.verify(n,!0)}const c={...e};if(n==="mfaSmsEnrollment"||n==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const l=c.phoneEnrollmentInfo.phoneNumber,h=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:l,recaptchaToken:h,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const l=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:l,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:a}):Object.assign(c,{captchaResponse:a}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function Zc(t,e,n,r,s){if(t._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await lf(t,e,n,n==="getOobCode");return r(t,i)}else return r(t,e).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const a=await lf(t,e,n,n==="getOobCode");return r(t,a)}else return Promise.reject(i)})}/**
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
 */function dS(t,e){const n=Il(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),i=n.getOptions();if(Nr(i,e??{}))return s;zt(s,"already-initialized")}return n.initialize({options:e})}function fS(t,e){const n=e?.persistence||[],r=(Array.isArray(n)?n:[n]).map(An);e?.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e?.popupRedirectResolver)}function pS(t,e,n){const r=Un(t);fe(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=jg(e),{host:a,port:c}=mS(e),l=c===null?"":`:${c}`,h={url:`${i}//${a}${l}/`},f=Object.freeze({host:a,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){fe(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),fe(Nr(h,r.config.emulator)&&Nr(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=h,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,Ts(a)?(Lp(`${i}//${a}${l}`),Fp("Auth",!0)):gS()}function jg(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function mS(t){const e=jg(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:uf(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:uf(a)}}}function uf(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function gS(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
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
 */class cu{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return wn("not implemented")}_getIdTokenResponse(e){return wn("not implemented")}_linkToIdToken(e,n){return wn("not implemented")}_getReauthenticationResolver(e){return wn("not implemented")}}async function _S(t,e){return Fn(t,"POST","/v1/accounts:signUp",e)}/**
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
 */async function yS(t,e){return Mi(t,"POST","/v1/accounts:signInWithPassword",_r(t,e))}/**
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
 */async function vS(t,e){return Mi(t,"POST","/v1/accounts:signInWithEmailLink",_r(t,e))}async function TS(t,e){return Mi(t,"POST","/v1/accounts:signInWithEmailLink",_r(t,e))}/**
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
 */class Si extends cu{constructor(e,n,r,s=null){super("password",r),this._email=e,this._password=n,this._tenantId=s}static _fromEmailAndPassword(e,n){return new Si(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new Si(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n?.email&&n?.password){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Zc(e,n,"signInWithPassword",yS);case"emailLink":return vS(e,{email:this._email,oobCode:this._password});default:zt(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const r={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Zc(e,r,"signUpPassword",_S);case"emailLink":return TS(e,{idToken:n,email:this._email,oobCode:this._password});default:zt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function us(t,e){return Mi(t,"POST","/v1/accounts:signInWithIdp",_r(t,e))}/**
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
 */const ES="http://localhost";class Mr extends cu{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Mr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):zt("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=n;if(!r||!s)return null;const a=new Mr(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const n=this.buildRequest();return us(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,us(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,us(e,n)}buildRequest(){const e={requestUri:ES,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Pi(n)}return e}}/**
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
 */function IS(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function wS(t){const e=Hs(Ws(t)).link,n=e?Hs(Ws(e)).deep_link_id:null,r=Hs(Ws(t)).deep_link_id;return(r?Hs(Ws(r)).link:null)||r||n||e||t}class lu{constructor(e){const n=Hs(Ws(e)),r=n.apiKey??null,s=n.oobCode??null,i=IS(n.mode??null);fe(r&&s&&i,"argument-error"),this.apiKey=r,this.operation=i,this.code=s,this.continueUrl=n.continueUrl??null,this.languageCode=n.lang??null,this.tenantId=n.tenantId??null}static parseLink(e){const n=wS(e);try{return new lu(n)}catch{return null}}}/**
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
 */class Cs{constructor(){this.providerId=Cs.PROVIDER_ID}static credential(e,n){return Si._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=lu.parseLink(n);return fe(r,"argument-error"),Si._fromEmailAndCode(e,r.code,r.tenantId)}}Cs.PROVIDER_ID="password";Cs.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Cs.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class uu{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Li extends uu{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class Kn extends Li{constructor(){super("facebook.com")}static credential(e){return Mr._fromParams({providerId:Kn.PROVIDER_ID,signInMethod:Kn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Kn.credentialFromTaggedObject(e)}static credentialFromError(e){return Kn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Kn.credential(e.oauthAccessToken)}catch{return null}}}Kn.FACEBOOK_SIGN_IN_METHOD="facebook.com";Kn.PROVIDER_ID="facebook.com";/**
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
 */class In extends Li{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Mr._fromParams({providerId:In.PROVIDER_ID,signInMethod:In.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return In.credentialFromTaggedObject(e)}static credentialFromError(e){return In.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return In.credential(n,r)}catch{return null}}}In.GOOGLE_SIGN_IN_METHOD="google.com";In.PROVIDER_ID="google.com";/**
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
 */class Qn extends Li{constructor(){super("github.com")}static credential(e){return Mr._fromParams({providerId:Qn.PROVIDER_ID,signInMethod:Qn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Qn.credentialFromTaggedObject(e)}static credentialFromError(e){return Qn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Qn.credential(e.oauthAccessToken)}catch{return null}}}Qn.GITHUB_SIGN_IN_METHOD="github.com";Qn.PROVIDER_ID="github.com";/**
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
 */class Xn extends Li{constructor(){super("twitter.com")}static credential(e,n){return Mr._fromParams({providerId:Xn.PROVIDER_ID,signInMethod:Xn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Xn.credentialFromTaggedObject(e)}static credentialFromError(e){return Xn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return Xn.credential(n,r)}catch{return null}}}Xn.TWITTER_SIGN_IN_METHOD="twitter.com";Xn.PROVIDER_ID="twitter.com";/**
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
 */async function qg(t,e){return Mi(t,"POST","/v1/accounts:signUp",_r(t,e))}/**
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
 */class xn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const i=await Xt._fromIdTokenResponse(e,r,s),a=hf(r);return new xn({user:i,providerId:a,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=hf(r);return new xn({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function hf(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
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
 */async function AS(t){if(Ot(t.app))return Promise.reject(hn(t));const e=Un(t);if(await e._initializationPromise,e.currentUser?.isAnonymous)return new xn({user:e.currentUser,providerId:null,operationType:"signIn"});const n=await qg(e,{returnSecureToken:!0}),r=await xn._fromIdTokenResponse(e,"signIn",n,!0);return await e._updateCurrentUser(r.user),r}/**
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
 */class Yo extends Ln{constructor(e,n,r,s){super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Yo.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new Yo(e,n,r,s)}}function Hg(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Yo._fromErrorAndOperation(t,i,e,r):i})}async function SS(t,e,n=!1){const r=await vs(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return xn._forOperation(t,"link",r)}/**
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
 */async function bS(t,e,n=!1){const{auth:r}=t;if(Ot(r.app))return Promise.reject(hn(r));const s="reauthenticate";try{const i=await vs(t,Hg(r,s,e,t),n);fe(i.idToken,r,"internal-error");const a=ou(i.idToken);fe(a,r,"internal-error");const{sub:c}=a;return fe(t.uid===c,r,"user-mismatch"),xn._forOperation(t,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&zt(r,"user-mismatch"),i}}/**
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
 */async function Wg(t,e,n=!1){if(Ot(t.app))return Promise.reject(hn(t));const r="signIn",s=await Hg(t,r,e),i=await xn._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(i.user),i}async function CS(t,e){return Wg(Un(t),e)}/**
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
 */async function zg(t){const e=Un(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function RS(t,e,n){if(Ot(t.app))return Promise.reject(hn(t));const r=Un(t),a=await Zc(r,{returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",qg).catch(l=>{throw l.code==="auth/password-does-not-meet-requirements"&&zg(t),l}),c=await xn._fromIdTokenResponse(r,"signIn",a);return await r._updateCurrentUser(c.user),c}function PS(t,e,n){return Ot(t.app)?Promise.reject(hn(t)):CS(_t(t),Cs.credential(e,n)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&zg(t),r})}/**
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
 */async function kS(t,e){return Fn(t,"POST","/v1/accounts:update",e)}/**
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
 */async function DS(t,{displayName:e,photoURL:n}){if(e===void 0&&n===void 0)return;const r=_t(t),i={idToken:await r.getIdToken(),displayName:e,photoUrl:n,returnSecureToken:!0},a=await vs(r,kS(r.auth,i));r.displayName=a.displayName||null,r.photoURL=a.photoUrl||null;const c=r.providerData.find(({providerId:l})=>l==="password");c&&(c.displayName=r.displayName,c.photoURL=r.photoURL),await r._updateTokensIfNecessary(a)}function NS(t,e,n,r){return _t(t).onIdTokenChanged(e,n,r)}function xS(t,e,n){return _t(t).beforeAuthStateChanged(e,n)}function VS(t,e,n,r){return _t(t).onAuthStateChanged(e,n,r)}function OS(t){return _t(t).signOut()}const Zo="__sak";/**
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
 */class Gg{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Zo,"1"),this.storage.removeItem(Zo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const MS=1e3,LS=10;class Kg extends Gg{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Fg(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((a,c,l)=>{this.notifyListeners(a,l)});return}const r=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!n&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);Y0()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,LS):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},MS)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}Kg.type="LOCAL";const FS=Kg;/**
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
 */class Qg extends Gg{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Qg.type="SESSION";const Xg=Qg;/**
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
 */function US(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
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
 */class Pa{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new Pa(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:i}=n.data,a=this.handlersMap[s];if(!a?.size)return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(a).map(async h=>h(n.origin,i)),l=await US(c);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:l})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Pa.receivers=[];/**
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
 */function hu(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
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
 */class $S{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((c,l)=>{const h=hu("",20);s.port1.start();const f=setTimeout(()=>{l(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(p){const y=p;if(y.data.eventId===h)switch(y.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(y.data.response);break;default:clearTimeout(f),clearTimeout(i),l(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:h,data:n},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
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
 */function dn(){return window}function BS(t){dn().location.href=t}/**
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
 */function Jg(){return typeof dn().WorkerGlobalScope<"u"&&typeof dn().importScripts=="function"}async function jS(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function qS(){return navigator?.serviceWorker?.controller||null}function HS(){return Jg()?self:null}/**
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
 */const Yg="firebaseLocalStorageDb",WS=1,ea="firebaseLocalStorage",Zg="fbase_key";class Fi{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function ka(t,e){return t.transaction([ea],e?"readwrite":"readonly").objectStore(ea)}function zS(){const t=indexedDB.deleteDatabase(Yg);return new Fi(t).toPromise()}function el(){const t=indexedDB.open(Yg,WS);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(ea,{keyPath:Zg})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(ea)?e(r):(r.close(),await zS(),e(await el()))})})}async function df(t,e,n){const r=ka(t,!0).put({[Zg]:e,value:n});return new Fi(r).toPromise()}async function GS(t,e){const n=ka(t,!1).get(e),r=await new Fi(n).toPromise();return r===void 0?null:r.value}function ff(t,e){const n=ka(t,!0).delete(e);return new Fi(n).toPromise()}const KS=800,QS=3;class e_{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await el(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>QS)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Jg()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Pa._getInstance(HS()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await jS(),!this.activeServiceWorker)return;this.sender=new $S(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||qS()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await el();return await df(e,Zo,"1"),await ff(e,Zo),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>df(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>GS(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>ff(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=ka(s,!1).getAll();return new Fi(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),KS)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}e_.type="LOCAL";const XS=e_;new Oi(3e4,6e4);/**
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
 */function t_(t,e){return e?An(e):(fe(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
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
 */class du extends cu{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return us(e,this._buildIdpRequest())}_linkToIdToken(e,n){return us(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return us(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function JS(t){return Wg(t.auth,new du(t),t.bypassAuthState)}function YS(t){const{auth:e,user:n}=t;return fe(n,e,"internal-error"),bS(n,new du(t),t.bypassAuthState)}async function ZS(t){const{auth:e,user:n}=t;return fe(n,e,"internal-error"),SS(n,new du(t),t.bypassAuthState)}/**
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
 */class n_{constructor(e,n,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:i,error:a,type:c}=e;if(a){this.reject(a);return}const l={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return JS;case"linkViaPopup":case"linkViaRedirect":return ZS;case"reauthViaPopup":case"reauthViaRedirect":return YS;default:zt(this.auth,"internal-error")}}resolve(e){Nn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Nn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const eb=new Oi(2e3,1e4);async function tb(t,e,n){if(Ot(t.app))return Promise.reject(Yt(t,"operation-not-supported-in-this-environment"));const r=Un(t);N0(t,e,uu);const s=t_(r,n);return new Cr(r,"signInViaPopup",e,s).executeNotNull()}class Cr extends n_{constructor(e,n,r,s,i){super(e,n,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Cr.currentPopupAction&&Cr.currentPopupAction.cancel(),Cr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return fe(e,this.auth,"internal-error"),e}async onExecution(){Nn(this.filter.length===1,"Popup operations only handle one event");const e=hu();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Yt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(Yt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Cr.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Yt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,eb.get())};e()}}Cr.currentPopupAction=null;/**
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
 */const nb="pendingRedirect",bo=new Map;class rb extends n_{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=bo.get(this.auth._key());if(!e){try{const r=await sb(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}bo.set(this.auth._key(),e)}return this.bypassAuthState||bo.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function sb(t,e){const n=ab(e),r=ob(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function ib(t,e){bo.set(t._key(),e)}function ob(t){return An(t._redirectPersistence)}function ab(t){return So(nb,t.config.apiKey,t.name)}async function cb(t,e,n=!1){if(Ot(t.app))return Promise.reject(hn(t));const r=Un(t),s=t_(r,e),a=await new rb(r,s,n).execute();return a&&!n&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
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
 */const lb=600*1e3;class ub{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!hb(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){if(e.error&&!r_(e)){const r=e.error.code?.split("auth/")[1]||"internal-error";n.onError(Yt(this.auth,r))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=lb&&this.cachedEventUids.clear(),this.cachedEventUids.has(pf(e))}saveEventToCache(e){this.cachedEventUids.add(pf(e)),this.lastProcessedEventTime=Date.now()}}function pf(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function r_({type:t,error:e}){return t==="unknown"&&e?.code==="auth/no-auth-event"}function hb(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return r_(t);default:return!1}}/**
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
 */async function db(t,e={}){return Fn(t,"GET","/v1/projects",e)}/**
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
 */const fb=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,pb=/^https?/;async function mb(t){if(t.config.emulator)return;const{authorizedDomains:e}=await db(t);for(const n of e)try{if(gb(n))return}catch{}zt(t,"unauthorized-domain")}function gb(t){const e=Jc(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const a=new URL(t);return a.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&a.hostname===r}if(!pb.test(n))return!1;if(fb.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const _b=new Oi(3e4,6e4);function mf(){const t=dn().___jsl;if(t?.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function yb(t){return new Promise((e,n)=>{function r(){mf(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{mf(),n(Yt(t,"network-request-failed"))},timeout:_b.get()})}if(dn().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(dn().gapi?.load)r();else{const s=aS("iframefcb");return dn()[s]=()=>{gapi.load?r():n(Yt(t,"network-request-failed"))},$g(`${oS()}?onload=${s}`).catch(i=>n(i))}}).catch(e=>{throw Co=null,e})}let Co=null;function vb(t){return Co=Co||yb(t),Co}/**
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
 */const Tb=new Oi(5e3,15e3),Eb="__/auth/iframe",Ib="emulator/auth/iframe",wb={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Ab=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Sb(t){const e=t.config;fe(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?iu(e,Ib):`https://${t.config.authDomain}/${Eb}`,r={apiKey:e.apiKey,appName:t.name,v:Es},s=Ab.get(t.config.apiHost);s&&(r.eid=s);const i=t._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${Pi(r).slice(1)}`}async function bb(t){const e=await vb(t),n=dn().gapi;return fe(n,t,"internal-error"),e.open({where:document.body,url:Sb(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:wb,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=Yt(t,"network-request-failed"),c=dn().setTimeout(()=>{i(a)},Tb.get());function l(){dn().clearTimeout(c),s(r)}r.ping(l).then(l,()=>{i(a)})}))}/**
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
 */const Cb={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Rb=500,Pb=600,kb="_blank",Db="http://localhost";class gf{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Nb(t,e,n,r=Rb,s=Pb){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const l={...Cb,width:r.toString(),height:s.toString(),top:i,left:a},h=Ct().toLowerCase();n&&(c=xg(h)?kb:n),Dg(h)&&(e=e||Db,l.scrollbars="yes");const f=Object.entries(l).reduce((y,[S,R])=>`${y}${S}=${R},`,"");if(J0(h)&&c!=="_self")return xb(e||"",c),new gf(null);const p=window.open(e||"",c,f);fe(p,t,"popup-blocked");try{p.focus()}catch{}return new gf(p)}function xb(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
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
 */const Vb="__/auth/handler",Ob="emulator/auth/handler",Mb=encodeURIComponent("fac");async function _f(t,e,n,r,s,i){fe(t.config.authDomain,t,"auth-domain-config-required"),fe(t.config.apiKey,t,"invalid-api-key");const a={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:Es,eventId:s};if(e instanceof uu){e.setDefaultLanguage(t.languageCode),a.providerId=e.providerId||"",JT(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))a[f]=p}if(e instanceof Li){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(a.scopes=f.join(","))}t.tenantId&&(a.tid=t.tenantId);const c=a;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const l=await t._getAppCheckToken(),h=l?`#${Mb}=${encodeURIComponent(l)}`:"";return`${Lb(t)}?${Pi(c).slice(1)}${h}`}function Lb({config:t}){return t.emulator?iu(t,Ob):`https://${t.authDomain}/${Vb}`}/**
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
 */const mc="webStorageSupport";class Fb{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Xg,this._completeRedirectFn=cb,this._overrideRedirectResult=ib}async _openPopup(e,n,r,s){Nn(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const i=await _f(e,n,r,Jc(),s);return Nb(e,i,hu())}async _openRedirect(e,n,r,s){await this._originValidation(e);const i=await _f(e,n,r,Jc(),s);return BS(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:i}=this.eventManagers[n];return s?Promise.resolve(s):(Nn(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await bb(e),r=new ub(e);return n.register("authEvent",s=>(fe(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(mc,{type:mc},s=>{const i=s?.[0]?.[mc];i!==void 0&&n(!!i),zt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=mb(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Fg()||Ng()||au()}}const Ub=Fb;var yf="@firebase/auth",vf="1.11.0";/**
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
 */class $b{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){fe(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function Bb(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function jb(t){ds(new xr("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;fe(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:a,authDomain:c,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Ug(t)},h=new rS(r,s,i,l);return fS(h,n),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),ds(new xr("auth-internal",e=>{const n=Un(e.getProvider("auth").getImmediate());return(r=>new $b(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),nr(yf,vf,Bb(t)),nr(yf,vf,"esm2020")}/**
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
 */const qb=300,Hb=Mp("authIdTokenMaxAge")||qb;let Tf=null;const Wb=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>Hb)return;const s=n?.token;Tf!==s&&(Tf=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function zb(t=jp()){const e=Il(t,"auth");if(e.isInitialized())return e.getImmediate();const n=dS(t,{popupRedirectResolver:Ub,persistence:[XS,FS,Xg]}),r=Mp("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=Wb(i.toString());xS(n,a,()=>a(n.currentUser)),NS(n,c=>a(c))}}const s=Vp("auth");return s&&pS(n,`http://${s}`),n}function Gb(){return document.getElementsByTagName("head")?.[0]??document}sS({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const i=Yt("internal-error");i.customData=s,n(i)},r.type="text/javascript",r.charset="UTF-8",Gb().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});jb("Browser");const Kb={apiKey:"AIzaSyDTjxkS7WNK6slJ9WG6aU4rGl8tXuzO5Fk",authDomain:"dinacon-hydrophone.firebaseapp.com",projectId:"dinacon-hydrophone",storageBucket:"dinacon-hydrophone.firebasestorage.app",messagingSenderId:"972661963057",appId:"1:972661963057:web:10349ecd04c8ed48aad810"},s_=Bp(Kb),Qr=zb(s_),fu=a0(s_),Ui=fa("comments",()=>{const t=Ae([]),e=Ae(!0),n=Ae(null);let r=null;const s=ee(()=>[...t.value].sort((h,f)=>h.timestamp-f.timestamp));return{comments:t,loading:e,error:n,sortedComments:s,loadComments:()=>{try{const h=v0(lg(fu,"comments"),T0("createdTimestamp","desc"));r=b0(h,f=>{const p=[];f.forEach(y=>{p.push({id:y.id,...y.data()})}),t.value=p,e.value=!1,console.log(`Loaded ${p.length} comments`)},f=>{console.error("Error loading comments:",f),n.value=f.message,e.value=!1})}catch(h){console.error("Error setting up comments listener:",h),n.value=h.message,e.value=!1}},stopListening:()=>{r&&(r(),r=null)},getNextComment:h=>s.value.find(p=>p.timestamp>h),getPreviousComment:h=>{const f=s.value;for(let p=f.length-1;p>=0;p--)if(f[p].timestamp<h)return f[p];return null}}}),Qb={class:"minimap-container"},Xb={class:"minimap-content"},Jb=["width"],Yb={class:"day-night-highlights"},Zb=["x","width"],eC=["x","width"],tC=["y1","x2","y2"],nC=["d"],rC=["d"],sC=["d"],iC=["d"],oC=["width"],aC=["width"],cC=["y1","x2","y2"],lC=["d"],uC=["d"],hC=["width"],dC=["x","y","width","height","fill"],fC=["cx","cy","onClick"],pC=["width"],mC=["x","y","width","height","fill"],gC=["cx","cy","onClick"],_C={class:"time-markers"},yC={key:0,class:"marker-label"},$e=291322,vC={__name:"MiniMap",setup(t){const e=Rn(),n=Ui(),r=Ae(null),s=Ae(0),i=Ae([]),a=Ae([]),c=Ae([]),l=new Date("2025-07-04T03:29:56.000Z"),h=async()=>{try{const Z=(await(await fetch("tide_data.csv")).text()).split(`
`).slice(1).filter(W=>W.trim()).map(W=>{const[,ie,be,Ie,he,Me]=W.split(",");return{timestamp:new Date(Ie.replace("+00:00","Z")),solarAltitude:parseFloat(he),lunarAltitude:parseFloat(Me),tideHeight:parseFloat(be),unixTime:parseInt(ie)}}).filter(W=>!isNaN(W.solarAltitude)&&!isNaN(W.lunarAltitude)&&!isNaN(W.tideHeight));i.value=Z}catch(D){console.error("Error loading solar data:",D)}},f=async()=>{try{const Z=(await(await fetch("A_stat.csv")).text()).split(`
`).slice(1).filter(W=>W.trim()).map(W=>{const[,ie,be,Ie,he,Me,Ne]=W.split(","),T=ie.replace(" ","T").substring(0,23)+"Z";return{timestamp:new Date(T),rms:parseFloat(be),spectralCentroid:parseFloat(Ie),spectralBandwidth:parseFloat(he),spectralContrast:parseFloat(Me),spectralFlatness:parseFloat(Ne)}}).filter(W=>!isNaN(W.rms)&&!isNaN(W.spectralContrast)&&!isNaN(W.spectralFlatness));a.value=Z}catch(D){console.error("Error loading audio stats data:",D)}},p=async()=>{try{const Z=(await(await fetch("B_stat.csv")).text()).split(`
`).slice(1).filter(W=>W.trim()).map(W=>{const[,ie,be,Ie,he,Me,Ne]=W.split(","),T=ie.replace(" ","T").substring(0,23)+"Z";return{timestamp:new Date(T),rms:parseFloat(be),spectralCentroid:parseFloat(Ie),spectralBandwidth:parseFloat(he),spectralContrast:parseFloat(Me),spectralFlatness:parseFloat(Ne)}}).filter(W=>!isNaN(W.rms)&&!isNaN(W.spectralContrast)&&!isNaN(W.spectralFlatness));c.value=Z}catch(D){console.error("Error loading audio stats B data:",D)}},y=ee(()=>e.absoluteCurrentTime);ee(()=>e.isPlaying);const S=()=>{r.value&&(s.value=r.value.offsetWidth)};ee(()=>y.value/$e*100);const R=ee(()=>s.value===0?0:y.value/$e*s.value),N=()=>{if(i.value.length===0)return[];const D=new Date(l.getTime()+$e*1e3);return i.value.filter(F=>F.timestamp>=l&&F.timestamp<=D)},k=()=>{const D=N();if(D.length===0)return{minAltitude:0,maxAltitude:90,altitudeRange:90};const F=D.map(ie=>ie.solarAltitude),P=D.map(ie=>ie.lunarAltitude),Z=[...F,...P],W=Math.max(...Z,0);return{minAltitude:0,maxAltitude:W,altitudeRange:W}},L=()=>{const D=N();if(D.length===0)return{minTide:-1,maxTide:1,tidalRange:2};const F=D.map(ie=>ie.tideHeight),P=Math.min(...F),Z=Math.max(...F),W=Z-P;return{minTide:P-.1,maxTide:Z,tidalRange:W+.1}},q=ee(()=>{if(i.value.length===0||s.value===0)return[];const D=[],F=N();if(F.length===0)return[];const{minAltitude:P,maxAltitude:Z,altitudeRange:W}=k();return F.forEach((ie,be)=>{const Ie=(ie.timestamp.getTime()-l.getTime())/1e3;if(Ie>=0&&Ie<=$e){const he=Ie/$e*s.value,Ne=60-ie.solarAltitude/W*52;D.push({x:he,y:Math.max(8,Ne),altitude:ie.solarAltitude,time:Ie,isDay:ie.solarAltitude>0})}}),D}),H=ee(()=>{if(i.value.length===0||s.value===0)return[];const D=[],F=N();if(F.length===0)return[];const{minAltitude:P,maxAltitude:Z,altitudeRange:W}=k();return F.forEach((ie,be)=>{const Ie=(ie.timestamp.getTime()-l.getTime())/1e3;if(Ie>=0&&Ie<=$e){const he=Ie/$e*s.value,Ne=60-ie.lunarAltitude/W*52;D.push({x:he,y:Math.max(8,Ne),altitude:ie.lunarAltitude,time:Ie,isVisible:ie.lunarAltitude>0})}}),D}),z=ee(()=>{if(i.value.length===0||s.value===0)return[];const D=[],F=N();if(F.length===0)return[];const{minTide:P,maxTide:Z,tidalRange:W}=L();return F.forEach((ie,be)=>{const Ie=(ie.timestamp.getTime()-l.getTime())/1e3;if(Ie>=0&&Ie<=$e){const he=Ie/$e*s.value,Ne=60-(W>0?(ie.tideHeight-P)/W:.5)*56;D.push({x:he,y:Math.max(4,Math.min(60,Ne)),tideHeight:ie.tideHeight,time:Ie,isHigh:ie.tideHeight>0})}}),D}),oe=ee(()=>60),_e=ee(()=>{const D=q.value;if(D.length===0)return{daySegments:[],nightSegments:[]};const F=[],P=[];let Z=null,W=null;return D.forEach((ie,be)=>{const Ie=ie.altitude>0;W!==Ie||Z===null?(Z!==null&&(W?F.push(Z):P.push(Z)),Z={startX:ie.x,endX:ie.x,startTime:ie.time,endTime:ie.time},W=Ie):(Z.endX=ie.x,Z.endTime=ie.time),be===D.length-1&&(W?F.push(Z):P.push(Z))}),{daySegments:F,nightSegments:P}}),w=ee(()=>{const D=q.value;if(D.length<2)return"";let F=`M ${D[0].x} ${D[0].y}`;for(let P=1;P<D.length;P++){const Z=D[P-1],W=D[P];if(P===1)F+=` L ${W.x} ${W.y}`;else{const ie=(Z.x+W.x)/2;F+=` Q ${ie} ${Z.y} ${W.x} ${W.y}`}}return F}),_=ee(()=>{const D=H.value;if(D.length<2)return"";let F=`M ${D[0].x} ${D[0].y}`;for(let P=1;P<D.length;P++){const Z=D[P-1],W=D[P];if(P===1)F+=` L ${W.x} ${W.y}`;else{const ie=(Z.x+W.x)/2;F+=` Q ${ie} ${Z.y} ${W.x} ${W.y}`}}return F}),m=ee(()=>{const D=z.value;if(D.length<2)return"";let F=`M ${D[0].x} ${D[0].y}`;for(let P=1;P<D.length;P++){const Z=D[P-1],W=D[P];if(P===1)F+=` L ${W.x} ${W.y}`;else{const ie=(Z.x+W.x)/2;F+=` Q ${ie} ${Z.y} ${W.x} ${W.y}`}}return F}),v=ee(()=>{if(i.value.length===0)return 30;const{minTide:D,maxTide:F,tidalRange:P}=L();return P===0?30:60-(0-D)/P*56}),I=(D,F,P)=>{const Z=P*F,W=Z*(1-Math.abs(D/60%2-1)),ie=P-Z;let be,Ie,he;return D>=0&&D<60?[be,Ie,he]=[Z,W,0]:D>=60&&D<120?[be,Ie,he]=[W,Z,0]:D>=120&&D<180?[be,Ie,he]=[0,Z,W]:D>=180&&D<240?[be,Ie,he]=[0,W,Z]:D>=240&&D<300?[be,Ie,he]=[W,0,Z]:[be,Ie,he]=[Z,0,W],[Math.round((be+ie)*255),Math.round((Ie+ie)*255),Math.round((he+ie)*255)]},b=ee(()=>{if(a.value.length===0||s.value===0)return[];const D=[],F=a.value.filter(he=>he.timestamp>=l&&he.timestamp<=new Date(l.getTime()+$e*1e3));if(F.length===0)return[];const P=0,Z=.08,W=0,ie=.015,be=18,Ie=26;return F.forEach((he,Me)=>{const Ne=(he.timestamp.getTime()-l.getTime())/1e3;if(Ne>=0&&Ne<=$e){const T=Ne/$e*s.value;let A;Me<F.length-1?A=((F[Me+1].timestamp.getTime()-l.getTime())/1e3-Ne)/$e*s.value:A=s.value-T;const V=Math.max(0,Math.min(1,(he.rms-P)/(Z-P))),B=Math.max(0,Math.min(1,(he.spectralFlatness-W)/(ie-W))),$=Math.max(0,Math.min(1,(he.spectralContrast-be)/(Ie-be)))*360,J=B,K=V,[G,j,le]=I($,J,K),X=`rgb(${G}, ${j}, ${le})`;D.push({x:T,y:0,width:Math.max(1,A),height:30,color:X,secondsFromStart:Ne,rms:he.rms,spectralContrast:he.spectralContrast,spectralFlatness:he.spectralFlatness})}}),D}),E=ee(()=>{if(c.value.length===0||s.value===0)return[];const D=[],F=c.value.filter(he=>he.timestamp>=l&&he.timestamp<=new Date(l.getTime()+$e*1e3));if(F.length===0)return[];const P=0,Z=.015,W=0,ie=.09,be=17,Ie=22;return F.forEach((he,Me)=>{const Ne=(he.timestamp.getTime()-l.getTime())/1e3;if(Ne>=0&&Ne<=$e){const T=Ne/$e*s.value;let A;Me<F.length-1?A=((F[Me+1].timestamp.getTime()-l.getTime())/1e3-Ne)/$e*s.value:A=s.value-T;const V=Math.max(0,Math.min(1,(he.rms-P)/(Z-P))),B=Math.max(0,Math.min(1,(he.spectralFlatness-W)/(ie-W))),$=Math.max(0,Math.min(1,(he.spectralContrast-be)/(Ie-be)))*360,J=B,K=V,[G,j,le]=I($,J,K),X=`rgb(${G}, ${j}, ${le})`;D.push({x:T,y:0,width:Math.max(1,A),height:30,color:X,secondsFromStart:Ne,rms:he.rms,spectralContrast:he.spectralContrast,spectralFlatness:he.spectralFlatness})}}),D}),Oe=D=>{const F=new Date(l.getTime()+D*1e3),P=new Date(F.getTime()+480*60*1e3),Z=(P.getUTCMonth()+1).toString().padStart(2,"0"),W=P.getUTCDate().toString().padStart(2,"0"),ie=P.getUTCHours().toString().padStart(2,"0"),be=P.getUTCMinutes().toString().padStart(2,"0");return`${Z}/${W} ${ie}:${be}`},We=D=>{const F=new Date(l.getTime()+D*1e3),P=new Date(F.getTime()+480*60*1e3),W=["January","February","March","April","May","June","July","August","September","October","November","December"][P.getUTCMonth()],ie=P.getUTCDate();return`${W} ${ie}`},ve=ee(()=>{if(s.value===0)return[];const D=[],F=new Date(l.getTime()+480*60*1e3),P=new Date(F);P.setUTCDate(P.getUTCDate()+1),P.setUTCHours(0,0,0,0);const W=(new Date(P.getTime()-480*60*1e3).getTime()-l.getTime())/1e3,ie=new Date(F);F.getUTCHours()>=12&&ie.setUTCDate(ie.getUTCDate()+1),ie.setUTCHours(12,0,0,0);const Ie=(new Date(ie.getTime()-480*60*1e3).getTime()-l.getTime())/1e3;let he=W;for(;he<=$e;){if(he>=0){const Ne=he/$e*s.value;D.push({time:he,position:Ne,type:"midnight",label:We(he),showLabel:!0})}he+=24*3600}let Me=Ie;for(;Me<=$e;){if(Me>=0){const Ne=Me/$e*s.value;D.push({time:Me,position:Ne,type:"noon",label:"12:00",showLabel:!0})}Me+=24*3600}return D.sort((Ne,T)=>Ne.time-T.time)}),ae=D=>{if(!r.value||s.value===0)return;const F=r.value.getBoundingClientRect(),P=D.clientX-F.left,W=Math.max(0,Math.min(1,P/s.value))*$e;e.updateAbsoluteCurrentTime(W);const ie=new CustomEvent("minimap-seek",{detail:{time:W}});window.dispatchEvent(ie)},Te=(D,F)=>{D.stopPropagation(),e.updateAbsoluteCurrentTime(F);const P=new CustomEvent("minimap-seek",{detail:{time:F}});window.dispatchEvent(P)};ee(()=>Oe(y.value)),ee(()=>Oe($e));const je=ee(()=>{if(n.comments.length===0||s.value===0)return[];const D=[];return n.comments.filter(P=>P.timestamp>=0&&P.timestamp<=$e&&!P.hydrophoneAMuted).forEach((P,Z)=>{const W=P.timestamp/$e*s.value;D.push({x:W,y:15,timestamp:P.timestamp,userName:P.userName,content:P.content,id:P.id})}),D}),xt=ee(()=>{if(n.comments.length===0||s.value===0)return[];const D=[];return n.comments.filter(P=>P.timestamp>=0&&P.timestamp<=$e&&!P.hydrophoneBMuted).forEach((P,Z)=>{const W=P.timestamp/$e*s.value;D.push({x:W,y:15,timestamp:P.timestamp,userName:P.userName,content:P.content,id:P.id})}),D});return gr(async()=>{S(),window.addEventListener("resize",S),await h(),await f(),await p(),n.loadComments()}),On(()=>{window.removeEventListener("resize",S),n.stopListening()}),(D,F)=>(te(),ne("div",Qb,[Y("div",Xb,[F[4]||(F[4]=Za('<div class="minimap-left-legend" data-v-9d3c6a9a><div class="legend-label" data-v-9d3c6a9a>Sun/Moon</div><div class="legend-label" data-v-9d3c6a9a>Tides</div><div class="legend-label" data-v-9d3c6a9a>Hydrophone A</div><div class="legend-label" data-v-9d3c6a9a>Hydrophone B</div></div>',1)),Y("div",{class:"minimap-track",ref_key:"containerRef",ref:r,onClick:ae},[F[3]||(F[3]=Y("div",{class:"minimap-background"},null,-1)),q.value.length>0?(te(),ne("svg",{key:0,class:"solar-altitude-plot",width:s.value,height:"60"},[F[0]||(F[0]=Za('<defs data-v-9d3c6a9a><linearGradient id="dayNightGradient" x1="0%" y1="0%" x2="0%" y2="100%" data-v-9d3c6a9a><stop offset="0%" style="stop-color:rgba(255,215,0,0.1);stop-opacity:1;" data-v-9d3c6a9a></stop><stop offset="50%" style="stop-color:rgba(135,206,235,0.05);stop-opacity:1;" data-v-9d3c6a9a></stop><stop offset="100%" style="stop-color:rgba(25,25,112,0.1);stop-opacity:1;" data-v-9d3c6a9a></stop></linearGradient><linearGradient id="dayHighlight" x1="0%" y1="0%" x2="0%" y2="100%" data-v-9d3c6a9a><stop offset="0%" style="stop-color:rgba(255,215,0,0.15);stop-opacity:1;" data-v-9d3c6a9a></stop><stop offset="100%" style="stop-color:rgba(255,140,0,0.1);stop-opacity:1;" data-v-9d3c6a9a></stop></linearGradient><linearGradient id="nightHighlight" x1="0%" y1="0%" x2="0%" y2="100%" data-v-9d3c6a9a><stop offset="0%" style="stop-color:rgba(25,25,112,0.1);stop-opacity:1;" data-v-9d3c6a9a></stop><stop offset="100%" style="stop-color:rgba(0,0,50,0.15);stop-opacity:1;" data-v-9d3c6a9a></stop></linearGradient><linearGradient id="lunarGradient" x1="0%" y1="0%" x2="0%" y2="100%" data-v-9d3c6a9a><stop offset="0%" style="stop-color:rgba(220,220,255,0.08);stop-opacity:1;" data-v-9d3c6a9a></stop><stop offset="100%" style="stop-color:rgba(150,150,200,0.05);stop-opacity:1;" data-v-9d3c6a9a></stop></linearGradient></defs>',1)),Y("g",Yb,[(te(!0),ne(rt,null,Kt(_e.value.daySegments,(P,Z)=>(te(),ne("rect",{key:`day-${Z}`,x:P.startX,y:0,width:P.endX-P.startX,height:60,fill:"url(#dayHighlight)",class:"day-segment"},null,8,Zb))),128)),(te(!0),ne(rt,null,Kt(_e.value.nightSegments,(P,Z)=>(te(),ne("rect",{key:`night-${Z}`,x:P.startX,y:0,width:P.endX-P.startX,height:60,fill:"url(#nightHighlight)",class:"night-segment"},null,8,eC))),128))]),Y("line",{x1:0,y1:oe.value,x2:s.value,y2:oe.value,stroke:"rgba(255, 255, 255, 0.4)","stroke-width":"1","stroke-dasharray":"2,3",class:"zero-line"},null,8,tC),w.value?(te(),ne("path",{key:0,d:`${w.value} L ${s.value} 60 L 0 60 Z`,fill:"url(#dayNightGradient)",opacity:"0.2"},null,8,nC)):Ye("",!0),_.value?(te(),ne("path",{key:1,d:`${_.value} L ${s.value} 60 L 0 60 Z`,fill:"url(#lunarGradient)",opacity:"0.15"},null,8,rC)):Ye("",!0),w.value?(te(),ne("path",{key:2,d:w.value,stroke:"rgba(255, 215, 0, 0.9)","stroke-width":"2",fill:"none",class:"solar-curve"},null,8,sC)):Ye("",!0),_.value?(te(),ne("path",{key:3,d:_.value,stroke:"rgba(220, 220, 255, 0.8)","stroke-width":"2",fill:"none",class:"lunar-curve"},null,8,iC)):Ye("",!0)],8,Jb)):Ye("",!0),z.value.length>0?(te(),ne("svg",{key:1,class:"tidal-height-plot",width:s.value,height:"60"},[F[1]||(F[1]=Za('<defs data-v-9d3c6a9a><linearGradient id="tidalGradient" x1="0%" y1="0%" x2="0%" y2="100%" data-v-9d3c6a9a><stop offset="0%" style="stop-color:rgba(0,191,255,0.15);stop-opacity:1;" data-v-9d3c6a9a></stop><stop offset="50%" style="stop-color:rgba(0,150,200,0.1);stop-opacity:1;" data-v-9d3c6a9a></stop><stop offset="100%" style="stop-color:rgba(0,100,150,0.05);stop-opacity:1;" data-v-9d3c6a9a></stop></linearGradient><linearGradient id="tidalFill" x1="0%" y1="0%" x2="0%" y2="100%" data-v-9d3c6a9a><stop offset="0%" style="stop-color:rgba(0,191,255,0.2);stop-opacity:1;" data-v-9d3c6a9a></stop><stop offset="100%" style="stop-color:rgba(0,100,150,0.1);stop-opacity:1;" data-v-9d3c6a9a></stop></linearGradient></defs>',1)),Y("rect",{x:"0",y:"0",width:s.value,height:"60",fill:"url(#tidalGradient)"},null,8,aC),Y("line",{x1:0,y1:v.value,x2:s.value,y2:v.value,stroke:"rgba(0, 191, 255, 0.4)","stroke-width":"1","stroke-dasharray":"2,2",class:"tidal-zero-line"},null,8,cC),m.value?(te(),ne("path",{key:0,d:`${m.value} L ${s.value} 60 L 0 60 Z`,fill:"url(#tidalFill)",opacity:"0.3"},null,8,lC)):Ye("",!0),m.value?(te(),ne("path",{key:1,d:m.value,stroke:"rgba(0, 191, 255, 0.9)","stroke-width":"2",fill:"none",class:"tidal-curve"},null,8,uC)):Ye("",!0)],8,oC)):Ye("",!0),b.value.length>0?(te(),ne("svg",{key:2,class:"audio-stats-plot",width:s.value,height:"30"},[(te(!0),ne(rt,null,Kt(b.value,(P,Z)=>(te(),ne("rect",{key:`audio-stat-${Z}`,x:P.x,y:P.y,width:P.width,height:P.height,fill:P.color,class:"audio-stat-rect"},null,8,dC))),128)),(te(!0),ne(rt,null,Kt(je.value,P=>(te(),ne("circle",{key:`comment-a-${P.id}`,cx:P.x,cy:P.y,r:"4","stroke-width":"1",class:"comment-dot comment-dot-a",onClick:Z=>Te(Z,P.timestamp)},[Y("title",null,Ke(P.userName)+": "+Ke(P.content),1)],8,fC))),128))],8,hC)):Ye("",!0),E.value.length>0?(te(),ne("svg",{key:3,class:"audio-stats-b-plot",width:s.value,height:"30"},[(te(!0),ne(rt,null,Kt(E.value,(P,Z)=>(te(),ne("rect",{key:`audio-stat-b-${Z}`,x:P.x,y:P.y,width:P.width,height:P.height,fill:P.color,class:"audio-stat-rect"},null,8,mC))),128)),(te(!0),ne(rt,null,Kt(xt.value,P=>(te(),ne("circle",{key:`comment-b-${P.id}`,cx:P.x,cy:P.y,r:"4",fill:"rgba(255, 255, 255, 0.9)",stroke:"rgba(0, 0, 0, 0.8)","stroke-width":"1",class:"comment-dot comment-dot-b",onClick:Z=>Te(Z,P.timestamp)},[Y("title",null,Ke(P.userName)+": "+Ke(P.content),1)],8,gC))),128))],8,pC)):Ye("",!0),Y("div",_C,[(te(!0),ne(rt,null,Kt(ve.value,P=>(te(),ne("div",{key:P.time,class:fn(["time-marker",`marker-${P.type}`]),style:Sn({left:`${P.position}px`})},[F[2]||(F[2]=Y("div",{class:"marker-line"},null,-1)),P.showLabel?(te(),ne("div",yC,Ke(P.label),1)):Ye("",!0)],6))),128))]),Y("div",{class:"current-position",style:Sn({left:`${R.value}px`})},null,4)],512)])]))}},TC=Mn(vC,[["__scopeId","data-v-9d3c6a9a"]]),EC=""+new URL("icons8-play-CEwPAUXb.gif",import.meta.url).href,IC="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAXUlEQVR4nO3PMQ6AQAwDwfz/00fjHgofoNOMlCpysTMA8K718Hbta44L+epfIySEtAkJIW1CQkibkBDSJiSEtAkJIW1CQkibkBDSJiSEtAn5a8i6uV37mmNCAGDiAm5yPtDZhUDWAAAAAElFTkSuQmCC",Da=fa("auth",()=>{const t=Ae(null),e=Ae(!0),n=Ae(null),r=ee(()=>!!t.value),s=ee(()=>t.value?.displayName||(t.value?.isAnonymous?"Guest":"User")),i=ee(()=>t.value?.email||""),a=ee(()=>t.value?.photoURL||""),c=ee(()=>t.value?.isAnonymous||!1),l=async()=>{try{n.value=null;const k=new In,L=await tb(Qr,k);t.value=L.user,console.log("User logged in with Google:",L.user.displayName)}catch(k){n.value=k.message,console.error("Google login error:",k)}};return{user:t,loading:e,error:n,isAuthenticated:r,userName:s,userEmail:i,userPhoto:a,isAnonymous:c,login:async()=>{await l()},loginWithGoogle:l,loginAnonymously:async()=>{try{n.value=null;const k=await AS(Qr);t.value=k.user,console.log("User logged in anonymously")}catch(k){n.value=k.message,console.error("Anonymous login error:",k)}},signUpWithEmail:async(k,L,q="")=>{try{n.value=null;const H=await RS(Qr,k,L);q.trim()?(await DS(H.user,{displayName:q.trim()}),t.value={...H.user,displayName:q.trim()}):t.value=H.user,console.log("User signed up with email:",k),console.log("User display name set to:",t.value.displayName)}catch(H){n.value=H.message,console.error("Email signup error:",H)}},loginWithEmail:async(k,L)=>{try{n.value=null;const q=await PS(Qr,k,L);t.value=q.user,console.log("User logged in with email:",k)}catch(q){n.value=q.message,console.error("Email login error:",q)}},logout:async()=>{try{n.value=null,await OS(Qr),t.value=null,console.log("User logged out")}catch(k){n.value=k.message,console.error("Logout error:",k)}},clearError:()=>{n.value=null},initializeAuth:()=>{VS(Qr,k=>{t.value=k,e.value=!1,k?console.log("User authenticated:",k.displayName||(k.isAnonymous?"Anonymous":"User")):console.log("User not authenticated")})}}}),wC={class:"global-controls"},AC={key:0,src:EC,alt:"Play",class:"play-icon"},SC={key:1,src:IC,alt:"Pause",class:"pause-icon"},bC={class:"center-controls"},CC=["src"],RC={key:1,class:"comment-input-bar"},PC={class:"comment-navigation"},kC=["disabled"],DC=["disabled"],NC={__name:"GlobalControls",setup(t){const e=Rn(),n=Da(),r=Ui(),s=Ae(!1),i=Ae(!1),a=Ae(""),c=Ae(0),l=ee(()=>e.isPlaying),h=ee(()=>n.isAuthenticated),f=ee(()=>n.userName),p=ee(()=>n.user?.uid),y=ee(()=>e.absoluteCurrentTime),S=ee(()=>e.isMutedA),R=ee(()=>e.isMutedB),N=ee(()=>!!r.getNextComment(y.value)),k=ee(()=>!!r.getPreviousComment(y.value)),L=()=>{e.setPlayingStatus(!l.value)},q=async()=>{if(!h.value){console.log("User not authenticated - triggering auth modal with comment context");const m=new CustomEvent("trigger-auth-modal",{detail:{context:"comment"}});window.dispatchEvent(m);return}console.log("User authenticated - showing comment input directly"),c.value=y.value,i.value=!0},H=m=>{s.value=m},z=async()=>{if(!a.value.trim()){oe();return}const m={userName:f.value,userId:p.value,content:a.value.trim(),timestamp:c.value,hydrophoneAMuted:S.value,hydrophoneBMuted:R.value,createdTimestamp:new Date};a.value="",i.value=!1,s.value=!1;try{await S0(lg(fu,"comments"),m),console.log("Comment saved successfully:",m)}catch(v){console.error("Error saving comment:",v),alert("Failed to save comment. Please try again.")}},oe=()=>{a.value="",i.value=!1,s.value=!1,c.value=0},_e=()=>{const m=r.getNextComment(y.value+.01);m&&e.updateAbsoluteCurrentTime(m.timestamp)},w=()=>{console.log("Received auth-success-comment event"),c.value=y.value,i.value=!0,console.log("Comment input should now be shown:",i.value)},_=()=>{const m=r.getPreviousComment(y.value-.01);m&&e.updateAbsoluteCurrentTime(m.timestamp)};return gr(()=>{console.log("GlobalControls mounted - setting up auth-success-comment listener"),window.addEventListener("auth-success-comment",w)}),On(()=>{console.log("GlobalControls unmounted - removing auth-success-comment listener"),window.removeEventListener("auth-success-comment",w)}),(m,v)=>(te(),ne("div",wC,[Y("button",{onClick:L,class:"play-button"},[l.value?(te(),ne("img",SC)):(te(),ne("img",AC))]),Y("div",bC,[i.value?Ye("",!0):(te(),ne("button",{key:0,tabindex:"-1",onClick:q,class:"comment-button",onMouseenter:v[0]||(v[0]=I=>H(!0)),onMouseleave:v[1]||(v[1]=I=>H(!1))},[Y("img",{src:s.value?"icons/icons8-quote.gif":"icons/icons8-quote-50.png",alt:"Add Comment",class:"comment-icon"},null,8,CC)],32)),i.value?(te(),ne("div",RC,[Y("button",{onClick:oe,class:"comment-button cancel-btn",tabindex:"-1"},v[3]||(v[3]=[Y("span",{class:"button-icon"},"✕",-1)])),fo(Y("input",{"onUpdate:modelValue":v[2]||(v[2]=I=>a.value=I),placeholder:"Add a comment...",class:"comment-input",onKeydown:[Vh(z,["enter"]),Vh(oe,["escape"])],autofocus:""},null,544),[[_o,a.value]]),Y("button",{onClick:z,class:"comment-button submit-btn",tabindex:"-1"},v[4]||(v[4]=[Y("span",{class:"button-icon"},"✓",-1)]))])):Ye("",!0)]),Y("div",PC,[Y("button",{onClick:_,class:"nav-button",disabled:!k.value,title:"Previous Comment",tabindex:"-1"}," ⬅︎ ",8,kC),Y("button",{onClick:_e,class:"nav-button",disabled:!N.value,title:"Next Comment",tabindex:"-1"}," ⮕︎ ",8,DC)])]))}},xC=Mn(NC,[["__scopeId","data-v-b23f269f"]]),VC={class:"auth-button-container"},OC={key:0,class:"loading"},MC={key:1,class:"user-info"},LC=["src","alt"],FC={key:1,class:"user-avatar-placeholder"},UC={class:"user-name"},$C={class:"auth-methods"},BC={class:"email-auth-section"},jC={class:"auth-mode-toggle"},qC=["placeholder","minlength"],HC={type:"submit",class:"auth-method-button email-button"},WC={key:4,class:"error-message"},zC={__name:"AuthButton",setup(t){const e=Da(),n=Ae(!1),r=Ae("signin"),s=Ae(""),i=Ae(""),a=Ae(""),c=Ae(null),l=ee(()=>e.isAuthenticated),h=ee(()=>e.userName),f=ee(()=>e.userPhoto),p=ee(()=>e.loading),y=ee(()=>e.error),S=ee(()=>e.isAnonymous),R=()=>{n.value=!n.value,k()},N=()=>{n.value=!1,L()},k=()=>{console.log("clearForm called - clearing authContext from:",c.value),s.value="",i.value="",a.value="",e.clearError()},L=()=>{console.log("clearFormAndContext called - clearing authContext from:",c.value),s.value="",i.value="",a.value="",c.value=null,e.clearError()},q=_=>{console.log("Auth modal triggered with context:",_.detail?.context),c.value=_.detail?.context||null,console.log("authContext set to:",c.value),n.value=!0,k()},H=async()=>{e.clearError();try{await e.loginWithGoogle(),_e()}catch(_){console.error("Google login failed:",_)}},z=async()=>{e.clearError();try{console.log("Starting anonymous login..."),await e.loginAnonymously(),console.log("Anonymous login completed, calling handleAuthSuccess..."),_e()}catch(_){console.error("Anonymous login failed:",_)}},oe=async()=>{e.clearError();try{if(r.value==="signup"){if(!a.value.trim()){e.error.value="Display name is required";return}await e.signUpWithEmail(s.value,i.value,a.value)}else await e.loginWithEmail(s.value,i.value);_e()}catch(_){console.error("Email authentication failed:",_)}},_e=()=>{console.log("handleAuthSuccess called with context:",c.value);const _=c.value;if(n.value=!1,k(),_==="comment"){console.log("Auth success - triggering comment event");const m=new CustomEvent("auth-success-comment");window.dispatchEvent(m),console.log("Comment event dispatched")}else console.log("Auth success but no comment context, context was:",_);c.value=null},w=async()=>{e.clearError(),await e.logout()};return gr(()=>{window.addEventListener("trigger-auth-modal",q)}),On(()=>{window.removeEventListener("trigger-auth-modal",q)}),(_,m)=>(te(),ne("div",VC,[p.value?(te(),ne("div",OC,"Loading...")):l.value?(te(),ne("div",MC,[f.value?(te(),ne("img",{key:0,src:f.value,alt:h.value,class:"user-avatar"},null,8,LC)):(te(),ne("div",FC,Ke(S.value?"👤":"👨‍💻"),1)),Y("span",UC,Ke(h.value),1),Y("button",{onClick:w,class:"auth-button logout-button",tabindex:"-1"},"Logout")])):(te(),ne("button",{key:2,onClick:R,class:"auth-button login-button",tabindex:"-1"}," Sign In ")),n.value?(te(),ne("div",{key:3,class:"auth-modal-overlay",onClick:N},[Y("div",{class:"auth-modal",onClick:m[5]||(m[5]=xh(()=>{},["stop"]))},[Y("div",{class:"modal-header"},[m[6]||(m[6]=Y("h3",null,"Sign In",-1)),Y("button",{onClick:N,class:"close-button"},"×")]),Y("div",$C,[Y("button",{onClick:z,class:"auth-method-button anonymous-button"},m[7]||(m[7]=[Y("span",{class:"button-icon"},"👤",-1),Vo(" Comment as Guest ",-1)])),Y("button",{onClick:H,class:"auth-method-button google-button"},m[8]||(m[8]=[Y("span",{class:"button-icon"},"🌐",-1),Vo(" Sign in with Google ",-1)])),Y("div",BC,[Y("div",jC,[Y("button",{onClick:m[0]||(m[0]=v=>r.value="signin"),class:fn([{active:r.value==="signin"},"mode-button"])}," Sign In ",2),Y("button",{onClick:m[1]||(m[1]=v=>r.value="signup"),class:fn([{active:r.value==="signup"},"mode-button"])}," Sign Up ",2)]),Y("form",{onSubmit:xh(oe,["prevent"]),class:"email-form"},[r.value==="signup"?fo((te(),ne("input",{key:0,"onUpdate:modelValue":m[2]||(m[2]=v=>a.value=v),type:"text",placeholder:"Display Name",required:"",class:"auth-input"},null,512)),[[_o,a.value]]):Ye("",!0),fo(Y("input",{"onUpdate:modelValue":m[3]||(m[3]=v=>s.value=v),type:"email",placeholder:"Email",required:"",class:"auth-input"},null,512),[[_o,s.value]]),fo(Y("input",{"onUpdate:modelValue":m[4]||(m[4]=v=>i.value=v),type:"password",placeholder:r.value==="signup"?"Password (min 6 characters)":"Password",minlength:r.value==="signup"?6:void 0,required:"",class:"auth-input"},null,8,qC),[[_o,i.value]]),Y("button",HC,Ke(r.value==="signup"?"Create Account":"Sign In"),1)],32)])])])])):Ye("",!0),y.value?(te(),ne("div",WC,Ke(y.value),1)):Ye("",!0)]))}},GC=Mn(zC,[["__scopeId","data-v-1f7682e2"]]),KC={class:"comment-container"},QC={key:0,class:"hydrophone-line line-up"},XC={key:1,class:"hydrophone-line line-down"},JC={class:"comment"},YC={class:"comment-author"},ZC={class:"comment-content"},eR={__name:"Comment",props:{comment:{type:Object,required:!0}},setup(t){const e=t,n=Da(),r=ee(()=>n.user?.uid===e.comment.userId),s=a=>{if(!a)return"Anonymous";const c=a.trim().split(" ");if(c.length===1)return c[0];{const l=c[0],h=c[c.length-1].charAt(0).toUpperCase();return`${l} ${h}.`}},i=async()=>{if(!(!r.value||!confirm("Are you sure you want to delete this comment?")))try{await A0(ug(fu,"comments",e.comment.id)),console.log("Comment deleted successfully")}catch(c){console.error("Error deleting comment:",c),alert("Failed to delete comment. Please try again.")}};return(a,c)=>(te(),ne("div",KC,[t.comment.hydrophoneAMuted?Ye("",!0):(te(),ne("div",QC)),t.comment.hydrophoneBMuted?Ye("",!0):(te(),ne("div",XC)),Y("div",JC,[r.value?(te(),ne("button",{key:0,onClick:i,class:"delete-button",title:"Delete comment"}," ✕ ")):Ye("",!0),Y("div",YC,[Y("strong",null,Ke(s(t.comment.userName)),1)]),Y("div",ZC,Ke(t.comment.content),1)])]))}},tR=Mn(eR,[["__scopeId","data-v-5db66e72"]]),nR={key:0,class:"loading-message"},rR={key:1,class:"no-comments"},sR={key:2,class:"comments-timeline"},iR=5625,oR={__name:"Comments",setup(t){const e=Rn(),n=Ui(),r=iR/60,s=Ae(null),i=Ae(0),a=ee(()=>n.comments),c=ee(()=>n.loading);ee(()=>n.error);const l=Ae(!1),h=Ae(0),f=Ae(0);let p=null;const y=()=>{s.value&&(i.value=s.value.clientWidth)},S=ee(()=>{if(i.value===0||a.value.length===0)return[];const L=i.value/2;let q;l.value?q=h.value:q=e.absoluteCurrentTime;const H=i.value/r,z=1e3/r,oe=q-H/2-z,_e=q+H/2+z;return a.value.filter(w=>w.timestamp>=oe&&w.timestamp<=_e).map(w=>{const _=w.timestamp-q,m=L+_*r;return{...w,position:m}}).sort((w,_)=>w.timestamp-_.timestamp)}),R=Ae(0),N=(L,q=300)=>{if(l.value)return;l.value=!0;const H=h.value,z=performance.now(),oe=_e=>{const w=_e-z,_=Math.min(w/q,1),m=_<.5?2*_*_:1-Math.pow(-2*_+2,2)/2;h.value=H+(L-H)*m,_<1?requestAnimationFrame(oe):(l.value=!1,h.value=L)};requestAnimationFrame(oe)},k=L=>{Math.abs(L-R.value)>1&&!e.isPlaying&&!l.value?(h.value=R.value,f.value=L,N(L,300)):l.value||(h.value=L,f.value=L),R.value=L};return gr(async()=>{await fl(),y(),s.value&&(p=new ResizeObserver(()=>{y()}),p.observe(s.value)),h.value=e.absoluteCurrentTime,R.value=e.absoluteCurrentTime,Ht(()=>e.absoluteCurrentTime,L=>{k(L)})}),On(()=>{p&&p.disconnect()}),(L,q)=>(te(),ne("div",{class:"comments-overlay",ref_key:"commentsContainer",ref:s},[c.value?(te(),ne("div",nR," Loading comments... ")):a.value.length===0?(te(),ne("div",rR)):(te(),ne("div",sR,[(te(!0),ne(rt,null,Kt(S.value,H=>(te(),ne("div",{key:H.id,class:"comment-marker",style:Sn({left:`${H.position}px`})},[nt(tR,{comment:H},null,8,["comment"])],4))),128))]))],512))}},aR=Mn(oR,[["__scopeId","data-v-be32bf66"]]),cR={class:"comment-list"},lR={key:0,class:"loading"},uR={key:1,class:"error"},hR={key:2,class:"no-comments"},dR={key:3,class:"comments-container"},fR=["onClick"],pR={class:"comment-time"},mR={class:"comment-user"},gR={class:"comment-content"},_R={__name:"CommentList",setup(t){const e=Ui(),n=Rn(),r=ee(()=>e.sortedComments),s=ee(()=>e.loading),i=ee(()=>e.error),a=ee(()=>n.absoluteCurrentTime),c=ee(()=>{if(!r.value.length)return[];let y=0,S=Math.abs(r.value[0].timestamp-a.value);for(let k=1;k<r.value.length;k++){const L=Math.abs(r.value[k].timestamp-a.value);L<S&&(S=L,y=k)}const R=Math.max(0,y-2),N=Math.min(r.value.length-1,y+2);return r.value.slice(R,N+1)}),l=y=>{if(!r.value.length)return!1;let S=r.value[0],R=Math.abs(r.value[0].timestamp-a.value);for(const N of r.value){const k=Math.abs(N.timestamp-a.value);k<R&&(R=k,S=N)}return y.id===S.id},h=y=>{n.updateAbsoluteCurrentTime(y.timestamp)},f=y=>{const S=new Date("2025-07-04T03:29:56.000Z"),R=new Date(S.getTime()+y*1e3),N=new Date(R.getTime()+480*60*1e3),k=N.getUTCFullYear(),L=(N.getUTCMonth()+1).toString().padStart(2,"0"),q=N.getUTCDate().toString().padStart(2,"0"),H=N.getUTCHours().toString().padStart(2,"0"),z=N.getUTCMinutes().toString().padStart(2,"0"),oe=N.getUTCSeconds().toString().padStart(2,"0"),_e=N.getUTCMilliseconds().toString().padStart(3,"0");return`${k}-${L}-${q} ${H}:${z}:${oe}.${_e}`},p=y=>{if(!y)return"";const S=y.trim().split(/\s+/);if(S.length===1)return S[0];const R=S[0],N=S[S.length-1].charAt(0).toUpperCase();return`${R} ${N}.`};return(y,S)=>(te(),ne("div",cR,[s.value?(te(),ne("div",lR,"Loading comments...")):i.value?(te(),ne("div",uR,"Error loading comments: "+Ke(i.value),1)):c.value.length===0?(te(),ne("div",hR,"No comments found")):(te(),ne("div",dR,[(te(!0),ne(rt,null,Kt(c.value,R=>(te(),ne("div",{key:R.id,class:fn(["comment-item",{"current-comment":l(R)}]),onClick:N=>h(R)},[Y("span",pR,Ke(f(R.timestamp)),1),Y("span",mR,Ke(p(R.userName)),1),Y("span",gR,Ke(R.content),1)],10,fR))),128))]))]))}},yR=Mn(_R,[["__scopeId","data-v-378bc0aa"]]),vR={class:"app"},TR={class:"header"},ER={class:"auth-container"},IR={class:"data-section"},wR={class:"med"},AR={class:"data-section"},SR={__name:"App",setup(t){const e=Rn(),n=vl(),r=Da(),s=Ui(),i=()=>{const f=new URLSearchParams(window.location.search).get("t");if(f){const p=parseFloat(f);if(!isNaN(p))return p}return null};let a=0;const c=h=>{const f=performance.now();if(f-a<250)return;a=f;const p=new URL(window.location);p.searchParams.set("t",h.toFixed(2));try{window.history.replaceState({},"",p)}catch(y){console.error("replaceState throttled:",y)}};Ht(()=>e.absoluteCurrentTime,h=>{c(h)},{immediate:!1});const l=h=>{if(h.code==="Space"){const f=document.activeElement;if(f&&(f.tagName==="INPUT"||f.tagName==="TEXTAREA"||f.contentEditable==="true"))return;h.preventDefault(),e.setPlayingStatus(!e.isPlaying)}};return gr(async()=>{r.initializeAuth(),s.loadComments(),await Promise.all([e.load(),n.load()]);const h=i();h!==null?e.updateAbsoluteCurrentTime(h):c(e.absoluteCurrentTime),window.addEventListener("keydown",l)}),On(()=>{window.removeEventListener("keydown",l)}),(h,f)=>(te(),ne("div",vR,[Y("div",TR,[f[0]||(f[0]=Y("div",{class:"headerleft"},[Y("h1",null,"Dinacon Hydrophone Explorer"),Y("h2",null,"Passive Acoustic Listening tool by Logan, hydrophone recordings by Ashlin")],-1)),Y("div",ER,[nt(GC)])]),nt(TC),f[1]||(f[1]=Y("div",{class:"spacer"},null,-1)),Y("div",IR,[nt(jh,{storeType:"A"}),nt(Bh,{storeType:"A"})]),Y("div",wR,[nt(xC),nt(aR)]),Y("div",AR,[nt(jh,{storeType:"B"}),nt(Bh,{storeType:"B"})]),nt(yR)]))}},bR=Mn(SR,[["__scopeId","data-v-e5f10ee7"]]),i_=Xv(bR),CR=Zv();i_.use(CR);i_.mount("#app");
