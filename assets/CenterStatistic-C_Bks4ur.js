import{an as z,am as A,aI as $,ag as v,au as m,aq as h,a$ as B,r as g,ao as O,ap as U,j as t,ar as K,as as E,aG as H,aH as W,bt as F,c as Q,k as X}from"./index-G82UTrCn.js";import{a as V}from"./Layout-G7IJTj8o.js";import{u as Y}from"./listItemIconClasses-BSIN4rD4.js";import{P as L}from"./Paper-DBOqaJq5.js";import{T as R}from"./Typography-CoGnB29M.js";import{T as J}from"./Tooltip-Cp9tTyZX.js";import{S as Z}from"./Stack-Con9USGp.js";import{I as rr}from"./Input-syLy80gE.js";import{T as er}from"./TableContainer-CUCdmgqw.js";import{T as ar,a as tr,b as _,c as y}from"./TableRow-CO8xwdyM.js";import{T as or}from"./TableBody-Cv424Fuu.js";import{T as nr}from"./TablePagination-Cp-ItbQ6.js";import{G as k}from"./Grid-BgbEqzWG.js";import{B as ir}from"./ButtonGroup-DsFkrwNq.js";import{B as sr}from"./Button-CHQ1KwEF.js";import"./createSvgIcon-CeYISK_x.js";import"./PeopleAlt-DBuvqLwj.js";import"./ExitToApp-0GzhY9To.js";import"./useTheme-DJawdtle.js";import"./Popper-CGyJoY49.js";import"./Modal-CtA4xjVx.js";import"./Grow-Buq8Ogz4.js";import"./useThemeProps-DqE9My6c.js";import"./getThemeProps-BoIgSFff.js";import"./utils-ByYNmCUA.js";import"./GlobalStyles-D58LhnrN.js";import"./KeyboardArrowRight-CY7Ru3oi.js";import"./IconButton-CWqouqv2.js";import"./Toolbar-Bo4yIoDF.js";import"./Select-DNMQGzct.js";import"./Menu-D9wNm7WS.js";import"./MenuItem-CNbPalIX.js";function lr(r){return A("MuiLinearProgress",r)}const M=z("MuiLinearProgress",["root","colorPrimary","colorSecondary","determinate","indeterminate","buffer","query","dashed","dashedColorPrimary","dashedColorSecondary","bar","barColorPrimary","barColorSecondary","bar1Indeterminate","bar1Determinate","bar1Buffer","bar2Indeterminate","bar2Buffer"]),cr=["className","color","value","valueBuffer","variant"];let x=r=>r,N,S,q,w,D,G;const T=4,mr=$(N||(N=x`
  0% {
    left: -35%;
    right: 100%;
  }

  60% {
    left: 100%;
    right: -90%;
  }

  100% {
    left: 100%;
    right: -90%;
  }
`)),dr=$(S||(S=x`
  0% {
    left: -200%;
    right: 100%;
  }

  60% {
    left: 107%;
    right: -8%;
  }

  100% {
    left: 107%;
    right: -8%;
  }
`)),ur=$(q||(q=x`
  0% {
    opacity: 1;
    background-position: 0 -23px;
  }

  60% {
    opacity: 0;
    background-position: 0 -23px;
  }

  100% {
    opacity: 1;
    background-position: -200px -23px;
  }
`)),pr=r=>{const{classes:e,variant:a,color:o}=r,d={root:["root",`color${m(o)}`,a],dashed:["dashed",`dashedColor${m(o)}`],bar1:["bar",`barColor${m(o)}`,(a==="indeterminate"||a==="query")&&"bar1Indeterminate",a==="determinate"&&"bar1Determinate",a==="buffer"&&"bar1Buffer"],bar2:["bar",a!=="buffer"&&`barColor${m(o)}`,a==="buffer"&&`color${m(o)}`,(a==="indeterminate"||a==="query")&&"bar2Indeterminate",a==="buffer"&&"bar2Buffer"]};return E(d,lr,e)},I=(r,e)=>e==="inherit"?"currentColor":r.vars?r.vars.palette.LinearProgress[`${e}Bg`]:r.palette.mode==="light"?H(r.palette[e].main,.62):W(r.palette[e].main,.5),fr=v("span",{name:"MuiLinearProgress",slot:"Root",overridesResolver:(r,e)=>{const{ownerState:a}=r;return[e.root,e[`color${m(a.color)}`],e[a.variant]]}})(({ownerState:r,theme:e})=>h({position:"relative",overflow:"hidden",display:"block",height:4,zIndex:0,"@media print":{colorAdjust:"exact"},backgroundColor:I(e,r.color)},r.color==="inherit"&&r.variant!=="buffer"&&{backgroundColor:"none","&::before":{content:'""',position:"absolute",left:0,top:0,right:0,bottom:0,backgroundColor:"currentColor",opacity:.3}},r.variant==="buffer"&&{backgroundColor:"transparent"},r.variant==="query"&&{transform:"rotate(180deg)"})),gr=v("span",{name:"MuiLinearProgress",slot:"Dashed",overridesResolver:(r,e)=>{const{ownerState:a}=r;return[e.dashed,e[`dashedColor${m(a.color)}`]]}})(({ownerState:r,theme:e})=>{const a=I(e,r.color);return h({position:"absolute",marginTop:0,height:"100%",width:"100%"},r.color==="inherit"&&{opacity:.3},{backgroundImage:`radial-gradient(${a} 0%, ${a} 16%, transparent 42%)`,backgroundSize:"10px 10px",backgroundPosition:"0 -23px"})},B(w||(w=x`
    animation: ${0} 3s infinite linear;
  `),ur)),br=v("span",{name:"MuiLinearProgress",slot:"Bar1",overridesResolver:(r,e)=>{const{ownerState:a}=r;return[e.bar,e[`barColor${m(a.color)}`],(a.variant==="indeterminate"||a.variant==="query")&&e.bar1Indeterminate,a.variant==="determinate"&&e.bar1Determinate,a.variant==="buffer"&&e.bar1Buffer]}})(({ownerState:r,theme:e})=>h({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left",backgroundColor:r.color==="inherit"?"currentColor":(e.vars||e).palette[r.color].main},r.variant==="determinate"&&{transition:`transform .${T}s linear`},r.variant==="buffer"&&{zIndex:1,transition:`transform .${T}s linear`}),({ownerState:r})=>(r.variant==="indeterminate"||r.variant==="query")&&B(D||(D=x`
      width: auto;
      animation: ${0} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    `),mr)),hr=v("span",{name:"MuiLinearProgress",slot:"Bar2",overridesResolver:(r,e)=>{const{ownerState:a}=r;return[e.bar,e[`barColor${m(a.color)}`],(a.variant==="indeterminate"||a.variant==="query")&&e.bar2Indeterminate,a.variant==="buffer"&&e.bar2Buffer]}})(({ownerState:r,theme:e})=>h({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left"},r.variant!=="buffer"&&{backgroundColor:r.color==="inherit"?"currentColor":(e.vars||e).palette[r.color].main},r.color==="inherit"&&{opacity:.3},r.variant==="buffer"&&{backgroundColor:I(e,r.color),transition:`transform .${T}s linear`}),({ownerState:r})=>(r.variant==="indeterminate"||r.variant==="query")&&B(G||(G=x`
      width: auto;
      animation: ${0} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
    `),dr)),xr=g.forwardRef(function(e,a){const o=O({props:e,name:"MuiLinearProgress"}),{className:d,color:l="primary",value:n,valueBuffer:c,variant:u="indeterminate"}=o,j=U(o,cr),p=h({},o,{color:l,variant:u}),b=pr(p),i=Y(),s={},C={bar1:{},bar2:{}};if((u==="determinate"||u==="buffer")&&n!==void 0){s["aria-valuenow"]=Math.round(n),s["aria-valuemin"]=0,s["aria-valuemax"]=100;let f=n-100;i&&(f=-f),C.bar1.transform=`translateX(${f}%)`}if(u==="buffer"&&c!==void 0){let f=(c||0)-100;i&&(f=-f),C.bar2.transform=`translateX(${f}%)`}return t.jsxs(fr,h({className:K(b.root,d),ownerState:p,role:"progressbar"},s,{ref:a},j,{children:[u==="buffer"?t.jsx(gr,{className:b.dashed,ownerState:p}):null,t.jsx(br,{className:b.bar1,ownerState:p,style:C.bar1}),u==="determinate"?null:t.jsx(hr,{className:b.bar2,ownerState:p,style:C.bar2})]}))}),vr=v(xr)(({theme:r})=>({height:10,borderRadius:5,[`&.${M.colorPrimary}`]:{backgroundColor:r.palette.grey[200],...r.applyStyles("dark",{backgroundColor:r.palette.grey[800]})},[`& .${M.bar}`]:{borderRadius:5,backgroundColor:"#1a90ff",...r.applyStyles("dark",{backgroundColor:"#308fe8"})}})),Cr={Kerabat:"/market.png",Instagram:"/instagram.png",YouTube:"/youtube.png",Pameran:"/target.png",Brosur:"/brochure.png",Website:"/web-link.png"},yr=()=>{const{data:r}=F();return t.jsxs(L,{sx:{p:1},children:[t.jsx(R,{variant:"h6",fontWeight:700,children:"Media Analisis"}),r==null?void 0:r.map((e,a)=>t.jsxs(Q,{sx:{display:"flex",gap:1,alignItems:"center",mt:2},children:[t.jsx("img",{src:Cr[e.media]||"/default.png",alt:e.media,style:{height:30,width:30,objectFit:"cover"}}),t.jsx(J,{title:e.media,placement:"top-end",children:t.jsx(Z,{sx:{flexGrow:1},children:t.jsx(vr,{variant:"determinate",value:Number(e.percentage)})})}),t.jsx(R,{children:`${e.percentage}%`})]},a))]})},P=({type:r})=>{const[e,a]=g.useState(""),[o,d]=g.useState(0),[l,n]=g.useState(50),[c,u]=g.useState([]);g.useEffect(()=>{const i=r==null?void 0:r.filter(s=>s.name.toLowerCase().includes(e.toLowerCase()));u(i||[])},[e,r]);const j=i=>{a(i.target.value)},p=(i,s)=>{d(s)},b=i=>{n(parseInt(i.target.value,10)),d(0)};return t.jsxs(L,{sx:{width:"100%"},children:[t.jsx(rr,{placeholder:"Search",variant:"outlined",value:e,onChange:j,margin:"dense",sx:{m:1}}),t.jsx(er,{sx:{height:{xs:500,md:550,lg:680}},children:t.jsxs(ar,{stickyHeader:!0,"aria-label":"sticky table",children:[t.jsx(tr,{children:t.jsxs(_,{children:[t.jsx(y,{align:"center",children:"Name"}),t.jsx(y,{align:"center",children:"Total"})]})}),t.jsx(or,{children:c==null?void 0:c.slice(o*l,o*l+l).map((i,s)=>t.jsxs(_,{children:[t.jsx(y,{children:i.name}),t.jsx(y,{align:"center",children:i.total})]},s))})]})}),t.jsx(nr,{rowsPerPageOptions:[50,100],component:"div",count:c==null?void 0:c.length,rowsPerPage:l,page:o,onPageChange:p,onRowsPerPageChange:b})]})},re=()=>{var l;const[r,e]=g.useState("Province"),{data:a}=X(),o=[{name:"Province",component:t.jsx(P,{type:a==null?void 0:a.provinces})},{name:"City",component:t.jsx(P,{type:a==null?void 0:a.regencies})},{name:"District",component:t.jsx(P,{type:a==null?void 0:a.districts})},{name:"Village",component:t.jsx(P,{type:a==null?void 0:a.villages})}],d=(l=o.find(n=>n.name===r))==null?void 0:l.component;return t.jsx(V,{children:t.jsxs(k,{container:!0,children:[t.jsx(k,{item:!0,xs:12,md:8,sx:{px:1},children:t.jsxs(L,{sx:{p:1,display:"flex",justifyContent:"start",alignItems:"center",flexDirection:"column",gap:1},children:[t.jsx(ir,{children:o==null?void 0:o.map(n=>t.jsx(sr,{variant:r===n.name?"contained":"outlined",onClick:()=>e(n.name),children:n.name},n.name))}),d]})}),t.jsx(k,{item:!0,xs:12,md:4,sx:{px:1},children:t.jsx(yr,{})})]})})};export{re as default};
