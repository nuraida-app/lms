import{a as O,J as W,r as i,a0 as J,a1 as K,B as R,j as e,c as y,C as V}from"./index-CFLTN1m7.js";import{P as _}from"./PageName-C-CSELxM.js";import{L as X}from"./Layout-DNHN-ORW.js";import{E as L}from"./Editor-AiwMBKO0.js";import{R as Y}from"./bundle-BYW_951p.js";import{G as Z}from"./Grid-StTGewUk.js";import{F as k}from"./FormControl-Dn5g6_yv.js";import{I as z,T as ee}from"./TextField-CHf8lOau.js";import{S as Q}from"./Select-BYpC5x63.js";import{M as r}from"./MenuItem-REwMq_5U.js";import{B as I}from"./Button-BCaBrN5N.js";import"./getThemeProps-DErmPepc.js";import"./Typography-CHJpYQNO.js";import"./Paper-BXkIlh-U.js";import"./createSvgIcon-T2x4Gml6.js";import"./Modal-B5cU9yt9.js";import"./useTheme-DnE98ifX.js";import"./GlobalStyles-DbM6d0GN.js";import"./listItemIconClasses-Pf23efNw.js";import"./ExitToApp-B-9Gtlvi.js";import"./ChevronRight-Bme9Hnvl.js";import"./PeopleAlt-W3bdQtth.js";import"./CalendarMonth-CHVRLIhS.js";import"./Style-1QwCO5ov.js";import"./Toolbar-CMmVOmlh.js";import"./IconButton-ByLl6sVS.js";import"./quill.snow-D_wRdG5D.js";import"./utils-CCaaHW3E.js";import"./Input-CyZCGdTf.js";import"./Menu-Bg6yh3yv.js";import"./Grow-CNYCkFhM.js";const ke=()=>{const C=O(),U=W(),b=i.useRef(null),{questionId:l,quizname:v,quizId:n}=U,{data:o,isLoading:P}=J(l,{skip:!l}),[T,{data:S,isLoading:F,isSuccess:E,error:u,reset:d}]=K(),[c,p]=i.useState(1),[A,h]=i.useState(""),[a,m]=i.useState({choiceA:"",choiceB:"",choiceC:"",choiceD:"",choiceE:""}),[w,x]=i.useState(""),[D,f]=i.useState(""),[q,B]=i.useState(null),[j,g]=i.useState(""),M=s=>t=>{m(H=>({...H,[s]:t}))},G=()=>b.current.click(),N=s=>{const t=s.target.files[0];B(t),g(URL.createObjectURL(t))},$=s=>{s.preventDefault();const t=new FormData;t.append("type",c),t.append("quiz_id",n),t.append("question",A),t.append("a",a.choiceA||""),t.append("b",a.choiceB||""),t.append("c",a.choiceC||""),t.append("d",a.choiceD||""),t.append("e",a.choiceE||""),t.append("key",D||""),t.append("score",w||0),q&&t.append("audio",q),T({id:l,body:t,quizId:n})};return i.useEffect(()=>{E&&(R.success(S.message),p(1),h(""),m({choiceA:"",choiceB:"",choiceC:"",choiceD:"",choiceE:""}),x(""),f(""),B(null),g(""),d(),C(`/admin/quizzes/${v}/${n}`)),u&&(R.error(u.data.message),d())},[S,E,u,d,C,n,v]),i.useEffect(()=>{o&&(p(o.type),h(o.question),g(o.audio),m({choiceA:o.a,choiceB:o.b,choiceC:o.c,choiceD:o.d,choiceE:o.e}),x(o.score),f(o.key))},[o]),e.jsxs(X,{children:[e.jsx(_,{title:"Edit Question"}),e.jsx(Z,{container:!0,sx:{minHeight:"85vh",display:"flex",flexDirection:"column",gap:2},children:e.jsxs("form",{className:"form-question",onSubmit:$,children:[e.jsxs(k,{fullWidth:!0,sx:{bgcolor:"white",boxShadow:2,borderRadius:1},children:[e.jsx(z,{children:"--Quiz Type--"}),e.jsxs(Q,{label:"--Quiz Type--",value:c,onChange:s=>p(s.target.value),children:[e.jsx(r,{value:1,children:"Multiple Choice"}),e.jsx(r,{value:2,children:"Essay"})]})]}),e.jsx(L,{placeholder:"Write your question here",value:A,onChange:s=>h(s)}),e.jsxs(y,{sx:{display:"flex",alignItems:"center",justifyContent:j?"space-between":"end"},children:[j&&e.jsx(Y,{src:j,controls:!0}),e.jsx(I,{variant:"contained",color:"success",onClick:G,children:"audio"}),e.jsx("input",{ref:b,onChange:N,type:"file",accept:"audio/*",style:{display:"none"}})]}),c===1&&Object.keys(a).map((s,t)=>e.jsx(L,{placeholder:`Choice ${s.charAt(s.length-1)}`,value:a[s],onChange:M(s)},t)),e.jsxs(y,{sx:{display:"flex",alignItems:"center",p:1,bgcolor:"white",borderRadius:1,boxShadow:2,justifyContent:c===1?"space-between":"end"},children:[c===1&&e.jsxs(y,{sx:{display:"flex",gap:2},children:[e.jsxs(k,{sx:{bgcolor:"white",boxShadow:2,borderRadius:1,width:300},children:[e.jsx(z,{children:"--Correct Answer--"}),e.jsxs(Q,{label:"--Correct Answer--",value:D,onChange:s=>f(s.target.value),children:[e.jsx(r,{value:"A",children:"A"}),e.jsx(r,{value:"B",children:"B"}),e.jsx(r,{value:"C",children:"C"}),e.jsx(r,{value:"D",children:"D"}),e.jsx(r,{value:"E",children:"E"})]})]}),e.jsx(ee,{sx:{ml:2},required:!0,label:"Score",type:"number",value:w,onChange:s=>x(s.target.value)})]}),e.jsx(I,{variant:"contained",color:"success",type:"submit",children:P||F?e.jsx(V,{size:24,color:"inherit"}):"Update"})]})]})})]})};export{ke as default};
