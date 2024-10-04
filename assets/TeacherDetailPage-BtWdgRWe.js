import{M as O,ae as ne,r as o,B as z,j as e,C as Y,ag as re,c as Z,a0 as te,ah as le,ai as ie}from"./index-CSxfCMfO.js";import{P as ae}from"./PageName-EximxSIq.js";import{L as ce}from"./Layout-Cq6CbkdF.js";import{d as oe,a as de,b as q,c as he,e as xe,f as pe,g as je,h as fe}from"./CloudDownloadOutlined-BU5BF5Dh.js";import{P as I}from"./Paper-1BeYRGVZ.js";import{T as W}from"./TableContainer-CHQDQz7K.js";import{T as E,a as w,b as r,c as A}from"./TableRow-W4KJomaA.js";import{T as M}from"./TableHead-aksBcRt4.js";import{T as U}from"./Typography-CvABrH6u.js";import{T as K}from"./Tooltip-Bzv-fPqD.js";import{I as V}from"./IconButton-BKERT6y0.js";import{u as B,w as ee}from"./xlsx-DT8pmw08.js";import{B as p}from"./Button-C8egMFNd.js";import{M as ue,F as me}from"./Modal-BxMNLGUj.js";import{I as se}from"./Input-BytLO2YT.js";import{G as ge}from"./Grid-DB3tpxkA.js";import"./FolderCopy-B9muDkxL.js";import"./getThemeProps-Bm4LwIY-.js";import"./createSvgIcon-CUdXFR2t.js";import"./GlobalStyles-BxWeaP1-.js";import"./listItemIconClasses-DH5o3P_F.js";import"./useTheme-CrWoQ2Gw.js";import"./ChevronRight-BDbCwA2d.js";import"./CalendarMonth-mGKmgOTs.js";import"./Style-BK46D0DP.js";import"./ExitToApp-BfJL4ORI.js";import"./Toolbar-0QhF5KIa.js";import"./Popper-D7Sxyyw0.js";import"./Grow-2X7iiG1m.js";import"./utils-DhE5sAzO.js";const we=[{label:"No",width:30},{label:"NIS",width:100},{label:"Name",width:150},{label:"Class",width:30},{label:"Join",width:110},{label:"IP",width:110},{label:"Browser",width:110},{label:"Status",width:100},{label:"Reset",width:100}],be=({data:i,logs:a})=>{const v=O(),[u,{data:m,isSuccess:j,isLoading:g,error:d}]=ne(),b=(t,s)=>{const l={nis:t,logId:s,quizId:v.quizId};u(l)};return o.useEffect(()=>{j&&z.success(m.message),d&&z.error(d.data.message)},[m,j,d]),e.jsx(I,{sx:{overflow:"auto"},children:e.jsx(W,{sx:{maxHeight:{md:530,xl:570},width:"100%"},children:e.jsxs(E,{stickyHeader:!0,"aria-label":"sticky table",children:[e.jsx(M,{children:e.jsx(w,{children:we.map((t,s)=>e.jsx(r,{align:"center",sx:{width:t.width},children:t.label},s))})}),e.jsx(A,{children:i==null?void 0:i.map((t,s)=>{const l=a==null?void 0:a.find(h=>h.nis===t.nis);return e.jsxs(w,{children:[e.jsx(r,{align:"center",children:s+1}),e.jsx(r,{align:"center",children:t.nis}),e.jsx(r,{children:t.name}),e.jsx(r,{align:"center",children:t.class}),e.jsx(r,{align:"center",children:l?new Date(l.log_in).toLocaleDateString("id-ID",{hour:"numeric",minute:"numeric"}):"-"}),e.jsx(r,{align:"center",children:l?l.ip:"-"}),e.jsx(r,{align:"center",children:l?l.browser:"-"}),e.jsx(r,{align:"center",children:l?l!=null&&l.isActive?e.jsx(U,{sx:{color:"green",fontWeight:"bold"},children:"Ongoing"}):e.jsx(U,{sx:{color:"red",fontWeight:"bold"},children:"Finished"}):e.jsx(U,{sx:{color:"orange",fontWeight:"bold"},children:"Unjoin"})}),e.jsxs(r,{align:"center",children:[e.jsx(K,{title:"Reset",children:e.jsx("span",{children:e.jsx(V,{color:"info",onClick:()=>b(t.nis,l==null?void 0:l.id),disabled:!l,children:g?e.jsx(Y,{size:20,color:"inherit"}):e.jsx(oe,{})})})}),e.jsx(K,{title:"Rejoin",children:e.jsx("span",{children:e.jsx(V,{color:"error",disabled:l?!l.isDone:!0,children:e.jsx(de,{})})})})]})]},s)})})]})})})},ye=[{label:"No",width:70},{label:"NIS",width:100},{label:"Nama",width:250},{label:"Kelas",width:50}],Se=({data:i,questions:a,quizname:v})=>{const[u,m]=o.useState(""),j=[...new Set(i==null?void 0:i.map(s=>s.class))],g=s=>s.class.toLowerCase().includes(u.toLocaleLowerCase()),d=i==null?void 0:i.filter(g),b=o.useRef(null),t=()=>{if(b.current){const s=B.book_new(),l=b.current,h=B.table_to_sheet(l);B.book_append_sheet(s,h,"Sheet1");const f=ee(s,{bookType:"xlsx",type:"array"}),c=new Blob([f],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),x=`Analisis_${v}.xlsx`;if(navigator.msSaveBlob)navigator.msSaveBlob(c,x);else{const C=document.createElement("a");C.href=window.URL.createObjectURL(c),C.download=x,C.click()}}};return e.jsxs(o.Fragment,{children:[e.jsxs(I,{sx:{p:1,display:"flex",gap:1,justifyContent:"end"},children:[e.jsx(p,{variant:"contained",color:"primary",onClick:()=>m(""),children:"All"}),j==null?void 0:j.map(s=>e.jsx(p,{variant:"contained",color:"primary",onClick:()=>m(s),children:s},s)),e.jsx(p,{variant:"contained",color:"warning",startIcon:e.jsx(q,{}),onClick:t,children:"Export"})]}),e.jsx(I,{sx:{overflowX:"auto",overflowY:"auto",width:{md:900,lg:1220,xl:1400}},children:e.jsx(W,{sx:{maxHeight:{md:480,xl:570},width:"100%"},children:e.jsxs(E,{stickyHeader:!0,"aria-label":"sticky table",sx:{minWidth:650},ref:b,children:[e.jsxs(M,{children:[e.jsxs(w,{children:[ye.map((s,l)=>e.jsx(r,{rowSpan:2,align:"center",sx:{minWidth:s.width},children:s.label},l)),a==null?void 0:a.filter(s=>s.type===1).map((s,l)=>e.jsx(r,{align:"center",sx:{minWidth:50},children:l+1},l)),e.jsx(r,{rowSpan:2,align:"center",children:"Correct"}),e.jsx(r,{rowSpan:2,align:"center",children:"Wrong"}),e.jsx(r,{rowSpan:2,align:"center",children:"Score"})]}),e.jsx(w,{children:a==null?void 0:a.filter(s=>s.type===1).map((s,l)=>e.jsx(r,{align:"center",sx:{minWidth:50},children:s.key},l))})]}),e.jsx(A,{children:d==null?void 0:d.map((s,l)=>e.jsxs(o.Fragment,{children:[e.jsxs(w,{children:[e.jsx(r,{align:"center",rowSpan:2,children:l+1}),e.jsx(r,{align:"center",rowSpan:2,children:s.nis}),e.jsx(r,{rowSpan:2,children:s.name}),e.jsx(r,{align:"center",rowSpan:2,children:s.class}),a==null?void 0:a.filter(h=>h.type===1).map((h,f)=>{const c=s.answers.find(x=>x.questionId===h.id);return e.jsx(r,{align:"center",children:c?c.mc:"-"},f)}),e.jsx(r,{align:"center",rowSpan:2,children:s.correct}),e.jsx(r,{align:"center",rowSpan:2,children:s.wrong}),e.jsx(r,{align:"center",rowSpan:2,children:s.mcPoin})]}),e.jsx(w,{children:a==null?void 0:a.filter(h=>h.type===1).map((h,f)=>{const c=s.answers.find(x=>x.questionId===h.id);return e.jsx(r,{align:"center",children:c?c.poin:"-"},f)})})]},l))})]})})})]})},X=i=>({__html:i}),ve=[{label:"No",width:30},{label:"NIS",width:80},{label:"Name",width:200},{label:"Class",width:30},{label:"Score",width:30},{label:"Correction",width:30}],Ce=({data:i,questions:a})=>{var H,J;const v=O(),u=v.quizId,m=v.gradeId,[j,{data:g,isSuccess:d,isLoading:b,error:t}]=re(),[s,l]=o.useState(""),[h,f]=o.useState(""),[c,x]=o.useState(!1),[C,$]=o.useState({}),L=a==null?void 0:a.filter(n=>n.type===2),P=i==null?void 0:i.find(n=>n.nis===s),D=[...new Set(i==null?void 0:i.map(n=>n.class))],F=n=>n.class.toLowerCase().includes(h.toLocaleLowerCase()),_=i==null?void 0:i.filter(F),y=(J=(H=P==null?void 0:P.answers)==null?void 0:H.filter(n=>n.essay!==null))==null?void 0:J.map(n=>({nis:P.nis,questionId:n.questionId,essay:n.essay,poin:n.poin})),G=n=>{l(n),x(!0)},N=(n,S)=>{$(k=>({...k,[n]:S}))},Q=async n=>{n.preventDefault();const S=Object.entries(C).map(([k,R])=>({questionId:k,poin:parseInt(R)}));await Promise.all(S.map(({questionId:k,poin:R})=>{j({id:k,body:{poin:R,nis:P.nis,gradeId:m,quizId:u}})}))};return o.useEffect(()=>{d&&(z.success(g.message),x(!1),$({})),t&&z.error(t.data.message)},[g,d,t]),e.jsxs(o.Fragment,{children:[e.jsxs(I,{sx:{p:1,display:"flex",gap:1,justifyContent:"end"},children:[e.jsx(p,{variant:"contained",color:"primary",onClick:()=>f(""),children:"All"}),D==null?void 0:D.map(n=>e.jsx(p,{variant:"contained",color:"primary",onClick:()=>f(n),children:n},n))]}),e.jsx(I,{sx:{overflow:"auto"},children:e.jsx(W,{sx:{maxHeight:{md:480,xl:570},width:"100%"},children:e.jsxs(E,{stickyHeader:!0,"aria-label":"sticky table",children:[e.jsx(M,{children:e.jsx(w,{children:ve.map((n,S)=>e.jsx(r,{align:"center",sx:{width:n.width},children:n.label},S))})}),e.jsx(A,{children:_==null?void 0:_.map((n,S)=>e.jsxs(w,{children:[e.jsx(r,{align:"center",children:S+1}),e.jsx(r,{align:"center",children:n.nis}),e.jsx(r,{children:n.name}),e.jsx(r,{align:"center",children:n.class}),e.jsx(r,{align:"center",children:n.essayPoin}),e.jsx(r,{align:"center",children:e.jsx(p,{variant:"contained",color:"info",onClick:()=>G(n.nis),children:"score"})})]},S))})]})})}),e.jsx(ue,{open:c,onClose:()=>x(!1),closeAfterTransition:!0,children:e.jsx(me,{in:c,children:e.jsx(Z,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:{xs:350,md:600},maxHeight:600,overflow:"auto",bgcolor:"#ffff",boxShadow:24,p:1,borderRadius:"5px"},children:e.jsxs("form",{onSubmit:Q,children:[e.jsxs(E,{children:[e.jsx(M,{children:e.jsx(w,{children:["Question","Answer","Score"].map(n=>e.jsx(r,{children:n},n))})}),e.jsx(A,{children:L==null?void 0:L.map(n=>{var S,k,R;return e.jsxs(w,{children:[e.jsx(r,{sx:{verticalAlign:"top"},children:e.jsx("div",{dangerouslySetInnerHTML:X(n.question)})}),e.jsx(r,{sx:{verticalAlign:"top"},children:e.jsx("div",{dangerouslySetInnerHTML:X((S=y==null?void 0:y.find(T=>T.questionId===n.id))==null?void 0:S.essay)})}),e.jsx(r,{sx:{verticalAlign:"top"},children:e.jsx(se,{value:C[n.id]!==void 0?C[n.id]:((k=y==null?void 0:y.find(T=>T.questionId===n.id))==null?void 0:k.poin)!==void 0?(R=y==null?void 0:y.find(T=>T.questionId===n.id))==null?void 0:R.poin:0,onChange:T=>N(n.id,T.target.value)})})]},n.id)})})]}),e.jsx(p,{fullWidth:!0,variant:"contained",color:"success",type:"submit",children:b?e.jsx(Y,{size:20,color:"inherit"}):"Submit"}),e.jsx(p,{fullWidth:!0,variant:"contained",color:"error",onClick:()=>x(!1),sx:{mt:1},children:"close"})]})})})})]})},ke=[{label:"No",width:30},{label:"NIS",width:80},{label:"Name",width:200},{label:"Class",width:30},{label:"MC",width:30},{label:"Essay",width:30},{label:"Score",width:30}],Ie=({data:i,quizname:a})=>{const[v,u]=o.useState(""),m=[...new Set(i==null?void 0:i.map(t=>t.class))],j=t=>t.class.toLowerCase().includes(v.toLocaleLowerCase()),g=i==null?void 0:i.filter(j),d=o.useRef(null),b=()=>{if(d.current){const t=B.book_new(),s=d.current,l=B.table_to_sheet(s);B.book_append_sheet(t,l,"Sheet1");const h=ee(t,{bookType:"xlsx",type:"array"}),f=new Blob([h],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),c=`Nilai_${a}.xlsx`;if(navigator.msSaveBlob)navigator.msSaveBlob(f,c);else{const x=document.createElement("a");x.href=window.URL.createObjectURL(f),x.download=c,x.click()}}};return e.jsxs(o.Fragment,{children:[e.jsxs(I,{sx:{p:1,display:"flex",gap:1,justifyContent:"end"},children:[e.jsx(p,{variant:"contained",color:"primary",onClick:()=>u(""),children:"All"}),m==null?void 0:m.map(t=>e.jsx(p,{variant:"contained",color:"primary",onClick:()=>u(t),children:t},t)),e.jsx(p,{variant:"contained",color:"warning",startIcon:e.jsx(q,{}),onClick:b,children:"Export"})]}),e.jsx(I,{sx:{overflow:"auto"},children:e.jsx(W,{sx:{maxHeight:{md:480,xl:570},width:"100%"},children:e.jsxs(E,{stickyHeader:!0,"aria-label":"sticky table",ref:d,children:[e.jsx(M,{children:e.jsx(w,{children:ke.map((t,s)=>e.jsx(r,{align:"center",sx:{width:t.width},children:t.label},s))})}),e.jsx(A,{children:g==null?void 0:g.map((t,s)=>e.jsxs(w,{children:[e.jsx(r,{align:"center",children:s+1}),e.jsx(r,{align:"center",children:t.nis}),e.jsx(r,{children:t.name}),e.jsx(r,{align:"center",children:t.class}),e.jsx(r,{align:"center",children:t.mcPoin}),e.jsx(r,{align:"center",children:t.essayPoin}),e.jsx(r,{align:"center",children:t.totalPoin})]},s))})]})})})]})},Le=()=>{const[i,a]=o.useState(!0),[v,u]=o.useState(!1),[m,j]=o.useState(!1),[g,d]=o.useState(!1),b=()=>{a(!0),d(!1),j(!1),u(!1)},t=()=>{a(!1),u(!0),d(!1),j(!1)},s=()=>{a(!1),u(!1),j(!0),d(!1)},l=()=>{a(!1),u(!1),j(!1),d(!0)},h=O(),f=h.quizname,c=h.quizId,x=h.gradeId,{data:C,refetch:$}=te(c,{skip:!c}),{data:L,refetch:P}=le({quizId:c,gradeId:x},{skip:!c&&!x}),{data:D,refetch:F}=ie(c,{skip:!c}),[_,y]=o.useState(""),G=H=>H.name.toLowerCase().includes(_.toLowerCase()),N=L==null?void 0:L.filter(G),Q=()=>{$(),P(),F()};return e.jsxs(o.Fragment,{children:[e.jsxs(I,{sx:{p:1,display:"flex",gap:1,flexWrap:"wrap",justifyContent:"space-between"},children:[e.jsx(se,{placeholder:"Search Student",sx:{width:360},value:_,onChange:H=>y(H.target.value)}),e.jsxs(Z,{sx:{display:"flex",gap:1},children:[e.jsx(p,{sx:{width:170},variant:"contained",color:"error",startIcon:e.jsx(he,{}),onClick:Q,children:"update data"}),e.jsx(p,{sx:{width:{xs:130,md:180,lg:155}},startIcon:e.jsx(xe,{}),variant:"contained",color:"success",onClick:b,children:"Log"}),e.jsx(p,{sx:{width:{xs:130,md:180,lg:155}},startIcon:e.jsx(pe,{}),variant:"contained",color:"success",onClick:t,children:"mc"}),e.jsx(p,{sx:{width:{xs:130,md:180,lg:155}},startIcon:e.jsx(je,{}),variant:"contained",color:"success",onClick:s,children:"essay"}),e.jsx(p,{sx:{width:{xs:130,md:180,lg:155}},startIcon:e.jsx(fe,{}),variant:"contained",color:"success",onClick:l,children:"scores"})]})]}),i&&e.jsx(be,{data:N,logs:D}),v&&e.jsx(Se,{data:N,questions:C,quizname:f}),m&&e.jsx(Ce,{data:N,questions:C}),g&&e.jsx(Ie,{data:N,quizname:f})]})},ts=()=>e.jsxs(ce,{children:[e.jsx(ae,{title:"quiz Name"}),e.jsx(ge,{container:!0,sx:{minHeight:"85vh",display:"flex",flexDirection:"column",gap:1},children:e.jsx(Le,{})})]});export{ts as default};
