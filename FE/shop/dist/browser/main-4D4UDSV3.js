import"./chunk-UK7H3XYE.js";import"./chunk-RNBGSWGT.js";import{a as g,b as w,d as E,f as S}from"./chunk-WMJJ2MD3.js";import{f as b,g as d,h as y,m as P,n as v,p as T,u as j}from"./chunk-53NOLODJ.js";import"./chunk-WXI33M2S.js";import{Ab as f,Fa as M,Ha as F,Ia as m,Ka as u,La as h,T as N,U as c,Va as O,Z as p,_ as I,ca as R,fa as D,hb as C,wa as a}from"./chunk-OGED3COA.js";var x=[{path:"",pathMatch:"full",redirectTo:""},{path:"",loadChildren:()=>import("./chunk-SOYOR3WT.js").then(o=>o.PagesModule)}];var Y=(()=>{let e=class e extends v{constructor(r,i,n){super(r,i,n)}ngOnDestroy(){this.flush()}};e.\u0275fac=function(i){return new(i||e)(p(f),p(d),p(y))},e.\u0275prov=c({token:e,factory:e.\u0275fac});let o=e;return o})();function Z(){return new P}function H(o,e,t){return new j(o,e,t)}var k=[{provide:y,useFactory:Z},{provide:v,useClass:Y},{provide:m,useFactory:H,deps:[g,v,h]}],X=[{provide:d,useFactory:()=>new T},{provide:a,useValue:"BrowserAnimations"},...k],ae=[{provide:d,useClass:b},{provide:a,useValue:"NoopAnimations"},...k];function z(){return u("NgEagerAnimations"),[...X]}var q="@",G=(()=>{let e=class e{constructor(r,i,n,s,l){this.doc=r,this.delegate=i,this.zone=n,this.animationType=s,this.moduleImpl=l,this._rendererFactoryPromise=null,this.scheduler=I(F,{optional:!0})}ngOnDestroy(){this._engine?.flush()}loadImpl(){return(this.moduleImpl??import("./chunk-3NGQ7WYH.js").then(i=>i)).catch(i=>{throw new N(5300,!1)}).then(({\u0275createEngine:i,\u0275AnimationRendererFactory:n})=>{this._engine=i(this.animationType,this.doc);let s=new n(this.delegate,this._engine,this.zone);return this.delegate=s,s})}createRenderer(r,i){let n=this.delegate.createRenderer(r,i);if(n.\u0275type===0)return n;typeof n.throwOnSyntheticProps=="boolean"&&(n.throwOnSyntheticProps=!1);let s=new A(n);return i?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(l=>{let L=l.createRenderer(r,i);s.use(L),this.scheduler?.notify(9)}).catch(l=>{s.use(n)}),s}begin(){this.delegate.begin?.()}end(){this.delegate.end?.()}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}};e.\u0275fac=function(i){M()},e.\u0275prov=c({token:e,factory:e.\u0275fac});let o=e;return o})(),A=class{constructor(e){this.delegate=e,this.replay=[],this.\u0275type=1}use(e){if(this.delegate=e,this.replay!==null){for(let t of this.replay)t(e);this.replay=null}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy()}createElement(e,t){return this.delegate.createElement(e,t)}createComment(e){return this.delegate.createComment(e)}createText(e){return this.delegate.createText(e)}get destroyNode(){return this.delegate.destroyNode}appendChild(e,t){this.delegate.appendChild(e,t)}insertBefore(e,t,r,i){this.delegate.insertBefore(e,t,r,i)}removeChild(e,t,r){this.delegate.removeChild(e,t,r)}selectRootElement(e,t){return this.delegate.selectRootElement(e,t)}parentNode(e){return this.delegate.parentNode(e)}nextSibling(e){return this.delegate.nextSibling(e)}setAttribute(e,t,r,i){this.delegate.setAttribute(e,t,r,i)}removeAttribute(e,t,r){this.delegate.removeAttribute(e,t,r)}addClass(e,t){this.delegate.addClass(e,t)}removeClass(e,t){this.delegate.removeClass(e,t)}setStyle(e,t,r,i){this.delegate.setStyle(e,t,r,i)}removeStyle(e,t,r){this.delegate.removeStyle(e,t,r)}setProperty(e,t,r){this.shouldReplay(t)&&this.replay.push(i=>i.setProperty(e,t,r)),this.delegate.setProperty(e,t,r)}setValue(e,t){this.delegate.setValue(e,t)}listen(e,t,r){return this.shouldReplay(t)&&this.replay.push(i=>i.listen(e,t,r)),this.delegate.listen(e,t,r)}shouldReplay(e){return this.replay!==null&&e.startsWith(q)}};function B(o="animations"){return u("NgAsyncAnimations"),D([{provide:m,useFactory:(e,t,r)=>new G(e,t,r,o),deps:[f,g,h]},{provide:a,useValue:o==="noop"?"NoopAnimations":"BrowserAnimations"}])}var U={providers:[S(x),z(),B()]};var W=(()=>{let e=class e{constructor(){this.title="shop"}};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=R({type:e,selectors:[["app-root"]],standalone:!0,features:[C],decls:1,vars:0,template:function(i,n){i&1&&O(0,"router-outlet")},dependencies:[E]});let o=e;return o})();w(W,U).catch(o=>console.error(o));