import{al as x,am as g,af as P,ap as s,av as l,r as b,an as R,ao as $,j as q,aq as y,ar as C}from"./index-CFLTN1m7.js";const v=a=>{let e;return a<1?e=5.11916*a**2:e=4.5*Math.log(a+1)+2,(e/100).toFixed(2)};function k(a){return x("MuiPaper",a)}g("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const M=["className","component","elevation","square","variant"],_=a=>{const{square:e,elevation:o,variant:t,classes:n}=a,r={root:["root",t,!e&&"rounded",t==="elevation"&&`elevation${o}`]};return C(r,k,n)},j=P("div",{name:"MuiPaper",slot:"Root",overridesResolver:(a,e)=>{const{ownerState:o}=a;return[e.root,e[o.variant],!o.square&&e.rounded,o.variant==="elevation"&&e[`elevation${o.elevation}`]]}})(({theme:a,ownerState:e})=>{var o;return s({backgroundColor:(a.vars||a).palette.background.paper,color:(a.vars||a).palette.text.primary,transition:a.transitions.create("box-shadow")},!e.square&&{borderRadius:a.shape.borderRadius},e.variant==="outlined"&&{border:`1px solid ${(a.vars||a).palette.divider}`},e.variant==="elevation"&&s({boxShadow:(a.vars||a).shadows[e.elevation]},!a.vars&&a.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${l("#fff",v(e.elevation))}, ${l("#fff",v(e.elevation))})`},a.vars&&{backgroundImage:(o=a.vars.overlays)==null?void 0:o[e.elevation]}))}),U=b.forwardRef(function(e,o){const t=R({props:e,name:"MuiPaper"}),{className:n,component:r="div",elevation:d=1,square:u=!1,variant:p="elevation"}=t,c=$(t,M),i=s({},t,{component:r,elevation:d,square:u,variant:p}),f=_(i);return q.jsx(j,s({as:r,ownerState:i,className:y(f.root,n),ref:o},c))});export{U as P};
