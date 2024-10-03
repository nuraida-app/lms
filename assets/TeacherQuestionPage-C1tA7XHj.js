import{M as N,Z as F,r as h,B as C,j as e,c as y,C as q,_ as H,a as Q,$ as P,a0 as R,a1 as _}from"./index-Bj3C8koD.js";import{L as B}from"./Layout-NrhJHGwr.js";import{P as U}from"./PageName-Biq2F0VA.js";import{d as W,a as G}from"./FolderDelete-PkQJ75F0.js";import{d as K,a as Z}from"./InsertDriveFileOutlined-CwSkVsig.js";import{M as L,F as E}from"./Modal-DP-e0wkE.js";import{T as D}from"./Typography-BrPjQYMZ.js";import{B as p}from"./Button-D4WmCtXy.js";import{r as J,u as O}from"./xlsx-DT8pmw08.js";import{I as V}from"./Input-Di2yNiZQ.js";import{d as M,a as T}from"./PlaylistRemove-BSkVRVOw.js";import{R as X}from"./bundle-DNxd8e0E.js";/* empty css               */import{G as v}from"./Grid-BFZ5c2Eo.js";import{T as z}from"./Tooltip-rJv4To8r.js";import{I as S}from"./IconButton-DpREeSCV.js";import{D as Y}from"./FolderCopy-DZT0bMue.js";import"./ChevronRight-CBf5NFe3.js";import"./createSvgIcon-D-BIaofd.js";import"./CalendarMonth-Kz6fg5D9.js";import"./Style-DEKwriaF.js";import"./ExitToApp-QjsXFa-4.js";import"./useTheme-CpZLhXHk.js";import"./Toolbar-N1d9vRU8.js";import"./utils-ChUDx9XN.js";import"./GlobalStyles-DKJB1qfv.js";import"./listItemIconClasses-D2S5NYx_.js";import"./Popper-BY-kpQyG.js";import"./Grow-BxafOqhx.js";import"./getThemeProps-TTdwN0UH.js";import"./Paper-Dbdqoibw.js";const ee=({open:a,close:r})=>{const i=N(),{quizId:u}=i,[x,{data:n,isSuccess:c,isLoading:d,error:l,reset:b}]=F(),t=()=>x(u);return h.useEffect(()=>{c&&(C.success(n.message),r(),b()),l&&C.error(l.data.message)},[n,c,l]),e.jsx(L,{open:a,onClose:r,closeAfterTransition:!0,children:e.jsx(E,{in:a,children:e.jsxs(y,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:{xs:350,md:400},bgcolor:"#ffff",boxShadow:24,p:2,borderRadius:"5px"},children:[e.jsx(D,{align:"center",children:"Are you sure you want to delete all question?"}),e.jsxs(y,{sx:{display:"flex",gap:1,justifyContent:"flex-end",mt:2},children:[e.jsx(p,{variant:"contained",color:"error",onClick:r,children:"cancel"}),e.jsx(p,{variant:"outlined",color:"error",onClick:t,children:d?e.jsx(q,{size:24,color:"inherit"}):"sure"})]})]})})})},se=({open:a,close:r})=>{const i=N(),{quizId:u}=i,[x,n]=h.useState(null),[c,{data:d,isSuccess:l,isLoading:b,error:t,reset:o}]=H(),m=f=>{n(f.target.files[0])},k=()=>{if(x){const f=new FileReader;f.onload=s=>{const g=new Uint8Array(s.target.result),w=J(g,{type:"array"}),j=w.SheetNames[0],I=w.Sheets[j],A={data:O.sheet_to_json(I,{header:1,range:1})};c({id:u,body:A})},f.readAsArrayBuffer(x)}};return h.useEffect(()=>{l&&(C.success(d.message),r(),o()),t&&(C.error(t.data.message),o(),console.log(t))},[d,l,t]),e.jsx(L,{open:a,onClose:r,closeAfterTransition:!0,children:e.jsx(E,{in:a,children:e.jsx(y,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400,bgcolor:"#ffff",boxShadow:24,p:2,display:"flex",alignContent:"center",justifyContent:"center"},children:e.jsxs(y,{sx:{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:"10px"},children:[e.jsx(V,{required:!0,fullWidth:!0,type:"file",placeholder:"Upload file here",onChange:m}),e.jsxs(y,{sx:{display:"flex",justifyContent:"end",width:"100%",gap:1},children:[e.jsx(p,{variant:"contained",color:"error",onClick:r,children:"cancel"}),e.jsx(p,{variant:"contained",color:"success",onClick:k,children:b?e.jsx(q,{size:20,color:"inherit"}):"upload"})]})]})})})})},te=()=>{const a=Q(),r=N(),[i,u]=h.useState(!1);h.useState(!1);const[x,n]=h.useState(!1),c=()=>{window.open("/soal_template.xlsx","_blank")},d=()=>a(`/teacher/quizzes/add/${r.quizname}/${r.quizId}`);return e.jsxs(y,{sx:{display:"flex",justifyContent:{xs:"start",md:"end"},gap:1,flexWrap:"wrap",bgcolor:"white",p:1,borderRadius:1,boxShadow:2},children:[e.jsx(p,{variant:"contained",color:"success",startIcon:e.jsx(W,{}),onClick:d,sx:{width:120},children:"add"}),e.jsx(p,{startIcon:e.jsx(K,{}),variant:"contained",color:"secondary",onClick:()=>n(!0),sx:{width:120},children:"Upload"}),e.jsx(p,{startIcon:e.jsx(Z,{}),variant:"contained",color:"warning",sx:{width:120},onClick:c,children:"Template"}),e.jsx(p,{startIcon:e.jsx(G,{}),variant:"contained",color:"error",onClick:()=>u(!0),sx:{width:120},children:"Delete"}),e.jsx(ee,{open:i,close:()=>u(!1)}),e.jsx(se,{open:x,close:()=>n(!1)})]})},$=a=>({__html:a}),re=()=>{const a=Q(),r=N(),{quizId:i,quizname:u}=r,[x,{data:n,isSuccess:c,isLoading:d,error:l,reset:b}]=P(),{data:t}=R(i,{skip:!i}),o=t==null?void 0:t.filter(s=>s.type===1),m=t==null?void 0:t.filter(s=>s.type===2),k=s=>{a(`/teacher/quizzes/edit/${u}/${i}/question/${s}`)},f=s=>x({id:s,quizId:i});return h.useEffect(()=>{c&&(C.success(n.message),b()),l&&C.error(l.data.message)},[n,c,l]),e.jsxs(v,{container:!0,sx:{bgcolor:"white",borderRadius:1,boxShadow:2,minHeight:{xs:500,md:530,xl:630},p:1},children:[e.jsxs(v,{item:!0,xs:12,md:12,children:[e.jsx(D,{variant:"body2",fontWeight:"bold",children:`Multiple Choises ${o==null?void 0:o.length}`}),o==null?void 0:o.map((s,g)=>{var w;return e.jsxs(h.Fragment,{children:[e.jsxs("div",{className:"quiz-layout",children:[e.jsxs("div",{className:"number",children:[g+1,"."]}),e.jsxs("div",{className:"quiz-box",children:[e.jsx("article",{dangerouslySetInnerHTML:$(s.question)}),s.audio&&e.jsx(X,{src:s.audio,controls:!0}),e.jsx("div",{className:"choices",children:(w=s.choices)==null?void 0:w.map((j,I)=>j.text!==null&&e.jsxs("div",{className:"answer",children:[e.jsxs("p",{className:j.value===s.key?"bold-text":"normal-text",children:[j.value,"."]}),e.jsx("p",{dangerouslySetInnerHTML:$(j.text),className:j.value===s.key?"bold-text":"normal-text"})]},I))}),e.jsx("p",{children:`Key: ${s.key}`}),e.jsx("p",{children:`Score: ${s.score}`})]}),e.jsxs("div",{className:"action",children:[e.jsx(z,{title:"Edit",children:e.jsx(S,{onClick:()=>k(s.id),children:e.jsx(M,{sx:{color:_[800]}})})}),e.jsx(z,{title:"Delete",children:e.jsx(S,{onClick:()=>f(s.id),color:"error",children:d?e.jsx(q,{size:24}):e.jsx(T,{})})})]})]}),e.jsx(Y,{})]},s.id)})]}),e.jsxs(v,{item:!0,xs:12,md:12,sx:{pt:1},children:[e.jsx(D,{variant:"body2",fontWeight:"bold",children:`Multiple Essay ${m==null?void 0:m.length}`}),m==null?void 0:m.map((s,g)=>e.jsxs("div",{className:"quiz-layout",children:[e.jsx("div",{className:"number",children:(o==null?void 0:o.length)+g+1}),e.jsx("div",{className:"quiz-box",children:e.jsx("article",{dangerouslySetInnerHTML:$(s.question)})}),e.jsxs("div",{className:"action",children:[e.jsx(z,{title:"Edit",children:e.jsx(S,{onClick:()=>k(s.id),children:e.jsx(M,{sx:{color:_[800]}})})}),e.jsx(z,{title:"Delete",children:e.jsx(S,{onClick:()=>f(s.id),color:"error",children:d?e.jsx(q,{size:24}):e.jsx(T,{})})})]})]},g))]})]})},Le=()=>e.jsxs(B,{children:[e.jsx(U,{title:"Quiz Name"}),e.jsxs(v,{container:!0,sx:{minHeight:"85vh",display:"flex",flexDirection:"column",gap:2},children:[e.jsx(v,{item:!0,xs:12,md:12,children:e.jsx(te,{})}),e.jsx(v,{item:!0,xs:12,md:12,children:e.jsx(re,{})})]})]});export{Le as default};
