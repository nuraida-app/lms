import{M as O,af as ne,ag as re,r as h,B as R,j as e,C as K,ah as ae,c as Z,a1 as ie,ai as te,aj as le}from"./index-BzybVbrz.js";import{P as ce}from"./PageName-9XwMDVQ1.js";import{L as oe}from"./Layout-B7oQszLo.js";import{d as de,a as he,b as q,c as xe,e as pe,f as je,g as fe,h as ue}from"./CloudDownloadOutlined-BrPRaAAP.js";import{P}from"./Paper-Dzbso0eQ.js";import{T as F}from"./TableContainer-CGA7DdEE.js";import{T as z,a as y,b as n,c as M}from"./TableRow-5Ecg2L20.js";import{T as $}from"./TableHead-CiqNORav.js";import{T as W}from"./Typography-C-qplh4g.js";import{T as V}from"./Tooltip-uzTc8XOi.js";import{I as X}from"./IconButton-BB4rgvuw.js";import{u as A,w as ee}from"./xlsx-DT8pmw08.js";import{B as u}from"./Button-6o8cGekH.js";import{M as me,F as ge}from"./Modal-D5yutoIL.js";import{I as se}from"./Input-DoWOYfms.js";import{G as we}from"./Grid-Bpe-Rk4C.js";import"./FolderCopy-CKLfXymE.js";import"./getThemeProps-Z5o_4JZP.js";import"./createSvgIcon-CZqlXMQ-.js";import"./GlobalStyles-015m-8mF.js";import"./listItemIconClasses-DoJF8eQE.js";import"./useTheme-BALbJBkz.js";import"./ChevronRight-WhqIRLcc.js";import"./PeopleAlt-DuozmEm1.js";import"./CalendarMonth-CZNFJnn1.js";import"./Style-D9dG96sd.js";import"./colorManipulator-BLd52KTc.js";import"./ExitToApp-CbGQ45gm.js";import"./Toolbar-D4YRnJLK.js";import"./Popper-C2F_A1rQ.js";import"./Grow-CnOAYF8-.js";import"./utils-BZNFuFIh.js";const be=[{label:"No",width:30},{label:"NIS",width:100},{label:"Nama",width:150},{label:"Kelas",width:30},{label:"Masuk",width:110},{label:"IP",width:110},{label:"Browser",width:110},{label:"Status",width:100},{label:"Reset",width:100}],ye=({data:t,logs:c})=>{const S=O(),[g,{data:w,isSuccess:m,isLoading:b,error:x}]=ne(),[k,{data:l,isSuccess:r,error:d,isLoading:p}]=re(),f=(i,j)=>{const a={nis:parseInt(i),logId:parseInt(j),quizId:parseInt(S.quizId)};g(a)},o=(i,j)=>{const a={nis:parseInt(i),logId:parseInt(j),quizId:parseInt(S.quizId)};k(a)};return h.useEffect(()=>{m&&R.success(w.message),x&&R.error(x.data.message)},[w,m,x]),h.useEffect(()=>{r&&R.success(l.message),d&&R.error(d.data.message)},[l,r,d]),e.jsx(P,{sx:{overflow:"auto"},children:e.jsx(F,{sx:{maxHeight:{md:530,lg:550,xl:700},width:"100%"},children:e.jsxs(z,{stickyHeader:!0,"aria-label":"sticky table",children:[e.jsx($,{children:e.jsx(y,{children:be.map((i,j)=>e.jsx(n,{align:"center",sx:{width:i.width},children:i.label},j))})}),e.jsx(M,{children:t==null?void 0:t.map((i,j)=>{const a=c==null?void 0:c.find(C=>C.nis===i.nis);return e.jsxs(y,{children:[e.jsx(n,{align:"center",children:j+1}),e.jsx(n,{align:"center",children:i.nis}),e.jsx(n,{children:i.name}),e.jsx(n,{align:"center",children:i.class}),e.jsx(n,{align:"center",children:a?new Date(a.log_in).toLocaleDateString("id-ID",{hour:"numeric",minute:"numeric"}):"-"}),e.jsx(n,{align:"center",children:a?a.ip:"-"}),e.jsx(n,{align:"center",children:a?a.browser:"-"}),e.jsx(n,{align:"center",children:a?a!=null&&a.isDone?e.jsx(W,{sx:{color:"red",fontWeight:"bold"},children:"Finished"}):a!=null&&a.isActive?e.jsx(W,{sx:{color:"green",fontWeight:"bold"},children:"Ongoing"}):e.jsx(W,{sx:{color:"orange",fontWeight:"bold"},children:"Unjoin"}):e.jsx(W,{sx:{color:"orange",fontWeight:"bold"},children:"Unjoin"})}),e.jsxs(n,{align:"center",children:[e.jsx(V,{title:"Reset",children:e.jsx("span",{children:e.jsx(X,{color:"info",onClick:()=>f(i.nis,a==null?void 0:a.id),disabled:a?!(a!=null&&a.isActive):!0,children:b?e.jsx(K,{size:20,color:"inherit"}):e.jsx(de,{})})})}),e.jsx(V,{title:"Rejoin",children:e.jsx("span",{children:e.jsx(X,{color:"error",disabled:a?!a.isDone:!0,onClick:()=>o(i.nis,a==null?void 0:a.id),children:p?e.jsx(K,{size:20,color:"inherit"}):e.jsx(he,{})})})})]})]},j)})})]})})})},Se=[{label:"No",width:70},{label:"NIS",width:100},{label:"Nama",width:250},{label:"Kelas",width:50}],ke=({data:t,questions:c,quizname:S})=>{const[g,w]=h.useState(""),m=[...new Set(t==null?void 0:t.map(r=>r.class))],b=r=>r.class.toLowerCase().includes(g.toLocaleLowerCase()),x=t==null?void 0:t.filter(b),k=h.useRef(null),l=()=>{if(k.current){const r=A.book_new(),d=k.current,p=A.table_to_sheet(d);A.book_append_sheet(r,p,"Sheet1");const f=ee(r,{bookType:"xlsx",type:"array"}),o=new Blob([f],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),i=`Analisis_${S}.xlsx`;if(navigator.msSaveBlob)navigator.msSaveBlob(o,i);else{const j=document.createElement("a");j.href=window.URL.createObjectURL(o),j.download=i,j.click()}}};return e.jsxs(h.Fragment,{children:[e.jsxs(P,{sx:{p:1,display:"flex",gap:1,justifyContent:"end"},children:[e.jsx(u,{variant:"contained",color:"primary",onClick:()=>w(""),children:"All"}),m==null?void 0:m.map(r=>e.jsx(u,{variant:"contained",color:"primary",onClick:()=>w(r),children:r},r)),e.jsx(u,{variant:"contained",color:"warning",startIcon:e.jsx(q,{}),onClick:l,children:"Export"})]}),e.jsx(P,{sx:{overflowX:"auto",overflowY:"auto"},children:e.jsx(F,{sx:{maxHeight:{md:480,xl:570}},children:e.jsxs(z,{stickyHeader:!0,"aria-label":"sticky table",ref:k,children:[e.jsxs($,{children:[e.jsxs(y,{children:[Se.map((r,d)=>e.jsx(n,{rowSpan:2,align:"center",sx:{minWidth:r.width},children:r.label},d)),c==null?void 0:c.filter(r=>r.type===1).map((r,d)=>e.jsx(n,{align:"center",sx:{minWidth:50},children:d+1},d)),e.jsx(n,{rowSpan:2,align:"center",children:"Benar"}),e.jsx(n,{rowSpan:2,align:"center",children:"Salah"}),e.jsx(n,{rowSpan:2,align:"center",children:"Nilai"})]}),e.jsx(y,{children:c==null?void 0:c.filter(r=>r.type===1).map((r,d)=>e.jsx(n,{align:"center",sx:{minWidth:50},children:r.key},d))})]}),e.jsx(M,{children:x==null?void 0:x.map((r,d)=>e.jsxs(h.Fragment,{children:[e.jsxs(y,{children:[e.jsx(n,{align:"center",rowSpan:2,children:d+1}),e.jsx(n,{align:"center",rowSpan:2,children:r.nis}),e.jsx(n,{rowSpan:2,children:r.name}),e.jsx(n,{align:"center",rowSpan:2,children:r.class}),c==null?void 0:c.filter(p=>p.type===1).map((p,f)=>{const o=r.answers.find(i=>i.questionId===p.id);return e.jsx(n,{align:"center",children:o?o.mc:"-"},f)}),e.jsx(n,{align:"center",rowSpan:2,children:r.correct}),e.jsx(n,{align:"center",rowSpan:2,children:r.wrong}),e.jsx(n,{align:"center",rowSpan:2,children:r.mcPoin})]}),e.jsx(y,{children:c==null?void 0:c.filter(p=>p.type===1).map((p,f)=>{const o=r.answers.find(i=>i.questionId===p.id);return e.jsx(n,{align:"center",children:o?o.poin:"-"},f)})})]},d))})]})})})]})},Y=t=>({__html:t}),ve=[{label:"No",width:30},{label:"NIS",width:80},{label:"Nama",width:200},{label:"Kelas",width:30},{label:"Nilai",width:30},{label:"Koreksi Jawaban",width:30}],Ie=({data:t,questions:c})=>{var B,J;const S=O(),g=S.quizId,w=S.gradeId,[m,{data:b,isSuccess:x,isLoading:k,error:l}]=ae(),[r,d]=h.useState(""),[p,f]=h.useState(""),[o,i]=h.useState(!1),[j,a]=h.useState({}),C=c==null?void 0:c.filter(s=>s.type===2),_=t==null?void 0:t.find(s=>s.nis===r),E=[...new Set(t==null?void 0:t.map(s=>s.class))],G=s=>s.class.toLowerCase().includes(p.toLocaleLowerCase()),T=t==null?void 0:t.filter(G),v=(J=(B=_==null?void 0:_.answers)==null?void 0:B.filter(s=>s.essay!==null))==null?void 0:J.map(s=>({nis:_.nis,questionId:s.questionId,essay:s.essay,poin:s.poin})),Q=s=>{d(s),i(!0)},H=(s,I)=>{a(L=>({...L,[s]:I}))},U=async s=>{s.preventDefault();const I=Object.entries(j).map(([L,D])=>({questionId:L,poin:parseInt(D)}));await Promise.all(I.map(({questionId:L,poin:D})=>{m({id:L,body:{poin:D,nis:_.nis,gradeId:w,quizId:g}})}))};return h.useEffect(()=>{x&&(R.success(b.message),i(!1),a({})),l&&R.error(l.data.message)},[b,x,l]),e.jsxs(h.Fragment,{children:[e.jsxs(P,{sx:{p:1,display:"flex",gap:1,justifyContent:"end"},children:[e.jsx(u,{variant:"contained",color:"primary",onClick:()=>f(""),children:"All"}),E==null?void 0:E.map(s=>e.jsx(u,{variant:"contained",color:"primary",onClick:()=>f(s),children:s},s))]}),e.jsx(P,{sx:{overflow:"auto"},children:e.jsx(F,{sx:{maxHeight:{md:530,lg:550,xl:630}},children:e.jsxs(z,{stickyHeader:!0,"aria-label":"sticky table",children:[e.jsx($,{children:e.jsx(y,{children:ve.map((s,I)=>e.jsx(n,{align:"center",sx:{width:s.width},children:s.label},I))})}),e.jsx(M,{children:T==null?void 0:T.map((s,I)=>e.jsxs(y,{children:[e.jsx(n,{align:"center",children:I+1}),e.jsx(n,{align:"center",children:s.nis}),e.jsx(n,{children:s.name}),e.jsx(n,{align:"center",children:s.class}),e.jsx(n,{align:"center",children:s.essayPoin}),e.jsx(n,{align:"center",children:e.jsx(u,{variant:"contained",color:"info",onClick:()=>Q(s.nis),children:"koreksi"})})]},I))})]})})}),e.jsx(me,{open:o,onClose:()=>i(!1),closeAfterTransition:!0,children:e.jsx(ge,{in:o,children:e.jsx(Z,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:{xs:350,md:600},maxHeight:600,overflow:"auto",bgcolor:"#ffff",boxShadow:24,p:1,borderRadius:"5px"},children:e.jsxs("form",{onSubmit:U,children:[e.jsxs(z,{children:[e.jsx($,{children:e.jsx(y,{children:["Question","Answer","Score"].map(s=>e.jsx(n,{children:s},s))})}),e.jsx(M,{children:C==null?void 0:C.map(s=>{var I,L,D;return e.jsxs(y,{children:[e.jsx(n,{sx:{verticalAlign:"top"},children:e.jsx("div",{dangerouslySetInnerHTML:Y(s.question)})}),e.jsx(n,{sx:{verticalAlign:"top"},children:e.jsx("div",{dangerouslySetInnerHTML:Y((I=v==null?void 0:v.find(N=>N.questionId===s.id))==null?void 0:I.essay)})}),e.jsx(n,{sx:{verticalAlign:"top"},children:e.jsx(se,{value:j[s.id]!==void 0?j[s.id]:((L=v==null?void 0:v.find(N=>N.questionId===s.id))==null?void 0:L.poin)!==void 0?(D=v==null?void 0:v.find(N=>N.questionId===s.id))==null?void 0:D.poin:0,onChange:N=>H(s.id,N.target.value)})})]},s.id)})})]}),e.jsx(u,{fullWidth:!0,variant:"contained",color:"success",type:"submit",children:k?e.jsx(K,{size:20,color:"inherit"}):"Submit"}),e.jsx(u,{fullWidth:!0,variant:"contained",color:"error",onClick:()=>i(!1),sx:{mt:1},children:"close"})]})})})})]})},Ce=[{label:"No",width:30},{label:"NIS",width:80},{label:"Nama",width:200},{label:"Kelas",width:30},{label:"Pg",width:30},{label:"Essay",width:30},{label:"Nilai",width:30}],Le=({data:t,quizname:c})=>{const[S,g]=h.useState(""),w=[...new Set(t==null?void 0:t.map(l=>l.class))],m=l=>l.class.toLowerCase().includes(S.toLocaleLowerCase()),b=t==null?void 0:t.filter(m),x=h.useRef(null),k=()=>{if(x.current){const l=A.book_new(),r=x.current,d=A.table_to_sheet(r);A.book_append_sheet(l,d,"Sheet1");const p=ee(l,{bookType:"xlsx",type:"array"}),f=new Blob([p],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),o=`Nilai_${c}.xlsx`;if(navigator.msSaveBlob)navigator.msSaveBlob(f,o);else{const i=document.createElement("a");i.href=window.URL.createObjectURL(f),i.download=o,i.click()}}};return e.jsxs(h.Fragment,{children:[e.jsxs(P,{sx:{p:1,display:"flex",gap:1,justifyContent:"end"},children:[e.jsx(u,{variant:"contained",color:"primary",onClick:()=>g(""),children:"All"}),w==null?void 0:w.map(l=>e.jsx(u,{variant:"contained",color:"primary",onClick:()=>g(l),children:l},l)),e.jsx(u,{variant:"contained",color:"warning",startIcon:e.jsx(q,{}),onClick:k,children:"Export"})]}),e.jsx(P,{sx:{overflow:"auto"},children:e.jsx(F,{sx:{maxHeight:{md:530,lg:550,xl:640}},children:e.jsxs(z,{stickyHeader:!0,"aria-label":"sticky table",ref:x,children:[e.jsx($,{children:e.jsx(y,{children:Ce.map((l,r)=>e.jsx(n,{align:"center",sx:{width:l.width},children:l.label},r))})}),e.jsx(M,{children:b==null?void 0:b.map((l,r)=>e.jsxs(y,{children:[e.jsx(n,{align:"center",children:r+1}),e.jsx(n,{align:"center",children:l.nis}),e.jsx(n,{children:l.name}),e.jsx(n,{align:"center",children:l.class}),e.jsx(n,{align:"center",children:l.mcPoin}),e.jsx(n,{align:"center",children:l.essayPoin}),e.jsx(n,{align:"center",children:l.totalPoin})]},r))})]})})})]})},Pe=()=>{const[t,c]=h.useState(!0),[S,g]=h.useState(!1),[w,m]=h.useState(!1),[b,x]=h.useState(!1),k=()=>{c(!0),x(!1),m(!1),g(!1)},l=()=>{c(!1),g(!0),x(!1),m(!1)},r=()=>{c(!1),g(!1),m(!0),x(!1)},d=()=>{c(!1),g(!1),m(!1),x(!0)},p=O(),f=p.quizname,o=p.quizId,i=p.gradeId,{data:j,refetch:a}=ie(o,{skip:!o}),{data:C,refetch:_}=te({quizId:o,gradeId:i},{skip:!o&&!i}),{data:E,refetch:G}=le(o,{skip:!o}),[T,v]=h.useState(""),Q=B=>B.name.toLowerCase().includes(T.toLowerCase()),H=C==null?void 0:C.filter(Q),U=()=>{a(),_(),G()};return e.jsxs(h.Fragment,{children:[e.jsxs(P,{sx:{p:1,display:"flex",gap:1,flexWrap:"wrap",justifyContent:"space-between"},children:[e.jsx(se,{placeholder:"Search Student",sx:{width:360},value:T,onChange:B=>v(B.target.value)}),e.jsxs(Z,{sx:{display:"flex",gap:1},children:[e.jsx(u,{sx:{width:170},variant:"contained",color:"error",startIcon:e.jsx(xe,{}),onClick:U,children:"Prbarui Data"}),e.jsx(u,{sx:{width:{xs:130,md:180,lg:155}},startIcon:e.jsx(pe,{}),variant:"contained",color:"success",onClick:k,children:"Log"}),e.jsx(u,{sx:{width:{xs:130,md:180,lg:155}},startIcon:e.jsx(je,{}),variant:"contained",color:"success",onClick:l,children:"pg"}),e.jsx(u,{sx:{width:{xs:130,md:180,lg:155}},startIcon:e.jsx(fe,{}),variant:"contained",color:"success",onClick:r,children:"essay"}),e.jsx(u,{sx:{width:{xs:130,md:180,lg:155}},startIcon:e.jsx(ue,{}),variant:"contained",color:"success",onClick:d,children:"Nilai"})]})]}),t&&e.jsx(ye,{data:H,logs:E}),S&&e.jsx(ke,{data:H,questions:j,quizname:f}),w&&e.jsx(Ie,{data:H,questions:j}),b&&e.jsx(Le,{data:H,quizname:f})]})},ls=()=>e.jsxs(oe,{children:[e.jsx(ce,{title:"quiz Name"}),e.jsx(we,{container:!0,sx:{minHeight:"85vh",display:"flex",flexDirection:"column",gap:1},children:e.jsx(Pe,{})})]});export{ls as default};
