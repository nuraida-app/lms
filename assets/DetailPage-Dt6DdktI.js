import{M as J,af as ne,ag as re,r as x,B,j as e,C as O,ah as te,c as Z,a1 as ae,ai as le,aj as ie}from"./index-DLCRynLT.js";import{P as ce}from"./PageName-DA7Cvw0s.js";import{L as oe}from"./Layout-CneXfcQZ.js";import{d as de,a as xe,b as q,c as he,e as pe,f as je,g as fe,h as ue}from"./CloudDownloadOutlined-9RMslFH1.js";import{P}from"./Paper-CHu71e6T.js";import{T as F}from"./TableContainer-BF1G4wFS.js";import{T as z,a as y,b as n,c as M}from"./TableRow-BPWIvLzO.js";import{T as $}from"./TableHead-CpNOZNoK.js";import{T as W}from"./Typography-DZcqQ05_.js";import{T as V}from"./Tooltip-hpEKikkx.js";import{I as X}from"./IconButton-DjRrq_Mc.js";import{u as D,w as ee}from"./xlsx-DT8pmw08.js";import{B as u}from"./Button-CdInyn4L.js";import{M as me,F as ge}from"./Modal-D_AunpFB.js";import{I as se}from"./Input-BqsWAegp.js";import{G as we}from"./Grid-K40SvTIk.js";import"./FolderCopy-DSGcFxos.js";import"./getThemeProps-CWQWAcF6.js";import"./createSvgIcon-D59g-G7-.js";import"./GlobalStyles-CRrAFrpS.js";import"./listItemIconClasses-Dr45LKzl.js";import"./useTheme-9Di1Vo7v.js";import"./ChevronRight--NVC_II7.js";import"./PeopleAlt-Dbog-w7l.js";import"./CalendarMonth-V9Pa23QG.js";import"./Style-BZ504X3w.js";import"./ExitToApp-BftrtyMZ.js";import"./Toolbar-t9jUTOQF.js";import"./Popper-Ccb4MW6P.js";import"./Grow-zjrQf6xw.js";import"./utils-C85PYznO.js";const be=[{label:"No",width:30},{label:"NIS",width:100},{label:"Name",width:150},{label:"Class",width:30},{label:"Join",width:110},{label:"IP",width:110},{label:"Browser",width:110},{label:"Status",width:100},{label:"Reset",width:100}],ye=({data:l,logs:c})=>{const S=J(),[g,{data:w,isSuccess:m,isLoading:b,error:h}]=ne(),[v,{data:i,isSuccess:r,error:d,isLoading:p}]=re(),f=(a,j)=>{const t={nis:parseInt(a),logId:parseInt(j),quizId:parseInt(S.quizId)};g(t)},o=(a,j)=>{const t={nis:parseInt(a),logId:parseInt(j),quizId:parseInt(S.quizId)};v(t)};return x.useEffect(()=>{m&&B.success(w.message),h&&B.error(h.data.message)},[w,m,h]),x.useEffect(()=>{r&&B.success(i.message),d&&B.error(d.data.message)},[i,r,d]),e.jsx(P,{sx:{overflow:"auto"},children:e.jsx(F,{sx:{maxHeight:{md:530,lg:550,xl:700},width:"100%"},children:e.jsxs(z,{stickyHeader:!0,"aria-label":"sticky table",children:[e.jsx($,{children:e.jsx(y,{children:be.map((a,j)=>e.jsx(n,{align:"center",sx:{width:a.width},children:a.label},j))})}),e.jsx(M,{children:l==null?void 0:l.map((a,j)=>{const t=c==null?void 0:c.find(k=>k.nis===a.nis);return e.jsxs(y,{children:[e.jsx(n,{align:"center",children:j+1}),e.jsx(n,{align:"center",children:a.nis}),e.jsx(n,{children:a.name}),e.jsx(n,{align:"center",children:a.class}),e.jsx(n,{align:"center",children:t?new Date(t.log_in).toLocaleDateString("id-ID",{hour:"numeric",minute:"numeric"}):"-"}),e.jsx(n,{align:"center",children:t?t.ip:"-"}),e.jsx(n,{align:"center",children:t?t.browser:"-"}),e.jsx(n,{align:"center",children:t?t!=null&&t.isDone?e.jsx(W,{sx:{color:"red",fontWeight:"bold"},children:"Finished"}):t!=null&&t.isActive?e.jsx(W,{sx:{color:"green",fontWeight:"bold"},children:"Ongoing"}):e.jsx(W,{sx:{color:"orange",fontWeight:"bold"},children:"Unjoin"}):e.jsx(W,{sx:{color:"orange",fontWeight:"bold"},children:"Unjoin"})}),e.jsxs(n,{align:"center",children:[e.jsx(V,{title:"Reset",children:e.jsx("span",{children:e.jsx(X,{color:"info",onClick:()=>f(a.nis,t==null?void 0:t.id),disabled:t?!(t!=null&&t.isActive):!0,children:b?e.jsx(O,{size:20,color:"inherit"}):e.jsx(de,{})})})}),e.jsx(V,{title:"Rejoin",children:e.jsx("span",{children:e.jsx(X,{color:"error",disabled:t?!t.isDone:!0,onClick:()=>o(a.nis,t==null?void 0:t.id),children:p?e.jsx(O,{size:20,color:"inherit"}):e.jsx(xe,{})})})})]})]},j)})})]})})})},Se=[{label:"No",width:70},{label:"NIS",width:100},{label:"Nama",width:250},{label:"Kelas",width:50}],ve=({data:l,questions:c,quizname:S})=>{const[g,w]=x.useState(""),m=[...new Set(l==null?void 0:l.map(r=>r.class))],b=r=>r.class.toLowerCase().includes(g.toLocaleLowerCase()),h=l==null?void 0:l.filter(b),v=x.useRef(null),i=()=>{if(v.current){const r=D.book_new(),d=v.current,p=D.table_to_sheet(d);D.book_append_sheet(r,p,"Sheet1");const f=ee(r,{bookType:"xlsx",type:"array"}),o=new Blob([f],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),a=`Analisis_${S}.xlsx`;if(navigator.msSaveBlob)navigator.msSaveBlob(o,a);else{const j=document.createElement("a");j.href=window.URL.createObjectURL(o),j.download=a,j.click()}}};return e.jsxs(x.Fragment,{children:[e.jsxs(P,{sx:{p:1,display:"flex",gap:1,justifyContent:"end"},children:[e.jsx(u,{variant:"contained",color:"primary",onClick:()=>w(""),children:"All"}),m==null?void 0:m.map(r=>e.jsx(u,{variant:"contained",color:"primary",onClick:()=>w(r),children:r},r)),e.jsx(u,{variant:"contained",color:"warning",startIcon:e.jsx(q,{}),onClick:i,children:"Export"})]}),e.jsx(P,{sx:{overflowX:"auto",overflowY:"auto"},children:e.jsx(F,{sx:{maxHeight:{md:480,xl:570}},children:e.jsxs(z,{stickyHeader:!0,"aria-label":"sticky table",ref:v,children:[e.jsxs($,{children:[e.jsxs(y,{children:[Se.map((r,d)=>e.jsx(n,{rowSpan:2,align:"center",sx:{minWidth:r.width},children:r.label},d)),c==null?void 0:c.filter(r=>r.type===1).map((r,d)=>e.jsx(n,{align:"center",sx:{minWidth:50},children:d+1},d)),e.jsx(n,{rowSpan:2,align:"center",children:"Correct"}),e.jsx(n,{rowSpan:2,align:"center",children:"Wrong"}),e.jsx(n,{rowSpan:2,align:"center",children:"Score"})]}),e.jsx(y,{children:c==null?void 0:c.filter(r=>r.type===1).map((r,d)=>e.jsx(n,{align:"center",sx:{minWidth:50},children:r.key},d))})]}),e.jsx(M,{children:h==null?void 0:h.map((r,d)=>e.jsxs(x.Fragment,{children:[e.jsxs(y,{children:[e.jsx(n,{align:"center",rowSpan:2,children:d+1}),e.jsx(n,{align:"center",rowSpan:2,children:r.nis}),e.jsx(n,{rowSpan:2,children:r.name}),e.jsx(n,{align:"center",rowSpan:2,children:r.class}),c==null?void 0:c.filter(p=>p.type===1).map((p,f)=>{const o=r.answers.find(a=>a.questionId===p.id);return e.jsx(n,{align:"center",children:o?o.mc:"-"},f)}),e.jsx(n,{align:"center",rowSpan:2,children:r.correct}),e.jsx(n,{align:"center",rowSpan:2,children:r.wrong}),e.jsx(n,{align:"center",rowSpan:2,children:r.mcPoin})]}),e.jsx(y,{children:c==null?void 0:c.filter(p=>p.type===1).map((p,f)=>{const o=r.answers.find(a=>a.questionId===p.id);return e.jsx(n,{align:"center",children:o?o.poin:"-"},f)})})]},d))})]})})})]})},Y=l=>({__html:l}),Ce=[{label:"No",width:30},{label:"NIS",width:80},{label:"Name",width:200},{label:"Class",width:30},{label:"Score",width:30},{label:"Correction",width:30}],Ie=({data:l,questions:c})=>{var R,K;const S=J(),g=S.quizId,w=S.gradeId,[m,{data:b,isSuccess:h,isLoading:v,error:i}]=te(),[r,d]=x.useState(""),[p,f]=x.useState(""),[o,a]=x.useState(!1),[j,t]=x.useState({}),k=c==null?void 0:c.filter(s=>s.type===2),_=l==null?void 0:l.find(s=>s.nis===r),E=[...new Set(l==null?void 0:l.map(s=>s.class))],G=s=>s.class.toLowerCase().includes(p.toLocaleLowerCase()),N=l==null?void 0:l.filter(G),C=(K=(R=_==null?void 0:_.answers)==null?void 0:R.filter(s=>s.essay!==null))==null?void 0:K.map(s=>({nis:_.nis,questionId:s.questionId,essay:s.essay,poin:s.poin})),Q=s=>{d(s),a(!0)},H=(s,I)=>{t(L=>({...L,[s]:I}))},U=async s=>{s.preventDefault();const I=Object.entries(j).map(([L,A])=>({questionId:L,poin:parseInt(A)}));await Promise.all(I.map(({questionId:L,poin:A})=>{m({id:L,body:{poin:A,nis:_.nis,gradeId:w,quizId:g}})}))};return x.useEffect(()=>{h&&(B.success(b.message),a(!1),t({})),i&&B.error(i.data.message)},[b,h,i]),e.jsxs(x.Fragment,{children:[e.jsxs(P,{sx:{p:1,display:"flex",gap:1,justifyContent:"end"},children:[e.jsx(u,{variant:"contained",color:"primary",onClick:()=>f(""),children:"All"}),E==null?void 0:E.map(s=>e.jsx(u,{variant:"contained",color:"primary",onClick:()=>f(s),children:s},s))]}),e.jsx(P,{sx:{overflow:"auto"},children:e.jsx(F,{sx:{maxHeight:{md:530,lg:550,xl:630}},children:e.jsxs(z,{stickyHeader:!0,"aria-label":"sticky table",children:[e.jsx($,{children:e.jsx(y,{children:Ce.map((s,I)=>e.jsx(n,{align:"center",sx:{width:s.width},children:s.label},I))})}),e.jsx(M,{children:N==null?void 0:N.map((s,I)=>e.jsxs(y,{children:[e.jsx(n,{align:"center",children:I+1}),e.jsx(n,{align:"center",children:s.nis}),e.jsx(n,{children:s.name}),e.jsx(n,{align:"center",children:s.class}),e.jsx(n,{align:"center",children:s.essayPoin}),e.jsx(n,{align:"center",children:e.jsx(u,{variant:"contained",color:"info",onClick:()=>Q(s.nis),children:"score"})})]},I))})]})})}),e.jsx(me,{open:o,onClose:()=>a(!1),closeAfterTransition:!0,children:e.jsx(ge,{in:o,children:e.jsx(Z,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:{xs:350,md:600},maxHeight:600,overflow:"auto",bgcolor:"#ffff",boxShadow:24,p:1,borderRadius:"5px"},children:e.jsxs("form",{onSubmit:U,children:[e.jsxs(z,{children:[e.jsx($,{children:e.jsx(y,{children:["Question","Answer","Score"].map(s=>e.jsx(n,{children:s},s))})}),e.jsx(M,{children:k==null?void 0:k.map(s=>{var I,L,A;return e.jsxs(y,{children:[e.jsx(n,{sx:{verticalAlign:"top"},children:e.jsx("div",{dangerouslySetInnerHTML:Y(s.question)})}),e.jsx(n,{sx:{verticalAlign:"top"},children:e.jsx("div",{dangerouslySetInnerHTML:Y((I=C==null?void 0:C.find(T=>T.questionId===s.id))==null?void 0:I.essay)})}),e.jsx(n,{sx:{verticalAlign:"top"},children:e.jsx(se,{value:j[s.id]!==void 0?j[s.id]:((L=C==null?void 0:C.find(T=>T.questionId===s.id))==null?void 0:L.poin)!==void 0?(A=C==null?void 0:C.find(T=>T.questionId===s.id))==null?void 0:A.poin:0,onChange:T=>H(s.id,T.target.value)})})]},s.id)})})]}),e.jsx(u,{fullWidth:!0,variant:"contained",color:"success",type:"submit",children:v?e.jsx(O,{size:20,color:"inherit"}):"Submit"}),e.jsx(u,{fullWidth:!0,variant:"contained",color:"error",onClick:()=>a(!1),sx:{mt:1},children:"close"})]})})})})]})},ke=[{label:"No",width:30},{label:"NIS",width:80},{label:"Name",width:200},{label:"Class",width:30},{label:"MC",width:30},{label:"Essay",width:30},{label:"Score",width:30}],Le=({data:l,quizname:c})=>{const[S,g]=x.useState(""),w=[...new Set(l==null?void 0:l.map(i=>i.class))],m=i=>i.class.toLowerCase().includes(S.toLocaleLowerCase()),b=l==null?void 0:l.filter(m),h=x.useRef(null),v=()=>{if(h.current){const i=D.book_new(),r=h.current,d=D.table_to_sheet(r);D.book_append_sheet(i,d,"Sheet1");const p=ee(i,{bookType:"xlsx",type:"array"}),f=new Blob([p],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),o=`Nilai_${c}.xlsx`;if(navigator.msSaveBlob)navigator.msSaveBlob(f,o);else{const a=document.createElement("a");a.href=window.URL.createObjectURL(f),a.download=o,a.click()}}};return e.jsxs(x.Fragment,{children:[e.jsxs(P,{sx:{p:1,display:"flex",gap:1,justifyContent:"end"},children:[e.jsx(u,{variant:"contained",color:"primary",onClick:()=>g(""),children:"All"}),w==null?void 0:w.map(i=>e.jsx(u,{variant:"contained",color:"primary",onClick:()=>g(i),children:i},i)),e.jsx(u,{variant:"contained",color:"warning",startIcon:e.jsx(q,{}),onClick:v,children:"Export"})]}),e.jsx(P,{sx:{overflow:"auto"},children:e.jsx(F,{sx:{maxHeight:{md:530,lg:550,xl:640}},children:e.jsxs(z,{stickyHeader:!0,"aria-label":"sticky table",ref:h,children:[e.jsx($,{children:e.jsx(y,{children:ke.map((i,r)=>e.jsx(n,{align:"center",sx:{width:i.width},children:i.label},r))})}),e.jsx(M,{children:b==null?void 0:b.map((i,r)=>e.jsxs(y,{children:[e.jsx(n,{align:"center",children:r+1}),e.jsx(n,{align:"center",children:i.nis}),e.jsx(n,{children:i.name}),e.jsx(n,{align:"center",children:i.class}),e.jsx(n,{align:"center",children:i.mcPoin}),e.jsx(n,{align:"center",children:i.essayPoin}),e.jsx(n,{align:"center",children:i.totalPoin})]},r))})]})})})]})},Pe=()=>{const[l,c]=x.useState(!0),[S,g]=x.useState(!1),[w,m]=x.useState(!1),[b,h]=x.useState(!1),v=()=>{c(!0),h(!1),m(!1),g(!1)},i=()=>{c(!1),g(!0),h(!1),m(!1)},r=()=>{c(!1),g(!1),m(!0),h(!1)},d=()=>{c(!1),g(!1),m(!1),h(!0)},p=J(),f=p.quizname,o=p.quizId,a=p.gradeId,{data:j,refetch:t}=ae(o,{skip:!o}),{data:k,refetch:_}=le({quizId:o,gradeId:a},{skip:!o&&!a}),{data:E,refetch:G}=ie(o,{skip:!o}),[N,C]=x.useState(""),Q=R=>R.name.toLowerCase().includes(N.toLowerCase()),H=k==null?void 0:k.filter(Q),U=()=>{t(),_(),G()};return e.jsxs(x.Fragment,{children:[e.jsxs(P,{sx:{p:1,display:"flex",gap:1,flexWrap:"wrap",justifyContent:"space-between"},children:[e.jsx(se,{placeholder:"Search Student",sx:{width:360},value:N,onChange:R=>C(R.target.value)}),e.jsxs(Z,{sx:{display:"flex",gap:1},children:[e.jsx(u,{sx:{width:170},variant:"contained",color:"error",startIcon:e.jsx(he,{}),onClick:U,children:"update data"}),e.jsx(u,{sx:{width:{xs:130,md:180,lg:155}},startIcon:e.jsx(pe,{}),variant:"contained",color:"success",onClick:v,children:"Log"}),e.jsx(u,{sx:{width:{xs:130,md:180,lg:155}},startIcon:e.jsx(je,{}),variant:"contained",color:"success",onClick:i,children:"mc"}),e.jsx(u,{sx:{width:{xs:130,md:180,lg:155}},startIcon:e.jsx(fe,{}),variant:"contained",color:"success",onClick:r,children:"essay"}),e.jsx(u,{sx:{width:{xs:130,md:180,lg:155}},startIcon:e.jsx(ue,{}),variant:"contained",color:"success",onClick:d,children:"scores"})]})]}),l&&e.jsx(ye,{data:H,logs:E}),S&&e.jsx(ve,{data:H,questions:j,quizname:f}),w&&e.jsx(Ie,{data:H,questions:j}),b&&e.jsx(Le,{data:H,quizname:f})]})},ls=()=>e.jsxs(oe,{children:[e.jsx(ce,{title:"quiz Name"}),e.jsx(we,{container:!0,sx:{minHeight:"85vh",display:"flex",flexDirection:"column",gap:1},children:e.jsx(Pe,{})})]});export{ls as default};