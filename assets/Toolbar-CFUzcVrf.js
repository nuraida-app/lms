import{S as m,at as e,r as u,ar as d,as as g,j as x,au as f,av as I,ap as b,aq as L}from"./index-CYXdUE1E.js";import{a as R}from"./listItemIconClasses-cx9A8stw.js";import{e as T}from"./ExitToApp-HVnRz0UA.js";const C=["className"],S=t=>{const{alignItems:s,classes:o}=t;return I({root:["root",s==="flex-start"&&"alignItemsFlexStart"]},R,o)},y=m("div",{name:"MuiListItemIcon",slot:"Root",overridesResolver:(t,s)=>{const{ownerState:o}=t;return[s.root,o.alignItems==="flex-start"&&s.alignItemsFlexStart]}})(({theme:t,ownerState:s})=>e({minWidth:56,color:(t.vars||t).palette.action.active,flexShrink:0,display:"inline-flex"},s.alignItems==="flex-start"&&{marginTop:8})),h=u.forwardRef(function(s,o){const a=d({props:s,name:"MuiListItemIcon"}),{className:r}=a,n=g(a,C),l=u.useContext(T),i=e({},a,{alignItems:l.alignItems}),c=S(i);return x.jsx(y,e({className:f(c.root,r),ownerState:i,ref:o},n))});function M(t){return b("MuiToolbar",t)}L("MuiToolbar",["root","gutters","regular","dense"]);const N=["className","component","disableGutters","variant"],U=t=>{const{classes:s,disableGutters:o,variant:a}=t;return I({root:["root",!o&&"gutters",a]},M,s)},j=m("div",{name:"MuiToolbar",slot:"Root",overridesResolver:(t,s)=>{const{ownerState:o}=t;return[s.root,!o.disableGutters&&s.gutters,s[o.variant]]}})(({theme:t,ownerState:s})=>e({position:"relative",display:"flex",alignItems:"center"},!s.disableGutters&&{paddingLeft:t.spacing(2),paddingRight:t.spacing(2),[t.breakpoints.up("sm")]:{paddingLeft:t.spacing(3),paddingRight:t.spacing(3)}},s.variant==="dense"&&{minHeight:48}),({theme:t,ownerState:s})=>s.variant==="regular"&&t.mixins.toolbar),k=u.forwardRef(function(s,o){const a=d({props:s,name:"MuiToolbar"}),{className:r,component:n="div",disableGutters:l=!1,variant:i="regular"}=a,c=g(a,N),p=e({},a,{component:n,disableGutters:l,variant:i}),v=U(p);return x.jsx(j,e({as:n,className:f(v.root,r),ref:o,ownerState:p},c))});export{h as L,k as T};
