import{r as a,g as N,A as z,D as G,j as e,c as g,C as T}from"./index-DLCRynLT.js";import{d as R}from"./MoreHoriz-MV_qI9Av.js";import{d as $}from"./Check-CEkQoC_m.js";import{d as w}from"./Remove-CCW43diK.js";import{L as F}from"./Layout-CuwM1suJ.js";import{P as Q}from"./Paper-CHu71e6T.js";import{I as X}from"./Input-BqsWAegp.js";import{T as q}from"./TableContainer-BF1G4wFS.js";import{T as J,a as C,b as r,c as K}from"./TableRow-BPWIvLzO.js";import{T as O}from"./TableHead-CpNOZNoK.js";import{I as i}from"./IconButton-DjRrq_Mc.js";import{M as U}from"./Menu-BNjRSXhC.js";import{M as y}from"./MenuItem-CNnwtsjM.js";import"./createSvgIcon-D59g-G7-.js";import"./Typography-DZcqQ05_.js";import"./PeopleAlt-Dbog-w7l.js";import"./ExitToApp-BftrtyMZ.js";import"./Grid-K40SvTIk.js";import"./useTheme-9Di1Vo7v.js";import"./utils-C85PYznO.js";import"./GlobalStyles-CRrAFrpS.js";import"./listItemIconClasses-Dr45LKzl.js";import"./Modal-D_AunpFB.js";import"./Grow-zjrQf6xw.js";const V=[{label:"No",width:60},{label:"Homebase",width:90},{label:"NIP",width:90},{label:"Name",width:170},{label:"Subjects",width:170},{label:"Homeroom",width:50},{label:"Class",width:50},{label:"Actions",width:50}],ye=()=>{const[u,x]=a.useState(null),l=!!u,[o,I]=a.useState(""),[W,L]=a.useState(!1),S=(s,t)=>{x(s.currentTarget),I(t)},n=()=>{x(null)},{data:c,isLoading:v}=N(),[E,{data:p,isLoading:M,error:d,isSuccess:j}]=z(),[k,{data:Y}]=G(),H=()=>{o&&(n(),L(!0),k(o))},P=()=>{o&&(E(o),n())};a.useEffect(()=>{j&&toast.success(p.message),d&&toast.error(d.data.message)},[j,p,d]);const[b,B]=a.useState(""),D=s=>s.name.toLowerCase().includes(b.toLowerCase()),m=c==null?void 0:c.filter(D),_=s=>{B(s.target.value)};return e.jsx(F,{children:e.jsxs(Q,{sx:{width:"100%",overflowX:"auto"},children:[e.jsx(g,{sx:{p:1,mb:1,display:"flex",justifyContent:"space-between",flexDirection:{xs:"column-reverse",md:"row"},gap:2},children:e.jsx(X,{placeholder:"Search Teacher",value:b,onChange:_})}),v?e.jsx(g,{sx:{height:{xs:500,md:530,lg:650,xl:790},display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(T,{size:50})}):e.jsx(q,{sx:{height:{xs:500,md:530,lg:650,xl:790},overflow:"auto"},children:e.jsxs(J,{stickyHeader:!0,"aria-label":"sticky table",children:[e.jsx(O,{children:e.jsx(C,{children:V.map((s,t)=>e.jsx(r,{align:"center",sx:{width:s.width},children:s.label},t))})}),e.jsx(K,{children:m==null?void 0:m.map((s,t)=>{var f;return e.jsxs(C,{children:[e.jsx(r,{align:"center",children:t+1}),e.jsx(r,{align:"center",children:s.homebase_name}),e.jsx(r,{align:"center",children:s.nip}),e.jsx(r,{children:s.name}),e.jsx(r,{children:(f=s.subjects)==null?void 0:f.map((h,A)=>e.jsx("p",{children:h.subject},A))}),e.jsx(r,{align:"center",children:s.homeroom===1?e.jsx(i,{color:"success",children:e.jsx($,{})}):e.jsx(i,{color:"error",children:e.jsx(w,{})})}),e.jsx(r,{align:"center",children:s.class?e.jsx("p",{children:s.class}):e.jsx(i,{color:"error",children:e.jsx(w,{})})}),e.jsx(r,{align:"center",children:e.jsx(i,{color:"primary",id:"basic-button","aria-controls":l?"basic-menu":void 0,"aria-haspopup":"true","aria-expanded":l?"true":void 0,onClick:h=>S(h,s.id),children:M?e.jsx(T,{size:20}):e.jsx(R,{})})})]},t)})})]})}),e.jsxs(U,{id:"basic-menu",anchorEl:u,open:l,onClose:n,MenuListProps:{"aria-labelledby":"basic-button"},children:[e.jsx(y,{onClick:H,children:"Edit"}),e.jsx(y,{onClick:P,children:"Delete"})]})]})})};export{ye as default};