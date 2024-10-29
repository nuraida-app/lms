import{aq as k,ap as q,S as v,aI as M,at as a,r as y,ar as N,as as j,j as m,au as F,av as G}from"./index-CUBHetVN.js";import{u as S,f as D}from"./utils-C7ZUp4cy.js";import{T as $}from"./Typography-Bk7xBqzM.js";import{S as W}from"./Stack-qcdLjNrC.js";function I(e){return q("MuiFormControlLabel",e)}const u=k("MuiFormControlLabel",["root","labelPlacementStart","labelPlacementTop","labelPlacementBottom","disabled","label","error","required","asterisk"]),z=["checked","className","componentsProps","control","disabled","disableTypography","inputRef","label","labelPlacement","name","onChange","required","slotProps","value"],B=e=>{const{classes:o,disabled:r,labelPlacement:s,error:l,required:t}=e,c={root:["root",r&&"disabled",`labelPlacement${M(s)}`,l&&"error",t&&"required"],label:["label",r&&"disabled"],asterisk:["asterisk",l&&"error"]};return G(c,I,o)},H=v("label",{name:"MuiFormControlLabel",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:r}=e;return[{[`& .${u.label}`]:o.label},o.root,o[`labelPlacement${M(r.labelPlacement)}`]]}})(({theme:e,ownerState:o})=>a({display:"inline-flex",alignItems:"center",cursor:"pointer",verticalAlign:"middle",WebkitTapHighlightColor:"transparent",marginLeft:-11,marginRight:16,[`&.${u.disabled}`]:{cursor:"default"}},o.labelPlacement==="start"&&{flexDirection:"row-reverse",marginLeft:16,marginRight:-11},o.labelPlacement==="top"&&{flexDirection:"column-reverse",marginLeft:16},o.labelPlacement==="bottom"&&{flexDirection:"column",marginLeft:16},{[`& .${u.label}`]:{[`&.${u.disabled}`]:{color:(e.vars||e).palette.text.disabled}}})),J=v("span",{name:"MuiFormControlLabel",slot:"Asterisk",overridesResolver:(e,o)=>o.asterisk})(({theme:e})=>({[`&.${u.error}`]:{color:(e.vars||e).palette.error.main}})),oe=y.forwardRef(function(o,r){var s,l;const t=N({props:o,name:"MuiFormControlLabel"}),{className:c,componentsProps:b={},control:n,disabled:p,disableTypography:f,label:T,labelPlacement:U="end",required:w,slotProps:_={}}=t,E=j(t,z),C=S(),L=(s=p??n.props.disabled)!=null?s:C==null?void 0:C.disabled,g=w??n.props.required,R={disabled:L,required:g};["checked","name","onChange","value","inputRef"].forEach(d=>{typeof n.props[d]>"u"&&typeof t[d]<"u"&&(R[d]=t[d])});const A=D({props:t,muiFormControl:C,states:["error"]}),P=a({},t,{disabled:L,labelPlacement:U,required:g,error:A.error}),h=B(P),x=(l=_.typography)!=null?l:b.typography;let i=T;return i!=null&&i.type!==$&&!f&&(i=m.jsx($,a({component:"span"},x,{className:F(h.label,x==null?void 0:x.className),children:i}))),m.jsxs(H,a({className:F(h.root,c),ownerState:P,ref:r},E,{children:[y.cloneElement(n,R),g?m.jsxs(W,{display:"block",children:[i,m.jsxs(J,{ownerState:P,"aria-hidden":!0,className:h.asterisk,children:[" ","*"]})]}):i]}))});function K(e){return q("MuiFormGroup",e)}k("MuiFormGroup",["root","row","error"]);const O=["className","row"],Q=e=>{const{classes:o,row:r,error:s}=e;return G({root:["root",r&&"row",s&&"error"]},K,o)},V=v("div",{name:"MuiFormGroup",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:r}=e;return[o.root,r.row&&o.row]}})(({ownerState:e})=>a({display:"flex",flexDirection:"column",flexWrap:"wrap"},e.row&&{flexDirection:"row"})),re=y.forwardRef(function(o,r){const s=N({props:o,name:"MuiFormGroup"}),{className:l,row:t=!1}=s,c=j(s,O),b=S(),n=D({props:s,muiFormControl:b,states:["error"]}),p=a({},s,{row:t,error:n.error}),f=Q(p);return m.jsx(V,a({className:F(f.root,l),ownerState:p,ref:r},c))});export{re as F,oe as a};
