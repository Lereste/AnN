import{Aa as c,Hb as f,Pb as g,Ra as a,Ta as r,Ua as d,Va as p,Za as l,ca as s,hb as m,ib as u}from"./chunk-OGED3COA.js";var w=e=>({"show-scroll":e}),S=(()=>{let o=class o{constructor(){this.showScroll=!1,this.showScrollHeight=100,this.hideScrollHeight=100}onWindowScroll(){(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop)>this.showScrollHeight?this.showScroll=!0:this.showScroll&&(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop)<this.hideScrollHeight&&(this.showScroll=!1)}scrollToTop(){let t=document.documentElement.scrollTop||document.body.scrollTop;t>0&&window.scrollTo(0,t-t/1)}};o.\u0275fac=function(n){return new(n||o)},o.\u0275cmp=s({type:o,selectors:[["app-go-to-top"]],hostBindings:function(n,i){n&1&&l("scroll",function(){return i.onWindowScroll()},!1,c)},standalone:!0,features:[m],decls:3,vars:3,consts:[[1,"scroll-to-top",3,"click","ngClass"],[1,"goto-top"],[1,"fa-solid","fa-arrow-up"]],template:function(n,i){n&1&&(r(0,"button",0),l("click",function(){return i.scrollToTop()}),r(1,"div",1),p(2,"i",2),d()()),n&2&&a("ngClass",u(1,w,i.showScroll))},dependencies:[g,f],styles:["button[_ngcontent-%COMP%]{border:none;cursor:pointer;border-radius:5px}.scroll-to-top[_ngcontent-%COMP%]{position:fixed;bottom:40px;right:40px;opacity:0;transition:all .2s ease-in-out}.show-scroll[_ngcontent-%COMP%]{opacity:1}.goto-top[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:2rem;border-radius:20%;color:#fff;background-color:#dc2f2f;padding:.6rem 1rem;text-align:center;transition:.3s;animation:_ngcontent-%COMP%_bounce 3s ease-in-out infinite}.goto-top[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]:hover{background-color:#212529}@keyframes _ngcontent-%COMP%_bounce{0%{transform:scale(.5)}50%{transform:scale(1.5)}0%{transform:scale(1)}}"]});let e=o;return e})();export{S as a};