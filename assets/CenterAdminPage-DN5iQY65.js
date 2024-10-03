import{i as V,j as e,n as $,bx as J,by as K,r,B as m,c as _,C as G,bz as U,bA as X,bB as Y}from"./index-Bj3C8koD.js";import{L as Z}from"./Layout-CVtCPcOs.js";import{d as ee}from"./MoreHoriz-CtQJ6_Um.js";import{r as se}from"./createSvgIcon-D-BIaofd.js";import{M as ae,F as re}from"./Modal-DP-e0wkE.js";import{T as k,I as F}from"./TextField-B-BJcQE_.js";import{F as z}from"./FormControl-BUrl-vBt.js";import{S as N}from"./Select-D8KEf11G.js";import{M as n}from"./MenuItem-Bp5CoyVW.js";import{B}from"./Button-D4WmCtXy.js";import{P as te}from"./Paper-Dbdqoibw.js";import{I as oe}from"./Input-Di2yNiZQ.js";import{T as ie}from"./TableContainer-Cx1L-07N.js";import{T as ne,a as le,b as q,c as C,d as de}from"./TableRow-C6a_lx_T.js";import{I as ce}from"./IconButton-DpREeSCV.js";import{M as ue}from"./Menu-AE6GZcr2.js";import"./PeopleAlt-GRZG6XIJ.js";import"./ExitToApp-QjsXFa-4.js";import"./Typography-BrPjQYMZ.js";import"./Grid-BFZ5c2Eo.js";import"./useTheme-CpZLhXHk.js";import"./utils-ChUDx9XN.js";import"./listItemIconClasses-D2S5NYx_.js";import"./GlobalStyles-DKJB1qfv.js";import"./Grow-BxafOqhx.js";var D={},me=V;Object.defineProperty(D,"__esModule",{value:!0});var Q=D.default=void 0,pe=me(se()),he=e;Q=D.default=(0,pe.default)((0,he.jsx)("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"}),"Add");const xe=({open:p,close:o,admin:t})=>{const{data:h}=$(),[x,{data:l,isSuccess:S,isLoading:f,error:j,reset:A}]=J(),[E,{data:b,isSuccess:R,isLoading:d,error:c,reset:y}]=K(),[u,g]=r.useState(""),[v,s]=r.useState(""),[i,I]=r.useState(""),[w,H]=r.useState("--Role--"),[P,M]=r.useState("--Homebase--"),[T,L]=r.useState(""),W=a=>{a.preventDefault(),u?E({name:v,email:i,password:T,role:w,homebase_id:P,id:u}):x({name:v,email:i,password:T,role:w,homebase_id:P})};return r.useEffect(()=>{S&&(m.success(l.message),A(),g(""),s(""),I(""),L(""),H("--Role--"),M("--Homebase--"),o(),window.location.reload()),j&&(m.error(j.data.message),A())},[l,S,j]),r.useEffect(()=>{R&&(m.success(b.message),g(""),s(""),I(""),L(""),H("--Role--"),M("--Homebase--"),o(),y(),window.location.reload()),c&&(m.error(c.data.message),y())},[R,b,c]),r.useEffect(()=>{t&&(s(t.name),I(t.email),H(t.role),M(t.homebase_id?t.homebase_id:null),g(t.id))},[t]),e.jsx(ae,{open:p,onClose:o,closeAfterTransition:!0,children:e.jsx(re,{in:p,children:e.jsx(_,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400,bgcolor:"#ffff",boxShadow:24,p:2,borderRadius:"5px"},children:e.jsxs("form",{style:{display:"flex",flexDirection:"column",gap:"1rem"},onSubmit:W,children:[e.jsx(k,{label:"Name",placeholder:"Name",value:v||"",onChange:a=>s(a.target.value),InputLabelProps:{shrink:!0}}),e.jsx(k,{label:"Email",placeholder:"Email",value:i||"",onChange:a=>I(a.target.value),InputLabelProps:{shrink:!0}}),e.jsxs(z,{fullWidth:!0,children:[e.jsx(F,{children:"Role"}),e.jsxs(N,{label:"Role",value:w,onChange:a=>H(a.target.value),children:[e.jsx(n,{value:"--Role--",children:"--Role--"}),e.jsx(n,{value:"super-admin",children:"Super Admin"}),e.jsx(n,{value:"admin",children:"Admin"})]})]}),w==="admin"&&e.jsxs(z,{fullWidth:!0,children:[e.jsx(F,{children:"Homebase"}),e.jsxs(N,{label:"Homebase",value:P,onChange:a=>M(a.target.value),children:[e.jsx(n,{value:"--Homebase--",children:"--Homebase--"}),h==null?void 0:h.map(a=>e.jsx(n,{value:a.id,children:a.name},a.id))]})]}),e.jsx(k,{label:"Password",placeholder:"Password",type:"password",value:T||"",onChange:a=>L(a.target.value),InputLabelProps:{shrink:!0}}),e.jsxs(_,{alignSelf:"end",children:[e.jsx(B,{variant:"contained",color:"error",onClick:o,sx:{mr:1},children:"Cancel"}),e.jsx(B,{variant:"contained",color:"success",type:"submit",children:f||d?e.jsx(G,{size:24}):" Save"})]})]})})})})},qe=()=>{const[p,o]=r.useState(null),t=!!p,[h,x]=r.useState(!1),[l,S]=r.useState(""),{data:f}=U(),{data:j}=X(l,{skip:!l}),[A,{data:E,isSuccess:b,isLoading:R,error:d,reset:c}]=Y(),y=(s,i)=>{o(s.currentTarget),S(i)},u=()=>{o(null)},g=()=>{x(!0),u()},v=()=>{u(),A(l)};return r.useEffect(()=>{b&&(m.success(E.message),c()),d&&(m.error(d.data.message),c(),console.log(d))},[E,b,d]),e.jsx(Z,{children:e.jsxs(te,{sx:{p:1},children:[e.jsxs(_,{sx:{display:"flex",justifyContent:"space-between"},children:[e.jsx(oe,{placeholder:"Search Admin"}),e.jsx(B,{variant:"contained",color:"success",startIcon:e.jsx(Q,{}),onClick:()=>x(!0),children:"Add"})]}),e.jsx(ie,{children:e.jsxs(ne,{children:[e.jsx(le,{children:e.jsx(q,{children:["Name","Email","Role","Action"].map(s=>e.jsx(C,{align:"center",children:s},s))})}),e.jsx(de,{children:f==null?void 0:f.map(s=>e.jsxs(q,{children:[e.jsx(C,{align:"center",children:s.name}),e.jsx(C,{align:"center",children:s.email}),e.jsx(C,{align:"center",children:s.role}),e.jsx(C,{align:"center",children:e.jsx(ce,{color:"primary",id:"basic-button","aria-controls":t?"basic-menu":void 0,"aria-haspopup":"true","aria-expanded":t?"true":void 0,onClick:i=>y(i,s.id),children:R?e.jsx(G,{size:24}):e.jsx(ee,{})})})]},s.id))})]})}),e.jsxs(ue,{id:"basic-menu",anchorEl:p,open:t,onClose:u,MenuListProps:{"aria-labelledby":"basic-button"},children:[e.jsx(n,{onClick:g,children:"Edit"}),e.jsx(n,{onClick:v,children:"Delete"})]}),e.jsx(xe,{open:h,close:()=>x(!1),admin:j})]})})};export{qe as default};
