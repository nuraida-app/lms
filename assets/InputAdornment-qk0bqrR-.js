import{g as y,f as C,s as I,e as c,r as f,h as A,_ as j,j as a,k as L,av as m,l as z}from"./index-B4oIbNwU.js";import{u as R,F}from"./utils-CoNKf_2-.js";import{T}from"./Typography-DLQ9NUQX.js";function _(e){return C("MuiInputAdornment",e)}const b=y("MuiInputAdornment",["root","filled","standard","outlined","positionStart","positionEnd","disablePointerEvents","hiddenLabel","sizeSmall"]);var g;const $=["children","className","component","disablePointerEvents","disableTypography","position","variant"],M=(e,t)=>{const{ownerState:n}=e;return[t.root,t[`position${m(n.position)}`],n.disablePointerEvents===!0&&t.disablePointerEvents,t[n.variant]]},N=e=>{const{classes:t,disablePointerEvents:n,hiddenLabel:o,position:s,size:r,variant:l}=e,d={root:["root",n&&"disablePointerEvents",s&&`position${m(s)}`,l,o&&"hiddenLabel",r&&`size${m(r)}`]};return z(d,_,t)},U=I("div",{name:"MuiInputAdornment",slot:"Root",overridesResolver:M})(({theme:e,ownerState:t})=>c({display:"flex",height:"0.01em",maxHeight:"2em",alignItems:"center",whiteSpace:"nowrap",color:(e.vars||e).palette.action.active},t.variant==="filled"&&{[`&.${b.positionStart}&:not(.${b.hiddenLabel})`]:{marginTop:16}},t.position==="start"&&{marginRight:8},t.position==="end"&&{marginLeft:8},t.disablePointerEvents===!0&&{pointerEvents:"none"})),D=f.forwardRef(function(t,n){const o=A({props:t,name:"MuiInputAdornment"}),{children:s,className:r,component:l="div",disablePointerEvents:d=!1,disableTypography:x=!1,position:u,variant:v}=o,E=j(o,$),i=R()||{};let p=v;v&&i.variant,i&&!p&&(p=i.variant);const h=c({},o,{hiddenLabel:i.hiddenLabel,size:i.size,disablePointerEvents:d,position:u,variant:p}),P=N(h);return a.jsx(F.Provider,{value:null,children:a.jsx(U,c({as:l,ownerState:h,className:L(P.root,r),ref:n},E,{children:typeof s=="string"&&!x?a.jsx(T,{color:"text.secondary",children:s}):a.jsxs(f.Fragment,{children:[u==="start"?g||(g=a.jsx("span",{className:"notranslate",children:"​"})):null,s]})}))})});export{D as I};
