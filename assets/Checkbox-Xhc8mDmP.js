import{j as t,aq as P,ap as y,aj as B,aJ as M,aI as l,at as n,aK as g,r as u,ar as S,as as R,au as _,av as H}from"./index-Cw8L1vs3.js";import{S as E}from"./SwitchBase-DBD4yWtP.js";import{c as x}from"./createSvgIcon-Dv0_A-gv.js";const O=x(t.jsx("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),U=x(t.jsx("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),V=x(t.jsx("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox");function L(o){return y("MuiCheckbox",o)}const m=P("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary","sizeSmall","sizeMedium"]),N=["checkedIcon","color","icon","indeterminate","indeterminateIcon","inputProps","size","className"],F=o=>{const{classes:e,indeterminate:c,color:s,size:r}=o,a={root:["root",c&&"indeterminate",`color${l(s)}`,`size${l(r)}`]},d=H(a,L,e);return n({},e,d)},q=B(E,{shouldForwardProp:o=>M(o)||o==="classes",name:"MuiCheckbox",slot:"Root",overridesResolver:(o,e)=>{const{ownerState:c}=o;return[e.root,c.indeterminate&&e.indeterminate,e[`size${l(c.size)}`],c.color!=="default"&&e[`color${l(c.color)}`]]}})(({theme:o,ownerState:e})=>n({color:(o.vars||o).palette.text.secondary},!e.disableRipple&&{"&:hover":{backgroundColor:o.vars?`rgba(${e.color==="default"?o.vars.palette.action.activeChannel:o.vars.palette[e.color].mainChannel} / ${o.vars.palette.action.hoverOpacity})`:g(e.color==="default"?o.palette.action.active:o.palette[e.color].main,o.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},e.color!=="default"&&{[`&.${m.checked}, &.${m.indeterminate}`]:{color:(o.vars||o).palette[e.color].main},[`&.${m.disabled}`]:{color:(o.vars||o).palette.action.disabled}})),D=t.jsx(U,{}),J=t.jsx(O,{}),K=t.jsx(V,{}),G=u.forwardRef(function(e,c){var s,r;const a=S({props:e,name:"MuiCheckbox"}),{checkedIcon:d=D,color:z="primary",icon:I=J,indeterminate:i=!1,indeterminateIcon:h=K,inputProps:b,size:p="medium",className:$}=a,j=R(a,N),C=i?h:I,k=i?h:d,v=n({},a,{color:z,indeterminate:i,size:p}),f=F(v);return t.jsx(q,n({type:"checkbox",inputProps:n({"data-indeterminate":i},b),icon:u.cloneElement(C,{fontSize:(s=C.props.fontSize)!=null?s:p}),checkedIcon:u.cloneElement(k,{fontSize:(r=k.props.fontSize)!=null?r:p}),ownerState:v,ref:c,className:_(f.root,$)},j,{classes:f}))});export{G as C};
