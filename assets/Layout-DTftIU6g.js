import{i as u,j as e,a as L,b as I,r as d,s as x,u as O,c as l,ap as q,aq as W}from"./index-B4oIbNwU.js";import{d as A,a as F,A as V,b as N,u as X,C as G,T as Q,c as U,e as J,D as v,L as m,f as K}from"./PageName-CEARqxte.js";import{d as Y,a as Z}from"./ChevronRight-CvyNzzqS.js";import{r as p}from"./createSvgIcon-BZOpo86E.js";import{u as ee}from"./useTheme-C3ddHqAM.js";import{I as o}from"./IconButton-DKYpUzhK.js";import{T as w}from"./Typography-DLQ9NUQX.js";import{L as b,a as te,b as _,c as y}from"./ListItemText-snJx1fDo.js";var h={},se=u;Object.defineProperty(h,"__esModule",{value:!0});var S=h.default=void 0,ae=se(p()),ie=e;S=h.default=(0,ae.default)((0,ie.jsx)("path",{d:"M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m-5 14H4v-4h11zm0-5H4V9h11zm5 5h-4V9h4z"}),"Web");const ne=[{label:"Dashboard",link:"/student/dashboard",icon:e.jsx(A,{sx:{color:"white"}})},{label:"Subjects",link:"/student/subjects",icon:e.jsx(F,{sx:{color:"white"}})},{label:"Exam",link:"/student/exam",icon:e.jsx(S,{sx:{color:"white"}})}];var f={},re=u;Object.defineProperty(f,"__esModule",{value:!0});var k=f.default=void 0,oe=re(p()),ce=e;k=f.default=(0,oe.default)((0,ce.jsx)("path",{d:"M4 4h16v12H5.17L4 17.17zm0-2c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm2 10h8v2H6zm0-3h12v2H6zm0-3h12v2H6z"}),"ChatOutlined");var j={},le=u;Object.defineProperty(j,"__esModule",{value:!0});var M=j.default=void 0,de=le(p()),ue=e;M=j.default=(0,de.default)((0,ue.jsx)("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4"}),"Person");const xe=()=>{const t=L(),{user:s,isLogout:r}=I(a=>a.authentication);d.useEffect(()=>{const a=setTimeout(()=>{(s==null?void 0:s.role)!=="student"&&t("/")},2e3);return()=>clearTimeout(a)},[s,t]),d.useEffect(()=>{r&&(t("/"),localStorage.removeItem("login"))},[r])},c=240,D=t=>({width:c,transition:t.transitions.create("width",{easing:t.transitions.easing.sharp,duration:t.transitions.duration.enteringScreen}),overflowX:"hidden",backgroundColor:"#4D44B5",color:"white"}),$=t=>({transition:t.transitions.create("width",{easing:t.transitions.easing.sharp,duration:t.transitions.duration.leavingScreen}),overflowX:"hidden",width:`calc(${t.spacing(7)} + 1px)`,[t.breakpoints.up("sm")]:{width:`calc(${t.spacing(8)} + 1px)`},backgroundColor:"#4D44B5",color:"white"}),C=x("div")(({theme:t})=>({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:t.spacing(0,1),...t.mixins.toolbar})),pe=x(V,{shouldForwardProp:t=>t!=="open"})(({theme:t,open:s})=>({zIndex:t.zIndex.drawer+1,transition:t.transitions.create(["width","margin"],{easing:t.transitions.easing.sharp,duration:t.transitions.duration.leavingScreen}),...s&&{marginLeft:c,width:`calc(100% - ${c}px)`,transition:t.transitions.create(["width","margin"],{easing:t.transitions.easing.sharp,duration:t.transitions.duration.enteringScreen})}})),he=x(N,{shouldForwardProp:t=>t!=="open"})(({theme:t,open:s})=>({width:c,flexShrink:0,whiteSpace:"nowrap",boxSizing:"border-box",...s&&{...D(t),"& .MuiDrawer-paper":D(t)},...!s&&{...$(t),"& .MuiDrawer-paper":$(t)}})),ye=({children:t})=>{const{user:s}=I(n=>n.authentication),r=L(),a=ee(),z=X(a.breakpoints.down("sm")),[i,g]=d.useState(!z),P=()=>{g(!0)},B=()=>{g(!1)},H=()=>r("/student/profile"),R=O(),T=()=>R(W());return xe(),e.jsxs(l,{sx:{display:"flex"},children:[e.jsx(G,{}),e.jsx(pe,{position:"fixed",open:i,sx:{bgcolor:"#4D44B5"},children:e.jsxs(Q,{children:[e.jsx(o,{color:"inherit","aria-label":"open drawer",onClick:P,edge:"start",sx:{marginRight:5,...i&&{display:"none"}},children:e.jsx(U,{})}),e.jsxs(l,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[e.jsx(w,{variant:"h6",noWrap:!0,component:"div",children:s==null?void 0:s.name}),e.jsxs("div",{children:[e.jsx(o,{color:"inherit",children:e.jsx(k,{})}),e.jsx(o,{color:"inherit",onClick:H,children:e.jsx(M,{})})]})]})]})}),e.jsxs(he,{variant:"permanent",open:i,children:[e.jsxs(C,{sx:{display:"flex",justifyContent:"space-between"},children:[e.jsx(J,{src:"/nibs.png"}),e.jsx(w,{fontWeight:"bold",children:"Nuraida LMS"}),e.jsx(o,{onClick:B,children:a.direction==="rtl"?e.jsx(Y,{}):e.jsx(Z,{})})]}),e.jsx(v,{}),e.jsx(b,{children:ne.map((n,E)=>e.jsx(te,{disablePadding:!0,sx:{display:"block"},children:e.jsxs(_,{component:q,to:n.link,sx:{minHeight:48,justifyContent:i?"initial":"center",px:2.5},children:[e.jsx(m,{sx:{minWidth:0,mr:i?3:"auto",justifyContent:"center"},children:n.icon}),e.jsx(y,{primary:n.label,sx:{opacity:i?1:0}})]})},E))}),e.jsx(v,{}),e.jsx(b,{children:e.jsxs(_,{onClick:T,children:[e.jsx(m,{children:e.jsx(K,{sx:{color:"white"}})}),e.jsx(y,{primary:"Logout"})]})})]}),e.jsxs(l,{component:"main",sx:{flexGrow:1,p:3,bgcolor:"#EDF3F9"},children:[e.jsx(C,{}),t]})]})};export{ye as L};
