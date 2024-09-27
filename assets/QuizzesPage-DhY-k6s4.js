import{o as $,K,Z as O,r as a,B as m,j as e,c as j,C as B,$ as U,a0 as Z,a1 as J,a2 as V,a3 as X,a as Y}from"./index-B4oIbNwU.js";import{L as ee}from"./Layout-Bk9NO0Um.js";import{P as se}from"./PageName-CEARqxte.js";import{d as ae}from"./MoreHoriz-e4RIS7qv.js";import{d as te,a as re}from"./FolderDelete-CJHQMYSg.js";import{M as H,F as P}from"./Modal-yF_fLTpP.js";import{F as W}from"./FormControl-DhE90yLw.js";import{I as A,T as _}from"./TextField-dmVyW8fb.js";import{S as D,M as le}from"./Select-OZq0aL4k.js";import{M as f}from"./MenuItem-B9UCUkSn.js";import{B as C}from"./Button-CGa4e0l9.js";import{T as ne}from"./Typography-DLQ9NUQX.js";import{I as ie}from"./Input-Dj5u-xDW.js";import{P as oe}from"./Paper-WBrkj_xq.js";import{T as de}from"./TableContainer-KSHk1eic.js";import{a as ce,b as ue,c as R,T as v}from"./TableRow-2MDI8QSh.js";import{T as he}from"./TableBody-C-AJ6jTb.js";import{I as xe}from"./IconButton-DKYpUzhK.js";import{G as fe}from"./Grid-DRYlEhgI.js";import"./ChevronRight-CvyNzzqS.js";import"./createSvgIcon-BZOpo86E.js";import"./PeopleAlt-BXWzt5_l.js";import"./CalendarMonth-Cs-Lek6-.js";import"./Style-BHIr2vnK.js";import"./useTheme-C3ddHqAM.js";import"./ListItemText-snJx1fDo.js";import"./GlobalStyles-Ddd3Vltf.js";import"./listItemIconClasses-DYp5XrKx.js";import"./utils-CoNKf_2-.js";import"./Grow-BiPl52xs.js";const me=({open:n,close:l})=>{const{data:r,isLoading:i}=$(),{data:o,isLoading:p}=K(),[c,{data:u,isLoading:y,isSuccess:S,error:z,reset:d}]=O(),[E,h]=a.useState(""),[M,x]=a.useState(""),[G,Q]=a.useState(!1),[T,w]=a.useState(""),[N,I]=a.useState(""),[g,b]=a.useState(""),k=s=>{if(s.preventDefault(),/[/\-]/.test(g)){m.error("Quiz name should not contain '/' or '-'");return}c({teacherId:E,gradeId:M,quizName:g,shuffle:G,mc:T,essay:N})};a.useEffect(()=>{S&&(m.success(u.message),h(""),x(""),Q(!1),w(""),I(""),b(""),l(),d()),z&&(m.error(z.data.message),d())},[u,S,z]);const q=()=>{h(""),Q(!1),b(""),w(""),I(""),x(""),l()};return e.jsx(H,{open:n,onClose:l,closeAfterTransition:!0,children:e.jsx(P,{in:n,children:e.jsx(j,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:{xs:350,md:400},bgcolor:"#ffff",boxShadow:24,p:2,borderRadius:"5px"},children:e.jsxs("form",{className:"form-quiz",onSubmit:k,children:[e.jsxs(W,{fullWidth:!0,children:[e.jsx(A,{children:"--Teacher--"}),e.jsx(D,{value:E,onChange:s=>h(s.target.value),required:!0,label:"--Teacher--",children:r==null?void 0:r.map(s=>e.jsx(f,{value:s.id,children:s.name},s.id))})]}),e.jsxs(W,{fullWidth:!0,children:[e.jsx(A,{children:"--Grade--"}),e.jsx(D,{value:M,onChange:s=>x(s.target.value),required:!0,label:"--Grade--",children:o==null?void 0:o.map(s=>e.jsx(f,{value:s.id,children:s.grade},s.id))})]}),e.jsxs(W,{fullWidth:!0,children:[e.jsx(A,{children:"--Shuffle--"}),e.jsxs(D,{value:G,onChange:s=>Q(s.target.value),required:!0,label:"--Grade--",children:[e.jsx(f,{value:!0,children:"yes"}),e.jsx(f,{value:!1,children:"No"})]})]}),e.jsx(_,{fullWidth:!0,required:!0,label:"Quiz Name",placeholder:"Quiz Name",value:g,onChange:s=>b(s.target.value)}),e.jsxs(j,{sx:{display:"flex",gap:1},children:[e.jsx(_,{fullWidth:!0,required:!0,type:"number",label:"MC",placeholder:"eg: 80",value:T,onChange:s=>w(s.target.value)}),e.jsx(_,{fullWidth:!0,required:!0,type:"number",label:"Essay",placeholder:"eg: 20",value:N,onChange:s=>I(s.target.value)})]}),e.jsxs(j,{sx:{display:"flex",gap:1,justifyContent:"flex-end"},children:[e.jsx(C,{variant:"outlined",color:"error",onClick:q,children:"cancel"}),e.jsx(C,{variant:"contained",color:"success",type:"submit",children:i||p||y?e.jsx(B,{size:20,color:"inherit"}):"add"})]})]})})})})},je=({open:n,close:l})=>{const[r,{data:i,isSuccess:o,isLoading:p,error:c,reset:u}]=U(),y=()=>r();return a.useEffect(()=>{o&&(m.success(i.message),l(),u()),c&&m.error(c.data.message)},[i,o,c]),e.jsx(H,{open:n,onClose:l,closeAfterTransition:!0,children:e.jsx(P,{in:n,children:e.jsxs(j,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:{xs:350,md:400},bgcolor:"#ffff",boxShadow:24,p:2,borderRadius:"5px"},children:[e.jsx(ne,{align:"center",children:"Are you sure you want to delete all quizzes?"}),e.jsxs(j,{sx:{display:"flex",gap:1,justifyContent:"flex-end",mt:1},children:[e.jsx(C,{variant:"contained",color:"error",onClick:l,children:"cancel"}),e.jsx(C,{variant:"outlined",color:"error",onClick:y,children:p?e.jsx(B,{size:20,color:"inherit"}):"sure"})]})]})})})},pe=()=>{const[n,l]=a.useState(!1),[r,i]=a.useState(!1);return e.jsxs(j,{sx:{display:"flex",justifyContent:"end",gap:1},children:[e.jsx(C,{variant:"contained",color:"success",startIcon:e.jsx(te,{}),onClick:()=>i(!0),sx:{width:120},children:"add"}),e.jsx(C,{startIcon:e.jsx(re,{}),variant:"contained",color:"error",onClick:()=>l(!0),sx:{width:120},children:"Delete"}),e.jsx(me,{open:r,close:()=>i(!1)}),e.jsx(je,{open:n,close:()=>l(!1)})]})},ge=({open:n,close:l,quiz:r})=>{const{data:i,isLoading:o}=$(),{data:p,isLoading:c}=K(),[u,{data:y,isSuccess:S,isLoading:z,error:d,reset:E}]=Z(),[h,M]=a.useState(""),[x,G]=a.useState(""),[Q,T]=a.useState(!1),[w,N]=a.useState(""),[I,g]=a.useState(""),[b,k]=a.useState(""),q=s=>{if(s.preventDefault(),/[/\-]/.test(b)){m.error("Quiz name should not contain '/' or '-'");return}const t={teacherId:h,gradeId:x,quizName:b,shuffle:Q,mc:w,essay:I};u({id:r.id,body:t})};return a.useEffect(()=>{S&&(m.success(y.message),l(),E()),d&&(m.error(d.data.message),E())},[y,S,d]),a.useEffect(()=>{r&&(M(r.teacher_id),G(r.grade_id),T(r.shuffle),N(r.mc_weight),g(r.essay_weight),k(r.quiz_name))},[r]),e.jsx(H,{open:n,onClose:l,closeAfterTransition:!0,children:e.jsx(P,{in:n,children:e.jsx(j,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:{xs:350,md:400},bgcolor:"#ffff",boxShadow:24,p:2,borderRadius:"5px"},children:e.jsxs("form",{className:"form-quiz",onSubmit:q,children:[e.jsxs(W,{fullWidth:!0,children:[e.jsx(A,{children:"--Teacher--"}),e.jsx(D,{value:h||"",onChange:s=>M(s.target.value),required:!0,label:"--Teacher--",children:i==null?void 0:i.map(s=>e.jsx(f,{value:s.id,children:s.name},s.id))})]}),e.jsxs(W,{fullWidth:!0,children:[e.jsx(A,{children:"--Grade--"}),e.jsx(D,{value:x||"",onChange:s=>G(s.target.value),required:!0,label:"--Grade--",children:p==null?void 0:p.map(s=>e.jsx(f,{value:s.id,children:s.grade},s.id))})]}),e.jsxs(W,{fullWidth:!0,children:[e.jsx(A,{children:"--Shuffle--"}),e.jsxs(D,{value:Q,onChange:s=>T(s.target.value),required:!0,label:"--Grade--",children:[e.jsx(f,{value:!0,children:"yes"}),e.jsx(f,{value:!1,children:"No"})]})]}),e.jsx(_,{fullWidth:!0,required:!0,label:"Quiz Name",placeholder:"Quiz Name",value:b||"",onChange:s=>k(s.target.value)}),e.jsxs(j,{sx:{display:"flex",gap:1},children:[e.jsx(_,{fullWidth:!0,required:!0,type:"number",label:"MC",placeholder:"eg: 80",value:w||"",onChange:s=>N(s.target.value)}),e.jsx(_,{fullWidth:!0,required:!0,type:"number",label:"Essay",placeholder:"eg: 20",value:I||"",onChange:s=>g(s.target.value)})]}),e.jsxs(j,{sx:{display:"flex",gap:1,justifyContent:"flex-end"},children:[e.jsx(C,{variant:"outlined",color:"error",onClick:l,children:"cancel"}),e.jsx(C,{variant:"contained",color:"success",type:"submit",children:o||c||z?e.jsx(B,{size:20,color:"inherit"}):"update"})]})]})})})})},be=[{label:"No",width:50},{label:"Teacher",width:170},{label:"Bank",width:170},{label:"Grade",width:70},{label:"MC",width:70},{label:"Essay",width:70},{label:"Questions",width:70},{label:"Actions",width:170}],ve=()=>{const{data:n}=J(),[l,{data:r}]=V(),[i,{data:o,isLoading:p,isSuccess:c,error:u,reset:y}]=X(),[S,z]=a.useState(null),[d,E]=a.useState(""),h=!!S,M=(t,L)=>{z(t.currentTarget),E(L)},x=()=>{z(null)},G=Y(),[Q,T]=a.useState(!1),w=(t,L)=>{const F=t.replace(/\s+/g,"-");G(`/admin/quizzes/${F}/${L}`)},N=()=>{d&&(T(!0),l(d),x())},I=()=>{d&&(i(d),x())};a.useEffect(()=>{c&&(m.success(o.message),y()),u&&m.error(u.data.message)},[o,c,u]);const[g,b]=a.useState(""),k=t=>t.teacher.toLowerCase().includes(g.toLowerCase()),q=n==null?void 0:n.filter(k),s=t=>{b(t.target.value)};return e.jsxs(a.Fragment,{children:[e.jsxs(j,{sx:{p:1,boxShadow:2,bgcolor:"white",borderRadius:1,display:"flex",justifyContent:"space-between",flexDirection:{xs:"column-reverse",md:"row"},gap:2},children:[e.jsx(ie,{placeholder:"Search Teacher",value:g,onChange:s}),e.jsx(pe,{})]}),e.jsx(oe,{children:e.jsx(de,{children:e.jsxs(ce,{children:[e.jsx(ue,{children:e.jsx(R,{children:be.map((t,L)=>e.jsx(v,{align:"center",sx:{width:t.width},children:t.label},L))})}),e.jsx(he,{children:q==null?void 0:q.map((t,L)=>e.jsxs(R,{children:[e.jsx(v,{align:"center",children:L+1}),e.jsx(v,{align:"left",children:t.teacher}),e.jsx(v,{align:"center",children:t.quiz_name}),e.jsx(v,{align:"center",children:t.grade}),e.jsx(v,{align:"center",children:t.mc}),e.jsx(v,{align:"center",children:t.essay}),e.jsx(v,{align:"center",children:e.jsx(C,{variant:"contained",color:"success",onClick:()=>w(t.quiz_name,t.id),children:"Add"})}),e.jsx(v,{align:"center",children:e.jsx(xe,{id:"basic-button",color:"primary","aria-controls":h?"basic-menu":void 0,"aria-haspopup":"true","aria-expanded":h?"true":void 0,onClick:F=>M(F,t.id),children:p?e.jsx(B,{size:20}):e.jsx(ae,{})})})]},L))})]})})}),e.jsx(ge,{open:Q,close:()=>T(!1),quiz:r}),e.jsxs(le,{id:"basic-menu",anchorEl:S,open:h,onClose:x,MenuListProps:{"aria-labelledby":"basic-button"},children:[e.jsx(f,{onClick:()=>N(),children:"Edit"}),e.jsx(f,{onClick:I,children:"Delete"})]})]})},Ve=()=>e.jsxs(ee,{children:[e.jsx(se,{title:"Quizzes"}),e.jsx(fe,{container:!0,sx:{minHeight:"85vh",display:"flex",flexDirection:"column",gap:2},children:e.jsx(ve,{})})]});export{Ve as default};
