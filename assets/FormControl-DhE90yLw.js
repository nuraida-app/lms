import{f as q,g as I,s as T,e as u,av as P,r as s,h as $,_ as k,j as R,k as w,l as G}from"./index-B4oIbNwU.js";import{a as H,i as A,F as J}from"./utils-CoNKf_2-.js";import{f as F}from"./createSvgIcon-BZOpo86E.js";function K(e){return q("MuiFormControl",e)}I("MuiFormControl",["root","marginNone","marginNormal","marginDense","fullWidth","disabled"]);const O=["children","className","color","component","disabled","error","focused","fullWidth","hiddenLabel","margin","required","size","variant"],Q=e=>{const{classes:t,margin:a,fullWidth:i}=e,r={root:["root",a!=="none"&&`margin${P(a)}`,i&&"fullWidth"]};return G(r,K,t)},V=T("div",{name:"MuiFormControl",slot:"Root",overridesResolver:({ownerState:e},t)=>u({},t.root,t[`margin${P(e.margin)}`],e.fullWidth&&t.fullWidth)})(({ownerState:e})=>u({display:"inline-flex",flexDirection:"column",position:"relative",minWidth:0,padding:0,margin:0,border:0,verticalAlign:"top"},e.margin==="normal"&&{marginTop:16,marginBottom:8},e.margin==="dense"&&{marginTop:8,marginBottom:4},e.fullWidth&&{width:"100%"})),ee=s.forwardRef(function(t,a){const i=$({props:t,name:"MuiFormControl"}),{children:r,className:U,color:d="primary",component:v="div",disabled:n=!1,error:m=!1,focused:x,fullWidth:c=!1,hiddenLabel:f=!1,margin:_="none",required:p=!1,size:g="medium",variant:h="outlined"}=i,z=k(i,O),W=u({},i,{color:d,component:v,disabled:n,error:m,fullWidth:c,hiddenLabel:f,margin:_,required:p,size:g,variant:h}),B=Q(W),[S,D]=s.useState(()=>{let l=!1;return r&&s.Children.forEach(r,o=>{if(!F(o,["Input","Select"]))return;const N=F(o,["Select"])?o.props.input:o;N&&H(N.props)&&(l=!0)}),l}),[b,y]=s.useState(()=>{let l=!1;return r&&s.Children.forEach(r,o=>{F(o,["Input","Select"])&&(A(o.props,!0)||A(o.props.inputProps,!0))&&(l=!0)}),l}),[E,C]=s.useState(!1);n&&E&&C(!1);const M=x!==void 0&&!n?x:E;let j;const L=s.useMemo(()=>({adornedStart:S,setAdornedStart:D,color:d,disabled:n,error:m,filled:b,focused:M,fullWidth:c,hiddenLabel:f,size:g,onBlur:()=>{C(!1)},onEmpty:()=>{y(!1)},onFilled:()=>{y(!0)},onFocus:()=>{C(!0)},registerEffect:j,required:p,variant:h}),[S,d,n,m,b,M,c,f,j,p,g,h]);return R.jsx(J.Provider,{value:L,children:R.jsx(V,u({as:v,ownerState:W,className:w(B.root,U),ref:a},z,{children:r}))})});export{ee as F};
