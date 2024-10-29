import{g as $,G as U,U as O,r as a,B as m,j as e,c as p,C as B,V,W as X,X as Y,Y as Z,Z as J,a as K}from"./index-CUBHetVN.js";import{L as ee}from"./Layout-BlU0EauW.js";import{P as se}from"./PageName--QctS_Jv.js";import{d as ae}from"./MoreHoriz-D5K_5dy1.js";import{d as re,a as te}from"./FolderDelete-D46EbySx.js";import{M as H,F as P}from"./Modal-DHX36T4n.js";import{F as k}from"./FormControl-C5SBuuzI.js";import{I as A,T as _}from"./TextField-Br9tBp4K.js";import{S as D}from"./Select-BaIo7R3g.js";import{M as f}from"./MenuItem--ErA4Q-7.js";import{B as C}from"./Button-CDl_mD0Q.js";import{T as le}from"./Typography-Bk7xBqzM.js";import{I as ne}from"./Input-DEJs1UBe.js";import{P as ie}from"./Paper-CvDSqGgi.js";import{T as oe}from"./TableContainer-DLFF8P0I.js";import{T as de,a as R,b as v,c as ce}from"./TableRow-B5b_EBZi.js";import{T as ue}from"./TableHead-xaIaZKhs.js";import{I as he}from"./IconButton-xtUAGam4.js";import{M as xe}from"./Menu-Tx7ft6l0.js";import{G as fe}from"./Grid-BBbyxA-5.js";import"./FolderCopy-DBXADfz0.js";import"./getThemeProps-DZHS2swm.js";import"./createSvgIcon-BNiQ1uMK.js";import"./GlobalStyles-DnPqwiRl.js";import"./listItemIconClasses-EVjYjc_D.js";import"./useTheme-C8jBbgHn.js";import"./ChevronRight-DOUVWpEN.js";import"./PeopleAlt-DnbX-vPg.js";import"./CalendarMonth-CAXonYvH.js";import"./Style-CREQcY6J.js";import"./ExitToApp-NQb6q9Sm.js";import"./Toolbar-DwhPy3O0.js";import"./utils-C7ZUp4cy.js";import"./Grow-DFz5RKAv.js";const me=({open:n,close:l})=>{const{data:t,isLoading:i}=$(),{data:o,isLoading:j}=U(),[c,{data:u,isLoading:y,isSuccess:S,error:z,reset:d}]=O(),[E,h]=a.useState(""),[G,x]=a.useState(""),[M,Q]=a.useState(!1),[T,w]=a.useState(""),[N,I]=a.useState(""),[g,b]=a.useState(""),W=s=>{if(s.preventDefault(),/[/\-]/.test(g)){m.error("Quiz name should not contain '/' or '-'");return}c({teacherId:E,gradeId:G,quizName:g,shuffle:M,mc:T,essay:N})};a.useEffect(()=>{S&&(m.success(u.message),h(""),x(""),Q(!1),w(""),I(""),b(""),l(),d()),z&&(m.error(z.data.message),d())},[u,S,z]);const q=()=>{h(""),Q(!1),b(""),w(""),I(""),x(""),l()};return e.jsx(H,{open:n,onClose:l,closeAfterTransition:!0,children:e.jsx(P,{in:n,children:e.jsx(p,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:{xs:350,md:400},bgcolor:"#ffff",boxShadow:24,p:2,borderRadius:"5px"},children:e.jsxs("form",{className:"form-quiz",onSubmit:W,children:[e.jsxs(k,{fullWidth:!0,children:[e.jsx(A,{children:"--Teacher--"}),e.jsx(D,{value:E,onChange:s=>h(s.target.value),required:!0,label:"--Teacher--",children:t==null?void 0:t.map(s=>e.jsx(f,{value:s.id,children:s.name},s.id))})]}),e.jsxs(k,{fullWidth:!0,children:[e.jsx(A,{children:"--Grade--"}),e.jsx(D,{value:G,onChange:s=>x(s.target.value),required:!0,label:"--Grade--",children:o==null?void 0:o.map(s=>e.jsx(f,{value:s.id,children:s.grade},s.id))})]}),e.jsxs(k,{fullWidth:!0,children:[e.jsx(A,{children:"--Shuffle--"}),e.jsxs(D,{value:M,onChange:s=>Q(s.target.value),required:!0,label:"--Grade--",children:[e.jsx(f,{value:!0,children:"yes"}),e.jsx(f,{value:!1,children:"No"})]})]}),e.jsx(_,{fullWidth:!0,required:!0,label:"Quiz Name",placeholder:"Quiz Name",value:g,onChange:s=>b(s.target.value)}),e.jsxs(p,{sx:{display:"flex",gap:1},children:[e.jsx(_,{fullWidth:!0,required:!0,type:"number",label:"MC",placeholder:"eg: 80",value:T,onChange:s=>w(s.target.value)}),e.jsx(_,{fullWidth:!0,required:!0,type:"number",label:"Essay",placeholder:"eg: 20",value:N,onChange:s=>I(s.target.value)})]}),e.jsxs(p,{sx:{display:"flex",gap:1,justifyContent:"flex-end"},children:[e.jsx(C,{variant:"outlined",color:"error",onClick:q,children:"cancel"}),e.jsx(C,{variant:"contained",color:"success",type:"submit",children:i||j||y?e.jsx(B,{size:20,color:"inherit"}):"add"})]})]})})})})},pe=({open:n,close:l})=>{const[t,{data:i,isSuccess:o,isLoading:j,error:c,reset:u}]=V(),y=()=>t();return a.useEffect(()=>{o&&(m.success(i.message),l(),u()),c&&m.error(c.data.message)},[i,o,c]),e.jsx(H,{open:n,onClose:l,closeAfterTransition:!0,children:e.jsx(P,{in:n,children:e.jsxs(p,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:{xs:350,md:400},bgcolor:"#ffff",boxShadow:24,p:2,borderRadius:"5px"},children:[e.jsx(le,{align:"center",children:"Are you sure you want to delete all quizzes?"}),e.jsxs(p,{sx:{display:"flex",gap:1,justifyContent:"flex-end",mt:1},children:[e.jsx(C,{variant:"contained",color:"error",onClick:l,children:"cancel"}),e.jsx(C,{variant:"outlined",color:"error",onClick:y,children:j?e.jsx(B,{size:20,color:"inherit"}):"sure"})]})]})})})},je=()=>{const[n,l]=a.useState(!1),[t,i]=a.useState(!1);return e.jsxs(p,{sx:{display:"flex",justifyContent:"end",gap:1},children:[e.jsx(C,{variant:"contained",color:"success",startIcon:e.jsx(re,{}),onClick:()=>i(!0),sx:{width:120},children:"add"}),e.jsx(C,{startIcon:e.jsx(te,{}),variant:"contained",color:"error",onClick:()=>l(!0),sx:{width:120},children:"Delete"}),e.jsx(me,{open:t,close:()=>i(!1)}),e.jsx(pe,{open:n,close:()=>l(!1)})]})},ge=({open:n,close:l,quiz:t})=>{const{data:i,isLoading:o}=$(),{data:j,isLoading:c}=U(),[u,{data:y,isSuccess:S,isLoading:z,error:d,reset:E}]=X(),[h,G]=a.useState(""),[x,M]=a.useState(""),[Q,T]=a.useState(!1),[w,N]=a.useState(""),[I,g]=a.useState(""),[b,W]=a.useState(""),q=s=>{if(s.preventDefault(),/[/\-]/.test(b)){m.error("Quiz name should not contain '/' or '-'");return}const r={teacherId:h,gradeId:x,quizName:b,shuffle:Q,mc:w,essay:I};u({id:t.id,body:r})};return a.useEffect(()=>{S&&(m.success(y.message),l(),E()),d&&(m.error(d.data.message),E())},[y,S,d]),a.useEffect(()=>{t&&(G(t.teacher_id),M(t.grade_id),T(t.shuffle),N(t.mc_weight),g(t.essay_weight),W(t.quiz_name))},[t]),e.jsx(H,{open:n,onClose:l,closeAfterTransition:!0,children:e.jsx(P,{in:n,children:e.jsx(p,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:{xs:350,md:400},bgcolor:"#ffff",boxShadow:24,p:2,borderRadius:"5px"},children:e.jsxs("form",{className:"form-quiz",onSubmit:q,children:[e.jsxs(k,{fullWidth:!0,children:[e.jsx(A,{children:"--Teacher--"}),e.jsx(D,{value:h||"",onChange:s=>G(s.target.value),required:!0,label:"--Teacher--",children:i==null?void 0:i.map(s=>e.jsx(f,{value:s.id,children:s.name},s.id))})]}),e.jsxs(k,{fullWidth:!0,children:[e.jsx(A,{children:"--Grade--"}),e.jsx(D,{value:x||"",onChange:s=>M(s.target.value),required:!0,label:"--Grade--",children:j==null?void 0:j.map(s=>e.jsx(f,{value:s.id,children:s.grade},s.id))})]}),e.jsxs(k,{fullWidth:!0,children:[e.jsx(A,{children:"--Shuffle--"}),e.jsxs(D,{value:Q,onChange:s=>T(s.target.value),required:!0,label:"--Grade--",children:[e.jsx(f,{value:!0,children:"yes"}),e.jsx(f,{value:!1,children:"No"})]})]}),e.jsx(_,{fullWidth:!0,required:!0,label:"Quiz Name",placeholder:"Quiz Name",value:b||"",onChange:s=>W(s.target.value)}),e.jsxs(p,{sx:{display:"flex",gap:1},children:[e.jsx(_,{fullWidth:!0,required:!0,type:"number",label:"MC",placeholder:"eg: 80",value:w||"",onChange:s=>N(s.target.value)}),e.jsx(_,{fullWidth:!0,required:!0,type:"number",label:"Essay",placeholder:"eg: 20",value:I||"",onChange:s=>g(s.target.value)})]}),e.jsxs(p,{sx:{display:"flex",gap:1,justifyContent:"flex-end"},children:[e.jsx(C,{variant:"outlined",color:"error",onClick:l,children:"cancel"}),e.jsx(C,{variant:"contained",color:"success",type:"submit",children:o||c||z?e.jsx(B,{size:20,color:"inherit"}):"update"})]})]})})})})},be=[{label:"No",width:50},{label:"Teacher",width:170},{label:"Bank",width:170},{label:"Grade",width:70},{label:"MC",width:70},{label:"Essay",width:70},{label:"Questions",width:70},{label:"Actions",width:170}],ve=()=>{const{data:n}=Y(),[l,{data:t}]=Z(),[i,{data:o,isLoading:j,isSuccess:c,error:u,reset:y}]=J(),[S,z]=a.useState(null),[d,E]=a.useState(""),h=!!S,G=(r,L)=>{z(r.currentTarget),E(L)},x=()=>{z(null)},M=K(),[Q,T]=a.useState(!1),w=(r,L)=>{const F=r.replace(/\s+/g,"-");M(`/admin/quizzes/${F}/${L}`)},N=()=>{d&&(T(!0),l(d),x())},I=()=>{d&&(i(d),x())};a.useEffect(()=>{c&&(m.success(o.message),y()),u&&m.error(u.data.message)},[o,c,u]);const[g,b]=a.useState(""),W=r=>r.teacher.toLowerCase().includes(g.toLowerCase()),q=n==null?void 0:n.filter(W),s=r=>{b(r.target.value)};return e.jsxs(a.Fragment,{children:[e.jsxs(p,{sx:{p:1,boxShadow:2,bgcolor:"white",borderRadius:1,display:"flex",justifyContent:"space-between",flexDirection:{xs:"column-reverse",md:"row"},gap:2},children:[e.jsx(ne,{placeholder:"Search Teacher",value:g,onChange:s}),e.jsx(je,{})]}),e.jsx(ie,{children:e.jsx(oe,{children:e.jsxs(de,{children:[e.jsx(ue,{children:e.jsx(R,{children:be.map((r,L)=>e.jsx(v,{align:"center",sx:{width:r.width},children:r.label},L))})}),e.jsx(ce,{children:q==null?void 0:q.map((r,L)=>e.jsxs(R,{children:[e.jsx(v,{align:"center",children:L+1}),e.jsx(v,{align:"left",children:r.teacher}),e.jsx(v,{align:"center",children:r.quiz_name}),e.jsx(v,{align:"center",children:r.grade}),e.jsx(v,{align:"center",children:r.mc}),e.jsx(v,{align:"center",children:r.essay}),e.jsx(v,{align:"center",children:e.jsx(C,{variant:"contained",color:"success",onClick:()=>w(r.quiz_name,r.id),children:"Add"})}),e.jsx(v,{align:"center",children:e.jsx(he,{id:"basic-button",color:"primary","aria-controls":h?"basic-menu":void 0,"aria-haspopup":"true","aria-expanded":h?"true":void 0,onClick:F=>G(F,r.id),children:j?e.jsx(B,{size:20}):e.jsx(ae,{})})})]},L))})]})})}),e.jsx(ge,{open:Q,close:()=>T(!1),quiz:t}),e.jsxs(xe,{id:"basic-menu",anchorEl:S,open:h,onClose:x,MenuListProps:{"aria-labelledby":"basic-button"},children:[e.jsx(f,{onClick:()=>N(),children:"Edit"}),e.jsx(f,{onClick:I,children:"Delete"})]})]})},ss=()=>e.jsxs(ee,{children:[e.jsx(se,{title:"Quizzes"}),e.jsx(fe,{container:!0,sx:{minHeight:"85vh",display:"flex",flexDirection:"column",gap:2},children:e.jsx(ve,{})})]});export{ss as default};
