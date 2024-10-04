import{b as je,G as se,W as re,a6 as ge,r as t,B as y,j as e,c as L,C as ne,a7 as Se,a8 as be,a9 as ve,aa as Ce,ab as Te,a as De,a1 as ke,ac as we,ad as ye}from"./index-CSxfCMfO.js";import{L as Ie}from"./Layout-Cq6CbkdF.js";import{P as ze}from"./PageName-EximxSIq.js";import{d as Ee}from"./MoreHoriz-C6H4XRMQ.js";import{d as Ae,a as Ge}from"./FolderDelete-Dx5rzmXs.js";import{d as x,L as F,A as J}from"./useMobilePicker-D9YWpYIY.js";import{u as le,t as oe,D as R,a as $,S as Pe}from"./timezone-CsYz3l2K.js";import{M as Y,F as Z}from"./Modal-BxMNLGUj.js";import{F as U}from"./FormControl-DuxQqY0B.js";import{I as O,T as B}from"./TextField-siHAEH0i.js";import{S as K}from"./Select-DP2IIPsQ.js";import{M as I}from"./MenuItem-h-V7nKs-.js";import{B as P}from"./Button-C8egMFNd.js";import{P as ee}from"./Paper-1BeYRGVZ.js";import{I as qe}from"./Input-BytLO2YT.js";import{T as Me}from"./TableContainer-CHQDQz7K.js";import{T as Qe,a as te,b as g,c as _e}from"./TableRow-W4KJomaA.js";import{T as We}from"./TableHead-aksBcRt4.js";import{T as X}from"./Typography-CvABrH6u.js";import{I as Ne}from"./IconButton-BKERT6y0.js";import{M as He}from"./Menu-SlX1X7p5.js";import{G as ae}from"./Grid-DB3tpxkA.js";import"./FolderCopy-B9muDkxL.js";import"./getThemeProps-Bm4LwIY-.js";import"./createSvgIcon-CUdXFR2t.js";import"./GlobalStyles-BxWeaP1-.js";import"./listItemIconClasses-DH5o3P_F.js";import"./useTheme-CrWoQ2Gw.js";import"./ChevronRight-BDbCwA2d.js";import"./CalendarMonth-mGKmgOTs.js";import"./Style-BK46D0DP.js";import"./ExitToApp-BfJL4ORI.js";import"./Toolbar-0QhF5KIa.js";import"./InputAdornment-4k54hOfT.js";import"./utils-DhE5sAzO.js";import"./Popper-D7Sxyyw0.js";import"./Grow-2X7iiG1m.js";import"./useThemeProps-Byxw5x5c.js";import"./SwitchBase-fVFI3Z31.js";import"./Stack-D4MkiNzc.js";import"./KeyboardArrowRight-DzvxVwGK.js";x.extend(le);x.extend(oe);const Le=({open:d,close:c})=>{const{user:n}=je(a=>a.authentication),{data:o}=se(),{data:i}=re(),[l,{data:m,isSuccess:S,isLoading:q,error:u,reset:z}]=ge();t.useState("");const[E,b]=t.useState(""),[M,v]=t.useState(""),[A,p]=t.useState(""),[f,C]=t.useState(""),[Q,T]=t.useState(null),[_,D]=t.useState(null),k=i==null?void 0:i.filter(a=>a.teacher_id===(n==null?void 0:n.id)),W=a=>{const h=x(a).tz("Asia/Jakarta");T(h)},N=a=>{const h=x(a).tz("Asia/Jakarta");D(h)},w=a=>{a.preventDefault();const h={teacherId:n==null?void 0:n.id,gradeId:E,quizId:M,name:A,desc:f,start:Q,end:_};l(h)},G=()=>{b(""),v(""),p(""),C(""),T(null),D(null),c()};return t.useEffect(()=>{S&&(y.success(m.message),c(),z(),b(""),v(""),p(""),C(""),T(null),D(null)),u&&(y.error(u.data.message),z())},[m,S,u]),e.jsx(Y,{open:d,onClose:G,children:e.jsx(Z,{in:d,children:e.jsx(L,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:{xs:350,md:400},bgcolor:"#ffff",boxShadow:24,p:2,borderRadius:"5px"},children:e.jsxs("form",{className:"form-schedule",onSubmit:w,children:[e.jsxs(U,{fullWidth:!0,children:[e.jsx(O,{children:"--Grade--"}),e.jsx(K,{value:E,onChange:a=>b(a.target.value),required:!0,label:"--Grade--",children:o==null?void 0:o.map(a=>e.jsx(I,{value:a.id,children:a.grade},a.id))})]}),e.jsxs(U,{fullWidth:!0,children:[e.jsx(O,{children:"--Quiz--"}),e.jsx(K,{value:M,onChange:a=>v(a.target.value),required:!0,label:"--Grade--",children:k==null?void 0:k.map(a=>e.jsx(I,{value:a.id,children:a.quiz_name},a.id))})]}),e.jsx(B,{fullWidth:!0,required:!0,placeholder:"Schedule",value:A,onChange:a=>p(a.target.value)}),e.jsx(B,{fullWidth:!0,required:!0,placeholder:"Description",value:f,onChange:a=>C(a.target.value)}),e.jsx(F,{dateAdapter:J,children:e.jsx(R,{components:["DateTimePicker"],children:e.jsx($,{label:"Start",onChange:W})})}),e.jsx(F,{dateAdapter:J,children:e.jsx(R,{components:["DateTimePicker"],children:e.jsx($,{label:"end",onChange:N})})}),e.jsxs(L,{sx:{display:"flex",justifyContent:"end",gap:1},children:[e.jsx(P,{variant:"contained",color:"error",onClick:G,children:"cancel"}),e.jsx(P,{variant:"contained",color:"success",type:"submit",children:q?e.jsx(ne,{size:20,color:"inherit"}):"add"})]})]})})})})},Be=()=>{const[d,c]=t.useState(!1),[n,o]=t.useState(!1);return e.jsxs(L,{sx:{display:"flex",gap:1},children:[e.jsx(P,{variant:"contained",color:"success",startIcon:e.jsx(Ae,{}),onClick:()=>o(!0),sx:{width:120},children:"add"}),e.jsx(P,{startIcon:e.jsx(Ge,{}),variant:"contained",color:"error",onClick:()=>c(!0),sx:{width:120},children:"Delete"}),e.jsx(Le,{open:n,close:()=>o(!1)})]})},Fe=({open:d,close:c,start:n,end:o})=>{const i=l=>{try{const m=new Date(l);return new Intl.DateTimeFormat("en-EN",{weekday:"long",day:"numeric",month:"long",year:"numeric",hour:"numeric",minute:"numeric"}).format(m)}catch{return console.error("Invalid date string:",l),"Invalid date"}};return e.jsx(Y,{open:d,onClose:c,closeAfterTransition:!0,children:e.jsx(Z,{in:d,children:e.jsxs(L,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:{md:400,xl:600},bgcolor:"#ffff",boxShadow:24,p:2,borderRadius:"5px",display:"flex",flexDirection:"column",gap:2},children:[n&&e.jsx(B,{fullWidth:!0,label:"Mulai",value:i(n)}),o&&e.jsx(B,{fullWidth:!0,label:"Selesai",value:i(o)}),e.jsx(P,{variant:"contained",color:"error",onClick:c,children:"Tutup"})]})})})};x.extend(le);x.extend(oe);const Je=({open:d,close:c,id:n})=>{const{data:o}=se(),{data:i}=re(),{data:l}=Se(n,{skip:!n}),[m,{data:S,isLoading:q,error:u,isSuccess:z,reset:E}]=be(),[b,M]=t.useState(""),[v,A]=t.useState(""),[p,f]=t.useState(""),[C,Q]=t.useState(""),[T,_]=t.useState(""),[D,k]=t.useState(null),[W,N]=t.useState(null),w=i==null?void 0:i.filter(s=>s.teacher_id===b),G=s=>{const j=x(s).tz("Asia/Jakarta");k(j)},a=s=>{const j=x(s).tz("Asia/Jakarta");N(j)},h=s=>{s.preventDefault(),m({id:n,body:{teacherId:b,gradeId:v,quizId:p,name:C,desc:T,start:D,end:W}})};return t.useEffect(()=>{l&&(M(l.teacher_id),A(l.grade_id),f(l.quiz_id),Q(l.schedule),_(l.description),k(x(l.start).tz("Asia/Jakarta")),N(x(l.end).tz("Asia/Jakarta")))},[l]),t.useEffect(()=>{z&&(y.success(S.message),c(),E()),u&&(y.error(u.data.message),E())},[S,z,u]),e.jsx(Y,{open:d,onClose:c,closeAfterTransition:!0,children:e.jsx(Z,{in:d,children:e.jsx(L,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:{xs:350,md:400},bgcolor:"#ffff",boxShadow:24,p:2,borderRadius:"5px"},children:e.jsxs("form",{className:"form-schedule",onSubmit:h,children:[e.jsxs(U,{fullWidth:!0,children:[e.jsx(O,{children:"--Grade--"}),e.jsx(K,{value:v,onChange:s=>A(s.target.value),required:!0,label:"--Grade--",children:o==null?void 0:o.map(s=>e.jsx(I,{value:s.id,children:s.grade},s.id))})]}),e.jsxs(U,{fullWidth:!0,children:[e.jsx(O,{children:"--Quiz--"}),e.jsx(K,{value:p,onChange:s=>f(s.target.value),required:!0,label:"--Grade--",children:w==null?void 0:w.map(s=>e.jsx(I,{value:s.id,children:s.quiz_name},s.id))})]}),e.jsx(B,{fullWidth:!0,required:!0,placeholder:"Schedule",value:C,onChange:s=>Q(s.target.value)}),e.jsx(B,{fullWidth:!0,required:!0,placeholder:"Description",value:T,onChange:s=>_(s.target.value)}),e.jsx(F,{dateAdapter:J,children:e.jsx(R,{components:["DateTimePicker"],children:e.jsx($,{label:"Start",value:D,onChange:G})})}),e.jsx(F,{dateAdapter:J,children:e.jsx(R,{components:["DateTimePicker"],children:e.jsx($,{label:"End",value:W,onChange:a})})}),e.jsxs(L,{sx:{display:"flex",justifyContent:"end",gap:1},children:[e.jsx(P,{variant:"contained",color:"error",onClick:c,children:"cancel"}),e.jsx(P,{variant:"contained",color:"success",type:"submit",children:q?e.jsx(ne,{size:20,color:"inherit"}):"update"})]})]})})})})},Re=[{label:"No",width:30},{label:"Schedule",width:120},{label:"Quiz",width:120},{label:"Grade",width:30},{label:"Status",width:80},{label:"Note",width:30},{label:"Token",width:90},{label:"Actions",width:90}],$e=()=>{const{data:d}=ve(),[c,{data:n,isSuccess:o,error:i,reset:l}]=Ce(),[m,{data:S,isSuccess:q,error:u}]=Te(),z=De(),[E,b]=t.useState(""),[M,v]=t.useState(""),[A,p]=t.useState(!1),[f,C]=t.useState(""),[Q,T]=t.useState(""),[_,D]=t.useState(""),[k,W]=t.useState(""),[N,w]=t.useState(!1),[G,a]=t.useState(null),h=!!G,s=(r,H,V,xe,me,pe,fe)=>{a(r.currentTarget),b(H),v(V),C(xe),T(me),D(pe),W(fe)},j=()=>{a(null)},ie=r=>{c(r)},de=()=>{j(),p(!0)},ce=()=>{w(!0),j()},ue=()=>{f&&(j(),m(f))};t.useEffect(()=>{o&&(y.success(n.message),l()),i&&(y.error(i.data.message),l())},[n,o,i]),t.useEffect(()=>{q&&y.success(S.message),u&&y.error(u.data.message)},[S,q,u]);const he=()=>{const r=Q.replace(/\s+/g,"-");z(`/teacher/schedules/${r}/${_}/${k}`)};return e.jsxs(t.Fragment,{children:[e.jsxs(ee,{sx:{display:"flex",justifyContent:"space-between",p:1,mb:1},children:[e.jsx(qe,{placeholder:"Search Teacher"}),e.jsx(Be,{})]}),e.jsx(ee,{children:e.jsx(Me,{sx:{height:{xs:500,md:530,xl:630},overflow:"auto"},children:e.jsxs(Qe,{stickyHeader:!0,"aria-label":"sticky table",children:[e.jsx(We,{children:e.jsx(te,{children:Re.map((r,H)=>e.jsx(g,{align:"center",sx:{width:r.width},children:r.label},H))})}),e.jsx(_e,{children:d==null?void 0:d.map((r,H)=>e.jsxs(te,{children:[e.jsx(g,{align:"center",children:H+1}),e.jsx(g,{align:"left",children:r.name}),e.jsx(g,{align:"left",children:r.quiz}),e.jsx(g,{align:"center",children:r.grade}),e.jsx(g,{align:"center",children:e.jsx(Pe,{checked:r.status,onChange:()=>ie(r.id),color:"success",inputProps:{"aria-label":"controlled"}})}),e.jsx(g,{align:"center",children:new Date(r.start)>new Date?e.jsx(X,{color:ke[600],children:"Upcoming"}):new Date(r.end)<new Date?e.jsx(X,{color:we[600],children:"Finished"}):e.jsx(X,{color:ye[600],children:"Ongoing"})}),e.jsx(g,{align:"center",children:r.token}),e.jsx(g,{align:"center",children:e.jsx(Ne,{id:"basic-button","aria-controls":h?"basic-menu":void 0,"aria-haspopup":"true","aria-expanded":h?"true":void 0,onClick:V=>s(V,r.start,r.end,r.id,r.quiz,r.quiz_id,r.grade_id),children:e.jsx(Ee,{})})})]},H))})]})})}),e.jsx(Je,{open:N,close:()=>w(!1),id:f}),e.jsxs(He,{id:"basic-menu",anchorEl:G,open:h,onClose:j,MenuListProps:{"aria-labelledby":"basic-button"},children:[e.jsx(I,{onClick:de,children:"Schedule"}),e.jsx(I,{onClick:he,children:"Detail"}),e.jsx(I,{onClick:ce,children:"Edit"}),e.jsx(I,{onClick:ue,children:"Delete"})]}),e.jsx(Fe,{open:A,close:()=>p(!1),start:E,end:M})]})},qt=()=>e.jsxs(Ie,{children:[e.jsx(ze,{title:"Schedule"}),e.jsx(ae,{container:!0,sx:{minHeight:"82vh",display:"flex",flexDirection:"column",gap:2},children:e.jsx(ae,{item:!0,xs:12,md:12,children:e.jsx($e,{})})})]});export{qt as default};
