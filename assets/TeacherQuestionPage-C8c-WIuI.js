import{J as N,W as F,r as h,B as C,j as e,c as y,C as q,X as H,a as Q,Y as P,Z as R,_}from"./index-DVVZMFAy.js";import{L as B}from"./Layout-DVaNEkm1.js";import{D as U,P as W}from"./PageName-CVqv3dsE.js";import{d as G,a as J}from"./FolderDelete-Bpv3yS2n.js";import{d as K,a as X}from"./InsertDriveFileOutlined-CZBPZA1q.js";import{M as L,F as E}from"./Modal-Cpz68z0j.js";import{T as D}from"./Typography-CI31gJNE.js";import{B as p}from"./Button-CYCXCPze.js";import{r as Y,u as Z}from"./xlsx-DT8pmw08.js";import{I as O}from"./Input-DKQUFpGi.js";import{d as M,a as T}from"./PlaylistRemove-ezM4z1Sf.js";import{R as V}from"./bundle-CLphUxq9.js";/* empty css               */import{G as v}from"./Grid-Byh82s5p.js";import{T as z}from"./Tooltip-DQTqAJg3.js";import{I as S}from"./IconButton-D0bPhnJn.js";import"./ChevronRight-CoZk7gnx.js";import"./createSvgIcon-BBYY8FNJ.js";import"./CalendarMonth-D2YtUPcA.js";import"./Style-DpYiakdT.js";import"./ExitToApp-CrF1bS-w.js";import"./useTheme-CmsqvUfX.js";import"./Toolbar-DSj10l_W.js";import"./getThemeProps-D_yIhtQB.js";import"./Paper-CojZdgXz.js";import"./GlobalStyles-D9JB72R9.js";import"./listItemIconClasses-CWPOSp7D.js";import"./utils-DWTovDIY.js";import"./Popper-ymTHMGwe.js";import"./Grow-BLVuUMNW.js";const ee=({open:a,close:r})=>{const n=N(),{quizId:u}=n,[x,{data:i,isSuccess:c,isLoading:d,error:l,reset:b}]=F(),t=()=>x(u);return h.useEffect(()=>{c&&(C.success(i.message),r(),b()),l&&C.error(l.data.message)},[i,c,l]),e.jsx(L,{open:a,onClose:r,closeAfterTransition:!0,children:e.jsx(E,{in:a,children:e.jsxs(y,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:{xs:350,md:400},bgcolor:"#ffff",boxShadow:24,p:2,borderRadius:"5px"},children:[e.jsx(D,{align:"center",children:"Are you sure you want to delete all question?"}),e.jsxs(y,{sx:{display:"flex",gap:1,justifyContent:"flex-end",mt:2},children:[e.jsx(p,{variant:"contained",color:"error",onClick:r,children:"cancel"}),e.jsx(p,{variant:"outlined",color:"error",onClick:t,children:d?e.jsx(q,{size:24,color:"inherit"}):"sure"})]})]})})})},se=({open:a,close:r})=>{const n=N(),{quizId:u}=n,[x,i]=h.useState(null),[c,{data:d,isSuccess:l,isLoading:b,error:t,reset:o}]=H(),m=f=>{i(f.target.files[0])},k=()=>{if(x){const f=new FileReader;f.onload=s=>{const g=new Uint8Array(s.target.result),w=Y(g,{type:"array"}),j=w.SheetNames[0],I=w.Sheets[j],A={data:Z.sheet_to_json(I,{header:1,range:1})};c({id:u,body:A})},f.readAsArrayBuffer(x)}};return h.useEffect(()=>{l&&(C.success(d.message),r(),o()),t&&(C.error(t.data.message),o(),console.log(t))},[d,l,t]),e.jsx(L,{open:a,onClose:r,closeAfterTransition:!0,children:e.jsx(E,{in:a,children:e.jsx(y,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400,bgcolor:"#ffff",boxShadow:24,p:2,display:"flex",alignContent:"center",justifyContent:"center"},children:e.jsxs(y,{sx:{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:"10px"},children:[e.jsx(O,{required:!0,fullWidth:!0,type:"file",placeholder:"Upload file here",onChange:m}),e.jsxs(y,{sx:{display:"flex",justifyContent:"end",width:"100%",gap:1},children:[e.jsx(p,{variant:"contained",color:"error",onClick:r,children:"cancel"}),e.jsx(p,{variant:"contained",color:"success",onClick:k,children:b?e.jsx(q,{size:20,color:"inherit"}):"upload"})]})]})})})})},te=()=>{const a=Q(),r=N(),[n,u]=h.useState(!1);h.useState(!1);const[x,i]=h.useState(!1),c=()=>{window.open("/soal_template.xlsx","_blank")},d=()=>a(`/teacher/quizzes/add/${r.quizname}/${r.quizId}`);return e.jsxs(y,{sx:{display:"flex",justifyContent:{xs:"start",md:"end"},gap:1,flexWrap:"wrap",bgcolor:"white",p:1,borderRadius:1,boxShadow:2},children:[e.jsx(p,{variant:"contained",color:"success",startIcon:e.jsx(G,{}),onClick:d,sx:{width:120},children:"add"}),e.jsx(p,{startIcon:e.jsx(K,{}),variant:"contained",color:"secondary",onClick:()=>i(!0),sx:{width:120},children:"Upload"}),e.jsx(p,{startIcon:e.jsx(X,{}),variant:"contained",color:"warning",sx:{width:120},onClick:c,children:"Template"}),e.jsx(p,{startIcon:e.jsx(J,{}),variant:"contained",color:"error",onClick:()=>u(!0),sx:{width:120},children:"Delete"}),e.jsx(ee,{open:n,close:()=>u(!1)}),e.jsx(se,{open:x,close:()=>i(!1)})]})},$=a=>({__html:a}),re=()=>{const a=Q(),r=N(),{quizId:n,quizname:u}=r,[x,{data:i,isSuccess:c,isLoading:d,error:l,reset:b}]=P(),{data:t}=R(n,{skip:!n}),o=t==null?void 0:t.filter(s=>s.type===1),m=t==null?void 0:t.filter(s=>s.type===2),k=s=>{a(`/teacher/quizzes/edit/${u}/${n}/question/${s}`)},f=s=>x({id:s,quizId:n});return h.useEffect(()=>{c&&(C.success(i.message),b()),l&&C.error(l.data.message)},[i,c,l]),e.jsxs(v,{container:!0,sx:{bgcolor:"white",borderRadius:1,boxShadow:2,minHeight:{xs:500,md:530,xl:630},p:1},children:[e.jsxs(v,{item:!0,xs:12,md:12,children:[e.jsx(D,{variant:"body2",fontWeight:"bold",children:`Multiple Choises ${o==null?void 0:o.length}`}),o==null?void 0:o.map((s,g)=>{var w;return e.jsxs(h.Fragment,{children:[e.jsxs("div",{className:"quiz-layout",children:[e.jsxs("div",{className:"number",children:[g+1,"."]}),e.jsxs("div",{className:"quiz-box",children:[e.jsx("article",{dangerouslySetInnerHTML:$(s.question)}),s.audio&&e.jsx(V,{src:s.audio,controls:!0}),e.jsx("div",{className:"choices",children:(w=s.choices)==null?void 0:w.map((j,I)=>j.text!==null&&e.jsxs("div",{className:"answer",children:[e.jsxs("p",{className:j.value===s.key?"bold-text":"normal-text",children:[j.value,"."]}),e.jsx("p",{dangerouslySetInnerHTML:$(j.text),className:j.value===s.key?"bold-text":"normal-text"})]},I))}),e.jsx("p",{children:`Key: ${s.key}`}),e.jsx("p",{children:`Score: ${s.score}`})]}),e.jsxs("div",{className:"action",children:[e.jsx(z,{title:"Edit",children:e.jsx(S,{onClick:()=>k(s.id),children:e.jsx(M,{sx:{color:_[800]}})})}),e.jsx(z,{title:"Delete",children:e.jsx(S,{onClick:()=>f(s.id),color:"error",children:d?e.jsx(q,{size:24}):e.jsx(T,{})})})]})]}),e.jsx(U,{})]},s.id)})]}),e.jsxs(v,{item:!0,xs:12,md:12,sx:{pt:1},children:[e.jsx(D,{variant:"body2",fontWeight:"bold",children:`Multiple Essay ${m==null?void 0:m.length}`}),m==null?void 0:m.map((s,g)=>e.jsxs("div",{className:"quiz-layout",children:[e.jsx("div",{className:"number",children:(o==null?void 0:o.length)+g+1}),e.jsx("div",{className:"quiz-box",children:e.jsx("article",{dangerouslySetInnerHTML:$(s.question)})}),e.jsxs("div",{className:"action",children:[e.jsx(z,{title:"Edit",children:e.jsx(S,{onClick:()=>k(s.id),children:e.jsx(M,{sx:{color:_[800]}})})}),e.jsx(z,{title:"Delete",children:e.jsx(S,{onClick:()=>f(s.id),color:"error",children:d?e.jsx(q,{size:24}):e.jsx(T,{})})})]})]},g))]})]})},Qe=()=>e.jsxs(B,{children:[e.jsx(W,{title:"Quiz Name"}),e.jsxs(v,{container:!0,sx:{minHeight:"85vh",display:"flex",flexDirection:"column",gap:2},children:[e.jsx(v,{item:!0,xs:12,md:12,children:e.jsx(te,{})}),e.jsx(v,{item:!0,xs:12,md:12,children:e.jsx(re,{})})]})]});export{Qe as default};
