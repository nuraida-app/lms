import{i as d,j as e,a as T,b as D,r as l,S as c,u as P,c as m,ak as q,al as E}from"./index-DLCRynLT.js";import{d as O,a as F,A as W,b as V,u as G,C as N,c as Q,e as X,D as j}from"./FolderCopy-DSGcFxos.js";import{d as U,a as J}from"./ChevronRight--NVC_II7.js";import{r as u}from"./createSvgIcon-D59g-G7-.js";import{d as K}from"./PeopleAlt-Dbog-w7l.js";import{d as Y}from"./CalendarMonth-V9Pa23QG.js";import{d as Z,S as ee}from"./Style-BZ504X3w.js";import{L as g,a as ae,b as v,c as w,d as se}from"./ExitToApp-BftrtyMZ.js";import{u as ie}from"./useTheme-9Di1Vo7v.js";import{T as te,L as b}from"./Toolbar-t9jUTOQF.js";import{I as _}from"./IconButton-DjRrq_Mc.js";import{T as S}from"./Typography-DZcqQ05_.js";var x={},ne=d;Object.defineProperty(x,"__esModule",{value:!0});var L=x.default=void 0,re=ne(u()),oe=e;L=x.default=(0,re.default)((0,oe.jsx)("path",{d:"M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1m0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3m6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1z"}),"AssignmentInd");var p={},le=d;Object.defineProperty(p,"__esModule",{value:!0});var C=p.default=void 0,de=le(u()),ce=e;C=p.default=(0,de.default)((0,ce.jsx)("path",{d:"M4 22H2V2h2zM22 7H6v3h16zm-6 7H6v3h10z"}),"AlignHorizontalLeft");var f={},ue=d;Object.defineProperty(f,"__esModule",{value:!0});var I=f.default=void 0,xe=ue(u()),pe=e;I=f.default=(0,xe.default)((0,pe.jsx)("path",{d:"M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2M6 4h5v8l-2.5-1.5L6 12z"}),"Class");const fe=[{label:"Dashboard",link:"/admin/dashboard",icon:e.jsx(O,{sx:{color:"white"}})},{label:"Grades",link:"/admin/grades",icon:e.jsx(C,{sx:{color:"white"}})},{label:"Classes",link:"/admin/classes",icon:e.jsx(I,{sx:{color:"white"}})},{label:"Subjects",link:"/admin/subjects",icon:e.jsx(Z,{sx:{color:"white"}})},{label:"Teachers",link:"/admin/teachers",icon:e.jsx(L,{sx:{color:"white"}})},{label:"Students",link:"/admin/students",icon:e.jsx(K,{sx:{color:"white"}})},{label:"Quizzes",link:"/admin/quizzes",icon:e.jsx(F,{sx:{color:"white"}})},{label:"Schedules",link:"/admin/schedules",icon:e.jsx(Y,{sx:{color:"white"}})}],he=()=>{const a=T(),{user:s,isLogout:r}=D(i=>i.authentication);l.useEffect(()=>{const i=setTimeout(()=>{(s==null?void 0:s.role)!=="admin"&&a("/")},2e3);return()=>clearTimeout(i)},[s,a]),l.useEffect(()=>{r&&(a("/"),localStorage.removeItem("login"))},[r])},o=240,$=a=>({width:o,transition:a.transitions.create("width",{easing:a.transitions.easing.sharp,duration:a.transitions.duration.enteringScreen}),overflowX:"hidden",backgroundColor:"#4D44B5",color:"white"}),k=a=>({transition:a.transitions.create("width",{easing:a.transitions.easing.sharp,duration:a.transitions.duration.leavingScreen}),overflowX:"hidden",width:`calc(${a.spacing(7)} + 1px)`,[a.breakpoints.up("sm")]:{width:`calc(${a.spacing(8)} + 1px)`},backgroundColor:"#4D44B5",color:"white"}),y=c("div")(({theme:a})=>({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:a.spacing(0,1),...a.mixins.toolbar})),me=c(W,{shouldForwardProp:a=>a!=="open"})(({theme:a,open:s})=>({zIndex:a.zIndex.drawer+1,transition:a.transitions.create(["width","margin"],{easing:a.transitions.easing.sharp,duration:a.transitions.duration.leavingScreen}),...s&&{marginLeft:o,width:`calc(100% - ${o}px)`,transition:a.transitions.create(["width","margin"],{easing:a.transitions.easing.sharp,duration:a.transitions.duration.enteringScreen})}})),je=c(V,{shouldForwardProp:a=>a!=="open"})(({theme:a,open:s})=>({width:o,flexShrink:0,whiteSpace:"nowrap",boxSizing:"border-box",...s&&{...$(a),"& .MuiDrawer-paper":$(a)},...!s&&{...k(a),"& .MuiDrawer-paper":k(a)}})),Ie=({children:a})=>{const{user:s,isAuthLoading:r}=D(n=>n.authentication),i=ie(),z=G(i.breakpoints.down("sm")),[t,h]=l.useState(!z),M=()=>{h(!0)},H=()=>{h(!1)},A=P(),B=()=>A(E());return he(),e.jsxs(m,{sx:{display:"flex"},children:[e.jsx(N,{}),e.jsx(me,{position:"fixed",open:t,sx:{bgcolor:"#4D44B5"},children:e.jsxs(te,{children:[e.jsx(_,{color:"inherit","aria-label":"open drawer",onClick:M,edge:"start",sx:{marginRight:5,...t&&{display:"none"}},children:e.jsx(Q,{})}),r?e.jsx(ee,{variant:"text",width:180,sx:{fontSize:"2rem"}}):e.jsx(S,{variant:"h6",noWrap:!0,component:"div",children:s==null?void 0:s.name})]})}),e.jsxs(je,{variant:"permanent",open:t,children:[e.jsxs(y,{sx:{display:"flex",justifyContent:"space-between"},children:[e.jsx(X,{src:"/nibs.png"}),e.jsx(S,{fontWeight:"bold",children:"Nuraida LMS"}),e.jsx(_,{onClick:H,children:i.direction==="rtl"?e.jsx(U,{}):e.jsx(J,{})})]}),e.jsx(j,{}),e.jsx(g,{children:fe.map((n,R)=>e.jsx(ae,{disablePadding:!0,sx:{display:"block"},children:e.jsxs(v,{component:q,to:n.link,sx:{minHeight:48,justifyContent:t?"initial":"center",px:2.5},children:[e.jsx(b,{sx:{minWidth:0,mr:t?3:"auto",justifyContent:"center"},children:n.icon}),e.jsx(w,{primary:n.label,sx:{opacity:t?1:0}})]})},R))}),e.jsx(j,{}),e.jsx(g,{children:e.jsxs(v,{onClick:B,children:[e.jsx(b,{children:e.jsx(se,{sx:{color:"white"}})}),e.jsx(w,{primary:"Logout"})]})})]}),e.jsxs(m,{component:"main",sx:{flexGrow:1,p:3,bgcolor:"#EDF3F9"},children:[e.jsx(y,{}),a]})]})};export{Ie as L,L as d};