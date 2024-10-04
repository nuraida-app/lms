import{i as _,j as e,M as D,bp as N,bq as J,r as l,B as g,c as p,C as M,br as K,bs as U,bt as X,bu as Y,bv as Z,bw as ee}from"./index-CSxfCMfO.js";import{L as te}from"./Layout-Cq6CbkdF.js";import{r as C}from"./createSvgIcon-CUdXFR2t.js";import{M as V,F as E}from"./Modal-BxMNLGUj.js";import{T as $}from"./TextField-siHAEH0i.js";import{B as j}from"./Button-C8egMFNd.js";import{e as se}from"./FolderCopy-B9muDkxL.js";import{c as re}from"./ExitToApp-BfJL4ORI.js";import{I as z}from"./IconButton-BKERT6y0.js";import{G as T}from"./Grow-2X7iiG1m.js";import{P as q}from"./Paper-1BeYRGVZ.js";import{T as G}from"./Typography-CvABrH6u.js";import"./ChevronRight-BDbCwA2d.js";import"./CalendarMonth-mGKmgOTs.js";import"./Style-BK46D0DP.js";import"./useTheme-CrWoQ2Gw.js";import"./Toolbar-0QhF5KIa.js";import"./listItemIconClasses-DH5o3P_F.js";import"./FormControl-DuxQqY0B.js";import"./utils-DhE5sAzO.js";import"./Select-DP2IIPsQ.js";import"./Menu-SlX1X7p5.js";import"./Input-BytLO2YT.js";import"./GlobalStyles-BxWeaP1-.js";import"./getThemeProps-Bm4LwIY-.js";var P={},ae=_;Object.defineProperty(P,"__esModule",{value:!0});var y=P.default=void 0,oe=ae(C()),ie=e;y=P.default=(0,oe.default)((0,ie.jsx)("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"}),"AddOutlined");var O={},ne=_;Object.defineProperty(O,"__esModule",{value:!0});var S=O.default=void 0,le=ne(C()),ce=e;S=O.default=(0,le.default)((0,ce.jsx)("path",{d:"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"CloseOutlined");const F=({open:t,close:i,id:r})=>{const x=D().code,[f,{data:a,isSuccess:c,isLoading:o,error:h,reset:d}]=N(),{data:m}=J(r,{skip:!r}),[s,u]=l.useState(""),v=I=>{I.preventDefault(),f({id:r||null,code:x,title:s})};return l.useEffect(()=>{c&&(g.success(a.message),d(),u(""),i(),window.location.reload()),h&&(g.error(h.data.message),d())},[a,c,h]),l.useEffect(()=>{m&&u(m.title)},[m]),e.jsx(V,{open:t,onClose:i,closeAfterTransition:!0,children:e.jsx(E,{in:t,children:e.jsx(p,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:{xs:350,md:400},bgcolor:"#ffff",boxShadow:24,p:2,borderRadius:"5px"},children:e.jsxs("form",{onSubmit:v,children:[e.jsx($,{fullWidth:!0,label:"Title",placeholder:"Chapter's title",InputLabelProps:{shrink:!0},sx:{my:1},value:s||"",onChange:I=>u(I.target.value)}),e.jsxs(p,{align:"end",children:[e.jsx(j,{startIcon:e.jsx(S,{}),variant:"contained",color:"error",onClick:i,sx:{mr:1},children:"cancel"}),e.jsx(j,{startIcon:e.jsx(y,{}),variant:"contained",color:"success",type:"submit",children:o?e.jsx(M,{size:24}):"Add"})]})]})})})})};var w={},de=_;Object.defineProperty(w,"__esModule",{value:!0});var k=w.default=void 0,ue=de(C()),pe=e;k=w.default=(0,ue.default)((0,pe.jsx)("path",{d:"m14.06 9.02.92.92L5.92 19H5v-.92zM17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94z"}),"EditOutlined");var H={},xe=_;Object.defineProperty(H,"__esModule",{value:!0});var B=H.default=void 0,fe=xe(C()),he=e;B=H.default=(0,fe.default)((0,he.jsx)("path",{d:"M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m0 14H8V4h12zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4zm12 6V9c0-.55-.45-1-1-1h-2v5h2c.55 0 1-.45 1-1m-2-3h1v3h-1zm4 2h1v-1h-1V9h1V8h-2v5h1zm-8 0h1c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1H9v5h1zm0-2h1v1h-1z"}),"PictureAsPdfOutlined");var L={},me=_;Object.defineProperty(L,"__esModule",{value:!0});var W=L.default=void 0,je=me(C()),A=e;W=L.default=(0,je.default)([(0,A.jsx)("path",{d:"M19 5v14H5V5zm0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2"},"0"),(0,A.jsx)("path",{d:"M14 17H7v-2h7zm3-4H7v-2h10zm0-4H7V7h10z"},"1")],"ArticleOutlined");var R={},ve=_;Object.defineProperty(R,"__esModule",{value:!0});var Q=R.default=void 0,ge=ve(C()),be=e;Q=R.default=(0,ge.default)((0,be.jsx)("path",{d:"M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1M8 13h8v-2H8zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5"}),"InsertLinkOutlined");const _e=({data:t,number:i})=>{const[r,{data:n,isSuccess:x,isLoading:f,error:a,reset:c}]=K(),[o,h]=l.useState(!1),d=s=>{const u=s.target.files[0];console.log(u)},m=s=>{const u=s.target.files[0];console.log(u)};return l.useEffect(()=>{x&&(g.success(n.message),c()),a&&(g.error(a.data.message),c())},[n,x,a]),e.jsxs(p,{sx:{my:1,mx:8,borderRadius:1,p:1,boxShadow:4},children:[e.jsxs(p,{sx:{display:"flex",gap:1,alignItems:"center"},children:[e.jsx(se,{children:i}),e.jsx(re,{sx:{width:"70%"},primary:t.title,secondary:t.goal}),e.jsxs("div",{children:[e.jsx(z,{color:"warning",children:e.jsx(k,{})}),e.jsx(z,{color:"error",onClick:()=>r(t.id),children:f?e.jsx(M,{size:24}):e.jsx(S,{})})]})]}),e.jsxs(p,{sx:{mx:6,mt:1,display:"flex",gap:2},children:[e.jsx(j,{startIcon:e.jsx(y,{}),size:"small",variant:"outlined",color:"success",onClick:()=>h(!o),children:"Add File"}),e.jsxs(p,{sx:{display:"flex",gap:2,justifyContent:"center",width:"50%"},children:[e.jsx(T,{in:o,children:e.jsxs(j,{size:"small",variant:"contained",color:"error",startIcon:e.jsx(B,{}),component:"label",children:["pdf",e.jsx("input",{type:"file",hidden:!0,accept:".pdf",onChange:s=>d(s,setPdfFileName)})]})}),e.jsx(T,{in:o,children:e.jsxs(j,{size:"small",variant:"contained",color:"primary",startIcon:e.jsx(W,{}),component:"label",children:["doc",e.jsx("input",{type:"file",hidden:!0,accept:".doc,.docx",onChange:s=>m(s,setDocFileName)})]})}),e.jsx(T,{in:o,children:e.jsx(j,{size:"small",variant:"contained",color:"warning",startIcon:e.jsx(Q,{}),children:"url"})})]})]})]})},Ce=({open:t,close:i,id:r,chapter_id:n})=>{const[x,{data:f,isSuccess:a,isLoading:c,error:o,reset:h}]=U(),{data:d}=X(r,{skip:!r}),[m,s]=l.useState(""),[u,v]=l.useState(""),I=b=>{b.preventDefault(),x({id:r||null,chapter_id:n,title:m,goal:u})};return l.useEffect(()=>{a&&(g.success(f.message),h(),s(""),v(""),i(),window.location.reload()),o&&(g.error(o.data.message),h())},[f,a,o]),l.useEffect(()=>{d&&(s(d.title),v(d.goal))},[d]),e.jsx(V,{open:t,onClose:i,closeAfterTransition:!0,children:e.jsx(E,{in:t,children:e.jsx(p,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:{xs:350,md:400},bgcolor:"#ffff",boxShadow:24,p:2,borderRadius:"5px"},children:e.jsxs("form",{onSubmit:I,children:[e.jsx($,{fullWidth:!0,label:"Title",placeholder:"Topic's title",InputLabelProps:{shrink:!0},sx:{my:1},value:m||"",onChange:b=>s(b.target.value)}),e.jsx($,{fullWidth:!0,multiline:!0,rows:4,label:"Learning Prurpose",placeholder:"Learning Prurpose",InputLabelProps:{shrink:!0},sx:{my:1},value:u||"",onChange:b=>v(b.target.value)}),e.jsxs(p,{align:"end",children:[e.jsx(j,{startIcon:e.jsx(S,{}),variant:"contained",color:"error",onClick:i,sx:{mr:1},children:"cancel"}),e.jsx(j,{startIcon:e.jsx(y,{}),variant:"contained",color:"success",type:"submit",children:c?e.jsx(M,{size:24}):"Add"})]})]})})})})},ye=({data:t,number:i})=>{const[r,{data:n,isSuccess:x,isLoading:f,error:a,reset:c}]=Y(),{data:o}=Z(t.id,{skip:!t.id}),[h,d]=l.useState(!1),[m,s]=l.useState(!1);return l.useEffect(()=>{x&&(g.success(n.message),c()),a&&(g.error(a.data.message),c())},[n,x,a]),e.jsxs(q,{sx:{my:2,p:1},children:[e.jsxs(p,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx(G,{fontWeight:"bold",children:`Chapter ${i}: ${t.title}`}),e.jsxs(p,{children:[e.jsx(z,{color:"warning",onClick:()=>d(!0),children:e.jsx(k,{})}),e.jsx(z,{color:"error",onClick:()=>r(t.id),children:f?e.jsx(M,{size:24}):e.jsx(S,{})})]})]}),o==null?void 0:o.map((u,v)=>e.jsx(_e,{data:u,number:v+1},v)),e.jsx(p,{alignSelf:"flex-start",sx:{mx:8},children:e.jsx(j,{startIcon:e.jsx(y,{}),variant:"contained",color:"success",onClick:()=>s(!0),children:"Topic"})}),e.jsx(Ce,{open:m,close:()=>s(!1),chapter_id:t.id}),e.jsx(F,{open:h,close:()=>d(!1),id:t.id})]})},Ue=()=>{const t=D(),i=t.name.replace(/-/g," "),r=t.code,{data:n}=ee(r,{skip:!r}),[x,f]=l.useState(!1);return e.jsxs(te,{children:[e.jsx(q,{sx:{p:1},children:e.jsx(G,{variant:"h6",fontWeight:"bold",children:i})}),e.jsx(p,{alignSelf:"flex-start",sx:{my:1},children:e.jsx(j,{startIcon:e.jsx(y,{}),variant:"contained",color:"success",onClick:()=>f(!0),children:"Chapter"})}),n&&(n==null?void 0:n.map((a,c)=>e.jsx(ye,{data:a,number:c+1},a.id))),e.jsx(F,{open:x,close:()=>f(!1)})]})};export{Ue as default};
